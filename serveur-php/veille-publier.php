<?php
// Ami des mots — veille des programmes (v6.75) : fonctions partagées par veille.php (lecture) et admin/ (validation).
// Une proposition de l'IA n'est publiée qu'après validation d'un adulte, sauf les sortes que la configuration autorise
// explicitement à se publier seules (veille_publication_auto). Les QUESTIONS ne se publient JAMAIS seules.
declare(strict_types=1);

const VEILLE_SORTES = ['programme', 'annales', 'epreuve', 'diplome', 'questions'];
const VEILLE_AUTO_POSSIBLE = ['programme', 'annales', 'epreuve', 'diplome'];   // « questions » volontairement absent
const VEILLE_CLASSES = ['6e', '5e', '4e', '3e', '2nde', '1re', 'Tle'];

function sources_veille(): array { return ami_config()['veille_sources'] ?? (require __DIR__ . '/veille-sources.php'); }

// Une ligne de sources → forme complète.
function veille_source(array $s): ?array {
  if (array_is_list($s) && count($s) === 3) [$sorte, $classe, $url] = $s; else { $sorte = $s['sorte'] ?? ''; $classe = $s['classe'] ?? ''; $url = $s['url'] ?? ''; }
  $sys = array_is_list($s) ? 'fr' : (string) ($s['systeme'] ?? 'fr'); $mat = array_is_list($s) ? 'maths' : (string) ($s['matiere'] ?? 'maths');
  if (!in_array($sorte, VEILLE_SORTES, true) || $sorte === 'questions' || !in_array($classe, VEILLE_CLASSES, true) || !is_string($url)) return null;
  if (!preg_match('/^[a-z]{2}$/', $sys) || !preg_match('/^[a-z][a-z0-9-]{0,30}$/', $mat)) return null;
  $id = !array_is_list($s) && is_string($s['id'] ?? null) && preg_match('/^[a-z0-9-]{1,40}$/', $s['id']) ? $s['id'] : null;   // v6.76 : fiche d'examen fixée
  return ['systeme' => $sys, 'sorte' => $sorte, 'matiere' => $mat, 'classe' => $classe, 'url' => $url, 'id' => $id];
}
// Domaines officiels d'un système (France : la liste historique, plus celle du système si elle existe).
function veille_domaines(string $sys): array {
  $S = sources_veille(); $d = $S['systemes'][$sys]['domaines'] ?? [];
  if ($sys === 'fr') $d = array_merge($S['domaines'] ?? [], $d);
  return array_values(array_unique($d));
}
function veille_tous_domaines(): array {
  $S = sources_veille(); $d = $S['domaines'] ?? [];
  foreach (($S['systemes'] ?? []) as $x) $d = array_merge($d, $x['domaines'] ?? []);
  return array_values(array_unique($d));
}
function veille_lien_officiel(string $l, string $sys): bool {
  return parse_url($l, PHP_URL_SCHEME) === 'https' && in_array(parse_url($l, PHP_URL_HOST), veille_domaines($sys), true);
}
function veille_txt($x, int $n): string { return is_string($x) ? mb_substr(trim(preg_replace('/\s+/u', ' ', strip_tags($x))), 0, $n) : ''; }

