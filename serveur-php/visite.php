<?php
// Ami des mots — v5.95 : compteur de fréquentation anonyme.
// POST { e:"ouverture"|"partie", p:"web"|"android"|"ios" } → ajoute 1 au compteur du jour.
// Aucun cookie, aucun identifiant, aucune adresse IP enregistrée : seule la limite anti-abus utilise
// une empreinte hachée de l'IP, effacée au bout de quelques minutes (comme les autres points d'accès).
// Le jeu n'envoie « ouverture » qu'une fois par jour et par appareil : le total approche le nombre d'appareils actifs.
declare(strict_types=1);
require __DIR__ . '/lib.php';
ami_cors('POST');
if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') ami_json(['erreur' => 'methode'], 405);
ami_limiter('visite', 20);
const AMI_EVENEMENTS = ['ouverture', 'partie'];
const AMI_PLATEFORMES = ['web', 'android', 'ios'];
$c = ami_corps_json(256);
$e = (string) ($c['e'] ?? ''); $p = (string) ($c['p'] ?? 'web');
if (!in_array($e, AMI_EVENEMENTS, true) || !in_array($p, AMI_PLATEFORMES, true)) ami_json(['erreur' => 'invalide'], 400);
try {
  ami_upsert_compteur(ami_db(), 'ami_visites', ['jour' => gmdate('Y-m-d'), 'evenement' => $e, 'plateforme' => $p]);
  http_response_code(204); exit;
} catch (Throwable $x) { error_log('ami visite ' . $x->getMessage()); ami_json(['erreur' => 'indisponible'], 503); }
