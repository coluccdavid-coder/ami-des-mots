<?php
// Ami des mots — un code cadeau (créé dans le coin admin) ouvre Plus pour quelques mois.
// POST { code:"AMI-…", cadeau:"CADEAU-XXXX-XXXX" } → certificat signé, comme abonnement.php.
declare(strict_types=1);
require __DIR__ . '/lib.php';
ami_cors('POST');
if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') ami_json(['erreur' => 'methode'], 405);
ami_limiter('cadeau', 10); // essais limités : on ne devine pas un code cadeau
$d = ami_corps_json(512);
$code = (string) ($d['code'] ?? ''); $cadeau = strtoupper(trim((string) ($d['cadeau'] ?? '')));
if (!preg_match(AMI_FORMAT_CODE, $code) || !preg_match(AMI_FORMAT_CADEAU, $cadeau)) ami_json(['erreur' => 'format'], 400);
if (!ami_cadeaux_actifs()) ami_json(['erreur' => 'non_configure'], 503);
try {
  $db = ami_db(); $e = ami_empreinte_cadeau($cadeau);
  $s = $db->prepare('SELECT mois, utilise, code FROM ami_cadeaux WHERE empreinte = ?'); $s->execute([$e]); $c = $s->fetch();
  if (!$c) ami_json(['erreur' => 'inconnu'], 404);
  if ($c['utilise']) { if ($c['code'] === $code) ami_reponse_certificat($code); ami_json(['erreur' => 'deja_utilise'], 409); }
  // On RÉSERVE d'abord le code (une seule demande peut gagner, même si deux arrivent en même temps).
  $u = $db->prepare('UPDATE ami_cadeaux SET utilise = ?, code = ? WHERE empreinte = ? AND utilise IS NULL'); $u->execute([ami_maintenant(), $code, $e]);
  if ($u->rowCount() !== 1) ami_json(['erreur' => 'deja_utilise'], 409);
  // Prolonge un cadeau en cours, sinon part d'aujourd'hui.
  [$actif, $fin] = ami_abonnement_actif($code);
  $depart = $actif && $fin ? strtotime($fin . ' UTC') : time();
  $nouvelle = gmdate('Y-m-d H:i:s', strtotime('+' . (int) $c['mois'] . ' months', $depart));
  $r = ami_inscrire_droit($db, $code, 'cadeau', 'cadeau:' . substr($e, 0, 16), 'cadeau', $nouvelle);
  if ($r !== 'ok') { // déjà Plus à vie ou abonnement payant en cours : on rend le code, il reste utilisable
    $db->prepare('UPDATE ami_cadeaux SET utilise = NULL, code = NULL WHERE empreinte = ?')->execute([$e]);
    ami_json(['erreur' => $r], 409);
  }
  ami_reponse_certificat($code, ['mois' => (int) $c['mois']]);
} catch (Throwable $ex) { error_log('ami cadeau ' . $ex->getMessage()); ami_json(['erreur' => 'indisponible'], 503); }
