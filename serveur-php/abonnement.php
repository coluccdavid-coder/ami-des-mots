<?php
// Ami des mots Plus — vérification publique + webhook Stripe signé (remplace la fonction Supabase ami-abonnement).
// GET ?code=AMI-… : certificat signé si l'abonnement est actif.  POST : événements Stripe.
declare(strict_types=1);
require __DIR__ . '/lib.php';

$methode = $_SERVER['REQUEST_METHOD'] ?? 'GET';

if ($methode === 'GET' || $methode === 'OPTIONS') {
  ami_cors('GET');
  ami_limiter('abonnement', 60);
  $code = (string) ($_GET['code'] ?? '');
  if (!preg_match(AMI_FORMAT_CODE, $code)) ami_json(['actif' => false]);
  try { [$actif, $fin] = ami_abonnement_actif($code); }
  catch (Throwable $e) { error_log('ami abonnement base ' . $e->getMessage()); ami_json(['erreur' => 'indisponible'], 503); }
  try {
    $finIso = ami_iso($fin);
    ami_json(['actif' => $actif, 'fin' => $finIso, 'jeton' => $actif ? ami_signer_certificat($code, $finIso) : null]);
  } catch (Throwable $e) { error_log('ami abonnement signature ' . $e->getMessage()); ami_json(['erreur' => 'signature_indisponible'], 503); }
}

if ($methode !== 'POST') ami_json(['erreur' => 'methode'], 405);

// ── Webhook Stripe ──────────────────────────────────────────────────
$corps = file_get_contents('php://input', false, null, 0, 1 << 20) ?: '';
if (!stripe_signature_valide($corps, $_SERVER['HTTP_STRIPE_SIGNATURE'] ?? '', ami_config()['stripe_webhook_secret'] ?? '')) {
  http_response_code(400); echo 'signature invalide'; exit;
}
$ev = json_decode($corps, true);
if (!is_array($ev) || empty($ev['id'])) { http_response_code(400); exit; }

try {
  $db = ami_db();
  if (ami_val($db, 'SELECT event_id FROM ami_evenements_stripe WHERE event_id = ?', [$ev['id']]) !== null) ami_json(['recu' => true, 'doublon' => true]);
  $type = (string) ($ev['type'] ?? '');
  $obj = $ev['data']['object'] ?? [];

  if ($type === 'checkout.session.completed' || $type === 'checkout.session.async_payment_succeeded') {
    $code = (string) ($obj['client_reference_id'] ?? '');
    $subId = is_array($obj['subscription'] ?? null) ? ($obj['subscription']['id'] ?? '') : (string) ($obj['subscription'] ?? '');
    if (($obj['mode'] ?? '') === 'subscription' && preg_match(AMI_FORMAT_CODE, $code) && $subId !== '') {
      $sub = stripe_get('/v1/subscriptions/' . rawurlencode($subId));
      $clientSession = is_array($obj['customer'] ?? null) ? ($obj['customer']['id'] ?? '') : (string) ($obj['customer'] ?? '');
      $clientSub = is_array($sub['customer'] ?? null) ? ($sub['customer']['id'] ?? '') : (string) ($sub['customer'] ?? '');
      if ($clientSession === '' || $clientSession !== $clientSub) throw new RuntimeException('Client Stripe incohérent');
      $fin = stripe_fin($sub);
      if (!$fin) throw new RuntimeException('Fin de période absente');
      $r = enregistrer_abonnement($db, $code, $clientSub, (string) $sub['id'], (string) $sub['status'], $fin);
      if ($r === 'deja_actif') {
        // Le même code a déjà un autre abonnement actif : on annule le doublon (vérifier le remboursement dans Stripe).
        if (($sub['status'] ?? '') !== 'canceled') stripe_annuler((string) $sub['id']);
        error_log('AMI_DOUBLON_ABONNEMENT ' . $code . ' ' . $sub['id']);
      }
    }
  }

  // v5.94 : formule « à vie » = paiement unique (Payment Link en mode paiement).
  if (($type === 'checkout.session.completed' || $type === 'checkout.session.async_payment_succeeded') && ($obj['mode'] ?? '') === 'payment' && ($obj['payment_status'] ?? '') === 'paid') {
    $code = (string) ($obj['client_reference_id'] ?? '');
    $pi = is_array($obj['payment_intent'] ?? null) ? ($obj['payment_intent']['id'] ?? '') : (string) ($obj['payment_intent'] ?? '');
    $client = is_array($obj['customer'] ?? null) ? ($obj['customer']['id'] ?? '') : (string) ($obj['customer'] ?? '');
    if (preg_match(AMI_FORMAT_CODE, $code) && $pi !== '') ami_inscrire_droit($db, $code, $client !== '' ? $client : 'stripe', $pi, 'a_vie', AMI_FIN_A_VIE);
  }
  // Remboursement d'un paiement « à vie » : l'accès s'arrête.
  if ($type === 'charge.refunded' && !empty($obj['refunded'])) {
    $pi = is_array($obj['payment_intent'] ?? null) ? ($obj['payment_intent']['id'] ?? '') : (string) ($obj['payment_intent'] ?? '');
    if ($pi !== '') $db->prepare("UPDATE ami_abonnements SET statut = 'rembourse', maj = ? WHERE abonnement = ? AND statut = 'a_vie'")->execute([ami_maintenant(), $pi]);
  }

  if ($type === 'customer.subscription.updated' || $type === 'customer.subscription.deleted') {
    // Stripe peut livrer dans le désordre : on relit l'état actuel.
    $sub = stripe_get('/v1/subscriptions/' . rawurlencode((string) ($obj['id'] ?? '')));
    $db->prepare('UPDATE ami_abonnements SET statut = ?, fin = ?, maj = ? WHERE abonnement = ?')
      ->execute([(string) $sub['status'], stripe_fin($sub), ami_maintenant(), (string) $sub['id']]);
  }

  $db->prepare('INSERT INTO ami_evenements_stripe (event_id, type, traite) VALUES (?, ?, ?)')->execute([$ev['id'], $type, ami_maintenant()]);
} catch (Throwable $e) {
  error_log('ami abonnement webhook ' . ($ev['type'] ?? '') . ' ' . $e->getMessage());
  ami_json(['recu' => false], 500); // Stripe réessaiera.
}
ami_json(['recu' => true]);

