# Ami des mots

Un jeu pour apprendre et réviser des mots en images, dans 16 langues, avec
Ami le hibou. Produit **séparé** de reparole.fr : mêmes images, mêmes mots,
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
  jour ; les plumes habillent Ami (écharpe, lunettes, nœud papillon,
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
- Ami **articule** quand il parle (module de ReParole recopié).
- **Hors connexion** après la première visite (sauf les voix enregistrées).

## Graphisme (v4, « Nuit des mots »)

Tout le jeu vit la nuit : une aurore qui dérive lentement, des panneaux
de verre dépoli, des images posées sur des « autocollants » blancs qui
brillent, des boutons en relief. Accueil : paysage vivant (aurore,
collines, lucioles, étoile filante), Ami perché sur sa branche devant la
lune, qui cligne des yeux et suit le doigt du regard. En jeu : étincelles
sur une bonne réponse, série « 🔥 ×3 », petite vibration sur Android.
Victoire : rayons de lumière, étoiles, plumes qui défilent, confettis.
Tout ce mouvement s'arrête en Lecture facile et si le téléphone demande de
réduire les animations. Couleurs : variables au début de `css/jeu.css`.
Polices : Nunito et Andika (licence OFL, dans `fonts/`).

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

## Gratuit / Ami des mots Plus (abonnement mensuel)

| | Gratuit | Plus (5,99 €/mois conseillé) |
|---|---|---|
| Thèmes | 3 sur 8 (Animaux, À table, La maison) | les 8 |
| Jeux | **10 sur 50** : Découvrir, Écoute et trouve, Quel mot ?, Traduction (à leurs niveaux) | **les 50** |
| Joueurs | 1 | jusqu'à 6 (formule famille) |
| Défi du jour, révision, carnet, trophées, vestiaire | oui (mots gratuits) | oui (tous les mots) |

Tout se règle dans `CONFIG` en haut de `js/jeu.js` : `PRIX`,
`THEMES_GRATUITS`, `JEUX_GRATUITS`, `JOUEURS_GRATUITS`. `MODE_PAYANT:false`
ouvre tout. Tant que `LIEN_PAIEMENT` est vide, la page Plus affiche
« Bientôt disponible » : on peut publier le jeu avant de vendre.

### Brancher le paiement (une fois, ~1 h)

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
À tester pour de vrai en **mode test Stripe** avant le lancement.

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
- Tests : `npm install` une fois, puis `npm test` (35 tests). `npm run verifier`
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
