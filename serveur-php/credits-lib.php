<?php
// Ami des mots — v5.99 : « plumes magiques » = crédits d'IA.
// - Les réglages (allumé ou non, quota inclus dans Plus, packs et prix) se font dans le coin admin (offre signée).
// - Le solde est gardé ICI, sur le serveur, jamais sur l'appareil. Chaque appel à l'IA coûte des plumes,
//   d'abord sur le quota du mois inclus dans Plus, puis sur le solde acheté. Si l'IA échoue, les plumes sont rendues.
// - Un achat (Stripe, Google Play, App Store) n'est crédité qu'une fois : chaque mouvement porte une référence unique.
// - Tant que les plumes sont éteintes dans l'admin, rien ne change : l'IA reste gratuite avec ses plafonds par jour.
declare(strict_types=1);

const AMI_PACKS = ['plumes_petit', 'plumes_moyen', 'plumes_grand'];

function ami_credits_reglages(?PDO $db = null): array {
  static $memo = null; if ($memo !== null && $db === null) return $memo;
  $db = $db ?? ami_db();
  $t = ami_val($db, "SELECT contenu FROM ami_publications WHERE cle = 'offre'"); $o = $t ? json_decode((string) $t, true) : null;
  $c = is_array($o) && is_array($o['CREDITS'] ?? null) ? $o['CREDITS'] : [];
  $packs = [];
  foreach ((array) ($c['packs'] ?? []) as $p) if (is_array($p) && in_array($p['id'] ?? '', AMI_PACKS, true) && (int) ($p['plumes'] ?? 0) > 0) $packs[$p['id']] = $p;
  return $memo = ['actif' => !empty($c['actif']), 'quota_plus' => max(0, (int) ($c['quota_plus'] ?? 0)), 'packs' => $packs];
}

function ami_credits_mysql(PDO $db): bool { return $db->getAttribute(PDO::ATTR_DRIVER_NAME) === 'mysql'; }

// Ligne du code (créée au besoin) ; le quota repart à zéro chaque mois.
function ami_credits_ligne(PDO $db, string $code): void {
  $mois = gmdate('Y-m');
  $db->prepare('INSERT ' . (ami_credits_mysql($db) ? 'IGNORE ' : 'OR IGNORE ') . 'INTO ami_credits (code, solde, mois, quota_utilise, maj) VALUES (?, 0, ?, 0, ?)')->execute([$code, $mois, ami_maintenant()]);
  $db->prepare('UPDATE ami_credits SET mois = ?, quota_utilise = 0 WHERE code = ? AND mois <> ?')->execute([$mois, $code, $mois]);
}

function ami_credits_etat(PDO $db, string $code, ?bool $plus = null): array {
  ami_credits_ligne($db, $code); $r = ami_credits_reglages($db);
  $s = $db->prepare('SELECT solde, quota_utilise FROM ami_credits WHERE code = ?'); $s->execute([$code]); $l = $s->fetch();
  $plus = $plus ?? ami_abonnement_actif($code)[0];
  $quota = $plus ? $r['quota_plus'] : 0;
  return ['solde' => (int) $l['solde'], 'quota' => $quota, 'quota_restant' => max(0, $quota - (int) $l['quota_utilise'])];
}

