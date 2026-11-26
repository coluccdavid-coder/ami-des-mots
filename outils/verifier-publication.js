// Ami des mots — v6.79 : « Est-ce prêt à publier ? » Liste ce qui bloque encore une ouverture au public et ce qui est réellement activé.
// Usage : npm run publication            (rapport)
//         npm run publication -- --strict (code de sortie 1 s'il reste un point bloquant)
// Ne modifie rien. Ne lit aucun secret (seulement les réglages publics et legal.html).
'use strict';
const fs = require('fs'), path = require('path'), ICI = path.join(__dirname, '..');
const lire = f => fs.readFileSync(path.join(ICI, f), 'utf8');
const bloquants = [], infos = [];

// 1. Mentions légales : chaque passage encore surligné « à compléter ».
const legal = lire('legal.html'), trous = [...legal.matchAll(/<span class="a-completer">([\s\S]*?)<\/span>/g)].map(m => m[1].replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim()).filter(t => t !== 'surlignés');
if(trous.length) bloquants.push('Mentions légales et confidentialité (legal.html) : ' + trous.length + ' passage(s) à compléter, puis relecture par un juriste :\n' + trous.map(t => '     · ' + t).join('\n'));

// 2. Réglages publics : ce qui est réellement allumé.
global.window = {}; eval(lire('js/config-site.js')); const C = global.window.CONFIG_JEU || {};
const serveur = !!String(C.SERVEUR || '').trim();
infos.push('Serveur : ' + (serveur ? C.SERVEUR + ' (aide aux devoirs par IA, veille des programmes, salon en direct, plumes : possibles)' : 'aucun → pas d’IA (aide aux devoirs : méthode locale seulement), pas de salon en direct, pas de veille, pas d’abonnement'));
infos.push('Paiement : ' + (C.MODE_PAYANT ? 'ACTIVÉ' : 'désactivé (tout est gratuit)'));
const caches = [['VILLAGE_CACHE', 'village (2D et 3D)'], ['MOTS_CITY_CACHE', 'Mots City'], ['VOIX_COUPEES', 'commentaires vocaux de Plumo'], ['BOUCHE_CACHE', 'animation « comment la bouche fait ce mot »']].filter(([k]) => C[k]).map(([, n]) => n);
infos.push('Fonctions masquées par la configuration (rien n’est supprimé) : ' + (caches.length ? caches.join(', ') : 'aucune'));
infos.push('Ouverture : ' + (C.OUVRIR_MATIERES ? 'sur la table des matières' : 'sur l’accueil des jeux'));
infos.push('→ Captures d’écran, fiche de boutique et textes de présentation doivent montrer exactement cela.');

// 3. Mineurs et IA : l'aide aux devoirs n'envoie rien sans l'accord d'un parent (appli + serveur).
const dev = lire('js/mod-devoirs.js'), php = lire('serveur-php/devoirs.php');
if(!/devoirsAccord/.test(dev) || !/accord_parent/.test(php)) bloquants.push('Aide aux devoirs : l’accord parental n’est pas exigé à la fois dans l’appli et sur le serveur.');
else infos.push('Aide aux devoirs par IA : seulement avec l’accord d’un parent (Espace parents), vérifié aussi par le serveur.');
if(/Durée de conservation chez Anthropic : à vérifier/.test(legal)) bloquants.push('Durée de conservation des devoirs chez le fournisseur d’IA : à vérifier dans le contrat et à écrire dans legal.html avant d’allumer l’aide par IA.');

// 4. Ce que ce script ne peut pas vérifier : à faire à la main.
const aFaire = ['Tests automatiques complets : npm install puis npm run verifier (et npm run test:serveur avec PHP + MariaDB).',
  'Essais sur de vrais appareils : petit téléphone Android, tablette, iPhone (navigateur), ordinateur ; hors connexion ; connexion lente ; reprise après fermeture ; six profils ; changement de langue ; voix.',
  'Accessibilité : clavier seul, lecteur d’écran, contraste, taille du texte.',
  'Serveur déployé : HTTPS, config.php hors du dossier public, sauvegardes de la base, journaux, limites de requêtes ; test d’intrusion par un tiers si possible.',
  'Relecture juridique (mineurs, données, IA, boutique) avant l’ouverture.'];

console.log('\n=== Ami des mots — prêt à publier ? ===\n');
console.log('Ce qui est activé :'); infos.forEach(x => console.log('  • ' + x));
console.log('\nPoints bloquants (' + bloquants.length + ') :'); bloquants.length ? bloquants.forEach(x => console.log('  ✘ ' + x)) : console.log('  ✔ aucun');
console.log('\nÀ vérifier à la main :'); aFaire.forEach(x => console.log('  ☐ ' + x));
console.log('\nVoir docs/AVANT-PUBLICATION.md.\n');
if(process.argv.includes('--strict') && bloquants.length) process.exit(1);
