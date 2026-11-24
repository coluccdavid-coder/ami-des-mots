// Ami des mots — v6.8 : ASTROPHYSIQUE complète (licence de physique, parcours astrophysique) : du système solaire à la cosmologie.
(function(){
  'use strict';
  const M = window.MATIERES; if(!M) return;
  const m = M.trouver('astro'); if(!m) return;
  const SYSTEME = [
    ['Où se trouve la ceinture principale d’astéroïdes ?', 'entre Mars et Jupiter', [['entre la Terre et la Lune', 'Il n’y a pas de ceinture là, heureusement. 🌍'], ['au-delà de Neptune', 'Au-delà de Neptune, c’est la ceinture de Kuiper. 🧊'], ['autour du Soleil, à l’intérieur de Mercure', 'Non. ☀️']], 'Cérès, la plus grosse, est une planète naine.'],
    ['Combien vaut environ une unité astronomique (UA) ?', '150 millions de km', [['300 000 km', 'C’est la distance parcourue par la lumière en une seconde. ⚡'], ['384 000 km', 'C’est la distance Terre-Lune. 🌕'], ['1 année-lumière', 'Une année-lumière vaut environ 63 000 UA. 📏']], 'Distance moyenne Terre-Soleil.'],
    ['Quels sont les quatre satellites galiléens de Jupiter ?', 'Io, Europe, Ganymède et Callisto', [['Phobos, Deimos, Titan et Triton', 'Phobos et Deimos sont à Mars, Titan à Saturne, Triton à Neptune. 🔀'], ['la Lune, Mars, Vénus et Mercure', 'Non. 🌙'], ['Cérès, Vesta, Pallas et Junon', 'Ce sont des astéroïdes. 🪨']], 'Découverts par Galilée en 1610.'],
    ['De quoi est fait le noyau d’une comète ?', 'de glace et de poussières', [['de fer pur', 'Trop métallique. ⚙️'], ['de gaz brûlant', 'Non : la queue se forme quand la glace se sublime près du Soleil. 🔥'], ['de lave', 'Non. 🌋']], 'On l’appelle parfois « boule de neige sale ».'],
    ['Quel satellite de Saturne possède une atmosphère épaisse et des lacs de méthane ?', 'Titan', [['Europe', 'Europe tourne autour de Jupiter et cache un océan sous sa glace. 🧊'], ['la Lune', 'La Lune n’a presque pas d’atmosphère. 🌕'], ['Phobos', 'Phobos est une petite lune de Mars. 🪨']], 'La sonde Huygens s’y est posée en 2005.']
  ];
  const LUMIERE = [
    ['Que nous apprennent les raies d’absorption du spectre d’une étoile ?', 'la composition chimique de son atmosphère', [['son âge exact au jour près', 'Pas au jour près. 📅'], ['le nom de l’astronome qui l’a découverte', 'Non. 🔭'], ['sa forme', 'Non. 🔵']], 'Chaque élément a sa « signature » de raies.'],
    ['Un décalage vers le rouge (redshift) indique que la source…', 's’éloigne de nous', [['se rapproche', 'Ça, c’est un décalage vers le bleu. 🔵'], ['est plus chaude', 'La couleur d’origine dépend de la température, mais le décalage, lui, parle du mouvement. 🌡️'], ['est immobile', 'Non. 🚦']], 'Effet Doppler-Fizeau.'],
    ['Quelle étoile est la plus chaude ?', 'une étoile bleue', [['une étoile rouge', 'Les rouges sont les plus froides. 🔴'], ['une étoile jaune comme le Soleil', 'Le Soleil est moyen. 🟡'], ['elles ont toutes la même température', 'Non. 🌡️']], 'Loi de Wien : plus un corps est chaud, plus son pic d’émission est vers le bleu.'],
    ['Combien vaut environ un parsec ?', '3,26 années-lumière', [['1 année-lumière', 'Un peu plus que ça. 📏'], ['150 millions de km', 'Ça, c’est une unité astronomique. ☀️'], ['100 années-lumière', 'Bien moins. 🔢']], 'Distance à laquelle 1 UA est vue sous un angle d’une seconde d’arc.'],
    ['À quelle vitesse se déplace la lumière dans le vide ?', 'environ 300 000 km/s', [['environ 300 km/s', 'Mille fois trop lent. 🐢'], ['environ 343 m/s', 'Ça, c’est le son dans l’air. 🔊'], ['infinie', 'Elle est très rapide, mais finie. ♾️']], 'Exactement 299 792 458 m/s.']
  ];
  const GRAVITATION = [
    ['Que dit la première loi de Kepler ?', 'les planètes décrivent des ellipses dont le Soleil occupe un foyer', [['les planètes tournent en cercles parfaits autour de la Terre', 'Ça, c’est l’ancien modèle. 🌍'], ['les planètes vont toutes à la même vitesse', 'Non. 🏎️'], ['le Soleil tourne autour de la Terre', 'Copernic et Kepler sont passés par là. ☀️']], 'Kepler publie ses deux premières lois en 1609.'],
    ['Que dit la troisième loi de Kepler ?', 'T² / a³ est le même pour toutes les planètes d’un même système', [['T = a', 'Trop simple. 🔢'], ['les planètes lointaines tournent plus vite', 'C’est l’inverse. 🐢'], ['la masse ne compte pas en physique', 'Non. ⚖️']], 'T : période de révolution ; a : demi-grand axe.'],
    ['Comment varie la force de gravitation quand la distance double ?', 'elle est divisée par 4', [['elle double', 'Non : elle diminue. 📉'], ['elle est divisée par 2', 'Elle dépend du carré de la distance. ²'], ['elle ne change pas', 'Si. 🔄']], 'F = G × m₁ × m₂ / d².'],
    ['À quelle altitude se trouvent les satellites géostationnaires ?', 'environ 36 000 km', [['environ 400 km', 'C’est l’altitude de l’ISS. 🛰️'], ['environ 384 000 km', 'C’est la Lune. 🌕'], ['environ 10 km', 'C’est l’altitude des avions de ligne. ✈️']], 'Ils tournent en un jour sidéral et semblent immobiles dans le ciel.'],
    ['Quelle est la vitesse de libération à la surface de la Terre ?', 'environ 11,2 km/s', [['environ 1 km/s', 'Bien trop peu. 🐌'], ['environ 300 000 km/s', 'C’est la vitesse de la lumière. ⚡'], ['environ 7,9 km/s', 'C’est la vitesse pour tourner en orbite basse, pas pour s’échapper. 🛰️']], 'v = √(2GM/R).']
  ];
  const ETOILES = [
    ['Quelle réaction fait briller le Soleil ?', 'la fusion de l’hydrogène en hélium', [['la combustion du charbon', 'Le Soleil n’est pas un barbecue géant. 🔥'], ['la fission de l’uranium', 'La fission, c’est nos centrales. ⚛️'], ['l’électricité statique', 'Non. ⚡']], 'Au cœur du Soleil, environ 15 millions de degrés.'],
    ['Quel diagramme classe les étoiles selon leur température et leur luminosité ?', 'le diagramme de Hertzsprung-Russell', [['le diagramme de Venn', 'Celui-là, c’est pour les ensembles. ⭕'], ['le tableau de Mendeleïev', 'C’est la classification des éléments chimiques. 🧪'], ['le diagramme de Gantt', 'C’est pour planifier des projets. 📊']], 'La séquence principale y forme une grande diagonale.'],
    ['Que deviendra le Soleil à la fin de sa vie ?', 'une géante rouge, puis une naine blanche', [['un trou noir', 'Il n’est pas assez massif. ⚫'], ['une supernova', 'Il n’est pas assez massif non plus. 💥'], ['une planète', 'Non. 🪐']], 'Dans environ 5 milliards d’années.'],
    ['Quel est l’âge du Soleil ?', 'environ 4,6 milliards d’années', [['environ 6 000 ans', 'Les datations disent bien plus. ⏳'], ['environ 13,8 milliards d’années', 'C’est l’âge de l’Univers. 🌌'], ['environ 100 millions d’années', 'Trop jeune. 👶']], 'Il est à peu près à la moitié de sa vie.'],
    ['Qu’est-ce qu’un pulsar ?', 'une étoile à neutrons en rotation rapide qui émet des faisceaux réguliers', [['une planète qui clignote', 'Non. 🪐'], ['un satellite artificiel', 'Non. 🛰️'], ['une comète', 'Non. ☄️']], 'Découvert en 1967 par Jocelyn Bell Burnell.']
  ];
  const GALAXIES = [
    ['Quelle forme a notre galaxie, la Voie lactée ?', 'spirale barrée', [['elliptique', 'Pas la nôtre. 🥚'], ['irrégulière', 'Elle a une structure nette. 🌀'], ['cubique', 'Aucune galaxie n’est cubique. 🧊']], 'Environ 100 000 années-lumière de diamètre.'],
    ['Quelle est la grande galaxie la plus proche de la Voie lactée ?', 'Andromède', [['le Grand Nuage de Magellan', 'C’est une galaxie satellite, plus petite. ☁️'], ['la galaxie du Sombrero', 'Bien plus loin. 🎩'], ['Alpha du Centaure', 'C’est un système d’étoiles, pas une galaxie. ⭐']], 'À environ 2,5 millions d’années-lumière ; elle se rapproche de nous.'],
    ['Qu’y a-t-il au centre de la Voie lactée ?', 'un trou noir supermassif, Sagittarius A*', [['le Soleil', 'Le Soleil est en périphérie. ☀️'], ['une planète géante', 'Non. 🪐'], ['rien du tout', 'Il y a un objet de 4 millions de masses solaires. ⚫']], 'Prix Nobel 2020 pour Reinhard Genzel et Andrea Ghez.'],
    ['Qu’est-ce que la « matière noire » ?', 'une matière invisible détectée par ses effets gravitationnels', [['la poussière noire des comètes', 'Non. ☄️'], ['le charbon de l’espace', 'Non. ⛏️'], ['l’ombre des planètes', 'Non. 🌑']], 'Elle explique notamment la vitesse de rotation des galaxies.']
  ];
  const COSMO = [
    ['Quel est l’âge estimé de l’Univers ?', 'environ 13,8 milliards d’années', [['environ 4,6 milliards d’années', 'C’est l’âge du Soleil. ☀️'], ['environ 1 million d’années', 'Bien trop jeune. 👶'], ['il est infini', 'Le modèle du Big Bang lui donne un âge. ⏳']], 'Mesuré grâce au fond diffus cosmologique.'],
    ['Que dit la loi de Hubble-Lemaître ?', 'plus une galaxie est lointaine, plus elle s’éloigne vite', [['toutes les galaxies se rapprochent', 'C’est l’inverse (en moyenne). 🔄'], ['l’Univers est immobile', 'Il est en expansion. 🎈'], ['seules les galaxies proches bougent', 'Non. 🌌']], 'v = H₀ × d.'],
    ['Qu’est-ce que le fond diffus cosmologique ?', 'la plus ancienne lumière de l’Univers, émise environ 380 000 ans après le Big Bang', [['la lumière des étoiles actuelles', 'Non. ⭐'], ['le bruit des télévisions', 'Une petite partie de la neige des vieilles télés venait de lui, mais ce n’est pas sa définition. 📺'], ['la lumière du Soleil réfléchie par la Lune', 'Non. 🌕']], 'Aujourd’hui à environ 2,7 K.'],
    ['Que représente l’« énergie noire » ?', 'la cause inconnue de l’accélération de l’expansion', [['l’énergie des trous noirs', 'Non. ⚫'], ['l’électricité consommée la nuit', 'Non. 🌙'], ['la chaleur du Soleil', 'Non. ☀️']], 'Découverte en 1998 ; prix Nobel 2011.'],
    ['Quelle part de l’Univers est faite de matière ordinaire (atomes) ?', 'environ 5 %', [['environ 95 %', 'C’est l’inverse : 95 % reste mystérieux. 🔄'], ['environ 50 %', 'Bien moins. 🔢'], ['100 %', 'Non. 🌌']], 'Environ 27 % de matière noire et 68 % d’énergie noire.']
  ];
  const EXO = [
    ['Quelle exoplanète, découverte en 1995, tourne autour d’une étoile semblable au Soleil ?', '51 Pegasi b', [['Pluton', 'Pluton est dans notre système solaire. 🧊'], ['Proxima b', 'Découverte en 2016. 📆'], ['Kepler-22b', 'Découverte en 2011. 📆']], 'Par Michel Mayor et Didier Queloz, prix Nobel 2019.'],
    ['Comment fonctionne la méthode des transits ?', 'on mesure la baisse de luminosité quand la planète passe devant son étoile', [['on photographie la planète directement à chaque fois', 'C’est rarement possible. 📸'], ['on écoute la planète', 'Il n’y a pas de son dans le vide. 🔇'], ['on envoie une sonde sur place', 'Trop loin. 🚀']], 'Méthode des missions Kepler, TESS et du futur PLATO (ESA).'],
    ['Qu’est-ce que la « zone habitable » ?', 'la région autour d’une étoile où l’eau peut rester liquide en surface', [['la zone où vivent les astronautes', 'Non. 🧑‍🚀'], ['le centre de la galaxie', 'Non. 🌀'], ['la surface du Soleil', 'Bien trop chaud. 🔥']], 'Cela ne garantit pas la présence de vie.'],
    ['Quelle méthode détecte une planète par le petit mouvement qu’elle provoque chez son étoile ?', 'les vitesses radiales', [['les transits', 'Les transits mesurent une baisse de luminosité. 📉'], ['la radioactivité', 'Non. ☢️'], ['le sonar', 'Non. 🔊']], 'L’étoile « oscille » et son spectre se décale par effet Doppler.']
  ];
  const INSTRUMENTS = [
    ['Dans quel domaine de lumière observe surtout le télescope James Webb ?', 'l’infrarouge', [['les rayons X', 'Ça, c’est Chandra ou XMM-Newton. ☢️'], ['les ondes radio', 'Ça, ce sont les radiotélescopes. 📡'], ['les ultraviolets uniquement', 'Non. 🟣']], 'Lancé le 25 décembre 2021 par une fusée Ariane 5, il est au point de Lagrange L2.'],
    ['Quel télescope spatial a été lancé en 1990 ?', 'Hubble', [['James Webb', 'Webb a été lancé en 2021. 📆'], ['Gaia', 'Gaia a été lancé en 2013. 📆'], ['Euclid', 'Euclid a été lancé en 2023. 📆']], 'Il a été réparé plusieurs fois par des astronautes.'],
    ['Que cartographie la mission Gaia de l’ESA ?', 'la position et le mouvement de plus d’un milliard d’étoiles', [['la surface de Mars', 'Non. 🔴'], ['les océans de la Terre', 'Non. 🌊'], ['le fond diffus cosmologique', 'Ça, c’était Planck. 🌌']], 'La carte en 3D la plus précise de notre galaxie.'],
    ['Où l’ESO construit-il l’ELT, le plus grand télescope optique du monde ?', 'au Chili, dans le désert d’Atacama', [['à Paris', 'Le ciel parisien est trop lumineux. 🌃'], ['sur la Lune', 'Pas encore. 🌕'], ['en Antarctique', 'Non. 🧊']], 'Miroir principal de 39 m.']
  ];
  const COMPACTS = [
    ['Qu’est-ce que l’horizon des événements d’un trou noir ?', 'la limite d’où même la lumière ne peut plus s’échapper', [['la surface lumineuse du trou noir', 'Un trou noir n’a pas de surface lumineuse. 🌑'], ['le bord de la galaxie', 'Non. 🌀'], ['le moment où il naît', 'Non. 👶']], 'Son rayon est le rayon de Schwarzschild.'],
    ['Quand a-t-on publié la première image d’un trou noir (M87*) ?', 'en 2019', [['en 1969', 'C’était l’année des premiers pas sur la Lune. 🌕'], ['en 1919', 'C’était l’éclipse qui a confirmé la relativité. 🌑'], ['en 2030', 'Ça a déjà eu lieu. ⏪']], 'Par la collaboration Event Horizon Telescope.'],
    ['Quand les ondes gravitationnelles ont-elles été détectées pour la première fois ?', 'en 2015 (annonce en 2016)', [['en 1905', 'C’est l’année de la relativité restreinte. 🧠'], ['en 1687', 'C’est l’année des Principia de Newton. 🍎'], ['jamais', 'Si : par LIGO, prix Nobel 2017. 🏅']], 'Elles venaient de la fusion de deux trous noirs.'],
    ['Que reste-t-il après l’explosion d’une étoile très massive en supernova ?', 'une étoile à neutrons ou un trou noir', [['une naine blanche', 'C’est le destin des étoiles comme le Soleil. ⚪'], ['une nouvelle Terre', 'Non. 🌍'], ['rien du tout', 'Il reste un astre très compact. ⚫']], 'Les éléments lourds sont dispersés dans l’espace.']
  ];
  const ch = (id, nom, dom, banque) => ({ id, nom, dom, niv:['Sup'], banque });
  m.chapitres.push(
    ch('systeme-solaire', 'Le système solaire', 'Connaissances', SYSTEME),
    ch('lumiere', 'Lumière et spectroscopie', 'Physique de l’Univers', LUMIERE),
    ch('gravitation', 'Gravitation et lois de Kepler', 'Physique de l’Univers', GRAVITATION),
    ch('vie-etoiles', 'Vie et mort des étoiles', 'Connaissances', ETOILES),
    ch('galaxies', 'Galaxies et matière noire', 'Connaissances', GALAXIES),
    ch('cosmologie', 'Cosmologie (Big Bang, expansion)', 'Physique de l’Univers', COSMO),
    ch('exoplanetes', 'Exoplanètes', 'Connaissances', EXO),
    ch('instruments', 'Télescopes et missions spatiales', 'Observation', INSTRUMENTS),
    ch('objets-compacts', 'Trous noirs, étoiles à neutrons, ondes gravitationnelles', 'Physique de l’Univers', COMPACTS));
  m.examens = Object.assign(m.examens || {}, { Sup:'Partiel blanc d’astrophysique' });
})();
