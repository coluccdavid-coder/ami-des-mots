// Ami des mots — v9.0 : 🎖️ LE CAMP D'ENTRAÎNEMENT — un entraînement intensif, pour qui le veut, en français, anglais et maths.
// • Mission du jour, dans un ordre imposé : 1) les erreurs à revoir (révision espacée), 2) la leçon du jour (fiche de cours :
//   l'essentiel, un exemple corrigé, la méthode, les pièges ; puis 10 questions, 7 pour valider la notion), 3) une série
//   commando sans filet (chrono, une erreur et la série s'arrête), 4) les fiches de MON cahier (ce que l'élève a écrit lui-même).
// • Séries sans filet à la demande (français, anglais, maths, niveau mathématicien), avec records.
// • 📚 Base de connaissances : toutes les notions du programme par classe, avec leur fiche (js/cours-fiches.js) ou l'essentiel
//   tiré des questions, et les fiches personnelles de l'élève (📒 Mon cahier, gardées sur l'appareil).
// • Grades de Recrue à Général, jours de service d'affilée, compte à rebours vers l'examen choisi, accès aux examens blancs.
// Tout reste sur l'appareil. Plumo joue le sergent instructeur : il taquine la réponse, jamais l'élève.
(function(){
  'use strict';
  const M = window.AMI_MODULES; if(!M) return;
  if(!M.cartes.maths) M.cartes.maths = [];
  const api = () => M.api, tx = (...a) => M.tx(...a);
  M.textes({
    '🎖️ Camp d’entraînement':['🎖️ Training camp', '🎖️ Campo de entrenamiento', '🎖️ Trainingslager', '🎖️ Campo d’addestramento', '🎖️ Campo de treino'],
    'Mission du jour, séries sans filet, fiches de cours : l’entraînement intensif pour réussir ses examens.':['Daily mission, no-safety-net runs, lesson sheets: intensive training to pass your exams.', 'Misión del día, series sin red, fichas de clase: entrenamiento intensivo para aprobar los exámenes.', 'Tagesmission, Serien ohne Netz, Lernkarten: Intensivtraining für die Prüfungen.', 'Missione del giorno, serie senza rete, schede: allenamento intensivo per superare gli esami.', 'Missão do dia, séries sem rede, fichas de aula: treino intensivo para passar nos exames.'],
    'Grade : {0}':['Rank: {0}', 'Grado: {0}', 'Rang: {0}', 'Grado: {0}', 'Posto: {0}'],
    '{0} points · {1} jour(s) de service d’affilée':['{0} points · {1} day(s) of service in a row', '{0} puntos · {1} día(s) de servicio seguidos', '{0} Punkte · {1} Diensttag(e) am Stück', '{0} punti · {1} giorno/i di servizio di fila', '{0} pontos · {1} dia(s) de serviço seguidos'],
    'Prochain grade : {0} ({1} points)':['Next rank: {0} ({1} points)', 'Próximo grado: {0} ({1} puntos)', 'Nächster Rang: {0} ({1} Punkte)', 'Prossimo grado: {0} ({1} punti)', 'Próximo posto: {0} ({1} pontos)'],
    '🎯 Mission du jour':['🎯 Today’s mission', '🎯 Misión del día', '🎯 Tagesmission', '🎯 Missione del giorno', '🎯 Missão do dia'],
    '1. Revoir mes erreurs':['1. Review my mistakes', '1. Repasar mis errores', '1. Meine Fehler wiederholen', '1. Ripassare i miei errori', '1. Rever os meus erros'],
    '2. Leçon du jour : {0}':['2. Today’s lesson: {0}', '2. Lección del día: {0}', '2. Lektion des Tages: {0}', '2. Lezione del giorno: {0}', '2. Lição do dia: {0}'],
    '3. Série commando sans filet':['3. Commando run, no safety net', '3. Serie comando sin red', '3. Kommando-Serie ohne Netz', '3. Serie commando senza rete', '3. Série comando sem rede'],
    '4. Mes fiches perso':['4. My own cards', '4. Mis fichas', '4. Meine eigenen Karten', '4. Le mie schede', '4. As minhas fichas'],
    '▶️ Étape suivante':['▶️ Next step', '▶️ Siguiente etapa', '▶️ Nächster Schritt', '▶️ Prossima tappa', '▶️ Próxima etapa'],
    '✅ Mission accomplie ! Repos, soldat. Reviens demain pour la suivante.':['✅ Mission accomplished! At ease, soldier. Come back tomorrow for the next one.', '✅ ¡Misión cumplida! Descanse, soldado. Vuelve mañana para la siguiente.', '✅ Mission erfüllt! Rührt euch. Komm morgen für die nächste wieder.', '✅ Missione compiuta! Riposo, soldato. Torna domani per la prossima.', '✅ Missão cumprida! Descansar, soldado. Volta amanhã para a próxima.'],
    '🪂 Séries sans filet':['🪂 No-safety-net runs', '🪂 Series sin red', '🪂 Serien ohne Netz', '🪂 Serie senza rete', '🪂 Séries sem rede'],
    'Chrono serré, aucun indice : une erreur et la série s’arrête. Record : {0}.':['Tight timer, no hints: one mistake and the run stops. Record: {0}.', 'Crono ajustado, sin pistas: un error y la serie se acaba. Récord: {0}.', 'Knappe Zeit, keine Hilfe: ein Fehler und die Serie endet. Rekord: {0}.', 'Tempo stretto, nessun aiuto: un errore e la serie finisce. Record: {0}.', 'Tempo apertado, sem ajudas: um erro e a série acaba. Recorde: {0}.'],
    'Français':['French', 'Francés', 'Französisch', 'Francese', 'Francês'],
    'Anglais':['English', 'Inglés', 'Englisch', 'Inglese', 'Inglês'],
    'Maths':['Maths', 'Matemáticas', 'Mathe', 'Matematica', 'Matemática'],
    'Niveau mathématicien':['Mathematician level', 'Nivel matemático', 'Mathematiker-Niveau', 'Livello matematico', 'Nível matemático'],
    'Niveau généticien':['Geneticist level', 'Nivel genetista', 'Genetiker-Niveau', 'Livello genetista', 'Nível geneticista'],
    'Niveau géophysicien':['Geophysicist level', 'Nivel geofísico', 'Geophysiker-Niveau', 'Livello geofisico', 'Nível geofísico'],
    'ADN, mutations, CRISPR, hérédité, génétique des populations : au-delà du programme.':['DNA, mutations, CRISPR, heredity, population genetics: beyond the curriculum.', 'ADN, mutaciones, CRISPR, herencia, genética de poblaciones: más allá del programa.', 'DNA, Mutationen, CRISPR, Vererbung, Populationsgenetik: über den Lehrplan hinaus.', 'DNA, mutazioni, CRISPR, ereditarietà, genetica delle popolazioni: oltre il programma.', 'ADN, mutações, CRISPR, hereditariedade, genética das populações: para além do programa.'],
    'Sismologie, intérieur de la Terre, plaques, magnétisme, gravité : au-delà du programme.':['Seismology, the Earth’s interior, plates, magnetism, gravity: beyond the curriculum.', 'Sismología, interior de la Tierra, placas, magnetismo, gravedad: más allá del programa.', 'Seismologie, Erdinneres, Platten, Magnetismus, Schwerkraft: über den Lehrplan hinaus.', 'Sismologia, interno della Terra, placche, magnetismo, gravità: oltre il programma.', 'Sismologia, interior da Terra, placas, magnetismo, gravidade: para além do programa.'],
    'Tout mélangé':['All mixed', 'Todo mezclado', 'Alles gemischt', 'Tutto mescolato', 'Tudo misturado'],
    '📚 Base de connaissances':['📚 Knowledge base', '📚 Base de conocimientos', '📚 Wissensbasis', '📚 Base di conoscenze', '📚 Base de conhecimentos'],
    'Toutes les notions du programme, avec leur fiche de cours, et tes propres fiches.':['Every topic of the curriculum, with its lesson sheet, and your own cards.', 'Todas las nociones del programa, con su ficha, y tus propias fichas.', 'Alle Themen des Lehrplans mit Lernkarte, und deine eigenen Karten.', 'Tutte le nozioni del programma, con la scheda, e le tue schede.', 'Todas as noções do programa, com a ficha, e as tuas próprias fichas.'],
    'Classe : {0}':['Class: {0}', 'Curso: {0}', 'Klasse: {0}', 'Classe: {0}', 'Ano: {0}'],
    'Toutes les classes':['All classes', 'Todos los cursos', 'Alle Klassen', 'Tutte le classi', 'Todos os anos'],
    'Ma classe seulement':['My class only', 'Solo mi curso', 'Nur meine Klasse', 'Solo la mia classe', 'Só o meu ano'],
    '✅ acquise':['✅ mastered', '✅ dominada', '✅ beherrscht', '✅ acquisita', '✅ dominada'],
    '📚 fiche':['📚 sheet', '📚 ficha', '📚 Karte', '📚 scheda', '📚 ficha'],
    '🧠 L’essentiel':['🧠 The key points', '🧠 Lo esencial', '🧠 Das Wichtigste', '🧠 L’essenziale', '🧠 O essencial'],
    '✏️ Exemple corrigé':['✏️ Worked example', '✏️ Ejemplo resuelto', '✏️ Gelöstes Beispiel', '✏️ Esempio svolto', '✏️ Exemplo resolvido'],
    '🧭 Méthode':['🧭 Method', '🧭 Método', '🧭 Methode', '🧭 Metodo', '🧭 Método'],
    '⚠️ Pièges':['⚠️ Traps', '⚠️ Trampas', '⚠️ Fallen', '⚠️ Trappole', '⚠️ Armadilhas'],
    'Pas encore de fiche rédigée : voici l’essentiel, tiré des questions.':['No written sheet yet: here are the key points, taken from the questions.', 'Aún no hay ficha redactada: aquí está lo esencial, sacado de las preguntas.', 'Noch keine ausgearbeitete Karte: Hier das Wichtigste aus den Fragen.', 'Nessuna scheda scritta per ora: ecco l’essenziale, tratto dalle domande.', 'Ainda não há ficha escrita: aqui está o essencial, tirado das perguntas.'],
    '💪 M’entraîner (10 questions)':['💪 Practise (10 questions)', '💪 Entrenarme (10 preguntas)', '💪 Üben (10 Fragen)', '💪 Allenarmi (10 domande)', '💪 Treinar (10 perguntas)'],
    '🪂 Sans filet':['🪂 No safety net', '🪂 Sin red', '🪂 Ohne Netz', '🪂 Senza rete', '🪂 Sem rede'],
    '📒 Écrire ma fiche':['📒 Write my own card', '📒 Escribir mi ficha', '📒 Meine Karte schreiben', '📒 Scrivere la mia scheda', '📒 Escrever a minha ficha'],
    '📒 Mes fiches ({0})':['📒 My cards ({0})', '📒 Mis fichas ({0})', '📒 Meine Karten ({0})', '📒 Le mie schede ({0})', '📒 As minhas fichas ({0})'],
    'Tu n’as pas encore écrit de fiche. Écris-en une : ce qu’on reformule soi-même, on le retient.':['You have not written any card yet. Write one: what you put in your own words, you remember.', 'Aún no has escrito ninguna ficha. Escribe una: lo que reformulas tú, lo recuerdas.', 'Du hast noch keine Karte geschrieben. Schreib eine: Was man selbst formuliert, behält man.', 'Non hai ancora scritto schede. Scrivine una: ciò che riformuli da solo, lo ricordi.', 'Ainda não escreveste nenhuma ficha. Escreve uma: o que reformulas sozinho, recordas.'],
    'Notion validée : {0} / {1}. +30 points !':['Topic mastered: {0} / {1}. +30 points!', 'Noción validada: {0} / {1}. ¡+30 puntos!', 'Thema geschafft: {0} / {1}. +30 Punkte!', 'Nozione validata: {0} / {1}. +30 punti!', 'Noção validada: {0} / {1}. +30 pontos!'],
    'Pas encore : {0} / {1}. Il en faut 7. Relis la fiche et retente : c’est comme ça qu’on progresse.':['Not yet: {0} / {1}. You need 7. Read the sheet again and retry: that is how you improve.', 'Todavía no: {0} / {1}. Hacen falta 7. Relee la ficha y vuelve a intentarlo: así se progresa.', 'Noch nicht: {0} / {1}. Es braucht 7. Lies die Karte noch einmal und versuch es wieder: So wird man besser.', 'Non ancora: {0} / {1}. Ne servono 7. Rileggi la scheda e riprova: è così che si migliora.', 'Ainda não: {0} / {1}. São precisas 7. Relê a ficha e tenta outra vez: é assim que se progride.'],
    'Série parfaite : {0} / {0} !':['Perfect run: {0} / {0}!', '¡Serie perfecta: {0} / {0}!', 'Perfekte Serie: {0} / {0}!', 'Serie perfetta: {0} / {0}!', 'Série perfeita: {0} / {0}!'],
    'Série arrêtée à {0} bonne(s) réponse(s).':['Run stopped at {0} correct answer(s).', 'Serie detenida con {0} respuesta(s) correcta(s).', 'Serie nach {0} richtigen Antwort(en) beendet.', 'Serie fermata a {0} risposta/e giusta/e.', 'Série parada com {0} resposta(s) certa(s).'],
    'Nouveau record !':['New record!', '¡Nuevo récord!', 'Neuer Rekord!', 'Nuovo record!', 'Novo recorde!'],
    '🔁 Recommencer':['🔁 Start again', '🔁 Volver a empezar', '🔁 Nochmal', '🔁 Ricominciare', '🔁 Recomeçar'],
    '↩️ Retour au camp':['↩️ Back to camp', '↩️ Volver al campo', '↩️ Zurück ins Lager', '↩️ Torna al campo', '↩️ Voltar ao campo'],
    '📝 Examens blancs':['📝 Mock exams', '📝 Exámenes de prueba', '📝 Probeprüfungen', '📝 Esami simulati', '📝 Exames simulados'],
    '📒 Mon cahier':['📒 My notebook', '📒 Mi cuaderno', '📒 Mein Heft', '📒 Il mio quaderno', '📒 O meu caderno'],
    '🗓️ Mon objectif':['🗓️ My goal', '🗓️ Mi objetivo', '🗓️ Mein Ziel', '🗓️ Il mio obiettivo', '🗓️ O meu objetivo'],
    'Examen visé':['Target exam', 'Examen previsto', 'Angestrebte Prüfung', 'Esame previsto', 'Exame pretendido'],
    'Date de l’examen':['Exam date', 'Fecha del examen', 'Prüfungsdatum', 'Data dell’esame', 'Data do exame'],
    'Enregistrer':['Save', 'Guardar', 'Speichern', 'Salva', 'Guardar'],
    'Aucun':['None', 'Ninguno', 'Keine', 'Nessuno', 'Nenhum'],
    'Brevet':['Brevet (end of Year 10)', 'Brevet (fin de 3.º de ESO)', 'Brevet (Ende Klasse 9)', 'Brevet (fine della terza media)', 'Brevet (fim do 9.º ano)'],
    'Bac de français (1re)':['French bac exam (Year 12)', 'Bachillerato de francés (1.º)', 'Französisch-Abitur (Klasse 11)', 'Maturità di francese (4ª)', 'Exame de francês (11.º)'],
    'Maths anticipées (1re)':['Early maths exam (Year 12)', 'Matemáticas anticipadas (1.º)', 'Vorgezogene Matheprüfung (Klasse 11)', 'Matematica anticipata (4ª)', 'Matemática antecipada (11.º)'],
    'Bac (Tle)':['Baccalaureate (Year 13)', 'Bachillerato (2.º)', 'Abitur (Klasse 12)', 'Maturità (5ª)', 'Exame nacional (12.º)'],
    'Diplôme du supérieur':['Higher-education degree', 'Título superior', 'Hochschulabschluss', 'Titolo universitario', 'Diploma do ensino superior'],
    '{0} : J−{1}':['{0}: D−{1}', '{0}: D−{1}', '{0}: T−{1}', '{0}: G−{1}', '{0}: D−{1}'],
    '{0} : c’est aujourd’hui ! Respire, tu es prêt(e).':['{0}: it is today! Breathe, you are ready.', '{0}: ¡es hoy! Respira, estás listo/a.', '{0}: Es ist heute! Atme durch, du bist bereit.', '{0}: è oggi! Respira, sei pronto/a.', '{0}: é hoje! Respira, estás pronto/a.'],
    'Plus de questions de ce type pour l’instant.':['No more questions of this kind for now.', 'De momento no hay más preguntas de este tipo.', 'Im Moment keine weiteren Fragen dieser Art.', 'Per ora non ci sono altre domande di questo tipo.', 'Por agora não há mais perguntas deste tipo.'],
    'Rien à revoir : étape validée.':['Nothing to review: step done.', 'Nada que repasar: etapa validada.', 'Nichts zu wiederholen: Schritt erledigt.', 'Niente da ripassare: tappa superata.', 'Nada para rever: etapa validada.'],
    'Pas de fiche perso avec « question = réponse » : étape validée. Écris-en une dans ton cahier pour la prochaine fois !':['No personal “question = answer” card: step done. Write one in your notebook for next time!', 'No hay fichas «pregunta = respuesta»: etapa validada. ¡Escribe una en tu cuaderno para la próxima vez!', 'Keine eigene „Frage = Antwort“-Karte: Schritt erledigt. Schreib eine in dein Heft für das nächste Mal!', 'Nessuna scheda «domanda = risposta»: tappa superata. Scrivine una nel quaderno per la prossima volta!', 'Nenhuma ficha «pergunta = resposta»: etapa validada. Escreve uma no caderno para a próxima vez!'],
    'Raisonnement, arithmétique, nombres complexes : au-delà du programme.':['Reasoning, number theory, complex numbers: beyond the curriculum.', 'Razonamiento, aritmética, números complejos: más allá del programa.', 'Beweisen, Zahlentheorie, komplexe Zahlen: über den Lehrplan hinaus.', 'Ragionamento, aritmetica, numeri complessi: oltre il programma.', 'Raciocínio, aritmética, números complexos: para além do programa.'],
    '📝 Séries d’examen':['📝 Exam runs', '📝 Series de examen', '📝 Prüfungsserien', '📝 Serie d’esame', '📝 Séries de exame'],
    '20 questions au format de l’examen, 20 minutes, sans vanne ni correction pendant l’épreuve : note sur 20 et corrigé à la fin. Meilleure note : {0}.':['20 questions in the exam format, 20 minutes, no jokes or corrections during the test: mark out of 20 and corrections at the end. Best mark: {0}.', '20 preguntas con el formato del examen, 20 minutos, sin bromas ni corrección durante la prueba: nota sobre 20 y corrección al final. Mejor nota: {0}.', '20 Fragen im Prüfungsformat, 20 Minuten, ohne Sprüche und Korrektur während der Prüfung: Note von 20 und Korrektur am Ende. Beste Note: {0}.', '20 domande nel formato dell’esame, 20 minuti, senza battute né correzione durante la prova: voto su 20 e correzione alla fine. Voto migliore: {0}.', '20 perguntas no formato do exame, 20 minutos, sem piadas nem correção durante a prova: nota em 20 e correção no fim. Melhor nota: {0}.'],
    'Note : {0} / 20':['Mark: {0} / 20', 'Nota: {0} / 20', 'Note: {0} / 20', 'Voto: {0} / 20', 'Nota: {0} / 20'],
    '{0} bonne(s) réponse(s) sur {1}.':['{0} correct answer(s) out of {1}.', '{0} respuesta(s) correcta(s) de {1}.', '{0} richtige Antwort(en) von {1}.', '{0} risposta/e giusta/e su {1}.', '{0} resposta(s) certa(s) em {1}.'],
    '✏️ Corrigé':['✏️ Corrections', '✏️ Corrección', '✏️ Korrektur', '✏️ Correzione', '✏️ Correção'],
    'Ta réponse :':['Your answer:', 'Tu respuesta:', 'Deine Antwort:', 'La tua risposta:', 'A tua resposta:'],
    'Pas de réponse (temps écoulé)':['No answer (time up)', 'Sin respuesta (tiempo agotado)', 'Keine Antwort (Zeit abgelaufen)', 'Nessuna risposta (tempo scaduto)', 'Sem resposta (tempo esgotado)'],
    'Bonne réponse :':['Correct answer:', 'Respuesta correcta:', 'Richtige Antwort:', 'Risposta giusta:', 'Resposta certa:'],
    'Tout est juste : rien à corriger.':['Everything is right: nothing to correct.', 'Todo está bien: nada que corregir.', 'Alles richtig: nichts zu korrigieren.', 'Tutto giusto: niente da correggere.', 'Tudo certo: nada a corrigir.'],
    'Plumo a lu ta copie trois fois pour trouver une faute. Il est reparti bredouille. Chapeau ! 🎩':['Plumo read your paper three times looking for a mistake. He left empty-handed. Hats off! 🎩', 'Plumo leyó tu examen tres veces buscando un fallo. Se fue con las manos vacías. ¡Chapó! 🎩', 'Plumo hat deine Arbeit dreimal nach einem Fehler durchsucht. Er ging leer aus. Hut ab! 🎩', 'Plumo ha letto il tuo compito tre volte cercando un errore. È rimasto a mani vuote. Chapeau! 🎩', 'O Plumo leu o teu teste três vezes à procura de um erro. Saiu de mãos vazias. Chapéu! 🎩'],
    'Plumo a sorti son stylo rouge, mais il a aussi vu de belles réponses. Le corrigé est là pour la suite. 🖍️':['Plumo got his red pen out, but he also saw some fine answers. The corrections are here for next time. 🖍️', 'Plumo sacó su boli rojo, pero también vio buenas respuestas. Aquí tienes la corrección para la próxima. 🖍️', 'Plumo hat den Rotstift gezückt, aber auch schöne Antworten gesehen. Die Korrektur hilft beim nächsten Mal. 🖍️', 'Plumo ha tirato fuori la penna rossa, ma ha visto anche belle risposte. La correzione è qui per la prossima volta. 🖍️', 'O Plumo pegou na caneta vermelha, mas também viu boas respostas. A correção fica aqui para a próxima. 🖍️'],
    'Le stylo rouge de Plumo a bien travaillé aujourd’hui. Bonne nouvelle : chaque erreur corrigée ici ne sera plus faite le jour J. 💪':['Plumo’s red pen worked hard today. Good news: every mistake corrected here will not happen on the day. 💪', 'El boli rojo de Plumo ha trabajado mucho hoy. Buena noticia: cada error corregido aquí no se repetirá el día del examen. 💪', 'Plumos Rotstift hatte heute viel zu tun. Gute Nachricht: Jeder Fehler, der hier korrigiert wird, passiert am Prüfungstag nicht mehr. 💪', 'La penna rossa di Plumo ha lavorato molto oggi. Buona notizia: ogni errore corretto qui non si ripeterà il giorno dell’esame. 💪', 'A caneta vermelha do Plumo trabalhou muito hoje. Boa notícia: cada erro corrigido aqui não se repete no dia do exame. 💪'],
    '— (pas encore)':['— (not yet)', '— (todavía no)', '— (noch nicht)', '— (non ancora)', '— (ainda não)'],
    'Recrue':['Recruit', 'Recluta', 'Rekrut', 'Recluta', 'Recruta'], 'Soldat':['Private', 'Soldado', 'Soldat', 'Soldato', 'Soldado'], 'Caporal':['Corporal', 'Cabo', 'Gefreiter', 'Caporale', 'Cabo'],
    'Sergent':['Sergeant', 'Sargento', 'Unteroffizier', 'Sergente', 'Sargento'], 'Adjudant':['Warrant officer', 'Brigada', 'Feldwebel', 'Maresciallo', 'Sargento-ajudante'], 'Lieutenant':['Lieutenant', 'Teniente', 'Leutnant', 'Tenente', 'Tenente'],
    'Capitaine':['Captain', 'Capitán', 'Hauptmann', 'Capitano', 'Capitão'], 'Commandant':['Major', 'Comandante', 'Major', 'Maggiore', 'Major'], 'Colonel':['Colonel', 'Coronel', 'Oberst', 'Colonnello', 'Coronel'], 'Général':['General', 'General', 'General', 'Generale', 'General'],
    'Série brisée ! Plumo te regarde au garde-à-vous… et retient un fou rire. On recommence ?':['Run broken! Plumo stands to attention… holding back a laugh. Again?', '¡Serie rota! Plumo te mira firme… aguantando la risa. ¿Otra vez?', 'Serie gerissen! Plumo steht stramm… und verkneift sich das Lachen. Nochmal?', 'Serie spezzata! Plumo sull’attenti… trattiene una risata. Ancora?', 'Série quebrada! O Plumo em sentido… a conter o riso. Outra vez?'],
    'Cette réponse a sauté sans parachute. Toi, tu as encore le tien : remonte dans l’avion !':['That answer jumped without a parachute. You still have yours: back on the plane!', 'Esa respuesta saltó sin paracaídas. Tú aún tienes el tuyo: ¡vuelve al avión!', 'Diese Antwort ist ohne Fallschirm gesprungen. Du hast deinen noch: zurück ins Flugzeug!', 'Quella risposta è saltata senza paracadute. Tu hai ancora il tuo: torna sull’aereo!', 'Essa resposta saltou sem paraquedas. Tu ainda tens o teu: volta ao avião!'],
    'Une erreur, une seule… mais le sergent Plumo l’a vue. Vingt pompes ? Non : une autre série.':['One mistake, just one… but Sergeant Plumo saw it. Twenty push-ups? No: another run.', 'Un error, solo uno… pero el sargento Plumo lo vio. ¿Veinte flexiones? No: otra serie.', 'Ein Fehler, nur einer… aber Feldwebel Plumo hat ihn gesehen. Zwanzig Liegestütze? Nein: noch eine Serie.', 'Un errore, uno solo… ma il sergente Plumo l’ha visto. Venti flessioni? No: un’altra serie.', 'Um erro, só um… mas o sargento Plumo viu. Vinte flexões? Não: outra série.'],
    'Sans-faute ! Plumo range son sifflet : il n’a rien trouvé à redire. Respect, soldat. 🫡':['Flawless! Plumo puts his whistle away: nothing to say. Respect, soldier. 🫡', '¡Sin fallos! Plumo guarda el silbato: nada que decir. Respeto, soldado. 🫡', 'Fehlerfrei! Plumo steckt die Pfeife weg: nichts zu meckern. Respekt, Soldat. 🫡', 'Zero errori! Plumo mette via il fischietto: niente da dire. Rispetto, soldato. 🫡', 'Sem erros! O Plumo guarda o apito: nada a apontar. Respeito, soldado. 🫡']
  });

  // ───── Données (dans la sauvegarde du joueur) ─────
  const GRADES = [[0, 'Recrue'], [100, 'Soldat'], [300, 'Caporal'], [600, 'Sergent'], [1000, 'Adjudant'], [1600, 'Lieutenant'], [2400, 'Capitaine'], [3500, 'Commandant'], [5000, 'Colonel'], [7000, 'Général']];
  const ETAPES = ['revision', 'lecon', 'commando', 'fiches'];
  const MATS = [['francais', '📝', 'Français'], ['langlais', '🇬🇧', 'Anglais'], ['maths', '🔢', 'Maths'], ['mathematicien', '🧠', 'Niveau mathématicien'], ['geneticien', '🧬', 'Niveau généticien'], ['geophysicien', '🌋', 'Niveau géophysicien']];
  const EXPERTS = ['mathematicien', 'geneticien', 'geophysicien'];
  const EXAMENS = [['', 'Aucun'], ['brevet', 'Brevet'], ['eaf', 'Bac de français (1re)'], ['eam', 'Maths anticipées (1re)'], ['bac', 'Bac (Tle)'], ['sup', 'Diplôme du supérieur']];
  const MATR = () => window.MATIERES;
  const N_SANS_FILET = 10, SECONDES_PAR_Q = 25;
  function camp(){ const j = api().J(); const c = j.camp && typeof j.camp === 'object' ? j.camp : {};
    c.pts = Math.max(0, Math.floor(+c.pts) || 0); c.serie = Math.max(0, Math.floor(+c.serie) || 0);
    c.jours = c.jours && typeof c.jours === 'object' ? c.jours : {}; c.acquis = Array.isArray(c.acquis) ? c.acquis.filter(x => typeof x === 'string').slice(-2000) : [];
    c.records = c.records && typeof c.records === 'object' ? c.records : {}; c.objectif = c.objectif && typeof c.objectif === 'object' ? c.objectif : { examen:'', date:'' };
    // On ne garde que les 60 derniers jours de missions.
    const ks = Object.keys(c.jours).sort(); if(ks.length > 60) ks.slice(0, ks.length - 60).forEach(k => delete c.jours[k]);
    j.camp = c; return c; }
  const aujourdhui = () => api().jour();
  const mission = () => { const c = camp(), k = aujourdhui(); const m = c.jours[k] = c.jours[k] && typeof c.jours[k] === 'object' ? c.jours[k] : {}; return m; };
  const gradeDe = pts => { let g = GRADES[0]; for(const x of GRADES) if(pts >= x[0]) g = x; return g; };
  const prochainGrade = pts => GRADES.find(x => x[0] > pts) || null;
  const gagner = n => { const c = camp(); c.pts += Math.max(0, Math.floor(n) || 0); api().garder(); };
  const niveau = () => { const A = api(); return (A.etatMatieres && A.etatMatieres().niveau) || '6e'; };
  const niveauMaths = () => { const A = api(), N = window.MATHS ? MATHS.NIVEAUX : [], n = (A.etatMaths && A.etatMaths().niveau) || niveau(); return N.includes(n) ? n : N.includes(niveau()) ? niveau() : (N[N.length - 1] || '6e'); };
  const ton = () => { const A = api(); return (A.etatMaths && A.etatMaths().ton) || 'taquin'; };
  const hasard = () => Math.floor(Math.random() * 1e9);
  const melanger = l => { const a = l.slice(); for(let i = a.length - 1; i > 0; i--){ const k = Math.floor(Math.random() * (i + 1)); [a[i], a[k]] = [a[k], a[i]]; } return a; };
  const copie = l => l.map(x => Object.assign({}, x, { faux:(x.faux || []).map(f => Object.assign({}, f)) }));

  // Jours de service : une mission complète compte ; la série se poursuit si la veille était complète.
  function jourPrecedent(k){ const d = new Date(k + 'T12:00:00'); d.setDate(d.getDate() - 1); return d.toISOString().slice(0, 10); }
  function validerJour(){ const c = camp(), k = aujourdhui(), m = mission(); if(m.fini) return false;
    if(!ETAPES.every(e => m[e])) return false;
    m.fini = true; const hier = c.jours[jourPrecedent(k)]; c.serie = hier && hier.fini ? c.serie + 1 : 1; c.pts += 40; api().garder(); return true; }
  const etapeFaite = e => { const m = mission(); if(!m[e]){ m[e] = true; gagner(20); } validerJour(); };

  // ───── Notions (chapitres) ─────
    function notions(mid, toutes){
    if(mid === 'maths'){ if(!window.MATHS) return []; const nivs = toutes ? MATHS.NIVEAUX : [niveauMaths()];
      return nivs.flatMap(n => MATHS.chapitresDe(n).map(c => ({ mid:'maths', cid:c[0], nom:c[2] || c[0], niv:n }))); }
    if(!MATR() || !MATR().trouver(mid)) return [];
    const Mx = MATR(), m = Mx.trouver(mid), chs = (toutes || EXPERTS.includes(mid)) ? m.chapitres : Mx.chapitres(mid, niveau());
    return chs.filter(c => !c.theme && (Array.isArray(c.banque) || c.gen)).map(c => ({ mid, cid:c.id, nom:MATR().nomChap ? MATR().nomChap(m, c) : c.nom, niv:(c.niv || []).join(', ') }));
  }
  const cle = n => n.mid + '/' + n.cid;
  function questions(n, nb){
    if(n.mid === 'maths'){ if(!window.MATHS) return []; return MATHS.serie([n.cid], nb, hasard(), ton()).map(q => Object.assign({}, q, { matiere:'maths' })); }
    const A = api(); return A.serieMatiere ? A.serieMatiere(n.mid, n.cid, nb, EXPERTS.includes(n.mid) ? 'Sup' : niveau()) : [];
  }
  function questionsMelange(mid, nb){
    const A = api();
    if(mid === 'maths') return window.MATHS ? MATHS.serie(niveauMaths(), nb, hasard(), ton()).map(q => Object.assign({}, q, { matiere:'maths' })) : [];
    if(EXPERTS.includes(mid)){ const l = notions(mid, true); return melanger(l.flatMap(n => questions(n, Math.ceil(nb / Math.max(1, l.length)) + 1))).slice(0, nb); }
    if(mid === 'tout'){ const p = Math.ceil(nb / 3); return melanger(questionsMelange('francais', p).concat(questionsMelange('langlais', p), questionsMelange('maths', p))).slice(0, nb); }
    return A.serieMatiere ? A.serieMatiere(mid, 'melange', nb, niveau()) : [];
  }
  // Leçon du jour : on tourne entre français, anglais et maths ; d'abord les notions qui ont une fiche rédigée, puis les autres.
  function leconDuJour(){
    const c = camp(), m = mission(); if(m.lecon && m.leconCle){ const [mid, cid] = m.leconCle.split('/'); const x = notions(mid, true).find(n => n.cid === cid); if(x) return x; }
    const ordre = ['francais', 'langlais', 'maths'], k = Object.keys(c.jours).length;
    for(let d = 0; d < 3; d++){ const mid = ordre[(k + d) % 3], l = notions(mid, false).filter(n => !c.acquis.includes(cle(n)));
      if(!l.length) continue; const F = window.AMI_COURS, avec = F ? l.filter(n => F.a(cle(n))) : [], x = (avec.length ? avec : l)[0];
      m.leconCle = cle(x); api().garder(); return x; }
    return null;
  }

  // ───── Fiche de cours ─────
  function essentielTire(n){ const vus = new Set(), out = [];
    for(const q of questions(n, 12)){ const r = String(q.regle || '').trim(); if(r && !vus.has(r)){ vus.add(r); out.push(r); } if(out.length >= 6) break; }
    return out; }
  function htmlFiche(n){
    const A = api(), esc = A.esc, F = window.AMI_COURS && AMI_COURS.get(cle(n));
    const liste = (t, l) => l && l.length ? '<h3>' + esc(tx(t)) + '</h3><ul>' + l.map(x => '<li>' + esc(x) + '</li>').join('') + '</ul>' : '';
    if(!F){ const e = essentielTire(n); return '<p class="petit">' + esc(tx('Pas encore de fiche rédigée : voici l’essentiel, tiré des questions.')) + '</p>' + liste('🧠 L’essentiel', e); }
    return liste('🧠 L’essentiel', F.essentiel) +
      (F.exemple ? '<h3>' + esc(tx('✏️ Exemple corrigé')) + '</h3><p><strong>' + esc(F.exemple.enonce) + '</strong></p><ol>' + F.exemple.etapes.map(x => '<li>' + esc(x) + '</li>').join('') + '</ol>' : '') +
      liste('🧭 Méthode', F.methode) + liste('⚠️ Pièges', F.pieges) + (F.vanne ? '<p class="vanne-fiche">🦜 ' + esc(F.vanne) + '</p>' : '');
  }
  function mesFiches(mid){ const C = window.AMI_CAHIER; if(!C) return []; const l = C.cahier().lecons; return mid ? l.filter(x => x.matiere === mid || (mid === 'mathematicien' && x.matiere === 'maths')) : l; }
  function ecranFiche(v, depuis){
    const A = api(), esc = A.esc, [mid, cid] = String(v || '').split('/'), n = notions(mid, true).find(x => x.cid === cid); if(!n) return base(mid);
    const c = camp(), acq = c.acquis.includes(cle(n)), perso = mesFiches(mid);
    A.poser(A.barre('matieres') + '<main class="coin-anglais matieres-ecran fiche-cours"><h2>' + esc((window.AMI_COURS && AMI_COURS.get(cle(n)) || {}).titre || n.nom) + (acq ? ' <small>' + esc(tx('✅ acquise')) + '</small>' : '') + '</h2>' +
      htmlFiche(n) +
      '<div class="actions"><button class="moyen plein" data-a="camp-entrainer" data-v="' + esc(cle(n) + '|' + (depuis || '')) + '">' + esc(tx('💪 M’entraîner (10 questions)')) + '</button> ' +
      '<button class="moyen" data-a="camp-sansfilet-notion" data-v="' + esc(cle(n)) + '">' + esc(tx('🪂 Sans filet')) + '</button> ' +
      (window.AMI_CAHIER ? '<button class="moyen" data-a="cahier-edit" data-v="">' + esc(tx('📒 Écrire ma fiche')) + '</button>' : '') + '</div>' +
      (perso.length ? '<h3>' + esc(tx('📒 Mes fiches ({0})', perso.length)) + '</h3><ul>' + perso.slice(0, 20).map(l => '<li><button class="petit-bouton" data-a="cahier-edit" data-v="' + esc(l.id) + '">' + esc(l.titre) + '</button></li>').join('') + '</ul>' : '') +
      '<div class="actions"><button class="moyen" data-a="' + (depuis === 'mission' ? 'camp' : 'camp-base') + '" data-v="' + esc(depuis === 'mission' ? '' : mid) + '">' + esc(tx('↩️ Retour au camp')) + '</button></div></main>');
  }
  function entrainer(v){
    const A = api(), [k, depuis] = String(v || '').split('|'), [mid, cid] = k.split('/'), n = notions(mid, true).find(x => x.cid === cid); if(!n) return accueil();
    const l = questions(n, 10); if(!l.length) return A.annonce ? (A.annonce(tx('Plus de questions de ce type pour l’instant.')), ecranFiche(k, depuis)) : ecranFiche(k, depuis);
    A.questionsGo(copie(l), { titre:'💪 ' + n.nom, retour:'matieres', prof:mid === 'maths', fin:z => {
      const c = camp(), ok = z.bonnes >= Math.ceil(z.liste.length * 0.7), esc = A.esc;
      if(ok && !c.acquis.includes(k)){ c.acquis.push(k); gagner(30); } else gagner(z.bonnes);
      if(depuis === 'mission') etapeFaite('lecon');
      A.poser(A.barre('matieres') + '<main class="centre"><div class="ami-moyen">' + A.ami(ok ? 'fete' : 'malin') + '</div><h2>' + esc(ok ? tx('Notion validée : {0} / {1}. +30 points !', z.bonnes, z.liste.length) : tx('Pas encore : {0} / {1}. Il en faut 7. Relis la fiche et retente : c’est comme ça qu’on progresse.', z.bonnes, z.liste.length)) + '</h2>' +
        '<div class="actions">' + (ok ? '' : '<button class="moyen" data-a="camp-fiche" data-v="' + esc(k + '|' + (depuis || '')) + '">' + esc(tx('📚 fiche')) + '</button> ') + '<button class="moyen plein" data-a="camp">' + esc(tx('↩️ Retour au camp')) + '</button></div></main>');
    } });
  }

  // ───── Séries sans filet ─────
  // Une erreur arrête la série : la vanne s'affiche, puis « suivante » mène au bilan.
  M.hooks.question.push((juste, q, z) => { if(z && z.sansFilet && !juste){ z.brise = true; z.liste = z.liste.slice(0, z.i + 1); } });
  const PHRASES_BRISEES = ['Série brisée ! Plumo te regarde au garde-à-vous… et retient un fou rire. On recommence ?', 'Cette réponse a sauté sans parachute. Toi, tu as encore le tien : remonte dans l’avion !', 'Une erreur, une seule… mais le sergent Plumo l’a vue. Vingt pompes ? Non : une autre série.'];
  function sansFilet(v, depuis){
    const A = api(), mid = String(v || 'tout'); let l, titre;
    if(mid.includes('/')){ const [m, cid] = mid.split('/'), n = notions(m, true).find(x => x.cid === cid); l = n ? questions(n, N_SANS_FILET) : []; titre = '🪂 ' + (n ? n.nom : ''); }
    else { l = questionsMelange(mid, N_SANS_FILET); const x = MATS.find(y => y[0] === mid); titre = '🪂 ' + (x ? tx(x[2]) : tx('Tout mélangé')); }
    if(!l.length) return accueil();
    A.questionsGo(copie(l), { titre, retour:'matieres', sansFilet:true, prof:mid === 'maths', finA:Date.now() + l.length * SECONDES_PAR_Q * 1000, fin:z => {
      const c = camp(), esc = A.esc, n = z.brise ? Math.max(0, z.bonnes) : z.bonnes, parfait = !z.brise && n === z.liste.length;
      const k = mid, record = n > (Math.floor(+c.records[k]) || 0); if(record) c.records[k] = n;
      gagner(n * 2 + (parfait ? 20 : 0)); if(depuis === 'mission') etapeFaite('commando');
      const phrase = parfait ? tx('Sans-faute ! Plumo range son sifflet : il n’a rien trouvé à redire. Respect, soldat. 🫡') : tx(PHRASES_BRISEES[Math.floor(Math.random() * PHRASES_BRISEES.length)]);
      A.poser(A.barre('matieres') + '<main class="centre fin-sans-filet"><div class="ami-moyen">' + A.ami(parfait ? 'fete' : 'malin') + '</div>' +
        '<h2>' + esc(parfait ? tx('Série parfaite : {0} / {0} !', n) : tx('Série arrêtée à {0} bonne(s) réponse(s).', n)) + (record && n ? ' ' + esc(tx('Nouveau record !')) : '') + '</h2><p>' + esc(phrase) + '</p>' +
        '<div class="actions"><button class="moyen plein" data-a="camp-sansfilet" data-v="' + esc(mid) + '">' + esc(tx('🔁 Recommencer')) + '</button> <button class="moyen" data-a="camp">' + esc(tx('↩️ Retour au camp')) + '</button></div></main>');
    } });
  }

  // ───── Mission du jour ─────
  function etapeSuivante(){
    const A = api(), m = mission(); const e = ETAPES.find(x => !m[x]); if(!e) return accueil();
    if(e === 'revision'){ const l = A.carnetAujourdhui('fr').slice(0, 10);
      if(!l.length){ etapeFaite('revision'); if(A.annonce) A.annonce(tx('Rien à revoir : étape validée.')); return accueil(); }
      return A.questionsGo(copie(l), { titre:tx('1. Revoir mes erreurs'), retour:'matieres', fin:z => { etapeFaite('revision'); gagner(z.bonnes); accueil(); } }); }
    if(e === 'lecon'){ const n = leconDuJour(); if(!n){ etapeFaite('lecon'); return accueil(); } return ecranFiche(cle(n), 'mission'); }
    if(e === 'commando') return sansFilet('tout', 'mission');
    if(e === 'fiches'){ const C = window.AMI_CAHIER, lec = mesFiches(''), l = C && lec.length ? melanger(C.questionsLocales(lec, '')).slice(0, 10) : [];
      if(!l.length){ etapeFaite('fiches'); if(A.annonce) A.annonce(tx('Pas de fiche perso avec « question = réponse » : étape validée. Écris-en une dans ton cahier pour la prochaine fois !')); return accueil(); }
      return A.questionsGo(copie(l), { titre:tx('4. Mes fiches perso'), retour:'matieres', fin:z => { etapeFaite('fiches'); gagner(z.bonnes); accueil(); } }); }
  }

  // ───── Séries d'examen : 20 questions au format de l'examen, 20 minutes, sans vanne pendant, note sur 20 et corrigé ─────
  const SERIES_EXAMEN = {
    brevet:{ parts:[['francais', '3e', 6], ['maths', '3e', 6], ['histoire', '3e', 4], ['svt', '3e', 2], ['physique', '3e', 2]] },
    eaf:{ parts:[['francais', '1re', 20]] },
    eam:{ parts:[['maths', '1re', 20]] },
    bac:{ parts:[['philo', 'Tle', 6], ['maths', 'Tle', 6], ['langlais', 'Tle', 4], ['histoire', 'Tle', 4]] },
    sup:{ parts:[['mathematicien', 'Sup', 7], ['geneticien', 'Sup', 7], ['geophysicien', 'Sup', 6]] }
  };
  const N_EXAMEN = 20, MINUTES_EXAMEN = 20;
  function questionsExamen(k){
    const S = SERIES_EXAMEN[k], A = api(); if(!S) return [];
    let l = [];
    for(const [mid, niv, n] of S.parts){
      if(mid === 'maths'){ if(window.MATHS && MATHS.NIVEAUX.includes(niv)) l = l.concat(MATHS.serie(niv, n, hasard(), ton()).map(q => Object.assign({}, q, { matiere:'maths' }))); continue; }
      if(EXPERTS.includes(mid)){ l = l.concat(questionsMelange(mid, n)); continue; }
      const Mx = MATR(); if(!Mx || !Mx.trouver(mid) || !Mx.chapitres(mid, niv).length || !A.serieMatiere) continue;
      l = l.concat(A.serieMatiere(mid, 'melange', n, niv));
    }
    // Si une matière manque, on complète avec la première pour garder 20 questions.
    if(l.length && l.length < N_EXAMEN){ const [mid, niv] = S.parts[0]; const plus = mid === 'maths' ? (window.MATHS ? MATHS.serie(niv, N_EXAMEN - l.length, hasard(), ton()).map(q => Object.assign({}, q, { matiere:'maths' })) : []) : EXPERTS.includes(mid) ? questionsMelange(mid, N_EXAMEN - l.length) : (A.serieMatiere ? A.serieMatiere(mid, 'melange', N_EXAMEN - l.length, niv) : []); l = l.concat(plus); }
    const vus = new Set(); return melanger(l.filter(q => { const c = q.enonce + '\u0001' + q.bon; if(vus.has(c)) return false; vus.add(c); return true; })).slice(0, N_EXAMEN);
  }
  const virg = n => String(n).replace('.', ',');
  function serieExamen(k){
    const A = api(), x = EXAMENS.find(e => e[0] === k), l = questionsExamen(k); if(!x || !l.length) return accueil();
    A.questionsGo(copie(l), { titre:'📝 ' + tx(x[1]), retour:'matieres', sansVanne:true, finA:Date.now() + MINUTES_EXAMEN * 60000, fin:z => {
      const c = camp(), esc = A.esc, n = z.liste.length, note = Math.round(z.bonnes / n * 40) / 2;
      c.examens = c.examens && typeof c.examens === 'object' ? c.examens : {};
      const e = c.examens[k] = c.examens[k] && typeof c.examens[k] === 'object' ? c.examens[k] : {}; e.derniere = note; e.meilleure = Math.max(+e.meilleure || 0, note);
      gagner(z.bonnes * 2 + (note >= 10 ? 20 : 0));
      const rep = new Map((z.reponses || []).map(r => [r.q, r])), fautes = z.liste.filter(q => !(rep.get(q) || {}).juste);
      const phrase = note >= 18 ? 'Plumo a lu ta copie trois fois pour trouver une faute. Il est reparti bredouille. Chapeau ! 🎩' : note >= 10 ? 'Plumo a sorti son stylo rouge, mais il a aussi vu de belles réponses. Le corrigé est là pour la suite. 🖍️' : 'Le stylo rouge de Plumo a bien travaillé aujourd’hui. Bonne nouvelle : chaque erreur corrigée ici ne sera plus faite le jour J. 💪';
      A.poser(A.barre('matieres') + '<main class="coin-anglais matieres-ecran fin-examen"><div class="ami-moyen">' + A.ami(note >= 10 ? 'fete' : 'malin') + '</div>' +
        '<h2>' + esc(tx('Note : {0} / 20', virg(note))) + '</h2><p>' + esc(tx('{0} bonne(s) réponse(s) sur {1}.', z.bonnes, n)) + '</p><p>' + esc(tx(phrase)) + '</p>' +
        '<h3>' + esc(tx('✏️ Corrigé')) + '</h3>' + (fautes.length ? '<ol class="corrige-examen">' + fautes.map(q => { const r = rep.get(q);
          return '<li><p><strong>' + esc(q.enonce || '') + '</strong></p><p>' + esc(tx('Ta réponse :')) + ' ' + esc(r ? r.choix : tx('Pas de réponse (temps écoulé)')) + '</p><p>' + esc(tx('Bonne réponse :')) + ' <strong>' + esc(q.bon) + '</strong></p>' + (q.regle ? '<p class="petit">' + esc(q.regle) + '</p>' : '') + '</li>'; }).join('') + '</ol>' : '<p>' + esc(tx('Tout est juste : rien à corriger.')) + '</p>') +
        '<div class="actions"><button class="moyen plein" data-a="camp-examen" data-v="' + esc(k) + '">' + esc(tx('🔁 Recommencer')) + '</button> <button class="moyen" data-a="camp">' + esc(tx('↩️ Retour au camp')) + '</button></div></main>');
    } });
  }

  // ───── Compte à rebours ─────
  function rebours(){ const o = camp().objectif, x = EXAMENS.find(e => e[0] === o.examen); if(!x || !x[0] || !/^\d{4}-\d{2}-\d{2}$/.test(o.date || '')) return '';
    const j = Math.round((new Date(o.date + 'T12:00:00') - new Date(aujourdhui() + 'T12:00:00')) / 864e5); if(j < 0) return '';
    return j === 0 ? tx('{0} : c’est aujourd’hui ! Respire, tu es prêt(e).', tx(x[1])) : tx('{0} : J−{1}', tx(x[1]), j); }

  // ───── Écrans ─────
  function accueil(){
    const A = api(), esc = A.esc, c = camp(), m = mission(), g = gradeDe(c.pts), p = prochainGrade(c.pts), n = leconDuJour(), rb = rebours();
    const ligne = (e, t) => '<li class="' + (m[e] ? 'fait' : '') + '">' + (m[e] ? '✅ ' : '⬜ ') + esc(t) + '</li>';
    A.poser(A.barre('matieres') + '<main class="coin-anglais matieres-ecran camp-ecran"><h2>' + esc(tx('🎖️ Camp d’entraînement')) + '</h2>' +
      '<div class="camp-grade"><p><strong>' + esc(tx('Grade : {0}', tx(g[1]))) + '</strong></p><p>' + esc(tx('{0} points · {1} jour(s) de service d’affilée', c.pts, c.serie)) + '</p>' +
      (p ? '<p class="petit">' + esc(tx('Prochain grade : {0} ({1} points)', tx(p[1]), p[0])) + '</p>' : '') + (rb ? '<p class="camp-rebours">⏳ ' + esc(rb) + '</p>' : '') + '</div>' +
      '<section><h3>' + esc(tx('🎯 Mission du jour')) + '</h3><ol class="camp-mission">' + ligne('revision', tx('1. Revoir mes erreurs')) + ligne('lecon', tx('2. Leçon du jour : {0}', n ? n.nom : '—')) +
      ligne('commando', tx('3. Série commando sans filet')) + ligne('fiches', tx('4. Mes fiches perso')) + '</ol>' +
      (m.fini ? '<p>' + esc(tx('✅ Mission accomplie ! Repos, soldat. Reviens demain pour la suivante.')) + '</p>' : '<div class="actions"><button class="gros plein" data-a="camp-etape">' + esc(tx('▶️ Étape suivante')) + '</button></div>') + '</section>' +
      '<section><h3>' + esc(tx('🪂 Séries sans filet')) + '</h3><div class="cartes-anglais">' + MATS.concat([['tout', '🎲', 'Tout mélangé']]).filter(x => x[0] === 'maths' || x[0] === 'tout' || (MATR() && MATR().trouver(x[0]))).map(x =>
        M.carte('camp-sansfilet', x[0], x[1], esc(tx(x[2])), esc(tx('Chrono serré, aucun indice : une erreur et la série s’arrête. Record : {0}.', Math.floor(+c.records[x[0]]) || 0)))).join('') + '</div></section>' +
      '<section><h3>' + esc(tx('📝 Séries d’examen')) + '</h3><div class="cartes-anglais">' + EXAMENS.filter(e => e[0]).sort((a, b) => (b[0] === c.objectif.examen) - (a[0] === c.objectif.examen)).map(e => { const ex = (c.examens || {})[e[0]];
        return M.carte('camp-examen', e[0], '📝', esc(tx(e[1])), esc(tx('20 questions au format de l’examen, 20 minutes, sans vanne ni correction pendant l’épreuve : note sur 20 et corrigé à la fin. Meilleure note : {0}.', ex && ex.meilleure != null ? virg(ex.meilleure) + ' / 20' : tx('— (pas encore)')))); }).join('') + '</div></section>' +
      '<section><div class="cartes-anglais">' + M.carte('camp-base', 'francais', '📚', esc(tx('📚 Base de connaissances')).replace(/^📚 /, ''), esc(tx('Toutes les notions du programme, avec leur fiche de cours, et tes propres fiches.'))) +
        M.carte('examens', '', '📝', esc(tx('📝 Examens blancs')).replace(/^📝 /, ''), '') + (window.AMI_CAHIER ? M.carte('cahier', '', '📒', esc(tx('📒 Mon cahier')).replace(/^📒 /, ''), '') : '') + '</div></section>' +
      '<section><h3>' + esc(tx('🗓️ Mon objectif')) + '</h3><p><label>' + esc(tx('Examen visé')) + ' <select id="camp-examen">' + EXAMENS.map(e => '<option value="' + e[0] + '"' + (e[0] === c.objectif.examen ? ' selected' : '') + '>' + esc(tx(e[1])) + '</option>').join('') + '</select></label> ' +
        '<label>' + esc(tx('Date de l’examen')) + ' <input id="camp-date" type="date" value="' + esc(c.objectif.date || '') + '"></label> <button class="petit-bouton" data-a="camp-objectif">' + esc(tx('Enregistrer')) + '</button></p></section></main>');
  }
  function base(v, toutes){
    const A = api(), esc = A.esc, mid = MATS.some(x => x[0] === v) ? v : 'francais', c = camp(), F = window.AMI_COURS;
    const l = notions(mid, !!toutes), perso = mesFiches(mid);
    A.poser(A.barre('matieres') + '<main class="coin-anglais matieres-ecran base-connaissances"><h2>' + esc(tx('📚 Base de connaissances')) + '</h2>' +
      '<div class="onglets-matieres" role="tablist">' + MATS.filter(x => x[0] === 'maths' || (MATR() && MATR().trouver(x[0]))).map(x => '<button class="onglet' + (x[0] === mid ? ' actif' : '') + '" role="tab" aria-selected="' + (x[0] === mid) + '"' + (x[0] === mid ? '' : ' data-a="camp-base" data-v="' + x[0] + '"') + '>' + x[1] + ' ' + esc(tx(x[2])) + '</button>').join('') + '</div>' +
      (EXPERTS.includes(mid) ? '' : '<p>' + esc(tx('Classe : {0}', mid === 'maths' ? niveauMaths() : niveau())) + ' · <button class="petit-bouton" data-a="' + (toutes ? 'camp-base' : 'camp-base-tout') + '" data-v="' + mid + '">' + esc(tx(toutes ? 'Ma classe seulement' : 'Toutes les classes')) + '</button></p>') +
      '<ul class="liste-notions">' + l.map(n => '<li><button class="petit-bouton" data-a="camp-fiche" data-v="' + esc(cle(n)) + '">' + esc(n.nom) + '</button>' + (toutes ? ' <small>(' + esc(n.niv) + ')</small>' : '') +
        (F && F.a(cle(n)) ? ' <small>' + esc(tx('📚 fiche')) + '</small>' : '') + (c.acquis.includes(cle(n)) ? ' <small>' + esc(tx('✅ acquise')) + '</small>' : '') + '</li>').join('') + '</ul>' +
      '<h3>' + esc(tx('📒 Mes fiches ({0})', perso.length)) + '</h3>' + (perso.length ? '<ul>' + perso.slice(0, 50).map(x => '<li><button class="petit-bouton" data-a="cahier-edit" data-v="' + esc(x.id) + '">' + esc(x.titre) + '</button></li>').join('') + '</ul>' : '<p class="petit">' + esc(tx('Tu n’as pas encore écrit de fiche. Écris-en une : ce qu’on reformule soi-même, on le retient.')) + '</p>') +
      (window.AMI_CAHIER ? '<div class="actions"><button class="moyen" data-a="cahier-edit" data-v="">' + esc(tx('📒 Écrire ma fiche')) + '</button></div>' : '') +
      '<div class="actions"><button class="moyen" data-a="camp">' + esc(tx('↩️ Retour au camp')) + '</button></div></main>');
  }

  const carteCamp = () => '<div class="cartes-anglais">' + M.carte('camp', '', '🎖️', api().esc(tx('🎖️ Camp d’entraînement')).replace(/^🎖️ /, ''), api().esc(tx('Mission du jour, séries sans filet, fiches de cours : l’entraînement intensif pour réussir ses examens.'))) + '</div>';
  M.cartes.matiere.unshift(carteCamp);
  M.cartes.maths.unshift(carteCamp);
  M.cartes.maths.push(() => MATR() && MATR().trouver('mathematicien') ? '<div class="cartes-anglais">' + M.carte('matiere', 'mathematicien', '🧠', api().esc(tx('Niveau mathématicien')), api().esc(tx('Raisonnement, arithmétique, nombres complexes : au-delà du programme.'))) + '</div>' : '');

  Object.assign(M.actions, {
    'camp':() => accueil(),
    'camp-etape':() => etapeSuivante(),
    'camp-base':v => base(v, false), 'camp-base-tout':v => base(v, true),
    'camp-fiche':v => { const [k, d] = String(v || '').split('|'); return ecranFiche(k, d); },
    'camp-entrainer':v => entrainer(v),
    'camp-examen':v => serieExamen(v),
    'camp-sansfilet':v => sansFilet(v), 'camp-sansfilet-notion':v => sansFilet(v),
    'camp-objectif':() => { const A = api(), c = camp(), d = document, e = d.getElementById('camp-examen'), t = d.getElementById('camp-date');
      const ex = e && EXAMENS.some(x => x[0] === e.value) ? e.value : '', da = t && /^\d{4}-\d{2}-\d{2}$/.test(t.value) ? t.value : '';
      c.objectif = { examen:ex, date:da }; A.garder(); return accueil(); }
  });
  window.AMI_CAMP = { SERIES_EXAMEN, questionsExamen, serieExamen, GRADES, gradeDe, camp, mission, notions, leconDuJour, accueil, base, sansFilet, etapeSuivante, validerJour };
})();
