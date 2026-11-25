// Ami des mots — v6.29 : classe précise de certaines questions dans les chapitres qui couvrent plusieurs classes.
// Une question absente de cette liste garde les classes de son chapitre. Chargé avant themes.js.
(function(){
  'use strict';
  const M = window.MATIERES; if(!M) return;
  const C3 = ['3e', '2nde', '1re', 'Tle'], C4 = ['4e', '3e', '2nde', '1re', 'Tle'];
  const PRECIS = {
    'svt/vivant':{ 1:C3, 2:C3 },                       // ADN, chromosomes : génétique de 3e
    'physique/matiere':{ 0:C4, 1:C3, 4:C3 },           // formule chimique (4e), pH et noyau de l'atome (3e)
    'histoire/geo':{ 1:C3, 2:C3, 6:C3 }                // aires d'attraction, DROM, Parlement européen : géographie de 3e
  };
  for(const [cle, q] of Object.entries(PRECIS)){
    const [mid, cid] = cle.split('/'), m = M.trouver(mid), ch = m && m.chapitres.find(c => c.id === cid);
    if(!ch || !ch.banque) continue;
    ch.nivQ = ch.banque.map((_, i) => (q[i] || ch.niv).filter(n => ch.niv.includes(n) || !q[i]));
  }
})();
