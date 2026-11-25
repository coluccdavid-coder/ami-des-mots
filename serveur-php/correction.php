<?php
// Ami des mots — v6.0 : Plumo corrige un petit texte (paragraphe en anglais, ou paragraphe de dissertation en français).
// POST { sorte:"anglais"|"francais", consigne, texte, langue, code? } → { note, forts:[…], conseils:[…], corrige }
// Coûte 5 plumes si les plumes sont allumées. Le texte n'est pas gardé. Le jeu demande de ne pas écrire d'informations personnelles.
declare(strict_types=1);
require __DIR__ . '/lib.php';
ami_cors('POST');
if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') ami_json(['erreur' => 'methode'], 405);
$cfg = ami_config();
if (($cfg['anthropic_cle'] ?? '') === '') ami_json(['erreur' => 'non_configure'], 503);
ami_limiter('correction', 6);
const SYSTEME_CORRECTION = "Tu es Plumo, le hibou prof d'« Ami des mots », un jeu pour collégiens et lycéens. Tu corriges un court texte d'élève.\n"
  . "Sois bienveillant, précis et honnête : une note sur 20 réaliste pour le niveau indiqué, 2 points forts, 3 conseils concrets, et une version corrigée\n"
  . "(mêmes idées, fautes corrigées, à peine améliorée). Tu ne te moques jamais de l'élève. Si le texte contient des informations personnelles\n"
  . "(nom, adresse, téléphone, école), ne les répète pas et remplace-les par […] dans la version corrigée. Si le texte est vide de sens ou hors sujet, dis-le gentiment.\n"
  . "Réponds UNIQUEMENT par un objet JSON : {\"note\": nombre, \"forts\": [\"…\",\"…\"], \"conseils\": [\"…\",\"…\",\"…\"], \"corrige\": \"…\"}.";
$d = ami_corps_json(8192);
$txt = fn($v, int $max) => mb_substr(trim(str_replace(['<', '>'], '', (string) $v)), 0, $max);
$sorte = ($d['sorte'] ?? '') === 'francais' ? 'francais' : 'anglais';
$texte = $txt($d['texte'] ?? '', 1200); $consigne = $txt($d['consigne'] ?? '', 200); $niveau = $txt($d['niveau'] ?? '', 6);
$langue = in_array($d['langue'] ?? 'fr', ['fr', 'en', 'es', 'de', 'it', 'pt'], true) ? ($d['langue'] ?? 'fr') : 'fr';
if (mb_strlen($texte) < 20) ami_json(['erreur' => 'trop_court'], 400);
$garde = ami_credits_garde($d['code'] ?? '', 5);
$noms = ['fr' => 'français', 'en' => 'anglais', 'es' => 'espagnol', 'de' => 'allemand', 'it' => 'italien', 'pt' => 'portugais'];
$demande = ($sorte === 'anglais' ? "Texte en ANGLAIS d'un élève francophone" : "Paragraphe de dissertation en FRANÇAIS") . ($niveau ? " (niveau $niveau)" : '') . ".\n"
  . ($consigne ? "Consigne : $consigne\n" : '') . "Texte :\n" . $texte . "\nÉcris les points forts et les conseils en " . $noms[$langue] . ($sorte === 'anglais' ? ' ; la version corrigée reste en anglais.' : ' ; la version corrigée reste en français.');
$t = ami_claude(SYSTEME_CORRECTION, [['type' => 'text', 'text' => $demande]], $cfg['anthropic_modele_veille'] ?? ($cfg['anthropic_modele'] ?? 'claude-haiku-5-5'), 1500, 40);
$a = $t === null ? false : strpos($t, '{'); $b = $t === null ? false : strrpos($t, '}');
$o = ($a !== false && $b !== false) ? json_decode(substr($t, $a, $b - $a + 1), true) : null;
if (!is_array($o) || !is_numeric($o['note'] ?? null) || !is_string($o['corrige'] ?? null)) { ami_credits_rembourser_garde($garde); ami_json(['erreur' => 'ia_indisponible'], 502); }
$liste = fn($l, $n) => array_values(array_slice(array_filter(array_map(fn($x) => is_string($x) ? $txt($x, 240) : '', (array) $l), 'strlen'), 0, $n));
ami_json(['note' => max(0, min(20, round((float) $o['note'] * 2) / 2)), 'forts' => $liste($o['forts'] ?? [], 3), 'conseils' => $liste($o['conseils'] ?? [], 4), 'corrige' => $txt($o['corrige'], 1500)]);
