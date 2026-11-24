// Ami des mots — v6.1 : English (England) — grammar, punctuation & spelling (SATs), reading, language techniques,
// GCSE English Language & Literature, A level literary terms. Textes cités : uniquement des œuvres du domaine public.
(function(){
  'use strict';
  const E = window.ENGLAND; if(!E) return;
  const C = (id, nom, dom, niv, banque) => ({ id, nom, dom, niv, banque });
  const chapitres = [
    C('word-classes', 'Word classes', 'Grammar (GPS)', ['Y6', 'Y7'], [
      ['In “The owl flew silently”, which word is an adverb?', 'silently', [['flew', 'That is the verb: it is what the owl does.'], ['owl', 'A noun. Plumo is flattered, but no.']], 'Adverbs often describe HOW a verb happens (many end in -ly).'],
      ['In “She waited until the bell rang”, what is “until”?', 'a subordinating conjunction', [['a preposition', 'Close! But here it joins a whole clause (“the bell rang”), so it is a conjunction.'], ['an adverb', 'It links two clauses. Adverbs do not do joining.']], 'Subordinating conjunctions (when, until, because, although) introduce a subordinate clause.'],
      ['Which word is a determiner in “Those biscuits are mine”?', 'Those', [['biscuits', 'That is the noun. The determiner comes before it and points at it.'], ['mine', 'That is a possessive pronoun, standing on its own.']], 'Determiners (the, a, this, those, my, some) come before a noun.'],
      ['In “Plumo is happy”, what word class is “happy”?', 'adjective', [['adverb', 'It describes Plumo (a noun), not how he does something.'], ['verb', '“Is” is the verb. “Happy” is just how he is.']], 'Adjectives describe nouns; after “be” they are still adjectives.'],
      ['Which is a preposition in “The cat hid under the bed”?', 'under', [['hid', 'That is the verb. The cat is still hiding, by the way.'], ['the', 'That is a determiner.']], 'Prepositions show position, direction or time (under, after, through).'],
      ['“We” is a…', 'pronoun', [['noun', 'It replaces a noun, so it is a PROnoun.'], ['determiner', 'It does not come before a noun here.']], 'Pronouns replace nouns: I, you, he, she, it, we, they.']
    ]),
    C('tenses', 'Verb forms & tenses', 'Grammar (GPS)', ['Y6', 'Y7'], [
      ['Which sentence is in the present perfect?', 'I have finished my homework.', [['I finished my homework.', 'Simple past. The present perfect needs “have/has” + past participle.'], ['I was finishing my homework.', 'Past progressive: was + -ing.']], 'Present perfect = have/has + past participle.'],
      ['Which sentence is in the past progressive?', 'They were laughing at Plumo’s joke.', [['They laughed at Plumo’s joke.', 'Simple past. Progressive needs was/were + -ing.'], ['They have laughed at Plumo’s joke.', 'Present perfect.']], 'Past progressive = was/were + verb-ing.'],
      ['Which sentence is in the passive voice?', 'The cake was eaten by the dog.', [['The dog ate the cake.', 'Active: the dog does the eating.'], ['The dog was eating the cake.', 'Still active, just progressive. The dog is still guilty.']], 'Passive: the object becomes the subject + “was/were” + past participle.'],
      ['Which uses the subjunctive?', 'If I were a bird, I would fly to school.', [['If I was a bird, I would fly to school.', 'Common in speech, but the formal subjunctive is “were”.'], ['When I am a bird, I will fly to school.', 'Plumo admires the ambition, but no subjunctive here.']], 'The subjunctive uses “were” for all persons in hypothetical sentences.'],
      ['Choose the correct modal verb for certainty: “It ___ rain later; the sky is black.”', 'will', [['might', '“Might” shows possibility, not certainty.'], ['could', 'Possibility again. The sky is BLACK, Plumo says certain.']], 'Modal verbs show degrees of possibility: will (certain), might/could (possible).']
    ]),
    C('punctuation', 'Punctuation', 'Grammar (GPS)', ['Y6', 'Y7', 'Y8'], [
      ['Which is correct?', 'The dog’s bowl is empty.', [['The dogs’ bowl is empty.', 'That means several dogs share one bowl. Possible, but crowded.'], ['The dogs bowl is empty.', 'Missing apostrophe: whose bowl is it?']], 'Singular owner: ’s. Plural owners ending in s: s’.'],
      ['Which needs a semi-colon?', 'It was late; we went home.', [['It was late, we went home.', 'Two main clauses joined by just a comma: that is a comma splice.'], ['It was late we went home.', 'No punctuation at all. The sentences crashed.']], 'A semi-colon joins two closely linked main clauses.'],
      ['Which is punctuated correctly?', '“Where are you going?” asked Mum.', [['“Where are you going”? asked Mum.', 'The question mark goes INSIDE the inverted commas.'], ['“Where are you going?” Asked Mum.', 'No capital letter for “asked”: the sentence continues.']], 'Punctuation of the speech stays inside the inverted commas.'],
      ['What do the brackets show in “Plumo (the wise owl) laughed”?', 'parenthesis', [['a list', 'Only one thing inside, so not a list.'], ['direct speech', 'Speech needs inverted commas, not brackets.']], 'Brackets, dashes or commas can mark extra information: parenthesis.'],
      ['Which uses a colon correctly?', 'You need three things: a pen, a ruler and a rubber.', [['You need: three things a pen, a ruler and a rubber.', 'The colon must come after a complete clause.'], ['You: need three things, a pen, a ruler and a rubber.', 'Plumo has never seen a colon sit there before.']], 'A colon introduces a list or explanation after a main clause.'],
      ['Which has a correctly used hyphen?', 'a man-eating shark', [['a man eating shark', 'Without the hyphen, it is a man eating a shark. Very different lunch.'], ['a man-eating-shark', 'One hyphen is enough.']], 'Hyphens join words to avoid ambiguity.']
    ]),
    C('spelling', 'Spelling & homophones', 'Spelling', ['Y6', 'Y7', 'Y8'], [
      ['Choose the right word: “___ going to the park.”', 'They’re', [['Their', '“Their” shows belonging. Their park, their snacks.'], ['There', '“There” is a place. Read it with “they are”!']], 'They’re = they are; their = belonging; there = place.'],
      ['Which is spelt correctly?', 'necessary', [['neccessary', 'One collar (c), two sleeves (ss).'], ['necesary', 'You lost a sleeve: two s’s.']], 'Necessary: one c, two s’s.'],
      ['Choose: “I need some ___ on my homework.”', 'advice', [['advise', '“Advise” is the verb. The noun is advice.'], ['adviss', 'Plumo has never seen that word in his dictionary.']], 'Noun: advice/practice (c). Verb: advise/practise (s).'],
      ['Which is correct?', 'definitely', [['definately', 'There is no “ate” in definitely: think “finite”.'], ['defiantly', 'That means rebelliously. Very different mood.']], 'Definitely contains the word “finite”.'],
      ['Choose: “The weather will ___ the match.”', 'affect', [['effect', '“Effect” is usually the noun (the result).'], ['afect', 'Two f’s, please.']], 'Affect = verb (to influence); effect = noun (the result).'],
      ['Which plural is correct?', 'potatoes', [['potatos', 'Potato and tomato take -es in the plural.'], ['potatoe’s', 'An apostrophe does not make a plural. Ever. 🥔']], 'Some words ending in -o add -es: potatoes, tomatoes, heroes.']
    ]),
    C('reading-skills', 'Reading: inference & vocabulary', 'Reading', ['Y6', 'Y7', 'Y8'], [
      ['“Mia slammed the door and stomped upstairs.” How does Mia feel?', 'angry', [['sleepy', 'Sleepy people do not stomp. They shuffle.'], ['excited', 'Excited people bounce; Mia stomps.']], 'Inference: use the verbs (slammed, stomped) as clues.'],
      ['“The ancient oak groaned in the wind.” What does “groaned” suggest?', 'the tree is old and creaking', [['the tree is talking', 'It is personification: it SOUNDS like groaning, but the oak is not chatting.'], ['the wind stopped', 'The wind is still blowing, that is why it groans.']], 'Writers choose verbs to create sound and mood.'],
      ['“Reluctantly, Sam handed over the last biscuit.” What does “reluctantly” mean?', 'unwillingly', [['quickly', 'Sam was not in a hurry to give up that biscuit.'], ['happily', 'Nobody gives up the last biscuit happily.']], 'Reluctantly = without wanting to.'],
      ['Which question asks you to find information you can see directly in the text?', 'retrieval', [['inference', 'Inference means reading between the lines.'], ['prediction', 'Prediction is guessing what happens next.']], 'Retrieval: find it. Inference: work it out. Prediction: guess what next.']
    ]),
    C('techniques', 'Language techniques', 'Language', ['Y7', 'Y8', 'Y9', 'Y10', 'Y11'], [
      ['“The classroom was a zoo.” What technique is this?', 'metaphor', [['simile', 'No “like” or “as”: it says it IS a zoo.'], ['personification', 'The classroom is not given human qualities here.']], 'Metaphor: says something IS something else.'],
      ['“As brave as a lion.” What technique is this?', 'simile', [['metaphor', 'It uses “as … as”, so it is a simile.'], ['hyperbole', 'It compares, it does not wildly exaggerate.']], 'Simile: comparison using like or as.'],
      ['“The wind whispered through the trees.”', 'personification', [['onomatopoeia', '“Whispered” is a human action given to the wind.'], ['alliteration', 'The words do not start with the same sound.']], 'Personification: giving human qualities to non-human things.'],
      ['“Peter Piper picked a peck…”', 'alliteration', [['assonance', 'Assonance repeats VOWEL sounds; here it is the “p” consonant.'], ['sibilance', 'Sibilance is the “s” sound. Plumo hears “p”.']], 'Alliteration: repeated consonant sounds at the start of words.'],
      ['“I’ve told you a million times!”', 'hyperbole', [['statistics', 'Plumo doubts anyone counted.'], ['simile', 'There is no comparison.']], 'Hyperbole: deliberate exaggeration.'],
      ['“Buzz”, “crash”, “sizzle” are examples of…', 'onomatopoeia', [['alliteration', 'They sound like what they mean, that is onomatopoeia.'], ['pathetic fallacy', 'Pathetic fallacy is weather matching mood.']], 'Onomatopoeia: words that imitate sounds.'],
      ['A storm breaks out just as the villain arrives. This is…', 'pathetic fallacy', [['foreshadowing', 'Close, it can hint at events, but weather mirroring mood is pathetic fallacy.'], ['a flashback', 'Nothing goes back in time here.']], 'Pathetic fallacy: weather/nature reflecting emotions or atmosphere.']
    ]),
    C('persuasive', 'Persuasive & non-fiction writing', 'Writing', ['Y8', 'Y9', 'Y10', 'Y11'], [
      ['“Don’t you want a cleaner planet?” is a…', 'rhetorical question', [['statistic', 'No number in sight.'], ['anecdote', 'An anecdote is a short personal story.']], 'Rhetorical questions do not expect an answer; they make the reader think.'],
      ['“9 out of 10 students prefer longer break times.” This is a…', 'statistic', [['fact', 'Close! It is presented as a fact, but specifically it is a statistic.'], ['opinion', 'It uses numbers to look like evidence.']], 'Statistics add authority to an argument.'],
      ['Which is a counter-argument?', 'Some people say homework is useful; however…', [['Homework is terrible.', 'That is just your opinion, not the other side.'], ['Homework is set every day.', 'That is a fact, not an argument.']], 'A counter-argument presents the opposing view, then rebuts it.'],
      ['Which is the best opening for a formal letter to a head teacher?', 'Dear Mrs Patel,', [['Hey Mrs Patel!', 'Too chatty for the head teacher. Plumo winced.'], ['Yo Head!', 'Plumo is taking his hat off out of respect. You should too.']], 'Formal letters: Dear + title + surname, and sign off “Yours sincerely”.'],
      ['Writing for an audience of parents in a newspaper, you should use…', 'a formal, clear register', [['text-speak', 'LOL no. Parents want full sentences.'], ['lots of slang', 'Slang suits a chat with friends, not a newspaper.']], 'Match register (tone) to audience and purpose.']
    ]),
    C('lang-paper', 'GCSE English Language: the papers', 'GCSE Language', ['Y10', 'Y11'], [
      ['In GCSE English Language (AQA) Paper 1, which question asks about STRUCTURE?', 'Question 3', [['Question 2', 'Q2 is about language (words, techniques).'], ['Question 5', 'Q5 is your creative writing.']], 'AQA Paper 1: Q1 list, Q2 language, Q3 structure, Q4 evaluation, Q5 writing.'],
      ['Paper 1 is mainly based on…', 'a fiction extract', [['two non-fiction sources', 'That is Paper 2.'], ['a poem', 'Poetry belongs to English Literature.']], 'AQA Paper 1: Explorations in creative reading and writing (fiction).'],
      ['Paper 2 Question 4 asks you to…', 'compare writers’ viewpoints and perspectives', [['write a story', 'Paper 2 writing is a viewpoint piece, not a story.'], ['list four facts', 'That is Paper 2 Q1 territory.']], 'Paper 2: Writers’ viewpoints and perspectives (non-fiction).'],
      ['A “structural” feature is…', 'a shift in focus from the setting to a character', [['a simile', 'That is a language feature.'], ['a spelling mistake', 'Plumo hopes not.']], 'Structure: openings, shifts in focus, flashbacks, endings, paragraph order.'],
      ['How long is each AQA English Language paper?', '1 hour 45 minutes', [['30 minutes', 'That would be a sprint. It is a long-distance run.'], ['3 hours', 'Not quite that long. Phew!']], 'Each paper: 1 h 45, 80 marks.']
    ]),
    C('macbeth', 'Macbeth', 'GCSE Literature', ['Y9', 'Y10', 'Y11'], [
      ['Who tells Macbeth he will be king?', 'the three witches', [['Banquo', 'Banquo is told his descendants will be kings.'], ['Lady Macbeth', 'She pushes him, but the prophecy comes from the witches.']], 'Act 1: the witches greet Macbeth as Thane of Cawdor and future king.'],
      ['Who kills King Duncan?', 'Macbeth', [['Lady Macbeth', 'She plans it and plants the daggers, but Macbeth does it.'], ['Macduff', 'Macduff discovers the body.']], 'Macbeth murders Duncan in Act 2, urged on by Lady Macbeth.'],
      ['“Out, damned spot!” Who says it?', 'Lady Macbeth', [['Macbeth', 'He has his own visions (the dagger, Banquo’s ghost).'], ['the doctor', 'The doctor watches the sleepwalking scene.']], 'Act 5: Lady Macbeth sleepwalks, trying to wash imaginary blood away (guilt).'],
      ['Which theme is central to Macbeth?', 'ambition', [['friendship', 'Not the strongest point of this play.'], ['romance', 'There is a marriage, but the theme is ambition.']], 'Key themes: ambition, guilt, the supernatural, kingship.'],
      ['Who defeats Macbeth at the end?', 'Macduff', [['Malcolm', 'Malcolm becomes king, but Macduff faces Macbeth.'], ['Banquo', 'Banquo appears only as a ghost by then.']], 'Macduff was “from his mother’s womb untimely ripped”, so the prophecy is fulfilled.'],
      ['What form is most of Macbeth written in?', 'blank verse (iambic pentameter)', [['rhyming couplets only', 'The witches use rhyme; the nobles mostly do not.'], ['free verse', 'Shakespeare kept a regular beat.']], 'Nobles speak blank verse; the witches speak in trochaic rhyme.']
    ]),
    C('romeo', 'Romeo and Juliet', 'GCSE Literature', ['Y9', 'Y10', 'Y11'], [
      ['Which families are feuding?', 'the Montagues and the Capulets', [['the Macbeths and the Macduffs', 'Wrong play! That is Scotland.'], ['the Birlings and the Crofts', 'That is An Inspector Calls.']], 'Romeo is a Montague, Juliet a Capulet.'],
      ['Where is the play set?', 'Verona', [['Venice', 'Close, also Italy, but that is another Shakespeare play.'], ['London', 'Plumo checked the map: Verona.']], 'Romeo and Juliet is set in Verona, Italy.'],
      ['Who marries Romeo and Juliet in secret?', 'Friar Laurence', [['the Nurse', 'She helps, but the friar performs the marriage.'], ['Mercutio', 'Mercutio is Romeo’s friend, not a priest.']], 'Friar Laurence hopes the marriage will end the feud.'],
      ['What does the prologue tell the audience?', 'that the lovers will die', [['that it ends happily', 'The prologue spoils the ending on purpose: dramatic irony.'], ['nothing about the plot', 'It summarises the whole plot in a sonnet.']], 'The prologue is a sonnet that reveals the tragic ending.'],
      ['“A plague o’ both your houses!” Who says it?', 'Mercutio', [['Tybalt', 'Tybalt is the one who wounds him.'], ['Romeo', 'Romeo reacts to it, but Mercutio says it.']], 'Mercutio curses both families as he is fatally wounded (Act 3).']
    ]),
    C('christmas-carol', 'A Christmas Carol', 'GCSE Literature', ['Y9', 'Y10', 'Y11'], [
      ['Who visits Scrooge first?', 'the ghost of Jacob Marley', [['the Ghost of Christmas Past', 'Marley comes first, to warn him.'], ['Tiny Tim', 'Tiny Tim is not a ghost, thankfully.']], 'Marley appears in chains to warn Scrooge.'],
      ['How many spirits does Marley say will visit?', 'three', [['two', 'Past, Present, Yet to Come: count again.'], ['twelve', 'That would be the twelve days of Christmas.']], 'Ghosts of Christmas Past, Present and Yet to Come.'],
      ['When was A Christmas Carol published?', '1843', [['1943', 'A century too late. Plumo checked the Victorian calendar.'], ['1743', 'Too early: Dickens was not born yet.']], 'Published in 1843, during the Victorian era.'],
      ['What are the two children under the robe of the Ghost of Christmas Present called?', 'Ignorance and Want', [['Tiny Tim and Fan', 'Those are real characters, not symbols.'], ['Hope and Joy', 'Dickens chose much darker names.']], 'Ignorance and Want symbolise the poverty Dickens criticised.'],
      ['What is Dickens’ main message?', 'the rich have a responsibility to help the poor', [['money is everything', 'That is Scrooge at the START. He changes.'], ['ghosts are real', 'The ghosts are a means, not the message.']], 'Themes: social responsibility, redemption, Christmas spirit.']
    ]),
    C('jekyll', 'Jekyll and Hyde & An Inspector Calls', 'GCSE Literature', ['Y9', 'Y10', 'Y11'], [
      ['Who wrote Strange Case of Dr Jekyll and Mr Hyde (1886)?', 'Robert Louis Stevenson', [['Charles Dickens', 'Dickens wrote A Christmas Carol.'], ['Mary Shelley', 'She wrote Frankenstein (1818).']], 'R. L. Stevenson, 1886, a Victorian Gothic novella.'],
      ['What is the main theme of Jekyll and Hyde?', 'the duality of human nature', [['time travel', 'Wrong genre: no time machines.'], ['a love story', 'There is very little romance here.']], 'Good and evil inside one person; Victorian respectability.'],
      ['Who narrates most of Jekyll and Hyde?', 'Mr Utterson is the main viewpoint', [['Mr Hyde', 'Hyde never narrates. Very mysterious.'], ['Plumo', 'Plumo would have solved it on page 2.']], 'The story follows the lawyer Utterson; letters reveal the truth at the end.'],
      ['When is An Inspector Calls set?', '1912', [['1945', 'That is when it was first performed. It is SET in 1912.'], ['1066', 'That is the Norman Conquest.']], 'Set in 1912 (before WW1), written in 1945.'],
      ['Who is the Inspector’s message mainly aimed at?', 'the Birling family and the audience', [['only Eva Smith', 'Eva never appears on stage.'], ['the Titanic', 'Mr Birling calls it unsinkable. Oops.']], 'Priestley’s message: collective social responsibility.'],
      ['Mr Birling says the Titanic is “unsinkable”. This is an example of…', 'dramatic irony', [['a metaphor', 'The audience knows something he does not: irony.'], ['pathetic fallacy', 'No weather involved.']], 'Dramatic irony makes Birling look foolish to the audience.']
    ]),
    C('poetry', 'Power and conflict poetry', 'GCSE Literature', ['Y10', 'Y11'], [
      ['“Ozymandias” by Shelley is mainly about…', 'the temporary nature of power', [['a happy holiday', 'It is a broken statue in a desert. Not a holiday.'], ['the sea', 'Sand, not sea.']], 'A ruined statue shows that human power does not last.'],
      ['In Blake’s “London”, the speaker sees…', 'suffering and oppression in the city', [['a beautiful park', 'Blake saw “marks of weakness, marks of woe”.'], ['a royal wedding', 'Not in this poem.']], 'Blake criticises institutions (church, monarchy) for people’s misery.'],
      ['“The Charge of the Light Brigade” is about…', 'a cavalry charge in the Crimean War', [['the Battle of Hastings', 'Wrong century: 1854, Crimea.'], ['a football match', 'Plumo likes the energy, but no.']], 'Tennyson honours soldiers who followed a disastrous order.'],
      ['Wilfred Owen’s “Exposure” suggests the real enemy is…', 'the weather', [['the sea', 'The trenches were freezing, not flooded.'], ['the generals', 'They are criticised elsewhere; here it is the cold.']], 'Owen shows soldiers suffering from freezing conditions in WW1.'],
      ['“My Last Duchess” is a…', 'dramatic monologue', [['sonnet', 'It is one speaker talking to a listener, in rhyming couplets.'], ['haiku', 'A haiku would be a LOT shorter.']], 'Browning’s Duke reveals his controlling nature as he speaks.'],
      ['Enjambment means…', 'a sentence runs on to the next line', [['a full stop at the end of every line', 'That is end-stopping.'], ['a pause in the middle of a line', 'That is caesura.']], 'Enjambment creates flow or a sense of things spilling over.']
    ]),
    C('alevel-lit', 'A level: literary terms', 'A level Literature', ['Y12', 'Y13'], [
      ['A narrator whose account we cannot fully trust is…', 'an unreliable narrator', [['an omniscient narrator', 'Omniscient narrators know everything, and are usually trusted.'], ['a chorus', 'That is from Greek drama.']], 'Unreliable narrators distort events (bias, ignorance, lies).'],
      ['Narration that slips into a character’s thoughts without quotation marks is…', 'free indirect discourse', [['direct speech', 'Direct speech needs inverted commas.'], ['stream of consciousness', 'Close cousin, but freer and more chaotic.']], 'Free indirect discourse blends narrator and character voice (Austen!).'],
      ['A turn in argument in a sonnet is called…', 'the volta', [['the caesura', 'A caesura is a pause within a line.'], ['the couplet', 'The couplet can contain the volta, but the turn itself is the volta.']], 'Petrarchan sonnets often turn after line 8.'],
      ['Which period is Gothic literature especially associated with?', 'the late 18th and 19th centuries', [['the 1990s', 'Some modern Gothic exists, but the roots are older.'], ['Ancient Rome', 'Too early: the Gothic novel begins in the 1760s.']], 'From Walpole (1764) to Shelley, Brontë, Stoker.'],
      ['Feminist criticism mainly looks at…', 'how texts represent women and gender', [['rhyme schemes', 'That is formal analysis.'], ['the price of the book', 'That would be economics.']], 'Critical lenses: feminist, Marxist, post-colonial, eco-critical…']
    ])
  ];
  E.ajouter({ id:'gb-english', nom:'English', ic:'📝', sous:'Grammar & spelling (SATs), reading, GCSE Language & Literature, A level',
    examens:{ Y6:'GPS-style quiz', Y11:'GCSE-style quiz', Y13:'A level-style quiz' }, chapitres });
})();
