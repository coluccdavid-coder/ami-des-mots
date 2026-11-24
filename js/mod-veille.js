// Ami des mots — v6.0 : « veille de contrôle ». On choisit la matière et le chapitre, puis 15 minutes chrono :
// d'abord les questions ratées de cette matière (carnet d'erreurs), puis des questions du chapitre. Note sur 20 à la fin.
(function(){
  'use strict';
  const M = window.AMI_MODULES; if(!M) return;
  const DUREE = 15 * 60 * 1000;
  M.textes({
    '⏱️ Veille de contrôle': ['⏱️ Night-before-the-test', '⏱️ Víspera de examen', '⏱️ Vorabend der Arbeit', '⏱️ Vigilia della verifica', '⏱️ Véspera do teste'],
    '15 minutes chrono sur un chapitre, avec tes erreurs à revoir': ['15 minutes against the clock on one chapter, with your mistakes to review', '15 minutos cronometrados en un tema, con tus errores para repasar', '15 Minuten auf Zeit zu einem Kapitel, mit deinen Fehlern zum Wiederholen', '15 minuti a cronometro su un capitolo, con i tuoi errori da ripassare', '15 minutos cronometrados num capítulo, com os teus erros para rever'],
    'Quelle matière demain ?': ['Which subject tomorrow?', '¿Qué asignatura mañana?', 'Welches Fach morgen?', 'Quale materia domani?', 'Que disciplina amanhã?'],
    'Quel chapitre ?': ['Which chapter?', '¿Qué tema?', 'Welches Kapitel?', 'Quale capitolo?', 'Que capítulo?'],
    'Tout le programme du niveau': ['The whole level', 'Todo el programa del nivel', 'Der ganze Stoff der Stufe', 'Tutto il programma del livello', 'Todo o programa do nível'],
    '{0} erreur(s) du carnet au début': ['{0} mistake(s) from your notebook first', '{0} error(es) del cuaderno primero', 'Zuerst {0} Fehler aus deinem Heft', 'Prima {0} errore/i dal quaderno', 'Primeiro {0} erro(s) do caderno'],
    '▶ Lancer le chrono (15 min)': ['▶ Start the clock (15 min)', '▶ Empezar el cronómetro (15 min)', '▶ Uhr starten (15 Min.)', '▶ Avvia il cronometro (15 min)', '▶ Começar o cronómetro (15 min)'],
    'Temps écoulé ! {0} bonne(s) réponse(s) sur {1}.': ['Time’s up! {0} right answer(s) out of {1}.', '¡Se acabó el tiempo! {0} respuesta(s) correcta(s) de {1}.', 'Zeit um! {0} richtige Antwort(en) von {1}.', 'Tempo scaduto! {0} risposta/e giusta/e su {1}.', 'Tempo esgotado! {0} resposta(s) certa(s) em {1}.'],
    'Prêt pour demain. Dors bien ! 😴': ['Ready for tomorrow. Sleep well! 😴', 'Listo para mañana. ¡Que descanses! 😴', 'Bereit für morgen. Schlaf gut! 😴', 'Pronto per domani. Dormi bene! 😴', 'Pronto para amanhã. Dorme bem! 😴'],
    'Encore 10 minutes demain matin sur les erreurs, et ça passe. 💪': ['Another 10 minutes on the mistakes tomorrow morning and you’re fine. 💪', 'Otros 10 minutos con los errores mañana por la mañana y lo tienes. 💪', 'Morgen früh noch 10 Minuten die Fehler üben, dann klappt’s. 💪', 'Altri 10 minuti sugli errori domattina e ce la fai. 💪', 'Mais 10 minutos nos erros amanhã de manhã e passas. 💪'],
    '🔁 Une autre veille': ['🔁 Another round', '🔁 Otra víspera', '🔁 Noch eine Runde', '🔁 Un’altra vigilia', '🔁 Outra véspera'],
    'Note : {0} / 20': ['Mark: {0} / 20', 'Nota: {0} / 20', 'Note: {0} / 20', 'Voto: {0} / 20', 'Nota: {0} / 20']
  });
  const tx = M.tx, api = () => M.api;
  M.cartes.matiere.push(() => M.carte('veille', '', '⏱️', tx('⏱️ Veille de contrôle').replace(/^⏱️ /, ''), tx('15 minutes chrono sur un chapitre, avec tes erreurs à revoir')));
  // v6.1 : avec le programme anglais (England), la veille prend les matières anglaises du Year choisi.
  const gb = () => !!(M.gb && M.gb.actif() && window.ENGLAND);
  function ecranMatiere(){
    if(gb()){ const A = api(), esc = A.esc, niv = M.gb.etat().niveau, l = ENGLAND.LISTE.filter(m => ENGLAND.chapitres(m.id, niv).length);
      return A.poser(A.barre('matieres') + '<main class="coin-anglais matieres-ecran" lang="en"><h2>⏱️ Night before the test</h2><p class="pieges-intro">Which subject tomorrow? (' + esc(niv) + ')</p><div class="cartes-anglais">' +
        l.map(m => M.carte('veille-matiere', m.id, m.ic, esc(m.nom), '')).join('') + '</div></main>'); }
    const A = api(), esc = A.esc, niv = A.etatMatieres().niveau, l = (window.MATIERES ? MATIERES.LISTE : []).filter(m => MATIERES.chapitres(m.id, niv).length);
    A.poser(A.barre('matieres') + '<main class="coin-anglais matieres-ecran"><h2>' + tx('⏱️ Veille de contrôle') + '</h2><p class="pieges-intro">' + tx('Quelle matière demain ?') + ' (' + esc(niv) + ')</p><div class="cartes-anglais">' +
      (window.MATHS ? M.carte('veille-matiere', 'maths', '🔢', 'Maths', '') : '') +
      l.map(m => M.carte('veille-matiere', m.id, m.ic, esc(m.nom), '')).join('') + '</div></main>');
  }
  function carnetDe(id){ const j = api().J(); return (Array.isArray(j.carnet) ? j.carnet : []).filter(x => x.matiere === id); }
  function ecranChapitre(id){
    if(/^gb-/.test(id) && window.ENGLAND){ const A = api(), esc = A.esc, niv = M.gb.etat().niveau, chs = ENGLAND.chapitres(id, niv), n = carnetDe(id).length;
      return A.poser(A.barre('matieres') + '<main class="coin-anglais matieres-ecran" lang="en"><h2>⏱️ Night before the test</h2><p class="pieges-intro">Which topic?' + (n ? ' · ' + n + ' mistake(s) from your notebook first' : '') + '</p>' +
        '<div class="liste-chap"><button class="chap" data-a="veille-go" data-v="' + esc(id) + '|melange"><span>Everything for this year</span><em>⏱️ 15</em></button>' +
        chs.map(c => '<button class="chap" data-a="veille-go" data-v="' + esc(id) + '|' + esc(c.id) + '"><span>' + esc(c.nom) + '</span><em>⏱️ 15</em></button>').join('') + '</div></main>'); }
    const A = api(), esc = A.esc, niv = A.etatMatieres().niveau;
    const chs = id === 'maths' ? [] : MATIERES.chapitres(id, niv), n = carnetDe(id).length;
    A.poser(A.barre('matieres') + '<main class="coin-anglais matieres-ecran"><h2>' + tx('⏱️ Veille de contrôle') + '</h2><p class="pieges-intro">' + tx('Quel chapitre ?') + (n ? ' · ' + esc(tx('{0} erreur(s) du carnet au début', n)) : '') + '</p>' +
      '<div class="liste-chap"><button class="chap" data-a="veille-go" data-v="' + esc(id) + '|melange"><span>' + tx('Tout le programme du niveau') + '</span><em>⏱️ 15</em></button>' +
      chs.map(c => '<button class="chap" data-a="veille-go" data-v="' + esc(id) + '|' + esc(c.id) + '"><span>' + esc(c.nom) + '</span><em>⏱️ 15</em></button>').join('') + '</div></main>');
  }
  function lancer(id, chap){
    const A = api();
    const copie = x => Object.assign({}, x, { faux:x.faux.map(f => Object.assign({}, f)) });
    const erreurs = carnetDe(id).slice(-15).map(copie);
    const anglais = /^gb-/.test(id) && M.gb, serie = anglais ? M.gb.serie(id, chap, 40) : id === 'maths' ? A.serieMaths(40) : A.serieMatiere(id, chap, 40);
    const liste = erreurs.concat(serie.filter(q => !erreurs.some(e => e.enonce === q.enonce && e.bon === q.bon)));
    if(!liste.length) return ecranChapitre(id);
    A.questionsGo(liste, { titre:anglais ? '⏱️ Night before the test' : tx('⏱️ Veille de contrôle'), retour:'matieres', lang:anglais ? 'en' : 'fr', sujet:id, prof:id === 'maths', finA:Date.now() + DUREE, fin:z => fin(z, id) });
  }
  function fin(z, id){
    const A = api(), faites = Math.min(z.i, z.liste.length) /* « Suivant » a déjà avancé z.i */, note = faites ? Math.round(20 * z.bonnes / faites * 2) / 2 : 0;
    A.J().plumes += z.bonnes; A.garder();
    if(/^gb-/.test(id)){ const pc = faites ? Math.round(100 * z.bonnes / faites) : 0;
      return A.poser(A.barre('matieres') + '<main class="centre" lang="en"><div class="ami-moyen">' + A.ami(pc >= 60 ? 'fete' : 'malin') + '</div><h2>⏱️ Night before the test</h2><p class="note-examen">' + pc + '%</p>' +
        '<p>Time’s up! ' + z.bonnes + ' right out of ' + faites + '.</p><p>' + (pc >= 60 ? 'Ready for tomorrow. Sleep well! 😴' : 'Ten more minutes on your mistakes tomorrow morning and you’re there. 💪') + '</p>' +
        '<div class="actions serrees"><button class="moyen plein" data-a="veille-matiere" data-v="' + A.esc(id) + '">🔁 Another one</button></div></main>'); }
    A.poser(A.barre('matieres') + '<main class="centre"><div class="ami-moyen">' + A.ami(note >= 12 ? 'fete' : 'malin') + '</div><h2>' + tx('⏱️ Veille de contrôle') + '</h2>' +
      '<p class="note-examen">' + A.esc(tx('Note : {0} / 20', String(note).replace('.', ','))) + '</p><p>' + A.esc(tx('Temps écoulé ! {0} bonne(s) réponse(s) sur {1}.', z.bonnes, faites)) + '</p>' +
      '<p>' + tx(note >= 12 ? 'Prêt pour demain. Dors bien ! 😴' : 'Encore 10 minutes demain matin sur les erreurs, et ça passe. 💪') + '</p>' +
      '<div class="actions serrees"><button class="moyen plein" data-a="veille-matiere" data-v="' + A.esc(id) + '">' + tx('🔁 Une autre veille') + '</button></div></main>');
  }
  Object.assign(M.actions, {
    'veille': () => ecranMatiere(),
    'veille-matiere': v => v === 'maths' || (window.MATIERES && MATIERES.trouver(v)) || (window.ENGLAND && ENGLAND.trouver(v)) ? ecranChapitre(v) : ecranMatiere(),
    'veille-go': v => { const [id, c] = String(v).split('|'); return lancer(id, c || 'melange'); }
  });
  M.veille = { DUREE, lancer };
})();
