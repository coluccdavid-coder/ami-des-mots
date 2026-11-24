#!/usr/bin/env node
// Ami des mots — fabrique les listes de travail (v5.75), à ouvrir dans un tableur (séparateur « ; », UTF-8) :
//   docs/a-relire/maths-<niveau>.csv  : 3 exemples par chapitre (énoncé, bonne réponse, pièges, explication) pour un prof ;
//   docs/a-relire/sciences.csv        : chaque question de sciences avec ses clashs et son explication ;
//   docs/a-enregistrer/phrases-en.csv : chaque phrase anglaise des jeux d'écoute, avec le nom de fichier MP3 attendu.
// Usage : node outils/listes-a-relire.js
'use strict';
const fs = require('fs'), path = require('path');
const ICI = path.join(__dirname, '..'), w = {};
global.window = w;
for(const f of ['js/juge.js', 'js/vannes-libres.js', 'js/maths-en.js', 'js/maths-es.js', 'js/maths-de.js', 'js/maths-it.js', 'js/maths-pt.js', 'js/maths.js', 'js/vannes-cash.js', 'js/vannes-ironie.js', 'js/sciences-en.js', 'js/sciences-es.js', 'js/sciences-de.js', 'js/sciences-it.js', 'js/sciences-pt.js', 'js/sciences.js', 'js/pieges.js', 'js/anglais.js', 'js/clash.js', 'js/histoires.js', 'js/parcours.js', 'js/rigolade.js', 'js/clash-plus.js', 'js/matieres.js', 'js/mat-francais.js', 'js/mat-histoire.js', 'js/mat-svt-pc.js', 'js/mat-sup.js', 'js/mat-anglais.js', 'js/mat-renfort.js', 'js/mat-langues.js', 'js/mat-specialites.js', 'js/epreuves.js', 'js/epreuves-spe.js', 'js/epreuves-plus.js', 'js/epreuves-oraux.js', 'js/epreuves-pro.js'])
  new Function('window', fs.readFileSync(path.join(ICI, f), 'utf8'))(w);
