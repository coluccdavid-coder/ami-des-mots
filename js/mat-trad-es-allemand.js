// Ami des mots — v6.19: alemán (segunda lengua extranjera, programa francés) para hispanohablantes.
// Las respuestas siguen en alemán; preguntas, bromas y explicaciones en español. Mismo orden que los bancos franceses.
window.MATIERES_LANGUES = window.MATIERES_LANGUES || {};
window.MATIERES_LANGUES.es = window.MATIERES_LANGUES.es || { noms:{}, q:{} };
(function(T){
  T.noms = T.noms || {}; T.q = T.q || {};
  const Q = T.q;
  T.noms.lallemand = { nom:'Alemán (segunda lengua extranjera)', dom:{ 'Bases':'Lo básico', 'Vocabulaire':'Vocabulario', 'Grammaire':'Gramática' },
    ch:{ 'de-bases':'Presentarse, artículos, negación, orden de las palabras', 'de-vocab':'Días, colores, familia, clase', 'de-college':'Modales, perfecto, subordinadas, dativo',
      'de-2nde':'Pretérito, comparativo, wenn o als', 'de-lycee':'Konjunktiv II, pasiva, relativas, falsos amigos', 'de-revisions':'Repaso de la secundaria' } };
  const BASES = [
    ['«Me llamo Tom»:', 'Ich heiße Tom.', [['Ich heißt Tom.', '«heißt» va con du, er, sie. Con ich: heiße. 🙋'], ['Ich bin heiße Tom.', 'Dos verbos apretados en un solo hueco. 🧩'], ['Mich heiße Tom.', '«mich» es un complemento. El sujeto es «ich». 🎯']], 'Heißen: ich heiße, du heißt, er heißt.'],
    ['Artículo de «Mädchen» (chica):', 'das Mädchen', [['die Mädchen', '¡Trampa! Los nombres en -chen son neutros: das. 👧'], ['der Mädchen', '«der» es masculino. Aquí, neutro. 🧩'], ['den Mädchen', '«den» es un acusativo masculino o un dativo plural. 🔄']], 'Los nombres en -chen y -lein son neutros (das).'],
    ['«No tengo perro»:', 'Ich habe keinen Hund.', [['Ich habe nicht Hund.', 'Delante de un nombre con artículo indefinido, se niega con «kein». 🐕'], ['Ich habe kein Hund.', 'Hund es masculino y complemento directo: acusativo «keinen». 🦴'], ['Ich nicht habe Hund.', 'El verbo tiene que quedarse en segunda posición. 🥈']], 'Kein / keine / keinen: la negación delante de un nombre.'],
    ['¿Dónde va el verbo? «Heute ___ ich Fußball.»', 'spiele', [['Heute ich spiele Fußball.', 'En alemán, el verbo conjugado va siempre en 2.ª posición: Heute spiele ich… ⚽'], ['spielen', 'Infinitivo en vez de la forma conjugada: tu frase se quedó en el vestuario. 👟'], ['spielt', '«spielt» va con er/sie/es. Con ich: spiele. 🙋']], 'Verbo conjugado en segunda posición: Heute spiele ich Fußball.'],
    ['¿Cuál es la capital de Austria?', 'Viena (Wien)', [['Berlín', 'Berlín es Alemania. Vecina, pero no el mismo país. 🇩🇪'], ['Berna', 'Berna es Suiza. 🇨🇭'], ['Múnich', 'Múnich está en Alemania, en Baviera. 🥨']], 'El alemán se habla en Alemania, Austria, Suiza, Liechtenstein, Luxemburgo…'],
    ['¿Cómo se dice «veintiuno»?', 'einundzwanzig', [['zwanzigeins', 'El alemán dice las unidades antes que las decenas: «uno-y-veinte». 🔢'], ['zweiundzwanzig', 'Eso es 22. Uno de más. ➕'], ['einszwanzig', 'Falta el «und». 🔗']], '21 = einundzwanzig, 35 = fünfunddreißig.']
  ];
  const COLLEGE = [
    ['«Tengo que hacer los deberes»:', 'Ich muss meine Hausaufgaben machen.', [['Ich muss machen meine Hausaufgaben.', 'Con un verbo modal, el infinitivo se va al final de la frase. 📚'], ['Ich muss meine Hausaufgaben zu machen.', 'Nada de «zu» después de un modal. ✂️'], ['Ich müsse meine Hausaufgaben machen.', '«müsse» es un subjuntivo. Aquí es «muss». 🎯']], 'Modal (können, müssen, wollen…) en 2.ª posición, infinitivo al final.'],
    ['«He jugado» (spielen):', 'Ich habe gespielt.', [['Ich bin gespielt.', 'Spielen forma el pasado con «haben». «Sein» es sobre todo para los desplazamientos. 🎮'], ['Ich habe spielt.', 'Falta el «ge-» del participio: gespielt. 🧩'], ['Ich habe gespielen.', 'Verbo regular: participio en ge-…-t. 🔧']], 'Perfecto: haben/sein + participio (ge-spiel-t).'],
    ['«Fui a Berlín»:', 'Ich bin nach Berlin gefahren.', [['Ich habe nach Berlin gefahren.', 'Un desplazamiento lleva el auxiliar «sein». 🚆'], ['Ich bin nach Berlin gefahrt.', 'Fahren es irregular: gefahren. 🛤️'], ['Ich bin zu Berlin gefahren.', 'Para una ciudad o un país sin artículo: nach. 🧭']], 'Los verbos de movimiento forman el perfecto con sein.'],
    ['«… porque está enfermo»:', '… weil er krank ist.', [['… weil er ist krank.', 'Después de «weil», el verbo conjugado se va al final. 🏁'], ['… denn er krank ist.', 'Después de «denn» no cambia el orden: denn er ist krank. 🔄'], ['… weil ist er krank.', 'El verbo saltó al sitio equivocado. 🦘']], 'Subordinada (weil, dass, wenn): verbo conjugado al final.'],
    ['«Voy al cine con mi hermano»:', 'Ich gehe mit meinem Bruder ins Kino.', [['Ich gehe mit mein Bruder ins Kino.', '«mit» pide dativo: meinem. 🎬'], ['Ich gehe mit meinen Bruder ins Kino.', '«meinen» es acusativo. Después de «mit»: dativo, meinem. 🍿'], ['Ich gehe mit meinem Bruder in Kino.', 'Dirección hacia un lugar: in + das = ins. 🎟️']], 'Mit, von, zu, bei, aus, nach, seit + dativo.']
  ];
  Q['lallemand/de-bases'] = BASES;
  Q['lallemand/de-vocab'] = [
    ['«Montag» quiere decir:', 'lunes', [['martes', 'Martes es «Dienstag». 📅'], ['mes', 'Mes es «der Monat». Se parece, pero no. 🗓️'], ['montaña', 'Montaña es «der Berg». ⛰️']], 'Montag, Dienstag, Mittwoch, Donnerstag, Freitag, Samstag, Sonntag.'],
    ['¿De qué color es «grün»?', 'verde', [['gris', 'Gris es «grau». 🐘'], ['rojo', 'Rojo es «rot». 🍓'], ['azul', 'Azul es «blau». 💙']], 'Rot, blau, grün, gelb, schwarz, weiß.'],
    ['«Die Schwester» es:', 'la hermana', [['la madre', 'La madre es «Mutter». 👩'], ['la abuela', 'La abuela es «Oma» o «Großmutter». 👵'], ['la tía', 'La tía es «Tante». 🧩']], 'Vater, Mutter, Bruder, Schwester, Opa, Oma.'],
    ['«Das Heft» es:', 'el cuaderno', [['el libro', 'El libro es «das Buch». 📖'], ['el bolígrafo', 'El bolígrafo es «der Kuli». 🖊️'], ['el estuche', 'El estuche es «das Mäppchen». ✏️']], 'Das Heft, das Buch, der Bleistift, der Radiergummi.'],
    ['«Wie spät ist es?» quiere decir:', '¿Qué hora es?', [['¿Cómo estás?', 'Eso es «Wie geht’s?». 👋'], ['¿Es tarde?', 'Buen intento: «spät» significa tarde, pero la pregunta pide la hora. ⏰'], ['¿Dónde vives?', 'Eso es «Wo wohnst du?». 🏠']], 'Es ist drei Uhr. Es ist halb vier (= ¡las 3 y media!).']
  ];
  Q['lallemand/de-college'] = COLLEGE;
  Q['lallemand/de-2nde'] = [
    ['Pretérito de «sein» con «ich»:', 'ich war', [['ich bin', 'Eso es el presente. Tu respuesta se olvidó de viajar al pasado. ⏪'], ['ich wäre', 'Eso es el Konjunktiv II (yo sería). 💭'], ['ich warte', '«warten» es esperar. Tu respuesta sigue esperando. ⏳']], 'Pretérito: ich war, ich hatte (sein, haben).'],
    ['«Más grande que»:', 'größer als', [['mehr groß als', 'El alemán añade -er al adjetivo, como el inglés: größer. 📏'], ['größer wie', 'Para comparar es «als». «wie» sirve para la igualdad (so groß wie). ⚖️'], ['großer als', 'Falta la diéresis: größer. Dos puntitos, un gran cambio. 🔤']], 'Comparativo: -er + als; igualdad: so … wie.'],
    ['«Cuando era pequeño…» (una sola vez en el pasado):', 'Als ich klein war, …', [['Wenn ich klein war, …', 'Para un momento único del pasado se dice «als». «Wenn» sirve para la repetición o el futuro. 🧒'], ['Als ich war klein, …', 'Subordinada: el verbo va al final (klein war). 🏁'], ['Wann ich klein war, …', '«Wann» sirve para preguntar (¿cuándo?). ❓']], 'Als: hecho único pasado; wenn: repetición o condición; wann: pregunta.'],
    ['Pretérito de «haben» con «wir»:', 'wir hatten', [['wir haben', 'Presente. El pretérito es «hatten». ⏪'], ['wir hätten', 'Eso es el Konjunktiv II (tendríamos). 💭'], ['wir hattet', '«hattet» va con «ihr». 👥']], 'Haben en pretérito: hatte, hattest, hatte, hatten, hattet, hatten.'],
    ['«El más rápido» (superlativo):', 'am schnellsten', [['am schnellster', 'Después de «am», la terminación es -sten. 🏃'], ['der mehr schnell', 'El alemán no forma el superlativo con «mehr». 🚫'], ['am schnell', 'Falta la terminación -sten. 🏁']], 'Superlativo: am …sten (Er läuft am schnellsten).']
  ];
  Q['lallemand/de-lycee'] = [
    ['«Si fuera rico, viajaría»:', 'Wenn ich reich wäre, würde ich reisen.', [['Wenn ich reich bin, würde ich reisen.', 'Para una hipótesis irreal: Konjunktiv II, wäre. 💭'], ['Wenn ich reich wäre, ich würde reisen.', 'Después de la subordinada, el verbo viene enseguida: würde ich. 🔄'], ['Wenn ich wäre reich, würde ich reisen.', 'En la subordinada, el verbo va al final: reich wäre. 🏁']], 'Konjunktiv II: wäre, hätte, würde + infinitivo.'],
    ['«La casa está siendo construida» (pasiva):', 'Das Haus wird gebaut.', [['Das Haus ist bauen.', 'La pasiva se forma con «werden» + participio. 🏗️'], ['Das Haus wird bauen.', 'Eso es un futuro: la casa va a construir. Qué casa tan hábil. 🏠'], ['Das Haus wird gebaute.', 'El participio no lleva terminación aquí. 🧱']], 'Pasiva: werden + participio.'],
    ['«El hombre que vive aquí»:', 'der Mann, der hier wohnt', [['der Mann, der wohnt hier', 'En una relativa, el verbo va al final. 🏠'], ['der Mann, die hier wohnt', 'Ese artículo es femenino o plural. Mann es masculino: der. 👨'], ['der Mann, was hier wohnt', '«was» se usa después de «alles», «etwas»… no después de un nombre. 🧩']], 'Pronombre relativo = artículo determinado; verbo al final de la relativa.'],
    ['Falso amigo: «bekommen» quiere decir:', 'recibir', [['convertirse', 'Convertirse se dice «werden». ¡Trampa clásica! 🎭'], ['empezar', 'Empezar es «beginnen» o «anfangen». ▶️'], ['entender', 'Entender es «verstehen». 🧠']], 'Ich bekomme ein Geschenk = recibo un regalo.'],
    ['Falso amigo: «das Gymnasium» designa:', 'el instituto que lleva al Abitur', [['el gimnasio', 'El gimnasio es «Turnhalle». 🏋️'], ['el hospital', 'El hospital es «das Krankenhaus». 🏥'], ['la gimnasia', 'La gimnasia es «das Turnen». 🤸']], 'Gymnasium: el centro que lleva al Abitur, el bachillerato alemán.']
  ];
  Q['lallemand/de-revisions'] = BASES.concat(COLLEGE);
})(window.MATIERES_LANGUES.es);
