// v5.77 : 🥊 Trash talk — Ami se la raconte comme un champion de ring.
// Style « conférence de presse de combat » : pesée, face-à-face, ceinture, rounds — un perso inventé, aucun vrai combattant imité.
// Règle d'or : on chambre la RÉPONSE, le score ou la partie, jamais la personne (ni son physique, ni son intelligence).
// Variables : {n} joueur qui va jouer, {t} joueur en tête, {s} son score, {total} nombre de questions, {g} gagnant, {d} dernier.
(function(){
  'use strict';
  // Avant la vanne, quand la réponse est fausse.
  const ENTREE = [
    '🥊 Ding ding ! Premier round pour Ami.',
    '🥊 Ami n’a même pas eu besoin de s’échauffer.',
    '🥊 Ça, c’est un point pour la maison.',
    '🥊 Oh, cadeau ! Ami adore les cadeaux.',
    '🥊 Ami fait sa danse de la victoire. Ne regarde pas.',
    '🥊 Tu as visé, c’est bien. Tu as raté, c’est moins bien.',
    '🥊 Ami prend des notes pour son autobiographie.',
    '🥊 Et le hibou mène largement !',
    '🥊 Ami vient de gagner sans lever une plume.',
    '🥊 Joli essai. Ami garde quand même la ceinture.',
    '🥊 Ami avait parié dessus. Il a gagné son pari.',
    '🥊 Bip bip, la réponse est partie dans le décor.',
    '🥊 Ami prépare déjà son discours de champion.',
    '🥊 Ce n’est pas une réponse, c’est un rebondissement.',
    '🥊 L’arbitre a vu, et l’arbitre rigole.',
    '🥊 Ami ajoute ce point à sa collection. Il en a beaucoup.',
    '🥊 Ce coup-là, Ami l’avait vu venir depuis la semaine dernière.',
    '🥊 Ami a mis ses lunettes de soleil. Trop facile.',
    '🥊 Même la question est gênée pour toi.',
    '🥊 Le public siffle… la réponse, pas toi.',
    '🥊 Raté ! Ami fait un tour d’honneur sur sa branche.',
    '🥊 Ami ne dit rien. Il sourit. C’est pire.',
    '🥊 Breaking news : Ami reste invaincu.',
    '🥊 Chut… tu entends ? C’est Ami qui rigole tout bas.',
    '🥊 La réponse a glissé sur une peau de banane.',
    '🥊 Le chrono n’a même pas eu le temps de transpirer.',
    '🥊 Ami prend la photo pour le mur des légendes.',
    '🥊 Tu voulais un défi ? Ami en a un : arrêter de rire.',
    '🥊 Encore une pour le bêtisier. Merci pour le contenu !',
    '🥊 Ami se félicite tout seul. Quelqu’un doit bien le faire.',
    '🥊 C’était un piège, et tu as sauté dedans à pieds joints.',
    '🥊 Ami t’accorde une note artistique. Pas la bonne réponse.',
    '🥊 Oups. Le GPS de cette réponse a perdu le signal.',
    '🥊 Ami lance un sondage : qui avait la bonne ? Lui.',
    '🥊 Round perdu, mais le match n’est pas fini. Enfin… presque.',
    '🥊 Ami garde ce moment pour le résumé de fin de saison.',
    '🥊 Ce n’est pas grave. Pour Ami, c’est même génial.',
    '🥊 Tu as choisi la porte de gauche. Le trésor était à droite.',
    '🥊 Ami a failli s’endormir tellement c’était tranquille.',
    '🥊 Ami monte sur la table et réclame des applaudissements.',
    '🥊 Ami vient d’ajouter une étoile à son maillot.',
    '🥊 Raté ! Ami fait tourner sa serviette au-dessus de sa tête.',
    '🥊 La bonne réponse est passée juste à côté, en klaxonnant.',
    '🥊 Ami mène, et il compte bien le rappeler toute la journée.',
    '🥊 Ami t’envoie un bisou de loin. Un bisou de champion.',
    '🥊 Ce point, Ami va l’encadrer au-dessus de son nid.',
    '🥊 Plot twist : c’était faux.',
    '🥊 Ami ne se moque pas. Il célèbre. Nuance.',
    '🥊 Le score d’Ami monte, monte, monte…',
    '🥊 Ami a gagné ce round les yeux fermés. Enfin, presque fermés.',
    '🥊 Ami l’avait annoncé à la pesée. Personne ne l’a cru.',
    '🥊 Ami regarde la caméra : « Je vous l’avais dit. »',
    '🥊 Round plié en trois secondes. Ami réclame un adversaire à sa taille… enfin, à sa question.',
    '🥊 Ami lève la ceinture au-dessus de sa tête. Elle est lourde, mais il gère.',
    '🥊 Ami en conférence de presse : « Pas de commentaire. Enfin si : ha ha. »',
    '🥊 Ami avait prévenu : il ne perd jamais à domicile.',
    '🥊 Ami fait le tour du ring en saluant la foule. La foule, c’est lui.',
    '🥊 Ami n’a pas eu besoin de stratégie. Il avait juste la bonne réponse.',
    '🥊 Ami signe des autographes. Le round est déjà oublié.',
    '🥊 « Encore un adversaire qui croyait connaître la réponse », soupire Ami.'
  ];
  // Quand la réponse est juste : Ami fait semblant de ne pas être impressionné.
  const BRAVO = [
    '🥊 Ok, celle-là je te la laisse. Profite, ça ne durera pas.',
    '🥊 Coup de chance. Ami demande à revoir l’action.',
    '🥊 Pas mal… pour un échauffement.',
    '🥊 Juste. Ami fait comme s’il n’avait rien vu.',
    '🥊 Bon. D’accord. Bravo. Voilà, c’est dit.',
    '🥊 Ami range son sourire. Temporairement.',
    '🥊 Tu crois que ça impressionne Ami ? Un peu. Juste un peu.',
    '🥊 Bonne réponse. Ami vérifie quand même le règlement.',
    '🥊 Joli. Ami prend un air détaché, mais il note.',
    '🥊 Ami appelle son entraîneur. Ça devient sérieux.',
    '🥊 Bien vu. La prochaine sera plus coriace, promis.',
    '🥊 Correct. Ami avait laissé gagner, évidemment.',
    '🥊 Tu marques ! Ami fait semblant d’avoir une poussière dans l’œil.',
    '🥊 Bonne réponse… Ami répète : bonne réponse. Ça lui fait mal à dire.',
    '🥊 Touché ! Ami se relève, il n’a même pas mal.',
    '🥊 Bravo. Ami efface vite la vidéo.',
    '🥊 Ce point-là, Ami ne le mettra pas dans son livre.',
    '🥊 Ok ok, tu as révisé. Ami le prend personnellement.',
    '🥊 Juste ! Le hibou reste calme. Très calme. Trop calme.',
    '🥊 Ami applaudit… d’une seule aile.',
    '🥊 Bien joué. Ami fait semblant de regarder ailleurs.',
    '🥊 Ok, respect. Mais juste pour cette question.',
    '🥊 Bonne réponse. Ami demande qui t’a soufflé.',
    '🥊 Ça rentre ! Ami réajuste sa cravate imaginaire.',
    '🥊 Juste. Ami prépare une question encore plus vicieuse.'
  ];
  // Trois bonnes réponses ou plus d’affilée.
  const SERIE_OK = [
    '🥊 {k} d’affilée ?! Ami réclame l’arbitrage vidéo.',
    '🥊 {k} de suite. Ami commence à transpirer des plumes.',
    '🥊 Série de {k} ! Ami cherche discrètement la sortie.',
    '🥊 {k} sans trembler. Ami envoie un SMS à son avocat.',
    '🥊 {k} bonnes réponses. Ami fait semblant d’avoir une crampe.',
    '🥊 Combo x{k} ! Ami cache sa ceinture de champion.',
    '🥊 {k} à la suite… Ami demande un temps mort.',
    '🥊 {k} d’affilée. D’accord, Ami a compris, c’est la guerre.'
  ];
  // Trois erreurs ou plus d’affilée : on reste gentil, on relance.
  const SERIE_KO = [
    '🥊 Ami mène {k} à 0 sur ce round. Il est temps de contre-attaquer !',
    '🥊 {k} pour Ami d’affilée. Ami commence à s’ennuyer : fais-le mentir !',
    '🥊 Ami est en feu… mais la prochaine est pour toi. Lis bien l’explication.',
    '🥊 {k} de suite pour le hibou. Le comeback, c’est maintenant !',
    '🥊 Ami aligne {k} points de rang. Il attend ta riposte, il s’ennuie déjà.',
    '🥊 {k} rounds pour Ami. Les plus belles remontées commencent comme ça !'
  ];
  // Battle entre potes : avant le tour de {n}.
  const PREMIER = [
    '🥊 {n} ouvre le bal. Pas de pression… bon, si, toute la pression.',
    '🥊 {n} passe en premier. Ami a sorti le pop-corn ET le carnet de notes.',
    '🥊 {n}, c’est toi qui fixes la barre. Ne la mets pas sous le tapis.',
    '🥊 Premier round pour {n}. Les autres, prenez des notes.',
    '🥊 Face-à-face ! Ami fixe {n} droit dans les yeux. Il ne cligne pas. Il ne cligne JAMAIS.',
    '🥊 Pesée officielle : {n}, prêt. Ami, prêt depuis 2009.',
    '🥊 Conférence de presse : Ami annonce qu’il va gagner tous les rounds contre {n}. Ambiance.',
    '🥊 {n} monte sur le ring. Ami ajuste ses gants… pardon, ses plumes.'
  ];
  const TOUR = [
    '🥊 {n}, {t} a mis {s} points. Tu viens jouer ou juste regarder ?',
    '🥊 {t} a {s} sur {total}. {n}, tu as un plan ou tu improvises ?',
    '🥊 {n}, {t} se croit déjà sur le trône avec {s} points. Fais-le descendre !',
    '🥊 Score à battre : {s}. {n}, Ami a déjà parié contre toi. Prouve-lui le contraire.',
    '🥊 {t} fanfaronne avec {s} points. {n}, c’est l’heure de la revanche.',
    '🥊 {n}, {t} raconte partout que c’est plié. Tu laisses dire ?',
    '🥊 {s} points pour {t}. {n}, montre-nous que tu n’es pas venu pour la déco.',
    '🥊 {n}, {t} a mis la barre à {s}. Saute par-dessus, pas en dessous.',
    '🥊 {t} a déjà commandé sa couronne. {n}, annule la commande !',
    '🥊 {n}, le record de {t} ({s}) tremble rien qu’en te voyant arriver.',
    '🥊 Face-à-face entre {n} et le score de {t} : {s}. Le premier qui détourne les yeux a perdu.',
    '🥊 {t} a fait sa conférence de presse avec {s} points. {n}, à toi de lui répondre sur le ring.',
    '🥊 {t} a déjà sorti la ceinture. {n}, va la chercher.',
    '🥊 {n}, {t} dit que tu n’as pas le niveau. Ami dit que c’est à voir. Montre-lui.'
  ];
  // Fin de battle : {g} gagne, {d} finit dernier (on chambre la partie, pas la personne).
  const FIN = [
    '🥊 {g} repart avec la ceinture. {d}, la revanche t’attend, Ami a gardé ta place au chaud.',
    '🥊 {g} est champion du salon. Les autres : Ami a toutes les vidéos, et il compte s’en servir.',
    '🥊 Victoire de {g} ! {d}, ce n’était qu’un échauffement, hein ? Prouve-le à la revanche.',
    '🥊 {g} règne sur le salon. Ami lance déjà les paris pour la revanche.',
    '🥊 {g} gagne et va en parler pendant au moins trois jours. Courage à tous.',
    '🥊 Ceinture pour {g} ! Conférence de presse dans cinq minutes, {d} est invité à poser une question.',
    '🥊 {g} soulève la ceinture. {d}, la pesée de la revanche est déjà programmée.'
  ];
  const EGALITE = [
    '🥊 Égalité ! Personne ne lâche rien. Ami exige un match retour, il n’a pas fini son pop-corn.',
    '🥊 Égalité parfaite. Ami refuse de choisir : revanche obligatoire !'
  ];
  const remplir = (l, v) => String(l).replace(/\{(\w+)\}/g, (m, k) => v && v[k] != null ? String(v[k]) : m);
  // memoire (facultatif) : { age(l) → -1 si jamais dite, noter(l) } pour ne pas se répéter.
  function choisir(liste, vars, memoire, hasard){
    const r = hasard || Math.random;
    let l = liste;
    if(memoire && memoire.age){ const neuves = liste.filter(x => memoire.age(x) < 0); l = neuves.length ? neuves : liste.slice().sort((a, b) => memoire.age(b) - memoire.age(a)).slice(0, Math.max(1, Math.ceil(liste.length / 3))); }
    const x = l[Math.floor(r() * l.length)]; if(memoire && memoire.noter) memoire.noter(x);
    return remplir(x, vars);
  }
  // Tchatche de stand-up : débit rapide, mots détournés, autodérision. Mélangée aux phrases de champion.
  const TCHATCHE = [
    '🥊 Attends, attends… tu as dit ÇA ? Ami a dû relire trois fois, il a cru que son écran faisait une blague.',
    '🥊 Non mais cette réponse, elle est arrivée en trottinette, sans casque, à contresens. Respect pour l’audace.',
    '🥊 Ami t’explique : la bonne réponse était là, juste là, elle te faisait coucou. Et toi, tu as salué la voisine.',
    '🥊 Moi aussi, une fois, je me suis trompé. C’était en 2019. Je m’en souviens encore, c’était un mardi.',
    '🥊 Ta réponse, c’est comme mettre du ketchup sur un croissant : techniquement possible, moralement discutable.',
    '🥊 Ami a appelé son cousin hibou pour vérifier. Le cousin a raccroché. De rire.',
    '🥊 C’est pas faux… ah si. C’est faux. Complètement. Mais avec du style, je te l’accorde.',
    '🥊 Tu as répondu tellement vite que même la mauvaise réponse a été surprise d’être choisie.',
    '🥊 Ami a sorti la loupe, le microscope et le télescope : aucun instrument ne trouve de logique là-dedans.',
    '🥊 Cette réponse, Ami va la raconter au quartier. Dans dix ans, ce sera une légende.',
    '🥊 Raté, mais le geste était beau. Le jury donne 10 en technique, 0 en résultat.',
    '🥊 Ami dit toujours : « Qui ne tente rien n’a rien. » Là, tu as tenté. Et tu n’as rien. C’est logique.',
    '🥊 Franchement, entre nous, sans mentir, les yeux dans les yeux : non.',
    '🥊 Ami a ri tellement fort que les voisins ont demandé s’il y avait une fête.',
    '🥊 Même mon GPS se trompe moins. Et il m’a envoyé dans un lac la semaine dernière.',
    '🥊 Tu sais ce qui est fort ? Avoir quatre choix et trouver celui qui n’existe dans aucun univers connu. Champion.'
  ];
  // Expressions imagées françaises, retournées sur la RÉPONSE (ou sur Ami lui-même) — jamais sur le joueur.
  const IMAGEES = [
    'Cette réponse n’a pas la lumière à tous les étages. Il y a même un étage où le disjoncteur a sauté.',
    'Là, la lumière est allumée, mais il n’y a personne à la maison. Je parle de la réponse, hein.',
    'Cette réponse n’est pas l’ampoule la plus brillante du lustre. C’est plutôt la veilleuse.',
    'Cette réponse pédale dans la semoule. Avec un vélo sans chaîne.',
    'Celle-là, elle est complètement à l’ouest. Même la boussole a démissionné.',
    'Cette réponse n’a pas inventé l’eau chaude. Ni l’eau tiède, d’ailleurs.',
    'Ami a un petit vélo dans la tête, mais cette réponse, elle a carrément une fête foraine.',
    'Cette réponse est tombée du lit ce matin. Sur la tête, visiblement.',
    'Il manque une case à cette réponse. Peut-être deux. Ami cherche encore la troisième.',
    'Cette réponse a un pois chiche dans la tête, et il se sent bien seul.',
    'Elle est à côté de la plaque, cette réponse. À côté de la cuisine, même.',
    'Cette réponse a la tête dans les nuages. Ami lui a envoyé un parapluie.',
    'Elle a perdu le fil, cette réponse. Et la pelote avec.',
    'Ça, c’est la réponse qui confond vitesse et précipitation. Elle est partie avant le départ.',
    'Cette réponse ne casse pas trois pattes à un canard. Même pas une demi-patte.',
    'Elle tourne en rond, cette réponse. Un vrai hamster dans sa roue.',
    'Cette réponse est partie chercher le pain… et elle a ramené un tournevis.',
    'Ami est fatigué aujourd’hui : il n’a pas la lumière à tous les étages. Mais lui, au moins, il a la bonne réponse.',
    'Cette réponse a fait chou blanc. Chou-fleur, même.',
    'Elle met la charrue avant les bœufs, cette réponse. Et les bœufs ne sont pas contents.',
    'Cette réponse cherche midi à quatorze heures. Il est quinze heures, elle a déjà raté le goûter.',
    'Celle-là, elle a une araignée au plafond. Et l’araignée a tricoté toute la réponse.',
    'Cette réponse est aussi perdue qu’une poule qui a trouvé une télécommande.',
    'Elle n’est pas sortie de l’auberge, cette réponse. Elle n’a même pas trouvé la porte.',
    'Cette réponse parle chinois au calcul. Le calcul ne comprend rien.',
    'Elle s’est mélangé les pinceaux, cette réponse. Il y a de la peinture partout.',
    'Cette réponse est complètement dans le potage. Avec les vermicelles.',
    'Elle a la mémoire d’un poisson rouge, cette réponse. Le cours ? Quel cours ?',
    'Cette réponse a raté le coche, le train, le bus et la trottinette.',
    'Elle est montée sur ses grands chevaux, cette réponse. Mais les chevaux allaient dans l’autre sens.',
    // v5.81 : expressions trouvées en recherchant les classiques français, belges et québécois (toujours sur la réponse ou sur Ami).
    'Cette réponse n’est pas une lumière. Même pas une veilleuse de couloir.',
    'Cette réponse n’a pas inventé le fil à couper le beurre. Elle a inventé le beurre qui coupe le fil.',
    'Elle pédale dans la choucroute, cette réponse. Avec les saucisses en guise de pédales.',
    'Cette réponse saute du coq à l’âne. Et l’âne n’était même pas au courant.',
    'Là, la réponse s’est mis le doigt dans l’œil jusqu’au coude. Ami compatit.',
    'Cette réponse nous met dans de beaux draps. Des draps à fleurs, en plus.',
    'Elle n’est pas dans son assiette, cette réponse. Elle est dans celle du voisin.',
    'Cette réponse raconte des salades. Une salade composée, même, avec des croûtons.',
    'Ami a vu passer cette réponse : il a failli tomber dans les pommes. Des pommes golden.',
    'Cette réponse en fait tout un fromage. Un camembert entier, coulant.',
    'Elle coupe les cheveux en quatre, cette réponse… et elle se trompe quand même de coiffure.',
    'Cette réponse tourne autour du pot. Elle a fait trois tours, elle a le tournis.',
    'C’est la fin des haricots pour cette réponse. Il ne reste même plus de flageolets.',
    'Cette réponse se prend le chou toute seule. Un chou-fleur, apparemment.',
    'Elle a mis les pieds dans le plat, cette réponse. Avec des bottes en caoutchouc.',
    'Cette réponse parle à travers son chapeau, comme on dit au Québec. Et le chapeau n’est pas d’accord.',
    'Au Québec, on dirait que cette réponse a de la broue dans le toupet. Elle est débordée, la pauvre.',
    'Ça, c’est de la carabistouille, comme disent nos amis belges. Une carabistouille de compétition.',
    'Cette réponse est partie à Pétaouchnok. Sans GPS ni goûter.',
    'Elle tire à hue et à dia, cette réponse. Le cheval ne sait plus où aller.',
    'Cette réponse, c’est le serpent qui se mord la queue. Il tourne, il tourne, et il a le vertige.',
    'Cette réponse donne sa langue au chat. Le chat la rend : il n’en veut pas.',
    'Quand le cours n’est pas là, les réponses dansent. Et celle-là fait la macarena.',
    'Cette réponse a un cheveu sur la langue : elle voulait dire la bonne, elle a dit l’autre.',
    'Ça m’a mis la puce à l’oreille : cette réponse sentait le piège à plein nez.',
    'Cette réponse est dans le coaltar. Elle n’a pas bu son chocolat chaud ce matin.',
    'Il ne faut pas pousser mémé dans les orties, cette réponse exagère un peu. Beaucoup, même.',
    'Cette réponse est le dindon de la farce. Ami prépare déjà la sauce aux marrons.',
    'Elle a la tête dans le guidon, cette réponse. Et le guidon dans la semoule.',
    'Cette réponse joue les filles de l’air : elle a disparu avant la correction.',
    'Ce n’est pas la mer à boire, mais cette réponse a quand même bu la tasse.',
    'Cette réponse a l’esprit d’escalier : la bonne idée lui viendra en descendant les marches.',
    'Ami se creuse la tête pour comprendre cette réponse. Il a trouvé un vieux bouton et un ticket de métro.',
    'Cette réponse est tombée dans le panneau. Le panneau était pourtant écrit en gros.',
    'Elle a pris des vessies pour des lanternes, cette réponse. Et elle s’étonne qu’il fasse noir.',
    'Cette réponse est rentrée bredouille. Même pas un petit point dans le panier.'
  ];
  window.TRASH_TALK = { IMAGEES, TCHATCHE, ENTREE, BRAVO, SERIE_OK, SERIE_KO, PREMIER, TOUR, FIN, EGALITE, choisir, remplir };
})();
