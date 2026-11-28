# Ami des mots — historique des versions

Toutes les notes de version, de la plus récente à la plus ancienne.
Avant la v6.44, chaque version avait son propre fichier VERSION-x.y.txt à la racine du projet ; ils sont tous réunis ici, sans modification.

---

## Version 10.10.0

- Mise à jour forcée des appareils restés sur un ancien code : quand la nouvelle version prend la main, le service worker demande à chaque onglet ouvert s’il sait se mettre à jour seul (js/maj-auto.js, chargé sur toutes les pages). Un onglet qui ne répond pas en 3 secondes tourne sur l’ancien code : il est rechargé d’office. Les pages récentes, elles, choisissent le bon moment (jamais au milieu d’une série).
- ST2S : 6 sujets rédigés type bac 2027 — 3 dossiers de STSS (renoncement aux soins des jeunes, maintien à domicile des personnes âgées, surpoids de l’enfant ; 5 + 13 + 2 points) et 3 cas cliniques de CBPH (diabète de type 2, grippe en établissement pour personnes âgées, dépistage du cancer colorectal). Documents originaux, données fictives annoncées.
- Chaque sujet a un corrigé question par question avec le détail des points ; il s’affiche après la vérification de la copie. Vérification de méthode sans IA propre à la ST2S : toutes les questions traitées, chiffres avec unités, références aux documents, notions du programme, vocabulaire scientifique, raisonnement en étapes.
- Les bacs blancs ST2S (CBPH et STSS) ont maintenant leur partie rédigée, tirée parmi ces sujets.
- Tests v10.10 (dont un test qui exécute le service worker avec deux onglets, l’un récent, l’autre ancien).

## Version 10.9.0

Mise à jour automatique, y compris sur les ordinateurs.

- Le jeu redemande la dernière version toutes les 30 minutes, à chaque retour sur l’onglet (après 5 minutes) et au retour du réseau. Avant, il ne vérifiait qu’à l’ouverture : un onglet ou une appli installée restés ouverts des jours gardaient l’ancienne version.
- Quand la nouvelle version est prête : rechargement immédiat si le jeu vient d’être ouvert ou si l’on est sur un écran d’accueil ; sinon au prochain retour à l’accueil (jamais au milieu d’une série), avec un bandeau « Mettre à jour » pour ne pas attendre. Avant, si la version arrivait pendant une activité, rien ne se passait jusqu’à la visite suivante.
- Le service worker télécharge les fichiers de la nouvelle version sur le serveur (cache:'reload'), jamais dans le cache HTTP du navigateur : sur un hébergement qui garde les fichiers quelques minutes (GitHub Pages), d’anciens fichiers pouvaient sinon entrer dans la nouvelle version.
- Test v10.9.

## Version 10.8.0

Série ST2S (sciences et technologies de la santé et du social), la voie technologique la plus suivie pour devenir infirmier ou infirmière, vérifiée sur les programmes officiels et la note de service du 11-09-2026 (session 2027).

- Nouvelle matière « ST2S » avec 15 chapitres :
  - 1re : biologie et physiopathologie humaines (organisation et motricité, digestion et nutrition, cardio-vasculaire, respiratoire), STSS (santé, bien-être, cohésion sociale et indicateurs ; protection sociale et modes d’intervention), physique-chimie pour la santé ;
  - Tle : CBPH (milieu intérieur et diabètes ; immunité, grippe, vaccination, antibiorésistance ; reproduction ; gènes et cancer ; chimie : prévenir, analyser, choisir), STSS (politiques de santé ; politiques sociales ; démarche de projet et méthode de l’épreuve).
- 165 questions rédigées, chacune avec une explication détaillée ; des cas cliniques pour entraîner le raisonnement diagnostique demandé en 2027 ; calculs générés à l’infini (taux d’incidence, prévalence, évolution en %, dilutions, masses, doses en mg/kg, pH).
- 15 fiches de cours (essentiel, exemple corrigé, méthode, pièges), utilisées par « 💡 Comment répondre ? ».
- Épreuves corrigées : CBPH 4 h (chimie ≈ 1 h coef. 3, BPH ≈ 3 h coef. 13) au lieu de « 3 h » ; épreuve de STSS ajoutée (3 h, 5 + 13 + 2 points) ; le bac blanc ST2S contient les deux.
- Test v10.8.

## Version 10.7.0

Audit de sécurité (détail dans docs/SECURITE.md, section « Audit v10.7 »).

- CSP sur toutes les pages (professeur, 3D, Mots City, mentions légales) ; empreintes des scripts en ligne tenues par outils/csp-pages.py.
- En-têtes HTTP : HSTS, anti-cadre (X-Frame-Options, frame-ancestors), Permissions-Policy, Cross-Origin-Opener-Policy.
- docs/ n'est plus publié ; dossiers de travail refusés par .htaccess ; bibliothèques PHP credits-lib et veille-publier interdites d'accès direct.
- Veille : redirections vérifiées une à une ; jeton accepté dans l'en-tête X-Veille-Jeton.
- Échappement d'un mot de dictée et des scores venus du serveur ; .gitignore complété (réglages, clés).
- Tests v10.7 (jeu) et 2 tests serveur de plus.

## Version 10.6.1

- Écran de question rangé : le chrono est en haut à droite (il formait une grande colonne vide), « Sûr(e) / Pas sûr(e) » est sous la question, la réponse écrite prend la place des choix.
- Réponse écrite guidée : « Réponse attendue : un seul mot » (ou « 3 mots »…), et un message plus clair après « Je ne sais pas : montre les choix ».
- Questions de forme de phrase précisées : une phrase a plusieurs formes à la fois (affirmative ou négative, active ou passive, neutre ou emphatique), donc chaque question dit laquelle on cherche ; explication détaillée pour « C’est Lina qui a gagné. » (fr, en, es).
- « 💡 Comment répondre ? » sur chaque question (maths et matières) : l’aide s’ouvre sans quitter la question, avec l’essentiel de la leçon et la méthode (fiche de cours, ou explications des autres questions du chapitre). Elle ne donne jamais la réponse de la question posée.
- Test v10.6.1.

## Version 10.6.0

Français complété d’après la vérification des programmes officiels.

- Conjugaison : le générateur propose maintenant le plus-que-parfait, le futur antérieur, le passé antérieur, l’impératif présent (tu, nous, vous, sans pronom) et le subjonctif présent (« que je… », à partir de la 4e). Chaque correction donne la règle de formation puis la conjugaison complète du verbe, en français, anglais et espagnol.
- Le subjonctif n’est plus proposé en 5e dans « Conjugaison : subjonctif, impératif… » ; sept questions d’impératif, de conditionnel et de temps composés le remplacent.
- Nouveaux chapitres (20 questions chacun, traduits en anglais et en espagnol, avec fiche de cours) :
  - 6e : récits des origines, poésie, théâtre « se masquer, jouer, déjouer », récits d’aventure, monstres ;
  - 5e : comédie et société sens dessus dessous, fables, paroles rapportées, registres, néologismes, valeurs du présent et de l’imparfait ;
  - 4e : informer, s’informer, déformer ? (presse, fait et opinion, sources), la ville, discours indirect et indirect libre ;
  - 3e : se raconter, dénoncer, progrès et rêves scientifiques, dystopies ;
  - 2nde : littérature d’idées et presse, poésie du Moyen Âge au XVIIIe siècle, valeurs des temps, lexique ;
  - 1re : subordonnées circonstancielles et choix du mode.
- Test v10.6.

## Version 10.5.0 — Maths complétées d’après les programmes, Plumo vivant, bravos jamais répétés

- Maths (js/maths-2026-complements.js, 6 langues, corrections calculées, explications détaillées) : 6e multiplier et diviser des décimaux, encadrer, médiatrice / bissectrice / cercle circonscrit ; 5e hauteurs, médianes, médiatrices ; 2nde parité, écart type, boîte à moustaches, stabilisation des fréquences ; 1re approximation affine, dérivée de g(ax + b), projeté orthogonal, indépendance et épreuves de Bernoulli, variance ; terminale récurrence, équations différentielles, intégration par parties, sommes de variables aléatoires et loi des grands nombres. Une fiche de cours par notion (js/cours-fiches-complements.js).
- Plumo vivant (js/plumo-vivant.js) : respiration plus marquée, gestes au repos tirés au hasard toutes les 3 à 7 secondes (regarder autour, pencher la tête, sautiller, se dandiner, gonfler ses plumes, hocher la tête, faire un tour), le hibou se tourne vers le pointeur et réagit quand on le touche. Tout s’arrête si le système demande moins d’animations ou en mode facile.
- Bravos jamais répétés : plus de 300 phrases composées par langue (ouverture × réaction de Plumo), tirées sans remise grâce à la mémoire des vannes ; utilisées par les matières, le coin maths et le labo de sciences, et une fois sur deux en français.
- Nouveau test v10.5.

## Version 10.4.0 — Anglais du lycée au programme de 2025, premières corrections du rapport de conformité

- Anglais 2nde, 1re et terminale : les chapitres « Les axes du programme de 2nde » et « Les axes de 1re et de terminale » décrivaient le programme de 2019 (huit axes, thèmes « L’art de vivre ensemble » et « Gestes fondateurs et mondes en mouvement »). Ils suivent désormais le programme de langues vivantes du BO n° 22 du 29 mai 2025 : six axes par classe, l’axe 6 obligatoire (Commonwealth en 2nde, aires anglophones américaines en 1re, Royaume-Uni et ses nations en terminale), niveaux B1+ (2nde, 1re) et B2 (terminale) en LVA. Nouveau fichier js/mat-anglais-axes-2025.js ; fiches de cours réécrites.
- SVT (gamètes) : l’énoncé précise « chez l’être humain » ; la réponse devient « 23 chromosomes : un seul chromosome de chaque paire », avec une explication complète (46 chromosomes en 23 paires, méiose, fécondation), en 6 langues.
- Tests : la suite principale libère la mémoire après chaque test (`--expose-gc`) ; elle dépassait 4 Go sans cela.
- Nouveau test v10.4.

## Version 10.3.1 — Camp d’entraînement lisible

- Le cadre du grade avait un fond crème sous un texte presque blanc : il prend maintenant le fond translucide des autres cartes, texte clair.
- La mission du jour affichait deux numérotations (« 1. » à gauche et « ⬜ 1. » au centre) : la liste n’a plus de puces et reste groupée au centre, alignée à gauche.
- Fiches de cours, corrigés d’examen et Grand oral blanc : listes alignées à gauche, support et grille lisibles sur fond sombre.
- Nouveau test v10.3.1.

## Version 10.3.0 — Grand oral blanc au camp d’entraînement

- Nouveau module js/mod-grand-oral.js, accessible depuis le camp (carte « 🎤 Grand oral blanc »), au format de la session 2027.
- L’élève écrit ses deux questions (gardées sur l’appareil ; un thème sans point d’interrogation est refusé avec une vanne de Plumo), le jury en tire une.
- 20 minutes de préparation chronométrées avec un support facultatif, 10 minutes de présentation (arrêt automatique au bout de 10 minutes), puis 10 minutes d’échange : six questions de relance tirées parmi seize, qu’un proche peut lire à voix haute.
- Auto-évaluation sur les cinq critères de la grille indicative (quatre niveaux chacun) : note indicative sur 20, moins 2 points si la présentation dure moins de 8 minutes ; critère à travailler en priorité ; lien vers le chapitre « Grand oral ».
- Rien n’est enregistré (ni voix ni image) ; les essais apparaissent dans l’Espace parents. Écrans traduits en anglais, espagnol, allemand, italien et portugais.
- Nouveau test v10.3.

## Version 10.2.0 — Philosophie de terminale : méthode du bac et Grand oral

- Nouveau chapitre de philosophie « Méthode du bac : la dissertation et l’explication de texte » (20 questions) : analyse du sujet, problématique, plan, transitions, conclusion, explication sans paraphrase, en fait / en droit, gestion du brouillon.
- Nouveau chapitre « Le Grand oral : convaincre en 20 minutes » (20 questions) : modalités de la session 2027 (note de service du 17 septembre 2026), jury, support, grille d’évaluation, logos / ethos / pathos, attitude face au jury.
- Les deux chapitres en anglais, espagnol, italien et portugais, et une fiche de cours pour chacun.
- Correction des questions existantes sur le Grand oral : le troisième temps (projet d’orientation) a été supprimé à partir de la session 2024, et non 2026 ; le candidat peut s’appuyer sur un support préparé (il ne « parle pas sans notes »).
- Nouveau test v10.2.

## Version 10.1.0 — Français de 1re : un chapitre par objet d’étude du bac

- Quatre nouveaux chapitres de 1re (domaine « Le bac de français »), 20 questions chacun : poésie du XIXe au XXIe siècle, littérature d’idées du XVIe au XVIIIe siècle, roman et récit du Moyen Âge au XXIe siècle, théâtre du XVIIe au XXIe siècle.
- Œuvres et parcours au programme 2026-2027 (Rimbaud, Ponge, Dorion ; La Boétie, Fontenelle, Graffigny ; Chrétien de Troyes, Zola, Simone Schwarz-Bart ; Corneille, Musset, Sarraute), plus les notions d’analyse de chaque genre.
- Questions traduites en anglais et en espagnol (titres et parcours gardés en français, entre « »).
- Une fiche de cours par objet d’étude : l’essentiel, un exemple pas à pas, la méthode, les pièges, une vanne de Plumo.
- Nouveau test v10.1.

## Version 10.0.0

**📚 La base de connaissances est complète en français, anglais et maths** : les 20 notions d’anglais qui n’avaient pas de fiche en ont une (js/cours-fiches-anglais.js) — cours de l’année de la 6e à la 3e, grammaire de 6e et de 5e, jours/heures/nombres, pays et fêtes anglophones, Royaume-Uni, Irlande, États-Unis, axes de 2nde, compréhension de l’écrit, pièges de traduction, It’s time / I’d rather, et l’anglais du supérieur (certifications, anglais universitaire, scientifique, professionnel, niveau C1). Total : 264 fiches ; chaque chapitre de français, d’anglais et de maths, de la 6e au bac, a sa fiche rédigée.

**👨‍👩‍👧 Espace parents : le camp d’entraînement d’un coup d’œil** — grade, points, jours d’affilée, notions acquises, classe atteinte dans chaque matière (avec « en avance »), notes des tests de passage et meilleures notes des séries d’examen. Rien ne s’affiche tant que l’enfant n’a pas utilisé le camp.

## Version 9.9.0

**🚀 Prendre de l’avance** (camp d’entraînement) : un élève qui a appris toutes les leçons de son année peut préparer la classe suivante, **matière par matière** (français, anglais, maths).
- **Bilan de l’année** : pour chaque matière, la classe en cours et les notions acquises (validées à 7/10 dans le camp).
- **Test de passage** : 20 questions de toute l’année, 20 minutes, sans vanne pendant l’épreuve ; **15/20** pour réussir. Corrigé détaillé à la fin, dernière note gardée.
- **Classe suivante** : réussi, la matière passe au niveau supérieur (6e → 5e → … → Tle) — leçon du jour, séries sans filet, base de connaissances et fiches suivent ; +100 points. On peut en être en 5e en maths et en 6e en français.
- **Retour possible** à sa classe à tout moment ; une avance n’est jamais en dessous de la classe réelle (si l’élève change de classe, l’avance s’efface d’elle-même).
- **Au bout du programme** (1re en français, Tle en anglais et en maths) : place aux niveaux experts.
- La révision espacée des erreurs continue dans la mission du jour.

## Version 9.8.0

**📚 Fiches de cours dans la langue de l’interface** : une fiche peut maintenant avoir sa traduction (AMI_COURS.traduire / get(clé, langue)). Avec l’interface en anglais, la fiche s’affiche en anglais (balisée lang="en" pour les lecteurs d’écran) ; sans traduction, la version française reste affichée.
- **Les 13 fiches des niveaux experts sont traduites en anglais** (js/cours-fiches-en.js) : mathématicien, généticien, géophysicien. Ces trois niveaux sont donc entièrement en anglais (questions, vannes, règles et fiches).
- Les chapitres « Écrire » et « Parler » restent en français, comme toute la matière « Anglais (6e → bac) », faite pour les francophones qui apprennent l’anglais.

## Version 9.7.0

**🧬 Niveau généticien et 🌋 niveau géophysicien traduits en anglais** (js/mat-trad-en-experts.js) : 8 chapitres, 160 questions avec leurs vannes et leurs règles — génétique moléculaire, hérédité, évolution et génomique, génétique médicale ; sismologie, géodynamique, volcans et planètes, climat. Les trois niveaux experts sont maintenant entièrement disponibles en anglais (260 questions).
- Restent en français pour l’instant : chapitres « Écrire » et « Parler » d’anglais, fiches de cours.

## Version 9.6.0

**🧠 Niveau mathématicien traduit en anglais** (js/mat-trad-en-experts.js) : les 5 chapitres — raisonnement et logique, arithmétique, nombres complexes, suites et analyse, probabilités avancées — soit 100 questions avec leurs vannes et leurs règles. Avec l’interface en anglais, les séries de ce niveau sortent maintenant en anglais.
- Restent en français pour l’instant : niveaux généticien et géophysicien, chapitres « Écrire » et « Parler » d’anglais, fiches de cours (prochaines livraisons).

## Version 9.5.0

**📚 Toutes les notions de maths, de la 6e à la terminale, ont leur fiche de cours** (js/cours-fiches-maths-lycee.js) : 44 fiches de plus.
- **2nde** : intervalles, fonction carré, signe d’une fonction affine, évolutions réciproques, ensembles de nombres, valeur absolue, encadrement de racines, quotient nul, tableaux de signes, colinéarité, norme, équation cartésienne, coefficient multiplicateur, proportion de proportion, quartiles, fréquences conditionnelles, tests de dépistage, logique, Python.
- **1re** : automatismes de l’épreuve anticipée, discriminant, forme canonique, signe du trinôme, suites récurrentes, sommes de termes, tangente, dérivée d’un produit, variations, produit scalaire et angle, équation de cercle, espérance.
- **Tle** : limites de suites, dérivées composées, primitives, géométrie dans l’espace, équations avec exp et ln, croissances comparées, convexité, TVI, sinus et cosinus, primitives de eˣ et 1/x, loi binomiale (espérance, variance), représentation paramétrique.
- La base de connaissances compte maintenant 244 fiches.

## Version 9.4.0

**📚 Toutes les notions de maths du collège ont leur fiche de cours** (js/cours-fiches-maths-college.js) : 61 fiches de plus, de la 6e à la 3e — arrondis, nombres mixtes, divisibilité, programmes de calcul, unités d’aire et de volume, probabilités, droite graduée, symétrie axiale, quadrilatères, patrons ; relatifs, expressions littérales, remises, événement contraire, décomposition en facteurs premiers, carrés et cubes, développer et factoriser, contre-exemple, suites de motifs, fréquences, aire du disque, angles et parallélisme, parallélogrammes, Scratch ; puissances de 10, produit en croix, moyenne pondérée, deux dés, translation et rotation, fonctions, étendue, variables et boucles ; volumes, fractions irréductibles, notation scientifique, antécédents, latitude et longitude, sections, débit, lecture graphique, Python.
- La base de connaissances compte maintenant 200 fiches : tout le français, toutes les maths du collège, l’essentiel des maths du lycée et de l’anglais, et les niveaux experts.

## Version 9.3.0

**📚 44 nouvelles fiches de cours** (js/cours-fiches-plus.js) — la base de connaissances passe à 139 fiches :
- **Français : toutes les notions ont maintenant leur fiche** — cours de l’année de la 6e à la 1re, « Œuvres, mouvements et épreuve du bac » (programme 2026-2027), orthographe rectifiée de 1990, « Dire l’amour », groupe nominal et étymologie, « Voyager en poésie, devenir héros ».
- **Maths du collège : 30 notions de plus** — décimaux, division euclidienne, conversions, durées, angles, cercle, solides, fractions (simplifier, comparer, multiplier, diviser), réduire, aire du triangle, échelles, nombres premiers, volumes (pavé, cylindre, pyramide, cône, boule), triangles, symétrie centrale, ratio, double distributivité, vitesse, réciproque de Pythagore, racine carrée, produit nul, évolutions, inéquations, agrandissement, homothétie.

**Niveaux experts : un chapitre de plus chacun** (js/mat-experts-plus2.js), 20 questions et une fiche :
- 🧠 Mathématicien : probabilités avancées (Bayes et tests médicaux, Monty Hall, paradoxe des anniversaires, lois usuelles, théorème central limite).
- 🧬 Généticien : génétique médicale (modes de transmission, drépanocytose et paludisme, cancers, thérapie génique, dépistage, éthique).
- 🌋 Géophysicien : climat, océans et atmosphère (effet de serre, albédo, montée des mers, circulation océanique, El Niño, carottes de glace, accords de Montréal et de Paris).

## Version 9.2.0

**📝 Séries d’examen au camp d’entraînement** : pour le brevet, le bac de français, les maths anticipées, le bac et le niveau supérieur (niveaux experts), 20 questions au format de l’examen (brevet : français, maths, histoire-géo, SVT, physique ; bac : philosophie, maths, anglais, histoire-géo…), chronométrées (20 minutes), sans vanne ni correction pendant l’épreuve comme un vrai examen. À la fin : note sur 20, verdict de Plumo, corrigé de chaque erreur (ta réponse, la bonne réponse, la règle) ; meilleure note gardée. L’examen choisi comme objectif apparaît en premier.

**📚 28 fiches de cours du lycée** (js/cours-fiches-lycee.js), avec l’essentiel, un exemple corrigé, la méthode, les pièges et une vanne :
- **Maths** : vecteurs, équations de droites, fonctions de référence, taux d’évolution, probabilités (2nde) ; dérivation, suites, exponentielle, produit scalaire, probabilités conditionnelles, cercle trigonométrique (1re) ; limites, logarithme, primitives et intégrales, loi binomiale, dénombrement (Tle).
- **Anglais** : present perfect en be + -ing, déduction, wish, phrasal verbs, mots de liaison, conditionnel passé, have something done, V-ing ou to, inversion, insistance, axes du cycle terminal, bac et attestation de langues (oral de 10 minutes, session 2027).
- La base de connaissances compte maintenant 95 fiches.

## Version 9.1.0

**📚 46 nouvelles fiches de cours** (js/cours-fiches-college.js) — la base de connaissances couvre maintenant l’essentiel du collège :
- **Français** : conjugaison, nature et fonctions des mots, vocabulaire, figures de style, auteurs et mouvements, types et formes de phrases, modes (subjonctif, impératif, conditionnel).
- **Anglais** : be et have got, présent simple, there is/are, can et impératif, possessifs et génitif, be + -ing, prétérit, comparatifs, quantifieurs, verbes irréguliers, futur, passif, relatives, discours indirect, faux amis.
- **Maths** : priorités, fractions, proportionnalité, pourcentages, aire et périmètre, relatifs, équations, distributivité, moyenne, puissances, notation scientifique, cosinus, factorisation, fonctions affines, trigonométrie, probabilités, arithmétique, médiane.
- Chaque fiche : l’essentiel, un exemple corrigé pas à pas, la méthode, les pièges et une vanne de Plumo. Elles servent aussi de « leçon du jour » dans le camp d’entraînement.

**Un chapitre de plus par niveau expert** (js/mat-experts-plus.js), 20 questions et une fiche chacun :
- 🧠 Mathématicien : suites, limites et analyse (croissances comparées, TVI, primitives, convexité).
- 🧬 Généticien : évolution, phylogénie et génomique (spéciation, homologies, horloge moléculaire, paléogénomique).
- 🌋 Géophysicien : volcans, risques et planètes (types d’éruptions, surveillance, tsunamis, Olympus Mons, Io, Vénus).

## Version 9.0.0

**🎖️ Le camp d’entraînement** (Matières et Maths → « Camp d’entraînement », js/mod-intensif.js) — un entraînement intensif pour qui le veut :
- **Mission du jour, dans un ordre imposé** : 1) revoir ses erreurs (révision espacée), 2) la leçon du jour — fiche de cours (l’essentiel, un exemple corrigé pas à pas, la méthode, les pièges), puis 10 questions, 7 pour valider la notion —, 3) une série commando sans filet, 4) ses propres fiches (cahier). La leçon tourne entre français, anglais et maths, dans la classe de l’élève.
- **Séries sans filet** : chrono serré (25 s par question), une erreur et la série s’arrête ; records par matière.
- **Grades** de Recrue à Général, points, jours de service d’affilée, **compte à rebours** vers l’examen choisi (brevet, bac de français, maths anticipées, bac, diplôme du supérieur), accès direct aux examens blancs et au cahier.
- **📚 Base de connaissances** : toutes les notions du programme par classe (ou toutes classes), avec leur fiche rédigée ou l’essentiel tiré des questions, la marque « acquise », et les **fiches écrites par l’élève** (📒 Mon cahier, sur l’appareil) ; bouton « Écrire ma fiche » sur chaque notion.
- Plumo joue le sergent instructeur : il taquine la réponse, jamais l’élève.

**📚 21 fiches de cours rédigées** (js/cours-fiches.js) : français (grammaire de l’oral, méthode commentaire/dissertation, accords et phrase complexe, participe passé, homophones), anglais (écrire, parler, present perfect, conditionnel, modaux), maths (Pythagore, Thalès, second degré, identités remarquables), et les niveaux experts.

**Français du lycée renforcé** (js/mat-francais-bac.js, traduit en anglais et en espagnol) : « Bac : la question de grammaire de l’oral » (2nde, 1re), « Bac : méthode du commentaire et de la dissertation » (1re), « Langue en 2nde : accords et phrase complexe » — 20 questions chacun. La 1re passe de 80 à 120 questions.

**Anglais** (js/mat-anglais-ecrire.js) : « Écrire en anglais : l’expression écrite (B1 → B2) » et « Parler en anglais : prise de parole et interaction » (dont l’interrogation orale de 10 minutes de l’attestation de langues, session 2027) — 20 questions chacun.

**Niveaux experts**, au-delà du programme (Tle, supérieur ; visibles avec « Voir toutes les matières » pour les plus jeunes) :
- **🧠 Niveau mathématicien** : raisonnement et logique, arithmétique (PGCD, Bézout, Gauss, congruences, Fermat), nombres complexes.
- **🧬 Niveau généticien** : génétique moléculaire (de l’ADN à la protéine, mutations, PCR, CRISPR), hérédité, méiose et génétique des populations (Hardy-Weinberg).
- **🌋 Niveau géophysicien** : sismologie et intérieur de la Terre, géodynamique (plaques, paléomagnétisme, isostasie, gravité). Les chapitres GEOPS d’Objectif NASA restent en place.
- 20 questions par chapitre, une vanne par mauvaise réponse, une fiche de cours par chapitre. Questions en français pour l’instant (noms traduits dans les 5 langues).

## Version 8.9.0

- **Astronomie traduite en italien et en portugais** : les 10 chapitres joués (étoiles, Système solaire, lumière, gravitation, vie des étoiles, galaxies, cosmologie, exoplanètes, instruments, objets compacts), 20 questions chacun, avec leurs vannes et leurs règles. Fichiers chargés à la demande (`js/mat-trad-it-sup.js`, `js/mat-trad-pt-sup.js`).
- **Après le bac, la carte d'anglais change d'intitulé** : « Anglais du supérieur — TOEIC, IELTS, anglais universitaire, scientifique et professionnel, niveau C1 » au lieu de « Anglais (6e → bac) ». Le contenu ne change pas (les 5 leçons du supérieur existaient déjà) ; la carte habituelle reste pour les autres classes. Textes traduits en 5 langues.
- Restent en français en italien/portugais : droit et médecine (prochaines livraisons).

## Version 8.8.0 — Spécialités HGGSP, HLP et NSI en italien et en portugais

- HGGSP (1re, Tle, cours), HLP (1re, Tle, cours) et NSI (1re, Tle, cours) entièrement traduits : 180 questions par langue, titres d’œuvres traduits, aucune citation inventée.
- Le test qui vérifie qu’une matière non traduite reste en français porte maintenant sur l’astronomie.

## Version 8.7.0 — Chargement à la demande des traductions italiennes et portugaises

- Les dix fichiers de traduction des matières en italien et en portugais (≈ 1,7 Mo sur 11,3 Mo de scripts) ne sont plus chargés au démarrage pour tout le monde. `js/charge-langues.js` les charge, dans l’ordre, quand la langue de l’interface passe à l’italien ou au portugais, une fois le jeu chargé.
- Ils restent dans le cache du service worker : le jeu en italien ou en portugais fonctionne toujours hors connexion.
- Dans la version publiée, le paquet de scripts ne les contient plus ; ils restent des fichiers à part.
- Tests : chargeur (rien en français, ordre des fichiers, pas de double chargement) et paquet de production.
- **Correctif d’affichage** : après une erreur, le bouton « J’ai compris — continuer » pouvait passer sur deux lignes et recouvrir la fin de l’explication de Plumo. La bulle se place maintenant juste au-dessus de la rangée de boutons, quelle que soit sa hauteur (et à chaque redimensionnement) ; sur grand écran, le bouton tient sur une ligne.

## Version 8.6.0 — Copies de SES, de HGGSP et note de synthèse du CRFPA

- **SES (terminale)** : deux sujets de dissertation à rédiger dans « 🖊️ Mes copies » depuis l’examen de spécialité. Vérification de méthode adaptée : exemples chiffrés, mécanismes expliqués, auteurs et théories.
- **HGGSP (terminale)** : comme le jour J, une dissertation ET une étude critique de document (déclaration Schuman du 9 mai 1950 ou préambule de la Charte des Nations unies, extraits exacts vérifiés). Vérification : dates et repères, présentation du document, citations, regard critique.
- **Note de synthèse blanche (CRFPA)**, dans « ⚖️ Devenir avocat » : deux dossiers de cinq documents (le droit à l’oubli numérique ; la garde à vue et les droits de la défense), résumés pédagogiques de textes réels, avec la méthode. Vérification : références aux documents, neutralité (repère « à mon avis », « je pense »…), plan annoncé en deux parties ; pas de conclusion exigée.
- **Correction par l’IA** (serveur) : quatre nouveaux barèmes sur 20 (SES, HGGSP dissertation, HGGSP étude critique, note de synthèse).

## Version 8.5.0 — Examens à jour du BO spécial n° 4 du 17 septembre 2026

- **Brevet 2027** : le brevet blanc devient « Brevet blanc 2027 » ; barèmes officiels mis à jour (histoire-géographie notée sur 40 avec un exercice sur documents de 15 points et un exercice de 25 points : développement construit d’au moins 30 lignes + croquis, schéma ou frise ; sciences : deux disciplines sur trois annoncées deux mois avant, 1 point de maîtrise de la langue chacune ; maths : 2 points de maîtrise de la langue ; pas de QCM au vrai brevet en maths et en sciences). Coefficients inchangés.
- **Développement construit** (Mes copies) : sujet et longueur attendue passés à « au moins trente lignes ».
- **Épreuve anticipée de maths** : automatismes en questions à réponses courtes, 2 points de maîtrise de la langue.
- **Grand oral (session 2027)** : présentation d’une question (10 min) puis échange avec le jury (10 min) ; le temps sur le projet d’orientation est supprimé. Questions du quiz corrigées.
- **Correction des copies** : le serveur rappelle la règle 2027 (une copie très défaillante en maîtrise de la langue ne peut pas avoir la moyenne).
- Espace Officiel : lien vers le BO spécial n° 4.
- Le test v5.78 vérifie le nouveau libellé des automatismes.
- **Correctif publication GitHub Pages** : `outils/preparer-www.js _site` recopiait le dossier `_site` dans lui-même à l’infini (`_site/_site/_site/…`), ce qui faisait échouer l’étape « publier » (la 5e vérification en rouge sur chaque fusion). Le dossier de destination est maintenant exclu (`_site`, `_ovh` aussi pour OVH) ; nouveau test dans `tests/paquet.test.js`.

## Version 8.4.0 — 📼 Le défi rétro étoffé

- **La vraie dictée** (`js/mod-retro-plus.js`) : 8 textes du domaine public (La Fontaine, Daudet, Hugo, Verlaine). Plumo lit groupe par groupe en disant la ponctuation (voix de synthèse, rien n’est enregistré), l’élève écrit, puis correction mot à mot : barème du certificat d’études (dictée sur 10, une faute = 2 points, accent ou majuscule = 1 point, ponctuation non comptée). Le texte peut aussi être dicté par un adulte.
- **Quatre nouvelles épreuves** : histoire par cœur, leçons de choses, les mots de l’école d’autrefois, problèmes à l’ancienne (20 questions chacune).
- **40 questions** pour chacune des cinq épreuves d’origine ; chaque partie tire 20 questions. Le BEPC rétro reste à 20 questions, réparties sur les 9 épreuves.
- **Le Certificat d’études** : la dictée puis 20 questions, note sur 20, reçu à 10 sauf zéro à la dictée (éliminatoire comme autrefois). Page « Le certif, c’était quoi ? » avec repères et sources (circulaire Duruy de 1866, loi du 28 mars 1882, décret de 1989).
- **Le duel des générations** : deux joueurs, les mêmes 10 questions, chacun son tour ; les prénoms ne sont pas enregistrés.
- **Récompenses d’époque** : un bon point par bonne réponse, une image tous les dix bons points (12 à collectionner), tableau d’honneur des meilleures notes.
- Le test v6.47 suit ces nouveaux chiffres (9 épreuves, séries de 20).

## Version 8.3.0 — Toute la philosophie en italien et en portugais

- Les sept dernières notions sont traduites : la raison, la religion, la science, la technique, le temps, le travail, la vérité (140 questions par langue).
- La philosophie est désormais entière en italien et en portugais : repères, auteurs, méthode et les 17 notions.
- Le test qui vérifie qu’une matière non traduite reste en français porte maintenant sur la HGGSP.

## Version 8.2.0 — ⚖️ Devenir avocat, et cinq notions de philosophie en italien et en portugais

