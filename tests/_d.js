// Ami des mots — tests. Lancer : node tests/jeu.test.js (jsdom requis :
// NODE_PATH vers un node_modules qui l'a, ou npm i jsdom).
'use strict';
const fs = require('fs'), path = require('path'), assert = require('assert');
let JSDOM;
try{ ({ JSDOM } = require('jsdom')); }catch(e){ console.error('✘ Dépendances absentes (jsdom) : lance « npm install » avant « npm test ».'); process.exit(1); }
const ICI = path.join(__dirname, '..');
const lire = f => fs.readFileSync(path.join(ICI, f), 'utf8');

function page(langue, config, avant){
  const dom = new JSDOM(lire('index.html').replace(/<script[\s\S]*?<\/script>/g, ''), { url:'https://jeu.example/', runScripts:'outside-only', pretendToBeVisual:true });
  const w = dom.window;
  Object.defineProperty(w.navigator, 'language', { value:langue || 'fr-FR' });
  w.__audio = [];
  w.HTMLMediaElement.prototype.pause = () => {};
  w.HTMLMediaElement.prototype.play = function(){ w.__audio.push(this.src); return Promise.reject(new Error('hors ligne')); };
  w.matchMedia = () => ({ matches:true }); w.scrollTo = () => {};
  w.CONFIG_JEU = Object.assign({ PRESENTER_NOUVEAUX:false }, config === undefined ? { MODE_PAYANT:false } : config || {});
  Object.defineProperty(w, 'crypto', { value:require('crypto').webcrypto, configurable:true });
  w.TextEncoder = TextEncoder; w.TextDecoder = TextDecoder;
  w.__fetch = []; w.fetch = async (u) => { w.__fetch.push(String(u)); return { ok:true, json:async () => (w.__reponse || { actif:false }) }; };
  if(avant) avant(w);
  for(const f of ['js/donnees.js', 'js/voix.js', 'js/phrases-enregistrees.js', 'js/textes.js', 'js/textes-plus.js', 'js/textes-ecrans.js', 'js/textes-examens.js', 'js/articulation.js', 'js/genres.js', 'js/confusions.js', 'js/vannes.js', 'js/pieges.js', 'js/anglais.js', 'js/clash.js', 'js/histoires.js', 'js/blagues-en.js', 'js/parcours.js', 'js/rigolade.js', 'js/clash-plus.js', 'js/salon.js', 'js/juge.js', 'js/vannes-libres.js', 'js/maths-en.js', 'js/maths-es.js', 'js/maths-de.js', 'js/maths-it.js', 'js/maths-pt.js', 'js/maths.js', 'js/maths-2026-5e.js', 'js/maths-2026-2nde.js', 'js/maths-2026-1re.js', 'js/maths-2026-autres.js', 'js/maths-2026-college.js', 'js/sciences-en.js', 'js/sciences-es.js', 'js/sciences-de.js', 'js/sciences-it.js', 'js/sciences-pt.js', 'js/sciences.js', 'js/sciences-plus.js', 'js/trash-talk.js', 'js/vannes-arrogantes.js', 'js/vannes-fraiches.js', 'js/bande-images.js', 'js/bande-plumo.js', 'js/achats.js', 'js/rappels.js', 'js/epreuves.js', 'js/epreuves-spe.js', 'js/epreuves-plus.js', 'js/epreuves-oraux.js', 'js/epreuves-pro.js', 'js/matieres.js', 'js/mat-trad-es.js', 'js/mat-trad-en.js', 'js/mat-trad-en-sciences.js', 'js/mat-trad-en-sup.js', 'js/mat-trad-en-langues.js', 'js/mat-trad-en-francais.js', 'js/mat-trad-communs.js', 'js/mat-trad-es-sciences.js', 'js/mat-trad-es-sup.js', 'js/mat-trad-es-specialites.js', 'js/mat-trad-es-allemand.js', 'js/mat-trad-es-francais.js', 'js/mat-trad-de-histoire.js', 'js/mat-trad-de-sciences.js', 'js/mat-francais.js', 'js/mat-histoire.js', 'js/mat-histoire-sgm.js', 'js/mat-svt-pc.js', 'js/mat-sup.js', 'js/mat-anglais.js', 'js/mat-renfort.js', 'js/mat-langues.js', 'js/mat-specialites.js', 'js/mat-anglais-sup.js', 'js/mat-sup-droit.js', 'js/mat-sup-medecine.js', 'js/mat-sup-astro.js', 'js/mat-philo-notions.js', 'js/vannes-cash.js', 'js/vannes-ironie.js', 'js/vannes-mots.js', 'js/offre.js', 'js/jeu.js', 'js/mod-base.js', 'js/mod-ligue.js', 'js/mod-saisons.js', 'js/mod-veille.js', 'js/mod-oral.js', 'js/mod-classe.js', 'js/mod-parrainage.js', 'js/mod-ia.js', 'js/mod-devoirs.js', 'js/mod-retro.js', 'js/gb-moteur.js', 'js/gb-maths.js', 'js/gb-english.js', 'js/gb-sciences.js', 'js/gb-humanites.js', 'js/gb-options.js', 'js/gb-plus.js', 'js/gb-programme.js', 'js/gb-programme-plus.js', 'js/gb-examens.js', 'js/gb-sats-reels.js', 'js/gb-options2.js', 'js/nasa.js', 'js/mat-trad-en-nasa.js', 'js/mat-trad-es-nasa.js', 'js/mat-histoire-pgm.js', 'js/mat-cours.js', 'js/mat-cours-francais.js', 'js/mat-cours-histoire.js', 'js/mat-cours-geo-emc.js', 'js/mat-cours-sciences.js', 'js/mat-cours-physique.js', 'js/mat-cours-lycee-lettres.js', 'js/mat-cours-lycee-sciences.js', 'js/mat-cours-specialites.js', 'js/mat-cours-college-fin.js', 'js/mat-techno.js', 'js/mat-cours-emc.js', 'js/mat-cpl-sciences.js', 'js/mat-cpl-lettres.js', 'js/mat-cpl-partiels.js', 'js/mat-langues-cpl.js', 'js/epreuves-dnb-techno.js', 'js/mat-arts-eps-lca.js', 'js/mat-anglais-college-plus.js', 'js/mat-anglais-college-plus2.js', 'js/mat-langues-college-plus.js', 'js/mat-sciences-college-plus.js', 'js/mat-niveaux.js', 'js/mat-histoire-college-plus.js', 'js/mat-college-plus-final.js', 'js/mat-geo-emc-plus.js', 'js/mat-histoire-6-4-plus.js', 'js/mat-histoire-6-4-suite.js', 'js/mat-histoire-3e-plus.js', 'js/mat-svt-college-plus.js', 'js/mat-astro-plus.js', 'js/mat-physique-college-plus.js', 'js/mat-noms.js', 'js/mat-noms-it-pt.js', 'js/themes.js', 'js/mod-angleterre.js']) w.eval(lire(f));
  return w;
}
// Certificats d'abonnement comme les signe le serveur (même format que serveur/functions/ami-abonnement).
const { webcrypto } = require('crypto');
const b64u = b => Buffer.from(b).toString('base64').replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
const w = page(); const M = w.MATIERES, T = w.MATIERES_LANGUES;
const L = process.argv.slice(2);
for(const k of L){ const [mid,cid]=k.split('/'); const c=M.trouver(mid).chapitres.find(x=>x.id===cid);
  console.log('### '+k, '| titre:', c.titre||c.nom, '| niv:', c.niv.join(','), '| nivQ:', !!c.nivQ, '| tr:', ['en','es','de','it','pt'].filter(l=>T[l]&&T[l].q&&T[l].q[k]).map(l=>l+T[l].q[k].length).join(' '), '| n:', c.banque.length);
  c.banque.forEach((q,i)=>console.log(' -', (c.nivQ?'['+c.nivQ[i].join(',')+'] ':'')+q[0]+' → '+q[1])); }
process.exit(0);
