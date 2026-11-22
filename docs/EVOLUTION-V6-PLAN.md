# Ami des Mots — feuille de route V6 « Monde vivant & professeur adaptatif »

## Point de départ vérifié dans la V5.46

Le projet dispose déjà de fondations réutilisables :
- application web/PWA hors ligne, progression locale et profils multiples dans `js/jeu.js` (`amidesmots:v2`, `joueurs`, profil actif) ;
- modules pédagogiques séparés : `js/parcours.js`, `js/pieges.js`, `js/anglais.js`, `js/histoires.js`, `js/articulation.js`, `js/voix.js` ;
- espace parents et statistiques d'anglais déjà présents dans `js/jeu.js` ;
- monde 3D séparé dans `monde-3d.html`, boîte à outils Three.js dans `js/kit3d.js`, modèles GLB KayKit/Quaternius dans `assets/3d/`, animations via `THREE.AnimationMixer` ;
- tests navigateur spécialisés dans `outils/tests-navigateur/` ;
- configuration serveur facultative dans `js/config-site.js` et `CONFIG_JEU.SERVEUR`.

La V6 doit prolonger ces éléments et non réécrire l'application.

## Vision produit

Faire d'Ami des Mots un jeu éducatif d'aventure 3D stylisé, avec :
1. un parcours individuel réellement adaptatif ;
2. un professeur numérique qui explique et propose des exercices contrôlés ;
3. des personnages animés et des missions intégrées à l'apprentissage ;
4. un monde explorable cohérent, fluide sur ordinateur et mobile ;
5. un espace parent utile et compréhensible ;
6. un mode hors ligne qui reste pleinement jouable.

« Ambition GTA » signifie ici monde ouvert stylisé, circulation, exploration, missions, PNJ et caméra agréable. Il ne s'agit ni de copier GTA, ni de promettre la taille ou la fidélité graphique d'un jeu AAA.

## Architecture cible

### A. Couche apprentissage locale (socle obligatoire)
- `js/apprentissage-adaptatif.js` : moteur pur de planification des révisions, sans accès réseau.
- Le profil courant reste la source de vérité locale ; les données d'apprentissage sont rattachées à `joueurs[actif]`.
- Chaque notion possède un identifiant stable, un niveau de maîtrise, une date de prochaine révision et un historique borné.
- Les réponses sont classées selon une échelle simple : oubli / difficile / réussi / facile.
- Le moteur recommande le prochain exercice ; il ne modifie pas seul les contenus pédagogiques.
- Export/import et migration versionnée avant tout changement de schéma.

### B. Tuteur IA encadré (après validation du socle local)
- Le tuteur local choisit d'abord parmi les contenus validés du jeu et les règles pédagogiques.
- L'IA distante est facultative, désactivable et appelée uniquement via le serveur du projet (`CONFIG_JEU.SERVEUR`), jamais directement depuis le navigateur avec une clé secrète.
- Endpoint cible : `POST /tuteur.php`, avec une liste blanche de types d'exercices, longueur maximale, langue, niveau et identifiants de notions.
- Ne transmettre ni nom, ni voix, ni transcription libre, ni profil complet. Envoyer le minimum nécessaire : langue, niveau abstrait, notion et type d'erreur.
- Réponse strictement structurée (JSON validé côté serveur) : consigne, choix, correction, explication courte, identifiant de contenu. Rejeter tout HTML/script et tout contenu hors sujet.
- Filtrage de contenu, quotas, journalisation technique minimale, temporisation et mode de secours local.
- Pas de chat libre avec un modèle pour les enfants. Les dialogues sont scénarisés, bornés et pédagogiques.
- Un adulte peut désactiver l'IA ; l'application reste fonctionnelle sans réseau.

### C. Voix et prononciation
- Distinguer clairement « écouter », « s'enregistrer » et « évaluer ».
- Ne jamais afficher une note de prononciation si le navigateur n'a pas réellement fourni une mesure exploitable.
- Évaluation vocale éventuelle : consentement explicite, traitement minimal, pas de conservation par défaut, solution alternative sans micro.
- Commencer par écoute modèle + répétition + auto-comparaison, avant toute notation automatique.

