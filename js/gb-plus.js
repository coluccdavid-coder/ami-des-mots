// Ami des mots — v6.1 : questions en plus pour le programme anglais (chaque chapitre doit tenir une série de 10).
(function(){
  'use strict';
  const E = window.ENGLAND; if(!E) return;
  const AJOUTS = {
    'gb-english':{
      'word-classes':[
        ['In “Plumo quickly ate the worm”, which word is the verb?', 'ate', [['quickly', 'That is the adverb: HOW he ate.'], ['worm', 'The worm is the noun. And lunch.']], 'Verbs are doing or being words.'],
        ['Which word is a coordinating conjunction?', 'but', [['because', 'Because is subordinating: it starts a subordinate clause.'], ['although', 'Subordinating again.']], 'FANBOYS: for, and, nor, but, or, yet, so.'],
        ['In “The very tall giraffe”, what is “very”?', 'an adverb', [['an adjective', '“Tall” is the adjective; “very” tells us how tall.'], ['a noun', 'Plumo has never seen a “very” at the zoo.']], 'Adverbs can modify adjectives.']],
      'tenses':[
        ['Which is the present progressive?', 'Plumo is reading a book.', [['Plumo reads a book.', 'Simple present.'], ['Plumo read a book.', 'Simple past.']], 'Present progressive = am/is/are + -ing.'],
        ['Change to the past: “She runs to school.”', 'She ran to school.', [['She runned to school.', 'Run is irregular: ran.'], ['She has ran to school.', 'Present perfect needs “run”: she has run.']], 'Irregular past: run → ran.'],
        ['Which is in the past perfect?', 'They had left before the rain started.', [['They left before the rain started.', 'Simple past. Past perfect needs “had”.'], ['They have left.', 'Present perfect.']], 'Past perfect = had + past participle.']],
      'punctuation':[
        ['Which uses commas correctly in a list?', 'I packed a torch, a map and some snacks.', [['I packed, a torch a map, and some snacks.', 'The commas wandered off on their own.'], ['I packed a torch a map and some snacks.', 'No commas: everything runs together.']], 'Commas separate items in a list.'],
        ['Which contraction is correct?', 'won’t', [['wo’nt', 'The apostrophe goes where the letters are missing.'], ['wont', 'Without the apostrophe, “wont” means a habit.']], 'Will not → won’t.'],
        ['Which sentence needs an exclamation mark?', 'What a fantastic goal', [['Where is my bag', 'That needs a question mark.'], ['I like apples', 'A full stop will do.']], 'Exclamations starting with “What” or “How” end with !']],
      'spelling':[
        ['Which is correct?', 'separate', [['seperate', 'There is “a rat” in sep-a-rate.'], ['separete', 'Nearly: sep-A-rate.']], 'Separate: there is a rat in it.'],
        ['Choose: “Plumo went ___ the forest.”', 'through', [['threw', '“Threw” is the past of throw.'], ['thorough', 'Thorough means careful and complete.']], 'Through = in one side and out the other.'],
        ['Which adds the suffix correctly?', 'hoping', [['hopping', 'Hopping is what rabbits do: hop + ing.'], ['hopeing', 'Drop the e before -ing.']], 'Words ending in silent e drop it before -ing.'],
        ['Which is correct?', 'accommodation', [['accomodation', 'Two c’s AND two m’s.'], ['acommodation', 'Two c’s please.']], 'Accommodation is big enough for two c’s and two m’s.']],
      'reading-skills':[
        ['“The house had been empty for years: dust lay thick, and the windows were cracked.” What mood is created?', 'eerie and abandoned', [['cheerful and busy', 'Nobody throws a party in a dusty house.'], ['sporty', 'Plumo sees no football here.']], 'Setting details create atmosphere.'],
        ['What does “devoured” suggest in “Leo devoured his dinner”?', 'he ate very quickly and hungrily', [['he cooked it', 'He ate it. Fast.'], ['he refused it', 'The opposite!']], 'Strong verbs show how something is done.'],
        ['Which question is a prediction question?', 'What do you think will happen next?', [['How old is Sam?', 'That is retrieval.'], ['Why is Sam upset?', 'That is inference.']], 'Predictions use clues to guess what happens next.'],
        ['A word that means the same as “enormous” is…', 'huge', [['tiny', 'That is the opposite, an antonym.'], ['careful', 'No link at all.']], 'Synonyms have similar meanings.']],
      'techniques':[
        ['Repeating a word or phrase for effect is called…', 'repetition', [['rhyme', 'Rhyme matches sounds at the ends of words.'], ['simile', 'A simile compares.']], 'Repetition emphasises an idea.']],
      'persuasive':[
        ['A group of three for effect (“quick, cheap and easy”) is…', 'a triplet (rule of three)', [['a statistic', 'No numbers here.'], ['an anecdote', 'No story either.']], 'The rule of three is memorable and persuasive.'],
        ['Using “we” and “us” to include the reader is…', 'direct address / inclusive language', [['passive voice', 'Passive voice is about sentence structure.'], ['onomatopoeia', 'No sound words here.']], 'Inclusive pronouns make readers feel involved.'],
        ['Which is an emotive phrase?', 'innocent animals suffering in silence', [['animals live in the zoo', 'Neutral. No emotions stirred.'], ['the zoo opens at 9', 'That is a timetable.']], 'Emotive language aims to make the reader feel something.']],
      'lang-paper':[
        ['In Paper 1 Question 4, you…', 'evaluate a statement about the text', [['write your own story', 'That is Question 5.'], ['list four things', 'That is Question 1.']], 'Q4: “To what extent do you agree?” – use evidence.'],
        ['Section B of each English Language paper is worth…', 'half of the marks (40 out of 80)', [['nothing', 'It is the biggest single question!'], ['5 marks', 'Much more than that.']], 'Writing = 40 marks: content and organisation + technical accuracy.'],
        ['Which is good evidence in a reading answer?', 'a short, precise quotation', [['the whole paragraph copied out', 'Too long: pick the key words.'], ['your opinion with no quotation', 'Evidence comes from the text.']], 'Embed short quotations and analyse the words.']],
      'macbeth':[
        ['What does Macbeth see before killing Duncan?', 'a floating dagger', [['a crown in the sky', 'Close in spirit, but it is a dagger.'], ['Banquo’s ghost', 'The ghost comes later, at the banquet.']], '“Is this a dagger which I see before me?” (Act 2).'],
        ['Which character is a foil to Macbeth?', 'Banquo', [['Duncan', 'Duncan is the king he betrays.'], ['the Porter', 'The Porter is comic relief.']], 'Banquo hears the prophecy too but does not act on it.']],
      'romeo':[
        ['Who is Juliet’s cousin, killed by Romeo?', 'Tybalt', [['Mercutio', 'Mercutio is Romeo’s friend.'], ['Benvolio', 'Benvolio tries to keep the peace.']], 'Romeo is banished after Tybalt’s death.'],
        ['Who does Juliet’s father want her to marry?', 'Paris', [['Romeo', 'Definitely not a Montague!'], ['Tybalt', 'He is her cousin.']], 'Lord Capulet arranges the match with Count Paris.'],
        ['What plan does Friar Laurence come up with?', 'a potion to make Juliet seem lifeless', [['escaping by boat', 'There is no boat.'], ['asking the Prince', 'He goes for a potion instead.']], 'The message to Romeo never arrives.']],
      'christmas-carol':[
        ['What is the name of Scrooge’s clerk?', 'Bob Cratchit', [['Fred', 'Fred is Scrooge’s nephew.'], ['Fezziwig', 'Fezziwig was Scrooge’s kind old boss.']], 'Bob works in a cold office for low pay.'],
        ['How is the novella divided?', 'into five staves', [['into chapters about ghosts', 'Dickens used “staves”, like a carol.'], ['into acts', 'It is a novella, not a play.']], 'Stave = verse of a song: fitting for a carol.'],
        ['What does Scrooge do on Christmas morning?', 'sends a huge turkey to the Cratchits', [['stays in bed', 'He jumps out of bed, delighted.'], ['raises Bob’s rent', 'The opposite: he raises Bob’s salary.']], 'Redemption: Scrooge becomes generous.']],
      'jekyll':[
        ['Who is Eva Smith in An Inspector Calls?', 'a young working-class woman whom each Birling (and Gerald) treated badly', [['the Inspector’s wife', 'No.'], ['Sheila’s friend from school', 'Sheila had her sacked from a shop.']], 'Each family member played a part in her story.'],
        ['Which character changes most in An Inspector Calls?', 'Sheila', [['Mr Birling', 'He learns nothing.'], ['Mrs Birling', 'She refuses to accept responsibility.']], 'The younger generation (Sheila, Eric) accept responsibility.']],
      'poetry':[
        ['Who wrote “Ozymandias”?', 'Percy Bysshe Shelley', [['William Blake', 'Blake wrote “London”.'], ['Wilfred Owen', 'Owen wrote “Exposure”.']], 'Shelley, 1818.'],
        ['In “Ozymandias”, what is left of the statue?', 'two legs and a broken face in the sand', [['a complete palace', 'Nothing remains around it.'], ['a golden crown', 'Only stone ruins remain.']], 'The sneer on the face survives; the empire does not.']],
      'alevel-lit':[
        ['A line of verse with ten syllables in five unstressed/stressed pairs is…', 'iambic pentameter', [['trochaic tetrameter', 'Four stressed/unstressed pairs.'], ['free verse', 'Free verse has no fixed metre.']], 'da-DUM × 5.'],
        ['Who wrote Frankenstein (1818)?', 'Mary Shelley', [['Bram Stoker', 'Stoker wrote Dracula (1897).'], ['Emily Brontë', 'She wrote Wuthering Heights (1847).']], 'A key Gothic and early science-fiction novel.'],
        ['Marxist criticism mainly looks at…', 'social class, power and money', [['metre and rhyme', 'That is formal analysis.'], ['the author’s pets', 'Plumo approves, but no.']], 'Who has power? Who is exploited?']]
    },
    'gb-biology':{
      'ks2-living':[
        ['What do plants need to make their food?', 'light, water and carbon dioxide', [['soil only', 'Soil gives minerals, not food.'], ['chocolate', 'Plants are not that lucky.']], 'Photosynthesis happens in the leaves.'],
        ['Which animal group lays eggs and has feathers?', 'birds', [['mammals', 'Mammals have fur and most give birth to live young.'], ['amphibians', 'Amphibians have moist skin, no feathers.']], 'Plumo is a bird. Obviously.'],
        ['What is a fossil?', 'the remains or traces of a living thing preserved in rock', [['a type of crystal', 'Crystals are not living remains.'], ['a very old tree', 'Old trees are still alive.']], 'Fossils give evidence for evolution.'],
        ['Which blood vessels carry blood back to the heart?', 'veins', [['arteries', 'Arteries carry it Away.'], ['nerves', 'Nerves carry signals.']], 'Heart → arteries → capillaries → veins → heart.']],
      'cells':[
        ['What does the cell wall do in a plant cell?', 'strengthens and supports the cell', [['makes food', 'That is the chloroplast.'], ['controls the cell', 'That is the nucleus.']], 'Made of cellulose.'],
        ['Specialised cells: which carries oxygen?', 'red blood cell', [['sperm cell', 'Its job is to reach the egg.'], ['root hair cell', 'It absorbs water.']], 'Red blood cells have no nucleus and contain haemoglobin.'],
        ['What are stem cells?', 'cells that can become many types of cell', [['cells found only in plant stems', 'Clever guess, but no.'], ['old cells', 'They are often found in embryos.']], 'Found in embryos, bone marrow and plant meristems.']],
      'transport':[
        ['In osmosis, water moves to where it is…', 'more concentrated in solutes', [['more dilute', 'Water moves FROM dilute solutions.'], ['warmer', 'Temperature is not the direction rule.']], 'Water moves to dilute the more concentrated solution.'],
        ['Why do root hair cells have a large surface area?', 'to absorb more water and minerals', [['to look nice', 'Plants do not care about looks.'], ['to make chlorophyll', 'Roots are underground: no light.']], 'Large surface area speeds up absorption.'],
        ['Gas exchange in the lungs happens in the…', 'alveoli', [['trachea', 'The trachea is the windpipe.'], ['stomach', 'Wrong system.']], 'Thin walls, big surface area, good blood supply.'],
        ['Which transports water up a plant?', 'xylem', [['phloem', 'Phloem carries sugars.'], ['stomata', 'Stomata are pores in the leaf.']], 'Xylem: water up. Phloem: food both ways.'],
        ['What is transpiration?', 'loss of water vapour from leaves', [['making glucose', 'That is photosynthesis.'], ['breathing in', 'Plants do not have lungs.']], 'Faster when hot, dry, windy and bright.']],
      'organisation':[
        ['Which organ produces insulin?', 'the pancreas', [['the liver', 'The liver stores glycogen.'], ['the heart', 'The heart pumps.']], 'Insulin lowers blood glucose.'],
        ['What do enzymes do?', 'speed up chemical reactions', [['make you taller', 'Not directly!'], ['stop all reactions', 'That would be bad.']], 'Enzymes are biological catalysts.'],
        ['What happens to an enzyme at very high temperature?', 'it denatures (the active site changes shape)', [['it works faster forever', 'Too hot and the shape breaks.'], ['it multiplies', 'Enzymes do not reproduce.']], 'The substrate no longer fits.'],
        ['Which chamber pumps blood to the body?', 'the left ventricle', [['the right atrium', 'The right atrium only receives from the body.'], ['the right ventricle', 'That one pumps to the lungs.']], 'Left ventricle has the thickest wall.']],
      'infection':[
        ['Which disease is caused by a virus?', 'measles', [['salmonella food poisoning', 'Caused by bacteria.'], ['athlete’s foot', 'Caused by a fungus.']], 'Viruses reproduce inside cells.'],
        ['Malaria is spread by…', 'mosquitoes', [['drinking milk', 'No.'], ['sneezing', 'Not airborne.']], 'Malaria is caused by a protist; mosquitoes are vectors.'],
        ['How does the skin defend the body?', 'it is a barrier against pathogens', [['it makes antibodies', 'Lymphocytes do that job.'], ['it digests germs', 'Not really.']], 'Also: nose hairs, mucus, stomach acid.'],
        ['Why should you finish a course of antibiotics?', 'to reduce antibiotic resistance', [['to make them taste better', 'They do not.'], ['to stop viruses', 'Antibiotics do not affect viruses.']], 'Surviving bacteria could become resistant (MRSA).'],
        ['Washing hands mainly prevents…', 'the spread of pathogens', [['tiredness', 'Nice try.'], ['short sight', 'No link.']], 'Hygiene stops pathogens passing on.']],
      'bioenergetics':[
        ['Where does photosynthesis happen?', 'in chloroplasts', [['in mitochondria', 'Respiration happens there.'], ['in the nucleus', 'The nucleus is the control centre.']], 'Chlorophyll absorbs light.'],
        ['Aerobic respiration word equation?', 'glucose + oxygen → carbon dioxide + water', [['glucose → lactic acid', 'That is anaerobic.'], ['carbon dioxide + water → glucose', 'That is photosynthesis.']], 'Releases energy; happens all the time.'],
        ['Yeast fermentation produces…', 'ethanol and carbon dioxide', [['lactic acid', 'That is muscles.'], ['oxygen', 'No oxygen is made.']], 'Used in bread and brewing.'],
        ['During exercise, breathing rate increases to…', 'supply more oxygen and remove carbon dioxide', [['cool the lungs', 'Not the main reason.'], ['make you talk faster', 'Plumo suspects not.']], 'Heart rate rises too.'],
        ['Plants use glucose to make…', 'cellulose, starch and proteins', [['plastic', 'No plastic in leaves.'], ['oxygen', 'Oxygen is a by-product of photosynthesis.']], 'Also used in respiration.']],
      'genetics':[
        ['A dominant allele is shown by…', 'a capital letter', [['a lowercase letter', 'Lowercase = recessive.'], ['a number', 'Alleles use letters.']], 'e.g. B (brown) is dominant over b.'],
        ['Genotype bb is…', 'homozygous recessive', [['heterozygous', 'That is Bb.'], ['homozygous dominant', 'That is BB.']], 'Homo = same, hetero = different.'],
        ['Meiosis produces…', 'four genetically different gametes', [['two identical body cells', 'That is mitosis.'], ['one giant cell', 'No.']], 'Gametes have half the chromosomes.'],
        ['Sex chromosomes of a typical male?', 'XY', [['XX', 'XX is female.'], ['YY', 'Not possible: the egg always gives an X.']], 'The sperm decides.']],
      'ecology':[
        ['A community plus its non-living environment is…', 'an ecosystem', [['a population', 'A population is one species.'], ['a habitat', 'A habitat is where an organism lives.']], 'Biotic + abiotic factors.'],
        ['Which is an abiotic factor?', 'temperature', [['predators', 'Living: biotic.'], ['disease', 'Caused by living pathogens: biotic.']], 'Abiotic = non-living.'],
        ['What do quadrats help estimate?', 'the population of plants in an area', [['the weather', 'Use a thermometer for that.'], ['the age of trees', 'Count rings for that.']], 'Random sampling with quadrats.'],
        ['Deforestation increases carbon dioxide because…', 'fewer trees take it in and burning releases it', [['trees make carbon dioxide only', 'Trees take in more CO₂ than they release.'], ['it rains less', 'Not the main reason.']], 'Also reduces biodiversity.'],
        ['Biodiversity is…', 'the variety of living organisms', [['the number of bins', 'Plumo loves recycling, but no.'], ['the size of one animal', 'No.']], 'High biodiversity makes ecosystems more stable.']]
    },
    'gb-chemistry':{
      'particles':[
        ['Changing from a gas to a liquid is…', 'condensation', [['evaporation', 'That is liquid → gas.'], ['freezing', 'Freezing is liquid → solid.']], 'Think of water on a cold window.'],
        ['Which can be separated by filtering?', 'sand and water', [['salt and water', 'Salt dissolves: use evaporation.'], ['ink colours', 'Use chromatography.']], 'Filtration removes insoluble solids.'],
        ['Is dissolving sugar a reversible change?', 'yes', [['no', 'Evaporate the water and the sugar comes back.'], ['only on Tuesdays', 'Chemistry works every day.']], 'Dissolving, melting and freezing are reversible.'],
        ['Burning wood is…', 'an irreversible change', [['a reversible change', 'You cannot un-burn ash.'], ['melting', 'Wood does not melt.']], 'New substances (ash, gases) are made.'],
        ['Which is a gas at room temperature?', 'oxygen', [['iron', 'Solid.'], ['water', 'Liquid.']], 'States depend on melting and boiling points.']],
      'atoms':[
        ['Group 7 elements are called…', 'halogens', [['alkali metals', 'Group 1.'], ['transition metals', 'They are in the middle block.']], 'Fluorine, chlorine, bromine, iodine.'],
        ['Noble gases are unreactive because…', 'they have a full outer shell', [['they are rare', 'Argon is about 1% of air!'], ['they are heavy', 'Helium is very light.']], 'Group 0.'],
        ['Rutherford’s gold foil experiment showed…', 'atoms have a small, dense, positive nucleus', [['atoms are solid balls', 'Most alpha particles went straight through.'], ['electrons are positive', 'Electrons are negative.']], 'It replaced the plum pudding model.']],
      'bonding':[
        ['Covalent bonds form when atoms…', 'share pairs of electrons', [['transfer electrons', 'That is ionic.'], ['share protons', 'Protons stay in the nucleus.']], 'Non-metal + non-metal.'],
        ['Why do metals conduct electricity?', 'delocalised electrons can move', [['they are cold', 'Temperature is not the reason.'], ['they contain ions that are fixed', 'Fixed ions cannot carry charge.']], 'A sea of delocalised electrons.'],
        ['Ionic compounds conduct when…', 'molten or dissolved', [['solid', 'In a solid, ions cannot move.'], ['never', 'They do, when ions can move.']], 'Ions must be free to move.'],
        ['Simple molecules like water have low boiling points because…', 'intermolecular forces are weak', [['covalent bonds are weak', 'The covalent bonds stay intact when boiling.'], ['they are metals', 'Water is not a metal.']], 'Boiling breaks forces BETWEEN molecules.'],
        ['Polymers are…', 'very large molecules made of repeating units', [['tiny single atoms', 'Polymers are huge.'], ['always liquids', 'Plastics are solid polymers.']], 'e.g. poly(ethene).']],
      'reactions':[
        ['Metal + acid → ?', 'salt + hydrogen', [['salt + water', 'That is acid + alkali (or base).'], ['metal oxide', 'That is metal + oxygen.']], 'e.g. magnesium + hydrochloric acid.'],
        ['Oxidation is…', 'gain of oxygen (or loss of electrons)', [['loss of oxygen', 'That is reduction.'], ['gain of electrons', 'That is reduction (OIL RIG).']], 'OIL RIG: Oxidation Is Loss, Reduction Is Gain (of electrons).'],
        ['Which metal is extracted using electrolysis?', 'aluminium', [['iron', 'Iron is extracted with carbon in a blast furnace.'], ['gold', 'Gold is found as the metal itself.']], 'Metals more reactive than carbon need electrolysis.']],
      'rates':[
        ['Powder reacts faster than lumps because…', 'it has a larger surface area', [['it is lighter', 'Mass is not the point.'], ['it is a different chemical', 'Same chemical, more exposed.']], 'More surface = more collisions.'],
        ['Increasing concentration increases rate because…', 'particles collide more often', [['particles get bigger', 'No.'], ['the temperature drops', 'Concentration does not cool things.']], 'More particles in the same volume.'],
        ['Le Chatelier: increasing pressure favours the side with…', 'fewer gas molecules', [['more gas molecules', 'The system tries to reduce the pressure.'], ['more heat', 'That is about temperature.']], 'The equilibrium shifts to oppose the change.'],
        ['Rate of reaction = ?', 'amount of reactant used (or product made) ÷ time', [['time ÷ amount', 'Upside down.'], ['mass × time', 'Units say no.']], 'Units: g/s or cm³/s.'],
        ['On a rate graph, a steeper slope means…', 'a faster reaction', [['a slower reaction', 'Steeper = faster.'], ['no reaction', 'A flat line means no reaction.']], 'The gradient is the rate.']],
      'organic':[
        ['Methane, ethane and propane are…', 'alkanes', [['alkenes', 'Alkenes end in -ene.'], ['alcohols', 'Alcohols end in -ol.']], 'The -ane ending gives it away.'],
        ['Complete combustion of a hydrocarbon produces…', 'carbon dioxide and water', [['carbon monoxide only', 'That is incomplete combustion.'], ['hydrogen', 'Hydrogen is not made.']], 'Needs plenty of oxygen.'],
        ['Cracking breaks long hydrocarbons into…', 'shorter, more useful alkanes and alkenes', [['atoms', 'Not that far.'], ['salt', 'No salt here.']], 'Uses heat and a catalyst.'],
        ['Which gas makes up about 78% of today’s air?', 'nitrogen', [['oxygen', 'Oxygen is about 21%.'], ['carbon dioxide', 'Only about 0.04%.']], 'Nitrogen ~78%, oxygen ~21%, argon ~0.9%.'],
        ['Ethanol is an…', 'alcohol', [['alkane', 'Ethane is the alkane.'], ['acid', 'Ethanoic acid is the acid.']], 'Functional group −OH.']]
    },
    'gb-physics':{
      'ks2-light':[
        ['A shadow forms when…', 'an opaque object blocks light', [['light bends round an object', 'Then there would be no shadow.'], ['the Sun turns off', 'The Sun has no switch.']], 'Opaque objects do not let light through.'],
        ['Which material is a good electrical conductor?', 'copper', [['plastic', 'Plastic is an insulator.'], ['wood', 'Wood is an insulator.']], 'Wires are made of copper.'],
        ['The symbol for a cell in a circuit diagram is…', 'a long line and a short line', [['a circle with a cross', 'That is a lamp.'], ['a zigzag', 'That is often used for a resistor.']], 'The long line is the positive terminal.'],
        ['A mirror works by…', 'reflecting light', [['absorbing light', 'Black surfaces absorb.'], ['making light', 'Mirrors are not light sources.']], 'Angle of incidence = angle of reflection.'],
        ['What happens if a switch is open?', 'the circuit is broken and the bulb goes off', [['the bulb gets brighter', 'No current flows.'], ['the battery charges', 'No.']], 'Current needs a complete circuit.']],
      'waves':[
        ['The frequency of a wave is measured in…', 'hertz (Hz)', [['metres', 'Wavelength is in metres.'], ['decibels', 'Loudness is in decibels.']], '1 Hz = one wave per second.'],
        ['Which EM wave is used in TV remote controls?', 'infrared', [['gamma rays', 'Far too dangerous for a sofa.'], ['X-rays', 'X-rays are for medical imaging.']], 'Infrared is also used in thermal cameras.'],
        ['Refraction happens because waves…', 'change speed in a new medium', [['get louder', 'Loudness is amplitude.'], ['stop', 'They keep going, just in a new direction.']], 'Light slows down entering glass and bends towards the normal.'],
        ['Which EM wave can cause sunburn?', 'ultraviolet', [['radio waves', 'Harmless at normal levels.'], ['microwaves', 'Not from the Sun’s rays like that.']], 'Wear sunscreen, says Plumo. 🧴'],
        ['The amplitude of a wave is…', 'the maximum displacement from rest', [['the distance between two crests', 'That is the wavelength.'], ['the number of waves per second', 'That is frequency.']], 'Bigger amplitude = more energy.']],
      'atomic-space':[
        ['What is an alpha particle made of?', '2 protons and 2 neutrons', [['an electron', 'That is beta.'], ['a light wave', 'That is gamma.']], 'Same as a helium nucleus.'],
        ['Which planet is closest to the Sun?', 'Mercury', [['Venus', 'Venus is second.'], ['Mars', 'Mars is fourth.']], 'Mercury, Venus, Earth, Mars, Jupiter, Saturn, Uranus, Neptune.'],
        ['Red-shift of distant galaxies is evidence for…', 'the Big Bang (expanding universe)', [['a flat Earth', 'Plumo has flown high enough to say no.'], ['the Moon moving closer', 'The Moon is actually moving slowly away.']], 'Further galaxies recede faster.'],
        ['Nuclear fission is…', 'splitting a large nucleus', [['joining small nuclei', 'That is fusion.'], ['burning coal', 'That is chemical.']], 'Used in nuclear power stations.']]
    },
    'gb-history':{
      'ks2-history':[
        ['Which city did the Romans call Londinium?', 'London', [['Liverpool', 'No Roman port by that name.'], ['Paris', 'That was Lutetia.']], 'Founded around AD 47.'],
        ['Where did the Vikings mainly come from?', 'Scandinavia (Norway, Denmark, Sweden)', [['Italy', 'That was the Romans.'], ['Australia', 'Far too far by longship.']], 'Viking raids on Britain began around 793 (Lindisfarne).'],
        ['What was found at Sutton Hoo?', 'an Anglo-Saxon ship burial', [['a Roman villa', 'Different site.'], ['a Viking castle', 'Vikings did not build castles there.']], 'Discovered in Suffolk in 1939, with a famous helmet.'],
        ['When did the Romans first invade Britain successfully under Claudius?', 'AD 43', [['1066', 'That is the Normans.'], ['AD 1500', 'Far too late.']], 'Julius Caesar’s earlier visits did not conquer Britain.'],
        ['Stonehenge was built in the…', 'Stone Age (Neolithic) and Bronze Age', [['Roman era', 'Much older than the Romans.'], ['Victorian era', 'Thousands of years older.']], 'Built in stages from around 3000 BC.']],
      'medieval':[
        ['Why did William build motte-and-bailey castles?', 'to control the land after the conquest', [['as holiday homes', 'Plumo doubts it was a holiday.'], ['for the Olympics', 'Wrong millennium.']], 'Quick to build, easy to defend.'],
        ['The feudal system had who at the top?', 'the king', [['the peasants', 'They were at the bottom.'], ['the knights', 'Knights were below the barons.']], 'King → barons → knights → peasants.'],
        ['Thomas Becket was archbishop of…', 'Canterbury', [['York', 'Different archbishop.'], ['Rome', 'Rome has the Pope.']], 'He quarrelled with Henry II; killed in 1170.']],
      'tudors':[
        ['How many wives did Henry VIII have?', 'six', [['two', 'Many more.'], ['ten', 'Not quite that many.']], 'Divorced, beheaded, died, divorced, beheaded, survived.'],
        ['Who was the first Tudor king?', 'Henry VII', [['Henry VIII', 'He was the second.'], ['Richard III', 'Richard was the last Yorkist king.']], 'Henry Tudor won at Bosworth, 1485.'],
        ['Who was monarch when Shakespeare wrote Macbeth?', 'James I', [['Elizabeth I', 'She died in 1603; Macbeth is about 1606.'], ['Victoria', 'Far too late.']], 'Macbeth flatters James (Banquo’s descendants).']],
      'industrial':[
        ['Where did many people move to during the Industrial Revolution?', 'towns and cities', [['the Moon', 'Not yet.'], ['farms', 'Many LEFT farms for factory work.']], 'Urbanisation: Manchester grew fast.'],
        ['Which famous railway opened in 1830?', 'the Liverpool and Manchester Railway', [['the London Underground', 'That opened in 1863.'], ['the Eurostar', 'That opened in 1994.']], 'The first intercity passenger railway with steam trains.'],
        ['Child labour in factories was limited by…', 'the Factory Acts (from 1833)', [['Magna Carta', 'That is 1215.'], ['the NHS', 'The NHS is 1948.']], 'The 1833 Act limited hours for children in textile mills.'],
        ['Who built bridges, tunnels and the Great Western Railway?', 'Isambard Kingdom Brunel', [['Charles Darwin', 'He studied finches.'], ['Robert Peel', 'He founded the Metropolitan Police.']], 'Brunel, a famous Victorian engineer.'],
        ['Which empire was described as the one “on which the sun never sets”?', 'the British Empire', [['the Roman Empire', 'Big, but not that big.'], ['the Viking Empire', 'Not an empire like that.']], 'At its height it covered about a quarter of the world.']],
      'world-wars':[
        ['What was D-Day (6 June 1944)?', 'the Allied landings in Normandy', [['the end of WW1', 'That was 1918.'], ['the Blitz', 'That was 1940–41.']], 'The largest seaborne invasion in history.'],
        ['What was rationing?', 'limiting food and goods so everyone got a fair share', [['a new sport', 'No.'], ['a type of tank', 'No.']], 'Ration books in Britain from 1940.'],
        ['Which battle in 1916 is remembered for huge losses on its first day?', 'the Somme', [['Hastings', 'That is 1066.'], ['Britain', 'The Battle of Britain was 1940, in the air.']], '1 July 1916.']],
      'germany':[
        ['What was the Treaty of Versailles’ “war guilt” clause?', 'Germany had to accept blame for the war', [['Germany won the war', 'Germany lost.'], ['Germany got new colonies', 'It lost its colonies.']], 'Article 231.'],
        ['What was the Reichstag?', 'the German parliament', [['a German castle', 'It is a parliament building.'], ['a type of money', 'The currency was the mark.']], 'The Reichstag fire was in 1933.'],
        ['Kristallnacht (1938) was…', 'a night of attacks on Jewish homes, shops and synagogues', [['a festival', 'Absolutely not.'], ['an election', 'No.']], 'November 1938.'],
        ['What was the Hitler Youth?', 'a Nazi organisation for young people', [['a football club', 'No.'], ['a school exam', 'No.']], 'Used to spread Nazi ideas.'],
        ['When did Germany become a democracy after the First World War?', '1919', [['1890', 'Germany had a Kaiser then.'], ['1945', 'West Germany’s democracy came after WW2, but Weimar began in 1919.']], 'The Weimar Constitution, 1919.']],
      'cold-war':[
        ['NATO was founded in…', '1949', [['1989', 'That is when the Berlin Wall fell.'], ['1914', 'That is WW1.']], 'A Western military alliance.'],
        ['The Warsaw Pact was…', 'the Soviet-led alliance in Eastern Europe', [['a peace treaty after WW1', 'That was Versailles.'], ['a trade deal with the USA', 'No.']], 'Founded in 1955.'],
        ['When did the Soviet Union break up?', '1991', [['1961', 'That is the Berlin Wall being built.'], ['1945', 'That is the end of WW2.']], 'December 1991.'],
        ['The Berlin Airlift (1948–49) supplied…', 'West Berlin by air', [['Moscow', 'Wrong city.'], ['London', 'London was not blockaded.']], 'The Soviets blockaded roads and railways.'],
        ['The “Iron Curtain” was a phrase used by…', 'Winston Churchill', [['Abraham Lincoln', 'Different century.'], ['Napoleon', 'Different century, different country.']], 'Speech in Fulton, Missouri, 1946.']],
      'medicine':[
        ['Who proved germ theory in the 1860s?', 'Louis Pasteur', [['Edward Jenner', 'Jenner did vaccination in 1796.'], ['Hippocrates', 'Ancient Greek, believed in the four humours.']], 'Germs cause disease.'],
        ['Joseph Lister is famous for…', 'antiseptic surgery using carbolic acid', [['the first X-ray', 'That was Röntgen.'], ['founding the NHS', 'That was Bevan.']], '1860s.'],
        ['John Snow linked cholera to…', 'a contaminated water pump', [['bad smells (miasma)', 'Many thought so, but Snow showed it was the water.'], ['cats', 'Plumo defends cats here.']], 'Broad Street, London, 1854.'],
        ['The theory of the four humours came from…', 'Hippocrates and Galen', [['Pasteur', 'Pasteur disproved the old ideas.'], ['Fleming', 'Fleming found penicillin.']], 'Blood, phlegm, yellow bile, black bile.'],
        ['Who reformed nursing in the Crimean War?', 'Florence Nightingale', [['Mary Seacole', 'Seacole also cared for soldiers, independently.'], ['Elizabeth I', 'Wrong century.']], 'Hygiene at Scutari hospital.']]
    },
    'gb-geography':{
      'maps':[
        ['Which direction is opposite north-east?', 'south-west', [['north-west', 'Opposite means a half turn.'], ['south-east', 'Only half right.']], 'Compass points.'],
        ['A six-figure grid reference is more…', 'precise than a four-figure one', [['vague', 'More digits = more precise.'], ['colourful', 'Colour is not involved.']], 'Six figures point to a spot within a square.'],
        ['On a map, a blue line usually shows…', 'a river or stream', [['a motorway', 'Motorways are blue on OS maps too, but thicker and labelled M.'], ['a forest', 'Forests are green.']], 'Check the key.'],
        ['Which continent is the UK in?', 'Europe', [['Asia', 'No.'], ['Africa', 'No.']], 'The UK is an island country in north-west Europe.'],
        ['What is the capital of Wales?', 'Cardiff', [['Swansea', 'Big city, not the capital.'], ['Edinburgh', 'That is Scotland.']], 'England: London, Scotland: Edinburgh, NI: Belfast.']],
      'hazards':[
        ['The Richter or moment magnitude scale measures…', 'earthquake strength', [['wind speed', 'Wind uses the Beaufort scale.'], ['rainfall', 'Rainfall uses millimetres.']], 'Each step is about 10× bigger shaking.'],
        ['Which is a way to reduce earthquake damage?', 'earthquake-resistant buildings', [['painting houses red', 'Pretty, but not helpful.'], ['banning maps', 'No.']], 'Prediction, protection, planning.'],
        ['Iceland is on which type of plate margin?', 'constructive', [['destructive', 'Plates move apart there.'], ['conservative', 'No.']], 'The Mid-Atlantic Ridge.'],
        ['Why do people live near volcanoes?', 'fertile soil, tourism and geothermal energy', [['because it is cold', 'Not the reason.'], ['they cannot leave', 'Most choose to stay for the benefits.']], 'Risk vs reward.'],
        ['A tropical storm’s calm centre is the…', 'eye', [['tail', 'Storms do not have tails.'], ['wall', 'The eyewall surrounds it with the strongest winds.']], 'Rotating storms spin around the eye.']],
      'rivers-coasts':[
        ['The source of a river is…', 'where it begins', [['where it meets the sea', 'That is the mouth.'], ['its widest point', 'No.']], 'Often in hills or mountains.'],
        ['Hydraulic action is…', 'the force of water breaking rock', [['rocks hitting each other', 'That is attrition.'], ['chemicals dissolving rock', 'That is solution.']], 'Erosion processes: hydraulic action, abrasion, attrition, solution.'],
        ['Which is a hard engineering coastal defence?', 'a sea wall', [['beach nourishment', 'That is soft engineering.'], ['planting dunes', 'Soft engineering again.']], 'Hard engineering uses built structures.'],
        ['A waterfall forms where…', 'hard rock lies over soft rock', [['the river is flat', 'Flat rivers meander.'], ['the sea is warm', 'Not related.']], 'Soft rock erodes faster, creating an overhang.']],
      'urban-dev':[
        ['A megacity has more than…', '10 million people', [['10,000 people', 'That is a small town.'], ['1 billion people', 'No city is that big.']], 'Examples: Tokyo, Lagos, Mumbai.'],
        ['Brownfield sites are…', 'previously built-on land', [['untouched countryside', 'That is greenfield.'], ['brown fields of crops', 'Nice idea, wrong meaning.']], 'Reusing them protects the countryside.'],
        ['Which is a sign of a high-income country (HIC)?', 'high life expectancy', [['very high birth rate', 'Typical of lower-income countries.'], ['most people farming', 'Typical of LICs.']], 'The UK is an HIC.'],
        ['Fairtrade aims to…', 'give producers a fair price', [['make products cheaper for shoppers', 'They can cost a little more.'], ['ban trade', 'The opposite.']], 'Helps farmers in poorer countries.'],
        ['What is a “food desert”?', 'an area with poor access to fresh, affordable food', [['a sandy desert with food', 'Plumo is disappointed too.'], ['a big supermarket', 'The opposite.']], 'A challenge in some UK cities.'],
        ['The demographic transition model shows changes in…', 'birth and death rates over time', [['rainfall', 'That is a climate graph.'], ['house prices', 'No.']], 'Five stages.'],
        ['Which is an example of sustainable urban living?', 'cycle lanes and public transport', [['more traffic jams', 'Plumo coughs.'], ['building on every park', 'Not sustainable.']], 'Reduce car use, recycle, green spaces.'],
        ['What is the North–South divide in the UK?', 'differences in wealth and health between regions', [['the border with Scotland', 'That is a border, not the divide.'], ['a football rivalry', 'Fun, but no.']], 'Linked to economic change.']],
      'climate':[
        ['Weather is…', 'the day-to-day state of the atmosphere', [['the average over 30 years', 'That is climate.'], ['the same everywhere', 'Definitely not.']], 'Climate = long-term average.'],
        ['A natural cause of climate change is…', 'volcanic eruptions', [['driving cars', 'That is human.'], ['deforestation', 'That is human.']], 'Also variations in the Earth’s orbit and solar output.'],
        ['Which is a way to mitigate climate change?', 'using renewable energy', [['burning more coal', 'That makes it worse.'], ['building more airports', 'That increases emissions.']], 'Mitigation reduces the causes; adaptation copes with effects.'],
        ['Relief rainfall happens when…', 'air rises over mountains and cools', [['air sinks', 'Sinking air is dry.'], ['the sea freezes', 'No.']], 'Common in western Britain.'],
        ['Which part of the UK is usually wettest?', 'the west', [['the east', 'The east is drier: rain shadow.'], ['London', 'London is fairly dry.']], 'Prevailing winds come from the south-west.'],
        ['Global temperatures have risen by about how much since the late 1800s?', 'around 1 °C or more', [['about 20 °C', 'That would be extreme.'], ['not at all', 'Records show warming.']], 'The rise is linked to greenhouse gases.']]
    },
    'gb-citizenship':{
      'parliament':[
        ['How many MPs are there in the House of Commons?', '650', [['100', 'That is the US Senate.'], ['50', 'Far more.']], 'One per constituency.'],
        ['Who leads the government in the UK?', 'the Prime Minister', [['the King', 'The King is head of state, not of government.'], ['the Mayor of London', 'Only London.']], 'The PM leads the party with most MPs.'],
        ['A bill becomes an Act after…', 'both Houses agree and it gets Royal Assent', [['one tweet', 'Plumo wishes laws were that simple.'], ['the Prime Minister signs it', 'The monarch gives Royal Assent.']], 'Commons, Lords, Royal Assent.'],
        ['Which system is used for UK general elections?', 'first past the post', [['proportional representation', 'Used in Scotland and Wales for their parliaments, not general elections.'], ['a lottery', 'No.']], 'The candidate with most votes in each constituency wins.']],
      'rights-law':[
        ['The age of criminal responsibility in England and Wales is…', '10', [['18', 'Much lower in England and Wales.'], ['16', 'Lower.']], 'One of the lowest in Europe.'],
        ['A magistrates’ court deals with…', 'less serious cases', [['only murders', 'Serious cases go to the Crown Court.'], ['football matches', 'No.']], 'Most criminal cases start there.'],
        ['What is a budget?', 'a plan for spending and saving money', [['a type of bird', 'That is a budgie. Plumo knows one.'], ['a bank', 'No.']], 'Income − spending = savings.'],
        ['Which is a human right in the European Convention on Human Rights?', 'freedom of expression', [['the right to free sweets', 'Plumo wishes.'], ['the right to skip school', 'Education is a right, not skipping it.']], 'The Human Rights Act 1998 brings it into UK law.'],
        ['What does a trade union do?', 'represents workers', [['sells trade goods', 'No.'], ['runs the government', 'No.']], 'Negotiates pay and conditions.']],
      'religions':[
        ['Where do Jewish people worship?', 'a synagogue', [['a gurdwara', 'That is Sikh.'], ['a mosque', 'That is Muslim.']], 'Shabbat begins on Friday evening.'],
        ['Which is the holy book of Christianity?', 'the Bible', [['the Vedas', 'Hindu scriptures.'], ['the Tripitaka', 'Buddhist scriptures.']], 'Old and New Testaments.'],
        ['Sikhs wear the 5 Ks, including…', 'kesh (uncut hair)', [['a cross', 'That is Christian.'], ['a prayer mat', 'That is used in Islam.']], 'Kesh, kara, kangha, kachera, kirpan.'],
        ['What is Ramadan?', 'a month of fasting in Islam', [['a Hindu festival of colours', 'That is Holi.'], ['a Christian feast', 'No.']], 'Ends with Eid al-Fitr.']]
    },
    'gb-computing':{
      'units':[
        ['How many bytes in a kilobyte (as used in GCSE)?', '1000', [['8', 'That is bits in a byte.'], ['100', 'Ten times too few.']], 'GCSE uses 1 kB = 1000 bytes (1 KiB = 1024).'],
        ['A pixel is…', 'the smallest element of a digital image', [['a type of mouse', 'No.'], ['a sound sample', 'That is a sample.']], 'Picture element.'],
        ['Increasing the sample rate of a sound file…', 'improves quality and increases file size', [['makes it shorter', 'Same length, more samples.'], ['removes the sound', 'No.']], 'Size = sample rate × bit depth × seconds.'],
        ['ASCII uses how many bits per character (standard)?', '7', [['64', 'Far too many.'], ['2', 'Only 4 characters with 2 bits!']], 'Extended ASCII uses 8; Unicode uses more.']],
      'algorithms':[
        ['A flowchart diamond shows…', 'a decision', [['the start', 'Start/stop use rounded shapes.'], ['an input', 'Inputs use parallelograms.']], 'Yes/No branches.'],
        ['Decomposition means…', 'breaking a problem into smaller parts', [['ignoring details', 'That is abstraction.'], ['making it longer', 'No.']], 'A key part of computational thinking.'],
        ['Abstraction means…', 'removing unnecessary detail', [['adding detail', 'The opposite.'], ['drawing a picture', 'Not necessarily.']], 'Like a Tube map.']],
      'systems-networks':[
        ['Which is an input device?', 'keyboard', [['monitor', 'Output.'], ['speaker', 'Output.']], 'Inputs send data into the computer.'],
        ['A LAN covers…', 'a small area like a school', [['the whole world', 'That is closer to a WAN (the internet).'], ['only one cable', 'More than that.']], 'Local Area Network.'],
        ['A firewall…', 'monitors and filters network traffic', [['puts out fires', 'Plumo loves the literal reading.'], ['speeds up Wi-Fi', 'No.']], 'Blocks unauthorised access.']],
      'sql-ethics':[
        ['Which SQL keyword filters rows?', 'WHERE', [['SELECT', 'SELECT chooses columns.'], ['ORDER BY', 'That sorts.']], 'SELECT name FROM pupils WHERE year = 11;'],
        ['A record in a database is…', 'one row', [['one column', 'That is a field.'], ['the whole database', 'Much smaller.']], 'Fields are columns; records are rows.'],
        ['The Computer Misuse Act makes it illegal to…', 'access a computer without permission', [['use a computer at night', 'No.'], ['play games', 'Not illegal!']], 'Hacking is a criminal offence.'],
        ['E-waste is a problem because…', 'old devices contain toxic materials', [['it is too light', 'No.'], ['it is invisible', 'It is very visible.']], 'Recycle devices properly.'],
        ['Which is an ethical issue with AI?', 'bias in training data', [['it is always correct', 'It is not!'], ['it needs a keyboard', 'No.']], 'Also privacy and jobs.']]
    },
    'gb-french':{
      'basics':[
        ['How do you say “My name is Sam”?', 'Je m’appelle Sam.', [['Mon nom s’appelle Sam.', 'Your name does not call itself!'], ['Je suis appelle Sam.', 'Use the reflexive verb s’appeler.']], 'Je m’appelle…'],
        ['“Mercredi” is…', 'Wednesday', [['Monday', 'Lundi.'], ['Friday', 'Vendredi.']], 'Lundi, mardi, mercredi, jeudi, vendredi, samedi, dimanche.'],
        ['“Soixante-dix” means…', '70', [['60', 'Soixante is 60; soixante-dix adds 10.'], ['67', 'Close, but no.']], '60 + 10 = 70.'],
        ['“J’habite à Londres” means…', 'I live in London', [['I have London', 'Habiter means to live.'], ['I’m going to London', 'That would be je vais.']], 'à + city.']],
      'verbs':[
        ['Past participle of “faire”?', 'fait', [['faisé', 'Faire is irregular.'], ['fai', 'Missing the t.']], 'J’ai fait mes devoirs.'],
        ['“Je ___ français.” (parler)', 'parle', [['parles', 'That is tu.'], ['parlons', 'That is nous.']], '-er verbs: je parle, tu parles, il parle…'],
        ['“Quand j’étais petit, je ___ au parc.” (jouer, imperfect)', 'jouais', [['ai joué', 'Repeated past habit = imperfect.'], ['joue', 'That is the present.']], 'Imperfect for “used to”.']],
      'topics':[
        ['“Mon collège est grand mais l’uniforme est moche.” What does the speaker think of the uniform?', 'they dislike it', [['they love it', 'Moche means ugly.'], ['they have no opinion', 'They clearly have one!']], 'Moche = ugly. Watch for “mais”.'],
        ['“Je voudrais être médecin.”', 'I would like to be a doctor.', [['I was a doctor.', 'Voudrais is conditional: would like.'], ['I want a doctor.', 'Être = to be.']], 'Jobs: no article after être.'],
        ['“Le recyclage” means…', 'recycling', [['bicycle', 'That is le vélo.'], ['rubbish', 'That is les déchets.']], 'Environment vocabulary.'],
        ['“Je me lève à sept heures.”', 'I get up at seven.', [['I go to bed at seven.', 'That is je me couche.'], ['I wash at seven.', 'That is je me lave.']], 'Reflexive verbs for daily routine.']],
      'exam-2026':[
        ['In the new speaking exam, one task is…', 'reading aloud a short text', [['singing', 'Plumo would love that, but no.'], ['drawing', 'No drawing.']], 'Reading aloud, then answering questions.'],
        ['In the dictation, you get credit for…', 'accurate spelling', [['nice handwriting only', 'Spelling is what counts.'], ['using English', 'Write in French!']], 'Sound–symbol knowledge helps.'],
        ['The reading paper includes…', 'a translation from French into English', [['a maths question', 'No.'], ['a poem to write', 'No.']], 'The writing paper includes translation into French.'],
        ['How many papers does the GCSE have?', 'four: listening, speaking, reading, writing', [['one', 'One for each skill.'], ['ten', 'Phew, no.']], 'Each worth 25%.'],
        ['“Il y a” means…', 'there is / there are', [['he has', 'That is il a.'], ['he goes', 'That is il va.']], 'Il y a un parc.']]
    },
    'gb-economics':{
      'micro':[
        ['Opportunity cost is…', 'the next best alternative given up', [['the price of a good', 'Not exactly.'], ['a discount', 'No.']], 'Every choice has an opportunity cost.'],
        ['A minimum price above equilibrium causes…', 'excess supply', [['excess demand', 'That is a maximum price below equilibrium.'], ['nothing', 'It changes the market.']], 'e.g. minimum wage, minimum alcohol prices.'],
        ['A monopoly is a market with…', 'one dominant firm', [['many small firms', 'That is perfect competition.'], ['no firms', 'Then there is no market.']], 'In the UK, a 25% share can count as a legal monopoly.'],
        ['An indirect tax shifts the supply curve…', 'to the left (upwards)', [['to the right', 'It raises costs.'], ['nowhere', 'It shifts.']], 'Price rises, quantity falls.']],
      'macro':[
        ['Unemployment is measured in the UK mainly by…', 'the Labour Force Survey (ILO measure)', [['counting cars', 'No.'], ['school exams', 'No.']], 'ILO definition: available and looking for work.'],
        ['A trade deficit means…', 'imports are greater than exports', [['exports are greater than imports', 'That is a surplus.'], ['no trade', 'Trade still happens.']], 'Part of the current account.'],
        ['Quantitative easing is…', 'the central bank creating money to buy assets', [['a type of tax', 'No.'], ['cutting school days', 'No.']], 'Used after 2008 and in 2020.'],
        ['A recession is…', 'two consecutive quarters of negative growth', [['one bad day on the stock market', 'Not enough.'], ['high inflation', 'Different problem.']], 'Common definition used in the UK.']]
    },
    'gb-psychology':{
      'memory':[
        ['Baddeley and Hitch proposed the…', 'working memory model', [['multi-store model', 'That is Atkinson and Shiffrin.'], ['Strange Situation', 'That is Ainsworth.']], 'Central executive, phonological loop, visuo-spatial sketchpad, episodic buffer.'],
        ['Forgetting because new information disrupts old is…', 'retroactive interference', [['proactive interference', 'That is old disrupting new.'], ['retrieval success', 'No.']], 'Interference theory.'],
        ['Loftus and Palmer studied…', 'eyewitness testimony and leading questions', [['obedience', 'That is Milgram.'], ['dreams', 'No.']], '“Smashed” vs “hit” changed speed estimates.'],
        ['Harlow’s monkeys preferred…', 'the soft cloth “mother”', [['the wire mother with food', 'They only went there to feed.'], ['no mother', 'No.']], 'Comfort mattered more than food.'],
        ['Long-term memory capacity is thought to be…', 'potentially unlimited', [['7 items', 'That is short-term memory.'], ['zero', 'Then we could not remember anything.']], 'Duration: up to a lifetime.']],
      'social':[
        ['Zimbardo’s Stanford study looked at…', 'social roles (prisoners and guards)', [['memory', 'No.'], ['attachment', 'No.']], 'Ended early after six days.'],
        ['Minority influence works best when the minority is…', 'consistent', [['inconsistent', 'Changing views reduce influence.'], ['silent', 'They need to speak up.']], 'Consistency, commitment, flexibility.'],
        ['Ethical guidelines require informed…', 'consent', [['payment', 'Not required.'], ['punishment', 'Never.']], 'Also right to withdraw, debriefing, confidentiality.'],
        ['A sample where everyone has an equal chance of being picked is…', 'a random sample', [['an opportunity sample', 'That is whoever is available.'], ['a volunteer sample', 'People choose themselves.']], 'Random sampling reduces bias.']]
    }
  };
  for(const [id, chs] of Object.entries(AJOUTS)){ const m = E.trouver(id); if(!m) continue;
    for(const [c, l] of Object.entries(chs)){ const ch = m.chapitres.find(x => x.id === c); if(ch && l && ch.banque) ch.banque.push(...l); } }
})();
