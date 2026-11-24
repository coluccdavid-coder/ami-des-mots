# Mise en ligne chez OVH — la liste à cocher

Tout est prêt dans le dépôt. Il reste les étapes qui demandent ton compte OVH (et que personne d'autre ne doit faire à ta place).
Compte environ 1 h la première fois.

## 1. Commander (console OVH)
- [ ] Un **hébergement web** (Perso ou Pro ; Pro conseillé pour le SSH).
- [ ] Un **nom de domaine** à part (ex. `amidesmots.fr`), pas une adresse en reparole : les deux projets restent séparés.
- [ ] Hébergement → **Informations générales** → version de PHP : **8.2** ou plus.
- [ ] Hébergement → **Multisite** : le domaine pointe vers le dossier `www`. Activer le **SSL** (Let's Encrypt, gratuit).

## 2. La base de données
- [ ] Hébergement → **Bases de données** → Créer (MySQL). Noter l'hôte (`xxx.mysql.db`), le nom, l'utilisateur, le mot de passe.
- [ ] Bouton **phpMyAdmin** → Importer → `serveur-php/schema.sql`. (À refaire à chaque version qui ajoute une table ; les tables existantes ne sont pas touchées.)

## 3. Les fichiers secrets (une seule fois, À LA MAIN, au-dessus de `www/`)
Avec FileZilla (SFTP), à la racine de ton espace (là où tu vois le dossier `www`) :
- [ ] `ami-cle-privee.pem` : sur ton ordinateur, `node outils/generer-cles.js` (garde aussi la ligne `CLE_PUBLIQUE` affichée).
- [ ] `config-ami.php` : copie de `serveur-php/config.exemple.php`, remplie (base de données, chemin de la clé, mot de passe admin
      haché, `cadeau_sel`, origines = `https://amidesmots.fr`). Le serveur le cherche d'abord là (v5.97).
- Ces fichiers ne passent **jamais** par GitHub.

## 4. Brancher la mise en ligne automatique (GitHub → OVH)
Dans le dépôt GitHub : Settings → Secrets and variables → Actions.

| Secret | Où le trouver |
| --- | --- |
| `OVH_HOTE` | Hébergement → FTP-SSH : serveur, ex. `ssh.cluster0xx.hosting.ovh.net` |
| `OVH_UTILISATEUR` | même page : identifiant principal |
| `OVH_MOT_DE_PASSE` | même page (bouton « Modifier le mot de passe ») |
| `OVH_KNOWN_HOSTS` | dans le Codespace : `ssh-keyscan ssh.cluster0xx.hosting.ovh.net` → coller toutes les lignes |
| `OVH_DOSSIER` (facultatif) | `www` par défaut |

Et dans l'onglet **Variables** : `OVH_ADRESSE` = `https://amidesmots.fr` (pour la vérification après envoi).

- [ ] Puis : Actions → « Mise en ligne OVH » → **Run workflow**. Ensuite, chaque fusion sur `main` met le site à jour tout seul.
- Le robot lance les tests avant, refuse d'envoyer s'il trouve un secret dans les fichiers, et n'efface rien chez OVH.
- Il vérifie à la fin que le site répond et que `serveur/lib.php` est bien interdit (403).

## 5. Dire au jeu où est le serveur
- [ ] Dans le Codespace :
  `node outils/configurer.js --serveur https://amidesmots.fr/serveur/ --cle-publique '<ligne CLE_PUBLIQUE>'`
  puis `npm run verifier`, commit, PR, fusion → le robot met en ligne.

## 6. Paiement, IA, tâches planifiées (quand tu veux)
- [ ] Stripe : webhook `https://amidesmots.fr/serveur/abonnement.php` (voir docs/PAIEMENT.md), secret `whsec_…` dans `config-ami.php`.
- [ ] Clé Claude (console Anthropic) dans `config-ami.php` → toutes les fonctions IA s'allument (liste dans docs/IA.md).
- [ ] OVH → Tâches planifiées - Cron : `serveur/veille.php` une fois par semaine.
- [ ] Coin admin : `https://amidesmots.fr/serveur/admin/` (offre, codes cadeaux, fréquentation, veille).

## 7. Après
- GitHub Pages peut rester en secours, ou être coupé : Settings → Pages → désactiver.
- Vérifier une fois par mois : les sauvegardes de la base (OVH les fait automatiquement sur les offres Pro).
