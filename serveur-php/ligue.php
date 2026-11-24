<?php
// Ami des mots — v6.0 : ligue de la semaine entre potes.
// Un code de groupe (6 caractères), des pseudos, un classement qui repart à zéro chaque lundi (semaine ISO, heure de Paris).
// Pas de compte : chaque appareil a un jeton au hasard ; le serveur n'en garde que l'empreinte. Ni nom réel, ni adresse.
// POST { action:"creer", nom } → { code }
// POST { action:"rejoindre"|"points"|"classement", code, jeton, pseudo?, points? }
declare(strict_types=1);
require __DIR__ . '/lib.php';
ami_cors('POST');
if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') ami_json(['erreur' => 'methode'], 405);
ami_limiter('ligue', 40);
const LIGUE_MAX_MEMBRES = 40, LIGUE_MAX_APPEL = 60, LIGUE_MAX_SEMAINE = 5000;
$d = ami_corps_json(1024);
$action = (string) ($d['action'] ?? '');
$semaine = (new DateTime('now', new DateTimeZone('Europe/Paris')))->format('o-\WW');
$avant = (new DateTime('-7 days', new DateTimeZone('Europe/Paris')))->format('o-\WW');
// Pseudo : lettres, chiffres, espaces, tirets ; 2 à 16 caractères ; pas de mot grossier connu ; jamais d'adresse ni de numéro.
function ami_pseudo($p): ?string {
  $p = trim(preg_replace('/\s+/u', ' ', (string) $p));
  if (!preg_match('/^[\p{L}\p{N} _\'-]{2,16}$/u', $p) || preg_match('/\d{5,}/', $p)) return null;
  $bas = mb_strtolower($p);
  foreach (['pute', 'salope', 'connard', 'conne', 'encule', 'enculé', 'merde', 'nique', 'fdp', 'pd', 'batard', 'bâtard', 'nazi', 'hitler', 'fuck', 'shit', 'bitch', 'porn', 'sexe', 'sex'] as $m)
    if (preg_match('/(^|[^\p{L}])' . preg_quote($m, '/') . '([^\p{L}]|$)/u', $bas)) return null;
  return $p;
}
try {
  $db = ami_db();
  // Effacement : scores de plus de 15 jours (la semaine en cours et la précédente suffisent), ligues vides depuis 60 jours.
  if (random_int(1, 20) === 1) { $db->prepare('DELETE FROM ami_ligue_scores WHERE maj < ?')->execute([gmdate('Y-m-d H:i:s', time() - 15 * 86400)]);
    $db->prepare('DELETE FROM ami_ligues WHERE cree < ? AND code NOT IN (SELECT ligue FROM ami_ligue_scores)')->execute([gmdate('Y-m-d H:i:s', time() - 60 * 86400)]); }
  if ($action === 'creer') {
    $nom = trim(mb_substr(preg_replace('/[<>{}]/u', '', (string) ($d['nom'] ?? '')), 0, 30)) ?: 'Les potes';
    $alpha = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
    for ($i = 0; $i < 8; $i++) { $c = ''; for ($k = 0; $k < 6; $k++) $c .= $alpha[random_int(0, strlen($alpha) - 1)];
      try { $db->prepare('INSERT INTO ami_ligues (code, nom, cree) VALUES (?, ?, ?)')->execute([$c, $nom, ami_maintenant()]); ami_json(['code' => $c, 'nom' => $nom]); } catch (PDOException $e) {} }
    ami_json(['erreur' => 'indisponible'], 503);
  }
  $code = strtoupper((string) ($d['code'] ?? ''));
  if (!preg_match('/^[A-HJ-NP-Z2-9]{6}$/', $code)) ami_json(['erreur' => 'code'], 400);
  $nom = ami_val($db, 'SELECT nom FROM ami_ligues WHERE code = ?', [$code]);
  if ($nom === null) ami_json(['erreur' => 'inconnue'], 404);
  if ($action === 'classement') {
    $l = $db->prepare('SELECT pseudo, points FROM ami_ligue_scores WHERE ligue = ? AND semaine = ? ORDER BY points DESC, maj ASC LIMIT 40');
    $l->execute([$code, $semaine]); $c = $l->fetchAll();
    $l->execute([$code, $avant]); $v = $l->fetch();
    ami_json(['nom' => $nom, 'semaine' => $semaine, 'classement' => array_map(fn($r) => ['pseudo' => $r['pseudo'], 'points' => (int) $r['points']], $c),
      'champion_avant' => $v ? ['pseudo' => $v['pseudo'], 'points' => (int) $v['points']] : null]);
  }
  $jeton = (string) ($d['jeton'] ?? '');
  if (!preg_match('/^[A-Za-z0-9_-]{20,64}$/', $jeton)) ami_json(['erreur' => 'jeton'], 400);
  $emp = hash('sha256', 'ligue|' . $jeton);
  if ($action === 'rejoindre' || $action === 'points') {
    $pseudo = ami_pseudo($d['pseudo'] ?? '');
    if ($pseudo === null) ami_json(['erreur' => 'pseudo'], 400);
    $deja = ami_val($db, 'SELECT COUNT(*) FROM ami_ligue_scores WHERE ligue = ? AND semaine = ? AND empreinte = ?', [$code, $semaine, $emp]);
    if (!(int) $deja) {
      if ((int) ami_val($db, 'SELECT COUNT(*) FROM ami_ligue_scores WHERE ligue = ? AND semaine = ?', [$code, $semaine]) >= LIGUE_MAX_MEMBRES) ami_json(['erreur' => 'pleine'], 409);
      // Un pseudo ne peut pas être pris deux fois dans la même ligue la même semaine.
      if ((int) ami_val($db, 'SELECT COUNT(*) FROM ami_ligue_scores WHERE ligue = ? AND semaine = ? AND pseudo = ?', [$code, $semaine, $pseudo])) ami_json(['erreur' => 'pseudo_pris'], 409);
      $db->prepare('INSERT INTO ami_ligue_scores (ligue, semaine, empreinte, pseudo, points, maj) VALUES (?, ?, ?, ?, 0, ?)')->execute([$code, $semaine, $emp, $pseudo, ami_maintenant()]);
    } else $db->prepare('UPDATE ami_ligue_scores SET pseudo = ? WHERE ligue = ? AND semaine = ? AND empreinte = ? AND NOT EXISTS (SELECT 1 FROM (SELECT pseudo FROM ami_ligue_scores WHERE ligue = ? AND semaine = ? AND pseudo = ? AND empreinte <> ?) x)')
      ->execute([$pseudo, $code, $semaine, $emp, $code, $semaine, $pseudo, $emp]);
    if ($action === 'points') {
      $n = max(0, min(LIGUE_MAX_APPEL, (int) ($d['points'] ?? 0)));
      $db->prepare("UPDATE ami_ligue_scores SET points = CASE WHEN points + $n > " . LIGUE_MAX_SEMAINE . ' THEN ' . LIGUE_MAX_SEMAINE . " ELSE points + $n END, maj = ? WHERE ligue = ? AND semaine = ? AND empreinte = ?")
        ->execute([ami_maintenant(), $code, $semaine, $emp]);
    }
    ami_json(['ok' => true, 'nom' => $nom, 'semaine' => $semaine]);
  }
  if ($action === 'quitter') { $db->prepare('DELETE FROM ami_ligue_scores WHERE ligue = ? AND semaine = ? AND empreinte = ?')->execute([$code, $semaine, $emp]); ami_json(['ok' => true]); }
  ami_json(['erreur' => 'action'], 400);
} catch (Throwable $e) { error_log('ami ligue ' . $e->getMessage()); ami_json(['erreur' => 'indisponible'], 503); }
