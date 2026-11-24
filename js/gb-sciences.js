// Ami des mots — v6.1 : Science, England — Year 6, KS3, GCSE (Biology, Chemistry, Physics / Combined Science), A level.
(function(){
  'use strict';
  const E = window.ENGLAND; if(!E) return;
  const { ent, un, nb, Q } = E.outils;
  const C = (id, nom, dom, niv, banque, gen) => ({ id, nom, dom, niv, banque, gen });
  // ───────── Biology ─────────
  E.ajouter({ id:'gb-biology', nom:'Biology', ic:'🧬', sous:'Cells, body, ecology, genetics: Year 6 → A level', examens:{ Y11:'GCSE-style quiz', Y13:'A level-style quiz' }, chapitres:[
    C('ks2-living', 'Living things & the body (Year 6)', 'KS2 science', ['Y6'], [
      ['Which organ pumps blood around the body?', 'the heart', [['the lungs', 'The lungs swap gases; the heart does the pumping.'], ['the stomach', 'The stomach digests. Plumo’s stomach is digesting a worm right now.']], 'The heart pumps blood through blood vessels (circulatory system).'],
      ['Which group do animals with a backbone belong to?', 'vertebrates', [['invertebrates', '“In-” means without. Those have NO backbone.'], ['mammals', 'Mammals are vertebrates, but so are birds, fish, reptiles, amphibians.']], 'Vertebrates have a backbone; invertebrates do not.'],
      ['Who developed the theory of evolution by natural selection?', 'Charles Darwin', [['Isaac Newton', 'Newton did gravity, not finches.'], ['Marie Curie', 'She studied radioactivity.']], 'Darwin’s On the Origin of Species (1859).'],
      ['Offspring vary and are not identical to their parents. This is called…', 'variation', [['adaptation', 'Adaptation is a feature that helps survival.'], ['photosynthesis', 'That is plants making food.']], 'Inheritance passes on characteristics; offspring show variation.']
    ]),
    C('cells', 'Cells & microscopes', 'Cell biology', ['Y7', 'Y8', 'Y10', 'Y11'], [
      ['Which structure controls the activities of the cell?', 'the nucleus', [['the cell membrane', 'The membrane controls what goes IN and OUT.'], ['the cytoplasm', 'That is where reactions happen, not the boss.']], 'The nucleus contains genetic material and controls the cell.'],
      ['Which is found in plant cells but NOT animal cells?', 'chloroplasts', [['mitochondria', 'Both have mitochondria for respiration.'], ['ribosomes', 'Both have ribosomes for making proteins.']], 'Plant cells also have a cell wall and a permanent vacuole.'],
      ['Where does aerobic respiration happen?', 'mitochondria', [['nucleus', 'The nucleus is the control centre, not the power station.'], ['chloroplasts', 'Those do photosynthesis.']], 'Mitochondria release energy from glucose.'],
      ['Bacteria are…', 'prokaryotic cells', [['eukaryotic cells', 'Eukaryotes have a nucleus; bacteria do not.'], ['viruses', 'Viruses are not cells at all.']], 'Prokaryotes: no nucleus, DNA in a loop, sometimes plasmids.'],
      ['Magnification = ?', 'image size ÷ actual size', [['actual size ÷ image size', 'Upside down: the microscope would make things smaller!'], ['image size × actual size', 'Multiply? The units say no.']], 'Magnification = image size ÷ real size.']
    ]),
    C('transport', 'Diffusion, osmosis & transport', 'Cell biology', ['Y8', 'Y9', 'Y10', 'Y11'], [
      ['Movement of water across a partially permeable membrane is…', 'osmosis', [['diffusion', 'Diffusion is for particles in general; water through a membrane is osmosis.'], ['active transport', 'Active transport needs energy and goes against the gradient.']], 'Osmosis: water from dilute to concentrated solution.'],
      ['Diffusion is the movement of particles from…', 'high to low concentration', [['low to high concentration', 'That would need energy: active transport.'], ['left to right', 'Particles do not care about left and right.']], 'Diffusion is passive: down a concentration gradient.'],
      ['Which process uses energy from respiration?', 'active transport', [['osmosis', 'Osmosis is passive.'], ['diffusion', 'Diffusion is passive too.']], 'Active transport moves substances against a concentration gradient.']
    ]),
    C('organisation', 'Organs, digestion & the heart', 'Organisation', ['Y8', 'Y9', 'Y10', 'Y11'], [
      ['Which enzyme breaks down starch?', 'amylase', [['protease', 'Protease breaks down proteins.'], ['lipase', 'Lipase breaks down fats.']], 'Amylase: starch → sugars.'],
      ['Which blood vessels carry blood AWAY from the heart?', 'arteries', [['veins', 'Veins bring it back to the heart. A for Away!'], ['capillaries', 'Capillaries connect them, for exchange.']], 'A for Away: arteries. Thick walls, high pressure.'],
      ['What does bile do?', 'emulsifies fats and neutralises stomach acid', [['digests proteins', 'That is protease.'], ['makes insulin', 'That is the pancreas.']], 'Bile is made in the liver, stored in the gall bladder.'],
      ['Which test detects starch?', 'iodine turns blue-black', [['Benedict’s turns brick red', 'That is for reducing sugars.'], ['Biuret turns purple', 'That is for proteins.']], 'Iodine: orange → blue-black with starch.']
    ]),
    C('infection', 'Infection & response', 'Infection', ['Y9', 'Y10', 'Y11'], [
      ['Antibiotics work against…', 'bacteria', [['viruses', 'Antibiotics do not work on viruses: no use against a cold.'], ['all germs', 'Not viruses. That is why the doctor says no antibiotics for flu.']], 'Antibiotics kill bacteria; overuse causes resistance.'],
      ['Vaccines contain…', 'dead or inactive forms of a pathogen', [['antibiotics', 'Different thing entirely.'], ['live, dangerous pathogens', 'They are made safe (inactive or weakened).']], 'Vaccines trigger white blood cells to make antibodies and memory cells.'],
      ['Which cells produce antibodies?', 'white blood cells (lymphocytes)', [['red blood cells', 'Red cells carry oxygen.'], ['platelets', 'Platelets help wounds seal up.']], 'Lymphocytes make antibodies; phagocytes engulf pathogens.']
    ]),
    C('bioenergetics', 'Photosynthesis & respiration', 'Bioenergetics', ['Y7', 'Y8', 'Y9', 'Y10', 'Y11'], [
      ['Word equation for photosynthesis?', 'carbon dioxide + water → glucose + oxygen', [['glucose + oxygen → carbon dioxide + water', 'That is respiration, the reverse.'], ['oxygen + water → glucose', 'Plants take in carbon dioxide, not oxygen, for this.']], 'Photosynthesis needs light and chlorophyll; it is endothermic.'],
      ['Anaerobic respiration in muscles produces…', 'lactic acid', [['alcohol', 'That is yeast (fermentation).'], ['oxygen', 'Anaerobic means WITHOUT oxygen.']], 'Glucose → lactic acid; causes oxygen debt.'],
      ['Which factor does NOT limit photosynthesis?', 'the colour of the pot', [['light intensity', 'Light is a classic limiting factor.'], ['temperature', 'Temperature affects the enzymes.']], 'Limiting factors: light, CO₂ concentration, temperature, chlorophyll.']
    ]),
    C('genetics', 'Inheritance & evolution', 'Genetics', ['Y9', 'Y10', 'Y11', 'Y12', 'Y13'], [
      ['How many chromosomes are in a normal human body cell?', '46', [['23', 'That is in a gamete (sperm or egg).'], ['92', 'Double trouble. No.']], '46 chromosomes = 23 pairs.'],
      ['Bb × bb: what fraction of offspring are bb?', '1/2', [['1/4', 'Draw the Punnett square: two of the four boxes are bb.'], ['0', 'The b from each parent can meet.']], 'Punnett square: Bb, Bb, bb, bb.'],
      ['DNA is made of a double helix of…', 'nucleotides', [['amino acids', 'Amino acids make proteins.'], ['fatty acids', 'Those make lipids.']], 'Nucleotide = phosphate + sugar + base (A, T, C, G).'],
      ['Which base pairs with adenine (A) in DNA?', 'thymine (T)', [['cytosine (C)', 'C pairs with G.'], ['uracil (U)', 'U is in RNA, not DNA.']], 'A–T and C–G.']
    ]),
    C('ecology', 'Ecology', 'Ecology', ['Y7', 'Y8', 'Y9', 'Y10', 'Y11'], [
      ['In a food chain, what do arrows show?', 'the direction of energy transfer', [['who is bigger', 'Size has nothing to do with it.'], ['who eats whom', 'Close, but the arrow points FROM the eaten TO the eater: energy flow.']], 'Grass → rabbit → fox: energy flows along the arrows.'],
      ['Organisms that make their own food are…', 'producers', [['consumers', 'Consumers eat other organisms.'], ['decomposers', 'Decomposers recycle leftovers, like nature’s bin crew.']], 'Producers (plants, algae) start food chains.'],
      ['Which gas is the main contributor to the enhanced greenhouse effect?', 'carbon dioxide', [['oxygen', 'Oxygen is not a greenhouse gas.'], ['nitrogen', 'Nitrogen is most of the air, but not a greenhouse gas.']], 'CO₂ and methane trap heat; burning fossil fuels raises CO₂.']
    ])
  ]});
  // ───────── Chemistry ─────────
  E.ajouter({ id:'gb-chemistry', nom:'Chemistry', ic:'⚗️', sous:'Atoms, bonding, reactions, organic chemistry', examens:{ Y11:'GCSE-style quiz', Y13:'A level-style quiz' }, chapitres:[
    C('particles', 'Particles & states of matter', 'Matter', ['Y6', 'Y7', 'Y8'], [
      ['Changing from a liquid to a gas is called…', 'evaporation (boiling)', [['condensation', 'Condensation is gas → liquid.'], ['melting', 'Melting is solid → liquid.']], 'Solid ⇄ liquid ⇄ gas: melting/freezing, evaporating/condensing.'],
      ['In which state are particles closest together?', 'solid', [['gas', 'Gas particles are far apart and zoom around.'], ['liquid', 'Close, but solids are packed in a regular pattern.']], 'Solids: fixed, vibrating particles in a regular pattern.'],
      ['Dissolving salt in water makes a…', 'solution', [['suspension', 'In a suspension bits float around.'], ['new element', 'No new element: you can get the salt back by evaporation.']], 'Solute + solvent = solution.']
    ]),
    C('atoms', 'Atomic structure & the periodic table', 'Atoms', ['Y8', 'Y9', 'Y10', 'Y11'], [
      ['Which particle has a negative charge?', 'electron', [['proton', 'Protons are positive.'], ['neutron', 'Neutrons are neutral: the name gives it away.']], 'Proton +1, neutron 0, electron −1.'],
      ['The atomic number tells you the number of…', 'protons', [['neutrons', 'Neutrons = mass number − atomic number.'], ['shells', 'Shells are the electron energy levels.']], 'Atomic number = protons (= electrons in a neutral atom).'],
      ['Group 1 metals are called…', 'alkali metals', [['halogens', 'Halogens are Group 7.'], ['noble gases', 'Noble gases are Group 0, and very unreactive.']], 'Alkali metals get MORE reactive down the group.'],
      ['Who arranged the first widely accepted periodic table, leaving gaps?', 'Dmitri Mendeleev', [['John Dalton', 'Dalton’s atomic model came earlier.'], ['Ernest Rutherford', 'Rutherford found the nucleus.']], 'Mendeleev left gaps for undiscovered elements (1869).'],
      ['Isotopes have the same number of protons but different numbers of…', 'neutrons', [['electrons', 'Neutral atoms keep electrons = protons.'], ['protons', 'Then it would be a different element!']], 'e.g. carbon-12 and carbon-14.']
    ]),
    C('bonding', 'Bonding & structure', 'Bonding', ['Y10', 'Y11', 'Y12'], [
      ['Sodium chloride has which type of bonding?', 'ionic', [['covalent', 'Metal + non-metal = ionic.'], ['metallic', 'Only one metal here.']], 'Ionic: electrons transferred, oppositely charged ions attract.'],
      ['Which has a giant covalent structure?', 'diamond', [['water', 'Water is a simple molecule.'], ['sodium', 'Sodium is metallic.']], 'Diamond, graphite and silicon dioxide are giant covalent.'],
      ['Why does graphite conduct electricity?', 'it has delocalised electrons', [['it is a metal', 'Graphite is carbon, a non-metal.'], ['it is shiny', 'Shiny does not mean conductive.']], 'Each carbon forms 3 bonds, leaving one free electron.']
    ]),
    C('quantitative', 'Moles & calculations', 'Quantitative', ['Y10', 'Y11', 'Y12', 'Y13'], null, r => {
      const [nom, Mr] = un(r, [['water (H₂O)', 18], ['carbon dioxide (CO₂)', 44], ['sodium chloride (NaCl)', 58.5], ['methane (CH₄)', 16]]), n = un(r, [0.5, 2, 3, 0.25]);
      return Q('What is the mass of ' + nb(n) + ' mol of ' + nom + '? (Mr = ' + Mr + ')', nb(n * Mr) + ' g', [[nb(Mr / n) + ' g', 'Divide? Mass = moles × Mr.'], [nb(n + Mr) + ' g', 'Adding moles and Mr is a unit crime.']], 'mass = moles × Mr');
    }),
    C('reactions', 'Chemical changes & energy', 'Reactions', ['Y7', 'Y8', 'Y9', 'Y10', 'Y11'], [
      ['Acid + alkali → ?', 'salt + water', [['salt + hydrogen', 'That is acid + metal.'], ['carbon dioxide + water', 'That needs a carbonate as well.']], 'Neutralisation: H⁺ + OH⁻ → H₂O.'],
      ['pH 1 is…', 'strongly acidic', [['neutral', 'Neutral is pH 7.'], ['strongly alkaline', 'Alkalis are above 7.']], 'pH below 7 acidic, 7 neutral, above 7 alkaline.'],
      ['An exothermic reaction…', 'releases energy to the surroundings', [['takes in energy', 'That is endothermic.'], ['has no energy change', 'Every reaction has some energy change.']], 'Exothermic: temperature of surroundings rises (combustion).'],
      ['At which electrode do metals form during electrolysis?', 'the cathode (negative)', [['the anode', 'Positive metal ions are attracted to the NEGATIVE electrode.'], ['both', 'Only one, Plumo promises.']], 'PANIC: Positive Anode, Negative Is Cathode.'],
      ['Test for hydrogen gas?', 'a squeaky pop with a lighted splint', [['relights a glowing splint', 'That is oxygen.'], ['turns limewater milky', 'That is carbon dioxide.']], 'H₂: squeaky pop. O₂: relights glowing splint. CO₂: limewater milky.']
    ]),
    C('rates', 'Rates & equilibrium', 'Rates', ['Y10', 'Y11', 'Y12', 'Y13'], [
      ['A catalyst…', 'speeds up a reaction without being used up', [['is used up in the reaction', 'Catalysts come out unchanged.'], ['slows reactions down', 'That would be an inhibitor.']], 'Catalysts lower the activation energy.'],
      ['Increasing temperature increases rate because particles…', 'collide more often and with more energy', [['get bigger', 'Particles do not grow when warm.'], ['stop moving', 'Opposite: they move faster.']], 'Collision theory: frequency and energy of collisions.'],
      ['The ⇌ symbol shows a…', 'reversible reaction', [['very fast reaction', 'It is about direction, not speed.'], ['mistake', 'Plumo assures you it is deliberate.']], 'At equilibrium, forward and reverse rates are equal.']
    ]),
    C('organic', 'Organic chemistry & the atmosphere', 'Organic', ['Y10', 'Y11', 'Y12', 'Y13'], [
      ['Alkanes have the general formula…', 'CₙH₂ₙ₊₂', [['CₙH₂ₙ', 'That is alkenes (one C=C double bond).'], ['CₙH₂ₙ₊₁OH', 'That is alcohols.']], 'Alkanes are saturated hydrocarbons.'],
      ['Test for alkenes?', 'bromine water turns colourless', [['limewater turns milky', 'That is for CO₂.'], ['litmus turns red', 'That is for acids.']], 'Alkenes decolourise orange bromine water.'],
      ['Crude oil is separated by…', 'fractional distillation', [['filtration', 'Filtration separates solids from liquids.'], ['chromatography', 'That separates dyes.']], 'Fractions condense at different heights (boiling points).']
    ]),
  ]});
  // ───────── Physics ─────────
  E.ajouter({ id:'gb-physics', nom:'Physics', ic:'⚡', sous:'Energy, electricity, forces, waves, space', examens:{ Y11:'GCSE-style quiz', Y13:'A level-style quiz' }, chapitres:[
    C('ks2-light', 'Light & electricity (Year 6)', 'KS2 science', ['Y6', 'Y7'], [
      ['Light travels in…', 'straight lines', [['circles', 'That would make torches very confusing.'], ['zigzags', 'Only in cartoons.']], 'That is why shadows have the same shape as the object.'],
      ['Adding more cells (batteries) to a circuit makes a bulb…', 'brighter', [['dimmer', 'More cells = more voltage = brighter.'], ['change colour', 'It just gets brighter.']], 'More voltage pushes more current through the bulb.'],
      ['We see objects because light…', 'reflects off them into our eyes', [['comes out of our eyes', 'An ancient Greek idea. We know better now.'], ['goes round them', 'Light does not walk around objects.']], 'Light source → object → eye.']
    ]),
    C('energy', 'Energy', 'Energy', ['Y7', 'Y8', 'Y9', 'Y10', 'Y11'], null, r => {
      const m = ent(r, 2, 20), v = ent(r, 2, 10), h = ent(r, 2, 15);
      return un(r, [
        () => Q('Kinetic energy of a ' + m + ' kg object moving at ' + v + ' m/s?', nb(0.5 * m * v * v) + ' J', [[nb(m * v) + ' J', 'Forgot the ½ and the square: Ek = ½mv².'], [nb(m * v * v) + ' J', 'Do not forget the ½.']], 'Ek = ½ × m × v²'),
        () => Q('GPE gained lifting ' + m + ' kg by ' + h + ' m (g = 9.8 N/kg)?', nb(m * 9.8 * h, 1) + ' J', [[nb(m * h) + ' J', 'Forgot g (9.8 N/kg).'], [nb(m * 9.8 + h, 1) + ' J', 'Everything multiplies: m × g × h.']], 'Ep = m × g × h'),
        () => { const P = ent(r, 2, 20) * 100, t = ent(r, 2, 10); return Q('Energy used by a ' + P + ' W kettle in ' + t + ' s?', (P * t) + ' J', [[nb(P / t) + ' J', 'Energy = power × time, not ÷.'], [(P + t) + ' J', 'Watts and seconds multiply.']], 'E = P × t'); }
      ])();
    }),
    C('electricity', 'Electricity', 'Electricity', ['Y8', 'Y9', 'Y10', 'Y11'], null, r => {
      const I = ent(r, 2, 6), R = ent(r, 2, 20);
      return un(r, [
        () => Q('Current ' + I + ' A through a ' + R + ' Ω resistor. Potential difference?', (I * R) + ' V', [[nb(R / I) + ' V', 'V = I × R, not R ÷ I.'], [(I + R) + ' V', 'Ohm’s law multiplies.']], 'V = I × R'),
        () => Q('A ' + (I * R) + ' V supply drives ' + I + ' A. Power?', (I * I * R) + ' W', [[(I * R) + ' W', 'That is the voltage. P = V × I.'], [nb(I * R / I) + ' W', 'Divide? Power multiplies V and I.']], 'P = V × I'),
        () => Q('In a series circuit, the current is…', 'the same everywhere', [['shared between components', 'That is the potential difference in series.'], ['zero after each bulb', 'Then the next bulb would never light!']], 'Series: same current; p.d. shared.')
      ])();
    }),
    C('forces', 'Forces & motion', 'Forces', ['Y7', 'Y8', 'Y9', 'Y10', 'Y11'], null, r => {
      const d = ent(r, 20, 400), t = ent(r, 4, 40), m = ent(r, 2, 80), a = ent(r, 1, 6);
      return un(r, [
        () => Q('Speed if you travel ' + d + ' m in ' + t + ' s?', nb(d / t) + ' m/s', [[nb(d * t) + ' m/s', 'Speed = distance ÷ time.'], [nb(t / d) + ' m/s', 'Upside down!']], 'speed = distance ÷ time'),
        () => Q('Weight of a ' + m + ' kg mass on Earth (g = 9.8 N/kg)?', nb(m * 9.8, 1) + ' N', [[m + ' N', 'That is the mass in kg. Weight is a force: W = mg.'], [nb(m / 9.8, 1) + ' N', 'Multiply by g, do not divide.']], 'W = m × g'),
        () => Q('Resultant force on a ' + m + ' kg mass accelerating at ' + a + ' m/s²?', (m * a) + ' N', [[nb(m / a) + ' N', 'F = m × a.'], [(m + a) + ' N', 'Newton multiplies, he does not add.']], 'F = m × a (Newton’s second law)')
      ])();
    }),
    C('waves', 'Waves & the EM spectrum', 'Waves', ['Y8', 'Y9', 'Y10', 'Y11'], [
      ['Which EM wave has the longest wavelength?', 'radio waves', [['gamma rays', 'Gamma has the SHORTEST wavelength.'], ['visible light', 'Visible light is in the middle.']], 'Radio, microwave, infrared, visible, UV, X-ray, gamma.'],
      ['Wave speed = ?', 'frequency × wavelength', [['frequency ÷ wavelength', 'v = f × λ.'], ['amplitude × frequency', 'Amplitude is about energy, not speed.']], 'v = f λ'],
      ['Sound waves are…', 'longitudinal', [['transverse', 'Light and water waves are transverse.'], ['electromagnetic', 'Sound needs a medium; EM waves do not.']], 'Longitudinal: vibrations parallel to direction of travel.']
    ]),
    C('atomic-space', 'Radioactivity & space', 'Atomic physics', ['Y9', 'Y10', 'Y11', 'Y12', 'Y13'], [
      ['Which radiation is stopped by paper?', 'alpha', [['gamma', 'Gamma needs thick lead or concrete.'], ['beta', 'Beta needs aluminium.']], 'Alpha: paper; beta: aluminium; gamma: lead.'],
      ['Half-life is the time for…', 'half the radioactive nuclei to decay', [['the sample to vanish', 'It never fully vanishes, it keeps halving.'], ['the atom to double', 'Atoms do not double. Plumo checked.']], 'After each half-life, activity halves.'],
      ['Our Sun is in which stage of its life cycle?', 'main sequence star', [['red giant', 'That comes much later.'], ['black hole', 'The Sun is too small to become one.']], 'Nebula → protostar → main sequence → red giant → white dwarf.'],
      ['What keeps planets in orbit around the Sun?', 'gravity', [['magnetism', 'Magnetism does not hold the Solar System together.'], ['air resistance', 'There is no air in space.']], 'Gravity provides the centripetal force.']
    ])
  ]});
})();
