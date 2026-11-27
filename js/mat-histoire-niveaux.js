// Ami des mots — v6.89 : niveaux des chapitres d'histoire alignés sur les programmes officiels (aucune question supprimée).
// • La Seconde Guerre mondiale et le XXe siècle après 1945 ne sont pas au programme de 1re (qui va de 1789 aux lendemains de 1918) :
//   ils sont étudiés en 3e et en terminale.
// • La Révolution française et l'Empire ne sont plus au programme de 2nde (qui s'arrête à la Révolution américaine) :
//   ils ouvrent le programme de 1re.
// Chargé avant js/themes.js, pour que les chapitres « Par thème » reprennent ces niveaux.
(function(){
  'use strict';
  const M = window.MATIERES, m = M && M.trouver('histoire'); if(!m) return;
  const regler = (id, avant, apres) => { const c = m.chapitres.find(x => x.id === id); if(!c) return;
    const f = l => { const s = l.map(n => n === avant ? apres : n).filter(Boolean); return M.NIVEAUX.filter(n => s.includes(n)); };
    c.niv = f(c.niv); if(c.nivQ) c.nivQ = c.nivQ.map(l => { const r = f(l); return r.length ? r : c.niv.slice(); }); };
  for(const id of ['xxe', 'seconde-guerre']) regler(id, '1re', null);
  regler('sgm-cours', '1re', 'Tle');
  regler('revolution', '2nde', '1re');
  M.NIVEAUX_REVUS = (M.NIVEAUX_REVUS || []).concat(['xxe', 'seconde-guerre', 'sgm-cours', 'revolution']);
})();
