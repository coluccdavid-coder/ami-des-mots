# v5.50 — correction des commandes et directions

- Monde 3D : déplacement latéral calculé explicitement dans le repère du joueur/caméra. La commande droite produit désormais un déplacement vers la droite de l'écran lorsque la caméra suit le joueur.
- Mots City : inversion du signe de braquage corrigée pour le piéton et les véhicules. Droite augmente le cap, gauche le diminue.
- Les modèles et la logique de circulation existants sont conservés.

À valider visuellement dans le navigateur : marche à pied à gauche/droite, conduite avant/arrière et sens visuel des véhicules. L'orientation exacte des modèles 3D dépend de leurs axes internes ; si un modèle reste inversé, il faudra ajuster son pivot après observation en jeu.
