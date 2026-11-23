# Tests dans un vrai navigateur (Mots City, monde 3D, hors ligne)

Ces tests ne font pas partie de `npm test` : ils demandent Chrome et `puppeteer-core`,
qu'on n'ajoute pas aux dépendances du projet.

```
npm install --no-save puppeteer-core@22
node outils/tests-navigateur/serveur.js . 8765 &
node outils/tests-navigateur/test-city.js        # 43 vérifications (dont étiquettes) + captures d'écran
node outils/tests-navigateur/test-quaternius.js  # habitants, nature, défis anglais (14 vérifications)
node outils/tests-navigateur/test-collisions-village.js  # murs, fontaine, arbres, voitures (9)
node outils/tests-navigateur/test-quetes.js      # quête des plumes, indices, vol (9)
node outils/tests-navigateur/test-coin-anglais.js # Professor Puzzle, portail, coin anglais (7)
node outils/tests-navigateur/test-ruines-vehicules.js # ruines, chasse au trésor, portails, véhicules (14)
node outils/tests-navigateur/test-village542.js  # Ami says, étiquettes, café, école, météo, photo (13)
node outils/tests-navigateur/test-maths-sciences.js # Prof Pi, vannes, examens, labo des sciences (7)
node outils/tests-navigateur/test-sens-voitures.js # aucune voiture en marche arrière (village + Mots City)
node outils/tests-navigateur/test-sens-city.js    # Mots City : droite/gauche à pied et en véhicule (5)
node outils/tests-navigateur/hors-ligne.js       # démarrage sans réseau via le service worker
```
Salon par le serveur PHP : `SERVEUR=http://127.0.0.1:8770/ node outils/tests-navigateur/test-salon-direct.js` (avec `php -S 127.0.0.1:8770 -t serveur-php`).
Serveur PHP seul : `outils/tests-serveur/test-serveur-php.js` (33 vérifications, MariaDB).
Salon en ligne sans compte Supabase : un faux serveur Realtime (paquet `ws`, installé à part comme puppeteer).
```
npm install --no-save ws@8
node outils/tests-navigateur/faux-realtime.js 8790 &
node outils/tests-navigateur/test-salon-direct.js  # 2 navigateurs : salon privé, réaction, 6 questions, podium (9)
```
Variables : `CHROME` (chemin de Chrome), `CAPTURES` (dossier des captures).
Le Chrome sans écran dessine sans carte graphique : le jeu y tourne au ralenti, c'est normal.

Contrôle visuel des véhicules : ouvrir http://localhost:8765/outils/tests-navigateur/garage.html (la flèche rouge = l'avant utilisé par le jeu).
