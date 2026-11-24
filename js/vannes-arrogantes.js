// Ami des mots — v6.9 : punchlines bien arrogantes quand on a JUSTE (le joueur doit se sentir puissant),
// et nouvelles vannes (erreur, réponse lente, provocation, défaite, victoire). Tri fait selon la règle du jeu :
// on chambre la RÉPONSE, la situation ou Plumo — jamais la personne. Les phrases qui insultaient le joueur
// (« deux neurones », « la bêtise comme sport »…) ont été écartées ou réécrites sur la réponse.
(function(){
  'use strict';
  const TT = window.TRASH_TALK; if(!TT) return;
  const ajouter = (l, x) => { for(const s of x) if(!l.includes(s)) l.push(s); };
  // Bonne réponse — valable partout (mots, maths, matières).
  const ARROGANT = [
    'ENFIN une réponse digne de ce nom ! 🧠', 'Tu as trouvé ? Je commençais à perdre espoir. 😮‍💨', 'Propre ! Même la question est surprise. 😳',
    'Une bonne réponse ? On tient un phénomène ! 🌟', 'Mais regardez-moi ce génie en liberté ! 🎓', 'Validé ! Le génie était présent, on le note au registre. 📋',
    'Tu as visé juste. Ça devient dangereux pour les autres. 🎯', 'Une réponse correcte ! Quel retournement de situation ! 🔄', 'Propre. Même les profs applaudissent. 👏',
    'Le génie est officiellement connecté. 🔌', 'Ça sent le champion à plein nez. 🏆', 'Une réponse tellement propre qu’on pourrait manger dessus. 🍽️',
    'BOOM ! Bien joué ! 🔥', 'Respect. Là, même Plumo ferme son bec. 🦉', 'Tu viens de débloquer le mode génie interdit. 🔓', 'Une performance aussi insolente devrait être taxée. 💸'];
  // Bonne réponse — jeux de mots (vocabulaire, anglais) : « dictionnaire », « lettres »…
  const ARROGANT_MOTS = [
    'BOOM ! Le dictionnaire vient de prendre un coup de chaud. 🥵', 'Tu viens de rappeler aux lettres qui commande. 🔤', 'OHHH ! Le dictionnaire a trouvé son patron ! 👑',
    'Tu viens de cuisiner la langue française. 👨‍🍳', 'Qui t’a donné autant de vocabulaire ? 📚', 'Le dictionnaire demande ton autographe. ✍️', 'Même les mots ont peur de toi. 😱',
    'Le boss des mots est dans la place ! 😎', 'Machine à vocabulaire activée ! ⚙️'];
  // Réponse rapide (moins de 3 secondes).
  const RAPIDE = [
    'Même pas eu le temps de cligner des yeux ! 👀', 'Tu as répondu avant que la question ait fini d’exister. ⚡', 'Ça tourne au carburant de fusée là-haut ? 🚀',
    'Calme-toi, Einstein, on n’a pas encore commencé ! 🧪', 'Réponse éclair ! Les autres sont encore au chargement. ⏳', 'Tu as dégainé plus vite que ton ombre. 🤠',
    'Le chrono vient de déposer sa démission. ⏱️', 'Tu viens de battre le temps lui-même. 🏁', 'La réponse est arrivée avant la question dans ta tête. 🔮'];
  // Série de bonnes réponses ({k} = nombre d'affilée).
  const SERIE = [
    '{k} d’affilée ! Tu comptes laisser quelque chose aux autres ? 🍰', '{k} de suite ! STOP, laisse les miettes aux débutants. 🥐', '{k} d’affilée… le dictionnaire est en PLS. 🛌',
    '{k} de suite ! C’est plus une série, c’est un marathon. 🏃', '{k} d’affilée ! Les erreurs ont peur de s’approcher de ton écran. 🙈', '{k} de suite ! À ce niveau, même les lettres te demandent conseil. 🔤',
    '{k} d’affilée ! Tu es venu jouer ou vider le dictionnaire ? 📚', '{k} de suite ! Le classement demande une protection rapprochée. 🕶️'];
  // Mot difficile trouvé (réponse longue).
  const DIFFICILE = [
    'CE MOT ?! Même les profs ont dû vérifier ! 😲', 'Tu viens de sortir un mot que personne n’utilise depuis 1842. 📜', 'Le dictionnaire vient de perdre son meilleur secret. 🤫',
    'Tu as trouvé ça dans ta mémoire ou dans les archives nationales ? 🗄️', 'Même les lettres étaient surprises de se retrouver ensemble. 🔠', 'Ce mot était caché depuis des siècles. 🏺',
    'Tu viens de faire transpirer le dictionnaire. 💦'];
  // Mauvaise réponse — sur la réponse, jamais sur le joueur.
  const ERREUR = [
    'Cette réponse : le dictionnaire vient de porter plainte. 📜', 'Cette réponse était tellement fausse qu’elle a changé de langue. 🌍', 'Cette réponse ? On cherchait un mot, pas une catastrophe naturelle. 🌪️',
    'Cette réponse a confondu vocabulaire et tirage au sort. 🎲', 'Devant cette réponse, même le correcteur automatique a levé les bras. 🙌', 'Cette réponse mérite une minute de silence. 🤐',
    'Le bon mot était juste là… et la réponse l’a esquivé. 🏃', 'Cette réponse est en mode avion. ✈️', 'Aïe. Même le clavier est déçu par cette réponse. ⌨️', 'Cette réponse mérite un contrôle technique. 🔧',
    'Le mot était facile, mais la réponse a choisi le chaos. 🌀', 'Erreur 404 : bonne réponse introuvable. 🖥️', 'Cette réponse ? Le dictionnaire vient de fermer ses portes. 🚪',
    'Cette réponse, on va faire comme si personne ne l’avait vue. 🙈', 'Pas faux… ah si, complètement. Cette réponse ose tout. 🤷', 'Cette réponse : une masterclass de presque. 🎓', 'Ça, c’est pas une faute, c’est une œuvre d’art. 🖼️',
    'Le moteur chauffe, mais la réponse est encore froide. 🔥', 'Aïe, le dictionnaire pleure devant cette réponse. 😂'];
  // Réponse lente (plus de 25 secondes).
  const LENT = [
    'Tu réfléchis ou tu attends une révélation divine ? 🌤️', 'À ce rythme, le dictionnaire va sortir une nouvelle édition. 📕', 'Même une connexion en 56K aurait répondu plus vite. 📞',
    'La réponse est partie prendre sa retraite. 🏖️', 'Le sablier a eu le temps de fonder une famille. ⏳', 'On attend la réponse ou on commande une pizza ? 🍕',
    'Même une tortue aurait déjà répondu. 🐢', 'Tu réfléchis ou tu écris une thèse ? 📝', 'Tu peux répondre avant la prochaine mise à jour ? 🔄', 'On a eu le temps d’apprendre une nouvelle langue. 🗣️'];
  // Provocation avant un duel ({n} = joueur qui va jouer).
  const PROVOC = [
    '🥊 {n}, j’espère que tu as révisé : personne ne va ralentir pour toi.', '🥊 {n}, tu peux prendre ton temps. Le suspense, lui, est déjà terminé. 😏', '🥊 {n}, bonne chance. Le dictionnaire, lui, n’en a pas besoin.',
    '🥊 {n}, prépare ton dictionnaire et ton ego.', '🥊 {n}, ici on ne discute pas : on conjugue la victoire.', '🥊 {n}, tu viens jouer ou assister à un récital ?'];
  // Fin de partie : {g} gagnant, {d} dernier.
  const FIN = [
    '🥊🏆 {g} : FIN DU MATCH ! Le dictionnaire s’incline, les autres prennent des notes.', '🥊🏆 {g} : le boss final vient de trouver son patron.', '🥊🏆 {g} : record d’insolence. Les autres peuvent réviser.',
    '🥊🏆 {g} : il reste des lettres partout, faut ranger.', '🥊🏆 {g} : ce n’est plus une victoire, c’est une démonstration publique.', '🥊🏆 {g} : le classement vient de surchauffer.',
    '🥊 {d} : le tableau des scores ne connaît pas la pitié. Retour à l’entraînement, champion.', '🥊 {d} : le chapitre est terminé, mais la revanche est déjà écrite.'];
  ajouter(TT.BONNE.cash, ARROGANT);
  ajouter(TT.BONNE.taquin, ARROGANT.slice(0, 6));
  ajouter(TT.BRAVO, ARROGANT.map(s => '🥊 ' + s));
  ajouter(TT.SERIE_BONNE, SERIE);
  ajouter(TT.IMAGEES, ERREUR);
  if(TT.TOUR) ajouter(TT.TOUR, PROVOC);
  if(TT.FIN) ajouter(TT.FIN, FIN);
  Object.assign(TT, { ARROGANT, ARROGANT_MOTS, RAPIDE, DIFFICILE, LENT,
    // Punchline de bonne réponse choisie selon la situation (rapide, mot difficile, jeu de mots).
    arrogant(ctx, memoire){ ctx = ctx || {};
      const pool = ctx.rapide ? RAPIDE : ctx.difficile ? DIFFICILE : ctx.mots ? ARROGANT_MOTS.concat(ARROGANT) : ARROGANT;
      return TT.choisir(pool, {}, memoire); },
    lent(memoire){ return TT.choisir(LENT, {}, memoire); } });
})();
