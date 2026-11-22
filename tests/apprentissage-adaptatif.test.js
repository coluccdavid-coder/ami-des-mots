'use strict';
const assert = require('node:assert/strict');
const A = require('../js/apprentissage-adaptatif.js');

const t = Date.UTC(2026, 0, 1);
let c = A.nouvelleCarte('en.present.be');
assert.equal(c.intervalleJours, 0);

c = A.noter(c, 2, t);
assert.equal(c.intervalleJours, 1);
assert.equal(c.repetitions, 1);
assert.equal(c.echeances, t + 86400000);

c = A.noter(c, 3, t + 86400000);
assert.ok(c.intervalleJours >= 3);
assert.equal(c.reussites, 2);

c = A.noter(c, 0, t + 2 * 86400000);
assert.equal(c.repetitions, 0);
assert.equal(c.intervalleJours, 0);
assert.equal(c.erreurs, 1);

const autre = A.noter(A.nouvelleCarte('vocab.owl'), 2, t);
assert.equal(A.dues([c, autre], t + 86400000).length, 1);
assert.equal(A.resume([c, autre], t + 86400000).total, 2);
assert.throws(() => A.nouvelleCarte(''), /Identifiant/);
assert.throws(() => A.noter(c, 9, t), /Qualité/);
console.log('Moteur adaptatif : 10 assertions réussies.');
