<?php
// Ami des mots — veille des programmes et des annales de maths (6e → Terminale).
// L'IA (Claude) lit les documents OFFICIELS listés dans veille-sources.php et PROPOSE :
//  · la carte des chapitres d'une classe (rattachés aux exercices existants du jeu) ;
//  · la liste des sujets d'examen officiels (liens vers les documents du ministère, jamais recopiés).
// Rien n'est publié sans validation dans le coin admin du serveur (admin/). Un document déjà lu (même empreinte) est ignoré.
// Lancer : php veille.php   ou tâche planifiée web : https://…/serveur/veille.php?jeton=<veille_jeton>
declare(strict_types=1);
require __DIR__ . '/lib.php';
set_time_limit(600);
$cli = PHP_SAPI === 'cli';
if (!$cli) {
  $j = (string) ($_GET['jeton'] ?? ''); $attendu = (string) (ami_config()['veille_jeton'] ?? '');
  if ($attendu === '' || !hash_equals($attendu, $j)) ami_json(['erreur' => 'interdit'], 403);
  header('Content-Type: text/plain; charset=utf-8');
}
if ((ami_config()['anthropic_cle'] ?? '') === '') { echo "Clé Claude absente : veille désactivée.\n"; exit; }

const SYSTEME_VEILLE = "Tu aides un jeu éducatif français à suivre les programmes OFFICIELS de mathématiques.\n"
  . "Tu lis le document fourni et tu réponds UNIQUEMENT par un objet JSON valide, sans texte autour.\n"
  . "N'invente rien : si le document ne contient pas l'information, laisse la liste vide. Reformule les intitulés en peu de mots, sans recopier de longs passages.";

$S = sources_veille();
$domaines = array_merge($S['domaines'], ami_config()['veille_domaines_test'] ?? []);
$db = ami_db(); $journal = [];

foreach ($S['sources'] as [$sorte, $classe, $url]) {
  $h = parse_url($url, PHP_URL_HOST); $sch = parse_url($url, PHP_URL_SCHEME);
  $test = in_array($h . ':' . parse_url($url, PHP_URL_PORT), ami_config()['veille_domaines_test'] ?? [], true);
  if (!in_array($h, $domaines, true) && !$test) { $journal[] = "✘ refusé (domaine non officiel) : $url"; continue; }
  if ($sch !== 'https' && !$test) { $journal[] = "✘ refusé (pas https) : $url"; continue; }
  [$st, $corps, $type] = telecharger($url);
  if ($st !== 200 || $corps === '') { $journal[] = "✘ $st : $url"; continue; }
  $emp = hash('sha256', $sorte . '|' . $classe . '|' . $corps);
  if (ami_val($db, 'SELECT id FROM ami_veille WHERE empreinte_source = ?', [$emp]) !== null) { $journal[] = "= inchangé : $classe $sorte"; continue; }
  $contenu = str_contains($type, 'pdf') || str_starts_with($corps, '%PDF')
    ? [['type' => 'document', 'source' => ['type' => 'base64', 'media_type' => 'application/pdf', 'data' => base64_encode($corps)]]]
    : [['type' => 'text', 'text' => "Document officiel ($url) :\n\n" . mb_substr(texte_html($corps), 0, 150000)]];
  $contenu[] = ['type' => 'text', 'text' => consigne($sorte, $classe, $url)];
  $rep = ami_claude(SYSTEME_VEILLE, $contenu, ami_config()['anthropic_modele_veille'] ?? 'claude-sonnet-5-5', 4000, 240);
  $prop = $rep === null ? null : extraire_json($rep);
  $prop = $prop ? nettoyer($sorte, $classe, $prop, $url) : null;
  if (!$prop) { $journal[] = "✘ réponse IA inutilisable : $classe $sorte"; continue; }
  $db->prepare('INSERT INTO ami_veille (sorte, classe, source, empreinte_source, proposition, statut, cree) VALUES (?, ?, ?, ?, ?, ?, ?)')
    ->execute([$sorte, $classe, $url, $emp, json_encode($prop, JSON_UNESCAPED_UNICODE), 'a_valider', ami_maintenant()]);
  $journal[] = "✔ proposition à valider : $classe $sorte";
}
echo implode("\n", $journal), "\n";

