// Ami des mots — prépare le dossier www/ embarqué dans l'appli Android (Capacitor) ou publié sur GitHub Pages.
// --appli : version Android (sans le coin admin). Copie le jeu SANS les outils, tests, serveur, sauvegardes ni node_modules. Usage : node outils/preparer-www.js [dossier]
'use strict';
const fs = require('fs'), path = require('path'), ICI = path.join(__dirname, '..');
const args = process.argv.slice(2), APPLI = args.includes('--appli'), DEST = path.resolve(args.filter(a => !a.startsWith('--'))[0] || path.join(ICI, 'www'));
const EXCLUS = new Set(['www', 'android', 'ios', 'node_modules', 'outils', 'tests', 'serveur', 'serveur-php', '.git', '.github', '.vscode', '.devcontainer']);
const FICHIERS_EXCLUS = /\.(zip|md|txt|bat|sh|sql|pem|log)$|^(package(-lock)?\.json|capacitor\.config\.json|config.*\.php)$/i;
if(DEST === ICI || ICI.startsWith(DEST + path.sep)) throw new Error('Dossier de destination invalide');
fs.rmSync(DEST, { recursive:true, force:true }); fs.mkdirSync(DEST, { recursive:true });
let n = 0, taille = 0;
(function copier(src, dst){
  for(const e of fs.readdirSync(src, { withFileTypes:true })){
    if(e.name.startsWith('.') && e.name !== '.well-known') continue;
    const s = path.join(src, e.name), d = path.join(dst, e.name);
    if(src === ICI && EXCLUS.has(e.name)) continue;
    if(e.isSymbolicLink()) continue;   // v5.97 : jamais de lien (ex. node_modules lié)
    if(e.isDirectory()){ if(src === ICI && EXCLUS.has(e.name)) continue; fs.mkdirSync(d, { recursive:true }); copier(s, d); }
    else if(!(src === ICI && (FICHIERS_EXCLUS.test(e.name) || (APPLI && e.name === 'admin.html')))){ fs.copyFileSync(s, d); n++; taille += fs.statSync(s).size; }
  }
})(ICI, DEST);
if(!fs.existsSync(path.join(DEST, 'index.html'))) throw new Error('index.html manquant');
// v6.79 : un seul fichier de scripts pour la page principale (au lieu de ~190 requêtes au démarrage). Même ordre, mêmes fichiers :
// chaque script est séparé par « ; » (aucune fusion de lignes). Les fichiers d'origine restent dans js/ (pages de test, autres pages).
// Le service worker garde le paquet hors connexion à la place des fichiers qu'il remplace. --sans-paquet : comme avant.
if(!args.includes('--sans-paquet')){
  const crypto = require('crypto'), page = path.join(DEST, 'index.html'), html = fs.readFileSync(page, 'utf8');
  const re = /<script defer src="(js\/[^"]+\.js)"><\/script>\s*/g, srcs = [...html.matchAll(re)].map(m => m[1]);
  if(srcs.length > 1){
    const corps = 'void 0;\n' + srcs.map(f => '// ── ' + f + '\n' + fs.readFileSync(path.join(ICI, f), 'utf8') + '\n;').join('\n');
    const nom = 'js/paquet-' + crypto.createHash('sha256').update(corps).digest('hex').slice(0, 10) + '.js';
    fs.writeFileSync(path.join(DEST, nom), corps);
    let premier = true;
    fs.writeFileSync(page, html.replace(re, m => { if(!premier) return ''; premier = false; return '<script defer src="' + nom + '"></script>\n'; }));
    const sw = path.join(DEST, 'sw.js');
    if(fs.existsSync(sw)){ const t = fs.readFileSync(sw, 'utf8'), m = t.match(/const FICHIERS = (\[[\s\S]*?\]);/), c = t.match(/const CACHE = '([^']+)';/);
      if(m && c){ const liste = JSON.parse(m[1]).filter(f => !srcs.includes(f)).concat(nom);
        fs.writeFileSync(sw, t.replace(m[0], 'const FICHIERS = ' + JSON.stringify(liste, null, 1) + ';').replace(c[0], "const CACHE = '" + c[1] + '-' + nom.slice(10, 16) + "';")); } }
    console.log('✔ paquet : ' + srcs.length + ' scripts → ' + nom + ' (' + (Buffer.byteLength(corps) / 1048576).toFixed(1) + ' Mo)');
  }
}
console.log('✔ ' + n + ' fichiers (' + (taille / 1048576).toFixed(1) + ' Mo) → ' + DEST);
