# L'appli Android d'Ami des mots (et l'installation depuis le site)

## 1. Installer depuis le site (iPhone, Android, PC) — gratuit, tout de suite
- **Android / PC (Chrome, Edge)** : sur la page d'accueil, bouton **📲 Installer l'appli** (il apparaît quand le navigateur le permet).
- **iPhone / iPad (Safari)** : bouton Partager → **Sur l'écran d'accueil**.
Le jeu marche ensuite hors connexion (sauf salon, abonnement et IA qui demandent le serveur).

## 2. Le vrai fichier Android (APK, Play Store)
L'appli est fabriquée **par GitHub** (pas besoin d'Android Studio) avec Capacitor : le jeu est embarqué dans l'appli,
il marche hors connexion, la voix utilise le moteur du téléphone, le micro est demandé pour « Répète après Plumo ».
1. Pousse ton code sur GitHub (branche `main`).
2. GitHub → onglet **Actions** → **Appli Android** → **Run workflow**.
3. Après ~10 minutes : en bas de la page de l'exécution, **Artifacts → ami-des-mots-android** (zip avec `app-debug.apk`).
4. Sur un téléphone Android : envoie-toi l'APK, ouvre-le, autorise « sources inconnues » pour l'installer (test).

Pour le serveur, ajoute `https://localhost` dans `origines` de `config-ami.php` (l'appli s'annonce avec cette adresse).

## 3. Publier sur le Play Store (quand tu es prêt)
1. Compte développeur Google Play (frais d'inscription uniques).
2. Clé de signature, UNE fois, sur ton ordinateur (Java installé) :
   `keytool -genkey -v -keystore ami.keystore -alias ami -keyalg RSA -keysize 2048 -validity 10000`
   **Garde ce fichier et ses mots de passe précieusement** (sans eux, plus de mise à jour possible). Jamais dans le dépôt.
3. GitHub → Settings → Secrets and variables → Actions → New repository secret :
   `AMI_KEYSTORE_B64` (= `base64 -w0 ami.keystore`), `AMI_KEYSTORE_MDP`, `AMI_CLE_ALIAS` (= ami), `AMI_CLE_MDP`.
4. Relance **Appli Android** : l'artefact contient alors `app-release.aab`, à téléverser dans la Play Console.
5. Play Console : fiche (captures, description), **politique de confidentialité**, questionnaire « public cible »
   (appli pour enfants → règles « Familles » de Google), classification du contenu.
Chaque version a un numéro tiré de `package.json` (5.44.0 → 54400) : pense à l'augmenter avant chaque envoi.

## 4. Le site sur GitHub Pages (en attendant OVH)
GitHub → Settings → Pages → Source : **GitHub Actions**. À chaque fusion dans `main`, le workflow **Site GitHub Pages**
publie le jeu sur `https://coluccdavid-coder.github.io/ami-des-mots/`. Sans serveur PHP : pas d'abonnement, de salon
en direct ni d'IA (le défi par lien, lui, marche).
