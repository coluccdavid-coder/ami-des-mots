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
  window.TRASH_TALK = { ENTREE, BRAVO, SERIE_OK, SERIE_KO, PREMIER, TOUR, FIN, EGALITE, choisir, remplir };
})();
