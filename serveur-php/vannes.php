<?php
// Ami des mots — vannes proposées par Claude, validées par un adulte dans le jeu (remplace la fonction Supabase ami-vannes).
// POST { code:"AMI-…", theme, ton } → { vannes:[…] }. Réservé à Plus, 5 demandes par jour et par code.
declare(strict_types=1);
require __DIR__ . '/lib.php';
ami_cors('POST');
if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') ami_json(['erreur' => 'methode'], 405);
if ((ami_config()['anthropic_cle'] ?? '') === '') ami_json(['erreur' => 'non_configure'], 503);
ami_limiter('vannes', 10);

const THEMES = ['animaux', 'manger', 'maison', 'habits', 'nature', 'ville', 'musique', 'atelier', 'anglais', 'maths'];
const TONS = [
  'tout-doux' => 'très douces, pour des enfants de 5 à 8 ans, sans aucune moquerie',
  'normal' => 'taquines et absurdes, pour des enfants de 7 à 12 ans',
  'corse' => 'plus piquantes et absurdes, pour des ados, mais toujours gentilles',
];
const PAR_JOUR = 5;
const SYSTEME = "Tu écris des vannes pour « Ami des mots », un jeu familial où des enfants francophones apprennent\n"
  . "l'anglais et les maths avec Plumo, un hibou farceur, et Prof Pi, un prof de maths farceur. Une vanne sort quand l'enfant se trompe.\n"
  . "Règles absolues :\n"
  . "- On taquine l'ERREUR ou Plumo lui-même, JAMAIS la personne : ni son physique, ni son intelligence, ni sa famille\n"
  . "  (pas de « ta mère »), ni son origine, sa religion, son genre, un handicap.\n"
  . "- Aucun gros mot, aucune violence, rien de sexuel, rien d'effrayant, aucune info personnelle, aucune marque, aucune\n"
  . "  personne réelle, aucune référence à un film, une chanson ou un personnage protégé.\n"
  . "- Humour absurde et visuel, bienveillant ; l'enfant doit rire et retenir la bonne réponse.\n"
  . "- En français, 140 caractères au plus. Utilise {f} pour la mauvaise réponse et {j} pour la bonne (au moins {j}).\n"
  . "Réponds UNIQUEMENT par un tableau JSON de 6 chaînes, sans autre texte.";

$d = ami_corps_json(1024);
$code = (string) ($d['code'] ?? '');
$theme = in_array($d['theme'] ?? '', THEMES, true) ? $d['theme'] : 'animaux';
$ton = isset(TONS[$d['ton'] ?? '']) ? $d['ton'] : 'normal';
if (!preg_match(AMI_FORMAT_CODE, $code)) ami_json(['erreur' => 'plus_requis'], 403);
try {
  [$actif] = ami_abonnement_actif($code);
  if (!$actif) ami_json(['erreur' => 'plus_requis'], 403);
  $db = ami_db(); $jour = gmdate('Y-m-d');
  ami_upsert_compteur($db, 'ami_vannes_appels', ['code' => $code, 'jour' => $jour]);
  if ((int) ami_val($db, 'SELECT n FROM ami_vannes_appels WHERE code = ? AND jour = ?', [$code, $jour]) > PAR_JOUR) ami_json(['erreur' => 'quota', 'max' => PAR_JOUR], 429);
} catch (Throwable $e) { error_log('ami vannes base ' . $e->getMessage()); ami_json(['erreur' => 'indisponible'], 503); }

$texte = ami_claude(SYSTEME, [['type' => 'text', 'text' => "Thème : $theme. Vannes " . TONS[$ton] . '. Donne 6 vannes variées.']], ami_config()['anthropic_modele'] ?? 'claude-haiku-5-5', 700);
if ($texte === null) ami_json(['erreur' => 'ia_indisponible'], 502);
ami_json(['vannes' => propositions($texte)]);

// Nettoyage : chaînes courtes, sans balises ni liens, avec {j}. (Le juge de Plumo revérifie dans le jeu.)
function propositions(string $texte): array {
  $a = strpos($texte, '['); $b = strrpos($texte, ']');
  $l = ($a !== false && $b !== false) ? json_decode(substr($texte, $a, $b - $a + 1), true) : null;
  if (!is_array($l)) return [];
  $r = [];
  foreach ($l as $x) {
    if (!is_string($x)) continue;
    $x = trim(preg_replace('/\s+/u', ' ', str_replace(['<', '>'], '', $x)));
    $n = mb_strlen($x);
    if ($n < 10 || $n > 140 || !str_contains($x, '{j}') || preg_match('~https?:|www\.|@~i', $x)) continue;
    $r[$x] = true;
  }
  return array_slice(array_keys($r), 0, 6);
}
