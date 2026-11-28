// Ami des mots — v7.7 : 🖊️ RÉDIGER SA COPIE (bac de français : commentaire ou dissertation) et la faire corriger EN EXPLIQUANT.
// • Depuis l'écran du sujet, l'élève choisit « Rédiger ma copie » : brouillon + copie, chrono des 4 heures du bac,
//   enregistrement automatique dans l'appareil (sauvegarde du jeu). Il peut s'arrêter et reprendre plus tard (« Mes copies »).
// • Correction sans IA, gratuite : l'appli vérifie la forme attendue au bac (longueur, introduction avec problématique
//   et annonce du plan, parties, conclusion, citations, analyse, connecteurs, lien avec le sujet, registre) et explique chaque point.
//   Ce n'est pas une note : c'est une liste de vérifications.
// • En option, correction détaillée par l'IA (serveur-php/copie.php) : barème du bac sur 20 en quatre critères, points forts,
//   passages à retravailler expliqués, remarques de langue. Seulement avec l'accord d'un parent (le même que pour l'aide aux devoirs) ;
//   5 plumes si les plumes sont allumées. L'IA explique, elle ne réécrit pas la copie.
(function(){
  'use strict';
  const M = window.AMI_MODULES; if(!M) return;
  const api = () => M.api, tx = (...a) => M.tx(...a);
  M.textes({
    '🖊️ Rédiger ma copie':['🖊️ Write my paper', '🖊️ Redactar mi ejercicio', '🖊️ Meine Arbeit schreiben', '🖊️ Scrivere il mio elaborato', '🖊️ Escrever a minha prova'],
    '🖊️ Ma copie':['🖊️ My paper', '🖊️ Mi ejercicio', '🖊️ Meine Arbeit', '🖊️ Il mio elaborato', '🖊️ A minha prova'],
    '🖊️ Mes copies':['🖊️ My papers', '🖊️ Mis ejercicios', '🖊️ Meine Arbeiten', '🖊️ I miei elaborati', '🖊️ As minhas provas'],
    'Reprends une copie commencée ou relis ses corrections':['Pick up a paper you started or reread its feedback', 'Retoma un ejercicio empezado o relee sus correcciones', 'Setze eine begonnene Arbeit fort oder lies die Korrekturen', 'Riprendi un elaborato iniziato o rileggi le correzioni', 'Retoma uma prova começada ou relê as correções'],
    'Aucune copie pour l’instant.':['No papers yet.', 'Todavía no hay ejercicios.', 'Noch keine Arbeit.', 'Ancora nessun elaborato.', 'Ainda não há provas.'],
    'Brouillon (problématique, plan, idées, citations)':['Draft (main question, plan, ideas, quotations)', 'Borrador (problemática, plan, ideas, citas)', 'Entwurf (Leitfrage, Gliederung, Ideen, Zitate)', 'Brutta copia (problematica, scaletta, idee, citazioni)', 'Rascunho (problemática, plano, ideias, citações)'],
    'Ta copie (laisse une ligne vide entre les paragraphes)':['Your paper (leave a blank line between paragraphs)', 'Tu ejercicio (deja una línea en blanco entre los párrafos)', 'Deine Arbeit (lass eine Leerzeile zwischen den Absätzen)', 'Il tuo elaborato (lascia una riga vuota tra i paragrafi)', 'A tua prova (deixa uma linha em branco entre os parágrafos)'],
    '{0} mots':['{0} words', '{0} palabras', '{0} Wörter', '{0} parole', '{0} palavras'],
    'Enregistré dans cet appareil.':['Saved on this device.', 'Guardado en este dispositivo.', 'Auf diesem Gerät gespeichert.', 'Salvato su questo dispositivo.', 'Guardado neste aparelho.'],
    '⏱️ Il reste {0} h {1} min sur les {2} de l’épreuve.':['⏱️ {0} h {1} min left out of the {2} of the exam.', '⏱️ Quedan {0} h {1} min de las {2} de la prueba.', '⏱️ Noch {0} Std. {1} Min. von {2} Prüfungszeit.', '⏱️ Restano {0} h {1} min sulle {2} della prova.', '⏱️ Faltam {0} h {1} min das {2} da prova.'],
    '⏱️ Le temps de l’épreuve ({0}) est dépassé : à l’examen, la copie serait ramassée.':['⏱️ The exam time ({0}) is over: in the real exam, your paper would be collected.', '⏱️ El tiempo de la prueba ({0}) ha pasado: en el examen real, recogerían tu ejercicio.', '⏱️ Die Prüfungszeit ({0}) ist vorbei: In der echten Prüfung würde die Arbeit eingesammelt.', '⏱️ Il tempo della prova ({0}) è scaduto: all’esame vero l’elaborato verrebbe ritirato.', '⏱️ O tempo da prova ({0}) passou: no exame a sério, a prova seria recolhida.'],
    '⏱️ Chrono officiel : il reste {0} h {1} min pour rendre ta copie.':['⏱️ Official timer: {0} h {1} min left to hand in your paper.', '⏱️ Cronómetro oficial: quedan {0} h {1} min para entregar tu ejercicio.', '⏱️ Offizielle Zeit: Noch {0} Std. {1} Min. bis zur Abgabe.', '⏱️ Cronometro ufficiale: restano {0} h {1} min per consegnare l’elaborato.', '⏱️ Cronómetro oficial: faltam {0} h {1} min para entregar a prova.'],
    '⏱️ Temps écoulé : rends ta copie.':['⏱️ Time is up: hand in your paper.', '⏱️ Se acabó el tiempo: entrega tu ejercicio.', '⏱️ Die Zeit ist um: Gib deine Arbeit ab.', '⏱️ Tempo scaduto: consegna l’elaborato.', '⏱️ O tempo acabou: entrega a tua prova.'],
    '📤 Rendre ma copie et continuer':['📤 Hand in my paper and continue', '📤 Entregar mi ejercicio y continuar', '📤 Arbeit abgeben und weiter', '📤 Consegna l’elaborato e continua', '📤 Entregar a prova e continuar'],
    '✅ Vérifier ma copie (sans IA)':['✅ Check my paper (no AI)', '✅ Revisar mi ejercicio (sin IA)', '✅ Arbeit prüfen (ohne KI)', '✅ Controlla il mio elaborato (senza IA)', '✅ Verificar a minha prova (sem IA)'],
    '✨ Correction détaillée par l’IA':['✨ Detailed AI marking', '✨ Corrección detallada por la IA', '✨ Ausführliche Korrektur durch die KI', '✨ Correzione dettagliata dall’IA', '✨ Correção detalhada pela IA'],
    '💾 Enregistrer et quitter':['💾 Save and leave', '💾 Guardar y salir', '💾 Speichern und verlassen', '💾 Salva ed esci', '💾 Guardar e sair'],
    'Ta copie part au serveur du jeu puis à l’IA (Anthropic) pour être corrigée. Rien n’est gardé. L’IA peut se tromper : c’est une estimation, pas une note d’examen. N’écris ni ton nom ni ton école.':['Your paper goes to the game server and then to the AI (Anthropic) to be marked. Nothing is kept. The AI can make mistakes: it is an estimate, not an exam mark. Do not write your name or school.', 'Tu ejercicio va al servidor del juego y luego a la IA (Anthropic) para ser corregido. No se guarda nada. La IA puede equivocarse: es una estimación, no una nota de examen. No escribas tu nombre ni tu colegio.', 'Deine Arbeit geht an den Spielserver und dann an die KI (Anthropic) zur Korrektur. Nichts wird gespeichert. Die KI kann sich irren: Es ist eine Schätzung, keine Prüfungsnote. Schreib weder deinen Namen noch deine Schule.', 'Il tuo elaborato va al server del gioco e poi all’IA (Anthropic) per essere corretto. Non viene conservato nulla. L’IA può sbagliare: è una stima, non un voto d’esame. Non scrivere il tuo nome né la tua scuola.', 'A tua prova vai para o servidor do jogo e depois para a IA (Anthropic) para ser corrigida. Nada é guardado. A IA pode enganar-se: é uma estimativa, não uma nota de exame. Não escrevas o teu nome nem a tua escola.'],
    'La correction par l’IA doit d’abord être autorisée par un parent (Espace parents, aide aux devoirs).':['AI marking must first be allowed by a parent (Parents’ area, homework help).', 'La corrección por IA debe ser autorizada antes por un padre o madre (Espacio padres, ayuda con los deberes).', 'Die KI-Korrektur muss zuerst von einem Elternteil erlaubt werden (Elternbereich, Hausaufgabenhilfe).', 'La correzione dell’IA deve prima essere autorizzata da un genitore (Area genitori, aiuto compiti).', 'A correção pela IA tem de ser autorizada primeiro por um pai ou mãe (Espaço pais, ajuda nos trabalhos de casa).'],
    'Coût : {0} plumes.':['Cost: {0} feathers.', 'Coste: {0} plumas.', 'Kosten: {0} Federn.', 'Costo: {0} piume.', 'Custo: {0} penas.'],
    'L’IA corrige des copies d’au moins {0} mots : continue d’écrire !':['The AI marks papers of at least {0} words: keep writing!', 'La IA corrige ejercicios de al menos {0} palabras: ¡sigue escribiendo!', 'Die KI korrigiert Arbeiten ab {0} Wörtern: Schreib weiter!', 'L’IA corregge elaborati di almeno {0} parole: continua a scrivere!', 'A IA corrige provas com pelo menos {0} palavras: continua a escrever!'],
    'Plumo lit ta copie…':['Plumo is reading your paper…', 'Plumo lee tu ejercicio…', 'Plumo liest deine Arbeit…', 'Plumo legge il tuo elaborato…', 'O Plumo está a ler a tua prova…'],
    'L’IA ne répond pas pour l’instant. Tes plumes ont été rendues ; réessaie plus tard.':['The AI is not answering right now. Your feathers were given back; try again later.', 'La IA no responde por ahora. Te devolvimos las plumas; inténtalo más tarde.', 'Die KI antwortet gerade nicht. Deine Federn wurden zurückgegeben; versuch es später.', 'L’IA non risponde per ora. Le piume ti sono state restituite; riprova più tardi.', 'A IA não responde de momento. As penas foram devolvidas; tenta mais tarde.'],
    'Plus de plumes magiques : demande à un adulte (écran ✨ Plus).':['No more magic feathers: ask an adult (✨ Plus screen).', 'No quedan plumas mágicas: pide ayuda a un adulto (pantalla ✨ Plus).', 'Keine Zauberfedern mehr: Frag einen Erwachsenen (Bildschirm ✨ Plus).', 'Niente più piume magiche: chiedi a un adulto (schermata ✨ Plus).', 'Já não há penas mágicas: pede a um adulto (ecrã ✨ Plus).'],
    'Vérification de ta copie':['Checking your paper', 'Revisión de tu ejercicio', 'Prüfung deiner Arbeit', 'Controllo del tuo elaborato', 'Verificação da tua prova'],
    '{0} points de méthode réussis sur {1}. Ce n’est pas une note : c’est ce qu’un correcteur regarde en premier.':['{0} of {1} method points met. This is not a mark: it is what an examiner looks at first.', '{0} de {1} puntos de método logrados. No es una nota: es lo primero que mira un corrector.', '{0} von {1} Methodenpunkten erfüllt. Das ist keine Note: Darauf schaut ein Prüfer zuerst.', '{0} punti di metodo riusciti su {1}. Non è un voto: è ciò che un correttore guarda per primo.', '{0} pontos de método conseguidos em {1}. Não é uma nota: é o que um corretor vê primeiro.'],
    'Correction de Plumo (IA)':['Plumo’s marking (AI)', 'Corrección de Plumo (IA)', 'Plumos Korrektur (KI)', 'Correzione di Plumo (IA)', 'Correção do Plumo (IA)'],
    'Note estimée : {0}/20':['Estimated mark: {0}/20', 'Nota estimada: {0}/20', 'Geschätzte Note: {0}/20', 'Voto stimato: {0}/20', 'Nota estimada: {0}/20'],
    'Ce qui est réussi':['What works', 'Lo que está logrado', 'Was gelungen ist', 'Ciò che è riuscito', 'O que está conseguido'],
    'À retravailler':['To work on', 'Para mejorar', 'Zu überarbeiten', 'Da migliorare', 'A melhorar'],
    'Langue':['Language', 'Lengua', 'Sprache', 'Lingua', 'Língua'],
    'Le conseil pour la prochaine copie':['The tip for your next paper', 'El consejo para el próximo ejercicio', 'Der Tipp für die nächste Arbeit', 'Il consiglio per il prossimo elaborato', 'O conselho para a próxima prova'],
    '✏️ Reprendre ma copie':['✏️ Back to my paper', '✏️ Volver a mi ejercicio', '✏️ Zurück zu meiner Arbeit', '✏️ Torna al mio elaborato', '✏️ Voltar à minha prova'],
    '🗑️ Supprimer':['🗑️ Delete', '🗑️ Eliminar', '🗑️ Löschen', '🗑️ Elimina', '🗑️ Apagar'],
    'Supprimer définitivement « {0} » ?':['Permanently delete “{0}”?', '¿Eliminar definitivamente «{0}»?', '„{0}“ endgültig löschen?', 'Eliminare definitivamente «{0}»?', 'Apagar definitivamente «{0}»?'],
    'Dernière correction : {0}/20':['Last marking: {0}/20', 'Última corrección: {0}/20', 'Letzte Korrektur: {0}/20', 'Ultima correzione: {0}/20', 'Última correção: {0}/20']
  });

  // ───── Données ─────
  const MAX = 30, MAX_TEXTE = 24000;
  function copies(){ const j = api().J(); if(!j.copies || typeof j.copies !== 'object' || Array.isArray(j.copies)) j.copies = {}; return j.copies; }
  function depuisEpreuve(ep, choix){
    if(!ep || !ep.sujets) return null; const S = ep.sujets, m = /^dis(\d)$/.exec(choix || ''), d = m && S.dis[+m[1]];
    const T = window.EPREUVES && EPREUVES._test, cles = d && T && T.DISSERTATIONS[d.idx] ? T.DISSERTATIONS[d.idx][2] : '';
    return d ? { key:'eaf:d' + d.idx, sorte:'dissertation', titre:'Dissertation — « ' + d.oeuvre + ' »', sujet:d.sujet, texteSujet:'', oeuvre:d.auteur + ', « ' + d.oeuvre + ' » — parcours « ' + d.parcours + ' »', cles, titreOeuvre:d.oeuvre }
      : { key:'eaf:c' + S.com.idx, sorte:'commentaire', titre:'Commentaire — « ' + S.com.titre + ' »', sujet:'Vous commenterez ce texte (objet d’étude : ' + S.com.objet + ').', texteSujet:'« ' + S.com.titre + ' »\n' + S.com.texte, oeuvre:'', cles:'', titreOeuvre:'' };
  }
  const NIVEAU = { commentaire:'1re', dissertation:'1re', philo:'Tle', redaction:'3e', developpement:'3e', ses:'Tle', hggsp:'Tle', 'hggsp-etude':'Tle', synthese:'Sup' }, COURTS = ['redaction', 'developpement'];
  // v7.8 : les autres écrits d'examen (rédaction du brevet, développement construit d'histoire-géo, dissertation de philosophie).
  function depuisEcrit(ep, i){ const e = ep && ep.ecrits && ep.ecrits[+i]; if(!e) return null;
    return { key:'ecrit:' + e.key, sorte:e.sorte, genre:e.genre || '', titre:e.titre, sujet:e.sujet, texteSujet:e.texteSujet || '', oeuvre:'', cles:'', titreOeuvre:'', duree:e.duree || 240 }; }
  function ouvrir(info){
    const c = copies(); let x = c[info.key];
    if(!x){ const cles = Object.keys(c); if(cles.length >= MAX){ cles.sort((a, b) => (c[a].maj || 0) - (c[b].maj || 0)); delete c[cles[0]]; }
      x = c[info.key] = Object.assign({ brouillon:'', texte:'', debut:Date.now(), maj:Date.now(), corrections:[], duree:240 }, info); api().garder(); }
    return x;
  }

  // ───── Vérification sans IA : la forme attendue au bac, expliquée ─────
  const compte = (t, re) => (String(t).match(re) || []).length;
  // Seuils par type d'écrit : longueur visée, longueur « trop court », nombre de paragraphes, connecteurs.
  const PROFILS = {
    commentaire:{ mots:900, court:400, paras:5, connect:8, pages:'souvent 4 à 6 pages, soit environ 1 000 à 1 800 mots' },
    dissertation:{ mots:900, court:400, paras:5, connect:8, pages:'souvent 4 à 6 pages, soit environ 1 000 à 1 800 mots' },
    philo:{ mots:900, court:400, paras:5, connect:8, pages:'souvent 4 à 8 pages, soit environ 1 000 à 2 000 mots' },
    redaction:{ mots:300, court:150, paras:3, connect:4, pages:'au moins une quarantaine de lignes, soit environ 300 à 450 mots' },
    developpement:{ mots:270, court:150, paras:2, connect:4, pages:'au moins trente lignes (brevet 2027), soit environ 270 à 450 mots' },
    // v8.6 : SES, HGGSP (dissertation et étude critique) et note de synthèse du CRFPA.
    ses:{ mots:900, court:400, paras:5, connect:8, pages:'souvent 4 à 6 pages, soit environ 1 000 à 1 800 mots' },
    hggsp:{ mots:600, court:300, paras:4, connect:6, pages:'environ 2 heures de travail, soit 600 à 1 000 mots' },
    'hggsp-etude':{ mots:450, court:220, paras:3, connect:5, pages:'environ 2 heures de travail, soit 450 à 800 mots' },
    synthese:{ mots:600, court:300, paras:4, connect:6, pages:'pour ce dossier court, environ 600 à 1 000 mots (au CRFPA : quatre pages au plus)' }
  };
  const AUTEURS = /\b(Platon|Socrate|Aristote|Épicure|Épictète|Sénèque|Marc Aurèle|Augustin|Thomas d[’']Aquin|Montaigne|Machiavel|Descartes|Pascal|Spinoza|Hobbes|Locke|Leibniz|Hume|Rousseau|Voltaire|Diderot|Kant|Hegel|Marx|Nietzsche|Schopenhauer|Kierkegaard|Freud|Bergson|Alain|Husserl|Heidegger|Sartre|Beauvoir|Camus|Arendt|Merleau-Ponty|Levinas|Weil|Lévi-Strauss|Foucault|Bachelard|Popper|Rawls|Jonas|Tocqueville|Mill|Durkheim|Weber)\b/gu;
  function analyser(x){
    const t = String(x.texte || ''), mots = (t.match(/[\p{L}\p{N}’'-]+/gu) || []).length, so = PROFILS[x.sorte] ? x.sorte : 'commentaire', P = PROFILS[so];
    const com = so === 'commentaire', bac = ['commentaire', 'dissertation', 'philo', 'ses', 'hggsp'].includes(so), synth = so === 'synthese';
    const paras = t.split(/\n\s*\n/).map(p => p.trim()).filter(p => p.length > 30);
    const blocs = paras.length >= 2 ? paras : t.split(/\n+/).map(p => p.trim()).filter(p => p.length > 30);
    const intro = blocs[0] || '', concl = blocs.length > 1 ? blocs[blocs.length - 1] : '';
    const annonce = compte(intro, /\b(dans un premier temps|dans une première partie|tout d[’']abord|d[’']abord|premièrement|nous verrons|nous étudierons|nous montrerons|nous analyserons|puis|ensuite|enfin|dans un second temps|dans une seconde partie)\b/giu);
    const citations = compte(t, /«[^»]{2,}»/gu) + compte(t, /"[^"\n]{2,}"/gu);
    const procedes = compte(t, /\b(métaphores?|comparaisons?|personnifications?|anaphores?|hyperboles?|litotes?|antithèses?|oxymores?|gradations?|énumérations?|accumulations?|allitérations?|assonances?|champ lexical|registre|tonalité|rythme|enjambements?|rimes?|alexandrins?|focalisation|énonciation|apostrophe|didascalies?|aparté|répliques?|concession|interrogations? rhétoriques?|imparfait|passé simple|présent)\b/giu);
    const connecteurs = compte(t, /\b(cependant|pourtant|toutefois|néanmoins|en effet|ainsi|de plus|en outre|par ailleurs|en revanche|or|donc|c[’']est pourquoi|par conséquent|d[’']une part|d[’']autre part|enfin|certes|mais|d[’']abord|ensuite|puis|alors|soudain|finalement|tout à coup)\b/giu);
    const sujetMots = compte(t, /\b(texte|poème|extrait|scène|lettre|récit|auteure?|poète|narrateur|personnages?)\b/giu);
    const motsSujet = [...new Set((String(x.sujet || '').toLowerCase().match(/[\p{L}’'-]{6,}/gu) || []).filter(w => !/^(vous|votre|selon|répondrez|développement|organisé|argumenté|appuyant|exemples|précis|racontez|rédigez|construit|vingtaine|lignes|utiliserez|mêlant|thème)$/.test(w)))];
    const vus = motsSujet.filter(w => t.toLowerCase().includes(w.slice(0, Math.max(5, w.length - 2)))).length;
    const cles = (x.cles || '').split('·').map(s => s.trim().toLowerCase()).filter(Boolean);
    const clesVues = cles.filter(k => k.split(/\s+/).some(w => w.length > 3 && t.toLowerCase().includes(w))).length;
    const titreVu = x.titreOeuvre ? compte(t.toLowerCase(), new RegExp(x.titreOeuvre.toLowerCase().replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g')) : 0;
    const familier = compte(t, /\b(truc|trucs|ouais|kiffe\w*|trop bien|super bien|genre,|en mode|grave)\b/giu), ca = compte(t, /\bça\b/giu);
    const longues = String(t).split(/[.!?]+/).filter(p => (p.match(/\S+/g) || []).length > 60).length;
    const L = [], v = (ok, titre, bien, conseil) => L.push({ ok:!!ok, titre, detail:ok ? bien : conseil });
    v(mots >= P.mots, 'Longueur (' + mots + ' mots)', 'Ta copie a l’ampleur attendue (' + P.pages + ').',
      (mots < P.court ? 'C’est encore très court : on attend ' : 'C’est un peu court : on attend ') + P.pages + '. Développe chaque idée : affirmation, exemple ou citation, explication.');
    v(blocs.length >= P.paras, 'Construction en paragraphes (' + blocs.length + ')', 'On voit des paragraphes distincts : le correcteur suit ton organisation.',
      so === 'redaction' ? 'Organise ton texte en au moins trois paragraphes (un par étape du récit ou par argument), séparés par une ligne vide.'
        : so === 'developpement' ? 'Un développement construit s’organise en paragraphes : une courte introduction, deux ou trois paragraphes (un par idée), une conclusion.'
        : 'Il faut au moins : une introduction, deux ou trois parties (chacune en plusieurs paragraphes) et une conclusion. Laisse une ligne vide entre les paragraphes.');
    if(bac){
      v(/\?/.test(intro), 'Problématique dans l’introduction', 'Ton introduction pose bien une question : c’est ta problématique.',
        'On ne trouve pas de question dans ton introduction. La problématique est la question à laquelle toute ta copie répond : formule-la clairement, avec un point d’interrogation.');
      v(annonce >= 2, 'Annonce du plan', 'Ton introduction annonce les étapes de ta réflexion.', 'Termine l’introduction en annonçant ton plan (« Nous verrons d’abord…, puis…, enfin… »).');
    }
    if(so === 'philo') v(compte(t, /\b(définir|définition|on entend|désigne|signifie|c[’']est-à-dire|au sens de|se définit)\b/giu) >= 1, 'Définition des termes du sujet', 'Tu définis les notions du sujet : c’est le point de départ d’une vraie réflexion.',
      'Commence par définir les mots du sujet (« Par … on entend … »). En philosophie, c’est souvent en examinant les sens d’un mot qu’on découvre le problème.');
    if(!synth && (so !== 'redaction' || x.genre !== 'imagination')) v(/\b(en conclusion|pour conclure|ainsi|en définitive|finalement|au terme de|en somme)\b/iu.test(concl), 'Conclusion', 'Ton texte se termine par une vraie conclusion.',
      'Ton dernier paragraphe ne conclut pas encore. Commence-le par « Ainsi » ou « En conclusion » et réponds clairement à la question posée' + (bac ? ', puis ouvre sur une autre question.' : '.'));
    if(com) v(citations >= 6, 'Citations (' + citations + ')', 'Tu t’appuies sur le texte avec de nombreuses citations.', 'Un commentaire s’appuie sur le texte : cite-le souvent, entre guillemets « … », puis analyse chaque citation.');
    if(so === 'dissertation') v(citations >= 3 || titreVu >= 3, 'Citations et exemples (' + citations + ')', 'Tu prouves tes arguments par des passages précis.', 'Une dissertation s’appuie sur des exemples précis : cite des passages de l’œuvre entre guillemets « … ».');
    if(com) v(procedes >= 5, 'Analyse des procédés (' + procedes + ')', 'Tu nommes les procédés d’écriture et leur effet : c’est ce qui transforme une lecture en analyse.',
      'Nomme les procédés (métaphore, comparaison, rythme, champ lexical, registre…) et dis quel effet ils produisent. Citer sans analyser, c’est montrer la photo sans dire ce qu’on voit.');
    if(so === 'dissertation') v(titreVu >= 3, 'L’œuvre au programme (citée ' + titreVu + ' fois)', 'L’œuvre au programme est bien au centre de ta réflexion.', 'Ton sujet porte sur « ' + (x.titreOeuvre || 'l’œuvre') + ' » : appuie chaque argument sur un passage précis de cette œuvre, en la nommant.');
    if(so === 'philo'){ const a = new Set(t.match(AUTEURS) || []).size;
      v(a >= 2, 'Références philosophiques (' + a + ')', 'Tu t’appuies sur des philosophes : ta réflexion dialogue avec d’autres pensées.', 'Appuie-toi sur au moins deux ou trois philosophes du programme (Platon, Descartes, Kant, Rousseau…) : explique leur idée et ce qu’elle apporte à ton argument, sans réciter.');
      v(compte(t, /\b(par exemple|prenons|considérons|imaginons|songeons|ainsi)\b/giu) >= 3, 'Exemples', 'Tu illustres tes arguments par des exemples.', 'Chaque argument gagne à être illustré : « Prenons l’exemple de… ». Un exemple bien choisi rend une idée abstraite convaincante.'); }
    if(so === 'redaction' && x.genre === 'imagination') v(compte(t, /\b(peur|joie|tristesse|colère|émotion|émue?|frisson\w*|angoiss\w*|cœur|larmes?|sourire|trembl\w*|soulag\w*|surpris\w*|inquiet\w*|honte|fier|fierté|bonheur)\b/giu) >= 3, 'Émotions', 'Ton récit exprime les émotions du narrateur, comme le demande le sujet.',
      'Le sujet demande de mêler récit et émotions : dis ce que ressent le narrateur (peur, surprise, soulagement…) et montre-le par des gestes et des sensations.');
    if(so === 'redaction' && x.genre !== 'imagination') v(compte(t, /\b(par exemple|ainsi|comme le montre|prenons|c[’']est le cas)\b/giu) >= 2, 'Arguments et exemples', 'Tes arguments sont illustrés par des exemples.', 'Un sujet de réflexion demande des arguments ET des exemples : après chaque idée, donne un exemple précis (« Par exemple, … »).');
    if(so === 'ses'){
      v(compte(t, /\b(\d+[,.]?\d*\s?(%|€|euros?|millions?|milliards?|points?)|en (19|20)\d{2})\b/giu) >= 2, 'Exemples chiffrés', 'Tu appuies ton raisonnement sur des données chiffrées et datées.', 'En SES, un argument se prouve : donne des données chiffrées et datées (taux, montants, évolutions), comme celles d’un dossier documentaire.');
      v(compte(t, /\b(mécanisme|effet|entraîne|provoque|conduit à|se traduit par|par conséquent|donc|ce qui|en effet)\b/giu) >= 5, 'Mécanismes expliqués', 'Tu expliques des enchaînements de causes et d’effets.', 'Explique les mécanismes pas à pas : « A entraîne B, ce qui provoque C ». C’est le cœur d’une dissertation de SES.');
      v(compte(t, /\b(Smith|Ricardo|Schumpeter|Keynes|Solow|Romer|Durkheim|Weber|Marx|Bourdieu|Boudon|Lipset|Akerlof|Krugman|Friedman|Phillips|Okun|Piketty|Goldthorpe)\b/gu) >= 1, 'Auteurs et théories', 'Tu mobilises des auteurs ou des théories du programme.', 'Cite au moins un auteur ou une théorie du programme (Schumpeter, Keynes, Ricardo, Bourdieu…) et explique ce qu’il apporte.'); }
    if(so === 'hggsp' || so === 'hggsp-etude'){ const dates = compte(t, /\b(1[0-9]{3}|20[0-9]{2})\b/g);
      v(dates >= (so === 'hggsp' ? 4 : 2), 'Dates et repères (' + dates + ')', 'Tu situes précisément les faits dans le temps.', 'Ancre ta copie dans des repères précis : dates, événements, acteurs. En HGGSP, une idée sans repère reste une opinion.'); }
    if(so === 'hggsp-etude'){
      v(compte(intro, /\b(document|extrait|discours|déclaration|charte|texte|auteur|rédigé|prononcé|signé|publié|date|nature|contexte)\b/giu) >= 3, 'Présentation du document', 'Tu présentes le document : nature, auteur, date, contexte.', 'Commence par présenter le document : sa nature (discours, traité, article…), son auteur, sa date, son contexte et son destinataire.');
      v(citations >= 2, 'Citations du document (' + citations + ')', 'Tu t’appuies sur le texte en le citant.', 'Cite le document entre guillemets « … » puis explique chaque citation avec tes connaissances.');
      v(compte(t, /\b(limite|limites|portée|critique|point de vue|subjectif|nuancer|nuance|cependant|toutefois|en réalité|bilan|n[’']a pas|silence|omet)\b/giu) >= 3, 'Regard critique', 'Tu portes un regard critique : portée, limites, point de vue de l’auteur.', 'Une étude critique ne paraphrase pas : montre la portée du document ET ses limites (ce qu’il ne dit pas, le point de vue de l’auteur, ce qui s’est passé ensuite).'); }
    if(synth){ const docs = compte(t, /\b(doc(?:ument)?\.?\s*n?°?\s*\d)/giu), opinions = compte(t, /(?<!\p{L})(je pense|je crois|à mon avis|selon moi|il me semble|personnellement|j[’']estime|nous pensons)(?!\p{L})/giu);
      v(docs >= 4, 'Références aux documents (' + docs + ')', 'Chaque idée renvoie au document qui la porte.', 'Dans une note de synthèse, chaque information renvoie à sa source entre parenthèses : (doc. 1), (doc. 2 et 4). Tous les documents doivent être utilisés.');
      v(opinions === 0, 'Neutralité', 'Ta note reste neutre : aucune opinion personnelle.', 'La note de synthèse est neutre : aucune opinion personnelle (« je pense », « à mon avis »…) et aucune connaissance extérieure au dossier.');
      v(annonce >= 2 || /\b(I\.|II\.|I –|II –|première partie|seconde partie)/u.test(t), 'Plan annoncé et apparent', 'Ton plan est annoncé et visible.', 'Annonce ton plan en fin d’introduction, puis fais apparaître deux parties (I, II) et leurs sous-parties (A, B) avec des titres.'); }
    if(so === 'developpement'){
      v(compte(t, /\b(1[0-9]{3}|20[0-9]{2})\b/g) >= 3, 'Dates (' + compte(t, /\b(1[0-9]{3}|20[0-9]{2})\b/g) + ')', 'Tu situes les faits avec des dates précises.', 'Un développement construit doit contenir des repères précis : cite au moins trois dates importantes du thème.');
      v(compte(t, /(?<=[\s’'(«-])[A-ZÀ-ÖØ-Þ][\p{L}’'-]{2,}/gu) >= 4, 'Acteurs et lieux', 'Tu nommes des acteurs, des lieux, des institutions.', 'Nomme des acteurs (personnes, États, organisations) et des lieux précis : ce sont les preuves de tes connaissances.'); }
    v(connecteurs >= P.connect, (so === 'redaction' && x.genre === 'imagination' ? 'Organisateurs du récit (' : 'Connecteurs logiques (') + connecteurs + ')', 'Tes idées ou les étapes de ton récit sont bien reliées.',
      so === 'redaction' && x.genre === 'imagination' ? 'Relie les étapes de ton récit avec des organisateurs (d’abord, soudain, alors, puis, enfin…).' : 'Relie tes idées avec des connecteurs (en effet, cependant, ainsi, de plus, en revanche, c’est pourquoi…).');
    if(com) v(sujetMots >= 4, 'Le texte au centre', 'Tu parles bien du texte lui-même (le poème, l’extrait, la scène…).', 'Parle davantage du texte lui-même : « le poète », « cet extrait », « la scène »… et moins de généralités.');
    else if(so === 'dissertation') v(cles.length === 0 || clesVues >= Math.ceil(cles.length * 0.6), 'Les mots du sujet', 'Tu reprends les mots-clés du sujet : tu restes dans le sujet.', 'Reprends les mots-clés du sujet (' + (x.cles || '') + ') dans ton introduction et dans chaque partie : c’est la meilleure protection contre le hors-sujet.');
    else v(motsSujet.length === 0 || vus >= Math.ceil(motsSujet.length * 0.5), 'Les mots du sujet', 'Tu reprends les mots importants du sujet : tu restes dans le sujet.', 'Reprends les mots importants du sujet (' + motsSujet.slice(0, 6).join(', ') + ') : c’est la meilleure protection contre le hors-sujet.');
    v(familier === 0 && ca < 3, 'Registre de langue', 'Ton registre reste soutenu, comme on l’attend à l’examen.',
      'Évite le registre familier' + (ca >= 3 ? ' (« ça » → « cela »)' : '') + (familier ? ' et les mots comme « truc », « genre », « grave »' : '') + (x.genre === 'imagination' ? ', sauf dans un dialogue où un personnage parle ainsi' : '') + '.');
    v(longues === 0, 'Longueur des phrases', 'Tes phrases restent claires.', 'Certaines phrases dépassent 60 mots : coupe-les en deux ou trois. Une phrase claire convainc mieux qu’une phrase interminable.');
    return { liste:L, ok:L.filter(i => i.ok).length, sur:L.length, mots };
  }

  // ───── Écrans ─────
  let cour = null, minuteur = null;
  const virg = n => String(n).replace('.', ',');
  function chrono(){
    const e = document.getElementById('copie-chrono'); if(!e || !cour){ clearInterval(minuteur); minuteur = null; return; }
    const fA = api().examenFinA && api().examenFinA();
    if(fA){ const r = fA - Date.now(); e.textContent = r > 0 ? tx('⏱️ Chrono officiel : il reste {0} h {1} min pour rendre ta copie.', Math.floor(r / 3600000), Math.floor(r % 3600000 / 60000)) : tx('⏱️ Temps écoulé : rends ta copie.'); return; }
    const d = cour.duree || 240, reste = d * 60000 - (Date.now() - (cour.debut || Date.now())), lib = Math.floor(d / 60) + ' h' + (d % 60 ? ' ' + (d % 60) + (d < 60 ? ' min' : '') : '');
    e.textContent = reste > 0 ? tx('⏱️ Il reste {0} h {1} min sur les {2} de l’épreuve.', Math.floor(reste / 3600000), Math.floor(reste % 3600000 / 60000), d < 60 ? d + ' min' : lib) : tx('⏱️ Le temps de l’épreuve ({0}) est dépassé : à l’examen, la copie serait ramassée.', d < 60 ? d + ' min' : lib);
  }
  function sujetHtml(x){ const esc = api().esc;
    return '<details class="contexte-exo sujet-copie" open><summary>📄 ' + esc(x.titre) + '</summary>' + (x.oeuvre ? '<p class="petit">' + esc(x.oeuvre) + '</p>' : '') + '<p><strong>' + esc(x.sujet) + '</strong></p>' +
      (x.texteSujet ? '<blockquote class="texte-sujet">' + esc(x.texteSujet).replace(/\n/g, '<br>') + '</blockquote>' : '') + '</details>'; }
  function ecrire(x, msg){
    const A = api(), esc = A.esc; cour = x; const n = (String(x.texte).match(/\S+/g) || []).length;
    const serveur = !!M.serveur('copie.php'), accord = A.base().devoirsAccord === true;
    A.poser(A.barre('copies') + '<main class="coin-anglais copie-ecran"><h2>' + esc(tx('🖊️ Ma copie')) + '</h2>' + sujetHtml(x) +
      '<p id="copie-chrono" class="petit" role="timer"></p>' + (msg ? '<p class="petit" role="status">' + esc(msg) + '</p>' : '') +
      '<p><label>' + esc(tx('Brouillon (problématique, plan, idées, citations)')) + '<textarea id="copie-brouillon" rows="6" maxlength="8000">' + esc(x.brouillon) + '</textarea></label></p>' +
      '<p><label>' + esc(tx('Ta copie (laisse une ligne vide entre les paragraphes)')) + '<textarea id="copie-texte" rows="22" maxlength="' + MAX_TEXTE + '" spellcheck="false">' + esc(x.texte) + '</textarea></label></p>' +
      '<p class="petit"><span id="copie-mots">' + esc(tx('{0} mots', n)) + '</span> · <span id="copie-etat" role="status"></span></p>' +
      (A.examenFinA && A.examenFinA() ? '<p><button class="gros" data-a="copie-rendre">' + esc(tx('📤 Rendre ma copie et continuer')) + '</button></p>' : '') +
      (A.examenFinA && A.examenFinA() ? '' :   // v7.9 : en conditions réelles, pas de vérification ni de correction avant d'avoir rendu la copie
      '<div class="actions serrees"><button class="moyen plein" data-a="copie-verifier">' + esc(tx('✅ Vérifier ma copie (sans IA)')) + '</button>' +
      (serveur && accord ? '<button class="moyen" data-a="copie-ia">' + esc(tx('✨ Correction détaillée par l’IA')) + '</button>' : '') +
      '<button class="moyen" data-a="copies">' + esc(tx('💾 Enregistrer et quitter')) + '</button></div>' +
      (serveur && accord ? '<p class="petit">🤖 ' + esc(tx('Ta copie part au serveur du jeu puis à l’IA (Anthropic) pour être corrigée. Rien n’est gardé. L’IA peut se tromper : c’est une estimation, pas une note d’examen. N’écris ni ton nom ni ton école.')) +
        (A.plumesActives && A.plumesActives() ? ' ' + esc(tx('Coût : {0} plumes.', 5)) : '') + '</p>' : serveur ? '<p class="petit">' + esc(tx('La correction par l’IA doit d’abord être autorisée par un parent (Espace parents, aide aux devoirs).')) + '</p>' : '')) + '</main>');
    let attente = null;
    const sauver = () => { const b = document.getElementById('copie-brouillon'), t = document.getElementById('copie-texte'); if(!t || cour !== x) return;
      x.brouillon = b.value.slice(0, 8000); x.texte = t.value.slice(0, MAX_TEXTE); x.maj = Date.now(); A.garder();
      const m = document.getElementById('copie-mots'), e = document.getElementById('copie-etat'); if(m) m.textContent = tx('{0} mots', (x.texte.match(/\S+/g) || []).length); if(e) e.textContent = tx('Enregistré dans cet appareil.'); };
    for(const id of ['copie-brouillon', 'copie-texte']){ const el = document.getElementById(id); if(el) el.addEventListener('input', () => { clearTimeout(attente); attente = setTimeout(sauver, 600); }); }
    chrono(); clearInterval(minuteur); minuteur = setInterval(chrono, 30000);
    x._sauver = sauver;
  }
  const lireChamps = () => { if(cour && cour._sauver) cour._sauver(); };
  function verifier(){
    lireChamps(); const x = cour; if(!x) return liste(); const A = api(), esc = A.esc, r = analyser(x);
    x.corrections = (x.corrections || []).concat([{ date:Date.now(), forme:r.ok + '/' + r.sur }]).slice(-10); A.garder();
    A.poser(A.barre('copies') + '<main class="coin-anglais copie-ecran"><h2>' + esc(tx('Vérification de ta copie')) + '</h2>' + sujetHtml(x) +
      '<p class="gros-score">' + r.ok + '/' + r.sur + '</p><p>' + esc(tx('{0} points de méthode réussis sur {1}. Ce n’est pas une note : c’est ce qu’un correcteur regarde en premier.', r.ok, r.sur)) + '</p>' +
      '<ul class="copie-verif">' + r.liste.map(i => '<li class="' + (i.ok ? 'ok' : 'ko') + '"><strong>' + (i.ok ? '✅ ' : '✏️ ') + esc(i.titre) + '</strong><br>' + esc(i.detail) + '</li>').join('') + '</ul>' +
      '<div class="actions serrees"><button class="moyen plein" data-a="copie-reprendre" data-v="' + esc(x.key) + '">' + esc(tx('✏️ Reprendre ma copie')) + '</button>' +
      (M.serveur('copie.php') && A.base().devoirsAccord === true ? '<button class="moyen" data-a="copie-ia">' + esc(tx('✨ Correction détaillée par l’IA')) + '</button>' : '') + '</div></main>');
  }
  async function corrigerIA(){
    lireChamps(); const x = cour, A = api(); if(!x) return liste();
    if(!(M.serveur('copie.php') && A.base().devoirsAccord === true)) return ecrire(x, tx('La correction par l’IA doit d’abord être autorisée par un parent (Espace parents, aide aux devoirs).'));
    if((String(x.texte).match(/\S+/g) || []).length < (COURTS.includes(x.sorte) ? 80 : 150)) return ecrire(x, tx('L’IA corrige des copies d’au moins {0} mots : continue d’écrire !', COURTS.includes(x.sorte) ? 80 : 150));
    const e = document.getElementById('copie-etat') || document.querySelector('main p.petit'); if(e) e.textContent = tx('Plumo lit ta copie…');
    const r = await M.envoyer('copie.php', Object.assign({ accord_parent:true, sorte:x.sorte, sujet:x.sujet, texte_sujet:x.texteSujet, oeuvre:x.oeuvre, copie:x.texte, niveau:NIVEAU[x.sorte] || '1re', langue:A.base().ui || 'fr' }, A.codePlumes()));
    if(!(r.ok && r.d && Array.isArray(r.d.criteres))) return ecrire(x, tx(r.statut === 402 ? 'Plus de plumes magiques : demande à un adulte (écran ✨ Plus).' : 'L’IA ne répond pas pour l’instant. Tes plumes ont été rendues ; réessaie plus tard.'));
    const c = r.d; x.corrections = (x.corrections || []).concat([{ date:Date.now(), ia:c }]).slice(-10); A.garder(); afficherIA(x, c);
  }
  function afficherIA(x, c){
    const A = api(), esc = A.esc, li = l => (l || []).map(s => '<li>' + esc(s) + '</li>').join('');
    A.poser(A.barre('copies') + '<main class="coin-anglais copie-ecran"><h2>' + esc(tx('Correction de Plumo (IA)')) + '</h2>' + sujetHtml(x) +
      '<p class="gros-score">' + esc(tx('Note estimée : {0}/20', virg(c.note))) + '</p>' +
      '<table class="copie-bareme"><tbody>' + (c.criteres || []).map(k => '<tr><th>' + esc(k.nom) + '</th><td>' + esc(virg(k.points)) + '/' + esc(virg(k.sur)) + '</td></tr><tr><td colspan="2" class="petit">' + esc(k.explication) + '</td></tr>').join('') + '</tbody></table>' +
      ((c.forts || []).length ? '<h3>✅ ' + esc(tx('Ce qui est réussi')) + '</h3><ul>' + li(c.forts) + '</ul>' : '') +
      ((c.ameliorer || []).length ? '<h3>✏️ ' + esc(tx('À retravailler')) + '</h3><ul class="copie-verif">' + c.ameliorer.map(a => '<li>' + (a.passage ? '<em>« ' + esc(a.passage) + ' »</em><br>' : '') + '<strong>' + esc(a.probleme) + '</strong><br>💡 ' + esc(a.conseil) + '</li>').join('') + '</ul>' : '') +
      ((c.langue || []).length ? '<h3>🔤 ' + esc(tx('Langue')) + '</h3><ul>' + li(c.langue) + '</ul>' : '') +
      (c.conseil ? '<h3>🦉 ' + esc(tx('Le conseil pour la prochaine copie')) + '</h3><p>' + esc(c.conseil) + '</p>' : '') +
      '<div class="actions serrees"><button class="moyen plein" data-a="copie-reprendre" data-v="' + esc(x.key) + '">' + esc(tx('✏️ Reprendre ma copie')) + '</button></div></main>');
  }
  function liste(){
    const A = api(), esc = A.esc, c = copies(), l = Object.values(c).sort((a, b) => (b.maj || 0) - (a.maj || 0)); cour = null;
    const derniere = x => { const ia = (x.corrections || []).filter(k => k.ia).pop(); return ia ? ' · ' + tx('Dernière correction : {0}/20', virg(ia.ia.note)) : ''; };
    A.poser(A.barre('matieres') + '<main class="coin-anglais copie-ecran"><h2>' + esc(tx('🖊️ Mes copies')) + '</h2>' +
      (l.length ? '<ul class="liste-chap">' + l.map(x => '<li class="cahier-ligne"><button class="chap" data-a="copie-reprendre" data-v="' + esc(x.key) + '"><span>' + esc(x.titre) + '</span><em>' + esc(tx('{0} mots', (String(x.texte).match(/\S+/g) || []).length) + derniere(x)) + '</em></button>' +
        '<button class="moyen" data-a="copie-suppr" data-v="' + esc(x.key) + '" aria-label="' + esc(tx('🗑️ Supprimer')) + '">🗑️</button></li>').join('') + '</ul>' : '<p class="petit">' + esc(tx('Aucune copie pour l’instant.')) + '</p>') + '</main>');
  }
  function supprimer(k){ const c = copies(), x = c[k]; if(!x) return liste();
    if(typeof confirm === 'function' && !confirm(tx('Supprimer définitivement « {0} » ?', x.titre))) return liste();
    delete c[k]; api().garder(); liste(); }

  // ───── Cartes et actions ─────
  if(!M.cartes.matiere) M.cartes.matiere = [];
  M.cartes.matiere.push(() => Object.keys(copies()).length ? M.carte('copies', '', '🖊️', api().esc(tx('🖊️ Mes copies')).replace(/^🖊️ /, ''), api().esc(tx('Reprends une copie commencée ou relis ses corrections'))) : '');
  Object.assign(M.actions, {
    'copie-rediger':v => { const info = depuisEpreuve(api().epreuveCourante && api().epreuveCourante(), v); return info ? ecrire(ouvrir(info)) : liste(); },
    'copie-reprendre':v => { const x = copies()[v]; return x ? ecrire(x) : liste(); },
    'copie-ecrit':v => { const info = depuisEcrit(api().epreuveCourante && api().epreuveCourante(), v); return info ? ecrire(ouvrir(info)) : liste(); },
    'copie-verifier':() => verifier(), 'copie-rendre':() => { lireChamps(); cour = null; return api().rendreCopie ? api().rendreCopie() : liste(); }, 'copie-ia':() => corrigerIA(), 'copies':() => { lireChamps(); liste(); }, 'copie-suppr':v => supprimer(v)
  });
  // v7.8 : boutons des autres écrits (rédaction du brevet, développement construit, dissertation de philo) sur l'écran d'une épreuve.
  // v8.6 : ouvrir une copie depuis un autre module (ex. la note de synthèse du CRFPA dans « Devenir avocat »).
  M.copieOuvrir = info => ecrire(ouvrir(Object.assign({ genre:'', texteSujet:'', oeuvre:'', cles:'', titreOeuvre:'', duree:240 }, info)));
  M.boutonsEcrits = ep => (ep && ep.ecrits || []).length ? '<section class="domaine sujet-bloc"><h3>' + api().esc(tx('🖊️ Rédiger ma copie')) + '</h3>' + ep.ecrits.map((e, i) => '<div class="sujet-dis"><p><strong>' + api().esc(e.titre) + '</strong></p><p>' + api().esc(e.sujet) + '</p>' +
    '<button class="moyen" data-a="copie-ecrit" data-v="' + i + '">' + api().esc(tx('🖊️ Rédiger ma copie')) + '</button></div>').join('') + '</section>' : '';
  // Bouton « Rédiger ma copie » placé par jeu.js sur l'écran du sujet du bac de français.
  M.boutonCopie = v => '<button class="moyen" data-a="copie-rediger" data-v="' + api().esc(v) + '">' + api().esc(tx('🖊️ Rédiger ma copie')) + '</button>';
  window.AMI_COPIE = { analyser, depuisEpreuve, depuisEcrit, PROFILS, copies, afficherIA };
})();
