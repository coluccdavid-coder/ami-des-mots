// v5.82 : les spécialités qui manquaient (arts, biologie-écologie, EPPCS, latin, grec, LLCER espagnol/allemand/italien/portugais
// et anglais monde contemporain) et les spécialités du bac technologique (STMG, STI2D, ST2S, STL, STD2A, STHR, S2TMD).
// Même principe : construction des épreuves officielles, parties rédigées proposées sur papier, calculs générés justes, vannes d'Ami.
(function(){
  'use strict';
  const E = window.EPREUVES; if(!E) return;
  const { Q, nb, ent, un } = E.outils;
  const tirer = (r, l, n) => l.slice().sort(() => r() - 0.5).slice(0, n);
  const QS = l => l.map(([q, bon, faux, regle]) => Q(q, bon, faux, regle));
  const bloc = (titre, pts, contexte, l, r, n) => ({ titre, pts, contexte, questions:QS(tirer(r, l, n)) });

  // ═══════════════ ARTS (3 h 30) ═══════════════
  const HDA = [
    ['Qui a peint « La Joconde » ?', 'Léonard de Vinci', [['Michel-Ange', 'Michel-Ange, c’est la chapelle Sixtine. Même époque, autre génie.'], ['Raphaël', 'Raphaël, c’est L’École d’Athènes.']], 'Renaissance italienne, début du XVIe siècle.'],
    ['Le mouvement impressionniste doit son nom à un tableau de :', 'Claude Monet', [['Pablo Picasso', 'Picasso, c’est le cubisme, plus tard.'], ['Eugène Delacroix', 'Delacroix, c’est le romantisme.']], '« Impression, soleil levant », 1872.'],
    ['Le cubisme est associé à :', 'Picasso et Braque', [['Monet et Renoir', 'Ce sont des impressionnistes.'], ['Dalí et Magritte', 'Ce sont des surréalistes.']], 'Début du XXe siècle.'],
    ['Eugène Viollet-le-Duc est célèbre pour :', 'Ses restaurations de monuments médiévaux', [['Ses films muets', 'Mauvais siècle et mauvais art.'], ['Ses symphonies', 'Ce n’est pas un musicien.']], 'Notre-Dame de Paris, Carcassonne, Pierrefonds.'],
    ['Henri Matisse est une figure du :', 'Fauvisme', [['Cubisme', 'Proche dans le temps, mais Matisse, c’est les couleurs pures du fauvisme.'], ['Baroque', 'Le baroque, c’est le XVIIe siècle.']], 'Salon d’automne de 1905.'],
    ['Une composition sur documents en histoire des arts demande :', 'D’analyser et de mettre en relation plusieurs œuvres pour répondre à une question', [['De recopier les cartels', 'Recopier n’est pas analyser.'], ['De raconter sa sortie au musée', 'Il faut une argumentation organisée.']], 'Problématique, analyse, mise en relation.']
  ];
  const CINEMA = [
    ['Les frères Lumière ont présenté leur cinématographe en :', '1895', [['1927', '1927, c’est l’arrivée du cinéma parlant.'], ['1950', 'Bien trop tard.']], 'Première projection publique payante, décembre 1895.'],
    ['Un plan-séquence, c’est :', 'Une séquence filmée en un seul plan, sans coupe', [['Une suite de plans très courts', 'Ça, c’est un montage rapide.'], ['Une affiche de film', 'Rien à voir.']], 'Pas de coupe au montage.'],
    ['Un gros plan cadre :', 'Un visage ou un détail', [['Tout un paysage', 'Ça, c’est un plan d’ensemble.'], ['Un personnage en pied', 'Ça, c’est un plan moyen.']], 'Échelle des plans.'],
    ['La Nouvelle Vague est un mouvement du cinéma :', 'Français, à la fin des années 1950', [['Américain des années 1920', 'Mauvais pays, mauvaise époque.'], ['Japonais d’animation', 'Non.']], 'Godard, Truffaut, Varda…'],
    ['Le champ-contrechamp sert surtout à filmer :', 'Un dialogue entre deux personnages', [['Un paysage vide', 'Il faut deux points de vue qui se répondent.'], ['Le générique', 'Non.']], 'On alterne les deux regards.']
  ];
  const MUSIQUE = [
    ['Combien de temps dans une mesure à 3/4 ?', '3 temps', [['4 temps', 'Le chiffre du haut indique le nombre de temps : 3.'], ['2 temps', 'Recompte : le 3 du haut.']], 'Chiffre du haut : nombre de temps ; du bas : unité de temps.'],
    ['Qui a composé « La Flûte enchantée » ?', 'Mozart', [['Beethoven', 'Beethoven, c’est la 9e symphonie.'], ['Bach', 'Bach, c’est l’époque baroque.']], 'Opéra de 1791.'],
    ['Un ostinato est :', 'Un motif répété obstinément', [['Un silence', 'Un silence, c’est une pause ou un soupir.'], ['Un instrument à vent', 'Non : c’est un procédé musical.']], 'Du latin « obstiné ».'],
    ['Le tempo, c’est :', 'La vitesse d’exécution', [['La hauteur des notes', 'Ça, c’est la mélodie.'], ['Le volume', 'Ça, ce sont les nuances.']], 'En battements par minute.'],
    ['Combien de lignes compte une portée ?', '5', [['4', 'Recompte : il y en a cinq.'], ['7', 'Sept, ce sont les notes de la gamme.']], 'Portée de cinq lignes.']
  ];
  const THEATRE = [
    ['Une didascalie, c’est :', 'Une indication de mise en scène écrite par l’auteur', [['Une réplique très longue', 'Ça, c’est une tirade.'], ['Un costume', 'Non.']], 'Souvent en italique.'],
    ['Un monologue, c’est :', 'Un personnage seul en scène qui parle', [['Un dialogue à deux', 'Mono = un seul.'], ['Une chanson', 'Non.']], 'Le personnage révèle ses pensées.'],
    ['Le « quatrième mur » est :', 'Le mur imaginaire entre la scène et le public', [['Le mur du fond du décor', 'C’est justement celui qu’on ne voit pas.'], ['Un mur en carton', 'Non.']], 'Le briser, c’est s’adresser au public.'],
    ['Molière a écrit :', 'Le Malade imaginaire', [['Phèdre', 'Phèdre, c’est Racine.'], ['Le Cid', 'Le Cid, c’est Corneille.']], 'Comédie de 1673.'],
    ['Un aparté, c’est :', 'Une réplique que les autres personnages sont censés ne pas entendre', [['Un entracte', 'L’entracte est une pause du spectacle.'], ['Un décor', 'Non.']], 'Complicité avec le public.']
  ];
  const ARTS_PLA = [
    ['Les trois couleurs primaires en peinture (synthèse soustractive) :', 'Cyan, magenta, jaune', [['Rouge, vert, bleu', 'Ça, c’est la synthèse ADDITIVE, celle des écrans.'], ['Noir, blanc, gris', 'Ce sont des valeurs, pas des couleurs primaires.']], 'On parle aussi de bleu, rouge, jaune.'],
    ['Un ready-made, c’est :', 'Un objet manufacturé présenté comme œuvre d’art', [['Une peinture à l’huile', 'Non : c’est un objet tout fait.'], ['Une sculpture en marbre', 'Non.']], 'Marcel Duchamp, « Fontaine », 1917.'],
    ['Une installation est une œuvre :', 'Qui occupe un espace et peut s’expérimenter en s’y déplaçant', [['Uniquement accrochée au mur', 'Elle investit l’espace entier.'], ['Toujours miniature', 'Non.']], 'Art contemporain.'],
    ['Le clair-obscur, c’est :', 'Un fort contraste entre ombre et lumière', [['Une peinture toute blanche', 'Non : il faut du contraste.'], ['Une technique de sculpture', 'C’est surtout un procédé pictural.']], 'Caravage, Rembrandt.']
  ];
  const DANSE = [
    ['Une chorégraphie, c’est :', 'L’écriture et la composition d’une danse', [['Un costume de danse', 'Non.'], ['Une musique de film', 'Non.']], 'Le chorégraphe compose les mouvements.'],
    ['Pina Bausch est associée à :', 'La danse-théâtre', [['Le ballet romantique', 'Elle est contemporaine.'], ['Le hip-hop des origines', 'Non.']], 'Tanztheater de Wuppertal.'],
    ['Le ballet classique se danse souvent :', 'Sur pointes pour les danseuses', [['Toujours pieds nus', 'Ça, c’est fréquent en danse contemporaine.'], ['Avec des patins', 'Non.']], 'Technique académique.']
  ];

  // ═══════════════ BIOLOGIE-ÉCOLOGIE, EPPCS, LLCA ═══════════════
  const BIOECO = [
    ['Un écosystème, c’est :', 'Un milieu de vie et l’ensemble des êtres vivants qui l’habitent', [['Une seule espèce', 'Il faut le milieu ET toutes les espèces.'], ['Une machine agricole', 'Non.']], 'Biotope + biocénose.'],
    ['Les producteurs primaires d’un écosystème sont :', 'Les végétaux chlorophylliens', [['Les carnivores', 'Ils mangent d’autres animaux : ce sont des consommateurs.'], ['Les champignons', 'Ce sont surtout des décomposeurs.']], 'Ils fabriquent la matière organique par photosynthèse.'],
    ['Les légumineuses enrichissent le sol en :', 'Azote', [['Plastique', 'Ami espère que non.'], ['Sel', 'Non.']], 'Symbiose avec des bactéries fixatrices d’azote.'],
    ['La biodiversité désigne :', 'La diversité des écosystèmes, des espèces et des gènes', [['Uniquement le nombre d’arbres', 'C’est bien plus large.'], ['Une marque d’engrais', 'Non.']], 'Trois niveaux de diversité.'],
    ['Une haie dans un paysage agricole :', 'Abrite des auxiliaires et limite l’érosion', [['Rend le sol stérile', 'C’est l’inverse.'], ['N’a aucun rôle', 'Elle sert de refuge et de brise-vent.']], 'Infrastructure agroécologique.'],
    ['Le compostage transforme les déchets organiques grâce :', 'Aux décomposeurs', [['À la lumière seule', 'Il faut des êtres vivants décomposeurs.'], ['Au plastique', 'Non.']], 'Bactéries, champignons, vers…']
  ];
  const EPPCS = [
    ['Une estimation courante de la fréquence cardiaque maximale est :', '220 − âge', [['220 + âge', 'La FC max diminue avec l’âge : on soustrait.'], ['100 × âge', 'Le cœur exploserait de rire.']], 'Formule approximative, variable selon les individus.'],
    ['Lors d’un effort court et très intense (moins de 10 secondes), la filière énergétique dominante est :', 'Anaérobie alactique', [['Aérobie', 'L’aérobie domine pour les efforts longs.'], ['La digestion', 'Bien tenté.']], 'Phosphocréatine.'],
    ['La VMA, c’est :', 'La vitesse maximale aérobie', [['La vitesse minimale autorisée', 'Ça, c’est le code de la route.'], ['Le volume musculaire actif', 'Non.']], 'Vitesse à laquelle on atteint la consommation maximale de dioxygène.'],
    ['L’échauffement sert surtout à :', 'Préparer le corps à l’effort et limiter les blessures', [['Fatiguer avant de commencer', 'Non.'], ['Remplacer l’entraînement', 'Non.']], 'Montée progressive en température et en intensité.'],
    ['Les Jeux olympiques modernes ont été relancés par :', 'Pierre de Coubertin', [['Napoléon', 'Non.'], ['Jules Verne', 'Non.']], 'Premiers Jeux modernes à Athènes en 1896.'],
    ['Paris a accueilli les Jeux olympiques d’été en :', '2024', [['2012', '2012, c’était Londres.'], ['2016', '2016, c’était Rio.']], 'Paris a aussi organisé les Jeux de 1900 et 1924.']
  ];
  const LATIN = [
    ['« Rosa » au nominatif pluriel :', 'rosae', [['rosam', 'Ça, c’est l’accusatif singulier.'], ['rosis', 'Ça, c’est le datif ou l’ablatif pluriel.']], '1re déclinaison : rosa, rosae (pluriel).'],
    ['Qui a écrit l’Énéide ?', 'Virgile', [['Homère', 'Homère, c’est l’Iliade et l’Odyssée, en grec.'], ['Cicéron', 'Cicéron, ce sont des discours.']], 'Épopée latine.'],
    ['La Guerre des Gaules est de :', 'Jules César', [['Néron', 'Non.'], ['Sénèque', 'Sénèque, c’est la philosophie.']], 'Commentarii de bello Gallico.'],
    ['« Veni, vidi, vici » signifie :', 'Je suis venu, j’ai vu, j’ai vaincu', [['Je viens, je vois, je vis', '« Vici » vient de vincere : vaincre.'], ['Viens voir la ville', 'Non.']], 'Phrase attribuée à César.'],
    ['Le cas du complément d’objet direct en latin est :', 'L’accusatif', [['Le nominatif', 'Le nominatif, c’est le cas du sujet.'], ['Le génitif', 'Le génitif marque le complément du nom.']], 'Accusatif = COD.']
  ];
  const GREC = [
    ['La première lettre de l’alphabet grec est :', 'Alpha', [['Oméga', 'Oméga est la dernière.'], ['Delta', 'Delta est la quatrième.']], 'Alpha, bêta, gamma, delta…'],
    ['L’Iliade raconte :', 'Un épisode de la guerre de Troie', [['Le retour d’Ulysse', 'Ça, c’est l’Odyssée.'], ['La fondation de Rome', 'Ça, c’est l’Énéide, en latin.']], 'La colère d’Achille.'],
    ['Antigone est une tragédie de :', 'Sophocle', [['Aristophane', 'Aristophane écrit des comédies.'], ['Platon', 'Platon est philosophe.']], 'Ve siècle avant J.-C.'],
    ['Le mot « démocratie » vient du grec et signifie :', 'Le pouvoir du peuple', [['Le pouvoir des dieux', 'Dêmos = peuple, kratos = pouvoir.'], ['Le gouvernement d’un seul', 'Ça, c’est la monarchie.']], 'Dêmos + kratos.']
  ];

  // ═══════════════ LLCER : espagnol, allemand, italien, portugais, anglais monde contemporain ═══════════════
  const ES = [
    ['« Llevo dos años viviendo en Madrid. »', 'Je vis à Madrid depuis deux ans.', [['J’ai porté deux ans à Madrid.', 'Llevar + durée + gérondif : « depuis ».'], ['Je vivrai deux ans à Madrid.', 'Aucun futur ici.']], 'Llevar + durée + gérondif.'],
    ['« Embarazada » signifie :', 'Enceinte', [['Embarrassée', 'Faux ami célèbre ! Embarrassée se dit « avergonzada ».'], ['Embrassée', 'Non.']], 'Faux ami.'],
    ['« Sin embargo » se traduit par :', 'Cependant', [['Sans embargo', 'Traduction mot à mot : le prof d’espagnol tombe de sa chaise.'], ['Donc', '« Donc », c’est « por lo tanto ».']], 'Connecteur d’opposition.'],
    ['« Ojalá llueva. » signifie :', 'Pourvu qu’il pleuve.', [['Il pleut beaucoup.', 'Ojalá exprime un souhait.'], ['Il ne pleut jamais.', 'Non.']], 'Ojalá + subjonctif.'],
    ['« Constipado » signifie :', 'Enrhumé', [['Constipé', 'Faux ami ! Le nez bouché, pas autre chose.'], ['Construit', 'Non.']], 'Faux ami.'],
    ['Pour dire « je suis fatigué » (état passager) :', 'Estoy cansado.', [['Soy cansado.', 'État passager : estar, pas ser.'], ['Tengo cansado.', 'Non.']], 'Ser (identité) / estar (état).']
  ];
  const DE = [
    ['« Ich wohne seit drei Jahren in Berlin. »', 'J’habite à Berlin depuis trois ans.', [['J’ai habité à Berlin il y a trois ans.', '« Seit » + présent : action qui dure encore.'], ['J’habiterai à Berlin dans trois ans.', 'Aucun futur ici.']], 'Seit + présent.'],
    ['« Das Gift » signifie :', 'Le poison', [['Le cadeau', 'Faux ami ! Le cadeau, c’est « das Geschenk ».'], ['La gifle', 'Non.']], 'Faux ami.'],
    ['« bekommen » signifie :', 'Recevoir', [['Devenir', 'Faux ami avec l’anglais « become ». Devenir, c’est « werden ».'], ['Commencer', 'Commencer, c’est « beginnen ».']], 'Faux ami.'],
    ['« Obwohl es regnet, gehen wir spazieren. »', 'Bien qu’il pleuve, nous allons nous promener.', [['Parce qu’il pleut, nous allons nous promener.', '« Obwohl » marque la concession, pas la cause.'], ['Il pleut, donc nous restons.', 'Non.']], 'Obwohl = bien que ; verbe à la fin de la subordonnée.'],
    ['Dans une subordonnée introduite par « weil », le verbe conjugué se place :', 'À la fin', [['En première position', 'Non : c’est la règle des subordonnées.'], ['En deuxième position', 'Ça, c’est la principale.']], 'Verbe conjugué en dernière position.'],
    ['« trotzdem » se traduit par :', 'Malgré tout', [['À cause de cela', 'Non : c’est l’opposition.'], ['Ensuite', 'Ensuite, c’est « dann ».']], 'Connecteur d’opposition.']
  ];
  const IT = [
    ['« Abito a Roma da due anni. »', 'J’habite à Rome depuis deux ans.', [['J’ai habité à Rome deux ans.', '« Da » + présent : depuis.'], ['J’habiterai à Rome deux ans.', 'Non.']], 'Da + présent.'],
    ['« Il burro » signifie :', 'Le beurre', [['Le bureau', 'Faux ami ! Le bureau, c’est « l’ufficio ».'], ['L’âne', 'L’âne, c’est « l’asino ».']], 'Faux ami.'],
    ['« Caldo » signifie :', 'Chaud', [['Froid', 'Piège ! Froid, c’est « freddo ».'], ['Calme', 'Non.']], 'Faux ami.'],
    ['« Tuttavia » se traduit par :', 'Cependant', [['Toujours', 'Toujours, c’est « sempre ».'], ['Tout de suite', 'Tout de suite, c’est « subito ».']], 'Connecteur d’opposition.'],
    ['« Morbido » signifie :', 'Doux, moelleux', [['Morbide', 'Faux ami !'], ['Mordant', 'Non.']], 'Faux ami.']
  ];
  const PT = [
    ['« Moro em Lisboa há dois anos. »', 'J’habite à Lisbonne depuis deux ans.', [['Je suis mort à Lisbonne il y a deux ans.', 'Morar = habiter. Rien de dramatique.'], ['J’habiterai à Lisbonne.', 'Non.']], 'Há + durée.'],
    ['« Esquisito » signifie :', 'Bizarre', [['Exquis', 'Faux ami !'], ['Esquissé', 'Non.']], 'Faux ami.'],
    ['« Puxar » signifie :', 'Tirer', [['Pousser', 'Piège classique sur les portes ! Pousser, c’est « empurrar ».'], ['Poncer', 'Non.']], 'Faux ami.'],
    ['« Contudo » se traduit par :', 'Cependant', [['Avec tout', 'Mot à mot raté.'], ['Donc', 'Non.']], 'Connecteur d’opposition.']
  ];
  const AMC = [
    ['Une thématique d’anglais monde contemporain :', '« Environnements en mutation »', [['« Imaginaires »', 'C’est une thématique de LLCER anglais en première.'], ['« La guerre froide »', 'C’est de l’histoire.']], 'Aussi : « Faire société », « Relation au monde ».'],
    ['« Policy » se traduit plutôt par :', 'Une politique (un ensemble de mesures)', [['La police', 'La police, c’est « the police ».'], ['La politesse', 'Non.']], 'Policy ≠ politics ≠ police.'],
    ['« Unemployment rate » signifie :', 'Le taux de chômage', [['Le taux d’emploi', 'Le préfixe un- inverse le sens.'], ['Le salaire minimum', 'Ça, c’est « minimum wage ».']], 'Vocabulaire économique.'],
    ['« Climate change mitigation » désigne :', 'L’atténuation du changement climatique', [['L’adaptation au changement climatique', 'L’adaptation, c’est « adaptation ».'], ['La négation du changement climatique', 'Non.']], 'Réduire les émissions.']
  ];

  // ═══════════════ BAC TECHNOLOGIQUE ═══════════════
  function stmgGestion(r){
    const pa = un(r, [20, 40, 60]), coef = un(r, [1.5, 1.8, 2]), pvht = pa * coef, tva = 20, q = un(r, [200, 500, 1000]), cf = un(r, [6000, 10000, 15000]);
    const mcu = pvht - pa, seuil = Math.ceil(cf / mcu);
    return { titre:'Management, sciences de gestion et numérique', pts:20, contexte:'Une boutique achète un article ' + pa + ' € HT et applique un coefficient multiplicateur de ' + nb(coef) + ' pour obtenir son prix de vente HT. Charges fixes annuelles : ' + cf + ' €. Prévision : ' + q + ' articles vendus.',
      questions:QS([
        ['Prix de vente HT ?', nb(pvht) + ' €', [[nb(pa + coef) + ' €', 'Un coefficient MULTIPLIE, il ne s’ajoute pas.'], [nb(pa / coef) + ' €', 'Diviser ferait vendre à perte. Le comptable s’évanouit.']], 'PV HT = coût d’achat × coefficient.'],
        ['Prix de vente TTC (TVA 20 %) ?', nb(pvht * 1.2) + ' €', [[nb(pvht + 20) + ' €', 'On ajoute 20 %, pas 20 €.'], [nb(pvht * 0.8) + ' €', 'Ça, c’est une remise de 20 %.']], 'TTC = HT × 1,2.'],
        ['Marge unitaire ?', nb(mcu) + ' €', [[nb(pvht) + ' €', 'Il faut retirer le coût d’achat.'], [nb(mcu * q) + ' €', 'Ça, c’est la marge totale.']], 'Marge = PV HT − coût d’achat.'],
        ['Seuil de rentabilité en quantité ?', seuil + ' articles', [[Math.ceil(cf / pvht) + ' articles', 'On divise par la MARGE unitaire, pas par le prix de vente.'], [Math.ceil(cf / pa) + ' articles', 'Non : par la marge unitaire.']], 'Charges fixes ÷ marge sur coût variable unitaire.'],
        ['Le seuil sera-t-il atteint avec ' + q + ' ventes ?', q >= seuil ? 'Oui' : 'Non', [[q >= seuil ? 'Non' : 'Oui', 'Compare ' + q + ' et ' + seuil + '.'], ['On ne peut pas savoir', 'Si : il suffit de comparer.']], 'Comparer prévision et seuil.'],
        ['Un progiciel de gestion intégré (PGI) sert à :', 'Centraliser les données de tous les services', [['Jouer en ligne', 'Non.'], ['Remplacer les clients', 'Non.']], 'Base de données unique.']
      ]) };
  }
  const DROIT_ECO = [
    ['Un contrat est valable s’il réunit notamment :', 'Le consentement des parties, leur capacité et un contenu licite et certain', [['Une signature au stylo bleu', 'La couleur du stylo n’a aucune importance juridique.'], ['Un notaire dans tous les cas', 'Le notaire n’est obligatoire que pour certains actes.']], 'Article 1128 du Code civil.'],
    ['La majorité civile en France est fixée à :', '18 ans', [['16 ans', 'Non.'], ['21 ans', 'C’était avant 1974.']], 'Depuis 1974.'],
    ['Le PIB mesure :', 'La richesse produite sur le territoire pendant une période', [['Le patrimoine des ménages', 'Le PIB est un flux, pas un stock.'], ['La dette publique', 'Non.']], 'Somme des valeurs ajoutées.'],
    ['L’inflation, c’est :', 'La hausse générale et durable des prix', [['La baisse des salaires', 'Non.'], ['La hausse du prix d’un seul produit', 'Il faut une hausse générale.']], 'Mesurée par l’indice des prix.'],
    ['Un contrat de travail comporte un lien de :', 'Subordination', [['Parenté', 'Non.'], ['Amitié', 'Non.']], 'Travail sous l’autorité d’un employeur, contre rémunération.'],
    ['La responsabilité civile oblige à :', 'Réparer le dommage causé à autrui', [['Aller en prison', 'Ça relève du pénal.'], ['Payer une amende à l’État', 'Ça relève aussi du pénal.']], 'Réparation.']
  ];
  function sti2d(r){
    const P = un(r, [500, 1000, 2000]), t = un(r, [2, 3, 5]), eta = un(r, [0.8, 0.9]), U = un(r, [12, 24, 230]), I = P / U;
    return { titre:'Ingénierie, innovation et développement durable · physique-chimie et maths', pts:20, contexte:'Un moteur de ' + P + ' W fonctionne ' + t + ' h sous ' + U + ' V, avec un rendement de ' + nb(eta) + '.',
      questions:QS([
        ['Énergie électrique consommée ?', nb(P * t / 1000, 1) + ' kWh', [[nb(P / t / 1000, 2) + ' kWh', 'E = P × t.'], [nb(P * t) + ' kWh', 'C’est en Wh : divise par 1 000.']], 'E = P × t.'],
        ['Intensité du courant ?', nb(I, 2) + ' A', [[nb(P * U) + ' A', 'P = U × I, donc I = P ÷ U.'], [nb(U / P, 3) + ' A', 'Division à l’envers.']], 'I = P ÷ U.'],
        ['Puissance mécanique utile ?', nb(P * eta) + ' W', [[nb(P / eta) + ' W', 'Avec les pertes, on récupère MOINS que la puissance absorbée.'], [String(P) + ' W', 'Et les pertes ?']], 'P utile = η × P absorbée.'],
        ['Une analyse du cycle de vie (ACV) évalue :', 'Les impacts environnementaux d’un produit de sa fabrication à sa fin de vie', [['Uniquement le prix', 'Non.'], ['La couleur du produit', 'Non.']], 'Du berceau à la tombe.'],
        ['Un capteur sert à :', 'Acquérir une information (grandeur physique)', [['Transformer l’énergie en mouvement', 'Ça, c’est un actionneur.'], ['Stocker l’énergie', 'Ça, c’est une batterie.']], 'Chaîne d’information.']
      ]) };
  }
  const ST2S = [
    ['Le diabète de type 1 est lié :', 'À un défaut de production d’insuline', [['À un excès d’insuline', 'C’est l’inverse.'], ['À un virus du rhume', 'Non.']], 'Destruction des cellules productrices d’insuline (maladie auto-immune).'],
    ['Le rôle principal des globules rouges est :', 'Transporter le dioxygène', [['Produire des anticorps', 'Ça, ce sont des lymphocytes.'], ['Coaguler le sang', 'Ça, ce sont surtout les plaquettes.']], 'Grâce à l’hémoglobine.'],
    ['La prévalence d’une maladie, c’est :', 'La proportion de personnes atteintes à un moment donné', [['Le nombre de nouveaux cas', 'Ça, c’est l’incidence.'], ['Le nombre de médecins', 'Non.']], 'Incidence = nouveaux cas ; prévalence = tous les cas.'],
    ['La Sécurité sociale a été créée en France en :', '1945', [['1789', 'Non.'], ['2000', 'Non.']], 'Ordonnances de 1945.'],
    ['Un déterminant de santé est :', 'Un facteur qui influence l’état de santé', [['Un médicament', 'Pas seulement : il peut être social, environnemental…'], ['Un hôpital', 'Non.']], 'Exemples : revenu, logement, alimentation, environnement.'],
    ['Le pH sanguin normal est d’environ :', '7,4', [['2', 'Ça, c’est l’estomac.'], ['10', 'Bien trop basique.']], 'Légèrement basique.']
  ];
  function stl(r){
    const C0 = un(r, [0.5, 1, 2]), f = un(r, [5, 10, 20]), V = un(r, [50, 100, 200]);
    return { titre:'Biochimie-biologie-biotechnologies · physique-chimie et maths', pts:20, contexte:'On dispose d’une solution mère à ' + nb(C0) + ' mol/L. On veut préparer ' + V + ' mL d’une solution diluée ' + f + ' fois.',
      questions:QS([
        ['Concentration de la solution fille ?', nb(C0 / f, 3) + ' mol/L', [[nb(C0 * f) + ' mol/L', 'Diluer fait BAISSER la concentration.'], [nb(C0) + ' mol/L', 'Et la dilution ?']], 'C fille = C mère ÷ facteur.'],
        ['Volume de solution mère à prélever ?', nb(V / f, 1) + ' mL', [[nb(V * f) + ' mL', 'On prélève moins que le volume final.'], [String(V) + ' mL', 'Ça, c’est le volume final.']], 'V mère = V fille ÷ facteur.'],
        ['Avec quelle verrerie prélever précisément ?', 'Une pipette jaugée', [['Un bécher', 'Un bécher n’est pas précis.'], ['Une éprouvette au hasard', 'Pas assez précis.']], 'Pipette jaugée + fiole jaugée.'],
        ['Une enzyme est :', 'Un catalyseur biologique, le plus souvent une protéine', [['Un sucre', 'Non.'], ['Un virus', 'Non.']], 'Elle accélère une réaction spécifique.'],
        ['La PCR permet de :', 'Amplifier un fragment d’ADN', [['Détruire l’ADN', 'C’est l’inverse.'], ['Compter les globules', 'Non.']], 'Réaction en chaîne par polymérase.']
      ]) };
  }
  const STD2A = [
    ['Une charte graphique définit :', 'Les règles visuelles d’une identité (couleurs, typographies, logos)', [['Le prix d’un produit', 'Non.'], ['L’horaire d’un magasin', 'Non.']], 'Cohérence visuelle.'],
    ['Le Bauhaus est une école de design fondée en :', 'Allemagne, en 1919', [['Italie, en 1960', 'Non.'], ['France, en 1789', 'Non.']], 'Walter Gropius, Weimar.'],
    ['Un cahier des charges en design précise :', 'Les besoins et contraintes du projet', [['Les dessins finaux', 'Non : il vient avant.'], ['La liste des courses', 'Non.']], 'Base du projet.'],
    ['Une typographie « sans empattement » s’appelle aussi :', 'Une linéale (sans serif)', [['Une gothique', 'Non.'], ['Une manuscrite', 'Non.']], 'Exemple : Helvetica.'],
    ['L’éco-conception vise à :', 'Réduire l’impact environnemental d’un produit dès sa conception', [['Augmenter les emballages', 'Non.'], ['Rendre le produit jetable', 'Non.']], 'Pensée sur tout le cycle de vie.']
  ];
  function sthr(r){
    const cm = un(r, [3, 4, 5]), coef = un(r, [3.5, 4]), pvht = cm * coef, cov = un(r, [40, 60, 80]);
    return { titre:'Économie-gestion hôtelière · sciences et technologies culinaires et des services', pts:20, contexte:'Un plat a un coût matière de ' + cm + ' € par portion. Le restaurant applique un coefficient multiplicateur de ' + nb(coef) + ' pour obtenir le prix de vente HT. Il sert ' + cov + ' couverts.',
      questions:QS([
        ['Prix de vente HT d’une portion ?', nb(pvht) + ' €', [[nb(cm + coef) + ' €', 'On multiplie par le coefficient.'], [nb(cm) + ' €', 'Vendre au prix coûtant : le chef pleure.']], 'PV HT = coût matière × coefficient.'],
        ['Ratio coût matière (en % du prix de vente HT) ?', nb(cm / pvht * 100, 1) + ' %', [[nb(pvht / cm * 100, 1) + ' %', 'Ratio à l’envers : plus de 100 %, impossible.'], [nb(coef * 10, 1) + ' %', 'Non.']], 'Coût matière ÷ PV HT × 100.'],
        ['Chiffre d’affaires HT pour ' + cov + ' couverts ?', nb(pvht * cov) + ' €', [[nb(cm * cov) + ' €', 'Ça, c’est le coût matière total.'], [nb(pvht + cov) + ' €', 'On multiplie, pas on additionne.']], 'PV HT × nombre de couverts.'],
        ['La « marche en avant » en cuisine sert à :', 'Éviter que le propre croise le sale', [['Marcher plus vite', 'Non.'], ['Décorer les assiettes', 'Non.']], 'Règle d’hygiène.'],
        ['Le taux d’occupation d’un hôtel, c’est :', 'Chambres occupées ÷ chambres disponibles', [['Le nombre de clients mécontents', 'Non.'], ['Le prix moyen d’une chambre', 'Ça, c’est le prix moyen.']], 'Indicateur clé en hôtellerie.']
      ]) };
  }
  const S2TMD = [
    ['Dans « Le Sacre du printemps », la musique est de :', 'Stravinsky', [['Mozart', 'Non : début du XXe siècle.'], ['Debussy', 'Pas lui.']], 'Ballet créé en 1913.'],
    ['Une partition d’orchestre complète s’appelle :', 'Un conducteur', [['Un livret', 'Le livret, ce sont les paroles d’un opéra.'], ['Un pupitre', 'Le pupitre est un meuble ou un groupe d’instruments.']], 'Utilisé par le chef d’orchestre.'],
    ['En théâtre, la « mise en scène » désigne :', 'L’ensemble des choix pour représenter la pièce sur scène', [['Le texte de l’auteur seul', 'Non.'], ['Les billets', 'Non.']], 'Jeu, espace, lumière, son…'],
    ['Un pas de deux est :', 'Une danse à deux danseurs', [['Un pas de travers', 'Non.'], ['Une danse en groupe', 'Non.']], 'Ballet classique.']
  ];

  // ═══════════════ Assemblage ═══════════════
  const P = {
    'spe-arts-hda':{ titre:'Spécialité arts · histoire des arts', duree:'3 h 30', officiel:'Composition sur documents OU dissertation', faire:r => [bloc('Repères et méthode', 20, '', HDA, r, 6)], matiere:'histoire', nonNote:'Dissertation sur papier, par exemple : « Eugène Viollet-le-Duc : réparer et/ou repenser le monument ? »' },
    'spe-arts-cinema':{ titre:'Spécialité arts · cinéma-audiovisuel', duree:'3 h 30', officiel:'Analyse et commentaire de séquences', faire:r => [bloc('Langage du cinéma et repères', 20, '', CINEMA, r, 5)], matiere:'histoire' },
    'spe-arts-musique':{ titre:'Spécialité arts · musique', duree:'3 h 30', officiel:'Écoute, analyse et écriture musicale', faire:r => [bloc('Solfège, repères et analyse', 20, '', MUSIQUE, r, 5)], matiere:'histoire' },
    'spe-arts-theatre':{ titre:'Spécialité arts · théâtre', duree:'3 h 30', officiel:'Réflexion sur le théâtre et projet de mise en scène', faire:r => [bloc('Vocabulaire et repères du théâtre', 20, '', THEATRE, r, 5)], matiere:'francais' },
    'spe-arts-plastiques':{ titre:'Spécialité arts plastiques', duree:'3 h 30', officiel:'Partie écrite + partie pratique', faire:r => [bloc('Notions et repères', 20, '', ARTS_PLA, r, 4)], matiere:'histoire' },
    'spe-arts-danse':{ titre:'Spécialité arts · danse', duree:'3 h 30', officiel:'Partie écrite + partie pratique', faire:r => [bloc('Notions et repères', 20, '', DANSE, r, 3)], matiere:'histoire' },
    'spe-bioeco':{ titre:'Spécialité biologie-écologie', duree:'3 h 30', officiel:'Exercices sur documents', faire:r => [bloc('Écologie et agronomie', 20, '', BIOECO, r, 6)], matiere:'svt' },
    'spe-eppcs':{ titre:'Spécialité EPPCS (sport)', duree:'3 h 30', officiel:'Partie écrite + évaluation pratique', faire:r => [bloc('Physiologie, entraînement et culture sportive', 20, '', EPPCS, r, 6)], matiere:'svt' },
    'spe-latin':{ titre:'Spécialité LLCA latin', duree:'3 h 30', officiel:'Traduction, commentaire et culture', faire:r => [bloc('Langue et culture latines', 20, '', LATIN, r, 5)], matiere:'francais' },
    'spe-grec':{ titre:'Spécialité LLCA grec', duree:'3 h 30', officiel:'Traduction, commentaire et culture', faire:r => [bloc('Langue et culture grecques', 20, '', GREC, r, 4)], matiere:'francais' },
    'spe-espagnol':{ titre:'Spécialité LLCER espagnol', duree:'3 h 30', officiel:'Synthèse (16 pts) + traduction (4 pts)', faire:r => [bloc('Traduction, faux amis et grammaire', 20, 'Traduis ou choisis le bon sens.', ES, r, 6)], matiere:'anglais', nonNote:'Synthèse d’environ 500 mots en espagnol, à faire sur papier.' },
    'spe-allemand':{ titre:'Spécialité LLCER allemand', duree:'3 h 30', officiel:'Synthèse (16 pts) + traduction (4 pts)', faire:r => [bloc('Traduction, faux amis et grammaire', 20, 'Traduis ou choisis le bon sens.', DE, r, 6)], matiere:'anglais', nonNote:'Synthèse d’environ 500 mots en allemand, à faire sur papier.' },
    'spe-italien':{ titre:'Spécialité LLCER italien', duree:'3 h 30', officiel:'Synthèse (16 pts) + traduction (4 pts)', faire:r => [bloc('Traduction, faux amis et grammaire', 20, 'Traduis ou choisis le bon sens.', IT, r, 5)], matiere:'anglais', nonNote:'Synthèse d’environ 500 mots en italien, à faire sur papier.' },
    'spe-portugais':{ titre:'Spécialité LLCER portugais', duree:'3 h 30', officiel:'Synthèse (16 pts) + traduction (4 pts)', faire:r => [bloc('Traduction, faux amis et grammaire', 20, 'Traduis ou choisis le bon sens.', PT, r, 4)], matiere:'anglais', nonNote:'Synthèse d’environ 500 mots en portugais, à faire sur papier.' },
    'spe-amc':{ titre:'Spécialité anglais monde contemporain', duree:'3 h 30', officiel:'Synthèse (16 pts) + traduction ou transposition (4 pts)', faire:r => [bloc('Vocabulaire et thématiques', 20, '', AMC, r, 4)], matiere:'anglais', nonNote:'Synthèse d’environ 500 mots en anglais, à faire sur papier.' },
    // Bac technologique : deux épreuves de spécialité par série (coefficient 16 chacune).
    'tech-stmg-msgn':{ titre:'STMG · management, sciences de gestion et numérique', duree:'4 h', officiel:'Étude de gestion', faire:r => [stmgGestion(r)], matiere:'maths' },
    'tech-stmg-droit':{ titre:'STMG · droit et économie', duree:'4 h', officiel:'Économie + droit', faire:r => [bloc('Droit et économie', 20, '', DROIT_ECO, r, 6)], matiere:'histoire' },
    'tech-sti2d':{ titre:'STI2D · ingénierie + physique-chimie et maths', duree:'4 h + 3 h', officiel:'2I2D et physique-chimie-maths', faire:r => [sti2d(r)], matiere:'physique' },
    'tech-st2s':{ titre:'ST2S · chimie, biologie et physiopathologie humaines', duree:'3 h', officiel:'Sciences sanitaires et sociales', faire:r => [bloc('Biologie, physiopathologie et santé publique', 20, '', ST2S, r, 6)], matiere:'svt' },
    'tech-stl':{ titre:'STL · biochimie-biologie-biotechnologies', duree:'3 h', officiel:'Biotechnologies + physique-chimie et maths', faire:r => [stl(r)], matiere:'physique' },
    'tech-std2a':{ titre:'STD2A · analyse et méthodes en design', duree:'4 h', officiel:'Analyse de produits et démarche de design', faire:r => [bloc('Design et arts appliqués', 20, '', STD2A, r, 5)], matiere:'histoire' },
    'tech-sthr':{ titre:'STHR · économie-gestion hôtelière', duree:'4 h', officiel:'Économie-gestion + sciences culinaires et des services', faire:r => [sthr(r)], matiere:'maths' },
    'tech-s2tmd':{ titre:'S2TMD · culture et sciences chorégraphiques, musicales ou théâtrales', duree:'4 h', officiel:'Culture artistique et analyse', faire:r => [bloc('Danse, musique, théâtre', 20, '', S2TMD, r, 4)], matiere:'histoire' }
  };
  Object.assign(E.EPREUVES, P);
  const GENERALES = ['spe-arts-hda', 'spe-arts-cinema', 'spe-arts-musique', 'spe-arts-theatre', 'spe-arts-plastiques', 'spe-arts-danse', 'spe-bioeco', 'spe-eppcs', 'spe-latin', 'spe-grec', 'spe-espagnol', 'spe-allemand', 'spe-italien', 'spe-portugais', 'spe-amc'];
  E.SPES = (E.SPES || []).concat(GENERALES);
  for(const id of GENERALES) E.BLANCS['tle-' + id] = { titre:P[id].titre, ic:'🎒', niveau:'Tle', epreuves:[[id, 1]], tle:true };
  // Bac technologique : par série, les deux spécialités (coefficient 16) + la philosophie (coefficient 4 en voie technologique).
  E.SERIES_TECHNO = {
    stmg:['STMG', ['tech-stmg-msgn', 'tech-stmg-droit']], sti2d:['STI2D', ['tech-sti2d']], st2s:['ST2S', ['tech-st2s']], stl:['STL', ['tech-stl']],
    std2a:['STD2A', ['tech-std2a']], sthr:['STHR', ['tech-sthr']], s2tmd:['S2TMD', ['tech-s2tmd']]
  };
  for(const [k, [nom, eps]] of Object.entries(E.SERIES_TECHNO))
    E.BLANCS['techno-' + k] = { titre:'Bac techno ' + nom + ' blanc', ic:'🛠️', niveau:'Tle', techno:true, epreuves:eps.map(id => [id, 16]).concat(E.EPREUVES.philo ? [['philo', 4]] : []),
      bilan:'Au vrai bac technologique, chaque série a deux épreuves de spécialité (coefficient 16 chacune), plus la philosophie, le français, le grand oral et le contrôle continu.' };
  E._test.plus = { stmgGestion, sti2d, stl, sthr };
})();
