<?php
// Ami des mots — v6.0 : Plumo réexplique autrement une notion ratée 3 fois (Claude, en direct).
// POST { sujet, question, bonne, regle, langue, code? } → { texte }. Coûte 2 plumes si les plumes sont allumées.
// Rien de personnel n'est envoyé : seulement la question, la bonne réponse et la règle.
declare(strict_types=1);
require __DIR__ . '/lib.php';
ami_cors('POST');
if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') ami_json(['erreur' => 'methode'], 405);
$cfg = ami_config();
if (($cfg['anthropic_cle'] ?? '') === '') ami_json(['erreur' => 'non_configure'], 503);
ami_limiter('explique', 10);
const SYSTEME_EXPLIQUE = "Tu es Plumo, le hibou prof d'« Ami des mots », un jeu où des enfants et des ados apprennent (anglais, maths, matières du programme français).\n"
  . "Un élève s'est trompé TROIS fois sur la même notion. Réexplique-la AUTREMENT que la règle donnée : une image concrète de la vie de tous les jours,\n"
  . "puis un exemple très simple, puis une astuce pour s'en souvenir. Ton chaleureux et un peu drôle, jamais moqueur envers l'élève.\n"
  . "Faits exacts. 5 phrases courtes au plus. Pas de liste à puces, pas de titre, pas de markdown. N'invente aucune donnée sur l'élève.";
$d = ami_corps_json(4096);
$txt = fn($v, int $max) => mb_substr(trim(preg_replace('/\s+/u', ' ', str_replace(['<', '>', '{', '}'], '', (string) $v))), 0, $max);
$question = $txt($d['question'] ?? '', 300); $bonne = $txt($d['bonne'] ?? '', 120); $regle = $txt($d['regle'] ?? '', 300); $sujet = $txt($d['sujet'] ?? '', 40);
$langue = in_array($d['langue'] ?? 'fr', ['fr', 'en', 'es', 'de', 'it', 'pt'], true) ? ($d['langue'] ?? 'fr') : 'fr';
if ($question === '' || $bonne === '') ami_json(['erreur' => 'question'], 400);
try {
  $db = ami_db(); $jour = gmdate('Y-m-d');
  $cle = 'E-' . substr(hash('sha256', 'explique|' . ($_SERVER['REMOTE_ADDR'] ?? '?')), 0, 18);
  ami_upsert_compteur($db, 'ami_vannes_appels', ['code' => $cle, 'jour' => $jour]);
  if ((int) ami_val($db, 'SELECT n FROM ami_vannes_appels WHERE code = ? AND jour = ?', [$cle, $jour]) > (int) ($cfg['explique_par_jour'] ?? 40)) ami_json(['erreur' => 'quota'], 429);
} catch (Throwable $e) { ami_json(['erreur' => 'indisponible'], 503); }
$garde = ami_credits_garde($d['code'] ?? '', 2);
$noms = ['fr' => 'français', 'en' => 'anglais', 'es' => 'espagnol', 'de' => 'allemand', 'it' => 'italien', 'pt' => 'portugais'];
$demande = "Matière : $sujet\nQuestion : $question\nBonne réponse : $bonne\nRègle déjà donnée (à ne pas répéter telle quelle) : " . ($regle ?: '(aucune)') . "\nÉcris en " . $noms[$langue] . '.';
$t = ami_claude(SYSTEME_EXPLIQUE, [['type' => 'text', 'text' => $demande]], $cfg['anthropic_modele'] ?? 'claude-haiku-5-5', 400, 20);
$t = $t === null ? '' : trim(preg_replace('/[*#`]+/', '', $t));
if (mb_strlen($t) < 20 || preg_match('~https?:|www\.~i', $t)) { ami_credits_rembourser_garde($garde); ami_json(['erreur' => 'ia_indisponible'], 502); }
ami_json(['texte' => mb_substr($t, 0, 900)]);
