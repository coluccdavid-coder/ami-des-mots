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


## v5.23 — Commandes corrigées et quartier plus détaillé
1. Teste les flèches : haut = avancer, bas = reculer, droite = droite, gauche = gauche. Recommence après avoir tourné la caméra : les commandes doivent rester relatives à l'écran.
2. Vérifie les bâtiments, les toits, les vitrines, la place pavée, les arbres et le mobilier urbain.


## v5.24 — Habitants vivants
1. Observe Léa, Max, Zoé et Milo : ils doivent se déplacer seuls, balancer les bras et les jambes, faire des pauses puis repartir.
2. Approche-toi d'un habitant en mouvement : l'interaction doit fonctionner.
3. Lance une conversation : le personnage doit s'arrêter pendant le dialogue.
4. Teste les quatre flèches, puis tourne la caméra et recommence : haut avance, bas recule, droite va à droite, gauche va à gauche.


## v5.25 — Le quartier prend vie
1. Observe la rue : les voitures doivent circuler et leurs roues tourner.
2. Regarde le ciel et les massifs : oiseaux, papillons et lucioles doivent être animés.
3. Clique sur « Ambiance » plusieurs fois : journée, crépuscule, nuit magique et averse. La pluie doit apparaître uniquement en mode averse.
4. Vérifie que les habitants continuent de marcher et que les dialogues restent accessibles.


## v5.30 — Le quartier vivant : édition aventure
5. Trouve Paco (chien) et Mina (chat) dans le quartier, approche-toi et appuie sur E ou le bouton à l'écran. Teste les deux mini-missions.
6. Trouve le tableau « Atelier des mots » près de la place. Réponds au défi, puis relance l'interaction pour le défi bonus.
7. Recharge la page : les missions bonus terminées doivent rester mémorisées.


### Correctif 5.30.1 — langues temporairement masquées
Le sélecteur affiche uniquement français et anglais. Les traductions coréennes, arabes, kabyles et les autres contenus linguistiques ne sont pas supprimés. Le test automatise désormais ce comportement.


## v5.31 — Les vannes d'Ami
1. Réglages → choisis un niveau d'humour, puis la langue des blagues.
2. Dans chaque type de jeu, fais exprès une erreur : la vanne doit citer ce que tu as choisi
   (le mot, l'étiquette du vrai/faux, la lettre ou le mot fabriqué, le panier).
3. Vérifie qu'Ami ne se moque jamais du joueur et que « C'était : … » donne la bonne réponse.
4. Rate deux fois le même mot dans une partie : Ami doit le remarquer.
5. Fais une série de 3 bonnes réponses puis une erreur : Ami parle de la série.
6. Avec le son : la vanne est lue tout de suite par la voix du téléphone.


## v5.32 — Mots City et les nouvelles vannes
1. Accueil → « 🛵 Mots City ». Lis l'aide, puis 📱 (ou M) : essaie les 3 missions.
2. Fais exprès une erreur dans chaque mission : la vanne doit citer ton choix et la demande.
3. Vérifie que ◀ tourne à gauche et ▶ à droite (clavier ET boutons tactiles).
4. Fonce dans un immeuble : on ne le traverse pas, la caméra non plus.
5. 📻 Radio et 📯 klaxon : phrase anglaise + sens en français.
6. ← Retour : ferme d'abord une fenêtre ouverte, puis revient à l'accueil.
7. Jeu principal, en apprenant l'anglais : confonds cat/dog → une astuce 💡 apparaît.
8. Après une erreur : « 😂 Je la garde », puis Carnet → Mes fous rires.
9. Lecture facile activée : Ami reste « Tout doux ».
10. Monde 3D : parle à Paco ou Mina → « 🎯 Défi anglais ».
11. Coupe le réseau après une première visite : Mots City et le monde 3D démarrent.
À vérifier sur un VRAI téléphone : fluidité de Mots City (le test automatique n'a pas de carte graphique).


## v5.33 — Mots City monde ouvert
1. Monde 3D : marche avec Ami → ses pattes bougent, elles s'arrêtent droites à l'arrêt.
2. Mots City : écran titre, choisis une tenue, ▶ Jouer.
3. Marche, cours (Maj / 🏃), saute (Espace / ⤒) : jambes, genoux et bras bougent.
4. Approche un scooter ou une voiture : « Monter (E) ». Conduis, puis R pour la radio.
5. Mission Taxi : le passager attend un véhicule, puis monte à bord.
6. Trouve une ✨ plume dorée : un mot anglais s'affiche et se prononce.
7. Attends la nuit (ou joue 3 min) : néons, fenêtres, lampadaires, phares.
8. Plage : ponton, grande roue qui tourne, mer animée.
À vérifier sur un VRAI téléphone : fluidité (le test automatique n'a pas de carte graphique).

## v5.37 — Les vrais habitants (Quaternius)

1. Ouvre le site : dans le village, regarde la forêt autour du quartier et les fleurs sur les pelouses.
2. Va voir un habitant avec un anneau **bleu** (ex. Captain Finn, près de l'école) → E :
   il parle anglais, la traduction s'affiche. « 🎯 Petit défi » : choisis d'abord un mauvais mot (vanne),
   puis le bon (geste de joie, compteur x/8).
3. Mots City : choisis la tenue **Vache rigolote** ou **Pirate**, promène-toi : la foule est variée,
   les palmiers et les parcs fleuris sont nouveaux.
4. Sur téléphone : vérifie que ça reste fluide (moins de passants différents y sont chargés).

## v5.38 — Quêtes et collisions

1. Dans le village, fonce dans une maison, la fontaine, un arbre, un habitant : tu es arrêté.
   Mets-toi devant une voiture : elle s'arrête, puis repart quand tu t'écartes.
2. 📖 Quêtes : lis le but de chaque quête.
3. Va voir Captain Finn (anneau bleu) → Petit défi → réponds « treasure » : il donne un indice en anglais.
   Va le vérifier (entre le lampadaire et le banc) : la plume est petite, près du sol.
4. Avec 10 plumes : Ami revole (garde Espace ou ⤒ appuyé).
5. Bouton « ↻ Recommencer l'aventure » pour tout rejouer depuis le début.

## v5.39 — Vannes en scènes et pièges de l'anglais

1. Version classique, « Je parle : Français », « J'apprends : Anglais » : un bouton orange
   **🪤 Les pièges de l'anglais** apparaît sur l'accueil.
2. Fais exprès de te tromper : lis la vanne, écoute la bonne phrase (🔊), lis la règle.
3. Joue un jeu d'images (ex. Animaux) et trompe-toi plusieurs fois : certaines vannes deviennent
   des petites scènes (« Tu voulais caresser le chat… ») avec la phrase anglaise 🇬🇧 à la fin.
4. Relance les pièges le lendemain : ceux que tu as ratés reviennent en premier.

## v5.40 — Le coin anglais

1. Accueil (Français → Anglais) : **🇬🇧 Le coin anglais** → 4 cartes.
2. **🎤 Battle** : choisis d'abord une réplique fausse (vanne), puis la bonne. 3 manches, score.
3. **☕ Situations** : « Au café » — écoute le serveur, choisis ta réponse. Essaie « Give me hot ».
4. **✍️ Dictée** : écris « I can sea the sea » quand Ami dit « I can see the sea » → vanne du maillot de bain.
5. Village 3D : portail 🇬🇧 au nord ; **Professor Puzzle** (anneau orange) au nord-ouest.
