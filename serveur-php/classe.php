<?php
// Ami des mots — v6.0 : défi de classe. Le prof crée un défi (matière, niveau, nombre de questions) ; toute la classe
// joue la MÊME série (même graine) ; le prof voit les résultats avec sa clé. Pas de compte, pas de nom de famille :
// un pseudo ou un prénom, et un jeton d'appareil au hasard (seule son empreinte est gardée). Effacé au bout de 60 jours.
// POST { action:"creer", nom, matiere, niveau, n } → { code, cle }   (la clé n'est montrée qu'une fois)
// POST { action:"infos", code } · { action:"score", code, jeton, pseudo, bonnes, total } · { action:"resultats"|"fermer", code, cle }
declare(strict_types=1);
require __DIR__ . '/lib.php';
ami_cors('POST');
if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') ami_json(['erreur' => 'methode'], 405);
ami_limiter('classe', 60);
$d = ami_corps_json(1024); $action = (string) ($d['action'] ?? '');
$propre = fn($v, int $max) => trim(mb_substr(preg_replace('/[<>{}]/u', '', preg_replace('/\s+/u', ' ', (string) $v)), 0, $max));
try {
  $db = ami_db();
  if ($action === 'creer') {
    ami_limiter('classe-creer', 5);
    $db->prepare('DELETE FROM ami_classe_scores WHERE classe IN (SELECT code FROM ami_classes WHERE cree < ?)')->execute([gmdate('Y-m-d H:i:s', time() - 60 * 86400)]);
    $db->prepare('DELETE FROM ami_classes WHERE cree < ?')->execute([gmdate('Y-m-d H:i:s', time() - 60 * 86400)]);
    $nom = $propre($d['nom'] ?? '', 40) ?: 'Défi de classe';
    $matiere = (string) ($d['matiere'] ?? ''); $niveau = (string) ($d['niveau'] ?? '');
    if (!preg_match('/^[a-z0-9-]{2,20}$/', $matiere) || !in_array($niveau, ['6e', '5e', '4e', '3e', '2nde', '1re', 'Tle', 'Sup'], true)) ami_json(['erreur' => 'format'], 400);
    $n = max(5, min(30, (int) ($d['n'] ?? 10))); $graine = random_int(1, 2000000000);
    $cle = rtrim(strtr(base64_encode(random_bytes(18)), '+/', '-_'), '=');
    $alpha = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
    for ($i = 0; $i < 8; $i++) { $c = ''; for ($k = 0; $k < 6; $k++) $c .= $alpha[random_int(0, strlen($alpha) - 1)];
      try { $db->prepare('INSERT INTO ami_classes (code, nom, matiere, niveau, n, graine, cle, ouvert, cree) VALUES (?, ?, ?, ?, ?, ?, ?, 1, ?)')->execute([$c, $nom, $matiere, $niveau, $n, $graine, hash('sha256', $cle), ami_maintenant()]);
        ami_json(['code' => $c, 'cle' => $cle, 'nom' => $nom]); } catch (PDOException $e) {} }
    ami_json(['erreur' => 'indisponible'], 503);
  }
  $code = strtoupper((string) ($d['code'] ?? ''));
  if (!preg_match('/^[A-HJ-NP-Z2-9]{6}$/', $code)) ami_json(['erreur' => 'code'], 400);
  $s = $db->prepare('SELECT * FROM ami_classes WHERE code = ?'); $s->execute([$code]); $c = $s->fetch();
  if (!$c) ami_json(['erreur' => 'inconnu'], 404);
  if ($action === 'infos') ami_json(['nom' => $c['nom'], 'matiere' => $c['matiere'], 'niveau' => $c['niveau'], 'n' => (int) $c['n'], 'graine' => (int) $c['graine'], 'ouvert' => (bool) $c['ouvert']]);
  if ($action === 'score') {
    if (!(int) $c['ouvert']) ami_json(['erreur' => 'ferme'], 409);
    $jeton = (string) ($d['jeton'] ?? ''); $pseudo = $propre($d['pseudo'] ?? '', 20);
    if (!preg_match('/^[A-Za-z0-9_-]{20,64}$/', $jeton) || !preg_match('/^[\p{L}\p{N} ._\'-]{2,20}$/u', $pseudo)) ami_json(['erreur' => 'format'], 400);
    $total = (int) $c['n']; $bonnes = max(0, min($total, (int) ($d['bonnes'] ?? 0))); $emp = hash('sha256', 'classe|' . $jeton);
    $deja = $db->prepare('SELECT bonnes FROM ami_classe_scores WHERE classe = ? AND empreinte = ?'); $deja->execute([$code, $emp]); $x = $deja->fetch();
    if ($x) { if ($bonnes > (int) $x['bonnes']) $db->prepare('UPDATE ami_classe_scores SET bonnes = ?, pseudo = ?, maj = ? WHERE classe = ? AND empreinte = ?')->execute([$bonnes, $pseudo, ami_maintenant(), $code, $emp]); }
    else {
      if ((int) ami_val($db, 'SELECT COUNT(*) FROM ami_classe_scores WHERE classe = ?', [$code]) >= 60) ami_json(['erreur' => 'plein'], 409);
      $db->prepare('INSERT INTO ami_classe_scores (classe, empreinte, pseudo, bonnes, total, maj) VALUES (?, ?, ?, ?, ?, ?)')->execute([$code, $emp, $pseudo, $bonnes, $total, ami_maintenant()]);
    }
    ami_json(['ok' => true]);
  }
  if ($action === 'resultats' || $action === 'fermer') {
    if (!hash_equals((string) $c['cle'], hash('sha256', (string) ($d['cle'] ?? '')))) ami_json(['erreur' => 'cle'], 403);
    if ($action === 'fermer') { $db->prepare('UPDATE ami_classes SET ouvert = 0 WHERE code = ?')->execute([$code]); ami_json(['ok' => true]); }
    $l = $db->prepare('SELECT pseudo, bonnes, total, maj FROM ami_classe_scores WHERE classe = ? ORDER BY bonnes DESC, pseudo ASC'); $l->execute([$code]);
    ami_json(['nom' => $c['nom'], 'matiere' => $c['matiere'], 'niveau' => $c['niveau'], 'n' => (int) $c['n'], 'ouvert' => (bool) $c['ouvert'],
      'eleves' => array_map(fn($r) => ['pseudo' => $r['pseudo'], 'bonnes' => (int) $r['bonnes'], 'total' => (int) $r['total'], 'date' => ami_iso($r['maj'])], $l->fetchAll())]);
  }
  ami_json(['erreur' => 'action'], 400);
} catch (Throwable $e) { error_log('ami classe ' . $e->getMessage()); ami_json(['erreur' => 'indisponible'], 503); }
