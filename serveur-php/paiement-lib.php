<?php
// Ami des mots — v5.94 : tous les moyens de payer Plus.
// - Stripe (site web) : mensuel, annuel, famille (abonnements) et « à vie » (paiement unique) → abonnement.php.
// - Codes cadeaux créés dans le coin admin → cadeau.php.
// - Achats dans l'appli Google Play et App Store → magasin.php, VÉRIFIÉS ici auprès de Google / Apple.
// Plus n'est jamais accordé sur la parole du téléphone : seul le serveur, après vérification, inscrit l'abonnement,
// et seul un certificat signé par le serveur ouvre Plus dans le jeu.
declare(strict_types=1);

const AMI_FIN_A_VIE = '2099-12-31 00:00:00';
const AMI_FORMAT_CADEAU = '/^CADEAU-[A-Z0-9]{4}-[A-Z0-9]{4}$/';

// Réponse commune : état de l'abonnement + certificat signé (comme abonnement.php en GET).
function ami_reponse_certificat(string $code, array $extra = []): never {
  [$actif, $fin] = ami_abonnement_actif($code);
  $finIso = ami_iso($fin);
  ami_json($extra + ['actif' => $actif, 'fin' => $finIso, 'jeton' => $actif ? ami_signer_certificat($code, $finIso) : null]);
}

// Inscrit (ou prolonge) un droit Plus qui ne vient pas de Stripe. Ne remplace jamais un abonnement Stripe en cours.
function ami_inscrire_droit(PDO $db, string $code, string $source, string $reference, string $statut, string $fin): string {
  $mysql = $db->getAttribute(PDO::ATTR_DRIVER_NAME) === 'mysql';
  $db->beginTransaction();
  try {
    $s = $db->prepare('SELECT * FROM ami_abonnements WHERE code = ?' . ($mysql ? ' FOR UPDATE' : '')); $s->execute([$code]); $a = $s->fetch();
    $enCours = $a && in_array($a['statut'], AMI_ACTIFS, true) && $a['fin'] && strtotime($a['fin'] . ' UTC') > time();
    if ($enCours && $a['statut'] === 'a_vie') { $db->commit(); return 'deja_a_vie'; }
    if ($enCours && in_array($a['statut'], ['active', 'trialing', 'past_due'], true) && $statut !== 'a_vie') { $db->commit(); return 'deja_abonne'; }
    if ($a) $db->prepare('UPDATE ami_abonnements SET client = ?, abonnement = ?, statut = ?, fin = ?, maj = ? WHERE code = ?')->execute([$source, $reference, $statut, $fin, ami_maintenant(), $code]);
    else $db->prepare('INSERT INTO ami_abonnements (code, client, abonnement, statut, fin, maj) VALUES (?, ?, ?, ?, ?, ?)')->execute([$code, $source, $reference, $statut, $fin, ami_maintenant()]);
    $db->commit(); return 'ok';
  } catch (Throwable $e) { $db->rollBack(); throw $e; }
}

// ── Codes cadeaux ─────────────────────────────────────────────────────
function ami_nouveau_cadeau(): string {
  $a = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'; $p = fn() => implode('', array_map(fn() => $a[random_int(0, strlen($a) - 1)], range(1, 4)));
  return 'CADEAU-' . $p() . '-' . $p();
}
// Le secret des codes cadeaux doit être réglé (sinon les empreintes seraient devinables) : sans lui, pas de cadeaux.
function ami_cadeaux_actifs(): bool { $s = (string) (ami_config()['cadeau_sel'] ?? ''); return strlen($s) >= 16 && !str_starts_with($s, 'change-moi'); }
function ami_empreinte_cadeau(string $c): string { return hash_hmac('sha256', $c, (string) (ami_config()['cadeau_sel'] ?? '')); }

