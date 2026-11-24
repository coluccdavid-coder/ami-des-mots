// Ami des mots — v6.1 : examens anglais, construits comme les vrais (structure 2026) : Multiplication tables check (Year 4),
// KS2 SATs (Year 6), GCSE (Year 11), A level (Year 13). Ce sont des « sujets jumeaux » : même découpage en papers,
// mêmes durées et, quand ils sont publics, mêmes totaux de points ; les questions sont écrites pour Ami des mots.
// Les vrais sujets restent chez leurs auteurs (gov.uk, AQA, Pearson Edexcel, OCR) : liens dans l'onglet Official.
// Notes : SATs → « scaled score » estimé à partir des seuils 2026 publiés ; GCSE → grade 9–1 estimé ; A level → A*–E estimé.
// Les vraies limites de notes changent chaque année : l'appli le dit à chaque résultat.
(function(){
  'use strict';
  const E = window.ENGLAND; if(!E) return;
  // p = papers : [titre, durée, points (null si on n'affiche pas de total officiel), matière, chapitres (vide = tout le niveau), nombre de questions, niveau]
  const P = (titre, duree, points, matiere, chapitres, n, niveau) => ({ titre, duree, points, matiere, chapitres, n, niveau });
  const X = E.EXAMENS;
  X['sats-maths'] = { titre:'KS2 SATs · Maths', ic:'🔢', niveau:'Y6', quand:'Wed 13 & Thu 14 May 2026', note:'sats', seuil:56 / 110, papers:[
    P('Paper 1: arithmetic', '30 min', 40, 'gb-maths', ['arithmetic', 'place-value', 'fdp'], 12, 'Y6'),
    P('Paper 2: reasoning', '40 min', 35, 'gb-maths', ['ratio-ks2', 'angles', 'area', 'statistics-basic', 'fdp'], 10, 'Y6'),
    P('Paper 3: reasoning', '40 min', 35, 'gb-maths', ['ratio-ks2', 'angles', 'area', 'statistics-basic', 'place-value'], 10, 'Y6')] };
  X['sats-gps'] = { titre:'KS2 SATs · Grammar, punctuation & spelling', ic:'✏️', niveau:'Y6', quand:'Mon 11 May 2026', note:'sats', seuil:34 / 70, papers:[
    P('Paper 1: questions', '45 min', 50, 'gb-english', ['word-classes', 'tenses', 'punctuation'], 14, 'Y6'),
    P('Paper 2: spelling', 'about 15 min', 20, 'gb-english', ['spelling'], 8, 'Y6')] };
  X['sats-reading'] = { titre:'KS2 SATs · Reading', ic:'📖', niveau:'Y6', quand:'Tue 12 May 2026', note:'sats', seuil:25 / 50, papers:[
    P('Reading paper', '1 hour', 50, 'gb-english', ['reading-skills', 'techniques'], 12, 'Y6')] };
  X['gcse-maths-f'] = { titre:'GCSE Maths · Foundation', ic:'🔢', niveau:'Y11', quand:'Paper 1: Thu 14 May 2026', note:'gcse-f', papers:[
    P('Paper 1 (non-calculator)', '1 h 30', 80, 'gb-maths', ['negatives', 'fdp', 'algebra-basics', 'equations', 'angles', 'probability'], 15, 'Y9'),
    P('Paper 2 (calculator)', '1 h 30', 80, 'gb-maths', ['ratio-proportion', 'area', 'sequences', 'statistics-basic', 'circles'], 15, 'Y10'),
    P('Paper 3 (calculator)', '1 h 30', 80, 'gb-maths', ['ratio-proportion', 'pythagoras', 'graphs', 'indices', 'probability'], 15, 'Y10')] };
  X['gcse-maths-h'] = { titre:'GCSE Maths · Higher', ic:'🔢', niveau:'Y11', quand:'Paper 1: Thu 14 May 2026', note:'gcse-h', papers:[
    P('Paper 1 (non-calculator)', '1 h 30', 80, 'gb-maths', ['indices', 'surds-higher', 'quadratics', 'simultaneous', 'probability'], 15, 'Y11'),
    P('Paper 2 (calculator)', '1 h 30', 80, 'gb-maths', ['pythagoras', 'circles', 'ratio-proportion', 'graphs', 'statistics-basic'], 15, 'Y11'),
    P('Paper 3 (calculator)', '1 h 30', 80, 'gb-maths', ['quadratics', 'sequences', 'equations', 'surds-higher', 'pythagoras'], 15, 'Y11')] };
  X['gcse-english-lang'] = { titre:'GCSE English Language', ic:'📝', niveau:'Y11', note:'gcse-f9', ecriture:true, papers:[
    P('Paper 1: Explorations in creative reading and writing (Section A)', '1 h 45', 80, 'gb-english', ['techniques', 'lang-paper', 'reading-skills'], 12, 'Y11'),
    P('Paper 2: Writers’ viewpoints and perspectives (Section A)', '1 h 45', 80, 'gb-english', ['persuasive', 'lang-paper', 'techniques'], 12, 'Y11')] };
  X['gcse-english-lit'] = { titre:'GCSE English Literature', ic:'📚', niveau:'Y11', note:'gcse-f9', papers:[
    P('Paper 1: Shakespeare and the 19th-century novel', '1 h 45', null, 'gb-english', ['macbeth', 'romeo', 'christmas-carol', 'jekyll'], 12, 'Y11'),
    P('Paper 2: Modern texts and poetry', '2 h 15', null, 'gb-english', ['jekyll', 'poetry', 'techniques'], 12, 'Y11')] };
  X['gcse-science'] = { titre:'GCSE Combined Science', ic:'🔬', niveau:'Y11', note:'gcse-f9', papers:[
    P('Biology paper 1', '1 h 15', 70, 'gb-biology', ['cells', 'transport', 'organisation', 'infection', 'bioenergetics'], 10, 'Y11'),
    P('Chemistry paper 1', '1 h 15', 70, 'gb-chemistry', ['atoms', 'bonding', 'quantitative', 'reactions'], 10, 'Y11'),
    P('Physics paper 1', '1 h 15', 70, 'gb-physics', ['energy', 'electricity', 'atomic-space'], 10, 'Y11'),
    P('Biology paper 2', '1 h 15', 70, 'gb-biology', ['genetics', 'ecology'], 10, 'Y11'),
    P('Chemistry paper 2', '1 h 15', 70, 'gb-chemistry', ['rates', 'organic'], 10, 'Y11'),
    P('Physics paper 2', '1 h 15', 70, 'gb-physics', ['forces', 'waves'], 10, 'Y11')] };
  X['gcse-history'] = { titre:'GCSE History', ic:'🏛️', niveau:'Y11', note:'gcse-f9', papers:[
    P('Paper 1: Understanding the modern world', '2 h', null, 'gb-history', ['germany', 'cold-war', 'world-wars'], 12, 'Y11'),
    P('Paper 2: Shaping the nation', '2 h', null, 'gb-history', ['medicine', 'tudors', 'medieval'], 12, 'Y10')] };
  X['gcse-geography'] = { titre:'GCSE Geography', ic:'🌍', niveau:'Y11', note:'gcse-f9', papers:[
    P('Paper 1: Living with the physical environment', '1 h 30', null, 'gb-geography', ['hazards', 'rivers-coasts', 'climate'], 12, 'Y11'),
    P('Paper 2: Challenges in the human environment', '1 h 30', null, 'gb-geography', ['urban-dev'], 8, 'Y11'),
    P('Paper 3: Geographical applications & skills', '1 h 15', null, 'gb-geography', ['maps', 'climate'], 8, 'Y8')] };
  X['gcse-computing'] = { titre:'GCSE Computer Science', ic:'💻', niveau:'Y11', note:'gcse-f9', papers:[
    P('Paper 1: Computational thinking and programming', '2 h', null, 'gb-computing', ['algorithms', 'python'], 12, 'Y11'),
    P('Paper 2: Computing concepts', '1 h 45', null, 'gb-computing', ['binary', 'units', 'systems-networks', 'sql-ethics'], 12, 'Y11')] };
  X['gcse-french'] = { titre:'GCSE French (new 2026 exams)', ic:'🇫🇷', niveau:'Y11', note:'gcse-f9', quand:'first exams under the new specification: summer 2026', papers:[
    P('Listening (with dictation)', '35–45 min', null, 'gb-french', ['exam-2026', 'basics', 'topics'], 10, 'Y11'),
    P('Reading (with translation into English)', '45 min–1 h', null, 'gb-french', ['topics', 'verbs'], 10, 'Y11')] };
  X['alevel-maths'] = { titre:'A level Maths', ic:'📐', niveau:'Y13', note:'alevel', papers:[
    P('Paper 1: Pure Mathematics 1', '2 h', 100, 'gb-maths', ['differentiation', 'integration', 'logs'], 12, 'Y13'),
    P('Paper 2: Pure Mathematics 2', '2 h', 100, 'gb-maths', ['integration', 'logs', 'quadratics', 'surds-higher'], 12, 'Y12'),
    P('Paper 3: Statistics and Mechanics', '2 h', 100, 'gb-maths', ['binomial-stats', 'mechanics'], 12, 'Y13')] };
  X['alevel-sciences'] = { titre:'A level Sciences (Biology · Chemistry · Physics)', ic:'🔬', niveau:'Y13', note:'alevel', papers:[
    P('Biology', '2 h per paper', null, 'gb-biology', ['genetics'], 8, 'Y13'),
    P('Chemistry', '2 h per paper', null, 'gb-chemistry', ['quantitative', 'rates', 'organic'], 8, 'Y13'),
    P('Physics', '2 h per paper', null, 'gb-physics', ['atomic-space'], 8, 'Y13')] };
  X['alevel-options'] = { titre:'A level Economics · Psychology · Computer Science', ic:'🎓', niveau:'Y13', note:'alevel', papers:[
    P('Economics', '2 h per paper', null, 'gb-economics', [], 8, 'Y13'),
    P('Psychology', '2 h per paper', null, 'gb-psychology', [], 8, 'Y13'),
    P('Computer Science', '2 h 30 per paper', null, 'gb-computing', ['algorithms', 'python', 'systems-networks'], 8, 'Y13')] };
  X['alevel-english'] = { titre:'A level English Literature', ic:'📚', niveau:'Y13', note:'alevel', papers:[
    P('Literary terms & contexts', '2 h 30 per paper', null, 'gb-english', ['alevel-lit', 'poetry', 'techniques'], 12, 'Y13')] };
  // Construire un paper : questions tirées dans les chapitres du paper (graine fixe pour les « past papers » jumeaux).
  E.construirePaper = function(p, graine, ton){
    if(p.reel && E.listeReelle) return E.listeReelle(p.reel, graine);   // v6.2 : vrai sujet (SATs)
    const m = E.trouver(p.matiere); if(!m) return [];
    const chs = p.chapitres.length ? p.chapitres : m.chapitres.filter(c => c.niv.includes(p.niveau)).map(c => c.id);
    const r = E.hasard(graine), out = [], vus = new Set();
    for(let k = 0; out.length < p.n && k < p.n * 6; k++){
      const c = chs[k % chs.length], q = (E.serie(p.matiere, c, p.niveau, 1, Math.floor(r() * 1e9) + 1, ton) || [])[0];
      if(q && !vus.has(q.enonce + '|' + q.bon)){ vus.add(q.enonce + '|' + q.bon); out.push(q); }
    }
    return out;
  };
  // Notes estimées. p = proportion de bonnes réponses (0 à 1).
  E.noteSats = (p, seuil) => { const bas = .06; if(p < bas) return null;   // il faut au moins quelques points pour avoir 80
    return Math.round(p < seuil ? 80 + 20 * (p - bas) / (seuil - bas) : 100 + 20 * (p - seuil) / (1 - seuil)); };
  const BANDES = { 'gcse-h':[[.80, '9'], [.68, '8'], [.56, '7'], [.44, '6'], [.32, '5'], [.20, '4'], [.12, '3'], [0, 'U']],
    'gcse-f':[[.78, '5'], [.62, '4'], [.46, '3'], [.30, '2'], [.15, '1'], [0, 'U']],
    'gcse-f9':[[.85, '9'], [.76, '8'], [.67, '7'], [.58, '6'], [.49, '5'], [.40, '4'], [.30, '3'], [.20, '2'], [.10, '1'], [0, 'U']],
    'alevel':[[.80, 'A*'], [.68, 'A'], [.56, 'B'], [.44, 'C'], [.33, 'D'], [.22, 'E'], [0, 'U']] };
  E.grade = (p, sorte) => (BANDES[sorte] || BANDES['gcse-f9']).find(([s]) => p >= s)[1];
  // « Past papers » 2026 : le jumeau de chaque vraie session 2026 (graine fixe), avec l'endroit où trouver le vrai sujet.
  const GOV = 'https://www.gov.uk/government/publications/', AQA = 'https://www.aqa.org.uk/past-papers-and-mark-schemes-finder', PEARSON = 'https://qualifications.pearson.com/en/support/support-topics/exams/past-papers.html';
  E.PASSES = [
    { id:'sats26-maths', exam:'sats26-reel-maths', graine:2026051301, titre:'KS2 SATs 2026 · Maths', url:GOV + 'key-stage-2-tests-2026-mathematics-test-materials', ou:'gov.uk (Standards and Testing Agency)', reel:'real arithmetic paper + twin reasoning papers' },
    { id:'sats26-gps', exam:'sats26-reel-gps', graine:2026051101, titre:'KS2 SATs 2026 · Grammar, punctuation & spelling', url:GOV + 'key-stage-2-tests-2026-english-grammar-punctuation-and-spelling-test-materials', ou:'gov.uk (Standards and Testing Agency)', reel:'real questions and real spelling words' },
    { id:'sats25-maths', exam:'sats25-reel-maths', graine:2025051401, titre:'KS2 SATs 2025 · Maths', url:GOV + 'key-stage-2-tests-2025-mathematics-test-materials', ou:'gov.uk (Standards and Testing Agency)', reel:'real arithmetic paper + twin reasoning papers' },
    { id:'sats25-gps', exam:'sats25-reel-gps', graine:2025051201, titre:'KS2 SATs 2025 · Grammar, punctuation & spelling', url:GOV + 'key-stage-2-tests-2025-english-grammar-punctuation-and-spelling-test-materials', ou:'gov.uk (Standards and Testing Agency)', reel:'real questions and real spelling words' },
    { id:'sats26-reading', exam:'sats-reading', graine:2026051201, titre:'KS2 SATs 2026 · Reading (twin: the real texts belong to their authors)', url:GOV + 'key-stage-2-tests-2026-english-reading-test-materials', ou:'gov.uk (Standards and Testing Agency)' },
    { id:'gcse26-maths-h', exam:'gcse-maths-h', graine:2026051401, titre:'GCSE Maths 2026 · Higher', url:AQA, ou:'AQA, Pearson Edexcel or OCR (your school’s board)', board:true },
    { id:'gcse26-maths-f', exam:'gcse-maths-f', graine:2026051402, titre:'GCSE Maths 2026 · Foundation', url:AQA, ou:'AQA, Pearson Edexcel or OCR (your school’s board)', board:true },
    { id:'gcse26-english', exam:'gcse-english-lang', graine:2026052101, titre:'GCSE English Language 2026', url:AQA, ou:'AQA, Pearson Edexcel or OCR', board:true },
    { id:'gcse26-science', exam:'gcse-science', graine:2026051501, titre:'GCSE Combined Science 2026', url:AQA, ou:'AQA, Pearson Edexcel or OCR', board:true },
    { id:'gcse26-french', exam:'gcse-french', graine:2026060101, titre:'GCSE French 2026 (first year of the new exams)', url:'https://www.aqa.org.uk/subjects/french/gcse/french-8652/specification/scheme-of-assessment', ou:'AQA, Pearson Edexcel or Eduqas', board:true },
    { id:'alevel26-maths', exam:'alevel-maths', graine:2026060301, titre:'A level Maths 2026', url:PEARSON, ou:'Pearson Edexcel, AQA or OCR', board:true }
  ];
  E.OFFICIEL = {
    programmes:[
      ['National curriculum in England (key stages 1 to 4)', 'https://www.gov.uk/government/publications/national-curriculum-in-england-framework-for-key-stages-1-to-4', 'The statutory programmes of study, in force since 2014 and still taught in 2026'],
      ['Secondary national curriculum (key stages 3 and 4)', 'https://www.gov.uk/government/publications/national-curriculum-in-england-secondary-curriculum', 'Programmes of study subject by subject'],
      ['Curriculum and Assessment Review: final report (Nov 2025)', 'https://www.gov.uk/government/publications/curriculum-and-assessment-review-final-report', 'A new national curriculum is due to be published in spring 2027, taught from September 2028'],
      ['Multiplication tables check (Year 4): information for parents', 'https://www.gov.uk/government/publications/multiplication-tables-check-information-for-parents', '25 questions, 6 seconds each, in June'],
      ['KS2 SATs 2026: scaled scores', 'https://www.gov.uk/government/publications/key-stage-2-tests-2026-scaled-scores', '100 = expected standard (80 to 120)']],
    annales:[
      ['KS2 past papers (last 3 years)', 'https://www.gov.uk/government/collections/key-stage-2-tests-past-papers', 'Free on gov.uk, with mark schemes'],
      ['AQA: past papers and mark schemes', AQA, 'Most papers stay on the website for three years'],
      ['Pearson Edexcel: past papers', PEARSON, 'Students can see papers more than 9 months old'],
      ['OCR: past paper finder', 'https://www.ocr.org.uk/qualifications/past-paper-finder/', 'GCSE and A level']]
  };
})();
