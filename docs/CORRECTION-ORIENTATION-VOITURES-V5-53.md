# v5.53 — correction de l'orientation des voitures

Le helper `objet()` appliquait un demi-tour systématique (rotation Y = PI) aux modèles KayKit `car_*`, puis le code de circulation appliquait éventuellement un second demi-tour selon la vitesse. Cette double convention rendait l'orientation incohérente entre les modèles et le mouvement.

La v5.53 retire le demi-tour systématique du helper. Le groupe parent de chaque voiture est désormais le seul endroit qui décide de l'orientation : 0 radian pour un déplacement vers +Z et PI pour un déplacement vers -Z. Les voitures dessinées en secours ont déjà leur avant sur +Z et suivent la même règle.

À vérifier en navigateur : les phares doivent regarder dans le sens du déplacement pour les trois voitures du monde 3D. Si un asset KayKit individuel possède un axe natif différent, il faudra lui appliquer un correctif spécifique au modèle, pas à toutes les voitures.
