<?php
// Ami des mots — coin admin du SERVEUR : valider les propositions de la veille (programmes et sujets officiels).
// Protégé par mot de passe (admin_mdp_hash dans la config). Rien n'arrive dans le jeu sans un clic ici.
declare(strict_types=1);
require dirname(__DIR__) . '/lib.php';
header('Content-Type: text/html; charset=utf-8');
header("Content-Security-Policy: default-src 'none'; style-src 'unsafe-inline'; form-action 'self'; base-uri 'none'; frame-ancestors 'none'");
header('X-Frame-Options: DENY'); header('Cache-Control: no-store'); header('X-Robots-Tag: noindex');
session_set_cookie_params(['httponly' => true, 'samesite' => 'Strict', 'secure' => !empty($_SERVER['HTTPS'])]);
session_name('ami_admin'); session_start();
$c = ami_config(); $hash = (string) ($c['admin_mdp_hash'] ?? '');
$e = fn($s) => htmlspecialchars((string) $s, ENT_QUOTES, 'UTF-8');
function page(string $corps): never { echo '<!doctype html><html lang="fr"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Ami des mots — admin serveur</title><style>body{font:16px system-ui;max-width:980px;margin:auto;padding:16px;background:#120c38;color:#f4f1ff}section{background:#1f1757;border-radius:14px;padding:12px 16px;margin:12px 0}button,input{font:inherit;padding:8px 12px;border-radius:10px;border:0}button{background:#ffc93c;font-weight:800;cursor:pointer}.non{background:#e86a6a}td,th{text-align:left;padding:3px 8px;border-bottom:1px solid #3a3080}table{border-collapse:collapse;width:100%}a{color:#ffc93c}.petit{opacity:.8;font-size:.9em}</style>' . $corps . '</html>'; exit; }
if ($hash === '') page('<h1>Coin admin</h1><p>Mot de passe non configuré (admin_mdp_hash). Voir serveur-php/LISEZMOI.md.</p>');

if (($_POST['action'] ?? '') === 'connexion') {
  ami_limiter('admin-connexion', 5);
  if (password_verify((string) ($_POST['mdp'] ?? ''), $hash)) { session_regenerate_id(true); $_SESSION['ok'] = true; $_SESSION['jeton'] = bin2hex(random_bytes(16)); }
  header('Location: ./'); exit;
}
if (empty($_SESSION['ok'])) page('<h1>🛠️ Coin admin du serveur</h1><form method="post"><input type="hidden" name="action" value="connexion"><p><label>Mot de passe <input type="password" name="mdp" autocomplete="current-password" required></label> <button>Entrer</button></p></form>');

$db = ami_db();
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
  if (!hash_equals($_SESSION['jeton'] ?? '', (string) ($_POST['jeton'] ?? ''))) { http_response_code(403); page('<p>Jeton invalide.</p>'); }
  $id = (int) ($_POST['id'] ?? 0); $a = $_POST['action'] ?? '';
  if ($a === 'sortir') { session_destroy(); header('Location: ./'); exit; }
  $s = $db->prepare("SELECT * FROM ami_veille WHERE id = ? AND statut = 'a_valider'"); $s->execute([$id]); $v = $s->fetch();
  if ($v && $a === 'rejeter') $db->prepare("UPDATE ami_veille SET statut = 'rejete', decide = ? WHERE id = ?")->execute([ami_maintenant(), $id]);
  if ($v && $a === 'publier') { publier($db, json_decode($v['proposition'], true)); $db->prepare("UPDATE ami_veille SET statut = 'publie', decide = ? WHERE id = ?")->execute([ami_maintenant(), $id]); }
  header('Location: ./'); exit;
}
function publier(PDO $db, array $p): void {
  $cle = $p['sorte'] === 'programme' ? 'maths-carte' : 'maths-annales';
  $cur = ami_val($db, 'SELECT contenu FROM ami_publications WHERE cle = ?', [$cle]); $cur = $cur ? json_decode($cur, true) : [];
  if ($p['sorte'] === 'programme') {
    $cur['annee'] = $p['annee'] ?: ($cur['annee'] ?? '');
    $ch = []; $n = 0;
    foreach ($p['chapitres'] as $c) { $n++; $ch[] = [$c['exercice'] ?: ('x-' . strtolower($p['classe']) . '-' . $n), $c['domaine'], $c['intitule']]; }
    $cur['niveaux'][$p['classe']] = ['note' => $p['note'], 'chapitres' => $ch];
  } else $cur[$p['classe']] = $p['sujets'];
  $mysql = $db->getAttribute(PDO::ATTR_DRIVER_NAME) === 'mysql';
  $db->prepare('INSERT INTO ami_publications (cle, contenu, maj) VALUES (?, ?, ?) ' . ($mysql ? 'ON DUPLICATE KEY UPDATE contenu = VALUES(contenu), maj = VALUES(maj)' : 'ON CONFLICT(cle) DO UPDATE SET contenu = excluded.contenu, maj = excluded.maj'))
    ->execute([$cle, json_encode($cur, JSON_UNESCAPED_UNICODE), ami_maintenant()]);
}
$j = $e($_SESSION['jeton']);
$l = $db->query("SELECT * FROM ami_veille WHERE statut = 'a_valider' ORDER BY id")->fetchAll();
$out = '<h1>🛠️ Veille des programmes et annales</h1><p class="petit">L’IA a lu les documents officiels. Vérifie, puis publie : le jeu l’affiche à la prochaine ouverture du coin maths.</p>';
if (!$l) $out .= '<section><p>Rien à valider. Lance la veille : <code>php veille.php</code> (ou la tâche planifiée).</p></section>';
foreach ($l as $v) {
  $p = json_decode($v['proposition'], true);
  $out .= '<section><h2>' . $e($v['classe']) . ' — ' . ($p['sorte'] === 'programme' ? 'programme' : 'sujets officiels') . '</h2><p class="petit">Source : <a href="' . $e($v['source']) . '" rel="noopener noreferrer" target="_blank">' . $e($v['source']) . '</a> · ' . $e($v['cree']) . ' UTC</p>';
  if ($p['sorte'] === 'programme') { $out .= '<p>' . $e($p['note']) . '</p><table><tr><th>Domaine</th><th>Chapitre</th><th>Exercices du jeu</th></tr>';
    foreach ($p['chapitres'] as $c) $out .= '<tr><td>' . $e($c['domaine']) . '</td><td>' . $e($c['intitule']) . '</td><td>' . ($c['exercice'] ? $e($c['exercice']) : '🛠️ bientôt') . '</td></tr>';
    $out .= '</table>'; }
  else { $out .= '<ul>'; foreach ($p['sujets'] as $s) $out .= '<li>' . $e($s['session']) . ' — <a href="' . $e($s['lien']) . '" rel="noopener noreferrer" target="_blank">' . $e($s['titre']) . '</a> · ' . $e(implode(', ', $s['themes'])) . '</li>'; $out .= '</ul>'; }
  $out .= '<form method="post" style="display:inline"><input type="hidden" name="jeton" value="' . $j . '"><input type="hidden" name="id" value="' . (int) $v['id'] . '"><button name="action" value="publier">✅ Publier</button> <button class="non" name="action" value="rejeter">❌ Rejeter</button></form></section>';
}
page($out . '<form method="post"><input type="hidden" name="jeton" value="' . $j . '"><button name="action" value="sortir">Se déconnecter</button></form>');
