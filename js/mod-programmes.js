// Ami des mots — v6.89 : un programme = un pays, sans mélange.
// En haut des matières, une rangée d'onglets : 🇫🇷 France · 🏴 England · 🇺🇸 United States · 🇮🇹 Italia · 🇪🇸 España · 🇵🇹 Portugal · 🇩🇪 Deutschland.
// Chaque onglet n'ouvre que son programme : la France garde ses outils (révision du jour, veille, défi de classe, correction, défi rétro),
// l'Angleterre garde ses Years, Mocks et Past papers, les autres pays leurs matières, leurs examens et leurs maths dans leur langue.
// Le carnet d'erreurs est trié de la même façon : chaque programme ne montre que ses propres erreurs.
// Rien n'est supprimé : les anciens chemins (« Mon pays », « England curriculum ») mènent au même endroit.
(function(){
  'use strict';
  const M = window.AMI_MODULES; if(!M) return;
  const api = () => M.api, S = () => window.SYSTEMES_SCOLAIRES || {}, tx = (...a) => M.tx(...a);
  M.textes({
    'Programme scolaire':['School curriculum', 'Programa escolar', 'Lehrplan', 'Programma scolastico', 'Programa escolar'],
    '🎯 Mes erreurs ({0})':['🎯 My mistakes ({0})', '🎯 Mis errores ({0})', '🎯 Meine Fehler ({0})', '🎯 I miei errori ({0})', '🎯 Os meus erros ({0})'],
    'Les questions ratées de ce programme : elles reviennent jusqu’à ce qu’elles soient maîtrisées':['Questions you got wrong in this curriculum: they come back until you master them', 'Las preguntas falladas de este programa: vuelven hasta que las domines', 'Falsch beantwortete Fragen dieses Lehrplans: Sie kommen wieder, bis du sie beherrschst', 'Le domande sbagliate di questo programma: tornano finché non le padroneggi', 'As perguntas erradas deste programa: voltam até as dominares']
  });
  const ORDRE = ['fr', 'uk', 'us', 'it', 'es', 'pt', 'de'];
  const ids = () => ORDRE.filter(id => S()[id]).concat(Object.keys(S()).filter(id => !ORDRE.includes(id)));
  const alias = v => v === 'gb' ? 'uk' : v;
  const drapeau = id => id === 'uk' ? '🏴' : (S()[id] || {}).drapeau || '';
  const nom = id => id === 'fr' ? 'France' : (S()[id] || {}).nom || id;
  // Le programme d'une question, d'après sa matière : gb-… = Angleterre, it-/es-/de-/us-/pt-… = ce pays, le reste = programme français.
  const programmeDe = mat => { const s = String(mat || ''); if(/^gb-/.test(s)) return 'uk'; const m = /^(it|es|de|us|pt)-/.exec(s); return m ? m[1] : 'fr'; };
  function courant(){
    const A = api(); let p = ''; try{ p = A.J().systeme; }catch(e){}
    if(A.base().programme === 'gb') return 'uk';
    return S()[p] && p !== 'uk' ? p : 'fr';
  }
  function choisir(v){
    const A = api(), id = alias(v); if(!S()[id]) return false;
    A.J().systeme = id; A.base().programme = id === 'uk' ? 'gb' : 'fr'; A.garder(); return true;
  }
  function ouvrir(){
    const A = api(), c = courant();
    if(c === 'uk' && M.actions['gb-accueil']) return M.actions['gb-accueil']();
    if(c !== 'fr' && c !== 'uk' && M.actions['pays-ecran']) return M.actions['pays-ecran']();
    return A.matieresAccueil();
  }
  function onglets(cur){
    const esc = api().esc, c = cur || courant();
    return '<nav class="onglets-matieres onglets-pays" aria-label="' + esc(tx('Programme scolaire')) + '">' + ids().map(id =>
      '<button class="onglet' + (id === c ? ' actif' : '') + '" data-a="programme-pays" data-v="' + id + '" aria-pressed="' + (id === c) + '">' + drapeau(id) + ' ' + esc(nom(id)) + '</button>').join('') + '</nav>';
  }
  // Carte « Mes erreurs » d'un programme (rien s'il n'y a pas d'erreur dans ce programme).
  function carteErreurs(prog, titre, sous){
    const A = api(), n = A.carnetDe ? A.carnetDe(prog).length : 0; if(!n) return '';
    return M.carte('carnet-erreurs', prog, '🎯', A.esc(titre ? titre.replace('{0}', n) : tx('🎯 Mes erreurs ({0})', n)).replace(/^🎯 /, ''), A.esc(sous || tx('Les questions ratées de ce programme : elles reviennent jusqu’à ce qu’elles soient maîtrisées')));
  }
  const avant = { gb:M.actions['gb-programme'], pays:M.actions['pays-choisir'] };
  Object.assign(M.actions, {
    'programme-pays':v => { choisir(v); return ouvrir(); },
    'matieres':() => ouvrir(),
    'gb-programme':v => { choisir(v === 'gb' ? 'uk' : 'fr'); return ouvrir(); },
    // L'ancien écran « Choisis ton pays » garde son comportement (fiche du pays), en réglant aussi le programme.
    'pays-choisir':v => { choisir(v); return avant.pays ? avant.pays(v) : ouvrir(); },
    // Depuis l'écran England : la fiche « Year group & exams » de l'Angleterre (classes, GCSE, A level, entraînements chronométrés).
    'pays-ecran-uk':() => { choisir('uk'); return M.actions['pays-ecran'] ? M.actions['pays-ecran']() : ouvrir(); },
    'pays-gb':() => { choisir('uk'); return ouvrir(); }
  });
  window.AMI_PROGRAMMES = { courant, choisir, ouvrir, onglets, carteErreurs, programmeDe, liste:() => ids().map(id => ({ id, nom:nom(id), drapeau:drapeau(id) })) };
  // La page d'accueil est dessinée avant ce module : on la redessine pour que « Mon programme » propose tous les pays.
  try{ const app = document.getElementById('app'); if(app && app.dataset.ecran === 'bienvenue' && api() && api().bienvenue) api().bienvenue(); }catch(e){}
})();
