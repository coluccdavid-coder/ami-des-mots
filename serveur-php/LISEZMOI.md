# Serveur PHP d'Ami des mots (sans Supabase)

Un seul petit serveur PHP + MySQL fait tout : abonnement Plus (Stripe), salon des battles en direct, vannes proposées
par l'IA, veille des programmes de maths. Il tourne sur un hébergement mutualisé (OVH Perso/Pro, o2switch…) :
**PHP 8.1 ou plus**, MySQL 5.7+ ou MariaDB 10.3+, extensions PDO MySQL, OpenSSL, cURL (présentes chez OVH).

## Installation chez OVH (une fois)
1. **Hébergement** : Web Cloud → Hébergements → ton offre ; dans « Informations générales », choisis PHP 8.2 ou plus.
2. **Base de données** : onglet « Bases de données » → Créer. Note l'hôte (xxx.mysql.db), le nom, l'utilisateur, le mot de passe.
3. **Tables** : phpMyAdmin (bouton dans l'onglet Bases de données) → Importer → `serveur-php/schema.sql`.
4. **Fichiers du site** (FileZilla, en SFTP, dossier `www/`) :
   - le jeu : tout le contenu de `www` fabriqué par `node outils/preparer-www.js www` ;
   - le serveur : le dossier `serveur-php/` copié sous le nom `www/serveur/` (sans `config.exemple.php` si tu veux).
5. **Clé des certificats Plus** : sur ton ordinateur, `node outils/generer-cles.js` → `ami-cle-privee.pem`.
   Dépose-le **au-dessus** de `www/` (à la racine de ton espace, à côté du futur `config-ami.php`). Jamais dans `www/`.
6. **Réglages** : copie `config.exemple.php` en `config-ami.php`, remplis-le, dépose-le au-dessus de `www/`.
   Mot de passe du coin admin serveur : `php -r "echo password_hash('ton-mot-de-passe', PASSWORD_DEFAULT), PHP_EOL;"`.
7. **Le jeu parle au serveur** : dans ton dépôt,
   `node outils/configurer.js --serveur https://ton-domaine.fr/serveur/ --cle-publique '<ligne CLE_PUBLIQUE affichée à l'étape 5>' --paiement https://buy.stripe.com/…`
   puis `npm run verifier`, et republie le jeu.
8. **Stripe** : Développeurs → Webhooks → ajouter `https://ton-domaine.fr/serveur/abonnement.php`, événements :
   `checkout.session.completed`, `checkout.session.async_payment_succeeded`, `customer.subscription.updated`,
   `customer.subscription.deleted`. Copie le secret `whsec_…` dans `config-ami.php`.
9. **Veille des programmes** (facultatif, clé Claude nécessaire) : OVH → Hébergement → « Tâches planifiées - Cron » →
   `serveur/veille.php`, une fois par semaine. Puis `https://ton-domaine.fr/serveur/admin/` pour valider.

## Points d'entrée
| Fichier | Rôle |
|---|---|
| `abonnement.php` | GET : certificat Plus signé ; POST : webhook Stripe signé (rejeu refusé, doublons annulés) |
| `vannes.php` | Vannes proposées par Claude (Plus, 5/jour), triées ensuite par le juge d'Ami et un adulte |
| `salon.php` | Salon des battles : présence + messages, rafraîchis environ chaque seconde ; rien n'est gardé |
| `programme.php` | Carte des programmes de maths et sujets officiels **validés** |
| `veille.php` | Lit les documents officiels (`veille-sources.php`) et propose ; rien n'est publié sans validation |
| `admin/` | Compte admin (mot de passe) : 💰 offre et paiement (payant, prix, liens Stripe, ce qui est Plus) + validation de la veille |
| `vanne-juge.php` | L'IA trie les vannes ajoutées au paquet du Clash libre (refuse ce qui vise la personne, vérifie l'anglais) |
| `offre.php` | Donne au jeu l'offre réglée dans l'admin, signée (rien de secret) |
| `cadeau.php` / `magasin.php` | Codes cadeaux ; achats Google Play / App Store vérifiés auprès des stores |
| `visite.php` | Fréquentation anonyme (v5.95) : totaux par jour, sans cookie ni identifiant ni IP gardée ; visible dans l'admin (📈) |
| `plumes.php` | Solde de plumes magiques d'un code (v5.99) ; les plumes se règlent dans l'admin (docs/ADMIN.md) |
| `ligue.php` | Ligue de la semaine (v6.0) : créer, rejoindre, points (60 par envoi, 5 000 par semaine), classement, quitter ; pseudo filtré, 40 membres |
| `classe.php` | Défi de classe (v6.0) : le prof crée un défi (code + clé montrée une fois), les élèves envoient leur meilleur score, effacé après 60 jours |
| `parrainage.php` | Parrainage (v6.0) : lien entre deux codes ; un mois offert au parrain quand le filleul prend Plus |
| `explique.php` | Plumo réexplique après 3 erreurs (v6.0) : 2 plumes, 40 par jour et par IP au plus |
| `correction.php` | Correction par Plumo (v6.0) : note, points forts, conseils, version corrigée ; 5 plumes ; texte non conservé |
| `devoirs.php` | Aide aux devoirs (v6.35), toutes matières : reformule la consigne, rappelle la leçon, donne une méthode, pose des questions, relit le travail — **ne fait jamais le devoir**, sans vanne. Énoncé collé, photo (JPEG/PNG/WebP) ou PDF. Plumes : aide 3, +2 avec photo ou PDF, question de suivi 1, relecture 3 (clé `devoirs_plumes`). Modèle : `anthropic_modele_devoirs`. Rien n'est conservé. 8 demandes par minute et par adresse IP. Le serveur doit accepter des envois de 6 Mo (`post_max_size`). |

## Sécurité
- Aucun secret dans le dépôt ni dans le navigateur : clés Stripe, Claude et clé privée restent dans `config-ami.php` et le `.pem`, hors du site.
- Le `.htaccess` bloque `lib.php`, les fichiers de réglages, `.pem`, `.sql`, `.md`.
- Limites par adresse (empreinte, jamais l'adresse en clair). Seules les origines listées (`origines`) peuvent appeler le serveur ;
  ajoute `https://localhost` pour l'appli Android.
- Données gardées : codes d'abonnement anonymes et leur état ; le salon oublie tout en quelques minutes.

## Tests (sur ton ordinateur ou le Codespace)
`outils/tests-serveur/test-serveur-php.js` : 33 vérifications sur une vraie base MariaDB (Stripe et Claude simulés).

## Vannes écrites en direct par l'IA (v5.66)

`vannes-direct.php` : à chaque question, le jeu envoie la question, la bonne réponse, les mauvaises réponses
possibles et les 30 dernières vannes déjà dites ; Claude répond une vanne neuve par mauvaise réponse, avec un
« angle » tiré au hasard (flash info, commentaire de match, GPS qui recalcule…) pour ne jamais retomber dans les
mêmes formules. Rien de personnel n'est envoyé. Le jeu repasse chaque vanne au juge d'Ami et garde ses propres
vannes si le serveur ne répond pas.

Réglages dans `config-ami.php` : `anthropic_cle` (obligatoire), `vannes_direct` (true/false),
`vannes_direct_par_jour` (plafond par appareil, 300 par défaut). Coût indicatif : une demande par question,
modèle rapide (`anthropic_modele`).
