// Ami des mots — v6.51 : des vannes fraîches pour qu'un même joueur ne retombe pas sur les mêmes d'un exercice à l'autre.
// Agrandit les petites réserves du trash talk et des punchlines (bonne réponse, série, réponse lente ou rapide…).
// Règle maison : la vanne vise la RÉPONSE, jamais la personne. Chargé après js/trash-talk.js et js/vannes-arrogantes.js.
(function(){
  'use strict';
  const TT = window.TRASH_TALK; if(!TT) return;
  const ajouter = (l, x) => { if(Array.isArray(l)) for(const s of x) if(!l.includes(s)) l.push(s); };

  // Mauvaise réponse : tchatche de stand-up (préfixe 🥊).
  ajouter(TT.TCHATCHE, [
    '🥊 Cette réponse a pris la sortie d’autoroute juste avant la bonne. Le GPS est en train de recalculer.',
    '🥊 Plumo a mis ta réponse au micro-ondes. Toujours pas cuite.',
    '🥊 Ta réponse vient d’entrer dans la salle, elle a regardé autour d’elle… et s’est assise à la mauvaise table.',
    '🥊 Le jury délibère. Le jury rigole. Le jury dit non.',
    '🥊 J’ai demandé à l’assistant vocal de vérifier ta réponse. Il a répondu « hmm ». Même lui.',
    '🥊 Cette réponse avait du style, du panache, de l’assurance… il lui manquait juste d’être juste.',
    '🥊 Ta réponse est partie en mission secrète. Si secrète que la bonne réponse n’est pas au courant.',
    '🥊 Plumo a rembobiné la cassette. Même au ralenti, c’est toujours faux.',
    '🥊 Breaking news : une réponse s’est perdue entre la question et le bouton. On lance un avis de recherche.',
    '🥊 Ta réponse a coché toutes les cases… sauf la bonne.',
    '🥊 Plumo a fait un sondage dans la cour : zéro voix pour cette réponse. Même pas la sienne.',
    '🥊 Cette réponse, c’est un selfie avec le doigt devant l’objectif. L’intention est là.',
    '🥊 J’ai cherché ta réponse dans le manuel. Elle n’y est pas. J’ai cherché sous le manuel. Toujours pas.',
    '🥊 Ta réponse a raté le bus, puis le métro, puis le train. Elle arrive à pied, par l’autre ville.',
    '🥊 La bonne réponse t’a envoyé un message. Vu à 14 h 02. Pas de réponse.',
    '🥊 Plumo valide l’originalité. Plumo refuse le point.',
    '🥊 Cette réponse a été écrite en police invisible : on ne voit pas où elle veut aller.',
    '🥊 Le prof imaginaire de Plumo vient de faire tomber sa craie.',
    '🥊 Ta réponse a appuyé sur « passer l’intro »… et sur la moitié du film.',
    '🥊 On a pris le bon ingrédient, la bonne recette… et on a mis du sel à la place du sucre.',
    '🥊 Cette réponse fait du cosplay de la bonne. Le déguisement ne trompe personne.',
    '🥊 Plumo a lancé un dé pour départager. Le dé a dit non aussi.',
    '🥊 Ta réponse est comme une chaussette dans la machine : elle a disparu de la bonne paire.',
    '🥊 On rembourse le ticket ? Cette réponse n’était pas dans le programme.',
    '🥊 Plumo met un post-it sur ta réponse : « à revoir ». Puis un deuxième. Puis toute la pochette.',
    '🥊 Cette réponse a confondu le plan et le dessin du plan. Ambitieux.',
    '🥊 Ta réponse vient de faire un créneau… sur le trottoir d’en face.',
    '🥊 Plumo a calculé : la probabilité de cette réponse était faible. Tu l’as quand même trouvée. Bravo… à l’envers.',
    '🥊 Ta réponse a téléchargé la mauvaise mise à jour. Redémarrage conseillé.',
    '🥊 Si cette réponse était une recette, ce serait des pâtes à l’eau froide.',
    '🥊 La bonne réponse et la tienne se sont croisées dans le couloir. Elles ne se sont pas dit bonjour.',
    '🥊 Plumo a écouté ta réponse en vitesse x2. Puis x0,5. Rien à faire, ça ne colle pas.',
    '🥊 Cette réponse est un très beau plan B. Dommage qu’on cherchait le plan A.',
    '🥊 Ta réponse porte des lunettes de soleil la nuit : beaucoup d’assurance, très peu de visibilité.',
    '🥊 Le tableau noir a soupiré. Si si, je l’ai entendu.',
    '🥊 Plumo pensait avoir tout vu. Cette réponse vient d’ajouter un chapitre.',
    '🥊 Ta réponse a joué en mode difficile alors que la question était en mode facile.',
    '🥊 On a vérifié au VAR : la réponse était hors-jeu dès le départ.',
    '🥊 Ta réponse avait une chance sur quatre. Elle a choisi l’aventure.',
    '🥊 Plumo range ta réponse dans le tiroir « idées créatives ». Pas dans « bonnes réponses ».'
  ]);

  // Mauvaise réponse : entrée de round (préfixe 🥊).
  ajouter(TT.ENTREE, [
    '🥊 Et un point de plus au compteur de Plumo !', '🥊 Plumo encaisse le point et fait un petit pas de danse.',
    '🥊 Round gagné par Plumo, sans même enlever ses lunettes.', '🥊 Plumo lève une aile : arbitre, le point est pour moi.',
    '🥊 Plumo range ce point dans sa collection. Elle commence à être belle.', '🥊 Hop, un point gratuit. Plumo dit merci.',
    '🥊 Plumo n’a pas eu besoin de forcer sur celle-là.', '🥊 Le score bouge… du côté de Plumo.',
    '🥊 Plumo souffle sur ses plumes comme sur une médaille.', '🥊 Un de plus pour le hibou ! La foule (imaginaire) est en délire.',
    '🥊 Plumo ajoute une encoche sur son perchoir.', '🥊 Plumo applaudit… sa propre victoire.',
    '🥊 Ce round-là, Plumo le met dans son best-of.', '🥊 Plumo réclame une statue. Petite, mais une statue.',
    '🥊 Plumo note le point, souligne deux fois, met une étoile.', '🥊 Et c’est Plumo qui marque ! Quelle action, mesdames et messieurs.',
    '🥊 Plumo ne dit rien. Plumo sourit. C’est pire.', '🥊 Le panneau d’affichage s’allume pour Plumo.',
    '🥊 Plumo glisse le point dans sa poche. Il est léger, mais il compte.', '🥊 Plumo vient de gagner ce duel aux tirs au but.',
    '🥊 Ce point a un goût de croissant chaud, d’après Plumo.', '🥊 Plumo fait le geste du « chut ». Le point est à lui.',
    '🥊 Le hibou mène la danse sur ce coup-là.', '🥊 Plumo encadre ce point et l’accroche au mur.',
    '🥊 Encore un pour Plumo. Il commence à avoir besoin d’une plus grande étagère.', '🥊 Plumo prend le point et fait une révérence.',
    '🥊 Ce point, Plumo ne l’a même pas cherché : il est venu tout seul.', '🥊 Plumo coche la case « gagné » avec un grand sourire.',
    '🥊 Plumo est d’humeur généreuse… mais pas au point de rendre ce point.', '🥊 Plumo inscrit son nom au tableau d’honneur du round.',
    '🥊 Le chrono s’arrête, le point part chez Plumo.', '🥊 Plumo vient de piquer ce point comme un pigeon pique une frite.',
    '🥊 Ce point, Plumo le dédie à tous les hiboux du monde.', '🥊 Plumo lisse ses plumes : ce round lui va très bien.',
    '🥊 Point Plumo. Mais rien n’est perdu : le match est long.'
  ]);

  // Bonne réponse en mode trash talk (préfixe 🥊).
  ajouter(TT.BRAVO, [
    '🥊 Bien joué. Plumo note ça dans son carnet « menaces sérieuses ».', '🥊 Juste ! Plumo vérifie si tu n’as pas un sosie plus fort.',
    '🥊 Ça passe. Plumo fait semblant de bâiller pour cacher sa surprise.', '🥊 Point pour toi. Plumo réclame une enquête.',
    '🥊 Validé. Plumo range sa vanne pour la prochaine fois.', '🥊 Correct. Plumo ajuste ses lunettes : il n’a pas rêvé.',
    '🥊 Bonne réponse. Plumo dit que c’était facile. Plumo est un peu jaloux.', '🥊 Juste. Le hibou relit la question… oui, c’est bon.',
    '🥊 Bien vu ! Plumo sort son mouchoir : il a une poussière dans l’œil.', '🥊 Joli coup. Plumo demande le replay au ralenti.',
    '🥊 Ça, c’est fait. Plumo serre les dents… enfin, le bec.', '🥊 Exact. Plumo prépare déjà une question plus vicieuse.',
    '🥊 Bonne réponse ! Plumo appelle son coach.', '🥊 Juste ! Plumo cherche une excuse : le soleil dans les yeux.',
    '🥊 Bien joué. Plumo l’admet, mais tout bas.', '🥊 Correct. Plumo te regarde avec un nouveau respect, un tout petit.',
    '🥊 Juste. Plumo déchire sa fiche de pronostics.', '🥊 Point pour toi ! Plumo prétend qu’il t’a laissé gagner.',
    '🥊 Validé. Plumo écrit « coriace » à côté de ton nom.', '🥊 Exact ! Plumo boit une gorgée d’eau, l’air de rien.',
    '🥊 Bonne réponse. Plumo hausse un sourcil. Il en a deux, il en garde un pour la suite.', '🥊 Juste ! Plumo pose son micro… puis le reprend.',
    '🥊 Bien vu. Le hibou se demande s’il doit réviser lui aussi.', '🥊 Correct ! Plumo applaudit d’une seule aile. C’est déjà ça.',
    '🥊 Juste. Plumo déclare forfait pour cette question. Pas pour le match.', '🥊 Validé ! Plumo fait mine d’envoyer un message très important.',
    '🥊 Bonne réponse. Plumo dit que ça compte double… pour lui la prochaine fois.', '🥊 Exact. Plumo cherche le bouton « annuler ». Il n’existe pas.',
    '🥊 Juste ! Plumo fait le malin, mais ses plumes tremblent.', '🥊 Bien joué. Plumo te met dans sa liste d’adversaires à surveiller.'
  ]);

  // Séries (trash talk).
  ajouter(TT.SERIE_OK, [
    '🥊 {k} d’affilée. Plumo vient de commander un casque.', '🥊 {k} de suite ! Plumo vérifie que ce n’est pas un bug.',
    '🥊 Série de {k}. Plumo fait sa valise, au cas où.', '🥊 {k} sans faute. Plumo a besoin d’un câlin.',
    '🥊 {k} d’affilée… Plumo parle tout seul dans un coin.', '🥊 {k} bonnes. Plumo envisage une carrière de pigeon voyageur.',
    '🥊 {k} de rang ! Plumo réclame le carton jaune… pour lui-même.', '🥊 Combo {k} ! Les plumes de Plumo se dressent.',
    '🥊 {k} à la file. Plumo a sorti le drapeau blanc, mais il le cache.', '🥊 {k} d’affilée. Plumo vient d’éteindre sa propre musique d’entrée.',
    '🥊 {k} de suite. Plumo demande si on peut rejouer depuis le début.', '🥊 Série de {k} ! Plumo appelle sa maman.',
    '🥊 {k} sans trembler… Plumo compte sur ses doigts pour vérifier.', '🥊 {k} bonnes réponses. Plumo boude un peu. Beaucoup.',
    '🥊 {k} d’affilée ! Plumo renomme le jeu « défaite de Plumo ».', '🥊 {k} de suite. Le perchoir de Plumo vacille.',
    '🥊 {k} à la suite. Plumo prépare un discours de concession.', '🥊 Série de {k}. Plumo dit qu’il était distrait. On le croit pas.',
    '🥊 {k} d’affilée. Plumo n’a plus de vannes, il a des questions.', '🥊 {k} de rang. Même l’écho dit « bravo ».'
  ]);
  ajouter(TT.SERIE_KO, [
    '🥊 {k} rounds pour Plumo… mais les grands retours commencent toujours après un mauvais départ.',
    '🥊 Plumo mène de {k}. Respire, lis l’explication, et reviens plus fort.',
    '🥊 {k} pour le hibou. La prochaine est la bonne, Plumo le sent.',
    '🥊 Plumo empile {k} points. Il te laisse une ouverture : prends-la !',
    '🥊 {k} d’affilée pour Plumo. C’est le moment parfait pour une remontée de légende.',
    '🥊 {k} de suite pour Plumo. Petite pause, grande respiration, et on y retourne.',
    '🥊 Plumo est à {k}. Il commence à se croire invincible. Prouve-lui le contraire !',
    '🥊 {k} points pour le hibou. Mais le match n’est pas fini, loin de là.',
    '🥊 {k} rounds de rang pour Plumo. Lis bien les explications : elles sont là pour toi.',
    '🥊 {k} pour Plumo. Le hibou a la grosse tête : il est temps de la dégonfler !',
    '🥊 Plumo a {k} points d’avance. Il range déjà son trophée. Trop tôt, Plumo, trop tôt.',
    '🥊 {k} de suite pour Plumo… la question d’après te donne ta revanche.',
    '🥊 Plumo mène {k} à 0 sur la série. Toutes les séries s’arrêtent un jour : à toi d’arrêter celle-là.',
    '🥊 {k} pour le hibou. Allez, une bonne et c’est lui qui transpire.',
    '🥊 {k} rounds d’affilée pour Plumo. On respire, on relit, on frappe.',
    '🥊 {k} de rang pour Plumo. Il est content, mais il sait que tu reviens toujours.'
  ]);

  // Bonne réponse (tons « tout doux », « taquin », « cash »).
  if(TT.BONNE){
    ajouter(TT.BONNE.doux, [
      'Bravo ! Tu peux être fier·e de toi. 🌟', 'Bonne réponse ! Ça fait plaisir à voir. 😊', 'Super ! Tu as bien réfléchi. 🧠✨',
      'Juste ! Une étoile de plus dans ton ciel. ⭐', 'Bien joué ! On continue comme ça ? 🚀', 'Exact ! Plumo est tout content. 🦉',
      'Bravo, c’est bien ça ! 🎉', 'Bonne réponse ! Tu progresses à vue d’œil. 🌱', 'Parfait ! Ta réponse est toute propre. 🧼',
      'Oui ! Tu as trouvé le bon chemin. 🧭', 'Juste ! Ton crayon peut sourire. ✏️', 'Bravo ! Une de plus dans la poche. 👜',
      'Bonne réponse ! Plumo te fait un câlin de plumes. 🤗', 'Bien vu ! Tu as l’œil. 👁️', 'Exact ! Ça mérite un petit high five. ✋',
      'Super travail ! Le soleil brille un peu plus. ☀️', 'Juste ! Ton cahier est tout content. 📓', 'Bravo ! Ta tête est en pleine forme. 💪',
      'Bonne réponse ! Ta lampe s’est bien allumée. 💡', 'C’est ça ! On avance tranquillement. 🐢✨']);
    ajouter(TT.BONNE.taquin, [
      'Juste. Bon, celle-là, je te la donne. 😏', 'Bonne réponse… je commençais à m’ennuyer. 😴', 'Correct ! Je vérifie si le soleil s’est levé à l’ouest. 🌅',
      'Juste. Tu as eu un éclair de génie ou un éclair tout court ? ⚡', 'Validé ! Mais je garde un œil sur toi. 👁️', 'Exact. Je ne dirai rien à personne. Promis. 🤐',
      'Bonne réponse ! On dirait que tu as lu la leçon. Étonnant. 📖', 'Juste ! Ta réponse a mis ses plus beaux habits. 👔', 'C’est ça. Je suis presque impressionné. Presque. 🤏',
      'Correct ! Tu as un abonnement aux bonnes réponses ou quoi ? 📬', 'Juste. Le stylo rouge reste dans sa trousse… pour l’instant. 🖍️', 'Bien vu. Je soupçonne un entraînement secret. 🥋',
      'Bonne réponse ! Ne t’habitue pas trop. 😌', 'Exact. Tu as la chance avec toi, ou le talent. Je ne tranche pas. ⚖️', 'Juste ! Je cherchais un piège… c’est toi qui l’as évité. 🪤',
      'Validé. Ta réponse a fait ses devoirs. 📝', 'C’est juste. J’ai vérifié deux fois, ça m’arrange pas. 🔎', 'Correct ! La question est vexée. 😤',
      'Bonne réponse ! Le niveau monte, attention à la tête. 🎈', 'Juste. Tu as pris le raccourci intelligent. 🛤️', 'Exact ! Ça, c’était propre, je l’admets. 🧽',
      'Bien joué ! La prochaine sera moins gentille. 😈', 'Juste ! Ta mémoire a fait du zèle aujourd’hui. 🧠', 'Correct. La réponse est arrivée à l’heure, pour une fois. ⏰',
      'Bonne réponse ! Je retire le mot « facile » de ma liste. ✂️']);
    ajouter(TT.BONNE.cash, [
      'Juste, frérot. Mais on se calme, le match est long. 🧊', 'Validé ! Ton aura vient de passer en 4K. 📺', 'Bonne réponse. Screenshot, encadre, accroche au salon. 🖼️',
      'Correct ! Le boss du niveau prend des notes. 📝', 'Juste ! T’as débloqué le mode légende. Pour une question. 🏅', 'Propre. Même le Wi-Fi est plus rapide quand tu réponds juste. 📶',
      'Validé, gros. Le groupe de classe peut se taire. 🤫', 'Bonne réponse ! Ça mérite un son de victoire. 🎺', 'Juste. Faut que j’aille chercher de nouvelles vannes. 🛒',
      'Correct ! T’es en feu, mais on a des extincteurs. 🧯', 'Juste ! La question a rage quit. 🎮', 'Bonne réponse. Le chat de la classe est en PLS. 💬',
      'Validé. Ton combo vient d’impressionner un hibou. Rare. 🦉', 'Juste, chef. On garde la tête froide quand même. ❄️', 'Correct ! Les autres réponses font la queue pour s’excuser. 🚶',
      'Bonne réponse, frère. On dirait un speedrun. ⏱️', 'Juste ! Même le prof remplaçant serait fier. 👨‍🏫', 'Propre ! T’as mis la réponse en lucarne. ⚽',
      'Validé ! On sort les lunettes de soleil, ça brille trop. 🕶️', 'Juste. Ton niveau de flow est inquiétant. 🌊', 'Bonne réponse ! Plumo modifie son classement. 📊',
      'Correct ! T’as cassé le game sur celle-là. 🎯', 'Juste ! Même la sonnerie attend que tu finisses. 🔔', 'Validé, champion. Mais la prochaine est en mode boss. 👹',
      'Bonne réponse. On est sur du très haut niveau là, wesh. 🏔️']);
  }

  ajouter(TT.SERIE_BONNE, [
    '{k} d’affilée ! Plumo vérifie qu’il n’y a pas de souffleur dans la salle. 🎭', '{k} de suite ! Le carnet de notes demande une pause. 📒',
    '{k} bonnes réponses ! Plumo commence à t’appeler « professeur ». 🎓', '{k} d’affilée ! On dirait une démonstration. 🧪',
    '{k} de suite ! Le stylo rouge est au chômage technique. 🖊️', '{k} d’affilée ! Plumo t’offre une couronne en carton. 👑',
    '{k} de suite. Tu fais exprès de tout savoir ? 🤨', '{k} d’affilée ! Le chrono t’applaudit. ⏱️',
    '{k} bonnes de suite ! Plumo prépare des questions plus coriaces. 🧗', '{k} d’affilée ! Même l’ordinateur est impressionné. 💻',
    '{k} de suite ! Ça mérite un jingle. 🎶', '{k} d’affilée. Plumo a besoin de s’asseoir. 🪑',
    '{k} bonnes réponses ! La série devient une saga. 📚', '{k} de suite ! Le record de la maison tremble. 🏠',
    '{k} d’affilée ! Plumo envoie la photo à toute sa famille hibou. 📸', '{k} de suite. Tu as mangé un dictionnaire au petit déjeuner ? 🥣'
  ]);

  // Réponse lente (plus de 25 secondes) : sur le temps, jamais sur la personne.
  ajouter(TT.LENT, [
    'Le chrono a eu le temps de faire une sieste. ⏰', 'Pendant ce temps, Plumo a appris à tricoter. 🧶', 'On a eu le temps de refaire la déco de la classe. 🎨',
    'La question a commencé à prendre racine. 🌳', 'Plumo a fini son goûter en attendant. 🥐', 'Le sablier a demandé des renforts. ⌛',
    'Les saisons ont presque changé. 🍂', 'La réponse a pris l’escalier au lieu de l’ascenseur. 🪜', 'On a eu le temps de faire chauffer l’eau des pâtes. 🍝',
    'Un escargot vient de doubler la réponse. 🐌', 'La question a vieilli de deux ans. 🎂', 'Plumo a eu le temps de compter ses plumes. Toutes. 🪶',
    'Pendant que tu réfléchissais, la Lune a avancé dans le ciel. 🌙', 'La réponse est arrivée en diligence. 🐎', 'Le chrono a fait trois fois le tour du stade. 🏟️',
    'Prends ton temps… mais pas celui de toute la classe ! 😄', 'On a eu le temps de recharger le téléphone. 🔋', 'La réponse est venue à la nage, depuis l’autre rive. 🏊',
    'Plumo a fait une partie de dames pendant l’attente. ♟️', 'La question commençait à écrire ses mémoires. 📖', 'Le sablier a fait des heures sup. ⏳',
    'Le soleil a eu le temps de bronzer. 😎', 'Plumo a rangé toute sa chambre en attendant. 🧹', 'La réponse a pris le chemin des écoliers. 🎒',
    'On a vu passer trois nuages et un avion. ☁️✈️'
  ]);

  // Réponse rapide (moins de 3 secondes) et mot difficile trouvé.
  ajouter(TT.RAPIDE, [
    'Réponse livrée en express, même pas le temps de dire ouf. 📦', 'Le chrono n’a pas eu le temps de démarrer. ⏱️', 'Plus rapide qu’un éternuement ! 🤧',
    'Tu as répondu en mode turbo. 🏎️', 'La question n’avait pas fini de se présenter. 👋', 'Flash vient de demander ton secret. ⚡',
    'Réponse plus rapide que la lumière du couloir. 💡', 'Tu as dégainé la réponse comme un cow-boy. 🤠', 'Clic-clac, c’est dans le sac ! 👜',
    'Le chrono crie à la triche. Mais non, c’est juste toi. ⏲️', 'La question a cligné des yeux et c’était fini. 😳', 'Tu es passé en vitesse lumière. 🌠',
    'Réponse instantanée, comme un café soluble. ☕', 'Même la notification n’a pas eu le temps de sonner. 🔕', 'On n’a vu qu’un éclair passer. 🌩️'
  ]);
  ajouter(TT.DIFFICILE, [
    'Ce mot-là, peu de gens l’ont dans leur poche ! 👜', 'Mot de champion trouvé ! Le dictionnaire t’envoie un clin d’œil. 😉',
    'Tu as sorti un mot de collection. 🏆', 'Même le correcteur automatique ne le connaissait pas ! 🤖', 'Un mot rare, trouvé du premier coup. Chapeau ! 🎩',
    'Tu viens de dénicher un trésor du vocabulaire. 💎', 'Ce mot-là fait partie des boss du dictionnaire. 👾', 'Mot difficile : vaincu ! 🏅',
    'Tu as trouvé le mot que tout le monde cherche. 🔍', 'Ce mot était bien caché, et tu l’as trouvé. 🕵️', 'Les mots compliqués commencent à te craindre. 😅',
    'Ce mot mérite une médaille, et toi aussi. 🥇'
  ]);

  // Version anglaise (interface en anglais).
  ajouter(TT.BONNE_EN, [
    'Correct! The question did not see that coming. 😮', 'Right! Plumo is pretending not to be impressed. 😐', 'Yes! That answer had its homework done. 📝',
    'Spot on! The red pen is on holiday. 🏖️', 'Correct! Even the clock is clapping. ⏰', 'Nice one! Your streak is warming up. 🔥',
    'Right! Plumo checks the replay… still correct. 📺', 'Bang on! That was clean. 🧽', 'Correct! Do not let it go to your head. 🎈',
    'Yes! Plumo writes your name in the “watch out” list. 📋', 'Right! The question is a bit annoyed. 😤', 'Correct! Lucky or brilliant? The jury is still out. ⚖️',
    'Spot on! Plumo needs harder questions. 🧗', 'Yes! That answer arrived right on time. 🚆', 'Correct! Screenshot it for the record. 📸',
    'Right! Even the Wi-Fi got faster. 📶', 'Nailed it! Plumo is taking notes. 🗒️', 'Correct! Plumo claps with one wing. It counts. 👏',
    'Yes! The next one will be trickier. 😈', 'Right! Your score just levelled up. 🎮'
  ]);
})();
