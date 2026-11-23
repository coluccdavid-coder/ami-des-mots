<?php
// Ami des mots — outils communs du serveur PHP (aucune dépendance : PHP 8.1+, PDO MySQL, OpenSSL, cURL).
declare(strict_types=1);

const AMI_FORMAT_CODE = '/^AMI-[A-Z0-9]{4}-[A-Z0-9]{4}-[A-Z0-9]{4}$/';
const AMI_ACTIFS = ['active', 'trialing', 'past_due'];

function ami_config(): array {
  static $c = null;
  if ($c !== null) return $c;
  $chemins = [getenv('AMI_CONFIG') ?: '', dirname(__DIR__) . '/config-ami.php', __DIR__ . '/config.php'];
  foreach ($chemins as $f) if ($f && is_file($f)) { $c = require $f; return $c; }
  ami_json(['erreur' => 'non_configure'], 503);
}

function ami_db(): PDO {
  static $db = null;
  if ($db) return $db;
  $c = ami_config();
  $db = new PDO($c['db_dsn'], $c['db_user'] ?? null, $c['db_pass'] ?? null, [
    PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION, PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC, PDO::ATTR_EMULATE_PREPARES => false
  ]);
  if ($db->getAttribute(PDO::ATTR_DRIVER_NAME) === 'mysql') $db->exec("SET time_zone = '+00:00'");
  return $db;
}

function ami_maintenant(): string { return gmdate('Y-m-d H:i:s'); }
function ami_ms(): int { return (int) floor(microtime(true) * 1000); }

// CORS : seulement les origines listées (le site, l'appli Android).
function ami_cors(string $methodes): void {
  $origines = ami_config()['origines'] ?? [];
  $o = $_SERVER['HTTP_ORIGIN'] ?? '';
  header('Vary: Origin');
  header('Cache-Control: no-store');
  if (in_array('*', $origines, true)) header('Access-Control-Allow-Origin: *');
  elseif ($o !== '' && in_array($o, $origines, true)) header('Access-Control-Allow-Origin: ' . $o);
  elseif ($o !== '') ami_json(['erreur' => 'origine_interdite'], 403);
  header('Access-Control-Allow-Methods: ' . $methodes . ', OPTIONS');
  header('Access-Control-Allow-Headers: content-type');
  header('Access-Control-Max-Age: 600');
  if (($_SERVER['REQUEST_METHOD'] ?? '') === 'OPTIONS') { http_response_code(204); exit; }
}

