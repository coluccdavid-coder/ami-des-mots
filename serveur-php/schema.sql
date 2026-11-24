-- Ami des mots — base MySQL / MariaDB (OVH mutualisé, o2switch… : PHP 8.1+, MySQL 5.7+ ou MariaDB 10.3+).
-- À exécuter une fois (phpMyAdmin → Importer). Aucune donnée sur les enfants : seulement des codes anonymes.

CREATE TABLE IF NOT EXISTS ami_abonnements (
  code VARCHAR(20) NOT NULL PRIMARY KEY,
  client VARCHAR(100) NULL,
  abonnement VARCHAR(100) NULL UNIQUE,
  statut VARCHAR(30) NOT NULL,
  fin DATETIME NULL,
  maj DATETIME NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Événements Stripe déjà traités (Stripe peut renvoyer le même événement).
CREATE TABLE IF NOT EXISTS ami_evenements_stripe (
  event_id VARCHAR(100) NOT NULL PRIMARY KEY,
  type VARCHAR(80) NOT NULL,
  traite DATETIME NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Générateur de vannes : demandes par jour et par code Plus.
CREATE TABLE IF NOT EXISTS ami_vannes_appels (
  code VARCHAR(20) NOT NULL,
  jour DATE NOT NULL,
  n INT NOT NULL DEFAULT 0,
  PRIMARY KEY (code, jour)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Salon des battles : qui est là (oublié après quelques secondes sans nouvelles) et messages récents (2 minutes).
CREATE TABLE IF NOT EXISTS ami_salon_presence (
  sujet VARCHAR(80) NOT NULL,
  cle VARCHAR(40) NOT NULL,
  meta VARCHAR(1000) NOT NULL DEFAULT '',
  vu BIGINT NOT NULL,
  PRIMARY KEY (sujet, cle),
  KEY vu (vu)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS ami_salon_messages (
  id BIGINT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  sujet VARCHAR(80) NOT NULL,
  evenement VARCHAR(30) NOT NULL,
  charge VARCHAR(2000) NOT NULL,
  t BIGINT NOT NULL,
  KEY sujet_id (sujet, id),
  KEY t (t)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Limite de requêtes par adresse (empreinte, jamais l'adresse en clair).
CREATE TABLE IF NOT EXISTS ami_limites (
  empreinte CHAR(16) NOT NULL,
  minute BIGINT NOT NULL,
  n INT NOT NULL DEFAULT 0,
  PRIMARY KEY (empreinte, minute)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Veille des programmes et annales : propositions de l'IA, publiées seulement après validation d'un adulte.
CREATE TABLE IF NOT EXISTS ami_veille (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  sorte VARCHAR(20) NOT NULL,
  classe VARCHAR(10) NOT NULL,
  source VARCHAR(500) NOT NULL,
  empreinte_source CHAR(64) NOT NULL,
  proposition MEDIUMTEXT NOT NULL,
  statut VARCHAR(20) NOT NULL DEFAULT 'a_valider',
  cree DATETIME NOT NULL,
  decide DATETIME NULL,
  KEY statut (statut)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS ami_publications (
  cle VARCHAR(40) NOT NULL PRIMARY KEY,
  contenu MEDIUMTEXT NOT NULL,
  maj DATETIME NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- v5.94 : codes cadeaux (seule l'empreinte est gardée, le code en clair n'est montré qu'une fois à l'admin).
CREATE TABLE IF NOT EXISTS ami_cadeaux (
  empreinte CHAR(64) NOT NULL PRIMARY KEY,
  mois INT NOT NULL,
  lot VARCHAR(60) NOT NULL DEFAULT '',
  cree DATETIME NOT NULL,
  utilise DATETIME NULL,
  code VARCHAR(20) NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- v5.94 : achats Google Play / App Store vérifiés (jeton d'achat Google ou transaction d'origine Apple).
CREATE TABLE IF NOT EXISTS ami_magasin (
  empreinte CHAR(64) NOT NULL PRIMARY KEY,
  plateforme VARCHAR(10) NOT NULL,
  produit VARCHAR(60) NOT NULL,
  jeton TEXT NOT NULL,
  code VARCHAR(20) NOT NULL,
  fin DATETIME NOT NULL,
  maj DATETIME NOT NULL,
  KEY code (code)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- v5.95 : fréquentation anonyme (compteurs par jour, sans identifiant ni adresse IP).
CREATE TABLE IF NOT EXISTS ami_visites (
  jour CHAR(10) NOT NULL,
  evenement VARCHAR(16) NOT NULL,
  plateforme VARCHAR(8) NOT NULL,
  n INT NOT NULL DEFAULT 0,
  PRIMARY KEY (jour, evenement, plateforme)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- v5.99 : plumes magiques (crédits d'IA). Solde acheté + quota du mois inclus dans Plus.
CREATE TABLE IF NOT EXISTS ami_credits (
  code VARCHAR(20) NOT NULL PRIMARY KEY,
  solde INT NOT NULL DEFAULT 0,
  mois CHAR(7) NOT NULL,
  quota_utilise INT NOT NULL DEFAULT 0,
  maj DATETIME NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
-- Chaque achat ou geste commercial n'est crédité qu'une fois (référence unique : paiement Stripe, achat Google / Apple).
CREATE TABLE IF NOT EXISTS ami_credits_mouvements (
  reference VARCHAR(190) NOT NULL PRIMARY KEY,
  code VARCHAR(20) NOT NULL,
  plumes INT NOT NULL,
  motif VARCHAR(60) NOT NULL,
  cree DATETIME NOT NULL,
  KEY (code)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- v6.0 : ligue de la semaine entre potes (pseudos, points de la semaine ; empreinte d'un jeton au hasard, pas de compte).
CREATE TABLE IF NOT EXISTS ami_ligues (
  code CHAR(6) NOT NULL PRIMARY KEY,
  nom VARCHAR(30) NOT NULL,
  cree DATETIME NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
CREATE TABLE IF NOT EXISTS ami_ligue_scores (
  ligue CHAR(6) NOT NULL,
  semaine CHAR(8) NOT NULL,
  empreinte CHAR(64) NOT NULL,
  pseudo VARCHAR(16) NOT NULL,
  points INT NOT NULL DEFAULT 0,
  maj DATETIME NOT NULL,
  PRIMARY KEY (ligue, semaine, empreinte),
  KEY (ligue, semaine, points)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- v6.0 : défi de classe (série commune ; pseudos ; clé du prof gardée en empreinte ; effacé après 60 jours).
CREATE TABLE IF NOT EXISTS ami_classes (
  code CHAR(6) NOT NULL PRIMARY KEY,
  nom VARCHAR(40) NOT NULL,
  matiere VARCHAR(20) NOT NULL,
  niveau VARCHAR(4) NOT NULL,
  n INT NOT NULL,
  graine INT NOT NULL,
  cle CHAR(64) NOT NULL,
  ouvert TINYINT NOT NULL DEFAULT 1,
  cree DATETIME NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
CREATE TABLE IF NOT EXISTS ami_classe_scores (
  classe CHAR(6) NOT NULL,
  empreinte CHAR(64) NOT NULL,
  pseudo VARCHAR(20) NOT NULL,
  bonnes INT NOT NULL,
  total INT NOT NULL,
  maj DATETIME NOT NULL,
  PRIMARY KEY (classe, empreinte)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- v6.0 : parrainage (filleul → parrain ; code cadeau d'un mois quand le filleul prend Plus).
CREATE TABLE IF NOT EXISTS ami_parrainages (
  filleul VARCHAR(20) NOT NULL PRIMARY KEY,
  parrain VARCHAR(20) NOT NULL,
  statut VARCHAR(12) NOT NULL,
  cadeau VARCHAR(20) NULL,
  cree DATETIME NOT NULL,
  recompense DATETIME NULL,
  KEY (parrain)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
