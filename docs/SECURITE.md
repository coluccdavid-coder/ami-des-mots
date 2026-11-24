# Sécurité du serveur : bilan de la relecture (v5.95)

Relecture de tous les points d'accès de `serveur-php/` comme le ferait un attaquant.

## Ce qui était déjà solide

| Point | Protection |
| --- | --- |
| Plus | Ouvert seulement par un certificat signé (clé privée hors du site, vérifiée par le jeu). |
| Base de données | Requêtes préparées partout (pas d'injection SQL). |
| Compte admin | Mot de passe haché, 5 essais par minute, cookie `HttpOnly` + `SameSite=Strict` + `Secure` en HTTPS, jeton anti-falsification, en-têtes CSP et anti-iframe. |
| Webhook Stripe | Signature HMAC vérifiée, horodatage limité à 5 minutes, événements déjà traités ignorés. |
| Achats des stores | Vérifiés directement chez Google et Apple ; achat d'une autre appli ou faux jeton refusés. |
| Appels au serveur | Origines autorisées (CORS), limites par adresse et par minute, corps limité en taille. |
| Salon | Messages effacés après 2 minutes ; texte échappé à l'affichage (pas d'injection de code chez un autre joueur). |
| IA | Clé seulement sur le serveur ; plafond d'appels par jour. |

## Corrigé dans cette version

| Risque | Correction |
| --- | --- |
| Fichiers secrets téléchargeables s'ils étaient posés dans le dossier du site (`.json`, `.p8`, `.sqlite`, journaux…) | `.htaccess` les interdit, ainsi que les bibliothèques internes. |
| Un code cadeau utilisé deux fois par deux demandes simultanées | Le code est réservé d'abord, en une seule opération (testé : 5 demandes simultanées → 1 seule réussit). |
| Vol d'un achat Apple par quelqu'un qui connaîtrait son numéro de transaction | Changement de code limité à une fois par 24 h. |
| Codes cadeaux devinables si le secret `cadeau_sel` n'est pas réglé | Codes cadeaux désactivés tant que le secret n'est pas réglé (16 caractères minimum). |

## Ajouté en v5.95

- `visite.php` : compteur de fréquentation anonyme. Seuls des totaux par jour sont gardés (événement, plateforme) ;
  aucune IP, aucun cookie, aucun identifiant ; limite anti-abus (20 envois par minute) ; « Ne pas me suivre » respecté.
- Rappels de l'appli : notifications locales planifiées sur le téléphone, sans serveur, désactivées par défaut.

## Ajouté en v5.99 : plumes magiques
- Solde gardé sur le serveur seulement ; retrait par un UPDATE conditionnel (jamais sous zéro, même avec des appels simultanés — essayé : 6 appels en même temps, solde exact).
- Chaque achat crédité une seule fois (référence unique : paiement Stripe, jeton Google, transaction Apple) ; un remboursement retire le pack.
- Le nombre de plumes d'un pack vient de l'admin, jamais du téléphone ; le pack Stripe est reconnu par son prix `price_…`, et ne peut pas ouvrir Plus « à vie ».
- Plumes éteintes : rien ne change, aucun code n'est envoyé avec les vannes.

## Ajouté en v6.0 : ligue, défi de classe, parrainage, IA, accès offerts
- **Ligue** : pas de compte ; un jeton d'appareil au hasard dont le serveur ne garde que l'empreinte (sha256). Pseudos filtrés (juge de Plumo, pas de numéro), 60 points par envoi, 5 000 par semaine, 40 membres. Effacement après 15 jours.
- **Défi de classe** : la clé du prof est montrée une seule fois et gardée en empreinte ; sans elle, ni résultats ni fermeture (403). Score borné au total, meilleur score gardé, 60 élèves, effacé après 60 jours.
- **Parrainage** : seulement pour une famille jamais abonnée, une seule fois ; récompense au paiement réel (pas pendant l'essai), 12 par an ; le code cadeau passe par la même vérification que les autres.
- **Accès offerts** : uniquement depuis l'admin (mot de passe + jeton anti-CSRF) ; Plus est donné par le certificat signé du serveur, jamais par un réglage du jeu. Un abonnement payé en cours n'est jamais écrasé.
- **IA** : plumes prélevées avant l'appel et rendues si l'IA échoue ; limite par IP et par jour ; textes d'élèves non conservés ; réponses marquées 🤖.
- **Oral noté** : désactivé sans l'accord d'un parent ; aucun son enregistré ni envoyé par le jeu.

## À faire au moment de la mise en ligne

- Relancer `schema.sql` (nouvelle table `ami_visites`).

- Ranger `config-ami.php`, la clé privée, la clé Google (`.json`) et la clé Apple (`.p8`) **un dossier au-dessus** du site.
- Activer HTTPS (OVH : certificat Let's Encrypt gratuit) et forcer la redirection vers HTTPS.
- Mettre un mot de passe admin long (au moins 16 caractères).
- Régler `cadeau_sel` et `veille_jeton` avec de longues phrases au hasard.
- Sauvegardes de la base : OVH propose des sauvegardes automatiques de la base MySQL ; vérifier qu'elles sont activées.
- Le jeton de la veille passe dans l'adresse (`?jeton=`) : il peut apparaître dans les journaux d'OVH. Le changer s'il fuit.
