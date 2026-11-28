// Ami des mots — v6.56 : FRANÇAIS du collège — chaque leçon de la 6e à la 3e à 20 questions, en français, anglais et espagnol.
// Dans les traductions, les mots et phrases étudiés restent en français, entre guillemets ou entre parenthèses.
// Chargé après les traductions et avant js/themes.js.
(function(){
  'use strict';
  const M = window.MATIERES; if(!M) return;
  const T = window.MATIERES_LANGUES || {};
  const L = (mid, cid, tr) => {
    const m = M.trouver(mid), c = m && m.chapitres.find(x => x.id === cid); if(!c || !Array.isArray(c.banque)) return;
    const k = mid + '/' + cid, n0 = c.banque.length;
    for(const l of ['en', 'es', 'de']){ const q = T[l] && T[l].q && T[l].q[k]; if(q && (!tr[l] || tr[l].length !== tr.fr.length || q.length !== n0)) return; }
    c.banque.push(...tr.fr);
    for(const l of ['en', 'es', 'de']){ const q = T[l] && T[l].q && T[l].q[k]; if(q) q.push(...tr[l]); }
    if(c.nivQ) c.nivQ = c.banque.map((_, i) => i < n0 ? c.nivQ[i] : c.niv.slice());
  };
  const Q = (q, bon, f1, v1, f2, v2, f3, v3, r) => [q, bon, [[f1, v1], [f2, v2], [f3, v3]], r];

  // ═════════ Nature des mots ═════════
  L('francais', 'nature', {
    fr:[
      Q('Dans « Elle est très gentille », « très » est :', 'un adverbe', 'un adjectif', 'Il ne s’accorde jamais : c’est un adverbe. 🗿', 'une préposition', 'Il n’introduit aucun complément. 🚪', 'un nom', 'On ne peut pas dire « le très ». 🙅', 'Un adverbe est invariable et modifie un adjectif, un verbe ou un autre adverbe.'),
      Q('Dans « Nous partirons demain », « nous » est :', 'un pronom personnel', 'un déterminant', 'Il n’accompagne aucun nom. 🔍', 'un verbe', 'Le verbe, c’est « partirons ». 🏃', 'un adverbe', 'Il est sujet du verbe. 👤', '« nous » remplace des personnes : c’est un pronom personnel.'),
      Q('Dans « Il a acheté un vélo », « un » est :', 'un déterminant (article indéfini)', 'un pronom', 'Il est placé devant le nom « vélo ». 🚲', 'un adjectif numéral seulement', 'Ici, il présente le nom sans compter. 🔢', 'un nom', 'Non. ❌', 'un, une, des : articles indéfinis.'),
      Q('Dans « Aïe ! Je me suis fait mal », « Aïe » est :', 'une interjection', 'un adverbe', 'Il exprime un cri, une émotion. 😖', 'un nom', 'Non. ❌', 'un verbe', 'Il n’est pas conjugué. 🚫', 'Une interjection exprime une émotion : aïe, oh, hélas, chut…')
    ],
    en:[
      Q('In “Elle est très gentille”, what is “très”?', 'an adverb', 'an adjective', 'It never agrees: it is an adverb. 🗿', 'a preposition', 'It does not introduce any complement. 🚪', 'a noun', 'You cannot put an article in front of it. 🙅', 'An adverb never changes and modifies an adjective, a verb or another adverb.'),
      Q('In “Nous partirons demain”, what is “nous”?', 'a personal pronoun', 'a determiner', 'It does not go with any noun. 🔍', 'a verb', 'The verb is “partirons”. 🏃', 'an adverb', 'It is the subject of the verb. 👤', '“Nous” stands for people: it is a personal pronoun.'),
      Q('In “Il a acheté un vélo”, what is “un”?', 'a determiner (indefinite article)', 'a pronoun', 'It comes before the noun “vélo”. 🚲', 'only a number', 'Here it introduces the noun without counting. 🔢', 'a noun', 'No. ❌', '“Un”, “une”, “des”: indefinite articles.'),
      Q('In “Aïe ! Je me suis fait mal”, what is “Aïe”?', 'an interjection', 'an adverb', 'It is a cry, an emotion. 😖', 'a noun', 'No. ❌', 'a verb', 'It is not conjugated. 🚫', 'An interjection expresses an emotion: “aïe”, “oh”, “hélas”, “chut”…')
    ],
    es:[
      Q('En «Elle est très gentille», ¿qué es «très»?', 'un adverbio', 'un adjetivo', 'Nunca concuerda: es un adverbio. 🗿', 'una preposición', 'No introduce ningún complemento. 🚪', 'un sustantivo', 'No se le puede poner artículo. 🙅', 'El adverbio es invariable y modifica a un adjetivo, un verbo u otro adverbio.'),
      Q('En «Nous partirons demain», ¿qué es «nous»?', 'un pronombre personal', 'un determinante', 'No acompaña a ningún sustantivo. 🔍', 'un verbo', 'El verbo es «partirons». 🏃', 'un adverbio', 'Es el sujeto del verbo. 👤', '«Nous» sustituye a personas: es un pronombre personal.'),
      Q('En «Il a acheté un vélo», ¿qué es «un»?', 'un determinante (artículo indefinido)', 'un pronombre', 'Va delante del sustantivo «vélo». 🚲', 'solo un número', 'Aquí presenta el sustantivo sin contar. 🔢', 'un sustantivo', 'No. ❌', '«Un», «une», «des»: artículos indefinidos.'),
      Q('En «Aïe ! Je me suis fait mal», ¿qué es «Aïe»?', 'una interjección', 'un adverbio', 'Es un grito, una emoción. 😖', 'un sustantivo', 'No. ❌', 'un verbo', 'No está conjugado. 🚫', 'La interjección expresa una emoción: «aïe», «oh», «hélas», «chut»…')
    ]
  });

  // ═════════ Fonctions ═════════
  L('francais', 'fonctions', {
    fr:[
      Q('Fonction de « avec soin » dans « Il range sa chambre avec soin » :', 'complément circonstanciel de manière', 'COD', 'Le COD répond à « quoi ? » : c’est « sa chambre ». 🛏️', 'COI', 'Il n’est pas introduit par « à » ou « de » après le verbe. 🔍', 'attribut du sujet', 'Il n’y a pas de verbe d’état. 🚫', 'Il répond à « comment ? » : c’est un CC de manière.'),
      Q('Fonction de « lui » dans « Je lui donne un livre » :', 'COI (complément d’objet second)', 'sujet', 'Le sujet, c’est « je ». 🙋', 'COD', 'Le COD, c’est « un livre ». 📚', 'complément circonstanciel', 'Il complète le verbe « donner à ». 🎁', '« lui » = « à lui » : complément indirect du verbe donner.'),
      Q('Fonction de « par le vent » dans « Les feuilles sont emportées par le vent » :', 'complément d’agent', 'COD', 'La phrase est au passif : pas de COD ici. 🔄', 'complément circonstanciel de lieu', 'Le vent est celui qui fait l’action. 🌬️', 'sujet', 'Le sujet, c’est « les feuilles ». 🍂', 'Au passif, celui qui fait l’action est le complément d’agent.'),
      Q('Fonction de « parce qu’il pleuvait » dans « Il est rentré parce qu’il pleuvait » :', 'complément circonstanciel de cause', 'complément circonstanciel de but', 'Le but répond à « pour quoi faire ? ». 🎯', 'COD', 'Ce n’est pas ce qu’il rentre ! 😄', 'complément circonstanciel de temps', 'Il répond à « pourquoi ? », pas à « quand ? ». ⏰', '« parce que » introduit la cause.')
    ],
    en:[
      Q('Function of “avec soin” in “Il range sa chambre avec soin”:', 'adverbial of manner', 'direct object', 'The direct object answers “what?”: it is “sa chambre”. 🛏️', 'indirect object', 'It is not introduced by “à” or “de” after the verb. 🔍', 'subject complement', 'There is no linking verb. 🚫', 'It answers “how?”: an adverbial of manner.'),
      Q('Function of “lui” in “Je lui donne un livre”:', 'indirect object (second object)', 'subject', 'The subject is “je”. 🙋', 'direct object', 'The direct object is “un livre”. 📚', 'adverbial', 'It completes the verb “donner à”. 🎁', '“Lui” means “à lui”: an indirect complement of the verb.'),
      Q('Function of “par le vent” in “Les feuilles sont emportées par le vent”:', 'agent complement', 'direct object', 'The sentence is passive: no direct object here. 🔄', 'adverbial of place', 'The wind is what does the action. 🌬️', 'subject', 'The subject is “les feuilles”. 🍂', 'In the passive, whoever does the action is the agent complement.'),
      Q('Function of “parce qu’il pleuvait” in “Il est rentré parce qu’il pleuvait”:', 'adverbial of cause', 'adverbial of purpose', 'Purpose answers “in order to do what?”. 🎯', 'direct object', 'It is not what he brought in! 😄', 'adverbial of time', 'It answers “why?”, not “when?”. ⏰', '“Parce que” introduces the cause.')
    ],
    es:[
      Q('Función de «avec soin» en «Il range sa chambre avec soin»:', 'complemento circunstancial de modo', 'complemento directo', 'El complemento directo responde a «¿qué?»: es «sa chambre». 🛏️', 'complemento indirecto', 'No va introducido por «à» o «de» tras el verbo. 🔍', 'atributo del sujeto', 'No hay verbo copulativo. 🚫', 'Responde a «¿cómo?»: complemento circunstancial de modo.'),
      Q('Función de «lui» en «Je lui donne un livre»:', 'complemento indirecto (segundo objeto)', 'sujeto', 'El sujeto es «je». 🙋', 'complemento directo', 'El complemento directo es «un livre». 📚', 'complemento circunstancial', 'Completa al verbo «donner à». 🎁', '«Lui» equivale a «à lui»: complemento indirecto del verbo.'),
      Q('Función de «par le vent» en «Les feuilles sont emportées par le vent»:', 'complemento agente', 'complemento directo', 'La oración es pasiva: aquí no hay complemento directo. 🔄', 'complemento circunstancial de lugar', 'El viento es quien realiza la acción. 🌬️', 'sujeto', 'El sujeto es «les feuilles». 🍂', 'En pasiva, quien realiza la acción es el complemento agente.'),
      Q('Función de «parce qu’il pleuvait» en «Il est rentré parce qu’il pleuvait»:', 'complemento circunstancial de causa', 'complemento circunstancial de finalidad', 'La finalidad responde a «¿para qué?». 🎯', 'complemento directo', '¡No es lo que metió en casa! 😄', 'complemento circunstancial de tiempo', 'Responde a «¿por qué?», no a «¿cuándo?». ⏰', '«Parce que» introduce la causa.')
    ]
  });

  // ═════════ Vocabulaire ═════════
  L('francais', 'vocabulaire', {
    fr:[
      Q('Quel est un synonyme de « effrayé » ?', 'apeuré', 'joyeux', 'C’est presque le contraire. 😄', 'fatigué', 'Fatigué n’a pas le même sens. 😴', 'courageux', 'C’est plutôt le contraire. 🦁', 'Synonymes : mots de sens proche (effrayé, apeuré, terrifié).'),
      Q('Que signifie le suffixe « -eur » dans « chanteur » ?', 'celui qui fait l’action', 'petit', 'Le diminutif serait « -et » ou « -ette ». 🐣', 'le contraire', 'C’est le rôle de préfixes comme « in- » ou « dé- ». 🔄', 'un lieu', 'Non. 📍', 'chanteur, danseur, nageur : celui qui chante, danse, nage.'),
      Q('Quel est l’antonyme de « ancien » ?', 'moderne', 'vieux', 'C’est un synonyme ! 👴', 'antique', 'C’est aussi un synonyme. 🏛️', 'âgé', 'C’est encore un synonyme. 🎂', 'Antonyme = mot de sens contraire.'),
      Q('Que signifie « avoir la tête dans les nuages » ?', 'être distrait, rêveur', 'avoir froid à la tête', 'C’est une expression imagée. ☁️', 'savoir voler', 'Pas au sens propre ! 😄', 'être très grand', 'Non. 📏', 'Sens figuré : penser à autre chose, rêvasser.')
    ],
    en:[
      Q('What is a synonym of “effrayé”?', '“apeuré”', '“joyeux”', 'That is almost the opposite. 😄', '“fatigué”', 'That does not mean the same. 😴', '“courageux”', 'That is rather the opposite. 🦁', 'Synonyms: words with a close meaning (“effrayé”, “apeuré”, “terrifié”).'),
      Q('What does the suffix “-eur” mean in “chanteur”?', 'the person who does the action', 'small', 'A diminutive would be “-et” or “-ette”. 🐣', 'the opposite', 'That is the job of prefixes like “in-” or “dé-”. 🔄', 'a place', 'No. 📍', '“Chanteur”, “danseur”, “nageur”: the one who sings, dances, swims.'),
      Q('What is the antonym of “ancien”?', '“moderne”', '“vieux”', 'That is a synonym! 👴', '“antique”', 'That is also a synonym. 🏛️', '“âgé”', 'That is yet another synonym. 🎂', 'Antonym = a word with the opposite meaning.'),
      Q('What does “avoir la tête dans les nuages” mean?', 'to be absent-minded, a daydreamer', 'to have a cold head', 'It is a figure of speech. ☁️', 'to be able to fly', 'Not literally! 😄', 'to be very tall', 'No. 📏', 'Figurative meaning: thinking about something else, daydreaming.')
    ],
    es:[
      Q('¿Cuál es un sinónimo de «effrayé»?', '«apeuré»', '«joyeux»', 'Es casi lo contrario. 😄', '«fatigué»', 'No significa lo mismo. 😴', '«courageux»', 'Es más bien lo contrario. 🦁', 'Sinónimos: palabras de significado parecido («effrayé», «apeuré», «terrifié»).'),
      Q('¿Qué significa el sufijo «-eur» en «chanteur»?', 'el que realiza la acción', 'pequeño', 'El diminutivo sería «-et» o «-ette». 🐣', 'lo contrario', 'Eso lo hacen prefijos como «in-» o «dé-». 🔄', 'un lugar', 'No. 📍', '«Chanteur», «danseur», «nageur»: el que canta, baila, nada.'),
      Q('¿Cuál es el antónimo de «ancien»?', '«moderne»', '«vieux»', '¡Es un sinónimo! 👴', '«antique»', 'También es un sinónimo. 🏛️', '«âgé»', 'Otro sinónimo más. 🎂', 'Antónimo = palabra de significado contrario.'),
      Q('¿Qué significa «avoir la tête dans les nuages»?', 'estar distraído, en las nubes', 'tener frío en la cabeza', 'Es una expresión figurada. ☁️', 'saber volar', '¡No en sentido literal! 😄', 'ser muy alto', 'No. 📏', 'Sentido figurado: pensar en otra cosa, soñar despierto.')
    ]
  });

  // ═════════ Cours de 6e ═════════
  L('francais', 'cours-6e', {
    fr:[
      Q('Conjugue « être » au présent, 2e personne du pluriel.', 'vous êtes', 'vous étes', 'C’est un accent circonflexe : ê. ✏️', 'vous sommes', '« sommes » va avec « nous ». 👥', 'vous êtez', 'Non : « êtes ». ❌', 'je suis, tu es, il est, nous sommes, vous êtes, ils sont.'),
      Q('Quel est le pluriel de « un cheval » ?', 'des chevaux', 'des chevals', 'Les noms en -al font souvent -aux. 🐴', 'des chevaus', 'Non : -aux. ✏️', 'des chevauxs', 'Pas de s après le x. ✂️', 'un cheval, des chevaux ; un journal, des journaux.'),
      Q('Quel héros grec a vaincu le Minotaure dans le labyrinthe ?', 'Thésée', 'Hercule', 'Il a fait douze travaux, mais pas celui-là. 💪', 'Ulysse', 'Lui, c’est l’Odyssée. ⛵', 'Achille', 'Lui, c’est la guerre de Troie. 🛡️', 'Thésée retrouve la sortie grâce au fil d’Ariane.'),
      Q('Quelle formule ouvre souvent un conte ?', '« Il était une fois »', '« Bonjour à tous »', 'Non. 👋', '« Fin »', 'C’est plutôt la fin ! 🔚', '« Cher journal »', 'C’est un journal intime. 📔', 'Le conte commence souvent par « Il était une fois ».'),
      Q('À quel temps est « il chantait » ?', 'à l’imparfait', 'au passé simple', 'Ce serait « il chanta ». 🔄', 'au présent', 'Ce serait « il chante ». ⏱️', 'au futur', 'Ce serait « il chantera ». ⏩', 'Imparfait : terminaisons -ais, -ais, -ait, -ions, -iez, -aient.')
    ],
    en:[
      Q('Conjugate “être” in the present tense, 2nd person plural.', '“vous êtes”', '“vous étes”', 'It takes a circumflex: “ê”. ✏️', '“vous sommes”', '“Sommes” goes with “nous”. 👥', '“vous êtez”', 'No: “êtes”. ❌', '“je suis, tu es, il est, nous sommes, vous êtes, ils sont”.'),
      Q('What is the plural of “un cheval”?', '“des chevaux”', '“des chevals”', 'Nouns in “-al” often become “-aux”. 🐴', '“des chevaus”', 'No: “-aux”. ✏️', '“des chevauxs”', 'No “s” after the “x”. ✂️', '“un cheval, des chevaux” ; “un journal, des journaux”.'),
      Q('Which Greek hero defeated the Minotaur in the labyrinth?', 'Theseus', 'Hercules', 'He did twelve labours, but not that one. 💪', 'Ulysses', 'He is from the Odyssey. ⛵', 'Achilles', 'He is from the Trojan War. 🛡️', 'Theseus finds the way out thanks to Ariadne’s thread.'),
      Q('Which phrase often opens a fairy tale?', '“Il était une fois” (once upon a time)', '“Bonjour à tous”', 'No. 👋', '“Fin”', 'That is the end! 🔚', '“Cher journal”', 'That is a diary. 📔', 'A fairy tale often starts with “Il était une fois”.'),
      Q('What tense is “il chantait”?', 'the imperfect (imparfait)', 'the past historic', 'That would be “il chanta”. 🔄', 'the present', 'That would be “il chante”. ⏱️', 'the future', 'That would be “il chantera”. ⏩', 'Imperfect endings: “-ais, -ais, -ait, -ions, -iez, -aient”.')
    ],
    es:[
      Q('Conjuga «être» en presente, 2.ª persona del plural.', '«vous êtes»', '«vous étes»', 'Lleva acento circunflejo: «ê». ✏️', '«vous sommes»', '«Sommes» va con «nous». 👥', '«vous êtez»', 'No: «êtes». ❌', '«je suis, tu es, il est, nous sommes, vous êtes, ils sont».'),
      Q('¿Cuál es el plural de «un cheval»?', '«des chevaux»', '«des chevals»', 'Los sustantivos en «-al» suelen hacer «-aux». 🐴', '«des chevaus»', 'No: «-aux». ✏️', '«des chevauxs»', 'No lleva «s» tras la «x». ✂️', '«un cheval, des chevaux» ; «un journal, des journaux».'),
      Q('¿Qué héroe griego venció al Minotauro en el laberinto?', 'Teseo', 'Hércules', 'Hizo doce trabajos, pero no ese. 💪', 'Ulises', 'Él es de la Odisea. ⛵', 'Aquiles', 'Él es de la guerra de Troya. 🛡️', 'Teseo encuentra la salida gracias al hilo de Ariadna.'),
      Q('¿Qué fórmula abre a menudo un cuento?', '«Il était une fois» (érase una vez)', '«Bonjour à tous»', 'No. 👋', '«Fin»', '¡Eso es el final! 🔚', '«Cher journal»', 'Eso es un diario. 📔', 'El cuento suele empezar con «Il était une fois».'),
      Q('¿En qué tiempo está «il chantait»?', 'en imperfecto (imparfait)', 'en pretérito indefinido (passé simple)', 'Sería «il chanta». 🔄', 'en presente', 'Sería «il chante». ⏱️', 'en futuro', 'Sería «il chantera». ⏩', 'Terminaciones del imperfecto: «-ais, -ais, -ait, -ions, -iez, -aient».')
    ]
  });

  // ═════════ Types et formes de phrases ═════════
  L('francais', 'cpl-phrases', {
    fr:[
      Q('Quel est le type de la phrase « Le soleil se lève à l’est. » ?', 'déclarative', 'interrogative', 'Il n’y a pas de question. ❓', 'exclamative', 'Pas d’émotion forte ni de point d’exclamation. ❗', 'injonctive', 'Ce n’est pas un ordre. 📣', 'La phrase déclarative donne une information et se termine par un point.'),
      Q('« Est-ce que tu viens ? » : comment l’interrogation est-elle construite ?', 'avec « est-ce que »', 'avec l’inversion du sujet', 'Ce serait « Viens-tu ? ». 🔄', 'avec la seule intonation', 'Ce serait « Tu viens ? ». 🎵', 'c’est une interrogation indirecte', 'Il y a un point d’interrogation : elle est directe. ❓', 'Trois façons : intonation, « est-ce que », inversion du sujet.'),
      Q('« Où vas-tu ? » est une interrogation…', 'partielle (on ne peut pas répondre par oui ou non)', 'totale', 'On ne répond pas « oui » à « Où vas-tu ? ». 😄', 'négative', 'Il n’y a pas de négation. 🚫', 'exclamative', 'C’est une question. ❓', 'Interrogation partielle : elle porte sur une partie de la phrase (où, quand, qui…).'),
      Q('Affirmative ou négative : quelle est la forme de la phrase « Il ne pleut plus. » ?', 'négative', 'affirmative', '« ne … plus » est une négation. 🚫', 'passive', 'Il n’y a pas de complément d’agent. 🔄', 'emphatique', 'Rien n’est mis en relief. 🔦', 'ne … pas, ne … plus, ne … jamais, ne … rien : forme négative.'),
      Q('Mets à la forme négative : « Il mange toujours des légumes. »', '« Il ne mange jamais de légumes. »', '« Il ne mange pas toujours des légumes. »', 'Le sens change : ça voudrait dire « parfois ». 🔄', '« Il mange jamais des légumes. »', 'Il manque « ne » à l’écrit. ✏️', '« Il ne mange toujours pas des légumes. »', 'Ce n’est pas la négation de « toujours ». ❌', 'toujours → ne … jamais ; des → de dans la négation.'),
      Q('Quelle est la forme de « Ce gâteau, je l’adore ! » ?', 'emphatique (mise en relief)', 'passive', 'Il n’y a pas de verbe au passif. 🔄', 'négative', 'Il n’y a pas de négation. 🚫', 'impersonnelle', 'Le sujet est « je ». 🙋', '« Ce gâteau » est mis en relief en tête de phrase et repris par « l’ ».'),
      Q('Mets à la voix active : « Le match a été gagné par notre équipe. »', '« Notre équipe a gagné le match. »', '« Le match a gagné notre équipe. »', 'Les rôles sont inversés ! 😄', '« Notre équipe est gagnée par le match. »', 'C’est encore un passif, et faux. 🔄', '« Le match gagne notre équipe. »', 'Non. ❌', 'Le complément d’agent devient sujet ; le sujet devient COD.'),
      Q('Pourquoi « Quel beau temps ! » est-elle une phrase non verbale ?', 'elle ne contient pas de verbe conjugué', 'elle est très courte', 'Une phrase courte peut avoir un verbe : « Il pleut. » 📏', 'elle a un point d’exclamation', 'Une exclamative peut avoir un verbe. ❗', 'elle parle de la météo', 'Le sujet ne change rien. ☀️', 'Phrase non verbale = sans verbe conjugué.'),
      Q('Combien de verbes conjugués compte une phrase simple ?', 'un seul', 'deux', 'Avec deux, ce serait une phrase complexe. 2️⃣', 'aucun', 'Ce serait une phrase non verbale. 🚫', 'trois', 'Non. 3️⃣', 'Phrase simple : une seule proposition, un seul verbe conjugué.'),
      Q('Qu’est-ce qu’une phrase complexe ?', 'une phrase qui contient plusieurs verbes conjugués (plusieurs propositions)', 'une phrase difficile à comprendre', 'Complexe, ici, ne veut pas dire compliquée. 🤯', 'une phrase très longue sans verbe', 'Non. 📏', 'une phrase à la forme négative', 'Non. 🚫', 'Les propositions peuvent être juxtaposées, coordonnées ou subordonnées.')
    ],
    en:[
      Q('What type of sentence is “Le soleil se lève à l’est.”?', 'declarative', 'interrogative', 'There is no question. ❓', 'exclamatory', 'No strong emotion and no exclamation mark. ❗', 'imperative', 'It is not an order. 📣', 'A declarative sentence gives information and ends with a full stop.'),
      Q('“Est-ce que tu viens ?”: how is the question built?', 'with “est-ce que”', 'by inverting the subject', 'That would be “Viens-tu ?”. 🔄', 'with intonation alone', 'That would be “Tu viens ?”. 🎵', 'it is an indirect question', 'It has a question mark: it is direct. ❓', 'Three ways: intonation, “est-ce que”, inverting the subject.'),
      Q('“Où vas-tu ?” is a question that is…', 'partial (you cannot answer yes or no)', 'total (yes/no)', 'You do not answer “oui” to “Où vas-tu ?”. 😄', 'negative', 'There is no negation. 🚫', 'exclamatory', 'It is a question. ❓', 'A partial question is about one part of the sentence (“où”, “quand”, “qui”…).'),
      Q('What is the form of the sentence “Il ne pleut plus.”?', 'negative', 'affirmative', '“ne … plus” is a negation. 🚫', 'passive', 'There is no agent complement. 🔄', 'emphatic', 'Nothing is highlighted. 🔦', '“ne … pas”, “ne … plus”, “ne … jamais”, “ne … rien”: negative form.'),
      Q('Make it negative: “Il mange toujours des légumes.”', '“Il ne mange jamais de légumes.”', '“Il ne mange pas toujours des légumes.”', 'The meaning changes: that would mean “sometimes”. 🔄', '“Il mange jamais des légumes.”', '“ne” is missing in writing. ✏️', '“Il ne mange toujours pas des légumes.”', 'That is not the negative of “toujours”. ❌', '“toujours” → “ne … jamais” ; “des” → “de” in the negative.'),
      Q('What is the form of “Ce gâteau, je l’adore !”?', 'emphatic (highlighting)', 'passive', 'There is no passive verb. 🔄', 'negative', 'There is no negation. 🚫', 'impersonal', 'The subject is “je”. 🙋', '“Ce gâteau” is highlighted at the start and picked up by “l’”.'),
      Q('Put into the active voice: “Le match a été gagné par notre équipe.”', '“Notre équipe a gagné le match.”', '“Le match a gagné notre équipe.”', 'The roles are swapped! 😄', '“Notre équipe est gagnée par le match.”', 'Still passive, and wrong. 🔄', '“Le match gagne notre équipe.”', 'No. ❌', 'The agent becomes the subject; the subject becomes the direct object.'),
      Q('Why is “Quel beau temps !” a verbless sentence?', 'it contains no conjugated verb', 'it is very short', 'A short sentence can have a verb: “Il pleut.” 📏', 'it has an exclamation mark', 'An exclamation can have a verb. ❗', 'it is about the weather', 'The topic changes nothing. ☀️', 'Verbless sentence = no conjugated verb.'),
      Q('How many conjugated verbs does a simple sentence have?', 'only one', 'two', 'With two, it would be a complex sentence. 2️⃣', 'none', 'That would be a verbless sentence. 🚫', 'three', 'No. 3️⃣', 'Simple sentence: one clause, one conjugated verb.'),
      Q('What is a complex sentence?', 'a sentence with several conjugated verbs (several clauses)', 'a sentence that is hard to understand', 'Here, complex does not mean complicated. 🤯', 'a very long sentence with no verb', 'No. 📏', 'a negative sentence', 'No. 🚫', 'Clauses can be juxtaposed, coordinated or subordinate.')
    ],
    es:[
      Q('¿De qué tipo es la oración «Le soleil se lève à l’est.»?', 'enunciativa (declarativa)', 'interrogativa', 'No hay pregunta. ❓', 'exclamativa', 'No hay emoción fuerte ni signo de exclamación. ❗', 'imperativa', 'No es una orden. 📣', 'La oración enunciativa da una información y termina en punto.'),
      Q('«Est-ce que tu viens ?»: ¿cómo se construye la pregunta?', 'con «est-ce que»', 'con inversión del sujeto', 'Sería «Viens-tu ?». 🔄', 'solo con la entonación', 'Sería «Tu viens ?». 🎵', 'es una interrogación indirecta', 'Tiene signo de interrogación: es directa. ❓', 'Tres maneras: entonación, «est-ce que», inversión del sujeto.'),
      Q('«Où vas-tu ?» es una interrogación…', 'parcial (no se responde con sí o no)', 'total', 'A «Où vas-tu ?» no se responde «oui». 😄', 'negativa', 'No hay negación. 🚫', 'exclamativa', 'Es una pregunta. ❓', 'La interrogación parcial trata sobre una parte de la oración («où», «quand», «qui»…).'),
      Q('¿Cuál es la forma de la oración «Il ne pleut plus.»?', 'negativa', 'afirmativa', '«ne … plus» es una negación. 🚫', 'pasiva', 'No hay complemento agente. 🔄', 'enfática', 'No se destaca nada. 🔦', '«ne … pas», «ne … plus», «ne … jamais», «ne … rien»: forma negativa.'),
      Q('Pasa a forma negativa: «Il mange toujours des légumes.»', '«Il ne mange jamais de légumes.»', '«Il ne mange pas toujours des légumes.»', 'Cambia el sentido: significaría «a veces». 🔄', '«Il mange jamais des légumes.»', 'Falta «ne» por escrito. ✏️', '«Il ne mange toujours pas des légumes.»', 'No es la negación de «toujours». ❌', '«toujours» → «ne … jamais» ; «des» → «de» en la negación.'),
      Q('¿Cuál es la forma de «Ce gâteau, je l’adore !»?', 'enfática (realce)', 'pasiva', 'No hay verbo en pasiva. 🔄', 'negativa', 'No hay negación. 🚫', 'impersonal', 'El sujeto es «je». 🙋', '«Ce gâteau» se destaca al principio y lo retoma «l’».'),
      Q('Pasa a voz activa: «Le match a été gagné par notre équipe.»', '«Notre équipe a gagné le match.»', '«Le match a gagné notre équipe.»', '¡Los papeles están cambiados! 😄', '«Notre équipe est gagnée par le match.»', 'Sigue en pasiva, y mal. 🔄', '«Le match gagne notre équipe.»', 'No. ❌', 'El complemento agente pasa a sujeto; el sujeto, a complemento directo.'),
      Q('¿Por qué «Quel beau temps !» es una oración sin verbo?', 'no contiene ningún verbo conjugado', 'es muy corta', 'Una oración corta puede tener verbo: «Il pleut.» 📏', 'tiene signo de exclamación', 'Una exclamación puede tener verbo. ❗', 'habla del tiempo', 'El tema no cambia nada. ☀️', 'Oración no verbal = sin verbo conjugado.'),
      Q('¿Cuántos verbos conjugados tiene una oración simple?', 'uno solo', 'dos', 'Con dos sería una oración compuesta. 2️⃣', 'ninguno', 'Sería una oración sin verbo. 🚫', 'tres', 'No. 3️⃣', 'Oración simple: una proposición, un verbo conjugado.'),
      Q('¿Qué es una oración compuesta (compleja)?', 'una oración con varios verbos conjugados (varias proposiciones)', 'una oración difícil de entender', 'Aquí compleja no significa complicada. 🤯', 'una oración muy larga sin verbo', 'No. 📏', 'una oración negativa', 'No. 🚫', 'Las proposiciones pueden ser yuxtapuestas, coordinadas o subordinadas.')
    ]
  });

  // ═════════ Orthographe rectifiée (1990) ═════════
  L('francais', 'cpl-ortho90', {
    fr:[
      Q('Quelle est la forme rectifiée de « réglementaire » ?', '« règlementaire »', '« reglementaire »', 'Il faut un accent : on l’entend. ✏️', '« réglemantaire »', 'Non. ❌', '« règlementère »', 'Non. ❌', 'L’accent grave s’aligne sur « règle » : règlement, règlementaire.'),
      Q('Quelle est la forme rectifiée de « relais » ?', '« relai »', '« relé »', 'Non. ❌', '« relet »', 'Non. ❌', '« rellais »', 'Non. ❌', '« relai » s’aligne sur « balai » et « délai ».'),
      Q('Quelle est la forme rectifiée de « paraître » ?', '« paraitre »', '« paretre »', 'Non. ❌', '« paraîtrent »', 'Non. ❌', '« paraite »', 'Il manque le r. ✏️', 'Le circonflexe sur i et u peut disparaitre, sauf exceptions.'),
      Q('Dans quels cas l’accent circonflexe sur « u » reste-t-il obligatoire ?', 'quand il évite une confusion (sûr/sur, dû/du, mûr/mur, jeûne)', 'jamais', 'Il reste dans quelques mots. 🔍', 'toujours', 'Il peut disparaitre sur « i » et « u », sauf exceptions. ✂️', 'seulement dans les prénoms', 'Non. 👤', 'Il reste aussi au passé simple et au subjonctif : nous vînmes, qu’il fût.'),
      Q('Avec les rectifications, comment écrit-on « cent deux » ?', '« cent-deux »', '« cent deux » obligatoirement', 'Les deux graphies sont acceptées, mais la rectifiée a des traits d’union. 🔗', '« centdeux »', 'On ne soude pas les nombres. ✂️', '« cents-deux »', 'Pas de s à « cent » ici. ✏️', 'Rectification : traits d’union entre tous les éléments d’un nombre.'),
      Q('Forme rectifiée du singulier « un compte-gouttes » :', '« un compte-goutte »', '« un comptegouttes »', 'Non. ❌', '« un compte-gouttent »', 'Non. ❌', '« un comptes-goutte »', 'Le verbe reste invariable. ✏️', 'Nom composé verbe + nom : marque du pluriel seulement au pluriel.'),
      Q('Forme rectifiée du singulier « un sèche-cheveux » :', '« un sèche-cheveu »', '« un sèches-cheveux »', 'Le verbe ne prend pas de s. ✏️', '« un sèchecheveu »', 'Non. ❌', '« un sèche-chevaux »', 'Ça sècherait des chevaux ! 🐴', 'Au singulier : un sèche-cheveu ; au pluriel : des sèche-cheveux.'),
      Q('Quelle est la forme rectifiée de « chariot » ?', '« charriot »', '« charot »', 'Non. ❌', '« chariott »', 'Non. ❌', '« charriaut »', 'Non. ❌', '« charriot » s’aligne sur « charrette » et « charrue ».'),
      Q('Quelle est la forme rectifiée de « boursoufler » ?', '« boursouffler »', '« boursoufller »', 'Non. ❌', '« boursouflé »', 'C’est le participe. 🔄', '« bourssoufler »', 'Non. ❌', '« boursouffler » s’aligne sur « souffler ».'),
      Q('Quelle est la forme rectifiée de « ambiguë » ?', '« ambigüe »', '« ambigue »', 'Il faut le tréma, sinon on lirait « gue ». ✏️', '« ambiguée »', 'Non. ❌', '« ambiguë » obligatoirement', 'L’ancienne graphie reste juste, mais la rectifiée place le tréma sur le u. 🔄', 'Le tréma passe sur la voyelle prononcée : ambigüe, aigüe.'),
      Q('Quelle est la forme rectifiée de « week-end » ?', '« weekend »', '« ouiquende »', 'Pas si loin ! 😄', '« week end »', 'Non. ❌', '« weak-end »', 'Non. ❌', 'Beaucoup de mots composés empruntés se soudent : weekend, pingpong.'),
      Q('Quelle est la forme rectifiée de « asseoir » ?', '« assoir »', '« assoire »', 'Non. ❌', '« asoir »', 'Il faut deux s. ✏️', '« asseoire »', 'Non. ❌', '« assoir » s’écrit comme il se prononce.')
    ],
    en:[
      Q('What is the reformed spelling of “réglementaire”?', '“règlementaire”', '“reglementaire”', 'An accent is needed: you can hear it. ✏️', '“réglemantaire”', 'No. ❌', '“règlementère”', 'No. ❌', 'The grave accent follows “règle”: “règlement”, “règlementaire”.'),
      Q('What is the reformed spelling of “relais”?', '“relai”', '“relé”', 'No. ❌', '“relet”', 'No. ❌', '“rellais”', 'No. ❌', '“Relai” follows “balai” and “délai”.'),
      Q('What is the reformed spelling of “paraître”?', '“paraitre”', '“paretre”', 'No. ❌', '“paraîtrent”', 'No. ❌', '“paraite”', 'The r is missing. ✏️', 'The circumflex on i and u can go, with exceptions.'),
      Q('When must the circumflex on “u” stay?', 'when it avoids confusion (“sûr/sur”, “dû/du”, “mûr/mur”, “jeûne”)', 'never', 'It stays in a few words. 🔍', 'always', 'It can go on i and u, with exceptions. ✂️', 'only in first names', 'No. 👤', 'It also stays in some verb forms: “nous vînmes”, “qu’il fût”.'),
      Q('With the 1990 reform, how is “cent deux” written?', '“cent-deux”', '“cent deux” only', 'Both spellings are accepted, but the reformed one has hyphens. 🔗', '“centdeux”', 'Numbers are not joined together. ✂️', '“cents-deux”', 'No s on “cent” here. ✏️', 'Reform: hyphens between all parts of a number.'),
      Q('Reformed singular of “un compte-gouttes”:', '“un compte-goutte”', '“un comptegouttes”', 'No. ❌', '“un compte-gouttent”', 'No. ❌', '“un comptes-goutte”', 'The verb does not change. ✏️', 'Verb + noun compounds: plural mark only in the plural.'),
      Q('Reformed singular of “un sèche-cheveux”:', '“un sèche-cheveu”', '“un sèches-cheveux”', 'The verb takes no s. ✏️', '“un sèchecheveu”', 'No. ❌', '“un sèche-chevaux”', 'That would dry horses! 🐴', 'Singular: “un sèche-cheveu” ; plural: “des sèche-cheveux”.'),
      Q('What is the reformed spelling of “chariot”?', '“charriot”', '“charot”', 'No. ❌', '“chariott”', 'No. ❌', '“charriaut”', 'No. ❌', '“Charriot” follows “charrette” and “charrue”.'),
      Q('What is the reformed spelling of “boursoufler”?', '“boursouffler”', '“boursoufller”', 'No. ❌', '“boursouflé”', 'That is the participle. 🔄', '“bourssoufler”', 'No. ❌', '“Boursouffler” follows “souffler”.'),
      Q('What is the reformed spelling of “ambiguë”?', '“ambigüe”', '“ambigue”', 'The diaeresis is needed, or you would read “gue”. ✏️', '“ambiguée”', 'No. ❌', '“ambiguë” only', 'The old spelling is still correct, but the reform puts the diaeresis on the u. 🔄', 'The diaeresis goes on the vowel you hear: “ambigüe”, “aigüe”.'),
      Q('What is the reformed spelling of “week-end”?', '“weekend”', '“ouiquende”', 'Not that far off! 😄', '“week end”', 'No. ❌', '“weak-end”', 'No. ❌', 'Many borrowed compounds are joined: “weekend”, “pingpong”.'),
      Q('What is the reformed spelling of “asseoir”?', '“assoir”', '“assoire”', 'No. ❌', '“asoir”', 'It needs two s. ✏️', '“asseoire”', 'No. ❌', '“Assoir” is written the way it sounds.')
    ],
    es:[
      Q('¿Cuál es la grafía reformada de «réglementaire»?', '«règlementaire»', '«reglementaire»', 'Hace falta un acento: se oye. ✏️', '«réglemantaire»', 'No. ❌', '«règlementère»', 'No. ❌', 'El acento grave sigue a «règle»: «règlement», «règlementaire».'),
      Q('¿Cuál es la grafía reformada de «relais»?', '«relai»', '«relé»', 'No. ❌', '«relet»', 'No. ❌', '«rellais»', 'No. ❌', '«Relai» sigue el modelo de «balai» y «délai».'),
      Q('¿Cuál es la grafía reformada de «paraître»?', '«paraitre»', '«paretre»', 'No. ❌', '«paraîtrent»', 'No. ❌', '«paraite»', 'Falta la r. ✏️', 'El circunflejo sobre la i y la u puede desaparecer, salvo excepciones.'),
      Q('¿Cuándo sigue siendo obligatorio el circunflejo sobre la «u»?', 'cuando evita una confusión («sûr/sur», «dû/du», «mûr/mur», «jeûne»)', 'nunca', 'Se mantiene en algunas palabras. 🔍', 'siempre', 'Puede desaparecer sobre la i y la u, salvo excepciones. ✂️', 'solo en los nombres propios', 'No. 👤', 'También se mantiene en algunas formas verbales: «nous vînmes», «qu’il fût».'),
      Q('Con la reforma de 1990, ¿cómo se escribe «cent deux»?', '«cent-deux»', 'solo «cent deux»', 'Se aceptan las dos grafías, pero la reformada lleva guiones. 🔗', '«centdeux»', 'Los números no se unen. ✂️', '«cents-deux»', 'Aquí «cent» no lleva s. ✏️', 'Reforma: guiones entre todos los elementos de un número.'),
      Q('Singular reformado de «un compte-gouttes»:', '«un compte-goutte»', '«un comptegouttes»', 'No. ❌', '«un compte-gouttent»', 'No. ❌', '«un comptes-goutte»', 'El verbo no varía. ✏️', 'Compuestos verbo + sustantivo: marca de plural solo en plural.'),
      Q('Singular reformado de «un sèche-cheveux»:', '«un sèche-cheveu»', '«un sèches-cheveux»', 'El verbo no lleva s. ✏️', '«un sèchecheveu»', 'No. ❌', '«un sèche-chevaux»', '¡Eso secaría caballos! 🐴', 'Singular: «un sèche-cheveu» ; plural: «des sèche-cheveux».'),
      Q('¿Cuál es la grafía reformada de «chariot»?', '«charriot»', '«charot»', 'No. ❌', '«chariott»', 'No. ❌', '«charriaut»', 'No. ❌', '«Charriot» sigue el modelo de «charrette» y «charrue».'),
      Q('¿Cuál es la grafía reformada de «boursoufler»?', '«boursouffler»', '«boursoufller»', 'No. ❌', '«boursouflé»', 'Es el participio. 🔄', '«bourssoufler»', 'No. ❌', '«Boursouffler» sigue el modelo de «souffler».'),
      Q('¿Cuál es la grafía reformada de «ambiguë»?', '«ambigüe»', '«ambigue»', 'Hace falta la diéresis, si no se leería «gue». ✏️', '«ambiguée»', 'No. ❌', 'solo «ambiguë»', 'La grafía antigua sigue siendo correcta, pero la reformada pone la diéresis sobre la u. 🔄', 'La diéresis va sobre la vocal que se pronuncia: «ambigüe», «aigüe».'),
      Q('¿Cuál es la grafía reformada de «week-end»?', '«weekend»', '«ouiquende»', '¡No tan lejos! 😄', '«week end»', 'No. ❌', '«weak-end»', 'No. ❌', 'Muchos compuestos tomados de otras lenguas se escriben juntos: «weekend», «pingpong».'),
      Q('¿Cuál es la grafía reformada de «asseoir»?', '«assoir»', '«assoire»', 'No. ❌', '«asoir»', 'Lleva dos s. ✏️', '«asseoire»', 'No. ❌', '«Assoir» se escribe como se pronuncia.')
    ]
  });

  // ═════════ Groupe nominal, étymologie, point de vue ═════════
  L('francais', 'cpl-gn-lexique', {
    fr:[
      Q('Combien d’adjectifs épithètes y a-t-il dans « un grand jardin fleuri » ?', 'deux', 'un', '« grand » ET « fleuri » qualifient le jardin. 🌷', 'trois', '« un » est un déterminant. 🔍', 'aucun', 'Si : « grand » et « fleuri ». 🌳', 'L’épithète est collée au nom, sans verbe entre eux.'),
      Q('Quel est le nom noyau du groupe nominal « le petit chat de ma voisine » ?', 'chat', 'petit', 'C’est un adjectif épithète. 🐱', 'voisine', 'C’est dans le complément du nom. 🏠', 'le', 'C’est le déterminant. 🔍', 'Le noyau est le nom principal, que tout le reste complète.'),
      Q('Dans « la ville de Lyon », quelle est la fonction de « de Lyon » ?', 'complément du nom', 'COD', 'Il n’y a pas de verbe. 🔍', 'complément circonstanciel de lieu', 'Il complète le nom « ville », pas un verbe. 🏙️', 'sujet', 'Non. ❌', 'Le complément du nom est souvent introduit par une préposition (de, à, en…).'),
      Q('Que signifie la racine grecque « bio » (biologie, biographie) ?', 'la vie', 'l’eau', 'C’est « hydro ». 💧', 'la terre', 'C’est « géo ». 🌍', 'le temps', 'C’est « chrono ». ⏰', 'biologie = science de la vie ; biographie = récit d’une vie.'),
      Q('Que signifie la racine grecque « graph- » (graphie, autographe) ?', 'écrire', 'parler', 'C’est plutôt « phon- » ou « log- ». 🗣️', 'voir', 'C’est plutôt « scope ». 👁️', 'entendre', 'C’est plutôt « audi- » (latin). 👂', 'orthographe = écrire correctement.'),
      Q('Que signifie le préfixe latin « multi- » ?', 'plusieurs, nombreux', 'aucun', 'Non. 0️⃣', 'un seul', 'C’est « uni- » ou « mono- ». 1️⃣', 'petit', 'C’est « micro- ». 🔬', 'multicolore = de plusieurs couleurs.'),
      Q('Quel mot vient du latin « aqua » (l’eau) ?', 'aquarium', 'acrobate', 'Il vient du grec « akros » (en haut). 🤸', 'équipe', 'Rien à voir. ⚽', 'quartier', 'Rien à voir. 🏘️', 'aquarium, aquatique, aqueduc : la famille de l’eau.'),
      Q('Dans un récit en point de vue interne, que sait le lecteur ?', 'seulement ce que voit, pense et ressent un personnage', 'tout sur tous les personnages', 'Ça, c’est le point de vue omniscient. 👁️', 'rien du tout', 'Non. 🙈', 'seulement les dialogues', 'Non. 💬', 'Point de vue interne : on suit un personnage de l’intérieur.'),
      Q('Qu’est-ce que le point de vue externe ?', 'le narrateur décrit de l’extérieur, comme une caméra, sans dire ce que pensent les personnages', 'le narrateur sait tout', 'C’est l’omniscient. 👁️', 'le narrateur est le héros', 'C’est un récit à la première personne. 🙋', 'il n’y a pas de narrateur', 'Il y a toujours un narrateur. 📖', 'Point de vue externe : on voit les actions, pas les pensées.'),
      Q('Que signifie « téléphone » d’après ses racines grecques ?', 'la voix (ou le son) au loin', 'l’écriture rapide', 'Non. ✍️', 'la petite image', 'Non. 🖼️', 'la machine à parler', 'Presque, mais « télé » veut dire « loin ». 📏', 'télé = loin ; phone = voix, son.')
    ],
    en:[
      Q('How many attributive adjectives are there in “un grand jardin fleuri”?', 'two', 'one', 'Both “grand” AND “fleuri” describe the garden. 🌷', 'three', '“Un” is a determiner. 🔍', 'none', 'Yes there are: “grand” and “fleuri”. 🌳', 'An attributive adjective sits next to the noun, with no verb between them.'),
      Q('What is the head noun of the noun phrase “le petit chat de ma voisine”?', '“chat”', '“petit”', 'It is an attributive adjective. 🐱', '“voisine”', 'It is inside the noun complement. 🏠', '“le”', 'It is the determiner. 🔍', 'The head is the main noun, which everything else completes.'),
      Q('In “la ville de Lyon”, what is the function of “de Lyon”?', 'noun complement', 'direct object', 'There is no verb. 🔍', 'adverbial of place', 'It completes the noun “ville”, not a verb. 🏙️', 'subject', 'No. ❌', 'A noun complement is often introduced by a preposition (“de”, “à”, “en”…).'),
      Q('What does the Greek root “bio” mean (biology, biography)?', 'life', 'water', 'That is “hydro”. 💧', 'earth', 'That is “geo”. 🌍', 'time', 'That is “chrono”. ⏰', 'Biology = science of life; biography = story of a life.'),
      Q('What does the Greek root “graph-” mean (graphie, autograph)?', 'to write', 'to speak', 'That is more like “phon-” or “log-”. 🗣️', 'to see', 'That is more like “scope”. 👁️', 'to hear', 'That is more like the Latin “audi-”. 👂', '“Orthographe” = writing correctly.'),
      Q('What does the Latin prefix “multi-” mean?', 'many, several', 'none', 'No. 0️⃣', 'only one', 'That is “uni-” or “mono-”. 1️⃣', 'small', 'That is “micro-”. 🔬', '“Multicolore” = with many colours.'),
      Q('Which word comes from the Latin “aqua” (water)?', '“aquarium”', '“acrobate”', 'It comes from the Greek “akros” (high). 🤸', '“équipe”', 'Nothing to do with it. ⚽', '“quartier”', 'Nothing to do with it. 🏘️', '“Aquarium”, “aquatique”, “aqueduc”: the water family.'),
      Q('In a story told from an internal point of view, what does the reader know?', 'only what one character sees, thinks and feels', 'everything about every character', 'That is the omniscient point of view. 👁️', 'nothing at all', 'No. 🙈', 'only the dialogue', 'No. 💬', 'Internal point of view: you follow one character from the inside.'),
      Q('What is the external point of view?', 'the narrator describes from outside, like a camera, without saying what characters think', 'the narrator knows everything', 'That is omniscient. 👁️', 'the narrator is the hero', 'That is a first-person story. 🙋', 'there is no narrator', 'There is always a narrator. 📖', 'External point of view: you see actions, not thoughts.'),
      Q('What does “téléphone” mean according to its Greek roots?', 'the voice (or sound) from afar', 'fast writing', 'No. ✍️', 'the small picture', 'No. 🖼️', 'the talking machine', 'Close, but “télé” means “far”. 📏', '“télé” = far; “phone” = voice, sound.')
    ],
    es:[
      Q('¿Cuántos adjetivos epítetos hay en «un grand jardin fleuri»?', 'dos', 'uno', '«grand» Y «fleuri» califican al jardín. 🌷', 'tres', '«un» es un determinante. 🔍', 'ninguno', 'Sí los hay: «grand» y «fleuri». 🌳', 'El epíteto va junto al sustantivo, sin verbo entre ellos.'),
      Q('¿Cuál es el núcleo del grupo nominal «le petit chat de ma voisine»?', '«chat»', '«petit»', 'Es un adjetivo epíteto. 🐱', '«voisine»', 'Está dentro del complemento del nombre. 🏠', '«le»', 'Es el determinante. 🔍', 'El núcleo es el sustantivo principal, al que completa todo lo demás.'),
      Q('En «la ville de Lyon», ¿qué función tiene «de Lyon»?', 'complemento del nombre', 'complemento directo', 'No hay verbo. 🔍', 'complemento circunstancial de lugar', 'Completa al sustantivo «ville», no a un verbo. 🏙️', 'sujeto', 'No. ❌', 'El complemento del nombre suele ir introducido por una preposición («de», «à», «en»…).'),
      Q('¿Qué significa la raíz griega «bio» (biología, biografía)?', 'la vida', 'el agua', 'Eso es «hidro». 💧', 'la tierra', 'Eso es «geo». 🌍', 'el tiempo', 'Eso es «crono». ⏰', 'Biología = ciencia de la vida; biografía = relato de una vida.'),
      Q('¿Qué significa la raíz griega «graph-» (grafía, autógrafo)?', 'escribir', 'hablar', 'Eso es más bien «fon-» o «log-». 🗣️', 'ver', 'Eso es más bien «scopio». 👁️', 'oír', 'Eso es más bien el latín «audi-». 👂', '«Orthographe» = escribir correctamente.'),
      Q('¿Qué significa el prefijo latino «multi-»?', 'varios, muchos', 'ninguno', 'No. 0️⃣', 'uno solo', 'Eso es «uni-» o «mono-». 1️⃣', 'pequeño', 'Eso es «micro-». 🔬', '«Multicolore» = de muchos colores.'),
      Q('¿Qué palabra viene del latín «aqua» (agua)?', '«aquarium»', '«acrobate»', 'Viene del griego «akros» (alto). 🤸', '«équipe»', 'No tiene nada que ver. ⚽', '«quartier»', 'No tiene nada que ver. 🏘️', '«Aquarium», «aquatique», «aqueduc»: la familia del agua.'),
      Q('En un relato con punto de vista interno, ¿qué sabe el lector?', 'solo lo que ve, piensa y siente un personaje', 'todo sobre todos los personajes', 'Ese es el punto de vista omnisciente. 👁️', 'nada en absoluto', 'No. 🙈', 'solo los diálogos', 'No. 💬', 'Punto de vista interno: se sigue a un personaje desde dentro.'),
      Q('¿Qué es el punto de vista externo?', 'el narrador describe desde fuera, como una cámara, sin decir lo que piensan los personajes', 'el narrador lo sabe todo', 'Ese es el omnisciente. 👁️', 'el narrador es el héroe', 'Eso es un relato en primera persona. 🙋', 'no hay narrador', 'Siempre hay un narrador. 📖', 'Punto de vista externo: se ven las acciones, no los pensamientos.'),
      Q('¿Qué significa «téléphone» según sus raíces griegas?', 'la voz (o el sonido) a lo lejos', 'la escritura rápida', 'No. ✍️', 'la imagen pequeña', 'No. 🖼️', 'la máquina de hablar', 'Casi, pero «télé» significa «lejos». 📏', '«télé» = lejos; «phone» = voz, sonido.')
    ]
  });

  // ═════════ Accord du participe passé ═════════
  L('francais', 'accords', {
    fr:[
      Q('Complète : « Les pommes que tu as mangé… »', 'mangées', 'mangé', 'Le COD « que » (les pommes) est placé avant : on accorde. 🍎', 'mangés', '« pommes » est féminin. 👗', 'mangée', '« pommes » est pluriel. 👥', 'Avec avoir, accord avec le COD placé avant le verbe.'),
      Q('Complète : « Elles se sont parlé… »', 'parlé (on parle À quelqu’un)', 'parlées', '« se » est COI ici : pas d’accord. 🔄', 'parlés', 'Pas d’accord, et pas au masculin. ❌', 'parlée', 'Non. ❌', 'Verbe pronominal : si « se » est COI (parler à), le participe ne s’accorde pas.'),
      Q('Complète : « Les enfants sont rentré… »', 'rentrés', 'rentré', 'Avec être, on accorde avec le sujet : pluriel. 👥', 'rentrées', '« enfants » au masculin par défaut. 👦', 'rentrer', 'C’est l’infinitif. 🔄', 'Avec être, le participe s’accorde avec le sujet.'),
      Q('Complète : « Cette histoire, je l’ai lu… »', 'lue', 'lu', '« l’ » remplace « cette histoire », placé avant : on accorde. 📖', 'lus', '« histoire » est singulier. 1️⃣', 'lues', 'Une seule histoire. 1️⃣', 'Le pronom COD placé avant (l’ = l’histoire) entraîne l’accord.')
    ],
    en:[
      Q('Complete: “Les pommes que tu as mangé…”', '“mangées”', '“mangé”', 'The direct object “que” (the apples) comes first: it agrees. 🍎', '“mangés”', '“Pommes” is feminine. 👗', '“mangée”', '“Pommes” is plural. 👥', 'With “avoir”, agreement with a direct object placed before the verb.'),
      Q('Complete: “Elles se sont parlé…”', '“parlé” (you speak TO someone)', '“parlées”', 'Here “se” is an indirect object: no agreement. 🔄', '“parlés”', 'No agreement, and not masculine. ❌', '“parlée”', 'No. ❌', 'Reflexive verb: if “se” is an indirect object (“parler à”), the participle does not agree.'),
      Q('Complete: “Les enfants sont rentré…”', '“rentrés”', '“rentré”', 'With “être”, it agrees with the subject: plural. 👥', '“rentrées”', '“Enfants” is masculine by default. 👦', '“rentrer”', 'That is the infinitive. 🔄', 'With “être”, the participle agrees with the subject.'),
      Q('Complete: “Cette histoire, je l’ai lu…”', '“lue”', '“lu”', '“l’” stands for “cette histoire”, placed before: it agrees. 📖', '“lus”', '“Histoire” is singular. 1️⃣', '“lues”', 'Only one story. 1️⃣', 'A direct object pronoun placed before (“l’” = the story) triggers agreement.')
    ],
    es:[
      Q('Completa: «Les pommes que tu as mangé…»', '«mangées»', '«mangé»', 'El complemento directo «que» (las manzanas) va delante: concuerda. 🍎', '«mangés»', '«Pommes» es femenino. 👗', '«mangée»', '«Pommes» es plural. 👥', 'Con «avoir», concordancia con el complemento directo situado antes del verbo.'),
      Q('Completa: «Elles se sont parlé…»', '«parlé» (se habla A alguien)', '«parlées»', 'Aquí «se» es complemento indirecto: no concuerda. 🔄', '«parlés»', 'No concuerda, y no es masculino. ❌', '«parlée»', 'No. ❌', 'Verbo pronominal: si «se» es complemento indirecto («parler à»), el participio no concuerda.'),
      Q('Completa: «Les enfants sont rentré…»', '«rentrés»', '«rentré»', 'Con «être», concuerda con el sujeto: plural. 👥', '«rentrées»', '«Enfants» es masculino por defecto. 👦', '«rentrer»', 'Es el infinitivo. 🔄', 'Con «être», el participio concuerda con el sujeto.'),
      Q('Completa: «Cette histoire, je l’ai lu…»', '«lue»', '«lu»', '«l’» sustituye a «cette histoire», situado delante: concuerda. 📖', '«lus»', '«Histoire» es singular. 1️⃣', '«lues»', 'Una sola historia. 1️⃣', 'El pronombre complemento directo situado delante («l’» = la historia) provoca la concordancia.')
    ]
  });

  // ═════════ Cours de 5e ═════════
  L('francais', 'cours-5e', {
    fr:[
      Q('Quel est le passé composé de « prendre » avec « nous » ?', 'nous avons pris', 'nous avons prendu', 'Participe irrégulier : pris. ✏️', 'nous sommes pris', 'Prendre se conjugue avec avoir. 🔄', 'nous avons pri', 'Il manque le s. ✏️', 'prendre → pris ; apprendre → appris ; comprendre → compris.'),
      Q('Comment appelle-t-on celui qui raconte l’histoire dans un récit ?', 'le narrateur', 'l’auteur', 'L’auteur écrit le livre ; le narrateur raconte, ce n’est pas toujours le même. ✍️', 'le lecteur', 'C’est toi ! 📖', 'le héros', 'Le héros peut raconter, mais pas toujours. 🦸', 'Le narrateur est la voix qui raconte.'),
      Q('Qui dirige les chevaliers de la Table ronde ?', 'le roi Arthur', 'Lancelot', 'C’est l’un de ses chevaliers. ⚔️', 'Merlin', 'C’est l’enchanteur. 🧙', 'Roland', 'Il est le neveu de Charlemagne. 📯', 'Les légendes arthuriennes sont nées au Moyen Âge.'),
      Q('Qu’est-ce que le comique de mots ?', 'le rire provoqué par les mots (jeux de mots, répétitions, déformations)', 'les coups de bâton sur scène', 'C’est le comique de gestes. 🪵', 'une situation absurde', 'C’est le comique de situation. 🎭', 'le défaut d’un personnage', 'C’est le comique de caractère. 🤑', 'Quatre comiques : de mots, de gestes, de situation, de caractère.'),
      Q('Qui a écrit « Le Malade imaginaire » (1673) ?', 'Molière', 'Racine', 'Il écrit surtout des tragédies. 🎭', 'Corneille', 'Il est célèbre pour « Le Cid ». ⚔️', 'La Fontaine', 'Il écrit des fables. 🦊', 'C’est la dernière pièce de Molière.')
    ],
    en:[
      Q('What is the “passé composé” of “prendre” with “nous”?', '“nous avons pris”', '“nous avons prendu”', 'Irregular participle: “pris”. ✏️', '“nous sommes pris”', 'This verb is conjugated with “avoir”. 🔄', '“nous avons pri”', 'The s is missing. ✏️', '“prendre” → “pris” ; “apprendre” → “appris” ; “comprendre” → “compris”.'),
      Q('What is the person who tells the story in a narrative called?', 'the narrator', 'the author', 'The author writes the book; the narrator tells it, not always the same. ✍️', 'the reader', 'That is you! 📖', 'the hero', 'The hero can tell it, but not always. 🦸', 'The narrator is the voice that tells the story.'),
      Q('Who leads the Knights of the Round Table?', 'King Arthur', 'Lancelot', 'He is one of his knights. ⚔️', 'Merlin', 'He is the wizard. 🧙', 'Roland', 'He is Charlemagne’s nephew. 📯', 'The Arthurian legends were born in the Middle Ages.'),
      Q('What is verbal comedy?', 'laughter caused by words (puns, repetitions, distortions)', 'blows with a stick on stage', 'That is slapstick. 🪵', 'an absurd situation', 'That is situational comedy. 🎭', 'a character’s flaw', 'That is comedy of character. 🤑', 'Four kinds: words, gestures, situation, character.'),
      Q('Who wrote “Le Malade imaginaire” (1673)?', 'Molière', 'Racine', 'He mainly wrote tragedies. 🎭', 'Corneille', 'He is famous for “Le Cid”. ⚔️', 'La Fontaine', 'He wrote fables. 🦊', 'It was Molière’s last play.')
    ],
    es:[
      Q('¿Cuál es el «passé composé» de «prendre» con «nous»?', '«nous avons pris»', '«nous avons prendu»', 'Participio irregular: «pris». ✏️', '«nous sommes pris»', 'Este verbo se conjuga con «avoir». 🔄', '«nous avons pri»', 'Falta la s. ✏️', '«prendre» → «pris» ; «apprendre» → «appris» ; «comprendre» → «compris».'),
      Q('¿Cómo se llama quien cuenta la historia en un relato?', 'el narrador', 'el autor', 'El autor escribe el libro; el narrador lo cuenta, no siempre son el mismo. ✍️', 'el lector', '¡Ese eres tú! 📖', 'el héroe', 'El héroe puede contarlo, pero no siempre. 🦸', 'El narrador es la voz que cuenta.'),
      Q('¿Quién dirige a los caballeros de la Mesa Redonda?', 'el rey Arturo', 'Lanzarote', 'Es uno de sus caballeros. ⚔️', 'Merlín', 'Es el mago. 🧙', 'Roldán', 'Es el sobrino de Carlomagno. 📯', 'Las leyendas artúricas nacieron en la Edad Media.'),
      Q('¿Qué es lo cómico de palabras?', 'la risa provocada por las palabras (juegos de palabras, repeticiones, deformaciones)', 'los golpes de bastón en escena', 'Eso es lo cómico de gestos. 🪵', 'una situación absurda', 'Eso es lo cómico de situación. 🎭', 'el defecto de un personaje', 'Eso es lo cómico de carácter. 🤑', 'Cuatro tipos: de palabras, de gestos, de situación, de carácter.'),
      Q('¿Quién escribió «Le Malade imaginaire» (1673)?', 'Molière', 'Racine', 'Escribió sobre todo tragedias. 🎭', 'Corneille', 'Es famoso por «Le Cid». ⚔️', 'La Fontaine', 'Escribió fábulas. 🦊', 'Es la última obra de Molière.')
    ]
  });

  // ═════════ Conjugaison : modes et temps composés ═════════
  L('francais', 'cpl-modes', {
    fr:[
      Q('Subjonctif présent de « faire » avec « je » :', 'que je fasse', 'que je fais', 'C’est l’indicatif. 🔄', 'que je ferais', 'C’est le conditionnel. 🔄', 'que je fisse', 'C’est le subjonctif imparfait, très soutenu. 🎩', 'que je fasse, que tu fasses, qu’il fasse…'),
      Q('Subjonctif présent de « avoir » avec « ils » :', 'qu’ils aient', 'qu’ils ont', 'C’est l’indicatif. 🔄', 'qu’ils aies', 'Ça, c’est « que tu aies ». ✏️', 'qu’ils auraient', 'C’est le conditionnel. 🔄', 'que j’aie, que tu aies, qu’il ait, que nous ayons, que vous ayez, qu’ils aient.'),
      Q('Impératif présent de « aller » à la 2e personne du singulier :', 'va', 'vas', 'Pas de s à l’impératif (sauf « vas-y »). ✂️', 'allez', 'C’est la 2e personne du pluriel. 👥', 'aille', 'C’est le subjonctif. 🔄', 'Va ! mais : Vas-y !'),
      Q('Conditionnel présent de « être » avec « nous » :', 'nous serions', 'nous serons', 'C’est le futur. ⏩', 'nous soyons', 'C’est le subjonctif. 🔄', 'nous étions', 'C’est l’imparfait. ⏪', 'Conditionnel : radical du futur + terminaisons de l’imparfait.'),
      Q('Futur antérieur de « partir » avec « elle » :', 'elle sera partie', 'elle aura parti', 'Partir se conjugue avec être. 🔄', 'elle sera parti', 'Avec être, accord avec le sujet : partie. 👧', 'elle serait partie', 'C’est le conditionnel passé. 🔄', 'Futur antérieur : auxiliaire au futur + participe passé.'),
      Q('Plus-que-parfait de « voir » avec « nous » :', 'nous avions vu', 'nous avons vu', 'C’est le passé composé. 🔄', 'nous aurions vu', 'C’est le conditionnel passé. 🔄', 'nous eûmes vu', 'C’est le passé antérieur. 🔄', 'Plus-que-parfait : auxiliaire à l’imparfait + participe passé.'),
      Q('Quel mode sert à donner un ordre ou un conseil ?', 'l’impératif', 'le subjonctif', 'Il exprime le souhait, le doute, la nécessité. 💭', 'le conditionnel', 'Il exprime l’hypothèse ou la politesse. 🤔', 'l’indicatif', 'Il présente des faits réels. 📰', 'Impératif : Viens ! Range ta chambre !'),
      Q('Complète : « Il faut que nous ___ (partir) tôt. »', 'partions', 'partons', 'C’est l’indicatif ; après « il faut que », subjonctif. 🔄', 'partirons', 'C’est le futur. ⏩', 'partirions', 'C’est le conditionnel. 🔄', '« il faut que » est suivi du subjonctif.')
    ],
    en:[
      Q('Present subjunctive of “faire” with “je”:', '“que je fasse”', '“que je fais”', 'That is the indicative. 🔄', '“que je ferais”', 'That is the conditional. 🔄', '“que je fisse”', 'That is the imperfect subjunctive, very formal. 🎩', '“que je fasse, que tu fasses, qu’il fasse…”'),
      Q('Present subjunctive of “avoir” with “ils”:', '“qu’ils aient”', '“qu’ils ont”', 'That is the indicative. 🔄', '“qu’ils aies”', 'That form goes with the 2nd person singular. ✏️', '“qu’ils auraient”', 'That is the conditional. 🔄', '“que j’aie, que tu aies, qu’il ait, que nous ayons, que vous ayez, qu’ils aient”.'),
      Q('Present imperative of “aller”, 2nd person singular:', '“va”', '“vas”', 'No s in the imperative (except “vas-y”). ✂️', '“allez”', 'That is the 2nd person plural. 👥', '“aille”', 'That is the subjunctive. 🔄', '“Va !” but “Vas-y !”'),
      Q('Present conditional of “être” with “nous”:', '“nous serions”', '“nous serons”', 'That is the future. ⏩', '“nous soyons”', 'That is the subjunctive. 🔄', '“nous étions”', 'That is the imperfect. ⏪', 'Conditional: future stem + imperfect endings.'),
      Q('Future perfect of “partir” with “elle”:', '“elle sera partie”', '“elle aura parti”', 'This verb is conjugated with “être”. 🔄', '“elle sera parti”', 'With “être”, it agrees with the subject. 👧', '“elle serait partie”', 'That is the past conditional. 🔄', 'Future perfect: auxiliary in the future + past participle.'),
      Q('Pluperfect of “voir” with “nous”:', '“nous avions vu”', '“nous avons vu”', 'That is the “passé composé”. 🔄', '“nous aurions vu”', 'That is the past conditional. 🔄', '“nous eûmes vu”', 'That is the past anterior. 🔄', 'Pluperfect: auxiliary in the imperfect + past participle.'),
      Q('Which mood is used to give an order or advice?', 'the imperative', 'the subjunctive', 'It expresses wishes, doubt, necessity. 💭', 'the conditional', 'It expresses hypothesis or politeness. 🤔', 'the indicative', 'It presents real facts. 📰', 'Imperative: “Viens !”, “Range ta chambre !”'),
      Q('Complete: “Il faut que nous ___ (partir) tôt.”', '“partions”', '“partons”', 'That is the indicative; after “il faut que”, subjunctive. 🔄', '“partirons”', 'That is the future. ⏩', '“partirions”', 'That is the conditional. 🔄', '“Il faut que” is followed by the subjunctive.')
    ],
    es:[
      Q('Subjuntivo presente de «faire» con «je»:', '«que je fasse»', '«que je fais»', 'Es el indicativo. 🔄', '«que je ferais»', 'Es el condicional. 🔄', '«que je fisse»', 'Es el subjuntivo imperfecto, muy formal. 🎩', '«que je fasse, que tu fasses, qu’il fasse…»'),
      Q('Subjuntivo presente de «avoir» con «ils»:', '«qu’ils aient»', '«qu’ils ont»', 'Es el indicativo. 🔄', '«qu’ils aies»', 'Esa forma va con la 2.ª persona del singular. ✏️', '«qu’ils auraient»', 'Es el condicional. 🔄', '«que j’aie, que tu aies, qu’il ait, que nous ayons, que vous ayez, qu’ils aient».'),
      Q('Imperativo presente de «aller», 2.ª persona del singular:', '«va»', '«vas»', 'Sin s en imperativo (salvo «vas-y»). ✂️', '«allez»', 'Es la 2.ª persona del plural. 👥', '«aille»', 'Es el subjuntivo. 🔄', '«Va !» pero «Vas-y !»'),
      Q('Condicional presente de «être» con «nous»:', '«nous serions»', '«nous serons»', 'Es el futuro. ⏩', '«nous soyons»', 'Es el subjuntivo. 🔄', '«nous étions»', 'Es el imperfecto. ⏪', 'Condicional: raíz del futuro + terminaciones del imperfecto.'),
      Q('Futuro perfecto de «partir» con «elle»:', '«elle sera partie»', '«elle aura parti»', 'Este verbo se conjuga con «être». 🔄', '«elle sera parti»', 'Con «être», concuerda con el sujeto. 👧', '«elle serait partie»', 'Es el condicional pasado. 🔄', 'Futuro perfecto: auxiliar en futuro + participio.'),
      Q('Pluscuamperfecto de «voir» con «nous»:', '«nous avions vu»', '«nous avons vu»', 'Es el «passé composé». 🔄', '«nous aurions vu»', 'Es el condicional pasado. 🔄', '«nous eûmes vu»', 'Es el pretérito anterior. 🔄', 'Pluscuamperfecto: auxiliar en imperfecto + participio.'),
      Q('¿Qué modo sirve para dar una orden o un consejo?', 'el imperativo', 'el subjuntivo', 'Expresa deseo, duda, necesidad. 💭', 'el condicional', 'Expresa hipótesis o cortesía. 🤔', 'el indicativo', 'Presenta hechos reales. 📰', 'Imperativo: «Viens !», «Range ta chambre !»'),
      Q('Completa: «Il faut que nous ___ (partir) tôt.»', '«partions»', '«partons»', 'Es el indicativo; tras «il faut que», subjuntivo. 🔄', '«partirons»', 'Es el futuro. ⏩', '«partirions»', 'Es el condicional. 🔄', '«Il faut que» va seguido de subjuntivo.')
    ]
  });

  // ═════════ 5e : voyager en poésie, héroïnes et héros ═════════
  L('francais', 'cpl-5e-entrees', {
    fr:[
      Q('Qui a composé « L’Odyssée » ?', 'Homère', 'Virgile', 'Il a écrit « L’Énéide », en latin. 🏛️', 'Ovide', 'Il a écrit « Les Métamorphoses ». 🦋', 'Sophocle', 'Il a écrit des tragédies. 🎭', 'L’Odyssée raconte le long retour d’Ulysse à Ithaque.'),
      Q('Quel poète écrit « Le Bateau ivre » (1871) ?', 'Arthur Rimbaud', 'Charles Baudelaire', 'Lui, c’est « L’Invitation au voyage ». ⛵', 'Victor Hugo', 'Non. 📚', 'Paul Verlaine', 'Ami de Rimbaud, mais pas l’auteur. 🎻', 'Rimbaud l’écrit à 16 ans, sans avoir jamais vu la mer.'),
      Q('Quel personnage de Jules Verne commande le Nautilus dans « Vingt mille lieues sous les mers » ?', 'le capitaine Nemo', 'Phileas Fogg', 'Lui fait le tour du monde en 80 jours. 🌍', 'Michel Strogoff', 'Lui traverse la Sibérie. ❄️', 'Robinson Crusoé', 'Lui vient d’un autre roman. 🏝️', 'Nemo signifie « personne » en latin.'),
      Q('Qui a écrit « Robinson Crusoé » (1719) ?', 'Daniel Defoe', 'Jules Verne', 'Il est né plus d’un siècle après. 📅', 'Jonathan Swift', 'Lui a écrit « Les Voyages de Gulliver ». 🧭', 'Robert Louis Stevenson', 'Lui a écrit « L’Île au trésor ». 🏴‍☠️', 'Robinson survit seul sur une île pendant des années.'),
      Q('Quel roman de Stevenson raconte une chasse au trésor de pirates ?', '« L’Île au trésor »', '« Moby Dick »', 'C’est la chasse d’une baleine, par Melville. 🐋', '« Peter Pan »', 'C’est le pays imaginaire de Barrie. 🧚', '« Les Misérables »', 'C’est Victor Hugo. 📚', 'Le jeune Jim Hawkins y croise le pirate Long John Silver.'),
      Q('Comment appelle-t-on un vers sans rime ni nombre fixe de syllabes ?', 'un vers libre', 'un alexandrin', 'Lui a 12 syllabes. 🔢', 'un octosyllabe', 'Lui a 8 syllabes. 🔢', 'un sonnet', 'C’est un poème de 14 vers. 📜', 'Le vers libre se développe surtout à partir de la fin du XIXe siècle.'),
      Q('Qu’est-ce qu’une épopée ?', 'un long récit qui raconte les exploits d’un héros', 'un court poème d’amour', 'Non. 💌', 'une pièce comique', 'Non. 🎭', 'une lettre', 'Non. ✉️', 'L’Iliade, L’Odyssée, La Chanson de Roland sont des épopées.'),
      Q('Quel héros souffle dans son cor à Roncevaux ?', 'Roland', 'Lancelot', 'C’est un chevalier de la Table ronde. ⚔️', 'Perceval', 'Lui cherche le Graal. 🏆', 'Arthur', 'C’est le roi de la Table ronde. 👑', 'La Chanson de Roland est l’une des plus anciennes chansons de geste.'),
      Q('Comment s’appelle l’épée de Roland ?', 'Durandal', 'Excalibur', 'C’est celle du roi Arthur. 🗡️', 'Joyeuse', 'C’est celle de Charlemagne. ⚔️', 'Tizona', 'C’est celle du Cid. 🛡️', 'Roland tente de briser Durandal pour qu’elle ne tombe pas aux mains de l’ennemi.'),
      Q('Quelle héroïne de L’Odyssée attend Ulysse pendant vingt ans en tissant une toile ?', 'Pénélope', 'Hélène', 'Son enlèvement déclenche la guerre de Troie. 🏰', 'Athéna', 'C’est la déesse qui protège Ulysse. 🦉', 'Circé', 'C’est la magicienne qui change les marins en porcs. 🐷', 'Pénélope défait la nuit ce qu’elle tisse le jour pour repousser ses prétendants.'),
      Q('Qu’est-ce qu’un récit de voyage ?', 'le récit d’un voyage, souvent à la première personne, avec la découverte de lieux et de peuples', 'un guide d’horaires de train', 'Non. 🚆', 'un roman policier', 'Non. 🕵️', 'un poème sur la maison', 'Non. 🏠', 'Exemple : « Le Livre des merveilles » de Marco Polo.'),
      Q('Quel navigateur lance la première expédition autour du monde (1519-1522) ?', 'Magellan', 'Christophe Colomb', 'Lui arrive en Amérique en 1492. 🌎', 'Vasco de Gama', 'Lui rejoint l’Inde par l’Afrique. 🌍', 'Marco Polo', 'Lui voyage à pied et à cheval jusqu’en Chine. 🐪', 'Magellan meurt en route ; Elcano achève le voyage.')
    ],
    en:[
      Q('Who composed the Odyssey?', 'Homer', 'Virgil', 'He wrote the Aeneid, in Latin. 🏛️', 'Ovid', 'He wrote the Metamorphoses. 🦋', 'Sophocles', 'He wrote tragedies. 🎭', 'The Odyssey tells of Ulysses’ long journey home to Ithaca.'),
      Q('Which poet wrote “Le Bateau ivre” (1871)?', 'Arthur Rimbaud', 'Charles Baudelaire', 'His is “L’Invitation au voyage”. ⛵', 'Victor Hugo', 'No. 📚', 'Paul Verlaine', 'A friend of Rimbaud, but not the author. 🎻', 'Rimbaud wrote it at 16, without ever having seen the sea.'),
      Q('Which Jules Verne character commands the Nautilus in “Twenty Thousand Leagues Under the Sea”?', 'Captain Nemo', 'Phileas Fogg', 'He goes around the world in 80 days. 🌍', 'Michael Strogoff', 'He crosses Siberia. ❄️', 'Robinson Crusoe', 'He comes from another novel. 🏝️', 'Nemo means “nobody” in Latin.'),
      Q('Who wrote Robinson Crusoe (1719)?', 'Daniel Defoe', 'Jules Verne', 'He was born over a century later. 📅', 'Jonathan Swift', 'He wrote Gulliver’s Travels. 🧭', 'Robert Louis Stevenson', 'He wrote Treasure Island. 🏴‍☠️', 'Robinson survives alone on an island for years.'),
      Q('Which Stevenson novel is about a pirate treasure hunt?', 'Treasure Island', 'Moby Dick', 'That is a whale hunt, by Melville. 🐋', 'Peter Pan', 'That is Barrie’s Neverland. 🧚', 'Les Misérables', 'That is Victor Hugo. 📚', 'Young Jim Hawkins meets the pirate Long John Silver.'),
      Q('What do we call a line of poetry with no rhyme and no fixed number of syllables?', 'free verse', 'an alexandrine', 'That has 12 syllables. 🔢', 'an octosyllable', 'That has 8 syllables. 🔢', 'a sonnet', 'That is a 14-line poem. 📜', 'Free verse spread mainly from the end of the 19th century.'),
      Q('What is an epic?', 'a long story telling the great deeds of a hero', 'a short love poem', 'No. 💌', 'a comic play', 'No. 🎭', 'a letter', 'No. ✉️', 'The Iliad, the Odyssey and the Song of Roland are epics.'),
      Q('Which hero blows his horn at Roncevaux?', 'Roland', 'Lancelot', 'He is a Knight of the Round Table. ⚔️', 'Perceval', 'He seeks the Grail. 🏆', 'Arthur', 'He is the king of the Round Table. 👑', 'The Song of Roland is one of the oldest epic poems in French.'),
      Q('What is the name of Roland’s sword?', 'Durendal', 'Excalibur', 'That is King Arthur’s. 🗡️', 'Joyeuse', 'That is Charlemagne’s. ⚔️', 'Tizona', 'That is El Cid’s. 🛡️', 'Roland tries to break Durendal so that the enemy cannot take it.'),
      Q('Which heroine of the Odyssey waits twenty years for Ulysses, weaving a cloth?', 'Penelope', 'Helen', 'Her abduction starts the Trojan War. 🏰', 'Athena', 'She is the goddess who protects Ulysses. 🦉', 'Circe', 'She is the witch who turns sailors into pigs. 🐷', 'Penelope undoes at night what she weaves by day to keep her suitors away.'),
      Q('What is a travel narrative?', 'the account of a journey, often in the first person, discovering places and peoples', 'a train timetable', 'No. 🚆', 'a detective novel', 'No. 🕵️', 'a poem about the house', 'No. 🏠', 'Example: Marco Polo’s “Book of Marvels”.'),
      Q('Which navigator led the first expedition around the world (1519-1522)?', 'Magellan', 'Christopher Columbus', 'He reached America in 1492. 🌎', 'Vasco da Gama', 'He reached India around Africa. 🌍', 'Marco Polo', 'He travelled overland to China. 🐪', 'Magellan died on the way; Elcano completed the voyage.')
    ],
    es:[
      Q('¿Quién compuso la Odisea?', 'Homero', 'Virgilio', 'Escribió la Eneida, en latín. 🏛️', 'Ovidio', 'Escribió las Metamorfosis. 🦋', 'Sófocles', 'Escribió tragedias. 🎭', 'La Odisea cuenta el largo regreso de Ulises a Ítaca.'),
      Q('¿Qué poeta escribió «Le Bateau ivre» (1871)?', 'Arthur Rimbaud', 'Charles Baudelaire', 'El suyo es «L’Invitation au voyage». ⛵', 'Victor Hugo', 'No. 📚', 'Paul Verlaine', 'Amigo de Rimbaud, pero no el autor. 🎻', 'Rimbaud lo escribe a los 16 años, sin haber visto nunca el mar.'),
      Q('¿Qué personaje de Julio Verne manda el Nautilus en «Veinte mil leguas de viaje submarino»?', 'el capitán Nemo', 'Phileas Fogg', 'Él da la vuelta al mundo en 80 días. 🌍', 'Miguel Strogoff', 'Él atraviesa Siberia. ❄️', 'Robinson Crusoe', 'Él viene de otra novela. 🏝️', 'Nemo significa «nadie» en latín.'),
      Q('¿Quién escribió Robinson Crusoe (1719)?', 'Daniel Defoe', 'Julio Verne', 'Nació más de un siglo después. 📅', 'Jonathan Swift', 'Escribió Los viajes de Gulliver. 🧭', 'Robert Louis Stevenson', 'Escribió La isla del tesoro. 🏴‍☠️', 'Robinson sobrevive solo en una isla durante años.'),
      Q('¿Qué novela de Stevenson cuenta una búsqueda de un tesoro pirata?', 'La isla del tesoro', 'Moby Dick', 'Es la caza de una ballena, de Melville. 🐋', 'Peter Pan', 'Es el País de Nunca Jamás de Barrie. 🧚', 'Los miserables', 'Es de Victor Hugo. 📚', 'El joven Jim Hawkins se cruza con el pirata Long John Silver.'),
      Q('¿Cómo se llama un verso sin rima ni número fijo de sílabas?', 'un verso libre', 'un alejandrino', 'Tiene 12 sílabas. 🔢', 'un octosílabo', 'Tiene 8 sílabas. 🔢', 'un soneto', 'Es un poema de 14 versos. 📜', 'El verso libre se extiende sobre todo desde finales del siglo XIX.'),
      Q('¿Qué es una epopeya?', 'un largo relato que cuenta las hazañas de un héroe', 'un poema de amor breve', 'No. 💌', 'una obra cómica', 'No. 🎭', 'una carta', 'No. ✉️', 'La Ilíada, la Odisea y el Cantar de Roldán son epopeyas.'),
      Q('¿Qué héroe toca su cuerno en Roncesvalles?', 'Roldán', 'Lanzarote', 'Es un caballero de la Mesa Redonda. ⚔️', 'Perceval', 'Él busca el Grial. 🏆', 'Arturo', 'Es el rey de la Mesa Redonda. 👑', 'El Cantar de Roldán es uno de los cantares de gesta más antiguos.'),
      Q('¿Cómo se llama la espada de Roldán?', 'Durandarte (Durandal)', 'Excalibur', 'Es la del rey Arturo. 🗡️', 'Joyeuse', 'Es la de Carlomagno. ⚔️', 'Tizona', 'Es la del Cid. 🛡️', 'Roldán intenta romperla para que no caiga en manos enemigas.'),
      Q('¿Qué heroína de la Odisea espera a Ulises veinte años tejiendo una tela?', 'Penélope', 'Helena', 'Su rapto desencadena la guerra de Troya. 🏰', 'Atenea', 'Es la diosa que protege a Ulises. 🦉', 'Circe', 'Es la hechicera que convierte a los marineros en cerdos. 🐷', 'Penélope deshace de noche lo que teje de día para alejar a sus pretendientes.'),
      Q('¿Qué es un relato de viajes?', 'el relato de un viaje, a menudo en primera persona, descubriendo lugares y pueblos', 'un horario de trenes', 'No. 🚆', 'una novela policíaca', 'No. 🕵️', 'un poema sobre la casa', 'No. 🏠', 'Ejemplo: el «Libro de las maravillas» de Marco Polo.'),
      Q('¿Qué navegante dirigió la primera expedición alrededor del mundo (1519-1522)?', 'Magallanes', 'Cristóbal Colón', 'Llegó a América en 1492. 🌎', 'Vasco da Gama', 'Llegó a la India rodeando África. 🌍', 'Marco Polo', 'Viajó por tierra hasta China. 🐪', 'Magallanes murió en el viaje; Elcano lo completó.')
    ]
  });

  // ═════════ Figures de style ═════════
  L('francais', 'figures', {
    fr:[
      Q('« Le soleil souriait aux promeneurs. »', 'une personnification', 'une comparaison', 'Il n’y a pas d’outil comme « comme ». 🔍', 'une hyperbole', 'Il n’y a pas d’exagération. 📏', 'une litote', 'On ne dit pas moins pour dire plus. 🤏', 'Le soleil reçoit une action humaine : sourire.'),
      Q('« Boire un verre » (le contenant pour le contenu)', 'une métonymie', 'une métaphore', 'Il n’y a pas de ressemblance, mais un lien logique. 🔗', 'une comparaison', 'Pas d’outil de comparaison. 🔍', 'une litote', 'Non. 🤏', 'Métonymie : on désigne une chose par une autre qui lui est liée.'),
      Q('« Ce n’est pas mauvais » pour dire « c’est délicieux »', 'une litote', 'une hyperbole', 'C’est l’inverse : on en dit moins. 🤏', 'un oxymore', 'Il n’y a pas de mots contraires collés. 🔀', 'une antithèse', 'Non. ⚖️', 'Litote : dire moins pour faire entendre plus.'),
      Q('« Je suis content, ravi, fou de joie ! »', 'une gradation', 'une anaphore', 'Aucun mot n’est répété en début de vers ou de phrase. 🔁', 'une métaphore', 'Non. ❌', 'une litote', 'C’est le contraire d’une litote ! 🎉', 'Gradation : des termes de plus en plus forts.'),
      Q('« Un silence assourdissant »', 'un oxymore', 'une comparaison', 'Pas d’outil de comparaison. 🔍', 'une personnification', 'Non. ❌', 'une métonymie', 'Non. 🔗', 'Oxymore : deux mots de sens contraire réunis.'),
      Q('« Les sanglots longs / Des violons / De l’automne » (Verlaine) : répétition du son [ɔ̃]', 'une assonance', 'une allitération', 'L’allitération répète une consonne. 🔤', 'une anaphore', 'Non : c’est un son, pas un mot répété. 🔁', 'une rime seulement', 'Le son revient aussi à l’intérieur des vers. 🎵', 'Assonance : répétition d’un son voyelle.'),
      Q('« Mon bras, qu’avec respect toute l’Espagne admire, / Mon bras, qui tant de fois a sauvé cet empire » (Corneille)', 'une anaphore', 'une hyperbole', 'Regarde le début des deux vers. 👀', 'une litote', 'Non. 🤏', 'un oxymore', 'Non. 🔀', 'Anaphore : répétition d’un mot en tête de vers ou de phrase.'),
      Q('« Il est rusé comme un renard. »', 'une comparaison', 'une métaphore', 'Il y a l’outil « comme » : comparaison. 🦊', 'une personnification', 'Non. ❌', 'une hyperbole', 'Non. 📏', 'Comparaison : comparé + outil (comme, tel…) + comparant.'),
      Q('« Un bruit à réveiller tout le quartier jusqu’à l’autre bout de la ville »', 'une hyperbole', 'une litote', 'C’est l’inverse : on exagère. 📢', 'un euphémisme', 'L’euphémisme adoucit. 🕊️', 'une antithèse', 'Non. ⚖️', 'Hyperbole : exagération.'),
      Q('« Il est petit par la taille, mais grand par le cœur. »', 'une antithèse', 'un oxymore', 'Les contraires sont dans deux parties de la phrase, pas collés. 🔀', 'une comparaison', 'Non. 🔍', 'une métonymie', 'Non. 🔗', 'Antithèse : deux idées opposées rapprochées dans une phrase.')
    ],
    en:[
      Q('“Le soleil souriait aux promeneurs.”', 'personification', 'simile', 'There is no word like “comme”. 🔍', 'hyperbole', 'There is no exaggeration. 📏', 'litotes', 'It does not say less to mean more. 🤏', 'The sun is given a human action: smiling.'),
      Q('“Boire un verre” (the container for the contents)', 'metonymy', 'metaphor', 'There is no likeness, but a logical link. 🔗', 'simile', 'No comparison word. 🔍', 'litotes', 'No. 🤏', 'Metonymy: naming something by something linked to it.'),
      Q('“Ce n’est pas mauvais” meaning “it is delicious”', 'litotes', 'hyperbole', 'It is the opposite: it says less. 🤏', 'oxymoron', 'There are no opposite words side by side. 🔀', 'antithesis', 'No. ⚖️', 'Litotes: saying less to suggest more.'),
      Q('“Je suis content, ravi, fou de joie !”', 'climax (gradation)', 'anaphora', 'No word is repeated at the start of lines. 🔁', 'metaphor', 'No. ❌', 'litotes', 'It is the opposite of litotes! 🎉', 'Climax: words getting stronger and stronger.'),
      Q('“Un silence assourdissant”', 'oxymoron', 'simile', 'No comparison word. 🔍', 'personification', 'No. ❌', 'metonymy', 'No. 🔗', 'Oxymoron: two words with opposite meanings put together.'),
      Q('“Les sanglots longs / Des violons / De l’automne” (Verlaine): repeated vowel sound', 'assonance', 'alliteration', 'Alliteration repeats a consonant. 🔤', 'anaphora', 'No: it is a sound, not a repeated word. 🔁', 'only rhyme', 'The sound also comes back inside the lines. 🎵', 'Assonance: repeating a vowel sound.'),
      Q('“Mon bras, qu’avec respect toute l’Espagne admire, / Mon bras, qui tant de fois a sauvé cet empire” (Corneille)', 'anaphora', 'hyperbole', 'Look at how both lines begin. 👀', 'litotes', 'No. 🤏', 'oxymoron', 'No. 🔀', 'Anaphora: repeating a word at the start of lines or sentences.'),
      Q('“Il est rusé comme un renard.”', 'simile', 'metaphor', 'There is the word “comme”: it is a simile. 🦊', 'personification', 'No. ❌', 'hyperbole', 'No. 📏', 'Simile: thing compared + comparison word + what it is compared to.'),
      Q('“Un bruit à réveiller tout le quartier jusqu’à l’autre bout de la ville”', 'hyperbole', 'litotes', 'The opposite: it exaggerates. 📢', 'euphemism', 'A euphemism softens. 🕊️', 'antithesis', 'No. ⚖️', 'Hyperbole: exaggeration.'),
      Q('“Il est petit par la taille, mais grand par le cœur.”', 'antithesis', 'oxymoron', 'The opposites are in two parts of the sentence, not side by side. 🔀', 'simile', 'No. 🔍', 'metonymy', 'No. 🔗', 'Antithesis: two opposite ideas brought together in a sentence.')
    ],
    es:[
      Q('«Le soleil souriait aux promeneurs.»', 'una personificación', 'una comparación', 'No hay un nexo como «comme». 🔍', 'una hipérbole', 'No hay exageración. 📏', 'una lítote', 'No dice menos para decir más. 🤏', 'El sol recibe una acción humana: sonreír.'),
      Q('«Boire un verre» (el continente por el contenido)', 'una metonimia', 'una metáfora', 'No hay parecido, sino un vínculo lógico. 🔗', 'una comparación', 'No hay nexo comparativo. 🔍', 'una lítote', 'No. 🤏', 'Metonimia: se nombra una cosa con otra relacionada con ella.'),
      Q('«Ce n’est pas mauvais» para decir «está riquísimo»', 'una lítote', 'una hipérbole', 'Al revés: dice menos. 🤏', 'un oxímoron', 'No hay palabras contrarias juntas. 🔀', 'una antítesis', 'No. ⚖️', 'Lítote: decir menos para dar a entender más.'),
      Q('«Je suis content, ravi, fou de joie !»', 'una gradación', 'una anáfora', 'No se repite ninguna palabra al principio. 🔁', 'una metáfora', 'No. ❌', 'una lítote', '¡Es lo contrario de una lítote! 🎉', 'Gradación: términos cada vez más intensos.'),
      Q('«Un silence assourdissant»', 'un oxímoron', 'una comparación', 'No hay nexo comparativo. 🔍', 'una personificación', 'No. ❌', 'una metonimia', 'No. 🔗', 'Oxímoron: dos palabras de sentido contrario unidas.'),
      Q('«Les sanglots longs / Des violons / De l’automne» (Verlaine): sonido vocálico repetido', 'una asonancia', 'una aliteración', 'La aliteración repite una consonante. 🔤', 'una anáfora', 'No: es un sonido, no una palabra repetida. 🔁', 'solo una rima', 'El sonido vuelve también dentro de los versos. 🎵', 'Asonancia: repetición de un sonido vocálico.'),
      Q('«Mon bras, qu’avec respect toute l’Espagne admire, / Mon bras, qui tant de fois a sauvé cet empire» (Corneille)', 'una anáfora', 'una hipérbole', 'Fíjate en el comienzo de los dos versos. 👀', 'una lítote', 'No. 🤏', 'un oxímoron', 'No. 🔀', 'Anáfora: repetición de una palabra al principio de versos o frases.'),
      Q('«Il est rusé comme un renard.»', 'una comparación', 'una metáfora', 'Está el nexo «comme»: es una comparación. 🦊', 'una personificación', 'No. ❌', 'una hipérbole', 'No. 📏', 'Comparación: término comparado + nexo + término con el que se compara.'),
      Q('«Un bruit à réveiller tout le quartier jusqu’à l’autre bout de la ville»', 'una hipérbole', 'una lítote', 'Al revés: exagera. 📢', 'un eufemismo', 'El eufemismo suaviza. 🕊️', 'una antítesis', 'No. ⚖️', 'Hipérbole: exageración.'),
      Q('«Il est petit par la taille, mais grand par le cœur.»', 'una antítesis', 'un oxímoron', 'Los contrarios están en dos partes de la frase, no juntos. 🔀', 'una comparación', 'No. 🔍', 'una metonimia', 'No. 🔗', 'Antítesis: dos ideas opuestas reunidas en una frase.')
    ]
  });

  // ═════════ Cours de 4e ═════════
  L('francais', 'cours-4e', {
    fr:[
      Q('Quel est le passé simple de « faire » à la 3e personne du singulier ?', 'il fit', 'il fait', 'C’est le présent. ⏱️', 'il faisa', 'Faire est irrégulier. ✏️', 'il fut', 'C’est le passé simple de « être ». 🔄', 'je fis, tu fis, il fit, nous fîmes, vous fîtes, ils firent.'),
      Q('Dans « Je ne sais pas s’il viendra », la subordonnée est :', 'une interrogative indirecte', 'une relative', 'Il n’y a pas de pronom relatif. 🔍', 'une circonstancielle de cause', 'Elle n’explique pas pourquoi. 🤔', 'une proposition indépendante', 'Elle dépend de « je ne sais pas ». 🔗', '« si » introduit une question rapportée : interrogative indirecte.'),
      Q('Qui a écrit « La Vénus d’Ille » (1837), nouvelle fantastique ?', 'Prosper Mérimée', 'Guy de Maupassant', 'Lui, c’est « Le Horla ». 👻', 'Victor Hugo', 'Non. 📚', 'Émile Zola', 'Il est naturaliste, pas fantastique. ⛏️', 'Une statue de bronze y semble prendre vie…'),
      Q('Transforme au discours indirect : Elle dit : « Viens demain. »', 'Elle lui dit de venir le lendemain.', 'Elle lui dit qu’il vient demain.', 'C’est un ordre : on utilise « de » + infinitif. 📣', 'Elle lui dit : viens demain.', 'C’est encore du discours direct. 💬', 'Elle lui dit venir demain.', 'Il manque « de ». ✏️', 'Ordre rapporté : dire à quelqu’un DE faire quelque chose.'),
      Q('Qu’est-ce que la chute d’une nouvelle ?', 'une fin surprenante, inattendue', 'le début de l’histoire', 'C’est la situation initiale. 🔜', 'le titre', 'Non. 🏷️', 'le moment où un personnage tombe', 'Pas au sens propre ! 😄', 'La chute surprend le lecteur et éclaire tout le récit.')
    ],
    en:[
      Q('What is the past historic of “faire”, 3rd person singular?', '“il fit”', '“il fait”', 'That is the present. ⏱️', '“il faisa”', 'This verb is irregular. ✏️', '“il fut”', 'That is the past historic of “être”. 🔄', '“je fis, tu fis, il fit, nous fîmes, vous fîtes, ils firent”.'),
      Q('In “Je ne sais pas s’il viendra”, the subordinate clause is:', 'an indirect question', 'a relative clause', 'There is no relative pronoun. 🔍', 'an adverbial clause of cause', 'It does not explain why. 🤔', 'an independent clause', 'It depends on “je ne sais pas”. 🔗', '“Si” introduces a reported question: an indirect question.'),
      Q('Who wrote “La Vénus d’Ille” (1837), a fantastic short story?', 'Prosper Mérimée', 'Guy de Maupassant', 'His is “Le Horla”. 👻', 'Victor Hugo', 'No. 📚', 'Émile Zola', 'He is a naturalist, not a fantasy writer. ⛏️', 'A bronze statue seems to come to life…'),
      Q('Put into reported speech: Elle dit : “Viens demain.”', '“Elle lui dit de venir le lendemain.”', '“Elle lui dit qu’il vient demain.”', 'It is an order: use “de” + infinitive. 📣', '“Elle lui dit : viens demain.”', 'That is still direct speech. 💬', '“Elle lui dit venir demain.”', '“de” is missing. ✏️', 'Reported order: telling someone TO do something.'),
      Q('What is the twist at the end of a short story?', 'a surprising, unexpected ending', 'the beginning of the story', 'That is the opening situation. 🔜', 'the title', 'No. 🏷️', 'the moment a character falls over', 'Not literally! 😄', 'The twist surprises the reader and sheds light on the whole story.')
    ],
    es:[
      Q('¿Cuál es el «passé simple» de «faire» en 3.ª persona del singular?', '«il fit»', '«il fait»', 'Es el presente. ⏱️', '«il faisa»', 'Este verbo es irregular. ✏️', '«il fut»', 'Es el «passé simple» de «être». 🔄', '«je fis, tu fis, il fit, nous fîmes, vous fîtes, ils firent».'),
      Q('En «Je ne sais pas s’il viendra», la subordinada es:', 'una interrogativa indirecta', 'una relativa', 'No hay pronombre relativo. 🔍', 'una circunstancial de causa', 'No explica por qué. 🤔', 'una proposición independiente', 'Depende de «je ne sais pas». 🔗', '«Si» introduce una pregunta referida: interrogativa indirecta.'),
      Q('¿Quién escribió «La Vénus d’Ille» (1837), cuento fantástico?', 'Prosper Mérimée', 'Guy de Maupassant', 'El suyo es «Le Horla». 👻', 'Victor Hugo', 'No. 📚', 'Émile Zola', 'Es naturalista, no fantástico. ⛏️', 'Una estatua de bronce parece cobrar vida…'),
      Q('Pasa a estilo indirecto: Elle dit : «Viens demain.»', '«Elle lui dit de venir le lendemain.»', '«Elle lui dit qu’il vient demain.»', 'Es una orden: se usa «de» + infinitivo. 📣', '«Elle lui dit : viens demain.»', 'Sigue siendo estilo directo. 💬', '«Elle lui dit venir demain.»', 'Falta «de». ✏️', 'Orden referida: decirle a alguien QUE haga algo.'),
      Q('¿Qué es el desenlace sorpresa de un cuento?', 'un final sorprendente, inesperado', 'el comienzo de la historia', 'Es la situación inicial. 🔜', 'el título', 'No. 🏷️', 'el momento en que un personaje se cae', '¡No en sentido literal! 😄', 'El final sorprende al lector y da sentido a todo el relato.')
    ]
  });

  // ═════════ Dire l’amour (4e) ═════════
  L('francais', 'cpl-amour', {
    fr:[
      Q('Quel poète de la Pléiade écrit « Mignonne, allons voir si la rose… » ?', 'Pierre de Ronsard', 'Joachim du Bellay', 'Lui, c’est « Heureux qui, comme Ulysse… ». ⛵', 'Louise Labé', 'Grande poétesse lyonnaise, mais ce n’est pas elle. 💔', 'François Villon', 'Il vivait au XVe siècle. 📜', 'Ronsard invite à profiter de la jeunesse : la rose fane vite.'),
      Q('Comment appelle-t-on un poème de 14 vers (deux quatrains et deux tercets) ?', 'un sonnet', 'une ballade', 'Elle a d’autres règles. 🎶', 'un rondeau', 'Il a un refrain. 🔁', 'un haïku', 'C’est un poème japonais de trois vers. 🌸', 'Le sonnet vient d’Italie et devient très populaire à la Renaissance.'),
      Q('Quel poète écrit « Demain, dès l’aube… » pour sa fille Léopoldine ?', 'Victor Hugo', 'Alphonse de Lamartine', 'Lui, c’est « Le Lac ». 🏞️', 'Alfred de Musset', 'Non. 🎭', 'Charles Baudelaire', 'Non. 🌺', 'Le poème est publié dans « Les Contemplations » (1856).'),
      Q('Quelle pièce de Shakespeare raconte l’amour de deux jeunes gens de familles ennemies à Vérone ?', '« Roméo et Juliette »', '« Hamlet »', 'C’est un prince du Danemark. 💀', '« Macbeth »', 'C’est un roi d’Écosse ambitieux. 👑', '« Le Roi Lear »', 'C’est un vieux roi et ses filles. 👴', 'Les familles Montaigu et Capulet se haïssent.'),
      Q('Dans « Le Cid » de Corneille, quel dilemme déchire Rodrigue ?', 'choisir entre son amour pour Chimène et l’honneur de sa famille', 'choisir entre deux royaumes', 'Non. 🏰', 'choisir entre deux métiers', 'Non. 🛠️', 'choisir entre l’Espagne et la France', 'Non. 🗺️', 'Venger son père oblige Rodrigue à affronter le père de Chimène.'),
      Q('Quel poète du XXe siècle écrit pour Gala et Nusch, et « La courbe de tes yeux » ?', 'Paul Éluard', 'Louis Aragon', 'Lui écrit pour Elsa. 💌', 'Jacques Prévert', 'Non. 🍂', 'Guillaume Apollinaire', 'Lui, c’est « Le Pont Mirabeau ». 🌉', 'Éluard est l’un des grands poètes surréalistes de l’amour.'),
      Q('Quel poète écrit « Barbara » (« Rappelle-toi Barbara… ») ?', 'Jacques Prévert', 'Georges Brassens', 'Il est chanteur et poète, mais ce n’est pas lui. 🎸', 'Louis Aragon', 'Non. 💌', 'Victor Hugo', 'Non. 📚', 'Le poème est publié dans « Paroles » (1946).'),
      Q('Qu’est-ce que l’amour courtois au Moyen Âge ?', 'un amour où le chevalier sert sa dame avec respect et dévouement', 'un amour entre deux rois', 'Non. 👑', 'un mariage arrangé', 'Non. 💍', 'une chanson à boire', 'Non. 🍷', 'Le chevalier doit mériter sa dame par ses exploits.'),
      Q('Comment appelle-t-on la voix qui exprime ses sentiments dans un poème lyrique ?', 'le « je » lyrique', 'le narrateur omniscient', 'C’est un narrateur de roman. 📖', 'le lecteur', 'Non. 👀', 'un personnage secondaire', 'Non. 👥', 'Le « je » lyrique dit ses émotions : amour, tristesse, joie…'),
      Q('Quel couple de la mythologie est séparé quand Orphée se retourne en sortant des Enfers ?', 'Orphée et Eurydice', 'Tristan et Iseut', 'Eux, c’est le philtre d’amour. 🧪', 'Roméo et Juliette', 'Eux, c’est Vérone. 🏰', 'Ulysse et Pénélope', 'Eux se retrouvent à la fin ! 🎉', 'Orphée, musicien, va chercher Eurydice aux Enfers.'),
      Q('Quel champ lexical domine souvent un poème d’amour ?', 'celui des sentiments (cœur, aimer, tendresse…)', 'celui de la cuisine', 'Non. 🍳', 'celui du sport', 'Non. ⚽', 'celui de l’informatique', 'Non. 💻', 'Le champ lexical = ensemble de mots liés à un même thème.'),
      Q('Quelle tragédie de Racine montre une reine dévorée par une passion interdite pour Hippolyte ?', '« Phèdre »', '« Britannicus »', 'C’est l’histoire de Néron. 👑', '« Le Misanthrope »', 'C’est une comédie de Molière. 🎭', '« Le Cid »', 'C’est Corneille. ⚔️', 'Phèdre (1677) est l’une des plus célèbres tragédies françaises.')
    ],
    en:[
      Q('Which Pléiade poet wrote “Mignonne, allons voir si la rose…”?', 'Pierre de Ronsard', 'Joachim du Bellay', 'His is “Heureux qui, comme Ulysse…”. ⛵', 'Louise Labé', 'A great poet from Lyon, but not her. 💔', 'François Villon', 'He lived in the 15th century. 📜', 'Ronsard urges us to enjoy youth: the rose soon fades.'),
      Q('What is a 14-line poem (two quatrains and two tercets) called?', 'a sonnet', 'a ballade', 'It has other rules. 🎶', 'a rondeau', 'It has a refrain. 🔁', 'a haiku', 'That is a three-line Japanese poem. 🌸', 'The sonnet came from Italy and became very popular in the Renaissance.'),
      Q('Which poet wrote “Demain, dès l’aube…” for his daughter Léopoldine?', 'Victor Hugo', 'Alphonse de Lamartine', 'His is “Le Lac”. 🏞️', 'Alfred de Musset', 'No. 🎭', 'Charles Baudelaire', 'No. 🌺', 'The poem was published in “Les Contemplations” (1856).'),
      Q('Which Shakespeare play tells of the love of two young people from feuding families in Verona?', 'Romeo and Juliet', 'Hamlet', 'He is a prince of Denmark. 💀', 'Macbeth', 'He is an ambitious Scottish king. 👑', 'King Lear', 'He is an old king with his daughters. 👴', 'The Montagues and the Capulets hate each other.'),
      Q('In Corneille’s “Le Cid”, what dilemma tears Rodrigue apart?', 'choosing between his love for Chimène and his family’s honour', 'choosing between two kingdoms', 'No. 🏰', 'choosing between two jobs', 'No. 🛠️', 'choosing between Spain and France', 'No. 🗺️', 'Avenging his father forces Rodrigue to face Chimène’s father.'),
      Q('Which 20th-century poet wrote for Gala and Nusch, and “La courbe de tes yeux”?', 'Paul Éluard', 'Louis Aragon', 'He wrote for Elsa. 💌', 'Jacques Prévert', 'No. 🍂', 'Guillaume Apollinaire', 'His is “Le Pont Mirabeau”. 🌉', 'Éluard is one of the great surrealist love poets.'),
      Q('Which poet wrote “Barbara” (“Rappelle-toi Barbara…”)?', 'Jacques Prévert', 'Georges Brassens', 'A singer and poet, but not him. 🎸', 'Louis Aragon', 'No. 💌', 'Victor Hugo', 'No. 📚', 'The poem was published in “Paroles” (1946).'),
      Q('What was courtly love in the Middle Ages?', 'a love in which the knight serves his lady with respect and devotion', 'a love between two kings', 'No. 👑', 'an arranged marriage', 'No. 💍', 'a drinking song', 'No. 🍷', 'The knight has to earn his lady through his deeds.'),
      Q('What is the voice that expresses feelings in a lyric poem called?', 'the lyric “I”', 'the omniscient narrator', 'That is a narrator in a novel. 📖', 'the reader', 'No. 👀', 'a minor character', 'No. 👥', 'The lyric “I” expresses emotions: love, sadness, joy…'),
      Q('Which mythological couple is separated when Orpheus looks back leaving the Underworld?', 'Orpheus and Eurydice', 'Tristan and Iseult', 'Theirs is the love potion. 🧪', 'Romeo and Juliet', 'Theirs is Verona. 🏰', 'Ulysses and Penelope', 'They are reunited at the end! 🎉', 'Orpheus, a musician, goes down to the Underworld to fetch Eurydice.'),
      Q('Which lexical field often dominates a love poem?', 'feelings (heart, love, tenderness…)', 'cooking', 'No. 🍳', 'sport', 'No. ⚽', 'computing', 'No. 💻', 'A lexical field = a set of words linked to the same theme.'),
      Q('Which Racine tragedy shows a queen consumed by a forbidden passion for Hippolytus?', '“Phèdre”', '“Britannicus”', 'That is the story of Nero. 👑', '“Le Misanthrope”', 'That is a comedy by Molière. 🎭', '“Le Cid”', 'That is Corneille. ⚔️', '“Phèdre” (1677) is one of the most famous French tragedies.')
    ],
    es:[
      Q('¿Qué poeta de la Pléyade escribió «Mignonne, allons voir si la rose…»?', 'Pierre de Ronsard', 'Joachim du Bellay', 'El suyo es «Heureux qui, comme Ulysse…». ⛵', 'Louise Labé', 'Gran poetisa de Lyon, pero no es ella. 💔', 'François Villon', 'Vivió en el siglo XV. 📜', 'Ronsard invita a disfrutar de la juventud: la rosa se marchita pronto.'),
      Q('¿Cómo se llama un poema de 14 versos (dos cuartetos y dos tercetos)?', 'un soneto', 'una balada', 'Tiene otras reglas. 🎶', 'un rondel', 'Tiene un estribillo. 🔁', 'un haiku', 'Es un poema japonés de tres versos. 🌸', 'El soneto viene de Italia y se hace muy popular en el Renacimiento.'),
      Q('¿Qué poeta escribió «Demain, dès l’aube…» para su hija Léopoldine?', 'Victor Hugo', 'Alphonse de Lamartine', 'El suyo es «Le Lac». 🏞️', 'Alfred de Musset', 'No. 🎭', 'Charles Baudelaire', 'No. 🌺', 'El poema se publicó en «Les Contemplations» (1856).'),
      Q('¿Qué obra de Shakespeare cuenta el amor de dos jóvenes de familias enemigas en Verona?', 'Romeo y Julieta', 'Hamlet', 'Es un príncipe de Dinamarca. 💀', 'Macbeth', 'Es un rey escocés ambicioso. 👑', 'El rey Lear', 'Es un viejo rey con sus hijas. 👴', 'Los Montesco y los Capuleto se odian.'),
      Q('En «Le Cid» de Corneille, ¿qué dilema desgarra a Rodrigo?', 'elegir entre su amor por Jimena y el honor de su familia', 'elegir entre dos reinos', 'No. 🏰', 'elegir entre dos oficios', 'No. 🛠️', 'elegir entre España y Francia', 'No. 🗺️', 'Vengar a su padre obliga a Rodrigo a enfrentarse al padre de Jimena.'),
      Q('¿Qué poeta del siglo XX escribió para Gala y Nusch, y «La courbe de tes yeux»?', 'Paul Éluard', 'Louis Aragon', 'Él escribió para Elsa. 💌', 'Jacques Prévert', 'No. 🍂', 'Guillaume Apollinaire', 'El suyo es «Le Pont Mirabeau». 🌉', 'Éluard es uno de los grandes poetas surrealistas del amor.'),
      Q('¿Qué poeta escribió «Barbara» («Rappelle-toi Barbara…»)?', 'Jacques Prévert', 'Georges Brassens', 'Cantante y poeta, pero no es él. 🎸', 'Louis Aragon', 'No. 💌', 'Victor Hugo', 'No. 📚', 'El poema se publicó en «Paroles» (1946).'),
      Q('¿Qué era el amor cortés en la Edad Media?', 'un amor en el que el caballero sirve a su dama con respeto y entrega', 'un amor entre dos reyes', 'No. 👑', 'un matrimonio concertado', 'No. 💍', 'una canción para beber', 'No. 🍷', 'El caballero debe merecer a su dama con sus hazañas.'),
      Q('¿Cómo se llama la voz que expresa sus sentimientos en un poema lírico?', 'el «yo» lírico', 'el narrador omnisciente', 'Es un narrador de novela. 📖', 'el lector', 'No. 👀', 'un personaje secundario', 'No. 👥', 'El «yo» lírico expresa emociones: amor, tristeza, alegría…'),
      Q('¿Qué pareja mitológica se separa cuando Orfeo se da la vuelta al salir del inframundo?', 'Orfeo y Eurídice', 'Tristán e Isolda', 'Lo suyo es el filtro de amor. 🧪', 'Romeo y Julieta', 'Lo suyo es Verona. 🏰', 'Ulises y Penélope', '¡Ellos se reencuentran al final! 🎉', 'Orfeo, músico, baja al inframundo a buscar a Eurídice.'),
      Q('¿Qué campo léxico domina a menudo un poema de amor?', 'el de los sentimientos (corazón, amar, ternura…)', 'el de la cocina', 'No. 🍳', 'el del deporte', 'No. ⚽', 'el de la informática', 'No. 💻', 'Campo léxico = conjunto de palabras relacionadas con un mismo tema.'),
      Q('¿Qué tragedia de Racine muestra a una reina devorada por una pasión prohibida por Hipólito?', '«Phèdre»', '«Britannicus»', 'Es la historia de Nerón. 👑', '«Le Misanthrope»', 'Es una comedia de Molière. 🎭', '«Le Cid»', 'Es de Corneille. ⚔️', '«Phèdre» (1677) es una de las tragedias francesas más célebres.')
    ]
  });

  // ═════════ Auteurs, œuvres, mouvements ═════════
  L('francais', 'litterature', {
    fr:[
      Q('Qui a écrit « Le Rouge et le Noir » (1830) ?', 'Stendhal', 'Honoré de Balzac', 'Lui, c’est « La Comédie humaine ». 📚', 'Gustave Flaubert', 'Lui, c’est « Madame Bovary ». 🌹', 'Émile Zola', 'Lui, c’est « Germinal ». ⛏️', 'Le roman suit l’ascension de Julien Sorel.'),
      Q('« Madame Bovary » (1857) est un roman de :', 'Gustave Flaubert', 'Stendhal', 'Non. 🔴', 'Victor Hugo', 'Non. 📚', 'Guy de Maupassant', 'C’était l’élève de Flaubert ! 🎓', 'Emma Bovary rêve d’une vie romanesque.'),
      Q('Qui est l’auteur de l’ensemble « La Comédie humaine » ?', 'Honoré de Balzac', 'Molière', 'Lui écrit des comédies de théâtre. 🎭', 'Émile Zola', 'Lui, c’est « Les Rougon-Macquart ». ⛏️', 'Alexandre Dumas', 'Lui, c’est « Les Trois Mousquetaires ». ⚔️', 'Près de 90 romans et nouvelles qui peignent la société de son temps.'),
      Q('Quel mouvement du XIXe siècle met en avant les sentiments et la nature (Hugo, Lamartine) ?', 'le romantisme', 'le classicisme', 'C’est le XVIIe siècle, avec des règles strictes. 📐', 'le naturalisme', 'C’est Zola, plus tard. ⛏️', 'le surréalisme', 'C’est le XXe siècle. 🌀', 'Le romantisme exprime le « moi », la passion et la mélancolie.'),
      Q('Qui a écrit « Le Petit Prince » (1943) ?', 'Antoine de Saint-Exupéry', 'Jules Verne', 'Non. 🚀', 'Marcel Pagnol', 'Non. 🌿', 'Albert Camus', 'Non. ☀️', 'L’auteur était aussi aviateur.'),
      Q('Qui a écrit les « Fables » (à partir de 1668) ?', 'Jean de La Fontaine', 'Charles Perrault', 'Lui écrit des contes. 🧚', 'Molière', 'Lui écrit des comédies. 🎭', 'Ésope', 'Il a inspiré La Fontaine, mais vivait dans la Grèce antique. 🏛️', 'Le Corbeau et le Renard, La Cigale et la Fourmi…'),
      Q('« Le Cid » (1637) est une pièce de :', 'Pierre Corneille', 'Jean Racine', 'Lui, c’est « Phèdre ». 💔', 'Molière', 'Lui, c’est « Le Misanthrope ». 🎭', 'Victor Hugo', 'Lui, c’est « Hernani », bien plus tard. 📅', 'Rodrigue y doit choisir entre l’amour et l’honneur.'),
      Q('Quel mouvement du XXe siècle (Breton, Éluard) explore le rêve et l’inconscient ?', 'le surréalisme', 'le romantisme', 'C’est le XIXe siècle. 📅', 'l’humanisme', 'C’est la Renaissance. 📜', 'le réalisme', 'Il décrit le réel, pas le rêve. 🔍', 'André Breton publie le « Manifeste du surréalisme » en 1924.'),
      Q('Qui a écrit « Les Contemplations » (1856) ?', 'Victor Hugo', 'Charles Baudelaire', 'Lui, c’est « Les Fleurs du mal ». 🌺', 'Paul Verlaine', 'Non. 🎻', 'Arthur Rimbaud', 'Non. ⛵', 'Recueil marqué par la mort de sa fille Léopoldine.'),
      Q('Quel philosophe des Lumières a écrit « De l’esprit des lois » (1748) ?', 'Montesquieu', 'Voltaire', 'Lui, c’est « Candide ». 🌍', 'Jean-Jacques Rousseau', 'Lui, c’est « Du contrat social ». 📜', 'Diderot', 'Lui dirige l’Encyclopédie. 📚', 'Montesquieu y défend la séparation des pouvoirs.')
    ],
    en:[
      Q('Who wrote “Le Rouge et le Noir” (1830)?', 'Stendhal', 'Honoré de Balzac', 'His is “La Comédie humaine”. 📚', 'Gustave Flaubert', 'His is “Madame Bovary”. 🌹', 'Émile Zola', 'His is “Germinal”. ⛏️', 'The novel follows Julien Sorel’s rise.'),
      Q('“Madame Bovary” (1857) is a novel by:', 'Gustave Flaubert', 'Stendhal', 'No. 🔴', 'Victor Hugo', 'No. 📚', 'Guy de Maupassant', 'He was Flaubert’s pupil! 🎓', 'Emma Bovary dreams of a romantic life.'),
      Q('Who is the author of the series “La Comédie humaine”?', 'Honoré de Balzac', 'Molière', 'He wrote stage comedies. 🎭', 'Émile Zola', 'His is “Les Rougon-Macquart”. ⛏️', 'Alexandre Dumas', 'His is “Les Trois Mousquetaires”. ⚔️', 'Nearly 90 novels and stories portraying the society of his time.'),
      Q('Which 19th-century movement focuses on feelings and nature (Hugo, Lamartine)?', 'Romanticism', 'Classicism', 'That is the 17th century, with strict rules. 📐', 'Naturalism', 'That is Zola, later. ⛏️', 'Surrealism', 'That is the 20th century. 🌀', 'Romanticism expresses the self, passion and melancholy.'),
      Q('Who wrote “Le Petit Prince” (1943)?', 'Antoine de Saint-Exupéry', 'Jules Verne', 'No. 🚀', 'Marcel Pagnol', 'No. 🌿', 'Albert Camus', 'No. ☀️', 'The author was also a pilot.'),
      Q('Who wrote the “Fables” (from 1668)?', 'Jean de La Fontaine', 'Charles Perrault', 'He wrote fairy tales. 🧚', 'Molière', 'He wrote comedies. 🎭', 'Aesop', 'He inspired La Fontaine, but lived in ancient Greece. 🏛️', '“Le Corbeau et le Renard”, “La Cigale et la Fourmi”…'),
      Q('“Le Cid” (1637) is a play by:', 'Pierre Corneille', 'Jean Racine', 'His is “Phèdre”. 💔', 'Molière', 'His is “Le Misanthrope”. 🎭', 'Victor Hugo', 'His is “Hernani”, much later. 📅', 'Rodrigue must choose between love and honour.'),
      Q('Which 20th-century movement (Breton, Éluard) explores dreams and the unconscious?', 'Surrealism', 'Romanticism', 'That is the 19th century. 📅', 'Humanism', 'That is the Renaissance. 📜', 'Realism', 'It describes reality, not dreams. 🔍', 'André Breton published the Surrealist Manifesto in 1924.'),
      Q('Who wrote “Les Contemplations” (1856)?', 'Victor Hugo', 'Charles Baudelaire', 'His is “Les Fleurs du mal”. 🌺', 'Paul Verlaine', 'No. 🎻', 'Arthur Rimbaud', 'No. ⛵', 'A collection marked by the death of his daughter Léopoldine.'),
      Q('Which Enlightenment philosopher wrote “De l’esprit des lois” (1748)?', 'Montesquieu', 'Voltaire', 'His is “Candide”. 🌍', 'Jean-Jacques Rousseau', 'His is “Du contrat social”. 📜', 'Diderot', 'He led the Encyclopédie. 📚', 'Montesquieu argues for the separation of powers.')
    ],
    es:[
      Q('¿Quién escribió «Le Rouge et le Noir» (1830)?', 'Stendhal', 'Honoré de Balzac', 'Lo suyo es «La Comédie humaine». 📚', 'Gustave Flaubert', 'Lo suyo es «Madame Bovary». 🌹', 'Émile Zola', 'Lo suyo es «Germinal». ⛏️', 'La novela sigue el ascenso de Julien Sorel.'),
      Q('«Madame Bovary» (1857) es una novela de:', 'Gustave Flaubert', 'Stendhal', 'No. 🔴', 'Victor Hugo', 'No. 📚', 'Guy de Maupassant', '¡Era alumno de Flaubert! 🎓', 'Emma Bovary sueña con una vida novelesca.'),
      Q('¿Quién es el autor del conjunto «La Comédie humaine»?', 'Honoré de Balzac', 'Molière', 'Escribía comedias de teatro. 🎭', 'Émile Zola', 'Lo suyo es «Les Rougon-Macquart». ⛏️', 'Alexandre Dumas', 'Lo suyo es «Les Trois Mousquetaires». ⚔️', 'Cerca de 90 novelas y relatos que retratan la sociedad de su época.'),
      Q('¿Qué movimiento del siglo XIX destaca los sentimientos y la naturaleza (Hugo, Lamartine)?', 'el romanticismo', 'el clasicismo', 'Es el siglo XVII, con reglas estrictas. 📐', 'el naturalismo', 'Es Zola, más tarde. ⛏️', 'el surrealismo', 'Es el siglo XX. 🌀', 'El romanticismo expresa el «yo», la pasión y la melancolía.'),
      Q('¿Quién escribió «Le Petit Prince» (1943)?', 'Antoine de Saint-Exupéry', 'Julio Verne', 'No. 🚀', 'Marcel Pagnol', 'No. 🌿', 'Albert Camus', 'No. ☀️', 'El autor también era aviador.'),
      Q('¿Quién escribió las «Fables» (desde 1668)?', 'Jean de La Fontaine', 'Charles Perrault', 'Él escribía cuentos. 🧚', 'Molière', 'Él escribía comedias. 🎭', 'Esopo', 'Inspiró a La Fontaine, pero vivió en la Grecia antigua. 🏛️', '«Le Corbeau et le Renard», «La Cigale et la Fourmi»…'),
      Q('«Le Cid» (1637) es una obra de:', 'Pierre Corneille', 'Jean Racine', 'Lo suyo es «Phèdre». 💔', 'Molière', 'Lo suyo es «Le Misanthrope». 🎭', 'Victor Hugo', 'Lo suyo es «Hernani», mucho después. 📅', 'Rodrigo debe elegir entre el amor y el honor.'),
      Q('¿Qué movimiento del siglo XX (Breton, Éluard) explora el sueño y el inconsciente?', 'el surrealismo', 'el romanticismo', 'Es el siglo XIX. 📅', 'el humanismo', 'Es el Renacimiento. 📜', 'el realismo', 'Describe lo real, no los sueños. 🔍', 'André Breton publica el «Manifiesto del surrealismo» en 1924.'),
      Q('¿Quién escribió «Les Contemplations» (1856)?', 'Victor Hugo', 'Charles Baudelaire', 'Lo suyo es «Les Fleurs du mal». 🌺', 'Paul Verlaine', 'No. 🎻', 'Arthur Rimbaud', 'No. ⛵', 'Libro marcado por la muerte de su hija Léopoldine.'),
      Q('¿Qué filósofo de la Ilustración escribió «De l’esprit des lois» (1748)?', 'Montesquieu', 'Voltaire', 'Lo suyo es «Candide». 🌍', 'Jean-Jacques Rousseau', 'Lo suyo es «Du contrat social». 📜', 'Diderot', 'Él dirigió la Enciclopedia. 📚', 'Montesquieu defiende la separación de poderes.')
    ]
  });

  // ═════════ Cours de 3e ═════════
  L('francais', 'cours-3e', {
    fr:[
      Q('Quelle relation exprime « Comme il pleuvait, nous sommes restés » ?', 'la cause', 'le but', 'Ils ne sont pas restés POUR qu’il pleuve ! 😄', 'la conséquence', 'La conséquence est « nous sommes restés ». 🔄', 'la concession', 'Non. ⚖️', '« comme » en début de phrase exprime souvent la cause.'),
      Q('Qui a raconté son enfance dans « Enfance » (1983) ?', 'Nathalie Sarraute', 'Molière', 'Il a écrit du théâtre au XVIIe siècle. 🎭', 'Victor Hugo', 'Non. 📚', 'Albert Camus', 'Non. ☀️', 'Le livre est un dialogue entre l’autrice et son double.'),
      Q('Qu’est-ce que le pacte autobiographique ?', 'l’engagement de l’auteur à dire la vérité sur sa vie (auteur = narrateur = personnage)', 'un contrat avec un éditeur', 'Non. 📄', 'une promesse d’écrire une fiction', 'C’est l’inverse. 🔄', 'un serment de silence', 'Non. 🤐', 'Notion définie par Philippe Lejeune.'),
      Q('Quel connecteur introduit une conséquence ?', 'donc', 'car', '« car » introduit une cause. 🔙', 'mais', '« mais » introduit une opposition. ⚖️', 'pourtant', '« pourtant » introduit une concession. 🔄', 'donc, c’est pourquoi, si bien que : conséquence.'),
      Q('Qui a écrit « Le Dormeur du val » (1870) ?', 'Arthur Rimbaud', 'Paul Verlaine', 'Non. 🎻', 'Victor Hugo', 'Non. 📚', 'Guillaume Apollinaire', 'Il est né dix ans plus tard. 📅', 'Le sonnet se termine par une chute bouleversante.')
    ],
    en:[
      Q('What relation does “Comme il pleuvait, nous sommes restés” express?', 'cause', 'purpose', 'They did not stay IN ORDER for it to rain! 😄', 'consequence', 'The consequence is “nous sommes restés”. 🔄', 'concession', 'No. ⚖️', '“Comme” at the start of a sentence often expresses cause.'),
      Q('Who told the story of her childhood in “Enfance” (1983)?', 'Nathalie Sarraute', 'Molière', 'He wrote plays in the 17th century. 🎭', 'Victor Hugo', 'No. 📚', 'Albert Camus', 'No. ☀️', 'The book is a dialogue between the author and her other self.'),
      Q('What is the autobiographical pact?', 'the author’s commitment to tell the truth about their life (author = narrator = character)', 'a contract with a publisher', 'No. 📄', 'a promise to write fiction', 'The opposite. 🔄', 'a vow of silence', 'No. 🤐', 'A notion defined by Philippe Lejeune.'),
      Q('Which connective introduces a consequence?', '“donc”', '“car”', '“car” introduces a cause. 🔙', '“mais”', '“mais” introduces a contrast. ⚖️', '“pourtant”', '“pourtant” introduces a concession. 🔄', '“donc”, “c’est pourquoi”, “si bien que”: consequence.'),
      Q('Who wrote “Le Dormeur du val” (1870)?', 'Arthur Rimbaud', 'Paul Verlaine', 'No. 🎻', 'Victor Hugo', 'No. 📚', 'Guillaume Apollinaire', 'He was born ten years later. 📅', 'The sonnet ends with a shattering twist.')
    ],
    es:[
      Q('¿Qué relación expresa «Comme il pleuvait, nous sommes restés»?', 'la causa', 'la finalidad', '¡No se quedaron PARA que lloviera! 😄', 'la consecuencia', 'La consecuencia es «nous sommes restés». 🔄', 'la concesión', 'No. ⚖️', '«Comme» al principio de la frase suele expresar causa.'),
      Q('¿Quién contó su infancia en «Enfance» (1983)?', 'Nathalie Sarraute', 'Molière', 'Escribió teatro en el siglo XVII. 🎭', 'Victor Hugo', 'No. 📚', 'Albert Camus', 'No. ☀️', 'El libro es un diálogo entre la autora y su doble.'),
      Q('¿Qué es el pacto autobiográfico?', 'el compromiso del autor de decir la verdad sobre su vida (autor = narrador = personaje)', 'un contrato con una editorial', 'No. 📄', 'una promesa de escribir ficción', 'Al revés. 🔄', 'un juramento de silencio', 'No. 🤐', 'Noción definida por Philippe Lejeune.'),
      Q('¿Qué conector introduce una consecuencia?', '«donc»', '«car»', '«car» introduce una causa. 🔙', '«mais»', '«mais» introduce una oposición. ⚖️', '«pourtant»', '«pourtant» introduce una concesión. 🔄', '«donc», «c’est pourquoi», «si bien que»: consecuencia.'),
      Q('¿Quién escribió «Le Dormeur du val» (1870)?', 'Arthur Rimbaud', 'Paul Verlaine', 'No. 🎻', 'Victor Hugo', 'No. 📚', 'Guillaume Apollinaire', 'Nació diez años después. 📅', 'El soneto termina con un final estremecedor.')
    ]
  });
})();