// ── Nettoyage des réponses de l'IA : seulement des champs courts et attendus ──
function veille_nettoyer(array $src, array $p): ?array {
  ['systeme' => $sys, 'sorte' => $sorte, 'matiere' => $mat, 'classe' => $classe, 'url' => $source] = $src;
  $t = 'veille_txt';
  $base = ['systeme' => $sys, 'sorte' => $sorte, 'matiere' => $mat, 'classe' => $classe, 'source' => $source];
  if ($sorte === 'programme' && $mat === 'maths' && $sys === 'fr') {   // forme historique (carte de maths)
    $ch = [];
    foreach (array_slice(is_array($p['chapitres'] ?? null) ? $p['chapitres'] : [], 0, 60) as $c) {
      $int = $t($c['intitule'] ?? '', 120); if ($int === '') continue;
      $ex = is_string($c['exercice'] ?? null) && preg_match('/^[0-9A-Za-z-]{1,40}$/', $c['exercice']) ? $c['exercice'] : null;
      $ch[] = ['domaine' => $t($c['domaine'] ?? 'Maths', 40) ?: 'Maths', 'intitule' => $int, 'exercice' => $ex];
    }
    return $ch ? $base + ['annee' => $t($p['annee'] ?? '', 12), 'note' => $t($p['note'] ?? '', 200), 'chapitres' => $ch] : null;
  }
  if ($sorte === 'programme') {
    $ch = [];
    foreach (array_slice(is_array($p['chapitres'] ?? null) ? $p['chapitres'] : [], 0, 80) as $c) {
      $int = $t($c['intitule'] ?? '', 120); if ($int === '') continue;
      $id = is_string($c['chap'] ?? null) && preg_match('/^[0-9A-Za-z-]{1,40}$/', $c['chap']) ? $c['chap'] : null;
      $m = is_string($c['matiere'] ?? null) && preg_match('/^[a-z][a-z0-9-]{0,30}$/', $c['matiere']) ? $c['matiere'] : $mat;
      $no = array_values(array_filter(array_map(fn($x) => $t($x, 60), array_slice(is_array($c['notions'] ?? null) ? $c['notions'] : [], 0, 10))));
      $ch[] = ['matiere' => $m, 'domaine' => $t($c['domaine'] ?? '', 40), 'intitule' => $int, 'notions' => $no, 'chap' => $id];
    }
    return $ch ? $base + ['annee' => $t($p['annee'] ?? '', 12), 'note' => $t($p['note'] ?? '', 240), 'changements' => veille_liste($p['changements'] ?? null, 12, 160), 'chapitres' => $ch] : null;
  }
  if ($sorte === 'annales') {
    $su = [];
    foreach (array_slice(is_array($p['sujets'] ?? null) ? $p['sujets'] : [], 0, 40) as $x) {
      $l = is_string($x['lien'] ?? null) ? $x['lien'] : ''; if (!veille_lien_officiel($l, $sys)) continue;
      $su[] = ['session' => $t($x['session'] ?? '', 20), 'titre' => $t($x['titre'] ?? '', 120), 'lien' => $l, 'themes' => veille_liste($x['themes'] ?? null, 8, 40)];
    }
    return $base + ['sujets' => $su];
  }
  if ($sorte === 'epreuve' || $sorte === 'diplome') {
    $ep = [];
    foreach (array_slice(is_array($p['epreuves'] ?? null) ? $p['epreuves'] : [], 0, 20) as $x) {
      $n = $t($x['nom'] ?? '', 80); if ($n === '') continue;
      $ep[] = ['nom' => $n, 'duree' => $t($x['duree'] ?? '', 30), 'notation' => $t($x['notation'] ?? '', 80), 'format' => $t($x['format'] ?? '', 200)];
    }
    $ex = $t($p['examen'] ?? '', 80); if ($ex === '') return null;
    $id = substr(preg_replace('/[^a-z0-9]+/', '-', strtolower(iconv('UTF-8', 'ASCII//TRANSLIT//IGNORE', $ex) ?: 'examen')), 0, 40);
    return $base + ['examen' => $ex, 'id' => $src['id'] ?? (trim($id, '-') ?: 'examen'), 'session' => $t($p['session'] ?? '', 20), 'resume' => $t($p['resume'] ?? '', 400),
      'conditions' => $t($p['conditions'] ?? '', 300), 'epreuves' => $ep, 'changements' => veille_liste($p['changements'] ?? null, 12, 160)];
  }
  return null;
}
function veille_liste($l, int $n, int $max): array { return array_values(array_filter(array_map(fn($x) => veille_txt($x, $max), array_slice(is_array($l) ? $l : [], 0, $n)))); }

// Questions rédigées par l'IA pour un nouveau chapitre : format strict, rien d'autre.
// Les vannes sont aussi relues dans le jeu par le juge de Plumo avant d'être montrées.
function veille_nettoyer_questions(array $src, array $p, string $nom): ?array {
  $t = 'veille_txt'; $q = [];
  foreach (array_slice(is_array($p['questions'] ?? null) ? $p['questions'] : [], 0, 20) as $x) {
    $e = $t($x['q'] ?? '', 240); $b = $t($x['bon'] ?? '', 120); $r = $t($x['regle'] ?? '', 240);
    if ($e === '' || $b === '' || $r === '' || !is_array($x['faux'] ?? null)) continue;
    $f = []; $vus = [mb_strtolower($b) => 1];
    foreach (array_slice($x['faux'], 0, 3) as $y) {
      $fe = $t(is_array($y) ? ($y[0] ?? '') : '', 120); $fv = $t(is_array($y) ? ($y[1] ?? '') : '', 200);
      if ($fe === '' || $fv === '' || isset($vus[mb_strtolower($fe)])) continue; $vus[mb_strtolower($fe)] = 1; $f[] = [$fe, $fv];
    }
    if (count($f) === 3) $q[] = [$e, $b, $f, $r];
  }
  if (count($q) < 10) return null;   // une leçon du jeu, c'est 20 questions : en dessous de 10, on ne propose rien
  return ['systeme' => $src['systeme'], 'sorte' => 'questions', 'matiere' => $src['matiere'], 'classe' => $src['classe'], 'source' => $src['url'], 'nom' => $t($nom, 80), 'questions' => $q];
}

