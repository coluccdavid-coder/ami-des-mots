#!/usr/bin/env node
// =====================================================================
//  Ami des mots — importe le VOCABULAIRE ILLUSTRÉ de ReParole
//  ---------------------------------------------------------------------
//  Lit le dossier de ReParole SANS RIEN Y ÉCRIRE, et fabrique ici :
//    js/donnees.js     les mots (une image = un mot par langue), par thème
//    img/pictos/*.webp les seules images utilisées
//  Les mots sont recopiés TELS QUELS (même orthographe, mêmes majuscules)
//  pour que la voix enregistrée de ReParole soit retrouvée : son fichier
//  porte le nom du texte exact (hachage FNV-1a).
//
//    node outils/importer-depuis-reparole.js ../reparole
// =====================================================================
'use strict';
const fs = require('fs'), path = require('path');
const ICI = path.join(__dirname, '..');
const RP = path.resolve(process.argv[2] || path.join(ICI, '..', 'w'));
if(!fs.existsSync(path.join(RP, 'scripts/extract-voice-content.js'))){
  console.error('Dossier ReParole introuvable : ' + RP); process.exit(1);
}
const LANGUES = ['fr','en','es','it','pt','de','ar','tr','pl','ja','uk','ko','dz','ma','tn','kab'];

// Thème de chaque image. Une image absente d'ici n'entre pas dans le jeu.
const THEMES = {
  animaux:  '🐱🐶🐰🐮🐷🐴🐭🦆🐟🦋🦒🐝🦌🦉🦅🐢🦎🐙🦀🦔🦦🦥🦫🦨🦩🦚🦜🦢🦂🐊',
  manger:   '🍎🍞🥚🧀🥛🍌🍊🍇🍓🥕🍄☕🍽️🥄🔪🍴',
  maison:   '🏠🔑🚪🪑🛏️⌚💡🪟📺⏰👜🖼️🎁🏮🧭⚖️🏺',
  habits:   '👕👖👟👞🧢🧦☂️',
  nature:   '☀️🌹🌙⭐☁️🌧️❄️🌋⛰️🏝️🌊🌪️🌳',
  ville:    '🚗⛵🌉🏰🗼⛲🏦📬🚲⚓⛱️',
  musique:  '🎻🎺🎸🥁🎹🎷🪕🎈🧩🎪🎠🎯🎥',
  atelier:  '🔬🔭🧪🧲⚙️🔩🪛🪚🪡🧯🪤🕸️🛡️⚔️🏹'
};
const graphemes = s => Array.from(new Intl.Segmenter('fr', { granularity:'grapheme' }).segment(s), x => x.segment);
const pic = e => [...e].map(c => c.codePointAt(0)).filter(c => c !== 0xFE0F).map(c => c.toString(16)).join('-');

// Le chargeur de l'outil des voix de ReParole donne les banques COMPLÈTES
// (compléments et égalisations compris), comme en production.
const src = fs.readFileSync(path.join(RP, 'scripts/extract-voice-content.js'), 'utf8').replace(/\nmain\(\);\s*$/, '\nmodule.exports = { loadApp };');
const mod = { exports:{} };
const avant = process.cwd(); process.chdir(RP);
new Function('require', 'module', '__dirname', src)(require, mod, path.join(RP, 'scripts'));
const w = mod.exports.loadApp().window;
process.chdir(avant);

const MOTS = {};
const themeDe = {};
for(const [t, s] of Object.entries(THEMES)) for(const e of graphemes(s)) themeDe[e] = t;
for(const l of LANGUES){
  const B = l === 'fr' ? w.BANK : (w['BANK_' + l.toUpperCase()] || {});
  const pris = {};
  const ajouter = (e, mot) => {
    if(!themeDe[e] || pris[e] || typeof mot !== 'string' || !mot.trim()) return;
    if(!fs.existsSync(path.join(RP, 'pictos', pic(e) + '.webp'))) return;
    pris[e] = 1;
    (MOTS[e] = MOTS[e] || { theme:themeDe[e] })[l] = mot.trim();
  };
  for(const t in B){
    const it = B[t] && B[t].items; if(!it) continue;
    for(const lv in it) for(const x of (Array.isArray(it[lv]) ? it[lv] : [])) if(x && x.emoji) ajouter(x.emoji, x.answer || x.word);
  }
  // Objets des scènes de « Mes outils » (mêmes images, 16 langues).
  const T = {};
  new Function('I18N', fs.readFileSync(path.join(RP, 'js/outils', l + '.js'), 'utf8'))({ completer:(c, x) => { if(c === l) Object.assign(T, x); } });
  for(const m of fs.readFileSync(path.join(RP, 'js/outils.js'), 'utf8').matchAll(/\['(o_\w+)','([^']+)'/g)) ajouter(m[2], T[m[1]]);
}

// Images : seulement celles des mots retenus.
const dossier = path.join(ICI, 'img/pictos');
fs.mkdirSync(dossier, { recursive:true });
for(const f of fs.readdirSync(dossier)) fs.unlinkSync(path.join(dossier, f));
for(const e of Object.keys(MOTS)) fs.copyFileSync(path.join(RP, 'pictos', pic(e) + '.webp'), path.join(dossier, pic(e) + '.webp'));

const ordre = Object.keys(THEMES);
const cles = Object.keys(MOTS).sort((a, b) => ordre.indexOf(MOTS[a].theme) - ordre.indexOf(MOTS[b].theme));
const lignes = cles.map(e => '  ' + JSON.stringify(e) + ':' + JSON.stringify(Object.assign({ img:pic(e) }, MOTS[e])));
fs.writeFileSync(path.join(ICI, 'js/donnees.js'),
  '// GÉNÉRÉ par outils/importer-depuis-reparole.js — ne pas éditer à la main.\n' +
  '// Une image, son thème, et le mot dans chaque langue (orthographe de ReParole).\n' +
  'window.THEMES = ' + JSON.stringify(ordre) + ';\n' +
  'window.MOTS = {\n' + lignes.join(',\n') + '\n};\n');
const parLangue = LANGUES.map(l => l + ':' + cles.filter(e => MOTS[e][l]).length).join(' ');
console.log(cles.length + ' images — ' + parLangue);
process.exit(0);
