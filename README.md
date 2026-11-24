# Ami des mots

Un jeu pour apprendre et réviser des mots en images, dans 16 langues, avec
Plumo le hibou. Produit **séparé** de reparole.fr : mêmes images, mêmes mots,
même hibou, mais un jeu grand public, pas un outil de soin. reparole.fr
n'est pas modifié.

## Ce que contient le jeu

- **8 thèmes** : animaux, à table, la maison, habits, nature, en ville,
  musique et fête, atelier et sciences — 122 images.
- **50 jeux** (v3) : 19 sortes de jeux, chacune en Facile / Normal /
  Expert (3, 4 ou 6 choix ; plus ou moins de questions, de paires…),
  rangées en 6 familles :
  - *Images* : Découvrir, Quel mot ?, Vrai ou faux ?, Ombres (silhouette),
    Image floue (l'image devient nette), L'intrus, Le bon panier ;
  - *Écoute* : Écoute et trouve (image), Écoute et lis (mot écrit) ;
  - *Traduction* : un mot dans ma langue → le trouver dans la langue
    apprise (ex. français → anglais, ou → kabyle), et le sens inverse ;
  - *Lettres* : Première lettre, Lettre manquante, Lettres en vrac ;
  - *Mémoire et paires* : Mémoire image ↔ mot, Mémoire des traductions,
    Relier ;
  - *Défis* : Contre la montre (60 s), Grand quiz (15 questions mêlées).
  Toujours les mots et images de ReParole (la vie de tous les jours). Un
  jeu n'apparaît que s'il a du sens : pas de traduction quand on apprend
  sa propre langue, pas de jeux de lettres en japonais et coréen.
- **v2** : plusieurs joueurs sur un appareil (« Qui joue ? », chacun son
  hibou, sa couleur, ses plumes) ; **révision espacée** (un mot manqué
  revient le jour même, un mot su revient dans 1, 3, 7 puis 16 jours) ;
  **défi du jour** (8 mots mélangés, le même toute la journée, plumes
  doublées) ; **carnet** des mots rencontrés (🔊, traduction, maîtrise) ;
  **7 trophées** ; bruitages (coupables dans Réglages).
- **Deux langues** : celle du joueur (interface : 11 langues) et celle
  qu'il apprend (16, dont darija algérienne, marocaine, tunisienne et
  kabyle). Exemple visé : une famille en France qui veut transmettre le
  kabyle ou la darija à ses enfants.
- **Récompenses** : étoiles par jeu, plumes, série de jours, objectif du
  jour ; les plumes habillent Plumo (écharpe, lunettes, nœud papillon,
  chapeau, couronne).
- **Lecture facile** (v3.2, pensée pour les personnes dys) : un réglage par
  joueur, dans Réglages. Police Andika (lettres bien distinctes, « a »
  manuscrit), plus d'espace entre lettres, mots et lignes, consignes lues à
  voix haute (bouton 🔊 sur chaque jeu, lecture automatique au début),
  3 choix au plus, 4 paires au plus, jamais de temps limité (Contre la
  montre devient 12 questions sans chrono, l'image floue se dévoile plus
  lentement), moins d'animations. Pas de police « spéciale dyslexie » :
  les études ne leur trouvent pas de bénéfice, l'espacement compte
  davantage. **Communication** : dire « accessible aux personnes dys »,
  jamais « soigne » ni « rééduque » la dyslexie.
- Plumo **articule** quand il parle (module de ReParole recopié).
- **Hors connexion** après la première visite (sauf les voix enregistrées).

## Graphisme (v4, « Nuit des mots »)

Tout le jeu vit la nuit : une aurore qui dérive lentement, des panneaux
de verre dépoli, des images posées sur des « autocollants » blancs qui
brillent, des boutons en relief. Accueil : paysage vivant (aurore,
collines, lucioles, étoile filante), Plumo perché sur sa branche devant la
lune, qui cligne des yeux et suit le doigt du regard. En jeu : étincelles
sur une bonne réponse, série « 🔥 ×3 », petite vibration sur Android.
Victoire : rayons de lumière, étoiles, plumes qui défilent, confettis.
Tout ce mouvement s'arrête en Lecture facile et si le téléphone demande de
réduire les animations. Couleurs : variables au début de `css/jeu.css`.
Polices : Nunito et Andika (licence OFL, dans `fonts/`).

## Voix : le jeu réutilise celles de ReParole

