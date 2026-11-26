# Avant d'ouvrir Ami des mots au public

`npm run publication` affiche l'état exact : ce qui est activé, les points bloquants, et ce qu'il reste à vérifier à la main.
Avec `-- --strict`, la commande échoue tant qu'un point bloquant reste.

## 1. Juridique (bloquant)

- **Remplir les passages surlignés de `legal.html`** : statut, adresse, SIRET, e-mail, hébergeur, TVA, médiateur, etc. La liste exacte s'affiche avec `npm run publication`.
- **Faire relire le tout par un juriste**, en particulier :
  - le traitement des données des mineurs : base légale, accord parental en dessous de 15 ans ;
  - l'envoi des devoirs à l'IA : durée de conservation chez le fournisseur et encadrement du transfert hors de l'Union européenne ;
  - les mentions de boutique (TVA, rétractation), si le paiement est un jour activé.

## 2. Ce qui est réellement proposé

- **Fonctions masquées** : village, Mots City, voix de Plumo et bouche sont masqués par `js/config-site.js`. Rien n'est supprimé.
- **Fonctions qui demandent un serveur** : l'IA (aide aux devoirs), la veille et le salon en direct n'existent que si le serveur est branché.
- **Aide aux devoirs par IA** : elle n'envoie rien sans l'accord d'un parent (Espace parents). Le serveur refuse aussi une demande sans cet accord (depuis la v6.79).
- **Présentation publique** : les captures d'écran, la fiche de boutique et le site doivent montrer exactement ce qui est activé.

## 3. Tests

- `npm install`, puis `npm run verifier` : génération du service worker et du catalogue, puis tous les tests du jeu, y compris le paquet de production.
- `npm run test:serveur` : il faut PHP 8.1 ou plus et MariaDB (ou MySQL). Le script crée une base jetable.
- **Sur de vrais appareils** :
  - petit téléphone Android, tablette, iPhone (navigateur), ordinateur ;
  - hors connexion, connexion lente, reprise après une coupure de réseau ;
  - reprise de la progression après fermeture ; six profils ; changement de langue ; voix et reconnaissance vocale.
- **Accessibilité** : clavier seul, lecteur d'écran, contrastes, grande taille de texte.

## 4. Serveur déployé

- Sécurité du serveur :
  - HTTPS obligatoire ;
  - `config.php` hors du dossier public ;
  - liste des origines autorisées à jour.
- **Sauvegardes** de la base et **journaux d'erreurs** surveillés.
- **Abus** : vérifier les limites de requêtes sur un vrai serveur (répétitions, codes anonymes, jetons d'appareil). Le contrôle des origines (CORS) ne remplace pas une authentification.
- **Test d'intrusion** par un tiers si possible avant d'activer le paiement ou l'IA pour tous.

## 5. Performance

- **Paquet de production** : `node outils/preparer-www.js` (GitHub Pages, Android) regroupe les ~190 scripts de la page principale en un seul fichier. Le service worker le garde pour jouer hors connexion. `tests/paquet.test.js` vérifie que le jeu chargé est identique.
- **Étape suivante** : charger les matières à la demande, pour alléger le démarrage sur les petits téléphones.
