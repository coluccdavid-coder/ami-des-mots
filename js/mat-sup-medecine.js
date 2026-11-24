// Ami des mots — v6.8 : MÉDECINE complète (PASS/LAS et premières années : les grandes unités d'enseignement).
// Contenu éducatif : il ne remplace jamais l'avis d'un médecin. Vannes sur la réponse, jamais sur l'étudiant.
(function(){
  'use strict';
  const M = window.MATIERES; if(!M) return;
  const m = M.trouver('medecine'); if(!m) return;
  const BIOCHIMIE = [
    ['Quelle molécule sert de « monnaie énergétique » aux cellules ?', 'l’ATP', [['l’ADN', 'L’ADN stocke l’information, pas l’énergie. 📚'], ['le glucose', 'Le glucose est un carburant, mais la monnaie échangée, c’est l’ATP. ⛽'], ['l’eau', 'L’eau est indispensable, mais ce n’est pas une monnaie. 💧']], 'Adénosine triphosphate : l’hydrolyse de ses liaisons libère de l’énergie.'],
    ['Combien d’acides aminés usuels entrent dans la composition des protéines humaines ?', '20', [['4', '4, ce sont les bases de l’ADN. 🧬'], ['64', '64, c’est le nombre de codons. 🔢'], ['206', '206, ce sont les os. 🦴']], 'Ils sont reliés par des liaisons peptidiques.'],
    ['Où se déroule la glycolyse ?', 'dans le cytoplasme', [['dans le noyau', 'Le noyau garde l’ADN, il ne découpe pas le glucose. 🧠'], ['dans la mitochondrie', 'La mitochondrie, c’est la suite : cycle de Krebs et chaîne respiratoire. 🔋'], ['dans le sang uniquement', 'Elle a lieu dans les cellules. 🩸']], 'Le glucose y est transformé en pyruvate.'],
    ['Quel est le rôle d’une enzyme ?', 'accélérer une réaction chimique sans être consommée', [['transporter l’oxygène', 'Ça, c’est l’hémoglobine. 🚚'], ['stocker les graisses', 'Ce sont les adipocytes. 🧈'], ['fabriquer de l’ADN tout seul', 'Certaines enzymes y participent, mais ce n’est pas leur définition. 🧬']], 'Ce sont des catalyseurs biologiques, presque toujours des protéines.'],
    ['Quelle base remplace la thymine dans l’ARN ?', 'l’uracile', [['l’adénine', 'L’adénine est présente dans les deux. 🔤'], ['la guanine', 'La guanine aussi. 🔤'], ['la caféine', 'Ce serait un ARN très réveillé. ☕']], 'ADN : A, T, C, G. ARN : A, U, C, G.']
  ];
  const CELLULE = [
    ['Combien de chromosomes possède une cellule humaine non sexuelle ?', '46 (23 paires)', [['23', '23, c’est dans un gamète. 🥚'], ['48', '48, c’est le chimpanzé. 🐒'], ['92', 'Un peu trop, même pour une cellule ambitieuse. 🔢']], 'Les cellules somatiques sont diploïdes.'],
    ['Que produit la méiose ?', '4 cellules haploïdes (les gamètes)', [['2 cellules identiques', 'Ça, c’est la mitose. 🔁'], ['1 cellule géante', 'Non. 🎈'], ['des anticorps', 'Ça, ce sont les plasmocytes. 🛡️']], 'Elle permet la reproduction sexuée et le brassage génétique.'],
    ['Quel organite fabrique les protéines à partir de l’ARN messager ?', 'le ribosome', [['la mitochondrie', 'La mitochondrie produit l’énergie. 🔋'], ['le lysosome', 'Le lysosome digère les déchets. 🗑️'], ['la membrane plasmique', 'Elle délimite la cellule. 🧱']], 'C’est la traduction.'],
    ['De quoi est surtout faite la membrane plasmique ?', 'd’une double couche de phospholipides avec des protéines', [['de cellulose', 'La cellulose, c’est la paroi des cellules végétales. 🌿'], ['d’os', 'Non. 🦴'], ['d’ADN', 'L’ADN est dans le noyau. 🧬']], 'Modèle de la mosaïque fluide.'],
    ['Quel organite modifie et emballe les protéines avant leur envoi ?', 'l’appareil de Golgi', [['le noyau', 'Le noyau contient l’ADN. 🧠'], ['le centriole', 'Il participe à la division cellulaire. ➗'], ['la vacuole', 'Elle stocke, surtout chez les végétaux. 🫙']], 'Il reçoit les protéines du réticulum endoplasmique.']
  ];
  const HISTO = [
    ['Quels sont les quatre tissus fondamentaux ?', 'épithélial, conjonctif, musculaire et nerveux', [['osseux, sanguin, cutané et dentaire', 'Ce sont des exemples, pas les quatre catégories. 🦷'], ['rouge, blanc, jaune et bleu', 'Pas de nuancier en histologie. 🎨'], ['dur, mou, liquide et gazeux', 'Non. 🧪']], 'Tout organe associe plusieurs de ces tissus.'],
    ['Où a lieu, en général, la fécondation chez la femme ?', 'dans la trompe utérine', [['dans l’utérus', 'L’embryon s’y implante ensuite, quelques jours plus tard. 🏡'], ['dans l’ovaire', 'L’ovaire libère l’ovocyte. 🥚'], ['dans le col de l’utérus', 'Non. ↕️']], 'Dans l’ampoule de la trompe.'],
    ['Quel feuillet embryonnaire donne le système nerveux et la peau ?', 'l’ectoderme', [['l’endoderme', 'Il donne le tube digestif et ses glandes. 🍽️'], ['le mésoderme', 'Il donne les muscles, les os, le cœur. 💪'], ['le placenta', 'Le placenta n’est pas un feuillet. 🧺']], 'Trois feuillets : ectoderme, mésoderme, endoderme.'],
    ['Quelle cellule transmet l’influx nerveux ?', 'le neurone', [['le globule rouge', 'Il transporte l’oxygène. 🚚'], ['l’ostéoblaste', 'Il fabrique l’os. 🦴'], ['l’adipocyte', 'Il stocke les graisses. 🧈']], 'Dendrites, corps cellulaire, axone, synapses.']
  ];
  const GENETIQUE = [
    ['Qu’est-ce qu’une trisomie 21 ?', 'la présence de trois chromosomes 21 au lieu de deux', [['l’absence du chromosome 21', 'Ce serait une monosomie. ➖'], ['une infection virale', 'C’est une anomalie chromosomique, pas une infection. 🦠'], ['un groupe sanguin', 'Non. 🩸']], 'Aussi appelée syndrome de Down.'],
    ['Comment se transmet la mucoviscidose ?', 'sur un mode autosomique récessif', [['par un virus', 'C’est une maladie génétique. 🧬'], ['uniquement par le père', 'Les deux parents transmettent une copie du gène. 👪'], ['sur un mode dominant lié à l’Y', 'Non. 🔀']], 'Il faut deux allèles mutés du gène CFTR pour être malade.'],
    ['Pourquoi le daltonisme touche-t-il plus souvent les garçons ?', 'le gène est porté par le chromosome X', [['parce qu’ils regardent plus d’écrans', 'Ce n’est pas une question d’habitudes. 📱'], ['parce que le gène est sur le chromosome Y', 'C’est sur l’X ; les garçons n’en ont qu’un. ❌'], ['par hasard total', 'Il y a une explication génétique. 🧬']], 'Transmission récessive liée à l’X.'],
    ['Quel outil d’édition du génome a valu le prix Nobel de chimie 2020 à Emmanuelle Charpentier et Jennifer Doudna ?', 'CRISPR-Cas9', [['la PCR', 'La PCR (1983) amplifie l’ADN. 🔁'], ['l’IRM', 'L’IRM est une technique d’imagerie. 🧲'], ['le microscope électronique', 'Non. 🔬']], 'Des « ciseaux moléculaires » pour couper l’ADN à un endroit précis.'],
    ['Qu’est-ce qu’un allèle ?', 'une version d’un gène', [['un chromosome entier', 'Un chromosome contient de nombreux gènes. 🧵'], ['une protéine du sang', 'Non. 🩸'], ['une cellule souche', 'Non. 🌱']], 'Ex. : allèles A, B et O du groupe sanguin.']
  ];
  const BIOPHYSIQUE = [
    ['Quelle est la valeur normale du pH sanguin ?', 'environ 7,4', [['environ 2', 'Ça, c’est l’estomac. 🍋'], ['environ 10', 'Bien trop basique. 🧼'], ['exactement 7', 'Il est légèrement basique, un peu au-dessus de 7. ⚖️']], 'Entre 7,35 et 7,45.'],
    ['Sur quoi repose l’IRM ?', 'un champ magnétique et les protons des atomes d’hydrogène', [['les rayons X', 'Ça, c’est la radiographie et le scanner. ☢️'], ['les ultrasons', 'Ça, c’est l’échographie. 🔊'], ['la chaleur du corps', 'Ça ressemblerait à la thermographie. 🌡️']], 'Imagerie par résonance magnétique : aucun rayonnement ionisant.'],
    ['Qu’est-ce que l’osmose ?', 'le passage de l’eau à travers une membrane vers le milieu le plus concentré', [['la respiration des cellules', 'Non. 🫁'], ['la division des cellules', 'Ça, c’est la mitose. ➗'], ['la coagulation', 'Non. 🧱']], 'Important pour les perfusions : un liquide doit être isotonique.'],
    ['Quelle technique d’imagerie utilise les ultrasons ?', 'l’échographie', [['le scanner', 'Le scanner utilise les rayons X. ☢️'], ['l’IRM', 'L’IRM utilise un champ magnétique. 🧲'], ['la scintigraphie', 'Elle utilise un traceur radioactif. ✨']], 'Sans danger, utilisée notamment pendant la grossesse.'],
    ['Qu’est-ce que la demi-vie d’un isotope radioactif ?', 'le temps pour que la moitié des noyaux se désintègre', [['la moitié de sa vie utile', 'Ce n’est pas une question d’usage. ⏳'], ['le temps pour qu’il disparaisse entièrement', 'Il n’en reste que la moitié après une demi-vie. ➗'], ['sa masse divisée par deux', 'Non. ⚖️']], 'Notion utilisée en médecine nucléaire.']
  ];
  const PHARMACO = [
    ['Que signifie AMM pour un médicament ?', 'autorisation de mise sur le marché', [['analyse médicale mensuelle', 'Non. 📅'], ['agence des médicaments mondiale', 'Non. 🌍'], ['avis du médecin de famille', 'Non. 🩺']], 'Délivrée en France par l’ANSM ou au niveau européen par l’EMA.'],
    ['Qu’est-ce qu’un médicament générique ?', 'une copie d’un médicament dont le brevet a expiré, avec le même principe actif', [['un médicament sans principe actif', 'Ça, c’est un placebo. 🍬'], ['un médicament moins efficace', 'Il doit être bioéquivalent. ⚖️'], ['un médicament vendu sans ordonnance uniquement', 'Rien à voir. 🧾']], 'Même principe actif, même dosage, même forme.'],
    ['Quel organe est surtout menacé par un surdosage de paracétamol ?', 'le foie', [['les poumons', 'Non. 🫁'], ['les yeux', 'Non. 👀'], ['les dents', 'Non. 🦷']], 'Toujours respecter la dose et l’intervalle entre les prises.'],
    ['Que désigne la DCI ?', 'la dénomination commune internationale du principe actif', [['la marque commerciale', 'C’est l’inverse : la DCI est le nom scientifique, pas la marque. 🏷️'], ['la dose conseillée initiale', 'Non. 💊'], ['le département de contrôle interne', 'Non. 🏢']], 'Ex. : paracétamol est une DCI ; plusieurs marques en vendent.'],
    ['Qu’est-ce que la pharmacovigilance ?', 'la surveillance des effets indésirables des médicaments après leur mise sur le marché', [['la garde des pharmacies la nuit', 'C’est la pharmacie de garde. 🌙'], ['le contrôle des prix', 'Non. 💶'], ['la fabrication des médicaments', 'Non. 🏭']], 'Patients et soignants peuvent déclarer un effet indésirable.']
  ];
  const SANTE_PUBLIQUE = [
    ['Quelle est la différence entre incidence et prévalence ?', 'l’incidence compte les nouveaux cas, la prévalence tous les cas présents', [['c’est la même chose', 'Non, piège classique. 🎯'], ['l’incidence compte les décès', 'Ça, c’est la mortalité. 📉'], ['la prévalence compte les vaccins', 'Non. 💉']], 'Sur une période et une population données.'],
    ['Qu’est-ce que la sensibilité d’un test diagnostique ?', 'sa capacité à être positif chez les malades', [['sa capacité à être négatif chez les non-malades', 'Ça, c’est la spécificité. 🔄'], ['son prix', 'Non. 💶'], ['la douleur qu’il provoque', 'Non. 😖']], 'Un test très sensible rate peu de malades.'],
    ['Pourquoi fait-on un essai « en double aveugle » ?', 'ni le patient ni le médecin ne savent qui reçoit le traitement ou le placebo', [['pour tester la vue', 'Non. 👓'], ['pour aller plus vite', 'Ce n’est pas le but. ⏱️'], ['parce que c’est moins cher', 'Ce n’est pas le but non plus. 💶']], 'Cela évite les biais ; on tire aussi au sort les groupes (randomisation).'],
    ['Quelle différence entre épidémie et pandémie ?', 'une pandémie est une épidémie qui s’étend à plusieurs continents', [['aucune', 'Il y a une différence d’échelle. 🌍'], ['une pandémie ne touche qu’une ville', 'C’est l’inverse. 🏙️'], ['une épidémie est toujours mortelle', 'Non. 🙅']], 'L’OMS qualifie les pandémies.'],
    ['Que mesure une valeur p (p-value) inférieure à 0,05 dans un essai ?', 'un résultat jugé statistiquement significatif', [['une preuve que le traitement est parfait', 'Significatif ne veut pas dire parfait ni important. 📏'], ['un risque de 5 % d’effets secondaires', 'Non. ⚠️'], ['5 % de patients guéris', 'Non. 🔢']], 'Seuil conventionnel, à interpréter avec prudence.']
  ];
  const SEMIO = [
    ['À partir de quelle température parle-t-on de fièvre ?', '38 °C', [['36,5 °C', 'C’est une température normale. 🌡️'], ['40 °C', 'C’est déjà une forte fièvre. 🔥'], ['37 °C', 'Encore normal. 🙂']], 'Température mesurée au repos.'],
    ['Qu’est-ce qu’une tachycardie chez l’adulte au repos ?', 'un cœur qui bat à plus de 100 battements par minute', [['moins de 60 battements par minute', 'Ça, c’est une bradycardie. 🐢'], ['une forte fièvre', 'Non. 🌡️'], ['une toux sèche', 'Non. 😮‍💨']], 'Fréquence normale au repos : environ 60 à 100.'],
    ['Quel spécialiste soigne les reins ?', 'le néphrologue', [['le cardiologue', 'Le cardiologue s’occupe du cœur. ❤️'], ['le dermatologue', 'Le dermatologue s’occupe de la peau. 🧴'], ['l’ophtalmologue', 'L’ophtalmologue s’occupe des yeux. 👁️']], 'Néphro = rein en grec.'],
    ['Quel numéro appeler en France pour une urgence médicale ?', 'le 15 (SAMU)', [['le 17', 'Le 17, c’est la police. 🚓'], ['le 18', 'Le 18, ce sont les pompiers ; ils interviennent aussi, mais le SAMU, c’est le 15. 🚒'], ['le 36 15', 'C’était le Minitel. 📟']], 'Le 112 fonctionne dans toute l’Europe ; le 114 par SMS.'],
    ['Que veut dire l’acronyme VITE pour reconnaître un AVC ?', 'Visage paralysé, Inertie d’un membre, Trouble de la parole, En urgence le 15', [['Vomissements, Insomnie, Toux, Étourdissement', 'Ce ne sont pas les signes retenus. 🙅'], ['Vitamines, Insuline, Tension, Eau', 'Non. 💊'], ['Voir, Inspirer, Tousser, Éternuer', 'Non. 🤧']], 'Chaque minute compte : appeler le 15 immédiatement.']
  ];
  const ETHIQUE = [
    ['Le secret médical protège…', 'les informations confiées au médecin par le patient', [['les recettes de l’hôpital', 'Non. 🍲'], ['seulement le nom du médecin', 'Non. 🪪'], ['rien du tout', 'Il est inscrit dans la loi. ⚖️']], 'Article L. 1110-4 du Code de la santé publique.'],
    ['Que doit être le consentement du patient aux soins ?', 'libre et éclairé', [['écrit en latin', 'Non. 📜'], ['donné par le voisin', 'Non. 🏠'], ['facultatif', 'Il est obligatoire, sauf urgence ou cas prévus par la loi. 📌']], 'Le patient reçoit une information claire avant de décider.'],
    ['Quelle loi de 2002 a renforcé les droits des malades ?', 'la loi Kouchner', [['la loi Veil', 'La loi Veil date de 1975 (IVG). 📅'], ['la loi Evin', 'La loi Evin (1991) concerne le tabac et l’alcool. 🚭'], ['la loi Ferry', 'Jules Ferry, c’est l’école. 🎒']], 'Loi du 4 mars 2002 : accès au dossier médical, information du patient.'],
    ['Comment fonctionne le don d’organes après le décès en France ?', 'chacun est donneur présumé, sauf refus exprimé (registre national des refus)', [['il faut une carte obligatoire', 'Une carte peut exprimer son choix, mais le principe est le consentement présumé. 🪪'], ['c’est interdit', 'Non, c’est autorisé et encadré. ✅'], ['seuls les médecins peuvent donner', 'Non. 🩺']], 'Il est conseillé d’en parler à ses proches.'],
    ['Quel serment prêtent traditionnellement les médecins ?', 'le serment d’Hippocrate', [['le serment de Galilée', 'Galilée était astronome. 🔭'], ['le serment du Jeu de paume', 'C’est un épisode de 1789. 🎾'], ['le serment d’Archimède', 'Il porte sur un tout autre métier, et n’existe pas pour les médecins. 🛁']], 'Hippocrate, médecin grec du Ve siècle av. J.-C.']
  ];
  const SECOURS = [
    ['Dans quelle position place-t-on une personne inconsciente qui respire ?', 'en position latérale de sécurité (PLS)', [['assise', 'Elle pourrait tomber et ses voies aériennes se fermer. 🪑'], ['debout', 'Impossible et dangereux. 🧍'], ['sur le ventre, bras en croix', 'Ce n’est pas la position recommandée. 🙅']], 'Après avoir appelé le 15 ou le 112.'],
    ['Que faire devant une personne qui ne respire pas ?', 'appeler les secours, masser le cœur et utiliser un défibrillateur', [['lui donner à boire', 'Elle ne peut pas avaler. 🥤'], ['attendre qu’elle se réveille', 'Chaque minute compte. ⏱️'], ['la mettre en PLS', 'La PLS, c’est pour une personne qui respire. 🔄']], 'Compressions thoraciques à un rythme de 100 à 120 par minute.'],
    ['Que faire sur une brûlure simple ?', 'la refroidir sous l’eau tempérée pendant plusieurs minutes', [['mettre du beurre', 'Vieille idée, mauvaise idée. 🧈'], ['mettre de la glace directement', 'Trop froid, ça abîme la peau. 🧊'], ['percer les cloques', 'Il ne faut pas. 🙅']], 'Puis demander un avis médical si elle est étendue ou sur le visage.'],
    ['Que signifie DAE ?', 'défibrillateur automatisé externe', [['dossier administratif électronique', 'Non. 💻'], ['dose d’adrénaline d’urgence', 'Non. 💉'], ['département d’analyse épidémique', 'Non. 📊']], 'Il guide l’utilisateur à la voix ; tout le monde peut s’en servir.']
  ];
  const ch = (id, nom, dom, banque) => ({ id, nom, dom, niv:['Sup'], banque });
  m.chapitres.push(
    ch('biochimie', 'Biochimie', 'Sciences fondamentales', BIOCHIMIE),
    ch('cellule', 'Biologie cellulaire', 'Sciences fondamentales', CELLULE),
    ch('histologie', 'Histologie et embryologie', 'Sciences fondamentales', HISTO),
    ch('genetique', 'Génétique', 'Sciences fondamentales', GENETIQUE),
    ch('biophysique', 'Biophysique et imagerie', 'Sciences fondamentales', BIOPHYSIQUE),
    ch('pharmacologie', 'Pharmacologie', 'Médicaments et santé publique', PHARMACO),
    ch('sante-publique', 'Santé publique et biostatistiques', 'Médicaments et santé publique', SANTE_PUBLIQUE),
    ch('semiologie', 'Sémiologie et spécialités', 'Clinique', SEMIO),
    ch('secours', 'Gestes de premiers secours', 'Clinique', SECOURS),
    ch('ethique', 'Éthique et droit de la santé', 'Sciences humaines et sociales', ETHIQUE));
  m.examens = Object.assign(m.examens || {}, { Sup:'Concours blanc PASS / LAS' });
})();
