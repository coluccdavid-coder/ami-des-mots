// Ami des mots — fabrique serveur-php/admin/catalogue.json (thèmes, jeux, coins) depuis le jeu lui-même.
// Le coin admin du serveur n'accepte que ces valeurs. Lancé par : npm run verifier.
'use strict';
const fs = require('fs'), path = require('path'), { JSDOM } = require('jsdom');
const R = path.join(__dirname, '..'), lire = f => fs.readFileSync(path.join(R, f), 'utf8');
const w = new JSDOM('<main id="app"></main>', { runScripts:'outside-only', url:'https://jeu.example/admin.html' }).window;
for(const f of ['js/donnees.js', 'js/textes.js', 'js/offre.js', 'js/admin.js']) w.eval(lire(f));
const T = (w.TEXTES || {}).fr || {}, A = w.AdminAmi;
const catalogue = {
  themes:(w.THEMES || []).map(t => [t, T['th_' + t] || t]),
  jeux:A.JEUX.map(j => [j[0], j[1], T['j_' + j[0]] || j[0]]),
  coins:A.COINS.map(([g, l]) => [g, l.map(c => [c[0], c[1], c[2]])])
};
fs.writeFileSync(path.join(R, 'serveur-php/admin/catalogue.json'), JSON.stringify(catalogue, null, 1) + '\n');
console.log('catalogue.json : ' + catalogue.themes.length + ' thèmes, ' + catalogue.jeux.length + ' jeux, ' + A.TOUS_COINS.length + ' coins');
