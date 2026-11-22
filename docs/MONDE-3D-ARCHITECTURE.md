# Architecture cible — monde 3D vivant

## État actuel observé
- `monde-3d.html` porte l'interface et l'entrée du quartier 3D.
- `js/kit3d.js` charge Three.js, GLTFLoader, SkeletonUtils, Sky, post-processing, modèles KayKit/Quaternius.
- `perso()` crée un modèle animé avec `THREE.AnimationMixer`; `jouer()` gère les clips.
- Les modèles et ressources se trouvent dans `assets/3d/`.
- Des tests navigateur existent pour le village, les personnages, les collisions, les véhicules et le sens des déplacements.

## Modules à extraire progressivement
- `js/monde/monde-runtime.js` : boucle de rendu, horloge et cycle de vie.
- `js/monde/streaming-zones.js` : chargement/déchargement des zones.
- `js/monde/navigation.js` : graphe de chemins et évitement simple.
- `js/monde/traffic.js` : véhicules, routes, orientation et roues.
- `js/monde/camera.js` : suivi, collision et réglages.
- `js/monde/ambiance.js` : météo, jour/nuit et sons.
- `js/monde/missions.js` : objectifs, dialogues, activités pédagogiques et récompenses.

Cette extraction se fait progressivement : les scripts existants restent fonctionnels à chaque étape.

## Règles de mouvement
- Le déplacement est défini par un vecteur monde `direction = positionSuivante - positionActuelle`.
- L'avant du véhicule doit être aligné avec `direction` selon l'axe avant réel du modèle GLB (à mesurer pour chaque famille de modèles).
- La rotation des roues dépend de la distance parcourue et du rayon de roue, pas du temps seul.
- Une marche arrière est un état distinct ; ne pas inverser globalement le modèle pour simuler une marche avant.
- Les contrôles gauche/droite sont testés indépendamment de l'orientation de la caméra.

## Budget performance
- Mesurer avant d'optimiser ; viser un profil 30 FPS stable sur l'appareil moyen retenu.
- Instancing pour objets répétés, LOD pour décors, ombres limitées, textures compressées, chargement progressif.
- Qualité adaptative : basse/moyenne/haute, avec fallback WebGL et version classique.
- Aucun effet post-processing coûteux obligatoire sur mobile.