// ── Publication (validation d'un adulte, ou automatique si la configuration l'autorise) ──
function veille_publication_auto(string $sorte): bool {
  $a = ami_config()['veille_publication_auto'] ?? [];
  return is_array($a) && in_array($sorte, $a, true) && in_array($sorte, VEILLE_AUTO_POSSIBLE, true);
}
function veille_lire(PDO $db, string $cle): array { $c = ami_val($db, 'SELECT contenu FROM ami_publications WHERE cle = ?', [$cle]); $d = $c ? json_decode($c, true) : null; return is_array($d) ? $d : []; }
function veille_ecrire(PDO $db, string $cle, array $v): void {
  $mysql = $db->getAttribute(PDO::ATTR_DRIVER_NAME) === 'mysql';
  $db->prepare('INSERT INTO ami_publications (cle, contenu, maj) VALUES (?, ?, ?) ' . ($mysql ? 'ON DUPLICATE KEY UPDATE contenu = VALUES(contenu), maj = VALUES(maj)' : 'ON CONFLICT(cle) DO UPDATE SET contenu = excluded.contenu, maj = excluded.maj'))
    ->execute([$cle, json_encode($v, JSON_UNESCAPED_UNICODE), ami_maintenant()]);
}
function publier(PDO $db, array $p): void {
  $sys = $p['systeme'] ?? 'fr'; $mat = $p['matiere'] ?? 'maths'; $sorte = $p['sorte'] ?? '';
  if (($sorte === 'programme' || $sorte === 'annales') && $sys === 'fr' && $mat === 'maths') {   // forme historique
    $cle = $sorte === 'programme' ? 'maths-carte' : 'maths-annales'; $cur = veille_lire($db, $cle);
    if ($sorte === 'programme') {
      $cur['annee'] = $p['annee'] ?: ($cur['annee'] ?? '');
      $ch = []; $n = 0;
      foreach ($p['chapitres'] as $c) { $n++; $ch[] = [$c['exercice'] ?: ('x-' . strtolower($p['classe']) . '-' . $n), $c['domaine'], $c['intitule']]; }
      $cur['niveaux'][$p['classe']] = ['note' => $p['note'], 'chapitres' => $ch];
    } else $cur[$p['classe']] = $p['sujets'];
    veille_ecrire($db, $cle, $cur); return;
  }
  $quand = gmdate('Y-m-d');
  if ($sorte === 'programme') {
    $cur = veille_lire($db, 'programmes');
    $cur[$sys][$mat][$p['classe']] = ['annee' => $p['annee'], 'note' => $p['note'], 'changements' => $p['changements'], 'source' => $p['source'], 'maj' => $quand,
      'chapitres' => array_map(fn($c) => [$c['chap'], $c['matiere'], $c['domaine'], $c['intitule'], $c['notions']], $p['chapitres'])];
    veille_ecrire($db, 'programmes', $cur);
  } elseif ($sorte === 'annales') {
    $cur = veille_lire($db, 'annales'); $cur[$sys][$mat][$p['classe']] = $p['sujets']; veille_ecrire($db, 'annales', $cur);
  } elseif ($sorte === 'epreuve' || $sorte === 'diplome') {
    $cur = veille_lire($db, 'examens');
    $cur[$sys][$p['id']] = ['sorte' => $sorte, 'examen' => $p['examen'], 'classe' => $p['classe'], 'session' => $p['session'], 'resume' => $p['resume'], 'conditions' => $p['conditions'],
      'epreuves' => $p['epreuves'], 'changements' => $p['changements'], 'source' => $p['source'], 'maj' => $quand];
    veille_ecrire($db, 'examens', $cur);
  } elseif ($sorte === 'questions' && $sys === 'fr') {
    // Nouveau chapitre du programme, avec ses questions : le jeu l'ajoute à la matière, dans la classe indiquée.
    $cur = veille_lire($db, 'contenus');
    $id = 'v-' . substr(preg_replace('/[^a-z0-9]+/', '-', strtolower(iconv('UTF-8', 'ASCII//TRANSLIT//IGNORE', $p['nom']) ?: 'chapitre')), 0, 30) . '-' . strtolower($p['classe']);
    $cur[$mat][trim($id, '-')] = ['nom' => $p['nom'], 'classe' => $p['classe'], 'banque' => $p['questions'], 'source' => $p['source'], 'maj' => $quand];
    veille_ecrire($db, 'contenus', $cur);
  }
}
