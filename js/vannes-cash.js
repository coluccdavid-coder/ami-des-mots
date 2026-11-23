// Ami des mots — vannes « cash » : plus drôles, plus directes. Elles s'ajoutent à celles de Prof Pi (maths)
// et du labo des sciences. Règle d'or inchangée : on démonte la RÉPONSE, jamais la personne.
// {f} = la réponse donnée, {j} = la bonne. t = ton taquin, s = ton cash (ados).
(function(){
  'use strict';
  const MATHS = {
    'decimal-longueur':{ t:['{f} plus grand ? C’est le nombre avec le plus de chiffres qui gagne ? Alors une facture de 0,99 € coûte plus cher qu’un vélo ?'],
      s:['{f} ? Tu juges les nombres à leur longueur, comme les frites. Raté, chef.', 'Plus long ≠ plus grand. Sinon le mot « anticonstitutionnellement » serait milliardaire.'] },
    'decimal-egal':{ t:['Égaux ? Ils sont aussi égaux qu’une trottinette et un avion.'],
      s:['Égaux ?! Même avec des lunettes de soleil la nuit, tu ne les confondrais pas.', 'Égaux… Prof Pi a appelé un ophtalmo pour toi. Il arrive.'] },
    'priorites':{ t:['La multiplication a un pass VIP, et toi tu l’as fait attendre dehors.'],
      s:['{f} ? Tu as laissé l’addition doubler toute la file. La multiplication porte plainte.', 'Priorités opératoires : niveau « je grille le feu rouge ». Amende : refaire le calcul.'] },
    'fractions-add-den':{ t:['Additionner les dénominateurs ? Tu viens d’inventer la pizza qui rétrécit quand on en ajoute.'],
      s:['{f} ? Avec ta méthode, deux moitiés de pizza font… moins d’une pizza. Les livreurs sont en PLS.', 'Les dénominateurs ne s’additionnent pas. Jamais. Même un jour férié.'] },
    'fractions-oubli-mult':{ t:['Le numérateur a été oublié sur l’aire d’autoroute.'],
      s:['{f} ? Tu as changé le bas sans toucher le haut. C’est comme changer de pneus d’un seul côté.'] },
    'fraction-de-oubli-div':{ t:['Tu n’as pas divisé : chacun repart avec un gâteau entier. Gentil, mais faux.'],
      s:['{f} ? Avec ton partage, le gâteau grossit tout seul. Appelle la NASA.'] },
    'fraction-de-oubli-mult':{ t:['Tu as pris UNE part et tu t’es sauvé avec.'],
      s:['{f} ? Tu as coupé le gâteau… et tu as oublié de servir. Service minimum.'] },
    'mixte-addition':{ t:['Tu as transformé des pizzas entières en simples parts. Les pizzaïolos pleurent.'],
      s:['{f} ? Trois pizzas entières viennent de rétrécir à trois parts. Arnaque du siècle.'] },
    'divis-dernier':{ t:['Il finit par 9, donc il est divisible par 9 ? Et ton prénom finit par quoi ?'],
      s:['{f} finit par 9, d’accord. Et ? Un chat qui s’appelle Médor reste un chat.'] },
    'pourcent-soustraire':{ t:['Le « % » n’est pas un smiley, il veut dire « sur 100 ».'],
      s:['{f} ? Tu as soustrait le pourcentage. Le « % » est en dépression depuis.', 'Retirer {p} au lieu de prendre {p} % : techniquement faux, mais artistiquement osé.'] },
    'pourcent-oubli-100':{ t:['Tu as oublié de diviser par 100 : ton résultat a fait de la musculation.'],
      s:['{f} ? Même un prix pendant le Black Friday ne monte pas aussi vite.'] },
    'pourcent-remise-seule':{ t:['Ça, c’est ce que tu économises. À la caisse, il faut payer le reste !'],
      s:['{f} € ? C’est la remise, pas le prix. Le caissier t’a déjà rattrapé à la sortie.'] },
    'proportion-additive':{ t:['En proportionnalité on multiplie. Ajouter, c’est pour les ingrédients de crêpes.'],
      s:['{f} ? Avec ton tarif, 10 croissants coûtent presque le prix d’un. Le boulanger a fait faillite.'] },
    'proportion-oubli-unite':{ t:['Tu as multiplié le prix total : ton caddie vaut une voiture.'],
      s:['{f} € ? À ce prix-là, les croissants sont en or massif.'] },
    'conversion-facteur':{ t:['Il manque des zéros : ils sont partis en vacances sans prévenir.'],
      s:['{f} ? Les zéros ont fait grève. Et ils ont bien raison.'] },
    'conversion-sens':{ t:['Unité plus petite = nombre plus GRAND. Là, tu as rétréci le nombre au lavage.'],
      s:['{f} ? Tu as converti à l’envers. Tes centimètres sont devenus des fourmis.'] },
    'aire-perimetre':{ t:['Ça, c’est le tour. On t’a demandé le gâteau, pas le papier autour.'],
      s:['{f} ? Tu as mesuré la clôture et pas le jardin. Les tomates attendent.'] },
    'aire-addition':{ t:['Longueur + largeur ? Ton rectangle est devenu une nouille.'],
      s:['{f} ? Un rectangle additionné, c’est un rectangle écrasé par un camion.'] },
    'aire-unite':{ t:['Une aire en cm ? Ton carré est devenu un spaghetti.'],
      s:['{f} : il manque le « ² ». Ta surface vient de perdre une dimension, elle est toute plate.'] },
    'duree-base100':{ t:['Une heure, c’est 60 minutes. Ta montre n’est pas une calculatrice.'],
      s:['{f} ? Une heure avec 100 minutes ? Prof Pi signe tout de suite, il veut des récrés plus longues.'] },
    'angle-comp-supp':{ t:['Complémentaire = 90°, supplémentaire = 180°. Les jumeaux ont échangé leurs tee-shirts.'],
      s:['{f}° ? Tu as confondu le quart de tour et le demi-tour. La toupie a vomi.'] },
    'angle-triangle':{ t:['180° dans un triangle. Pas 360 : ce n’est pas une pizza entière.'],
      s:['{f}° ? Ton triangle a tellement d’angles qu’il pique les doigts.'] },
    'proba-autres':{ t:['On divise par TOUTES les boules, pas seulement par les autres.'],
      s:['{f} ? Les boules rouges n’ont pas été comptées dans le total. Elles organisent une manif.'] },
    'arrondi-troncature':{ t:['Tu as coupé au lieu d’arrondir : ce nombre a été taillé à la tronçonneuse.'],
      s:['{f} ? Le chiffre d’après faisait des grands signes. Tu l’as ignoré comme une notif.'] },
    'relatifs-signe':{ t:['Le signe s’est trompé d’étage dans l’ascenseur.'],
      s:['{f} ? Ton thermomètre annonce la canicule en plein mois de janvier.', 'Mauvais signe. Au sens propre.'] },
    'relatifs-valeurs':{ t:['Les négatifs ont été traités comme des positifs. Ils sont vexés.'],
      s:['{f} ? Tu as additionné comme si les dettes étaient des cadeaux. Belle mentalité, mauvais calcul.'] },
    'relatifs-moins-moins':{ t:['Moins moins = plus. Le double négatif est ton ami, adopte-le.'],
      s:['{f} ? Tu as ignoré le « moins moins ». Il est parti bouder dans sa chambre.'] },
    'regle-signes':{ t:['Moins par moins, ça fait plus. La règle des signes est passée à la trappe.'],
      s:['{f} ? La règle des signes vient de démissionner. Avec préavis.'] },
    'litteral-juxtaposition':{ t:['3x, c’est 3 FOIS x. Pas « 3 collé à x » comme deux aimants.'],
      s:['{f} ? Tu as collé les chiffres comme des Lego. Le signe × invisible est très vexé.'] },
    'carre-priorite':{ t:['Seul le x est au carré. Le 2 n’a rien demandé à personne.'],
      s:['{f} ? Tu as mis le 2 au carré aussi. Il a pris la grosse tête.'] },
    'reduire-carre':{ t:['3 pommes + 5 pommes = 8 pommes. Pas 8 pommes au carré.'],
      s:['{f} ? Des x² sortent de nulle part. C’est de la magie noire, ça.'] },
    'reduire-mult':{ t:['On additionne les coefficients. L’addition a été kidnappée.'],
      s:['{f} ? 3 pommes + 5 pommes = 15 pommes ? Ton panier imprime des pommes.'] },
    'triangle-oubli-2':{ t:['Tu as oublié le « ÷ 2 » : ton triangle s’est déguisé en rectangle.'],
      s:['{f} ? Ton triangle a doublé de volume. Il a avalé un rectangle entier.'] },
    'pythagore-somme':{ t:['Tu as additionné les côtés : le triangle s’est déplié en ligne droite.'],
      s:['{f} ? Avec ton Pythagore, le raccourci est plus long que le chemin. GPS en panne.'] },
    'pythagore-racine':{ t:['Il manque la racine carrée : ton hypoténuse traverse le plafond.'],
      s:['{f} ? Ton triangle est plus haut que la tour Eiffel. Il manquait juste une racine.'] },
    'equation-signe':{ t:['Le nombre a changé de côté mais pas de signe : il a oublié son passeport.'],
      s:['{f} ? Le + a passé la frontière sans devenir −. Douane !'] },
    'distrib-oubli':{ t:['Le deuxième terme n’a pas été multiplié. Il fait des grands signes derrière la vitre, tout triste.'],
      s:['{f} ? Tu as multiplié un terme sur deux. Le deuxième n’a pas eu son goûter.'] },
    'double-distrib-oubli':{ t:['Deux produits sur quatre : la double distributivité a pris sa demi-journée.'],
      s:['{f} ? Il manque la moitié du développement. L’autre moitié est encore au lit.'] },
    'identite-double':{ t:['Le double produit a disparu. Il est au fond du sac avec les mouchoirs.'],
      s:['{f} ? Le « 2ab » vient de porter plainte pour disparition inquiétante.', 'Sans le double produit, (a + b)² est tout nu. Rhabille-le.'] },
    'thales-inverse':{ t:['Rapport à l’envers : le petit triangle se prend pour le grand.'],
      s:['{f} ? Ton petit triangle a mangé le grand. Thalès en tombe de sa chaise.'] },
    'trigo-confusion':{ t:['CAH-SOH-TOA te fait coucou de loin.'],
      s:['{f} ? Mauvais côté. CAH-SOH-TOA, ce n’est pas une formule magique qu’on récite au hasard.'] },
    'pgcd-ppcm':{ t:['Un diviseur plus grand que les nombres ? C’est une baleine dans un aquarium.'],
      s:['{f} ? Ça, c’est un multiple. Le PGCD est vexé qu’on l’ait confondu avec son cousin.'] },
    'evolution-retour':{ t:['+20 % puis −20 % ne s’annulent pas. Les magasins le savent très bien.'],
      s:['{f} ? Tu crois que les soldes remboursent la hausse ? Les commerçants t’adorent.'] },
    'mediane-moyenne':{ t:['Ça, c’est la moyenne. La médiane attend au milieu, toute seule.'],
      s:['{f} ? Tu as calculé la moyenne. La médiane n’a même pas été invitée à la fête.'] },
    'carre-une':{ t:['La solution négative se cache derrière le zéro. Va la chercher.'],
      s:['{f} ? Tu as oublié la solution négative. Elle boude au fond du bus.'] },
    'delta-signe':{ t:['C’est « moins 4ac ». Le moins est tombé en route.'],
      s:['{f} ? Ton discriminant a perdu son moins. Il discrimine n’importe quoi maintenant.'] },
    'derivee-constante':{ t:['La dérivée d’une constante, c’est 0. Elle ne bouge pas, elle ne compte pas.'],
      s:['{f} ? La constante s’est incrustée dans la dérivée. Personne ne l’avait invitée.'] },
    'arith-geo':{ t:['Arithmétique on ajoute, géométrique on multiplie. Mauvaise famille.'],
      s:['{f} ? Ta suite a changé de famille en route. Le livret de famille est à refaire.'] },
    'ln-somme':{ t:['ln(a) + ln(b) = ln(ab). Pas ln(a + b).'],
      s:['{f} ? Le logarithme vient de faire un malaise vagal.'] },
    'primitive-derivee':{ t:['Tu as dérivé au lieu de primitiver. Demi-tour !'],
      s:['{f} ? Tu as remonté la rivière à contre-courant, en pédalo.'] }
  };
  const GENERIQUES = {
    t:['Pas loin… mais en maths, « pas loin », c’est loin.', 'Ton calcul a pris l’autoroute dans le mauvais sens.', 'Prof Pi a vu passer ta réponse en trottinette, sans casque.'],
    s:['{f} ? Même ta calculatrice a demandé une rupture conventionnelle.', 'Prof Pi a fait tomber sa craie. Et son café. Et sa dignité.', '{f} ? Ce nombre s’est incrusté sans invitation.', 'Réponse audacieuse. Fausse, mais audacieuse.', '{f} ? Le correcteur l’a encadrée pour la montrer à ses collègues.']
  };
  // Petits ajouts « cash » pour le labo des sciences (ton sans pitié), après le clash propre à chaque question.
  const SCIENCES = ['🔥 Le labo a mis ta réponse sous microscope : rien trouvé de juste.', '🔥 Réponse envoyée dans l’espace. Elle n’est jamais revenue.', '🔥 Même la souris de labo a levé les yeux au ciel.', '🔥 Les scientifiques du monde entier viennent de soupirer en même temps.'];

  if(window.MATHS){
    const E = window.MATHS.ERREURS;
    for(const [k, v] of Object.entries(MATHS)) if(E[k]){ E[k].t.push(...v.t); E[k].s.push(...v.s); }
    const g = window.MATHS.ERREURS.generique; if(g){ g.t.push(...GENERIQUES.t); g.s.push(...GENERIQUES.s); }
  }
  // Même erreur refaite dans la même série : Prof Pi monte en pression. [2e fois, 3e fois, 4e fois et plus]
  // Le ton Cash (ados) clashe fort ; Taquin reste joueur ; Tout doux encourage.
  const ESCALADE = {
    doux:[['Encore cette erreur-là ! On la regarde bien ensemble cette fois ?'], ['Elle revient, celle-là ! Lis bien l’astuce, tu vas l’avoir.'], ['On ne lâche rien : relis l’astuce doucement.']],
    taquin:[['Encore ?! Mais genre, tu fais exprès ou quoi !!!! 😤', 'Attends… LA MÊME ?! Prof Pi a cru à un bug. 🫠'],
      ['TROIS fois la même ! Prof Pi range sa craie et s’assoit… 🪑', 'Trois fois ! Même le tableau commence à soupirer. 😩'],
      ['Bon. Prof Pi respire. Il respire… Il compte jusqu’à 10 (lui, il sait). 😮‍💨']],
    sanspitie:[['Encore ?! Mais genre, tu fais exprès ou quoi !!!! 😤', 'LA MÊME ERREUR ?! Deux fois ?! Même mon perroquet a retenu la leçon, et il ne parle pas français. 🦜', 'Deux fois la même ?! Prof Pi vient de s’étouffer avec son café. ☕💥'],
      ['Sérieux, tu vas à l’école toi ??? 🏫', 'Sérieux… tu vas à l’école ou tu fais juste coucou au portail ??? 🏫', 'TROIS FOIS ?! Ton cartable demande à être adopté par quelqu’un d’autre. 🎒'],
      ['Là, c’est plus une erreur, c’est une tradition. Prof Pi va l’encadrer. 🖼️', 'Prof Pi démissionne. … Bon, il revient. Mais cette fois, LIS l’astuce. 😮‍💨']]
  };
  // ── Fabrique à vannes : quand les vannes écrites à la main sont toutes sorties, Prof Pi en fabrique de nouvelles
  // en assemblant des morceaux (amorce + « même … » + chute) : plus de 50 000 combinaisons, et la mémoire du joueur
  // évite toute répétition. Tout vise la RÉPONSE, jamais la personne.
  const FABRIQUE = {
    amorces:['{f} ?', 'Attends… {f} ?', 'Euh… {f} ?!', 'Allô ? {f} ?', '{f}… vraiment ?', 'Non mais {f} ?!', 'Pardon ? {f} ?', 'Hein ?! {f} ?', 'Ah bah {f}, carrément ?', 'Breaking news : {f}.', 'Alerte rouge : {f} !', '{f} ? Audacieux.', 'Mesdames et messieurs : {f}.', '{f} ? Je note… dans le carnet des légendes.'],
    // Sujets : « * » en tête = féminin (pour accorder « tombé·e », « parti·e », « lui-même / elle-même »).
    sujets:['*ma calculatrice', 'le tableau noir', '*ma craie', 'mon hamster', 'le GPS', '*la dame de la cantine', 'le wifi de l’école', '*la photocopieuse', 'un pigeon qui passait', '*la tour Eiffel', 'mon stylo quatre couleurs', 'le radiateur de la classe', '*la sonnerie de la récré', 'un escargot en vacances', 'le robot aspirateur', 'mon poisson rouge', '*la règle de 30 cm', 'le distributeur de bonbons', '*la plante verte du CDI', 'un dinosaure à la retraite', 'mon grille-pain', '*la lune', 'le correcteur du brevet', 'Pythagore en personne', '*une calculatrice solaire en pleine nuit'],
    actions:['a demandé des vacances', 'est tombé{e} de sa chaise', 'a fait un malaise', 'a appelé son avocat', 's’est mis{e} à pleurer', 'a éteint la lumière en partant', 'a quitté le groupe de la classe', 's’est caché{e} sous la table', 'a demandé à changer de planète', 'a fait une crise de fou rire', 'a demandé un remboursement', 'a lancé une pétition', 'a pris sa retraite anticipée', 'a fait trois tours sur {lui}-même', 'est parti{e} chercher du renfort', 'a écrit une lettre de réclamation', 'a mis son clignotant et s’est enfui{e}', 'a demandé si c’était une blague', 'a fait semblant de ne rien voir', 'a appelé les pompiers par réflexe', 'a fondu en larmes de rire', 'a ouvert un dossier « mystères inexpliqués »', 'a mis cette réponse en fond d’écran', 'a sorti du popcorn', 'a levé les yeux au ciel si fort qu’{il} voit son cerveau'],
    chutes:['La bonne, c’était {j}.', 'Indice : {j}.', 'Spoiler : {j}.', 'Il fallait {j}.', 'Réponse officielle : {j}.', '{j}. Voilà. C’est dit.', 'Retiens bien : {j}.', 'Petit rappel gratuit : {j}.']
  };
  const fabriquer = r => { r = r || Math.random; const p = l => l[Math.floor(r() * l.length)];
    const su = p(FABRIQUE.sujets), fem = su[0] === '*', act = p(FABRIQUE.actions).replace('{e}', fem ? 'e' : '').replace('{lui}', fem ? 'elle' : 'lui').replace('{il}', fem ? 'elle' : 'il');
    return p(FABRIQUE.amorces) + ' Même ' + su.replace(/^\*/, '') + ' ' + act + '. ' + p(FABRIQUE.chutes); };
  if(window.MATHS) window.MATHS.fabrique = fabriquer;
  window.VANNES_CASH = { MATHS, GENERIQUES, SCIENCES, ESCALADE, FABRIQUE, fabriquer };
})();
