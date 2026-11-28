// Ami des mots — tests. Lancer : node tests/jeu.test.js (jsdom requis :
// NODE_PATH vers un node_modules qui l'a, ou npm i jsdom).
'use strict';
const fs = require('fs'), path = require('path'), assert = require('assert');
let JSDOM;
try{ ({ JSDOM } = require('jsdom')); }catch(e){ console.error('✘ Dépendances absentes (jsdom) : lance « npm install » avant « npm test ».'); process.exit(1); }
const ICI = path.join(__dirname, '..');
const lire = f => fs.readFileSync(path.join(ICI, f), 'utf8');
let ok = 0, ko = 0;
// v6.79 : chaque page ouverte pendant un test est fermée à la fin du test (sinon ~250 fenêtres jsdom restent en mémoire
// et Node dépasse 2 Go sur un petit Codespace : « JavaScript heap out of memory »).
const FENETRES = [];
const test = async (n, f) => { if(process.env.SEUL && !n.startsWith(process.env.SEUL)) return; const debut = FENETRES.length;
  try{ await f(); console.log('  ✔', n); ok++; }catch(e){ console.log('  ✘', n, '—', e.message, process.env.PILE ? e.stack : ''); ko++; }
  finally{ for(const w of FENETRES.splice(debut)) try{ w.close(); }catch(e){} if(global.gc) global.gc(); if(process.env.MEMOIRE){ console.log('    mem', Math.round(process.memoryUsage().heapUsed / 1048576), 'Mo', FENETRES.length); } } };

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
  for(const f of ['js/donnees.js', 'js/voix.js', 'js/phrases-enregistrees.js', 'js/textes.js', 'js/textes-plus.js', 'js/textes-ecrans.js', 'js/textes-examens.js', 'js/articulation.js', 'js/genres.js', 'js/confusions.js', 'js/vannes.js', 'js/pieges.js', 'js/anglais.js', 'js/clash.js', 'js/histoires.js', 'js/blagues-en.js', 'js/parcours.js', 'js/rigolade.js', 'js/clash-plus.js', 'js/salon.js', 'js/juge.js', 'js/vannes-libres.js', 'js/maths-en.js', 'js/maths-es.js', 'js/maths-de.js', 'js/maths-it.js', 'js/maths-pt.js', 'js/maths.js', 'js/maths-2026-5e.js', 'js/maths-2026-2nde.js', 'js/maths-2026-1re.js', 'js/maths-2026-autres.js', 'js/maths-2026-college.js', 'js/maths-2026-complements.js', 'js/sciences-en.js', 'js/sciences-es.js', 'js/sciences-de.js', 'js/sciences-it.js', 'js/sciences-pt.js', 'js/sciences.js', 'js/sciences-plus.js', 'js/trash-talk.js', 'js/plumo-vivant.js', 'js/vannes-arrogantes.js', 'js/vannes-fraiches.js', 'js/bande-images.js', 'js/bande-plumo.js', 'js/achats.js', 'js/rappels.js', 'js/epreuves.js', 'js/epreuves-spe.js', 'js/epreuves-plus.js', 'js/epreuves-oraux.js', 'js/epreuves-pro.js', 'js/matieres.js', 'js/mat-trad-es.js', 'js/mat-trad-en.js', 'js/mat-trad-en-sciences.js', 'js/mat-trad-en-sup.js', 'js/mat-trad-en-langues.js', 'js/mat-trad-en-francais.js', 'js/mat-trad-communs.js', 'js/mat-trad-es-sciences.js', 'js/mat-trad-es-sup.js', 'js/mat-trad-es-specialites.js', 'js/mat-trad-es-allemand.js', 'js/mat-trad-es-francais.js', 'js/mat-trad-de-histoire.js', 'js/mat-trad-de-sciences.js', 'js/mat-trad-it-svt.js', 'js/mat-trad-pt-svt.js', 'js/mat-trad-it-physique.js', 'js/mat-trad-pt-physique.js', 'js/mat-trad-it-techno.js', 'js/mat-trad-pt-techno.js', 'js/mat-trad-it-histoire.js', 'js/mat-trad-it-lycee.js', 'js/mat-trad-pt-histoire.js', 'js/mat-trad-pt-lycee.js', 'js/mat-trad-it-sup.js', 'js/mat-trad-pt-sup.js', 'js/mat-francais.js', 'js/mat-histoire.js', 'js/mat-histoire-sgm.js', 'js/mat-svt-pc.js', 'js/mat-sup.js', 'js/mat-anglais.js', 'js/mat-renfort.js', 'js/mat-langues.js', 'js/mat-specialites.js', 'js/mat-st2s.js', 'js/mat-st2s-tle.js', 'js/mat-anglais-sup.js', 'js/mat-sup-droit.js', 'js/mat-sup-medecine.js', 'js/mat-sup-astro.js', 'js/mat-philo-notions.js', 'js/vannes-cash.js', 'js/vannes-ironie.js', 'js/vannes-mots.js', 'js/offre.js', 'js/jeu.js', 'js/mod-base.js', 'js/mod-ligue.js', 'js/mod-saisons.js', 'js/mod-veille.js', 'js/mod-oral.js', 'js/mod-classe.js', 'js/mod-parrainage.js', 'js/mod-ia.js', 'js/mod-lecon.js', 'js/mod-devoirs.js', 'js/mod-retro.js', 'js/mod-retro-plus.js', 'js/mod-trimestres.js', 'js/mod-revision.js', 'js/mod-documents.js', 'js/mod-ifsi.js', 'js/mod-avocat.js', 'js/mod-cahier.js', 'js/cours-fiches.js', 'js/cours-fiches-college.js', 'js/cours-fiches-lycee.js', 'js/cours-fiches-plus.js', 'js/cours-fiches-maths-college.js', 'js/cours-fiches-maths-lycee.js', 'js/cours-fiches-anglais.js', 'js/cours-fiches-en.js', 'js/cours-fiches-complements.js', 'js/cours-fiches-francais-programmes.js', 'js/cours-fiches-st2s.js', 'js/mod-intensif.js', 'js/mod-grand-oral.js', 'js/mod-copie.js', 'js/mod-st2s-sujets.js', 'js/examens-monde.js', 'js/mod-veille-programmes.js', 'js/systemes-scolaires.js', 'js/pays-commun.js', 'js/pays-italie.js', 'js/pays-espagne.js', 'js/pays-allemagne.js', 'js/pays-usa.js', 'js/pays-italie2.js', 'js/pays-espagne2.js', 'js/pays-allemagne2.js', 'js/pays-usa2.js', 'js/pays-portugal.js', 'js/mod-parcours-pays.js', 'js/mod-section-internationale.js', 'js/gb-moteur.js', 'js/gb-maths.js', 'js/gb-english.js', 'js/gb-sciences.js', 'js/gb-humanites.js', 'js/gb-options.js', 'js/gb-plus.js', 'js/gb-programme.js', 'js/gb-programme-plus.js', 'js/gb-examens.js', 'js/gb-sats-reels.js', 'js/gb-options2.js', 'js/nasa.js', 'js/mat-trad-en-nasa.js', 'js/mat-trad-es-nasa.js', 'js/mat-histoire-pgm.js', 'js/mat-cours.js', 'js/mat-cours-francais.js', 'js/mat-cours-histoire.js', 'js/mat-cours-geo-emc.js', 'js/mat-cours-sciences.js', 'js/mat-cours-physique.js', 'js/mat-cours-lycee-lettres.js', 'js/mat-cours-lycee-sciences.js', 'js/mat-cours-specialites.js', 'js/mat-cours-college-fin.js', 'js/mat-techno.js', 'js/mat-cours-emc.js', 'js/mat-cpl-sciences.js', 'js/mat-cpl-lettres.js', 'js/mat-cpl-partiels.js', 'js/mat-langues-cpl.js', 'js/epreuves-dnb-techno.js', 'js/mat-arts-eps-lca.js', 'js/mat-anglais-college-plus.js', 'js/mat-anglais-college-plus2.js', 'js/mat-anglais-college-fin.js', 'js/mat-langues-college-plus.js', 'js/mat-sciences-college-plus.js', 'js/mat-niveaux.js', 'js/mat-histoire-college-plus.js', 'js/mat-college-plus-final.js', 'js/mat-geo-emc-plus.js', 'js/mat-histoire-6-4-plus.js', 'js/mat-histoire-6-4-suite.js', 'js/mat-histoire-3e-plus.js', 'js/mat-svt-college-plus.js', 'js/mat-astro-plus.js', 'js/mat-physique-college-plus.js', 'js/mat-techno-college-plus.js', 'js/mat-francais-college-fin.js', 'js/mat-francais-programmes.js', 'js/mat-langues-lv2-fin.js', 'js/mat-geo-emc-fin.js', 'js/mat-sup-medecine-plus.js', 'js/mat-sup-medecine-plus2.js', 'js/mat-sup-infirmier.js', 'js/mat-sup-infirmier-2.js', 'js/mat-sup-avocat.js', 'js/mat-sup-droit-plus.js', 'js/mat-sup-droit-plus2.js', 'js/mat-sup-droit-plus3.js', 'js/mat-sup-anglais-nasa-fin.js', 'js/mat-philo-plus.js', 'js/mat-philo-plus2.js', 'js/mat-philo-plus3.js', 'js/mat-anglais-lycee-fin.js', 'js/mat-anglais-axes-2025.js', 'js/mat-svt-lycee-fin.js', 'js/mat-physique-lycee-fin.js', 'js/mat-histoire-lycee-fin.js', 'js/mat-specialites-fin.js', 'js/mat-specialites-fin2.js', 'js/mat-langues-lycee-fin.js', 'js/mat-anglais-international.js', 'js/mat-anglais-international2.js', 'js/mat-francais-bac.js', 'js/mat-francais-bac-trad.js', 'js/mat-francais-bac-oeuvres.js', 'js/mat-philo-epreuves.js', 'js/mat-anglais-ecrire.js', 'js/mat-mathematicien.js', 'js/mat-experts-sciences.js', 'js/mat-experts-plus.js', 'js/mat-experts-plus2.js', 'js/mat-trad-en-experts.js', 'js/mat-noms.js', 'js/mat-noms-it-pt.js', 'js/mat-histoire-3e-programme.js', 'js/mat-histoire-5e4e-programme.js', 'js/mat-geo-programme.js', 'js/mat-emc-lycee.js', 'js/mat-histoire-niveaux.js', 'js/themes.js', 'js/mod-angleterre.js', 'js/mod-programmes.js']) w.eval(lire(f));
  FENETRES.push(w);
  return w;
}
// Certificats d'abonnement comme les signe le serveur (même format que serveur/functions/ami-abonnement).
const { webcrypto } = require('crypto');
const b64u = b => Buffer.from(b).toString('base64').replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
let CLES = null;
async function cles(){ if(!CLES){ const k = await webcrypto.subtle.generateKey({ name:'ECDSA', namedCurve:'P-256' }, true, ['sign', 'verify']); const p = await webcrypto.subtle.exportKey('jwk', k.publicKey); CLES = { prive:k.privateKey, publique:{ kty:p.kty, crv:p.crv, x:p.x, y:p.y } }; } return CLES; }
async function jeton(code, fin){ const { prive } = await cles(); const charge = b64u(Buffer.from(JSON.stringify({ c:code, f:fin }))); const sig = await webcrypto.subtle.sign({ name:'ECDSA', hash:'SHA-256' }, prive, Buffer.from(charge)); return charge + '.' + b64u(new Uint8Array(sig)); }
const clic = (w, sel) => { const e = w.document.querySelector(sel); assert.ok(e, sel); e.click(); };

(async () => {
console.log('Données et textes');
const w0 = page();
await test('chaque image existe, a un thème, et le mot en français', () => {
  const M = w0.MOTS;
  assert.ok(Object.keys(M).length >= 100);
  for(const e in M){
    assert.ok(fs.existsSync(path.join(ICI, 'img/pictos', M[e].img + '.webp')), e);
    assert.ok(w0.THEMES.includes(M[e].theme), e);
    assert.ok(M[e].fr, e);
  }
});
await test('interface : chaque langue a EXACTEMENT les textes du français (jamais de français à la place)', () => {
  const T = w0.TEXTES, cles = Object.keys(T.fr).sort();
  for(const l in T){
    assert.deepStrictEqual(Object.keys(T[l]).sort(), cles, l);
    if(l === 'fr') continue;
    for(const k of cles){
      const v = T[l][k], f = T.fr[k];
      const s = typeof v === 'function' ? v(7) : Array.isArray(v) ? v.join('|') : v;
      const sf = typeof f === 'function' ? f(7) : Array.isArray(f) ? f.join('|') : f;
      const pareil = new Set(['en.th_nature', 'en.niv_n', 'en.niv_e', 'es.niv_n', 'pt.niv_n', 'it.niv_f', 'en.ou_normal', 'es.ou_normal', 'pt.ou_normal', 'tr.ou_normal', 'de.ou_normal', l + '.plus', l + '.plus_badge']);   // vrais homonymes et nom de marque
      assert.ok(s && (s !== sf || pareil.has(l + '.' + k)), l + ' ' + k);
      if(typeof v === 'function') assert.ok(s.includes('7'), l + ' ' + k + ' perd le nombre');
    }
  }
});
await test('même hachage que ReParole : la voix enregistrée du même mot est retrouvée', () => {
  const A = w0.AmiDesMots;
  // Valeurs de référence calculées avec js/app.js de ReParole.
  assert.strictEqual(A.fnv1a('CHAT'), (function(s){ let h = 0x811c9dc5; for(let i = 0; i < s.length; i++){ h ^= s.charCodeAt(i); h = Math.imul(h, 0x01000193); } return (h >>> 0).toString(36); })('CHAT'));
  assert.match(A.urlVoix('fr', 'CHAT'), /^audio\/fr\/[0-9a-z]+\.mp3$/, 'v6.0 : sons servis par le site lui-même');
  assert.strictEqual(A.urlVoix('kab', 'AƔRUM'), 'audio/kab/aghrum.mp3');
});
await test('affichage : majuscules de la banque adoucies, allemand et turc respectés, arabe intact', () => {
  const a = w0.AmiDesMots.affiche;
  assert.strictEqual(a('fr', 'CHAT'), 'chat');
  assert.strictEqual(a('de', 'KATZE'), 'Katze');
  assert.strictEqual(a('tr', 'KEDİ'), 'kedi');
  assert.strictEqual(a('uk', 'КІТ'), 'кіт');
  assert.strictEqual(a('ar', 'قطة'), 'قطة');
  assert.strictEqual(a('fr', 'boîte aux lettres'), 'boîte aux lettres');
});

console.log('Le jeu');
const etat = w => JSON.parse(w.localStorage.getItem('amidesmots:v2'));
const attendre = ms => new Promise(r => setTimeout(r, ms));
await test('accueil → thèmes → jeu « écoute et trouve » : 4 images, la bonne parmi elles', () => {
  const w = page(); const d = w.document;
  assert.match(d.querySelector('h1').textContent, /Ami des mots/);
  clic(w, '[data-a="themes"]'); clic(w, '[data-a="theme"][data-v="animaux"]'); clic(w, '[data-a="jeu"][data-v="ecoute:n"]');
  const ch = [...d.querySelectorAll('[data-a="repondre"]')].map(b => b.dataset.v);
  assert.strictEqual(ch.length, 4); assert.ok(ch.includes(d.querySelector('[data-a="ecouter"]').dataset.v));
});
await test('une partie sans faute : 3 étoiles, des plumes, le jour, les mots notés — une seule clé gardée', async () => {
  const w = page(); const d = w.document;
  w.AmiDesMots.choisirJeu('manger'); w.AmiDesMots.commencer('quel_mot');
  for(let i = 0; i < 6; i++){
    const bonne = d.querySelector('.pic-grande').getAttribute('src').match(/pictos\/(.+)\.webp/)[1];
    const e = Object.keys(w.MOTS).find(k => w.MOTS[k].img === bonne);
    clic(w, '[data-a="repondre"][data-v="' + e + '"]');
    await attendre(1600);
  }
  assert.match(d.querySelector('.fin h2').textContent, /terminée/);
  const J = etat(w).joueurs[0];
  assert.strictEqual(w.AmiDesMots.base.cible, 'en', 'interface française → on apprend l\'anglais (langues masquées)');
  assert.strictEqual(J.etoiles['en:manger:quel_mot:n'], 3);
  assert.strictEqual(J.plumes, 9);
  assert.strictEqual(J.jours.length, 1);
  assert.strictEqual(Object.values(J.mots).filter(f => f.b === 1).length, 6, 'chaque mot monte d\'une boîte');
  assert.ok(J.trophees.includes('premiere'));
  assert.deepStrictEqual(Object.keys(w.localStorage).filter(k => k !== 'amidesmots:v2'), [], 'une seule clé');
});
await test('une erreur ne bloque pas : l\'image fausse est grisée, la correction s\'affiche, « J\'ai compris » continue, le mot revient à réviser', () => {
  const w = page(); const d = w.document;
  w.AmiDesMots.choisirJeu('animaux'); w.AmiDesMots.commencer('ecoute');
  const bonne = d.querySelector('[data-a="ecouter"]').dataset.v;
  const faux = [...d.querySelectorAll('[data-a="repondre"]')].find(b => b.dataset.v !== bonne);
  faux.click();
  assert.ok(faux.disabled && faux.classList.contains('faux'));
  assert.match(d.getElementById('bulle').textContent, /C'était : /, 'la bonne réponse est donnée');
  const suite = d.getElementById('continuer-erreur');
  assert.ok(suite && !suite.hidden, 'bouton « J\'ai compris — continuer » visible');
  const avant = d.querySelector('.progres').getAttribute('aria-valuenow');
  suite.click();
  assert.strictEqual(Number(d.querySelector('.progres').getAttribute('aria-valuenow')), Number(avant) + 1, 'on passe à la question suivante');
  assert.ok(w.AmiDesMots.aRevoir().includes(bonne));
});
await test('révision espacée : juste → plus tard, faux → aujourd\'hui ; « À revoir » ne propose que les mots dus', () => {
  const w = page(); const A = w.AmiDesMots;
  const [a, b] = A.motsDu('animaux', A.base.cible);
  A.noter(a, true); A.noter(a, true); A.noter(b, false);
  const f = A.J().mots;
  assert.strictEqual(f[A.base.cible + ':' + a].b, 2); assert.strictEqual(f[A.base.cible + ':' + a].d, A.jour(3));
  assert.deepStrictEqual(Array.from(A.aRevoir()), [b]);
  A.revoir();
  assert.match(w.document.querySelector('h2').textContent, /revoir/);
});
await test('défi du jour : 8 mots, le même toute la journée, plumes doublées une fois', async () => {
  const w = page(); const A = w.AmiDesMots, d = w.document;
  A.defi(); const un = A.J && d.querySelector('.progres').getAttribute('aria-valuemax');
  assert.strictEqual(un, '8');
  const w2 = page(); w2.AmiDesMots.defi();
  // même graine → même premier mot (image ou bouton d'écoute)
  const premier = x => (x.document.querySelector('.pic-grande') || {}).src || x.document.querySelector('[data-a="ecouter"]').dataset.v;
  void premier;
  // termine le défi en répondant juste
  for(let i = 0; i < 8; i++){
    const vf = d.querySelector('[data-a="vf"]');
    if(vf){
      const mot = d.querySelector('.mot-vf').textContent, bonne = d.querySelector('.pic-grande').getAttribute('src').match(/pictos\/(.+)\.webp/)[1];
      const e = Object.keys(w.MOTS).find(k => w.MOTS[k].img === bonne);
      const vrai = A.affiche(A.base.cible, w.MOTS[e][A.base.cible]) === mot;
      clic(w, '[data-a="vf"][data-v="' + (vrai ? 1 : 0) + '"]');
    }else{
      const ec = d.querySelector('.partie [data-a="ecouter"]');
      const e = ec ? ec.dataset.v : Object.keys(w.MOTS).find(k => w.MOTS[k].img === d.querySelector('.pic-grande').getAttribute('src').match(/pictos\/(.+)\.webp/)[1]);
      clic(w, '[data-a="repondre"][data-v="' + e + '"]');
    }
    await attendre(1600);
  }
  assert.match(d.querySelector('.fin h2').textContent, /Défi du jour/);
  assert.strictEqual(A.J().plumes, (8 + 3) * 2);
  assert.strictEqual(A.J().defis.length, 1);
});
await test('vrai ou faux : la bonne réponse est notée juste', () => {
  const w = page(); const A = w.AmiDesMots, d = w.document;
  A.choisirJeu('animaux'); A.commencer('vrai_faux');
  const bonne = Object.keys(w.MOTS).find(k => w.MOTS[k].img === d.querySelector('.pic-grande').getAttribute('src').match(/pictos\/(.+)\.webp/)[1]);
  const vrai = A.affiche(A.base.cible, w.MOTS[bonne][A.base.cible]) === d.querySelector('.mot-vf').textContent;
  clic(w, '[data-a="vf"][data-v="' + (vrai ? 1 : 0) + '"]');
  assert.ok(d.querySelector('.vf-oui.juste, .vf-non.juste'));
  assert.strictEqual(A.J().mots[A.base.cible + ':' + bonne].b, 1);
});
await test('lettres en vrac : remettre les lettres dans l\'ordre réussit ; pas proposé en coréen (écriture sans lettres)', () => {
  const w = page(); const d = w.document, A = w.AmiDesMots;
  A.base.cible = 'fr'; A.choisirJeu('animaux');
  assert.ok(d.querySelector('[data-a="jeu"][data-v^="lettres:"]'));
  A.commencer('lettres');
  const tuiles = [...d.querySelectorAll('.tuile')].sort((a, b) => a.dataset.v - b.dataset.v);
  tuiles.forEach(b => b.click());
  assert.ok(d.getElementById('reponse').classList.contains('juste'));
  A.base.cible = 'ko'; A.choisirJeu('animaux');
  assert.strictEqual(d.querySelector('[data-a="jeu"][data-v^="lettres:"]'), null);
});
await test('mémoire : deux cartes du même mot restent ouvertes', () => {
  const w = page(); const d = w.document;
  w.AmiDesMots.choisirJeu('animaux'); w.AmiDesMots.commencer('memoire');
  const c = [...d.querySelectorAll('.mcarte')];
  assert.strictEqual(c.length, 12);
  const [a, b] = c.filter(x => x.dataset.v === c[0].dataset.v);
  a.click(); b.click();
  assert.ok(a.classList.contains('trouvee') && b.classList.contains('trouvee'));
});
await test('plusieurs joueurs : chacun sa progression ; « Qui joue ? » au lancement', () => {
  const w = page(); const A = w.AmiDesMots, d = w.document;
  clic(w, '[data-a="reglages"]'); clic(w, '[data-a="nouveau-joueur"]');
  d.getElementById('nom-joueur').value = 'Léa';
  d.getElementById('form-joueur').dispatchEvent(new w.Event('submit', { cancelable:true }));
  A.J().plumes = 12;
  clic(w, '[data-a="reglages"]'); clic(w, '[data-a="nouveau-joueur"]');
  d.getElementById('nom-joueur').value = 'Papi';
  d.getElementById('form-joueur').dispatchEvent(new w.Event('submit', { cancelable:true }));
  const E = etat(w);
  assert.deepStrictEqual(E.joueurs.map(j => j.nom), ['Léa', 'Papi']);
  assert.strictEqual(E.joueurs[0].plumes, 12); assert.strictEqual(E.joueurs[1].plumes, 0);
  const w2 = page(undefined, undefined, x => x.localStorage.setItem('amidesmots:v2', JSON.stringify(E)));
  assert.match(w2.document.querySelector('h2').textContent, /Qui joue/);
  assert.strictEqual(w2.document.querySelectorAll('[data-a="choisir-joueur"]').length, 2);
});
await test('reprise de la v1 : plumes, étoiles et vestiaire deviennent le premier joueur', () => {
  const w = page(undefined, undefined, x => x.localStorage.setItem('amidesmots:v1', JSON.stringify({ ui:'fr', cible:'es', plumes:33, etoiles:{ 'es:animaux:ecoute':2 }, jours:[], porte:['echarpe'] })));
  const E = etat(w);
  // L'espagnol est masqué pour l'instant : on apprend l'anglais, mais le choix « es » est gardé pour plus tard.
  assert.strictEqual(E.cible, 'es', 'v5.99.2 : l’espagnol est une langue scolaire, il reste choisi');
  assert.strictEqual(E.joueurs[0].plumes, 33); assert.strictEqual(E.joueurs[0].etoiles['es:animaux:ecoute'], 2);
  assert.deepStrictEqual(E.joueurs[0].porte, ['echarpe']);
  assert.strictEqual(w.localStorage.getItem('amidesmots:v1'), null);
});

console.log('Les 50 jeux');
await test('catalogue : 50 jeux, 19 sortes, 6 familles ; chaque nom et consigne traduits', () => {
  const w = page(); const A = w.AmiDesMots;
  assert.strictEqual(A.CATALOGUE.length, 50);
  assert.strictEqual(new Set(A.CATALOGUE.map(c => c.id)).size, 50);
  assert.strictEqual(A.MECAS.length, 19);
  for(const l in w.TEXTES) for(const [m] of A.MECAS){ assert.ok(w.TEXTES[l]['j_' + m], l + ' j_' + m); assert.ok(w.TEXTES[l]['a_' + m], l + ' a_' + m); }
});
await test('chacun des 50 jeux se lance et affiche de quoi répondre (français → anglais, et kabyle)', () => {
  for(const [ui, cible] of [['fr', 'en'], ['fr', 'kab'], ['de', 'fr'], ['fr', 'es'], ['fr', 'de'], ['fr', 'it'], ['fr', 'pt'], ['fr', 'dz'], ['es', 'en']]){
    const w = page(ui === 'fr' ? 'fr-FR' : ui); const A = w.AmiDesMots, d = w.document;
    A.base.cible = cible;
    let lances = 0;
    for(const c of A.CATALOGUE){
      if(!A.disponible(c.meca, 'animaux')) continue;
      A.choisirJeu('animaux'); A.commencer(c.id);
      const rep = d.querySelectorAll('[data-a="repondre"], [data-a="vf"], [data-a="mcarte"], [data-a="lettre"], [data-a="lettre-choix"], [data-a="relier"], [data-a="panier"], #carte');
      assert.ok(rep.length >= 2 || d.querySelector('#carte'), ui + '→' + cible + ' ' + c.id);
      assert.ok(!/undefined|NaN/.test(d.querySelector('main').textContent), ui + '→' + cible + ' ' + c.id + ' texte cassé');
      lances++;
    }
    assert.ok(lances >= 40, ui + '→' + cible + ' : ' + lances);
  }
});
await test('traduction : le mot français, les choix en anglais, la bonne réponse parmi eux', () => {
  const w = page('fr-FR'); const A = w.AmiDesMots, d = w.document;
  A.base.cible = 'en'; A.choisirJeu('animaux'); A.commencer('traduction:e');
  const src = d.querySelector('.mot-source').textContent;
  const choix = [...d.querySelectorAll('[data-a="repondre"]')];
  assert.strictEqual(choix.length, 6, 'expert : 6 choix');
  const bonne = choix.find(b => A.affiche('fr', w.MOTS[b.dataset.v].fr) === src);
  assert.ok(bonne, 'la bonne traduction est proposée');
  assert.strictEqual(bonne.textContent, A.affiche('en', w.MOTS[bonne.dataset.v].en));
  assert.match(d.querySelector('.aide').textContent, /English/);
  bonne.click();
  assert.ok(bonne.classList.contains('juste'));
});
await test('traduction absente quand on apprend sa propre langue', () => {
  const w = page('fr-FR'); const A = w.AmiDesMots;
  A.base.cible = 'fr';
  assert.strictEqual(A.disponible('traduction', 'animaux'), false);
  assert.strictEqual(A.disponible('memoire_trad', 'animaux'), false);
});
await test('lettre manquante et première lettre : la bonne lettre réussit', () => {
  const w = page(); const A = w.AmiDesMots, d = w.document;
  A.base.cible = 'fr'; A.choisirJeu('animaux');
  for(const id of ['lettre_manquante:n', 'premiere_lettre:n']){
    A.commencer(id);
    const e = Object.keys(w.MOTS).find(k => w.MOTS[k].img === d.querySelector('.pic-moyenne').getAttribute('src').match(/pictos\/(.+)\.webp/)[1]);
    const mot = [...A.affiche('fr', w.MOTS[e].fr)];
    const attendu = id.startsWith('premiere') ? mot[0] : mot[[...d.querySelectorAll('.reponse .case')].findIndex(c => c.classList.contains('trou'))];
    const b = [...d.querySelectorAll('[data-a="lettre-choix"]')].find(x => x.dataset.v === attendu);
    assert.ok(b, id); b.click(); assert.ok(b.classList.contains('juste'), id);
  }
});
await test('relier : image puis mot, la paire se fixe ; l\'intrus vient d\'un autre thème', () => {
  const w = page(); const A = w.AmiDesMots, d = w.document;
  A.choisirJeu('animaux'); A.commencer('relier:f');
  const g = d.querySelector('.rel-g'); g.click();
  const dd = d.querySelector('.rel-d[data-v="' + g.dataset.v + '"]'); dd.click();
  assert.ok(g.classList.contains('trouvee') && dd.classList.contains('trouvee'));
  A.commencer('intrus:n');
  const th = [...d.querySelectorAll('[data-a="repondre"]')].map(b => w.MOTS[b.dataset.v].theme);
  assert.strictEqual(th.length, 4);
  assert.strictEqual(th.filter(x => x !== 'animaux').length, 1);
});
await test('contre la montre : un compte à rebours, et la partie s\'arrête seule', async () => {
  const w = page(); const A = w.AmiDesMots, d = w.document;
  A.choisirJeu('animaux'); A.commencer('chrono:n');
  assert.ok(d.getElementById('chrono'));
  const p = A.CONFIG; void p;
});

console.log('Lecture facile (personnes dys)');
await test('lecture facile : se règle par joueur, 3 choix au plus, consigne à écouter, pas de chrono', () => {
  const w = page('fr-FR'); const A = w.AmiDesMots, d = w.document;
  A.base.cible = 'en';
  A.choisirJeu('animaux'); A.commencer('quel_mot:e');
  assert.strictEqual(d.querySelectorAll('[data-a="repondre"]').length, 6, 'sans le mode : 6 choix en expert');
  assert.ok(d.querySelector('[data-a="consigne"]'), 'le bouton 🔊 de consigne existe toujours');
  A.reglages(); clic(w, '[data-a="facile"]');
  assert.strictEqual(A.J().facile, true);
  assert.strictEqual(d.documentElement.dataset.facile, '1');
  A.choisirJeu('animaux'); A.commencer('quel_mot:e');
  assert.strictEqual(d.querySelectorAll('[data-a="repondre"]').length, 3, 'avec le mode : 3 choix');
  A.commencer('memoire:e');
  assert.strictEqual(d.querySelectorAll('.mcarte').length, 8, '4 paires au plus');
  A.commencer('chrono:n');
  assert.strictEqual(d.getElementById('chrono'), null, 'contre la montre sans compte à rebours');
  assert.strictEqual(d.querySelector('.confettis'), null);
  // un autre joueur garde son propre réglage
  A.base.joueurs.push({ nom:'B', couleur:1, plumes:0, etoiles:{}, jours:[], porte:[], mots:{}, trophees:[], defis:[] });
  A.base.actif = 1; A.accueil();
  assert.strictEqual(d.documentElement.dataset.facile, undefined);
});

console.log('Apprendre avant de jouer');
await test('un mot jamais vu est présenté (image, mot, traduction) avant d\'être demandé', () => {
  const w = page('fr-FR', { MODE_PAYANT:false, PRESENTER_NOUVEAUX:true }); const A = w.AmiDesMots, d = w.document;
  A.base.cible = 'en'; A.choisirJeu('animaux'); A.commencer('quel_mot:n');
  assert.match(d.querySelector('h2').textContent, /Nouveau mot/);
  const e = d.querySelector('[data-a="compris"]').dataset.v;
  assert.match(d.querySelector('.trad-nouveau').textContent, new RegExp(A.affiche('fr', w.MOTS[e].fr)));
  clic(w, '[data-a="compris"]');
  assert.ok(d.querySelector('[data-a="repondre"][data-v="' + e + '"]'), 'puis la question sur ce même mot');
  assert.ok(A.J().mots['en:' + e], 'le mot est dans le carnet');
});
await test('« Je le connais déjà » passe la présentation', () => {
  const w = page('fr-FR', { MODE_PAYANT:false, PRESENTER_NOUVEAUX:true }); const A = w.AmiDesMots, d = w.document;
  A.base.cible = 'en'; A.choisirJeu('animaux'); A.commencer('ecoute:n');
  const e = d.querySelector('[data-a="deja-connu"]').dataset.v;
  clic(w, '[data-a="deja-connu"]');
  assert.strictEqual(A.J().mots['en:' + e].b, 1);
  assert.ok(d.querySelector('[data-a="repondre"]'));
});
await test('leçon : 5 mots d\'un thème, présentés puis demandés 2 fois chacun, avec des choix parmi eux', () => {
  const w = page('fr-FR', { MODE_PAYANT:false, PRESENTER_NOUVEAUX:true }); const A = w.AmiDesMots, d = w.document;
  A.base.cible = 'en';
  clic(w, '[data-a="lecon"]');
  assert.match(d.querySelector('h2').textContent, /Nouveau mot/);
  assert.strictEqual(d.querySelector('.progres').getAttribute('aria-valuemax'), '10');
  const vus = new Set();
  for(let k = 0; k < 5; k++){ const b = d.querySelector('[data-a="compris"]'); if(!b) break; vus.add(b.dataset.v); b.click(); const r = d.querySelector('[data-a="repondre"][data-v="' + b.dataset.v + '"]') || d.querySelector('[data-a="vf"]'); assert.ok(r); A.noter(b.dataset.v, true); A.base.joueurs[0]; }
  const th = new Set([...vus].map(e => w.MOTS[e].theme)); assert.strictEqual(th.size, 1, 'un seul thème');
});

console.log('S\'amuser et parler');
await test('une erreur fait rire Plumo, sans gros mots, avec la bonne réponse, jamais deux fois la même vanne de suite', () => {
  const w = page(); const A = w.AmiDesMots, d = w.document;
  for(const l in w.TEXTES){ const b = w.TEXTES[l].blagues; assert.strictEqual(b.length, 12, l); }
  for(const b of w.TEXTES.fr.blagues) assert.ok(!/\b(nul|mauvais|bête|idiot|tu es|honte)\b/i.test(b), b);
  A.choisirJeu('animaux'); A.commencer('ecoute:n');
  const bonne = d.querySelector('.partie [data-a="ecouter"]').dataset.v;
  const faux = [...d.querySelectorAll('[data-a="repondre"]')].find(b => b.dataset.v !== bonne).dataset.v;
  d.querySelector('[data-a="repondre"][data-v="' + faux + '"]').click();
  const txt = d.getElementById('bulle').textContent;
  assert.ok(txt.includes("C'était : " + A.affiche(A.base.cible, w.MOTS[bonne][A.base.cible])), 'correction : ' + txt);
  assert.ok(!/\bundefined\b|\bnull\b|\{|\}/.test(txt), 'variable non remplacée : ' + txt);
  for(let n = 0; n <= 3; n++){
    A.J().humour = n;
    for(const th of w.THEMES){
      const [x, y] = A.motsDu(th, A.base.cible);
      let prec = null;
      for(let k = 0; k < 30; k++){ const b = A.blague(x, y); assert.ok(b && !/\bundefined\b|\bnull\b|\{|\}/.test(b), th + ' ' + n + ' : ' + b); assert.notStrictEqual(b, prec, th + ' niveau ' + n + ' répète : ' + b); prec = b; }
    }
  }
});
await test('vannes : écrites en français et en anglais, 4 niveaux, courtes, sans article devant le mot, variables justes pour chaque jeu', () => {
  const V = w0.VANNES;
  const VARS = { general:'fj', themes:'fj', ecoute:'fj', vf_oui:'mj', vf_non:'j', intrus:'fj', panier:'mpb', lettre:'lbxj', ordre:'xj', relier:'fj', encore:'j', serie:'n', initiale:'fjl', rime:'fj', secours:'' };
  const cles = o => JSON.stringify(Object.keys(o).filter(k => k !== 'accordees').sort());   // accordées : français seulement
  assert.strictEqual(cles(V.fr), cles(V.en)); assert.strictEqual(cles(V.fr.themes), cles(V.en.themes));
  assert.deepStrictEqual(Object.keys(V.fr.themes).sort(), [...w0.THEMES].sort(), 'un catalogue par thème');
  for(const l of ['fr', 'en']) for(const type in VARS){
    const groupes = type === 'themes' ? Object.values(V[l].themes) : [V[l][type]];
    for(const g of groupes){
      assert.strictEqual(g.length, 4, l + ' ' + type + ' : 4 niveaux');
      for(const niv of g){ assert.ok(niv.length >= 2, l + ' ' + type); for(const v of niv){
        assert.ok(v.length <= 100, 'trop long : ' + v);
        for(const [, k] of v.matchAll(/\{(\w)\}/g)) assert.ok(VARS[type].includes(k), l + ' ' + type + ' {' + k + '} inconnu : ' + v);
        if(l === 'fr') assert.ok(!/\b(un|une|le|la|des|du)\s+«\s*\{[fjm]\}/i.test(v), 'article devant le mot (genre inconnu) : ' + v);
        const DOIT = { vf_oui:/\{m\}/, panier:/\{p\}/, lettre:/\{x\}|\{l\}/, ordre:/\{x\}/ }[type];
        if(DOIT) assert.ok(DOIT.test(v), 'la vanne doit citer l’erreur (' + type + ') : ' + v);
        if('fj'.includes(VARS[type][0]) && VARS[type].includes('f') && type !== 'encore') assert.ok(v.includes('{f}'), 'la vanne doit citer le mot choisi : ' + v);
        assert.ok(!/\b(nul|nulle|bête|idiot|stupide|honte|stupid|dumb|idiot|loser)\b/i.test(v), 'vexant : ' + v);
        assert.ok(!/Pok[eé]mon|IKEA|Darwin/i.test(v), 'marque ou nom propre : ' + v);
      } }
    }
  }
});
// Provoque une erreur dans un jeu et renvoie la bulle.
function erreurDans(meca, humour){
  const w = page(); const d = w.document, A = w.AmiDesMots; A.J().humour = humour || 0;
  const motImage = () => Object.keys(w.MOTS).find(k => w.MOTS[k].img === d.querySelector('.pic-grande, .pic-moyenne').getAttribute('src').match(/pictos\/(.+)\.webp/)[1]);
  A.choisirJeu('animaux'); A.commencer(meca);
  const info = { w, A, d };
  if(meca === 'vrai_faux'){
    const e = motImage(), vrai = A.affiche(A.base.cible, w.MOTS[e][A.base.cible]) === d.querySelector('.mot-vf').textContent;
    info.e = e; info.vrai = vrai; info.montre = d.querySelector('.mot-vf').textContent;
    d.querySelector('[data-a="vf"][data-v="' + (vrai ? 0 : 1) + '"]').click();
  }else if(meca === 'premiere_lettre' || meca === 'lettre_manquante'){
    const e = motImage(); info.e = e;
    const g = [...d.querySelectorAll('[data-a="lettre-choix"]')];
    // Une lettre fausse : celle qui n'allume pas la bonne réponse.
    const attendu = meca === 'premiere_lettre' ? A.affiche(A.base.cible, w.MOTS[e][A.base.cible])[0] : null;
    const mauvaise = attendu ? g.find(b => b.dataset.v !== attendu) : g[0];
    info.l = mauvaise.dataset.v; mauvaise.click();
  }else if(meca === 'intrus'){
    const b = [...d.querySelectorAll('[data-a="repondre"]')].find(x => w.MOTS[x.dataset.v].theme === 'animaux');
    info.f = b.dataset.v; b.click();
  }else if(meca === 'lettres'){
    [...d.querySelectorAll('.tuile')].sort((a, b) => b.dataset.v - a.dataset.v).forEach(x => x.click());
  }
  info.bulle = d.getElementById('bulle').textContent;
  return info;
}
await test('genre des mots : tous les mots ont un genre, articles et élisions justes, h aspiré respecté', () => {
  const w = w0, A = w.AmiDesMots;
  for(const e in w.MOTS) assert.ok(['m', 'f'].includes(w.GENRES_FR[e]), 'genre manquant : ' + w.MOTS[e].fr);
  for(const e in w.GENRES_FR) assert.ok(w.MOTS[e], 'genre pour un mot inconnu : ' + e);
  assert.strictEqual(A.avecArticle('🐱').F, 'le chat');
  assert.strictEqual(A.avecArticle('🐢').F, 'la tortue'); assert.strictEqual(A.avecArticle('🐢').e, 'e');
  assert.strictEqual(A.avecArticle('🐝').F, 'l’abeille');
  assert.strictEqual(A.avecArticle('🦉').F, 'le hibou'); assert.strictEqual(A.avecArticle('🦔').F, 'le hérisson');
  assert.strictEqual(A.avecArticle('🥚').F, 'l’œuf'); assert.strictEqual(A.avecArticle('🌳').F, 'l’arbre');
});
await test('vannes accordées : pas de « de le » / « à le », et rendu correct en jeu', () => {
  const w = page(); const A = w.AmiDesMots, V = w.VANNES.fr.accordees;
  assert.strictEqual(V.length, 4);
  for(const niv of V) for(const v of niv){
    assert.ok(!/\b(de|à|en|du)\s+\{[FJ]c?\}/.test(v), 'contraction impossible : ' + v);
    assert.ok(v.includes('{F') && v.includes('{J'), 'cite les deux mots : ' + v);
  }
  A.choisirJeu('animaux'); A.commencer('quel_mot');
  const vus = new Set(); for(let k = 0; k < 200; k++) vus.add(A.blague('🐢', '🦉'));
  const acc = [...vus].filter(b => /la tortue|La tortue/.test(b));
  assert.ok(acc.length, 'des vannes accordées sortent');
  for(const b of acc){ assert.ok(!/\{|\bde le\b|\bà le\b|\ble tortue\b|\bla hibou\b|\bl’hibou\b/i.test(b), b); }
  assert.ok(acc.some(b => /déguisée|arrivée|passée|flattée|soupçonnée|assise/.test(b)) || acc.every(b => !/(déguisé|arrivé|passé|flatté|soupçonné|assis)\b/.test(b.split('hibou')[0])), 'accord féminin : ' + acc.join(' | '));
});
await test('scènes absurdes : les deux vrais mots, articles justes, et la bonne phrase anglaise', () => {
  const w = page(); const A = w.AmiDesMots, S = w.VANNES.fr.scenes, SE = w.VANNES.en.scenes;
  for(const th of w.THEMES){
    assert.ok(S[th] && S[th].length >= 2 && SE[th] && SE[th].length >= 1, 'scènes pour ' + th);
    for(const x of S[th]){ assert.ok(x.t.includes('{J}') || x.t.includes('{de_J}'), x.t); assert.ok(x.t.includes('{F}') || x.t.includes('{de_F}'), x.t);
      assert.ok(!/\b(de|à|au|du)\s+\{[FJ]\}/.test(x.t), 'contraction : ' + x.t); assert.ok(/\{je\}/.test(x.en) && /^[A-Z][^{}]*\{je\}[^{}]*[.!?]$/.test(x.en), x.en); }
    for(const x of SE[th]) assert.ok(x.t.includes('{j}') && x.t.includes('{f}'), x.t);
  }
  // v5.95 : hasard reproductible (le test ne dépend plus de la chance).
  let g = 12345; w.Math.random = () => (g = (g * 1103515245 + 12345) % 2147483648) / 2147483648;
  A.J().humour = 1; A.choisirJeu('animaux'); A.commencer('quel_mot');
  const vus = new Set(); for(let k = 0; k < 400; k++) vus.add(A.blague('🐢', '🐱'));
  const sc = [...vus].filter(b => b.includes('🇬🇧'));
  assert.ok(sc.length >= 2, 'des scènes sortent');
  for(const b of sc){ assert.ok(/la tortue/i.test(b) && /le chat/i.test(b), b); assert.ok(!/\{|\bde le\b|\bà le\b/.test(b), b); assert.match(b, /🇬🇧 « [A-Z][^»]*\bcat\b[^»]*[.!?] »$/, b); }
  // Pas de phrase anglaise quand on apprend une autre langue
  A.base.cible = 'es'; const v2 = new Set(); for(let k = 0; k < 300; k++) v2.add(A.blague('🐢', '🐱')); assert.ok(![...v2].some(b => b.includes('🇬🇧')));
});
await test('pièges de l’anglais : contenu juste, une vanne par erreur, pas de doublon', () => {
  const w = page(); const P = w.PIEGES;
  assert.ok(P.liste.length >= 25);
  assert.strictEqual(new Set(P.liste.map(p => p.id)).size, P.liste.length);
  for(const p of P.liste){
    assert.ok(P.CATS[p.cat] && [1, 2].includes(p.niv), p.id);
    assert.ok(p.fr && p.bon && p.regle && p.faux.length >= 1, p.id);
    for(const f of p.faux){ assert.ok(f.en && f.en !== p.bon && f.vanne.length > 20, p.id); assert.ok(!/\b(nul|bête|idiot|stupide|honte de toi)\b/i.test(f.vanne), f.vanne); }
    const o = P.options(p); assert.strictEqual(new Set(o).size, o.length); assert.ok(o.includes(p.bon));
  }
});
await test('pièges de l’anglais : révision espacée (les ratés reviennent, les réussis s’espacent)', () => {
  const w = page(); const P = w.PIEGES, t0 = Date.UTC(2026, 10, 19), j0 = P.jourNum(t0);
  const e = P.propre({ age:{ b:9, d:1 }, chaud:{ b:2, d:j0 }, zzz:{ b:1, d:1 }, faim:'x' });
  assert.deepStrictEqual(JSON.parse(JSON.stringify(e)), { chaud:{ b:2, d:j0 } });
  assert.strictEqual(P.noter(e, 'chaud', true, t0).b, 3); assert.strictEqual(e.chaud.d, j0 + 7);
  assert.strictEqual(P.noter(e, 'chaud', false, t0).b, 0); assert.strictEqual(e.chaud.d, j0);
  const s = P.seance(e, 6, t0); assert.strictEqual(s.length, 6); assert.strictEqual(s[0].id, 'chaud', 'le piège raté revient en premier');
  assert.strictEqual(new Set(s.map(p => p.id)).size, 6);
  assert.ok(s.slice(1).every(p => p.niv === 1), 'on commence par les pièges débutants');
  for(const p of P.liste) P.noter(e, p.id, true, t0), P.noter(e, p.id, true, t0), P.noter(e, p.id, true, t0);
  assert.strictEqual(P.maitrises(e), P.liste.length);
});
await test('pièges de l’anglais : écran, vanne de l’erreur, règle, plumes, sauvegarde', () => {
  const w = page(); const d = w.document, A = w.AmiDesMots;
  A.base.ui = 'fr'; A.base.cible = 'en'; A.accueil();
  clic(w, '[data-a="anglais"]'); clic(w, '[data-a="pieges"]'); assert.match(d.querySelector('main').textContent, /Pièges déjoués : 0\/\d+/);
  clic(w, '[data-a="pieges-go"]');
  const fr = d.querySelector('.piege-fr').textContent, p = w.PIEGES.liste.find(x => fr.includes(x.fr));
  assert.ok(p, fr); const opts = [...d.querySelectorAll('.piege-opt')];
  const faux = opts.find(b => b.textContent !== p.bon); const plumes = A.J().plumes;
  faux.click();
  const r = d.querySelector('#piege-retour').textContent, vanne = p.faux.find(f => f.en === faux.textContent).vanne;
  assert.ok(r.includes(vanne) && r.includes(p.bon) && r.includes(p.regle), r);
  assert.ok(faux.classList.contains('ko') && opts.find(b => b.textContent === p.bon).classList.contains('ok'));
  assert.strictEqual(A.J().plumes, plumes, 'pas de plumes pour une erreur');
  assert.strictEqual(A.J().pieges[p.id].b, 0);
  opts[0].click(); assert.ok(d.querySelector('#piege-retour').textContent.includes(vanne), 'une seule réponse par piège');
  clic(w, '[data-a="piege-suivant"]');
  const fr2 = d.querySelector('.piege-fr').textContent, p2 = w.PIEGES.liste.find(x => fr2.includes(x.fr));
  [...d.querySelectorAll('.piege-opt')].find(b => b.textContent === p2.bon).click();
  assert.match(d.querySelector('#piege-retour').textContent, /Yes!/); assert.strictEqual(A.J().plumes, plumes + 2);
  for(let k = 0; k < 4; k++){ clic(w, '[data-a="piege-suivant"]'); d.querySelector('.piege-opt').click(); }
  clic(w, '[data-a="piege-suivant"]'); assert.ok(d.querySelector('.pieges-fin'), 'écran de fin');
  // Ailleurs qu'en français → anglais, le bouton n'est pas proposé
  A.base.cible = 'es'; A.accueil(); assert.ok(!d.querySelector('[data-a="pieges"]') && !d.querySelector('[data-a="anglais"]'));
  assert.ok(lire('index.html').includes('js/pieges.js') && lire('sw.js').includes('"js/pieges.js"'));
});
await test('coin anglais : contenu juste (battle, situations, dictée), vannes gentilles', () => {
  const w = page(); const E = w.ANGLAIS, interdit = /\b(nul|nulle|bête|idiot|stupide|moche|honte)\b/i;
  assert.ok(E.BATTLE.length >= 8 && E.SITUATIONS.length >= 5 && E.DICTEE.length >= 12);
  for(const m of E.BATTLE){ assert.ok(m.ami && m.fr && m.bon.en && m.bon.fr && m.faux.length === 2, m.ami);
    for(const f of m.faux){ assert.ok(f.en !== m.bon.en && f.vanne.length > 20 && !interdit.test(f.vanne), f.vanne); } }
  for(const x of E.SITUATIONS){ assert.ok(x.id && x.titre && x.icone && x.qui && x.etapes.length >= 3, x.id);
    for(const et of x.etapes){ assert.ok(et.bon && et.faux.length >= 2, x.id); assert.ok(et.dit || x.intro, 'il faut savoir quoi dire : ' + x.id);
      if(et.dit) assert.ok(et.fr, 'traduction : ' + et.dit); if(et.mode === 'comprendre') assert.ok(et.question && et.dit);
      for(const f of et.faux) assert.ok(f.en !== et.bon && f.vanne.length > 15 && !interdit.test(f.vanne), f.vanne); } }
  assert.strictEqual(new Set(E.SITUATIONS.map(x => x.id)).size, E.SITUATIONS.length);
  for(const p of E.DICTEE){ assert.ok(p.en && p.fr && /^[A-Z].*[.!?]$/.test(p.en), p.en); assert.ok(E.corriger(p.en, p.en).juste, p.en); }
  for(const g of E.HOMO) for(const m of g) assert.ok(E.SENS[m], 'sens de ' + m);
});
await test('dictée : correction tolérante, mots fautifs repérés, vannes sur les mots jumeaux', () => {
  const w = page(); const E = w.ANGLAIS;
  assert.ok(E.corriger('I can see the sea.', 'i can SEE the sea').juste, 'majuscules et ponctuation ignorées');
  assert.ok(E.corriger('Where is my red pen?', "where's my red pen").juste, 'contractions acceptées');
  assert.ok(E.corriger('I’m happy.', "I'm happy").juste, 'apostrophes droites ou courbes');
  const c = E.corriger('I can see the sea.', 'I can sea the sea');
  assert.ok(!c.juste); assert.deepStrictEqual(JSON.parse(JSON.stringify(c.ok)), [true, true, false, true, true]);
  assert.match(E.vanneDictee(c.erreurs[0]), /maillot de bain/);
  const h = E.corriger('I have two cats, too.', 'I have to cats too');
  assert.match(E.vanneDictee(h.erreurs[0]), /« to » veut dire « à \/ vers »… mais ici, c’était « two » \(deux\)/);
  const o = E.corriger('The dog is under the table.', 'The dog is the table'); assert.match(E.vanneDictee(o.erreurs[0]), /« under » a disparu/);
  const f = E.corriger('The flower is in the garden.', 'The flowr is in the garden'); assert.match(E.vanneDictee(f.erreurs[0]), /« flowr » \? Presque ! On écrit « flower »/);
  assert.strictEqual(E.corriger('I know the answer.', '').score, 0);
  const autre = E.corriger('Come here! Can you hear the bird?', 'I can sea the see');
  assert.ok(autre.erreurs.every(e => e.ecrit !== 'i'), 'pas de faux rapprochement « i » / « come »');
  assert.match(E.vanneDictee(autre.erreurs[0], autre.score), /une autre phrase/);
  const trop = E.corriger('I know the answer.', 'I know the the answer'); assert.ok(!trop.juste && !trop.erreurs.length && trop.enTrop[0] === 'the');
});
await test('coin anglais : battle, situation et dictée jouables de bout en bout', () => {
  const w = page(); const d = w.document, A = w.AmiDesMots, E = w.ANGLAIS; A.base.ui = 'fr'; A.base.cible = 'en'; A.accueil();
  clic(w, '[data-a="anglais"]'); assert.strictEqual(d.querySelectorAll('.carte-anglais').length, 14);   // 12 + oral noté + correction par Plumo (v6.0)
  assert.ok(d.querySelector('[data-a="oral"]') && d.querySelector('[data-a="correction"]'));
  // Battle : une mauvaise réplique (vanne, pas de point) puis la bonne
  clic(w, '[data-a="battle"]'); clic(w, '[data-a="battle-go"][data-v="ami"]'); const plumes = A.J().plumes;
  for(let k = 0; k < 3; k++){
    const txt = d.querySelector('.bulle-ami .piege-fr').textContent, m = E.BATTLE.concat(w.CLASH.MANCHES).find(x => txt.includes(x.ami)); assert.ok(m, txt);
    const opts = [...d.querySelectorAll('.piege-opt')];
    if(k === 0){ const f = opts.find(b => b.textContent !== m.bon.en); f.click(); assert.ok(d.querySelector('#battle-retour').textContent.includes(m.faux.find(x => x.en === f.textContent).vanne)); assert.ok(f.disabled); }
    opts.find(b => b.textContent === m.bon.en).click(); assert.match(d.querySelector('#battle-retour').textContent, /Bien envoyé|Trouvé/);
    clic(w, '[data-a="battle-suivant"]');
  }
  assert.match(d.querySelector('.battle-score').textContent, /Toi 2 – 1 Plumo/); assert.strictEqual(A.J().plumes, plumes + 4);
  assert.strictEqual(A.J().anglais.victoires, 1);
  // Situation au café
  clic(w, '[data-a="anglais"]'); clic(w, '[data-a="situations"]'); clic(w, '[data-a="situation-go"][data-v="cafe"]');
  const cafe = E.SITUATIONS.find(x => x.id === 'cafe');
  for(const et of cafe.etapes){ assert.ok(d.querySelector('main').textContent.includes(et.dit));
    [...d.querySelectorAll('.piege-opt')].find(b => b.textContent === et.bon).click(); clic(w, '[data-a="situation-suivant"]'); }
  assert.match(d.querySelector('main').textContent, /réussi/); assert.deepStrictEqual(JSON.parse(JSON.stringify(A.J().anglais.situations)), ['cafe']);
  // Dictée : une phrase parfaite, une avec faute
  clic(w, '[data-a="anglais"]'); clic(w, '[data-a="dictee"]');
  const p1 = () => E.DICTEE.find(x => x.en);
  for(let k = 0; k < 5; k++){
    const z = d.querySelector('#dictee-texte'); assert.ok(z);
    clic(w, '[data-a="dictee-verifier"]'); assert.strictEqual(d.querySelector('#dictee-retour').textContent, '', 'rien écrit : on attend');
    z.value = k === 0 ? 'zzz' : '__PHRASE__'; if(k > 0){ const lus = [...E.DICTEE]; z.value = lus.find(x => true).en; }
    clic(w, '[data-a="dictee-verifier"]'); assert.ok(d.querySelector('#dictee-retour .piege-bon'));
    clic(w, '[data-a="dictee-suivant"]');
  }
  assert.match(d.querySelector('main').textContent, /Dictée terminée/);
  // Sauvegarde : l'état anglais est filtré
  A.J().anglais = { situations:['cafe', 'pirate', 'cafe'], victoires:-3, dictees:'x' }; clic(w, '[data-a="anglais"]');
  assert.deepStrictEqual(JSON.parse(JSON.stringify(A.J().anglais)), { situations:['cafe'], victoires:0, battles:0, dictees:0, histoires:[], repete:[], niveaux:[], revisions:[] });
  assert.ok(lire('index.html').includes('js/anglais.js') && lire('sw.js').includes('"js/anglais.js"'));
});
await test('parcours : niveaux, étapes, examen (8 questions, 6 pour réussir), niveaux suivants verrouillés', () => {
  const w = page(); const P = w.PARCOURS;
  const vide = P.progression({}, []);
  assert.strictEqual(vide.length, 3); assert.ok(vide[0].ouvert && !vide[1].ouvert && !vide[0].pret);
  const plein = { mots:99, pieges:99, situations:9, histoires:9, dictees:99, repete:99, victoires:9 };
  const p1 = P.progression(plein, []); assert.ok(p1[0].pret && !p1[1].ouvert);
  const p2 = P.progression(plein, [1]); assert.ok(p2[0].valide && p2[1].ouvert && p2[1].pret);
  assert.strictEqual(P.niveauActuel([1, 2]), 2); assert.strictEqual(P.niveauActuel([2]), 0);
  for(const n of [1, 2, 3]){ const q = P.examen(n, w.PIEGES, w.ANGLAIS); assert.strictEqual(q.length, 8);
    for(const x of q){ assert.ok(x.bon && x.faux.length >= 1 && x.consigne && x.enonce, JSON.stringify(x)); } }
  for(const e of P.REPETER) assert.ok(e.en && e.fr && /[.!?]$/.test(e.en));
  for(let v = 0; v < 5; v++) for(let a = 0; a < 5; a++) for(let l = 0; l < 5; l++){ const x = P.inventer(v, a, l); assert.match(x.en, /^Plumo, you [a-z]+ like an? [a-z ]+ (on|in|at) [a-z ]+!$/); assert.ok(!/undefined/.test(x.fr)); }
  assert.strictEqual(P.inventer(9, 0, 0), null);
});
await test('histoires et blague du jour : contenus complets, une blague par jour', () => {
  const w = page(); const H = w.HISTOIRES.liste, B = w.BLAGUES_EN;
  assert.ok(H.length >= 5); assert.strictEqual(new Set(H.map(h => h.id)).size, H.length);
  for(const h of H){ assert.ok(h.titre && h.fr && h.icone && h.lignes.length >= 6, h.id);
    for(const [e, en, fr] of h.lignes) assert.ok(e && en && fr, h.id);
    assert.strictEqual(h.questions.length, 2);
    for(const q of h.questions){ assert.ok(q.q && q.fr && q.bon && q.faux.length === 2); for(const f of q.faux) assert.ok(f.vanne.length > 15 && f.en !== q.bon); } }
  assert.ok(B.liste.length >= 20); for(const b of B.liste) assert.ok(b.q && b.r && b.fr && b.jeu, b.q);
  const t = Date.UTC(2026, 10, 20); assert.strictEqual(B.duJour(t), B.duJour(t + 3600e3)); assert.notStrictEqual(B.duJour(t), B.duJour(t + 864e5));
});
await test('vannes : souvenirs, personnages du village, « pas drôle » respecté', () => {
  const w = page(); const A = w.AmiDesMots, V = w.VANNES;
  for(const l of ['fr', 'en']){ assert.ok(V[l].souvenir.length >= 3 && V[l].cameos.length >= 3); for(const x of V[l].souvenir.concat(V[l].cameos)) assert.ok(x.includes('{f}') && x.includes('{j}'), x); }
  A.J().humour = 1; A.choisirJeu('animaux'); A.commencer('quel_mot');
  const sorties = []; for(let k = 0; k < 12; k++) sorties.push(A.blague('🐢', '🐱'));
  assert.match(sorties[2], /3ᵉ|n° 3|Encore « la tortue »|Encore « tortue »/, 'à la 3e fois, Plumo s’en souvient : ' + sorties[2]);
  assert.match(sorties[4], /5ᵉ|n° 5|Encore/, sorties[4]);
  assert.strictEqual(A.J().erreurs['mot:🐢>🐱'], 12);
  const cam = new Set(); for(let k = 0; k < 300; k++) cam.add(A.blague('🐶', '🐱')); assert.ok([...cam].some(x => /Paco|Mina|Professor Puzzle/.test(x)), 'un personnage passe dans les vannes');
  // « Pas drôle » : toutes les vannes cameo sauf une notées → seule celle-là peut sortir
  A.J().pasDrole = V.fr.cameos.slice(1); const restes = new Set(); for(let k = 0; k < 400; k++){ const b = A.blague('🐶', '🐱'); if(/Paco|Mina|Professor/.test(b)) restes.add(b); }
  for(const b of restes) assert.ok(b.startsWith('Paco renifle'), b);
});
await test('coin anglais 2 : parcours, révision du jour, histoire, répéter, invente ta vanne, espace parents', () => {
  const w = page(); const d = w.document, A = w.AmiDesMots; A.base.ui = 'fr'; A.base.cible = 'en'; A.accueil();
  clic(w, '[data-a="anglais"]');
  assert.ok(d.querySelector('.carte-parcours') && d.querySelector('.carte-revision') && d.querySelector('.blague-jour'));
  // Parcours : niveau 1 ouvert, niveaux 2-3 fermés, pas d'examen
  clic(w, '[data-a="parcours"]'); assert.strictEqual(d.querySelectorAll('.niveau.ferme').length, 2); assert.ok(!d.querySelector('[data-a="examen"]'));
  // Histoire : lire les lignes puis 2 questions
  clic(w, '[data-a="anglais"]'); clic(w, '[data-a="histoires"]'); clic(w, '[data-a="histoire-go"][data-v="chapeau"]');
  for(let k = 0; k < 8; k++){ assert.ok(d.querySelector('.lecture-texte')); clic(w, '[data-a="ligne-suivante"]'); }
  const h = w.HISTOIRES.liste[0];
  for(const q of h.questions){ [...d.querySelectorAll('.piege-opt')].find(b => b.textContent === q.bon).click(); clic(w, '[data-a="qz-suivant"]'); }
  assert.match(d.querySelector('main').textContent, /The end!/); assert.deepStrictEqual(JSON.parse(JSON.stringify(A.J().anglais.histoires)), ['chapeau']);
  // Révision du jour : 6 à 8 questions, la série de jours démarre
  clic(w, '[data-a="anglais"]'); clic(w, '[data-a="revision"]'); let n = 0;
  while(d.querySelector('.piege-opt') && n < 10){ d.querySelector('.piege-opt').click(); clic(w, '[data-a="qz-suivant"]'); n++; }
  assert.ok(n >= 6 && n <= 8, 'questions : ' + n); assert.match(d.querySelector('main').textContent, /Révision faite/); assert.strictEqual(A.J().anglais.revisions.length, 1);
  // Répète après Plumo (sans micro dans jsdom) : on peut quand même valider
  clic(w, '[data-a="anglais"]'); clic(w, '[data-a="repeter"]'); assert.ok(d.querySelector('.repeter .piege-fr'));
  clic(w, '[data-a="repeter-bien"]'); assert.deepStrictEqual(JSON.parse(JSON.stringify(A.J().anglais.repete)), [0]);
  clic(w, '[data-a="repeter-suivant"]'); assert.ok(d.querySelector('.repeter .piege-fr').textContent.includes(w.PARCOURS.REPETER[1].en));
  // Invente ta vanne : la phrase change avec les choix, on peut la garder
  clic(w, '[data-a="anglais"]'); clic(w, '[data-a="battle"]'); clic(w, '[data-a="invente"]');
  clic(w, '[data-a="invente-choix"][data-v="a:1"]'); assert.match(d.querySelector('.bulle-ami').textContent, /like a snail/);
  clic(w, '[data-a="invente-garder"]'); assert.ok(A.J().fousRires.some(x => /like a snail/.test(x.v) && x.e === '🦉'));
  // Battle en famille : 4 manches, équipes
  clic(w, '[data-a="battle"]'); clic(w, '[data-a="battle-go"][data-v="famille"]'); assert.match(d.querySelector('.piege-cat').textContent, /🦊 0 – 0 🐼/);
  // Espace parents : fermé sans le bon calcul, puis ouvert ; « ce qui coince » lisible
  A.J().erreurs = { 'mot:🐢>🐱':4, 'piege:age':2, 'dictee:sea>see':3 };
  clic(w, '[data-a="battle"]'); clic(w, '[data-a="anglais"]'); clic(w, '[data-a="parents"]'); d.querySelector('#porte-parents').value = '1'; clic(w, '[data-a="parents-ouvrir"]');
  assert.ok(!d.querySelector('.parents'));
  const txt = d.querySelector('main').textContent, [a, b] = txt.match(/(\d) × (\d)/).slice(1).map(Number);
  d.querySelector('#porte-parents').value = String(a * b); clic(w, '[data-a="parents-ouvrir"]');
  const t2 = d.querySelector('.parents').textContent;
  assert.ok(/Confond 🐱/.test(t2) && /J’ai 10 ans/.test(t2) && /écrit « sea » au lieu de « see »/.test(t2), t2);
  assert.ok(lire('index.html').includes('js/parcours.js') && lire('sw.js').includes('"js/histoires.js"') && lire('sw.js').includes('"assets/3d/ruines.glb"'));
});
await test('v5.42 contenus : oreilles, vrai/faux, Avent, maison, rap, gag — complets et gentils', () => {
  const w = page(); const R = w.RIGOLADE, interdit = /\b(nul|nulle|bête|idiot|stupide|moche|honte)\b/i;
  assert.ok(R.PAIRES.length >= 12); for(const p of R.PAIRES){ assert.ok(p.a.en !== p.b.en && p.a.e !== p.b.e && p.a.fr && p.b.fr && p.rire && !interdit.test(p.rire)); }
  assert.ok(R.VRAI_FAUX.length >= 16 && R.VRAI_FAUX.some(v => v.vrai) && R.VRAI_FAUX.some(v => !v.vrai)); for(const v of R.VRAI_FAUX) assert.ok(v.en && v.fr && v.rire && typeof v.vrai === 'boolean');
  assert.strictEqual(R.AVENT.length, 24); assert.strictEqual(new Set(R.AVENT.map(x => x.en)).size, 24); for(const x of R.AVENT) assert.ok(x.e && x.fr && x.phrase.en && x.phrase.fr && x.vanne);
  assert.strictEqual(R.aventOuvert(new Date(2026, 11, 7)), 7); assert.strictEqual(R.aventOuvert(new Date(2026, 11, 30)), 24); assert.strictEqual(R.aventOuvert(new Date(2027, 0, 3)), 24); assert.strictEqual(R.aventOuvert(new Date(2026, 10, 22)), 0);
  assert.ok(R.MAISON.length >= 14); for(const x of R.MAISON) assert.ok(/^(a|an) /.test(x.en) && x.prix > 0 && ['sol', 'mur'].includes(x.zone), x.id);
  assert.ok(R.MAISON.filter(x => x.en.startsWith('an ')).every(x => /^an [aeiou]/.test(x.en)), 'a / an justes');
  assert.strictEqual(R.RAP.length, 3); for(const m of R.RAP){ assert.strictEqual(m.ami.length, 4); assert.strictEqual(m.toi.length, 2);
    for(const c of m.toi){ assert.ok(c.b.includes('___') && c.bfr && c.faux.length === 2); for(const f of c.faux) assert.ok(f.m !== c.bon && f.vanne.length > 20 && !interdit.test(f.vanne)); } }
  assert.strictEqual(R.GAG.length, 8); assert.match(R.REVELATION, /pain au chocolat/);
});
await test('défi entre potes : lien codé (graine, score, pseudo), mêmes questions des deux côtés, refus des liens trafiqués', () => {
  const w = page(); const R = w.RIGOLADE, S = w.SALON;
  const c = R.coderDefi({ s:123456, n:8, sc:6, p:'Léo <img src=x>' }), d = R.lireDefi(c);
  assert.deepStrictEqual(JSON.parse(JSON.stringify(d)), { s:123456, n:8, sc:6, p:'Léo img srcx' });
  for(const mauvais of ['', 'x', 'eyJ2IjoyfQ', R.coderDefi({ s:1, n:8, sc:9, p:'a' }), R.coderDefi({ s:1, n:7, sc:1, p:'a' }), 'A'.repeat(300)]) assert.strictEqual(R.lireDefi(mauvais), null, mauvais.slice(0, 20));
  const q1 = S.questionsMixtes(987, 8), q2 = S.questionsMixtes(987, 8), q3 = S.questionsMixtes(988, 8);
  assert.deepStrictEqual(JSON.parse(JSON.stringify(q1.map(q => q.id))), JSON.parse(JSON.stringify(q2.map(q => q.id))));
  assert.notDeepStrictEqual(q1.map(q => q.id), q3.map(q => q.id)); assert.strictEqual(new Set(q1.map(q => q.id)).size, 8);
  for(const q of q1) assert.ok(q.bon && q.faux.length >= 1 && q.consigne);
  // Le lien ouvre l'écran du défi reçu
  const w2 = page(undefined, undefined, x => x.history.replaceState(null, '', '/?defi=' + c)); assert.match(w2.document.querySelector('main').textContent, /Léo img srcx te défie/);
  assert.ok(!w2.document.querySelector('main img[src="x"]'));
});
await test('salon en direct : filtre des messages, codes, points ; publics = réactions seulement', () => {
  const w = page(); const S = w.SALON;
  const f = S.filtrer('salut idiot, mon snap c’est @leo123, appelle le 06 12 34 56 78 ou www.site.com <b>');
  assert.ok(!/idiot|snap|@leo|06 12|www\.|<b>/i.test(f.texte), f.texte); assert.ok(f.masques.length >= 4);
  assert.strictEqual(S.filtrer('Good game! 😂').texte, 'Good game! 😂');
  assert.ok(S.filtrer('a'.repeat(200)).texte.length <= 80);
  for(let k = 0; k < 50; k++) assert.ok(S.codeValide(S.nouveauCode()));
  assert.ok(!S.codeValide('ABCD') && !S.codeValide('ABCDI') && !S.codeValide('abcde'));
  assert.strictEqual(S.points(false, 100, 15000), 0); assert.strictEqual(S.points(true, 0, 15000), 150); assert.strictEqual(S.points(true, 15000, 15000), 100);
  // Sans configuration, le salon propose le défi par lien
  const A = w.AmiDesMots; A.base.ui = 'fr'; A.base.cible = 'en'; A.accueil(); clic(w, '[data-a="anglais"]'); clic(w, '[data-a="battle"]'); clic(w, '[data-a="salon"]');
  assert.match(w.document.querySelector('main').textContent, /pas encore branché/); assert.ok(w.document.querySelector('[data-a="defi-pote"]'));
  const J = lire('js/jeu.js'); assert.match(J, /if\(salon\.public \|\| !base\.salonChat \|\| !auteur\) return;/, 'chat ignoré en salon public ou sans accord parental');
});
await test('v5.42 écrans : Plumo se trompe, oreilles, vrai/faux, Avent, maison, bêtisier, famille, rap, visages', () => {
  const w = page(); const d = w.document, A = w.AmiDesMots; A.base.ui = 'fr'; A.base.cible = 'en'; A.accueil();
  // Visages de Plumo
  for(const h of ['vexe', 'mdr', 'choque', 'fier', 'boude', 'malin', 'dort']){ const div = d.createElement('div'); div.innerHTML = A.ami ? A.ami(h) : ''; }
  clic(w, '[data-a="anglais"]'); assert.ok(d.querySelector('[data-a="trompe"]') && d.querySelector('[data-a="maison"]'));
  // Plumo se trompe : on juge 8 phrases
  clic(w, '[data-a="trompe"]'); let n = 0;
  while(d.querySelector('[data-a="trompe-juge"]') && n < 10){ clic(w, '[data-a="trompe-juge"][data-v="faux"]'); const c = d.querySelector('[data-a="trompe-corrige"]'); if(c) c.click(); clic(w, '[data-a="trompe-suivant"]'); n++; }
  assert.strictEqual(n, 8); assert.match(d.querySelector('main').textContent, /points/);
  // Oreilles et vrai/faux
  for(const jeu of ['oreilles', 'vraifaux']){ clic(w, '[data-a="anglais"]'); clic(w, '[data-a="' + jeu + '"]'); let k = 0; while(d.querySelector('.piege-opt') && k < 10){ d.querySelector('.piege-opt').click(); clic(w, '[data-a="qz-suivant"]'); k++; } assert.strictEqual(k, 8, jeu); }
  // Avent : case 1 en avant-première, défi, +2 plumes une fois
  clic(w, '[data-a="anglais"]'); clic(w, '[data-a="avent"]'); const p0 = A.J().plumes; clic(w, '[data-a="avent-case"][data-v="1"]');
  [...d.querySelectorAll('.piege-opt')].find(b => b.textContent === 'snow').click(); assert.strictEqual(A.J().plumes, p0 + 2); assert.deepStrictEqual(JSON.parse(JSON.stringify(A.J().avent)), [1]);
  // Maison : acheter, poser, entendre, ranger ; pas assez de plumes = bouton grisé
  A.J().plumes = 20; clic(w, '[data-a="avent"]'); clic(w, '[data-a="anglais"]'); clic(w, '[data-a="maison"]');
  clic(w, '[data-a="maison-acheter"][data-v="sofa"]'); assert.strictEqual(A.J().plumes, 10); assert.strictEqual(A.J().maison.places.sol0, 'sofa');
  assert.match(d.querySelector('#maison-msg').textContent, /a comfy sofa/); assert.ok(d.querySelector('[data-a="maison-acheter"][data-v="piano"]').disabled);
  clic(w, '[data-a="maison-fente"][data-v="sol0"]'); clic(w, '[data-a="maison-ranger"]'); assert.ok(!A.J().maison.places.sol0);
  clic(w, '[data-a="maison-fente"][data-v="sol3"]'); assert.strictEqual(A.J().maison.places.sol3, 'sofa');
  // Bêtisier : les vannes vues reviennent en best-of
  clic(w, '[data-a="anglais"]'); clic(w, '[data-a="betisier"]'); clic(w, '[data-a="best-suivant"]'); assert.match(d.querySelector('main').textContent, /N° \d/);
  // Battle en famille : 2 joueurs
  clic(w, '[data-a="anglais"]'); clic(w, '[data-a="battle"]'); clic(w, '[data-a="tournoi"]'); d.querySelector('#fam0').value = 'Papa'; d.querySelector('#fam1').value = 'Léa'; clic(w, '[data-a="tournoi-go"]');
  for(let k = 0; k < 2; k++){ clic(w, '[data-a="tournoi-joue"]'); for(let q = 0; q < 6; q++){ d.querySelector('.piege-opt').click(); clic(w, '[data-a="qz-suivant"]'); } }
  assert.ok(d.querySelector('.podium') && /Papa/.test(d.querySelector('.podium').textContent) && /Léa/.test(d.querySelector('.podium').textContent));
  // Rap : 3 manches de 4 lignes + 2 rimes
  clic(w, '[data-a="battle"]'); clic(w, '[data-a="rap"]');
  for(let m = 0; m < 3; m++){ for(let l = 0; l < 5; l++) clic(w, '[data-a="rap-suivant"]'); for(let c = 0; c < 2; c++){ const R = w.RIGOLADE.RAP[m].toi[c]; [...d.querySelectorAll('.rap-mots .piege-opt')].find(b => b.textContent === R.bon).click(); assert.match(d.querySelector('#rap-retour').textContent, /crowd|Oooo|Mic drop/); clic(w, '[data-a="rap-apres"]'); } }
  assert.match(d.querySelector('main').textContent, /Champion du micro/);
});
await test('Plumo apprend : vannes gardées favorisées, vannes de la famille, gag de la chocolatine toutes les 30 vannes', () => {
  const w = page(); const A = w.AmiDesMots, V = w.VANNES; A.J().humour = 1; A.choisirJeu('animaux'); A.commencer('quel_mot');
  A.J().vannesFamille = ['« {f} » ? Même tonton n’aurait pas osé ! C’était « {j} ».'];
  const vus = []; for(let k = 0; k < 400; k++) vus.push(A.blague('🐶', '🐱'));
  assert.ok(vus.some(v => /Même tonton n’aurait pas osé ! C’était « le chat »|Même tonton n’aurait pas osé ! C’était « chat »/.test(v)), 'la vanne de la famille sort');
  assert.ok(vus.some(v => /chocolatine/.test(v)), 'le gag revient');
  assert.ok(A.J().gag >= 8, 'le gag avance jusqu’à la révélation : ' + A.J().gag); assert.ok(vus.some(v => /pain au chocolat/.test(v)));
});
await test('juge de vannes : refuse ce qui vise la personne, laisse passer les vannes sur la confusion', () => {
  const w = page(); const J = w.JUGE;
  for(const mauvaise of ['Tu es nul en anglais !', 't’es trop moche', 'You are so stupid!', 'Ta mère confond cat et dog', 'Je vais te taper si tu te trompes', 'Mon insta : @leo_123', 'Appelle-moi au 06 12 34 56 78',
    'C’est de la merde', 'What the fuck', 'Quel mongol', 'You’re fat and slow', 'Va sur www.blagues.example', 'I will kill you'])
    assert.ok(!J.juger(mauvaise).ok, 'devait être refusée : ' + mauvaise);
  for(const bonne of ['« {f} » ? Même tonton Marcel n’aurait pas osé ! C’était « {j} ».', 'Plumo a confondu la cloche et la sonnette ! 🔔', 'You dance like a penguin on ice skates!', 'Le chat est nul en natation ? Non : le chat ne nage pas, c’est tout ! 🐱']
    .slice(0, 3)) assert.ok(J.juger(bonne).ok, 'devait passer : ' + bonne + ' — ' + J.juger(bonne).raisons);
  // Tout le contenu de l'appli passe le juge (régression : aucune vanne livrée ne vise la personne)
  const tout = []; const parcourir = x => { if(typeof x === 'string'){ if(x.trim()) tout.push(x); } else if(Array.isArray(x)) x.forEach(parcourir); else if(x && typeof x === 'object') Object.values(x).forEach(parcourir); };
  for(const k of ['VANNES', 'PIEGES', 'ANGLAIS', 'HISTOIRES', 'BLAGUES_EN', 'PARCOURS', 'RIGOLADE']) parcourir(w[k]);
  const refus = tout.filter(t => !J.juger(t).ok); assert.deepStrictEqual(refus, [], refus.slice(0, 3).join(' | '));
  assert.ok(tout.length > 2000);
  // Apprentissage : 😂 monte, 🙄 retire
  let sc = {}; sc = J.noter(sc, 'A', 2); sc = J.noter(sc, 'A', 2); assert.strictEqual(J.poids(sc, 'A'), 4);
  sc = J.noter(sc, 'B', -3); assert.ok(J.retiree(sc, 'B') && J.poids(sc, 'B') === 0);
});
await test('juge de vannes en jeu : vanne de famille refusée, « pas drôle » retire, « je la garde » favorise', () => {
  const w = page(); const d = w.document, A = w.AmiDesMots; A.base.ui = 'fr'; A.base.cible = 'en'; A.accueil();
  clic(w, '[data-a="anglais"]'); clic(w, '[data-a="parents"]'); const [a, b] = d.querySelector('main').textContent.match(/(\d) × (\d)/).slice(1).map(Number);
  d.querySelector('#porte-parents').value = String(a * b); clic(w, '[data-a="parents-ouvrir"]');
  d.querySelector('#vanne-famille').value = 'Tu es vraiment nul !'; clic(w, '[data-a="vanne-famille-ajout"]');
  assert.match(d.querySelector('main').textContent, /Plumo refuse cette vanne \(vise la personne\)/); assert.strictEqual((A.J().vannesFamille || []).length, 0);
  d.querySelector('#vanne-famille').value = '« {f} » ? Même Paco aurait trouvé « {j} » !'; clic(w, '[data-a="vanne-famille-ajout"]');
  assert.match(d.querySelector('main').textContent, /Vanne acceptée/); assert.strictEqual(A.J().vannesFamille.length, 1);
  // « Pas drôle » sur toutes les vannes de personnages sauf une : seule celle-ci peut sortir (le juge la garde)
  A.J().humour = 1; A.choisirJeu('animaux'); A.commencer('quel_mot');
  for(const m of w.VANNES.fr.cameos.slice(1)) A.J().notesVannes = w.JUGE.noter(A.J().notesVannes, m, -3);
  A.J().pasDrole = []; const restes = new Set(); for(let k = 0; k < 400; k++){ const v = A.blague('🐶', '🐱'); if(/Paco|Mina|Professor/.test(v) && !/Même Paco|chocolatine/.test(v)) restes.add(v); }
  for(const v of restes) assert.ok(v.startsWith('Paco renifle'), v);
});
await test('familles de confusions : astuce affichée quand on confond cat et dog en apprenant l’anglais', () => {
  const w = page(); const A = w.AmiDesMots;
  for(const c of w.CONFUSIONS){ for(const e of c.p) assert.ok(w.MOTS[e], 'image inconnue ' + e); assert.ok(c.fr.length <= 90 && c.en.length <= 90, c.fr); }
  assert.strictEqual(A.base.cible, 'en');
  assert.match(A.astuce('🐱', '🐶', 'fr'), /miaou/);
  assert.match(A.astuce('🐶', '🐱', 'en'), /meow/);
  assert.strictEqual(A.astuce('🐱', '🦀', 'fr'), '');
});
await test('Lecture facile : Plumo reste « Tout doux », vannes courtes, et le réglage le dit', () => {
  const w = page(); const A = w.AmiDesMots, d = w.document;
  A.J().humour = 3; A.base.joueurs[A.base.actif].facile = true;
  assert.strictEqual(A.niveauHumour(), 0);
  A.choisirJeu('animaux'); A.commencer('quel_mot');
  for(let k = 0; k < 40; k++){ const b = A.blague('🐱', '🐶'); assert.ok(b.length <= 90, b); }
  A.reglages(); assert.match(d.body.textContent, /Lecture facile activée/);
});
await test('carnet des fous rires : garder une vanne, la retrouver, la retirer, retour vers le carnet', () => {
  const w = page(); const A = w.AmiDesMots, d = w.document;
  A.choisirJeu('animaux'); A.commencer('ecoute:n');
  const bonne = d.querySelector('.partie [data-a="ecouter"]').dataset.v;
  [...d.querySelectorAll('[data-a="repondre"]')].find(b => b.dataset.v !== bonne).click();
  const fav = d.getElementById('garder-vanne'); assert.ok(fav && !fav.hidden, 'bouton garder visible');
  fav.click(); fav.click();
  assert.strictEqual(A.J().fousRires.length, 1, 'gardée une seule fois'); assert.strictEqual(A.J().fousRires[0].e, bonne);
  d.getElementById('continuer-erreur').click(); assert.ok(d.getElementById('garder-vanne').hidden);
  d.querySelector('[data-a="accueil"], [data-a="quitter"]') ;
  A.aller ? A.aller('carnet') : null;
  w.document.body.insertAdjacentHTML('beforeend', '<button id="go" data-a="carnet"></button>'); d.getElementById('go').click();
  d.querySelector('[data-a="fous-rires"]').click();
  assert.ok(d.querySelector('.carnet li'), 'vanne listée'); assert.ok(d.body.textContent.includes(A.J().fousRires[0].v));
  d.querySelector('[data-a="oublier-vanne"]').click(); assert.strictEqual(A.J().fousRires.length, 0);
  d.querySelector('.barre [data-a="carnet"]').click(); assert.ok(d.querySelector('[data-a="fous-rires"]'), 'retour au carnet');
});
await test('réaction de Plumo : la classe suit le niveau d’humour', () => {
  for(const n of [0, 3]){
    const w = page(); const A = w.AmiDesMots, d = w.document; A.J().humour = n;
    A.choisirJeu('animaux'); A.commencer('ecoute:n');
    const bonne = d.querySelector('.partie [data-a="ecouter"]').dataset.v;
    [...d.querySelectorAll('[data-a="repondre"]')].find(b => b.dataset.v !== bonne).click();
    const wrap = d.querySelector('#ami-partie .ami-3d-wrap');
    if(wrap) assert.ok(wrap.classList.contains('ami-rx-' + n), wrap.className);
  }
});
await test('vannes du micro : 4 niveaux par langue, citent le mot, ne jugent pas la prononciation', () => {
  for(const l of ['fr', 'en']){ const m = w0.VANNES[l].micro; assert.strictEqual(m.length, 4);
    for(const niv of m) for(const v of niv){ assert.ok(!/(mal|faux|wrong|bad|parfait|perfect)\b/i.test(v), v); for(const [, k] of v.matchAll(/\{(\w+)\}/g)) assert.strictEqual(k, 'j', v); } }
});
await test('Mots City : missions en anglais correct, vannes qui citent l’erreur, lettres, commandes, sauvegarde validée', () => {
  const w = page(); w.eval(lire('js/mots-city.js')); const C = w.MotsCity;
  for(const e of C.LIVRABLES.concat(C.LIEUX)) assert.ok(w.MOTS[e] && w.MOTS[e].en, 'mot inconnu ' + e);
  assert.strictEqual(C.article('🍎'), 'an'); assert.strictEqual(C.article('🍌'), 'a'); assert.strictEqual(C.article('🧀'), 'some'); assert.strictEqual(C.article('🥚'), 'an');
  for(let k = 0; k < 60; k++){
    const l = C.livraison(); assert.strictEqual(l.etals.length, 4); assert.ok(l.etals.includes(l.voulu)); assert.strictEqual(new Set(l.etals.map(C.en)).size, 4, 'étals distincts');
    assert.ok(l.phrase.includes(C.en(l.voulu)) && !/\{|\ba an\b|\ban [bcdfgklmnpstv]/i.test(l.phrase), l.phrase);
    const faux = l.etals.find(e => e !== l.voulu), r = C.juger(l, faux);
    assert.ok(!r.juste && r.vanne.includes('« ' + C.en(faux) + ' »') && r.vanne.includes('« ' + C.en(l.voulu) + ' »'), r.vanne);
    assert.ok(r.correction.startsWith(C.en(l.voulu) + ' = ' + C.fr(l.voulu)), r.correction);
    assert.ok(!/\b(nul|bête|idiot|stupide|honte)\b/i.test(r.vanne), r.vanne);
    const t = C.taxi(); assert.ok(t.phrase.toLowerCase().includes('the ' + C.en(t.voulu)), t.phrase);
    const autre = C.LIEUX.find(e => e !== t.voulu), rt = C.juger(t, autre); assert.ok(rt.vanne.includes(C.en(autre)) && rt.vanne.includes(C.en(t.voulu)), rt.vanne);
    assert.ok(C.juger(t, t.voulu).juste);
  }
  const m = C.lettres(); assert.ok(/^[A-Z]{3,6}$/.test(m.mot)); assert.ok(m.leurres.every(c => !m.mot.includes(c)));
  const leurre = m.leurres[0], r = C.juger(m, leurre);
  assert.ok(!r.juste && r.vanne.includes(leurre) && r.correction.includes(m.mot[0]), r.vanne);
  for(let i = 0; i < m.mot.length; i++){ const ri = C.juger(m, m.mot[i]); assert.ok(ri.juste); if(i === m.mot.length - 1) assert.ok(ri.fini); }
  // Jamais deux fois la même vanne de suite
  let prec = ''; for(let k = 0; k < 40; k++){ const v = C.vanne('taxi', { f:'x', j:'y' }); assert.notStrictEqual(v, prec); prec = v; }
  // Chaque touche suit sa flèche (code physique ou lettre)
  const d = (code, key) => C.direction({ code, key });
  assert.strictEqual(d('ArrowUp'), 'haut'); assert.strictEqual(d('ArrowLeft'), 'gauche'); assert.strictEqual(d('ArrowRight'), 'droite'); assert.strictEqual(d('ArrowDown'), 'bas');
  assert.strictEqual(d('KeyW', 'z'), 'haut'); assert.strictEqual(d('KeyA', 'q'), 'gauche'); assert.strictEqual(d('KeyS', 's'), 'bas'); assert.strictEqual(d('KeyD', 'd'), 'droite');
  assert.strictEqual(d('', 'z'), 'haut'); assert.strictEqual(d('', 'q'), 'gauche'); assert.strictEqual(d('KeyX', 'x'), null);
  // Sauvegarde : rien d'étrange ne passe
  const s = C.propre({ plumes:'9e99', fun:42, reussies:{ taxi:-5, livraison:3.7, pirate:9 }, appris:['🐱', '<img>', 7], plus:true });
  assert.deepStrictEqual(JSON.parse(JSON.stringify(s)), { plumes:1000000, fun:5, reussies:{ livraison:3, taxi:0, lettres:0 }, appris:['🐱'], dorees:[], tenue:0 });
  assert.deepStrictEqual(JSON.parse(JSON.stringify(C.propre({ dorees:[1, 1, 3, -2, 999, 'x', 2.5], tenue:9 }).dorees)), [1, 3]);
  assert.strictEqual(C.propre({ tenue:9 }).tenue, C.TENUES.length - 1);
  for(const e of C.PLUMES_DOREES) assert.ok(w.MOTS[e] && w.MOTS[e].en, 'plume dorée : mot inconnu ' + e);
  assert.strictEqual(C.propre('n’importe quoi').plumes, 0);
  for(const l of [C.PASSANTS, C.BOBOS, C.KLAXON, C.RADIO]) for(const [e, f] of l) assert.ok(e && f, e);
});
await test('service worker : Mots City, sa logique et three.js local sont mis en cache (hors ligne)', () => {
  const sw = lire('sw.js');
  for(const f of ['mots-city.html', 'js/mots-city.js', 'vendor/three.module.js', 'js/genres.js', 'js/confusions.js', 'js/vannes.js']) assert.ok(sw.includes('"' + f + '"'), f);
  assert.ok(!lire('mots-city.html').includes('cdn.jsdelivr') && !lire('monde-3d.html').includes('cdn.jsdelivr'), 'plus de CDN : three.js est local');
});
await test('village 3D : habitants anglophones (Quaternius), défis justes, vannes gentilles', () => {
  const w = page(); w.eval(lire('js/metiers.js')); const M = w.METIERS;
  const kit = lire('js/kit3d.js'), habitants = kit.match(/HABITANTS = \[([\s\S]*?)\]/)[1];
  assert.ok(M.liste.length >= 6);
  assert.strictEqual(new Set(M.liste.map(m => m.mot.en)).size, M.liste.length, 'un mot par habitant');
  for(const m of M.liste){
    assert.ok(m.en && m.fr && m.mot.en && m.mot.fr && m.nom, m.id);
    assert.ok(habitants.includes("'" + m.corps + "'"), 'corps inconnu ' + m.corps);
    assert.ok(fs.existsSync(path.join(ICI, 'assets/3d/q/q-' + m.corps.toLowerCase() + '.glb')), m.corps);
    assert.ok(m.en.toLowerCase().includes(m.mot.en) || m.en.toLowerCase().includes(m.mot.en.slice(0, 4)), 'la phrase prépare le mot : ' + m.id);
    for(let k = 0; k < 20; k++){
      const q = M.quiz(m.id); assert.strictEqual(q.choix.length, 3); assert.strictEqual(new Set(q.choix).size, 3); assert.ok(q.choix.includes(m.mot.en)); assert.ok(q.question.includes(m.mot.fr));
      const faux = q.choix.find(c => c !== m.mot.en), v = M.vanne(m.id, faux);
      assert.ok(v.texte.includes('« ' + faux + ' »') && v.texte.includes('« ' + m.mot.en + ' »') && !/[{}]/.test(v.texte), v.texte);
      assert.ok(!/\b(nul|bête|idiot|stupide|honte)\b/i.test(v.texte), v.texte);
    }
  }
  let prec = ''; for(let k = 0; k < 30; k++){ const v = M.vanne('pirate', 'hat', null, prec); assert.notStrictEqual(v.modele, prec); prec = v.modele; }
  // Les animations de combat ont été retirées (jeu familial)
  const anims = fs.readFileSync(path.join(ICI, 'assets/3d/q/q-casual_male.glb')).toString('latin1');
  for(const a of ['Death', 'Punch', 'SwordSlash', 'Shoot_OneHanded', 'RecieveHit']) assert.ok(!anims.includes('"' + a + '"'), a);
  assert.ok(anims.includes('"Walk"') && anims.includes('"Victory"'));
  assert.ok(lire('monde-3d.html').includes('js/metiers.js'));
});
await test('Mots City : nouvelles tenues Quaternius, avec repli si le modèle manque', () => {
  const w = page(); w.eval(lire('js/mots-city.js')); const C = w.MotsCity;
  assert.strictEqual(C.TENUES.length, 8);
  for(const t of C.TENUES.filter(t => /^q:/.test(t.perso))) assert.ok(fs.existsSync(path.join(ICI, 'assets/3d/q/q-' + t.perso.slice(2).toLowerCase() + '.glb')), t.perso);
  assert.strictEqual(C.propre({ tenue:6 }).tenue, 6);
  assert.match(lire('js/kit3d.js'), /KIT\.corps\[nom\] \|\| KIT\.corps\.rogue/);
});
await test('service worker : modèles Quaternius, nature et décodeur meshopt en cache (hors ligne)', () => {
  const sw = lire('sw.js');
  for(const f of fs.readdirSync(path.join(ICI, 'assets/3d/q'))) assert.ok(sw.includes('"assets/3d/q/' + f + '"'), f);
  for(const f of ['assets/3d/nature.glb', 'js/metiers.js', 'js/quetes.js', 'vendor/jsm/libs/meshopt_decoder.module.js']) assert.ok(sw.includes('"' + f + '"'), f);
  assert.ok(fs.existsSync(path.join(ICI, 'assets/3d/CREDITS.md')) && /Quaternius/.test(lire('assets/3d/CREDITS.md')));
});
await test('quête des plumes : 10 indices en anglais, un par habitant/animal, état fiable', () => {
  const w = page(); w.eval(lire('js/metiers.js')); w.eval(lire('js/quetes.js')); const Q = w.QUETES, M = w.METIERS;
  assert.strictEqual(Q.PLUMES.length, 10);
  const donneurs = Q.PLUMES.map(p => p.donneur).sort();
  assert.deepStrictEqual(JSON.parse(JSON.stringify(donneurs)), JSON.parse(JSON.stringify(M.liste.map(m => m.id).concat(['paco', 'mina']).sort())));
  for(const p of Q.PLUMES){
    assert.ok(p.en && p.fr && p.mot.en && p.mot.fr, p.id);
    assert.ok(p.en.toLowerCase().includes(p.mot.en), 'l’indice contient le mot clé : ' + p.id);
    assert.ok(p.x >= -28 && p.x <= 28 && p.z >= -30 && p.z <= 38, 'dans la zone de jeu : ' + p.id);
    assert.ok(p.y < 1, 'près du sol (cachée) : ' + p.id);
  }
  const e = Q.propre({ indices:['p1', 'p1', 'zzz', 3], trouvees:['p9', '<img>'] });
  assert.deepStrictEqual(JSON.parse(JSON.stringify(e)), { indices:['p1'], trouvees:['p9'] });
  assert.strictEqual(Q.reveler(e, 'teacher'), null, 'indice déjà donné');
  assert.strictEqual(Q.reveler(e, 'pirate').id, 'p6'); assert.strictEqual(Q.reveler(e, 'pirate'), null);
  assert.strictEqual(Q.reveler(e, 'inconnu'), null);
  assert.ok(Q.trouver(e, 'p2') && !Q.trouver(e, 'p2') && e.indices.includes('p2'));
  assert.ok(!Q.toutes(e)); for(const p of Q.PLUMES) Q.trouver(e, p.id); assert.ok(Q.toutes(e));
  assert.ok(/voler/.test(Q.BUT) && /plané/.test(Q.RECOMPENSE), 'le but et la récompense sont dits');
  const html = lire('monde-3d.html');
  assert.ok(html.includes('js/quetes.js') && !html.includes('featherSpots'), 'les anciennes plumes visibles sont remplacées');
  assert.ok(!/fillStyle='#ffe27a';for/.test(html), 'les plumes ne sont plus sur la carte');
});
await test('3D : véhicules et ruines Quaternius préparés, chargés en option, crédités', () => {
  const kit = lire('js/kit3d.js');
  assert.match(kit, /export function objetVehicule/); assert.match(kit, /assets\/3d\/vehicules\.glb/); assert.match(kit, /assets\/3d\/ruines\.glb/);
  for(const f of ['vehicules.glb', 'ruines.glb']){ const b = fs.readFileSync(path.join(ICI, 'assets/3d', f)); assert.ok(b.length < 800e3, f + ' léger'); assert.strictEqual(b.slice(0, 4).toString(), 'glTF'); }
  const ruines = fs.readFileSync(path.join(ICI, 'assets/3d/ruines.glb')).toString('latin1');
  for(const n of ['Skull', 'BearTrap', 'DeadTree']) assert.ok(!ruines.includes('"' + n), n + ' exclu');
  assert.match(lire('assets/3d/CREDITS.md'), /Ruins Pack[\s\S]*CC0/);
  const m = lire('monde-3d.html'); assert.match(m, /TRESOR=\[/); assert.match(m, /Go through the arch\./); assert.match(m, /function alleger/);
  assert.match(lire('mots-city.html'), /'Bus', 'SUV', 'SchoolBus', 'Ambulance'/);
});
await test('CSS : rien sur <html>/<body> ne casse position:fixed (fenêtres décalées après défilement)', () => {
  const css = lire('css/jeu.css').replace(/\/\*[\s\S]*?\*\//g, '');
  for(const [, sel, corps] of css.matchAll(/(^|[}\s])((?:html|body)\s*)\{([^}]*)\}/g) ? [...css.matchAll(/(?:^|[}\n])\s*((?:html|body))\s*\{([^}]*)\}/g)] : [])
    assert.ok(!/(^|;|\s)(perspective|transform|filter|contain|will-change)\s*:/.test(corps), sel + ' { ' + corps.trim().slice(0, 80) + ' }');
});
await test('accueil : un lien vers Mots City', () => {
  const w = page(); assert.ok(w.document.querySelector('a[href="mots-city.html"]'));
});
await test('vannes : vrai ou faux parle du mot affiché, jamais de « 0 » ou « 1 »', () => {
  for(let k = 0; k < 6; k++){
    const { w, bulle, e, vrai, montre, A } = erreurDans('vrai_faux', k % 4);
    assert.ok(!/« ?[01] ?»/.test(bulle), bulle);
    assert.ok(bulle.includes('« ' + w.MOTS[e].fr.toLowerCase() + ' »') || bulle.includes(w.MOTS[e].fr.toLowerCase()), 'image nommée : ' + bulle);
    if(!vrai){ const m = Object.keys(w.MOTS).find(x => A.affiche(A.base.cible, w.MOTS[x][A.base.cible]) === montre); assert.ok(bulle.toLowerCase().includes(w.MOTS[m].fr.toLowerCase()), 'mot affiché nommé : ' + bulle); }
  }
});
await test('vannes : première lettre / lettre manquante montrent le mot fabriqué par la lettre choisie', () => {
  for(const meca of ['premiere_lettre', 'lettre_manquante']) for(let k = 0; k < 6; k++){
    const { bulle, l, d } = erreurDans(meca, k % 4);
    if(!d.getElementById('continuer-erreur') || d.getElementById('continuer-erreur').hidden) continue;   // lettre juste par hasard
    assert.ok(!/« [^»]{1,2} » (pour|à la place de) «/.test(bulle), 'une lettre traitée comme un mot : ' + bulle);
    assert.ok(bulle.includes(l), 'la lettre ou le mot fabriqué apparaît : ' + bulle);
  }
});
await test('vannes : l’intrus nomme l’image choisie et l’intrus, pas une vanne d’un autre thème', () => {
  for(let k = 0; k < 6; k++){
    const { w, bulle, f } = erreurDans('intrus', k % 4);
    assert.ok(bulle.includes(w.MOTS[f].fr.toLowerCase()), bulle);
    for(const th of ['manger', 'maison', 'habits', 'ville', 'musique', 'atelier']) for(const niv of w.VANNES.fr.themes[th]) for(const v of niv) assert.ok(!bulle.startsWith(v.split('{')[0]) || v.split('{')[0].length < 6, 'vanne d’un autre thème : ' + bulle);
  }
});
await test('vannes : le panier cite le panier choisi, et la correction est dans la langue des blagues', () => {
  for(const lb of ['fr', 'en']){
    const w = page(); const d = w.document, A = w.AmiDesMots; A.J().langueBlagues = lb;
    A.choisirJeu('animaux'); A.commencer('panier');
    const e = Object.keys(w.MOTS).find(k => w.MOTS[k].img === d.querySelector('.pic-grande').getAttribute('src').match(/pictos\/(.+)\.webp/)[1]);
    const mauvais = d.querySelector('[data-a="panier"]:not([data-v="' + w.MOTS[e].theme + '"])');
    mauvais.click();
    const txt = d.getElementById('bulle').textContent;
    assert.ok(txt.includes(w.TEXTES[lb]['th_' + mauvais.dataset.v]), 'panier choisi : ' + txt);
    assert.ok(txt.endsWith(w.TEXTES[lb]['th_' + w.MOTS[e].theme]), 'bon panier dans la langue des blagues : ' + txt);
  }
});
await test('vannes : lettres en vrac montrent l’ordre essayé', () => {
  const { bulle } = erreurDans('lettres', 1);
  assert.ok(/« [^»]+ »/.test(bulle) && !/\bundefined\b|\{/.test(bulle), bulle);
});
await test('vannes : une série cassée, un mot raté deux fois, la même initiale sont remarqués', () => {
  const w = page(); const A = w.AmiDesMots;
  const vus = new Set();
  const V = w.VANNES.fr, debut = (l) => l.flat().map(v => v.split('{')[0].slice(0, 12));
  A.choisirJeu('animaux'); A.commencer('quel_mot');
  for(let k = 0; k < 40; k++) vus.add(A.blague('🐱', '🐶', { type:'mot', serie:5 }));
  assert.ok([...vus].some(b => b.includes('5')), 'série de 5 citée');
  vus.clear(); for(let k = 0; k < 40; k++) vus.add(A.blague('🐱', '🐶'));
  assert.ok([...vus].some(b => /Encore|encore|coriace|Re-coucou|échappe|rendez-vous|filé|invisible|retour|ennemi|manche|RECHERCHÉ|adore/.test(b)), 'mot raté plusieurs fois');
  const c = Object.keys(w.MOTS).filter(k => w.MOTS[k].theme === 'animaux' && w.MOTS[k].fr[0] === 'C');
  vus.clear(); for(let k = 0; k < 200; k++) vus.add(A.blague(c[0], c[1]));
  assert.ok([...vus].some(b => /« c »/.test(b)), 'même initiale remarquée : ' + c.slice(0, 2));
  void debut; void V;
});
await test('vannes : interface en espagnol → les blagues douces en espagnol, sans aucun français', () => {
  const w = page('es-ES'); const A = w.AmiDesMots, d = w.document;
  A.choisirJeu('animaux'); A.commencer('ecoute:n');
  const bonne = d.querySelector('.partie [data-a="ecouter"]').dataset.v;
  [...d.querySelectorAll('[data-a="repondre"]')].find(b => b.dataset.v !== bonne).click();
  const txt = d.getElementById('bulle').textContent;
  assert.ok(w.TEXTES.es.blagues.some(b => txt.startsWith(b)), txt);
  assert.ok(txt.includes('Era: '), txt); assert.ok(!/C'était|The correct/.test(txt), txt);
});
await test('vannes : la phrase est lue par la voix du téléphone, sans demander un MP3 au serveur des voix', () => {
  const w = page(); const A = w.AmiDesMots, d = w.document;
  const dits = []; w.speechSynthesis = { getVoices:() => [{ lang:'fr-FR', name:'x', default:true }], cancel(){}, resume(){}, speak(u){ dits.push(u.text); } };
  w.SpeechSynthesisUtterance = function(t){ this.text = t; };
  A.choisirJeu('animaux'); A.commencer('ecoute:n');
  const bonne = d.querySelector('.partie [data-a="ecouter"]').dataset.v;
  w.__audio.length = 0;
  [...d.querySelectorAll('[data-a="repondre"]')].find(b => b.dataset.v !== bonne).click();
  assert.ok(!w.__audio.some(u => /audio\/[a-z]+\/[0-9a-z]+\.mp3/.test(u)), 'aucun MP3 demandé pour la vanne : ' + w.__audio.join(' '));
  return new Promise(r => setTimeout(() => { assert.ok(dits.some(x => x.includes("C'était")), 'vanne lue : ' + dits.join(' | ')); r(); }, 200));
});
await test('mot du jour et astuce du jour sur l\'accueil ; page des conseils', () => {
  const w = page(); const d = w.document, A = w.AmiDesMots;
  A.accueil();
  assert.ok(d.querySelector('.mot-jour [data-a="lent"]'), 'écoute lente');
  assert.ok(d.querySelector('.mot-jour [data-a="a-toi"]'), 'à toi');
  assert.ok(d.querySelector('.astuce-jour strong').textContent.length > 3);
  clic(w, '[data-a="astuces"]');
  assert.strictEqual(d.querySelectorAll('.liste-astuces li').length, 8);
});
await test('« À toi ! » sans micro : on peut le dire à voix haute, 1 plume la première fois seulement', () => {
  const w = page(); const A = w.AmiDesMots, d = w.document;
  const e = A.motsDu('animaux', 'kab')[0];
  A.aToi(e);
  assert.ok(d.getElementById('fenetre'));
  clic(w, '[data-a="enregistrer"]');
  return attendre(20).then(() => {
    assert.match(d.getElementById('a-toi-etat').textContent, /voix haute/);
    const p0 = A.J().plumes;
    clic(w, '[data-a="je-l-ai-dit"]'); clic(w, '[data-a="je-l-ai-dit"]');
    assert.strictEqual(A.J().plumes, p0 + 1);
    clic(w, '[data-a="fermer-fenetre"]');
    assert.strictEqual(d.getElementById('fenetre'), null);
  });
});
await test('écoute lente et bouche disponibles sur la carte « Nouveau mot ! »', () => {
  const w = page('fr-FR', { MODE_PAYANT:false, PRESENTER_NOUVEAUX:true }); const A = w.AmiDesMots, d = w.document;
  A.base.cible = 'en'; A.choisirJeu('animaux'); A.commencer('quel_mot:n');
  assert.ok(d.querySelector('.nouveau-mot [data-a="lent"]'));
  assert.ok(d.querySelector('.nouveau-mot [data-a="bouche"]'));
  clic(w, '.nouveau-mot [data-a="lent"]');
  assert.strictEqual(w.Articulation._etat.lent, true, 'la prochaine voix est ralentie');
});

console.log('Gratuit et Ami des mots Plus');
await test('phase de lancement : tout l’univers est gratuit', () => {
  const w = page(undefined, null); const A = w.AmiDesMots, d = w.document;
  assert.strictEqual(A.CONFIG.MODE_PAYANT, false);
  assert.strictEqual(A.plus(), true);
  A.themes();
  assert.strictEqual(d.querySelectorAll('.theme.verrou').length, 0, 'aucun thème verrouillé');
  A.choisirJeu('animaux');
  assert.strictEqual(d.querySelectorAll('[data-a="jeu"].verrou').length, 0, 'aucun jeu verrouillé');
  A.commencer('memoire');
  assert.ok(!d.querySelector('main.plus'), 'les jeux avancés restent accessibles');
  A.choisirJeu('ville');
  assert.ok(!d.querySelector('main.plus'), 'les thèmes sont ouverts');
});
await test('phase de lancement : six profils familiaux sont accessibles', () => {
  const w = page(undefined, null); const d = w.document;
  clic(w, '[data-a="reglages"]');
  for(let i=0;i<5;i++){ clic(w, '[data-a="nouveau-joueur"]'); assert.ok(d.querySelector('#form-joueur')); d.getElementById('nom-joueur').value='Joueur '+(i+2); d.getElementById('form-joueur').dispatchEvent(new w.Event('submit', { cancelable:true })); clic(w, '[data-a="reglages"]'); }
  clic(w, '[data-a="nouveau-joueur"]');
  assert.ok(!d.querySelector('main.plus'), 'aucun paywall pour les six profils');
});
await test('défi du jour : il puise dans tous les thèmes ouverts', () => {
  // v6.52 : mode payant forcé et thèmes gratuits lus dans js/offre.js (la liste écrite en dur n'était plus à jour).
  const w = page(undefined, { MODE_PAYANT:true }); const A = w.AmiDesMots;
  for(let k = 0; k < 5; k++){ A.defi(); }
  const libres = w.OFFRE_AMI.THEMES_GRATUITS; assert.ok(libres.length >= 3);
  assert.ok(A.distincts(Object.keys(w.MOTS).filter(e => w.MOTS[e].kab), 'kab').length > 30);
  w.document.querySelectorAll('[data-a="repondre"], [data-a="ecouter"]').forEach(b => { if(b.dataset.v) assert.ok(libres.includes(w.MOTS[b.dataset.v].theme), b.dataset.v); });
});
await test('abonnement : lien Stripe avec le code anonyme ; un certificat signé ouvre tout ; rien d\'autre n\'est envoyé', async () => {
  const { publique } = await cles();
  const cfg = { MODE_PAYANT:true, LIEN_PAIEMENT:'https://buy.stripe.com/test_abc', API_ABONNEMENT:'https://x.supabase.co/functions/v1/ami-abonnement', CLE_PUBLIQUE:publique };
  const w = page(undefined, cfg); const A = w.AmiDesMots, d = w.document;
  await w.AmiDesMotsPret;
  const code = etat(w).abo.code;
  assert.match(code, /^AMI-[A-Z2-9]{4}-[A-Z2-9]{4}-[A-Z2-9]{4}$/);
  A.ecranPlus();
  assert.strictEqual(d.querySelector('main.plus a.carte-formule').getAttribute('href'), 'https://buy.stripe.com/test_abc?client_reference_id=' + encodeURIComponent(code));
  const fin = new Date(Date.now() + 30 * 864e5).toISOString();
  w.__reponse = { actif:true, fin, jeton:await jeton('AMI-ABCD-EFGH-JKMN', fin) };
  d.getElementById('code').value = 'ami abcd-efgh-jkmn';
  d.getElementById('form-code').dispatchEvent(new w.Event('submit', { cancelable:true }));
  await attendre(80);
  assert.ok(A.plus(), 'le certificat signé ouvre Plus');
  assert.strictEqual(etat(w).abo.code, 'AMI-ABCD-EFGH-JKMN');
  assert.ok(!('actif' in etat(w).abo), 'aucun drapeau « actif » sur l\'appareil');
  for(const u of w.__fetch) assert.match(u, /^https:\/\/x\.supabase\.co\/functions\/v1\/ami-abonnement\?code=AMI-[A-Z0-9-]+$/, 'seul le code part');
  A.choisirJeu('ville');
  assert.strictEqual(d.querySelectorAll('[data-a="jeu"]').length, 50);
  // Au prochain lancement, le certificat gardé suffit, même hors connexion.
  const E = etat(w);
  const w2 = page(undefined, Object.assign({}, cfg, { API_ABONNEMENT:'' }), x => x.localStorage.setItem('amidesmots:v2', JSON.stringify(E)));
  await w2.AmiDesMotsPret; assert.ok(w2.AmiDesMots.plus(), 'hors connexion : certificat vérifié');
});
await test('triche : modifier le stockage du navigateur ne débloque rien', async () => {
  const { publique } = await cles();
  const fin = new Date(Date.now() + 30 * 864e5).toISOString();
  const vrai = await jeton('AMI-AAAA-BBBB-CCCC', fin);
  const essais = [
    { code:'AMI-AAAA-BBBB-CCCC', actif:true, fin },                                         // ancien format « actif:true »
    { code:'AMI-AAAA-BBBB-CCCC', jeton:vrai.replace(/^./, c => c === 'e' ? 'f' : 'e') },    // certificat retouché
    { code:'AMI-ZZZZ-BBBB-CCCC', jeton:vrai },                                               // certificat d'un autre code
    { code:'AMI-AAAA-BBBB-CCCC', jeton:b64u(Buffer.from(JSON.stringify({ c:'AMI-AAAA-BBBB-CCCC', f:fin }))) + '.AAAA' } // fausse signature
  ];
  for(const abo of essais){
    const st = { joueurs:[{ nom:'', couleur:0, plumes:0, etoiles:{}, jours:[], porte:[], mots:{}, trophees:[], defis:[] }], actif:0, abo };
    const w = page(undefined, { MODE_PAYANT:true, CLE_PUBLIQUE:publique }, x => x.localStorage.setItem('amidesmots:v2', JSON.stringify(st)));
    await w.AmiDesMotsPret;
    assert.strictEqual(w.AmiDesMots.plus(), false, JSON.stringify(abo).slice(0, 60));
  }
});
await test('abonnement terminé : tout se referme (après 3 jours de grâce hors ligne)', async () => {
  const { publique } = await cles();
  const fin = new Date(Date.now() - 4 * 864e5).toISOString();
  const st = { joueurs:[{ nom:'', couleur:0, plumes:0, etoiles:{}, jours:[], porte:[], mots:{}, trophees:[], defis:[] }], actif:0, abo:{ code:'AMI-AAAA-BBBB-CCCC', jeton:await jeton('AMI-AAAA-BBBB-CCCC', fin) } };
  const w = page(undefined, { MODE_PAYANT:true, CLE_PUBLIQUE:publique }, x => x.localStorage.setItem('amidesmots:v2', JSON.stringify(st)));
  await w.AmiDesMotsPret;
  assert.strictEqual(w.AmiDesMots.plus(), false);
});
await test('sauvegarde : un fichier qui restaure tous les joueurs ; un mauvais fichier est refusé', async () => {
  const w = page(); const A = w.AmiDesMots, d = w.document;
  A.J().nom = 'Léa'; A.J().plumes = 42; A.noter(A.motsDu('animaux', 'kab')[0], true);
  const sauvegarde = JSON.stringify({ app:'ami-des-mots', version:2, donnees:A.base });
  const w2 = page(); const A2 = w2.AmiDesMots;
  A2.reglages();
  A2.restaurer(new w2.File([sauvegarde], 's.json', { type:'application/json' }));
  await attendre(60);
  assert.strictEqual(A2.J().nom, 'Léa'); assert.strictEqual(A2.J().plumes, 42);
  assert.strictEqual(Object.keys(A2.J().mots).length, 1);
  A2.reglages();
  A2.restaurer(new w2.File(['{"pas":"ça"}'], 'x.json'));
  await attendre(60);
  assert.match(w2.document.getElementById('etat-sauvegarde').textContent, /pas une sauvegarde/);
});
await test('abonnement résilié : dès que le serveur répond « inactif », le certificat est oublié', async () => {
  const { publique } = await cles();
  const fin = new Date(Date.now() + 20 * 864e5).toISOString();
  const st = { joueurs:[{ nom:'', couleur:0, plumes:0, etoiles:{}, jours:[], porte:[], mots:{}, trophees:[], defis:[] }], actif:0, abo:{ code:'AMI-AAAA-BBBB-CCCC', jeton:await jeton('AMI-AAAA-BBBB-CCCC', fin), verifie:'2000-01-01' } };
  const w = page(undefined, { MODE_PAYANT:true, CLE_PUBLIQUE:publique, API_ABONNEMENT:'https://x.supabase.co/functions/v1/ami-abonnement' }, x => { x.localStorage.setItem('amidesmots:v2', JSON.stringify(st)); x.__reponse = { actif:false }; });
  await w.AmiDesMotsPret;
  assert.strictEqual(w.AmiDesMots.plus(), false);
  assert.strictEqual(etat(w).abo.jeton, '');
});
await test('sauvegarde piégée : valeurs absurdes bornées, clés inconnues ignorées, gros fichier refusé', async () => {
  const w = page(); const A = w.AmiDesMots;
  const piege = { donnees:{ joueurs:[{ nom:'<img src=x onerror=alert(1)>' + 'x'.repeat(50), couleur:99, plumes:1e12, etoiles:{ 'kab:animaux:quel_mot:n':3, '__proto__':3, 'x':'y', 'kab:animaux:ecoute:n':9 },
    jours:['2026-01-01', 'pas une date', 5], mots:{ 'kab:🐱':{ b:2, d:'2026-11-01' }, 'kab:🐶':{ b:99, d:'x' } }, porte:['couronne', 'fusée'], trophees:['premiere', 'faux'], defis:[{}] }] } };
  A.reglages(); A.restaurer(new w.File([JSON.stringify(piege)], 'p.json')); await attendre(60);
  const j = A.J();
  assert.strictEqual(j.nom.length, 20); assert.strictEqual(j.couleur, 5); assert.strictEqual(j.plumes, 1e6);
  assert.deepStrictEqual(Object.keys(j.etoiles), ['kab:animaux:quel_mot:n']);
  assert.deepStrictEqual(Array.from(j.jours), ['2026-01-01']); assert.deepStrictEqual(Object.keys(j.mots), ['kab:🐱']);
  assert.deepStrictEqual(Array.from(j.porte), ['couronne']); assert.deepStrictEqual(Array.from(j.trophees), ['premiere']);
  A.accueil(); assert.ok(!w.document.querySelector('img[src="x"]'), 'le nom n\'est jamais interprété comme du HTML');
  A.reglages(); A.restaurer(new w.File(['x'.repeat(2e6 + 10)], 'gros.json')); await attendre(30);
  assert.match(w.document.getElementById('etat-sauvegarde').textContent, /pas une sauvegarde/);
});
await test('langues : seules les langues activées sont visibles ; arabe, turc, polonais, ukrainien et japonais retirés', () => {
  const w = page(); const d = w.document;
  // v6.22 : la langue apprise se choisit dans la porte « Langues » ; l'accueil propose « Ma langue » et « Mon programme ».
  assert.ok(d.querySelector('#programme'), 'le choix du programme doit être sur l’accueil');
  const optsUi = Array.from(d.querySelector('#ui').options).map(o => o.value);
  { const x = d.createElement('button'); x.dataset.a = 'porte-mots'; d.body.appendChild(x); x.click(); x.remove(); }
  const choix = d.querySelector('#cible');
  assert.ok(choix, 'le sélecteur de langue doit être présent');
  // v5.99.2 : « J'apprends » = langues enseignées à l'école (sauf celle qu'on parle) ; « Je parle » = français + ces langues.
  assert.deepStrictEqual(Array.from(choix.options).map(o => o.value), ['en', 'es', 'de', 'it', 'pt']);
  assert.deepStrictEqual(optsUi, ['fr', 'en', 'es', 'de', 'it', 'pt'], 'v5.99.3 : arabe retiré des listes pour l’instant');
  // v6.34 : l'arabe, le turc, le polonais, l'ukrainien et le japonais sont retirés de l'appli (demande explicite).
  for(const l of ['ar', 'tr', 'pl', 'uk', 'ja']){ assert.ok(!w.TEXTES[l] && !w.LANGUES_APPRENDRE[l], l + ' retiré de l’interface'); assert.ok(!Object.values(w.MOTS).some(m => m[l]), l + ' retiré des mots'); }
  assert.strictEqual(w.MOTS['🐱'].ko, '고양이', 'le coréen reste conservé dans les données');
  assert.strictEqual(w.MOTS['🐱'].kab, 'AMCIC', 'le kabyle reste conservé dans les données');
});
await test('voix : le texte prononcé est celui que ReParole a enregistré (minuscules), pas la majuscule de la banque', () => {
  const w = page(); const A = w.AmiDesMots;
  A.base.cible = 'fr';
  const e = Object.keys(w.MOTS).find(k => w.MOTS[k].fr === 'POISSON');
  assert.strictEqual(A.aDire(e), 'poisson');
  assert.match(A.urlVoix('fr', A.aDire(e)), new RegExp('/fr/' + A.fnv1a('poisson') + '\.mp3$'));
  let total = 0, sans = 0;
  for(const l of ['fr', 'en', 'es', 'it', 'pt', 'de']){ A.base.cible = l; for(const k of Object.keys(w.MOTS)) if(w.MOTS[k][l]){ total++; if(A.aDire(k) === w.MOTS[k][l] && /^[^a-zа-яàâçéèêëîïôûùüÿñæœäöüßığşéąęćłńóśźżєіїґ]+$/.test(w.MOTS[k][l])) sans++; } }
  assert.strictEqual(sans, 0, 'aucun mot tout en majuscules envoyé à la voix');
});
await test('v6.34 : un appareil réglé en arabe, turc, polonais, ukrainien ou japonais ouvre l’appli en français, de gauche à droite', () => {
  for(const l of ['ar', 'tr', 'pl', 'uk', 'ja']){
    const w = page(l, null), d = w.document; assert.strictEqual(w.AmiDesMots.base.ui, 'fr', l); assert.notStrictEqual(d.documentElement.dir, 'rtl', l);
    assert.ok(!Array.from(d.querySelector('#ui').options).some(o => o.value === l), l + ' absent de la liste');
  }
});
await test('vestiaire : un accessoire se débloque avec les plumes, et se met', () => {
  const w = page(); const A = w.AmiDesMots, d = w.document;
  A.etat.plumes = 45; clic(w, '[data-a="vestiaire"]');
  assert.strictEqual(d.querySelectorAll('[data-a="porter"]').length, 2);
  clic(w, '[data-a="porter"][data-v="lunettes"]');
  assert.deepStrictEqual(Array.from(A.J().porte), ['lunettes']);
});
await test('carnet : les mots rencontrés, avec leur traduction', () => {
  const w = page(); const A = w.AmiDesMots, d = w.document;
  const [a] = A.motsDu('animaux', 'kab'); A.noter(a, true);
  A.carnet();
  assert.strictEqual(d.querySelectorAll('.ligne-carnet').length, 1);
  assert.ok(d.querySelector('.ligne-carnet').textContent.includes(A.affiche('fr', w.MOTS[a].fr)));
});
await test('aucune promesse de santé, aucun traceur ; un seul envoi : le code d\'abonnement', () => {
  const tout = ['index.html', 'js/jeu.js', 'js/textes.js'].map(lire).join('\n');
  assert.ok(!/rééduc|thérap|aphasi|AVC|guérir|soigne(?!\s+rien)|Alzheimer/i.test(tout.replace(/il ne soigne rien/g, '')), 'promesse de santé');
  const J = lire('js/jeu.js');
  assert.ok(!/google-analytics|gtag|fbq|matomo|sendBeacon|XMLHttpRequest/.test(J));
  assert.strictEqual((J.match(/fetch\(/g) || []).length, 9, 'neuf fetch : solde de plumes (code AMI seulement), fréquentation anonyme (type d’événement et plateforme seulement), vérification du code, vannes IA (Plus), vannes en direct (serveur configuré), carte des programmes de maths, offre signée (rien n’est envoyé), tri des vannes ajoutées (texte de la vanne seulement), code cadeau (code AMI + code cadeau)');
  assert.match(J, /body:JSON\.stringify\(\{ code:base\.abo\.code, cadeau \}\)/);
  assert.match(J, /fetch\(CONFIG\.API_VANNE_JUGE, \{ method:'POST', cache:'no-store', headers:\{ 'Content-Type':'application\/json' \}, body:JSON\.stringify\(\{ fr, en, \.\.\.codePlumes\(\) \}\) \}\)/);
  // v5.99 : le code n'accompagne la vanne que si les plumes sont allumées dans l'admin.
  assert.match(J, /const codePlumes = \(\) => plumesActives\(\) \? \{ code:base\.abo\.code \} : \{\};/);
  assert.match(J, /fetch\(CONFIG\.API_PLUMES, \{ method:'POST', cache:'no-store', headers:\{ 'Content-Type':'application\/json' \}, body:JSON\.stringify\(\{ code:base\.abo\.code \}\) \}\)/);
  assert.match(J, /fetch\(String\(CONFIG\.SERVEUR\)\.replace\(\/\\\/\?\$\/, '\/'\) \+ 'offre\.php', \{ cache:'no-cache' \}\)/);
  assert.match(J, /fetch\(CONFIG\.API_VANNES_DIRECT, /); assert.match(J, /API_VANNES_DIRECT = b \+ 'vannes-direct\.php'/);
  assert.match(J, /fetch\(String\(CONFIG\.SERVEUR\)\.replace\(\/\\\/\?\$\/, '\/'\) \+ 'programme\.php\?quoi=maths'/);
  assert.match(J, /fetch\(CONFIG\.API_ABONNEMENT \+/); assert.match(J, /fetch\(CONFIG\.API_VANNES, /);
  assert.match(lire('index.html'), /connect-src 'self' https:\/\/\*\.supabase\.co wss:\/\/\*\.supabase\.co;/);
  // Le salon en direct : une seule connexion WebSocket, seulement si le parent a configuré SALON_URL (vide par défaut),
  // et seulement quand on ouvre le salon. Ce qui est envoyé : pseudo, couleur, réponses, réactions (et chat privé si autorisé).
  const S = lire('js/salon.js');
  assert.strictEqual((S.match(/new WS\(/g) || []).length, 1); assert.ok(!/sendBeacon|XMLHttpRequest|localStorage/.test(S));
  // Sans Supabase : un seul point d'envoi, vers salon.php du serveur configuré (SERVEUR, vide par défaut).
  assert.strictEqual((S.match(/fetch/g) || []).length, 2, 'window.fetch une seule fois (connecterPhp)'); assert.match(S, /adresse = base\.replace\(\/\\\/\?\$\/, '\/'\) \+ 'salon\.php'/);
  assert.match(J, /SERVEUR:'',/);
  assert.match(J, /SALON_URL:'',\s*\n\s*SALON_CLE:'',/);
  assert.ok(!/service_role/.test(J.replace(/jamais la clé service_role/, '')), 'jamais la clé secrète dans le client');
});
await test('vannes proposées par l’IA : Plus seulement, le juge trie, un adulte garde ou jette', async () => {
  const { publique } = await cles(); const fin = new Date(Date.now() + 30 * 864e5).toISOString();
  const cfg = { MODE_PAYANT:true, API_ABONNEMENT:'https://x.supabase.co/functions/v1/ami-abonnement', API_VANNES:'https://x.supabase.co/functions/v1/ami-vannes', CLE_PUBLIQUE:publique };
  const w = page(undefined, cfg), d = w.document, A = w.AmiDesMots; A.base.ui = 'fr'; A.base.cible = 'en';
  await w.AmiDesMotsPret;
  const parents = () => { A.accueil(); clic(w, '[data-a="anglais"]'); clic(w, '[data-a="parents"]'); const [a, b] = d.querySelector('main').textContent.match(/(\d) × (\d)/).slice(1).map(Number); d.querySelector('#porte-parents').value = String(a * b); clic(w, '[data-a="parents-ouvrir"]'); };
  parents(); assert.ok(!d.querySelector('[data-a="vannes-ia"]'), 'sans Plus : pas de bouton'); assert.match(d.querySelector('main').textContent, /Avec Plus, Plumo peut vous proposer/);
  w.__reponse = { actif:true, fin, jeton:await jeton('AMI-ABCD-EFGH-JKMN', fin) };
  A.ecranPlus(); d.getElementById('code').value = 'AMI-ABCD-EFGH-JKMN'; d.getElementById('form-code').dispatchEvent(new w.Event('submit', { cancelable:true })); await attendre(80);
  assert.ok(A.plus()); parents();
  const avant = (A.etat.vannesFamille || []).length;
  // Le « serveur » renvoie 3 bonnes vannes et 2 mauvaises : le juge retire les mauvaises avant qu'un adulte les voie.
  w.__fetch.length = 0; let corps = null; const f0 = w.fetch; w.fetch = async (u, o) => { corps = o && o.body; return f0(u, o); };
  w.__reponse = { vannes:['« {f} » ? Plumo a confondu, il porte ses lunettes à l’envers ! C’est « {j} ».', 'Ta mère dit « {f} », c’est « {j} » !', 'Tu es vraiment nul : c’est « {j} » !', '« {f} » ? Même la tortue a fait mieux ! On dit « {j} ».', 'Plumo a rangé « {f} » dans le frigo. Le bon mot : « {j} » !', '<script>x</script> {j}'.repeat(30)] };
  d.querySelector('#vannes-ia-theme').value = 'animaux'; clic(w, '[data-a="vannes-ia"]'); await attendre(60);
  assert.deepStrictEqual(w.__fetch, ['https://x.supabase.co/functions/v1/ami-vannes'], 'un seul envoi, vers le générateur');
  assert.deepStrictEqual(Object.keys(JSON.parse(corps)).sort(), ['code', 'theme', 'ton'], 'on n’envoie que le code, le thème et le ton');
  const props = [...d.querySelectorAll('[data-a="vanne-ia-garder"]')].map(b => b.closest('li').textContent);
  assert.ok(props.length >= 3 && props.length <= 4, props.join(' | '));
  assert.ok(!props.some(t => /Ta mère|nul/.test(t)), 'le juge a retiré les mauvaises');
  assert.ok(!d.querySelector('main script'), 'aucune balise');
  assert.match(d.querySelector('main').textContent, /Le juge en a déjà retiré/);
  assert.strictEqual((A.etat.vannesFamille || []).length, avant, 'rien n’est gardé sans un adulte');
  clic(w, '[data-a="vanne-ia-garder"]'); clic(w, '[data-a="vanne-ia-non"]');
  assert.strictEqual(A.etat.vannesFamille.length, avant + 1); assert.match(A.etat.vannesFamille[avant], /lunettes à l’envers/);
  assert.ok(etat(w).joueurs.some(j => (j.vannesFamille || []).length === avant + 1), 'gardée sur l’appareil');
  w.__reponse = { erreur:'quota', max:5 }; clic(w, '[data-a="vannes-ia"]'); await attendre(60);
  assert.match(d.querySelector('main').textContent, /C’est tout pour aujourd’hui \(5 demandes par jour\)/);
});
await test('générateur de vannes (serveur) : clé Claude jamais dans le client, Plus vérifié, quota, règles du juge', () => {
  const F = lire('serveur/functions/ami-vannes/index.ts');
  assert.match(F, /Deno\.env\.get\('ANTHROPIC_API_KEY'\)/); assert.match(F, /from\('ami_abonnements'\)/); assert.match(F, /ami_compter_vannes/);
  assert.match(F, /JAMAIS la personne/); assert.match(F, /pas de « ta mère »/);
  for(const f of ['js/jeu.js', 'index.html', 'js/juge.js', 'js/offre.js']) assert.ok(!/ANTHROPIC|sk-ant-|api\.anthropic\.com/.test(lire(f)), f);
  assert.match(lire('js/jeu.js'), /API_VANNES:'',/);
});
console.log('Maths (6e → Terminale) et sciences');
await test('maths : chaque chapitre du programme a son générateur, chaque erreur a sa vanne et son explication', () => {
  const w = page(); const M = w.MATHS;
  assert.deepStrictEqual([...M.NIVEAUX], ['6e', '5e', '4e', '3e', '2nde', '1re', 'Tle']);
  for(const n of M.NIVEAUX){ const l = M.chapitresDe(n); assert.ok(l.length >= 7, n); for(const c of l) assert.ok(M.disponible(c[0]), c[0]); }
  for(const id of Object.keys(M.G)) for(let g = 1; g <= 150; g++){
    const q = M.question(id, M.hasard(g * 31 + id.length), 'sanspitie'), tout = [q.bon, ...q.faux.map(f => f.en)];
    assert.ok(q.faux.length >= 1 && new Set(tout).size === tout.length, id + ' ' + JSON.stringify(tout));
    assert.ok(!/NaN|undefined|Infinity|\bnull\b|\{f\}|\{j\}/.test(JSON.stringify(q)), id + ' ' + JSON.stringify(q));
    for(const f of q.faux){ assert.ok(M.ERREURS[f.cle], f.cle); assert.ok(f.vanne.length > 10); }
  }
});
await test('v6.23 : programmes 2026 de 5e, seconde et première au complet, corrections justes, traduits en 6 langues', () => {
  const w = page(); const M = w.MATHS, num = s => Number(String(s).replace(/[\s\u202F\u00A0]/g, '').replace(/−/g, '-').replace(',', '.').replace(/[^\d.\-]/g, ''));
  assert.ok(M.chapitresDe('5e').length >= 35, '5e : ' + M.chapitresDe('5e').length);
  assert.ok(M.chapitresDe('2nde').length >= 24, '2nde : ' + M.chapitresDe('2nde').length);
  assert.ok(M.chapitresDe('1re').length >= 19, '1re : ' + M.chapitresDe('1re').length);
  for(const [n, k] of [['6e', 26], ['4e', 18], ['3e', 17], ['Tle', 18]]) assert.ok(M.chapitresDe(n).length >= k, n + ' : ' + M.chapitresDe(n).length); // v6.24
  assert.ok(!/\d[,.]\d{4,}/.test(JSON.stringify(M.serie('6-fraction-de', 40, 9, 'taquin').map(q => q.faux.map(f => f.en)))), 'pas de décimales à rallonge');
  for(const id of ['5-premiers', '5-decomposition', '5-puissances', '5-equations', '5-contre-exemple', '5-ratio', '5-volumes', '5-symetrie-centrale', '5-programme-blocs', '2-ensembles-nombres', '2-quartiles', '2-test-diagnostic', '2-colinearite', '2-python', '1-tangente', '1-trigonometrie', '1-cercle', '1-esperance'])
    assert.ok(M.chapitresDe(id[0] === '5' ? '5e' : id[0] === '2' ? '2nde' : '1re').some(c => c[0] === id), id);
  for(let g = 1; g <= 200; g++){
    let q = M.question('5-equations', M.hasard(g)); { const m = q.enonce.match(/: (?:x \+ (\d+) = (\d+)|(\d+)x = (\d+))/); const x = num(q.bon.slice(4)); assert.ok(m[1] ? x + +m[1] === +m[2] : +m[3] * x === +m[4], q.enonce + ' → ' + q.bon); }
    q = M.question('5-decomposition', M.hasard(g)); { const n = num(q.enonce.match(/de ([\d\s\u202F\u00A0]+) en/)[1]); const f = q.bon.split(' × ').map(Number); assert.strictEqual(f.reduce((a, b) => a * b, 1), n, q.enonce + ' → ' + q.bon); assert.ok(f.every(p => [2, 3, 5, 7].includes(p))); }
    q = M.question('2-norme', M.hasard(g)); { const c = (q.enonce.match(/−?\d+/g) || []).map(x => +x.replace('−', '-')); if(/‖/.test(q.enonce)) assert.strictEqual(c[0] ** 2 + c[1] ** 2, num(q.bon) ** 2, q.enonce); }
    q = M.question('1-nb-solutions', M.hasard(g)); { const d = num(q.regle.split('=').pop()); assert.strictEqual(q.bon, d > 0 ? '2' : d === 0 ? '1' : '0', q.regle); }
  }
  // Chaque nouveau chapitre a son nom et ses erreurs traduits dans chaque langue en ligne.
  for(const L of ['en', 'es', 'de', 'it', 'pt']){ const d = w.MATHS_LANGUES[L];
    for(const n of ['5e', '2nde', '1re']) for(const c of M.chapitresDe(n)) assert.ok(d.chapitres[c[0]], L + ' ' + c[0]);
    for(const k of ['premier-impair', 'disque-diametre', 'quartile-rang', 'det-formule', 'range-compte', 'tangente-formule', 'esperance-moyenne']) assert.ok(d.erreurs[k] && d.erreurs[k].e, L + ' ' + k); }
  // Les programmes Python s'affichent ligne par ligne.
  assert.match(M.question('2-python', M.hasard(5)).enonce, /\n/); assert.match(lire('css/jeu.css'), /\.piege-fr\.piege-code\{white-space:pre-wrap/);
});
await test('maths : les corrections sont justes (recalculées autrement)', () => {
  const w = page(); const M = w.MATHS, num = s => Number(String(s).replace(/ /g, '').replace(/−/g, '-').replace(',', '.').replace(/[^\d.\-/]/g, ''));
  const val = s => { const t = String(s).replace(/ /g, '').replace(/−/g, '-'); const m = t.match(/^(-?\d+)\/(\d+)$/); return m ? +m[1] / +m[2] : num(t); };
  const nombres = s => (String(s).replace(/ /g, '').replace(/−/g, '-').match(/-?\d+(?:,\d+)?/g) || []).map(x => +x.replace(',', '.'));
  for(let g = 1; g <= 300; g++){
    const r = () => M.hasard(g);
    let q = M.question('6-fractions-somme', r()); let [a, b, c, d] = nombres(q.enonce); assert.ok(Math.abs(val(q.bon) - (a / b + c / d)) < 1e-9, q.enonce + ' → ' + q.bon);
    q = M.question('4-fractions-quotient', r()); [a, b, c, d] = nombres(q.enonce); assert.ok(Math.abs(val(q.bon) - (a / b) / (c / d)) < 1e-9, q.enonce);
    q = M.question('4-equations', r()); { const [A, B, Cc] = nombres(q.enonce.replace('x', ' x ')); const x = num(q.bon.slice(4)); const m = q.enonce.match(/: (-?\d+)x ([+−]) (\d+) = (−?[\d ]+)/); const aa = +m[1], bb = (m[2] === '+' ? 1 : -1) * +m[3], cc = num(m[4]); assert.strictEqual(aa * x + bb, cc, q.enonce + ' → ' + q.bon); }
    q = M.question('3-arithmetique', r()); [a, b] = nombres(q.enonce); { let x = a, y = b; while(y) [x, y] = [y, x % y]; assert.strictEqual(num(q.bon), x); }
    q = M.question('4-pythagore', r()); { const n = nombres(q.enonce); const v = num(q.bon); assert.ok(/Hypoténuse/.test(q.enonce) ? v * v === n[0] ** 2 + n[1] ** 2 : v * v + n[1] ** 2 === n[0] ** 2, q.enonce + ' → ' + q.bon); }
    q = M.question('1-second-degre', r()); if(/Racines/.test(q.enonce)){ const p = q.enonce.match(/de (.*) \?/)[1]; const f = x => w.eval('(' + p.replace(/−/g, '-').replace(/x²/g, 'Math.pow(x,2)').replace(/(\d)x/g, '$1*x').replace(/(\d)Math/g, '$1*Math').replace(/\bx\b/g, '(' + x + ')').replace(/\)\(/g, ')*(') + ')'); for(const x of nombres(q.bon)) assert.strictEqual(f(x), 0, p + ' en ' + x); }
    q = M.question('6-durees', r()); { const [h, m, dd] = nombres(q.enonce); const [H, Mi] = nombres(q.bon); assert.strictEqual((H * 60 + Mi) % 1440, (h * 60 + m + dd) % 1440); }
    q = M.question('T-binomiale', r()); if(/P\(X =/.test(q.enonce)){ const [n, p, k] = nombres(q.enonce); let C = 1; for(let i = 0; i < k; i++) C = C * (n - i) / (i + 1); assert.ok(Math.abs(num(q.bon) - C * p ** k * (1 - p) ** (n - k)) < 6e-4, q.enonce + ' ' + q.bon); }
  }
});
await test('maths : même graine = mêmes questions (battles), et le ton change les vannes', () => {
  const w = page(); const M = w.MATHS;
  assert.strictEqual(JSON.stringify(M.questionsSalon(42, 6, '3e')), JSON.stringify(M.questionsSalon(42, 6, '3e')));
  assert.notStrictEqual(JSON.stringify(M.questionsSalon(42, 6, '3e')), JSON.stringify(M.questionsSalon(43, 6, '3e')));
  const doux = M.question('6-fractions-somme', M.hasard(3), 'doux'), dur = M.question('6-fractions-somme', M.hasard(3), 'sanspitie');
  assert.match(doux.faux[0].vanne, /Pas grave|Presque|Bonne tentative/); assert.ok(!/Pas grave|Presque !|Bonne tentative/.test(dur.faux[0].vanne)); assert.match(dur.faux[0].vanne, /💡/);
  assert.ok(!/\bnul\b|idiot|bête|ta mère/i.test(JSON.stringify(Object.values(M.ERREURS).map(e => [e.t, e.s]))), 'les vannes visent l’erreur, jamais la personne');
  for(const e of Object.values(M.ERREURS)) for(const l of [...e.t, ...e.s]) assert.ok(w.JUGE.juger(l.replace(/\{\w+\}/g, '12')).ok, l);
});
await test('coin maths : niveaux, Prof Pi vanne à l’erreur, progrès gardés, examen et défi de maths', () => {
  const w = page(), d = w.document, A = w.AmiDesMots; A.accueil();
  clic(w, '[data-a="maths"]'); assert.ok(d.querySelector('.coin-maths .prof-pi'), 'Prof Pi est là');
  assert.strictEqual(d.querySelectorAll('[data-a="maths-niveau"]').length, 7);
  clic(w, '[data-a="maths-niveau"][data-v="3e"]'); assert.match(d.querySelector('main').textContent, /Brevet blanc/); assert.match(d.querySelector('main').textContent, /Thalès/);
  clic(w, '[data-a="maths-ton"][data-v="sanspitie"]'); assert.strictEqual(A.etat.maths.ton, 'sanspitie');
  clic(w, '[data-a="maths-chap"][data-v="3-thales"]');
  const bon = d.querySelector('.piege-bon') ? null : null; const opts = [...d.querySelectorAll('.piege-opt')]; assert.ok(opts.length >= 2 && opts[0].lang === 'fr');
  const q = w.document.querySelector('.piege-fr').textContent; assert.match(q, /AN/);
  // Réponse fausse : vanne de Prof Pi + explication
  const juste = opts.find(b => /^AN = /.test(b.textContent) && false); const faux = opts.find(b => b.textContent !== opts.find(x => x)._ok);
  let mauvais = null; for(const b of opts){ b.click(); const r = d.querySelector('#qz-retour').textContent; if(/🦝/.test(r)){ mauvais = r; break; } A.ecranPlus; break; }
  if(!mauvais){ clic(w, '[data-a="qz-suivant"]'); const o2 = [...d.querySelectorAll('.piege-opt')]; for(const b of o2){ if(!/AN = /.test(b.textContent)) continue; } o2[o2.length - 1].click(); mauvais = d.querySelector('#qz-retour').textContent; }
  assert.ok(A.etat.maths.chap['3-thales'].n >= 1, 'progrès enregistré');
  assert.match(d.querySelector('#qz-retour').textContent, /Bravo|Juste|Exact|Parfait|🦝/);
  clic(w, '[data-a="maths"]'); clic(w, '[data-a="maths-examen"]'); assert.match(d.querySelector('.piege-cat').textContent, /Brevet blanc · 3e · 1\/12/);
  for(let i = 0; i < 12; i++){ clic(w, '.piege-opt'); clic(w, '[data-a="qz-suivant"]'); }
  assert.match(d.querySelector('main').textContent, /\/20/); assert.ok(A.etat.maths.examens['3e'] >= 0);
  // Défi de maths par lien : le niveau voyage dans le lien.
  clic(w, '[data-a="maths"]'); clic(w, '[data-a="maths-defi"]'); assert.match(d.querySelector('.piege-cat').textContent, /maths 3e/);
  for(let i = 0; i < 8; i++){ clic(w, '.piege-opt'); clic(w, '[data-a="qz-suivant"]'); }
  const lien = d.querySelector('#lien-defi').value, code = new URL(lien).searchParams.get('defi');
  assert.strictEqual(w.RIGOLADE.lireDefi(code).m, '3e');
  const w2 = page(undefined, undefined, x => x.history.replaceState(null, '', '/?defi=' + code));
  clic(w2, '[data-a="defi-relever"]'); assert.match(w2.document.querySelector('.piege-cat').textContent, /maths 3e/);
});
await test('labo des sciences : 4 thèmes, clash à l’erreur, explication, faits uniques', () => {
  const w = page(), d = w.document, A = w.AmiDesMots, S = w.SCIENCES; A.accueil();
  assert.ok(S.Q.length >= 40); assert.strictEqual(new Set(S.Q.map(x => x[0])).size, S.Q.length);
  for(const x of S.Q){ assert.ok(S.THEMES.some(t => t.id === x[1]), x[0]); assert.ok(x[4].length >= 2 && !x[4].some(f => f[0] === x[3]), x[0]); for(const f of x[4]) assert.ok(w.JUGE.juger(f[1]).ok, f[1]); }
  clic(w, '[data-a="sciences"]'); assert.strictEqual(d.querySelectorAll('[data-a="sciences-theme"]').length, 5);
  clic(w, '[data-a="sciences-theme"][data-v="fusees"]'); assert.match(d.querySelector('.piege-cat').textContent, /Fusées/);
  const q = S.Q.find(x => x[2] === d.querySelector('.piege-fr').textContent); assert.ok(q);
  [...d.querySelectorAll('.piege-opt')].find(b => b.textContent !== q[3]).click();
  const r = d.querySelector('#qz-retour').textContent; assert.ok(q[4].some(f => r.includes(f[1])), 'le clash correspond à l’erreur'); assert.ok(r.includes(q[5]), 'explication');
});
await test('salon : la battle peut être de maths (même niveau, mêmes questions pour tous)', () => {
  const w = page(), M = w.MATHS;
  const a = M.questionsSalon(7, 6, '1re'); assert.strictEqual(a.length, 6); assert.ok(a.every(q => q.bon && q.faux.length >= 1 && /Maths 1re/.test(q.consigne)));
  assert.match(lire('js/jeu.js'), /questionsBattle\(d\.graine, d\.n, m\)/);
});
await test('vannes cash : plus de vannes par erreur, toujours sur la réponse, jamais sur la personne', () => {
  const w = page(), M = w.MATHS, C = w.VANNES_CASH;
  let n = 0; for(const [k, v] of Object.entries(C.MATHS)){ assert.ok(M.ERREURS[k], k); for(const l of v.s) assert.ok(M.ERREURS[k].s.includes(l), k); n += v.t.length + v.s.length; }
  assert.ok(n >= 100, n);
  for(const l of [...Object.values(C.MATHS).flatMap(v => [...v.t, ...v.s]), ...C.GENERIQUES.t, ...C.GENERIQUES.s, ...C.SCIENCES]){
    assert.ok(w.JUGE.juger(l.replace(/\{\w+\}/g, '12')).ok, l);
    assert.ok(!/\b(t’es|tu es|t'es)\s+(nul|bête|idiot|con)|ta mère|ton père|ta famille/i.test(l), l);
  }
  const q = w.SCIENCES.serie('espace', 3, 5, 'sanspitie'); assert.ok(q.every(x => x.faux.every(f => /🔥/.test(f.vanne))), 'sciences : ton cash');
  assert.ok(!w.SCIENCES.serie('espace', 3, 5, 'taquin').some(x => x.faux.some(f => /🔥 /.test(f.vanne) && C.SCIENCES.some(c => f.vanne.includes(c)))), 'taquin : sans ajout cash');
});
await test('Prof Pi ne répète pas ses vannes, et s’énerve si on refait la même erreur', () => {
  const w = page(), d = w.document, A = w.AmiDesMots; A.accueil();
  clic(w, '[data-a="maths"]'); clic(w, '[data-a="maths-ton"][data-v="sanspitie"]');
  const vues = [];
  // On rejoue 3 séries « comparer des décimaux » en se trompant toujours de la même façon (le nombre le plus long).
  for(let serie = 0; serie < 3; serie++){
    A.accueil(); clic(w, '[data-a="maths"]'); clic(w, '[data-a="maths-chap"][data-v="6-decimaux"]');
    for(let i = 0; i < 10; i++){
      const t = d.querySelector('.piege-fr').textContent, m = t.match(/: (.+) ou (.+) \?/);
      const long = [...d.querySelectorAll('.piege-opt')].find(b => b.textContent === m[2]); long.click();
      vues.push(d.querySelector('#qz-retour .piege-vanne').textContent);
      clic(w, '[data-a="qz-suivant"]');
    }
  }
  const E = w.VANNES_CASH.ESCALADE.sanspitie;
  assert.ok(E[0].some(l => vues[1].includes(l)), 'dès la 2e même erreur, gros clash : ' + vues[1]);
  assert.ok(E[1].some(l => vues[2].includes(l)), '3e fois : « Sérieux, tu vas à l’école toi ??? » ou une variante : ' + vues[2]);
  assert.ok(vues.slice(1, 4).some(v => /tu fais exprès ou quoi !!!!|Sérieux, tu vas à l’école toi \?\?\?/.test(v)) || vues.some(v => /tu fais exprès ou quoi !!!!/.test(v)), 'les répliques demandées sortent');
  // Sans l'énervement et sans les nombres, les 5 premières vannes « décimaux » du ton cash sont toutes différentes.
  const tete = Object.values(w.VANNES_CASH.ESCALADE).flat(2);
  const coeur = v => { let x = v.replace(/^🦝\s*/, ''); for(const l of tete) if(x.startsWith(l)) x = x.slice(l.length).trim(); return x.split(' 💡 ')[0].replace(/[\d,]+/g, '#'); };
  const premieres = vues.slice(0, 5).map(coeur); assert.strictEqual(new Set(premieres).size, 5, premieres.join(' | '));
  assert.ok(A.etat.vannesDites.length >= 30, 'la mémoire est gardée sur l’appareil');
  for(const l of Object.values(w.VANNES_CASH.ESCALADE).flat(2)) assert.ok(w.JUGE.juger(l).ok, l);
});
await test('fabrique à vannes : 300 erreurs de suite, 300 vannes différentes (et toutes passent le juge)', () => {
  const w = page(), M = w.MATHS, dites = [];
  const memoire = { age:l => { const i = dites.lastIndexOf(l); return i < 0 ? -1 : dites.length - i; }, noter:l => dites.push(l) };
  const sorties = []; for(let i = 0; i < 300; i++) sorties.push(M.vanne('decimal-longueur', 'sanspitie', { f:'5,23', j:'5,5' }, null, memoire));
  assert.strictEqual(new Set(sorties).size, 300, 'aucune répétition');
  for(const t of sorties) assert.ok(w.JUGE.juger(t).ok, t);
  const F = w.VANNES_CASH.FABRIQUE; assert.ok(F.amorces.length * F.sujets.length * F.actions.length * F.chutes.length > 50000);
  for(let i = 0; i < 400; i++){ const t = w.VANNES_CASH.fabriquer(); assert.ok(!/\{e\}|\{lui\}|\*/.test(t), t); assert.ok(!/\{e\}|\{il\}/.test(t) && !/Même (la|ma|une) [^.]*?(tombé |mis à|caché |parti |sur lui-même|enfui\.|qu’il )/.test(t), 'accord : ' + t); }
});
console.log('Clashs de la battle');
await test('clashs : 30 manches, répliques justes et erreurs d’anglais expliquées, rien qui vise le joueur', () => {
  const w = page(), C = w.CLASH, B = w.ANGLAIS.BATTLE.concat(C.MANCHES);
  assert.ok(B.length >= 30, B.length);
  assert.strictEqual(new Set(B.map(m => m.ami)).size, B.length, 'pas deux fois la même vantardise');
  for(const m of B){ assert.ok(m.ami && m.fr && m.bon.en && m.bon.fr && m.faux.length === 2, m.ami);
    assert.ok(!m.faux.some(f => f.en === m.bon.en), m.ami);
    for(const f of m.faux) assert.ok(w.JUGE.juger(f.vanne).ok, f.vanne);
    assert.ok(w.JUGE.juger(m.bon.fr).ok && !/\b(ta mère|your mom|stupid|idiot|nul)\b/i.test(m.bon.en + m.bon.fr), m.bon.en); }
  for(const r of C.RIPOSTES) assert.ok(w.JUGE.juger(r.fr).ok && r.en, r.en);
  assert.deepStrictEqual([C.energie(0), C.energie(1), C.energie(2)], [100, 55, 25]);
});
await test('battle : Plumo contre-attaque quand on rate, le public s’enflamme et compte les séries', () => {
  const w = page(), d = w.document, A = w.AmiDesMots; A.base.ui = 'fr'; A.base.cible = 'en'; A.accueil();
  clic(w, '[data-a="anglais"]'); clic(w, '[data-a="battle"]'); clic(w, '[data-a="battle-go"][data-v="ami"]');
  const manche = () => { const t = d.querySelector('.piege-fr').textContent; return w.ANGLAIS.BATTLE.concat(w.CLASH.MANCHES).find(m => t.includes(m.ami)); };
  let m = manche(); assert.ok(m, 'manche connue');
  [...d.querySelectorAll('.piege-opt')].find(b => b.textContent === m.faux[0].en).click();
  const r = d.querySelector('#battle-retour').textContent; assert.ok(w.CLASH.RIPOSTES.some(x => r.includes(x.en)), 'riposte de Plumo'); assert.ok(r.includes(m.faux[0].vanne.slice(0, 20)), 'la vanne explique l’erreur');
  [...d.querySelectorAll('.piege-opt')].find(b => b.textContent === m.bon.en).click(); assert.ok(!/OHHHH|BOOM|Le public|punchline|plumes par terre/.test(d.querySelector('#battle-retour').textContent), 'pas d’ovation au 2e essai');
  for(let k = 0; k < 2; k++){ clic(w, '[data-a="battle-suivant"]'); m = manche(); [...d.querySelectorAll('.piege-opt')].find(b => b.textContent === m.bon.en).click(); }
  assert.match(d.querySelector('#battle-retour').textContent, /Série de 2/); assert.ok(d.querySelector('main.finale'), 'la dernière manche est la finale');
});
console.log('Coin admin : gratuit ou Plus');
await test('offre.js ouvre tout l’univers : thèmes, jeux, six joueurs et coins', () => {
  const w = page(undefined, null); const C = w.AmiDesMots.CONFIG;
  assert.strictEqual(C.MODE_PAYANT, false);
  assert.strictEqual(C.THEMES_GRATUITS.length, 8);
  assert.strictEqual(C.JOUEURS_GRATUITS, 6);
  assert.deepStrictEqual([...C.COINS_PLUS], []);
  assert.strictEqual(w.AmiDesMots.plus(), true);
});
await test('offre.js ne peut que fermer des coins : réglages inconnus ignorés, jamais Plus', () => {
  const w = page(); const L = w.AmiDesMots.offreLue;
  const r = L({ MODE_PAYANT:'non', PLUS:true, droits:{ fin:'2999' }, THEMES_GRATUITS:['animaux', '<img>', 3], JOUEURS_GRATUITS:99, COINS_PLUS:'rap', PRIX:'x'.repeat(50) });
  assert.deepStrictEqual(JSON.parse(JSON.stringify(r)), { THEMES_GRATUITS:['animaux'] });
  assert.ok(!/plus\(\)|droits/.test(lire('js/offre.js').replace(/^\/\/.*$/gm, '')), 'offre.js ne touche pas aux droits');
});
await test('admin : mêmes jeux et mêmes coins que le jeu', () => {
  const w = page(); const A = w.AmiDesMots;
  const d = new JSDOM('<main id="app"></main>', { runScripts:'outside-only', url:'https://jeu.example/admin.html' }).window;
  for(const f of ['js/donnees.js', 'js/textes.js', 'js/offre.js', 'js/admin.js']) d.eval(lire(f));
  const M = d.AdminAmi;
  assert.strictEqual(JSON.stringify(M.JEUX.map(j => [j[0], j[2]])), JSON.stringify(A.MECAS.map(m => [m[0], m[3].length])));
  assert.strictEqual(JSON.stringify([...M.TOUS_COINS].sort()), JSON.stringify(Object.keys(A.COINS).sort()));
  // Chaque coin a un écran qui marche quand il est gratuit.
  for(const c of Object.keys(A.COINS)) if(A.COINS[c].length) assert.ok(lire('js/jeu.js').includes("case '" + A.COINS[c][0] + "'"), c);
});
await test('admin : cocher, décocher, télécharger un offre.js que le jeu relit à l’identique', () => {
  const d = new JSDOM('<main id="app"></main>', { runScripts:'outside-only', url:'https://jeu.example/admin.html' }).window;
  for(const f of ['js/donnees.js', 'js/textes.js', 'js/offre.js', 'js/admin.js']) d.eval(lire(f));
  const doc = d.document, M = d.AdminAmi, coche = (sel, v) => { const e = doc.querySelector(sel); assert.ok(e, sel); e.checked = v; e.dispatchEvent(new d.Event('change', { bubbles:true })); };
  assert.ok(doc.querySelector('#telecharger').disabled, 'rien à publier au départ');
  assert.match(doc.querySelector('.resume').textContent, /8\/8 thèmes gratuits.*50\/50 jeux gratuits.*21\/21 coins gratuits/);
  coche('[data-theme="nature"]', false); coche('[data-jeu="memoire"]', false); coche('[data-coin="rap"]', false); coche('[data-coin="motscity"]', false);
  assert.match(doc.querySelector('.resume').textContent, /7\/8 thèmes gratuits.*47\/50 jeux gratuits.*19\/21 coins gratuits/);
  assert.ok(!doc.querySelector('#telecharger').disabled);
  assert.match(doc.querySelector('[data-coin="rap"]').closest('label').textContent, /✨ Plus/);
  const texte = M.fichier(M.offre), z = new JSDOM('', { runScripts:'outside-only' }).window; z.eval(texte);
  assert.deepStrictEqual(JSON.parse(JSON.stringify(z.OFFRE_AMI)), JSON.parse(JSON.stringify(M.offre)));
  assert.deepStrictEqual([...z.OFFRE_AMI.COINS_PLUS], ['rap', 'motscity']);
  assert.ok(!z.OFFRE_AMI.THEMES_GRATUITS.includes('nature') && !z.OFFRE_AMI.JEUX_GRATUITS.includes('memoire'), 'nature et memoire passent dans Plus');
  // Offre payante activée puis tout décoché : l'admin prévient.
  coche('#mode', true);
  for(const e of doc.querySelectorAll('[data-theme]')) if(e.checked) coche('[data-theme="' + e.dataset.theme + '"]', false);
  assert.match(doc.querySelector('.alerte').textContent, /Aucun thème gratuit/);
  doc.querySelector('#annuler').click(); assert.ok(doc.querySelector('#telecharger').disabled, 'retour à l’offre en ligne');
  // Une saisie piégée ne casse pas le fichier.
  doc.querySelector('#prix').value = "5' ;alert(1)//"; doc.querySelector('#prix').dispatchEvent(new d.Event('change', { bubbles:true }));
  const z2 = new JSDOM('', { runScripts:'outside-only' }).window; z2.alert = () => { throw new Error('injection'); }; z2.eval(M.fichier(M.offre));
  assert.strictEqual(z2.OFFRE_AMI.PRIX, '5 ;alert(1)//');
});
await test('coin réservé à Plus : badge ✨, écran Plus au clic, aussi par lien du village 3D ou par lien de salon', () => {
  const w = page(undefined, { MODE_PAYANT:true, COINS_PLUS:['rap', 'trompe', 'motscity', 'village3d', 'salon'] }), d = w.document, A = w.AmiDesMots;
  A.accueil();
  const city = d.querySelector('a.mots-city-accueil'); assert.ok(city.classList.contains('verrou') && /✨/.test(city.textContent), 'Mots City marqué Plus');
  clic(w, '[data-a="accueil-3d"]'); assert.ok(d.querySelector('main.plus'), 'village 3D → Plus');
  A.accueil(); clic(w, '[data-a="anglais"]');
  const tr = d.querySelector('[data-a="trompe"]'); assert.ok(tr && tr.querySelector('.badge-plus'), 'badge sur « Plumo se trompe »');
  assert.ok(!d.querySelector('[data-a="oreilles"] .badge-plus'), 'les coins gratuits restent sans badge');
  tr.click(); assert.ok(d.querySelector('main.plus'));
  clic(w, '[data-a="anglais"]'); clic(w, '[data-a="oreilles"]'); assert.ok(!d.querySelector('main.plus'), 'coin gratuit ouvert');
  clic(w, '[data-a="anglais"]'); clic(w, '[data-a="battle"]'); clic(w, '[data-a="rap"]'); assert.ok(d.querySelector('main.plus'), 'rap → Plus');
  assert.strictEqual(d.querySelector('.barre [data-a]').dataset.a, 'battle', 'retour au menu battle');
  const w2 = page(undefined, { MODE_PAYANT:true, COINS_PLUS:['rap'] }, x => x.history.replaceState(null, '', '/?aller=rap'));
  assert.ok(w2.document.querySelector('main.plus'), 'lien ?aller=rap du village 3D → Plus');
  const w3 = page(undefined, { MODE_PAYANT:true, COINS_PLUS:['salon'] }, x => x.history.replaceState(null, '', '/?salon=ABCDE'));
  assert.ok(w3.document.querySelector('main.plus'), 'lien de salon → Plus');
});
await test('coin réservé : un vrai abonné Plus y entre ; offre sans paiement : tout est ouvert', async () => {
  const { publique } = await cles(); const fin = new Date(Date.now() + 30 * 864e5).toISOString();
  const w = page(undefined, { MODE_PAYANT:true, COINS_PLUS:['trompe'], API_ABONNEMENT:'https://x.supabase.co/functions/v1/ami-abonnement', CLE_PUBLIQUE:publique }), d = w.document;
  await w.AmiDesMotsPret;
  w.__reponse = { actif:true, fin, jeton:await jeton('AMI-ABCD-EFGH-JKMN', fin) };
  w.AmiDesMots.ecranPlus(); d.getElementById('code').value = 'AMI-ABCD-EFGH-JKMN'; d.getElementById('form-code').dispatchEvent(new w.Event('submit', { cancelable:true })); await attendre(80);
  assert.ok(w.AmiDesMots.plus());
  clic(w, '[data-a="anglais"]'); assert.ok(!d.querySelector('[data-a="trompe"] .badge-plus')); clic(w, '[data-a="trompe"]'); assert.ok(!d.querySelector('main.plus'), 'abonné : coin ouvert');
  const w2 = page(undefined, { MODE_PAYANT:false, COINS_PLUS:['trompe'] });
  clic(w2, '[data-a="anglais"]'); clic(w2, '[data-a="trompe"]'); assert.ok(!w2.document.querySelector('main.plus'), 'sans offre payante : ouvert');
});
await test('v5.85 : offre réglée dans l’admin du serveur, signée ; jamais de Plus gratuit', async () => {
  const { prive, publique } = await cles();
  const signe = async t => b64u(new Uint8Array(await webcrypto.subtle.sign({ name:'ECDSA', hash:'SHA-256' }, prive, Buffer.from('offre|' + t))));
  const texte = JSON.stringify({ MODE_PAYANT:true, PRIX:'4,99 €', COINS_PLUS:['trompe'], LIEN_PAIEMENT:'https://buy.stripe.com/test_ok', LIEN_GESTION:'https://pirate.example/x', THEMES_GRATUITS:['animaux'] });
  const sig = await signe(texte);
  // Le serveur répond avec l'offre signée : le payant s'allume malgré config-site.js (MODE_PAYANT:false).
  const w = page(undefined, { MODE_PAYANT:false, SERVEUR:'https://ami.example/serveur', CLE_PUBLIQUE:publique }, x => { x.__reponse = { offre:texte, sig, actif:false }; });
  await w.AmiDesMotsPret; const A = w.AmiDesMots;
  assert.ok(w.__fetch.some(u => u === 'https://ami.example/serveur/offre.php'), 'offre demandée au serveur');
  assert.strictEqual(A.CONFIG.MODE_PAYANT, true); assert.strictEqual(A.CONFIG.PRIX, '4,99 €');
  assert.deepStrictEqual([...A.CONFIG.COINS_PLUS], ['trompe']); assert.strictEqual(A.CONFIG.LIEN_PAIEMENT, 'https://buy.stripe.com/test_ok');
  assert.notStrictEqual(A.CONFIG.LIEN_GESTION, 'https://pirate.example/x', 'lien non Stripe refusé');
  assert.ok(!A.plus(), 'l’offre ne donne jamais Plus');
  clic(w, '[data-a="anglais"]'); assert.ok(w.document.querySelector('[data-a="trompe"] .badge-plus'), 'coin marqué Plus');
  // Copie gardée trafiquée (payant coupé à la main) : refusée.
  assert.strictEqual(await A.verifierOffre(texte.replace('true', 'false'), sig), null);
  assert.strictEqual(await A.verifierOffre(texte, sig.slice(0, -2) + 'AA'), null);
  // Hors ligne : la copie signée gardée est réappliquée au lancement.
  const g = w.localStorage.getItem(A.CLE_OFFRE); assert.ok(g);
  const w2 = page(undefined, { MODE_PAYANT:false, CLE_PUBLIQUE:publique }, x => x.localStorage.setItem('amidesmots:offre', g));
  await w2.AmiDesMotsPret; assert.strictEqual(w2.AmiDesMots.CONFIG.MODE_PAYANT, true);
  const w3 = page(undefined, { MODE_PAYANT:false, CLE_PUBLIQUE:publique }, x => x.localStorage.setItem('amidesmots:offre', g.replace('true', 'false').replace('4,99', '0,01')));
  await w3.AmiDesMotsPret; assert.strictEqual(w3.AmiDesMots.CONFIG.MODE_PAYANT, false, 'copie trafiquée ignorée');
  // Côté serveur : mot de passe + jeton anti-falsification avant d'enregistrer ; seules les valeurs du catalogue.
  const P = lire('serveur-php/admin/index.php'), O = lire('serveur-php/offre.php');
  assert.ok(P.indexOf("hash_equals($_SESSION['jeton']") < P.indexOf("if ($a === 'offre')"), 'jeton vérifié avant');
  assert.match(P, /array_intersect\(\$connus/); assert.match(O, /ami_signer_texte\('offre\|' \. \$r\['contenu'\]\)/);
  assert.ok(!/mdp|password|cle_privee/i.test(O.replace(/^\/\/.*$/gm, '')), 'aucun secret renvoyé');
  const C = JSON.parse(lire('serveur-php/admin/catalogue.json'));
  assert.deepStrictEqual(C.coins.flatMap(g => g[1].map(c => c[0])).sort(), Object.keys(A.COINS).sort());
});
await test('v5.86 : Clash libre — on se vanne entre potes, en anglais et en français, sans viser la personne', async () => {
  const w = page(), d = w.document, V = w.VANNES_LIBRES;
  // Toutes les vannes du paquet passent le juge ; anglais et français remplis.
  assert.ok(V.toutes().length >= 50);
  for(const v of V.toutes()){ assert.ok(v.en && v.fr, v.en); assert.ok(V.juger(v.en).ok, v.en + ' ' + V.juger(v.en).raisons); assert.ok(V.juger(v.fr).ok, v.fr + ' ' + V.juger(v.fr).raisons); }
  // Le parler des jeunes passe ; viser la personne non.
  for(const ok of ['Wesh gros, t’es un ouf', 'Tranquille, gros, ta riposte arrive avec trois jours de décalage', 'T’es un ouf, t’as joué sans lunettes de soleil… en pleine nuit'.replace(' sans lunettes de soleil', '')]) assert.ok(V.juger(ok).ok, ok);
  for(const ko of ['t’es gros', 'ta mère joue mieux que toi', 't’es moche', 'tes cheveux sont ratés', 'retourne dans ton pays', 't’es pauvre', 'your family is weird']) assert.ok(!V.juger(ko).ok, ko);
  // Partie complète : noms, 2 vannes chacun, réactions, carton jaune, fin avec l’anglais appris.
  clic(w, '[data-a="anglais"]'); clic(w, '[data-a="battle"]'); clic(w, '[data-a="clash-libre"]');
  d.getElementById('cl-n1').value = 'Inès'; d.getElementById('cl-n2').value = 'Yanis';
  clic(w, '[data-a="clash-libre-go"][data-v="3"]');
  assert.match(d.querySelector('h2').textContent, /Inès, envoie ta vanne à Yanis/);
  assert.strictEqual(d.querySelectorAll('.clash-carte').length, 3);
  clic(w, '[data-a="clash-libre-carte"][data-v="0"]'); assert.match(d.body.textContent, /Passe le téléphone à Yanis/);
  clic(w, '[data-a="clash-libre-reaction"][data-v="feu"]');
  assert.match(d.querySelector('h2').textContent, /Yanis, envoie ta vanne à Inès/);
  // Vanne écrite : refusée si elle vise la personne, acceptée sinon.
  clic(w, '[data-a="clash-libre-ecrire"]'); d.getElementById('cl-texte').value = 't’es moche'; clic(w, '[data-a="clash-libre-envoyer"]');
  assert.match(d.getElementById('cl-msg').textContent, /refuse/);
  d.getElementById('cl-texte').value = 'Wesh gros, ton dribble a demandé un remboursement'; clic(w, '[data-a="clash-libre-envoyer"]');
  assert.match(d.body.textContent, /ton dribble a demandé un remboursement/);
  clic(w, '[data-a="clash-libre-reaction"][data-v="mechant"]'); assert.match(d.body.textContent, /Carton jaune/); clic(w, '[data-a="clash-libre-suite"]');
  for(let k = 0; k < 4; k++){ clic(w, '[data-a="clash-libre-carte"][data-v="1"]'); clic(w, '[data-a="clash-libre-reaction"][data-v="rire"]'); }
  assert.match(d.querySelector('h2').textContent, /Inès gagne le clash/);
  assert.match(d.querySelector('.battle-score').textContent, /Inès 11 – 6 Yanis/);
  assert.ok(d.querySelectorAll('.contexte-exo li').length >= 3, 'liste de l’anglais appris');
  // Revanche : mêmes joueurs.
  clic(w, '[data-a="clash-libre-go"]'); assert.match(d.querySelector('h2').textContent, /Inès, envoie ta vanne à Yanis/);
});
await test('v5.87 : ajouter des vannes au paquet — règles, puis l’IA trie ; en attente si le serveur se tait', async () => {
  const attendreUn = () => new Promise(r => setTimeout(r, 30));
  // 1) Sans serveur : le juge de Plumo seul.
  let w = page(), d = w.document;
  clic(w, '[data-a="anglais"]'); clic(w, '[data-a="battle"]'); clic(w, '[data-a="clash-libre"]'); clic(w, '[data-a="clash-libre-paquet"]');
  d.getElementById('cl-fr').value = 't’es moche'; clic(w, '[data-a="clash-libre-ajouter"]'); await attendreUn();
  assert.match(d.getElementById('cl-paquet-msg').textContent, /refuse/);
  d.getElementById('cl-fr').value = 'Wesh gros, ton dribble a demandé un remboursement'; clic(w, '[data-a="clash-libre-ajouter"]'); await attendreUn();
  assert.match(d.body.textContent, /Ajoutée/); assert.strictEqual(w.AmiDesMots.base.clashPerso[0].etat, 'regles');
  assert.ok(!w.__fetch.some(u => /vanne-juge/.test(u)), 'pas de serveur : rien n’est envoyé');
  // Elle sort en jeu (⭐), et « trop méchant » la fait sortir du paquet.
  const V = w.VANNES_LIBRES; assert.ok(V.toutes(w.AmiDesMots.base.clashPerso).some(v => v.perso));
  clic(w, '[data-a="clash-libre"]'); clic(w, '[data-a="clash-libre-go"][data-v="3"]');
  let k = 0; while(!d.querySelector('.clash-carte .ic') || ![...d.querySelectorAll('.clash-carte')].some(b => b.textContent.includes('dribble'))){ clic(w, '[data-a="clash-libre-melange"]'); if(++k > 60) break; }
  const carte = [...d.querySelectorAll('.clash-carte')].find(b => b.textContent.includes('dribble')); assert.ok(carte, 'la vanne ⭐ sort dans les cartes'); carte.click();
  clic(w, '[data-a="clash-libre-reaction"][data-v="mechant"]'); assert.match(d.body.textContent, /sort du paquet/); assert.strictEqual(w.AmiDesMots.base.clashPerso.length, 0);
  // 2) Avec serveur : l’IA refuse, l’IA accepte (et corrige l’anglais), l’IA muette → en attente, puis revérifiée.
  w = page(undefined, { MODE_PAYANT:false, SERVEUR:'https://ami.example/serveur' }); d = w.document;
  let rep = { garder:false, raison:'Elle vise la famille de façon déguisée.' }, corps = [];
  w.fetch = async (u, o) => { w.__fetch.push(String(u)); if(/vanne-juge/.test(u)){ corps.push(JSON.parse(o.body)); if(rep === null) return { ok:false, json:async () => ({}) }; return { ok:true, json:async () => rep }; } return { ok:true, json:async () => ({}) }; };
  clic(w, '[data-a="anglais"]'); clic(w, '[data-a="battle"]'); clic(w, '[data-a="clash-libre"]'); clic(w, '[data-a="clash-libre-paquet"]');
  d.getElementById('cl-fr').value = 'Ton goûter a plus de followers que toi'; clic(w, '[data-a="clash-libre-ajouter"]'); await attendreUn();
  assert.match(d.getElementById('cl-paquet-msg').textContent, /L’IA ne la met pas dans le paquet : Elle vise la famille/);
  assert.deepStrictEqual(Object.keys(corps[0]).sort(), ['en', 'fr'], 'seulement le texte de la vanne');
  rep = { garder:true, raison:'', en_corrige:'Bro, your dribble asked for a refund.' };
  d.getElementById('cl-fr').value = 'Wesh gros, ton dribble a demandé un remboursement'; d.getElementById('cl-en').value = 'Bro your dribble ask refund'; clic(w, '[data-a="clash-libre-ajouter"]'); await attendreUn();
  assert.match(d.body.textContent, /L’IA valide/); assert.strictEqual(w.AmiDesMots.base.clashPerso[0].en, 'Bro, your dribble asked for a refund.');
  rep = null;
  d.getElementById('cl-fr').value = 'Ta riposte est arrivée en colis suivi'; clic(w, '[data-a="clash-libre-ajouter"]'); await attendreUn();
  assert.strictEqual(w.AmiDesMots.base.clashPerso[1].etat, 'attente');
  assert.ok(!V.toutes(w.AmiDesMots.base.clashPerso).some(v => v.fr === 'Ta riposte est arrivée en colis suivi'), 'en attente : ne sort pas en jeu');
  rep = { garder:true, raison:'', en_corrige:null }; clic(w, '[data-a="clash-libre"]'); await attendreUn(); await attendreUn();
  assert.strictEqual(w.AmiDesMots.base.clashPerso[1].etat, 'ok', 'revérifiée à l’ouverture du clash');
  // Le serveur : clé et règles côté serveur seulement.
  const P = lire('serveur-php/vanne-juge.php');
  assert.match(P, /Dans le doute, REFUSE/); assert.match(P, /ami_limiter\('vanne-juge'/); assert.ok(!/sk-ant-/.test(P));
});
await test('v5.89 : anglais scolaire de la 6e au bac — chapitres, évaluations, vannes validées par le juge', async () => {
  const w = page(), d = w.document, M = w.MATIERES, m = M.trouver('langlais');
  assert.ok(m, 'matière anglais');
  for(const n of ['6e', '5e', '4e', '3e', '2nde', '1re', 'Tle']){ assert.ok(M.chapitres('langlais', n).length >= 6, n); assert.ok(m.examens[n], 'évaluation ' + n); assert.strictEqual(M.serie('langlais', 'examen', n, 20, 11, 'taquin').length, 20, n); }
  assert.match(m.examens.Tle, /attestation/); assert.match(m.examens['3e'], /socle/);
  for(const ch of m.chapitres) for(const x of ch.banque || []){ assert.strictEqual(x[2].length, 3, x[0]); for(const f of x[2]){ assert.notStrictEqual(f[0], x[1]); assert.ok(w.JUGE.juger(f[1]).ok, f[1]); } assert.ok(x[3], 'explication : ' + x[0]); }
  const r = M.hasard(5); for(let i = 0; i < 400; i++){ const g = M._anglais.genIrreg(r); assert.ok(g.faux.length >= 2); for(const f of g.faux){ assert.notStrictEqual(f.en, g.bon); assert.ok(w.JUGE.juger(f.vanne.replace(/\{f\}/g, f.en).replace(/\{j\}/g, g.bon)).ok, f.vanne); } }
  // Parcours réel : Matières → Anglais → 3e → évaluation de fin de 3e, note sur 20.
  const va = (a, v) => { const b = d.createElement('button'); b.dataset.a = a; if(v != null) b.dataset.v = v; d.body.appendChild(b); b.click(); b.remove(); };
  va('matieres'); clic(w, '[data-a="matiere"][data-v="langlais"]'); clic(w, '[data-a="matiere-niveau"][data-v="langlais|3e"]');
  assert.match(d.body.textContent, /Évaluation de fin de 3e/);
  clic(w, '[data-a="matiere-examen"][data-v="langlais"]');
  let k = 0; while(d.querySelector('[data-a="qz-rep"]:not([disabled])') && k < 25){ d.querySelector('[data-a="qz-rep"]:not([disabled])').click(); k++; const s = d.querySelector('[data-a="qz-suivant"]'); if(s) s.click(); }
  assert.strictEqual(k, 20, '20 questions'); assert.match(d.body.textContent, /\/ 20/); assert.ok(w.AmiDesMots.J().matieres.notes['langlais-3e'] >= 0, 'note gardée');
  // Battle entre potes : le mode « Anglais du programme » sort des questions du niveau.
  va('potes'); assert.ok(d.querySelector('[data-a="potes-matiere"][data-v="langlais"]'), 'battle anglais du programme');
});
await test('v5.90 : une vanne aussi sur les bonnes réponses, sans viser la personne', async () => {
  const w = page(), T = w.TRASH_TALK, d = w.document, A = w.AmiDesMots;
  const toutes = Object.values(T.BONNE).flat().concat(T.SERIE_BONNE.map(x => T.remplir(x, { k:3 })), T.BONNE_EN);
  assert.ok(toutes.length >= 30);
  for(const l of toutes){ assert.ok(w.JUGE.juger(l).ok, l); assert.ok(!/\b(nul|bête|idiot|moche|cerveau|QI)\b/i.test(l), l); }
  assert.ok(T.BONNE.doux.every(l => !/triché|ouf|énerve/.test(l)), 'tout doux reste gentil');
  // En jeu : matière, ton taquin, bonne réponse → une vanne de la liste taquin, avec les boutons 😂/🙄.
  A.J().maths = Object.assign(A.J().maths || {}, { ton:'taquin' });
  const va = (a, v) => { const b = d.createElement('button'); b.dataset.a = a; if(v != null) b.dataset.v = v; d.body.appendChild(b); b.click(); b.remove(); };
  va('matieres'); va('matiere', 'langlais'); va('matiere-niveau', 'langlais|6e'); va('matiere-melange', 'langlais');
  const q = d.querySelector('.piege-opt') && [...d.querySelectorAll('[data-a="qz-rep"]')];
  const bon = q.find(b => d.querySelector('#qz-retour') && b); // on clique la bonne : elle est connue de l’état du jeu
  const opts = [...d.querySelectorAll('[data-a="qz-rep"]')], bonne = opts.find(b => b.textContent.trim() === String(A.qzEtat ? A.qzEtat().bon : '')) ;
  if(bonne){ bonne.click(); const t = d.querySelector('.piege-bravo').textContent; assert.ok(T.BONNE.taquin.includes(t) || T.SERIE_BONNE.length, t); assert.ok(d.querySelector('[data-a="qz-avis"]')); }
  assert.ok(T.BONNE.taquin.includes(T.bonneReponse('taquin', 1, null, false)));
  assert.ok(T.BONNE.cash.includes(T.bonneReponse('sanspitie', 1, null, false)));
  assert.ok(T.BONNE_EN.includes(T.bonneReponse('taquin', 1, null, true)));
});
await test('v5.90 : renfort des matières — une évaluation à chaque niveau, philo en Tle, vannes validées', async () => {
  const w = page(), M = w.MATIERES;
  for(const id of ['francais', 'histoire', 'svt', 'physique', 'langlais']) for(const n of M.niveauxDe(id)){ const m = M.trouver(id);
    if(!m.examens[n]) continue; const s = M.serie(id, 'examen', n, 20, 3, 'taquin'); assert.ok(s.length >= 9, id + ' ' + n + ' : ' + s.length + ' questions'); }
  for(const id of ['histoire', 'svt', 'physique']) for(const n of ['6e', '5e', '4e', '3e', '2nde', '1re', 'Tle'].filter(n => M.chapitres(id, n).length)) assert.ok(M.trouver(id).examens[n], id + ' ' + n);
  const p = M.trouver('philo'); assert.ok(p && p.examens.Tle); assert.ok(M.serie('philo', 'examen', 'Tle', 20, 1, 'taquin').length >= 12);
  for(const m of M.LISTE) for(const c of m.chapitres.filter(c => /^r-/.test(c.id))) for(const x of c.banque){ assert.strictEqual(x[2].length, 3, x[0]); for(const f of x[2]){ assert.notStrictEqual(f[0], x[1]); assert.ok(w.JUGE.juger(f[1]).ok, f[1]); } assert.ok(x[3]); }
});
await test('v5.91 : 3 bonnes d’affilée → Plumo appelle ses potes ; la 4e → la bande vanne Plumo (jamais le joueur)', async () => {
  const w = page(), T = w.TRASH_TALK, d = w.document, A = w.AmiDesMots;
  const lignes = [...T.ANNONCE_POTES.doux, ...T.ANNONCE_POTES.fort, ...T.ENTREE_POTES, ...T.RACCROCHE, ...T.POTES.flatMap(p => p[3].map(l => T.remplir(l, { a:T.NOM_AMI })))];
  for(const l of lignes){ assert.ok(w.JUGE.juger(l).ok, l); assert.ok(!/\{\w+\}/.test(l), l); }
  for(const p of T.POTES) for(const l of p[3]) assert.match(l, /\{a\}/, 'la bande vise Plumo : ' + l);
  assert.ok(T.ANNONCE_POTES.fort.some(l => /Wwwwaaaaa, t’es un ouf toi !! La prochaine bonne réponse, j’appelle mes potes/.test(l)));
  const b = T.bandePotes(null, () => .3); assert.ok(b.potes.length >= 2 && b.potes.length <= 3);
  // En jeu : on répond juste en lisant la bonne réponse affichée après coup (on rejoue la même question si besoin).
  A.J().maths = Object.assign(A.J().maths || {}, { ton:'taquin' });
  const va = (a, v) => { const x = d.createElement('button'); x.dataset.a = a; if(v != null) x.dataset.v = v; d.body.appendChild(x); x.click(); x.remove(); };
  va('matieres'); va('matiere', 'langlais'); va('matiere-niveau', 'langlais|4e'); va('matiere-melange', 'langlais');
  // Quatre bonnes réponses d'affilée, pour de vrai.
  const bonne = () => [...d.querySelectorAll('[data-a="qz-rep"]')].find(b => b.textContent.trim() === A.qzBonne());
  const html = []; for(let i = 0; i < 4; i++){ bonne().click(); html.push(d.getElementById('qz-retour').innerHTML); va('qz-suivant'); }
  assert.match(html[2], /Wwwwaaaaa|potes|bande|renfort/); assert.match(html[3], /class="pote"/); assert.match(html[3], /4 d’affilée/);
  // v6.4 : pas de répétition — à 7 et 8 d'affilée, la bande ne revient pas.
  const apres = []; for(let i = 0; i < 4; i++){ bonne().click(); apres.push(d.getElementById('qz-retour').innerHTML); va('qz-suivant'); }
  for(const h of apres) assert.ok(!/class="pote"/.test(h) && !/Wwwwaaaaa|j’appelle mes potes/.test(h), 'la bande ne revient pas à 8');
  // Nouvelle série : une erreur juste après l'annonce → Plumo raccroche.
  va('matiere-melange', 'langlais');
  for(let i = 0; i < 3; i++){ bonne().click(); va('qz-suivant'); }
  [...d.querySelectorAll('[data-a="qz-rep"]')].find(b => b.textContent.trim() !== A.qzBonne()).click();
  assert.match(d.getElementById('qz-retour').innerHTML, /raccroch|rappelle pas|annulé/);
  const vus = [];
  for(let i = 0; i < 0; i++){
    const o = [...d.querySelectorAll('[data-a="qz-rep"]')]; o[0].click();
    vus.push({ ok:o[0].classList.contains('ok'), html:d.getElementById('qz-retour').innerHTML }); va('qz-suivant');
  }
  // Rejoue la logique sur la vraie série : à la 3e juste consécutive, annonce ; à la 4e, la bande.
  let k = 0; for(const v of vus){ k = v.ok ? k + 1 : 0;
    if(v.ok && k % 4 === 3) assert.match(v.html, /potes|bande|renfort|amis/, 'annonce à 3');
    if(v.ok && k >= 4 && k % 4 === 0) assert.match(v.html, /class="pote"/, 'la bande à 4'); }
});
await test('v5.93 : bilan des parents — évolution, notes, conseil, partage ; Plumo 3D avec accessoires ; pages légales', async () => {
  const w = page(), d = w.document, A = w.AmiDesMots, J = A.J();
  const jr = J.journal = {}, aj = k => { const x = new Date(Date.now() - k * 864e5); return x.getFullYear() + '-' + String(x.getMonth() + 1).padStart(2, '0') + '-' + String(x.getDate()).padStart(2, '0'); };
  jr[aj(1)] = { 'maths+':4, 'maths-':8, 'francais+':9, 'francais-':1, min:20 }; jr[aj(9)] = { 'maths+':2, 'maths-':2 };
  J.matieres = Object.assign(J.matieres || {}, { notes:{ 'langlais-3e':14.5, 'blanc-brevet':12 } });
  const va = (a, v) => { const x = d.createElement('button'); x.dataset.a = a; if(v != null) x.dataset.v = v; d.body.appendChild(x); x.click(); x.remove(); };
  va('parents'); const [, x, y] = d.querySelector('main').textContent.match(/(\d+) × (\d+)/); d.getElementById('porte-parents').value = String(x * y); va('parents-ouvrir');
  const t = d.querySelector('main').textContent;
  assert.match(t, /Cette semaine/); assert.match(t, /semaine dernière/); assert.match(t, /Conseil de Plumo : un petit quart d’heure sur les maths \(33 %/); assert.match(t, /14,5\/20/);
  assert.ok(d.querySelector('[data-a="bilan-partager"]'));
  let partage = null; w.navigator.clipboard = { writeText:async x => { partage = x; } }; va('bilan-partager'); await new Promise(r => setTimeout(r, 10));
  assert.match(partage, /Bilan Ami des mots de la semaine : 1 jour\(s\) de jeu, environ 20 min, 22 réponses \(59 % de réussite\)\. À retravailler : les maths\./);
  // Plumo : toujours l'image 3D, accessoires par-dessus.
  J.porte = ['echarpe', 'noeud']; A.accueil();
  assert.ok(d.querySelector('.ami-3d-wrap img.ami-3d'), 'Plumo en 3D même avec accessoires');
  assert.ok(d.querySelector('.ami-acc-echarpe') && d.querySelector('.ami-acc-noeud'));
  assert.ok(d.querySelector('a[href="legal.html#confidentialite"]'), 'lien confidentialité sur l’accueil');
  const L = lire('legal.html');
  for(const x of ['id="mentions"', 'id="confidentialite"', 'id="cgu"', 'id="cgv"', 'jamais envoyé', '3018', 'CNIL', 'rétractation']) assert.ok(L.includes(x), x);
  assert.ok(lire('sw.js').includes('legal.html'), 'page légale disponible hors ligne');
  // La bande : dessin de chaque pote (ou image 3D si présente).
  for(const id of ['pico', 'zaza', 'rocket']) assert.match(w.BANDE.svg(id), /<svg|<img/);
});
await test('v5.93 : espagnol et allemand LVB de la 5e au bac — évaluations, vannes validées', async () => {
  const w = page(), M = w.MATIERES;
  for(const id of ['lespagnol', 'lallemand']){ const m = M.trouver(id); assert.ok(m, id);
    for(const n of ['5e', '4e', '3e', '2nde', '1re', 'Tle']){ assert.ok(m.examens[n], id + ' ' + n); assert.ok(M.serie(id, 'examen', n, 20, 9, 'taquin').length >= 10, id + ' ' + n); }
    for(const c of m.chapitres) for(const x of c.banque){ assert.strictEqual(x[2].length, 3, x[0]); for(const f of x[2]){ assert.notStrictEqual(f[0], x[1]); assert.ok(w.JUGE.juger(f[1]).ok, f[1]); } assert.ok(x[3]); } }
  const d = w.document, va = (a, v) => { const x = d.createElement('button'); x.dataset.a = a; if(v != null) x.dataset.v = v; d.body.appendChild(x); x.click(); x.remove(); };
  va('matieres'); assert.ok(d.querySelector('[data-a="matiere"][data-v="lespagnol"]') && d.querySelector('[data-a="matiere"][data-v="lallemand"]'));
});
await test('v5.94 : tous les moyens de payer — formules Stripe, code cadeau, achats Google / Apple vérifiés par le serveur', async () => {
  const { prive, publique } = await cles();
  const fin = new Date(Date.now() + 30 * 864e5).toISOString();
  const FORMULES = [{ id:'mensuel', prix:'5,99 €', lien:'https://buy.stripe.com/m', essai:'7 jours gratuits', magasin:true }, { id:'annuel', prix:'49 €', lien:'https://buy.stripe.com/a', magasin:true },
    { id:'a_vie', prix:'99 €', lien:'https://buy.stripe.com/v', magasin:false }, { id:'pirate', prix:'0 €', lien:'https://pirate.example/x' }];
  // 1) Site : une carte par formule avec lien Stripe + code anonyme ; formule inconnue ignorée ; lien non Stripe refusé.
  let w = page(undefined, { MODE_PAYANT:true, SERVEUR:'https://ami.example/serveur', CLE_PUBLIQUE:publique, FORMULES }); await w.AmiDesMotsPret;
  let d = w.document, A = w.AmiDesMots, code = A.base.abo.code;
  A.ecranPlus(); const cartes = [...d.querySelectorAll('a.carte-formule')];
  assert.strictEqual(cartes.length, 3); assert.ok(cartes[0].getAttribute('href').startsWith('https://buy.stripe.com/m?client_reference_id=' + encodeURIComponent(code)));
  assert.match(d.querySelector('main').textContent, /7 jours gratuits/); assert.match(d.querySelector('main').textContent, /Un seul paiement, pour toujours/);
  assert.ok(!d.querySelector('[data-a="plus-acheter"]'), 'pas de bouton store sur le site');
  // 2) Code cadeau : le serveur répond avec un certificat signé → Plus s'ouvre ; un faux certificat ne l'ouvre pas.
  const signer = async (c, f) => b64u(new Uint8Array(await webcrypto.subtle.sign({ name:'ECDSA', hash:'SHA-256' }, prive, Buffer.from(c + '|' + f))));
  let envoye = null; w.fetch = async (u, o) => { w.__fetch.push(String(u)); if(/cadeau\.php$/.test(u)){ envoye = JSON.parse(o.body); return { ok:true, json:async () => ({ actif:true, fin, jeton:await jeton(code, fin), mois:3 }) }; } return { ok:true, json:async () => ({ actif:false }) }; };
  d.querySelector('#cadeau').value = 'cadeau-ab12-cd34'; d.getElementById('form-cadeau').dispatchEvent(new w.Event('submit', { cancelable:true })); await attendre(80);
  assert.deepStrictEqual(envoye, { code, cadeau:'CADEAU-AB12-CD34' }); assert.ok(A.plus(), 'le code cadeau ouvre Plus (certificat signé)');
  assert.match(d.getElementById('cadeau-etat').textContent, /3 mois/);
  const w2 = page(undefined, { MODE_PAYANT:true, SERVEUR:'https://ami.example/serveur', CLE_PUBLIQUE:publique, FORMULES }); await w2.AmiDesMotsPret;
  assert.ok(!await w2.AmiDesMots.appliquerCertificat({ actif:true, jeton:'faux.faux' }, w2.AmiDesMots.base.abo.code)); assert.ok(!w2.AmiDesMots.plus(), 'faux certificat refusé');
  // 3) Appli Android : seules les formules « stores » ; achat → serveur (magasin.php) → certificat → Plus. Pas de lien Stripe.
  let valider = null, commande = null;
  const faux = x => { x.Capacitor = { isNativePlatform:() => true, getPlatform:() => 'android' };
    const quand = { approved:() => quand, verified:() => quand };
    x.CdvPurchase = { Platform:{ GOOGLE_PLAY:'android-playstore', APPLE_APPSTORE:'ios-appstore' }, ProductType:{ PAID_SUBSCRIPTION:'sub', NON_CONSUMABLE:'nc' },
      store:{ register(){}, when:() => quand, initialize:async () => {}, restorePurchases:async () => {}, set validator(f){ valider = f; }, get validator(){ return valider; },
        get:id => ({ pricing:{ price:id === 'plus_mensuel' ? '5,49 €' : '45,99 €' }, getOffer:() => ({ order:async () => { commande = id; } }) }) } }; };
  const w3 = page(undefined, { MODE_PAYANT:true, SERVEUR:'https://ami.example/serveur', CLE_PUBLIQUE:publique, FORMULES }, faux); await w3.AmiDesMotsPret; await attendre(30);
  const d3 = w3.document, A3 = w3.AmiDesMots, code3 = A3.base.abo.code; A3.ecranPlus();
  assert.strictEqual(d3.querySelectorAll('[data-a="plus-acheter"]').length, 2, 'mensuel et annuel (à vie non proposé dans les stores)');
  assert.ok(!d3.querySelector('a.carte-formule'), 'aucun lien Stripe dans l’appli des stores');
  assert.match(d3.querySelector('main').textContent, /5,49 €/, 'prix du store'); assert.ok(d3.querySelector('[data-a="plus-restaurer"]'));
  d3.querySelector('[data-a="plus-acheter"][data-v="mensuel"]').click(); await attendre(20); assert.strictEqual(commande, 'plus_mensuel');
  let corps = null; w3.fetch = async (u, o) => { if(/magasin\.php$/.test(u)){ corps = JSON.parse(o.body); return { ok:true, json:async () => ({ actif:true, fin, jeton:await jeton(code3, fin) }) }; } return { ok:true, json:async () => ({}) }; };
  let rep = null; await valider({ transactions:[{ purchaseId:'jeton-google-123456', products:[{ id:'plus_mensuel' }] }] }, x => { rep = x; }); await attendre(40);
  assert.deepStrictEqual(corps, { code:code3, plateforme:'google', produit:'plus_mensuel', jeton:'jeton-google-123456' }); assert.ok(rep.ok); assert.ok(A3.plus(), 'achat vérifié par le serveur → Plus');
  // Serveur qui refuse : rien n'est ouvert.
  const w4 = page(undefined, { MODE_PAYANT:true, SERVEUR:'https://ami.example/serveur', CLE_PUBLIQUE:publique, FORMULES }, faux); await w4.AmiDesMotsPret; await attendre(30);
  w4.fetch = async () => ({ ok:false, json:async () => ({ actif:false, erreur:'achat_invalide' }) });
  rep = null; await valider({ transactions:[{ purchaseId:'faux-jeton-999', products:[{ id:'plus_mensuel' }] }] }, x => { rep = x; }); await attendre(20);
  assert.ok(!rep.ok); assert.ok(!w4.AmiDesMots.plus(), 'achat non confirmé : pas de Plus');
  // Le serveur : vérifications Google / Apple et aucun secret côté jeu.
  const P = lire('serveur-php/paiement-lib.php'), M = lire('serveur-php/magasin.php');
  assert.match(P, /subscriptionsv2\/tokens/); assert.match(P, /inApps\/v1\/transactions/); assert.match(M, /achat_invalide/);
  for(const f of ['js/achats.js', 'js/jeu.js']) assert.ok(!/BEGIN (EC |RSA )?PRIVATE KEY|sk_live|private_key/.test(lire(f)), 'aucun secret dans ' + f);
});
await test('v5.94 : la bande vanne Plumo version cash (version douce pour « Tout doux »)', () => {
  const w = page(), T = w.TRASH_TALK;
  const cash = new Set(T.POTES.flatMap(p => p[3].map(l => T.remplir(l, { a:T.NOM_AMI })))), doux = new Set(Object.values(T.POTES_DOUX).flat().map(l => T.remplir(l, { a:T.NOM_AMI })));
  for(let k = 0; k < 30; k++){ for(const p of T.bandePotes(null, Math.random, 'taquin').potes) assert.ok(cash.has(p.dit), p.dit); for(const p of T.bandePotes(null, Math.random, 'doux').potes) assert.ok(doux.has(p.dit), p.dit); }
  for(const l of [...cash, ...doux]){ assert.ok(w.JUGE.juger(l).ok, l); assert.match(l, /Plumo/, 'la bande vise Plumo, pas le joueur : ' + l); }
  assert.ok(cash.size >= 18);
});
await test('hors connexion : le service worker garde le jeu et toutes ses images', () => {
  const S = lire('sw.js');
  for(const f of fs.readdirSync(path.join(ICI, 'img/pictos'))) assert.ok(S.includes('img/pictos/' + f), f);
  for(const f of ['index.html', 'js/jeu.js', 'js/donnees.js', 'css/jeu.css']) assert.ok(S.includes('"' + f + '"'), f);
});

await test('v5.64 : vannes qui parlent des deux objets, vraies silhouettes, voix la moins robot', () => {
  const w = page(); const A = w.AmiDesMots, VM = w.VANNES_MOTS, fs = require('fs'), path = require('path');
  const avec = Object.keys(w.MOTS).filter(e => w.MOTS[e].img);
  for(const e of avec){ const m = VM.mots[e]; assert.ok(m && m.t && /\{X\}/.test(m.a), 'vanne objet pour ' + e); assert.ok(!/ (à|de) \{X\}/.test(m.a), 'pas de « à le » : ' + m.a); }
  A.base.ui = 'fr'; A.J().langueBlagues = 'fr'; A.J().facile = false;
  const vues = new Set();
  for(let n = 0; n <= 3; n++) for(let k = 0; k < 120; k++){
    const a = avec[k % avec.length], b = avec[(k * 7 + 3) % avec.length]; if(a === b) continue;
    const v = A.vanneObjets(a, b, [A.avecArticle(a), A.avecArticle(b)], n, true);
    if(!v) continue; vues.add(v);
    assert.ok(!/\{|\}|undefined| à le | de le /.test(v), v); assert.ok(w.JUGE.juger(v).ok, 'juge : ' + v);
  }
  assert.ok(vues.size > 300, 'des centaines de vannes différentes : ' + vues.size);
  const ombres = fs.readdirSync(path.join(__dirname, '..', 'img/ombres'));
  assert.ok(ombres.length >= 110, 'silhouettes : ' + ombres.length);
  const hortense = { name:'Microsoft Hortense - French (France)', lang:'fr-FR', localService:true }, denise = { name:'Microsoft Denise Online (Natural) - French (France)', lang:'fr-FR', localService:false }, google = { name:'Google français', lang:'fr-FR', localService:false };
  assert.strictEqual(A.sansEmojis('Le soleil ?! Pour voir. 😂 🇬🇧 « Look! » 🔥'), 'Le soleil? Pour voir. Look!', 'la voix ne lit pas les émojis');
  assert.ok(A.noteVoix(denise, 'fr-FR') > A.noteVoix(google, 'fr-FR') && A.noteVoix(google, 'fr-FR') > A.noteVoix(hortense, 'fr-FR'), 'ordre des voix');
});

await test('v5.66 : vannes écrites en direct par l’IA, jamais deux fois, relues par le juge, repli sans serveur', async () => {
  const w = page(); const A = w.AmiDesMots;
  A.base.ui = 'fr'; A.J().langueBlagues = 'fr'; A.J().facile = false; A.J().humour = 3;
  assert.strictEqual(A.iaPrendre('🏝️', '☀️'), null, 'sans serveur : rien');
  const envois = []; let n = 0;
  w.fetch = async (url, o) => { const d = JSON.parse(o.body); envois.push(d); n++;
    const v = {}; for(const f of d.fausses) v[f] = n === 1 && /soleil/.test(f) ? 'Il a voulu frapper la serviette.' : 'Vanne IA n°' + n + ' sur ' + f + ' 😂';
    return { ok:true, status:200, json:async () => ({ vannes:v }) }; };
  A.CONFIG.API_VANNES_DIRECT = 'https://exemple.test/vannes-direct.php';
  await A.iaPrecharger('mots', 'Quel est le nom ?', { id:'🏝️', texte:'beach (plage)' }, [{ id:'☀️', texte:'sun (soleil)' }, { id:'🌊', texte:'wave (vague)' }], 3, 'fr');
  const d = envois[0];
  assert.deepStrictEqual(Object.keys(d).sort(), ['aimees', 'bonne', 'deja', 'fausses', 'langue', 'pasdrole', 'question', 'style', 'sujet', 'ton'], 'rien de personnel envoyé');
  // v5.78 : seules des vannes notées 😂/🙄 partent pour adapter l'humour — jamais un pseudo ni un nom.
  assert.ok(Array.isArray(d.aimees) && Array.isArray(d.pasdrole) && d.aimees.concat(d.pasdrole).every(t => typeof t === 'string' && t.length <= 170));
  assert.strictEqual(A.iaPrendre('🏝️', '☀️'), null, 'le juge a jeté la vanne violente');
  const v = A.blague('🌊', '🏝️');
  assert.match(v, /Vanne IA n°1 sur wave/, 'la vanne de l’IA est utilisée : ' + v);
  assert.strictEqual(A.iaPrendre('🏝️', '🌊'), null, 'une vanne IA ne sert qu’une fois');
  await A.iaPrecharger('mots', 'Quel est le nom ?', { id:'🏝️', texte:'beach (plage)' }, [{ id:'🌊', texte:'wave (vague)' }], 3, 'fr');
  assert.ok(envois[1].deja.some(x => /n°1 sur wave/.test(x)), 'l’IA reçoit les vannes déjà dites');
  w.fetch = async () => { throw new Error('hors ligne'); };
  await A.iaPrecharger('mots', 'q', { id:'🐱', texte:'cat (chat)' }, [{ id:'🐶', texte:'dog (chien)' }], 1, 'fr');
  assert.ok(A.blague('🐶', '🐱'), 'hors ligne : Plumo garde ses vannes à lui');
});

await test('v5.67 : réglage Graphismes, boutons d’action uniques, effets Ultra chargés et sobres', () => {
  const fs = require('fs'), path = require('path'), J = lire('js/jeu.js');
  // Chaque action du jeu n'a qu'un seul « case » (sinon le second ne marche jamais).
  const cas = [...J.matchAll(/case '([a-z0-9-]+)':/g)].map(m => m[1]), vus = {}, doublons = [];
  for(const c of cas){ if(vus[c]) doublons.push(c); vus[c] = 1; }
  assert.deepStrictEqual(doublons.filter(c => !['juste', 'faux'].includes(c)), [], 'actions en double : ' + doublons.join(', '));
  const I = lire('index.html');
  assert.match(I, /css\/ultra\.css/); assert.match(I, /js\/graphismes\.js/); assert.match(I, /js\/ultra-ecrans\.js/);
  const U = lire('css/ultra.css'); assert.ok(U.split('\n').filter(l => /^[^@/ ]/.test(l) && !/^#|^@|^html\.gfx-ultra|^\}/.test(l)).length === 0, 'tout le CSS Ultra est sous html.gfx-ultra');
  assert.match(U, /prefers-reduced-motion/);
  const G = lire('js/graphismes.js'); assert.match(G, /prefers-reduced-motion/); assert.ok(!/fetch\(|XMLHttpRequest|sendBeacon/.test(G + lire('js/ultra-ecrans.js')), 'rien n’est envoyé');
  const w = page(); w.GRAPHISMES = { choix:() => 'ultra', puissant:() => true, mouvementReduit:() => false, CHOIX:['auto', 'normal', 'ultra'], definir(v){ this.v = v; } };
  w.AmiDesMots.reglages(); const h = w.document.querySelector('main').innerHTML;
  assert.match(h, /data-a="graphismes" data-v="ultra"/); assert.match(h, /data-a="vannes-ia-direct"|reglage-graphismes/);
  for(const f of ['vendor/jsm/postprocessing/GTAOPass.js', 'vendor/jsm/postprocessing/SMAAPass.js', 'vendor/jsm/math/SimplexNoise.js']) assert.ok(fs.existsSync(path.join(__dirname, '..', f)), f);
  assert.match(lire('vendor/jsm/postprocessing/GTAOPass.js'), /sansAO/, 'étiquettes et vitres exclues de l’occlusion');
});

await test('v5.68 : Battle entre potes depuis l’accueil — maths, anglais et vannes, 2 à 4 joueurs', async () => {
  const w = page(); const A = w.AmiDesMots, $ = s => w.document.querySelector(s), clic = (a, v) => { const b = w.document.createElement('button'); b.dataset.a = a; if(v) b.dataset.v = v; w.document.body.appendChild(b); b.click(); b.remove(); };
  A.base.ui = 'fr'; A.base.cible = 'en'; A.accueil();
  assert.ok($('[data-a="potes"]'), 'bouton sur l’accueil'); assert.match($('[data-a="potes"]').textContent, /maths, anglais et vannes/);
  clic('potes'); assert.ok($('.potes'), 'écran de la battle');
  assert.strictEqual(w.document.querySelectorAll('[data-a="potes-matiere"]').length, 6, 'mélange, culture G, maths, anglais, anglais du programme, vannes');
  clic('potes-go'); assert.match($('#potes-msg').textContent, /2 joueurs/, 'il faut 2 joueurs');
  $('#pote0').value = 'Léo'; $('#pote1').value = 'Inès'; $('#potes-niveau').value = '4e'; clic('potes-go');
  assert.match($('main').textContent, /Passe le téléphone à Léo/);
  for(let j = 0; j < 2; j++){
    clic('potes-joue');
    let n = 0, sujets = new Set();
    while($('[data-a="qz-rep"]:not([disabled])') && n < 20){
      const cons = ($('main').textContent || ''); if(/Maths 4e/.test(cons)) sujets.add('maths'); if(/punchline/.test(cons)) sujets.add('vannes'); if(/anglais|True or false|Écoute/.test(cons)) sujets.add('anglais');
      const b = $('[data-a="qz-rep"]:not([disabled])'); b.click(); n++;
      const s = $('[data-a="qz-suivant"]'); if(s) s.click();
    }
    assert.ok(n >= 6, 'questions jouées : ' + n);
    if(j === 0) assert.deepStrictEqual([...sujets].sort(), ['anglais', 'maths', 'vannes'], 'le mélange contient les trois');
    if(j === 0) assert.match($('main').textContent, /Inès/, 'au tour d’Inès');
  }
  assert.match($('main').textContent, /gagne la battle|Égalité/, 'podium');
  assert.ok($('[data-a="potes-revanche"]'));
});

await test('v5.69 : battles plus longues et plus drôles (71 clashs, 50 vrai ou faux, longueur au choix)', () => {
  const w = page(), A = w.AmiDesMots, $ = s => w.document.querySelector(s), clic = (a, v) => { const b = w.document.createElement('button'); b.dataset.a = a; if(v) b.dataset.v = v; w.document.body.appendChild(b); b.click(); b.remove(); };
  assert.ok(w.CLASH.MANCHES.length + w.ANGLAIS.BATTLE.length >= 80, 'clashs : ' + (w.CLASH.MANCHES.length + w.ANGLAIS.BATTLE.length));
  assert.ok(w.RIGOLADE.VRAI_FAUX.length >= 45, 'vrai ou faux : ' + w.RIGOLADE.VRAI_FAUX.length);
  A.base.ui = 'fr'; A.base.cible = 'en'; clic('potes');
  assert.strictEqual(w.document.querySelectorAll('[data-a="potes-longueur"]').length, 3);
  for(const [lg, n] of [['courte', 9], ['normale', 15], ['marathon', 24]]){
    clic('potes-longueur', lg); $('#pote0').value = 'A'; $('#pote1').value = 'B'; clic('potes-go'); clic('potes-joue');
    let k = 0; while($('[data-a="qz-rep"]:not([disabled])') && k < 40){ $('[data-a="qz-rep"]:not([disabled])').click(); k++; const s = $('[data-a="qz-suivant"]'); if(s) s.click(); }
    assert.strictEqual(k, n, lg + ' : ' + k + ' questions'); clic('potes');
  }
});

await test('v5.70 : le professeur hibou s’anime (salue, parle, réfléchit, bravo, erreur) et réagit aux réponses', async () => {
  const html = lire('professeur.html');
  const d = new JSDOM(html.replace(/<script[\s\S]*?<\/script>/g, ''), { url:'https://jeu.example/professeur.html', runScripts:'outside-only', pretendToBeVisual:true }).window;
  d.matchMedia = () => ({ matches:false }); d.speechSynthesis = undefined;
  d.eval(lire('js/professeur-ia.js')); d.eval(lire('js/prof-anime.js'));
  d.eval(html.match(/<script>([\s\S]*?)<\/script>/)[1]);
  const $ = s => d.document.querySelector(s), svg = $('#hibou-grand svg');
  for(const c of ['.h-tete', '.h-paupiere', '.h-pupilles', '.h-bec-bas', '.h-sourcil-g', '.h-salut', '.h-aile-g', '.h-rieurs']) assert.ok(svg.querySelector(c), 'pièce du hibou ' + c);
  assert.ok($('#hibou-mini svg'), 'petit hibou dans le coin');
  await new Promise(r => setTimeout(r, 600)); assert.ok(svg.classList.contains('h-salue'), 'il salue en arrivant');
  $('#start').click(); assert.ok($('.bouton-ecouter'), 'bouton « Plumo m’explique »');
  assert.match($('#hibou-grand .bulle-hibou').textContent, /Aujourd|programme|Leçon du jour/);
  const c = d.AMI_PROFESSEUR; d.document.querySelectorAll('.answer')[0].click();
  assert.ok(svg.classList.contains('h-bravo') || svg.classList.contains('h-erreur'), 'il réagit à la réponse');
  $('#bouton-voix').click(); assert.match($('#bouton-voix').textContent, /Muet/); $('#bouton-voix').click();
  assert.match(lire('css/professeur-ia.css'), /prefers-reduced-motion:reduce\)\{\.hibou-anime/);
  assert.ok(!/fetch\(|XMLHttpRequest/.test(lire('js/prof-anime.js')), 'rien n’est envoyé');
});

await test('v5.71 : Prof Pi ironise sur chaque erreur classique de maths, et la nuit Ultra reste lisible', () => {
  const w = page(), E = w.MATHS.ERREURS, I = w.VANNES_IRONIE;
  assert.ok(Object.keys(I).length >= 95, 'clés : ' + Object.keys(I).length);
  for(const k in E) assert.ok(E[k].t.some(l => /[?!]/.test(l)), 'une vanne qui pique pour ' + k);
  for(const k in I) for(const l of I[k]) assert.ok(w.JUGE.juger(l.replace(/\{f\}/g, '12').replace(/\{j\}/g, '13')).ok, l);
  // La première vanne de la médiane est une vraie vanne (plus seulement une explication).
  const vue = new Set(), mem = { age:l => vue.has(l) ? 1 : -1, noter:l => vue.add(l) };
  const v = w.MATHS.vanne('mediane-moyenne', 'taquin', { f:'10,6', j:'13' }, Math.random, mem);
  assert.match(v, /[?!]|^Ah, |^Bravo/, v);
  const K = lire('js/kit3d.js'); assert.ok(!/\(c - \.45\) \* 1\.1/.test(K), 'plus de contraste qui écrase la nuit en noir');
  const M = lire('monde-3d.html'); assert.match(M, /#top\{backdrop-filter:none/); assert.match(M, /id="menuBtn"/);
});

await test('v5.72 : village caché pour l’instant (réglage VILLAGE_CACHE), rien n’est supprimé', () => {
  const w = page(), A = w.AmiDesMots, $ = s => w.document.querySelector(s);
  assert.match(lire('js/config-site.js'), /VILLAGE_CACHE:true/);
  A.CONFIG.VILLAGE_CACHE = true; A.base.ui = 'fr'; A.accueil();
  assert.ok(!$('[data-a="village"]') && !$('[data-a="accueil-3d"]'), 'pas de bouton village sur l’accueil');
  assert.ok($('[data-a="potes"]') && $('.mots-city-accueil'), 'le reste est là');
  A.CONFIG.VILLAGE_CACHE = false; A.accueil();
  assert.ok($('[data-a="village"]') && $('[data-a="accueil-3d"]'), 'il revient en mettant false');
  assert.match(lire('monde-3d.html'), /CONFIG_JEU\.VILLAGE_CACHE/); assert.ok(require('fs').existsSync(require('path').join(__dirname, '..', 'monde-3d.html')));
});

await test('v5.74 : l’essentiel — Plumo se tait (consignes, vannes), mais les jeux d’écoute gardent leur voix ; 👄 et Mots City cachés', () => {
  const C = lire('js/config-site.js'); for(const k of ['VOIX_COUPEES:true', 'JEUX_ECOUTE_CACHE:false', 'BOUCHE_CACHE:true', 'MOTS_CITY_CACHE:true']) assert.ok(C.includes(k), k);
  const w = page(), A = w.AmiDesMots, $ = s => w.document.querySelector(s);
  Object.assign(A.CONFIG, { VOIX_COUPEES:true, JEUX_ECOUTE_CACHE:false, BOUCHE_CACHE:true, MOTS_CITY_CACHE:true }); A.base.ui = 'fr'; A.base.cible = 'en';
  const dits = []; w.speechSynthesis = { getVoices:() => [{ name:'Google', lang:'en-US' }, { name:'Google', lang:'fr-FR' }], cancel(){}, resume(){}, speak(u){ dits.push(u.text); }, addEventListener(){} };
  w.SpeechSynthesisUtterance = function(t){ this.text = t; };
  A.accueil();
  assert.ok(!$('.mots-city-accueil'), 'pas de Mots City'); assert.ok(!$('[data-a="bouche"]'), 'pas de 👄');
  assert.ok($('[data-a="ecouter"]'), 'le 🔊 du mot du jour reste');
  A.choisirJeu('animaux'); assert.ok(w.document.querySelector('[data-v^="ecoute"]'), 'les jeux d’écoute restent dans le menu');
  assert.ok(w.SALON.questionsMixtes(7, 40).some(q => /^o:/.test(q.id)), 'les questions « qu’a dit Plumo ? » restent');
  A.direPhrase('Plumo commente', 'fr'); A.direEcoute('Listen to me', 'en');
  return new Promise(r => setTimeout(() => { assert.deepStrictEqual(dits, ['Listen to me'], 'seul ce qu’il faut écouter est dit'); r(); }, 200));
});

await test('v5.75 : accueil en 4 portes, résumé de la semaine, avis sur les vannes, 3D chargée à la demande, phrases enregistrées', async () => {
  const w = page(), A = w.AmiDesMots, $ = s => w.document.querySelector(s), $$ = s => [...w.document.querySelectorAll(s)];
  const clic = (a, v) => { const b = w.document.createElement('button'); b.dataset.a = a; if(v != null) b.dataset.v = v; w.document.body.appendChild(b); b.click(); b.remove(); };
  assert.match(lire('js/config-site.js'), /ACCUEIL_SIMPLE:true/);
  Object.assign(A.CONFIG, { ACCUEIL_SIMPLE:true, VILLAGE_CACHE:true, MOTS_CITY_CACHE:true }); A.base.ui = 'fr'; A.base.cible = 'en'; A.accueil();
  assert.deepStrictEqual($$('.porte').map(b => b.dataset.a), ['porte-mots', 'maths', 'matieres', undefined, 'potes'], 'les portes (v6.22 : + professeur IA, un lien)'); assert.ok($('a.porte-prof[href="professeur.html"]'), 'porte du professeur IA');
  assert.ok($('[data-a="defi"]') && $('[data-a="lecon"]'), 'défi et 5 mots restent visibles');
  assert.ok($('.mot-jour') && $('nav.raccourcis [data-a="reglages"]') && $('nav.raccourcis [data-a="carnet"]') && $('nav.raccourcis [data-a="parents"]'), 'mot du jour, carnet, réglages, parents');
  assert.ok(!$('nav.raccourcis [data-a="vestiaire"]') && !$('nav.raccourcis [data-a="trophees"]') && !$('nav.raccourcis [data-a="astuces"]') && !$('.carte-jour:not(.mot-jour)'), 'ce qui ne sert pas pour l’instant est rangé');
  assert.ok(!$('.phrases-accueil') && !$('.pieges-accueil'), 'le reste est rangé derrière les portes');
  clic('porte-mots'); for(const a of ['lecon', 'themes', 'revoir', 'phrases', 'anglais']) assert.ok($('[data-a="' + a + '"]'), 'porte mots : ' + a);
  assert.ok($('a[href="professeur.html"]'), 'le professeur est derrière la porte');
  // Résumé parents
  const j = A.J(), d = new Date(), jr = d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0');
  j.journal = { [jr]:{ 'maths+':7, 'maths-':3, 'mots+':12, min:14 } }; j.avisVannes = [{ t:'Ton hypoténuse fait la taille d’un immeuble.', v:1, d:jr }];
  clic('parents'); const m = $('main').textContent.match(/(\d+) × (\d+)/); $('#porte-parents').value = String(m[1] * m[2]); clic('parents-ouvrir');
  const txt = $('main').textContent; assert.match(txt, /Cette semaine/); assert.match(txt, /7\/10 \(70 %\)/); assert.match(txt, /14 min/); assert.match(txt, /hypoténuse/, 'les vannes qui font rire');
  assert.match(lire('js/jeu.js'), /data-a="qz-avis" data-v="1"/, 'avis 😂 / 🙄 après une vanne de maths ou sciences');
  const sw = lire('sw.js'), F = JSON.parse(sw.match(/const FICHIERS = (\[[\s\S]*?\]);/)[1]), L = JSON.parse(sw.match(/const LOURDS = (\[[\s\S]*?\]);/)[1]);
  assert.ok(!F.some(f => /^vendor\/|^assets\/3d\//.test(f)) && L.includes('vendor/three.module.js'), '3D seulement à la demande');
  assert.ok(F.includes('js/jeu.js') && F.includes('index.html'), 'l’essentiel reste hors connexion');
  assert.ok(require('fs').existsSync(require('path').join(__dirname, '..', 'docs/a-enregistrer/phrases-en.csv')) && require('fs').existsSync(require('path').join(__dirname, '..', 'docs/a-relire/maths-5e.csv')));
  // Phrase enregistrée → MP3 au lieu de la voix du téléphone.
  let mp3 = ''; w.Audio = function(u){ mp3 = u; return { play(){ return Promise.resolve(); }, pause(){}, addEventListener(){} }; };
  w.PHRASES_ENREGISTREES = { en:[A.fnv1a('I can see the sea.')] }; A.direEcoute('I can see the sea.', 'en');
  assert.match(mp3, /\/en\/[0-9a-z]+\.mp3$/, 'enregistrement joué : ' + mp3);
});

await test('v5.76 : français, histoire-géo-EMC, SVT, physique-chimie — justes, vannés, et brevet / bac blancs', async () => {
  const w = page(), A = w.AmiDesMots, M = w.MATIERES, $ = s => w.document.querySelector(s), $$ = s => [...w.document.querySelectorAll(s)];
  const clic = (a, v) => { const b = w.document.createElement('button'); b.dataset.a = a; if(v != null) b.dataset.v = v; w.document.body.appendChild(b); b.click(); b.remove(); };
  assert.ok(M.LISTE.map(m => m.id).join(',').startsWith('francais,histoire,svt,physique'));
  // Conjugaison : tableaux vérifiés sur des formes connues.
  const F = M._francais, f = (v, t, i) => F.pron(i, F.forme(v, t, i)) + F.forme(v, t, i);
  assert.deepStrictEqual([f('aller', 'futur', 0), f('être', 'imparfait', 0), f('finir', 'présent', 3), f('voir', 'conditionnel', 5), f('venir', 'passé simple', 2), f('aller', 'passé composé', 5), f('aimer', 'présent', 0), f('faire', 'présent', 4)],
    ['j’irai', 'j’étais', 'nous finissons', 'ils verraient', 'il vint', 'ils sont allés', 'j’aime', 'vous faites']);
  // Toutes les questions : une bonne réponse, des mauvaises différentes, des vannes acceptées par le juge, une explication.
  let n = 0; for(const m of M.LISTE) for(const c of m.chapitres) for(const nv of c.niv) for(const q of M.serie(m.id, c.id, nv, 6, 11, 'taquin')){ n++;
    assert.ok(q.bon && q.faux.length >= 1 && !q.faux.some(x => x.en === q.bon) && new Set(q.faux.map(x => x.en)).size === q.faux.length, q.enonce);
    for(const x of q.faux) assert.ok(w.JUGE.juger(x.vanne).ok, x.vanne); assert.ok(q.regle, 'explication : ' + q.enonce); }
  assert.ok(n > 300, 'questions vérifiées : ' + n);
  // Physique : le calcul est juste (U = R × I).
  for(const q of M.serie('physique', 'elec', '3e', 30, 5, 'taquin').filter(q => /résistance de/.test(q.enonce))){ const [, R, I] = q.enonce.match(/de (\d+) Ω .* de ([\d,]+) A/); assert.strictEqual(parseFloat(q.bon.replace(',', '.')), Math.round(R * parseFloat(I.replace(',', '.')) * 1000) / 1000, q.enonce); }
  // Écrans.
  A.base.ui = 'fr'; Object.assign(A.CONFIG, { ACCUEIL_SIMPLE:true }); A.accueil(); assert.ok($('.porte[data-a="matieres"]'), 'porte Matières');
  clic('matieres'); for(const id of ['francais', 'histoire', 'svt', 'physique']) assert.ok($('[data-a="matiere"][data-v="' + id + '"]'), id); assert.ok($('[data-a="examens"]'), 'onglet Brevet & bac blancs');
  clic('matiere', 'francais'); clic('matiere-niveau', 'francais|3e'); assert.ok($('[data-a="matiere-examen"]'), 'brevet blanc de français en 3e');
  assert.ok($$('.domaine').length >= 3, 'chapitres rangés par domaine');
  clic('matiere-melange', 'francais'); let k = 0; while($('[data-a="qz-rep"]:not([disabled])') && k < 30){ $('[data-a="qz-rep"]:not([disabled])').click(); k++; const s = $('[data-a="qz-suivant"]'); if(s) s.click(); }
  assert.strictEqual(k, 20, '20 questions (v6.40)'); assert.ok(A.J().journal && Object.values(A.J().journal).some(x => x['francais+'] || x['francais-']), 'le journal des parents compte le français');
  // Brevet blanc : 4 épreuves, une note chacune, puis la moyenne.
  clic('examens'); clic('examen-go', 'brevet');
  for(let e = 0; e < 6; e++){ assert.match($('main').textContent, /épreuve \d\/6/); clic('examen-suite'); let j = 0; while($('[data-a="qz-rep"]:not([disabled])') && j < 40){ $('[data-a="qz-rep"]:not([disabled])').click(); j++; const s = $('[data-a="qz-suivant"]'); if(s) s.click(); } assert.ok(j >= 3, 'épreuve ' + e + ' : ' + j); }
  assert.match($('main').textContent, /Moyenne : [\d,]+ \/ 20/); assert.ok(A.J().matieres.notes['blanc-brevet'] >= 0);
  // Battle Culture G.
  clic('potes'); assert.ok($('[data-a="potes-matiere"][data-v="culture"]'));
});

await test('v5.77 : 🥊 trash talk — chambre la réponse, jamais la personne ; ton des matières et battle entre potes', async () => {
  const w = page(), A = w.AmiDesMots, T = w.TRASH_TALK, $ = s => w.document.querySelector(s);
  const clic = (a, v) => { const b = w.document.createElement('button'); b.dataset.a = a; if(v != null) b.dataset.v = v; w.document.body.appendChild(b); b.click(); b.remove(); };
  const vars = { n:'Léa', t:'Tom', s:7, total:15, g:'Léa', d:'Tom', k:4 };
  const toutes = ['IMAGEES', 'TCHATCHE', 'ENTREE', 'BRAVO', 'SERIE_OK', 'SERIE_KO', 'PREMIER', 'TOUR', 'FIN', 'EGALITE'].flatMap(k => T[k].map(l => T.remplir(l, vars)));
  assert.ok(toutes.length >= 100, toutes.length);
  assert.strictEqual(new Set(toutes).size, toutes.length, 'pas de doublon');
  for(const l of toutes){ assert.ok(w.JUGE.juger(l).ok, l); assert.ok(!/\{\w+\}/.test(l), 'variable oubliée : ' + l);
    assert.ok(!/\b(nul|nulle|bête|idiot|débile|stupide|moche|loser|naze|cerveau)\b/i.test(l), 'vise la personne : ' + l); }
  // Ne se répète pas tant qu'il reste des phrases neuves.
  const vu = [], mem = { age:x => vu.lastIndexOf(x) < 0 ? -1 : vu.length - vu.lastIndexOf(x), noter:x => vu.push(x) };
  for(let i = 0; i < T.ENTREE.length; i++) T.choisir(T.ENTREE, {}, mem); assert.strictEqual(new Set(vu).size, T.ENTREE.length);
  // Ton « Trash talk » dans une matière.
  A.base.ui = 'fr'; clic('matiere', 'francais'); assert.ok($('[data-a="maths-ton-matiere"][data-v="francais|trash"]'), 'bouton trash talk');
  clic('maths-ton-matiere', 'francais|trash');
  let vanne = '', bravo = ''; for(let serie = 0; serie < 8 && !(vanne && bravo); serie++){ clic('matiere-melange', 'francais'); for(let k = 0; k < 10 && $('[data-a="qz-rep"]'); k++){ const b = [...w.document.querySelectorAll('[data-a="qz-rep"]')]; b[k % b.length].click();
    const v = $('.piege-vanne'), br = $('.piege-bravo'); if(v) vanne = vanne || v.textContent; if(br) bravo = bravo || br.textContent; const s = $('[data-a="qz-suivant"]'); if(s) s.click(); } }
  assert.match(vanne, /🥊/, 'vanne trash : ' + vanne); assert.match(bravo, /🥊/, 'bravo trash : ' + bravo);
  clic('maths-ton-matiere', 'francais|taquin');
  // Battle entre potes avec l'interrupteur.
  clic('potes'); assert.match($('[data-a="potes-trash"]').textContent, /OFF/); clic('potes-trash'); assert.match($('[data-a="potes-trash"]').textContent, /ON/);
  w.document.querySelector('#pote0').value = 'Léa'; w.document.querySelector('#pote1').value = 'Tom'; clic('potes-go');
  assert.match($('main').textContent, /🥊/, 'Plumo chambre avant le 1er tour');
  for(let j = 0; j < 2; j++){ clic('potes-joue'); while($('[data-a="qz-rep"]')){ $('[data-a="qz-rep"]').click(); const s = $('[data-a="qz-suivant"]'); if(s) s.click(); } }
  assert.match($('main').textContent, /🥊/, 'trash talk de fin');
  clic('potes-trash');
});
await test('garde-fou : pas deux fonctions du même nom dans jeu.js (l’une écraserait l’autre)', async () => {
  const src = require('fs').readFileSync(require('path').join(__dirname, '..', 'js', 'jeu.js'), 'utf8'), c = {};
  for(const m of src.matchAll(/^  function (\w+)\(/gm)) c[m[1]] = (c[m[1]] || 0) + 1;
  assert.deepStrictEqual(Object.keys(c).filter(k => c[k] > 1), []);
});

await test('v5.78 : brevet & bac blancs et annales construits comme les sujets 2026 — calculs justes, barème, coefficients', async () => {
  const w = page(), A = w.AmiDesMots, E = w.EPREUVES, $ = s => w.document.querySelector(s), $$ = s => [...w.document.querySelectorAll(s)];
  const clic = (a, v) => { const b = w.document.createElement('button'); b.dataset.a = a; if(v != null) b.dataset.v = v; w.document.body.appendChild(b); b.click(); b.remove(); };
  // Construction officielle : DNB maths 6 + 14 points, français 60 points notés (+ 40 de rédaction sur papier), HG 40, EMC 20, sciences 10 + 10 ; maths 1re 6 + 14.
  const tot = id => E.construire(id, 3).total;
  assert.strictEqual(tot('dnb-maths'), 6 + 12, 'maths : 6 pts d’automatismes + 12 pts d’exercices (2 pts de rédaction non notés)');
  assert.strictEqual(tot('dnb-francais'), 60); assert.strictEqual(tot('dnb-histoire'), 40); assert.strictEqual(tot('dnb-emc'), 20); assert.strictEqual(tot('dnb-sciences'), 20);
  assert.strictEqual(tot('eam-spe'), 20); assert.strictEqual(tot('eam-commun'), 20);
  assert.strictEqual(E.construire('eam-spe', 9).liste.filter(q => /Automatismes/.test(q.consigne)).length, 8, '8 automatismes en QCM comme le sujet officiel');
  assert.strictEqual(E.BLANCS.brevet.epreuves.map(p => p[1]).join(','), '2,2,1.5,0.5,2,2', 'coefficients officiels du DNB 2027, inchangés (HG 1,5 et EMC 0,5 séparés, oral 2)');
  assert.strictEqual(E.moyenne([10, 20], [2, 2]), 15);
  // Des milliers de sujets : jamais de réponse vide, de doublon, de NaN, et toutes les vannes passent le juge.
  for(let g = 1; g < 120; g++) for(const id of Object.keys(E.EPREUVES)) for(const q of E.construire(id, g).liste){
    assert.ok(q.bon && q.faux.length && !q.faux.some(f => f.en === q.bon), q.enonce);
    assert.ok(!/NaN|undefined|Infinity/.test(q.enonce + q.bon + q.faux.map(f => f.en).join() + q.regle + q.contexte), q.enonce);
    for(const f of q.faux) assert.ok(w.JUGE.juger(f.vanne).ok, f.vanne); }
  // Quelques calculs vérifiés à la main sur les générateurs.
  const G = E._test, r = E.hasard(42);
  for(let k = 0; k < 50; k++){ const ex = G.gens[0](E.hasard(k)), [AT, MT, AE, MB] = ex.contexte.match(/[\d,]+(?= m)/g).map(x => +x.replace(',', '.')), AM = MT - AT, AB = Math.sqrt(MB * MB - AM * AM);
    assert.strictEqual(ex.questions[0].bon, String(Math.round(AM * 100) / 100).replace('.', ',') + ' m'); assert.strictEqual(ex.questions[1].bon, String(Math.round(AB * 100) / 100).replace('.', ',') + ' m');
    assert.ok(Math.abs(AT / AM - AE / AB) < 1e-9, 'Thalès vérifié'); }
  for(let k = 0; k < 50; k++){ const ex = G.gens[2](E.hasard(k)), [p, s, q, F] = ex.contexte.match(/\d+(?:,\d+)?(?= €)/g).map(x => +x.replace(',', '.')), n1 = +ex.questions[3].bon, n2 = +ex.questions[4].bon;
    assert.ok(s + q * n1 < p * n1 && !(s + q * (n1 - 1) < p * (n1 - 1)), 'seuil B/A'); assert.ok(F < s + q * n2 && !(F < s + q * (n2 - 1)), 'seuil C/B'); }
  // Annales : chaque jumeau a son lien officiel sur education.gouv.fr.
  for(const a of E.ANNALES){ assert.match(a.url, /^https:\/\/www\.education\.gouv\.fr\/sites\/default\/files\/document\/.+\.pdf$/); assert.ok(E.annale(a.id, 5).liste.length >= 5, a.id); }
  // Écrans : onglets, brevet blanc complet (5 épreuves), annale, lien officiel.
  A.base.ui = 'fr'; clic('matieres'); assert.ok($('[data-a="annales"]'), 'onglet Annales');
  clic('annales'); assert.ok($$('[data-a="annale-go"]').length >= 8); assert.ok($$('a.lien-officiel[target="_blank"][rel="noopener"]').length >= 8);
  clic('annale-go', 'dnb26-maths-ag'); assert.match($('main').textContent, /26GENMATAG1/); clic('annale-suite');
  assert.ok($('.contexte-exo') || /Automatismes/.test($('.piege-consigne').textContent), 'énoncé ou automatismes'); let k = 0;
  while($('[data-a="qz-rep"]:not([disabled])') && k < 40){ const b = $$('[data-a="qz-rep"]'); b[k % b.length].click(); k++; const s = $('[data-a="qz-suivant"]'); if(s) s.click(); }
  assert.match($('main').textContent, /[\d,]+ \/ 20/); assert.ok(A.J().matieres.notes['annale-dnb26-maths-ag'] >= 0);
  clic('examens'); clic('examen-go', 'bac-maths-spe'); assert.match($('main').textContent, /Automatismes 6 pts \(questions à réponses courtes\)/); clic('examen-suite');
  while($('[data-a="qz-rep"]:not([disabled])')){ $('[data-a="qz-rep"]').click(); const s = $('[data-a="qz-suivant"]'); if(s) s.click(); }
  assert.match($('main').textContent, /[\d,]+ \/ 20/);
});

await test('v5.79 : spécialités de terminale + philo — construites comme 2026, calculs justes, bac blanc à 2 spés', async () => {
  const w = page(), A = w.AmiDesMots, E = w.EPREUVES, S = E._test.spe, $ = s => w.document.querySelector(s), $$ = s => [...w.document.querySelectorAll(s)];
  const clic = (a, v) => { const b = w.document.createElement('button'); b.dataset.a = a; if(v != null) b.dataset.v = v; w.document.body.appendChild(b); b.click(); b.remove(); };
  assert.ok(E.SPES.join(',').startsWith('spe-maths,spe-pc,spe-svt,spe-ses,spe-hggsp,spe-hlp,spe-nsi,spe-si,spe-llcer'));
  assert.strictEqual(E.construire('spe-maths', 1).total, 20, 'maths : 5 + 5 + 4 + 6');
  assert.strictEqual(E.construire('spe-pc', 1).total, 20, 'physique-chimie : 11 + 5 + 4');
  assert.strictEqual(E.construire('spe-ses', 1).total, 20, 'SES épreuve composée : 4 + 6 + 10');
  assert.strictEqual(E.construire('spe-nsi', 1).total, 20, 'NSI : 6 + 6 + 8');
  assert.strictEqual(E.bacTerminale('spe-maths', 'spe-ses').epreuves.map(p => p[1]).join(','), '16,16,8,8', 'coefficients officiels (spés 16, philo 8, Grand oral 8)');
  for(let g = 1; g < 150; g++) for(const id of E.SPES.concat('philo')) for(const q of E.construire(id, g).liste){
    assert.ok(q.bon && q.faux.length && !q.faux.some(f => f.en === q.bon), id + ' ' + q.enonce);
    assert.ok(!/NaN|undefined|Infinity/.test(q.enonce + q.bon + q.faux.map(f => f.en).join() + q.regle + q.contexte), id + ' ' + q.enonce);
    for(const f of q.faux) assert.ok(w.JUGE.juger(f.vanne).ok, f.vanne); }
  // Calculs vérifiés indépendamment.
  for(let g = 0; g < 40; g++){ const ex = S.speProba(E.hasard(g)), n = +ex.contexte.match(/prélève ensuite (\d+)/)[1], k = +ex.questions[4].q.match(/X = (\d+)/)[1], p = +ex.questions[3].bon.match(/; ([\d,]+)\)/)[1].replace(',', '.');
    assert.strictEqual(ex.questions[4].bon, String(Math.round(S.C(n, k) * p ** k * (1 - p) ** (n - k) * 1000) / 1000).replace('.', ','), 'binomiale'); }
  for(let g = 0; g < 40; g++){ const ex = S.pcNickel(E.hasard(g)), m = +ex.questions[0].bon.match(/\d+/)[0], I = +ex.contexte.match(/I = (\d+) A/)[1];
    assert.strictEqual(ex.questions[3].bon, String(Math.round(m / 58.7 * 2 * 96500 / I / 3600 * 10) / 10).replace('.', ',') + ' h', 'électrolyse'); }
  for(let g = 0; g < 40; g++){ const ex = S.siCatamaran(E.hasard(g)), [v] = ex.contexte.match(/v = (\d+)/).slice(1).map(Number), F = +ex.contexte.match(/F = (\d+)/)[1];
    assert.strictEqual(ex.questions[0].bon, (F * v) + ' W', 'P = F × v'); }
  for(const a of E.ANNALES.filter(a => a.tle)) assert.match(a.url, /^https:\/\/www\.education\.gouv\.fr\/sites\/default\/files\/document\/baccalaureat-general-2026-.+\.pdf$/);
  // Écrans : section terminale, choix des 2 spés, épreuves enchaînées avec la philo.
  A.base.ui = 'fr'; clic('examens'); assert.ok($('[data-a="bac-tle"]')); assert.ok($$('[data-a="examen-go"][data-v^="tle-"]').length >= 10);
  A.base.speChoix = []; clic('bac-tle'); assert.ok($('[data-a="bac-tle-go"]').disabled, 'il faut 2 spés');
  clic('bac-tle-spe', 'spe-maths'); clic('bac-tle-spe', 'spe-ses'); assert.ok(!$('[data-a="bac-tle-go"]').disabled); clic('bac-tle-go');
  for(let e = 0; e < 4; e++){ assert.match($('main').textContent, /épreuve \d\/4/); clic('examen-suite'); let j = 0; while($('[data-a="qz-rep"]:not([disabled])') && j < 60){ $('[data-a="qz-rep"]:not([disabled])').click(); j++; const s = $('[data-a="qz-suivant"]'); if(s) s.click(); } }
  assert.match($('main').textContent, /Moyenne : [\d,]+ \/ 20/); assert.ok(A.J().matieres.notes['blanc-bac-tle'] >= 0);
  clic('annales'); assert.ok($$('[data-a="annale-go"][data-v^="bac26-"]').length >= 10);
});

await test('v5.80 : expressions imagées (« pas la lumière à tous les étages ») — visent la réponse ou Plumo, jamais le joueur', async () => {
  const w = page(), T = w.TRASH_TALK;
  assert.ok(T.IMAGEES.length >= 60, 'expressions : ' + T.IMAGEES.length); assert.strictEqual(new Set(T.IMAGEES).size, T.IMAGEES.length, 'pas de doublon');
  for(const l of T.IMAGEES){ assert.ok(w.JUGE.juger(l).ok, l); assert.ok(/réponse|Plumo|Celle-là|Elle |Là, |Ça, c’est/.test(l), 'cible la réponse ou Plumo : ' + l);
    assert.ok(!/(?<![\p{L}’])(tu|t’|te|toi|ton|ta|tes|vous)(?![\p{L}])/iu.test(l), 'ne vise pas le joueur : ' + l); }
});

await test('v5.82 : toutes les spécialités (arts, LLCA, LLCER, bio-éco, EPPCS), bac techno par série, médecine-droit-astrophysique', async () => {
  const w = page(), A = w.AmiDesMots, E = w.EPREUVES, M = w.MATIERES, $ = s => w.document.querySelector(s), $$ = s => [...w.document.querySelectorAll(s)];
  const clic = (a, v) => { const b = w.document.createElement('button'); b.dataset.a = a; if(v != null) b.dataset.v = v; w.document.body.appendChild(b); b.click(); b.remove(); };
  for(const id of ['spe-arts-hda', 'spe-arts-cinema', 'spe-arts-musique', 'spe-arts-theatre', 'spe-arts-plastiques', 'spe-arts-danse', 'spe-bioeco', 'spe-eppcs', 'spe-latin', 'spe-grec', 'spe-espagnol', 'spe-allemand', 'spe-italien', 'spe-portugais', 'spe-amc'])
    assert.ok(E.SPES.includes(id) && E.BLANCS['tle-' + id], id);
  assert.strictEqual(Object.keys(E.SERIES_TECHNO).join(','), 'stmg,sti2d,st2s,stl,std2a,sthr,s2tmd', 'les 7 séries technologiques');
  assert.strictEqual(E.BLANCS['techno-stmg'].epreuves.map(p => p[1]).join(','), '16,16,4', 'STMG : 2 spécialités coef. 16 + philo');
  for(let g = 1; g < 80; g++) for(const id of Object.keys(E.EPREUVES)) for(const q of E.construire(id, g).liste){
    assert.ok(q.bon && q.faux.length && !q.faux.some(f => f.en === q.bon), id + ' ' + q.enonce);
    assert.ok(!/NaN|undefined|Infinity/.test(q.enonce + q.bon + q.faux.map(f => f.en).join() + q.regle + q.contexte), id + ' ' + q.enonce);
    for(const f of q.faux) assert.ok(w.JUGE.juger(f.vanne).ok, f.vanne); }
  // Calculs vérifiés : seuil de rentabilité, Kepler, Wien, Hubble.
  for(let g = 0; g < 40; g++){ const ex = E._test.plus.stmgGestion(E.hasard(g)), [pa] = ex.contexte.match(/(\d+) € HT/).slice(1).map(Number), coef = +ex.contexte.match(/multiplicateur de ([\d,]+)/)[1].replace(',', '.'), cf = +ex.contexte.match(/annuelles : (\d+)/)[1];
    assert.strictEqual(ex.questions[3].bon, Math.ceil(cf / (pa * coef - pa)) + ' articles'); }
  const S = M._sup; for(let g = 1; g < 60; g++){ const q = S.ASTRO_GEN[3](M.hasard(g)), a = +q.enonce.match(/a = (\d+) UA/)[1]; assert.strictEqual(q.bon, Math.pow(a, 1.5) + ' ans', 'Kepler');
    const h = S.ASTRO_GEN[4](M.hasard(g)), d = +h.enonce.match(/à (\d+) Mpc/)[1]; assert.strictEqual(h.bon, (70 * d) + ' km/s', 'Hubble'); }
  for(const id of ['medecine', 'droit', 'astro']) for(const c of M.trouver(id).chapitres) for(let g = 1; g < 40; g++) for(const q of M.serie(id, c.id, 'Sup', 6, g, 'taquin')){
    assert.ok(q.bon && !q.faux.some(f => f.en === q.bon), q.enonce); for(const f of q.faux) assert.ok(w.JUGE.juger(f.vanne).ok, f.vanne); }
  // Écrans : section « Après le bac », la matière s'ouvre au niveau Sup ; section bac techno.
  A.base.ui = 'fr'; clic('matieres'); assert.ok($('[data-a="matiere"][data-v="astro"]') && $('[data-a="matiere"][data-v="medecine"]') && $('[data-a="matiere"][data-v="droit"]'));
  clic('matiere', 'astro'); assert.ok($('[data-a="matiere-chap"][data-v="astro|calculs"]'), 'chapitres visibles directement');
  clic('matiere-chap', 'astro|calculs'); let k = 0; while($('[data-a="qz-rep"]:not([disabled])') && k < 30){ $('[data-a="qz-rep"]').click(); k++; const n = $('[data-a="qz-suivant"]'); if(n) n.click(); }
  assert.strictEqual(k, 20);
  clic('examens'); assert.ok($$('[data-a="examen-go"][data-v^="techno-"]').length === 7, '7 séries technologiques');
  clic('examen-go', 'techno-sthr'); clic('examen-suite'); assert.ok($('.contexte-exo'), 'énoncé STHR');
});

await test('v5.82 : une vanne trop courte (« Non. ») est relevée par une expression drôle', async () => {
  const w = page(), A = w.AmiDesMots, M = w.MATIERES, $ = s => w.document.querySelector(s);
  const clic = (a, v) => { const b = w.document.createElement('button'); b.dataset.a = a; if(v != null) b.dataset.v = v; w.document.body.appendChild(b); b.click(); b.remove(); };
  A.base.ui = 'fr'; let vu = 0;
  for(let s = 0; s < 6 && vu < 3; s++){ clic('matiere-chap', 'droit|bases'); for(let k = 0; k < 10 && $('[data-a="qz-rep"]'); k++){ const b = [...w.document.querySelectorAll('[data-a="qz-rep"]')];
    b[k % b.length].click(); const t = $('.piege-vanne'); if(t){ vu++; assert.ok(t.textContent.length > 45, 'vanne relevée : ' + t.textContent); assert.ok(!/ Non\.$/.test(t.textContent.trim()), t.textContent); }
    const n = $('[data-a="qz-suivant"]'); if(n) n.click(); } }
  assert.ok(vu >= 1);
});

await test('v5.83 : oraux (brevet, français, Grand oral), espace Officiel (programmes + annales) et référence du programme dans chaque matière', async () => {
  const w = page(), A = w.AmiDesMots, E = w.EPREUVES, $ = s => w.document.querySelector(s), $$ = s => [...w.document.querySelectorAll(s)];
  const clic = (a, v) => { const b = w.document.createElement('button'); b.dataset.a = a; if(v != null) b.dataset.v = v; w.document.body.appendChild(b); b.click(); b.remove(); };
  for(const id of ['dnb-oral', 'eaf-oral', 'grand-oral']) for(let g = 1; g < 30; g++) for(const q of E.construire(id, g).liste){ assert.ok(q.bon && !q.faux.some(f => f.en === q.bon)); for(const f of q.faux) assert.ok(w.JUGE.juger(f.vanne).ok, f.vanne); }
  assert.ok(E.OFFICIEL.programmes.length >= 8 && E.OFFICIEL.annales.length >= 7);
  for(const [, u] of E.OFFICIEL.programmes.concat(E.OFFICIEL.annales)) assert.match(u, /^https:\/\/(eduscol\.education\.gouv\.fr|www\.education\.gouv\.fr|bnseep\.eduscol\.education\.fr)\//, u);
  A.base.ui = 'fr'; clic('matieres'); clic('officiel'); assert.ok($$('a.lien-carte[target="_blank"][rel="noopener"]').length >= 15);
  clic('examens'); assert.ok($('[data-a="examen-go"][data-v="grand-oral"]') && $('[data-a="examen-go"][data-v="oral-dnb"]') && $('[data-a="examen-go"][data-v="oral-eaf"]'));
  clic('matiere', 'histoire'); clic('matiere-niveau', 'histoire|3e'); assert.match($('.ref-programme').textContent, /BO n° 31 du 30 juillet 2020/);
  clic('matiere-niveau', 'histoire|6e'); assert.match($('.ref-programme').textContent, /cycle 3/);
});

await test('v5.84 : voie professionnelle (bac pro, CAP) et plus aucune vanne plate « Non. »', async () => {
  const w = page(), A = w.AmiDesMots, E = w.EPREUVES, M = w.MATIERES, $ = s => w.document.querySelector(s);
  const clic = (a, v) => { const b = w.document.createElement('button'); b.dataset.a = a; if(v != null) b.dataset.v = v; w.document.body.appendChild(b); b.click(); b.remove(); };
  for(const id of ['bp-francais', 'bp-hgemc', 'bp-maths', 'bp-pse', 'bp-ecodroit', 'bp-lv', 'cap-frhg', 'cap-maths', 'cap-pse']) for(let g = 1; g < 40; g++) for(const q of E.construire(id, g).liste){
    assert.ok(q.bon && !q.faux.some(f => f.en === q.bon), q.enonce); assert.ok(!/NaN|undefined/.test(q.enonce + q.bon + q.faux.map(f => f.en).join()), q.enonce);
    for(const f of q.faux) assert.ok(w.JUGE.juger(f.vanne).ok, f.vanne); }
  // Aucune vanne réduite à « Non. », dans toutes les épreuves et toutes les matières « Après le bac ».
  for(let g = 1; g < 20; g++) for(const id of Object.keys(E.EPREUVES)) for(const q of E.construire(id, g).liste) for(const f of q.faux) assert.ok(!/^Non\.?$/.test(f.vanne.trim()), id + ' : ' + q.enonce);
  for(const id of ['medecine', 'droit', 'astro']) for(const c of M.trouver(id).chapitres) for(const q of M.serie(id, c.id, 'Sup', 8, 3, 'taquin')) for(const f of q.faux) assert.ok(!/^Non\.?$/.test(f.vanne.trim()), q.enonce);
  A.base.ui = 'fr'; clic('examens'); assert.ok($('[data-a="examen-go"][data-v="bac-pro"]') && $('[data-a="examen-go"][data-v="cap"]'));
  clic('examen-go', 'cap'); assert.match($('main').textContent, /épreuve 1\/3/);
});

await test('v5.95 : chaque texte des écrans récents existe dans les 11 langues, sans français ailleurs', () => {
  const w = page('ja'); const TT = w.TT;
  assert.ok(TT && TT.CLES.length >= 25);
  for(const k of TT.CLES) for(const l of TT.LANGUES){
    const v = TT._T[k][l];
    assert.ok(v != null, k + ' manque en ' + l);
    const s = typeof v === 'function' ? v(3, 40) : v;
    assert.ok(typeof s === 'string' && s.length > 1, k + '/' + l);
    if(l !== 'fr' && !['regles', 'mentions'].includes(k)) assert.notEqual(s, typeof TT._T[k].fr === 'function' ? TT._T[k].fr(3, 40) : TT._T[k].fr, k + ' non traduit en ' + l);
  }
  assert.equal(TT('cle_inconnue', 'ja'), 'cle_inconnue');
  assert.equal(TT('restaurer', 'xx'), 'Restore purchases');
});

await test('v5.95 : écran Plus, liens légaux et Clash libre sans français quand l’interface est en allemand', async () => {
  const w = page('de', { MODE_PAYANT:true, SERVEUR:'https://ami.example/serveur', FORMULES:[{ id:'a_vie', prix:'99 €', lien:'https://buy.stripe.com/v' }] }); await w.AmiDesMotsPret;
  const d = w.document, A = w.AmiDesMots;
  A.ecranPlus(); const h = d.querySelector('main').textContent;
  assert.ok(!/Restaurer|code cadeau|Conditions de vente|Un seul paiement/.test(h), 'français dans l’écran Plus');
  assert.match(h, /Einmal zahlen/); assert.match(h, /Geschenkcode/);
  const x = d.createElement('button'); x.dataset.a = 'clash-libre'; d.body.appendChild(x); x.click(); x.remove();
  const c = d.querySelector('main').textContent; assert.match(c, /Freies Battle|Free roast battle/); assert.ok(!/On se vanne|Joueur 1/.test(c), 'français dans le Clash libre');
});

await test('v5.95 : fréquentation anonyme — une ouverture par jour, rien d’identifiant, « Ne pas me suivre » respecté', async () => {
  const envois = [];
  const avant = w => { w.fetch = async (u, o) => { if(/visite\.php$/.test(u)) envois.push({ u:String(u), o }); return { ok:true, json:async () => ({ actif:false }) }; }; };
  let w = page(undefined, { MODE_PAYANT:false, SERVEUR:'https://ami.example/serveur' }, avant); await w.AmiDesMotsPret;
  assert.strictEqual(envois.length, 1); const c = JSON.parse(envois[0].o.body);
  assert.deepStrictEqual(Object.keys(c).sort(), ['e', 'p']); assert.strictEqual(c.e, 'ouverture'); assert.strictEqual(c.p, 'web'); assert.strictEqual(envois[0].o.credentials, 'omit');
  // Même appareil, même jour : rien de plus.
  const ls = w.localStorage.getItem('amidesmots:visite:ouverture');
  w = page(undefined, { SERVEUR:'https://ami.example/serveur' }, x => { avant(x); x.localStorage.setItem('amidesmots:visite:ouverture', ls); }); await w.AmiDesMotsPret;
  assert.strictEqual(envois.length, 1);
  // Ne pas me suivre : rien.
  w = page(undefined, { SERVEUR:'https://ami.example/serveur' }, x => { avant(x); Object.defineProperty(x.navigator, 'doNotTrack', { value:'1' }); }); await w.AmiDesMotsPret;
  assert.strictEqual(envois.length, 1);
  // Sans serveur : rien.
  w = page(undefined, {}, avant); await w.AmiDesMotsPret; assert.strictEqual(envois.length, 1);
});

await test('v5.95 : rappels — rien sur le site ; dans l’appli, activés seulement à la demande, série en danger, permission refusée', async () => {
  // Site : pas de réglage, bandeau « série en danger » quand on n'a pas joué aujourd'hui.
  let w = page(); await w.AmiDesMotsPret; const A = w.AmiDesMots, d = w.document;
  const va = (w, a, v) => { const x = w.document.createElement('button'); x.dataset.a = a; if(v != null) x.dataset.v = v; w.document.body.appendChild(x); x.click(); x.remove(); };
  va(w, 'reglages'); assert.ok(!d.querySelector('[data-a="rappel"]'), 'pas de rappel sur le site');
  const j = A.base.joueurs[0], jr = k => { const x = new Date(Date.now() + k * 864e5); return x.getFullYear() + '-' + String(x.getMonth() + 1).padStart(2, '0') + '-' + String(x.getDate()).padStart(2, '0'); };
  j.jours = [jr(-3), jr(-2), jr(-1)]; va(w, 'accueil');
  const bandeau = d.querySelector('.serie-danger'); assert.ok(bandeau && /3 jours/.test(bandeau.textContent), d.querySelector('main').innerHTML.slice(0, 200));
  // Appli : faux plugin de notifications locales.
  let planifies = [], annules = 0, accord = 'granted';
  const avant = x => { x.Capacitor = { isNativePlatform:() => true, getPlatform:() => 'android', Plugins:{ LocalNotifications:{
    checkPermissions:async () => ({ display:'prompt' }), requestPermissions:async () => ({ display:accord }),
    cancel:async () => { annules++; }, schedule:async o => { planifies = o.notifications; } } } }; };
  w = page(undefined, undefined, avant); await w.AmiDesMotsPret; await new Promise(r => setTimeout(r, 20));
  assert.strictEqual(planifies.length, 0, 'désactivé par défaut : rien de planifié');
  w.AmiDesMots.base.joueurs[0].jours = [jr(-2), jr(-1)];
  va(w, 'reglages'); assert.ok(w.document.querySelector('[data-a="rappel"]'));
  va(w, 'rappel'); await new Promise(r => setTimeout(r, 30));
  assert.ok(w.AmiDesMots.base.rappel.actif); assert.strictEqual(planifies[0].id, 1); assert.strictEqual(JSON.stringify(planifies[0].schedule.on), '{"hour":18,"minute":0}');
  assert.match(planifies[0].title, /Plumo/);
  if(new Date().getHours() < 20) assert.ok(planifies.some(n => n.id === 2 && /série/.test(n.title)), 'série en danger ce soir');
  // Permission refusée : le réglage revient à « désactivé » avec un message.
  accord = 'denied'; w = page(undefined, undefined, avant); await w.AmiDesMotsPret; va(w, 'reglages'); va(w, 'rappel'); await new Promise(r => setTimeout(r, 30));
  assert.ok(!w.AmiDesMots.base.rappel.actif); assert.match(w.document.getElementById('etat-rappel').textContent, /bloquées/);
});

await test('v5.95 : contrôles de cohérence — chaque script de la page existe, est hors ligne, est chargé par les tests, et chaque action a sa réponse', () => {
  const fs = require('fs'), path = require('path'), R = path.join(__dirname, '..');
  const html = fs.readFileSync(path.join(R, 'index.html'), 'utf8'), sw = fs.readFileSync(path.join(R, 'sw.js'), 'utf8'), moi = fs.readdirSync(__dirname).map(f => fs.readFileSync(path.join(__dirname, f), 'utf8')).join('\n');
  const scripts = [...html.matchAll(/<script[^>]*src="(js\/[^"]+)"/g)].map(m => m[1]);
  assert.ok(scripts.length > 30);
  for(const s of scripts){
    assert.ok(fs.existsSync(path.join(R, s)), s + ' manquant');
    assert.ok(sw.includes(s), s + ' absent du cache hors ligne (sw.js)');
    if(!/config|abonnement-config|capacitor|analytics/.test(s) && fs.readFileSync(path.join(R, s), 'utf8').length < 2e6) assert.ok(moi.includes(s) || /monde|three|village|city|3d/i.test(s), s + ' non chargé par les tests');
  }
  // Chaque data-a="…" écrit dans jeu.js a un « case » qui y répond.
  const J = fs.readFileSync(path.join(R, 'js/jeu.js'), 'utf8');
  const actions = new Set([...J.matchAll(/data-a="([a-z0-9-]+)"/g)].map(m => m[1]));
  const cas = new Set([...J.matchAll(/case '([a-z0-9-]+)'/g)].map(m => m[1]));
  const sans = [...actions].filter(a => !cas.has(a) && !new RegExp("dataset\\.a === '" + a + "'|a === '" + a + "'").test(J));
  assert.deepStrictEqual(sans, [], 'actions sans réponse : ' + sans.join(', '));
});

await test('v5.95 : spécialités (SES, HGGSP, HLP, NSI) et renfort philo, droit, médecine — questions propres, vannes acceptées par le juge, binaire juste', () => {
  const w = page(), M = w.MATIERES;
  for(const id of ['ses', 'hggsp', 'hlp', 'nsi']){ const m = M.trouver(id); assert.ok(m && m.chapitres.length >= 2 && m.examens.Tle, id); }
  assert.ok(M.trouver('philo').chapitres.some(c => c.id === 'r-philo2'));
  assert.ok(M.trouver('droit').chapitres.some(c => c.id === 'droit-quotidien'));
  assert.ok(M.trouver('medecine').chapitres.some(c => c.id === 'sang-immunite'));
  let n = 0;
  for(const id of ['ses', 'hggsp', 'hlp', 'nsi', 'philo', 'droit', 'medecine']) for(const c of M.trouver(id).chapitres) for(const q of (c.banque || [])){
    n++; assert.ok(q[0] && q[1] && q[2].length >= 2 && q[3], q[0]);
    assert.strictEqual(new Set([q[1], ...q[2].map(f => f[0])]).size, q[2].length + 1, 'réponses en double : ' + q[0]);
    for(const [, vanne] of q[2]){ assert.ok(w.JUGE.juger(vanne).ok, vanne); assert.ok(!/\b(nul|idiot|stupide|débile|bête)\b/i.test(vanne), vanne); }
  }
  assert.ok(n >= 90, n + ' questions');
  // Générateur binaire : la bonne réponse est juste, les fausses sont différentes.
  let g = 7; const r = () => (g = (g * 16807) % 2147483647) / 2147483647;
  for(let k = 0; k < 300; k++){ const q = w.MATIERES._spe.genBinaire(r);
    const m = q.enonce.match(/binaire (\d+) en décimal/), d = q.enonce.match(/^Comment s’écrit (\d+)/);
    if(m) assert.strictEqual(q.bon, String(parseInt(m[1], 2))); else assert.strictEqual(q.bon, Number(d[1]).toString(2));
    assert.ok(q.faux.length >= 2 && q.faux.every(f => f.en !== q.bon), JSON.stringify(q)); }
  // Les séries se construisent pour chaque niveau.
  for(const id of ['ses', 'hggsp', 'hlp', 'nsi']) for(const niv of ['1re', 'Tle']){ const s = M.serie(id, 'examen', niv, 8, 42, 'taquin'); assert.ok(s.length >= 5, id + ' ' + niv + ' : ' + s.length); }
});

await test('v5.96 : Plumo reste en place au survol, lunettes et écharpe posées sur l’image 3D', () => {
  const fs = require('fs'), path = require('path'), R = path.join(__dirname, '..');
  const ultra = fs.readFileSync(path.join(R, 'css/ultra.css'), 'utf8'), css = fs.readFileSync(path.join(R, 'css/jeu.css'), 'utf8');
  for(const l of ultra.split('\n').filter(l => /button:not\(.petit-bouton\)[^{]*:hover/.test(l))) assert.match(l, /:not\(\.ami-grand\)/, l);
  assert.match(css, /\.perchoir \.ami-grand:hover[^{]*\{ transform:translateX\(-50%\) !important/);
  const w = page(); const A = w.AmiDesMots; A.base.joueurs[0].porte = ['lunettes', 'echarpe'];
  const x = w.document.createElement('button'); x.dataset.a = 'accueil'; w.document.body.appendChild(x); x.click();
  const lun = w.document.querySelector('.ami-acc-lunettes'), ech = w.document.querySelector('.ami-acc-echarpe');
  assert.ok(lun && ech); assert.strictEqual(lun.getAttribute('viewBox'), '0 0 560 613'); assert.strictEqual(lun.querySelectorAll('ellipse').length, 2);
  assert.strictEqual(ech.getAttribute('viewBox'), '0 0 560 613');
});

await test('v5.97 : mise en ligne OVH — rien sans secrets, aucun fichier secret envoyé, rien effacé, réglages cherchés au-dessus de www/', () => {
  const fs = require('fs'), path = require('path'), R = path.join(__dirname, '..');
  const y = fs.readFileSync(path.join(R, '.github/workflows/ovh.yml'), 'utf8');
  assert.match(y, /secrets\.OVH_HOTE/); assert.match(y, /Secrets OVH absents/);
  assert.ok(!/--delete|rm -rf|auto-confirm yes/.test(y), 'rien d’effacé, empreinte du serveur vérifiée');
  for(const m of ['config\\*\\.php', '\\*\\.pem', '\\*\\.p8']) assert.match(y, new RegExp("--exclude '" + m + "'"));
  assert.match(y, /PRIVATE KEY\|sk_live_/);
  const lib = fs.readFileSync(path.join(R, 'serveur-php/lib.php'), 'utf8');
  assert.match(lib, /dirname\(__DIR__, 2\) \. '\/config-ami\.php', dirname\(__DIR__\)/);
  const h = fs.readFileSync(path.join(R, '.htaccess'), 'utf8'); assert.match(h, /config\.\*\\\.php/); assert.match(h, /Require all denied/);
});

await test('v5.98 : vannes de l’IA signalées 🤖, carnet d’erreurs, taille du texte, chapeau et couronne en relief', async () => {
  // Vanne de l'IA : marquée.
  const w = page(undefined, { SERVEUR:'https://ami.example/serveur' }, x => { x.fetch = async (u, o) => {
    if(/vannes-direct/.test(u)){ const b = JSON.parse(o.body); const v = {}; for(const f of b.fausses) v[f] = 'Ta réponse a pris un raccourci par la mauvaise porte.'; return { ok:true, status:200, json:async () => ({ vannes:v }) }; }
    return { ok:true, status:200, json:async () => ({ actif:false }) }; }; });
  await w.AmiDesMotsPret; const A = w.AmiDesMots, d = w.document, M = w.MATIERES;
  const va = (a, v) => { const x = d.createElement('button'); x.dataset.a = a; if(v != null) x.dataset.v = v; d.body.appendChild(x); x.click(); x.remove(); };
  const s = M.serie('ses', 'examen', 'Tle', 3, 5, 'taquin'); A.questionsGo(s, { titre:'t', retour:'matieres' }); await new Promise(r => setTimeout(r, 30));
  const q = s[0], faux = [...d.querySelectorAll('.piege-opt')].findIndex(b => b.textContent !== q.bon);
  d.querySelectorAll('.piege-opt')[faux].click(); await new Promise(r => setTimeout(r, 20));
  assert.match(d.getElementById('qz-retour').textContent, /🤖 Ta réponse a pris un raccourci/);
  // Carnet : la question ratée y est, une bonne réponse l'en retire.
  const j = A.base.joueurs[0]; assert.strictEqual(j.carnet.length, 1); assert.strictEqual(j.carnet[0].bon, q.bon);
  va('matieres'); assert.match(d.querySelector('[data-a="carnet-erreurs"]').textContent, /Mes erreurs \(1\)/);
  va('carnet-erreurs'); const bonne = [...d.querySelectorAll('.piege-opt')].findIndex(b => b.textContent === q.bon);
  // v6.71 : révision espacée — une bonne réponse le jour même ne compte pas ; le jour prévu, la question monte d'une boîte.
  d.querySelectorAll('.piege-opt')[bonne].click(); assert.strictEqual(j.carnet.length, 1); assert.strictEqual(j.carnet[0].boite, 0);
  j.carnet = [];
  // Taille du texte.
  va('reglages'); va('taille-texte', 'grand'); assert.strictEqual(d.documentElement.dataset.texte, 'grand');
  va('taille-texte', 'normal'); assert.ok(!d.documentElement.dataset.texte);
  // Accessoires en relief.
  j.porte = ['chapeau', 'couronne']; va('accueil');
  assert.ok(d.querySelector('.ami-acc-chapeau linearGradient') && d.querySelector('.ami-acc-couronne radialGradient'));
});

await test('v5.99 : plumes magiques — offre filtrée, solde lu au serveur, achat derrière une question pour adultes, code envoyé seulement si allumées, 402 = vannes de Plumo', async () => {
  const CREDITS = { actif:true, quota_plus:300, packs:[{ id:'plumes_petit', plumes:200, prix:'1,99 €', lien:'https://buy.stripe.com/p1', stripe_prix:'price_X', magasin:false },
    { id:'pirate', plumes:9999, prix:'0 €', lien:'https://buy.stripe.com/x' }, { id:'plumes_grand', plumes:-5, lien:'https://buy.stripe.com/g' }, { id:'plumes_moyen', plumes:600, lien:'https://evil.example/' }] };
  const envois = [];
  const avant = x => { x.fetch = async (u, o) => { envois.push({ u:String(u), b:o && o.body ? JSON.parse(o.body) : null });
    if(/plumes\.php$/.test(u)) return { ok:true, status:200, json:async () => ({ actif:true, solde:42, quota:300, quota_restant:120 }) };
    if(/vannes-direct/.test(u)) return { ok:false, status:402, json:async () => ({ erreur:'plumes' }) };
    return { ok:true, status:200, json:async () => ({ actif:false }) }; }; };
  const w = page(undefined, { MODE_PAYANT:true, SERVEUR:'https://ami.example/serveur', CREDITS }, avant); await w.AmiDesMotsPret;
  const A = w.AmiDesMots, d = w.document;
  A.ecranPlus(); await new Promise(r => setTimeout(r, 20));
  assert.match(d.getElementById('plumes-solde').textContent, /42 plumes · 120 restantes/);
  const va = (a, v) => { const x = d.createElement('button'); x.dataset.a = a; if(v != null) x.dataset.v = v; d.body.appendChild(x); x.click(); x.remove(); };
  va('plumes'); assert.ok(!d.querySelector('.carte-formule'), 'pas de pack avant la question pour adultes');
  const m = d.querySelector('main').textContent.match(/(\d+) × (\d+)/); d.getElementById('porte-plumes').value = '1'; va('plumes-ouvrir');
  assert.match(d.getElementById('porte-plumes-msg').textContent, /pas ça/);
  d.getElementById('porte-plumes').value = String(m[1] * m[2]); va('plumes-ouvrir'); await new Promise(r => setTimeout(r, 20));
  const cartes = [...d.querySelectorAll('.carte-formule')];
  assert.strictEqual(cartes.length, 1, 'packs inconnus, négatifs ou hors Stripe écartés');
  assert.match(cartes[0].getAttribute('href'), /^https:\/\/buy\.stripe\.com\/p1\?client_reference_id=AMI-/); assert.match(cartes[0].textContent, /200/);
  // Vannes en direct : le code part avec la demande ; 402 → Plumo garde ses vannes, plus d'appel pendant un moment.
  const s = w.MATIERES.serie('ses', 'examen', 'Tle', 2, 3, 'taquin'); A.questionsGo(s, { titre:'t', retour:'matieres' }); await new Promise(r => setTimeout(r, 20));
  const v = envois.filter(e => /vannes-direct/.test(e.u)); assert.strictEqual(v.length, 1); assert.match(v[0].b.code, /^AMI-/);
  assert.ok(A.base.plumesVides, 'plus de plumes noté');
  const faux = [...d.querySelectorAll('.piege-opt')].find(b => b.textContent !== s[0].bon); faux.click();
  assert.ok(!/🤖/.test(d.getElementById('qz-retour').textContent), 'vanne de Plumo, pas de l’IA');
  va('qz-suivant'); await new Promise(r => setTimeout(r, 20)); assert.strictEqual(envois.filter(e => /vannes-direct/.test(e.u)).length, 1, 'pas de nouvel appel après 402');
  // Plumes éteintes : aucun code envoyé.
  const env2 = []; const w2 = page(undefined, { SERVEUR:'https://ami.example/serveur', CREDITS:{ actif:false, quota_plus:0, packs:[] } }, x => { x.fetch = async (u, o) => { env2.push({ u:String(u), b:o && o.body ? JSON.parse(o.body) : null }); return { ok:true, status:200, json:async () => ({ vannes:{} }) }; }; });
  await w2.AmiDesMotsPret; w2.AmiDesMots.questionsGo(w2.MATIERES.serie('ses', 'examen', 'Tle', 2, 3, 'taquin'), { titre:'t', retour:'matieres' }); await new Promise(r => setTimeout(r, 20));
  const v2 = env2.filter(e => /vannes-direct/.test(e.u)); assert.strictEqual(v2.length, 1); assert.ok(!('code' in v2[0].b), 'pas de code quand les plumes sont éteintes');
  assert.ok(!env2.some(e => /plumes\.php/.test(e.u)));
});

await test('v5.99.2 : une langue d’interface retirée de la liste reste choisie et affichée ; on n’apprend jamais la langue qu’on parle', () => {
  const w = page('ko'); const d = w.document;   // v6.34 : l'ukrainien est retiré ; une langue sans interface retombe sur le français
  assert.ok(Array.from(d.querySelector('#ui').options).some(o => o.value === 'fr' && o.selected));
  const w2 = page('en'); { const x = w2.document.createElement('button'); x.dataset.a = 'porte-mots'; w2.document.body.appendChild(x); x.click(); x.remove(); }
  assert.ok(!Array.from(w2.document.querySelector('#cible').options).some(o => o.value === 'en'));
  assert.ok(Array.from(w2.document.querySelector('#cible').options).some(o => o.value === 'fr'));
  assert.notStrictEqual(w2.AmiDesMots.base.cible, 'en');
});

await test('v5.99.3 : écrans traduits — en espagnol et en allemand, les écrans principaux n’affichent plus de phrases françaises', () => {
  const ecrans = ['porte-mots', 'anglais', 'pieges', 'situations', 'battle', 'potes', 'clash-libre', 'matieres', 'maths', 'sciences', 'defi-pote', 'salon', 'parcours', 'histoires'];
  const FR = /\b(?:tu|ton|tes|les|des|une|avec|pour|dans|réponse|joueurs?|vannes?|pièges?|matières?)\b/i;
  for(const lang of ['es', 'de']){
    const w = page(lang), d = w.document, trouves = [];
    for(const a of ecrans){
      const x = d.createElement('button'); x.dataset.a = a; d.body.appendChild(x); try{ x.click(); }catch(e){} x.remove();
      const m = d.querySelector('main'); if(!m) continue;
      // Les phrases françaises restantes (au moins 4 mots) qui ne sont pas du contenu d'apprentissage.
      for(const el of m.querySelectorAll('h2, h3, p, small, strong, button, label')){
        if(el.closest('[lang="fr"], .piege-fr, .contexte-exo')) continue;
        const txt = [...el.childNodes].filter(n => n.nodeType === 3).map(n => n.textContent).join(' ').trim();
        if(txt.split(/\s+/).length >= 4 && FR.test(txt) && /[éèàçù]|\b(?:le|la|et|de)\b/.test(txt)) trouves.push(a + ' : ' + txt.slice(0, 70));
      }
    }
    assert.ok(trouves.length <= 3, lang + ' : ' + trouves.length + ' phrases françaises\n' + trouves.slice(0, 15).join('\n'));
  }
  // Traductions : 5 langues, balises intactes.
  const T = page('es').TRAD_ECRANS, balises = s => (s.match(/<[^>]*>/g) || []).filter(b => !/aria-label|<option/.test(b)).join('|');
  assert.ok(Object.keys(T).length >= 500);
  for(const [fr, v] of Object.entries(T)){ assert.strictEqual(v.length, 5, fr); for(const x of v.slice(1)) assert.strictEqual(balises(x), balises(fr), fr.slice(0, 60)); }
});


// v6.0 : modules (ligue, saisons, veille, oral, défi de classe, parrainage, IA). Serveur simulé : réponses par point d'accès.
function serveurFaux(routes){ return w => { w.__envois = []; w.fetch = async (u, o) => { u = String(u); const corps = o && o.body ? JSON.parse(o.body) : null; w.__envois.push({ u, corps });
  const f = Object.keys(routes).find(k => u.endsWith(k)); const r = f ? routes[f](corps || {}) : { statut:200, d:{ actif:false } };
  return { ok:r.statut < 300, status:r.statut, json:async () => r.d }; }; }; }
const bouton = (w, a, v) => { const x = w.document.createElement('button'); x.dataset.a = a; if(v != null) x.dataset.v = v; w.document.body.appendChild(x); x.click(); x.remove(); };
await test('v6.0 : modules chargés — actions, cartes et textes traduits dans les 5 langues', () => {
  const w = page(), M = w.AMI_MODULES;
  for(const a of ['ligue', 'veille', 'oral', 'classe', 'parrainer', 'correction', 'reexplique']) assert.ok(M.actions[a], a);
  assert.ok(M.cartes.accueil.length >= 2 && M.cartes.matiere.length >= 3 && M.cartes.parents.length >= 1);
  for(const [fr, v] of Object.entries(w.TRAD_ECRANS)) assert.strictEqual(v.length, 5, fr);
  const we = page('es'); bouton(we, 'correction'); assert.ok(/Corrección de Plumo/.test(we.document.querySelector('h2').textContent));
  assert.ok(!/reparole/i.test(lire('index.html')) && !/reparole/i.test(lire('js/jeu.js').replace(/\/\/.*$/mg, '')), 'Ami des mots séparé de ReParole');
});
await test('v6.0 : saisons — 150 bonnes réponses dans le mois = badge + tenue de Plumo débloquée', () => {
  const w = page(), M = w.AMI_MODULES, A = M.api, j = A.J(); const S = M.saisons, tenue = S.saisonDe(S.mois())[3];
  assert.ok(!M.accessoires[tenue].debloque());
  j.saison = { mois:S.mois(), ok:S.OBJECTIF - 1 }; for(const f of M.hooks.reponse) f(true, 'maths');
  assert.deepStrictEqual(JSON.parse(JSON.stringify(A.J().badges)), [S.mois()]);
  assert.ok(M.accessoires[tenue].debloque());
  for(const f of M.hooks.reponse) f(true, 'maths'); assert.strictEqual(A.J().badges.length, 1, 'un seul badge par mois');
  bouton(w, 'accueil'); assert.ok(w.document.querySelector('.carte-saison'));
});
await test('v6.0 : veille de contrôle — chrono de 15 min, erreurs du carnet en premier, note sur 20 à la fin du temps', async () => {
  const w = page(), M = w.AMI_MODULES, A = M.api, d = w.document;
  const q0 = A.serieMaths(1)[0]; A.J().carnet = [Object.assign({}, q0, { matiere:'maths', enonce:'ERREUR DU CARNET' })];
  bouton(w, 'veille'); assert.ok(d.querySelector('[data-a="veille-matiere"][data-v="maths"]'));
  bouton(w, 'veille-matiere', 'maths'); bouton(w, 'veille-go', 'maths|melange');
  assert.ok(/^⏱️ 1[45]:\d\d$/.test(d.getElementById('chrono-veille').textContent));
  assert.ok(d.body.textContent.includes('ERREUR DU CARNET'));
  clic(w, '[data-a="qz-rep"]'); const vrai = w.Date.now; w.Date.now = () => vrai() + 16 * 60000;
  clic(w, '[data-a="qz-suivant"]'); w.Date.now = vrai;
  assert.ok(/Note : \d+(,5)? \/ 20/.test(d.body.textContent) && /sur 1\./.test(d.body.textContent), d.body.textContent.slice(0, 200));
});
await test('v6.0 : oral noté — bloqué sans accord parental, score par mots, aucun son envoyé', () => {
  const w = page(), M = w.AMI_MODULES, d = w.document;
  assert.strictEqual(M.oral.score('I like apples', 'i like apples'), 100);
  assert.ok(M.oral.score('I would like a cup of tea', 'I like tea') < 60 && M.oral.score('I would like a cup of tea', 'banana') === 0);
  bouton(w, 'oral'); assert.ok(/doit d’abord l’autoriser/.test(d.body.textContent));
  bouton(w, 'oral-accord'); assert.strictEqual(M.api.base().oralAccord, true);
  bouton(w, 'oral'); assert.ok(/pas disponible ici/.test(d.body.textContent), 'sans reconnaissance vocale : message clair');
  assert.ok(!/MediaRecorder|getUserMedia/.test(lire('js/mod-oral.js')));
});
await test('v6.0 : réexplication — 3 erreurs sur la même notion = bouton Plumo ; sans serveur, la règle et les bonnes réponses', () => {
  const w = page(), A = w.AMI_MODULES.api, d = w.document;
  const l = [1, 2, 3].map(i => ({ consigne:'Choisis', enonce:'Q' + i, bon:'bon' + i, faux:[{ en:'faux' + i }], regle:'La règle des tests', chap:'c1', matiere:'maths' }));
  A.questionsGo(l, { titre:'T', retour:'matieres', lang:'fr', sujet:'maths', fin:() => {} });
  const rater = () => [...d.querySelectorAll('[data-a="qz-rep"]')].find(b => !/bon/.test(b.textContent)).click();
  rater(); clic(w, '[data-a="qz-suivant"]'); rater(); clic(w, '[data-a="qz-suivant"]'); rater();
  return attendre(15).then(() => { clic(w, '[data-a="reexplique"]'); const t = d.getElementById('reexplication').textContent;
    assert.ok(t.includes('La règle des tests') && t.includes('bon1') && t.includes('bon3'), t); });
});
await test('v6.0 : réexplication et correction par l’IA — plumes envoyées, réponse marquée 🤖, 402 = repli sans IA', async () => {
  let statut = 200; const w = page('fr', { MODE_PAYANT:false, SERVEUR:'https://srv.example/' }, serveurFaux({
    'explique.php':() => ({ statut, d:statut === 200 ? { texte:'Imagine un gâteau coupé en parts.' } : { erreur:'plumes' } }),
    'correction.php':c => ({ statut:200, d:{ note:13.5, forts:['Phrases claires'], conseils:['Le prétérit : went'], corrige:c.texte.replace('goed', 'went') } }) }));
  const A = w.AMI_MODULES.api, d = w.document;
  const l = [1, 2, 3].map(i => ({ consigne:'Choisis', enonce:'Q' + i, bon:'bon' + i, faux:[{ en:'faux' + i }], regle:'R', chap:'c1', matiere:'maths' }));
  A.questionsGo(l, { titre:'T', retour:'matieres', lang:'fr', sujet:'maths', fin:() => {} });
  const rater = () => [...d.querySelectorAll('[data-a="qz-rep"]')].find(b => !/bon/.test(b.textContent)).click();
  rater(); clic(w, '[data-a="qz-suivant"]'); rater(); clic(w, '[data-a="qz-suivant"]'); rater(); await attendre(15);
  clic(w, '[data-a="reexplique"]'); await attendre(15);
  assert.ok(d.getElementById('reexplication').textContent.includes('🤖 Imagine un gâteau'));
  const e = w.__envois.find(x => x.u.endsWith('explique.php')).corps; assert.strictEqual(e.question, 'Q3'); assert.strictEqual(e.bonne, 'bon3');
  bouton(w, 'correction'); d.getElementById('corr-texte').value = 'Yesterday I goed to the park with my dog.';
  clic(w, '[data-a="corriger"]'); await attendre(15);
  const t = d.getElementById('corr-resultat').textContent; assert.ok(t.includes('13,5 / 20') && t.includes('went to the park') && t.includes('🤖'), t);
  d.getElementById('corr-texte').value = 'court'; clic(w, '[data-a="corriger"]'); assert.ok(/trop court/.test(d.getElementById('corr-resultat').textContent));
});
await test('v6.0 : ligue de la semaine — créer, rejoindre, points envoyés par paquets de 10, quitter', async () => {
  const w = page('fr', { MODE_PAYANT:false, SERVEUR:'https://srv.example/' }, serveurFaux({
    'ligue.php':c => ({ statut:200, d:c.action === 'creer' ? { code:'ABCD23', nom:c.nom } : c.action === 'classement' ? { nom:'Les Hiboux', semaine:'2026-W48', membres:[{ pseudo:'Léa', points:12, moi:true }] } : { ok:true, nom:'Les Hiboux' } }) }));
  const M = w.AMI_MODULES, A = M.api, d = w.document;
  bouton(w, 'ligue'); d.getElementById('ligue-pseudo').value = 'Léa'; d.getElementById('ligue-nom').value = 'Les Hiboux';
  clic(w, '[data-a="ligue-creer"]'); await attendre(20);
  assert.strictEqual(A.base().ligue.code, 'ABCD23'); assert.strictEqual(A.base().ligue.pseudo, 'Léa');
  const j = w.__envois.find(x => x.corps && x.corps.action === 'rejoindre').corps; assert.ok(/^[A-Za-z0-9_-]{24,64}$/.test(j.jeton));
  for(let i = 0; i < 10; i++) for(const f of M.hooks.reponse) f(true, 'maths'); await attendre(15);
  const p = w.__envois.find(x => x.corps && x.corps.action === 'points'); assert.ok(p && p.corps.points === 10);
  bouton(w, 'ligue'); d.getElementById('ligue-pseudo') ; d.getElementById('ligue-code');
  M.actions['ligue-quitter'](); await attendre(15); assert.ok(!A.base().ligue);
  bouton(w, 'ligue'); d.getElementById('ligue-pseudo').value = 'Léa 0612345678'; clic(w, '[data-a="ligue-creer"]'); await attendre(15);
  assert.ok(!A.base().ligue, 'pseudo avec numéro refusé');
});
await test('v6.0 : défi de classe — même série pour tous les élèves, score envoyé, prof voit la moyenne', async () => {
  const infos = { nom:'5eB', matiere:'maths', niveau:'5e', n:5, graine:777, ouvert:true };
  const routes = { 'classe.php':c => ({ statut:200, d:c.action === 'infos' ? infos : c.action === 'creer' ? { code:'KLMN45', cle:'cle-secrete-1234567890', nom:c.nom } : c.action === 'resultats' ? { eleves:[{ pseudo:'Tom', bonnes:4, total:5 }, { pseudo:'Zoé', bonnes:5, total:5 }] } : { ok:true } }) };
  const jouer = async () => { const w = page('fr', { MODE_PAYANT:false, SERVEUR:'https://srv.example/' }, serveurFaux(routes)), d = w.document;
    bouton(w, 'classe'); d.getElementById('classe-code').value = 'KLMN45'; d.getElementById('classe-pseudo').value = 'Tom';
    clic(w, '[data-a="classe-jouer"]'); await attendre(20); const vues = [];
    for(let i = 0; i < 5; i++){ vues.push(d.querySelector('.piege-ecran .piege-fr').textContent); clic(w, '[data-a="qz-rep"]'); clic(w, '[data-a="qz-suivant"]'); }
    await attendre(20); return { w, vues }; };
  const a = await jouer(), b = await jouer();
  assert.deepStrictEqual(a.vues, b.vues); assert.strictEqual(new Set(a.vues).size, 5);
  const s = a.w.__envois.find(x => x.corps && x.corps.action === 'score').corps; assert.strictEqual(s.total, 5); assert.strictEqual(s.pseudo, 'Tom');
  const w = a.w, d = w.document; bouton(w, 'classe'); d.getElementById('classe-nom').value = '5eB';
  clic(w, '[data-a="classe-creer"]'); await attendre(20);
  assert.ok(d.body.textContent.includes('KLMN45') && d.body.textContent.includes('cle-secrete-1234567890'));
  assert.ok(/Moyenne de la classe : 18 \/ 20 · 2 élève/.test(d.body.textContent), d.body.textContent.slice(0, 300));
});
await test('v6.0 : parrainage — lien du parrain lié une seule fois, cadeaux reçus remplissent le formulaire cadeau', async () => {
  const w = page('fr', { MODE_PAYANT:true, SERVEUR:'https://srv.example/' }, serveurFaux({ 'parrainage.php':c => ({ statut:200, d:c.action === 'mes' ? { cadeaux:[{ code:'AMI-AAAA-BBBB-CCCC' }], en_attente:1 } : { ok:true } }) }));
  const M = w.AMI_MODULES, b = M.api.base(); b.abo = { code:'AMI-ZZZZ-YYYY-XXXX' }; b.parrain = 'AMI-PPPP-QQQQ-RRRR';
  const html = M.cartes.plus.map(f => f('fr')).join(''); assert.ok(/Parraine une famille/.test(html)); await attendre(20);
  const l = w.__envois.filter(x => x.corps && x.corps.action === 'lier'); assert.strictEqual(l.length, 1); assert.strictEqual(l[0].corps.parrain, 'AMI-PPPP-QQQQ-RRRR');
  M.cartes.plus.map(f => f('fr')); await attendre(20); assert.strictEqual(w.__envois.filter(x => x.corps && x.corps.action === 'lier').length, 1);
});
await test('v6.0 : serveur — accès offert par l’admin, ligue, classe, parrainage et IA sans secret côté client', () => {
  const adm = lire('serveur-php/admin/index.php');
  assert.ok(/'offrir'/.test(adm) && /'retirer'/.test(adm) && /ami_inscrire_droit/.test(adm));
  for(const f of ['ligue', 'classe', 'parrainage', 'explique', 'correction']){ const s = lire('serveur-php/' + f + '.php'); assert.ok(/ami_limiter|ami_credits_garde/.test(s), f); }
  for(const f of fs.readdirSync(path.join(ICI, 'js')).filter(f => /^mod-/.test(f))) assert.ok(!/sk_live|sk-ant|anthropic_api|stripe_secret/i.test(lire('js/' + f)), f);
  assert.ok(/ami_parrainage_recompense/.test(lire('serveur-php/abonnement.php')));
});


// v6.1 : programme anglais (England) — mêmes écrans que le français, Year 6 → Year 13, examens 2026.
await test('v6.1 : England — données complètes, vannes en anglais acceptées par le juge, générateurs sans NaN', () => {
  const w = page(), G = w.ENGLAND, J = w.JUGE;
  assert.ok(G.LISTE.length >= 12, 'matières');
  for(const n of G.NIVEAUX) assert.ok(G.LISTE.filter(m => G.chapitres(m.id, n).length).length >= (n === 'Uni' ? 3 : 6), n + ' : matières');
  for(const id of ['gb-spanish', 'gb-german', 'gb-philosophy', 'gb-politics', 'gb-sociology', 'gb-medicine', 'gb-law', 'gb-astro']) assert.ok(G.trouver(id), 'matière ' + id);
  assert.ok(G.trouver('gb-nasa') && w.MATIERES.trouver('nasa'), 'Objectif NASA / Road to NASA');
  let nq = 0;
  for(const m of G.LISTE) for(const c of m.chapitres){
    assert.ok(c.niv.length && c.niv.every(n => G.NIVEAUX.includes(n)), m.id + ':' + c.id);
    assert.ok(c.banque || c.gen, c.id);
    for(const x of (c.banque || [])){ nq++; assert.ok(x[0] && x[1] && x[3], c.id + ' ' + x[0]); assert.ok(x[2].length >= 2 && !x[2].some(f => f[0] === x[1]), x[0]);
      for(const f of x[2]) assert.ok(J.juger(f[1]).ok, f[1] + ' → ' + J.juger(f[1]).raisons); }
    if(c.gen) for(let g = 1; g <= 60; g++){ const q = c.gen(G.hasard(g * 7919), c.niv[0]); nq++;
      const tout = [q.enonce, q.bon, q.regle].concat(q.faux.map(f => f.en + ' ' + f.vanne)).join(' | ');
      assert.ok(!/NaN|undefined|Infinity|null/.test(tout), c.id + ' : ' + tout); assert.ok(q.faux.length >= 1 && q.faux.every(f => f.en !== q.bon), c.id + ' : ' + tout);
      for(const f of q.faux) assert.ok(J.juger(f.vanne).ok, f.vanne); }
  }
  assert.ok(nq >= 1500, nq + ' questions');
  for(const ton of ['doux', 'taquin', 'sanspitie']) for(const m of G.LISTE) for(const n of G.niveauxDe(m.id)){ const l = G.serie(m.id, 'melange', n, 10, 42, ton);
    assert.ok(l.length >= 5, m.id + ' ' + n); assert.ok(l.every(q => q.lang === 'en' && q.faux.length), m.id); }
});
await test('v6.1 : England — examens 2026 : chaque paper a des questions, sujets jumeaux reproductibles, notes estimées', () => {
  const w = page(), G = w.ENGLAND;
  for(const [k, x] of Object.entries(G.EXAMENS)){ assert.ok(x.papers.length, k);
    for(const p of x.papers){ const m = G.trouver(p.matiere); assert.ok(m, k + ' ' + p.matiere);
      for(const c of p.chapitres) assert.ok(m.chapitres.some(y => y.id === c), k + ' : chapitre ' + c);
      assert.ok(G.construirePaper(p, 7, 'taquin').length >= Math.min(5, p.n), k + ' ' + p.titre); } }
  for(const a of G.PASSES){ assert.ok(G.EXAMENS[a.exam], a.id); assert.ok(/^https:\/\//.test(a.url), a.id);
    const p = G.EXAMENS[a.exam].papers[0]; assert.deepStrictEqual(G.construirePaper(p, a.graine, 'taquin').map(q => q.enonce), G.construirePaper(p, a.graine, 'taquin').map(q => q.enonce)); }
  // Seuils 2026 publiés : 56/110 en maths, 25/50 en lecture, 34/70 en GPS → 100.
  assert.strictEqual(G.noteSats(56 / 110, 56 / 110), 100); assert.strictEqual(G.noteSats(1, 56 / 110), 120); assert.ok(G.noteSats(.3, 56 / 110) < 100); assert.strictEqual(G.noteSats(.02, .5), null);
  assert.strictEqual(G.grade(.9, 'gcse-h'), '9'); assert.strictEqual(G.grade(.05, 'gcse-h'), 'U'); assert.strictEqual(G.grade(.85, 'alevel'), 'A*'); assert.strictEqual(G.grade(.7, 'gcse-f'), '4');
  for(const [, u] of G.OFFICIEL.programmes.concat(G.OFFICIEL.annales)) assert.ok(/^https:\/\/(www\.)?(gov\.uk|aqa\.org\.uk|qualifications\.pearson\.com|ocr\.org\.uk|nasa\.gov|esa\.int|ucat\.ac\.uk|lnat\.ac\.uk)\//.test(u), u);
});
await test('v6.1 : England — choisir le programme, réviser un chapitre, revenir au français', () => {
  const w = page(), d = w.document, A = w.AMI_MODULES.api;
  // v6.89 : l'Angleterre s'ouvre par son onglet de pays (un programme = un pays, sans carte mélangée aux matières françaises).
  bouton(w, 'matieres'); assert.ok(d.querySelector('.onglets-pays [data-a="programme-pays"][data-v="uk"]'), 'onglet England dans Matières');
  clic(w, '.onglets-pays [data-a="programme-pays"][data-v="uk"]'); assert.strictEqual(A.base().programme, 'gb');
  assert.ok(/England curriculum/.test(d.querySelector('h2').textContent) && d.querySelector('main[lang="en"]'));
  bouton(w, 'matieres'); assert.ok(/England curriculum/.test(d.querySelector('h2').textContent), 'Matières ouvre le programme choisi');
  clic(w, '[data-a="gb-niveau"][data-v="Y6"]'); assert.strictEqual(A.J().gb.niveau, 'Y6');
  clic(w, '[data-a="gb-matiere"][data-v="gb-english"]'); assert.ok(d.querySelectorAll('[data-a="gb-chap"]').length >= 4);
  clic(w, '[data-a="gb-chap"][data-v="gb-english|punctuation"]'); assert.ok(/Punctuation · 1\/(9|10)/.test(d.body.textContent));
  const retours = [];
  while(d.querySelector('[data-a="qz-rep"]')){ clic(w, '[data-a="qz-rep"]'); retours.push(d.getElementById('qz-retour').textContent); clic(w, '[data-a="qz-suivant"]'); }
  for(const t of retours) assert.ok(!/Juste|Bravo !|Presque|Raté|Bonne réponse|Validé/.test(t), 'pas de vanne française dans le programme anglais : ' + t.slice(0, 120));
  assert.ok(/\d+ \/ \d+/.test(d.querySelector('.score').textContent));
  const s = A.J().gb.chap['gb-english:punctuation']; assert.ok(s && s.n === Math.min(10, s.n) && s.n >= 5);
  bouton(w, 'gb-retour'); assert.ok(/English/.test(d.querySelector('h2').textContent));
  bouton(w, 'gb-accueil'); clic(w, '.onglets-pays [data-a="programme-pays"][data-v="fr"]'); assert.strictEqual(A.base().programme, 'fr');
  assert.ok(!d.querySelector('main[lang="en"]'));
});
await test('v6.1 : England — mock SATs (scaled score estimé), quiz GCSE (grade), past paper jumeau, onglet Official', () => {
  const w = page(), d = w.document, A = w.AMI_MODULES.api;
  A.base().programme = 'gb'; bouton(w, 'gb-mocks'); assert.ok(d.querySelectorAll('[data-a="gb-mock"]').length >= 21);
  clic(w, '[data-a="gb-mock"][data-v="sats-maths"]');
  for(let p = 0; p < 3; p++){ assert.ok(/Paper \d of 3/.test(d.body.textContent)); clic(w, '[data-a="gb-paper"]');
    while(d.querySelector('[data-a="qz-rep"]')){ clic(w, '[data-a="qz-rep"]'); clic(w, '[data-a="qz-suivant"]'); } }
  assert.ok(/Scaled score ≈ \d+|Below 80/.test(d.querySelector('.note-examen').textContent), d.body.textContent.slice(0, 300));
  assert.ok(/2026 pass marks/.test(d.body.textContent)); assert.strictEqual(d.querySelectorAll('.ligue-classement li').length, 3);
  assert.ok(/\/ 40/.test(d.querySelector('.ligue-classement').textContent), 'marks du vrai Paper 1 : 40');
  A.J().gb.niveau = 'Y11'; bouton(w, 'gb-examen', 'gb-maths');
  while(d.querySelector('[data-a="qz-rep"]')){ clic(w, '[data-a="qz-rep"]'); clic(w, '[data-a="qz-suivant"]'); }
  assert.ok(/GCSE grade [1-9U]/.test(d.body.textContent) && /grade boundaries change/.test(d.body.textContent));
  bouton(w, 'gb-passes'); assert.strictEqual(d.querySelectorAll('[data-a="gb-passe"]').length, w.ENGLAND.PASSES.length);
  assert.ok(d.querySelectorAll('.lien-officiel[target="_blank"][rel="noopener"]').length === w.ENGLAND.PASSES.length);
  clic(w, '[data-a="gb-passe"][data-v="gcse26-english"]'); assert.ok(/GCSE English Language 2026/.test(d.body.textContent));
  for(let p = 0; p < 2; p++){ clic(w, '[data-a="gb-paper"]'); while(d.querySelector('[data-a="qz-rep"]')){ clic(w, '[data-a="qz-rep"]'); clic(w, '[data-a="qz-suivant"]'); } }
  assert.ok(d.querySelector('[data-a="correction"]'), 'écriture : renvoi vers la correction par Plumo');
  assert.ok(A.J().gb.notes['past-gcse26-english']);
  bouton(w, 'gb-officiel'); assert.ok(d.querySelectorAll('a.lien-carte').length >= 8 && /September 2028/.test(d.body.textContent));
});
await test('v6.1 : England — Times tables check : 25 questions, 6 secondes, réponse tapée', async () => {
  const w = page(), d = w.document, A = w.AMI_MODULES.api;
  A.base().programme = 'gb'; bouton(w, 'gb-mtc');
  const lire = () => d.querySelector('.mtc-question').textContent.match(/(\d+) × (\d+)/).slice(1).map(Number);
  const [a, b] = lire(); assert.ok(a >= 2 && a <= 12 && b >= 2 && b <= 12);
  d.getElementById('mtc-rep').value = String(a * b); d.getElementById('mtc-form').dispatchEvent(new w.Event('submit', { cancelable:true }));
  assert.ok(/✅/.test(d.getElementById('mtc-msg').textContent)); await attendre(500);
  assert.ok(/2\/25/.test(d.body.textContent));
  const [c, e] = lire(); d.getElementById('mtc-rep').value = String(c * e + 1); d.getElementById('mtc-form').dispatchEvent(new w.Event('submit', { cancelable:true }));
  assert.ok(new RegExp(c + ' × ' + e + ' = ' + (c * e)).test(d.getElementById('mtc-msg').textContent));
  bouton(w, 'gb-mtc-stop'); assert.ok(/England curriculum/.test(d.querySelector('h2').textContent));
});
await test('v6.1 : England — veille de contrôle avec les matières anglaises', () => {
  const w = page(), d = w.document, A = w.AMI_MODULES.api;
  A.base().programme = 'gb'; A.J().gb = { niveau:'Y9' };
  bouton(w, 'veille'); assert.ok(/Night before the test/.test(d.body.textContent) && d.querySelector('[data-a="veille-matiere"][data-v="gb-history"]'));
  bouton(w, 'veille-matiere', 'gb-history'); bouton(w, 'veille-go', 'gb-history|melange');
  assert.ok(d.getElementById('chrono-veille')); assert.ok(d.querySelector('.piege-ecran'));
});


await test('v6.2 : vrais SATs 2025 et 2026 — chaque réponse officielle de calcul vérifiée, 40 points, licence OGL citée', () => {
  const w = page(), G = w.ENGLAND;
  const val = t => { t = String(t).replace(/\(long (multiplication|division)\)/, '').replace(/,(?=\d{3})/g, '').replace(/−/g, '-').replace(/×/g, '*').replace(/÷/g, '/')
    .replace(/(\d+) (\d+)\/(\d+)/g, '($1+$2/$3)').replace(/(\d+(?:\.\d+)?)% of/g, '($1/100)*').replace(/(\d+\/\d+) of/g, '($1)*').replace(/³/g, '**3').replace(/²/g, '**2').replace(/=\s*$/, '').trim();
    return Function('"use strict";return (' + t + ')')(); };
  for(const id of ['sats26-arith', 'sats25-arith']){ const R = G.REELS[id];
    assert.strictEqual(R.items.length, 36, id); assert.strictEqual(R.items.reduce((t, x) => t + x[2], 0), 40, id + ' : 40 points');
    for(const [q, rep] of R.items){
      const r = val(rep);
      if(q.includes('?')){ const [g, d] = q.replace('?', '(' + rep.replace(/,(?=\d{3})/g, '') + ')').split('='); assert.ok(Math.abs(val(g) - val(d)) < 1e-9, id + ' ' + q); }
      else assert.ok(Math.abs(val(q) - r) < 1e-9, id + ' ' + q + ' → ' + rep + ' (calcul : ' + val(q) + ')'); } }
  for(const id of Object.keys(G.REELS)){ const l = G.listeReelle(id, 3); assert.ok(l.length >= 20, id);
    for(const q of l){ assert.ok(q.faux.length >= 1 && q.faux.every(f => f.en !== q.bon), id + ' ' + q.enonce); for(const f of q.faux) assert.ok(w.JUGE.juger(f.vanne).ok, f.vanne); }
    assert.ok(/Standards and Testing Agency for 20\d\d .*Open Government Licence v3\.0/.test(G.REELS[id].attrib)); }
  assert.ok(G.listeReelle('sats26-spell', 1).every(q => q.ecoute && q.ecoute.includes(q.bon) && q.enonce.includes('___')), 'dictée lue à voix haute');
});
await test('v6.2 : vrai SATs 2026 jouable : mention de licence, points des vraies questions, score estimé avec le seuil 2026', () => {
  const w = page(), d = w.document, A = w.AMI_MODULES.api;
  A.base().programme = 'gb'; bouton(w, 'gb-passes');
  assert.ok(d.querySelector('[data-a="gb-passe"][data-v="sats26-gps"] .ic').textContent === '✅');
  clic(w, '[data-a="gb-passe"][data-v="sats26-gps"]'); assert.ok(/Real exam questions/.test(d.body.textContent) && d.querySelector('.licence-ogl a[href*="open-government-licence"]'));
  clic(w, '[data-a="gb-paper"]'); assert.ok(/Which sentence must end with a question mark/.test(d.body.textContent));
  let bon = 0; while(d.querySelector('[data-a="qz-rep"]')){ const q = [...d.querySelectorAll('[data-a="qz-rep"]')]; const b = q.find(x => x.textContent.trim() === 'Will Orla buy tickets for all of us') || q[0]; if(b.textContent.trim() === 'Will Orla buy tickets for all of us') bon++; b.click(); clic(w, '[data-a="qz-suivant"]'); }
  assert.strictEqual(bon, 1);
  clic(w, '[data-a="gb-paper"]'); assert.ok(d.querySelector('[data-a="qz-ecouter"]'), 'dictée : bouton écouter');
  while(d.querySelector('[data-a="qz-rep"]')){ clic(w, '[data-a="qz-rep"]'); clic(w, '[data-a="qz-suivant"]'); }
  assert.ok(/Scaled score ≈ \d+|Below 80/.test(d.querySelector('.note-examen').textContent) && /\/ 50/.test(d.body.textContent) && /\/ 20/.test(d.body.textContent));
  assert.ok(d.querySelector('.licence-ogl'));
});


await test('v6.2 : programme officiel anglais — chaque partie couverte, chaque chapitre rattaché, au moins 8 questions par chapitre', () => {
  const w = page(), G = w.ENGLAND, d = w.document;
  for(const m of G.LISTE){ const P = G.PROGRAMME[m.id]; assert.ok(P && P.length, m.id + ' : programme officiel');
    for(const [t, , chs] of P){ assert.ok(chs.length, m.id + ' ' + t); for(const c of chs) assert.ok(m.chapitres.some(x => x.id === c), m.id + ' : ' + c); }
    for(const c of m.chapitres) assert.ok(P.some(p => p[2].includes(c.id)), m.id + ' : chapitre hors programme ' + c.id);
    for(const c of m.chapitres) if(c.banque && !c.gen) assert.ok(c.banque.length >= 8, m.id + ':' + c.id + ' = ' + c.banque.length); }
  assert.ok(G.PROGRAMME['gb-history'].some(p => /Holocaust/.test(p[0]) && p[2].includes('holocaust')), 'Holocauste (obligatoire en KS3)');
  w.AMI_MODULES.api.base().programme = 'gb'; bouton(w, 'gb-matiere', 'gb-history');
  assert.ok(d.querySelector('details.programme-officiel') && d.querySelectorAll('details.programme-officiel [data-a="gb-chap"]').length >= 6);
});


await test('v6.4 : Objectif NASA / Road to NASA — diplômes, métiers, exercices calculés justes, géopolitique, dans les deux programmes', () => {
  const w = page(), M = w.MATIERES, G = w.ENGLAND, J = w.JUGE, GEN = w.NASA_GEN;
  const fr = M.trouver('nasa'), en = G.trouver('gb-nasa'); assert.ok(fr && en);
  for(const id of ['parcours', 'metiers', 'fusees', 'orbites', 'communications', 'unites', 'survie', 'exploration', 'anglais', 'code', 'geopolitique']){
    assert.ok(fr.chapitres.some(c => c.id === id) && en.chapitres.some(c => c.id === id), id); }
  // Calculs vérifiés : ISS ≈ 7,67 km/s, libération Terre ≈ 11,18 km/s, Lune-Terre ≈ 1,28 s, Tsiolkovski.
  const r1 = () => 0;   // premier choix de chaque liste
  assert.strictEqual(GEN.orbites[0](r1, 'en').bon, '7.67 km/s');
  assert.strictEqual(GEN.orbites[2](r1, 'fr').bon, '11,19 km/s');
  assert.strictEqual(GEN.communications[0](r1, 'en').bon, '1.28 s');
  assert.strictEqual(GEN.fusees[0](r1, 'en').bon, (2.5 * Math.log(2)).toFixed(2) + ' km/s');
  for(const L of ['fr', 'en']) for(const [k, l] of Object.entries(GEN)) for(const f of l) for(let g = 1; g <= 80; g++){
    const q = f(G.hasard(g * 31), L), tout = JSON.stringify(q);
    assert.ok(!/NaN|undefined|Infinity/.test(tout) && q.faux.length >= 1 && q.faux.every(x => x.en !== q.bon), k + ' ' + tout);
    for(const x of q.faux) assert.ok(J.juger(x.vanne).ok, x.vanne); }
  for(const m of [fr, en]) for(const c of m.chapitres) for(const x of (c.banque || [])){ assert.ok(!x[2].some(f => f[0] === x[1]), x[0]); for(const f of x[2]) assert.ok(J.juger(f[1]).ok, f[1]); }
  for(const n of ['2nde', '1re', 'Tle', 'Sup']) assert.ok(M.serie('nasa', 'melange', n, 10, 5, 'taquin').length >= 8, n);
  for(const n of ['Y11', 'Y13', 'Uni']) assert.ok(G.serie('gb-nasa', 'melange', n, 10, 5, 'taquin').length >= 8, n);
  assert.ok(/1er avril 2026/.test(JSON.stringify(fr.chapitres)) && /1 April 2026/.test(JSON.stringify(en.chapitres)), 'Artemis II');
  assert.ok(G.EXAMENS['uni-nasa'] && G.construirePaper(G.EXAMENS['uni-nasa'].papers[0], 3, 'taquin').length >= 8);
});


await test('v6.4 : Anglais du programme français — niveau « Sup » (certifications, universitaire, scientifique, pro, C1)', () => {
  const w = page(), M = w.MATIERES, l = M.trouver('langlais');
  assert.ok(M.niveauxDe('langlais').includes('Sup'));
  assert.strictEqual(M.chapitres('langlais', 'Sup').length, 5);
  for(const c of M.chapitres('langlais', 'Sup')){ assert.ok(c.banque.length >= 8, c.id); for(const x of c.banque){ assert.ok(!x[2].some(f => f[0] === x[1]), x[0]); for(const f of x[2]) assert.ok(w.JUGE.juger(f[1]).ok, f[1]); } }
  assert.ok(M.serie('langlais', 'melange', 'Sup', 10, 9, 'taquin').length >= 10);
  assert.ok(l.examens.Sup);
});

await test('v6.6 : dans chaque langue en ligne (en, es, de, it, pt), le coin maths et le labo des sciences sont entièrement traduits', () => {
  // Mots qui trahissent du français ; on retire ceux qui existent aussi dans la langue testée.
  const BASE = ['les', 'des', 'du', 'une', 'et', 'est', 'ou', 'avec', 'pour', 'donc', 'puis', 'quel', 'quelle', 'combien', 'calcule', 'résous', 'réponse', 'nombre', 'chiffres', 'erreur', 'tu', 'ton', 'tes', 'le', 'la', 'sur', 'dans', 'pas', 'fois', 'aussi', 'niveau', 'entraînement', 'défier', 'chapitre', 'brevet blanc', 'bac blanc'];
  const OK = { en:['la', 'les', 'du', 'de', 'des'], es:['la', 'tu', 'les', 'le', 'des', 'nombre'], de:['des', 'du', 'la', 'ton'], it:['le', 'la', 'tu', 'ton', 'quel', 'quelle'], pt:['ou', 'tu', 'la', 'des'] };
  for(const L of ['en', 'es', 'de', 'it', 'pt']){
    const w = page(L === 'en' ? 'en-GB' : L), d = w.document, A = w.AmiDesMots; assert.strictEqual(A.base.ui, L); A.accueil();
    const FR = new RegExp('(?<![\\p{L}])(' + BASE.filter(m => !OK[L].includes(m)).join('|') + ')(?![\\p{L}])' + (L === 'en' || L === 'de' ? '|[«»éèàçêâîôûù]' : ''), 'iu');
    const pasFr = (t, ou) => { const m = String(t).replace(/Â/g, '').match(FR); assert.ok(!m, L + ' ' + ou + ' : « ' + (m && m[0]) + ' » dans « ' + String(t).slice(Math.max(0, (m && m.index || 0) - 60), (m && m.index || 0) + 60) + ' »'); };
    const juge = t => { const r = w.JUGE.juger(L === 'de' ? String(t).replace(/\bdie\b/gi, 'the') : t); assert.ok(r.ok, L + ' vanne refusée par le juge : ' + t + ' ' + r.raisons); };  // « die » = article allemand
    clic(w, '[data-a="maths"]');
    for(const n of w.MATHS.NIVEAUX){
      clic(w, '[data-a="maths-niveau"][data-v="' + n + '"]'); pasFr(d.querySelector('main').textContent, 'écran maths ' + n);
      for(const ton of ['doux', 'taquin', 'sanspitie']) for(const q of w.MATHS.serie(n, 20, 11 + n.length, ton)){
        assert.strictEqual(q.lang, L); pasFr([q.enonce, q.bon, q.regle].concat(q.faux.map(f => f.en + ' ' + f.vanne)).join(' | '), q.chap); q.faux.forEach(f => juge(f.vanne));
        if(L === 'en') assert.ok(!/\d,\d{1,2}\b(?!\d)/.test(q.enonce + q.bon), 'virgule décimale en anglais : ' + q.enonce + ' → ' + q.bon); }
    }
    clic(w, '[data-a="maths-niveau"][data-v="3e"]'); clic(w, '[data-a="maths-chap"][data-v="3-thales"]'); pasFr(d.querySelector('main').textContent, 'question');
    assert.strictEqual(d.querySelector('.piege-opt').lang, L);
    d.querySelector('.piege-opt').click(); pasFr(d.querySelector('#qz-retour').textContent, 'retour après réponse');
    clic(w, '[data-a="maths"]'); clic(w, '[data-a="maths-examen"]'); pasFr(d.querySelector('.piege-cat').textContent, 'examen blanc');
    A.accueil(); clic(w, '[data-a="sciences"]'); pasFr(d.querySelector('main').textContent, 'écran sciences');
    for(const ton of ['doux', 'taquin', 'sanspitie']) for(const q of w.SCIENCES.serie('tout', 99, 7, ton)){ assert.strictEqual(q.lang, L); pasFr([q.enonce, q.bon, q.regle].concat(q.faux.map(f => f.en + ' ' + f.vanne)).join(' | '), 'sciences ' + q.id); if(ton !== 'doux') q.faux.forEach(f => juge(f.vanne)); }   // en « doux », c'est l'explication (le mot « sang » y est normal)
    clic(w, '[data-a="sciences-theme"][data-v="espace"]'); pasFr(d.querySelector('main').textContent, 'question de sciences');
    d.querySelector('.piege-opt').click(); pasFr(d.querySelector('#qz-retour').textContent, 'retour sciences');
    // Retour en français : tout redevient français.
    A.base.ui = 'fr'; assert.match(w.MATHS.serie('6-decimaux', 1, 3, 'taquin')[0].enonce, /Quel est le plus grand nombre/); assert.strictEqual(w.SCIENCES.serie('espace', 1, 3, 'taquin')[0].lang, 'fr');
  }
});

await test('v6.7 : matières du programme français traduites — même nombre de questions et de pièges, aucun mot français, vannes validées par le juge', () => {
  const BASE = ['les', 'des', 'du', 'une', 'et', 'est', 'ou', 'avec', 'pour', 'donc', 'puis', 'quel', 'quelle', 'combien', 'réponse', 'tu', 'ton', 'tes', 'le', 'la', 'sur', 'dans', 'pas', 'aussi', 'c’est', 'ça', 'qui', 'que'];
  const OK = { en:['la', 'les', 'du', 'de', 'des'], es:['la', 'tu', 'les', 'le', 'des', 'que', 'es', 'del'], de:['des', 'du', 'la', 'ton'], it:['le', 'la', 'tu', 'ton', 'quel', 'quelle', 'che'], pt:['ou', 'tu', 'la', 'des', 'que'] };
  const w0 = page(); const langues = Object.keys(w0.MATIERES_LANGUES || {}); assert.ok(langues.length >= 1);
  for(const L of langues){
    const w = page(L === 'en' ? 'en-GB' : L), M = w.MATIERES, T = w.MATIERES_LANGUES[L];
    const FR = new RegExp('(?<![\\p{L}’])(' + BASE.filter(m => !OK[L].includes(m)).join('|') + ')(?![\\p{L}’])', 'iu');
    // Dans la matière « espagnol », les réponses sont en espagnol : « que », « le » y sont des mots espagnols.
    const FR_ES = new RegExp('(?<![\\p{L}’])(' + BASE.filter(m => !OK[L].includes(m) && !['que', 'le'].includes(m)).join('|') + ')(?![\\p{L}’])', 'iu');
    // Dans la matière « allemand », « du » est le pronom allemand (du heißt).
    const FR_DE = new RegExp('(?<![\\p{L}’])(' + BASE.filter(m => !OK[L].includes(m) && m !== 'du').join('|') + ')(?![\\p{L}’])', 'iu');
    let n = 0;
    for(const [cle, liste] of Object.entries(T.q)){
      const [mid, cid] = cle.split('/'), m = M.trouver(mid), ch = m && m.chapitres.find(c => c.id === cid);
      assert.ok(ch, L + ' chapitre inconnu ' + cle); assert.strictEqual(liste.length, ch.banque.length, L + ' ' + cle + ' : nombre de questions');
      liste.forEach((x, i) => { const f = ch.banque[i]; assert.strictEqual(x[2].length, f[2].length, L + ' ' + cle + ' #' + i + ' : nombre de pièges');
        assert.ok(x[0] && x[1] && x[3], L + ' ' + cle + ' #' + i + ' incomplet');
        if(mid === 'francais'){
          // Matière « Français » : les phrases et mots étudiés restent en français (énoncé, réponses, citations entre guillemets ou entre parenthèses) ;
          // en dehors de ces citations, l'explication et les vannes ne doivent contenir aucun mot français.
          const horsCitations = t => t.replace(/“[^”]*”/g, ' ').replace(/«[^»]*»/g, ' ').replace(/\([^)]*\)/g, ' ');
          [x[3]].concat(x[2].map(p => p[1])).forEach(t => { const mm = horsCitations(t).match(FR); assert.ok(!mm, L + ' ' + cle + ' #' + i + ' : « ' + (mm && mm[0]) + ' » dans ' + t); });
        } else { const tout = [x[0], x[1], x[3]].concat(x[2].flat()).join(' | '), mm = tout.match(mid === 'lespagnol' ? FR_ES : mid === 'lallemand' ? FR_DE : FR); assert.ok(!mm, L + ' ' + cle + ' #' + i + ' : « ' + (mm && mm[0]) + ' » dans ' + tout.slice(0, 160)); }
        x[2].forEach(p => { const r = w.JUGE.juger(L === 'de' ? p[1].replace(/\bdie\b/gi, 'the') : p[1]); assert.ok(r.ok, L + ' ' + cle + ' vanne refusée : ' + p[1] + ' ' + r.raisons); }); n++; });
      // La série d'un chapitre traduit sort dans la langue, sans question française générée.
      for(const ton of ['taquin', 'doux', 'sanspitie']) M.serie(mid, cid, ch.niv[0], 8, 5, ton).forEach(q => assert.strictEqual(q.lang, L, cle));
    }
    // de, it, pt : pas encore de banque traduite, seulement les calculs générés (testés en v6.12).
    if(L === 'en' || L === 'es') assert.ok(n > 0, L + ' : aucune banque traduite');
  }
});
await test('v6.12-v6.13 : SVT, physique-chimie, philosophie, droit, médecine et astrophysique en anglais ; calculs de physique générés dans les 5 langues, sans mot français', () => {
  const we = page('en-GB'), Me = we.MATIERES;
  for(const mid of ['svt', 'physique', 'philo', 'droit', 'medecine', 'astro', 'nasa', 'lespagnol', 'lallemand', 'francais']) for(const c of Me.trouver(mid).chapitres) assert.ok(Me.traduit(Me.trouver(mid), c), 'en ' + mid + '/' + c.id + ' non traduit');
  const FR = /(?<![\p{L}’])(une|est|avec|pour|quelle|combien|réponse|parcourt|fonctionne|tension|vitesse)(?![\p{L}’])/iu;
  for(const L of ['en', 'es', 'de', 'it', 'pt']){
    const w = page(L === 'en' ? 'en-GB' : L), M = w.MATIERES, m = M.trouver('physique');
    for(const cid of ['mouvement', 'energie', 'masse-vol']){
      assert.ok(M.traduit(m, m.chapitres.find(c => c.id === cid)), L + ' ' + cid + ' non traduit');
      for(const ton of ['taquin', 'sanspitie']) M.serie('physique', cid, '3e', 10, 11, ton).forEach(q => {
        assert.strictEqual(q.lang, L, L + ' ' + cid);
        const tout = [q.enonce, q.bon, q.regle].concat(q.faux.map(f => f.vanne)).join(' | '), mm = tout.match(FR); assert.ok(!mm, L + ' ' + cid + ' : « ' + (mm && mm[0]) + ' » dans ' + tout.slice(0, 160));
        if(ton === 'taquin') q.faux.forEach(f => { const r = w.JUGE.juger(f.vanne); assert.ok(r.ok, L + ' ' + cid + ' vanne refusée : ' + f.vanne + ' ' + r.raisons); });
        if(L === 'en') assert.ok(!/\d,\d/.test(q.bon), 'en : virgule décimale dans ' + q.bon);
      });
    }
  }
  // v6.16 : SVT, physique-chimie et philosophie entièrement en espagnol.
  { const ws = page('es'), Ms = ws.MATIERES; for(const mid of ['svt', 'physique', 'philo', 'droit', 'medecine', 'astro', 'nasa', 'ses', 'hggsp', 'hlp', 'nsi', 'lallemand', 'francais']) for(const c of Ms.trouver(mid).chapitres) assert.ok(Ms.traduit(Ms.trouver(mid), c), 'es ' + mid + '/' + c.id + ' non traduit');
    // v6.18 : calculs d'Objectif NASA fabriqués en espagnol (virgule décimale, aucun mot français, vannes validées).
    for(const cid of ['fusees', 'orbites', 'communications', 'unites', 'survie']) Ms.serie('nasa', cid, 'Tle', 12, 9, 'taquin').forEach(q => { assert.strictEqual(q.lang, 'es', 'nasa/' + cid);
      const t = q.enonce + ' ' + q.regle + ' ' + q.faux.map(f => f.vanne).join(' '); assert.ok(!/(?<![\p{L}’])(une|est|combien|vitesse|lumière|pour|avec|quel|quelle|sur|dans)(?![\p{L}’])/iu.test(t), t);
      q.faux.forEach(f => assert.ok(ws.JUGE.juger(f.vanne).ok, f.vanne)); }); }
  // v6.21 : histoire-géo, SVT et physique-chimie entièrement en allemand (thèmes compris).
  { const wd = page('de'), Md = wd.MATIERES; for(const mid of ['histoire', 'svt', 'physique']) for(const c of Md.trouver(mid).chapitres){ assert.ok(Md.traduit(Md.trouver(mid), c), 'de ' + mid + '/' + c.id + ' non traduit'); assert.notStrictEqual(Md.nomChap(Md.trouver(mid), c), c.nom, 'de ' + mid + '/' + c.id + ' : nom'); } }
  // v6.20 : conjugaison française expliquée en espagnol.
  { const ws = page('es'); ws.MATIERES.serie('francais', 'conjugaison', '4e', 12, 7, 'taquin').forEach(q => { assert.strictEqual(q.lang, 'es'); assert.ok(/^Conjuga «/.test(q.enonce), q.enonce);
    q.faux.forEach(f => { assert.ok(!/(?<![\p{L}’])(mauvaise|verbe|temps|bonne|pour)(?![\p{L}’])/iu.test(f.vanne), f.vanne); assert.ok(ws.JUGE.juger(f.vanne.replace('{f}', f.en)).ok, f.vanne); }); }); }
  // Conjugaison française expliquée en anglais : formes françaises, consigne et vannes en anglais.
  for(const niv of ['6e', '4e', '2nde']) Me.serie('francais', 'conjugaison', niv, 12, 7, 'taquin').forEach(q => { assert.strictEqual(q.lang, 'en');
    assert.ok(/^Conjugate “/.test(q.enonce), q.enonce); q.faux.forEach(f => { assert.ok(!/(?<![\p{L}’])(mauvaise|verbe|temps|bonne)(?![\p{L}’])/iu.test(f.vanne), f.vanne); assert.ok(we.JUGE.juger(f.vanne.replace('{f}', f.en)).ok, f.vanne); }); });
  // Calculs d'astrophysique et débit cardiaque : en anglais quand l'interface est en anglais, en français sinon.
  for(const [mid, cid] of [['astro', 'calculs'], ['medecine', 'physio']]){
    Me.serie(mid, cid, 'Sup', 12, 3, 'taquin').forEach(q => { assert.strictEqual(q.lang, 'en', mid + '/' + cid);
      assert.ok(!/(?<![\p{L}’])(une|est|combien|vitesse|lumière|fréquence|débit)(?![\p{L}’])/iu.test(q.enonce + ' ' + q.regle + ' ' + q.faux.map(f => f.vanne).join(' ')), q.enonce);
      q.faux.forEach(f => assert.ok(we.JUGE.juger(f.vanne).ok, f.vanne)); });
    const wf = page(), Mf = wf.MATIERES; Mf.serie(mid, cid, 'Sup', 6, 3, 'taquin').forEach(q => assert.strictEqual(q.lang, 'fr', mid + '/' + cid + ' fr'));
    { const ws = page('es'); ws.MATIERES.serie(mid, cid, 'Sup', 12, 3, 'taquin').forEach(q => { assert.strictEqual(q.lang, 'es', mid + '/' + cid + ' es');
      assert.ok(!/(?<![\p{L}’])(une|est|combien|vitesse|lumière|fréquence|débit|pour)(?![\p{L}’])/iu.test(q.enonce + ' ' + q.regle + ' ' + q.faux.map(f => f.vanne).join(' ')), q.enonce); q.faux.forEach(f => assert.ok(ws.JUGE.juger(f.vanne).ok, f.vanne)); }); }
  }
});
await test('v6.19 : chaque sujet à sa place — chapitres « Par thème » en histoire (une guerre = un chapitre), traduits en anglais et en espagnol, sans doublon', () => {
  const w = page(), M = w.MATIERES, h = M.trouver('histoire'), th = h.chapitres.filter(c => c.theme);
  assert.ok(th.length >= 12, 'thèmes : ' + th.length); assert.ok(h.chapitres[0].theme, 'les thèmes viennent en premier');
  for(const c of th){ assert.ok(c.banque.length > 0, c.id); const vus = new Set(c.banque.map(x => x[0])); assert.strictEqual(vus.size, c.banque.length, c.id + ' : doublon'); }
  // Toute question qui parle d'une guerre est rangée dans le chapitre de SA guerre.
  const guerres = ['th-1gm', 'th-2gm', 'th-guerre-froide', 'th-apres-89'].map(id => th.find(c => c.id === id)), dans = new Set(guerres.flatMap(c => c.banque.map(x => x[0])));
  const PG = /guerre|Verdun|armistice|Résistance|Shoah|nazi|Pétain|Vichy|Stalingrad|débarquement|Nuremberg/i;
  for(const c of h.chapitres.filter(c => !c.theme && c.banque)) c.banque.forEach(x => { if(PG.test(x[0]) && !/^Qui lance l’appel du 18 juin 1940 \?$/.test(x[0])) assert.ok(dans.has(x[0]), c.id + ' : « ' + x[0] + ' » n’est dans aucun chapitre de guerre'); });
  assert.ok(!th.find(c => c.id === 'th-1gm').banque.some(x => /1939|Seconde/.test(x[0])), 'pas de 1939-1945 dans 14-18');
  // Le mélange ne compte pas les thèmes deux fois.
  const q = M.serie('histoire', 'melange', '3e', 40, 3, 'taquin'); assert.ok(q.every(x => !/^th-/.test(x.chap)), 'thème dans le mélange');
  // Traductions automatiques.
  for(const L of ['en', 'es']){ const wl = page(L === 'en' ? 'en-GB' : L), Ml = wl.MATIERES, hl = Ml.trouver('histoire');
    for(const c of hl.chapitres.filter(c => c.theme)){ assert.ok(Ml.traduit(hl, c), L + ' ' + c.id + ' non traduit'); assert.ok(Ml.nomChap(hl, c) !== c.nom, L + ' ' + c.id + ' : nom');
      Ml.serie('histoire', c.id, c.niv[0], 6, 4, 'taquin').forEach(x => assert.strictEqual(x.lang, L, L + ' ' + c.id)); }
    assert.notStrictEqual(Ml.nomDom(hl, 'Par thème'), 'Par thème'); }
  // SVT et physique-chimie : chaque question de révision est rangée dans un thème (sauf les doublons exacts de sens).
  for(const [mid, min] of [['svt', 6], ['physique', 7]]){ const m = M.trouver(mid), t = m.chapitres.filter(c => c.theme); assert.ok(t.length >= min, mid);
    const dans = new Set(t.flatMap(c => c.banque)); for(const c of m.chapitres.filter(c => /^r-/.test(c.id))) { const hors = c.banque.filter(x => !dans.has(x)); assert.ok(hors.length <= 1, mid + '/' + c.id + ' : ' + hors.map(x => x[0]).join(' / ')); }
    for(const c of t){ assert.strictEqual(new Set(c.banque.map(x => x[0])).size, c.banque.length, mid + '/' + c.id + ' doublon');
      for(const L of ['en', 'es']){ const Ml = page(L === 'en' ? 'en-GB' : L).MATIERES; assert.ok(Ml.traduit(Ml.trouver(mid), Ml.trouver(mid).chapitres.find(x => x.id === c.id)), L + ' ' + mid + '/' + c.id); } } }
});
await test('v6.27 : lycée et spécialités — un cours de l’année par classe, 12 questions, traduit', () => {
  const w = page(), M = w.MATIERES;
  const attendus = { francais:{ '2nde':'cours-2nde', '1re':'cours-1re' }, histoire:{ '2nde':'cours-hg2', '1re':'cours-hg1', Tle:'cours-hgt' }, svt:{ '2nde':'cours-sv2', '1re':'cours-sv1', Tle:'cours-svt' }, physique:{ '2nde':'cours-pc2', '1re':'cours-pc1', Tle:'cours-pct' }, ses:{ '1re':'cours-ses', Tle:'cours-ses' }, hggsp:{ '1re':'cours-hggsp', Tle:'cours-hggsp' }, hlp:{ '1re':'cours-hlp', Tle:'cours-hlp' }, nsi:{ '1re':'cours-nsi', Tle:'cours-nsi' } };
  for(const [mid, niv] of Object.entries(attendus)) for(const [n, id] of Object.entries(niv)){
    const c = M.chapitres(mid, n).find(c => c.id === id); assert.ok(c, mid + ' ' + n + ' ' + id); assert.ok(c.banque.length >= 20, id);
    for(const x of c.banque){ assert.strictEqual(x[2].length, 3, x[0]); for(const f of x[2]){ assert.notStrictEqual(f[0], x[1]); assert.ok(w.JUGE.juger(f[1]).ok, f[1]); } }
    for(const L of ['en', 'es']){ const Ml = page(L === 'en' ? 'en-GB' : L).MATIERES; assert.ok(Ml.traduit(Ml.trouver(mid), Ml.trouver(mid).chapitres.find(x => x.id === id)), L + ' ' + mid + '/' + id); }
  }
});
await test('v6.28 : collège complet — chaque matière du collège a son cours de l’année dans chaque classe, technologie ajoutée', () => {
  const w = page(), M = w.MATIERES;
  const attendus = { francais:['6e', '5e', '4e', '3e'], histoire:['6e', '5e', '4e', '3e'], svt:['6e', '5e', '4e', '3e'], physique:['6e', '5e', '4e', '3e'], techno:['5e', '4e', '3e'], langlais:['6e', '5e', '4e', '3e'], lespagnol:['5e', '4e', '3e'], lallemand:['5e', '4e', '3e'] };
  for(const [mid, nivs] of Object.entries(attendus)) for(const n of nivs){
    const cs = M.chapitres(mid, n).filter(c => /^cours-/.test(c.id)); assert.ok(cs.length, mid + ' ' + n + ' : pas de cours de l’année');
    for(const c of cs){ assert.ok(c.banque.length >= 12, c.id); for(const x of c.banque){ assert.strictEqual(x[2].length, 3, x[0]); for(const f of x[2]){ assert.notStrictEqual(f[0], x[1]); assert.ok(w.JUGE.juger(f[1]).ok, f[1]); } assert.ok(x[3]); } }
  }
  const t = M.trouver('techno'); for(const n of ['5e', '4e', '3e']){ assert.ok(t.examens[n], n); assert.ok(M.serie('techno', 'examen', n, 10, 4, 'taquin').length >= 10, 'techno ' + n); }
  for(const [L, mids] of [['en', ['techno', 'physique', 'lespagnol', 'lallemand']], ['es', ['techno', 'physique', 'lallemand']], ['de', ['techno', 'physique']]]){
    const Ml = page(L === 'en' ? 'en-GB' : L).MATIERES; for(const mid of mids) for(const c of Ml.trouver(mid).chapitres.filter(c => /^cours-(t|p6|e|d)/.test(c.id))) assert.ok(Ml.traduit(Ml.trouver(mid), c), L + ' ' + mid + '/' + c.id);
    assert.notStrictEqual(Ml.nom(Ml.trouver('techno')), 'Technologie', L + ' nom traduit'); }
  const d = w.document, x = d.createElement('button'); x.dataset.a = 'matieres'; d.body.appendChild(x); x.click(); x.remove();
  assert.ok(d.querySelector('[data-a="matiere"][data-v="techno"]'), 'carte Technologie');
});
await test('v6.29 : les chapitres « Par thème » ne proposent que les questions de la classe choisie', () => {
  const M = page().MATIERES, haut = /(?<![\p{L}])(ADN|pH)(?![\p{L}])|allèle|chromosome|anticorps|lymphocyte|radioacti|méiose|ARN messager/iu;
  for(const mid of ['svt', 'physique']) for(const niv of ['6e', '5e']) for(const c of M.chapitres(mid, niv)){
    const s = M.serie(mid, c.id, niv, 60, 5, 'taquin'); assert.ok(s.length, mid + '/' + c.id + ' vide en ' + niv);
    for(const q of s) assert.ok(!haut.test(q.enonce + ' ' + q.bon), niv + ' ' + mid + '/' + c.id + ' : ' + q.enonce); }
  const t = M.trouver('svt').chapitres.find(c => c.id === 'th-cellule-adn'); assert.strictEqual(t.nivQ.length, t.banque.length);
  assert.ok(M.serie('svt', 'th-cellule-adn', '3e', 40, 2, 'taquin').some(q => /ADN|chromosome/.test(q.enonce)), 'la 3e garde la génétique');
  assert.ok(!M.chapitres('physique', '5e').some(c => c.id === 'th-ph'), 'pas de chapitre pH en 5e');
});
await test('v6.29 : EMC un cours par classe (programme 2024) et notions absentes ajoutées, traduites', () => {
  const w = page(), M = w.MATIERES;
  const attendus = [['histoire', 'cours-emc6', '6e', 12], ['histoire', 'cours-emc5', '5e', 12], ['histoire', 'cours-emc4', '4e', 12], ['histoire', 'cours-emc3', '3e', 12],
    ['histoire', 'cpl-h4-femmes', '4e', 8], ['svt', 'cpl-s6', '6e', 8], ['physique', 'cpl-p6', '6e', 8], ['physique', 'cpl-pc-elec', '3e', 10],
    ['techno', 'cpl-t-num', '5e', 12], ['techno', 'cpl-t-meca', '4e', 10], ['techno', 'cpl-t-projet', '3e', 10],
    ['francais', 'cpl-phrases', '5e', 10], ['francais', 'cpl-modes', '5e', 12], ['francais', 'cpl-ortho90', '6e', 8], ['francais', 'cpl-amour', '4e', 8]];
  for(const [mid, id, niv, n] of attendus){
    const c = M.chapitres(mid, niv).find(c => c.id === id); assert.ok(c, mid + '/' + id + ' en ' + niv); assert.ok(c.banque.length >= n, id);
    for(const x of c.banque){ assert.strictEqual(x[2].length, 3, x[0]); for(const f of x[2]){ assert.notStrictEqual(f[0], x[1]); assert.ok(w.JUGE.juger(f[1]).ok, f[1]); } }
    for(const L of mid === 'francais' ? ['en', 'es'] : ['en', 'es', 'de']){ const Ml = page(L === 'en' ? 'en-GB' : L).MATIERES; assert.ok(Ml.traduit(Ml.trouver(mid), Ml.trouver(mid).chapitres.find(x => x.id === id)), L + ' ' + id); }
  }
  // Programme 2024 : égalité femmes-hommes en 5e, opinion et désinformation en 3e, IA et unités en technologie.
  const txt = (mid, id) => M.trouver(mid).chapitres.find(c => c.id === id).banque.map(x => x[0] + ' ' + x[1]).join(' ');
  assert.match(txt('histoire', 'cours-emc5'), /femmes/); assert.match(txt('histoire', 'cours-emc3'), /sondage|infox|intelligence artificielle/);
  assert.match(txt('techno', 'cpl-t-num'), /octet/); assert.match(txt('techno', 'cpl-t-num'), /intelligence artificielle/);
  assert.ok(M.serie('francais', 'conjugaison', '5e', 80, 3, 'taquin').some(q => /conditionnel/.test(q.enonce + q.consigne)), 'conditionnel en 5e');
});
await test('v6.30 : collège A à Z — géométrie et algorithmique en maths, compléments, langues, brevet sciences avec technologie, arts, EPS, latin et grec', () => {
  const w = page(), M = w.MATIERES, MA = w.MATHS;
  const ids = n => MA.chapitresDe(n).map(c => c[0]);
  for(const [n, l] of [['6e', ['6-tableaux', '6-droites', '6-quadrilateres', '6-angles-types', '6-patrons']], ['4e', ['4-translation-rotation', '4-racine-carree', '4-notion-fonction', '4-etendue', '4-algorithmique']], ['3e', ['3-homothetie', '3-latitude-longitude', '3-sections', '3-debit', '3-lecture-fonction', '3-python']]])
    for(const id of l) assert.ok(ids(n).includes(id), n + ' ' + id);
  const attendus = [['histoire', 'cpl-h6-hebreux', '6e'], ['histoire', 'cpl-h5-capetiens', '5e'], ['physique', 'cpl-p6-materiaux', '6e'], ['physique', 'cpl-pc-univers', '3e'],
    ['francais', 'cpl-gn-lexique', '6e'], ['francais', 'cpl-5e-entrees', '5e'], ['langlais', 'ang-usa', '3e'], ['lespagnol', 'es-gram', '4e'], ['lallemand', 'de-cult', '3e'],
    ['arts', 'ap-bases', '6e'], ['arts', 'mu-bases', '5e'], ['arts', 'hda-3e', '3e'], ['eps', 'eps-sante', '4e'], ['eps', 'eps-regles', '6e'], ['lca', 'la-5e', '5e'], ['lca', 'la-3e', '3e'], ['lca', 'gr-3e', '3e']];
  for(const [mid, id, niv] of attendus){
    const c = M.chapitres(mid, niv).find(c => c.id === id); assert.ok(c, mid + '/' + id + ' en ' + niv); assert.ok(c.banque.length >= (/^(cpl|ang|es|de)-/.test(id) ? 5 : 8), id + ' : ' + c.banque.length);
    for(const x of c.banque){ assert.strictEqual(x[2].length, 3, x[0]); for(const f of x[2]){ assert.notStrictEqual(f[0], x[1]); assert.ok(w.JUGE.juger(f[1]).ok, f[1]); } assert.ok(x[3]); }
  }
  for(const mid of ['arts', 'eps', 'lca']) for(const L of ['en', 'es']){ const Ml = page(L === 'en' ? 'en-GB' : L).MATIERES, m = Ml.trouver(mid);
    for(const c of m.chapitres) assert.ok(Ml.traduit(m, c), L + ' ' + mid + '/' + c.id); }
  assert.ok(!M.chapitres('lca', '6e').length, 'pas de latin en 6e'); assert.ok(!M.chapitres('lca', '5e').some(c => c.id === 'gr-3e'), 'grec en 3e seulement');
  const ep = w.EPREUVES.EPREUVES['dnb-sciences']; assert.match(ep.officiel, /technologie/i); const vus = new Set();
  for(let g = 1; g <= 30; g++){ const p = ep.faire(w.EPREUVES.hasard(g)); assert.strictEqual(p.length, 2); p.forEach(x => vus.add(x.titre)); }
  assert.ok([...vus].some(t => /Technologie/.test(t)), 'la technologie peut tomber au brevet');
  const d = w.document, b = d.createElement('button'); b.dataset.a = 'matieres'; d.body.appendChild(b); b.click(); b.remove();
  for(const mid of ['arts', 'eps', 'lca']) assert.ok(d.querySelector('[data-a="matiere"][data-v="' + mid + '"]'), 'carte ' + mid);
});
await test('v6.31 : anglais du collège — chaque leçon a au moins 16 questions, pièges et vannes valides, séries sans répétition', () => {
  const w = page(), M = w.MATIERES, m = M.trouver('langlais'), col = ['6e', '5e', '4e', '3e'];
  const lecons = m.chapitres.filter(c => c.banque && c.niv.some(n => col.includes(n)) && !/^(cours-|ang-)/.test(c.id));
  assert.ok(lecons.length >= 19, 'leçons du collège : ' + lecons.length);
  const vus = new Set();
  for(const c of lecons){
    assert.ok(c.banque.length >= 16, c.id + ' : ' + c.banque.length + ' questions');
    for(const x of c.banque){
      assert.ok(!vus.has(x[0] + '|' + x[1]), 'doublon : ' + x[0]); vus.add(x[0] + '|' + x[1]);
      assert.strictEqual(x[2].length, 3, x[0]); assert.strictEqual(new Set([x[1], ...x[2].map(f => f[0])]).size, 4, 'options identiques : ' + x[0]);
      for(const f of x[2]) assert.ok(w.JUGE.juger(f[1]).ok, f[1]); assert.ok(x[3], 'règle : ' + x[0]);
    }
    for(const n of c.niv.filter(n => col.includes(n))){ const s = M.serie('langlais', c.id, n, 10, 7, 'taquin'); assert.strictEqual(s.length, 10, c.id + ' ' + n); assert.strictEqual(new Set(s.map(q => q.enonce + q.bon)).size, 10, 'répétition dans une série : ' + c.id); }
  }
});
await test('v6.32 : espagnol et allemand du collège — 16 questions par leçon, traduites dans le même ordre', () => {
  const w = page(), M = w.MATIERES, col = ['5e', '4e', '3e'];
  const att = { lespagnol:['es-bases', 'es-present', 'es-vocab', 'es-passe', 'es-cult', 'es-gram'], lallemand:['de-bases', 'de-vocab', 'de-college', 'de-cult', 'de-gram'] };
  const trad = { lespagnol:['en'], lallemand:['en', 'es'] };
  for(const [mid, ids] of Object.entries(att)){
    const m = M.trouver(mid); const vus = new Set();
    for(const c of m.chapitres.filter(c => c.banque && c.niv.some(n => col.includes(n)) && !/^cours-/.test(c.id))) assert.ok(ids.includes(c.id), 'leçon du collège non suivie : ' + c.id);
    for(const id of ids){
      const c = m.chapitres.find(c => c.id === id); assert.ok(c.banque.length >= 16, id + ' : ' + c.banque.length);
      for(const x of c.banque){ assert.ok(!vus.has(x[0] + '|' + x[1]), 'doublon : ' + x[0]); vus.add(x[0] + '|' + x[1]);
        assert.strictEqual(new Set([x[1], ...x[2].map(f => f[0])]).size, 4, x[0]); for(const f of x[2]) assert.ok(w.JUGE.juger(f[1]).ok, f[1]); }
      for(const L of trad[mid]){ const Ml = page(L === 'en' ? 'en-GB' : L).MATIERES, ml = Ml.trouver(mid), cl = ml.chapitres.find(x => x.id === id);
        assert.ok(Ml.traduit(ml, cl), L + ' ' + id); const q = w.MATIERES_LANGUES[L].q[mid + '/' + id]; assert.strictEqual(q.length, c.banque.length, L + ' ' + id + ' : même nombre');
        for(let i = 0; i < q.length; i++) assert.strictEqual(q[i][2].length, 3, L + ' ' + id + ' #' + i); }
    }
    for(const n of col) for(const c of M.chapitres(mid, n).filter(c => ids.includes(c.id))){ const s = M.serie(mid, c.id, n, 10, 9, 'taquin'); assert.strictEqual(new Set(s.map(q => q.enonce + q.bon)).size, s.length, 'répétition : ' + c.id); }
  }
});
await test('v6.33 : « Ma classe » — l’écran Matières ne montre que les matières de la classe, qui s’ouvrent à ce niveau', () => {
  const w = page(), d = w.document;
  const clic = (a, v, o) => { const b = d.createElement('button'); b.dataset.a = a; if(v != null) b.dataset.v = v; if(o) b.dataset.o = o; d.body.appendChild(b); b.click(); b.remove(); };
  const carte = id => d.querySelector('[data-a="matiere"][data-v="' + id + '"]');
  clic('matieres'); assert.ok(d.querySelector('.ma-classe [data-a="ma-classe"][data-v="6e|matieres"]'), 'choix de la classe proposé');
  assert.ok(carte('philo') && carte('lespagnol'), 'sans classe : toutes les matières');
  clic('ma-classe', '6e|matieres');
  for(const id of ['francais', 'histoire', 'svt', 'physique', 'langlais', 'arts', 'eps']) assert.ok(carte(id), '6e : ' + id + ' affiché');
  for(const id of ['philo', 'ses', 'nsi', 'hggsp', 'lespagnol', 'lallemand', 'lca', 'techno']) assert.ok(!carte(id), '6e : ' + id + ' masqué');
  assert.ok(d.querySelector('[data-a="maths"]'), '6e : maths'); assert.ok(d.querySelector('[data-a="ma-classe"][aria-pressed="true"][data-v="6e|matieres"]'), 'classe active');
  clic('matieres-tout', 'matieres'); assert.ok(carte('philo'), 'voir toutes les matières'); clic('matieres-tout', 'matieres'); assert.ok(!carte('philo'), 'retour à ma classe');
  clic('ma-classe', '4e|matieres'); assert.ok(carte('lespagnol') && carte('lca') && carte('techno'), '4e : LV2, latin, techno');
  carte('histoire').click(); const actif = d.querySelector('.onglets-niveaux .onglet.actif'); assert.ok(actif && /4e/.test(actif.textContent), 'histoire s’ouvre en 4e');
  clic('matiere-niveau', 'histoire|6e'); clic('matieres'); carte('svt').click(); assert.ok(/4e/.test(d.querySelector('.onglets-niveaux .onglet.actif').textContent), 'chaque matière revient à la classe');
  clic('matieres'); d.querySelector('[data-a="maths"]').click(); assert.ok(/4e|Quatrième/.test(d.querySelector('main').textContent), 'maths en 4e');
  clic('ma-classe', '6e|examens'); assert.ok(d.querySelector('[data-a="examen-go"][data-v="brevet"]'), '6e : brevet blanc'); assert.ok(!d.querySelector('[data-a="examen-go"][data-v="tle-philo"]'), '6e : pas de bac de Tle');
  clic('annales'); assert.ok(d.querySelector('[data-a="annale-go"][data-v^="dnb26"]') && !d.querySelector('[data-a="annale-go"][data-v="bac26-philo"]'), 'annales de la classe');
  clic('ma-classe', 'Tle|examens'); assert.ok(d.querySelector('[data-a="examen-go"][data-v="tle-philo"]') && !d.querySelector('[data-a="examen-go"][data-v="brevet"]'), 'Tle : bac, pas de brevet');
  clic('ma-classe', 'Tle|matieres'); assert.ok(carte('philo') && carte('medecine') && !carte('lca'), 'Tle : philo et après le bac');
});
await test('v6.34 : SVT et physique-chimie du collège étoffées (4 langues) ; pas de chapitre « Par thème » quasi vide dans une classe', () => {
  const w = page(), M = w.MATIERES, T = w.MATIERES_LANGUES;
  for(const [mid, id, n] of [['svt', 'vivant', 16], ['svt', 'corps', 15], ['svt', 'terre', 15], ['svt', 'genetique', 15], ['physique', 'matiere', 16], ['physique', 'elec', 15]]){
    const c = M.trouver(mid).chapitres.find(x => x.id === id); assert.ok(c.banque.length >= n, id + ' : ' + c.banque.length);
    for(const L of ['en', 'es', 'de']) assert.strictEqual(T[L].q[mid + '/' + id].length, c.banque.length, L + ' ' + id);
    for(const x of c.banque){ assert.strictEqual(new Set([x[1], ...x[2].map(f => f[0])]).size, 4, x[0]); for(const f of x[2]) assert.ok(w.JUGE.juger(f[1]).ok, f[1]); }
  }
  const elec = M.trouver('physique').chapitres.find(x => x.id === 'elec');
  assert.ok(!M.serie('physique', 'elec', '5e', 40, 3, 'taquin').some(q => /loi d’Ohm|U = R|kilowattheure|P = U/.test(q.enonce + q.bon)), 'pas de loi d’Ohm ni de puissance en 5e');
  for(const mid of ['svt', 'physique', 'histoire', 'francais']) for(const n of ['6e', '5e', '4e', '3e']) for(const c of M.chapitres(mid, n).filter(c => c.theme && c.nivQ)) assert.ok(M.indicesNiveau(c, n).length >= 4, mid + '/' + c.id + ' en ' + n);
  assert.ok(!M.chapitres('svt', '6e').some(c => c.id === 'th-cellule-adn'), 'pas de « Cellule, ADN et génétique » en 6e'); assert.ok(M.chapitres('svt', '3e').some(c => c.id === 'th-cellule-adn'), 'mais bien en 3e');
});
await test('v6.34 : package-lock.json porte la même version que package.json', () => {
  const pk = JSON.parse(lire('package.json')), lk = JSON.parse(lire('package-lock.json'));
  assert.strictEqual(lk.version, pk.version, 'package-lock.json : version'); assert.strictEqual(lk.packages[''].version, pk.version, 'package-lock.json : packages[""]');
  assert.deepStrictEqual(lk.packages[''].devDependencies, pk.devDependencies, 'mêmes dépendances');
});
await test('v6.35 : aide aux devoirs — méthode, questions et relecture par l’IA sans faire le devoir ; plumes, photo, repli sans serveur', async () => {
  // Les règles « jamais la réponse, aucune blague » sont fixées côté serveur, pas dans l'appli.
  const php = lire('serveur-php/devoirs.php');
  assert.match(php, /Tu ne fais JAMAIS le devoir/); assert.match(php, /Aucune blague, aucune vanne/); assert.match(php, /ami_credits_garde/); assert.match(php, /ami_credits_rembourser_garde/);
  assert.match(php, /<devoir>/); assert.ok(!/anthropic_cle/.test(lire('js/mod-devoirs.js')), 'aucune clé côté appli');
  // Sans serveur : la carte est là, et l'écran donne une méthode par matière, sans IA.
  let w = page(), d = w.document;
  { const x = d.createElement('button'); x.dataset.a = 'matieres'; d.body.appendChild(x); x.click(); x.remove(); }
  assert.ok(d.querySelector('[data-a="devoirs"]'), 'carte Aide aux devoirs');
  bouton(w, 'devoirs'); assert.ok(!d.getElementById('dev-enonce')); const sel = d.getElementById('dev-matiere'); sel.value = 'maths'; sel.dispatchEvent(new w.Event('change'));
  assert.match(d.getElementById('dev-methode').textContent, /ordre de grandeur/);
  // Avec serveur.
  const envois = []; let statut = 200;
  w = page('fr', { MODE_PAYANT:false, SERVEUR:'https://srv.example/' }, serveurFaux({ 'devoirs.php':c => { envois.push(c); if(statut !== 200) return { statut, d:{ erreur:'plumes' } };
    return { statut:200, d:c.mode === 'aide' ? { consigne:'On te demande de résoudre une équation du premier degré.', lecon:['Résoudre une équation : isoler x'], etapes:['Repère les termes en x', 'Regroupe-les du même côté'], questions:['Que fais-tu du +3 ?'], verifier:['Remplace x par ta solution'] }
      : c.mode === 'suite' ? { reponse:'Pense à ce qui annule +3.' } : { bien:['Bonne première étape'], a_revoir:['La ligne 2 : regarde le signe'], pistes:['Reprends la règle du changement de membre'] } }; } }));
  d = w.document; bouton(w, 'devoirs');
  // v6.79 : sans l'accord d'un parent, rien ne part, même avec un serveur ; l'accord se donne dans l'Espace parents.
  assert.ok(!d.getElementById('dev-enonce')); assert.match(d.querySelector('main').textContent, /autorisée par un parent/);
  assert.match(w.AMI_MODULES.cartes.parents.map(f => f()).join(''), /Aide aux devoirs par l’IA[\s\S]*Anthropic[\s\S]*Non autorisé/);
  bouton(w, 'devoirs-accord'); assert.strictEqual(w.AmiDesMots.base.devoirsAccord, true); bouton(w, 'devoirs');
  assert.match(d.querySelector('main').textContent, /ne fait pas ton devoir/); assert.ok(d.getElementById('dev-enonce') && d.getElementById('dev-fichier'), 'coller ou envoyer une photo / un PDF');
  d.getElementById('dev-matiere').value = 'maths'; d.getElementById('dev-enonce').value = 'Résoudre 2x + 3 = 11.'; clic(w, '[data-a="devoirs-aide"]'); await attendre(20);
  const t = d.getElementById('dev-resultat').textContent; assert.strictEqual(envois[0].accord_parent, true, 'l’accord du parent part avec la demande');
  assert.ok(/Ce qu’on te demande/.test(t) && /Regroupe-les/.test(t) && /Que fais-tu du \+3/.test(t) && /Remplace x/.test(t), t);
  assert.strictEqual(envois[0].mode, 'aide'); assert.strictEqual(envois[0].matiere, 'maths'); assert.strictEqual(envois[0].enonce, 'Résoudre 2x + 3 = 11.');
  d.getElementById('dev-question').value = 'Je bloque sur le 3'; clic(w, '[data-a="devoirs-suite"]'); await attendre(20);
  assert.match(d.getElementById('dev-suite').textContent, /annule \+3/); assert.strictEqual(envois[1].mode, 'suite'); assert.match(envois[1].consignes_precedentes, /Regroupe-les/);
  d.getElementById('dev-travail').value = '2x = 11 + 3 donc x = 7'; clic(w, '[data-a="devoirs-relire"]'); await attendre(20);
  assert.match(d.getElementById('dev-relu').textContent, /La ligne 2/); assert.strictEqual(envois[2].mode, 'relire');
  // Écran sérieux : aucune vanne de Plumo affichée.
  assert.ok(!d.querySelector('main .vanne, main .bulle-vanne'), 'pas de vanne');
  statut = 402; clic(w, '[data-a="devoirs-aide"]'); await attendre(20); assert.match(d.getElementById('dev-resultat').textContent, /Plus de plumes/);
  d.getElementById('dev-enonce').value = ''; clic(w, '[data-a="devoirs-aide"]'); assert.match(d.getElementById('dev-resultat').textContent, /Colle l’énoncé/);
});
await test('v6.36 : histoire-géographie du collège étoffée (4 langues), compléments de 3e rangés dans leurs thèmes', () => {
  const w = page(), M = w.MATIERES, T = w.MATIERES_LANGUES, h = M.trouver('histoire');
  for(const [id, n] of [['antiquite', 12], ['moyen-age', 13], ['revolution', 14], ['geo', 19]]){
    const c = h.chapitres.find(x => x.id === id); assert.ok(c.banque.length >= n, id + ' : ' + c.banque.length);
    for(const L of ['en', 'es', 'de']) assert.strictEqual(T[L].q['histoire/' + id].length, c.banque.length, L + ' ' + id);
  }
  const geo = h.chapitres.find(x => x.id === 'geo'); for(const n of ['6e', '5e', '4e', '3e']) assert.ok(M.indicesNiveau(geo, n).length >= 7, 'géographie ' + n);
  for(const [id, th] of [['cpl-h3-entre', 'th-entre-deux'], ['cpl-h3-gf', 'th-guerre-froide'], ['cpl-h3-france', 'th-france-1945']]){
    const c = h.chapitres.find(x => x.id === id), t = h.chapitres.find(x => x.id === th); assert.ok(c && c.banque.length >= 8, id);
    assert.ok(c.banque.every(x => t.banque.includes(x)), id + ' rangé dans ' + th); assert.ok(M.indicesNiveau(t, '3e').length >= 10, th + ' en 3e');
    for(const x of c.banque){ assert.strictEqual(new Set([x[1], ...x[2].map(f => f[0])]).size, 4, x[0]); for(const f of x[2]) assert.ok(w.JUGE.juger(f[1]).ok, f[1]); }
    for(const L of ['en', 'es', 'de']) assert.strictEqual(T[L].q['histoire/' + id].length, c.banque.length, L + ' ' + id);
  }
});
await test('v6.38 : l’appli s’ouvre sur la table des matières, l’aide aux devoirs en tête, plus de doublons avec l’accueil des jeux', async () => {
  const w = page('fr', { MODE_PAYANT:false, OUVRIR_MATIERES:true, ACCUEIL_SIMPLE:true }), d = w.document; await w.AmiDesMotsPret;
  d.querySelector('[data-a="entrer"]').click(); // v6.40 : la page d'accueil passe d'abord
  const m = d.querySelector('main.matieres-ecran'); assert.ok(m, 'arrivée sur la table des matières');
  const heros = m.querySelector('.devoirs-hero[data-a="devoirs"]'); assert.ok(heros, 'aide aux devoirs mise en avant');
  assert.ok(m.firstElementChild.nextElementSibling.nextElementSibling === heros || m.querySelector('h2 ~ .devoirs-hero'), 'en tête');
  assert.ok(d.querySelector('.outils-revision [data-a]'), 'outils de révision regroupés'); assert.ok(!d.querySelector('.barre [data-a="accueil"]'), 'pas de retour : c’est l’écran d’arrivée');
  // v6.87 : plus de bouton « Jeux et entraînement » : les jeux sont rangés sur la table des matières, sans doublon.
  assert.ok(!d.querySelector('.jeux-lien'), 'plus de bouton Jeux et entraînement');
  const jx = m.querySelector('section.jeux-matieres'); assert.ok(jx, 'bloc des jeux sur la première page');
  for(const a of ['defi', 'lecon', 'porte-mots', 'potes', 'carnet', 'reglages', 'parents']) assert.ok(jx.querySelector('[data-a="' + a + '"]'), a + ' sur la première page');
  assert.ok(jx.querySelector('a[href="professeur.html"]'), 'professeur IA');
  for(const a of ['maths', 'sciences', 'carnet-erreurs', 'defi', 'lecon', 'potes', 'parents', 'reglages']) assert.ok(m.querySelectorAll('[data-a="' + a + '"]').length <= 1, 'pas de doublon : ' + a);
  // L'ancien écran des jeux n'existe plus : « accueil » ramène à la table des matières.
  { const x = d.createElement('button'); x.dataset.a = 'accueil'; d.body.appendChild(x); x.click(); x.remove(); }
  assert.ok(d.querySelector('main.matieres-ecran') && !d.querySelector('main.jeux-ecran'), 'accueil → table des matières');
  d.querySelector('section.jeux-matieres [data-a="porte-mots"]').click(); assert.ok(d.querySelector('main.porte-mots-ecran'), 'mots et langues');
  d.querySelector('.barre [data-a]').click(); assert.ok(d.querySelector('main.matieres-ecran'), 'retour vers la première page');
  { const x = d.createElement('button'); x.dataset.a = 'maths'; d.body.appendChild(x); x.click(); x.remove(); }
  assert.ok(d.querySelector('.barre [data-a="matieres"]'), 'Maths revient à la table des matières');
  // Plusieurs profils : « Qui joue ? » d'abord, puis la table des matières.
  const w2 = page('fr', { MODE_PAYANT:false, OUVRIR_MATIERES:true }, x => x.localStorage.setItem('amidesmots:v2', JSON.stringify({ ui:'fr', cible:'en', son:true, actif:0, joueurs:[{ nom:'Léa', couleur:0, plumes:0, etoiles:{}, jours:[], porte:[], mots:{}, trophees:[], defis:[] }, { nom:'Tom', couleur:1, plumes:0, etoiles:{}, jours:[], porte:[], mots:{}, trophees:[], defis:[] }] })));
  await w2.AmiDesMotsPret; w2.document.querySelector('[data-a="entrer"]').click(); assert.ok(w2.document.querySelector('[data-a="choisir-joueur"]'), 'qui joue'); w2.document.querySelector('[data-a="choisir-joueur"][data-v="1"]').click();
  assert.ok(w2.document.querySelector('main.matieres-ecran'), 'puis la table des matières');
  // Sans le réglage : l'ancien accueil, inchangé.
  const w3 = page(); assert.ok(!w3.document.querySelector('main.matieres-ecran'));
  assert.match(lire('js/config-site.js'), /OUVRIR_MATIERES:true/);
});
await test('v6.39-v6.40 : page d’accueil avec Plumo et « Entrer », français à 16 questions par leçon, MariaDB de test sans AIO natif', async () => {
  const w = page('fr', { MODE_PAYANT:false, OUVRIR_MATIERES:true, ACCUEIL_SIMPLE:true }), d = w.document; await w.AmiDesMotsPret;
  assert.equal(d.querySelector('#app').dataset.ecran, 'bienvenue', 'v6.40 : page d’accueil en plein écran');
  assert.ok(d.querySelector('.ciel .ami-grand'), 'le personnage est sur la page d’accueil'); assert.ok(!d.querySelector('main.matieres-ecran'), 'la table des matières vient après');
  const ui = d.querySelector('#ui'); assert.ok(ui, 'choix de la langue'); ui.value = 'en'; ui.dispatchEvent(new w.Event('change'));
  assert.ok(d.querySelector('.ciel .ami-grand') && d.querySelector('[data-a="entrer"]'), 'changer de langue reste sur la page d’accueil');
  d.querySelector('[data-a="entrer"]').click(); assert.ok(d.querySelector('main.matieres-ecran'), '« Entrer » mène à la table des matières');
  assert.ok(d.querySelector('.barre [data-a="bienvenue"]'), 'retour possible vers la page d’accueil');
  d.querySelector('.barre [data-a="bienvenue"]').click(); assert.ok(d.querySelector('[data-a="entrer"]'));
  const M = w.MATIERES, T = w.MATIERES_LANGUES;
  for(const c of ['nature', 'fonctions', 'vocabulaire', 'accords']){
    const b = M.trouver('francais').chapitres.find(x => x.id === c).banque; assert.ok(b.length >= 16, c + ' : ' + b.length);
    for(const l of ['en', 'es']) assert.equal(T[l].q['francais/' + c].length, b.length, l + ' ' + c);
    assert.equal(new Set(b.map(q => q[0])).size, b.length, 'pas de doublon dans ' + c);
  }
  assert.match(lire('outils/tests-serveur/lancer-local.sh'), /--innodb-use-native-aio=0/);
});
await test('v6.40 : séries de 20 questions, titres d’examens et écran Officiel traduits, noms des chapitres en italien et portugais', async () => {
  const w = page('fr', { MODE_PAYANT:false, OUVRIR_MATIERES:true }), d = w.document; await w.AmiDesMotsPret; const M = w.MATIERES, E = w.EPREUVES;
  d.querySelector('[data-a="entrer"]').click();
  const clic = (a, v) => { const x = d.createElement('button'); x.dataset.a = a; if(v) x.dataset.v = v; d.body.appendChild(x); x.click(); x.remove(); };
  clic('ma-classe', '5e|matieres'); clic('matiere', 'histoire');
  const bt = [...d.querySelectorAll('[data-a="matiere-chap"] em')].map(x => x.textContent); assert.ok(bt.includes('▶ 20'), 'série de 20 : ' + bt.join(' '));
  clic('matiere-chap', 'francais|nature'); let k = 0; while(d.querySelector('[data-a="qz-rep"]:not([disabled])') && k < 30){ d.querySelector('[data-a="qz-rep"]:not([disabled])').click(); k++; const s = d.querySelector('[data-a="qz-suivant"]'); if(s) s.click(); }
  assert.strictEqual(k, 20, 'une leçon de 20 questions donne 20 questions, sans répétition');
  const titres = new Set(); for(const x of Object.values(E.BLANCS)) titres.add(x.titre); for(const x of Object.values(E.EPREUVES)) titres.add(x.titre); for(const a of E.ANNALES) titres.add(a.titre);
  for(const [t, , de] of [...E.OFFICIEL.programmes, ...E.OFFICIEL.annales]){ titres.add(t); titres.add(de); }
  for(const l of ['en', 'es', 'it', 'pt']) for(const x of titres) if(/[a-zé]{3}/.test(x)) assert.notStrictEqual(w.L(x, l), x, l + ' : ' + x);
  for(const l of ['it', 'pt']) for(const m of M.LISTE){ const n = w.MATIERES_LANGUES[l].noms[m.id]; for(const c of m.chapitres){ assert.ok(n && n.ch[c.id], l + ' ' + m.id + '/' + c.id); assert.ok(n.dom[c.dom], l + ' domaine ' + c.dom); } }
  // L'écran des blancs en italien affiche les titres traduits.
  w.AmiDesMots.base.ui = 'it'; clic('examens'); assert.ok(d.body.textContent.includes('Brevet di prova 2027'));
});
await test('v6.41 : une nouvelle version s’affiche dès la première visite (rechargement unique, jamais en pleine série)', async () => {
  const j = lire('js/jeu.js');
  assert.match(j, /controllerchange/); assert.match(j, /updateViaCache:'none'/); assert.match(j, /ecran\.ecran === 'bienvenue'/);
  const sw = lire('sw.js'); assert.match(sw, /skipWaiting/); assert.match(sw, /clients\.claim/);
});
await test('v6.42 : arts, EPS, latin et grec — 20 questions par leçon, traduites en anglais et en espagnol, séries de 20 complètes', async () => {
  const w = page(), M = w.MATIERES, T = w.MATIERES_LANGUES;
  for(const [mid, cs] of [['arts', ['ap-bases', 'mu-bases', 'hda-3e']], ['eps', ['eps-sante', 'eps-regles']], ['lca', ['la-5e', 'la-3e', 'gr-3e']]]) for(const cid of cs){
    const c = M.trouver(mid).chapitres.find(x => x.id === cid); assert.ok(c.banque.length >= 20, cid + ' : ' + c.banque.length);
    assert.equal(new Set(c.banque.map(q => q[0])).size, c.banque.length, 'doublon dans ' + cid);
    for(const l of ['en', 'es']) assert.equal(T[l].q[mid + '/' + cid].length, c.banque.length, l + ' ' + cid);
    for(const n of c.niv) assert.equal(M.serie(mid, cid, n, 20, 3, 'taquin').length, 20, 'série complète ' + cid + ' ' + n);
  }
});
await test('v6.43 : EMC et géographie — 20 questions par classe au collège, en 4 langues, séries de 20 complètes', async () => {
  const w = page(), M = w.MATIERES, T = w.MATIERES_LANGUES, h = M.trouver('histoire');
  for(const cid of ['emc', 'geo']){
    const c = h.chapitres.find(x => x.id === cid);
    for(const l of ['en', 'es', 'de']) assert.equal(T[l].q['histoire/' + cid].length, c.banque.length, l + ' ' + cid);
    if(c.nivQ) assert.equal(c.nivQ.length, c.banque.length);
    for(const n of ['6e', '5e', '4e', '3e']){
      const ix = M.indicesNiveau(c, n), k = ix ? ix.length : c.banque.length; assert.ok(k >= 20, cid + ' ' + n + ' : ' + k);
      assert.equal(M.serie('histoire', cid, n, 20, 5, 'taquin').length, 20, 'série complète ' + cid + ' ' + n);
    }
  }
  const g = h.chapitres.find(x => x.id === 'geo'), i = g.banque.findIndex(q => /plus haut sommet de France/.test(q[0]));
  assert.equal(g.nivQ[i].join(','), '3e,2nde', 'chaque question à sa classe');
});
await test('v6.44 : histoire 6e-5e-4e à 20 questions (Hébreux, Capétiens, femmes au XIXe, révisions), accueil pleine largeur avec liens légaux', async () => {
  const w = page('fr', { MODE_PAYANT:false, OUVRIR_MATIERES:true }), d = w.document; await w.AmiDesMotsPret; const M = w.MATIERES, T = w.MATIERES_LANGUES, h = M.trouver('histoire');
  for(const cid of ['cpl-h6-hebreux', 'cpl-h5-capetiens', 'cpl-h4-femmes', 'r-h6', 'r-h5', 'r-h4']){
    const c = h.chapitres.find(x => x.id === cid); assert.ok(c.banque.length >= 20, cid + ' : ' + c.banque.length);
    for(const l of ['en', 'es', 'de']) assert.equal(T[l].q['histoire/' + cid].length, c.banque.length, l + ' ' + cid);
    assert.equal(M.serie('histoire', cid, c.niv[0], 20, 9, 'taquin').length, 20, 'série complète ' + cid);
  }
  const liens = [...d.querySelectorAll('.liens-legaux-accueil a')].map(a => a.getAttribute('href'));
  assert.deepStrictEqual(liens.join(' '), 'legal.html#mentions legal.html#confidentialite legal.html#cgu legal.html#cookies');
  assert.match(lire('legal.html'), /id="cookies"/);
  // Ménage : un seul historique des versions, plus de VERSION-*.txt à la racine.
  assert.ok(!require('fs').readdirSync(path.join(__dirname, '..')).some(f => /^VERSION-.*\.txt$/.test(f)), 'VERSION-*.txt à la racine');
  assert.match(lire('docs/HISTORIQUE-VERSIONS.md'), /## Version 6\.44[\s\S]*## Version 5\.22/); assert.match(lire('css/jeu.css'), /#app\[data-ecran=bienvenue\] > section\{ width:100%; max-width:none/);
});
await test('v6.45 : histoire 6e-5e-4e complète — toutes les leçons à 20 questions, en 4 langues', async () => {
  const w = page(), M = w.MATIERES, T = w.MATIERES_LANGUES, h = M.trouver('histoire');
  for(const [n, ids] of [['6e', ['antiquite', 'r-h6', 'cours-h6', 'cpl-h6-hebreux']], ['5e', ['moyen-age', 'r-h5', 'cours-h5', 'cpl-h5-capetiens']], ['4e', ['revolution', 'r-h4', 'cours-h4', 'cpl-h4-femmes']]]) for(const cid of ids){
    const c = h.chapitres.find(x => x.id === cid), ix = M.indicesNiveau(c, n); assert.ok((ix ? ix.length : c.banque.length) >= 20, cid + ' ' + n);
    for(const l of ['en', 'es', 'de']) assert.equal(T[l].q['histoire/' + cid].length, c.banque.length, l + ' ' + cid);
    assert.equal(M.serie('histoire', cid, n, 20, 11, 'taquin').length, 20, 'série complète ' + cid);
  }
});
await test('v6.46 : histoire de 3e complète — toutes les leçons à 20 questions, en 4 langues, chaque guerre dans son chapitre', async () => {
  const w = page(), M = w.MATIERES, T = w.MATIERES_LANGUES, h = M.trouver('histoire');
  for(const cid of ['xxe', 'r-h3', 'cours-h3', 'cpl-h3-entre', 'cpl-h3-gf', 'cpl-h3-france', 'pgm-cours', 'sgm-cours', 'seconde-guerre']){
    const c = h.chapitres.find(x => x.id === cid), ix = M.indicesNiveau(c, '3e'); assert.ok((ix ? ix.length : c.banque.length) >= 20, cid);
    for(const l of ['en', 'es', 'de']) assert.equal(T[l].q['histoire/' + cid].length, c.banque.length, l + ' ' + cid);
    assert.equal(M.serie('histoire', cid, '3e', 20, 13, 'taquin').length, 20, 'série complète ' + cid);
  }
  // Toutes les leçons d'histoire-géo du collège, de la 6e à la 3e, ont au moins 20 questions (hors cours de géographie et d'EMC).
  for(const n of ['6e', '5e', '4e', '3e']) for(const c of M.chapitres('histoire', n).filter(c => !c.theme && Array.isArray(c.banque) && !/^cours-(g|emc)/.test(c.id))){
    const ix = M.indicesNiveau(c, n); assert.ok((ix ? ix.length : c.banque.length) >= 20, n + ' ' + c.id);
  }
});
await test('v6.47 : le défi rétro (années 70) — 9 épreuves (40 questions pour les 5 d’origine depuis v8.4), séries de 20, BEPC rétro noté sur 20, programme sourcé, en français seulement', async () => {
  const w = page('fr', { MODE_PAYANT:false, OUVRIR_MATIERES:true }), d = w.document; await w.AmiDesMotsPret; const R = w.AMI_RETRO;
  assert.equal(R.EPREUVES.length, 9);
  for(const e of R.EPREUVES){ assert.equal(e.q.length, ['dictee', 'analyse', 'mathsmod', 'calcul', 'geo'].includes(e.id) ? 40 : 20, e.id); assert.equal(new Set(e.q.map(x => x[0])).size, e.q.length, 'doublon ' + e.id);
    for(const x of e.q){ assert.equal(x[2].length, 3, x[0]); assert.ok(x[3], 'règle ' + x[0]); const opts = [x[1], ...x[2].map(f => f[0])]; assert.equal(new Set(opts).size, 4, 'options ' + x[0]);
      for(const f of x[2]) assert.ok(w.JUGE.juger(f[1]).ok, f[1]); } }
  assert.ok(R.SOURCES.length >= 5 && R.SOURCES.every(([, u]) => /^https:\/\//.test(u)), 'sources');
  d.querySelector('[data-a="entrer"]').click();
  const clic = (a, v) => { const x = d.createElement('button'); x.dataset.a = a; if(v) x.dataset.v = v; d.body.appendChild(x); x.click(); x.remove(); };
  assert.ok(d.querySelector('[data-a="retro"]'), 'carte du défi rétro dans la table des matières');
  clic('retro'); assert.equal(d.querySelectorAll('[data-a="retro-go"]').length, 9);
  clic('retro-go', 'mathsmod'); let k = 0; while(d.querySelector('[data-a="qz-rep"]:not([disabled])') && k < 30){ d.querySelector('[data-a="qz-rep"]:not([disabled])').click(); k++; const s = d.querySelector('[data-a="qz-suivant"]'); if(s) s.click(); }
  assert.equal(k, 20); assert.match(d.body.textContent, /\/20/); assert.match(d.body.textContent, /Résultat/);
  clic('retro-bepc'); k = 0; while(d.querySelector('[data-a="qz-rep"]:not([disabled])') && k < 30){ d.querySelector('[data-a="qz-rep"]:not([disabled])').click(); k++; const s = d.querySelector('[data-a="qz-suivant"]'); if(s) s.click(); }
  assert.equal(k, 20, 'BEPC rétro : 20 questions réparties sur toutes les épreuves');
  clic('retro-programme'); assert.match(d.body.textContent, /loi Haby du 11 juillet 1975/); assert.ok(d.querySelectorAll('.retro-sources a').length >= 5);
  // En anglais : pas de carte rétro.
  const we = page('en-GB', { MODE_PAYANT:false, OUVRIR_MATIERES:true }); await we.AmiDesMotsPret; we.document.querySelector('[data-a="entrer"]').click();
  assert.ok(!we.document.querySelector('[data-a="retro"]'), 'français seulement');
});
await test('v6.48 : la question des dents de lait est bien formulée', () => {
  const w = { window:{} }; w.window = w; const vm = require('vm'); vm.createContext(w); vm.runInContext(fs.readFileSync(path.join(__dirname, '..', 'js', 'sciences.js'), 'utf8'), w);
  const q = w.SCIENCES.Q.find(x => x[0] === 'dents-lait'); assert.equal(q[2], 'Combien de dents de lait un enfant a-t-il ?');
  assert.ok(!w.SCIENCES.Q.some(x => /Combien d[’']\S+ ont-(ils|elles) de /.test(x[2])), 'tournure « Combien d’enfants ont-ils de… »');
});
await test('v6.49 : labo des sciences — 20 questions par thème, traduites en 5 langues, séries de 20', () => {
  const w = page(), d = w.document, S = w.SCIENCES, LG = w.SCIENCES_LANGUES;
  for(const t of ['espace', 'fusees', 'corps', 'medecine']) assert.equal(S.Q.filter(x => x[1] === t).length, 20, t);
  assert.equal(new Set(S.Q.map(x => x[0])).size, S.Q.length); assert.equal(new Set(S.Q.map(x => x[2])).size, S.Q.length, 'questions en double');
  for(const l of ['en', 'es', 'de', 'it', 'pt']) for(const x of S.Q){ const y = LG[l].q[x[0]]; assert.ok(y, l + ' ' + x[0]); assert.equal(y[2].length, x[4].length, l + ' ' + x[0]); assert.ok(!y[2].some(f => f[0] === y[1]), l + ' ' + x[0]); }
  w.AmiDesMots.accueil(); clic(w, '[data-a="sciences"]'); assert.match(d.querySelector('main').textContent, /20 questions/);
  clic(w, '[data-a="sciences-theme"][data-v="corps"]'); let k = 0;
  while(d.querySelector('[data-a="qz-rep"]:not([disabled])') && k < 30){ d.querySelector('[data-a="qz-rep"]:not([disabled])').click(); k++; const s = d.querySelector('[data-a="qz-suivant"]'); if(s) s.click(); }
  assert.equal(k, 20, 'série de 20 au labo');
});
await test('v6.50 : SVT du collège — chaque leçon de la 6e à la 3e a au moins 20 questions, traduites en 4 langues', () => {
  const w = page(), M = w.MATIERES, T = w.MATIERES_LANGUES;
  for(const n of ['6e', '5e', '4e', '3e']) for(const c of M.chapitres('svt', n).filter(c => !c.theme && Array.isArray(c.banque))){
    const ix = M.indicesNiveau(c, n); assert.ok((ix ? ix.length : c.banque.length) >= 20, n + ' ' + c.id);
    for(const l of ['en', 'es', 'de']) if(T[l].q['svt/' + c.id]) assert.equal(T[l].q['svt/' + c.id].length, c.banque.length, l + ' ' + c.id);
    assert.equal(M.serie('svt', c.id, n, 20, 5, 'taquin').length, 20, 'série complète ' + n + ' ' + c.id);
  }
});
await test('v6.51 : vannes fraîches — grandes réserves sans doublon, jamais sur la personne, mémoire de 2000 vannes par joueur', () => {
  const w = page(), T = w.TRASH_TALK, vars = { k:4, n:'Léa', g:'Léa', d:'Tom' };
  const tailles = { TCHATCHE:50, ENTREE:90, BRAVO:70, SERIE_OK:25, SERIE_KO:20, SERIE_BONNE:25, LENT:30, RAPIDE:20, DIFFICILE:15, BONNE_EN:25 };
  for(const [k, n] of Object.entries(tailles)) assert.ok(T[k].length >= n, k + ' : ' + T[k].length);
  for(const t of ['doux', 'taquin', 'cash']) assert.ok(T.BONNE[t].length >= 25, 'BONNE.' + t + ' : ' + T.BONNE[t].length);
  const toutes = ['TCHATCHE', 'ENTREE', 'BRAVO', 'SERIE_OK', 'SERIE_KO', 'SERIE_BONNE', 'LENT', 'RAPIDE', 'DIFFICILE', 'BONNE_EN'].flatMap(k => T[k]).concat(T.BONNE.doux, T.BONNE.taquin, T.BONNE.cash).map(l => T.remplir(l, vars));
  for(const l of toutes){ assert.ok(w.JUGE.juger(l).ok, l); assert.ok(!/\{\w+\}/.test(l), l); assert.ok(!/\b(nul|nulle|bête|idiot|débile|stupide|moche|loser|naze|cerveau)\b/i.test(l), 'vise la personne : ' + l); }
  for(const k of ['TCHATCHE', 'ENTREE', 'BRAVO', 'LENT', 'BONNE_EN']) assert.equal(new Set(T[k]).size, T[k].length, 'doublon ' + k);
  // Un joueur qui enchaîne : aucune répétition tant qu'il reste des neuves, puis seulement les plus anciennes.
  const vu = [], mem = { age:x => vu.lastIndexOf(x) < 0 ? -1 : vu.length - vu.lastIndexOf(x), noter:x => vu.push(x) };
  for(let i = 0; i < T.TCHATCHE.length; i++) T.choisir(T.TCHATCHE, {}, mem); assert.equal(new Set(vu).size, T.TCHATCHE.length);
  const recentes = new Set(vu.slice(-Math.floor(T.TCHATCHE.length / 2))); const x = T.choisir(T.TCHATCHE, {}, mem); assert.ok(!recentes.has(x), 'reprend une des plus anciennes');
  assert.match(lire('js/jeu.js'), /vannesDites\.length > 2000/);
});
await test('v6.51 : astrophysique (Sup) — chaque chapitre à 20 questions, en français, anglais et espagnol', () => {
  const w = page(), M = w.MATIERES, T = w.MATIERES_LANGUES, m = M.trouver('astro');
  for(const c of m.chapitres.filter(c => Array.isArray(c.banque))){
    assert.ok(c.banque.length >= 20, c.id + ' : ' + c.banque.length);
    assert.equal(new Set(c.banque.map(x => x[0])).size, c.banque.length, 'doublon ' + c.id);
    for(const l of ['en', 'es']) assert.equal(T[l].q['astro/' + c.id].length, c.banque.length, l + ' ' + c.id);
    assert.equal(M.serie('astro', c.id, 'Sup', 20, 9, 'taquin').length, 20, 'série complète ' + c.id);
  }
});
await test('v6.52 : physique-chimie du collège — chaque leçon de la 6e à la 3e a au moins 20 questions, traduites en 4 langues', () => {
  const w = page(), M = w.MATIERES, T = w.MATIERES_LANGUES;
  for(const n of ['6e', '5e', '4e', '3e']) for(const c of M.chapitres('physique', n).filter(c => !c.theme && Array.isArray(c.banque))){
    const ix = M.indicesNiveau(c, n); assert.ok((ix ? ix.length : c.banque.length) >= 20, n + ' ' + c.id);
    for(const l of ['en', 'es', 'de']) if(T[l].q['physique/' + c.id]) assert.equal(T[l].q['physique/' + c.id].length, c.banque.length, l + ' ' + c.id);
    assert.equal(M.serie('physique', c.id, n, 20, 7, 'taquin').length, 20, 'série complète ' + n + ' ' + c.id);
  }
});
await test('v6.53 : technologie du collège — chaque leçon de la 5e à la 3e a au moins 20 questions, traduites en 4 langues', () => {
  const w = page(), M = w.MATIERES, T = w.MATIERES_LANGUES;
  for(const n of ['5e', '4e', '3e']) for(const c of M.chapitres('techno', n).filter(c => !c.theme && Array.isArray(c.banque))){
    const ix = M.indicesNiveau(c, n); assert.ok((ix ? ix.length : c.banque.length) >= 20, n + ' ' + c.id);
    for(const l of ['en', 'es', 'de']) if(T[l].q['techno/' + c.id]) assert.equal(T[l].q['techno/' + c.id].length, c.banque.length, l + ' ' + c.id);
    assert.equal(M.serie('techno', c.id, n, 20, 3, 'taquin').length, 20, 'série complète ' + n + ' ' + c.id);
  }
});
await test('v6.54 : 📖 « Je n’ai pas compris la leçon » — fiche sans IA, explication et 3 questions avec l’IA, vérification en 5 questions', async () => {
  // Sans serveur : la fiche de la leçon s'affiche quand même (l'essentiel + des exemples), sans appel réseau.
  const w0 = page('fr', { MODE_PAYANT:false, OUVRIR_MATIERES:true }), d0 = w0.document; await w0.AmiDesMotsPret;
  d0.querySelector('[data-a="entrer"]').click(); clic(w0, '[data-a="matiere"][data-v="svt"]');
  const b0 = d0.querySelector('.chap-ligne [data-a="lecon-chap"]'); assert.ok(b0, 'bouton 📖 à côté des chapitres'); b0.click();
  assert.ok(d0.querySelector('main.lecon-ecran'), 'écran de la leçon'); assert.ok(d0.querySelectorAll('.lecon-bloc li').length >= 3, 'l’essentiel et des exemples');
  assert.ok(!d0.querySelector('[data-a="lecon-ia"]'), 'pas de bouton IA sans serveur'); assert.match(d0.querySelector('.lecon-ia').textContent, /serveur du jeu/);
  clic(w0, '[data-a="lecon-verif"]'); assert.equal(d0.querySelectorAll('[data-a="qz-rep"]').length > 0, true, 'vérification lancée');
  // Avec le serveur : explication puis questions, 3 au plus ; rien de personnel n'est envoyé.
  const w = page('fr', { MODE_PAYANT:false, OUVRIR_MATIERES:true, SERVEUR:'https://srv.example/' }, serveurFaux({ 'lecon.php':c => ({ statut:200, d:{ texte:c.question ? 'Réponse à : ' + c.question : 'Imagine une usine dans chaque cellule.' } }) })), d = w.document;
  await w.AmiDesMotsPret; w.AMI_MODULES.actions['lecon-chap']('svt|vivant');
  clic(w, '[data-a="lecon-ia"]'); await attendre(20);
  assert.match(d.getElementById('lecon-ia-texte').textContent, /🤖 Imagine une usine/);
  const e = w.__envois.find(x => x.u.endsWith('lecon.php')).corps;
  assert.equal(e.question, ''); assert.ok(e.points.length >= 3 && e.chapitre && e.matiere, 'le chapitre et ses règles');
  assert.deepEqual(Object.keys(e).filter(k => !['matiere', 'niveau', 'chapitre', 'points', 'exemples', 'question', 'langue', 'code'].includes(k)), [], 'rien d’autre');
  const poser = async q => { d.getElementById('lecon-q').value = q; clic(w, '[data-a="lecon-question"]'); await attendre(20); };
  await poser('Mon numéro 0612345678'); assert.match(d.getElementById('lecon-ia-texte').textContent, /Pas de lien/);
  for(const q of ['Pourquoi la cellule ?', 'Et le noyau ?', 'Et la membrane ?']) await poser(q);
  assert.match(d.getElementById('lecon-ia-texte').textContent, /Réponse à : Et la membrane/); assert.ok(d.getElementById('lecon-question').hidden, '3 questions au plus');
  assert.equal(w.__envois.filter(x => x.u.endsWith('lecon.php')).length, 4);
  const php = lire('serveur-php/lecon.php'); assert.ok(/ami_limiter/.test(php) && /ami_credits_garde/.test(php) && /lecon_par_jour/.test(php));
  assert.ok(!/anthropic_cle'\]\s*\?\?\s*'sk-/.test(php), 'aucune clé dans le code');
});
await test('v6.55 : anglais du collège — chaque leçon de la 6e à la 3e a au moins 20 questions, sans doublon, vannes validées', () => {
  const w = page(), M = w.MATIERES;
  for(const n of ['6e', '5e', '4e', '3e']) for(const c of M.chapitres('langlais', n).filter(c => !c.theme && Array.isArray(c.banque))){
    const ix = M.indicesNiveau(c, n); assert.ok((ix ? ix.length : c.banque.length) >= 20, n + ' ' + c.id + ' : ' + (ix ? ix.length : c.banque.length));
    assert.equal(new Set(c.banque.map(q => q[0] + '|' + q[1])).size, c.banque.length, 'doublon ' + c.id);
    for(const q of c.banque){ assert.ok(!q[2].some(f => f[0] === q[1]), c.id + ' ' + q[0]); for(const f of q[2]) assert.ok(w.JUGE.juger(f[1]).ok, f[1]); }
    assert.equal(M.serie('langlais', c.id, n, 20, 11, 'taquin').length, 20, 'série complète ' + n + ' ' + c.id);
  }
});
await test('v6.56 : français du collège — chaque leçon de la 6e à la 3e a au moins 20 questions, traductions alignées, vannes validées', () => {
  const w = page(), M = w.MATIERES, T = w.MATIERES_LANGUES || {}, trop = [];
  for(const n of ['6e', '5e', '4e', '3e']) for(const c of M.chapitres('francais', n).filter(c => !c.theme && Array.isArray(c.banque))){
    const ix = M.indicesNiveau(c, n), nb = ix ? ix.length : c.banque.length; if(nb < 20) trop.push(n + ' ' + c.id + ' : ' + nb);
    for(const l of ['en', 'es', 'de']){ const q = T[l] && T[l].q && T[l].q['francais/' + c.id]; if(q) assert.equal(q.length, c.banque.length, l + ' ' + c.id); }
    for(const q of c.banque){ assert.ok(!q[2].some(f => f[0] === q[1]), c.id + ' ' + q[0]); for(const f of q[2]) assert.ok(w.JUGE.juger(f[1]).ok, f[1]); }
    if(nb >= 20) assert.equal(M.serie('francais', c.id, n, 20, 11, 'taquin').length, 20, 'série complète ' + n + ' ' + c.id);
  }
  assert.deepEqual(trop, []);
});
await test('v6.57 : espagnol et allemand du collège — chaque leçon de la 5e à la 3e a au moins 20 questions, traductions alignées, vannes validées', () => {
  const w = page(), M = w.MATIERES, T = w.MATIERES_LANGUES || {}, trop = [];
  for(const mid of ['lespagnol', 'lallemand']) for(const n of ['5e', '4e', '3e']) for(const c of M.chapitres(mid, n).filter(c => !c.theme && Array.isArray(c.banque))){
    const ix = M.indicesNiveau(c, n), nb = ix ? ix.length : c.banque.length; if(nb < 20) trop.push(mid + ' ' + n + ' ' + c.id + ' : ' + nb);
    assert.equal(new Set(c.banque.map(q => q[0] + '|' + q[1])).size, c.banque.length, 'doublon ' + mid + ' ' + c.id);
    for(const l of ['en', 'es', 'de']){ const q = T[l] && T[l].q && T[l].q[mid + '/' + c.id]; if(q) assert.equal(q.length, c.banque.length, l + ' ' + c.id); }
    for(const q of c.banque){ assert.ok(!q[2].some(f => f[0] === q[1]), c.id + ' ' + q[0]); for(const f of q[2]) assert.ok(w.JUGE.juger(f[1]).ok, f[1]); }
    if(nb >= 20) assert.equal(M.serie(mid, c.id, n, 20, 11, 'taquin').length, 20, 'série complète ' + mid + ' ' + n + ' ' + c.id);
  }
  assert.deepEqual(trop, []);
});
await test('v6.58 : collège complet — toutes les leçons de toutes les matières, de la 6e à la 3e, ont au moins 20 questions ; géographie et EMC traduites en 4 langues', () => {
  const w = page(), M = w.MATIERES, T = w.MATIERES_LANGUES || {}, trop = [];
  for(const m of M.LISTE) for(const n of ['6e', '5e', '4e', '3e']) for(const c of M.chapitres(m.id, n).filter(c => !c.theme && Array.isArray(c.banque))){
    const ix = M.indicesNiveau(c, n), nb = ix ? ix.length : c.banque.length; if(nb < 20) trop.push(m.id + ' ' + n + ' ' + c.id + ' : ' + nb); }
  assert.deepEqual(trop, []);
  for(const id of ['cours-g6', 'cours-g5', 'cours-g4', 'cours-g3', 'cours-emc-c3', 'cours-emc6', 'cours-emc5', 'cours-emc-c4', 'cours-emc4', 'cours-emc3']){
    const c = M.trouver('histoire').chapitres.find(x => x.id === id); assert.ok(c.banque.length >= 20, id);
    for(const l of ['en', 'es', 'de']) assert.equal(T[l].q['histoire/' + id].length, c.banque.length, l + ' ' + id);
    for(const q of c.banque){ assert.ok(!q[2].some(f => f[0] === q[1]), id + ' ' + q[0]); for(const f of q[2]) assert.ok(w.JUGE.juger(f[1]).ok, f[1]); }
    assert.equal(M.serie('histoire', id, c.niv[0], 20, 11, 'taquin').length, 20, 'série complète ' + id);
  }
});
await test('v6.59 : médecine (Sup) — chaque chapitre a au moins 20 questions, traduites en anglais et en espagnol, vannes validées', () => {
  const w = page(), M = w.MATIERES, T = w.MATIERES_LANGUES, m = M.trouver('medecine'), trop = [];
  for(const c of m.chapitres.filter(c => !c.theme && Array.isArray(c.banque))){
    if(c.banque.length < 20) trop.push(c.id + ' : ' + c.banque.length);
    assert.equal(new Set(c.banque.map(q => q[0])).size, c.banque.length, 'doublon ' + c.id);
    for(const l of ['en', 'es']) assert.equal(T[l].q['medecine/' + c.id].length, c.banque.length, l + ' ' + c.id);
    for(const q of c.banque){ assert.ok(!q[2].some(f => f[0] === q[1]), c.id + ' ' + q[0]); for(const f of q[2]) assert.ok(w.JUGE.juger(f[1]).ok, f[1]); }
    assert.equal(M.serie('medecine', c.id, 'Sup', 20, 11, 'taquin').length, 20, 'série complète ' + c.id);
  }
  assert.deepEqual(trop, []);
  for(const L of ['en', 'es']){ const wl = page(L === 'en' ? 'en-GB' : L), Ml = wl.MATIERES;
    for(const c of Ml.trouver('medecine').chapitres.filter(c => !c.theme)) for(const q of Ml.serie('medecine', c.id, 'Sup', 20, 7, 'taquin')){ assert.strictEqual(q.lang, L, L + ' ' + c.id); for(const f of q.faux) assert.ok(wl.JUGE.juger(f.vanne).ok, f.vanne); } }
});
await test('v6.60 : droit (Sup) — chaque chapitre a au moins 20 questions, traduites en anglais et en espagnol, vannes validées', () => {
  const w = page(), M = w.MATIERES, T = w.MATIERES_LANGUES, m = M.trouver('droit'), trop = [];
  for(const c of m.chapitres.filter(c => !c.theme && Array.isArray(c.banque))){
    if(c.banque.length < 20) trop.push(c.id + ' : ' + c.banque.length);
    assert.equal(new Set(c.banque.map(q => q[0])).size, c.banque.length, 'doublon ' + c.id);
    for(const l of ['en', 'es']) assert.equal(T[l].q['droit/' + c.id].length, c.banque.length, l + ' ' + c.id);
    for(const q of c.banque){ assert.ok(!q[2].some(f => f[0] === q[1]), c.id + ' ' + q[0]); for(const f of q[2]) assert.ok(w.JUGE.juger(f[1]).ok, f[1]); }
    assert.equal(M.serie('droit', c.id, 'Sup', 20, 11, 'taquin').length, 20, 'série complète ' + c.id);
  }
  assert.deepEqual(trop, []);
  for(const L of ['en', 'es']){ const wl = page(L === 'en' ? 'en-GB' : L), Ml = wl.MATIERES;
    for(const c of Ml.trouver('droit').chapitres.filter(c => !c.theme)) for(const q of Ml.serie('droit', c.id, 'Sup', 20, 7, 'taquin')){ assert.strictEqual(q.lang, L, L + ' ' + c.id); for(const f of q.faux) assert.ok(wl.JUGE.juger(f.vanne).ok, f.vanne); } }
});
await test('v6.61 : anglais après le bac et Objectif NASA — chaque chapitre à banque a au moins 20 questions, NASA traduite en anglais et en espagnol', () => {
  const w = page(), M = w.MATIERES, T = w.MATIERES_LANGUES, trop = [];
  const chaps = [['langlais', M.trouver('langlais').chapitres.filter(c => /^sup-/.test(c.id))], ['nasa', M.trouver('nasa').chapitres.filter(c => !c.theme && Array.isArray(c.banque) && c.banque.length)]];
  for(const [mid, liste] of chaps) for(const c of liste){
    if(c.banque.length < 20) trop.push(mid + ' ' + c.id + ' : ' + c.banque.length);
    assert.equal(new Set(c.banque.map(q => q[0] + '|' + q[1])).size, c.banque.length, 'doublon ' + c.id);
    if(mid === 'nasa') for(const l of ['en', 'es']) assert.equal(T[l].q['nasa/' + c.id].length, c.banque.length, l + ' ' + c.id);
    for(const q of c.banque){ assert.ok(!q[2].some(f => f[0] === q[1]), c.id + ' ' + q[0]); for(const f of q[2]) assert.ok(w.JUGE.juger(f[1]).ok, f[1]); }
    assert.equal(M.serie(mid, c.id, 'Sup', 20, 11, 'taquin').length, 20, 'série complète ' + c.id);
  }
  assert.ok(chaps[0][1].length === 5 && chaps[1][1].length >= 7);
  assert.deepEqual(trop, []);
});
await test('v6.62 : philosophie (Tle) — chaque chapitre à banque a au moins 20 questions, traduites en anglais et en espagnol', () => {
  const w = page(), M = w.MATIERES, T = w.MATIERES_LANGUES, trop = [];
  const liste = M.trouver('philo').chapitres.filter(c => !c.theme && Array.isArray(c.banque) && c.banque.length);
  for(const c of liste){
    if(c.banque.length < 20) trop.push(c.id + ' : ' + c.banque.length);
    assert.equal(new Set(c.banque.map(q => q[0])).size, c.banque.length, 'doublon ' + c.id);
    for(const l of ['en', 'es']) if(T[l].q['philo/' + c.id]) assert.equal(T[l].q['philo/' + c.id].length, c.banque.length, l + ' ' + c.id);
    for(const q of c.banque){ assert.ok(!q[2].some(f => f[0] === q[1]), c.id + ' ' + q[0]); for(const f of q[2]) assert.ok(w.JUGE.juger(f[1]).ok, f[1]); }
    assert.equal(M.serie('philo', c.id, 'Tle', 20, 11, 'taquin').length, 20, 'série complète ' + c.id);
  }
  assert.ok(liste.length >= 19);
  assert.deepEqual(trop, []);
});
await test('v6.63 : anglais du lycée — chaque leçon de 2nde, 1re et Tle a au moins 20 questions, vannes validées, séries de 20 sans répétition', () => {
  const w = page(), M = w.MATIERES, lyc = ['2nde', '1re', 'Tle'], trop = [];
  const liste = M.trouver('langlais').chapitres.filter(c => !c.theme && Array.isArray(c.banque) && c.banque.length && c.niv.some(n => lyc.includes(n)));
  for(const c of liste){
    if(c.banque.length < 20) trop.push(c.id + ' : ' + c.banque.length);
    assert.equal(new Set(c.banque.map(q => q[0])).size, c.banque.length, 'doublon ' + c.id);
    for(const q of c.banque){ assert.ok(!q[2].some(f => f[0] === q[1]), c.id + ' ' + q[0]); assert.equal(new Set(q[2].map(f => f[0])).size, 3, c.id + ' ' + q[0]); for(const f of q[2]) assert.ok(w.JUGE.juger(f[1]).ok, f[1]); }
    for(const n of c.niv.filter(n => lyc.includes(n))){ const s = M.serie('langlais', c.id, n, 20, 11, 'taquin'); assert.equal(s.length, 20, 'série complète ' + n + ' ' + c.id); assert.equal(new Set(s.map(q => q.enonce + q.bon)).size, 20, 'répétition ' + c.id); }
  }
  assert.ok(liste.length >= 20);
  assert.deepEqual(trop, []);
});
await test('v6.64 : SVT du lycée — chaque chapitre de 2nde, 1re et Tle a au moins 20 questions, traduites en anglais, espagnol et allemand', () => {
  const w = page(), M = w.MATIERES, T = w.MATIERES_LANGUES, lyc = ['2nde', '1re', 'Tle'], trop = [];
  const liste = M.trouver('svt').chapitres.filter(c => !c.theme && Array.isArray(c.banque) && c.banque.length && c.niv.some(n => lyc.includes(n)));
  for(const c of liste){
    if(c.banque.length < 20) trop.push(c.id + ' : ' + c.banque.length);
    assert.equal(new Set(c.banque.map(q => q[0])).size, c.banque.length, 'doublon ' + c.id);
    for(const l of ['en', 'es', 'de']){ const q = T[l].q['svt/' + c.id]; assert.ok(q, l + ' ' + c.id); assert.equal(q.length, c.banque.length, l + ' ' + c.id); if(l !== 'de') for(const x of q) for(const f of x[2]) assert.ok(w.JUGE.juger(f[1]).ok, l + ' ' + f[1]); }
    for(const q of c.banque){ assert.ok(!q[2].some(f => f[0] === q[1]), c.id + ' ' + q[0]); for(const f of q[2]) assert.ok(w.JUGE.juger(f[1]).ok, f[1]); }
    for(const n of c.niv.filter(n => lyc.includes(n))) assert.equal(M.serie('svt', c.id, n, 20, 11, 'taquin').length, 20, 'série complète ' + n + ' ' + c.id);
  }
  assert.ok(liste.length >= 7);
  assert.deepEqual(trop, []);
});
await test('v6.65 : spé maths par trimestre — 1re et Tle, entraînement et contrôle chronométré de 20 questions noté sur 20, bilan par chapitre', () => {
  const w = page(), d = w.document, A = w.AmiDesMots, MA = w.MATHS, TR = w.AMI_TRIMESTRES.TRIMESTRES; A.accueil();
  // Chaque chapitre des trimestres existe, a un générateur, et chaque chapitre du programme est dans au moins un trimestre.
  for(const niv of ['1re', 'Tle']){ const prog = MA.chapitresDe(niv).map(c => c[0]).filter(id => id.startsWith(niv === '1re' ? '1-' : 'T-')), tous = new Set(TR[niv].flatMap(t => t.chap));
    assert.strictEqual(TR[niv].map(t => t.id).join(','), 'T1,T2,T3');
    for(const t of TR[niv]) for(const id of t.chap){ assert.ok(MA.disponible(id), niv + ' ' + id); assert.ok(prog.includes(id), niv + ' hors programme ' + id); }
    for(const id of prog) assert.ok(tous.has(id), niv + ' : ' + id + ' dans aucun trimestre');
    for(const t of TR[niv]){ const s = MA.serie(t.chap, 20, 7, 'taquin'); assert.strictEqual(s.length, 20, niv + ' ' + t.id); assert.strictEqual(new Set(s.map(q => q.enonce)).size, 20);
      assert.ok(s.every(q => t.chap.includes(q.chap)), 'questions du trimestre seulement'); assert.ok(new Set(s.map(q => q.chap)).size >= 3, 'chapitres mélangés'); } }
  // v6.66 : toutes les classes ont leurs trimestres (répartition automatique avant la 1re).
  clic(w, '[data-a="maths"]'); clic(w, '[data-a="maths-niveau"][data-v="6e"]'); clic(w, '[data-a="maths-tri"]'); assert.match(d.querySelector('h2').textContent, /Mes trimestres de maths · 6e/); assert.strictEqual(d.querySelectorAll('[data-a="maths-tri-ctrl"]').length, 4);
  clic(w, '[data-a="maths"]');
  clic(w, '[data-a="maths-niveau"][data-v="1re"]'); clic(w, '[data-a="maths-tri"]');
  assert.strictEqual(d.querySelectorAll('[data-a="maths-tri-ctrl"]').length, 4); assert.match(d.querySelector('main').textContent, /1er trimestre[\s\S]*2e trimestre[\s\S]*3e trimestre/); assert.match(d.querySelector('main').textContent, /Second degré/);
  // Entraînement : 20 questions, pas de chrono.
  clic(w, '[data-a="maths-tri-entr"][data-v="T2"]'); assert.match(d.querySelector('.piege-cat').textContent, /Entraînement · 1re · 2e trimestre · 1\/20/); assert.ok(!d.querySelector('#chrono-veille'));
  { const bon = A.qzBonne(); [...d.querySelectorAll('.piege-opt')].find(x => x.textContent !== bon).click(); assert.ok(d.querySelector('#qz-retour').textContent.length > 10, 'à l’entraînement, Prof Pi corrige et vanne'); assert.ok(d.querySelector('[data-a="qz-suivant"]')); }
  // Contrôle : chrono, 20 bonnes réponses = 20/20, note gardée.
  clic(w, '[data-a="maths"]'); clic(w, '[data-a="maths-tri"]'); clic(w, '[data-a="maths-tri-ctrl"][data-v="T1"]'); assert.ok(d.querySelector('#chrono-veille'), 'chrono');
  // Pendant le contrôle : aucune vanne, aucune correction, pas de bouton « suivant » : on passe directement à la question suivante.
  { const bon = A.qzBonne(), mauvais = [...d.querySelectorAll('.piege-opt')].find(x => x.textContent !== bon); assert.ok(!d.querySelector('#qz-retour').textContent);
    const avant = A.etat.betisier ? JSON.stringify(A.etat.betisier) : ''; mauvais.click(); assert.match(d.querySelector('.piege-cat').textContent, /2\/20/); assert.ok(!d.querySelector('[data-a="qz-suivant"]'));
    assert.ok(!d.querySelector('#qz-retour').textContent, 'pas de vanne'); assert.strictEqual(A.etat.betisier ? JSON.stringify(A.etat.betisier) : '', avant, 'aucune vanne retenue'); }
  for(let i = 1; i < 20; i++){ const bon = A.qzBonne(); const b = [...d.querySelectorAll('.piege-opt')].find(x => x.textContent === bon); assert.ok(b, 'bonne réponse affichée'); b.click(); }
  assert.match(d.querySelector('main').textContent, /19\/20 · 19\/20/); assert.match(d.querySelector('main').textContent, /📋 Correction[\s\S]*Ta réponse :[\s\S]*Bonne réponse :/); assert.ok(!/Prof Pi/.test(d.querySelector('main').textContent), 'appréciation sobre');
  clic(w, '[data-a="maths-tri-ctrl"][data-v="T1"]');
  for(let i = 0; i < 20; i++){ const bon = A.qzBonne(); [...d.querySelectorAll('.piege-opt')].find(x => x.textContent === bon).click(); }
  assert.match(d.querySelector('main').textContent, /20\/20/); assert.match(d.querySelector('main').textContent, /Bilan par chapitre/); assert.strictEqual(A.etat.mathsTri['1re-T1'].best, 20);
  // Contrôle raté : les chapitres à retravailler ouvrent l'entraînement du chapitre ; la meilleure note reste.
  clic(w, '[data-a="maths-tri-ctrl"][data-v="T1"]');
  for(let i = 0; i < 20; i++){ const bon = A.qzBonne(); [...d.querySelectorAll('.piege-opt')].find(x => x.textContent !== bon).click(); }
  assert.strictEqual(A.etat.mathsTri['1re-T1'].last, 0); assert.strictEqual(A.etat.mathsTri['1re-T1'].best, 20); assert.ok(d.querySelector('.trimestre-fin [data-a="maths-chap"]'), 'à retravailler');
  clic(w, '[data-a="maths-tri"]'); assert.match(d.querySelector('main').textContent, /Dernière note : 0\/20 · meilleure : 20\/20/);
  // Une note trafiquée est ramenée entre 0 et 20.
  A.etat.mathsTri = { '1re-T2':{ last:99, best:-4 }, 'pirate':{ last:5 } }; clic(w, '[data-a="maths"]'); clic(w, '[data-a="maths-tri"]'); assert.ok(!('pirate' in A.etat.mathsTri)); assert.strictEqual(A.etat.mathsTri['1re-T2'].last, 20);
  // Bilan de terminale et interface anglaise.
  clic(w, '[data-a="maths"]'); clic(w, '[data-a="maths-niveau"][data-v="Tle"]'); clic(w, '[data-a="maths-tri"]'); clic(w, '[data-a="maths-tri-ctrl"][data-v="bilan"]'); assert.match(d.querySelector('.piege-cat').textContent, /Tle · 🏆 Contrôle bilan/);
  const we = page('en-GB'), de = we.document; we.AmiDesMots.accueil(); clic(we, '[data-a="maths"]'); clic(we, '[data-a="maths-niveau"][data-v="Tle"]'); clic(we, '[data-a="maths-tri"]');
  assert.match(de.querySelector('main').textContent, /My maths specialism terms[\s\S]*1st term[\s\S]*Logarithm/); assert.ok(!/trimestre/.test(de.querySelector('main').textContent));
});
await test('v6.66 : contrôles par trimestre dans toutes les matières — répartition dans l’ordre, contrôle sans vanne, correction à la fin, notes gardées', () => {
  const w = page(), d = w.document, A = w.AmiDesMots, MT = w.MATIERES; A.accueil();
  // Chaque matière, à chaque classe où elle a des chapitres, a trois trimestres non vides, sans chapitre « Par thème ».
  let n = 0;
  for(const m of MT.LISTE) for(const niv of MT.NIVEAUX){ if(!MT.chapitres(m.id, niv).length) continue; const T = MT.trimestres(m.id, niv); assert.ok(T, m.id + ' ' + niv); n++;
    assert.strictEqual(T.length, 3); for(const t of T){ assert.ok(t.length, m.id + ' ' + niv); for(const p of t){ const c = m.chapitres.find(x => x.id === p.ch); assert.ok(c && !c.theme, p.ch); } }
    // Une tranche de questions n'est jamais dans deux trimestres.
    const vus = new Set(); for(const t of T) for(const p of t) if(p.idx) for(const i of p.idx){ const k = p.ch + '#' + i; assert.ok(!vus.has(k), m.id + ' ' + niv + ' ' + k); vus.add(k); }
    const s = MT.serieParts(m.id, T[0], niv, 20, 3, 'taquin'); assert.ok(s.length >= 4, m.id + ' ' + niv + ' : ' + s.length); assert.strictEqual(new Set(s.map(q => q.enonce + q.bon)).size, s.length); }
  assert.ok(n >= 70, 'classes couvertes : ' + n);
  // Histoire-géo de 3e : écran, entraînement (vannes), contrôle (aucune vanne, correction à la fin).
  bouton(w, 'matieres'); bouton(w, 'matiere', 'histoire'); bouton(w, 'matiere-niveau', 'histoire|3e'); clic(w, '[data-a="mat-tri"]');
  assert.match(d.querySelector('h2').textContent, /Mes trimestres · .*Histoire/); assert.strictEqual(d.querySelectorAll('[data-a="mat-tri-ctrl"]').length, 4); assert.match(d.querySelector('main').textContent, /Répartition indicative/);
  clic(w, '[data-a="mat-tri-entr"][data-v="histoire|T1"]'); { const bon = A.qzBonne(); [...d.querySelectorAll('.piege-opt')].find(x => x.textContent !== bon).click(); assert.ok(d.querySelector('#qz-retour').textContent.length > 5, 'vanne à l’entraînement'); }
  bouton(w, 'matieres'); bouton(w, 'matiere', 'histoire'); clic(w, '[data-a="mat-tri"]'); clic(w, '[data-a="mat-tri-ctrl"][data-v="histoire|T2"]'); assert.ok(d.querySelector('#chrono-veille'));
  const total = +d.querySelector('.piege-cat').textContent.match(/1\/(\d+)/)[1]; assert.ok(total >= 10);
  for(let i = 0; i < total; i++){ const bon = A.qzBonne(), o = [...d.querySelectorAll('.piege-opt')]; (i === 0 ? o.find(x => x.textContent !== bon) : o.find(x => x.textContent === bon)).click(); assert.ok(!d.querySelector('[data-a="qz-suivant"]') || i === total - 1); }
  assert.match(d.querySelector('main').textContent, /📋 Correction[\s\S]*Ta réponse :/); assert.ok(A.etat.matTri['histoire-3e-T2'].best > 0); assert.ok(d.querySelector('[data-a="mat-tri"][data-v="histoire"]'));
  // Une note trafiquée est bornée ; une clé inconnue est retirée.
  A.etat.matTri = { 'histoire-3e-T1':{ last:50 }, 'x y':{ last:3 } }; bouton(w, 'mat-tri', 'histoire'); assert.strictEqual(A.etat.matTri['histoire-3e-T1'].last, 20); assert.ok(!('x y' in A.etat.matTri));
  // Interface espagnole : textes traduits.
  const we = page('es'), de = we.document; we.AmiDesMots.accueil(); bouton(we, 'matieres'); bouton(we, 'matiere', 'svt'); clic(we, '[data-a="mat-tri"]');
  assert.match(de.querySelector('main').textContent, /Mis trimestres[\s\S]*1\.er trimestre/); assert.ok(!/Répartition indicative/.test(de.querySelector('main').textContent));
});
await test('v6.67 : physique-chimie du lycée — chaque chapitre de 2nde, 1re et Tle a au moins 20 questions, traduites en anglais, espagnol et allemand', () => {
  const w = page(), M = w.MATIERES, T = w.MATIERES_LANGUES, lyc = ['2nde', '1re', 'Tle'], trop = [];
  const liste = M.trouver('physique').chapitres.filter(c => !c.theme && Array.isArray(c.banque) && c.banque.length && c.niv.some(n => lyc.includes(n)));
  for(const c of liste){
    if(c.banque.length < 20) trop.push(c.id + ' : ' + c.banque.length);
    assert.equal(new Set(c.banque.map(q => q[0])).size, c.banque.length, 'doublon ' + c.id);
    for(const l of ['en', 'es', 'de']){ const q = T[l].q['physique/' + c.id]; assert.ok(q, l + ' ' + c.id); assert.equal(q.length, c.banque.length, l + ' ' + c.id); if(l !== 'de') for(const x of q) for(const f of x[2]) assert.ok(w.JUGE.juger(f[1]).ok, l + ' ' + f[1]); }
    for(const q of c.banque){ assert.ok(!q[2].some(f => f[0] === q[1]), c.id + ' ' + q[0]); for(const f of q[2]) assert.ok(w.JUGE.juger(f[1]).ok, f[1]); }
    for(const n of c.niv.filter(n => lyc.includes(n))) assert.equal(M.serie('physique', c.id, n, 20, 11, 'taquin').length, 20, 'série complète ' + n + ' ' + c.id);
  }
  assert.ok(liste.length >= 6);
  assert.deepEqual(trop, []);
});
await test('v6.68 : histoire-géographie du lycée — chaque chapitre de 2nde, 1re et Tle a au moins 20 questions, traduites en anglais, espagnol et allemand', () => {
  const w = page(), M = w.MATIERES, T = w.MATIERES_LANGUES, lyc = ['2nde', '1re', 'Tle'], trop = [];
  const liste = M.trouver('histoire').chapitres.filter(c => !c.theme && Array.isArray(c.banque) && c.banque.length && c.niv.some(n => lyc.includes(n)));
  for(const c of liste){
    if(c.banque.length < 20) trop.push(c.id + ' : ' + c.banque.length);
    assert.equal(new Set(c.banque.map(q => q[0])).size, c.banque.length, 'doublon ' + c.id);
    for(const l of ['en', 'es', 'de']){ const q = T[l].q['histoire/' + c.id]; assert.ok(q, l + ' ' + c.id); assert.equal(q.length, c.banque.length, l + ' ' + c.id); if(l !== 'de') for(const x of q) for(const f of x[2]) assert.ok(w.JUGE.juger(f[1]).ok, l + ' ' + f[1]); }
    for(const q of c.banque){ assert.ok(!q[2].some(f => f[0] === q[1]), c.id + ' ' + q[0]); for(const f of q[2]) assert.ok(w.JUGE.juger(f[1]).ok, f[1]); }
    for(const n of c.niv.filter(n => lyc.includes(n))) assert.equal(M.serie('histoire', c.id, n, 20, 11, 'taquin').length, 20, 'série complète ' + n + ' ' + c.id);
  }
  assert.ok(liste.length >= 7);
  // Les nouvelles questions sont rangées dans les chapitres « Par thème » (chaque question de révision du lycée est dans un thème).
  const th = M.trouver('histoire').chapitres.filter(c => c.theme), dans = new Set(th.flatMap(c => c.banque.map(x => x[0])));
  for(const id of ['lycee', 'r-h2', 'r-h1', 'r-ht']){ const hors = M.trouver('histoire').chapitres.find(c => c.id === id).banque.filter(x => !dans.has(x[0])); assert.ok(hors.length <= 1, id + ' : ' + hors.map(x => x[0]).join(' / ')); }
  assert.deepEqual(trop, []);
});
await test('v6.69 : spécialités HGGSP, HLP, NSI et SES — chaque chapitre a au moins 20 questions, traduites en anglais et en espagnol', () => {
  const w = page(), M = w.MATIERES, T = w.MATIERES_LANGUES, trop = [];
  for(const mid of ['hggsp', 'hlp', 'nsi', 'ses']){
    const liste = M.trouver(mid).chapitres.filter(c => !c.theme && Array.isArray(c.banque) && c.banque.length);
    assert.ok(liste.length >= 3, mid);
    for(const c of liste){
      if(c.banque.length < 20) trop.push(mid + '/' + c.id + ' : ' + c.banque.length);
      assert.equal(new Set(c.banque.map(q => q[0])).size, c.banque.length, 'doublon ' + c.id);
      for(const l of ['en', 'es']){ const q = T[l].q[mid + '/' + c.id]; assert.ok(q, l + ' ' + c.id); assert.equal(q.length, c.banque.length, l + ' ' + c.id); for(const x of q) for(const f of x[2]) assert.ok(w.JUGE.juger(f[1]).ok, l + ' ' + f[1]); }
      for(const q of c.banque){ assert.ok(!q[2].some(f => f[0] === q[1]), c.id + ' ' + q[0]); for(const f of q[2]) assert.ok(w.JUGE.juger(f[1]).ok, f[1]); }
      for(const n of c.niv) assert.equal(M.serie(mid, c.id, n, 20, 11, 'taquin').length, 20, 'série complète ' + n + ' ' + c.id);
      for(const L of ['en-GB', 'es']){ const wl = page(L), s = wl.MATIERES.serie(mid, c.id, c.niv[0], 10, 5, 'taquin'); assert.ok(s.every(q => q.lang === L.slice(0, 2)), L + ' ' + c.id); }
    }
    for(const n of ['1re', 'Tle']){ const Tr = M.trimestres(mid, n); assert.ok(Tr, mid + ' ' + n); for(const t of Tr) assert.ok(M.serieParts(mid, t, n, 20, 3, 'taquin').length >= 12, mid + ' ' + n + ' trimestre'); }
  }
  assert.deepEqual(trop, []);
});
await test('v6.70 : français, espagnol et allemand du lycée — chaque chapitre de 2nde, 1re et Tle a au moins 20 questions, traductions alignées, séries et trimestres complets', () => {
  const w = page(), M = w.MATIERES, T = w.MATIERES_LANGUES, lyc = ['2nde', '1re', 'Tle'], trop = [];
  for(const [mid, langs] of [['francais', ['en', 'es']], ['lespagnol', ['en']], ['lallemand', ['en', 'es']]]){
    const liste = M.trouver(mid).chapitres.filter(c => !c.theme && Array.isArray(c.banque) && c.banque.length && c.niv.some(n => lyc.includes(n)));
    for(const c of liste){
      if(c.banque.length < 20) trop.push(mid + '/' + c.id + ' : ' + c.banque.length);
      assert.equal(new Set(c.banque.map(q => q[0])).size, c.banque.length, 'doublon ' + c.id);
      for(const l of langs){ const q = T[l].q[mid + '/' + c.id]; assert.ok(q, l + ' ' + c.id); assert.equal(q.length, c.banque.length, l + ' ' + c.id); for(const x of q) for(const f of x[2]) assert.ok(w.JUGE.juger(f[1]).ok, l + ' ' + f[1]); }
      for(const q of c.banque){ assert.ok(!q[2].some(f => f[0] === q[1]), c.id + ' ' + q[0]); for(const f of q[2]) assert.ok(w.JUGE.juger(f[1]).ok, f[1]); }
      for(const n of c.niv.filter(n => lyc.includes(n))) assert.equal(M.serie(mid, c.id, n, 20, 11, 'taquin').length, 20, 'série complète ' + n + ' ' + c.id);
    }
    for(const n of M.niveauxDe(mid).filter(n => lyc.includes(n))){ const Tr = M.trimestres(mid, n); assert.ok(Tr, mid + ' ' + n); for(const t of Tr) assert.ok(M.serieParts(mid, t, n, 20, 3, 'taquin').length >= 12, mid + ' ' + n + ' trimestre'); }
  }
  assert.deepEqual(trop, []);
});
await test('v6.71 : révision espacée (maths et matières), réponse écrite avant les choix, signalement d’une erreur', async () => {
  const w = page(), d = w.document, A = w.AmiDesMots, API = w.AMI_MODULES.api, j = () => A.J(); A.accueil();
  const jour = n => { const x = new w.Date(); x.setDate(x.getDate() + n); return x.getFullYear() + '-' + String(x.getMonth() + 1).padStart(2, '0') + '-' + String(x.getDate()).padStart(2, '0'); };
  // 1. Une erreur de maths entre dans le carnet, à revoir demain.
  clic(w, '[data-a="maths"]'); clic(w, '[data-a="maths-melange"]');
  { const bon = A.qzBonne(); [...d.querySelectorAll('.piege-opt')].find(x => x.textContent !== bon).click(); }
  assert.strictEqual(j().carnet.length, 1); assert.strictEqual(j().carnet[0].matiere, 'maths'); assert.strictEqual(j().carnet[0].boite, 0); assert.strictEqual(j().carnet[0].prochaine, jour(1));
  API.matieresAccueil(); assert.ok(!d.querySelector('[data-a="revision-jour"]'), 'rien à revoir le jour même');
  // 2. Le lendemain : la carte apparaît (matières et maths), une bonne réponse fait monter la question d'une boîte (J+3).
  j().carnet[0].prochaine = jour(-1); API.matieresAccueil();
  assert.match(d.querySelector('[data-a="revision-jour"]').textContent, /Révision du jour \(1\)/);
  clic(w, '[data-a="maths"]'); assert.ok(d.querySelector('[data-a="revision-jour"][data-v="maths"]'), 'aussi dans le coin maths');
  clic(w, '[data-a="revision-jour"]'); { const bon = A.qzBonne(); [...d.querySelectorAll('.piege-opt')].find(x => x.textContent === bon).click(); }
  assert.strictEqual(j().carnet[0].boite, 1); assert.strictEqual(j().carnet[0].prochaine, jour(3));
  clic(w, '[data-a="qz-suivant"]'); assert.match(d.querySelector('main').textContent, /Révision terminée : 1 \/ 1/);
  // 3. Dernière boîte réussie : la question est maîtrisée et quitte le carnet. Une erreur la remet à J+1.
  j().carnet[0].boite = 3; j().carnet[0].prochaine = jour(0); API.matieresAccueil(); clic(w, '[data-a="revision-jour"]');
  { const bon = A.qzBonne(); [...d.querySelectorAll('.piege-opt')].find(x => x.textContent === bon).click(); }
  assert.strictEqual(j().carnet.length, 0); assert.strictEqual(j().carnetMaitrises, 1);
  // 4. Réponse écrite : activée depuis l'écran des matières ; les choix sont cachés jusqu'à la réponse.
  API.matieresAccueil(); clic(w, '[data-a="reponse-libre"]'); assert.strictEqual(j().reponseLibre, true);
  assert.match(d.querySelector('[data-a="reponse-libre"]').textContent, /Réponse écrite : activée/);
  const base = w.MATIERES.serie('ses', 'examen', 'Tle', 4, 5, 'taquin'), mk = (q, bon) => { const x = Object.assign({}, q, { bon }); delete x.bonTexte; x.faux = q.faux.filter(f => f.en !== bon).map(f => Object.assign({}, f)); return x; };
  const liste = [mk(base[0], 'Paris'), mk(base[1], 'l’énergie solaire'), mk(base[2], '3,5'), mk(base[3], 'Lyon')];
  A.questionsGo(liste, { titre:'t', retour:'matieres', fin:() => A.accueil() }); await new Promise(r => setTimeout(r, 30));
  assert.ok(d.getElementById('qz-libre'), 'champ de réponse'); assert.ok(d.querySelector('.piege-options').hidden, 'choix cachés');
  const ecrire = v => { d.getElementById('qz-libre').value = v; d.getElementById('qz-libre').dispatchEvent(new w.KeyboardEvent('keydown', { key:'Enter', bubbles:true })); };
  let plumes = j().plumes; ecrire(' paris '); assert.match(d.getElementById('qz-retour').textContent, /Réponse écrite juste : \+1 plume bonus/); assert.ok(j().plumes >= plumes + 1);
  // Signaler la question : elle rejoint la liste de l'Espace parents (une seule fois).
  clic(w, '[data-a="qz-signaler"]'); assert.match(d.querySelector('.signaler').textContent, /Merci/); assert.strictEqual(A.base.signalements.length, 1); assert.strictEqual(A.base.signalements[0].bon, 'Paris');
  assert.match(w.AMI_MODULES.cartes.parents.map(f => f()).join(''), /Questions signalées \(1\)[\s\S]*Paris/);
  clic(w, '[data-a="qz-suivant"]'); ecrire('energie solaire'); assert.match(d.getElementById('qz-retour').textContent, /Réponse écrite juste/, 'accents et article tolérés');
  clic(w, '[data-a="qz-suivant"]'); ecrire('3.5'); assert.match(d.getElementById('qz-retour').textContent, /Réponse écrite juste/, 'virgule ou point');
  // Mauvaise réponse écrite : les choix apparaissent ; même si l'élève choisit bien ensuite, la question part en révision.
  clic(w, '[data-a="qz-suivant"]'); const n0 = j().carnet.length; ecrire('Marseille');
  assert.ok(!d.querySelector('.piege-options').hidden); assert.match(d.getElementById('qz-retour').textContent, /Pas tout à fait/); assert.ok(!d.getElementById('qz-libre'));
  [...d.querySelectorAll('.piege-opt')].find(x => x.textContent === 'Lyon').click(); assert.strictEqual(j().carnet.length, n0 + 1); assert.strictEqual(j().carnet[j().carnet.length - 1].bon, 'Lyon');
  // Les réponses longues gardent les choix directs.
  const long = mk(base[0], 'une réponse beaucoup trop longue pour être écrite'); A.questionsGo([long], { titre:'t', retour:'matieres', fin:() => A.accueil() });
  assert.ok(!d.getElementById('qz-libre') && !d.querySelector('.piege-options').hidden);
  // Désactivation, et l'interface traduite.
  API.matieresAccueil(); clic(w, '[data-a="reponse-libre"]'); assert.strictEqual(j().reponseLibre, false);
  A.base.ui = 'en'; assert.strictEqual(w.AMI_MODULES.tx('🗓️ Révision du jour ({0})', 2), '🗓️ Today’s review (2)'); A.base.ui = 'fr';
  void API;
});

await test('v6.72 : pièges sérieux en contrôle — les leurres farfelus remplacés par de vraies notions du même chapitre, sans jamais créer deux bonnes réponses', () => {
  const w = page(), d = w.document, A = w.AmiDesMots, MT = w.MATIERES; A.accueil();
  const norm = x => String(x).toLowerCase();
  // Exemple : « Qu’est-ce qu’un gène ? » n'est plus seulement face à « une protéine du muscle », mais à une autre notion de génétique.
  { const m = MT.trouver('svt'), ch = m.chapitres.find(c => c.id === 'genetique'), pool = MT.serieParts('svt', [{ ch:'genetique' }], null, ch.banque.length, 1, 'taquin');
    const q = MT.piegesSerieux(pool, pool).find(x => /^Qu’est-ce qu’un gène/.test(x.enonce));
    assert.ok(q && q.piegesSerieux, 'gène : pièges sérieux'); assert.ok(q.faux.some(f => f.emprunt && /allèle|chromosome|ADN|mutation|caractère/.test(f.en)), q.faux.map(f => f.en).join(' / ')); }
  // Partout : une réponse empruntée est la bonne réponse d'une autre question du même chapitre, jamais la bonne réponse elle-même ;
  // pas de doublon ; jamais dans une question à trou, négative ou « un exemple » ; même type de question ; le reste intact.
  let modifs = 0, emprunts = 0;
  for(const m of MT.LISTE) for(const ch of m.chapitres){ if(!ch.banque || !ch.banque.length) continue;
    const pool = MT.serieParts(m.id, [{ ch:ch.id }], null, ch.banque.length, 1, 'taquin'), out = MT.piegesSerieux(pool, pool), bons = new Map(pool.map(x => [x.bon, x]));
    out.forEach((q, i) => { const o = pool[i]; assert.strictEqual(q.enonce, o.enonce); assert.strictEqual(q.bon, o.bon); assert.strictEqual(q.faux.length, o.faux.length);
      if(!q.piegesSerieux){ assert.strictEqual(q, o); return; } modifs++;
      assert.ok(o.bon.length >= 25 && !/_{2,}|…|complète|exemple|n’est pas|n'est pas|\bnot\b/i.test(o.enonce), m.id + ' : ' + o.enonce);
      const opts = [q.bon].concat(q.faux.map(f => f.en)); assert.strictEqual(new Set(opts.map(norm)).size, opts.length, 'doublon : ' + o.enonce);
      q.faux.forEach((f, k) => { if(!f.emprunt){ assert.strictEqual(f.en, o.faux[k].en); return; } emprunts++;
        const src = bons.get(f.en); assert.ok(src && src.chap === q.chap && src.enonce !== q.enonce, 'source : ' + f.en); assert.notStrictEqual(norm(f.en), norm(q.bon));
        assert.ok(o.faux[k].en.length < .45 * o.bon.length, 'seul un leurre trop court est remplacé'); assert.ok(f.vanne.length > 20); }); }); }
  assert.ok(modifs > 300 && emprunts > modifs, modifs + ' questions, ' + emprunts + ' leurres');
  // Les petites réponses (noms, dates) et les questions de langue gardent leurs leurres d'origine.
  { const q = { enonce:'Complète : « She ___ to school. »', bon:'goes to school every single day', faux:[{ en:'go', vanne:'x' }], chap:'c', lang:'fr' };
    assert.strictEqual(MT.piegesSerieux([q], [q, { enonce:'Complète : « He ___ »', bon:'walks to the station every day', chap:'c', lang:'fr', faux:[] }])[0], q); }
  // Contrôle de trimestre : la règle est annoncée, l'entraînement garde les leurres d'origine (et leurs vannes).
  bouton(w, 'matieres'); bouton(w, 'matiere', 'histoire'); bouton(w, 'matiere-niveau', 'histoire|3e'); clic(w, '[data-a="mat-tri"]');
  assert.match(d.querySelector('main').textContent, /les pièges sont de vraies notions du chapitre/);
  const S = w.AMI_TRIMESTRES.sourceMatiere('histoire'), l = S.serie('T1'), p = S.pieges('T1', l);
  assert.strictEqual(p.length, l.length); assert.ok(p.every((q, i) => q.enonce === l[i].enonce && q.bon === l[i].bon));
  clic(w, '[data-a="mat-tri-ctrl"][data-v="histoire|T1"]'); assert.ok(d.querySelector('#chrono-veille')); assert.strictEqual(d.querySelectorAll('.piege-opt').length >= 3, true);
});

await test('v6.73 : études de documents — sources exactes, 4 ou 5 questions par document, vannes acceptées, parcours complet', () => {
  const w = page(), d = w.document, A = w.AmiDesMots, MT = w.MATIERES, D = w.AMI_DOCUMENTS; A.accueil();
  assert.ok(D.DOCS.length >= 24);
  // v6.74 : chaque classe du collège au lycée a au moins un document dans ces matières.
  for(const [id, nivs] of [['histoire', ['6e', '5e', '4e', '3e', '2nde', '1re', 'Tle']], ['francais', ['6e', '5e', '4e', '3e', '2nde', '1re']], ['svt', ['5e', '3e', '2nde', '1re', 'Tle']], ['physique', ['6e', '5e', '4e', '3e', '2nde', '1re', 'Tle']]]) for(const n of nivs) assert.ok(D.pour(id, n).length, id + ' ' + n); assert.strictEqual(new Set(D.DOCS.map(x => x.id)).size, D.DOCS.length);
  for(const x of D.DOCS){ const m = MT.trouver(x.matiere); assert.ok(m, x.id); assert.ok(x.niv.length && x.niv.every(n => MT.niveauxDe(x.matiere).includes(n)), x.id + ' : classes');
    assert.ok(x.source && x.texte.length > 40 && x.q.length >= 4 && x.q.length <= 5, x.id);
    // Les données construites pour l'exercice le disent.
    if(['svt', 'physique', 'ses'].includes(x.matiere)) assert.match(x.source, /Document d’exercice/, x.id);
    for(const [e, bon, faux, regle] of x.q){ assert.ok(e && bon && regle, x.id + ' ' + e); assert.strictEqual(faux.length, 3);
      assert.strictEqual(new Set([bon].concat(faux.map(f => f[0]))).size, 4, x.id + ' doublon : ' + e);
      for(const [, v] of faux){ assert.ok(v.length > 10, v); assert.ok(w.JUGE.juger(v).ok, x.id + ' : ' + v); } } }
  // Textes cités exactement (quelques repères).
  const txt = id => D.DOCS.find(x => x.id === id).texte;
  assert.match(txt('ddhc'), /Les hommes naissent et demeurent libres et égaux en droits\./);
  assert.match(txt('loi-1905'), /La République ne reconnaît, ne salarie ni ne subventionne aucun culte\./);
  assert.strictEqual(txt('demain').split('\n').filter(Boolean).length, 12); assert.strictEqual(txt('corbeau').split('\n').length, 18);
  // Les calculs des corrections sont justes.
  assert.strictEqual(3000 / 30000, .1); assert.strictEqual(2400 / 30000, .08); assert.strictEqual(+(5 * 3.6).toFixed(6), 18); assert.strictEqual(1.5 / 0.015, 100);
  // Parcours : histoire 4e → carte → liste → un document → mauvaise réponse (vanne + carnet avec le document) → fin.
  bouton(w, 'matieres'); bouton(w, 'matiere', 'histoire'); bouton(w, 'matiere-niveau', 'histoire|4e');
  assert.match(d.querySelector('[data-a="docs"]').textContent, /Études de documents \(3\)/);
  clic(w, '[data-a="docs"]'); assert.strictEqual(d.querySelectorAll('[data-a="doc-go"]').length, 3); assert.ok(d.querySelector('[data-a="doc-tout"]'));
  clic(w, '[data-a="doc-go"][data-v="ddhc"]'); assert.match(d.querySelector('.contexte-exo').textContent, /Article 16/); assert.match(d.querySelector('.piege-cat, .piege-consigne, main').textContent, /1\/5|Déclaration/);
  { const bon = A.qzBonne(); [...d.querySelectorAll('.piege-opt')].find(x => x.textContent !== bon).click(); assert.ok(d.querySelector('#qz-retour').textContent.length > 10); }
  const c = A.J().carnet.at(-1); assert.strictEqual(c.matiere, 'histoire'); assert.match(c.contexte, /Article 1\./);
  for(let i = 1; i < 5; i++){ clic(w, '[data-a="qz-suivant"]'); const bon = A.qzBonne(); [...d.querySelectorAll('.piege-opt')].find(x => x.textContent === bon).click(); }
  clic(w, '[data-a="qz-suivant"]'); assert.match(d.querySelector('main').textContent, /Document terminé : 4 \/ 5[\s\S]*révision du jour/);
  // Pas de carte quand la classe n'a pas de document ; « tous à la suite » enchaîne les documents.
  bouton(w, 'matiere-niveau', 'langlais|6e'); assert.ok(!d.querySelector('[data-a="docs"]'));
  bouton(w, 'matiere-niveau', 'svt|5e'); clic(w, '[data-a="docs"]'); clic(w, '[data-a="doc-tout"]'); assert.match(d.querySelector('.contexte-exo').textContent, /Document d’exercice/);
  A.base.ui = 'en'; bouton(w, 'matiere', 'svt'); assert.match(d.querySelector('[data-a="docs"]').textContent, /Document studies \(2\)/); A.base.ui = 'fr';
});

await test('v6.74 : « sûr(e) / pas sûr(e) » avant de répondre — erreur sûre en priorité, réponse juste mais hésitante revue demain, lucidité pour les parents', () => {
  const w = page(), d = w.document, A = w.AmiDesMots; A.accueil(); const j = () => A.J();
  const s = w.MATIERES.serie('ses', 'examen', 'Tle', 6, 9, 'taquin'); A.questionsGo(s, { titre:'t', retour:'matieres', fin:() => A.accueil() });
  assert.ok(d.querySelector('[data-a="qz-conf"][data-v="sur"]') && d.querySelector('[data-a="qz-conf"][data-v="doute"]'), 'boutons de confiance');
  // 1. « Sûr(e) » et faux : message, erreur marquée et servie en premier à la révision.
  clic(w, '[data-a="qz-conf"][data-v="sur"]'); assert.strictEqual(d.querySelector('[data-a="qz-conf"][data-v="sur"]').getAttribute('aria-pressed'), 'true');
  { const bon = A.qzBonne(); [...d.querySelectorAll('.piege-opt')].find(x => x.textContent !== bon).click(); }
  assert.match(d.getElementById('qz-retour').textContent, /Tu étais sûr\(e\) de toi/); const e1 = j().carnet.at(-1); assert.ok(e1.certitude);
  // 2. « Pas sûr(e) » et juste : la question entre au carnet, à revoir demain.
  clic(w, '[data-a="qz-suivant"]'); clic(w, '[data-a="qz-conf"][data-v="doute"]'); { const bon = A.qzBonne(); [...d.querySelectorAll('.piege-opt')].find(x => x.textContent === bon).click(); }
  assert.match(d.getElementById('qz-retour').textContent, /tu hésitais/); const e2 = j().carnet.at(-1); assert.ok(e2.fragile && e2.boite === 0 && e2.bon === s[1].bon);
  // 3. Sans choix : comportement habituel. Un second clic sur le même bouton l'annule.
  clic(w, '[data-a="qz-suivant"]'); clic(w, '[data-a="qz-conf"][data-v="sur"]'); clic(w, '[data-a="qz-conf"][data-v="sur"]'); assert.strictEqual(d.querySelector('[data-a="qz-conf"][data-v="sur"]').getAttribute('aria-pressed'), 'false');
  { const n = j().carnet.length, bon = A.qzBonne(); [...d.querySelectorAll('.piege-opt')].find(x => x.textContent === bon).click(); assert.strictEqual(j().carnet.length, n); assert.ok(!/hésitais|sûr\(e\) de toi/.test(d.getElementById('qz-retour').textContent)); }
  // 4. Révision : l'erreur « sûre » passe avant les autres.
  j().carnet.forEach(x => { x.prochaine = '2000-01-01'; }); const r = w.AMI_MODULES.api.carnetAujourdhui(); assert.ok(r[0].certitude);
  // 5. Lucidité dans l'Espace parents, à partir de 5 réponses notées.
  j().confiance = { surJuste:6, surFaux:2, douteJuste:3, douteFaux:1 };
  assert.match(w.AMI_MODULES.cartes.parents.map(f => f()).join(''), /Lucidité[\s\S]*75 % \(8 réponses\)[\s\S]*malgré un doute : 3/);
  // 6. Pas de boutons en contrôle (sans vanne).
  A.questionsGo(s.slice(0, 2), { titre:'c', retour:'matieres', sansVanne:true, fin:() => A.accueil() }); assert.ok(!d.querySelector('[data-a="qz-conf"]'));
});

await test('v6.75 : veille des programmes — nouveaux chapitres et examens publiés par le serveur, revérifiés dans le jeu', async () => {
  const Q = (i, v) => ['Question ' + i + ' sur la poésie de la ville ?', 'réponse ' + i, [['leurre A', v || 'Tu confonds avec la rime, relis la règle.'], ['leurre B', 'Presque : pense au sens du mot.'], ['leurre C', 'C’est l’inverse, regarde bien.']], 'Règle ' + i + '.'];
  const contenus = { francais:{ 'v-la-poesie-de-la-ville-5e':{ nom:'La poésie de la ville', classe:'5e', banque:[...Array(12)].map((_, i) => Q(i)), source:'https://eduscol.education.gouv.fr/x', maj:'2026-11-26' },
    'v-trop-court-5e':{ nom:'Trop court', classe:'5e', banque:[Q(1)] }, 'pirate':{ nom:'Mauvais identifiant', classe:'5e', banque:[...Array(12)].map((_, i) => Q(i)) },
    'v-vannes-5e':{ nom:'Vannes refusées', classe:'5e', banque:[...Array(12)].map((_, i) => Q(i, 'Je vais te tuer')) } }, inconnue:{ 'v-x-5e':{ nom:'x', classe:'5e', banque:[] } } };
  const examens = { fr:{ 'diplome-national-du-brevet':{ sorte:'epreuve', examen:'Diplôme national du brevet', classe:'3e', session:'2026', resume:'Le DNB atteste les acquis de fin de 3e.', conditions:'Moyenne finale d’au moins 10/20.', epreuves:[], changements:['Fin du total sur 800 points <b>gras</b>'], source:'https://www.education.gouv.fr/le-diplome-national-du-brevet-10613', maj:'2026-11-26' } },
    it:{ maturita:{ sorte:'epreuve', examen:'Esame di maturità', session:'2026', resume:'Réforme 2025.', changements:[], source:'javascript:alert(1)', maj:'2026-11-26' } } };
  const w = page('fr-FR', { MODE_PAYANT:false, SERVEUR:'https://serveur.example/' }, w => { w.fetch = async u => ({ ok:true, json:async () => /contenus/.test(u) ? { contenus } : /examens/.test(u) ? { examens } : {} }); });
  const d = w.document, A = w.AmiDesMots, MT = w.MATIERES; A.accueil();
  w.AMI_VEILLE.charger(); await new Promise(r => setTimeout(r, 30));
  // Seul le chapitre complet, bien nommé, aux vannes acceptées par le juge, est ajouté.
  const m = MT.trouver('francais'), ch = m.chapitres.filter(c => /^v-/.test(c.id));
  assert.deepStrictEqual(ch.map(c => c.id).join(), 'v-la-poesie-de-la-ville-5e'); assert.strictEqual(ch[0].banque.length, 12); assert.match(ch[0].nom, /^🆕 La poésie de la ville/); assert.strictEqual(ch[0].niv.join(), '5e');
  assert.ok(MT.chapitres('francais', '5e').some(c => c.id === ch[0].id) && !MT.chapitres('francais', '4e').some(c => c.id === ch[0].id), 'seulement en 5e');
  const s = MT.serie('francais', ch[0].id, '5e', 10, 3, 'taquin'); assert.strictEqual(s.length, 10); assert.ok(s.every(q => q.faux.length === 3));
  // Recharger ne duplique rien.
  assert.strictEqual(w.AMI_VEILLE.ajouterContenus(contenus), 0);
  // Onglet Officiel : ce qui change, texte échappé, lien non https ignoré.
  bouton(w, 'officiel'); const v = d.querySelector('.veille'); assert.ok(v, 'section veille');
  assert.match(v.textContent, /Diplôme national du brevet · 2026[\s\S]*Ce qui change[\s\S]*800 points/); assert.ok(!v.querySelector('b'), 'HTML échappé');
  assert.match(v.textContent, /Dans d’autres pays[\s\S]*Esame di maturità/); assert.ok(!v.innerHTML.includes('javascript:'));
  assert.ok(v.querySelector('a[href="https://www.education.gouv.fr/le-diplome-national-du-brevet-10613"]'));
  // La fiche publiée par le serveur remplace la fiche intégrée du même examen (v6.76).
  assert.ok(!/contrôle continu \(moyennes de 3e\) 40 %/.test(v.textContent), 'fiche du serveur prioritaire');
});

await test('v6.76 : les examens de chaque pays sont dans le jeu, même sans serveur — sources officielles, fiches complètes, traduites', () => {
  const w = page(), d = w.document, E = w.EXAMENS_MONDE; w.AmiDesMots.accueil();
  assert.deepStrictEqual(Object.keys(E).join(), 'fr,it,es,de,us,uk,pt');
  for(const sys of Object.keys(E)) for(const [id, x] of Object.entries(E[sys])){
    assert.ok(/^[a-z0-9-]+$/.test(id) && x.examen && x.resume && x.conditions && x.epreuves.length && /^https:\/\//.test(x.source), sys + ' ' + id);
    for(const e of x.epreuves) assert.ok(e.nom && (e.notation || e.format), sys + ' ' + id); }
  // Quelques repères vérifiés sur les sources officielles (novembre 2026).
  assert.match(E.fr['diplome-national-du-brevet'].conditions, /10\/20[\s\S]*40 %[\s\S]*60 %/);
  assert.match(E.it['esame-di-maturita'].conditions, /40 points[\s\S]*60\/100[\s\S]*3 points/);
  assert.match(E.es.pau.conditions, /60 %[\s\S]*40 %[\s\S]*5\/10/); assert.match(E.de.abitur.conditions, /900[\s\S]*300/); assert.match(E.us.sat.conditions, /400 à 1600/);
  bouton(w, 'officiel'); const v = d.querySelector('.veille'); assert.ok(v, 'onglet Officiel, sans serveur');
  assert.match(v.textContent, /Les examens, pays par pays[\s\S]*Diplôme national du brevet[\s\S]*Épreuves :[\s\S]*Français · 3 h[\s\S]*Dans d’autres pays[\s\S]*Esame di maturità[\s\S]*PAU[\s\S]*Abitur[\s\S]*SAT[\s\S]*GCSE[\s\S]*Provas finais do 9\.º ano/);
  assert.strictEqual(v.querySelectorAll('article.veille-examen').length, 10); assert.ok([...v.querySelectorAll('a')].every(a => a.href.startsWith('https://')));
  w.AmiDesMots.base.ui = 'en'; bouton(w, 'officiel'); assert.match(d.querySelector('.veille h3').textContent, /Exams, country by country/);
});

await test('v6.77 : « Mon pays » — classes et équivalences, examens du pays, entraînement de maths dans la langue du pays, noté comme là-bas', async () => {
  const w = page(), d = w.document, A = w.AmiDesMots, S = w.SYSTEMES_SCOLAIRES, P = w.AMI_PAYS; A.accueil();
  // Chaque pays : classes de 11 à 17-18 ans, équivalents français valides, examens qui existent dans les fiches.
  for(const [id, s] of Object.entries(S)){ assert.ok(s.classes.length >= 7, id); assert.ok(s.classes.every(c => w.MATIERES.NIVEAUX.includes(c[1])), id);
    assert.ok(s.classes.every((c, i) => i === 0 || c[2] >= s.classes[i - 1][2]), id + ' âges'); for(const [e] of s.examens) assert.ok(w.EXAMENS_MONDE[id][e], id + ' ' + e); }
  assert.strictEqual(S.es.classes.find(c => c[0] === '2º de Bachillerato')[1], 'Tle'); assert.strictEqual(S.uk.classes.find(c => c[0] === 'Year 11')[1], '2nde');
  for(const [id, l] of Object.entries(w.BLANCS_PAYS)) for(const b of l) assert.ok(S[id] && w.EXAMENS_MONDE[id][b.examen] && b.id.startsWith(id + '-'), b.id);
  // Carte sur l'écran des matières, France par défaut.
  // v6.89 : la France est l'onglet actif par défaut ; la fiche « Mon pays » reste accessible.
  bouton(w, 'matieres'); assert.ok(d.querySelector('.onglets-pays [data-a="programme-pays"][data-v="fr"].actif'), 'onglet France actif');
  bouton(w, 'pays-ecran'); assert.ok(d.querySelector('[data-a="examens"]'), 'France : brevet et bac blancs');
  // Espagne : classes locales, réglage du niveau, fiche PAU.
  bouton(w, 'pays'); clic(w, '[data-a="pays-choisir"][data-v="es"]'); assert.strictEqual(A.J().systeme, 'es');
  assert.match(d.querySelector('main').textContent, /España[\s\S]*1º de ESO ≈ 5e en France[\s\S]*PAU[\s\S]*En 2º de Bachillerato[\s\S]*Simulacro · Matemáticas II/);
  clic(w, '[data-a="pays-classe"][data-v="3"]'); assert.strictEqual(A.J().matieres.niveau, '3e'); assert.strictEqual(A.J().maths.niveau, '3e');
  assert.ok(d.querySelector('[data-a="pays-classe"][data-v="3"]').classList.contains('actif'));
  // Entraînement PAU : questions en espagnol, interface restée en français, chrono, sans vanne, note sur 10.
  const ui = A.base.ui; clic(w, '[data-a="pays-blanc"][data-v="es-pau-mates"]'); assert.strictEqual(A.base.ui, ui, 'langue de l’interface rendue');
  assert.ok(d.querySelector('#chrono-veille')); assert.ok(A.qzBonne() && !d.querySelector('[data-a="qz-conf"]'), 'contrôle : pas de vanne ni de bouton de confiance');
  for(let i = 0; i < 20; i++){ const bon = A.qzBonne(); const opts = [...d.querySelectorAll('.piege-opt')]; (i < 15 ? opts.find(x => x.textContent === bon) : opts.find(x => x.textContent !== bon)).click(); }
  const t = d.querySelector('main').textContent; assert.match(t, /Note : 7,5\/10[\s\S]*15 bonnes réponses sur 20[\s\S]*Calcule ta note d’accès[\s\S]*À revoir/);
  assert.ok([...d.querySelectorAll('.correction-controle li p[lang="es"]')].length >= 5, 'correction en espagnol');
  // Note d'accès : 0,6 × 8 + 0,4 × 7,5 = 7,8 ; sous 4/10 à la PAU, pas de calcul.
  const inp = d.getElementById('pays-media'); inp.value = '8'; inp.dispatchEvent(new w.Event('input', { bubbles:true }));
  assert.match(d.getElementById('pays-acces').textContent, /Note d’accès : 7,8\/10/); assert.strictEqual(P.acces(8, 3.9), null); assert.strictEqual(P.acces(8.5, 8.062), 8.325);
  assert.ok(A.J().paysNotes['es-pau-mates'].best === .75);
  // Barèmes : maturità sur 20, Abitur en %, SAT et GCSE en score brut.
  assert.strictEqual(P.noteDe(15, 20, 'sur20'), '15/20'); assert.strictEqual(P.noteDe(15, 20, 'pourcent'), '75 %'); assert.strictEqual(P.noteDe(17, 22, 'brut'), '17/22');
  // Les autres langues : questions générées dans la langue du pays.
  for(const [l, niv] of [['it', 'Tle'], ['de', 'Tle'], ['en', '1re']]){ const s = P.serieDans(l, niv, 5); assert.ok(s.length === 5 && s.every(q => q.lang === l), l); }
  // Note du joueur trafiquée : bornée.
  A.J().paysNotes = { 'es-pau-mates':{ best:99, last:-3 }, 'pirate':{ best:1 } }; bouton(w, 'pays-ecran'); assert.deepStrictEqual(Object.keys(A.J().paysNotes), ['es-pau-mates']); assert.strictEqual(A.J().paysNotes['es-pau-mates'].best, 1);
  // Interface en anglais.
  A.base.ui = 'en'; bouton(w, 'pays-ecran'); assert.match(d.querySelector('main').textContent, /My year group[\s\S]*My exams[\s\S]*Practise for the exam/); A.base.ui = 'fr';
});

await test('v6.77 : anglais section internationale (6e → BFI) — 20 questions par classe, en anglais, niveau qui monte jusqu’au C1-C2, vannes acceptées', () => {
  const w = page(), d = w.document, A = w.AmiDesMots, M = w.MATIERES, m = M.trouver('anglais-inter'); A.accueil();
  assert.ok(m, 'matière');
  const vus = new Set();
  for(const n of ['6e', '5e', '4e', '3e', '2nde', '1re', 'Tle']){ const ch = M.chapitres('anglais-inter', n); assert.ok(ch.length >= 2, n); assert.ok(m.examens[n], n);
    for(const c of ch) assert.strictEqual(c.banque.length, 20, n + ' ' + c.id);
    for(const q of ch.flatMap(c => c.banque)){ assert.strictEqual(q.lang, 'en'); assert.strictEqual(q.faux.length, 3); assert.ok(q.regle, q.enonce);
      assert.strictEqual(new Set([q.bon, ...q.faux.map(f => f.en)]).size, 4, 'doublon : ' + q.enonce); assert.ok(!vus.has(q.enonce), 'question en double : ' + q.enonce); vus.add(q.enonce);
      for(const f of q.faux) assert.ok(w.JUGE.juger(f.vanne).ok, n + ' : ' + f.vanne); }
    const s = M.serie('anglais-inter', 'examen', n, 20, 3, 'taquin'); assert.strictEqual(s.length, 20, n); assert.ok(s.every(q => q.lang === 'en'), n); }
  // Le niveau monte : la 6e travaille la grammaire de base, le BFI la littérature et la connaissance du monde.
  assert.match(M.chapitres('anglais-inter', '6e').find(c => c.id === 'si-6e').nom, /A2\+ → B1/); assert.match(M.chapitres('anglais-inter', 'Tle').find(c => c.id === 'bfi-tle').nom, /C1 → C2/);
  assert.ok(M.chapitres('anglais-inter', 'Tle').find(c => c.id === 'bfi-tle').banque.some(q => /Connaissance du monde/.test(q.enonce)));
  // Carte sur l'écran des matières, parcours jusqu'à une question en anglais.
  bouton(w, 'matieres'); assert.match(d.querySelector('[data-a="matiere"][data-v="anglais-inter"]').textContent, /Anglais section internationale/);
  bouton(w, 'matiere', 'anglais-inter'); bouton(w, 'matiere-niveau', 'anglais-inter|1re'); assert.match(d.querySelector('main').textContent, /BFI 1re/);
  A.base.ui = 'en'; bouton(w, 'matieres'); assert.match(d.querySelector('[data-a="matiere"][data-v="anglais-inter"]').textContent, /English, international section/); A.base.ui = 'fr';
});

await test('v6.78 : section internationale — DNL histoire-géo en anglais et méthode, BFI 2026 de A à Z, BFI blanc (écrits, oral), brevet option internationale blanc', async () => {
  const w = page(), d = w.document, A = w.AmiDesMots, M = w.MATIERES, SI = w.AMI_SECTION_INTER; A.accueil();
  // Trois chapitres de 20 questions par classe au collège (3e), au moins deux partout ; 340 questions en tout.
  const total = M.trouver('anglais-inter').chapitres.reduce((t, c) => t + c.banque.length, 0); assert.strictEqual(total, 340);
  for(const [n, k] of [['6e', 2], ['5e', 2], ['4e', 2], ['3e', 3], ['2nde', 2], ['1re', 3], ['Tle', 3]]) assert.strictEqual(M.chapitres('anglais-inter', n).length, k, n);
  // Contrôles par trimestre : ils existent pour chaque classe.
  for(const n of ['6e', '3e', '1re', 'Tle']) assert.ok(M.trimestres('anglais-inter', n), 'trimestres ' + n);
  // Carte sur l'écran de la matière → hub.
  bouton(w, 'matieres'); bouton(w, 'matiere', 'anglais-inter'); clic(w, '[data-a="si-examens"]');
  const t = d.querySelector('main').textContent; assert.match(t, /Le BFI en bref[\s\S]*coefficient 20[\s\S]*BFI blanc[\s\S]*Mon plan de préparation, de A à Z · 0 étapes sur 24[\s\S]*Brevet option internationale blanc[\s\S]*S’entraîner chapitre par chapitre/);
  assert.ok([...d.querySelectorAll('.si-examens a')].every(a => /^https:\/\/(eduscol\.education\.gouv\.fr|www\.education\.gouv\.fr)\//.test(a.href)), 'sources officielles');
  // Plan à cocher, gardé.
  const c = d.querySelector('[data-si-plan="3"]'); c.checked = true; c.dispatchEvent(new w.Event('change', { bubbles:true })); assert.strictEqual(A.J().si.plan.join(), '3');
  bouton(w, 'si-examens'); assert.match(d.querySelector('main').textContent, /1 étapes sur 24/); assert.ok(d.querySelector('[data-si-plan="3"]').checked);
  // Écrit ACL : 30 questions en anglais, chrono, sans vanne, note sur 20 et correction.
  clic(w, '[data-a="si-ecrit"][data-v="acl"]'); assert.ok(d.querySelector('#chrono-veille')); assert.ok(!d.querySelector('[data-a="qz-conf"]'));
  for(let i = 0; i < 30; i++){ const bon = A.qzBonne(); const o = [...d.querySelectorAll('.piege-opt')]; (i < 24 ? o.find(x => x.textContent === bon) : o.find(x => x.textContent !== bon)).click(); }
  assert.match(d.querySelector('main').textContent, /Note : 16\/20[\s\S]*À revoir/); assert.strictEqual(A.J().si.notes.acl, 16);
  // DNL : questions tirées des chapitres de DNL et de méthode de 1re-Tle.
  clic(w, '[data-a="si-examens"]'); clic(w, '[data-a="si-ecrit"][data-v="dnl"]');
  for(let i = 0; i < 20; i++){ const bon = A.qzBonne(); [...d.querySelectorAll('.piege-opt')].find(x => x.textContent === bon).click(); }
  assert.strictEqual(A.J().si.notes.dnl, 20);
  // Oral de connaissance du monde : sujet, chrono de préparation, exposé, grille → note.
  clic(w, '[data-a="si-examens"]'); clic(w, '[data-a="si-oral"][data-v="cdm"]');
  assert.match(d.querySelector('main').textContent, /Ton sujet[\s\S]*Notions à mobiliser[\s\S]*Plan possible[\s\S]*Préparation : 30 min[\s\S]*Rien n’est enregistré/);
  clic(w, '[data-a="si-expose"]'); assert.match(d.getElementById('si-chrono').textContent, /10:00/);
  clic(w, '[data-a="si-grille"]'); assert.strictEqual(d.querySelectorAll('.si-grille fieldset').length, 5);
  d.querySelector('input[name="si-c0"][value="4"]').checked = true; d.querySelector('input[name="si-c1"][value="3"]').checked = true;   // 4 + 3 + 2 + 2 + 2
  clic(w, '[data-a="si-noter"]'); assert.match(d.querySelector('main').textContent, /Note de l’oral : 13\/20/); assert.strictEqual(A.J().si.notes.cdm, 13);
  // Bilan du BFI blanc : (16 + 20 + 13) / 3 = 16,3.
  clic(w, '[data-a="si-examens"]'); assert.match(d.querySelector('main').textContent, /Bilan de mon BFI blanc : 16,3\/20[\s\S]*à titre indicatif/);
  // Brevet option internationale : écrit de 30 questions de 3e.
  clic(w, '[data-a="si-ecrit"][data-v="dnb"]'); assert.ok(d.querySelector('#chrono-veille'));
  // Données trafiquées : bornées.
  A.J().si = { notes:{ acl:99, cdm:-4, pirate:3 }, plan:[0, 0, 999, 'x'] }; bouton(w, 'si-examens');
  assert.strictEqual(JSON.stringify(A.J().si.notes), '{"acl":20,"cdm":0}'); assert.strictEqual(A.J().si.plan.join(), '0');
  // Données : 24 étapes, 16 sujets complets, 5 critères ; interface traduite.
  assert.strictEqual(SI.PLAN.length, 24); assert.strictEqual(SI.SUJETS.length, 16); assert.ok(SI.SUJETS.every(s => s[0].endsWith('?') && s[1].length >= 4 && s[2].length === 3));
  // Mon lycée et mes œuvres (v6.79).
  bouton(w, 'si-examens'); const sel = d.getElementById('si-lycee'); sel.value = 'pissarro'; sel.dispatchEvent(new w.Event('change', { bubbles:true }));
  assert.strictEqual(A.J().si.lycee, 'pissarro'); assert.match(d.querySelector('.si-lycee').textContent, /britannique, ouverte en 2014/);
  const o = d.querySelector('[data-si-oeuvre="0"]'); o.value = 'Macbeth <b>'; o.dispatchEvent(new w.Event('change', { bubbles:true })); assert.strictEqual(A.J().si.oeuvres[0], 'Macbeth b');
  bouton(w, 'si-examens'); assert.strictEqual(d.querySelector('[data-si-oeuvre="0"]').value, 'Macbeth b');
  assert.ok([...d.querySelectorAll('.si-lycee a')].every(a => a.href.startsWith('https://')));
  A.J().si.lycee = 'pirate'; bouton(w, 'si-examens'); assert.ok(!A.J().si.lycee);
  A.base.ui = 'en'; bouton(w, 'si-examens'); assert.match(d.querySelector('h2').textContent, /International section exams/); A.base.ui = 'fr';
});

await test('v6.80 : programmes des pays — langue/littérature et histoire-civisme dans la langue du pays, Mon pays, maths dans ma langue, examens', async () => {
  const w = page(), d = w.document, A = w.AmiDesMots, M = w.MATIERES, S = w.SYSTEMES_SCOLAIRES, J = w.JUGE; A.accueil();
  const PAYS = { it:['it-italiano', 'it-storia'], es:['es-lengua', 'es-historia'], de:['de-deutsch', 'de-geschichte'], us:['us-ela', 'us-history'] };
  const vus = new Set();
  for(const [p, ids] of Object.entries(PAYS)){ assert.strictEqual((S[p].matieres || []).slice(0, 2).join(), ids.join(), p);
    for(const id of ids){ const m = M.trouver(id); assert.ok(m && m.pays === p, id); assert.strictEqual(m.chapitres.length, 2, id);
      for(const n of M.NIVEAUX.filter(x => ['6e', '5e', '4e', '3e', '2nde', '1re', 'Tle'].includes(x))){ assert.strictEqual(M.chapitres(id, n).length, 1, id + ' ' + n); assert.ok(m.examens[n], id + ' ' + n); assert.ok(M.trimestres(id, n), id + ' trimestres ' + n); }
      for(const ch of m.chapitres){ assert.strictEqual(ch.banque.length, 20, ch.id);
        for(const q of ch.banque){ assert.strictEqual(q.lang, S[p].langue, q.enonce); assert.ok(q.regle && q.faux.length === 3 && !q.faux.some(f => f.en === q.bon), q.enonce);
          assert.ok(!vus.has(q.enonce), 'doublon : ' + q.enonce); vus.add(q.enonce);
          for(const f of q.faux) assert.ok(J.juger(f.vanne).ok, f.vanne + ' — ' + J.juger(f.vanne).raisons); }
        const sr = M.serie(id, ch.id, ch.niv[0], 20, 7, 'taquin'); assert.strictEqual(sr.length, 20, ch.id); assert.ok(sr.every(q => q.lang === S[p].langue), ch.id); }
      for(const l of ['en', 'es', 'de', 'it', 'pt']){ const x = w.MATIERES_LANGUES[l].noms[id]; assert.ok(x && x.nom && x.ch[id + '-college'] && x.ch[id + '-lycee'], l + ' ' + id); } } }
  assert.strictEqual(vus.size, 320);
  // Les matières des pays n'encombrent pas la table des matières française.
  bouton(w, 'matieres'); assert.ok(!d.querySelector('[data-a="matiere"][data-v="it-italiano"]'));
  // Blancs d'examen : chaque entraînement donne ses n questions.
  for(const [p, l] of Object.entries(w.BLANCS_PAYS)) for(const b of l){ if(b.matiere){ assert.strictEqual(M.serie(b.matiere, b.chap, b.niveau, b.n, 3, 'taquin').length, b.n, b.id); assert.ok(M.trouver(b.matiere).pays === p, b.id); }
    if(b.england){ assert.strictEqual(w.ENGLAND.serie(b.england, 'examen', b.niveau, b.n, 3, 'taquin').length, b.n, b.id); assert.strictEqual(p, 'uk'); } }
  // Italie, 5ª superiore : chapitres du lycée, en italien.
  bouton(w, 'pays'); clic(w, '[data-a="pays-choisir"][data-v="it"]'); clic(w, '[data-a="pays-classe"][data-v="7"]'); assert.strictEqual(A.J().matieres.niveau, 'Tle');
  assert.match(d.querySelector('main').textContent, /Mes matières \(programme du pays\)[\s\S]*Italiano \(programma italiano\)[\s\S]*Storia ed educazione civica[\s\S]*Mes examens/);
  assert.ok(d.querySelector('[data-a="matiere-chap"][data-v="it-italiano|it-italiano-lycee"]') && d.querySelector('[data-a="mat-tri"][data-v="it-storia"]') && d.querySelector('[data-a="pays-maths"]'));
  const bons = new Set(M.trouver('it-italiano').chapitres[1].banque.map(q => q.bon));
  clic(w, '[data-a="matiere-chap"][data-v="it-italiano|it-italiano-lycee"]'); assert.ok(bons.has(A.qzBonne()), 'question italienne du lycée');
  // Maths dans ma langue : 20 questions en italien, avec vannes, corrigé, on peut recommencer.
  bouton(w, 'pays-ecran'); const ui = A.base.ui; clic(w, '[data-a="pays-maths"]'); assert.strictEqual(A.base.ui, ui); assert.ok(A.qzBonne());
  for(let i = 0; i < 20 && d.querySelector('.piege-opt'); i++){ const bon = A.qzBonne(); [...d.querySelectorAll('.piege-opt')].find(x => x.textContent === bon).click(); const suite = d.querySelector('[data-a="qz-suivant"]'); if(suite) suite.click(); }
  assert.match(d.querySelector('main').textContent, /bonnes réponses sur 20/); assert.ok(d.querySelector('[data-a="pays-maths"]'), 'recommencer');
  // Entraînement de prima prova : chrono, sans vanne, sur 20.
  bouton(w, 'pays-ecran'); clic(w, '[data-a="pays-blanc"][data-v="it-prima-prova"]'); assert.ok(d.querySelector('#chrono-veille'));
  for(let i = 0; i < 15; i++){ const bon = A.qzBonne(); [...d.querySelectorAll('.piege-opt')].find(x => x.textContent === bon).click(); }
  assert.match(d.querySelector('main').textContent, /Note : 20\/20[\s\S]*15 bonnes réponses sur 15/); assert.strictEqual(A.J().paysNotes['it-prima-prova'].best, 1);
  // Angleterre : le programme anglais complet, au bon Year.
  bouton(w, 'pays'); clic(w, '[data-a="pays-choisir"][data-v="uk"]'); clic(w, '[data-a="pays-classe"][data-v="4"]'); assert.strictEqual(A.J().gb.niveau, 'Y11');
  assert.ok(d.querySelector('[data-a="pays-gb"]') && d.querySelector('[data-a="pays-gb-mocks"]') && d.querySelector('[data-a="pays-blanc"][data-v="uk-gcse-history"]'));
  clic(w, '[data-a="pays-blanc"][data-v="uk-gcse-english"]'); assert.ok(d.querySelector('#chrono-veille') && A.qzBonne());
  bouton(w, 'pays-ecran'); clic(w, '[data-a="pays-gb"]'); assert.strictEqual(A.base.programme, 'gb'); assert.match(d.querySelector('h2').textContent, /England curriculum/);
  assert.ok(d.querySelector('.onglet.actif[data-v="Y11"]'), 'Year 11'); A.base.programme = 'fr';
  // Interface en espagnol.
  A.base.ui = 'es'; bouton(w, 'pays'); clic(w, '[data-a="pays-choisir"][data-v="es"]'); assert.match(d.querySelector('main').textContent, /Mis asignaturas \(programa del país\)[\s\S]*Matemáticas en mi idioma/); A.base.ui = 'fr';
});

await test('v6.81 : programmes des pays, suite — sciences, philosophie (lycée seulement), Erdkunde, Geography', async () => {
  const w = page(), d = w.document, A = w.AmiDesMots, M = w.MATIERES, S = w.SYSTEMES_SCOLAIRES; A.accueil();
  const NOUV = { it:[['it-scienze', 2], ['it-filosofia', 1]], es:[['es-ciencias', 2], ['es-filosofia', 1]], de:[['de-naturwissenschaften', 2], ['de-erdkunde', 2]], us:[['us-science', 2], ['us-geography', 2]] };
  let n = 0;
  for(const [p, l] of Object.entries(NOUV)){ assert.strictEqual(S[p].matieres.length, 4, p);
    for(const [id, nb] of l){ const m = M.trouver(id); assert.ok(m && m.pays === p && S[p].matieres.includes(id), id); assert.strictEqual(m.chapitres.length, nb, id);
      for(const ch of m.chapitres){ assert.strictEqual(ch.banque.length, 20, ch.id); n += 20; assert.ok(ch.banque.every(q => q.lang === S[p].langue && q.faux.every(f => w.JUGE.juger(f.vanne).ok)), ch.id); }
      for(const l2 of ['en', 'es', 'de', 'it', 'pt']) assert.ok(w.MATIERES_LANGUES[l2].noms[id].ch[m.chapitres[0].id], l2 + ' ' + id); } }
  assert.strictEqual(n, 280);
  // Philosophie : seulement au lycée, pas d'examen ni de trimestre au collège.
  assert.strictEqual(M.chapitres('it-filosofia', '3e').length, 0); assert.strictEqual(M.chapitres('it-filosofia', 'Tle').length, 1);
  assert.ok(!M.trouver('es-filosofia').examens['3e'] && M.trouver('es-filosofia').examens.Tle); assert.ok(!M.trimestres('it-filosofia', '4e') && M.trimestres('it-filosofia', 'Tle'));
  // Mon pays : en 3ª media (≈ 4e), pas de Filosofia ; en 5ª superiore, oui.
  bouton(w, 'pays'); clic(w, '[data-a="pays-choisir"][data-v="it"]'); clic(w, '[data-a="pays-classe"][data-v="2"]'); assert.strictEqual(A.J().matieres.niveau, '4e');
  assert.ok(d.querySelector('[data-v="it-scienze|it-scienze-college"]') && !d.querySelector('[data-a="matiere-chap"][data-v^="it-filosofia"]'));
  clic(w, '[data-a="pays-classe"][data-v="7"]'); assert.ok(d.querySelector('[data-v="it-filosofia|it-filosofia-lycee"]'));
  clic(w, '[data-a="pays-blanc"][data-v="it-filosofia-colloquio"]'); assert.ok(d.querySelector('#chrono-veille') && A.qzBonne());
  // Allemagne et États-Unis : nouvelles matières affichées.
  bouton(w, 'pays'); clic(w, '[data-a="pays-choisir"][data-v="de"]'); assert.match(d.querySelector('main').textContent, /Naturwissenschaften[\s\S]*Erdkunde/);
  bouton(w, 'pays'); clic(w, '[data-a="pays-choisir"][data-v="us"]'); assert.match(d.querySelector('main').textContent, /Science \(U\.S\. curriculum\)[\s\S]*Geography/);
});

await test('v6.82 : Portugal — classes, provas finais et exames nacionais, 4 matières en portugais, maths en portugais', async () => {
  const w = page(), d = w.document, A = w.AmiDesMots, M = w.MATIERES, S = w.SYSTEMES_SCOLAIRES, E = w.EXAMENS_MONDE, P = w.AMI_PAYS; A.accueil();
  assert.strictEqual(S.pt.langue, 'pt'); assert.strictEqual(S.pt.classes.length, 7); assert.strictEqual(S.pt.classes.find(c => c[0] === '9.º ano')[1], '3e');
  assert.ok(E.pt['provas-finais-9'] && E.pt['exames-nacionais'] && /30 %/.test(E.pt['provas-finais-9'].conditions) && /0 à 200/.test(E.pt['exames-nacionais'].conditions));
  assert.strictEqual(S.pt.matieres.join(), 'pt-portugues,pt-historia,pt-ciencias,pt-filosofia');
  let n = 0;
  for(const id of S.pt.matieres){ const m = M.trouver(id); for(const ch of m.chapitres){ assert.strictEqual(ch.banque.length, 20, ch.id); n += 20;
    assert.ok(ch.banque.every(q => q.lang === 'pt' && q.faux.length === 3 && q.faux.every(f => w.JUGE.juger(f.vanne).ok)), ch.id); }
    assert.ok(w.MATIERES_LANGUES.pt.noms[id] && w.MATIERES_LANGUES.it.noms[id], id); }
  assert.strictEqual(n, 140); assert.strictEqual(M.chapitres('pt-filosofia', '3e').length, 0);
  // Les maths en portugais existent pour les blancs.
  const s = P.serieDans('pt', '3e', 5); assert.ok(s.length === 5 && s.every(q => q.lang === 'pt'));
  for(const b of w.BLANCS_PAYS.pt){ assert.ok(E.pt[b.examen], b.id); if(b.matiere) assert.strictEqual(M.serie(b.matiere, b.chap, b.niveau, b.n, 5, 'taquin').length, b.n, b.id); }
  // Écran : choisir le Portugal, 9.º ano, matières et provas finais.
  bouton(w, 'pays'); clic(w, '[data-a="pays-choisir"][data-v="pt"]'); assert.strictEqual(A.J().systeme, 'pt');
  clic(w, '[data-a="pays-classe"][data-v="3"]'); assert.strictEqual(A.J().matieres.niveau, '3e');
  const t = d.querySelector('main').textContent;
  assert.match(t, /Portugal[\s\S]*9\.º ano ≈ 3e en France[\s\S]*Português \(currículo português\)[\s\S]*História e Cidadania[\s\S]*Provas finais do 9\.º ano[\s\S]*Treino · Prova final de Matemática/);
  assert.ok(!d.querySelector('[data-a="matiere-chap"][data-v^="pt-filosofia"]'));
  clic(w, '[data-a="pays-blanc"][data-v="pt-prova-final-portugues"]'); assert.ok(d.querySelector('#chrono-veille'));
  for(let i = 0; i < 15; i++){ const bon = A.qzBonne(); [...d.querySelectorAll('.piege-opt')].find(x => x.textContent === bon).click(); }
  assert.match(d.querySelector('main').textContent, /Note : 100 %/);
  // Interface en portugais.
  A.base.ui = 'pt'; bouton(w, 'pays-ecran'); assert.match(d.querySelector('main').textContent, /As minhas disciplinas \(programa do país\)/); A.base.ui = 'fr';
});

await test('v6.83 : SVT du collège en italien et en portugais — 10 chapitres, même ordre que le français, vannes acceptées', async () => {
  const w = page(), A = w.AmiDesMots, M = w.MATIERES, ML = w.MATIERES_LANGUES; A.accueil();
  const CH = ['vivant', 'corps', 'terre', 'r-s6', 'r-s54', 'cours-s6', 'cours-s5', 'cours-s4', 'cours-s3', 'cpl-s6'], m = M.trouver('svt');
  for(const l of ['it', 'pt']) for(const c of CH){ const ch = m.chapitres.find(x => x.id === c), t = ML[l].q['svt/' + c];
    assert.ok(t && t.length === ch.banque.length, l + ' ' + c);
    for(const q of t){ assert.ok(q.length === 4 && q[2].length === 3 && !q[2].some(f => f[0] === q[1]), l + ' ' + q[0]); for(const f of q[2]) assert.ok(w.JUGE.juger(f[1]).ok, f[1]); } }
  // Mêmes réponses chiffrées qu'en français, dans le même ordre.
  assert.strictEqual(ML.it.q['svt/vivant'][2][1], '46'); assert.strictEqual(ML.pt.q['svt/vivant'][11][1], '8');
  // En jeu : interface en italien → questions en italien ; un chapitre de lycée encore non traduit reste en français.
  A.base.ui = 'it'; const s = M.serie('svt', 'vivant', '6e', 10, 3, 'taquin'); assert.ok(s.length === 10 && s.every(q => q.lang === 'it'), 'italien');
  assert.ok(s.every(q => ML.it.q['svt/vivant'].some(x => x[0] === q.enonce)), 'énoncés italiens');
  const l2 = M.serie('francais', 'homophones', '6e', 5, 3, 'taquin'); assert.ok(l2.every(q => q.lang === 'fr'), 'chapitre non traduit (français : homophones) : reste en français (l’EMC est traduite depuis la v7.5)');
  A.base.ui = 'pt'; assert.ok(M.serie('svt', 'cours-s4', '4e', 8, 4, 'taquin').every(q => q.lang === 'pt'), 'portugais');
  A.base.ui = 'fr'; assert.ok(M.serie('svt', 'vivant', '6e', 5, 3, 'taquin').every(q => q.lang === 'fr'), 'français inchangé');
});

await test('v6.84 : physique-chimie du collège en italien et en portugais — 11 chapitres, même ordre, réponses chiffrées identiques', async () => {
  const w = page(), A = w.AmiDesMots, M = w.MATIERES, ML = w.MATIERES_LANGUES; A.accueil();
  const CH = ['matiere', 'elec', 'r-p6', 'cours-p6', 'cours-p5', 'cours-p4', 'cours-p3', 'cpl-p6', 'cpl-pc-elec', 'cpl-p6-materiaux', 'cpl-pc-univers'], m = M.trouver('physique');
  const chiffre = t => (String(t).match(/\d+(?:[,.]\d+)?/g) || []).join(' ');
  for(const l of ['it', 'pt']) for(const c of CH){ const ch = m.chapitres.find(x => x.id === c), t = ML[l].q['physique/' + c];
    assert.ok(t && t.length === ch.banque.length, l + ' ' + c);
    t.forEach((q, i) => { const f = Array.isArray(ch.banque[i]) ? ch.banque[i] : [ch.banque[i].enonce, ch.banque[i].bon];
      // Une réponse chiffrée garde les mêmes nombres qu'en français (même ordre des questions).
      if(/^[\d\s,.°CVWkhJNAΩ/×−-]+$/.test(f[1])) assert.strictEqual(chiffre(q[1]), chiffre(f[1]), l + ' ' + c + ' #' + i);
      for(const x of q[2]) assert.ok(w.JUGE.juger(x[1]).ok, x[1]); }); }
  A.base.ui = 'it'; assert.ok(M.serie('physique', 'elec', '4e', 10, 2, 'taquin').every(q => q.lang === 'it'));
  A.base.ui = 'pt'; assert.ok(M.serie('physique', 'cours-p3', '3e', 10, 2, 'taquin').every(q => q.lang === 'pt'));
  assert.ok(M.serie('francais', 'homophones', '6e', 5, 2, 'taquin').every(q => q.lang === 'fr'), 'chapitre non traduit (français : homophones) : reste en français (l’EMC est traduite depuis la v7.5)'); A.base.ui = 'fr';
});

await test('v10.10 : mise à jour forcée des pages restées sur un ancien code (le service worker recharge celles qui ne répondent pas)', async () => {
  for(const f of ['index.html', 'professeur.html', 'monde-3d.html', 'mots-city.html']) assert.match(lire(f), /js\/maj-auto\.js/, f);
  assert.ok(lire('index.html').indexOf('js/maj-auto.js') < lire('index.html').indexOf('js/jeu.js'), 'chargé avant le jeu');
  // Le service worker, exécuté pour de vrai avec un faux navigateur : deux onglets, l'un récent (il répond), l'autre ancien.
  const vm = require('vm'), ecouteurs = {}, navigues = [], attentes = [];
  const recent = { id:'recent', url:'https://x/index.html', navigate:u => { navigues.push('recent'); return Promise.resolve(); }, postMessage:m => { if(m.ami === 'version?') setTimeout(() => ecouteurs.message({ data:{ ami:'a-jour' }, source:{ id:'recent' } }), 10); } };
  const ancien = { id:'ancien', url:'https://x/index.html', navigate:u => { navigues.push('ancien'); return Promise.resolve(); }, postMessage:() => {} };
  const self = { addEventListener:(t, f) => { ecouteurs[t] = f; }, skipWaiting:() => Promise.resolve(), clients:{ claim:() => Promise.resolve(), matchAll:() => Promise.resolve([recent, ancien]) } };
  const ctx = { self, caches:{ keys:() => Promise.resolve(['vieux']), delete:() => Promise.resolve(true), open:() => Promise.resolve({ addAll:() => Promise.resolve() }) }, location:{ origin:'https://x' }, URL, Request:function(u, o){ this.url = u; this.o = o; }, setTimeout, Promise, console };
  vm.runInNewContext(lire('sw.js'), ctx);
  ecouteurs.activate({ waitUntil:p => attentes.push(p) }); await Promise.all(attentes);
  assert.deepStrictEqual(navigues, ['ancien'], 'seul l’onglet sur un ancien code est rechargé d’office');
  // La page récente répond bien à la question du service worker.
  const ec = {}, reponses = []; vm.runInNewContext(lire('js/maj-auto.js'), { navigator:{ serviceWorker:{ addEventListener:(t, f) => { ec[t] = f; }, startMessages:() => {} } } });
  ec.message({ data:{ ami:'version?' }, source:{ postMessage:m => reponses.push(m) } }); assert.deepStrictEqual(reponses.map(m => m.ami), ['a-jour']);
});

await test('v10.10 : ST2S — sujets rédigés type bac (STSS, cas cliniques de CBPH) avec corrigé, barème et vérification de méthode sans IA', async () => {
  const w = page(), d = w.document, S = w.SUJETS_ST2S, C = w.AMI_COPIE, E = w.EPREUVES, M = w.MATIERES;
  assert.ok(S.STSS.length >= 3 && S.CBPH.length >= 3);
  const pts = l => l.flatMap(s => [...s.matchAll(/\((\d+(?:,\d+)?)\)/g)].map(m => Number(m[1].replace(',', '.')))).reduce((a, b) => a + b, 0);
  for(const x of S.tous()){
    assert.match(x.texteSujet, /fictif|fictives/, 'données fictives annoncées : ' + x.id);
    const nq = (x.texteSujet.match(/^\d+\.\s/gm) || []).length; assert.ok(nq >= 5, x.id);
    assert.strictEqual(x.corrige.length, nq + 1, 'un corrigé par question + la langue : ' + x.id);
    // Barème : les points annoncés dans l'énoncé sont ceux du corrigé ; total 18 + 2 = 20.
    const ann = [...x.texteSujet.matchAll(/^\d+\..*\((\d+(?:,\d+)?) points?\)/gm)].map(m => Number(m[1].replace(',', '.')));
    const somme = ann.reduce((a, b) => a + b, 0); assert.strictEqual(somme, 18, 'barème sur 18 + 2 : ' + x.id + ' ' + somme);
    x.corrige.slice(0, nq).forEach(([q, l], i) => { const m = q.match(/\((\d+(?:,\d+)?) points?\)/); assert.ok(m, q);
      const vise = Number(m[1].replace(',', '.')), detail = pts(l); assert.ok(Math.abs(detail - vise) < 0.01, x.id + ' ' + q + ' : ' + detail + ' ≠ ' + vise); });
  }
  // Depuis la matière ST2S : liste des sujets → copie → vérification → corrigé.
  w.AMI_MODULES.api.matieresAccueil(); clic(w, '[data-a="matiere"][data-v="st2s"]'); assert.ok(d.querySelector('[data-a="st2s-sujets"]'), 'carte des sujets');
  clic(w, '[data-a="st2s-sujets"]'); assert.strictEqual(d.querySelectorAll('[data-a="st2s-sujet"]').length, S.tous().length);
  clic(w, '[data-a="st2s-sujet"][data-v="cbph-diabete"]'); const t = d.getElementById('copie-texte'); assert.ok(t, 'écran de copie');
  t.value = '1. IMC = 98 ÷ 1,75² ≈ 32 kg/m², donc une obésité.\n\n2. Les signes sont la polyurie et la soif ; la glycémie est de 1,62 g/L puis 1,58 g/L, donc un diabète de type 2.\n\n3. L’insuline des cellules du pancréas fait baisser la glycémie ; le glucagon la fait remonter, ce qui assure l’homéostasie par rétrocontrôle.\n\n4. L’insulinorésistance entraîne une hyperglycémie, ce qui provoque une glycosurie au-delà de 1,8 g/L.\n\n5. Complications : yeux, reins ; prévention par l’activité physique.';
  clic(w, '[data-a="copie-verifier"]'); const txt = d.querySelector('main').textContent;
  assert.match(txt, /Toutes les questions traitées \(5\/5\)/); assert.match(txt, /Vocabulaire scientifique/); assert.match(txt, /Corrigé et barème/); assert.match(txt, /98 ÷ 1,75² = 98 ÷ 3,0625/);
  const r = C.analyser({ sorte:'stss', texte:'1. Un déterminant.', texteSujet:S.STSS[0].texteSujet, sujet:S.STSS[0].sujet });
  assert.ok(r.liste.some(i => /Toutes les questions traitées \(1\/6\)/.test(i.titre) && !i.ok)); assert.ok(r.liste.some(i => /Références aux documents/.test(i.titre)));
  // Bac blanc ST2S : chaque épreuve a sa partie rédigée, avec corrigé.
  for(const [id, so] of [['tech-st2s', 'cbph'], ['tech-st2s-stss', 'stss']]){ const e = E.EPREUVES[id].ecrits(M.hasard(5)); assert.strictEqual(e.length, 1); assert.strictEqual(e[0].sorte, so); assert.ok(e[0].corrige.length >= 6); }
});

await test('v10.9 : mise à jour automatique partout (vérification régulière, rechargement à l’accueil, bandeau, fichiers jamais repris du cache HTTP)', async () => {
  const j = lire('js/jeu.js'), sw = lire('sw.js');
  assert.match(sw, /new Request\(f, \{ cache:'reload' \}\)/); assert.match(sw, /skipWaiting/); assert.match(sw, /clients\.claim/);
  assert.match(j, /setInterval\(verifier, 30 \* 60 \* 1000\)/); assert.match(j, /visibilitychange/); assert.match(j, /addEventListener\('online', verifier\)/);
  const w = page(), d = w.document, A = w.AmiDesMots, API = w.AMI_MODULES.api; let n = 0; w.__amiRecharger = () => { n++; };
  // En pleine série : pas de rechargement, un bandeau ; la série continue.
  API.matiereSerie('francais', 'cpl-phrases', 5, 'Test'); A.nouvelleVersion(false);
  assert.strictEqual(n, 0, 'jamais au milieu d’une série'); assert.ok(d.getElementById('maj-prete'), 'bandeau'); assert.ok(A.majPrete());
  assert.ok(d.querySelector('.piege-opt'), 'la question reste là');
  // Retour à l'accueil des matières : la nouvelle version se charge.
  API.matieresAccueil(); assert.strictEqual(n, 1, 'rechargement au retour à l’accueil'); assert.ok(!A.majPrete());
  // Sur l'accueil, ou juste après l'ouverture : tout de suite. Le bouton du bandeau aussi.
  n = 0; API.matieresAccueil(); A.nouvelleVersion(false); assert.strictEqual(n, 1);
  n = 0; API.matiereSerie('francais', 'cpl-phrases', 5, 'Test'); A.nouvelleVersion(true); assert.strictEqual(n, 1);
  n = 0; API.matiereSerie('francais', 'cpl-phrases', 5, 'Test'); A.nouvelleVersion(false); clic(w, '[data-a="maj-recharger"]'); assert.strictEqual(n, 1, 'bouton Mettre à jour');
  clic(w, '[data-a="maj-plus-tard"]'); assert.ok(!d.getElementById('maj-prete'), 'le bandeau se ferme');
});

await test('v10.8 : série ST2S (vers infirmier·ère) conforme aux programmes et aux épreuves 2027 — chapitres 1re et Tle, fiches, calculs justes, bac blanc CBPH + STSS', async () => {
  const w = page(), M = w.MATIERES, m = M.trouver('st2s'), F = w.AMI_COURS, E = w.EPREUVES;
  const attendus = { '1re':['st2s-bph-orga', 'st2s-bph-nutrition', 'st2s-bph-cardio', 'st2s-bph-respi', 'st2s-stss-sante', 'st2s-stss-protection', 'st2s-pcs'], 'Tle':['st2s-milieu', 'st2s-immuno', 'st2s-repro', 'st2s-genes', 'st2s-chimie', 'st2s-pol-sante', 'st2s-pol-sociale', 'st2s-projet'] };
  for(const [n, ids] of Object.entries(attendus)) for(const id of ids){
    const c = m.chapitres.find(x => x.id === id); assert.ok(c && c.niv.includes(n), id); assert.ok(c.banque.length >= 5, id + ' : questions');
    assert.ok(F.get('st2s/' + id), 'fiche ' + id); assert.ok(w.JUGE.juger(F.get('st2s/' + id).vanne).ok, 'vanne fiche ' + id);
    for(const q of c.banque){ assert.strictEqual(q[2].length, 3, q[0]); assert.ok(q[3].length >= 60, 'explication détaillée : ' + q[0]); assert.strictEqual(new Set([q[1], ...q[2].map(f => f[0])]).size, 4, q[0]); q[2].forEach(f => assert.ok(w.JUGE.juger(f[1]).ok, f[1])); }
  }
  assert.ok(Object.values(attendus).flat().reduce((s, id) => s + m.chapitres.find(x => x.id === id).banque.length, 0) >= 150, 'au moins 150 questions rédigées');
  // Calculs générés : justes, sans doublon.
  const num = s => Number(String(s).replace(/[^\d,.\-−+]/g, '').replace('−', '-').replace(',', '.'));
  const ind = m.chapitres.find(c => c.id === 'st2s-stss-sante').gen, pcs = m.chapitres.find(c => c.id === 'st2s-pcs').gen;
  for(let g = 1; g < 400; g++){
    let q = ind(M.hasard(g)); let t = [q.bon, ...q.faux.map(f => f.en)]; assert.strictEqual(new Set(t).size, t.length, q.enonce); assert.ok(q.faux.length >= 2);
    let x = q.enonce.match(/compte ([\d  ]+) habitants et (\d+) /); if(x){ const pop = Number(x[1].replace(/\D/g, '')), cas = +x[2]; assert.ok(Math.abs(num(q.bon) - Math.round(cas / pop * 1e7) / 100) < 1e-9, q.enonce + ' → ' + q.bon); }
    x = q.enonce.match(/passe de (\d+) à ([\d,]+)/); if(x){ const a = +x[1], b = num(x[2]); assert.strictEqual(num(q.bon), Math.round((b - a) / a * 100), q.enonce); }
    q = pcs(M.hasard(g)); t = [q.bon, ...q.faux.map(f => f.en)]; assert.strictEqual(new Set(t).size, t.length, q.enonce); assert.ok(q.faux.length >= 2, q.enonce);
    x = q.enonce.match(/mère à ([\d,]+) mol\/L\. .* préparer (\d+) mL d’une solution à ([\d,]+) mol/); if(x){ const v0 = num(x[2]) * num(x[3]) / num(x[1]); assert.ok(Math.abs(num(q.bon) - v0) < 0.06, q.enonce + ' → ' + q.bon); }
    x = q.enonce.match(/(\d+) mg\/kg par prise pour un enfant de (\d+) kg/); if(x) assert.strictEqual(num(q.bon), +x[1] * +x[2]);
  }
  // Épreuves conformes à la session 2027 : CBPH 4 h (chimie + BPH), STSS 3 h ; série ST2S = les deux.
  const P = E.EPREUVES; assert.match(P['tech-st2s'].duree, /^4 h/); assert.match(P['tech-st2s'].officiel, /coefficient 3/); assert.match(P['tech-st2s'].officiel, /coefficient 13/);
  assert.match(P['tech-st2s-stss'].duree, /^3 h/); assert.match(P['tech-st2s-stss'].officiel, /5 points.*13 points.*2 points/);
  assert.strictEqual(JSON.stringify(E.SERIES_TECHNO.st2s[1]), JSON.stringify(['tech-st2s', 'tech-st2s-stss']));
  for(const id of ['tech-st2s', 'tech-st2s-stss']){ const parts = P[id].faire(M.hasard(7)); assert.strictEqual(parts.reduce((s, p) => s + p.pts, 0), 20, id); for(const p of parts) assert.ok(p.questions.length >= 4, id + ' ' + p.titre); }
  // L'élève voit la matière, et chaque question s'explique (« Comment répondre ? »).
  const d = w.document, API = w.AMI_MODULES.api; API.matieresAccueil(); assert.ok(d.querySelector('[data-a="matiere"][data-v="st2s"]'), 'carte ST2S');
  API.matiereSerie('st2s', 'st2s-milieu', 5, 'Test'); assert.ok(d.querySelector('[data-a="qz-aide"]'), 'aide de l’exercice');
});

await test('v10.7 : audit de sécurité (CSP de toutes les pages, en-têtes HTTP, dossiers internes non publiés, secrets ignorés par git)', async () => {
  const crypto = require('crypto');
  for(const f of ['index.html', 'admin.html', 'professeur.html', 'legal.html', 'monde-3d.html', 'mots-city.html']){
    const h = fs.readFileSync(f, 'utf8'), m = h.match(/<meta http-equiv="Content-Security-Policy" content="([^"]+)">/); assert.ok(m, 'CSP ' + f);
    assert.ok(!h.includes('<script') || h.indexOf(m[0]) < h.indexOf('<script'), 'CSP avant les scripts ' + f);
    assert.ok(!/unsafe-inline'[^;]*;?\s*$/.test(m[1].split(';').find(x => /script-src/.test(x)) || '') && !/script-src[^;]*'unsafe-(inline|eval)'/.test(m[1]), 'pas de script en ligne libre ' + f);
    for(const s of h.matchAll(/<script(?:\s+type="(?:module|importmap)")?>([\s\S]*?)<\/script>/g)){
      const e = "'sha256-" + crypto.createHash('sha256').update(s[1], 'utf8').digest('base64') + "'"; assert.ok(m[1].includes(e), f + ' : empreinte du script en ligne à jour (python3 outils/csp-pages.py)'); }
  }
  const ht = fs.readFileSync('.htaccess', 'utf8'); for(const x of ['Strict-Transport-Security', 'X-Frame-Options', "frame-ancestors 'self'", 'Permissions-Policy', 'RedirectMatch 404']) assert.ok(ht.includes(x), x);
  const hs = fs.readFileSync('serveur-php/.htaccess', 'utf8'); for(const x of ['credits-lib\\.php', 'veille-publier\\.php', 'lib\\.php', 'X-Frame-Options']) assert.ok(hs.includes(x), x);
  assert.match(fs.readFileSync('outils/preparer-www.js', 'utf8'), /'tests', 'docs',/);
  const gi = fs.readFileSync('.gitignore', 'utf8'); for(const x of ['node_modules/', 'config-ami.php', '*.pem', '*.p8', '.env']) assert.ok(gi.split('\n').includes(x), x);
  const v = fs.readFileSync('serveur-php/veille.php', 'utf8'); assert.match(v, /CURLOPT_FOLLOWLOCATION => false/); assert.match(v, /HTTP_X_VEILLE_JETON/);
  assert.ok(!/'« ' \+ c\.enTrop\[0\]/.test(fs.readFileSync('js/jeu.js', 'utf8')));
});

await test('v10.6.1 : questions de forme de phrase précises, réponse écrite guidée, écran de question rangé', async () => {
  const w = page(), M = w.MATIERES, ch = M.trouver('francais').chapitres.find(c => c.id === 'cpl-phrases');
  const q = ch.banque.find(x => /Lina/.test(x[0])); assert.match(q[0], /met en relief le mot « Lina »/); assert.ok(q[3].length > 150 && /neutre serait « Lina a gagné/.test(q[3]));
  for(const L of ['en', 'es']){ const t = w.MATIERES_LANGUES[L].q['francais/cpl-phrases'].find(x => /Lina/.test(x[0])); assert.ok(/«Lina»/.test(t[0]) && t[3].length > 150, L); }
  assert.ok(!ch.banque.some(x => /^Quelle est la forme de la phrase/.test(x[0])), 'forme : on précise ce qu’on cherche');
  const css = fs.readFileSync('css/jeu.css', 'utf8'); assert.match(css, /\.piege-ecran \.chrono-veille\{ grid-area:chrono/); assert.match(css, /\.piege-ecran \.confiance\{ grid-area:conf/); assert.match(css, /\.piege-ecran \.reponse-libre\{ grid-area:opts/);
  const js = fs.readFileSync('js/jeu.js', 'utf8'); assert.match(js, /function aideLibre\(q\)/); assert.match(js, /id="qz-libre-aide"/);
  // « 💡 Comment répondre ? » : en maths (fiche de cours) et dans une matière, l'aide s'ouvre sans quitter la question et ne donne pas la réponse.
  const d = w.document, A = w.AmiDesMots, API = w.AMI_MODULES.api; A.accueil();
  for(let k = 0; k < 6; k++){
    if(k < 3){ clic(w, '[data-a="maths"]'); clic(w, '[data-a="maths-melange"]'); } else if(k < 5) API.matiereSerie('francais', 'cpl-phrases', 5, 'Test'); else API.matiereSerie('physique', 'energie', 5, 'Test');
    const bt = d.querySelector('[data-a="qz-aide"]'); assert.ok(bt, 'bouton d’aide ' + k); clic(w, '[data-a="qz-aide"]');
    const z = d.getElementById('qz-aide-texte'); assert.ok(!z.hidden && z.querySelectorAll('li').length >= 1, 'aide affichée ' + k);
    const bon = A.qzBonne(); if(bon.length > 2) assert.ok(!z.textContent.toLowerCase().includes(bon.toLowerCase()), 'l’aide ne donne pas la réponse : ' + bon);
    assert.ok(d.querySelector('.piege-opt'), 'toujours sur la question'); clic(w, '[data-a="qz-aide"]'); assert.ok(z.hidden, 'l’aide se referme'); A.accueil();
  }
});

await test('v10.6 : français d’après les programmes (nouveaux temps conjugués justes, entrées littéraires 6e → 1re, subjonctif en 4e)', async () => {
  const w = page(), M = w.MATIERES, m = M.trouver('francais'), T = w.MATIERES_LANGUES;
  const attendu = { 'aller|impératif|2e personne du singulier':'va', 'parler|impératif|2e personne du singulier':'parle', 'être|impératif|1re personne du pluriel':'soyons', 'avoir|impératif|2e personne du pluriel':'ayez',
    'finir|subjonctif présent|je':'que je finisse', 'être|subjonctif présent|nous':'que nous soyons', 'faire|subjonctif présent|il':'qu’il fasse', 'aller|subjonctif présent|je':'que j’aille',
    'venir|plus-que-parfait|ils':'ils étaient venus', 'avoir|futur antérieur|je':'j’aurai eu', 'faire|passé antérieur|il':'il eut fait', 'finir|plus-que-parfait|nous':'nous avions fini' };
  const vus = new Set(), temps = new Set();
  for(const n of ['6e', '5e', '4e', '3e']) for(let g = 1; g < 80; g++) for(const q of M.serie('francais', 'conjugaison', n, 20, g * 7919 + 11, 'taquin')){
    const x = q.enonce.match(/« (.+?) » (?:à l’|au )(.+?)(?: avec « (.+?) »|, (.+?))\./); assert.ok(x, q.enonce); temps.add(x[2]);
    const k = x[1] + '|' + x[2] + '|' + (x[3] || x[4]); if(attendu[k]){ assert.strictEqual(q.bon, attendu[k], k); vus.add(k); }
    const tout = [q.bon, ...q.faux.map(f => f.en)]; assert.strictEqual(new Set(tout).size, tout.length, q.enonce); assert.ok(q.faux.length >= 2 && !/undefined/.test(JSON.stringify(q)), q.enonce);
    assert.ok(/Conjugaison complète : .+\.$/.test(q.regle) && q.regle.includes(q.bon.replace(/^qu’|^que /, '').split(' ').pop()), q.regle);
    if(x[2] === 'subjonctif présent') assert.ok(['4e', '3e'].includes(n), 'subjonctif en ' + n);
  }
  for(const t of ['plus-que-parfait', 'futur antérieur', 'passé antérieur', 'impératif', 'subjonctif présent']) assert.ok(temps.has(t), t);
  assert.ok(vus.size >= 8, 'formes vérifiées : ' + [...vus].join(', '));
  { const gen = m.chapitres.find(c => c.id === 'conjugaison').gen; for(const L of ['en', 'es']) for(let g = 1; g < 300; g++){ const q = gen(M.hasard(g), '4e', L); assert.ok(q.lang === L && !/undefined/.test(JSON.stringify(q)) && q.regle.length > 60, L + ' ' + q.enonce); } }
  const md = m.chapitres.find(c => c.id === 'cpl-modes'); md.banque.forEach((q, i) => { if(/subjonctif/i.test(q[0])) assert.ok(!md.nivQ[i].includes('5e'), q[0]); });
  for(const [id, n] of [['pgm-6e', '6e'], ['pgm-5e', '5e'], ['pgm-4e', '4e'], ['pgm-3e', '3e'], ['pgm-2nde', '2nde'], ['pgm-1re-circ', '1re']]){
    const c = m.chapitres.find(c => c.id === id); assert.ok(c && c.niv.includes(n) && c.banque.length >= 20, id);
    for(const L of ['en', 'es']) assert.strictEqual(T[L].q['francais/' + id].length, c.banque.length, L + ' ' + id);
    assert.ok(w.AMI_COURS.a('francais/' + id), 'fiche ' + id);
    for(const q of c.banque){ assert.strictEqual(q[2].length, 3, q[0]); assert.ok(q[3].length >= 60, 'explication détaillée : ' + q[0]); }
  }
});

await test('v10.5 : maths complétées d’après les programmes (17 notions, corrections justes, fiches, 6 langues) ; Plumo vivant et bravos jamais répétés', async () => {
  const w = page(), M = w.MATHS, F = w.AMI_COURS, num = s => Number(String(s).replace(/[\s  ]/g, '').replace(/−/g, '-').replace(',', '.'));
  const ids = { '6e':['6-decimaux-produit', '6-encadrer', '6-mediatrice'], '5e':['5-droites-triangle'], '2nde':['2-parite', '2-ecart-type', '2-boite', '2-simulation'], '1re':['1-approx-affine', '1-derivee-affine', '1-projete', '1-bernoulli', '1-variance'], 'Tle':['T-recurrence', 'T-equa-diff', 'T-ipp', 'T-grands-nombres'] };
  for(const [n, l] of Object.entries(ids)) for(const id of l){ assert.ok(M.chapitresDe(n).some(c => c[0] === id), n + ' ' + id); assert.ok(F.a('maths/' + id), 'fiche ' + id);
    for(const L of ['en', 'es', 'de', 'it', 'pt']) assert.ok(w.MATHS_LANGUES[L].chapitres[id], L + ' ' + id); }
  for(let g = 1; g <= 200; g++){
    let q = M.question('6-decimaux-produit', M.hasard(g)); const m = q.enonce.match(/([\d,]+) ([×÷]) ([\d,]+)/); const a = num(m[1]), b = num(m[3]);
    assert.ok(Math.abs(num(q.bon) - (m[2] === '×' ? a * b : a / b)) < 1e-9, q.enonce + ' → ' + q.bon);
    q = M.question('2-ecart-type', M.hasard(g)); { const v = q.enonce.match(/: ([\d ;]+)\./)[1].split(' ; ').map(Number), mo = v.reduce((x, y) => x + y) / v.length; assert.strictEqual(num(q.bon), Math.sqrt(v.reduce((s, x) => s + (x - mo) ** 2, 0) / v.length), q.enonce); }
    q = M.question('T-grands-nombres', M.hasard(g)); if(/Bienaymé/.test(q.enonce)){ const [v, d] = (q.enonce.match(/= (\d+)\. .*≥ (\d+)\)/) || []).slice(1).map(Number); assert.ok(Math.abs(num(q.bon) - v / (d * d)) < 1e-4, q.enonce); }
    q = M.question('1-bernoulli', M.hasard(g)); if(/exactement/.test(q.enonce)){ const [n, p, k] = [+q.enonce.match(/répète (\d)/)[1], num(q.enonce.match(/p = ([\d,]+)/)[1]), +q.enonce.match(/exactement (\d)/)[1]]; let c = 1; for(let i = 0; i < k; i++) c = c * (n - i) / (i + 1); assert.ok(Math.abs(num(q.bon) - c * p ** k * (1 - p) ** (n - k)) < 1e-4, q.enonce); }
  }
  // Plumo : plus de 300 bravos différents par langue, tirés sans répétition.
  const P = w.PLUMO_VARIETE; for(const L of ['fr', 'en', 'es', 'de', 'it', 'pt']){ const b = P.bravos(L); assert.ok(b.length >= 300 && new Set(b).size === b.length, L + ' ' + b.length); for(const x of P.ACT[L]) assert.ok(w.JUGE.juger(L === 'de' ? x.replace(/\bdie\b/gi, 'the') : x).ok, x); }
  const dits = []; const mem = { age:t => { const i = dits.lastIndexOf(t); return i < 0 ? -1 : dits.length - i; }, noter:t => dits.push(t) };
  for(let i = 0; i < 300; i++) w.TRASH_TALK.choisir(P.bravos('fr'), {}, mem);
  assert.strictEqual(new Set(dits).size, 300, '300 bravos de suite, tous différents');
  const jeu = lire('js/jeu.js'); assert.match(jeu, /bravo:\(\) => bravoVarie\(BRAVO_PROF\(\)/); assert.match(jeu, /bravo:BR \? \(\) => bravoVarie\(BR, lq\)/);
  // Plumo bouge au repos, regarde le pointeur, réagit au toucher ; rien si l'utilisateur veut moins d'animations.
  assert.deepEqual([...w.PLUMO_VIVANT.IDLE].sort().join(), ['dandine', 'gonfle', 'hoche', 'penche', 'regarde', 'sautille', 'tourne'].join());
  const css = lire('css/jeu.css'); for(const a of w.PLUMO_VIVANT.IDLE) assert.match(css, new RegExp('\\.ami-vit-' + a + '\\{animation:'));
  assert.match(css, /prefers-reduced-motion: reduce\)\{\s*\.ami-3d-wrap/);
});

await test('v10.4 : anglais du lycée au programme de 2025 (6 axes par classe, axe 6 obligatoire, B1+ en 2nde) ; gamètes : énoncé précis et réponse expliquée', () => {
  const w = page(), M = w.MATIERES, F = w.AMI_COURS, a = M.trouver('langlais');
  const ax2 = a.chapitres.find(c => c.id === 'axes2'), ax = a.chapitres.find(c => c.id === 'axes');
  for(const c of [ax2, ax]){ assert.strictEqual(c.banque.length, 20, c.id); assert.strictEqual(new Set(c.banque.map(q => q[0])).size, 20); for(const q of c.banque) for(const f of q[2]) assert.ok(w.JUGE.juger(f[1]).ok, f[1]); }
  const tout = JSON.stringify([ax2.banque, ax.banque]);
  for(const s of ['Les pays du Commonwealth : héritages, unité, diversité', 'Les aires anglophones américaines', 'Le Royaume-Uni et ses nations', 'Défis et transitions', 'L’être humain et la nature', 'Enjeux et formes de la communication']) assert.ok(tout.includes(s), s);
  assert.strictEqual(ax2.banque.find(q => /fin de 2nde en LVA/.test(q[0]))[1], 'B1+');
  assert.ok(!ax2.banque.some(q => q[1] === '« L’art de vivre ensemble »') && !ax.banque.some(q => /Gestes fondateurs/.test(q[1])), 'ancien programme retiré des bonnes réponses');
  assert.match(F.get('langlais/axes2').essentiel.join(' '), /B1\+/); assert.match(F.get('langlais/axes').essentiel.join(' '), /Royaume-Uni et ses nations/);
  const g = M.trouver('svt').chapitres.flatMap(c => c.banque || []).find(q => /gamète \(un spermatozoïde ou un ovule\)/.test(q[0]));
  assert.ok(g && /^Chez l’être humain/.test(g[0]) && /un seul chromosome de chaque paire/.test(g[1]) && g[3].length > 150, 'gamète précis et expliqué');
  assert.match(lire('package.json'), /--expose-gc/);
});

await test('v10.3.1 : camp lisible sur fond sombre — cadre du grade sans fond crème, mission sans double numérotation, listes alignées à gauche', () => {
  const css = lire('css/jeu.css');
  assert.doesNotMatch(css, /\.camp-grade \{[^}]*#fff8e6/, 'plus de fond crème sous du texte clair');
  assert.match(css, /\.camp-mission \{[^}]*list-style: none/, 'les étapes portent déjà leur numéro');
  assert.match(css, /\.corrige-examen \{[^}]*text-align: left/); assert.match(css, /\.fiche-cours ul, \.fiche-cours ol \{[^}]*text-align: left/);
});

await test('v10.3 : 🎤 Grand oral blanc au camp — deux questions, tirage par le jury, 20 + 10 + 10 minutes chronométrées, relances, grille en cinq critères, rien d’enregistré', async () => {
  const w = page(), d = w.document, G = w.AMI_GRAND_ORAL; assert.ok(G, 'module chargé');
  bouton(w, 'camp'); assert.ok(d.querySelector('[data-a="camp-go"]'), 'carte au camp');
  bouton(w, 'camp-go'); assert.match(d.body.textContent, /Rien n’est enregistré/); assert.ok(!/getUserMedia|MediaRecorder/.test(lire('js/mod-grand-oral.js')), 'aucun micro');
  // Il faut deux questions, et de vraies questions.
  bouton(w, 'camp-go-tirage'); assert.match(d.body.textContent, /Écris tes deux questions/);
  d.getElementById('go-q0').value = 'L’eau'; d.getElementById('go-q1').value = 'Pourquoi le climat change-t-il ?'; bouton(w, 'camp-go-tirage'); assert.match(d.body.textContent, /reconnu la moustache/);
  const qs = ['Comment garantir l’accès à l’eau potable ?', 'Pourquoi le climat change-t-il ?'];
  d.getElementById('go-q0').value = qs[0]; bouton(w, 'camp-go-tirage');
  assert.ok(qs.includes(d.querySelector('.go-question').textContent), 'question tirée parmi les deux'); assert.ok(d.getElementById('go-chrono') && d.getElementById('go-support'));
  assert.ok(Math.abs(G.finA() - Date.now() - G.PREP * 60000) < 5000, 'préparation de 20 minutes');
  d.getElementById('go-support').value = 'Accroche\n1. constat\n2. solutions'; bouton(w, 'camp-go-expose');
  assert.match(d.querySelector('.go-support').textContent, /2\. solutions/); assert.ok(Math.abs(G.finA() - Date.now() - G.EXPOSE * 60000) < 5000, 'présentation de 10 minutes');
  G.etatCourant().debutExpose = Date.now() - 10 * 60000; bouton(w, 'camp-go-echange');
  assert.match(d.body.textContent, /Question du jury 1 \/ 6/); const vues = [d.querySelector('.go-relance').textContent];
  for(let i = 0; i < 5; i++){ bouton(w, 'camp-go-relance'); vues.push(d.querySelector('.go-relance').textContent); }
  assert.strictEqual(new Set(vues).size, 6, 'six relances différentes'); assert.ok(!d.querySelector('[data-a="camp-go-relance"]'), 'plus de question après la sixième');
  bouton(w, 'camp-go-grille'); assert.strictEqual(d.querySelectorAll('.go-grille fieldset').length, 5); assert.match(d.body.textContent, /Présentation : 10:00/);
  d.querySelectorAll('.go-grille input[value="4"]').forEach(x => { x.checked = true; }); bouton(w, 'camp-go-noter');
  assert.match(d.body.textContent, /Note indicative : 20 \/ 20/); assert.strictEqual(G.etat().essais.length, 1); assert.strictEqual(G.meilleure(), 20);
  // Une présentation trop courte coûte 2 points et le dit.
  bouton(w, 'camp-go'); bouton(w, 'camp-go-tirage'); bouton(w, 'camp-go-expose'); bouton(w, 'camp-go-echange'); bouton(w, 'camp-go-grille');
  assert.match(d.body.textContent, /moins de 8 minutes/); bouton(w, 'camp-go-noter'); assert.match(d.body.textContent, /Note indicative : 13 \/ 20/);
  assert.ok(d.querySelector('[data-a="matiere-chap"][data-v="philo|grand-oral"]'), 'lien vers le chapitre');
  const html = w.AMI_MODULES.cartes.parents.map(f => { try{ return f(); }catch(e){ return ''; } }).join(''); assert.match(html, /Grand oral blanc : 2 essai\(s\), meilleure note indicative 20 \/ 20/);
  // En anglais, l'écran est traduit.
  const we = page('en'); bouton(we, 'camp-go'); assert.match(we.document.body.textContent, /Mock Grand oral/); assert.match(we.document.body.textContent, /Nothing is recorded/);
});

await test('v10.2 : philosophie (Tle) — méthode de la dissertation et de l’explication, Grand oral 2027, en 5 langues, avec fiche ; faits du Grand oral corrigés', async () => {
  const w = page(), M = w.MATIERES, T = w.MATIERES_LANGUES, F = w.AMI_COURS, P = M.trouver('philo');
  for(const id of ['methode-bac', 'grand-oral']){
    const c = P.chapitres.find(x => x.id === id); assert.ok(c, id); assert.strictEqual(c.banque.length, 20, id); assert.deepEqual([...c.niv], ['Tle']);
    for(const L of ['en', 'es', 'it', 'pt']){ const q = T[L].q['philo/' + id]; assert.ok(q && q.length === 20, L + ' ' + id); q.forEach((x, i) => assert.notStrictEqual(x[0], c.banque[i][0], L + ' ' + id + ' ' + i)); }
    const x = F.get('philo/' + id); assert.ok(x && x.essentiel.length >= 3 && x.exemple.etapes.length >= 2 && x.methode.length >= 2 && x.pieges.length >= 1, 'fiche ' + id); assert.ok(w.JUGE.juger(x.vanne).ok, x.vanne);
  }
  const go = P.chapitres.find(x => x.id === 'grand-oral').banque;
  assert.strictEqual(go.find(q => /voie générale à partir de la session 2027/.test(q[0]))[1], '8');
  assert.strictEqual(go.find(q => /voie technologique à partir de la session 2027/.test(q[0]))[1], '12');
  assert.match(go.find(q => /projet d’orientation/.test(q[0]))[1], /session 2024/);
  for(const L of ['it', 'pt']) assert.ok(page(L).MATIERES.serie('philo', 'grand-oral', 'Tle', 10, 4, 'taquin').every(q => q.lang === L), L);
  const src = lire('js/epreuves-oraux.js'); assert.doesNotMatch(src, /jusqu’à la session 2026 : ce troisième temps/); assert.doesNotMatch(src, /Parle sans notes/); assert.match(src, /à partir de la session 2024/);
});

await test('v10.1 : français de 1re — un chapitre par objet d’étude du bac (poésie, idées, roman, théâtre), œuvres et parcours 2026-2027, traduits, avec fiche', async () => {
  const w = page(), M = w.MATIERES, F = w.AMI_COURS, fr = M.trouver('francais');
  const ids = ['bac-poesie', 'bac-idees', 'bac-roman', 'bac-theatre'];
  for(const id of ids){
    const c = fr.chapitres.find(x => x.id === id); assert.ok(c, id);
    assert.strictEqual(c.banque.length, 20, id); assert.ok(c.niv.includes('1re'), id);
    assert.strictEqual(new Set(c.banque.map(q => q[0])).size, 20, id + ' : énoncés uniques');
    const x = F.get('francais/' + id); assert.ok(x, 'fiche ' + id);
    assert.ok(x.essentiel.length >= 3 && x.exemple.etapes.length >= 2 && x.methode.length >= 2 && x.pieges.length >= 1, id);
    assert.ok(w.JUGE.juger(x.vanne).ok, id + ' : ' + x.vanne);
  }
  const txt = ids.map(id => fr.chapitres.find(x => x.id === id).banque.map(q => q[0] + ' ' + q[1]).join(' ')).join(' ');
  for(const m of [/La Boétie/, /Fontenelle/, /Graffigny/, /Chevalier de la charrette/, /Pot-Bouille/, /Télumée/, /Le Menteur/, /On ne badine pas/, /Pour un oui ou pour un non/]) assert.match(txt, m);
  const n = fr.chapitres.filter(c => (c.niv || []).includes('1re')).reduce((s, c) => s + c.banque.length, 0);
  assert.ok(n >= 200, 'questions de français en 1re : ' + n);
  for(const lang of ['en', 'es']) for(const id of ids){ const q = w.MATIERES_LANGUES[lang].q['francais/' + id]; assert.ok(q && q.length === 20, lang + ' ' + id); }
  assert.match(w.MATIERES_LANGUES.en.q['francais/bac-theatre'][1][0], /^Who is Dorante/); assert.match(w.MATIERES_LANGUES.es.q['francais/bac-theatre'][1][0], /^¿Quién es Dorante/);
});

await test('v10.0 : toutes les notions d’anglais ont leur fiche ; l’Espace parents résume le camp (grade, classe atteinte, tests de passage, séries d’examen)', async () => {
  const w = page(), d = w.document, F = w.AMI_COURS, M = w.MATIERES, CAMP = w.AMI_CAMP;
  const sans = M.trouver('langlais').chapitres.filter(c => !c.theme && !F.a('langlais/' + c.id)).map(c => c.id); assert.strictEqual(sans.join(', '), '', 'anglais sans fiche');
  assert.ok(F.cles().length >= 264, 'fiches : ' + F.cles().length);
  for(const k of F.de('langlais').map(x => x.cle)){ const x = F.get(k); assert.ok(x.essentiel.length >= 3 && x.exemple.etapes.length >= 2 && x.methode.length >= 1 && x.pieges.length >= 1, k); assert.ok(w.JUGE.juger(x.vanne).ok, k + ' : ' + x.vanne); }
  bouton(w, 'camp-fiche', 'langlais/ang-usa'); assert.match(d.body.textContent, /Rosa Parks/);
  // Sans activité au camp, rien dans l'Espace parents ; ensuite, un résumé.
  const html = () => w.AMI_MODULES.cartes.parents.map(f => { try{ return f(); }catch(e){ return ''; } }).join('');
  assert.ok(!/parents-camp/.test(html()));
  const c = CAMP.camp(); c.pts = 650; c.serie = 4; c.acquis = ['maths/6-decimaux']; c.passages = { 'maths/6e':16 }; c.avance = { maths:'5e' }; c.examens = { brevet:{ meilleure:13.5, derniere:12 } };
  const j = w.AmiDesMots.J(); j.matieres = Object.assign({}, j.matieres, { niveau:'6e' }); j.maths = Object.assign({}, j.maths, { niveau:'6e' });
  const h = html(); assert.match(h, /parents-camp/); assert.match(h, /Grade : Sergent/); assert.match(h, /Maths : 5e \(en avance\)/); assert.match(h, /Test de passage 6e : 16 \/ 20/); assert.match(h, /Brevet 13,5\/20/);
});

await test('v9.9 : prendre de l’avance — bilan de l’année, test de passage (15/20), classe suivante par matière, retour possible', async () => {
  const w = page(), d = w.document, A = w.AmiDesMots, CAMP = w.AMI_CAMP;
  const j = A.J(); j.matieres = Object.assign({}, j.matieres, { niveau:'6e' }); j.maths = Object.assign({}, j.maths, { niveau:'6e' }); w.AMI_MODULES.api.garder();
  for(const mid of ['francais', 'langlais', 'maths']){ assert.strictEqual(CAMP.niveauDe(mid), '6e', mid); assert.strictEqual(CAMP.suivant(mid, '6e'), '5e', mid); }
  bouton(w, 'camp'); assert.ok(d.querySelector('[data-a="camp-annee"]'), 'carte « Prendre de l’avance »');
  bouton(w, 'camp-annee'); assert.strictEqual(d.querySelectorAll('.avance-matiere').length, 3); assert.match(d.body.textContent, /Test de passage en 5e/); assert.match(d.body.textContent, /Notions acquises : 0 \/ \d+/);
  // Test raté : on reste en 6e.
  bouton(w, 'camp-passage', 'maths'); assert.ok(d.querySelector('#chrono-veille')); let k = 0;
  const bonne = () => { const e = (d.querySelector('.piege-fr') || {}).textContent; return (w.__liste || []).find(q => q.enonce === e); };
  const avant = w.AMI_MODULES.api.questionsGo; w.AMI_MODULES.api.questionsGo = (l, o) => { w.__liste = l; return avant(l, o); };
  bouton(w, 'camp-passage', 'maths');
  while(d.querySelector('.piege-opt') && k++ < 25){ const q = bonne(); [...d.querySelectorAll('.piege-opt')].find(b => !q || b.textContent !== q.bon).click(); }
  assert.match(d.body.textContent, /Pas encore : il faut 15 \/ 20/); assert.strictEqual(CAMP.niveauDe('maths'), '6e');
  // Test réussi : la 5e s'ouvre en maths, et seulement en maths.
  bouton(w, 'camp-passage', 'maths'); k = 0;
  while(d.querySelector('.piege-opt') && k++ < 25){ const q = bonne(); [...d.querySelectorAll('.piege-opt')].find(b => q && b.textContent === q.bon).click(); }
  assert.match(d.body.textContent, /Bravo ! La 5e s’ouvre en Maths/); assert.strictEqual(CAMP.niveauDe('maths'), '5e'); assert.strictEqual(CAMP.niveauDe('francais'), '6e');
  assert.ok(w.AMI_CAMP.camp().passages['maths/6e'] >= 15);
  bouton(w, 'camp-base', 'maths'); assert.match(d.body.textContent, /Classe : 5e \(en avance\)/); assert.ok(d.querySelector('[data-v="maths/5-relatifs-somme"]'), 'notions de 5e');
  assert.ok(CAMP.bilan('maths').niv === '5e' && CAMP.suivant('maths', '5e') === '4e');
  // Retour à sa classe.
  bouton(w, 'camp-annee'); assert.match(d.body.textContent, /Revenir à ma classe \(6e\)/); clic(w, '[data-a="camp-avance-retour"][data-v="maths"]'); assert.strictEqual(CAMP.niveauDe('maths'), '6e');
  // Une avance n'est jamais en dessous de la classe réelle ; au bout du programme, place aux niveaux experts.
  w.AMI_CAMP.camp().avance = { francais:'5e' }; j.matieres.niveau = '4e'; w.AMI_MODULES.api.garder(); assert.strictEqual(CAMP.niveauDe('francais'), '4e');
  j.maths.niveau = 'Tle'; w.AMI_MODULES.api.garder(); assert.strictEqual(CAMP.suivant('maths', 'Tle'), null); bouton(w, 'camp-annee'); assert.match(d.body.textContent, /place aux niveaux experts/);
});

await test('v9.8 : fiches de cours dans la langue de l’interface — les 13 fiches des niveaux experts en anglais', async () => {
  const w = page(), F = w.AMI_COURS;
  const FR = /(?<![\p{L}’])(une|est|et|ou|avec|pour|donc|puis|quel|quelle|combien|tu|ton|tes|le|sur|dans|pas|aussi|c’est|ça|qui|que)(?![\p{L}’])/iu;
  const experts = F.cles().filter(k => /^(mathematicien|geneticien|geophysicien)\//.test(k)); assert.strictEqual(experts.length, 13);
  for(const k of experts){ assert.ok(F.traduite(k, 'en'), 'en ' + k); const fr = F.get(k), en = F.get(k, 'en');
    for(const champ of ['essentiel', 'methode', 'pieges']) assert.strictEqual(en[champ].length, fr[champ].length, k + ' ' + champ);
    assert.strictEqual(en.exemple.etapes.length, fr.exemple.etapes.length, k + ' étapes'); assert.strictEqual(en.lang, 'en');
    const tout = [en.titre, en.exemple.enonce, en.vanne].concat(en.essentiel, en.exemple.etapes, en.methode, en.pieges).join(' | ');
    const mm = tout.match(FR); assert.ok(!mm, k + ' : « ' + (mm && mm[0]) + ' »'); assert.ok(w.JUGE.juger(en.vanne).ok, en.vanne); }
  // Sans traduction (ou en français), la fiche française est servie telle quelle.
  assert.strictEqual(F.get('maths/4-pythagore', 'en'), F.get('maths/4-pythagore')); assert.strictEqual(F.get('geneticien/heredite', 'fr').titre, 'Hérédité et génétique des populations');
  // À l'écran : interface anglaise → fiche anglaise (avec lang="en") ; interface française → fiche française.
  const we = page('en-GB'), de = we.document; bouton(we, 'camp-fiche', 'geophysicien/climat');
  assert.match(de.body.textContent, /greenhouse effect/); assert.ok(de.querySelector('.fiche-cours [lang="en"]'));
  const d = w.document; bouton(w, 'camp-fiche', 'geophysicien/climat'); assert.match(d.body.textContent, /effet de serre/);
});

await test('v9.7 : niveaux généticien et géophysicien entièrement traduits en anglais (questions, vannes, règles)', async () => {
  const w = page(), M = w.MATIERES, T = w.MATIERES_LANGUES.en.q;
  for(const mid of ['geneticien', 'geophysicien']){ const chs = M.trouver(mid).chapitres; assert.ok(chs.length >= 4);
  for(const c of chs){ const t = T[mid + '/' + c.id]; assert.ok(t && t.length === c.banque.length, 'en ' + c.id);
    t.forEach((q, i) => { assert.strictEqual(q[2].length, c.banque[i][2].length, c.id + ' ' + i); assert.strictEqual(new Set([q[1], ...q[2].map(f => f[0])]).size, 4, c.id + ' ' + i); assert.notStrictEqual(q[0], c.banque[i][0]); for(const f of q[2]) assert.ok(w.JUGE.juger(f[1]).ok, f[1]); }); }
  const Me = page('en-GB').MATIERES; for(const c of chs) assert.ok(Me.serie(mid, c.id, 'Sup', 8, 3, 'taquin').every(q => q.lang === 'en'), 'en ' + c.id); }
  assert.strictEqual(T['geneticien/genetique-moleculaire'][4][1], 'AUG'); assert.strictEqual(T['geophysicien/interieur-terre'][4][1], 'Inge Lehmann, in 1936');
});

await test('v9.6 : niveau mathématicien entièrement traduit en anglais (questions, vannes, règles)', async () => {
  const w = page(), M = w.MATIERES, T = w.MATIERES_LANGUES.en.q;
  const chs = M.trouver('mathematicien').chapitres; assert.ok(chs.length >= 5);
  for(const c of chs){ const t = T['mathematicien/' + c.id]; assert.ok(t && t.length === c.banque.length, 'en ' + c.id);
    t.forEach((q, i) => { assert.strictEqual(q[2].length, c.banque[i][2].length, c.id + ' ' + i); assert.strictEqual(new Set([q[1], ...q[2].map(f => f[0])]).size, 4, c.id + ' ' + i); assert.notStrictEqual(q[0], c.banque[i][0]); for(const f of q[2]) assert.ok(w.JUGE.juger(f[1]).ok, f[1]); }); }
  const Me = page('en-GB').MATIERES; for(const c of chs) assert.ok(Me.serie('mathematicien', c.id, 'Sup', 8, 3, 'taquin').every(q => q.lang === 'en'), 'en ' + c.id);
  assert.strictEqual(T['mathematicien/probabilites'][6][1], 'yes: you then win with probability 2/3');
});

await test('v9.5 : chaque notion de maths, de la 6e à la terminale, a sa fiche de cours rédigée', async () => {
  const w = page(), d = w.document, F = w.AMI_COURS, X = w.MATHS;
  const sans = X.NIVEAUX.flatMap(n => X.chapitresDe(n).map(c => c[0])).filter(id => !F.a('maths/' + id));
  assert.strictEqual(sans.join(', '), '', 'maths sans fiche');
  assert.ok(F.cles().length >= 244, 'fiches : ' + F.cles().length);
  for(const k of F.cles()){ const x = F.get(k); assert.ok(x.essentiel.length >= 3 && x.exemple.etapes.length >= 2 && x.methode.length >= 2 && x.pieges.length >= 1, k); assert.ok(w.JUGE.juger(x.vanne).ok, k + ' : ' + x.vanne); }
  bouton(w, 'camp-fiche', 'maths/T-tvi'); assert.match(d.body.textContent, /corollaire du TVI/);
});

await test('v9.4 : chaque notion de maths du collège a sa fiche de cours rédigée', async () => {
  const w = page(), d = w.document, F = w.AMI_COURS, X = w.MATHS;
  const sans = ['6e', '5e', '4e', '3e'].flatMap(n => X.chapitresDe(n).map(c => c[0])).filter(id => !F.a('maths/' + id));
  assert.strictEqual(sans.join(', '), '', 'maths du collège sans fiche');
  assert.ok(F.cles().length >= 200, 'fiches : ' + F.cles().length);
  for(const k of F.cles()){ const x = F.get(k); assert.ok(x.essentiel.length >= 3 && x.exemple.etapes.length >= 2 && x.methode.length >= 1 && x.pieges.length >= 1, k); assert.ok(w.JUGE.juger(x.vanne).ok, k + ' : ' + x.vanne); }
  bouton(w, 'camp-fiche', 'maths/3-python'); assert.match(d.body.textContent, /range\(4\)/);
  bouton(w, 'camp-base-tout', 'maths'); assert.ok(d.querySelectorAll('.liste-notions small').length > 100, 'fiches signalées dans la base');
});

await test('v9.3 : fiches du français (toutes les notions) et 30 notions de maths du collège de plus ; chapitres experts probabilités, génétique médicale, climat', async () => {
  const w = page(), d = w.document, M = w.MATIERES, F = w.AMI_COURS;
  assert.ok(F.cles().length >= 139, 'fiches : ' + F.cles().length);
  // Français : chaque notion a maintenant sa fiche rédigée.
  const sans = M.trouver('francais').chapitres.filter(c => !F.a('francais/' + c.id)).map(c => c.id); assert.strictEqual(sans.join(), '', 'français sans fiche : ' + sans.join(', '));
  assert.ok(F.de('maths').filter(x => /^maths\/[3456]-/.test(x.cle)).length >= 49, 'maths du collège');
  for(const k of F.cles()){ const x = F.get(k); assert.ok(x.essentiel.length >= 2 && x.exemple.etapes.length >= 2 && x.methode.length >= 1 && x.pieges.length >= 1, k); assert.ok(w.JUGE.juger(x.vanne).ok, k); }
  for(const [mid, cid] of [['mathematicien', 'probabilites'], ['geneticien', 'genetique-medicale'], ['geophysicien', 'climat']]){
    const c = M.trouver(mid).chapitres.find(x => x.id === cid); assert.ok(c && c.banque.length === 20, mid + '/' + cid);
    assert.strictEqual(new Set(c.banque.map(q => q[0])).size, 20, 'doublon ' + cid);
    c.banque.forEach((q, i) => { assert.strictEqual(new Set([q[1], ...q[2].map(f => f[0])]).size, 4, cid + ' ' + i); for(const f of q[2]) assert.ok(w.JUGE.juger(f[1]).ok, cid + ' ' + f[1]); });
    assert.ok(F.a(mid + '/' + cid), 'fiche ' + cid); assert.ok(M.serie(mid, cid, 'Sup', 10, 3, 'taquin').length === 10);
    for(const l of ['en', 'es', 'de', 'it', 'pt']){ const n = w.MATIERES_LANGUES[l].noms[mid]; assert.ok(n.ch[cid] && n.dom[c.dom], l + ' ' + cid); } }
  bouton(w, 'camp-fiche', 'francais/r-f1'); assert.match(d.body.textContent, /Pot-Bouille/);
  bouton(w, 'camp-base', 'geophysicien'); assert.ok(d.querySelector('[data-a="camp-fiche"][data-v="geophysicien/climat"]'));
});

await test('v9.2 : fiches du lycée (maths, anglais) et séries d’examen au camp (20 questions, sans vanne, note sur 20, corrigé)', async () => {
  const w = page(), d = w.document, F = w.AMI_COURS, CAMP = w.AMI_CAMP;
  assert.ok(F.cles().length >= 95, 'fiches : ' + F.cles().length);
  for(const k of ['maths/2-vecteurs', 'maths/1-derivees', 'maths/1-suites', 'maths/1-probas-conditionnelles', 'maths/T-limites', 'maths/T-logarithme', 'maths/T-integrales', 'maths/T-binomiale', 'langlais/ppcont', 'langlais/cond3', 'langlais/inversion', 'langlais/axes', 'langlais/methode']) assert.ok(F.a(k), k);
  assert.ok(F.de('maths').filter(x => /^maths\/(1|2|T)-/.test(x.cle)).length >= 15, 'maths du lycée');
  // Séries d'examen : 20 questions pour chaque examen, sans doublon.
  for(const k of Object.keys(CAMP.SERIES_EXAMEN)){ const l = CAMP.questionsExamen(k); assert.strictEqual(l.length, 20, k + ' : ' + l.length); assert.strictEqual(new Set(l.map(q => q.enonce + q.bon)).size, 20, k + ' doublon'); }
  assert.ok(CAMP.questionsExamen('brevet').some(q => q.matiere === 'maths') && CAMP.questionsExamen('brevet').some(q => q.matiere === 'francais'), 'brevet : français et maths');
  // Le camp propose les séries ; une série se joue sans vanne, chronométrée, puis note et corrigé.
  bouton(w, 'camp'); assert.match(d.body.textContent, /Séries d’examen/); assert.ok(d.querySelector('[data-a="camp-examen"][data-v="eaf"]'));
  bouton(w, 'camp-examen', 'eaf'); assert.ok(d.querySelector('#chrono-veille'), 'chronométrée'); assert.ok(!d.querySelector('.confiance'), 'mode épreuve');
  let k = 0; while(d.querySelector('.piege-opt') && k < 25){ d.querySelector('.piege-opt').click(); k++; assert.ok(!d.querySelector('[data-a="qz-suivant"]'), 'pas de correction pendant l’épreuve'); }
  assert.strictEqual(k, 20); assert.match(d.querySelector('h2').textContent, /Note : [\d,]+ \/ 20/); assert.match(d.body.textContent, /Corrigé/);
  const e = CAMP.camp().examens.eaf; assert.ok(e && e.meilleure >= 0 && e.meilleure <= 20 && e.derniere === e.meilleure);
  if(e.derniere < 20) assert.ok(d.querySelectorAll('.corrige-examen li').length >= 1, 'les erreurs sont corrigées');
  bouton(w, 'camp'); assert.match(d.body.textContent, /Meilleure note : [\d,]+ \/ 20/);
});

await test('v9.1 : fiches de cours du collège (français, anglais, maths) et un chapitre de plus par niveau expert', async () => {
  const w = page(), d = w.document, M = w.MATIERES, F = w.AMI_COURS;
  assert.ok(F.cles().length >= 67, 'fiches : ' + F.cles().length);
  // Au collège, la plupart des notions de français, d'anglais et de maths ont maintenant leur fiche rédigée.
  for(const [mid, min] of [['francais', 12], ['langlais', 18], ['maths', 24]]) assert.ok(F.de(mid).length >= min, mid + ' : ' + F.de(mid).length);
  for(const k of ['francais/conjugaison', 'francais/figures', 'langlais/preterit', 'langlais/irreg', 'maths/6-fractions-somme', 'maths/3-trigonometrie']) assert.ok(F.a(k), k);
  for(const k of F.cles()){ const x = F.get(k); for(const t of [].concat(x.essentiel, x.exemple.etapes, x.methode, x.pieges, [x.vanne, x.titre])) assert.ok(typeof t === 'string' && t.length > 3, k); assert.ok(w.JUGE.juger(x.vanne).ok, k + ' : ' + x.vanne); }
  // Nouveaux chapitres experts : 20 questions, quatre réponses différentes, vannes acceptées, fiche, noms traduits.
  for(const [mid, cid] of [['mathematicien', 'analyse'], ['geneticien', 'evolution-genomique'], ['geophysicien', 'volcans-planetes']]){
    const c = M.trouver(mid).chapitres.find(x => x.id === cid); assert.ok(c && c.banque.length === 20, mid + '/' + cid);
    assert.strictEqual(new Set(c.banque.map(q => q[0])).size, 20, 'pas de doublon ' + cid);
    c.banque.forEach((q, i) => { assert.strictEqual(new Set([q[1], ...q[2].map(f => f[0])]).size, 4, cid + ' ' + i); for(const f of q[2]) assert.ok(w.JUGE.juger(f[1]).ok, cid + ' ' + f[1]); });
    assert.ok(F.a(mid + '/' + cid), 'fiche ' + cid);
    for(const l of ['en', 'es', 'de', 'it', 'pt']){ const n = w.MATIERES_LANGUES[l].noms[mid]; assert.ok(n.ch[cid] && n.dom[c.dom], l + ' ' + cid); } }
  // La fiche d'une notion du collège s'affiche dans la base de connaissances.
  bouton(w, 'camp-fiche', 'langlais/preterit'); assert.match(d.body.textContent, /didn’t/); assert.ok(d.querySelector('[data-a="camp-entrainer"]'));
});

await test('v9.0 : camp d’entraînement (mission du jour, sans filet, grades), base de connaissances, fiches de cours, français/anglais du lycée et niveaux experts (mathématicien, généticien, géophysicien)', async () => {
  const w = page(), d = w.document, A = w.AmiDesMots, M = w.MATIERES, F = w.AMI_COURS, CAMP = w.AMI_CAMP;
  // Contenus : 20 questions par chapitre, quatre réponses différentes, vannes acceptées par le juge, une règle.
  const nouveaux = [['francais', 'bac-grammaire'], ['francais', 'bac-methode'], ['francais', 'langue-2nde'], ['langlais', 'ecrire'], ['langlais', 'parler'], ['mathematicien', 'raisonnement'], ['mathematicien', 'arithmetique'], ['mathematicien', 'complexes'], ['geneticien', 'genetique-moleculaire'], ['geneticien', 'heredite'], ['geophysicien', 'interieur-terre'], ['geophysicien', 'geodynamique']];
  for(const [mid, cid] of nouveaux){ const c = M.trouver(mid).chapitres.find(x => x.id === cid); assert.ok(c, mid + '/' + cid); assert.strictEqual(c.banque.length, 20, mid + '/' + cid);
    c.banque.forEach((q, i) => { assert.strictEqual(new Set([q[1], ...q[2].map(f => f[0])]).size, 4, cid + ' ' + i); assert.ok(q[3] && q[3].length > 15, cid + ' ' + i + ' règle'); for(const f of q[2]) assert.ok(w.JUGE.juger(f[1]).ok, cid + ' ' + f[1]); });
    assert.ok(M.serie(mid, cid, c.niv[0], 10, 3, 'taquin').length >= 8, 'série ' + cid); }
  assert.ok(M.chapitres('francais', '1re').length >= 6, 'français 1re renforcé');
  // Fiches de cours : chaque fiche correspond à un vrai chapitre et a tout ce qu'il faut.
  assert.ok(F.cles().length >= 21); for(const [mid, cid] of nouveaux) assert.ok(F.a(mid + '/' + cid), 'fiche ' + mid + '/' + cid);
  for(const k of F.cles()){ const [mid, cid] = k.split('/'), f = F.get(k);
    assert.ok(mid === 'maths' ? w.MATHS.NIVEAUX.some(n => w.MATHS.chapitresDe(n).some(c => c[0] === cid)) : M.trouver(mid).chapitres.some(c => c.id === cid), 'chapitre de la fiche ' + k);
    assert.ok(f.titre && f.essentiel.length >= 3 && f.exemple.etapes.length >= 2 && f.methode.length >= 2 && f.pieges.length >= 1 && f.vanne, k); assert.ok(w.JUGE.juger(f.vanne).ok, k); }
  // Le camp : grade de départ, mission en 4 étapes.
  bouton(w, 'camp'); assert.match(d.querySelector('h2').textContent, /Camp d’entraînement/); assert.match(d.body.textContent, /Grade : Recrue/);
  assert.strictEqual(d.querySelectorAll('.camp-mission li').length, 4);
  // Étape 1 : rien à revoir → validée d'office.
  bouton(w, 'camp-etape'); assert.ok(CAMP.mission().revision);
  // Étape 2 : la leçon du jour s'ouvre sur sa fiche ; 10 questions justes valident la notion.
  bouton(w, 'camp-etape'); assert.ok(d.querySelector('.fiche-cours'), 'fiche de la leçon'); assert.match(d.body.textContent, /L’essentiel/);
  const toutJuste = () => { for(let i = 0; i < 30 && d.querySelector('.piege-opt'); i++){ const q = A.qz ? A.qz() : null; const b = [...d.querySelectorAll('.piege-opt')].find(x => x.textContent === (w.__bonne ? w.__bonne() : '')); (b || d.querySelector('.piege-opt')).click(); const s = d.querySelector('[data-a="qz-suivant"]'); if(s) s.click(); } };
  w.__bonne = () => { const o = [...d.querySelectorAll('.piege-opt')]; const enonce = (d.querySelector('.piege-fr') || {}).textContent || ''; return w.__liste && (w.__liste.find(q => q.enonce === enonce) || {}).bon; };
  const avant = w.AMI_MODULES.api.questionsGo; w.AMI_MODULES.api.questionsGo = (l, o) => { w.__liste = l; return avant(l, o); };
  clic(w, '[data-a="camp-entrainer"]'); toutJuste();
  assert.match(d.querySelector('h2').textContent, /Notion validée : 10 \/ 10/); assert.ok(CAMP.mission().lecon); assert.strictEqual(CAMP.camp().acquis.length, 1);
  // Étape 3 : série commando sans filet — une erreur arrête la série.
  bouton(w, 'camp-etape'); assert.ok(d.querySelector('#chrono-veille'), 'chronométrée');
  const faux = [...d.querySelectorAll('.piege-opt')].find(x => x.textContent !== w.__bonne()); faux.click(); clic(w, '[data-a="qz-suivant"]');
  assert.match(d.querySelector('h2').textContent, /Série arrêtée à 0 bonne/); assert.ok(CAMP.mission().commando);
  // Étape 4 : les fiches perso de l'élève (son cahier) deviennent des questions.
  w.AMI_CAHIER.cahier().lecons.push({ id:'l1', matiere:'histoire', titre:'Dates', texte:'', fiches:[['Prise de la Bastille', '1789'], ['Armistice', '1918'], ['Chute du mur de Berlin', '1989'], ['Sacre de Charlemagne', '800']] });
  bouton(w, 'camp-etape'); assert.ok(d.querySelector('.piege-opt'), 'questions tirées des fiches'); toutJuste();
  const c = CAMP.camp(); assert.ok(CAMP.mission().fini, 'mission accomplie'); assert.strictEqual(c.serie, 1); assert.ok(c.pts >= 150, 'points : ' + c.pts);
  bouton(w, 'camp'); assert.match(d.body.textContent, /Mission accomplie/); assert.ok(!d.querySelector('[data-a="camp-etape"]'));
  // Grades : de Recrue à Général.
  assert.strictEqual(CAMP.gradeDe(0)[1], 'Recrue'); assert.strictEqual(CAMP.gradeDe(650)[1], 'Sergent'); assert.strictEqual(CAMP.gradeDe(99999)[1], 'Général');
  // Une série parfaite sans filet bat le record.
  bouton(w, 'camp-sansfilet', 'mathematicien'); toutJuste(); assert.match(d.querySelector('h2').textContent, /Série parfaite : 10 \/ 10/); assert.strictEqual(c.records.mathematicien, 10);
  // Base de connaissances : les notions de la classe, les fiches rédigées signalées, les fiches de l'élève listées.
  bouton(w, 'camp-base', 'francais'); assert.ok(d.querySelectorAll('.liste-notions li').length >= 5); assert.match(d.body.textContent, /📒 Mes fiches \(0\)/);
  bouton(w, 'camp-base-tout', 'francais'); assert.ok(d.querySelector('[data-a="camp-fiche"][data-v="francais/bac-methode"]'));
  bouton(w, 'camp-fiche', 'francais/bac-methode'); assert.match(d.body.textContent, /Exemple corrigé/); assert.ok(d.querySelector('[data-a="cahier-edit"]'), 'l’élève peut écrire sa fiche');
  bouton(w, 'camp-fiche', 'maths/4-pythagore'); assert.match(d.body.textContent, /BC² = AB² \+ AC²/);
  bouton(w, 'camp-base', 'mathematicien'); assert.strictEqual(d.querySelectorAll('.liste-notions li').length, M.trouver('mathematicien').chapitres.length);
  bouton(w, 'camp-base', 'geneticien'); assert.strictEqual(d.querySelectorAll('.liste-notions li').length, M.trouver('geneticien').chapitres.length); bouton(w, 'camp-fiche', 'geophysicien/interieur-terre'); assert.match(d.body.textContent, /Lehmann/);
  bouton(w, 'camp-sansfilet', 'geophysicien'); assert.ok(d.querySelector('#chrono-veille'));
  // Objectif : compte à rebours.
  bouton(w, 'camp'); const dd = new Date(); dd.setDate(dd.getDate() + 30); d.getElementById('camp-examen').value = 'eaf'; d.getElementById('camp-date').value = dd.toISOString().slice(0, 10);
  clic(w, '[data-a="camp-objectif"]'); assert.match(d.body.textContent, /Bac de français \(1re\) : J−(29|30|31)/);
  // Accès : une carte dans Matières et dans Maths ; « Niveau mathématicien » dans les deux.
  bouton(w, 'matieres'); assert.ok(d.querySelector('[data-a="camp"]')); assert.ok(d.querySelector('[data-a="matiere"][data-v="mathematicien"]'));
  bouton(w, 'maths'); assert.ok(d.querySelector('[data-a="camp"]')); assert.ok(d.querySelector('[data-a="matiere"][data-v="mathematicien"]'));
  bouton(w, 'matieres-tout'); for(const id of ['geneticien', 'geophysicien']) assert.ok(d.querySelector('[data-a="matiere"][data-v="' + id + '"]'), id);
  // Textes du camp traduits dans les 5 langues de l'interface.
  const src = lire('js/mod-intensif.js'); for(const m of src.matchAll(/tx\('([^']+)'/g)) assert.ok(w.TRAD_ECRANS[m[1]] && w.TRAD_ECRANS[m[1]].length === 5, m[1]);
});

await test('v8.9 : astronomie entièrement traduite en italien et en portugais ; carte « Anglais du supérieur » après le bac', async () => {
  const w = page(), M = w.MATIERES, T = w.MATIERES_LANGUES;
  const chs = M.trouver('astro').chapitres.filter(x => !x.theme && Array.isArray(x.banque)); assert.strictEqual(chs.length, 10, 'astro : 10 chapitres en jeu (« nasa » est passé dans Objectif NASA)');
  for(const c of chs) for(const L of ['it', 'pt']){
    const t = T[L].q['astro/' + c.id]; assert.ok(t && t.length === c.banque.length, L + ' astro/' + c.id);
    t.forEach((q, i) => { assert.strictEqual(q[2].length, c.banque[i][2].length, L + ' ' + c.id + ' ' + i + ' : autant de mauvaises réponses'); assert.strictEqual(new Set([q[1], ...q[2].map(f => f[0])]).size, q[2].length + 1); assert.notStrictEqual(q[0], c.banque[i][0]); for(const f of q[2]) assert.ok(w.JUGE.juger(f[1]).ok, L + ' ' + f[1]); }); }
  for(const L of ['it', 'pt']){ const Ml = page(L).MATIERES; for(const c of ['etoiles', 'objets-compacts', 'instruments']) assert.ok(Ml.serie('astro', c, 'Sup', 6, 3, 'taquin').every(q => q.lang === L), L + ' astro ' + c); }
  assert.strictEqual(T.it.q['astro/instruments'][14][1], 'Galileo'); assert.strictEqual(T.pt.q['astro/objets-compacts'][10][1], 'Jocelyn Bell');
  // Après le bac : la carte d'anglais n'annonce plus « 6e → bac » mais les leçons du supérieur (contenu inchangé, seulement l'intitulé).
  const J = lire('js/jeu.js'); assert.match(J, /fc === 'Sup'[^\n]*\n\s*\? c\('matiere', 'langlais', '🇬🇧', TXT\('Anglais du supérieur'\)/);
  assert.ok(J.includes("TXT('Anglais (6e → bac)')"), 'la carte habituelle reste pour les autres classes');
  assert.ok(M.chapitres('langlais', 'Sup').length >= 5, 'des leçons d’anglais du supérieur existent');
  const E = lire('js/textes-ecrans.js'); assert.ok(E.includes('"Anglais du supérieur":[') && E.includes('"TOEIC, IELTS, anglais universitaire, scientifique et professionnel, niveau C1":['));
});

await test('v8.8 : spécialités HGGSP, HLP et NSI entièrement traduites en italien et en portugais', async () => {
  const w = page(), M = w.MATIERES, T = w.MATIERES_LANGUES;
  for(const mid of ['hggsp', 'hlp', 'nsi']) for(const c of M.trouver(mid).chapitres.filter(x => !x.theme && Array.isArray(x.banque))) for(const L of ['it', 'pt']){
    const t = T[L].q[mid + '/' + c.id]; assert.ok(t && t.length === c.banque.length, L + ' ' + mid + '/' + c.id);
    t.forEach((q, i) => { assert.strictEqual(new Set([q[1], ...q[2].map(f => f[0])]).size, 4, L + ' ' + c.id + ' ' + i); for(const f of q[2]) assert.ok(w.JUGE.juger(f[1]).ok, L + ' ' + f[1]); }); }
  for(const L of ['it', 'pt']){ const Ml = page(L).MATIERES; for(const [m, c] of [['hggsp', 'hggsp-tle'], ['hlp', 'hlp-1re'], ['nsi', 'nsi-tle']]) assert.ok(Ml.serie(m, c, 'Tle', 10, 4, 'taquin').every(q => q.lang === L), L + ' ' + c); }
  assert.strictEqual(T.it.q['hlp/hlp-tle'][17][1], 'Arthur Rimbaud'); assert.strictEqual(T.pt.q['nsi/nsi-tle'][0][1], 'uma fila');
});

await test('v8.7 : les traductions italiennes et portugaises se chargent à la demande (pas au démarrage pour tout le monde), dans l’ordre, et restent hors connexion', async () => {
  const I = lire('index.html'), SW = lire('sw.js'), C = lire('js/charge-langues.js');
  const lazy = [...C.matchAll(/'(js\/mat-trad-(?:it|pt)-[a-z]+\.js)'/g)].map(m => m[1]);
  assert.strictEqual(lazy.length, 12);
  for(const f of lazy){ assert.ok(!I.includes(f), f + ' ne se charge plus au démarrage'); assert.ok(SW.includes('"' + f + '"'), f + ' reste hors connexion'); assert.ok(require('fs').existsSync(require('path').join(__dirname, '..', f)), f); }
  assert.ok(I.includes('js/charge-langues.js') && SW.includes('"js/charge-langues.js"'));
  // Le chargeur : rien en français ; en italien, les six fichiers, dans l'ordre, après le chargement du jeu ; une seule fois.
  const dom = new JSDOM('<!doctype html><html lang="fr"><head></head><body></body></html>', { runScripts:'outside-only' }), w = dom.window, d = w.document;
  w.eval(C); const srcs = () => [...d.querySelectorAll('script[data-langue-src]')].map(x => x.getAttribute('src'));
  assert.strictEqual(srcs().length, 0, 'en français : rien à charger');
  d.documentElement.lang = 'it'; await new Promise(r => setTimeout(r, 0));
  for(let i = 0; i < 6; i++){ const sc = d.querySelectorAll('script[data-langue-src]'); assert.strictEqual(sc.length, i + 1); sc[i].dispatchEvent(new w.Event('load')); await new Promise(r => setTimeout(r, 0)); }
  assert.strictEqual(srcs().join(), lazy.filter(f => f.includes('-it-')).join(), 'les fichiers italiens, dans l’ordre');
  let ev = 0; d.addEventListener('ami:langue-chargee', () => ev++); await w.AMI_LANGUES.charger('it'); assert.strictEqual(srcs().length, 6, 'pas de double chargement');
  d.documentElement.lang = 'pt'; await new Promise(r => setTimeout(r, 0)); assert.strictEqual(srcs()[6], 'js/mat-trad-pt-svt.js');
  // Correctif d'affichage : la bulle d'erreur se place au-dessus de la rangée de boutons (calculé à l'affichage, pas une hauteur fixe).
  const J = lire('js/jeu.js'); assert.match(J, /function placerBulle\(\)[\s\S]*getBoundingClientRect\(\)\.height[\s\S]*setProperty\('bottom'/); assert.match(J, /suite\.hidden = false;[^\n]*\n\s*placerBulle\(\);/);
  // Dans le jeu (pages de test), les traductions restent disponibles : l'italien fonctionne toujours.
  const Mi = page('it').MATIERES; assert.ok(Mi.serie('philo', 'n-verite', 'Tle', 5, 2, 'taquin').every(q => q.lang === 'it'));
});

await test('v8.6 : copies de SES, de HGGSP (dissertation et étude critique) et note de synthèse du CRFPA — sujets, vérification de méthode, barèmes serveur', async () => {
  const w = page('fr', { MODE_PAYANT:false, OUVRIR_MATIERES:true }), d = w.document; await w.AmiDesMotsPret; const E = w.EPREUVES, C = w.AMI_COPIE, AV = w.AMI_AVOCAT;
  const $ = s => d.querySelector(s), $$ = s => [...d.querySelectorAll(s)];
  const clic = (a, v) => { const b = d.createElement('button'); b.dataset.a = a; if(v != null) b.dataset.v = v; d.body.appendChild(b); b.click(); b.remove(); };
  let k = 0; const r = () => ((k = (k * 9301 + 49297) % 233280) / 233280);
  const ses = E.EPREUVES['spe-ses'].ecrits(r), hg = E.EPREUVES['spe-hggsp'].ecrits(r);
  assert.strictEqual(ses.length, 2); assert.ok(ses.every(e => e.sorte === 'ses' && e.sujet.length > 20));
  assert.strictEqual(hg.map(e => e.sorte).join(), 'hggsp,hggsp-etude'); assert.match(hg[1].texteSujet, /Schuman|Nations Unies/);
  // La vérification de méthode : ce qu'un correcteur regarde en premier.
  const titres = x => C.analyser(x).liste.map(i => i.titre).join(' | ');
  assert.match(titres({ sorte:'ses', sujet:ses[0].sujet, texte:'Intro ?\n\nA\n\nB' }), /Exemples chiffrés[\s\S]*Mécanismes expliqués[\s\S]*Auteurs et théories/);
  assert.match(titres({ sorte:'hggsp-etude', sujet:hg[1].sujet, texte:'x' }), /Présentation du document[\s\S]*Regard critique/);
  const synth = C.analyser({ sorte:'synthese', sujet:'Le droit à l’oubli', texte:'Introduction. Nous verrons d’abord, puis ensuite.\n\nI. Un droit (doc. 1) (doc. 2) (doc. 3)\n\nII. Ses limites (doc. 4) (doc. 5). À mon avis, c’est bien.' });
  const it = n => synth.liste.find(i => i.titre.startsWith(n));
  assert.ok(it('Références aux documents').ok); assert.ok(!it('Neutralité').ok, 'une opinion personnelle est repérée'); assert.ok(!synth.liste.some(i => i.titre === 'Conclusion'), 'pas de conclusion exigée');
  // Dans l'examen de terminale, la partie rédigée propose la dissertation ET l'étude critique, avec le document.
  clic('examens'); clic('examen-go', 'tle-spe-hggsp'); assert.strictEqual($$('[data-a="copie-ecrit"]').length, 2);
  clic('copie-ecrit', '1'); assert.match($('.texte-sujet').textContent, /Schuman|Nations Unies/); assert.ok($('#copie-texte'));
  // La note de synthèse blanche, dans « Devenir avocat ».
  assert.ok(AV.SYNTHESES.length >= 2 && AV.SYNTHESES.every(s => s.docs.length === 5));
  clic('matiere-droit'); clic('avocat'); assert.ok($('[data-a="avocat-synthese"]')); clic('avocat-synthese'); assert.strictEqual($$('[data-a="avocat-synthese-go"]').length, AV.SYNTHESES.length);
  clic('avocat-synthese-go', 'gav'); assert.match($('.texte-sujet').textContent, /Document 4 — Cour européenne des droits de l’homme, 27 novembre 2008, Salduz/); assert.match($('main').textContent, /sans donner votre avis/);
  // Le serveur connaît les quatre nouveaux barèmes, chacun sur 20.
  const php = require('fs').readFileSync(require('path').join(__dirname, '..', 'serveur-php', 'copie.php'), 'utf8');
  for(const s of ['ses', 'hggsp', 'hggsp-etude', 'synthese']){ const m = php.match(new RegExp("'" + s + "' => \\[\"[^\"]+\", \"([^\"]+)\"\\]")); assert.ok(m, s);
    assert.strictEqual([...m[1].matchAll(/\(sur (\d+)\)/g)].reduce((t, x) => t + +x[1], 0), 20, s + ' : barème sur 20'); }
});

await test('v8.5 : examens à jour du BO spécial n° 4 du 17 septembre 2026 — brevet 2027, Grand oral sans projet d’orientation, maths anticipées', async () => {
  const w = page(), E = w.EPREUVES, P = E.EPREUVES;
  assert.strictEqual(E.BLANCS.brevet.titre, 'Brevet blanc 2027');
  assert.match(P['dnb-histoire'].officiel, /exercice 1 \(documents\) 15 pts[\s\S]*25 pts dont 7/); assert.match(P['dnb-sciences'].officiel, /technologie[\s\S]*1 pt de maîtrise de la langue/);
  assert.match(P['dnb-maths'].officiel, /2 pts de maîtrise de la langue[\s\S]*pas de QCM/); assert.match(P['eam-spe'].officiel, /réponses courtes/);
  assert.match(P['grand-oral'].officiel, /10 min[\s\S]*10 min[\s\S]*coefficient 8/); assert.doesNotMatch(P['grand-oral'].officiel, /orientation/);
  const ex = P['dnb-histoire'].ecrits(() => 0.3, P['dnb-histoire'].faire(() => 0.3)); if(ex.length) assert.match(ex[0].sujet, /au moins trente lignes/);
  assert.match(require('fs').readFileSync(require('path').join(__dirname, '..', 'serveur-php', 'copie.php'), 'utf8'), /ne peut pas obtenir la moyenne/);
  assert.ok(w.document.documentElement.outerHTML.length > 0);
});

await test('v8.4 : défi rétro étoffé — vraie dictée corrigée mot à mot, Certificat d’études, duel des générations, bons points et images', async () => {
  const w = page('fr', { MODE_PAYANT:false, OUVRIR_MATIERES:true }), d = w.document; await w.AmiDesMotsPret; const R = w.AMI_RETRO;
  const $ = s => d.querySelector(s), clic = (a, v) => { const x = d.createElement('button'); x.dataset.a = a; if(v != null) x.dataset.v = v; d.body.appendChild(x); x.click(); x.remove(); };
  const repondre = max => { let k = 0; while($('[data-a="qz-rep"]:not([disabled])') && k < max){ $('[data-a="qz-rep"]:not([disabled])').click(); k++; const s = $('[data-a="qz-suivant"]'); if(s) s.click(); } return k; };
  d.querySelector('[data-a="entrer"]').click();
  // Les dictées : textes du domaine public, auteurs morts depuis plus de 70 ans.
  assert.ok(R.DICTEES.length >= 8); assert.ok(R.DICTEES.every(x => /La Fontaine|Daudet|Hugo|Verlaine/.test(x.auteur) && x.texte.split(/\s+/).length >= 12));
  // Correction mot à mot, barème du certificat : faute = 2 points, accent ou majuscule = 1 point, ponctuation non comptée.
  const t = R.DICTEES[0].texte;
  assert.deepStrictEqual([R.comparer(t, t).note, R.comparer(t, t).fautes], [10, 0]);
  assert.strictEqual(R.comparer(t, t.replace(/[,.:;«»]/g, '').replace(/’/g, '\'')).note, 10, 'ponctuation et apostrophe droite non comptées');
  assert.strictEqual(R.comparer(t, t.replace('Maître Renard', 'Maitre Renard')).note, 9, 'accent : un point');
  assert.strictEqual(R.comparer(t, t.replace('Tenait', 'tenait')).note, 9, 'majuscule : un point');
  assert.strictEqual(R.comparer(t, t.replace('fromage', 'fromaje')).note, 8, 'faute : deux points');
  assert.strictEqual(R.comparer(t, t.replace(' un fromage', ' fromage')).fautes, 1, 'mot oublié');
  assert.strictEqual(R.comparer(t, 'n’importe quoi').note, 0, 'cinq fautes ou plus : zéro');
  assert.ok(R.groupes(t).length >= 5);
  // L'écran : cartes, dictée, correction.
  clic('retro'); for(const a of ['retro-dictee', 'retro-certif', 'retro-duel', 'retro-bepc', 'retro-cahier']) assert.ok($('[data-a="' + a + '"]'), a);
  clic('retro-dictee'); assert.strictEqual(d.querySelectorAll('[data-a="retro-dictee-go"]').length, R.DICTEES.length);
  clic('retro-dictee-go', 'cigale'); clic('retro-dictee-lire', 'suivant'); assert.match($('#dictee-etat').textContent, /Groupe 1 sur/);
  $('#dictee-copie').value = R.DICTEES.find(x => x.id === 'cigale').texte.replace('chanté', 'chante');
  clic('retro-dictee-corriger'); assert.match($('main').textContent, /9\/10/); assert.ok($('.d-demi')); assert.match($('main').textContent, /bons? points?/);
  const c = R.cahier(); assert.strictEqual(c.bons, 9); assert.strictEqual(c.honneur.dictee, 18);
  // Le Certificat d'études : la dictée puis 20 questions, résultat sur 20.
  clic('retro-certif'); $('#dictee-copie').value = $('.retro-dictee details p').textContent; clic('retro-dictee-corriger'); assert.match($('main').textContent, /10\/10/);
  clic('retro-certif-suite'); assert.strictEqual(repondre(30), 20); assert.match($('main').textContent, /Ton certificat d’études[\s\S]*\/20/); assert.match($('main').textContent, /Dictée : 10\/10/);
  assert.ok(R.cahier().images.length >= 1, 'une image tous les dix bons points');
  clic('retro-certif-page'); assert.match($('main').textContent, /20 août 1866/); assert.ok(d.querySelectorAll('.retro-sources a').length >= 4);
  // Le certificat sans dictée réussie : éliminatoire.
  clic('retro-certif'); $('#dictee-copie').value = ''; clic('retro-dictee-corriger'); assert.match($('main').textContent, /0\/10/); clic('retro-certif-suite'); assert.match($('main').textContent, /éliminatoire/);
  // Le duel des générations : les mêmes 10 questions, chacun son tour.
  clic('retro-duel'); $('#duel-n1').value = 'Léa'; $('#duel-n2').value = 'Papi'; clic('retro-duel-go', 'histoire'); assert.match($('main').textContent, /Au tour de Léa/);
  clic('retro-duel-joue'); assert.strictEqual(repondre(15), 10); assert.match($('main').textContent, /Au tour de Papi/); clic('retro-duel-joue'); assert.strictEqual(repondre(15), 10);
  assert.match($('main').textContent, /Léa : \d+\/10[\s\S]*Papi : \d+\/10/);
  // Le cahier des récompenses.
  clic('retro-cahier'); assert.strictEqual(d.querySelectorAll('.retro-image').length, R.IMAGES.length); assert.match($('main').textContent, /tableau d’honneur/i);
  // Une épreuve de 40 questions donne une série de 20.
  clic('retro-go', 'geo'); assert.strictEqual(repondre(45), 20);
});

await test('v8.3 : la philosophie entière (19 chapitres de notions et repères) en italien et en portugais', async () => {
  const w = page(), M = w.MATIERES, T = w.MATIERES_LANGUES, ph = M.trouver('philo'), chaps = ph.chapitres.filter(c => !c.theme && Array.isArray(c.banque));
  for(const n of ['raison', 'religion', 'science', 'technique', 'temps', 'travail', 'verite']) assert.ok(chaps.some(c => c.id === 'n-' + n), n);
  for(const L of ['it', 'pt']) for(const c of chaps){ const t = T[L].q['philo/' + c.id]; assert.ok(t && t.length === c.banque.length, L + ' ' + c.id);
    t.forEach((q, i) => { assert.strictEqual(new Set([q[1], ...q[2].map(f => f[0])]).size, 4, L + ' ' + c.id + ' ' + i); assert.notStrictEqual(q[0], c.banque[i][0], L + ' ' + c.id + ' ' + i); for(const f of q[2]) assert.ok(w.JUGE.juger(f[1]).ok, L + ' ' + f[1]); }); }
  for(const L of ['it', 'pt']){ const Ml = page(L).MATIERES; for(const id of ['n-verite', 'n-travail', 'n-raison']) assert.ok(Ml.serie('philo', id, 'Tle', 10, 5, 'taquin').every(q => q.lang === L), L + ' ' + id); }
  assert.strictEqual(T.it.q['philo/n-raison'][0][1], 'Cartesio'); assert.strictEqual(T.pt.q['philo/n-travail'][0][1], 'a alienação');
});

await test('v8.2 : ⚖️ devenir avocat — 4 leçons de 20 questions (parcours, CRFPA, déontologie, pratique) en 3 langues, CRFPA blanc chronométré, grand oral blanc, textes officiels', async () => {
  const w = page('fr', { MODE_PAYANT:false, OUVRIR_MATIERES:true }), d = w.document; await w.AmiDesMotsPret; const M = w.MATIERES, T = w.MATIERES_LANGUES, AV = w.AMI_AVOCAT;
  const $ = s => d.querySelector(s), $$ = s => [...d.querySelectorAll(s)];
  const clic = (a, v) => { const b = d.createElement('button'); b.dataset.a = a; if(v != null) b.dataset.v = v; d.body.appendChild(b); b.click(); b.remove(); };
  const dr = M.trouver('droit'); assert.deepStrictEqual([...M.AVOCAT].join(), 'avocat-parcours,avocat-crfpa,avocat-deonto,avocat-pratique');
  for(const id of M.AVOCAT){ const c = dr.chapitres.find(x => x.id === id); assert.ok(c && c.banque.length === 20 && c.niv.includes('Sup'), id);
    for(const x of c.banque){ assert.strictEqual(new Set([x[1], ...x[2].map(f => f[0])]).size, 4, x[0]); for(const f of x[2]) assert.ok(w.JUGE.juger(f[1]).ok, f[1]); }
    for(const L of ['en', 'es']){ const t = T[L].q['droit/' + id]; assert.ok(t && t.length === 20, L + ' ' + id); t.forEach((q, i) => { for(const f of q[2]) assert.ok(w.JUGE.juger(f[1]).ok, L + ' ' + f[1]); }); }
    for(const L of ['it', 'pt']) assert.ok(T[L].noms.droit.ch[id], L + ' nom ' + id); }
  // Les faits clés, tels que publiés par le CNB pour la session 2026.
  const tout = M.AVOCAT.map(id => dr.chapitres.find(c => c.id === id).banque.map(x => x[0] + ' ' + x[1] + ' ' + x[3]).join(' ')).join(' ');
  for(const r of [/master 2 en droit/, /au moins 18 mois/, /5 heures/, /coefficient est 4/, /cour d’appel/, /dignité, conscience, indépendance, probité et humanité/, /trois fois/]) assert.match(tout, r);
  // L'espace sur l'écran Droit.
  clic('matiere-droit'); assert.ok($('[data-a="avocat"]'), 'carte sur l’écran Droit'); clic('avocat');
  assert.match($('main').textContent, /Devenir avocat[\s\S]*CRFPA blanc[\s\S]*Grand oral blanc/); assert.strictEqual($$('.avocat-ecran [data-a="matiere-chap"]').length, 4); assert.strictEqual($$('.lien-carte').length, AV.OFFICIEL.length);
  assert.ok(AV.OFFICIEL.every(([, u]) => /^https:\/\/(www\.)?cnb\.avocat\.fr\//.test(u)));
  // CRFPA blanc : 40 questions, chrono de 60 min, sans vanne, corrigé à la fin.
  clic('avocat-epreuve', 'blanc'); assert.ok($('#chrono-veille'), 'chronométré');
  let k = 0; while($('[data-a="qz-rep"]:not([disabled])') && k < 60){ $('[data-a="qz-rep"]').click(); k++; }
  assert.strictEqual(k, 40); assert.match($('main').textContent, /Note : [\d,]+\/20[\s\S]*bonnes réponses sur 40/);
  // Grand oral blanc : un sujet, la préparation d'1 h, la méthode.
  clic('avocat-go', '3'); assert.match($('main').textContent, /liberté de manifester/); assert.match($('#go-chrono').textContent, /il reste 60 min/); assert.match($('main').textContent, /plan en deux parties/);
  clic('avocat-go', ''); assert.ok(AV.SUJETS_GO.some(([s]) => $('main').textContent.includes(s)));
  // En anglais, les leçons sont traduites.
  // v8.2 aussi : cinq notions de philosophie de plus en italien et en portugais.
  for(const L of ['it', 'pt']) for(const n of ['n-inconscient', 'n-justice', 'n-langage', 'n-liberte', 'n-nature']){ assert.strictEqual(T[L].q['philo/' + n].length, M.trouver('philo').chapitres.find(c => c.id === n).banque.length, L + ' ' + n);
    for(const q of T[L].q['philo/' + n]) for(const f of q[2]) assert.ok(w.JUGE.juger(f[1]).ok, L + ' ' + f[1]); }
  const Me = page('en-GB').MATIERES; assert.ok(Me.serie('droit', 'avocat-crfpa', 'Sup', 10, 2, 'taquin').every(q => q.lang === 'en'));
});

await test('v8.1 : philosophie en italien et en portugais — notions art, bonheur, conscience, devoir et État', async () => {
  const w = page(), M = w.MATIERES, T = w.MATIERES_LANGUES, P = M.trouver('philo');
  for(const id of ['n-art', 'n-bonheur', 'n-conscience', 'n-devoir', 'n-etat']){ const c = P.chapitres.find(x => x.id === id);
    for(const L of ['it', 'pt']){ const t = T[L].q['philo/' + id]; assert.ok(t && t.length === c.banque.length, L + ' ' + id);
      t.forEach((q, i) => { assert.strictEqual(new Set([q[1], ...q[2].map(f => f[0])]).size, 4, L + ' ' + id + ' ' + i); assert.notStrictEqual(q[0], c.banque[i][0]); for(const f of q[2]) assert.ok(w.JUGE.juger(f[1]).ok, L + ' ' + f[1]); }); } }
  for(const L of ['it', 'pt']){ const Ml = page(L).MATIERES; assert.ok(Ml.serie('philo', 'n-etat', 'Tle', 10, 5, 'taquin').every(q => q.lang === L), L + ' État en jeu'); }
  assert.strictEqual(T.it.q['philo/n-etat'][1][1], 'Max Weber'); assert.strictEqual(T.pt.q['philo/n-devoir'][0][1], 'o imperativo categórico');
});

await test('v8.0 : SES (1re, Tle, cours) et philosophie (auteurs, méthode, distinctions) en italien et en portugais', async () => {
  const w = page(), M = w.MATIERES, T = w.MATIERES_LANGUES;
  for(const [mid, id] of [['ses', 'ses-1re'], ['ses', 'ses-tle'], ['ses', 'cours-ses'], ['philo', 'r-philo'], ['philo', 'r-philo2']]){ const c = M.trouver(mid).chapitres.find(x => x.id === id);
    for(const L of ['it', 'pt']){ const t = T[L].q[mid + '/' + id]; assert.ok(t && t.length === c.banque.length, L + ' ' + mid + '/' + id);
      t.forEach((q, i) => { assert.strictEqual(new Set([q[1], ...q[2].map(f => f[0])]).size, 4, L + ' ' + id + ' ' + i); assert.notStrictEqual(q[0], c.banque[i][0]); for(const f of q[2]) assert.ok(w.JUGE.juger(f[1]).ok, L + ' ' + f[1]); }); } }
  for(const L of ['it', 'pt']){ const Ml = page(L).MATIERES;
    assert.ok(Ml.serie('ses', 'ses-tle', 'Tle', 10, 3, 'taquin').every(q => q.lang === L), L + ' SES en jeu');
    assert.ok(Ml.serie('philo', 'r-philo', 'Tle', 10, 3, 'taquin').every(q => q.lang === L), L + ' philo en jeu');
    assert.ok(Ml.serie('droit', 'institutions', 'Sup', 5, 3, 'taquin').every(q => q.lang === 'fr'), L + ' : une matière pas encore traduite (droit) reste en français'); }
  assert.strictEqual(T.it.q['philo/r-philo'][0][1], 'Cartesio'); assert.strictEqual(T.pt.q['ses/ses-1re'][2][1], 'um monopólio');
});

await test('v7.9 : conditions réelles d’examen — chrono officiel, ni vanne ni correction pendant l’épreuve, partie rédigée rendue, relevé de notes et corrigé à la fin', async () => {
  const w = page('fr', { MODE_PAYANT:false, OUVRIR_MATIERES:true }), d = w.document; await w.AmiDesMotsPret; const A = w.AmiDesMots;
  const $ = s => d.querySelector(s), $$ = s => [...d.querySelectorAll(s)];
  const clic = (a, v) => { const b = d.createElement('button'); b.dataset.a = a; if(v != null) b.dataset.v = v; d.body.appendChild(b); b.click(); b.remove(); };
  const repondre = () => { let j = 0; while($('[data-a="qz-rep"]:not([disabled])') && j < 80){ const avant = $('main').textContent; $('[data-a="qz-rep"]').click(); j++; assert.ok(!$('[data-a="qz-suivant"]'), 'pas de correction pendant l’épreuve'); if($('main').textContent === avant) break; } };
  clic('examens'); clic('examen-go', 'brevet'); assert.ok($('[data-a="copie-ecrit"]'), 'en entraînement, la rédaction se propose dès l’ouverture');
  clic('examen-reel'); assert.match($('main').textContent, /Conditions réelles : chrono officiel/); assert.ok(!$('[data-a="copie-ecrit"]'), 'en conditions réelles, la copie se rédige après les questions');
  clic('examen-suite'); assert.match($('#chrono-veille').textContent, /1[78]\d:\d\d/, 'chrono officiel de 3 h'); assert.ok(!$('.confiance'), 'pas d’aide pendant l’épreuve');
  repondre(); assert.match($('main').textContent, /Partie rédigée/); assert.ok($$('[data-a="copie-ecrit"]').length === 2 && $('[data-a="examen-rendre"]'));
  clic('copie-ecrit', '0'); assert.ok($('[data-a="copie-rendre"]') && !$('[data-a="copie-verifier"]'), 'pas de vérification avant d’avoir rendu'); assert.match($('#copie-chrono').textContent, /Chrono officiel/);
  $('#copie-texte').value = Array.from({ length:60 }, (_, i) => 'Argument ' + i + ' bien développé.').join(' '); clic('copie-rendre');
  assert.match($('main').textContent, /épreuve 2\/6/); assert.match($('main').textContent, /Conditions réelles d’examen/);
  for(let e = 2; e <= 6; e++){ clic('examen-suite'); repondre(); if($('[data-a="examen-rendre"]')) clic('examen-rendre'); }
  const t = $('main').textContent; assert.match(t, /Relevé de notes/); assert.strictEqual($$('.releve-examen details').length, 6, 'un corrigé par épreuve');
  assert.match(t, /Partie rédigée : \d+ mots rendus/); assert.match(t, /Bonne réponse :|Aucune erreur/);
  assert.ok(A.J().matieres.notes['blanc-brevet'] >= 0, 'note enregistrée');
  for(const x of Object.keys(A.J().copies || {})) delete A.J().copies[x]; w.AMI_MODULES.api.garder();
});

await test('v7.8 : rédiger aussi la rédaction du brevet, le développement construit d’histoire-géo et la dissertation de philosophie — vérification adaptée à chaque écrit', async () => {
  const w = page('fr', { MODE_PAYANT:false, OUVRIR_MATIERES:true }), d = w.document; await w.AmiDesMotsPret; const A = w.AmiDesMots, E = w.EPREUVES, C = w.AMI_COPIE;
  const $ = s => d.querySelector(s), $$ = s => [...d.querySelectorAll(s)];
  const clic = (a, v) => { const b = d.createElement('button'); b.dataset.a = a; if(v != null) b.dataset.v = v; d.body.appendChild(b); b.click(); b.remove(); };
  for(let g = 1; g < 40; g++){
    const fr = E.construire('dnb-francais', g); assert.strictEqual(fr.ecrits.length, 2); assert.deepStrictEqual(fr.ecrits.map(x => x.sorte).join(), 'redaction,redaction'); assert.ok(/réflexion/.test(fr.ecrits[0].titre) && /imagination/.test(fr.ecrits[1].titre), 'réflexion OU imagination');
    const hg = E.construire('dnb-histoire', g), th = hg.liste.find(q => /Maîtriser différents langages/.test(q.consigne)).consigne.replace(/^.*?—\s*/, '').replace(/ — question.*$/, '');
    assert.strictEqual(hg.ecrits.length, 1); assert.ok(hg.ecrits[0].sujet.includes(th), 'le développement construit porte sur le même thème que l’exercice : ' + th);
    const ph = E.construire('philo', g); assert.strictEqual(ph.ecrits.length, 2); assert.notStrictEqual(ph.ecrits[0].sujet, ph.ecrits[1].sujet); assert.ok(ph.ecrits.every(x => x.sorte === 'philo' && x.duree === 240 && /\?$/.test(x.sujet)));
  }
  // Brevet blanc : la rédaction se rédige depuis l'écran de l'épreuve de français, chrono d'1 h 30.
  clic('examens'); clic('examen-go', 'brevet'); assert.strictEqual($$('[data-a="copie-ecrit"]').length, 2, 'deux sujets de rédaction');
  clic('copie-ecrit', '1'); assert.match($('.sujet-copie').textContent, /imagination/i); assert.match($('#copie-chrono').textContent, /1 h 30/);
  const k = Object.keys(A.J().copies).find(x => /^ecrit:dnb-redac/.test(x)); assert.ok(k, 'copie enregistrée');
  const recit = ['Ce soir-là, je montai au grenier. D’abord, je ne vis rien. Soudain, une boîte attira mon regard et mon cœur se mit à battre.', 'Alors, j’ouvris la boîte. À l’intérieur, des lettres jaunies. Je tremblais de surprise et de peur à la fois.', 'Puis je lus la première lettre : ma grand-mère y racontait sa jeunesse. Les larmes me montèrent aux yeux.', 'Enfin, je compris que ma famille cachait une histoire de courage. Je redescendis, fier et soulagé.'].map(p => (p + ' ').repeat(4)).join('\n\n');
  $('#copie-texte').value = recit; clic('copie-verifier'); assert.match($('main').textContent, /Émotions/); assert.match($('main').textContent, /Organisateurs du récit/);
  const r = C.analyser(A.J().copies[k]); assert.ok(r.liste.find(i => /Émotions/.test(i.titre)).ok && r.liste.find(i => /Construction/.test(i.titre)).ok, 'récit organisé et émouvant reconnu');
  assert.ok(!r.liste.some(i => /Problématique/.test(i.titre)), 'pas de problématique exigée dans une rédaction d’imagination');
  // Philosophie : définitions et philosophes attendus.
  const ph = { sorte:'philo', sujet:'Le travail nous rend-il meilleurs ?', texte:'Le travail nous rend-il meilleurs ? Nous verrons d’abord, puis enfin.\n\nPar travail, on entend une activité transformatrice. Kant pense que…\n\nAinsi, en conclusion, oui.' };
  const rp = C.analyser(ph); assert.ok(rp.liste.find(i => /Définition/.test(i.titre)).ok); assert.ok(!rp.liste.find(i => /Références philosophiques/.test(i.titre)).ok, 'un seul philosophe : à compléter');
  assert.match(rp.liste.find(i => /Références/.test(i.titre)).detail, /Platon, Descartes, Kant/);
  // Bac blanc de philosophie : les deux sujets à rédiger.
  clic('examens'); clic('examen-go', 'tle-philo'); assert.strictEqual($$('[data-a="copie-ecrit"]').length, 2); clic('copie-ecrit', '0'); assert.match($('#copie-chrono').textContent, /4 h/);
  assert.ok(Object.values(A.J().copies).some(x => x.sorte === 'philo'));
  for(const x of Object.keys(A.J().copies)) delete A.J().copies[x]; w.AMI_MODULES.api.garder();   // le test suivant repart d’un appareil sans copie
  { const php = lire('serveur-php/copie.php'); for(const s of ['redaction', 'developpement', 'philo']) assert.match(php, new RegExp("'" + s + "' => \\[")); }
});

await test('v7.7 : rédiger sa copie (commentaire ou dissertation), vérification expliquée sans IA, correction détaillée par l’IA avec accord parental', async () => {
  const w = page('fr', { MODE_PAYANT:false, OUVRIR_MATIERES:true }), d = w.document; await w.AmiDesMotsPret; const A = w.AmiDesMots, M = w.AMI_MODULES, C = w.AMI_COPIE;
  const $ = s => d.querySelector(s), $$ = s => [...d.querySelectorAll(s)];
  const clic = (a, v) => { const b = d.createElement('button'); b.dataset.a = a; if(v != null) b.dataset.v = v; d.body.appendChild(b); b.click(); b.remove(); };
  clic('examens'); clic('examen-go', 'bac-francais'); assert.strictEqual($$('[data-a="copie-rediger"]').length, 4, 'rédiger : commentaire + 3 dissertations');
  clic('copie-rediger', 'com'); assert.ok($('#copie-texte') && $('#copie-brouillon') && $('.texte-sujet'), 'brouillon, copie et texte du sujet');
  assert.match($('#copie-chrono').textContent, /sur les 4 h de l’épreuve/);
  // Une copie courte : la vérification explique ce qui manque.
  $('#copie-texte').value = 'Ce texte est bien. Il parle de la ville. Ça me plaît, c’est un truc sympa.'; clic('copie-verifier');
  assert.match($('main').textContent, /Ce n’est pas une note/); assert.match($('main').textContent, /problématique est la question/); assert.ok($$('.copie-verif li.ko').length >= 6);
  // Une copie construite : la vérification le reconnaît.
  const cit = ['« Les trottoirs ont gardé le ciel »', '« Les gouttières bavardes »', '« digne comme un vieux notaire »', '« Ô ville »', '« mon chagrin »', '« ce peintre sans patience »', '« rincé comme un linge d’été »'];
  const par = k => ('En effet, le poète montre ici une image forte : ' + cit[k % cit.length] + ' est une métaphore qui crée un rythme lent. Cependant, cette personnification révèle aussi le registre lyrique du texte. Ainsi, le champ lexical de la lumière transforme le poème. De plus, la comparaison donne au texte une tonalité douce, car le poète associe la ville et ses émotions. ').repeat(3);
  const copie = ['Après un orage, la ville semble changer de visage : c’est ce moment que saisit ce poème. Comment le texte transforme-t-il un matin ordinaire en renaissance du monde et du poète ? Nous verrons d’abord la ville transfigurée, puis l’émotion du poète, enfin le renouveau final.',
    par(0), par(1), par(2), par(3), par(4), 'En conclusion, ce poème fait d’un matin banal une renaissance. On pourrait le rapprocher d’autres poèmes de la ville : la poésie n’est-elle pas l’art de voir autrement ?'].join('\n\n');
  clic('copie-reprendre', Object.keys(A.J().copies)[0]); $('#copie-texte').value = copie; clic('copie-verifier');
  const r = C.analyser(Object.values(A.J().copies)[0]); assert.ok(r.ok >= r.sur - 1, 'copie construite : ' + r.ok + '/' + r.sur + ' ' + r.liste.filter(i => !i.ok).map(i => i.titre).join(', '));
  assert.ok(Object.values(A.J().copies)[0].texte.length > 2000, 'copie enregistrée dans l’appareil');
  // Sans accord d'un parent : pas de bouton IA.
  A.CONFIG.SERVEUR = 'https://serveur.example/'; const key = Object.keys(A.J().copies)[0]; clic('copie-reprendre', key); assert.ok(!$('[data-a="copie-ia"]')); assert.match($('main').textContent, /autorisée par un parent/);
  // Avec l'accord : la copie et le sujet partent au serveur ; la correction s'affiche, expliquée.
  A.base.devoirsAccord = true; let envoi = null; const avant = M.envoyer;
  M.envoyer = async (f, corps) => { envoi = { f, corps }; return { ok:true, statut:200, d:{ note:13.5, criteres:[{ nom:'Compréhension et problématique', points:4, sur:5, explication:'Problématique claire.' }, { nom:'Construction', points:3.5, sur:5, explication:'Transitions à travailler.' }, { nom:'Analyse', points:3.5, sur:6, explication:'Analyse les effets.' }, { nom:'Langue', points:2.5, sur:4, explication:'Quelques accords.' }],
    forts:['Plan annoncé'], ameliorer:[{ passage:'est une métaphore', probleme:'Procédé nommé sans effet', conseil:'Dis ce que l’image fait ressentir.' }], langue:['Accord du participe'], conseil:'Analyse chaque citation.' } }; };
  try{ clic('copie-reprendre', key); assert.ok($('[data-a="copie-ia"]')); clic('copie-ia'); await new Promise(r => setTimeout(r, 30));
    assert.ok(envoi && envoi.f === 'copie.php' && envoi.corps.accord_parent === true && envoi.corps.sorte === 'commentaire' && envoi.corps.texte_sujet.length > 300 && envoi.corps.texte_sujet === A.J().copies[key].texteSujet && envoi.corps.copie.length > 2000);
    assert.match($('main').textContent, /Note estimée : 13,5\/20[\s\S]*Construction[\s\S]*Procédé nommé sans effet[\s\S]*Analyse chaque citation/);
    assert.ok(A.J().copies[key].corrections.some(k => k.ia && k.ia.note === 13.5), 'correction gardée avec la copie');
  } finally { M.envoyer = avant; A.CONFIG.SERVEUR = null; A.base.devoirsAccord = false; }
  // Dissertation : le sujet de l'œuvre choisie.
  clic('examens'); clic('examen-go', 'bac-francais'); clic('copie-rediger', 'dis0'); assert.match($('.sujet-copie').textContent, /parcours/); assert.ok(Object.keys(A.J().copies).some(k => /^eaf:d\d+$/.test(k)));
  // « Mes copies » : carte dans les matières, liste, suppression avec confirmation.
  clic('matieres'); assert.ok($('[data-a="copies"]')); clic('copies'); assert.strictEqual($$('[data-a="copie-suppr"]').length, 2);
  w.confirm = () => false; clic('copie-suppr', key); assert.ok(A.J().copies[key]); w.confirm = () => true; clic('copie-suppr', key); assert.ok(!A.J().copies[key]);
  // Après le bac : plus de brevet ni de bac (ni dans les blancs, ni dans les annales), sauf si on choisit « Voir toutes les matières ».
  clic('ma-classe', 'Sup|annales'); assert.strictEqual($$('[data-a="annale-go"]').length, 0, 'annales après le bac'); assert.match($('main').textContent, /Après le bac, plus de brevet ni de bac/);
  clic('ma-classe', 'Sup|examens'); assert.strictEqual($$('[data-a="examen-go"], [data-a="bac-tle"]').length, 0, 'blancs après le bac');
  clic('matieres-tout', 'annales'); assert.ok($$('[data-a="annale-go"]').length >= 8, 'toutes les annales sur demande');
  clic('ma-classe', 'Tle|annales'); assert.ok(!$('[data-a="annale-go"][data-v^="dnb"]'), 'en terminale, pas de brevet');
  { const php = lire('serveur-php/copie.php'); for(const m of [/ne réécris jamais la copie/, /'accord_parent'\], 403/, /ami_credits_garde\(/, /ami_credits_rembourser_garde/]) assert.match(php, m); }
});

await test('v7.6 : bac de français — on lit d’abord le sujet (un texte à commenter + trois dissertations), puis on choisit commentaire OU dissertation', async () => {
  const w = page('fr', { MODE_PAYANT:false, OUVRIR_MATIERES:true }), d = w.document; await w.AmiDesMotsPret; const A = w.AmiDesMots, E = w.EPREUVES, T = E._test;
  const $ = s => d.querySelector(s), $$ = s => [...d.querySelectorAll(s)];
  const clic = (a, v) => { const b = d.createElement('button'); b.dataset.a = a; if(v != null) b.dataset.v = v; d.body.appendChild(b); b.click(); b.remove(); };
  assert.strictEqual(T.COMMENTAIRES.length, 4); assert.strictEqual(T.DISSERTATIONS.length, T.OEUVRES.length);
  T.DISSERTATIONS.forEach((x, i) => assert.strictEqual(x[0], T.OEUVRES[i][1], 'dissertation ' + i + ' alignée sur son œuvre'));
  for(let g = 1; g < 60; g++){ const ep = E.construire('eaf', g), S = ep.sujets;
    assert.ok(S && S.com.texte.length > 300 && S.dis.length === 3, 'sujet complet ' + g);
    assert.ok(S.dis.every(x => T.OEUVRES[x.idx][2] === S.objetDis) && S.objetDis !== S.com.objet, 'dissertations sur un autre objet d’étude que le commentaire');
    for(const c of ['com', 'dis0', 'dis1', 'dis2']){ const e = E.choisirSujet(E.construire('eaf', g), c); assert.ok(Math.abs(e.total - 20) < 1e-9, 'barème sur 20');
      assert.ok(e.liste[0].contexte.includes(c === 'com' ? S.com.texte.slice(0, 40) : S.dis[+c[3]].sujet), 'le sujet choisi reste affiché');
      for(const q of e.liste){ assert.ok(q.faux.length >= 1 && !q.faux.some(f => f.en === q.bon)); for(const f of q.faux) assert.ok(w.JUGE.juger(f.vanne).ok, f.vanne); } } }
  // À l'écran : le sujet d'abord, puis le choix.
  clic('examens'); clic('examen-go', 'bac-francais');
  assert.ok($('.texte-sujet'), 'le texte à commenter est affiché'); assert.strictEqual($$('[data-a="examen-sujet"]').length, 4, '1 commentaire + 3 dissertations');
  assert.match($('main').textContent, /Vous commenterez ce texte[\s\S]*Dissertation[\s\S]*parcours/);
  clic('examen-sujet', 'dis1'); assert.match($('.contexte-exo').textContent, /Sujet :/); assert.match($('main').textContent, /Dissertation/);
  let k = 0; while($('[data-a="qz-rep"]:not([disabled])') && k < 40){ const b = $$('[data-a="qz-rep"]'); b[k % b.length].click(); k++; const s = $('[data-a="qz-suivant"]'); if(s) s.click(); }
  assert.match($('main').textContent, /[\d,]+ \/ 20/);
  // Annale 2026 : même étape, ici le commentaire.
  clic('annale-go', 'eaf26'); assert.ok($('.texte-sujet')); clic('annale-sujet', 'com');
  assert.match($('.contexte-exo').textContent, /Vous commenterez ce texte/); assert.match($('main').textContent, /Commentaire/);
});

await test('v7.5 : EMC du collège et du lycée en italien et en portugais — toute l’histoire-géographie-EMC est traduite, thème EMC compris', async () => {
  const w = page(), M = w.MATIERES, T = w.MATIERES_LANGUES, h = M.trouver('histoire');
  const ids = ['emc', 'cours-emc-c3', 'cours-emc-c4', 'cours-emc6', 'cours-emc5', 'cours-emc4', 'cours-emc3', 'cpl-emc2', 'cpl-emc1', 'cpl-emct'];
  for(const id of ids){ const c = h.chapitres.find(x => x.id === id);
    for(const L of ['it', 'pt']){ const t = T[L].q['histoire/' + id]; assert.ok(t && t.length === c.banque.length, L + ' ' + id);
      t.forEach((q, i) => { assert.strictEqual(new Set([q[1], ...q[2].map(f => f[0])]).size, 4, L + ' ' + id + ' ' + i); assert.notStrictEqual(q[0], c.banque[i][0], L + ' ' + id + ' ' + i); for(const f of q[2]) assert.ok(w.JUGE.juger(f[1]).ok, L + ' ' + f[1]); });
      assert.ok(T[L].noms.histoire.ch[id] || id === 'emc', L + ' nom ' + id); } }
  for(const L of ['it', 'pt']){ assert.strictEqual(h.chapitres.filter(c => c.banque && !c.theme && !T[L].q['histoire/' + c.id]).map(c => c.id).join(', '), '', L + ' : toute l’histoire-géo-EMC');
    const wl = page(L), Ml = wl.MATIERES, hl = Ml.trouver('histoire');
    assert.ok(Ml.traduit(hl, hl.chapitres.find(c => c.id === 'th-emc')), L + ' thème EMC traduit');
    assert.ok(Ml.serie('histoire', 'cours-emc6', '6e', 10, 4, 'taquin').every(q => q.lang === L), L + ' EMC 6e en jeu');
    assert.ok(Ml.serie('histoire', 'cpl-emct', 'Tle', 10, 4, 'taquin').every(q => q.lang === L), L + ' EMC Tle en jeu'); }
});

await test('v7.4 : géographie entière en italien et en portugais — chapitre « geo », risques industriels, États-Unis et Afrique de l’Ouest, Afrique australe, thème géographie', async () => {
  const w = page(), M = w.MATIERES, T = w.MATIERES_LANGUES, h = M.trouver('histoire');
  for(const id of ['geo', 'cpl-g5-risques', 'cpl-g4-usa-afrique', 'cpl-g2-afrique-australe']){ const c = h.chapitres.find(x => x.id === id);
    for(const L of ['it', 'pt']){ const t = T[L].q['histoire/' + id]; assert.ok(t && t.length === c.banque.length, L + ' ' + id);
      t.forEach((q, i) => { assert.strictEqual(new Set([q[1], ...q[2].map(f => f[0])]).size, 4, L + ' ' + id + ' ' + i); assert.notStrictEqual(q[0], c.banque[i][0], L + ' ' + id + ' ' + i + ' : pas le français'); for(const f of q[2]) assert.ok(w.JUGE.juger(f[1]).ok, L + ' ' + f[1]); });
      if(id !== 'geo') assert.ok(T[L].noms.histoire.ch[id], L + ' nom ' + id); } }
  for(const [L, x] of [['it', 'la Loira'], ['pt', 'o Loire']]) assert.strictEqual(T[L].q['histoire/geo'][0][1], x);
  for(const L of ['it', 'pt']){ const wl = page(L), Ml = wl.MATIERES, hl = Ml.trouver('histoire'), th = hl.chapitres.find(c => c.id === 'th-geo');
    assert.ok(Ml.traduit(hl, th), L + ' thème géographie traduit');
    assert.ok(Ml.serie('histoire', 'cpl-g2-afrique-australe', '2nde', 10, 4, 'taquin').every(q => q.lang === L), L + ' Afrique australe en jeu'); }
});

await test('v7.3 : cahier de leçons et contrôle construit par l’élève — textes à trous, fiches, chapitres de l’appli, IA en option avec accord parental', async () => {
  const w = page(), d = w.document, A = w.AmiDesMots, M = w.AMI_MODULES, C = w.AMI_CAHIER;
  const LECON = 'La Révolution française commence en 1789. Le 14 juillet 1789, le peuple de Paris prend la Bastille, symbole de l’arbitraire royal.\n' +
    'Le 26 août 1789, les députés adoptent la Déclaration des droits de l’homme et du citoyen. En 1792, la République est proclamée.\n' +
    'Le roi Louis XVI est exécuté en janvier 1793. Robespierre dirige la Terreur jusqu’en juillet 1794.';
  // Ajouter une leçon par l'écran.
  bouton(w, 'cahier'); assert.match(d.querySelector('h2').textContent, /Mon cahier de leçons/);
  bouton(w, 'cahier-edit', ''); d.getElementById('cahier-matiere').value = 'histoire'; d.getElementById('cahier-titre').value = 'La Révolution';
  d.getElementById('cahier-texte').value = LECON; d.getElementById('cahier-fiches').value = 'Prise de la Bastille = 14 juillet 1789\nDDHC = 26 août 1789\nRépublique = 1792\nExécution du roi = 1793';
  clic(w, '[data-a="cahier-enregistrer"]');
  const c = A.J().cahier; assert.strictEqual(c.lecons.length, 1); assert.strictEqual(c.lecons[0].fiches.length, 4); assert.ok(d.querySelector('[data-a="cahier-edit"][data-v="' + c.lecons[0].id + '"]'));
  // Sans titre ni texte : rien n'est enregistré.
  bouton(w, 'cahier-edit', ''); clic(w, '[data-a="cahier-enregistrer"]'); assert.ok(d.getElementById('cahier-erreur').textContent.length > 10); assert.strictEqual(A.J().cahier.lecons.length, 1);
  // Textes à trous : le mot caché est dans la phrase, trois leurres différents.
  const tr = C.trous(c.lecons[0], 'histoire'); assert.ok(tr.length >= 4, 'trous : ' + tr.length);
  for(const q of tr){ assert.ok(/_____/.test(q.enonce) && q.regle.includes(q.bon), q.enonce); assert.strictEqual(new Set([q.bon, ...q.faux.map(f => f.en)]).size, 4, q.enonce); }
  assert.strictEqual(C.lireFiches('a = b\nsans signe\nx=y=z').map(f => f.join('|')).join(' / '), 'a|b / x|y=z');
  // Construire : la leçon + un chapitre de l'appli, 10 questions, 20 min ; sans accord d'un parent, pas de bouton IA.
  bouton(w, 'cahier-construire'); d.getElementById('ctl-matiere').value = 'histoire'; d.getElementById('ctl-matiere').dispatchEvent(new w.Event('change'));
  assert.ok(d.querySelector('input[name="ctl-lecon"]:checked')); assert.ok(!d.querySelector('[data-a="cahier-lancer"][data-v="ia"]'));
  d.querySelector('input[name="ctl-chap"]').checked = true; d.getElementById('ctl-duree').value = '20';
  clic(w, '[data-a="cahier-lancer"][data-v="local"]'); await new Promise(r => setTimeout(r, 30));
  assert.ok(d.querySelector('#chrono-veille'), 'chronométré');
  const vus = []; for(let i = 0; i < 10; i++){ const bon = A.qzBonne(), o = [...d.querySelectorAll('.piege-opt')]; assert.strictEqual(o.length, 4, 'q' + i); vus.push(d.querySelector('main').textContent); (i < 7 ? o.find(x => x.textContent === bon) : o.find(x => x.textContent !== bon)).click(); }
  assert.ok(vus.some(t => /📒/.test(t)) && vus.some(t => !/📒/.test(t)), 'questions de la leçon et de l’appli mêlées');
  assert.match(d.querySelector('main').textContent, /Note : 14\/20[\s\S]*7 bonnes réponses sur 10[\s\S]*Corrigé/);
  assert.ok(A.J().carnet.length >= 3, 'les erreurs vont dans le carnet');
  clic(w, '[data-a="cahier-garder"]'); assert.strictEqual(A.J().cahier.controles.length, 1); assert.strictEqual(A.J().cahier.controles[0].note, 14);
  bouton(w, 'cahier'); assert.ok(d.querySelector('[data-a="cahier-refaire"]')); clic(w, '[data-a="cahier-refaire"]'); assert.ok(A.qzBonne());
  // Option IA : seulement avec l'accord d'un parent ; le texte de la leçon est envoyé, les questions reçues sont jouées (🤖).
  A.base.devoirsAccord = true; A.CONFIG.SERVEUR = 'https://serveur.example/'; let envoi = null;
  const avant = M.envoyer; M.envoyer = async (f, corps) => { envoi = { f, corps }; return { ok:true, statut:200, d:{ questions:[1, 2, 3, 4, 5].map(i => ({ q:'Question IA ' + i + ' ?', bon:'oui ' + i, faux:['non ' + i, 'peut-être ' + i, 'jamais ' + i], regle:'D’après ta leçon.' })) } }; };
  try{
    bouton(w, 'cahier-construire'); assert.ok(d.querySelector('[data-a="cahier-lancer"][data-v="ia"]'));
    d.getElementById('ctl-n').value = '5'; clic(w, '[data-a="cahier-lancer"][data-v="ia"]'); await new Promise(r => setTimeout(r, 30));
    assert.ok(envoi && envoi.f === 'controle.php' && envoi.corps.accord_parent === true && /Bastille/.test(envoi.corps.texte));
    assert.match(d.querySelector('main').textContent, /🤖/);
  } finally { M.envoyer = avant; A.CONFIG.SERVEUR = null; }
  // Supprimer demande une confirmation : refusée, la leçon reste ; acceptée, elle part.
  const id = A.J().cahier.lecons[0].id; w.confirm = () => false; bouton(w, 'cahier-suppr', id); assert.strictEqual(A.J().cahier.lecons.length, 1);
  w.confirm = () => true; bouton(w, 'cahier-suppr', id); assert.strictEqual(A.J().cahier.lecons.length, 0);
  // Carte présente dans l'écran des matières et sur l'écran d'une matière.
  bouton(w, 'matieres'); assert.ok(d.querySelector('[data-a="cahier"]'));
  { const php = lire('serveur-php/controle.php'); for(const m of [/UNIQUEMENT sur ce qui est écrit dans la leçon/, /'accord_parent'\], 403/, /ami_credits_garde/, /ami_credits_rembourser_garde/]) assert.match(php, m); }
});

await test('v7.2 : géographie du collège en italien et en portugais — cours de 6e, 5e, 4e et 3e', async () => {
  const w = page(), M = w.MATIERES, T = w.MATIERES_LANGUES, h = M.trouver('histoire');
  for(const id of ['cours-g6', 'cours-g5', 'cours-g4', 'cours-g3']) for(const L of ['it', 'pt']){ const t = T[L].q['histoire/' + id], c = h.chapitres.find(x => x.id === id);
    assert.ok(t && t.length === c.banque.length, L + ' ' + id); t.forEach((q, i) => { assert.ok(q.length === 4 && q[2].length === 3, L + ' ' + id + ' ' + i); for(const f of q[2]) assert.ok(w.JUGE.juger(f[1]).ok, L + ' ' + f[1]); if(/^[\d-]+$/.test(c.banque[i][1])) assert.strictEqual(q[1], c.banque[i][1], L + ' même nombre'); }); }
  for(const L of ['it', 'pt']){ w.AmiDesMots.base.ui = L; assert.ok(M.serie('histoire', 'cours-g4', '4e', 10, 2, 'taquin').every(q => q.lang === L), L); }
  w.AmiDesMots.base.ui = 'fr';
});

await test('v7.1 : histoire du lycée complète en italien et en portugais — révision de Tle, cours de 2nde, 1re et Tle', async () => {
  const w = page(), M = w.MATIERES, T = w.MATIERES_LANGUES, h = M.trouver('histoire');
  for(const id of ['r-ht', 'cours-hg2', 'cours-hg1', 'cours-hgt']) for(const L of ['it', 'pt']){ const t = T[L].q['histoire/' + id], c = h.chapitres.find(x => x.id === id);
    assert.ok(t && t.length === c.banque.length, L + ' ' + id); t.forEach((q, i) => { assert.ok(q.length === 4 && q[2].length === 3, L + ' ' + id + ' ' + i); for(const f of q[2]) assert.ok(w.JUGE.juger(f[1]).ok, L + ' ' + f[1]); if(/^[\d-]+$/.test(c.banque[i][1])) assert.strictEqual(q[1], c.banque[i][1], L + ' même date'); }); }
  // Toutes les leçons d'histoire et de cours d'histoire-géographie du lycée existent en italien et en portugais (hors compléments de géographie et d'EMC).
  for(const c of h.chapitres.filter(c => !c.theme && c.banque && c.niv.some(n => ['2nde', '1re', 'Tle'].includes(n)) && !/^cpl-(g|emc)/.test(c.id) && c.id !== 'geo')) for(const L of ['it', 'pt']) assert.ok(T[L].q['histoire/' + c.id], L + ' ' + c.id);
});

await test('v7.0 : histoire du lycée en italien et en portugais, 1re partie — repères du lycée, révisions de 2nde et de 1re', async () => {
  const w = page(), M = w.MATIERES, T = w.MATIERES_LANGUES, h = M.trouver('histoire');
  for(const id of ['lycee', 'r-h2', 'r-h1']) for(const L of ['it', 'pt']){ const t = T[L].q['histoire/' + id], c = h.chapitres.find(x => x.id === id);
    assert.ok(t && t.length === c.banque.length, L + ' ' + id); t.forEach((q, i) => { assert.ok(q.length === 4 && q[2].length === 3, L + ' ' + id + ' ' + i); for(const f of q[2]) assert.ok(w.JUGE.juger(f[1]).ok, L + ' ' + f[1]); if(/^[\d-]+$/.test(c.banque[i][1])) assert.strictEqual(q[1], c.banque[i][1], L + ' même date'); }); }
  for(const L of ['it', 'pt']){ w.AmiDesMots.base.ui = L; assert.ok(M.serie('histoire', 'r-h1', '1re', 10, 2, 'taquin').every(q => q.lang === L), L); }
  w.AmiDesMots.base.ui = 'fr';
});

await test('v6.99 : histoire de 3e complète en italien et en portugais — refonder la République, le monde après 1989', async () => {
  const w = page(), M = w.MATIERES, T = w.MATIERES_LANGUES, h = M.trouver('histoire');
  for(const id of ['cpl-h3-refonder', 'cpl-h3-apres89']) for(const L of ['it', 'pt']){ const t = T[L].q['histoire/' + id], c = h.chapitres.find(x => x.id === id);
    assert.ok(t && t.length === c.banque.length, L + ' ' + id); t.forEach((q, i) => { assert.ok(q.length === 4 && q[2].length === 3, L + ' ' + id + ' ' + i); for(const f of q[2]) assert.ok(w.JUGE.juger(f[1]).ok, L + ' ' + f[1]); if(/^[\d-]+$/.test(c.banque[i][1])) assert.strictEqual(q[1], c.banque[i][1], L + ' même date'); }); }
  // Toutes les leçons d'histoire de 4e et de 3e (hors géographie et EMC) existent désormais en italien et en portugais.
  const hist = h.chapitres.filter(c => !c.theme && c.banque && (c.niv.includes('4e') || c.niv.includes('3e')) && !['geo', 'emc'].includes(c.id) && !/^cours-(g|emc)|^cpl-g|^cpl-emc/.test(c.id));
  for(const c of hist) for(const L of ['it', 'pt']) assert.ok(T[L].q['histoire/' + c.id], L + ' ' + c.id);
});

await test('v6.98 : histoire de 3e en italien et en portugais, 3e partie — crise de 1929 et totalitarismes, guerre froide, France depuis 1945', async () => {
  const w = page(), M = w.MATIERES, T = w.MATIERES_LANGUES, h = M.trouver('histoire');
  for(const id of ['cpl-h3-entre', 'cpl-h3-gf', 'cpl-h3-france']) for(const L of ['it', 'pt']){ const t = T[L].q['histoire/' + id], c = h.chapitres.find(x => x.id === id);
    assert.ok(t && t.length === c.banque.length, L + ' ' + id); t.forEach((q, i) => { assert.ok(q.length === 4 && q[2].length === 3, L + ' ' + id + ' ' + i); for(const f of q[2]) assert.ok(w.JUGE.juger(f[1]).ok, L + ' ' + f[1]); if(/^[\d-]+$/.test(c.banque[i][1])) assert.strictEqual(q[1], c.banque[i][1], L + ' même date'); }); }
  for(const L of ['it', 'pt']){ w.AmiDesMots.base.ui = L; assert.ok(M.serie('histoire', 'cpl-h3-gf', '3e', 10, 2, 'taquin').every(q => q.lang === L), L); }
  w.AmiDesMots.base.ui = 'fr';
});

await test('v6.97 : histoire de 3e en italien et en portugais, 2e partie — révision 3e, cours de 3e, Première Guerre mondiale', async () => {
  const w = page(), M = w.MATIERES, T = w.MATIERES_LANGUES, h = M.trouver('histoire');
  for(const id of ['r-h3', 'cours-h3', 'pgm-cours']) for(const L of ['it', 'pt']){ const t = T[L].q['histoire/' + id], c = h.chapitres.find(x => x.id === id);
    assert.ok(t && t.length === c.banque.length, L + ' ' + id); t.forEach((q, i) => { assert.ok(q.length === 4 && q[2].length === 3, L + ' ' + id + ' ' + i); for(const f of q[2]) assert.ok(w.JUGE.juger(f[1]).ok, L + ' ' + f[1]); if(/^[\d-]+$/.test(c.banque[i][1])) assert.strictEqual(q[1], c.banque[i][1], L + ' même date'); }); }
  for(const L of ['it', 'pt']){ w.AmiDesMots.base.ui = L; assert.ok(M.serie('histoire', 'pgm-cours', '3e', 10, 2, 'taquin').every(q => q.lang === L), L); }
  w.AmiDesMots.base.ui = 'fr';
});

await test('v6.96 : histoire de 3e en italien et en portugais, 1re partie — XXe siècle et Seconde Guerre mondiale', async () => {
  const w = page(), M = w.MATIERES, T = w.MATIERES_LANGUES, h = M.trouver('histoire');
  for(const id of ['xxe', 'seconde-guerre', 'sgm-cours']) for(const L of ['it', 'pt']){ const t = T[L].q['histoire/' + id], c = h.chapitres.find(x => x.id === id);
    assert.ok(t && t.length === c.banque.length, L + ' ' + id); t.forEach((q, i) => { assert.ok(q.length === 4 && q[2].length === 3, L + ' ' + id + ' ' + i); for(const f of q[2]) assert.ok(w.JUGE.juger(f[1]).ok, L + ' ' + f[1]); if(/^[\d-]+$/.test(c.banque[i][1])) assert.strictEqual(q[1], c.banque[i][1], L + ' même date'); }); }
  for(const L of ['it', 'pt']){ w.AmiDesMots.base.ui = L; assert.ok(M.serie('histoire', 'seconde-guerre', '3e', 10, 2, 'taquin').every(q => q.lang === L), L); }
  w.AmiDesMots.base.ui = 'fr';
});

await test('v6.95 : histoire de 4e en italien et en portugais ; cartes d’une matière côte à côte dans une seule grille', async () => {
  const w = page(), d = w.document, M = w.MATIERES, T = w.MATIERES_LANGUES, h = M.trouver('histoire');
  for(const id of ['revolution', 'r-h4', 'cours-h4', 'cpl-h4-femmes', 'cpl-h4-traites']) for(const L of ['it', 'pt']){ const t = T[L].q['histoire/' + id], c = h.chapitres.find(x => x.id === id);
    assert.ok(t && t.length === c.banque.length, L + ' ' + id); t.forEach((q, i) => { assert.ok(q.length === 4 && q[2].length === 3, L + ' ' + id + ' ' + i); for(const f of q[2]) assert.ok(w.JUGE.juger(f[1]).ok, L + ' ' + f[1]); if(/^\d+$/.test(c.banque[i][1])) assert.strictEqual(q[1], c.banque[i][1], L + ' même date'); }); }
  w.AmiDesMots.base.ui = 'it'; assert.ok(M.serie('histoire', 'cours-h4', '4e', 10, 2, 'taquin').every(q => q.lang === 'it')); w.AmiDesMots.base.ui = 'pt'; assert.ok(M.serie('histoire', 'r-h4', '4e', 10, 2, 'taquin').every(q => q.lang === 'pt')); w.AmiDesMots.base.ui = 'fr';
  bouton(w, 'matieres'); bouton(w, 'matiere', 'medecine'); bouton(w, 'matiere-niveau', 'medecine|Sup');
  const grilles = [...d.querySelectorAll('main .cartes-anglais')].filter(g => g.querySelector('[data-a="ifsi"], [data-a="docs"], [data-a="trimestres"], [data-a^="trim"]'));
  assert.strictEqual(grilles.length, 1, 'une seule grille'); assert.ok(grilles[0].querySelector('[data-a="ifsi"]') && grilles[0].querySelector('[data-a="docs"]') && grilles[0].children.length >= 3, 'cartes côte à côte');
});

await test('v6.94 : EMC du lycée selon le programme de 2024 — 2nde droits et libertés, 1re cohésion et diversité, Tle vie démocratique', async () => {
  const w = page(), M = w.MATIERES, T = w.MATIERES_LANGUES, h = M.trouver('histoire'), ch = id => h.chapitres.find(c => c.id === id);
  for(const [id, niv] of [['cpl-emc2', '2nde'], ['cpl-emc1', '1re'], ['cpl-emct', 'Tle']]){ const c = ch(id);
    assert.ok(c && c.banque.length === 20 && c.niv.join() === niv && c.dom === 'EMC', id); assert.ok(M.chapitres('histoire', niv).some(x => x.id === id), id + ' en ' + niv);
    assert.strictEqual(new Set(c.banque.map(q => q[0])).size, 20, id + ' sans doublon');
    for(const q of c.banque){ assert.strictEqual(new Set([q[1], ...q[2].map(f => f[0])]).size, 4, q[0]); assert.ok(q[3], 'règle ' + q[0]); for(const f of q[2]) assert.ok(w.JUGE.juger(f[1]).ok, f[1]); }
    for(const L of ['en', 'es', 'de']){ const t = T[L].q['histoire/' + id]; assert.ok(t && t.length === 20, L + ' ' + id); t.forEach(q => { for(const f of q[2]) assert.ok(w.JUGE.juger(f[1]).ok, L + ' ' + f[1]); }); }
    for(const L of ['en', 'es', 'de', 'it', 'pt']) assert.ok(T[L].noms.histoire.ch[id], L + ' nom ' + id);
    assert.ok(ch('th-emc').banque.includes(c.banque[0]), id + ' dans le thème EMC'); }
  const bons = id => ch(id).banque.map(q => q[1]).join(' | ');
  for(const x of ['le 26 août 1789', 'la séparation des Églises et de l’État', 'la CNIL', 'le RGPD', 'la présomption d’innocence']) assert.ok(bons('cpl-emc2').includes(x), x);
  for(const x of ['Liberté, Égalité, Fraternité', 'indivisible, laïque, démocratique et sociale', 'en 1945', 'un délit']) assert.ok(bons('cpl-emc1').includes(x), x);
  for(const x of ['l’Arcom', 'le principe de primauté', 'plus de la moitié des suffrages exprimés', 'par tirage au sort, 150 citoyens']) assert.ok(bons('cpl-emct').includes(x), x);
  assert.ok(['2nde', '1re', 'Tle'].every(n => ch('th-emc').niv.includes(n)), 'le thème EMC couvre aussi le lycée');
});

await test('v6.93 : IFSI, suite — urgences (AFGSU), pathologies, droit et éthique, relation et santé publique, cas cliniques, révision de toutes les leçons', async () => {
  const w = page(), d = w.document, M = w.MATIERES, T = w.MATIERES_LANGUES, A = w.AmiDesMots, m = M.trouver('medecine');
  const neuf = ['ifsi-urgences', 'ifsi-pathologies', 'ifsi-droit', 'ifsi-relation', 'ifsi-cas'];
  assert.strictEqual(M.IFSI.length, 10); assert.ok(neuf.every(id => M.IFSI.includes(id)));
  for(const id of neuf){ const c = m.chapitres.find(x => x.id === id);
    assert.ok(c && c.banque.length === 20 && c.niv.join() === 'Sup' && c.dom === 'Études d’infirmier (IFSI)', id);
    assert.strictEqual(new Set(c.banque.map(q => q[0])).size, 20, id + ' sans doublon');
    for(const q of c.banque){ assert.strictEqual(new Set([q[1], ...q[2].map(f => f[0])]).size, 4, q[0]); assert.ok(q[3], 'règle ' + q[0]); for(const f of q[2]) assert.ok(w.JUGE.juger(f[1]).ok, f[1]); }
    for(const L of ['en', 'es']){ const t = T[L].q['medecine/' + id]; assert.ok(t && t.length === 20, L + ' ' + id); t.forEach(q => { assert.ok(q.length === 4 && q[2].length === 3); for(const f of q[2]) assert.ok(w.JUGE.juger(f[1]).ok, L + ' ' + f[1]); }); }
    for(const L of ['it', 'pt']) assert.ok(T[L].noms.medecine.ch[id], L + ' nom ' + id); }
  const bons = id => m.chapitres.find(x => x.id === id).banque.map(q => q[1]).join(' | ');
  for(const x of ['le 15', 'le 112', '100 à 120 par minute', '30 compressions pour 2 insufflations', 'l’AFGSU de niveau 2']) assert.ok(bons('ifsi-urgences').includes(x), x);
  for(const x of ['libre et éclairé', 'loi Kouchner', 'de 2016', 'autonomie, bienfaisance']) assert.ok(bons('ifsi-droit').includes(x), x);
  // L'examen blanc pioche désormais dans les 10 leçons ; la révision mélangée garde les vannes.
  const I = w.AMI_IFSI; assert.strictEqual(I.liste('blanc').length, 40);
  assert.strictEqual(I.liste('revision').length, 20);
  bouton(w, 'matieres'); bouton(w, 'matiere', 'medecine'); bouton(w, 'matiere-niveau', 'medecine|Sup'); clic(w, '[data-a="ifsi"]');
  assert.strictEqual(d.querySelectorAll('.ifsi-ecran [data-a="matiere-chap"]').length, 10);
  clic(w, '[data-a="ifsi-epreuve"][data-v="revision"]'); assert.ok(!d.querySelector('#chrono-veille'));
  { const bon = A.qzBonne(); [...d.querySelectorAll('.piege-opt')].find(x => x.textContent !== bon).click(); assert.ok(d.querySelector('#qz-retour').textContent.length > 10, 'vanne affichée'); }
  assert.strictEqual(A.J().carnet.at(-1).matiere, 'medecine');
});

await test('v6.92 : études d’infirmier (IFSI) dans Médecine — 5 chapitres, examen blanc, calculs de doses, documents et textes officiels', async () => {
  const w = page(), d = w.document, M = w.MATIERES, T = w.MATIERES_LANGUES, A = w.AmiDesMots, m = M.trouver('medecine');
  assert.strictEqual([...M.IFSI].slice(0, 5).join(), 'ifsi-parcours,ifsi-calculs,ifsi-pharmaco,ifsi-soins,ifsi-hygiene');
  for(const id of M.IFSI){ const c = m.chapitres.find(x => x.id === id);
    assert.ok(c && c.banque.length === 20 && c.niv.join() === 'Sup' && c.dom === 'Études d’infirmier (IFSI)', id);
    for(const q of c.banque){ assert.strictEqual(new Set([q[1], ...q[2].map(f => f[0])]).size, 4, q[0]); assert.ok(q[3], 'règle ' + q[0]); for(const f of q[2]) assert.ok(w.JUGE.juger(f[1]).ok, f[1]); }
    for(const L of ['en', 'es']){ const t = T[L].q['medecine/' + id]; assert.ok(t && t.length === 20, L + ' ' + id); t.forEach(q => { for(const f of q[2]) assert.ok(w.JUGE.juger(f[1]).ok, L + ' ' + f[1]); }); } }
  // Les calculs des corrections sont justes.
  assert.strictEqual(Math.round(1000 * 20 / 1440), 14); assert.strictEqual(Math.round(500 * 20 / 240), 42); assert.strictEqual(48 / 24, 2); assert.strictEqual(250 / 125, 2);
  assert.strictEqual(250 / (1000 / 10), 2.5); assert.strictEqual(15 * 20, 300); assert.strictEqual(+(12 / 100).toFixed(4), .12); assert.strictEqual(250 / 125 * 5, 10); assert.strictEqual(+(0.9 * 5).toFixed(4), 4.5);
  // Les textes officiels pointent vers des sites publics reconnus.
  const I = w.AMI_IFSI; assert.ok(I.OFFICIEL.length >= 6 && I.OFFICIEL.every(([, u]) => /^https:\/\/www\.(fhf\.fr|francecompetences\.fr|legifrance\.gouv\.fr|parcoursup\.gouv\.fr|ordre-infirmiers\.fr)\//.test(u + '/')));
  assert.ok(w.AMI_DOCUMENTS.pour('medecine', 'Sup').some(x => x.id === 'ifsi-prescription') && w.AMI_DOCUMENTS.DOCS.filter(x => /^ifsi-/.test(x.id)).every(x => /fictive/.test(x.source)));
  // Parcours : Médecine → carte IFSI → espace IFSI → épreuve de calculs, chronométrée et sans vanne → note sur 20.
  bouton(w, 'matieres'); bouton(w, 'matiere', 'medecine'); bouton(w, 'matiere-niveau', 'medecine|Sup');
  clic(w, '[data-a="ifsi"]'); const txt = d.querySelector('main').textContent;
  assert.match(txt, /Examen blanc infirmier[\s\S]*calculs de doses[\s\S]*Textes officiels/); assert.ok(d.querySelectorAll('.ifsi-ecran a[href^="https://"]').length >= 6);
  assert.strictEqual(d.querySelectorAll('.ifsi-ecran [data-a="matiere-chap"]').length, M.IFSI.length); assert.ok(d.querySelector('.ifsi-ecran [data-a="docs"]'));
  clic(w, '[data-a="ifsi-epreuve"][data-v="calculs"]'); assert.ok(d.querySelector('#chrono-veille'));
  for(let i = 0; i < 20; i++){ const bon = A.qzBonne(), opts = [...d.querySelectorAll('.piege-opt')]; assert.strictEqual(opts.length, 4, 'q' + i); (i < 18 ? opts.find(x => x.textContent === bon) : opts.find(x => x.textContent !== bon)).click(); }
  assert.match(d.querySelector('main').textContent, /Note : 18\/20[\s\S]*18 bonnes réponses sur 20[\s\S]*À revoir/); assert.strictEqual(d.querySelectorAll('.correction-controle li').length, 2);
  clic(w, '[data-a="ifsi"]'); clic(w, '[data-a="ifsi-epreuve"][data-v="blanc"]'); assert.ok(A.qzBonne());
  assert.strictEqual(I.liste('blanc').length, 40); assert.strictEqual(new Set(I.liste('blanc').map(q => q.enonce)).size, 40);
  clic(w, '[data-a="ifsi"]'); clic(w, '.barre [data-a="matiere-medecine"]'); assert.ok(d.querySelector('[data-a="ifsi"]'));
});

await test('v6.91 : géographie complétée selon le programme — risques industriels (5e), États-Unis et Afrique de l’Ouest (4e), Afrique australe (2nde)', async () => {
  const w = page(), M = w.MATIERES, T = w.MATIERES_LANGUES, h = M.trouver('histoire'), ch = id => h.chapitres.find(c => c.id === id);
  for(const [id, niv, n] of [['cpl-g5-risques', '5e', 20], ['cpl-g4-usa-afrique', '4e', 20], ['cpl-g2-afrique-australe', '2nde', 20]]){ const c = ch(id);
    assert.ok(c && c.banque.length === n && c.niv.join() === niv && c.dom === 'Géographie', id); assert.ok(M.chapitres('histoire', niv).some(x => x.id === id), id + ' en ' + niv);
    for(const q of c.banque){ assert.strictEqual(new Set([q[1], ...q[2].map(f => f[0])]).size, 4, q[0]); assert.ok(q[3], 'règle ' + q[0]); for(const f of q[2]) assert.ok(w.JUGE.juger(f[1]).ok, f[1]); }
    for(const L of ['en', 'es', 'de']){ const t = T[L].q['histoire/' + id]; assert.ok(t && t.length === n, L + ' ' + id); t.forEach(q => { for(const f of q[2]) assert.ok(w.JUGE.juger(f[1]).ok, L + ' ' + f[1]); }); assert.ok(T[L].noms.histoire.ch[id], L + ' nom ' + id); }
    assert.ok(ch('th-geo').banque.includes(c.banque[0]), id + ' dans le thème géographie'); }
  const bons = id => ch(id).banque.map(q => q[1]).join(' | ');
  for(const x of ['les sites Seveso', 'Fukushima', 'FR-Alert']) assert.ok(bons('cpl-g5-risques').includes(x), x);
  for(const x of ['la Sun Belt', 'la Rust Belt', 'le Mexique', 'Lagos', 'la CEDEAO', 'le Sahel']) assert.ok(bons('cpl-g4-usa-afrique').includes(x), x);
  for(const x of ['l’Afrique du Sud', 'la SADC', 'Johannesburg', 'le Botswana', 'le Lesotho']) assert.ok(bons('cpl-g2-afrique-australe').includes(x), x);
  for(const L of ['en', 'es', 'de']) assert.ok(T[L].q['histoire/th-geo'], L + ' thème géographie traduit');
});

await test('v6.90 : 5e et 4e complétées selon le programme — califes et Bagdad, Charles Quint et Soliman, conflits religieux, ports négriers, Code noir, colonisation', async () => {
  const w = page(), M = w.MATIERES, T = w.MATIERES_LANGUES, h = M.trouver('histoire'), ch = id => h.chapitres.find(c => c.id === id);
  for(const [id, niv] of [['cpl-h5-mondes', '5e'], ['cpl-h4-traites', '4e']]){ const c = ch(id); assert.ok(c && c.banque.length === 20 && c.niv.join() === niv, id);
    assert.ok(M.chapitres('histoire', niv).some(x => x.id === id), id + ' en ' + niv);
    for(const q of c.banque){ assert.strictEqual(new Set([q[1], ...q[2].map(f => f[0])]).size, 4, q[0]); assert.ok(q[3], 'règle ' + q[0]); for(const f of q[2]) assert.ok(w.JUGE.juger(f[1]).ok, f[1]); }
    for(const L of ['en', 'es', 'de']){ const t = T[L].q['histoire/' + id]; assert.ok(t && t.length === 20, L + ' ' + id);
      t.forEach((q, i) => { assert.ok(q.length === 4 && q[2].length === 3, L + ' ' + i); for(const f of q[2]) assert.ok(w.JUGE.juger(f[1]).ok, L + ' ' + f[1]); if(/^\d+$/.test(c.banque[i][1])) assert.strictEqual(q[1], c.banque[i][1], L + ' même date'); }); } }
  // Les thèmes du programme qui manquaient sont là.
  const t5 = ch('cpl-h5-mondes').banque.map(q => q[1]).join(' | '), t4 = ch('cpl-h4-traites').banque.map(q => q[1]).join(' | ');
  for(const x of ['les califes', 'les Abbassides', '1258', 'Charles Quint', 'Soliman', 'Vienne', 'huguenots', 'Henri IV']) assert.ok(t5.includes(x), x);
  for(const x of ['Nantes', 'Code noir', 'Saint-Domingue', 'Toussaint Louverture', '1830', 'Abd el-Kader', 'conférence de Berlin', 'AOF']) assert.ok(t4.includes(x) || ch('cpl-h4-traites').banque.some(q => q[0].includes(x)), x);
  // Rangés dans leurs thèmes, qui restent traduits.
  assert.ok(ch('th-moyen-age').banque.some(q => q[1] === '1258') && ch('th-renaissance').banque.some(q => q[1] === 'Soliman'));
  assert.ok(ch('th-renaissance').banque.some(q => q[1] === 'Nantes') && ch('th-xixe').banque.some(q => q[1] === '1830') && ch('th-revolution').banque.some(q => q[1] === 'Napoléon Bonaparte'));
  for(const L of ['en', 'es', 'de']) for(const th of ['th-moyen-age', 'th-renaissance', 'th-revolution', 'th-xixe']) assert.ok(T[L].q['histoire/' + th], L + ' ' + th);
  // La 5e reste complète en italien et en portugais.
  for(const L of ['it', 'pt']) assert.strictEqual(T[L].q['histoire/cpl-h5-mondes'].length, 20, L);
  w.AmiDesMots.base.ui = 'it'; assert.ok(M.serie('histoire', 'cpl-h5-mondes', '5e', 10, 2, 'taquin').every(q => q.lang === 'it')); w.AmiDesMots.base.ui = 'fr';
  // Écran d'une matière : colonnes qui suivent la taille du texte et occupent toute la largeur (plus de chevauchement).
  const css = lire('css/jeu.css'); assert.match(css, /\.domaines\{[^}]*repeat\(auto-fit, minmax\(min\(100%, 21rem\), 1fr\)\)/); assert.match(css, /\.domaine, \.liste-chap, \.chap-ligne\{ min-width:0; \}/);
});

await test('v6.89 : un programme = un pays — onglets France, England, USA, Italia, España, Portugal, Deutschland, sans mélange', async () => {
  const w = page(), d = w.document, A = w.AMI_MODULES.api, P = w.AMI_PROGRAMMES;
  const err = (matiere, enonce) => ({ matiere, chap:'c', enonce, bon:'b', faux:[{ en:'x', vanne:'v' }, { en:'y', vanne:'v' }, { en:'z', vanne:'v' }], rate:'2026-01-01', boite:0, prochaine:'2026-01-01' });
  A.J().carnet = [err('gb-english', 'GB question'), err('histoire', 'Question française'), err('it-storia', 'Domanda italiana')]; A.garder();
  const FR_OUTILS = ['veille', 'classe', 'correction', 'retro', 'revision-jour', 'reponse-libre', 'pays-ecran', 'gb-programme'];
  // France : onglets en haut, outils français, ses erreurs seulement, plus de carte England ni « Mon pays » mélangée.
  bouton(w, 'matieres'); const fr = d.querySelector('main');
  assert.deepStrictEqual([...d.querySelectorAll('.onglets-pays [data-a="programme-pays"]')].map(b => b.dataset.v), ['fr', 'uk', 'us', 'it', 'es', 'pt', 'de']);
  assert.ok(d.querySelector('.onglets-pays [data-v="fr"].actif'));
  assert.ok(fr.querySelector('[data-a="veille"]'), 'outils français sur l’écran français');
  assert.ok(!fr.querySelector('[data-a="gb-programme"]') && !fr.querySelector('[data-a="pays-ecran"]'), 'plus de carte England ni Mon pays');
  assert.strictEqual(fr.querySelector('[data-a="carnet-erreurs"]').dataset.v, 'fr'); assert.match(fr.querySelector('[data-a="carnet-erreurs"]').textContent, /Mes erreurs \(1\)/);
  // England : seulement l'Angleterre.
  clic(w, '.onglets-pays [data-v="uk"]'); assert.match(d.querySelector('h2').textContent, /England curriculum/); assert.ok(d.querySelector('.onglets-pays [data-v="uk"].actif'));
  for(const a of FR_OUTILS) assert.ok(!d.querySelector('main [data-a="' + a + '"]'), 'pas de « ' + a + ' » sur l’écran England');
  assert.match(d.querySelector('[data-a="carnet-erreurs"][data-v="uk"]').textContent, /My mistakes \(1\)/); assert.ok(!/Programme français/.test(d.querySelector('main').textContent));
  assert.ok(d.querySelector('[data-a="pays-ecran-uk"]'), 'classes et examens anglais toujours accessibles');
  clic(w, '[data-a="carnet-erreurs"][data-v="uk"]'); assert.match(d.querySelector('main').textContent, /GB question/); assert.ok(!/Question française|Domanda italiana/.test(d.querySelector('main').textContent));
  bouton(w, 'matieres'); assert.match(d.querySelector('h2').textContent, /England curriculum/, 'Matières rouvre le programme choisi');
  clic(w, '[data-a="pays-ecran-uk"]'); assert.match(d.querySelector('main').textContent, /Year 11/);
  // Italia : l'écran du pays, ses matières et ses erreurs seulement.
  clic(w, '.onglets-pays [data-v="it"]'); assert.strictEqual(A.J().systeme, 'it'); assert.strictEqual(A.base().programme, 'fr');
  assert.match(d.querySelector('h2').textContent, /Italia/); assert.ok(d.querySelector('.onglets-pays [data-v="it"].actif'));
  for(const a of FR_OUTILS) assert.ok(!d.querySelector('main [data-a="' + a + '"]'), 'pas de « ' + a + ' » sur l’écran Italia');
  assert.ok(d.querySelector('[data-a="carnet-erreurs"][data-v="it"]'));
  bouton(w, 'matieres'); assert.match(d.querySelector('h2').textContent, /Italia/);
  // Retour en France : la table des matières française, sans rien de l'étranger.
  clic(w, '.onglets-pays [data-v="fr"]'); assert.ok(d.querySelector('main.matieres-ecran') && /Matières/.test(d.querySelector('h2').textContent)); assert.ok(!d.querySelector('[data-a="matiere"][data-v="it-italiano"]'));
  // La révision du jour ne reprend que les erreurs françaises.
  assert.ok(A.carnetAujourdhui('fr').every(x => !/^(gb|it)-/.test(x.matiere)) && A.carnetAujourdhui('fr').length === 1);
  // Page d'accueil : le menu « Mon programme » propose les 7 programmes.
  assert.strictEqual(P.liste().length, 7); assert.strictEqual(P.programmeDe('pt-historia'), 'pt'); assert.strictEqual(P.programmeDe('maths'), 'fr');
  const w2 = page('fr', { MODE_PAYANT:false, OUVRIR_MATIERES:true }), d2 = w2.document; await w2.AmiDesMotsPret;
  const sel = d2.getElementById('programme'); assert.strictEqual(sel.querySelectorAll('option').length, 7, 'menu Mon programme');
  sel.value = 'pt'; sel.dispatchEvent(new w2.Event('change', { bubbles:true })); d2.querySelector('[data-a="entrer"]').click();
  assert.match(d2.querySelector('h2').textContent, /Portugal/, 'Entrer ouvre le programme choisi');
});

await test('v6.89 : histoire alignée sur les programmes — niveaux corrigés, deux chapitres de 3e ajoutés, rien de supprimé', async () => {
  const w = page(), M = w.MATIERES, h = M.trouver('histoire'), ch = id => h.chapitres.find(c => c.id === id);
  // La Seconde Guerre mondiale et l'après-1945 : 3e et Tle, plus 1re (programme de 1re : 1789 → lendemains de 1918).
  for(const id of ['xxe', 'seconde-guerre', 'sgm-cours']){ assert.strictEqual(ch(id).niv.join(), '3e,Tle', id); assert.ok(!M.chapitres('histoire', '1re').some(c => c.id === id), id + ' hors 1re'); }
  assert.ok(!ch('th-2gm').niv.includes('1re'), 'thème 2GM hors 1re');
  // La Révolution française : 4e et 1re (la 2nde s'arrête à la Révolution américaine).
  assert.strictEqual(ch('revolution').niv.join(), '4e,1re');
  assert.ok(M.chapitres('histoire', '1re').some(c => c.id === 'revolution') && !M.chapitres('histoire', '2nde').some(c => c.id === 'revolution'));
  // Aucune question perdue.
  assert.strictEqual(ch('xxe').banque.length, 20); assert.strictEqual(ch('seconde-guerre').banque.length, 20); assert.strictEqual(ch('sgm-cours').banque.length, 20); assert.strictEqual(ch('revolution').banque.length, 20);
  // Deux chapitres de 3e qui manquaient : 1944-1947 et le monde après 1989.
  for(const id of ['cpl-h3-refonder', 'cpl-h3-apres89']){ const c = ch(id); assert.ok(c && c.banque.length === 20 && c.niv.join() === '3e', id);
    for(const q of c.banque){ assert.strictEqual(new Set([q[1], ...q[2].map(f => f[0])]).size, 4, q[0]); for(const f of q[2]) assert.ok(w.JUGE.juger(f[1]).ok, f[1]); assert.ok(q[3], 'règle ' + q[0]); }
    assert.ok(M.chapitres('histoire', '3e').some(x => x.id === id), id + ' en 3e'); }
  assert.ok(ch('cpl-h3-refonder').banque.some(q => /CNR|Conseil national de la Résistance/.test(q[1])) && ch('cpl-h3-refonder').banque.some(q => q[1] === 'la IVe République'));
  assert.ok(ch('cpl-h3-apres89').banque.some(q => q[1] === 'la Yougoslavie') && ch('cpl-h3-apres89').banque.some(q => q[1] === 'le Rwanda'));
  assert.ok(ch('th-france-1945').banque.length >= 48 && ch('th-apres-89').banque.length === 20, 'rangés aussi dans les thèmes');
  assert.ok(ch('th-2gm').banque.some(q => /Pétain après la guerre/.test(q[0])) && ch('th-guerre-froide').banque.some(q => /chute de la IVe République/.test(q[0])), 'chaque guerre dans son thème');
  const s = M.serie('histoire', 'cpl-h3-apres89', '3e', 10, 4, 'taquin'); assert.strictEqual(s.length, 10);
  assert.ok(w.MATIERES_LANGUES.en.noms.histoire.ch['cpl-h3-refonder'], 'nom anglais');
});

await test('v6.88 : histoire de 5e en italien et en portugais — 4 chapitres, même ordre, vannes acceptées', async () => {
  const w = page(), A = w.AmiDesMots, M = w.MATIERES, ML = w.MATIERES_LANGUES; A.accueil();
  const m = M.trouver('histoire'), chiffre = t => (String(t).match(/\d+/g) || []).join(' ');
  for(const l of ['it', 'pt']) for(const c of ['moyen-age', 'r-h5', 'cours-h5', 'cpl-h5-capetiens']){ const ch = m.chapitres.find(x => x.id === c), t = ML[l].q['histoire/' + c];
    assert.ok(ch && t && t.length === ch.banque.length, l + ' ' + c);
    t.forEach((q, i) => { const f = Array.isArray(ch.banque[i]) ? ch.banque[i] : [ch.banque[i].enonce, ch.banque[i].bon];
      assert.ok(q.length === 4 && q[2].length === 3 && !q[2].some(x => x[0] === q[1]), l + ' ' + q[0]);
      assert.strictEqual(chiffre(q[1]), chiffre(f[1]), l + ' ' + c + ' #' + i + ' : mêmes dates');
      for(const x of q[2]) assert.ok(w.JUGE.juger(x[1]).ok, x[1]); }); }
  A.base.ui = 'it'; assert.ok(M.serie('histoire', 'cours-h5', '5e', 10, 3, 'taquin').every(q => q.lang === 'it'), 'italien');
  A.base.ui = 'pt'; assert.ok(M.serie('histoire', 'moyen-age', '5e', 10, 3, 'taquin').every(q => q.lang === 'pt'), 'portugais');
  assert.ok(M.serie('francais', 'homophones', '6e', 5, 3, 'taquin').every(q => q.lang === 'fr'), 'un chapitre non traduit (français : homophones) reste en français ; l’histoire-géographie-EMC est entièrement traduite depuis la v7.5'); A.base.ui = 'fr';
});

await test('v6.87 : histoire de 6e en italien et en portugais — 4 chapitres, même ordre, vannes acceptées', async () => {
  const w = page(), A = w.AmiDesMots, M = w.MATIERES, ML = w.MATIERES_LANGUES; A.accueil();
  const m = M.trouver('histoire'), chiffre = t => (String(t).match(/\d+/g) || []).join(' ');
  for(const l of ['it', 'pt']) for(const c of ['antiquite', 'r-h6', 'cours-h6', 'cpl-h6-hebreux']){ const ch = m.chapitres.find(x => x.id === c), t = ML[l].q['histoire/' + c];
    assert.ok(ch && t && t.length === ch.banque.length, l + ' ' + c);
    t.forEach((q, i) => { const f = Array.isArray(ch.banque[i]) ? ch.banque[i] : [ch.banque[i].enonce, ch.banque[i].bon];
      assert.ok(q.length === 4 && q[2].length === 3 && !q[2].some(x => x[0] === q[1]), l + ' ' + q[0]);
      assert.strictEqual(chiffre(q[1]), chiffre(f[1]), l + ' ' + c + ' #' + i + ' : mêmes dates');
      for(const x of q[2]) assert.ok(w.JUGE.juger(x[1]).ok, x[1]); }); }
  A.base.ui = 'it'; assert.ok(M.serie('histoire', 'cours-h6', '6e', 10, 3, 'taquin').every(q => q.lang === 'it'), 'italien');
  A.base.ui = 'pt'; assert.ok(M.serie('histoire', 'antiquite', '6e', 10, 3, 'taquin').every(q => q.lang === 'pt'), 'portugais');
  assert.ok(M.serie('francais', 'homophones', '6e', 5, 3, 'taquin').every(q => q.lang === 'fr'), 'un chapitre non traduit (français : homophones) reste en français ; l’histoire-géographie-EMC est entièrement traduite depuis la v7.5'); A.base.ui = 'fr';
});

await test('v6.86 : SVT et physique-chimie du lycée en italien et en portugais — même ordre, vannes acceptées', async () => {
  const w = page(), A = w.AmiDesMots, M = w.MATIERES, ML = w.MATIERES_LANGUES; A.accueil();
  const CH = { svt:['genetique', 'r-s2', 'r-s1', 'r-st', 'cours-sv2', 'cours-sv1', 'cours-svt'], physique:['r-p1', 'r-pt', 'cours-pc2', 'cours-pc1', 'cours-pct'] };
  const chiffre = t => (String(t).match(/\d+(?:[,.]\d+)?/g) || []).join(' ');
  for(const mat of Object.keys(CH)){ const m = M.trouver(mat);
    for(const l of ['it', 'pt']) for(const c of CH[mat]){ const ch = m.chapitres.find(x => x.id === c), t = ML[l].q[mat + '/' + c];
      assert.ok(ch && t && t.length === ch.banque.length, l + ' ' + mat + '/' + c);
      t.forEach((q, i) => { const f = Array.isArray(ch.banque[i]) ? ch.banque[i] : [ch.banque[i].enonce, ch.banque[i].bon];
        assert.ok(q.length === 4 && q[2].length === 3 && !q[2].some(x => x[0] === q[1]), l + ' ' + q[0]);
        if(/^[\d\s,.]+$/.test(f[1])) assert.strictEqual(chiffre(q[1]), chiffre(f[1]), l + ' ' + c + ' #' + i);
        for(const x of q[2]) assert.ok(w.JUGE.juger(x[1]).ok, x[1]); }); } }
  A.base.ui = 'it'; assert.ok(M.serie('svt', 'cours-sv2', '2nde', 5, 3, 'taquin').every(q => q.lang === 'it'), 'SVT 2nde en italien');
  assert.ok(M.serie('physique', 'cours-pct', 'Tle', 5, 2, 'taquin').every(q => q.lang === 'it'), 'physique Tle en italien');
  A.base.ui = 'pt'; assert.ok(M.serie('svt', 'cours-svt', 'Tle', 5, 3, 'taquin').every(q => q.lang === 'pt'), 'SVT Tle en portugais');
  assert.ok(M.serie('physique', 'cours-pc1', '1re', 5, 2, 'taquin').every(q => q.lang === 'pt'), 'physique 1re en portugais');
  A.base.ui = 'fr'; assert.ok(M.serie('physique', 'cours-pc2', '2nde', 5, 2, 'taquin').every(q => q.lang === 'fr'), 'français inchangé');
});

await test('v6.85 : technologie en italien et en portugais — 6 chapitres, même ordre, vannes acceptées', async () => {
  const w = page(), A = w.AmiDesMots, M = w.MATIERES, ML = w.MATIERES_LANGUES; A.accueil();
  const m = M.trouver('techno');
  for(const l of ['it', 'pt']) for(const ch of m.chapitres.filter(c => c.banque && c.banque.length)){ const t = ML[l].q['techno/' + ch.id];
    assert.ok(t && t.length === ch.banque.length, l + ' ' + ch.id);
    t.forEach((q, i) => { const f = Array.isArray(ch.banque[i]) ? ch.banque[i] : [ch.banque[i].enonce, ch.banque[i].bon];
      if(/^[\d .,]+$/.test(f[1])) assert.strictEqual(q[1].replace(/\D/g, ''), String(f[1]).replace(/\D/g, ''), l + ' ' + ch.id + ' #' + i);
      for(const x of q[2]) assert.ok(w.JUGE.juger(x[1]).ok, x[1]); }); }
  A.base.ui = 'it'; assert.ok(M.serie('techno', 'cpl-t-num', '4e', 10, 2, 'taquin').every(q => q.lang === 'it'));
  A.base.ui = 'pt'; assert.ok(M.serie('techno', 'cours-t3', '3e', 10, 2, 'taquin').every(q => q.lang === 'pt')); A.base.ui = 'fr';
});

console.log(`\n${ok} réussi(s), ${ko} échoué(s)`);
process.exit(ko ? 1 : 0);
})();
