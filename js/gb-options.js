// Ami des mots — v6.1 : Computer Science, French (GCSE 2026 nouvelle formule), et options de sixth form (Economics, Psychology).
(function(){
  'use strict';
  const E = window.ENGLAND; if(!E) return;
  const { ent, un, Q } = E.outils;
  const C = (id, nom, dom, niv, banque, gen) => ({ id, nom, dom, niv, banque, gen });
  E.ajouter({ id:'gb-computing', nom:'Computer Science', ic:'💻', sous:'Binary, algorithms, Python, networks, security', examens:{ Y11:'GCSE-style quiz', Y13:'A level-style quiz' }, chapitres:[
    C('binary', 'Binary & hexadecimal', 'Data representation', ['Y7', 'Y8', 'Y9', 'Y10', 'Y11', 'Y12'], null, r => {
      const n = ent(r, 5, 250), b = n.toString(2).padStart(8, '0');
      return un(r, [
        () => Q('Convert ' + n + ' to 8-bit binary.', b, [[(n + 1).toString(2).padStart(8, '0'), 'One too many! Check the last bit.'], [b.split('').reverse().join(''), 'Backwards! The biggest place value (128) is on the LEFT.']], 'Place values: 128 64 32 16 8 4 2 1.'),
        () => Q('Convert binary ' + b + ' to denary.', n, [[n * 2, 'You shifted one place too far: that doubles it.'], [b.split('').filter(x => x === '1').length, 'That counts the 1s. Each 1 is worth its place value!']], 'Add the place values where there is a 1.'),
        () => Q('Convert ' + n + ' to hexadecimal.', n.toString(16).toUpperCase(), [[(n + 16).toString(16).toUpperCase(), 'One sixteen too many.'], [String(n), 'That is still denary. Hex uses 0–9 and A–F.']], 'Divide by 16: first digit = quotient, second = remainder (A=10 … F=15).')
      ])();
    }),
    C('units', 'Units, images & sound', 'Data representation', ['Y8', 'Y9', 'Y10', 'Y11'], [
      ['How many bits in a byte?', '8', [['4', 'That is a nibble. Cute name, wrong answer.'], ['1024', 'That is bytes in a kibibyte.']], '8 bits = 1 byte; 4 bits = 1 nibble.'],
      ['Which is the biggest?', '1 terabyte', [['1 gigabyte', 'A terabyte is about 1000 gigabytes.'], ['1 megabyte', 'Much smaller.']], 'kB < MB < GB < TB.'],
      ['Increasing the colour depth of an image…', 'increases file size', [['reduces file size', 'More bits per pixel = more data.'], ['makes it black and white', 'The opposite: more colours.']], 'File size = width × height × colour depth.'],
      ['Lossy compression…', 'permanently removes some data', [['keeps every bit of data', 'That is lossless.'], ['makes files bigger', 'Compression makes files smaller.']], 'JPEG and MP3 are lossy; PNG and ZIP are lossless.']
    ]),
    C('algorithms', 'Algorithms & logic', 'Algorithms', ['Y8', 'Y9', 'Y10', 'Y11', 'Y12', 'Y13'], [
      ['Which search needs the list to be sorted?', 'binary search', [['linear search', 'Linear search checks every item, sorted or not.'], ['bubble search', 'Plumo has never met a bubble search.']], 'Binary search halves the list each time.'],
      ['Which sort repeatedly swaps adjacent items?', 'bubble sort', [['merge sort', 'Merge sort splits and merges.'], ['insertion sort', 'Insertion sort builds a sorted list one item at a time.']], 'Bubble sort: passes until no swaps are needed.'],
      ['What is the output of A AND B when A = 1 and B = 0?', '0', [['1', 'AND needs BOTH to be 1.'], ['10', 'Logic gates only output 0 or 1.']], 'AND: 1 only if both inputs are 1.'],
      ['NOT 1 = ?', '0', [['1', 'NOT flips the input.'], ['2', 'There is no 2 in Boolean logic.']], 'NOT inverts.'],
      ['Big O of binary search?', 'O(log n)', [['O(n)', 'That is linear search.'], ['O(n²)', 'That is bubble sort in the worst case.']], 'Halving each step gives logarithmic time.']
    ]),
    C('python', 'Programming (Python)', 'Programming', ['Y8', 'Y9', 'Y10', 'Y11', 'Y12', 'Y13'], null, r => {
      const a = ent(r, 3, 9), b = ent(r, 2, 5);
      return un(r, [
        () => Q('What does print(' + a + ' ** ' + b + ') output?', String(a ** b), [[String(a * b), '** is a power, not a multiplication.'], [String(a * 2), 'That would be a * 2.']], '** means “to the power of” in Python.'),
        () => Q('What does print(' + (a * b + 1) + ' // ' + b + ') output?', String(a), [[String((a * b + 1) / b), '// is integer division: it drops the remainder.'], ['1', 'That is the remainder (%).']], '// = integer division, % = remainder (MOD).'),
        () => Q('What does len("Plumo") return?', '5', [['4', 'Count again: P-l-u-m-o.'], ['"Plumo"', 'len gives the LENGTH, not the word.']], 'len() returns the number of characters.'),
        () => Q('for i in range(' + b + '): how many times does the loop run?', String(b), [[String(b + 1), 'range(' + b + ') goes from 0 to ' + (b - 1) + '.'], [String(b - 1), 'It starts at 0, so that is ' + b + ' times.']], 'range(n) gives 0, 1, …, n−1.')
      ])();
    }),
    C('systems-networks', 'Systems, networks & security', 'Computer systems', ['Y9', 'Y10', 'Y11', 'Y12', 'Y13'], [
      ['Which part of the CPU does calculations?', 'the ALU', [['the cache', 'Cache is fast memory.'], ['the clock', 'The clock sets the pace.']], 'ALU = Arithmetic Logic Unit.'],
      ['RAM is…', 'volatile', [['non-volatile', 'RAM loses its data when the power goes off.'], ['read only', 'That is ROM.']], 'RAM holds running programs and data.'],
      ['Phishing is…', 'fake messages that try to trick you into giving personal details', [['a fishing game', 'Plumo loves fish, but no.'], ['a type of firewall', 'A firewall protects; phishing attacks.']], 'Never give passwords via a link in a message.'],
      ['Which protocol is used to load secure web pages?', 'HTTPS', [['FTP', 'FTP transfers files.'], ['SMTP', 'SMTP sends emails.']], 'HTTPS encrypts web traffic.'],
      ['An IP address identifies…', 'a device on a network', [['a person’s name', 'Not a name, an address for devices.'], ['a website’s colour', 'No colours involved.']], 'IPv4 example: 192.168.0.1.']
    ]),
    C('sql-ethics', 'Databases, SQL & ethics', 'Databases', ['Y10', 'Y11', 'Y12', 'Y13'], [
      ['Which SQL keyword chooses columns?', 'SELECT', [['WHERE', 'WHERE filters rows.'], ['FROM', 'FROM names the table.']], 'SELECT columns FROM table WHERE condition.'],
      ['A primary key…', 'uniquely identifies each record', [['is always a password', 'No passwords in primary keys, please.'], ['can be repeated', 'Then it would not be unique.']], 'A foreign key links to another table’s primary key.'],
      ['Which UK law protects personal data?', 'the Data Protection Act 2018 (UK GDPR)', [['the Computer Misuse Act', 'That is about hacking.'], ['the Highway Code', 'That is for roads.']], 'Computer Misuse Act 1990: unauthorised access is an offence.']
    ])
  ]});
  E.ajouter({ id:'gb-french', nom:'French (MFL)', ic:'🇫🇷', sous:'GCSE French (new 2026 exams): vocabulary, grammar, dictation', examens:{ Y11:'GCSE-style quiz' }, chapitres:[
    C('basics', 'Greetings, numbers & time', 'KS3 French', ['Y6', 'Y7', 'Y8'], [
      ['How do you say “I am twelve”?', 'J’ai douze ans.', [['Je suis douze ans.', 'In French you HAVE your age: avoir, not être.'], ['J’ai douze années.', 'Ans, not années, for age.']], 'Age uses avoir: j’ai … ans.'],
      ['“Quatre-vingts” means…', '80', [['24', 'Four-twenties: 4 × 20.'], ['48', 'Plumo calculated 4 × 20 = 80.']], 'Quatre-vingts = 4 × 20 = 80.'],
      ['“Il est huit heures et quart.”', 'It’s quarter past eight.', [['It’s quarter to eight.', '“Moins le quart” would be quarter to.'], ['It’s eight fifteen in the evening.', 'It could be morning too!']], 'Et quart = quarter past; moins le quart = quarter to.'],
      ['Which is feminine?', 'la maison', [['le livre', 'Le = masculine.'], ['le chat', 'Le again. The cat is offended.']], 'Learn nouns with their article: le/la/un/une.']
    ]),
    C('verbs', 'Verbs & tenses', 'Grammar', ['Y7', 'Y8', 'Y9', 'Y10', 'Y11'], [
      ['“Nous ___ au cinéma.” (aller, present)', 'allons', [['allez', 'That is vous.'], ['vont', 'That is ils/elles.']], 'Aller: je vais, tu vas, il va, nous allons, vous allez, ils vont.'],
      ['Which verb takes être in the passé composé?', 'aller', [['manger', 'Manger takes avoir.'], ['finir', 'Finir takes avoir.']], 'DR MRS VANDERTRAMP verbs and reflexives take être.'],
      ['“I went to Paris.”', 'Je suis allé(e) à Paris.', [['J’ai allé à Paris.', 'Aller takes être, not avoir.'], ['Je vais à Paris.', 'That is the present: I am going.']], 'Être + past participle (agrees with the subject).'],
      ['“Demain, je ___ mes devoirs.” (faire, near future)', 'vais faire', [['fais', 'That is the present.'], ['ai fait', 'That is the past. Plumo wishes the homework were already done.']], 'Near future: aller + infinitive.'],
      ['“Si j’avais de l’argent, j’___ un chien.” (acheter)', 'achèterais', [['achèterai', 'That is the future. After “si + imperfect”, use the conditional.'], ['achetais', 'That is the imperfect, already used in the si-clause.']], 'Si + imparfait → conditionnel.']
    ]),
    C('topics', 'Themes: identity, school, travel, environment', 'GCSE themes', ['Y9', 'Y10', 'Y11'], [
      ['“Je m’entends bien avec ma sœur” means…', 'I get on well with my sister', [['I hear my sister well', 'S’entendre avec = to get on with.'], ['I wait for my sister', 'That would be attendre.']], 'S’entendre (bien/mal) avec quelqu’un.'],
      ['“Les devoirs” are…', 'homework', [['duties at home', 'Clever guess, but it means homework.'], ['holidays', 'Holidays are les vacances. Plumo prefers those.']], 'Les devoirs = homework.'],
      ['“Il faut protéger l’environnement.”', 'We must protect the environment.', [['The environment is falling.', 'Il faut = it is necessary.'], ['It’s cold in the environment.', 'Il fait froid would be “it’s cold”.']], 'Il faut + infinitive = one must.'],
      ['“J’ai passé une semaine au bord de la mer.”', 'I spent a week at the seaside.', [['I passed a week at sea.', 'Au bord de la mer = by the sea / at the seaside.'], ['I will spend a week by the sea.', 'Passé composé: it is in the past.']], 'Passer + time = to spend time.']
    ]),
    C('exam-2026', 'The new GCSE (first exams 2026)', 'GCSE exam', ['Y10', 'Y11'], [
      ['Which new task is in the listening paper of the new GCSE French?', 'dictation', [['a song contest', 'Plumo would win. But no.'], ['a poetry recital', 'There is a reading aloud task in the speaking test, not poetry.']], 'Dictation: write down short spoken sentences with accurate spelling.'],
      ['The new GCSE vocabulary list (AQA) is about…', '1,200 words at Foundation (+500 at Higher)', [['50 words', 'Much more than that.'], ['every word in French', 'Plumo is relieved: no.']], 'Words are chosen by frequency; most exam vocabulary comes from the list.'],
      ['How do you spell the word you hear: [ʃa]?', 'chat', [['sha', 'In French, “ch” makes the [ʃ] sound.'], ['chats', 'You might be right if it was plural, but listen for “les”.']], 'Sound–symbol correspondences matter for the dictation.']
    ])
  ]});
  E.ajouter({ id:'gb-economics', nom:'Economics (A level)', ic:'📈', sous:'Markets, macroeconomics, money', examens:{ Y13:'A level-style quiz' }, chapitres:[
    C('micro', 'Markets & market failure', 'Microeconomics', ['Y12', 'Y13'], [
      ['If the price of a good rises, demand usually…', 'falls (contraction along the demand curve)', [['rises', 'That would be a strange good: law of demand says it falls.'], ['shifts right', 'A price change moves ALONG the curve, it does not shift it.']], 'Price changes cause movements along the curve; other factors shift it.'],
      ['Pollution from a factory affecting local residents is…', 'a negative externality', [['a public good', 'Public goods are non-rival and non-excludable (like street lights).'], ['a subsidy', 'Subsidies are payments from the government.']], 'External costs to third parties: market failure.'],
      ['PED of −0.5 means demand is…', 'price inelastic', [['price elastic', 'Elastic would be |PED| > 1.'], ['perfectly elastic', 'That would be infinite.']], '|PED| < 1: inelastic.'],
      ['A good that is non-rival and non-excludable is a…', 'public good', [['merit good', 'Merit goods are under-consumed (education, health).'], ['luxury good', 'Luxury goods have YED > 1.']], 'e.g. national defence, lighthouses.']
    ]),
    C('macro', 'Macroeconomics & money', 'Macroeconomics', ['Y12', 'Y13'], [
      ['Who sets the Bank Rate in the UK?', 'the Bank of England’s Monetary Policy Committee', [['the Prime Minister', 'Since 1997 the Bank of England is independent on interest rates.'], ['the High Street banks', 'They follow it, they do not set it.']], 'The MPC aims for a 2% CPI inflation target.'],
      ['Which is fiscal policy?', 'changing taxes and government spending', [['changing interest rates', 'That is monetary policy.'], ['changing the weather', 'Plumo would vote for sunshine.']], 'Fiscal policy is set by the government (the Chancellor).'],
      ['GDP measures…', 'the value of goods and services produced in a country', [['the amount of gold a country has', 'That is reserves.'], ['the population', 'GDP is about output.']], 'Real GDP adjusts for inflation.'],
      ['Inflation is…', 'a sustained rise in the general price level', [['a fall in prices', 'That is deflation.'], ['a rise in one price', 'It is about the general price level.']], 'Measured in the UK by the CPI.']
    ])
  ]});
  E.ajouter({ id:'gb-psychology', nom:'Psychology (A level)', ic:'🧠', sous:'Memory, social influence, research methods', examens:{ Y13:'A level-style quiz' }, chapitres:[
    C('memory', 'Memory & attachment', 'Psychology', ['Y12', 'Y13'], [
      ['The multi-store model of memory was proposed by…', 'Atkinson and Shiffrin', [['Freud', 'Freud worked on the unconscious mind.'], ['Milgram', 'Milgram studied obedience.']], 'Sensory register → short-term memory → long-term memory (1968).'],
      ['The capacity of short-term memory (Miller) is about…', '7 ± 2 items', [['unlimited', 'That is long-term memory.'], ['1 item', 'Plumo can remember at least two worms.']], 'Miller (1956): the magical number seven.'],
      ['Who studied attachment types with the “Strange Situation”?', 'Mary Ainsworth', [['John Bowlby', 'Bowlby proposed attachment theory; Ainsworth designed the Strange Situation.'], ['Pavlov', 'Pavlov had dogs and bells.']], 'Secure, insecure-avoidant, insecure-resistant.']
    ]),
    C('social', 'Social influence & research methods', 'Psychology', ['Y12', 'Y13'], [
      ['Asch’s line study investigated…', 'conformity', [['obedience', 'That is Milgram.'], ['memory', 'Lines, not lists.']], 'About a third of responses conformed to the wrong majority.'],
      ['Milgram’s study investigated…', 'obedience to authority', [['conformity to peers', 'That is Asch.'], ['sleep', 'Nobody slept in that study.']], 'Many participants obeyed the experimenter.'],
      ['A variable that the researcher changes is the…', 'independent variable', [['dependent variable', 'The DV is what is measured.'], ['confounding variable', 'That is an unwanted variable.']], 'IV is changed; DV is measured.'],
      ['Which is a non-directional hypothesis?', 'There will be a difference in scores between the groups.', [['Group A will score higher than group B.', 'That predicts a direction.'], ['There will be no difference.', 'That is the null hypothesis.']], 'Non-directional (two-tailed): predicts a difference, not its direction.']
    ])
  ]});
})();
