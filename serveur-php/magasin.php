<?php
// Ami des mots — achat de Plus dans l'appli (Google Play ou App Store), VÉRIFIÉ auprès de Google / Apple.
// POST { code:"AMI-…", plateforme:"google"|"apple", produit:"plus_mensuel"|…, jeton:"<jeton d'achat Google | n° de transaction Apple>" }
// → certificat signé. Le téléphone ne décide jamais seul : sans réponse positive de Google / Apple, rien n'est ouvert.
declare(strict_types=1);
require __DIR__ . '/lib.php';
ami_cors('POST');
if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') ami_json(['erreur' => 'methode'], 405);
ami_limiter('magasin', 30);
$d = ami_corps_json(4096); $cfg = ami_config();
$code = (string) ($d['code'] ?? ''); $plateforme = (string) ($d['plateforme'] ?? ''); $produit = (string) ($d['produit'] ?? ''); $jeton = trim((string) ($d['jeton'] ?? ''));
$produits = $cfg['magasin_produits'] ?? ['plus_mensuel' => 'abonnement', 'plus_annuel' => 'abonnement', 'plus_famille' => 'abonnement', 'plus_a_vie' => 'a_vie'];
// v5.99 : pack de plumes magiques (consommable) — le nombre de plumes vient de l'admin, jamais du téléphone.
if (in_array($produit, AMI_PACKS, true)) {
  if (!preg_match(AMI_FORMAT_CODE, $code) || !in_array($plateforme, ['google', 'apple'], true) || !preg_match('/^[A-Za-z0-9._:-]{5,600}$/', $jeton)) ami_json(['erreur' => 'format'], 400);
  try {
    $pack = ami_credits_reglages()['packs'][$produit] ?? null;
    if (!$pack || !ami_credits_reglages()['actif']) ami_json(['erreur' => 'pack_inconnu'], 409);
    $ref = ami_magasin_consommable($plateforme, $produit, $jeton);
    if (!$ref) ami_json(['erreur' => 'achat_invalide'], 402);
    $db = ami_db(); $neuf = ami_credits_ajouter($db, $code, (int) $pack['plumes'], $ref, 'achat ' . $produit . ' ' . $plateforme);
    ami_json(['plumes' => ami_credits_etat($db, $code), 'credite' => $neuf]);
  } catch (Throwable $ex) { error_log('ami magasin plumes ' . $ex->getMessage()); ami_json(['erreur' => 'indisponible'], 503); }
}
if (!preg_match(AMI_FORMAT_CODE, $code) || !in_array($plateforme, ['google', 'apple'], true) || !isset($produits[$produit]) || !preg_match('/^[A-Za-z0-9._:-]{5,600}$/', $jeton))
  ami_json(['erreur' => 'format'], 400);
try {
  $v = $plateforme === 'google' ? ami_google_verifier($produit, $jeton, $produits[$produit]) : ami_apple_verifier($produit, $jeton);
  if (!$v) ami_json(['erreur' => 'achat_invalide', 'actif' => false], 402);
  $db = ami_db();
  // Un même achat ne sert qu'à un seul code à la fois (restauration sur un nouveau téléphone : il passe au nouveau code).
  $cle = $plateforme === 'apple' ? ($v['origine'] ?? $jeton) : $jeton; $e = hash('sha256', $plateforme . '|' . $cle);
  $s = $db->prepare('SELECT code, maj FROM ami_magasin WHERE empreinte = ?'); $s->execute([$e]); $m = $s->fetch(); $ancien = $m ? $m['code'] : false;
  // Changement de code (restauration sur un nouveau téléphone) : une fois par 24 h au plus, contre les vols d'achat.
  if ($ancien && $ancien !== $code && strtotime($m['maj'] . ' UTC') > time() - 86400) ami_json(['erreur' => 'transfert_recent'], 429);
  if ($ancien && $ancien !== $code) $db->prepare("UPDATE ami_abonnements SET statut = 'transfere', abonnement = NULL, maj = ? WHERE code = ? AND abonnement = ?")->execute([ami_maintenant(), $ancien, 'magasin:' . substr($e, 0, 16)]);
  if ($ancien) $db->prepare('UPDATE ami_magasin SET code = ?, fin = ?, maj = ? WHERE empreinte = ?')->execute([$code, $v['fin'], ami_maintenant(), $e]);
  else $db->prepare('INSERT INTO ami_magasin (empreinte, plateforme, produit, jeton, code, fin, maj) VALUES (?, ?, ?, ?, ?, ?, ?)')->execute([$e, $plateforme, $produit, $cle, $code, $v['fin'], ami_maintenant()]);
  $r = ami_inscrire_droit($db, $code, $plateforme, 'magasin:' . substr($e, 0, 16), $v['statut'], $v['fin']);
  if ($r !== 'ok' && $r !== 'deja_abonne') ami_json(['erreur' => $r], 409);
  if ($r === 'ok') ami_parrainage_recompense($db, $code);   // v6.0 : parrainage
  ami_reponse_certificat($code, ['plateforme' => $plateforme]);
} catch (Throwable $ex) { error_log('ami magasin ' . $ex->getMessage()); ami_json(['erreur' => 'indisponible'], 503); }
