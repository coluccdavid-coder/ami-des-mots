// Ami des mots — v5.76 : moteur commun des matières scolaires (français, histoire-géo-EMC, SVT, physique-chimie).
// Chaque matière s'enregistre avec MATIERES.ajouter({ id, nom, ic, examens, chapitres }).
// Un chapitre : { id, nom, dom (domaine), niv:['6e', …], banque:[…] et/ou gen:(r) => question }.
// Une question de banque : [énoncé, bonne, [[mauvaise, vanne], …], explication, consigne?]
// Une question générée : { enonce, bon, faux:[{ en, vanne }], regle, consigne? }
// Les vannes visent la réponse, jamais l'élève (elles passent le juge d'Ami). L'explication est toujours affichée.
(function(){
  'use strict';
  const NIVEAUX = ['6e', '5e', '4e', '3e', '2nde', '1re', 'Tle'];
  const LISTE = [];
  // Hasard reproductible (même graine = mêmes questions : battles, revanches).
  function hasard(graine){ let s = (graine >>> 0) || 1; return () => { s ^= s << 13; s >>>= 0; s ^= s >>> 17; s ^= s << 5; s >>>= 0; return (s % 1e9) / 1e9; }; }
  const melanger = (l, r) => { const a = l.slice(); for(let i = a.length - 1; i > 0; i--){ const j = Math.floor(r() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
  // Petites phrases ajoutées selon le ton de Prof (doux / taquin / cash).
  const DOUX = ['Presque !', 'Pas grave, ça arrive.', 'Bonne tentative !'];
  const CASH = ['🔥 Sérieux ?', '🔥 Même pas en rêve.', '🔥 Raté dans les grandes largeurs.', '🔥 Ami a failli tomber de sa branche.', '🔥 Respire. On recommence.', '🔥 Audacieux. Faux, mais audacieux.'];
  function enQuestion(m, ch, x, ton, r){
    const base = Array.isArray(x) ? { enonce:x[0], bon:x[1], faux:x[2].map(f => ({ en:f[0], vanne:f[1] })), regle:x[3], consigne:x[4] } : x;
    const faux = base.faux.filter(f => f && f.en !== base.bon).slice(0, 3).map(f => {
      let v = String(f.vanne || 'Raté !').replace(/\{f\}/g, f.en).replace(/\{j\}/g, base.bon);
      if(ton === 'doux') v = DOUX[Math.floor(r() * DOUX.length)] + ' ' + (base.regle || '');
      else if(ton === 'sanspitie') v = CASH[Math.floor(r() * CASH.length)] + ' ' + v;
      return { en:f.en, vanne:v };
    });
    return { id:m.id + ':' + ch.id + ':' + base.enonce.slice(0, 40), chap:ch.id, matiere:m.id, lang:'fr',
      consigne:(m.ic + ' ' + (base.consigne || ch.nom)), enonce:base.enonce, bon:base.bon, faux, regle:base.regle };
  }
  function trouver(id){ return LISTE.find(m => m.id === id) || null; }
  // Chapitres d'un niveau (on garde ceux des niveaux d'avant quand le chapitre continue).
  function chapitres(id, niveau){ const m = trouver(id); return m ? m.chapitres.filter(c => c.niv.includes(niveau)) : []; }
  function niveauxDe(id){ const m = trouver(id); return m ? NIVEAUX.filter(n => m.chapitres.some(c => c.niv.includes(n))) : []; }
  // Une série : un chapitre précis, ou un mélange de tout le niveau (« melange »), ou l'examen blanc (« examen »).
  function serie(id, cible, niveau, n, graine, ton){
    const m = trouver(id); if(!m) return [];
    const r = hasard(graine || Math.floor(Math.random() * 1e9));
    const chs = cible === 'melange' || cible === 'examen' ? chapitres(id, niveau) : m.chapitres.filter(c => c.id === cible);
    if(!chs.length) return [];
    const out = [], vus = new Set(); let essais = 0;
    // On fait tourner les chapitres pour couvrir tout le programme du niveau.
    const ordre = melanger(chs, r);
    while(out.length < n && essais++ < n * 12){
      const ch = ordre[out.length % ordre.length];
      let x = null;
      if(ch.gen && (!ch.banque || r() < .6)) x = ch.gen(r, niveau);
      else if(ch.banque && ch.banque.length) x = ch.banque[Math.floor(r() * ch.banque.length)];
      if(!x) continue;
      const q = enQuestion(m, ch, x, ton, r); if(vus.has(q.enonce + '|' + q.bon) || !q.faux.length) continue;
      vus.add(q.enonce + '|' + q.bon); out.push(q);
    }
    return out;
  }
  function ajouter(m){ if(!trouver(m.id)) LISTE.push(m); }
  window.MATIERES = { NIVEAUX, LISTE, ajouter, trouver, chapitres, niveauxDe, serie, hasard, melanger };
})();
