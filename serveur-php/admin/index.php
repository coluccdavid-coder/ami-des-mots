<?php
// Ami des mots — coin admin du SERVEUR : valider les propositions de la veille (programmes et sujets officiels).
// Protégé par mot de passe (admin_mdp_hash dans la config). Rien n'arrive dans le jeu sans un clic ici.
// v5.85 : on y règle aussi l'offre (payant ou non, prix, lien de paiement, ce qui est réservé à Plus) ; le jeu l'applique, signée.
declare(strict_types=1);
require dirname(__DIR__) . '/lib.php';
require dirname(__DIR__) . '/veille-publier.php';   // v6.75 : publier() et les sortes de la veille
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
  if ($a === 'offre') { enregistrer_offre($db, $_POST); header('Location: ./?ok=offre'); exit; }
  // v6.0 : offrir l'accès Plus à quelqu'un (durée ou à vie), ou le retirer.
  if ($a === 'offrir') { $co = strtoupper(trim((string) ($_POST['code'] ?? ''))); $duree = (string) ($_POST['duree'] ?? '1'); $note = mb_substr(trim(preg_replace('/[<>]/', '', (string) ($_POST['note'] ?? ''))), 0, 40);
    if (!preg_match(AMI_FORMAT_CODE, $co)) $msgOffert = '⚠️ Code invalide (format AMI-XXXX-XXXX-XXXX : le joueur le trouve dans Réglages).';
    else { $vie = $duree === 'vie'; $mois = max(1, min(36, (int) $duree));
      $fin = $vie ? AMI_FIN_A_VIE : gmdate('Y-m-d H:i:s', strtotime('+' . $mois . ' months'));
      $r = ami_inscrire_droit($db, $co, 'offert:' . $note, 'offert:' . bin2hex(random_bytes(6)), $vie ? 'a_vie' : 'cadeau', $fin);
      $msgOffert = $r === 'ok' ? '✅ Plus offert à ' . $co . ($vie ? ' à vie' : ' pour ' . $mois . ' mois') . '. Le jeu l’ouvre à sa prochaine ouverture.' : ($r === 'deja_a_vie' ? 'ℹ️ Ce code a déjà Plus à vie.' : 'ℹ️ Ce code a déjà un abonnement payé en cours : rien n’a été changé.'); } }
  if ($a === 'retirer') { $co = strtoupper(trim((string) ($_POST['code'] ?? '')));
    if (preg_match(AMI_FORMAT_CODE, $co)) { $db->prepare("UPDATE ami_abonnements SET statut = 'retire', maj = ? WHERE code = ? AND client LIKE 'offert:%'")->execute([ami_maintenant(), $co]); $msgOffert = '🗑️ Accès offert retiré à ' . $co . '.'; } }
  if ($a === 'geste') { $cg = strtoupper(trim((string) ($_POST['code'] ?? ''))); $ng = max(1, min(5000, (int) ($_POST['plumes'] ?? 0)));
    $msgPlumes = preg_match(AMI_FORMAT_CODE, $cg) && ami_credits_ajouter($db, $cg, $ng, 'geste:' . bin2hex(random_bytes(8)), 'geste ' . mb_substr((string) ($_POST['raison'] ?? ''), 0, 40)) ? '✅ ' . $ng . ' plumes ajoutées à ' . $cg . '.' : '⚠️ Code invalide.'; }
  if ($a === 'cadeaux') { $nouveauxCadeaux = ami_cadeaux_actifs() ? creer_cadeaux($db, $_POST) : []; }
  $s = $db->prepare("SELECT * FROM ami_veille WHERE id = ? AND statut = 'a_valider'"); $s->execute([$id]); $v = $s->fetch();
  if ($v && $a === 'rejeter') $db->prepare("UPDATE ami_veille SET statut = 'rejete', decide = ? WHERE id = ?")->execute([ami_maintenant(), $id]);
  if ($v && $a === 'publier') { publier($db, json_decode($v['proposition'], true)); $db->prepare("UPDATE ami_veille SET statut = 'publie', decide = ? WHERE id = ?")->execute([ami_maintenant(), $id]); }
  if (!in_array($a, ['cadeaux', 'geste', 'offrir', 'retirer'], true)) { header('Location: ./'); exit; }
}
// ── L'offre : seules les valeurs du catalogue (catalogue.json, fabriqué depuis le jeu) sont acceptées. ──
function catalogue(): array { $c = json_decode((string) @file_get_contents(__DIR__ . '/catalogue.json'), true); return is_array($c) ? $c : ['themes' => [], 'jeux' => [], 'coins' => []]; }
function offre_actuelle(PDO $db): array { $t = ami_val($db, "SELECT contenu FROM ami_publications WHERE cle = 'offre'"); $o = $t ? json_decode($t, true) : null; return is_array($o) ? $o : []; }
function enregistrer_offre(PDO $db, array $p): void {
  $cat = catalogue(); $ids = fn($l) => array_map(fn($x) => $x[0], $l);
  $coins = []; foreach ($cat['coins'] as $g) foreach ($g[1] as $c) $coins[] = $c[0];
  $garder = fn($cle, array $connus) => array_values(array_intersect($connus, array_map('strval', (array) ($p[$cle] ?? []))));
  $lien = function ($v) { $v = trim((string) $v); return preg_match('~^https://(buy|billing)\.stripe\.com/[A-Za-z0-9_/?=&.-]{1,200}$~', $v) ? $v : ''; };
  $o = [
    'MODE_PAYANT' => !empty($p['MODE_PAYANT']),
    'PRIX' => mb_substr(trim((string) ($p['PRIX'] ?? '5,99 €')), 0, 20),
    'LIEN_PAIEMENT' => $lien($p['LIEN_PAIEMENT'] ?? ''),
    'LIEN_GESTION' => $lien($p['LIEN_GESTION'] ?? ''),
    'JOUEURS_GRATUITS' => max(1, min(6, (int) ($p['JOUEURS_GRATUITS'] ?? 6))),
    'THEMES_GRATUITS' => $garder('THEMES_GRATUITS', $ids($cat['themes'])),
    'JEUX_GRATUITS' => $garder('JEUX_GRATUITS', $ids($cat['jeux'])),
    'COINS_PLUS' => $garder('COINS_PLUS', $coins),
    // v5.94 : formules (site : lien Stripe ; appli des stores : achat Google / Apple). Prix et essai sont affichés tels quels.
    'FORMULES' => array_values(array_filter(array_map(function ($id) use ($p, $lien) {
      if (empty($p['F_' . $id . '_on'])) return null;
      return ['id' => $id, 'prix' => mb_substr(trim((string) ($p['F_' . $id . '_prix'] ?? '')), 0, 20), 'lien' => $lien($p['F_' . $id . '_lien'] ?? ''),
        'essai' => mb_substr(trim((string) ($p['F_' . $id . '_essai'] ?? '')), 0, 40), 'magasin' => !empty($p['F_' . $id . '_magasin'])];
    }, AMI_FORMULES))),
    // v5.99 : plumes magiques (crédits d'IA). Seuls des nombres, des prix affichés et des liens/prix Stripe vérifiés.
    'CREDITS' => [
      'actif' => !empty($p['C_actif']),
      'quota_plus' => max(0, min(100000, (int) ($p['C_quota_plus'] ?? 0))),
      'packs' => array_values(array_filter(array_map(function ($id) use ($p, $lien) {
        $n = max(0, min(1000000, (int) ($p['P_' . $id . '_plumes'] ?? 0)));
        if (empty($p['P_' . $id . '_on']) || $n <= 0) return null;
        $prixStripe = trim((string) ($p['P_' . $id . '_stripe_prix'] ?? ''));
        return ['id' => $id, 'plumes' => $n, 'prix' => mb_substr(trim((string) ($p['P_' . $id . '_prix'] ?? '')), 0, 20), 'lien' => $lien($p['P_' . $id . '_lien'] ?? ''),
          'stripe_prix' => preg_match('/^price_[A-Za-z0-9]{6,60}$/', $prixStripe) ? $prixStripe : '', 'magasin' => !empty($p['P_' . $id . '_magasin'])];
      }, AMI_PACKS))),
    ],
  ];
  $mysql = $db->getAttribute(PDO::ATTR_DRIVER_NAME) === 'mysql';
  $db->prepare('INSERT INTO ami_publications (cle, contenu, maj) VALUES (?, ?, ?) ' . ($mysql ? 'ON DUPLICATE KEY UPDATE contenu = VALUES(contenu), maj = VALUES(maj)' : 'ON CONFLICT(cle) DO UPDATE SET contenu = excluded.contenu, maj = excluded.maj'))
    ->execute(['offre', json_encode($o, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES), ami_maintenant()]);
}
const AMI_FORMULES = ['mensuel', 'annuel', 'famille', 'a_vie'];
const AMI_NOMS_PACKS = ['plumes_petit' => 'Petit pack', 'plumes_moyen' => 'Pack moyen', 'plumes_grand' => 'Grand pack'];
function formulaire_plumes(array $o, callable $e): string {
  $c = (array) ($o['CREDITS'] ?? []); $pk = []; foreach ((array) ($c['packs'] ?? []) as $x) if (is_array($x) && isset($x['id'])) $pk[$x['id']] = $x;
  $h = '<h3>🪶 Plumes magiques (crédits d’IA)</h3><p class="petit">Allumées : chaque vanne écrite par l’IA coûte 1 plume (le tri d’une vanne du Clash libre aussi). '
    . 'Les abonnés Plus ont un quota par mois inclus ; au-delà, ou sans Plus, on achète des packs. Sans plumes, le jeu garde les vannes de Plumo : rien n’est bloqué. '
    . 'Éteintes : l’IA reste gratuite pour tous, avec ses plafonds par jour.<br><strong>Stripe</strong> : créez un produit et un Payment Link par pack, et recopiez ici l’identifiant du prix (<code>price_…</code>, fiche du produit) : c’est lui qui dit au serveur quel pack a été payé. '
    . '<strong>Stores</strong> : produits « consommables » <code>plumes_petit</code>, <code>plumes_moyen</code>, <code>plumes_grand</code>.</p>'
    . '<p><label style="font-size:1.1em"><input type="checkbox" name="C_actif" value="1"' . (!empty($c['actif']) ? ' checked' : '') . '> <strong>Allumer les plumes</strong></label> '
    . '<label>Quota inclus dans Plus (plumes par mois) <input type="number" name="C_quota_plus" min="0" max="100000" value="' . (int) ($c['quota_plus'] ?? 300) . '"></label></p>'
    . '<table><tr><th>Pack</th><th>Plumes</th><th>Prix affiché</th><th>Lien Stripe</th><th>Prix Stripe (price_…)</th><th>Stores</th></tr>';
  $defaut = ['plumes_petit' => 200, 'plumes_moyen' => 600, 'plumes_grand' => 1500];
  foreach (AMI_PACKS as $id) { $x = $pk[$id] ?? []; $n = fn($k) => 'P_' . $id . '_' . $k;
    $h .= '<tr><td><label><input type="checkbox" name="' . $n('on') . '" value="1"' . ($x ? ' checked' : '') . '> ' . $e(AMI_NOMS_PACKS[$id]) . '</label></td>'
      . '<td><input type="number" name="' . $n('plumes') . '" min="1" style="width:6em" value="' . (int) ($x['plumes'] ?? $defaut[$id]) . '"></td>'
      . '<td><input name="' . $n('prix') . '" size="8" maxlength="20" value="' . $e($x['prix'] ?? '') . '"></td>'
      . '<td><input name="' . $n('lien') . '" size="28" placeholder="https://buy.stripe.com/…" value="' . $e($x['lien'] ?? '') . '"></td>'
      . '<td><input name="' . $n('stripe_prix') . '" size="22" placeholder="price_…" value="' . $e($x['stripe_prix'] ?? '') . '"></td>'
      . '<td><input type="checkbox" name="' . $n('magasin') . '" value="1"' . (!empty($x['magasin']) ? ' checked' : '') . '></td></tr>'; }
  return $h . '</table>';
}
// v6.0 : accès offerts (gratuits) + parrainage + entonnoir de Plus (30 jours, anonyme).
function section_offerts(PDO $db, string $jeton, callable $e, string $msg): string {
  try { $l = $db->query("SELECT code, client, statut, fin, maj FROM ami_abonnements WHERE client LIKE 'offert:%' ORDER BY maj DESC LIMIT 50")->fetchAll(); } catch (Throwable $x) { $l = []; }
  $h = '<section><h2>🎁 Offrir l’accès Plus</h2>' . ($msg ? '<p>' . $e($msg) . '</p>' : '') . '<p class="petit">La personne vous donne son code (Réglages du jeu → « Code d’abonnement », format AMI-XXXX-XXXX-XXXX). Rien à payer pour elle.</p>'
    . '<form method="post"><input type="hidden" name="jeton" value="' . $jeton . '"><input type="hidden" name="action" value="offrir">'
    . '<label>Code <input name="code" size="20" placeholder="AMI-XXXX-XXXX-XXXX" required></label> <label>Durée <select name="duree"><option value="1">1 mois</option><option value="3">3 mois</option><option value="6">6 mois</option><option value="12">1 an</option><option value="vie">À vie</option></select></label> '
    . '<label>Pour qui (note) <input name="note" maxlength="40" placeholder="ex. famille de Léa, testeur"></label> <button>🎁 Offrir</button></form>';
  if ($l) { $h .= '<table><tr><th>Code</th><th>Note</th><th>Jusqu’au</th><th>État</th><th></th></tr>';
    foreach ($l as $r) $h .= '<tr><td><code>' . $e($r['code']) . '</code></td><td>' . $e(substr((string) $r['client'], 7)) . '</td><td>' . ($r['statut'] === 'a_vie' ? 'à vie' : $e(substr((string) $r['fin'], 0, 10))) . '</td><td>' . $e($r['statut']) . '</td><td>'
      . ($r['statut'] !== 'retire' ? '<form method="post" style="display:inline"><input type="hidden" name="jeton" value="' . $jeton . '"><input type="hidden" name="code" value="' . $e($r['code']) . '"><button class="non" name="action" value="retirer">Retirer</button></form>' : '') . '</td></tr>';
    $h .= '</table>'; }
  return $h . '</section>';
}
function section_entonnoir(PDO $db, callable $e): string {
  try { $depuis = gmdate('Y-m-d', time() - 29 * 86400);
    $v = []; foreach ($db->query("SELECT evenement, SUM(n) n FROM ami_visites WHERE jour >= '$depuis' GROUP BY evenement")->fetchAll() as $r) $v[$r['evenement']] = (int) $r['n'];
    $ab = (int) ami_val($db, "SELECT COUNT(*) FROM ami_abonnements WHERE maj >= ? AND client NOT LIKE 'offert:%' AND client NOT LIKE 'cadeau%' AND statut IN ('active', 'trialing', 'a_vie', 'magasin')", [$depuis . ' 00:00:00']);
    $par = (int) ami_val($db, "SELECT COUNT(*) FROM ami_parrainages WHERE statut = 'recompense'"); $att = (int) ami_val($db, "SELECT COUNT(*) FROM ami_parrainages WHERE statut = 'attente'");
  } catch (Throwable $x) { return '<section><h2>🧲 Entonnoir</h2><p>Relancez <code>schema.sql</code>.</p></section>'; }
  $pct = fn($a, $b) => $b ? ' (' . round(100 * $a / $b) . ' %)' : '';
  $o = $v['ouverture'] ?? 0; $pv = $v['plus_vu'] ?? 0; $pc = $v['plus_clic'] ?? 0;
  return '<section><h2>🧲 Entonnoir de Plus (30 jours)</h2><p class="petit">Compteurs anonymes (un appareil compte une fois par jour au plus pour chaque étape).</p><table>'
    . '<tr><td>👀 Ouvertures du jeu</td><td><strong>' . $o . '</strong></td></tr><tr><td>✨ Écran Plus vu</td><td><strong>' . $pv . '</strong>' . $pct($pv, $o) . '</td></tr>'
    . '<tr><td>👆 Clic sur une formule</td><td><strong>' . $pc . '</strong>' . $pct($pc, $pv) . '</td></tr><tr><td>💳 Abonnements payés ou essais démarrés</td><td><strong>' . $ab . '</strong>' . $pct($ab, $pc) . '</td></tr>'
    . '<tr><td>🤝 Parrainages récompensés / en attente</td><td><strong>' . $par . '</strong> / ' . $att . '</td></tr></table>'
    . '<p class="petit">Essai gratuit : réglez-le dans Stripe (Payment Link → essai) et dans les stores ; écrivez le texte affiché dans la colonne « Essai » des formules.</p></section>';
}
// Suivi des plumes + geste commercial (ajouter des plumes à un code, par ex. après une réclamation).
function section_plumes(PDO $db, string $jeton, callable $e, string $msg): string {
  try {
    $mois = gmdate('Y-m') . '%';
    $vendues = (int) ami_val($db, "SELECT COALESCE(SUM(plumes), 0) FROM ami_credits_mouvements WHERE cree LIKE ? AND motif LIKE 'achat%'", [$mois]);
    $achats = (int) ami_val($db, "SELECT COUNT(*) FROM ami_credits_mouvements WHERE cree LIKE ? AND motif LIKE 'achat%'", [$mois]);
    $quota = (int) ami_val($db, 'SELECT COALESCE(SUM(quota_utilise), 0) FROM ami_credits WHERE mois = ?', [gmdate('Y-m')]);
    $reste = (int) ami_val($db, 'SELECT COALESCE(SUM(solde), 0) FROM ami_credits');
  } catch (Throwable $x) { return '<section><h2>🪶 Plumes</h2><p>Tables absentes : relancez <code>schema.sql</code>.</p></section>'; }
  return '<section><h2>🪶 Plumes ce mois-ci</h2>' . ($msg ? '<p>' . $e($msg) . '</p>' : '')
    . '<p><strong>' . $achats . '</strong> achats · <strong>' . $vendues . '</strong> plumes vendues · <strong>' . $quota . '</strong> plumes du quota Plus utilisées · <strong>' . $reste . '</strong> plumes en attente dans les soldes</p>'
    . '<p class="petit">Coût réel de l’IA : voir la console Anthropic (fixez-y une limite de dépense par mois).</p>'
    . '<form method="post"><input type="hidden" name="jeton" value="' . $jeton . '"><input type="hidden" name="action" value="geste">'
    . '🎁 Offrir des plumes : <label>Code du joueur <input name="code" size="18" placeholder="AMI-XXXX-XXXX-XXXX" required></label> <label>Plumes <input type="number" name="plumes" min="1" max="5000" value="50" style="width:6em"></label> '
    . '<label>Raison <input name="raison" maxlength="40" placeholder="geste commercial"></label> <button>Ajouter</button></form></section>';
}
const AMI_NOMS_FORMULES = ['mensuel' => 'Mensuel', 'annuel' => 'Annuel', 'famille' => 'Famille', 'a_vie' => 'À vie (paiement unique)'];
function formulaire_formules(array $o, callable $e): string {
  $f = []; foreach ((array) ($o['FORMULES'] ?? []) as $x) if (is_array($x) && isset($x['id'])) $f[$x['id']] = $x;
  $h = '<h3>💳 Formules</h3><p class="petit">Cochez les formules proposées. <strong>Lien Stripe</strong> : pour le site (créez un « Payment Link » par formule ; '
    . 'pour « À vie », un paiement unique ; activez les codes promo dans Stripe si vous en voulez). <strong>Stores</strong> : propose aussi la formule dans l’appli Google Play / App Store '
    . '(produits <code>plus_mensuel</code>, <code>plus_annuel</code>, <code>plus_famille</code>, <code>plus_a_vie</code> à créer dans les consoles). L’essai gratuit se règle dans Stripe et les stores ; écrivez ici le texte affiché (ex. « 7 jours gratuits »).</p>'
    . '<table><tr><th>Formule</th><th>Prix affiché</th><th>Lien Stripe</th><th>Essai</th><th>Stores</th></tr>';
  foreach (AMI_FORMULES as $id) { $x = $f[$id] ?? []; $n = fn($k) => 'F_' . $id . '_' . $k;
    $h .= '<tr><td><label><input type="checkbox" name="' . $n('on') . '" value="1"' . ($x ? ' checked' : '') . '> ' . $e(AMI_NOMS_FORMULES[$id]) . '</label></td>'
      . '<td><input name="' . $n('prix') . '" size="10" maxlength="20" value="' . $e($x['prix'] ?? '') . '"></td>'
      . '<td><input name="' . $n('lien') . '" size="34" placeholder="https://buy.stripe.com/…" value="' . $e($x['lien'] ?? '') . '"></td>'
      . '<td><input name="' . $n('essai') . '" size="16" maxlength="40" value="' . $e($x['essai'] ?? '') . '"></td>'
      . '<td><input type="checkbox" name="' . $n('magasin') . '" value="1"' . (!empty($x['magasin']) ? ' checked' : '') . '></td></tr>'; }
  return $h . '</table>';
}
// ── v5.95 : fréquentation anonyme des 30 derniers jours (aucune donnée personnelle). ──
function section_frequentation(PDO $db, callable $e): string {
  try { $l = $db->query("SELECT jour, evenement, plateforme, n FROM ami_visites WHERE jour >= '" . gmdate('Y-m-d', time() - 29 * 86400) . "' ORDER BY jour DESC")->fetchAll(); }
  catch (Throwable $x) { return '<section><h2>📈 Fréquentation</h2><p>Table <code>ami_visites</code> absente : relancez <code>schema.sql</code>.</p></section>'; }
  $j = []; $tot = ['ouverture' => 0, 'partie' => 0]; $pf = ['web' => 0, 'android' => 0, 'ios' => 0];
  foreach ($l as $r) { $j[$r['jour']][$r['evenement']] = ($j[$r['jour']][$r['evenement']] ?? 0) + (int) $r['n']; $tot[$r['evenement']] = ($tot[$r['evenement']] ?? 0) + (int) $r['n']; if ($r['evenement'] === 'ouverture') $pf[$r['plateforme']] = ($pf[$r['plateforme']] ?? 0) + (int) $r['n']; }
  $h = '<section><h2>📈 Fréquentation (30 jours)</h2><p class="petit">Compteurs anonymes : un appareil compte une « ouverture » par jour au plus. Aucun cookie, aucun identifiant, aucune adresse IP gardée.</p>'
    . '<p><strong>' . $tot['ouverture'] . '</strong> ouvertures · <strong>' . $tot['partie'] . '</strong> parties · web ' . $pf['web'] . ' · Android ' . $pf['android'] . ' · iOS ' . $pf['ios'] . '</p>';
  if (!$j) return $h . '<p>Pas encore de visite.</p></section>';
  $max = max(1, max(array_map(fn($x) => $x['ouverture'] ?? 0, $j)));
  $h .= '<table><tr><th>Jour</th><th>Ouvertures</th><th>Parties</th><th></th></tr>';
  foreach ($j as $d => $x) { $o = $x['ouverture'] ?? 0; $h .= '<tr><td>' . $e($d) . '</td><td>' . $o . '</td><td>' . ($x['partie'] ?? 0) . '</td><td><span style="display:inline-block;height:10px;background:#5b8def;width:' . round(160 * $o / $max) . 'px" aria-hidden="true"></span></td></tr>'; }
  return $h . '</table></section>';
}

