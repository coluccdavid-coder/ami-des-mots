# Ami des Mots v5.3 — guide de test

## 1. Préparer le projet
- Décompresser l'archive dans un dossier.
- Installer Node.js (version LTS recommandée).
- Ouvrir un terminal dans le dossier du projet.
- Exécuter `npm install`.

## 2. Vérifier les tests automatisés
- Exécuter `npm test`.
- Pour reconstruire le service worker puis lancer les tests : `npm run verifier`.

Les tests ont besoin des dépendances du projet (`jsdom` notamment). Ils ne peuvent pas être lancés tant que `npm install` n'a pas été effectué.

## 3. Lancer le jeu en local
Le service worker ne fonctionne pas correctement en ouvrant simplement `index.html` avec `file://`.
Depuis le dossier du projet, lancer par exemple :
- `python -m http.server 8000`
- Ouvrir `http://localhost:8000` dans le navigateur.

Tester sur ordinateur puis sur téléphone (ou avec le mode responsive des outils développeur).

## 4. Parcours à vérifier
- Accueil et choix des langues.
- Jeux gratuits et contenus Plus/verrouillés.
- Atelier des phrases : remettre les mots dans l'ordre, demander un indice, terminer les 12 phrases.
- Village : ouvrir les lieux et vérifier les thèmes proposés.
- Révisions, carnet, trophées, vestiaire et réglages.
- Rechargement de la page et fonctionnement hors connexion après une première visite.

## 5. Paiements
Ne pas utiliser de vrais paiements pendant les essais. Pour tester l'abonnement, configurer un environnement Stripe/Supabase de test et les variables/secrets de test correspondants. Ne jamais publier de clés secrètes dans le code client ni dans un dépôt public.