- **Devenir avocat** (Droit, niveau Sup) : 4 leçons de 20 questions, en français, anglais et espagnol (noms en italien et portugais) — le parcours (master 1, CRFPA, 18 mois d’école, CAPA, master 2 depuis 2025, serment), l’examen d’entrée (épreuves et coefficients de la session 2026 publiés par le CNB), la déontologie et la vie du cabinet, la pratique (procès, garde à vue, plaidoirie).
- **Espace « ⚖️ Devenir avocat »** sur l’écran Droit (`js/mod-avocat.js`) : CRFPA blanc (40 questions, 60 min, sans vanne, note sur 20 et corrigé), révision avec les vannes, grand oral blanc (12 sujets sur les libertés et droits fondamentaux, 1 h de préparation chronométrée, méthode de l’exposé, questions possibles du jury), liens officiels du CNB.
- **Philosophie en italien et en portugais** : l’inconscient, la justice, le langage, la liberté, la nature (100 questions par langue).
- Le test qui vérifiait qu’une notion non traduite reste en français porte maintenant sur « la raison ».

## Version 8.1.0 — Cinq notions de philosophie en italien et en portugais

- Notions traduites (20 questions chacune, vannes et règles comprises) : l’art, le bonheur, la conscience, le devoir, l’État.
- Titres d’œuvres dans la langue (Critica del giudizio, Etica Nicomachea, O ser e o nada, O espírito das leis…) ; noms des auteurs à l’italienne ou à la portugaise quand l’usage existe (Cartesio, Machiavelli, Espinosa, Maquiavel…).
- Restent en français pour l’instant : inconscient, justice, langage, liberté, nature, raison, religion, science, technique, temps, travail, vérité.
- Test v8.1 ; le test v8.0 vérifie maintenant qu’une notion pas encore traduite (l’inconscient) reste en français.

## Version 8.0.0 — SES et méthode de philosophie en italien et en portugais

- Nouveaux fichiers `js/mat-trad-it-lycee.js` et `js/mat-trad-pt-lycee.js` pour les matières du lycée.
- SES traduite en entier : 1re (marchés, monnaie, socialisation), Tle (inégalités, mobilité, commerce international) et le cours (60 questions, vannes comprises).
- Philosophie : « Auteurs, notions et méthode » et « Auteurs et distinctions conceptuelles » (40 questions). Les titres d’œuvres sont donnés dans la langue (Discorso sul metodo, O contrato social…).
- Reste en français pour l’instant en italien et en portugais : les 17 notions de philosophie, HGGSP, HLP, NSI, droit, médecine, astrophysique.
- Test v8.0.

## Version 7.9.0 — Conditions réelles d’examen (brevet blanc, bac blancs)

- Sur la première épreuve d’un examen blanc, un bouton « 🎓 Passer en conditions réelles d’examen » (et « Revenir à l’entraînement »).
- En conditions réelles :
  - chaque épreuve a son chrono officiel (3 h pour le français du brevet, 2 h pour les maths, 4 h pour le bac de français ou la philosophie…) ; à la fin du temps, la copie est ramassée ;
  - ni vanne, ni correction, ni aide « avant de répondre » pendant l’épreuve : on répond et on passe à la question suivante ;
  - quand une épreuve a une partie rédigée (rédaction et développement construit du brevet, commentaire ou dissertation du bac de français, dissertation de philosophie), l’écran « ✍️ Partie rédigée » arrive après les questions, avec le temps qui reste ; la copie se rédige dans l’appli (sans vérification ni correction avant de l’avoir rendue), puis « 📤 Rendre ma copie et continuer » ;
  - à la fin : les notes, la moyenne avec les coefficients officiels, la mention, puis le **relevé de notes** avec le corrigé de chaque épreuve (ta réponse, la bonne réponse, la règle) et le nombre de mots rendus pour chaque partie rédigée, à faire corriger dans « 🖊️ Mes copies ».
- Le mode entraînement ne change pas.
- Tests : v7.9 (brevet blanc complet en conditions réelles, avec la rédaction rendue).

## Version 7.8.0 — Rédiger aussi la rédaction du brevet, le développement construit et la dissertation de philosophie

- **Brevet blanc, français** : l’écran de l’épreuve propose les deux sujets de rédaction (réflexion OU imagination, comme le jour J), à rédiger dans l’appli ; chrono d’1 h 30. Trois paires de sujets.
- **Brevet blanc, histoire-géographie** : le développement construit porte sur le même thème que l’exercice tiré ; chrono de 30 min.
- **Bac blanc de philosophie** : deux sujets de dissertation tirés parmi douze (dont les deux sujets tombés en 2026) ; chrono de 4 h.
- **Vérification sans IA adaptée à chaque écrit** :
  - rédaction d’imagination : longueur (environ 300 à 450 mots), paragraphes, émotions, organisateurs du récit, mots du sujet, registre (pas de problématique exigée) ;
  - rédaction de réflexion : arguments et exemples, conclusion ;
  - développement construit : dates, acteurs et lieux, paragraphes, connecteurs ;
  - philosophie : problématique, définition des termes, annonce du plan, références philosophiques expliquées, exemples, conclusion.
- **Correction par l’IA** (`copie.php`) : un barème officiel par écrit (brevet : rédaction en 4 critères, développement construit en 3 ; philosophie : problématisation, argumentation, construction, expression). Les rédactions et développements sont acceptés dès 80 mots. Toujours avec l’accord d’un parent et sans réécrire la copie.
- Le chrono s’adapte à la durée de chaque épreuve.
- Tests : v7.8 côté jeu ; 2 tests serveur de plus.

## Version 7.7.0 — Rédiger sa copie du bac de français et la faire corriger, en expliquant

- Sur l’écran du sujet, chaque sujet (commentaire et trois dissertations) a un bouton « 🖊️ Rédiger ma copie ».
- Écran de rédaction (`js/mod-copie.js`) : le sujet reste affiché (texte à commenter ou sujet de dissertation avec l’œuvre et le parcours), un brouillon, la copie, le nombre de mots, le chrono des 4 heures du bac, l’enregistrement automatique dans l’appareil. On peut s’arrêter et reprendre plus tard depuis « 🖊️ Mes copies » (carte dans les matières ; suppression avec confirmation).
- **Vérification sans IA, gratuite** : longueur, paragraphes, problématique et annonce du plan dans l’introduction, conclusion, citations, analyse des procédés (commentaire) ou appui sur l’œuvre (dissertation), connecteurs, lien avec le sujet, registre, longueur des phrases. Chaque point réussi ou à retravailler est expliqué. Ce n’est pas une note.
- **Correction détaillée par l’IA, en option** (`serveur-php/copie.php`) : barème sur 20 en quatre critères (compréhension et problématique /5, construction /5, analyse et argumentation /6, langue /4), explication de chaque critère, points forts, passages à retravailler avec un conseil, remarques de langue, conseil principal. La note est recalculée par le serveur à partir des critères. L’IA explique mais ne réécrit jamais la copie.
  - Seulement avec l’accord d’un parent (le même que pour l’aide aux devoirs) ; 5 plumes si les plumes sont allumées, rendues si l’IA échoue ; au plus `copie_par_jour` corrections par jour et par IP (10, dans `config.php`). Rien n’est gardé côté serveur.
- Classe « Après le bac » : les onglets Blancs et Annales n’affichent plus ni brevet ni bac (on les a déjà passés) ; un message l’explique, et « Voir toutes les matières » les remontre si on veut. La voie professionnelle n’apparaît plus non plus après le bac.
- Tests : v7.7 côté jeu ; 5 tests serveur pour `copie.php` (403 sans accord, 400 copie courte, note recalculée, balises neutralisées, 502 avec plumes rendues).

## Version 7.6.0 — Bac de français : on lit le sujet, puis on choisit commentaire ou dissertation

- Avant les questions, l’écran affiche le sujet complet, comme le jour J :
  - **Sujet 1 · Commentaire** : un texte à commenter (poésie, roman, théâtre ou littérature d’idées), avec son objet d’étude et la consigne « Vous commenterez ce texte » ;
  - **Sujet 2 · Dissertation** : trois sujets, un par œuvre au programme d’un autre objet d’étude, avec le parcours associé.
- L’élève choisit « 📖 Je travaille le commentaire » ou « ✍️ Je travaille cette dissertation ». Les questions portent alors sur le sujet choisi, qui reste affiché pendant toute l’épreuve :
  - commentaire (12 pts) : procédés repérés dans le texte, registre, point de vue, problématique, plan ;
  - dissertation (8 pts) : mots-clés, problématique, plan dialectique, choix des exemples, gestion des 4 heures ; plus les œuvres au programme (4 pts) ;
  - puis méthode (4 pts) et question de grammaire de l’oral (4 pts). Toujours sur 20.
- Les 4 textes à commenter sont écrits pour Ami des mots (aucun extrait d’auteur reproduit). Les 12 sujets de dissertation portent sur les œuvres du programme 2026-2027.
- Même étape pour l’annale « Bac 2026 · Français ».
- Test v7.6.

## Version 7.5.0 — L’EMC en italien et en portugais : toute l’histoire-géographie-EMC est traduite

- EMC du collège traduite en italien et en portugais : chapitre « Enseignement moral et civique », EMC 6e-5e, EMC 4e-3e, EMC 6e, 5e, 4e et 3e (140 questions, vannes comprises).
- EMC du lycée traduite : 2nde (droits, libertés, responsabilité), 1re (cohésion et diversité), Tle (vie démocratique, débat, décision) — 60 questions.
- Le thème EMC suit automatiquement : en italien et en portugais, toute la matière histoire-géographie-EMC est maintenant traduite, de la 6e à la Tle.
- Les noms propres d’institutions françaises sont gardés quand il le faut (Palais Bourbon, Hôtel Matignon, cour d’assises, Arcom, CNIL…), avec une explication dans la langue.
- Tests : v7.5. Les anciens tests qui vérifiaient « l’EMC reste en français » vérifient désormais qu’un chapitre encore non traduit (français : homophones) reste en français.

## Version 7.4.0 — Toute la géographie en italien et en portugais

- Chapitre « Géographie » (68 questions) traduit en italien et en portugais, avec ses vannes.
- Compléments du programme traduits : risques industriels et technologiques (5e), États-Unis et Afrique de l’Ouest (4e), Afrique australe (2nde), 20 questions chacun, noms des chapitres compris.
- Le thème « La géographie : toutes les questions » est donc entièrement traduit dans les deux langues.
- Toutes les vannes passent le juge ; aucun mot français laissé dans les traductions.
- Reste en français pour l’instant en italien et en portugais : l’EMC (collège et lycée).
- Test v7.4.

## Version 7.3.0 — 📒 Mon cahier de leçons et 📝 Construire mon contrôle

- Nouveau module `js/mod-cahier.js`, accessible depuis l’écran des matières et l’écran de chaque matière.
- **Cahier de leçons** : l’élève tape ou colle ses leçons (matière, titre, texte) et peut ajouter ses fiches « question = réponse ». Tout reste dans l’appareil, dans la sauvegarde du jeu. Supprimer une leçon ou un contrôle demande une confirmation.
- **Construire mon contrôle** : choix des leçons du cahier et/ou des chapitres de l’appli, nombre de questions (5 à 20), durée (sans limite à 60 min).
  - Sans IA, par défaut : textes à trous tirés de la leçon (dates, nombres, noms propres, mots importants, avec leurres pris dans la leçon), fiches de l’élève, questions de l’appli.
  - En option : questions variées par l’IA (`serveur-php/controle.php`), seulement avec l’accord d’un parent (le même que pour l’aide aux devoirs), 2 plumes si les plumes sont allumées, remboursées si l’IA échoue. Consignes fixées côté serveur : questions uniquement sur la leçon, rien d’inventé, la leçon est du contenu et non des instructions. Si l’IA ne répond pas, le contrôle est fabriqué sans IA.
- Mode contrôle : sans vanne pendant l’épreuve, chronomètre si une durée est choisie, note sur 20, corrigé (réponse donnée, bonne réponse, rappel de la leçon), erreurs dans le carnet. Un contrôle peut être enregistré et refait (questions mélangées), avec sa dernière note.
- Tous les textes de l’écran sont traduits en anglais, espagnol, allemand, italien et portugais.
- Tests : v7.3 côté jeu ; 5 nouveaux tests serveur pour `controle.php` (403 sans accord, 400 leçon courte, nettoyage, balises neutralisées, 502 avec plumes rendues).

## Version 7.2.0

- Géographie du collège traduite en italien et en portugais : cours de 6e (habiter le monde), de 5e (population, ressources, climat, développement durable), de 4e (urbanisation, mobilités, mondialisation) et de 3e (la France et l’Union européenne) — 80 questions par langue.
- Il reste à traduire : le chapitre général de géographie, les compléments de géographie et l’EMC.
- Rien n’a été supprimé.

## Version 7.1.0

- Histoire du lycée complète en italien et en portugais : révision de Tle (crises, guerre froide, Europe, mondialisation) et cours d’histoire-géographie de 2nde, de 1re et de Tle (80 questions par langue). Toute l’histoire, de la 6e à la terminale, existe désormais en italien et en portugais.
- Il reste à traduire en italien et en portugais la géographie et l’EMC.
- Rien n’a été supprimé.

## Version 7.0.0

- Histoire du lycée traduite en italien et en portugais, 1re partie : « Repères du lycée », révision de 2nde (Renaissance, Lumières, risques) et révision de 1re (XIXe siècle, IIIe République, métropoles) — 60 questions par langue.
- Rien n’a été supprimé.

## Version 6.99.0

- Histoire de 3e traduite en italien et en portugais, dernière partie : 1944-1947, refonder la République ; enjeux et conflits dans le monde après 1989 (40 questions par langue). Toute l’histoire de 4e et de 3e existe désormais en italien et en portugais (la géographie et l’EMC restent à faire).
- Rien n’a été supprimé.

## Version 6.98.0

- Histoire de 3e traduite en italien et en portugais, 3e partie : crise de 1929, régimes totalitaires et Front populaire ; guerre froide et décolonisation ; la France depuis 1945 et la Ve République (60 questions par langue).
- Rien n’a été supprimé.

## Version 6.97.0

- Histoire de 3e traduite en italien et en portugais, 2e partie : révision « Le XXe siècle », cours de 3e (totalitarismes, monde bipolaire, décolonisation, Europe, Ve République) et cours sur la Première Guerre mondiale (60 questions par langue).
- Rien n’a été supprimé.

## Version 6.96.0

- Histoire de 3e traduite en italien et en portugais, 1re partie : « Guerres mondiales et XXe siècle », « La Seconde Guerre mondiale (1939-1945) » et le cours de 3e sur la Seconde Guerre mondiale (60 questions par langue).
- Rien n’a été supprimé.

## Version 6.95.0

- Écran d’une matière : les cartes « Mes trimestres », « Études de documents », « Études d’infirmier (IFSI) »… sont maintenant côte à côte dans une seule grille, au lieu d’être empilées dans une colonne étroite.
- Histoire de 4e traduite en italien et en portugais : Révolution et XIXe siècle, révision 4e, cours de 4e, conditions des femmes au XIXe siècle, traites et colonisation (100 questions par langue).
- Rien n’a été supprimé.

## Version 6.94.0

EMC du lycée, qui manquait (programme de 2024, appliqué à tous les niveaux depuis la rentrée 2026) : trois chapitres de 20 questions dans « Histoire-géo & EMC », en français, anglais, espagnol et allemand (noms en italien et portugais).
- 2nde : droits, libertés et responsabilité.
- 1re : cohésion et diversité dans une société démocratique.
- Tle : la vie démocratique — débat, délibération et prise de décision.
- Les 60 questions rejoignent le thème « L’EMC : toutes les questions », qui couvre désormais de la 6e à la terminale.
- Rien n’a été supprimé.

## Version 6.93.0

Études d’infirmier (IFSI), suite : l’espace IFSI compte maintenant 10 leçons de 20 questions (français, anglais, espagnol ; noms en italien et portugais).
- Infirmier 6 : urgences et gestes de l’AFGSU (15, 112, 114, arrêt cardiaque, DAE, PLS, étouffement, AVC, hypoglycémie, anaphylaxie, Glasgow).
- Infirmier 7 : pathologies courantes et surveillance (diabète, insuffisance cardiaque, infarctus, BPCO, asthme, AVC, Alzheimer, Parkinson, rein, thrombose, dénutrition, sepsis de chimiothérapie).
- Infirmier 8 : droit, éthique et déontologie (secret, consentement, loi Kouchner, personne de confiance, directives anticipées, lois Leonetti et Claeys-Leonetti, code de 2016, contention, secret partagé).
- Infirmier 9 : relation de soin, éducation et santé publique (écoute active, empathie, Rogers, ETP, Henderson, Maslow, préventions, OMS, démarche de soins).
- Infirmier 10 : 20 cas cliniques de révision du diplôme d’État.
- Nouvelle carte « 🔁 Révision IFSI : toutes les leçons » : 20 questions mélangées, avec les vannes, erreurs dans le carnet. L’examen blanc pioche désormais dans les 10 leçons.
- Rien n’a été supprimé.

## Version 6.92.0

Études d’infirmier (IFSI) dans la matière Médecine (niveau Sup), comme les autres matières :
- 5 chapitres de 20 questions, en français, anglais et espagnol (noms en italien et portugais) : parcours IFSI (référentiels 2009 et 20 février 2026, 180 ECTS, 4 620 h dont 2 310 h de stages, Ordre, rôle propre / prescrit, loi du 27 juin 2025, arrêté du 26 juin 2026), calculs de doses et débits, pharmacologie, soins et surveillance, hygiène et gestion des risques ; chaque chapitre a sa leçon 📖.
- Espace « 🩺 Études d’infirmier (IFSI) » depuis l’écran Médecine : examen blanc (40 questions, 60 min) et épreuve de calculs de doses (20 questions, 30 min), chronométrés, sans vanne, corrigés à la fin avec la note sur 20.
- Deux études de documents fictives : lire une prescription, interpréter une feuille de surveillance.
- Textes officiels : arrêté du 20 février 2026, réingénierie (FHF), fiche RNCP 42589, arrêté du 26 juin 2026 (Légifrance), Parcoursup, Ordre national des infirmiers.
- Rien n’a été supprimé.

## Version 6.91.0

- Géographie complétée selon le programme, sans rien supprimer :
  - 5e : « Prévenir les risques industriels et technologiques » (AZF, Bhopal, Fukushima, sites Seveso, Lubrizol, sirènes, PPRT, FR-Alert) — 20 questions ;
  - 4e : « Les États-Unis et l'Afrique de l'Ouest dans la mondialisation » (Megalopolis, Sun Belt, Rust Belt, Silicon Valley, frontière mexicaine, ACEUM ; Lagos, CEDEAO, cacao, pétrole, Sahel, Lomé, agriculture vivrière) — 20 questions ;
  - 2nde : « L'Afrique australe, un espace en profonde mutation » (Afrique du Sud, SADC, Johannesburg, trois capitales, apartheid, mines, Botswana, Zambèze, Namib, townships, Kruger, Lesotho) — 20 questions.
- Traduits en anglais, espagnol et allemand ; rangés dans le thème « La géographie : toutes les questions ».
- Test v6.91 ajouté.

## Version 6.90.0

