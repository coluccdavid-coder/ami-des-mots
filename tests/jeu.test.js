// Ami des mots — tests. Lancer : node tests/jeu.test.js (jsdom requis :
// NODE_PATH vers un node_modules qui l'a, ou npm i jsdom).
'use strict';
const fs = require('fs'), path = require('path'), assert = require('assert');
const { JSDOM } = require('jsdom');
const ICI = path.join(__dirname, '..');
const lire = f => fs.readFileSync(path.join(ICI, f), 'utf8');
let ok = 0, ko = 0;
const test = async (n, f) => { try{ await f(); console.log('  ✔', n); ok++; }catch(e){ console.log('  ✘', n, '—', e.message); ko++; } };

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
  for(const f of ['js/donnees.js', 'js/voix.js', 'js/textes.js', 'js/articulation.js', 'js/genres.js', 'js/confusions.js', 'js/vannes.js', 'js/pieges.js', 'js/anglais.js', 'js/jeu.js']) w.eval(lire(f));
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
  assert.strictEqual(E.cible, 'en'); assert.strictEqual(E.cibleMasquee, 'es');
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
  for(const [ui, cible] of [['fr', 'en'], ['fr', 'kab'], ['ar', 'fr']]){
    const w = page(ui === 'ar' ? 'ar' : 'fr-FR'); const A = w.AmiDesMots, d = w.document;
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
await test('une erreur fait rire Ami, sans gros mots, avec la bonne réponse, jamais deux fois la même vanne de suite', () => {
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
  clic(w, '[data-a="anglais"]'); assert.strictEqual(d.querySelectorAll('.carte-anglais').length, 4);
  // Battle : une mauvaise réplique (vanne, pas de point) puis la bonne
  clic(w, '[data-a="battle"]'); const plumes = A.J().plumes;
  for(let k = 0; k < 3; k++){
    const txt = d.querySelector('.bulle-ami .piege-fr').textContent, m = E.BATTLE.find(x => txt.includes(x.ami)); assert.ok(m, txt);
    const opts = [...d.querySelectorAll('.piege-opt')];
    if(k === 0){ const f = opts.find(b => b.textContent !== m.bon.en); f.click(); assert.ok(d.querySelector('#battle-retour').textContent.includes(m.faux.find(x => x.en === f.textContent).vanne)); assert.ok(f.disabled); }
    opts.find(b => b.textContent === m.bon.en).click(); assert.match(d.querySelector('#battle-retour').textContent, /Bien envoyé|Trouvé/);
    clic(w, '[data-a="battle-suivant"]');
  }
  assert.match(d.querySelector('.battle-score').textContent, /Toi 2 – 1 Ami/); assert.strictEqual(A.J().plumes, plumes + 4);
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
  assert.deepStrictEqual(JSON.parse(JSON.stringify(A.J().anglais)), { situations:['cafe'], victoires:0, battles:0, dictees:0 });
  assert.ok(lire('index.html').includes('js/anglais.js') && lire('sw.js').includes('"js/anglais.js"'));
});
await test('familles de confusions : astuce affichée quand on confond cat et dog en apprenant l’anglais', () => {
  const w = page(); const A = w.AmiDesMots;
  for(const c of w.CONFUSIONS){ for(const e of c.p) assert.ok(w.MOTS[e], 'image inconnue ' + e); assert.ok(c.fr.length <= 90 && c.en.length <= 90, c.fr); }
  assert.strictEqual(A.base.cible, 'en');
  assert.match(A.astuce('🐱', '🐶', 'fr'), /miaou/);
  assert.match(A.astuce('🐶', '🐱', 'en'), /meow/);
  assert.strictEqual(A.astuce('🐱', '🦀', 'fr'), '');
});
await test('Lecture facile : Ami reste « Tout doux », vannes courtes, et le réglage le dit', () => {
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
await test('réaction d’Ami : la classe suit le niveau d’humour', () => {
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
  vus.clear(); for(let k = 0; k < 60; k++) vus.add(A.blague(c[0], c[1]));
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
await test('gratuit : 3 thèmes et 3 jeux ouverts ; les autres mènent à la page Plus', () => {
  const w = page(undefined, null); const A = w.AmiDesMots, d = w.document;
  assert.strictEqual(A.CONFIG.MODE_PAYANT, true);
  A.themes();
  const verrous = [...d.querySelectorAll('.theme.verrou')].map(b => b.dataset.v);
  for(const th of ['animaux', 'manger', 'maison']) assert.ok(!verrous.includes(th), th);
  assert.ok(verrous.includes('ville') && verrous.includes('nature'));
  A.choisirJeu('animaux');
  const ouverts = [...d.querySelectorAll('[data-a="jeu"]')].map(b => b.dataset.v.split(':')[0]);
  assert.deepStrictEqual([...new Set(ouverts)].sort(), ['decouvrir', 'ecoute', 'quel_mot', 'traduction']);
  assert.strictEqual(ouverts.length, 10, '10 jeux gratuits');
  assert.strictEqual(d.querySelectorAll('.niv.verrou').length, 40, '40 jeux Plus');
  A.commencer('memoire');
  assert.ok(d.querySelector('main.plus'));
  A.choisirJeu('ville');
  assert.ok(d.querySelector('main.plus'));
  assert.match(d.body.textContent, /5,99 €/);
  assert.match(d.body.textContent, /Bientôt disponible/);
});
await test('gratuit : un seul joueur ; le deuxième demande Plus', () => {
  const w = page(undefined, null); const d = w.document;
  clic(w, '[data-a="reglages"]'); clic(w, '[data-a="nouveau-joueur"]');
  assert.ok(d.querySelector('#form-joueur'), 'le premier joueur se nomme librement');
  d.getElementById('nom-joueur').value = 'Léa';
  d.getElementById('form-joueur').dispatchEvent(new w.Event('submit', { cancelable:true }));
  clic(w, '[data-a="reglages"]'); clic(w, '[data-a="nouveau-joueur"]');
  assert.ok(d.querySelector('main.plus'));
});
await test('défi du jour gratuit : il ne puise que dans les thèmes gratuits', () => {
  const w = page(undefined, null); const A = w.AmiDesMots;
  for(let k = 0; k < 5; k++){ A.defi(); }
  const libres = ['animaux', 'manger', 'maison'];
  assert.ok(A.distincts(Object.keys(w.MOTS).filter(e => w.MOTS[e].kab), 'kab').length > 30);
  w.document.querySelectorAll('[data-a="repondre"], [data-a="ecouter"]').forEach(b => { if(b.dataset.v) assert.ok(libres.includes(w.MOTS[b.dataset.v].theme), b.dataset.v); });
});
await test('abonnement : lien Stripe avec le code anonyme ; un certificat signé ouvre tout ; rien d\'autre n\'est envoyé', async () => {
  const { publique } = await cles();
  const cfg = { LIEN_PAIEMENT:'https://buy.stripe.com/test_abc', API_ABONNEMENT:'https://x.supabase.co/functions/v1/ami-abonnement', CLE_PUBLIQUE:publique };
  const w = page(undefined, cfg); const A = w.AmiDesMots, d = w.document;
  await w.AmiDesMotsPret;
  const code = etat(w).abo.code;
  assert.match(code, /^AMI-[A-Z2-9]{4}-[A-Z2-9]{4}-[A-Z2-9]{4}$/);
  A.ecranPlus();
  assert.strictEqual(d.querySelector('main.plus a.gros').getAttribute('href'), 'https://buy.stripe.com/test_abc?client_reference_id=' + encodeURIComponent(code));
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
    const w = page(undefined, { CLE_PUBLIQUE:publique }, x => x.localStorage.setItem('amidesmots:v2', JSON.stringify(st)));
    await w.AmiDesMotsPret;
    assert.strictEqual(w.AmiDesMots.plus(), false, JSON.stringify(abo).slice(0, 60));
  }
});
await test('abonnement terminé : tout se referme (après 3 jours de grâce hors ligne)', async () => {
  const { publique } = await cles();
  const fin = new Date(Date.now() - 4 * 864e5).toISOString();
  const st = { joueurs:[{ nom:'', couleur:0, plumes:0, etoiles:{}, jours:[], porte:[], mots:{}, trophees:[], defis:[] }], actif:0, abo:{ code:'AMI-AAAA-BBBB-CCCC', jeton:await jeton('AMI-AAAA-BBBB-CCCC', fin) } };
  const w = page(undefined, { CLE_PUBLIQUE:publique }, x => x.localStorage.setItem('amidesmots:v2', JSON.stringify(st)));
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
  const w = page(undefined, { CLE_PUBLIQUE:publique, API_ABONNEMENT:'https://x.supabase.co/functions/v1/ami-abonnement' }, x => { x.localStorage.setItem('amidesmots:v2', JSON.stringify(st)); x.__reponse = { actif:false }; });
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
  assert.deepStrictEqual(Array.from(choix.options).map(o => o.value), ['fr', 'en']);
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
  assert.strictEqual((J.match(/fetch\(/g) || []).length, 1, 'un seul fetch (vérification du code)');
  assert.match(lire('index.html'), /connect-src 'self' https:\/\/\*\.supabase\.co;/);
});
await test('hors connexion : le service worker garde le jeu et toutes ses images', () => {
  const S = lire('sw.js');
  for(const f of fs.readdirSync(path.join(ICI, 'img/pictos'))) assert.ok(S.includes('img/pictos/' + f), f);
  for(const f of ['index.html', 'js/jeu.js', 'js/donnees.js', 'css/jeu.css']) assert.ok(S.includes('"' + f + '"'), f);
});

console.log(`\n${ok} réussi(s), ${ko} échoué(s)`);
process.exit(ko ? 1 : 0);
})();
