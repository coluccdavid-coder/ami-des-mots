<?php
// Ami des mots — vannes écrites par Claude EN DIRECT pour la question affichée (v5.66).
// Le jeu envoie la question, la bonne réponse, les mauvaises réponses possibles et les dernières vannes déjà dites ;
// Claude répond une vanne neuve par mauvaise réponse. Le jeu la repasse au juge d'Ami et garde ses vannes à lui
// si le serveur ne répond pas vite. Aucune donnée personnelle n'est envoyée (ni prénom, ni code, ni voix).
// POST { sujet, langue, ton:0..3, question, bonne, fausses:[…], deja:[…] } → { vannes:{ "<fausse>":"…" } }
declare(strict_types=1);
require __DIR__ . '/lib.php';
ami_cors('POST');
if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') ami_json(['erreur' => 'methode'], 405);
$cfg = ami_config();
if (($cfg['anthropic_cle'] ?? '') === '' || !($cfg['vannes_direct'] ?? true)) ami_json(['erreur' => 'non_configure'], 503);
ami_limiter('direct', 40);

const SUJETS = ['mots' => 'le vocabulaire anglais (images de mots)', 'anglais' => 'l’anglais', 'maths' => 'les maths', 'sciences' => 'les sciences (espace, corps humain, médecine)'];
const TONS = [
  0 => 'douces et rigolotes (enfants de 5 à 8 ans), sans moquerie',
  1 => 'taquines et absurdes (enfants de 7 à 12 ans)',
  2 => 'piquantes et cash, style clash de cour de récré (10-14 ans)',
  3 => 'très cash, style battle de clash entre ados : punchline qui démonte la réponse, rythme, exagération, répartie',
];
// Un angle tiré au hasard à chaque appel : c'est ce qui évite que l'IA retombe toujours sur les mêmes formules.
const ANGLES = ['commentaire de match en direct', 'flash info de journal télé', 'bulletin météo', 'pub qui vend la mauvaise réponse',
  'critique de restaurant', 'notice de montage', 'interview d’un expert choqué', 'documentaire animalier', 'GPS qui recalcule',
  'arbitre qui siffle', 'chef cuisinier qui goûte', 'détective qui enquête', 'prof de sport', 'jury d’un télé-crochet',
  'agent immobilier', 'contrôleur dans le train', 'astronaute en direct de l’espace', 'magicien dont le tour rate', 'pilote de rallye',
  'grand-mère qui raconte', 'vendeur au marché', 'robot qui bugue', 'présentateur de jeu télé', 'coach de boxe'];
const SYSTEME = "Tu es la voix des vannes de « Ami des mots », un jeu familial où des enfants et des ados francophones apprennent\n"
  . "l'anglais, les maths et les sciences. Quand le joueur choisit une mauvaise réponse, une vanne s'affiche, puis le jeu montre la bonne réponse.\n"
  . "Ta vanne doit être VRAIMENT drôle, surprenante et précise : elle parle de CETTE mauvaise réponse et de CETTE bonne réponse\n"
  . "(un détail concret, une image absurde, une comparaison inattendue), jamais une formule passe-partout.\n"
  . "Règles absolues :\n"
  . "- On clashe la RÉPONSE, jamais la personne : ni son physique, ni son intelligence, ni sa famille, ni son origine, sa religion,\n"
  . "  son genre, un handicap. Pas de « t'es nul », pas de « ta mère ».\n"
  . "- Aucun gros mot, aucune violence, rien de sexuel, rien d'effrayant, aucune marque, aucune personne réelle vivante\n"
  . "  (sauf un savant ou un astronaute cité par la question), aucun personnage de film ou de jeu.\n"
  . "- Faits exacts. 150 caractères au plus. Un émoji au plus, à la fin.\n"
  . "- Ne reprends JAMAIS une vanne de la liste « déjà dites », ni sa structure, ni sa chute.\n"
  . "Réponds UNIQUEMENT par un objet JSON {\"<mauvaise réponse exacte>\": \"vanne\", …}, sans autre texte.";

