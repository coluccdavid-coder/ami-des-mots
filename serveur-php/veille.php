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
  // v10.7 : le jeton peut passer dans l'en-tête « X-Veille-Jeton » (il n'apparaît alors pas dans les journaux du serveur) ; « ?jeton= » reste accepté.
  $j = (string) ($_SERVER['HTTP_X_VEILLE_JETON'] ?? $_GET['jeton'] ?? ''); $attendu = (string) (ami_config()['veille_jeton'] ?? '');
  if ($attendu === '' || !hash_equals($attendu, $j)) ami_json(['erreur' => 'interdit'], 403);
  header('Content-Type: text/plain; charset=utf-8');
}
if ((ami_config()['anthropic_cle'] ?? '') === '') { echo "Clé Claude absente : veille désactivée.\n"; exit; }

// v6.75 : toutes les matières, plusieurs systèmes scolaires (France, Italie, Espagne, Allemagne, États-Unis, Royaume-Uni),
// les épreuves d'examen et les diplômes. Pour un NOUVEAU chapitre du programme (France), l'IA rédige aussi une série de questions,
// toujours soumise à validation. Les sortes autorisées dans veille_publication_auto se publient seules (jamais les questions).
require __DIR__ . '/veille-publier.php';
const SYSTEME_VEILLE = "Tu aides un jeu éducatif à suivre les programmes scolaires OFFICIELS (programmes, épreuves d'examen, diplômes).\n"
  . "Tu lis le document fourni et tu réponds UNIQUEMENT par un objet JSON valide, sans texte autour.\n"
  . "N'invente rien : si le document ne contient pas l'information, laisse le champ vide ou la liste vide. Reformule les intitulés en peu de mots, sans recopier de longs passages.";
const SYSTEME_QUESTIONS = "Tu rédiges des questions à choix multiple pour « Ami des mots », un jeu éducatif familial (collège et lycée).\n"
  . "Chaque question porte sur une notion du programme officiel indiqué ; la bonne réponse doit être exacte et vérifiable dans un manuel.\n"
  . "Les 3 mauvaises réponses sont des erreurs typiques d'élèves, plausibles, jamais farfelues. Chaque mauvaise réponse a une « vanne » :\n"
  . "une phrase courte, bienveillante et drôle qui taquine la confusion (jamais la personne) et met sur la voie. Aucune insulte, aucune violence, rien sur le physique, la famille, l'origine, la religion.\n"
  . "Une « règle » d'une phrase rappelle la notion. Réponds UNIQUEMENT par un objet JSON valide.";

$S = sources_veille();
$db = ami_db(); $journal = []; $nouveaux = 0; $maxNouveaux = max(0, min(6, (int) (ami_config()['veille_chapitres_max'] ?? 2)));
$test = fn(string $u) => in_array(parse_url($u, PHP_URL_HOST) . ':' . parse_url($u, PHP_URL_PORT), ami_config()['veille_domaines_test'] ?? [], true);

