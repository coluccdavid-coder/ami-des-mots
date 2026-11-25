// Ami des mots — v6.35 : aide aux devoirs avec l'IA, dans toutes les matières (serveur-php/devoirs.php).
// L'IA ne fait pas le devoir : elle reformule la consigne, rappelle la leçon, propose une méthode, pose des questions
// et relit le travail de l'élève. Ton sérieux : sur cet écran, ni vanne ni blague de Plumo.
// L'élève colle l'énoncé ou envoie une photo / un PDF. Payé en plumes si les plumes sont allumées (coût affiché avant l'envoi).
// Sans serveur : une méthode de travail par matière, sans IA. Rien n'est gardé sur l'appareil ni sur le serveur.
(function(){
  'use strict';
  const M = window.AMI_MODULES; if(!M) return;
  M.textes({
    "Lis la consigne deux fois et souligne les verbes (calcule, justifie, décris, compare…).": ["Read the instructions twice and underline the verbs (calculate, justify, describe, compare…).", "Lee el enunciado dos veces y subraya los verbos (calcula, justifica, describe, compara…).", "Lies die Aufgabe zweimal und unterstreiche die Verben (berechne, begründe, beschreibe, vergleiche …).", "Leggi la consegna due volte e sottolinea i verbi (calcola, giustifica, descrivi, confronta…).", "Lê o enunciado duas vezes e sublinha os verbos (calcula, justifica, descreve, compara…)."],
    "Retrouve dans ton cahier la leçon qui correspond, et relis l’exemple fait en classe.": ["Find the matching lesson in your exercise book and reread the example done in class.", "Busca en tu cuaderno la lección correspondiente y relee el ejemplo hecho en clase.", "Such in deinem Heft den passenden Stoff und lies das Beispiel aus dem Unterricht noch einmal.", "Ritrova sul quaderno la lezione corrispondente e rileggi l’esempio fatto in classe.", "Procura no caderno a matéria correspondente e relê o exemplo feito na aula."],
    "Fais un brouillon : note ce que tu sais et ce qu’on te demande.": ["Make a rough draft: write down what you know and what you are asked.", "Haz un borrador: anota lo que sabes y lo que te piden.", "Mach einen Entwurf: Notiere, was du weißt und was verlangt wird.", "Fai una brutta copia: annota ciò che sai e ciò che ti chiedono.", "Faz um rascunho: anota o que sabes e o que te pedem."],
    "Avance question par question, et relis-toi avant de rendre.": ["Go question by question, and check your work before handing it in.", "Avanza pregunta por pregunta y revisa antes de entregar.", "Geh Frage für Frage vor und lies alles vor dem Abgeben noch einmal durch.", "Procedi domanda per domanda e rileggi prima di consegnare.", "Avança pergunta a pergunta e revê antes de entregar."],
    "Écris les données de l’énoncé et ce qu’on cherche.": ["Write down the given data and what you are looking for.", "Escribe los datos del enunciado y lo que se busca.", "Schreib die gegebenen Größen und das Gesuchte auf.", "Scrivi i dati del testo e ciò che si cerca.", "Escreve os dados do enunciado e o que se procura."],
    "Cherche la propriété ou la formule du cours qui relie les deux.": ["Look for the property or formula from the lesson that links them.", "Busca la propiedad o la fórmula de la lección que los relaciona.", "Such die Eigenschaft oder Formel aus dem Unterricht, die beides verbindet.", "Cerca la proprietà o la formula della lezione che li collega.", "Procura a propriedade ou a fórmula da matéria que os liga."],
    "Fais un schéma si c’est de la géométrie, avec les codages.": ["Draw a diagram if it is geometry, with the markings.", "Haz un esquema si es geometría, con las marcas.", "Zeichne bei Geometrie eine Skizze mit den Markierungen.", "Fai uno schema se è geometria, con i segni.", "Faz um esquema se for geometria, com as marcas."],
    "Vérifie l’ordre de grandeur et l’unité de ton résultat.": ["Check the order of magnitude and the unit of your result.", "Comprueba el orden de magnitud y la unidad de tu resultado.", "Prüf die Größenordnung und die Einheit deines Ergebnisses.", "Controlla l’ordine di grandezza e l’unità del risultato.", "Verifica a ordem de grandeza e a unidade do resultado."],
    "Note les grandeurs données avec leur unité, et celle qu’on cherche.": ["Write down the given quantities with their units, and the one you are looking for.", "Anota las magnitudes dadas con su unidad y la que se busca.", "Notiere die gegebenen Größen mit Einheit und die gesuchte Größe.", "Annota le grandezze date con la loro unità e quella cercata.", "Anota as grandezas dadas com a unidade e a que se procura."],
    "Retrouve la relation du cours (par exemple U = R × I) et vérifie les unités.": ["Find the relationship from the lesson (for example U = R × I) and check the units.", "Busca la relación de la lección (por ejemplo U = R × I) y comprueba las unidades.", "Such die Beziehung aus dem Unterricht (zum Beispiel U = R × I) und prüf die Einheiten.", "Ritrova la relazione della lezione (per esempio U = R × I) e controlla le unità.", "Procura a relação da matéria (por exemplo U = R × I) e verifica as unidades."],
    "Calcule en gardant les unités, puis fais une phrase de conclusion.": ["Calculate keeping the units, then write a concluding sentence.", "Calcula conservando las unidades y luego escribe una frase de conclusión.", "Rechne mit Einheiten und schreib dann einen Antwortsatz.", "Calcola mantenendo le unità, poi scrivi una frase di conclusione.", "Calcula mantendo as unidades e depois escreve uma frase de conclusão."],
    "Observe le document : titre, légende, axes, unités.": ["Look at the document: title, key, axes, units.", "Observa el documento: título, leyenda, ejes, unidades.", "Sieh dir das Material an: Titel, Legende, Achsen, Einheiten.", "Osserva il documento: titolo, legenda, assi, unità.", "Observa o documento: título, legenda, eixos, unidades."],
    "Décris ce que tu vois avec des valeurs, avant d’expliquer.": ["Describe what you see with values before explaining.", "Describe lo que ves con valores antes de explicar.", "Beschreib mit Werten, was du siehst, bevor du erklärst.", "Descrivi ciò che vedi con dei valori prima di spiegare.", "Descreve o que vês com valores antes de explicar."],
    "Relie l’observation à la notion du cours, puis conclus en une phrase.": ["Link what you observe to the lesson, then conclude in one sentence.", "Relaciona la observación con la lección y concluye en una frase.", "Verbinde die Beobachtung mit dem Unterrichtsstoff und fass in einem Satz zusammen.", "Collega l’osservazione alla lezione, poi concludi in una frase.", "Liga a observação à matéria e conclui numa frase."],
    "Repère le type d’exercice : questions sur un texte, rédaction, grammaire, réécriture.": ["Identify the type of exercise: questions on a text, writing, grammar, rewriting.", "Identifica el tipo de ejercicio: preguntas sobre un texto, redacción, gramática, reescritura.", "Erkenne die Aufgabenart: Fragen zu einem Text, Aufsatz, Grammatik, Umschreiben.", "Individua il tipo di esercizio: domande su un testo, tema, grammatica, riscrittura.", "Identifica o tipo de exercício: perguntas sobre um texto, redação, gramática, reescrita."],
    "Pour une rédaction : liste tes idées, fais un plan, puis écris paragraphe par paragraphe.": ["For a piece of writing: list your ideas, make a plan, then write paragraph by paragraph.", "Para una redacción: haz una lista de ideas, un plan y escribe párrafo a párrafo.", "Für einen Aufsatz: Sammle Ideen, mach einen Plan und schreib Absatz für Absatz.", "Per un tema: elenca le idee, fai una scaletta, poi scrivi paragrafo per paragrafo.", "Para uma redação: lista as ideias, faz um plano e escreve parágrafo a parágrafo."],
    "Relis-toi en trois passages : le sens, les accords, la ponctuation.": ["Check your work three times: meaning, agreement, punctuation.", "Revisa en tres pasadas: el sentido, las concordancias, la puntuación.", "Lies dreimal Korrektur: Sinn, Übereinstimmung, Zeichensetzung.", "Rileggi in tre passaggi: il senso, gli accordi, la punteggiatura.", "Revê em três passagens: o sentido, as concordâncias, a pontuação."],
    "Pour un document : nature, auteur, date, sujet.": ["For a document: type, author, date, subject.", "Para un documento: tipo, autor, fecha, tema.", "Für eine Quelle: Art, Verfasser, Datum, Thema.", "Per un documento: natura, autore, data, argomento.", "Para um documento: tipo, autor, data, assunto."],
    "Place les repères : date, lieu, acteurs.": ["Set out the key points: date, place, people involved.", "Sitúa las referencias: fecha, lugar, protagonistas.", "Ordne ein: Datum, Ort, Beteiligte.", "Colloca i riferimenti: data, luogo, protagonisti.", "Situa as referências: data, lugar, intervenientes."],
    "Réponds avec des phrases complètes et les mots du cours.": ["Answer in full sentences, using the words from the lesson.", "Responde con frases completas y las palabras de la lección.", "Antworte in ganzen Sätzen mit den Fachbegriffen.", "Rispondi con frasi complete e con le parole della lezione.", "Responde com frases completas e as palavras da matéria."],
    "Repère le temps à utiliser et le vocabulaire du thème.": ["Identify the tense to use and the topic vocabulary.", "Identifica el tiempo que hay que usar y el vocabulario del tema.", "Erkenne die richtige Zeitform und den Wortschatz zum Thema.", "Individua il tempo da usare e il lessico del tema.", "Identifica o tempo verbal a usar e o vocabulário do tema."],
    "Écris des phrases simples et justes plutôt que longues.": ["Write simple, correct sentences rather than long ones.", "Escribe frases sencillas y correctas en lugar de largas.", "Schreib lieber einfache, richtige Sätze als lange.", "Scrivi frasi semplici e corrette piuttosto che lunghe.", "Escreve frases simples e corretas em vez de longas."],
    "Relis les accords, la conjugaison et l’ordre des mots.": ["Check agreement, verb forms and word order.", "Revisa las concordancias, la conjugación y el orden de las palabras.", "Prüf Übereinstimmung, Konjugation und Wortstellung.", "Rileggi gli accordi, la coniugazione e l’ordine delle parole.", "Revê as concordâncias, a conjugação e a ordem das palavras."],
    '📚 Aide aux devoirs': ['📚 Homework help', '📚 Ayuda con los deberes', '📚 Hausaufgabenhilfe', '📚 Aiuto compiti', '📚 Ajuda nos trabalhos de casa'],
    'Toutes les matières : l’IA t’aide à comprendre et à t’organiser, sans faire le devoir à ta place': ['All subjects: the AI helps you understand and get organised, without doing your homework for you', 'Todas las asignaturas: la IA te ayuda a entender y organizarte, sin hacer los deberes por ti', 'Alle Fächer: Die KI hilft dir beim Verstehen und Planen, ohne deine Hausaufgaben zu machen', 'Tutte le materie: l’IA ti aiuta a capire e organizzarti, senza fare i compiti al posto tuo', 'Todas as disciplinas: a IA ajuda-te a perceber e a organizar-te, sem fazer o trabalho por ti'],
    'Ici, l’IA ne fait pas ton devoir : elle t’aide à comprendre la consigne, à retrouver ta leçon et à trouver la méthode. C’est toi qui écris la réponse.': ['Here, the AI does not do your homework: it helps you understand the task, find your lesson and work out the method. You write the answer.', 'Aquí la IA no hace tus deberes: te ayuda a entender el enunciado, encontrar tu lección y dar con el método. La respuesta la escribes tú.', 'Hier macht die KI nicht deine Hausaufgaben: Sie hilft dir, die Aufgabe zu verstehen, deinen Stoff wiederzufinden und die Methode zu finden. Die Antwort schreibst du.', 'Qui l’IA non fa i tuoi compiti: ti aiuta a capire la consegna, ritrovare la lezione e trovare il metodo. La risposta la scrivi tu.', 'Aqui a IA não faz o teu trabalho: ajuda-te a perceber o enunciado, a encontrar a matéria e o método. A resposta escreves tu.'],
    'Matière': ['Subject', 'Asignatura', 'Fach', 'Materia', 'Disciplina'],
    'Autre matière': ['Other subject', 'Otra asignatura', 'Anderes Fach', 'Altra materia', 'Outra disciplina'],
    'Colle ici l’énoncé de ton devoir': ['Paste your homework instructions here', 'Pega aquí el enunciado de tus deberes', 'Füge hier deine Aufgabe ein', 'Incolla qui la consegna dei compiti', 'Cola aqui o enunciado do trabalho'],
    'ou envoie une photo ou un PDF de l’énoncé': ['or send a photo or a PDF of the instructions', 'o envía una foto o un PDF del enunciado', 'oder schick ein Foto oder ein PDF der Aufgabe', 'oppure invia una foto o un PDF della consegna', 'ou envia uma foto ou um PDF do enunciado'],
    '🔒 Photographie seulement la feuille : pas de visage, pas de nom. L’énoncé part à l’IA pour t’aider, puis il est oublié.': ['🔒 Only photograph the sheet: no faces, no names. The instructions go to the AI to help you, then they are forgotten.', '🔒 Fotografía solo la hoja: sin caras ni nombres. El enunciado va a la IA para ayudarte y luego se olvida.', '🔒 Fotografiere nur das Blatt: keine Gesichter, keine Namen. Die Aufgabe geht an die KI, um dir zu helfen, und wird danach vergessen.', '🔒 Fotografa solo il foglio: niente volti, niente nomi. La consegna va all’IA per aiutarti, poi viene dimenticata.', '🔒 Fotografa só a folha: sem caras, sem nomes. O enunciado vai para a IA para te ajudar e depois é esquecido.'],
    '🤖 L’IA peut se tromper : vérifie avec ta leçon, et demande à ton professeur en cas de doute.': ['🤖 The AI can make mistakes: check with your lesson, and ask your teacher if in doubt.', '🤖 La IA puede equivocarse: compruébalo con tu lección y pregunta a tu profesor si dudas.', '🤖 Die KI kann sich irren: Prüf es mit deinem Unterrichtsstoff und frag im Zweifel deine Lehrkraft.', '🤖 L’IA può sbagliare: controlla con la lezione e chiedi all’insegnante se hai dubbi.', '🤖 A IA pode enganar-se: confirma com a matéria e pergunta ao professor em caso de dúvida.'],
    '🧭 M’aider à démarrer': ['🧭 Help me get started', '🧭 Ayúdame a empezar', '🧭 Hilf mir beim Anfangen', '🧭 Aiutami a iniziare', '🧭 Ajuda-me a começar'],
    'Coût : {0} plumes ({1} avec une photo ou un PDF).': ['Cost: {0} feathers ({1} with a photo or a PDF).', 'Coste: {0} plumas ({1} con una foto o un PDF).', 'Kosten: {0} Federn ({1} mit Foto oder PDF).', 'Costo: {0} piume ({1} con una foto o un PDF).', 'Custo: {0} penas ({1} com uma foto ou um PDF).'],
    '⏳ Lecture de ton devoir…': ['⏳ Reading your homework…', '⏳ Leyendo tus deberes…', '⏳ Deine Aufgabe wird gelesen…', '⏳ Sto leggendo i compiti…', '⏳ A ler o teu trabalho…'],
    'Colle l’énoncé ou ajoute une photo.': ['Paste the instructions or add a photo.', 'Pega el enunciado o añade una foto.', 'Füge die Aufgabe ein oder hänge ein Foto an.', 'Incolla la consegna o aggiungi una foto.', 'Cola o enunciado ou junta uma foto.'],
    'Ce fichier est trop lourd (4 Mo au plus) ou d’un type non accepté (photo ou PDF).': ['This file is too big (4 MB max) or not an accepted type (photo or PDF).', 'Este archivo es demasiado grande (4 MB como máximo) o no es de un tipo aceptado (foto o PDF).', 'Diese Datei ist zu groß (höchstens 4 MB) oder kein erlaubter Typ (Foto oder PDF).', 'Questo file è troppo grande (max 4 MB) o non è di un tipo accettato (foto o PDF).', 'Este ficheiro é demasiado grande (4 MB no máximo) ou não é de um tipo aceite (foto ou PDF).'],
    'Fichier prêt : {0}': ['File ready: {0}', 'Archivo listo: {0}', 'Datei bereit: {0}', 'File pronto: {0}', 'Ficheiro pronto: {0}'],
    'Plus de plumes magiques : demande à un adulte (écran ✨ Plus).': ['No magic feathers left: ask an adult (✨ Plus screen).', 'No quedan plumas mágicas: pide ayuda a un adulto (pantalla ✨ Plus).', 'Keine Zauberfedern mehr: Frag einen Erwachsenen (Bildschirm ✨ Plus).', 'Piume magiche finite: chiedi a un adulto (schermata ✨ Plus).', 'Acabaram as penas mágicas: pede a um adulto (ecrã ✨ Plus).'],
    'Trop de demandes d’un coup : attends une minute.': ['Too many requests at once: wait a minute.', 'Demasiadas peticiones a la vez: espera un minuto.', 'Zu viele Anfragen auf einmal: Warte eine Minute.', 'Troppe richieste insieme: aspetta un minuto.', 'Demasiados pedidos de uma vez: espera um minuto.'],
    'L’aide n’est pas disponible pour l’instant. Réessaie plus tard.': ['Help is not available right now. Try again later.', 'La ayuda no está disponible ahora. Inténtalo más tarde.', 'Die Hilfe ist gerade nicht verfügbar. Versuch es später noch einmal.', 'L’aiuto non è disponibile ora. Riprova più tardi.', 'A ajuda não está disponível agora. Tenta mais tarde.'],
    '🎯 Ce qu’on te demande': ['🎯 What you are asked to do', '🎯 Lo que te piden', '🎯 Was von dir verlangt wird', '🎯 Che cosa ti chiedono', '🎯 O que te pedem'],
    '📘 La leçon à revoir': ['📘 The lesson to review', '📘 La lección que repasar', '📘 Der Stoff zum Wiederholen', '📘 La lezione da ripassare', '📘 A matéria a rever'],
    '🪜 La méthode, étape par étape': ['🪜 The method, step by step', '🪜 El método, paso a paso', '🪜 Die Methode, Schritt für Schritt', '🪜 Il metodo, passo dopo passo', '🪜 O método, passo a passo'],
    '❓ Pour t’aider à avancer': ['❓ To help you move forward', '❓ Para ayudarte a avanzar', '❓ Damit du weiterkommst', '❓ Per aiutarti ad andare avanti', '❓ Para te ajudar a avançar'],
    '✅ Avant de rendre, vérifie': ['✅ Before handing in, check', '✅ Antes de entregar, comprueba', '✅ Vor dem Abgeben prüfen', '✅ Prima di consegnare, controlla', '✅ Antes de entregar, verifica'],
    'Une question sur une étape ?': ['A question about a step?', '¿Una pregunta sobre un paso?', 'Eine Frage zu einem Schritt?', 'Una domanda su un passaggio?', 'Uma pergunta sobre um passo?'],
    'Demander': ['Ask', 'Preguntar', 'Fragen', 'Chiedi', 'Perguntar'],
    'Tu as écrit ta réponse ? Colle-la ici pour la faire relire.': ['Written your answer? Paste it here to have it checked.', '¿Has escrito tu respuesta? Pégala aquí para que la revisen.', 'Antwort geschrieben? Füge sie hier ein, um sie prüfen zu lassen.', 'Hai scritto la risposta? Incollala qui per farla rileggere.', 'Escreveste a tua resposta? Cola-a aqui para a rever.'],
    '🔍 Faire relire': ['🔍 Get it checked', '🔍 Que la revisen', '🔍 Prüfen lassen', '🔍 Fai rileggere', '🔍 Pedir revisão'],
    '({0} plumes)': ['({0} feathers)', '({0} plumas)', '({0} Federn)', '({0} piume)', '({0} penas)'],
    '({0} plume)': ['({0} feather)', '({0} pluma)', '({0} Feder)', '({0} piuma)', '({0} pena)'],
    '👍 Ce qui est réussi': ['👍 What works', '👍 Lo que está bien', '👍 Was gelungen ist', '👍 Cosa va bene', '👍 O que está bem'],
    '🔎 À revoir': ['🔎 To look at again', '🔎 Para revisar', '🔎 Noch einmal ansehen', '🔎 Da rivedere', '🔎 A rever'],
    '🛠️ Comment t’y prendre': ['🛠️ How to go about it', '🛠️ Cómo hacerlo', '🛠️ Wie du vorgehst', '🛠️ Come procedere', '🛠️ Como fazer'],
    'L’aide par l’IA arrive avec le serveur du jeu. En attendant, voici une méthode pour bien démarrer :': ['AI help comes with the game server. Meanwhile, here is a method to get started:', 'La ayuda por IA llega con el servidor del juego. Mientras tanto, aquí tienes un método para empezar bien:', 'Die KI-Hilfe kommt mit dem Spielserver. Bis dahin hier eine Methode für einen guten Start:', 'L’aiuto dell’IA arriva con il server del gioco. Nel frattempo, ecco un metodo per partire bene:', 'A ajuda por IA chega com o servidor do jogo. Entretanto, aqui fica um método para começar bem:']
  });
  const tx = M.tx, api = () => M.api;
  const COUT = { aide:3, fichier:2, suite:1, relire:3 };
  let dernier = null, fichier = null;

  // Méthodes sans IA, par famille de matières.
  const METHODES = {
    commun:['Lis la consigne deux fois et souligne les verbes (calcule, justifie, décris, compare…).', 'Retrouve dans ton cahier la leçon qui correspond, et relis l’exemple fait en classe.', 'Fais un brouillon : note ce que tu sais et ce qu’on te demande.', 'Avance question par question, et relis-toi avant de rendre.'],
    maths:['Écris les données de l’énoncé et ce qu’on cherche.', 'Cherche la propriété ou la formule du cours qui relie les deux.', 'Fais un schéma si c’est de la géométrie, avec les codages.', 'Vérifie l’ordre de grandeur et l’unité de ton résultat.'],
    physique:['Note les grandeurs données avec leur unité, et celle qu’on cherche.', 'Retrouve la relation du cours (par exemple U = R × I) et vérifie les unités.', 'Calcule en gardant les unités, puis fais une phrase de conclusion.'],
    svt:['Observe le document : titre, légende, axes, unités.', 'Décris ce que tu vois avec des valeurs, avant d’expliquer.', 'Relie l’observation à la notion du cours, puis conclus en une phrase.'],
    francais:['Repère le type d’exercice : questions sur un texte, rédaction, grammaire, réécriture.', 'Pour une rédaction : liste tes idées, fais un plan, puis écris paragraphe par paragraphe.', 'Relis-toi en trois passages : le sens, les accords, la ponctuation.'],
    histoire:['Pour un document : nature, auteur, date, sujet.', 'Place les repères : date, lieu, acteurs.', 'Réponds avec des phrases complètes et les mots du cours.'],
    langues:['Repère le temps à utiliser et le vocabulaire du thème.', 'Écris des phrases simples et justes plutôt que longues.', 'Relis les accords, la conjugaison et l’ordre des mots.']
  };
  const famille = id => ({ maths:'maths', physique:'physique', techno:'physique', svt:'svt', francais:'francais', philo:'francais', hlp:'francais', lca:'francais', histoire:'histoire', hggsp:'histoire', ses:'histoire', langlais:'langues', lespagnol:'langues', lallemand:'langues' })[id] || 'commun';

  function matieres(){
    const Ms = window.MATIERES, e = api().etatMatieres(), c = e.classe, l = [];
    if(window.MATHS) l.push(['maths', '🔢 ' + api().TXT('Maths')]);
    for(const m of (Ms && Ms.LISTE) || []) if(m.chapitres && m.chapitres.length && (!c || Ms.chapitres(m.id, c).length)) l.push([m.id, (m.ic ? m.ic + ' ' : '') + Ms.nom(m)]);
    l.push(['autre', tx('Autre matière')]); return l;
  }
  const plumesTx = n => tx(n > 1 ? '({0} plumes)' : '({0} plume)', n);
  const cout = k => api().plumesActives() ? ' ' + plumesTx(COUT[k]) : '';
  const liste = l => '<ul class="devoirs-liste">' + (l || []).map(x => '<li>' + api().esc(x) + '</li>').join('') + '</ul>';

  function ecran(){
    const A = api(), esc = A.esc, e = A.etatMatieres(), d = e.derniere || 'francais'; fichier = null; dernier = null;
    const opts = matieres().map(([id, n]) => '<option value="' + esc(id) + '"' + (id === d ? ' selected' : '') + '>' + esc(n) + '</option>').join('');
    const serveur = !!M.serveur('devoirs.php');
    A.poser(A.barre('matieres') + '<main class="coin-anglais devoirs"><h2>' + tx('📚 Aide aux devoirs') + '</h2>' +
      '<p class="pieges-intro">' + tx('Ici, l’IA ne fait pas ton devoir : elle t’aide à comprendre la consigne, à retrouver ta leçon et à trouver la méthode. C’est toi qui écris la réponse.') + '</p>' +
      '<p><label>' + tx('Matière') + ' <select id="dev-matiere">' + opts + '</select></label>' + (e.classe ? ' <span class="petit">🎒 ' + esc(e.classe === 'Sup' ? A.TXT('Après le bac') : e.classe) + '</span>' : '') + '</p>' +
      (serveur ? '<p><label>' + tx('Colle ici l’énoncé de ton devoir') + '<textarea id="dev-enonce" rows="7" maxlength="4000"></textarea></label></p>' +
        '<p><label>' + tx('ou envoie une photo ou un PDF de l’énoncé') + ' <input id="dev-fichier" type="file" accept="image/jpeg,image/png,image/webp,image/heic,application/pdf"></label></p><p id="dev-fichier-etat" class="petit" role="status"></p>' +
        '<p class="petit">' + tx('🔒 Photographie seulement la feuille : pas de visage, pas de nom. L’énoncé part à l’IA pour t’aider, puis il est oublié.') + '</p>' +
        '<p class="petit">' + tx('🤖 L’IA peut se tromper : vérifie avec ta leçon, et demande à ton professeur en cas de doute.') + '</p>' +
        (A.plumesActives() ? '<p class="petit">' + tx('Coût : {0} plumes ({1} avec une photo ou un PDF).', COUT.aide, COUT.aide + COUT.fichier) + '</p>' : '') +
        '<p><button class="gros" data-a="devoirs-aide">' + tx('🧭 M’aider à démarrer') + '</button></p>'
      : '<p>' + tx('L’aide par l’IA arrive avec le serveur du jeu. En attendant, voici une méthode pour bien démarrer :') + '</p><div id="dev-methode"></div>') +
      '<div id="dev-resultat" role="status" aria-live="polite"></div></main>');
    const sel = document.getElementById('dev-matiere'), meth = () => { const z = document.getElementById('dev-methode'); if(z) z.innerHTML = liste(METHODES.commun.concat(famille(sel.value) === 'commun' ? [] : METHODES[famille(sel.value)]).map(x => tx(x))); };
    if(sel) sel.addEventListener('change', meth); meth();
    const f = document.getElementById('dev-fichier'); if(f) f.addEventListener('change', () => preparer(f.files && f.files[0]));
  }

  // Une photo est réduite (1 600 px, JPEG) avant l'envoi ; un PDF part tel quel (4 Mo au plus).
  function lireBase64(blob){ return new Promise((ok, ko) => { const r = new FileReader(); r.onload = () => ok(String(r.result).split(',')[1] || ''); r.onerror = ko; r.readAsDataURL(blob); }); }
  async function preparer(f){
    const z = document.getElementById('dev-fichier-etat'); fichier = null; if(!f){ if(z) z.textContent = ''; return; }
    const pdf = f.type === 'application/pdf', image = /^image\//.test(f.type);
    if((!pdf && !image) || f.size > (pdf ? 4 : 15) * 1024 * 1024){ if(z) z.textContent = tx('Ce fichier est trop lourd (4 Mo au plus) ou d’un type non accepté (photo ou PDF).'); return; }
    try{
      if(pdf) fichier = { type:'application/pdf', data:await lireBase64(f) };
      else {
        const url = URL.createObjectURL(f), img = await new Promise((ok, ko) => { const i = new Image(); i.onload = () => ok(i); i.onerror = ko; i.src = url; });
        const k = Math.min(1, 1600 / Math.max(img.naturalWidth || 1, img.naturalHeight || 1)), c = document.createElement('canvas');
        c.width = Math.round((img.naturalWidth || 1) * k); c.height = Math.round((img.naturalHeight || 1) * k); c.getContext('2d').drawImage(img, 0, 0, c.width, c.height); URL.revokeObjectURL(url);
        fichier = { type:'image/jpeg', data:c.toDataURL('image/jpeg', .82).split(',')[1] || '' };
      }
      if(fichier && fichier.data.length > 5600000){ fichier = null; throw new Error('lourd'); }
      if(z) z.textContent = tx('Fichier prêt : {0}', f.name);
    }catch(e){ fichier = null; if(z) z.textContent = tx('Ce fichier est trop lourd (4 Mo au plus) ou d’un type non accepté (photo ou PDF).'); }
  }

  const erreur = r => tx(r.statut === 402 ? 'Plus de plumes magiques : demande à un adulte (écran ✨ Plus).' : r.statut === 400 ? 'Colle l’énoncé ou ajoute une photo.' : r.statut === 429 ? 'Trop de demandes d’un coup : attends une minute.' : 'L’aide n’est pas disponible pour l’instant. Réessaie plus tard.');
  function corps(mode, extra){
    const A = api(), e = A.etatMatieres(), sel = document.getElementById('dev-matiere'), id = sel ? sel.value : 'autre';
    const nom = (matieres().find(x => x[0] === id) || [id, id])[1].replace(/^\S+\s/, '');
    return Object.assign({ mode, matiere:id, nom_matiere:nom, niveau:e.classe || e.niveau, langue:A.base().ui }, extra, A.codePlumes());
  }
  async function aide(){
    const A = api(), esc = A.esc, z = document.getElementById('dev-resultat'), t = String((document.getElementById('dev-enonce') || {}).value || '').trim();
    if(!z) return; if(t.length < 10 && !fichier){ z.innerHTML = '<p>' + tx('Colle l’énoncé ou ajoute une photo.') + '</p>'; return; }
    const b = document.querySelector('[data-a="devoirs-aide"]'); if(b) b.disabled = true;
    z.innerHTML = '<p class="aide">' + tx('⏳ Lecture de ton devoir…') + '</p>';
    const r = await M.envoyer('devoirs.php', corps('aide', Object.assign({ enonce:t }, fichier ? { fichier } : {})));
    if(b) b.disabled = false; if(!document.body.contains(z)) return;
    if(!r.ok || !r.d || !r.d.consigne){ z.innerHTML = '<p>' + erreur(r) + '</p>'; return; }
    const o = r.d; dernier = { enonce:t || o.consigne, conseils:[o.consigne].concat(o.etapes || []).join('\n').slice(0, 3000) };
    z.innerHTML = '<section class="devoirs-reponse">' +
      '<h3>' + tx('🎯 Ce qu’on te demande') + '</h3><p>🤖 ' + esc(o.consigne) + '</p>' +
      (o.lecon && o.lecon.length ? '<h3>' + tx('📘 La leçon à revoir') + '</h3>' + liste(o.lecon) : '') +
      '<h3>' + tx('🪜 La méthode, étape par étape') + '</h3><ol class="devoirs-liste">' + o.etapes.map(x => '<li>' + esc(x) + '</li>').join('') + '</ol>' +
      (o.questions && o.questions.length ? '<h3>' + tx('❓ Pour t’aider à avancer') + '</h3>' + liste(o.questions) : '') +
      (o.verifier && o.verifier.length ? '<h3>' + tx('✅ Avant de rendre, vérifie') + '</h3>' + liste(o.verifier) : '') + '</section>' +
      '<section class="devoirs-suite"><p><label>' + tx('Une question sur une étape ?') + '<textarea id="dev-question" rows="2" maxlength="600"></textarea></label></p>' +
      '<p><button class="moyen" data-a="devoirs-suite">' + tx('Demander') + cout('suite') + '</button></p><div id="dev-suite" role="status" aria-live="polite"></div>' +
      '<p><label>' + tx('Tu as écrit ta réponse ? Colle-la ici pour la faire relire.') + '<textarea id="dev-travail" rows="6" maxlength="3000"></textarea></label></p>' +
      '<p><button class="moyen plein" data-a="devoirs-relire">' + tx('🔍 Faire relire') + cout('relire') + '</button></p><div id="dev-relu" role="status" aria-live="polite"></div></section>';
  }
  async function suite(){
    const z = document.getElementById('dev-suite'), q = String((document.getElementById('dev-question') || {}).value || '').trim(); if(!z || !dernier || q.length < 3) return;
    z.innerHTML = '<p class="aide">' + tx('⏳ Lecture de ton devoir…') + '</p>';
    const r = await M.envoyer('devoirs.php', corps('suite', { enonce:dernier.enonce, consignes_precedentes:dernier.conseils, question:q }));
    if(!document.body.contains(z)) return;
    z.innerHTML = r.ok && r.d && r.d.reponse ? '<p class="explication-ia">🤖 ' + api().esc(r.d.reponse) + '</p>' : '<p>' + erreur(r) + '</p>';
  }
  async function relire(){
    const z = document.getElementById('dev-relu'), t = String((document.getElementById('dev-travail') || {}).value || '').trim(); if(!z || !dernier || t.length < 10) return;
    z.innerHTML = '<p class="aide">' + tx('⏳ Lecture de ton devoir…') + '</p>';
    const r = await M.envoyer('devoirs.php', corps('relire', { enonce:dernier.enonce, travail:t }));
    if(!document.body.contains(z)) return;
    if(!r.ok || !r.d || !(r.d.a_revoir || r.d.bien)){ z.innerHTML = '<p>' + erreur(r) + '</p>'; return; }
    z.innerHTML = (r.d.bien && r.d.bien.length ? '<h3>' + tx('👍 Ce qui est réussi') + '</h3>' + liste(r.d.bien) : '') + (r.d.a_revoir && r.d.a_revoir.length ? '<h3>' + tx('🔎 À revoir') + '</h3>' + liste(r.d.a_revoir) : '') +
      (r.d.pistes && r.d.pistes.length ? '<h3>' + tx('🛠️ Comment t’y prendre') + '</h3>' + liste(r.d.pistes) : '') + '<p class="petit">' + tx('🤖 L’IA peut se tromper : vérifie avec ta leçon, et demande à ton professeur en cas de doute.') + '</p>';
  }
  // v6.38 : l'entrée est la grande carte en tête de l'écran Matières (js/jeu.js).
  Object.assign(M.actions, { 'devoirs':() => ecran(), 'devoirs-aide':() => aide(), 'devoirs-suite':() => suite(), 'devoirs-relire':() => relire() });
  M.devoirs = { METHODES, famille, COUT };
})();
