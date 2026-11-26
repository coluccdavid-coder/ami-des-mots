# Ce que fait l'IA une fois la clé Claude branchée

Réglage unique : `anthropic_cle` dans `config-ami.php` (sur le serveur OVH, jamais dans le jeu).
Sans clé, le jeu marche entièrement avec ses propres vannes ; chaque fonction ci-dessous s'allume toute seule.
Aucune donnée personnelle n'est envoyée à l'IA : ni prénom, ni code Plus, ni voix.

| Fonction | Ce qu'elle fait | Pour qui | Garde-fous |
| --- | --- | --- | --- |
| Leçon réexpliquée (`lecon.php`, v6.54) | Bouton 📖 « Je n’ai pas compris la leçon » à côté de chaque chapitre (et en fin de série sous 70 %) : Plumo réexplique tout le chapitre, puis répond à 3 questions de l’élève au plus | Tous (1 plume par réponse si les plumes sont allumées) | Seuls le chapitre, ses règles et la question partent ; questions avec lien, adresse ou numéro refusées ; 30 réponses/jour/IP (`lecon_par_jour`) ; sans IA, la fiche de la leçon reste affichée |
| Vannes en direct (`vannes-direct.php`) | Pour la question à l'écran, une vanne **neuve** par mauvaise réponse, au ton choisi (Tout doux → Trash talk), sans répéter les dernières | Tous (réglage « Vannes inventées en direct ») | Repassée au juge de Plumo ; si l'IA tarde, Plumo garde ses vannes ; 40 demandes/min par appareil |
| Juge du paquet de vannes (`vanne-juge.php`) | Clash libre : trie les vannes ajoutées par les joueurs (refuse ce qui vise le physique, la famille, l'origine ; vérifie l'anglais) | Tous | Le juge local passe avant ; sans IA, seul le juge local décide |
| Vannes proposées (`vannes.php`) | Génère des lots de vannes par thème et par ton, à valider par un adulte avant d'entrer dans le jeu | Plus (5 demandes/jour) | Validation humaine obligatoire |
| Veille des programmes (`veille.php`) | Lit les textes officiels (programmes, sujets de brevet et de bac) et **propose** la carte des chapitres et la liste des annales | Toi (coin admin) | Rien n'est publié sans ton clic dans l'admin ; liens vers les sujets, jamais recopiés |

Modèles par défaut : un modèle rapide pour les vannes, un plus fort pour la veille (`anthropic_modele`, `anthropic_modele_veille`).
Coût : surveiller la console Anthropic les premières semaines ; y fixer une limite de dépense mensuelle.

## Plumes magiques (v5.99)
Allumées dans l'admin, chaque vanne écrite par l'IA coûte une plume (le tri du Clash libre aussi). Quota mensuel inclus dans Plus, packs en vente (Stripe, Google Play, App Store). Sans plumes, Plumo reprend ses vannes. Mise en route : docs/ADMIN.md.
