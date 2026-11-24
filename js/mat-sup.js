// v5.82 : « Après le bac » — médecine, droit, astrophysique (niveau « Sup »).
// Pour découvrir ces études et s'entraîner sur leurs bases. Calculs d'astrophysique générés et vérifiés ; vannes sur la réponse.
(function(){
  'use strict';
  const M = window.MATIERES; if(!M) return;
  if(!M.NIVEAUX.includes('Sup')) M.NIVEAUX.push('Sup');
  const un = (r, l) => l[Math.floor(r() * l.length)];
  const nb = (x, d = 2) => String(Math.round(x * 10 ** d) / 10 ** d).replace('.', ',');
  const G = (enonce, bon, faux, regle) => ({ enonce, bon:String(bon), faux:faux.filter(f => String(f[0]) !== String(bon)).map(([en, vanne]) => ({ en:String(en), vanne })), regle });

  // ═══════════════ MÉDECINE ═══════════════
  const ANATOMIE = [
    ['Combien de cavités compte le cœur humain ?', '4', [['2', 'Deux oreillettes ET deux ventricules : recompte !'], ['6', 'Le cœur n’a pas d’annexe secrète.']], 'Deux oreillettes, deux ventricules.'],
    ['Quel ventricule envoie le sang oxygéné vers tout le corps ?', 'Le ventricule gauche', [['Le ventricule droit', 'Le ventricule droit, lui, travaille pour les poumons.'], ['L’oreillette droite', 'Une oreillette reçoit ; ce sont les ventricules qui propulsent vers les artères.']], 'Ventricule gauche → aorte.'],
    ['Combien d’os compte le squelette d’un adulte ?', '206', [['300', 'Le bébé en a plus, mais certains fusionnent en grandissant.'], ['106', 'Il en manque cent. Plumo cherche partout.']], 'Environ 206 os chez l’adulte.'],
    ['Quel est l’os le plus long du corps ?', 'Le fémur', [['L’humérus', 'C’est le plus long du bras, pas du corps.'], ['Le tibia', 'Grand, mais moins que le fémur.']], 'Os de la cuisse.'],
    ['Où ont lieu les échanges gazeux dans les poumons ?', 'Dans les alvéoles pulmonaires', [['Dans la trachée', 'La trachée conduit l’air, elle n’échange pas.'], ['Dans l’estomac', 'Non !']], 'Paroi très fine, grande surface.'],
    ['Quelle est l’unité de filtration du rein ?', 'Le néphron', [['Le neurone', 'Ça, c’est le système nerveux.'], ['L’alvéole', 'Ça, c’est le poumon.']], 'Environ un million de néphrons par rein.']
  ];
  const PHYSIO = [
    ['Quelle hormone fait baisser la glycémie ?', 'L’insuline', [['Le glucagon', 'Le glucagon la fait monter.'], ['L’adrénaline', 'Elle la fait plutôt monter.']], 'Sécrétée par le pancréas.'],
    ['Un antibiotique est efficace contre :', 'Certaines bactéries', [['Les virus', 'Les antibiotiques ne marchent pas sur les virus, comme celui de la grippe.'], ['Tous les microbes', 'Non : seulement des bactéries, et pas toutes.']], 'D’où l’importance du bon usage.'],
    ['Un essai clinique en « double aveugle » signifie :', 'Ni le patient ni le médecin ne savent qui reçoit le traitement', [['Le patient a les yeux bandés', 'Non, c’est une image.'], ['Personne ne prend de traitement', 'Cette réponse est partie faire un tour et elle a oublié de revenir.']], 'Pour éviter les biais.'],
    ['L’effet placebo, c’est :', 'Une amélioration liée au fait de croire recevoir un traitement', [['Un effet toxique', 'Plumo a vérifié trois fois : c’est toujours non. Mais c’était audacieux.'], ['Un vaccin', 'Celle-là, même un GPS en panne ne l’aurait pas choisie.']], 'D’où les groupes témoins.'],
    ['L’incidence d’une maladie mesure :', 'Le nombre de nouveaux cas sur une période', [['Le nombre total de malades', 'Ça, c’est la prévalence.'], ['Le nombre de médecins', 'Bien tenté ! Plumo donne 10 pour le courage et 0 pour le résultat.']], 'Épidémiologie.']
  ];
  const ETUDES_SANTE = [
    ['Après le bac, on entre en études de santé principalement par :', 'Le PASS ou une licence avec option santé (L.AS)', [['Un concours à 30 ans uniquement', 'Cette réponse a pris le mauvais train. Direction : nulle part, terminus : raté.'], ['Le permis de conduire', 'Plumo a failli tomber de sa branche. Il s’est rattrapé de justesse.']], 'Parcours d’accès spécifique santé, licence accès santé.'],
    ['Les filières « MMOPK » sont :', 'Médecine, maïeutique, odontologie, pharmacie, kinésithérapie', [['Maths, musique, optique, physique, karaté', 'Bel effort d’imagination.'], ['Uniquement médecine', 'Réponse originale, ça oui. Juste, pas du tout.']], 'Maïeutique = sage-femme.'],
    ['Combien d’années dure au minimum la formation d’un médecin généraliste ?', '10 ans environ', [['3 ans', 'Bien plus long !'], ['20 ans', 'Long, mais pas à ce point.']], 'Premier, deuxième et troisième cycles.']
  ];
  const genDebit = r => { const fc = un(r, [60, 70, 80]), ves = un(r, [60, 70, 80]), d = fc * ves / 1000;
    return G('Fréquence cardiaque ' + fc + ' battements/min, volume d’éjection systolique ' + ves + ' mL. Débit cardiaque ?', nb(d, 1) + ' L/min', [[nb(fc + ves) + ' L/min', 'Débit = FC × VES : on multiplie.'], [nb(fc * ves) + ' L/min', 'Ce sont des mL : divise par 1 000 pour des litres.']], 'Débit = fréquence × volume d’éjection.'); };

  // ═══════════════ DROIT ═══════════════
  const INSTITUTIONS = [
    ['La Constitution actuelle de la France date de :', '1958', [['1789', '1789, c’est la Déclaration des droits de l’homme.'], ['1946', '1946, c’est la IVe République.']], 'Ve République.'],
    ['Le Parlement français est composé :', 'De l’Assemblée nationale et du Sénat', [['Du Président et des ministres', 'Ça, c’est l’exécutif.'], ['Des juges', 'Non : ils forment l’autorité judiciaire.']], 'Pouvoir législatif.'],
    ['Combien de membres nommés siègent au Conseil constitutionnel ?', '9', [['12', 'Cette réponse sort tout droit d’un rêve bizarre. Réveille-toi, Plumo t’attend.'], ['577', '577, ce sont les députés.']], 'Renouvelés par tiers tous les trois ans.'],
    ['La plus haute juridiction de l’ordre judiciaire est :', 'La Cour de cassation', [['Le Conseil d’État', 'Il est au sommet de l’ordre ADMINISTRATIF.'], ['Le tribunal de commerce', 'Raté ! Mais Plumo garde cette réponse pour son bêtisier préféré.']], 'Elle juge le droit, pas les faits.'],
    ['La hiérarchie des normes place au sommet :', 'La Constitution (et le bloc de constitutionnalité)', [['Les arrêtés municipaux', 'Ils sont tout en bas.'], ['Les contrats', 'Là, la réponse a confondu la carte et le territoire. Et la carte était à l’envers.']], 'Pyramide des normes.']
  ];
  const DROIT_BASES = [
    ['Le Code civil a été promulgué en :', '1804', [['1958', 'Plumo a sorti sa loupe : aucune trace de bonne réponse ici.'], ['1789', 'Cette réponse a de l’imagination. Beaucoup trop, même.']], 'Code Napoléon.'],
    ['La présomption d’innocence signifie :', 'Toute personne est innocente tant que sa culpabilité n’est pas établie', [['On est coupable tant qu’on n’a pas prouvé son innocence', 'C’est l’inverse.'], ['Les mineurs ne sont jamais jugés', 'Pas loin… enfin si, très loin. À peu près à l’autre bout du pays.']], 'Article 9 de la DDHC.'],
    ['Les infractions pénales sont classées en :', 'Contraventions, délits et crimes', [['Petites, moyennes et grandes', 'Le droit a des noms plus précis.'], ['Civiles et commerciales', 'Plumo applaudit l’effort, puis il pose ses ailes sur sa tête.']], 'Selon leur gravité.'],
    ['« Pas de crime, pas de peine sans loi », c’est :', 'Le principe de légalité', [['Le principe de précaution', 'Non : il concerne les risques.'], ['La prescription', 'Cette réponse mériterait un prix. Le prix de la plus belle sortie de route.']], 'Nullum crimen, nulla poena sine lege.'],
    ['Pour devenir avocat, il faut notamment obtenir :', 'Le CAPA, après l’examen d’entrée au CRFPA', [['Le permis bateau', 'Cette réponse est partie faire un tour et elle a oublié de revenir.'], ['Le bac seulement', 'Il faut de longues études après.']], 'Après un master en droit en général.'],
    ['Les magistrats sont formés à :', 'L’École nationale de la magistrature (ENM)', [['L’École de l’air', 'Plumo a vérifié trois fois : c’est toujours non. Mais c’était audacieux.'], ['Polytechnique', 'Celle-là, même un GPS en panne ne l’aurait pas choisie.']], 'À Bordeaux.']
  ];

  // ═══════════════ ASTROPHYSIQUE ═══════════════
  const ASTRO = [
    ['Quelle réaction fait briller le Soleil ?', 'La fusion de l’hydrogène en hélium', [['La combustion du charbon', 'Le Soleil n’est pas un barbecue géant.'], ['La fission de l’uranium', 'La fission, c’est dans les centrales nucléaires.']], 'Fusion nucléaire au cœur de l’étoile.'],
    ['L’âge estimé de l’Univers est d’environ :', '13,8 milliards d’années', [['4,6 milliards d’années', 'Ça, c’est l’âge du système solaire.'], ['6 000 ans', 'Bien tenté ! Plumo donne 10 pour le courage et 0 pour le résultat.']], 'D’après le fond diffus cosmologique.'],
    ['Une étoile comme le Soleil finira en :', 'Naine blanche', [['Trou noir', 'Il faut une étoile bien plus massive.'], ['Étoile à neutrons', 'Il faut aussi plus de masse.']], 'Après une phase de géante rouge.'],
    ['La première exoplanète autour d’une étoile semblable au Soleil a été découverte en :', '1995', [['1969', '1969, c’est le premier pas sur la Lune.'], ['2020', 'Bien plus tôt !']], '51 Pegasi b, par Michel Mayor et Didier Queloz.'],
    ['Le fond diffus cosmologique a une température d’environ :', '2,7 K', [['273 K', '273 K, c’est 0 °C.'], ['5 800 K', 'Ça, c’est la surface du Soleil.']], 'Lumière la plus ancienne de l’Univers.'],
    ['Notre galaxie s’appelle :', 'La Voie lactée', [['Andromède', 'Andromède est notre grande voisine.'], ['La Grande Ourse', 'C’est une constellation.']], 'Galaxie spirale.'],
    ['Pour devenir astrophysicien, il faut en général :', 'Un doctorat (bac + 8) en astrophysique', [['Un CAP', 'Cette réponse a pris le mauvais train. Direction : nulle part, terminus : raté.'], ['Un télescope et c’est tout', 'Il faut aussi beaucoup de maths et de physique.']], 'Master puis thèse.']
  ];
  const ASTRO_GEN = [
    r => { const [nom, d] = un(r, [['la Lune', 384000], ['le Soleil', 150e6], ['Mars (au plus près)', 54.6e6]]), t = d / 300000;
      return G('La lumière va à 300 000 km/s. Combien de temps met-elle pour venir de ' + nom + ' (' + nb(d / 1e6, 3) + ' millions de km) ?', t < 60 ? nb(t, 2) + ' s' : nb(t / 60, 1) + ' min', [[t < 60 ? nb(t * 60, 0) + ' s' : nb(t, 0) + ' min', 'Problème de conversion : les secondes et les minutes se sont mélangées.'], [t < 60 ? nb(t / 60, 3) + ' s' : nb(t / 3600, 2) + ' min', 'Une division de trop.']], 'Durée = distance ÷ vitesse.'); },
    r => { const al = un(r, [4.2, 8.6, 25]), km = al * 9.46e12;
      const e = Math.floor(Math.log10(km)), m = km / 10 ** e;
      return G('Une année-lumière vaut environ 9,46 × 10^12 km. Combien de km pour ' + nb(al, 1) + ' années-lumière ?', nb(m, 2) + ' × 10^' + e + ' km', [[nb(al * 9.46, 2) + ' km', 'Et la puissance de 10 ? L’étoile serait dans ton jardin.'], [nb(m, 2) + ' × 10^' + (e + 1) + ' km', 'Une puissance de 10 en trop : l’étoile s’éloigne toute seule.']], 'd = ' + nb(al, 1) + ' × 9,46 × 10^12 km.'); },
    r => { const lam = un(r, [290, 500, 725, 966]), T = 2.898e-3 / (lam * 1e-9);
      return G('Loi de Wien : λmax × T = 2,898 × 10^-3 m·K. Une étoile émet surtout à λmax = ' + lam + ' nm. Température de surface ?', nb(T, -2).replace(/,/, '') + ' K', [[nb(T / 1000, 1) + ' K', 'Conversion nm → m oubliée : 1 nm = 10^-9 m.'], [nb(lam * 2.898, 0) + ' K', 'Il faut DIVISER par λ.']], 'T = 2,898 × 10^-3 ÷ λmax.'); },
    r => { const a = un(r, [4, 9, 16, 25]), T = Math.pow(a, 1.5);
      return G('3e loi de Kepler (autour du Soleil) : T² = a³, avec T en années et a en unités astronomiques. Période d’une planète à a = ' + a + ' UA ?', String(T) + ' ans', [[String(a * a) + ' ans', 'T² = a³, donc T = a^(3/2), pas a².'], [String(a) + ' ans', 'Non : T dépend de a puissance 3/2.']], 'T = √(' + a + '³) = ' + T + '.'); },
    r => { const d = un(r, [10, 100, 500]), v = 70 * d;
      return G('Loi de Hubble : v = H0 × d avec H0 ≈ 70 km/s/Mpc. Vitesse d’éloignement d’une galaxie à ' + d + ' Mpc ?', v + ' km/s', [[nb(70 / d, 2) + ' km/s', 'On multiplie par la distance.'], [String(70 + d) + ' km/s', 'On multiplie, pas on additionne.']], 'v = 70 × ' + d + '.'); },
    r => { const p = un(r, [0.1, 0.2, 0.25, 0.5]), d = 1 / p;
      return G('Une étoile a une parallaxe de ' + nb(p) + ' seconde d’arc. Sa distance en parsecs ?', nb(d) + ' pc', [[nb(p) + ' pc', 'd = 1 ÷ p : plus la parallaxe est petite, plus l’étoile est loin.'], [nb(p * 10) + ' pc', 'Non : on prend l’inverse.']], 'd (pc) = 1 ÷ p (″).'); }
  ];

  M.ajouter({ id:'medecine', nom:'Médecine', ic:'🩺', examens:{}, chapitres:[
    { id:'anatomie', nom:'Anatomie', dom:'Le corps humain', niv:['Sup'], banque:ANATOMIE },
    { id:'physio', nom:'Physiologie, microbes et essais cliniques', dom:'Le corps humain', niv:['Sup'], banque:PHYSIO, gen:genDebit },
    { id:'etudes', nom:'Les études de santé', dom:'Orientation', niv:['Sup'], banque:ETUDES_SANTE }
  ] });
  M.ajouter({ id:'droit', nom:'Droit', ic:'⚖️', examens:{}, chapitres:[
    { id:'institutions', nom:'Les institutions', dom:'Droit public', niv:['Sup'], banque:INSTITUTIONS },
    { id:'bases', nom:'Les bases du droit et les métiers', dom:'Droit privé et pénal', niv:['Sup'], banque:DROIT_BASES }
  ] });
  M.ajouter({ id:'astro', nom:'Astrophysique', ic:'🔭', examens:{}, chapitres:[
    { id:'etoiles', nom:'Étoiles, galaxies et Univers', dom:'Connaissances', niv:['Sup'], banque:ASTRO },
    { id:'calculs', nom:'Calculs d’astrophysicien', dom:'Calculs', niv:['Sup'], gen:r => un(r, ASTRO_GEN)(r) },
    // v6.3 : les études pour travailler dans le spatial (NASA, ESA, CNES).
    { id:'nasa', nom:'Travailler à la NASA, à l’ESA ou au CNES', dom:'Métiers', niv:['1re', 'Tle', 'Sup'], banque:[
      ['Pour devenir astronaute de la NASA, il faut…', 'être citoyen américain', [['avoir n’importe quelle nationalité', 'Les postes d’astronaute de la NASA sont réservés aux citoyens américains (les doubles nationaux peuvent postuler).'], ['avoir moins de 25 ans', 'Il n’y a pas de limite d’âge officielle.']], 'Les Européens passent par l’ESA, l’Agence spatiale européenne.'],
      ['Quel diplôme la NASA demande-t-elle au minimum à ses astronautes ?', 'un master scientifique (STEM)', [['le brevet', 'Il faudra un peu plus d’études. 🚀'], ['le permis de conduire', 'Plumo ne l’a pas non plus.']], 'Ingénierie, sciences, informatique, maths ; ou médecine, doctorat en cours, école de pilote d’essai.'],
      ['Après ce diplôme, la NASA demande au moins…', '3 ans d’expérience professionnelle', [['3 semaines', 'Un peu plus qu’un job d’été.'], ['30 ans', 'Ce serait un départ très tardif.']], 'Les pilotes peuvent compter des heures de vol.'],
      ['Quelle agence recrute les astronautes français ?', 'l’ESA', [['la NASA', 'La NASA recrute des Américains.'], ['la SNCF', 'Pas de fusée à la SNCF.']], 'L’ESA (Agence spatiale européenne) ; le CNES est l’agence spatiale française.'],
      ['Quel astronaute français a fait deux missions sur l’ISS (2016-2017 et 2021) ?', 'Thomas Pesquet', [['Neil Armstrong', 'Un Américain, la Lune en 1969.'], ['Jules Verne', 'Il a écrit De la Terre à la Lune, sans y aller.']], 'Missions Proxima et Alpha.'],
      ['Quelles spécialités au lycée ouvrent le plus de portes vers le spatial ?', 'maths et physique-chimie', [['aucune, on postule directement', 'Il faut des études longues.'], ['seulement arts plastiques', 'Les arts, c’est génial, mais l’ingénierie demande des maths.']], 'Puis prépa ou université, école d’ingénieurs (ISAE-SUPAERO, etc.), master ou doctorat.'],
      ['La plupart des métiers du spatial sont…', 'ingénieurs, chercheurs et techniciens au sol', [['astronautes', 'Seule une poignée d’astronautes volent.'], ['vendeurs de souvenirs', 'Il y en a, mais peu.']], 'Satellites, lanceurs (Ariane), données, centres de contrôle.'],
      ['Où se trouve le port spatial européen d’où décolle Ariane ?', 'à Kourou, en Guyane', [['à Paris', 'Pas de fusée sur les Champs-Élysées.'], ['en Floride', 'C’est Cap Canaveral, aux États-Unis.']], 'Près de l’équateur : les fusées profitent de la rotation de la Terre.']] }
  ] });
  window.MATIERES._sup = { ASTRO_GEN, genDebit };
})();
