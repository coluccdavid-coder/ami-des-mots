# Le coin admin : comment y entrer et ce qu'on y fait

## Y entrer
1. **Une seule fois, choisir ton mot de passe.** Dans le Codespace :
   `php -r 'echo password_hash("ton-mot-de-passe-long", PASSWORD_DEFAULT), "\n";'`
   Copie la ligne obtenue (elle commence par `$2y$`) dans `config-ami.php` : `'admin_mdp_hash' => '$2y$…',`
   Le mot de passe lui-même n'est écrit nulle part : seule son empreinte est sur le serveur.
2. **Ouvrir** `https://amidesmots.fr/serveur/admin/` (ton domaine, une fois le site chez OVH).
3. Taper le mot de passe → **Entrer**. 5 essais par minute au plus ; la session se ferme avec « Se déconnecter ».
   Mot de passe oublié : refais l'étape 1 avec un nouveau mot de passe.

Le coin admin a besoin du serveur PHP et de la base : il s'ouvre une fois le site chez OVH (docs/MISE-EN-LIGNE-OVH.md).

## Ce qu'on y fait
| Section | À quoi ça sert |
| --- | --- |
| 📈 Fréquentation | Ouvertures et parties des 30 derniers jours (anonyme) |
| 🪶 Plumes ce mois-ci | Achats, plumes vendues, quota Plus utilisé ; **offrir des plumes** à un code (geste commercial) |
| 💰 Offre et paiement | Allumer le payant, formules (prix, liens Stripe, stores), coins réservés à Plus, thèmes et jeux gratuits |
| 🪶 Plumes magiques (dans l'offre) | Allumer les plumes, quota inclus dans Plus, packs (plumes, prix, lien Stripe, `price_…`, stores) |
| 🎁 Codes cadeaux | Créer des lots de codes qui ouvrent Plus pour 1 à 24 mois (affichés une seule fois : copie-les) |
| 🎁 Accès offerts (v6.0) | **Offrir Plus à qui tu veux** : son code AMI-…, durée (1, 3, 6, 12 mois ou à vie), une petite note pour t'en souvenir ; liste des accès offerts, bouton **Retirer** |
| 🧭 Entonnoir de Plus (v6.0) | Ouvertures du jeu → écran Plus vu → clics sur une formule → abonnements → parrainages récompensés (30 jours) |
| 🛠️ Veille | Valider ou rejeter ce que l'IA a lu dans les programmes et sujets officiels |

Tout réglage est **signé** par le serveur : le jeu l'applique à la prochaine ouverture et refuse toute offre trafiquée.

## Mettre en route les plumes (crédits d'IA)
1. Console Anthropic : une clé API, et une **limite de dépense par mois**. Mettre la clé dans `config-ami.php` (`anthropic_cle`).
2. Stripe : un produit par pack (paiement unique) → un **Payment Link** chacun. Note l'identifiant du prix (`price_…`).
3. Stores (si l'appli est publiée) : produits **consommables** `plumes_petit`, `plumes_moyen`, `plumes_grand`.
4. Admin → Offre → 🪶 : coche les packs, mets plumes, prix affiché, lien Stripe, `price_…`, coche « Allumer les plumes », règle le quota Plus → **Enregistrer et publier**.
5. Relance `schema.sql` dans phpMyAdmin (tables `ami_credits` et `ami_credits_mouvements`).

Prix de départ proposés (à ajuster selon le coût réel vu dans la console Anthropic) : 200 plumes 1,99 € · 600 plumes 4,99 € · 1 500 plumes 9,99 € ; quota Plus 300 par mois.
Une plume = une vanne écrite par l'IA. Quand une famille n'a plus de plumes, Plumo reprend ses vannes : rien n'est bloqué, et l'enfant n'est jamais invité à acheter (achat derrière une question pour adultes).

## Offrir l'accès Plus à quelqu'un (v6.0)
1. La personne ouvre le jeu → **⚙️ Réglages** → elle te donne son code (format `AMI-XXXX-XXXX-XXXX`).
2. Admin → **🎁 Accès offerts** : colle le code, choisis la durée (1, 3, 6, 12 mois ou **à vie**), une note (« Mamie », « cousin Léo »…) → **Offrir**.
3. Le jeu ouvre Plus à sa prochaine ouverture (certificat signé par le serveur, comme un abonnement payé). Rien n'est stocké dans le jeu lui-même : on ne peut pas se l'offrir en trafiquant le téléphone.
4. Pour arrêter : **Retirer** dans la liste. Un code qui a déjà un abonnement payé en cours n'est jamais touché.

Différence avec les **codes cadeaux** : un code cadeau se donne à n'importe qui (il ouvre Plus au premier qui l'entre) ; l'accès offert vise un code précis.

## Parrainage (v6.0)
Une famille Plus envoie son lien depuis l'écran ✨ Plus. Si la famille invitée prend Plus (payé, pas pendant l'essai gratuit), la famille qui invite reçoit un code cadeau d'un mois, affiché dans son écran Plus (12 par an au plus). Il faut un `cadeau_sel` réglé dans `config-ami.php` (sinon la récompense attend).
