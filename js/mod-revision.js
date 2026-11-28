// v6.71 : apprendre pour de bon.
//  · « 🗓️ Révision du jour » : les questions ratées (maths et matières) reviennent au bon moment
//    — le lendemain, puis 3, 7 et 21 jours plus tard (révision espacée) ;
//  · « ✍️ Réponse écrite » : l'élève écrit d'abord sa réponse, les choix ne viennent qu'ensuite (rappel actif) ;
//  · « 🚩 Signaler une erreur » : la liste des questions signalées, à relire dans l'Espace parents.
// Tout reste sur l'appareil : rien n'est envoyé.
(function(){
  const M = window.AMI_MODULES; if(!M) return;
  ['maths', 'matiere', 'parents'].forEach(z => { if(!M.cartes[z]) M.cartes[z] = []; });
  const api = () => M.api, tx = (...a) => M.tx(...a), N = 20;

  M.textes({
    '🗓️ Révision du jour ({0})':['🗓️ Today’s review ({0})', '🗓️ Repaso del día ({0})', '🗓️ Heutige Wiederholung ({0})', '🗓️ Ripasso del giorno ({0})', '🗓️ Revisão do dia ({0})'],
    'Les questions ratées reviennent le lendemain, puis 3, 7 et 21 jours après : 10 minutes suffisent.':['Missed questions come back the next day, then 3, 7 and 21 days later: 10 minutes is enough.', 'Las preguntas falladas vuelven al día siguiente y luego a los 3, 7 y 21 días: bastan 10 minutos.', 'Verpasste Fragen kommen am nächsten Tag wieder, dann nach 3, 7 und 21 Tagen: 10 Minuten reichen.', 'Le domande sbagliate tornano il giorno dopo, poi dopo 3, 7 e 21 giorni: bastano 10 minuti.', 'As perguntas erradas voltam no dia seguinte e depois 3, 7 e 21 dias mais tarde: chegam 10 minutos.'],
    '✍️ Réponse écrite : activée':['✍️ Written answer: on', '✍️ Respuesta escrita: activada', '✍️ Schriftliche Antwort: an', '✍️ Risposta scritta: attiva', '✍️ Resposta escrita: ativada'],
    '✍️ Réponse écrite : désactivée':['✍️ Written answer: off', '✍️ Respuesta escrita: desactivada', '✍️ Schriftliche Antwort: aus', '✍️ Risposta scritta: disattivata', '✍️ Resposta escrita: desativada'],
    'Écrire la réponse avant de voir les choix : c’est plus dur, et on retient bien mieux. +1 plume si c’est juste.':['Write the answer before seeing the choices: it is harder, and you remember much better. +1 feather if it is right.', 'Escribe la respuesta antes de ver las opciones: es más difícil y se recuerda mucho mejor. +1 pluma si es correcta.', 'Schreib die Antwort, bevor du die Auswahl siehst: Das ist schwerer, und man merkt es sich viel besser. +1 Feder, wenn es stimmt.', 'Scrivi la risposta prima di vedere le scelte: è più difficile e si ricorda molto meglio. +1 piuma se è giusta.', 'Escreve a resposta antes de ver as opções: é mais difícil e lembras-te muito melhor. +1 pena se estiver certa.'],
    '🗓️ Révision du jour':['🗓️ Today’s review', '🗓️ Repaso del día', '🗓️ Heutige Wiederholung', '🗓️ Ripasso del giorno', '🗓️ Revisão do dia'],
    'Rien à revoir aujourd’hui : reviens demain !':['Nothing to review today: come back tomorrow!', 'Nada que repasar hoy: ¡vuelve mañana!', 'Heute gibt es nichts zu wiederholen: Komm morgen wieder!', 'Niente da ripassare oggi: torna domani!', 'Nada para rever hoje: volta amanhã!'],
    'Révision terminée : {0} / {1}':['Review finished: {0} / {1}', 'Repaso terminado: {0} / {1}', 'Wiederholung beendet: {0} / {1}', 'Ripasso finito: {0} / {1}', 'Revisão terminada: {0} / {1}'],
    'Questions maîtrisées : {0}. À revoir plus tard : {1}.':['Questions mastered: {0}. To review later: {1}.', 'Preguntas dominadas: {0}. Para repasar más tarde: {1}.', 'Beherrschte Fragen: {0}. Später wiederholen: {1}.', 'Domande padroneggiate: {0}. Da ripassare più tardi: {1}.', 'Perguntas dominadas: {0}. Para rever mais tarde: {1}.'],
    'Toutes les questions ratées : elles reviennent jusqu’à ce qu’elles soient maîtrisées':['All the questions you missed: they come back until you master them', 'Todas las preguntas falladas: vuelven hasta que las domines', 'Alle verpassten Fragen: Sie kommen wieder, bis du sie beherrschst', 'Tutte le domande sbagliate: tornano finché non le padroneggi', 'Todas as perguntas erradas: voltam até as dominares'],
    'Avant de répondre :':['Before you answer:', 'Antes de responder:', 'Bevor du antwortest:', 'Prima di rispondere:', 'Antes de responder:'],
    'Sûr(e)':['Sure', 'Seguro/a', 'Sicher', 'Sicuro/a', 'Certo/a'],
    'Pas sûr(e)':['Not sure', 'No estoy seguro/a', 'Nicht sicher', 'Non sicuro/a', 'Não tenho a certeza'],
    'Tu étais sûr(e) de toi : c’est l’erreur à retenir en priorité. Relis bien la règle.':['You were sure of yourself: this is the mistake to remember first. Read the rule carefully.', 'Estabas seguro/a: es el error que hay que recordar primero. Lee bien la regla.', 'Du warst dir sicher: Diesen Fehler solltest du dir zuerst merken. Lies die Regel genau.', 'Eri sicuro/a: è l’errore da ricordare per primo. Rileggi bene la regola.', 'Tinhas a certeza: é o erro a lembrar primeiro. Relê bem a regra.'],
    'Juste, mais tu hésitais : cette question reviendra demain pour bien l’ancrer.':['Right, but you hesitated: this question will come back tomorrow to make it stick.', 'Correcto, pero dudabas: esta pregunta volverá mañana para fijarla bien.', 'Richtig, aber du hast gezögert: Diese Frage kommt morgen wieder, damit sie sitzt.', 'Giusto, ma esitavi: questa domanda tornerà domani per fissarla bene.', 'Certo, mas hesitaste: esta pergunta volta amanhã para ficar bem fixada.'],
    '🎯 Lucidité':['🎯 Self-awareness', '🎯 Lucidez', '🎯 Selbsteinschätzung', '🎯 Lucidità', '🎯 Lucidez'],
    'Réponses « sûr(e) » justes : {0} % ({1} réponses). Réponses justes malgré un doute : {2}.':['“Sure” answers that were right: {0}% ({1} answers). Right answers despite a doubt: {2}.', 'Respuestas «seguro/a» correctas: {0} % ({1} respuestas). Respuestas correctas pese a una duda: {2}.', '„Sicher“-Antworten, die richtig waren: {0} % ({1} Antworten). Richtige Antworten trotz Zweifel: {2}.', 'Risposte «sicuro/a» giuste: {0} % ({1} risposte). Risposte giuste nonostante un dubbio: {2}.', 'Respostas «certo/a» certas: {0} % ({1} respostas). Respostas certas apesar de uma dúvida: {2}.'],
    'Savoir quand on sait est une compétence : une erreur faite avec certitude est la plus importante à revoir.':['Knowing when you know is a skill: a mistake made with certainty is the most important one to review.', 'Saber cuándo se sabe es una competencia: un error cometido con seguridad es el más importante de repasar.', 'Zu wissen, wann man etwas weiß, ist eine Fähigkeit: Ein Fehler, den man sicher gemacht hat, ist am wichtigsten zu wiederholen.', 'Sapere quando si sa è una competenza: un errore fatto con certezza è il più importante da ripassare.', 'Saber quando se sabe é uma competência: um erro cometido com certeza é o mais importante a rever.'],
    'Retour':['Back', 'Volver', 'Zurück', 'Indietro', 'Voltar'],
    '✍️ Écris ta réponse':['✍️ Write your answer', '✍️ Escribe tu respuesta', '✍️ Schreib deine Antwort', '✍️ Scrivi la tua risposta', '✍️ Escreve a tua resposta'],
    'Réponse attendue : un seul mot.':['Expected answer: one word.', 'Respuesta esperada: una sola palabra.', 'Erwartete Antwort: ein Wort.', 'Risposta attesa: una sola parola.', 'Resposta esperada: uma só palavra.'],
    'Réponse attendue : {0} mots.':['Expected answer: {0} words.', 'Respuesta esperada: {0} palabras.', 'Erwartete Antwort: {0} Wörter.', 'Risposta attesa: {0} parole.', 'Resposta esperada: {0} palavras.'],
    'Pas grave ! Voici les propositions : choisis celle qui te semble juste. La correction t’expliquera pourquoi.':['No problem! Here are the choices: pick the one that seems right. The correction will explain why.', '¡No pasa nada! Aquí tienes las opciones: elige la que te parezca correcta. La corrección te explicará por qué.', 'Kein Problem! Hier ist die Auswahl: Wähl die Antwort, die dir richtig scheint. Die Korrektur erklärt dir, warum.', 'Nessun problema! Ecco le scelte: scegli quella che ti sembra giusta. La correzione ti spiegherà perché.', 'Não faz mal! Aqui estão as opções: escolhe a que te parece certa. A correção vai explicar porquê.'],
    'Comment répondre ?':['How do I answer?', '¿Cómo responder?', 'Wie antworte ich?', 'Come rispondere?', 'Como responder?'],
    'Ce qu’il faut savoir pour répondre :':['What you need to know to answer:', 'Lo que hay que saber para responder:', 'Was du zum Antworten wissen musst:', 'Cosa sapere per rispondere:', 'O que precisas de saber para responder:'],
    'La leçon':['The lesson', 'La lección', 'Die Lektion', 'La lezione', 'A lição'],
    'Méthode :':['Method:', 'Método:', 'Methode:', 'Metodo:', 'Método:'],
    'Après ta réponse, la correction t’explique cette question en détail.':['After you answer, the correction explains this question in detail.', 'Después de responder, la corrección te explica esta pregunta en detalle.', 'Nach deiner Antwort erklärt dir die Korrektur diese Frage genau.', 'Dopo la risposta, la correzione ti spiega questa domanda nei dettagli.', 'Depois de responderes, a correção explica-te esta pergunta em pormenor.'],
    'Une nouvelle version d’Ami des mots est prête.':['A new version of Ami des mots is ready.', 'Hay una nueva versión de Ami des mots lista.', 'Eine neue Version von Ami des mots ist bereit.', 'Una nuova versione di Ami des mots è pronta.', 'Uma nova versão do Ami des mots está pronta.'],
    'Mettre à jour':['Update', 'Actualizar', 'Aktualisieren', 'Aggiorna', 'Atualizar'],
    'Plus tard':['Later', 'Más tarde', 'Später', 'Più tardi', 'Mais tarde'],
    'Valider':['Check', 'Comprobar', 'Prüfen', 'Verifica', 'Validar'],
    'Je ne sais pas : montre les choix':['I don’t know: show the choices', 'No lo sé: muestra las opciones', 'Ich weiß es nicht: Zeig die Auswahl', 'Non lo so: mostra le scelte', 'Não sei: mostra as opções'],
    'Réponse écrite juste : +1 plume bonus !':['Written answer correct: +1 bonus feather!', 'Respuesta escrita correcta: ¡+1 pluma extra!', 'Schriftliche Antwort richtig: +1 Bonusfeder!', 'Risposta scritta giusta: +1 piuma bonus!', 'Resposta escrita certa: +1 pena de bónus!'],
    'Orthographe exacte :':['Exact spelling:', 'Ortografía exacta:', 'Genaue Schreibweise:', 'Ortografia esatta:', 'Ortografia exata:'],
    'Pas tout à fait':['Not quite', 'No del todo', 'Nicht ganz', 'Non proprio', 'Não exatamente'],
    'Choisis maintenant parmi les propositions.':['Now pick from the choices.', 'Ahora elige entre las opciones.', 'Wähle jetzt aus der Auswahl.', 'Ora scegli tra le proposte.', 'Agora escolhe entre as opções.'],
    'Signaler une erreur':['Report a mistake', 'Señalar un error', 'Einen Fehler melden', 'Segnala un errore', 'Assinalar um erro'],
    'Merci ! La question est notée pour être vérifiée.':['Thank you! The question has been noted for checking.', '¡Gracias! La pregunta queda anotada para revisarla.', 'Danke! Die Frage wird zur Prüfung notiert.', 'Grazie! La domanda è annotata per essere verificata.', 'Obrigado! A pergunta ficou anotada para ser verificada.'],
    '🚩 Questions signalées ({0})':['🚩 Reported questions ({0})', '🚩 Preguntas señaladas ({0})', '🚩 Gemeldete Fragen ({0})', '🚩 Domande segnalate ({0})', '🚩 Perguntas assinaladas ({0})'],
    'Les questions que l’enfant pense fausses. Elles restent sur cet appareil : vous pouvez les relire et nous les transmettre.':['Questions your child thinks are wrong. They stay on this device: you can read them and pass them on to us.', 'Las preguntas que su hijo cree erróneas. Se quedan en este dispositivo: puede leerlas y enviárnoslas.', 'Fragen, die Ihr Kind für falsch hält. Sie bleiben auf diesem Gerät: Sie können sie lesen und an uns weitergeben.', 'Le domande che il bambino ritiene sbagliate. Restano su questo dispositivo: può rileggerle e inviarcele.', 'As perguntas que a criança acha erradas. Ficam neste dispositivo: pode relê-las e enviá-las-nos.'],
    'Vider la liste':['Clear the list', 'Vaciar la lista', 'Liste leeren', 'Svuota la lista', 'Esvaziar a lista'],
    'Réponse attendue :':['Expected answer:', 'Respuesta esperada:', 'Erwartete Antwort:', 'Risposta attesa:', 'Resposta esperada:'],
    'Ta réponse a été ajoutée à la révision du jour.':['Your answer has been added to today’s review.', 'Tu respuesta se ha añadido al repaso del día.', 'Deine Antwort wurde zur heutigen Wiederholung hinzugefügt.', 'La tua risposta è stata aggiunta al ripasso del giorno.', 'A tua resposta foi adicionada à revisão do dia.']
  });

  const dus = () => api().carnetAujourdhui('fr');   // v6.89 : la révision du jour appartient au programme français (chaque pays a ses erreurs)
  const carteRevision = ecran => { const n = dus().length; return n ? '<div class="cartes-anglais">' + M.carte('revision-jour', ecran, '🗓️', api().esc(tx('🗓️ Révision du jour ({0})', n)).replace(/^🗓️ /, ''), api().esc(tx('Les questions ratées reviennent le lendemain, puis 3, 7 et 21 jours après : 10 minutes suffisent.'))) + '</div>' : ''; };
  const carteLibre = ecran => { const on = api().J().reponseLibre === true;
    return '<div class="cartes-anglais">' + M.carte('reponse-libre', ecran, '✍️', api().esc(tx(on ? '✍️ Réponse écrite : activée' : '✍️ Réponse écrite : désactivée')).replace(/^✍️ /, ''), api().esc(tx('Écrire la réponse avant de voir les choix : c’est plus dur, et on retient bien mieux. +1 plume si c’est juste.'))) + '</div>'; };
  M.cartes.matiere.unshift(() => carteRevision('matieres'), () => carteLibre('matieres'));
  M.cartes.maths.push(() => carteRevision('maths'), () => carteLibre('maths'));

  function revision(retour){
    const A = api(), l = dus().slice(0, N);
    if(!l.length) return A.poser(A.barre('matieres') + '<main class="centre"><h2>' + A.esc(tx('🗓️ Révision du jour')) + '</h2><p>' + A.esc(tx('Rien à revoir aujourd’hui : reviens demain !')) + '</p></main>');
    const maitrisesAvant = Math.floor(+A.J().carnetMaitrises) || 0;
    A.questionsGo(l.map(x => Object.assign({}, x, { faux:x.faux.map(f => Object.assign({}, f)) })), { titre:tx('🗓️ Révision du jour'), retour:retour || 'matieres',
      fin:z => {
        const j = A.J(), maitrises = (Math.floor(+j.carnetMaitrises) || 0) - maitrisesAvant;
        A.garder();
        A.poser(A.barre(retour || 'matieres') + '<main class="centre fin-revision"><div class="ami-moyen">' + A.ami(z.bonnes >= z.liste.length * .7 ? 'fete' : 'malin') + '</div>' +
          '<h2>' + A.esc(tx('Révision terminée : {0} / {1}', z.bonnes, z.liste.length)) + '</h2>' +
          '<p>' + A.esc(tx('Questions maîtrisées : {0}. À revoir plus tard : {1}.', maitrises, (j.carnet || []).length)) + '</p>' +
          '<div class="actions"><button class="moyen plein" data-a="' + (retour === 'maths' ? 'maths' : 'matieres') + '">' + A.esc(tx('Retour')) + '</button></div></main>');
      } });
  }

  M.cartes.parents.push(() => {
    const A = api(), c = A.J().confiance; if(!c || typeof c !== 'object') return '';
    const sj = Math.floor(+c.surJuste) || 0, sf = Math.floor(+c.surFaux) || 0, dj = Math.floor(+c.douteJuste) || 0, n = sj + sf; if(n + dj + (Math.floor(+c.douteFaux) || 0) < 5) return '';
    return '<section class="lucidite"><h3>' + A.esc(tx('🎯 Lucidité')) + '</h3><p>' + A.esc(tx('Réponses « sûr(e) » justes : {0} % ({1} réponses). Réponses justes malgré un doute : {2}.', n ? Math.round(100 * sj / n) : 0, n, dj)) + '</p><p class="petit">' + A.esc(tx('Savoir quand on sait est une compétence : une erreur faite avec certitude est la plus importante à revoir.')) + '</p></section>';
  });
  M.cartes.parents.push(() => {
    const A = api(), l = Array.isArray(A.base().signalements) ? A.base().signalements : []; if(!l.length) return '';
    return '<section class="signalements"><h3>' + A.esc(tx('🚩 Questions signalées ({0})', l.length)) + '</h3><p class="petit">' + A.esc(tx('Les questions que l’enfant pense fausses. Elles restent sur cet appareil : vous pouvez les relire et nous les transmettre.')) + '</p>' +
      '<ol class="liste-signalements">' + l.slice(-50).reverse().map(x => '<li><strong>' + A.esc(x.matiere) + (x.chap ? ' · ' + A.esc(x.chap) : '') + '</strong> (' + A.esc(x.jour) + ')<br>' + A.esc(x.enonce) + '<br><em>' + A.esc(tx('Réponse attendue :')) + '</em> ' + A.esc(x.bon) + '</li>').join('') + '</ol>' +
      '<button class="petit-bouton" data-a="signalements-vider">' + A.esc(tx('Vider la liste')) + '</button></section>';
  });

  Object.assign(M.actions, {
    'revision-jour':v => revision(v === 'maths' ? 'maths' : 'matieres'),
    'reponse-libre':v => { const A = api(), j = A.J(); j.reponseLibre = j.reponseLibre !== true; A.garder(); return v === 'maths' ? A.mathsAccueil() : A.matieresAccueil(); },
    'signalements-vider':(v, b) => { const A = api(); A.base().signalements = []; A.garder(); const s = b && b.closest('.signalements'); if(s) s.remove(); }
  });
  window.AMI_REVISION = { revision };
})();
