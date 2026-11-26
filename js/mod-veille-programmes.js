// v6.75 : ce que la veille des programmes a publié sur le serveur (serveur-php/veille.php, validé dans le coin admin).
//  · nouveaux chapitres du programme officiel, avec leurs questions → ajoutés à la matière, marqués 🆕 ;
//  · épreuves d'examen et diplômes (ce qui change) → onglet « 🏛️ Officiel ».
// Sans serveur, rien ne change. Tout ce qui arrive du serveur est revérifié ici : format, longueur, vannes passées au juge de Plumo.
(function(){
  'use strict';
  const M = window.AMI_MODULES; if(!M) return;
  if(!M.cartes.officiel) M.cartes.officiel = [];
  const api = () => M.api, tx = (...a) => M.tx(...a);
  let demande = false, examens = {};

  M.textes({
    'Épreuves :':['Exams:', 'Pruebas:', 'Prüfungen:', 'Prove:', 'Provas:'],
    '📰 Ce qui change (veille des textes officiels)':['📰 What is changing (official texts watch)', '📰 Lo que cambia (seguimiento de textos oficiales)', '📰 Was sich ändert (Beobachtung der offiziellen Texte)', '📰 Cosa cambia (monitoraggio dei testi ufficiali)', '📰 O que muda (acompanhamento dos textos oficiais)'],
    'Lu sur les sites officiels et vérifié par un adulte avant d’être affiché.':['Read on official websites and checked by an adult before being shown.', 'Leído en los sitios oficiales y revisado por un adulto antes de mostrarse.', 'Auf offiziellen Websites gelesen und vor der Anzeige von einem Erwachsenen geprüft.', 'Letto sui siti ufficiali e verificato da un adulto prima di essere mostrato.', 'Lido nos sites oficiais e verificado por um adulto antes de ser mostrado.'],
    '🌍 Les examens, pays par pays':['🌍 Exams, country by country', '🌍 Los exámenes, país por país', '🌍 Prüfungen, Land für Land', '🌍 Gli esami, paese per paese', '🌍 Os exames, país a país'],
    'Ce qu’il faut savoir sur chaque examen en vigueur, d’après les sites officiels. Mis à jour par la veille quand un texte change.':['What to know about each exam in force, from official websites. Updated by the watch when a text changes.', 'Lo esencial de cada examen vigente, según los sitios oficiales. Actualizado cuando cambia un texto.', 'Das Wichtigste zu jeder geltenden Prüfung, nach den offiziellen Websites. Aktualisiert, wenn sich ein Text ändert.', 'L’essenziale di ogni esame in vigore, dai siti ufficiali. Aggiornato quando un testo cambia.', 'O essencial de cada exame em vigor, segundo os sites oficiais. Atualizado quando um texto muda.'],
    'Ce qui change :':['What changes:', 'Lo que cambia:', 'Was sich ändert:', 'Cosa cambia:', 'O que muda:'],
    'Source officielle':['Official source', 'Fuente oficial', 'Offizielle Quelle', 'Fonte ufficiale', 'Fonte oficial'],
    'Dans d’autres pays':['In other countries', 'En otros países', 'In anderen Ländern', 'In altri paesi', 'Noutros países'],
    'mis à jour le {0}':['updated on {0}', 'actualizado el {0}', 'aktualisiert am {0}', 'aggiornato il {0}', 'atualizado em {0}']
  });
  const PAYS = { fr:'🇫🇷', it:'🇮🇹', es:'🇪🇸', de:'🇩🇪', us:'🇺🇸', uk:'🇬🇧' };
  const s = (x, n) => typeof x === 'string' ? x.slice(0, n) : '';
  const lienOk = u => /^https:\/\/[a-z0-9.-]+\.[a-z]{2,}\//i.test(String(u || ''));

  // Une question du serveur : [énoncé, bonne réponse, [[leurre, vanne] ×3], règle], vannes acceptées par le juge.
  function questionOk(q){
    if(!Array.isArray(q) || q.length < 4 || !Array.isArray(q[2]) || q[2].length !== 3) return false;
    const [e, b, f, r] = q; if(![e, b, r].every(x => typeof x === 'string' && x.trim() && x.length <= 260)) return false;
    const vus = new Set([b.toLowerCase()]);
    for(const y of f){ if(!Array.isArray(y) || typeof y[0] !== 'string' || typeof y[1] !== 'string' || !y[0].trim() || !y[1].trim() || vus.has(y[0].toLowerCase())) return false; vus.add(y[0].toLowerCase());
      if(window.JUGE && !window.JUGE.juger(y[1]).ok) return false; }
    return true;
  }
  function ajouterContenus(c){
    const MT = window.MATIERES; let n = 0; if(!MT || !c || typeof c !== 'object') return 0;
    for(const mat of Object.keys(c)){ const m = MT.trouver(mat); if(!m || !c[mat] || typeof c[mat] !== 'object') continue;
      for(const id of Object.keys(c[mat])){ const x = c[mat][id];
        if(!/^v-[a-z0-9-]{1,60}$/.test(id) || !x || !MT.NIVEAUX.includes(x.classe) || m.chapitres.some(ch => ch.id === id) || !Array.isArray(x.banque)) continue;
        const banque = x.banque.filter(questionOk).slice(0, 40).map(q => [q[0], q[1], q[2].map(y => [y[0], y[1]]), q[3]]);
        if(banque.length < 10) continue;
        m.chapitres.push({ id, nom:'🆕 ' + s(x.nom, 80), dom:'Programme officiel (mise à jour)', niv:[x.classe], banque, veille:{ source:lienOk(x.source) ? x.source : '', maj:s(x.maj, 10) } }); n++; } }
    return n;
  }
  function adopterExamens(e){ examens = e && typeof e === 'object' && !Array.isArray(e) ? e : {}; }
  function charger(){
    const A = api(); if(demande || !A || !A.CONFIG || !A.CONFIG.SERVEUR) return; demande = true;
    const b = String(A.CONFIG.SERVEUR).replace(/\/?$/, '/');
    fetch(b + 'programme.php?quoi=contenus', { cache:'no-cache' }).then(r => r.ok ? r.json() : null).then(j => { if(j) ajouterContenus(j.contenus); }).catch(() => {});
    fetch(b + 'programme.php?quoi=examens', { cache:'no-cache' }).then(r => r.ok ? r.json() : null).then(j => { if(j) adopterExamens(j.examens); }).catch(() => {});
  }
  setTimeout(charger, 1200);

  const carteExamen = (sys, x) => { const A = api(), esc = A.esc;
    return '<article class="veille-examen"><h4>' + (PAYS[sys] || '🌍') + ' ' + esc(s(x.examen, 80)) + (x.session ? ' · ' + esc(s(x.session, 20)) : '') + '</h4>' +
      (x.resume ? '<p>' + esc(s(x.resume, 400)) + '</p>' : '') + (x.conditions ? '<p class="petit">' + esc(s(x.conditions, 300)) + '</p>' : '') +
      (Array.isArray(x.epreuves) && x.epreuves.length ? '<p><strong>' + esc(tx('Épreuves :')) + '</strong></p><ul>' + x.epreuves.slice(0, 20).map(e => '<li>' + esc(s(e && e.nom, 80)) + [e && e.duree, e && e.notation, e && e.format].filter(Boolean).map(v => ' · ' + esc(s(v, 200))).join('') + '</li>').join('') + '</ul>' : '') +
      (Array.isArray(x.changements) && x.changements.length ? '<p><strong>' + esc(tx('Ce qui change :')) + '</strong></p><ul>' + x.changements.slice(0, 12).map(c => '<li>' + esc(s(c, 160)) + '</li>').join('') + '</ul>' : '') +
      '<p class="petit">' + (lienOk(x.source) ? '<a href="' + esc(x.source) + '" target="_blank" rel="noopener noreferrer">' + esc(tx('Source officielle')) + '</a> · ' : '') + esc(tx('mis à jour le {0}', s(x.maj, 10))) + '</p></article>'; };
  // v6.76 : fiches intégrées (js/examens-monde.js), remplacées fiche par fiche par celles que publie la veille du serveur.
  const tous = () => { const b = window.EXAMENS_MONDE || {}, r = {};
    for(const src of [b, examens]) for(const sys of Object.keys(src)) if(src[sys] && typeof src[sys] === 'object' && /^[a-z]{2}$/.test(sys)) r[sys] = Object.assign({}, r[sys] || {}, src[sys]);
    return r; };
  M.cartes.officiel.push(() => {
    charger(); const A = api(), esc = A.esc, ex = tous(), fr = ex.fr || {};
    const autres = Object.keys(ex).filter(k => k !== 'fr');
    if(!Object.keys(fr).length && !autres.length) return '';
    return '<section class="domaine veille"><h3>' + esc(tx('🌍 Les examens, pays par pays')) + '</h3><p class="petit">' + esc(tx('Ce qu’il faut savoir sur chaque examen en vigueur, d’après les sites officiels. Mis à jour par la veille quand un texte change.')) + '</p>' +
      Object.keys(fr).map(k => carteExamen('fr', fr[k])).join('') +
      (autres.length ? '<h4>' + esc(tx('Dans d’autres pays')) + '</h4>' + autres.flatMap(sys => Object.keys(ex[sys]).map(k => carteExamen(sys, ex[sys][k]))).join('') : '') + '</section>';
  });
  window.AMI_VEILLE = { ajouterContenus, adopterExamens, questionOk, charger };
})();
