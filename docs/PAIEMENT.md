# Le payant d'Ami des mots : tous les moyens de payer

Tout se règle dans le **compte admin** du serveur (`https://ton-domaine.fr/serveur/admin/` → « 💰 Offre et paiement »),
une fois le serveur en ligne chez OVH. Rien n'est ouvert sans vérification par le serveur : chaque paiement, achat ou
code cadeau produit un certificat signé par ta clé privée, que le jeu vérifie.

| Moyen | Où | Ce qu'il faut |
| --- | --- | --- |
| Mensuel, annuel, famille (Stripe) | Site web | Un « Payment Link » Stripe par formule, en mode abonnement |
| À vie (Stripe) | Site web | Un « Payment Link » en paiement unique |
| Essai gratuit | Site et stores | Réglé sur le prix dans Stripe / dans les consoles des stores ; texte affiché dans l'admin |
| Codes promo | Site web | Créés dans Stripe, case « Autoriser les codes promo » sur le Payment Link |
| Codes cadeaux | Site et appli | Créés dans l'admin (« 🎁 Codes cadeaux ») |
| Google Play Billing | Appli Android | Produits dans la Play Console + compte de service |
| Achat intégré Apple | Appli iPhone | Produits dans App Store Connect + clé « In-App Purchase » |

## 1. Stripe (site web)

1. Stripe → Produits : crée « Ami des mots Plus » avec un prix par formule (mensuel, annuel, famille, et un prix unique pour « à vie »).
   Pour un essai gratuit, règle-le sur le prix (« période d'essai »).
2. Pour chaque prix : **Créer un lien de paiement** ; coche « Autoriser les codes promo » si tu veux des codes promo.
3. Webhook (Stripe → Développeurs → Webhooks) vers `https://ton-domaine.fr/serveur/abonnement.php` avec les événements :
   `checkout.session.completed`, `checkout.session.async_payment_succeeded`, `customer.subscription.updated`,
   `customer.subscription.deleted`, `charge.refunded`. Copie le secret `whsec_…` dans `config-ami.php`.
4. Admin → « 💳 Formules » : coche les formules, colle chaque lien `https://buy.stripe.com/…`, le prix affiché et le texte de l'essai.
5. Portail client Stripe : colle son lien dans « Portail client Stripe » (résiliation par le client).

## 2. Codes cadeaux

Admin → « 🎁 Codes cadeaux » : nombre, durée en mois, nom du lot → **Créer**. Les codes (`CADEAU-XXXX-XXXX`) ne
s'affichent qu'une fois : copie-les. Le joueur les saisit dans « ✨ Plus » → « J'ai un code cadeau ».
Un code ne sert qu'une fois ; deux codes s'additionnent ; un code ne s'ajoute pas à un abonnement payant en cours.

## 3. Google Play (appli Android)

1. Play Console → Monétiser → Produits : crée les abonnements `plus_mensuel`, `plus_annuel`, `plus_famille`
   et le produit `plus_a_vie` (achat unique). Essai gratuit : dans l'« offre » de l'abonnement.
2. Play Console → Configuration → Accès à l'API : relie un projet Google Cloud, crée un **compte de service**, donne-lui
   les droits « Afficher les données financières » et « Gérer les commandes et les abonnements ».
3. Télécharge sa clé JSON et range-la **hors du site** ; indique son chemin dans `google_compte_service` (`config-ami.php`).
4. L'appli Android est fabriquée avec le module de paiement (`cordova-plugin-purchase`, déjà dans `.github/workflows/android.yml`).
5. Teste avec un « testeur de licence » (Play Console → Configuration → Test de licence) avant de publier.

## 4. App Store (appli iPhone)

1. App Store Connect → ton appli → Achats intégrés / Abonnements : mêmes identifiants qu'Android.
2. Utilisateurs et accès → Intégrations → **Achats intégrés** : génère une clé, télécharge le fichier `.p8` (une seule fois),
   range-le hors du site. Note le **Key ID** et l'**Issuer ID** dans `config-ami.php` (`apple_key_id`, `apple_issuer_id`).
3. Pour les tests : `'apple_environnement' => 'sandbox'` et un compte de test « Sandbox ». Repasse en `production` avant la sortie.
4. L'appli iPhone se fabrique avec Capacitor sur un Mac (ou un service de compilation en ligne), avec le même module de paiement.

## 5. Vérifier

- Compte admin → « Activer le payant » coché, formules remplies, **Enregistrer et publier**.
- Sur le site : « ✨ Plus » montre une carte par formule ; un paiement de test Stripe ouvre Plus.
- Dans l'appli : les formules cochées « Stores » s'affichent avec le prix du store ; « Restaurer mes achats » retrouve un achat.

## Sécurité (ce qui est déjà fait)

- Le jeu n'ouvre Plus qu'avec un certificat signé par le serveur (clé privée hors du site).
- Les achats des stores sont vérifiés directement chez Google et Apple (un faux jeton ou l'achat d'une autre appli est refusé).
- Les codes cadeaux ne sont gardés qu'en empreinte ; 10 essais par minute au plus.
- Un remboursement Stripe d'un achat « à vie » coupe l'accès ; un abonnement d'un store renouvelé est repris automatiquement.
- Aucune clé secrète dans le jeu ni dans le dépôt.
