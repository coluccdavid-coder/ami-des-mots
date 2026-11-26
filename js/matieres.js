// Ami des mots — v5.76 : moteur commun des matières scolaires (français, histoire-géo-EMC, SVT, physique-chimie).
// Chaque matière s'enregistre avec MATIERES.ajouter({ id, nom, ic, examens, chapitres }).
// Un chapitre : { id, nom, dom (domaine), niv:['6e', …], banque:[…] et/ou gen:(r) => question }.
// Une question de banque : [énoncé, bonne, [[mauvaise, vanne], …], explication, consigne?]
// Une question générée : { enonce, bon, faux:[{ en, vanne }], regle, consigne? }
// Les vannes visent la réponse, jamais l'élève (elles passent le juge de Plumo). L'explication est toujours affichée.
(function(){
  'use strict';
  const NIVEAUX = ['6e', '5e', '4e', '3e', '2nde', '1re', 'Tle'];
  const LISTE = [];
  // Hasard reproductible (même graine = mêmes questions : battles, revanches).
  function hasard(graine){ let s = (graine >>> 0) || 1; return () => { s ^= s << 13; s >>>= 0; s ^= s >>> 17; s ^= s << 5; s >>>= 0; return (s % 1e9) / 1e9; }; }
  const melanger = (l, r) => { const a = l.slice(); for(let i = a.length - 1; i > 0; i--){ const j = Math.floor(r() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
  // Petites phrases ajoutées selon le ton de Prof (doux / taquin / cash).
  const DOUX = ['Presque !', 'Pas grave, ça arrive.', 'Bonne tentative !'];
  const CASH = ['🔥 Sérieux ?', '🔥 Même pas en rêve.', '🔥 Raté dans les grandes largeurs.', '🔥 Plumo a failli tomber de sa branche.', '🔥 Respire. On recommence.', '🔥 Audacieux. Faux, mais audacieux.'];
  // v6.7 : traductions des matières (js/mat-trad-xx.js). MATIERES_LANGUES[l] = { doux, cash, noms:{ matière:{ nom, ch:{ id:nom }, dom:{ domaine:nom } } },
  // q:{ 'matière/chapitre':[ [énoncé, bonne, [[mauvaise, vanne], …], explication], … ] } } — même ordre que la banque française.
  const LANGUE = () => { let l = 'fr'; try{ l = window.AmiDesMots.base.ui; }catch(e){ try{ l = document.documentElement.lang; }catch(e2){} } return l !== 'fr' && window.MATIERES_LANGUES && window.MATIERES_LANGUES[l] ? l : 'fr'; };
  const D = () => { const l = LANGUE(); return l === 'fr' ? null : window.MATIERES_LANGUES[l]; };
  const trad = (m, ch, i) => { const d = D(); const t = d && d.q && d.q[m.id + '/' + ch.id]; return t && i != null && t[i] ? t[i] : null; };
  const banqueTraduite = (m, ch) => { const d = D(); const t = d && d.q && d.q[m.id + '/' + ch.id]; return !!(t && ch.banque && t.length === ch.banque.length); };
  // v6.12 : un générateur peut savoir parler d'autres langues (ch.genLangues = ['en', 'es', …]).
  const genTraduit = ch => !!(ch.gen && ch.genLangues && ch.genLangues.includes(LANGUE()));
  const traduit = (m, ch) => LANGUE() !== 'fr' && (banqueTraduite(m, ch) || genTraduit(ch)) && (!ch.banque || !ch.banque.length || banqueTraduite(m, ch));
  const langueDe = (m, ch) => (ch ? traduit(m, ch) : m && m.chapitres.some(c => traduit(m, c))) ? LANGUE() : 'fr';
  const nom = m => { const d = D(), x = d && d.noms && d.noms[m.id]; return (x && x.nom) || m.nom; };
  const nomChap = (m, c) => { const d = D(), x = d && d.noms && d.noms[m.id]; return (x && x.ch && x.ch[c.id]) || c.nom; };
  const nomDom = (m, dom) => { const d = D(), x = d && d.noms && d.noms[m.id]; return (x && x.dom && x.dom[dom]) || dom; };
  function enQuestion(m, ch, x, ton, r, idx){
    const t = trad(m, ch, idx); if(t) x = t;
    const lx = t ? LANGUE() : (x && x.lang) || 'fr';
    const base = Array.isArray(x) ? { enonce:x[0], bon:x[1], faux:x[2].map(f => ({ en:f[0], vanne:f[1] })), regle:x[3], consigne:x[4] } : x;
    const faux = base.faux.filter(f => f && f.en !== base.bon).slice(0, 3).map(f => {
      let v = String(f.vanne || 'Raté !').replace(/\{f\}/g, f.en).replace(/\{j\}/g, base.bon);
      const dd = lx !== 'fr' ? D() : null, DX = dd && dd.doux || DOUX, CX = dd && dd.cash || CASH;
      if(ton === 'doux') v = DX[Math.floor(r() * DX.length)] + ' ' + (base.regle || '');
      else if(ton === 'sanspitie') v = CX[Math.floor(r() * CX.length)] + ' ' + v;
      return { en:f.en, vanne:v };
    });
    return { id:m.id + ':' + ch.id + ':' + (idx != null ? '#' + idx : base.enonce.slice(0, 40)), chap:ch.id, matiere:m.id, lang:lx,
      consigne:(m.ic + ' ' + (base.consigne || (lx !== 'fr' ? nomChap(m, ch) : ch.nom))), enonce:base.enonce, bon:base.bon, faux, regle:base.regle };
  }
  function trouver(id){ return LISTE.find(m => m.id === id) || null; }
  // Chapitres d'un niveau (on garde ceux des niveaux d'avant quand le chapitre continue).
  // v6.34 : un chapitre « Par thème » n'apparaît dans une classe que s'il y a au moins 4 questions de cette classe
  // (sinon « Cellule, ADN et génétique » s'affichait en 6e pour 2 questions). Les questions restent dans leurs chapitres d'origine.
  const MIN_THEME = 4;
  function chapitres(id, niveau){ const m = trouver(id); return m ? m.chapitres.filter(c => c.niv.includes(niveau) && !(c.theme && c.nivQ && indicesNiveau(c, niveau).length < MIN_THEME)) : []; }
  function niveauxDe(id){ const m = trouver(id); return m ? NIVEAUX.filter(n => m.chapitres.some(c => c.niv.includes(n))) : []; }
  // Une série : un chapitre précis, ou un mélange de tout le niveau (« melange »), ou l'examen blanc (« examen »).
  // v6.29 : dans un chapitre dont les questions ont une classe précise (nivQ), seulement celles de la classe choisie.
  function indicesNiveau(ch, niveau){
    if(!ch.nivQ || !niveau) return null;
    const ok = []; ch.nivQ.forEach((nv, i) => { if(nv.includes(niveau)) ok.push(i); });
    return ok;
  }
  function serie(id, cible, niveau, n, graine, ton){
    const m = trouver(id); if(!m) return [];
    const r = hasard(graine || Math.floor(Math.random() * 1e9));
    // v6.19 : les chapitres « Par thème » regroupent des questions déjà présentes ailleurs : on ne les compte pas deux fois dans le mélange.
    const chs = cible === 'melange' || cible === 'examen' ? chapitres(id, niveau).filter(c => !c.theme) : m.chapitres.filter(c => c.id === cible);
    if(!chs.length) return [];
    const out = [], vus = new Set(); let essais = 0;
    // On fait tourner les chapitres pour couvrir tout le programme du niveau.
    const ordre = melanger(chs, r);
    while(out.length < n && essais++ < n * 12){
      const ch = ordre[out.length % ordre.length];
      let x = null, idx = null;
      // Langue traduite : on ne mélange pas des questions générées en français avec la banque traduite.
      // Dans une autre langue : seulement ce qui est traduit (générateur et/ou banque), sinon tout en français.
      const tr = traduit(m, ch), genOk = ch.gen && (!tr || genTraduit(ch)), bqOk = ch.banque && ch.banque.length && (!tr || banqueTraduite(m, ch));
      if(genOk && (!bqOk || r() < .6)) x = ch.gen(r, niveau, tr ? LANGUE() : 'fr');
      else if(bqOk){ const pool = indicesNiveau(ch, niveau); if(pool && !pool.length) continue; idx = pool ? pool[Math.floor(r() * pool.length)] : Math.floor(r() * ch.banque.length); x = ch.banque[idx]; }
      if(!x) continue;
      const q = enQuestion(m, ch, x, ton, r, idx); if(vus.has(q.enonce + '|' + q.bon) || !q.faux.length) continue;
      vus.add(q.enonce + '|' + q.bon); out.push(q);
    }
    return out;
  }
  // v6.66 : contrôles par trimestre. Un « morceau » = un chapitre, entier ou une tranche de ses questions (idx).
  // Répartition indicative dans l'ordre du programme : les chapitres du niveau sont coupés en trois tiers ;
  // les cours de l'année (cours-…) et les révisions (r-…), qui couvrent toute l'année, sont coupés en trois tranches de questions.
  function trimestres(id, niveau){
    const chs = chapitres(id, niveau).filter(c => !c.theme && ((c.banque && c.banque.length) || c.gen));
    const annee = chs.filter(c => /^(cours-|r-)/.test(c.id) && c.banque && c.banque.length), autres = chs.filter(c => !annee.includes(c));
    const T = [[], [], []], tiers = (l, k) => l.slice(Math.round(k * l.length / 3), Math.round((k + 1) * l.length / 3));
    const couper = c => { const pool = indicesNiveau(c, niveau) || c.banque.map((_, i) => i); [0, 1, 2].forEach(k => { const idx = tiers(pool, k); if(idx.length) T[k].push({ ch:c.id, idx }); }); };
    if(autres.length >= 3) [0, 1, 2].forEach(k => tiers(autres, k).forEach(c => T[k].push({ ch:c.id, idx:null })));
    else autres.forEach(c => c.banque && c.banque.length ? couper(c) : T[autres.indexOf(c) % 3].push({ ch:c.id, idx:null }));   // v6.69 : un chapitre à banque est coupé même s'il a aussi un générateur
    annee.forEach(couper);
    return T.every(t => t.length) ? T : null;
  }
  // Série tirée d'une liste de morceaux (chapitre + indices éventuels), mêmes règles de langue que serie().
  function serieParts(id, parts, niveau, n, graine, ton){
    const m = trouver(id); if(!m || !Array.isArray(parts)) return [];
    const r = hasard(graine || Math.floor(Math.random() * 1e9)), out = [], vus = new Set();
    const ps = melanger(parts.map(p => ({ ch:m.chapitres.find(c => c.id === p.ch), idx:p.idx })).filter(p => p.ch), r); if(!ps.length) return [];
    for(let essais = 0; out.length < n && essais < n * 15; essais++){
      const p = ps[(out.length + essais) % ps.length], ch = p.ch; let x = null, idx = null;
      const tr = traduit(m, ch), genOk = !p.idx && ch.gen && (!tr || genTraduit(ch)), bqOk = ch.banque && ch.banque.length && (!tr || banqueTraduite(m, ch));
      if(genOk && (!bqOk || r() < .6)) x = ch.gen(r, niveau, tr ? LANGUE() : 'fr');
      else if(bqOk){ const nv = indicesNiveau(ch, niveau), pool = (p.idx || ch.banque.map((_, i) => i)).filter(i => !nv || nv.includes(i)); if(!pool.length) continue; idx = pool[Math.floor(r() * pool.length)]; x = ch.banque[idx]; }
      if(!x) continue;
      const q = enQuestion(m, ch, x, ton, r, idx); if(vus.has(q.enonce + '|' + q.bon) || !q.faux.length) continue;
      vus.add(q.enonce + '|' + q.bon); out.push(q);
    }
    return out;
  }
  // v6.71+ : « pièges sérieux » pour les contrôles. Une réponse juste longue et précise face à des leurres courts et farfelus
  // (« une plage privée », « un petit village ») se devine sans rien savoir. En contrôle, ces leurres trop courts sont remplacés
  // par la bonne réponse d'une AUTRE question du même chapitre (même langue, longueur voisine) : il faut alors vraiment distinguer
  // les notions proches. Garde-fous pour ne jamais créer deux bonnes réponses : pas de question à trou, négative ou « un exemple » ;
  // la réponse empruntée ne doit ni ressembler à la bonne réponse, ni venir d'une question sur le même sujet, ni figurer dans la règle.
  const VIDES = new Set('les des une pour dans avec sans sont qui que quoi quel quelle quels quelles est elle ils leur leurs plus mais donc cette ces son ses aux par sur entre comme what which with from that this their there they have does were when where whom whose about into los las una con para por del que qué cuál cuales como sus der die das den dem des ein eine einer und mit von für ist sind wie was welche welcher'.split(' '));
  const motsCles = s => new Set(String(s || '').toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').split(/[^a-z0-9]+/).filter(w => w.length >= 4 && !VIDES.has(w)));
  const recouvre = (a, b) => { if(!a.size || !b.size) return 0; let n = 0; a.forEach(w => { if(b.has(w)) n++; }); return n / Math.min(a.size, b.size); };
  const SANS_PIEGE = /_{2,}|…|\.\.\.|\b(complète|complete|completa|ergänze|vervollständige|exemple|example|ejemplo|beispiel|lequel n|laquelle n|which is not|isn’t|isn't|not\b|ne\b.{0,40}\bpas\b|n’est pas|n'est pas|no es|nicht|kein|sauf|except|excepto|außer|vrai ou faux|true or false|verdadero o falso|richtig oder falsch)/i;
  const COURT = .45;
  // Même type de question (où, quand, qui, pourquoi, comment, définition…) et même tournure de réponse (article, préposition, pronom…).
  const sans = x => String(x || '').toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[’']/g, ' ');
  const TYPES = [['ou', /^(ou |d ou |where |donde |de donde |wo |woher |wohin )/], ['quand', /^(quand |en quelle annee |a quelle epoque |when |in what year |cuando |en que ano |wann |in welchem jahr )/], ['qui', /^(qui |who |quien |quienes |wer )/],
    ['pourquoi', /^(pourquoi |why |por que |porque |warum |wieso |weshalb )/], ['comment', /^(comment |how |como |wie )/], ['combien', /^(combien |how many |how much |cuant|wie viel)/],
    ['def', /^(qu est ce qu|que (signifie|designe|veut dire|desigan?)|what (is|are|does)|que es|que son|was (ist|sind|bedeutet))/], ['que', /^(que |qu |what |que |was )/], ['quel', /^(quel|quelle|quels|quelles|which|cual|welche)/]];
  const typeQ = e => { const x = sans(e).replace(/^[^a-z]+/, '').replace(/^(dans|selon|pour|chez|en|a|au|in|for|according to|segun|para|nach|laut|bei) [^,?]{0,60}, /, ''); const t = TYPES.find(([, r]) => r.test(x)); if(!t) return '';
    if(t[0] !== 'quel' && t[0] !== 'que') return t[0];
    // « Quel génocide… » ne se mélange pas avec « Quel trajet… » : on garde le nom (ou le verbe après « que »).
    const m = x.split(/[^a-z0-9]+/).filter(Boolean).slice(1).filter(w => !/^(est|sont|etait|is|are|was|were|es|son|era|ist|sind|war|le|la|les|l|de|du|des|d|the|of|el|los|las|del|der|die|das|des|von|il|elle|on|ce|cet|cette)$/.test(w));
    return t[0] + ':' + (m[0] || ''); };
  const MOT1 = [['det', /^(un|une|le|la|les|l|des|du|the|a|an|el|los|las|una|der|die|das|den|dem|ein|eine|einen)$/], ['prep', /^(a|au|aux|dans|en|pour|par|avec|sur|sous|to|in|for|by|with|at|on|para|por|con|auf|fur|mit|zu|im|am)$/],
    ['pron', /^(il|ils|elle|elles|on|they|he|she|it|ellos|ellas|ella|el|er|sie|es)$/], ['car', /^(parce|car|because|porque|weil|da)$/], ['quand', /^(quand|lorsque|when|cuando|wenn|als)$/]];
  const typeR = b => { const w = sans(b).split(/[^a-z0-9]+/).filter(Boolean)[0] || ''; const t = MOT1.find(([, r]) => r.test(w)); return t ? t[0] : /^\d/.test(w) ? 'nb' : 'autre'; };
  function piegesSerieux(liste, pool){
    if(!Array.isArray(liste) || !Array.isArray(pool)) return liste;
    return liste.map(q => {
      const bon = String(q.bon || ''); if(bon.length < 25 || SANS_PIEGE.test(String(q.enonce || '')) || !Array.isArray(q.faux)) return q;
      const courts = q.faux.map((f, i) => [f, i]).filter(([f]) => String(f.en).length < COURT * bon.length).sort((a, b) => String(a[0].en).length - String(b[0].en).length);
      if(!courts.length) return q;
      const tq = typeQ(q.enonce), tr = typeR(bon); if(!tq) return q;
      const kb = motsCles(bon), ke = motsCles(q.enonce), regle = String(q.regle || '').toLowerCase(), deja = new Set([bon].concat(q.faux.map(f => String(f.en))).map(x => x.toLowerCase()));
      const cand = pool.filter(p => p !== q && p.chap === q.chap && (p.lang || 'fr') === (q.lang || 'fr') && p.enonce !== q.enonce && typeof p.bon === 'string').filter(p => {
        const b = p.bon, l = b.length / bon.length; if(l < .6 || l > 1.6 || typeQ(p.enonce) !== tq || typeR(b) !== tr || deja.has(b.toLowerCase()) || (regle && regle.includes(b.toLowerCase()))) return false;
        return recouvre(motsCles(b), kb) < .34 && recouvre(motsCles(p.enonce), ke) < .5;
      });
      if(!cand.length) return q;
      const faux = q.faux.map(f => Object.assign({}, f)), pris = new Set();
      for(const [, i] of courts){
        const c = cand.find(p => !pris.has(p.bon.toLowerCase())); if(!c) break; pris.add(c.bon.toLowerCase());
        faux[i] = { en:c.bon, vanne:AUTRE[(q.lang || 'fr')] || AUTRE.fr, emprunt:true };
      }
      return Object.assign({}, q, { faux, piegesSerieux:true });
    });
  }
  const AUTRE = { fr:'Ça, c’est la réponse à une autre question du même chapitre : relis bien ce qu’on te demande. 🔍', en:'That is the answer to another question in the same chapter: read carefully what you are asked. 🔍', es:'Esa es la respuesta a otra pregunta del mismo capítulo: lee bien lo que se pregunta. 🔍', de:'Das ist die Antwort auf eine andere Frage aus demselben Kapitel: Lies genau, was gefragt wird. 🔍' };
  function ajouter(m){ if(!trouver(m.id)) LISTE.push(m); }
  window.MATIERES = { NIVEAUX, LISTE, ajouter, trouver, chapitres, indicesNiveau, niveauxDe, serie, trimestres, serieParts, piegesSerieux, hasard, melanger, langue:LANGUE, langueDe, traduit, nom, nomChap, nomDom };
})();
