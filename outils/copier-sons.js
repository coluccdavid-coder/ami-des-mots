// Ami des mots — v6.0 : copie les sons des mots dans audio/ pour ne plus dépendre de reparole.fr.
// Seuls les fichiers dont le jeu a besoin sont copiés (mots × langues visibles), pas toute la sonothèque.
//   node outils/copier-sons.js <dossier de ReParole>       → copie depuis le dossier audio/ du projet ReParole
//   node outils/copier-sons.js --telecharger                → télécharge depuis https://reparole.fr/audio/ (dans le Codespace)
// Option --langues fr,en,es,de,it,pt (par défaut : les langues des listes du jeu).
// Ensuite : git add audio && commit → la mise en ligne OVH les envoie avec le site. Le jeu les lit dans audio/ ;
// un son absent est lu par la voix du téléphone (comme avant).
'use strict';
const fs = require('fs'), path = require('path'), vm = require('vm'), https = require('https');
const ICI = path.join(__dirname, '..');
const arg = process.argv.slice(2);
const telecharger = arg.includes('--telecharger');
const li = arg.indexOf('--langues');
const LANGUES = li >= 0 ? arg[li + 1].split(',') : ['fr', 'en', 'es', 'de', 'it', 'pt'];
const source = arg.find(a => !a.startsWith('--') && a !== (li >= 0 ? arg[li + 1] : ''));
if(!telecharger && !source){ console.error('Usage : node outils/copier-sons.js <dossier ReParole> | --telecharger [--langues fr,en]'); process.exit(1); }
const ctx = { window:{} }; vm.createContext(ctx);
for(const f of ['donnees.js', 'voix.js']) vm.runInContext(fs.readFileSync(path.join(ICI, 'js', f), 'utf8'), ctx);
const { MOTS, VOIX } = ctx.window;
// Même empreinte que le jeu (fnv1a dans js/jeu.js).
function fnv1a(str){ let h = 0x811c9dc5; for(let i = 0; i < str.length; i++){ h ^= str.charCodeAt(i); h = Math.imul(h, 0x01000193); } return (h >>> 0).toString(36); }
const voulu = [];
for(const l of LANGUES) for(const e of Object.keys(MOTS)){ const m = (VOIX[l] && VOIX[l][e]) || MOTS[e][l]; if(m) voulu.push([l, fnv1a(m) + '.mp3']); }
const get = u => new Promise(ok => https.get(u, r => { if(r.statusCode !== 200){ r.resume(); return ok(null); } const b = []; r.on('data', d => b.push(d)); r.on('end', () => ok(Buffer.concat(b))); }).on('error', () => ok(null)));
(async () => {
  let copies = 0, absents = 0;
  for(const [l, f] of voulu){
    const dest = path.join(ICI, 'audio', l, f); if(fs.existsSync(dest)){ copies++; continue; }
    fs.mkdirSync(path.dirname(dest), { recursive:true });
    let buf = null;
    if(telecharger) buf = await get('https://reparole.fr/audio/' + l + '/' + f);
    else { const src = path.join(source, 'audio', l, f); if(fs.existsSync(src)) buf = fs.readFileSync(src); }
    if(buf){ fs.writeFileSync(dest, buf); copies++; } else absents++;
  }
  console.log('Sons dans audio/ : ' + copies + ' · absents (voix du téléphone) : ' + absents);
})();
