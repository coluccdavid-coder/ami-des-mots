// v6.78 : « 🎓 Examens de la section internationale » — tout pour préparer le brevet option internationale et le BFI 2026.
//  · comprendre le BFI (épreuves, coefficients, sources officielles) ;
//  · un plan de préparation de A à Z, à cocher (1re → terminale) ;
//  · BFI blanc : écrit d'approfondissement culturel et linguistique (ACL), DNL histoire-géographie, oral de connaissance du monde
//    (sujet tiré au sort, chrono de préparation et d'exposé, grille d'auto-évaluation) — puis un bilan ;
//  · brevet option internationale blanc (écrit + oral) ;
//  · liens vers tous les chapitres et vers les contrôles par trimestre.
// Les épreuves écrites blanches sont faites des questions du jeu : chronométrées, sans vanne, corrigées à la fin.
// Rien n'est enregistré au micro : l'oral se travaille à voix haute, avec le chrono, et l'élève s'auto-évalue.
(function(){
  'use strict';
  const M = window.AMI_MODULES; if(!M) return;
  if(!M.cartes['matiere-ecran']) M.cartes['matiere-ecran'] = [];
  const api = () => M.api, tx = (...a) => M.tx(...a), ID = 'anglais-inter';

  M.textes({
    '🎓 Examens de la section internationale':['🎓 International section exams', '🎓 Exámenes de la sección internacional', '🎓 Prüfungen der internationalen Sektion', '🎓 Esami della sezione internazionale', '🎓 Exames da secção internacional'],
    'Brevet option internationale, BFI 2026 de A à Z, BFI blanc, contrôles':['Brevet international option, BFI 2026 from A to Z, mock BFI, tests', 'Brevet opción internacional, BFI 2026 de la A a la Z, BFI de prueba, controles', 'Brevet internationale Option, BFI 2026 von A bis Z, Probe-BFI, Tests', 'Brevet opzione internazionale, BFI 2026 dalla A alla Z, BFI di prova, verifiche', 'Brevet opção internacional, BFI 2026 de A a Z, BFI simulado, testes'],
    'Le BFI en bref':['The BFI in brief', 'El BFI en resumen', 'Das BFI in Kürze', 'Il BFI in breve', 'O BFI em resumo'],
    'Mon plan de préparation, de A à Z':['My preparation plan, from A to Z', 'Mi plan de preparación, de la A a la Z', 'Mein Vorbereitungsplan, von A bis Z', 'Il mio piano di preparazione, dalla A alla Z', 'O meu plano de preparação, de A a Z'],
    '{0} étapes sur {1}':['{0} of {1} steps', '{0} de {1} etapas', '{0} von {1} Schritten', '{0} tappe su {1}', '{0} de {1} etapas'],
    '📝 BFI blanc':['📝 Mock BFI', '📝 BFI de prueba', '📝 Probe-BFI', '📝 BFI di prova', '📝 BFI simulado'],
    'Écrit d’approfondissement culturel et linguistique':['Written exam: literature and culture (ACL)', 'Escrito de profundización cultural y lingüística', 'Schriftliche Prüfung: kulturelle und sprachliche Vertiefung', 'Scritto di approfondimento culturale e linguistico', 'Escrito de aprofundamento cultural e linguístico'],
    'DNL histoire-géographie':['DNL history-geography', 'DNL historia-geografía', 'DNL Geschichte-Geografie', 'DNL storia-geografia', 'DNL história-geografia'],
    'Oral de connaissance du monde':['Connaissance du monde oral', 'Oral de conocimiento del mundo', 'Mündliche Prüfung „Connaissance du monde“', 'Orale di conoscenza del mondo', 'Oral de conhecimento do mundo'],
    '{0} questions · {1} min · sans vanne, corrigé à la fin':['{0} questions · {1} min · no teasing, corrected at the end', '{0} preguntas · {1} min · sin bromas, corregido al final', '{0} Fragen · {1} Min. · ohne Sprüche, am Ende korrigiert', '{0} domande · {1} min · senza battute, corretto alla fine', '{0} perguntas · {1} min · sem piadas, corrigido no fim'],
    'Sujet tiré au sort, préparation puis exposé chronométrés, grille d’auto-évaluation':['Random topic, timed preparation and talk, self-assessment grid', 'Tema al azar, preparación y exposición cronometradas, rúbrica de autoevaluación', 'Zufälliges Thema, Vorbereitung und Vortrag mit Zeitmessung, Selbstbewertung', 'Tema estratto a sorte, preparazione ed esposizione cronometrate, griglia di autovalutazione', 'Tema sorteado, preparação e exposição cronometradas, grelha de autoavaliação'],
    'Dernière note : {0}/20':['Last mark: {0}/20', 'Última nota: {0}/20', 'Letzte Note: {0}/20', 'Ultimo voto: {0}/20', 'Última nota: {0}/20'],
    'Bilan de mon BFI blanc : {0}/20':['My mock BFI result: {0}/20', 'Balance de mi BFI de prueba: {0}/20', 'Ergebnis meines Probe-BFI: {0}/20', 'Bilancio del mio BFI di prova: {0}/20', 'Balanço do meu BFI simulado: {0}/20'],
    'Moyenne des trois épreuves, à titre indicatif (les coefficients officiels s’appliquent au vrai bac).':['Average of the three parts, for guidance only (official coefficients apply to the real exam).', 'Media de las tres pruebas, a título indicativo (los coeficientes oficiales se aplican al examen real).', 'Durchschnitt der drei Teile, nur zur Orientierung (im echten Abitur gelten die offiziellen Koeffizienten).', 'Media delle tre prove, a titolo indicativo (all’esame vero si applicano i coefficienti ufficiali).', 'Média das três provas, a título indicativo (no exame real aplicam-se os coeficientes oficiais).'],
    '🏫 Brevet option internationale blanc':['🏫 Mock brevet, international option', '🏫 Brevet opción internacional de prueba', '🏫 Probe-Brevet, internationale Option', '🏫 Brevet opzione internazionale di prova', '🏫 Brevet opção internacional simulado'],
    'Écrit (langue, littérature, histoire en anglais)':['Written (language, literature, history in English)', 'Escrito (lengua, literatura, historia en inglés)', 'Schriftlich (Sprache, Literatur, Geschichte auf Englisch)', 'Scritto (lingua, letteratura, storia in inglese)', 'Escrito (língua, literatura, história em inglês)'],
    'Oral en anglais':['Oral in English', 'Oral en inglés', 'Mündlich auf Englisch', 'Orale in inglese', 'Oral em inglês'],
    'S’entraîner chapitre par chapitre':['Practise chapter by chapter', 'Entrenar capítulo por capítulo', 'Kapitel für Kapitel üben', 'Allenarsi capitolo per capitolo', 'Treinar capítulo a capítulo'],
    '📅 Contrôles par trimestre':['📅 Termly tests', '📅 Controles por trimestre', '📅 Tests pro Trimester', '📅 Verifiche per trimestre', '📅 Testes por trimestre'],
    'Ton sujet':['Your topic', 'Tu tema', 'Dein Thema', 'Il tuo tema', 'O teu tema'],
    'Notions à mobiliser :':['Key ideas to use:', 'Nociones que usar:', 'Zu nutzende Begriffe:', 'Nozioni da usare:', 'Noções a mobilizar:'],
    'Plan possible :':['Possible outline:', 'Plan posible:', 'Möglicher Aufbau:', 'Piano possibile:', 'Plano possível:'],
    '⏱️ Préparation : {0} min':['⏱️ Preparation: {0} min', '⏱️ Preparación: {0} min', '⏱️ Vorbereitung: {0} Min.', '⏱️ Preparazione: {0} min', '⏱️ Preparação: {0} min'],
    '🎤 Commencer l’exposé ({0} min)':['🎤 Start the talk ({0} min)', '🎤 Empezar la exposición ({0} min)', '🎤 Vortrag beginnen ({0} Min.)', '🎤 Inizia l’esposizione ({0} min)', '🎤 Começar a exposição ({0} min)'],
    '✅ J’ai fini : je m’auto-évalue':['✅ I’ve finished: self-assessment', '✅ He terminado: me autoevalúo', '✅ Fertig: Selbstbewertung', '✅ Ho finito: mi autovaluto', '✅ Terminei: autoavaliação'],
    '🎲 Autre sujet':['🎲 Another topic', '🎲 Otro tema', '🎲 Anderes Thema', '🎲 Altro tema', '🎲 Outro tema'],
    'Parle à voix haute, debout si possible. Rien n’est enregistré.':['Speak out loud, standing if you can. Nothing is recorded.', 'Habla en voz alta, de pie si puedes. No se graba nada.', 'Sprich laut, möglichst im Stehen. Nichts wird aufgenommen.', 'Parla ad alta voce, in piedi se puoi. Non viene registrato nulla.', 'Fala em voz alta, de pé se puderes. Nada é gravado.'],
    'Auto-évaluation (0 à 4 par critère)':['Self-assessment (0 to 4 per criterion)', 'Autoevaluación (0 a 4 por criterio)', 'Selbstbewertung (0 bis 4 pro Kriterium)', 'Autovalutazione (da 0 a 4 per criterio)', 'Autoavaliação (0 a 4 por critério)'],
    'Enregistrer ma note':['Save my mark', 'Guardar mi nota', 'Note speichern', 'Salva il mio voto', 'Guardar a minha nota'],
    'Note de l’oral : {0}/20':['Oral mark: {0}/20', 'Nota del oral: {0}/20', 'Note der mündlichen Prüfung: {0}/20', 'Voto dell’orale: {0}/20', 'Nota do oral: {0}/20'],
    'Note : {0}/20':['Mark: {0}/20', 'Nota: {0}/20', 'Note: {0}/20', 'Voto: {0}/20', 'Nota: {0}/20'],
    'À revoir':['To review', 'Para repasar', 'Zum Wiederholen', 'Da ripassare', 'A rever'],
    'Ta réponse :':['Your answer:', 'Tu respuesta:', 'Deine Antwort:', 'La tua risposta:', 'A tua resposta:'],
    'Bonne réponse :':['Correct answer:', 'Respuesta correcta:', 'Richtige Antwort:', 'Risposta giusta:', 'Resposta certa:'],
    'Pas de réponse (temps écoulé).':['No answer (time is up).', 'Sin respuesta (se acabó el tiempo).', 'Keine Antwort (Zeit abgelaufen).', 'Nessuna risposta (tempo scaduto).', 'Sem resposta (o tempo acabou).'],
    'Retour aux examens':['Back to the exams', 'Volver a los exámenes', 'Zurück zu den Prüfungen', 'Torna agli esami', 'Voltar aos exames'],
    'Durées d’entraînement, à adapter à ce que demande ton professeur.':['Practice timings: adjust them to what your teacher asks.', 'Tiempos de entrenamiento: adáptalos a lo que pida tu profesor.', 'Übungszeiten: passe sie an die Vorgaben deiner Lehrkraft an.', 'Tempi di allenamento: adattali a ciò che chiede il tuo insegnante.', 'Tempos de treino: adapta-os ao que o teu professor pedir.'],
    '🏫 Mon lycée':['🏫 My school', '🏫 Mi instituto', '🏫 Meine Schule', '🏫 Il mio liceo', '🏫 A minha escola'],
    '— choisir —':['— choose —', '— elegir —', '— auswählen —', '— scegli —', '— escolher —'],
    'Mes six œuvres au programme':['My six set works', 'Mis seis obras del programa', 'Meine sechs Pflichtwerke', 'Le mie sei opere in programma', 'As minhas seis obras do programa'],
    'Les œuvres changent selon les lycées et les années : demande la liste à tes professeurs et note-la ici (gardée sur cet appareil).':['Set works vary by school and year: ask your teachers for the list and note it here (kept on this device).', 'Las obras cambian según el instituto y el año: pide la lista a tus profesores y anótala aquí (se guarda en este dispositivo).', 'Die Werke ändern sich je nach Schule und Jahr: Frag deine Lehrkräfte nach der Liste und notiere sie hier (auf diesem Gerät gespeichert).', 'Le opere cambiano secondo il liceo e l’anno: chiedi l’elenco ai tuoi insegnanti e annotalo qui (salvato su questo dispositivo).', 'As obras mudam conforme a escola e o ano: pede a lista aos teus professores e anota-a aqui (guardada neste dispositivo).'],
    'Écrit {0}':['Written {0}', 'Escrito {0}', 'Schriftlich {0}', 'Scritto {0}', 'Escrito {0}'],
    'Oral {0}':['Oral {0}', 'Oral {0}', 'Mündlich {0}', 'Orale {0}', 'Oral {0}'],
    'Sources officielles':['Official sources', 'Fuentes oficiales', 'Offizielle Quellen', 'Fonti ufficiali', 'Fontes oficiais']
  });

  // ── Le BFI en bref (d'après éduscol et education.gouv.fr) ──
  const BREF = [
    'Depuis la rentrée 2022, l’option internationale du baccalauréat (OIB) est devenue le baccalauréat français international (BFI).',
    'Enseignements spécifiques : approfondissement culturel et linguistique (littérature et culture, en langue de section), connaissance du monde (questions vives du monde, en langue de section) et une discipline non linguistique obligatoire (histoire-géographie ou enseignement scientifique).',
    'Approfondissement culturel et linguistique : six œuvres étudiées en 1re et terminale — trois pour l’écrit, trois pour l’oral. Évaluation écrite et orale, coefficient 20.',
    'Connaissance du monde : évaluation orale en langue de section, coefficient 20 ; l’exposé s’appuie sur un support préparé par le candidat.',
    'La DNL obligatoire donne lieu à une épreuve écrite et orale.',
    'Le reste du bac est celui de tous les élèves : français (épreuve anticipée), mathématiques (épreuve anticipée, nouvelle en 2026), philosophie, deux spécialités, Grand oral.'
  ];
  const SOURCES = [['Le baccalauréat français international (éduscol)', 'https://eduscol.education.gouv.fr/5286/le-baccalaureat-francais-international-bfi'],
    ['Le BFI (education.gouv.fr)', 'https://www.education.gouv.fr/reussir-au-lycee/le-baccalaureat-francais-international-bfi-5960'],
    ['Les sections internationales au lycée', 'https://www.education.gouv.fr/les-sections-internationales-au-lycee-2606']];

  // ── Les lycées cités (d'après leurs sites, l'ONISEP et education.gouv.fr). L'élève choisit le sien ; c'est indicatif. ──
  const LYCEES = {
    pissarro:{ nom:'Lycée Camille Pissarro (Pontoise)', faits:['Section internationale britannique, ouverte en 2014 (premiers bacheliers en 2017).', 'Prépare le baccalauréat français international (BFI), anglais britannique.', 'Entrée en seconde sur dossier et entretien oral.'],
      liens:[['Site du lycée', 'https://lyc-pissarro-pontoise.ac-versailles.fr/'], ['Fiche ONISEP', 'https://www.onisep.fr/ressources/structures-enseignement/ile-de-france/val-d-oise/lycee-camille-pissarro']] },
    palaiseau:{ nom:'Lycée international Palaiseau Paris-Saclay (LIPPS)', faits:['Lycée international ouvert en 2021, au cœur de Paris-Saclay.', 'Section internationale anglaise (seconde, puis BFI) ; aussi Bachibac et sections européennes.'],
      liens:[['Fiche ONISEP', 'https://www.onisep.fr/ressources/structures-enseignement/ile-de-france/essonne/lycee-international-palaiseau-paris-saclay']] },
    sgel:{ nom:'Lycée international de Saint-Germain-en-Laye', faits:['Plusieurs sections internationales, dont la section britannique (du collège au lycée).', 'Seconde internationale et BFI.'],
      liens:[['Section britannique', 'https://britishsection.fr/'], ['Les sections internationales au lycée', 'https://www.education.gouv.fr/les-sections-internationales-au-lycee-2606']] }
  };

  // ── Plan de A à Z (en anglais, comme en section) ──
  const PLAN = [
    ['1re · September', 'Get the list of the six ACL works and the DNL history-geography programme from your teachers.'],
    ['1re · September', 'Set up a reading log: one page per work (plot, characters, themes, key quotations, context).'],
    ['1re · Autumn', 'Read the first set texts closely; learn 10 short quotations per work, sorted by theme.'],
    ['1re · Autumn', 'Learn the essay method: thesis, topic sentences, evidence, analysis, counter-argument.'],
    ['1re · Autumn', 'DNL: build a vocabulary list for each history and geography chapter.'],
    ['1re · Winter', 'Write one timed essay a month and correct it with your teacher’s comments.'],
    ['1re · Winter', 'Practise commentaries: close reading of an extract in 1 hour.'],
    ['1re · Spring', 'Start a Connaissance du monde file: follow two global issues in quality news sources.'],
    ['1re · Spring', 'Practise a 10-minute talk with a timer once a week (use the mock oral here).'],
    ['1re · June', 'Sit a full mock BFI here (ACL written, DNL, oral) and note your weak points.'],
    ['Summer', 'Read ahead: start the Terminale works; keep reading in English every day.'],
    ['Tle · September', 'Confirm the works for the written and oral exams; plan your revision calendar.'],
    ['Tle · Autumn', 'Revise 1re works with your reading log; add comparative links between works.'],
    ['Tle · Autumn', 'Choose and refine your Connaissance du monde topic and research question.'],
    ['Tle · Autumn', 'Prepare a clear visual support (few words, sources cited).'],
    ['Tle · Winter', 'DNL: practise document analysis (present, explain, assess limits).'],
    ['Tle · Winter', 'Take the termly tests here and revise every red chapter.'],
    ['Tle · Winter', 'Write two full timed essays and one commentary per month.'],
    ['Tle · Spring', 'Rehearse your oral in front of someone; ask them questions like a jury.'],
    ['Tle · Spring', 'Revise key quotations with the daily review (missed questions come back).'],
    ['Tle · May', 'Sit a second full mock BFI here; compare with your first result.'],
    ['Tle · May', 'Check the official exam dates and practical rules on the ministry websites.'],
    ['Tle · June', 'Light revision only the day before: sleep, plan, and trust your preparation.'],
    ['Results', 'Celebrate — and add the BFI to your university applications (UK, US, Europe).']
  ];

  // ── Sujets d'oral de connaissance du monde (questions vives) ──
  const SUJETS = [
    ['Is globalisation reducing or increasing inequality?', ['globalisation', 'inequality between and within countries', 'trade', 'emerging economies'], ['Gains: growth, poverty reduction', 'Losses: deindustrialisation, gaps within countries', 'Judgement and policies']],
    ['Should social media platforms be regulated more strictly?', ['freedom of expression', 'misinformation', 'privacy', 'young users'], ['Why regulation is called for', 'Risks for freedom and innovation', 'Possible balanced solutions']],
    ['Can the Paris Agreement goals still be reached?', ['1.5 °C and 2 °C targets', 'emissions', 'energy transition', 'international cooperation'], ['What the agreement requires', 'Progress and obstacles', 'Conditions for success']],
    ['Water: a source of conflict or of cooperation?', ['water stress', 'shared rivers', 'agriculture', 'climate change'], ['Rising pressure on water', 'Tensions over shared rivers', 'Examples of cooperation']],
    ['Is space the new frontier of geopolitics?', ['space powers', 'satellites', 'private companies', 'international law'], ['New players in space', 'Rivalries and cooperation', 'Governing space']],
    ['Should cities be the main actors of the ecological transition?', ['metropolises', 'sustainable cities', 'transport', 'local and national powers'], ['What cities can do', 'Limits of local action', 'Working together across levels']],
    ['Has the internet made the world more democratic?', ['access to information', 'activism', 'surveillance', 'digital divide'], ['New voices and movements', 'Control and division', 'Assessment']],
    ['Is English becoming a global language at the expense of others?', ['lingua franca', 'linguistic diversity', 'cultural soft power', 'translation'], ['Why English spreads', 'Threats to diversity', 'Plurilingual futures']],
    ['How should societies respond to an ageing population?', ['demographic transition', 'pensions', 'health care', 'migration'], ['Causes and scale', 'Economic and social challenges', 'Possible responses']],
    ['Should rich countries welcome more migrants?', ['migration flows', 'labour shortages', 'integration', 'human rights'], ['Reasons for and against', 'The role of integration policies', 'Nuanced judgement']],
    ['Can artificial intelligence be governed?', ['innovation', 'ethics', 'employment', 'regulation'], ['Opportunities', 'Risks', 'Who should set the rules?']],
    ['Are the oceans the last frontier of globalisation?', ['shipping routes', 'exclusive economic zones', 'resources', 'pollution'], ['Oceans at the heart of trade', 'Competition for resources', 'Protecting the oceans']],
    ['Is tourism good for the places that receive it?', ['mass tourism', 'local economy', 'heritage', 'sustainability'], ['Economic benefits', 'Social and environmental costs', 'Sustainable tourism']],
    ['Does sport bring nations together?', ['major events', 'soft power', 'national identity', 'diplomacy'], ['Sport as a meeting point', 'Sport as rivalry and image', 'Assessment']],
    ['Is access to health care a global public good?', ['pandemics', 'vaccines', 'inequality', 'international organisations'], ['Health without borders', 'Unequal access', 'Global cooperation']],
    ['Can renewable energy replace fossil fuels?', ['energy mix', 'storage', 'critical minerals', 'costs'], ['Rapid growth of renewables', 'Technical and economic limits', 'A realistic transition']]
  ];
  const CRITERES = ['Content and knowledge', 'Structure and research question', 'Accuracy of language', 'Fluency and pronunciation', 'Interaction with the jury'];

  // ── Épreuves écrites blanches : chapitres et format ──
  const ECRITS = {
    acl:{ titre:'Écrit d’approfondissement culturel et linguistique', chaps:['bfi-1re', 'bfi-tle', 'methode-1re'], niv:'Tle', n:30, minutes:60 },
    dnl:{ titre:'DNL histoire-géographie', chaps:['dnl-1re', 'dnl-tle', 'methode-tle'], niv:'Tle', n:20, minutes:40 },
    dnb:{ titre:'Écrit (langue, littérature, histoire en anglais)', chaps:['si-3e', 'dnl-3e', 'methode-3e'], niv:'3e', n:30, minutes:45 }
  };

  const etat = () => { const j = api().J(), o = j.si && typeof j.si === 'object' ? j.si : {}, r = { notes:{}, plan:[] };
    for(const k of ['acl', 'dnl', 'cdm', 'dnb', 'dnbOral']) if(Number.isFinite(+(o.notes || {})[k])) r.notes[k] = Math.max(0, Math.min(20, Math.round(+o.notes[k] * 10) / 10));
    if(Array.isArray(o.plan)) r.plan = [...new Set(o.plan.filter(i => Number.isInteger(i) && i >= 0 && i < PLAN.length))];
    if(LYCEES[o.lycee]) r.lycee = o.lycee;
    r.oeuvres = [0, 1, 2, 3, 4, 5].map(i => typeof (o.oeuvres || [])[i] === 'string' ? o.oeuvres[i].replace(/[<>]/g, '').slice(0, 120) : '');
    j.si = r; return r; };
  const virg = n => String(n).replace('.', ',');

  M.cartes['matiere-ecran'].push(() => api().etatMatieres().derniere === ID ? '<div class="cartes-anglais">' + M.carte('si-examens', '', '🎓', api().esc(tx('🎓 Examens de la section internationale')).replace(/^🎓 /, ''), api().esc(tx('Brevet option internationale, BFI 2026 de A à Z, BFI blanc, contrôles'))) + '</div>' : '');

  function hub(){
    const A = api(), esc = A.esc, e = etat(), MT = window.MATIERES, m = MT && MT.trouver(ID); if(!m) return A.matieresAccueil();
    const note = k => e.notes[k] != null ? ' · ' + esc(tx('Dernière note : {0}/20', virg(e.notes[k]))) : '';
    const ecrit = (k, a) => { const x = ECRITS[k]; return '<button class="carte-anglais" data-a="' + a + '" data-v="' + k + '"><span class="ic">📝</span><strong>' + esc(tx(x.titre)) + '</strong><small>' + esc(tx('{0} questions · {1} min · sans vanne, corrigé à la fin', x.n, x.minutes)) + note(k) + '</small></button>'; };
    const oral = (k, titre) => '<button class="carte-anglais" data-a="si-oral" data-v="' + k + '"><span class="ic">🎤</span><strong>' + esc(tx(titre)) + '</strong><small>' + esc(tx('Sujet tiré au sort, préparation puis exposé chronométrés, grille d’auto-évaluation')) + note(k === 'cdm' ? 'cdm' : 'dnbOral') + '</small></button>';
    const bfiFait = ['acl', 'dnl', 'cdm'].filter(k => e.notes[k] != null);
    const fait = new Set(e.plan);
    const chaps = l => '<div class="liste-chap">' + m.chapitres.filter(c => c.niv.some(n => l.includes(n))).map(c => '<button class="chap" data-a="matiere-chap" data-v="' + esc(ID + '|' + c.id) + '"><span lang="en">' + esc(MT.nomChap(m, c)) + '</span><em>▶</em></button>').join('') + '</div>';
    A.poser(A.barre('matieres') + '<main class="coin-anglais coin-maths si-examens"><h2>' + esc(tx('🎓 Examens de la section internationale')) + '</h2>' +
      '<section class="domaine"><h3>' + esc(tx('Le BFI en bref')) + '</h3><ul>' + BREF.map(x => '<li>' + esc(x) + '</li>').join('') + '</ul><p class="petit">' + esc(tx('Sources officielles')) + ' : ' +
        SOURCES.map(([t, u]) => '<a href="' + esc(u) + '" target="_blank" rel="noopener noreferrer">' + esc(t) + '</a>').join(' · ') + '</p></section>' +
      '<section class="domaine si-lycee"><h3>' + esc(tx('🏫 Mon lycée')) + '</h3><p><select id="si-lycee"><option value="">' + esc(tx('— choisir —')) + '</option>' +
        Object.entries(LYCEES).map(([k, l]) => '<option value="' + k + '"' + (e.lycee === k ? ' selected' : '') + '>' + esc(l.nom) + '</option>').join('') + '</select></p>' +
        (e.lycee ? '<ul>' + LYCEES[e.lycee].faits.map(f => '<li>' + esc(f) + '</li>').join('') + '</ul><p class="petit">' + LYCEES[e.lycee].liens.map(([t, u]) => '<a href="' + esc(u) + '" target="_blank" rel="noopener noreferrer">' + esc(t) + '</a>').join(' · ') + '</p>' : '') +
        '<h4>' + esc(tx('Mes six œuvres au programme')) + '</h4><p class="petit">' + esc(tx('Les œuvres changent selon les lycées et les années : demande la liste à tes professeurs et note-la ici (gardée sur cet appareil).')) + '</p>' +
        '<div class="si-oeuvres">' + e.oeuvres.map((t, i) => '<label>' + esc(tx(i < 3 ? 'Écrit {0}' : 'Oral {0}', (i % 3) + 1)) + ' <input type="text" maxlength="120" data-si-oeuvre="' + i + '" value="' + esc(t) + '" lang="en"></label>').join('') + '</div></section>' +
      '<section class="domaine"><h3>' + esc(tx('📝 BFI blanc')) + '</h3><div class="cartes-anglais">' + ecrit('acl', 'si-ecrit') + ecrit('dnl', 'si-ecrit') + oral('cdm', 'Oral de connaissance du monde') + '</div>' +
        (bfiFait.length === 3 ? '<p class="gros-score">' + esc(tx('Bilan de mon BFI blanc : {0}/20', virg(Math.round(bfiFait.reduce((t, k) => t + e.notes[k], 0) / 3 * 10) / 10))) + '</p><p class="petit">' + esc(tx('Moyenne des trois épreuves, à titre indicatif (les coefficients officiels s’appliquent au vrai bac).')) + '</p>' : '') + '</section>' +
      '<section class="domaine"><h3>' + esc(tx('Mon plan de préparation, de A à Z')) + ' <small>· ' + esc(tx('{0} étapes sur {1}', fait.size, PLAN.length)) + '</small></h3>' +
        '<progress max="' + PLAN.length + '" value="' + fait.size + '"></progress><ol class="si-plan">' + PLAN.map(([q, t], i) => '<li><label><input type="checkbox" data-si-plan="' + i + '"' + (fait.has(i) ? ' checked' : '') + '> <strong lang="en">' + esc(q) + '</strong> — <span lang="en">' + esc(t) + '</span></label></li>').join('') + '</ol></section>' +
      '<section class="domaine"><h3>' + esc(tx('🏫 Brevet option internationale blanc')) + '</h3><div class="cartes-anglais">' + ecrit('dnb', 'si-ecrit') + oral('dnb', 'Oral en anglais') + '</div></section>' +
      '<section class="domaine"><h3>' + esc(tx('S’entraîner chapitre par chapitre')) + '</h3>' + chaps(['1re', 'Tle']) + chaps(['3e', '2nde']) + chaps(['6e', '5e', '4e']) +
        '<div class="actions serrees"><button class="moyen" data-a="mat-tri" data-v="' + ID + '">' + esc(tx('📅 Contrôles par trimestre')) + '</button></div></section></main>');
  }
  document.addEventListener('change', ev => { const t = ev.target; if(!t) return;
    if(t.id === 'si-lycee'){ const e = etat(); e.lycee = LYCEES[t.value] ? t.value : undefined; api().J().si = e; api().garder(); return hub(); }
    if(t.dataset && t.dataset.siOeuvre != null){ const e = etat(); e.oeuvres[+t.dataset.siOeuvre] = String(t.value).replace(/[<>]/g, '').slice(0, 120); api().J().si = e; api().garder(); } });
  document.addEventListener('change', ev => { const t = ev.target; if(!t || !t.dataset || t.dataset.siPlan == null) return;
    const e = etat(), i = +t.dataset.siPlan; e.plan = t.checked ? [...new Set(e.plan.concat(i))] : e.plan.filter(x => x !== i); api().J().si = e; api().garder();
    const p = document.querySelector('.si-examens progress'); if(p) p.value = e.plan.length; });

  function ecrit(k){
    const A = api(), x = ECRITS[k], MT = window.MATIERES; if(!x || !MT) return hub();
    const l = MT.serieParts(ID, x.chaps.map(ch => ({ ch })), x.niv, x.n, Math.floor(Math.random() * 1e9), 'taquin'); if(!l.length) return hub();
    A.questionsGo(l, { titre:'📝 ' + tx(x.titre), retour:'matieres', lang:'en', sujet:ID, finA:Date.now() + x.minutes * 60000, sansVanne:true, fin:z => finEcrit(k, z) });
  }
  function finEcrit(k, z){
    const A = api(), esc = A.esc, x = ECRITS[k], n = z.liste.length, note = Math.round(20 * z.bonnes / Math.max(1, n) * 10) / 10, e = etat();
    e.notes[k] = note; A.J().si = e; A.garder();
    const err = (z.reponses || []).filter(r => !r.juste), sans = z.liste.slice(z.i);
    const item = (q, l2) => '<li><p lang="en">' + esc(q.enonce) + '</p>' + l2 + '<p>✅ ' + esc(tx('Bonne réponse :')) + ' <span lang="en">' + esc(q.bon) + '</span></p>' + (q.regle ? '<p class="petit" lang="en">💡 ' + esc(q.regle) + '</p>' : '') + '</li>';
    A.poser(A.barre('matieres') + '<main class="centre trimestre-fin si-fin"><h2>' + esc('📝 ' + tx(x.titre)) + '</h2><p class="gros-score">' + esc(tx('Note : {0}/20', virg(note))) + '</p>' +
      (err.length || sans.length ? '<h3>' + esc(tx('À revoir')) + '</h3><ol class="correction-controle">' + err.map(r => item(r.q, '<p>❌ ' + esc(tx('Ta réponse :')) + ' <span lang="en">' + esc(r.choix) + '</span></p>')).join('') + sans.map(q => item(q, '<p>⏱️ ' + esc(tx('Pas de réponse (temps écoulé).')) + '</p>')).join('') + '</ol>' : '') +
      '<div class="actions serrees"><button class="moyen plein" data-a="si-examens">' + esc(tx('Retour aux examens')) + '</button></div></main>');
  }

  // ── Oral blanc : sujet, préparation, exposé, auto-évaluation ──
  let oralCourant = null, chronoFin = 0;
  const ORAUX = { cdm:{ prep:30, expose:10 }, dnb:{ prep:10, expose:5 } };
  function oral(k, i){
    const A = api(), esc = A.esc, o = ORAUX[k] || ORAUX.cdm, n = Number.isInteger(i) ? i : Math.floor(Math.random() * SUJETS.length), s = SUJETS[n % SUJETS.length];
    oralCourant = { k, n:n % SUJETS.length }; chronoFin = Date.now() + o.prep * 60000;
    A.poser(A.barre('matieres') + '<main class="coin-anglais si-oral"><h2>🎤 ' + esc(tx(k === 'cdm' ? 'Oral de connaissance du monde' : 'Oral en anglais')) + '</h2>' +
      '<section class="domaine"><h3>' + esc(tx('Ton sujet')) + '</h3><p class="gros-score" lang="en">' + esc(s[0]) + '</p>' +
        '<p><strong>' + esc(tx('Notions à mobiliser :')) + '</strong> <span lang="en">' + esc(s[1].join(' · ')) + '</span></p>' +
        '<p><strong>' + esc(tx('Plan possible :')) + '</strong></p><ol lang="en">' + s[2].map(p => '<li>' + esc(p) + '</li>').join('') + '</ol></section>' +
      '<p class="chrono-veille" id="si-chrono" role="timer">' + esc(tx('⏱️ Préparation : {0} min', o.prep)) + '</p><p class="petit">' + esc(tx('Parle à voix haute, debout si possible. Rien n’est enregistré.')) + ' ' + esc(tx('Durées d’entraînement, à adapter à ce que demande ton professeur.')) + '</p>' +
      '<div class="actions serrees"><button class="moyen plein" data-a="si-expose">' + esc(tx('🎤 Commencer l’exposé ({0} min)', o.expose)) + '</button><button class="moyen" data-a="si-grille">' + esc(tx('✅ J’ai fini : je m’auto-évalue')) + '</button><button class="moyen" data-a="si-oral" data-v="' + k + '">' + esc(tx('🎲 Autre sujet')) + '</button></div></main>');
  }
  setInterval(() => { const c = document.getElementById('si-chrono'); if(!c || !chronoFin) return; const r = Math.max(0, Math.ceil((chronoFin - Date.now()) / 1000)); c.textContent = '⏱️ ' + Math.floor(r / 60) + ':' + String(r % 60).padStart(2, '0'); }, 1000);
  function grille(){
    const A = api(), esc = A.esc; if(!oralCourant) return hub(); chronoFin = 0;
    A.poser(A.barre('matieres') + '<main class="coin-anglais si-oral"><h2>' + esc(tx('Auto-évaluation (0 à 4 par critère)')) + '</h2><p lang="en">' + esc(SUJETS[oralCourant.n][0]) + '</p>' +
      '<form class="si-grille">' + CRITERES.map((c, i) => '<fieldset><legend lang="en">' + esc(c) + '</legend>' + [0, 1, 2, 3, 4].map(v => '<label><input type="radio" name="si-c' + i + '" value="' + v + '"' + (v === 2 ? ' checked' : '') + '> ' + v + '</label>').join(' ') + '</fieldset>').join('') + '</form>' +
      '<div class="actions serrees"><button class="moyen plein" data-a="si-noter">' + esc(tx('Enregistrer ma note')) + '</button></div></main>');
  }
  function noter(){
    const A = api(), esc = A.esc; if(!oralCourant) return hub();
    let t = 0; CRITERES.forEach((c, i) => { const r = document.querySelector('input[name="si-c' + i + '"]:checked'); t += r ? Math.max(0, Math.min(4, +r.value)) : 0; });
    const e = etat(), k = oralCourant.k === 'cdm' ? 'cdm' : 'dnbOral'; e.notes[k] = t; A.J().si = e; A.garder(); oralCourant = null;
    A.poser(A.barre('matieres') + '<main class="centre si-fin"><h2>' + esc(tx('Note de l’oral : {0}/20', t)) + '</h2><div class="actions serrees"><button class="moyen plein" data-a="si-examens">' + esc(tx('Retour aux examens')) + '</button></div></main>');
  }

  Object.assign(M.actions, {
    'si-examens':() => hub(),
    'si-ecrit':v => ecrit(v),
    'si-oral':v => oral(v === 'dnb' ? 'dnb' : 'cdm'),
    'si-expose':() => { const o = ORAUX[oralCourant && oralCourant.k] || ORAUX.cdm; chronoFin = Date.now() + o.expose * 60000; const c = document.getElementById('si-chrono'); if(c) c.textContent = '⏱️ ' + o.expose + ':00'; },
    'si-grille':() => grille(),
    'si-noter':() => noter()
  });
  window.AMI_SECTION_INTER = { PLAN, SUJETS, CRITERES, ECRITS, LYCEES, etat, oral };
})();
