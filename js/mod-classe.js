// Ami des mots — v6.0 : défi de classe (serveur-php/classe.php).
// Le prof crée un défi : toute la classe joue la même série (même graine), puis il voit les scores avec sa clé.
// Élèves : un pseudo ou un prénom (pas de nom de famille), aucun compte.
(function(){
  'use strict';
  const M = window.AMI_MODULES; if(!M) return;
  M.textes({
    '👩‍🏫 Défi de classe': ['👩‍🏫 Class challenge', '👩‍🏫 Reto de clase', '👩‍🏫 Klassen-Challenge', '👩‍🏫 Sfida di classe', '👩‍🏫 Desafio de turma'],
    'Le prof lance une série, toute la classe joue la même': ['The teacher sets a quiz, the whole class plays the same one', 'El profe lanza una serie y toda la clase juega la misma', 'Die Lehrkraft startet eine Runde, die ganze Klasse spielt dieselbe', 'Il prof lancia una serie, tutta la classe gioca la stessa', 'O professor lança uma série e a turma toda joga a mesma'],
    'Le défi de classe arrive avec le serveur du jeu.': ['Class challenges come with the game server.', 'El reto de clase llega con el servidor del juego.', 'Die Klassen-Challenge kommt mit dem Spielserver.', 'La sfida di classe arriva con il server del gioco.', 'O desafio de turma chega com o servidor do jogo.'],
    '🎒 Je suis élève': ['🎒 I’m a student', '🎒 Soy alumno', '🎒 Ich bin Schüler', '🎒 Sono uno studente', '🎒 Sou aluno'],
    '👩‍🏫 Je suis prof': ['👩‍🏫 I’m a teacher', '👩‍🏫 Soy profe', '👩‍🏫 Ich bin Lehrkraft', '👩‍🏫 Sono un prof', '👩‍🏫 Sou professor'],
    'Code du défi': ['Challenge code', 'Código del reto', 'Challenge-Code', 'Codice della sfida', 'Código do desafio'],
    'Ton pseudo ou ton prénom (pas de nom de famille)': ['Your nickname or first name (no surname)', 'Tu apodo o tu nombre (sin apellido)', 'Dein Spitzname oder Vorname (kein Nachname)', 'Il tuo soprannome o nome (niente cognome)', 'A tua alcunha ou nome próprio (sem apelido)'],
    '▶ Jouer le défi': ['▶ Play the challenge', '▶ Jugar el reto', '▶ Challenge spielen', '▶ Gioca la sfida', '▶ Jogar o desafio'],
    'Nom du défi (ex. 4e B · fractions)': ['Challenge name (e.g. Year 8 B · fractions)', 'Nombre del reto (ej. 2.º B · fracciones)', 'Name (z. B. 8b · Brüche)', 'Nome della sfida (es. 2ª B · frazioni)', 'Nome do desafio (ex. 8.º B · frações)'],
    'Matière': ['Subject', 'Asignatura', 'Fach', 'Materia', 'Disciplina'],
    'Niveau': ['Level', 'Nivel', 'Stufe', 'Livello', 'Nível'],
    'Nombre de questions': ['Number of questions', 'Número de preguntas', 'Anzahl der Fragen', 'Numero di domande', 'Número de perguntas'],
    '✨ Créer le défi': ['✨ Create the challenge', '✨ Crear el reto', '✨ Challenge erstellen', '✨ Crea la sfida', '✨ Criar o desafio'],
    'Mes défis de classe': ['My class challenges', 'Mis retos de clase', 'Meine Klassen-Challenges', 'Le mie sfide di classe', 'Os meus desafios de turma'],
    'Donne ce code à la classe : {0}': ['Give this code to the class: {0}', 'Da este código a la clase: {0}', 'Gib der Klasse diesen Code: {0}', 'Dai questo codice alla classe: {0}', 'Dá este código à turma: {0}'],
    'Ta clé de prof (garde-la, elle n’est montrée qu’une fois) : {0}': ['Your teacher key (keep it, it’s shown only once): {0}', 'Tu clave de profe (guárdala, solo se muestra una vez): {0}', 'Dein Lehrkraft-Schlüssel (gut aufheben, er wird nur einmal gezeigt): {0}', 'La tua chiave da prof (conservala, viene mostrata una sola volta): {0}', 'A tua chave de professor (guarda-a, só aparece uma vez): {0}'],
    '📊 Résultats': ['📊 Results', '📊 Resultados', '📊 Ergebnisse', '📊 Risultati', '📊 Resultados'],
    '🔒 Clore le défi': ['🔒 Close the challenge', '🔒 Cerrar el reto', '🔒 Challenge schließen', '🔒 Chiudi la sfida', '🔒 Fechar o desafio'],
    'Personne n’a encore joué.': ['Nobody has played yet.', 'Todavía no ha jugado nadie.', 'Noch hat niemand gespielt.', 'Nessuno ha ancora giocato.', 'Ainda ninguém jogou.'],
    'Moyenne de la classe : {0} / 20 · {1} élève(s)': ['Class average: {0} / 20 · {1} student(s)', 'Media de la clase: {0} / 20 · {1} alumno(s)', 'Klassendurchschnitt: {0} / 20 · {1} Schüler', 'Media della classe: {0} / 20 · {1} studente/i', 'Média da turma: {0} / 20 · {1} aluno(s)'],
    'Code inconnu.': ['Unknown code.', 'Código desconocido.', 'Unbekannter Code.', 'Codice sconosciuto.', 'Código desconhecido.'],
    'Ce défi est clos.': ['This challenge is closed.', 'Este reto está cerrado.', 'Diese Challenge ist geschlossen.', 'Questa sfida è chiusa.', 'Este desafio está fechado.'],
    'Ce pseudo n’est pas accepté.': ['This nickname isn’t accepted.', 'Este apodo no se acepta.', 'Dieser Spitzname geht nicht.', 'Questo soprannome non va.', 'Esta alcunha não é aceite.'],
    'Pas de connexion : réessaie plus tard.': ['No connection: try again later.', 'Sin conexión: inténtalo más tarde.', 'Keine Verbindung: Versuch es später noch mal.', 'Nessuna connessione: riprova più tardi.', 'Sem ligação: tenta mais tarde.'],
    '✅ Score envoyé au prof : {0} / {1}': ['✅ Score sent to the teacher: {0} / {1}', '✅ Puntuación enviada al profe: {0} / {1}', '✅ Ergebnis an die Lehrkraft gesendet: {0} / {1}', '✅ Punteggio inviato al prof: {0} / {1}', '✅ Pontuação enviada ao professor: {0} / {1}'],
    '⚠️ Score pas envoyé (connexion). Rejoue plus tard : seul le meilleur compte.': ['⚠️ Score not sent (connection). Play again later: only the best one counts.', '⚠️ Puntuación no enviada (conexión). Vuelve a jugar más tarde: solo cuenta la mejor.', '⚠️ Ergebnis nicht gesendet (Verbindung). Spiel später noch mal: Nur das beste zählt.', '⚠️ Punteggio non inviato (connessione). Rigioca più tardi: conta solo il migliore.', '⚠️ Pontuação não enviada (ligação). Joga mais tarde: só conta a melhor.']
  });
  const tx = M.tx, api = () => M.api;
  const NIVEAUX = ['6e', '5e', '4e', '3e', '2nde', '1re', 'Tle'];
  const carte = () => M.carte('classe', '', '👩‍🏫', tx('👩‍🏫 Défi de classe').replace(/^👩‍🏫 /, ''), tx('Le prof lance une série, toute la classe joue la même'));
  M.cartes.matiere.push(carte); M.cartes.battle.push(carte);
  const msg = t => { const m = document.getElementById('classe-msg'); if(m) m.textContent = t; };
  const valeur = id => String((document.getElementById(id) || {}).value || '').trim();
  const mesDefis = () => { const b = api().base(); if(!Array.isArray(b.classesProf)) b.classesProf = []; return b.classesProf; };
  const matieres = () => [['maths', '🔢 Maths']].concat((window.MATIERES ? MATIERES.LISTE : []).map(m => [m.id, m.ic + ' ' + m.nom]));
  function ecran(prefill){
    const A = api(), esc = A.esc;
    if(!M.serveur('classe.php')) return A.poser(A.barre('matieres') + '<main class="coin-anglais"><h2>' + tx('👩‍🏫 Défi de classe') + '</h2><p>' + tx('Le défi de classe arrive avec le serveur du jeu.') + '</p></main>');
    const defis = mesDefis();
    A.poser(A.barre('matieres') + '<main class="coin-anglais classe"><h2>' + tx('👩‍🏫 Défi de classe') + '</h2>' +
      '<section class="domaine"><h3>' + tx('🎒 Je suis élève') + '</h3><p><label>' + tx('Code du défi') + ' <input id="classe-code" class="champ-code" maxlength="6" autocapitalize="characters" value="' + esc(prefill || '') + '"></label></p>' +
      '<p><label>' + tx('Ton pseudo ou ton prénom (pas de nom de famille)') + ' <input id="classe-pseudo" class="champ-pseudo" maxlength="20" value="' + esc(A.J().nom || '') + '"></label></p>' +
      '<p><button class="gros" data-a="classe-jouer">' + tx('▶ Jouer le défi') + '</button></p></section>' +
      '<section class="domaine"><h3>' + tx('👩‍🏫 Je suis prof') + '</h3><p><label>' + tx('Nom du défi (ex. 4e B · fractions)') + ' <input id="classe-nom" maxlength="40"></label></p>' +
      '<p><label>' + tx('Matière') + ' <select id="classe-matiere">' + matieres().map(([k, l]) => '<option value="' + esc(k) + '">' + esc(l) + '</option>').join('') + '</select></label> ' +
      '<label>' + tx('Niveau') + ' <select id="classe-niveau">' + NIVEAUX.map(n => '<option' + (n === A.etatMatieres().niveau ? ' selected' : '') + '>' + n + '</option>').join('') + '</select></label> ' +
      '<label>' + tx('Nombre de questions') + ' <select id="classe-n"><option>10</option><option>15</option><option>20</option></select></label></p>' +
      '<p><button class="moyen plein" data-a="classe-creer">' + tx('✨ Créer le défi') + '</button></p>' +
      (defis.length ? '<h3>' + tx('Mes défis de classe') + '</h3><div class="liste-chap">' + defis.slice(-12).reverse().map(d => '<button class="chap" data-a="classe-resultats" data-v="' + esc(d.code) + '"><span>' + esc(d.nom) + ' · ' + esc(d.code) + '</span><em>' + tx('📊 Résultats') + '</em></button>').join('') + '</div>' : '') + '</section>' +
      '<p class="aide" id="classe-msg" role="status" aria-live="polite"></p></main>');
  }
  function serie(info){
    if(info.matiere === 'maths') return window.MATHS ? MATHS.serie(info.niveau, info.n, info.graine, 'taquin') : [];
    return window.MATIERES ? MATIERES.serie(info.matiere, 'melange', info.niveau, info.n, info.graine, 'taquin') : [];
  }
  async function jouer(){
    const A = api(), code = valeur('classe-code').toUpperCase().replace(/[^A-Z0-9]/g, ''), pseudo = M.pseudoOk(valeur('classe-pseudo').slice(0, 16));
    if(!/^[A-HJ-NP-Z2-9]{6}$/.test(code)) return msg(tx('Code inconnu.'));
    if(!pseudo) return msg(tx('Ce pseudo n’est pas accepté.'));
    const r = await M.envoyer('classe.php', { action:'infos', code });
    if(!r.ok || !r.d) return msg(tx(r.statut === 404 || r.statut === 400 ? 'Code inconnu.' : 'Pas de connexion : réessaie plus tard.'));
    if(!r.d.ouvert) return msg(tx('Ce défi est clos.'));
    const liste = serie(r.d).slice(0, r.d.n); if(!liste.length) return msg(tx('Code inconnu.'));
    A.questionsGo(liste, { titre:'👩‍🏫 ' + r.d.nom, retour:'matieres', lang:'fr', prof:r.d.matiere === 'maths', sujet:r.d.matiere, fin:z => fin(z, code, pseudo) });
  }
  async function fin(z, code, pseudo){
    const A = api(), n = z.liste.length;
    A.J().plumes += z.bonnes; A.garder();
    A.poser(A.barre('matieres') + '<main class="centre"><div class="ami-moyen">' + A.ami(z.bonnes / n >= .7 ? 'fete' : 'malin') + '</div><h2>' + tx('👩‍🏫 Défi de classe') + '</h2><p class="score">' + z.bonnes + ' / ' + n + '</p><p class="aide" id="classe-msg" role="status">…</p></main>');
    const r = await M.envoyer('classe.php', { action:'score', code, jeton:M.jeton(), pseudo, bonnes:z.bonnes, total:n });
    msg(r.ok ? tx('✅ Score envoyé au prof : {0} / {1}', z.bonnes, n) : r.d && r.d.erreur === 'ferme' ? tx('Ce défi est clos.') : tx('⚠️ Score pas envoyé (connexion). Rejoue plus tard : seul le meilleur compte.'));
  }
  async function creer(){
    const nom = valeur('classe-nom').slice(0, 40);
    if(nom && window.JUGE && !JUGE.juger(nom).ok) return msg(tx('Ce pseudo n’est pas accepté.'));
    const r = await M.envoyer('classe.php', { action:'creer', nom, matiere:valeur('classe-matiere'), niveau:valeur('classe-niveau'), n:+valeur('classe-n') || 10 });
    if(!r.ok || !r.d || !r.d.code) return msg(tx('Pas de connexion : réessaie plus tard.'));
    mesDefis().push({ code:r.d.code, cle:r.d.cle, nom:r.d.nom }); api().garder();
    resultats(r.d.code, tx('Donne ce code à la classe : {0}', r.d.code) + ' · ' + tx('Ta clé de prof (garde-la, elle n’est montrée qu’une fois) : {0}', r.d.cle));
  }
  async function resultats(code, intro){
    const A = api(), esc = A.esc, d = mesDefis().find(x => x.code === code); if(!d) return ecran();
    A.poser(A.barre('matieres') + '<main class="coin-anglais classe"><h2>📊 ' + esc(d.nom) + ' · ' + esc(code) + '</h2>' + (intro ? '<p class="aide">' + esc(intro) + '</p>' : '') +
      '<p class="petit">' + esc(location.origin + location.pathname + '?classe=' + code) + '</p><ol class="ligue-classement" id="classe-liste"><li>…</li></ol><p id="classe-moyenne" class="pieges-intro"></p>' +
      '<div class="actions serrees"><button class="moyen" data-a="classe-resultats" data-v="' + esc(code) + '">🔄</button><button class="moyen" data-a="classe-fermer" data-v="' + esc(code) + '">' + tx('🔒 Clore le défi') + '</button><button class="moyen" data-a="classe">↩</button></div>' +
      '<p class="aide" id="classe-msg" role="status"></p></main>');
    const r = await M.envoyer('classe.php', { action:'resultats', code, cle:d.cle }), z = document.getElementById('classe-liste'); if(!z) return;
    if(!r.ok || !r.d){ z.innerHTML = '<li>' + tx('Pas de connexion : réessaie plus tard.') + '</li>'; return; }
    const e = r.d.eleves || [];
    z.innerHTML = e.length ? e.map(x => '<li><span>' + esc(x.pseudo) + '</span><strong>' + x.bonnes + ' / ' + x.total + '</strong></li>').join('') : '<li>' + tx('Personne n’a encore joué.') + '</li>';
    if(e.length){ const moy = e.reduce((t, x) => t + 20 * x.bonnes / x.total, 0) / e.length; const m = document.getElementById('classe-moyenne'); if(m) m.textContent = tx('Moyenne de la classe : {0} / 20 · {1} élève(s)', (Math.round(moy * 2) / 2).toString().replace('.', ','), e.length); }
  }
  Object.assign(M.actions, {
    'classe': () => ecran(),
    'classe-jouer': () => jouer(),
    'classe-creer': () => creer(),
    'classe-resultats': v => resultats(v),
    'classe-fermer': async v => { const d = mesDefis().find(x => x.code === v); if(d) await M.envoyer('classe.php', { action:'fermer', code:v, cle:d.cle }); return resultats(v); }
  });
  M.auDemarrage = (M.auDemarrage || []).concat(() => { const c = new URLSearchParams(location.search).get('classe'); if(c && /^[A-HJ-NP-Z2-9]{6}$/i.test(c)) setTimeout(() => ecran(c.toUpperCase()), 60); });
})();
