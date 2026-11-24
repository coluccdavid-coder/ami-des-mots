// Ami des mots — v6.2 : questions en plus pour les chapitres ajoutés au programme officiel (chacun tient une série de 10).
(function(){
  'use strict';
  const E = window.ENGLAND; if(!E) return;
  const A = {
    'gb-maths':{
      'similarity-vectors':[
        ['Angles in the same segment are…', 'equal', [['supplementary', 'That is opposite angles in a cyclic quadrilateral.'], ['always 90°', 'Only in a semicircle.']], 'Circle theorem: same arc, same angle.'],
        ['Two tangents from a point outside a circle are…', 'equal in length', [['perpendicular', 'Not to each other.'], ['parallel', 'They meet at the point.']], 'Tangents from an external point.'],
        ['Similar shapes have…', 'equal angles and proportional sides', [['equal sides', 'That is congruent.'], ['the same area', 'Not unless congruent.']], 'Scale factor = new length ÷ old length.'],
        ['If AB = (4, −2), what is 2AB?', '(8, −4)', [['(6, 0)', 'Multiply each part by 2.'], ['(8, −2)', 'Both components double.']], 'Scalar multiplication.']],
      'functions-graphs':[
        ['y = x³ is a…', 'cubic graph', [['quadratic graph', 'Quadratics have x².'], ['straight line', 'No.']], 'S-shaped curve.'],
        ['Where does y = 2x + 3 cross the y-axis?', '(0, 3)', [['(3, 0)', 'Swap them: x = 0 on the y-axis.'], ['(0, 2)', '2 is the gradient.']], 'The y-intercept is c.'],
        ['Parallel lines have the same…', 'gradient', [['y-intercept', 'Then they would be the same line.'], ['length', 'Lines go on forever.']], 'Perpendicular gradients multiply to −1.'],
        ['The roots of a quadratic are where the graph…', 'crosses the x-axis', [['crosses the y-axis', 'That is the y-intercept.'], ['turns', 'That is the turning point.']], 'Solve y = 0.']],
      'data-probability-h':[
        ['A tree diagram’s branches from one point add up to…', '1', [['0.5', 'All outcomes together are certain.'], ['100', 'Only if you use percentages.']], 'Multiply along, add down.'],
        ['The interquartile range is…', 'upper quartile − lower quartile', [['max − min', 'That is the range.'], ['the median', 'No.']], 'Shows the spread of the middle 50%.'],
        ['A box plot shows…', 'minimum, quartiles, median and maximum', [['the mean only', 'No mean on a box plot.'], ['every value', 'No.']], 'Five-number summary.']],
      'trig-alevel':[
        ['sin 30° = ?', '1/2', [['√3/2', 'That is cos 30° (or sin 60°).'], ['1', 'That is sin 90°.']], 'Exact values.'],
        ['ln(e) = ?', '1', [['0', 'ln 1 = 0.'], ['e', 'ln undoes e.']], 'ln and e are inverses.'],
        ['The nth term of a geometric sequence is…', 'arⁿ⁻¹', [['a + (n − 1)d', 'That is arithmetic.'], ['n²', 'No.']], 'a = first term, r = common ratio.']],
      'stats-mech-alevel':[
        ['In a large data set, an outlier is often defined as…', 'more than 1.5 × IQR beyond the quartiles', [['any value over 100', 'Depends on the data.'], ['the median', 'No.']], 'Use with box plots.'],
        ['Newton’s third law says…', 'forces come in equal and opposite pairs', [['F = ma', 'That is the second law.'], ['objects stay still forever', 'That is close to the first law.']], 'Action and reaction act on different bodies.'],
        ['g is approximately…', '9.8 m/s²', [['98 m/s²', 'Ten times too strong.'], ['1 m/s²', 'Too weak.']], 'Acceleration due to gravity.'],
        ['For a particle in equilibrium, the resultant force is…', 'zero', [['equal to its weight', 'Weight is balanced by other forces.'], ['infinite', 'No.']], 'Resolve forces in two directions.'],
        ['A correlation coefficient of −0.9 shows…', 'strong negative correlation', [['weak positive correlation', 'The sign says negative; 0.9 is strong.'], ['no correlation', 'That would be about 0.']], 'Between −1 and 1.']]
    },
    'gb-english':{
      'narrative-writing':[
        ['Third-person omniscient narration…', 'knows every character’s thoughts', [['uses “I”', 'That is first person.'], ['only describes places', 'No.']], 'The all-knowing narrator.']],
      'spoken':[
        ['Rhetorical questions in a speech…', 'make the audience think', [['need an answer from the audience', 'They do not expect one.'], ['are always rude', 'No.']], '“Isn’t it time we acted?”'],
        ['Pausing in a speech helps to…', 'add emphasis', [['waste time', 'Used well, it adds impact.'], ['hide mistakes only', 'No.']], 'Pace and pause.']],
      'shakespeare-more':[
        ['Which play has the line “If music be the food of love, play on”?', 'Twelfth Night', [['Macbeth', 'Very different mood.'], ['The Tempest', 'No.']], 'Opening line, Duke Orsino.']]
    },
    'gb-biology':{
      'body-systems':[
        ['Which joint lets your arm rotate in many directions?', 'the ball-and-socket joint (shoulder)', [['the hinge joint (elbow)', 'Hinges move in one direction.'], ['the skull', 'Skull joints barely move.']], 'Hips and shoulders.']],
      'homeostasis':[
        ['Which organ controls body temperature?', 'the brain (hypothalamus)', [['the stomach', 'No.'], ['the lungs', 'No.']], 'Thermoregulatory centre.']],
      'health':[
        ['Which is a risk factor for type 2 diabetes?', 'lack of exercise', [['eating vegetables', 'That helps.'], ['drinking water', 'Healthy.']], 'Lifestyle factors.'],
        ['Statins are drugs that…', 'lower cholesterol', [['kill viruses', 'No.'], ['make you taller', 'No.']], 'Reduce heart disease risk.'],
        ['Digitalis comes from…', 'foxgloves', [['mould', 'Penicillin comes from mould.'], ['willow bark', 'Aspirin comes from willow.']], 'Drugs from plants.']],
      'molecules-alevel':[
        ['Enzymes are…', 'proteins', [['lipids', 'No.'], ['carbohydrates', 'No.']], 'Specific active sites.'],
        ['DNA replication is…', 'semi-conservative', [['fully conservative', 'Each new molecule keeps one old strand.'], ['random', 'No.']], 'Meselson and Stahl.'],
        ['Water is a good solvent because it is…', 'polar', [['non-polar', 'The opposite.'], ['a metal', 'No.']], 'Hydrogen bonding.']]
    },
    'gb-chemistry':{
      'separation':[
        ['Crystallisation is used to get…', 'a solid from a solution', [['a gas from a liquid', 'No.'], ['water from sand', 'Use filtration.']], 'Evaporate slowly.'],
        ['In chromatography, the paper is the…', 'stationary phase', [['mobile phase', 'The solvent is mobile.'], ['solute', 'No.']], 'Rf values identify substances.'],
        ['Air is a…', 'mixture', [['compound', 'Its gases are not chemically bonded.'], ['element', 'No.']], 'Mostly nitrogen and oxygen.']],
      'earth-resources':[
        ['Limestone is a … rock.', 'sedimentary', [['igneous', 'No.'], ['metamorphic', 'Marble is the metamorphic version.']], 'Made from shells.'],
        ['Phytomining uses…', 'plants to absorb metals from soil', [['robots on Mars', 'No.'], ['explosions', 'No.']], 'Low-grade ores.'],
        ['Recycling metals…', 'saves energy and resources', [['uses more ore', 'The opposite.'], ['is impossible', 'Very possible.']], 'Aluminium recycling saves lots of energy.']],
      'analysis':[
        ['Sodium ions give a … flame.', 'yellow', [['green', 'Copper.'], ['lilac', 'Potassium.']], 'Flame tests.'],
        ['Test for sulfate ions?', 'barium chloride gives a white precipitate', [['limewater', 'For CO₂.'], ['litmus', 'For acids and chlorine.']], 'Add HCl first.'],
        ['Instrumental methods (like flame emission spectroscopy) are…', 'fast, accurate and sensitive', [['always slower', 'No.'], ['less accurate', 'No.']], 'Used in industry.']],
      'energetics-alevel':[
        ['Bond breaking is…', 'endothermic', [['exothermic', 'Bond MAKING releases energy.'], ['neither', 'No.']], 'Needs energy.'],
        ['A buffer solution…', 'resists changes in pH', [['is always neutral', 'No.'], ['is a strong acid', 'No.']], 'Weak acid + its salt.'],
        ['Entropy is a measure of…', 'disorder', [['temperature', 'No.'], ['mass', 'No.']], 'ΔG = ΔH − TΔS.']]
    },
    'gb-physics':{
      'magnetism':[
        ['A compass needle points to…', 'magnetic north', [['the Sun', 'No.'], ['true south', 'No.']], 'Earth’s magnetic field.'],
        ['Field lines go from…', 'north to south', [['south to north', 'Outside the magnet: N → S.'], ['nowhere', 'No.']], 'Closer lines = stronger field.'],
        ['A generator works by…', 'electromagnetic induction', [['burning fuel inside the coil', 'No.'], ['static electricity', 'No.']], 'Moving a magnet in a coil induces a voltage.']],
      'thermal':[
        ['Melting is…', 'a change of state with no change in temperature while it happens', [['always at 100 °C', 'That is water boiling.'], ['a chemical change', 'Physical change.']], 'Latent heat.'],
        ['Which surface emits infrared best?', 'matt black', [['shiny silver', 'Shiny surfaces reflect.'], ['white', 'Poor emitter.']], 'Dark, matt surfaces emit and absorb well.'],
        ['Power is…', 'energy transferred per second', [['force × distance', 'That is work done.'], ['mass × speed', 'That is momentum.']], 'Measured in watts.']],
      'physics-alevel':[
        ['Wave–particle duality means…', 'particles can behave like waves and waves like particles', [['waves are always particles', 'No.'], ['particles never move', 'No.']], 'Electron diffraction.'],
        ['Capacitance is measured in…', 'farads', [['ohms', 'Resistance.'], ['teslas', 'Magnetic flux density.']], 'C = Q/V.'],
        ['The unit of magnetic flux density is…', 'the tesla', [['the volt', 'No.'], ['the joule', 'No.']], 'F = BIL.']]
    },
    'gb-history':{
      'holocaust':[
        ['What was a ghetto in Nazi-occupied Europe?', 'a closed area where Jewish people were forced to live', [['a holiday camp', 'No. Ghettos were overcrowded and deadly.'], ['a type of factory', 'No.']], 'The Warsaw Ghetto was the largest.'],
        ['What happened on 27 January 1945?', 'Soviet troops liberated Auschwitz', [['the war started', 'No. The war started in 1939.'], ['the Berlin Wall was built', 'No. That was 1961.']], 'Now Holocaust Memorial Day.'],
        ['Why do we study the Holocaust?', 'to remember the victims and understand how prejudice can lead to genocide', [['because it is a story', 'No. These are real events.'], ['to learn about sport', 'No.']], 'Learning helps prevent hatred today.']],
      'britain-1901':[
        ['The NHS was launched by…', 'Aneurin Bevan', [['Florence Nightingale', 'She died in 1910.'], ['Henry VIII', 'No.']], '5 July 1948.'],
        ['The Representation of the People Act 1928 gave…', 'equal voting rights to women and men at 21', [['votes to children', 'No.'], ['votes only to landowners', 'No.']], 'The Equal Franchise Act.']],
      'elizabethan-norman':[
        ['What were the Elizabethan Poor Laws about?', 'helping (and controlling) the poor', [['banning theatre', 'No.'], ['taxing horses', 'No.']], 'The 1601 Poor Law.'],
        ['Motte-and-bailey castles were built by…', 'the Normans', [['the Romans', 'Romans built forts.'], ['the Tudors', 'Too late.']], 'Quick wooden castles, later stone.'],
        ['Who was the last Anglo-Saxon king crowned in England?', 'Harold Godwinson', [['William I', 'He was Norman.'], ['Alfred', 'Much earlier.']], 'Killed at Hastings, 1066.']]
    },
    'gb-geography':{
      'rocks-glaciation':[
        ['A drumlin is…', 'an egg-shaped hill of glacial deposit', [['a musical instrument', 'Close name, wrong subject.'], ['a river cliff', 'No.']], 'Glacial deposition.'],
        ['An arête is…', 'a sharp ridge between two corries', [['a flat plain', 'No.'], ['a cave', 'No.']], 'Like Striding Edge.'],
        ['Soil forms from…', 'weathered rock and organic matter', [['only sand', 'No.'], ['plastic', 'No.']], 'Takes hundreds of years.']],
      'ecosystems':[
        ['Nutrients in the rainforest are mainly stored in…', 'the plants (biomass)', [['the soil', 'Rainforest soil is surprisingly poor.'], ['the rivers', 'No.']], 'Fast nutrient cycling.'],
        ['Desertification is…', 'land turning into desert', [['deserts disappearing', 'The opposite.'], ['planting trees', 'That helps prevent it.']], 'Caused by overgrazing and climate.'],
        ['The tundra is…', 'a cold, treeless biome', [['a hot forest', 'No.'], ['a coral reef', 'No.']], 'Short summers, long winters.']],
      'population-economy':[
        ['Birth rate minus death rate gives…', 'natural increase', [['migration', 'Migration is people moving.'], ['GDP', 'No.']], 'Per 1000 people.'],
        ['Deindustrialisation means…', 'the decline of manufacturing', [['building more factories', 'The opposite.'], ['more farming', 'No.']], 'Happened in many UK cities.'],
        ['A science park is an example of…', 'quaternary industry', [['primary industry', 'No.'], ['farming', 'No.']], 'Research and development.']],
      'fieldwork':[
        ['A bipolar survey is used to…', 'score the quality of a place', [['measure rainfall', 'Use a rain gauge.'], ['count people', 'That is a pedestrian count.']], 'e.g. ugly 3 2 1 0 1 2 3 attractive.'],
        ['Which is qualitative data?', 'interviews and descriptions', [['river depth in cm', 'That is quantitative.'], ['pedestrian counts', 'Numbers: quantitative.']], 'Words and opinions.'],
        ['An evaluation in fieldwork discusses…', 'how reliable the results are', [['the weather only', 'No.'], ['your lunch', 'Plumo is curious, but no.']], 'Limitations and improvements.']]
    },
    'gb-citizenship':{
      'police-courts-world':[
        ['The Supreme Court is…', 'the highest court in the UK', [['the House of Lords chamber', 'Since 2009 it is separate.'], ['a sports court', 'No.']], 'Final court of appeal.'],
        ['A pressure group…', 'tries to influence government decisions', [['runs the government', 'No.'], ['is a type of police', 'No.']], 'e.g. campaigns, petitions.']]
    },
    'gb-computing':{
      'programming-concepts':[
        ['An array is…', 'a data structure that stores several values under one name', [['a single variable', 'No.'], ['an error', 'No.']], 'Index usually starts at 0.']],
      'hardware-safety':[
        ['Which is an output device?', 'a printer', [['a microphone', 'Input.'], ['a mouse', 'Input.']], 'Outputs show or produce results.'],
        ['Malware is…', 'software designed to cause harm', [['a type of mouse', 'No.'], ['a backup', 'No.']], 'Viruses, worms, ransomware.'],
        ['Before downloading an app, you should…', 'check it comes from a trusted source', [['give it all your passwords', 'Never.'], ['turn off security', 'Never.']], 'Official app stores and reviews.']]
    }
  };
  for(const [id, chs] of Object.entries(A)){ const m = E.trouver(id); if(!m) continue;
    for(const [c, l] of Object.entries(chs)){ const ch = m.chapitres.find(x => x.id === c); if(ch && ch.banque) ch.banque.push(...l); } }
})();
