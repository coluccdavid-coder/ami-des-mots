# Phase de lancement — univers entièrement gratuit

Pendant cette phase, Ami des Mots ne propose aucun abonnement ni verrouillage de contenu.

- Tous les thèmes et toutes les familles de jeux sont ouverts.
- Les activités, mondes 3D, maths et sciences ne sont pas réservés à un abonnement.
- Jusqu'à six profils familiaux sont accessibles sur le même appareil.
- Les fonctions Stripe / Plus sont conservées dans le code pour une éventuelle réactivation future, mais `MODE_PAYANT` est désactivé dans `js/jeu.js`, `js/offre.js` et `js/config-site.js`.
- Les services qui nécessitent réellement un serveur externe (salon en direct, génération IA) peuvent rester indisponibles si le serveur n'est pas configuré ; les contenus pédagogiques locaux restent accessibles.

Pour réactiver un modèle payant ultérieurement, il faudra le décider explicitement et tester tous les parcours de paiement avant publication.
