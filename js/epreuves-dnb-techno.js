// Ami des mots — v6.30 : l'épreuve de sciences du brevet porte sur deux disciplines sur trois (physique-chimie, SVT, technologie).
// La technologie (programme 2024, js/mat-techno.js et js/mat-cpl-sciences.js) entre dans le tirage.
(function(){
  'use strict';
  const E = window.EPREUVES, M = window.MATIERES; if(!E || !M || !E.EPREUVES['dnb-sciences'] || !M.trouver('techno')) return;
  const ep = E.EPREUVES['dnb-sciences'], avant = ep.faire;
  const techno = r => ({ titre:'Technologie', pts:10, contexte:'Objets et systèmes techniques, énergie, information, programmation (programme de technologie 2024).',
    questions:M.serie('techno', 'examen', '3e', 6, Math.floor(r() * 1e9) + 1, 'taquin').map(x => ({ q:x.enonce, bon:x.bon, faux:x.faux.map(f => [f.en, f.vanne]), regle:x.regle })) });
  ep.officiel = 'Deux disciplines sur trois, tirées au sort : physique-chimie, SVT, technologie (10 pts chacune)';
  ep.faire = r => { const [pc, svt] = avant(r), k = Math.floor(r() * 3); return k === 0 ? [pc, svt] : k === 1 ? [pc, techno(r)] : [svt, techno(r)]; };
})();