ReParole nomme chaque fichier son d'après le texte exact prononcé
(`audio/<langue>/<fnv1a(texte)>.mp3`). Les banques écrivent les mots en
majuscules (« POISSON ») mais ReParole les prononce en minuscules
(« poisson ») : `js/voix.js` donne, pour chaque mot et chaque langue,
l'écriture exacte enregistrée par ReParole (1630 / 1630 trouvées).
À relancer quand les mots changent : `node outils/voix-reparole.js <dossier ReParole>`.

**Tant que les voix ne sont pas générées et publiées sur reparole.fr**, le jeu
utilise la voix du téléphone (« voix robot »). Pour les vraies voix : dans
ReParole, facturation Google activée, `node scripts/voix.js`, puis publier le
dossier `audio/`. Vérification : https://reparole.fr/audio/fr/1u7v83w.mp3 (« poisson ») doit
jouer un son. `outils/mots-sans-voix.json` liste les mots que ReParole n'a pas
du tout (vide aujourd'hui).

## Apprendre avant de jouer (v4.4)

- Un mot jamais vu est **présenté** avant d'être demandé : « Nouveau mot ! »
  (image, mot, traduction, voix), puis la question. « Je le connais déjà »
  passe la présentation. Réglage : `PRESENTER_NOUVEAUX` dans `CONFIG`.
- **Apprendre 5 mots** (accueil) : 5 mots nouveaux d'un même thème, présentés
  puis demandés 2 fois chacun (écoute, quel mot, vrai ou faux, traduction),
  les réponses proposées étant prises parmi ces mots. Fin : les 5 mots avec
  leur traduction, à réécouter.
- En vrai ou faux, le mot affiché est aussi prononcé ; après chaque réponse,
  la traduction s'affiche.

## S'amuser et parler (v5)

- **Blagues de Plumo** quand on se trompe : 12 par langue, toujours sur Plumo ou
  sur le mot, **jamais sur la personne** (testé : aucun mot qui juge).
- **Prononciation** : 🐢 écouter lentement (voix ralentie sans changer la
  hauteur) ; 👄 voir la bouche (le schéma de profil de ReParole, animé avec
  la voix) ; 🎤 **« À toi ! »** : on écoute Plumo, on s'enregistre 3 secondes,
  on entend sa voix puis celle de Plumo pour comparer. L'enregistrement reste
  dans la mémoire du navigateur et disparaît à la fermeture : rien n'est
  envoyé ni gardé. Sans micro : « Je l'ai dit ! ». 1 plume la première fois
  pour chaque mot.
- **Mot du jour** et **astuce du jour** sur l'accueil ; page **Astuces** :
  8 conseils pour réussir à parler une autre langue (un peu chaque jour,
  parler à voix haute, répéter comme un écho, oser se tromper, étiquettes,
  en famille, chansons, réviser au bon moment).

## PC : plein écran (v5)

Au-delà de 1100 px : accueil en deux moitiés (le ciel de Plumo à gauche sur
toute la hauteur, le tableau de bord à droite), grandes cartes de thèmes,
parties sur toute la page avec une image grande à gauche.

## Ordinateur et tablette (v4.4)

Au-delà de 900 px de large : question à gauche, réponses à droite (tout tient
sans défiler), thèmes sur 4 colonnes, jeux sur 2 colonnes, accueil agrandi.

## Ce qu'il ne fait PAS — volontairement

- **Aucune promesse de santé.** C'est ce qui le distingue d'un dispositif
  médical. Ne jamais écrire « rééducation », « mémoire », « prévient »,
  « muscle le cerveau » dans le jeu, sa fiche de boutique ou sa publicité.
  Le texte « À propos » le dit au joueur.
- Pas de compte, pas de publicité, pas de mesure d'audience : la
  progression reste dans le navigateur (une seule clé, `amidesmots:v2` ;
  la v1 est reprise automatiquement). Seul envoi : le **code d'abonnement
  anonyme** (`AMI-XXXX-XXXX-XXXX`), une fois par jour, pour savoir si
  l'abonnement est actif. Ni nom, ni progrès, ni adresse.

## Les voix

1. Le fichier enregistré de ReParole pour le même mot (même texte →
   même nom de fichier), lu depuis `https://reparole.fr/audio/` ;
2. sinon la voix du téléphone, seulement si elle parle cette langue ;
3. sinon « Pas encore de voix pour ce mot » — jamais une voix étrangère.

Les voix de la darija viennent d'Azure (si `node scripts/voix.js` a été
lancé dans ReParole) ; le kabyle n'a que les enregistrements humains.
Pour héberger les voix ailleurs : changer `AUDIO_BASE` dans `js/jeu.js`
**et** `media-src` dans `index.html`.

