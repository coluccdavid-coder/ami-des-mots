// Ami des mots — v6.2 : le programme officiel anglais, point par point.
// 1. Les chapitres qui manquaient (programmes of study du National Curriculum 2014 : KS2 Year 6, KS3, KS4 ;
//    contenus officiels du GCSE et du A level fixés par le DfE).
// 2. ENGLAND.PROGRAMME : pour chaque matière, les grandes parties du programme officiel et les chapitres qui les couvrent
//    (affiché dans chaque matière : « 📜 Official programme »). Les tests vérifient qu'aucune partie n'est vide.
// Sujets graves (Holocauste, guerres) : la « vanne » corrige sobrement, sans blague.
(function(){
  'use strict';
  const E = window.ENGLAND; if(!E) return;
  const { ent, un, nb, frac, pgcd, Q } = E.outils;
  const C = (id, nom, dom, niv, banque, gen) => ({ id, nom, dom, niv, banque, gen });
  const ajoute = (id, chs) => { const m = E.trouver(id); if(m) for(const c of chs) if(!m.chapitres.some(x => x.id === c.id)) m.chapitres.push(c); };
  // ───────── Maths ─────────
  ajoute('gb-maths', [
    C('measures-ks2', 'Measures, money & time', 'Measurement', ['Y6', 'Y7'], null, r => { const t = ent(r, 0, 2);
      if(t === 0){ const km = ent(r, 2, 9) + ent(r, 1, 9) / 10; return Q('How many metres are in ' + nb(km) + ' km?', Math.round(km * 1000).toLocaleString('en-GB') + ' m', [[Math.round(km * 100) + ' m', '1 km = 1000 m, not 100.'], [Math.round(km * 10000).toLocaleString('en-GB') + ' m', 'Ten times too many metres.']], '1 km = 1000 m.'); }
      if(t === 1){ const sm = un(r, [10, 20, 35, 45]), h = ent(r, 1, 2), d = un(r, [25, 40, 50]), fin = 2 * 60 + sm + h * 60 + d, hh = Math.floor(fin / 60), mm = fin % 60, txt = (a, b) => a + ':' + String(b).padStart(2, '0') + ' pm';
        return Q('A film starts at ' + txt(2, sm) + ' and lasts ' + h + ' h ' + d + ' min. When does it end?', txt(hh, mm), [[txt(hh - 1, mm), 'You forgot to carry the extra hour: 60 minutes make an hour.'], [txt(2 + h, sm + d), 'Minutes go up to 59, then a new hour starts!']], 'Add the hours, then the minutes; 60 minutes make an hour.'); }
      const p = ent(r, 2, 9) * 25, n = ent(r, 3, 6), livres = x => '£' + (x / 100).toFixed(2);
      return Q('Pens cost ' + p + 'p each. How much do ' + n + ' pens cost?', livres(p * n), [['£' + (p * n), 'Pence and pounds are not the same thing: 100p = £1.'], [livres(p + n * 100), 'Multiply, do not add!']], 'Multiply, then convert pence to pounds (÷ 100).'); }),
    C('factors', 'Factors, multiples & primes', 'Number', ['Y6', 'Y7', 'Y8', 'Y10', 'Y11'], null, r => { const a = un(r, [12, 18, 20, 24, 30, 36, 42, 48]), b = un(r, [8, 16, 27, 45, 60, 54]);
      const h = pgcd(a, b), l = a * b / h;
      return un(r, [() => Q('Highest common factor (HCF) of ' + a + ' and ' + b + '?', h, [[l, 'That is the LCM. Factors go INTO a number.'], [Math.min(a, b), 'That one does not divide both.']], 'List the factors (or use prime factors) and take the biggest shared one.'),
        () => Q('Lowest common multiple (LCM) of ' + a + ' and ' + b + '?', l, [[a * b === l ? l + a : a * b, 'Multiplying them always gives A common multiple, but not always the lowest.'], [h, 'That is the HCF.']], 'The LCM is the smallest number both divide into.'),
        () => { const pr = un(r, [29, 31, 37, 41, 43, 47, 53]); return Q('Which number is prime?', pr, [[un(r, [39, 49, 51]), 'Try dividing it by 3 or 7: it has other factors.'], [57, '57 = 3 × 19. Sneaky!'], [91, '91 = 7 × 13. The sneakiest of all.']], 'A prime has exactly two factors: 1 and itself.'); }])(); }),
    C('formulae', 'Formulae, inequalities & rearranging', 'Algebra', ['Y8', 'Y9', 'Y10', 'Y11'], null, r => { const a = ent(r, 2, 6), b = ent(r, 1, 9), x = ent(r, 2, 9);
      return un(r, [() => Q('Make x the subject of y = ' + a + 'x + ' + b, 'x = (y − ' + b + ') ÷ ' + a, [['x = y − ' + b + ' ÷ ' + a, 'Brackets matter: subtract first, then divide everything.'], ['x = ' + a + 'y + ' + b, 'You just swapped the letters. Undo the operations instead.']], 'Undo in reverse order: subtract ' + b + ', then divide by ' + a + '.'),
        () => Q('Solve ' + a + 'x + ' + b + ' > ' + (a * x + b), 'x > ' + x, [['x < ' + x, 'The sign only flips when you multiply or divide by a NEGATIVE number.'], ['x > ' + (a * x + b - b), 'You forgot to divide by ' + a + '.']], 'Solve like an equation, keep the inequality sign.'),
        () => Q('If v = u + at, find v when u = ' + b + ', a = ' + a + ', t = ' + x, b + a * x, [[(b + a) * x, 'Multiplication first: at = ' + a + ' × ' + x + '.'], [b * a * x, 'It is u PLUS at.'], [b + a + x, 'a and t are multiplied, not added.']], 'Substitute, then use BIDMAS.')])(); }),
    C('transformations', 'Transformations, constructions & bearings', 'Geometry', ['Y7', 'Y8', 'Y9', 'Y10', 'Y11'], [
      ['Which transformation flips a shape over a mirror line?', 'reflection', [['rotation', 'Rotation turns it around a point.'], ['translation', 'Translation slides it.']], 'Reflection, rotation, translation, enlargement.'],
      ['A shape is enlarged by scale factor 3. Its lengths are…', 'multiplied by 3', [['increased by 3', 'Scale factors multiply.'], ['divided by 3', 'That would make it smaller.']], 'Areas are multiplied by 3² = 9.'],
      ['Bearings are measured…', 'clockwise from north, with three figures', [['anticlockwise from east', 'North, clockwise, three figures: 045°.'], ['from south', 'Always from north.']], 'East is 090°, south 180°, west 270°.'],
      ['The bearing of west is…', '270°', [['90°', 'That is east.'], ['180°', 'That is south.']], 'North 000°, east 090°, south 180°, west 270°.'],
      ['How many lines of symmetry does a square have?', '4', [['2', 'Do not forget the diagonals.'], ['8', 'That is a regular octagon.']], 'Two through the sides, two through the corners.'],
      ['Translation by vector (3, −2) moves a shape…', '3 right and 2 down', [['3 up and 2 left', 'Top number: left/right. Bottom: up/down.'], ['3 left and 2 up', 'Signs matter: positive is right/up.']], 'Column vectors: (x, y).'],
      ['Congruent shapes are…', 'identical in shape and size', [['the same shape, different size', 'That is similar.'], ['the same colour', 'Colour does not count.']], 'Congruent: SSS, SAS, ASA, RHS.'],
      ['A perpendicular bisector cuts a line…', 'in half at right angles', [['into thirds', 'Bisect = cut in two.'], ['at 45°', 'Perpendicular = 90°.']], 'Use compasses from both ends.']
    ]),
    C('similarity-vectors', 'Similarity, circle theorems & vectors (Higher)', 'Geometry', ['Y10', 'Y11', 'Y12'], [
      ['The angle in a semicircle is…', '90°', [['180°', 'The diameter is 180°; the angle at the circle is 90°.'], ['45°', 'Plumo says: right angle!']], 'Circle theorem.'],
      ['The angle at the centre is … the angle at the circumference.', 'twice', [['half', 'The other way round.'], ['equal to', 'Equal applies to angles in the same segment.']], 'Same arc: centre angle = 2 × circumference angle.'],
      ['Opposite angles in a cyclic quadrilateral add up to…', '180°', [['360°', 'All four add to 360°; OPPOSITE pairs add to 180°.'], ['90°', 'Too small.']], 'Cyclic quadrilateral.'],
      ['A tangent meets a radius at…', '90°', [['60°', 'Right angle, always.'], ['any angle', 'Always 90°.']], 'Tangent ⟂ radius.'],
      ['Two similar shapes have length scale factor 2. Area scale factor?', '4', [['2', 'Areas are squared: 2².'], ['8', 'That is the volume scale factor (2³).']], 'Lengths k, areas k², volumes k³.'],
      ['If a = (2, 1) and b = (1, 3), what is a + b?', '(3, 4)', [['(2, 3)', 'Add the tops and the bottoms separately.'], ['(1, −2)', 'That is a − b… almost.']], 'Add column vectors component by component.']
    ]),
    C('proportion-growth', 'Direct & inverse proportion, growth & decay', 'Ratio', ['Y9', 'Y10', 'Y11'], null, r => { const P = un(r, [1000, 2000, 5000]), t = un(r, [2, 3]), i = un(r, [2, 5, 10]);
      return un(r, [() => Q('£' + P + ' is invested at ' + i + '% compound interest per year. Value after ' + t + ' years?', '£' + (P * Math.pow(1 + i / 100, t)).toFixed(2), [['£' + (P * (1 + i * t / 100)).toFixed(2), 'That is SIMPLE interest. Compound interest earns interest on the interest.'], ['£' + (P * Math.pow(i / 100, t)).toFixed(2), 'The multiplier is 1.' + String(i).padStart(2, '0') + ', not ' + i / 100 + '.']], 'Value = P × (1 + r/100)ⁿ.'),
        () => { const k = ent(r, 2, 6), x = ent(r, 2, 5); return Q('y is directly proportional to x. When x = ' + x + ', y = ' + (k * x) + '. Find y when x = ' + (x + 3) + '.', k * (x + 3), [[k * x + 3, 'Proportion multiplies; it does not add 3.'], [nb(k * x / (x + 3)), 'That is INVERSE proportion.']], 'y = kx, with k = ' + k + '.'); },
        () => { const w = ent(r, 2, 6), d = un(r, [12, 24, 30, 36]); return Q(w + ' workers take ' + d + ' days. How long for ' + (w * 2) + ' workers (same speed)?', (d / 2) + ' days', [[(d * 2) + ' days', 'More workers, LESS time: inverse proportion.'], [d + ' days', 'Twice as many workers should help!']], 'Inverse proportion: workers × days stays the same.'); }])(); }),
    C('functions-graphs', 'Graphs of functions & rates of change', 'Algebra', ['Y10', 'Y11', 'Y12'], [
      ['The graph of y = x² is…', 'a U-shaped parabola', [['a straight line', 'That is y = mx + c.'], ['a hyperbola', 'That is y = 1/x.']], 'Quadratic graphs are parabolas.'],
      ['The graph of y = 1/x is called…', 'a reciprocal graph (hyperbola)', [['a cubic', 'Cubics are y = x³.'], ['a circle', 'Circles are x² + y² = r².']], 'It never touches the axes.'],
      ['On a distance–time graph, the gradient is…', 'the speed', [['the distance', 'Distance is the y-value.'], ['the acceleration', 'That is on a velocity–time graph.']], 'Steeper = faster.'],
      ['The area under a velocity–time graph gives…', 'the distance travelled', [['the speed', 'Speed is read off the axis.'], ['the time', 'Time is on the x-axis.']], 'Gradient = acceleration; area = distance.'],
      ['x² + y² = 25 is a circle with radius…', '5', [['25', 'The radius is √25.'], ['12.5', 'Not half: square root.']], 'x² + y² = r².'],
      ['The turning point of y = (x − 3)² + 2 is…', '(3, 2)', [['(−3, 2)', 'The sign flips inside the bracket.'], ['(3, −2)', 'The +2 is the minimum value.']], 'Completed square form (x − a)² + b gives (a, b).']
    ]),
    C('data-probability-h', 'Sampling, charts, tree & Venn diagrams', 'Statistics', ['Y9', 'Y10', 'Y11'], [
      ['P(A) = 0.3 and P(B) = 0.5, independent. P(A and B)?', '0.15', [['0.8', 'That is adding: use AND = multiply.'], ['0.2', 'Subtracting is not a probability rule here.']], 'Independent events: multiply.'],
      ['In a Venn diagram, A ∩ B means…', 'in both A and B', [['in A or B', 'That is A ∪ B.'], ['in neither', 'That is outside both circles.']], '∩ = intersection, ∪ = union.'],
      ['Which is a random sample?', 'picking names out of a hat', [['asking your friends', 'That is a convenience sample: biased.'], ['asking only Year 7', 'Not everyone has a chance.']], 'Random: everyone has an equal chance.'],
      ['On a histogram, the height of each bar is…', 'frequency density', [['frequency', 'With unequal widths, use frequency density.'], ['the class width', 'No.']], 'Frequency density = frequency ÷ class width.'],
      ['A cumulative frequency graph helps you find…', 'the median and quartiles', [['the mode only', 'Mode comes from the tallest bar.'], ['the mean exactly', 'Not exactly.']], 'Read off at n/2, n/4, 3n/4.'],
      ['Positive correlation means…', 'as one variable increases, so does the other', [['no relationship', 'That is no correlation.'], ['one causes the other', 'Correlation does not prove causation!']], 'Scatter graphs.'],
      ['Relative frequency is…', 'how often it happened ÷ number of trials', [['the number of trials', 'Divide!'], ['always 1/2', 'Only for a fair coin in theory.']], 'More trials → better estimate.']
    ]),
    C('trig-alevel', 'Trigonometry, sequences & proof (A level)', 'Pure', ['Y12', 'Y13'], [
      ['π radians equals…', '180°', [['360°', 'That is 2π.'], ['90°', 'That is π/2.']], 'Radians: arc length = rθ.'],
      ['sin²θ + cos²θ = ?', '1', [['0', 'Pythagoras on the unit circle gives 1.'], ['tan θ', 'tan θ = sin θ / cos θ.']], 'Key identity.'],
      ['Sum of the arithmetic series 1 + 2 + … + 100?', '5050', [['10,000', 'That would be 100 × 100.'], ['5000', 'Close: n(n + 1)/2 = 5050.']], 'Sₙ = n/2 (first + last).'],
      ['A geometric series converges when…', '|r| < 1', [['r > 1', 'It explodes.'], ['r = 1', 'Then it adds forever.']], 'S∞ = a/(1 − r).'],
      ['Proof by contradiction starts by…', 'assuming the opposite is true', [['drawing a graph', 'Graphs illustrate, they do not prove.'], ['testing three examples', 'Examples are not a proof.']], 'e.g. √2 is irrational.'],
      ['d/dx (sin x) = ?', 'cos x', [['−cos x', 'That is the derivative of −sin x… sort of. Here: cos x.'], ['−sin x', 'That is d/dx (cos x).']], 'In radians.'],
      ['d/dx (eˣ) = ?', 'eˣ', [['x eˣ⁻¹', 'eˣ is special: it is its own derivative.'], ['ln x', 'That is its inverse.']], 'The exponential function.']
    ]),
    C('stats-mech-alevel', 'Hypothesis tests, moments & projectiles (A level)', 'Statistics & mechanics', ['Y12', 'Y13'], [
      ['A 5% significance level means…', 'the probability of wrongly rejecting H₀ is at most 5%', [['H₀ is 95% true', 'That is not how it works.'], ['5% of the data is wrong', 'No.']], 'Reject H₀ if the p-value < 0.05.'],
      ['The null hypothesis H₀ usually says…', 'nothing has changed', [['the effect is huge', 'That is the alternative.'], ['the data is biased', 'No.']], 'H₁ is the alternative.'],
      ['Moment of a force = ?', 'force × perpendicular distance from the pivot', [['force ÷ distance', 'Multiply.'], ['mass × acceleration', 'That is force.']], 'Units: N m.'],
      ['A projectile’s horizontal velocity (no air resistance)…', 'stays constant', [['increases', 'Gravity acts only vertically.'], ['becomes zero at the top', 'The VERTICAL velocity is zero at the top.']], 'Model with suvat separately in x and y.'],
      ['Friction F ≤ ?', 'μR', [['mg', 'Only R = mg on a flat surface.'], ['ma', 'That is the resultant force.']], 'Limiting friction F = μR.']
    ])
  ]);
  // ───────── English ─────────
  ajoute('gb-english', [
    C('vocab', 'Vocabulary: prefixes, suffixes & word families', 'Vocabulary', ['Y6', 'Y7', 'Y8'], [
      ['What does the prefix “mis-” mean in “misunderstand”?', 'wrongly', [['again', 'That is re-.'], ['before', 'That is pre-.']], 'mis- = wrongly or badly.'],
      ['Which word comes from the same family as “sign”?', 'signature', [['sing', 'Looks similar, different family.'], ['sigh', 'No link.']], 'sign, signal, signature: the g comes back!'],
      ['Which suffix turns “happy” into a noun?', '-ness', [['-ly', 'That makes an adverb: happily.'], ['-er', 'Happier is a comparative.']], 'happiness.'],
      ['An antonym of “generous” is…', 'mean', [['kind', 'That is closer to a synonym.'], ['giving', 'Also a synonym.']], 'Antonyms are opposites.'],
      ['“Transport” and “transatlantic” share the prefix trans-, meaning…', 'across', [['under', 'That is sub-.'], ['small', 'That is micro-.']], 'trans- = across.'],
      ['Which word is formal?', 'purchase', [['buy', 'Everyday word.'], ['grab', 'Very informal.']], 'Formal register: purchase, request, assist.'],
      ['The root “bio” means…', 'life', [['book', 'That is biblio-.'], ['water', 'That is hydro-.']], 'biology, biography, biodiversity.'],
      ['Which is a compound word?', 'football', [['playing', 'That is a verb with a suffix.'], ['quickly', 'Adjective + suffix.']], 'Two words joined: foot + ball.']
    ]),
    C('narrative-writing', 'Writing: narrative, description & structure', 'Writing', ['Y7', 'Y8', 'Y9', 'Y10', 'Y11'], [
      ['Starting a story in the middle of the action is called…', 'in medias res', [['a flashback', 'A flashback goes back in time.'], ['an epilogue', 'An epilogue comes at the end.']], 'Latin: “into the middle of things”.'],
      ['A cyclical structure…', 'ends where it began', [['has no ending', 'It has one: back at the start.'], ['is told by two narrators', 'That is dual narration.']], 'Satisfying and neat.'],
      ['Which is “show, not tell”?', 'Her hands shook as she gripped the letter.', [['She was nervous.', 'That TELLS us.'], ['She felt very, very nervous.', 'Still telling, just louder.']], 'Show emotions through actions and details.'],
      ['First-person narration uses…', '“I”', [['“he” or “she”', 'That is third person.'], ['“you”', 'That is second person.']], 'First person: personal and limited.'],
      ['Varying sentence length helps to…', 'control pace and create effect', [['confuse the examiner', 'Plumo does not recommend that.'], ['save ink', 'Not the aim.']], 'Short sentences build tension.'],
      ['A cliffhanger…', 'leaves the reader in suspense', [['explains everything', 'The opposite.'], ['is a type of punctuation', 'No.']], 'Common at chapter ends.'],
      ['Foreshadowing is…', 'a hint about what will happen later', [['a description of shadows', 'Clever, but no.'], ['the last line of a story', 'No.']], 'Builds expectation.']
    ]),
    C('spoken', 'Spoken English & presentations', 'Spoken language', ['Y7', 'Y8', 'Y9', 'Y10', 'Y11'], [
      ['In the GCSE spoken language endorsement, students…', 'give a presentation and answer questions', [['sing a song', 'Plumo would cheer, but no.'], ['write an essay', 'That is written work.']], 'Graded Pass, Merit or Distinction, reported separately.'],
      ['Standard English is…', 'the form of English used in formal situations', [['English with no slang ever', 'You can use slang with friends; Standard English is for formal contexts.'], ['only spoken in London', 'It is used everywhere.']], '“We were”, not “we was”.'],
      ['A good presentation should…', 'have a clear structure and eye contact', [['be read word for word from the page', 'Look at your audience!'], ['last as long as possible', 'Stick to the time.']], 'Plan: introduction, points, conclusion.'],
      ['Dialect means…', 'regional words and grammar', [['a type of accent only', 'Accent is pronunciation; dialect is words and grammar.'], ['a spelling mistake', 'No.']], 'e.g. “bairn” for child in the north-east.'],
      ['In a debate, rebuttal means…', 'answering the other side’s points', [['agreeing with everyone', 'That ends the debate fast.'], ['repeating your speech', 'No.']], 'Listen, then respond.'],
      ['Which is a discourse marker?', 'Furthermore', [['Banana', 'Plumo is hungry, but no.'], ['Running', 'That is a verb.']], 'Discourse markers guide the listener: firstly, however, finally.']
    ]),
    C('shakespeare-more', 'Shakespeare & 19th-century texts', 'Literature', ['Y7', 'Y8', 'Y9', 'Y10', 'Y11'], [
      ['In The Tempest, who is the magician who rules the island?', 'Prospero', [['Caliban', 'Caliban serves Prospero.'], ['Oberon', 'Oberon is in A Midsummer Night’s Dream.']], 'Prospero, with his spirit Ariel.'],
      ['In A Midsummer Night’s Dream, whose head is turned into a donkey’s?', 'Bottom', [['Puck', 'Puck does the magic.'], ['Lysander', 'He is one of the lovers.']], 'Titania falls in love with him.'],
      ['Which Shakespeare play features Shylock?', 'The Merchant of Venice', [['Hamlet', 'Hamlet is the prince of Denmark.'], ['Twelfth Night', 'That has Viola and Malvolio.']], 'Set in Venice.'],
      ['Who wrote Great Expectations?', 'Charles Dickens', [['Jane Austen', 'She wrote Pride and Prejudice.'], ['Thomas Hardy', 'He wrote Far from the Madding Crowd.']], 'Pip and Miss Havisham.'],
      ['Pride and Prejudice was written by…', 'Jane Austen', [['Charlotte Brontë', 'She wrote Jane Eyre.'], ['George Eliot', 'She wrote Middlemarch.']], 'Elizabeth Bennet and Mr Darcy (1813).'],
      ['A soliloquy is…', 'a character speaking their thoughts alone on stage', [['a song', 'No music needed.'], ['a conversation between two characters', 'That is dialogue.']], '“To be, or not to be…” (Hamlet).'],
      ['A tragedy usually ends with…', 'the downfall of the main character', [['a wedding', 'That is a comedy.'], ['a holiday', 'Not in Shakespeare.']], 'Tragic hero with a fatal flaw (hamartia).']
    ])
  ]);
  // ───────── Sciences ─────────
  ajoute('gb-biology', [
    C('body-systems', 'Skeleton, muscles & reproduction', 'Structure & function', ['Y6', 'Y7', 'Y8'], [
      ['Which is NOT a function of the skeleton?', 'digesting food', [['protecting organs', 'The skull protects the brain.'], ['making blood cells', 'Bone marrow does that.']], 'Support, protection, movement, making blood cells.'],
      ['Muscles that work in pairs are called…', 'antagonistic muscles', [['twin muscles', 'Nice name, wrong term.'], ['skeletal bones', 'Bones are not muscles.']], 'Biceps and triceps.'],
      ['Where does fertilisation happen in humans?', 'in the oviduct (fallopian tube)', [['in the stomach', 'Wrong system entirely.'], ['in the lungs', 'No.']], 'The embryo then implants in the uterus.'],
      ['Pollination is…', 'the transfer of pollen from anther to stigma', [['a plant drinking water', 'That is absorption.'], ['seeds falling', 'That is dispersal.']], 'Insects or wind carry pollen.'],
      ['What do tendons connect?', 'muscle to bone', [['bone to bone', 'That is ligaments.'], ['skin to muscle', 'No.']], 'Ligaments: bone to bone.'],
      ['During puberty, changes are caused by…', 'hormones', [['vitamins', 'Vitamins are nutrients.'], ['bacteria', 'No.']], 'Oestrogen and testosterone.'],
      ['Which part of a flower makes pollen?', 'the anther', [['the stigma', 'The stigma receives pollen.'], ['the petal', 'Petals attract insects.']], 'Anther + filament = stamen.']
    ]),
    C('homeostasis', 'Homeostasis, nerves & hormones', 'Homeostasis', ['Y10', 'Y11', 'Y12', 'Y13'], [
      ['Homeostasis means…', 'keeping internal conditions constant', [['growing taller', 'No.'], ['sleeping well', 'Nice, but no.']], 'Temperature, blood glucose, water.'],
      ['Which hormone lowers blood glucose?', 'insulin', [['glucagon', 'Glucagon raises it.'], ['adrenaline', 'Adrenaline is for fight or flight.']], 'Made by the pancreas.'],
      ['A reflex action is…', 'fast and automatic', [['slow and planned', 'Reflexes skip the thinking part.'], ['learnt at school', 'No.']], 'Stimulus → receptor → sensory neurone → relay → motor neurone → effector.'],
      ['The gap between two neurones is a…', 'synapse', [['nucleus', 'No.'], ['vein', 'Wrong system.']], 'Chemicals diffuse across it.'],
      ['Type 1 diabetes is when…', 'the pancreas does not make enough insulin', [['you eat too many sweets once', 'No.'], ['you have too much insulin', 'The opposite.']], 'Treated with insulin injections.'],
      ['Which gland is called the “master gland”?', 'the pituitary gland', [['the thyroid', 'It controls metabolism.'], ['the adrenal gland', 'It makes adrenaline.']], 'In the brain.'],
      ['When you are too hot, blood vessels near the skin…', 'widen (vasodilation)', [['narrow', 'That keeps heat in.'], ['disappear', 'No.']], 'More heat is lost by radiation.']
    ]),
    C('health', 'Health, drugs & lifestyle', 'Health', ['Y7', 'Y8', 'Y9', 'Y10', 'Y11'], [
      ['Which is a non-communicable disease?', 'coronary heart disease', [['flu', 'Flu spreads from person to person.'], ['measles', 'Measles is very infectious.']], 'Non-communicable: cannot be passed on.'],
      ['Smoking is linked to…', 'lung cancer and heart disease', [['better fitness', 'The opposite.'], ['stronger teeth', 'Definitely not.']], 'Lifestyle risk factors.'],
      ['A balanced diet includes…', 'carbohydrates, proteins, fats, vitamins, minerals, fibre and water', [['only protein', 'Not balanced.'], ['only fruit', 'Fruit alone is not balanced.']], 'Seven nutrients.'],
      ['Clinical trials test new drugs for…', 'safety, effectiveness and dose', [['taste only', 'No.'], ['colour', 'No.']], 'Double-blind trials use placebos.'],
      ['A placebo is…', 'a dummy treatment with no drug', [['a strong medicine', 'The opposite.'], ['a type of vaccine', 'No.']], 'Used to compare results fairly.']
    ]),
    C('molecules-alevel', 'Biological molecules & cells (A level)', 'A level', ['Y12', 'Y13'], [
      ['Glucose is a…', 'monosaccharide', [['polysaccharide', 'Starch is a polysaccharide.'], ['protein', 'Proteins are made of amino acids.']], 'Simple sugar.'],
      ['Which bond joins amino acids?', 'peptide bond', [['glycosidic bond', 'That joins sugars.'], ['ester bond', 'That is in lipids.']], 'Formed by condensation.'],
      ['ATP stands for…', 'adenosine triphosphate', [['amino tri-protein', 'No.'], ['active transport particle', 'Clever, no.']], 'The energy currency of the cell.'],
      ['The fluid mosaic model describes…', 'the cell membrane', [['the nucleus', 'No.'], ['DNA', 'No.']], 'Phospholipid bilayer with proteins.'],
      ['Mitosis produces…', 'two genetically identical cells', [['four different cells', 'That is meiosis.'], ['one cell', 'No.']], 'Growth and repair.']
    ])
  ]);
  ajoute('gb-chemistry', [
    C('separation', 'Pure substances, mixtures & separation', 'Matter', ['Y7', 'Y8', 'Y9', 'Y10', 'Y11'], [
      ['A pure substance has…', 'a sharp melting point', [['a range of melting points', 'That is a mixture.'], ['no melting point', 'Every substance has one.']], 'Impurities lower and widen the melting point.'],
      ['Which method separates the colours in ink?', 'chromatography', [['filtration', 'Filtering keeps solids out.'], ['magnetism', 'Ink is not magnetic.']], 'Rf = distance moved by spot ÷ distance moved by solvent.'],
      ['Distillation separates…', 'a liquid from a solution by boiling and condensing', [['sand from water only', 'Filtration is easier for that.'], ['magnets from iron', 'No.']], 'Used to make pure water.'],
      ['A formulation is…', 'a mixture designed for a purpose', [['an element', 'No.'], ['a single compound', 'It is a mixture.']], 'e.g. paints, medicines.'],
      ['Which is a compound?', 'water (H₂O)', [['oxygen (O₂)', 'Only one element.'], ['air', 'Air is a mixture.']], 'Compounds: two or more elements chemically bonded.']
    ]),
    C('earth-resources', 'Earth, atmosphere & resources', 'Earth', ['Y8', 'Y9', 'Y10', 'Y11'], [
      ['Which type of rock forms from cooled magma?', 'igneous', [['sedimentary', 'Formed from layers of sediment.'], ['metamorphic', 'Changed by heat and pressure.']], 'Granite and basalt are igneous.'],
      ['Marble is a … rock.', 'metamorphic', [['igneous', 'Marble comes from limestone changed by heat and pressure.'], ['sedimentary', 'Limestone is; marble is metamorphic.']], 'The rock cycle.'],
      ['Potable water is…', 'safe to drink', [['salty', 'Not safe to drink.'], ['frozen', 'Ice can be potable, but potable means drinkable.']], 'Filtration and sterilisation.'],
      ['A life cycle assessment looks at…', 'a product’s environmental impact from start to end', [['how long you live', 'No.'], ['a plant’s life cycle', 'Not here.']], 'Raw materials, making, using, disposal.'],
      ['The early atmosphere was mainly…', 'carbon dioxide', [['oxygen', 'Oxygen came later, from plants.'], ['helium', 'No.']], 'Volcanoes released it.']
    ]),
    C('analysis', 'Chemical analysis', 'Analysis', ['Y10', 'Y11'], [
      ['Lithium ions give a … flame.', 'crimson', [['lilac', 'Lilac is potassium.'], ['yellow', 'Yellow is sodium.']], 'Li crimson, Na yellow, K lilac, Ca orange-red, Cu green.'],
      ['Test for chlorine gas?', 'bleaches damp litmus paper', [['squeaky pop', 'That is hydrogen.'], ['limewater milky', 'That is CO₂.']], 'It may turn red first.'],
      ['Test for carbonate ions?', 'add acid: CO₂ is given off', [['add water', 'Nothing happens.'], ['add a magnet', 'No.']], 'Then bubble through limewater.'],
      ['Adding sodium hydroxide to copper(II) ions gives a … precipitate.', 'blue', [['white', 'White is calcium/magnesium/aluminium.'], ['brown', 'Brown is iron(III).']], 'Green is iron(II).'],
      ['Silver nitrate + chloride ions gives a … precipitate.', 'white', [['yellow', 'That is iodide.'], ['cream', 'That is bromide.']], 'Add dilute nitric acid first.']
    ]),
    C('energetics-alevel', 'Energetics & equilibria (A level)', 'A level', ['Y12', 'Y13'], [
      ['ΔH is negative for…', 'exothermic reactions', [['endothermic reactions', 'Endothermic: positive ΔH.'], ['all reactions', 'No.']], 'Energy released to surroundings.'],
      ['Hess’s law says…', 'the enthalpy change is independent of the route', [['reactions are always fast', 'No.'], ['energy is lost', 'Energy is conserved.']], 'Used with enthalpy cycles.'],
      ['Kc depends only on…', 'temperature', [['pressure', 'Pressure shifts the position, not Kc.'], ['a catalyst', 'Catalysts do not change Kc.']], 'Equilibrium constant.'],
      ['pH = ?', '−log[H⁺]', [['log[H⁺]', 'There is a minus sign.'], ['[H⁺] × 10', 'No.']], 'Strong acids fully dissociate.'],
      ['An electrophile is…', 'an electron-pair acceptor', [['an electron-pair donor', 'That is a nucleophile.'], ['a type of metal', 'No.']], 'Alkenes react with electrophiles.']
    ])
  ]);
  ajoute('gb-physics', [
    C('matter', 'Matter, density & pressure', 'Matter', ['Y7', 'Y8', 'Y9', 'Y10', 'Y11'], null, r => { const m = ent(r, 2, 40) * 10, v = un(r, [5, 10, 20, 25, 50]), F = ent(r, 2, 20) * 10, A = un(r, [2, 4, 5, 10]);
      return un(r, [() => Q('Density of a ' + m + ' g object with volume ' + v + ' cm³?', nb(m / v) + ' g/cm³', [[nb(m * v) + ' g/cm³', 'Density = mass ÷ volume.'], [nb(v / m) + ' g/cm³', 'Upside down!']], 'ρ = m ÷ V'),
        () => Q('Pressure when ' + F + ' N acts on ' + A + ' m²?', nb(F / A) + ' Pa', [[(F * A) + ' Pa', 'Pressure = force ÷ area.'], [nb(A / F) + ' Pa', 'Upside down!']], 'p = F ÷ A'),
        () => Q('Why do gas particles exert pressure?', 'they collide with the container walls', [['they are heavy', 'No.'], ['they stick to the walls', 'They bounce off.']], 'Hotter gas: faster particles, more pressure.')])(); }),
    C('magnetism', 'Magnetism & electromagnetism', 'Electromagnetism', ['Y7', 'Y8', 'Y9', 'Y10', 'Y11'], [
      ['Like poles…', 'repel', [['attract', 'Opposite poles attract.'], ['do nothing', 'They push apart.']], 'N–N and S–S repel.'],
      ['Which metal is magnetic?', 'iron', [['copper', 'Copper is not magnetic.'], ['aluminium', 'Not magnetic.']], 'Iron, nickel, cobalt (and steel).'],
      ['How can you make an electromagnet stronger?', 'more coils or more current', [['use a plastic core', 'An iron core helps.'], ['paint it red', 'Plumo likes red, but no.']], 'Coil of wire carrying current.'],
      ['The motor effect is…', 'a force on a current-carrying wire in a magnetic field', [['a car engine', 'Wrong motor.'], ['static electricity', 'No.']], 'Fleming’s left-hand rule.'],
      ['A transformer changes…', 'the voltage of an alternating current', [['DC into AC', 'No.'], ['electricity into light', 'That is a bulb.']], 'Step-up for the National Grid.']
    ]),
    C('thermal', 'Particle model & energy transfers', 'Energy', ['Y9', 'Y10', 'Y11'], [
      ['Specific heat capacity is the energy needed to…', 'raise 1 kg by 1 °C', [['melt 1 kg', 'That is specific latent heat.'], ['boil water', 'Too specific.']], 'ΔE = m c Δθ.'],
      ['Energy is never…', 'created or destroyed', [['transferred', 'It is transferred all the time.'], ['stored', 'It can be stored.']], 'Conservation of energy.'],
      ['Efficiency = ?', 'useful output ÷ total input', [['total input ÷ useful output', 'Upside down: efficiency is never above 1.'], ['wasted ÷ useful', 'No.']], 'Often given as a percentage.'],
      ['Insulation in a loft reduces…', 'energy transfer by conduction and convection', [['electricity bills to zero', 'Nice dream.'], ['radiation from the Sun', 'Not the aim.']], 'Lower thermal conductivity.'],
      ['Which is a renewable energy resource?', 'solar', [['coal', 'Fossil fuel.'], ['oil', 'Fossil fuel.']], 'Also wind, hydro, tidal, geothermal, biofuel.']
    ]),
    C('physics-alevel', 'Fields, circuits & quantum (A level)', 'A level', ['Y12', 'Y13'], [
      ['The photoelectric effect is evidence that light…', 'behaves as particles (photons)', [['is a sound wave', 'No.'], ['has mass', 'Photons have no rest mass.']], 'E = hf.'],
      ['Resistivity ρ = ?', 'RA ÷ L', [['RL ÷ A', 'Area goes on top.'], ['V × I', 'That is power.']], 'Depends on the material.'],
      ['Newton’s law of gravitation: F ∝…', '1/r²', [['r', 'It gets weaker with distance.'], ['1/r', 'Inverse SQUARE.']], 'F = GMm/r².'],
      ['Simple harmonic motion: acceleration is…', 'proportional to displacement and opposite in direction', [['constant', 'No.'], ['always zero', 'Only at equilibrium.']], 'a = −ω²x.'],
      ['Momentum = ?', 'mass × velocity', [['mass × acceleration', 'That is force.'], ['½mv²', 'That is kinetic energy.']], 'Conserved in collisions.']
    ])
  ]);
  // ───────── History, Geography, Citizenship, Computing ─────────
  ajoute('gb-history', [
    C('holocaust', 'The Holocaust', 'KS3 (statutory)', ['Y9', 'Y10', 'Y11'], [
      ['What was the Holocaust?', 'the murder of about six million Jewish people by Nazi Germany and its collaborators', [['a battle of the First World War', 'No. The Holocaust happened during the Second World War.'], ['the bombing of British cities', 'No. That was the Blitz.']], 'Other groups were also persecuted and murdered, including Roma and disabled people.'],
      ['What were the Nuremberg Laws (1935)?', 'laws that took away Jewish people’s rights in Germany', [['laws to end the war', 'No. They removed citizenship and rights from Jewish Germans.'], ['traffic laws', 'No.']], 'They banned marriage between Jewish and non-Jewish Germans.'],
      ['What was the Kindertransport?', 'a rescue that brought about 10,000 mainly Jewish children to Britain', [['a school bus service', 'No. It was a rescue effort in 1938–39.'], ['a German army unit', 'No.']], 'Most never saw their parents again.'],
      ['Which camp, liberated in January 1945, is the largest Nazi death camp memorial?', 'Auschwitz-Birkenau', [['Colditz', 'No. Colditz was a prisoner-of-war camp.'], ['Stalag Luft III', 'No. It held prisoners of war.']], 'Holocaust Memorial Day is 27 January, the anniversary.'],
      ['Who wrote a diary while hiding in Amsterdam?', 'Anne Frank', [['Malala Yousafzai', 'No. Malala campaigns for girls’ education today.'], ['Florence Nightingale', 'No. She lived in the 19th century.']], 'Her diary was published after the war.']
    ]),
    C('britain-1901', 'Britain since 1901: votes, welfare & change', 'KS3 & GCSE', ['Y9', 'Y10', 'Y11'], [
      ['When did some women first get the vote in UK general elections?', '1918', [['1066', 'Much later!'], ['1990', 'Much earlier.']], 'Women over 30 with property; equal voting at 21 in 1928.'],
      ['Who led the Suffragettes (WSPU)?', 'Emmeline Pankhurst', [['Queen Victoria', 'She opposed votes for women.'], ['Margaret Thatcher', 'She was born in 1925.']], 'Founded 1903: “Deeds not words”.'],
      ['The Windrush generation arrived in Britain from…', 'the Caribbean', [['Australia', 'No.'], ['Canada', 'No.']], 'HMT Empire Windrush docked in 1948.'],
      ['The welfare state was based on a report by…', 'William Beveridge', [['Winston Churchill', 'He was PM during the war.'], ['Charles Darwin', 'No.']], 'The Beveridge Report (1942): five “giants”.'],
      ['Who led the US civil rights movement and gave the “I have a dream” speech?', 'Martin Luther King Jr', [['Abraham Lincoln', 'He lived a century earlier.'], ['John F. Kennedy', 'He was president.']], 'Washington, 1963.'],
      ['When did India gain independence from Britain?', '1947', [['1918', 'Too early.'], ['1990', 'Too late.']], 'Partition created India and Pakistan.']
    ]),
    C('elizabethan-norman', 'GCSE British depth: Normans & Elizabethans', 'GCSE options', ['Y10', 'Y11'], [
      ['What was the “Harrying of the North” (1069–70)?', 'William’s brutal destruction of northern England after rebellions', [['a Viking festival', 'No.'], ['a peace treaty', 'The opposite.']], 'Villages and crops were destroyed.'],
      ['Who was Elizabeth I’s main secretary and spymaster?', 'Francis Walsingham', [['Thomas Cromwell', 'He served Henry VIII.'], ['Walter Raleigh', 'An explorer and courtier.']], 'He uncovered the Babington Plot.'],
      ['Which cousin of Elizabeth I was executed in 1587?', 'Mary, Queen of Scots', [['Lady Jane Grey', 'Executed in 1554.'], ['Anne Boleyn', 'Elizabeth’s mother, executed 1536.']], 'After the Babington Plot.'],
      ['The Elizabethan “golden age” is linked to…', 'theatre, exploration and art', [['the internet', 'Four centuries early.'], ['space travel', 'No.']], 'Shakespeare, Drake, Raleigh.'],
      ['The feudal system was introduced in England by…', 'the Normans', [['the Romans', 'No.'], ['the Victorians', 'No.']], 'Land in return for loyalty and service.']
    ])
  ]);
  ajoute('gb-geography', [
    C('rocks-glaciation', 'Rocks, weathering & glaciation', 'Physical', ['Y7', 'Y8', 'Y9', 'Y10', 'Y11'], [
      ['Freeze-thaw weathering happens when…', 'water freezes in cracks and expands', [['rocks melt', 'Rocks do not melt in winter.'], ['plants grow', 'That is biological weathering.']], 'Repeated freezing breaks the rock.'],
      ['A corrie is formed by…', 'glacial erosion', [['a river', 'Rivers make V-shaped valleys.'], ['the sea', 'No.']], 'An armchair-shaped hollow.'],
      ['Glaciers carve valleys into a … shape.', 'U', [['V', 'V is for rivers.'], ['W', 'No.']], 'U-shaped valleys, e.g. in the Lake District.'],
      ['The geological timescale is measured in…', 'millions of years', [['days', 'Rocks are a bit older than that.'], ['centuries', 'Much longer.']], 'The Earth is about 4.6 billion years old.'],
      ['Which is chemical weathering?', 'rainwater dissolving limestone', [['ice breaking rock', 'That is physical.'], ['roots splitting rock', 'That is biological.']], 'Rain is slightly acidic.']
    ]),
    C('ecosystems', 'Ecosystems: rainforests, deserts & cold places', 'Physical', ['Y8', 'Y9', 'Y10', 'Y11'], [
      ['Tropical rainforests are found near…', 'the Equator', [['the poles', 'Too cold.'], ['the Sahara', 'That is a desert.']], 'Hot and wet all year.'],
      ['A cause of deforestation in the Amazon is…', 'cattle ranching', [['too much snow', 'No snow in the Amazon.'], ['volcanoes', 'Not the main cause.']], 'Also logging, mining, roads.'],
      ['A cactus survives in deserts thanks to…', 'storing water in its stem', [['big flat leaves', 'Big leaves would lose water.'], ['growing in winter only', 'No.']], 'Spines reduce water loss.'],
      ['Permafrost is…', 'ground that stays frozen all year', [['a type of glacier', 'Glaciers are ice on land; permafrost is frozen ground.'], ['a desert plant', 'No.']], 'Found in tundra.'],
      ['Sustainable management of rainforests includes…', 'selective logging and ecotourism', [['clearing it all', 'Not sustainable.'], ['burning it', 'No.']], 'Protect for future generations.']
    ]),
    C('population-economy', 'Population, economy & resources', 'Human', ['Y8', 'Y9', 'Y10', 'Y11'], [
      ['Primary industry involves…', 'extracting raw materials', [['making products', 'That is secondary.'], ['providing services', 'That is tertiary.']], 'Farming, fishing, mining.'],
      ['The UK’s economy today is mainly…', 'tertiary (services)', [['primary', 'Much less now.'], ['secondary', 'Manufacturing has declined.']], 'And growing quaternary (research, IT).'],
      ['Food security means…', 'everyone has enough safe, nutritious food', [['locking the fridge', 'Plumo approves, but no.'], ['growing only one crop', 'That can reduce security.']], 'Linked to water and energy security.'],
      ['Migration from rural to urban areas is driven by…', 'push and pull factors', [['the weather only', 'Many factors.'], ['luck', 'No.']], 'Jobs, services, opportunities.'],
      ['World population is about…', '8 billion', [['8 million', 'Much more.'], ['80 billion', 'Much less.']], 'Reached 8 billion in 2022.']
    ]),
    C('fieldwork', 'Geographical skills & fieldwork', 'Skills', ['Y7', 'Y8', 'Y9', 'Y10', 'Y11'], [
      ['A hypothesis is…', 'a statement you test', [['your final answer', 'That is the conclusion.'], ['a type of map', 'No.']], 'e.g. “Pebbles get smaller downstream.”'],
      ['Primary data is…', 'data you collect yourself', [['data from a textbook', 'That is secondary.'], ['the first page of a book', 'No.']], 'Measurements, surveys, photos.'],
      ['Which graph shows rainfall and temperature together?', 'a climate graph', [['a pie chart', 'No.'], ['a scatter graph', 'Not usually.']], 'Bars for rainfall, line for temperature.'],
      ['GIS stands for…', 'Geographic Information Systems', [['Great Island Survey', 'Nice try.'], ['Global Ice Station', 'No.']], 'Digital maps with layers of data.'],
      ['A risk assessment before fieldwork…', 'identifies hazards and how to reduce them', [['measures rivers', 'No.'], ['is optional', 'Always do one.']], 'Safety first.']
    ])
  ]);
  ajoute('gb-citizenship', [
    C('police-courts-world', 'Police, courts, public money & the UK in the world', 'Citizenship', ['Y7', 'Y8', 'Y9', 'Y10', 'Y11'], [
      ['Who sets the UK government’s budget plans each year?', 'the Chancellor of the Exchequer', [['the King', 'The King does not set taxes.'], ['the BBC', 'No.']], 'Presented to Parliament.'],
      ['Income tax pays for…', 'public services like the NHS and schools', [['private holidays', 'No.'], ['nothing', 'It funds public spending.']], 'Along with VAT, National Insurance and more.'],
      ['The UK is a permanent member of…', 'the UN Security Council', [['the European Union', 'The UK left the EU in 2020.'], ['the US Congress', 'No.']], 'Five permanent members.'],
      ['The Commonwealth is…', 'an association of 56 countries, mostly former British territories', [['a bank', 'No.'], ['a football league', 'No.']], 'Commonwealth Games every four years.'],
      ['Volunteering means…', 'giving your time to help without being paid', [['being paid twice', 'No.'], ['skipping school', 'No.']], 'Active citizenship.'],
      ['Who can be called for jury service?', 'most adults aged 18 to 75 on the electoral register', [['only lawyers', 'Juries are ordinary citizens.'], ['children', 'No.']], 'Twelve jurors in the Crown Court.']
    ])
  ]);
  ajoute('gb-computing', [
    C('programming-concepts', 'Programming concepts & robust programs', 'Programming', ['Y8', 'Y9', 'Y10', 'Y11', 'Y12', 'Y13'], [
      ['Which data type stores whole numbers?', 'integer', [['string', 'Strings are text.'], ['Boolean', 'Booleans are True/False.']], 'integer, real/float, string, Boolean, character.'],
      ['An IF statement is an example of…', 'selection', [['iteration', 'Loops are iteration.'], ['sequence', 'Sequence is step-by-step order.']], 'Sequence, selection, iteration.'],
      ['A WHILE loop is…', 'condition-controlled iteration', [['count-controlled', 'That is a FOR loop.'], ['a type of variable', 'No.']], 'Repeats while a condition is true.'],
      ['A subroutine that returns a value is a…', 'function', [['procedure', 'Procedures do not return a value.'], ['loop', 'No.']], 'Subroutines make code reusable.'],
      ['Validation checks that data is…', 'sensible and in the right format', [['definitely correct', 'Validation cannot guarantee correctness.'], ['encrypted', 'No.']], 'Range check, length check, presence check.'],
      ['Testing with data just inside and outside a range is…', 'boundary testing', [['normal testing', 'Normal data is typical.'], ['no testing', 'No.']], 'Normal, boundary, erroneous data.'],
      ['A syntax error is…', 'breaking the rules of the language', [['a wrong answer from correct code', 'That is a logic error.'], ['a hardware fault', 'No.']], 'The program will not run.']
    ]),
    C('hardware-safety', 'Hardware, software & online safety', 'Computer systems', ['Y7', 'Y8', 'Y9', 'Y10', 'Y11'], [
      ['An operating system…', 'manages hardware and runs programs', [['is a type of virus', 'No.'], ['is a keyboard', 'That is hardware.']], 'e.g. Windows, macOS, Android.'],
      ['Which is secondary storage?', 'an SSD', [['RAM', 'RAM is primary memory.'], ['the CPU', 'The CPU processes data.']], 'SSD, hard disk, USB stick.'],
      ['A strong password has…', 'length, mixed characters and is not reused', [['your pet’s name', 'Easy to guess.'], ['123456', 'Plumo sighs.']], 'Use a password manager.'],
      ['If someone online makes you uncomfortable, you should…', 'tell a trusted adult and report it', [['keep it secret', 'Always tell someone.'], ['send them your address', 'Never share personal details.']], 'CEOP and Childline can help.'],
      ['Two-factor authentication adds…', 'a second check, like a code on your phone', [['two passwords that are the same', 'No.'], ['a second keyboard', 'No.']], 'Makes accounts much safer.']
    ])
  ]);
  // ───────── Le programme officiel, partie par partie (affiché dans chaque matière) ─────────
  E.PROGRAMME = {
    'gb-maths':[
      ['Number (place value, calculation, fractions, decimals, percentages)', 'KS2 · KS3 · GCSE', ['place-value', 'arithmetic', 'fdp', 'negatives', 'factors', 'indices', 'surds-higher']],
      ['Measurement (units, money, time, perimeter, area, volume)', 'KS2', ['measures-ks2', 'area']],
      ['Algebra (expressions, equations, sequences, graphs, functions)', 'KS3 · GCSE', ['algebra-basics', 'equations', 'formulae', 'sequences', 'graphs', 'quadratics', 'simultaneous', 'functions-graphs']],
      ['Ratio, proportion and rates of change', 'KS2 · KS3 · GCSE', ['ratio-ks2', 'ratio-proportion', 'proportion-growth', 'circles']],
      ['Geometry and measures', 'KS2 · KS3 · GCSE', ['angles', 'area', 'pythagoras', 'transformations', 'similarity-vectors', 'circles']],
      ['Probability', 'KS3 · GCSE', ['probability', 'data-probability-h']],
      ['Statistics', 'KS2 · KS3 · GCSE', ['statistics-basic', 'data-probability-h']],
      ['A level Pure (proof, algebra, trigonometry, calculus, exponentials)', 'A level', ['differentiation', 'integration', 'logs', 'trig-alevel']],
      ['A level Statistics and Mechanics', 'A level', ['binomial-stats', 'mechanics', 'stats-mech-alevel']]],
    'gb-english':[
      ['Grammar and punctuation (KS2 appendix 2)', 'KS2 · KS3', ['word-classes', 'tenses', 'punctuation']],
      ['Spelling and vocabulary', 'KS2 · KS3', ['spelling', 'vocab']],
      ['Reading: comprehension, inference, language and structure', 'KS2 · KS3 · GCSE', ['reading-skills', 'techniques', 'lang-paper']],
      ['Writing: narrative, descriptive and non-fiction', 'KS3 · GCSE', ['narrative-writing', 'persuasive']],
      ['Spoken English', 'KS3 · GCSE', ['spoken']],
      ['Shakespeare', 'KS3 · GCSE', ['macbeth', 'romeo', 'shakespeare-more']],
      ['19th-century novel and modern texts', 'GCSE', ['christmas-carol', 'jekyll', 'shakespeare-more']],
      ['Poetry (including the anthology)', 'KS3 · GCSE', ['poetry']],
      ['A level literary study', 'A level', ['alevel-lit']]],
    'gb-biology':[
      ['Structure and function of living organisms (cells, body systems)', 'KS2 · KS3 · GCSE', ['ks2-living', 'cells', 'body-systems', 'organisation', 'transport']],
      ['Material cycles and energy (photosynthesis, respiration)', 'KS3 · GCSE', ['bioenergetics']],
      ['Interactions and interdependencies (ecology)', 'KS3 · GCSE', ['ecology']],
      ['Genetics and evolution', 'KS2 · KS3 · GCSE', ['ks2-living', 'genetics']],
      ['Health, disease and medicines', 'KS3 · GCSE', ['infection', 'health']],
      ['Homeostasis and response', 'GCSE', ['homeostasis']],
      ['A level biology', 'A level', ['molecules-alevel', 'genetics', 'homeostasis']]],
    'gb-chemistry':[
      ['The particulate nature of matter', 'KS2 · KS3', ['particles']],
      ['Atoms, elements, compounds and the periodic table', 'KS3 · GCSE', ['atoms', 'bonding']],
      ['Pure and impure substances, separation', 'KS3 · GCSE', ['separation']],
      ['Chemical reactions and energetics', 'KS3 · GCSE', ['reactions', 'rates']],
      ['Quantitative chemistry', 'GCSE', ['quantitative']],
      ['Organic chemistry', 'GCSE', ['organic']],
      ['Chemical analysis', 'GCSE', ['analysis']],
      ['Earth, atmosphere and resources', 'KS3 · GCSE', ['earth-resources', 'organic']],
      ['A level chemistry', 'A level', ['energetics-alevel', 'quantitative', 'rates']]],
    'gb-physics':[
      ['Light, sound and waves', 'KS2 · KS3 · GCSE', ['ks2-light', 'waves']],
      ['Energy', 'KS3 · GCSE', ['energy', 'thermal']],
      ['Electricity and electromagnetism', 'KS2 · KS3 · GCSE', ['ks2-light', 'electricity', 'magnetism']],
      ['Motion and forces', 'KS3 · GCSE', ['forces']],
      ['Matter (particle model, density, pressure)', 'KS3 · GCSE', ['matter', 'thermal']],
      ['Atomic structure and space physics', 'KS3 · GCSE', ['atomic-space']],
      ['A level physics', 'A level', ['physics-alevel', 'atomic-space']]],
    'gb-history':[
      ['Ancient and early Britain (Romans, Anglo-Saxons, Vikings)', 'KS2', ['ks2-history']],
      ['Medieval Britain 1066–1509', 'KS3', ['medieval', 'elizabethan-norman']],
      ['Church, state and society 1509–1745', 'KS3', ['tudors', 'elizabethan-norman']],
      ['Industry and empire 1745–1901', 'KS3', ['industrial']],
      ['Britain, Europe and the world 1901 to the present, including the Holocaust', 'KS3', ['world-wars', 'holocaust', 'britain-1901']],
      ['GCSE period, wider world and thematic studies', 'GCSE', ['germany', 'cold-war', 'medicine', 'elizabethan-norman']]],
    'gb-geography':[
      ['Locational and place knowledge, map skills', 'KS2 · KS3', ['maps']],
      ['Physical geography: tectonics, rocks, weather, climate, glaciation, rivers, coasts', 'KS3 · GCSE', ['hazards', 'rocks-glaciation', 'climate', 'rivers-coasts']],
      ['Ecosystems', 'GCSE', ['ecosystems']],
      ['Human geography: population, cities, development, economy, resources', 'KS3 · GCSE', ['urban-dev', 'population-economy']],
      ['Geographical skills and fieldwork', 'KS3 · GCSE', ['fieldwork', 'maps']]],
    'gb-citizenship':[
      ['Parliamentary democracy and the monarchy', 'KS3 · KS4', ['parliament']],
      ['Rights, laws, police and courts', 'KS3 · KS4', ['rights-law', 'police-courts-world']],
      ['Public money and personal finance', 'KS3 · KS4', ['rights-law', 'police-courts-world']],
      ['The UK in the world, volunteering', 'KS4', ['police-courts-world']],
      ['Religious education (world religions)', 'KS2 · KS3 · GCSE', ['religions']]],
    'gb-computing':[
      ['Algorithms and computational thinking', 'KS3 · GCSE', ['algorithms']],
      ['Programming (Python), robust programs', 'KS3 · GCSE · A level', ['python', 'programming-concepts']],
      ['Data representation (binary, hex, images, sound)', 'KS3 · GCSE', ['binary', 'units']],
      ['Computer systems, networks and security', 'KS3 · GCSE', ['systems-networks', 'hardware-safety']],
      ['Databases, SQL, ethics and law', 'GCSE', ['sql-ethics']],
      ['Online safety', 'KS3', ['hardware-safety']]],
    'gb-french':[
      ['Phonics, vocabulary and the GCSE word list', 'KS3 · GCSE', ['basics', 'exam-2026']],
      ['Grammar and tenses', 'KS3 · GCSE', ['verbs']],
      ['Themes: people, school, travel, environment', 'GCSE', ['topics']],
      ['The four papers (listening with dictation, speaking, reading, writing)', 'GCSE (from 2026)', ['exam-2026']]],
    'gb-economics':[
      ['Markets and market failure (microeconomics)', 'A level', ['micro']],
      ['The national and international economy (macroeconomics)', 'A level', ['macro']]],
    'gb-psychology':[
      ['Memory and attachment', 'A level', ['memory']],
      ['Social influence and research methods', 'A level', ['social']]]
  };
})();