// ── Google Play ───────────────────────────────────────────────────────
function ami_jwt_rs256(array $charge, string $clePem): string {
  $tete = ami_b64u(json_encode(['alg' => 'RS256', 'typ' => 'JWT'])) . '.' . ami_b64u(json_encode($charge));
  $cle = openssl_pkey_get_private($clePem); if (!$cle || !openssl_sign($tete, $sig, $cle, OPENSSL_ALGO_SHA256)) throw new RuntimeException('signature Google impossible');
  return $tete . '.' . ami_b64u($sig);
}
function ami_google_acces(): string {
  static $jeton = null; if ($jeton) return $jeton;
  $c = ami_config(); $compte = json_decode((string) @file_get_contents($c['google_compte_service'] ?? ''), true);
  if (!is_array($compte) || empty($compte['client_email']) || empty($compte['private_key'])) throw new RuntimeException('compte de service Google absent');
  $uri = $compte['token_uri'] ?? 'https://oauth2.googleapis.com/token'; $t = time();
  $jwt = ami_jwt_rs256(['iss' => $compte['client_email'], 'scope' => 'https://www.googleapis.com/auth/androidpublisher', 'aud' => $uri, 'iat' => $t, 'exp' => $t + 3000], $compte['private_key']);
  $r = ami_http('POST', $c['google_token_url'] ?? $uri, ['Content-Type: application/x-www-form-urlencoded'], http_build_query(['grant_type' => 'urn:ietf:params:oauth:grant-type:jwt-bearer', 'assertion' => $jwt]), 20);
  $d = json_decode($r[1], true);
  if ($r[0] !== 200 || empty($d['access_token'])) throw new RuntimeException('jeton Google refusé');
  return $jeton = $d['access_token'];
}
// → ['fin' => 'Y-m-d H:i:s', 'statut' => 'magasin'|'a_vie'] ou null si l'achat n'est pas valide.
function ami_google_verifier(string $produit, string $jeton, string $sorte): ?array {
  $c = ami_config(); $paquet = $c['android_package'] ?? 'fr.amidesmots.app';
  $base = ami_base('google_api', 'https://androidpublisher.googleapis.com') . '/androidpublisher/v3/applications/' . rawurlencode($paquet) . '/purchases/';
  $url = $sorte === 'a_vie' ? $base . 'products/' . rawurlencode($produit) . '/tokens/' . rawurlencode($jeton) : $base . 'subscriptionsv2/tokens/' . rawurlencode($jeton);
  $r = ami_http('GET', $url, ['Authorization: Bearer ' . ami_google_acces()], null, 20);
  if ($r[0] !== 200) return null;
  $d = json_decode($r[1], true); if (!is_array($d)) return null;
  if ($sorte === 'a_vie') return (int) ($d['purchaseState'] ?? 1) === 0 ? ['fin' => AMI_FIN_A_VIE, 'statut' => 'a_vie'] : null;
  if (!in_array($d['subscriptionState'] ?? '', ['SUBSCRIPTION_STATE_ACTIVE', 'SUBSCRIPTION_STATE_IN_GRACE_PERIOD', 'SUBSCRIPTION_STATE_CANCELED'], true)) return null;
  $fin = null;
  foreach ((array) ($d['lineItems'] ?? []) as $l) if (($l['productId'] ?? '') === $produit && !empty($l['expiryTime'])) $fin = max($fin ?? 0, strtotime($l['expiryTime']));
  return $fin && $fin > time() ? ['fin' => gmdate('Y-m-d H:i:s', $fin), 'statut' => 'magasin'] : null;
}