## Phase de lancement : tout l’univers est gratuit

**Décision produit actuelle : aucun abonnement ni contenu payant n'est activé.**
Tous les thèmes, jeux, mondes, activités, maths, sciences et les six profils
familiaux sont ouverts sans paiement. Les anciens mécanismes Ami des mots Plus
et Stripe sont conservés dans le dépôt pour une éventuelle réactivation future,
mais ils ne doivent pas limiter l'expérience pendant cette phase.

Les réglages de lancement sont `MODE_PAYANT:false` dans `js/jeu.js`,
`js/offre.js` et `js/config-site.js`, avec six joueurs et les listes complètes
de thèmes et de jeux. Le coin admin démarre lui aussi sur cette offre gratuite.

Les fonctions qui dépendent d'un service externe (par exemple les vannes IA
hébergées ou le salon multijoueur en direct) restent soumises à la disponibilité
de leur serveur ; cela ne doit pas verrouiller les activités locales du jeu.

### Réactiver un jour l'abonnement (ne pas faire pendant la phase gratuite)

Le paiement passe par **Stripe** (carte, Apple Pay, Google Pay ; Stripe
prélève chaque mois et gère la résiliation). Le jeu ne voit jamais une
carte bancaire.

1. **Stripe** (dashboard.stripe.com) : créer le produit « Ami des mots
   Plus », prix récurrent mensuel. Puis *Payment Links* → nouveau lien sur
   ce prix ; *Après paiement* → rediriger vers
   `https://<adresse du jeu>/?abonne=1`. Coller le lien dans
   `LIEN_PAIEMENT`.
2. *Paramètres → Portail client* : l'activer (résilier, changer de carte),
   copier son lien de connexion dans `LIEN_GESTION`.
3. **Supabase** (le projet de ReParole convient, ou un nouveau) : exécuter
   `serveur/ami-abonnements.sql`, puis :
   ```
   supabase functions deploy ami-abonnement --no-verify-jwt
   supabase secrets set STRIPE_SECRET_KEY=sk_live_… STRIPE_WEBHOOK_SECRET=whsec_… AMI_ORIGINE=https://<adresse du jeu>
   ```
   Mettre l'adresse de la fonction
   (`https://<projet>.supabase.co/functions/v1/ami-abonnement`) dans
   `API_ABONNEMENT`.
4. **Clés des certificats** : `npm run cles` (ou `node outils/generer-cles.js`).
   La clé privée va dans les secrets Supabase (`AMI_CLE_PRIVEE`), la clé
   publique dans `CLE_PUBLIQUE` (`js/jeu.js`). Sans clé publique, Plus ne
   s'ouvre jamais.
5. Stripe → *Développeurs → Webhooks* : point de terminaison = cette même
   adresse ; événements `checkout.session.completed`,
   `customer.subscription.updated`, `customer.subscription.deleted`.
   Le secret `whsec_…` donné par Stripe va dans `STRIPE_WEBHOOK_SECRET`.
6. Tester en **mode test** de Stripe (carte 4242 4242 4242 4242) avant de
   passer aux clés `live`. Relancer `node outils/construire-sw.js`.

**Sécurité des droits (v4.1)** : l'appareil ne garde aucun drapeau
« abonné ». Il garde un *certificat* `{code, date de fin}` signé par le
serveur (ECDSA P-256) ; le jeu vérifie la signature avec la clé publique à
chaque lancement, même hors connexion. Modifier le stockage du navigateur
ne débloque donc rien (testé). Limite honnête : le jeu étant une page web,
quelqu'un qui réécrit le code JavaScript lui-même pourra toujours tricher ;
c'est le cas de toutes les applis web sans serveur de contenu, et c'est
proportionné à un abonnement de quelques euros.

**Scénarios d'abonnement** (le serveur suit Stripe par webhook) :
- *Renouvellement* : Stripe prolonge la date de fin ; l'appareil reçoit un
  nouveau certificat à sa vérification du jour.
- *Résiliation* : Stripe garde l'abonnement actif jusqu'à la fin de la
  période payée, puis le passe à « terminé ». Dès que le serveur répond
  « inactif », l'appareil efface son certificat (testé).
