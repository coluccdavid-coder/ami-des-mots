<?php
// Ami des mots — v6.54 : « Je n'ai pas compris la leçon » — Plumo réexplique tout un chapitre (Claude, en direct),
// puis répond à quelques questions de l'élève sur cette leçon.
// POST { matiere, niveau, chapitre, points[], exemples[], question?, langue, code? } → { texte }.
// Coûte 1 plume par réponse si les plumes sont allumées. 30 réponses par jour et par IP au plus (réglable : lecon_par_jour).
// Rien de personnel n'est envoyé : seulement le chapitre, ses règles, quelques exemples et la question de l'élève.
declare(strict_types=1);
require __DIR__ . '/lib.php';
ami_cors('POST');
if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') ami_json(['erreur' => 'methode'], 405);
$cfg = ami_config();
if (($cfg['anthropic_cle'] ?? '') === '') ami_json(['erreur' => 'non_configure'], 503);
ami_limiter('lecon', 10);
const SYSTEME_LECON = "Tu es Plumo, le hibou prof d'« Ami des mots », une appli où des élèves français (de la 6e au bac) révisent leurs matières.\n"
  . "Un élève n'a pas compris une leçon en classe. Tu la lui réexpliques simplement, au niveau de sa classe et selon le programme scolaire français.\n"
  . "Si on te demande la leçon : 1) l'idée principale en mots simples, avec une image de la vie de tous les jours ; 2) deux ou trois exemples très concrets ;\n"
  . "3) une astuce pour s'en souvenir. Si l'élève pose une question : réponds seulement à sa question, sur cette leçon, en t'appuyant sur les points donnés.\n"
  . "Faits exacts uniquement : si tu n'es pas sûr, dis-le et conseille de demander au professeur. Ne fais pas les devoirs à sa place.\n"
  . "Si la question n'a rien à voir avec la leçon, ou parle de sujets personnels ou dangereux, ramène gentiment vers la leçon et conseille d'en parler à un adulte de confiance.\n"
  . "Ton chaleureux, encourageant, un peu drôle, jamais moqueur. 12 phrases courtes au plus. Pas de markdown, pas de titres, pas de listes à puces, pas de lien. N'invente rien sur l'élève.";
$d = ami_corps_json(8192);
$txt = fn($v, int $max) => mb_substr(trim(preg_replace('/\s+/u', ' ', str_replace(['<', '>', '{', '}'], '', (string) $v))), 0, $max);
$matiere = $txt($d['matiere'] ?? '', 60); $niveau = $txt($d['niveau'] ?? '', 12); $chapitre = $txt($d['chapitre'] ?? '', 160);
$points = array_slice(array_values(array_filter(array_map(fn($p) => $txt($p, 300), is_array($d['points'] ?? null) ? $d['points'] : []))), 0, 12);
$exemples = array_slice(array_values(array_filter(array_map(fn($p) => $txt($p, 240), is_array($d['exemples'] ?? null) ? $d['exemples'] : []))), 0, 4);
$question = $txt($d['question'] ?? '', 300);
$langue = in_array($d['langue'] ?? 'fr', ['fr', 'en', 'es', 'de', 'it', 'pt'], true) ? ($d['langue'] ?? 'fr') : 'fr';
if ($chapitre === '' || !$points) ami_json(['erreur' => 'lecon'], 400);
// Une question qui ressemble à un numéro de téléphone, une adresse mail ou un lien n'est pas envoyée à l'IA.
if ($question !== '' && preg_match('~https?:|www\.|@|\d{6,}~i', $question)) ami_json(['erreur' => 'question'], 400);
try {
  $db = ami_db(); $jour = gmdate('Y-m-d');
  $cle = 'L-' . substr(hash('sha256', 'lecon|' . ($_SERVER['REMOTE_ADDR'] ?? '?')), 0, 18);
  ami_upsert_compteur($db, 'ami_vannes_appels', ['code' => $cle, 'jour' => $jour]);
  if ((int) ami_val($db, 'SELECT n FROM ami_vannes_appels WHERE code = ? AND jour = ?', [$cle, $jour]) > (int) ($cfg['lecon_par_jour'] ?? 30)) ami_json(['erreur' => 'quota'], 429);
} catch (Throwable $e) { ami_json(['erreur' => 'indisponible'], 503); }
$garde = ami_credits_garde($d['code'] ?? '', 1);
$noms = ['fr' => 'français', 'en' => 'anglais', 'es' => 'espagnol', 'de' => 'allemand', 'it' => 'italien', 'pt' => 'portugais'];
$demande = "Matière : $matiere\nClasse : " . ($niveau ?: '?') . "\nLeçon : $chapitre\nPoints de la leçon :\n- " . implode("\n- ", $points)
  . ($exemples ? "\nExemples de questions et bonnes réponses :\n- " . implode("\n- ", $exemples) : '')
  . "\n" . ($question !== '' ? "Question de l'élève sur cette leçon : $question" : "L'élève demande qu'on lui réexplique toute la leçon.")
  . "\nÉcris en " . $noms[$langue] . '.';
$t = ami_claude(SYSTEME_LECON, [['type' => 'text', 'text' => $demande]], $cfg['anthropic_modele'] ?? 'claude-haiku-5-5', 700, 25);
$t = $t === null ? '' : trim(preg_replace('/[*#`]+/', '', $t));
if (mb_strlen($t) < 20 || preg_match('~https?:|www\.~i', $t)) { ami_credits_rembourser_garde($garde); ami_json(['erreur' => 'ia_indisponible'], 502); }
ami_json(['texte' => mb_substr($t, 0, 1600)]);
