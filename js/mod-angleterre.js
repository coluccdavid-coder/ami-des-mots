// Ami des mots — v6.1 : le programme anglais (England), avec les mêmes écrans que le programme français :
// 📖 Revise (matières par Year, chapitres, étoiles, entraînement mélangé, quiz d'examen) · 📝 Mocks (SATs, GCSE, A level, Times tables check)
// 🗂️ Past papers 2026 (sujets jumeaux + où trouver les vrais) · 🏛️ Official (gov.uk et exam boards).
// On choisit le programme dans Matières : « 🏴 England curriculum » ou « 🇫🇷 Programme français ». Tout est en anglais, Plumo aussi.
(function(){
  'use strict';
  const M = window.AMI_MODULES, G = window.ENGLAND; if(!M || !G) return;
  const api = () => M.api;
  const TONS = [['doux', '🧸 Gentle'], ['taquin', '😏 Cheeky'], ['sanspitie', '🔥 No mercy']];
  const actif = () => api().base().programme === 'gb';
  // État du joueur (dans J().gb), nettoyé à chaque lecture.
  function etat(){
    const j = api().J(), o = j.gb && typeof j.gb === 'object' ? j.gb : {};
    const niveau = G.NIVEAUX.includes(o.niveau) ? o.niveau : 'Y7', ton = TONS.some(x => x[0] === o.ton) ? o.ton : 'taquin';
    const chap = {}; if(o.chap && typeof o.chap === 'object') for(const [k, v] of Object.entries(o.chap)) if(/^gb-[a-z]{2,20}:[0-9a-z-]{1,30}$/.test(k) && v && typeof v === 'object') chap[k] = { ok:Math.min(1e5, Math.max(0, Math.floor(+v.ok || 0))), n:Math.min(1e5, Math.max(0, Math.floor(+v.n || 0))) };
    const notes = {}; if(o.notes && typeof o.notes === 'object') for(const [k, v] of Object.entries(o.notes)) if(/^[0-9a-z-]{1,40}$/.test(k) && typeof v === 'string' && v.length <= 12) notes[k] = v;
    const derniere = G.trouver(o.derniere) ? o.derniere : '', mtc = Math.min(25, Math.max(0, Math.floor(+o.mtc || 0)));
    j.gb = { niveau, ton, chap, notes, derniere, mtc }; return j.gb;
  }
  const esc = s => api().esc(s);
  const carte = (a, v, ic, t1, t2, extra) => '<button class="carte-anglais' + (extra || '') + '" data-a="' + a + '"' + (v ? ' data-v="' + esc(v) + '"' : '') + '><span class="ic">' + ic + '</span><strong>' + t1 + '</strong><small>' + t2 + '</small></button>';
  const onglets = a => '<div class="onglets-matieres" role="tablist">' + [['gb-accueil', '📖 Revise'], ['gb-mocks', '📝 Mocks'], ['gb-passes', '🗂️ Past papers'], ['gb-officiel', '🏛️ Official']].map(([k, l]) =>
    '<button class="onglet' + (k === a ? ' actif' : '') + '" role="tab" aria-selected="' + (k === a) + '"' + (k === a ? '' : ' data-a="' + k + '"') + '>' + l + '</button>').join('') + '</div>';
  const poser = (retour, html) => api().poser(api().barre(retour) + '<main class="coin-anglais matieres-ecran" lang="en">' + html + '</main>');
  // v6.7 : interface dans une autre langue que l'anglais → on le dit clairement (le contenu anglais n'est pas encore traduit).
  const NOTE_LANGUE = {"fr": "Le programme anglais est pour l’instant en anglais ; sa traduction en français arrive.", "es": "El programa inglés está por ahora en inglés; la traducción al español llegará.", "de": "Der englische Lehrplan ist vorerst auf Englisch; die deutsche Übersetzung folgt.", "it": "Il programma inglese per ora è in inglese; la traduzione in italiano arriverà.", "pt": "O programa inglês está, por agora, em inglês; a tradução em português vai chegar."};
  // ───────── 📖 Revise ─────────
  function accueil(){
    const A = api(), e = etat(), J = A.J(); A.garder();
    const liste = G.LISTE.filter(m => G.chapitres(m.id, e.niveau).length);
    // v6.89 : un programme = un pays — ici seulement l'Angleterre : plus de cartes du programme français, les erreurs anglaises seulement.
    const P = window.AMI_PROGRAMMES, nErr = A.carnetDe ? A.carnetDe('uk').length : (J.carnet || []).length;
    poser(api().CONFIG && api().CONFIG.OUVRIR_MATIERES ? 'bienvenue' : 'accueil', '<h2>🏴 England curriculum</h2>' + (P ? P.onglets('uk') : '') + '<p class="pieges-intro">The national curriculum from Year 6 to Year 13: SATs, GCSE and A level. Plumo roasts your mistakes (never you) and always explains the right answer.</p>' + (NOTE_LANGUE[api().base().ui] ? '<p class="petit pas-traduit" lang="' + api().base().ui + '">🗣️ ' + esc(NOTE_LANGUE[api().base().ui]) + '</p>' : '') + onglets('gb-accueil') +
      '<div class="onglets-niveaux" role="tablist">' + G.NIVEAUX.map(n => '<button role="tab" aria-selected="' + (n === e.niveau) + '" class="onglet' + (n === e.niveau ? ' actif' : '') + '" data-a="gb-niveau" data-v="' + n + '" title="' + esc(G.ETAPES[n]) + '">' + n + '</button>').join('') + '</div>' +
      '<p class="petit">' + esc(G.NOMS[e.niveau] + ' · ' + G.ETAPES[e.niveau]) + '</p>' +
      '<div class="cartes-anglais">' + (P ? '' : A.cartesModules('matiere')) +
        (nErr ? carte('carnet-erreurs', P ? 'uk' : '', '🎯', 'My mistakes (' + nErr + ')', 'Questions you got wrong: they come back until you master them') : '') +
        liste.map(m => { const n = G.chapitres(m.id, e.niveau).length; return carte('gb-matiere', m.id, m.ic, esc(m.nom), esc(m.sous) + ' · ' + n + ' topic' + (n > 1 ? 's' : '')); }).join('') +
        (P && M.actions['pays-ecran'] ? carte('pays-ecran-uk', '', '🎓', 'My year group & exams', 'Your Year, GCSE and A level exams, timed exam practice') : '') +
        carte('gb-mtc', '', '✖️', 'Times tables check', 'Like the Year 4 check: 25 questions, 6 seconds each' + (e.mtc ? ' · best: ' + e.mtc + '/25' : '')) +
      '</div>' + (P ? '' : '<section class="domaine"><h3>🇫🇷 Programme français</h3><div class="cartes-anglais">' + carte('gb-programme', 'fr', '🇫🇷', 'Programme français', 'De la 6e au bac, en français') + '</div></section>'));
  }
  function matiere(id){
    const A = api(), m = G.trouver(id), e = etat(); if(!m) return accueil();
    e.derniere = id; if(!G.chapitres(id, e.niveau).length && G.niveauxDe(id).length) e.niveau = G.niveauxDe(id)[0]; A.garder();
    const chs = G.chapitres(id, e.niveau), doms = [];
    for(const c of chs){ let d = doms.find(x => x.d === c.dom); if(!d) doms.push(d = { d:c.dom, l:[] }); d.l.push(c); }
    const etoiles = cid => { const s = e.chap[id + ':' + cid]; if(!s || !s.n) return ''; const p = s.ok / s.n; return s.n >= 10 && p >= .9 ? '⭐⭐⭐' : p >= .7 ? '⭐⭐' : '⭐'; };
    const ex = m.examens && m.examens[e.niveau], note = e.notes[id + '-' + e.niveau];
    // v6.2 : le programme officiel de la matière, partie par partie, avec les chapitres qui le couvrent.
    const prog = (G.PROGRAMME || {})[id] || [], nomCh = c => (m.chapitres.find(x => x.id === c) || {}).nom || c;
    const officiel = prog.length ? '<details class="programme-officiel"><summary>📜 Official programme (national curriculum, GCSE & A level content)</summary><ul class="pieges-cats">' +
      prog.map(([t, st, chs]) => '<li><strong>' + esc(t) + '</strong> <small>(' + esc(st) + ')</small><br>✅ ' + chs.map(c => '<button class="lien" data-a="gb-chap" data-v="' + id + '|' + esc(c) + '">' + esc(nomCh(c)) + '</button>').join(' · ') + '</li>').join('') +
      '</ul><p class="petit"><a href="' + esc(G.OFFICIEL.programmes[0][1]) + '" target="_blank" rel="noopener">National curriculum on gov.uk</a> · the new curriculum is due to be taught from September 2028.</p></details>' : '';
    poser('gb-accueil', '<h2>' + m.ic + ' ' + esc(m.nom) + '</h2><p class="petit">' + esc(G.NOMS[e.niveau] + ' · ' + G.ETAPES[e.niveau]) + '</p>' + officiel +
      '<div class="onglets-niveaux" role="tablist">' + G.NIVEAUX.map(n => { const vide = !G.chapitres(id, n).length;
        return '<button role="tab" aria-selected="' + (n === e.niveau) + '" class="onglet' + (n === e.niveau ? ' actif' : '') + (vide ? ' vide' : '') + '" data-a="gb-matiere-niveau" data-v="' + id + '|' + n + '">' + n + '</button>'; }).join('') + '</div>' +
      '<p class="ton-prof">Plumo’s tone: ' + TONS.map(([k, l]) => '<button class="petit-bouton' + (k === e.ton ? ' actif' : '') + '" data-a="gb-ton" data-v="' + id + '|' + k + '" aria-pressed="' + (k === e.ton) + '">' + l + '</button>').join(' ') + '</p>' +
      (chs.length ? '<div class="actions serrees"><button class="moyen plein" data-a="gb-melange" data-v="' + id + '">🔁 Mixed practice</button>' +
        (ex ? '<button class="moyen" data-a="gb-examen" data-v="' + id + '">📝 ' + esc(ex) + (note ? ' (' + esc(note) + ')' : '') + '</button>' : '') + '</div>' +
        '<div class="domaines">' + doms.map(d => '<section class="domaine"><h3>' + esc(d.d) + ' <small>' + d.l.length + '</small></h3><div class="liste-chap">' +
          d.l.map(c => '<button class="chap" data-a="gb-chap" data-v="' + id + '|' + c.id + '"><span>' + esc(c.nom) + '</span><em>' + (etoiles(c.id) || '▶ 10') + '</em></button>').join('') + '</div></section>').join('') + '</div>'
        : '<p class="pieges-intro">🛠️ Nothing here for ' + esc(G.NOMS[e.niveau]) + ' yet. Pick another year.</p>'));
  }
  function serie(id, cible, n, titre, fin){
    const A = api(), e = etat(), liste = G.serie(id, cible, e.niveau, n, Math.floor(Math.random() * 1e9), e.ton);
    if(!liste.length) return matiere(id);
    A.questionsGo(liste, { titre, retour:'gb-retour', lang:'en', sujet:id, prof:id === 'gb-maths',
      onReponse:(juste, q) => { const k = id + ':' + q.chap, s = e.chap[k] || (e.chap[k] = { ok:0, n:0 }); s.n++; if(juste) s.ok++; else A.noterErreur('gb:' + id + ':' + q.chap); A.garder(); },
      fin:fin || (z => finSerie(z, titre, id)) });
  }
  const mot = p => p === 1 ? 'Full marks! Plumo puts his roasts away: he did not need a single one. 👏' : p >= .7 ? 'Solid! Plumo looked for a weak spot… found a tiny one. 😏' : p >= .4 ? 'Getting there! Plumo had a laugh, but you are improving.' : 'Plumo used up his whole stock of roasts. Again? 💪';
  function finSerie(z, titre, id, extra){
    const A = api(), p = z.bonnes / Math.max(1, z.liste.length); A.J().plumes += z.bonnes; A.garder(); try{ A.bruit('fin'); }catch(e){}
    poser('gb-retour', '<div class="centre"><div class="ami-moyen">' + A.ami(p >= .7 ? 'fete' : 'malin') + '</div><h2>' + esc(titre) + '</h2><p class="score">' + z.bonnes + ' / ' + z.liste.length + '</p>' + (extra || '') + '<p>' + mot(p) + '</p>' +
      '<div class="actions serrees"><button class="moyen plein" data-a="gb-melange" data-v="' + esc(id) + '">🔁 Again</button><button class="moyen" data-a="gb-matiere" data-v="' + esc(id) + '">' + esc((G.trouver(id) || {}).nom || '') + '</button></div></div>');
  }
  function examenMatiere(id){
    const e = etat(), m = G.trouver(id), t = '📝 ' + ((m.examens || {})[e.niveau] || 'Quiz');
    serie(id, 'examen', 20, t, z => { const p = z.bonnes / Math.max(1, z.liste.length), niv = G.NIVEAUX.indexOf(e.niveau);
      const g = niv >= 6 ? 'A level grade ' + G.grade(p, 'alevel') : niv >= 4 ? 'GCSE grade ' + G.grade(p, 'gcse-f9') : Math.round(100 * p) + '%';
      e.notes[id + '-' + e.niveau] = niv >= 4 ? g.replace(/^.*grade /, '') : Math.round(100 * p) + '%'; api().garder();
      finSerie(z, t, id, '<p class="note-examen">' + esc(g) + '</p>' + (niv >= 4 ? '<p class="petit">Plumo’s rough estimate: real grade boundaries change every year.</p>' : '')); });
  }
  // ───────── 📝 Mocks ─────────
  let mock = null;
  function mocks(){
    mock = null; const e = etat(), X = G.EXAMENS;
    const groupe = (t, l) => '<section class="domaine"><h3>' + t + '</h3><div class="cartes-anglais">' + l.map(k => { const x = X[k];
      return carte('gb-mock', k, x.ic, esc(x.titre), esc(x.papers.map(p => p.titre.replace(/ \(.*$/, '')).join(' · ')) + (e.notes['mock-' + k] ? ' · last: ' + esc(e.notes['mock-' + k]) : '')); }).join('') + '</div></section>';
    poser('gb-accueil', '<h2>📝 Mock exams</h2><p class="pieges-intro">Built like the real 2026 exams: same papers, same timings and, where they are published, the same marks. Plumo roasts every mistake, then gives you your result.</p>' + onglets('gb-mocks') +
      '<section class="domaine"><h3>✖️ Year 4</h3><div class="cartes-anglais">' + carte('gb-mtc', '', '✖️', 'Multiplication tables check', '25 questions · 6 seconds each · ' + (e.mtc ? 'best ' + e.mtc + '/25' : 'June of Year 4')) + '</div></section>' +
      groupe('✅ Year 6 · Real KS2 SATs papers', ['sats26-reel-gps', 'sats26-reel-maths', 'sats25-reel-gps', 'sats25-reel-maths']) +
      groupe('🎒 Year 6 · KS2 SATs (twin papers)', ['sats-gps', 'sats-reading', 'sats-maths']) +
      groupe('🎓 Year 11 · GCSE', ['gcse-maths-f', 'gcse-maths-h', 'gcse-english-lang', 'gcse-english-lit', 'gcse-science', 'gcse-history', 'gcse-geography', 'gcse-computing', 'gcse-french', 'gcse-spanish', 'gcse-german']) +
      groupe('🎓 Year 13 · A level', ['alevel-maths', 'alevel-sciences', 'alevel-english', 'alevel-options', 'alevel-humanities']) +
      groupe('🏛️ University entrance', ['uni-ucat', 'uni-lnat', 'uni-nasa']));
  }
  function mockGo(k, graine, passe){
    const x = G.EXAMENS[k]; if(!x) return mocks();
    mock = { k, x, i:0, res:[], graine:graine || Math.floor(Math.random() * 1e9), passe }; intro();
  }
  function intro(){
    const m = mock; if(!m) return mocks();
    if(m.i >= m.x.papers.length) return resultat();
    const p = m.x.papers[m.i];
    poser('gb-mocks', '<div class="centre"><h2>' + m.x.ic + ' ' + esc(m.passe ? m.passe.titre : m.x.titre) + '</h2><p class="piege-cat">Paper ' + (m.i + 1) + ' of ' + m.x.papers.length + '</p><h3>' + esc(p.titre) + '</h3>' +
      '<p>⏱️ Real exam: ' + esc(p.duree) + (p.points ? ' · ' + p.points + ' marks' : '') + '</p>' + (m.x.quand && !m.i ? '<p class="petit">📅 ' + esc(m.x.quand) + '</p>' : '') +
      (p.reel ? '<p class="aide">✅ Real exam questions, as set in ' + esc(G.REELS[p.reel].annee) + '. You choose the answer instead of writing it.</p>' + ogl(p.reel) : '') +
      '<p><button class="gros" data-a="gb-paper">▶ Start this paper</button></p></div>');
  }
  function paper(){
    const m = mock, A = api(); if(!m) return mocks();
    const p = m.x.papers[m.i], liste = G.construirePaper(p, m.graine + m.i * 7919, etat().ton);
    if(!liste.length){ m.res.push({ p, ok:0, n:0 }); m.i++; return intro(); }
    let pts = 0; const max = p.reel ? liste.reduce((t, q) => t + (q.pts || 1), 0) : 0;
    A.questionsGo(liste, { titre:'📝 ' + p.titre, retour:'gb-mocks', lang:'en', sujet:p.matiere, prof:p.matiere === 'gb-maths',
      onReponse:(juste, q) => { if(juste) pts += q.pts || 1; else A.noterErreur('gb-mock:' + m.k); },
      fin:z => { m.res.push({ p, ok:z.bonnes, n:z.liste.length, pts, max }); m.i++; intro(); } });
  }
  function resultat(){
    const A = api(), m = mock, x = m.x, e = etat();
    // Points : vrai sujet → points des vraies questions (ramenés au total officiel du paper) ; jumeau → au prorata.
    const marks = r => r.p.points ? Math.round(r.p.points * (r.max ? r.pts / r.max : r.ok / Math.max(1, r.n))) : null;
    const avecPts = m.res.every(r => r.p.points), tot = m.res.reduce((t, r) => t + r.n, 0), ok = m.res.reduce((t, r) => t + r.ok, 0);
    const p = avecPts ? m.res.reduce((t, r) => t + marks(r), 0) / Math.max(1, m.res.reduce((t, r) => t + r.p.points, 0)) : tot ? ok / tot : 0;
    const lignes = m.res.map(r => '<li><span>' + esc(r.p.titre) + '</span><strong>' + (r.p.points ? marks(r) + ' / ' + r.p.points : r.ok + ' / ' + r.n) + '</strong></li>').join('');
    let gros, detail;
    if(x.note === 'sats'){ const ss = G.noteSats(p, x.seuil); gros = ss == null ? 'Below 80' : 'Scaled score ≈ ' + ss; detail = ss != null && ss >= 100 ? '✅ Expected standard reached (100 or more).' + (ss >= 110 ? ' 🌟 Many schools call 110+ “greater depth”.' : '') : 'Not yet the expected standard (100). Plumo knows exactly what to practise now. 💪';
      detail += ' <span class="petit">Plumo’s estimate, based on the 2026 pass marks published by the Standards and Testing Agency.</span>'; }
    else { const g = G.grade(p, x.note); gros = (x.note === 'alevel' ? 'A level grade ≈ ' : 'GCSE grade ≈ ') + g;
      detail = '<span class="petit">Plumo’s rough estimate: real grade boundaries are set by each exam board and change every year.</span>'; }
    e.notes[(m.passe ? 'past-' + m.passe.id : 'mock-' + m.k)] = gros.replace(/^.*≈ /, '').replace('Below 80', '<80'); A.J().plumes += Math.round(10 * p); A.garder(); try{ A.bruit('fin'); }catch(err){}
    const verdict = p >= .8 ? 'Plumo puts his roasts in the cupboard: he did not need them. Respect. 🫡' : p >= .6 ? 'Solid! Plumo found an ant, not an elephant.' : p >= .4 ? 'It is close. Plumo laughed, but he also took notes to help you.' : 'Plumo emptied his roast stock. Good news: from here, it is all progress. 💪';
    poser('gb-mocks', '<div class="centre examen-fin"><div class="ami-moyen">' + A.ami(p >= .6 ? 'fete' : 'malin') + '</div><h2>' + x.ic + ' ' + esc(m.passe ? m.passe.titre : x.titre) + '</h2>' +
      '<p class="note-examen">' + esc(gros) + '</p><p>' + detail + '</p><ol class="ligue-classement">' + lignes + '</ol><p>' + verdict + '</p>' + (x.reel ? ogl(x.papers.find(q => q.reel).reel) : '') +
      (x.ecriture ? '<p class="aide">✍️ Section B (writing) is half of each English Language paper: write a paragraph and get it marked.</p><p><button class="moyen" data-a="correction">✍️ Plumo’s marking</button></p>' : '') +
      '<div class="actions serrees"><button class="moyen plein" data-a="gb-mock" data-v="' + esc(m.k) + '">🔁 Another mock</button><button class="moyen" data-a="gb-mocks">📝 Mocks</button></div></div>');
    mock = null;
  }
  // ───────── ✖️ Times tables check (Year 4) : 25 questions, 6 secondes chacune ─────────
  let mtc = null;
  function mtcGo(){
    const r = G.hasard(Math.floor(Math.random() * 1e9)), l = [], vus = new Set(), dures = [6, 7, 8, 9, 12];
    while(l.length < 25){ const a = r() < .55 ? dures[Math.floor(r() * 5)] : 2 + Math.floor(r() * 11), b = 2 + Math.floor(r() * 11), k = Math.min(a, b) + 'x' + Math.max(a, b);
      if(!vus.has(k)){ vus.add(k); l.push([a, b]); } }
    mtc = { l, i:0, ok:0, fin:0, minuteur:null }; mtcQuestion();
  }
  function mtcQuestion(){
    const m = mtc; if(!m) return;
    clearInterval(m.minuteur);
    if(m.i >= m.l.length) return mtcFin();
    const [a, b] = m.l[m.i]; m.fin = Date.now() + 6000;
    api().poser(api().barre('gb-mtc-stop') + '<main class="centre mtc" lang="en"><p class="piege-cat">✖️ Times tables check · ' + (m.i + 1) + '/25</p>' +
      '<p class="chrono-veille" id="mtc-chrono" role="timer">⏱️ 6</p><p class="mtc-question">' + a + ' × ' + b + ' = ?</p>' +
      '<form id="mtc-form" autocomplete="off"><input id="mtc-rep" inputmode="numeric" pattern="[0-9]*" maxlength="3" aria-label="Answer" autofocus> <button class="moyen plein">OK</button></form><p class="aide" id="mtc-msg" role="status"></p></main>');
    const f = document.getElementById('mtc-form'), i = document.getElementById('mtc-rep');
    if(f) f.addEventListener('submit', ev => { ev.preventDefault(); mtcRepondre(i ? i.value : ''); });
    try{ i && i.focus(); }catch(e){}
    m.minuteur = setInterval(() => { const reste = Math.ceil((m.fin - Date.now()) / 1000), c = document.getElementById('mtc-chrono');
      if(c) c.textContent = '⏱️ ' + Math.max(0, reste); if(reste <= 0) mtcRepondre(null); }, 250);
  }
  function mtcRepondre(v){
    const m = mtc; if(!m || m.repond) return; m.repond = true; clearInterval(m.minuteur);
    const [a, b] = m.l[m.i], juste = v != null && String(v).trim() !== '' && +v === a * b; if(juste) m.ok++;
    const msg = document.getElementById('mtc-msg');
    if(msg) msg.textContent = juste ? '✅' : (v == null ? '⏰ Time! ' : '❌ ') + a + ' × ' + b + ' = ' + (a * b);
    setTimeout(() => { if(mtc !== m) return; m.repond = false; m.i++; mtcQuestion(); }, juste ? 400 : 1500);
  }
  function mtcFin(){
    const A = api(), m = mtc, e = etat(); mtc = null; e.mtc = Math.max(e.mtc, m.ok); A.J().plumes += m.ok; A.garder(); try{ A.bruit('fin'); }catch(err){}
    poser('gb-accueil', '<div class="centre"><div class="ami-moyen">' + A.ami(m.ok >= 20 ? 'fete' : 'malin') + '</div><h2>✖️ Times tables check</h2><p class="score">' + m.ok + ' / 25</p>' +
      '<p>' + (m.ok === 25 ? 'Twenty-five out of twenty-five! Plumo’s calculator wants your autograph. 🧮' : m.ok >= 20 ? 'Fast fingers! A few tables still try to escape. 😏' : 'The 6s, 7s, 8s, 9s and 12s are slippery. Practise them and come back! 💪') + '</p>' +
      '<p class="petit">The real check has no pass mark. In England, Year 4 pupils take it every June.</p>' +
      '<div class="actions serrees"><button class="moyen plein" data-a="gb-mtc">🔁 Again</button><button class="moyen" data-a="gb-accueil">🏴 England</button></div></div>');
  }
  // ───────── 🗂️ Past papers 2026 · 🏛️ Official ─────────
  function passes(){
    const e = etat();
    poser('gb-accueil', '<h2>🗂️ Past papers 2026</h2><p class="pieges-intro">For each real 2026 exam: a twin paper built the same way, with different questions. The real paper stays with its author.</p>' + onglets('gb-passes') +
      '<div class="cartes-anglais">' + G.PASSES.map(a => '<div class="carte-annale">' + carte('gb-passe', a.id, a.reel ? '✅' : '🗂️', esc(a.titre), (a.reel ? 'Real exam: ' + esc(a.reel) : 'Twin of the ' + esc(G.EXAMENS[a.exam].titre) + ' papers') + (e.notes['past-' + a.id] ? ' · your result: ' + esc(e.notes['past-' + a.id]) : '')) +
        '<a class="lien-officiel" href="' + esc(a.url) + '" target="_blank" rel="noopener">📄 Real papers: ' + esc(a.ou) + '</a></div>').join('') + '</div>' +
      '<p class="petit">✅ = real questions. KS2 SATs papers are Crown copyright and may be re-used under the Open Government Licence, so Plumo includes the real arithmetic, grammar and spelling papers (the reading texts belong to their authors, and the reasoning papers are diagrams: those stay as twins). GCSE and A level papers belong to the exam boards (AQA, Pearson Edexcel, OCR), which do not allow copying: you get a twin paper and a link to the real one. Boards share recent papers with teachers first; students get them later (Pearson Edexcel: papers more than 9 months old).</p>');
  }
  function officiel(){
    const O = G.OFFICIEL, liste = l => '<div class="cartes-anglais">' + l.map(([t, u, d]) => '<a class="carte-anglais lien-carte" href="' + esc(u) + '" target="_blank" rel="noopener"><span class="ic">🔗</span><strong>' + esc(t) + '</strong><small>' + esc(d) + '</small></a>').join('') + '</div>';
    poser('gb-accueil', '<h2>🏛️ Official curriculum & papers</h2><p class="pieges-intro">The official texts from the Department for Education and the exam boards. Plumo’s twin papers are in the Mocks and Past papers tabs.</p>' + onglets('gb-officiel') +
      '<section class="domaine"><h3>📚 Curriculum</h3>' + liste(O.programmes) + '</section><section class="domaine"><h3>🗂️ Real past papers</h3>' + liste(O.annales) + '</section>');
  }
  // Mention de licence des vrais sujets (exigée par l'Open Government Licence).
  const ogl = id => { const R = G.REELS && G.REELS[id]; return R ? '<p class="petit licence-ogl">' + esc(R.attrib) + ' <a href="' + esc(G.LICENCE_OGL) + '" target="_blank" rel="noopener">OGL v3.0</a></p>' : ''; };
  // ───────── Branchements ─────────
  // v6.89 : sans les onglets de pays (js/mod-programmes.js), la carte « England curriculum » reste le chemin vers le programme anglais.
  M.cartes.matiere.unshift(() => actif() || window.AMI_PROGRAMMES ? '' : carte('gb-programme', 'gb', '🏴', 'England curriculum', 'Year 6 → A level, in English: SATs, GCSE, A level'));
  M.gb = { actif, etat, serie:(id, cible, n) => G.serie(id, cible, etat().niveau, n, Math.floor(Math.random() * 1e9), etat().ton) };
  Object.assign(M.actions, {
    'matieres': () => actif() ? accueil() : api().matieresAccueil(),
    'gb-programme': v => { api().base().programme = v === 'gb' ? 'gb' : 'fr'; api().garder(); return v === 'gb' ? accueil() : api().matieresAccueil(); },
    'gb-accueil': () => { mtcStop(); return accueil(); },
    'gb-niveau': v => { if(G.NIVEAUX.includes(v)){ etat().niveau = v; api().garder(); } return accueil(); },
    'gb-matiere': v => matiere(v),
    'gb-retour': () => { const d = etat().derniere; return d ? matiere(d) : accueil(); },
    'gb-matiere-niveau': v => { const [id, n] = String(v).split('|'); if(G.NIVEAUX.includes(n)){ etat().niveau = n; api().garder(); } return matiere(id); },
    'gb-ton': v => { const [id, k] = String(v).split('|'); if(TONS.some(x => x[0] === k)){ etat().ton = k; api().garder(); } return matiere(id); },
    'gb-melange': v => serie(v, 'melange', 10, '🔁 ' + ((G.trouver(v) || {}).nom || '') + ' · mixed practice'),
    'gb-chap': v => { const [id, c] = String(v).split('|'), ch = (G.trouver(id) || { chapitres:[] }).chapitres.find(x => x.id === c); return ch ? serie(id, c, 10, (G.trouver(id).ic) + ' ' + ch.nom) : accueil(); },
    'gb-examen': v => G.trouver(v) ? examenMatiere(v) : accueil(),
    'gb-mocks': () => mocks(),
    'gb-mock': v => mockGo(v),
    'gb-paper': () => paper(),
    'gb-passes': () => passes(),
    'gb-passe': v => { const a = G.PASSES.find(x => x.id === v); return a ? mockGo(a.exam, a.graine, a) : passes(); },
    'gb-officiel': () => officiel(),
    'gb-mtc': () => mtcGo(),
    'gb-mtc-stop': () => { mtcStop(); return accueil(); }
  });
  function mtcStop(){ if(mtc){ clearInterval(mtc.minuteur); mtc = null; } }
})();
