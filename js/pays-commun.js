// v6.80 : outil commun aux programmes des autres pays (js/pays-italie.js, pays-espagne.js, pays-allemagne.js, pays-usa.js, pays-angleterre.js).
// Chaque pays ajoute ses matières au jeu (langue et littérature, histoire et éducation civique), en deux chapitres de 20 questions :
// collège (classes françaises 6e → 3e) et lycée (2nde → Tle), dans la langue du pays. Le parcours « Mon pays » les présente
// avec les noms de classes du pays ; les contrôles par trimestre, la révision du jour et le carnet d'erreurs marchent comme ailleurs.
(function(){
  'use strict';
  const COLLEGE = ['6e', '5e', '4e', '3e'], LYCEE = ['2nde', '1re', 'Tle'];
  // [question, bonne réponse, [[leurre, vanne] ×3], règle] → question dans la langue du pays
  const Q = (lang, l) => l.map(([enonce, bon, faux, regle]) => ({ enonce, bon, faux:faux.map(([en, vanne]) => ({ en, vanne })), regle, lang }));
  // m : { id, pays, lang, nom, ic, dom, college:{ nom, q }, lycee:{ nom, q }, examen:{ college, lycee } } (college ou lycee peut manquer)
  function ajouter(m){
    const M = window.MATIERES; if(!M || M.trouver(m.id)) return;
    // v6.81 : une matière peut n'exister qu'au lycée (philosophie) ou qu'au collège.
    const examens = {}, chapitres = [];
    if(m.college){ for(const n of COLLEGE) examens[n] = m.examen.college; chapitres.push({ id:m.id + '-college', nom:m.college.nom, dom:m.dom, niv:COLLEGE.slice(), banque:Q(m.lang, m.college.q) }); }
    if(m.lycee){ for(const n of LYCEE) examens[n] = m.examen.lycee; chapitres.push({ id:m.id + '-lycee', nom:m.lycee.nom, dom:m.dom, niv:LYCEE.slice(), banque:Q(m.lang, m.lycee.q) }); }
    M.ajouter({ id:m.id, nom:m.nom, ic:m.ic, pays:m.pays, examens, chapitres });
    // Les noms restent dans la langue du pays, quelle que soit la langue de l'interface (ce sont des noms officiels de matières).
    const ML = window.MATIERES_LANGUES = window.MATIERES_LANGUES || {};
    for(const l of ['en', 'es', 'de', 'it', 'pt']){ const d = ML[l] = ML[l] || { noms:{}, q:{} }; d.noms = d.noms || {}; d.q = d.q || {};
      if(!d.noms[m.id]) d.noms[m.id] = { nom:m.nom, dom:{ [m.dom]:m.dom }, ch:Object.fromEntries(chapitres.map(c => [c.id, c.nom])) }; }
    const S = window.SYSTEMES_SCOLAIRES && window.SYSTEMES_SCOLAIRES[m.pays];
    if(S){ S.matieres = S.matieres || []; if(!S.matieres.includes(m.id)) S.matieres.push(m.id); }
  }
  window.AMI_PAYS_PROGRAMMES = { ajouter, COLLEGE, LYCEE };
})();