// Même empreinte que le jeu (js/jeu.js, fnv1a) : c'est le nom du MP3 sur le serveur des voix.
const fnv1a = s => { let h = 0x811c9dc5; for(let i = 0; i < s.length; i++){ h ^= s.charCodeAt(i); h = Math.imul(h, 0x01000193); } return (h >>> 0).toString(36); };
const cel = v => '"' + String(v == null ? '' : v).replace(/"/g, '""') + '"';
const ecrire = (f, entete, lignes) => { const p = path.join(ICI, f); fs.mkdirSync(path.dirname(p), { recursive:true });
  fs.writeFileSync(p, '﻿' + [entete].concat(lignes).map(l => l.map(cel).join(';')).join('\r\n') + '\r\n'); return lignes.length; };
const bilan = [];

// Maths : 3 exemples tirés au hasard (graine fixe) par chapitre.
const M = w.MATHS;
for(const niv of M.NIVEAUX){
  const lignes = [];
  for(const [id, nom, desc] of M.chapitresDe(niv)){
    for(let k = 0; k < 3; k++){
      const q = M.question(id, M.hasard(1000 + k * 37 + id.length), 'taquin'); if(!q) continue;
      lignes.push([niv, id, nom, desc, q.enonce, q.bon, q.faux.map(f => f.en + (f.cle ? ' [' + f.cle + ']' : '')).join(' | '), q.regle || '', '', '']);
    }
  }
  bilan.push('maths ' + niv + ' : ' + ecrire('docs/a-relire/maths-' + niv + '.csv', ['niveau', 'chapitre', 'nom', 'programme', 'énoncé', 'bonne réponse', 'mauvaises réponses [erreur visée]', 'explication', 'OK ? (oui/non)', 'remarque du prof'], lignes) + ' lignes');
}
// Sciences.
const S = w.SCIENCES;
bilan.push('sciences : ' + ecrire('docs/a-relire/sciences.csv', ['thème', 'question', 'bonne réponse', 'mauvaise réponse 1', 'clash 1', 'mauvaise réponse 2', 'clash 2', 'explication', 'OK ? (oui/non)', 'remarque'],
  S.Q.map(x => [x[1], x[2], x[3], (x[4][0] || [])[0], (x[4][0] || [])[1], (x[4][1] || [])[0], (x[4][1] || [])[1], x[5], '', ''])) + ' questions');
// Matières du programme : TOUTES les questions écrites (une fois chacune, avec ses niveaux),
// plus 6 exemples de chaque générateur (questions fabriquées au hasard).
for(const m of w.MATIERES.LISTE){
  const lignes = [], vues = new Set();
  for(const c of m.chapitres){
    for(const x of c.banque || []){ const cle = x[0] + '|' + x[1]; if(vues.has(cle)) continue; vues.add(cle);
      lignes.push([c.niv.join(', '), c.dom, c.nom, x[0], x[1], x[2].map(f => f[0] + ' → ' + f[1]).join(' | '), x[3] || '', '', '']); }
    if(c.gen) for(const q of w.MATIERES.serie(m.id, c.id, c.niv[0], 6, 77, 'taquin').filter(q => !vues.has(q.enonce + '|' + q.bon)))
      lignes.push([c.niv.join(', ') + ' (générée)', c.dom, c.nom, q.enonce, q.bon, q.faux.map(f => f.en + ' → ' + f.vanne).join(' | '), q.regle || '', '', '']);
  }
  bilan.push(m.id + ' : ' + ecrire('docs/a-relire/' + m.id + '.csv', ['niveau', 'domaine', 'chapitre', 'énoncé', 'bonne réponse', 'mauvaises réponses → vanne', 'explication', 'OK ? (oui/non)', 'remarque du prof'], lignes) + ' questions');
}
// Examens blancs et annales (v5.78) : un sujet de chaque, pour relecture par un prof.
{ const E = w.EPREUVES, lignes = [];
  for(const id of Object.keys(E.EPREUVES)){ const e = E.construire(id, 2026); for(const q of e.liste) lignes.push([e.titre, q.consigne, q.contexte, q.enonce, q.bon, q.faux.map(f => f.en + ' → ' + f.vanne).join(' | '), q.regle || '', '', '']); }
  bilan.push('épreuves : ' + ecrire('docs/a-relire/epreuves.csv', ['épreuve', 'partie', 'énoncé de l’exercice', 'question', 'bonne réponse', 'mauvaises réponses → vanne', 'explication', 'OK ? (oui/non)', 'remarque du prof'], lignes) + ' questions'); }
// Phrases anglaises des jeux d'écoute.
const A = w.ANGLAIS, R = w.RIGOLADE, vu = new Map();
const ajouter = (jeu, en, fr) => { en = String(en || '').trim(); if(!en || vu.has(en)) return; vu.set(en, [jeu, en, fr || '', 'en/' + fnv1a(en) + '.mp3', '']); };
for(const d of A.DICTEE) ajouter('Dictée', d.en, d.fr);
for(const p of w.PARCOURS.REPETER) ajouter('Répète après Plumo', p.en, p.fr);
for(const p of R.PAIRES){ ajouter('Jeu des oreilles', p.a.en, p.a.fr); ajouter('Jeu des oreilles', p.b.en, p.b.fr); }
for(const v of R.VRAI_FAUX) ajouter('True or false', v.en, v.fr);
for(const h of w.HISTOIRES.liste) for(const l of h.lignes) ajouter('Histoire : ' + h.titre, l[1], l[2]);
for(const s of A.SITUATIONS) for(const e of s.etapes){ ajouter('Situation : ' + s.titre, e.dit, e.fr); ajouter('Situation : ' + s.titre + ' (réponse)', e.bon, ''); }
for(const m of A.BATTLE.concat(w.CLASH.MANCHES)){ ajouter('Battle (Plumo)', m.ami, m.fr); ajouter('Battle (réplique)', m.bon.en, m.bon.fr); }
for(const v of w.VANNES_LIBRES.toutes()) ajouter('Clash libre (' + v.cat + ')', v.en, v.fr);
for(const p of w.PIEGES.liste) ajouter('Pièges', p.bon, p.fr);
bilan.push('phrases à enregistrer : ' + ecrire('docs/a-enregistrer/phrases-en.csv', ['jeu', 'phrase anglaise', 'traduction', 'fichier MP3 attendu (sur le serveur des voix)', 'enregistrée ? (oui)'], [...vu.values()]) + ' phrases');
console.log(bilan.join('\n'));