// ── Codes cadeaux : seule l'empreinte est gardée ; les codes en clair ne s'affichent qu'une fois. ──
function creer_cadeaux(PDO $db, array $p): array {
  $n = max(1, min(200, (int) ($p['nombre'] ?? 1))); $mois = max(1, min(24, (int) ($p['mois'] ?? 1))); $lot = mb_substr(trim((string) ($p['lot'] ?? '')), 0, 60);
  $codes = []; $ins = $db->prepare('INSERT INTO ami_cadeaux (empreinte, mois, lot, cree) VALUES (?, ?, ?, ?)');
  while (count($codes) < $n) { $c = ami_nouveau_cadeau(); try { $ins->execute([ami_empreinte_cadeau($c), $mois, $lot, ami_maintenant()]); $codes[] = $c; } catch (Throwable $e) {} }
  return $codes;
}
function section_cadeaux(PDO $db, string $jeton, callable $e, array $nouveaux): string {
  $lots = $db->query('SELECT lot, mois, COUNT(*) n, SUM(CASE WHEN utilise IS NULL THEN 0 ELSE 1 END) u FROM ami_cadeaux GROUP BY lot, mois ORDER BY MAX(cree) DESC LIMIT 30')->fetchAll();
  if (!ami_cadeaux_actifs()) return '<section><h2>🎁 Codes cadeaux</h2><p>⚠️ Réglez d’abord <code>cadeau_sel</code> (une longue phrase secrète, au moins 16 caractères) dans config-ami.php.</p></section>';
  $h = '<section><h2>🎁 Codes cadeaux</h2><p class="petit">Un code cadeau ouvre Plus pour quelques mois (à offrir, pour une école, un concours…). Le joueur le saisit dans le jeu : « ✨ Plus » → « J’ai un code cadeau ».</p>';
  if ($nouveaux) $h .= '<p><strong>⚠️ Copiez ces codes maintenant : ils ne seront plus affichés.</strong></p><textarea rows="' . min(12, count($nouveaux) + 1) . '" cols="30" readonly>' . $e(implode("\n", $nouveaux)) . '</textarea>';
  $h .= '<form method="post"><input type="hidden" name="jeton" value="' . $jeton . '"><input type="hidden" name="action" value="cadeaux">'
    . '<label>Nombre <input type="number" name="nombre" min="1" max="200" value="10"></label> <label>Durée (mois) <input type="number" name="mois" min="1" max="24" value="1"></label> '
    . '<label>Nom du lot <input name="lot" maxlength="60" placeholder="ex. Classe de 4e B"></label> <button>🎁 Créer</button></form>';
  if ($lots) { $h .= '<table><tr><th>Lot</th><th>Mois</th><th>Créés</th><th>Utilisés</th></tr>'; foreach ($lots as $l) $h .= '<tr><td>' . $e($l['lot'] ?: '—') . '</td><td>' . (int) $l['mois'] . '</td><td>' . (int) $l['n'] . '</td><td>' . (int) $l['u'] . '</td></tr>'; $h .= '</table>'; }
  return $h . '</section>';
}
function formulaire_offre(PDO $db, string $jeton, callable $e): string {
  $o = offre_actuelle($db) + ['MODE_PAYANT' => false, 'PRIX' => '5,99 €', 'LIEN_PAIEMENT' => '', 'LIEN_GESTION' => '', 'JOUEURS_GRATUITS' => 6, 'THEMES_GRATUITS' => null, 'JEUX_GRATUITS' => null, 'COINS_PLUS' => []];
  $cat = catalogue();
  $case = fn($nom, $val, $coche, $txt) => '<label style="display:inline-block;min-width:260px;margin:3px 0"><input type="checkbox" name="' . $nom . '[]" value="' . $e($val) . '"' . ($coche ? ' checked' : '') . '> ' . $e($txt) . '</label>';
  $th = $o['THEMES_GRATUITS'] ?? null; $je = $o['JEUX_GRATUITS'] ?? null;
  $h = '<section><h2>💰 Offre et paiement</h2><form method="post"><input type="hidden" name="jeton" value="' . $jeton . '"><input type="hidden" name="action" value="offre">'
    . '<p><label style="font-size:1.2em"><input type="checkbox" name="MODE_PAYANT" value="1"' . ($o['MODE_PAYANT'] ? ' checked' : '') . '> <strong>Activer le payant (Ami des mots Plus)</strong></label><br><span class="petit">Décoché : tout est gratuit pour tout le monde.</span></p>'
    . '<p><label>Prix affiché <input name="PRIX" maxlength="20" value="' . $e($o['PRIX']) . '"></label> <label>Joueurs gratuits <input type="number" min="1" max="6" name="JOUEURS_GRATUITS" value="' . (int) $o['JOUEURS_GRATUITS'] . '"></label></p>'
    . '<p><label>Lien de paiement Stripe <input name="LIEN_PAIEMENT" size="60" placeholder="https://buy.stripe.com/…" value="' . $e($o['LIEN_PAIEMENT']) . '"></label><br><label>Portail client Stripe <input name="LIEN_GESTION" size="60" placeholder="https://billing.stripe.com/…" value="' . $e($o['LIEN_GESTION']) . '"></label></p>'
    . formulaire_formules($o, $e)
    . formulaire_plumes($o, $e)
    . '<h3>✨ Coins réservés à Plus (cochés = payants)</h3>';
  foreach ($cat['coins'] as $g) { $h .= '<p><strong>' . $e($g[0]) . '</strong><br>'; foreach ($g[1] as $c) $h .= $case('COINS_PLUS', $c[0], in_array($c[0], $o['COINS_PLUS'], true), $c[1] . ' ' . $c[2]); $h .= '</p>'; }
  $h .= '<h3>🆓 Thèmes de mots gratuits (cochés = gratuits)</h3><p>'; foreach ($cat['themes'] as $t) $h .= $case('THEMES_GRATUITS', $t[0], $th === null || in_array($t[0], $th, true), $t[1]); $h .= '</p>';
  $h .= '<h3>🆓 Jeux de mots gratuits (cochés = gratuits)</h3><p>'; foreach ($cat['jeux'] as $j) $h .= $case('JEUX_GRATUITS', $j[0], $je === null || in_array($j[0], $je, true), $j[1] . ' ' . $j[2]); $h .= '</p>';
  return $h . '<p><button>💾 Enregistrer et publier</button> <span class="petit">Le jeu applique ces réglages à la prochaine ouverture (réglages signés par le serveur).</span></p></form></section>';
}
// publier() : voir veille-publier.php (partagé avec la publication automatique de la veille).
$j = $e($_SESSION['jeton']);
$l = $db->query("SELECT * FROM ami_veille WHERE statut = 'a_valider' ORDER BY id")->fetchAll();
$out = (($_GET['ok'] ?? '') === 'offre' ? '<section>✅ Offre enregistrée et publiée.</section>' : '') . section_frequentation($db, $e) . section_entonnoir($db, $e) . section_offerts($db, $j, $e, $msgOffert ?? '') . section_plumes($db, $j, $e, $msgPlumes ?? '') . formulaire_offre($db, $j, $e) . section_cadeaux($db, $j, $e, $nouveauxCadeaux ?? []) . '<h1>🛠️ Veille des programmes et annales</h1><p class="petit">L’IA a lu les documents officiels. Vérifie, puis publie : le jeu l’affiche à la prochaine ouverture du coin maths.</p>';
if (!$l) $out .= '<section><p>Rien à valider. Lance la veille : <code>php veille.php</code> (ou la tâche planifiée).</p></section>';
foreach ($l as $v) {
  $p = json_decode($v['proposition'], true); $so = $p['sorte'] ?? '';
  $titres = ['programme' => 'programme', 'annales' => 'sujets officiels', 'epreuve' => 'épreuves d’examen', 'diplome' => 'diplôme', 'questions' => 'nouvelles questions'];
  $ou = ($p['systeme'] ?? 'fr') . ' · ' . ($p['matiere'] ?? 'maths');
  $out .= '<section><h2>' . $e($v['classe']) . ' — ' . $e($titres[$so] ?? $so) . ' <small>(' . $e($ou) . ')</small></h2><p class="petit">Source : <a href="' . $e($v['source']) . '" rel="noopener noreferrer" target="_blank">' . $e($v['source']) . '</a></p>';
  if ($so === 'programme' && isset($p['chapitres'][0]['exercice'])) { $out .= '<p>' . $e($p['note']) . '</p><table><tr><th>Domaine</th><th>Chapitre</th><th>Exercices du jeu</th></tr>';
    foreach ($p['chapitres'] as $c) $out .= '<tr><td>' . $e($c['domaine']) . '</td><td>' . $e($c['intitule']) . '</td><td>' . ($c['exercice'] ? $e($c['exercice']) : '🛠️ bientôt') . '</td></tr>';
    $out .= '</table>'; }
  elseif ($so === 'programme') { $out .= '<p>' . $e($p['note']) . '</p>' . ($p['changements'] ? '<p><strong>Ce qui change :</strong></p><ul>' . implode('', array_map(fn($x) => '<li>' . $e($x) . '</li>', $p['changements'])) . '</ul>' : '')
      . '<table><tr><th>Matière</th><th>Domaine</th><th>Chapitre</th><th>Notions</th><th>Chapitre du jeu</th></tr>';
    foreach ($p['chapitres'] as $c) $out .= '<tr><td>' . $e($c['matiere']) . '</td><td>' . $e($c['domaine']) . '</td><td>' . $e($c['intitule']) . '</td><td>' . $e(implode(', ', $c['notions'])) . '</td><td>' . ($c['chap'] ? $e($c['chap']) : '🆕 nouveau') . '</td></tr>';
    $out .= '</table>'; }
  elseif ($so === 'epreuve' || $so === 'diplome') { $out .= '<p><strong>' . $e($p['examen']) . '</strong> ' . $e($p['session']) . ' — ' . $e($p['resume']) . '</p><p>' . $e($p['conditions']) . '</p><ul>';
    foreach ($p['epreuves'] as $x) $out .= '<li>' . $e($x['nom']) . ' · ' . $e($x['duree']) . ' · ' . $e($x['notation']) . ' — ' . $e($x['format']) . '</li>';
    $out .= '</ul>' . ($p['changements'] ? '<p><strong>Ce qui change :</strong> ' . $e(implode(' ; ', $p['changements'])) . '</p>' : ''); }
  elseif ($so === 'questions') { $out .= '<p><strong>' . $e($p['nom']) . '</strong> — ' . count($p['questions']) . ' questions. Vérifie chaque bonne réponse avant de publier.</p><ol>';
    foreach ($p['questions'] as $q) $out .= '<li>' . $e($q[0]) . '<br>✅ ' . $e($q[1]) . ' · ❌ ' . $e(implode(' / ', array_map(fn($f) => $f[0], $q[2]))) . '<br><small>💡 ' . $e($q[3]) . ' · vannes : ' . $e(implode(' | ', array_map(fn($f) => $f[1], $q[2]))) . '</small></li>';
    $out .= '</ol>'; }
  else { $out .= '<ul>'; foreach ($p['sujets'] as $s) $out .= '<li>' . $e($s['session']) . ' — <a href="' . $e($s['lien']) . '" rel="noopener noreferrer" target="_blank">' . $e($s['titre']) . '</a> · ' . $e(implode(', ', $s['themes'])) . '</li>'; $out .= '</ul>'; }
  $out .= '<form method="post" style="display:inline"><input type="hidden" name="jeton" value="' . $j . '"><input type="hidden" name="id" value="' . (int) $v['id'] . '"><button name="action" value="publier">✅ Publier</button> <button class="non" name="action" value="rejeter">❌ Rejeter</button></form></section>';
}
page($out . '<form method="post"><input type="hidden" name="jeton" value="' . $j . '"><button name="action" value="sortir">Se déconnecter</button></form>');