function consigne(string $sorte, string $classe, string $url): string {
  if ($sorte === 'programme') {
    $ids = [];
    foreach (glob(dirname(__DIR__) . '/js/maths.js') ?: [] as $f) { preg_match_all("~G\\['([0-9A-Za-z-]+)'\\]~", file_get_contents($f), $m); $ids = array_values(array_unique($m[1])); }
    return "Classe : $classe. Donne la carte des chapitres de mathématiques de cette classe selon ce document, au format :\n"
      . '{"classe":"' . $classe . '","annee":"2026-2027","note":"une phrase sur le programme en vigueur","chapitres":[{"domaine":"Nombres","intitule":"…","exercice":"identifiant ou null"}]}' . "\n"
      . "Pour « exercice », choisis l'identifiant d'exercice existant qui correspond (sinon null) parmi : " . implode(', ', $ids) . ".";
  }
  return "Classe : $classe. Liste les sujets d'examen officiels de mathématiques présentés dans ce document (session, intitulé, lien vers le document officiel),\n"
    . "et pour chacun les grands thèmes abordés, au format :\n"
    . '{"classe":"' . $classe . '","sujets":[{"session":"2026","titre":"…","lien":"https://…","themes":["…"]}]}' . "\nLes liens doivent être ceux du document (domaines officiels).";
}
// Sources : veille-sources.php (la config peut les remplacer, pour les tests).
function sources_veille(): array { return ami_config()['veille_sources'] ?? (require __DIR__ . '/veille-sources.php'); }
function telecharger(string $url): array {
  $h = curl_init($url);
  curl_setopt_array($h, [CURLOPT_RETURNTRANSFER => true, CURLOPT_FOLLOWLOCATION => true, CURLOPT_MAXREDIRS => 3, CURLOPT_TIMEOUT => 60,
    CURLOPT_USERAGENT => 'AmiDesMots-veille/1.0 (programmes officiels)', CURLOPT_MAXFILESIZE => 15 << 20,
    CURLOPT_PROTOCOLS => CURLPROTO_HTTPS | CURLPROTO_HTTP, CURLOPT_REDIR_PROTOCOLS => CURLPROTO_HTTPS]);
  $r = curl_exec($h); $st = (int) curl_getinfo($h, CURLINFO_HTTP_CODE); $type = (string) curl_getinfo($h, CURLINFO_CONTENT_TYPE);
  $fin = (string) curl_getinfo($h, CURLINFO_EFFECTIVE_URL); curl_close($h);
  // Après redirection, on reste sur un domaine officiel.
  $S = sources_veille();
  $hf = parse_url($fin, PHP_URL_HOST);
  if (!in_array($hf, $S['domaines'], true) && !in_array($hf . ':' . parse_url($fin, PHP_URL_PORT), ami_config()['veille_domaines_test'] ?? [], true)) return [0, '', ''];
  return [$st, $r === false ? '' : $r, strtolower($type)];
}
function texte_html(string $html): string {
  $html = preg_replace('~<(script|style|nav|footer|header)[^>]*>.*?</\1>~is', ' ', $html);
  $html = preg_replace('~<a\s[^>]*href="([^"]+)"[^>]*>(.*?)</a>~is', '$2 [$1]', $html);
  return trim(preg_replace('/\s+/u', ' ', html_entity_decode(strip_tags($html), ENT_QUOTES | ENT_HTML5, 'UTF-8')));
}
function extraire_json(string $t): ?array { $a = strpos($t, '{'); $b = strrpos($t, '}'); if ($a === false || $b === false) return null; $d = json_decode(substr($t, $a, $b - $a + 1), true); return is_array($d) ? $d : null; }
// On ne garde que des champs courts et attendus ; les liens doivent rester sur des domaines officiels.
function nettoyer(string $sorte, string $classe, array $p, string $source): ?array {
  $txt = fn($x, $n) => is_string($x) ? mb_substr(trim(preg_replace('/\s+/u', ' ', strip_tags($x))), 0, $n) : '';
  if ($sorte === 'programme') {
    $ch = [];
    foreach (array_slice(is_array($p['chapitres'] ?? null) ? $p['chapitres'] : [], 0, 60) as $c) {
      $int = $txt($c['intitule'] ?? '', 120); if ($int === '') continue;
      $ex = is_string($c['exercice'] ?? null) && preg_match('/^[0-9A-Za-z-]{1,40}$/', $c['exercice']) ? $c['exercice'] : null;
      $ch[] = ['domaine' => $txt($c['domaine'] ?? 'Maths', 40) ?: 'Maths', 'intitule' => $int, 'exercice' => $ex];
    }
    return $ch ? ['sorte' => 'programme', 'classe' => $classe, 'annee' => $txt($p['annee'] ?? '', 12), 'note' => $txt($p['note'] ?? '', 200), 'chapitres' => $ch, 'source' => $source] : null;
  }
  $S = sources_veille(); $su = [];
  foreach (array_slice(is_array($p['sujets'] ?? null) ? $p['sujets'] : [], 0, 40) as $x) {
    $l = is_string($x['lien'] ?? null) ? $x['lien'] : ''; $h = parse_url($l, PHP_URL_HOST);
    if (parse_url($l, PHP_URL_SCHEME) !== 'https' || !in_array($h, $S['domaines'], true)) continue;
    $su[] = ['session' => $txt($x['session'] ?? '', 20), 'titre' => $txt($x['titre'] ?? '', 120), 'lien' => $l, 'themes' => array_values(array_filter(array_map(fn($t) => $txt($t, 40), array_slice(is_array($x['themes'] ?? null) ? $x['themes'] : [], 0, 8))))];
  }
  return ['sorte' => 'annales', 'classe' => $classe, 'sujets' => $su, 'source' => $source];
}
