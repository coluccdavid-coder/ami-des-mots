<?php
// Ami des mots — l'offre (gratuit / Plus) réglée dans le coin admin du serveur.
// GET → { offre:"<texte JSON>", sig:"<signature ECDSA r||s en base64url>", maj } ; { offre:null } si rien n'est réglé.
// Le jeu n'applique ces réglages que si la signature est valide (clé publique du jeu). Ils ne donnent jamais Plus à personne.
declare(strict_types=1);
require __DIR__ . '/lib.php';
ami_cors('GET');
ami_limiter('offre', 60);
header('Cache-Control: public, max-age=300');
try {
  $r = ami_db()->query("SELECT contenu, maj FROM ami_publications WHERE cle = 'offre'")->fetch();
  if (!$r) ami_json(['offre' => null]);
  ami_json(['offre' => $r['contenu'], 'sig' => ami_signer_texte('offre|' . $r['contenu']), 'maj' => ami_iso($r['maj'])]);
} catch (Throwable $e) { error_log('ami offre ' . $e->getMessage()); ami_json(['erreur' => 'indisponible'], 503); }
