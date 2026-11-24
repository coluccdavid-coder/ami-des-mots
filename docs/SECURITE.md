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

## À faire au moment de la mise en ligne

- Relancer `schema.sql` (nouvelle table `ami_visites`).

- Ranger `config-ami.php`, la clé privée, la clé Google (`.json`) et la clé Apple (`.p8`) **un dossier au-dessus** du site.
- Activer HTTPS (OVH : certificat Let's Encrypt gratuit) et forcer la redirection vers HTTPS.
- Mettre un mot de passe admin long (au moins 16 caractères).
- Régler `cadeau_sel` et `veille_jeton` avec de longues phrases au hasard.
- Sauvegardes de la base : OVH propose des sauvegardes automatiques de la base MySQL ; vérifier qu'elles sont activées.
- Le jeton de la veille passe dans l'adresse (`?jeton=`) : il peut apparaître dans les journaux d'OVH. Le changer s'il fuit.
