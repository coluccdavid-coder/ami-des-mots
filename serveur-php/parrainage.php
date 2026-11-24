<?php
// Ami des mots — v6.0 : parrainage. Une famille invite une autre famille avec son lien (?parrain=AMI-…).
// Quand la famille invitée prend Plus (Stripe, Google Play, App Store), le parrain reçoit un code cadeau d'un mois.
// POST { action:"lier", code:<filleul>, parrain } (une seule fois par filleul) · POST { action:"mes", code } → codes cadeaux reçus
declare(strict_types=1);
require __DIR__ . '/lib.php';
ami_cors('POST');
if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') ami_json(['erreur' => 'methode'], 405);
ami_limiter('parrainage', 20);
$d = ami_corps_json(512); $action = (string) ($d['action'] ?? ''); $code = (string) ($d['code'] ?? '');
if (!preg_match(AMI_FORMAT_CODE, $code)) ami_json(['erreur' => 'format'], 400);
try {
  $db = ami_db();
  // Effacement : parrainages de plus de 2 ans.
  if (random_int(1, 20) === 1) $db->prepare('DELETE FROM ami_parrainages WHERE cree < ?')->execute([gmdate('Y-m-d H:i:s', time() - 730 * 86400)]);
  if ($action === 'lier') {
    $parrain = (string) ($d['parrain'] ?? '');
    if (!preg_match(AMI_FORMAT_CODE, $parrain) || $parrain === $code) ami_json(['erreur' => 'format'], 400);
    // Une famille déjà abonnée (ou qui l'a été) n'est pas une nouvelle famille.
    if (ami_val($db, 'SELECT code FROM ami_abonnements WHERE code = ?', [$code]) !== null) ami_json(['ok' => false, 'raison' => 'deja_client']);
    try { $db->prepare("INSERT INTO ami_parrainages (filleul, parrain, statut, cree) VALUES (?, ?, 'attente', ?)")->execute([$code, $parrain, ami_maintenant()]); }
    catch (PDOException $e) { ami_json(['ok' => false, 'raison' => 'deja_lie']); }
    ami_json(['ok' => true]);
  }
  if ($action === 'mes') {
    $l = $db->prepare("SELECT cadeau, recompense FROM ami_parrainages WHERE parrain = ? AND statut = 'recompense' ORDER BY recompense DESC LIMIT 24"); $l->execute([$code]);
    $n = (int) ami_val($db, "SELECT COUNT(*) FROM ami_parrainages WHERE parrain = ? AND statut = 'attente'", [$code]);
    ami_json(['cadeaux' => array_map(fn($r) => ['code' => $r['cadeau'], 'date' => ami_iso($r['recompense'])], $l->fetchAll()), 'en_attente' => $n]);
  }
  ami_json(['erreur' => 'action'], 400);
} catch (Throwable $e) { error_log('ami parrainage ' . $e->getMessage()); ami_json(['erreur' => 'indisponible'], 503); }
