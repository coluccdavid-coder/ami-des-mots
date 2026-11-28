<?php
// Ami des mots — réglages du serveur. Copier ce fichier en « config-ami.php » UN DOSSIER AU-DESSUS du site
// (ex. /home/moncompte/config-ami.php si le site est dans /home/moncompte/www/), pour qu'il ne soit jamais
// téléchargeable. À défaut, « config.php » dans ce dossier (le .htaccess en interdit l'accès).
// Ne jamais mettre ce fichier rempli dans GitHub.
return [
  // Base MySQL (OVH : Web Cloud → Hébergements → Bases de données).
  'db_dsn' => 'mysql:host=xxxxx.mysql.db;dbname=xxxxx;charset=utf8mb4',
  'db_user' => 'xxxxx',
  'db_pass' => 'xxxxx',

  // Adresses autorisées à appeler le serveur (le site, et l'appli Android : https://localhost).
  'origines' => ['https://ami-des-mots.fr', 'https://localhost'],

  // Certificats Plus : clé PRIVÉE (fichier PEM produit par node outils/generer-cles.js), hors du site.
  'cle_privee_pem' => __DIR__ . '/ami-cle-privee.pem',

  // Stripe (abonnement Plus) : clé secrète et secret du webhook (Stripe → Développeurs → Webhooks).
  'stripe_secret' => 'sk_live_...',
  'stripe_webhook_secret' => 'whsec_...',

  // v5.94 — Codes cadeaux : un mot secret pour l'empreinte des codes (une longue phrase au hasard, à ne jamais changer).
  'cadeau_sel' => 'change-moi-par-une-longue-phrase-secrete',

  // v5.94 — Achats dans l'appli Android (Google Play). Fichier JSON du compte de service (Play Console → Configuration →
  // Accès à l'API ; droits « Afficher les données financières » et « Gérer les commandes ») rangé HORS du site.
  'google_compte_service' => __DIR__ . '/google-compte-service.json',
  'android_package' => 'fr.amidesmots.app',

  // v5.94 — Achats dans l'appli iPhone (App Store). Clé « In-App Purchase » (App Store Connect → Utilisateurs et accès →
  // Intégrations → Achats intégrés) : fichier .p8 HORS du site, son identifiant (Key ID) et l'identifiant de l'émetteur (Issuer ID).
  'apple_cle_p8' => __DIR__ . '/apple-achats.p8',
  'apple_key_id' => '',
  'apple_issuer_id' => '',
  'apple_bundle_id' => 'fr.amidesmots.app',
  'apple_environnement' => 'production',   // 'sandbox' pour les tests avec des comptes de test Apple

  // Produits des stores (mêmes identifiants dans Google Play et App Store) : abonnement ou paiement unique (« a_vie »).
  'magasin_produits' => ['plus_mensuel' => 'abonnement', 'plus_annuel' => 'abonnement', 'plus_famille' => 'abonnement', 'plus_a_vie' => 'a_vie'],

  // Claude (vannes proposées par l'IA, veille des programmes). Vide : fonctions désactivées.
  'anthropic_cle' => '',
  'anthropic_modele' => 'claude-haiku-5-5',          // vannes : rapide, peu cher
  'anthropic_modele_veille' => 'claude-sonnet-5-5',  // lecture des programmes et annales
  // v6.35 : aide aux devoirs (devoirs.php). Lit aussi les photos et les PDF de devoirs. Un modèle plus solide guide mieux.
  'anthropic_modele_devoirs' => 'claude-sonnet-5-5',
  // Coût en plumes de l'aide aux devoirs (seulement si les plumes sont allumées dans l'admin).
  'devoirs_plumes' => ['aide' => 3, 'fichier' => 2, 'suite' => 1, 'relire' => 3],
  // Vannes écrites en direct par l'IA à chaque question (vannes-direct.php) : true/false, et plafond par appareil et par jour.
  'vannes_direct' => true,
  'vannes_direct_par_jour' => 300,
  'controle_par_jour' => 20,                        // v7.3 : contrôles fabriqués par l'IA, par jour et par IP
  'copie_par_jour' => 10,                           // v7.7 : copies entières corrigées par l'IA, par jour et par IP

  // Coin admin du serveur (veille) : mot de passe en empreinte. Pour la fabriquer :
  //   php -r "echo password_hash('mon-mot-de-passe', PASSWORD_DEFAULT), PHP_EOL;"
  'admin_mdp_hash' => '',
  // Lancement de la veille par une tâche planifiée web (OVH : « Tâches planifiées - Cron ») : jeton secret.
  'veille_jeton' => '',
  // v6.75 : publication sans validation pour certaines sortes de la veille (vide = tout passe par le coin admin).
  // Possibles : 'programme', 'annales', 'epreuve', 'diplome'. Les nouvelles QUESTIONS demandent toujours la validation d'un adulte.
  'veille_publication_auto' => [],
  // v6.75 : nombre de nouveaux chapitres pour lesquels l'IA rédige 20 questions à chaque passage (0 à 6).
  'veille_chapitres_max' => 2,
];
