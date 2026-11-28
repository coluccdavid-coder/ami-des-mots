// Ami des mots — v8.2 : ⚖️ DEVENIR AVOCAT, sur l'écran de la matière Droit (comme l'espace IFSI en Médecine).
// • Un CRFPA blanc (40 questions, 60 min) : chronométré, sans vanne pendant l'épreuve, corrigé à la fin avec la note sur 20.
//   Il mêle les leçons « Devenir avocat » et les matières des écrits (obligations, procédure, pénal, libertés).
// • Une révision avec les vannes de Plumo (les erreurs vont dans le carnet).
// • Un grand oral blanc : un sujet tiré sur les libertés et droits fondamentaux, 1 h de préparation chronométrée,
// • Les textes officiels (adresses vérifiées sur le site du Conseil national des barreaux).
// Contenu éducatif : il ne remplace ni la préparation à l'examen, ni l'école d'avocats, ni le conseil d'un avocat.
(function(){
  'use strict';
  const M = window.AMI_MODULES; if(!M) return;
  const api = () => M.api, tx = (...a) => M.tx(...a);
  if(!M.cartes['matiere-ecran']) M.cartes['matiere-ecran'] = [];
  M.textes({
    '⚖️ Devenir avocat':['⚖️ Becoming a lawyer (France)', '⚖️ Ser abogado en Francia', '⚖️ Anwalt werden (Frankreich)', '⚖️ Diventare avvocato (Francia)', '⚖️ Ser advogado (França)'],
    'CRFPA blanc, grand oral, déontologie, pratique du métier et textes officiels':['Mock CRFPA, grand oral, ethics, practice and official texts', 'CRFPA de prueba, gran oral, deontología, práctica y textos oficiales', 'CRFPA-Probeprüfung, Grand Oral, Berufsethik, Praxis und amtliche Texte', 'CRFPA di prova, grande orale, deontologia, pratica e testi ufficiali', 'CRFPA simulado, grande oral, deontologia, prática e textos oficiais'],
    'Master 1 pour l’examen d’entrée au CRFPA, au moins 18 mois d’école, master 2 exigé pour le CAPA depuis le 1er janvier 2025, puis le serment devant la cour d’appel.':['Master 1 for the CRFPA entrance exam, at least 18 months of law school, master 2 required for the CAPA since 1 January 2025, then the oath before the court of appeal.', 'Máster 1 para el examen de ingreso en el CRFPA, al menos 18 meses de escuela, máster 2 exigido para el CAPA desde el 1 de enero de 2025 y luego el juramento ante el tribunal de apelación.', 'Master 1 für die CRFPA-Aufnahmeprüfung, mindestens 18 Monate Anwaltsschule, seit dem 1. Januar 2025 Master 2 für das CAPA, dann der Eid vor dem Berufungsgericht.', 'Master 1 per l’esame di ammissione al CRFPA, almeno 18 mesi di scuola, master 2 richiesto per il CAPA dal 1° gennaio 2025, poi il giuramento davanti alla corte d’appello.', 'Mestrado 1 para o exame de acesso ao CRFPA, pelo menos 18 meses de escola, mestrado 2 exigido para o CAPA desde 1 de janeiro de 2025 e depois o juramento perante o tribunal de recurso.'],
    '📝 CRFPA blanc':['📝 Mock CRFPA', '📝 CRFPA de prueba', '📝 CRFPA-Probeprüfung', '📝 CRFPA di prova', '📝 CRFPA simulado'],
    '🔁 Révision : devenir avocat':['🔁 Revision: becoming a lawyer', '🔁 Repaso: ser abogado', '🔁 Wiederholung: Anwalt werden', '🔁 Ripasso: diventare avvocato', '🔁 Revisão: ser advogado'],
    '20 questions mélangées, avec les vannes de Plumo ; les erreurs vont dans le carnet':['20 mixed questions, with Plumo’s teasing; mistakes go into the notebook', '20 preguntas mezcladas, con las bromas de Plumo; los errores van al cuaderno', '20 gemischte Fragen mit Plumos Sprüchen; Fehler kommen ins Heft', '20 domande miste, con le battute di Plumo; gli errori vanno nel quaderno', '20 perguntas misturadas, com as piadas do Plumo; os erros vão para o caderno'],
    '{0} questions · {1} min · chronométré, sans vanne, corrigé à la fin':['{0} questions · {1} min · timed, no teasing, corrected at the end', '{0} preguntas · {1} min · cronometrado, sin bromas, corregido al final', '{0} Fragen · {1} Min. · mit Zeit, ohne Sprüche, am Ende korrigiert', '{0} domande · {1} min · cronometrato, senza battute, corretto alla fine', '{0} perguntas · {1} min · cronometrado, sem piadas, corrigido no fim'],
    '🎤 Grand oral blanc':['🎤 Mock grand oral', '🎤 Gran oral de prueba', '🎤 Grand-Oral-Probe', '🎤 Grande orale di prova', '🎤 Grande oral simulado'],
    'Un sujet sur les libertés et droits fondamentaux, 1 h de préparation, la méthode de l’exposé':['A topic on fundamental rights and freedoms, 1 hour of preparation, the method for the talk', 'Un tema sobre libertades y derechos fundamentales, 1 h de preparación, el método de la exposición', 'Ein Thema zu Grundrechten und Grundfreiheiten, 1 Std. Vorbereitung, die Methode des Vortrags', 'Un tema su libertà e diritti fondamentali, 1 h di preparazione, il metodo dell’esposizione', 'Um tema sobre liberdades e direitos fundamentais, 1 h de preparação, o método da exposição'],
    'Ton sujet':['Your topic', 'Tu tema', 'Dein Thema', 'Il tuo tema', 'O teu tema'],
    '⏱️ Préparation : il reste {0} min.':['⏱️ Preparation: {0} min left.', '⏱️ Preparación: quedan {0} min.', '⏱️ Vorbereitung: noch {0} Min.', '⏱️ Preparazione: restano {0} min.', '⏱️ Preparação: faltam {0} min.'],
    '⏱️ La préparation est terminée : place à l’exposé de 15 minutes.':['⏱️ Preparation time is over: time for the 15-minute talk.', '⏱️ Se acabó la preparación: llega la exposición de 15 minutos.', '⏱️ Die Vorbereitung ist vorbei: Jetzt kommt der 15-minütige Vortrag.', '⏱️ La preparazione è finita: tocca all’esposizione di 15 minuti.', '⏱️ A preparação acabou: chegou a exposição de 15 minutos.'],
    'La méthode':['The method', 'El método', 'Die Methode', 'Il metodo', 'O método'],
    'Les questions que le jury pourrait te poser':['Questions the jury might ask you', 'Preguntas que el tribunal podría hacerte', 'Fragen, die dir die Jury stellen könnte', 'Domande che la commissione potrebbe farti', 'Perguntas que o júri te poderia fazer'],
    '🎲 Un autre sujet':['🎲 Another topic', '🎲 Otro tema', '🎲 Ein anderes Thema', '🎲 Un altro tema', '🎲 Outro tema'],
    '📜 Textes officiels':['📜 Official texts', '📜 Textos oficiales', '📜 Amtliche Texte', '📜 Testi ufficiali', '📜 Textos oficiais'],
    'Note : {0}/20':['Mark: {0}/20', 'Nota: {0}/20', 'Note: {0}/20', 'Voto: {0}/20', 'Nota: {0}/20'],
    '{0} bonnes réponses sur {1}':['{0} correct answers out of {1}', '{0} respuestas correctas de {1}', '{0} richtige Antworten von {1}', '{0} risposte giuste su {1}', '{0} respostas certas em {1}'],
    'À revoir':['To review', 'Para repasar', 'Zum Wiederholen', 'Da ripassare', 'A rever'],
    'Bonne réponse :':['Correct answer:', 'Respuesta correcta:', 'Richtige Antwort:', 'Risposta giusta:', 'Resposta certa:'],
    'Ta réponse :':['Your answer:', 'Tu respuesta:', 'Deine Antwort:', 'La tua risposta:', 'A tua resposta:'],
    'Pas de réponse (temps écoulé).':['No answer (time is up).', 'Sin respuesta (se acabó el tiempo).', 'Keine Antwort (Zeit abgelaufen).', 'Nessuna risposta (tempo scaduto).', 'Sem resposta (o tempo acabou).'],
    '🔁 Recommencer':['🔁 Try again', '🔁 Volver a empezar', '🔁 Noch einmal', '🔁 Ricomincia', '🔁 Recomeçar'],
    '📄 Note de synthèse blanche':['📄 Mock synthesis note', '📄 Nota de síntesis de prueba', '📄 Probe-Synthesenote', '📄 Nota di sintesi di prova', '📄 Nota de síntese simulada'],
    'Un dossier court à synthétiser, sans donner ton avis, en deux parties ; corrigé dans « Mes copies »':['A short file to summarise, without giving your opinion, in two parts; marked in “My papers”', 'Un expediente breve que sintetizar, sin dar tu opinión, en dos partes; corregido en «Mis ejercicios»', 'Eine kurze Akte zusammenfassen, ohne eigene Meinung, in zwei Teilen; korrigiert in „Meine Arbeiten“', 'Un fascicolo breve da sintetizzare, senza dare la tua opinione, in due parti; corretto in «I miei elaborati»', 'Um dossiê curto para sintetizar, sem dar a tua opinião, em duas partes; corrigido em «As minhas provas»'],
    'Au CRFPA, la note de synthèse dure 5 heures (coefficient 3) et porte sur un dossier d’une trentaine de documents, à résumer en quatre pages au plus. Ici, un dossier court pour s’entraîner à la méthode.':['At the CRFPA, the synthesis note lasts 5 hours (coefficient 3) and covers a file of about thirty documents, to be summarised in four pages at most. Here, a short file to practise the method.', 'En el CRFPA, la nota de síntesis dura 5 horas (coeficiente 3) y versa sobre un expediente de unos treinta documentos, que se resume en cuatro páginas como máximo. Aquí, un expediente breve para practicar el método.', 'Beim CRFPA dauert die Synthesenote 5 Stunden (Koeffizient 3) und betrifft eine Akte von etwa dreißig Dokumenten, die auf höchstens vier Seiten zusammenzufassen ist. Hier eine kurze Akte, um die Methode zu üben.', 'Al CRFPA la nota di sintesi dura 5 ore (coefficiente 3) e riguarda un fascicolo di una trentina di documenti, da riassumere in quattro pagine al massimo. Qui un fascicolo breve per esercitarsi nel metodo.', 'No CRFPA, a nota de síntese dura 5 horas (coeficiente 3) e incide sobre um dossiê de cerca de trinta documentos, a resumir em quatro páginas no máximo. Aqui, um dossiê curto para treinar o método.'],
    'Les documents sont des résumés pédagogiques de textes réels (lois, décisions), pas des citations.':['The documents are teaching summaries of real texts (laws, decisions), not quotations.', 'Los documentos son resúmenes pedagógicos de textos reales (leyes, resoluciones), no citas.', 'Die Dokumente sind didaktische Zusammenfassungen echter Texte (Gesetze, Entscheidungen), keine Zitate.', 'I documenti sono riassunti didattici di testi reali (leggi, decisioni), non citazioni.', 'Os documentos são resumos pedagógicos de textos reais (leis, decisões), não citações.'],
    'Contenu éducatif : il ne remplace ni la préparation à l’examen, ni l’école d’avocats, ni le conseil d’un avocat.':['Educational content: it replaces neither exam preparation, nor law school, nor a lawyer’s advice.', 'Contenido educativo: no sustituye ni la preparación del examen, ni la escuela de abogados, ni el consejo de un abogado.', 'Lerninhalt: Er ersetzt weder die Prüfungsvorbereitung noch die Anwaltsschule noch den Rat eines Anwalts.', 'Contenuto educativo: non sostituisce né la preparazione all’esame, né la scuola per avvocati, né il consiglio di un avvocato.', 'Conteúdo educativo: não substitui nem a preparação para o exame, nem a escola de advogados, nem o conselho de um advogado.']
  });

  // Sites officiels (adresses vérifiées sur le site du Conseil national des barreaux).
  const OFFICIEL = [
    ['Examen d’accès au CRFPA 2026 : toutes les informations utiles (CNB)', 'https://cnb.avocat.fr/examen-d-acces-au-crfpa-2026-toutes-les-informations-utiles', 'Épreuves, dates, ressources de la Commission nationale de l’examen.'],
    ['Toutes les conditions d’accès à la profession (CNB)', 'https://www.cnb.avocat.fr/fr/toutes-les-conditions-dacces-la-profession', 'Diplômes, examen d’accès, formation de 18 mois, CAPA.'],
    ['Accès à la profession : les changements pour 2025 (CNB)', 'https://www.cnb.avocat.fr/fr/foire-aux-questions-acces-la-profession-les-changements-pour-2025', 'Le master 2 exigé pour le CAPA depuis le 1er janvier 2025.']
  ];

  // Grand oral : sujets sur la protection des libertés et des droits fondamentaux (sujets d'entraînement).
  const SUJETS_GO = [
    ['La liberté d’expression a-t-elle des limites ?', ['Où passe la frontière entre critique et diffamation ?', 'Les réseaux sociaux doivent-ils retirer eux-mêmes les contenus haineux ?', 'Quel rôle joue la Cour européenne des droits de l’homme ?']],
    ['La présomption d’innocence à l’heure des réseaux sociaux', ['Que dit l’article 9 de la Déclaration de 1789 ?', 'Un journaliste peut-il nommer un suspect ?', 'Quel recours a la personne présentée comme coupable ?']],
    ['Le droit au respect de la vie privée face aux technologies de surveillance', ['La vidéoprotection algorithmique est-elle compatible avec la vie privée ?', 'Quel est le rôle de la CNIL ?', 'Que protège le RGPD ?']],
    ['La liberté de manifester', ['Faut-il déclarer une manifestation ?', 'Qui peut l’interdire, et sous quel contrôle ?', 'Que se passe-t-il en cas de violences pendant le cortège ?']],
    ['Le principe d’égalité', ['L’égalité interdit-elle toute différence de traitement ?', 'Qu’est-ce qu’une discrimination indirecte ?', 'Les quotas sont-ils compatibles avec l’égalité ?']],
    ['La laïcité', ['Que dit la loi du 9 décembre 1905 ?', 'Un usager du service public doit-il être neutre ?', 'Que prévoit la loi du 15 mars 2004 à l’école ?']],
    ['Le droit à un procès équitable', ['Que garantit l’article 6 de la Convention européenne des droits de l’homme ?', 'Qu’est-ce que le délai raisonnable ?', 'Pourquoi les droits de la défense sont-ils essentiels ?']],
    ['La garde à vue et les droits de la défense', ['À quel moment l’avocat intervient-il ?', 'Que se passe-t-il si un droit n’a pas été notifié ?', 'Le droit de se taire peut-il être retenu contre la personne ?']],
    ['La protection des données personnelles', ['Qu’est-ce qu’une donnée personnelle ?', 'Qu’est-ce que le droit à l’oubli ?', 'Quelles sanctions la CNIL peut-elle prononcer ?']],
    ['La liberté d’aller et venir', ['Un confinement est-il compatible avec cette liberté ?', 'Qui contrôle les restrictions décidées par l’administration ?', 'Quelle différence avec la liberté individuelle ?']],
    ['Le droit d’asile', ['Qui décide d’accorder le statut de réfugié en France ?', 'Que signifie le principe de non-refoulement ?', 'Quel juge contrôle les refus ?']],
    ['La dignité de la personne humaine', ['Est-ce un droit ou un principe ?', 'La dignité peut-elle limiter la liberté de la personne elle-même ?', 'Quel lien avec les conditions de détention ?']]
  ];
  const METHODE = [
    'Accroche : un fait d’actualité, une décision de justice ou une citation qui montre l’enjeu.',
    'Définis les termes du sujet et situe-le dans les textes (Déclaration de 1789, Constitution, Convention européenne des droits de l’homme).',
    'Pose une problématique claire : la question juridique que soulève le sujet.',
    'Annonce un plan en deux parties (et deux sous-parties) : c’est la tradition des oraux de droit.',
    'Appuie chaque idée sur une source précise : un article, une décision du Conseil constitutionnel, du Conseil d’État, de la Cour de cassation ou de la Cour européenne.',
    'Tiens 15 minutes : regarde le jury, parle sans lire, garde du temps pour conclure.',
    'Pendant l’entretien de 30 minutes : écoute la question en entier, reconnais ce que tu ne sais pas, raisonne à voix haute.'
  ];

  // v8.6 : note de synthèse blanche (CRFPA). Le vrai dossier compte souvent une trentaine de documents ;
  // ici, un dossier court d'entraînement. Les documents sont des résumés pédagogiques de textes réels (pas des citations).
  const SYNTHESES = [
    { id:'oubli', titre:'Le droit à l’oubli numérique', docs:[
      ['Document 1 — Règlement général sur la protection des données (RGPD), article 17 (résumé)', 'Toute personne peut obtenir du responsable du traitement l’effacement, dans les meilleurs délais, de données à caractère personnel la concernant, notamment lorsqu’elles ne sont plus nécessaires au regard des finalités pour lesquelles elles ont été collectées, lorsqu’elle retire son consentement ou lorsque les données ont fait l’objet d’un traitement illicite. Ce droit ne s’applique pas lorsque le traitement est nécessaire, notamment, à l’exercice du droit à la liberté d’expression et d’information, au respect d’une obligation légale, à des motifs d’intérêt public dans le domaine de la santé publique, à des fins archivistiques, de recherche scientifique ou historique, ou à la défense de droits en justice.'],
      ['Document 2 — Cour de justice de l’Union européenne, 13 mai 2014, Google Spain, C-131/12 (résumé)', 'La Cour juge que l’exploitant d’un moteur de recherche est responsable du traitement de données personnelles qu’il effectue. Une personne peut lui demander de supprimer de la liste des résultats obtenus à partir de son nom des liens vers des pages contenant des informations la concernant, même lorsque leur publication est licite, si ces informations sont inadéquates, non pertinentes ou excessives au regard du temps écoulé. Ce droit doit toutefois être mis en balance avec l’intérêt du public à accéder à l’information, notamment en raison du rôle joué par la personne dans la vie publique.'],
      ['Document 3 — Cour de justice de l’Union européenne, 24 septembre 2019, Google c. CNIL, C-507/17 (résumé)', 'La Cour précise que l’exploitant d’un moteur de recherche qui fait droit à une demande de déréférencement n’est pas tenu par le droit de l’Union de l’opérer sur toutes les versions de son moteur dans le monde, mais sur les versions correspondant à l’ensemble des États membres. Il doit aussi prendre des mesures pour empêcher ou décourager sérieusement les internautes européens d’accéder aux liens en cause depuis une autre version.'],
      ['Document 4 — Loi n° 2016-1321 du 7 octobre 2016 pour une République numérique (résumé)', 'La loi renforce le droit à l’effacement des données collectées lorsque la personne concernée était mineure : sur demande, le responsable du traitement doit les effacer dans les meilleurs délais. À défaut de réponse ou en cas de réponse négative dans un délai d’un mois, la personne peut saisir la Commission nationale de l’informatique et des libertés (CNIL), qui se prononce dans un délai de trois semaines.'],
      ['Document 5 — Loi n° 78-17 du 6 janvier 1978 relative à l’informatique, aux fichiers et aux libertés (résumé)', 'La loi crée la CNIL, autorité administrative indépendante chargée de veiller à ce que l’informatique soit au service de chaque citoyen et ne porte atteinte ni à l’identité humaine, ni aux droits de l’homme, ni à la vie privée, ni aux libertés individuelles ou publiques. La CNIL peut recevoir des réclamations, contrôler les responsables de traitement et prononcer des sanctions.']
    ]},
    { id:'gav', titre:'La garde à vue et les droits de la défense', docs:[
      ['Document 1 — Code de procédure pénale, article 63-1 (résumé)', 'La personne placée en garde à vue est immédiatement informée, dans une langue qu’elle comprend, de son placement, de la durée de la mesure, de l’infraction qu’elle est soupçonnée d’avoir commise et de ses droits : faire prévenir un proche et son employeur, être examinée par un médecin, être assistée par un avocat, être assistée par un interprète, et, lors des auditions, faire des déclarations, répondre aux questions ou se taire.'],
      ['Document 2 — Conseil constitutionnel, décision n° 2010-14/22 QPC du 30 juillet 2010 (résumé)', 'Saisi par la voie de la question prioritaire de constitutionnalité, le Conseil juge contraires à la Constitution les dispositions de droit commun sur la garde à vue : elles ne permettaient pas à la personne d’être assistée effectivement par un avocat pendant les interrogatoires et ne prévoyaient pas la notification du droit de garder le silence. Il reporte au 1er juillet 2011 la date de l’abrogation, pour laisser au législateur le temps d’intervenir.'],
      ['Document 3 — Loi n° 2011-392 du 14 avril 2011 relative à la garde à vue (résumé)', 'La loi pose que la garde à vue doit être l’unique moyen de parvenir à certains objectifs précis de l’enquête. Elle permet à l’avocat d’assister aux auditions de la personne gardée à vue, après un entretien confidentiel de trente minutes, et impose la notification du droit de se taire. Aucune condamnation ne peut être prononcée sur le seul fondement de déclarations faites sans avoir pu s’entretenir avec un avocat.'],
      ['Document 4 — Cour européenne des droits de l’homme, 27 novembre 2008, Salduz c. Turquie (résumé)', 'La Cour juge que l’article 6 de la Convention (droit à un procès équitable) exige, en règle générale, que l’accès à un avocat soit consenti dès le premier interrogatoire d’un suspect par la police, sauf raisons impérieuses. Il est en principe porté une atteinte irrémédiable aux droits de la défense lorsque des déclarations incriminantes faites sans l’assistance d’un avocat sont utilisées pour fonder une condamnation.'],
      ['Document 5 — Code de procédure pénale, durée de la garde à vue (résumé)', 'En droit commun, la garde à vue ne peut excéder vingt-quatre heures. Elle peut être prolongée de vingt-quatre heures au plus, sur autorisation écrite et motivée du procureur de la République, si l’infraction est punie d’au moins un an d’emprisonnement. Pour certaines infractions de criminalité organisée ou de terrorisme, des prolongations supplémentaires sont possibles, sous le contrôle d’un juge.']
    ]}
  ];
  const texteDossier = s => s.docs.map(([t, x]) => t + '\n' + x).join('\n\n');
  const SYNTH_METHODE = [
    'Lis tout le dossier en notant, pour chaque document, son idée principale.',
    'Regroupe les idées par thème : c’est de là que naît ton plan, pas d’un document après l’autre.',
    'Introduction : présente le sujet et son actualité, puis annonce un plan en deux parties.',
    'Deux parties (I, II), chacune avec deux sous-parties (A, B) et des titres apparents.',
    'Chaque information renvoie à sa source : (doc. 1), (doc. 3 et 5). Utilise tous les documents.',
    'Aucune opinion personnelle, aucune connaissance extérieure au dossier : tu restes neutre.'
  ];
  function syntheses(){
    const A = api(), esc = A.esc;
    A.poser(A.barre('avocat') + '<main class="coin-anglais avocat-synthese"><h2>' + esc(tx('📄 Note de synthèse blanche')) + '</h2>' +
      '<p class="pieges-intro">' + esc(tx('Au CRFPA, la note de synthèse dure 5 heures (coefficient 3) et porte sur un dossier d’une trentaine de documents, à résumer en quatre pages au plus. Ici, un dossier court pour s’entraîner à la méthode.')) + '</p>' +
      '<section class="domaine"><h3>' + esc(tx('La méthode')) + '</h3><ol>' + SYNTH_METHODE.map(m => '<li>' + esc(m) + '</li>').join('') + '</ol></section>' +
      '<div class="cartes-anglais">' + SYNTHESES.map(s => M.carte('avocat-synthese-go', s.id, '📄', esc(s.titre), esc(s.docs.length + ' documents'))).join('') + '</div>' +
      '<p class="petit">' + esc(tx('Les documents sont des résumés pédagogiques de textes réels (lois, décisions), pas des citations.')) + '</p>' +
      '<div class="actions serrees"><button class="moyen" data-a="avocat">' + esc(tx('⚖️ Devenir avocat')) + '</button></div></main>');
  }
  function synthese(id){
    const s = SYNTHESES.find(x => x.id === id); if(!s || !M.copieOuvrir) return syntheses();
    M.copieOuvrir({ key:'crfpa:synthese:' + s.id, sorte:'synthese', titre:'Note de synthèse — ' + s.titre,
      sujet:'À partir des seuls documents du dossier, rédigez une note de synthèse sur « ' + s.titre + ' », en deux parties, sans donner votre avis.', texteSujet:texteDossier(s), duree:300 });
  }
  const virg = n => String(Math.round(n * 10) / 10).replace('.', ',');
  const EPREUVES = { blanc:{ titre:'📝 CRFPA blanc', n:40, minutes:60 }, revision:{ titre:'🔁 Révision : devenir avocat', n:20, minutes:0, vannes:true } };
  const ECRITS = ['obligations', 'penal', 'libertes', 'justice'];   // chapitres de droit proches des écrits du CRFPA
  function liste(type){
    const MT = window.MATIERES, ids = ((MT && MT.AVOCAT) || []).concat(type === 'blanc' ? ECRITS : []).filter(id => MT.trouver('droit').chapitres.some(c => c.id === id));
    const n = (EPREUVES[type] || EPREUVES.blanc).n, par = Math.ceil(n / Math.max(1, ids.length)), graine = Math.floor(Math.random() * 1e9), l = [];
    ids.forEach((id, k) => l.push(...MT.serie('droit', id, 'Sup', par, graine + k, 'taquin')));
    for(let i = l.length - 1; i > 0; i--){ const j = Math.floor(Math.random() * (i + 1)); [l[i], l[j]] = [l[j], l[i]]; }
    return l.slice(0, n);
  }
  function lancer(type){
    const A = api(), e = EPREUVES[type], l = liste(type); if(!e || !l.length) return ecran();
    A.questionsGo(l, Object.assign({ titre:tx(e.titre), retour:'avocat', fin:z => fin(type, z) }, e.vannes ? {} : { finA:Date.now() + e.minutes * 60000, sansVanne:true }));
  }
  function fin(type, z){
    const A = api(), esc = A.esc, n = z.liste.length, err = (z.reponses || []).filter(r => !r.juste), sans = z.liste.slice(z.i);
    const item = (q, l2) => '<li><p>' + esc(q.enonce) + '</p>' + l2 + '<p>✅ ' + esc(tx('Bonne réponse :')) + ' ' + esc(q.bon) + '</p>' + (q.regle ? '<p class="petit">💡 ' + esc(q.regle) + '</p>' : '') + '</li>';
    A.poser(A.barre('avocat') + '<main class="centre trimestre-fin avocat-fin"><h2>' + esc(tx(EPREUVES[type].titre)) + '</h2><p class="gros-score">' + esc(tx('Note : {0}/20', virg(20 * z.bonnes / Math.max(1, n)))) + '</p><p>' + esc(tx('{0} bonnes réponses sur {1}', z.bonnes, n)) + '</p>' +
      (err.length || sans.length ? '<h3>' + esc(tx('À revoir')) + '</h3><ol class="correction-controle">' + err.map(r => item(r.q, '<p>❌ ' + esc(tx('Ta réponse :')) + ' ' + esc(r.choix) + '</p>')).join('') + sans.map(q => item(q, '<p>⏱️ ' + esc(tx('Pas de réponse (temps écoulé).')) + '</p>')).join('') + '</ol>' : '') +
      '<div class="actions serrees"><button class="moyen plein" data-a="avocat-epreuve" data-v="' + type + '">' + esc(tx('🔁 Recommencer')) + '</button><button class="moyen" data-a="avocat">' + esc(tx('⚖️ Devenir avocat')) + '</button></div></main>');
  }
  let minuteur = null, finPrepa = 0;
  function tic(){ const e = document.getElementById('go-chrono'); if(!e){ clearInterval(minuteur); minuteur = null; return; }
    const r = finPrepa - Date.now(); e.textContent = r > 0 ? tx('⏱️ Préparation : il reste {0} min.', Math.ceil(r / 60000)) : tx('⏱️ La préparation est terminée : place à l’exposé de 15 minutes.'); }
  function grandOral(i){
    const A = api(), esc = A.esc, k = Number.isInteger(i) && SUJETS_GO[i] ? i : Math.floor(Math.random() * SUJETS_GO.length), [sujet, questions] = SUJETS_GO[k];
    finPrepa = Date.now() + 60 * 60000;
    A.poser(A.barre('avocat') + '<main class="coin-anglais avocat-go"><h2>' + esc(tx('🎤 Grand oral blanc')) + '</h2>' +
      '<section class="domaine sujet-bloc"><h3>' + esc(tx('Ton sujet')) + '</h3><p class="gros-sujet"><strong>« ' + esc(sujet) + ' »</strong></p><p id="go-chrono" class="petit" role="timer"></p></section>' +
      '<section class="domaine"><h3>' + esc(tx('La méthode')) + '</h3><ol>' + METHODE.map(m => '<li>' + esc(m) + '</li>').join('') + '</ol></section>' +
      '<details class="domaine"><summary>' + esc(tx('Les questions que le jury pourrait te poser')) + '</summary><ul>' + questions.map(q => '<li>' + esc(q) + '</li>').join('') + '</ul></details>' +
      '<div class="actions serrees"><button class="moyen" data-a="avocat-go" data-v="">' + esc(tx('🎲 Un autre sujet')) + '</button><button class="moyen" data-a="avocat">' + esc(tx('⚖️ Devenir avocat')) + '</button></div></main>');
    tic(); clearInterval(minuteur); minuteur = setInterval(tic, 30000);
  }
  function ecran(){
    const A = api(), esc = A.esc, MT = window.MATIERES, m = MT && MT.trouver('droit'); if(!m) return A.matieresAccueil();
    const carte = (a, v, ic, t1, t2) => M.carte(a, v, ic, t1, t2), chaps = (MT.AVOCAT || []).map(id => m.chapitres.find(c => c.id === id)).filter(Boolean);
    A.poser(A.barre('matiere-droit') + '<main class="coin-anglais avocat-ecran"><h2>' + esc(tx('⚖️ Devenir avocat')) + '</h2>' +
      '<p class="pieges-intro">' + esc(tx('Master 1 pour l’examen d’entrée au CRFPA, au moins 18 mois d’école, master 2 exigé pour le CAPA depuis le 1er janvier 2025, puis le serment devant la cour d’appel.')) + '</p>' +
      '<div class="cartes-anglais">' +
        carte('avocat-epreuve', 'blanc', '📝', esc(tx('📝 CRFPA blanc')).replace(/^📝 /, ''), esc(tx('{0} questions · {1} min · chronométré, sans vanne, corrigé à la fin', EPREUVES.blanc.n, EPREUVES.blanc.minutes))) +
        carte('avocat-go', '', '🎤', esc(tx('🎤 Grand oral blanc')).replace(/^🎤 /, ''), esc(tx('Un sujet sur les libertés et droits fondamentaux, 1 h de préparation, la méthode de l’exposé'))) +
        (M.copieOuvrir ? carte('avocat-synthese', '', '📄', esc(tx('📄 Note de synthèse blanche')).replace(/^📄 /, ''), esc(tx('Un dossier court à synthétiser, sans donner ton avis, en deux parties ; corrigé dans « Mes copies »'))) : '') +
        carte('avocat-epreuve', 'revision', '🔁', esc(tx('🔁 Révision : devenir avocat')).replace(/^🔁 /, ''), esc(tx('20 questions mélangées, avec les vannes de Plumo ; les erreurs vont dans le carnet'))) +
      '</div>' +
      '<section class="domaine"><h3>📚 ' + esc(MT.nomDom(m, 'Devenir avocat')) + '</h3><div class="liste-chap">' +
        chaps.map(c => '<button class="chap" data-a="matiere-chap" data-v="droit|' + c.id + '"><span>' + esc(MT.nomChap(m, c)) + '</span><em>▶ ' + c.banque.length + '</em></button>').join('') + '</div></section>' +
      '<section class="domaine"><h3>' + esc(tx('📜 Textes officiels')) + '</h3><div class="cartes-anglais">' +
        OFFICIEL.map(([t, u, d]) => '<a class="carte-anglais lien-carte" href="' + esc(u) + '" target="_blank" rel="noopener"><span class="ic">🔗</span><strong>' + esc(t) + '</strong><small>' + esc(d) + '</small></a>').join('') + '</div></section>' +
      '<p class="petit">⚖️ ' + esc(tx('Contenu éducatif : il ne remplace ni la préparation à l’examen, ni l’école d’avocats, ni le conseil d’un avocat.')) + '</p></main>');
  }
  M.cartes['matiere-ecran'].push(() => { const A = api(); if(A.etatMatieres().derniere !== 'droit') return '';
    return '<div class="cartes-anglais">' + M.carte('avocat', '', '⚖️', A.esc(tx('⚖️ Devenir avocat')).replace(/^⚖️ /, ''), A.esc(tx('CRFPA blanc, grand oral, déontologie, pratique du métier et textes officiels'))) + '</div>'; });
  Object.assign(M.actions, {
    'avocat':() => ecran(),
    'avocat-epreuve':v => EPREUVES[v] ? lancer(v) : ecran(),
    'avocat-go':v => grandOral(v === '' || v == null ? null : +v),
    'avocat-synthese':() => syntheses(),
    'avocat-synthese-go':v => synthese(v),
    'matiere-droit':() => api().matiereAccueil('droit')
  });
  window.AMI_AVOCAT = { OFFICIEL, EPREUVES, SUJETS_GO, liste, SYNTHESES };
})();
