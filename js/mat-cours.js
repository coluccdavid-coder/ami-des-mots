// Ami des mots — v6.25 : outil commun pour les « cours de l'année » (un chapitre par classe et par matière, au niveau de la classe).
// MATIERES.cours(matière, chapitre, { en:[nom, questions, domaine], es:[…], de:[…] }) ajoute le chapitre et ses traductions.
(function(){
  'use strict';
  const M = window.MATIERES; if(!M) return;
  M.cours = function(mid, ch, tr){
    const m = M.trouver(mid); if(!m) return;
    if(!m.chapitres.some(c => c.id === ch.id)) m.chapitres.push(ch);
    const T = window.MATIERES_LANGUES || {};
    for(const [l, v] of Object.entries(tr || {})){
      if(!T[l] || !v) continue; const [nom, q, dom] = v;
      T[l].noms = T[l].noms || {}; T[l].q = T[l].q || {};
      const n = T[l].noms[mid] = T[l].noms[mid] || { dom:{}, ch:{} }; n.ch = n.ch || {}; n.dom = n.dom || {};
      if(nom) n.ch[ch.id] = nom; if(dom) n.dom[ch.dom] = dom; if(q) T[l].q[mid + '/' + ch.id] = q;
    }
  };
})();