function ami_json($data, int $status = 200): never {
  http_response_code($status);
  header('Content-Type: application/json; charset=utf-8');
  echo json_encode($data, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
  exit;
}

function ami_corps_json(int $max = 8192): array {
  $brut = file_get_contents('php://input', false, null, 0, $max + 1);
  if ($brut === false || strlen($brut) > $max) ami_json(['erreur' => 'trop_long'], 413);
  $d = json_decode($brut, true);
  if (!is_array($d)) ami_json(['erreur' => 'requete'], 400);
  return $d;
}

// Limite par adresse et par minute (l'adresse n'est jamais gardée en clair).
function ami_limiter(string $quoi, int $max): void {
  $ip = $_SERVER['REMOTE_ADDR'] ?? '?';
  $e = substr(hash('sha256', $quoi . '|' . $ip . '|' . (ami_config()['db_user'] ?? '')), 0, 16);
  $m = intdiv(time(), 60);
  $db = ami_db();
  ami_upsert_compteur($db, 'ami_limites', ['empreinte' => $e, 'minute' => $m]);
  $n = (int) ami_val($db, 'SELECT n FROM ami_limites WHERE empreinte = ? AND minute = ?', [$e, $m]);
  if (random_int(1, 200) === 1) $db->prepare('DELETE FROM ami_limites WHERE minute < ?')->execute([$m - 5]);
  if ($n > $max) ami_json(['erreur' => 'trop_de_requetes'], 429);
}

// INSERT … +1 compatible MySQL et SQLite (tests).
function ami_upsert_compteur(PDO $db, string $table, array $cle): void {
  $cols = array_keys($cle);
  $ph = implode(', ', array_fill(0, count($cols), '?'));
  if ($db->getAttribute(PDO::ATTR_DRIVER_NAME) === 'mysql')
    $sql = "INSERT INTO $table (" . implode(', ', $cols) . ", n) VALUES ($ph, 1) ON DUPLICATE KEY UPDATE n = n + 1";
  else
    $sql = "INSERT INTO $table (" . implode(', ', $cols) . ", n) VALUES ($ph, 1) ON CONFLICT(" . implode(', ', $cols) . ") DO UPDATE SET n = n + 1";
  $db->prepare($sql)->execute(array_values($cle));
}

function ami_val(PDO $db, string $sql, array $p = []) {
  $s = $db->prepare($sql); $s->execute($p); $v = $s->fetchColumn(); return $v === false ? null : $v;
}

// Abonnement actif ? (true / false). Une panne de base lève une exception (jamais « inactif » par erreur).
function ami_abonnement_actif(string $code): array {
  $s = ami_db()->prepare('SELECT statut, fin FROM ami_abonnements WHERE code = ?');
  $s->execute([$code]);
  $r = $s->fetch();
  $actif = $r && in_array($r['statut'], AMI_ACTIFS, true) && $r['fin'] && strtotime($r['fin'] . ' UTC') > time();
  return [$actif, $r ? $r['fin'] : null];
}

function ami_b64u(string $b): string { return rtrim(strtr(base64_encode($b), '+/', '-_'), '='); }

// Signature ECDSA P-256 au format attendu par le navigateur (r||s, 64 octets), comme la version Supabase.
function ami_signer_certificat(string $code, string $finIso): string {
  $pem = @file_get_contents(ami_config()['cle_privee_pem'] ?? '');
  $cle = $pem ? openssl_pkey_get_private($pem) : false;
  if (!$cle) throw new RuntimeException('clé privée absente');
  $charge = ami_b64u(json_encode(['c' => $code, 'f' => $finIso], JSON_UNESCAPED_SLASHES));
  if (!openssl_sign($charge, $der, $cle, OPENSSL_ALGO_SHA256)) throw new RuntimeException('signature impossible');
  return $charge . '.' . ami_b64u(ami_der_vers_brut($der));
}
// v5.85 : signature d'un texte quelconque (réglages de l'offre). Le jeu la vérifie avec la clé publique.
function ami_signer_texte(string $texte): string {
  $pem = @file_get_contents(ami_config()['cle_privee_pem'] ?? '');
  $cle = $pem ? openssl_pkey_get_private($pem) : false;
  if (!$cle) throw new RuntimeException('clé privée absente');
  if (!openssl_sign($texte, $der, $cle, OPENSSL_ALGO_SHA256)) throw new RuntimeException('signature impossible');
  return ami_b64u(ami_der_vers_brut($der));
}
function ami_der_vers_brut(string $der): string {
  $i = 2; if (ord($der[1]) & 0x80) $i += ord($der[1]) & 0x7f;
  $lire = function () use ($der, &$i) { $i++; $n = ord($der[$i]); $i++; $v = substr($der, $i, $n); $i += $n; return $v; };
  $r = ltrim($lire(), "\0"); $s = ltrim($lire(), "\0");
  return str_pad($r, 32, "\0", STR_PAD_LEFT) . str_pad($s, 32, "\0", STR_PAD_LEFT);
}
// Date ISO « 2026-12-01T10:00:00.000Z » (même forme que la version Supabase).
function ami_iso(?string $mysql): ?string { return $mysql ? gmdate('Y-m-d\TH:i:s.000\Z', strtotime($mysql . ' UTC')) : null; }

// Appels HTTPS sortants (Stripe, Claude). Adresses de base modifiables pour les tests uniquement.
function ami_http(string $methode, string $url, array $entetes, ?string $corps = null, int $delai = 60): array {
  $h = curl_init($url);
  curl_setopt_array($h, [CURLOPT_CUSTOMREQUEST => $methode, CURLOPT_RETURNTRANSFER => true, CURLOPT_HTTPHEADER => $entetes,
    CURLOPT_TIMEOUT => $delai, CURLOPT_CONNECTTIMEOUT => 10, CURLOPT_FOLLOWLOCATION => false]);
  if ($corps !== null) curl_setopt($h, CURLOPT_POSTFIELDS, $corps);
  $r = curl_exec($h); $code = (int) curl_getinfo($h, CURLINFO_HTTP_CODE); curl_close($h);
  return [$code, $r === false ? '' : $r];
}
function ami_base(string $cle, string $defaut): string { return rtrim(ami_config()[$cle] ?? $defaut, '/'); }

function ami_claude(string $systeme, array $contenu, string $modele, int $max = 800, int $delai = 60): ?string {
  $cle = ami_config()['anthropic_cle'] ?? '';
  if ($cle === '') return null;
  [$st, $r] = ami_http('POST', ami_base('anthropic_api', 'https://api.anthropic.com') . '/v1/messages',
    ['x-api-key: ' . $cle, 'anthropic-version: 2023-06-01', 'content-type: application/json'],
    json_encode(['model' => $modele, 'max_tokens' => $max, 'system' => $systeme, 'messages' => [['role' => 'user', 'content' => $contenu]]]), $delai);
  if ($st !== 200) { error_log('ami claude ' . $st); return null; }
  $d = json_decode($r, true);
  $t = '';
  foreach (($d['content'] ?? []) as $b) if (($b['type'] ?? '') === 'text') $t .= $b['text'];
  return $t;
}
