#!/usr/bin/env bash
# Ami des mots — lance le test du serveur PHP sur une base MariaDB JETABLE, sans toucher à la vraie configuration.
# Prérequis : php 8.1+ (pdo_mysql, curl, mbstring), MariaDB ou MySQL (mariadbd / mysqld), Node 18+.
#   Codespaces / Ubuntu : sudo apt-get update && sudo apt-get install -y php-cli php-mysql php-curl php-mbstring mariadb-server
# Usage : bash outils/tests-serveur/lancer-local.sh
# Tout est créé dans un dossier temporaire (base, clés, config de test) puis supprimé à la fin.
set -euo pipefail
export PATH="$PATH:/usr/sbin:/sbin"   # mariadbd et mysqld sont souvent dans /usr/sbin
ICI="$(cd "$(dirname "$0")/../.." && pwd)"
TMP="$(mktemp -d)"; PORT=3317; SOCK="$TMP/mdb.sock"
DAEMON="$(command -v mariadbd || command -v mysqld || true)"
INSTALL="$(command -v mariadb-install-db || command -v mysql_install_db || true)"
CLIENT="$(command -v mariadb || command -v mysql || true)"
if [ -z "$DAEMON" ] || [ -z "$INSTALL" ] || [ -z "$CLIENT" ] || ! command -v php >/dev/null; then
  echo "Il manque PHP ou MariaDB/MySQL. Ubuntu/Codespaces : sudo apt-get update && sudo apt-get install -y php-cli php-mysql php-curl php-mbstring mariadb-server"; exit 2
fi
arreter(){ [ -n "${PID:-}" ] && kill "$PID" 2>/dev/null || true; sleep 1; rm -rf "$TMP"; }
trap arreter EXIT
"$INSTALL" --user="$(id -un)" --datadir="$TMP/data" --auth-root-authentication-method=normal >/dev/null 2>&1
"$DAEMON" --user="$(id -un)" --datadir="$TMP/data" --socket="$SOCK" --port="$PORT" --bind-address=127.0.0.1 \
  --innodb-use-native-aio=0 --innodb-buffer-pool-size=64M --skip-log-bin >"$TMP/mdb.log" 2>&1 & PID=$!
# --innodb-use-native-aio=0 : dans les conteneurs (Codespaces, Docker), l'AIO natif (io_uring) fait souvent planter MariaDB (Segmentation fault).
PRET=0
for i in $(seq 1 30); do
  if "$CLIENT" -uroot --socket="$SOCK" -e "SELECT 1" >/dev/null 2>&1; then PRET=1; break; fi
  kill -0 "$PID" 2>/dev/null || break
  sleep 1
done
if [ "$PRET" != 1 ]; then
  echo "MariaDB n'a pas démarré. Dernières lignes du journal :"; tail -n 25 "$TMP/mdb.log" || true
  echo "Piste : vérifier l'espace disque (df -h /tmp) ou relancer le Codespace."; exit 3
fi
"$CLIENT" -uroot --socket="$SOCK" -e "CREATE DATABASE amitest CHARACTER SET utf8mb4; CREATE USER 'ami'@'127.0.0.1' IDENTIFIED BY 'ami'; GRANT ALL ON amitest.* TO 'ami'@'127.0.0.1'; FLUSH PRIVILEGES;"
"$CLIENT" -uroot --socket="$SOCK" amitest < "$ICI/serveur-php/schema.sql"
node "$ICI/outils/generer-cles.js" "$TMP" > "$TMP/cles.txt"
PUB="$(grep -o 'CLE_PUBLIQUE:{.*}' "$TMP/cles.txt" | sed 's/^CLE_PUBLIQUE://')"
HASH="$(php -r "echo password_hash('secret-admin', PASSWORD_DEFAULT);")"
cat > "$TMP/config.php" <<EOF
<?php
// Configuration de TEST générée par lancer-local.sh (clés jetables, Stripe et Claude simulés sur 127.0.0.1:8791).
return [
  'db_dsn' => 'mysql:host=127.0.0.1;port=$PORT;dbname=amitest;charset=utf8mb4', 'db_user' => 'ami', 'db_pass' => 'ami',
  'origines' => ['https://ami-des-mots.fr', 'https://localhost'],
  'cle_privee_pem' => '$TMP/ami-cle-privee.pem',
  'stripe_secret' => 'sk_test_x', 'stripe_webhook_secret' => 'whsec_test', 'stripe_api' => 'http://127.0.0.1:8791',
  'anthropic_api' => 'http://127.0.0.1:8791', 'anthropic_cle' => 'cle-test', 'anthropic_modele' => 'claude-haiku-5-5', 'anthropic_modele_veille' => 'claude-sonnet-5-5',
  'cadeau_sel' => 'sel-de-test', 'admin_mdp_hash' => '$HASH', 'veille_jeton' => 'bon-jeton',
  'veille_domaines_test' => ['127.0.0.1:8791'],
  'veille_sources' => ['domaines' => ['www.education.gouv.fr', 'education.gouv.fr', 'eduscol.education.fr', 'eduscol.education.gouv.fr'],
    'systemes' => ['fr' => ['nom' => 'France', 'domaines' => []], 'it' => ['nom' => 'Italie', 'domaines' => ['www.mim.gov.it']]],
    'sources' => [['programme', '6e', 'http://127.0.0.1:8791/doc-6e.html'], ['annales', '3e', 'http://127.0.0.1:8791/doc-3e.html'], ['programme', '5e', 'https://pirate.example/x'],
      ['systeme' => 'fr', 'sorte' => 'programme', 'matiere' => 'francais', 'classe' => '5e', 'url' => 'http://127.0.0.1:8791/doc-fr5.html'],
      ['systeme' => 'fr', 'sorte' => 'epreuve', 'matiere' => 'toutes', 'classe' => '3e', 'url' => 'http://127.0.0.1:8791/doc-dnb.html', 'id' => 'diplome-national-du-brevet'],
      ['systeme' => 'it', 'sorte' => 'epreuve', 'matiere' => 'toutes', 'classe' => 'Tle', 'url' => 'https://eduscol.education.fr/pas-italien'],
      ['systeme' => 'fr', 'sorte' => 'questions', 'matiere' => 'francais', 'classe' => '5e', 'url' => 'http://127.0.0.1:8791/doc-fr5.html']]],
  'veille_publication_auto' => ['epreuve', 'questions'], 'veille_chapitres_max' => 1,
];
EOF
cd "$ICI"
AMI_CONFIG="$TMP/config.php" CLE_PUBLIQUE_JSON="$PUB" node outils/tests-serveur/test-serveur-php.js
