<?php
// Ami des mots — v5.99 : solde de plumes magiques (crédits d'IA) d'un code.
// POST { code:"AMI-…" } → { actif, solde, quota, quota_restant }. Plumes éteintes dans l'admin → { actif:false }.
// Le code ne donne accès qu'à un nombre : ni nom, ni achat, ni historique.
declare(strict_types=1);
require __DIR__ . '/lib.php';
ami_cors('POST');
if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') ami_json(['erreur' => 'methode'], 405);
ami_limiter('plumes', 30);
$code = (string) (ami_corps_json(256)['code'] ?? '');
try {
  if (!ami_credits_reglages()['actif']) ami_json(['actif' => false]);
  if (!preg_match(AMI_FORMAT_CODE, $code)) ami_json(['erreur' => 'format'], 400);
  ami_json(['actif' => true] + ami_credits_etat(ami_db(), $code));
} catch (Throwable $e) { error_log('ami plumes ' . $e->getMessage()); ami_json(['erreur' => 'indisponible'], 503); }
