// Ami des mots — v6.1 : History, Geography, Citizenship & RE (England, KS2 → GCSE → A level).
(function(){
  'use strict';
  const E = window.ENGLAND; if(!E) return;
  const C = (id, nom, dom, niv, banque) => ({ id, nom, dom, niv, banque });
  E.ajouter({ id:'gb-history', nom:'History', ic:'🏛️', sous:'1066 to the Cold War, GCSE and A level topics', examens:{ Y11:'GCSE-style quiz' }, chapitres:[
    C('ks2-history', 'Romans, Anglo-Saxons & Vikings', 'KS2', ['Y6', 'Y7'], [
      ['Which Roman emperor ordered a wall built across northern Britain in AD 122?', 'Hadrian', [['Julius Caesar', 'Caesar visited in 55–54 BC, long before the wall.'], ['Nero', 'Nero was busy elsewhere. Boudica rebelled in his reign.']], 'Hadrian’s Wall marked the north-west frontier of the Roman Empire.'],
      ['Who led a revolt against the Romans in AD 60–61?', 'Boudica', [['Alfred the Great', 'Alfred fought the Vikings, 800 years later.'], ['Elizabeth I', 'Wrong century by a mile (1500s).']], 'Boudica, queen of the Iceni.'],
      ['Which Anglo-Saxon king fought the Vikings and is called “the Great”?', 'Alfred', [['Canute', 'Canute (Cnut) was a Danish king of England.'], ['Arthur', 'Arthur is a legend, not a recorded king.']], 'Alfred of Wessex (871–899).']
    ]),
    C('medieval', 'Medieval England (1066–1509)', 'KS3', ['Y7', 'Y8'], [
      ['Who won the Battle of Hastings in 1066?', 'William of Normandy', [['Harold Godwinson', 'Harold lost, with an arrow story attached.'], ['Harald Hardrada', 'Hardrada lost at Stamford Bridge, a few weeks earlier.']], 'William became King of England: the Norman Conquest.'],
      ['What was the Domesday Book (1086)?', 'a survey of land and property in England', [['a book of prophecies', 'Sounds dramatic, but it is a giant tax survey.'], ['a cookbook', 'Plumo wishes. It counted pigs, not recipes.']], 'William used it to know what he owned and could tax.'],
      ['Which document did King John agree to in 1215?', 'Magna Carta', [['the Bill of Rights', 'That is 1689.'], ['the Domesday Book', 'That is 1086.']], 'Magna Carta limited the king’s power.'],
      ['What was the Black Death?', 'a plague pandemic in the 14th century', [['a Viking invasion', 'Wrong disaster.'], ['a type of armour', 'Plumo would not want that armour.']], 'Arrived in England in 1348; killed about a third to half of the population.'],
      ['The Peasants’ Revolt of 1381 was triggered mainly by…', 'a poll tax', [['the Great Fire', 'That was 1666.'], ['a football ban', 'Medieval kings did ban football, but that was not the trigger.']], 'Led by Wat Tyler, against the poll tax and serfdom.']
    ]),
    C('tudors', 'Tudors & Stuarts', 'KS3', ['Y7', 'Y8', 'Y9'], [
      ['Why did Henry VIII break with the Roman Catholic Church?', 'to annul his marriage to Catherine of Aragon', [['to become Pope', 'He made himself Head of the Church of England, not Pope.'], ['because of a quarrel about food', 'He liked a banquet, but no.']], 'Act of Supremacy, 1534.'],
      ['Which Tudor monarch defeated the Spanish Armada in 1588?', 'Elizabeth I', [['Mary I', 'Mary I died in 1558.'], ['Henry VIII', 'He was gone by 1547.']], 'The Armada was defeated by English ships and storms.'],
      ['What was the Gunpowder Plot (1605)?', 'a plan to blow up Parliament and James I', [['a firework festival', 'Bonfire Night remembers it, but the plot was not a party.'], ['a new cannon', 'No, it was a plot.']], 'Guy Fawkes was caught guarding the gunpowder.'],
      ['Who won the English Civil War?', 'Parliament (the Roundheads)', [['the Royalists (Cavaliers)', 'Charles I lost, and was executed in 1649.'], ['the Vikings', 'Seven centuries too late.']], 'Oliver Cromwell then led the country.'],
      ['Which event in 1666 destroyed much of London?', 'the Great Fire', [['the Great Plague', 'The plague was 1665, the year before.'], ['the Blitz', 'That was the Second World War.']], 'It started in a bakery on Pudding Lane.']
    ]),
    C('industrial', 'Industrial Revolution & Empire', 'KS3', ['Y8', 'Y9'], [
      ['Which invention powered many factories in the Industrial Revolution?', 'the steam engine', [['the smartphone', 'Plumo loves the enthusiasm, but no.'], ['the windmill', 'Windmills existed, but steam drove the factories.']], 'Watt’s improved steam engine (1770s).'],
      ['When was slavery abolished in the British Empire?', '1833', [['1066', 'Far too early.'], ['1945', 'Much earlier: the Slavery Abolition Act was 1833.']], 'The slave trade was abolished in 1807; slavery itself in 1833.'],
      ['Who campaigned in Parliament against the slave trade?', 'William Wilberforce', [['Winston Churchill', 'Churchill was born in 1874.'], ['Isaac Newton', 'Newton did physics.']], 'Wilberforce, along with campaigners such as Olaudah Equiano.']
    ]),
    C('world-wars', 'The World Wars', 'KS3 & GCSE', ['Y9', 'Y10', 'Y11'], [
      ['Which event triggered the First World War in 1914?', 'the assassination of Archduke Franz Ferdinand', [['the sinking of the Titanic', 'That was 1912, and not a cause.'], ['the invasion of Poland', 'That started the Second World War, in 1939.']], 'Sarajevo, June 1914.'],
      ['When did the First World War end?', '11 November 1918', [['1 September 1939', 'That is when the Second World War began.'], ['1066', 'Plumo is impressed by the confidence.']], 'The Armistice: 11 a.m. on 11/11/1918.'],
      ['Which treaty ended the First World War with Germany?', 'the Treaty of Versailles', [['Magna Carta', 'That is 1215.'], ['the Treaty of Rome', 'That created the EEC in 1957.']], 'Signed 28 June 1919.'],
      ['Who was British Prime Minister for most of the Second World War?', 'Winston Churchill', [['Neville Chamberlain', 'He resigned in May 1940.'], ['Margaret Thatcher', 'She was born in 1925.']], 'Churchill led from 1940 to 1945.'],
      ['What was the Blitz?', 'German bombing of British cities, 1940–41', [['a British football tournament', 'No.'], ['a 1990s dance', 'Wrong decade, by quite a lot.']], 'London, Coventry, Liverpool and many cities were bombed.']
    ]),
    C('germany', 'GCSE: Germany 1890–1945', 'GCSE options', ['Y10', 'Y11'], [
      ['What was the Weimar Republic?', 'Germany’s democratic government after 1918', [['a German football team', 'Plumo has checked the league tables: no.'], ['the empire before 1918', 'That was Kaiser Wilhelm II’s Germany.']], 'Weimar Germany: 1919–1933.'],
      ['In which year did hyperinflation peak in Germany?', '1923', [['1929', 'That was the Wall Street Crash.'], ['1933', 'That was Hitler becoming Chancellor.']], 'Prices doubled in days; money was worth almost nothing.'],
      ['When did Hitler become Chancellor?', 'January 1933', [['1923', 'In 1923 he attempted the Munich Putsch and failed.'], ['1945', 'That is the end of the war.']], 'Appointed 30 January 1933.']
    ]),
    C('cold-war', 'GCSE: Conflict & the Cold War', 'GCSE options', ['Y10', 'Y11', 'Y12', 'Y13'], [
      ['When was the Berlin Wall built?', '1961', [['1989', 'That is when it came down.'], ['1945', 'Berlin was divided then, but the wall came later.']], 'Built in August 1961, opened in November 1989.'],
      ['The Cuban Missile Crisis (1962) was between…', 'the USA and the USSR', [['Britain and France', 'They were allies.'], ['Germany and Italy', 'Wrong war, wrong decade.']], 'Thirteen days in October 1962.'],
      ['What was the Marshall Plan?', 'US economic aid to rebuild Europe', [['a Soviet invasion plan', 'The Soviets rejected it.'], ['a moon landing', 'That is Apollo, 1969.']], 'Announced in 1947.']
    ]),
    C('medicine', 'GCSE: Medicine through time', 'GCSE options', ['Y10', 'Y11'], [
      ['Who developed the smallpox vaccine in 1796?', 'Edward Jenner', [['Louis Pasteur', 'Pasteur proved germ theory later, in the 1860s.'], ['Florence Nightingale', 'She reformed nursing.']], 'Jenner used cowpox to protect against smallpox.'],
      ['Who discovered penicillin in 1928?', 'Alexander Fleming', [['Joseph Lister', 'Lister used carbolic acid as an antiseptic.'], ['John Snow', 'Snow linked cholera to a water pump.']], 'Florey and Chain later mass-produced it.'],
      ['When was the NHS founded?', '1948', [['1848', 'A century too early.'], ['1998', 'Fifty years too late.']], 'Launched by Aneurin Bevan on 5 July 1948.']
    ])
  ]});
  E.ajouter({ id:'gb-geography', nom:'Geography', ic:'🌍', sous:'Hazards, rivers, coasts, cities, development, map skills', examens:{ Y11:'GCSE-style quiz' }, chapitres:[
    C('maps', 'Map skills', 'Skills', ['Y6', 'Y7', 'Y8'], [
      ['In a grid reference, which comes first?', 'the eastings (along the corridor)', [['the northings (up the stairs)', 'Along the corridor, THEN up the stairs.'], ['whichever you like', 'Ordnance Survey disagrees.']], 'Eastings before northings.'],
      ['On an OS map, contour lines close together show…', 'steep land', [['flat land', 'Flat land has contours far apart.'], ['a river', 'Rivers are drawn in blue.']], 'Contours join points of equal height.'],
      ['A scale of 1:25,000 means 1 cm on the map is…', '250 m in real life', [['25 km', 'That would be 1:2,500,000.'], ['25 m', 'Count the zeros again: 25,000 cm = 250 m.']], '25,000 cm = 250 m.']
    ]),
    C('hazards', 'Natural hazards', 'Physical', ['Y8', 'Y9', 'Y10', 'Y11'], [
      ['Earthquakes mostly happen…', 'at plate boundaries', [['in the middle of plates', 'Rarely: the action is at the edges.'], ['only in England', 'England has small ones, but not mostly.']], 'Plates move at constructive, destructive and conservative boundaries.'],
      ['At a destructive plate margin…', 'one plate sinks under another (subduction)', [['plates move apart', 'That is constructive.'], ['plates slide past each other', 'That is conservative.']], 'Oceanic plate subducts under continental plate: volcanoes and earthquakes.'],
      ['Tropical storms form over…', 'warm oceans (above about 27 °C)', [['deserts', 'They need warm water for energy.'], ['the Arctic', 'Far too cold.']], 'Called hurricanes, cyclones or typhoons depending on the region.']
    ]),
    C('rivers-coasts', 'Rivers & coasts', 'Physical', ['Y7', 'Y8', 'Y9', 'Y10', 'Y11'], [
      ['A V-shaped valley is found in a river’s…', 'upper course', [['lower course', 'The lower course has a wide floodplain.'], ['estuary', 'The estuary is where the river meets the sea.']], 'Vertical erosion dominates near the source.'],
      ['Longshore drift moves sediment…', 'along the coast in the direction of the prevailing wind', [['straight out to sea', 'Waves come in at an angle, so material zigzags along.'], ['up the cliffs', 'Plumo has never seen sand climb.']], 'Swash at an angle, backwash straight down.'],
      ['Which landform is created by deposition?', 'a spit', [['a wave-cut platform', 'That is erosion.'], ['a stack', 'Stacks are erosion too.']], 'Spits form where the coastline changes direction.'],
      ['An oxbow lake forms from…', 'a meander being cut off', [['a glacier', 'Glaciers make corries and U-shaped valleys.'], ['a volcano', 'Crater lakes are different.']], 'Erosion on the outer bends narrows the neck until the river cuts through.']
    ]),
    C('urban-dev', 'Cities, development & resources', 'Human', ['Y8', 'Y9', 'Y10', 'Y11'], [
      ['Which measure combines life expectancy, education and income?', 'the Human Development Index (HDI)', [['GDP per capita', 'GDP looks at income only.'], ['birth rate', 'Only one factor.']], 'HDI is between 0 and 1.'],
      ['Moving from the countryside to cities is called…', 'urbanisation', [['counter-urbanisation', 'That is the reverse: leaving cities.'], ['migration to the Moon', 'Not yet.']], 'Rapid in many LICs and NEEs.'],
      ['Which is a renewable energy source?', 'wind', [['coal', 'Coal took millions of years to form.'], ['natural gas', 'Also a fossil fuel.']], 'Wind, solar, tidal, hydroelectric, geothermal.']
    ]),
    C('climate', 'Weather & climate change', 'Physical', ['Y7', 'Y8', 'Y9', 'Y10', 'Y11'], [
      ['The UK has a mild, wet climate mainly because of…', 'the North Atlantic Drift (Gulf Stream)', [['the Sahara', 'Too far away, and very dry.'], ['the Moon', 'The Moon does tides, not rain.']], 'Warm ocean current and prevailing south-westerly winds.'],
      ['Which is evidence of climate change?', 'shrinking glaciers', [['a rainy Tuesday', 'That is weather, not climate.'], ['a hot curry', 'Delicious, not evidence.']], 'Also ice cores, sea level rise, temperature records.']
    ])
  ]});
  E.ajouter({ id:'gb-citizenship', nom:'Citizenship & RE', ic:'⚖️', sous:'Parliament, rights, law, money, world religions', chapitres:[
    C('parliament', 'Parliament & democracy', 'Citizenship', ['Y6', 'Y7', 'Y8', 'Y9', 'Y10', 'Y11'], [
      ['What are the two Houses of Parliament?', 'the House of Commons and the House of Lords', [['the Commons and the Senate', 'The Senate is in the USA.'], ['the Palace and the Tower', 'Those are buildings, not Houses of Parliament.']], 'MPs sit in the Commons; peers in the Lords.'],
      ['At what age can you vote in UK general elections?', '18', [['16', 'Not yet for UK general elections: a bill to lower it to 16 was going through Parliament in 2026. Already true for some elections in Scotland and Wales.'], ['21', 'It was lowered from 21 to 18 in 1969.']], 'Currently 18 for UK general elections. The Representation of the People Bill (2026) would lower it to 16.'],
      ['Who is the UK’s head of state?', 'the monarch', [['the Prime Minister', 'The PM is head of government.'], ['the Speaker', 'The Speaker chairs the Commons.']], 'The UK is a constitutional monarchy.'],
      ['What is the role of an MP?', 'to represent a constituency in the House of Commons', [['to judge criminal trials', 'That is judges and juries.'], ['to referee football', 'Plumo would vote for that, though.']], '650 MPs, one per constituency.']
    ]),
    C('rights-law', 'Rights, law & money', 'Citizenship', ['Y7', 'Y8', 'Y9', 'Y10', 'Y11'], [
      ['Which convention lists the rights of children?', 'the UN Convention on the Rights of the Child', [['Magna Carta', 'That is from 1215, about barons.'], ['the Highway Code', 'That is for roads.']], 'The UNCRC (1989).'],
      ['In a criminal trial in England, who decides guilty or not guilty in a Crown Court?', 'the jury', [['the police', 'The police investigate; they do not decide.'], ['the defendant', 'That would be very convenient for them.']], '12 members of the public.'],
      ['What is interest on a savings account?', 'money the bank pays you for keeping your money there', [['a fee for opening the door', 'No such fee, Plumo promises.'], ['a type of tax', 'Interest can be taxed, but it is not a tax itself.']], 'Interest on loans is what YOU pay the lender.']
    ]),
    C('religions', 'World religions', 'RE', ['Y6', 'Y7', 'Y8', 'Y9', 'Y10', 'Y11'], [
      ['What is the holy book of Islam?', 'the Qur’an', [['the Torah', 'The Torah is the Jewish scripture.'], ['the Guru Granth Sahib', 'That is Sikhism’s holy book.']], 'Muslims believe it was revealed to the Prophet Muhammad.'],
      ['Which festival of light is celebrated by Hindus and Sikhs?', 'Diwali', [['Hanukkah', 'Hanukkah is also a festival of light, but Jewish.'], ['Easter', 'Easter is Christian.']], 'Diwali: lamps, sweets, fireworks.'],
      ['The Five Pillars belong to which religion?', 'Islam', [['Buddhism', 'Buddhism has the Four Noble Truths and the Eightfold Path.'], ['Christianity', 'Christianity has other key beliefs (Trinity…).']], 'Shahadah, Salah, Zakah, Sawm, Hajj.'],
      ['Who founded Buddhism?', 'Siddhartha Gautama', [['Guru Nanak', 'He founded Sikhism.'], ['Moses', 'A key figure in Judaism.']], 'He became the Buddha (“the enlightened one”).']
    ])
  ]});
})();
