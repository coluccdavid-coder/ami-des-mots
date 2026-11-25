// Ami des mots — v6.14: Spanish and German (second foreign language, French curriculum) for English speakers.
// The answers stay in Spanish or German; questions, jokes and explanations are in English. Same order as the French banks.
window.MATIERES_LANGUES = window.MATIERES_LANGUES || {};
window.MATIERES_LANGUES.en = window.MATIERES_LANGUES.en || { noms:{}, q:{} };
(function(T){
  T.noms = T.noms || {}; T.q = T.q || {};
  const Q = T.q;

  // ——— SPANISH ———
  T.noms.lespagnol = { nom:'Spanish (second foreign language)', dom:{ 'Bases':'Basics', 'Grammaire':'Grammar', 'Vocabulaire':'Vocabulary' },
    ch:{ 'es-bases':'Introducing yourself, articles, gustar', 'es-present':'Irregular present, estar + gerund', 'es-vocab':'Days, colours, family, classroom',
      'es-passe':'Past, near future, obligation', 'es-ser':'Ser or estar, pronouns', 'es-lycee':'Subjunctive, hypotheses, false friends', 'es-bases-lycee':'Revising the basics' } };
  const ES_BASES = [
    ['How do you say “My name is Léa”?', 'Me llamo Léa.', [['Yo llamo Léa.', 'Without “me”, you’re phoning Léa. 📞'], ['Me llama Léa.', '“llama” is “he/she calls”. For “I”, it’s “llamo”. 🙋'], ['Soy llamo Léa.', 'Two verbs jammed together: your sentence is stuck in traffic. 🚗']], 'Llamarse: me llamo, te llamas, se llama.'],
    ['Article for “casa” (house):', 'la casa', [['el casa', '“casa” ends in -a: feminine, so “la”. 🏠'], ['lo casa', '“lo” isn’t an article in front of a noun. 🧩'], ['los casa', '“los” is for more than one. Just one house here. 🏡']], 'El (masculine), la (feminine), los, las (plural).'],
    ['“I like chocolate”:', 'Me gusta el chocolate.', [['Yo gusto el chocolate.', '“Yo gusto”: now you’re the one the chocolate likes. The world upside down. 🍫'], ['Me gustan el chocolate.', 'Only one thing liked: “gusta”, no -n. 🍫'], ['Me gusta chocolate.', 'Spanish keeps the article: “el chocolate”. 🍬']], 'Me gusta + singular; me gustan + plural (me gustan los gatos).'],
    ['Conjugate “hablar” with “nosotros”:', 'hablamos', [['hablan', '“hablan” is “they speak”. You invited too many people. 👥'], ['hablo', '“hablo” is “I speak”. You’re all alone in the “we”. 🙋'], ['hablamo', 'The final -s is missing. Small letter, big effect. 🔤']], 'Hablar: hablo, hablas, habla, hablamos, habláis, hablan.'],
    ['How do you say “fifteen”?', 'quince', [['cinco', 'Cinco is five. Ten are missing. 🔢'], ['quinientos', 'Quinientos is five hundred. Your answer took the lift. 🛗'], ['catorce', 'Catorce is fourteen. One step short. 🪜']], 'Once, doce, trece, catorce, quince.'],
    ['What is the capital of Mexico?', 'Mexico City (Ciudad de México)', [['Madrid', 'Madrid is Spain. Your answer crossed the Atlantic the wrong way. ✈️'], ['Buenos Aires', 'Buenos Aires is Argentina. 🇦🇷'], ['Lima', 'Lima is Peru. 🇵🇪']], 'Spanish is spoken in about twenty countries.']
  ];
  const ES_PRESENT = [
    ['“I am thirteen”:', 'Tengo trece años.', [['Soy trece años.', 'In Spanish, age is said with “to have”: tengo. 🎂'], ['Tengo trece anos.', 'Without the tilde, “años” becomes a completely different word. Keep the ñ! 🙈'], ['Estoy trece años.', '“Estoy” is “to be” (a state). Age takes “tengo”. 🎈']], 'Tener: tengo, tienes, tiene, tenemos, tenéis, tienen.'],
    ['“I’m going to school”:', 'Voy al colegio.', [['Voy a el colegio.', 'A + el contracts to “al”. 🚌'], ['Vo al colegio.', '“Ir” is irregular: voy, vas, va… 🎒'], ['Soy al colegio.', '“Soy” is “I am”. You’ve turned into the school. 🏫']], 'Ir: voy, vas, va, vamos, vais, van. A + el = al.'],
    ['“I am eating” (right now):', 'Estoy comiendo.', [['Soy comiendo.', 'An action in progress uses “estar”. 🍽️'], ['Estoy comendo.', 'Gerund of -er verbs: -iendo. Comiendo. 🥘'], ['Estoy a comer.', 'That’s European Portuguese (estou a comer). In Spanish: estoy comiendo. 🌍']], 'Estar + gerund (-ando, -iendo): an action in progress.'],
    ['What does “hay” mean?', 'there is / there are', [['he has', '“He has” is “tiene”. 🧩'], ['he is', '“He is” is “es” or “está”. 🔄'], ['today', 'Today is “hoy”. One letter apart, a whole meaning apart. 📅']], 'Hay + noun: hay un parque (there is a park).']
  ];
  Q['lespagnol/es-bases'] = ES_BASES;
  Q['lespagnol/es-present'] = ES_PRESENT;
  Q['lespagnol/es-vocab'] = [
    ['“Lunes” means:', 'Monday', [['the moon', 'Well spotted, it does come from the moon… but it’s the day: Monday. 🌙'], ['Tuesday', 'Tuesday is “martes”. 📅'], ['Sunday', 'Sunday is “domingo”. ☀️']], 'Lunes, martes, miércoles, jueves, viernes, sábado, domingo.'],
    ['What colour is “rojo”?', 'red', [['pink', 'Pink is “rosa”. 🌸'], ['yellow', 'Yellow is “amarillo”. 🟡'], ['orange', 'Orange is “naranja”. 🍊']], 'Rojo, azul, verde, amarillo, negro, blanco.'],
    ['“El abuelo” is:', 'the grandfather', [['the uncle', 'The uncle is “el tío”. 👨'], ['the cousin', 'The cousin is “el primo”. 🧑'], ['the brother', 'The brother is “el hermano”. 👦']], 'Padre, madre, hermano, abuelo, tío, primo.'],
    ['“El cuaderno” is:', 'the exercise book', [['the school bag', 'The school bag is “la mochila”. 🎒'], ['the pen', 'The pen is “el bolígrafo” or “el boli”. 🖊️'], ['the ruler', 'The ruler is “la regla”. 📏']], 'Classroom things: el cuaderno, el libro, el lápiz, la goma.'],
    ['“¿Qué hora es?” means:', 'What time is it?', [['Where are you?', 'Where are you is “¿Dónde estás?”. 📍'], ['How are you?', 'That’s “¿Qué tal?”. 👋'], ['How old are you?', 'That’s “¿Cuántos años tienes?”. 🎂']], 'Es la una, son las dos, son las tres y media.']
  ];
  Q['lespagnol/es-passe'] = [
    ['“Yesterday I spoke with Ana”:', 'Ayer hablé con Ana.', [['Ayer he hablado con Ana.', 'With “ayer”, Spanish prefers the simple past (indefinido): hablé. 📅'], ['Ayer hablo con Ana.', 'Present tense with “yesterday”: your sentence lives on the wrong calendar. 🗓️'], ['Ayer hablaba con Ana.', 'The imperfect describes a habit or a background. Here it’s a finished action. 🎬']], 'Pretérito indefinido: hablé, hablaste, habló, hablamos, hablasteis, hablaron.'],
    ['“When I was little, I used to play football”:', 'Cuando era pequeño, jugaba al fútbol.', [['Cuando fui pequeño, jugué al fútbol.', 'A past habit calls for the imperfect: era, jugaba. ⚽'], ['Cuando estaba pequeño, jugaba al fútbol.', 'Little (age) is a characteristic: “ser”. 🧒'], ['Cuando soy pequeño, juego al fútbol.', 'Present tense for a memory: the time machine is broken. ⏳']], 'Imperfect: a habit or a description in the past.'],
    ['“I’m going to study” (near future):', 'Voy a estudiar.', [['Voy estudiar.', 'The “a” is missing. The near future is ir + a + infinitive. 🔗'], ['Iré a estudiar.', 'That means “I will go and study” (simple future + moving). 🚶'], ['Estoy a estudiar.', 'The near future isn’t made with “estar”. 🔮']], 'Ir a + infinitive = near future.'],
    ['“One has to work” (in general):', 'Hay que trabajar.', [['Tiene que trabajar.', '“Tiene que” is “he/she has to” (one particular person). In general: hay que. 👷'], ['Es que trabajar.', '“Es que” means “it’s just that…”. Not an obligation. 🙃'], ['Debe trabajar hay.', 'Two obligations mixed up and a “hay” lost at the end. 🧩']], 'Hay que + infinitive (impersonal); tener que + infinitive (personal).']
  ];
  Q['lespagnol/es-ser'] = [
    ['“Madrid is in Spain”:', 'Madrid está en España.', [['Madrid es en España.', 'Location is expressed with “estar”. 🗺️'], ['Madrid hay en España.', '“Hay” says that something exists, not where it is. 📍'], ['Madrid tiene en España.', 'Madrid doesn’t own Spain. 👑']], 'Estar: place, temporary state. Ser: identity, characteristic, origin.'],
    ['“She is tired”:', 'Está cansada.', [['Es cansada.', '“Es cansada” would mean she is tiresome, by nature. Not nice! 😴'], ['Está cansado.', 'She’s a girl: cansada, feminine. 👩'], ['Tiene cansada.', 'She doesn’t “have a tired”. 🙃']], 'Temporary state: estar.'],
    ['“I am French”:', 'Soy francés.', [['Estoy francés.', 'Nationality is identity: “ser”. 🇫🇷'], ['Soy de francés.', '“De” gives your home town or country (soy de Francia), not before the adjective. 🧭'], ['Soy francés es.', 'An extra “es” at the end: your sentence got the hiccups. 🫢']], 'Ser: nationality, job, personality.'],
    ['“I see it” (the book):', 'Lo veo.', [['Le veo.', '“Le” is mainly an indirect object (“to him”). For a masculine direct object: lo. 📘'], ['Veo lo.', 'With a conjugated verb, the pronoun goes in front: lo veo. ⬅️'], ['Lo vo.', '“Ver” gives “veo” in the first person. 👀']], 'Direct object pronouns: lo, la, los, las, placed before the conjugated verb.']
  ];
  Q['lespagnol/es-lycee'] = [
    ['“I want you to come”:', 'Quiero que vengas.', [['Quiero que vienes.', 'After “querer que” you need the subjunctive: vengas. 🙏'], ['Quiero que venir.', 'No infinitive after “que” when the subject changes. 🔀'], ['Quiero venir tú.', 'Your sentence left “tú” at the end of the platform. You need “que vengas”. 🚉']], 'Querer que + present subjunctive.'],
    ['“When you arrive, call me”:', 'Cuando llegues, llámame.', [['Cuando llegarás, llámame.', 'After “cuando” referring to the future, Spanish uses the subjunctive, not the future. ⏰'], ['Cuando llegas, llámame.', 'The indicative here talks about a habit. For the future: subjunctive. 📆'], ['Cuando llegues, me llama.', '“me llama” is “he calls me”. The command is llámame. 📲']], 'Cuando + subjunctive for a future action.'],
    ['“If I had money, I would travel”:', 'Si tuviera dinero, viajaría.', [['Si tendría dinero, viajaría.', 'Never a conditional after “si”: use the imperfect subjunctive. ✈️'], ['Si tengo dinero, viajaría.', 'Present and conditional don’t go together here. 🧩'], ['Si tuviera dinero, viajaré.', 'The future doesn’t fit the hypothesis. Conditional: viajaría. 🌍']], 'Si + imperfect subjunctive, conditional.'],
    ['False friend: “embarazada” means:', 'pregnant', [['embarrassed', 'The most famous false friend! Embarrassed is “avergonzada”. 😳'], ['hugged', 'Hugged is “abrazada”. 💬'], ['on board', 'On board is “embarcada”. ⛵']], 'False friends: embarazada (pregnant), constipado (with a cold), exquisito (delicious).'],
    ['False friend: “constipado” means:', 'having a cold', [['constipated', 'A classic trap: in Spanish it’s the nose that is blocked. 🤧'], ['constant', 'Constant is “constante”. 🔁'], ['happy', 'Happy is “contento”. 😊']], 'Estoy constipado = I have a cold.']
  ];
  Q['lespagnol/es-bases-lycee'] = ES_BASES.concat(ES_PRESENT);

  // ——— GERMAN ———
  T.noms.lallemand = { nom:'German (second foreign language)', dom:{ 'Bases':'Basics', 'Vocabulaire':'Vocabulary', 'Grammaire':'Grammar' },
    ch:{ 'de-bases':'Introducing yourself, articles, negation, word order', 'de-vocab':'Days, colours, family, classroom', 'de-college':'Modals, perfect, subordinate clauses, dative',
      'de-2nde':'Preterite, comparatives, wenn or als', 'de-lycee':'Konjunktiv II, passive, relative clauses, false friends', 'de-revisions':'Revising middle school' } };
  const DE_BASES = [
    ['“My name is Tom”:', 'Ich heiße Tom.', [['Ich heißt Tom.', '“heißt” goes with du, er, sie. With ich: heiße. 🙋'], ['Ich bin heiße Tom.', 'Two verbs squeezed into one slot. 🧩'], ['Mich heiße Tom.', '“mich” is an object. The subject is “ich”. 🎯']], 'Heißen: ich heiße, du heißt, er heißt.'],
    ['Article for “Mädchen” (girl):', 'das Mädchen', [['die Mädchen', 'Trap! Nouns ending in -chen are neuter: das. 👧'], ['der Mädchen', '“der” is masculine. Here it’s neuter. 🧩'], ['den Mädchen', '“den” is a masculine accusative or a dative plural. 🔄']], 'Nouns in -chen and -lein are neuter (das).'],
    ['“I don’t have a dog”:', 'Ich habe keinen Hund.', [['Ich habe nicht Hund.', 'Before a noun with an indefinite article, you negate with “kein”. 🐕'], ['Ich habe kein Hund.', 'Hund is masculine and the object: accusative “keinen”. 🦴'], ['Ich nicht habe Hund.', 'The verb has to stay in second position. 🥈']], 'Kein / keine / keinen: negation in front of a noun.'],
    ['Where does the verb go? “Heute ___ ich Fußball.”', 'spiele', [['Heute ich spiele Fußball.', 'In German the conjugated verb is always in 2nd position: Heute spiele ich… ⚽'], ['spielen', 'Infinitive instead of the conjugated form: your sentence stayed in the changing room. 👟'], ['spielt', '“spielt” goes with er/sie/es. With ich: spiele. 🙋']], 'Conjugated verb in second position: Heute spiele ich Fußball.'],
    ['What is the capital of Austria?', 'Vienna (Wien)', [['Berlin', 'Berlin is Germany. A neighbour, but not the same country. 🇩🇪'], ['Bern', 'Bern is Switzerland. 🇨🇭'], ['Munich', 'Munich is in Germany, in Bavaria. 🥨']], 'German is spoken in Germany, Austria, Switzerland, Liechtenstein, Luxembourg…'],
    ['How do you say “twenty-one”?', 'einundzwanzig', [['zwanzigeins', 'German says the units before the tens: “one-and-twenty”. 🔢'], ['zweiundzwanzig', 'That’s 22. One too many. ➕'], ['einszwanzig', 'The “und” is missing. 🔗']], '21 = einundzwanzig, 35 = fünfunddreißig.']
  ];
  const DE_COLLEGE = [
    ['“I have to do my homework”:', 'Ich muss meine Hausaufgaben machen.', [['Ich muss machen meine Hausaufgaben.', 'With a modal verb, the infinitive goes to the end of the sentence. 📚'], ['Ich muss meine Hausaufgaben zu machen.', 'No “zu” after a modal. ✂️'], ['Ich müsse meine Hausaufgaben machen.', '“müsse” is a subjunctive. Here it’s “muss”. 🎯']], 'Modal (können, müssen, wollen…) in 2nd position, infinitive at the end.'],
    ['“I played” (spielen):', 'Ich habe gespielt.', [['Ich bin gespielt.', 'Spielen forms its past with “haben”. “Sein” is mostly for movement. 🎮'], ['Ich habe spielt.', 'The “ge-” of the participle is missing: gespielt. 🧩'], ['Ich habe gespielen.', 'Regular verb: participle in ge-…-t. 🔧']], 'Perfect: haben/sein + past participle (ge-spiel-t).'],
    ['“I went to Berlin”:', 'Ich bin nach Berlin gefahren.', [['Ich habe nach Berlin gefahren.', 'Movement takes the auxiliary “sein”. 🚆'], ['Ich bin nach Berlin gefahrt.', 'Fahren is irregular: gefahren. 🛤️'], ['Ich bin zu Berlin gefahren.', 'For a town or a country without an article: nach. 🧭']], 'Verbs of movement form the perfect with sein.'],
    ['“… because he is ill”:', '… weil er krank ist.', [['… weil er ist krank.', 'After “weil”, the conjugated verb goes to the end. 🏁'], ['… denn er krank ist.', 'After “denn”, no change of word order: denn er ist krank. 🔄'], ['… weil ist er krank.', 'The verb jumped to the wrong place. 🦘']], 'Subordinate clause (weil, dass, wenn): conjugated verb at the end.'],
    ['“I’m going to the cinema with my brother”:', 'Ich gehe mit meinem Bruder ins Kino.', [['Ich gehe mit mein Bruder ins Kino.', '“mit” takes the dative: meinem. 🎬'], ['Ich gehe mit meinen Bruder ins Kino.', '“meinen” is accusative. After “mit”: dative, meinem. 🍿'], ['Ich gehe mit meinem Bruder in Kino.', 'Going towards a place: in + das = ins. 🎟️']], 'Mit, von, zu, bei, aus, nach, seit + dative.']
  ];
  Q['lallemand/de-bases'] = DE_BASES;
  Q['lallemand/de-vocab'] = [
    ['“Montag” means:', 'Monday', [['Tuesday', 'Tuesday is “Dienstag”. 📅'], ['month', 'Month is “der Monat”. Similar, but no. 🗓️'], ['mountain', 'Mountain is “der Berg”. ⛰️']], 'Montag, Dienstag, Mittwoch, Donnerstag, Freitag, Samstag, Sonntag.'],
    ['What colour is “grün”?', 'green', [['grey', 'Grey is “grau”. 🐘'], ['red', 'Red is “rot”. 🍓'], ['blue', 'Blue is “blau”. 💙']], 'Rot, blau, grün, gelb, schwarz, weiß.'],
    ['“Die Schwester” is:', 'the sister', [['the mother', 'The mother is “Mutter”. 👩'], ['the grandmother', 'The grandmother is “Oma” or “Großmutter”. 👵'], ['the aunt', 'The aunt is “Tante”. 🧩']], 'Vater, Mutter, Bruder, Schwester, Opa, Oma.'],
    ['“Das Heft” is:', 'the exercise book', [['the book', 'The book is “das Buch”. 📖'], ['the pen', 'The pen is “der Kuli”. 🖊️'], ['the pencil case', 'The pencil case is “das Mäppchen”. ✏️']], 'Das Heft, das Buch, der Bleistift, der Radiergummi.'],
    ['“Wie spät ist es?” means:', 'What time is it?', [['How are you?', 'That’s “Wie geht’s?”. 👋'], ['Is it late?', 'Nice try: “spät” means late, but the question asks for the time. ⏰'], ['Where do you live?', 'That’s “Wo wohnst du?”. 🏠']], 'Es ist drei Uhr. Es ist halb vier (= 3:30!).']
  ];
  Q['lallemand/de-college'] = DE_COLLEGE;
  Q['lallemand/de-2nde'] = [
    ['Preterite of “sein” with “ich”:', 'ich war', [['ich bin', 'That’s the present. Your answer forgot to go back in time. ⏪'], ['ich wäre', 'That’s Konjunktiv II (I would be). 💭'], ['ich warte', '“warten” means to wait. Your answer is still waiting. ⏳']], 'Preterite: ich war, ich hatte (sein, haben).'],
    ['“Bigger than”:', 'größer als', [['mehr groß als', 'German adds -er to the adjective, like English: größer. 📏'], ['größer wie', 'To compare, it’s “als”. “wie” is for equality (so groß wie). ⚖️'], ['großer als', 'The umlaut is missing: größer. Two little dots, a big change. 🔤']], 'Comparative: -er + als; equality: so … wie.'],
    ['“When I was little…” (one time in the past):', 'Als ich klein war, …', [['Wenn ich klein war, …', 'For a single moment in the past, you say “als”. “Wenn” is for repetition or the future. 🧒'], ['Als ich war klein, …', 'Subordinate clause: the verb goes to the end (klein war). 🏁'], ['Wann ich klein war, …', '“Wann” is for asking a question (when?). ❓']], 'Als: a single past event; wenn: repetition or condition; wann: question.'],
    ['Preterite of “haben” with “wir”:', 'wir hatten', [['wir haben', 'Present. The preterite is “hatten”. ⏪'], ['wir hätten', 'That’s Konjunktiv II (we would have). 💭'], ['wir hattet', '“hattet” goes with “ihr”. 👥']], 'Haben in the preterite: hatte, hattest, hatte, hatten, hattet, hatten.'],
    ['“The fastest” (superlative):', 'am schnellsten', [['am schnellster', 'After “am”, the ending is -sten. 🏃'], ['der mehr schnell', 'German doesn’t build the superlative with “mehr”. 🚫'], ['am schnell', 'The -sten ending is missing. 🏁']], 'Superlative: am …sten (Er läuft am schnellsten).']
  ];
  Q['lallemand/de-lycee'] = [
    ['“If I were rich, I would travel”:', 'Wenn ich reich wäre, würde ich reisen.', [['Wenn ich reich bin, würde ich reisen.', 'For an unreal hypothesis: Konjunktiv II, wäre. 💭'], ['Wenn ich reich wäre, ich würde reisen.', 'After the subordinate clause, the verb comes straight away: würde ich. 🔄'], ['Wenn ich wäre reich, würde ich reisen.', 'In the subordinate clause, the verb goes to the end: reich wäre. 🏁']], 'Konjunktiv II: wäre, hätte, würde + infinitive.'],
    ['“The house is being built” (passive):', 'Das Haus wird gebaut.', [['Das Haus ist bauen.', 'The passive is made with “werden” + past participle. 🏗️'], ['Das Haus wird bauen.', 'That’s a future: the house is going to build. Talented house. 🏠'], ['Das Haus wird gebaute.', 'The participle takes no ending here. 🧱']], 'Passive: werden + past participle.'],
    ['“The man who lives here”:', 'der Mann, der hier wohnt', [['der Mann, der wohnt hier', 'In a relative clause, the verb goes to the end. 🏠'], ['der Mann, die hier wohnt', 'That article is feminine or plural. Mann is masculine: der. 👨'], ['der Mann, was hier wohnt', '“was” is used after “alles”, “etwas”… not after a noun. 🧩']], 'Relative pronoun = definite article; verb at the end of the relative clause.'],
    ['False friend: “bekommen” means:', 'to receive, to get', [['to become', 'To become is “werden”. A classic trap! 🎭'], ['to begin', 'To begin is “beginnen” or “anfangen”. ▶️'], ['to understand', 'To understand is “verstehen”. 🧠']], 'Ich bekomme ein Geschenk = I get a present.'],
    ['False friend: “das Gymnasium” is:', 'a secondary school leading to the Abitur', [['a gym', 'A gym is “Turnhalle”. 🏋️'], ['a hospital', 'A hospital is “das Krankenhaus”. 🏥'], ['gymnastics', 'Gymnastics is “das Turnen”. 🤸']], 'Gymnasium: the school that leads to the Abitur, the German school-leaving exam.']
  ];
  Q['lallemand/de-revisions'] = DE_BASES.concat(DE_COLLEGE);
})(window.MATIERES_LANGUES.en);