$d = ami_corps_json(6144);
$txt = fn($v, int $max) => mb_substr(trim(preg_replace('/\s+/u', ' ', str_replace(['<', '>', '{', '}'], '', (string) $v))), 0, $max);
$sujet = isset(SUJETS[$d['sujet'] ?? '']) ? $d['sujet'] : 'mots';
$ton = max(0, min(3, (int) ($d['ton'] ?? 1)));
$langue = ($d['langue'] ?? 'fr') === 'en' ? 'en' : 'fr';
$question = $txt($d['question'] ?? '', 220);
$bonne = $txt($d['bonne'] ?? '', 90);
$fausses = array_values(array_unique(array_filter(array_map(fn($x) => $txt($x, 90), array_slice((array) ($d['fausses'] ?? []), 0, 4)), 'strlen')));
$deja = array_values(array_filter(array_map(fn($x) => $txt($x, 170), array_slice((array) ($d['deja'] ?? []), -30)), 'strlen'));
if ($bonne === '' || !$fausses) ami_json(['erreur' => 'question'], 400);

// Plafond du jour par appareil (empreinte de l'adresse, jamais l'adresse elle-même).
try {
  $db = ami_db(); $jour = gmdate('Y-m-d');
  $cle = 'D-' . substr(hash('sha256', 'direct|' . ($_SERVER['REMOTE_ADDR'] ?? '?') . '|' . ($cfg['db_user'] ?? '')), 0, 18);
  ami_upsert_compteur($db, 'ami_vannes_appels', ['code' => $cle, 'jour' => $jour]);
  $max = (int) ($cfg['vannes_direct_par_jour'] ?? 300);
  if ((int) ami_val($db, 'SELECT n FROM ami_vannes_appels WHERE code = ? AND jour = ?', [$cle, $jour]) > $max) ami_json(['erreur' => 'quota', 'max' => $max], 429);
} catch (Throwable $e) { error_log('ami vannes-direct base ' . $e->getMessage()); ami_json(['erreur' => 'indisponible'], 503); }

$angle = ANGLES[random_int(0, count(ANGLES) - 1)];
$demande = 'Sujet : ' . SUJETS[$sujet] . ".\nQuestion : " . ($question !== '' ? $question : '(une image à nommer)') . "\nBonne réponse : $bonne\n"
  . 'Mauvaises réponses (une vanne pour chacune) : ' . json_encode($fausses, JSON_UNESCAPED_UNICODE) . "\n"
  . 'Ton : ' . TONS[$ton] . ".\nAngle imposé pour au moins une vanne : $angle.\n"
  . ($langue === 'en' ? "Écris les vannes en anglais simple.\n" : "Écris les vannes en français.\n")
  . ($deja ? 'Déjà dites (interdites, ne pas imiter) : ' . json_encode($deja, JSON_UNESCAPED_UNICODE) : '');
$texte = ami_claude(SYSTEME, [['type' => 'text', 'text' => $demande]], $cfg['anthropic_modele'] ?? 'claude-haiku-5-5', 600, 12);
if ($texte === null) ami_json(['erreur' => 'ia_indisponible'], 502);

$a = strpos($texte, '{'); $b = strrpos($texte, '}');
$o = ($a !== false && $b !== false) ? json_decode(substr($texte, $a, $b - $a + 1), true) : null;
$r = [];
if (is_array($o)) foreach ($fausses as $f) {
  $v = $o[$f] ?? null;
  if (!is_string($v)) continue;
  $v = trim(preg_replace('/\s+/u', ' ', str_replace(['<', '>', '{', '}'], '', $v)));
  $n = mb_strlen($v);
  if ($n < 12 || $n > 180 || preg_match('~https?:|www\.|@~i', $v) || in_array($v, $deja, true)) continue;
  $r[$f] = $v;
}
ami_json(['vannes' => (object) $r]);
