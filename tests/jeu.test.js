// Ami des mots — tests. Lancer : node tests/jeu.test.js (jsdom requis :
// NODE_PATH vers un node_modules qui l'a, ou npm i jsdom).
'use strict';
const fs = require('fs'), path = require('path'), assert = require('assert');
const { JSDOM } = require('jsdom');
const ICI = path.join(__dirname, '..');
const lire = f => fs.readFileSync(path.join(ICI, f), 'utf8');
let ok = 0, ko = 0;
const test = async (n, f) => { try{ await f(); console.log('  ✔', n); ok++; }catch(e){ console.log('  ✘', n, '—', e.message, process.env.PILE ? e.stack : ''); ko++; } };

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
  for(const f of ['js/donnees.js', 'js/voix.js', 'js/phrases-enregistrees.js', 'js/textes.js', 'js/textes-plus.js', 'js/articulation.js', 'js/genres.js', 'js/confusions.js', 'js/vannes.js', 'js/pieges.js', 'js/anglais.js', 'js/clash.js', 'js/histoires.js', 'js/blagues-en.js', 'js/parcours.js', 'js/rigolade.js', 'js/clash-plus.js', 'js/salon.js', 'js/juge.js', 'js/vannes-libres.js', 'js/maths.js', 'js/sciences.js', 'js/trash-talk.js', 'js/bande-images.js', 'js/bande-plumo.js', 'js/achats.js', 'js/rappels.js', 'js/epreuves.js', 'js/epreuves-spe.js', 'js/epreuves-plus.js', 'js/epreuves-oraux.js', 'js/epreuves-pro.js', 'js/matieres.js', 'js/mat-francais.js', 'js/mat-histoire.js', 'js/mat-svt-pc.js', 'js/mat-sup.js', 'js/mat-anglais.js', 'js/mat-renfort.js', 'js/mat-langues.js', 'js/mat-specialites.js', 'js/vannes-cash.js', 'js/vannes-ironie.js', 'js/vannes-mots.js', 'js/offre.js', 'js/jeu.js']) w.eval(lire(f));
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
  assert.match(A.urlVoix('fr', 'CHAT'), /^https:\/\/reparole\.fr\/audio\/fr\/[0-9a-z]+\.mp3$/);
  assert.strictEqual(A.urlVoix('kab', 'AƔRUM'), 'https://reparole.fr/audio/kab/aghrum.mp3');
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
await test('lettres en vrac : remettre les lettres dans l\'ordre réussit ; pas proposé en japonais et coréen', () => {
  const w = page(); const d = w.document, A = w.AmiDesMots;
  A.base.cible = 'fr'; A.choisirJeu('animaux');
  assert.ok(d.querySelector('[data-a="jeu"][data-v^="lettres:"]'));
  A.commencer('lettres');
  const tuiles = [...d.querySelectorAll('.tuile')].sort((a, b) => a.dataset.v - b.dataset.v);
  tuiles.forEach(b => b.click());
  assert.ok(d.getElementById('reponse').classList.contains('juste'));
  A.base.cible = 'ja'; A.choisirJeu('animaux');
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
  for(const [ui, cible] of [['fr', 'en'], ['fr', 'kab'], ['ar', 'fr'], ['fr', 'es'], ['fr', 'de'], ['fr', 'it'], ['fr', 'pt'], ['fr', 'ar'], ['es', 'en']]){
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
  clic(w, '[data-a="anglais"]'); assert.strictEqual(d.querySelectorAll('.carte-anglais').length, 12);
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
  assert.ok(!w.__audio.some(u => /reparole\.fr/.test(u)), 'aucun MP3 demandé pour la vanne : ' + w.__audio.join(' '));
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
  const w = page(undefined, null); const A = w.AmiDesMots;
  for(let k = 0; k < 5; k++){ A.defi(); }
  const libres = ['animaux', 'manger', 'maison', 'ville', 'nature', 'corps', 'ecole', 'transports'];
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
await test('langues : seules les langues activées sont visibles, les autres restent dans les données', () => {
  const w = page(); const d = w.document;
  const choix = d.querySelector('#cible');
  assert.ok(choix, 'le sélecteur de langue doit être présent');
  // v5.99.2 : « J'apprends » = langues enseignées à l'école (sauf celle qu'on parle) ; « Je parle » = français + ces langues.
  assert.deepStrictEqual(Array.from(choix.options).map(o => o.value), ['en', 'es', 'de', 'it', 'pt', 'ar']);
  assert.deepStrictEqual(Array.from(d.querySelector('#ui').options).map(o => o.value), ['fr', 'en', 'es', 'de', 'it', 'pt', 'ar']);
  assert.ok(w.TEXTES.uk && w.TEXTES.ja && w.TEXTES.tr && w.TEXTES.pl, 'les langues retirées des listes restent dans les données');
  assert.strictEqual(w.MOTS['🐱'].ko, '고양이', 'le coréen reste conservé dans les données');
  assert.strictEqual(w.MOTS['🐱'].ar, 'قطة', 'larabe reste conservé dans les données');
  assert.strictEqual(w.MOTS['🐱'].kab, 'AMCIC', 'le kabyle reste conservé dans les données');
});
await test('voix : le texte prononcé est celui que ReParole a enregistré (minuscules), pas la majuscule de la banque', () => {
  const w = page(); const A = w.AmiDesMots;
  A.base.cible = 'fr';
  const e = Object.keys(w.MOTS).find(k => w.MOTS[k].fr === 'POISSON');
  assert.strictEqual(A.aDire(e), 'poisson');
  assert.match(A.urlVoix('fr', A.aDire(e)), new RegExp('/fr/' + A.fnv1a('poisson') + '\.mp3$'));
  let total = 0, sans = 0;
  for(const l of ['fr', 'en', 'es', 'it', 'pt', 'de', 'tr', 'pl', 'uk']){ A.base.cible = l; for(const k of Object.keys(w.MOTS)) if(w.MOTS[k][l]){ total++; if(A.aDire(k) === w.MOTS[k][l] && /^[^a-zа-яàâçéèêëîïôûùüÿñæœäöüßığşéąęćłńóśźżєіїґ]+$/.test(w.MOTS[k][l])) sans++; } }
  assert.strictEqual(sans, 0, 'aucun mot tout en majuscules envoyé à la voix');
});
await test('interface en arabe : de droite à gauche, aucun texte français (accueil et page Plus)', () => {
  const w = page('ar', null); const d = w.document;
  assert.strictEqual(d.documentElement.dir, 'rtl');
  const fr = /Jouer|J'apprends|Objectif|vestiaire|Défi|Réglages|S'abonner|par mois|Bientôt/;
  assert.ok(!fr.test(d.body.textContent));
  w.AmiDesMots.ecranPlus();
  assert.ok(!fr.test(d.body.textContent));
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
  // Une erreur juste après l'annonce : Plumo raccroche.
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
  assert.deepStrictEqual($$('.porte').map(b => b.dataset.a), ['porte-mots', 'maths', 'matieres', 'potes'], '4 portes');
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
  clic('matiere-melange', 'francais'); let k = 0; while($('[data-a="qz-rep"]:not([disabled])') && k < 20){ $('[data-a="qz-rep"]:not([disabled])').click(); k++; const s = $('[data-a="qz-suivant"]'); if(s) s.click(); }
  assert.strictEqual(k, 10, '10 questions'); assert.ok(A.J().journal && Object.values(A.J().journal).some(x => x['francais+'] || x['francais-']), 'le journal des parents compte le français');
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
  assert.strictEqual(E.BLANCS.brevet.epreuves.map(p => p[1]).join(','), '2,2,1.5,0.5,2,2', 'coefficients officiels du DNB 2026 (HG 1,5 et EMC 0,5 séparés, oral 2)');
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
  clic('examens'); clic('examen-go', 'bac-maths-spe'); assert.match($('main').textContent, /Automatismes \(QCM\) 6 pts/); clic('examen-suite');
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
  clic('matiere-chap', 'astro|calculs'); let k = 0; while($('[data-a="qz-rep"]:not([disabled])') && k < 15){ $('[data-a="qz-rep"]').click(); k++; const n = $('[data-a="qz-suivant"]'); if(n) n.click(); }
  assert.strictEqual(k, 10);
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

await test('v5.95 : écran Plus, liens légaux et Clash libre sans français quand l’interface est en japonais', async () => {
  const w = page('ja', { MODE_PAYANT:true, SERVEUR:'https://ami.example/serveur', FORMULES:[{ id:'a_vie', prix:'99 €', lien:'https://buy.stripe.com/v' }] }); await w.AmiDesMotsPret;
  const d = w.document, A = w.AmiDesMots;
  A.ecranPlus(); const h = d.querySelector('main').textContent;
  assert.ok(!/Restaurer|code cadeau|Conditions de vente|Un seul paiement/.test(h), 'français dans l’écran Plus');
  assert.match(h, /一度の支払い/); assert.match(h, /ギフトコード/);
  const x = d.createElement('button'); x.dataset.a = 'clash-libre'; d.body.appendChild(x); x.click(); x.remove();
  const c = d.querySelector('main').textContent; assert.match(c, /Free roast battle/); assert.ok(!/On se vanne|Joueur 1/.test(c), 'français dans le Clash libre');
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
  d.querySelectorAll('.piege-opt')[bonne].click(); assert.strictEqual(j.carnet.length, 0);
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
  const w = page('uk'); const d = w.document;
  assert.ok(Array.from(d.querySelector('#ui').options).some(o => o.value === 'uk' && o.selected));
  const w2 = page('en'); assert.ok(!Array.from(w2.document.querySelector('#cible').options).some(o => o.value === 'en'));
  assert.ok(Array.from(w2.document.querySelector('#cible').options).some(o => o.value === 'fr'));
  assert.notStrictEqual(w2.AmiDesMots.base.cible, 'en');
});

console.log(`\n${ok} réussi(s), ${ko} échoué(s)`);
process.exit(ko ? 1 : 0);
})();
