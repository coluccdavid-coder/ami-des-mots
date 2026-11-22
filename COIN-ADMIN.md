# Coin admin — choisir ce qui est gratuit et ce qui est dans Plus

Ouvre **`admin.html`** (en local : `http://localhost:8765/admin.html` ; en ligne : `https://ton-site/admin.html`).

## Ce qu'on peut régler
- **Offre Plus activée** (décochée : tout est gratuit, aucun paiement).
- **Prix affiché** et **nombre de joueurs gratuits** (1 à 6).
- **Thèmes de mots** gratuits (Animaux, À table…).
- **Jeux de mots** gratuits (chaque sorte, à tous ses niveaux) : le compteur montre « X/50 jeux gratuits ».
- **Coins** : pièges, situations, histoires, dictée, parcours, atelier des phrases, battle de vannes, rap battle,
  tournoi, défi entre potes, salon en ligne, coins « Pour rire », **coin maths (6e → Tle)**, **labo des sciences**, village 3D, Mots City.

Ce qui n'est pas coché passe en **✨ Plus** : le joueur gratuit voit le badge ✨ et, s'il touche, l'écran Plus.
Le coin admin prévient si un réglage n'a pas de sens (aucun thème gratuit, tout gratuit…).

## Publier le changement
La page ne change rien en direct chez les joueurs : elle fabrique le fichier **`js/offre.js`**.
1. Dans `admin.html` : **⬇️ Télécharger offre.js** (ou **📋 Copier le fichier**).
2. Remplace `js/offre.js` dans le dépôt par ce fichier (dans le Codespace : glisse-le dans `js/`, ou ouvre
   `js/offre.js` et colle).
3. `npm run verifier` (reconstruit le service worker et lance les tests).
4. Branche, commit, pull request, fusion (même procédure que d'habitude).
Les joueurs ont la nouvelle offre à leur prochaine visite.

Le brouillon reste sur ton appareil (bouton **↩️ Revenir à l'offre en ligne** pour l'effacer).

## Sécurité
- `offre.js` dit seulement ce qui est **réservé** à Plus. Il ne peut **jamais ouvrir** Plus : Plus ne s'ouvre
  qu'avec un certificat signé par le serveur. Le jeu relit `offre.js` avec prudence (réglages inconnus ignorés).
- `admin.html` n'a pas de mot de passe parce qu'il n'en a pas besoin : il ne touche ni au site, ni aux comptes, ni
  aux paiements. Quelqu'un qui l'ouvre peut seulement fabriquer un fichier chez lui. Seul quelqu'un qui peut
  publier dans le dépôt GitHub change vraiment l'offre. La page n'est pas indexée par les moteurs de recherche.

## Limite connue
Les pages 3D (`monde-3d.html`, `mots-city.html`) sont fermées depuis le jeu (bouton, liens), mais quelqu'un qui
tape directement leur adresse peut encore y entrer. Les jeux de mots et les coins du jeu, eux, restent fermés
même par un lien direct.
