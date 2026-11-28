// Ami des mots — v10.3 : 🎤 GRAND ORAL BLANC — dans le camp d'entraînement, au format de la session 2027.
// 1) L'élève écrit ses deux questions (gardées sur l'appareil) ; 2) le « jury » en tire une ; 3) 20 minutes de préparation
// chronométrées, avec un support facultatif (mots-clés, plan) ; 4) 10 minutes de présentation, debout, sans interruption ;
// 5) 10 minutes d'échange : des questions de relance du jury, une à une (un proche peut les lire à voix haute) ;
// 6) auto-évaluation sur les cinq critères de la grille indicative (4 niveaux chacun) : note indicative sur 20.
// Rien n'est enregistré : ni la voix, ni l'image. Le chrono et la note restent sur l'appareil.
(function(){
  'use strict';
  const M = window.AMI_MODULES; if(!M) return;
  const api = () => M.api, tx = (...a) => M.tx(...a);
  const PREP = 20, EXPOSE = 10, ECHANGE = 10, N_RELANCES = 6, MAX_Q = 300;
  const CRITERES = ['Qualité orale (voix, débit, regard, posture)', 'Prise de parole en continu (tenir 10 minutes sans lire)', 'Qualité des connaissances (précises, exactes, de spécialité)', 'Qualité de l’interaction (écoute, réponses aux questions)', 'Construction de l’argumentation (problème, étapes, réponse)'];
  const NIVEAUX = ['Très insuffisant', 'Insuffisant', 'Satisfaisant', 'Très satisfaisant'];
  const RELANCES = [
    'Pouvez-vous définir précisément le mot le plus important de votre question ?',
    'Pourquoi avez-vous choisi cette question ?',
    'Quel est, selon vous, votre argument le plus solide ? Et sa principale limite ?',
    'Quel cas concret illustre le mieux votre réponse ?',
    'Qu’est-ce qui pourrait contredire votre conclusion ?',
    'Quel lien faites-vous avec un autre chapitre de votre spécialité ?',
    'Quelle source avez-vous utilisée, et quelle confiance lui accordez-vous ?',
    'Pouvez-vous résumer votre réponse en une seule phrase ?',
    'Quelle donnée chiffrée faut-il retenir, et d’où vient-elle ?',
    'En quoi votre question intéresse-t-elle quelqu’un qui ne suit pas votre spécialité ?',
    'Si vous refaisiez votre présentation, que changeriez-vous ?',
    'Pouvez-vous revenir sur le passage de votre présentation qui vous a semblé le plus difficile ?',
    'Quelle notion du programme de première vous a servi ici ?',
    'Y a-t-il un débat entre spécialistes sur cette question ?',
    'Quelles conséquences votre réponse a-t-elle dans la vie de tous les jours ?',
    'Quelle question auriez-vous aimé que l’on vous pose ?'
  ];
  M.textes({
    '🎤 Grand oral blanc':['🎤 Mock Grand oral', '🎤 Grand oral de prueba', '🎤 Probe-Grand-oral', '🎤 Grand oral di prova', '🎤 Grand oral simulado'],
    'Au format 2027 : tes deux questions, 20 min de préparation, 10 min de présentation, 10 min d’échange avec le jury, puis la grille d’évaluation.':['In the 2027 format: your two questions, 20 min of preparation, 10 min of presentation, 10 min of discussion with the panel, then the assessment grid.', 'Con el formato 2027: tus dos preguntas, 20 min de preparación, 10 min de presentación, 10 min de intercambio con el tribunal y la tabla de evaluación.', 'Im Format 2027: deine zwei Fragen, 20 Min. Vorbereitung, 10 Min. Präsentation, 10 Min. Gespräch mit der Jury, dann das Bewertungsraster.', 'Nel formato 2027: le tue due domande, 20 min di preparazione, 10 min di presentazione, 10 min di scambio con la commissione, poi la griglia di valutazione.', 'No formato de 2027: as tuas duas perguntas, 20 min de preparação, 10 min de apresentação, 10 min de troca com o júri e depois a grelha de avaliação.'],
    'Meilleure note : {0}.':['Best mark: {0}.', 'Mejor nota: {0}.', 'Beste Note: {0}.', 'Voto migliore: {0}.', 'Melhor nota: {0}.'],
    '— (pas encore)':['— (not yet)', '— (todavía no)', '— (noch nicht)', '— (non ancora)', '— (ainda não)'],
    'Rien n’est enregistré : ni ta voix ni ton image. Parle à voix haute, debout, comme le jour J. Un proche peut jouer le jury et lire les questions de relance.':['Nothing is recorded: neither your voice nor your image. Speak aloud, standing, as on the day. Someone close to you can play the panel and read the follow-up questions.', 'No se graba nada: ni tu voz ni tu imagen. Habla en voz alta, de pie, como el día del examen. Alguien cercano puede hacer de tribunal y leer las preguntas de seguimiento.', 'Nichts wird aufgenommen: weder deine Stimme noch dein Bild. Sprich laut und im Stehen, wie am Prüfungstag. Jemand aus deiner Familie kann die Jury spielen und die Nachfragen vorlesen.', 'Non viene registrato nulla: né la tua voce né la tua immagine. Parla ad alta voce, in piedi, come il giorno dell’esame. Una persona vicina può fare la commissione e leggere le domande.', 'Nada é gravado: nem a tua voz nem a tua imagem. Fala em voz alta, de pé, como no dia do exame. Alguém próximo pode fazer de júri e ler as perguntas de seguimento.'],
    'Ma question n° 1':['My question no. 1', 'Mi pregunta n.º 1', 'Meine Frage Nr. 1', 'La mia domanda n. 1', 'A minha pergunta n.º 1'],
    'Ma question n° 2':['My question no. 2', 'Mi pregunta n.º 2', 'Meine Frage Nr. 2', 'La mia domanda n. 2', 'A minha pergunta n.º 2'],
    '▶️ Le jury tire une question':['▶️ The panel picks a question', '▶️ El tribunal elige una pregunta', '▶️ Die Jury wählt eine Frage', '▶️ La commissione sceglie una domanda', '▶️ O júri escolhe uma pergunta'],
    'Écris tes deux questions pour commencer.':['Write your two questions to begin.', 'Escribe tus dos preguntas para empezar.', 'Schreib zuerst deine zwei Fragen.', 'Scrivi le tue due domande per cominciare.', 'Escreve as tuas duas perguntas para começar.'],
    'Une question se termine par un point d’interrogation : « l’eau », c’est un thème ; « Comment garantir l’accès à l’eau potable ? », c’est une question. Plumo a déjà vu un thème déguisé en question, il a reconnu la moustache. 🥸':['A question ends with a question mark: “water” is a theme; “How can access to drinking water be guaranteed?” is a question. Plumo has already seen a theme disguised as a question: he recognised the moustache. 🥸', 'Una pregunta termina con un signo de interrogación: «el agua» es un tema; «¿Cómo garantizar el acceso al agua potable?» es una pregunta. Plumo ya vio un tema disfrazado de pregunta: reconoció el bigote. 🥸', 'Eine Frage endet mit einem Fragezeichen: „Wasser“ ist ein Thema; „Wie lässt sich der Zugang zu Trinkwasser sichern?“ ist eine Frage. Plumo hat schon ein als Frage verkleidetes Thema gesehen: Er hat den Schnurrbart erkannt. 🥸', 'Una domanda finisce con un punto interrogativo: «l’acqua» è un tema; «Come garantire l’accesso all’acqua potabile?» è una domanda. Plumo ha già visto un tema travestito da domanda: ha riconosciuto i baffi. 🥸', 'Uma pergunta termina com um ponto de interrogação: «a água» é um tema; «Como garantir o acesso à água potável?» é uma pergunta. O Plumo já viu um tema disfarçado de pergunta: reconheceu o bigode. 🥸'],
    'Le jury a choisi :':['The panel has chosen:', 'El tribunal ha elegido:', 'Die Jury hat gewählt:', 'La commissione ha scelto:', 'O júri escolheu:'],
    '⏱️ Préparation : 20 minutes':['⏱️ Preparation: 20 minutes', '⏱️ Preparación: 20 minutos', '⏱️ Vorbereitung: 20 Minuten', '⏱️ Preparazione: 20 minuti', '⏱️ Preparação: 20 minutos'],
    'Mon support (facultatif : mots-clés, plan, schéma)':['My support (optional: keywords, plan, diagram)', 'Mi apoyo (opcional: palabras clave, plan, esquema)', 'Meine Stütze (freiwillig: Stichwörter, Gliederung, Skizze)', 'Il mio supporto (facoltativo: parole chiave, schema)', 'O meu suporte (facultativo: palavras-chave, plano, esquema)'],
    'Accroche, question, deux ou trois étapes, réponse : quelques mots suffisent. Le support se montre au jury, il ne se lit pas et n’est pas noté.':['Hook, question, two or three steps, answer: a few words are enough. The support is shown to the panel; it is not read out and not marked.', 'Arranque, pregunta, dos o tres etapas, respuesta: bastan unas palabras. El apoyo se muestra al tribunal, no se lee y no se califica.', 'Aufhänger, Frage, zwei oder drei Schritte, Antwort: ein paar Wörter genügen. Die Stütze wird der Jury gezeigt, nicht vorgelesen und nicht bewertet.', 'Attacco, domanda, due o tre tappe, risposta: bastano poche parole. Il supporto si mostra alla commissione, non si legge e non è valutato.', 'Abertura, pergunta, duas ou três etapas, resposta: bastam algumas palavras. O suporte mostra-se ao júri, não se lê e não é avaliado.'],
    '🎤 Je suis prêt(e) : je présente':['🎤 I am ready: I present', '🎤 Estoy listo/a: presento', '🎤 Ich bin bereit: Ich präsentiere', '🎤 Sono pronto/a: presento', '🎤 Estou pronto/a: apresento'],
    '⏱️ Présentation : 10 minutes, debout. Le jury écoute sans t’interrompre.':['⏱️ Presentation: 10 minutes, standing. The panel listens without interrupting.', '⏱️ Presentación: 10 minutos, de pie. El tribunal escucha sin interrumpir.', '⏱️ Präsentation: 10 Minuten, im Stehen. Die Jury hört zu, ohne zu unterbrechen.', '⏱️ Presentazione: 10 minuti, in piedi. La commissione ascolta senza interrompere.', '⏱️ Apresentação: 10 minutos, de pé. O júri ouve sem interromper.'],
    '✅ J’ai terminé ma présentation':['✅ I have finished my presentation', '✅ He terminado mi presentación', '✅ Ich bin mit der Präsentation fertig', '✅ Ho finito la presentazione', '✅ Terminei a minha apresentação'],
    'Temps écoulé : passons à l’échange.':['Time is up: let us move on to the discussion.', 'Se acabó el tiempo: pasamos al intercambio.', 'Die Zeit ist um: weiter zum Gespräch.', 'Tempo scaduto: passiamo allo scambio.', 'Acabou o tempo: passamos à troca.'],
    '⏱️ Échange avec le jury : 10 minutes':['⏱️ Discussion with the panel: 10 minutes', '⏱️ Intercambio con el tribunal: 10 minutos', '⏱️ Gespräch mit der Jury: 10 Minuten', '⏱️ Scambio con la commissione: 10 minuti', '⏱️ Troca com o júri: 10 minutos'],
    'Question du jury {0} / {1}':['Panel question {0} / {1}', 'Pregunta del tribunal {0} / {1}', 'Frage der Jury {0} / {1}', 'Domanda della commissione {0} / {1}', 'Pergunta do júri {0} / {1}'],
    '➡️ Question suivante':['➡️ Next question', '➡️ Siguiente pregunta', '➡️ Nächste Frage', '➡️ Domanda successiva', '➡️ Pergunta seguinte'],
    '🏁 Fin de l’échange : je m’évalue':['🏁 End of the discussion: I assess myself', '🏁 Fin del intercambio: me evalúo', '🏁 Ende des Gesprächs: Ich bewerte mich', '🏁 Fine dello scambio: mi valuto', '🏁 Fim da troca: autoavalio-me'],
    'Tu ne sais pas ? Reformule la question, prends un instant, relie-la à ce que tu sais. Inventer, jamais.':['You do not know? Rephrase the question, take a moment, link it to what you know. Never make things up.', '¿No lo sabes? Reformula la pregunta, tómate un momento, relaciónala con lo que sabes. Inventar, nunca.', 'Du weißt es nicht? Formuliere die Frage um, nimm dir einen Moment, verbinde sie mit dem, was du weißt. Nie etwas erfinden.', 'Non lo sai? Riformula la domanda, prenditi un momento, collegala a ciò che sai. Inventare, mai.', 'Não sabes? Reformula a pergunta, toma um momento, liga-a ao que sabes. Inventar, nunca.'],
    'Auto-évaluation : la grille du Grand oral':['Self-assessment: the Grand oral grid', 'Autoevaluación: la tabla del Grand oral', 'Selbstbewertung: das Raster des Grand oral', 'Autovalutazione: la griglia del Grand oral', 'Autoavaliação: a grelha do Grand oral'],
    'Sois honnête : cette note est indicative. Le vrai jury note sur 20 sans barème par partie.':['Be honest: this mark is only a guide. The real panel marks out of 20 without a points scale per part.', 'Sé sincero: esta nota es orientativa. El tribunal real califica sobre 20 sin baremo por partes.', 'Sei ehrlich: Diese Note ist nur ein Anhaltspunkt. Die echte Jury vergibt bis zu 20 Punkte ohne festes Schema pro Teil.', 'Sii sincero: questo voto è indicativo. La vera commissione valuta in ventesimi senza punteggio per parte.', 'Sê honesto: esta nota é indicativa. O júri real avalia em 20 valores sem tabela por parte.'],
    'Présentation : {0}':['Presentation: {0}', 'Presentación: {0}', 'Präsentation: {0}', 'Presentazione: {0}', 'Apresentação: {0}'],
    'Ta présentation a duré moins de 8 minutes : il manque de la matière. Ajoute une étape ou un cas concret.':['Your presentation lasted under 8 minutes: content is missing. Add a step or a concrete case.', 'Tu presentación duró menos de 8 minutos: falta contenido. Añade una etapa o un caso concreto.', 'Deine Präsentation dauerte weniger als 8 Minuten: Es fehlt Inhalt. Füge einen Schritt oder ein konkretes Beispiel hinzu.', 'La tua presentazione è durata meno di 8 minuti: manca materiale. Aggiungi una tappa o un caso concreto.', 'A tua apresentação durou menos de 8 minutos: falta matéria. Acrescenta uma etapa ou um caso concreto.'],
    'Ta présentation a tenu ses 10 minutes : bonne gestion du temps.':['Your presentation filled its 10 minutes: good time management.', 'Tu presentación llenó sus 10 minutos: buena gestión del tiempo.', 'Deine Präsentation hat ihre 10 Minuten gefüllt: gutes Zeitmanagement.', 'La tua presentazione ha occupato i suoi 10 minuti: buona gestione del tempo.', 'A tua apresentação ocupou os seus 10 minutos: boa gestão do tempo.'],
    'Enregistrer ma note':['Save my mark', 'Guardar mi nota', 'Meine Note speichern', 'Salva il mio voto', 'Guardar a minha nota'],
    'Note indicative : {0} / 20':['Guide mark: {0} / 20', 'Nota orientativa: {0} / 20', 'Richtnote: {0} / 20', 'Voto indicativo: {0} / 20', 'Nota indicativa: {0} / 20'],
    'À travailler en priorité : {0}':['Work on this first: {0}', 'Para trabajar primero: {0}', 'Zuerst daran arbeiten: {0}', 'Da lavorare per primo: {0}', 'A trabalhar primeiro: {0}'],
    'Plumo a écouté jusqu’au bout sans regarder sa montre une seule fois. C’est le plus beau compliment qu’il sache faire. 🎩':['Plumo listened to the end without looking at his watch once. It is the finest compliment he knows how to pay. 🎩', 'Plumo escuchó hasta el final sin mirar el reloj ni una vez. Es el mejor cumplido que sabe hacer. 🎩', 'Plumo hat bis zum Ende zugehört, ohne ein einziges Mal auf die Uhr zu schauen. Ein schöneres Kompliment kennt er nicht. 🎩', 'Plumo ha ascoltato fino alla fine senza guardare l’orologio nemmeno una volta. È il complimento più bello che sappia fare. 🎩', 'O Plumo ouviu até ao fim sem olhar para o relógio uma única vez. É o melhor elogio que sabe fazer. 🎩'],
    'Plumo a pris des notes. Beaucoup de « bien » et quelques « à revoir » : la prochaine fois, la balance penchera encore plus du bon côté. 📝':['Plumo took notes. Lots of “good” and a few “to work on”: next time, the balance will tip even further. 📝', 'Plumo tomó notas. Muchos «bien» y algunos «a repasar»: la próxima vez, la balanza se inclinará aún más. 📝', 'Plumo hat mitgeschrieben. Viele „gut“ und ein paar „noch üben“: Beim nächsten Mal kippt die Waage noch weiter. 📝', 'Plumo ha preso appunti. Tanti «bene» e qualche «da rivedere»: la prossima volta la bilancia penderà ancora di più. 📝', 'O Plumo tomou notas. Muitos «bem» e alguns «a rever»: da próxima vez, a balança vai pender ainda mais. 📝'],
    'Plumo a vu un orateur en rodage. Le moteur est bon : il reste à passer les vitesses. Un autre essai ? 🚗':['Plumo saw a speaker still running in. The engine is good: now it is time to change gear. Another go? 🚗', 'Plumo vio a un orador en rodaje. El motor es bueno: falta meter las marchas. ¿Otro intento? 🚗', 'Plumo hat einen Redner beim Einfahren gesehen. Der Motor ist gut: Jetzt heißt es schalten. Noch ein Versuch? 🚗', 'Plumo ha visto un oratore in rodaggio. Il motore è buono: resta da cambiare marcia. Un altro tentativo? 🚗', 'O Plumo viu um orador em rodagem. O motor é bom: falta meter as mudanças. Outra tentativa? 🚗'],
    '🔁 Un autre Grand oral blanc':['🔁 Another mock Grand oral', '🔁 Otro Grand oral de prueba', '🔁 Noch ein Probe-Grand-oral', '🔁 Un altro Grand oral di prova', '🔁 Outro Grand oral simulado'],
    '📖 Réviser le chapitre « Grand oral »':['📖 Revise the “Grand oral” chapter', '📖 Repasar el capítulo «Grand oral»', '📖 Das Kapitel „Grand oral“ wiederholen', '📖 Ripassare il capitolo «Grand oral»', '📖 Rever o capítulo «Grand oral»'],
    '↩️ Retour au camp':['↩️ Back to camp', '↩️ Volver al campo', '↩️ Zurück zum Lager', '↩️ Torna al campo', '↩️ Voltar ao campo'],
    'Grand oral blanc : {0} essai(s), meilleure note indicative {1} / 20':['Mock Grand oral: {0} attempt(s), best guide mark {1} / 20', 'Grand oral de prueba: {0} intento(s), mejor nota orientativa {1} / 20', 'Probe-Grand-oral: {0} Versuch(e), beste Richtnote {1} / 20', 'Grand oral di prova: {0} tentativo/i, miglior voto indicativo {1} / 20', 'Grand oral simulado: {0} tentativa(s), melhor nota indicativa {1} / 20']
  });
  const T5 = (fr, en, es, de, it, pt) => ({ [fr]:[en, es, de, it, pt] });
  M.textes(Object.assign({},
    T5(CRITERES[0], 'Oral quality (voice, pace, eye contact, posture)', 'Calidad oral (voz, ritmo, mirada, postura)', 'Mündliche Qualität (Stimme, Tempo, Blick, Haltung)', 'Qualità orale (voce, ritmo, sguardo, postura)', 'Qualidade oral (voz, ritmo, olhar, postura)'),
    T5(CRITERES[1], 'Sustained speaking (10 minutes without reading)', 'Discurso continuo (10 minutos sin leer)', 'Freies Sprechen (10 Minuten ohne abzulesen)', 'Discorso continuo (10 minuti senza leggere)', 'Discurso contínuo (10 minutos sem ler)'),
    T5(CRITERES[2], 'Quality of knowledge (precise, accurate, from the specialty)', 'Calidad de los conocimientos (precisos, exactos, de la especialidad)', 'Qualität des Wissens (genau, richtig, aus dem Fach)', 'Qualità delle conoscenze (precise, esatte, della specializzazione)', 'Qualidade dos conhecimentos (precisos, exatos, da especialidade)'),
    T5(CRITERES[3], 'Quality of interaction (listening, answering questions)', 'Calidad de la interacción (escucha, respuestas)', 'Qualität der Interaktion (Zuhören, Antworten)', 'Qualità dell’interazione (ascolto, risposte)', 'Qualidade da interação (escuta, respostas)'),
    T5(CRITERES[4], 'Building the argument (problem, steps, answer)', 'Construcción de la argumentación (problema, etapas, respuesta)', 'Aufbau der Argumentation (Problem, Schritte, Antwort)', 'Costruzione dell’argomentazione (problema, tappe, risposta)', 'Construção da argumentação (problema, etapas, resposta)'),
    T5(NIVEAUX[0], 'Very poor', 'Muy insuficiente', 'Sehr unzureichend', 'Molto insufficiente', 'Muito insuficiente'),
    T5(NIVEAUX[1], 'Poor', 'Insuficiente', 'Unzureichend', 'Insufficiente', 'Insuficiente'),
    T5(NIVEAUX[2], 'Satisfactory', 'Satisfactorio', 'Zufriedenstellend', 'Soddisfacente', 'Satisfatório'),
    T5(NIVEAUX[3], 'Very satisfactory', 'Muy satisfactorio', 'Sehr zufriedenstellend', 'Molto soddisfacente', 'Muito satisfatório'),
    T5(RELANCES[0], 'Can you define precisely the most important word in your question?', '¿Puede definir con precisión la palabra más importante de su pregunta?', 'Können Sie das wichtigste Wort Ihrer Frage genau definieren?', 'Può definire con precisione la parola più importante della sua domanda?', 'Pode definir com precisão a palavra mais importante da sua pergunta?'),
    T5(RELANCES[1], 'Why did you choose this question?', '¿Por qué eligió esta pregunta?', 'Warum haben Sie diese Frage gewählt?', 'Perché ha scelto questa domanda?', 'Porque escolheu esta pergunta?'),
    T5(RELANCES[2], 'What do you think is your strongest argument? And its main limit?', '¿Cuál es, según usted, su argumento más sólido? ¿Y su principal límite?', 'Was ist Ihrer Meinung nach Ihr stärkstes Argument? Und seine wichtigste Grenze?', 'Qual è, secondo lei, il suo argomento più solido? E il suo limite principale?', 'Qual é, na sua opinião, o seu argumento mais sólido? E o seu principal limite?'),
    T5(RELANCES[3], 'Which concrete case best illustrates your answer?', '¿Qué caso concreto ilustra mejor su respuesta?', 'Welches konkrete Beispiel veranschaulicht Ihre Antwort am besten?', 'Quale caso concreto illustra meglio la sua risposta?', 'Que caso concreto ilustra melhor a sua resposta?'),
    T5(RELANCES[4], 'What could contradict your conclusion?', '¿Qué podría contradecir su conclusión?', 'Was könnte Ihrer Schlussfolgerung widersprechen?', 'Che cosa potrebbe contraddire la sua conclusione?', 'O que poderia contradizer a sua conclusão?'),
    T5(RELANCES[5], 'What link do you see with another chapter of your specialty?', '¿Qué relación ve con otro capítulo de su especialidad?', 'Welchen Zusammenhang sehen Sie mit einem anderen Kapitel Ihres Fachs?', 'Che legame vede con un altro capitolo della sua specializzazione?', 'Que ligação faz com outro capítulo da sua especialidade?'),
    T5(RELANCES[6], 'Which source did you use, and how far do you trust it?', '¿Qué fuente utilizó y qué confianza le merece?', 'Welche Quelle haben Sie benutzt, und wie sehr vertrauen Sie ihr?', 'Quale fonte ha usato, e quanta fiducia le accorda?', 'Que fonte utilizou, e que confiança lhe merece?'),
    T5(RELANCES[7], 'Can you sum up your answer in a single sentence?', '¿Puede resumir su respuesta en una sola frase?', 'Können Sie Ihre Antwort in einem einzigen Satz zusammenfassen?', 'Può riassumere la sua risposta in una sola frase?', 'Pode resumir a sua resposta numa só frase?'),
    T5(RELANCES[8], 'Which figure should we remember, and where does it come from?', '¿Qué dato numérico hay que recordar y de dónde procede?', 'Welche Zahl sollte man sich merken, und woher stammt sie?', 'Quale dato numerico bisogna ricordare, e da dove viene?', 'Que dado numérico se deve reter, e de onde vem?'),
    T5(RELANCES[9], 'Why would your question interest someone who does not study your specialty?', '¿Por qué interesaría su pregunta a alguien que no cursa su especialidad?', 'Warum sollte Ihre Frage jemanden interessieren, der Ihr Fach nicht belegt?', 'Perché la sua domanda dovrebbe interessare chi non segue la sua specializzazione?', 'Porque é que a sua pergunta interessaria a alguém que não segue a sua especialidade?'),
    T5(RELANCES[10], 'If you gave your presentation again, what would you change?', 'Si repitiera su presentación, ¿qué cambiaría?', 'Wenn Sie Ihre Präsentation noch einmal halten würden, was würden Sie ändern?', 'Se rifacesse la presentazione, che cosa cambierebbe?', 'Se refizesse a sua apresentação, o que mudaria?'),
    T5(RELANCES[11], 'Can you go back over the part of your presentation that you found hardest?', '¿Puede volver sobre la parte de su presentación que le pareció más difícil?', 'Können Sie auf den Teil Ihrer Präsentation zurückkommen, der Ihnen am schwersten fiel?', 'Può tornare sulla parte della presentazione che le è sembrata più difficile?', 'Pode voltar à parte da sua apresentação que lhe pareceu mais difícil?'),
    T5(RELANCES[12], 'Which notion from the previous year’s syllabus helped you here?', '¿Qué noción del programa del curso anterior le ha servido aquí?', 'Welcher Begriff aus dem Stoff des Vorjahres hat Ihnen hier geholfen?', 'Quale nozione del programma dell’anno precedente le è servita qui?', 'Que noção do programa do ano anterior lhe serviu aqui?'),
    T5(RELANCES[13], 'Is there a debate among specialists on this question?', '¿Hay un debate entre especialistas sobre esta cuestión?', 'Gibt es unter Fachleuten eine Debatte über diese Frage?', 'C’è un dibattito tra specialisti su questa questione?', 'Há um debate entre especialistas sobre esta questão?'),
    T5(RELANCES[14], 'What consequences does your answer have in everyday life?', '¿Qué consecuencias tiene su respuesta en la vida cotidiana?', 'Welche Folgen hat Ihre Antwort im Alltag?', 'Quali conseguenze ha la sua risposta nella vita di tutti i giorni?', 'Que consequências tem a sua resposta no dia a dia?'),
    T5(RELANCES[15], 'What question would you have liked to be asked?', '¿Qué pregunta le habría gustado que le hicieran?', 'Welche Frage hätten Sie gern gestellt bekommen?', 'Quale domanda le sarebbe piaciuto ricevere?', 'Que pergunta gostaria que lhe tivessem feito?')
  ));

  const melanger = l => { const a = l.slice(); for(let i = a.length - 1; i > 0; i--){ const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
  const nettoyer = s => String(s || '').replace(/\s+/g, ' ').trim().slice(0, MAX_Q);
  function etat(){
    const C = window.AMI_CAMP, c = C ? C.camp() : (api().J().camp = api().J().camp || {});
    const g = c.grandOral && typeof c.grandOral === 'object' ? c.grandOral : {};
    g.questions = Array.isArray(g.questions) ? g.questions.slice(0, 2).map(nettoyer) : ['', ''];
    while(g.questions.length < 2) g.questions.push('');
    g.essais = Array.isArray(g.essais) ? g.essais.filter(e => e && typeof e === 'object' && Number.isFinite(+e.note)).slice(-20) : [];
    c.grandOral = g; return g;
  }
  const meilleure = () => { const e = etat().essais; return e.length ? Math.max(...e.map(x => +x.note)) : null; };
  // Le déroulé en cours (en mémoire seulement).
  let go = null, finA = 0;
  const mmss = s => Math.floor(s / 60) + ':' + String(s % 60).padStart(2, '0');
  const ecoule = () => go && go.debutExpose ? Math.round(((go.finExpose || Date.now()) - go.debutExpose) / 1000) : 0;

  function accueil(msg){
    const A = api(), esc = A.esc, g = etat(), b = meilleure();
    A.poser(A.barre('matieres') + '<main class="coin-anglais matieres-ecran grand-oral-ecran"><h2>' + esc(tx('🎤 Grand oral blanc')) + '</h2>' +
      '<p>' + esc(tx('Au format 2027 : tes deux questions, 20 min de préparation, 10 min de présentation, 10 min d’échange avec le jury, puis la grille d’évaluation.')) + '</p>' +
      '<p class="petit">' + esc(tx('Rien n’est enregistré : ni ta voix ni ton image. Parle à voix haute, debout, comme le jour J. Un proche peut jouer le jury et lire les questions de relance.')) + '</p>' +
      [0, 1].map(i => '<p><label for="go-q' + i + '"><strong>' + esc(tx(i ? 'Ma question n° 2' : 'Ma question n° 1')) + '</strong></label><br><textarea id="go-q' + i + '" rows="2" maxlength="' + MAX_Q + '">' + esc(g.questions[i]) + '</textarea></p>').join('') +
      (msg ? '<p class="go-alerte" role="alert">' + esc(tx(msg)) + '</p>' : '') +
      '<p class="petit">' + esc(tx('Meilleure note : {0}.', b == null ? tx('— (pas encore)') : String(b).replace('.', ',') + ' / 20')) + '</p>' +
      '<div class="actions"><button class="gros plein" data-a="camp-go-tirage">' + esc(tx('▶️ Le jury tire une question')) + '</button> <button class="moyen" data-a="camp">' + esc(tx('↩️ Retour au camp')) + '</button></div></main>');
  }
  function tirage(){
    const A = api(), esc = A.esc, g = etat(), d = document;
    for(const i of [0, 1]){ const t = d.getElementById('go-q' + i); if(t) g.questions[i] = nettoyer(t.value); }
    A.garder();
    if(!g.questions[0] || !g.questions[1]) return accueil('Écris tes deux questions pour commencer.');
    if(!g.questions.every(q => /\?\s*$/.test(q))) return accueil('Une question se termine par un point d’interrogation : « l’eau », c’est un thème ; « Comment garantir l’accès à l’eau potable ? », c’est une question. Plumo a déjà vu un thème déguisé en question, il a reconnu la moustache. 🥸');
    const n = Math.floor(Math.random() * 2);
    go = { q:g.questions[n], support:'', relances:melanger(RELANCES).slice(0, N_RELANCES), i:0 }; finA = Date.now() + PREP * 60000;
    A.poser(A.barre('matieres') + '<main class="coin-anglais matieres-ecran grand-oral-ecran"><h2>' + esc(tx('🎤 Grand oral blanc')) + '</h2>' +
      '<p>' + esc(tx('Le jury a choisi :')) + '</p><p class="gros-score go-question">' + esc(go.q) + '</p>' +
      '<p class="chrono-veille" id="go-chrono" role="timer">' + esc(tx('⏱️ Préparation : 20 minutes')) + '</p>' +
      '<p><label for="go-support"><strong>' + esc(tx('Mon support (facultatif : mots-clés, plan, schéma)')) + '</strong></label><br><textarea id="go-support" rows="6" maxlength="1500"></textarea></p>' +
      '<p class="petit">' + esc(tx('Accroche, question, deux ou trois étapes, réponse : quelques mots suffisent. Le support se montre au jury, il ne se lit pas et n’est pas noté.')) + '</p>' +
      '<div class="actions"><button class="gros plein" data-a="camp-go-expose">' + esc(tx('🎤 Je suis prêt(e) : je présente')) + '</button></div></main>');
  }
  function expose(){
    const A = api(), esc = A.esc; if(!go) return accueil();
    const t = document.getElementById('go-support'); if(t) go.support = String(t.value || '').slice(0, 1500);
    go.debutExpose = Date.now(); go.finExpose = 0; finA = go.debutExpose + EXPOSE * 60000; go.phase = 'expose';
    A.poser(A.barre('matieres') + '<main class="coin-anglais matieres-ecran grand-oral-ecran"><p class="chrono-veille" id="go-chrono" role="timer">⏱️ ' + EXPOSE + ':00</p>' +
      '<p class="gros-score go-question">' + esc(go.q) + '</p><p>' + esc(tx('⏱️ Présentation : 10 minutes, debout. Le jury écoute sans t’interrompre.')) + '</p>' +
      (go.support ? '<pre class="go-support">' + esc(go.support) + '</pre>' : '') +
      '<div class="actions"><button class="gros plein" data-a="camp-go-echange">' + esc(tx('✅ J’ai terminé ma présentation')) + '</button></div></main>');
  }
  function echange(auto){
    const A = api(), esc = A.esc; if(!go) return accueil();
    if(go.phase === 'expose'){ go.finExpose = Math.min(Date.now(), go.debutExpose + EXPOSE * 60000); go.phase = 'echange'; finA = Date.now() + ECHANGE * 60000; go.i = 0; }
    const q = go.relances[go.i], dernier = go.i >= go.relances.length - 1;
    A.poser(A.barre('matieres') + '<main class="coin-anglais matieres-ecran grand-oral-ecran"><p class="chrono-veille" id="go-chrono" role="timer">⏱️ ' + mmss(Math.max(0, Math.ceil((finA - Date.now()) / 1000))) + '</p>' +
      (auto ? '<p role="status">' + esc(tx('Temps écoulé : passons à l’échange.')) + '</p>' : '') +
      '<h3>' + esc(tx('⏱️ Échange avec le jury : 10 minutes')) + '</h3><p class="petit">' + esc(tx('Question du jury {0} / {1}', go.i + 1, go.relances.length)) + '</p>' +
      '<p class="gros-score go-relance">' + esc(tx(q)) + '</p><p class="petit">' + esc(tx('Tu ne sais pas ? Reformule la question, prends un instant, relie-la à ce que tu sais. Inventer, jamais.')) + '</p>' +
      '<div class="actions">' + (dernier ? '' : '<button class="moyen plein" data-a="camp-go-relance">' + esc(tx('➡️ Question suivante')) + '</button> ') + '<button class="moyen" data-a="camp-go-grille">' + esc(tx('🏁 Fin de l’échange : je m’évalue')) + '</button></div></main>');
  }
  function grille(){
    const A = api(), esc = A.esc; if(!go) return accueil();
    if(go.phase === 'expose') go.finExpose = Math.min(Date.now(), go.debutExpose + EXPOSE * 60000);
    go.phase = 'grille'; finA = 0; const s = ecoule();
    A.poser(A.barre('matieres') + '<main class="coin-anglais matieres-ecran grand-oral-ecran"><h2>' + esc(tx('Auto-évaluation : la grille du Grand oral')) + '</h2>' +
      '<p class="petit">' + esc(tx('Sois honnête : cette note est indicative. Le vrai jury note sur 20 sans barème par partie.')) + '</p>' +
      '<p>' + esc(tx('Présentation : {0}', mmss(s))) + ' — ' + esc(tx(s < 480 ? 'Ta présentation a duré moins de 8 minutes : il manque de la matière. Ajoute une étape ou un cas concret.' : 'Ta présentation a tenu ses 10 minutes : bonne gestion du temps.')) + '</p>' +
      '<form class="go-grille">' + CRITERES.map((c, i) => '<fieldset><legend>' + esc(tx(c)) + '</legend>' + NIVEAUX.map((n, v) => '<label><input type="radio" name="go-c' + i + '" value="' + (v + 1) + '"' + (v === 2 ? ' checked' : '') + '> ' + esc(tx(n)) + '</label>').join(' ') + '</fieldset>').join('') + '</form>' +
      '<div class="actions"><button class="gros plein" data-a="camp-go-noter">' + esc(tx('Enregistrer ma note')) + '</button></div></main>');
  }
  function noter(){
    const A = api(), esc = A.esc; if(!go) return accueil();
    const crit = CRITERES.map((c, i) => { const r = document.querySelector('input[name="go-c' + i + '"]:checked'); return r ? Math.max(1, Math.min(4, Math.floor(+r.value) || 1)) : 3; });
    let note = crit.reduce((a, b) => a + b, 0); const s = ecoule(); if(s < 480) note = Math.max(0, note - 2);
    const g = etat(); g.essais.push({ jour:A.jour ? A.jour() : '', note, expose:s, crit }); g.essais = g.essais.slice(-20);
    const C = window.AMI_CAMP; if(C){ const c = C.camp(); c.pts += 10 + note; }
    A.garder(); go = null; finA = 0;
    const faible = crit.indexOf(Math.min(...crit)), phrase = note >= 17 ? 'Plumo a écouté jusqu’au bout sans regarder sa montre une seule fois. C’est le plus beau compliment qu’il sache faire. 🎩' : note >= 12 ? 'Plumo a pris des notes. Beaucoup de « bien » et quelques « à revoir » : la prochaine fois, la balance penchera encore plus du bon côté. 📝' : 'Plumo a vu un orateur en rodage. Le moteur est bon : il reste à passer les vitesses. Un autre essai ? 🚗';
    const P = window.MATIERES && MATIERES.trouver('philo'), avecChap = P && P.chapitres.some(c => c.id === 'grand-oral');
    A.poser(A.barre('matieres') + '<main class="coin-anglais matieres-ecran grand-oral-ecran fin-examen"><div class="ami-moyen">' + A.ami(note >= 12 ? 'fete' : 'malin') + '</div>' +
      '<h2>' + esc(tx('Note indicative : {0} / 20', note)) + '</h2><p>' + esc(tx(phrase)) + '</p>' +
      (Math.min(...crit) < 4 ? '<p>' + esc(tx('À travailler en priorité : {0}', tx(CRITERES[faible]))) + '</p>' : '') +
      '<div class="actions"><button class="moyen plein" data-a="camp-go">' + esc(tx('🔁 Un autre Grand oral blanc')) + '</button> ' +
      (avecChap ? '<button class="moyen" data-a="matiere-chap" data-v="philo|grand-oral">' + esc(tx('📖 Réviser le chapitre « Grand oral »')) + '</button> ' : '') +
      '<button class="moyen" data-a="camp">' + esc(tx('↩️ Retour au camp')) + '</button></div></main>');
  }
  // Un seul chrono pour les trois phases ; la présentation s'arrête toute seule au bout de 10 minutes.
  setInterval(() => { const c = document.getElementById('go-chrono'); if(!c || !finA || !go) return; const r = Math.max(0, Math.ceil((finA - Date.now()) / 1000)); c.textContent = '⏱️ ' + mmss(r);
    if(r === 0 && go.phase === 'expose') echange(true); }, 1000);

  M.cartes.parents.push(() => { const g = etat(), b = meilleure(); if(!g.essais.length) return ''; const esc = api().esc;
    return '<section class="parents-grand-oral"><p>🎤 ' + esc(tx('Grand oral blanc : {0} essai(s), meilleure note indicative {1} / 20', g.essais.length, b)) + '</p></section>'; });
  Object.assign(M.actions, {
    'camp-go':() => accueil(), 'camp-go-tirage':() => tirage(), 'camp-go-expose':() => expose(),
    'camp-go-echange':() => echange(false), 'camp-go-relance':() => { if(go && go.i < go.relances.length - 1) go.i++; return echange(false); },
    'camp-go-grille':() => grille(), 'camp-go-noter':() => noter()
  });
  window.AMI_GRAND_ORAL = { PREP, EXPOSE, ECHANGE, CRITERES, NIVEAUX, RELANCES, etat, meilleure, accueil, etatCourant:() => go, finA:() => finA };
})();
