// Ami des mots — v6.14: “Objectif NASA” (French curriculum) in English.
// Chapters whose English “Road to NASA” bank asks the same questions in the same order reuse it;
// the French-specific ones (routes from France, mission English for French speakers, space geopolitics) are translated here.
window.MATIERES_LANGUES = window.MATIERES_LANGUES || {};
window.MATIERES_LANGUES.en = window.MATIERES_LANGUES.en || { noms:{}, q:{} };
(function(T){
  T.noms = T.noms || {}; T.q = T.q || {};
  const Q = T.q, EN = window.NASA_EN || {};
  T.noms.nasa = { nom:'Target NASA', dom:{ 'Parcours':'Routes', 'Exercices':'Exercises', 'Culture spatiale':'Space culture', 'Géosciences (GEOPS)':'Geosciences (GEOPS)' },
    ch:{ parcours:'Routes and qualifications', metiers:'Jobs at NASA and in space', fusees:'Rockets and propulsion', orbites:'Orbits and gravity', communications:'Communications and distances',
      unites:'Units and conversions', survie:'Life on board', exploration:'Missions: Apollo, ISS, Artemis, Mars', anglais:'Mission English', code:'Code and flight software',
      geopolitique:'Space geopolitics', geops:'GEOPS: Earth and planetary geosciences' } };
  for(const id of ['metiers', 'exploration', 'code', 'geops']) if(EN[id]) Q['nasa/' + id] = EN[id];
  Q['nasa/parcours'] = [
    ['To become a NASA astronaut, the first requirement is…', 'being a US citizen', [['being 18', 'There is no official age limit.'], ['speaking Russian', 'Useful on the ISS, but not the first requirement.']], 'Dual nationals can apply.'],
    ['Minimum degree to apply as a NASA astronaut?', 'a master’s degree in a STEM subject', [['the bac', 'You’ll need at least five more years of study.'], ['a two-year vocational diploma (BTS)', 'Not enough for this job.']], 'Engineering, biology, physics, computing, maths; since 2026 a master’s in nursing counts too. Equivalents: medicine, a PhD in progress, test pilot school.'],
    ['How many years of professional experience after that degree?', 'at least 3 years', [['none', 'NASA wants people who have already worked.'], ['20 years', 'That would be a lot.']], 'Or flying hours for pilots (750 h as pilot in command of a jet).'],
    ['NASA’s OSTEM and Pathways internships are open…', 'to US citizens', [['to everyone', 'No, you need US nationality.'], ['only to astronauts', 'They are internships for students.']], 'An “International Intern” programme exists for countries that have an agreement with NASA.'],
    ['For someone in France, the most realistic route into space careers is…', 'ESA, CNES and industry (Airbus, Thales, ArianeGroup…)', [['a TV talent show', 'Plumo loves TV, but no.'], ['a tourist visa', 'It doesn’t let you work.']], 'Plus partnerships with NASA through these organisations.'],
    ['ESA’s Graduate Trainee programme asks for…', 'a master’s degree (final year or just finished)', [['the brevet (end of middle school)', 'You need a master’s.'], ['10 years’ experience', 'It’s for recent graduates.']], 'Open to citizens of ESA member states (including France).'],
    ['What are ESA’s working languages?', 'English and French', [['German only', 'No.'], ['Latin', 'Plumo would have bet on that for the Vatican.']], 'A good command of one of the two is required.'],
    ['After the bac, which route most often leads to space careers?', 'preparatory classes or a science degree, then an engineering school or a master’s', [['the bac, then straight to astronaut', 'About ten years are missing.'], ['none, you get spotted at random', 'No.']], 'Well-known schools: ISAE-SUPAERO, Centrale, Polytechnique, universities (master’s in astrophysics).'],
    ['Which sixth-form specialities should you take to aim for space?', 'maths and physics-chemistry', [['only economics and social sciences', 'Not enough science for engineering.'], ['it doesn’t matter', 'Maths counts a lot.']], 'The expert maths option is recommended; computer science (NSI) is a plus for software.'],
    ['Thomas Pesquet studied…', 'engineering (SUPAERO), then he became an airline pilot', [['cooking', 'He did cook on the ISS, but no.'], ['law', 'No.']], 'Selected by ESA in 2009.']
  ];
  Q['nasa/anglais'] = [
    ['In mission English, “liftoff” is…', 'the moment the rocket leaves the ground', [['the moment it touches down', 'That’s landing.'], ['the fuel', 'That’s fuel or propellant.']], 'NASA works in English: the vocabulary matters.'],
    ['In mission English, “splashdown” is…', 'landing at sea', [['an explosion', 'No.'], ['take-off', 'No.']], 'Orion comes down in the Pacific.'],
    ['In mission English, “payload” is…', 'what the rocket carries', [['a salary', 'Pay… load, but no.'], ['an engine', 'No.']], 'Satellites, a capsule, experiments…'],
    ['In mission English, “thrust” is…', 'the pushing force of the engines', [['confidence', 'That’s trust (no h).'], ['speed', 'That’s speed.']], 'Measured in newtons (or pounds-force).'],
    ['“Go / No go” is used to…', 'give (or refuse) the go-ahead to continue', [['say hello', 'No.'], ['play the game of go', 'Plumo plays it, but no.']], 'Each person in charge answers before launch.'],
    ['“Houston, we’ve had a problem” was said during…', 'Apollo 13 (1970)', [['Apollo 11', 'Apollo 11 went well.'], ['Artemis II', 'No.']], 'An oxygen tank failed; the crew came home safe and sound.'],
    ['“EVA” (extravehicular activity) means…', 'a spacewalk', [['a first name', 'Not here.'], ['a meal', 'No.']], 'Going outside in a spacesuit.'],
    ['In mission English, “abort” means…', 'to stop the mission', [['on board', 'That’s aboard.'], ['to succeed', 'No.']], 'Orion’s abort system pulls the capsule clear if there is a problem.']
  ];
  Q['nasa/geopolitique'] = [
    ['Which 1967 treaty stops any country claiming the Moon?', 'the Outer Space Treaty', [['the Treaty of Versailles', 'That’s 1919.'], ['the Treaty of Rome', 'That’s 1957, Europe.']], 'It also bans nuclear weapons in orbit.'],
    ['Which satellite started the space race in 1957?', 'Sputnik 1 (USSR)', [['Apollo 11', 'That’s 1969.'], ['Hubble', 'That’s 1990.']], 'Cold War: rivalry between the United States and the USSR.'],
    ['First human in space?', 'Yuri Gagarin (1961)', [['Neil Armstrong', 'First on the Moon, in 1969.'], ['Thomas Pesquet', 'Much later.']], 'USSR, 12 April 1961.'],
    ['The Artemis Accords (2020) are…', 'principles for exploring the Moon together, proposed by the United States', [['a military treaty', 'No, they are about civil exploration.'], ['a football agreement', 'No.']], 'France signed them in 2022.'],
    ['Which space station did China build?', 'Tiangong', [['Mir', 'Mir was Soviet, then Russian.'], ['Skylab', 'Skylab was American.']], 'Completed in 2022.'],
    ['Which country landed a probe near the lunar South Pole in 2023?', 'India (Chandrayaan-3)', [['France', 'No.'], ['Brazil', 'No.']], 'The South Pole is interesting because of its water ice.'],
    ['Galileo is…', 'the European navigation system, a rival to GPS', [['a NASA telescope', 'Galileo the scientist had a telescope, but not here.'], ['a rocket', 'No.']], 'Strategic independence for Europe.'],
    ['Why is space a matter of power between countries?', 'communication, navigation, observation and military satellites', [['only for tourism', 'Not only.'], ['nothing is at stake', 'A lot is at stake.']], 'Anti-satellite tests create debris that threatens everyone.'],
    ['Ariane 6 made its first flight in…', '2024', [['1979', 'That’s Ariane 1.'], ['2030', 'It has already flown.']], 'Europe’s independent access to space.'],
    ['Which partners build and use the ISS?', 'the United States, Russia, Europe, Japan and Canada', [['only the United States', 'It’s an international partnership.'], ['China and India', 'They aren’t part of it.']], 'A partnership born after the Cold War.']
  ];
})(window.MATIERES_LANGUES.en);
