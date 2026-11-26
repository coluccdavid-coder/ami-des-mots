// Ami des mots — v6.65 : « 📅 Mes trimestres de spé maths » (1re et Tle).
// Pour chaque trimestre : un ENTRAÎNEMENT (20 questions, corrections et vannes de Prof Pi, sans chrono) et un
// CONTRÔLE (20 questions chronométrées, noté sur 20, note gardée), plus un contrôle bilan de l'année.
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
        chap:['1-automatismes', '1-second-degre', '1-nb-solutions', '1-forme-canonique', '1-signe-trinome', '1-suites', '1-recurrence', '1-sommes-suites'] },
      { id:'T2', mois:'décembre → mars', themes:'Dérivation, probabilités conditionnelles, produit scalaire',
        chap:['1-derivees', '1-tangente', '1-derivee-produit', '1-variations', '1-probas-conditionnelles', '1-produit-scalaire', '1-scalaire-angle'] },
      { id:'T3', mois:'mars → juin', themes:'Exponentielle, trigonométrie, géométrie repérée, variables aléatoires',
        chap:['1-exponentielle', '1-trigonometrie', '1-cercle', '1-esperance', '1-automatismes'] }
    ],
    'Tle':[
      { id:'T1', mois:'septembre → novembre', themes:'Suites et limites, fonctions : limites, continuité, dérivation, convexité, espace',
        chap:['T-suites-limites', 'T-limites', 'T-tvi', 'T-derivees', 'T-convexite', 'T-exp-equations', 'T-espace'] },
      { id:'T2', mois:'décembre → mars', themes:'Logarithme, sinus et cosinus, dénombrement, loi binomiale, droites de l’espace',
        chap:['T-logarithme', 'T-ln-equations', 'T-croissances-comparees', 'T-derivees-trigo', 'T-denombrement', 'T-binomiale', 'T-espace-parametrique'] },
      { id:'T3', mois:'mars → juin', themes:'Primitives, calcul intégral, espérance et variance (avant les épreuves de juin)',
        chap:['T-primitives', 'T-primitives-exp', 'T-integrales', 'T-binomiale-esperance'] }
    ]
  };
  const N = 20, MINUTES = 40;

  M.textes({
    '📅 Mes trimestres de spé maths':['📅 My maths specialism terms', '📅 Mis trimestres de matemáticas', '📅 Meine Mathe-Trimester', '📅 I miei trimestri di matematica', '📅 Os meus trimestres de matemática'],
    'Entraînements et contrôles du 1er, 2e et 3e trimestre':['Practice and tests for the 1st, 2nd and 3rd term', 'Prácticas y controles del 1.º, 2.º y 3.er trimestre', 'Übungen und Tests für das 1., 2. und 3. Trimester', 'Esercizi e verifiche del 1º, 2º e 3º trimestre', 'Treinos e testes do 1.º, 2.º e 3.º trimestre'],
    'Chaque trimestre : un entraînement (corrigé, sans chrono) et un contrôle de {0} questions en {1} minutes, noté sur 20.':['Each term: a practice round (with corrections, no timer) and a {0}-question test in {1} minutes, marked out of 20.', 'Cada trimestre: una práctica (corregida, sin cronómetro) y un control de {0} preguntas en {1} minutos, sobre 20.', 'Jedes Trimester: eine Übung (mit Korrektur, ohne Zeitlimit) und ein Test mit {0} Fragen in {1} Minuten, bewertet von 0 bis 20.', 'Ogni trimestre: un esercizio (corretto, senza tempo) e una verifica di {0} domande in {1} minuti, con voto su 20.', 'Cada trimestre: um treino (corrigido, sem cronómetro) e um teste de {0} perguntas em {1} minutos, com nota de 0 a 20.'],
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
    'Primitives, calcul intégral, espérance et variance (avant les épreuves de juin)':['Antiderivatives, integration, expectation and variance (before the June exams)', 'Primitivas, cálculo integral, esperanza y varianza (antes de los exámenes de junio)', 'Stammfunktionen, Integralrechnung, Erwartungswert und Varianz (vor den Prüfungen im Juni)', 'Primitive, calcolo integrale, speranza e varianza (prima degli esami di giugno)', 'Primitivas, cálculo integral, valor esperado e variância (antes dos exames de junho)'],
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
    '📅 Mes trimestres':['📅 My terms', '📅 Mis trimestres', '📅 Meine Trimester', '📅 I miei trimestri', '📅 Os meus trimestres'],
    'Très bien : Prof Pi range sa craie, respect. 👏':['Excellent: Prof Pi puts down his chalk, respect. 👏', 'Muy bien: Prof Pi guarda la tiza, respeto. 👏', 'Sehr gut: Prof Pi legt die Kreide weg, Respekt. 👏', 'Ottimo: Prof Pi posa il gesso, rispetto. 👏', 'Muito bem: o Prof Pi pousa o giz, respeito. 👏'],
    'Bien : encore deux ou trois réglages et c’est parfait.':['Good: two or three tweaks and it’s perfect.', 'Bien: dos o tres ajustes más y será perfecto.', 'Gut: noch zwei, drei Feinheiten und es ist perfekt.', 'Bene: ancora due o tre ritocchi ed è perfetto.', 'Bem: mais dois ou três ajustes e fica perfeito.'],
    'Assez bien : la base est là, on muscle les chapitres en rouge.':['Fairly good: the basics are there, now strengthen the chapters in red.', 'Bastante bien: la base está, ahora refuerza los capítulos en rojo.', 'Befriedigend: Die Basis steht, jetzt die roten Kapitel stärken.', 'Discreto: la base c’è, ora rinforza i capitoli in rosso.', 'Suficiente: a base está lá, agora reforça os capítulos a vermelho.'],
    'Prof Pi a eu de quoi vanner… On reprend les chapitres en rouge et on retente !':['Prof Pi had plenty to tease… Let’s go over the chapters in red and try again!', 'Prof Pi tuvo de qué burlarse… ¡Repasamos los capítulos en rojo y lo intentamos otra vez!', 'Prof Pi hatte viel zu necken… Wir wiederholen die roten Kapitel und versuchen es nochmal!', 'Prof Pi ha avuto di che prendere in giro… Ripassiamo i capitoli in rosso e riproviamo!', 'O Prof Pi teve muito para brincar… Revemos os capítulos a vermelho e tentamos outra vez!']
  });

  const NOMS = { T1:'1er trimestre', T2:'2e trimestre', T3:'3e trimestre' };
  const niveauCourant = () => { const A = api(); return A && A.etatMaths ? A.etatMaths().niveau : ''; };
  // Notes gardées sur l'appareil : { '1re-T1': { last, best, n } } ; tout est vérifié à la lecture.
  function notes(){
    const j = api().J(), o = j.mathsTri && typeof j.mathsTri === 'object' ? j.mathsTri : {}, out = {};
    for(const [k, v] of Object.entries(o)) if(/^(1re|Tle)-(T1|T2|T3|bilan)$/.test(k) && v && typeof v === 'object' && Number.isFinite(+v.last)){
      const c = x => Math.min(20, Math.max(0, Math.round(+x * 10) / 10));
      out[k] = { last:c(v.last), best:c(Number.isFinite(+v.best) ? Math.max(+v.best, +v.last) : v.last), n:Math.min(1e5, Math.max(1, Math.floor(+v.n) || 1)) }; }
    j.mathsTri = out; return out;
  }
  const virg = x => String(x).replace('.', ',');
  const chapitres = (niv, t) => { const T = TRIMESTRES[niv] || [], MA = window.MATHS;
    const ids = t === 'bilan' ? [...new Set(T.flatMap(x => x.chap))] : ((T.find(x => x.id === t) || {}).chap || []);
    return MA ? ids.filter(MA.disponible) : []; };
  const nomChap = id => { const MA = window.MATHS, niv = niveauCourant(), c = MA && MA.chapitresDe(niv).find(x => x[0] === id); return c ? MA.tr.chap(c) : id; };

  function accueil(){
    const A = api(), esc = A.esc, MA = window.MATHS, niv = niveauCourant(), T = TRIMESTRES[niv];
    if(!MA) return A.accueil();
    const nt = notes(), ligneNote = k => { const x = nt[niv + '-' + k]; return x ? tx('Dernière note : {0}/20 · meilleure : {1}/20', virg(x.last), virg(x.best)) : tx('Pas encore de note'); };
    A.poser(A.barre('maths') + '<main class="coin-anglais coin-maths trimestres-ecran"><h2>' + esc(tx('📅 Mes trimestres de spé maths')) + ' · ' + esc(niv) + '</h2>' +
      (!T ? '<p class="pieges-intro">' + esc(tx('Ces contrôles existent pour la 1re et la terminale : choisis l’onglet 1re ou Tle.')) + '</p>' :
        '<p class="pieges-intro">' + esc(tx('Chaque trimestre : un entraînement (corrigé, sans chrono) et un contrôle de {0} questions en {1} minutes, noté sur 20.', N, MINUTES)) + '</p>' +
        '<p class="petit">' + esc(tx('La progression suit l’ordre le plus courant ; ton prof peut avoir le sien : c’est un repère, pas le vrai contrôle de ta classe.')) + '</p>' +
        '<div class="domaines">' + T.map(t => '<section class="domaine trimestre"><h3>' + esc(tx(NOMS[t.id])) + ' <small>' + esc(tx(t.mois)) + '</small></h3>' +
          '<p><strong>' + esc(tx(t.themes)) + '</strong></p>' +
          '<p class="petit">' + esc(tx('Chapitres du trimestre :')) + ' ' + esc(chapitres(niv, t.id).map(nomChap).join(' · ')) + '</p>' +
          '<div class="actions serrees"><button class="moyen" data-a="maths-tri-entr" data-v="' + t.id + '">' + esc(tx('🏋️ S’entraîner')) + '</button>' +
          '<button class="moyen plein" data-a="maths-tri-ctrl" data-v="' + t.id + '">' + esc(tx('📝 Contrôle')) + '</button></div>' +
          '<p class="petit note-tri">' + esc(ligneNote(t.id)) + '</p></section>').join('') +
        '<section class="domaine trimestre"><h3>' + esc(tx('🏆 Contrôle bilan de l’année')) + '</h3><p class="petit">' + esc(tx('Les trois trimestres mélangés, comme un dernier contrôle avant l’examen.')) + '</p>' +
          '<div class="actions serrees"><button class="moyen plein" data-a="maths-tri-ctrl" data-v="bilan">' + esc(tx('📝 Contrôle')) + '</button></div><p class="petit note-tri">' + esc(ligneNote('bilan')) + '</p></section></div>') +
      '<div class="actions serrees"><button class="moyen" data-a="maths">' + esc(tx('🔢 Coin maths')) + '</button></div></main>');
  }

  function lancer(t, controle){
    const A = api(), MA = window.MATHS, niv = niveauCourant(), ids = chapitres(niv, t);
    if(!MA || !ids.length || (t !== 'bilan' && !NOMS[t])) return accueil();
    const e = A.etatMaths(), liste = MA.serie(ids, N, Math.floor(Math.random() * 1e9), e.ton);
    if(!liste.length) return accueil();
    const titre = (controle ? tx('📝 Contrôle') : tx('🏋️ Entraînement')) + ' · ' + niv + ' · ' + (t === 'bilan' ? tx('🏆 Contrôle bilan de l’année') : tx(NOMS[t]));
    const bilan = {};
    A.questionsGo(liste, { titre, retour:'maths', prof:true, lang:MA.tr.langue(), finA:controle ? Date.now() + MINUTES * 60000 : 0,
      onReponse:(juste, q) => { const s = e.chap[q.chap] || (e.chap[q.chap] = { ok:0, n:0 }); s.n++; if(juste) s.ok++; else A.noterErreur('maths:' + q.chap);
        const b = bilan[q.chap] || (bilan[q.chap] = { ok:0, n:0 }); b.n++; if(juste) b.ok++; A.garder(); },
      fin:z => fin(z, t, controle, titre, bilan) });
  }

  function fin(z, t, controle, titre, bilan){
    const A = api(), esc = A.esc, niv = niveauCourant(), note = Math.round(20 * z.bonnes / Math.max(1, z.liste.length) * 10) / 10;
    const j = A.J(); j.plumes += z.bonnes;
    if(controle){ const nt = notes(), k = niv + '-' + t, x = nt[k]; nt[k] = { last:note, best:x ? Math.max(x.best, note) : note, n:x ? x.n + 1 : 1 }; j.mathsTri = nt; }
    A.garder(); A.bruit('fin');
    const horsTemps = controle && z.i < z.liste.length;
    // Une question non posée (chrono) compte dans le bilan du chapitre comme une question manquée.
    if(horsTemps) z.liste.slice(z.i).forEach(q => { const b = bilan[q.chap] || (bilan[q.chap] = { ok:0, n:0 }); b.n++; });
    const lignes = Object.entries(bilan).sort((a, b) => a[1].ok / a[1].n - b[1].ok / b[1].n);
    const faibles = lignes.filter(([, b]) => b.ok / b.n < .6).map(([id]) => id);
    const mot = note >= 16 ? 'Très bien : Prof Pi range sa craie, respect. 👏' : note >= 14 ? 'Bien : encore deux ou trois réglages et c’est parfait.' : note >= 10 ? 'Assez bien : la base est là, on muscle les chapitres en rouge.' : 'Prof Pi a eu de quoi vanner… On reprend les chapitres en rouge et on retente !';
    A.poser(A.barre('maths') + '<main class="centre examen-fin trimestre-fin"><div class="ami-moyen">' + A.ami(note >= 12 ? 'fete' : 'malin') + '</div><h2>' + esc(titre) + '</h2>' +
      (horsTemps ? '<p class="petit">' + esc(tx('⏱️ Temps écoulé : les questions sans réponse comptent comme fausses.')) + '</p>' : '') +
      '<p class="gros-score">' + z.bonnes + '/' + z.liste.length + (controle ? ' · ' + virg(note) + '/20' : '') + '</p><p>' + esc(tx(mot)) + '</p><p>🪶 +' + z.bonnes + '</p>' +
      '<h3>' + esc(tx('Bilan par chapitre')) + '</h3><ul class="pieges-cats bilan-chap">' + lignes.map(([id, b]) => '<li class="' + (b.ok / b.n < .6 ? 'rate' : 'ok') + '">' + (b.ok / b.n < .6 ? '🔴 ' : '🟢 ') + esc(nomChap(id)) + ' : ' + b.ok + '/' + b.n + '</li>').join('') + '</ul>' +
      (faibles.length ? '<p><strong>' + esc(tx('À retravailler :')) + '</strong></p><div class="liste-chap">' + faibles.map(id => '<button class="chap" data-a="maths-chap" data-v="' + esc(id) + '"><span>' + esc(nomChap(id)) + '</span><em>▶</em></button>').join('') + '</div>'
        : '<p>' + esc(tx('Rien à retravailler : tout le trimestre est solide ! 🎉')) + '</p>') +
      '<div class="actions serrees">' + (controle ? '<button class="moyen plein" data-a="maths-tri-ctrl" data-v="' + t + '">' + esc(tx('🔁 Refaire le contrôle')) + '</button>' : '<button class="moyen plein" data-a="maths-tri-entr" data-v="' + t + '">' + esc(tx('🏋️ S’entraîner')) + '</button>') +
      '<button class="moyen" data-a="maths-tri">' + esc(tx('📅 Mes trimestres')) + '</button></div></main>');
  }

  M.cartes.maths.push(() => TRIMESTRES[niveauCourant()] ? '<div class="cartes-anglais">' + M.carte('maths-tri', '', '📅', api().esc(tx('📅 Mes trimestres de spé maths')).replace(/^📅 /, ''), api().esc(tx('Entraînements et contrôles du 1er, 2e et 3e trimestre'))) + '</div>' : '');
  Object.assign(M.actions, { 'maths-tri':() => accueil(), 'maths-tri-entr':v => lancer(v, false), 'maths-tri-ctrl':v => lancer(v, true) });
  window.AMI_TRIMESTRES = { TRIMESTRES, N, MINUTES, chapitres, notes };
})();
