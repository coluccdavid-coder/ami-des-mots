# Tests dans un vrai navigateur (Mots City, monde 3D, hors ligne)

Ces tests ne font pas partie de `npm test` : ils demandent Chrome et `puppeteer-core`,
qu'on n'ajoute pas aux dépendances du projet.

```
npm install --no-save puppeteer-core@22
node outils/tests-navigateur/serveur.js . 8765 &
node outils/tests-navigateur/test-city.js        # 40 vérifications + captures d'écran
node outils/tests-navigateur/test-quaternius.js  # habitants, nature, défis anglais (14 vérifications)
node outils/tests-navigateur/hors-ligne.js       # démarrage sans réseau via le service worker
```
Variables : `CHROME` (chemin de Chrome), `CAPTURES` (dossier des captures).
Le Chrome sans écran dessine sans carte graphique : le jeu y tourne au ralenti, c'est normal.
