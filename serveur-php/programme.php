<?php
// Ami des mots — carte des programmes de maths et sujets officiels VALIDÉS par un adulte (coin admin du serveur).
// GET ?quoi=maths → { carte:{annee, niveaux:{6e:{note, chapitres:[[id, domaine, intitulé]]}}} | null, annales:{3e:[…]} }
declare(strict_types=1);
require __DIR__ . '/lib.php';
ami_cors('GET');
ami_limiter('programme', 30);
header('Cache-Control: public, max-age=3600');
try {
  $c = ami_val(ami_db(), "SELECT contenu FROM ami_publications WHERE cle = 'maths-carte'");
  $a = ami_val(ami_db(), "SELECT contenu FROM ami_publications WHERE cle = 'maths-annales'");
  ami_json(['carte' => $c ? json_decode($c, true) : null, 'annales' => $a ? json_decode($a, true) : new stdClass()]);
} catch (Throwable $e) { error_log('ami programme ' . $e->getMessage()); ami_json(['erreur' => 'indisponible'], 503); }
