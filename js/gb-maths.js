// Ami des mots — v6.1 : Maths, England (Year 6 SATs → GCSE → A level). Questions générées : jamais deux fois les mêmes nombres.
(function(){
  'use strict';
  const E = window.ENGLAND; if(!E) return;
  const { ent, un, nb, frac, Q } = E.outils;
  const sq = n => n * n;
  const C = (id, nom, dom, niv, gen) => ({ id, nom, dom, niv, gen });
  const chapitres = [
    // ── Key stage 2 (Year 6 SATs) ──
    C('place-value', 'Place value & rounding', 'Number', ['Y6', 'Y7'], r => {
      const p = un(r, [[10, 'ten'], [100, 'hundred'], [1000, 'thousand'], [100000, 'hundred thousand']]); let n = ent(r, 100000, 9999999); if(n % p[0] === 0) n += 3; const arr = Math.round(n / p[0]) * p[0];
      return Q('Round ' + n.toLocaleString('en-GB') + ' to the nearest ' + p[1] + '.', arr.toLocaleString('en-GB'),
        [[(Math.floor(n / p[0]) * p[0] === arr ? Math.ceil(n / p[0]) * p[0] : Math.floor(n / p[0]) * p[0]).toLocaleString('en-GB'), 'Wrong direction! Look at the digit to the right: 5 or more rounds UP.'],
         [(Math.round(n / (p[0] * 10)) * p[0] * 10).toLocaleString('en-GB'), 'You rounded one column too far. Plumo counts: ' + p[1] + 's, not the next column.'], [n.toLocaleString('en-GB'), 'That is the number you started with. Rounding means changing it!']],
        'Find the ' + p[1] + 's digit, look at the digit to its right: 0–4 stays, 5–9 rounds up.'); }),
    C('arithmetic', 'Arithmetic (no calculator)', 'Number', ['Y6', 'Y7'], r => {
      const t = ent(r, 0, 3);
      if(t === 0){ const a = ent(r, 1200, 9800), b = ent(r, 300, 4999); return Q(a + ' − ' + b + ' = ?', a - b, [[a - b + 100, 'An extra hundred appeared from nowhere. Check the exchange.'], [Math.abs(b - a) - 10, 'Column subtraction: borrow carefully, one column at a time.']], 'Line up the columns and exchange (borrow) when the top digit is smaller.'); }
      if(t === 1){ const a = ent(r, 23, 98), b = ent(r, 12, 49); return Q(a + ' × ' + b + ' = ?', a * b, [[a * b - a, 'Long multiplication: one row went missing. It is hiding.'], [a * (b % 10) + Math.floor(b / 10) * a, 'The tens row needs a zero placeholder. Without it, the answer shrinks!']], 'Multiply by the ones, then by the tens (with a 0 placeholder), then add.'); }
      if(t === 2){ const b = ent(r, 12, 25), q = ent(r, 21, 99); return Q((b * q) + ' ÷ ' + b + ' = ?', q, [[q + 10, 'Multiply back: ' + b + ' × ' + (q + 10) + ' is too big.'], [q - 1, 'So close! Check with ' + b + ' × your answer.']], 'Long division, or check by multiplying: divisor × answer = number.'); }
      const d = un(r, [4, 5, 8]), a = ent(r, 1, d - 1), c = ent(r, 1, d - 1);
      return Q(a + '/' + d + ' + ' + c + '/' + d + ' = ?', frac(a + c, d), [[(a + c) + '/' + (2 * d), 'Adding the denominators? The pizza slices did not get smaller because you ate two. 🍕'], [frac(a * c, d), 'You multiplied the tops. Plumo saw that.']], 'Same denominator: add the numerators, keep the denominator.');
    }),
    C('fdp', 'Fractions, decimals & percentages', 'Number', ['Y6', 'Y7', 'Y8'], r => {
      const [f, d, p] = un(r, [['1/4', '0.25', '25%'], ['3/4', '0.75', '75%'], ['1/5', '0.2', '20%'], ['2/5', '0.4', '40%'], ['1/8', '0.125', '12.5%'], ['3/10', '0.3', '30%'], ['7/20', '0.35', '35%']]);
      return un(r, [
        () => Q('Write ' + f + ' as a percentage.', p, [[f.replace('/', '') + '%', 'Gluing the digits together is not a conversion. Divide!'], [d + '%', 'That is the decimal with a % stuck on. Multiply by 100 first.']], 'Fraction → divide top by bottom → × 100 for a percentage.'),
        () => { const n = un(r, [40, 60, 80, 120, 200, 360]); return Q('What is ' + p + ' of ' + n + '?', nb(n * parseFloat(d)), [[nb(n * parseFloat(d) * 10), 'Ten times too big. The decimal point went on holiday.'], [nb(n - parseFloat(p)), 'You subtracted the percentage. Percent means “out of 100”.']], p + ' = ' + d + ', so multiply ' + n + ' by ' + d + '.'); }
      ])();
    }),
    C('ratio-ks2', 'Ratio & scaling', 'Ratio', ['Y6', 'Y7', 'Y8'], r => {
      const a = ent(r, 1, 5), b = ent(r, 2, 7), k = ent(r, 3, 12), tot = (a + b) * k;
      return Q('Share £' + tot + ' in the ratio ' + a + ':' + b + '. How much is the bigger share?', '£' + Math.max(a, b) * k,
        [['£' + Math.round(tot / 2), 'Half each? That ratio is not ' + '1:1. Someone is being generous.'], ['£' + Math.max(a, b), 'That is the number of parts, not the money in them.']],
        'Total parts = ' + (a + b) + '. One part = £' + tot + ' ÷ ' + (a + b) + ' = £' + k + '. Then multiply by the parts.'); }),
    C('angles', 'Angles', 'Geometry', ['Y6', 'Y7', 'Y8', 'Y9'], r => {
      const t = ent(r, 0, 2);
      if(t === 0){ const a = ent(r, 25, 80), b = ent(r, 30, 70); return Q('Two angles in a triangle are ' + a + '° and ' + b + '°. What is the third angle?', (180 - a - b) + '°', [[(360 - a - b) + '°', '360° is for a full turn or a quadrilateral. Triangles only get 180°.'], [(90 - a + b) + '°', 'Triangles are not always right-angled.']], 'Angles in a triangle add up to 180°.'); }
      if(t === 1){ const a = ent(r, 20, 160); return Q('Angles on a straight line: one is ' + a + '°. What is the other?', (180 - a) + '°', [[(360 - a) + '°', 'A straight line is half a turn: 180°, not 360°.'], [(90 - a > 0 ? 90 - a : a - 90) + '°', 'That would be a right angle. The line is straight, Plumo checked.']], 'Angles on a straight line add up to 180°.'); }
      const n = un(r, [5, 6, 8, 10]); return Q('What is the sum of the interior angles of a polygon with ' + n + ' sides?', ((n - 2) * 180) + '°', [[(n * 180) + '°', 'Almost: it is (n − 2) × 180°. Two triangles went missing.'], ['360°', '360° is the sum of the EXTERIOR angles.']], 'Sum of interior angles = (n − 2) × 180°.');
    }),
    C('area', 'Perimeter, area & volume', 'Geometry', ['Y6', 'Y7', 'Y8', 'Y9', 'Y10'], r => {
      const t = ent(r, 0, 3), a = ent(r, 3, 15), b = ent(r, 2, 12), h = 2 * ent(r, 2, 7);
      if(t === 0) return Q('Area of a rectangle ' + a + ' cm by ' + b + ' cm?', (a * b) + ' cm²', [[(2 * (a + b)) + ' cm²', 'That is the perimeter. Fencing, not carpet.'], [(a + b) + ' cm²', 'Add? Area multiplies.']], 'Area of a rectangle = length × width.');
      if(t === 1) return Q('Area of a triangle with base ' + a + ' cm and perpendicular height ' + h + ' cm?', (a * h / 2) + ' cm²', [[(a * h) + ' cm²', 'That is the rectangle. The triangle is only half of it, and it is offended.'], [(a + h) + ' cm²', 'Base + height is not an area.']], 'Area of a triangle = ½ × base × height.');
      if(t === 2) return Q('Volume of a cuboid ' + a + ' cm × ' + b + ' cm × ' + h + ' cm?', (a * b * h) + ' cm³', [[(2 * (a * b + b * h + a * h)) + ' cm³', 'That is the surface area. You wrapped the box instead of filling it. 🎁'], [(a + b + h) + ' cm³', 'Adding the edges gives a length, not a volume.']], 'Volume of a cuboid = length × width × height.');
      return Q('Area of a trapezium with parallel sides ' + a + ' cm and ' + b + ' cm, height ' + h + ' cm?', ((a + b) * h / 2) + ' cm²', [[((a + b) * h) + ' cm²', 'You forgot the ½. The trapezium is twice as proud as it should be.'], [(a * b * h / 2) + ' cm²', 'The parallel sides are ADDED, not multiplied.']], 'Area of a trapezium = ½(a + b)h.');
    }),
    C('statistics-basic', 'Averages & charts', 'Statistics', ['Y6', 'Y7', 'Y8', 'Y9', 'Y10', 'Y11'], r => {
      const l = Array.from({ length:7 }, () => ent(r, 2, 30)), s = l.slice().sort((a, b) => a - b), moy = l.reduce((a, b) => a + b, 0) / 7;
      return un(r, [
        () => Q('Find the median of: ' + l.join(', ') + '.', s[3], [[l[3], 'You took the middle number before putting them in order. Like finding the middle of a messy queue.'], [nb(moy, 1), 'That is the mean. Mean and median are cousins, not twins.'], [s[6] - s[0], 'That is the range. The median is the middle value.']], 'Order the data, then take the middle value.'),
        () => Q('Find the range of: ' + l.join(', ') + '.', s[6] - s[0], [[s[6], 'That is just the biggest value. Range = biggest − smallest.'], [l[6] - l[0], 'Use the biggest and smallest values, not the first and last.']], 'Range = highest − lowest.'),
        () => Q('Find the mean of: ' + l.join(', ') + ' (to 1 d.p.).', nb(moy, 1), [[s[3], 'That is the median. The mean adds everything up first.'], [l.reduce((a, b) => a + b, 0), 'That is the total. Now divide by 7!']], 'Mean = total ÷ number of values.')
      ])();
    }),
    // ── Key stage 3 ──
    C('negatives', 'Negative numbers & order of operations', 'Number', ['Y7', 'Y8'], r => {
      const a = ent(r, 2, 9), b = ent(r, 2, 9), c = ent(r, 2, 6);
      return un(r, [
        () => Q(a + ' + ' + b + ' × ' + c + ' = ?', a + b * c, [[(a + b) * c, 'BIDMAS! Multiplication goes before addition. Queue-jumping is allowed here.'], [a * b + c, 'Plumo has never seen that order of operations before.']], 'BIDMAS: Brackets, Indices, Division/Multiplication, Addition/Subtraction.'),
        () => Q('−' + a + ' − ' + b + ' = ?', -(a + b), [[a - b, 'Starting at −' + a + ' and going DOWN ' + b + ' cannot land there.'], [a + b, 'Two minus signs do not hug into a plus here: that only works for “subtract a negative”.']], 'Start at −' + a + ' on the number line and move ' + b + ' to the left.'),
        () => Q('−' + a + ' × −' + c + ' = ?', a * c, [[-(a * c), 'Negative × negative = POSITIVE. The two minuses cancel out.'], [-(a + c), 'You added instead of multiplying.']], 'Same signs → positive; different signs → negative.')
      ])();
    }),
    C('algebra-basics', 'Expressions & simplifying', 'Algebra', ['Y7', 'Y8', 'Y9'], r => {
      const a = ent(r, 2, 9), b = ent(r, 2, 9), c = ent(r, 2, 6);
      return un(r, [
        () => Q('Simplify ' + a + 'x + ' + b + 'x', (a + b) + 'x', [[(a + b) + 'x²', 'Adding x’s does not make them squared. They just make a bigger group of x’s.'], [(a * b) + 'x', 'Multiply? They are like terms: just add them.']], 'Collect like terms: add the coefficients.'),
        () => Q('Expand ' + c + '(x + ' + a + ')', c + 'x + ' + (c * a), [[c + 'x + ' + a, 'The ' + c + ' must multiply EVERYTHING in the bracket. The ' + a + ' feels left out.'], [(c + 1) + 'x + ' + (c + a), 'Expanding means multiplying, not adding.']], 'Multiply each term inside the bracket by the number outside.'),
        () => Q('Factorise ' + (c * a) + 'x + ' + (c * b), c + '(' + a + 'x + ' + b + ')', [[a + '(' + c + 'x + ' + b + ')', 'Expand it back: it does not give the same thing. Always check!'], [(c * a) + '(x + ' + b + ')', 'The ' + (c * b) + ' would become ' + (c * a * b) + '. That is a bit too generous.']], 'Take out the highest common factor, then check by expanding.')
      ])();
    }),
    C('equations', 'Solving equations', 'Algebra', ['Y7', 'Y8', 'Y9', 'Y10', 'Y11'], r => {
      const a = ent(r, 2, 9), x = ent(r, -6, 12), b = ent(r, 1, 20), c = a * x + b;
      return Q('Solve ' + a + 'x + ' + b + ' = ' + c, 'x = ' + x, [['x = ' + nb((c + b) / a), 'The +' + b + ' crossed the equals sign without changing its sign. No passport, no entry. ✈️'], ['x = ' + (c - b), 'You forgot to divide by ' + a + '. It is still waiting at the door.']], 'Subtract ' + b + ' from both sides, then divide both sides by ' + a + '.');
    }),
    C('sequences', 'Sequences', 'Algebra', ['Y7', 'Y8', 'Y9', 'Y10', 'Y11'], r => {
      const d = ent(r, 2, 9), a = ent(r, -5, 12), l = [0, 1, 2, 3].map(i => a + i * d);
      const k = a - d; return Q('Find the nth term of: ' + l.join(', ') + ', …', d + 'n' + (k ? (k < 0 ? ' − ' + (-k) : ' + ' + k) : ''),
        [[d + 'n + ' + a + (a === 0 ? ' ' : ''), 'Test n = 1: it gives ' + (d + a) + ', not ' + a + '. The first term disagrees.'], ['n + ' + d, 'The common difference goes in FRONT of n.']], 'nth term = (common difference)n + (first term − difference).'); }),
    C('ratio-proportion', 'Ratio, proportion & percentage change', 'Ratio', ['Y8', 'Y9', 'Y10', 'Y11'], r => {
      const p = un(r, [40, 60, 80, 150, 240, 500]), t = un(r, [10, 15, 20, 25, 30]);
      return un(r, [
        () => Q('A coat costs £' + p + '. It is reduced by ' + t + '%. What is the sale price?', '£' + nb(p * (1 - t / 100)), [['£' + nb(p - t), 'You took off ' + t + ' pounds, not ' + t + '%. The shop thanks you for your generosity.'], ['£' + nb(p * t / 100), 'That is the discount itself, not the new price.']], 'Multiplier for a ' + t + '% decrease: ' + nb(1 - t / 100) + '.'),
        () => { const n = p * (1 + t / 100); return Q('A price rose from £' + p + ' to £' + nb(n) + '. What is the percentage increase?', t + '%', [[nb((n - p) / n * 100, 1) + '%', 'Divide by the ORIGINAL amount, not the new one.'], [nb(n - p) + '%', 'That is the increase in pounds. Now turn it into a percentage.']], 'Percentage change = change ÷ original × 100.'); },
        () => { const k = ent(r, 3, 9), q = ent(r, 2, 6); return Q(k + ' pens cost £' + nb(k * q * 0.35) + '. How much do ' + (k + q) + ' pens cost?', '£' + nb((k + q) * q * 0.35), [['£' + nb(k * q * 0.35 + q), 'Proportion is about multiplying, not adding a pound per pen.'], ['£' + nb(q * 0.35), 'That is one pen. Plumo wants all of them.']], 'Find the cost of one, then multiply (unitary method).'); }
      ])();
    }),
    C('indices', 'Powers, roots & standard form', 'Number', ['Y8', 'Y9', 'Y10', 'Y11'], r => {
      const a = ent(r, 2, 7), b = ent(r, 2, 6);
      return un(r, [
        () => Q('Simplify x^' + a + ' × x^' + b, 'x^' + (a + b), [['x^' + (a * b), 'Multiplying powers? No: when you multiply, you ADD the indices.'], ['2x^' + (a + b), 'Where did that 2 come from? It is not invited.']], 'xᵃ × xᵇ = xᵃ⁺ᵇ'),
        () => { const m = ent(r, 12, 98) / 10, p = ent(r, 3, 8); return Q('Write ' + Math.round(m * 10 ** p).toLocaleString('en-GB') + ' in standard form.', nb(m, 1) + ' × 10^' + p, [[nb(m * 10, 0) + ' × 10^' + (p - 1), 'The first number must be between 1 and 10. ' + nb(m * 10, 0) + ' is too big for that club.'], [nb(m, 1) + ' × 10^' + (p + 1), 'Count the jumps of the decimal point again.']], 'A × 10ⁿ with 1 ≤ A < 10.'); },
        () => { const n = ent(r, 4, 15); return Q('√' + sq(n) + ' = ?', n, [[sq(n) / 2, 'Square root is not “divide by 2”. Plumo wishes it were that easy.'], [n + 1, 'Check: ' + (n + 1) + '² = ' + sq(n + 1) + '.']], 'The square root of n² is n.'); }
      ])();
    }),
    C('pythagoras', 'Pythagoras & trigonometry', 'Geometry', ['Y9', 'Y10', 'Y11'], r => {
      const [a, b, c] = un(r, [[3, 4, 5], [5, 12, 13], [6, 8, 10], [8, 15, 17], [9, 12, 15], [7, 24, 25]]);
      return un(r, [
        () => Q('A right-angled triangle has shorter sides ' + a + ' cm and ' + b + ' cm. How long is the hypotenuse?', c + ' cm', [[(a + b) + ' cm', 'Just adding the sides? Pythagoras is turning in his toga.'], [nb(Math.sqrt(b * b - a * a), 1) + ' cm', 'You subtracted: that is for finding a SHORTER side.']], 'c² = a² + b², so c = √(' + a + '² + ' + b + '²).'),
        () => Q('In a right-angled triangle, opposite = ' + a + ', hypotenuse = ' + c + '. What is sin θ?', frac(a, c), [[frac(b, c), 'That is cos θ (adjacent/hypotenuse). SOH CAH TOA!'], [frac(a, b), 'That is tan θ. Plumo sings: S-O-H…']], 'SOH: sin θ = opposite ÷ hypotenuse.')
      ])();
    }),
    C('probability', 'Probability', 'Probability', ['Y7', 'Y8', 'Y9', 'Y10', 'Y11'], r => {
      const rouge = ent(r, 2, 9), bleu = ent(r, 2, 9), vert = ent(r, 1, 6), t = rouge + bleu + vert;
      return un(r, [
        () => Q('A bag has ' + rouge + ' red, ' + bleu + ' blue and ' + vert + ' green counters. P(red)?', frac(rouge, t), [[frac(rouge, bleu + vert), 'Divide by ALL the counters, red ones included.'], [frac(1, 3), 'Three colours does not mean ⅓ each. The bag is not fair.'], [frac(bleu, t), 'That is P(blue). Plumo asked for red.'], [rouge + '/' + (t + 1), 'Count the counters again: there are ' + t + '.']], 'P = favourable outcomes ÷ total outcomes.'),
        () => { const p = ent(r, 1, 9) / 10; return Q('P(rain) = ' + nb(p) + '. What is P(no rain)?', nb(1 - p), [[nb(p), 'That is the chance of rain again. Plumo is getting wet.'], [nb(p / 2), 'Probabilities of “it happens” and “it doesn’t” add up to 1.']], 'P(not A) = 1 − P(A).'); },
        () => Q('Two fair coins are flipped. P(two heads)?', '1/4', [['1/2', 'That is for ONE coin. Two coins: multiply ½ × ½.'], ['2/4', 'There is only one way to get two heads: HH.']], 'Independent events: multiply the probabilities.')
      ])();
    }),
    // ── GCSE (Foundation & Higher) ──
    C('quadratics', 'Quadratics', 'Algebra', ['Y10', 'Y11', 'Y12'], r => {
      const p = ent(r, -7, 7) || 2, q = ent(r, -7, 7) || -3, s = p + q, pr = p * q;
      const exp = 'x² ' + (s < 0 ? '− ' + (-s) : '+ ' + s) + 'x ' + (pr < 0 ? '− ' + (-pr) : '+ ' + pr);
      return un(r, [
        () => Q('Solve ' + exp + ' = 0', 'x = ' + Math.min(-p, -q) + ' or x = ' + Math.max(-p, -q), [['x = ' + Math.min(p, q) + ' or x = ' + Math.max(p, q), 'Signs flipped! (x + ' + p + ') = 0 gives x = ' + (-p) + '.'], ['x = ' + pr, 'The constant term is not the answer. Factorise first!']], 'Factorise into (x + a)(x + b) = 0, then each bracket = 0.'),
        () => Q('Factorise ' + exp, '(x ' + (p < 0 ? '− ' + (-p) : '+ ' + p) + ')(x ' + (q < 0 ? '− ' + (-q) : '+ ' + q) + ')', [['(x ' + (p < 0 ? '+ ' + (-p) : '− ' + p) + ')(x ' + (q < 0 ? '+ ' + (-q) : '− ' + q) + ')', 'Expand it: the signs come out wrong. Always check.'], ['x(x + ' + s + ') + ' + pr, 'That is not factorised, that is just rearranged.']], 'Find two numbers that multiply to ' + pr + ' and add to ' + s + '.')
      ])();
    }),
    C('simultaneous', 'Simultaneous equations', 'Algebra', ['Y10', 'Y11'], r => {
      const x = ent(r, -4, 8), y = ent(r, -4, 8), a = ent(r, 1, 4), b = ent(r, 1, 4);
      return Q('Solve: x + y = ' + (x + y) + ' and ' + a + 'x − ' + b + 'y = ' + (a * x - b * y), 'x = ' + x + ', y = ' + y, [['x = ' + y + ', y = ' + x, 'Swapped! Put them back into the second equation: it does not work.'], ['x = ' + (x + 1) + ', y = ' + (y - 1), 'Works in the first equation, fails the second. Both must be happy.']], 'Eliminate one letter (or substitute), then check in BOTH equations.');
    }),
    C('graphs', 'Straight-line graphs', 'Algebra', ['Y9', 'Y10', 'Y11'], r => {
      const m = ent(r, -5, 6) || 3, c = ent(r, -8, 8), x1 = ent(r, 0, 3), x2 = x1 + ent(r, 1, 4);
      return un(r, [
        () => Q('What is the gradient of y = ' + m + 'x ' + (c < 0 ? '− ' + (-c) : '+ ' + c) + '?', m, [[c, 'That is the y-intercept. The gradient is the number in front of x.'], [-m, 'Wrong sign: the line goes the other way.']], 'In y = mx + c, m is the gradient and c the y-intercept.'),
        () => Q('Gradient of the line through (' + x1 + ', ' + (m * x1 + c) + ') and (' + x2 + ', ' + (m * x2 + c) + ')?', m, [[frac(x2 - x1, m * (x2 - x1)), 'Upside down! Gradient = change in y ÷ change in x.'], [m * x2 + c, 'That is a y-coordinate, not a gradient.']], 'Gradient = (y₂ − y₁) ÷ (x₂ − x₁).')
      ])();
    }),
    C('circles', 'Circles & compound measures', 'Geometry', ['Y8', 'Y9', 'Y10', 'Y11'], r => {
      const rr = ent(r, 3, 12), v = un(r, [30, 40, 50, 60, 70]), t = un(r, [1.5, 2, 2.5, 3]);
      return un(r, [
        () => Q('Area of a circle of radius ' + rr + ' cm (in terms of π)?', (rr * rr) + 'π cm²', [[(2 * rr) + 'π cm²', 'That is the circumference. Fence vs lawn again!'], [(4 * rr * rr) + 'π cm²', 'You used the diameter instead of the radius. Four times too big!']], 'Area = πr².'),
        () => Q('A car travels at ' + v + ' mph for ' + t + ' hours. How far does it go?', nb(v * t) + ' miles', [[nb(v / t) + ' miles', 'Speed ÷ time is not distance. Distance = speed × time.'], [nb(v + t) + ' miles', 'Adding mph and hours? Units do not mix like that.']], 'Distance = speed × time.')
      ])();
    }),
    C('surds-higher', 'Surds & bounds (Higher)', 'Number', ['Y11', 'Y12'], r => {
      const a = un(r, [2, 3, 5, 6, 7]), k = ent(r, 2, 6);
      return un(r, [
        () => Q('Simplify √' + (k * k * a), k + '√' + a, [[(k * k) + '√' + a, 'Only the square ROOT of ' + (k * k) + ' comes out: ' + k + '.'], [a + '√' + k, 'Wrong way round: ' + (k * k) + ' is the square number here.']], 'Find the largest square factor: √(' + (k * k) + ' × ' + a + ') = ' + k + '√' + a + '.'),
        () => { const n = ent(r, 12, 80); return Q('A length is ' + n + ' cm to the nearest cm. What is the lower bound?', nb(n - 0.5) + ' cm', [[(n - 1) + ' cm', 'Half the unit, not the whole unit: ±0.5 cm.'], [nb(n + 0.5) + ' cm', 'That is the upper bound.']], 'Lower bound = value − half the degree of accuracy.'); }
      ])();
    }),
    // ── A level ──
    C('differentiation', 'Differentiation', 'Pure', ['Y12', 'Y13'], r => {
      const a = ent(r, 2, 6), n = ent(r, 2, 5), b = ent(r, 1, 9);
      return un(r, [
        () => Q('Differentiate y = ' + a + 'x^' + n + ' + ' + b + 'x', (a * n) + 'x^' + (n - 1) + ' + ' + b, [[(a * n) + 'x^' + n + ' + ' + b, 'Multiply by the power, then REDUCE it by 1.'], [a + 'x^' + (n - 1) + ' + ' + b, 'The power ' + n + ' must come down and multiply.']], 'd/dx(axⁿ) = naxⁿ⁻¹.'),
        () => { const x = ent(r, 1, 4); return Q('Gradient of y = x^' + n + ' at x = ' + x + '?', n * x ** (n - 1), [[x ** n, 'That is the y-value. The gradient needs dy/dx.'], [n * x ** n, 'The power drops by one after differentiating.']], 'dy/dx = ' + n + 'x^' + (n - 1) + ', then substitute x = ' + x + '.'); }
      ])();
    }),
    C('integration', 'Integration', 'Pure', ['Y12', 'Y13'], r => {
      const a = ent(r, 1, 4) * 3, n = 2, b = ent(r, 1, 3);
      return un(r, [
        () => Q('∫ ' + a + 'x² dx', (a / 3 === 1 ? '' : a / 3) + 'x³ + c', [[(2 * a) + 'x + c', 'That is differentiating. Integration goes the OTHER way.'], [(a / 3 === 1 ? '' : a / 3) + 'x³', 'Forgot the + c! The constant of integration is sulking.'], [a + 'x³ + c', 'Divide by the new power (3) as well.']], '∫ axⁿ dx = a xⁿ⁺¹/(n+1) + c.'),
        () => Q('∫₀^' + b + ' 2x dx', b * b, [[2 * b, 'You substituted into 2x instead of integrating first.'], [b * b + 1, 'Upper limit minus lower limit: [x²] from 0 to ' + b + '.']], '∫ 2x dx = x², then evaluate from 0 to ' + b + '.')
      ])();
    }),
    C('logs', 'Exponentials & logarithms', 'Pure', ['Y12', 'Y13'], r => {
      const b = un(r, [2, 3, 5, 10]), k = ent(r, 2, 5);
      return un(r, [
        () => Q('log' + b + '(' + b ** k + ') = ?', k, [[b ** k / b, 'A log asks “what power?”, not “divide by the base”.'], [k + 1, 'Check: ' + b + '^' + (k + 1) + ' = ' + b ** (k + 1) + '.'], [b * k, 'Multiplying the base by the answer? Logs do not work like that.']], 'logₐ(aᵏ) = k.'),
        () => Q('log a + log b = ?', 'log(ab)', [['log(a + b)', 'Logs turn multiplication into addition, not addition into addition.'], ['log a × log b', 'That is not a log law, sadly.']], 'log a + log b = log(ab).')
      ])();
    }),
    C('binomial-stats', 'Statistics (A level)', 'Statistics', ['Y12', 'Y13'], r => {
      const n = un(r, [10, 20, 40, 50]), p = un(r, [0.1, 0.2, 0.25, 0.5]);
      return un(r, [
        () => Q('X ~ B(' + n + ', ' + p + '). What is E(X)?', nb(n * p), [[nb(n * p * (1 - p)), 'That is the variance np(1 − p).'], [nb(p), 'That is one trial. The mean is np.']], 'For a binomial distribution, E(X) = np.'),
        () => Q('For a normal distribution, roughly what percentage lies within 1 standard deviation of the mean?', '68%', [['95%', 'That is within 2 standard deviations.'], ['50%', 'Half lies above the mean; within ±1σ is more.']], '68–95–99.7 rule.')
      ])();
    }),
    C('mechanics', 'Mechanics (suvat & forces)', 'Mechanics', ['Y12', 'Y13'], r => {
      const u = ent(r, 1, 10), a = ent(r, 1, 5), t = ent(r, 2, 8), m = ent(r, 2, 12);
      return un(r, [
        () => Q('u = ' + u + ' m/s, a = ' + a + ' m/s², t = ' + t + ' s. Find v.', (u + a * t) + ' m/s', [[(u * t + a) + ' m/s', 'v = u + at: the acceleration gets multiplied by time, not u.'], [(a * t) + ' m/s', 'Do not forget the starting speed u.']], 'v = u + at.'),
        () => Q('A resultant force of ' + (m * a) + ' N acts on a ' + m + ' kg mass. Acceleration?', a + ' m/s²', [[(m * a * m) + ' m/s²', 'Newton’s 2nd law: a = F ÷ m, not F × m.'], [(m * a - m) + ' m/s²', 'Subtracting mass from force? Units say no.']], 'F = ma, so a = F ÷ m.')
      ])();
    })
  ];
  E.ajouter({ id:'gb-maths', nom:'Maths', ic:'🔢', sous:'Year 6 SATs → GCSE → A level, with Prof Pi', prof:true,
    examens:{ Y6:'SATs-style quiz', Y11:'GCSE-style quiz', Y13:'A level-style quiz' }, chapitres });
})();
