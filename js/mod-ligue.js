// Ami des mots — v6.0 : la ligue de la semaine entre potes (serveur-php/ligue.php).
// Chaque bonne réponse (mots, anglais, maths, matières…) = 1 point. Le classement repart à zéro chaque lundi.
// Pas de compte : un code de groupe, un pseudo (filtré), un jeton d'appareil au hasard. Rien d'autre n'est envoyé.
(function(){
  'use strict';
  const M = window.AMI_MODULES; if(!M) return;
  M.textes({
    '🏆 Ligue de la semaine': ['🏆 League of the week', '🏆 Liga de la semana', '🏆 Liga der Woche', '🏆 Lega della settimana', '🏆 Liga da semana'],
    'Entre potes : chaque bonne réponse = 1 point, le classement repart à zéro le lundi': ['With friends: every right answer = 1 point, the ranking resets on Monday', 'Entre amigos: cada respuesta correcta = 1 punto, la clasificación se reinicia el lunes', 'Unter Freunden: jede richtige Antwort = 1 Punkt, die Tabelle startet montags neu', 'Tra amici: ogni risposta giusta = 1 punto, la classifica riparte il lunedì', 'Entre amigos: cada resposta certa = 1 ponto, a classificação recomeça à segunda'],
    'La ligue arrive avec le serveur du jeu.': ['The league comes with the game server.', 'La liga llega con el servidor del juego.', 'Die Liga kommt mit dem Spielserver.', 'La lega arriva con il server del gioco.', 'A liga chega com o servidor do jogo.'],
    'Ton pseudo (pas ton vrai nom)': ['Your nickname (not your real name)', 'Tu apodo (no tu nombre real)', 'Dein Spitzname (nicht dein echter Name)', 'Il tuo soprannome (non il tuo vero nome)', 'A tua alcunha (não o teu nome verdadeiro)'],
    'Nom de la ligue': ['League name', 'Nombre de la liga', 'Name der Liga', 'Nome della lega', 'Nome da liga'],
    'Créer une ligue': ['Create a league', 'Crear una liga', 'Liga gründen', 'Crea una lega', 'Criar uma liga'],
    'Code de la ligue': ['League code', 'Código de la liga', 'Liga-Code', 'Codice della lega', 'Código da liga'],
    'Rejoindre': ['Join', 'Unirse', 'Beitreten', 'Entra', 'Entrar'],
    'Ce pseudo n’est pas accepté : 2 à 16 lettres ou chiffres, rien de méchant.': ['This nickname isn’t accepted: 2 to 16 letters or digits, nothing mean.', 'Este apodo no se acepta: de 2 a 16 letras o cifras, nada feo.', 'Dieser Spitzname geht nicht: 2 bis 16 Buchstaben oder Ziffern, nichts Gemeines.', 'Questo soprannome non va: da 2 a 16 lettere o cifre, niente di cattivo.', 'Esta alcunha não é aceite: 2 a 16 letras ou números, nada de mau.'],
    'Code inconnu.': ['Unknown code.', 'Código desconocido.', 'Unbekannter Code.', 'Codice sconosciuto.', 'Código desconhecido.'],
    'Ce pseudo est déjà pris dans cette ligue.': ['This nickname is already taken in this league.', 'Este apodo ya está cogido en esta liga.', 'Dieser Spitzname ist in dieser Liga schon vergeben.', 'Questo soprannome è già preso in questa lega.', 'Esta alcunha já está ocupada nesta liga.'],
    'La ligue est pleine (40 joueurs).': ['The league is full (40 players).', 'La liga está llena (40 jugadores).', 'Die Liga ist voll (40 Spieler).', 'La lega è piena (40 giocatori).', 'A liga está cheia (40 jogadores).'],
    'Pas de connexion : réessaie plus tard.': ['No connection: try again later.', 'Sin conexión: inténtalo más tarde.', 'Keine Verbindung: Versuch es später noch mal.', 'Nessuna connessione: riprova più tardi.', 'Sem ligação: tenta mais tarde.'],
    'Classement de la semaine': ['This week’s ranking', 'Clasificación de la semana', 'Tabelle der Woche', 'Classifica della settimana', 'Classificação da semana'],
    'Pas encore de points cette semaine. Joue pour ouvrir le score !': ['No points yet this week. Play to open the scoring!', 'Aún no hay puntos esta semana. ¡Juega para abrir el marcador!', 'Diese Woche noch keine Punkte. Spiel, um loszulegen!', 'Ancora nessun punto questa settimana. Gioca per sbloccare il punteggio!', 'Ainda não há pontos esta semana. Joga para abrir o marcador!'],
    'Champion de la semaine dernière : {0} ({1} points) 👑': ['Last week’s champion: {0} ({1} points) 👑', 'Campeón de la semana pasada: {0} ({1} puntos) 👑', 'Champion der letzten Woche: {0} ({1} Punkte) 👑', 'Campione della settimana scorsa: {0} ({1} punti) 👑', 'Campeão da semana passada: {0} ({1} pontos) 👑'],
    '📤 Inviter des potes': ['📤 Invite friends', '📤 Invitar a amigos', '📤 Freunde einladen', '📤 Invita amici', '📤 Convidar amigos'],
    '🔄 Actualiser': ['🔄 Refresh', '🔄 Actualizar', '🔄 Aktualisieren', '🔄 Aggiorna', '🔄 Atualizar'],
    '🚪 Quitter la ligue': ['🚪 Leave the league', '🚪 Salir de la liga', '🚪 Liga verlassen', '🚪 Lascia la lega', '🚪 Sair da liga'],
    'Rejoins ma ligue sur Ami des mots ! Code : {0}': ['Join my league on Ami des mots! Code: {0}', '¡Únete a mi liga en Ami des mots! Código: {0}', 'Komm in meine Liga bei Ami des mots! Code: {0}', 'Entra nella mia lega su Ami des mots! Codice: {0}', 'Junta-te à minha liga no Ami des mots! Código: {0}'],
    '📋 Lien copié !': ['📋 Link copied!', '📋 ¡Enlace copiado!', '📋 Link kopiert!', '📋 Link copiato!', '📋 Link copiado!'],
    'Toi': ['You', 'Tú', 'Du', 'Tu', 'Tu'],
    'Ta ligue : {0} · code {1}': ['Your league: {0} · code {1}', 'Tu liga: {0} · código {1}', 'Deine Liga: {0} · Code {1}', 'La tua lega: {0} · codice {1}', 'A tua liga: {0} · código {1}'],
    'ou': ['or', 'o', 'oder', 'o', 'ou']
  });
  const tx = M.tx, api = () => M.api;
  const etat = () => { const b = api().base(); const l = b.ligue; return l && /^[A-HJ-NP-Z2-9]{6}$/.test(l.code) ? l : null; };
  let enAttente = 0, minuteur = null, dernier = null;
  async function envoyerPoints(){
    clearTimeout(minuteur); minuteur = null;
    const l = etat(); if(!l || !enAttente) return;
    const n = Math.min(60, enAttente); enAttente -= n;
    const r = await M.envoyer('ligue.php', { action:'points', code:l.code, jeton:M.jeton(), pseudo:l.pseudo, points:n });
    if(!r.ok && r.statut === 0) enAttente += n;   // pas de réseau : on garde les points pour plus tard
    if(r.d && r.d.erreur === 'inconnue'){ delete api().base().ligue; api().garder(); }
  }
  // Chaque bonne réponse compte ; envoi groupé (toutes les 10 réponses, ou 30 s après la dernière).
  M.hooks.reponse.push(ok => { if(!ok || !etat()) return; enAttente++; if(enAttente >= 10) return envoyerPoints(); clearTimeout(minuteur); minuteur = setTimeout(envoyerPoints, 30000); });
  M.cartes.battle.push(() => M.carte('ligue', '', '🏆', tx('🏆 Ligue de la semaine').replace(/^🏆 /, ''), tx('Entre potes : chaque bonne réponse = 1 point, le classement repart à zéro le lundi')));
  M.cartes.accueil.push(() => etat() && dernier && dernier.moi ? '<p class="ligue-rappel"><button class="lien" data-a="ligue">🏆 ' + api().esc(dernier.nom) + ' · #' + dernier.moi.rang + ' · ' + dernier.moi.points + ' pts</button></p>' : '');
  function ecran(msg, prefill){
    const A = api(), esc = A.esc, l = etat();
    if(!M.serveur('ligue.php')) return A.poser(A.barre('potes') + '<main class="coin-anglais ligue"><h2>' + tx('🏆 Ligue de la semaine') + '</h2><p>' + tx('La ligue arrive avec le serveur du jeu.') + '</p></main>');
    if(!l){
      const nom = esc(A.J().nom || '');
      return A.poser(A.barre('potes') + '<main class="coin-anglais ligue"><h2>' + tx('🏆 Ligue de la semaine') + '</h2><p class="pieges-intro">' + tx('Entre potes : chaque bonne réponse = 1 point, le classement repart à zéro le lundi') + '</p>' +
        '<p><label>' + tx('Ton pseudo (pas ton vrai nom)') + ' <input id="ligue-pseudo" class="champ-pseudo" maxlength="16" value="' + nom + '"></label></p>' +
        '<div class="cartes-anglais"><div class="carte-anglais"><span class="ic">🔑</span><strong>' + tx('Code de la ligue') + '</strong><input id="ligue-code" class="champ-code" maxlength="6" autocapitalize="characters" value="' + esc(prefill || '') + '" aria-label="' + tx('Code de la ligue') + '"><button class="moyen plein" data-a="ligue-rejoindre">' + tx('Rejoindre') + '</button></div>' +
        '<div class="carte-anglais"><span class="ic">✨</span><strong>' + tx('Créer une ligue') + '</strong><input id="ligue-nom" maxlength="30" aria-label="' + tx('Nom de la ligue') + '" placeholder="' + tx('Nom de la ligue') + '"><button class="moyen" data-a="ligue-creer">' + tx('Créer une ligue') + '</button></div></div>' +
        '<p class="aide" id="ligue-msg" role="status">' + esc(msg || '') + '</p></main>');
    }
    A.poser(A.barre('potes') + '<main class="coin-anglais ligue"><h2>' + tx('🏆 Ligue de la semaine') + '</h2><p class="pieges-intro">' + esc(tx('Ta ligue : {0} · code {1}', l.nom, l.code)) + '</p>' +
      '<h3>' + tx('Classement de la semaine') + '</h3><ol class="ligue-classement" id="ligue-liste"><li>…</li></ol><p class="petit" id="ligue-avant"></p>' +
      '<div class="actions serrees"><button class="moyen plein" data-a="ligue-inviter">' + tx('📤 Inviter des potes') + '</button><button class="moyen" data-a="ligue-maj">' + tx('🔄 Actualiser') + '</button><button class="moyen" data-a="ligue-quitter">' + tx('🚪 Quitter la ligue') + '</button></div>' +
      '<p class="aide" id="ligue-msg" role="status">' + esc(msg || '') + '</p></main>');
    classement();
  }
  async function classement(){
    await envoyerPoints();
    const l = etat(), A = api(); if(!l) return;
    const r = await M.envoyer('ligue.php', { action:'classement', code:l.code }), z = document.getElementById('ligue-liste'); if(!z) return;
    if(!r.ok || !r.d){ z.innerHTML = '<li>' + tx('Pas de connexion : réessaie plus tard.') + '</li>'; return; }
    const c = r.d.classement || [];
    dernier = { nom:l.nom, moi:null };
    c.forEach((x, i) => { if(x.pseudo === l.pseudo) dernier.moi = { rang:i + 1, points:x.points }; });
    z.innerHTML = c.filter(x => x.points > 0).length ? c.map((x, i) => '<li class="' + (x.pseudo === l.pseudo ? 'moi' : '') + '"><span>' + (['🥇', '🥈', '🥉'][i] || (i + 1) + '.') + ' ' + A.esc(x.pseudo) + (x.pseudo === l.pseudo ? ' (' + tx('Toi') + ')' : '') + '</span><strong>' + (Math.floor(Number(x.points)) || 0) + '</strong></li>').join('')
      : '<li>' + tx('Pas encore de points cette semaine. Joue pour ouvrir le score !') + '</li>';
    const av = document.getElementById('ligue-avant'); if(av && r.d.champion_avant) av.textContent = tx('Champion de la semaine dernière : {0} ({1} points) 👑', r.d.champion_avant.pseudo, r.d.champion_avant.points);
  }
  const msgErreur = e => ({ pseudo:'Ce pseudo n’est pas accepté : 2 à 16 lettres ou chiffres, rien de méchant.', inconnue:'Code inconnu.', code:'Code inconnu.', pseudo_pris:'Ce pseudo est déjà pris dans cette ligue.', pleine:'La ligue est pleine (40 joueurs).' })[e] || 'Pas de connexion : réessaie plus tard.';
  async function rejoindre(code, nomLigue){
    const A = api(), m = document.getElementById('ligue-msg'), p = M.pseudoOk((document.getElementById('ligue-pseudo') || {}).value);
    if(!p){ if(m) m.textContent = tx(msgErreur('pseudo')); return; }
    const r = await M.envoyer('ligue.php', { action:'rejoindre', code, jeton:M.jeton(), pseudo:p });
    if(!r.ok || !r.d || !r.d.ok){ if(m) m.textContent = tx(msgErreur(r.d && r.d.erreur)); return; }
    A.base().ligue = { code, nom:r.d.nom || nomLigue || code, pseudo:p }; A.garder(); ecran();
  }
  Object.assign(M.actions, {
    'ligue': () => ecran(),
    'ligue-rejoindre': () => { const c = String((document.getElementById('ligue-code') || {}).value || '').toUpperCase().replace(/[^A-Z0-9]/g, '');
      if(!/^[A-HJ-NP-Z2-9]{6}$/.test(c)){ const m = document.getElementById('ligue-msg'); if(m) m.textContent = tx('Code inconnu.'); return; } return rejoindre(c); },
    'ligue-creer': async () => { const m = document.getElementById('ligue-msg');
      if(!M.pseudoOk((document.getElementById('ligue-pseudo') || {}).value)){ if(m) m.textContent = tx(msgErreur('pseudo')); return; }
      const nom = String((document.getElementById('ligue-nom') || {}).value || '').trim().slice(0, 30);
      if(nom && window.JUGE && !JUGE.juger(nom).ok){ if(m) m.textContent = tx(msgErreur('pseudo')); return; }
      const r = await M.envoyer('ligue.php', { action:'creer', nom }); if(!r.ok || !r.d || !r.d.code){ if(m) m.textContent = tx(msgErreur()); return; }
      return rejoindre(r.d.code, r.d.nom); },
    'ligue-maj': () => classement(),
    'ligue-quitter': async () => { const l = etat(); if(!l) return ecran(); await M.envoyer('ligue.php', { action:'quitter', code:l.code, jeton:M.jeton() }); delete api().base().ligue; api().garder(); dernier = null; ecran(); },
    'ligue-inviter': async () => { const l = etat(); if(!l) return; const lien = location.origin + location.pathname + '?ligue=' + l.code, txt = tx('Rejoins ma ligue sur Ami des mots ! Code : {0}', l.code), m = document.getElementById('ligue-msg');
      try{ if(navigator.share){ await navigator.share({ title:'Ami des mots', text:txt, url:lien }); return; } await navigator.clipboard.writeText(txt + ' ' + lien); if(m) m.textContent = tx('📋 Lien copié !'); }catch(e){ if(m) m.textContent = txt + ' ' + lien; } }
  });
  // Lien d'invitation ?ligue=CODE : ouvre l'écran avec le code déjà rempli.
  M.auDemarrage = (M.auDemarrage || []).concat(() => { const c = new URLSearchParams(location.search).get('ligue'); if(c && /^[A-HJ-NP-Z2-9]{6}$/i.test(c) && !etat()) setTimeout(() => ecran('', c.toUpperCase()), 50); });
  M.ligue = { envoyerPoints, get enAttente(){ return enAttente; } };
})();
