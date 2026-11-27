// Ami des mots — v7.3 : 📒 MON CAHIER DE LEÇONS et 📝 CONSTRUIRE MON CONTRÔLE.
// • L'élève tape ou colle ses leçons (matière, titre, texte) et peut ajouter ses fiches « question = réponse ».
//   Tout reste dans l'appareil (sauvegarde du jeu), sans compte.
// • Il construit un contrôle comme un prof : leçons du cahier et/ou chapitres de l'appli, nombre de questions, durée.
//   Questions fabriquées dans l'appareil, sans IA : textes à trous tirés de la leçon (dates, nombres, noms, mots importants),
//   fiches de l'élève, questions de l'appli. Option : questions variées par l'IA (serveur-php/controle.php),
//   seulement avec l'accord d'un parent (le même que pour l'aide aux devoirs) ; coûte des plumes si elles sont allumées.
// • Mode contrôle : chronométré si on veut, sans vanne pendant l'épreuve, note sur 20 et corrigé à la fin ;
//   les erreurs vont dans le carnet comme les autres. Un contrôle peut être enregistré pour être refait.
// Rien n'est supprimé sans que l'élève le demande, et chaque suppression demande une confirmation.
(function(){
  'use strict';
  const M = window.AMI_MODULES; if(!M) return;
  const api = () => M.api, tx = (...a) => M.tx(...a);
  M.textes({
    '📒 Mon cahier et mes contrôles':['📒 My notebook and my tests', '📒 Mi cuaderno y mis controles', '📒 Mein Heft und meine Tests', '📒 Il mio quaderno e le mie verifiche', '📒 O meu caderno e os meus testes'],
    'Range tes leçons, puis construis un contrôle comme ton prof':['Store your lessons, then build a test like your teacher', 'Guarda tus lecciones y crea un control como tu profe', 'Speichere deine Lektionen und baue einen Test wie deine Lehrkraft', 'Conserva le tue lezioni e costruisci una verifica come il tuo prof', 'Guarda as tuas lições e cria um teste como o teu professor'],
    '📒 Mon cahier de leçons':['📒 My lesson notebook', '📒 Mi cuaderno de lecciones', '📒 Mein Lektionsheft', '📒 Il mio quaderno delle lezioni', '📒 O meu caderno de lições'],
    'Tape ou colle tes leçons. Elles restent dans cet appareil.':['Type or paste your lessons. They stay on this device.', 'Escribe o pega tus lecciones. Se quedan en este dispositivo.', 'Tippe oder füge deine Lektionen ein. Sie bleiben auf diesem Gerät.', 'Scrivi o incolla le tue lezioni. Restano su questo dispositivo.', 'Escreve ou cola as tuas lições. Ficam neste aparelho.'],
    '➕ Ajouter une leçon':['➕ Add a lesson', '➕ Añadir una lección', '➕ Lektion hinzufügen', '➕ Aggiungi una lezione', '➕ Adicionar uma lição'],
    '📝 Construire mon contrôle':['📝 Build my test', '📝 Crear mi control', '📝 Meinen Test bauen', '📝 Costruisci la mia verifica', '📝 Criar o meu teste'],
    'Aucune leçon pour l’instant.':['No lessons yet.', 'Todavía no hay lecciones.', 'Noch keine Lektion.', 'Ancora nessuna lezione.', 'Ainda não há lições.'],
    'Mes contrôles enregistrés':['My saved tests', 'Mis controles guardados', 'Meine gespeicherten Tests', 'Le mie verifiche salvate', 'Os meus testes guardados'],
    'Matière':['Subject', 'Asignatura', 'Fach', 'Materia', 'Disciplina'],
    'Titre de la leçon':['Lesson title', 'Título de la lección', 'Titel der Lektion', 'Titolo della lezione', 'Título da lição'],
    'Texte de la leçon (tapé ou collé)':['Lesson text (typed or pasted)', 'Texto de la lección (escrito o pegado)', 'Text der Lektion (getippt oder eingefügt)', 'Testo della lezione (scritto o incollato)', 'Texto da lição (escrito ou colado)'],
    'Mes fiches : une par ligne, sous la forme « question = réponse »':['My cards: one per line, as “question = answer”', 'Mis fichas: una por línea, así: «pregunta = respuesta»', 'Meine Karten: eine pro Zeile, als „Frage = Antwort“', 'Le mie schede: una per riga, così: «domanda = risposta»', 'As minhas fichas: uma por linha, assim: «pergunta = resposta»'],
    '💾 Enregistrer':['💾 Save', '💾 Guardar', '💾 Speichern', '💾 Salva', '💾 Guardar'],
    '🗑️ Supprimer':['🗑️ Delete', '🗑️ Eliminar', '🗑️ Löschen', '🗑️ Elimina', '🗑️ Apagar'],
    'Supprimer définitivement « {0} » ?':['Permanently delete “{0}”?', '¿Eliminar definitivamente «{0}»?', '„{0}“ endgültig löschen?', 'Eliminare definitivamente «{0}»?', 'Apagar definitivamente «{0}»?'],
    'Il faut un titre et au moins quelques phrases ou deux fiches.':['A title and at least a few sentences or two cards are needed.', 'Hace falta un título y al menos unas frases o dos fichas.', 'Es braucht einen Titel und mindestens ein paar Sätze oder zwei Karten.', 'Servono un titolo e almeno qualche frase o due schede.', 'É preciso um título e pelo menos algumas frases ou duas fichas.'],
    'Ce qui est évalué':['What is tested', 'Qué se evalúa', 'Was geprüft wird', 'Che cosa si valuta', 'O que é avaliado'],
    'Mes leçons':['My lessons', 'Mis lecciones', 'Meine Lektionen', 'Le mie lezioni', 'As minhas lições'],
    'Chapitres de l’appli':['App chapters', 'Capítulos de la app', 'Kapitel der App', 'Capitoli dell’app', 'Capítulos da app'],
    'Nombre de questions':['Number of questions', 'Número de preguntas', 'Anzahl der Fragen', 'Numero di domande', 'Número de perguntas'],
    'Durée':['Time limit', 'Duración', 'Dauer', 'Durata', 'Duração'],
    'sans limite':['no limit', 'sin límite', 'ohne Limit', 'senza limite', 'sem limite'],
    '{0} min':['{0} min', '{0} min', '{0} Min.', '{0} min', '{0} min'],
    '▶ Fabriquer le contrôle':['▶ Make the test', '▶ Crear el control', '▶ Test erstellen', '▶ Prepara la verifica', '▶ Fazer o teste'],
    '✨ Questions variées par l’IA':['✨ Varied questions by the AI', '✨ Preguntas variadas por la IA', '✨ Abwechslungsreiche Fragen von der KI', '✨ Domande varie dall’IA', '✨ Perguntas variadas pela IA'],
    'Le texte des leçons choisies part au serveur du jeu puis à l’IA (Anthropic) pour fabriquer les questions. Rien n’est gardé. L’IA peut se tromper : vérifie avec ta leçon.':['The text of the chosen lessons goes to the game server and then to the AI (Anthropic) to make the questions. Nothing is kept. The AI can make mistakes: check with your lesson.', 'El texto de las lecciones elegidas va al servidor del juego y luego a la IA (Anthropic) para crear las preguntas. No se guarda nada. La IA puede equivocarse: compruébalo con tu lección.', 'Der Text der gewählten Lektionen geht an den Spielserver und dann an die KI (Anthropic), um Fragen zu erstellen. Nichts wird gespeichert. Die KI kann sich irren: Prüfe mit deiner Lektion.', 'Il testo delle lezioni scelte va al server del gioco e poi all’IA (Anthropic) per preparare le domande. Non viene conservato nulla. L’IA può sbagliare: controlla con la tua lezione.', 'O texto das lições escolhidas vai para o servidor do jogo e depois para a IA (Anthropic) para criar as perguntas. Nada é guardado. A IA pode enganar-se: confirma com a tua lição.'],
    'Les questions par l’IA doivent d’abord être autorisées par un parent (Espace parents, aide aux devoirs).':['AI questions must first be allowed by a parent (Parents’ area, homework help).', 'Las preguntas por IA deben ser autorizadas antes por un padre o madre (Espacio padres, ayuda con los deberes).', 'KI-Fragen müssen zuerst von einem Elternteil erlaubt werden (Elternbereich, Hausaufgabenhilfe).', 'Le domande dell’IA devono prima essere autorizzate da un genitore (Area genitori, aiuto compiti).', 'As perguntas pela IA têm de ser autorizadas primeiro por um pai ou mãe (Espaço pais, ajuda nos trabalhos de casa).'],
    'Choisis au moins une leçon ou un chapitre.':['Choose at least one lesson or one chapter.', 'Elige al menos una lección o un capítulo.', 'Wähle mindestens eine Lektion oder ein Kapitel.', 'Scegli almeno una lezione o un capitolo.', 'Escolhe pelo menos uma lição ou um capítulo.'],
    'Pas assez de matière pour des questions : ajoute des phrases à ta leçon (avec des dates, des nombres, des mots importants) ou des fiches.':['Not enough material for questions: add sentences to your lesson (with dates, numbers, key words) or cards.', 'No hay suficiente material para preguntas: añade frases a tu lección (con fechas, números, palabras clave) o fichas.', 'Nicht genug Stoff für Fragen: Füge Sätze (mit Daten, Zahlen, wichtigen Wörtern) oder Karten hinzu.', 'Non c’è abbastanza materiale per le domande: aggiungi frasi alla lezione (con date, numeri, parole importanti) o schede.', 'Não há material suficiente para perguntas: acrescenta frases à tua lição (com datas, números, palavras importantes) ou fichas.'],
    'Plumo prépare les questions…':['Plumo is preparing the questions…', 'Plumo prepara las preguntas…', 'Plumo bereitet die Fragen vor…', 'Plumo prepara le domande…', 'O Plumo está a preparar as perguntas…'],
    'L’IA ne répond pas pour l’instant : voici un contrôle fabriqué sans IA.':['The AI is not answering right now: here is a test made without AI.', 'La IA no responde por ahora: aquí tienes un control hecho sin IA.', 'Die KI antwortet gerade nicht: Hier ist ein Test ohne KI.', 'L’IA non risponde per ora: ecco una verifica fatta senza IA.', 'A IA não responde de momento: aqui tens um teste feito sem IA.'],
    'Plus de plumes magiques : demande à un adulte (écran ✨ Plus).':['No more magic feathers: ask an adult (✨ Plus screen).', 'No quedan plumas mágicas: pide ayuda a un adulto (pantalla ✨ Plus).', 'Keine Zauberfedern mehr: Frag einen Erwachsenen (Bildschirm ✨ Plus).', 'Niente più piume magiche: chiedi a un adulto (schermata ✨ Plus).', 'Já não há penas mágicas: pede a um adulto (ecrã ✨ Plus).'],
    'Complète : « {0} »':['Fill in: “{0}”', 'Completa: «{0}»', 'Ergänze: „{0}“', 'Completa: «{0}»', 'Completa: «{0}»'],
    'Ta leçon : « {0} »':['Your lesson: “{0}”', 'Tu lección: «{0}»', 'Deine Lektion: „{0}“', 'La tua lezione: «{0}»', 'A tua lição: «{0}»'],
    'Ta fiche : {0} = {1}':['Your card: {0} = {1}', 'Tu ficha: {0} = {1}', 'Deine Karte: {0} = {1}', 'La tua scheda: {0} = {1}', 'A tua ficha: {0} = {1}'],
    '📝 Mon contrôle':['📝 My test', '📝 Mi control', '📝 Mein Test', '📝 La mia verifica', '📝 O meu teste'],
    'Note : {0}/20':['Mark: {0}/20', 'Nota: {0}/20', 'Note: {0}/20', 'Voto: {0}/20', 'Nota: {0}/20'],
    '{0} bonnes réponses sur {1}':['{0} correct answers out of {1}', '{0} respuestas correctas de {1}', '{0} richtige Antworten von {1}', '{0} risposte giuste su {1}', '{0} respostas certas em {1}'],
    'Corrigé':['Answers', 'Corrección', 'Lösungen', 'Correzione', 'Correção'],
    'Ta réponse :':['Your answer:', 'Tu respuesta:', 'Deine Antwort:', 'La tua risposta:', 'A tua resposta:'],
    'Bonne réponse :':['Correct answer:', 'Respuesta correcta:', 'Richtige Antwort:', 'Risposta giusta:', 'Resposta certa:'],
    'Pas de réponse (temps écoulé).':['No answer (time is up).', 'Sin respuesta (se acabó el tiempo).', 'Keine Antwort (Zeit abgelaufen).', 'Nessuna risposta (tempo scaduto).', 'Sem resposta (o tempo acabou).'],
    '🔁 Refaire ce contrôle':['🔁 Retake this test', '🔁 Repetir este control', '🔁 Diesen Test wiederholen', '🔁 Rifai questa verifica', '🔁 Refazer este teste'],
    '💾 Enregistrer ce contrôle':['💾 Save this test', '💾 Guardar este control', '💾 Diesen Test speichern', '💾 Salva questa verifica', '💾 Guardar este teste'],
    'Contrôle enregistré.':['Test saved.', 'Control guardado.', 'Test gespeichert.', 'Verifica salvata.', 'Teste guardado.'],
    'Contrôle du {0}':['Test of {0}', 'Control del {0}', 'Test vom {0}', 'Verifica del {0}', 'Teste de {0}'],
    '{0} questions':['{0} questions', '{0} preguntas', '{0} Fragen', '{0} domande', '{0} perguntas'],
    'Autre matière':['Other subject', 'Otra asignatura', 'Anderes Fach', 'Altra materia', 'Outra disciplina']
  });

  // ───── Données (dans la sauvegarde du jeu) ─────
  const MAX_LECONS = 200, MAX_TEXTE = 12000, MAX_CONTROLES = 30;
  function cahier(){ const j = api().J(); const c = j.cahier && typeof j.cahier === 'object' ? j.cahier : {};
    c.lecons = Array.isArray(c.lecons) ? c.lecons.filter(l => l && typeof l.id === 'string') : []; c.controles = Array.isArray(c.controles) ? c.controles.filter(x => x && Array.isArray(x.liste)) : [];
    j.cahier = c; return c; }
  const nouvelId = p => p + Date.now().toString(36) + Math.random().toString(36).slice(2, 6);
  const matieres = () => { const Ms = window.MATIERES, l = []; for(const m of (Ms && Ms.LISTE) || []) if(m.chapitres && m.chapitres.length) l.push([m.id, (m.ic ? m.ic + ' ' : '') + Ms.nom(m)]); l.push(['autre', tx('Autre matière')]); return l; };
  const nomMatiere = id => (matieres().find(x => x[0] === id) || [id, id])[1];
  function lireFiches(s){ return String(s || '').split('\n').map(l => l.split(/\s+=\s+|=/)).filter(p => p.length >= 2).map(p => [p[0].trim(), p.slice(1).join('=').trim()]).filter(p => p[0] && p[1]).slice(0, 100); }

  // ───── Questions sans IA ─────
  const melanger = l => { for(let i = l.length - 1; i > 0; i--){ const j = Math.floor(Math.random() * (i + 1)); [l[i], l[j]] = [l[j], l[i]]; } return l; };
  const NB = /(?<![\p{L}\p{N}])\d{1,4}(?:[.,]\d+)?(?![\p{L}\p{N}])/gu, PROPRE = /(?<=[\s’'(«-])[A-ZÀ-ÖØ-Þ][\p{L}’'-]{2,}/gu, LONG = /(?<![\p{L}’'])[\p{Ll}][\p{L}’'-]{7,}/gu;
  const MOTS_VIDES = /^(cependant|pourtant|beaucoup|toujours|plusieurs|également|ensemble|notamment|lorsqu’il|lorsqu’elle|nouvelle|nouveaux|quelques)$/i;
  function phrases(t){ return String(t || '').replace(/\r/g, '').split(/\n+|(?<=[.!?;])\s+/).map(s => s.trim()).filter(s => s.length >= 25 && s.length <= 320); }
  function candidats(texte){ const c = { nb:new Set(), propre:new Set(), long:new Set() };
    for(const m of texte.matchAll(NB)) c.nb.add(m[0]); for(const m of texte.matchAll(PROPRE)) c.propre.add(m[0]); for(const m of texte.matchAll(LONG)) if(!MOTS_VIDES.test(m[0])) c.long.add(m[0]);
    return c; }
  function variantesNombre(x){ const n = parseFloat(String(x).replace(',', '.')), entier = /^\d+$/.test(x), r = [];
    if(!isFinite(n)) return r; const pas = entier && x.length === 4 ? [1, 10, -10, 100, -1, 5] : entier ? [1, -1, 2, 10, -2] : [0.5, -0.5, 1, -1];
    for(const p of pas){ const v = n + p; if(v >= 0) r.push(entier ? String(v) : String(Math.round(v * 100) / 100).replace('.', String(x).includes(',') ? ',' : '.')); } return r; }
  function trous(lecon, mid){ const t = String(lecon.texte || ''), c = candidats(t), out = [];
    phrases(t).forEach((ph, i) => {
      const essais = [['nb', [...ph.matchAll(NB)].map(m => m[0])], ['propre', [...ph.matchAll(PROPRE)].map(m => m[0])], ['long', [...ph.matchAll(LONG)].map(m => m[0]).filter(w => !MOTS_VIDES.test(w))]];
      for(const [k, l] of essais){ if(!l.length) continue;
        const bon = k === 'long' ? l.sort((a, b) => b.length - a.length)[0] : l[0];
        let faux = melanger([...c[k]].filter(x => x !== bon && x.toLowerCase() !== bon.toLowerCase()));
        if(k === 'nb') faux = faux.concat(melanger(variantesNombre(bon)));
        faux = [...new Set(faux)].filter(x => x !== bon).slice(0, 3); if(faux.length < 3) continue;
        const trou = ph.replace(bon, '_____');
        out.push(q(mid, 'cahier:' + lecon.id + ':t' + i, '📒 ' + lecon.titre, tx('Complète : « {0} »', trou), bon, faux, tx('Ta leçon : « {0} »', ph)));
        break; }
    }); return out; }
  function fiches(lecon, mid, autres){ const f = Array.isArray(lecon.fiches) ? lecon.fiches : [], out = [];
    f.forEach(([qq, r], i) => { const pool = melanger(autres.filter(x => x !== r)); const faux = [...new Set(pool)].slice(0, 3); if(faux.length < 3) return;
      out.push(q(mid, 'cahier:' + lecon.id + ':f' + i, '📒 ' + lecon.titre, qq, r, faux, tx('Ta fiche : {0} = {1}', qq, r))); }); return out; }
  function q(mid, id, consigne, enonce, bon, faux, regle){
    return { id, chap:'cahier', matiere:mid === 'autre' ? 'cahier' : mid, lang:api().base().ui || 'fr', consigne, enonce, bon, faux:faux.map(f => ({ en:String(f), vanne:'' })), regle }; }
  function questionsLocales(lecons, mid){ const toutes = lecons.flatMap(l => (l.fiches || []).map(x => x[1])).concat(lecons.flatMap(l => { const c = candidats(l.texte || ''); return [...c.long, ...c.propre]; }));
    return lecons.flatMap(l => fiches(l, mid, toutes).concat(trous(l, mid))); }
  function questionsAppli(mid, chaps, n){ const MT = window.MATIERES, niv = api().etatMatieres().niveau, l = [];
    if(!MT || !MT.trouver(mid) || !chaps.length) return l; const par = Math.ceil(n / chaps.length);
    chaps.forEach((cid, k) => l.push(...MT.serie(mid, cid, niv, par, Math.floor(Math.random() * 1e9) + k, 'taquin'))); return l; }
  // Mélange équilibré : on alterne les sources (fiches et trous de chaque leçon, puis l'appli) pour ne pas tout prendre au même endroit.
  function assembler(sources, n){ const s = sources.map(x => melanger(x.slice())).filter(x => x.length), out = [], vus = new Set();
    while(out.length < n && s.some(x => x.length)) for(const x of s){ const e = x.shift(); if(e && !vus.has(e.enonce)){ vus.add(e.enonce); out.push(e); } if(out.length >= n) break; }
    return out; }

  // ───── Écrans ─────
  function ecran(msg){
    const A = api(), esc = A.esc, c = cahier();
    const lig = c.lecons.slice().reverse().map(l => '<li class="cahier-ligne"><button class="chap" data-a="cahier-edit" data-v="' + esc(l.id) + '"><span>' + esc(l.titre) + '</span><em>' + esc(nomMatiere(l.matiere)) + '</em></button></li>').join('');
    const ctl = c.controles.slice().reverse().map(x => '<li class="cahier-ligne"><button class="chap" data-a="cahier-refaire" data-v="' + esc(x.id) + '"><span>▶ ' + esc(x.titre) + '</span><em>' + esc(tx('{0} questions', x.liste.length)) + (x.note != null ? ' · ' + esc(String(x.note).replace('.', ',')) + '/20' : '') + '</em></button>' +
      '<button class="moyen" data-a="cahier-suppr-controle" data-v="' + esc(x.id) + '" aria-label="' + esc(tx('🗑️ Supprimer')) + '">🗑️</button></li>').join('');
    A.poser(A.barre('matieres') + '<main class="coin-anglais cahier-ecran"><h2>' + esc(tx('📒 Mon cahier de leçons')) + '</h2>' +
      '<p class="pieges-intro">' + esc(tx('Tape ou colle tes leçons. Elles restent dans cet appareil.')) + '</p>' + (msg ? '<p class="petit" role="status">' + esc(msg) + '</p>' : '') +
      '<div class="actions serrees"><button class="moyen plein" data-a="cahier-edit" data-v="">' + esc(tx('➕ Ajouter une leçon')) + '</button><button class="moyen" data-a="cahier-construire">' + esc(tx('📝 Construire mon contrôle')) + '</button></div>' +
      '<section class="domaine"><h3>' + esc(tx('Mes leçons')) + '</h3>' + (lig ? '<ul class="liste-chap cahier-lecons">' + lig + '</ul>' : '<p class="petit">' + esc(tx('Aucune leçon pour l’instant.')) + '</p>') + '</section>' +
      (ctl ? '<section class="domaine"><h3>' + esc(tx('Mes contrôles enregistrés')) + '</h3><ul class="liste-chap cahier-controles">' + ctl + '</ul></section>' : '') + '</main>');
  }
  function edition(id){
    const A = api(), esc = A.esc, c = cahier(), l = c.lecons.find(x => x.id === id) || { id:'', matiere:A.etatMatieres().derniere || 'autre', titre:'', texte:'', fiches:[] };
    const opts = matieres().map(([v, n]) => '<option value="' + esc(v) + '"' + (v === l.matiere ? ' selected' : '') + '>' + esc(n) + '</option>').join('');
    A.poser(A.barre('cahier') + '<main class="coin-anglais cahier-ecran"><h2>' + esc(l.id ? l.titre : tx('➕ Ajouter une leçon')) + '</h2>' +
      '<p><label>' + esc(tx('Matière')) + ' <select id="cahier-matiere">' + opts + '</select></label></p>' +
      '<p><label>' + esc(tx('Titre de la leçon')) + '<input id="cahier-titre" maxlength="120" value="' + esc(l.titre) + '"></label></p>' +
      '<p><label>' + esc(tx('Texte de la leçon (tapé ou collé)')) + '<textarea id="cahier-texte" rows="12" maxlength="' + MAX_TEXTE + '">' + esc(l.texte) + '</textarea></label></p>' +
      '<p><label>' + esc(tx('Mes fiches : une par ligne, sous la forme « question = réponse »')) + '<textarea id="cahier-fiches" rows="5" maxlength="6000">' + esc((l.fiches || []).map(f => f[0] + ' = ' + f[1]).join('\n')) + '</textarea></label></p>' +
      '<p id="cahier-erreur" class="petit" role="alert"></p>' +
      '<div class="actions serrees"><button class="moyen plein" data-a="cahier-enregistrer" data-v="' + esc(l.id) + '">' + esc(tx('💾 Enregistrer')) + '</button>' +
      (l.id ? '<button class="moyen" data-a="cahier-suppr" data-v="' + esc(l.id) + '">' + esc(tx('🗑️ Supprimer')) + '</button>' : '') + '</div></main>');
  }
  function enregistrer(id){
    const val = i => (document.getElementById(i) || {}).value || '';
    const titre = val('cahier-titre').trim().slice(0, 120), texte = val('cahier-texte').slice(0, MAX_TEXTE), f = lireFiches(val('cahier-fiches')), mat = val('cahier-matiere') || 'autre';
    if(!titre || (phrases(texte).length < 1 && f.length < 2)){ const e = document.getElementById('cahier-erreur'); if(e) e.textContent = tx('Il faut un titre et au moins quelques phrases ou deux fiches.'); return; }
    const c = cahier(); let l = c.lecons.find(x => x.id === id);
    if(!l){ if(c.lecons.length >= MAX_LECONS) c.lecons.shift(); l = { id:nouvelId('L') }; c.lecons.push(l); }
    Object.assign(l, { matiere:mat, titre, texte, fiches:f, date:new Date().toISOString().slice(0, 10) }); api().garder(); ecran();
  }
  function supprimer(liste, id){ const c = cahier(), x = c[liste].find(e => e.id === id); if(!x) return ecran();
    if(typeof confirm === 'function' && !confirm(tx('Supprimer définitivement « {0} » ?', x.titre))) return liste === 'lecons' ? edition(id) : ecran();
    c[liste] = c[liste].filter(e => e.id !== id); api().garder(); ecran(); }

  let brouillon = null;   // dernier contrôle fabriqué (pour « Enregistrer » et « Refaire »)
  function construire(){
    const A = api(), esc = A.esc, c = cahier(), e = A.etatMatieres(), mats = matieres();
    const mid = (brouillon && brouillon.mid) || e.derniere || (c.lecons[0] && c.lecons[0].matiere) || mats[0][0];
    const MT = window.MATIERES, m = MT && MT.trouver(mid), chaps = m ? MT.chapitres(mid, e.niveau).filter(x => !x.theme) : [];
    const lecons = c.lecons.filter(l => l.matiere === mid);
    const opts = mats.map(([v, n]) => '<option value="' + esc(v) + '"' + (v === mid ? ' selected' : '') + '>' + esc(n) + '</option>').join('');
    const serveur = !!M.serveur('controle.php'), accord = A.base().devoirsAccord === true;
    A.poser(A.barre('cahier') + '<main class="coin-anglais cahier-ecran"><h2>' + esc(tx('📝 Construire mon contrôle')) + '</h2>' +
      '<p><label>' + esc(tx('Matière')) + ' <select id="ctl-matiere">' + opts + '</select></label></p>' +
      '<fieldset class="cahier-choix"><legend>' + esc(tx('Ce qui est évalué')) + '</legend>' +
        (lecons.length ? '<p><strong>' + esc(tx('Mes leçons')) + '</strong></p>' + lecons.map(l => '<label class="case"><input type="checkbox" name="ctl-lecon" value="' + esc(l.id) + '" checked> ' + esc(l.titre) + '</label>').join('') : '<p class="petit">' + esc(tx('Aucune leçon pour l’instant.')) + '</p>') +
        (chaps.length ? '<p><strong>' + esc(tx('Chapitres de l’appli')) + '</strong></p>' + chaps.map(ch => '<label class="case"><input type="checkbox" name="ctl-chap" value="' + esc(ch.id) + '"> ' + esc(MT.nomChap(m, ch)) + '</label>').join('') : '') +
      '</fieldset>' +
      '<p><label>' + esc(tx('Nombre de questions')) + ' <select id="ctl-n">' + [5, 10, 15, 20].map(n => '<option' + (n === 10 ? ' selected' : '') + '>' + n + '</option>').join('') + '</select></label> ' +
      '<label>' + esc(tx('Durée')) + ' <select id="ctl-duree"><option value="0">' + esc(tx('sans limite')) + '</option>' + [10, 20, 30, 45, 60].map(n => '<option value="' + n + '">' + esc(tx('{0} min', n)) + '</option>').join('') + '</select></label></p>' +
      '<p id="ctl-erreur" class="petit" role="alert"></p>' +
      '<div class="actions serrees"><button class="moyen plein" data-a="cahier-lancer" data-v="local">' + esc(tx('▶ Fabriquer le contrôle')) + '</button>' +
      (serveur && accord ? '<button class="moyen" data-a="cahier-lancer" data-v="ia">' + esc(tx('✨ Questions variées par l’IA')) + '</button></div><p class="petit">🤖 ' + esc(tx('Le texte des leçons choisies part au serveur du jeu puis à l’IA (Anthropic) pour fabriquer les questions. Rien n’est gardé. L’IA peut se tromper : vérifie avec ta leçon.')) + '</p>'
        : '</div>' + (serveur ? '<p class="petit">' + esc(tx('Les questions par l’IA doivent d’abord être autorisées par un parent (Espace parents, aide aux devoirs).')) + '</p>' : '')) + '</main>');
    const s = document.getElementById('ctl-matiere'); if(s) s.addEventListener('change', () => { brouillon = { mid:s.value }; construire(); });
  }
  function choix(){
    const coches = n => [...document.querySelectorAll('input[name="' + n + '"]:checked')].map(i => i.value), val = i => (document.getElementById(i) || {}).value;
    const c = cahier(), ids = coches('ctl-lecon'); return { mid:val('ctl-matiere') || 'autre', lecons:c.lecons.filter(l => ids.includes(l.id)), chaps:coches('ctl-chap'), n:Math.max(5, Math.min(20, +val('ctl-n') || 10)), duree:Math.max(0, Math.min(60, +val('ctl-duree') || 0)) };
  }
  const erreur = m => { const e = document.getElementById('ctl-erreur'); if(e) e.textContent = m; };
  async function lancer(mode){
    const A = api(), ch = choix(); if(!ch.lecons.length && !ch.chaps.length) return erreur(tx('Choisis au moins une leçon ou un chapitre.'));
    let ia = [], note = '';
    if(mode === 'ia' && ch.lecons.length && A.base().devoirsAccord === true && M.serveur('controle.php')){
      erreur(tx('Plumo prépare les questions…'));
      const r = await M.envoyer('controle.php', Object.assign({ accord_parent:true, matiere:nomMatiere(ch.mid), niveau:A.etatMatieres().niveau, titre:ch.lecons.map(l => l.titre).join(' ; ').slice(0, 120),
        texte:ch.lecons.map(l => l.titre + '\n' + l.texte + '\n' + (l.fiches || []).map(f => f[0] + ' : ' + f[1]).join('\n')).join('\n\n').slice(0, 6000), n:Math.min(15, ch.n), langue:A.base().ui || 'fr' }, A.codePlumes()));
      if(r.ok && r.d && Array.isArray(r.d.questions)) ia = r.d.questions.filter(x => x && x.q && x.bon && Array.isArray(x.faux) && x.faux.length >= 3)
        .map((x, i) => q(ch.mid, 'cahier:ia:' + Date.now().toString(36) + i, '🤖 ' + ch.lecons[0].titre, String(x.q), String(x.bon), x.faux.slice(0, 3).map(String), String(x.regle || '')));
      else note = tx(r.statut === 402 ? 'Plus de plumes magiques : demande à un adulte (écran ✨ Plus).' : 'L’IA ne répond pas pour l’instant : voici un contrôle fabriqué sans IA.');
    }
    const sources = [ia, ...ch.lecons.map(l => questionsLocales([l], ch.mid)), questionsAppli(ch.mid, ch.chaps, ch.n)];
    const liste = assembler(sources, ch.n);
    if(liste.length < 3) return erreur(tx('Pas assez de matière pour des questions : ajoute des phrases à ta leçon (avec des dates, des nombres, des mots importants) ou des fiches.'));
    brouillon = { mid:ch.mid, liste, duree:ch.duree, titre:ch.lecons.length ? ch.lecons.map(l => l.titre).join(', ').slice(0, 80) : tx('Contrôle du {0}', new Date().toLocaleDateString()), note:null, id:null };
    passer(brouillon, note);
  }
  function passer(ctl, note){
    const A = api(); brouillon = ctl; if(note && A.annonce) try{ A.annonce(note); }catch(e){}
    A.questionsGo(ctl.liste.map(x => Object.assign({}, x)), Object.assign({ titre:tx('📝 Mon contrôle'), retour:'cahier', sansVanne:true, fin:z => fin(ctl, z) }, ctl.duree ? { finA:Date.now() + ctl.duree * 60000 } : {}));
  }
  const virg = n => String(Math.round(n * 10) / 10).replace('.', ',');
  function fin(ctl, z){
    const A = api(), esc = A.esc, n = z.liste.length, err = (z.reponses || []).filter(r => !r.juste), sans = z.liste.slice(z.i), note = Math.round(200 * z.bonnes / Math.max(1, n)) / 10;
    ctl.note = note; const c = cahier(), deja = ctl.id && c.controles.find(x => x.id === ctl.id); if(deja){ deja.note = note; A.garder(); }
    const item = (q, l2) => '<li><p>' + esc(q.enonce) + '</p>' + l2 + '<p>✅ ' + esc(tx('Bonne réponse :')) + ' ' + esc(q.bon) + '</p>' + (q.regle ? '<p class="petit">💡 ' + esc(q.regle) + '</p>' : '') + '</li>';
    A.poser(A.barre('cahier') + '<main class="centre trimestre-fin cahier-fin"><h2>' + esc(tx('📝 Mon contrôle')) + '</h2><p class="gros-score">' + esc(tx('Note : {0}/20', virg(note))) + '</p><p>' + esc(tx('{0} bonnes réponses sur {1}', z.bonnes, n)) + '</p>' +
      (err.length || sans.length ? '<h3>' + esc(tx('Corrigé')) + '</h3><ol class="correction-controle">' + err.map(r => item(r.q, '<p>❌ ' + esc(tx('Ta réponse :')) + ' ' + esc(r.choix) + '</p>')).join('') + sans.map(q => item(q, '<p>⏱️ ' + esc(tx('Pas de réponse (temps écoulé).')) + '</p>')).join('') + '</ol>' : '') +
      '<p id="ctl-statut" class="petit" role="status"></p><div class="actions serrees"><button class="moyen plein" data-a="cahier-refaire" data-v="' + esc(ctl.id || '') + '">' + esc(tx('🔁 Refaire ce contrôle')) + '</button>' +
      (deja ? '' : '<button class="moyen" data-a="cahier-garder">' + esc(tx('💾 Enregistrer ce contrôle')) + '</button>') + '<button class="moyen" data-a="cahier">' + esc(tx('📒 Mon cahier de leçons')) + '</button></div></main>');
  }
  function garderControle(){ if(!brouillon || !brouillon.liste) return ecran(); const c = cahier();
    if(!brouillon.id){ brouillon.id = nouvelId('C'); if(c.controles.length >= MAX_CONTROLES) c.controles.shift();
      c.controles.push({ id:brouillon.id, titre:brouillon.titre, mid:brouillon.mid, duree:brouillon.duree, note:brouillon.note, liste:brouillon.liste.map(x => JSON.parse(JSON.stringify(x))) }); api().garder(); }
    const s = document.getElementById('ctl-statut'); if(s) s.textContent = tx('Contrôle enregistré.');
    const b = document.querySelector('[data-a="cahier-garder"]'); if(b) b.remove(); }
  function refaire(id){ const c = cahier(), x = id ? c.controles.find(e => e.id === id) : brouillon; if(!x) return ecran();
    passer(Object.assign({}, x, { liste:melanger(x.liste.map(q => Object.assign({}, q, { faux:q.faux.map(f => Object.assign({}, f)) }))) })); }

  // ───── Cartes et actions ─────
  const carte = () => M.carte('cahier', '', '📒', api().esc(tx('📒 Mon cahier et mes contrôles')).replace(/^📒 /, ''), api().esc(tx('Range tes leçons, puis construis un contrôle comme ton prof')));
  if(!M.cartes.matiere) M.cartes.matiere = []; if(!M.cartes['matiere-ecran']) M.cartes['matiere-ecran'] = [];
  M.cartes.matiere.push(carte); M.cartes['matiere-ecran'].push(() => '<div class="cartes-anglais">' + carte() + '</div>');
  Object.assign(M.actions, {
    'cahier':() => ecran(), 'cahier-edit':v => edition(v || ''), 'cahier-enregistrer':v => enregistrer(v || ''),
    'cahier-suppr':v => supprimer('lecons', v), 'cahier-suppr-controle':v => supprimer('controles', v),
    'cahier-construire':() => { brouillon = null; construire(); }, 'cahier-lancer':v => lancer(v === 'ia' ? 'ia' : 'local'),
    'cahier-garder':() => garderControle(), 'cahier-refaire':v => refaire(v)
  });
  window.AMI_CAHIER = { trous, fiches, questionsLocales, lireFiches, phrases, candidats, assembler, cahier };
})();