foreach ($S['sources'] as $ligne) {
  $src = is_array($ligne) ? veille_source($ligne) : null;
  if (!$src) { $journal[] = '✘ ligne de source invalide : ' . json_encode($ligne, JSON_UNESCAPED_UNICODE); continue; }
  ['systeme' => $sys, 'sorte' => $sorte, 'matiere' => $mat, 'classe' => $classe, 'url' => $url] = $src;
  $nom = "$classe $sorte" . ($sys === 'fr' && $mat === 'maths' ? '' : " ($sys, $mat)");
  $h = parse_url($url, PHP_URL_HOST); $sch = parse_url($url, PHP_URL_SCHEME);
  if (!in_array($h, veille_domaines($sys), true) && !$test($url)) { $journal[] = "✘ refusé (domaine non officiel) : $url"; continue; }
  if ($sch !== 'https' && !$test($url)) { $journal[] = "✘ refusé (pas https) : $url"; continue; }
  [$st, $corps, $type] = telecharger($url, $sys);
  if ($st !== 200 || $corps === '') { $journal[] = "✘ $st : $url"; continue; }
  // Empreinte : même formule qu'avant pour les maths de France (les documents déjà lus ne sont pas relus).
  $emp = hash('sha256', ($sys === 'fr' && $mat === 'maths' ? '' : "$sys|$mat|") . $sorte . '|' . $classe . '|' . $corps);
  if (ami_val($db, 'SELECT id FROM ami_veille WHERE empreinte_source = ?', [$emp]) !== null) { $journal[] = "= inchangé : $nom"; continue; }
  $doc = str_contains($type, 'pdf') || str_starts_with($corps, '%PDF')
    ? ['type' => 'document', 'source' => ['type' => 'base64', 'media_type' => 'application/pdf', 'data' => base64_encode($corps)]]
    : ['type' => 'text', 'text' => "Document officiel ($url) :\n\n" . mb_substr(texte_html($corps), 0, 150000)];
  $rep = ami_claude(SYSTEME_VEILLE, [$doc, ['type' => 'text', 'text' => consigne($src)]], ami_config()['anthropic_modele_veille'] ?? 'claude-sonnet-5-5', 4000, 240);
  $prop = $rep === null ? null : extraire_json($rep);
  $prop = $prop ? veille_nettoyer($src, $prop) : null;
  if (!$prop) { $journal[] = "✘ réponse IA inutilisable : $nom"; continue; }
  $auto = veille_publication_auto($sorte);
  $db->prepare('INSERT INTO ami_veille (sorte, classe, source, empreinte_source, proposition, statut, cree, decide) VALUES (?, ?, ?, ?, ?, ?, ?, ?)')
    ->execute([$sorte, $classe, $url, $emp, json_encode($prop, JSON_UNESCAPED_UNICODE), $auto ? 'publie_auto' : 'a_valider', ami_maintenant(), $auto ? ami_maintenant() : null]);
  if ($auto) publier($db, $prop);
  $journal[] = ($auto ? '✔ publié automatiquement : ' : '✔ proposition à valider : ') . $nom;
  // Nouveaux chapitres (France, hors maths) : une série de questions rédigée par l'IA, à valider.
  if ($sorte === 'programme' && $sys === 'fr' && $mat !== 'maths') {
    foreach ($prop['chapitres'] as $c) {
      if ($c['chap'] !== null || $nouveaux >= $maxNouveaux || $c['matiere'] === 'maths') continue;
      $nouveaux++;
      $r2 = ami_claude(SYSTEME_QUESTIONS, [$doc, ['type' => 'text', 'text' => consigne_questions($src, $c)]], ami_config()['anthropic_modele_veille'] ?? 'claude-sonnet-5-5', 8000, 300);
      $q = $r2 === null ? null : extraire_json($r2);
      $q = $q ? veille_nettoyer_questions(['systeme' => $sys, 'matiere' => $c['matiere'], 'classe' => $classe, 'url' => $url], $q, $c['intitule']) : null;
      if (!$q) { $journal[] = '✘ questions inutilisables : ' . $c['intitule']; continue; }
      $db->prepare('INSERT INTO ami_veille (sorte, classe, source, empreinte_source, proposition, statut, cree) VALUES (?, ?, ?, ?, ?, ?, ?)')
        ->execute(['questions', $classe, $url, hash('sha256', 'q|' . $emp . '|' . $c['intitule']), json_encode($q, JSON_UNESCAPED_UNICODE), 'a_valider', ami_maintenant()]);
      $journal[] = '✔ questions à valider : ' . $c['intitule'] . ' (' . count($q['questions']) . ')';
    }
  }
}
echo implode("\n", $journal), "\n";

