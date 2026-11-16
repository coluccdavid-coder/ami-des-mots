# Ami des Mots v5.3 — guide de test

## 1. Préparer le projet
- Décompresser l'archive dans un dossier.
- Installer Node.js (version LTS recommandée).
- Ouvrir un terminal dans le dossier du projet.
- Exécuter `npm install`.

## 2. Vérifier les tests automatisés
- Exécuter `npm test`.
- Pour reconstruire le service worker puis lancer les tests : `npm run verifier`.

Les tests ont besoin des dépendances du projet (`jsdom` notamment). Ils ne peuvent pas être lancés tant que `npm install` n'a pas été effectué.

## 3. Lancer le jeu en local
Le service worker ne fonctionne pas correctement en ouvrant simplement `index.html` avec `file://`.
Depuis le dossier du projet, lancer par exemple :
- `python -m http.server 8000`
- Ouvrir `http://localhost:8000` dans le navigateur.

Tester sur ordinateur puis sur téléphone (ou avec le mode responsive des outils développeur).

## 4. Parcours à vérifier
- Accueil et choix des langues.
- Jeux gratuits et contenus Plus/verrouillés.
- Atelier des phrases : remettre les mots dans l'ordre, demander un indice, terminer les 12 phrases.
- Village : ouvrir les lieux et vérifier les thèmes proposés.
- Révisions, carnet, trophées, vestiaire et réglages.
- Rechargement de la page et fonctionnement hors connexion après une première visite.

## 5. Paiements
Ne pas utiliser de vrais paiements pendant les essais. Pour tester l'abonnement, configurer un environnement Stripe/Supabase de test et les variables/secrets de test correspondants. Ne jamais publier de clés secrètes dans le code client ni dans un dépôt public.

## État des vérifications effectuées lors de la préparation de cette archive
- Archive ZIP vérifiée (test d'intégrité OK).
- Syntaxe vérifiée sur les principaux fichiers JavaScript.
- Les références locales d'assets repérées dans le service worker existent.
- `npm test` n'a pas pu être exécuté ici car `jsdom` n'était pas installé dans l'environnement de préparation ; lancer `npm install` avant les tests.
- Les essais réels dans plusieurs navigateurs et appareils restent à effectuer.


## Nouveautés v5.4 à tester
- Faire exprès une mauvaise réponse : vérifier que l'écran reste bloqué, que la réponse erronée est rouge et que le message reste visible.
- Vérifier que la voix lit la blague puis la bonne réponse.
- Utiliser « J'ai compris — continuer » pour passer à la question suivante.
- Dans Réglages, essayer les quatre niveaux d'humour et vérifier que le choix est mémorisé pour le profil.
- Refaire le test avec le mode chronomètre : le passage à la suite doit respecter la fin du temps.


## Nouveautés v5.5 à tester — synchronisation bouche/voix
- Ouvrir « Voir la bouche » et écouter un mot : les lèvres doivent commencer à bouger au début réel de la voix.
- Vérifier la fin : la bouche doit revenir au repos à la fin de la lecture.
- Refaire le test avec « Lentement » : les mouvements doivent rester alignés sur la voix ralentie.
- Tester plusieurs langues, notamment une langue cible différente de la langue de l'interface.
- Tester sur ordinateur et téléphone ; le navigateur peut utiliser une voix audio différente selon la langue et la disponibilité du fichier.
