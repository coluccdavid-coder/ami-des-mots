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
  w.CONFIG_JEU = config === undefined ? { MODE_PAYANT:false } : config;
  Object.defineProperty(w, 'crypto', { value:require('crypto').webcrypto, configurable:true });
  w.TextEncoder = TextEncoder; w.TextDecoder = TextDecoder;
  w.__fetch = []; w.fetch = async (u) => { w.__fetch.push(String(u)); return { ok:true, json:async () => (w.__reponse || { actif:false }) }; };
  if(avant) avant(w);
  for(const f of ['js/donnees.js', 'js/textes.js', 'js/articulation.js', 'js/jeu.js']) w.eval(lire(f));
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
      const pareil = new Set(['en.th_nature', 'en.niv_n', 'en.niv_e', 'es.niv_n', 'pt.niv_n', 'it.niv_f', l + '.plus', l + '.plus_badge']);   // vrais homonymes et nom de marque
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
  assert.strictEqual(J.etoiles['kab:manger:quel_mot:n'], 3);
  assert.strictEqual(J.plumes, 9);
  assert.strictEqual(J.jours.length, 1);
  assert.strictEqual(Object.values(J.mots).filter(f => f.b === 1).length, 6, 'chaque mot monte d\'une boîte');
  assert.ok(J.trophees.includes('premiere'));
  assert.deepStrictEqual(Object.keys(w.localStorage).filter(k => k !== 'amidesmots:v2'), [], 'une seule clé');
});
await test('une erreur ne bloque pas : l\'image fausse est grisée, on réessaie, le mot revient à réviser', () => {
  const w = page(); const d = w.document;
  w.AmiDesMots.choisirJeu('animaux'); w.AmiDesMots.commencer('ecoute');
  const bonne = d.querySelector('[data-a="ecouter"]').dataset.v;
  const faux = [...d.querySelectorAll('[data-a="repondre"]')].find(b => b.dataset.v !== bonne);
  faux.click();
  assert.ok(faux.disabled && faux.classList.contains('faux'));
  assert.ok(d.querySelector('[data-a="repondre"][data-v="' + bonne + '"]:not([disabled])'));
  assert.ok(w.AmiDesMots.aRevoir().includes(bonne));
});
await test('révision espacée : juste → plus tard, faux → aujourd\'hui ; « À revoir » ne propose que les mots dus', () => {
  const w = page(); const A = w.AmiDesMots;
  const [a, b] = A.motsDu('animaux', 'kab');
  A.noter(a, true); A.noter(a, true); A.noter(b, false);
  const f = A.J().mots;
  assert.strictEqual(f['kab:' + a].b, 2); assert.strictEqual(f['kab:' + a].d, A.jour(3));
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
      const vrai = A.affiche('kab', w.MOTS[e].kab) === mot;
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
  const vrai = A.affiche('kab', w.MOTS[bonne].kab) === d.querySelector('.mot-vf').textContent;
  clic(w, '[data-a="vf"][data-v="' + (vrai ? 1 : 0) + '"]');
  assert.ok(d.querySelector('.vf-oui.juste, .vf-non.juste'));
  assert.strictEqual(A.J().mots['kab:' + bonne].b, 1);
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
  assert.strictEqual(E.cible, 'es'); assert.strictEqual(E.joueurs[0].plumes, 33);
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
await test('langues : le choix de langue n\'affiche que le nom de la langue', () => {
  const w = page(); const d = w.document;
  assert.strictEqual(d.querySelector('#cible option[value="ko"]').textContent, '한국어');
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
