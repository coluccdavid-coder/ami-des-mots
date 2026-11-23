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

  // Claude (vannes proposées par l'IA, veille des programmes). Vide : fonctions désactivées.
  'anthropic_cle' => '',
  'anthropic_modele' => 'claude-haiku-5-5',          // vannes : rapide, peu cher
  'anthropic_modele_veille' => 'claude-sonnet-5-5',  // lecture des programmes et annales
  // Vannes écrites en direct par l'IA à chaque question (vannes-direct.php) : true/false, et plafond par appareil et par jour.
  'vannes_direct' => true,
  'vannes_direct_par_jour' => 300,

  // Coin admin du serveur (veille) : mot de passe en empreinte. Pour la fabriquer :
  //   php -r "echo password_hash('mon-mot-de-passe', PASSWORD_DEFAULT), PHP_EOL;"
  'admin_mdp_hash' => '',
  // Lancement de la veille par une tâche planifiée web (OVH : « Tâches planifiées - Cron ») : jeton secret.
  'veille_jeton' => '',
];
