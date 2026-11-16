// Ami des mots — aligne les mots du jeu sur les voix ENREGISTRÉES de ReParole.
// ReParole nomme chaque fichier son d'après le texte exact prononcé
// (audio/<langue>/<fnv1a(texte)>.mp3) : « POISSON » et « poisson » donnent deux
// fichiers différents. Ce script choisit, pour chaque mot et chaque langue,
// l'écriture que ReParole a dans son manifeste de voix, et l'écrit dans
// js/voix.js (window.VOIX[langue][emoji] = texte à prononcer).
// Les mots que ReParole n'a pas du tout sont listés dans
// outils/mots-sans-voix.json : à ajouter à la génération des voix de ReParole.
// Usage : node outils/voix-reparole.js <dossier de ReParole>
'use strict';
const fs = require('fs'), path = require('path'), vm = require('vm');
const REP = process.argv[2] || path.join(__dirname, '..', '..', 'w');
const ICI = path.join(__dirname, '..');
const man = JSON.parse(fs.readFileSync(path.join(REP, 'scripts', 'voice-manifest.json'), 'utf8'));
const ctx = { window:{} }; vm.createContext(ctx);
vm.runInContext(fs.readFileSync(path.join(ICI, 'js', 'donnees.js'), 'utf8'), ctx);
const MOTS = ctx.window.MOTS;
const loc = l => ({ kab:'fr', tr:'tr' }[l] || l);
const voix = {}, sans = {};
let trouves = 0, total = 0;
for(const l of Object.keys(man)){
  const dispo = new Set(man[l]);
  for(const e of Object.keys(MOTS)){
    const m = MOTS[e][l]; if(!m) continue;
    total++;
    const bas = m.toLocaleLowerCase(loc(l));
    const brut = m.toLowerCase();   // sans locale : « İ » devient « i̇ » (comme dans ReParole)
    // Minuscules d'abord : c'est la voix naturelle d'un mot isolé ; la majuscule en dernier recours.
    const essais = [bas, brut, bas.charAt(0).toLocaleUpperCase(loc(l)) + bas.slice(1), brut.charAt(0).toUpperCase() + brut.slice(1), m, m.trim()];
    const ok = essais.find(x => dispo.has(x));
    if(ok){ trouves++; if(ok !== m) (voix[l] = voix[l] || {})[e] = ok; }
    else (sans[l] = sans[l] || []).push(bas);
  }
}
fs.writeFileSync(path.join(ICI, 'js', 'voix.js'),
  '// Généré par outils/voix-reparole.js — ne pas modifier à la main.\n' +
  '// Écriture exacte des mots dans les voix enregistrées de ReParole.\n' +
  'window.VOIX = ' + JSON.stringify(voix) + ';\n');
fs.writeFileSync(path.join(ICI, 'outils', 'mots-sans-voix.json'), JSON.stringify(sans, null, 1) + '\n');
console.log('Voix ReParole trouvées : ' + trouves + ' / ' + total);
for(const l of Object.keys(sans)) console.log('  ' + l + ' : ' + sans[l].length + ' mot(s) sans voix — ' + sans[l].slice(0, 5).join(', '));
