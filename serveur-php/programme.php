<?php
// Ami des mots — ce que la veille a publié (validé par un adulte, ou publié seul quand la configuration l'autorise).
// GET ?quoi=maths     → { carte:{annee, niveaux:{6e:{note, chapitres:[[id, domaine, intitulé]]}}} | null, annales:{3e:[…]} }
// GET ?quoi=contenus  → { contenus:{matiere:{idChapitre:{nom, classe, banque:[…], source, maj}}} }          (v6.75)
// GET ?quoi=examens   → { examens:{systeme:{idExamen:{sorte, examen, classe, session, resume, conditions, epreuves, changements, source, maj}}} }
// GET ?quoi=programmes→ { programmes:{systeme:{matiere:{classe:{annee, note, changements, source, maj, chapitres}}}} }
declare(strict_types=1);
require __DIR__ . '/lib.php';
ami_cors('GET');
ami_limiter('programme', 30);
header('Cache-Control: public, max-age=3600');
$quoi = (string) ($_GET['quoi'] ?? 'maths');
$lire = function (string $cle) { $t = ami_val(ami_db(), 'SELECT contenu FROM ami_publications WHERE cle = ?', [$cle]); $d = $t ? json_decode($t, true) : null; return is_array($d) && $d ? $d : new stdClass(); };
try {
  if ($quoi === 'contenus' || $quoi === 'examens' || $quoi === 'programmes') ami_json([$quoi => $lire($quoi)]);
  $c = ami_val(ami_db(), "SELECT contenu FROM ami_publications WHERE cle = 'maths-carte'");
  $a = ami_val(ami_db(), "SELECT contenu FROM ami_publications WHERE cle = 'maths-annales'");
  ami_json(['carte' => $c ? json_decode($c, true) : null, 'annales' => $a ? json_decode($a, true) : new stdClass()]);
} catch (Throwable $e) { error_log('ami programme ' . $e->getMessage()); ami_json(['erreur' => 'indisponible'], 503); }