## État des vérifications effectuées lors de la préparation de cette archive
- Archive ZIP vérifiée (test d'intégrité OK).
- Syntaxe vérifiée sur les principaux fichiers JavaScript.
- Les références locales d'assets repérées dans le service worker existent.
- `npm test` n'a pas pu être exécuté ici car `jsdom` n'était pas installé dans l'environnement de préparation ; lancer `npm install` avant les tests.
- Les essais réels dans plusieurs navigateurs et appareils restent à effectuer.


## Nouveautés v5.4 à tester
- Faire exprès une mauvaise réponse : vérifier que l'écran reste bloqué, que la réponse erronée est rouge et que le message reste visible.
- Vérifier que la voix lit la blague puis la bonne réponse.
- Utiliser « J'ai compris — continuer » pour passer à la question suivante.
- Dans Réglages, essayer les quatre niveaux d'humour et vérifier que le choix est mémorisé pour le profil.
- Refaire le test avec le mode chronomètre : le passage à la suite doit respecter la fin du temps.


## Nouveautés v5.5 à tester — synchronisation bouche/voix
- Ouvrir « Voir la bouche » et écouter un mot : les lèvres doivent commencer à bouger au début réel de la voix.
- Vérifier la fin : la bouche doit revenir au repos à la fin de la lecture.
- Refaire le test avec « Lentement » : les mouvements doivent rester alignés sur la voix ralentie.
- Tester plusieurs langues, notamment une langue cible différente de la langue de l'interface.
- Tester sur ordinateur et téléphone ; le navigateur peut utiliser une voix audio différente selon la langue et la disponibilité du fichier.


## Nouveauté v5.6 à tester
- Sur téléphone, provoquer une erreur : vérifier que la blague et la bonne réponse sont entièrement lisibles au-dessus du bouton de continuation.
- Tester un message long : la bulle doit pouvoir défiler sans cacher le bouton.
- Refaire le test en mode paysage et sur ordinateur.


## Nouveauté v5.7 à tester — langue des blagues
- Ouvrir Réglages > Langue des blagues et choisir Français, puis provoquer une erreur : la blague, la correction et la voix doivent être en français.
- Choisir English puis refaire une erreur : blague, correction et voix doivent être en anglais.
- Changer la langue apprise et la langue de l'interface : le choix de langue des blagues doit rester indépendant.
- Vérifier que le réglage est conservé après rechargement et par profil.


## Nouveautés v5.8 à tester
- Comparer l'accueil, les thèmes, les questions et les réglages sur ordinateur et téléphone.
- Vérifier la lisibilité des images, des cartes, des boutons et des retours de bonne/mauvaise réponse.
- Essayer les quatre niveaux d'humour en français puis en anglais : les nouvelles répliques doivent varier et rester dans la langue sélectionnée.
- Vérifier le mode paysage, le mode lecture facile et l'option de réduction des animations du système.
- Refaire un parcours complet : accueil > thème/village > partie > correction > fin > révisions.


## Nouveauté v5.9 à tester — voix du premier exercice
- Démarrer une partie sur téléphone : la consigne du premier exercice doit être lue.
- Dans « Écoutez puis touchez la bonne image », vérifier que le mot est prononcé automatiquement et que le bouton « Écouter » le relit à la demande.
- Dans « Quel est le nom de cette image ? », vérifier que seule la consigne est lue, sans révéler le mot attendu.
- Tester en français et en anglais, puis après un rechargement de la page.
- Si la voix système n'est pas disponible pour la langue, vérifier qu'un message d'absence de voix apparaît au lieu d'un silence trompeur.


## Nouveauté v5.10 à tester — langues provisoirement masquées
- Sur l'accueil, le menu « J'apprends » ne doit proposer que Français et English.
- Vérifier les exercices et l'atelier de phrases en français et en anglais.
- Restaurer une ancienne sauvegarde dont la langue cible est espagnol, kabyle ou autre : l'application doit sélectionner temporairement Français/English sans effacer les données linguistiques.
- Vérifier que les mots et traductions des autres langues sont toujours présents dans `js/donnees.js`.


## Nouveauté v5.11 à tester — qualité des blagues
- Essayer les quatre niveaux d'humour en français puis en anglais.
- Vérifier que les répliques sont compréhensibles, naturelles et cohérentes avec une erreur de réponse.
- Vérifier qu'aucune vanne ne se moque du joueur.
- Refaire plusieurs erreurs de suite pour vérifier que les répliques varient.


## Nouveauté v5.12 à tester — trois formats de blagues
- Provoquer plusieurs erreurs au même niveau : les retours doivent alterner entre vanne éclair, devinette et mini-histoire.
- Tester les quatre niveaux d'humour en français et en anglais.
- Vérifier que les devinettes incluent bien leur chute/réponse dans le même commentaire.
- Vérifier que le commentaire reste lisible sur téléphone et que le bouton « J'ai compris — continuer » reste accessible.


## Nouveauté v5.13 à tester — univers visuel 3D
- Accueil : vérifier la nouvelle mascotte 3D, son flottement et le rendu sur perchoir.
- Jeu : vérifier la taille de la mascotte dans l'en-tête, les réactions aux bonnes/mauvaises réponses et la lisibilité des questions.
- Thèmes et choix : vérifier le relief des cartes et boutons, les ombres et les états sélectionnés.
- Vestiaire : vérifier que les aperçus de costumes restent disponibles et que les tenues ne cassent pas l'écran.
- Téléphone : tester portrait/paysage et les performances sur appareil d'entrée de gamme.
- Accessibilité : activer la réduction des animations au niveau du système et vérifier que les animations sont neutralisées.
- Hors connexion : lancer le jeu après une première visite pour vérifier le chargement local de `img/ami-3d.webp`.


## Nouveauté v5.14 — humour court
- Déclencher plusieurs erreurs : chaque vanne doit tenir en une courte phrase ou une devinette express.
- Vérifier que la correction « C'était : ... » reste claire après la vanne.
- Tester les quatre niveaux d'humour en français et en anglais.
- Vérifier l'affichage mobile et l'écoute vocale des messages courts.