// Chapitres existants du jeu pour une matière (catalogue fabriqué par npm run verifier).
function chapitres_du_jeu(string $mat): array {
  $c = json_decode((string) @file_get_contents(__DIR__ . '/admin/catalogue.json'), true);
  return is_array($c['matieres'][$mat] ?? null) ? $c['matieres'][$mat] : [];
}
function consigne(array $src): string {
  ['systeme' => $sys, 'sorte' => $sorte, 'matiere' => $mat, 'classe' => $classe, 'url' => $url] = $src;
  $pays = sources_veille()['systemes'][$sys]['nom'] ?? $sys;
  if ($sorte === 'programme' && $sys === 'fr' && $mat === 'maths') {
    $ids = [];
    foreach (glob(dirname(__DIR__) . '/js/maths.js') ?: [] as $f) { preg_match_all("~G\\['([0-9A-Za-z-]+)'\\]~", file_get_contents($f), $m); $ids = array_values(array_unique($m[1])); }
    return "Classe : $classe. Donne la carte des chapitres de mathématiques de cette classe selon ce document, au format :\n"
      . '{"classe":"' . $classe . '","annee":"2026-2027","note":"une phrase sur le programme en vigueur","chapitres":[{"domaine":"Nombres","intitule":"…","exercice":"identifiant ou null"}]}' . "\n"
      . "Pour « exercice », choisis l'identifiant d'exercice existant qui correspond (sinon null) parmi : " . implode(', ', $ids) . ".";
  }
  if ($sorte === 'annales') return "Classe : $classe. Liste les sujets d'examen officiels présentés dans ce document (session, intitulé, lien vers le document officiel),\n"
    . "et pour chacun les grands thèmes abordés, au format :\n"
    . '{"classe":"' . $classe . '","sujets":[{"session":"2026","titre":"…","lien":"https://…","themes":["…"]}]}' . "\nLes liens doivent être ceux du document (domaines officiels).";
  if ($sorte === 'epreuve' || $sorte === 'diplome') return "Système scolaire : $pays. Décris " . ($sorte === 'diplome' ? "le diplôme" : "l'examen") . " présenté dans ce document, tel qu'il est EN VIGUEUR, au format :\n"
    . '{"examen":"nom officiel","session":"2026","resume":"2 phrases","conditions":"comment on l’obtient (moyenne, coefficients…)","epreuves":[{"nom":"…","duree":"…","notation":"…","format":"…"}],"changements":["ce qui change par rapport à avant, une phrase chacun"]}' . "\n"
    . "Rédige en français. Uniquement ce que dit le document.";
  $liste = [];
  foreach (($mat === 'toutes' ? [] : chapitres_du_jeu($mat)) as $c) if (in_array($classe, (array) ($c[2] ?? []), true)) $liste[] = $c[0] . ' = ' . $c[1];
  return "Système scolaire : $pays. Classe (équivalent français) : $classe. Matière : $mat. Donne les chapitres du programme EN VIGUEUR selon ce document, au format :\n"
    . '{"annee":"2026-2027","note":"une phrase : quel programme, depuis quand","changements":["ce qui change, une phrase chacun"],"chapitres":[{"matiere":"' . ($mat === 'toutes' ? 'identifiant' : $mat) . '","domaine":"…","intitule":"…","notions":["…"],"chap":"identifiant existant ou null"}]}' . "\n"
    . ($liste ? "Pour « chap », choisis le chapitre du jeu qui couvre déjà la notion (sinon null) parmi : " . implode(' ; ', array_slice($liste, 0, 120)) . ".\n" : "Mets « chap » à null.\n")
    . "Rédige en français.";
}
function consigne_questions(array $src, array $c): string {
  return "Classe : {$src['classe']}. Matière : {$c['matiere']}. Nouveau chapitre du programme : « {$c['intitule']} » (notions : " . implode(', ', $c['notions']) . ").\n"
    . "Rédige 20 questions en français, au format :\n"
    . '{"questions":[{"q":"énoncé","bon":"bonne réponse courte","faux":[["mauvaise réponse","vanne"],["…","…"],["…","…"]],"regle":"la notion en une phrase"}]}';
}
// Sources : veille-sources.php (la config peut les remplacer, pour les tests).
function telecharger(string $url, string $sys = 'fr'): array {
  // v10.7 : les redirections sont suivies une par une, et chaque étape doit rester sur un domaine officiel en HTTPS
  // (avant, cURL suivait seul les redirections et le domaine n'était vérifié qu'à l'arrivée : une redirection
  // pouvait faire appeler au serveur une adresse interne).
  $autorise = function (string $u) use ($sys): bool {
    $h = parse_url($u, PHP_URL_HOST); if (!is_string($h) || $h === '') return false;
    if (in_array($h . ':' . parse_url($u, PHP_URL_PORT), ami_config()['veille_domaines_test'] ?? [], true)) return true;
    return parse_url($u, PHP_URL_SCHEME) === 'https' && in_array($h, veille_domaines($sys), true);
  };
  for ($saut = 0; $saut <= 3; $saut++) {
    if (!$autorise($url)) return [0, '', ''];
    $h = curl_init($url);
    curl_setopt_array($h, [CURLOPT_RETURNTRANSFER => true, CURLOPT_FOLLOWLOCATION => false, CURLOPT_TIMEOUT => 60,
      CURLOPT_USERAGENT => 'AmiDesMots-veille/1.0 (programmes officiels)', CURLOPT_MAXFILESIZE => 15 << 20,
      CURLOPT_PROTOCOLS => CURLPROTO_HTTPS | CURLPROTO_HTTP]);
    $r = curl_exec($h); $st = (int) curl_getinfo($h, CURLINFO_HTTP_CODE); $type = (string) curl_getinfo($h, CURLINFO_CONTENT_TYPE);
    $suite = (string) curl_getinfo($h, CURLINFO_REDIRECT_URL); curl_close($h);
    if ($st >= 300 && $st < 400 && $suite !== '') { $url = $suite; continue; }
    return [$st, $r === false ? '' : $r, strtolower($type)];
  }
  return [0, '', ''];
}
function texte_html(string $html): string {
  $html = preg_replace('~<(script|style|nav|footer|header)[^>]*>.*?</\1>~is', ' ', $html);
  $html = preg_replace('~<a\s[^>]*href="([^"]+)"[^>]*>(.*?)</a>~is', '$2 [$1]', $html);
  return trim(preg_replace('/\s+/u', ' ', html_entity_decode(strip_tags($html), ENT_QUOTES | ENT_HTML5, 'UTF-8')));
}
function extraire_json(string $t): ?array { $a = strpos($t, '{'); $b = strrpos($t, '}'); if ($a === false || $b === false) return null; $d = json_decode(substr($t, $a, $b - $a + 1), true); return is_array($d) ? $d : null; }
