# Tester Ami des Mots v5.18

## Windows
1. Décompressez entièrement le ZIP dans un dossier.
2. Double-cliquez sur `LANCER-TEST.bat`.
3. Ouvrez ou actualisez `http://localhost:8000` si le navigateur ne s'ouvre pas.
4. Laissez la fenêtre noire ouverte pendant les tests. Fermez-la pour arrêter le serveur.

## macOS / Linux
1. Décompressez le ZIP.
2. Ouvrez un terminal dans le dossier extrait.
3. Lancez `sh lancer-test.sh`.
4. Ouvrez `http://localhost:8000`. Arrêtez avec Ctrl+C.

Python 3 est requis pour le serveur local. N'ouvrez pas `index.html` directement avec `file://` : le service worker et certaines fonctions PWA ne fonctionneront pas correctement.

## Vérifications conseillées
- Accueil, navigation, chaque type d'exercice et retour.
- Réponses justes/fausses, réactions du hibou, bulles de correction.
- Lecture audio, répétition et vitesse lente.
- Affichage téléphone, tablette et ordinateur.
- Actualisation puis mode hors connexion (après un premier chargement complet).
- Sauvegarde / restauration si cette fonction est utilisée.

## Tests automatisés
Avec Node.js 18 ou plus :
```sh
npm install
npm test
```
