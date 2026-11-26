// Ami des mots — Coin maths, de la 6e à la Terminale, avec Prof Pi qui vanne à chaque erreur.
// Les exercices sont FABRIQUÉS par le code à partir d'une graine : nombres tirés au hasard, correction CALCULÉE
// (jamais devinée), et chaque mauvaise réponse proposée correspond à une erreur classique, avec sa vanne et son explication.
// Même graine = mêmes questions : c'est ce qui permet les battles entre potes.
// Les intitulés des chapitres suivent les programmes officiels ; la carte des programmes peut être remplacée par celle,
// validée par un adulte, que la veille du serveur fabrique à partir des textes officiels (serveur-php/veille.php).
(function(){
  'use strict';

  // ── Outils ──────────────────────────────────────────────────────────
  function hasard(g){ let a = (g >>> 0) || 1; return () => { a |= 0; a = a + 0x6D2B79F5 | 0; let t = Math.imul(a ^ a >>> 15, 1 | a); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; }; }
  const E = (r, a, b) => a + Math.floor(r() * (b - a + 1));
  const C = (r, l) => l[Math.floor(r() * l.length)];
  const S = (r, a, b) => { let x = 0; while(x === 0) x = E(r, a, b); return x; }; // entier non nul
  const pgcd = (a, b) => { a = Math.abs(a); b = Math.abs(b); while(b){ [a, b] = [b, a % b]; } return a || 1; };
  const ppcm = (a, b) => Math.abs(a * b) / pgcd(a, b);
  const MOINS = '−';
  // v6.5/v6.6 : langue de l'interface. Si une traduction existe (js/maths-en.js, -es, -de, -it, -pt), tout le coin maths passe
  // dans cette langue ; sinon, français. Les nombres restent à la française (virgule) sauf en anglais (point).
  const LANGUE = () => { let l = 'fr'; try{ l = window.AmiDesMots.base.ui; }catch(e){ try{ l = document.documentElement.lang; }catch(e2){} } return l !== 'fr' && window.MATHS_LANGUES && window.MATHS_LANGUES[l] ? l : 'fr'; };
  const D = () => { const l = LANGUE(); return l === 'fr' ? null : window.MATHS_LANGUES[l]; };
  const EN = () => LANGUE() === 'en';
  const T = s => { const d = D(); return d && d.t[s] != null ? d.t[s] : s; };
  const Tk = (cle, fr) => { const d = D(); return d && d.t[cle] != null ? d.t[cle] : fr; }; // même texte français, traductions différentes
  // Nombre à la française : virgule, vrai signe moins, pas d'erreur d'arrondi d'ordinateur.
  function nb(x, dec){ let v = Math.round(x * 1e9) / 1e9; if(dec != null) v = Math.round(v * 10 ** dec) / 10 ** dec; if(Object.is(v, -0)) v = 0;
    let s = Math.abs(v) >= 1e21 ? String(v) : (Number.isInteger(v) ? String(Math.abs(v)) : String(Math.abs(v)));
    const [e, d] = s.split('.'); const ent = e.replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
    if(EN()) return (v < 0 ? MOINS : '') + e.replace(/\B(?=(\d{3})+(?!\d))/g, ',') + (d ? '.' + d : '');
    return (v < 0 ? MOINS : '') + ent + (d ? ',' + d : ''); }
  // Fraction simplifiée « 3/4 », « −3/4 » ou entier.
  function fr(n, d){ if(d < 0){ n = -n; d = -d; } const g = pgcd(n, d); n /= g; d /= g; return d === 1 ? nb(n) : (n < 0 ? MOINS : '') + Math.abs(n) + '/' + d; }
  const frb = (n, d) => (n < 0 ? MOINS : '') + Math.abs(n) + '/' + d; // fraction telle quelle (non simplifiée)
  // Polynôme lisible : coefs du plus haut degré au plus bas. poly([3, -2, 5]) = « 3x² − 2x + 5 ».
  const EXP = ['', '', '²', '³', '⁴', '⁵', '⁶'];
  function poly(coefs, v = 'x'){
    const deg = coefs.length - 1; let s = '';
    coefs.forEach((c, i) => { const p = deg - i; if(!c) return; const a = Math.abs(c);
      const corps = p === 0 ? nb(a) : (a === 1 ? '' : nb(a)) + v + (p > 1 ? EXP[p] || '^' + p : '');
      s += s ? (c < 0 ? ' ' + MOINS + ' ' : ' + ') + corps : (c < 0 ? MOINS : '') + corps; });
    return s || '0';
  }
  const par = x => x < 0 ? '(' + nb(x) + ')' : nb(x);
  const signe = x => x < 0 ? ' ' + MOINS + ' ' + nb(-x) : ' + ' + nb(x);
  const heure = m => { m = ((m % 1440) + 1440) % 1440; return Math.floor(m / 60) + (LANGUE() === 'fr' ? ' h ' : ':') + String(m % 60).padStart(2, '0'); };
  const fact = n => n <= 1 ? 1 : n * fact(n - 1);
  const comb = (n, k) => Math.round(fact(n) / (fact(k) * fact(n - k)));
  const exp = n => n === 1 ? '' : (n >= 0 && n < EXP.length && n > 1 ? EXP[n] : '^' + (n < 0 ? '(' + MOINS + Math.abs(n) + ')' : n));
  const TRIPLETS = [[3, 4, 5], [6, 8, 10], [5, 12, 13], [8, 15, 17], [7, 24, 25], [9, 12, 15], [12, 16, 20], [20, 21, 29]];

  // Une question : énoncé, bonne réponse, et mauvaises réponses typiques [valeur, clé d'erreur].
  function Q(enonce, bon, faux, expl, o){
    const vus = new Set([String(bon)]), f = [];
    for(const [v, cle] of faux){ const s = String(v).replace(/(\d+)([,.])(\d{4,})/g, (m, a, sep, d) => nb(Math.round(Number(a + '.' + d) * 1000) / 1000)); if(!s || /NaN|undefined|Infinity/.test(s) || vus.has(s)) continue; vus.add(s); f.push({ v:s, cle }); }
    // Cas rares où les erreurs typiques tombent sur la bonne réponse : on complète avec des voisins.
    const m = String(bon).match(EN() ? /^(.*?)(−?[\d,]+(?:\.\d+)?)(.*)$/ : /^(.*?)(−?[\d\u202F]+(?:,\d+)?)(.*)$/);
    if(f.length < 2 && m){ const x = Number(EN() ? m[2].replace(/,/g, '').replace('−', '-') : m[2].replace(/\u202F/g, '').replace('−', '-').replace(',', '.'));
      for(const y of [x + 1, x - 1, x * 2 || 2, x + 10]){ const s = m[1] + nb(y) + m[3]; if(f.length < 2 && !vus.has(s)){ vus.add(s); f.push({ v:s, cle:'generique' }); } } }
    return Object.assign({ enonce, bon:String(bon), faux:f.slice(0, 3), expl }, o || {});
  }

  // ── Les erreurs classiques : explication + vannes (taquin, sans pitié). {f} = ta réponse, {j} = la bonne. ──
  // Les vannes visent l'ERREUR, jamais l'élève.
  const ERREURS = {
    'decimal-longueur':{ e:'On compare les dixièmes d’abord, puis les centièmes. Plus de chiffres ne veut pas dire plus grand.', t:['« {f} » plus grand parce qu’il est plus long ? Une girafe n’est pas plus intelligente qu’un hibou.'], s:['{f} gagne parce qu’il a plus de chiffres ? Avec cette logique, un numéro de téléphone vaut une fortune.'] },
    'decimal-egal':{ e:'Deux nombres sont égaux seulement s’ils ont les mêmes chiffres à chaque rang (zéros inutiles mis à part).', t:['Égaux ? Ils ne se ressemblent même pas, ces deux-là.'], s:['Égaux ? Prof Pi a vérifié : ils ne sont même pas cousins.'] },
    'mixte-addition':{ e:'a + n/d = (a × d + n)/d : l’entier se transforme en d-ièmes.', t:['Tu as additionné l’entier au numérateur : la pizza entière vient de rétrécir en une seule part.'], s:['{f} ? Tu as transformé 3 pizzas entières en 3 parts. Les pizzas portent plainte.'] },
    'mixte-melange':{ e:'Multiplie l’entier par le dénominateur, puis ajoute le numérateur.', t:['Mélange créatif, mais les fractions préfèrent la recette officielle.'], s:['{f} ? C’est pas une fraction, c’est une salade de chiffres.'] },
    'divis-dernier':{ e:'Pour 3 et 9, on regarde la SOMME des chiffres, pas le dernier chiffre.', t:['Il finit par 9, donc divisible par 9 ? Et 19, c’est un nombre de 9 aussi ?'], s:['{f} finit par 9 : bel effort de déguisement, mais Prof Pi additionne les chiffres.'] },
    'divis-3-9':{ e:'Divisible par 9 : somme des chiffres divisible par 9 (pas seulement par 3).', t:['{f} est divisible par 3… mais 9 est plus exigeant.'], s:['Divisible par 3, oui. Par 9 ? Il lui manque des abdos.'] },
    'priorites':{ e:'La multiplication passe avant l’addition (sauf parenthèses).', t:['La multiplication est prioritaire : elle a un coupe-file, comme au parc d’attractions.'], s:['{f} ? Tu as laissé l’addition doubler la multiplication. La multiplication est vexée.'] },
    'fraction-de-inverse':{ e:'n/d de N : on divise par d, puis on multiplie par n.', t:['Tu as divisé et multiplié à l’envers : la fraction fait le poirier.'], s:['{f} ? Ta fraction s’est retournée comme une crêpe ratée.'] },
    'fraction-de-oubli-div':{ e:'Prendre n/d de N, c’est N ÷ d × n : il faut diviser.', t:['Tu as oublié de diviser : tout le monde a eu une part géante.'], s:['{f} ? Avec ce partage, le gâteau a grossi. Magique, mais faux.'] },
    'fraction-de-oubli-mult':{ e:'Après avoir divisé par d, on multiplie par le numérateur n.', t:['Une seule part, alors qu’on en voulait plusieurs !'], s:['{f} ? Tu as pris une part et tu es parti. Les autres parts attendent encore.'] },
    'fractions-add-den':{ e:'On n’additionne jamais les dénominateurs : on met au même dénominateur, puis on additionne les numérateurs.', t:['Tu as additionné les dénominateurs : les parts de pizza viennent de rétrécir.'], s:['{f} ? Tu viens de faire pleurer une pizza : 1/2 + 1/2, ça fait 1, pas 2/4.'] },
    'fractions-oubli-mult':{ e:'Quand on change le dénominateur, on multiplie AUSSI le numérateur.', t:['Le dénominateur a été multiplié, le numérateur a été oublié dans le car.'], s:['{f} ? Le numérateur est resté au vestiaire.'] },
    'trou-operation':{ e:'Pour trouver le nombre manquant, on fait l’opération inverse.', t:['Tu as ajouté au lieu d’enlever : le trou est devenu une montagne.'], s:['{f} ? Ce trou est tellement rempli qu’il déborde.'] },
    'programme-ordre':{ e:'Un programme de calcul se fait dans l’ordre des étapes.', t:['Tu as fait les étapes dans le désordre : la recette du gâteau commence par la cuisson ?'], s:['{f} ? Tu as mis le glaçage avant la pâte.'] },
    'proportion-additive':{ e:'Proportionnel : on multiplie (ou on passe à l’unité), on n’ajoute pas.', t:['Tu as ajouté la différence : en proportionnalité, on multiplie.'], s:['{f} ? Avec ce raisonnement, 10 croissants coûtent presque pareil qu’1. Le boulanger t’adore.'] },
    'proportion-oubli-unite':{ e:'Passe d’abord par le prix d’UN objet, puis multiplie.', t:['Tu as multiplié le prix total : le caddie explose.'], s:['{f} ? À ce prix-là, tu achètes la boulangerie avec.'] },
    'pourcent-soustraire':{ e:'p % de N = N × p ÷ 100, ce n’est pas N − p.', t:['Tu as enlevé {p} au lieu de prendre {p} % : le pourcentage se sent incompris.'], s:['{f} ? Le signe % n’est pas une décoration.'] },
    'pourcent-oubli-100':{ e:'Un pourcentage, c’est « sur 100 » : on divise par 100.', t:['Tu as oublié le « sur 100 » : ton résultat a pris des stéroïdes.'], s:['{f} ? Même un soldes à −90 % ne donne pas ça.'] },
    'pourcent-remise-seule':{ e:'Le prix après remise = prix − remise.', t:['Tu as trouvé la remise… mais pas le nouveau prix !'], s:['{f} ? Ça, c’est ce que tu économises, pas ce que tu paies. Le caissier rigole.'] },
    'conversion-facteur':{ e:'1 m = 100 cm, 1 km = 1 000 m, 1 kg = 1 000 g, 1 L = 100 cL.', t:['Le bon sens, mais le mauvais nombre de zéros.'], s:['{f} ? Il manque des zéros : ils sont partis en vacances sans prévenir.'] },
    'conversion-sens':{ e:'Vers une unité plus petite, le nombre grandit (on multiplie).', t:['Tu as divisé au lieu de multiplier : la règle a rétréci au lavage.'], s:['{f} ? Une unité plus petite et un nombre plus petit ? La logique a pris la porte.'] },
    'aire-perimetre':{ e:'L’aire mesure la surface (cm²), le périmètre le tour (cm).', t:['Ça, c’est le tour de la figure, pas sa surface : tu as clôturé le jardin au lieu de le planter.'], s:['{f} ? Tu as mesuré la ficelle autour du gâteau, pas le gâteau.'] },
    'aire-addition':{ e:'Aire du rectangle = longueur × largeur.', t:['Tu as additionné : le rectangle voulait être multiplié.'], s:['{f} ? Un rectangle qui s’additionne, c’est un rectangle très plat.'] },
    'aire-unite':{ e:'Une aire s’exprime en unités carrées : cm², m²…', t:['Le bon nombre, mais une aire en cm ? Ton carré est devenu un fil de fer.'], s:['{f} : ton rectangle a perdu une dimension. Il est tout triste.'] },
    'aire-conversion':{ e:'1 m² = 100 dm² = 10 000 cm² (on multiplie par 100 à chaque unité).', t:['Pour les aires, on saute de 100 en 100, pas de 10 en 10 !'], s:['{f} ? Les aires prennent l’ascenseur par 100, toi tu as pris l’escalier par 10.'] },
    'duree-base100':{ e:'Une heure = 60 minutes, pas 100.', t:['Une heure a 60 minutes : les minutes ne sont pas des centimes.'], s:['{f} ? Ta montre compte jusqu’à 100 ? Elle doit être très fatiguée.'] },
    'duree-heure':{ e:'Ajoute les minutes d’abord, et passe à l’heure suivante seulement après 60 minutes.', t:['Une heure de trop : tu as raté le bus, mais dans l’autre sens.'], s:['{f} ? Tu es arrivé tellement tard que le film est fini.'] },
    'angle-comp-supp':{ e:'Complémentaires : somme 90°. Supplémentaires : somme 180°.', t:['Complémentaire = 90°, supplémentaire = 180° : tu as inversé les deux jumeaux.'], s:['{f} ? Tu as confondu le quart de tour et le demi-tour : la toupie a le tournis.'] },
    'angle-triangle':{ e:'La somme des angles d’un triangle vaut 180°.', t:['Un triangle a 180° en tout, pas 360° : il n’est pas un carré déguisé.'], s:['{f} ? Ce triangle a tellement d’angles qu’il pique.'] },
    'proba-autres':{ e:'Probabilité = cas favorables ÷ cas POSSIBLES (toutes les boules).', t:['Tu as divisé par les autres boules au lieu de toutes les boules.'], s:['{f} ? Tu as oublié de compter les boules rouges dans le total. Elles boudent.'] },
    'proba-couleur':{ e:'Lis bien : on demande la probabilité de la couleur citée.', t:['Bonne méthode, mauvaise couleur : daltonisme mathématique temporaire.'], s:['{f} ? C’est la probabilité de l’autre couleur. Prof Pi voit tout.'] },
    'volume-addition':{ e:'Nombre de cubes = longueur × largeur × hauteur.', t:['Tu as additionné : le pavé s’est aplati comme une crêpe.'], s:['{f} ? Le reste du pavé s’est évaporé.'] },
    'volume-faces':{ e:'On compte les cubes de tout le pavé, pas seulement ceux qu’on voit.', t:['Tu as compté les faces visibles : les cubes cachés existent aussi !'], s:['{f} ? Les cubes du milieu se sentent oubliés.'] },
    'arrondi-troncature':{ e:'Arrondir : on regarde le chiffre suivant ; s’il vaut 5 ou plus, on augmente.', t:['Tu as coupé au lieu d’arrondir : ce nombre a été taillé à la hache.'], s:['{f} ? Tu as tronqué. Le chiffre d’après te faisait signe pourtant.'] },
    'relatifs-signe':{ e:'Deux nombres de signes différents : on soustrait les distances à zéro et on garde le signe du plus éloigné.', t:['Le signe s’est trompé d’étage.'], s:['{f} ? Ton thermomètre indique l’été en plein hiver.'] },
    'relatifs-valeurs':{ e:'On n’additionne les distances à zéro que si les deux nombres ont le même signe.', t:['Tu as additionné comme si tout le monde était positif. Les négatifs protestent.'], s:['{f} ? Les nombres négatifs ont été traités comme des positifs. Ils portent plainte.'] },
    'relatifs-moins-moins':{ e:'Soustraire un nombre négatif, c’est ajouter son opposé : a − (−b) = a + b.', t:['Moins moins, ça fait plus : le double négatif est un ami.'], s:['{f} ? Tu as ignoré le « moins moins ». Il est très vexé.'] },
    'regle-signes':{ e:'Produit ou quotient : même signe → positif, signes différents → négatif.', t:['Moins par moins, ça fait plus : la règle des signes s’est perdue en route.'], s:['{f} ? La règle des signes vient de démissionner.'] },
    'simplifier-un':{ e:'Pour simplifier, on divise le numérateur ET le dénominateur par le même nombre.', t:['Tu as simplifié en haut seulement : le bas n’a rien vu passer.'], s:['{f} ? Le dénominateur réclame lui aussi son régime.'] },
    'fraction-inverse':{ e:'Le numérateur est en haut, le dénominateur en bas.', t:['Ta fraction fait le poirier !'], s:['{f} ? Ta fraction est à l’envers, comme une chauve-souris.'] },
    'litteral-juxtaposition':{ e:'3x veut dire 3 × x, pas « 3 collé à x ».', t:['3x avec x = {x}, ce n’est pas « 3{x} » : le x n’est pas un chiffre caché.'], s:['{f} ? Tu as collé 3 et {x} comme deux aimants. Le signe × est caché, mais il est là.'] },
    'carre-priorite':{ e:'Dans 2x², seul x est au carré : 2 × x × x.', t:['Le carré ne concerne que x, pas le 2 : le 2 n’a rien demandé.'], s:['{f} ? Tu as mis le 2 au carré lui aussi. Il a pris la grosse tête.'] },
    'reduire-carre':{ e:'3x + 5x = 8x : on additionne des « x », ça ne crée pas de x².', t:['3 pommes + 5 pommes = 8 pommes, pas 8 pommes².'], s:['{f} ? Des x² sont apparus de nulle part. C’est de la magie noire.'] },
    'reduire-mult':{ e:'On additionne les coefficients : 3x + 5x = (3 + 5)x.', t:['Tu as multiplié les coefficients : l’addition a été kidnappée.'], s:['{f} ? 3 pommes + 5 pommes = 15 pommes ? Ton panier est magique.'] },
    'moyenne-effectif':{ e:'Moyenne = somme des valeurs ÷ NOMBRE de valeurs.', t:['Tu as divisé par le mauvais nombre : une note s’est fait la malle.'], s:['{f} ? Une valeur a été oubliée au fond du sac.'] },
    'moyenne-mediane':{ e:'La moyenne n’est pas la valeur du milieu (ça, c’est la médiane).', t:['Ça, c’est la médiane, pas la moyenne : deux cousines qui se ressemblent.'], s:['{f} ? Tu as confondu la moyenne et la médiane : elles ne s’adressent plus la parole.'] },
    'triangle-oubli-2':{ e:'Aire du triangle = base × hauteur ÷ 2.', t:['Tu as oublié de diviser par 2 : ton triangle est devenu un rectangle.'], s:['{f} ? Ton triangle a doublé de taille. Il a mangé un rectangle.'] },
    'echelle-unite':{ e:'Multiplie par l’échelle, puis convertis (100 cm = 1 m, 1 000 m = 1 km).', t:['Le calcul est bon, l’unité est partie en vacances.'], s:['{f} ? Ta maison fait la taille d’une fourmi, ou d’une montagne.'] },
    'proba-complement':{ e:'P(non A) = 1 − P(A).', t:['L’événement contraire, c’est 1 moins la probabilité, pas plus.'], s:['{f} ? Une probabilité au-dessus de 1 ? Même la météo ne se trompe pas autant.'] },
    'fractions-mult-add':{ e:'Multiplier des fractions : numérateur × numérateur, dénominateur × dénominateur.', t:['Tu as additionné au lieu de multiplier : la fraction a changé de métier.'], s:['{f} ? Le signe × a été remplacé par un + : imposteur !'] },
    'fractions-div':{ e:'Diviser par une fraction, c’est multiplier par son inverse.', t:['Diviser par une fraction, c’est multiplier par son inverse : retourne-la !'], s:['{f} ? La deuxième fraction n’a pas fait sa culbute.'] },
    'puissance-produit':{ e:'a^m × a^n = a^(m+n) : on additionne les exposants.', t:['On additionne les exposants, on ne les multiplie pas.'], s:['{f} ? Les exposants se sont multipliés comme des lapins.'] },
    'puissance-base':{ e:'Les bases restent les mêmes : 10^m × 10^n = 10^(m+n).', t:['Tu as multiplié les bases : 10 est devenu 100 sans permission.'], s:['{f} ? La base a pris du poids.'] },
    'puissance-mult':{ e:'a^n = a × a × … × a (n fois), pas a × n.', t:['2⁵ ce n’est pas 2 × 5 : la puissance n’est pas une multiplication déguisée.'], s:['{f} ? La puissance a perdu ses pouvoirs.'] },
    'puissance-negative':{ e:'10^(−n) = 1/10^n : un nombre positif plus petit que 1.', t:['Un exposant négatif ne rend pas le nombre négatif : il le rend tout petit.'], s:['{f} ? L’exposant négatif t’a fait broyer du noir.'] },
    'pythagore-somme':{ e:'Pythagore : hypoténuse² = a² + b², pas hypoténuse = a + b.', t:['Tu as additionné les côtés : le triangle s’est déplié en ligne droite.'], s:['{f} ? Avec ce raccourci, le chemin le plus court devient le plus long.'] },
    'pythagore-racine':{ e:'Après a² + b², on prend la RACINE CARRÉE.', t:['Il manque la racine carrée : ton hypoténuse fait la taille d’un immeuble.'], s:['{f} ? Ton triangle a grandi comme Jacques et son haricot.'] },
    'pythagore-cote':{ e:'Pour un petit côté : côté² = hypoténuse² − autre côté².', t:['L’hypoténuse est le plus grand côté : on soustrait ici, on n’ajoute pas.'], s:['{f} ? Ton petit côté est plus grand que l’hypoténuse. Il a des complexes de supériorité.'] },
    'equation-signe':{ e:'Pour faire passer un nombre de l’autre côté, on fait l’opération inverse.', t:['Le nombre a changé de côté mais pas de signe : il a oublié son passeport.'], s:['{f} ? Le + a traversé sans se transformer en −. Contrôle à la frontière !'] },
    'equation-division':{ e:'ax = c donne x = c ÷ a, pas c − a.', t:['On divise par le coefficient, on ne le soustrait pas.'], s:['{f} ? Le coefficient a été soustrait. Il voulait juste être divisé.'] },
    'distrib-oubli':{ e:'k(a + b) = k × a + k × b : on multiplie CHAQUE terme.', t:['Le deuxième terme n’a pas été multiplié : il se sent exclu.'], s:['{f} ? Un terme a été oublié dans la parenthèse. Il fait coucou par la fenêtre.'] },
    'double-distrib-oubli':{ e:'(x + a)(x + b) = x² + bx + ax + ab : 4 produits.', t:['Il manque les termes du milieu : la double distributivité a fait une demi-journée.'], s:['{f} ? Deux produits sur quatre : le reste est en grève.'] },
    'double-distrib-produit':{ e:'Le dernier terme est a × b, pas a + b.', t:['Le dernier terme est un produit, pas une somme.'], s:['{f} ? Le + s’est infiltré à la place du ×.'] },
    'sci-mantisse':{ e:'Notation scientifique : a × 10^n avec 1 ≤ a < 10.', t:['Le nombre devant doit être entre 1 et 10 !'], s:['{f} ? Ton nombre devant fait plus de 10 : il triche.'] },
    'sci-exposant':{ e:'Compte de combien de rangs la virgule se déplace.', t:['Un rang de trop ou de moins : la virgule a glissé.'], s:['{f} ? La virgule a fait du toboggan.'] },
    'vitesse-minutes':{ e:'En km/h, la durée doit être en heures (30 min = 0,5 h).', t:['Tu as divisé par des minutes : ta voiture roule comme un escargot.'], s:['{f} ? Une tortue te double.'] },
    'identite-double':{ e:'(a + b)² = a² + 2ab + b² : n’oublie pas le double produit.', t:['Le double produit 2ab est passé à la trappe.'], s:['{f} ? Le double produit vient de déposer plainte pour oubli.'] },
    'identite-signe':{ e:'(a − b)(a + b) = a² − b².', t:['Le signe du milieu s’est trompé de camp.'], s:['{f} ? Le − et le + se sont battus, aucun n’a gagné.'] },
    'factoriser-carre':{ e:'a² − b² = (a − b)(a + b), pas (a − b)².', t:['Une différence de deux carrés, c’est (a − b)(a + b).'], s:['{f} ? Tu as fabriqué un double produit qui n’était pas invité.'] },
    'produit-nul-signes':{ e:'(x − a) = 0 donne x = a ; (x + b) = 0 donne x = −b.', t:['Les signes des solutions sont inversés : elles ont mis leur pull à l’envers.'], s:['{f} ? Tes solutions sont dans le miroir.'] },
    'produit-nul-une':{ e:'Un produit est nul si L’UN OU L’AUTRE facteur est nul : deux solutions.', t:['Il manque une solution : elle attend devant la porte.'], s:['{f} ? Une solution a été oubliée à l’arrêt de bus.'] },
    'thales-inverse':{ e:'Les rapports se correspondent : petit/grand = petit/grand (AM/AB = AN/AC).', t:['Le rapport est à l’envers : le petit triangle se prend pour le grand.'], s:['{f} ? Ton petit triangle a mangé le grand.'] },
    'thales-difference':{ e:'Thalès, ce sont des quotients égaux, pas des différences égales.', t:['On divise, on ne soustrait pas : Thalès parle de rapports.'], s:['{f} ? Thalès se retourne dans sa tombe… lentement.'] },
    'trigo-confusion':{ e:'CAH-SOH-TOA : cos = adjacent/hypoténuse, sin = opposé/hypoténuse, tan = opposé/adjacent.', t:['Mauvais côté : CAH-SOH-TOA te fait coucou.'], s:['{f} ? Tu as confondu les côtés. CAH SOH TOA, c’est pas un sort de magie.'] },
    'trigo-inverse':{ e:'Le cosinus est toujours ≤ 1 : l’hypoténuse est au dénominateur.', t:['Ta fraction est à l’envers : le cosinus ne dépasse jamais 1.'], s:['{f} ? Un cosinus plus grand que 1, c’est comme un triangle carré.'] },
    'image-priorite':{ e:'f(x) = ax + b : on multiplie d’abord, puis on ajoute.', t:['Priorité ! On multiplie avant d’ajouter.'], s:['{f} ? La multiplication s’est fait doubler par l’addition.'] },
    'antecedent-image':{ e:'Antécédent : on cherche x tel que f(x) = y (on résout).', t:['Tu as calculé une image au lieu d’un antécédent : demi-tour !'], s:['{f} ? Tu es parti dans le mauvais sens sur l’autoroute de la fonction.'] },
    'pgcd-ppcm':{ e:'PGCD = le plus GRAND diviseur commun (jamais plus grand que les deux nombres).', t:['Ça, c’est un multiple commun, pas un diviseur !'], s:['{f} ? Un diviseur plus grand que les nombres ? C’est un géant dans une boîte à chaussures.'] },
    'pgcd-produit':{ e:'Le PGCD divise les deux nombres : il est plus petit qu’eux.', t:['Tu as multiplié : le PGCD voulait diviser.'], s:['{f} ? Ton diviseur commun est plus gros qu’un éléphant.'] },
    'evolution-retour':{ e:'+p % puis −p % ne ramène pas au départ : les pourcentages ne portent pas sur la même base.', t:['+20 % puis −20 % ne s’annulent pas : la deuxième fois, la base a changé.'], s:['{f} ? Tu crois que les soldes remboursent la hausse ? Le magasin rigole.'] },
    'coef-taux':{ e:'Augmenter de p %, c’est multiplier par 1 + p/100.', t:['Tu as donné le taux, pas le coefficient : il manque le 1 + …'], s:['{f} ? Avec ce coefficient, le prix fond comme une glace.'] },
    'mediane-moyenne':{ e:'Médiane : on RANGE les valeurs, et on prend celle du milieu.', t:['Ça, c’est la moyenne. La médiane, c’est la valeur du milieu.'], s:['{f} ? Tu as calculé la moyenne : la médiane attend au milieu, toute seule.'] },
    'mediane-triee':{ e:'Avant de prendre le milieu, il faut ranger les valeurs dans l’ordre.', t:['Tu n’as pas rangé les valeurs : la médiane s’est perdue dans le désordre.'], s:['{f} ? Ta chambre est rangée comme cette série.'] },
    'proba-deux':{ e:'Pour deux épreuves indépendantes : on multiplie les probabilités (arbre).', t:['On multiplie le long des branches de l’arbre !'], s:['{f} ? Ton arbre a perdu une branche.'] },
    'volume-aire':{ e:'Volume du cylindre = π × r² × h.', t:['Ça, c’est l’aire du tour, pas le volume : ta boîte de conserve est vide.'], s:['{f} ? Tu as calculé l’étiquette de la boîte, pas ce qu’il y a dedans.'] },
    'volume-carre':{ e:'Le rayon est AU CARRÉ : r × r.', t:['Le rayon voulait être au carré !'], s:['{f} ? Ta boîte a été écrasée par un rouleau compresseur.'] },
    'intervalle-crochets':{ e:'Crochet tourné vers le nombre : inclus. Tourné vers l’extérieur : exclu.', t:['Les crochets regardent dans le mauvais sens.'], s:['{f} ? Tes crochets ont des problèmes d’orientation.'] },
    'vecteur-sens':{ e:'Coordonnées de AB = (xB − xA ; yB − yA) : arrivée moins départ.', t:['Départ moins arrivée : ton vecteur roule en marche arrière.'], s:['{f} ? Ton vecteur fait demi-tour avant de partir.'] },
    'vecteur-milieu':{ e:'Les coordonnées d’un vecteur sont des différences, pas des moyennes.', t:['Tu as calculé un milieu : le vecteur voulait une différence.'], s:['{f} ? Tu as trouvé le milieu, le vecteur, lui, est toujours perdu.'] },
    'milieu-difference':{ e:'Milieu = ((xA + xB)/2 ; (yA + yB)/2) : une moyenne.', t:['Le milieu, c’est une moyenne, pas une différence.'], s:['{f} ? Ton milieu habite dans le mauvais quartier.'] },
    'pente-inverse':{ e:'Coefficient directeur = (yB − yA)/(xB − xA) : vertical sur horizontal.', t:['Tu as mis l’horizontal en haut : la pente est couchée.'], s:['{f} ? Ta pente est tombée de son vélo.'] },
    'taux-reciproque':{ e:'Après +p %, revenir demande un pourcentage plus petit : coefficient 1 ÷ (1 + p/100).', t:['−p % ne compense pas +p % : la base a changé.'], s:['{f} ? Tu ne retrouves pas le prix de départ, tu as même perdu tes clés.'] },
    'carre-une':{ e:'x² = a (a > 0) a DEUX solutions : √a et −√a.', t:['Tu as oublié la solution négative : elle se cache derrière le zéro.'], s:['{f} ? La solution négative boude au fond de la classe.'] },
    'carre-moitie':{ e:'x² = a se résout avec la racine carrée, pas en divisant par 2.', t:['Le carré n’est pas un « fois 2 ».'], s:['{f} ? Tu as coupé le carré en deux, il saigne des chiffres.'] },
    'affine-signe':{ e:'ax + b = 0 donne x = −b/a.', t:['Le signe de −b/a s’est envolé.'], s:['{f} ? Ta valeur d’annulation est de l’autre côté du zéro.'] },
    'union-intersection':{ e:'P(A ∪ B) = P(A) + P(B) − P(A ∩ B) : on enlève ce qui est compté deux fois.', t:['Tu as compté l’intersection deux fois : elle a été invitée deux fois à la fête.'], s:['{f} ? Les éléments de A ∩ B ont triché : ils ont voté deux fois.'] },
    'delta-signe':{ e:'Δ = b² − 4ac (avec un moins).', t:['C’est « moins 4ac » : le signe s’est retourné.'], s:['{f} ? Ton discriminant a perdu son moins en chemin.'] },
    'racines-signes':{ e:'x = (−b ± √Δ)/(2a) : attention au −b.', t:['Les racines ont changé de signe : elles se regardent dans un miroir.'], s:['{f} ? Le −b a été oublié dans la formule. Il pleure.'] },
    'derivee-constante':{ e:'La dérivée d’une constante est 0.', t:['La constante disparaît quand on dérive : elle ne bouge pas, donc sa dérivée est nulle.'], s:['{f} ? La constante s’est incrustée dans la dérivée. Personne ne l’a invitée.'] },
    'derivee-exposant':{ e:'(xⁿ)′ = n × xⁿ⁻¹ : l’exposant descend devant ET diminue de 1.', t:['L’exposant n’est pas descendu devant : il a eu le vertige.'], s:['{f} ? L’exposant est resté en haut, il a peur de sauter.'] },
    'suite-decalage':{ e:'uₙ = u₀ + n × r : attention à l’indice de départ (u₀ ou u₁).', t:['Un terme de décalage : tu as compté une marche de trop.'], s:['{f} ? Tu as sauté une marche dans l’escalier de la suite.'] },
    'arith-geo':{ e:'Arithmétique : on AJOUTE r. Géométrique : on MULTIPLIE par q.', t:['Mauvaise famille de suite : arithmétique et géométrique ne sont pas jumelles.'], s:['{f} ? Ta suite a changé de famille en cours de route.'] },
    'somme-gauss':{ e:'1 + 2 + … + n = n(n + 1)/2.', t:['Formule de Gauss presque juste : il manque un bout.'], s:['{f} ? Gauss avait 10 ans quand il a trouvé : allez, encore un effort.'] },
    'scalaire-vecteur':{ e:'Le produit scalaire est un NOMBRE : xx′ + yy′.', t:['Le produit scalaire donne un nombre, pas un vecteur.'], s:['{f} ? Ton produit scalaire s’est déguisé en vecteur.'] },
    'scalaire-melange':{ e:'On multiplie les abscisses entre elles et les ordonnées entre elles.', t:['Abscisses avec abscisses, ordonnées avec ordonnées !'], s:['{f} ? Les coordonnées ont dansé avec le mauvais partenaire.'] },
    'proba-cond':{ e:'P(A ∩ B) = P(A) × P_A(B) : on multiplie le long de l’arbre.', t:['On multiplie sur une branche, on n’additionne pas.'], s:['{f} ? Ton arbre de probabilités a des branches en plastique.'] },
    'exp-produit':{ e:'eᵃ × eᵇ = eᵃ⁺ᵇ et (eᵃ)ᵇ = eᵃᵇ.', t:['Mauvaise règle : produit → on additionne les exposants ; puissance → on les multiplie.'], s:['{f} ? Les exposants ont fait n’importe quoi, comme toi au réveil.'] },
    'limite-un':{ e:'Quotient de polynômes en +∞ : on garde les termes de plus haut degré.', t:['Ce n’est pas 1 : regarde les coefficients des termes dominants.'], s:['{f} ? La limite n’est pas toujours 1, ce n’est pas un joker.'] },
    'limite-degre':{ e:'Mêmes degrés en haut et en bas : la limite est le quotient des coefficients dominants.', t:['Même degré : ni 0, ni l’infini.'], s:['{f} ? Ta limite est partie en orbite pour rien.'] },
    'ln-somme':{ e:'ln(a) + ln(b) = ln(a × b), pas ln(a + b).', t:['Le logarithme transforme les produits en sommes, pas l’inverse.'], s:['{f} ? Le logarithme vient de faire un malaise.'] },
    'composee-a':{ e:'(u(x)ⁿ)′ = n × u′(x) × u(x)ⁿ⁻¹ : n’oublie pas u′.', t:['Il manque la dérivée de l’intérieur : la parenthèse se sent ignorée.'], s:['{f} ? L’intérieur de la parenthèse n’a pas été dérivé, il est vexé.'] },
    'primitive-derivee':{ e:'Primitive de xⁿ : xⁿ⁺¹/(n + 1). (Là, tu as dérivé.)', t:['Tu as dérivé au lieu de primitiver : demi-tour !'], s:['{f} ? Tu as remonté la rivière dans le mauvais sens.'] },
    'integrale-valeur':{ e:'L’intégrale se calcule avec une primitive : F(b) − F(a).', t:['Tu as calculé f(b), pas l’intégrale.'], s:['{f} ? L’intégrale voulait toute l’aire, pas juste la hauteur à la fin.'] },
    'binomiale-coef':{ e:'P(X = k) = (n parmi k) × pᵏ × (1 − p)ⁿ⁻ᵏ : n’oublie pas le coefficient binomial.', t:['Le coefficient binomial a été oublié : un seul chemin compté sur plusieurs.'], s:['{f} ? Tu as compté un seul chemin dans l’arbre. Les autres chemins boudent.'] },
    'esperance':{ e:'Pour une loi binomiale, E(X) = n × p.', t:['L’espérance d’une binomiale, c’est n × p.'], s:['{f} ? Ton espérance a perdu espoir.'] },
    'combi-arrangement':{ e:'Combinaisons (l’ordre ne compte pas) : n! / (k!(n − k)!).', t:['Tu as compté l’ordre : ce sont des arrangements, pas des combinaisons.'], s:['{f} ? Tu as compté chaque groupe plusieurs fois, comme des selfies en rafale.'] },
    'limite-geo':{ e:'qⁿ tend vers 0 si −1 < q < 1, vers +∞ si q > 1.', t:['qⁿ ne tend pas vers 1 : regarde si q est plus petit ou plus grand que 1.'], s:['{f} ? Ta suite fait du surplace alors qu’elle file.'] }
  };
  const GENERIQUES = { t:['Presque ! Prof Pi a vu passer une erreur de calcul en rollers.', 'Pas loin… mais en maths, « pas loin » c’est encore loin.', 'Ton calcul a pris un raccourci par la forêt.'], s:['{f} ? Même ta calculatrice a demandé un congé.', 'Prof Pi a fait tomber sa craie de surprise.', '{f} ? Ce nombre est venu sans invitation.'] };
  ERREURS.generique = { e:'Refais le calcul étape par étape, en vérifiant chaque opération.', t:GENERIQUES.t, s:GENERIQUES.s };
  const DOUX = ['Pas grave, on apprend en se trompant !', 'Presque ! On regarde ensemble ?', 'Bonne tentative ! Voici l’astuce :'];

  // Vanne de Prof Pi pour une erreur, selon le ton : 'doux' (5-8 ans), 'taquin', 'sanspitie' (ados).
  // memoire (facultative) : { age(ligne) → -1 si jamais dite, sinon ancienneté (plus grand = plus ancien) }.
  // Avec elle, Prof Pi ne répète pas une vanne : d'abord celles jamais dites pour cette erreur, puis les vannes
  // générales jamais dites, et seulement ensuite la plus ancienne.
  function choisir(pool, r, memoire){
    if(!memoire) return C(r, pool);
    const neuves = pool.filter(l => memoire.age(l) < 0);
    // v5.71 : d'abord les vannes qui font rire (ironie, question piquante), ensuite les plus sages.
    const droles = neuves.filter(l => /[?!]|^Ah, |^Bravo|^Magnifique|^Superbe/.test(l));
    if(droles.length) return C(r, droles);
    if(neuves.length) return C(r, neuves);
    return null;
  }
  function vanne(cle, ton, valeurs, r, memoire){
    r = r || Math.random; const d = D(), en = !!d, X = d ? d.erreurs : ERREURS, GEN = d ? d.erreurs.generique : GENERIQUES;
    const e = X[cle] || null, rempl = s => s.replace(/\{(\w+)\}/g, (m, k) => valeurs && valeurs[k] != null ? valeurs[k] : m);
    if(ton === 'doux') return rempl(C(r, d ? d.doux : DOUX) + ' ' + (e ? e.e : ''));
    const k = ton === 'sanspitie' ? 's' : 't', pool = (e && e[k]) || GEN[k];
    let l = choisir(pool, r, memoire) || choisir(GEN[k].concat(GEN[k === 's' ? 't' : 's']), r, memoire);
    // Toutes les vannes écrites sont sorties : la fabrique à vannes en invente une nouvelle, jamais dite.
    const fab = !en && window.MATHS && window.MATHS.fabrique; // la fabrique à vannes n'existe qu'en français
    for(let essai = 0; !l && fab && essai < 40; essai++){ const x = fab(); if(memoire.age(x) < 0) l = x; }
    if(!l) l = pool.slice().sort((a, b) => memoire.age(b) - memoire.age(a))[0];
    if(memoire && memoire.noter) memoire.noter(l); // on retient le modèle, pas la phrase avec les nombres
    return rempl(l);
  }
  const expl = (cle, ton) => ton === 'doux' ? '' : ' 💡 ' + (((D() ? D().erreurs : ERREURS)[cle] || {}).e || '');
  // En anglais : coordonnées « (1, 2) » au lieu de « (1 ; 2) ».
  // Et la typographie anglaise : pas d'espace avant « ? ! : % », l'euro devant le nombre (€12.50), intervalles [2, 5) au lieu de [2 ; 5[.
  const fin = s => { const l = LANGUE(); if(l === 'fr' || typeof s !== 'string') return s;
    if(l !== 'en'){ s = s.replace(/ ; /g, '; ').replace(/([^=]) ([?!])/g, '$1$2').replace(/ : /g, ': ');
      // Espagnol : « ¿ » au début de la question (dernière phrase), s'il n'y est pas déjà.
      if(l === 'es' && /\?$/.test(s) && !s.includes('¿')){ const i = s.lastIndexOf('. '); s = i >= 0 ? s.slice(0, i + 2) + '¿' + s.slice(i + 2) : '¿' + s; }
      return s; }
    s = s.replace(/ ; /g, ', ').replace(/([^=]) ([?!])/g, '$1$2').replace(/ : /g, ': ').replace(/(\d) %/g, '$1%');
    s = s.replace(/(−?\d[\d,]*(?:\.\d+)?) €/g, (m, x) => '€' + (/\.\d$/.test(x) ? x + '0' : x));
    return s.replace(/([\[\]])([^\[\]]*?, [^\[\]]*?)([\[\]])/g, (m, a, x, b) => (a === ']' ? '(' : '[') + x + (b === '[' ? ')' : ']')); };

  // ── Générateurs, niveau par niveau ────────────────────────────────
  // Chaque générateur (r) → Q(...). Les mauvaises réponses portent la clé de l'erreur qu'elles représentent.
  const G = {};
  // 6e
  G['6-decimaux'] = r => { const i = E(r, 0, 20), d1 = E(r, 2, 8), d2 = E(r, 10, d1 * 10 - 1), a = i + d1 / 10, b = i + d2 / 100;
    return Q(T('Quel est le plus grand nombre : ') + nb(a) + T(' ou ') + nb(b) + ' ?', nb(a), [[nb(b), 'decimal-longueur'], [T('Ils sont égaux'), 'decimal-egal']], T('On compare les dixièmes : ') + d1 + ' > ' + Math.floor(d2 / 10) + '.'); };
  G['6-mixtes'] = r => { const d = E(r, 2, 9), n = E(r, 1, d - 1), a = E(r, 1, 5);
    return Q(T('Écris ') + a + ' + ' + n + '/' + d + T(' sous forme d’une seule fraction.'), frb(a * d + n, d), [[frb(a + n, d), 'mixte-addition'], [frb(a * n + d, d), 'mixte-melange'], [frb(a * d + n, d * a), 'mixte-melange']], a + ' = ' + (a * d) + '/' + d + T(', donc ') + a + ' + ' + n + '/' + d + ' = ' + (a * d + n) + '/' + d + '.'); };
  G['6-divisibilite'] = r => { const k = E(r, 12, 99), bon = 9 * k; let f1 = bon + C(r, [10, 20, 30]); while(f1 % 9 === 0 || f1 % 10 !== 9) f1 = 10 * E(r, 10, 98) + 9; let f2 = 3 * E(r, 40, 300); while(f2 % 9 === 0) f2 += 3;
    return Q(T('Lequel de ces nombres est divisible par 9 ?'), nb(bon), [[nb(f1), 'divis-dernier'], [nb(f2), 'divis-3-9']], T('Somme des chiffres de ') + bon + ' : ' + String(bon).split('').reduce((s, c) => s + +c, 0) + T(', un multiple de 9.')); };
  G['6-priorites'] = r => { const a = E(r, 2, 20), b = E(r, 2, 9), c = E(r, 2, 9);
    return C(r, [() => Q(T('Calcule : ') + a + ' + ' + b + ' × ' + c, nb(a + b * c), [[nb((a + b) * c), 'priorites'], [nb(a + b + c), 'priorites']], T('On commence par ') + b + ' × ' + c + ' = ' + (b * c) + '.'),
      () => Q(T('Calcule : ') + (a + b * c) + ' − ' + b + ' × ' + c, nb(a), [[nb((a + b * c - b) * c), 'priorites']], T('D’abord ') + b + ' × ' + c + ' = ' + (b * c) + T(', puis ') + (a + b * c) + ' − ' + (b * c) + '.')])(); };
  G['6-fraction-de'] = r => { const d = C(r, [2, 3, 4, 5, 6, 8, 10]), n = E(r, 1, d - 1) || 1, N = d * E(r, 2, 12);
    return Q(T('Combien font ') + n + '/' + d + T(' de ') + N + ' ?', nb(N / d * n), [[nb(N * n), 'fraction-de-oubli-div'], [nb(N / d), 'fraction-de-oubli-mult'], [nb(N / n * d, 2), 'fraction-de-inverse']], N + ' ÷ ' + d + ' = ' + (N / d) + T(', puis × ') + n + '.'); };
  G['6-fractions-multiples'] = r => { const b = C(r, [2, 3, 4, 5]), k = C(r, [2, 3, 4]), a = E(r, 1, b - 1) || 1, c = E(r, 1, b * k - 1);
    return Q(T('Calcule : ') + a + '/' + b + ' + ' + c + '/' + (b * k), fr(a * k + c, b * k), [[fr(a + c, b + b * k), 'fractions-add-den'], [fr(a + c, b * k), 'fractions-oubli-mult']], a + '/' + b + ' = ' + (a * k) + '/' + (b * k) + T(', donc ') + (a * k) + '/' + (b * k) + ' + ' + c + '/' + (b * k) + ' = ' + frb(a * k + c, b * k) + '.'); };
  G['6-fractions-somme'] = r => { let b = E(r, 2, 7), d = E(r, 2, 7); while(d === b) d = E(r, 2, 7); const a = E(r, 1, 6), c = E(r, 1, 6);
    return Q(T('Calcule : ') + a + '/' + b + ' + ' + c + '/' + d, fr(a * d + c * b, b * d), [[fr(a + c, b + d), 'fractions-add-den'], [fr(a + c, b * d), 'fractions-oubli-mult']], T('Même dénominateur ') + (b * d) + ' : ' + (a * d) + '/' + (b * d) + ' + ' + (c * b) + '/' + (b * d) + '.'); };
  G['6-trou'] = r => { const a = E(r, 3, 40), x = E(r, 3, 40), k = E(r, 2, 9), y = E(r, 2, 12);
    return C(r, [() => Q(T('Complète : ') + a + ' + … = ' + (a + x), nb(x), [[nb(2 * a + x), 'trou-operation'], [nb(a + x + 1 - 1 + a), 'trou-operation']], (a + x) + ' − ' + a + ' = ' + x + '.'),
      () => Q(T('Complète : ') + k + ' × … = ' + (k * y), nb(y), [[nb(k * y - k), 'trou-operation'], [nb(k * k * y), 'trou-operation']], (k * y) + ' ÷ ' + k + ' = ' + y + '.')])(); };
  G['6-programme'] = r => { const n = E(r, 2, 12), a = E(r, 2, 9), b = E(r, 2, 15);
    return Q(T('Programme : choisis ') + n + T(', multiplie par ') + a + T(', puis ajoute ') + b + T('. Résultat ?'), nb(n * a + b), [[nb((n + b) * a), 'programme-ordre'], [nb(n + a + b), 'programme-ordre']], n + ' × ' + a + ' = ' + (n * a) + ', + ' + b + ' = ' + (n * a + b) + '.'); };
  G['6-proportionnalite'] = r => { const u = C(r, [0.5, 1.2, 1.5, 2, 2.5, 3, 0.8]), k = E(r, 2, 5), m = E(r, k + 1, 12), o = C(r, [T('croissants'), T('stylos'), T('cahiers'), T('billes')]);
    return Q(k + ' ' + o + T(' coûtent ') + nb(k * u) + T(' €. Combien coûtent ') + m + ' ' + o + Tk(' coûtent (fin) ', ' ?'), nb(m * u) + ' €', [[nb(k * u + m - k) + ' €', 'proportion-additive'], [nb(k * u * m) + ' €', 'proportion-oubli-unite']], '1 ' + o.replace(/s$/, '') + T(' coûte ') + nb(u) + T(' €, donc ') + m + ' × ' + nb(u) + '.'); };
  G['6-pourcentages'] = r => { const p = C(r, [10, 20, 25, 50, 75]), N = C(r, [40, 60, 80, 120, 200, 360, 400]);
    return Q(T('Calcule ') + p + T(' % de ') + N + '.', nb(N * p / 100), [[nb(N - p), 'pourcent-soustraire'], [nb(N * p), 'pourcent-oubli-100']], p + T(' % de ') + N + ' = ' + N + ' × ' + p + ' ÷ 100.', { valeurs:{ p } }); };
  G['6-conversions'] = r => { const [u1, u2, f] = C(r, [['m', 'cm', 100], ['km', 'm', 1000], ['kg', 'g', 1000], ['L', 'cL', 100], ['cm', 'mm', 10]]), x = C(r, [1.5, 2.3, 0.7, 3, 4.25, 12, 0.05]);
    return Q(nb(x) + ' ' + u1 + T(' = combien de ') + u2 + ' ?', nb(x * f) + ' ' + u2, [[nb(x * (f === 10 ? 100 : 10)) + ' ' + u2, 'conversion-facteur'], [nb(x / f) + ' ' + u2, 'conversion-sens']], '1 ' + u1 + ' = ' + f + ' ' + u2 + T(', donc on multiplie par ') + f + '.'); };
  G['6-aire'] = r => { const L = E(r, 4, 15), l = E(r, 2, L - 1);
    return Q(T('Aire d’un rectangle de ') + L + T(' cm sur ') + l + ' cm ?', (L * l) + ' cm²', [[(2 * (L + l)) + ' cm', 'aire-perimetre'], [(L + l) + ' cm²', 'aire-addition'], [(L * l) + ' cm', 'aire-unite']], T('Aire = ') + L + ' × ' + l + ' = ' + (L * l) + ' cm².'); };
  G['6-aire-conversion'] = r => { const [u1, u2] = C(r, [['m²', 'dm²'], ['dm²', 'cm²']]), x = C(r, [3, 1.5, 0.4, 12, 2.05]);
    return Q(nb(x) + ' ' + u1 + T(' = combien de ') + u2 + ' ?', nb(x * 100) + ' ' + u2, [[nb(x * 10) + ' ' + u2, 'aire-conversion'], [nb(x / 100) + ' ' + u2, 'conversion-sens']], '1 ' + u1 + ' = 100 ' + u2 + '.'); };
  G['6-durees'] = r => { const h = E(r, 8, 20), m = E(r, 20, 55), d = E(r, 15, 50), t = h * 60 + m, faux = h + (LANGUE() === 'fr' ? ' h ' : ':') + (m + d) ;
    return Q(T('Un film commence à ') + heure(t) + T(' et dure ') + d + T(' minutes. À quelle heure finit-il ?'), heure(t + d), [[m + d >= 60 ? faux : heure(t + d + 40), 'duree-base100'], [heure(t + d + 60), 'duree-heure']], m + ' + ' + d + ' = ' + (m + d) + T(' min = ') + Math.floor((m + d) / 60) + ' h ' + ((m + d) % 60) + T(' min.')); };
  G['6-angles'] = r => { const a = E(r, 15, 75), b = E(r, 20, 70);
    return C(r, [() => Q(T('Quel est le complémentaire d’un angle de ') + a + '° ?', (90 - a) + '°', [[(180 - a) + '°', 'angle-comp-supp'], [(360 - a) + '°', 'angle-comp-supp']], T('Complémentaires : somme = 90°.')),
      () => Q(T('Quel est le supplémentaire d’un angle de ') + a + '° ?', (180 - a) + '°', [[(90 - a) + '°', 'angle-comp-supp'], [(360 - a) + '°', 'angle-comp-supp']], T('Supplémentaires : somme = 180°.')),
      () => Q(T('Un triangle a deux angles de ') + a + T('° et ') + b + T('°. Le troisième ?'), (180 - a - b) + '°', [[(360 - a - b) + '°', 'angle-triangle'], [(90 - Math.min(a, b) + 0) + '°', 'angle-triangle']], '180 − ' + a + ' − ' + b + ' = ' + (180 - a - b) + '°.')])(); };
  G['6-probabilites'] = r => { const R = E(r, 1, 7), B = E(r, 1, 7);
    return Q(T('Un sac contient ') + R + T(' boules rouges et ') + B + T(' bleues. Probabilité de tirer une rouge ?'), fr(R, R + B), [[fr(R, B), 'proba-autres'], [fr(B, R + B), 'proba-couleur']], R + T(' rouges sur ') + (R + B) + T(' boules en tout.')); };
  G['6-volume-cubes'] = r => { const a = E(r, 2, 5), b = E(r, 2, 4), c = E(r, 2, 4);
    return Q(T('Un pavé est fait de cubes de 1 cm³ : ') + a + T(' cubes de long, ') + b + T(' de large, ') + c + T(' de haut. Son volume ?'), (a * b * c) + ' cm³', [[(a + b + c) + ' cm³', 'volume-addition'], [(2 * (a * b + b * c + a * c)) + ' cm³', 'volume-faces']], a + ' × ' + b + ' × ' + c + ' = ' + (a * b * c) + T(' cubes.')); };
  G['6-arrondi'] = r => { const x = E(r, 1, 40) + E(r, 1, 9) / 10 + E(r, 6, 9) / 100;
    return Q(T('Arrondis ') + nb(x) + T(' au dixième.'), nb(Math.round(x * 10) / 10), [[nb(Math.floor(x * 10) / 10), 'arrondi-troncature'], [nb(Math.round(x)), 'arrondi-troncature']], T('Le chiffre des centièmes vaut 5 ou plus : on augmente le dixième.')); };
  // 5e
  G['5-relatifs-somme'] = r => { const a = S(r, -15, 15), b = S(r, -15, 15);
    return Q(T('Calcule : ') + nb(a) + ' + ' + par(b), nb(a + b), [[nb(-(a + b)), 'relatifs-signe'], [nb(Math.abs(a) + Math.abs(b)), 'relatifs-valeurs'], [nb(a - b), 'relatifs-signe']], T('Pense au thermomètre : on part de ') + nb(a) + T(' et on avance de ') + nb(b) + '.'); };
  G['5-relatifs-difference'] = r => { const a = S(r, -12, 12), b = -E(r, 1, 12);
    return Q(T('Calcule : ') + nb(a) + ' − ' + par(b), nb(a - b), [[nb(a + b), 'relatifs-moins-moins'], [nb(-(a - b)), 'relatifs-signe']], nb(a) + ' − ' + par(b) + ' = ' + nb(a) + ' + ' + nb(-b) + '.'); };
  G['5-simplifier'] = r => { let a = E(r, 1, 8), b = E(r, 2, 9); while(pgcd(a, b) !== 1 || a === b) { a = E(r, 1, 8); b = E(r, 2, 9); } const k = E(r, 2, 6);
    return Q(T('Simplifie au maximum : ') + (k * a) + '/' + (k * b), a + '/' + b, [[a + '/' + (k * b), 'simplifier-un'], [b + '/' + a, 'fraction-inverse']], T('On divise en haut et en bas par ') + k + '.'); };
  G['5-litteral-valeur'] = r => { const x = E(r, 2, 9), a = E(r, 2, 9), b = E(r, 1, 9);
    return C(r, [() => Q(T('Calcule ') + a + 'x + ' + b + T(' pour x = ') + x + '.', nb(a * x + b), [[nb(Number(String(a) + x) + b), 'litteral-juxtaposition'], [nb(a + x + b), 'litteral-juxtaposition']], a + ' × ' + x + ' + ' + b + ' = ' + (a * x + b) + '.', { valeurs:{ x } }),
      () => Q(T('Calcule ') + a + T('x² pour x = ') + x + '.', nb(a * x * x), [[nb((a * x) ** 2), 'carre-priorite'], [nb(a * x * 2), 'carre-priorite']], a + ' × ' + x + ' × ' + x + ' = ' + (a * x * x) + '.', { valeurs:{ x } })])(); };
  G['5-reduire'] = r => { const a = E(r, 2, 9), b = E(r, 2, 9);
    return Q(T('Réduis : ') + a + 'x + ' + b + 'x', (a + b) + 'x', [[(a + b) + 'x²', 'reduire-carre'], [(a * b) + 'x', 'reduire-mult']], '(' + a + ' + ' + b + ')x = ' + (a + b) + 'x.'); };
  G['5-moyenne'] = r => { const n = C(r, [4, 5]), l = Array.from({ length:n }, () => E(r, 6, 19)); const s = l.reduce((a, b) => a + b, 0); const t = [...l].sort((a, b) => a - b);
    return Q(T('Notes : ') + l.join(' ; ') + T('. Moyenne ?'), nb(s / n, 2), [[nb(s / (n - 1), 2), 'moyenne-effectif'], [nb(n % 2 ? t[(n - 1) / 2] : (t[n / 2 - 1] + t[n / 2]) / 2, 2), 'moyenne-mediane']], T('Somme ') + s + ' ÷ ' + n + T(' valeurs.')); };
  G['5-aire-triangle'] = r => { const b = E(r, 3, 14), h = 2 * E(r, 2, 8);
    return Q(T('Aire d’un triangle de base ') + b + T(' cm et de hauteur ') + h + ' cm ?', nb(b * h / 2) + ' cm²', [[nb(b * h) + ' cm²', 'triangle-oubli-2'], [nb(b + h) + ' cm²', 'aire-addition']], b + ' × ' + h + ' ÷ 2.'); };
  G['5-echelle'] = r => { const e = C(r, [100, 200, 500, 1000]), l = E(r, 2, 12);
    return Q(T('Sur un plan à l’échelle 1/') + nb(e) + T(', une longueur mesure ') + l + T(' cm. En vrai, en mètres ?'), nb(l * e / 100) + ' m', [[nb(l * e) + ' m', 'echelle-unite'], [nb(l * e / 1000) + ' m', 'echelle-unite']], l + ' × ' + e + ' = ' + (l * e) + ' cm = ' + nb(l * e / 100) + ' m.'); };
  G['5-remise'] = r => { const P = C(r, [20, 40, 60, 80, 120, 150]), p = C(r, [10, 20, 25, 30, 50]);
    return Q(T('Un jeu coûte ') + P + T(' €. Remise de ') + p + T(' %. Nouveau prix ?'), nb(P * (1 - p / 100)) + ' €', [[nb(P - p) + ' €', 'pourcent-soustraire'], [nb(P * p / 100) + ' €', 'pourcent-remise-seule']], T('Remise = ') + nb(P * p / 100) + T(' €, donc ') + P + ' − ' + nb(P * p / 100) + '.', { valeurs:{ p } }); };
  G['5-proba-contraire'] = r => { const p = E(r, 1, 9) / 10;
    return Q('P(A) = ' + nb(p) + T('. Probabilité de « non A » ?'), nb(1 - p), [[nb(1 + p), 'proba-complement'], [nb(p), 'proba-complement']], '1 − ' + nb(p) + '.'); };
  // 4e
  G['4-relatifs-produit'] = r => { const a = S(r, -9, 9), b = S(r, -9, 9);
    return Q(T('Calcule : ') + par(a) + ' × ' + par(b), nb(a * b), [[nb(-a * b), 'regle-signes'], [nb(a + b), 'regle-signes']], T('Signes ') + (a * b > 0 ? T('identiques : positif') : T('différents : négatif')) + '.'); };
  G['4-fractions-produit'] = r => { const b = E(r, 2, 9), d = E(r, 2, 9), a = E(r, 1, b - 1), c = E(r, 1, d - 1);
    return Q(T('Calcule : ') + a + '/' + b + ' × ' + c + '/' + d, fr(a * c, b * d), [[fr(a + c, b + d), 'fractions-mult-add'], [fr(a * d, b * c), 'fractions-div']], '(' + a + ' × ' + c + ')/(' + b + ' × ' + d + ').'); };
  G['4-fractions-quotient'] = r => { const b = E(r, 2, 9), d = E(r, 2, 9), a = E(r, 1, b - 1), c = E(r, 1, d - 1);
    return Q(T('Calcule : ') + a + '/' + b + ' ÷ ' + c + '/' + d, fr(a * d, b * c), [[fr(a * c, b * d), 'fractions-div'], [fr(b * c, a * d), 'fraction-inverse']], a + '/' + b + ' × ' + d + '/' + c + '.'); };
  G['4-puissances'] = r => { const m = E(r, 2, 8), n = E(r, 3, 8), a = E(r, 2, 5);
    return C(r, [() => Q(T('Écris sous la forme d’une seule puissance : 10') + exp(m) + ' × 10' + exp(n), '10' + exp(m + n), [['10' + exp(m * n), 'puissance-produit'], ['100' + exp(m + n), 'puissance-base']], T('On additionne les exposants : ') + m + ' + ' + n + '.'),
      () => Q(T('Calcule : ') + a + exp(n > 5 ? 3 : n), nb(a ** (n > 5 ? 3 : n)), [[nb(a * (n > 5 ? 3 : n)), 'puissance-mult'], [nb(a + (n > 5 ? 3 : n)), 'puissance-mult']], a + T(' multiplié ') + (n > 5 ? 3 : n) + T(' fois par lui-même.')),
      () => Q(T('Écris en écriture décimale : 10') + exp(-Math.min(m, 4)), nb(10 ** -Math.min(m, 4)), [[nb(-(10 ** Math.min(m, 4))), 'puissance-negative'], [nb(-10 * Math.min(m, 4)), 'puissance-negative']], '10' + exp(-Math.min(m, 4)) + ' = 1/10' + exp(Math.min(m, 4)) + '.')])(); };
  G['4-pythagore'] = r => { const [a, b, c] = C(r, TRIPLETS);
    return C(r, [() => Q(T('Triangle rectangle : côtés de l’angle droit ') + a + T(' cm et ') + b + T(' cm. Hypoténuse ?'), c + ' cm', [[(a + b) + ' cm', 'pythagore-somme'], [(a * a + b * b) + ' cm', 'pythagore-racine']], a + '² + ' + b + '² = ' + (a * a + b * b) + T(', et √') + (a * a + b * b) + ' = ' + c + '.'),
      () => Q(T('Triangle rectangle : hypoténuse ') + c + T(' cm, un côté ') + a + T(' cm. L’autre côté ?'), b + ' cm', [[nb(Math.round(Math.sqrt(c * c + a * a) * 10) / 10) + ' cm', 'pythagore-cote'], [(c - a) + ' cm', 'pythagore-somme']], c + '² − ' + a + '² = ' + (b * b) + T(', et √') + (b * b) + ' = ' + b + '.')])(); };
  G['4-equations'] = r => { const a = S(r, 2, 9), x = S(r, -9, 9), b = S(r, -12, 12), c = a * x + b;
    return Q(T('Résous : ') + a + 'x' + signe(b) + ' = ' + nb(c), 'x = ' + nb(x), [['x = ' + fr(c + b, a), 'equation-signe'], ['x = ' + nb(c - b - a), 'equation-division']], a + 'x = ' + nb(c) + signe(-b) + ' = ' + nb(c - b) + T(', donc x = ') + nb(c - b) + ' ÷ ' + a + '.'); };
  G['4-developper'] = r => { const k = S(r, 2, 9), a = S(r, -9, 9);
    return Q(T('Développe : ') + k + '(x' + signe(a) + ')', poly([k, k * a]), [[poly([k, a]), 'distrib-oubli'], [poly([k, k + a]), 'distrib-oubli']], k + ' × x' + signe(k * a) + T(' (on multiplie aussi ') + nb(a) + T(' par ') + k + ').'); };
  G['4-double-distributivite'] = r => { const a = S(r, -7, 7), b = S(r, -7, 7);
    return Q(T('Développe et réduis : (x') + signe(a) + ')(x' + signe(b) + ')', poly([1, a + b, a * b]), [[poly([1, 0, a * b]), 'double-distrib-oubli'], [poly([1, a + b, a + b]), 'double-distrib-produit']], 'x² + ' + par(b) + 'x + ' + par(a) + 'x + ' + par(a) + ' × ' + par(b) + '.'); };
  G['4-notation-scientifique'] = r => { const m = E(r, 11, 99) / 10, p = E(r, 3, 7), N = Math.round(m * 10 ** p);
    return Q(T('Écris ') + nb(N) + T(' en notation scientifique.'), nb(m) + ' × 10' + exp(p), [[nb(m * 10) + ' × 10' + exp(p - 1), 'sci-mantisse'], [nb(m) + ' × 10' + exp(p - 1), 'sci-exposant'], [nb(m) + ' × 10' + exp(p + 1), 'sci-exposant']], T('La virgule se déplace de ') + p + T(' rangs.')); };
  G['4-vitesse'] = r => { const v = C(r, [30, 40, 60, 80, 90, 120]), t = C(r, [15, 30, 45, 90]), d = v * t / 60;
    return Q(T('Une voiture parcourt ') + nb(d) + T(' km en ') + t + T(' minutes. Sa vitesse en km/h ?'), v + ' km/h', [[nb(d / t, 2) + ' km/h', 'vitesse-minutes'], [nb(d * t) + ' km/h', 'vitesse-minutes']], t + T(' min = ') + nb(t / 60) + T(' h, donc ') + nb(d) + ' ÷ ' + nb(t / 60) + '.'); };
  // 3e
  G['3-identites'] = r => { const a = E(r, 1, 9);
    return C(r, [() => Q(T('Développe : (x + ') + a + ')²', poly([1, 2 * a, a * a]), [[poly([1, 0, a * a]), 'identite-double'], [poly([1, a, a * a]), 'identite-double']], '(a + b)² = a² + 2ab + b².'),
      () => Q(T('Développe : (x − ') + a + ')²', poly([1, -2 * a, a * a]), [[poly([1, 0, -a * a]), 'identite-double'], [poly([1, 0, a * a]), 'identite-double']], '(a − b)² = a² − 2ab + b².'),
      () => Q(T('Développe : (x − ') + a + ')(x + ' + a + ')', poly([1, 0, -a * a]), [[poly([1, 0, a * a]), 'identite-signe'], [poly([1, -2 * a, -a * a]), 'identite-double']], '(a − b)(a + b) = a² − b².')])(); };
  G['3-factoriser'] = r => { const a = E(r, 2, 12);
    return Q(T('Factorise : x² − ') + (a * a), '(x − ' + a + ')(x + ' + a + ')', [['(x − ' + a + ')²', 'factoriser-carre'], ['(x − ' + (a * a) + ')(x + ' + (a * a) + ')', 'factoriser-carre']], 'x² − ' + a + '² = (x − ' + a + ')(x + ' + a + ').'); };
  G['3-produit-nul'] = r => { const a = E(r, 1, 9), b = E(r, 1, 9);
    return Q(T('Résous : (x − ') + a + ')(x + ' + b + ') = 0', 'x = ' + a + T(' ou x = ') + nb(-b), [['x = ' + nb(-a) + T(' ou x = ') + b, 'produit-nul-signes'], ['x = ' + a + T(' seulement'), 'produit-nul-une']], T('Un produit est nul si l’un des facteurs est nul.')); };
  G['3-thales'] = r => { const k = C(r, [2, 3, 4]), AM = E(r, 2, 6), AN = E(r, 2, 6), AB = AM * k, AC = AN * k;
    return Q('(MN) // (BC), M ∈ [AB], N ∈ [AC]. AM = ' + AM + ', AB = ' + AB + ', AC = ' + AC + T('. Calcule AN.'), 'AN = ' + AN, [['AN = ' + nb(AB * AC / AM), 'thales-inverse'], ['AN = ' + nb(AC - (AB - AM)), 'thales-difference']], T('AM/AB = AN/AC, donc AN = ') + AC + ' × ' + AM + '/' + AB + ' = ' + AN + '.'); };
  G['3-trigonometrie'] = r => { const [a, b, c] = C(r, TRIPLETS), f = C(r, ['cos', 'sin', 'tan']);
    const bon = { cos:fr(a, c), sin:fr(b, c), tan:fr(b, a) }[f];
    const faux = { cos:[[fr(b, c), 'trigo-confusion'], [fr(c, a), 'trigo-inverse']], sin:[[fr(a, c), 'trigo-confusion'], [fr(c, b), 'trigo-inverse']], tan:[[fr(a, b), 'trigo-confusion'], [fr(b, c), 'trigo-confusion']] }[f];
    return Q(T('Triangle ABC rectangle en B : AB = ') + a + T(' (côté adjacent à Â), BC = ') + b + ', AC = ' + c + '. ' + f + '(Â) = ?', bon, faux, T('CAH-SOH-TOA.')); };
  G['3-fonctions'] = r => { const a = S(r, -6, 6), b = S(r, -9, 9), x = S(r, -5, 5), y = a * x + b;
    return C(r, [() => Q('f(x) = ' + poly([a, b]) + T('. Calcule f(') + nb(x) + ').', nb(y), [[nb(a * (x + b)), 'image-priorite'], [nb(-y), 'relatifs-signe']], nb(a) + ' × ' + par(x) + signe(b) + '.'),
      () => Q('f(x) = ' + poly([a, b]) + T('. Antécédent de ') + nb(y) + ' ?', nb(x), [[nb(a * y + b), 'antecedent-image'], [fr(y + b, a), 'equation-signe']], T('On résout ') + poly([a, b]) + ' = ' + nb(y) + '.')])(); };
  G['3-arithmetique'] = r => { const g = C(r, [4, 6, 8, 9, 12, 15]); let p = E(r, 2, 7), q = E(r, 2, 9); while(pgcd(p, q) !== 1 || p === q) { p = E(r, 2, 7); q = E(r, 2, 9); } const A = g * p, B = g * q;
    return Q(T('PGCD de ') + A + T(' et ') + B + ' ?', nb(g), [[nb(ppcm(A, B)), 'pgcd-ppcm'], [nb(A * B), 'pgcd-produit'], [nb(g / pgcd(g, 2) === g ? g * 2 : g / 2), 'pgcd-ppcm']], A + ' = ' + g + ' × ' + p + T(' et ') + B + ' = ' + g + ' × ' + q + '.'); };
  G['3-evolutions'] = r => { const p = C(r, [5, 10, 20, 25, 30, 40]);
    return C(r, [() => Q(T('Augmenter de ') + p + T(' % revient à multiplier par :'), nb(1 + p / 100), [[nb(p / 100), 'coef-taux'], [nb(p), 'coef-taux']], '1 + ' + p + '/100.'),
      () => Q(T('Un prix de 100 € augmente de ') + p + T(' %, puis baisse de ') + p + T(' %. Prix final ?'), nb(100 * (1 + p / 100) * (1 - p / 100)) + ' €', [['100 €', 'evolution-retour']], '100 × ' + nb(1 + p / 100) + ' × ' + nb(1 - p / 100) + '.')])(); };
  G['3-statistiques'] = r => { const l = Array.from({ length:5 }, () => E(r, 2, 20)); const t = [...l].sort((a, b) => a - b); const moy = l.reduce((a, b) => a + b, 0) / 5;
    return Q(T('Série : ') + l.join(' ; ') + T('. Médiane ?'), nb(t[2]), [[nb(moy, 1), 'mediane-moyenne'], [nb(l[2]), 'mediane-triee']], T('Rangée : ') + t.join(' ; ') + T(', valeur du milieu : ') + t[2] + '.'); };
  G['3-probabilites'] = r => { const [n, nom] = C(r, [[2, T('pile')], [6, T('6 avec un dé')]]);
    return Q(T('On lance deux fois (pièce ou dé). Probabilité d’obtenir deux fois ') + nom + ' ?', fr(1, n * n), [[fr(2, n), 'proba-deux'], [fr(1, n), 'proba-deux']], '1/' + n + ' × 1/' + n + '.'); };
  G['3-volumes'] = r => { const R = E(r, 2, 6), h = E(r, 3, 12);
    return Q(T('Volume d’un cylindre de rayon ') + R + T(' cm et de hauteur ') + h + T(' cm, arrondi à l’unité ?'), nb(Math.round(Math.PI * R * R * h)) + ' cm³', [[nb(Math.round(2 * Math.PI * R * h)) + ' cm³', 'volume-aire'], [nb(Math.round(Math.PI * R * h)) + ' cm³', 'volume-carre']], 'π × ' + R + '² × ' + h + '.'); };
  // 2nde
  G['2-intervalles'] = r => { const a = S(r, -8, 4), b = a + E(r, 2, 9);
    return Q(T('Les x tels que ') + nb(a) + ' ≤ x < ' + nb(b) + T(' s’écrivent :'), '[' + nb(a) + ' ; ' + nb(b) + '[', [[']' + nb(a) + ' ; ' + nb(b) + ']', 'intervalle-crochets'], ['[' + nb(a) + ' ; ' + nb(b) + ']', 'intervalle-crochets']], T('≤ : crochet fermé, < : crochet ouvert.')); };
  G['2-vecteurs'] = r => { const xa = S(r, -6, 6), ya = S(r, -6, 6), xb = S(r, -6, 6), yb = S(r, -6, 6);
    return C(r, [() => Q('A(' + nb(xa) + ' ; ' + nb(ya) + '), B(' + nb(xb) + ' ; ' + nb(yb) + T('). Coordonnées de AB→ ?'), '(' + nb(xb - xa) + ' ; ' + nb(yb - ya) + ')', [['(' + nb(xa - xb) + ' ; ' + nb(ya - yb) + ')', 'vecteur-sens'], ['(' + nb((xa + xb) / 2) + ' ; ' + nb((ya + yb) / 2) + ')', 'vecteur-milieu']], T('Arrivée moins départ.')),
      () => Q('A(' + nb(xa) + ' ; ' + nb(ya) + '), B(' + nb(xb) + ' ; ' + nb(yb) + T('). Milieu de [AB] ?'), '(' + nb((xa + xb) / 2) + ' ; ' + nb((ya + yb) / 2) + ')', [['(' + nb((xb - xa) / 2) + ' ; ' + nb((yb - ya) / 2) + ')', 'milieu-difference'], ['(' + nb(xa + xb) + ' ; ' + nb(ya + yb) + ')', 'milieu-difference']], T('Moyenne des abscisses et des ordonnées.'))])(); };
  G['2-droites'] = r => { const xa = S(r, -5, 5); let xb = S(r, -5, 5); while(xb === xa) xb = S(r, -5, 5); const ya = S(r, -6, 6), yb = S(r, -6, 6);
    return Q(T('Coefficient directeur de (AB) avec A(') + nb(xa) + ' ; ' + nb(ya) + T(') et B(') + nb(xb) + ' ; ' + nb(yb) + ') ?', fr(yb - ya, xb - xa), [[yb === ya ? T('la droite est verticale') : fr(xb - xa, yb - ya), 'pente-inverse'], [fr(ya - yb, xb - xa), 'vecteur-sens']], '(yB − yA)/(xB − xA).'); };
  G['2-taux-reciproque'] = r => { const [p, q] = C(r, [[25, 20], [100, 50], [60, 37.5], [300, 75]]);
    return Q(T('Un prix augmente de ') + p + T(' %. Quelle baisse le ramène au prix de départ ?'), nb(q) + ' %', [[nb(p) + ' %', 'taux-reciproque'], [nb(p / 2) + ' %', 'taux-reciproque']], '1 ÷ ' + nb(1 + p / 100) + ' = ' + nb(1 - q / 100) + '.'); };
  G['2-carres'] = r => { const a = E(r, 2, 12);
    return Q(T('Résous : x² = ') + (a * a), 'x = ' + a + T(' ou x = ') + nb(-a), [['x = ' + a, 'carre-une'], ['x = ' + nb(a * a / 2), 'carre-moitie']], '√' + (a * a) + ' = ' + a + T(', et (−') + a + ')² = ' + (a * a) + T(' aussi.')); };
  G['2-signe-affine'] = r => { const a = E(r, 1, 6), z = S(r, -6, 6), b = -a * z;
    return Q(poly([a, b]) + T(' > 0 quand :'), 'x > ' + nb(z), [['x > ' + nb(-z), 'affine-signe'], ['x < ' + nb(z), 'affine-signe']], poly([a, b]) + T(' = 0 pour x = ') + nb(z) + T(', et a > 0.')); };
  G['2-probabilites'] = r => { const pa = E(r, 3, 6) / 10, pb = E(r, 2, 5) / 10, pi = E(r, 1, 2) / 10;
    return Q('P(A) = ' + nb(pa) + ', P(B) = ' + nb(pb) + ', P(A ∩ B) = ' + nb(pi) + '. P(A ∪ B) ?', nb(pa + pb - pi), [[nb(pa + pb), 'union-intersection'], [nb(pa + pb + pi), 'union-intersection']], nb(pa) + ' + ' + nb(pb) + ' − ' + nb(pi) + '.'); };
  // 1re
  G['1-second-degre'] = r => { const x1 = S(r, -6, 6), x2 = S(r, -6, 6), a = C(r, [1, 1, 2, -1]), b = -a * (x1 + x2), c = a * x1 * x2, D = b * b - 4 * a * c, [p, q] = [Math.min(x1, x2), Math.max(x1, x2)];
    return C(r, [() => Q(T('Discriminant de ') + poly([a, b, c]) + ' ?', 'Δ = ' + nb(D), [['Δ = ' + nb(b * b + 4 * a * c), 'delta-signe'], ['Δ = ' + nb(b - 4 * a * c), 'delta-signe']], nb(b) + '² − 4 × ' + par(a) + ' × ' + par(c) + '.'),
      () => Q(T('Racines de ') + poly([a, b, c]) + ' ?', p === q ? 'x = ' + nb(p) + T(' (double)') : 'x = ' + nb(p) + T(' ou x = ') + nb(q), [[p === q ? 'x = ' + nb(-p) + T(' (double)') : 'x = ' + nb(-q) + T(' ou x = ') + nb(-p), 'racines-signes'], [T('pas de racine'), 'delta-signe']], 'Δ = ' + nb(D) + T(', puis x = (−b ± √Δ)/(2a).'))])(); };
  G['1-derivees'] = r => { const a = S(r, -4, 4), b = S(r, -6, 6), c = S(r, -9, 9), d = S(r, -9, 9), k = S(r, -3, 3);
    return C(r, [() => Q(T('Dérivée de f(x) = ') + poly([a, b, c, d]) + ' ?', 'f′(x) = ' + poly([3 * a, 2 * b, c]), [['f′(x) = ' + poly([3 * a, 2 * b, c + d]), 'derivee-constante'], ['f′(x) = ' + poly([a, b, c]), 'derivee-exposant']], T('(xⁿ)′ = n xⁿ⁻¹ et la constante disparaît.')),
      () => Q('f(x) = ' + poly([a, b, c]) + T('. Nombre dérivé f′(') + nb(k) + ') ?', nb(2 * a * k + b), [[nb(a * k * k + b * k + c), 'derivee-exposant'], [nb(2 * a * k + b + c), 'derivee-constante']], 'f′(x) = ' + poly([2 * a, b]) + '.')])(); };
  G['1-suites'] = r => { const u0 = S(r, -5, 9), q = C(r, [2, 3, -2]), rr = S(r, -5, 7), n = E(r, 3, 6);
    return C(r, [() => Q(T('Suite arithmétique : u₀ = ') + nb(u0) + T(', raison ') + nb(rr) + '. u' + '₀₁₂₃₄₅₆₇₈₉'[n] + ' ?', nb(u0 + n * rr), [[nb(u0 + (n + 1) * rr), 'suite-decalage'], [nb(u0 * rr ** n), 'arith-geo']], 'uₙ = u₀ + n × r.'),
      () => Q(T('Suite géométrique : u₀ = ') + nb(u0) + Tk(', raison (géo) ', ', raison ') + nb(q) + '. u' + '₀₁₂₃₄₅₆₇₈₉'[n] + ' ?', nb(u0 * q ** n), [[nb(u0 + n * q), 'arith-geo'], [nb(u0 * q ** (n - 1)), 'suite-decalage']], 'uₙ = u₀ × qⁿ.'),
      () => Q(T('Calcule 1 + 2 + 3 + … + ') + (10 * n) + '.', nb(10 * n * (10 * n + 1) / 2), [[nb((10 * n) ** 2 / 2), 'somme-gauss'], [nb(10 * n * (10 * n - 1) / 2), 'somme-gauss']], T('n(n + 1)/2 avec n = ') + (10 * n) + '.')])(); };
  G['1-produit-scalaire'] = r => { const a = S(r, -6, 6), b = S(r, -6, 6), c = S(r, -6, 6), d = S(r, -6, 6);
    return Q('u→(' + nb(a) + ' ; ' + nb(b) + ') · v→(' + nb(c) + ' ; ' + nb(d) + ') = ?', nb(a * c + b * d), [['(' + nb(a * c) + ' ; ' + nb(b * d) + ')', 'scalaire-vecteur'], [nb(a * b + c * d), 'scalaire-melange']], 'xx′ + yy′.'); };
  G['1-probas-conditionnelles'] = r => { const pa = E(r, 2, 8) / 10, pb = E(r, 1, 9) / 10;
    return Q('P(A) = ' + nb(pa) + T(' et P_A(B) = ') + nb(pb) + '. P(A ∩ B) ?', nb(pa * pb), [[nb(pa + pb), 'proba-cond'], [nb(pb / pa, 3), 'proba-cond']], nb(pa) + ' × ' + nb(pb) + '.'); };
  G['1-exponentielle'] = r => { const a = E(r, 2, 6), b = E(r, 2, 6);
    return C(r, [() => Q(T('Simplifie : e') + exp(a) + ' × e' + exp(b), 'e' + exp(a + b), [['e' + exp(a * b), 'exp-produit'], ['e' + exp(a + b) + ' × 2', 'exp-produit']], 'eᵃ × eᵇ = eᵃ⁺ᵇ.'),
      () => Q(T('Simplifie : (e') + exp(a) + ')' + exp(b), 'e' + exp(a * b), [['e' + exp(a + b + (a === 2 && b === 2 ? 1 : 0)), 'exp-produit'], ['e' + exp(a ** b), 'exp-produit']], '(eᵃ)ᵇ = eᵃᵇ.')])(); };
  G['1-automatismes'] = r => C(r, [G['3-evolutions'], G['4-fractions-produit'], G['4-puissances'], G['5-litteral-valeur'], G['6-pourcentages'], G['4-equations']])(r);
  // Terminale
  G['T-limites'] = r => { const a = S(r, -6, 6), b = E(r, 1, 6), c = S(r, -9, 9), d = S(r, -9, 9);
    return Q(T('Limite en +∞ de (') + poly([a, c, 1]) + ')/(' + poly([b, d, 2]) + ') ?', fr(a, b), [['1', 'limite-un'], [a * b > 0 ? '+∞' : MOINS + '∞', 'limite-degre'], ['0', 'limite-degre']], T('Termes dominants : ') + nb(a) + 'x²/' + b + 'x².'); };
  G['T-logarithme'] = r => { const a = E(r, 2, 9), b = E(r, 2, 9), k = E(r, 2, 9);
    return C(r, [() => Q('ln(' + a + ') + ln(' + b + ') = ?', 'ln(' + (a * b) + ')', [['ln(' + (a + b) + ')', 'ln-somme'], ['ln(' + a + ') × ln(' + b + ')', 'ln-somme']], 'ln(a) + ln(b) = ln(ab).'),
      () => Q('ln(e' + exp(k) + ') = ?', nb(k), [['e' + exp(k), 'exp-produit'], ['1', 'exp-produit']], T('ln et exp se « détruisent » : ln(eᵏ) = k.'))])(); };
  G['T-derivees'] = r => { const a = E(r, 2, 5), b = S(r, -5, 5), n = E(r, 2, 5);
    return C(r, [() => Q(T('Dérivée de f(x) = (') + poly([a, b]) + ')' + exp(n) + ' ?', 'f′(x) = ' + nb(n * a) + '(' + poly([a, b]) + ')' + exp(n - 1), [['f′(x) = ' + nb(n) + '(' + poly([a, b]) + ')' + exp(n - 1), 'composee-a'], ['f′(x) = ' + nb(n * a) + '(' + poly([a, b]) + ')' + exp(n), 'derivee-exposant']], T('n × u′ × uⁿ⁻¹ avec u′ = ') + a + '.'),
      () => Q(T('Dérivée de f(x) = e') + exp(a) + 'ˣ ?', 'f′(x) = ' + a + 'e' + exp(a) + 'ˣ', [['f′(x) = e' + exp(a) + 'ˣ', 'composee-a'], ['f′(x) = ' + a + 'xe' + exp(a - 1) + 'ˣ', 'derivee-exposant']], '(eᵘ)′ = u′eᵘ.')])(); };
  G['T-primitives'] = r => { const n = E(r, 1, 4), a = (n + 1) * E(r, 1, 4);
    return Q(T('Une primitive de f(x) = ') + poly([a].concat(Array(n).fill(0))) + ' ?', 'F(x) = ' + poly([a / (n + 1)].concat(Array(n + 1).fill(0))), [['F(x) = ' + poly([a * n].concat(Array(n - 1).fill(0))), 'primitive-derivee'], ['F(x) = ' + poly([a].concat(Array(n + 1).fill(0))), 'primitive-derivee']], T('Primitive de xⁿ : xⁿ⁺¹/(n + 1).')); };
  G['T-integrales'] = r => { const a = 2 * E(r, 1, 4), b = E(r, 0, 6), k = E(r, 1, 4);
    return Q(T('Calcule ∫ de 0 à ') + k + T(' de (') + poly([a, b]) + ') dx.', nb(a * k * k / 2 + b * k), [[nb(a * k + b), 'integrale-valeur'], [nb(a * k * k + b * k), 'primitive-derivee']], 'F(x) = ' + poly([a / 2, b, 0]) + T(', puis F(') + k + ') − F(0).'); };
  G['T-binomiale'] = r => { const n = E(r, 3, 6), p = C(r, [0.2, 0.5, 0.4]), k = E(r, 1, n - 1);
    return C(r, [() => Q(T('X suit la loi binomiale B(') + n + ' ; ' + nb(p) + '). P(X = ' + k + T(') arrondie au millième ?'), nb(comb(n, k) * p ** k * (1 - p) ** (n - k), 3), [[nb(p ** k * (1 - p) ** (n - k), 3), 'binomiale-coef'], [nb(comb(n, k) * p ** k, 3), 'binomiale-coef']], '(' + n + T(' parmi ') + k + ') × ' + nb(p) + exp(k) + ' × ' + nb(1 - p) + exp(n - k) + '.'),
      () => Q(T('X suit B(') + (10 * n) + ' ; ' + nb(p) + T('). Espérance E(X) ?'), nb(10 * n * p), [[nb(10 * n + p), 'esperance'], [nb(p / (10 * n), 4), 'esperance']], 'E(X) = n × p.')])(); };
  G['T-denombrement'] = r => { const n = E(r, 5, 9), k = E(r, 2, 3);
    return Q(T('Nombre de façons de choisir ') + k + T(' élèves parmi ') + n + T(' (sans ordre) ?'), nb(comb(n, k)), [[nb(fact(n) / fact(n - k)), 'combi-arrangement'], [nb(n * k), 'combi-arrangement']], n + '! / (' + k + '! × ' + (n - k) + '!).'); };
  G['T-suites-limites'] = r => { const q = C(r, [0.5, 0.8, 0.9, 1.5, 2, 3]);
    return Q(T('Limite de ') + nb(q) + exp(2).replace('²', 'ⁿ') + T(' quand n → +∞ ?'), q < 1 ? '0' : '+∞', [['1', 'limite-geo'], [q < 1 ? '+∞' : '0', 'limite-geo']], q < 1 ? '0 < q < 1 : qⁿ → 0.' : 'q > 1 : qⁿ → +∞.'); };
  G['T-espace'] = r => { const u = [S(r, -5, 5), S(r, -5, 5), S(r, -5, 5)], v = [S(r, -5, 5), S(r, -5, 5), S(r, -5, 5)], ps = u[0] * v[0] + u[1] * v[1] + u[2] * v[2];
    return Q('u→(' + u.map(nb).join(' ; ') + ') · v→(' + v.map(nb).join(' ; ') + ') = ?', nb(ps), [['(' + u.map((x, i) => nb(x * v[i])).join(' ; ') + ')', 'scalaire-vecteur'], [nb(ps - u[2] * v[2]), 'scalaire-melange']], 'xx′ + yy′ + zz′.'); };

  // ── Carte des programmes (rentrée 2026) : intitulés officiels, générateurs associés ──
  // Remplaçable par la version validée de la veille (serveur). Un chapitre sans générateur s'affiche « bientôt ».
  const PROGRAMME = {
    annee:'2026-2027',
    niveaux:{
      '6e':{ nom:'Sixième', note:'Programme de 6e en vigueur depuis la rentrée 2025 (cycle 3).', chapitres:[
        ['6-decimaux', 'Nombres', 'Comparer et ranger des nombres décimaux'], ['6-arrondi', 'Nombres', 'Valeur arrondie'], ['6-mixtes', 'Fractions', 'Nombres mixtes et fractions'],
        ['6-divisibilite', 'Nombres', 'Critères de divisibilité par 2, 3, 5, 9, 10'], ['6-priorites', 'Calcul', 'Priorités opératoires'], ['6-fraction-de', 'Fractions', 'Prendre une fraction d’une quantité'],
        ['6-fractions-multiples', 'Fractions', 'Additionner des fractions (dénominateurs multiples)'], ['6-fractions-somme', 'Fractions', 'Additionner des fractions (dénominateurs quelconques)'],
        ['6-trou', 'Algèbre', 'Égalités à trou'], ['6-programme', 'Algèbre', 'Programmes de calcul'], ['6-proportionnalite', 'Proportionnalité', 'Résoudre des problèmes de proportionnalité'],
        ['6-pourcentages', 'Proportionnalité', 'Pourcentages simples'], ['6-conversions', 'Grandeurs', 'Longueurs, masses, contenances'], ['6-aire', 'Grandeurs', 'Aire et périmètre'],
        ['6-aire-conversion', 'Grandeurs', 'Unités d’aire (m², dm², cm²)'], ['6-volume-cubes', 'Grandeurs', 'Volumes en cm³ (empilements de cubes)'], ['6-durees', 'Grandeurs', 'Durées et horaires'],
        ['6-angles', 'Géométrie', 'Angles complémentaires, supplémentaires ; triangle'], ['6-probabilites', 'Probabilités', 'Probabilités simples']] },
      '5e':{ nom:'Cinquième', note:'Nouveau programme de cycle 4, en 5e à la rentrée 2026.', chapitres:[
        ['5-relatifs-somme', 'Nombres', 'Nombres relatifs : addition'], ['5-relatifs-difference', 'Nombres', 'Nombres relatifs : soustraction'], ['5-simplifier', 'Fractions', 'Simplifier une fraction'],
        ['5-litteral-valeur', 'Algèbre', 'Calculer une expression littérale'], ['5-reduire', 'Algèbre', 'Réduire une expression'], ['5-moyenne', 'Données', 'Moyenne'],
        ['5-aire-triangle', 'Grandeurs', 'Aire du triangle'], ['5-echelle', 'Proportionnalité', 'Échelles'], ['5-remise', 'Proportionnalité', 'Appliquer un pourcentage'], ['5-proba-contraire', 'Probabilités', 'Événement contraire']] },
      '4e':{ nom:'Quatrième', note:'Programme de cycle 4 en vigueur ; le nouveau arrive en 4e à la rentrée 2027.', chapitres:[
        ['4-relatifs-produit', 'Nombres', 'Multiplier des relatifs'], ['4-fractions-produit', 'Fractions', 'Multiplier des fractions'], ['4-fractions-quotient', 'Fractions', 'Diviser par une fraction'],
        ['4-puissances', 'Nombres', 'Puissances'], ['4-notation-scientifique', 'Nombres', 'Notation scientifique'], ['4-pythagore', 'Géométrie', 'Théorème de Pythagore'],
        ['4-equations', 'Algèbre', 'Équations du premier degré'], ['4-developper', 'Algèbre', 'Développer (simple distributivité)'], ['4-double-distributivite', 'Algèbre', 'Double distributivité'], ['4-vitesse', 'Grandeurs', 'Vitesse']] },
      '3e':{ nom:'Troisième', note:'Brevet 2027 : les sujets portent sur le programme de 3e.', examen:'brevet', chapitres:[
        ['3-identites', 'Algèbre', 'Identités remarquables'], ['3-factoriser', 'Algèbre', 'Factoriser'], ['3-produit-nul', 'Algèbre', 'Équations produit nul'], ['3-fonctions', 'Fonctions', 'Fonctions linéaires et affines'],
        ['3-thales', 'Géométrie', 'Théorème de Thalès'], ['3-trigonometrie', 'Géométrie', 'Trigonométrie'], ['3-arithmetique', 'Nombres', 'Arithmétique (PGCD)'], ['3-evolutions', 'Proportionnalité', 'Évolutions en pourcentage'],
        ['3-statistiques', 'Données', 'Médiane'], ['3-probabilites', 'Probabilités', 'Deux épreuves'], ['3-volumes', 'Grandeurs', 'Volumes']] },
      '2nde':{ nom:'Seconde', note:'Nouveaux programmes de lycée en seconde à la rentrée 2026.', chapitres:[
        ['2-intervalles', 'Nombres', 'Intervalles et inégalités'], ['2-vecteurs', 'Géométrie', 'Vecteurs et repérage'], ['2-droites', 'Géométrie', 'Équations de droites'],
        ['2-carres', 'Fonctions', 'Fonction carré'], ['2-signe-affine', 'Fonctions', 'Signe d’une fonction affine'], ['2-taux-reciproque', 'Proportionnalité', 'Évolutions successives et réciproques'], ['2-probabilites', 'Probabilités', 'Réunion et intersection']] },
      '1re':{ nom:'Première', note:'Épreuve anticipée de mathématiques en fin de 1re (2 h, sans calculatrice, coef. 2).', examen:'anticipee', chapitres:[
        ['1-automatismes', 'Automatismes', 'Automatismes de l’épreuve anticipée'], ['1-second-degre', 'Algèbre', 'Second degré'], ['1-derivees', 'Analyse', 'Dérivation'], ['1-suites', 'Suites', 'Suites arithmétiques et géométriques'],
        ['1-exponentielle', 'Analyse', 'Fonction exponentielle'], ['1-produit-scalaire', 'Géométrie', 'Produit scalaire'], ['1-probas-conditionnelles', 'Probabilités', 'Probabilités conditionnelles']] },
      'Tle':{ nom:'Terminale', note:'Spécialité mathématiques ; aménagements prévus à la rentrée 2027.', examen:'bac', chapitres:[
        ['T-limites', 'Analyse', 'Limites de fonctions'], ['T-suites-limites', 'Suites', 'Limites de suites'], ['T-derivees', 'Analyse', 'Dérivation des fonctions composées'], ['T-logarithme', 'Analyse', 'Logarithme népérien'],
        ['T-primitives', 'Analyse', 'Primitives'], ['T-integrales', 'Analyse', 'Calcul intégral'], ['T-denombrement', 'Combinatoire', 'Dénombrement'], ['T-binomiale', 'Probabilités', 'Loi binomiale'], ['T-espace', 'Géométrie', 'Géométrie dans l’espace']] }
    }
  };
  const NIVEAUX = Object.keys(PROGRAMME.niveaux);
  const EXAMENS = { brevet:{ titre:'Brevet blanc', n:12 }, anticipee:{ titre:'Épreuve anticipée blanche', n:12 }, bac:{ titre:'Bac blanc', n:12 } };

  // Une carte validée par la veille (serveur) remplace les intitulés ; on garde seulement des chapitres bien formés.
  let carte = PROGRAMME;
  function adopterCarte(c){
    try{
      if(!c || typeof c !== 'object' || !c.niveaux) return false;
      const n = { annee:String(c.annee || PROGRAMME.annee).slice(0, 12), niveaux:{} };
      for(const k of NIVEAUX){ const v = c.niveaux[k] || PROGRAMME.niveaux[k];
        n.niveaux[k] = { nom:PROGRAMME.niveaux[k].nom, note:String(v.note || '').slice(0, 200), examen:PROGRAMME.niveaux[k].examen,
          chapitres:(Array.isArray(v.chapitres) ? v.chapitres : []).filter(x => Array.isArray(x) && x.length >= 3 && typeof x[0] === 'string' && /^[0-9A-Za-z-]{1,40}$/.test(x[0])).slice(0, 60).map(x => [x[0], String(x[1]).slice(0, 40), String(x[2]).slice(0, 120)]) };
        if(!n.niveaux[k].chapitres.length) n.niveaux[k] = PROGRAMME.niveaux[k]; }
      carte = n; return true;
    }catch(e){ return false; }
  }

  // Une question prête à afficher : options (bonne + erreurs typiques), vanne de Prof Pi par mauvaise réponse.
  function question(id, r, ton){
    const g = G[id]; if(!g) return null;
    const q = g(r), v = Object.assign({ j:fin(q.bon) }, q.valeurs || {});
    return { id, chap:id, enonce:fin(q.enonce), bon:fin(q.bon), regle:fin(q.expl), lang:LANGUE(),
      faux:q.faux.map(f => { const vals = Object.assign({ f:fin(f.v) }, v); f = Object.assign({}, f, { v:fin(f.v) });
        // fraiche(memoire) : la vanne est choisie au moment où elle s'affiche, parmi celles pas encore dites.
        return { en:f.v, cle:f.cle, explication:expl(f.cle, ton), vanne:vanne(f.cle, ton, vals, r) + expl(f.cle, ton), fraiche:memoire => vanne(f.cle, ton, vals, null, memoire) + expl(f.cle, ton) }; }) };
  }
  const chapitresDe = niv => (carte.niveaux[niv] || { chapitres:[] }).chapitres;
  const disponible = id => !!G[id];
  // Série de n questions d'un chapitre (ou de tout un niveau si id est un niveau), même graine = mêmes questions.
  // v6.65 : cible peut aussi être une liste de chapitres (contrôles du trimestre) : on mélange comme pour un niveau.
  function serie(cible, n, graine, ton){
    const liste = Array.isArray(cible), mix = liste || NIVEAUX.includes(cible);
    const r = hasard(graine), ids = liste ? cible.filter(disponible) : NIVEAUX.includes(cible) ? chapitresDe(cible).map(c => c[0]).filter(disponible) : [cible];
    const out = [], vus = new Set();
    for(let i = 0; out.length < n && i < n * 30 && ids.length; i++){ const id = ids[mix ? (out.length + Math.floor(r() * ids.length)) % ids.length : 0]; const q = question(id, r, ton);
      if(q && !vus.has(q.enonce)){ vus.add(q.enonce); out.push(q); } }
    return out;
  }
  // Format des battles (salon, défi entre potes, tournoi).
  const questionsSalon = (graine, n, niv) => serie(NIVEAUX.includes(niv) ? niv : '6e', n, graine, 'taquin').map(q => ({ id:'m:' + q.id, consigne:'🔢 Maths ' + niv, enonce:q.enonce, bon:q.bon, faux:q.faux.slice(0, 3), regle:q.regle, lang:q.lang }));
  // v6.5 : noms traduits (niveaux, domaines, chapitres, examens) pour l'interface anglaise.
  const tr = {
    langue:LANGUE,
    niveau:(n, champ) => { const d = D(), x = d && d.niveaux[n]; const o = carte.niveaux[n] || {}; return x ? (champ === 'note' ? x[1] : x[0]) : (champ === 'note' ? o.note : o.nom); },
    domaine:x => (D() && D().domaines[x]) || x,
    chap:c => (D() && D().chapitres[c[0]]) || c[2],
    examen:k => (D() && D().examens[k]) || (EXAMENS[k] || {}).titre || k
  };

  // v6.23 : extensions du programme 2026 (js/maths-2026-*.js). Chaque fichier apporte ses chapitres, générateurs,
  // erreurs classiques et traductions (en, es, de, it, pt) ; rien n'est remplacé, tout s'ajoute.
  const LANGS = ['fr', 'en', 'es', 'de', 'it', 'pt'];
  function ajouter(x){
    const L = window.MATHS_LANGUES || {};
    for(const [niv, liste] of Object.entries(x.chapitres || {})){ const n = PROGRAMME.niveaux[niv]; if(!n) continue;
      for(const c of liste){ if(n.chapitres.some(y => y[0] === c[0])) continue; n.chapitres.push([c[0], c[1], c[2]]);
        LANGS.slice(1).forEach((l, i) => { if(L[l] && c[3 + i]) L[l].chapitres[c[0]] = c[3 + i]; }); } }
    Object.assign(G, x.G || {});
    for(const [cle, v] of Object.entries(x.erreurs || {})){ const f = v.fr; ERREURS[cle] = { e:f[0], t:[].concat(f[1]), s:[].concat(f[2]) };
      for(const l of LANGS.slice(1)) if(L[l] && v[l]) L[l].erreurs[cle] = { e:v[l][0], t:[].concat(v[l][1]), s:[].concat(v[l][2]) }; }
    for(const [d, v] of Object.entries(x.domaines || {})) LANGS.slice(1).forEach((l, i) => { if(L[l] && v[i]) L[l].domaines[d] = v[i]; });
  }
  // Texte multilingue : table { cle:[fr, en, es, de, it, pt] }, {a} remplacé par la valeur.
  const tx = table => (cle, v) => { const t = table[cle]; if(!t) return cle; const i = LANGS.indexOf(LANGUE()); let s = (t[i] != null ? t[i] : t[0]);
    return v ? s.replace(/\{(\w+)\}/g, (m, k) => v[k] != null ? v[k] : m) : s; };
  const outils = { Q, E, C, S, pgcd, ppcm, fr, frb, nb, poly, LANGUE, MOINS };

  window.MATHS = { ajouter, tx, outils, tr, NIVEAUX, PROGRAMME, EXAMENS, ERREURS, G, hasard, nb, fr, poly, question, serie, questionsSalon, vanne, disponible, chapitresDe, adopterCarte, get carte(){ return carte; } };
})();
