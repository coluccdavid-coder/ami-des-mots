// Ami des mots — v6.65 : « 📅 Mes trimestres de spé maths » (1re et Tle).
// v6.66 : la même chose pour TOUTES les classes de maths et TOUTES les matières (répartition automatique, voir MATIERES.trimestres).
// Pour chaque trimestre : un ENTRAÎNEMENT (20 questions, corrections et vannes de Prof Pi, sans chrono) et un
// CONTRÔLE (20 questions chronométrées, noté sur 20, note gardée), plus un contrôle bilan de l'année.
// Pendant un contrôle : AUCUNE vanne et aucune correction (comme en classe) ; la correction détaillée vient à la fin.
// La progression suit l'ordre le plus courant dans les lycées (programme 2026) ; chaque prof garde la sienne :
// c'est un repère, pas le vrai contrôle de la classe. Questions calculées par le coin maths (js/maths*.js).
(function(){
  'use strict';
  const M = window.AMI_MODULES; if(!M) return;
  if(!M.cartes.maths) M.cartes.maths = [];
  const api = () => M.api, tx = (...a) => M.tx(...a);

  // ── Progression par trimestre (identifiants des chapitres du coin maths) ──
  const TRIMESTRES = {
    '1re':[
      { id:'T1', mois:'septembre → novembre', themes:'Second degré, suites, automatismes',
        chap:['1-automatismes', '1-second-degre', '1-nb-solutions', '1-forme-canonique', '1-signe-trinome', '1-suites', '1-recurrence', '1-sommes-suites', '1-approx-affine'] },
      { id:'T2', mois:'décembre → mars', themes:'Dérivation, probabilités conditionnelles, produit scalaire',
        chap:['1-derivees', '1-tangente', '1-derivee-produit', '1-variations', '1-derivee-affine', '1-probas-conditionnelles', '1-bernoulli', '1-produit-scalaire', '1-scalaire-angle', '1-projete'] },
      { id:'T3', mois:'mars → juin', themes:'Exponentielle, trigonométrie, géométrie repérée, variables aléatoires',
        chap:['1-exponentielle', '1-trigonometrie', '1-cercle', '1-esperance', '1-variance', '1-automatismes'] }
    ],
    'Tle':[
      { id:'T1', mois:'septembre → novembre', themes:'Suites et limites, fonctions : limites, continuité, dérivation, convexité, espace',
        chap:['T-recurrence', 'T-suites-limites', 'T-limites', 'T-tvi', 'T-derivees', 'T-convexite', 'T-exp-equations', 'T-espace'] },
      { id:'T2', mois:'décembre → mars', themes:'Logarithme, sinus et cosinus, dénombrement, loi binomiale, droites de l’espace',
        chap:['T-logarithme', 'T-ln-equations', 'T-croissances-comparees', 'T-derivees-trigo', 'T-denombrement', 'T-binomiale', 'T-espace-parametrique'] },
      { id:'T3', mois:'mars → juin', themes:'Primitives, calcul intégral, intégration par parties, équations différentielles, sommes de variables aléatoires (avant les épreuves de juin)',
        chap:['T-primitives', 'T-primitives-exp', 'T-integrales', 'T-ipp', 'T-equa-diff', 'T-binomiale-esperance', 'T-grands-nombres'] }
    ]
  };
  const N = 20, MINUTES = 40;

  M.textes({
    'En contrôle, pas de réponse farfelue pour deviner : les pièges sont de vraies notions du chapitre.':['In tests, no silly answers to guess from: the traps are real ideas from the chapter.', 'En el control no hay respuestas absurdas para adivinar: las trampas son nociones reales del capítulo.', 'Im Test gibt es keine albernen Antworten zum Raten: Die Fallen sind echte Begriffe aus dem Kapitel.', 'Nella verifica niente risposte assurde per indovinare: le trappole sono vere nozioni del capitolo.', 'No teste não há respostas disparatadas para adivinhar: as armadilhas são noções reais do capítulo.'],
    '📅 Mes trimestres de spé maths':['📅 My maths specialism terms', '📅 Mis trimestres de matemáticas', '📅 Meine Mathe-Trimester', '📅 I miei trimestri di matematica', '📅 Os meus trimestres de matemática'],
    'Entraînements et contrôles du 1er, 2e et 3e trimestre':['Practice and tests for the 1st, 2nd and 3rd term', 'Prácticas y controles del 1.º, 2.º y 3.er trimestre', 'Übungen und Tests für das 1., 2. und 3. Trimester', 'Esercizi e verifiche del 1º, 2º e 3º trimestre', 'Treinos e testes do 1.º, 2.º e 3.º trimestre'],
    'Chaque trimestre : un entraînement (corrigé, sans chrono) et un contrôle de {0} questions en {1} minutes, noté sur 20.':['Each term: a practice round (with corrections, no timer) and a {0}-question test in {1} minutes, marked out of 20.', 'Cada trimestre: una práctica (corregida, sin cronómetro) y un control de {0} preguntas en {1} minutos, sobre 20.', 'Jedes Trimester: eine Übung (mit Korrektur, ohne Zeitlimit) und ein Test mit {0} Fragen in {1} Minuten, bewertet von 0 bis 20.', 'Ogni trimestre: un esercizio (corretto, senza tempo) e una verifica di {0} domande in {1} minuti, con voto su 20.', 'Cada trimestre: um treino (corrigido, sem cronómetro) e um teste de {0} perguntas em {1} minutos, com nota de 0 a 20.'],
    'Chaque trimestre : un entraînement (corrigé, sans chrono) et un contrôle de {0} questions au plus en {1} minutes, noté sur 20.':['Each term: a practice round (with corrections, no timer) and a test of up to {0} questions in {1} minutes, marked out of 20.', 'Cada trimestre: una práctica (corregida, sin cronómetro) y un control de hasta {0} preguntas en {1} minutos, sobre 20.', 'Jedes Trimester: eine Übung (mit Korrektur, ohne Zeitlimit) und ein Test mit bis zu {0} Fragen in {1} Minuten, bewertet von 0 bis 20.', 'Ogni trimestre: un esercizio (corretto, senza tempo) e una verifica fino a {0} domande in {1} minuti, con voto su 20.', 'Cada trimestre: um treino (corrigido, sem cronómetro) e um teste de até {0} perguntas em {1} minutos, com nota de 0 a 20.'],
    'La progression suit l’ordre le plus courant ; ton prof peut avoir le sien : c’est un repère, pas le vrai contrôle de ta classe.':['The order follows the most common progression; your teacher may have their own: it is a guide, not your class’s real test.', 'El orden sigue la progresión más habitual; tu profe puede tener la suya: es una referencia, no el control real de tu clase.', 'Die Reihenfolge folgt dem üblichsten Ablauf; deine Lehrkraft kann einen eigenen haben: Es ist eine Orientierung, nicht der echte Test deiner Klasse.', 'L’ordine segue la progressione più comune; il tuo prof può avere la sua: è un riferimento, non la vera verifica della tua classe.', 'A ordem segue a progressão mais comum; o teu professor pode ter a sua: é uma referência, não o verdadeiro teste da tua turma.'],
    '1er trimestre':['1st term', '1.er trimestre', '1. Trimester', '1º trimestre', '1.º trimestre'],
    '2e trimestre':['2nd term', '2.º trimestre', '2. Trimester', '2º trimestre', '2.º trimestre'],
    '3e trimestre':['3rd term', '3.er trimestre', '3. Trimester', '3º trimestre', '3.º trimestre'],
    'septembre → novembre':['September → November', 'septiembre → noviembre', 'September → November', 'settembre → novembre', 'setembro → novembro'],
    'décembre → mars':['December → March', 'diciembre → marzo', 'Dezember → März', 'dicembre → marzo', 'dezembro → março'],
    'mars → juin':['March → June', 'marzo → junio', 'März → Juni', 'marzo → giugno', 'março → junho'],
    'Second degré, suites, automatismes':['Quadratics, sequences, basic skills', 'Segundo grado, sucesiones, automatismos', 'Quadratische Funktionen, Folgen, Grundfertigkeiten', 'Secondo grado, successioni, automatismi', 'Segundo grau, sucessões, automatismos'],
    'Dérivation, probabilités conditionnelles, produit scalaire':['Differentiation, conditional probability, dot product', 'Derivación, probabilidad condicionada, producto escalar', 'Ableitung, bedingte Wahrscheinlichkeit, Skalarprodukt', 'Derivazione, probabilità condizionata, prodotto scalare', 'Derivação, probabilidades condicionadas, produto escalar'],
    'Exponentielle, trigonométrie, géométrie repérée, variables aléatoires':['Exponential, trigonometry, coordinate geometry, random variables', 'Exponencial, trigonometría, geometría analítica, variables aleatorias', 'Exponentialfunktion, Trigonometrie, analytische Geometrie, Zufallsvariablen', 'Esponenziale, trigonometria, geometria analitica, variabili aleatorie', 'Exponencial, trigonometria, geometria analítica, variáveis aleatórias'],
    'Suites et limites, fonctions : limites, continuité, dérivation, convexité, espace':['Sequences and limits, functions: limits, continuity, differentiation, convexity, 3D geometry', 'Sucesiones y límites, funciones: límites, continuidad, derivación, convexidad, espacio', 'Folgen und Grenzwerte, Funktionen: Grenzwerte, Stetigkeit, Ableitung, Konvexität, Raum', 'Successioni e limiti, funzioni: limiti, continuità, derivazione, convessità, spazio', 'Sucessões e limites, funções: limites, continuidade, derivação, convexidade, espaço'],
    'Logarithme, sinus et cosinus, dénombrement, loi binomiale, droites de l’espace':['Logarithm, sine and cosine, counting, binomial distribution, lines in space', 'Logaritmo, seno y coseno, combinatoria, distribución binomial, rectas del espacio', 'Logarithmus, Sinus und Kosinus, Kombinatorik, Binomialverteilung, Geraden im Raum', 'Logaritmo, seno e coseno, calcolo combinatorio, legge binomiale, rette nello spazio', 'Logaritmo, seno e cosseno, contagem, distribuição binomial, retas no espaço'],
    'Primitives, calcul intégral, intégration par parties, équations différentielles, sommes de variables aléatoires (avant les épreuves de juin)':['Antiderivatives, integration, integration by parts, differential equations, sums of random variables (before the June exams)', 'Primitivas, cálculo integral, integración por partes, ecuaciones diferenciales, sumas de variables aleatorias (antes de los exámenes de junio)', 'Stammfunktionen, Integralrechnung, partielle Integration, Differentialgleichungen, Summen von Zufallsvariablen (vor den Prüfungen im Juni)', 'Primitive, calcolo integrale, integrazione per parti, equazioni differenziali, somme di variabili aleatorie (prima degli esami di giugno)', 'Primitivas, cálculo integral, integração por partes, equações diferenciais, somas de variáveis aleatórias (antes dos exames de junho)'],
    '🏋️ S’entraîner':['🏋️ Practise', '🏋️ Practicar', '🏋️ Üben', '🏋️ Esercitarsi', '🏋️ Treinar'],
    '📝 Contrôle':['📝 Test', '📝 Control', '📝 Test', '📝 Verifica', '📝 Teste'],
    '🏆 Contrôle bilan de l’année':['🏆 End-of-year test', '🏆 Control final del año', '🏆 Jahresabschlusstest', '🏆 Verifica di fine anno', '🏆 Teste final do ano'],
    'Les trois trimestres mélangés, comme un dernier contrôle avant l’examen.':['All three terms mixed, like a last test before the exam.', 'Los tres trimestres mezclados, como un último control antes del examen.', 'Alle drei Trimester gemischt, wie ein letzter Test vor der Prüfung.', 'I tre trimestri mescolati, come un’ultima verifica prima dell’esame.', 'Os três trimestres misturados, como um último teste antes do exame.'],
    'Dernière note : {0}/20 · meilleure : {1}/20':['Last mark: {0}/20 · best: {1}/20', 'Última nota: {0}/20 · mejor: {1}/20', 'Letzte Note: {0}/20 · beste: {1}/20', 'Ultimo voto: {0}/20 · migliore: {1}/20', 'Última nota: {0}/20 · melhor: {1}/20'],
    'Pas encore de note':['No mark yet', 'Aún sin nota', 'Noch keine Note', 'Ancora nessun voto', 'Ainda sem nota'],
    'Chapitres du trimestre :':['Chapters this term:', 'Capítulos del trimestre:', 'Kapitel des Trimesters:', 'Capitoli del trimestre:', 'Capítulos do trimestre:'],
    'Ces contrôles existent pour la 1re et la terminale : choisis l’onglet 1re ou Tle.':['These tests exist for Year 12 and Year 13: choose the 1re or Tle tab.', 'Estos controles existen para 1.º y 2.º de bachillerato: elige la pestaña 1re o Tle.', 'Diese Tests gibt es für die 11. und 12. Klasse: Wähle den Reiter 1re oder Tle.', 'Queste verifiche esistono per il 4º e il 5º anno: scegli la scheda 1re o Tle.', 'Estes testes existem para o 11.º e o 12.º ano: escolhe o separador 1re ou Tle.'],
    '🔢 Coin maths':['🔢 Maths corner', '🔢 Rincón de mates', '🔢 Mathe-Ecke', '🔢 Angolo di matematica', '🔢 Canto da matemática'],
    '🏋️ Entraînement':['🏋️ Practice', '🏋️ Práctica', '🏋️ Übung', '🏋️ Esercizio', '🏋️ Treino'],
    'Bilan par chapitre':['Results by chapter', 'Balance por capítulo', 'Ergebnis nach Kapitel', 'Bilancio per capitolo', 'Balanço por capítulo'],
    'À retravailler :':['To work on again:', 'Para repasar:', 'Noch einmal üben:', 'Da ripassare:', 'Para rever:'],
    'Rien à retravailler : tout le trimestre est solide ! 🎉':['Nothing to work on: the whole term is solid! 🎉', 'Nada que repasar: ¡todo el trimestre está sólido! 🎉', 'Nichts zu wiederholen: Das ganze Trimester sitzt! 🎉', 'Niente da ripassare: tutto il trimestre è solido! 🎉', 'Nada para rever: o trimestre inteiro está sólido! 🎉'],
    '⏱️ Temps écoulé : les questions sans réponse comptent comme fausses.':['⏱️ Time is up: unanswered questions count as wrong.', '⏱️ Se acabó el tiempo: las preguntas sin respuesta cuentan como fallos.', '⏱️ Die Zeit ist um: Unbeantwortete Fragen zählen als falsch.', '⏱️ Tempo scaduto: le domande senza risposta contano come sbagliate.', '⏱️ O tempo acabou: as perguntas sem resposta contam como erradas.'],
    '🔁 Refaire le contrôle':['🔁 Retake the test', '🔁 Repetir el control', '🔁 Test wiederholen', '🔁 Rifare la verifica', '🔁 Refazer o teste'],
    'Très bien.':['Very good.', 'Muy bien.', 'Sehr gut.', 'Ottimo.', 'Muito bem.'],
    'Bien.':['Good.', 'Bien.', 'Gut.', 'Buono.', 'Bem.'],
    'Assez bien.':['Fairly good.', 'Bastante bien.', 'Befriedigend.', 'Discreto.', 'Suficiente.'],
    'Passable : reprends les chapitres en rouge.':['Pass: go over the chapters in red.', 'Aprobado: repasa los capítulos en rojo.', 'Ausreichend: Wiederhole die roten Kapitel.', 'Sufficiente: ripassa i capitoli in rosso.', 'Satisfaz: revê os capítulos a vermelho.'],
    'Insuffisant : reprends les chapitres en rouge, puis refais le contrôle.':['Not enough: go over the chapters in red, then retake the test.', 'Insuficiente: repasa los capítulos en rojo y repite el control.', 'Ungenügend: Wiederhole die roten Kapitel und mach den Test noch einmal.', 'Insufficiente: ripassa i capitoli in rosso, poi rifai la verifica.', 'Insuficiente: revê os capítulos a vermelho e refaz o teste.'],
    '📅 Mes trimestres de maths':['📅 My maths terms', '📅 Mis trimestres de mates', '📅 Meine Mathe-Trimester', '📅 I miei trimestri di matematica', '📅 Os meus trimestres de matemática'],
    '📅 Mes trimestres':['📅 My terms', '📅 Mis trimestres', '📅 Meine Trimester', '📅 I miei trimestri', '📅 Os meus trimestres'],
    'Répartition indicative dans l’ordre du programme ; ton prof peut avoir la sienne : c’est un repère, pas le vrai contrôle de ta classe.':['Rough split in the order of the curriculum; your teacher may have their own: it is a guide, not your class’s real test.', 'Reparto orientativo en el orden del programa; tu profe puede tener el suyo: es una referencia, no el control real de tu clase.', 'Ungefähre Aufteilung in der Reihenfolge des Lehrplans; deine Lehrkraft kann eine eigene haben: Es ist eine Orientierung, nicht der echte Test deiner Klasse.', 'Ripartizione indicativa nell’ordine del programma; il tuo prof può avere la sua: è un riferimento, non la vera verifica della tua classe.', 'Divisão indicativa pela ordem do programa; o teu professor pode ter a sua: é uma referência, não o verdadeiro teste da tua turma.'],
    '(début)':['(start)', '(inicio)', '(Anfang)', '(inizio)', '(início)'],
    '(milieu)':['(middle)', '(mitad)', '(Mitte)', '(metà)', '(meio)'],
    '(fin)':['(end)', '(final)', '(Ende)', '(fine)', '(fim)'],
    '📚 Matière':['📚 Subject', '📚 Asignatura', '📚 Fach', '📚 Materia', '📚 Disciplina'],
    '📋 Correction':['📋 Corrections', '📋 Corrección', '📋 Korrektur', '📋 Correzione', '📋 Correção'],
    'Ta réponse :':['Your answer:', 'Tu respuesta:', 'Deine Antwort:', 'La tua risposta:', 'A tua resposta:'],
    'Bonne réponse :':['Correct answer:', 'Respuesta correcta:', 'Richtige Antwort:', 'Risposta corretta:', 'Resposta certa:'],
    'Pas de réponse.':['No answer.', 'Sin respuesta.', 'Keine Antwort.', 'Nessuna risposta.', 'Sem resposta.'],
    'Aucune erreur.':['No mistakes.', 'Ningún error.', 'Kein Fehler.', 'Nessun errore.', 'Nenhum erro.'],
    'Pendant le contrôle : ni vanne ni correction, comme en classe. La correction détaillée arrive à la fin.':['During the test: no teasing and no corrections, just like in class. The detailed corrections come at the end.', 'Durante el control: ni bromas ni correcciones, como en clase. La corrección detallada llega al final.', 'Während des Tests: keine Sprüche und keine Korrektur, wie in der Klasse. Die ausführliche Korrektur kommt am Ende.', 'Durante la verifica: niente battute né correzioni, come in classe. La correzione dettagliata arriva alla fine.', 'Durante o teste: sem piadas nem correções, como na aula. A correção detalhada chega no fim.'],
    'Très bien : Prof Pi range sa craie, respect. 👏':['Excellent: Prof Pi puts down his chalk, respect. 👏', 'Muy bien: Prof Pi guarda la tiza, respeto. 👏', 'Sehr gut: Prof Pi legt die Kreide weg, Respekt. 👏', 'Ottimo: Prof Pi posa il gesso, rispetto. 👏', 'Muito bem: o Prof Pi pousa o giz, respeito. 👏'],
    'Bien : encore deux ou trois réglages et c’est parfait.':['Good: two or three tweaks and it’s perfect.', 'Bien: dos o tres ajustes más y será perfecto.', 'Gut: noch zwei, drei Feinheiten und es ist perfekt.', 'Bene: ancora due o tre ritocchi ed è perfetto.', 'Bem: mais dois ou três ajustes e fica perfeito.'],
    'Assez bien : la base est là, on muscle les chapitres en rouge.':['Fairly good: the basics are there, now strengthen the chapters in red.', 'Bastante bien: la base está, ahora refuerza los capítulos en rojo.', 'Befriedigend: Die Basis steht, jetzt die roten Kapitel stärken.', 'Discreto: la base c’è, ora rinforza i capitoli in rosso.', 'Suficiente: a base está lá, agora reforça os capítulos a vermelho.'],
    'Prof Pi a eu de quoi vanner… On reprend les chapitres en rouge et on retente !':['Prof Pi had plenty to tease… Let’s go over the chapters in red and try again!', 'Prof Pi tuvo de qué burlarse… ¡Repasamos los capítulos en rojo y lo intentamos otra vez!', 'Prof Pi hatte viel zu necken… Wir wiederholen die roten Kapitel und versuchen es nochmal!', 'Prof Pi ha avuto di che prendere in giro… Ripassiamo i capitoli in rosso e riproviamo!', 'O Prof Pi teve muito para brincar… Revemos os capítulos a vermelho e tentamos outra vez!']
  });

  const NOMS = { T1:'1er trimestre', T2:'2e trimestre', T3:'3e trimestre' }, MOIS = { T1:'septembre → novembre', T2:'décembre → mars', T3:'mars → juin' }, TR = ['T1', 'T2', 'T3'];
  const TRANCHE = ['(début)', '(milieu)', '(fin)'];
  const virg = x => String(x).replace('.', ',');
  const borne = x => Math.min(20, Math.max(0, Math.round(+x * 10) / 10));
  // Notes gardées sur l'appareil, vérifiées à la lecture : maths { '1re-T1': … }, matières { 'svt-2nde-T1': … }.
  function lireNotes(cle, motif){
    const j = api().J(), o = j[cle] && typeof j[cle] === 'object' ? j[cle] : {}, out = {};
    for(const [k, v] of Object.entries(o)) if(motif.test(k) && v && typeof v === 'object' && Number.isFinite(+v.last))
      out[k] = { last:borne(v.last), best:borne(Number.isFinite(+v.best) ? Math.max(+v.best, +v.last) : v.last), n:Math.min(1e5, Math.max(1, Math.floor(+v.n) || 1)) };
    j[cle] = out; return out;
  }
  const NIVS = '(6e|5e|4e|3e|2nde|1re|Tle|Sup)', TRS = '(T1|T2|T3|bilan)';
  const notes = () => lireNotes('mathsTri', new RegExp('^' + NIVS + '-' + TRS + '$'));
  const notesMat = () => lireNotes('matTri', new RegExp('^[0-9a-z-]{1,30}-' + NIVS + '-' + TRS + '$'));

  // ── Les deux sources : le coin maths (questions calculées) et les matières (banques de questions) ──
  // Une source dit : ses trois trimestres (morceaux), comment nommer un morceau, comment tirer une série.
  function sourceMaths(){
    const MA = window.MATHS, niv = api().etatMaths().niveau; if(!MA) return null;
    const ids = MA.chapitresDe(niv).map(c => c[0]).filter(MA.disponible), tiers = k => ids.slice(Math.round(k * ids.length / 3), Math.round((k + 1) * ids.length / 3));
    const T = TRIMESTRES[niv] ? TRIMESTRES[niv].map(t => t.chap.filter(MA.disponible)) : ids.length >= 3 ? [0, 1, 2].map(tiers) : null;
    if(!T || !T.every(t => t.length)) return null;
    const nom = id => { const c = MA.chapitresDe(niv).find(x => x[0] === id); return c ? MA.tr.chap(c) : id; };
    return { cle:'maths', niv, notes, k:t => niv + '-' + t, titre:TRIMESTRES[niv] ? tx('📅 Mes trimestres de spé maths') : tx('📅 Mes trimestres de maths'),
      parts:t => t === 'bilan' ? [...new Set(T.flat())] : T[TR.indexOf(t)], noms:t => (t === 'bilan' ? [...new Set(T.flat())] : T[TR.indexOf(t)]).map(nom), nomChap:nom,
      themes:t => TRIMESTRES[niv] ? tx(TRIMESTRES[niv][TR.indexOf(t)].themes) : '', repere:TRIMESTRES[niv] ? 'La progression suit l’ordre le plus courant ; ton prof peut avoir le sien : c’est un repère, pas le vrai contrôle de ta classe.' : 'Répartition indicative dans l’ordre du programme ; ton prof peut avoir la sienne : c’est un repère, pas le vrai contrôle de ta classe.',
      serie:t => MA.serie(t === 'bilan' ? [...new Set(T.flat())] : T[TR.indexOf(t)], N, Math.floor(Math.random() * 1e9), api().etatMaths().ton), lang:() => MA.tr.langue(),
      chapBouton:id => '<button class="chap" data-a="maths-chap" data-v="' + api().esc(id) + '"><span>' + api().esc(nom(id)) + '</span><em>▶</em></button>',
      ecran:'maths-tri', entr:'maths-tri-entr', ctrl:'maths-tri-ctrl', v:t => t, retour:'maths', retourTx:'🔢 Coin maths', retourV:'' };
  }
  function sourceMatiere(id){
    const MT = window.MATIERES, m = MT && MT.trouver(id); if(!m || !MT.trimestres) return null;
    const niv = api().etatMatieres().niveau, T = MT.trimestres(id, niv); if(!T) return null;
    const ch = cid => m.chapitres.find(c => c.id === cid), tous = T.flat();
    const nomPart = p => { const c = ch(p.ch); if(!c) return p.ch; const n = MT.nomChap(m, c); if(!p.idx) return n;
      const k = T.findIndex(t => t.includes(p)); return n + ' ' + tx(TRANCHE[k] || ''); };
    const nomChap = cid => { const c = ch(cid); return c ? MT.nomChap(m, c) : cid; };
    let lq = 'fr';
    return { cle:'mat', niv, notes:notesMat, k:t => id + '-' + niv + '-' + t, titre:tx('📅 Mes trimestres') + ' · ' + m.ic + ' ' + MT.nom(m),
      parts:t => t === 'bilan' ? tous : T[TR.indexOf(t)], noms:t => (t === 'bilan' ? [...new Set(tous.map(p => p.ch))].map(nomChap) : T[TR.indexOf(t)].map(nomPart)), nomChap,
      themes:() => '', repere:'Répartition indicative dans l’ordre du programme ; ton prof peut avoir la sienne : c’est un repère, pas le vrai contrôle de ta classe.',
      serie:t => { const l = MT.serieParts(id, t === 'bilan' ? tous : T[TR.indexOf(t)], niv, N, Math.floor(Math.random() * 1e9), api().etatMaths().ton); lq = l.length && l.every(q => q.lang && q.lang !== 'fr') ? l[0].lang : 'fr'; return l; }, lang:() => lq,
      // v6.72 : en contrôle, les leurres trop faciles cèdent la place à des réponses d'autres questions du même chapitre.
      pieges:(t, l) => MT.piegesSerieux ? MT.piegesSerieux(l, MT.serieParts(id, t === 'bilan' ? tous : T[TR.indexOf(t)], niv, 400, Math.floor(Math.random() * 1e9), api().etatMaths().ton)) : l,
      chapBouton:cid => '<button class="chap" data-a="matiere-chap" data-v="' + api().esc(id + '|' + cid) + '"><span>' + api().esc(nomChap(cid)) + '</span><em>▶</em></button>',
      ecran:'mat-tri', entr:'mat-tri-entr', ctrl:'mat-tri-ctrl', v:t => id + '|' + t, retour:'matiere', retourTx:'📚 Matière', retourV:id, id };
  }

  function accueil(S){
    const A = api(), esc = A.esc;
    if(!S) return window.MATHS && A.etatMaths ? A.poser(A.barre('maths') + '<main class="coin-anglais"><p class="pieges-intro">' + esc(tx('Ces contrôles existent pour la 1re et la terminale : choisis l’onglet 1re ou Tle.')) + '</p><div class="actions serrees"><button class="moyen" data-a="maths">' + esc(tx('🔢 Coin maths')) + '</button></div></main>') : A.accueil();
    const nt = S.notes(), ligneNote = t => { const x = nt[S.k(t)]; return x ? tx('Dernière note : {0}/20 · meilleure : {1}/20', virg(x.last), virg(x.best)) : tx('Pas encore de note'); };
    A.poser(A.barre(S.cle === 'maths' ? 'maths' : 'matieres') + '<main class="coin-anglais coin-maths trimestres-ecran"><h2>' + esc(S.titre) + ' · ' + esc(S.niv) + '</h2>' +
      '<p class="pieges-intro">' + esc(S.cle === 'maths' ? tx('Chaque trimestre : un entraînement (corrigé, sans chrono) et un contrôle de {0} questions en {1} minutes, noté sur 20.', N, MINUTES) : tx('Chaque trimestre : un entraînement (corrigé, sans chrono) et un contrôle de {0} questions au plus en {1} minutes, noté sur 20.', N, MINUTES)) + '</p>' +
      '<p class="petit">' + esc(tx('Pendant le contrôle : ni vanne ni correction, comme en classe. La correction détaillée arrive à la fin.')) + '</p>' +
      (S.pieges ? '<p class="petit">' + esc(tx('En contrôle, pas de réponse farfelue pour deviner : les pièges sont de vraies notions du chapitre.')) + '</p>' : '') +
      '<p class="petit">' + esc(tx(S.repere)) + '</p>' +
      '<div class="domaines">' + TR.map(t => '<section class="domaine trimestre"><h3>' + esc(tx(NOMS[t])) + ' <small>' + esc(tx(MOIS[t])) + '</small></h3>' +
        (S.themes(t) ? '<p><strong>' + esc(S.themes(t)) + '</strong></p>' : '') +
        '<p class="petit">' + esc(tx('Chapitres du trimestre :')) + ' ' + esc(S.noms(t).join(' · ')) + '</p>' +
        '<div class="actions serrees"><button class="moyen" data-a="' + S.entr + '" data-v="' + esc(S.v(t)) + '">' + esc(tx('🏋️ S’entraîner')) + '</button>' +
        '<button class="moyen plein" data-a="' + S.ctrl + '" data-v="' + esc(S.v(t)) + '">' + esc(tx('📝 Contrôle')) + '</button></div>' +
        '<p class="petit note-tri">' + esc(ligneNote(t)) + '</p></section>').join('') +
      '<section class="domaine trimestre"><h3>' + esc(tx('🏆 Contrôle bilan de l’année')) + '</h3><p class="petit">' + esc(tx('Les trois trimestres mélangés, comme un dernier contrôle avant l’examen.')) + '</p>' +
        '<div class="actions serrees"><button class="moyen plein" data-a="' + S.ctrl + '" data-v="' + esc(S.v('bilan')) + '">' + esc(tx('📝 Contrôle')) + '</button></div><p class="petit note-tri">' + esc(ligneNote('bilan')) + '</p></section></div>' +
      '<div class="actions serrees"><button class="moyen" data-a="' + S.retour + '"' + (S.retourV ? ' data-v="' + esc(S.retourV) + '"' : '') + '>' + esc(tx(S.retourTx)) + '</button></div></main>');
  }

  function lancer(S, t, controle){
    const A = api(); if(!S || (t !== 'bilan' && !TR.includes(t))) return accueil(S);
    let liste = S.serie(t); if(!liste.length) return accueil(S);
    if(controle && S.pieges) liste = S.pieges(t, liste);
    const titre = (controle ? tx('📝 Contrôle') : tx('🏋️ Entraînement')) + ' · ' + S.niv + ' · ' + (t === 'bilan' ? tx('🏆 Contrôle bilan de l’année') : tx(NOMS[t]));
    const bilan = {}, e = A.etatMaths(), em = S.cle === 'mat' ? A.etatMatieres() : null;
    A.questionsGo(liste, { titre, retour:S.cle === 'maths' ? 'maths' : 'matieres', prof:S.cle === 'maths', sujet:S.id, lang:S.lang(), finA:controle ? Date.now() + MINUTES * 60000 : 0, sansVanne:!!controle,
      onReponse:(juste, q) => {
        if(S.cle === 'maths'){ const s = e.chap[q.chap] || (e.chap[q.chap] = { ok:0, n:0 }); s.n++; if(juste) s.ok++; if(!juste) A.noterErreur('maths:' + q.chap); }
        else { const k = S.id + ':' + q.chap, s = em.chap[k] || (em.chap[k] = { ok:0, n:0 }); s.n++; if(juste) s.ok++; if(!juste) A.noterErreur('mat:' + S.id + ':' + q.chap); }
        const b = bilan[q.chap] || (bilan[q.chap] = { ok:0, n:0 }); b.n++; if(juste) b.ok++; A.garder(); },
      fin:z => fin(S, z, t, controle, titre, bilan) });
  }

  function fin(S, z, t, controle, titre, bilan){
    const A = api(), esc = A.esc, note = Math.round(20 * z.bonnes / Math.max(1, z.liste.length) * 10) / 10;
    const j = A.J(); j.plumes += z.bonnes;
    if(controle){ const nt = S.notes(), k = S.k(t), x = nt[k]; nt[k] = { last:note, best:x ? Math.max(x.best, note) : note, n:x ? x.n + 1 : 1 }; }
    A.garder(); A.bruit('fin');
    const horsTemps = controle && z.i < z.liste.length;
    // Une question non posée (chrono) compte dans le bilan du chapitre comme une question manquée.
    if(horsTemps) z.liste.slice(z.i).forEach(q => { const b = bilan[q.chap] || (bilan[q.chap] = { ok:0, n:0 }); b.n++; });
    const lignes = Object.entries(bilan).sort((a, b) => a[1].ok / a[1].n - b[1].ok / b[1].n);
    const faibles = lignes.filter(([, b]) => b.ok / b.n < .6).map(([id]) => id);
    // Contrôle : une appréciation sobre, comme sur une copie ; entraînement : le prof garde son humour.
    const mot = controle ? (note >= 16 ? 'Très bien.' : note >= 14 ? 'Bien.' : note >= 12 ? 'Assez bien.' : note >= 10 ? 'Passable : reprends les chapitres en rouge.' : 'Insuffisant : reprends les chapitres en rouge, puis refais le contrôle.')
      : note >= 16 ? 'Très bien : Prof Pi range sa craie, respect. 👏' : note >= 14 ? 'Bien : encore deux ou trois réglages et c’est parfait.' : note >= 10 ? 'Assez bien : la base est là, on muscle les chapitres en rouge.' : 'Prof Pi a eu de quoi vanner… On reprend les chapitres en rouge et on retente !';
    const erreurs = controle ? (z.reponses || []).filter(r => !r.juste) : [];
    const item = (q, l2) => '<li><p>' + esc(q.enonce) + '</p>' + l2 + '<p>✅ ' + esc(tx('Bonne réponse :')) + ' ' + esc(q.bon) + '</p>' + (q.regle ? '<p class="petit">💡 ' + esc(q.regle) + '</p>' : '') + '</li>';
    A.poser(A.barre(S.cle === 'maths' ? 'maths' : 'matieres') + '<main class="centre examen-fin trimestre-fin"><div class="ami-moyen">' + A.ami(note >= 12 ? 'fete' : 'malin') + '</div><h2>' + esc(titre) + '</h2>' +
      (horsTemps ? '<p class="petit">' + esc(tx('⏱️ Temps écoulé : les questions sans réponse comptent comme fausses.')) + '</p>' : '') +
      '<p class="gros-score">' + z.bonnes + '/' + z.liste.length + (controle ? ' · ' + virg(note) + '/20' : '') + '</p><p>' + esc(tx(mot)) + '</p><p>🪶 +' + z.bonnes + '</p>' +
      '<h3>' + esc(tx('Bilan par chapitre')) + '</h3><ul class="pieges-cats bilan-chap">' + lignes.map(([id, b]) => '<li class="' + (b.ok / b.n < .6 ? 'rate' : 'ok') + '">' + (b.ok / b.n < .6 ? '🔴 ' : '🟢 ') + esc(S.nomChap(id)) + ' : ' + b.ok + '/' + b.n + '</li>').join('') + '</ul>' +
      (controle ? '<h3>' + esc(tx('📋 Correction')) + '</h3>' + (erreurs.length || horsTemps ? '<ol class="correction-controle">' + erreurs.map(r => item(r.q, '<p>❌ ' + esc(tx('Ta réponse :')) + ' ' + esc(r.choix) + '</p>')).join('') +
          (horsTemps ? z.liste.slice(z.i).map(q => item(q, '<p>⏱️ ' + esc(tx('Pas de réponse.')) + '</p>')).join('') : '') + '</ol>' : '<p>' + esc(tx('Aucune erreur.')) + '</p>') : '') +
      (faibles.length ? '<p><strong>' + esc(tx('À retravailler :')) + '</strong></p><div class="liste-chap">' + faibles.map(S.chapBouton).join('') + '</div>'
        : '<p>' + esc(tx('Rien à retravailler : tout le trimestre est solide ! 🎉')) + '</p>') +
      '<div class="actions serrees">' + (controle ? '<button class="moyen plein" data-a="' + S.ctrl + '" data-v="' + esc(S.v(t)) + '">' + esc(tx('🔁 Refaire le contrôle')) + '</button>' : '<button class="moyen plein" data-a="' + S.entr + '" data-v="' + esc(S.v(t)) + '">' + esc(tx('🏋️ S’entraîner')) + '</button>') +
      '<button class="moyen" data-a="' + S.ecran + '"' + (S.id ? ' data-v="' + esc(S.id) + '"' : '') + '>' + esc(tx('📅 Mes trimestres')) + '</button></div></main>');
  }

  const carte = (a, v, titre) => '<div class="cartes-anglais">' + M.carte(a, v, '📅', api().esc(titre).replace(/^📅 /, ''), api().esc(tx('Entraînements et contrôles du 1er, 2e et 3e trimestre'))) + '</div>';
  M.cartes.maths.push(() => { const S = sourceMaths(); return S ? carte('maths-tri', '', S.titre) : ''; });
  M.cartes['matiere-ecran'] = M.cartes['matiere-ecran'] || [];
  M.cartes['matiere-ecran'].push(() => { const id = api().etatMatieres().derniere; return id && sourceMatiere(id) ? carte('mat-tri', api().esc(id), tx('📅 Mes trimestres')) : ''; });
  const deux = v => { const s = String(v || ''), i = s.lastIndexOf('|'); return [s.slice(0, i), s.slice(i + 1)]; };
  Object.assign(M.actions, {
    'maths-tri':() => accueil(sourceMaths()), 'maths-tri-entr':v => lancer(sourceMaths(), v, false), 'maths-tri-ctrl':v => lancer(sourceMaths(), v, true),
    'mat-tri':v => { const S = sourceMatiere(v); return S ? accueil(S) : api().matiereAccueil(v); },
    'mat-tri-entr':v => { const [id, t] = deux(v); const S = sourceMatiere(id); return S ? lancer(S, t, false) : api().matieresAccueil(); },
    'mat-tri-ctrl':v => { const [id, t] = deux(v); const S = sourceMatiere(id); return S ? lancer(S, t, true) : api().matieresAccueil(); }
  });
  window.AMI_TRIMESTRES = { TRIMESTRES, N, MINUTES, notes, notesMat, sourceMaths, sourceMatiere };
})();
