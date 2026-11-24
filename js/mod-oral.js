// Ami des mots — v6.0 : oral d'anglais noté. Plumo dit une phrase, le joueur la répète, la reconnaissance vocale
// du navigateur ou du téléphone dit ce qu'elle a compris, et Plumo note la compréhension (en %).
// Désactivé tant qu'un parent ne l'a pas autorisé dans l'Espace parents : la reconnaissance vocale est faite par le service
// du navigateur ou du système (souvent Google ou Apple), qui peut recevoir la voix le temps de la reconnaissance.
// Ami des mots, lui, ne garde et n'envoie aucun son ; seul le texte reconnu sert à la note, puis il est oublié.
(function(){
  'use strict';
  const M = window.AMI_MODULES; if(!M) return;
  M.textes({
    '🎙️ Oral noté': ['🎙️ Graded speaking', '🎙️ Oral con nota', '🎙️ Bewertetes Sprechen', '🎙️ Orale con voto', '🎙️ Oral com nota'],
    'Répète 5 phrases : Plumo dit si on te comprend': ['Repeat 5 sentences: Plumo says if people understand you', 'Repite 5 frases: Plumo dice si se te entiende', 'Sprich 5 Sätze nach: Plumo sagt, ob man dich versteht', 'Ripeti 5 frasi: Plumo dice se ti si capisce', 'Repete 5 frases: o Plumo diz se te percebem'],
    'Un parent doit d’abord l’autoriser dans l’Espace parents.': ['A parent must first allow it in the Parents’ area.', 'Un padre o madre debe autorizarlo antes en el Espacio para padres.', 'Ein Elternteil muss es zuerst im Elternbereich erlauben.', 'Un genitore deve prima autorizzarlo nell’Area genitori.', 'Um dos pais tem de o autorizar primeiro no Espaço dos pais.'],
    'La reconnaissance vocale n’est pas disponible ici. Essaie Chrome ou l’appli.': ['Speech recognition isn’t available here. Try Chrome or the app.', 'El reconocimiento de voz no está disponible aquí. Prueba Chrome o la app.', 'Spracherkennung ist hier nicht verfügbar. Probier Chrome oder die App.', 'Il riconoscimento vocale non è disponibile qui. Prova Chrome o l’app.', 'O reconhecimento de voz não está disponível aqui. Experimenta o Chrome ou a app.'],
    '🔊 Écouter Plumo': ['🔊 Listen to Plumo', '🔊 Escuchar a Plumo', '🔊 Plumo anhören', '🔊 Ascolta Plumo', '🔊 Ouvir o Plumo'],
    '🎤 À moi !': ['🎤 My turn!', '🎤 ¡Me toca!', '🎤 Ich bin dran!', '🎤 Tocca a me!', '🎤 É a minha vez!'],
    '⏺ Je t’écoute…': ['⏺ Listening…', '⏺ Te escucho…', '⏺ Ich höre zu…', '⏺ Ti ascolto…', '⏺ Estou a ouvir…'],
    'Compris : « {0} »': ['Understood: « {0} »', 'Entendido: « {0} »', 'Verstanden: « {0} »', 'Capito: « {0} »', 'Percebido: « {0} »'],
    'Je n’ai rien entendu. Réessaie, plus près du micro.': ['I didn’t hear anything. Try again, closer to the mic.', 'No he oído nada. Inténtalo otra vez, más cerca del micro.', 'Ich habe nichts gehört. Versuch es noch mal, näher am Mikro.', 'Non ho sentito niente. Riprova, più vicino al microfono.', 'Não ouvi nada. Tenta outra vez, mais perto do microfone.'],
    'Compris à {0} % ': ['{0}% understood ', 'Entendido al {0} % ', 'Zu {0} % verstanden ', 'Capito al {0}% ', 'Percebido a {0} % '],
    'Phrase suivante →': ['Next sentence →', 'Siguiente frase →', 'Nächster Satz →', 'Frase successiva →', 'Próxima frase →'],
    'Oral terminé : {0} / 20': ['Speaking done: {0} / 20', 'Oral terminado: {0} / 20', 'Sprechen fertig: {0} / 20', 'Orale finito: {0} / 20', 'Oral terminado: {0} / 20'],
    'Un Anglais te comprendrait sans problème. 🇬🇧👏': ['An English speaker would understand you easily. 🇬🇧👏', 'Un inglés te entendería sin problema. 🇬🇧👏', 'Ein Engländer würde dich problemlos verstehen. 🇬🇧👏', 'Un inglese ti capirebbe senza problemi. 🇬🇧👏', 'Um inglês percebia-te sem problemas. 🇬🇧👏'],
    'On y est presque : réécoute Plumo et articule les fins de mots. 💪': ['Almost there: listen to Plumo again and say the ends of words clearly. 💪', 'Casi: vuelve a escuchar a Plumo y pronuncia bien el final de las palabras. 💪', 'Fast: Hör Plumo noch mal zu und sprich die Wortenden deutlich. 💪', 'Ci siamo quasi: riascolta Plumo e scandisci la fine delle parole. 💪', 'Quase: ouve o Plumo outra vez e articula bem o fim das palavras. 💪'],
    '🎙️ Oral noté (reconnaissance vocale)': ['🎙️ Graded speaking (speech recognition)', '🎙️ Oral con nota (reconocimiento de voz)', '🎙️ Bewertetes Sprechen (Spracherkennung)', '🎙️ Orale con voto (riconoscimento vocale)', '🎙️ Oral com nota (reconhecimento de voz)'],
    'La voix est reconnue par le service du navigateur ou du téléphone (souvent Google ou Apple), qui peut la recevoir le temps de la reconnaissance. Ami des mots ne garde et n’envoie aucun son.': ['The voice is recognised by the browser’s or phone’s service (often Google or Apple), which may receive it during recognition. Ami des mots neither keeps nor sends any sound.', 'La voz la reconoce el servicio del navegador o del teléfono (a menudo Google o Apple), que puede recibirla durante el reconocimiento. Ami des mots no guarda ni envía ningún sonido.', 'Die Stimme wird vom Dienst des Browsers oder Handys erkannt (oft Google oder Apple), der sie dabei erhalten kann. Ami des mots speichert und sendet keinen Ton.', 'La voce è riconosciuta dal servizio del browser o del telefono (spesso Google o Apple), che può riceverla durante il riconoscimento. Ami des mots non conserva né invia alcun suono.', 'A voz é reconhecida pelo serviço do navegador ou do telemóvel (muitas vezes Google ou Apple), que a pode receber durante o reconhecimento. O Ami des mots não guarda nem envia nenhum som.'],
    'Autorisé': ['Allowed', 'Autorizado', 'Erlaubt', 'Autorizzato', 'Autorizado'],
    'Non autorisé': ['Not allowed', 'No autorizado', 'Nicht erlaubt', 'Non autorizzato', 'Não autorizado']
  });
  const tx = M.tx, api = () => M.api;
  const Rec = () => window.SpeechRecognition || window.webkitSpeechRecognition || null;
  const accord = () => api().base().oralAccord === true;
  const norm = s => String(s || '').toLowerCase().replace(/[’‘]/g, '\'').replace(/[^a-z0-9' ]+/g, ' ').replace(/\s+/g, ' ').trim();
  // Part des mots de la phrase retrouvés dans l'ordre (plus longue sous-suite commune), en %.
  function score(cible, dit){
    const a = norm(cible).split(' ').filter(Boolean), b = norm(dit).split(' ').filter(Boolean); if(!a.length || !b.length) return 0;
    const t = Array.from({ length:a.length + 1 }, () => new Array(b.length + 1).fill(0));
    for(let i = 1; i <= a.length; i++) for(let j = 1; j <= b.length; j++) t[i][j] = a[i - 1] === b[j - 1] ? t[i - 1][j - 1] + 1 : Math.max(t[i - 1][j], t[i][j - 1]);
    return Math.round(100 * t[a.length][b.length] / Math.max(a.length, b.length * .8));
  }
  let partie = null, ecoute = null;
  M.cartes.anglais.push(() => M.carte('oral', '', '🎙️', tx('🎙️ Oral noté').replace(/^🎙️ /, ''), tx('Répète 5 phrases : Plumo dit si on te comprend')));
  M.cartes.parents.push(() => '<section class="reglage-oral"><div class="reglage"><span><strong>' + tx('🎙️ Oral noté (reconnaissance vocale)') + '</strong><span class="petit">' +
    tx('La voix est reconnue par le service du navigateur ou du téléphone (souvent Google ou Apple), qui peut la recevoir le temps de la reconnaissance. Ami des mots ne garde et n’envoie aucun son.') +
    '</span></span><button class="moyen' + (accord() ? ' plein' : '') + '" data-a="oral-accord" aria-pressed="' + accord() + '">' + tx(accord() ? 'Autorisé' : 'Non autorisé') + '</button></div></section>');
  function ecran(){
    const A = api(), esc = A.esc;
    if(!accord() || !Rec() || !window.PARCOURS) return A.poser(A.barre('anglais') + '<main class="coin-anglais"><h2>' + tx('🎙️ Oral noté') + '</h2><p>' + tx(!accord() ? 'Un parent doit d’abord l’autoriser dans l’Espace parents.' : 'La reconnaissance vocale n’est pas disponible ici. Essaie Chrome ou l’appli.') + '</p></main>');
    const p = partie, ph = p.liste[p.i];
    A.poser(A.barre('anglais') + '<main class="battle-ecran repeter"><p class="piege-cat">' + tx('🎙️ Oral noté') + ' · ' + (p.i + 1) + '/' + p.liste.length + '</p>' +
      '<div class="ami-moyen">' + A.ami('content') + '</div><p class="piege-fr" lang="en">« ' + esc(ph.en) + ' »</p>' + (A.base().ui === 'fr' ? '<p class="petit">🇫🇷 ' + esc(ph.fr) + '</p>' : '') +
      '<div class="actions serrees"><button class="moyen" data-a="oral-ecouter">' + tx('🔊 Écouter Plumo') + '</button><button class="moyen plein micro" data-a="oral-micro">' + tx('🎤 À moi !') + '</button></div>' +
      '<p class="aide" id="oral-msg" role="status" aria-live="polite"></p><p id="oral-suite"></p></main>');
    try{ window.speak(ph.en, 'en'); }catch(e){}
  }
  function micro(){
    const R = Rec(), p = partie; if(!R || !p) return; const ph = p.liste[p.i], m = document.getElementById('oral-msg');
    try{ if(ecoute) ecoute.abort(); }catch(e){}
    const r = ecoute = new R(); r.lang = 'en-GB'; r.interimResults = false; r.maxAlternatives = 3; r.continuous = false;
    if(m) m.textContent = tx('⏺ Je t’écoute…');
    let fini = false;
    r.onresult = ev => { fini = true; const alts = Array.from(ev.results[0] || []).map(x => x.transcript); let best = 0, dit = alts[0] || '';
      for(const a of alts){ const s = score(ph.en, a); if(s > best){ best = s; dit = a; } }
      best = Math.min(100, best); p.notes[p.i] = Math.max(p.notes[p.i] || 0, best);
      if(m) m.textContent = tx('Compris à {0} % ', best) + (best >= 85 ? '🌟🌟🌟' : best >= 60 ? '🌟🌟' : best >= 30 ? '🌟' : '😅') + ' · ' + tx('Compris : « {0} »', dit);
      const s = document.getElementById('oral-suite'); if(s) s.innerHTML = '<button class="moyen plein" data-a="oral-suivant">' + tx('Phrase suivante →') + '</button>';
      try{ api().bruit(best >= 60 ? 'juste' : 'faux'); }catch(e){} };
    r.onerror = () => { if(!fini && m) m.textContent = tx('Je n’ai rien entendu. Réessaie, plus près du micro.'); };
    r.onend = () => { ecoute = null; if(!fini && m && m.textContent === tx('⏺ Je t’écoute…')) m.textContent = tx('Je n’ai rien entendu. Réessaie, plus près du micro.'); };
    try{ r.start(); }catch(e){ if(m) m.textContent = tx('Je n’ai rien entendu. Réessaie, plus près du micro.'); }
  }
  function finir(){
    const A = api(), p = partie, moy = p.notes.reduce((t, x) => t + (x || 0), 0) / p.liste.length, note = Math.round(moy / 5 * 2) / 2;
    A.J().plumes += Math.round(moy / 20); A.garder();
    A.poser(A.barre('anglais') + '<main class="centre"><div class="ami-moyen">' + A.ami(note >= 14 ? 'fete' : 'malin') + '</div><h2>' + A.esc(tx('Oral terminé : {0} / 20', String(note).replace('.', ','))) + '</h2><p>' +
      tx(note >= 14 ? 'Un Anglais te comprendrait sans problème. 🇬🇧👏' : 'On y est presque : réécoute Plumo et articule les fins de mots. 💪') + '</p><div class="actions serrees"><button class="moyen plein" data-a="oral">🔁</button><button class="moyen" data-a="anglais">🇬🇧</button></div></main>');
    partie = null;
  }
  Object.assign(M.actions, {
    'oral': () => { if(window.PARCOURS){ const l = PARCOURS.melanger ? PARCOURS.melanger(PARCOURS.REPETER.slice()) : PARCOURS.REPETER.slice(); partie = { liste:l.slice(0, 5), i:0, notes:[] }; } return ecran(); },
    'oral-ecouter': () => { if(partie) try{ window.speak(partie.liste[partie.i].en, 'en'); }catch(e){} },
    'oral-micro': () => micro(),
    'oral-suivant': () => { if(!partie) return ecran(); partie.i++; return partie.i >= partie.liste.length ? finir() : ecran(); },
    'oral-accord': (v, b) => { const base = api().base(); base.oralAccord = !accord(); api().garder();
      if(b){ b.textContent = tx(accord() ? 'Autorisé' : 'Non autorisé'); b.classList.toggle('plein', accord()); b.setAttribute('aria-pressed', String(accord())); } }
  });
  M.oral = { score };
})();
