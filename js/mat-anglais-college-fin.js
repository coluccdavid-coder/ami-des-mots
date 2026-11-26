// Ami des mots — v6.55 : ANGLAIS du collège (langue vivante 1) — chaque leçon de la 6e à la 3e à 20 questions.
// Les leçons d'anglais sont écrites pour des francophones (consignes en français, réponses en anglais) : pas de traduction.
// Chargé avant js/themes.js.
(function(){
  'use strict';
  const M = window.MATIERES; if(!M) return;
  const A = (cid, l) => {
    const m = M.trouver('langlais'), c = m && m.chapitres.find(x => x.id === cid); if(!c || !Array.isArray(c.banque)) return;
    const n0 = c.banque.length, vus = new Set(c.banque.map(q => q[0]));
    for(const q of l) if(!vus.has(q[0])){ c.banque.push(q); vus.add(q[0]); }
    if(c.nivQ) c.nivQ = c.banque.map((_, i) => i < n0 ? c.nivQ[i] : c.niv.slice());
  };
  const Q = (q, bon, f1, v1, f2, v2, f3, v3, r) => [q, bon, [[f1, v1], [f2, v2], [f3, v3]], r];

  // ═════════ 6e ═════════
  A('be-have', [
    Q('Complète : « My parents ___ at work. »', 'are', 'is', 'Deux personnes : pluriel ! 👫', 'am', '« am », c’est seulement avec I. 🙋', 'has', 'Ici, il faut be, pas have. 🔄', 'They (my parents) → are.'),
    Q('« Il a dix ans » se dit :', 'He is ten.', 'He has ten.', 'Piège classique : l’âge se dit avec be ! 🎂', 'He have ten years.', 'Deux fautes en une phrase, joli record. 😏', 'He ten years.', 'Il manque le verbe. 🕳️', 'En anglais, on « est » son âge : I am ten, he is ten.')
  ]);
  A('present', [
    Q('Complète : « My brother ___ to music every day. » (listen)', 'listens', 'listen', 'He, she, it : n’oublie pas le -s ! 🐍', 'listening', 'Il manque be, et ce n’est pas le bon temps. ⏱️', 'is listen', 'Mélange de deux temps. 🌀', 'Présent simple, 3e personne du singulier : verbe + -s.'),
    Q('Complète : « ___ your friends live near here? »', 'Do', 'Does', '« Does », c’est pour he, she, it. 🔍', 'Are', 'Avec un verbe d’action au présent simple, c’est do. 🛠️', 'Is', 'Non. ❌', 'Question au présent simple : Do + sujet pluriel + verbe.')
  ]);
  A('there', [
    Q('« Il n’y a pas de lait » se dit :', 'There isn’t any milk.', 'There aren’t any milk.', '« milk » est singulier (indénombrable). 🥛', 'There isn’t some milk.', 'Dans une négation, on met any. 🔄', 'It hasn’t milk.', 'Pour « il y a », c’est there is. 🏠', 'Milk est indénombrable : There isn’t any milk.'),
    Q('« Devant la maison » se dit :', 'in front of the house', 'behind the house', 'Ça, c’est derrière. 🔙', 'opposite of the house', '« opposite » veut dire « en face », sans « of ». 🔄', 'before the house', '« before » marque surtout le temps. ⏰', 'in front of = devant ; behind = derrière.'),
    Q('Complète : « Is there a cinema ___ your town? »', 'in', 'on', 'On est DANS une ville. 🏙️', 'at', 'Pour une ville entière, c’est in. 🗺️', 'under', 'Le cinéma n’est pas sous la ville ! 😄', 'in + ville ou pays.'),
    Q('Comment demande-t-on « Combien de fenêtres y a-t-il ? »', 'How many windows are there?', 'How much windows are there?', '« windows » se compte : many. 🔢', 'How many windows there are?', 'Dans la question, are passe avant there. 🔄', 'How many windows is there?', 'Pluriel → are. 👥', 'How many + nom pluriel + are there?')
  ]);
  A('can', [
    Q('« Il ne peut pas venir ce soir » se dit :', 'He can’t come tonight.', 'He doesn’t can come tonight.', 'Can se débrouille seul, pas besoin de do. 💪', 'He can’t to come tonight.', 'Après can, pas de « to ». 🚫', 'He cans’t come tonight.', 'Can ne prend jamais de -s. 🐍', 'Can + verbe sans to ; négation can’t.'),
    Q('« Lavez-vous les mains ! » se dit :', 'Wash your hands!', 'You wash your hands!', 'À l’impératif, pas de sujet. 🗣️', 'Washing your hands!', 'L’impératif prend la base verbale. 🔤', 'To wash your hands!', 'Pas de to à l’impératif. 🚫', 'Impératif = verbe à la base, sans sujet.'),
    Q('Que signifie « Can I go to the toilet, please? » ?', 'Est-ce que je peux aller aux toilettes, s’il vous plaît ?', 'Je sais aller aux toilettes.', 'C’est une demande, pas une démonstration. 😄', 'Va aux toilettes !', 'C’est une question polie. ❓', 'Où sont les toilettes ?', 'Ça, ce serait « Where is the toilet? ». 🗺️', 'Can I…? sert à demander la permission.'),
    Q('Complète : « ___ be late for school! » (interdiction)', 'Don’t', 'Not', 'L’impératif négatif commence par Don’t. 🚫', 'No', 'Non. ❌', 'Doesn’t', 'Pas de 3e personne à l’impératif. 🗣️', 'Impératif négatif : Don’t + verbe.')
  ]);
  A('poss', [
    Q('« L’anniversaire de ma sœur » se dit :', 'my sister’s birthday', 'the birthday of my sister', 'Compréhensible, mais pour une personne on préfère ’s. 👧', 'my sisters birthday', 'Il manque l’apostrophe. ✏️', 'my sister birthday’s', 'L’apostrophe est mal placée. 🔀', 'Possesseur + ’s + chose possédée.'),
    Q('Complète : « Lucy loves ___ dog. »', 'her', 'his', '« his », c’est pour un garçon. 👦', 'its', '« its », c’est pour un objet ou un animal. 🐾', 'their', 'Lucy est seule. 🙋‍♀️', 'Possesseur féminin → her.'),
    Q('Complète : « These seats are ___. » (à nous)', 'ours', 'our', '« our » est suivi d’un nom. 📝', 'us', '« us » est un pronom complément. 🔄', 'our’s', 'Pas d’apostrophe dans ours. ✏️', 'Pronoms possessifs : mine, yours, his, hers, ours, theirs.'),
    Q('« Les jouets des enfants » se dit :', 'the children’s toys', 'the childrens’ toys', '« children » est déjà pluriel sans s : on ajoute ’s. 👶', 'the children toys', 'Il manque le ’s. ✏️', 'the toys’s children', 'L’ordre est inversé. 🔀', 'Pluriel irrégulier (children, men, women) + ’s.')
  ]);
  A('vocab6', [
    Q('Comment dit-on « dimanche » ?', 'Sunday', 'Saturday', 'Ça, c’est samedi. 📅', 'Monday', 'Ça, c’est lundi. 📅', 'Sundae', 'Ça, c’est une glace ! 🍨', 'Les jours prennent une majuscule en anglais : Sunday.'),
    Q('Comment dit-on « douze » ?', 'twelve', 'twenty', 'Ça, c’est vingt. 🔢', 'eleven', 'Ça, c’est onze. 🔢', 'twelf', 'Presque ! Il manque le -ve. ✏️', 'eleven (11), twelve (12), thirteen (13).')
  ]);
  A('cours-a6', [
    Q('« Comment t’appelles-tu ? » se dit :', 'What’s your name?', 'How are you called?', 'C’est du mot à mot. 🤖', 'Who is your name?', 'Pour un nom, on dit What. 🔍', 'What your name?', 'Il manque le verbe. 🕳️', 'What’s your name? — My name’s…'),
    Q('« J’ai deux sœurs » se dit :', 'I have got two sisters.', 'I am two sisters.', 'Tu n’es pas deux sœurs ! 😄', 'I has got two sisters.', 'Avec I : have. ✏️', 'I have got two sister.', 'Deux sœurs : pluriel, avec -s. 👭', 'have got pour la famille et ce qu’on possède.'),
    Q('Complète : « She ___ to school by bus. » (go)', 'goes', 'go', 'Avec she, le verbe prend -es. 🐍', 'gos', 'Après o, on ajoute -es. ✏️', 'going', 'Il manque be, et ce n’est pas une habitude. ⏱️', 'go → goes, do → does à la 3e personne.'),
    Q('« Il est sept heures » se dit :', 'It’s seven o’clock.', 'It’s seven hours.', 'Pour l’heure, on dit o’clock. 🕖', 'He is seven o’clock.', 'Pour l’heure, le sujet est it. ⏰', 'It’s seven past.', 'Il manque de quoi. 🕳️', 'Heure pile : It’s … o’clock.'),
    Q('Comment dit-on « la salle de bains » ?', 'the bathroom', 'the bedroom', 'Ça, c’est la chambre. 🛏️', 'the living room', 'Ça, c’est le salon. 🛋️', 'the garden', 'Ça, c’est le jardin. 🌳', 'bathroom = salle de bains.'),
    Q('Quel mot interrogatif demande « qui » ?', 'Who', 'What', '« What », c’est « quoi ». ❓', 'Where', '« Where », c’est « où ». 📍', 'When', '« When », c’est « quand ». ⏰', 'Who is he? — He’s my brother.'),
    Q('Que signifie « I don’t like Mondays » ?', 'Je n’aime pas les lundis.', 'J’aime les lundis.', 'Il y a don’t : c’est négatif. 🚫', 'Je n’aime pas le dimanche.', 'Monday, c’est lundi. 📅', 'Je ne travaille pas le lundi.', 'Like veut dire aimer. ❤️', 'don’t + verbe = négation au présent simple.'),
    Q('Comment dit-on « mon grand-père » ?', 'my grandfather', 'my great father', '« great » veut dire génial. 😎', 'my old father', 'Ce serait « mon vieux père ». 😄', 'my grandmother', 'Ça, c’est la grand-mère. 👵', 'grandfather / grandmother, grandparents.')
  ]);
  A('ang-gram6', [
    Q('« Je veux jouer » se dit :', 'I want to play.', 'I want play.', 'Après want, il faut to. ➡️', 'I want playing.', 'Après want, c’est to + verbe. ➡️', 'I wants to play.', 'Avec I, pas de -s. ✏️', 'want to + verbe.'),
    Q('Pluriel de « that car » :', 'those cars', 'these cars', '« these » désigne des choses proches. 👉', 'thats cars', 'That devient those au pluriel. ✏️', 'that cars', 'Il faut accorder that. 🔄', 'this → these (près), that → those (loin).'),
    Q('Complète : « Can you help ___ ? » (moi)', 'me', 'I', '« I » est sujet ; après un verbe, c’est me. 🔄', 'my', '« my » est suivi d’un nom. 📝', 'mine', '« mine » veut dire « le mien ». 🎁', 'Pronoms compléments : me, you, him, her, it, us, them.'),
    Q('Quel mot interrogatif demande « comment » ?', 'How', 'Why', '« Why », c’est « pourquoi ». 🤔', 'Who', '« Who », c’est « qui ». 👤', 'What', '« What », c’est « quoi ». ❓', 'How are you? How do you spell it?'),
    Q('« Ce film est très drôle » se dit :', 'This film is very funny.', 'This film is too funny.', '« too » veut dire « trop ». ⚠️', 'This film is very fun.', '« fun » veut dire amusant, mais pour un film qui fait rire, on dit funny. 😂', 'This film very funny.', 'Il manque is. 🕳️', 'very = très ; too = trop.'),
    Q('« Pourquoi es-tu triste ? » se dit :', 'Why are you sad?', 'Why you are sad?', 'Dans la question, are passe avant you. 🔄', 'How are you sad?', '« How », c’est « comment ». ❓', 'Because are you sad?', '« Because », c’est la réponse ! 💡', 'Why…? — Because…'),
    Q('Pluriel de « woman » :', 'women', 'womans', 'Pluriel irrégulier ! ✏️', 'womens', 'Pas de s en plus. ✏️', 'woman', 'Ça, c’est le singulier. 1️⃣', 'man → men, woman → women.'),
    Q('Complète : « I like ___ » (eux)', 'them', 'they', '« they » est sujet. 🔄', 'their', '« their » est suivi d’un nom. 📝', 'theirs', '« theirs » veut dire « le leur ». 🎁', 'they → them en complément.'),
    Q('« Il voudrait un sandwich » se dit :', 'He would like a sandwich.', 'He woulds like a sandwich.', 'Would ne prend jamais de -s. 🐍', 'He would likes a sandwich.', 'Après would, verbe sans -s. ✏️', 'He wants like a sandwich.', 'Mélange de deux formules. 🌀', 'would like = voudrait (plus poli que want).'),
    Q('Que veut dire « It’s too cold » ?', 'Il fait trop froid.', 'Il fait très froid.', 'Too = trop, very = très. ⚖️', 'Il fait froid aussi.', '« too » en fin de phrase peut vouloir dire « aussi », mais pas ici. 🔍', 'Il fait deux fois plus froid.', 'Ce n’est pas « two » ! 2️⃣', 'too + adjectif = trop.'),
    Q('Comment dit-on « ces chaussures-là » (au loin) ?', 'those shoes', 'these shoes', '« these », c’est tout près. 👉', 'that shoes', 'Shoes est pluriel → those. 👟', 'this shoes', 'Shoes est pluriel. 👟', 'those + pluriel, pour ce qui est loin.'),
    Q('« Je n’aime pas ça » se dit :', 'I don’t like it.', 'I not like it.', 'Il faut don’t. 🚫', 'I doesn’t like it.', 'Avec I : don’t. ✏️', 'I don’t like.', 'Like a besoin d’un complément : it. 🔗', 'I don’t like it / that.')
  ]);

  // ═════════ 5e ═════════
  A('continu', [
    Q('Complète : « Be quiet! The baby ___. » (sleep)', 'is sleeping', 'sleeps', 'C’est en ce moment : be + -ing. ⏱️', 'is sleep', 'Il manque le -ing. ✏️', 'sleeping', 'Il manque is. 🕳️', 'En ce moment : be + verbe-ing.'),
    Q('Forme en -ing de « dance » :', 'dancing', 'danceing', 'Le e final tombe. ✂️', 'dancting', 'Non. ❌', 'danceng', 'Il manque le i. ✏️', 'Verbe en -e : on enlève le e puis -ing.'),
    Q('Question : « Que regardes-tu ? » (en ce moment)', 'What are you watching?', 'What do you watching?', 'Au présent en be + -ing, la question se fait avec be. 🔄', 'What you are watching?', 'Are passe devant you. 🔄', 'What are you watch?', 'Il manque le -ing. ✏️', 'Question : (Wh-) + be + sujet + verbe-ing.'),
    Q('Quel verbe ne s’emploie normalement pas avec -ing ?', 'know', 'play', 'On dit très bien « I’m playing ». 🎮', 'read', 'On dit « I’m reading ». 📖', 'run', 'On dit « I’m running ». 🏃', 'Les verbes d’état (know, like, want, believe) restent au présent simple.')
  ]);
  A('preterit', [
    Q('Prétérit de « take » :', 'took', 'taked', 'Verbe irrégulier ! ✏️', 'taken', 'C’est le participe passé. 🔄', 'tooked', 'Un seul « prétérit » suffit. ✂️', 'take – took – taken.'),
    Q('Complète : « We ___ a great time last weekend. » (have)', 'had', 'haved', 'Have est irrégulier. ✏️', 'has', 'C’est le présent. ⏱️', 'did have', 'Dans une phrase affirmative, on dit simplement had. ✂️', 'have – had – had.')
  ]);
  A('compar', [
    Q('Comparatif de « happy » :', 'happier', 'more happy', 'Adjectif court en -y : -ier. ✏️', 'happyer', 'Le y devient i. ✏️', 'happiest', 'C’est le superlatif. 🏆', 'happy → happier → the happiest.'),
    Q('« Le plus petit de la classe » se dit :', 'the smallest in the class', 'the smaller of the class', 'Pour « le plus », on prend le superlatif -est. 🏆', 'the most small in the class', 'Adjectif court : -est. ✏️', 'smallest in the class', 'Il manque « the ». 🕳️', 'the + adjectif-est + in.'),
    Q('Complète : « My bag is ___ than yours. » (heavy)', 'heavier', 'more heavy', 'Adjectif en -y : -ier. ✏️', 'heavyer', 'Le y devient i. ✏️', 'heaviest', 'C’est le superlatif. 🏆', 'heavy → heavier than.'),
    Q('« Mon frère est aussi grand que mon père » se dit :', 'My brother is as tall as my dad.', 'My brother is as tall than my dad.', 'Avec as… as, pas de than. 🔄', 'My brother is so tall as my dad.', 'On dit as… as. ✏️', 'My brother is taller as my dad.', 'Mélange de deux structures. 🌀', 'Égalité : as + adjectif + as.')
  ]);
  A('quant', [
    Q('« Combien coûte ce livre ? » se dit :', 'How much is this book?', 'How many is this book?', 'Pour un prix, c’est How much. 💷', 'How much this book?', 'Il manque is. 🕳️', 'How cost this book?', 'Non. ❌', 'How much is it? = Combien ça coûte ?'),
    Q('Complète : « There are too ___ people here. »', 'many', 'much', 'People se compte : many. 👥', 'lot', 'Ce serait « a lot of ». ✏️', 'few', '« too few » veut dire « trop peu ». ⚖️', 'too many + dénombrable pluriel.'),
    Q('Lequel de ces noms est dénombrable ?', 'an apple', 'water', 'L’eau ne se compte pas en « une, deux ». 💧', 'money', 'On compte les pièces, pas « l’argent ». 💷', 'advice', 'Advice est indénombrable en anglais. 💡', 'Dénombrable : on peut mettre a/an et un pluriel.'),
    Q('« Quelqu’un a appelé » se dit :', 'Somebody called.', 'Anybody called.', 'Dans une phrase affirmative, c’est some-. ✅', 'Nobody called.', 'Ça veut dire « personne n’a appelé ». 🚫', 'Everybody called.', 'Ça veut dire « tout le monde ». 👥', 'somebody/someone = quelqu’un.')
  ]);
  A('culture', [
    Q('Quel est l’emblème floral de l’Angleterre ?', 'la rose', 'le chardon', 'C’est l’Écosse. 🏴', 'le trèfle', 'C’est l’Irlande. ☘️', 'la jonquille', 'C’est le pays de Galles. 🌼', 'Rose (Angleterre), chardon (Écosse), jonquille et poireau (pays de Galles), trèfle (Irlande).'),
    Q('Quelle est la capitale du Canada ?', 'Ottawa', 'Toronto', 'C’est la plus grande ville, pas la capitale. 🏙️', 'Montréal', 'Grande ville francophone, mais pas la capitale. 🍁', 'Vancouver', 'Non. 🌲', 'Ottawa est la capitale fédérale du Canada.'),
    Q('Quel animal figure souvent sur les symboles du pays de Galles ?', 'un dragon rouge', 'un lion bleu', 'Non. 🦁', 'un aigle', 'C’est plutôt les États-Unis. 🦅', 'un kangourou', 'C’est l’Australie. 🦘', 'Le dragon rouge (Y Ddraig Goch) est sur le drapeau gallois.'),
    Q('Que boit-on traditionnellement à 17 h au Royaume-Uni (« tea time ») ?', 'du thé', 'du café', 'Raté, c’est « tea time » ! ☕', 'du chocolat chaud', 'Non. 🍫', 'du jus d’orange', 'Non. 🍊', 'Le thé fait partie des traditions britanniques.')
  ]);
  A('cours-a5', [
    Q('« Que faisais-tu hier à 20 h ? » se dit :', 'What were you doing at 8 p.m. yesterday?', 'What did you doing at 8 p.m. yesterday?', 'Avec -ing au passé, on utilise was/were. 🔄', 'What were you do at 8 p.m. yesterday?', 'Il manque -ing. ✏️', 'What you were doing at 8 p.m. yesterday?', 'Were passe devant you. 🔄', 'Prétérit en be + -ing : was/were + verbe-ing.'),
    Q('Prétérit de « come » :', 'came', 'comed', 'Verbe irrégulier ! ✏️', 'come', 'C’est le participe passé (et le présent). 🔄', 'camed', 'Un seul « prétérit » suffit. ✂️', 'come – came – come.'),
    Q('« Il ne faut pas courir dans les couloirs » se dit :', 'You mustn’t run in the corridors.', 'You don’t have to run in the corridors.', 'Ça veut dire « tu n’es pas obligé de ». 🔄', 'You must run in the corridors.', 'C’est le contraire ! 🏃', 'You mustn’t to run in the corridors.', 'Pas de to après must. 🚫', 'mustn’t = interdiction.'),
    Q('« Le plus beau jour de ma vie » se dit :', 'the best day of my life', 'the goodest day of my life', 'Good est irrégulier : the best. ✏️', 'the better day of my life', 'C’est le comparatif. ⚖️', 'the most good day of my life', 'Good est irrégulier. ✏️', 'good → better → the best.'),
    Q('Complète : « I didn’t ___ the bus this morning. » (miss)', 'miss', 'missed', 'Après didn’t, le verbe reste à la base. 🔙', 'misses', 'Pas de -s après didn’t. ✏️', 'missing', 'Non. ❌', 'didn’t + base verbale.'),
    Q('« Il y a beaucoup de touristes à Londres » se dit :', 'There are a lot of tourists in London.', 'There is a lot of tourists in London.', 'Tourists est pluriel → are. 👥', 'There are much tourists in London.', 'Tourists se compte : many ou a lot of. 🔢', 'It has a lot of tourists in London.', 'Pour « il y a », c’est there are. 🏠', 'a lot of = beaucoup de, dans une phrase affirmative.'),
    Q('Quelle est la forme correcte au prétérit ?', 'She went to Scotland last year.', 'She goed to Scotland last year.', 'Go est irrégulier : went. ✏️', 'She go to Scotland last year.', 'Il faut le passé. ⏪', 'She has went to Scotland last year.', 'Mélange de deux temps. 🌀', 'go – went – gone.'),
    Q('« Est-ce que tu jouais dehors ? » (action en cours dans le passé)', 'Were you playing outside?', 'Did you playing outside?', 'Avec -ing, on prend were. 🔄', 'Was you playing outside?', 'Avec you : were. ✏️', 'Are you played outside?', 'Non. ❌', 'Were you + verbe-ing?')
  ]);
  A('ang-gram5', [
    Q('« Je suis allé à la plage » (hier) se dit :', 'I went to the beach yesterday.', 'I go to the beach yesterday.', 'Il faut le passé avec yesterday. ⏪', 'I goed to the beach yesterday.', 'Go est irrégulier. ✏️', 'I was go to the beach yesterday.', 'Non. ❌', 'Une action terminée à un moment précis du passé : prétérit.'),
    Q('Complète : « My cat is ___ than my dog. » (small)', 'smaller', 'more small', 'Adjectif court : -er. ✏️', 'smallest', 'C’est le superlatif. 🏆', 'the smaller', 'Pas de the avec than. ✂️', 'small → smaller than.'),
    Q('« Je dois faire mes devoirs » se dit :', 'I have to do my homework.', 'I have do my homework.', 'Il manque to. ➡️', 'I must to do my homework.', 'Pas de to après must. 🚫', 'I has to do my homework.', 'Avec I : have. ✏️', 'have to / must = obligation.'),
    Q('Complète : « How ___ money have you got? »', 'much', 'many', 'Money ne se compte pas en « un, deux ». 💷', 'lot', 'Non. ❌', 'more', 'Ce n’est pas une comparaison. ⚖️', 'How much + indénombrable.'),
    Q('« Que faisais-tu quand je t’ai appelé ? » se dit :', 'What were you doing when I called you?', 'What did you do when I was calling you?', 'Les rôles sont inversés. 🔀', 'What were you do when I called you?', 'Il manque -ing. ✏️', 'What you did when I called you?', 'La question est mal construite. 🔄', 'Action en cours (were + -ing) interrompue (prétérit).'),
    Q('« Le meilleur joueur de l’équipe » se dit :', 'the best player in the team', 'the better player in the team', 'C’est le comparatif. ⚖️', 'the goodest player in the team', 'Good est irrégulier. ✏️', 'the most good player in the team', 'Non. ❌', 'good → the best.'),
    Q('« Il n’a pas plu hier » se dit :', 'It didn’t rain yesterday.', 'It doesn’t rain yesterday.', 'Avec yesterday, c’est le passé. ⏪', 'It didn’t rained yesterday.', 'Après didn’t, le verbe reste à la base. 🔙', 'It wasn’t rain yesterday.', 'Non. ❌', 'didn’t + base verbale.'),
    Q('« Tu ne dois pas avoir peur » (conseil fort, interdiction) :', 'You mustn’t be afraid.', 'You don’t must be afraid.', 'Must se met seul à la négation : mustn’t. 🚫', 'You mustn’t to be afraid.', 'Pas de to après must. 🚫', 'You must not afraid.', 'Il manque be. 🕳️', 'mustn’t + base verbale.'),
    Q('Complète : « There isn’t ___ bread left. »', 'any', 'some', 'Dans une négation, on met any. 🔄', 'many', 'Bread ne se compte pas. 🍞', 'no', 'isn’t et no ensemble font une double négation. 🚫', 'not … any dans une phrase négative.'),
    Q('« Ce livre est plus intéressant que le film » se dit :', 'This book is more interesting than the film.', 'This book is interestinger than the film.', 'Adjectif long : more. ✏️', 'This book is more interesting that the film.', 'Après un comparatif, c’est than. 🔄', 'This book is the most interesting than the film.', 'Mélange comparatif et superlatif. 🌀', 'Adjectif long : more + adjectif + than.'),
    Q('Prétérit de « buy » :', 'bought', 'buyed', 'Verbe irrégulier ! ✏️', 'brought', 'C’est le prétérit de bring. 🔀', 'buy', 'C’est le présent. ⏱️', 'buy – bought – bought.')
  ]);
  A('ang-ru', [
    Q('Quel est le nom de la résidence officielle du roi à Londres ?', 'Buckingham Palace', 'Windsor Castle', 'C’est un autre château royal, hors de Londres. 🏰', '10 Downing Street', 'C’est la résidence du Premier ministre. 🚪', 'Tower Bridge', 'C’est un pont. 🌉', 'Buckingham Palace accueille la relève de la garde.'),
    Q('Qui dirige le gouvernement britannique ?', 'le Premier ministre', 'le roi', 'Le roi règne, mais ne gouverne pas. 👑', 'le président', 'Il n’y a pas de président au Royaume-Uni. 🏛️', 'le maire de Londres', 'Il ne dirige que Londres. 🏙️', 'Le Royaume-Uni est une monarchie parlementaire.'),
    Q('Quelle est la capitale du pays de Galles ?', 'Cardiff', 'Belfast', 'C’est l’Irlande du Nord. 🏴', 'Édimbourg', 'C’est l’Écosse. 🏴', 'Liverpool', 'C’est une ville d’Angleterre. ⚽', 'Cardiff est la capitale du pays de Galles.'),
    Q('Quelle est la capitale de l’Irlande du Nord ?', 'Belfast', 'Dublin', 'C’est la République d’Irlande. ☘️', 'Cardiff', 'C’est le pays de Galles. 🐉', 'Glasgow', 'C’est en Écosse. 🏴', 'Belfast est la capitale de l’Irlande du Nord.'),
    Q('Dans quel sens roule-t-on au Royaume-Uni ?', 'à gauche', 'à droite', 'Ça, c’est en France. 🚗', 'au milieu', 'Ça finirait mal ! 😅', 'ça dépend des jours', 'Non. 📅', 'Au Royaume-Uni, on roule à gauche.'),
    Q('Quel est le célèbre bus rouge de Londres ?', 'le bus à impériale (double-decker)', 'le tramway jaune', 'Non. 🚋', 'le métro', 'Le métro s’appelle the Underground (the Tube). 🚇', 'le taxi noir', 'C’est le black cab. 🚕', 'Le double-decker rouge est un symbole de Londres.'),
    Q('Comment s’appelle le métro de Londres ?', 'the Underground (the Tube)', 'the Subway', 'C’est le mot américain. 🇺🇸', 'the Metro', 'Non. 🚇', 'the Train', 'Non. 🚆', 'Le métro londonien, ouvert en 1863, est le plus ancien du monde.'),
    Q('Quel lac écossais est célèbre pour son « monstre » ?', 'le loch Ness', 'le lac Léman', 'C’est en Suisse et en France. 🇨🇭', 'le lac Windermere', 'C’est en Angleterre, sans monstre. 🦢', 'le lac Michigan', 'C’est aux États-Unis. 🇺🇸', 'Nessie, le monstre du loch Ness, est une légende célèbre.'),
    Q('Quel sport est né en Angleterre, dans la ville de Rugby ?', 'le rugby', 'le football américain', 'Il est né aux États-Unis. 🏈', 'le basket', 'Il est né aux États-Unis. 🏀', 'le hockey sur glace', 'Il s’est développé au Canada. 🏒', 'Le rugby porte le nom de l’école de Rugby, en Angleterre.'),
    Q('Quelle université anglaise est l’une des plus anciennes du monde anglophone ?', 'Oxford', 'Harvard', 'Elle est aux États-Unis, et plus récente. 🇺🇸', 'la Sorbonne', 'Elle est en France. 🇫🇷', 'Hollywood', 'Ce n’est pas une université ! 🎬', 'Oxford, puis Cambridge, sont des universités très anciennes.')
  ]);

  // ═════════ 4e ═════════
  A('pperfect', [
    Q('Participe passé de « write » (present perfect) : « She has ___ a letter. »', 'written', 'wrote', 'C’est le prétérit. 🔄', 'writed', 'Verbe irrégulier ! ✏️', 'writing', 'Après has, participe passé. 🔙', 'write – wrote – written.'),
    Q('Participe passé de « see » :', 'seen', 'saw', 'C’est le prétérit. 🔄', 'seed', 'Verbe irrégulier ! ✏️', 'seeing', 'C’est la forme en -ing. ⏱️', 'see – saw – seen.'),
    Q('Complète : « I have ___ my keys! » (lose)', 'lost', 'losed', 'Verbe irrégulier ! ✏️', 'lose', 'Après have, on met le participe passé. 🔙', 'losted', 'Non. ❌', 'lose – lost – lost.'),
    Q('Quelle phrase est correcte ?', 'She has lived in Paris since 2019.', 'She lives in Paris since 2019.', 'Depuis + action qui dure encore : present perfect. ⏳', 'She has lived in Paris for 2019.', 'Avec une date, c’est since. 📅', 'She lived in Paris since 2019.', 'Elle y vit encore : present perfect. ⏳', 'since + point de départ ; for + durée.'),
    Q('« As-tu déjà mangé des sushis ? » se dit :', 'Have you ever eaten sushi?', 'Did you ever ate sushi?', 'Expérience de vie : present perfect. 🍣', 'Have you never eaten sushi?', '« never » voudrait dire « jamais ». 🚫', 'Have you ever eat sushi?', 'Après have, participe passé : eaten. ✏️', 'Have you ever + participe passé?')
  ]);
  A('futur', [
    Q('Complète : « Don’t worry, I ___ tell anyone. » (promesse)', 'won’t', 'don’t', 'Une promesse pour plus tard : will. 🤞', 'am not going', 'Il manque to et c’est moins naturel pour une promesse. ✂️', 'wasn’t', 'C’est du passé. ⏪', 'Promesse : will / won’t.'),
    Q('Complète : « I ___ be fifteen next month. »', 'will', 'am', 'Next month : c’est l’avenir. ⏩', 'was', 'C’est du passé. ⏪', 'have', 'L’âge se dit avec be. 🎂', 'will + base verbale.'),
    Q('« Que vas-tu faire ce week-end ? » se dit :', 'What are you going to do this weekend?', 'What will you doing this weekend?', 'Après will, pas de -ing. ✏️', 'What do you going to do this weekend?', 'Avec going to, on utilise be. 🔄', 'What you are going to do this weekend?', 'Are passe devant you. 🔄', 'be going to = projet, intention.'),
    Q('« Il pleuvra peut-être demain » se dit :', 'It will probably rain tomorrow.', 'It probably rains tomorrow.', 'Pour une prévision, on met will. 🌧️', 'It will rains tomorrow.', 'Après will, pas de -s. ✏️', 'It is raining tomorrow probably.', 'Non. ❌', 'Prévision : will (+ probably).')
  ]);
  A('modaux', [
    Q('« Tu pourrais m’aider ? » (demande polie) se dit :', 'Could you help me?', 'Can you to help me?', 'Pas de to après can. 🚫', 'Must you help me?', 'C’est une obligation, pas une demande polie. ⚠️', 'Should you help me?', 'C’est un conseil. 💡', 'Could you…? est plus poli que Can you…?'),
    Q('Que signifie « She must be tired » ?', 'Elle doit être fatiguée (c’est sûrement le cas).', 'Elle a l’obligation d’être fatiguée.', 'Ici, must exprime une forte probabilité. 🔍', 'Elle n’est pas fatiguée.', 'Non. ❌', 'Elle était fatiguée.', 'C’est au présent. ⏱️', 'must peut exprimer une déduction : sûrement.'),
    Q('« Nous n’avons pas eu besoin de payer » se dit :', 'We didn’t have to pay.', 'We mustn’t pay.', 'Ça voudrait dire « interdit de payer ». 🚫', 'We hadn’t to pay.', 'Non : on utilise didn’t have to. ✏️', 'We don’t had to pay.', 'Non. ❌', 'Absence d’obligation au passé : didn’t have to.'),
    Q('Que signifie « You may leave now » ?', 'Vous pouvez partir maintenant.', 'Vous devez partir maintenant.', 'May donne une permission. 🔑', 'Vous partirez en mai.', 'Ce « may » n’est pas le mois ! 📅', 'Vous ne pouvez pas partir.', 'C’est l’inverse. 🔄', 'may = permission (ou possibilité).')
  ]);
  A('cours-a4', [
    Q('« Je suis déjà allé en Irlande » se dit :', 'I have already been to Ireland.', 'I already went to Ireland.', 'Expérience sans date : present perfect. ⏳', 'I have already go to Ireland.', 'Après have, participe passé. ✏️', 'I am already been to Ireland.', 'Non. ❌', 'have already + participe passé.'),
    Q('« Il dormait quand le téléphone a sonné » se dit :', 'He was sleeping when the phone rang.', 'He slept when the phone was ringing.', 'Les deux actions sont inversées. 🔀', 'He was sleep when the phone rang.', 'Il manque -ing. ✏️', 'He is sleeping when the phone rang.', 'C’est au passé. ⏪', 'Action en cours (was + -ing) interrompue (prétérit).'),
    Q('« Tu devrais demander à ton professeur » se dit :', 'You should ask your teacher.', 'You should to ask your teacher.', 'Pas de to après should. 🚫', 'You must asking your teacher.', 'Non. ❌', 'You would ask your teacher.', 'Ça veut dire « tu demanderais ». 🔄', 'should = conseil.'),
    Q('Complète : « I’ve known her ___ three years. »', 'for', 'since', 'Avec une durée, c’est for. ⏳', 'during', 'Avec le present perfect, on dit for. 🔄', 'ago', 'Ago va avec le prétérit. ⏪', 'for + durée ; since + point de départ.'),
    Q('« J’allais à l’école à pied quand j’étais petit » (habitude passée) :', 'I used to walk to school when I was little.', 'I use to walk to school when I was little.', 'Au passé : used to. ⏪', 'I was used to walk to school when I was little.', 'Ce n’est pas la bonne structure. 🔄', 'I used to walking to school when I was little.', 'Après used to : base verbale. ✏️', 'used to + verbe = habitude passée qui n’existe plus.'),
    Q('« Il n’a pas encore fini » se dit :', 'He hasn’t finished yet.', 'He didn’t finish already.', 'Pour « pas encore » : not … yet. ⏳', 'He hasn’t finish yet.', 'Il faut le participe passé : finished. ✏️', 'He has finished yet.', 'C’est l’inverse. 🔄', 'not … yet = pas encore.'),
    Q('« Il faut que tu te reposes » (obligation) :', 'You have to rest.', 'You has to rest.', 'Avec you : have. ✏️', 'You have rest.', 'Il manque to. ➡️', 'You must to rest.', 'Pas de to après must. 🚫', 'have to = obligation.'),
    Q('Quel mot de liaison exprime la cause ?', 'because', 'but', '« but » exprime l’opposition. ⚖️', 'so', '« so » exprime la conséquence. ➡️', 'then', '« then » exprime la suite. 🔜', 'because = parce que.')
  ]);
  A('ang-irl', [
    Q('Comment s’appelle la grande famine qui frappe l’Irlande au XIXe siècle ?', 'la Grande Famine (famine de la pomme de terre)', 'la guerre de Cent Ans', 'C’est une guerre franco-anglaise. ⚔️', 'la Grande Peste', 'C’est une épidémie du Moyen Âge. 🦠', 'la crise de 1929', 'C’est une crise économique. 📉', 'De 1845 à 1852, une maladie de la pomme de terre provoque famine et émigration massive.'),
    Q('Quelle est la couleur la plus associée à l’Irlande ?', 'le vert', 'le rouge', 'Non. 🔴', 'le bleu', 'Non. 🔵', 'le violet', 'Non. 🟣', 'L’Irlande est surnommée « l’île d’émeraude ».'),
    Q('Quel est le surnom de l’Irlande ?', 'l’île d’émeraude', 'la perfide Albion', 'C’est un surnom de l’Angleterre. 🇬🇧', 'le pays du Soleil levant', 'C’est le Japon. 🇯🇵', 'la Belle Province', 'C’est le Québec. 🍁', 'The Emerald Isle, pour ses paysages très verts.'),
    Q('Quel petit personnage du folklore irlandais garde un pot d’or au pied de l’arc-en-ciel ?', 'le leprechaun', 'le père Noël', 'Il habite au pôle Nord. 🎅', 'le lutin de Cornouailles', 'Non. 🧚', 'le croque-mitaine', 'Non. 👻', 'Le leprechaun est un lutin farceur du folklore irlandais.'),
    Q('Quelle île est partagée entre la République d’Irlande et le Royaume-Uni ?', 'l’île d’Irlande', 'la Grande-Bretagne', 'Elle est entièrement britannique. 🇬🇧', 'l’île de Man', 'Non. 🏝️', 'la Corse', 'Elle est française. 🇫🇷', 'L’Irlande du Nord fait partie du Royaume-Uni.'),
    Q('En quelle année la République d’Irlande entre-t-elle dans la CEE (future UE) ?', '1973', '1945', 'Trop tôt : la CEE n’existe pas encore. 📅', '2020', 'C’est l’année du Brexit britannique. 🇬🇧', '1789', 'C’est la Révolution française. 🇫🇷', 'L’Irlande et le Royaume-Uni entrent dans la CEE en 1973.'),
    Q('Quel instrument figure sur les symboles officiels de l’Irlande ?', 'la harpe', 'la cornemuse', 'Elle est plutôt associée à l’Écosse. 🏴', 'la guitare', 'Non. 🎸', 'le piano', 'Non. 🎹', 'La harpe celtique est l’emblème officiel de l’Irlande.'),
    Q('Quel écrivain irlandais a écrit « Ulysse » ?', 'James Joyce', 'Charles Dickens', 'Il est anglais. 🇬🇧', 'Mark Twain', 'Il est américain. 🇺🇸', 'J. K. Rowling', 'Elle est britannique et a écrit Harry Potter. ⚡', 'James Joyce, né à Dublin, publie Ulysse en 1922.'),
    Q('Quelle grande ville irlandaise est un port du sud de l’île ?', 'Cork', 'Glasgow', 'C’est en Écosse. 🏴', 'Manchester', 'C’est en Angleterre. 🇬🇧', 'Boston', 'C’est aux États-Unis. 🇺🇸', 'Cork est la deuxième ville de la République d’Irlande.'),
    Q('Que veut dire « Dublin » d’après son nom gaélique ?', 'l’étang noir', 'la ville verte', 'Non. 🟢', 'le grand port', 'Non. ⚓', 'la colline du roi', 'Non. 👑', 'Dubh Linn signifie « l’étang noir » en gaélique.'),
    Q('Quel sport gaélique ressemble à un mélange de football et de rugby ?', 'le football gaélique', 'le cricket', 'C’est un sport anglais avec une batte. 🏏', 'le baseball', 'C’est américain. ⚾', 'le golf', 'Non. ⛳', 'Le football gaélique se joue avec les mains et les pieds.'),
    Q('Quelle chaîne de falaises spectaculaires se trouve sur la côte ouest de l’Irlande ?', 'les falaises de Moher', 'les falaises de Douvres', 'Elles sont en Angleterre. 🇬🇧', 'les falaises d’Étretat', 'Elles sont en Normandie. 🇫🇷', 'le Grand Canyon', 'Il est aux États-Unis. 🇺🇸', 'Les falaises de Moher dominent l’Atlantique.')
  ]);

  // ═════════ 3e ═════════
  A('passif', [
    Q('Passif : « Millions of people watch this show. » →', 'This show is watched by millions of people.', 'This show watched by millions of people.', 'Il manque be. 🕳️', 'This show is watch by millions of people.', 'Il faut le participe passé. ✏️', 'This show was watched by millions of people.', 'La phrase est au présent. ⏱️', 'Passif = be (au bon temps) + participe passé.'),
    Q('« Le téléphone a été inventé par Bell » se dit :', 'The telephone was invented by Bell.', 'The telephone invented by Bell.', 'Il manque was. 🕳️', 'The telephone is invented by Bell.', 'C’est du passé. ⏪', 'Bell was invented by the telephone.', 'Les rôles sont inversés ! 😄', 'Passif au prétérit : was/were + participe passé.'),
    Q('Passif : « They grow coffee in Brazil. » →', 'Coffee is grown in Brazil.', 'Coffee is growed in Brazil.', 'Grow est irrégulier : grown. ✏️', 'Coffee grows in Brazil by them.', 'Ce n’est pas un passif. 🔄', 'Coffee was grown in Brazil.', 'La phrase est au présent. ⏱️', 'grow – grew – grown.'),
    Q('« Les résultats seront publiés demain » se dit :', 'The results will be published tomorrow.', 'The results will published tomorrow.', 'Il manque be. 🕳️', 'The results are publish tomorrow.', 'Non. ❌', 'The results will be publish tomorrow.', 'Il faut le participe passé. ✏️', 'Passif au futur : will be + participe passé.')
  ]);
  A('condition', [
    Q('Complète : « If you mix blue and yellow, you ___ green. »', 'get', 'will got', 'Après will, base verbale. ✏️', 'would get', 'C’est une vérité générale, pas une hypothèse. 🔬', 'got', 'C’est du passé. ⏪', 'Vérité générale : If + présent, présent.'),
    Q('« Si j’avais un chien, je le promènerais tous les jours » :', 'If I had a dog, I would walk it every day.', 'If I would have a dog, I would walk it every day.', 'Pas de would après if. 🚫', 'If I have a dog, I would walk it every day.', 'Hypothèse : prétérit après if. ⏪', 'If I had a dog, I will walk it every day.', 'Avec un prétérit après if, on met would. 🔄', 'If + prétérit, would + verbe.'),
    Q('Complète : « If he ___ harder, he will pass. »', 'works', 'will work', 'Pas de will après if. 🚫', 'worked', 'Avec will dans l’autre partie, on met le présent. ⏱️', 'would work', 'Non. ❌', 'If + présent, will + verbe.'),
    Q('Que signifie « If I were you, I would talk to her » ?', 'À ta place, je lui parlerais.', 'Si j’étais elle, je te parlerais.', 'Lis bien qui est qui. 🔍', 'Quand j’étais toi, je lui parlais.', 'C’est une hypothèse, pas un souvenir. 💭', 'Je vais lui parler.', 'Non. ❌', 'If I were you… = À ta place…')
  ]);
  A('discours', [
    Q('« She said: “I am hungry.” » au discours indirect :', 'She said (that) she was hungry.', 'She said (that) I am hungry.', 'Le pronom et le temps changent. 🔄', 'She said (that) she is hungry yesterday.', 'Non. ❌', 'She told (that) she was hungry.', 'Tell a besoin d’un complément : told me. ✏️', 'Présent → prétérit au discours indirect.'),
    Q('« He asked me: “Do you like jazz?” » →', 'He asked me if I liked jazz.', 'He asked me do I like jazz.', 'Il faut if et l’ordre sujet-verbe. 🔄', 'He asked me if do I liked jazz.', 'Pas de do dans la question rapportée. ✂️', 'He asked me that I liked jazz.', 'Pour une question oui/non, on met if. ❓', 'Question oui/non rapportée : ask if + sujet + verbe.'),
    Q('« She told him: “Be careful.” » →', 'She told him to be careful.', 'She told him be careful.', 'Il manque to. ➡️', 'She said him to be careful.', 'Avec un complément, c’est told. ✏️', 'She told him that he is careful.', 'C’est un ordre, pas une constatation. 📣', 'Ordre rapporté : tell sb to + verbe.'),
    Q('Au discours indirect, « tomorrow » devient souvent :', 'the next day (the following day)', 'yesterday', 'C’est l’inverse. 🔄', 'today', 'Non. ❌', 'tonight', 'Non. ❌', 'tomorrow → the next day ; yesterday → the day before.')
  ]);
  A('relatives', [
    Q('Complète : « The dog ___ is barking is mine. »', 'which', 'who', 'Pour un animal ou un objet : which ou that. 🐕', 'whose', '« whose » marque la possession. 🔗', 'where', '« where » désigne un lieu. 📍', 'which / that pour les choses et les animaux.'),
    Q('« La fille dont le frère est malade » se dit :', 'the girl whose brother is ill', 'the girl who brother is ill', 'Pour la possession : whose. 🔗', 'the girl which brother is ill', 'Non. ❌', 'the girl that her brother is ill', 'Non. ❌', 'whose = dont (possession).'),
    Q('Complète : « That’s the café ___ we usually meet. »', 'where', 'which', 'Pour un lieu où l’on fait quelque chose : where. 📍', 'who', 'Le café n’est pas une personne. ☕', 'when', 'C’est pour le temps. ⏰', 'where = où (lieu).'),
    Q('Dans quelle phrase la virgule change-t-elle le sens ?', 'My brother, who lives in Leeds, is a nurse.', 'The boy who called you is here.', 'Ici, pas de virgule. ✂️', 'The book that I bought is great.', 'Pas de virgule non plus. ✂️', 'I know the man who sings.', 'Pas de virgule. ✂️', 'Entre virgules, la relative ajoute une information (pas de that possible).')
  ]);
  A('fauxamis', [
    Q('« Notice » (nom) veut dire :', 'une affiche, un avis', 'une notice de montage', 'Faux ami ! Ça, c’est « instructions ». 📄', 'une note de musique', 'Non. 🎵', 'une remarque gentille', 'Non. 💬', 'A notice = un avis, une annonce.'),
    Q('« Sympathetic » veut dire :', 'compatissant', 'sympathique', 'Faux ami ! Sympathique se dit « nice ». 😊', 'énergique', 'Non. ⚡', 'symphonique', 'Non. 🎻', 'sympathetic = qui compatit, qui comprend.')
  ]);
  A('cours-a3', [
    Q('« Le château a été construit au XIIe siècle » :', 'The castle was built in the 12th century.', 'The castle built in the 12th century.', 'Il manque was. 🕳️', 'The castle has built in the 12th century.', 'Pas de date avec le present perfect. 📅', 'The castle was build in the 12th century.', 'Il faut le participe passé : built. ✏️', 'Passif au prétérit : was + participe passé.'),
    Q('« Si tu étudies, tu réussiras » :', 'If you study, you will succeed.', 'If you will study, you will succeed.', 'Pas de will après if. 🚫', 'If you study, you would succeed.', 'Avec un présent après if, on met will. 🔄', 'If you studied, you will succeed.', 'Mélange de deux conditionnels. 🌀', 'If + présent, will + verbe.'),
    Q('« Il m’a dit qu’il était fatigué » :', 'He told me (that) he was tired.', 'He said me he was tired.', 'Avec un complément, c’est told. ✏️', 'He told me he is tired yesterday.', 'Non. ❌', 'He told that he was tired.', 'Tell a besoin d’un complément : told me. 👤', 'tell sb (that) ; say (that).'),
    Q('« J’apprends l’anglais depuis cinq ans » :', 'I have been learning English for five years.', 'I am learning English since five years.', 'Calque du français ! Il faut le present perfect et for. ⏳', 'I learn English for five years.', 'Non. ❌', 'I have been learning English since five years.', 'Avec une durée, c’est for. ⏳', 'have been + -ing + for/since.'),
    Q('« La femme qui m’a aidé était infirmière » :', 'The woman who helped me was a nurse.', 'The woman which helped me was a nurse.', 'Pour une personne : who. 👩', 'The woman whose helped me was a nurse.', '« whose » marque la possession. 🔗', 'The woman helped me was a nurse.', 'Ici, le relatif est sujet : on ne peut pas l’enlever. ✂️', 'who pour les personnes.'),
    Q('Quel mot de liaison exprime la conséquence ?', 'therefore', 'although', 'C’est la concession. ⚖️', 'because', 'C’est la cause. 🔙', 'however', 'C’est l’opposition. 🔄', 'therefore / so = donc.'),
    Q('« Je m’habituerai au froid » :', 'I will get used to the cold.', 'I will use to the cold.', 'Il manque get et le participe. ✏️', 'I used to the cold.', 'C’est une habitude passée, autre sens. ⏪', 'I will get use to the cold.', 'used, avec un d. ✏️', 'get used to + nom/-ing = s’habituer à.'),
    Q('« Bien que fatigué, il a continué » :', 'Although he was tired, he kept going.', 'Because he was tired, he kept going.', 'Because = parce que : le sens est faux. 🔄', 'Despite he was tired, he kept going.', 'Despite est suivi d’un nom ou d’un -ing. ✏️', 'However he was tired, he kept going.', 'Non. ❌', 'although + proposition = bien que.')
  ]);
  A('ang-usa', [
    Q('Comment s’appelle la résidence du président des États-Unis ?', 'la Maison-Blanche (the White House)', 'le Capitole', 'C’est le siège du Congrès. 🏛️', 'le Pentagone', 'C’est le ministère de la Défense. 🛡️', 'Buckingham Palace', 'C’est à Londres. 👑', 'La Maison-Blanche est à Washington, D.C.'),
    Q('Quel est le nom du parlement américain ?', 'le Congrès', 'la Chambre des lords', 'C’est au Royaume-Uni. 🇬🇧', 'l’Assemblée nationale', 'C’est en France. 🇫🇷', 'le Bundestag', 'C’est en Allemagne. 🇩🇪', 'Le Congrès réunit la Chambre des représentants et le Sénat.'),
    Q('Quelle ville américaine est la capitale du cinéma ?', 'Los Angeles (Hollywood)', 'Chicago', 'Non. 🌬️', 'Boston', 'Non. 📚', 'Miami', 'Non. 🌴', 'Hollywood est un quartier de Los Angeles.'),
    Q('Quelle est la monnaie des États-Unis ?', 'le dollar', 'la livre sterling', 'C’est le Royaume-Uni. 💷', 'l’euro', 'C’est une partie de l’Europe. 💶', 'le yen', 'C’est le Japon. 💴', 'Le dollar américain (USD).'),
    Q('Quel parc national américain est célèbre pour ses geysers ?', 'Yellowstone', 'Central Park', 'C’est un parc en plein New York. 🌳', 'le Grand Canyon', 'Il est célèbre pour ses gorges. 🏜️', 'Disneyland', 'Ce n’est pas un parc national ! 🎢', 'Yellowstone, créé en 1872, est le premier parc national au monde.'),
    Q('Quel président a aboli l’esclavage pendant la guerre de Sécession ?', 'Abraham Lincoln', 'George Washington', 'Il était le premier président. 🎩', 'John F. Kennedy', 'Il a été président dans les années 1960. 📅', 'Barack Obama', 'Il a été président de 2009 à 2017. 📅', 'Le 13e amendement (1865) abolit l’esclavage.'),
    Q('Quel fleuve est le plus long des États-Unis ?', 'le Missouri', 'la Tamise', 'Elle coule en Angleterre. 🇬🇧', 'le Saint-Laurent', 'Il coule surtout au Canada. 🍁', 'le Nil', 'Il coule en Afrique. 🌍', 'Le Missouri, affluent du Mississippi, est le plus long.'),
    Q('Qui fut le premier homme à marcher sur la Lune, en 1969 ?', 'Neil Armstrong', 'Louis Armstrong', 'Celui-là jouait de la trompette ! 🎺', 'Buzz Aldrin', 'Il était le deuxième. 🥈', 'Youri Gagarine', 'Il a été le premier homme dans l’espace, en 1961. 🚀', 'Neil Armstrong, mission Apollo 11.'),
    Q('Quel État américain est un archipel du Pacifique ?', 'Hawaï', 'l’Alaska', 'C’est au nord-ouest du Canada. ❄️', 'la Floride', 'C’est une péninsule. 🌴', 'le Texas', 'Il est sur le continent. 🤠', 'Hawaï est devenu le 50e État en 1959.'),
    Q('Comment dit-on « le lycée » aux États-Unis ?', 'high school', 'college', 'Aux États-Unis, college désigne les études supérieures. 🎓', 'secondary school', 'C’est plutôt britannique. 🇬🇧', 'kindergarten', 'C’est la maternelle. 🧸', 'middle school (collège), high school (lycée), college (université).')
  ]);
})();