- 5e complétée selon le programme : nouveau chapitre « Bagdad et les califes, Charles Quint et Soliman, conflits religieux » (Omeyyades, Abbassides, Maison de la sagesse, prise de Bagdad en 1258, Charles Quint, Soliman, siège de Vienne, Saint-Barthélemy, huguenots, Henri IV, révocation de l'édit de Nantes).
- 4e complétée selon le programme : nouveau chapitre « Ports négriers, Code noir, conquêtes et sociétés coloniales » (Nantes, Bordeaux, Saint-Domingue, Code noir, traite atlantique, Toussaint Louverture, 1802, conquête de l'Algérie, Abd el-Kader, conférence de Berlin, Samory Touré, AOF, indigénat, travail forcé).
- 20 questions chacun, traduits en anglais, espagnol et allemand (et en italien et portugais pour la 5e), rangés dans les thèmes « Moyen Âge », « Renaissance… Lumières », « Révolution » et « XIXe siècle ». Rien n'est supprimé.
- Écran d'une matière sur grand écran : les blocs de chapitres (Connaissances, Calculs…) ne se chevauchent plus. Les colonnes sont en rem (elles grandissent avec le texte agrandi des grands écrans) et en auto-fit (elles occupent toute la largeur au lieu de laisser des colonnes vides) ; les titres longs passent à la ligne et le bouton 📖 reste dans son bloc.
- Test v6.90 ajouté.

## Version 6.89.0

- Histoire alignée sur les programmes officiels (voir docs/POINT-PROGRAMMES-HISTOIRE-GEO.md), sans rien supprimer :
  - la Seconde Guerre mondiale et l'après-1945 (`xxe`, `seconde-guerre`, `sgm-cours`) ne sont plus proposés en 1re, mais en 3e et en terminale ;
  - la Révolution française (`revolution`) passe de la 2nde à la 1re, comme dans le programme de 2019.
- Deux chapitres de 3e ajoutés : « 1944-1947, refonder la République » et « Enjeux et conflits dans le monde après 1989 » (20 questions chacun, vannes validées par le juge).
- **Un programme = un pays, sans mélange** (js/mod-programmes.js) : en haut des matières, une rangée d'onglets 🇫🇷 France · 🏴 England · 🇺🇸 United States · 🇮🇹 Italia · 🇪🇸 España · 🇵🇹 Portugal · 🇩🇪 Deutschland. Chaque onglet n'ouvre que son programme :
  - l'écran England n'affiche plus les outils du programme français (révision du jour, réponse écrite, veille de contrôle, défi de classe, correction par Plumo, défi rétro, « Mon pays : France ») ni le lien « Programme français » en bas ; il garde ses Years, Mocks, Past papers et gagne une carte « My year group & exams » ;
  - la table des matières française n'affiche plus les cartes « England curriculum » et « Mon pays » ;
  - chaque pays a son écran (classes, matières dans sa langue, maths dans sa langue, examens) ;
  - « Mes erreurs » et la révision du jour sont triées par programme : chaque pays ne revoit que ses propres erreurs ;
  - le menu « Mon programme » de la page d'accueil propose les 7 programmes ; « Entrer » ouvre directement le programme choisi.
  Rien n'est supprimé : les anciens chemins (« Choisis ton pays », gb-programme) mènent au même endroit.
- Tests v6.89 ajoutés (histoire et tri par pays) ; tests v6.1 et v6.77 adaptés aux onglets.

## Version 6.88.0

- Histoire de 5e traduite en italien et en portugais : Moyen Âge et Renaissance, révision 5e, cours de 5e, l'affirmation de l'État monarchique (4 chapitres, 80 questions par langue, mêmes dates qu'en français).
- 951 questions traduites par langue au total. Test v6.88 ajouté.

## Version 6.87.0

- Première page (table des matières) : le bouton « 🎮 Jeux et entraînement » est retiré. Ce qui n'était que sur cet écran est rangé directement sur la page, dans un bloc « Jeux et entraînement » : défi du jour, apprendre des mots, mots à revoir, mots et langues, professeur IA, battle, objectif et série, mot du jour, carnet, réglages, espace parents. Pas de doublon : Maths, Sciences, Mes erreurs et la correction par Plumo restent là où ils étaient déjà.
- L'ancien écran des jeux n'est plus affiché : les boutons retour qui y menaient ramènent à la table des matières (le code est conservé).
- Histoire de 6e traduite en italien et en portugais : Antiquité, révision 6e, cours de 6e, naissance du monothéisme juif (4 chapitres, 80 questions par langue, mêmes dates qu'en français).
- Tests v6.38 et v6.87 mis à jour / ajoutés.

## Version 6.86.0

- SVT du lycée traduites en italien et en portugais : génétique, révisions 2nde/1re/Tle, cours de 2nde, 1re et Terminale (7 chapitres).
- Physique-chimie du lycée traduite en italien et en portugais : révisions 1re/Tle, cours de 2nde, 1re et Terminale (5 chapitres).
- 791 questions traduites par langue au total ; mêmes réponses et même ordre que le français, vannes validées par le juge.
- Test v6.86 ajouté ; les tests v6.83/v6.84 vérifient désormais qu'une matière non traduite (histoire) reste en français.

## Version 6.85.0 — la technologie en italien et en portugais

- **Nouveaux fichiers** `js/mat-trad-it-techno.js` et `js/mat-trad-pt-techno.js` : les **6 chapitres de technologie** (cours de 5e, 4e et 3e ; numérique et cybersécurité ; énergie, mécanismes et fabrication ; démarche de projet), soit **120 questions par langue**, traduites depuis le français dans le même ordre, avec explications et vannes de Plumo (validées par le juge).
- Quand une question parle d’une réalité française (brevet, numéro 3018, loi), la traduction le précise (« esame francese », « em França »).
- Total traduit en italien et en portugais : SVT, physique-chimie et technologie du collège (551 questions par langue). À suivre : SVT et physique-chimie du lycée, puis histoire-géographie.
- Test v6.85 ajouté.

## Version 6.84.0 — la physique-chimie du collège en italien et en portugais

- **Nouveaux fichiers** `js/mat-trad-it-physique.js` et `js/mat-trad-pt-physique.js` : les **11 chapitres de physique-chimie du collège** (la matière et ses états, électricité, révisions 6e, cours de 6e, 5e, 4e et 3e, premiers algorithmes, sécurité électrique et signaux, matériaux, composition de l’Univers), soit **229 questions par langue**, traduites depuis le français dans le même ordre, avec explications et vannes de Plumo (validées par le juge).
- Les calculs de physique fabriqués à la volée (vitesse, poids, énergie, masse volumique, électricité) parlaient déjà italien et portugais.
- Total traduit en italien et en portugais : SVT et physique-chimie du collège (431 questions par langue). À suivre : technologie, puis lycée et histoire-géographie.
- Test v6.84 ajouté (mêmes nombres dans les réponses chiffrées qu’en français).

## Version 6.83.0 — les matières françaises commencent à parler italien et portugais : les SVT du collège

- **Nouveaux fichiers** `js/mat-trad-it-svt.js` et `js/mat-trad-pt-svt.js` : les **10 chapitres de SVT du collège** (6e → 3e : le vivant et la cellule, corps humain et santé, la planète Terre, révisions 6e et 5e-4e, cours de 6e, 5e, 4e et 3e, la Terre en 6e), soit **202 questions par langue**, traduites depuis le français dans le même ordre, avec leurs explications et les vannes de Plumo (validées par le juge).
- Interface en italien ou en portugais : ces chapitres s’affichent dans la langue ; les chapitres pas encore traduits restent en français, comme avant.
- Ce qui reste à traduire en italien et en portugais (questions différentes, par langue) : SVT du lycée (~130), physique-chimie (~325), technologie (120), histoire-géographie et EMC (~830), puis les autres matières (français, philosophie, droit, médecine, astronomie, spécialités…). Les cours d’anglais ne sont pas concernés.
- Test v6.83 ajouté.

## Version 6.82.0 — le Portugal dans « Mon pays »

- **Système scolaire** : du 6.º ao 12.º ano, avec l’équivalent français de chaque classe (9.º ano ≈ 3e, 12.º ano ≈ Tle).
- **Fiches d’examens** (`js/examens-monde.js`, vérifiées en novembre 2026) : *provas finais do 9.º ano* (portugais et mathématiques, 30 % de la note finale, sur ordinateur en 2026) et *exames finais nacionais do ensino secundário* (0 à 200 points, épreuves d’entrée à l’université). Depuis 2025, l’EduQA reprend les missions de l’IAVE et de la DGE.
- **4 matières en portugais européen** (`js/pays-portugal.js`, **140 questions**) : *Português* (Camões, Gil Vicente, Eça, Camilo, Garrett, Pessoa et ses hétéronymes, Saramago, Sophia), *História e Cidadania* (de D. Afonso Henriques au 25 de Abril, Constitution de 1976, institutions), *Ciências* (Ciências Naturais, Físico-Química ; Biologia e Geologia, Física e Química A ; Egas Moniz) et *Filosofia* au secondaire (argumentation, libre arbitre, Kant, Mill, Rawls, Popper, Kuhn).
- **7 entraînements d’examen** : prova final de Matemática et de Português ; exames nacionais de Matemática A (635), Português (639), História A (623), Biologia e Geologia / Física e Química A, Filosofia (714). Les maths utilisent les exercices du coin maths en portugais.
- **Veille des programmes** : le Portugal est ajouté (sources officielles : Aprendizagens Essenciais, EduQA).
- Test v6.76 mis à jour (7 pays au lieu de 6), test v6.82 ajouté.

## Version 6.81.0 — les programmes des pays, suite : sciences, philosophie, géographie

Chaque pays de « 🌍 Mon pays » passe de 2 à 4 matières, toujours dans sa langue.

- **Nouveaux fichiers** `js/pays-italie2.js`, `js/pays-espagne2.js`, `js/pays-allemagne2.js`, `js/pays-usa2.js` : 8 matières, 14 chapitres, **280 questions** (20 par chapitre), avec explication et vannes validées par le juge.
  - 🇮🇹 *Scienze* (materia, cellula, Galileo ; DNA, Mendel, Volta, Fermi, Levi-Montalcini) et *Filosofia* au liceo (presocratici → Freud, colloquio).
  - 🇪🇸 *Ciencias* (Biología y Geología, Física y Química ; Ramón y Cajal, Margarita Salas, PAU) et *Filosofía* en Bachillerato (Platón → Ortega y Gasset, María Zambrano, comentario PAU).
  - 🇩🇪 *Naturwissenschaften* (Biologie, Chemie, Physik ; Röntgen, Einstein, Hahn und Meitner) et *Erdkunde* (Deutschland, Klimadiagramm, Strukturwandel ; Globalisierung, Stadt, Klima, Operatoren).
  - 🇺🇸 *Science* (life, earth and physical science ; biology, chemistry, physics) et *Geography* (U.S. and world ; AP Human Geography).
- `js/pays-commun.js` : une matière peut n'exister qu'au lycée (la philosophie n'apparaît pas en collège).
- **8 nouveaux entraînements d'examen** : colloquio di filosofia, verifica di scienze ; PAU Historia de la Filosofía et Ciencias ; Abitur Naturwissenschaften et Geographie ; AP Human Geography, Biology/Chemistry/Physics.
- Catalogue de la veille : 36 matières. Test v6.81 ajouté.

## Version 6.80.0 — les programmes des pays (Italie, Espagne, Allemagne, États-Unis, Angleterre)

« 🌍 Mon pays » ne propose plus seulement des maths : chaque pays a ses vrais chapitres, écrits dans sa langue.

- **Nouveaux fichiers** `js/pays-commun.js`, `js/pays-italie.js`, `js/pays-espagne.js`, `js/pays-allemagne.js`, `js/pays-usa.js` : 8 matières, 16 chapitres, **320 questions** (20 par chapitre, partie collège et partie lycée), avec explication et vannes douces dans la langue du pays, toutes validées par le juge.
  - 🇮🇹 *Italiano* (Manzoni, Dante, Leopardi, Verga, Pirandello, metrica, analisi del testo) et *Storia ed educazione civica* (Comuni, Risorgimento, 1861, Resistenza, Repubblica, Costituzione 1948).
  - 🇪🇸 *Lengua castellana y literatura* (tilde, subjuntivo, Siglo de Oro, 98, 27, comentario de texto, PAU) et *Geografía e Historia* (al-Ándalus, 1492, Cádiz 1812, Guerra Civil, Transición, Constitución 1978).
  - 🇩🇪 *Deutsch* (Kasus, Nebensatz, Konjunktiv I, Klassik, Kafka, Brecht, Erörterung) et *Geschichte und Politik* (Reformation, 1871, Weimar, NS-Diktatur, Grundgesetz, Mauer, Einheit, Bundestag).
  - 🇺🇸 *English Language Arts* (grammar, theme, rhetoric, American literature, digital SAT) et *U.S. History & Civics* (1776, Constitution, amendments, Civil War, civil rights, Cold War, branches of government).
  - 🇬🇧 L'Angleterre ouvre désormais le **programme anglais complet déjà présent** (Year 6 → A level) au bon Year, avec ses Mocks.
- **Mon pays** : section « 📚 Mes matières (programme du pays) » (chapitre de la classe, trimestres et contrôles, écran de la matière), **« 🔢 Maths dans ma langue »** (20 questions de la classe, avec les vannes) et **nouveaux entraînements d'examen** : prima prova, storia, esame di terza media ; PAU Lengua et Historia de España, control ESO ; Abitur Deutsch et Geschichte, Klassenarbeit ; SAT Reading & Writing, U.S. History & Government, Civics test ; GCSE English, GCSE History, A level English Literature.
- Ces matières n'apparaissent pas dans la table des matières française ; elles entrent dans le catalogue de la veille (`serveur-php/admin/catalogue.json`, 28 matières) pour les mises à jour de programmes.
- Test v6.80 ajouté.

## Version 6.79.1 — les tests tiennent dans la mémoire d'un Codespace

- `npm run verifier` s'arrêtait sur un Codespace avec « JavaScript heap out of memory ». Avec la v6.78, les ~250 pages de test (jsdom) dépassaient les 2 Go de mémoire que Node s'accorde par défaut.
- Chaque page ouverte pendant un test est maintenant fermée à la fin du test.
- Le test principal tourne avec `--max-old-space-size=4096` (pic mesuré : environ 3 Go). Ça tient sur un Codespace de 8 Go et sur les machines de GitHub Actions.
- Mesure de la mémoire test par test : `MEMOIRE=1 node --expose-gc tests/jeu.test.js`.

## Version 6.79 — corrections de l'audit de la v6.77, « Mon lycée » pour la section internationale

- **Aide aux devoirs par IA soumise à l'accord d'un parent** (point 3 de l'audit) :
  - nouvelle carte dans l'Espace parents : ce qui est envoyé, à qui, et que rien n'est conservé ;
  - sans accord, l'élève a la méthode pas à pas, rien n'est envoyé ;
  - l'appli joint l'accord à chaque demande, et le serveur (devoirs.php) refuse une demande sans accord (403, testé) ;
  - legal.html le précise.
- **Paquet de production** (point 5) : `outils/preparer-www.js` (GitHub Pages, Android) regroupe les 186 scripts de la page principale en un seul fichier, dans le même ordre. Le service worker le garde hors connexion, avec un nouveau nom de cache. `--sans-paquet` revient à l'ancien comportement. Nouveau test `tests/paquet.test.js` : le jeu chargé par le paquet est identique à celui des scripts séparés (matières, chapitres, questions, actions), lancé par `npm test`.
- **« Prêt à publier ? »** (points 1, 2, 6, 7) :
  - `npm run publication` liste ce qui est réellement activé (serveur, paiement, fonctions masquées), les points bloquants (15 passages de legal.html à compléter, la conservation chez le fournisseur d'IA à préciser) et les vérifications à faire à la main ;
  - `-- --strict` échoue tant qu'il reste un point bloquant ;
  - nouveau docs/AVANT-PUBLICATION.md ;
  - le README dit en tête ce qui est activé, ce qui demande un serveur, ce qui est masqué, et qu'il faut `npm install` avant les tests.
- **Section internationale, « 🏫 Mon lycée »** :
  - choix entre Lycée Camille Pissarro (Pontoise), Lycée international Palaiseau Paris-Saclay et Lycée international de Saint-Germain-en-Laye ;
  - pour chacun, quelques faits vérifiés et les liens officiels ;
  - « Mes six œuvres au programme » (3 pour l'écrit, 3 pour l'oral) à noter, gardées sur l'appareil.
- **Ce qui reste hors de portée du code** :
  - la relecture juridique et les informations de l'éditeur ;
  - les essais sur de vrais appareils ;
  - le test d'intrusion d'un serveur déployé ;
  - le chargement des matières à la demande.

## Version 6.78 — section internationale : préparation complète, du collège au BFI 2026

- **200 questions de plus** (js/mat-anglais-international2.js), en anglais. Avec la v6.77, la section internationale passe à 340 questions : 2 chapitres de 20 par classe, 3 en 3e, 1re et Tle.
  - **DNL histoire-géographie en anglais**, de la 6e à la terminale. Le programme français d'histoire-géographie y est vu avec le regard britannique des sections internationales : Magna Carta, Tudors, Glorious Revolution, révolution industrielle, abolition de l'esclavage, époque victorienne, guerres mondiales, NHS, guerre froide, Thatcher, Brexit. On y trouve aussi métropolisation, mondialisation, mers, transition démographique et environnement.
  - **Méthode d'examen** :
    - 3e : oral et écrit du brevet option internationale (PEE, signposting, registre) ;
    - 1re : dissertation et commentaire du BFI (thèse, close reading, diction, syntaxe, contre-argument) ;
    - Tle : oral de connaissance du monde et DNL (problématique, sources, biais, données, échange avec le jury).
- **🎓 Examens de la section internationale** (js/mod-section-internationale.js), carte sur l'écran de la matière :
  - **le BFI en bref** : enseignements spécifiques, six œuvres (trois à l'écrit, trois à l'oral), coefficients 20, DNL écrit et oral, avec les liens éduscol et education.gouv.fr ;
  - **plan de préparation de A à Z** : 24 étapes de septembre de 1re aux résultats, à cocher, avec une barre de progression ;
  - **BFI blanc** : écrit d'approfondissement culturel et linguistique (30 questions, 60 min), DNL histoire-géographie (20 questions, 40 min), oral de connaissance du monde (16 sujets de questions vives, avec notions à mobiliser et plan possible, chrono de préparation puis d'exposé, grille d'auto-évaluation sur 5 critères). Bilan : moyenne indicative des trois notes ;
  - **brevet option internationale blanc** : écrit de 30 questions et oral en anglais ;
  - tous les chapitres de la section et les contrôles par trimestre.
- **Choix prudents** :
  - les écrits blancs sont faits des questions du jeu (chronométrés, sans vanne, corrigés à la fin) ;
  - les durées de l'oral sont des durées d'entraînement, l'écran le dit ;
  - rien n'est enregistré au micro ;
  - le bilan reste indicatif (les coefficients officiels s'appliquent au vrai bac).
- Tests : v6.78 ; le test v6.77 accepte maintenant plusieurs chapitres par classe.

## Version 6.77 — « Mon pays » et anglais de section internationale (6e → BFI)

- **🌍 Mon pays** (js/systemes-scolaires.js, js/mod-parcours-pays.js) : carte sur l'écran des matières.
  - L'élève choisit son système scolaire : France, Italie, Espagne, Allemagne, États-Unis ou Angleterre.
  - Il voit ses classes avec l'équivalent français par âge (1º de ESO ≈ 5e, Year 11 ≈ 2nde, 5ª superiore ≈ Tle…). Un clic règle le niveau des matières et des maths.
  - Il voit les fiches des examens de son pays, avec la classe où on les passe.
- **Entraînements d'examen en maths, dans la langue du pays** (exercices du coin maths, déjà traduits) : chronométrés, sans vanne, corrigés à la fin et notés comme là-bas.
  - Espagne : simulacro de Matemáticas II (PAU), noté sur 10, avec le calcul de la note d'accès (60 % bachillerato + 40 % PAU, à partir de 4/10).
  - Italie : maturità, sur 20 ; Allemagne : Abitur, en % ; États-Unis : SAT Math (22 questions, 35 min, score brut) ; Angleterre : GCSE Maths.
  - L'interface reste dans la langue choisie ; la langue des questions est rétablie après la génération.
  - L'écran précise que c'est un entraînement sur les notions, pas le vrai sujet.
  - La France renvoie aux brevets et bacs blancs existants.
- **🌐 Anglais section internationale (6e → BFI)** (js/mat-anglais-international.js) : pour les sections internationales britanniques ou américaines (lycée international de Saint-Germain-en-Laye, lycée international Palaiseau Paris-Saclay, section britannique du lycée Camille Pissarro), un niveau qui monte plus vite et plus haut que la LVA. 7 classes × 20 questions, en anglais (questions, réponses, vannes, règles) :
  - 6e (A2+ → B1) : grammaire et lecture ;
  - 5e (B1) : récit et poésie (figures de style, rimes) ;
  - 4e (B1+ → B2) : Shakespeare, rhétorique (ethos, pathos, logos), conditionnels ;
  - 3e (B2) : inversions, ironie, narrateur, histoire en anglais (révolution industrielle, droit de vote des femmes, NHS, droits civiques), vers le brevet option internationale ;
  - 2nde (B2 → C1) : sonnet, Orwell, Golding, Steinbeck, Shakespeare ;
  - BFI 1re (C1) : approfondissement culturel et linguistique (romantisme, Dickens, Austen, modernisme, gothique, dissertation, commentaire) ;
  - BFI Tle (C1 → C2) : littérature postcoloniale, dystopies, rhétorique (anaphore, chiasme), connaissance du monde (ODD, accord de Paris, ONU, Brexit).
  - Les œuvres sont citées par leur titre, jamais recopiées.
- Tests v6.77 (deux tests).

## Version 6.76 — les examens de chaque pays, dans le jeu dès maintenant

- **js/examens-monde.js** : les fiches des examens de fin d'études, vérifiées sur les sources officielles en novembre 2026, sans attendre le serveur :
  - France : diplôme national du brevet 2026 (épreuves, durées, coefficients, 40 % / 60 %, moyenne de 10/20) et baccalauréat général (épreuves anticipées de français et, nouveau, de mathématiques) ;
  - Italie : esame di maturità (40 points de crédit + 3 × 20, 60/100, bonus de 3 points, oral sur quatre disciplines) ;
  - Espagne : PAU (60 % bachillerato + 40 % phase d'accès, au moins 5/10, quatre examens) ;
  - Allemagne : Abitur (900 points, au moins 300, 4 ou 5 matières) ;
  - États-Unis : SAT (400 à 1600, deux parties) ;
  - Angleterre : GCSE (9 à 1) et A levels (A* à E).
- **Onglet 🏛️ Officiel** : « 🌍 Les examens, pays par pays », avec pour chaque fiche le résumé, les conditions d'obtention, la liste des épreuves, ce qui change et la source officielle. Le titre et les libellés sont traduits en 5 langues ; le contenu des fiches est en français.
- **Veille** : une ligne de source peut fixer l'identifiant de la fiche (`'id' => 'pau'`…). La fiche publiée par le serveur remplace alors la fiche intégrée au lieu de s'ajouter à côté. Sources ajoutées : PAU (La Moncloa), SAT (College Board), GCSE (gov.uk) ; identifiants fixés pour le brevet, le bac, la maturità et l'Abitur.
- Tests : v6.76, v6.75 adapté (la fiche du serveur remplace la fiche intégrée) ; test serveur adapté (identifiant fixé).

## Version 6.75 — veille des programmes, des épreuves et des diplômes (toutes matières, plusieurs pays)

- **But** : quand un ministère change un programme, un examen ou un diplôme, le site le repère seul et prépare la mise à jour (voir docs/VEILLE-PROGRAMMES.md).
- **Serveur** (serveur-php/veille.php, veille-publier.php, veille-sources.php) :
  - la veille, qui ne suivait que les maths en France, lit maintenant toutes les matières et plusieurs systèmes scolaires : France, Italie, Espagne, Allemagne, États-Unis, Royaume-Uni ;
  - chaque pays a ses domaines officiels ; un document d'un autre domaine est refusé, même après une redirection ;
  - nouvelles sortes : `epreuve` et `diplome` (épreuves, durée, notation, conditions d'obtention, ce qui change), en plus de `programme` et `annales` ;
  - pour un chapitre du programme français que le jeu ne couvre pas encore, l'IA rédige 20 questions (leurres et vannes), à valider ;
  - un document inchangé n'est pas relu : la veille ne coûte rien tant que rien ne bouge.
- **Publication automatique (option)** : `veille_publication_auto` dans config.php pour `programme`, `annales`, `epreuve`, `diplome`. Les **questions ne se publient jamais seules**, même si la configuration le demande (test serveur).
- **Coin admin** : affiche chaque sorte (chapitres reliés ou 🆕 nouveaux, ce qui change, épreuves, questions avec leurs vannes) ; publier() déplacé dans veille-publier.php, partagé avec la publication automatique.
- programme.php : `?quoi=contenus`, `?quoi=examens`, `?quoi=programmes`. catalogue.json contient maintenant les chapitres des 19 matières (pour relier un programme aux chapitres existants).
- **Jeu** (js/mod-veille-programmes.js) :
  - les nouveaux chapitres publiés apparaissent dans la matière et la classe, marqués 🆕 ;
  - l'onglet 🏛️ Officiel montre « ce qui change » pour les examens, en France et dans les autres pays ;
  - tout est revérifié dans le jeu : identifiants, format, au moins 10 questions, vannes passées au juge de Plumo, liens https seulement.
- Sources réelles ajoutées :
  - France : nouveau programme de français de cycle 4 (en 5e à la rentrée 2026), modalités du DNB 2026, examens 2026 ;
  - Italie : esame di maturità ;
  - Espagne : RD 217/2022 (ESO) ;
  - Allemagne : Abitur (KMK) ;
  - États-Unis : Common Core.
- **Documents** : 2 nouveaux en histoire-géo (« Un monde de plus en plus urbain », 6e-5e ; « La croissance de la population mondiale », 5e-2nde). Histoire-géo couvre maintenant toutes les classes, de la 6e à la Tle. 24 documents en tout.
- **Grands écrans d'ordinateur** : à partir de 1 400 px de large, tout grandit (textes, cartes, boutons) par paliers à 1 400, 1 800 et 2 300 px ; sur 1 800 px et plus, des cartes plus larges. Rien ne change en dessous de 1 400 px (téléphones, tablettes). Si l'élève a choisi une taille de texte dans les Réglages, son choix reste prioritaire.
- Tests : v6.75 (jeu) et 8 vérifications de plus au test serveur (51 en tout) ; la vérification « le texte du document part vers Claude » est renforcée (les deux documents, sans script).

## Version 6.74 — « sûr(e) / pas sûr(e) » et 8 nouveaux documents

- **🎯 Sûr(e) / 🤔 Pas sûr(e)** : avant de répondre (maths et matières, pas en contrôle), l'élève peut dire s'il est sûr de lui. C'est facultatif ; un second clic annule.
  - Sûr(e) et faux : message « c'est l'erreur à retenir en priorité » ; l'erreur est marquée et passe en tête de la révision du jour.
  - Pas sûr(e) et juste : possible coup de chance ; la question entre dans le carnet et revient le lendemain.
  - Espace parents : carte « Lucidité » (part des réponses « sûr(e) » qui étaient justes, réponses justes malgré un doute), à partir de 5 réponses notées.
- **8 nouveaux documents (32 questions)**, pour couvrir les classes qui n'en avaient pas :
  - histoire-géo & EMC : préambule de la Constitution de 1946 (3e, Tle), Jaurès, « Discours à la jeunesse » (1903, 1re-Tle) ;
  - SVT : première et deuxième injection d'un vaccin (3e, 2nde), une enzyme et la température (2nde, 1re), dater avec le carbone 14 (1re, Tle) ;
  - physique-chimie : de la glace à la vapeur (6e, 5e), préparer une solution diluée (2nde), vitesse et énergie cinétique (1re, Tle).
- En tout : 22 documents, 98 questions. Toutes les classes ont au moins un document en histoire-géo (de la 4e à la Tle), français (6e-1re), SVT et physique-chimie. Le test le vérifie, ainsi que la mention « Document d'exercice » sur toutes les données construites en sciences et en SES.
- Textes d'écran traduits en 5 langues. Test v6.74, test v6.73 complété.

## Version 6.73 — études de documents

- **📄 Études de documents** : un texte ou un tableau de mesures, puis 4 ou 5 questions dessus, comme au brevet et au bac (prélever, comprendre, relier au cours, calculer). Carte « Études de documents (n) » sur l'écran d'une matière quand la classe choisie en a ; liste des documents, un document seul ou « tous à la suite » (20 questions au plus).
- 14 documents, 66 questions :
  - histoire-géo & EMC : Déclaration des droits de l'homme (1789), décret d'abolition de l'esclavage (1848), Olympe de Gouges (1791), loi de 1905, Constitution de 1958 ;
  - français : « Le Corbeau et le Renard », « Demain, dès l'aube… », « L'Albatros » ;
  - SVT : conditions de la germination, le corps pendant l'effort ;
  - physique-chimie : loi d'Ohm, mouvement d'un cycliste ;
  - SES : mesurer le chômage, calculer une évolution de prix.
- Les textes sont des sources libres de droits (textes officiels, poèmes et fables d'avant 1929), cités exactement. Les mesures et les chiffres sont construits pour l'exercice, et le document le dit (« Document d'exercice », « données fictives »).
- Le document reste affiché au-dessus de chaque question. Les leurres sont des erreurs typiques (diviser par la mauvaise population, confondre comparaison et métaphore, oublier qu'une baisse se calcule depuis la nouvelle valeur…), avec des vannes acceptées par le juge. Une question ratée part en révision du jour avec son document.
- Documents en français ; si l'interface est dans une autre langue, l'écran le signale. Module js/mod-documents.js, textes d'écran traduits en 5 langues. Test v6.73.

## Version 6.72 — pièges sérieux en contrôle

- **Le problème** : beaucoup de questions de cours opposaient une bonne réponse longue et précise à des leurres courts et farfelus (« une plage privée », « un petit village »). On trouvait la bonne réponse sans rien savoir, juste à sa longueur.
- **En contrôle de trimestre (matières)**, un leurre plus court que 45 % de la bonne réponse est remplacé par la bonne réponse d'une AUTRE question du même chapitre : il faut vraiment distinguer les notions proches (métropolisation / aire d'attraction, gène / allèle, incidence / prévalence…). À l'entraînement, rien ne change : les leurres d'origine et leurs vannes restent.
- **Garde-fous** pour ne jamais créer deux bonnes réponses : seulement les réponses d'au moins 25 caractères ; jamais pour une question à trou, négative, « vrai ou faux » ou « un exemple » ; même type de question (où, quand, qui, pourquoi, définition, « quel » + même nom) et même tournure de réponse (article, préposition…) ; longueur voisine ; rien qui ressemble à la bonne réponse, qui vienne d'une question sur le même sujet ou qui figure dans la règle ; même langue.
- Sur les 6 209 questions des banques (en français), environ 700 sont concernées, pour environ 1 200 leurres remplacés. Si l'élève choisit un leurre emprunté, la correction lui explique que c'est la réponse d'une autre question du chapitre.
- Phrase ajoutée sur l'écran des trimestres, traduite en 5 langues. Les maths ne sont pas touchées (leurs leurres sont déjà calculés à partir des erreurs typiques). Test v6.72.

## Version 6.71 — apprendre pour de bon : révision espacée, réponse écrite, signalement

- **🗓️ Révision du jour (révision espacée)** : chaque question ratée — en maths comme dans toutes les matières — revient le lendemain, puis 3, 7 et 21 jours plus tard. Réussie le jour prévu, elle monte d'une boîte ; réussie à la dernière boîte, elle est « maîtrisée » et quitte le carnet ; ratée, elle repart à J+1. Une bonne réponse le jour même ne compte pas. Carte « Révision du jour (n) » sur l'écran des matières et dans le coin maths, avec un bilan à la fin.
- Changement voulu : avant, une bonne réponse dans « Mes erreurs » retirait tout de suite la question ; le test v5.98 a été adapté à la nouvelle règle (et non masqué). Le carnet garde jusqu'à 200 questions (80 avant), les maths y entrent désormais.
- **✍️ Réponse écrite (rappel actif)** : interrupteur sur l'écran des matières et dans le coin maths. Pour les réponses courtes (4 mots au plus), l'élève écrit d'abord sa réponse ; les choix n'apparaissent que s'il se trompe ou les demande. Tolérances : majuscules, accents, article de tête, virgule ou point décimal, partie entre parenthèses. Juste = +1 plume bonus et rappel de l'orthographe exacte ; fausse = la question part en révision, même si le bon choix est trouvé ensuite.
- **🚩 Signaler une erreur** : bouton sous la correction de chaque question de maths ou de matière ; la question est gardée sur l'appareil (300 au plus) et listée dans l'Espace parents, avec un bouton pour vider la liste. Rien n'est envoyé.
- **Plus d'espace à l'écran** : la limite de 1 760 px saute sur les grands écrans (96 % de la largeur, partout) ; l'intro est centrée ; sur 2 000 px et plus, des cartes plus grandes. Écran de fin de trimestre : bilan par chapitre en grille large (vert/rouge), correction en cartes numérotées côte à côte au lieu d'une colonne centrée.
- Nouveau module js/mod-revision.js, textes traduits en 5 langues. Test v6.71. Outil de test : `SEUL=v6.71 node tests/jeu.test.js` lance un seul test (par défaut, tous les tests tournent).

## Version 6.70 — Français, espagnol et allemand du lycée : chaque chapitre à 20 questions (le lycée est complet)

- +109 questions dans `js/mat-langues-lycee-fin.js`.
- Français (fr, en, es) :
  - r-f1 de 7 à 20 (œuvres, mouvements, apologue, roman épistolaire, anaphore, dissertation) ;
  - cours-2nde de 12 à 20 (Du Bellay, narrateur omniscient, quatrain, rimes, didascalie, registres) ;
  - cours-1re de 12 à 20 (explication linéaire, oral, contraction et essai, métaphore, relative, interrogation indirecte, parcours).
- Espagnol (fr, en) :
  - es-ser de 4 à 20 (ser ou estar, pronoms, enclise) ;
  - es-lycee de 5 à 20 (subjonctif, concordance, hypothèse, faux amis, périphrases) ;
  - es-bases-lycee de 10 à 20.
- Allemand (fr, en, es) :
  - de-2nde de 5 à 20 (prétérit, comparatif, wenn ou als, ob, obwohl, dass) ;
  - de-lycee de 5 à 20 (Konjunktiv I et II, passif, relatives, um … zu, faux amis) ;
  - de-revisions de 11 à 20.
- Les vannes allemandes évitent l’article « die » : le juge le lit comme le mot anglais.
- Tous les chapitres à banque du lycée ont maintenant au moins 20 questions.
- Nouveau test v6.70 : 20 questions par chapitre, traductions alignées, vannes validées, séries complètes, trimestres d’au moins 12 questions.

## Version 6.69 — Spécialités HGGSP, HLP, NSI et SES : chaque chapitre à 20 questions

- +146 questions en français, anglais et espagnol, dans deux fichiers :
  - `js/mat-specialites-fin.js` : HGGSP et HLP ;
  - `js/mat-specialites-fin2.js` : NSI et SES.
- HGGSP : chapitre de 1re de 5 à 20 questions, chapitre de Tle de 6 à 20, cours 1re-Tle de 12 à 20. Thèmes : puissance, démocratie, frontières, information, mers et espace, mémoire, environnement, connaissance.
- HLP : 1re de 5 à 20, Tle de 6 à 20, cours de 12 à 20. Titres d’œuvres traduits.
- NSI : 1re de 6 à 20, Tle de 5 à 20, cours de 12 à 20. Python, web, réseaux, SQL, graphes, programmation objet, complexité, systèmes.
- SES : 1re de 9 à 20, Tle de 4 à 20, cours de 12 à 20. Marchés, monnaie, socialisation, croissance, chômage, stratification, école, mondialisation, action publique.
- `MATIERES.trimestres` : un chapitre à banque qui a aussi un générateur (NSI 1re) est maintenant coupé en trois tranches, comme les autres. Les contrôles de chaque trimestre ont ainsi au moins 12 questions.
- Nouveau test v6.69 : 20 questions par chapitre, traductions alignées, vannes validées, séries complètes dans chaque langue, trimestres d’au moins 12 questions.

## Version 6.68 — Histoire-géographie du lycée : chaque chapitre à 20 questions

- Histoire-géographie (2nde, 1re, Tle) : +88 questions dans `js/mat-histoire-lycee-fin.js`, en français, anglais, espagnol et allemand.
- Les chapitres de 2nde, 1re et Tle passent à 20 questions :
  - « Repères du lycée » : de 5 à 20 ;
  - r-h2 (Renaissance, Lumières, risques) : de 4 à 20 ;
  - r-h1 (XIXe siècle, IIIe République, métropoles) : de 3 à 20 ;
  - r-ht (crises, Europe, mondialisation) : de 4 à 20 ;
  - cours de l’année cours-hg2, cours-hg1 et cours-hgt : de 12 à 20.
- Les nouvelles questions sont rangées dans les chapitres « Par thème » de leur époque, ajoutées en fin de liste pour ne pas déplacer les compléments de 3e (`js/themes.js`).
- Aucune question nouvelle ne mentionne une guerre hors de son chapitre de guerre (règle v6.19 respectée).
- Contrôles par trimestre d’histoire-géo au lycée : 20 questions à chaque trimestre, en 2nde, 1re et Tle (au lieu de 10 à 17).
- Nouveau test v6.68 : 20 questions par chapitre, traductions alignées, vannes validées, séries complètes, questions de révision rangées dans un thème.

## Version 6.67 — Physique-chimie du lycée : chaque chapitre à 20 questions

- Physique-chimie (2nde, 1re, Tle) : +45 questions dans `js/mat-physique-lycee-fin.js`, en français, anglais, espagnol et allemand.
- Révision r-p1 : de 10 à 20 questions (masse molaire, polarité, concentration, travail, puissance, gravitation, champ électrique, retard d’une onde, synthèse additive, combustion).
- Révision r-pt : de 9 à 20 questions (pKa, base de Brønsted, t½, projectile, satellite, circuit RC, diffraction, photon, transferts thermiques, désintégration α, électrolyse).
- Cours de l’année cours-pc2, cours-pc1 et cours-pct : de 12 à 20 questions chacun.
- Les nouvelles questions de révision sont rangées dans les thèmes de physique (`js/themes.js`).
- Contrôles par trimestre de physique : 20 questions en 2nde ; de 7-8 à 12-14 questions en 1re et en Tle (deux chapitres à banque par classe, coupés en trois).
- Nouveau test v6.67.

## Version 6.66 — Contrôles par trimestre dans toutes les matières, contrôles sans vanne, corrections de l’audit v6.49

**Contrôles par trimestre partout**
- Maths : toutes les classes, de la 6e à la Tle, ont « 📅 Mes trimestres ». La 1re et la Tle gardent leur progression de spé ; les autres classes sont coupées en trois dans l’ordre du programme.
- Matières : chaque matière, dans chaque classe, a une carte « 📅 Mes trimestres » sur son écran (77 couples matière-classe).
  - `MATIERES.trimestres(id, niveau)` coupe les chapitres du niveau en trois tiers, dans l’ordre.
  - Les cours de l’année (cours-…) et les révisions (r-…) sont coupés en trois tranches de questions, sans chevauchement.
  - `MATIERES.serieParts` tire une série dans ces morceaux, avec les mêmes règles de langue que les séries habituelles.
- Pour chaque trimestre : un entraînement (avec vannes) et un contrôle chronométré noté sur 20, plus un contrôle bilan de l’année. Les notes sont gardées et bornées.
- Quand une classe a encore moins de 20 questions sur un trimestre, le contrôle en a moins (« au plus 20 » à l’écran). Le remplissage du lycée en cours augmentera ces séries.

**Contrôles sans vanne**
- Nouvelle option `sansVanne` de `questionsGo` (js/jeu.js). Pendant un contrôle : aucune vanne, aucune vanne IA demandée, aucune correction. La réponse est gardée et on passe à la question suivante.
- À la fin : une appréciation sobre (Très bien, Bien, Assez bien, Passable, Insuffisant), le bilan par chapitre et la correction détaillée de chaque erreur (ta réponse, la bonne réponse, la règle).
- Les entraînements gardent l’humour de Prof Pi et de Plumo.

**Corrections de l’audit v6.49**
- Confidentialité (`legal.html`) :
  - nouvelle ligne « Aide aux devoirs » dans le tableau des traitements : texte, photo (JPEG, PNG, WebP) ou PDF, questions, travail de l’élève ;
  - la fiche Anthropic dit maintenant que les devoirs envoyés par l’élève (texte, photo, PDF) lui sont transmis ;
  - paragraphe sur les enfants, avec un point à faire valider par un juriste.
- README : les langues annoncées correspondent au code (6 langues d’interface, 6 à apprendre ; les autres langues restent masquées dans les données).
- Accessibilité : `user-scalable=no` et `maximum-scale=1` retirés de `mots-city.html` et `monde-3d.html`, pour que le zoom reste possible.
- Tests serveur (`npm run test:serveur`, PHP + MariaDB) passés en entier : 43 réussis.
- Restent à compléter par l’éditeur dans `legal.html` : statut, adresse, SIRET, e-mail de contact, hébergeur final, TVA, médiateur, clauses de transfert et durée de conservation chez Anthropic, validation juridique.

**Tests**
- Nouveau test v6.66.
- Test v6.65 mis à jour : contrôle sans vanne ni bouton « suivant », correction à la fin, trimestres en 6e.

## Version 6.65 — Spé maths : entraînements et contrôles par trimestre (1re et Tle)

- Nouveau module `js/mod-trimestres.js` : une carte « 📅 Mes trimestres de spé maths » dans le coin maths, en 1re et en Tle.
- Pour chaque trimestre (T1 septembre → novembre, T2 décembre → mars, T3 mars → juin) :
  - un entraînement de 20 questions, corrigé, sans chrono ;
  - un contrôle de 20 questions en 40 minutes, noté sur 20. La dernière et la meilleure note sont gardées.
- Un contrôle bilan de l’année mélange les trois trimestres.
- La fin d’un contrôle affiche un bilan par chapitre. Les chapitres sous 60 % sont proposés « à retravailler » et ouvrent directement l’entraînement du chapitre.
- Progression 1re : second degré et suites, puis dérivation, probabilités conditionnelles et produit scalaire, puis exponentielle, trigonométrie, cercle et variables aléatoires.
- Progression Tle : suites et fonctions (limites, TVI, dérivation, convexité), puis logarithme, sinus et cosinus, dénombrement et binomiale, puis primitives, intégrales, espérance et variance.
- La progression suit l’ordre le plus courant : c’est un repère, pas le vrai contrôle de la classe (dit à l’écran).
- `js/maths.js` : `MATHS.serie` accepte une liste de chapitres et les mélange comme un niveau.
- `js/jeu.js` : zone de cartes `maths` pour les modules ; actions ajoutées au coin maths.
- Textes traduits en 5 langues. Les notes lues sur l’appareil sont vérifiées et bornées entre 0 et 20.
- Nouveau test v6.65 : couverture du programme par les trimestres, séries de 20 sans doublon, chrono, notes gardées, bilan, interface anglaise.

## Version 6.64 — SVT du lycée : chaque chapitre à 20 questions

- SVT (2nde, 1re, Tle) : +54 questions dans `js/mat-svt-lycee-fin.js`, en français, anglais, espagnol et allemand.
  - Révisions r-s2, r-s1 et r-st : de 10 à 20 questions chacune.
  - Cours de l’année cours-sv2, cours-sv1 et cours-svt : de 12 à 20 questions chacun.
- Les nouvelles questions de révision sont rangées dans les chapitres « Par thème » (`js/themes.js`) : cellule et ADN, plantes, écosystèmes, immunité, corps humain, Terre.
- Vannes validées par le juge en français, anglais et espagnol.
- Nouveau test v6.64 : au moins 20 questions par chapitre, aucun doublon, traductions alignées dans les trois langues, séries de 20 complètes à chaque niveau.

## Version 6.63 — Anglais du lycée : chaque leçon à 20 questions

- Anglais (2nde, 1re, Tle) : +280 questions dans `js/mat-anglais-lycee-fin.js`.
- Les 16 leçons du lycée passent chacune à 20 questions :
  - grammaire : present perfect en be + -ing, déduction, wish, phrasal verbs, mots de liaison, conditionnel passé, have something done, V-ing ou to, inversion, I’d rather, insistance ;
  - pièges de traduction et compréhension de l’écrit ;
  - axes de 2nde et du cycle terminal ;
  - bac et attestation de langues.
- La banque reste en français, comme les chapitres d’origine : consignes en français, phrases en anglais.
- Vannes validées par le juge.
- Nouveau test v6.63 : chaque leçon de lycée a au moins 20 questions, aucun doublon, trois pièges distincts, séries de 20 sans répétition à chaque niveau.

## Version 6.62 — Philosophie : chaque notion à 20 questions

- Philosophie (Tle) : +292 questions réparties dans trois nouveaux fichiers, `js/mat-philo-plus.js`, `js/mat-philo-plus2.js` et `js/mat-philo-plus3.js`.
- Le cours de l’année (r-philo, r-philo2) et les 17 notions (art, bonheur, conscience, devoir, État, inconscient, justice, langage, liberté, nature, raison, religion, science, technique, temps, travail, vérité) passent chacun à 20 questions.
- Tout est en français, en anglais et en espagnol. Les titres d’œuvres et les citations sont traduits.
- Les vannes sont validées par le juge.
- Nouveau test v6.62 : au moins 20 questions par chapitre, aucun doublon, traductions alignées, vannes validées, séries de 20 complètes.

## Version 6.61

- Anglais après le bac : les 5 chapitres (certifications, anglais universitaire, scientifique, professionnel, niveau C1) passent de 8 à 20 questions (60 questions de plus).
- Objectif NASA : les 7 chapitres à banque (parcours, métiers, missions, anglais de mission, code, géopolitique, GEOPS) passent à 20 questions (73 questions de plus), traduites en anglais et en espagnol ; les chapitres de calcul restent générés.
- Nouveau test v6.61 : 20 questions minimum par chapitre, sans doublon, traductions NASA alignées, séries de 20.

## Version 6.60

- Droit (Sup) : les 19 chapitres passent à 20 questions (288 questions de plus) — institutions, bases et métiers, droit au quotidien, introduction, histoire du droit, méthodologie, droit constitutionnel, administratif, libertés fondamentales, finances publiques, droit européen, droit international, personnes et famille, obligations, biens, pénal, affaires, travail, organisation de la justice.
- Toutes les nouvelles questions sont traduites en anglais et en espagnol, dans le même ordre ; vannes validées par le juge (pas de « nul », pas de dates qui ressemblent à un numéro).
- Nouveau test v6.60 : 20 questions minimum par chapitre de droit, sans doublon, traductions alignées, séries de 20 dans les 3 langues.

## Version 6.59

- Médecine (Sup) : les 14 chapitres passent à 20 questions (214 questions de plus) — anatomie, physiologie, études de santé (PASS, L.AS, EDN, ECOS, internat), sang et immunité, biochimie, biologie cellulaire, histologie et embryologie, génétique, biophysique et imagerie, pharmacologie, santé publique et biostatistiques, sémiologie, premiers secours, éthique et droit de la santé.
- Toutes les nouvelles questions sont traduites en anglais et en espagnol, dans le même ordre ; les vannes passent le juge (aucun mot de violence, aucun « Non. » sec).
- Nouveau test v6.59 : 20 questions minimum par chapitre de médecine, sans doublon, traductions alignées, séries de 20 dans les 3 langues.

## Version 6.58

- Géographie et EMC du collège : les 10 cours de l’année (géographie 6e, 5e, 4e, 3e ; EMC 6e, 5e, 4e, 3e, cycle 3 et cycle 4) passent de 12 à 20 questions (80 questions de plus), traduites en anglais, espagnol et allemand dans le même ordre.
- Le collège est complet : toutes les leçons de toutes les matières, de la 6e à la 3e, ont maintenant au moins 20 questions.
- Chapitres « Par thème » : une même question n’y entre plus qu’une fois, même quand un cours de l’année la reprend.
- Nouveau test v6.58 : aucune leçon du collège sous 20 questions ; géographie et EMC traduites en 4 langues, vannes validées, série complète de 20.

## Version 6.57

- Espagnol LV2 du collège : chaque leçon de la 5e à la 3e passe à au moins 20 questions (48 questions de plus : se présenter, présent irrégulier, vocabulaire, culture, grammaire, passé, cours de l’année 5e, 4e et 3e), traduites en anglais.
- Allemand LV2 du collège : chaque leçon de la 5e à la 3e passe à au moins 20 questions (44 questions de plus : bases, vocabulaire, culture, grammaire, modaux et parfait, cours de l’année 5e, 4e et 3e), traduites en anglais et en espagnol.
- Nouveau test v6.57 : 20 questions minimum par leçon d’espagnol et d’allemand, sans doublon, traductions alignées, vannes validées par le juge, série complète de 20.

## Version 6.56

- Français du collège : chaque leçon de la 6e à la 3e passe à au moins 20 questions (120 questions de plus : nature, fonctions, vocabulaire, types et formes de phrases, orthographe rectifiée, groupe nominal et étymologie, accords, modes et temps composés, voyage et héros, figures de style, dire l’amour, littérature, cours de l’année).
- Toutes les nouvelles questions sont traduites en anglais et en espagnol, dans le même ordre ; les mots français étudiés restent entre guillemets.
- Nouveau test v6.56 : 20 questions minimum par leçon de français, traductions alignées, vannes validées par le juge, série complète de 20.

## Version 6.55

```text
Ami des mots — version 6.55
- Anglais du collège (LV1) : toutes les leçons de la 6e à la 3e ont au moins 20 questions
  (js/mat-anglais-college-fin.js, environ 155 questions) : be et have got, présent simple, there is,
  can et impératif, possessifs, vocabulaire, présent en be + -ing, prétérit, comparatifs, quantifieurs,
  culture, present perfect, futur, modaux, passif, conditionnel, discours indirect, relatives, faux amis,
  cours de la 6e à la 3e, Royaume-Uni, Irlande, États-Unis.
- Test : chaque leçon d'anglais du collège à 20 questions, sans doublon, vannes validées par le juge.
```

---

## Version 6.54

```text
Ami des mots — version 6.54
- 📖 « Je n'ai pas compris la leçon » (js/mod-lecon.js + serveur-php/lecon.php) :
  · un bouton 📖 à côté de chaque chapitre, et en fin de série quand on a moins de 70 % ;
  · la fiche de la leçon s'affiche toujours, même sans IA : l'essentiel (les explications des questions
    du niveau, sans doublon) et des exemples question → bonne réponse ;
  · avec le serveur et la clé Claude : « ✨ Explique-moi la leçon » (idée principale, exemples, astuce),
    puis 3 questions de l'élève au plus ; 1 plume par réponse si les plumes sont allumées,
    30 réponses par jour et par IP (lecon_par_jour) ; seuls le chapitre, ses règles et la question partent ;
    questions avec lien, adresse ou numéro refusées ;
  · « ✅ Vérifier que j'ai compris » lance 5 questions du chapitre.
- Écran « 🎮 Jeux et entraînement » : l'ancien accueil, ouvert depuis la table des matières, perd le grand
  panneau du hibou et les menus de langue (déjà sur la page d'entrée) et la porte « Mes matières » en double ;
  un bouton retour ramène aux matières. Défi du jour, apprendre 5 mots, à revoir, mot du jour, professeur IA,
  battle, carnet, réglages et espace parents restent là.
- Technologie du collège à 20 questions (v6.53) incluse.
```

---

## Version 6.53

```text
Ami des mots — version 6.53
- Technologie du collège : toutes les leçons de la 5e à la 3e ont au moins 20 questions, en français,
  anglais, espagnol et allemand (js/mat-techno-college-plus.js, 52 questions) : cours de 5e, 4e et 3e,
  numérique (données, sécurité, droit à l'image), mécanismes et fabrication, démarche de projet.
```

---

## Version 6.52

```text
Ami des mots — version 6.52
- Physique-chimie du collège (et sciences et technologie de 6e) : toutes les leçons de la 6e à la 3e
  ont au moins 20 questions, en français, anglais, espagnol et allemand (js/mat-physique-college-plus.js,
  110 questions) : cours de 6e, 5e, 4e et 3e, algorithmes et programmes, familles de matériaux,
  électricité (sécurité, signaux, information), composition de l'Univers et éléments chimiques,
  électricité, la matière et ses états, révisions 6e-5e.
- Chapitres « Par thème » de physique enrichis (états de la matière, chimie, pH, électricité,
  mouvement, énergie, ondes et lumière).
- Test « défi du jour » corrigé : il lisait une liste de thèmes gratuits écrite en dur, plus à jour
  depuis la modification de js/offre.js (habits, musique, atelier) ; il échouait selon la date.
  Il force maintenant le mode payant et lit les thèmes gratuits dans js/offre.js.
```

---

## Version 6.51

```text
Ami des mots — version 6.51
- Vannes qui ne se répètent plus d'un exercice à l'autre :
  · mémoire des vannes déjà dites portée de 400 à 2000 par joueur (gardée sur l'appareil et dans la sauvegarde) ;
  · quand toutes les vannes d'une réserve ont été dites, on reprend seulement les plus anciennes (le dixième le plus ancien) ;
  · environ 330 vannes nouvelles (js/vannes-fraiches.js) : tchatche, entrées de round, bonnes réponses en trash talk,
    séries gagnées ou perdues, bonne réponse en ton « tout doux », « taquin » et « cash », réponse lente ou éclair,
    mot difficile, et bonnes réponses en anglais. Toutes visent la réponse, jamais la personne, et passent le juge.
- Astrophysique (Sup) : les 10 chapitres de connaissances passent de 4-7 questions à 20, en français, anglais
  et espagnol (js/mat-astro-plus.js, 152 questions).
- Tests : réserves de vannes, mémoire de 2000, astrophysique à 20 par chapitre.
```

---

## Version 6.50

```text
Ami des mots — version 6.50
- SVT du collège : toutes les leçons de la 6e à la 3e ont au moins 20 questions, en français,
  anglais, espagnol et allemand (js/mat-svt-college-plus.js, 87 questions).
  Corps humain et santé, cours de 6e, 5e, 4e et 3e, la planète Terre en 6e, génétique,
  révisions 6e et 5e-4e, la planète Terre, le vivant et la cellule.
- Chapitres « Par thème » de SVT enrichis avec les nouvelles questions (chaque question de révision
  reste rangée dans un thème ; « Cellule, ADN et génétique » reste hors 6e).
- Test : chaque leçon de SVT du collège à 20 questions, traductions alignées, séries complètes.
```

---

## Version 6.49

```text
Ami des mots — version 6.49
- Labo des sciences : 20 questions par thème (avant : 9 à 12). 39 nouvelles questions,
  en français, anglais, espagnol, allemand, italien et portugais (js/sciences-plus.js).
  · Planètes et espace : face cachée de la Lune, étoiles filantes, le Soleil est une étoile,
    la Voie lactée, traces de pas sur la Lune, Olympus Mons, poids sur la Lune, Neptune.
  · Fusées et astronautes : Spoutnik 1, Laïka, Valentina Terechkova, Apollo 11, Hubble, GPS,
    carburant, étages, rovers sur Mars, miettes en apesanteur.
  · Corps humain : battements du cœur, muscles, pupille, colonne vertébrale, cage thoracique,
    crâne, plaquettes, estomac, neurones, sommeil.
  · Médecine et microbes : taille des virus, fièvre, Jenner, Marie Curie, microscope,
    groupes sanguins, scorbut, thermomètre, caries, IRM, échographie.
- Séries du labo à 20 questions (« Tout mélangé » aussi) ; la fête du résultat à 80 % de bonnes réponses.
- Test : 20 questions par thème, traduites dans les 5 langues, série de 20 jouée en entier.
```

---

## Version 6.48

```text
Ami des mots — version 6.48
- Labo des sciences, corps humain : la question « Combien d’enfants ont-ils de dents de lait ? »
  (qui demandait en fait un nombre d'enfants) devient « Combien de dents de lait un enfant a-t-il ? ».
  Les traductions (en, es, de, it, pt) étaient déjà justes.
- Test ajouté contre la tournure « Combien d’X ont-ils de… » dans le labo des sciences.
```

---

## Version 6.47

```text
Ami des mots — version 6.47

📼 Le défi rétro : l'école des années 70, pour le fun et en famille (js/mod-retro.js), en français seulement.
- Carte « 📼 Le défi rétro » dans les outils de la table des matières (masquée si l'appli est dans une autre langue).
- Cinq épreuves de 20 questions : dictée et orthographe d'autrefois (imparfait du subjonctif, pluriels pièges),
  analyse logique et grammaticale (avec les termes d'époque), maths modernes (ensembles, bases de numération),
  calcul mental et mesures (preuve par neuf, ares, stères, quintaux, nouveau franc), géographie par cœur
  (préfectures, fleuves, affluents, numéros de départements).
- « 🎓 Le Grand BEPC rétro » : 4 questions de chaque épreuve, note sur 20 et mention (assez bien, bien, très bien).
- « 📜 Le programme des années 70 » : tiers-temps de 1969, mercredi libéré en 1972, maths modernes (programme du
  2 janvier 1970, allègement fin des années 1970), loi Haby du 11 juillet 1975 et collège unique en 1977, BEPC,
  latin repoussé en 4e (1968-1969), programmes du primaire de 1977-1980. Chaque repère est sourcé (liens en bas de page).
Les questions sont inspirées des programmes de l'époque : ce ne sont pas de vrais sujets d'examen.
Tests : 198 réussis (npm run verifier).
```

---

## Version 6.46

```text
Ami des mots — version 6.46

Histoire de 3e complète : toutes les leçons ont 20 questions, en français, anglais, espagnol et allemand
(js/mat-histoire-3e-plus.js). L'histoire du collège (6e à 3e) est donc entièrement à 20 questions par leçon.
- Années 1920-1930 : fascisme, Mein Kampf, Gestapo, goulag, collectivisation, propagande, culte du chef,
  6 février 1934, accords Matignon, Nuit de cristal, crise de 1929, New Deal.
- Guerre froide et décolonisation : plan Marshall, pacte de Varsovie, rideau de fer, blocus de Berlin, Corée, Chine 1949,
  course aux armements, Spoutnik, Diên Biên Phu, Gandhi, Bandung, détente.
- France depuis 1945 : Giscard, abolition de la peine de mort, cohabitation, Pompidou, euro, choc pétrolier, Chirac,
  quinquennat, Édith Cresson, TGV, immigration de travail, parité.
- 14-18 (+5), 39-45 (+6) ; XXe siècle (+12), révisions (+13), cours de l'année (+8).
Règle respectée : les questions qui parlent de guerre sont seulement dans les chapitres 14-18, 39-45 et guerre froide.
Tests : 197 réussis (npm run verifier).
```

---

## Version 6.45

```text
Ami des mots — version 6.45

Histoire 6e-5e-4e complète : toutes les leçons ont maintenant 20 questions, en français, anglais, espagnol et allemand
(js/mat-histoire-6-4-suite.js).
- Antiquité 6e (12 → 20) : Hammurabi, momification, Rê, Achille, Périclès, Pompéi, Constantinople, routes de la soie.
- Moyen Âge 5e (13 → 20) : cathédrale, Notre-Dame, Reconquista, 1453, mosquée, Coran, foires de Champagne.
- Révolution 4e (14 → 20) : Louis XVI, serment du Jeu de paume, Marseillaise, système métrique, départements, île d'Elbe.
- Cours de l'année 6e, 5e et 4e (12 → 20 chacun) : polythéisme, mythes, esclavage antique, Sparte, oracle, apôtres ;
  clergé, paroisse, dîme, Compostelle, Renaissance, Florence, monarchie absolue, Incas ;
  traite atlantique, commerce triangulaire, 1776, suffrage censitaire, syndicats, Schœlcher, Germinal, électricité.
Tests : 196 réussis (npm run verifier).
```

---

## Version 6.44

```text
Ami des mots — version 6.44

1. Histoire 6e-5e-4e : six leçons passent à 20 questions, en français, anglais, espagnol et allemand
   (js/mat-histoire-6-4-plus.js) : Hébreux (6e), Capétiens et Valois (5e), conditions des femmes au XIXe siècle (4e),
   révisions de 6e, de 5e et de 4e. Les chapitres « Par thème » (Antiquité, Moyen Âge, XIXe siècle) les reprennent.
2. Page d'accueil sur toute la largeur de l'écran, avec en bas : Mentions légales, Confidentialité,
   Conditions d'utilisation, Cookies (liens vers legal.html, traduits dans les 5 langues).
3. Ménage : les 111 fichiers VERSION-*.txt de la racine sont réunis dans un seul document,
   docs/HISTORIQUE-VERSIONS.md (de la plus récente à la plus ancienne). Rien n'est perdu.
Tests : 195 réussis (npm run verifier).
```

---

## Version 6.43

```text
Ami des mots — version 6.43

Histoire-géo, partie 1 : EMC et géographie à 20 questions par classe (6e, 5e, 4e, 3e), en français, anglais,
espagnol et allemand (js/mat-geo-emc-plus.js).

- EMC (5 → 20) : maire et conseil municipal, suffrage universel, Premier ministre, palais Bourbon, Luxembourg,
  Élysée, la loi, droit à l'image, instruction obligatoire, 112, drapeau européen, impôt, service public, article 1er de 1789.
- Géographie 6e (+13) : continents, déserts, Everest, Nil, espaces ruraux, milieux polaires, carte (légende, nord),
  station balnéaire, altitude, Atlantique.
- Géographie 5e (+13) : réchauffement climatique, énergies fossiles, espérance de vie, montée des mers, ressources
  renouvelables, agriculture bio, malnutrition, pays émergents, Nigeria, recyclage, dessalement, inondations, empreinte écologique.
- Géographie 4e (+13) : conteneur, exode rural, réfugiés, Internet, façades maritimes, Northern Range, hubs,
  canal de Panama, quartier d'affaires, ville durable, délocalisation, « made in monde », mobilités pendulaires.
- Géographie 3e (+10) : mont Blanc, Commission européenne, métropoles régionales, espaces productifs, tertiaire,
  Marseille, PAC, Guyane, parcs nationaux, TGV.

Chaque question est rattachée à sa classe ; les chapitres « Par thème » (géographie, EMC) les reprennent sans doublon.
Tests : 194 réussis (npm run verifier).
Suite : histoire 6e-5e-4e (v6.44), puis histoire 3e (v6.45).
```

---

## Version 6.42

```text
Ami des mots — version 6.42

Arts, EPS, latin et grec : 20 questions par leçon (au lieu de 8 à 10), en français, anglais et espagnol.
Les séries de 20 de ces leçons sont donc complètes, sans répétition.

- Arts plastiques (+10) : nature morte, couleurs chaudes et froides, camaïeu, cadrage, ronde-bosse, bas-relief, pointillisme, esquisse.
- Éducation musicale (+10) : quatuor, cuivres, nuance piano, canon, refrain, durées des notes, clé de sol, gamme, Beethoven.
- Histoire des arts 3e (+10) : Joconde, Nuit étoilée, Versailles, surréalisme, fresque, Louvre, chapelle Sixtine, art roman, vitrail, Impression soleil levant.
- EPS santé (+10) : hydratation, entorse, endurance, essoufflement, chaussures, petit-déjeuner, récupération, plongeon, parade, casque.
- EPS règles (+12) : football, basket, tennis de table, faux départ, zone du handball, orientation, volley, badminton, saut en hauteur, relais.
- Latin 5e (+12), latin 4e-3e (+12), grec ancien 3e (+12) : vocabulaire, chiffres romains, dieux, vie romaine, cas, racines grecques.

Toutes les vannes passent le juge ; aucun mot français dans les traductions ; aucun doublon.
Tests : 193 réussis (npm run verifier).
```

---

## Version 6.41

```text
Ami des mots — version 6.41

Mise à jour visible dès la première visite.
L'appli garde ses fichiers pour fonctionner hors connexion (sw.js). Jusqu'ici, après une mise à jour, le premier
chargement montrait encore l'ancienne version ; il fallait revenir une deuxième fois.
Maintenant, quand la nouvelle version prend la main, la page se recharge une seule fois, seulement sur la page
d'accueil ou dans les 15 premières secondes (jamais au milieu d'une série). Le navigateur va aussi toujours chercher
le dernier sw.js (updateViaCache:'none').

Contient aussi tout le contenu de la v6.40 (page d'accueil avec « Entrer », séries de 20 questions, traductions).
Tests : 192 réussis (npm run verifier).
```

---

## Version 6.40

```text
Ami des mots — version 6.40

1. Une vraie page d'accueil, en plein écran
   À chaque visite : Plumo, « Ami des mots », le choix de la langue et du programme, et un bouton « Entrer ».
   « Entrer » mène à la table des matières (après « Qui joue ? » s'il y a plusieurs profils).
   La flèche en haut de la table des matières ramène à cette page d'accueil.
   C'est sur cette page que viendront plus tard le profil et le mot de passe.

2. Séries de 20 questions
   Une série d'exercices (chapitre, entraînement mélangé, maths) compte maintenant 20 questions au lieu de 10,
   sans jamais reposer deux fois la même : une leçon de 16 questions donne une série de 16.
   Le bouton de chaque chapitre affiche le vrai nombre (▶ 20, ▶ 16…).

3. Traductions
   - Titres des blancs, des épreuves et des annales, et tout l'écran « Officiel » : anglais, espagnol, allemand,
     italien, portugais (js/textes-examens.js). Les sigles officiels (brevet, bac, CAP, BO, STMG…) restent tels quels.
   - Noms des 297 chapitres et des domaines en italien et en portugais (js/mat-noms-it-pt.js).
   Les questions elles-mêmes restent en français en italien et en portugais (le drapeau 🇫🇷 le signale) : prochaine étape.
   Traductions à faire relire par des locuteurs natifs.

Tests : 191 réussis (npm run verifier).
```

---

## Version 6.39

```text
Ami des mots — version 6.39

1. Plumo revient sur l'écran d'ouverture
   L'appli s'ouvre toujours sur la table des matières, mais avec le ciel d'Ami en tête :
   Plumo sur sa branche, « Bonjour… », le choix de la langue et du programme.
   Sur ordinateur : Plumo à gauche (fixe), les matières à droite. Sur téléphone : Plumo au-dessus.
   Changer de langue reste sur l'écran d'ouverture. L'accueil des jeux est toujours derrière « 🎮 Jeux et entraînement ».

2. Français : 16 questions par leçon
   Nature des mots, fonctions dans la phrase, vocabulaire et accord du participe passé passent de 5-8 à 16 questions,
   en français, anglais et espagnol (js/mat-college-plus-final.js).

3. Test du serveur dans Codespaces
   outils/tests-serveur/lancer-local.sh lance MariaDB sans AIO natif (--innodb-use-native-aio=0) :
   c'était la cause du « Segmentation fault » dans les conteneurs. Si MariaDB ne démarre pas, le script affiche
   la fin du journal au lieu d'une erreur de socket.

Tests : 190 réussis (npm run verifier) ; test serveur local 43/43.
Suite prévue : arts, EPS, latin-grec à 14-16 questions ; titres d'examens et écran « Officiel » en italien et portugais.
```

---

## Version 6.38

```text
Ami des mots — v6.38.0

La table des matières devient l'écran d'arrivée ; l'aide aux devoirs est mise en avant ; plus de doublons.

1. À chaque visite, l'appli s'ouvre sur la table des matières (OUVRIR_MATIERES:true dans js/config-site.js).
   - Plusieurs profils : « Qui joue ? » d'abord, puis la table des matières.
   - Premier passage : la question « Tu es en quelle classe ? ».
   - Tout passe par une seule fonction (accueilDepart dans js/jeu.js) : c'est là que se branchera plus tard
     l'écran de connexion (profil et mot de passe).
2. En tête de la table des matières : une grande carte « Un devoir à faire ? On t'aide à démarrer » (aide aux devoirs).
3. Sous les matières : une ligne « Outils pour réviser » (Veille de contrôle, Mes erreurs, Défi de classe,
   Correction par Plumo, England curriculum, Sciences rigolotes), puis un bouton « Jeux et entraînement ».
4. Accueil des jeux : Maths et Matières n'y sont plus en double ; une porte « Mes matières » ramène à la table.
   Maths ramène aussi à la table des matières.
5. Options cachées inchangées (paiement, village 3D, voix de Plumo, bouche, Mots City) : choix confirmé.
6. Textes nouveaux traduits en anglais, espagnol, allemand, italien et portugais.
7. Test v6.38. npm run verifier : 189 réussis, 0 échoué.
```

---

## Version 6.37

```text
Ami des mots — v6.37.0

Consolidation après l'audit de la v6.35.

1. Serveur PHP réellement testé sur une base MariaDB : 43 vérifications réussies sur 43
   (abonnements Stripe, certificats Plus, vannes IA, salon, veille, coin admin, aide aux devoirs).
   - Nouveau : bash outils/tests-serveur/lancer-local.sh (ou npm run test:serveur) crée une base JETABLE,
     des clés et une config de test, lance le test, puis efface tout. Sans prérequis, le test explique quoi installer
     au lieu d'échouer 14 fois.
   - 6 nouvelles vérifications sur devoirs.php (règles envoyées par le serveur, signes < gardés, photo, fichier refusé,
     balises neutralisées, plumes rendues si l'IA échoue).
2. Défauts corrigés grâce à ce test :
   - devoirs.php, correction.php, explique.php : avertissement PHP et langue vide quand l'appli n'envoyait pas de langue.
   - devoirs.php : 8 demandes par minute au lieu de 4 (aide + question + relecture d'affilée étaient bloquées).
3. npm test sans « npm install » : message clair au lieu de « Cannot find module 'jsdom' ».
4. Traductions : nom de chaque matière en anglais, espagnol, allemand, italien et portugais (js/mat-noms.js) ;
   commentaire de textes-plus.js corrigé (6 langues d'interface, et non 11).
5. npm run verifier : 188 réussis, 0 échoué.
```

---

## Version 6.36

```text
Ami des mots — v6.36.0

Étoffer chaque leçon du collège (4/5) : l'histoire-géographie, en français, anglais, espagnol et allemand.

1. Antiquité (6e) 4 → 12 questions : écriture, Égypte, Athènes, Homère, Rome, Constantin.
2. Moyen Âge (5e) 5 → 13 : seigneurie, hommage, chevaliers, islam, Byzance, art roman, Saint Louis.
3. Révolution et Empire (4e) 6 → 14 : Ancien Régime, 4 août, Déclaration des droits, République, Code civil,
   sacre de 1804, suffrage universel masculin, abolition de l'esclavage (1848).
4. Géographie : +3 questions par classe, chacune à sa classe (6e métropoles, littoraux, déserts ; 5e population,
   développement durable, eau ; 4e urbanisation, migrations, tourisme ; 3e espaces productifs, Union européenne, régions).
5. 3e : trois compléments rangés dans leurs chapitres « Par thème » :
   crise de 1929, régimes totalitaires et Front populaire ; guerre froide et décolonisation ; France depuis 1945.
   Entre-deux-guerres 4 → 12, guerre froide 6 → 14, France depuis 1945 7 → 15 questions en 3e.
6. Test v6.36. npm run verifier : 188 réussis, 0 échoué.

Suite prévue : v6.37 français, arts, EPS, latin-grec.
```

---

## Version 6.35

```text
Ami des mots — v6.35.0

Aide aux devoirs avec l'IA, dans toutes les matières.

1. Nouvelle carte « Aide aux devoirs » en tête de l'écran Matières (js/mod-devoirs.js).
   - L'élève choisit la matière (selon sa classe) et colle l'énoncé, ou envoie une photo ou un PDF.
   - L'IA ne fait pas le devoir : elle reformule la consigne, rappelle la leçon à revoir, propose une méthode
     en étapes, pose des questions pour avancer et donne une liste de vérifications avant de rendre.
   - L'élève peut poser une question sur une étape, puis coller sa réponse pour la faire relire
     (ce qui est réussi, ce qui est à revoir et pourquoi, comment s'y prendre) — sans correction à sa place.
   - Ton sérieux : aucune vanne, aucune blague sur cet écran.
   - Mentions affichées : ne photographier que la feuille (pas de visage, pas de nom) ; l'IA peut se tromper.
   - Sans serveur : une méthode de travail par matière, sans IA (traduite en 5 langues).
2. Serveur : serveur-php/devoirs.php.
   - Les règles (jamais la réponse, exemple différent de l'exercice, pas de blague, devoir traité comme un contenu
     et non comme des instructions) sont fixées côté serveur : l'appli ne peut pas les modifier.
   - Plumes (si allumées dans l'admin) : aide 3, +2 avec photo ou PDF, question de suivi 1, relecture 3.
     Réglable dans config.php (devoirs_plumes). Plumes rendues si l'IA échoue.
   - Modèle réglable (anthropic_modele_devoirs, Sonnet conseillé dans config.exemple.php) ; 8 demandes par minute et par IP.
   - Rien n'est conservé. Le serveur doit accepter des envois de 6 Mo (post_max_size).
3. Test v6.35. npm run verifier : 187 réussis, 0 échoué.
```

---

## Version 6.34

```text
Ami des mots — v6.34.0

1. SVT et physique-chimie du collège étoffées (4 langues : français, anglais, espagnol, allemand).
   - Le vivant 5 → 16 questions, le corps humain 3 → 15, la Terre 2 → 15, la génétique 4 → 15,
     la matière 6 → 16, l'électricité 3 → 15. 69 questions, chacune avec 3 pièges, une vanne et la règle.
   - Chaque question a sa classe : en électricité, la loi d'Ohm arrive en 4e, la puissance et l'énergie en 3e.
   - Un chapitre « Par thème » n'apparaît dans une classe que s'il y a au moins 4 questions de cette classe
     (« Cellule, ADN et génétique » ne s'affiche plus en 6e).
2. Langues retirées (demande explicite) : arabe, turc, polonais, ukrainien, japonais.
   Retirées de l'interface, des mots à apprendre, des voix et de l'outil d'import depuis ReParole.
   Un appareil réglé dans l'une de ces langues ouvre l'appli en français ; un élève qui en apprenait une passe à l'anglais.
   Restent : français, anglais, espagnol, allemand, italien, portugais (et, dans les données seulement, coréen, kabyle,
   darijas algérienne, marocaine et tunisienne, comme avant).
3. package-lock.json réparé : il était resté à 5.49.0, il porte maintenant la version de package.json. Un test le vérifie.
4. Tests v6.34 ; 6 anciens tests qui vérifiaient ces langues ont été réécrits pour vérifier leur retrait.
   npm run verifier : 186 réussis, 0 échoué.

Suite prévue : v6.35 histoire-géographie, v6.36 français, arts, EPS, latin-grec.
```

---

## Version 6.33

```text
Ami des mots — v6.33.0

« Ma classe » sur l'écran Matières.

1. Un sélecteur de classe (6e, 5e, 4e, 3e, 2nde, 1re, Tle, Après le bac) en haut de Matières, Blancs et Annales.
   Au premier passage, l'écran demande « Tu es en quelle classe ? ». La classe est gardée par profil.
2. Matières : seules les matières de la classe sont affichées (en 6e : pas de philo, spécialités, LV2, latin, technologie).
   Les cartes Mes erreurs, Veille de contrôle, Défi de classe, England curriculum, Sciences rigolotes restent.
   « Voir toutes les matières » / « Seulement ma classe » pour basculer.
3. Chaque matière, maths comprises, s'ouvre directement à la classe ; les onglets de niveau restent pour réviser une autre année.
4. Blancs et Annales suivent la classe : brevet de la 6e à la 3e (avec une phrase d'explication avant la 3e),
   épreuves anticipées en 2nde et 1re, bac de terminale en Tle. L'onglet Officiel ne change pas.
5. Correction : les équivalences de classes en anglais étaient décalées d'un an dans plusieurs titres
   (6e = Year 7 … 3e = Year 10, comme dans le reste de l'appli).
6. Test v6.33. npm run verifier : 184 réussis, 0 échoué.

Suite prévue : v6.34 SVT et physique-chimie, v6.35 histoire-géographie, v6.36 français, arts, EPS, latin-grec.
```

---

## Version 6.32

```text
Ami des mots — v6.32.0

Étoffer chaque leçon du collège (2/5) : l'espagnol et l'allemand.

1. Espagnol (5e-3e) : 6 leçons passent à 16 questions — se présenter et gustar, présent irrégulier, vocabulaire,
   passé et futur proche, culture du monde hispanique, grammaire de 4e-3e. 61 questions ajoutées, en français et en anglais.
2. Allemand (5e-3e) : 5 leçons passent à 16 questions — bases, vocabulaire, modaux, parfait et datif, culture,
   grammaire de 4e-3e. 48 questions ajoutées, en français, anglais et espagnol.
3. Chaque question a 3 pièges, une vanne et la règle ; les traductions suivent exactement le même ordre.
4. Nouveau fichier : js/mat-langues-college-plus.js.
5. Test v6.32 : au moins 16 questions par leçon, mêmes nombres dans chaque traduction, pas de doublon.
   npm run verifier : 183 réussis, 0 échoué.

Suite prévue : v6.33 SVT et physique-chimie, v6.34 histoire-géographie, v6.35 français, arts, EPS, latin-grec.
```

---

## Version 6.31

```text
Ami des mots — v6.31.0

Étoffer chaque leçon du collège (1/5) : l'anglais.

1. Les 19 leçons d'anglais de la 6e à la 3e passent de 2-6 questions à 16-18 (244 questions ajoutées) :
   be/have got, présent simple, there is, can et impératif, possessifs, vocabulaire de 6e, be + -ing, prétérit,
   comparatifs, quantités, culture, present perfect, futur, modaux, passif, conditionnel, discours indirect,
   relatifs, faux amis. Chaque question a 3 pièges, une vanne bienveillante et la règle.
2. Nouveaux fichiers : js/mat-anglais-college-plus.js (6e-5e), js/mat-anglais-college-plus2.js (4e-3e).
3. Test v6.31 : au moins 16 questions par leçon d'anglais du collège, pas de doublon, pas de répétition dans une série de 10.
   npm run verifier : 182 réussis, 0 échoué.

Suite prévue : v6.32 espagnol et allemand, v6.33 SVT et physique-chimie, v6.34 histoire-géographie,
v6.35 français, arts, EPS, latin-grec.
```

---

## Version 6.30

```text
Ami des mots — v6.30.0

Collège de A à Z : audit relancé, 0 notion absente, 2 partielles (sur 179), 177 couvertes.

1. Maths : 16 générateurs ajoutés (6e, 4e, 3e) dont algorithmique et Python (js/maths-2026-college.js).
2. Notions partielles complétées : monothéisme juif, Capétiens, matériaux, Univers, groupe nominal, entrées de 5e (js/mat-cpl-partiels.js).
3. Langues vivantes : grammaire et culture en anglais, espagnol, allemand (js/mat-langues-cpl.js).
4. Brevet : l'épreuve de sciences tire 2 disciplines sur 3, dont la technologie (js/epreuves-dnb-techno.js).
   Correction de l'audit v6.28 : les épreuves, l'oral et le brevet blanc existaient déjà.
5. Nouvelles matières : arts (arts plastiques, musique, histoire des arts), EPS (connaissances), latin et grec,
   en français, anglais et espagnol (js/mat-arts-eps-lca.js).
6. Test v6.30 ajouté. npm run verifier : 181 réussis, 0 échoué.

Reste : italien et portugais hors maths ; allemand pour arts, EPS, latin-grec ; titres de certains thèmes en 6e.
```

---

## Version 6.29

```text
Ami des mots — v6.29.0

Suite de l'audit du collège (docs/AUDIT-COLLEGE-2026.md) : 0 notion absente au lieu de 13.

1. Questions hors niveau corrigées
   - Les chapitres « Par thème » ne proposent plus que les questions de la classe choisie (niveau gardé par question : nivQ).
   - Classe précise pour quelques questions de chapitres larges (js/mat-niveaux.js).
   - Plus d'ADN, d'allèles, de pH ni de radioactivité en 6e et en 5e ; la 3e garde la génétique.
2. EMC : un cours par classe, programme 2024 (6e démocratie au collège, 5e égalité-fraternité-solidarité,
   4e droits et libertés, 3e faire vivre la démocratie : élections, sondages, infox, IA, engagement). fr/en/es/de.
3. Notions ajoutées :
   - histoire 4e : les femmes au XIXe siècle ;
   - SVT 6e : jour et nuit, saisons, volcans, séismes ;
   - sciences 6e : premiers algorithmes ;
   - physique-chimie 4e-3e : sécurité électrique, signaux et information ;
   - technologie : numérique et IA, énergie et fabrication, projet et validation ;
   - français : types et formes de phrases, subjonctif/impératif/conditionnel/temps composés,
     orthographe rectifiée de 1990, « Dire l'amour » (4e) ;
   - conditionnel ajouté au générateur de conjugaison de 5e.
Nouveaux fichiers : js/mat-cours-emc.js, js/mat-cpl-sciences.js, js/mat-cpl-lettres.js, js/mat-niveaux.js.
Tests : 2 nouveaux tests v6.29. npm run verifier → 180 réussi(s), 0 échoué(s).
```

---

## Version 6.28

```text
Ami des mots — v6.28.0

Collège complet : chaque matière du collège a son cours de l'année dans chaque classe (12 questions, 3 pièges, règle expliquée).
- NOUVELLE MATIÈRE : Technologie (5e, 4e, 3e) — objets techniques, cahier des charges, matériaux, énergie, chaîne d'information et d'énergie,
  capteurs et actionneurs, programmation (Scratch, conditions, variables, événements), réseaux, objets connectés, écoconception, RGPD,
  épreuve de sciences du brevet. Examens de 5e, 4e et brevet blanc. fr / en / es / de. Carte dans l'écran Matières.
- Physique-chimie 6e : cours « Sciences et technologie » (états de la matière, mélanges, masse, énergie, mouvement, circuit, son et lumière). fr / en / es / de.
- Anglais LV1 : cours de 6e, 5e, 4e et 3e (be/have got, présent simple et be + -ing, prétérit, present perfect, modaux, relatifs, conditionnel, passif, discours rapporté, culture).
- Espagnol LV2 : cours de 5e, 4e et 3e (A1 → A2). fr / en.
- Allemand LV2 : cours de 5e, 4e et 3e (A1 → A2). fr / en / es.
Récapitulatif collège : français, histoire, géographie, EMC, SVT, physique-chimie, technologie, maths, anglais, espagnol, allemand.
Nouveaux fichiers : js/mat-cours-college-fin.js, js/mat-techno.js (chargés avant themes.js, ajoutés au service worker).
Nouveau test « v6.28 » : un cours de l'année par matière et par classe du collège, pièges, juge, traductions, carte Technologie.
Vérification : npm run verifier → 178 réussi(s), 0 échoué(s).
```

---

## Version 6.27

```text
Ami des mots — v6.27.0

Lycée et spécialités : un cours de l'année par classe (12 questions chacun).
- Français : 2nde (de l'humanisme au XXe siècle, outils d'analyse) et 1re (épreuve anticipée : écrit, oral, méthode, grands repères). fr / en / es.
- Histoire-géographie : 2nde, 1re, Tle (Méditerranée médiévale → monde depuis 1945 ; risques, métropolisation, mers et océans, mondialisation). fr / en / es / de.
- SVT : 2nde, 1re, Tle (cellule, génome, géologie, immunité, climat, cerveau, plantes). fr / en / es / de.
- Physique-chimie : 2nde, 1re, Tle (mole, lois de Newton, ondes, oxydoréduction, acides-bases, cinétique, thermodynamique). fr / en / es / de.
- Spécialités 1re-Tle : SES, HGGSP, HLP, NSI. fr / en / es.
Nouveaux fichiers : js/mat-cours-lycee-lettres.js, js/mat-cours-lycee-sciences.js, js/mat-cours-specialites.js (chargés avant themes.js, ajoutés au service worker).
Nouveau test « v6.27 » : présence par classe, 3 pièges, juge, traductions en/es.
Vérification : npm run verifier → 177 réussi(s), 0 échoué(s).
```

---

## Version 6.26

```text
Ami des mots — v6.26 : SVT et physique-chimie du collège, un cours de l'année par classe

- SVT : 6e (sciences), 5e, 4e, 3e — 12 questions chacun.
- Physique-chimie : 5e, 4e, 3e — 12 questions chacun.
Traduits en anglais, espagnol et allemand, et rangés dans les chapitres « Par thème » de chaque matière
(cellule et génétique, corps humain, Terre, électricité, mouvement, énergie, ondes…).

Avec la v6.25, chaque classe du collège a désormais un cours de l'année en français, histoire, géographie,
EMC, SVT et physique-chimie, en plus des maths complètes.

Tests : npm run verifier → 176 réussis, 0 échoué.
```

---

## Version 6.25

```text
Ami des mots — v6.25 : cours de l'année en français, histoire, géographie et EMC (collège)

Nouveaux chapitres « Cours de l'année », au niveau de la classe, traduits (anglais, espagnol ; allemand pour l'histoire-géo-EMC) :
- Français : 6e, 5e (programme 2026), 4e, 3e — 15 questions chacun (grammaire, orthographe, conjugaison, lexique, œuvres).
- Histoire : 6e, 5e, 4e, 3e — 12 questions chacun (de la Préhistoire à la Ve République).
- Géographie : 6e, 5e, 4e, 3e — 12 questions chacun.
- EMC : cycle 3 (6e-5e) et cycle 4 (4e-3e) — 12 questions chacun.
Les questions d'histoire sont aussi rangées dans les chapitres « Par thème » (une période ou une guerre = un chapitre),
la géographie et l'EMC dans leurs thèmes.

Tests : npm run verifier → 176 réussis, 0 échoué.
```

---

## Version 6.24

```text
Ami des mots — v6.24 : maths complètes de la 6e à la terminale

Nouveaux chapitres (tous traduits en anglais, espagnol, allemand, italien, portugais) :
- 6e (26 chapitres) : rang des chiffres dans les grands nombres, droite graduée (fractions et décimaux), calculer avec les
  décimaux (× et ÷ par 10, 100, 1 000), division euclidienne, longueur du cercle, axes de symétrie, solides (faces, arêtes, sommets).
- 4e (18 chapitres) : diviser des relatifs, puissances de 10, quatrième proportionnelle, moyenne pondérée, probabilités avec deux dés,
  réciproque de Pythagore, cosinus, volumes de la pyramide et du cône.
- 3e (17 chapitres) : fractions irréductibles, calcul en notation scientifique, inéquations, fonctions affines (antécédent,
  coefficient), agrandissement et réduction (k² et k³), sphère et boule.
- Terminale (18 chapitres) : équations avec exp et ln, croissances comparées, convexité, théorème des valeurs intermédiaires,
  dérivées de sinus et cosinus, primitives de eˣ et 1/x, loi binomiale (espérance, variance), représentation paramétrique d'une droite.

Avec la v6.23 (5e, seconde, première) : 160 chapitres de maths en tout.
Correctif : plus jamais de décimales à rallonge (ex. 58,666666667) dans les mauvaises réponses proposées.

Tests : npm run verifier → 176 réussis, 0 échoué.
```

---

## Version 6.23

```text
Ami des mots — v6.23 : programmes de maths 2026 de 5e, seconde et première au complet

Maths 5e (nouveau programme de cycle 4, BO n° 10 du 5 mars 2026) : 37 chapitres (27 nouveaux)
- Calcul : enchaîner des opérations, distributivité, division par un décimal
- Nombres : nombres premiers, décomposition en facteurs premiers, relatifs (comparer, opposé), droite graduée, carrés et cubes
- Fractions : comparer, additionner et soustraire
- Algèbre : développer/factoriser k(a + b), tester une égalité, équations x + b = c et ax = c, contre-exemple, suites de motifs
- Fonctions (« en fonction de »), ratio, fréquences, probabilités (équiprobabilité)
- Grandeurs : unités de volume, aire du disque, volumes (pavé, prisme, cylindre)
- Géométrie : angles et parallélisme, triangles, parallélogrammes, symétrie centrale
- Pensée informatique : boucles et conditions

Maths seconde (BO n° 14 du 2 avril 2026) : 25 chapitres (18 nouveaux)
ensembles de nombres, valeur absolue, encadrement de racines, quotient nul, tableaux de signes, fonctions de référence,
déterminant et colinéarité, norme, équation cartésienne, coefficient multiplicateur, taux d'évolution, proportion de proportion,
quartiles et étendue, fréquences conditionnelles, tests de dépistage (sensibilité, spécificité), probabilités conditionnelles,
ensembles et logique (réciproque, contraposée), Python (for, range, while, fonctions).

Maths première spécialité (BO n° 14 du 2 avril 2026) : 19 chapitres (12 nouveaux)
discriminant, forme canonique, signe du trinôme, récurrence, sommes de termes, tangente, dérivée d'un produit,
variations, trigonométrie (cercle, radians, valeurs remarquables), produit scalaire avec angle, équation de cercle, espérance.

Chaque question est fabriquée et corrigée par le calcul ; chaque mauvaise réponse est une erreur classique avec son
explication et sa vanne de Prof Pi (doux, taquin, cash, trash). Tout est traduit en anglais, espagnol, allemand, italien, portugais.
Les programmes Python s'affichent ligne par ligne, avec l'indentation.

Tests : npm run verifier → 176 réussis, 0 échoué (nouveau test v6.23 : chapitres, corrections recalculées, traductions).
```

---

## Version 6.22

```text
Ami des mots — version 6.22

Accueil repensé (l'appli n'est plus seulement un jeu de vocabulaire) :
- « Je parle / J'apprends » remplacés par « 🌐 Ma langue » et « 📚 Mon programme »
  (France 6e → bac ou Angleterre Year 6 → A level), directement sur l'accueil.
- La langue étrangère apprise se choisit maintenant dans la porte « 🗣️ Langues »
  (anciennement « Mots & anglais »), qui affiche la langue choisie.
- Nouvelle phrase d'accroche : « Toutes les matières, de la 6e au bac, avec un
  hibou qui te vanne » (6 langues).

Retours d'un testeur :
- « Le ton de Prof Pi, c'est quoi ? » : une phrase explique maintenant les tons
  sous les boutons (maths et matières), en 6 langues.
- Le professeur IA (anglais ET maths) a sa propre porte sur l'accueil ; on ne le
  trouvait qu'en ouvrant « Mots & anglais ».

Plus de questions dans les cours :
- Nouveau chapitre « Cours de 3e : la Première Guerre mondiale, une guerre
  totale » (15 questions, FR/EN/ES/DE), rangé aussi dans le thème 14-18, qui
  passe de 3 à 18 questions.

Vérification : npm run verifier → 175 tests réussis, 0 échec ; captures dans Chrome
sans erreur (accueil, histoire 3e avec « Par thème », porte Langues).
```

---

## Version 6.21

```text
Ami des mots — version 6.21

Programme français suivi en allemand, premières matières complètes :
- Histoire-géo & EMC : les 16 chapitres (128 questions, dont le cours de 3e
  sur la Seconde Guerre mondiale) et les 13 chapitres « Nach Themen ».
- SVT : 9 chapitres (62 questions) et les 6 thèmes.
- Physique-chimie : 8 chapitres (38 questions, les calculs l'étaient déjà)
  et les 7 thèmes.
- Plus aucun badge 🇫🇷 sur ces trois matières en allemand. Guillemets
  allemands „ “, virgule décimale, noms allemands (Code civil, Vichy… expliqués).

Nouveaux fichiers : js/mat-trad-de-histoire.js, js/mat-trad-de-sciences.js.
Vérification : npm run verifier → 175 tests réussis, 0 échec.
```

---

## Version 6.20

```text
Ami des mots — version 6.20

Programme français suivi en espagnol : c'est complet.
- Matière « Français » pour un hispanophone : les 9 chapitres (90 questions).
  Les phrases, mots et titres étudiés restent en français ; consignes, vannes
  et explications sont en espagnol.
- Conjugaison générée en espagnol : formes françaises vérifiées, temps nommés
  en espagnol avec leur nom français (imperfecto (imparfait)…).
- En anglais comme en espagnol, seules restent en français la matière
  « Anglais » (l'anglais appris par un élève français) et, en espagnol,
  la matière « Espagnol » (l'espagnol appris par un élève français), comme prévu.

Nouveau fichier : js/mat-trad-es-francais.js. Tests complétés.
Vérification : npm run verifier → 175 tests réussis, 0 échec.
```

---

## Version 6.19

```text
Ami des mots — version 6.19

Chaque sujet à sa place :
- Histoire-géo & EMC : nouvelle rubrique « Par thème », en tête de la matière.
  Une guerre = un chapitre : Première Guerre mondiale, Seconde Guerre mondiale
  (toutes les questions réunies : xxe, cours de 3e, chapitre 1939-1945),
  guerre froide et décolonisation. Et aussi : Antiquité, Moyen Âge,
  Renaissance-Lumières, Révolution et Empire, XIXe siècle, entre-deux-guerres,
  France depuis 1945, Europe-ONU-mondialisation, géographie, EMC.
- SVT (6 thèmes) et physique-chimie (7 thèmes) : les questions des chapitres
  de révision sont aussi rangées par sujet (cellule et ADN, immunité, corps
  humain, Terre ; matière, chimie, pH, électricité, mouvement, énergie, ondes).
- Rien n'est supprimé : les questions restent aussi dans leur chapitre d'origine,
  et l'entraînement mélangé ne les compte pas deux fois. Les doublons sont écartés.
- Les thèmes sont traduits automatiquement en anglais et en espagnol.

Espagnol : la matière Allemand (37 questions) est expliquée en espagnol.

Nouveaux fichiers : js/themes.js, js/mat-trad-es-allemand.js. Nouveau test v6.19.
Vérification : npm run verifier → 175 tests réussis, 0 échec.
```

---

## Version 6.18

```text
Ami des mots — version 6.18

Programme français suivi en espagnol, suite :
- Objectif NASA : les 12 chapitres en espagnol (67 questions) et les calculs
  (fusées, orbites, communications, unités, vie à bord) fabriqués directement
  en espagnol, avec la virgule décimale.
- Spécialités du bac : SES, HGGSP, HLP et NSI en espagnol (46 questions).
- Plus aucun badge 🇫🇷 sur ces matières en espagnol.

Nouveaux fichiers : js/mat-trad-es-nasa.js, js/mat-trad-es-specialites.js ;
js/nasa.js : calculs en français, anglais et espagnol.
Test : chapitres espagnols complets et calculs NASA en espagnol vérifiés (aucun mot français, vannes validées).
Vérification : npm run verifier → 174 tests réussis, 0 échec.
```

---

## Version 6.17

```text
Ami des mots — version 6.17

Programme français suivi en espagnol, matières « après le bac » :
- Droit : 19 chapitres, 92 questions. Les institutions françaises gardent leur
  nom (Cour de cassation, Conseil d'État, prud'hommes…), expliqué en espagnol.
- Médecine : 14 chapitres, 66 questions, plus le calcul du débit cardiaque en espagnol.
- Astrophysique : 10 chapitres, 52 questions, plus les 6 calculs d'astrophysicien
  fabriqués directement en espagnol (virgule décimale).
- Plus aucun badge 🇫🇷 sur ces trois matières en espagnol.

Nouveau fichier : js/mat-trad-es-sup.js ; js/mat-sup.js : calculs en fr, en, es.
Vérification : npm run verifier → 174 tests réussis, 0 échec.
```

---

## Version 6.16

```text
Ami des mots — version 6.16

Programme français suivi en espagnol :
- SVT : 9 chapitres (62 questions) ; physique-chimie : 8 chapitres (38 questions,
  plus les calculs déjà fabriqués en espagnol) ; philosophie : 2 chapitres de
  révision et les 17 notions (88 questions). Plus aucun badge 🇫🇷 sur ces trois
  matières en espagnol.
- Typographie espagnole (¿ ?, « », virgule décimale), titres d'œuvres sous leur
  nom espagnol (Discurso del método, El contrato social…).

Nouveau fichier : js/mat-trad-es-sciences.js. Test v6.12-v6.13 complété pour l'espagnol.
Vérification : npm run verifier → 174 tests réussis, 0 échec.
```

---

## Version 6.15

```text
Ami des mots — version 6.15

Matière « Français » (programme français) pour un anglophone :
- Les 9 chapitres : homophones (37), accord du participe passé, nature et
  fonction des mots, vocabulaire, figures de style, auteurs et mouvements,
  œuvres et épreuve du bac (90 questions).
- Les phrases, mots et titres étudiés restent en français ; consignes, vannes
  et explications sont en anglais (« Conjugate… », « In “Le chat dort”, what is “dort”? »).
- La conjugaison générée parle aussi anglais : formes françaises vérifiées,
  temps nommés en anglais avec leur nom français (the imperfect (imparfait)…),
  mêmes erreurs typiques expliquées en anglais.

Côté anglais, seule la matière « Anglais » (l'anglais appris par un élève
français) reste volontairement en français.
Test v6.7 : pour la matière « Français », aucun mot français hors des citations.
Vérification : npm run verifier → 174 tests réussis, 0 échec.
```

---

## Version 6.14

```text
Ami des mots — version 6.14

Programme français suivi en anglais, suite :
- Objectif NASA : les 12 chapitres en anglais (67 questions et les 5 familles
  de calculs : fusées, orbites, communications, unités, vie à bord).
  Les chapitres identiques à « Road to NASA » reprennent ses questions ; les
  chapitres propres au parcours français (parcours depuis la France, anglais de
  mission, géopolitique de l'espace) sont traduits à part.
- Espagnol (LVB) : 7 chapitres, 38 questions ; Allemand (LVB) : 6 chapitres,
  37 questions. Les réponses restent en espagnol ou en allemand ; consignes,
  vannes et explications sont en anglais (faux amis adaptés : embarazada,
  constipado, bekommen, Gymnasium).

Nouveaux fichiers : js/mat-trad-en-nasa.js, js/mat-trad-en-langues.js.
Il ne reste en français, côté anglais, que les matières « Français » et « Anglais ».
Vérification : npm run verifier → 174 tests réussis, 0 échec.
```

---

## Version 6.13

```text
Ami des mots — version 6.13

Matières « après le bac » entièrement traduites en anglais :
- Droit : 19 chapitres, 92 questions (institutions, introduction au droit,
  constitutionnel, administratif, libertés, finances publiques, droit européen
  et international, personnes et famille, obligations, biens, pénal, affaires,
  travail, organisation de la justice…). Les institutions françaises gardent
  leur nom (Cour de cassation, Conseil d'État…), expliqué en anglais.
- Médecine : 14 chapitres, 66 questions, plus le calcul du débit cardiaque.
- Astrophysique : 10 chapitres, 52 questions, plus les 6 calculs
  d'astrophysicien (lumière, années-lumière, Wien, Kepler, Hubble, parallaxe),
  fabriqués directement en anglais avec le point décimal.
- Plus aucun badge 🇫🇷 sur ces trois matières en anglais ; en français, rien ne change.

Nouveau fichier : js/mat-trad-en-sup.js. Test v6.12-v6.13 étendu.
Vérification : npm run verifier → 174 tests réussis, 0 échec.
```

---

## Version 6.12

```text
Ami des mots — version 6.12

Traductions des matières (programme français suivi dans une autre langue) :
- Anglais : SVT (9 chapitres), physique-chimie (8 chapitres) et philosophie
  (2 chapitres de révision + les 17 notions) entièrement traduites.
  Plus aucun badge 🇫🇷 sur ces trois matières en anglais.
- Calculs de physique (vitesse, poids, énergie, masse volumique, loi d'Ohm,
  puissance) fabriqués directement en anglais, espagnol, allemand, italien et
  portugais, avec virgule ou point décimal selon la langue.
- Allemand, italien, portugais : socle commun (phrases douces, cash, bravo,
  noms de la physique-chimie) pour que ces calculs restent 100 % dans la langue.
- Moteur des matières : un chapitre traduit ne mélange jamais une question
  française avec des questions traduites ; un chapitre non traduit reste
  entièrement en français avec le badge 🇫🇷.

Nouveaux fichiers : js/mat-trad-en-sciences.js, js/mat-trad-communs.js.
Nouveau test v6.12 (traductions anglaises complètes, calculs dans les 5 langues,
aucun mot français, vannes validées par le juge).

Vérification : npm run verifier → 174 tests réussis, 0 échec.
```

---

## Version 6.11

```text
Ami des mots — version 6.11

Nouveau chapitre d'histoire, tiré du cours de 3e de l'élève :
« Cours de 3e : la Seconde Guerre mondiale, une guerre d'anéantissement »
- 18 questions (niveaux 3e et 1re), en français, anglais et espagnol.
- Contenus : Axe et Alliés, les deux phases et le tournant de 1942-1943
  (Stalingrad, Midway), juin 1940, juin 1941, Katyn, Nankin, génocide des
  Tsiganes, guerre idéologique, projet Manhattan, V1/V2, Victory Program,
  Hollywood, travail forcé, bilan humain (60 à 80 millions de morts),
  pays et régions les plus touchés.
- Vannes relues pour passer le juge (pas de plages d'années, pas de
  vocabulaire violent dans les pièges).

Vérification : npm run verifier → 173 tests réussis, 0 échec.
```

---

## Version 6.10

```text
Ami des mots — version 6.10 : matières du programme français en anglais (1er lot)

- 🇬🇧 Interface en anglais + programme français : traduits en anglais, avec vannes, explications, noms de chapitres :
  - Histoire-géographie & EMC (15 chapitres, 92 questions, Seconde Guerre mondiale comprise) ;
  - HGGSP (dont « Puissance, frontières, ONU »), SES, HLP, NSI (spécialités de 1re et Tle, 46 questions).
- 🔤 Sécurité langues : après une restauration de sauvegarde, « Je parle » et « J'apprends » ne peuvent plus être
  la même langue.
- 🦉 Prof Pi garde son « Bravo » même quand une punchline de réponse éclair s'affiche.

Reste à traduire : SVT, physique-chimie, philosophie, droit, médecine, astrophysique, NASA, français (consignes) en
anglais ; puis tout en allemand, italien, portugais ; et l'espagnol pour tout sauf l'histoire.
```

---

## Version 6.9

```text
Ami des mots — version 6.9 : punchlines arrogantes sur les bonnes réponses, nouvelles vannes et blagues

- 😎 Bonne réponse : des punchlines bien arrogantes (« Une performance aussi insolente devrait être taxée. »).
  - Réponse éclair (moins de 3 secondes) : série spéciale (« Le chrono vient de déposer sa démission. »).
  - Mot difficile trouvé (mot long) : série spéciale (« CE MOT ?! Même les profs ont dû vérifier ! »).
  - Dans les jeux de mots, de temps en temps : « Le dictionnaire demande ton autographe. »
  - Séries : « {k} d’affilée ! Tu comptes laisser quelque chose aux autres ? »
- 🐢 Réponse lente (plus de 25 secondes) : « On attend la réponse ou on commande une pizza ? »
- 💥 Mauvaise réponse : 19 nouvelles expressions sur la RÉPONSE (« Erreur 404 : bonne réponse introuvable. »).
- 🥊 Battles : nouvelles provocations avant chaque tour et nouvelles fins de match (gagnant et dernier).
- 😂 Blagues de Plumo : 13 nouvelles devinettes et jeux de mots, 4 nouvelles chutes absurdes.
- Tri selon la règle du jeu : on chambre la réponse, la situation ou Plumo, jamais la personne. Les phrases qui
  insultaient le joueur (« deux neurones », « la bêtise comme sport », « criminel », « massacre »…) ont été écartées
  ou réécrites. Le ton « Tout doux » ne reçoit aucune de ces vannes. Toutes passent le juge.
```

---

## Version 6.8

```text
Ami des mots — version 6.8 : Droit, Médecine, Astrophysique et Philosophie complétés

- ⚖️ Droit (licence) : 16 nouveaux chapitres, 76 questions : introduction au droit, histoire du droit, méthodologie
  (cas pratique, fiche d'arrêt, dissertation), droit constitutionnel, droit administratif, libertés fondamentales,
  finances publiques, droit de l'Union européenne et CEDH, droit international public, droit des personnes et de la
  famille, contrats et responsabilité, droit des biens, droit pénal et procédure pénale, droit des affaires,
  droit du travail, organisation de la justice et métiers. Nouveau « Partiel blanc de droit ».
- 🩺 Médecine (PASS / LAS) : 10 nouveaux chapitres, 48 questions : biochimie, biologie cellulaire, histologie et
  embryologie, génétique, biophysique et imagerie, pharmacologie, santé publique et biostatistiques, sémiologie,
  premiers secours, éthique et droit de la santé. Nouveau « Concours blanc PASS / LAS ».
- 🔭 Astrophysique : 9 nouveaux chapitres, 41 questions : système solaire, lumière et spectroscopie, gravitation et
  lois de Kepler, vie des étoiles, galaxies et matière noire, cosmologie, exoplanètes, télescopes et missions,
  trous noirs et ondes gravitationnelles. Nouveau « Partiel blanc d'astrophysique ».
- 🤔 Philosophie (Tle) : les 17 notions du programme, chacune son chapitre (68 questions avec auteurs et œuvres) :
  l'art, le bonheur, la conscience, le devoir, l'État, l'inconscient, la justice, le langage, la liberté, la nature,
  la raison, la religion, la science, la technique, le temps, le travail, la vérité.
- Toutes les vannes passent le juge ; les nouveaux chapitres sont marqués 🇫🇷 dans les autres langues tant qu'ils ne
  sont pas traduits.
```

---

## Version 6.7

```text
Ami des mots — version 6.7 : programme du pays et langue de l'appli séparés, début de la traduction des matières

- 📚 Réglages : nouveau choix « Programme scolaire suivi » (🇫🇷 France ou 🏴 Angleterre), indépendant de la langue de
  l'appli, dans les 6 langues. Un Anglais peut suivre le programme français, un Français le programme anglais, etc.
- 🌍 Matières du programme français : système de traduction (js/mat-trad-xx.js), même ordre que la banque française.
  Une série traduite ne mélange jamais de questions françaises ; les vannes françaises ne s'ajoutent pas.
  Noms de la matière, des domaines et des chapitres traduits ; bravo de Plumo dans la langue.
- 🇪🇸 Premier lot : toute l'Histoire-géographie & EMC en espagnol (15 chapitres, 92 questions, y compris
  la Seconde Guerre mondiale).
- 🏷️ Pas de mélange caché : un chapitre pas encore traduit est marqué 🇫🇷 ; dans le programme anglais, une ligne
  indique clairement que le contenu est encore en anglais quand l'appli est dans une autre langue.
- ✅ Nouveau test : pour chaque langue traduite, même nombre de questions et de pièges que le français, aucun mot
  français, toutes les vannes validées par le juge, et les séries sortent bien dans la langue.

Reste à faire (prochaines versions) : les autres matières et langues (SVT, physique-chimie, philo, SES, HGGSP, HLP, NSI,
médecine, droit, astro, NASA en es/de/it/pt/en ; histoire en de/it/pt/en) ; les références officielles affichées en
haut des matières ; la traduction du programme anglais vers le français et les autres langues ; puis tout le
programme 2026 de A à Z (maths lycée, maths 5e, français, histoire-géo-EMC, sciences, spécialités).
```

---

## Version 6.6

```text
Ami des mots — version 6.6 : maths et sciences traduites dans toutes les langues en ligne, GEOPS, Seconde Guerre mondiale

- 🌍 Coin maths de Prof Pi et labo des sciences entièrement traduits dans les 5 langues proposées dans l'appli :
  anglais, espagnol, allemand, italien, portugais (js/maths-xx.js, js/sciences-xx.js).
  - Maths : énoncés, réponses, règles, les 118 erreurs classiques avec leurs vannes, la montée en pression,
    niveaux, domaines, 73 chapitres, examens blancs.
  - Sciences : 41 questions, 82 vannes, explications, thèmes, punchlines « cash » et « bravo » propres à chaque langue
    (exemples adaptés : Alexander Gerst en allemand, Samantha Cristoforetti en italien, Tim Peake en anglais).
  - Écriture : point décimal en anglais, virgule ailleurs ; « ¿ » en espagnol ; heures en 16:47 ; guillemets „ “ en allemand.
  - Les vannes françaises (trash talk, bande de Plumo) ne s'affichent plus sur une question traduite.
- 🐛 Corrigé au passage (aussi en français) : « 110°° », « 17,5 € € », « 12 cm³ cubes » dans certaines vannes ;
  suite géométrique annoncée avec une « différence » au lieu d'une « raison » en anglais ; le « bravo » de Prof Pi
  remplacé par « Yes! » en interface non française.
- 🪨 GEOPS (Géosciences Paris-Saclay, UMR 8148, CNRS / Université Paris-Saclay) : nouveau chapitre dans
  « Objectif NASA » et « Road to NASA » : les 4 thèmes du labo (Bassins & Ressources, Évolution de la Terre et des
  Planètes, Paléoclimats & Dynamique sédimentaire, Zone critique), les formations (licence Sciences de la Terre,
  double diplôme Géosciences-Physique, master Sciences de la Terre et des Planètes, Environnement), géologie de Mars,
  de la Lune et de la Terre (15 questions en français, 15 en anglais).
- 🏛️ Histoire : nouveau chapitre « La Seconde Guerre mondiale (1939-1945) » (3e, 1re, Tle), 16 questions : début et
  fin, appel du 18 juin, Vichy et collaboration, Jean Moulin, Shoah, Vél d'Hiv, Auschwitz-Birkenau, Stalingrad,
  Pearl Harbor, Débarquement, Libération de Paris, Hiroshima et Nagasaki, guerre d'anéantissement, Nuremberg.
  Sur la Shoah et les crimes nazis : aucune blague, une correction simple.
- ✅ Test : dans chacune des 5 langues, écrans, 7 niveaux × 3 tons de maths et les 41 questions de sciences générés sans
  un mot de français, et toutes les vannes passent le juge.

Pas fait : les langues cachées pour l'instant (arabe, turc, polonais, ukrainien, japonais) ; les matières du programme
français (histoire, SVT…) restent en français dans les autres langues d'interface.
```

---

## Version 6.5

```text
Ami des mots — version 6.5 : le coin maths et le labo des sciences entièrement en anglais quand l'appli est en anglais

- 🔢 Coin maths de Prof Pi (6e → Terminale) : avec l'interface en anglais, TOUT passe en anglais.
  - Énoncés, réponses, mauvaises réponses, règles : 199 morceaux de phrases traduits (226 emplacements) (js/maths-en.js).
  - Les 118 erreurs classiques : explication + vannes taquines + vannes cash, réécrites en anglais
    (toutes passent le juge, elles visent l'erreur, jamais l'élève).
  - Niveaux (6e = Year 7…), domaines, 73 chapitres et examens blancs (Mock brevet, Mock bac…) traduits.
  - Typographie anglaise : 12.5 au lieu de 12,5 ; 1,200 au lieu de 1 200 ; €12.50 ; 16:47 au lieu de 16 h 47 ;
    intervalles [2, 5) au lieu de [2 ; 5[ ; pas d'espace avant ? ! : %.
  - La montée en pression (même erreur refaite) a sa version anglaise ; les listes de vannes françaises
    (trash talk, expressions imagées, bande de Plumo) ne s'affichent plus sur une question de maths en anglais.
  - Défi de maths entre potes : les questions suivent la langue de l'interface.
  - En français, rien ne change (même graine = mêmes questions).
- 🚀 Labo des sciences : les 41 questions (planètes, fusées, corps humain, médecine), leurs 82 vannes, les explications,
  les thèmes et les punchlines « cash » traduits (js/sciences-en.js). Exemple adapté : Thomas Pesquet → Tim Peake.
- 🌍 Traductions d'écrans : les guillemets français « » dans 17 textes anglais remplacés par “ ”.
- ✅ Nouveau test : avec l'interface en anglais, 7 niveaux × 3 tons × 25 questions générés sans un mot de français ;
  écran du coin maths, question, retour et examen blanc vérifiés ; les 41 questions de sciences dans les 3 tons aussi.
  Parcours automatique des écrans principaux en anglais : plus aucun écran avec du français (hors « mot du jour », qui est
  le mot français à apprendre).

Pas encore fait : si on choisit le programme FRANÇAIS en interface anglaise, ses matières (histoire, SVT, physique…) et
ses épreuves restent en français (le programme anglais, lui, est en anglais). En espagnol, allemand, italien et portugais,
les écrans sont traduits mais les exercices de maths et de sciences restent en français.
```

---

## Version 6.4

```text
Ami des mots — version 6.4 : Objectif NASA, anglais « Sup », et la bande de Plumo une seule fois

- 🚀 Nouvelle matière « Objectif NASA » (programme français, 2nde → Sup) et « Road to NASA » (programme anglais, Year 10 → University) :
  parcours et diplômes (conditions NASA 2026 : citoyenneté américaine, master STEM, 3 ans d'expérience ; stages OSTEM/Pathways
  réservés aux Américains ; voie européenne : ESA Graduate Trainee, CNES, industrie), métiers, et tous les exercices :
  fusées (Tsiolkovski, poussée/poids), orbites (vitesse, période, libération, gravité en altitude), communications (délais radio,
  antennes), unités (lbf, mph, °F — l'erreur de Mars Climate Orbiter), vie à bord (oxygène, eau recyclée), missions (Apollo, ISS,
  Artemis II d'avril 2026, Mars, Webb), anglais de mission, code et logiciels de vol, géopolitique de l'espace.
  Calculs générés et vérifiés par les tests. Examen blanc « Road to NASA » au niveau University.
- 🇬🇧 Anglais (programme français) : niveau « Sup » — certifications (TOEIC, IELTS, Cambridge, CLES), anglais universitaire,
  anglais scientifique (et de la NASA), anglais professionnel, grammaire et expressions C1, test de niveau C1.
- 📞 La bande de potes de Plumo ne débarque plus qu'une fois par série (fini le rappel à 8, 12… bonnes réponses).
171 tests.
```

---

## Version 6.3

```text
Ami des mots — version 6.3 : toutes les matières du français, côté anglais, et les études pour la NASA

Programme anglais (England) :
- 🇪🇸 Spanish et 🇩🇪 German : KS3, nouveau GCSE (premières épreuves 2026 : dictée, lecture à voix haute) et A level.
- 🤔 Philosophy, 🗳️ Politics, 👥 Sociology (A level), à côté d'Economics et Psychology.
- Nouveau niveau « University » (après le A level) : 🩺 Medicine (anatomie, éthique, NHS, UCAT 2025+ sans Abstract
  Reasoning), ⚖️ Law (système juridique anglais, contrat, responsabilité, pénal, LNAT : 42 QCM + essai), 🔭 Astrophysics.
- Examens blancs : GCSE Spanish/German, A level Philosophy/Politics/Sociology, entrée à l'université (UCAT, LNAT).
- 🚀 « Careers in space: NASA & ESA » : conditions NASA (citoyenneté américaine, master STEM, 3 ans d'expérience),
  la voie européenne (ESA), les A levels et diplômes qui mènent au spatial ; liens officiels NASA et ESA.
Programme français :
- 🚀 Astrophysique : nouveau chapitre « Travailler à la NASA, à l'ESA ou au CNES » (1re, Tle, Sup).
Plus de 1 500 questions anglaises ; 169 tests.
```

---

## Version 6.2

```text
Ami des mots — version 6.2 : le vrai programme anglais et les vrais SATs

- ✅ Vrais sujets SATs 2025 et 2026 (Standards and Testing Agency, Open Government Licence v3.0) :
  calcul (36 questions, 40 points, réponses officielles vérifiées par le calcul), grammaire et ponctuation,
  dictée (20 mots lus à voix haute). Jouables en examen blanc, score estimé avec les seuils officiels 2025 et 2026.
  Raisonnement (schémas) et lecture (textes d'auteurs, hors licence) : sujets jumeaux.
- GCSE et A level : les sujets appartiennent à AQA, Pearson et OCR (copie interdite) → sujets jumeaux + liens officiels.
- 📜 Programme officiel point par point dans chaque matière (National Curriculum 2014, contenus GCSE et A level) :
  29 chapitres ajoutés (dont l'Holocauste, obligatoire en KS3, traité sans blague), chaque partie couverte,
  au moins 8 questions par chapitre. ~1 300 questions au total.
- Mention de licence OGL dans le jeu et dans la page légale.
```

---

## Version 6.1

```text
Ami des mots — version 6.1 : le programme anglais (England)

Comme le programme français, mais pour l'Angleterre, tout en anglais (Plumo vanne en anglais) :
- 📚 Matières → « 🏴 England curriculum » (on revient avec « 🇫🇷 Programme français »).
- 📖 Revise : Year 6 → Year 13 (KS2, KS3, GCSE, A level), 12 matières : Maths (questions générées), English, Biology,
  Chemistry, Physics, History, Geography, Citizenship & RE, Computer Science, French (nouveau GCSE 2026),
  Economics et Psychology (A level). Chapitres par domaine, étoiles, entraînement mélangé, quiz d'examen avec grade estimé.
- 📝 Mocks : KS2 SATs (GPS, Reading, Maths : mêmes papers, durées et points que 2026, scaled score estimé avec les
  seuils 2026 publiés), GCSE (Maths Foundation/Higher, English Language/Literature, Combined Science, History,
  Geography, Computer Science, French), A level (Maths, Sciences, English, Economics/Psychology/CS). Grades estimés.
- ✖️ Multiplication tables check (Year 4) : 25 questions, 6 secondes chacune, réponse tapée.
- 🗂️ Past papers 2026 : un sujet jumeau pour chaque vraie session 2026 + lien vers le vrai sujet (gov.uk, AQA, Pearson).
- 🏛️ Official : programme national (2014, toujours en vigueur), rapport de 2025 (nouveau programme en septembre 2028),
  annales officielles.
- ⏱️ Veille de contrôle (« Night before the test ») et carnet d'erreurs marchent aussi avec le programme anglais.
- English Language : après la lecture, la partie écriture renvoie vers « ✍️ Correction par Plumo ».

Technique : js/gb-*.js (moteur, contenus, examens) + js/mod-angleterre.js (écrans). ~1 000 questions (479 écrites + générateurs).
Toutes les vannes passent le juge de Plumo. Tests : 166 (dont 6 pour l'Angleterre) + test navigateur test-angleterre.js.
```

---

## Version 6.0

```text
Ami des mots — version 6.0

Nouveautés
- 🏆 Ligue de la semaine entre potes : chaque bonne réponse = 1 point, classement remis à zéro le lundi, lien d'invitation.
- 🏅 Saisons : 150 bonnes réponses dans le mois = un badge et une tenue exclusive pour Plumo (bonnet, fleur, casquette, chapeau de sorcière).
- ⏱️ Veille de contrôle : 15 minutes chrono sur un chapitre, les erreurs du carnet en premier, note sur 20.
- 🎙️ Oral noté en anglais : 5 phrases, Plumo dit si on te comprend ; seulement si un parent l'autorise (Espace parents).
- 👩‍🏫 Défi de classe : le prof crée un défi (code + clé), toute la classe a la même série, le prof voit scores et moyenne.
- 🤝 Parrainage : un mois offert quand une famille invitée prend Plus ; entonnoir de Plus suivi dans l'admin.
- 🦉 Plumo réexplique autrement après 3 erreurs sur la même notion (IA ; sans serveur : la règle et les bonnes réponses).
- ✍️ Correction par Plumo : texte en anglais ou paragraphe de dissertation, noté, avec points forts, conseils et version corrigée.
- 🎁 Admin : offrir Plus à qui tu veux (1 à 12 mois ou à vie) et le retirer.
- Ami des mots est séparé de ReParole : sons dans audio/ (outils/copier-sons.js), contact réglable (outils/configurer.js --contact).

Technique
- Les nouveautés sont dans des modules (js/mod-*.js) branchés sur jeu.js (actions, cartes, accessoires, crochets) :
  jeu.js n'a pas été découpé entièrement, mais il ne grossit plus.
- Serveur : ligue.php, classe.php, parrainage.php, explique.php, correction.php ; tables dans schema.sql.
- Tests : 160 (dont 10 pour la v6.0) ; parcours serveur vérifiés de bout en bout (SQLite + faux Stripe/Claude).

À faire sur le serveur après la mise à jour : exécuter les nouvelles tables de serveur-php/schema.sql (CREATE TABLE IF NOT EXISTS).
```

---

## Version 5.99.3

```text
Ami des mots 5.99.3

🌍 Écrans traduits en anglais, espagnol, allemand, italien et portugais (js/textes-ecrans.js, ≈600 textes) :
  accueil, portes, coin anglais, pièges, situations, dictée, battles (potes, famille, rap, Clash libre, défis, salon),
  maths, matières, brevet & bac blancs, annales, sciences, maison, réglages, espace parents, bilan.
  Le contenu scolaire français (questions, programmes officiels, sujets) reste en français ; les vannes suivent
  le réglage « Langue des blagues » (français ou anglais).
🦉 Le hibou s'appelle aussi Plumo en allemand, polonais, ukrainien, japonais et arabe (il restait « Ami »).
🎒 Arabe retiré des listes « Je parle » / « J'apprends » pour l'instant (gardé dans les données).
Vérifié : 150 tests, dont un balayage des écrans en espagnol et en allemand (plus de phrases françaises hors contenu
  scolaire) et le contrôle des balises HTML de chaque traduction. À faire relire par des locuteurs natifs.
```

---

## Version 5.99.2

```text
Ami des mots 5.99.2

🎒 Langues de l'école seulement dans les listes de l'accueil :
  - « Je parle » : français, anglais, espagnol, allemand, italien, portugais, arabe.
  - « J'apprends » : anglais, espagnol, allemand, italien, portugais, arabe (+ français pour les élèves qui parlent
    une autre langue). On n'apprend jamais la langue qu'on parle.
  - Turc, polonais, ukrainien, japonais et les autres restent dans les données (rien n'est supprimé) ; un joueur qui
    les avait déjà choisis les garde.
Vérifié : 149 tests ; les jeux de mots se lancent dans chaque langue scolaire (français → espagnol, allemand, italien,
  portugais, arabe ; espagnol → anglais ; arabe → français).
```

---

## Version 5.99.1

```text
Ami des mots 5.99.1

Retiré : la mention « dans 16 langues » (description du site, « À propos » dans les 11 langues de l'interface,
manifeste de l'appli, README, message des phrases relues). Les langues elles-mêmes sont toutes conservées.
Le manifeste dit maintenant « Plumo le hibou » (il restait « Ami le hibou »).
```

---

## Version 5.99

```text
Ami des mots 5.99.0

🪶 Plumes magiques (crédits d'IA), éteintes tant que tu ne les allumes pas dans le coin admin.
  - Une vanne écrite par l'IA = 1 plume (le tri d'une vanne du Clash libre aussi). Si l'IA ne livre pas, la plume est rendue.
  - Quota mensuel inclus dans Plus (réglable), puis le solde acheté. Sans plumes : Plumo garde ses vannes, rien n'est bloqué.
  - Packs (petit / moyen / grand) : Stripe sur le site (reconnu par le prix price_… — un pack n'ouvre jamais Plus « à vie »),
    produits consommables Google Play / App Store vérifiés auprès des stores. Chaque achat crédité une seule fois ;
    un remboursement Stripe retire le pack.
  - Solde gardé sur le serveur (plumes.php), retrait atomique ; achat derrière une question pour adultes ; textes en 11 langues.
  - Admin : réglages des plumes dans l'offre (signée), suivi du mois, « offrir des plumes » à un code.
  - CGV : section plumes. docs/ADMIN.md : comment entrer dans l'admin et mettre les plumes en route.
Vérifié : 148 tests ; essai réel PHP + SQLite avec faux Stripe / Google / Apple / IA : achat Stripe (rejoué : 1 seul crédit),
  pack ≠ « à vie », quota Plus, plumes rendues, Google (valide, rejoué, faux), Apple, remboursement, 6 appels simultanés,
  plumes éteintes = comportement d'avant ; enregistrement des réglages dans l'admin (valeurs pirates écartées).
À la mise en ligne : relancer schema.sql (tables ami_credits, ami_credits_mouvements).
```

---

## Version 5.98

```text
Ami des mots 5.98.0

🤖 Chaque vanne écrite par l'IA est marquée « 🤖 » : le joueur sait quand il lit une IA (obligatoire pour un produit
  utilisé par des mineurs selon les règles d'Anthropic). Page de confidentialité mise à jour.
🎯 Carnet d'erreurs : les questions de matières ratées sont gardées (80 au plus, sur l'appareil). Carte « Mes erreurs (N) »
  dans Matières : 20 questions au hasard pour réviser avant un contrôle ; une bonne réponse retire la question du carnet.
🔠 Taille du texte réglable (A, A+, A++) dans les réglages, en 11 langues.
🎩 Chapeau et 👑 couronne redessinés en relief (dégradés, reflets, pierres).
Vérifié : 147 tests ; accessibilité 10/10.
```

---

## Version 5.97

```text
Ami des mots 5.97.0

🚀 Mise en ligne automatique chez OVH (.github/workflows/ovh.yml) : à chaque fusion sur main, tests puis envoi
  du jeu et du serveur en SFTP dans www/. Ne fait rien tant que les secrets OVH ne sont pas réglés. N'envoie jamais
  config-ami.php ni les clés ; s'arrête s'il trouve un secret ; n'efface rien chez OVH ; vérifie l'empreinte du
  serveur ; contrôle à la fin que le site répond et que serveur/lib.php est interdit.
🔧 Corrigé : le serveur cherchait config-ami.php dans www/ au lieu d'un dossier au-dessus (comme le dit la doc).
🔒 .htaccess : HTTPS obligatoire ; fichiers de réglages et clés jamais lisibles depuis le web.
📋 docs/MISE-EN-LIGNE-OVH.md (liste à cocher, de la commande au site en ligne) et docs/IA.md (ce que fait l'IA).
Vérifié : 146 tests.
```

---

## Version 5.96

```text
Ami des mots 5.96.0

🦉 Plumo ne saute plus quand la souris passe dessus. Cause : avec les graphismes « ultra », l'effet de survol
  des boutons remplaçait le centrage de Plumo ; il partait sur le côté, la souris ne le touchait plus, il revenait,
  et ainsi de suite. Survol : maintenant un simple halo doré, sans mouvement.
👓 Nouvelles lunettes dessinées sur l'image 3D : un verre centré sur chaque œil, inclinées comme la tête,
  l'œil droit plus petit (vu de trois quarts), reflets dans les verres.
🧣 Écharpe redessinée autour du cou (dégradé, pan qui tombe, franges) ; ombre douce sous tous les accessoires.
Vérifié : 145 tests ; survol testé dans un navigateur avec les graphismes « ultra » (Plumo immobile).
```

---

## Version 5.95

```text
Ami des mots 5.95.0

🌍 Traductions : écran Plus (formules, restaurer, code cadeau, messages d'achat), liens légaux et bilan des parents
  dans les 11 langues de l'interface (js/textes-plus.js, à faire relire par des locuteurs natifs).
  Clash libre : en français pour l'interface française, en anglais pour toutes les autres (la ligne 🇫🇷 des vannes
  n'apparaît qu'en interface française).

♿ Accessibilité : audit axe-core (WCAG 2.1 A et AA) sur 9 écrans + la page légale (outils/tests-navigateur/
  test-accessibilite.js). Seul défaut grave trouvé et corrigé : contraste des listes déroulantes dans les réglages.

📈 Fréquentation anonyme : serveur-php/visite.php (+ table ami_visites). Au plus une « ouverture » et une « partie »
  par jour et par appareil ; ni cookie, ni identifiant, ni IP gardée ; « Ne pas me suivre » respecté.
  Tableau des 30 derniers jours dans le compte admin (📈). Page de confidentialité mise à jour.

⏰ Rappels pour revenir jouer (appli Android / iPhone) : réglage « Rappel » (heure au choix), désactivé par défaut,
  permission demandée seulement à l'activation ; alerte « série en danger » à 20 h si on n'a pas joué.
  Notifications locales, sans serveur (@capacitor/local-notifications ajouté à la fabrication Android).
  Sur l'accueil (site et appli) : bandeau « 🔥 Ta série de N jours est en danger ».
  Les questions des matières comptent maintenant aussi pour la série de jours.

📚 Contenu : spécialités du lycée SES, HGGSP, HLP, NSI (1re et Tle, bacs blancs de connaissances, générateur
  binaire ↔ décimal en NSI) ; renfort philo (6 questions), droit (4), médecine (4).

🧪 Solidité : test « scènes absurdes » rendu reproductible ; contrôles de cohérence (chaque script de la page existe,
  est en cache hors ligne et est testé ; chaque bouton data-a a sa réponse dans le jeu).

Vérifié : 144 tests ; tests navigateur (accessibilité 10/10, maths-sciences, quêtes, coin anglais, hors ligne) ;
essai réel PHP de visite.php (comptage, refus des valeurs inconnues, limite 429, affichage admin).
À la mise en ligne : relancer schema.sql (table ami_visites).
```

---

## Version 5.94

```text
Ami des mots 5.94.0

💳 Tous les moyens de payer Plus (réglés dans le compte admin, voir docs/PAIEMENT.md)
- Formules : mensuel, annuel, famille, à vie (paiement unique). Prix, lien Stripe, texte d'essai gratuit et « proposée
  dans les stores » pour chacune. Écran Plus : une carte par formule.
- Site : Stripe (abonnements + paiement unique « à vie » ; codes promo Stripe ; portail de résiliation).
  Webhook : paiement unique → Plus à vie ; remboursement → accès coupé.
- Codes cadeaux : créés par lots dans le compte admin (nombre, durée, nom du lot), CADEAU-XXXX-XXXX, à usage unique,
  cumulables, gardés seulement en empreinte ; saisis dans « ✨ Plus » → « J'ai un code cadeau » (serveur : cadeau.php).
- Appli Android / iPhone : Google Play Billing et achat intégré Apple (module cordova-plugin-purchase, ajouté à la
  fabrication Android). Pas de lien Stripe dans l'appli des stores. Chaque achat est VÉRIFIÉ par le serveur
  (magasin.php) directement chez Google (compte de service) ou Apple (App Store Server API) ; « Restaurer mes achats » ;
  abonnement renouvelé repris automatiquement.
- Toujours : Plus seulement par certificat signé par le serveur ; aucun secret dans le jeu.
- Nouvelles tables : ami_cadeaux, ami_magasin (schema.sql). Nouveaux réglages : config.exemple.php.
- Pages légales : formules, à vie, essai, codes cadeaux, paiement dans les stores.

😈 La bande vanne Plumo version CASH (18 répliques) ; version douce gardée pour le ton « Tout doux ».

Vérifié : 138 tests (dont achat Google simulé, code cadeau, formules) ; essai réel PHP : achats Google (abonnement,
à vie, faux jeton refusé), Apple (valide, achat d'une autre appli refusé), restauration sur un nouveau code,
codes cadeaux (créés dans l'admin, déjà utilisé, prolongation, compte à vie), Stripe « à vie » + remboursement,
webhook mal signé refusé.
Contient aussi les v5.84 à v5.93.
```

---

## Version 5.93

```text
Ami des mots 5.93.0

🦉 Plumo plus beau et plus calme
- Toujours le Plumo en 3D (img/ami-3d-560.webp), même avec les accessoires du vestiaire, posés par-dessus l'image.
- Il respire doucement au lieu de flotter et de sauter ; fête et surprise en un seul petit mouvement.
- La bande (Pico, Zaza, Rocket) est dessinée (plus d'émojis) et rit doucement. Le jeu affiche automatiquement des images 3D
  dans le style de Plumo dès qu'elles sont déposées dans img/bande/ (voir docs/PERSONNAGES.md, descriptions prêtes).

🔒 Pages légales (legal.html, liens sur l'accueil et l'espace parents, dispo hors ligne)
- Mentions légales, confidentialité (mineurs, voix jamais envoyée, tableau de ce qui part au serveur), conditions d'utilisation
  (règles des vannes, 3018), conditions de vente de Plus. Champs à compléter surlignés ; à faire relire par un juriste.

👪 Bilan de la semaine (espace parents)
- Comparaison avec la semaine d'avant, dernières notes (évaluations, brevet et bacs blancs), conseil de Plumo sur la matière
  à retravailler, bouton « Partager le bilan » (partage du téléphone ou copie).

⚡ Chargement
- Image de Plumo : 375 Ko → 77 Ko. Scripts chargés sans bloquer l'affichage (defer).
- Premier chargement en 4G moyenne : environ 20 s → 10 s sans compression ; .htaccess pour OVH (compression : 1,5 Mo de scripts → ~500 Ko, cache).

🇪🇸🇩🇪 Espagnol et allemand (LVB) de la 5e au bac
- 54 questions, une évaluation par niveau (A1 en 5e, A2 en 3e, B1 en Tle), vannes validées par le juge.

📋 Pour la suite
- docs/RELECTURE-PROFS.md (message prêt, quoi vérifier) ; les listes à relire contiennent désormais TOUTES les questions écrites.
- docs/TEST-ADOS.md (déroulé de 20 min, questions, grille).
- docs/STORES.md (fiche Play Store, formulaires, point bloquant du paiement) + 5 captures dans docs/stores/captures/.

Corrigé : « Ami des Mots » (M majuscule) était devenu « Plumo des Mots » sur quelques pages.
Vérifié : 136 tests ; navigateur : maths-sciences 7/7, quêtes 9/9, coin anglais 7/7, hors ligne OK.
Contient aussi les v5.84 à v5.92.
```

---

## Version 5.92

```text
Ami des mots 5.92.0

🦉 Le hibou s'appelle maintenant PLUMO (l'appli reste « Ami des mots »)
- Renommé partout : écrans, vannes, bande de potes (« Plumo, tu nous as appelés pour ça ? »), bêtisier, boutique,
  coins de l'admin, serveur (consignes de l'IA), guides et tests — 988 remplacements.
- Français : « d'Ami » → « de Plumo », « qu'Ami » → « que Plumo ». Turc décliné : « Plumo'nun », « Plumo'yu ».
- « Hooty » écarté : c'est le hibou d'une série Disney (The Owl House).
- Test navigateur du coin anglais rendu fiable (la réplique de battle peut venir des clashs).
Vérifié : 134 tests ; suites navigateur maths-sciences 7/7, quêtes 9/9, coin anglais 7/7, hors ligne OK.
Contient aussi les v5.84 à v5.91.
```

---

## Version 5.91

```text
Ami des mots 5.91.0

📞 « J'appelle mes potes ! » (toutes les matières, maths, épreuves)
- 3 bonnes réponses d'affilée : « Wwwwaaaaa, t'es un ouf toi !! La prochaine bonne réponse, j'appelle mes potes… 📞 »
  (version douce en « Tout doux » : il appelle ses amis pour applaudir).
- La 4e : la bande d'Ami débarque (2 ou 3 personnages, bulles qui arrivent une à une) et vanne… Ami, pas le joueur :
  🦔 Pico le hérisson, 🐸 Zaza la grenouille, 🦊 Rocket le renard (4 répliques chacun). Ami prend un air surpris.
- Se répète toutes les 4 bonnes réponses (annonce à 7, bande à 8…).
- Erreur juste après l'annonce : « 😮‍💨 Ouf ! J'ai raccroché, mes potes ne viendront pas cette fois. »
- Animation coupée si l'appareil demande moins de mouvement. Toutes les répliques passent le juge.
Vérifié : 134 tests (dont 4 bonnes réponses réelles d'affilée puis l'erreur après l'annonce), captures sur téléphone.
Contient aussi les v5.84 à v5.90.
```

---

## Version 5.90

```text
Ami des mots 5.90.0

😏 Des vannes aussi quand la réponse est BONNE (toutes les matières, maths, épreuves, anglais)
- Tout doux : compliments rigolos (« Même la cloche de la récré veut ton autographe ») ;
  taquin : « Juste. Bon, je vérifie quand même que tu n'as pas regardé sur le voisin… 👀 » ;
  cash : « Wesh, t'es un ouf : bonne réponse ! Bon, calme-toi, c'en est qu'une. 🔥 » ; trash talk : inchangé.
- Séries : « 3 bonnes d'affilée ! Ami appelle les renforts. 🚨 ». Jeux en anglais : vannes en anglais (« No cap, that was clean »).
- Boutons 😂 / 🙄 aussi sur ces vannes (l'IA apprend ce qui fait rire).

📚 Renfort des matières (nouveau fichier js/mat-renfort.js, ~150 questions)
- Histoire-géo-EMC : repères de la 6e à la Tle (Néolithique, Rome, Hégire, 1492, 1789, 1848, 1918, 1940, 1958, 1989, 1929, plan Marshall, traité de Rome…).
- SVT : 6e (besoins des plantes, cellule, classification), 5e-4e (effort, digestion, séismes, puberté, microbiote), 2nde, 1re, Tle (méiose, évolution, climat, synapse, glycémie).
- Physique-chimie : 6e (états de la matière, mélanges, circuits, énergies), 1re (moles, énergies, ondes, Lewis, lentilles), Tle (Newton, pH, radioactivité, condensateur, gaz parfaits, Kepler).
- Français de 1re : œuvres, mouvements, épreuve du bac de français.
- Nouvelle matière 🤔 Philosophie (Tle) : auteurs, notions, méthode, bac blanc.
- Une évaluation sur 20 à chaque niveau où la matière existe.
- Sujets graves (guerres) : la vanne vise la confusion de date, jamais l'événement.
Vérifié : 133 tests ; toutes les vannes passent le juge.
Contient aussi les v5.84 à v5.89.
```

---

## Version 5.89

```text
Ami des mots 5.89.0

🇬🇧 Anglais du programme, de la 6e au bac (Matières → Anglais (6e → bac))
- 36 chapitres, 110 questions écrites à la main + un générateur de verbes irréguliers (30 verbes, prétérit et participe passé).
  Chaque mauvaise réponse a sa vanne (sur la réponse, jamais l'élève) et chaque question son explication.
- Progression calée sur les niveaux européens (CECRL) : 6e A1 (be, have got, présent simple, there is, can, possessifs, heures, jours…),
  5e (be + -ing, prétérit, comparatifs, much/many), 4e A2 (irréguliers, present perfect for/since, will/going to, modaux),
  3e A2→B1 (passif, conditionnel, discours indirect, relatives, faux amis), 2nde B1 (have been + -ing, déduction, wish, phrasal verbs,
  mots de liaison, axes de 2nde), 1re-Tle B2 (If… had…, have something done, V-ing ou to, pièges de traduction, inversion,
  It's time / I'd rather, insistance, axes du cycle terminal, compréhension de l'écrit, méthode du bac).
- Une évaluation sur 20 par niveau (20 questions) : fin de 6e, 5e, 4e ; fin de 3e « A2, socle du brevet » (le brevet n'a pas
  d'épreuve écrite d'anglais) ; fin de 2nde B1 ; bac blanc de 1re ; bac blanc LVA de Tle (B2, logique de l'attestation :
  au bac, l'anglais compte en contrôle continu, avec une attestation par compétence).
- Battle entre potes : nouveau mode « 🎓 Anglais du programme » (questions du niveau choisi), avec les vannes.
- Toutes les vannes passent le juge d'Ami (test automatique). « sing / sang » remplacé par « ring / rang » (le juge lit « sang » en français).
Vérifié : 131 tests, captures sur téléphone.
Contient aussi les v5.84 à v5.88.
```

---

## Version 5.88

```text
Ami des mots 5.88.0

🗯️ Clash libre : +65 vannes (sélection de David), en anglais ET en français — 124 vannes en tout
- Nouvelles catégories : 🧠 Réparties du tac au tac, 🌀 Absurde, 📐 Matières (maths, français, philo, langues, histoire-géo,
  HGGSP, physique-chimie, SVT, NSI, SI, arts, SES), 📝 Contrôles, bac & Parcoursup, 🏫 Vie de classe.
- Triées comme le ferait l'IA du jeu : on garde ce qui vise la copie, les révisions, le code, les excuses ;
  reformulé ce qui visait la personne (« ton cerveau », « ton QI », « t'es inutile » → « ta réponse », « ta copie », « tes excuses ») ;
  écartées : famille (« ton père / ta mère »), bégaiement, accent et « pays d'origine », vêtements « moches », QI, conscience morale,
  « l'évolution a fait marche arrière », cimetière, minute de silence, frontières coloniales.
- Les marques remplacées quand ce n'est pas utile (Siri → l'assistant vocal, Ikea → la notice).
- Toutes passent le juge d'Ami (test automatique).
Contient aussi les v5.84 à v5.87.
```

---

## Version 5.87

```text
Ami des mots 5.87.0

⭐ Ajouter ses vannes au paquet du Clash libre — l'IA trie
- Clash libre → « ➕ Ajouter des vannes au paquet » : la vanne en français (+ l'anglais si on sait).
  Après une vanne écrite en jeu : « ➕ Garder cette vanne dans le paquet ».
- Tri en deux temps :
  1. le juge d'Ami (règles, tout de suite, même hors ligne) : gros mots, insultes, physique, famille, origine, religion, argent, violence, infos perso ;
  2. l'IA du serveur (serveur-php/vanne-juge.php) : refuse ce que les règles ne voient pas (moquerie déguisée, harcèlement,
     sous-entendu, verlan, personne réelle visée…), « dans le doute, refuse », et corrige l'anglais s'il est faux.
     Elle garde les vannes qui piquent fort tant qu'elles visent ce que la personne FAIT.
- Serveur muet : la vanne est « en attente » et ne sort pas en jeu ; elle repasse devant l'IA à la prochaine ouverture du clash.
  Sans serveur configuré : le juge d'Ami seul.
- Les vannes ⭐ sortent dans les cartes comme une catégorie. « 🚫 Là, c'est trop méchant » sur une vanne ⭐ la retire du paquet.
- Liste des vannes du paquet avec leur état (🤖✅ IA / ✅ juge d'Ami / ⏳ attend l'IA) et bouton 🗑️. 100 vannes au plus, gardées sur l'appareil.
- Seul le texte de la vanne part au serveur (ni prénom, ni code). Limites : 20 par minute, 60 par jour par appareil (vanne_juge_par_jour).

Vérifié : 130 tests ; essai réel de vanne-juge.php avec une fausse IA (acceptée + anglais corrigé, refusée, GET refusé, prénom non transmis).
Contient aussi les v5.84 à v5.86.
```

---

## Version 5.86

```text
Ami des mots 5.86.0

🗯️ Clash libre : on se vanne, tout simplement (coin Battle de vannes, première carte)
- Deux joueurs, un téléphone, chacun son tour : 3, 5 ou 8 vannes chacun.
- 3 cartes à chaque tour (catégories différentes) : « Wesh gros (ça pique) », Skill issue (le jeu), Aura & NPC,
  Devoirs & école, Téléphone & réseaux, La vie de tous les jours, Ripostes — 59 vannes, toutes en anglais ET en français.
- « ✍️ J'écris la mienne » : vanne libre (140 caractères), passée au juge d'Ami.
- Celui qui reçoit réagit : 😂 Wesh, il m'a eu (+3 d'aura), 🔥 T'es un ouf, quelle punchline (+5), 🙄 Bof, gros (0),
  🚫 Là, c'est trop méchant (−2 et carton jaune).
- Fin : gagnant, titres (Apprenti vanneur → Aura infinie), et la liste de l'anglais appris pendant le clash. Revanche avec les mêmes noms.
- Règle d'or : on vise ce que fait l'autre, jamais qui il est. Refusé : physique, famille, origine, religion, argent,
  insultes, gros mots, violence, infos personnelles.
- Juge d'Ami : « wesh gros », « …, gros » (on interpelle un pote) ne sont plus pris pour une moquerie ; « t'es gros » reste refusé.
- docs/a-relire : les vannes du Clash libre sont ajoutées aux listes à faire relire.

Vérifié : 129 tests (dont une partie complète), captures sur téléphone.
Contient aussi la v5.85 (compte admin, offre signée) et la v5.84 (voie pro).
```

---

## Version 5.85

```text
Ami des mots 5.85.0

🔐 Compte admin du serveur : régler le payant EN DIRECT
- https://ton-domaine.fr/serveur/admin/ (mot de passe haché dans config-ami.php, hors www ; session, jeton anti-falsification,
  limite d'essais) : nouvelle section « 💰 Offre et paiement ».
- On y règle : payant activé ou non, prix affiché, joueurs gratuits (1 à 6), lien de paiement Stripe, portail client Stripe,
  coins réservés à Plus (21), thèmes gratuits (8), jeux gratuits (19). « Enregistrer et publier » : en ligne à la prochaine ouverture.
- serveur-php/offre.php : donne l'offre au jeu, SIGNÉE avec la clé privée du serveur. Le jeu la vérifie (CLE_PUBLIQUE) et
  ne l'applique que si la signature est bonne ; copie signée gardée pour le hors-ligne (une copie trafiquée est ignorée).
- L'offre ne dit que ce qui est payant : elle n'ouvre jamais Plus (Plus = certificat d'abonnement signé, inchangé).
- Le serveur n'accepte que des valeurs connues : serveur-php/admin/catalogue.json, refait depuis le jeu (outils/construire-catalogue.js,
  lancé par npm run verifier). Liens acceptés : uniquement https://buy.stripe.com/… et https://billing.stripe.com/…
- Quand le payant s'allume, l'abonnement de chaque joueur est revérifié tout de suite.
- admin.html (sans serveur) et js/offre.js restent possibles.

Vérifié : 128 tests ; essai réel PHP (SQLite) : mauvais mot de passe refusé, envoi sans jeton refusé (403), coin inventé et lien
non Stripe rejetés, signature PHP acceptée par le jeu, Plus jamais ouvert par l'offre.
Contient aussi la v5.84 (voie professionnelle, vannes) — voir VERSION-5.84.txt.
```

---

## Version 5.84

```text
Ami des mots 5.84.0

🔧 Voie professionnelle
- Bac pro blanc (épreuves générales) : français, histoire-géo-EMC, maths et physique-chimie, PSE (secours, risques professionnels, budget),
  économie-droit / économie-gestion (contrat de travail, prud'hommes, facture et TVA), langue vivante (anglais professionnel).
- CAP blanc (épreuves générales) : français et HG-EMC, maths et physique-chimie, PSE.
- Espace Officiel : pages du bac pro et du CAP, base nationale des sujets de l'enseignement professionnel.
- Les épreuves professionnelles (propres à chaque métier) ne sont pas couvertes : leurs sujets ne sont pas publics, sauf en CAP.

😂 Vannes : 124 vannes plates (« Non. ») remplacées par de vraies vannes ; un test vérifie qu'il n'en reste plus aucune.
Tests : 127 tests unitaires OK.
```

---

## Version 5.83

```text
Ami des mots 5.83.0

🏛️ Espace « Officiel » (nouvel onglet dans Matières)
- Liens directs vers tous les programmes officiels : cycle 3, cycle 4, lycée général et technologique, spécialités, maths, langues, SVT, séries technologiques.
- Liens directs vers toutes les annales officielles : brevet depuis 2018, bac général et technologique depuis 2021, tous les sujets 2026,
  définitions officielles des épreuves (brevet, bac général, bac technologique, Grand oral).

📜 Dans chaque matière : la référence du programme officiel du niveau (BO) et le lien éduscol.

🎤 Les oraux
- Oral du brevet (15 min, noté sur 20), oral de français (20 min), Grand oral (20 min) : déroulé, attendus et méthode, avec Ami qui vanne.
- Le brevet blanc inclut maintenant l'oral (coefficient 2), comme le vrai DNB ; le bac blanc de terminale inclut le Grand oral (coefficient 8 à partir de 2027).

Limites : l'appli ne peut pas noter une prise de parole ni recopier les sujets officiels (droits du ministère) : elle renvoie vers eux et propose des sujets jumeaux.
Tests : 126 tests unitaires OK ; captures Chrome (téléphone) sans erreur.
```

---

## Version 5.82

```text
Ami des mots 5.82.0

🎒 Toutes les spécialités du bac général
- Ajoutées : arts (histoire des arts, cinéma-audiovisuel, musique, théâtre, arts plastiques, danse), biologie-écologie, EPPCS (sport),
  LLCA latin et grec, LLCER espagnol, allemand, italien, portugais et anglais monde contemporain (les langues qui ont une épreuve écrite de spécialité).
- Elles rejoignent maths, physique-chimie, SVT, SES, HGGSP, HLP, NSI, SI, LLCER anglais : 24 épreuves de spécialité, toutes disponibles
  dans le bac blanc de terminale (2 spécialités au choix + philo).

🛠️ Bac technologique (7 séries)
- STMG (gestion : coût, TVA, marge, seuil de rentabilité ; droit et économie), STI2D, ST2S, STL (dilutions), STD2A, STHR (coût matière, ratio), S2TMD.
- Un bac techno blanc par série : spécialités coefficient 16 + philosophie.

🎓 Après le bac : Médecine, Droit, Astrophysique
- Nouvelles matières (niveau « Sup ») dans la porte Matières :
  médecine (anatomie, physiologie, essais cliniques, études de santé PASS/L.AS), droit (institutions, bases du droit, métiers),
  astrophysique (étoiles, galaxies, Univers + calculs : vitesse de la lumière, années-lumière, loi de Wien, 3e loi de Kepler, loi de Hubble, parallaxe).

😂 Vannes : une vanne trop courte (« Non. ») est maintenant toujours relevée par une expression imagée ou de la tchatche.

Limites : les parties créatives ou rédigées (dissertations, synthèses, pratique artistique ou sportive) restent sur papier ;
pas de LLCER en arabe, chinois, russe ou langues régionales tant qu'un locuteur ne peut pas relire.
Tests : 125 tests unitaires OK ; captures Chrome (téléphone) sans erreur.
```

---

## Version 5.81

```text
Ami des mots 5.81.0

😂 Expressions imagées : 36 de plus (66 au total)
- Après recherche des expressions françaises, belges et québécoises les plus connues :
  « ne pas être une lumière », « ne pas avoir inventé le fil à couper le beurre », « pédaler dans la choucroute », « sauter du coq à l'âne »,
  « se mettre le doigt dans l'œil », « raconter des salades », « en faire tout un fromage », « c'est la fin des haricots »,
  « parler à travers son chapeau » et « avoir de la broue dans le toupet » (Québec), « carabistouille » (Belgique), « partir à Pétaouchnok »…
- Toujours retournées sur la RÉPONSE ou sur Ami, jamais sur le joueur ; expressions grossières écartées. Tests : juge, pas de doublon, cible.
Tests : 123 tests unitaires OK.
```

---

## Version 5.80

```text
Ami des mots 5.80.0

😂 Expressions imagées
- 30 nouvelles vannes avec des expressions françaises détournées : « cette réponse n'a pas la lumière à tous les étages »,
  « elle pédale dans la semoule », « elle est complètement à l'ouest », « elle a une araignée au plafond », « elle cherche midi à quatorze heures »…
- Elles visent toujours la RÉPONSE (ou Ami lui-même, en autodérision), jamais le joueur : un test le vérifie.
- Où : en ton Trash talk (mélangées aux phrases de champion et à la tchatche), et de temps en temps en ton Taquin ou Cash
  dans les maths, les matières et les examens blancs.
- L'IA (quand le serveur sera en ligne) a aussi ce style dans sa boîte à outils.

Tests : 123 tests unitaires OK.
```

---

## Version 5.79

```text
Ami des mots 5.79.0

🎓 Bac de terminale : toutes les spécialités de la voie générale + philosophie
- 9 spécialités construites comme les sujets 2026 :
  maths (4 exercices : probabilités et loi binomiale, vrai/faux justifié, géométrie dans l'espace, fonction + intégrale),
  physique-chimie (diffraction, solaire, circuit RC, électrolyse, titrage), SVT (connaissances pour la synthèse + datation isotopique),
  SES (épreuve composée : connaissances, étude de document chiffrée, raisonnement), HGGSP, HLP, NSI (SQL, Python, réseaux RIP/OSPF, chiffrement, objets),
  sciences de l'ingénieur (catamaran électrique + sciences physiques), LLCER anglais (traduction, faux amis, méthode de synthèse).
- Philosophie : notions, auteurs, méthode ; sujets 2026 proposés sur papier.
- Bac blanc de terminale : l'élève choisit ses 2 spécialités, la philo s'ajoute ; coefficients officiels 16 + 16 + 8.
- Annales : 10 jumeaux de sujets de terminale 2026 avec le lien vers le PDF officiel.
- Les parties rédigées (dissertations, synthèses, essais) sont proposées à faire sur papier ; l'appli entraîne et note ce qui se corrige automatiquement.
- Les données « de dossier » (SES…) sont inventées pour l'entraînement et indiquées comme telles.
- Calculs vérifiés par les tests (loi binomiale, électrolyse, puissance…), toutes les vannes passent le juge.

À relire par un prof : docs/a-relire/epreuves.csv (contient maintenant les spécialités).
Pas encore couvert : arts, LLCA (latin, grec), biologie-écologie, EPPCS, autres langues en LLCER.
Tests : 122 tests unitaires OK ; captures Chrome (téléphone) sans erreur.
```

---

## Version 5.78

```text
Ami des mots 5.78.0

📝 Brevet & bac blancs construits comme les vrais sujets 2026
- Brevet blanc en 5 épreuves, avec les coefficients officiels du DNB 2026 : français (2), maths (2), histoire-géographie (1,5), EMC (0,5, note séparée), sciences (2).
  Une note sur 20 par épreuve, puis la moyenne et la mention.
- Maths du brevet : partie 1 « automatismes » (6 pts, QCM et réponses directes), puis exercices de résolution de problèmes (14 pts) :
  géométrie (Pythagore, trigonométrie, Thalès, homothétie), programme de calcul et Scratch, tarifs et tableur, fonctions, statistiques et écriture scientifique, programmation.
- Français du brevet : compréhension et grammaire sur un texte (50 pts), dictée (10 pts) ; la rédaction (40 pts) est proposée, à faire sur papier.
- Histoire-géo : documents de géographie, développement construit, repères ; EMC : situation pratique.
- Sciences : physique-chimie (10 pts) + SVT (10 pts), comme la session 2026.
- Bac : épreuve anticipée de maths de 1re (nouvelle en 2026), 8 automatismes en QCM (6 pts) + exercices (14 pts), versions avec et sans spécialité ;
  bac de français : œuvres au programme 2026-2027, méthode du commentaire et de la dissertation, question de grammaire de l'oral.
- Toutes les valeurs sont tirées au hasard : un nouveau sujet à chaque fois, avec des calculs justes (vérifiés par les tests).

🗂️ Annales 2026
- Nouvel onglet : pour 8 vrais sujets 2026 (brevet maths ×2, français, histoire-géo-EMC, sciences ; bac maths spé et sans spé, français),
  un sujet jumeau construit pareil, avec le lien vers le sujet officiel sur education.gouv.fr.
- Les textes et les nombres sont différents des sujets officiels : les sujets du ministère ne peuvent pas être repris dans une appli payante sans licence.

😂 Vannes
- L'IA s'adapte toute seule à la famille : elle reçoit les vannes notées 😂 (le style qui fait rire) et 🙄 (à éviter).
- Nouvelles techniques d'humour pour l'IA : stand-up, roast, règle de trois, pince-sans-rire, tchatche, chambrage de copains, conférence de presse et commentaire de combat.
  Ce sont des techniques : l'IA n'imite aucun humoriste ni aucun sportif réel et ne reprend aucun sketch.
- Trash talk : 16 nouvelles phrases « tchatche » (débit rapide, autodérision, jeux de mots).

Correction : l'énoncé de l'exercice s'affiche avant la question ; les longs titres ne débordent plus sur téléphone.
À relire par un prof : docs/a-relire/epreuves.csv.
Tests : 121 tests unitaires OK ; maths-sciences 7/7 et hors ligne OK dans Chrome.
```

---

## Version 5.77

```text
Ami des mots 5.77.0

🥊 Trash talk
- Nouveau ton « 🥊 Trash talk » (maths, français, histoire-géo, SVT, physique, brevet & bac blancs) : Ami se la raconte comme un champion de ring
  (pesée, face-à-face, conférence de presse, ceinture), chambre les mauvaises réponses et fait semblant de ne pas être impressionné par les bonnes.
- Séries : 3 bonnes réponses d'affilée → Ami panique ; 3 erreurs d'affilée → Ami relance pour le comeback.
- Battle entre potes : interrupteur « 🥊 Trash talk : ON/OFF » ; Ami chambre avant chaque tour (le score à battre) et à la fin.
- Règle : on chambre la réponse ou le score, jamais la personne. Perso inventé, aucun vrai combattant imité. Toutes les phrases passent le juge ;
  un test refuse les mots qui viseraient la personne. Ami ne répète pas ses phrases tant qu'il en a des neuves.

Corrections
- Le brevet/bac blanc (v5.76) avait une fonction du même nom que l'examen d'anglais : l'une écrasait l'autre. Renommée, et un test empêche que ça revienne.

Tests : 120 tests unitaires OK ; captures Chrome (téléphone) sans erreur.
```

---

## Version 5.76

```text
Ami des mots 5.76.0

Nouvelles matières du programme (6e → bac), avec vannes et explications :
- 📝 Français : conjugaison (tableaux vérifiés), homophones, accords, nature des mots, figures de style, vocabulaire, littérature.
- 🏛️ Histoire-géo & EMC : repères de l'Antiquité au XXe siècle, géographie, citoyenneté.
- 🧬 SVT : le vivant, le corps humain, la Terre, la génétique.
- ⚗️ Physique-chimie : matière, électricité (loi d'Ohm et puissance calculées), vitesse, poids, énergie, masse volumique.
- Accueil : la porte « Sciences » devient « 📚 Matières » (les sciences rigolotes sont dedans).
- Onglet « 📝 Brevet & bac blancs » : brevet blanc en 4 épreuves (français, maths, histoire-géo, sciences) avec une note /20 chacune et la moyenne + mention ; bac de français blanc (1re) ; maths 1re et terminale.
- Examen blanc par matière quand il existe pour le niveau (note /20 gardée).
- Battle entre potes : nouveau mode « 📚 Culture G ».
- Espace parents : le résumé de la semaine compte les nouvelles matières ; erreurs fréquentes lisibles.
- docs/a-relire/francais.csv, histoire.csv, svt.csv, physique.csv : à faire relire par un prof.

À savoir : le lycée est encore léger (français en terminale et physique-chimie en 1re/Tle arrivent plus tard).
Tests : 118 tests unitaires OK, maths-sciences 7/7 et hors ligne OK dans Chrome.
```

---

## Version 5.75

```text
AMI DES MOTS — VERSION 5.75
L'essentiel, mieux rangé

Accueil (ACCUEIL_SIMPLE:true dans js/config-site.js — false = ancien accueil)
- Défi du jour, Apprendre 5 mots, puis 4 grandes portes : 🇬🇧 Mots & anglais, 🔢 Maths, 🚀 Sciences, ⚔️ Battle.
  Derrière « Mots & anglais » : jouer, à revoir, atelier des phrases, coin anglais, professeur (et village /
  Mots City quand ils reviendront). « À revoir » reste sur l'accueil quand il y a des mots à revoir.
- Rangés pour l'instant : l'astuce d'Ami, Trophées, Vestiaire, Astuces. Restent : mot du jour, Mon carnet,
  Réglages, et un nouveau raccourci 👪 Parents.

Après une erreur, tout se voit
- La bulle de vanne n'apparaissait qu'une fois sur quatre (selon l'humeur d'Ami) et se cachait parfois sous l'écran
  ou sous « J'ai compris » : le plateau de jeu (#app, .partie) avait un contexte 3D qui capturait les éléments
  fixes. Corrigé : la bulle est au-dessus, puis une rangée « Je la garde · J'ai compris — continuer · Pas drôle ».

Maths : chapitres rangés en blocs par domaine (Analyse, Suites, Probabilités…) côte à côte.
Titres : l'émoji au début d'un titre en dégradé n'est plus un carré blanc.

Parents (👪, protégé par une multiplication)
- « Cette semaine » : jours de jeu, minutes, une barre par jour, réussite par matière (mots, anglais, maths,
  sciences), et les vannes notées 😂 / 🙄. Les vannes de maths, sciences et anglais ont maintenant 😂 / 🙄.

Chargement plus léger : la 3D (≈ 10 Mo : village, Mots City, three.js, modèles) n'est plus téléchargée d'avance ;
l'essentiel (≈ 6 Mo) reste disponible hors connexion.

Listes de travail (node outils/listes-a-relire.js)
- docs/a-relire/maths-6e … maths-Tle.csv et sciences.csv : à faire relire par un prof (colonnes OK / remarque).
- docs/a-enregistrer/phrases-en.csv : 360 phrases des jeux d'écoute, avec le nom du MP3 attendu. Une fois
  enregistrées : colonne « oui » puis node outils/marquer-enregistrees.js → le jeu joue le vrai enregistrement.
Tests : 117/117.
```

---

## Version 5.74

```text
AMI DES MOTS — VERSION 5.74
Exception : les jeux d'écoute restent

- Les jeux où il faut écouter reviennent, avec leur voix : Écoute, Écoute le mot, la dictée, Répète après Ami,
  le jeu des oreilles, les questions « qu'a dit Ami ? » des battles. Les boutons 🔊 🐢 🎤 reviennent partout,
  ainsi que le réglage « La voix d'Ami ».
- VOIX_COUPEES ne coupe plus que les commentaires d'Ami à voix haute : consignes lues, vannes, répliques
  automatiques, professeur hibou. Nouveau réglage JEUX_ECOUTE_CACHE:false (true pour cacher les jeux d'écoute).
- Toujours cachés : 👄 « Comment la bouche fait ce mot », Mots City, le village. Tests : 116/116.
```

---

## Version 5.73

```text
AMI DES MOTS — VERSION 5.73
On reste sur l'essentiel pour l'instant (réglages dans js/config-site.js, rien n'est supprimé)

- BOUCHE_CACHE:true — « Comment la bouche fait ce mot » (👄) n'apparaît plus nulle part.
- VOIX_COUPEES:true — aucune voix : ni enregistrements des mots, ni voix du téléphone (consignes, vannes,
  professeur). Les boutons 🔊 🐢 🎤 sont cachés ; les jeux qui demandent d'écouter (Écoute, Écoute le mot,
  dictée, Répète après Ami, Le jeu des oreilles, questions « qu'a dit Ami ? ») sont retirés des menus et des
  battles ; un ancien lien vers un jeu d'écoute ouvre un jeu d'images. Le prof hibou bouge toujours le bec,
  sa bulle affiche le texte ; le réglage « La voix d'Ami » est caché.
- MOTS_CITY_CACHE:true — Mots City n'est plus sur l'accueil ; mots-city.html ramène à l'accueil
  (mots-city.html?voir=1 pour le tester).
- Avec VILLAGE_CACHE (v5.72), tout revient en mettant false. Tests : 116/116.
```

---

## Version 5.72

```text
AMI DES MOTS — VERSION 5.72
Village caché pour l'instant

- Les boutons « Explorer le village » et « Jouer dans le village 3D » ne s'affichent plus sur l'accueil.
- Le jeu n'ouvre plus le village 3D tout seul au démarrage ; une ancienne adresse monde-3d.html ramène à l'accueil.
- Rien n'est supprimé : pour le remettre, passer VILLAGE_CACHE à false dans js/config-site.js
  (ou ouvrir monde-3d.html?voir=1 pour le tester sans le montrer aux joueurs).
- Mots City, maths, sciences, professeur et battles restent là. Tests : 115/115.
```

---

## Version 5.71

```text
AMI DES MOTS — VERSION 5.71
La nuit sur téléphone, le bandeau du village, et Prof Pi qui ironise

Village 3D
- Nuit en Ultra : l'écran devenait presque noir. L'étalonnage « cinéma » utilisait un contraste qui mettait
  à zéro toutes les couleurs sombres. Il est remplacé par un contraste qui multiplie (il ne soustrait plus),
  avec un léger relevé des ombres la nuit ; l'occlusion ambiante est adoucie la nuit.
- Le bandeau du haut floutait toute la scène derrière lui (bande floue sur téléphone) : seul chaque panneau
  floute maintenant ce qui est derrière lui.
- Téléphone : bandeau compact (titre court, mission plus petite), les boutons se rangent derrière ☰ ;
  l'aide « ZQSD / flèches » est cachée sur écran tactile.

Maths
- js/vannes-ironie.js : 2 vannes ironiques de plus pour 97 erreurs classiques (médiane, Pythagore, signes,
  pourcentages, dérivées…). Ex. : « Bravo, 10,6 : superbe moyenne ! Dommage, on avait demandé la médiane.
  C'est comme apporter des frites quand on a commandé une glace. 🍟 »
- Prof Pi sort d'abord les vannes qui piquent, puis les plus sages ; l'explication reste dessous.
- Tests : 114/114.
```

---

## Version 5.70

```text
AMI DES MOTS — VERSION 5.70
Le professeur hibou s'anime comme un dessin animé

- Ami le prof (professeur.html) est maintenant un dessin articulé (js/prof-anime.js) : corps, tête, ailes,
  aigrettes, paupières, pupilles, sourcils, bec.
- Au repos : il respire, cligne des yeux (parfois deux fois), suit la souris du regard, remue les aigrettes.
- Il parle : une bulle affiche la phrase et le bec bouge avec la voix (mot par mot). Bouton « 🦉 Ami m'explique »
  dans chaque leçon : il lit la leçon et l'exemple. Bouton 🔊 Voix / 🔇 Muet (gardé sur l'appareil).
- Réactions : il salue en arrivant ; aile au menton et « ? » quand tu réfléchis ; bonne réponse = saut avec
  écrasement, ailes qui battent, yeux rieurs, étoiles ; erreur = il secoue la tête, lève un sourcil et se tape
  le front de l'aile ; chatouilles quand on le touche.
- Un petit hibou identique suit la leçon dans le coin de l'écran quand le grand n'est plus visible.
- Respecte « moins d'animations » du système ; rien n'est envoyé. Tests : 113/113.
```

---

## Version 5.69

```text
AMI DES MOTS — VERSION 5.69
Battle entre potes : beaucoup plus de questions, beaucoup plus drôle

- Longueur au choix : ⚡ Courte (9 questions par joueur), 🔥 Normale (15), 🏃 Marathon (24) en mélange ;
  6 / 10 / 16 pour une seule matière.
- 50 nouveaux clashs d'Ami (js/clash-plus.js) : 80 en tout. Chaque mauvaise réplique contient une vraie erreur
  d'anglais (passé irrégulier, -s, a/an, its/their…) expliquée par une vanne.
- 30 nouveaux « vrai ou faux » surprenants et vrais (les pieuvres ont trois cœurs, la tour Eiffel grandit en été,
  certaines tortues respirent par les fesses…) : 50 en tout.
- Ami met la pression avant chaque question de maths (« Celle-là, Ami l'a ratée hier. Ne le dis à personne : »)
  et chambre les bonnes réponses (« Banger ! Ami écrit ton nom en lettres d'or. »).
- Tout passe le juge d'Ami : on clashe les réponses et Ami, jamais les joueurs. Tests : 112/112.
```

---

## Version 5.68

```text
AMI DES MOTS — VERSION 5.68
⚔️ Battle entre potes, directement sur l'accueil

- Nouveau bouton d'accueil « Battle entre potes — maths, anglais et vannes ».
- 2 à 4 joueurs sur le même téléphone, chacun son tour. Au choix : Le grand mélange (3 maths, 3 anglais,
  3 vannes, à tour de rôle), Maths (au niveau choisi, de la 6e à la terminale), Anglais (pièges, oreille,
  vrai ou faux), Vannes (Ami clashe : trouve la meilleure punchline anglaise).
- Entre deux joueurs, Ami commente la course (« Score à battre : 6/9. Ami a déjà sorti le pop-corn. »).
  Podium à la fin avec titres rigolos, et revanche avec de nouvelles questions. Les mauvaises réponses
  sont vannées comme d'habitude (vannes de l'IA si un serveur est branché).
- Le même écran regroupe les autres battles : défi par lien (anglais ou maths), salon en direct, contre Ami.
- Vannes : la remarque « même initiale » ou « ça rime » repasse avant la vanne sur les objets (plus rare, plus maligne).
- Tests : 111/111.
```

---

## Version 5.67

```text
AMI DES MOTS — VERSION 5.67
Graphismes ULTRA (réglage Auto / Normal / Ultra)

Réglage
- Réglages › 🎨 Graphismes : Auto (Ultra sur les appareils puissants, Normal ailleurs), Normal, Ultra. Gardé sur
  l'appareil, partagé par le jeu, le village 3D et Mots City (js/graphismes.js). Le rendu logiciel et les vieux
  processeurs graphiques restent en Normal. Si le système demande moins d'animations, les effets restent coupés.

Mondes 3D (village + Mots City), mode Ultra
- Occlusion ambiante GTAO : les coins, le dessous des objets et les pieds des personnages s'assombrissent.
- Rayons de soleil qui passent entre les arbres et les bâtiments (au lever, au coucher).
- Rendu « cinéma » : contraste, couleurs plus vives, lumières chaudes, ombres bleutées, vignette, grain fin,
  légère aberration d'objectif ; lueurs plus fortes ; anticrénelage SMAA ; ombres 4096 sur PC.
- Poussières dorées qui flottent dans la lumière (lucioles bleutées la nuit).
- Garde-fou : si ça rame, l'occlusion puis les rayons se retirent tout seuls (message dans le village).
- Mots City : trois niveaux (Rapide, Haute, Ultra) dans le téléphone.
- three.js r160 : GTAOPass, SMAAPass et leurs shaders ajoutés dans vendor/jsm (licence MIT) ; GTAOPass modifié
  pour ignorer étiquettes, sprites, vitres et ciel.

Écrans de jeu, mode Ultra (css/ultra.css, js/ultra-ecrans.js)
- Fond animé : nébuleuses qui dérivent, étoiles en parallaxe, étoiles filantes (canvas demi-résolution, 30 i/s,
  en pause quand l'onglet est caché).
- Bonne réponse : explosion de 90 étincelles avec gravité et double onde de choc ; erreur : secousse et éclair rouge.
- Images et cartes en relief qui s'inclinent sous la souris, avec reflet ; boutons à reflet qui balaie ;
  barres de progression qui chatoient ; titres en dégradé ; écrans qui entrent en cascade.

Correctif
- v5.66 : le bouton « Vannes inventées en direct par l'IA » des réglages ouvrait par erreur le générateur de vannes
  pour adultes (deux actions portaient le même nom). Renommé ; un test vérifie qu'aucune action n'est en double.

Tests : jeu 110/110 ; navigateur : maths-sciences 7, village 13, collisions 9, quêtes 9, sens city 5, voitures 8,
Mots City 43, coin anglais 7, accueil 3D, hors ligne : aucune erreur.
```

---

## Version 5.66

```text
AMI DES MOTS — VERSION 5.66
Les vannes sont écrites en direct par l'IA (avec la 5.65 : voix sans émojis, images à la bonne taille sur PC)

- Nouveau serveur-php/vannes-direct.php : dès qu'une question s'affiche (images, maths, sciences, anglais), le jeu
  demande à Claude une vanne neuve pour chaque mauvaise réponse possible. L'IA reçoit les 30 dernières vannes déjà
  dites (interdites) et un angle imposé tiré au hasard : elle ne se répète pas.
- Chaque vanne de l'IA passe le juge d'Ami et ne sert qu'une fois. Sans serveur, hors ligne ou si l'IA tarde,
  Ami reprend ses propres vannes (aucun blocage du jeu).
- Rien de personnel n'est envoyé : seulement la question, les réponses, le ton et les vannes déjà dites.
- Réglages : « Vannes inventées en direct par l'IA » (oui/non), visible quand un serveur est branché.
- Tests : jeu 109/109 (dont le parcours IA simulé), serveur PHP 36/36 (dont 3 pour les vannes directes).
```

---

## Version 5.65

```text
AMI DES MOTS — VERSION 5.65
- La voix ne lit plus les émojis (😂, 🔥, drapeaux…) ni les guillemets : elle dit seulement la phrase.
- PC : l'image d'une question tient dans l'écran (38 % de la hauteur au plus, 520 px de large) ; la carte
  « Découvrir » rapetisse aussi, les boutons restent visibles sans défiler.
- « Voir la bouche » : l'animation ne part plus avant le son. Les petits silences au début et à la fin des
  enregistrements sont retirés du calcul, la bouche bouge en même temps que la voix.
```

---

## Version 5.64

```text
AMI DES MOTS — VERSION 5.64
Ombres lisibles, voix moins robot, vannes qui parlent vraiment des objets

- Jeu « Ombres » : l'ancien filtre transformait les photos en bouillie noire. Chaque image a maintenant une vraie
  silhouette découpée à l'avance (img/ombres, 117 images, outils/fabriquer-ombres.py). Les 5 photos sans fond blanc
  (plage, piano, tableau, puzzle, fenêtre) passent en « lampe torche » : la scène sort de la nuit petit à petit.
- Voix : les voix du téléphone/PC sont classées (Natural/Online, Google, Premium d'abord ; Hortense, Zira, eSpeak
  en dernier). Nouveau réglage « La voix d'Ami » : choisir sa voix et l'essayer, avec l'astuce Edge/Chrome/Android.
- Vannes françaises : js/vannes-mots.js décrit les 122 objets (ce que c'est, ce qu'on en fait). Ami fabrique des
  vannes sur LES DEUX mots confondus : « Le soleil ?! Essaie de poser ta serviette sur le soleil, pour voir. 😂 ».
  4 niveaux, passées au juge, sans répétition. La lecture facile garde les vannes courtes.
```

---

## Version 5.63

```text
AMI DES MOTS — VERSION 5.63
Labo des sciences : des clashs vraiment cash, puis la bonne réponse

- Les 82 clashs du labo (planètes, fusées, corps humain, médecine) sont réécrits : d'abord la punchline, puis la
  bonne réponse en clair. Ex. « Thomas Pesquet ?! En 1969, il n'était même pas encore au programme : il est né en
  1978 ! C'est Neil Armstrong. » ; « 3 840 km ? À ce compte-là, on irait sur la Lune en car scolaire pendant les
  vacances. Il manque deux zéros : 384 000 km. »
- Les faits restent exacts (dates, chiffres) et chaque clash passe le juge d'Ami : il démonte la réponse, pas la personne.
```

---

## Version 5.62

```text
AMI DES MOTS — VERSION 5.62
Prof Pi ne répète jamais ses vannes, et il s'énerve quand on refait la même erreur

- Mémoire des vannes (par joueur, gardée sur l'appareil) : Prof Pi sort d'abord les vannes jamais dites pour cette
  erreur, puis les vannes générales, puis la FABRIQUE À VANNES : amorce + « Même … » + chute, plus de 70 000
  combinaisons (accordées au féminin et au masculin). Testé : 300 erreurs de suite, 300 vannes différentes.
  Ex. « Allô ? 5,23 ? Même la règle de 30 cm a demandé un remboursement. Réponse officielle : 5,5. »
- Même erreur refaite dans la série, en ton 🔥 Cash :
  2e fois : « Encore ?! Mais genre, tu fais exprès ou quoi !!!! 😤 » (ou une variante qui clashe fort) ;
  3e fois : « Sérieux, tu vas à l'école toi ??? 🏫 » (ou une variante) ;
  4e fois et plus : « Là, c'est plus une erreur, c'est une tradition. Prof Pi va l'encadrer. 🖼️ »
  En Taquin, ça reste joueur ; en Tout doux, c'est un encouragement.
- Labo des sciences (ton Cash) : la punchline ne se répète pas non plus.
- Toutes les vannes passent le juge d'Ami ; l'explication 💡 reste toujours affichée.

Tests : 107 + 22 réussis ; maths et sciences dans Chrome : OK.
```

---

## Version 5.61

```text
AMI DES MOTS — VERSION 5.61
Vannes plus drôles et plus cash

- 110 nouvelles vannes pour Prof Pi (maths), réparties sur les erreurs les plus fréquentes de la 6e à la Terminale,
  plus des vannes générales quand l'erreur n'est pas classée. Exemples :
  « Plus long ≠ plus grand. Sinon le mot « anticonstitutionnellement » serait milliardaire. »
  « Additionner les dénominateurs ? Avec ta méthode, deux moitiés de pizza font… moins d'une pizza. »
- Le ton « Sans pitié » s'appelle maintenant « 🔥 Cash (ados) ».
- Labo des sciences en ton Cash : le clash de chaque mauvaise réponse est suivi d'une punchline qui change.
- Règle inchangée et testée : on démonte la RÉPONSE, jamais la personne ni sa famille ; chaque vanne passe le juge d'Ami.

Tests : 105 + 22 réussis ; maths et sciences dans Chrome : OK.
```

---

## Version 5.60

```text
AMI DES MOTS — VERSION 5.60
Graphisme, voitures dans le bon sens, clashs plus forts, plein écran sur ordinateur

VOITURES
- Vérifié une par une (page de contrôle outils/tests-navigateur/garage.html) : chaque véhicule a son avant du côté
  où il roule. Les bus, le car scolaire et l'ambulance n'avaient pas de phares nommés : leur avant est maintenant
  donné par leur forme (AVANT_Q dans js/kit3d.js).
- Nouveau test test-sens-voitures.js : dans le village et dans Mots City, aucun véhicule ne roule en marche arrière
  (3 relevés par monde).
- Bus, car scolaire, ambulance, vélo, feux et cônes avaient perdu leurs couleurs (tout gris, vitres « en triangles ») :
  couleurs d'origine du pack rétablies et découpe des faces corrigée (outils/preparer-nature.mjs).

GRAPHISME
- Ciel en dégradé franc (bleu profond en haut, clair à l'horizon, halo du soleil, couchant et nuit) dans le village
  et Mots City, au lieu d'un ciel blanc délavé. La pluie garde son ciel gris.
- Village : la caméra se place directement derrière le joueur au départ (avant, elle partait de la fontaine) et suit
  à la même vitesse sur tous les ordinateurs.
- Portails du village : icônes au-dessus des noms, libellé « Le coin anglais » raccourci (plus de chevauchement).

ORDINATEUR
- Les écrans utilisent toute la largeur (jusqu'à ~1760 px) au lieu d'une colonne de 1000 px au milieu.
- Coin anglais, maths, sciences : cartes en grille large. Questions : grande question à gauche, grosses touches de
  réponse à droite, sur toute la hauteur. Accueil : grands boutons sur deux colonnes.
- Boutons de choix (ton de Prof Pi…) enfin lisibles. Rien ne change sur téléphone.

CLASHS
- 30 manches de battle au lieu de 9 (21 nouvelles, originales) : chaque mauvaise réplique cache une vraie erreur
  d'anglais que la vanne explique.
- Ami contre-attaque quand tu rates ta réplique (sur la réplique ratée, jamais sur toi).
- Le public : jauge d'énergie, ovations quand tu réussis du premier coup, séries (« Série de 3 : Ami est KO
  debout ! »), dernière manche en FINALE.

TESTS : 104 + 22 réussis ; navigateur : voitures (8), sens Mots City (5), village 5.42 (13), collisions (9),
quêtes (9), maths et sciences (7), Mots City, coin anglais, accueil 3D, hors ligne : OK.
```

---

## Version 5.59

```text
AMI DES MOTS — VERSION 5.59
Remise en ordre après la consolidation 5.58

- Mots City est de retour : dans la 5.58, mots-city.html avait été remplacé par une copie du village 3D
  (plus de conduite, de missions, de radio, d'étiquettes ni de véhicules Quaternius). Le vrai Mots City est restauré.
- Direction vérifiée dans un vrai Chrome : flèche droite = le héros (à pied ET en véhicule) tourne vers la droite de
  l'écran, gauche vers la gauche (nouveau test outils/tests-navigateur/test-sens-city.js).
- Phase « tout gratuit » conservée. Liste des thèmes gratuits corrigée : elle citait des thèmes qui n'existent pas
  (corps, école, transports) et oubliait habits, musique et atelier.
- Tests de l'abonnement Plus : ils activent maintenant eux-mêmes le mode payant, pour continuer à vérifier la
  protection (certificat signé, triche impossible) même pendant la phase gratuite. Test du coin admin corrigé
  (une case de coin cochée = gratuit).

Tests : 102 + 22 (moteur adaptatif, tuteur, professeur) réussis ; navigateur : Mots City, sens de direction
(village et Mots City), village 5.42, collisions, quêtes, maths et sciences, coin anglais, hors ligne : OK.
```

---

## Version 5.58

```text
AMI DES MOTS — VERSION 5.58

- Finition transversale de l’interface : confort tactile, focus clavier, lisibilité et adaptation aux grands écrans.
- Professeur local enrichi avec six leçons supplémentaires : couleurs, division, comparatif anglais, pourcentages, voix passive et discriminant.
- Les profils, la progression locale, les modules existants et le fonctionnement hors ligne sont conservés.

Limites : cette version n’ajoute pas de pack de modèles 3D photoréalistes ni de carte AAA. Le rendu 4K dépend de l’écran, du navigateur et du GPU. Le professeur reste un tuteur local à contenus vérifiés, pas un modèle génératif connecté. Validation visuelle sur appareils réels encore nécessaire.
```

---

## Version 5.49

```text
Ami des Mots v5.49 — Renaissance graphique
```

---

## Version 5.46

```text
Ami des mots v5.46 — humour renforcé et refonte visuelle premium

- Punchlines supplémentaires après les erreurs des pièges d’anglais, en français et en anglais.
- Les répliques visent les phrases, la grammaire et le hibou Ami, jamais l’enfant.
- Refonte responsive des écrans pièges, coin anglais, cartes et retours : fond glass, profondeur, typographie, boutons et animations légères.
- Respect de prefers-reduced-motion et conservation des règles pédagogiques existantes.
```

---

## Version 5.45

```text
AMI DES MOTS — VERSION 5.45
Correctifs de direction dans les univers 3D

- La commande droite utilise désormais l'axe horizontal réel de la caméra, pour que droite/gauche restent cohérentes à l'écran même après rotation de la caméra.
- Les voitures du quartier 3D sont orientées selon leur sens de circulation, y compris les voitures roulant vers -Z.
- Les roues des voitures animées tournent désormais avec un signe cohérent avec leur sens de déplacement.
- Dans Mots City, la rotation des roues du trafic tient également compte du sens de circulation.
- Ajout d'un test navigateur de non-régression : flèche droite, orientation des voitures et rotation des roues.

À vérifier dans Chrome : lancer le serveur local puis exécuter
node outils/tests-navigateur/test-sens-univers.js
```

---

## Version 5.44

```text
AMI DES MOTS — VERSION 5.44
Maths de la 6e au bac avec Prof Pi, labo des sciences, serveur PHP sans Supabase, appli Android

MATHS (6e → TERMINALE)
- 🔢 Coin maths : 7 niveaux, 73 sortes d'exercices rattachées aux programmes de la rentrée 2026
  (6e programme 2025, 5e nouveau cycle 4, 4e/3e cycle 4 en vigueur, 2nde/1re nouveaux programmes, Tle).
- Exercices fabriqués par le code : nombres au hasard, correction CALCULÉE (jamais devinée), à l'infini.
- Chaque mauvaise réponse proposée est une erreur classique (dénominateurs additionnés, oubli du double produit,
  racine oubliée dans Pythagore, signes des racines…), avec sa vanne de Prof Pi (raton laveur prof de maths) ET l'explication.
- Ton de Prof Pi : tout doux (petits), taquin, sans pitié (ados). Les vannes visent l'erreur, jamais l'élève.
- Brevet blanc (3e), épreuve anticipée blanche (1re), bac blanc (Tle), note sur 20.
- Battles de maths : défi par lien (même niveau, mêmes questions), salon en direct (le chef choisit maths).
- Veille IA : le serveur lit les programmes et sujets OFFICIELS (education.gouv.fr, Eduscol), propose la carte des
  chapitres et la liste des sujets (liens vers le ministère) ; rien n'est publié sans validation dans admin/.

SCIENCES
- 🚀 Labo des sciences : 41 questions (planètes et espace, fusées et astronautes, corps humain, médecine et microbes),
  un clash par mauvaise réponse + l'explication.

SERVEUR PHP (sans Supabase)
- serveur-php/ : abonnement Stripe (webhook signé, certificats Plus signés), vannes IA, salon des battles
  (rafraîchissement ~1 s, marche sur un mutualisé OVH), carte des programmes, veille, coin admin protégé.
- node outils/configurer.js --serveur … : branche le jeu sur le serveur sans toucher au code.

APPLI
- 📲 Bouton « Installer l'appli » (Android/PC) ; iPhone : Partager → Sur l'écran d'accueil.
- Appli Android fabriquée par GitHub Actions (Capacitor) : APK de test, AAB Play Store si la clé est fournie.
  Voix du téléphone dans l'appli, micro pour « Répète après Ami ».
- Site sur GitHub Pages par GitHub Actions.

TESTS
- 102 tests automatiques (dont corrections de maths recalculées autrement, 150 tirages par exercice).
- Serveur PHP : 33 vérifications sur une vraie base MariaDB (Stripe et Claude simulés).
- Navigateur : maths et sciences (7), salon à deux navigateurs par le serveur PHP (9) et par Supabase simulé (9).

LIMITES
- L'APK n'a pas pu être compilé ici (outils Android inaccessibles depuis cet environnement) : la fabrique GitHub
  est prête, le projet Capacitor a été généré et vérifié, la compilation se fera au premier lancement sur GitHub.
- Serveur testé sur MariaDB locale, pas encore chez OVH. Veille testée avec des documents simulés.
- Maths : les cartes des programmes de 5e (nouveau) et de lycée (nouveaux programmes 2026) sont à confirmer par la veille.
```

---

## Version 5.43

```text
AMI DES MOTS — VERSION 5.43
Ami propose des vannes (IA), un adulte choisit

- Espace parents → « ✨ Ami propose des vannes (IA) » : on choisit un thème et un ton (tout doux, taquin,
  corsé), l'IA (Claude) propose 6 vannes, le juge d'Ami retire les mauvaises, et un adulte garde ✅ ou jette ❌.
  Rien n'entre dans le jeu sans un adulte. Les vannes gardées rejoignent les vannes de la famille.
- Réservé aux abonnés Plus, 5 demandes par jour. La clé Claude reste sur le serveur (fonction ami-vannes).
- À brancher : voir VANNES-IA.md (clé API, SQL, déploiement, API_VANNES).
- Tests : 96 automatiques (dont générateur : juge, adulte, quota, aucune clé dans le client).
- Limite : la fonction serveur est vérifiée (types, nettoyage des réponses) mais pas encore appelée sur ton
  vrai Supabase avec ta vraie clé.
```

---

## Version 5.42

```text
AMI DES MOTS — VERSION 5.42
Rire et apprendre en même temps, battles entre potes, salon en ligne, coin admin

POUR RIRE (Coin anglais → 😂 Pour rire)
- 🦉 Ami se trompe exprès : il dit une bêtise en anglais, à toi de le corriger (il se vexe, il boude…).
- 👂 Les oreilles d'Ami : 14 paires qui se ressemblent (ship/sheep, beach/…), avec la vanne qui va avec.
- ✅ Vrai ou faux rigolo : 20 affirmations, réponse et explication en français.
- 🎄 Calendrier de l'Avent : 24 cases (une par jour en décembre), mot + phrase + vanne, +2 plumes.
- 📺 Bêtisier : l'émission de tes plus belles confusions de la semaine.
- 🏠 Maison d'Ami : on achète des objets avec ses plumes en apprenant leur nom anglais.
- Ami a de nouvelles têtes : vexé, mort de rire, choqué, fier, boudeur, malin, endormi.

BATTLES
- 🎧 Rap battle (scène, beat boom-bap, foule, applaudimètre) : Ami rappe, tu complètes tes rimes.
  Paroles 100 % originales ; les vannes visent Ami, jamais une personne.
- 🏆 Tournoi en famille. 🔗 Défi entre potes : un lien, les mêmes questions, on compare.
- 🚀 Salon en ligne (Supabase Realtime) : salons privés (code) et publics, réactions, chat privé si un parent
  l'autorise, filtre, muet. À brancher : voir SALON-EN-LIGNE.md.

AMI APPREND (le juge des vannes)
- Chaque vanne a un score familial (😂 +2, 🙄 -3) : les mauvaises disparaissent, les bonnes reviennent plus.
- Le juge refuse les vannes qui visent une personne ou sa famille (« ta mère… »), la violence, les
  discriminations, les infos personnelles. Les parents ajoutent leurs vannes de famille : le juge dit pourquoi
  il refuse.

VILLAGE 3D
- 🏃 Coach Kim : « Ami says » (Jacques a dit en anglais).
- ☕ Le café (Tom, le serveur) et 🏫 l'école (Mr Brown : « Show me the… ») : on entre vraiment.
- 🏷️ Étiquettes : on passe près d'une chose, son nom anglais s'affiche (touche pour l'entendre).
- 🌦️ Météo (soleil, pluie, neige du 1er décembre au 6 janvier) et 📷 mode photo avec légende anglaise
  (la photo reste sur l'appareil).

MOTS CITY
- 🏷️ Étiquettes anglaises près des lieux, des palmiers et des véhicules (car, taxi, bus, school bus, ambulance).

COIN ADMIN (admin.html)
- Choisir ce qui est gratuit et ce qui est dans Plus : thèmes, jeux, coins, joueurs gratuits, prix.
- Fabrique js/offre.js à remplacer dans le dépôt (voir COIN-ADMIN.md). Ne peut jamais ouvrir Plus.

TESTS
- 94 tests automatiques (npm run verifier).
- Navigateur : village v5.42 (13), salon en direct à deux navigateurs sur faux serveur (9), Mots City (43),
  coin anglais, quêtes, collisions, ruines, Quaternius, accueil 3D, hors ligne : tous OK.

LIMITES
- Salon testé sur un faux serveur, pas encore sur ton vrai Supabase.
- Pages 3D : fermées depuis le jeu, mais une adresse tapée à la main y entre encore.
- Vrai téléphone (fluidité, voix) non testé ici.
```

---

## Version 5.41

```text
AMI DES MOTS — VERSION 5.41
Apprendre plus loin, rire plus fort, un monde plus beau

APPRENTISSAGE (Coin anglais, Français → Anglais)
- 🧭 Mon parcours : 3 niveaux (Premiers pas · Premières phrases · Petites conversations).
  Chaque étape se fait en jouant (mots, pièges, situations, histoires, dictée, répéter, battles).
  Examen de fin de niveau : 8 questions, 6 pour réussir (+10 plumes) ; il ouvre le niveau suivant.
- 🔁 Ma révision du jour : un seul paquet de 6 à 8 questions avec tout ce qui est fragile
  (mots dus, pièges ratés, une réplique de situation, une question d'histoire). Série de jours 🔥.
- 📖 Mini-histoires : 5 histoires originales du village (Ami, Paco, Mina, Captain Finn…),
  une phrase à la fois avec la voix anglaise et la traduction cachée, puis 2 questions.
- 🗣️ Répète après Ami : 20 phrases utiles. On écoute, on s'enregistre, on se réécoute, puis Ami.
  La voix reste sur l'appareil (ni gardée, ni envoyée). Sans micro : « 👍 Bien dit ! ».
- 👪 Espace parents (petit calcul pour entrer) : niveau, mots, pièges, situations, histoires,
  dictées, phrases dites, battles, série de révisions, et « Ce qui coince » (confusions fréquentes).

VANNES
- Elles se souviennent : à la 3e, 5e, 8e fois de la même confusion, Ami le remarque
  (« C'est la 3e fois que « la tortue » se déguise en « le chat »… carnet secret ! 📒 »).
  Pièges : « Encore ce piège ! Il t'aime bien, on dirait. »
- Personnages récurrents : Paco, Mina et Professor Puzzle passent dans les vannes.
- Petit « boing » avant la vanne (si le son est activé et l'humour pas sur « tout doux »).
- Scènes animées : dans les scènes absurdes, le bon mot se transforme en mauvais (désactivé si
  l'appareil demande moins d'animations).
- 😂 La blague anglaise du jour (20 vraies devinettes : mouse, school, two tired…) avec le jeu de
  mots expliqué en français.
- Battle de vannes : contre Ami, EN FAMILLE (équipes 🦊/🐼, 4 manches), ou ✍️ INVENTE TA VANNE
  (3 choix → une phrase anglaise toujours juste : « Ami, you dance like a penguin on ice skates! »).
- 🙄 Pas drôle : la vanne notée ne ressort plus.

GRAPHISME
- Mots City : vraie circulation Quaternius (voitures, taxi, bus, bus scolaire, ambulance),
  chaque véhicule freine et a une zone de collision à sa taille.
- Village : 🏛️ les ruines perdues au sud-est (arches, colonnes, statues, coffre…) avec une
  CHASSE AU TRÉSOR en anglais (« Go through the arch », « Look behind the fox statue »,
  « Find the barrel next to the column », « Go up the stairs », « Open the chest under the flag! »).
  Ajoutée au carnet de quêtes.
- Portails en arches de pierre (même style que les ruines).
- Vie du village : oiseaux, feuilles qui tombent, étincelles quand on trouve une plume.
- Qualité automatique : si le téléphone peine (< 25 images/s), on allège (résolution, ombres,
  feuilles, oiseaux) et on s'en souvient.

Packs Quaternius (CC0) : voitures, transports, ruines. Crédits : assets/3d/CREDITS.md.
Tests : 81 (npm test) + Chrome : Mots City, habitants, collisions, quêtes, coin anglais,
ruines et véhicules (14), accueil 3D, jambes, Paco, hors ligne.
```

---

## Version 5.40

```text
AMI DES MOTS — VERSION 5.40
Le coin anglais : parler pour de vrai, en rigolant

Sur l'accueil (Français → Anglais) : un bouton 🇬🇧 Le coin anglais, avec 4 activités.

🪤 Les pièges (v5.39) — 28 erreurs typiques des francophones, une vanne par erreur, révision espacée.

🎤 Battle de vannes (nouveau)
- Ami se vante en anglais (« I’m the king of this village! ») ; on choisit LA réplique juste et drôle
  (« The king? You can’t even find your own feathers! »).
- Les mauvaises répliques sont soit fausses (« can’t even to find » : la vanne explique la règle),
  soit hors sujet (« I like cheese »). Point seulement du premier coup. 3 manches, 9 répliques.
- Ami encaisse avec humour (« Ouch! Good one! »). Les vannes visent Ami, jamais l'enfant.
- Bouton 🇫🇷 Traduire (caché par défaut, pour pousser à comprendre en anglais).

☕ Situations de la vie (nouveau)
- 5 scènes : Au café, Un nouveau copain, Au magasin, Demander son chemin, Dîner chez un ami.
- On écoute la personne (voix anglaise), on choisit sa réplique ; une étape de compréhension
  (« Go straight on, then turn left » : qu’est-ce qu’elle t’a dit ?).
- Erreur = vanne (« I am two pounds » : tu pèses deux livres ? Léger comme une plume !) et on réessaie.

✍️ Dictée rigolote (nouveau)
- Ami dit une phrase (🔊 normal ou 🐢 lentement), on l'écrit, on vérifie.
- Correction tolérante : majuscules, ponctuation, apostrophes, contractions (where's = where is).
- Les mots faux sont soulignés ; vanne spéciale pour les mots jumeaux (see/sea, sun/son, two/too,
  ate/eight…) qui explique les deux sens. 14 phrases, 5 par dictée.

Village 3D
- Nouveau portail 🇬🇧 « Le coin anglais » (au nord, entre « Apprendre 5 mots » et « Atelier des phrases »).
- Professor Puzzle (anneau orange, au nord-ouest) tend des pièges de l'anglais, avec série de réussites.

Progression (situations réussies, victoires, dictées parfaites) gardée et vérifiée à la restauration.
Tests : 76 (npm test) + Chrome : coin anglais (7), collisions (9), quêtes (9), habitants (14),
accueil 3D, jambes, Paco, hors ligne.
```

---

## Version 5.39

```text
AMI DES MOTS — VERSION 5.39
Des vannes qui racontent quelque chose, et les pièges de l'anglais

Vannes : les scènes absurdes
- Quand on confond deux mots, Ami peut maintenant raconter ce qui arrive avec le MAUVAIS mot :
  « Tu voulais caresser le chat… et tu caresses la tortue ! Surprise au bout des doigts. »
  « Tu commandes le fromage au restaurant… et le serveur t’apporte la fourchette sur un plateau ! »
- Si on apprend l'anglais, la vanne se termine par la bonne phrase anglaise :
  🇬🇧 « I want to pet the cat. » — on rit ET on apprend une phrase utile.
- 2 à 3 scènes par thème (animaux, manger, maison, habits, nature, ville, musique, atelier),
  en français et en anglais, articles et contractions justes (du, de la, de l’).
- Pas de scènes en Lecture facile (phrases trop longues) ; jamais deux fois la même de suite.

Nouveau : 🪤 Les pièges de l'anglais (français → anglais)
- 28 erreurs typiques des francophones : « I have 10 years », « I am agree », « a car red »,
  « two mouses », « I'm eating pain », « library » pour librairie, « actually » pour actuellement…
- 5 familles : Être, avoir ou faire ? · L'ordre des mots · Les petits mots · Les pluriels rebelles ·
  Les faux amis.
- Chaque mauvaise réponse a SA vanne, qui montre ce qu'un anglophone comprendrait
  (« I call myself Léa » : on dirait que tu te téléphones à toi-même ! 📞), puis la bonne phrase
  dite à voix haute et la règle en une ligne.
- Révision espacée : un piège raté revient dès la séance suivante ; un piège réussi revient
  après 1, 3, 7 puis 21 jours. Score « Pièges déjoués x/28 ». +2 plumes par piège évité.
- Progression gardée dans la sauvegarde (et vérifiée à la restauration).

Tests : 73 (npm test), dont scènes absurdes, contenu des pièges, révision espacée, écran complet.
```

---

## Version 5.38

```text
AMI DES MOTS — VERSION 5.38
Des quêtes avec un vrai but, et on ne traverse plus les murs

Collisions (village 3D)
- On ne traverse plus les bâtiments, la fontaine, les arbres, les bancs, les lampadaires,
  le tableau, les piliers des portails, les habitants, les animaux ni les voitures.
- Les voitures s'arrêtent quand Ami est devant elles, puis repartent quand la voie est libre.
- (Mots City avait déjà ses collisions : murs, voitures, véhicules.)

Quête « Les plumes perdues d'Ami » (le but des plumes)
- Le vent a emporté 10 plumes d'Ami : sans elles, il ne peut plus voler.
- Les plumes sont maintenant petites, près du sol, cachées (derrière l'école, sous le grand arbre,
  dans les hautes herbes…) et ne sont plus affichées sur la carte.
- Pour savoir où chercher : réussir le défi d'un habitant à l'anneau bleu (ou de Paco et Mina).
  Il donne un INDICE EN ANGLAIS (« Look under the big tree », « It's between the lamp and the bench »)
  avec la traduction : on pratique behind, under, next to, in front of, on, between…
- Ami prévient quand une plume dont on a l'indice est tout près.
- Récompense des 10 plumes : Ami revole (saut géant + vol plané en gardant Espace ou ⤒).

Carnet de quêtes (📖 Quêtes)
- 4 quêtes, chacune avec son but, sa progression et sa récompense : Aide tes voisins,
  Les plumes perdues d'Ami (avec la liste des indices, 🔊 pour les réécouter), Hello, village!,
  Paco et Mina.
- Les défis déjà réussis avant cette version donnent leur indice automatiquement.

Corrigé
- Le saut ne montait presque pas (le balancement de la marche écrasait la hauteur) ;
  il est maintenant identique sur tous les appareils.
- Bouton ⤒ (sauter) sur écran tactile.

Tests : 69 (npm test) + collisions du village (9) + quêtes (9) dans Chrome
(outils/tests-navigateur/test-collisions-village.js, test-quetes.js).
```

---

## Version 5.37

```text
AMI DES MOTS — VERSION 5.37
Les vrais habitants et la vraie nature (packs Quaternius, CC0)

Village 3D
- Les 4 amis (Léa, Max, Zoé, Milo le chef) ont de nouveaux personnages animés.
- 8 nouveaux habitants qui parlent anglais : Mrs Taylor (teacher), Doctor Lee (doctor),
  Farmer Joe (farmer), Bob (builder), Granny Rose (grandmother), Captain Finn (pirate),
  Wizard Pip (wizard) et Daisy (une amie déguisée en vache).
  On s'approche, E : il se présente en anglais (voix anglaise), avec la traduction française,
  puis propose un petit défi (« Comment dit-on trésor en anglais ? »). Erreur = vanne gentille
  qui cite les deux mots ; réussite = l'habitant fait un geste de joie. Progression gardée (x/8).
- Une vraie forêt autour du quartier (bouleaux, chênes, saules, sapins), des fleurs, herbes,
  buissons et rochers sur les pelouses. Rien ne bloque les chemins ni les portails.

Mots City
- Une foule variée sur les trottoirs (chefs, médecins, ouvriers, mamies, cow-boys…).
- 4 nouvelles tenues : Pirate, Cheffe, Sorcière, Vache rigolote (8 au total).
- Vrais palmiers et arbres ; certains pâtés deviennent de petits parcs fleuris.

Technique
- Modèles compressés (meshopt) : 28 habitants = 3,2 Mo, nature = 0,9 Mo, en cache hors ligne.
- Animations de combat retirées (jeu familial). Une seule copie des animations.
- Scripts : outils/preparer-quaternius.mjs, outils/preparer-nature.mjs. Crédits : assets/3d/CREDITS.md.
- Si un modèle manque, le jeu reprend les personnages KayKit ou le décor dessiné.

Tests : 68 (npm test) + Mots City dans Chrome (40 vérifications) +
habitants/nature (14 vérifications : outils/tests-navigateur/test-quaternius.js).
```

---

## Version 5.36

```text
AMI DES MOTS — VERSION 5.36
L'accueil devient le village 3D

- En ouvrant le site, on arrive dans le village 3D (automatique sur les appareils capables).
  Restent en version classique (2D) : mode Lecture facile, « réduire les animations »,
  appareil sans 3D, ou quand on a choisi « 🏠 Version classique ».
- 14 portails dans le village : les 8 lieux (forêt des animaux, marché gourmand, maison bavarde,
  jardin, place du village, scène, boutique des costumes, laboratoire), Défi du jour,
  Apprendre 5 mots, Atelier des phrases, À revoir, Mon carnet, Mots City.
  On s'approche, on appuie sur E (ou le bouton) : « Entrer ». Les portails sont sur la carte.
- Les jeux restent ceux de l'application (rien n'est perdu). Leur bouton Accueil / retour
  ramène dans le village 3D.
- Accueil classique : bouton « 🌍 Jouer dans le village 3D » pour y revenir (et retenir ce choix).
- Les lieux réservés à Plus restent protégés par l'application (écran Plus).
- Liens directs : index.html?aller=lieu:animaux, defi, lecon, phrases, revoir, carnet,
  reglages, classique.

Tests : 65 (npm test) + parcours accueil 3D dans Chrome (8 vérifications :
outils/tests-navigateur/test-accueil3d.js).
```

---

## Version 5.35

```text
AMI DES MOTS — VERSION 5.35
« Tu peux faire mieux ? » — le village 3D refait, Mots City plus réaliste

Monde 3D (le village)
- Immeubles KayKit détaillés (façades, auvents, châteaux d'eau) ; les enseignes LE MARCHÉ,
  ÉCOLE, MAISON, CAFÉ sont conservées.
- Léa, Max, Zoé et Milo sont de vrais personnages animés (squelette : marche, repos).
- Voitures KayKit aux roues qui tournent, lampadaires, bancs.
- Ciel réaliste, reflets dosés, lueur des lampes la nuit, sols texturés.
- Ami (le joueur), Paco, Mina, missions, plumes, carte : inchangés.
- Corrigé : l'icône d'onglet manquante (erreur 404).

Mots City
- Tours de verre qui reflètent le ciel (ligne d'horizon), antennes lumineuses, fenêtres
  allumées la nuit.
- Ciel plus bleu, route plus claire, lueur réservée aux vraies lumières (plus de voile blanc).

Commun (js/kit3d.js)
- Seuil de lueur au-dessus de 1 : seuls néons, lampes et phares brillent.
- Reflets du ciel dosés matériau par matériau.

Tests : 65 (npm test) + 40 vérifications Chrome (Mots City) + village (jambes, habitants
animés, défi de Paco) + démarrage hors connexion.
```

---

## Version 5.34

```text
AMI DES MOTS — VERSION 5.34
Graphismes : vrais modèles 3D animés, ciel réaliste, lueurs ; fenêtres décalées corrigées

Corrigé : fenêtres « en décalé »
- Une règle CSS (perspective sur <body>) faisait de toute la page le repère des fenêtres fixes :
  après défilement, la fenêtre « Comment la bouche fait ce mot » (et les bulles) s'ouvraient
  décalées, coupées en haut. Défaut présent depuis la v5.30. Test ajouté pour qu'il ne revienne pas.

Mots City — graphismes
- Personnages : vrais modèles 3D avec squelette et animations (repos, marche, course, saut,
  assis en véhicule, joie, ramasser, esquive) — KayKit Adventurers, CC0. 4 personnages au choix.
  Armes et animations de combat retirées des fichiers.
- Ville : immeubles détaillés KayKit (façades, auvents, châteaux d'eau), lampadaires, bancs,
  buissons, bouches d'incendie ; voitures KayKit (taxi, berline, break) avec roues qui tournent.
  Tours art déco conservées pour la ligne d'horizon.
- Ciel physique (soleil, dégradé réaliste), reflets du ciel sur les surfaces, étoiles la nuit,
  lueur des néons et lampadaires (bloom), mer avec vaguelettes scintillantes, sols texturés.
- Téléphone → « Graphismes » : Haute qualité (ordinateur) ou Rapide (téléphone modeste).
- Performances : tout le décor fixe fusionné en 1 à 2 objets ; 9 passants sur téléphone.
- Si les modèles ne se chargent pas, le jeu garde son décor dessiné par le code.

Tests : npm test + 40 vérifications dans Chrome (outils/tests-navigateur/test-city.js).
```

---

## Version 5.33

```text
AMI DES MOTS — VERSION 5.33
Mots City devient un vrai monde ouvert (original, familial)

Monde 3D (monde-3d.html)
- Corrigé : Ami, le personnage du joueur, avait des pattes collées au corps et glissait.
  Ses pattes sont maintenant articulées à la hanche, se balancent en opposition (±34°)
  au rythme de la vitesse, et reviennent droites à l'arrêt.

Mots City (mots-city.html)
- Héros à pied, articulé (hanches, genoux, épaules, coudes) : marche, course (Maj ou 🏃),
  saut (Espace ou ⤒), pose assise en véhicule. Animation procédurale (pas de squelette importé).
- Monter / descendre (E ou 🚪) : 2 scooters et 3 cabriolets à emprunter. Pas de vol de voiture,
  pas de violence : la circulation et les passants ne sont jamais attaqués.
- Ville côtière au coucher du soleil : immeubles pastel art déco, néons, palmiers, plage,
  promenade, ponton avec grande roue, voilier, océan animé.
- Cycle jour/nuit (une journée = 6 min) : ciel, soleil, fenêtres et néons qui s'allument,
  lampadaires, phares la nuit. Heure affichée sous le plan.
- Radios dans les véhicules (R) : musique composée par le jeu en direct (synthwave, pop),
  et une radio parlée d'expressions anglaises. Aucun fichier, aucune musique protégée.
- 20 plumes dorées cachées : chacune apprend un mot anglais (image + voix + sens).
- Écran titre, 4 tenues au choix (sauvegardées), caméra que l'on peut tourner en glissant.
- Missions : livraison (à pied ou en véhicule), taxi (il faut un véhicule ; le passager monte
  à bord), chasse aux lettres. Les vannes citent toujours l'erreur commise.
- Performances : palmiers, lampadaires et halos instanciés ; pas d'ombres sur téléphone.

Tests : 64 réussis (npm test) + 40 vérifications dans Chrome (outils/tests-navigateur/test-city.js)
+ jambes du monde 3D + démarrage hors connexion.
```

---

## Version 5.32

```text
AMI DES MOTS — VERSION 5.32
Toutes les idées de vannes + Mots City

1. Genre des mots (js/genres.js, À FAIRE VALIDER) : « la tortue s'est déguisée », « l'abeille », « le hibou ».
   Nouvelles vannes accordées en français (jamais « de le » / « à le »).
2. « À toi ! » : une vanne après l'enregistrement. Elle ne juge pas la prononciation (rien n'est analysé).
3. Ami réagit à sa vanne (🙈 👓 🪶 💥 selon le niveau). Rien si « réduire les animations » ou Lecture facile.
4. Familles de confusions (js/confusions.js, 36 paires) : « 💡 Cat fait miaou, dog fait wouf. »
   Seulement quand on apprend l'anglais.
5. Carnet des fous rires : « 😂 Je la garde » après une erreur ; Carnet → Mes fous rires (réécouter, retirer).
6. Lecture facile : Ami reste « Tout doux » avec des vannes courtes ; les Réglages l'indiquent.
7. Autres langues : PAS de traduction automatique des vannes (à écrire et relire par des locuteurs).
   L'interface espagnole, arabe… garde les blagues douces déjà traduites.
8. Monde 3D : Paco et Mina ont un « Défi anglais » rejouable, avec des vannes qui citent l'erreur.
   Le monde 3D charge three.js en local (vendor/) : il marche hors connexion.

NOUVEAU JEU : MOTS CITY (mots-city.html) — l'anglais en rigolant, en ville ouverte
- Jeu original, familial, sans violence : Ami le hibou en scooter dans une ville 3D.
- Livraison express : le client commande en anglais, on passe sous le bon étal du marché.
- Taxi des mots : le passager dit où aller en anglais ; on retrouve le lieu sur le plan.
- Chasse aux lettres : attraper les lettres du mot anglais dans l'ordre.
- Radio Plume FM (vraies expressions anglaises + sens), klaxon, passants qui parlent anglais,
  tremplins, « niveau de rigolade » en étoiles, plan de la ville, flèche GPS.
- Chaque erreur = une vanne qui cite ce qu'on a choisi ET ce qui était demandé, puis la correction.
- Commandes : flèches / ZQSD / WASD, boutons tactiles ; gauche = gauche à l'écran (testé).
- Caméra qui ne traverse pas les immeubles ; collisions ; passants aux jambes animées.
- Voix anglaises : voix de synthèse de l'appareil (bouton Lentement).
- Sauvegarde locale validée (plumes, missions, mots appris) ; fonctionne hors connexion.

Corrigé au passage : sur téléphone (≤ 560 px), la bulle de vanne sortait à gauche de l'écran
(défaut déjà présent en 5.30.1).

Tests : 64 réussis (npm test) + 29 vérifications dans Chrome (outils/tests-navigateur) + hors ligne.
```

---

## Version 5.31

```text
AMI DES MOTS — VERSION 5.31
Les vannes d'Ami, réécrites

Les vannes parlent de l'erreur réellement commise :
- Nouveau fichier js/vannes.js : 592 vannes, en français et en anglais, sur 4 niveaux
  (Tout doux, Taquin, Piquant, Corsé). Chacune cite le mot choisi et le mot attendu.
- Ami se moque de lui-même, des mots ou de la situation, jamais du joueur
  (comme le promet l'écran Réglages). Plus de marque (Pokémon, IKEA…), plus d'accord cassé (« Un « tortue » »).
- Une vanne adaptée à chaque jeu :
  · écoute : Ami accuse sa propre voix (« J'ai dit "tortue", le vent a traduit "loutre" ») ;
  · vrai ou faux : la vanne parle de l'étiquette affichée (avant : « tu confonds « 0 » et « crabe » ») ;
  · première lettre / lettre manquante : la vanne montre le mot fabriqué par la lettre choisie (« slamant ») ;
  · lettres en vrac : la vanne montre l'ordre essayé ;
  · l'intrus, le bon panier, relier : la vanne cite l'image et le panier choisis.
- Vannes « malignes » quand la confusion s'y prête : même première lettre, mots qui riment,
  mot raté une 2e fois dans la partie, belle série (3 ou plus) qui s'arrête.
- Jamais deux fois la même vanne de suite.
- Interface dans une autre langue (espagnol, arabe…) : les blagues douces de cette langue et
  « C'était » traduit, au lieu de vannes en français.
- Correction du panier dans la langue des blagues (avant : « The correct answer was: Animaux »).
- La vanne est lue par la voix du téléphone : on ne demande plus au serveur des voix un MP3
  qui n'existe pas (ce qui faisait attendre ~2 s avant de parler).

Tests : 54 réussis, 0 échec (9 nouveaux tests sur les vannes).
```

---

## Version 5.30

```text
AMI DES MOTS — VERSION 5.30
Le quartier vivant : édition aventure

Nouveautés conservées de la v5.25 :
- Voitures animées, oiseaux en vol, papillons, lucioles, soleil/lune/étoiles.
- Quatre ambiances : journée, crépuscule, nuit magique et averse avec pluie.
- Habitants qui se promènent et animations 3D.

Nouvelles activités :
- Paco le chien et Mina la chatte : deux compagnons 3D animés, avec promenades, oreilles, pattes et queues mobiles.
- Deux mini-missions de vocabulaire autour des animaux, avec réponses et retours humoristiques liés à l'erreur.
- Atelier des mots : un tableau dans le quartier propose un défi de grammaire, puis un défi bonus.
- Interactions accessibles avec la touche E et le bouton à l'écran.
- Progression des missions bonus sauvegardée localement.

Le jeu conserve son univers graphique original et ses exercices existants.

Correctif 5.30.1 : le test des langues vérifie que français/anglais sont seuls affichés, tout en contrôlant que les traductions coréennes, arabes et kabyles restent présentes dans les données.

Correctif 5.30.2 :
- Tests remis à jour après le masquage des langues : un joueur francophone apprend l'anglais par défaut ; un ancien choix masqué (ex. espagnol) est conservé dans « cibleMasquee ».
- Test du flux d'erreur aligné sur le comportement actuel : correction affichée, choix bloqués, puis « J'ai compris — continuer ».
- Blagues : rétablit la règle « jamais deux fois la même vanne de suite » (la variable existait mais n'était plus utilisée).
- Service worker régénéré (npm run sw). Résultat : 45 tests réussis, 0 échec.
```

---

## Version 5.25

```text
AMI DES MOTS — VERSION 5.25
Le quartier prend vie

Nouveautés :
- Circulation douce : trois petites voitures animées parcourent la rue.
- Oiseaux en vol avec battements d'ailes.
- Papillons qui butinent au-dessus des massifs, avec ailes animées.
- Lucioles scintillantes dans l'ambiance nocturne.
- Soleil, lune et ciel étoilé selon l'ambiance choisie.
- Nouvelle ambiance Averse : pluie animée, ciel couvert et éclairage adapté.
- Les quatre habitants continuent leurs promenades articulées et leurs interactions pédagogiques.
- Les commandes et la progression de la version précédente sont conservées.

Le jeu conserve son identité visuelle originale ; il ne reproduit pas les assets ou personnages d'une autre franchise.
```

---

## Version 5.24

```text
AMI DES MOTS — VERSION 5.24
Le quartier vivant : habitants animés

Nouveautés :
- Les quatre habitants se déplacent maintenant seuls sur des petites promenades autour de leur lieu de vie.
- Personnages articulés : bras et jambes bougent pendant la marche, le corps accompagne le pas.
- Les habitants s'arrêtent brièvement, repartent et se tournent dans le sens de leur déplacement.
- Les personnages s'immobilisent pendant une conversation.
- Les interactions restent possibles en s'approchant des habitants en mouvement.
- Commandes fléchées corrigées et relatives à l'écran : haut avance, bas recule, droite va à droite, gauche va à gauche.
- Caméra et rendu améliorés : ombres plus fines, exposition retravaillée, caméra plus cinématographique.
```

---

## Version 5.23

```text
AMI DES MOTS — VERSION 5.23
Commandes corrigées et quartier 3D enrichi

Commandes :
- Haut : avancer à l'écran.
- Bas : reculer à l'écran.
- Droite : aller à droite à l'écran.
- Gauche : aller à gauche à l'écran.
- La direction droite/gauche est calculée dans l'axe réel de la caméra, même après rotation.
- Les touches fléchées et ZQSD/WASD utilisent le même repère.

Améliorations visuelles :
- Toits à deux pans, façades détaillées, fenêtres encadrées, volets, portes et auvents.
- Place pavée, bordures, passage piéton et mobilier urbain.
- Arbres plus détaillés et légèrement animés.
- Ombres améliorées et caméra plus cinématographique.

Le jeu reste un univers 3D original d'Ami des Mots, avec sa propre identité graphique.
```

---

## Version 5.22

```text
AMI DES MOTS — VERSION 5.22
Le quartier vivant — aventure 3D enrichie

Nouveautés :
- Quatrième personnage interactif : Milo, au café.
- Quatre missions liées avec progression sauvegardée.
- Dix plumes cachées et sauvegarde des objets collectés.
- Mini-carte du quartier.
- Ambiances jour, crépuscule et nuit avec éclairage des lampadaires.
- Nuages animés, jardinières et détails supplémentaires.
- Course, saut, zoom et rotation de caméra tactile.
- Carnet avec bouton de remise à zéro pour faciliter les tests.

Pour tester : décompresser, publier le contenu sur GitHub Pages comme précédemment,
puis ouvrir le jeu et choisir « Explorer le monde 3D ».
Le monde 3D utilise Three.js depuis jsDelivr et demande une connexion Internet.
```