// ── Outils Stripe (sans bibliothèque) ───────────────────────────────
function stripe_signature_valide(string $corps, string $entete, string $secret, int $tolerance = 300): bool {
  if ($secret === '' || $entete === '') return false;
  $t = null; $sigs = [];
  foreach (explode(',', $entete) as $p) { [$k, $v] = array_pad(explode('=', trim($p), 2), 2, ''); if ($k === 't') $t = $v; elseif ($k === 'v1') $sigs[] = $v; }
  if (!$t || !ctype_digit($t) || abs(time() - (int) $t) > $tolerance) return false;
  $attendu = hash_hmac('sha256', $t . '.' . $corps, $secret);
  foreach ($sigs as $s) if (hash_equals($attendu, $s)) return true;
  return false;
}
function stripe_get(string $chemin): array {
  [$st, $r] = ami_http('GET', ami_base('stripe_api', 'https://api.stripe.com') . $chemin, ['Authorization: Bearer ' . (ami_config()['stripe_secret'] ?? '')]);
  $d = json_decode($r, true);
  if ($st !== 200 || !is_array($d) || empty($d['id'])) throw new RuntimeException('Stripe ' . $st);
  return $d;
}
function stripe_annuler(string $id): void {
  ami_http('DELETE', ami_base('stripe_api', 'https://api.stripe.com') . '/v1/subscriptions/' . rawurlencode($id), ['Authorization: Bearer ' . (ami_config()['stripe_secret'] ?? '')]);
}
function stripe_fin(array $sub): ?string {
  $s = $sub['current_period_end'] ?? ($sub['items']['data'][0]['current_period_end'] ?? null);
  return $s ? gmdate('Y-m-d H:i:s', (int) $s) : null;
}
// Un code ne peut pas être lié à deux abonnements actifs différents ('ok' ou 'deja_actif').
function enregistrer_abonnement(PDO $db, string $code, string $client, string $abo, string $statut, string $fin): string {
  $db->beginTransaction();
  try {
    $mysql = $db->getAttribute(PDO::ATTR_DRIVER_NAME) === 'mysql';
    $s = $db->prepare('SELECT * FROM ami_abonnements WHERE code = ?' . ($mysql ? ' FOR UPDATE' : ''));
    $s->execute([$code]); $a = $s->fetch();
    if ($a) {
      if ($a['abonnement'] !== $abo && $a['abonnement'] !== null && in_array($a['statut'], AMI_ACTIFS, true) && strtotime($a['fin'] . ' UTC') > time()) { $db->commit(); return 'deja_actif'; }
      $db->prepare('UPDATE ami_abonnements SET client = ?, abonnement = ?, statut = ?, fin = ?, maj = ? WHERE code = ?')->execute([$client, $abo, $statut, $fin, ami_maintenant(), $code]);
    } else {
      $db->prepare('INSERT INTO ami_abonnements (code, client, abonnement, statut, fin, maj) VALUES (?, ?, ?, ?, ?, ?)')->execute([$code, $client, $abo, $statut, $fin, ami_maintenant()]);
    }
    $db->commit(); return 'ok';
  } catch (Throwable $e) { $db->rollBack(); throw $e; }
}
