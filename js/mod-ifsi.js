// Ami des mots — v6.92 : ÉTUDES D'INFIRMIER (IFSI), comme les autres matières :
// • une carte sur l'écran Médecine qui ouvre l'espace IFSI ;
// • un examen blanc infirmier (40 questions, 60 min) et une épreuve de calculs de doses (20 questions, 30 min),
//   chronométrés, sans vanne pendant l'épreuve, corrigés à la fin avec la note sur 20 ;
// • des études de documents (prescription et feuille de surveillance fictives, à visée pédagogique) ;
// • les textes officiels : arrêté du 20 février 2026, fiche RNCP, liste des actes, Parcoursup, Ordre infirmier.
// Rien n'est supprimé. Contenu éducatif : il ne remplace ni l'IFSI, ni les protocoles du service, ni l'avis médical.
(function(){
  'use strict';
  const M = window.AMI_MODULES; if(!M) return;
  const api = () => M.api, tx = (...a) => M.tx(...a);
  if(!M.cartes['matiere-ecran']) M.cartes['matiere-ecran'] = [];
  M.textes({
    '🩺 Études d’infirmier (IFSI)':['🩺 Nursing studies (IFSI)', '🩺 Estudios de enfermería (IFSI)', '🩺 Pflegestudium (IFSI)', '🩺 Studi infermieristici (IFSI)', '🩺 Estudos de enfermagem (IFSI)'],
    'Examen blanc, calculs de doses, études de documents et textes officiels':['Mock exam, dose calculations, document studies and official texts', 'Examen de prueba, cálculo de dosis, estudios de documentos y textos oficiales', 'Probeprüfung, Dosisberechnung, Dokumentanalysen und amtliche Texte', 'Esame di prova, calcolo delle dosi, analisi di documenti e testi ufficiali', 'Exame simulado, cálculo de doses, estudos de documentos e textos oficiais'],
    'Trois ans, six semestres, 180 ECTS. Les étudiants entrés avant septembre 2026 suivent le référentiel de 2009 ; les nouveaux entrants, celui du 20 février 2026. Les questions portent sur le socle commun aux deux.':['Three years, six semesters, 180 ECTS. Students who started before September 2026 follow the 2009 framework; new entrants follow the one of 20 February 2026. The questions cover the core shared by both.', 'Tres años, seis semestres, 180 ECTS. Los estudiantes que empezaron antes de septiembre de 2026 siguen el marco de 2009; los nuevos, el del 20 de febrero de 2026. Las preguntas tratan el núcleo común a ambos.', 'Drei Jahre, sechs Semester, 180 ECTS. Wer vor September 2026 begonnen hat, folgt dem Rahmen von 2009; Neueinsteiger dem vom 20. Februar 2026. Die Fragen betreffen den gemeinsamen Kern.', 'Tre anni, sei semestri, 180 ECTS. Chi ha iniziato prima di settembre 2026 segue il quadro del 2009; i nuovi iscritti quello del 20 febbraio 2026. Le domande riguardano la base comune.', 'Três anos, seis semestres, 180 ECTS. Quem entrou antes de setembro de 2026 segue o referencial de 2009; os novos, o de 20 de fevereiro de 2026. As perguntas incidem sobre a base comum.'],
    '📝 Examen blanc infirmier':['📝 Nursing mock exam', '📝 Examen de prueba de enfermería', '📝 Probeprüfung Pflege', '📝 Esame di prova infermieristico', '📝 Exame simulado de enfermagem'],
    '🧮 Épreuve de calculs de doses':['🧮 Dose calculation test', '🧮 Prueba de cálculo de dosis', '🧮 Prüfung Dosisberechnung', '🧮 Prova di calcolo delle dosi', '🧮 Prova de cálculo de doses'],
    '{0} questions · {1} min · chronométré, sans vanne, corrigé à la fin':['{0} questions · {1} min · timed, no teasing, corrected at the end', '{0} preguntas · {1} min · cronometrado, sin bromas, corregido al final', '{0} Fragen · {1} Min. · mit Zeitlimit, ohne Sprüche, am Ende korrigiert', '{0} domande · {1} min · a tempo, senza battute, corretto alla fine', '{0} perguntas · {1} min · cronometrado, sem piadas, corrigido no fim'],
    '🔁 Révision IFSI : toutes les leçons':['🔁 IFSI revision: all the lessons', '🔁 Repaso IFSI: todas las lecciones', '🔁 IFSI-Wiederholung: alle Lektionen', '🔁 Ripasso IFSI: tutte le lezioni', '🔁 Revisão IFSI: todas as lições'],
    '20 questions mélangées des 10 leçons, avec les vannes de Plumo ; les erreurs vont dans le carnet':['20 mixed questions from the 10 lessons, with Plumo’s teasing; mistakes go into the notebook', '20 preguntas mezcladas de las 10 lecciones, con las bromas de Plumo; los errores van al cuaderno', '20 gemischte Fragen aus den 10 Lektionen, mit Plumos Sprüchen; Fehler kommen ins Heft', '20 domande miste dalle 10 lezioni, con le battute di Plumo; gli errori vanno nel quaderno', '20 perguntas misturadas das 10 lições, com as piadas do Plumo; os erros vão para o caderno'],
    '📜 Textes officiels':['📜 Official texts', '📜 Textos oficiales', '📜 Amtliche Texte', '📜 Testi ufficiali', '📜 Textos oficiais'],
    'Note : {0}/20':['Mark: {0}/20', 'Nota: {0}/20', 'Note: {0}/20', 'Voto: {0}/20', 'Nota: {0}/20'],
    '{0} bonnes réponses sur {1}':['{0} correct answers out of {1}', '{0} respuestas correctas de {1}', '{0} richtige Antworten von {1}', '{0} risposte giuste su {1}', '{0} respostas certas em {1}'],
    'À revoir':['To review', 'Para repasar', 'Zum Wiederholen', 'Da ripassare', 'A rever'],
    'Bonne réponse :':['Correct answer:', 'Respuesta correcta:', 'Richtige Antwort:', 'Risposta giusta:', 'Resposta certa:'],
    'Ta réponse :':['Your answer:', 'Tu respuesta:', 'Deine Antwort:', 'La tua risposta:', 'A tua resposta:'],
    'Pas de réponse (temps écoulé).':['No answer (time is up).', 'Sin respuesta (se acabó el tiempo).', 'Keine Antwort (Zeit abgelaufen).', 'Nessuna risposta (tempo scaduto).', 'Sem resposta (o tempo acabou).'],
    '🔁 Recommencer':['🔁 Try again', '🔁 Volver a empezar', '🔁 Noch einmal', '🔁 Ricomincia', '🔁 Recomeçar'],
    'Contenu éducatif : il ne remplace ni la formation en IFSI, ni les protocoles du service, ni l’avis d’un médecin ou d’un pharmacien.':['Educational content: it does not replace nursing school, ward protocols, or the advice of a doctor or pharmacist.', 'Contenido educativo: no sustituye la formación en el IFSI, ni los protocolos del servicio, ni la opinión de un médico o un farmacéutico.', 'Lerninhalt: Er ersetzt weder die Pflegeschule noch Stationsprotokolle oder den Rat von Arzt oder Apotheker.', 'Contenuto educativo: non sostituisce la formazione, i protocolli del reparto né il parere di un medico o di un farmacista.', 'Conteúdo educativo: não substitui a formação, os protocolos do serviço nem o parecer de um médico ou farmacêutico.']
  });

  // Textes et sites officiels (adresses vérifiées).
  const OFFICIEL = [
    ['Arrêté du 20 février 2026 relatif au diplôme d’État d’infirmier', 'https://www.fhf.fr/sites/default/files/2026-02/Arr%C3%AAt%C3%A9%20r%C3%A9ing%C3%A9nierie%20formation%20IDE.pdf', 'Le nouveau référentiel de formation (NOR ESRS2601184A), en vigueur pour les entrants de septembre 2026.'],
    ['La réingénierie de la formation infirmière (FHF)', 'https://www.fhf.fr/expertises/ressources-humaines/developpement-des-competences-formation-etudiants-en-sante/la-reingenierie-de-la-formation-conduisant-au-diplome-detat-infirmier', 'Résumé du décret n° 2026-130 et de l’arrêté du 20 février 2026.'],
    ['Diplôme d’État d’infirmier — fiche RNCP 42589', 'https://www.francecompetences.fr/recherche/rncp/42589/', 'Activités, compétences et conditions d’obtention du diplôme.'],
    ['Arrêté du 26 juin 2026 : liste des actes et soins infirmiers', 'https://www.legifrance.gouv.fr/jorf/article_jo/JORFARTI000054321956', 'Ce que l’infirmier diplômé d’État peut réaliser (Légifrance).'],
    ['Parcoursup', 'https://www.parcoursup.gouv.fr', 'La plateforme d’admission en IFSI pour les lycéens et les étudiants.'],
    ['Ordre national des infirmiers', 'https://www.ordre-infirmiers.fr', 'Inscription obligatoire, déontologie de la profession.']
  ];

  // Études de documents (fictifs, à visée pédagogique) : elles s'ajoutent à celles des autres matières.
  const D = window.AMI_DOCUMENTS;
  if(D && Array.isArray(D.DOCS) && !D.DOCS.some(d => d.id === 'ifsi-prescription')){
    D.DOCS.push(
      { id:'ifsi-prescription', matiere:'medecine', niv:['Sup'], titre:'Lire une prescription médicale (document fictif)',
        source:'Document d’exercice : prescription fictive créée pour l’entraînement : elle ne concerne aucun patient réel.',
        texte:'Service de médecine — Patient : M. Exemple, 72 ans, 60 kg. Allergie connue : pénicillines.\n1) Paracétamol 1 g per os toutes les 6 heures si douleur (EVA > 3), sans dépasser 4 g/24 h.\n2) Enoxaparine 4 000 UI en sous-cutanée, une fois par jour, à 20 h.\n3) NaCl 0,9 % : 1 000 mL sur 24 heures, perfuseur standard (20 gouttes/mL).\n4) Surveillance : pouls, tension, température matin et soir ; plaquettes deux fois par semaine.\nDate, nom et signature du médecin prescripteur.',
        q:[
          ['Quelle classe d’antibiotiques ne faut-il jamais donner à ce patient ?', 'les pénicillines', [['le paracétamol', 'C’est un antalgique, et il est prescrit. 💊'], ['le NaCl 0,9 %', 'C’est un soluté, pas un antibiotique. 💧'], ['aucune', 'Relis la ligne « allergie connue ». 👀']], 'Une allergie connue se vérifie avant toute nouvelle administration.'],
          ['Combien de gouttes par minute régler pour la perfusion de NaCl ?', 'environ 14 gouttes/min', [['environ 42 gouttes/min', 'Ce serait pour 500 mL en 4 heures. ⏱️'], ['environ 1 000 gouttes/min', 'Le flacon serait vide en vingt minutes. 🐇'], ['environ 7 gouttes/min', 'Deux fois trop lent. 🐢']], '1 000 × 20 ÷ 1 440 = 13,9, soit environ 14 gouttes/min.'],
          ['Par quelle voie et à quel moment donner l’enoxaparine ?', 'en sous-cutanée, une fois par jour à 20 h', [['en intraveineuse, toutes les heures', 'Ce n’est pas ce que dit la ligne 2. 🔍'], ['par la bouche, au petit-déjeuner', 'Une HBPM ne se donne pas par la bouche. 🍽️'], ['en intramusculaire, le matin', 'Risque d’hématome ; relis la prescription. 💪']], 'Respecter la voie et l’horaire fait partie de la règle des 5 B.'],
          ['Pourquoi la prescription demande-t-elle une numération des plaquettes ?', 'pour dépister une thrombopénie induite par l’héparine', [['pour connaître le groupe sanguin', 'Il ne change pas. 🅰️'], ['pour surveiller le paracétamol', 'Ce n’est pas la raison. 💊'], ['par habitude, sans raison', 'Chaque surveillance a un but. 🎯']], 'Une chute des plaquettes impose d’alerter le médecin.'],
          ['Le patient a mal (EVA à 6) à 14 h et a reçu 1 g de paracétamol à 10 h. Que faire ?', 'attendre 16 h pour la dose suivante et prévenir le médecin si la douleur persiste', [['redonner 1 g tout de suite', 'Il faut respecter 6 heures entre deux prises ici. ⏰'], ['donner 4 g d’un coup', 'Dose maximale de la journée en une prise : danger. ⚠️'], ['ne rien faire et ne rien noter', 'La douleur doit être évaluée, tracée et transmise. 📝']], 'La prescription fixe l’intervalle (6 h) et le maximum (4 g/24 h).'],
        ] },
      { id:'ifsi-surveillance', matiere:'medecine', niv:['Sup'], titre:'Interpréter une feuille de surveillance (document fictif)',
        source:'Document d’exercice : feuille de surveillance fictive créée pour l’entraînement : elle ne concerne aucun patient réel.',
        texte:'Mme Exemple, 80 ans, opérée hier d’une prothèse de hanche.\n8 h : pouls 82/min, TA 128/76 mmHg, T° 37,2 °C, SpO₂ 97 %, EVA 3, diurèse depuis la veille 900 mL.\n14 h : pouls 112/min, TA 92/58 mmHg, T° 38,6 °C, SpO₂ 93 %, EVA 6, diurèse depuis 8 h : 80 mL.\nPansement : propre et sec à 8 h ; écoulement à 14 h.',
        q:[
          ['Comment évolue le pouls entre 8 h et 14 h ?', 'il augmente : la patiente devient tachycarde', [['il diminue', 'Relis : 82 puis 112. 🔍'], ['il reste stable', 'Il gagne 30 battements par minute. 📈'], ['il disparaît', 'Il est bien mesuré à 112. ❤️']], 'Au-delà de 100/min au repos, on parle de tachycardie.'],
          ['Que montre la température de 14 h ?', 'une fièvre (38,6 °C)', [['une hypothermie', 'C’est l’inverse. 🧊'], ['une température normale', 'Elle dépasse 38 °C. 🌡️'], ['une erreur de thermomètre certaine', 'On recontrôle, mais on ne l’écarte pas. 🔁']], 'Fièvre, pouls rapide et tension basse doivent faire penser à une complication.'],
          ['Que penser de la diurèse entre 8 h et 14 h ?', 'elle est trop faible : 80 mL en 6 heures', [['elle est excellente', 'Moins de 15 mL par heure, c’est peu. 🚱'], ['elle est trop abondante', 'C’est l’inverse. 🚰'], ['elle n’a aucune importance', 'Elle reflète l’état d’hydratation et du rein. 🫘']], 'Une diurèse faible doit être signalée rapidement.'],
          ['Quel signe concerne la plaie opératoire à 14 h ?', 'un écoulement du pansement', [['un pansement propre et sec', 'C’était à 8 h. 🕗'], ['aucun signe', 'Relis la dernière ligne. 👀'], ['une cicatrice déjà refermée', 'Elle a été opérée hier. 📅']], 'On décrit l’écoulement (aspect, quantité) et on le transmet.'],
          ['Que doit faire l’infirmier face à ces résultats de 14 h ?', 'alerter le médecin sans attendre et tracer les observations', [['attendre la visite du lendemain', 'Plusieurs signes s’aggravent en même temps. ⏰'], ['donner un somnifère pour qu’elle se repose', 'Ce n’est pas la réponse adaptée. 😴'], ['ne rien noter pour ne pas inquiéter', 'Tout doit être tracé et transmis. 📝']], 'Tachycardie, hypotension, fièvre, baisse de saturation et oligurie : la situation peut être grave.'],
        ] }
    );
  }

  const virg = n => String(Math.round(n * 10) / 10).replace('.', ',');
  const EPREUVES = { blanc:{ titre:'📝 Examen blanc infirmier', n:40, minutes:60 }, calculs:{ titre:'🧮 Épreuve de calculs de doses', n:20, minutes:30 },
    revision:{ titre:'🔁 Révision IFSI : toutes les leçons', n:20, minutes:0, vannes:true } };
  function liste(type){
    const MT = window.MATIERES, ids = (MT && MT.IFSI) || [], graine = Math.floor(Math.random() * 1e9);
    if(type === 'calculs') return MT.serie('medecine', 'ifsi-calculs', 'Sup', 20, graine, 'taquin');
    const n = (EPREUVES[type] || EPREUVES.blanc).n, par = Math.ceil(n / Math.max(1, ids.length)), l = [];
    ids.forEach((id, k) => l.push(...MT.serie('medecine', id, 'Sup', par, graine + k, 'taquin')));
    for(let i = l.length - 1; i > 0; i--){ const j = Math.floor(Math.random() * (i + 1)); [l[i], l[j]] = [l[j], l[i]]; }
    return l.slice(0, n);
  }
  function lancer(type){
    const A = api(), e = EPREUVES[type], l = liste(type); if(!e || !l.length) return ecran();
    A.questionsGo(l, Object.assign({ titre:tx(e.titre), retour:'ifsi', fin:z => fin(type, z) }, e.vannes ? {} : { finA:Date.now() + e.minutes * 60000, sansVanne:true }));
  }
  function fin(type, z){
    const A = api(), esc = A.esc, n = z.liste.length, err = (z.reponses || []).filter(r => !r.juste), sans = z.liste.slice(z.i);
    const item = (q, l2) => '<li><p>' + esc(q.enonce) + '</p>' + l2 + '<p>✅ ' + esc(tx('Bonne réponse :')) + ' ' + esc(q.bon) + '</p>' + (q.regle ? '<p class="petit">💡 ' + esc(q.regle) + '</p>' : '') + '</li>';
    A.poser(A.barre('ifsi') + '<main class="centre trimestre-fin ifsi-fin"><h2>' + esc(tx(EPREUVES[type].titre)) + '</h2><p class="gros-score">' + esc(tx('Note : {0}/20', virg(20 * z.bonnes / Math.max(1, n)))) + '</p><p>' + esc(tx('{0} bonnes réponses sur {1}', z.bonnes, n)) + '</p>' +
      (err.length || sans.length ? '<h3>' + esc(tx('À revoir')) + '</h3><ol class="correction-controle">' + err.map(r => item(r.q, '<p>❌ ' + esc(tx('Ta réponse :')) + ' ' + esc(r.choix) + '</p>')).join('') + sans.map(q => item(q, '<p>⏱️ ' + esc(tx('Pas de réponse (temps écoulé).')) + '</p>')).join('') + '</ol>' : '') +
      '<div class="actions serrees"><button class="moyen plein" data-a="ifsi-epreuve" data-v="' + type + '">' + esc(tx('🔁 Recommencer')) + '</button><button class="moyen" data-a="ifsi">' + esc(tx('🩺 Études d’infirmier (IFSI)')) + '</button></div></main>');
  }
  function ecran(){
    const A = api(), esc = A.esc, MT = window.MATIERES, m = MT && MT.trouver('medecine'); if(!m) return A.matieresAccueil();
    const nDocs = D ? D.pour('medecine', 'Sup').length : 0, carte = (a, v, ic, t1, t2) => M.carte(a, v, ic, t1, t2);
    const chaps = (MT.IFSI || []).map(id => m.chapitres.find(c => c.id === id)).filter(Boolean);
    A.poser(A.barre('matiere-medecine') + '<main class="coin-anglais ifsi-ecran"><h2>' + esc(tx('🩺 Études d’infirmier (IFSI)')) + '</h2>' +
      '<p class="pieges-intro">' + esc(tx('Trois ans, six semestres, 180 ECTS. Les étudiants entrés avant septembre 2026 suivent le référentiel de 2009 ; les nouveaux entrants, celui du 20 février 2026. Les questions portent sur le socle commun aux deux.')) + '</p>' +
      '<div class="cartes-anglais">' +
        carte('ifsi-epreuve', 'blanc', '📝', esc(tx('📝 Examen blanc infirmier')).replace(/^📝 /, ''), esc(tx('{0} questions · {1} min · chronométré, sans vanne, corrigé à la fin', EPREUVES.blanc.n, EPREUVES.blanc.minutes))) +
        carte('ifsi-epreuve', 'calculs', '🧮', esc(tx('🧮 Épreuve de calculs de doses')).replace(/^🧮 /, ''), esc(tx('{0} questions · {1} min · chronométré, sans vanne, corrigé à la fin', EPREUVES.calculs.n, EPREUVES.calculs.minutes))) +
        carte('ifsi-epreuve', 'revision', '🔁', esc(tx('🔁 Révision IFSI : toutes les leçons')).replace(/^🔁 /, ''), esc(tx('20 questions mélangées des 10 leçons, avec les vannes de Plumo ; les erreurs vont dans le carnet'))) +
        (nDocs && M.actions.docs ? carte('docs', 'medecine', '📄', esc(tx('📄 Études de documents ({0})', nDocs)).replace(/^📄 /, ''), esc(tx('Un texte ou des mesures, puis des questions : comme au brevet et au bac.'))) : '') +
      '</div>' +
      '<section class="domaine"><h3>📚 ' + esc(MT.nomDom(m, 'Études d’infirmier (IFSI)')) + '</h3><div class="liste-chap">' +
        chaps.map(c => '<button class="chap" data-a="matiere-chap" data-v="medecine|' + c.id + '"><span>' + esc(MT.nomChap(m, c)) + '</span><em>▶ ' + c.banque.length + '</em></button>').join('') + '</div></section>' +
      '<section class="domaine"><h3>' + esc(tx('📜 Textes officiels')) + '</h3><div class="cartes-anglais">' +
        OFFICIEL.map(([t, u, d]) => '<a class="carte-anglais lien-carte" href="' + esc(u) + '" target="_blank" rel="noopener"><span class="ic">🔗</span><strong>' + esc(t) + '</strong><small>' + esc(d) + '</small></a>').join('') + '</div></section>' +
      '<p class="petit">⚕️ ' + esc(tx('Contenu éducatif : il ne remplace ni la formation en IFSI, ni les protocoles du service, ni l’avis d’un médecin ou d’un pharmacien.')) + '</p></main>');
  }
  M.cartes['matiere-ecran'].push(() => { const A = api(); if(A.etatMatieres().derniere !== 'medecine') return '';
    return '<div class="cartes-anglais">' + M.carte('ifsi', '', '🩺', A.esc(tx('🩺 Études d’infirmier (IFSI)')).replace(/^🩺 /, ''), A.esc(tx('Examen blanc, calculs de doses, études de documents et textes officiels'))) + '</div>'; });
  Object.assign(M.actions, {
    'ifsi':() => ecran(),
    'ifsi-epreuve':v => EPREUVES[v] ? lancer(v) : ecran(),
    'matiere-medecine':() => api().matiereAccueil('medecine')
  });
  window.AMI_IFSI = { OFFICIEL, EPREUVES, liste };
})();
