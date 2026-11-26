// v6.77 : « 🌍 Mon pays » — l'élève choisit son système scolaire (France, Italie, Espagne, Allemagne, États-Unis, Angleterre).
//  · ses classes, avec l'équivalent français : un clic règle le niveau des matières et des maths ;
//  · les examens de son pays (fiches de js/examens-monde.js, tenues à jour par la veille) ;
//  · des entraînements d'examen en maths, dans la langue du pays, chronométrés, sans vanne, corrigés à la fin,
//    notés comme là-bas (sur 10 pour la PAU, sur 20 pour la maturità…).
(function(){
  'use strict';
  const M = window.AMI_MODULES; if(!M) return;
  if(!M.cartes.matiere) M.cartes.matiere = [];
  const api = () => M.api, tx = (...a) => M.tx(...a);
  const S = () => window.SYSTEMES_SCOLAIRES || {}, B = () => window.BLANCS_PAYS || {};

  M.textes({
    '🌍 Mon pays : {0}':['🌍 My country: {0}', '🌍 Mi país: {0}', '🌍 Mein Land: {0}', '🌍 Il mio paese: {0}', '🌍 O meu país: {0}'],
    'Ton système scolaire, tes classes, tes examens et des entraînements dans la langue du pays.':['Your school system, your year groups, your exams and practice in the country’s language.', 'Tu sistema educativo, tus cursos, tus exámenes y entrenamientos en el idioma del país.', 'Dein Schulsystem, deine Klassen, deine Prüfungen und Training in der Landessprache.', 'Il tuo sistema scolastico, le tue classi, i tuoi esami e allenamenti nella lingua del paese.', 'O teu sistema escolar, as tuas turmas, os teus exames e treinos na língua do país.'],
    '🌍 Choisis ton pays':['🌍 Choose your country', '🌍 Elige tu país', '🌍 Wähle dein Land', '🌍 Scegli il tuo paese', '🌍 Escolhe o teu país'],
    'Le jeu suit le programme français ; pour chaque classe de ton pays, il choisit le niveau français le plus proche.':['The game follows the French curriculum; for each year group in your country, it picks the closest French level.', 'El juego sigue el programa francés; para cada curso de tu país, elige el nivel francés más cercano.', 'Das Spiel folgt dem französischen Lehrplan; für jede Klasse deines Landes wählt es die nächste französische Stufe.', 'Il gioco segue il programma francese; per ogni classe del tuo paese sceglie il livello francese più vicino.', 'O jogo segue o programa francês; para cada turma do teu país, escolhe o nível francês mais próximo.'],
    'Ma classe':['My year group', 'Mi curso', 'Meine Klasse', 'La mia classe', 'A minha turma'],
    '≈ {0} en France':['≈ {0} in France', '≈ {0} en Francia', '≈ {0} in Frankreich', '≈ {0} in Francia', '≈ {0} em França'],
    'Mes examens':['My exams', 'Mis exámenes', 'Meine Prüfungen', 'I miei esami', 'Os meus exames'],
    'En {0}':['In {0}', 'En {0}', 'In {0}', 'In {0}', 'Em {0}'],
    'S’entraîner pour l’examen':['Practise for the exam', 'Entrenar para el examen', 'Für die Prüfung üben', 'Allenarsi per l’esame', 'Treinar para o exame'],
    '{0} questions · {1} min · dans la langue du pays, sans vanne, corrigé à la fin':['{0} questions · {1} min · in the country’s language, no teasing, corrected at the end', '{0} preguntas · {1} min · en el idioma del país, sin bromas, corregido al final', '{0} Fragen · {1} Min. · in der Landessprache, ohne Sprüche, am Ende korrigiert', '{0} domande · {1} min · nella lingua del paese, senza battute, corretto alla fine', '{0} perguntas · {1} min · na língua do país, sem piadas, corrigido no fim'],
    'C’est un entraînement avec les exercices du jeu, pas le vrai sujet : il prépare aux notions, pas au format exact.':['This is practice with the game’s exercises, not the real paper: it prepares the topics, not the exact format.', 'Es un entrenamiento con los ejercicios del juego, no el examen real: prepara los contenidos, no el formato exacto.', 'Das ist ein Training mit den Aufgaben des Spiels, nicht die echte Prüfung: Es bereitet die Inhalte vor, nicht das genaue Format.', 'È un allenamento con gli esercizi del gioco, non la prova vera: prepara gli argomenti, non il formato esatto.', 'É um treino com os exercícios do jogo, não o exame real: prepara os conteúdos, não o formato exato.'],
    '📝 Brevet et bac blancs':['📝 Mock brevet and bac', '📝 Simulacros de brevet y bac', '📝 Probe-Brevet und -Bac', '📝 Simulazioni di brevet e bac', '📝 Simulados de brevet e bac'],
    'Changer de pays':['Change country', 'Cambiar de país', 'Land wechseln', 'Cambia paese', 'Mudar de país'],
    'Note : {0}':['Mark: {0}', 'Nota: {0}', 'Note: {0}', 'Voto: {0}', 'Nota: {0}'],
    '{0} bonnes réponses sur {1}':['{0} correct answers out of {1}', '{0} respuestas correctas de {1}', '{0} richtige Antworten von {1}', '{0} risposte giuste su {1}', '{0} respostas certas em {1}'],
    'À revoir':['To review', 'Para repasar', 'Zum Wiederholen', 'Da ripassare', 'A rever'],
    'Ta réponse :':['Your answer:', 'Tu respuesta:', 'Deine Antwort:', 'La tua risposta:', 'A tua resposta:'],
    'Bonne réponse :':['Correct answer:', 'Respuesta correcta:', 'Richtige Antwort:', 'Risposta giusta:', 'Resposta certa:'],
    'Pas de réponse (temps écoulé).':['No answer (time is up).', 'Sin respuesta (se acabó el tiempo).', 'Keine Antwort (Zeit abgelaufen).', 'Nessuna risposta (tempo scaduto).', 'Sem resposta (o tempo acabou).'],
    '🔁 Recommencer':['🔁 Try again', '🔁 Volver a empezar', '🔁 Noch einmal', '🔁 Ricomincia', '🔁 Recomeçar'],
    'Calcule ta note d’accès':['Work out your access mark', 'Calcula tu nota de acceso', 'Berechne deine Zugangsnote', 'Calcola il tuo voto di accesso', 'Calcula a tua nota de acesso'],
    'Moyenne du bachillerato (sur 10) :':['Bachillerato average (out of 10):', 'Nota media de Bachillerato (sobre 10):', 'Bachillerato-Durchschnitt (von 10):', 'Media del bachillerato (su 10):', 'Média do bachillerato (em 10):'],
    'Note d’accès : {0}/10 (60 % bachillerato + 40 % PAU).':['Access mark: {0}/10 (60% bachillerato + 40% PAU).', 'Nota de acceso: {0}/10 (60 % Bachillerato + 40 % PAU).', 'Zugangsnote: {0}/10 (60 % Bachillerato + 40 % PAU).', 'Voto di accesso: {0}/10 (60 % bachillerato + 40 % PAU).', 'Nota de acesso: {0}/10 (60 % bachillerato + 40 % PAU).'],
    'Il faut au moins 4/10 à la PAU pour que la note d’accès soit calculée.':['You need at least 4/10 in the PAU for the access mark to be calculated.', 'Hace falta al menos un 4/10 en la PAU para calcular la nota de acceso.', 'Man braucht mindestens 4/10 in der PAU, damit die Zugangsnote berechnet wird.', 'Serve almeno 4/10 nella PAU per calcolare il voto di accesso.', 'É preciso pelo menos 4/10 na PAU para calcular a nota de acesso.'],
    'Meilleure note : {0}':['Best mark: {0}', 'Mejor nota: {0}', 'Beste Note: {0}', 'Voto migliore: {0}', 'Melhor nota: {0}']
  });

  const pays = () => { const p = api().J().systeme; return S()[p] ? p : 'fr'; };
  const virg = n => String(Math.round(n * 10) / 10).replace('.', ',');
  const noteDe = (b, n, bareme) => bareme === 'sur10' ? virg(10 * b / n) + '/10' : bareme === 'sur20' ? virg(20 * b / n) + '/20' : bareme === 'pourcent' ? Math.round(100 * b / n) + ' %' : b + '/' + n;
  const notes = () => { const j = api().J(), o = j.paysNotes && typeof j.paysNotes === 'object' ? j.paysNotes : {}, r = {};
    for(const [k, v] of Object.entries(o)) if(/^[a-z]{2}-[a-z0-9-]{1,40}$/.test(k) && v && Number.isFinite(+v.best)) r[k] = { best:Math.max(0, Math.min(1, +v.best)), last:Math.max(0, Math.min(1, +v.last || 0)) };
    j.paysNotes = r; return r; };

  M.cartes.matiere.push(() => { const s = S()[pays()]; return s ? '<div class="cartes-anglais">' + M.carte('pays-ecran', '', '🌍', api().esc(tx('🌍 Mon pays : {0}', s.drapeau + ' ' + s.nom)).replace(/^🌍 /, ''), api().esc(tx('Ton système scolaire, tes classes, tes examens et des entraînements dans la langue du pays.'))) + '</div>' : ''; });

  function choix(){
    const A = api(), esc = A.esc, cur = pays();
    A.poser(A.barre('matieres') + '<main class="coin-anglais pays-ecran"><h2>' + esc(tx('🌍 Choisis ton pays')) + '</h2><p class="pieges-intro">' + esc(tx('Le jeu suit le programme français ; pour chaque classe de ton pays, il choisit le niveau français le plus proche.')) + '</p>' +
      '<div class="cartes-anglais">' + Object.entries(S()).map(([id, s]) => '<button class="carte-anglais' + (id === cur ? ' actif' : '') + '" data-a="pays-choisir" data-v="' + id + '" aria-pressed="' + (id === cur) + '"><span class="ic">' + s.drapeau + '</span><strong>' + esc(s.nom) + '</strong></button>').join('') + '</div></main>');
  }
  function ecran(){
    const A = api(), esc = A.esc, id = pays(), s = S()[id], E = (window.EXAMENS_MONDE || {})[id] || {}, niv = A.etatMatieres().niveau, nt = notes();
    const fiche = ([eid, quand]) => { const x = E[eid]; if(!x) return '';
      return '<article class="veille-examen"><h4>' + esc(x.examen) + ' <small>· ' + esc(tx('En {0}', quand)) + '</small></h4><p>' + esc(x.resume || '') + '</p><p class="petit">' + esc(x.conditions || '') + '</p>' +
        (Array.isArray(x.epreuves) && x.epreuves.length ? '<ul>' + x.epreuves.map(e => '<li>' + esc(e.nom) + [e.duree, e.notation, e.format].filter(Boolean).map(v => ' · ' + esc(v)).join('') + '</li>').join('') + '</ul>' : '') + '</article>'; };
    const blancs = (B()[id] || []).map(b => '<button class="carte-anglais" data-a="pays-blanc" data-v="' + esc(b.id) + '"><span class="ic">📝</span><strong>' + esc(b.titre) + '</strong><small>' + esc(tx('{0} questions · {1} min · dans la langue du pays, sans vanne, corrigé à la fin', b.n, b.minutes)) +
      (nt[b.id] ? ' · ' + esc(tx('Meilleure note : {0}', noteDe(Math.round(nt[b.id].best * b.n), b.n, b.bareme))) : '') + '</small></button>').join('');
    A.poser(A.barre('matieres') + '<main class="coin-anglais pays-ecran"><h2>' + s.drapeau + ' ' + esc(s.nom) + '</h2>' +
      '<h3>' + esc(tx('Ma classe')) + '</h3><div class="ma-classe pays-classes">' + s.classes.map(([nom, eq], i) => '<button class="petit-bouton' + (eq === niv ? ' actif' : '') + '" data-a="pays-classe" data-v="' + i + '" aria-pressed="' + (eq === niv) + '">' + esc(nom) + ' <small>' + esc(tx('≈ {0} en France', eq)) + '</small></button>').join('') + '</div>' +
      '<h3>' + esc(tx('Mes examens')) + '</h3>' + s.examens.map(fiche).join('') +
      '<h3>' + esc(tx('S’entraîner pour l’examen')) + '</h3>' + (id === 'fr' ? '<div class="actions serrees"><button class="moyen plein" data-a="examens">' + esc(tx('📝 Brevet et bac blancs')) + '</button></div>'
        : '<p class="petit">' + esc(tx('C’est un entraînement avec les exercices du jeu, pas le vrai sujet : il prépare aux notions, pas au format exact.')) + '</p><div class="cartes-anglais">' + blancs + '</div>') +
      '<div class="actions serrees"><button class="moyen" data-a="pays">' + esc(tx('Changer de pays')) + '</button></div></main>');
  }
  // Les exercices du coin maths, générés dans la langue du pays (traductions js/maths-xx.js), puis l'interface reprend sa langue.
  function serieDans(langue, niveau, n){
    const A = api(), b = A.base(), avant = b.ui; let l = [];
    try{ b.ui = langue; l = window.MATHS ? window.MATHS.serie(niveau, n, Math.floor(Math.random() * 1e9), 'taquin') : []; } finally { b.ui = avant; }
    return l;
  }
  function blanc(bid){
    const A = api(), id = pays(), b = (B()[id] || []).find(x => x.id === bid); if(!b) return ecran();
    const l = serieDans(S()[id].langue, b.niveau, b.n); if(!l.length) return ecran();
    A.questionsGo(l, { titre:'📝 ' + b.titre, retour:'matieres', prof:true, lang:S()[id].langue, finA:Date.now() + b.minutes * 60000, sansVanne:true, fin:z => fin(b, z) });
  }
  function fin(b, z){
    const A = api(), esc = A.esc, n = z.liste.length, part = z.bonnes / Math.max(1, n), nt = notes(), k = b.id;
    nt[k] = { best:Math.max(part, nt[k] ? nt[k].best : 0), last:part }; A.J().paysNotes = nt; A.garder();
    const err = (z.reponses || []).filter(r => !r.juste), sans = z.liste.slice(z.i);
    const item = (q, l2) => '<li><p lang="' + esc(q.lang || 'fr') + '">' + esc(q.enonce) + '</p>' + l2 + '<p>✅ ' + esc(tx('Bonne réponse :')) + ' <span lang="' + esc(q.lang || 'fr') + '">' + esc(q.bon) + '</span></p>' + (q.regle ? '<p class="petit" lang="' + esc(q.lang || 'fr') + '">💡 ' + esc(q.regle) + '</p>' : '') + '</li>';
    A.poser(A.barre('matieres') + '<main class="centre trimestre-fin pays-fin"><h2>' + esc('📝 ' + b.titre) + '</h2><p class="gros-score">' + esc(tx('Note : {0}', noteDe(z.bonnes, n, b.bareme))) + '</p><p>' + esc(tx('{0} bonnes réponses sur {1}', z.bonnes, n)) + '</p>' +
      (b.bareme === 'sur10' ? '<section class="calcul-acces"><h3>' + esc(tx('Calcule ta note d’accès')) + '</h3><label>' + esc(tx('Moyenne du bachillerato (sur 10) :')) + ' <input id="pays-media" type="number" min="0" max="10" step="0.01" inputmode="decimal"></label> <span id="pays-acces" data-pau="' + (10 * part) + '" aria-live="polite"></span></section>' : '') +
      (err.length || sans.length ? '<h3>' + esc(tx('À revoir')) + '</h3><ol class="correction-controle">' + err.map(r => item(r.q, '<p>❌ ' + esc(tx('Ta réponse :')) + ' <span lang="' + esc(r.q.lang || 'fr') + '">' + esc(r.choix) + '</span></p>')).join('') + sans.map(q => item(q, '<p>⏱️ ' + esc(tx('Pas de réponse (temps écoulé).')) + '</p>')).join('') + '</ol>' : '') +
      '<div class="actions serrees"><button class="moyen plein" data-a="pays-blanc" data-v="' + esc(b.id) + '">' + esc(tx('🔁 Recommencer')) + '</button><button class="moyen" data-a="pays-ecran">🌍 ' + esc(S()[pays()].nom) + '</button></div></main>');
  }
  // PAU : note d'accès = 0,6 × moyenne du bachillerato + 0,4 × PAU, calculée seulement à partir de 4/10 à la PAU.
  const acces = (media, pau) => pau < 4 ? null : Math.round((0.6 * media + 0.4 * pau) * 1000) / 1000;
  document.addEventListener('input', ev => { if(!ev.target || ev.target.id !== 'pays-media') return; const o = document.getElementById('pays-acces'); if(!o) return;
    const m = Math.max(0, Math.min(10, parseFloat(String(ev.target.value).replace(',', '.')))), p = +o.dataset.pau; if(!Number.isFinite(m)){ o.textContent = ''; return; }
    const r = acces(m, p); o.textContent = r == null ? tx('Il faut au moins 4/10 à la PAU pour que la note d’accès soit calculée.') : tx('Note d’accès : {0}/10 (60 % bachillerato + 40 % PAU).', String(r).replace('.', ',')); });

  Object.assign(M.actions, {
    'pays':() => choix(),
    'pays-ecran':() => ecran(),
    'pays-choisir':v => { if(S()[v]){ api().J().systeme = v; api().garder(); } return ecran(); },
    'pays-classe':v => { const A = api(), s = S()[pays()], c = s && s.classes[+v]; if(c){ const j = A.J(); A.etatMatieres().niveau = c[1]; j.matieres = Object.assign(j.matieres || {}, { niveau:c[1] });
      const em = A.etatMaths && A.etatMaths(); if(em) em.niveau = c[1]; j.maths = Object.assign(j.maths || {}, { niveau:c[1] }); A.garder(); } return ecran(); },
    'pays-blanc':v => blanc(v)
  });
  window.AMI_PAYS = { pays, serieDans, noteDe, acces };
})();
