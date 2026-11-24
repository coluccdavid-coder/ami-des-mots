<?php
// Ami des mots — l'IA trie les vannes qu'on ajoute au paquet du Clash libre (v5.87).
// Le juge de Plumo (règles) a déjà dit oui dans le jeu ; ici Claude repère ce que les règles ne voient pas :
// moquerie déguisée sur le physique, la famille, l'origine, la religion, le genre, un handicap ou l'argent, harcèlement,
// sous-entendu sexuel, violence, personne réelle visée, données personnelles, langage codé. Il vérifie aussi l'anglais.
// POST { fr, en } → { garder:true|false, raison:"…", en_corrige:"…"|null }
// Rien de personnel n'est envoyé : seulement le texte de la vanne (ni prénom, ni code, ni adresse).
declare(strict_types=1);
require __DIR__ . '/lib.php';
ami_cors('POST');
if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') ami_json(['erreur' => 'methode'], 405);
$cfg = ami_config();
if (($cfg['anthropic_cle'] ?? '') === '') ami_json(['erreur' => 'non_configure'], 503);
ami_limiter('vanne-juge', 20);

const SYSTEME_JUGE = "Tu es le juge des vannes de « Ami des mots », un jeu familial où des enfants et des ados se chambrent en apprenant l'anglais.\n"
  . "On te donne UNE vanne que des joueurs veulent ajouter à leur paquet. Tu décides si elle peut y entrer.\n"
  . "ACCEPTE les vannes qui piquent fort, même très cash, si elles visent ce que la personne FAIT : son jeu, ses devoirs, son téléphone,\n"
  . "sa playlist, sa cuisine, ses excuses, sa riposte… Le parler des jeunes est bienvenu (wesh, gros, frérot, t'es un ouf, skill issue, aura…).\n"
  . "REFUSE si la vanne : vise qui est la personne (physique, poids, taille, visage, peau, cheveux, voix, intelligence présentée comme un défaut),\n"
  . "sa famille, son origine, sa religion, son genre ou son orientation, un handicap ou une maladie, l'argent ou la pauvreté ;\n"
  . "contient un gros mot (même déguisé ou en verlan), une insulte, un sous-entendu sexuel, de la violence ou une menace, de l'humiliation ou du harcèlement\n"
  . "(« personne ne t'aime », « t'as pas d'amis »), vise une personne réelle nommée, contient une donnée personnelle, ou est incompréhensible.\n"
  . "Dans le doute, REFUSE. Ne rends jamais la vanne plus méchante.\n"
  . "Si une version anglaise est donnée et qu'elle est fausse ou ne veut pas dire la même chose, propose une correction naturelle et courte dans en_corrige ;\n"
  . "sinon en_corrige vaut null. N'invente pas d'anglais si aucune version anglaise n'est donnée.\n"
  . "Réponds UNIQUEMENT par un objet JSON : {\"garder\": true|false, \"raison\": \"une phrase courte en français, pour des ados\", \"en_corrige\": null|\"…\"}.";

$d = ami_corps_json(2048);
$txt = fn($v, int $max) => mb_substr(trim(preg_replace('/\s+/u', ' ', str_replace(['<', '>', '{', '}'], '', (string) $v))), 0, $max);
$fr = $txt($d['fr'] ?? '', 140); $en = $txt($d['en'] ?? '', 140);
if ($fr === '' && $en === '') ami_json(['erreur' => 'vide'], 400);

try {
  $db = ami_db(); $jour = gmdate('Y-m-d');
  $cle = 'J-' . substr(hash('sha256', 'juge|' . ($_SERVER['REMOTE_ADDR'] ?? '?') . '|' . ($cfg['db_user'] ?? '')), 0, 18);
  ami_upsert_compteur($db, 'ami_vannes_appels', ['code' => $cle, 'jour' => $jour]);
  $max = (int) ($cfg['vanne_juge_par_jour'] ?? 60);
  if ((int) ami_val($db, 'SELECT n FROM ami_vannes_appels WHERE code = ? AND jour = ?', [$cle, $jour]) > $max) ami_json(['erreur' => 'quota', 'max' => $max], 429);
} catch (Throwable $e) { error_log('ami vanne-juge base ' . $e->getMessage()); ami_json(['erreur' => 'indisponible'], 503); }

$demande = 'Vanne en français : ' . ($fr !== '' ? json_encode($fr, JSON_UNESCAPED_UNICODE) : '(aucune)') . "\n"
  . 'Version anglaise : ' . ($en !== '' ? json_encode($en, JSON_UNESCAPED_UNICODE) : '(aucune)');
$texte = ami_claude(SYSTEME_JUGE, [['type' => 'text', 'text' => $demande]], $cfg['anthropic_modele'] ?? 'claude-haiku-5-5', 200, 12);
if ($texte === null) ami_json(['erreur' => 'ia_indisponible'], 502);
$a = strpos($texte, '{'); $b = strrpos($texte, '}');
$o = ($a !== false && $b !== false) ? json_decode(substr($texte, $a, $b - $a + 1), true) : null;
if (!is_array($o) || !is_bool($o['garder'] ?? null)) ami_json(['erreur' => 'ia_illisible'], 502);
$corrige = is_string($o['en_corrige'] ?? null) && $en !== '' ? $txt($o['en_corrige'], 140) : null;
ami_json(['garder' => $o['garder'], 'raison' => $txt($o['raison'] ?? '', 160), 'en_corrige' => $corrige !== '' ? $corrige : null]);
