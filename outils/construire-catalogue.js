// Ami des mots — fabrique serveur-php/admin/catalogue.json (thèmes, jeux, coins) depuis le jeu lui-même.
// Le coin admin du serveur n'accepte que ces valeurs. Lancé par : npm run verifier.
'use strict';
const fs = require('fs'), path = require('path'), { JSDOM } = require('jsdom');
const R = path.join(__dirname, '..'), lire = f => fs.readFileSync(path.join(R, f), 'utf8');
const w = new JSDOM('<main id="app"></main>', { runScripts:'outside-only', url:'https://jeu.example/admin.html' }).window;
for(const f of ['js/donnees.js', 'js/textes.js', 'js/offre.js', 'js/admin.js']) w.eval(lire(f));
// v6.75 : les chapitres des matières, pour que la veille rattache un programme officiel aux chapitres existants.
const scripts = [...lire('index.html').matchAll(/src="(js\/[^"]+)"/g)].map(m => m[1]).filter(f => /^js\/(matieres|mat-|themes|pays-)/.test(f));
const wm = new JSDOM('<main></main>', { runScripts:'outside-only' }).window;
for(const f of scripts) wm.eval(lire(f));
const matieres = {};
for(const m of (wm.MATIERES ? wm.MATIERES.LISTE : [])) matieres[m.id] = m.chapitres.filter(c => !c.theme).map(c => [c.id, c.nom, c.niv.slice()]);
const T = (w.TEXTES || {}).fr || {}, A = w.AdminAmi;
const catalogue = {
  themes:(w.THEMES || []).map(t => [t, T['th_' + t] || t]),
  jeux:A.JEUX.map(j => [j[0], j[1], T['j_' + j[0]] || j[0]]),
  coins:A.COINS.map(([g, l]) => [g, l.map(c => [c[0], c[1], c[2]])]),
  matieres
};
fs.writeFileSync(path.join(R, 'serveur-php/admin/catalogue.json'), JSON.stringify(catalogue, null, 1) + '\n');
console.log('catalogue.json : ' + catalogue.themes.length + ' thèmes, ' + catalogue.jeux.length + ' jeux, ' + A.TOUS_COINS.length + ' coins, ' + Object.keys(matieres).length + ' matières');
