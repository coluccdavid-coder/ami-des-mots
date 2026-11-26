// Ami des mots — v6.57 : ESPAGNOL et ALLEMAND (LV2) du collège — chaque leçon de la 5e à la 3e à 20 questions.
// Espagnol : français + anglais ; allemand : français + anglais + espagnol, dans le même ordre.
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

  // ═════════════════════ ESPAGNOL ═════════════════════
  L('lespagnol', 'es-bases', {
    fr:[
      Q('Article de « mano » (main) :', 'la mano', 'el mano', '« mano » finit en -o mais il est féminin. ✋', 'los mano', 'C’est un article pluriel devant un nom singulier. 🔢', 'una manos', 'Singulier ou pluriel, il faut choisir ! 😄', 'Exception à retenir : la mano (et la radio, la foto).'),
      Q('« Elle est française » :', 'Es francesa.', 'Está francesa.', 'La nationalité est une caractéristique : « ser ». 🇫🇷', 'Es francés.', 'C’est le masculin. 👦', 'Soy francesa.', '« soy », c’est « je suis ». 🙋', 'ser : nationalité, origine, profession ; estar : état passager, lieu.'),
      Q('Comment dit-on « au revoir » ?', 'adiós', 'hola', 'C’est pour dire bonjour en arrivant ! 👋', 'gracias', 'C’est « merci ». 🙏', 'por favor', 'C’est « s’il te plaît ». 🎁', 'hola (salut), adiós (au revoir), hasta luego (à plus tard).'),
      Q('Conjugue « vivir » avec « ellos » :', 'viven', 'vivan', 'C’est le subjonctif. 🔄', 'vivimos', 'C’est « nosotros ». 👥', 'vives', 'C’est « tú ». 🙋', 'vivir : vivo, vives, vive, vivimos, vivís, viven.')
    ],
    en:[
      Q('Article for “mano” (hand):', 'la mano', 'el mano', '“Mano” ends in -o but it is feminine. ✋', 'los mano', 'A plural article before a singular noun. 🔢', 'una manos', 'Singular or plural, pick one! 😄', 'An exception to remember: la mano (and la radio, la foto).'),
      Q('“She is French”:', 'Es francesa.', 'Está francesa.', 'Nationality is a characteristic: “ser”. 🇫🇷', 'Es francés.', 'That is the masculine. 👦', 'Soy francesa.', '“Soy” means “I am”. 🙋', 'ser: nationality, origin, job; estar: temporary state, place.'),
      Q('How do you say “goodbye”?', 'adiós', 'hola', 'That is for saying hello when you arrive! 👋', 'gracias', 'That means “thank you”. 🙏', 'por favor', 'That means “please”. 🎁', 'hola (hi), adiós (goodbye), hasta luego (see you later).'),
      Q('Conjugate “vivir” with “ellos”:', 'viven', 'vivan', 'That is the subjunctive. 🔄', 'vivimos', 'That goes with “nosotros”. 👥', 'vives', 'That goes with “tú”. 🙋', 'vivir: vivo, vives, vive, vivimos, vivís, viven.')
    ]
  });

  L('lespagnol', 'es-present', {
    fr:[
      Q('« Je sors ce soir » :', 'Salgo esta noche.', 'Salo esta noche.', '« salir » prend un g à la 1re personne : salgo. ✏️', 'Sale esta noche.', 'C’est « il sort ». 👤', 'Salgo este noche.', '« noche » est féminin : esta. 🌙', 'Verbes en -go : salgo, tengo, pongo, hago, digo, vengo.'),
      Q('« Nous pouvons jouer » :', 'Podemos jugar.', 'Puedemos jugar.', 'Pas de diphtongue avec « nosotros ». 🧩', 'Pueden jugar.', 'C’est « ils peuvent ». 👥', 'Podemos jugando.', 'Après « poder », on met l’infinitif. 🔄', 'poder : puedo, puedes, puede, podemos, podéis, pueden.'),
      Q('« Je dis la vérité » :', 'Digo la verdad.', 'Dico la verdad.', 'Le c devient g : digo. ✏️', 'Dice la verdad.', 'C’est « il dit ». 👤', 'Digo el verdad.', '« verdad » est féminin. 🧩', 'decir : digo, dices, dice, decimos, decís, dicen.'),
      Q('« Il joue au basket » :', 'Juega al baloncesto.', 'Juga al baloncesto.', '« jugar » fait u → ue : juega. 🏀', 'Jugamos al baloncesto.', 'C’est « nous jouons ». 👥', 'Juega el baloncesto.', 'On dit « jugar a » : al baloncesto. 🧩', 'jugar : juego, juegas, juega, jugamos, jugáis, juegan.')
    ],
    en:[
      Q('“I am going out tonight”:', 'Salgo esta noche.', 'Salo esta noche.', '“Salir” takes a g in the first person: salgo. ✏️', 'Sale esta noche.', 'That means “he goes out”. 👤', 'Salgo este noche.', '“Noche” is feminine: esta. 🌙', 'Verbs in -go: salgo, tengo, pongo, hago, digo, vengo.'),
      Q('“We can play”:', 'Podemos jugar.', 'Puedemos jugar.', 'No stem change with “nosotros”. 🧩', 'Pueden jugar.', 'That means “they can”. 👥', 'Podemos jugando.', 'After “poder”, use the infinitive. 🔄', 'poder: puedo, puedes, puede, podemos, podéis, pueden.'),
      Q('“I am telling the truth”:', 'Digo la verdad.', 'Dico la verdad.', 'The c becomes g: digo. ✏️', 'Dice la verdad.', 'That means “he tells”. 👤', 'Digo el verdad.', '“Verdad” is feminine. 🧩', 'decir: digo, dices, dice, decimos, decís, dicen.'),
      Q('“He plays basketball”:', 'Juega al baloncesto.', 'Juga al baloncesto.', '“Jugar” changes u → ue: juega. 🏀', 'Jugamos al baloncesto.', 'That means “we play”. 👥', 'Juega el baloncesto.', 'It is “jugar a”: al baloncesto. 🧩', 'jugar: juego, juegas, juega, jugamos, jugáis, juegan.')
    ]
  });

  L('lespagnol', 'es-vocab', {
    fr:[
      Q('« Jueves » veut dire :', 'jeudi', 'mercredi', 'Mercredi, c’est « miércoles ». 📅', 'vendredi', 'Vendredi, c’est « viernes ». 📅', 'samedi', 'Samedi, c’est « sábado ». 📅', 'lunes, martes, miércoles, jueves, viernes, sábado, domingo.'),
      Q('« Verde » est quelle couleur ?', 'vert', 'rouge', 'Rouge, c’est « rojo ». 🍅', 'jaune', 'Jaune, c’est « amarillo ». 🍋', 'noir', 'Noir, c’est « negro ». 🎱', 'verde (vert), azul (bleu), blanco (blanc), gris (gris).'),
      Q('« La tía » est :', 'la tante', 'la grand-mère', 'La grand-mère, c’est « la abuela ». 👵', 'la sœur', 'La sœur, c’est « la hermana ». 👧', 'la cousine', 'La cousine, c’est « la prima ». 🧒', 'el tío (l’oncle), la tía (la tante), los primos (les cousins).'),
      Q('« El gato » est :', 'le chat', 'le chien', 'Le chien, c’est « el perro ». 🐶', 'la souris', 'La souris, c’est « el ratón ». 🐭', 'l’oiseau', 'L’oiseau, c’est « el pájaro ». 🐦', 'el gato (le chat), el perro (le chien), el caballo (le cheval).')
    ],
    en:[
      Q('“Jueves” means:', 'Thursday', 'Wednesday', 'Wednesday is “miércoles”. 📅', 'Friday', 'Friday is “viernes”. 📅', 'Saturday', 'Saturday is “sábado”. 📅', 'lunes, martes, miércoles, jueves, viernes, sábado, domingo.'),
      Q('What colour is “verde”?', 'green', 'red', 'Red is “rojo”. 🍅', 'yellow', 'Yellow is “amarillo”. 🍋', 'black', 'Black is “negro”. 🎱', 'verde (green), azul (blue), blanco (white), gris (grey).'),
      Q('“La tía” is:', 'the aunt', 'the grandmother', 'Grandmother is “la abuela”. 👵', 'the sister', 'Sister is “la hermana”. 👧', 'the cousin', 'A female cousin is “la prima”. 🧒', 'el tío (uncle), la tía (aunt), los primos (cousins).'),
      Q('“El gato” is:', 'the cat', 'the dog', 'Dog is “el perro”. 🐶', 'the mouse', 'Mouse is “el ratón”. 🐭', 'the bird', 'Bird is “el pájaro”. 🐦', 'el gato (cat), el perro (dog), el caballo (horse).')
    ]
  });

  L('lespagnol', 'es-cult', {
    fr:[
      Q('Quel romancier colombien a écrit « Cent ans de solitude » ?', 'Gabriel García Márquez', 'Pablo Neruda', 'Lui est un poète chilien. 🇨🇱', 'Miguel de Cervantes', 'Lui, c’est Don Quichotte. 🐴', 'Jorge Luis Borges', 'Lui est argentin et écrit surtout des nouvelles. 📚', 'García Márquez a reçu le prix Nobel de littérature en 1982.'),
      Q('Quelle est la capitale du Pérou ?', 'Lima', 'Quito', 'C’est la capitale de l’Équateur. 🗺️', 'Santiago', 'C’est la capitale du Chili. 🗺️', 'La Paz', 'C’est le siège du gouvernement de la Bolivie. 🗺️', 'Lima a été fondée par les Espagnols en 1535.'),
      Q('Quel grand musée de peinture se trouve à Madrid ?', 'le Prado', 'le Louvre', 'Il est à Paris ! 🇫🇷', 'le Guggenheim', 'Celui d’Espagne est à Bilbao. 🏛️', 'les Offices', 'Ils sont à Florence. 🇮🇹', 'Le Prado expose Velázquez, Goya, le Greco…'),
      Q('Quelle fête de Valence, en mars, brûle de grandes statues de carton ?', 'las Fallas', 'la Tomatina', 'C’est une bataille de tomates à Buñol. 🍅', 'les San Fermín', 'Elles ont lieu à Pampelune, en juillet. 🐂', 'la Feria de Abril', 'Elle a lieu à Séville. 💃', 'Les « ninots » sont brûlés la nuit du 19 mars.')
    ],
    en:[
      Q('Which Colombian novelist wrote “One Hundred Years of Solitude”?', 'Gabriel García Márquez', 'Pablo Neruda', 'He is a Chilean poet. 🇨🇱', 'Miguel de Cervantes', 'His is Don Quixote. 🐴', 'Jorge Luis Borges', 'He is Argentinian and wrote mostly short stories. 📚', 'García Márquez won the Nobel Prize in Literature in 1982.'),
      Q('What is the capital of Peru?', 'Lima', 'Quito', 'That is the capital of Ecuador. 🗺️', 'Santiago', 'That is the capital of Chile. 🗺️', 'La Paz', 'That is the seat of government of Bolivia. 🗺️', 'Lima was founded by the Spanish in 1535.'),
      Q('Which great art museum is in Madrid?', 'the Prado', 'the Louvre', 'That is in Paris! 🇫🇷', 'the Guggenheim', 'The Spanish one is in Bilbao. 🏛️', 'the Uffizi', 'That is in Florence. 🇮🇹', 'The Prado shows Velázquez, Goya, El Greco…'),
      Q('Which festival in Valencia, in March, burns huge cardboard statues?', 'las Fallas', 'la Tomatina', 'That is a tomato fight in Buñol. 🍅', 'San Fermín', 'That takes place in Pamplona, in July. 🐂', 'the Feria de Abril', 'That takes place in Seville. 💃', 'The “ninots” are burnt on the night of 19 March.')
    ]
  });

  L('lespagnol', 'es-gram', {
    fr:[
      Q('« Pedro est moins grand que Juan » :', 'Pedro es menos alto que Juan.', 'Pedro es menos alto de Juan.', 'Le comparatif se construit avec « que ». 🧩', 'Pedro es tan alto como Juan.', 'Ça, c’est l’égalité. ⚖️', 'Pedro está menos alto que Juan.', 'La taille est une caractéristique : « ser ». 📏', 'menos… que (moins que), más… que (plus que).'),
      Q('« Je la vois » (Ana) :', 'La veo.', 'Lo veo.', '« lo » est masculin ; Ana est une fille. 👧', 'Veo la.', 'Le pronom se place devant le verbe conjugué. 🔄', 'Ella veo.', '« ella » est sujet, pas complément. 🧩', 'Pronoms COD : lo, la, los, las, placés devant le verbe conjugué.'),
      Q('Impératif négatif : « Ne mange pas ! » (tú)', '¡No comas!', '¡No come!', 'C’est l’impératif affirmatif. 🔄', '¡No comes!', 'C’est l’indicatif : « tu ne manges pas ». 📰', '¡No comer!', 'C’est l’infinitif. 🔄', 'Défense = no + subjonctif présent : no comas, no hables.'),
      Q('« Il est le plus rapide » :', 'Es el más rápido.', 'Es más rápido.', 'C’est un comparatif : « plus rapide ». 📈', 'Es lo más rápido.', '« lo » est neutre ; ici on parle d’un garçon. 👦', 'Es el mejor rápido.', '« mejor » veut dire « meilleur ». 🏆', 'Superlatif : el/la más + adjectif.')
    ],
    en:[
      Q('“Pedro is shorter than Juan” (less tall):', 'Pedro es menos alto que Juan.', 'Pedro es menos alto de Juan.', 'Comparatives are built with “que”. 🧩', 'Pedro es tan alto como Juan.', 'That expresses equality. ⚖️', 'Pedro está menos alto que Juan.', 'Height is a characteristic: “ser”. 📏', 'menos… que (less than), más… que (more than).'),
      Q('“I see her” (Ana):', 'La veo.', 'Lo veo.', '“Lo” is masculine; Ana is a girl. 👧', 'Veo la.', 'The pronoun goes before the conjugated verb. 🔄', 'Ella veo.', '“Ella” is a subject, not an object. 🧩', 'Object pronouns: lo, la, los, las, placed before the conjugated verb.'),
      Q('Negative imperative: “Don’t eat!” (tú)', '¡No comas!', '¡No come!', 'That is the positive imperative. 🔄', '¡No comes!', 'That is the indicative: “you don’t eat”. 📰', '¡No comer!', 'That is the infinitive. 🔄', 'A negative command = no + present subjunctive: no comas, no hables.'),
      Q('“He is the fastest”:', 'Es el más rápido.', 'Es más rápido.', 'That is a comparative: “faster”. 📈', 'Es lo más rápido.', '“Lo” is neuter; here we mean a boy. 👦', 'Es el mejor rápido.', '“Mejor” means “best”. 🏆', 'Superlative: el/la más + adjective.')
    ]
  });

  L('lespagnol', 'es-passe', {
    fr:[
      Q('Passé simple de « ser » avec « ella » :', 'fue', 'fui', 'C’est « yo ». 🙋', 'era', 'C’est l’imparfait. ⏪', 'sido', 'C’est le participe passé. 🔄', '« ser » et « ir » ont le même passé simple : fui, fuiste, fue…'),
      Q('« Hier, nous sommes allés à la plage » :', 'Ayer fuimos a la playa.', 'Ayer íbamos a la playa.', 'L’imparfait décrit une habitude ; ici, c’est une action unique. ⏪', 'Ayer vamos a la playa.', 'C’est le présent. ⏱️', 'Ayer fueron a la playa.', 'C’est « ils sont allés ». 👥', 'Action terminée à un moment précis (ayer) : passé simple.'),
      Q('Participe passé de « decir » :', 'dicho', 'decido', 'C’est « j’ai décidé » au présent (decidir) ! 🤔', 'dicido', 'Participe irrégulier : dicho. ✏️', 'decto', 'Non. ❌', 'Participes irréguliers : dicho, hecho, escrito, visto, vuelto, puesto.'),
      Q('Imparfait de « tener » avec « yo » :', 'tenía', 'tení', 'Il manque la fin : -ía. ✏️', 'tuve', 'C’est le passé simple. 🔄', 'tenaba', '-aba, c’est pour les verbes en -ar. 🧩', 'Imparfait en -er/-ir : -ía, -ías, -ía, -íamos, -íais, -ían.')
    ],
    en:[
      Q('Preterite of “ser” with “ella”:', 'fue', 'fui', 'That goes with “yo”. 🙋', 'era', 'That is the imperfect. ⏪', 'sido', 'That is the past participle. 🔄', '“Ser” and “ir” share the same preterite: fui, fuiste, fue…'),
      Q('“Yesterday we went to the beach”:', 'Ayer fuimos a la playa.', 'Ayer íbamos a la playa.', 'The imperfect describes a habit; this is a single action. ⏪', 'Ayer vamos a la playa.', 'That is the present. ⏱️', 'Ayer fueron a la playa.', 'That means “they went”. 👥', 'Finished action at a precise time (ayer): preterite.'),
      Q('Past participle of “decir”:', 'dicho', 'decido', 'That means “I decide” (decidir)! 🤔', 'dicido', 'Irregular participle: dicho. ✏️', 'decto', 'No. ❌', 'Irregular participles: dicho, hecho, escrito, visto, vuelto, puesto.'),
      Q('Imperfect of “tener” with “yo”:', 'tenía', 'tení', 'The ending -ía is missing. ✏️', 'tuve', 'That is the preterite. 🔄', 'tenaba', '-aba is for -ar verbs. 🧩', 'Imperfect of -er/-ir verbs: -ía, -ías, -ía, -íamos, -íais, -ían.')
    ]
  });

  L('lespagnol', 'cours-e5', {
    fr:[
      Q('« Comment t’appelles-tu ? » :', '¿Cómo te llamas?', '¿Cómo llamas?', 'Il manque le pronom « te ». 🧩', '¿Qué te llamas?', 'On demande « comment » : cómo. ❓', '¿Cómo se llama?', 'C’est « comment s’appelle-t-il ? » ou le vouvoiement. 🎩', 'Me llamo…, te llamas…, se llama…'),
      Q('« J’ai un chat » :', 'Tengo un gato.', 'Soy un gato.', 'Ça voudrait dire « je suis un chat » ! 🐱', 'Tengo una gato.', '« gato » est masculin. 🧩', 'Hay un gato.', 'C’est « il y a un chat ». 🏠', 'tener = avoir (posséder) : tengo un perro, tengo dos hermanas.'),
      Q('Comment dit-on « le mercredi » ?', 'el miércoles', 'el martes', 'C’est le mardi. 📅', 'el jueves', 'C’est le jeudi. 📅', 'el viernes', 'C’est le vendredi. 📅', 'Les jours de la semaine sont masculins : el lunes, el martes…'),
      Q('Conjugue « tener » avec « yo » :', 'tengo', 'teno', 'Il faut un g : tengo. ✏️', 'tiene', 'C’est « él ». 👤', 'tienes', 'C’est « tú ». 🙋', 'tener : tengo, tienes, tiene, tenemos, tenéis, tienen.'),
      Q('« Ma mère s’appelle Carmen » :', 'Mi madre se llama Carmen.', 'Mi madre me llama Carmen.', 'Ça voudrait dire « ma mère m’appelle Carmen ». 😄', 'Mi madre llama Carmen.', 'Il manque « se ». 🧩', 'Mí madre se llama Carmen.', '« mí » avec accent veut dire « moi ». ✏️', 'mi (mon, ma), tu (ton, ta), su (son, sa).'),
      Q('Comment dit-on « quarante » ?', 'cuarenta', 'catorce', 'C’est 14. 🔢', 'cuatro', 'C’est 4. 🔢', 'cuatrocientos', 'C’est 400. 🔢', 'veinte (20), treinta (30), cuarenta (40), cincuenta (50).'),
      Q('« Je n’aime pas les maths » :', 'No me gustan las matemáticas.', 'No me gusta las matemáticas.', 'Le sujet est pluriel : gustan. 🧩', 'Me no gustan las matemáticas.', '« no » se place devant le pronom. 🔄', 'No gusto las matemáticas.', 'On dit « me gusta(n) ». 🧩', 'Avec gustar, le verbe s’accorde avec la chose aimée.'),
      Q('Quel signe ouvre une exclamation en espagnol ?', '¡', '¿', 'Celui-là ouvre une question. ❓', '!', 'Celui-là ferme l’exclamation. 🔚', '«', 'C’est un guillemet. 💬', '¡Qué bien! — le point d’exclamation est à l’envers au début.')
    ],
    en:[
      Q('“What is your name?”:', '¿Cómo te llamas?', '¿Cómo llamas?', 'The pronoun “te” is missing. 🧩', '¿Qué te llamas?', 'You ask “how”: cómo. ❓', '¿Cómo se llama?', 'That means “what is his name?” or the polite form. 🎩', 'Me llamo…, te llamas…, se llama…'),
      Q('“I have a cat”:', 'Tengo un gato.', 'Soy un gato.', 'That would mean “I am a cat”! 🐱', 'Tengo una gato.', '“Gato” is masculine. 🧩', 'Hay un gato.', 'That means “there is a cat”. 🏠', 'tener = to have (own): tengo un perro, tengo dos hermanas.'),
      Q('How do you say “on Wednesday”?', 'el miércoles', 'el martes', 'That is Tuesday. 📅', 'el jueves', 'That is Thursday. 📅', 'el viernes', 'That is Friday. 📅', 'Days of the week are masculine: el lunes, el martes…'),
      Q('Conjugate “tener” with “yo”:', 'tengo', 'teno', 'It needs a g: tengo. ✏️', 'tiene', 'That goes with “él”. 👤', 'tienes', 'That goes with “tú”. 🙋', 'tener: tengo, tienes, tiene, tenemos, tenéis, tienen.'),
      Q('“My mother is called Carmen”:', 'Mi madre se llama Carmen.', 'Mi madre me llama Carmen.', 'That would mean “my mother calls me Carmen”. 😄', 'Mi madre llama Carmen.', '“Se” is missing. 🧩', 'Mí madre se llama Carmen.', '“Mí” with an accent means “me”. ✏️', 'mi (my), su (his, her, your polite).'),
      Q('How do you say “forty”?', 'cuarenta', 'catorce', 'That is 14. 🔢', 'cuatro', 'That is 4. 🔢', 'cuatrocientos', 'That is 400. 🔢', 'veinte (20), treinta (30), cuarenta (40), cincuenta (50).'),
      Q('“I don’t like maths”:', 'No me gustan las matemáticas.', 'No me gusta las matemáticas.', 'The subject is plural: gustan. 🧩', 'Me no gustan las matemáticas.', '“No” goes before the pronoun. 🔄', 'No gusto las matemáticas.', 'You say “me gusta(n)”. 🧩', 'With gustar, the verb agrees with the thing you like.'),
      Q('Which sign opens an exclamation in Spanish?', '¡', '¿', 'That one opens a question. ❓', '!', 'That one closes the exclamation. 🔚', '«', 'That is a quotation mark. 💬', '¡Qué bien! — the exclamation mark is upside down at the start.')
    ]
  });

  L('lespagnol', 'cours-e4', {
    fr:[
      Q('« Je me couche à dix heures » :', 'Me acuesto a las diez.', 'Me acosto a las diez.', '« acostarse » fait o → ue : acuesto. 🛏️', 'Me acuesto a los diez.', '« las » car on sous-entend « horas ». ⏰', 'Se acuesta a las diez.', 'C’est « il se couche ». 👤', 'acostarse : me acuesto, te acuestas, se acuesta, nos acostamos…'),
      Q('Conjugue « dormir » avec « yo » :', 'duermo', 'dormo', '« dormir » fait o → ue : duermo. 😴', 'duerme', 'C’est « él ». 👤', 'dormimos', 'C’est « nosotros ». 👥', 'dormir : duermo, duermes, duerme, dormimos, dormís, duermen.'),
      Q('« Il est trois heures et demie » :', 'Son las tres y media.', 'Es las tres y media.', 'À partir de deux heures, on dit « son las ». ⏰', 'Son las tres y medio.', '« media » s’accorde avec « hora ». 🧩', 'Están las tres y media.', 'Pour l’heure, on utilise « ser ». 🔄', 'Es la una ; son las dos, son las tres…'),
      Q('Où achète-t-on des médicaments ?', 'en la farmacia', 'en la panadería', 'Là, c’est le pain. 🥖', 'en la carnicería', 'Là, c’est la viande. 🥩', 'en la librería', 'Là, ce sont les livres. 📚', 'Magasins en -ería : panadería, frutería, pescadería, zapatería.'),
      Q('« J’ai visité le musée » (passé composé) :', 'He visitado el museo.', 'Ha visitado el museo.', 'C’est « il a visité ». 👤', 'Hey visitado el museo.', 'Non : « he ». ✏️', 'He visitar el museo.', 'Il faut le participe : visitado. 🔄', 'haber au présent (he, has, ha…) + participe (-ado, -ido).'),
      Q('Comment dit-on « tout droit » ?', 'todo recto', 'a la izquierda', 'C’est « à gauche ». ⬅️', 'a la derecha', 'C’est « à droite ». ➡️', 'detrás', 'C’est « derrière ». 🔙', 'Sigue todo recto y gira a la derecha.'),
      Q('« Il fait froid » :', 'Hace frío.', 'Es frío.', 'Pour la météo, on utilise « hacer ». 🌡️', 'Hace fría.', '« frío » est un nom ici : il ne change pas. 🧩', 'Tengo frío.', 'C’est « j’ai froid ». 🥶', 'Hace calor, hace frío, hace sol, hace viento.'),
      Q('Participe passé irrégulier de « volver » :', 'vuelto', 'volvido', 'Il est irrégulier : vuelto. ✏️', 'vuelvido', 'Non. ❌', 'volto', 'C’est presque de l’italien ! 🇮🇹', 'He vuelto a casa : je suis rentré à la maison.')
    ],
    en:[
      Q('“I go to bed at ten”:', 'Me acuesto a las diez.', 'Me acosto a las diez.', '“Acostarse” changes o → ue: acuesto. 🛏️', 'Me acuesto a los diez.', '“Las”, because “horas” is understood. ⏰', 'Se acuesta a las diez.', 'That means “he goes to bed”. 👤', 'acostarse: me acuesto, te acuestas, se acuesta, nos acostamos…'),
      Q('Conjugate “dormir” with “yo”:', 'duermo', 'dormo', '“Dormir” changes o → ue: duermo. 😴', 'duerme', 'That goes with “él”. 👤', 'dormimos', 'That goes with “nosotros”. 👥', 'dormir: duermo, duermes, duerme, dormimos, dormís, duermen.'),
      Q('“It is half past three”:', 'Son las tres y media.', 'Es las tres y media.', 'From two o’clock on, you say “son las”. ⏰', 'Son las tres y medio.', '“Media” agrees with “hora”. 🧩', 'Están las tres y media.', 'For the time, use “ser”. 🔄', 'Es la una; son las dos, son las tres…'),
      Q('Where do you buy medicine?', 'en la farmacia', 'en la panadería', 'That is for bread. 🥖', 'en la carnicería', 'That is for meat. 🥩', 'en la librería', 'That is for books. 📚', 'Shops in -ería: panadería, frutería, pescadería, zapatería.'),
      Q('“I have visited the museum” (present perfect):', 'He visitado el museo.', 'Ha visitado el museo.', 'That means “he has visited”. 👤', 'Hey visitado el museo.', 'No: “he”. ✏️', 'He visitar el museo.', 'It needs the participle: visitado. 🔄', 'haber in the present (he, has, ha…) + participle (-ado, -ido).'),
      Q('How do you say “straight on”?', 'todo recto', 'a la izquierda', 'That means “on the left”. ⬅️', 'a la derecha', 'That means “on the right”. ➡️', 'detrás', 'That means “behind”. 🔙', 'Sigue todo recto y gira a la derecha.'),
      Q('“It is cold” (weather):', 'Hace frío.', 'Es frío.', 'For the weather, use “hacer”. 🌡️', 'Hace fría.', '“Frío” is a noun here: it does not change. 🧩', 'Tengo frío.', 'That means “I am cold”. 🥶', 'Hace calor, hace frío, hace sol, hace viento.'),
      Q('Irregular past participle of “volver”:', 'vuelto', 'volvido', 'It is irregular: vuelto. ✏️', 'vuelvido', 'No. ❌', 'volto', 'That is almost Italian! 🇮🇹', 'He vuelto a casa: I have come back home.')
    ]
  });

  L('lespagnol', 'cours-e3', {
    fr:[
      Q('Futur de « tener » avec « yo » :', 'tendré', 'teneré', 'Radical irrégulier : tendr-. ✏️', 'tenré', 'Il manque le d. ✏️', 'tendría', 'C’est le conditionnel. 🔄', 'Futurs irréguliers : tendré, saldré, pondré, vendré, haré, diré.'),
      Q('« Hier, il a écrit une lettre » :', 'Ayer escribió una carta.', 'Ayer escribía una carta.', 'L’imparfait décrit ; ici l’action est terminée. ⏪', 'Ayer escribí una carta.', 'C’est « j’ai écrit ». 🙋', 'Ayer escribe una carta.', 'C’est le présent. ⏱️', 'Passé simple en -er/-ir : -í, -iste, -ió, -imos, -isteis, -ieron.'),
      Q('Que signifie « Todavía no he comido » ?', 'Je n’ai pas encore mangé.', 'Je mange toujours.', 'Non. 🍽️', 'J’ai déjà mangé.', 'Ça, c’est « Ya he comido ». ✅', 'Je ne mangerai jamais.', 'Non. 🚫', 'todavía no = pas encore ; ya = déjà.'),
      Q('Quel est le plus haut sommet d’Amérique du Sud ?', 'l’Aconcagua', 'l’Everest', 'Il est en Asie. 🏔️', 'le mont Blanc', 'Il est en Europe. 🇫🇷', 'le Kilimandjaro', 'Il est en Afrique. 🌍', 'L’Aconcagua (6 961 m) se trouve en Argentine, dans les Andes.'),
      Q('« Si j’ai le temps, je viendrai » :', 'Si tengo tiempo, vendré.', 'Si tendré tiempo, vendré.', 'Pas de futur après « si » : présent. 🧩', 'Si tengo tiempo, vendo.', '« vendo » veut dire « je vends » ! 💰', 'Si tengo tiempo, venderé.', 'C’est le futur de « vender » (vendre). 💰', 'Si + présent, futur dans la principale.'),
      Q('Impératif de « hablar » (tú) : « Parle ! »', '¡Habla!', '¡Hablas!', 'C’est l’indicatif : « tu parles ». 📰', '¡Hable!', 'C’est le vouvoiement (usted). 🎩', '¡No hables!', 'C’est « ne parle pas ». 🚫', 'Impératif tú = 3e personne du présent : habla, come, vive.'),
      Q('Quel poète chilien a reçu le prix Nobel de littérature en 1971 ?', 'Pablo Neruda', 'Gabriel García Márquez', 'Il est colombien et l’a reçu en 1982. 🇨🇴', 'Federico García Lorca', 'Il est espagnol. 🇪🇸', 'Jorge Luis Borges', 'Il ne l’a jamais reçu. 📚', 'Neruda a écrit « Vingt poèmes d’amour et une chanson désespérée ».'),
      Q('« Personne ne parle » :', 'Nadie habla.', 'Nadie no habla.', 'Quand « nadie » est devant le verbe, pas de « no ». 🧩', 'Nada habla.', '« nada » veut dire « rien ». 🫙', 'Nadie hablan.', '« nadie » est singulier. 1️⃣', 'Nadie habla = No habla nadie.')
    ],
    en:[
      Q('Future of “tener” with “yo”:', 'tendré', 'teneré', 'Irregular stem: tendr-. ✏️', 'tenré', 'The d is missing. ✏️', 'tendría', 'That is the conditional. 🔄', 'Irregular futures: tendré, saldré, pondré, vendré, haré, diré.'),
      Q('“Yesterday he wrote a letter”:', 'Ayer escribió una carta.', 'Ayer escribía una carta.', 'The imperfect describes; here the action is finished. ⏪', 'Ayer escribí una carta.', 'That means “I wrote”. 🙋', 'Ayer escribe una carta.', 'That is the present. ⏱️', 'Preterite of -er/-ir verbs: -í, -iste, -ió, -imos, -isteis, -ieron.'),
      Q('What does “Todavía no he comido” mean?', 'I haven’t eaten yet.', 'I am still eating.', 'No. 🍽️', 'I have already eaten.', 'That is “Ya he comido”. ✅', 'I will never eat.', 'No. 🚫', 'todavía no = not yet; ya = already.'),
      Q('What is the highest mountain in South America?', 'Aconcagua', 'Everest', 'That is in Asia. 🏔️', 'Mont Blanc', 'That is in Europe. 🇫🇷', 'Kilimanjaro', 'That is in Africa. 🌍', 'Aconcagua (6,961 m) is in Argentina, in the Andes.'),
      Q('“If I have time, I will come”:', 'Si tengo tiempo, vendré.', 'Si tendré tiempo, vendré.', 'No future after “si”: present. 🧩', 'Si tengo tiempo, vendo.', '“Vendo” means “I sell”! 💰', 'Si tengo tiempo, venderé.', 'That is the future of “vender” (to sell). 💰', 'Si + present, future in the main clause.'),
      Q('Imperative of “hablar” (tú): “Speak!”', '¡Habla!', '¡Hablas!', 'That is the indicative: “you speak”. 📰', '¡Hable!', 'That is the polite form (usted). 🎩', '¡No hables!', 'That means “don’t speak”. 🚫', 'Tú imperative = 3rd person present: habla, come, vive.'),
      Q('Which Chilean poet won the Nobel Prize in Literature in 1971?', 'Pablo Neruda', 'Gabriel García Márquez', 'He is Colombian and won it in 1982. 🇨🇴', 'Federico García Lorca', 'He is Spanish. 🇪🇸', 'Jorge Luis Borges', 'He never won it. 📚', 'Neruda wrote “Twenty Love Poems and a Song of Despair”.'),
      Q('“Nobody is speaking”:', 'Nadie habla.', 'Nadie no habla.', 'When “nadie” comes before the verb, no “no”. 🧩', 'Nada habla.', '“Nada” means “nothing”. 🫙', 'Nadie hablan.', '“Nadie” is singular. 1️⃣', 'Nadie habla = No habla nadie.')
    ]
  });

  // ═════════════════════ ALLEMAND ═════════════════════
  L('lallemand', 'de-bases', {
    fr:[
      Q('Article de « Auto » (voiture) :', 'das Auto', 'der Auto', '« Auto » est neutre. 🚗', 'den Auto', 'C’est un accusatif masculin. ✏️', 'dem Auto', 'C’est un datif. 🔄', 'Les mots en -o venus d’ailleurs sont souvent neutres : das Auto, das Kino.'),
      Q('« Il ne vient pas » :', 'Er kommt nicht.', 'Er nicht kommt.', 'Le verbe conjugué est en 2e position. 🔢', 'Er kommt kein.', '« kein » nie un nom, pas un verbe. 🧩', 'Er kommen nicht.', '« kommen » est l’infinitif. 🔄', 'nicht nie un verbe ; kein nie un nom (kein Hund).'),
      Q('Conjugue « sein » avec « du » :', 'du bist', 'du ist', 'C’est « er ist ». 👤', 'du sind', 'C’est « wir sind ». 👥', 'du seid', 'C’est « ihr seid ». 👥', 'sein : ich bin, du bist, er ist, wir sind, ihr seid, sie sind.'),
      Q('Comment dit-on « trente-cinq » ?', 'fünfunddreißig', 'dreißigfünf', 'En allemand, l’unité vient avant la dizaine. 🔄', 'dreiundfünfzig', 'C’est 53. 🔢', 'fünfzehn', 'C’est 15. 🔢', 'einundzwanzig (21), fünfunddreißig (35) : unité + und + dizaine.')
    ],
    en:[
      Q('Article for “Auto” (car):', 'das Auto', 'der Auto', '“Auto” is neuter. 🚗', 'den Auto', 'That is a masculine accusative. ✏️', 'dem Auto', 'That is a dative. 🔄', 'Borrowed words in -o are often neuter: das Auto, das Kino.'),
      Q('“He is not coming”:', 'Er kommt nicht.', 'Er nicht kommt.', 'The conjugated verb comes second. 🔢', 'Er kommt kein.', '“Kein” negates a noun, not a verb. 🧩', 'Er kommen nicht.', '“Kommen” is the infinitive. 🔄', 'nicht negates a verb; kein negates a noun (kein Hund).'),
      Q('Conjugate “sein” with “du”:', 'du bist', 'du ist', 'That is “er ist”. 👤', 'du sind', 'That is “wir sind”. 👥', 'du seid', 'That is “ihr seid”. 👥', 'sein: ich bin, du bist, er ist, wir sind, ihr seid, sie sind.'),
      Q('How do you say “thirty-five”?', 'fünfunddreißig', 'dreißigfünf', 'In German, the unit comes before the ten. 🔄', 'dreiundfünfzig', 'That is 53. 🔢', 'fünfzehn', 'That is 15. 🔢', 'einundzwanzig (21), fünfunddreißig (35): unit + und + ten.')
    ],
    es:[
      Q('Artículo de «Auto» (coche):', 'das Auto', 'der Auto', '«Auto» es neutro. 🚗', 'den Auto', 'Es un acusativo masculino. ✏️', 'dem Auto', 'Es un dativo. 🔄', 'Las palabras extranjeras en -o suelen ser neutras: das Auto, das Kino.'),
      Q('«Él no viene»:', 'Er kommt nicht.', 'Er nicht kommt.', 'El verbo conjugado va en segunda posición. 🔢', 'Er kommt kein.', '«Kein» niega un sustantivo, no un verbo. 🧩', 'Er kommen nicht.', '«Kommen» es el infinitivo. 🔄', 'nicht niega un verbo; kein niega un sustantivo (kein Hund).'),
      Q('Conjuga «sein» con «du»:', 'du bist', 'du ist', 'Es «er ist». 👤', 'du sind', 'Es «wir sind». 👥', 'du seid', 'Es «ihr seid». 👥', 'sein: ich bin, du bist, er ist, wir sind, ihr seid, sie sind.'),
      Q('¿Cómo se dice «treinta y cinco»?', 'fünfunddreißig', 'dreißigfünf', 'En alemán, la unidad va antes de la decena. 🔄', 'dreiundfünfzig', 'Es 53. 🔢', 'fünfzehn', 'Es 15. 🔢', 'einundzwanzig (21), fünfunddreißig (35): unidad + und + decena.')
    ]
  });

  L('lallemand', 'de-vocab', {
    fr:[
      Q('« Donnerstag » veut dire :', 'jeudi', 'mercredi', 'Mercredi, c’est « Mittwoch ». 📅', 'vendredi', 'Vendredi, c’est « Freitag ». 📅', 'dimanche', 'Dimanche, c’est « Sonntag ». 📅', 'Montag, Dienstag, Mittwoch, Donnerstag, Freitag, Samstag, Sonntag.'),
      Q('« Blau » est quelle couleur ?', 'bleu', 'vert', 'Vert, c’est « grün ». 🌿', 'rouge', 'Rouge, c’est « rot ». 🍅', 'gris', 'Gris, c’est « grau ». 🐘', 'blau (bleu), rot (rouge), gelb (jaune), schwarz (noir), weiß (blanc).'),
      Q('« Die Großmutter » est :', 'la grand-mère', 'le grand-père', 'Le grand-père, c’est « der Großvater ». 👴', 'la tante', 'La tante, c’est « Tante ». 👩', 'la sœur', 'La sœur, c’est « Schwester ». 👧', 'Oma et Opa sont les mots affectueux pour grand-mère et grand-père.'),
      Q('« Der Stuhl » est :', 'la chaise', 'la table', 'La table, c’est « der Tisch ». 🪑', 'la porte', 'La porte, c’est « Tür ». 🚪', 'le lit', 'Le lit, c’est « das Bett ». 🛏️', 'Le genre change d’une langue à l’autre : der Stuhl est masculin.')
    ],
    en:[
      Q('“Donnerstag” means:', 'Thursday', 'Wednesday', 'Wednesday is “Mittwoch”. 📅', 'Friday', 'Friday is “Freitag”. 📅', 'Sunday', 'Sunday is “Sonntag”. 📅', 'Montag, Dienstag, Mittwoch, Donnerstag, Freitag, Samstag, Sonntag.'),
      Q('What colour is “blau”?', 'blue', 'green', 'Green is “grün”. 🌿', 'red', 'Red is “rot”. 🍅', 'grey', 'Grey is “grau”. 🐘', 'blau (blue), rot (red), gelb (yellow), schwarz (black), weiß (white).'),
      Q('“Die Großmutter” is:', 'the grandmother', 'the grandfather', 'Grandfather is “der Großvater”. 👴', 'the aunt', 'Aunt is “Tante”. 👩', 'the sister', 'Sister is “Schwester”. 👧', 'Oma and Opa are the affectionate words for grandma and grandpa.'),
      Q('“Der Stuhl” is:', 'the chair', 'the table', 'Table is “der Tisch”. 🪑', 'the door', 'Door is “Tür”. 🚪', 'the bed', 'Bed is “das Bett”. 🛏️', 'Gender changes from one language to another: der Stuhl is masculine.')
    ],
    es:[
      Q('«Donnerstag» significa:', 'jueves', 'miércoles', 'Miércoles es «Mittwoch». 📅', 'viernes', 'Viernes es «Freitag». 📅', 'domingo', 'Domingo es «Sonntag». 📅', 'Montag, Dienstag, Mittwoch, Donnerstag, Freitag, Samstag, Sonntag.'),
      Q('¿De qué color es «blau»?', 'azul', 'verde', 'Verde es «grün». 🌿', 'rojo', 'Rojo es «rot». 🍅', 'gris', 'Gris es «grau». 🐘', 'blau (azul), rot (rojo), gelb (amarillo), schwarz (negro), weiß (blanco).'),
      Q('«Die Großmutter» es:', 'la abuela', 'el abuelo', 'El abuelo es «der Großvater». 👴', 'la tía', 'La tía es «Tante». 👩', 'la hermana', 'La hermana es «Schwester». 👧', 'Oma y Opa son las palabras cariñosas para abuela y abuelo.'),
      Q('«Der Stuhl» es:', 'la silla', 'la mesa', 'La mesa es «der Tisch». 🪑', 'la puerta', 'La puerta es «Tür». 🚪', 'la cama', 'La cama es «das Bett». 🛏️', 'El género cambia de un idioma a otro: der Stuhl es masculino.')
    ]
  });

  L('lallemand', 'de-cult', {
    fr:[
      Q('Comment s’appelle l’autoroute allemande, parfois sans limitation de vitesse ?', 'die Autobahn', 'das Fahrrad', 'C’est le vélo ! 🚲', 'der Bahnhof', 'C’est la gare. 🚉', 'das Rathaus', 'C’est la mairie. 🏛️', 'Sur une partie des Autobahnen, la vitesse est seulement « conseillée » à 130 km/h.'),
      Q('Quel compositeur allemand a écrit les « Concertos brandebourgeois » ?', 'Jean-Sébastien Bach', 'Wolfgang Amadeus Mozart', 'Il est autrichien. 🎹', 'Ludwig van Beethoven', 'Lui, c’est la 9e symphonie. 🎼', 'Richard Wagner', 'Lui, c’est l’opéra, un siècle plus tard. 🎭', 'Bach a vécu à Leipzig de 1723 à 1750.'),
      Q('Quelle est la capitale de la Suisse ?', 'Berne', 'Zurich', 'C’est la plus grande ville, pas la capitale. 🏙️', 'Genève', 'On y parle français. 🇫🇷', 'Bâle', 'Non. 🗺️', 'La Suisse a quatre langues nationales : allemand, français, italien, romanche.'),
      Q('Quel scientifique né à Ulm a formulé la théorie de la relativité ?', 'Albert Einstein', 'Isaac Newton', 'Il est anglais, et plus ancien. 🍎', 'Marie Curie', 'Elle est polonaise et française. ⚗️', 'Max Planck', 'Lui est le père des quanta. 💡', 'E = mc² : la célèbre formule d’Einstein (1905).')
    ],
    en:[
      Q('What is the German motorway called, sometimes with no speed limit?', 'die Autobahn', 'das Fahrrad', 'That is the bike! 🚲', 'der Bahnhof', 'That is the station. 🚉', 'das Rathaus', 'That is the town hall. 🏛️', 'On parts of the Autobahn, 130 km/h is only “recommended”.'),
      Q('Which German composer wrote the Brandenburg Concertos?', 'Johann Sebastian Bach', 'Wolfgang Amadeus Mozart', 'He is Austrian. 🎹', 'Ludwig van Beethoven', 'His is the 9th symphony. 🎼', 'Richard Wagner', 'His is opera, a century later. 🎭', 'Bach lived in Leipzig from 1723 to 1750.'),
      Q('What is the capital of Switzerland?', 'Bern', 'Zurich', 'That is the biggest city, not the capital. 🏙️', 'Geneva', 'French is spoken there. 🇫🇷', 'Basel', 'No. 🗺️', 'Switzerland has four national languages: German, French, Italian, Romansh.'),
      Q('Which scientist born in Ulm came up with the theory of relativity?', 'Albert Einstein', 'Isaac Newton', 'He is English, and earlier. 🍎', 'Marie Curie', 'She is Polish and French. ⚗️', 'Max Planck', 'He is the father of quanta. 💡', 'E = mc²: Einstein’s famous formula (1905).')
    ],
    es:[
      Q('¿Cómo se llama la autopista alemana, a veces sin límite de velocidad?', 'die Autobahn', 'das Fahrrad', '¡Es la bicicleta! 🚲', 'der Bahnhof', 'Es la estación. 🚉', 'das Rathaus', 'Es el ayuntamiento. 🏛️', 'En parte de la Autobahn, 130 km/h es solo una velocidad «recomendada».'),
      Q('¿Qué compositor alemán escribió los Conciertos de Brandeburgo?', 'Johann Sebastian Bach', 'Wolfgang Amadeus Mozart', 'Es austriaco. 🎹', 'Ludwig van Beethoven', 'Lo suyo es la 9.ª sinfonía. 🎼', 'Richard Wagner', 'Lo suyo es la ópera, un siglo después. 🎭', 'Bach vivió en Leipzig de 1723 a 1750.'),
      Q('¿Cuál es la capital de Suiza?', 'Berna', 'Zúrich', 'Es la ciudad más grande, no la capital. 🏙️', 'Ginebra', 'Allí se habla francés. 🇫🇷', 'Basilea', 'No. 🗺️', 'Suiza tiene cuatro lenguas nacionales: alemán, francés, italiano, romanche.'),
      Q('¿Qué científico nacido en Ulm formuló la teoría de la relatividad?', 'Albert Einstein', 'Isaac Newton', 'Es inglés, y anterior. 🍎', 'Marie Curie', 'Es polaca y francesa. ⚗️', 'Max Planck', 'Él es el padre de los cuantos. 💡', 'E = mc²: la famosa fórmula de Einstein (1905).')
    ]
  });

  L('lallemand', 'de-gram', {
    fr:[
      Q('Pluriel de « das Haus » :', 'die Häuser', 'die Hause', 'Il faut l’inflexion et -er : Häuser. 🏠', 'die Haus', 'Le nom change au pluriel. 🔄', 'die Häusen', 'La fin est -er. ✏️', 'Haus → Häuser, Buch → Bücher, Mann → Männer.'),
      Q('« Je m’assieds sur la chaise » (mouvement) :', 'Ich setze mich auf den Stuhl.', 'Ich setze mich auf dem Stuhl.', 'Il y a un mouvement : accusatif (den). 🧭', 'Ich sitze mich auf den Stuhl.', '« sitzen » veut dire « être assis ». 🪑', 'Ich setze mich auf der Stuhl.', '« Stuhl » est masculin : den. ✏️', 'Prépositions mixtes : Wohin ? → accusatif ; Wo ? → datif.'),
      Q('Prétérit de « haben » avec « ich » :', 'ich hatte', 'ich habte', 'Forme irrégulière : hatte. ✏️', 'ich hat', 'Ça ressemble à « er hat », au présent. 🔄', 'ich hätte', 'C’est le subjonctif II (j’aurais). 🤔', 'haben : ich hatte, du hattest, er hatte, wir hatten.'),
      Q('Superlatif de « gut » :', 'am besten', 'am gutesten', '« gut » est irrégulier. ✏️', 'am besser', '« besser » est le comparatif. 📈', 'am meisten', 'C’est le superlatif de « viel ». 🔢', 'gut – besser – am besten ; viel – mehr – am meisten.')
    ],
    en:[
      Q('Plural of “das Haus”:', 'die Häuser', 'die Hause', 'It needs the umlaut and -er: Häuser. 🏠', 'die Haus', 'The noun changes in the plural. 🔄', 'die Häusen', 'The ending is -er. ✏️', 'Haus → Häuser, Buch → Bücher, Mann → Männer.'),
      Q('“I sit down on the chair” (movement):', 'Ich setze mich auf den Stuhl.', 'Ich setze mich auf dem Stuhl.', 'There is movement: accusative (den). 🧭', 'Ich sitze mich auf den Stuhl.', '“Sitzen” means “to be sitting”. 🪑', 'Ich setze mich auf der Stuhl.', '“Stuhl” is masculine: den. ✏️', 'Two-way prepositions: Wohin? → accusative; Wo? → dative.'),
      Q('Preterite of “haben” with “ich”:', 'ich hatte', 'ich habte', 'Irregular form: hatte. ✏️', 'ich hat', 'That looks like “er hat”, in the present. 🔄', 'ich hätte', 'That is the subjunctive II (I would have). 🤔', 'haben: ich hatte, du hattest, er hatte, wir hatten.'),
      Q('Superlative of “gut”:', 'am besten', 'am gutesten', '“Gut” is irregular. ✏️', 'am besser', '“Besser” is the comparative. 📈', 'am meisten', 'That is the superlative of “viel”. 🔢', 'gut – besser – am besten; viel – mehr – am meisten.')
    ],
    es:[
      Q('Plural de «das Haus»:', 'die Häuser', 'die Hause', 'Hace falta la diéresis y -er: Häuser. 🏠', 'die Haus', 'El sustantivo cambia en plural. 🔄', 'die Häusen', 'La terminación es -er. ✏️', 'Haus → Häuser, Buch → Bücher, Mann → Männer.'),
      Q('«Me siento en la silla» (movimiento):', 'Ich setze mich auf den Stuhl.', 'Ich setze mich auf dem Stuhl.', 'Hay movimiento: acusativo (den). 🧭', 'Ich sitze mich auf den Stuhl.', '«Sitzen» significa «estar sentado». 🪑', 'Ich setze mich auf der Stuhl.', '«Stuhl» es masculino: den. ✏️', 'Preposiciones mixtas: Wohin? → acusativo; Wo? → dativo.'),
      Q('Pretérito de «haben» con «ich»:', 'ich hatte', 'ich habte', 'Forma irregular: hatte. ✏️', 'ich hat', 'Se parece a «er hat», en presente. 🔄', 'ich hätte', 'Es el subjuntivo II (yo tendría). 🤔', 'haben: ich hatte, du hattest, er hatte, wir hatten.'),
      Q('Superlativo de «gut»:', 'am besten', 'am gutesten', '«Gut» es irregular. ✏️', 'am besser', '«Besser» es el comparativo. 📈', 'am meisten', 'Es el superlativo de «viel». 🔢', 'gut – besser – am besten; viel – mehr – am meisten.')
    ]
  });

  L('lallemand', 'de-college', {
    fr:[
      Q('« Je sais nager » (können) :', 'Ich kann schwimmen.', 'Ich kann zu schwimmen.', 'Pas de « zu » après un verbe de modalité. 🧩', 'Ich könne schwimmen.', 'Ce n’est pas le présent. 🔄', 'Ich kann schwimme.', 'L’infinitif se met à la fin : schwimmen. 🔚', 'Modal conjugué en 2e position + infinitif à la fin.'),
      Q('« J’ai mangé » (essen) :', 'Ich habe gegessen.', 'Ich habe geesst.', 'Participe fort : gegessen. ✏️', 'Ich habe gegesst.', 'Non : gegessen. ✏️', 'Ich bin gegessen.', '« essen » se conjugue avec « haben ». 🔄', 'Verbes forts : gegessen, getrunken, gesehen, geschrieben.'),
      Q('« … quand il pleut » (à chaque fois) :', '… wenn es regnet.', '… wenn regnet es.', 'Dans une subordonnée, le verbe va à la fin. 🔚', '… als es regnet.', '« als » s’emploie pour un fait unique du passé. ⏪', '… wann es regnet.', '« wann » sert à poser une question. ❓', 'wenn (quand, si, à chaque fois), als (quand, une fois, au passé), wann (quand ? question).'),
      Q('« J’aide ma sœur » :', 'Ich helfe meiner Schwester.', 'Ich helfe meine Schwester.', '« helfen » est suivi du datif. 🧩', 'Ich helfe meinem Schwester.', '« Schwester » est féminin : meiner. ✏️', 'Ich helfe meinen Schwester.', 'Ce n’est pas la bonne terminaison. ✏️', 'Verbes + datif : helfen, danken, gefallen, gehören.')
    ],
    en:[
      Q('“I can swim” (können):', 'Ich kann schwimmen.', 'Ich kann zu schwimmen.', 'No “zu” after a modal verb. 🧩', 'Ich könne schwimmen.', 'That is not the present. 🔄', 'Ich kann schwimme.', 'The infinitive goes at the end: schwimmen. 🔚', 'Conjugated modal in 2nd position + infinitive at the end.'),
      Q('“I have eaten” (essen):', 'Ich habe gegessen.', 'Ich habe geesst.', 'Strong participle: gegessen. ✏️', 'Ich habe gegesst.', 'No: gegessen. ✏️', 'Ich bin gegessen.', '“Essen” is conjugated with “haben”. 🔄', 'Strong verbs: gegessen, getrunken, gesehen, geschrieben.'),
      Q('“… when it rains” (every time):', '… wenn es regnet.', '… wenn regnet es.', 'In a subordinate clause, the verb goes at the end. 🔚', '… als es regnet.', '“Als” is for a single event in the past. ⏪', '… wann es regnet.', '“Wann” is for asking a question. ❓', 'wenn (when, if, whenever), als (when, once, in the past), wann (when? question).'),
      Q('“I help my sister”:', 'Ich helfe meiner Schwester.', 'Ich helfe meine Schwester.', '“Helfen” takes the dative. 🧩', 'Ich helfe meinem Schwester.', '“Schwester” is feminine: meiner. ✏️', 'Ich helfe meinen Schwester.', 'That is not the right ending. ✏️', 'Verbs + dative: helfen, danken, gefallen, gehören.')
    ],
    es:[
      Q('«Sé nadar» (können):', 'Ich kann schwimmen.', 'Ich kann zu schwimmen.', 'Sin «zu» tras un verbo modal. 🧩', 'Ich könne schwimmen.', 'No es el presente. 🔄', 'Ich kann schwimme.', 'El infinitivo va al final: schwimmen. 🔚', 'Modal conjugado en 2.ª posición + infinitivo al final.'),
      Q('«He comido» (essen):', 'Ich habe gegessen.', 'Ich habe geesst.', 'Participio fuerte: gegessen. ✏️', 'Ich habe gegesst.', 'No: gegessen. ✏️', 'Ich bin gegessen.', '«Essen» se conjuga con «haben». 🔄', 'Verbos fuertes: gegessen, getrunken, gesehen, geschrieben.'),
      Q('«… cuando llueve» (cada vez):', '… wenn es regnet.', '… wenn regnet es.', 'En una subordinada, el verbo va al final. 🔚', '… als es regnet.', '«Als» se usa para un hecho único del pasado. ⏪', '… wann es regnet.', '«Wann» sirve para preguntar. ❓', 'wenn (cuando, si, cada vez), als (cuando, una vez, en pasado), wann (¿cuándo? pregunta).'),
      Q('«Ayudo a mi hermana»:', 'Ich helfe meiner Schwester.', 'Ich helfe meine Schwester.', '«Helfen» va con dativo. 🧩', 'Ich helfe meinem Schwester.', '«Schwester» es femenino: meiner. ✏️', 'Ich helfe meinen Schwester.', 'No es la terminación correcta. ✏️', 'Verbos + dativo: helfen, danken, gefallen, gehören.')
    ]
  });

  L('lallemand', 'cours-d5', {
    fr:[
      Q('« Au revoir » :', 'Auf Wiedersehen!', 'Guten Morgen!', 'C’est « bonjour » le matin. 🌅', 'Gute Nacht!', 'C’est « bonne nuit ». 🌙', 'Danke!', 'C’est « merci ». 🙏', 'Tschüss ! est la façon familière de dire au revoir.'),
      Q('« J’ai un frère » :', 'Ich habe einen Bruder.', 'Ich habe ein Bruder.', 'Après « haben », accusatif masculin : einen. ✏️', 'Ich habe einer Bruder.', 'Ce n’est pas la bonne terminaison. ✏️', 'Ich bin einen Bruder.', '« ich bin » veut dire « je suis » ! 😄', 'Accusatif masculin : der → den, ein → einen.'),
      Q('Conjugue « spielen » avec « wir » :', 'wir spielen', 'wir spielt', 'C’est « er » ou « ihr ». 👤', 'wir spielst', 'C’est « du ». 🙋', 'wir spiele', 'C’est « ich ». 🙋', 'spielen : ich spiele, du spielst, er spielt, wir spielen, ihr spielt, sie spielen.'),
      Q('Article de « Vater » (père) :', 'der Vater', 'das Vater', '« Vater » est masculin. 👨', 'den Vater', 'C’est l’accusatif. ✏️', 'dem Vater', 'C’est le datif. 🔄', 'der Vater, die Mutter, das Kind.'),
      Q('Comment dit-on « quatorze » ?', 'vierzehn', 'vierzig', 'C’est 40. 🔢', 'vier', 'C’est 4. 🔢', 'vierhundert', 'C’est 400. 🔢', 'De 13 à 19 : unité + zehn (dreizehn, vierzehn…).'),
      Q('« J’aime la musique » (mögen) :', 'Ich mag Musik.', 'Ich magst Musik.', 'C’est « du magst ». 🙋', 'Ich mage Musik.', 'Forme irrégulière : ich mag. ✏️', 'Ich möge Musik.', 'Ce n’est pas le présent. 🔄', 'mögen : ich mag, du magst, er mag.'),
      Q('Que signifie « Wie alt bist du? » ?', 'Quel âge as-tu ?', 'Comment t’appelles-tu ?', 'Ça, c’est « Wie heißt du? ». 🏷️', 'Où habites-tu ?', 'Ça, c’est « Wo wohnst du? ». 🏠', 'Comment vas-tu ?', 'Ça, c’est « Wie geht’s? ». 😊', 'Ich bin zwölf Jahre alt : j’ai douze ans.'),
      Q('Quel jour vient après « Freitag » ?', 'Samstag', 'Donnerstag', 'Il vient avant. 🔙', 'Sonntag', 'Il vient deux jours après. ⏩', 'Montag', 'Il revient en début de semaine. 🔁', 'Freitag (vendredi) → Samstag (samedi) → Sonntag (dimanche).')
    ],
    en:[
      Q('“Goodbye”:', 'Auf Wiedersehen!', 'Guten Morgen!', 'That is “good morning”. 🌅', 'Gute Nacht!', 'That is “good night”. 🌙', 'Danke!', 'That is “thank you”. 🙏', 'Tschüss! is the casual way to say goodbye.'),
      Q('“I have a brother”:', 'Ich habe einen Bruder.', 'Ich habe ein Bruder.', 'After “haben”, masculine accusative: einen. ✏️', 'Ich habe einer Bruder.', 'That is not the right ending. ✏️', 'Ich bin einen Bruder.', '“Ich bin” means “I am”! 😄', 'Masculine accusative: der → den, ein → einen.'),
      Q('Conjugate “spielen” with “wir”:', 'wir spielen', 'wir spielt', 'That goes with “er” or “ihr”. 👤', 'wir spielst', 'That goes with “du”. 🙋', 'wir spiele', 'That goes with “ich”. 🙋', 'spielen: ich spiele, du spielst, er spielt, wir spielen, ihr spielt, sie spielen.'),
      Q('Article for “Vater” (father):', 'der Vater', 'das Vater', '“Vater” is masculine. 👨', 'den Vater', 'That is the accusative. ✏️', 'dem Vater', 'That is the dative. 🔄', 'der Vater, die Mutter, das Kind.'),
      Q('How do you say “fourteen”?', 'vierzehn', 'vierzig', 'That is 40. 🔢', 'vier', 'That is 4. 🔢', 'vierhundert', 'That is 400. 🔢', 'From 13 to 19: unit + zehn (dreizehn, vierzehn…).'),
      Q('“I like music” (mögen):', 'Ich mag Musik.', 'Ich magst Musik.', 'That is “du magst”. 🙋', 'Ich mage Musik.', 'Irregular form: ich mag. ✏️', 'Ich möge Musik.', 'That is not the present. 🔄', 'mögen: ich mag, du magst, er mag.'),
      Q('What does “Wie alt bist du?” mean?', 'How old are you?', 'What is your name?', 'That is “Wie heißt du?”. 🏷️', 'Where do you live?', 'That is “Wo wohnst du?”. 🏠', 'How are you?', 'That is “Wie geht’s?”. 😊', 'Ich bin zwölf Jahre alt: I am twelve.'),
      Q('Which day comes after “Freitag”?', 'Samstag', 'Donnerstag', 'It comes before. 🔙', 'Sonntag', 'It comes two days after. ⏩', 'Montag', 'It is back at the start of the week. 🔁', 'Freitag (Friday) → Samstag (Saturday) → Sonntag (Sunday).')
    ],
    es:[
      Q('«Adiós»:', 'Auf Wiedersehen!', 'Guten Morgen!', 'Es «buenos días» por la mañana. 🌅', 'Gute Nacht!', 'Es «buenas noches». 🌙', 'Danke!', 'Es «gracias». 🙏', 'Tschüss! es la forma familiar de despedirse.'),
      Q('«Tengo un hermano»:', 'Ich habe einen Bruder.', 'Ich habe ein Bruder.', 'Tras «haben», acusativo masculino: einen. ✏️', 'Ich habe einer Bruder.', 'No es la terminación correcta. ✏️', 'Ich bin einen Bruder.', '¡«Ich bin» significa «yo soy»! 😄', 'Acusativo masculino: der → den, ein → einen.'),
      Q('Conjuga «spielen» con «wir»:', 'wir spielen', 'wir spielt', 'Va con «er» o «ihr». 👤', 'wir spielst', 'Va con «du». 🙋', 'wir spiele', 'Va con «ich». 🙋', 'spielen: ich spiele, du spielst, er spielt, wir spielen, ihr spielt, sie spielen.'),
      Q('Artículo de «Vater» (padre):', 'der Vater', 'das Vater', '«Vater» es masculino. 👨', 'den Vater', 'Es el acusativo. ✏️', 'dem Vater', 'Es el dativo. 🔄', 'der Vater, die Mutter, das Kind.'),
      Q('¿Cómo se dice «catorce»?', 'vierzehn', 'vierzig', 'Es 40. 🔢', 'vier', 'Es 4. 🔢', 'vierhundert', 'Es 400. 🔢', 'Del 13 al 19: unidad + zehn (dreizehn, vierzehn…).'),
      Q('«Me gusta la música» (mögen):', 'Ich mag Musik.', 'Ich magst Musik.', 'Es «du magst». 🙋', 'Ich mage Musik.', 'Forma irregular: ich mag. ✏️', 'Ich möge Musik.', 'No es el presente. 🔄', 'mögen: ich mag, du magst, er mag.'),
      Q('¿Qué significa «Wie alt bist du?»?', '¿Cuántos años tienes?', '¿Cómo te llamas?', 'Eso es «Wie heißt du?». 🏷️', '¿Dónde vives?', 'Eso es «Wo wohnst du?». 🏠', '¿Cómo estás?', 'Eso es «Wie geht’s?». 😊', 'Ich bin zwölf Jahre alt: tengo doce años.'),
      Q('¿Qué día viene después de «Freitag»?', 'Samstag', 'Donnerstag', 'Viene antes. 🔙', 'Sonntag', 'Viene dos días después. ⏩', 'Montag', 'Vuelve al principio de la semana. 🔁', 'Freitag (viernes) → Samstag (sábado) → Sonntag (domingo).')
    ]
  });

  L('lallemand', 'cours-d4', {
    fr:[
      Q('« Je vois la maison » :', 'Ich sehe das Haus.', 'Ich sehe den Haus.', '« Haus » est neutre : das ne change pas. 🏠', 'Ich sehe dem Haus.', 'C’est un datif ; « sehen » demande l’accusatif. 🔄', 'Ich sehe der Haus.', 'Ce n’est pas le bon genre. ✏️', 'À l’accusatif, seul le masculin change : den.'),
      Q('« Il peut venir » :', 'Er kann kommen.', 'Er kann kommt.', 'Après un modal, l’infinitif : kommen. 🔄', 'Er könnt kommen.', 'C’est « ihr könnt ». 👥', 'Er kommen kann.', 'Le verbe conjugué est en 2e position. 🔢', 'können : ich kann, du kannst, er kann.'),
      Q('« Où est la poste ? » :', 'Wo ist die Post?', 'Wer ist die Post?', '« wer » veut dire « qui ». 👤', 'Wann ist die Post?', '« wann » veut dire « quand ». ⏰', 'Wo ist der Post?', '« Post » est féminin. ✏️', 'wo (où), wer (qui), wann (quand), was (quoi), wie (comment).'),
      Q('Parfait de « spielen » avec « ich » :', 'ich habe gespielt', 'ich bin gespielt', '« spielen » se conjugue avec « haben ». 🔄', 'ich habe spielt', 'Il manque le préfixe ge-. ✏️', 'ich habe gespielen', 'Verbe faible : -t à la fin. ✏️', 'Verbe faible : ge- + radical + -t (gespielt, gemacht).'),
      Q('Parfait de « fahren » avec « er » :', 'er ist gefahren', 'er hat gefahrt', 'Verbe de déplacement et participe fort : ist gefahren. 🚗', 'er ist gefahrt', 'Participe fort : gefahren. ✏️', 'er war gefahren', 'C’est le plus-que-parfait. ⏪', 'Verbes de déplacement avec « sein » : ist gefahren, ist gegangen.'),
      Q('« Il pleut » :', 'Es regnet.', 'Es regnen.', '« regnen » est l’infinitif. 🔄', 'Er regnet.', 'Pour la météo, on dit « es ». 🌧️', 'Es regnest.', 'C’est une forme de « du ». 🙋', 'Es regnet, es schneit, es ist kalt.'),
      Q('Comment dit-on « à gauche » ?', 'links', 'rechts', 'C’est « à droite ». ➡️', 'geradeaus', 'C’est « tout droit ». ⬆️', 'hinten', 'C’est « derrière ». 🔙', 'Gehen Sie links, dann geradeaus.'),
      Q('« Ma sœur a un chien » :', 'Meine Schwester hat einen Hund.', 'Mein Schwester hat einen Hund.', '« Schwester » est féminin : meine. ✏️', 'Meine Schwester hat ein Hund.', '« Hund » est masculin, à l’accusatif : einen. ✏️', 'Meine Schwester ist einen Hund.', '« ist » veut dire « est » ! 😄', 'mein (masc./neutre), meine (fém./pluriel).')
    ],
    en:[
      Q('“I see the house”:', 'Ich sehe das Haus.', 'Ich sehe den Haus.', '“Haus” is neuter: das does not change. 🏠', 'Ich sehe dem Haus.', 'That is a dative; “sehen” takes the accusative. 🔄', 'Ich sehe der Haus.', 'That is the wrong gender. ✏️', 'In the accusative, only the masculine changes: den.'),
      Q('“He can come”:', 'Er kann kommen.', 'Er kann kommt.', 'After a modal, the infinitive: kommen. 🔄', 'Er könnt kommen.', 'That is “ihr könnt”. 👥', 'Er kommen kann.', 'The conjugated verb comes second. 🔢', 'können: ich kann, du kannst, er kann.'),
      Q('“Where is the post office?”:', 'Wo ist die Post?', 'Wer ist die Post?', '“Wer” means “who”. 👤', 'Wann ist die Post?', '“Wann” means “when”. ⏰', 'Wo ist der Post?', '“Post” is feminine. ✏️', 'wo (where), wer (who), wann (when), was (what), wie (how).'),
      Q('Perfect of “spielen” with “ich”:', 'ich habe gespielt', 'ich bin gespielt', '“Spielen” is conjugated with “haben”. 🔄', 'ich habe spielt', 'The ge- prefix is missing. ✏️', 'ich habe gespielen', 'Weak verb: -t at the end. ✏️', 'Weak verb: ge- + stem + -t (gespielt, gemacht).'),
      Q('Perfect of “fahren” with “er”:', 'er ist gefahren', 'er hat gefahrt', 'A verb of movement with a strong participle: ist gefahren. 🚗', 'er ist gefahrt', 'Strong participle: gefahren. ✏️', 'er war gefahren', 'That is the pluperfect. ⏪', 'Verbs of movement take “sein”: ist gefahren, ist gegangen.'),
      Q('“It is raining”:', 'Es regnet.', 'Es regnen.', '“Regnen” is the infinitive. 🔄', 'Er regnet.', 'For the weather, you say “es”. 🌧️', 'Es regnest.', 'That is a “du” form. 🙋', 'Es regnet, es schneit, es ist kalt.'),
      Q('How do you say “on the left”?', 'links', 'rechts', 'That means “on the right”. ➡️', 'geradeaus', 'That means “straight on”. ⬆️', 'hinten', 'That means “behind”. 🔙', 'Gehen Sie links, dann geradeaus.'),
      Q('“My sister has a dog”:', 'Meine Schwester hat einen Hund.', 'Mein Schwester hat einen Hund.', '“Schwester” is feminine: meine. ✏️', 'Meine Schwester hat ein Hund.', '“Hund” is masculine, in the accusative: einen. ✏️', 'Meine Schwester ist einen Hund.', '“Ist” means “is”! 😄', 'mein (masc./neuter), meine (fem./plural).')
    ],
    es:[
      Q('«Veo la casa»:', 'Ich sehe das Haus.', 'Ich sehe den Haus.', '«Haus» es neutro: das no cambia. 🏠', 'Ich sehe dem Haus.', 'Es un dativo; «sehen» pide acusativo. 🔄', 'Ich sehe der Haus.', 'No es el género correcto. ✏️', 'En acusativo, solo cambia el masculino: den.'),
      Q('«Él puede venir»:', 'Er kann kommen.', 'Er kann kommt.', 'Tras un modal, el infinitivo: kommen. 🔄', 'Er könnt kommen.', 'Es «ihr könnt». 👥', 'Er kommen kann.', 'El verbo conjugado va en segunda posición. 🔢', 'können: ich kann, du kannst, er kann.'),
      Q('«¿Dónde está correos?»:', 'Wo ist die Post?', 'Wer ist die Post?', '«Wer» significa «quién». 👤', 'Wann ist die Post?', '«Wann» significa «cuándo». ⏰', 'Wo ist der Post?', '«Post» es femenino. ✏️', 'wo (dónde), wer (quién), wann (cuándo), was (qué), wie (cómo).'),
      Q('Perfecto de «spielen» con «ich»:', 'ich habe gespielt', 'ich bin gespielt', '«Spielen» se conjuga con «haben». 🔄', 'ich habe spielt', 'Falta el prefijo ge-. ✏️', 'ich habe gespielen', 'Verbo débil: -t al final. ✏️', 'Verbo débil: ge- + raíz + -t (gespielt, gemacht).'),
      Q('Perfecto de «fahren» con «er»:', 'er ist gefahren', 'er hat gefahrt', 'Verbo de movimiento con participio fuerte: ist gefahren. 🚗', 'er ist gefahrt', 'Participio fuerte: gefahren. ✏️', 'er war gefahren', 'Es el pluscuamperfecto. ⏪', 'Los verbos de movimiento van con «sein»: ist gefahren, ist gegangen.'),
      Q('«Llueve»:', 'Es regnet.', 'Es regnen.', '«Regnen» es el infinitivo. 🔄', 'Er regnet.', 'Para el tiempo se dice «es». 🌧️', 'Es regnest.', 'Es una forma de «du». 🙋', 'Es regnet, es schneit, es ist kalt.'),
      Q('¿Cómo se dice «a la izquierda»?', 'links', 'rechts', 'Es «a la derecha». ➡️', 'geradeaus', 'Es «todo recto». ⬆️', 'hinten', 'Es «detrás». 🔙', 'Gehen Sie links, dann geradeaus.'),
      Q('«Mi hermana tiene un perro»:', 'Meine Schwester hat einen Hund.', 'Mein Schwester hat einen Hund.', '«Schwester» es femenino: meine. ✏️', 'Meine Schwester hat ein Hund.', '«Hund» es masculino, en acusativo: einen. ✏️', 'Meine Schwester ist einen Hund.', '¡«Ist» significa «es»! 😄', 'mein (masc./neutro), meine (fem./plural).')
    ]
  });

  L('lallemand', 'cours-d3', {
    fr:[
      Q('« Je sais qu’il est malade » :', 'Ich weiß, dass er krank ist.', 'Ich weiß, dass er ist krank.', 'Dans la subordonnée, le verbe va à la fin. 🔚', 'Ich weiß, das er krank ist.', '« das » est un article ; la conjonction s’écrit « dass ». ✏️', 'Ich weiß, dass krank er ist.', 'Le sujet vient juste après « dass ». 🔢', 'dass, weil, wenn, ob : verbe conjugué à la fin.'),
      Q('« Je donne le cadeau à mon père » :', 'Ich gebe meinem Vater das Geschenk.', 'Ich gebe meinen Vater das Geschenk.', 'À qui ? → datif : meinem. 🎁', 'Ich gebe meiner Vater das Geschenk.', '« Vater » est masculin : meinem. ✏️', 'Ich gebe mein Vater das Geschenk.', 'Il manque la marque du datif. ✏️', 'Datif : dem/einem/meinem (masc. et neutre), der/einer/meiner (fém.).'),
      Q('Prétérit de « haben » avec « wir » :', 'wir hatten', 'wir habten', 'Forme irrégulière : hatten. ✏️', 'wir hatte', 'C’est « ich » ou « er ». 👤', 'wir hätten', 'C’est le subjonctif II. 🤔', 'haben : ich hatte, du hattest, er hatte, wir hatten, ihr hattet, sie hatten.'),
      Q('Comparatif de « alt » :', 'älter', 'alter', 'Il faut l’inflexion : ä. ✏️', 'mehr alt', 'On ajoute -er au lieu de « mehr ». 🧩', 'am ältesten', 'C’est le superlatif. 🏆', 'alt → älter, jung → jünger, groß → größer.'),
      Q('« Quand j’étais petit, je jouais beaucoup » :', 'Als ich klein war, spielte ich viel.', 'Wenn ich klein war, spielte ich viel.', 'Une période passée unique : « als ». ⏪', 'Als ich war klein, spielte ich viel.', 'Dans la subordonnée, le verbe va à la fin. 🔚', 'Als ich klein war, ich spielte viel.', 'Après la subordonnée, le verbe vient tout de suite. 🔢', 'Als ich klein war, … : verbe – sujet dans la principale.'),
      Q('Quelle ville était coupée en deux par un mur de 1961 à 1989 ?', 'Berlin', 'Bonn', 'C’était la capitale de l’Allemagne de l’Ouest. 🏛️', 'Munich', 'Non. 🥨', 'Hambourg', 'Non. ⚓', 'Le mur de Berlin séparait Berlin-Est et Berlin-Ouest.'),
      Q('« Je voudrais un café » :', 'Ich möchte einen Kaffee.', 'Ich möchte ein Kaffee.', '« Kaffee » est masculin, à l’accusatif : einen. ☕', 'Ich mochte einen Kaffee.', 'Sans inflexion, c’est un prétérit : « j’aimais ». ⏪', 'Ich möchten einen Kaffee.', 'C’est « wir » ou « sie ». 👥', 'ich möchte = je voudrais, la façon polie de commander.'),
      Q('Quel poète, ami de Goethe, a écrit l’« Ode à la joie » mise en musique par Beethoven ?', 'Friedrich Schiller', 'Johann Wolfgang von Goethe', 'C’était son ami, mais pas l’auteur de ce poème. ✍️', 'Ludwig van Beethoven', 'Il a écrit la musique, pas le texte. 🎼', 'Thomas Mann', 'Il est né bien plus tard. 📅', 'L’« Ode à la joie » est aujourd’hui l’hymne de l’Union européenne.')
    ],
    en:[
      Q('“I know that he is ill”:', 'Ich weiß, dass er krank ist.', 'Ich weiß, dass er ist krank.', 'In the subordinate clause, the verb goes at the end. 🔚', 'Ich weiß, das er krank ist.', '“Das” is an article; the conjunction is spelt “dass”. ✏️', 'Ich weiß, dass krank er ist.', 'The subject comes right after “dass”. 🔢', 'dass, weil, wenn, ob: conjugated verb at the end.'),
      Q('“I give the present to my father”:', 'Ich gebe meinem Vater das Geschenk.', 'Ich gebe meinen Vater das Geschenk.', 'To whom? → dative: meinem. 🎁', 'Ich gebe meiner Vater das Geschenk.', '“Vater” is masculine: meinem. ✏️', 'Ich gebe mein Vater das Geschenk.', 'The dative ending is missing. ✏️', 'Dative: dem/einem/meinem (masc. and neuter), der/einer/meiner (fem.).'),
      Q('Preterite of “haben” with “wir”:', 'wir hatten', 'wir habten', 'Irregular form: hatten. ✏️', 'wir hatte', 'That goes with “ich” or “er”. 👤', 'wir hätten', 'That is the subjunctive II. 🤔', 'haben: ich hatte, du hattest, er hatte, wir hatten, ihr hattet, sie hatten.'),
      Q('Comparative of “alt”:', 'älter', 'alter', 'It needs the umlaut: ä. ✏️', 'mehr alt', 'You add -er instead of “mehr”. 🧩', 'am ältesten', 'That is the superlative. 🏆', 'alt → älter, jung → jünger, groß → größer.'),
      Q('“When I was little, I played a lot”:', 'Als ich klein war, spielte ich viel.', 'Wenn ich klein war, spielte ich viel.', 'A single period in the past: “als”. ⏪', 'Als ich war klein, spielte ich viel.', 'In the subordinate clause, the verb goes at the end. 🔚', 'Als ich klein war, ich spielte viel.', 'After the subordinate clause, the verb comes straight away. 🔢', 'Als ich klein war, …: verb – subject in the main clause.'),
      Q('Which city was split in two by a wall from 1961 to 1989?', 'Berlin', 'Bonn', 'That was the capital of West Germany. 🏛️', 'Munich', 'No. 🥨', 'Hamburg', 'No. ⚓', 'The Berlin Wall separated East and West Berlin.'),
      Q('“I would like a coffee”:', 'Ich möchte einen Kaffee.', 'Ich möchte ein Kaffee.', '“Kaffee” is masculine, in the accusative: einen. ☕', 'Ich mochte einen Kaffee.', 'Without the umlaut, it is a preterite: “I liked”. ⏪', 'Ich möchten einen Kaffee.', 'That goes with “wir” or “sie”. 👥', 'ich möchte = I would like, the polite way to order.'),
      Q('Which poet, a friend of Goethe, wrote the “Ode to Joy” set to music by Beethoven?', 'Friedrich Schiller', 'Johann Wolfgang von Goethe', 'He was his friend, but did not write this poem. ✍️', 'Ludwig van Beethoven', 'He wrote the music, not the words. 🎼', 'Thomas Mann', 'He was born much later. 📅', 'The “Ode to Joy” is now the anthem of the European Union.')
    ],
    es:[
      Q('«Sé que está enfermo»:', 'Ich weiß, dass er krank ist.', 'Ich weiß, dass er ist krank.', 'En la subordinada, el verbo va al final. 🔚', 'Ich weiß, das er krank ist.', '«Das» es un artículo; la conjunción se escribe «dass». ✏️', 'Ich weiß, dass krank er ist.', 'El sujeto va justo después de «dass». 🔢', 'dass, weil, wenn, ob: verbo conjugado al final.'),
      Q('«Le doy el regalo a mi padre»:', 'Ich gebe meinem Vater das Geschenk.', 'Ich gebe meinen Vater das Geschenk.', '¿A quién? → dativo: meinem. 🎁', 'Ich gebe meiner Vater das Geschenk.', '«Vater» es masculino: meinem. ✏️', 'Ich gebe mein Vater das Geschenk.', 'Falta la marca del dativo. ✏️', 'Dativo: dem/einem/meinem (masc. y neutro), der/einer/meiner (fem.).'),
      Q('Pretérito de «haben» con «wir»:', 'wir hatten', 'wir habten', 'Forma irregular: hatten. ✏️', 'wir hatte', 'Va con «ich» o «er». 👤', 'wir hätten', 'Es el subjuntivo II. 🤔', 'haben: ich hatte, du hattest, er hatte, wir hatten, ihr hattet, sie hatten.'),
      Q('Comparativo de «alt»:', 'älter', 'alter', 'Hace falta la diéresis: ä. ✏️', 'mehr alt', 'Se añade -er en lugar de «mehr». 🧩', 'am ältesten', 'Es el superlativo. 🏆', 'alt → älter, jung → jünger, groß → größer.'),
      Q('«Cuando era pequeño, jugaba mucho»:', 'Als ich klein war, spielte ich viel.', 'Wenn ich klein war, spielte ich viel.', 'Un periodo único del pasado: «als». ⏪', 'Als ich war klein, spielte ich viel.', 'En la subordinada, el verbo va al final. 🔚', 'Als ich klein war, ich spielte viel.', 'Tras la subordinada, el verbo va enseguida. 🔢', 'Als ich klein war, …: verbo – sujeto en la principal.'),
      Q('¿Qué ciudad estuvo dividida por un muro de 1961 a 1989?', 'Berlín', 'Bonn', 'Era la capital de Alemania Occidental. 🏛️', 'Múnich', 'No. 🥨', 'Hamburgo', 'No. ⚓', 'El muro de Berlín separaba Berlín Este y Berlín Oeste.'),
      Q('«Quisiera un café»:', 'Ich möchte einen Kaffee.', 'Ich möchte ein Kaffee.', '«Kaffee» es masculino, en acusativo: einen. ☕', 'Ich mochte einen Kaffee.', 'Sin diéresis es un pretérito: «me gustaba». ⏪', 'Ich möchten einen Kaffee.', 'Va con «wir» o «sie». 👥', 'ich möchte = quisiera, la forma educada de pedir.'),
      Q('¿Qué poeta, amigo de Goethe, escribió la «Oda a la alegría» a la que Beethoven puso música?', 'Friedrich Schiller', 'Johann Wolfgang von Goethe', 'Era su amigo, pero no escribió este poema. ✍️', 'Ludwig van Beethoven', 'Escribió la música, no el texto. 🎼', 'Thomas Mann', 'Nació mucho después. 📅', 'La «Oda a la alegría» es hoy el himno de la Unión Europea.')
    ]
  });
})();
