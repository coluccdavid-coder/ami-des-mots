# v5.54 — maisons correctement posées au sol

Dans Mots City, les modèles de bâtiments KayKit n'ont pas tous le même point d'origine. L'ancien code appliquait une échelle fixe sans recalculer le bas du modèle : selon le GLB, la maison pouvait flotter ou avoir une taille disproportionnée.

La nouvelle fonction mesure la boîte englobante réelle du modèle, ajuste sa largeur/hauteur/profondeur à l'emprise prévue, centre le bâtiment sur son emplacement et descend son point le plus bas exactement au niveau du sol (y=0). Les enseignes restent visibles.

À tester dans Mots City : marché, école, maison et café. Vérifier aussi les collisions et l'accès aux portes.
