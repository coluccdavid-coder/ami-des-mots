# Ce que fait l'IA une fois la clé Claude branchée

Réglage unique : `anthropic_cle` dans `config-ami.php` (sur le serveur OVH, jamais dans le jeu).
Sans clé, le jeu marche entièrement avec ses propres vannes ; chaque fonction ci-dessous s'allume toute seule.
Aucune donnée personnelle n'est envoyée à l'IA : ni prénom, ni code Plus, ni voix.

| Fonction | Ce qu'elle fait | Pour qui | Garde-fous |
| --- | --- | --- | --- |
| Vannes en direct (`vannes-direct.php`) | Pour la question à l'écran, une vanne **neuve** par mauvaise réponse, au ton choisi (Tout doux → Trash talk), sans répéter les dernières | Tous (réglage « Vannes inventées en direct ») | Repassée au juge de Plumo ; si l'IA tarde, Plumo garde ses vannes ; 40 demandes/min par appareil |
| Juge du paquet de vannes (`vanne-juge.php`) | Clash libre : trie les vannes ajoutées par les joueurs (refuse ce qui vise le physique, la famille, l'origine ; vérifie l'anglais) | Tous | Le juge local passe avant ; sans IA, seul le juge local décide |
| Vannes proposées (`vannes.php`) | Génère des lots de vannes par thème et par ton, à valider par un adulte avant d'entrer dans le jeu | Plus (5 demandes/jour) | Validation humaine obligatoire |
| Veille des programmes (`veille.php`) | Lit les textes officiels (programmes, sujets de brevet et de bac) et **propose** la carte des chapitres et la liste des annales | Toi (coin admin) | Rien n'est publié sans ton clic dans l'admin ; liens vers les sujets, jamais recopiés |

Modèles par défaut : un modèle rapide pour les vannes, un plus fort pour la veille (`anthropic_modele`, `anthropic_modele_veille`).
Coût : surveiller la console Anthropic les premières semaines ; y fixer une limite de dépense mensuelle.
