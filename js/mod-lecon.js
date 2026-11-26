// Ami des mots — v6.54 : « 📖 Je n'ai pas compris la leçon ».
// Pour chaque chapitre : l'essentiel de la leçon (tiré des explications des questions), des exemples,
// puis Plumo réexplique avec ses mots grâce à l'IA (serveur-php/lecon.php) et répond à 3 questions au plus.
// Sans serveur ou sans réponse de l'IA, la fiche de la leçon reste là : le bouton marche toujours.
// Rien de personnel ne part au serveur : seulement le chapitre, ses règles, des exemples et la question de l'élève.
(function(){
  'use strict';
  const M = window.AMI_MODULES; if(!M) return;
  M.textes({
    '📖 Je n’ai pas compris la leçon': ['📖 I didn’t understand the lesson', '📖 No he entendido la lección', '📖 Ich habe die Lektion nicht verstanden', '📖 Non ho capito la lezione', '📖 Não percebi a lição'],
    'Pas compris en classe ? Pas grave : Plumo reprend la leçon tranquillement, à ton rythme.': ['Didn’t get it in class? No problem: Plumo goes over the lesson again, at your pace.', '¿No lo entendiste en clase? No pasa nada: Plumo repasa la lección contigo, a tu ritmo.', 'Im Unterricht nicht verstanden? Kein Problem: Plumo erklärt die Lektion noch einmal, in deinem Tempo.', 'Non hai capito in classe? Nessun problema: Plumo riprende la lezione con calma, al tuo ritmo.', 'Não percebeste na aula? Não faz mal: o Plumo retoma a lição com calma, ao teu ritmo.'],
    '🧠 L’essentiel': ['🧠 The key points', '🧠 Lo esencial', '🧠 Das Wichtigste', '🧠 L’essenziale', '🧠 O essencial'],
    '✏️ Des exemples': ['✏️ Examples', '✏️ Ejemplos', '✏️ Beispiele', '✏️ Esempi', '✏️ Exemplos'],
    '🤖 Plumo t’explique avec ses mots': ['🤖 Plumo explains it in his own words', '🤖 Plumo te lo explica con sus palabras', '🤖 Plumo erklärt es mit seinen Worten', '🤖 Plumo te lo spiega con parole sue', '🤖 O Plumo explica-te por palavras dele'],
    '✨ Explique-moi la leçon': ['✨ Explain the lesson to me', '✨ Explícame la lección', '✨ Erklär mir die Lektion', '✨ Spiegami la lezione', '✨ Explica-me a lição'],
    '⏳ Plumo prépare son explication…': ['⏳ Plumo is getting his explanation ready…', '⏳ Plumo prepara su explicación…', '⏳ Plumo bereitet seine Erklärung vor…', '⏳ Plumo prepara la sua spiegazione…', '⏳ O Plumo está a preparar a explicação…'],
    '❓ Une question sur cette leçon ?': ['❓ A question about this lesson?', '❓ ¿Una pregunta sobre esta lección?', '❓ Eine Frage zu dieser Lektion?', '❓ Una domanda su questa lezione?', '❓ Uma pergunta sobre esta lição?'],
    'Ta question (sans ton nom ni rien de personnel)': ['Your question (no name, nothing personal)', 'Tu pregunta (sin tu nombre ni nada personal)', 'Deine Frage (ohne Namen, nichts Persönliches)', 'La tua domanda (senza nome né nulla di personale)', 'A tua pergunta (sem o teu nome nem nada pessoal)'],
    '📨 Demander à Plumo': ['📨 Ask Plumo', '📨 Preguntar a Plumo', '📨 Plumo fragen', '📨 Chiedi a Plumo', '📨 Perguntar ao Plumo'],
    'Tu as posé toutes tes questions pour cette leçon : la suite, demande-la à ton professeur 😉': ['You have asked all your questions for this lesson: ask your teacher for the rest 😉', 'Ya has hecho todas tus preguntas de esta lección: lo demás, pregúntaselo a tu profe 😉', 'Du hast alle Fragen zu dieser Lektion gestellt: Den Rest fragst du deine Lehrkraft 😉', 'Hai fatto tutte le tue domande su questa lezione: il resto chiedilo al tuo insegnante 😉', 'Já fizeste todas as perguntas desta lição: o resto, pergunta ao teu professor 😉'],
    'L’explication par l’IA arrive avec le serveur du jeu. En attendant, l’essentiel de la leçon est juste au-dessus.': ['AI explanations come with the game server. Meanwhile, the key points of the lesson are just above.', 'La explicación con IA llega con el servidor del juego. Mientras tanto, lo esencial de la lección está justo arriba.', 'Die KI-Erklärung kommt mit dem Spielserver. Bis dahin steht das Wichtigste der Lektion direkt darüber.', 'La spiegazione con l’IA arriva con il server del gioco. Intanto, l’essenziale della lezione è qui sopra.', 'A explicação por IA chega com o servidor do jogo. Entretanto, o essencial da lição está logo acima.'],
    '✅ Vérifier que j’ai compris (5 questions)': ['✅ Check I’ve understood (5 questions)', '✅ Comprobar que lo he entendido (5 preguntas)', '✅ Prüfen, ob ich es verstanden habe (5 Fragen)', '✅ Verifica se ho capito (5 domande)', '✅ Verificar se percebi (5 perguntas)'],
    'Ta question est trop courte.': ['Your question is too short.', 'Tu pregunta es demasiado corta.', 'Deine Frage ist zu kurz.', 'La tua domanda è troppo corta.', 'A tua pergunta é demasiado curta.'],
    'Pas de lien, d’adresse ni de numéro dans ta question.': ['No links, addresses or numbers in your question.', 'Nada de enlaces, direcciones ni números en tu pregunta.', 'Keine Links, Adressen oder Nummern in deiner Frage.', 'Niente link, indirizzi o numeri nella tua domanda.', 'Nada de links, moradas ou números na tua pergunta.']
  });
  const tx = M.tx, api = () => M.api;
  const QUESTIONS_MAX = 3;
  const echanges = {};   // chapitre → nombre de réponses de l'IA demandées pendant la séance
  function chapitre(v){
    const [id, cid] = String(v || '').split('|'), MA = window.MATIERES, m = MA && MA.trouver(id), ch = m && m.chapitres.find(x => x.id === cid);
    return ch && Array.isArray(ch.banque) ? { id, cid, m, ch, nom:MA.nomChap(m, ch), matiere:MA.nom(m) } : null;
  }
  // La fiche de la leçon : les explications des questions du niveau (sans doublon) et quelques exemples.
  function fiche(c){
    const A = api(), niveau = A.etatMatieres().niveau, l = A.serieMatiere(c.id, c.cid, 500, niveau);
    const points = [], vu = new Set();
    for(const q of l){ const r = String(q.regle || '').trim(); if(r && !vu.has(r)){ vu.add(r); points.push(r); } }
    return { niveau, points:points.slice(0, 8), exemples:l.filter(q => q.enonce && q.bon).slice(0, 3).map(q => ({ q:q.enonce, r:q.bon })), tous:points.slice(0, 12) };
  }
  function ecran(v){
    const A = api(), c = chapitre(v); if(!c) return A.matieresAccueil();
    const f = fiche(c), esc = A.esc, cle = c.id + '|' + c.cid, n = echanges[cle] || 0, ia = !!M.serveur('lecon.php');
    A.poser(A.barre('matiere') + '<main class="coin-anglais lecon-ecran"><h2>' + tx('📖 Je n’ai pas compris la leçon') + '</h2>' +
      '<p class="lecon-chapitre"><strong>' + esc(c.ch && c.m.ic || '') + ' ' + esc(c.nom) + '</strong> · ' + esc(c.matiere) + ' · ' + esc(f.niveau) + '</p>' +
      '<p class="pieges-intro">' + tx('Pas compris en classe ? Pas grave : Plumo reprend la leçon tranquillement, à ton rythme.') + '</p>' +
      '<section class="lecon-bloc"><h3>' + tx('🧠 L’essentiel') + '</h3><ul>' + f.points.map(p => '<li>' + esc(p) + '</li>').join('') + '</ul></section>' +
      (f.exemples.length ? '<section class="lecon-bloc"><h3>' + tx('✏️ Des exemples') + '</h3><ul>' + f.exemples.map(e => '<li>' + esc(e.q) + ' → <strong>' + esc(e.r) + '</strong></li>').join('') + '</ul></section>' : '') +
      '<section class="lecon-bloc lecon-ia"><h3>' + tx('🤖 Plumo t’explique avec ses mots') + '</h3>' +
        (ia ? '<p><button class="moyen plein" data-a="lecon-ia" data-v="' + esc(cle) + '">' + tx('✨ Explique-moi la leçon') + '</button></p><div id="lecon-ia-texte" aria-live="polite"></div>' +
          '<div id="lecon-question"' + (n > QUESTIONS_MAX ? ' hidden' : '') + '><label for="lecon-q">' + tx('❓ Une question sur cette leçon ?') + '</label>' +
          '<textarea id="lecon-q" maxlength="300" rows="2" placeholder="' + esc(tx('Ta question (sans ton nom ni rien de personnel)')) + '"></textarea>' +
          '<p><button class="moyen" data-a="lecon-question" data-v="' + esc(cle) + '">' + tx('📨 Demander à Plumo') + '</button></p></div>'
        : '<p class="petit">' + tx('L’explication par l’IA arrive avec le serveur du jeu. En attendant, l’essentiel de la leçon est juste au-dessus.') + '</p>') +
      '</section>' +
      '<p class="lecon-verif"><button class="gros" data-a="lecon-verif" data-v="' + esc(cle) + '">' + tx('✅ Vérifier que j’ai compris (5 questions)') + '</button></p></main>', 'lecon');
  }
  async function demander(v, question){
    const A = api(), c = chapitre(v), z = document.getElementById('lecon-ia-texte'); if(!c || !z) return;
    const cle = c.id + '|' + c.cid, n = echanges[cle] || 0;
    if(question != null){
      question = String(question).trim().replace(/\s+/g, ' ').slice(0, 300);
      if(question.length < 5) return z.insertAdjacentHTML('beforeend', '<p class="petit">' + tx('Ta question est trop courte.') + '</p>');
      if(/https?:|www\.|@|\d{6,}/i.test(question)) return z.insertAdjacentHTML('beforeend', '<p class="petit">' + tx('Pas de lien, d’adresse ni de numéro dans ta question.') + '</p>');
      if(n > QUESTIONS_MAX){ const b = document.getElementById('lecon-question'); if(b) b.hidden = true; return z.insertAdjacentHTML('beforeend', '<p class="petit">' + tx('Tu as posé toutes tes questions pour cette leçon : la suite, demande-la à ton professeur 😉') + '</p>'); }
    }
    const f = fiche(c), attente = document.createElement('p'); attente.className = 'aide'; attente.textContent = tx('⏳ Plumo prépare son explication…'); z.appendChild(attente);
    if(question){ const p = document.createElement('p'); p.className = 'lecon-q-eleve'; p.textContent = '🙋 ' + question; z.insertBefore(p, attente); }
    const r = await M.envoyer('lecon.php', Object.assign({ matiere:c.matiere, niveau:f.niveau, chapitre:c.nom, points:f.tous, exemples:f.exemples.map(e => e.q + ' → ' + e.r), question:question || '', langue:A.base().ui }, A.codePlumes()));
    if(!document.body.contains(z)) return;
    attente.remove();
    if(r.ok && r.d && r.d.texte){
      echanges[cle] = n + 1;
      const p = document.createElement('p'); p.className = 'explication-ia'; p.textContent = '🤖 ' + r.d.texte; z.appendChild(p);
      if(question){ const q = document.getElementById('lecon-q'); if(q) q.value = ''; }
      if(echanges[cle] > QUESTIONS_MAX){ const b = document.getElementById('lecon-question'); if(b) b.hidden = true; }
    } else z.insertAdjacentHTML('beforeend', '<p class="petit">' + tx(r.statut === 402 ? 'Plus de plumes magiques : demande à un adulte (écran ✨ Plus).' : 'Plumo ne répond pas pour l’instant. Réessaie plus tard.') + '</p>');
  }
  function verifier(v){
    const A = api(), c = chapitre(v); if(!c) return A.matieresAccueil();
    return A.matiereSerie(c.id, c.cid, 5, '📖 ' + c.nom);
  }
  Object.assign(M.actions, {
    'lecon-chap':v => ecran(v),
    'lecon-ia':(v, e) => { if(e && e.disabled !== undefined) e.disabled = true; return demander(v, null); },
    'lecon-question':v => { const q = document.getElementById('lecon-q'); return demander(v, q ? q.value : ''); },
    'lecon-verif':v => verifier(v)
  });
  window.AMI_LECON = { fiche:v => { const c = chapitre(v); return c ? fiche(c) : null; }, QUESTIONS_MAX };
})();
