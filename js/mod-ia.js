// Ami des mots — v6.0 : l'IA au service de l'apprentissage (payée en plumes si les plumes sont allumées).
// 1. Après 3 erreurs sur la même notion, Plumo propose de réexpliquer autrement (serveur-php/explique.php).
//    Sans serveur ou sans réponse : Plumo remontre la règle et les bonnes réponses des erreurs, sans IA.
// 2. « Correction par Plumo » : un petit texte en anglais ou un paragraphe de dissertation, noté et corrigé (correction.php).
// Tout ce qui vient de l'IA est marqué 🤖. Seuls la question, la règle ou le texte de l'élève partent au serveur.
(function(){
  'use strict';
  const M = window.AMI_MODULES; if(!M) return;
  M.textes({
    '🦉 Plumo, réexplique-moi !': ['🦉 Plumo, explain it again!', '🦉 ¡Plumo, explícamelo otra vez!', '🦉 Plumo, erklär’s mir nochmal!', '🦉 Plumo, rispiegamelo!', '🦉 Plumo, explica-me outra vez!'],
    '⏳ Plumo cherche une autre façon d’expliquer…': ['⏳ Plumo is looking for another way to explain…', '⏳ Plumo busca otra forma de explicarlo…', '⏳ Plumo sucht eine andere Erklärung…', '⏳ Plumo cerca un altro modo di spiegare…', '⏳ O Plumo procura outra maneira de explicar…'],
    'La règle, encore une fois :': ['The rule, once more:', 'La regla, una vez más:', 'Die Regel, noch einmal:', 'La regola, ancora una volta:', 'A regra, mais uma vez:'],
    'Tes erreurs et les bonnes réponses :': ['Your mistakes and the right answers:', 'Tus errores y las respuestas correctas:', 'Deine Fehler und die richtigen Antworten:', 'I tuoi errori e le risposte giuste:', 'Os teus erros e as respostas certas:'],
    '✍️ Correction par Plumo': ['✍️ Plumo’s marking', '✍️ Corrección de Plumo', '✍️ Plumo korrigiert', '✍️ Correzione di Plumo', '✍️ Correção do Plumo'],
    'Un petit texte en anglais ou un paragraphe de dissertation, noté et corrigé': ['A short text in English or an essay paragraph, marked and corrected', 'Un textito en inglés o un párrafo de disertación, con nota y corregido', 'Ein kurzer englischer Text oder ein Aufsatzabsatz, benotet und korrigiert', 'Un breve testo in inglese o un paragrafo di tema, valutato e corretto', 'Um pequeno texto em inglês ou um parágrafo de dissertação, com nota e corrigido'],
    'La correction par l’IA arrive avec le serveur du jeu.': ['AI marking comes with the game server.', 'La corrección por IA llega con el servidor del juego.', 'Die KI-Korrektur kommt mit dem Spielserver.', 'La correzione con l’IA arriva con il server del gioco.', 'A correção pela IA chega com o servidor do jogo.'],
    'Type de texte': ['Kind of text', 'Tipo de texto', 'Textart', 'Tipo di testo', 'Tipo de texto'],
    'Texte en anglais': ['Text in English', 'Texto en inglés', 'Text auf Englisch', 'Testo in inglese', 'Texto em inglês'],
    'Paragraphe de dissertation (français)': ['Essay paragraph (French)', 'Párrafo de disertación (francés)', 'Aufsatzabsatz (Französisch)', 'Paragrafo di tema (francese)', 'Parágrafo de dissertação (francês)'],
    'Consigne (facultatif)': ['Instructions (optional)', 'Enunciado (opcional)', 'Aufgabe (optional)', 'Consegna (facoltativo)', 'Enunciado (opcional)'],
    'Ton texte (20 à 1 200 caractères)': ['Your text (20 to 1,200 characters)', 'Tu texto (de 20 a 1 200 caracteres)', 'Dein Text (20 bis 1.200 Zeichen)', 'Il tuo testo (da 20 a 1.200 caratteri)', 'O teu texto (20 a 1 200 caracteres)'],
    '🔒 N’écris ni ton nom, ni ton adresse, ni rien de personnel : le texte part à l’IA pour être corrigé, puis il est oublié.': ['🔒 Don’t write your name, address or anything personal: the text goes to the AI to be marked, then it’s forgotten.', '🔒 No escribas tu nombre, ni tu dirección, ni nada personal: el texto va a la IA para corregirlo y luego se olvida.', '🔒 Schreib weder deinen Namen noch deine Adresse noch etwas Persönliches: Der Text geht zur Korrektur an die KI und wird dann vergessen.', '🔒 Non scrivere il tuo nome, l’indirizzo o altro di personale: il testo va all’IA per la correzione, poi viene dimenticato.', '🔒 Não escrevas o teu nome, morada nem nada pessoal: o texto vai para a IA para ser corrigido e depois é esquecido.'],
    '✍️ Corriger': ['✍️ Mark it', '✍️ Corregir', '✍️ Korrigieren', '✍️ Correggi', '✍️ Corrigir'],
    '⏳ Plumo sort son stylo rouge…': ['⏳ Plumo gets his red pen out…', '⏳ Plumo saca su boli rojo…', '⏳ Plumo zückt den Rotstift…', '⏳ Plumo tira fuori la penna rossa…', '⏳ O Plumo pega na caneta vermelha…'],
    'Ton texte est trop court.': ['Your text is too short.', 'Tu texto es demasiado corto.', 'Dein Text ist zu kurz.', 'Il tuo testo è troppo corto.', 'O teu texto é demasiado curto.'],
    'Plus de plumes magiques : demande à un adulte (écran ✨ Plus).': ['No magic feathers left: ask an adult (✨ Plus screen).', 'No quedan plumas mágicas: pide ayuda a un adulto (pantalla ✨ Plus).', 'Keine Zauberfedern mehr: Frag einen Erwachsenen (Bildschirm ✨ Plus).', 'Piume magiche finite: chiedi a un adulto (schermata ✨ Plus).', 'Acabaram as penas mágicas: pede a um adulto (ecrã ✨ Plus).'],
    'Plumo ne répond pas pour l’instant. Réessaie plus tard.': ['Plumo isn’t answering right now. Try again later.', 'Plumo no responde por ahora. Inténtalo más tarde.', 'Plumo antwortet gerade nicht. Versuch es später noch mal.', 'Plumo non risponde per ora. Riprova più tardi.', 'O Plumo não responde por agora. Tenta mais tarde.'],
    '🤖 Note : {0} / 20': ['🤖 Mark: {0} / 20', '🤖 Nota: {0} / 20', '🤖 Note: {0} / 20', '🤖 Voto: {0} / 20', '🤖 Nota: {0} / 20'],
    '👍 Points forts': ['👍 Strengths', '👍 Puntos fuertes', '👍 Stärken', '👍 Punti di forza', '👍 Pontos fortes'],
    '💡 Conseils': ['💡 Tips', '💡 Consejos', '💡 Tipps', '💡 Consigli', '💡 Conselhos'],
    '✅ Version corrigée': ['✅ Corrected version', '✅ Versión corregida', '✅ Korrigierte Fassung', '✅ Versione corretta', '✅ Versão corrigida']
  });
  const tx = M.tx, api = () => M.api;
  const erreurs = {};   // notion → erreurs de la séance (question, bonne réponse, choix)
  M.hooks.question.push((juste, q, z) => {
    if(juste || !q) return;
    const k = (q.matiere || (z && z.sujet) || 'x') + ':' + (q.chap || q.consigne || '');
    const l = erreurs[k] = (erreurs[k] || []).concat({ q:q.enonce || '', bon:q.bon, regle:q.regle || '', matiere:q.matiere || (z && z.sujet) || '' }).slice(-5);
    if(l.length < 3 || l.length % 3) return;
    setTimeout(() => { const r = document.getElementById('qz-retour'); if(r && !r.querySelector('[data-a="reexplique"]')) r.insertAdjacentHTML('beforeend', '<p><button class="moyen plein" data-a="reexplique" data-v="' + api().esc(k) + '">' + tx('🦉 Plumo, réexplique-moi !') + '</button></p><div id="reexplication"></div>'); }, 0);
  });
  function local(l){ const esc = api().esc, d = l[l.length - 1];
    return (d.regle ? '<p><strong>' + tx('La règle, encore une fois :') + '</strong> ' + esc(d.regle) + '</p>' : '') + '<p><strong>' + tx('Tes erreurs et les bonnes réponses :') + '</strong></p><ul class="pieges-cats">' + l.map(x => '<li>' + esc(x.q) + ' → <strong>' + esc(x.bon) + '</strong></li>').join('') + '</ul>'; }
  async function reexplique(k, bouton){
    const l = erreurs[k], z = document.getElementById('reexplication'); if(!l || !z) return; if(bouton) bouton.disabled = true;
    const d = l[l.length - 1], A = api();
    if(!M.serveur('explique.php')){ z.innerHTML = local(l); return; }
    z.innerHTML = '<p class="aide">' + tx('⏳ Plumo cherche une autre façon d’expliquer…') + '</p>';
    const r = await M.envoyer('explique.php', Object.assign({ sujet:d.matiere, question:d.q, bonne:d.bon, regle:d.regle, langue:A.base().ui }, A.codePlumes()));
    if(!document.body.contains(z)) return;
    z.innerHTML = r.ok && r.d && r.d.texte ? '<p class="explication-ia">🤖 ' + A.esc(r.d.texte) + '</p>' : (r.statut === 402 ? '<p class="petit">' + tx('Plus de plumes magiques : demande à un adulte (écran ✨ Plus).') + '</p>' : '') + local(l);
  }
  const carte = () => M.carte('correction', '', '✍️', tx('✍️ Correction par Plumo').replace(/^✍️ /, ''), tx('Un petit texte en anglais ou un paragraphe de dissertation, noté et corrigé'));
  M.cartes.anglais.push(carte); M.cartes.matiere.push(carte);
  function ecran(){
    const A = api();
    if(!M.serveur('correction.php')) return A.poser(A.barre('matieres') + '<main class="coin-anglais"><h2>' + tx('✍️ Correction par Plumo') + '</h2><p>' + tx('La correction par l’IA arrive avec le serveur du jeu.') + '</p></main>');
    A.poser(A.barre('matieres') + '<main class="coin-anglais correction"><h2>' + tx('✍️ Correction par Plumo') + '</h2>' +
      '<p><label>' + tx('Type de texte') + ' <select id="corr-sorte"><option value="anglais">' + tx('Texte en anglais') + '</option><option value="francais">' + tx('Paragraphe de dissertation (français)') + '</option></select></label></p>' +
      '<p><label>' + tx('Consigne (facultatif)') + ' <input id="corr-consigne" maxlength="200"></label></p>' +
      '<p><label>' + tx('Ton texte (20 à 1 200 caractères)') + '<textarea id="corr-texte" rows="8" maxlength="1200"></textarea></label></p>' +
      '<p class="petit">' + tx('🔒 N’écris ni ton nom, ni ton adresse, ni rien de personnel : le texte part à l’IA pour être corrigé, puis il est oublié.') + '</p>' +
      '<p><button class="gros" data-a="corriger">' + tx('✍️ Corriger') + '</button></p><div id="corr-resultat" role="status" aria-live="polite"></div></main>');
  }
  async function corriger(){
    const A = api(), esc = A.esc, z = document.getElementById('corr-resultat'), texte = String((document.getElementById('corr-texte') || {}).value || '').trim();
    if(texte.length < 20){ if(z) z.textContent = tx('Ton texte est trop court.'); return; }
    if(z) z.innerHTML = '<p class="aide">' + tx('⏳ Plumo sort son stylo rouge…') + '</p>';
    const r = await M.envoyer('correction.php', Object.assign({ sorte:(document.getElementById('corr-sorte') || {}).value, consigne:(document.getElementById('corr-consigne') || {}).value || '', texte, niveau:A.etatMatieres().niveau, langue:A.base().ui }, A.codePlumes()));
    if(!z || !document.body.contains(z)) return;
    if(!r.ok || !r.d || r.d.note == null){ z.innerHTML = '<p>' + tx(r.statut === 402 ? 'Plus de plumes magiques : demande à un adulte (écran ✨ Plus).' : r.statut === 400 ? 'Ton texte est trop court.' : 'Plumo ne répond pas pour l’instant. Réessaie plus tard.') + '</p>'; return; }
    const li = l => '<ul class="pieges-cats">' + (l || []).map(x => '<li>' + esc(x) + '</li>').join('') + '</ul>';
    z.innerHTML = '<p class="note-examen">' + esc(tx('🤖 Note : {0} / 20', String(r.d.note).replace('.', ','))) + '</p><h3>' + tx('👍 Points forts') + '</h3>' + li(r.d.forts) + '<h3>' + tx('💡 Conseils') + '</h3>' + li(r.d.conseils) +
      '<h3>' + tx('✅ Version corrigée') + '</h3><p class="corrige-ia"' + ((document.getElementById('corr-sorte') || {}).value === 'anglais' ? ' lang="en"' : '') + '>🤖 ' + esc(r.d.corrige) + '</p>';
  }
  Object.assign(M.actions, { 'reexplique':(v, b) => reexplique(v, b), 'correction':() => ecran(), 'corriger':() => corriger() });
  M.ia = { erreurs, local };
})();