// ── App Store (Apple) ─────────────────────────────────────────────────
function ami_apple_jwt(): string {
  $c = ami_config(); $pem = (string) @file_get_contents($c['apple_cle_p8'] ?? '');
  $cle = $pem ? openssl_pkey_get_private($pem) : false; if (!$cle) throw new RuntimeException('clé Apple absente');
  $tete = ami_b64u(json_encode(['alg' => 'ES256', 'kid' => $c['apple_key_id'] ?? '', 'typ' => 'JWT'])) . '.' .
    ami_b64u(json_encode(['iss' => $c['apple_issuer_id'] ?? '', 'iat' => time(), 'exp' => time() + 1200, 'aud' => 'appstoreconnect-v1', 'bid' => $c['apple_bundle_id'] ?? 'fr.amidesmots.app']));
  if (!openssl_sign($tete, $der, $cle, OPENSSL_ALGO_SHA256)) throw new RuntimeException('signature Apple impossible');
  return $tete . '.' . ami_b64u(ami_der_vers_brut($der));
}
function ami_apple_api(string $chemin): ?array {
  $c = ami_config(); $base = ami_base('apple_api', ($c['apple_environnement'] ?? 'production') === 'sandbox' ? 'https://api.storekit-sandbox.itunes.apple.com' : 'https://api.storekit.itunes.apple.com');
  $r = ami_http('GET', $base . $chemin, ['Authorization: Bearer ' . ami_apple_jwt()], null, 20);
  return $r[0] === 200 ? json_decode($r[1], true) : null;
}
// Le contenu d'une transaction signée par Apple (récupérée directement chez Apple, en HTTPS, avec notre clé).
function ami_apple_charge(string $jws): ?array { $p = explode('.', $jws); return count($p) === 3 ? json_decode(base64_decode(strtr($p[1], '-_', '+/')), true) : null; }
function ami_apple_lire(array $t, string $produit): ?array {
  $c = ami_config();
  if (($t['bundleId'] ?? '') !== ($c['apple_bundle_id'] ?? 'fr.amidesmots.app') || ($t['productId'] ?? '') !== $produit || !empty($t['revocationDate'])) return null;
  if (($t['type'] ?? '') === 'Non-Consumable') return ['fin' => AMI_FIN_A_VIE, 'statut' => 'a_vie', 'origine' => (string) ($t['originalTransactionId'] ?? '')];
  $fin = (int) (($t['expiresDate'] ?? 0) / 1000);
  return $fin > time() ? ['fin' => gmdate('Y-m-d H:i:s', $fin), 'statut' => 'magasin', 'origine' => (string) ($t['originalTransactionId'] ?? '')] : null;
}
function ami_apple_verifier(string $produit, string $transaction): ?array {
  $d = ami_apple_api('/inApps/v1/transactions/' . rawurlencode($transaction));
  $t = $d && !empty($d['signedTransactionInfo']) ? ami_apple_charge($d['signedTransactionInfo']) : null;
  if (!$t) return null;
  $v = ami_apple_lire($t, $produit);
  if ($v && $v['statut'] === 'magasin') { $n = ami_apple_renouvele($v['origine'], $produit); if ($n) $v['fin'] = max($v['fin'], $n); }
  return $v;
}
// Dernière date de fin connue pour un abonnement Apple (renouvellements).
function ami_apple_renouvele(string $origine, string $produit): ?string {
  $d = ami_apple_api('/inApps/v1/subscriptions/' . rawurlencode($origine)); if (!$d) return null; $fin = null;
  foreach ((array) ($d['data'] ?? []) as $g) foreach ((array) ($g['lastTransactions'] ?? []) as $l) {
    $t = !empty($l['signedTransactionInfo']) ? ami_apple_charge($l['signedTransactionInfo']) : null; $v = $t ? ami_apple_lire($t, $produit) : null;
    if ($v) $fin = $fin ? max($fin, $v['fin']) : $v['fin'];
  }
  return $fin;
}

// Abonnement d'un store arrivé à échéance : on redemande à Google / Apple s'il a été renouvelé (une fois par heure au plus).
function ami_magasin_rafraichir(string $code): void {
  try {
    $db = ami_db(); $s = $db->prepare('SELECT * FROM ami_magasin WHERE code = ? ORDER BY fin DESC'); $s->execute([$code]); $m = $s->fetch();
    if (!$m || strtotime($m['maj'] . ' UTC') > time() - 3600) return;
    $db->prepare('UPDATE ami_magasin SET maj = ? WHERE empreinte = ?')->execute([ami_maintenant(), $m['empreinte']]);
    $v = $m['plateforme'] === 'google' ? ami_google_verifier($m['produit'], $m['jeton'], 'abonnement') : (($n = ami_apple_renouvele($m['jeton'], $m['produit'])) ? ['fin' => $n, 'statut' => 'magasin'] : null);
    if (!$v) return;
    $db->prepare('UPDATE ami_magasin SET fin = ? WHERE empreinte = ?')->execute([$v['fin'], $m['empreinte']]);
    $db->prepare("UPDATE ami_abonnements SET fin = ?, statut = 'magasin', maj = ? WHERE code = ? AND statut = 'magasin'")->execute([$v['fin'], ami_maintenant(), $code]);
  } catch (Throwable $e) { error_log('ami magasin rafraichir ' . $e->getMessage()); }
}
