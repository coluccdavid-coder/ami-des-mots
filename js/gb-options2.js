// Ami des mots — v6.3 : les mêmes matières que le programme français, version anglaise.
// Langues (Spanish, German : nouveau GCSE 2026 + A level), Philosophy, Politics, Sociology (A level),
// et après le A level (« University ») : Medicine (avec le UCAT), Law (avec le LNAT), Astrophysics.
(function(){
  'use strict';
  const E = window.ENGLAND; if(!E) return;
  const { ent, un, nb, Q } = E.outils;
  if(!E.NIVEAUX.includes('Uni')){ E.NIVEAUX.push('Uni'); E.NOMS.Uni = 'University'; E.ETAPES.Uni = 'After A level'; }
  const C = (id, nom, dom, niv, banque, gen) => ({ id, nom, dom, niv, banque, gen });
  // ───────── Spanish ─────────
  E.ajouter({ id:'gb-spanish', nom:'Spanish (MFL)', ic:'🇪🇸', sous:'GCSE Spanish (new 2026 exams) and A level', examens:{ Y11:'GCSE-style quiz', Y13:'A level-style quiz' }, chapitres:[
    C('es-basics', 'Greetings, numbers & everyday life', 'KS3 Spanish', ['Y7', 'Y8', 'Y9'], [
      ['How do you say “I am thirteen”?', 'Tengo trece años.', [['Soy trece años.', 'In Spanish you HAVE your age: tener.'], ['Estoy trece años.', 'Estar is for states and places.']], 'Age uses tener.'],
      ['“¿Cómo te llamas?” means…', 'What is your name?', [['How are you?', 'That is ¿Cómo estás?'], ['Where do you live?', 'That is ¿Dónde vives?']], 'Me llamo… = my name is…'],
      ['“Cincuenta” is…', '50', [['15', 'That is quince.'], ['500', 'That is quinientos.']], 'cuarenta 40, cincuenta 50, sesenta 60.'],
      ['Which is feminine?', 'la casa', [['el libro', 'El = masculine.'], ['el perro', 'Masculine dog. Woof.']], 'Learn nouns with el/la.'],
      ['“Me gusta el chocolate” means…', 'I like chocolate', [['I am chocolate', 'Plumo is impressed, but no.'], ['I want chocolate', 'That would be quiero.']], 'gustar: “it pleases me”.'],
      ['“Los lunes” means…', 'on Mondays', [['the moons', 'Clever, but lunes is Monday.'], ['in the morning', 'That is por la mañana.']], 'Days have no capital letter in Spanish.'],
      ['“Hace calor” means…', 'it is hot', [['it is cold', 'That is hace frío.'], ['it is raining', 'That is llueve.']], 'Weather often uses hacer.'],
      ['“Mi hermano es alto” means…', 'My brother is tall', [['My brother is old', 'Old is mayor or viejo.'], ['My brother is at home', 'That would be está en casa.']], 'Ser for descriptions.']]),
    C('es-grammar', 'Ser & estar, tenses', 'Grammar', ['Y8', 'Y9', 'Y10', 'Y11', 'Y12', 'Y13'], [
      ['“Madrid ___ en España.”', 'está', [['es', 'Location uses estar.'], ['hay', 'Hay = there is.']], 'Estar: location and temporary states.'],
      ['“Mi madre ___ profesora.”', 'es', [['está', 'Jobs use ser.'], ['tiene', 'No.']], 'Ser: identity, jobs, nationality.'],
      ['Preterite of “hablar” (yo)?', 'hablé', [['hablaba', 'That is the imperfect.'], ['hablo', 'That is the present.']], 'Preterite: completed actions.'],
      ['“Ayer ___ al cine.” (ir, yo)', 'fui', [['iba', 'Ayer + single completed action → preterite.'], ['voy', 'Present.']], 'Ir and ser share the preterite: fui, fuiste, fue…'],
      ['“Cuando era pequeño, ___ al fútbol.” (jugar)', 'jugaba', [['jugué', 'Repeated past habit = imperfect.'], ['juego', 'Present.']], 'Imperfect for “used to”.'],
      ['Near future: “Voy a ___ mis deberes.”', 'hacer', [['hago', 'After “voy a”, use the infinitive.'], ['hice', 'That is the past.']], 'ir + a + infinitive.'],
      ['“Si tuviera dinero, ___ un coche.” (comprar)', 'compraría', [['compraré', 'After si + imperfect subjunctive → conditional.'], ['compro', 'Present.']], 'Si + imperfect subjunctive, then conditional.'],
      ['“Quiero que tú ___ conmigo.” (venir)', 'vengas', [['vienes', 'Querer que + present subjunctive.'], ['venir', 'A conjugated verb is needed.']], 'Wishes trigger the subjunctive.']]),
    C('es-gcse', 'GCSE themes & the new 2026 exams', 'GCSE', ['Y10', 'Y11'], [
      ['“Me llevo bien con mi hermana” means…', 'I get on well with my sister', [['I carry my sister', 'Llevarse bien = to get on well.'], ['I look like my sister', 'That is me parezco a.']], 'Relationships theme.'],
      ['“El medio ambiente” is…', 'the environment', [['half time', 'Medio can mean half, but here: environment.'], ['the weather', 'That is el tiempo.']], 'Environment theme.'],
      ['“Los deberes” are…', 'homework', [['duties at home only', 'It means homework.'], ['holidays', 'Holidays are las vacaciones.']], 'School theme.'],
      ['Which new task is in the new GCSE listening paper?', 'dictation', [['a song', 'Plumo is disappointed too.'], ['a drawing', 'No.']], 'First exams of the new specification: 2026.'],
      ['In the speaking test, one task is…', 'reading aloud a short text', [['dancing', 'No.'], ['a written essay', 'That is the writing paper.']], 'Then answering questions.'],
      ['How do you pronounce the Spanish “j” in “jamón”?', 'like a throaty h', [['like English j', 'Spanish j is a breathy sound.'], ['silent', 'That is the h.']], 'Sound–symbol correspondences matter for dictation.'],
      ['“He visitado Barcelona” uses…', 'the perfect tense', [['the future', 'No.'], ['the imperfect', 'No.']], 'haber + past participle.'],
      ['“Quisiera ser médico” means…', 'I would like to be a doctor', [['I was a doctor', 'Quisiera is conditional-like politeness.'], ['I want a doctor', 'Ser = to be.']], 'Future plans theme.']]),
    C('es-alevel', 'A level: Hispanic society & culture', 'A level', ['Y12', 'Y13'], [
      ['Who painted “Guernica” (1937)?', 'Pablo Picasso', [['Frida Kahlo', 'She was Mexican, and painted self-portraits.'], ['Salvador Dalí', 'Dalí painted melting clocks.']], 'A response to the bombing of Guernica in the Spanish Civil War.'],
      ['When did Spain return to democracy after Franco?', 'after 1975', [['1936', 'The Civil War began then.'], ['1492', 'Far too early.']], 'The 1978 Constitution.'],
      ['Who wrote “Cien años de soledad”?', 'Gabriel García Márquez', [['Federico García Lorca', 'Lorca was a Spanish poet and playwright.'], ['Isabel Allende', 'She wrote La casa de los espíritus.']], 'Magical realism, Colombia (1967).'],
      ['“El Día de los Muertos” is celebrated mainly in…', 'Mexico', [['Spain', 'Mainly Mexico.'], ['Argentina', 'No.']], 'Remembering loved ones, early November.'],
      ['Spain’s co-official languages include…', 'Catalan, Basque and Galician', [['French and Italian', 'No.'], ['only Castilian', 'There are several.']], 'Regional identity theme.'],
      ['“La movida madrileña” was…', 'a cultural movement in 1980s Madrid', [['a football club', 'No.'], ['a dance from Argentina', 'That is the tango.']], 'Freedom after the dictatorship.'],
      ['Who directed “Volver” and “Todo sobre mi madre”?', 'Pedro Almodóvar', [['Guillermo del Toro', 'He directed El laberinto del fauno.'], ['Luis Buñuel', 'Older surrealist director.']], 'A level film study.'],
      ['Which Spanish city has the Alhambra?', 'Granada', [['Seville', 'Seville has the Alcázar.'], ['Bilbao', 'Bilbao has the Guggenheim.']], 'Moorish heritage.']])
  ]});
  // ───────── German ─────────
  E.ajouter({ id:'gb-german', nom:'German (MFL)', ic:'🇩🇪', sous:'GCSE German (new 2026 exams) and A level', examens:{ Y11:'GCSE-style quiz', Y13:'A level-style quiz' }, chapitres:[
    C('de-basics', 'Greetings, numbers & everyday life', 'KS3 German', ['Y7', 'Y8', 'Y9'], [
      ['How do you say “I am twelve”?', 'Ich bin zwölf Jahre alt.', [['Ich habe zwölf Jahre.', 'German uses sein, like English.'], ['Ich bin zwölf Jahr.', 'Jahre, plural.']], 'Ich bin … Jahre alt.'],
      ['“Wie heißt du?” means…', 'What is your name?', [['How old are you?', 'That is Wie alt bist du?'], ['Where do you live?', 'That is Wo wohnst du?']], 'Ich heiße… = my name is…'],
      ['“Einundzwanzig” is…', '21', [['12', 'That is zwölf.'], ['20', 'That is zwanzig.']], 'German says “one-and-twenty”.'],
      ['Which article goes with “Mädchen” (girl)?', 'das', [['die', 'Surprise: -chen words are neuter.'], ['der', 'No.']], 'Diminutives in -chen are always das.'],
      ['All German nouns start with…', 'a capital letter', [['a vowel', 'No.'], ['the letter D', 'No.']], 'der Hund, die Katze, das Haus.'],
      ['“Ich mag Fußball” means…', 'I like football', [['I play football', 'That is ich spiele.'], ['I watch football', 'That is ich sehe.']], 'mögen = to like.'],
      ['“Es regnet” means…', 'it is raining', [['it is snowing', 'That is es schneit.'], ['it is sunny', 'Sunny is “sonnig”.']], 'Weather.'],
      ['“Montag” is…', 'Monday', [['Sunday', 'That is Sonntag.'], ['Friday', 'That is Freitag.']], 'Days are masculine: der Montag.']]),
    C('de-grammar', 'Cases, word order & tenses', 'Grammar', ['Y8', 'Y9', 'Y10', 'Y11', 'Y12', 'Y13'], [
      ['In a main clause, the verb is…', 'the second idea', [['always last', 'Last is for subordinate clauses.'], ['always first', 'Only in questions or commands.']], 'Heute spiele ich Tennis.'],
      ['After “weil”, the verb goes…', 'to the end', [['second', 'Weil sends the verb to the end.'], ['first', 'No.']], '…, weil ich müde bin.'],
      ['Perfect tense of “spielen” (ich)?', 'ich habe gespielt', [['ich bin gespielt', 'Spielen takes haben.'], ['ich spielte', 'That is the simple past.']], 'haben + ge…t.'],
      ['Which verb takes “sein” in the perfect?', 'fahren', [['essen', 'Essen takes haben.'], ['kaufen', 'Haben.']], 'Movement and change: ich bin gefahren.'],
      ['The accusative of “der Hund” is…', 'den Hund', [['dem Hund', 'That is dative.'], ['des Hundes', 'That is genitive.']], 'Only masculine changes in the accusative: der → den.'],
      ['“Mit” is followed by…', 'the dative', [['the accusative', 'Mit always takes the dative.'], ['the genitive', 'No.']], 'aus, bei, mit, nach, seit, von, zu.'],
      ['“Ich würde gern nach Berlin fahren” means…', 'I would like to go to Berlin', [['I went to Berlin', 'Würde = would.'], ['I am going to Berlin', 'No.']], 'Conditional with würde.'],
      ['“Wenn ich reich wäre, …” uses…', 'Konjunktiv II', [['the perfect tense', 'No.'], ['the imperative', 'No.']], 'Hypothetical situations.']]),
    C('de-gcse', 'GCSE themes & the new 2026 exams', 'GCSE', ['Y10', 'Y11'], [
      ['“Ich verstehe mich gut mit meinem Vater” means…', 'I get on well with my dad', [['I understand my dad’s car', 'Sich verstehen mit = to get on with.'], ['I look like my dad', 'No.']], 'Relationships theme.'],
      ['“Die Umwelt” is…', 'the environment', [['the world', 'Welt alone is world.'], ['the weather', 'Das Wetter.']], 'Environment theme.'],
      ['“Die Hausaufgaben” are…', 'homework', [['housework', 'Close! Housework is Hausarbeit.'], ['holidays', 'Holidays are Ferien.']], 'School theme.'],
      ['How is German “w” pronounced?', 'like English v', [['like English w', 'Wasser sounds like “vasser”.'], ['silent', 'No.']], 'Useful for the new dictation task.'],
      ['How is “ei” pronounced, as in “drei”?', 'like “eye”', [['like “ee”', 'That is ie, as in vier.'], ['like “ay”', 'No.']], 'ei = eye, ie = ee.'],
      ['Which new task is in the new GCSE listening paper?', 'dictation', [['a song', 'No.'], ['a quiz show', 'No.']], 'First exams of the new specification: 2026.'],
      ['“Ich möchte Arzt werden” means…', 'I would like to become a doctor', [['I was a doctor', 'Möchte = would like.'], ['I need a doctor', 'No.']], 'Werden = to become.'],
      ['“Letztes Jahr bin ich nach Spanien gefahren” is in…', 'the perfect tense', [['the future', 'Letztes Jahr = last year.'], ['the present', 'No.']], 'sein + gefahren.']]),
    C('de-alevel', 'A level: German society & culture', 'A level', ['Y12', 'Y13'], [
      ['When did the Berlin Wall fall?', '9 November 1989', [['1961', 'That is when it was built.'], ['1945', 'That is the end of the war.']], 'Reunification: 3 October 1990.'],
      ['Germany’s capital since reunification is…', 'Berlin', [['Bonn', 'Bonn was West Germany’s capital.'], ['Munich', 'Munich is Bavaria’s capital.']], 'The government moved in 1999.'],
      ['Who wrote “Die Verwandlung” (The Metamorphosis)?', 'Franz Kafka', [['Goethe', 'Goethe wrote Faust.'], ['Bertolt Brecht', 'Brecht wrote plays like Mutter Courage.']], 'Published in 1915.'],
      ['Which film is about life in East Germany and the Stasi?', 'Das Leben der Anderen', [['Lola rennt', 'Lola rennt is set in 1990s Berlin.'], ['Metropolis', 'A 1927 science-fiction classic.']], '2006, Oscar winner.'],
      ['Austria’s capital is…', 'Vienna', [['Salzburg', 'Mozart’s birthplace, not the capital.'], ['Zurich', 'That is in Switzerland.']], 'Wien.'],
      ['“Die Energiewende” refers to…', 'Germany’s switch to renewable energy', [['a German dance', 'No.'], ['a car brand', 'No.']], 'Environment theme.'],
      ['Who was Germany’s first female chancellor?', 'Angela Merkel', [['Ursula von der Leyen', 'She leads the European Commission.'], ['Annalena Baerbock', 'She was foreign minister.']], 'Chancellor 2005–2021.'],
      ['“Die Wende” refers to…', 'the peaceful revolution of 1989', [['a weekend', 'That is das Wochenende.'], ['a type of bread', 'No.']], 'The changes that ended East Germany.']])
  ]});
  // ───────── Philosophy (A level) ─────────
  E.ajouter({ id:'gb-philosophy', nom:'Philosophy (A level)', ic:'🤔', sous:'Knowledge, ethics, God, mind', examens:{ Y13:'A level-style quiz' }, chapitres:[
    C('epistemology', 'Epistemology', 'A level Philosophy', ['Y12', 'Y13'], [
      ['Empiricists say knowledge comes mainly from…', 'experience', [['reason alone', 'That is rationalism.'], ['dreams', 'Descartes worried about dreams, but no.']], 'Locke, Hume.'],
      ['“I think, therefore I am” is from…', 'Descartes', [['Hume', 'Hume was an empiricist sceptic.'], ['Plato', 'Plato had the cave.']], 'Cogito ergo sum.'],
      ['The “tripartite” definition of knowledge is…', 'justified true belief', [['a guess that works', 'No.'], ['anything written down', 'No.']], 'Gettier cases challenge it.'],
      ['Gettier cases show that…', 'justified true belief may not be enough for knowledge', [['nobody knows anything', 'That is radical scepticism.'], ['beliefs are always false', 'No.']], 'Luck can make a belief true.'],
      ['Locke said the mind at birth is a…', 'tabula rasa (blank slate)', [['full library', 'He rejected innate ideas.'], ['computer', 'Wrong century.']], 'Concept empiricism.'],
      ['Direct realism says we perceive…', 'the world directly as it is', [['only sense-data', 'That is indirect realism.'], ['only ideas in God’s mind', 'That is Berkeley’s idealism.']], 'Theories of perception.'],
      ['Berkeley’s idealism says…', 'to be is to be perceived', [['nothing exists', 'No.'], ['matter is all that exists', 'The opposite.']], 'Esse est percipi.'],
      ['Hume’s fork divides knowledge into…', 'relations of ideas and matters of fact', [['good and evil', 'No.'], ['mind and body', 'No.']], 'A priori vs a posteriori.']]),
    C('ethics', 'Moral philosophy', 'A level Philosophy', ['Y12', 'Y13'], [
      ['Utilitarianism judges actions by…', 'their consequences for happiness', [['the agent’s intentions only', 'That is closer to Kant.'], ['what the law says', 'No.']], 'Bentham, Mill.'],
      ['Kant’s categorical imperative says…', 'act only on maxims you could will to be universal laws', [['do whatever makes you happy', 'No.'], ['follow your feelings', 'Kant puts reason first.']], 'Deontology.'],
      ['Aristotle’s ethics is based on…', 'virtue and character', [['rules only', 'That is deontology.'], ['pleasure only', 'That is hedonism.']], 'Eudaimonia: flourishing.'],
      ['The “golden mean” is…', 'a virtue between two vices', [['a type of gold', 'No.'], ['the average mark', 'No.']], 'Courage: between cowardice and recklessness.'],
      ['Mill distinguished higher and lower…', 'pleasures', [['taxes', 'No.'], ['animals', 'No.']], 'Better Socrates dissatisfied than a fool satisfied.'],
      ['Moral realism says moral facts…', 'exist independently of us', [['are just feelings', 'That is emotivism.'], ['do not exist', 'That is error theory.']], 'Meta-ethics.'],
      ['Emotivism (Ayer) says “stealing is wrong” expresses…', 'disapproval', [['a fact', 'Ayer says it is not a fact.'], ['a law', 'No.']], '“Boo to stealing!”'],
      ['Applied ethics includes…', 'questions about eating animals', [['proofs of God', 'That is philosophy of religion.'], ['theories of perception', 'That is epistemology.']], 'Also lying, theft, simulated violence.']]),
    C('god-mind', 'God and the mind', 'A level Philosophy', ['Y12', 'Y13'], [
      ['The ontological argument comes from…', 'the concept of God', [['the design of nature', 'That is the teleological argument.'], ['the first cause', 'That is cosmological.']], 'Anselm, Descartes.'],
      ['Paley’s watch analogy supports…', 'the design argument', [['the problem of evil', 'No.'], ['materialism', 'No.']], 'Complex design suggests a designer.'],
      ['The problem of evil asks…', 'why an all-good, all-powerful God allows suffering', [['why people tell lies', 'No.'], ['what time it is', 'No.']], 'Logical and evidential versions.'],
      ['Substance dualism says…', 'mind and body are different substances', [['only the body exists', 'That is physicalism.'], ['only the mind exists', 'That is idealism.']], 'Descartes.'],
      ['Functionalism defines mental states by…', 'what they do (their causal role)', [['what they are made of', 'No.'], ['their colour', 'No.']], 'Pain is whatever plays the pain role.'],
      ['Mary’s room (the knowledge argument) challenges…', 'physicalism', [['dualism', 'It supports dualism.'], ['utilitarianism', 'Wrong topic.']], 'Jackson: Mary learns what red looks like.'],
      ['Philosophical zombies are…', 'physically identical beings with no consciousness', [['monsters in films', 'Not these ones.'], ['very tired students', 'Plumo sympathises.']], 'A thought experiment about qualia.'],
      ['The cosmological argument is based on…', 'the existence of the universe needing a cause', [['the concept of God', 'That is ontological.'], ['morality', 'No.']], 'Aquinas’ Five Ways.']])
  ]});
  // ───────── Politics & Sociology (A level) ─────────
  E.ajouter({ id:'gb-politics', nom:'Politics (A level)', ic:'🗳️', sous:'UK politics, government, political ideas, US politics', examens:{ Y13:'A level-style quiz' }, chapitres:[
    C('uk-politics', 'UK politics & government', 'A level Politics', ['Y12', 'Y13'], [
      ['The UK constitution is mostly…', 'uncodified', [['written in one document', 'That is a codified constitution, like the USA.'], ['decided by the King alone', 'No.']], 'Statute law, conventions, common law, works of authority.'],
      ['Parliamentary sovereignty means…', 'Parliament can make or unmake any law', [['the PM decides everything', 'No.'], ['judges write laws', 'Judges interpret laws.']], 'A key principle (Dicey).'],
      ['Collective ministerial responsibility means ministers…', 'publicly support cabinet decisions', [['vote freely on everything', 'No.'], ['are elected by the public directly', 'They are appointed by the PM.']], 'Or resign.'],
      ['Devolution gave powers to…', 'Scotland, Wales and Northern Ireland', [['London boroughs only', 'No.'], ['the European Union', 'No.']], 'Since 1998–99.'],
      ['Which electoral system is used for the Scottish Parliament?', 'the Additional Member System', [['first past the post only', 'It mixes FPTP and lists.'], ['a lottery', 'No.']], 'AMS.'],
      ['A referendum is…', 'a direct vote by the public on a single issue', [['a vote by MPs only', 'No.'], ['a type of tax', 'No.']], 'e.g. 2016 EU referendum.'],
      ['The Supreme Court was created in…', '2009', [['1066', 'No.'], ['1998', 'That was the Human Rights Act.']], 'Constitutional Reform Act 2005.'],
      ['A pressure group differs from a party because it…', 'does not usually seek to form a government', [['never campaigns', 'It campaigns a lot.'], ['has no members', 'It has members.']], 'Insider and outsider groups.']]),
    C('ideas-us', 'Political ideas & US politics', 'A level Politics', ['Y12', 'Y13'], [
      ['Liberalism values above all…', 'individual freedom', [['tradition', 'That is conservatism.'], ['common ownership', 'That is socialism.']], 'Locke, Mill.'],
      ['Conservatism emphasises…', 'tradition and pragmatism', [['revolution', 'No.'], ['abolishing the state', 'That is anarchism.']], 'Burke, Oakeshott.'],
      ['Socialism emphasises…', 'equality and collectivism', [['individual property above all', 'No.'], ['monarchy', 'No.']], 'Marx, the Webbs.'],
      ['The US Constitution is…', 'codified and entrenched', [['uncodified', 'That is the UK.'], ['changed by the President alone', 'No.']], 'Amendments need supermajorities.'],
      ['How many US senators per state?', '2', [['1', 'Two each.'], ['depends on population', 'That is the House.']], '100 senators.'],
      ['Checks and balances in the US include…', 'the presidential veto', [['the King’s consent', 'Wrong country.'], ['no courts', 'The Supreme Court is a major check.']], 'Separation of powers.'],
      ['Who interprets the US Constitution?', 'the Supreme Court', [['the Senate', 'No.'], ['the President', 'No.']], 'Judicial review (Marbury v Madison, 1803).'],
      ['Feminism, nationalism and ecologism are…', 'optional political ideas in A level Politics', [['UK parties', 'They are ideologies.'], ['courts', 'No.']], 'Students study one.']])
  ]});
  E.ajouter({ id:'gb-sociology', nom:'Sociology (A level)', ic:'👥', sous:'Education, families, methods, crime', examens:{ Y13:'A level-style quiz' }, chapitres:[
    C('socio', 'Education, families & research methods', 'A level Sociology', ['Y12', 'Y13'], [
      ['Functionalists see society as…', 'a system where each part has a role', [['a battle between classes', 'That is Marxism.'], ['random chaos', 'No.']], 'Durkheim, Parsons.'],
      ['Marxists focus on…', 'class conflict', [['shared values', 'That is functionalism.'], ['weather', 'No.']], 'Bourgeoisie vs proletariat.'],
      ['The “hidden curriculum” is…', 'what school teaches without saying (values, obedience)', [['a secret exam', 'No.'], ['online lessons', 'No.']], 'Bowles and Gintis.'],
      ['A nuclear family is…', 'two parents and their children', [['a family that works at a power plant', 'Plumo smiles, but no.'], ['grandparents only', 'That is part of an extended family.']], 'Family diversity.'],
      ['Qualitative data is…', 'rich, descriptive information', [['only numbers', 'That is quantitative.'], ['always false', 'No.']], 'Interviews, observation.'],
      ['Positivists prefer…', 'quantitative, scientific methods', [['only personal stories', 'That is interpretivism.'], ['no research', 'No.']], 'Questionnaires, official statistics.'],
      ['Labelling theory (Becker) says…', 'being labelled can lead to deviance', [['labels on clothes matter', 'No.'], ['crime is genetic', 'No.']], 'Self-fulfilling prophecy.'],
      ['Feminists study…', 'gender inequality', [['only economics', 'No.'], ['the weather', 'No.']], 'e.g. domestic division of labour.']])
  ]});
  // ───────── University (« Uni ») : Medicine, Law, Astrophysics ─────────
  E.ajouter({ id:'gb-medicine', nom:'Medicine', ic:'🩺', sous:'Anatomy, physiology, medical school and the UCAT', examens:{ Uni:'Medicine quiz' }, chapitres:[
    C('anatomy', 'Anatomy & physiology', 'Medicine', ['Uni'], [
      ['How many bones in an adult human?', '206', [['300', 'Babies have about 300; some fuse.'], ['106', 'Too few.']], 'The femur is the longest.'],
      ['The largest organ of the body is…', 'the skin', [['the liver', 'Largest INTERNAL organ.'], ['the brain', 'No.']], 'About 2 m².'],
      ['Which valve stops backflow into the left atrium?', 'the mitral (bicuspid) valve', [['the tricuspid valve', 'That is on the right.'], ['the pulmonary valve', 'Between right ventricle and pulmonary artery.']], 'Heart valves.'],
      ['Normal resting heart rate for adults is about…', '60–100 beats per minute', [['10–20', 'Far too slow.'], ['200–250', 'Far too fast.']], 'Athletes can be lower.'],
      ['Which part of the brain coordinates balance?', 'the cerebellum', [['the cerebrum', 'Thinking and voluntary movement.'], ['the medulla', 'Breathing and heart rate.']], 'Brain regions.'],
      ['The kidneys mainly…', 'filter the blood and make urine', [['digest food', 'No.'], ['pump air', 'No.']], 'Nephrons.'],
      ['Normal body temperature is about…', '37 °C', [['30 °C', 'Too low: hypothermia.'], ['42 °C', 'Dangerously high.']], 'Homeostasis.'],
      ['Which cells carry oxygen?', 'red blood cells', [['platelets', 'They help clotting.'], ['neurones', 'They carry signals.']], 'Haemoglobin.']]),
    C('med-school', 'Medical school, ethics & the NHS', 'Medicine', ['Uni'], [
      ['How long is a standard UK medical degree?', '5 years (6 with an intercalated degree)', [['2 years', 'Much longer.'], ['10 years', 'Training continues, but the degree is shorter.']], 'Then the Foundation Programme.'],
      ['Which body registers doctors in the UK?', 'the General Medical Council (GMC)', [['the BBC', 'No.'], ['the Met Office', 'No.']], 'Good Medical Practice.'],
      ['The four pillars of medical ethics are…', 'autonomy, beneficence, non-maleficence, justice', [['speed, money, fame, luck', 'Plumo frowns.'], ['only autonomy', 'There are four.']], 'Beauchamp and Childress.'],
      ['“Non-maleficence” means…', 'do no harm', [['do lots of research', 'No.'], ['charge a fee', 'No.']], 'Primum non nocere.'],
      ['Gillick competence is about…', 'whether a young person can consent to treatment', [['passing exams', 'No.'], ['driving', 'No.']], 'Children under 16 who understand fully.'],
      ['Confidentiality can be broken when…', 'there is a serious risk to others', [['a friend asks', 'No.'], ['never, in any case', 'There are exceptions.']], 'GMC guidance.'],
      ['Work experience for medicine applicants helps show…', 'insight into the realities of caring for people', [['that you like hospitals’ food', 'Not quite.'], ['nothing', 'Universities value it.']], 'Volunteering in care settings counts.'],
      ['The NHS was founded in…', '1948', [['1848', 'Too early.'], ['1998', 'Too late.']], 'Free at the point of use.']]),
    C('ucat', 'The UCAT (admissions test)', 'Admissions', ['Uni'], [
      ['Which subtest was removed from the UCAT in 2025?', 'Abstract Reasoning', [['Verbal Reasoning', 'Still there.'], ['Situational Judgement', 'Still there.']], 'Now: Verbal Reasoning, Decision Making, Quantitative Reasoning, Situational Judgement.'],
      ['Each cognitive UCAT subtest is scored from…', '300 to 900', [['0 to 100', 'No.'], ['1 to 9', 'No.']], 'Total for the three: 900–2700.'],
      ['Situational Judgement tests…', 'how you would behave in realistic medical situations', [['your maths speed', 'That is Quantitative Reasoning.'], ['your memory of anatomy', 'No content knowledge needed.']], 'Reported in bands.'],
      ['A patient refuses treatment and has capacity. The doctor should…', 'respect the decision and explain the risks', [['treat them anyway', 'That breaks autonomy.'], ['ignore them', 'No.']], 'Autonomy.'],
      ['A drug dose is 5 mg/kg. The patient weighs 60 kg. Dose?', '300 mg', [['65 mg', 'Multiply, do not add.'], ['12 mg', 'That divides the wrong way.']], 'Quantitative Reasoning style.'],
      ['“All doctors are graduates. Sam is a graduate.” Can we conclude Sam is a doctor?', 'No', [['Yes', 'Not all graduates are doctors.'], ['Only on Tuesdays', 'Logic does not take days off.']], 'Decision Making: syllogisms.'],
      ['A colleague smells of alcohol before a shift. Most appropriate first step?', 'raise it with a senior colleague', [['say nothing', 'Patient safety comes first.'], ['post about it online', 'Never.']], 'SJT: patient safety.'],
      ['In Verbal Reasoning, “Can’t tell” means…', 'the passage does not give enough information', [['the answer is false', 'That is “False”.'], ['you skipped it', 'No.']], 'True / False / Can’t tell.']])
  ]});
  E.ajouter({ id:'gb-law', nom:'Law', ic:'⚖️', sous:'The English legal system, contract, tort, crime and the LNAT', examens:{ Uni:'Law quiz' }, chapitres:[
    C('legal-system', 'The English legal system', 'Law', ['Uni'], [
      ['The highest court in the UK is…', 'the Supreme Court', [['the Crown Court', 'It hears serious criminal trials.'], ['the High Court', 'Below the Court of Appeal.']], 'Then Court of Appeal, High Court…'],
      ['Precedent means…', 'courts follow earlier decisions of higher courts', [['the newest law wins', 'Not exactly.'], ['judges vote', 'No.']], 'Stare decisis.'],
      ['To become a solicitor in England today, you pass…', 'the SQE (Solicitors Qualifying Exam)', [['the UCAT', 'That is medicine.'], ['the bar exam of New York', 'Wrong country.']], 'Introduced from 2021.'],
      ['Barristers mainly…', 'represent clients in court and give specialist advice', [['only write wills', 'Solicitors often do that.'], ['arrest people', 'That is the police.']], 'Called to the Bar after training and pupillage.'],
      ['Statute law is made by…', 'Parliament', [['judges', 'Judges make case law.'], ['the police', 'No.']], 'Acts of Parliament.'],
      ['Civil cases are decided on…', 'the balance of probabilities', [['beyond reasonable doubt', 'That is criminal.'], ['a coin toss', 'No.']], 'Burden on the claimant.'],
      ['The Human Rights Act was passed in…', '1998', [['1215', 'That is Magna Carta.'], ['2016', 'No.']], 'Brings the ECHR into UK law.'],
      ['A jury is used mainly in…', 'the Crown Court', [['the Supreme Court', 'No juries there.'], ['parking tickets', 'No.']], 'Twelve jurors.']]),
    C('contract-tort-crime', 'Contract, tort & criminal law', 'Law', ['Uni'], [
      ['A contract needs offer, acceptance and…', 'consideration', [['a lawyer present', 'Not required.'], ['a photo', 'No.']], 'And intention to create legal relations.'],
      ['A shop window display is usually…', 'an invitation to treat', [['an offer', 'The customer makes the offer at the till.'], ['a gift', 'No.']], 'Fisher v Bell (1961).'],
      ['Donoghue v Stevenson (1932) is famous for…', 'establishing the modern law of negligence', [['a contract for cars', 'No.'], ['a criminal theft', 'No.']], 'The snail in the ginger beer bottle.'],
      ['Actus reus means…', 'the guilty act', [['the guilty mind', 'That is mens rea.'], ['the judge’s decision', 'No.']], 'Both are usually needed.'],
      ['Criminal cases must be proved…', 'beyond reasonable doubt', [['on the balance of probabilities', 'That is civil.'], ['by a vote of MPs', 'No.']], 'Burden on the prosecution.'],
      ['Theft is defined in the…', 'Theft Act 1968', [['Magna Carta', 'No.'], ['Highway Code', 'No.']], 'Dishonest appropriation of property belonging to another.'],
      ['A tort is…', 'a civil wrong', [['a cake', 'That is a torte. Plumo is hungry.'], ['a crime only', 'Torts are civil.']], 'Negligence, nuisance, defamation.'],
      ['Mens rea means…', 'the guilty mind', [['the guilty act', 'That is actus reus.'], ['a type of court', 'No.']], 'Intention or recklessness.']]),
    C('lnat', 'The LNAT (admissions test)', 'Admissions', ['Uni'], [
      ['How many multiple-choice questions are in LNAT Section A?', '42', [['100', 'Far fewer.'], ['10', 'More than that.']], '12 passages, 95 minutes.'],
      ['How long is the LNAT essay?', '40 minutes', [['3 hours', 'Much shorter.'], ['5 minutes', 'Too short.']], 'One question from three.'],
      ['Does the LNAT test legal knowledge?', 'No, it tests reading and reasoning', [['Yes, contract law', 'No legal knowledge needed.'], ['Yes, criminal law', 'No.']], 'Treat the passage as true.'],
      ['An argument’s “assumption” is…', 'an unstated premise it relies on', [['its conclusion', 'No.'], ['its title', 'No.']], 'Critical reasoning.'],
      ['A passage claims: “Crime fell after more street lights were installed, so lights reduce crime.” This assumes…', 'nothing else caused the fall', [['lights are expensive', 'Irrelevant.'], ['crime never happens in daylight', 'Too strong.']], 'Correlation is not causation.'],
      ['Which best weakens “Homework improves grades”?', 'Students with more homework already had higher grades before', [['Homework is boring', 'Opinion, not evidence.'], ['Some teachers like homework', 'Irrelevant.']], 'Alternative explanation.'],
      ['A strong LNAT essay…', 'takes a clear position and deals with counter-arguments', [['lists facts without a view', 'You need an argument.'], ['uses as many long words as possible', 'Clarity wins.']], 'Structure and balance.'],
      ['The LNAT score universities see from Section A is…', 'out of 42', [['out of 900', 'That is a UCAT subtest.'], ['a grade A*–E', 'No.']], 'The essay is marked by the universities.']])
  ]});
  E.ajouter({ id:'gb-astro', nom:'Astrophysics', ic:'🔭', sous:'Stars, galaxies, cosmology and astro calculations', examens:{ Uni:'Astrophysics quiz' }, chapitres:[
    C('stars-cosmos', 'Stars, galaxies & cosmology', 'Astrophysics', ['Y13', 'Uni'], [
      ['What powers the Sun?', 'nuclear fusion of hydrogen into helium', [['burning coal', 'It would have burnt out long ago.'], ['fission of uranium', 'That is in power stations.']], 'In the core.'],
      ['A light-year is a unit of…', 'distance', [['time', 'Despite the name!'], ['brightness', 'No.']], 'About 9.46 × 10¹⁵ m.'],
      ['Our galaxy is…', 'the Milky Way', [['Andromeda', 'Our neighbour.'], ['the Sun', 'A star, not a galaxy.']], 'A barred spiral galaxy.'],
      ['The universe is about … years old.', '13.8 billion', [['6000', 'No.'], ['4.6 billion', 'That is the Earth (and Sun).']], 'Big Bang.'],
      ['A very massive star ends as…', 'a neutron star or black hole', [['a white dwarf', 'That is for Sun-like stars.'], ['a planet', 'No.']], 'After a supernova.'],
      ['The cosmic microwave background is…', 'leftover radiation from the early universe', [['radiation from microwaves in kitchens', 'Plumo checked: no.'], ['sunlight', 'No.']], 'Evidence for the Big Bang.'],
      ['Hubble’s law says galaxies recede at speeds…', 'proportional to their distance', [['all equal', 'No.'], ['getting slower with distance', 'The opposite.']], 'v = H₀d.'],
      ['An exoplanet is…', 'a planet orbiting another star', [['a planet that left the Solar System', 'No.'], ['a dwarf planet', 'No.']], 'Found by transits and wobbles.']]),
    C('astro-calc', 'Astrophysics calculations', 'Astrophysics', ['Y13', 'Uni'], null, r => { const d = un(r, [4.2, 8.6, 25, 100]), z = un(r, [0.01, 0.02, 0.05]);
      return un(r, [() => Q('Light from a star ' + nb(d) + ' light-years away left it how long ago?', nb(d) + ' years', [[nb(d) + ' days', 'Light-years, not light-days: light takes a whole year per light-year.'], [nb(d / 2) + ' years', 'Light does not take shortcuts.']], 'A light-year is the distance light travels in one year.'),
        () => Q('A galaxy has redshift z = ' + z + '. Its recession speed v ≈ zc is about…', nb(z * 300000, 0) + ' km/s', [[nb(z * 3000, 0) + ' km/s', 'c ≈ 300,000 km/s.'], [nb(300000 / z, 0) + ' km/s', 'Faster than light? Plumo objects.']], 'v ≈ zc for small z.'),
        () => Q('If a star’s distance doubles, its apparent brightness becomes…', 'a quarter', [['half', 'Inverse SQUARE law.'], ['double', 'Further away = dimmer.']], 'Brightness ∝ 1/d².')])(); })
  ]});
  // v6.3 : les études pour travailler dans le spatial (NASA, ESA, UK Space Agency).
  E.trouver('gb-astro').chapitres.push(C('space-careers', 'Careers in space: NASA & ESA', 'Careers', ['Y11', 'Y12', 'Y13', 'Uni'], [
    ['To apply as a NASA astronaut, you must be…', 'a US citizen', [['any nationality', 'NASA astronaut jobs are for US citizens (dual citizens can apply).'], ['under 25', 'There is no official age limit.']], 'Europeans go through ESA, the European Space Agency.'],
    ['NASA’s basic degree requirement for astronauts is…', 'a master’s degree in a STEM field', [['any GCSEs', 'Much more study is needed.'], ['a driving licence', 'Plumo can’t drive either.']], 'Engineering, biological or physical science, computer science, maths (or equivalents such as a medical degree, PhD study or test pilot school).'],
    ['After the qualifying degree, NASA asks for at least…', '3 years of related professional experience', [['3 weeks', 'A bit more than a summer job.'], ['30 years', 'That would be a very late start.']], 'Pilots can count flight hours instead.'],
    ['Which agency selects astronauts for the UK?', 'ESA (European Space Agency)', [['NASA', 'NASA selects US citizens.'], ['the BBC', 'No rocket at the BBC.']], 'The UK is an ESA member; the UK Space Agency funds UK space work.'],
    ['Which British astronaut flew to the ISS in 2015–16?', 'Tim Peake', [['Neil Armstrong', 'An American, Moon 1969.'], ['Isaac Newton', 'Gravity, not rockets.']], 'ESA mission Principia.'],
    ['In 2022, ESA selected John McFall as…', 'the first “parastronaut”', [['a test pilot for planes only', 'No.'], ['ESA director', 'No.']], 'A study into flying astronauts with physical disabilities.'],
    ['Which A levels open the most doors to space careers?', 'maths and physics (plus another science or computing)', [['only art', 'Art is great, but engineering needs maths.'], ['none, you just apply', 'Degrees need A levels.']], 'Then a degree: aerospace engineering, physics, astrophysics, computer science, medicine…'],
    ['Most jobs in the space industry are…', 'engineers, scientists and technicians on the ground', [['astronauts', 'Only a handful of astronauts fly.'], ['shop assistants', 'No.']], 'Satellites, rockets, data, mission control.']]));
  // Programme officiel / repères pour les nouvelles matières.
  Object.assign(E.PROGRAMME || (E.PROGRAMME = {}), {
    'gb-spanish':[['Phonics, vocabulary and everyday language', 'KS3 · GCSE', ['es-basics', 'es-gcse']], ['Grammar and tenses', 'KS3 · GCSE · A level', ['es-grammar']], ['GCSE themes and the new 2026 papers', 'GCSE', ['es-gcse']], ['A level: society, culture, literature and film', 'A level', ['es-alevel']]],
    'gb-german':[['Phonics, vocabulary and everyday language', 'KS3 · GCSE', ['de-basics', 'de-gcse']], ['Grammar, cases and word order', 'KS3 · GCSE · A level', ['de-grammar']], ['GCSE themes and the new 2026 papers', 'GCSE', ['de-gcse']], ['A level: society, culture, literature and film', 'A level', ['de-alevel']]],
    'gb-philosophy':[['Epistemology', 'A level', ['epistemology']], ['Moral philosophy', 'A level', ['ethics']], ['Metaphysics of God and of mind', 'A level', ['god-mind']]],
    'gb-politics':[['UK politics and UK government', 'A level', ['uk-politics']], ['Political ideas and US/comparative politics', 'A level', ['ideas-us']]],
    'gb-sociology':[['Education, families, methods, crime and deviance', 'A level', ['socio']]],
    'gb-medicine':[['Anatomy and physiology', 'University', ['anatomy']], ['Medical school, ethics and the NHS', 'University', ['med-school']], ['Admissions: the UCAT', 'Before university', ['ucat']]],
    'gb-law':[['The English legal system and legal careers', 'University', ['legal-system']], ['Contract, tort and criminal law', 'University', ['contract-tort-crime']], ['Admissions: the LNAT', 'Before university', ['lnat']]],
    'gb-astro':[['Stars, galaxies and cosmology', 'A level option · University', ['stars-cosmos']], ['Astrophysics calculations', 'A level option · University', ['astro-calc']], ['Careers in space: NASA, ESA and the UK Space Agency', 'GCSE → University', ['space-careers']]]
  });
  // Examens blancs : GCSE langues, A level sciences humaines, et l'entrée à l'université (UCAT, LNAT).
  const P = (titre, duree, points, matiere, chapitres, n, niveau) => ({ titre, duree, points, matiere, chapitres, n, niveau });
  Object.assign(E.EXAMENS, {
    'gcse-spanish':{ titre:'GCSE Spanish (new 2026 exams)', ic:'🇪🇸', niveau:'Y11', note:'gcse-f9', papers:[P('Listening (with dictation)', '35–45 min', null, 'gb-spanish', ['es-gcse', 'es-basics'], 10, 'Y11'), P('Reading (with translation into English)', '45 min–1 h', null, 'gb-spanish', ['es-grammar', 'es-gcse'], 10, 'Y11')] },
    'gcse-german':{ titre:'GCSE German (new 2026 exams)', ic:'🇩🇪', niveau:'Y11', note:'gcse-f9', papers:[P('Listening (with dictation)', '35–45 min', null, 'gb-german', ['de-gcse', 'de-basics'], 10, 'Y11'), P('Reading (with translation into English)', '45 min–1 h', null, 'gb-german', ['de-grammar', 'de-gcse'], 10, 'Y11')] },
    'alevel-humanities':{ titre:'A level Philosophy · Politics · Sociology', ic:'🤔', niveau:'Y13', note:'alevel', papers:[P('Philosophy', '3 h per paper', null, 'gb-philosophy', [], 10, 'Y13'), P('Politics', '2 h per paper', null, 'gb-politics', [], 10, 'Y13'), P('Sociology', '2 h per paper', null, 'gb-sociology', [], 8, 'Y13')] },
    'uni-ucat':{ titre:'Medicine: UCAT-style practice', ic:'🩺', niveau:'Uni', note:'alevel', papers:[P('Reasoning (Verbal, Decision Making, Quantitative)', 'UCAT: just under 2 hours in total', null, 'gb-medicine', ['ucat'], 8, 'Uni'), P('Medicine knowledge (for interviews)', '—', null, 'gb-medicine', ['anatomy', 'med-school'], 10, 'Uni')] },
    'uni-lnat':{ titre:'Law: LNAT-style practice', ic:'⚖️', niveau:'Uni', note:'alevel', ecriture:true, papers:[P('Section A style: reasoning', 'LNAT: 42 questions in 95 min', null, 'gb-law', ['lnat'], 8, 'Uni'), P('Law knowledge (for interviews)', '—', null, 'gb-law', ['legal-system', 'contract-tort-crime'], 10, 'Uni')] }
  });
  E.OFFICIEL.programmes.push(['NASA: become an astronaut', 'https://www.nasa.gov/humans-in-space/astronauts/become-an-astronaut', 'Requirements: US citizen, STEM master’s, 3 years’ experience'], ['ESA: astronauts', 'https://www.esa.int/Science_Exploration/Human_and_Robotic_Exploration/Astronauts', 'Europe’s astronaut corps (the UK is a member)']);
  E.OFFICIEL.annales.push(['UCAT: official practice tests', 'https://www.ucat.ac.uk/', 'Medicine and dentistry admissions test'], ['LNAT: sample test and practice papers', 'https://lnat.ac.uk/', 'Law admissions test: 42 questions + essay']);
})();
