<?php
// Ami des mots — salon des battles sans Supabase : on se retrouve par code, présence et messages par
// rafraîchissement rapide (environ 1 s). Fonctionne sur un hébergement PHP mutualisé (pas de WebSocket).
// Rien n'est gardé : la présence s'oublie après 12 s sans nouvelles, les messages après 2 minutes.
// POST { action:"rejoindre"|"suivre"|"envoyer"|"quitter"|"relever", … }
declare(strict_types=1);
require __DIR__ . '/lib.php';
ami_cors('POST');
if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') ami_json(['erreur' => 'methode'], 405);
ami_limiter('salon', 300);

const SUJET = '/^ami-[a-z0-9-]{1,60}$/';
const CLE = '/^[a-z0-9]{4,20}$/';
const EVENEMENT = '/^[a-z]{1,20}$/';
const OUBLI_PRESENCE = 12000, OUBLI_MESSAGES = 120000;

$d = ami_corps_json(4096);
$db = ami_db(); $t = ami_ms();
$sujet = fn($s) => is_string($s) && preg_match(SUJET, $s) ? $s : ami_json(['erreur' => 'sujet'], 400);
$cle = fn($s) => is_string($s) && preg_match(CLE, $s) ? $s : ami_json(['erreur' => 'cle'], 400);

try {
  switch ($d['action'] ?? '') {
    case 'rejoindre': {
      $s = $sujet($d['sujet'] ?? null); $cle($d['cle'] ?? null);
      ami_json(['ok' => true, 'dernier' => (int) (ami_val($db, 'SELECT MAX(id) FROM ami_salon_messages WHERE sujet = ?', [$s]) ?? 0)]);
    }
    case 'suivre': {
      $s = $sujet($d['sujet'] ?? null); $c = $cle($d['cle'] ?? null);
      $meta = json_encode($d['meta'] ?? new stdClass(), JSON_UNESCAPED_UNICODE);
      if (!is_array($d['meta'] ?? null) || strlen($meta) > 900) ami_json(['erreur' => 'meta'], 400);
      $mysql = $db->getAttribute(PDO::ATTR_DRIVER_NAME) === 'mysql';
      $db->prepare('INSERT INTO ami_salon_presence (sujet, cle, meta, vu) VALUES (?, ?, ?, ?) ' . ($mysql ? 'ON DUPLICATE KEY UPDATE meta = VALUES(meta), vu = VALUES(vu)' : 'ON CONFLICT(sujet, cle) DO UPDATE SET meta = excluded.meta, vu = excluded.vu'))
        ->execute([$s, $c, $meta, $t]);
      ami_json(['ok' => true]);
    }
    case 'envoyer': {
      $s = $sujet($d['sujet'] ?? null);
      $ev = is_string($d['evenement'] ?? null) && preg_match(EVENEMENT, $d['evenement']) ? $d['evenement'] : ami_json(['erreur' => 'evenement'], 400);
      $charge = json_encode($d['charge'] ?? new stdClass(), JSON_UNESCAPED_UNICODE);
      if (!is_array($d['charge'] ?? null) || strlen($charge) > 2000) ami_json(['erreur' => 'charge'], 400);
      $db->prepare('INSERT INTO ami_salon_messages (sujet, evenement, charge, t) VALUES (?, ?, ?, ?)')->execute([$s, $ev, $charge, $t]);
      ami_json(['ok' => true]);
    }
    case 'quitter': {
      $db->prepare('DELETE FROM ami_salon_presence WHERE sujet = ? AND cle = ?')->execute([$sujet($d['sujet'] ?? null), $cle($d['cle'] ?? null)]);
      ami_json(['ok' => true]);
    }
    case 'relever': {
      $canaux = $d['canaux'] ?? null;
      if (!is_array($canaux) || count($canaux) > 3) ami_json(['erreur' => 'canaux'], 400);
      $rep = [];
      foreach ($canaux as $k) {
        $s = $sujet($k['sujet'] ?? null); $c = $cle($k['cle'] ?? null); $depuis = max(0, (int) ($k['depuis'] ?? 0));
        $db->prepare('UPDATE ami_salon_presence SET vu = ? WHERE sujet = ? AND cle = ?')->execute([$t, $s, $c]);
        $m = $db->prepare('SELECT id, evenement, charge FROM ami_salon_messages WHERE sujet = ? AND id > ? AND t > ? ORDER BY id LIMIT 100');
        $m->execute([$s, $depuis, $t - OUBLI_MESSAGES]);
        $msgs = array_map(fn($r) => ['id' => (int) $r['id'], 'ev' => $r['evenement'], 'p' => json_decode($r['charge'], true)], $m->fetchAll());
        $p = $db->prepare('SELECT cle, meta FROM ami_salon_presence WHERE sujet = ? AND vu > ?');
        $p->execute([$s, $t - OUBLI_PRESENCE]);
        $pres = new stdClass();
        foreach ($p->fetchAll() as $r) $pres->{$r['cle']} = json_decode($r['meta'], true);
        $rep[$s] = ['messages' => $msgs, 'presence' => $pres];
      }
      if (random_int(1, 50) === 1) {
        $db->prepare('DELETE FROM ami_salon_messages WHERE t < ?')->execute([$t - OUBLI_MESSAGES]);
        $db->prepare('DELETE FROM ami_salon_presence WHERE vu < ?')->execute([$t - 5 * OUBLI_PRESENCE]);
      }
      ami_json(['canaux' => $rep]);
    }
  }
} catch (Throwable $e) { error_log('ami salon ' . $e->getMessage()); ami_json(['erreur' => 'indisponible'], 503); }
ami_json(['erreur' => 'action'], 400);
