// Ami des mots — v6.1 : le programme scolaire anglais (England), comme le programme français.
// Même moteur que js/matieres.js, mais : niveaux Year 6 → Year 13, questions et vannes en anglais, tons de Plumo en anglais.
// Une matière : ENGLAND.ajouter({ id:'gb-…', nom, ic, sous, examens:{ Y11:'GCSE-style quiz' }, chapitres:[{ id, nom, dom, niv:['Y7', …], banque, gen }] })
// Une question de banque : [question, bonne, [[mauvaise, vanne], …], explication, consigne?] (comme en français).
// Les vannes visent la réponse, jamais l'élève ; elles passent le juge de Plumo (tests).
(function(){
  'use strict';
  const NIVEAUX = ['Y6', 'Y7', 'Y8', 'Y9', 'Y10', 'Y11', 'Y12', 'Y13'];
  const ETAPES = { Y6:'KS2', Y7:'KS3', Y8:'KS3', Y9:'KS3', Y10:'KS4 · GCSE', Y11:'KS4 · GCSE', Y12:'Sixth form · A level', Y13:'Sixth form · A level' };
  const NOMS = { Y6:'Year 6', Y7:'Year 7', Y8:'Year 8', Y9:'Year 9', Y10:'Year 10', Y11:'Year 11', Y12:'Year 12', Y13:'Year 13' };
  const LISTE = [];
  function hasard(graine){ let s = (graine >>> 0) || 1; return () => { s ^= s << 13; s >>>= 0; s ^= s >>> 17; s ^= s << 5; s >>>= 0; return (s % 1e9) / 1e9; }; }
  const melanger = (l, r) => { const a = l.slice(); for(let i = a.length - 1; i > 0; i--){ const j = Math.floor(r() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
  const DOUX = ['Nearly!', 'No worries, it happens.', 'Good try!'];
  const CASH = ['🔥 Seriously?', '🔥 Not even close.', '🔥 Plumo nearly fell off his branch.', '🔥 Bold. Wrong, but bold.', '🔥 Deep breath. Again.', '🔥 The examiner just sighed.'];
  function enQuestion(m, ch, x, ton, r){
    const base = Array.isArray(x) ? { enonce:x[0], bon:x[1], faux:x[2].map(f => ({ en:f[0], vanne:f[1] })), regle:x[3], consigne:x[4] } : x;
    const faux = base.faux.filter(f => f && f.en !== base.bon).slice(0, 3).map(f => {
      let v = String(f.vanne || 'Not quite!').replace(/\{f\}/g, f.en).replace(/\{j\}/g, base.bon);
      if(ton === 'doux') v = DOUX[Math.floor(r() * DOUX.length)] + ' ' + (base.regle || '');
      else if(ton === 'sanspitie') v = CASH[Math.floor(r() * CASH.length)] + ' ' + v;
      return { en:f.en, vanne:v };
    });
    return { id:m.id + ':' + ch.id + ':' + base.enonce.slice(0, 40), chap:ch.id, matiere:m.id, lang:'en',
      consigne:(m.ic + ' ' + (base.consigne || ch.nom)), enonce:base.enonce, bon:base.bon, faux, regle:base.regle };
  }
  const trouver = id => LISTE.find(m => m.id === id) || null;
  function chapitres(id, niveau){ const m = trouver(id); return m ? m.chapitres.filter(c => c.niv.includes(niveau)) : []; }
  function niveauxDe(id){ const m = trouver(id); return m ? NIVEAUX.filter(n => m.chapitres.some(c => c.niv.includes(n))) : []; }
  function serie(id, cible, niveau, n, graine, ton){
    const m = trouver(id); if(!m) return [];
    const r = hasard(graine || Math.floor(Math.random() * 1e9));
    const chs = cible === 'melange' || cible === 'examen' ? chapitres(id, niveau) : m.chapitres.filter(c => c.id === cible);
    if(!chs.length) return [];
    const out = [], vus = new Set(); let essais = 0; const ordre = melanger(chs, r);
    while(out.length < n && essais++ < n * 12){
      const ch = ordre[out.length % ordre.length]; let x = null;
      if(ch.gen && (!ch.banque || r() < .6)) x = ch.gen(r, niveau);
      else if(ch.banque && ch.banque.length) x = ch.banque[Math.floor(r() * ch.banque.length)];
      if(!x) continue;
      const q = enQuestion(m, ch, x, ton, r); if(vus.has(q.enonce + '|' + q.bon) || !q.faux.length) continue;
      vus.add(q.enonce + '|' + q.bon); out.push(q);
    }
    return out;
  }
  function ajouter(m){ if(!trouver(m.id)) LISTE.push(m); }
  // Petits outils partagés par les générateurs (nombres à l'anglaise : 3.5, 1,200).
  const ent = (r, a, b) => a + Math.floor(r() * (b - a + 1));
  const un = (r, l) => l[Math.floor(r() * l.length)];
  const nb = (x, d = 2) => { const v = Math.round(x * 10 ** d) / 10 ** d; return String(Object.is(v, -0) ? 0 : v); };
  const pgcd = (a, b) => { a = Math.abs(a); b = Math.abs(b); while(b){ [a, b] = [b, a % b]; } return a || 1; };
  const frac = (a, b) => { const g = pgcd(a, b); a /= g; b /= g; if(b < 0){ a = -a; b = -b; } return b === 1 ? String(a) : a + '/' + b; };
  // Une question générée : on retire les mauvaises réponses égales à la bonne ou en double.
  const Q = (enonce, bon, faux, regle, consigne) => { const vu = new Set([String(bon)]), f = [];
    for(const [x, v] of faux){ const s = String(x); if(!vu.has(s)){ vu.add(s); f.push({ en:s, vanne:v }); } }
    return { enonce, bon:String(bon), faux:f.slice(0, 3), regle, consigne }; };
  window.ENGLAND = { NIVEAUX, ETAPES, NOMS, LISTE, ajouter, trouver, chapitres, niveauxDe, serie, hasard, melanger, outils:{ ent, un, nb, pgcd, frac, Q }, EXAMENS:{}, PASSES:[], OFFICIEL:{} };
})();
