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
console.log('✔ ' + n + ' fichiers (' + (taille / 1048576).toFixed(1) + ' Mo) → ' + DEST);
