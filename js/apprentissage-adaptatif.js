/* Plumo des Mots — moteur local de révision adaptative (socle V6).
 * Moteur pur : aucune donnée personnelle, aucun réseau, aucune dépendance.
 * Il ne remplace pas encore les révisions historiques de PIEGES ; intégration
 * progressive prévue dans docs/EVOLUTION-V6-PLAN.md.
 */
(function (root, factory) {
  const api = factory();
  if (typeof module === 'object' && module.exports) module.exports = api;
  if (root) root.AMI_APPRENTISSAGE = api;
})(typeof window !== 'undefined' ? window : globalThis, function () {
  'use strict';

  const VERSION = 1;
  const INTERVALLES = [0, 1, 3, 7, 14, 30, 60, 90];

  function entier(v, min, max, def) {
    const n = Number(v);
    return Number.isFinite(n) ? Math.max(min, Math.min(max, Math.floor(n))) : def;
  }

  function nouvelleCarte(id) {
    if (typeof id !== 'string' || !/^[a-z0-9][a-z0-9._-]{1,79}$/i.test(id)) {
      throw new TypeError('Identifiant de notion invalide');
    }
    return {
      id,
      repetitions: 0,
      facilite: 2.5,
      intervalleJours: 0,
      echeances: 0,
      derniereReponse: 0,
      derniereQualite: null,
      reussites: 0,
      erreurs: 0
    };
  }

  // qualité : 0=oublié, 1=difficile, 2=réussi, 3=facile.
  function noter(carte, qualite, maintenant) {
    if (!carte || typeof carte.id !== 'string') throw new TypeError('Carte invalide');
    const q = Number(qualite);
    if (!Number.isInteger(q) || q < 0 || q > 3) throw new RangeError('Qualité attendue entre 0 et 3');
    const t = Number.isFinite(maintenant) ? maintenant : Date.now();
    const c = {
      ...nouvelleCarte(carte.id),
      ...carte,
      facilite: Math.max(1.3, Math.min(3.2, Number(carte.facilite) || 2.5))
    };

    if (q <= 1) {
      c.repetitions = 0;
      c.intervalleJours = q === 0 ? 0 : 1;
      c.erreurs = entier(c.erreurs, 0, 1000000, 0) + 1;
    } else {
      c.repetitions = entier(c.repetitions, 0, 1000000, 0) + 1;
      c.reussites = entier(c.reussites, 0, 1000000, 0) + 1;
      if (c.repetitions === 1) c.intervalleJours = 1;
      else if (c.repetitions === 2) c.intervalleJours = 3;
      else c.intervalleJours = Math.min(180, Math.round(Math.max(1, c.intervalleJours) * (q === 3 ? c.facilite + 0.25 : c.facilite)));
    }

    c.facilite = Math.max(1.3, Math.min(3.2, c.facilite + (q === 3 ? 0.15 : q === 2 ? 0.02 : q === 1 ? -0.2 : -0.35)));
    c.derniereReponse = t;
    c.derniereQualite = q;
    c.echeances = t + c.intervalleJours * 86400000;
    return c;
  }

  function dues(cartes, maintenant) {
    const t = Number.isFinite(maintenant) ? maintenant : Date.now();
    return (Array.isArray(cartes) ? cartes : [])
      .filter(c => c && typeof c.id === 'string' && Number(c.echeances) <= t)
      .slice()
      .sort((a, b) => Number(a.echeances) - Number(b.echeances));
  }

  function resume(cartes, maintenant) {
    const l = Array.isArray(cartes) ? cartes : [];
    const t = Number.isFinite(maintenant) ? maintenant : Date.now();
    return {
      total: l.length,
      aRevoir: dues(l, t).length,
      maitrisees: l.filter(c => c && Number(c.repetitions) >= 3 && Number(c.intervalleJours) >= 7).length,
      erreurs: l.reduce((n, c) => n + entier(c && c.erreurs, 0, 1000000, 0), 0)
    };
  }

  return Object.freeze({ VERSION, INTERVALLES, nouvelleCarte, noter, dues, resume });
});