// Retire $n plumes : quota du mois d'abord (si Plus), sinon le solde. Renvoie 'quota', 'solde' ou null (pas assez).
// Chaque retrait est un seul UPDATE conditionnel : deux appels en même temps ne peuvent pas passer sous zéro.
function ami_credits_debiter(PDO $db, string $code, int $n): ?string {
  if ($n <= 0) return 'quota';
  ami_credits_ligne($db, $code); $r = ami_credits_reglages($db);
  if ($r['quota_plus'] > 0 && ami_abonnement_actif($code)[0]) {
    // Nombres écrits en clair (ce sont des entiers du serveur) : comparaison numérique sûre avec MySQL comme avec SQLite.
    $q = (int) $r['quota_plus'];
    $u = $db->prepare("UPDATE ami_credits SET quota_utilise = quota_utilise + $n, maj = ? WHERE code = ? AND quota_utilise + $n <= $q");
    $u->execute([ami_maintenant(), $code]); if ($u->rowCount() === 1) return 'quota';
  }
  $u = $db->prepare("UPDATE ami_credits SET solde = solde - $n, maj = ? WHERE code = ? AND solde >= $n");
  $u->execute([ami_maintenant(), $code]);
  return $u->rowCount() === 1 ? 'solde' : null;
}
function ami_credits_rendre(PDO $db, string $code, int $n, string $source): void {
  if ($n <= 0) return;
  if ($source === 'quota') $db->prepare("UPDATE ami_credits SET quota_utilise = CASE WHEN quota_utilise >= $n THEN quota_utilise - $n ELSE 0 END WHERE code = ?")->execute([$code]);
  else $db->prepare("UPDATE ami_credits SET solde = solde + $n WHERE code = ?")->execute([$code]);
}

// Ajoute des plumes une seule fois par référence (achat, geste commercial). false si cette référence a déjà servi.
function ami_credits_ajouter(PDO $db, string $code, int $n, string $reference, string $motif): bool {
  if ($n <= 0 || $reference === '') return false;
  $db->beginTransaction();
  try {
    try { $db->prepare('INSERT INTO ami_credits_mouvements (reference, code, plumes, motif, cree) VALUES (?, ?, ?, ?, ?)')->execute([mb_substr($reference, 0, 190), $code, $n, mb_substr($motif, 0, 60), ami_maintenant()]); }
    catch (PDOException $e) { $db->rollBack(); return false; }   // référence déjà créditée
    ami_credits_ligne($db, $code);
    $db->prepare("UPDATE ami_credits SET solde = solde + $n, maj = ? WHERE code = ?")->execute([ami_maintenant(), $code]);
    $db->commit(); return true;
  } catch (Throwable $e) { if ($db->inTransaction()) $db->rollBack(); throw $e; }
}
// Remboursement d'un achat de plumes : on retire ce qui reste de ce pack (jamais sous zéro).
function ami_credits_annuler(PDO $db, string $reference): void {
  $s = $db->prepare("SELECT code, plumes, motif FROM ami_credits_mouvements WHERE reference = ? AND motif NOT LIKE 'annule%'"); $s->execute([$reference]); $m = $s->fetch();
  if (!$m) return;
  $k = (int) $m['plumes'];
  $db->prepare("UPDATE ami_credits SET solde = CASE WHEN solde >= $k THEN solde - $k ELSE 0 END, maj = ? WHERE code = ?")->execute([ami_maintenant(), $m['code']]);
  $db->prepare('UPDATE ami_credits_mouvements SET motif = ? WHERE reference = ?')->execute([mb_substr('annule:' . $m['motif'], 0, 60), $reference]);
}

// Garde des points d'accès IA. Plumes éteintes → null (rien ne change). Allumées → code obligatoire et retrait,
// sinon réponse 402 { erreur:"plumes" } (le jeu garde alors les vannes de Plumo, sans rien bloquer).
function ami_credits_garde($code, int $n): ?array {
  $r = ami_credits_reglages();
  if (!$r['actif']) return null;
  $code = (string) $code;
  if (!preg_match(AMI_FORMAT_CODE, $code)) ami_json(['erreur' => 'plumes', 'solde' => 0], 402);
  $db = ami_db(); $src = ami_credits_debiter($db, $code, $n);
  if ($src === null) ami_json(['erreur' => 'plumes', 'solde' => ami_credits_etat($db, $code)['solde']], 402);
  return ['code' => $code, 'n' => $n, 'source' => $src];
}
function ami_credits_rembourser_garde(?array $g, int $n = -1): void {
  if (!$g) return; $k = $n < 0 ? $g['n'] : min($n, $g['n']);
  try { ami_credits_rendre(ami_db(), $g['code'], $k, $g['source']); } catch (Throwable $e) { error_log('ami plumes rendre ' . $e->getMessage()); }
}
