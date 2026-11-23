#!/usr/bin/env node
// Ami des mots — après avoir enregistré des phrases : mets « oui » dans la colonne « enregistrée ? » de
// docs/a-enregistrer/phrases-en.csv (et dépose les MP3 sur le serveur des voix, sous le nom indiqué), puis lance :
//   node outils/marquer-enregistrees.js
// Le jeu jouera alors le vrai enregistrement au lieu de la voix du téléphone pour ces phrases.
'use strict';
const fs = require('fs'), path = require('path'), ICI = path.join(__dirname, '..');
const csv = fs.readFileSync(path.join(ICI, 'docs/a-enregistrer/phrases-en.csv'), 'utf8').replace(/^﻿/, '');
const cellules = l => { const out = []; let c = '', q = false; for(let i = 0; i < l.length; i++){ const x = l[i];
  if(q){ if(x === '"' && l[i + 1] === '"'){ c += '"'; i++; } else if(x === '"') q = false; else c += x; }
  else if(x === '"') q = true; else if(x === ';'){ out.push(c); c = ''; } else c += x; } out.push(c); return out; };
const ok = csv.split(/\r?\n/).slice(1).filter(Boolean).map(cellules).filter(r => /^\s*oui\s*$/i.test(r[4] || '')).map(r => (r[3].match(/^en\/([0-9a-z]+)\.mp3$/) || [])[1]).filter(Boolean);
fs.writeFileSync(path.join(ICI, 'js/phrases-enregistrees.js'), "// GÉNÉRÉ par outils/marquer-enregistrees.js — ne pas modifier à la main.\n" +
  "// Phrases des jeux d'écoute qui ont un vrai enregistrement sur le serveur des voix (empreinte = nom du MP3).\n" +
  'window.PHRASES_ENREGISTREES = ' + JSON.stringify({ en:[...new Set(ok)].sort() }) + ';\n');
console.log(ok.length + ' phrase(s) marquée(s) comme enregistrée(s).');
