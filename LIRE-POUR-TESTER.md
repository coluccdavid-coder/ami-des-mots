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


## Tester le monde 3D v5.20
1. Publiez l'archive complète sur GitHub Pages comme d'habitude.
2. Ouvrez le jeu puis cliquez sur « Explorer le monde 3D ».
3. Le premier chargement nécessite une connexion Internet pour télécharger Three.js.
4. Déplacement : ZQSD / WASD ou flèches ; sur mobile, utilisez les flèches tactiles.
5. Approchez-vous de Léa, Max ou Zoé puis appuyez sur E ou sur « Parler ».
6. Le bouton « Retour au jeu » revient à l'application principale.

Le monde 3D est encore un premier quartier de démonstration : les bâtiments et dialogues sont des éléments de prototype, pas encore le jeu final.


## v5.21 — suite du quartier 3D
- Parler à Léa, puis réussir sa question sur « apple ».
- Parler à Max et réussir la question sur « school ».
- Rejoindre Zoé et répondre à sa devinette sur la couleur du jardin.
- Ouvrir le carnet pour voir les étapes terminées.
- Ramasser les cinq plumes lumineuses dispersées dans le quartier ; le compteur doit augmenter.
- Vérifier que la progression et les plumes restent présentes après actualisation du navigateur.
- Les sons de récompense sont des effets sonores synthétiques, pas encore des voix de personnages.


## v5.22 — Test complet du quartier vivant
1. Depuis l'accueil, ouvre « Explorer le monde 3D ».
2. Parle à Léa, Max, Zoé puis Milo pour terminer les quatre missions dans l'ordre.
3. Ouvre le carnet : les étapes accomplies doivent être cochées.
4. Ouvre la carte : ta position, les habitants et les plumes restantes sont indiqués.
5. Ramasse les dix plumes ; actualise la page pour vérifier que les objets déjà pris restent absents.
6. Change l'ambiance : journée, crépuscule puis nuit ; les lampadaires doivent s'allumer la nuit.
7. Sur PC : Maj pour courir, Espace pour sauter, molette pour zoomer, glisser à la souris pour tourner la caméra.
8. Sur mobile : flèches tactiles pour marcher et glisser sur la scène pour tourner la caméra.
9. Dans le carnet, le bouton « Recommencer l'aventure (test) » remet à zéro la progression propre au monde 3D.
10. Vérifie enfin le bouton Retour pour revenir au jeu principal.