### D. Monde 3D vivant
- Garder `monde-3d.html` comme entrée du monde et `js/kit3d.js` comme bibliothèque partagée.
- Séparer le monde en zones/chunks chargés à proximité du joueur ; ne pas charger tous les décors et PNJ simultanément.
- Instancier les éléments répétés (arbres, lampes, mobilier), limiter les ombres et effets sur mobile, prévoir un profil graphique bas/moyen/haut.
- Ajouter un graphe de navigation simple pour PNJ et véhicules ; les véhicules suivent une route orientée, leur avant regarde le vecteur de déplacement et les roues tournent selon la distance parcourue.
- Utiliser des états d'animation explicites : Idle, Walk, Run, Talk, Interact, Jump, Celebrate. Les transitions passent par les fonctions de `kit3d.js`.
- Caméra : suivi amorti, collision caméra, limites de pitch/distance, recentrage optionnel.
- Monde : cycle jour/nuit, météo légère, sons d'ambiance, lieux visitables et points d'intérêt.
- Missions : chaque mission déclenche une activité pédagogique réelle, puis un retour dans le monde (objet, accès, dialogue, récompense).
- Conserver des contrôles clavier, manette/tactile accessibles et une option « version classique ».

### E. Présentation et accessibilité
- Direction artistique cohérente : formes lisibles, silhouettes expressives, éclairage stylisé, matériaux cohérents, UI en verre/relief mais contrastée.
- Les informations pédagogiques restent prioritaires sur les effets visuels.
- Réduire les animations selon `prefers-reduced-motion` et le réglage « animations réduites » déjà utilisé par l'application.
- Interface mobile : boutons tactiles suffisamment grands, aucun texte masqué, aucun défilement horizontal.

## Phases de réalisation et critères d'acceptation

### Phase 0 — sécurisation (avant toute grosse évolution)
- Geler une archive V5.46 de référence.
- Faire passer les tests existants : `npm test`, `npm run verifier`, puis les tests navigateur listés dans `outils/tests-navigateur/LISEZMOI.md`.
- Ajouter des captures de référence pour accueil, leçon, espace parents et chaque univers.
- Aucun changement de stockage sans migration et test de restauration.

### Phase 1 — moteur adaptatif local
- Enregistrer les résultats par notion et par profil.
- Calculer les révisions dues et proposer 5 à 8 questions courtes.
- Réduire les répétitions des notions maîtrisées ; ramener rapidement les notions fragiles.
- Critères : résultats conservés après rechargement, profils isolés, fonctionnement hors ligne, aucune perte de progression existante.

### Phase 2 — professeur pédagogique
- Construire une banque d'explications vérifiées pour les pièges fréquents.
- Ajouter « indice », « explique-moi », « donne un exemple ».
- Tuteur local déterministe d'abord ; service IA serveur uniquement après tests de sécurité et de qualité.
- Critères : aucune réponse inventée présentée comme règle ; explication rattachée à une notion validée ; mode sans IA opérationnel.

### Phase 3 — PNJ et missions apprenantes
- Dialogues à choix et mini-conversations scénarisées.
- Réactions et animations synchronisées avec les étapes de mission.
- Critères : le joueur sait toujours quoi faire ; la mission ne bloque pas si l'IA/réseau manque.

### Phase 4 — monde ouvert stylisé
- Chunks, navigation PNJ/voitures, caméra, météo, cycle jour/nuit, optimisation.
- Critères : 30 FPS cible sur appareil moyen à définir, pas de chute prolongée, pas de véhicule roulant à l'envers, personnage orienté dans le sens de marche, test sur clavier et tactile.

### Phase 5 — famille, qualité et lancement
- Espace parents clarifié, objectifs de séance, bilan hebdomadaire local.
- Tests d'accessibilité, confidentialité, sécurité serveur, Android/iOS et navigateurs.
- Critères : aucune clé secrète dans les fichiers publics, consentement micro explicite, politique de confidentialité et CGU adaptées avant commercialisation.

## Décisions techniques à ne pas prendre trop tôt

- Ne pas remplacer Three.js ni réécrire `monde-3d.html` avant profilage réel.
- Ne pas envoyer toutes les données de progression à une IA.
- Ne pas rendre le jeu dépendant d'une API distante.
- Ne pas acheter/produire de nouveaux modèles 3D avant d'avoir validé le pipeline d'animation et les performances.
- Ne pas confondre réussite à un QCM et maîtrise durable d'une notion.

## Commandes de vérification

```bash
npm install
npm test
npm run verifier
```

Puis suivre les commandes navigateur documentées dans `outils/tests-navigateur/LISEZMOI.md`.


## État réel de la livraison v5.48
- Le moteur adaptatif est désormais appelé par la fonction commune `noter()` des jeux à choix de `js/jeu.js`.
- Les fiches sont enregistrées sous `joueur.apprentissage.cartes`, donc séparées par profil ; les identifiants reprennent la clé langue + mot du système historique.
- Un résumé « Ton apprentissage » apparaît sur l'accueil lorsqu'au moins une notion a été suivie.
- `js/tuteur-pedagogique.js` fournit une frontière locale stricte : il ne génère aucune règle et n'affiche que les champs d'un contenu validé.
- Le tuteur IA distant, l'intégration des autres activités et les chantiers 3D restent des phases ultérieures, pas des fonctions prétendument terminées.