- *Hors connexion* : le certificat reste valable jusqu'à sa date de fin
  + 3 jours, puis Plus se referme.
- *Plusieurs appareils* : même code (Réglages → noter le code, puis « J'ai
  déjà un abonnement » sur l'autre appareil).
- *Paiement refusé* : Stripe relance pendant quelques jours (statut
  « past_due ») ; le jeu reste ouvert, puis se referme si Stripe abandonne.
Robustesse du serveur (v4.3) : si la base ne peut pas enregistrer un
événement Stripe, la fonction répond 500 et Stripe le renvoie plus tard
(il réessaie pendant 3 jours) ; les événements d'abonnement relisent l'état
actuel chez Stripe, car leur ordre d'arrivée n'est pas garanti ; si la base
est injoignable quand le jeu vérifie un code, la réponse est 503 et
l'appareil garde son certificat (comme hors connexion).

**Recette en mode test Stripe** (carte 4242 4242 4242 4242, toute date future) :
1. Payer → retour sur le jeu avec `?abonne=1` → Plus s'ouvre en quelques secondes.
2. Réglages → noter le code → autre navigateur → « J'ai déjà un abonnement » → Plus s'ouvre.
3. Portail client → résilier → le jeu reste Plus jusqu'à la fin de la période
   (avec une *test clock* Stripe, avancer le temps : Plus se referme).
4. Carte refusée au renouvellement (4000 0000 0000 0341) → « past_due » → le
   jeu reste ouvert, puis se referme quand Stripe abandonne.
5. Dans Stripe → Webhooks : chaque événement doit être en « 200 ». Un « 500 »
   = regarder les journaux de la fonction dans Supabase.

Comment ça marche : chaque appareil tire un code anonyme ; le bouton
« S'abonner » l'envoie à Stripe (`client_reference_id`) ; le webhook
l'enregistre ; le jeu demande chaque jour « ce code est-il actif ? ».
Pour un autre appareil : Réglages → noter le code → sur l'autre appareil,
page Plus → « J'ai déjà un abonnement ». Hors connexion, l'abonnement
reste ouvert 3 jours après la date connue.

### Avant d'encaisser — à vérifier (je ne suis pas juriste ni comptable)

- **Statut** : un SIRET (micro-entreprise suffit pour commencer) ; la
  franchise de TVA tant qu'on reste sous le seuil — à confirmer avec un
  comptable, surtout pour des clients dans d'autres pays de l'UE (Stripe
  Tax peut calculer la TVA).
- **Conditions générales de vente** et mentions légales (éditeur, SIRET,
  hébergeur, Stripe comme prestataire de paiement) sur une page du site.
- **Résiliation en ligne simple** (obligatoire en France pour les
  abonnements) : le portail client Stripe la fait ; le lien est dans
  Réglages.
- **Droit de rétractation de 14 jours** : pour un contenu numérique fourni
  tout de suite, il faut l'accord exprès du client pour y renoncer —
  ajouter une case à cocher sur le lien de paiement Stripe
  (*Conditions d'utilisation*).
- **Google Play / App Store** : un abonnement vendu *dans* une application
  de boutique doit en principe passer par leur système de paiement
  (commission 15 % la première année chez Google). Le paiement Stripe
  convient au **site** ; pour une version boutique, prévoir leur facturation.

## Mettre en ligne (sans toucher à reparole.fr)

1. Créer un **nouveau** dépôt GitHub (ex. `ami-des-mots`), y déposer le
   contenu de ce dossier, activer GitHub Pages.
2. Adresse : celle de GitHub (`…github.io/ami-des-mots`), un sous-domaine
   (`jeu.reparole.fr`, enregistrement CNAME chez votre registraire) ou un
   nom de domaine à lui.
3. C'est installable comme une application (« Ajouter à l'écran
   d'accueil »). Pour Google Play : PWABuilder.com emballe le site.

## Mettre à jour

- Nouveaux mots ou images dans ReParole :
  `node outils/importer-depuis-reparole.js <dossier de ReParole>` puis
  `node outils/construire-sw.js`.
- Toute modification d'un fichier : relancer `node outils/construire-sw.js`
  (sinon les joueurs gardent l'ancienne version hors connexion).
- Tests : `npm install` une fois, puis `npm test` (le résumé final donne le nombre de tests réussis ; aucun nombre n'est écrit ici pour qu'il ne se périme pas). `npm run verifier`
  reconstruit le service worker puis lance les tests.
- **Sauvegarde des progrès** : Réglages → Mes progrès → Sauvegarder (fichier
  `.json`) / Restaurer. Utile car Safari peut vider le stockage d'un site non
  installé après quelques semaines sans visite (une fois installé sur l'écran
  d'accueil, ce n'est plus le cas).

## À relire avant de vendre

- Mots en darija (dz, ma, tn), kabyle et coréen : brouillons repris de
  ReParole, à faire relire par des locuteurs natifs.
- Ukrainien et coréen : 56 images seulement (les autres langues ~120).
- Mentions légales : l'éditeur (David Colucci) et l'hébergeur sont dans
  Réglages → À propos ; ajouter le SIRET et le lien vers les CGV (voir
  « Avant d'encaisser »).

## v5.1 — durcissement avant lancement

- Webhook Stripe : vérification de cohérence client/session, traitement des retries,
  journal des événements et contrôle atomique d'un abonnement actif par code.
- Un second abonnement actif associé au même code est annulé pour éviter les
  renouvellements en double. **L'annulation ne rembourse pas le paiement initial** :
  contrôler la facture dans Stripe et effectuer le remboursement si nécessaire.
- CORS : configurer `AMI_ORIGINES` avec les origines exactes, séparées par des virgules.
- La vérification GET reste publique pour permettre au jeu de fonctionner sans compte :
  configurer une limitation de débit côté passerelle/API ou WAF avant une forte exposition.
  `AMI_ORIGINE` reste accepté pour compatibilité. Le joker `*` est conservé par défaut
  pour les installations anciennes ; le remplacer en production.
- Confidentialité : l'écran « À propos » précise que les demandes audio révèlent
  l'adresse IP, la langue et le mot demandé (URL kabyle lisible, identifiants hachés
  pour les autres langues).

### Déploiement v5.1

1. Exécuter `serveur/ami-abonnements.sql` dans Supabase (le script est réexécutable).
2. Définir `AMI_ORIGINES` avec le ou les domaines exacts du jeu.
3. Vérifier les secrets Stripe, Supabase et `AMI_CLE_PRIVEE`.
4. Redéployer `ami-abonnement` avec `--no-verify-jwt`.
5. Tester en mode Stripe test : paiement, second achat avec le même code,
   renouvellement, paiement échoué/régularisé et résiliation.
6. En cas de doublon annulé, vérifier la facture et rembourser manuellement si elle a
   été encaissée. L'annulation seule ne rembourse pas le paiement initial.

Cette version ne remplace pas un test en environnement Stripe/Supabase réel.


## v5.2 — expérience plus immersive

- Accueil desktop élargi et mieux réparti ; affichage mobile conservé en colonne.
- Relief et animation légère du hibou en CSS, avec prise en compte de `prefers-reduced-motion`.
- Nouvel atelier de construction de phrases (12 phrases courtes en français et en anglais), avec tuiles à remettre en ordre, indice, encouragements et récompenses.
- Pour les autres langues, l'atelier explique clairement que les phrases relues ne sont pas encore disponibles ; les jeux de vocabulaire restent accessibles dans les 16 langues. Les phrases ne sont pas générées automatiquement afin d'éviter des traductions grammaticalement incorrectes.

L'atelier est une première version pédagogique. Les phrases et leur adaptation linguistique doivent être relues par des locuteurs natifs avant extension à d'autres langues.


## v5.3 — Le village de Plumo

- Ajout d'un village interactif qui relie huit lieux aux thèmes existants (animaux, manger, maison, nature, ville, musique, habits, atelier).
- Les lieux affichent les thèmes disponibles dans la langue choisie, respectent les droits Gratuit/Plus et ouvrent les jeux existants sans créer de doublons de contenu.
- Plumo accueille le joueur avec des répliques contextuelles en français et en anglais ; les libellés du village sont localisés pour les 16 langues.
- Les visites du jour sont mémorisées localement par joueur pour visualiser les lieux déjà explorés.
- Correction du dernier écran de l'atelier des phrases afin d'éviter l'accès à une phrase inexistante après la dernière réussite.


## v5.4 — erreurs accompagnées et humour réglable

- Une mauvaise réponse ne fait plus avancer automatiquement la question : l'écran reste en pause jusqu'au bouton « J'ai compris — continuer ».
- Le choix erroné reste marqué en rouge et Plumo affiche une plaisanterie ainsi que la bonne réponse.
- La voix lit maintenant le message complet (blague puis correction) en une seule lecture ; si la voix audio dédiée est indisponible, le navigateur tente sa voix de synthèse habituelle.
- Quatre niveaux d'humour sont réglables dans Paramètres : Tout doux, Taquin, Piquant et Corsé. Les plaisanteries visent Plumo, le mot ou la situation, jamais le joueur.
- Le niveau choisi est conservé par profil de joueur.


## v5.5 — synchronisation de l'articulation

- L'animation de la bouche démarre sur l'événement réel de lecture audio (`playing`), au lieu d'un délai fixe.
- Le minutage de l'animation suit l'horloge réelle du fichier audio, y compris lorsque la lecture est ralentie.
- La langue de l'articulation utilise maintenant la langue en cours d'apprentissage du jeu, et non seulement la langue d'interface.
- La synthèse vocale du navigateur conserve son propre événement de démarrage pour synchroniser l'animation.


## v5.6 — lisibilité du retour après erreur

- La bulle de correction est remontée sur mobile et sur ordinateur.
- Le bouton « J'ai compris — continuer » est placé dans une zone séparée en bas de l'écran, et ne recouvre plus le texte de la blague ou la bonne réponse.
- La bulle dispose d'une hauteur maximale et peut défiler si le message est particulièrement long.
- Taille de texte et hauteur adaptées aux petits écrans.


## v5.7 — choix de la langue des blagues

- Ajout d'un réglage indépendant pour choisir la langue des blagues de Plumo : français ou anglais.
- Le choix est mémorisé par profil, indépendamment de la langue d'interface et de la langue apprise.
- Les quatre niveaux d'humour disposent de répliques en français et en anglais, y compris le niveau « Tout doux ».
- La phrase annonçant la bonne réponse est également traduite dans la langue des blagues pour éviter les commentaires mélangés.
- La lecture vocale du commentaire d'erreur utilise la langue sélectionnée pour les blagues.


## v5.8 — direction artistique et humour enrichi

- Refonte CSS de l'ambiance visuelle : profondeur, contraste, cartes, boutons, panneaux, progression et animations plus cohérentes.
- Ajustements responsive pour donner plus d'espace aux écrans PC tout en conservant des cibles tactiles généreuses sur téléphone.
- États visuels de bonne et mauvaise réponse plus lisibles.
- Bibliothèque de blagues étoffée en français et en anglais pour les quatre niveaux d'humour ; les répliques restent dirigées vers Plumo, les mots ou la situation, jamais vers le joueur.
- Les fonctions, profils, langues, réglages et mécanismes d'abonnement existants sont conservés.


## v5.9 — fiabilisation de la lecture vocale

- Le moteur vocal du navigateur ne reste plus silencieux lorsque la liste des voix Android/iOS n'est pas encore chargée au premier appel.
- La sélection privilégie une voix correspondant à la langue demandée, puis utilise la voix système disponible en dernier recours.
- Le repli vocal est déclenché si le MP3 distant est absent, trop lent ou refusé par le navigateur.
- Les exercices de reconnaissance d'image lisent leur consigne au premier tour, sans prononcer le mot à deviner.


## v5.10 — lancement limité au français et à l'anglais

- Le sélecteur de langue d'apprentissage ne propose provisoirement que Français et English.
- Les autres langues ne sont pas supprimées : leurs libellés, traductions, mots et données restent présents dans l'application.
- Si un profil ou une sauvegarde utilisait une autre langue, le code de cette langue est conservé dans `cibleMasquee` et le profil bascule temporairement vers le français ou l'anglais.
- Cette limitation d'affichage est réversible : les langues masquées pourront être réactivées ultérieurement sans réimporter leurs contenus.


## v5.11 — réécriture des blagues de Plumo

- Réécriture complète des 64 répliques d'erreur (4 niveaux × 8 blagues × 2 langues).
- Les vannes reposent désormais sur des situations compréhensibles : précipitation, confusion, excès de confiance, dictionnaire, révision et petites maladresses de Plumo.
- Suppression des images absurdes ou des références sans rapport avec la situation.
- Les blagues restent auto-dérisoires : elles visent Plumo et ses choix, jamais la personne qui apprend.
- Les quatre niveaux d'humour, le choix français/anglais et la sélection mémorisée par profil sont conservés.


## v5.12 — humour de Plumo en trois formats

- Réécriture du répertoire de répliques en français et en anglais.
- Trois formats sont désormais tirés au sort après une erreur : vanne éclair, petite devinette avec sa chute, et mini-histoire drôle.
- Quatre niveaux d'humour sont conservés, avec 12 propositions par niveau et par langue (4 par format), soit 48 répliques par langue.
- L'humour s'inspire de mécanismes classiques (calembour, double sens, question-réponse, chute absurde) sans reprendre les blagues du PDF fourni.
- Les plaisanteries visent Plumo et ses maladresses, jamais le joueur.


## v5.13 — première évolution visuelle 3D

- Ajout d'une nouvelle mascotte Plumo en rendu 3D, intégrée localement dans `img/ami-3d.webp`.
- La mascotte reçoit des animations CSS selon son humeur : flottement, célébration, surprise et réaction douce.
- Conservation de la mascotte SVG dans les aperçus de costumes afin de ne pas casser le vestiaire existant.
- Refonte visuelle transversale : profondeur, perspective, matières en relief, ombres, lueurs, particules d'ambiance et cartes plus volumétriques.
- Écrans PC élargis et adaptations mobiles conservées ; prise en charge de `prefers-reduced-motion`.
- Les effets sont réalisés en CSS 3D et avec une image 3D intégrée, sans moteur WebGL externe. Ce jalon donne une direction artistique 3D légère ; il ne constitue pas encore un monde 3D interactif rendu par Three.js/WebGL.


## v5.14 — vannes courtes et plus percutantes

- Réécriture des répliques d'erreur en français et en anglais.
- Suppression des mini-histoires longues qui détournaient l'attention de la correction.
- Trois formats conservés mais raccourcis : punchline, devinette express et mini-dialogue.
- Répliques volontairement brèves, centrées sur les maladresses de Plumo et les jeux de mots.
- La bonne réponse reste annoncée séparément après la vanne.


## v5.15 — vannes qui collent à l'erreur

- Les retours des exercices à choix utilisent maintenant le mot choisi à tort ET le mot attendu.
- Répliques personnalisées autour de la confusion réelle : « tu confonds X avec Y », ophtalmo, lunettes, zoo, cuisine ou décoration selon le contexte.
- Quatre intensités de taquinerie, toujours dirigées vers Plumo et jamais contre la personne qui joue.
- Les exercices d'association utilisent les deux mots sélectionnés ; l'atelier de phrases garde une réplique spécifique à la construction de phrase.
- Les langues des blagues restent indépendantes de la langue apprise.


## v5.16 — Plumo lâche les vannes

- Refonte du moteur de répliques contextuelles : 8 univers (animaux, nourriture, maison, vêtements, nature, ville, musique, atelier).
- 4 niveaux d'humour, chacun avec 4 répliques par univers et par langue (français/anglais), soit 256 variantes.
- Chaque vanne reprend explicitement le mot choisi à tort et le mot attendu lorsque le format s'y prête.
- Ton plus mordant, absurde et théâtral : le personnage Plumo est la cible de la plaisanterie, jamais la personne qui apprend.
- Tirage aléatoire pour éviter les répétitions immédiates.


## v5.17 — correction de l'affichage des images de réponse

- Grille des choix illustrés forcée en colonnes flexibles, avec largeur et hauteur minimales explicites.
- Images contraintes à remplir leur carte sans déformation, sur ordinateur comme sur mobile.
- Si un fichier image ne charge pas, un pictogramme emoji de secours apparaît à la place d'une pastille vide.
- Service worker régénéré pour prendre en compte les nouveaux fichiers CSS et JavaScript.


## v5.18 — Plumo Arcade : refonte graphique animée

- Nouvelle direction visuelle arcade/cartoon avec halos colorés, ciel étoilé animé et plateau de jeu lumineux.
- Cartes illustrées plus généreuses, relief renforcé, arrivée échelonnée et réactions au survol.
- Boutons d'accueil colorés avec reflet animé.
- Animations CSS du hibou : flottement, surprise et victoire, sans dépendance à un moteur 3D externe.
- Bulles de correction façon bande dessinée et animations de combo.
- Adaptation PC/tablette/mobile et respect de `prefers-reduced-motion`.
- Aucun changement aux données, aux langues, aux voix, aux sauvegardes ou aux règles d'abonnement.

Note technique : cette édition est une refonte 2.5D CSS/WebP. Elle ne prétend pas être un monde 3D WebGL complet ; elle privilégie un rendu expressif et fluide sur les appareils modestes.


## Lancer la version de test
Décompressez l'archive puis double-cliquez sur `LANCER-TEST.bat` sous Windows. Pour macOS/Linux, lancez `sh lancer-test.sh`. Voir `LIRE-POUR-TESTER.md`.


## v5.19 — correction du hibou sur l'accueil
- La lune est replacée derrière Plumo avec une pile d'affichage explicite.
- Plumo est recentré et agrandi sur le perchoir, avec une animation douce de flottement.
- Le perchoir est ajusté sur mobile et ordinateur.


## v5.20 — Prototype du premier quartier 3D

Un nouveau bouton « Explorer le monde 3D » ouvre `monde-3d.html`. Le prototype propose une place de village en 3D, une caméra à la troisième personne, un hibou jouable, des déplacements clavier/tactile, trois habitants et de premières mini-missions de vocabulaire.

**Prérequis de ce prototype :** connexion Internet au premier lancement pour charger Three.js depuis jsDelivr. Le reste du jeu conserve son fonctionnement habituel. Le monde 3D est un prototype expérimental et n'est pas encore une expérience hors ligne complète.


## v5.21 — quartier 3D enrichi
- Ajout d'une chaîne de trois missions liées : marché, école, jardin.
- Réponses incorrectes avec retours humoristiques contextualisés ; la mission reste active.
- Carnet de missions avec progression sauvegardée localement.
- Cinq plumes cachées à collectionner, compteur sauvegardé et petits effets sonores originaux synthétisés localement.
- Les interactions du jeu 2D et les autres langues restent inchangées.


## v5.22 — Le quartier vivant (aventure 3D enrichie)

Le monde 3D reçoit une extension complète de son premier quartier :
- nouvelle mission au café avec Milo, quatrième personnage interactif ;
- progression en quatre étapes, du marché au café ;
- dix plumes à collecter, avec sauvegarde individuelle des objets ramassés ;
- carnet de missions et remise à zéro de l'aventure 3D pour les tests ;
- mini-carte avec position du joueur, habitants et plumes restantes ;
- trois ambiances visuelles sélectionnables : journée, crépuscule et nuit ;
- lampadaires qui s'allument le soir, nuages animés, jardinières et détails de décor ;
- course (Maj), saut (Espace), zoom caméra à la molette et rotation de caméra au glissement sur écran tactile ;
- commandes mobiles conservées.

Le jeu principal, ses langues, son système d'apprentissage et ses autres pages ne sont pas supprimés. Three.js est toujours chargé depuis jsDelivr : une connexion Internet est nécessaire pour ouvrir le monde 3D.


## v5.23 — Commandes corrigées et quartier plus détaillé
- Déplacements relatifs à l'écran : haut avance, bas recule, droite va à droite, gauche va à gauche.
- Caméra avec direction droite calculée selon l'axe réel de l'écran.
- Maisons avec toits à deux pans, fenêtres encadrées, volets, enseignes et auvents.
- Place avec pavés, passage piéton, bordures, mobilier urbain et arbres plus travaillés.
- Ombres haute résolution et caméra cinématographique.


## v5.24 — Habitants vivants
- Léa, Max, Zoé et Milo suivent chacun une promenade et marchent avec bras et jambes animés.
- Ils font des pauses, tournent dans le sens de leur trajet et s'arrêtent pendant les dialogues.
- Les commandes fléchées restent relatives à l'écran.
- Rendu amélioré : caméra plus cinématographique et ombres plus détaillées.


## v5.25 — Le quartier prend vie
- Trois voitures parcourent la rue, avec roues animées et feux.
- Oiseaux en vol, papillons qui butinent et lucioles nocturnes.
- Ambiances journée, crépuscule, nuit magique et averse avec pluie animée.
- Soleil, lune et ciel étoilé selon l'ambiance.


## v5.30 — Le quartier vivant : édition aventure
- Paco le chien et Mina la chatte : compagnons 3D animés et interactifs.
- Deux mini-missions bonus de vocabulaire animalier.
- Atelier des mots avec défis de grammaire et sauvegarde de progression.
- Les nouveautés de la v5.25 sont conservées.


### Correctif 5.30.1 — langues temporairement masquées
Le sélecteur affiche uniquement français et anglais. Les traductions coréennes, arabes, kabyles et les autres contenus linguistiques ne sont pas supprimés. Le test automatise désormais ce comportement.
