// v6.79 : le paquet de production (outils/preparer-www.js) — un seul script pour la page principale.
// On vérifie qu'il charge EXACTEMENT le même jeu que les ~190 scripts séparés : mêmes matières, mêmes chapitres, mêmes actions.
'use strict';
const fs = require('fs'), path = require('path'), os = require('os'), assert = require('assert'), { execFileSync } = require('child_process');
let JSDOM, VirtualConsole; try{ ({ JSDOM, VirtualConsole } = require('jsdom')); }catch(e){ console.error('✘ Dépendances absentes (jsdom) : lance « npm install » avant « npm test ».'); process.exit(1); }
const ICI = path.join(__dirname, '..'), DEST = fs.mkdtempSync(path.join(os.tmpdir(), 'ami-www-'));
let ok = 0, ko = 0; const test = (n, f) => { try{ f(); console.log('  ✔', n); ok++; }catch(e){ console.log('  ✘', n, '—', e.message); ko++; } };
execFileSync(process.execPath, [path.join(ICI, 'outils/preparer-www.js'), DEST], { stdio:'ignore' });

function charger(racine, scripts){
  const html = fs.readFileSync(path.join(racine, 'index.html'), 'utf8');
  const w = new JSDOM(html.replace(/<script[\s\S]*?<\/script>/g, ''), { url:'https://jeu.example/', runScripts:'outside-only', pretendToBeVisual:true, virtualConsole:new VirtualConsole() }).window;
  w.HTMLCanvasElement.prototype.getContext = () => null;
  Object.defineProperty(w.navigator, 'language', { value:'fr-FR' });
  w.HTMLMediaElement.prototype.pause = () => {}; w.HTMLMediaElement.prototype.play = () => Promise.reject(new Error('hors ligne'));
  w.matchMedia = () => ({ matches:true }); w.scrollTo = () => {}; w.CONFIG_JEU = { PRESENTER_NOUVEAUX:false, MODE_PAYANT:false };
  Object.defineProperty(w, 'crypto', { value:require('crypto').webcrypto, configurable:true }); w.TextEncoder = TextEncoder; w.TextDecoder = TextDecoder;
  w.fetch = async () => ({ ok:true, json:async () => ({ actif:false }) });
  for(const f of scripts) w.eval(fs.readFileSync(path.join(racine, f), 'utf8'));
  w.document.dispatchEvent(new w.Event('DOMContentLoaded'));
  return w;
}
// v8.5 : le dossier de destination peut être DANS le projet (GitHub Pages : _site, OVH : _ovh) sans se recopier en boucle.
test('un dossier de destination placé dans le projet (_site) ne se recopie pas dans lui-même', () => {
  const site = path.join(ICI, '_site');
  try{
    execFileSync(process.execPath, [path.join(ICI, 'outils/preparer-www.js'), '_site'], { cwd:ICI, stdio:'ignore', timeout:120000 });
    assert.ok(fs.existsSync(path.join(site, 'index.html')), 'index.html copié');
    assert.ok(!fs.existsSync(path.join(site, '_site')), 'pas de _site dans _site');
  } finally { fs.rmSync(site, { recursive:true, force:true }); }
});
const srcs = h => [...h.matchAll(/<script defer src="(js\/[^"]+)"><\/script>/g)].map(m => m[1]);
const pageDev = fs.readFileSync(path.join(ICI, 'index.html'), 'utf8'), pageProd = fs.readFileSync(path.join(DEST, 'index.html'), 'utf8');

test('la page de production ne charge qu’un seul script, le paquet', () => {
  const p = srcs(pageProd); assert.strictEqual(p.length, 1); assert.match(p[0], /^js\/paquet-[0-9a-f]{10}\.js$/);
  assert.ok(srcs(pageDev).length > 150, 'la page de développement garde ses scripts séparés');
});
test('le paquet contient tous les scripts, dans le même ordre', () => {
  const corps = fs.readFileSync(path.join(DEST, srcs(pageProd)[0]), 'utf8'), ordre = [...corps.matchAll(/^\/\/ ── (js\/\S+)$/gm)].map(m => m[1]);
  assert.deepStrictEqual(ordre, srcs(pageDev));
});
test('le service worker garde le paquet hors connexion, à la place des scripts qu’il remplace', () => {
  const sw = fs.readFileSync(path.join(DEST, 'sw.js'), 'utf8'), liste = JSON.parse(sw.match(/const FICHIERS = (\[[\s\S]*?\]);/)[1]);
  assert.ok(liste.includes(srcs(pageProd)[0])); assert.ok(!liste.includes('js/jeu.js')); assert.ok(liste.includes('index.html') && liste.includes('css/jeu.css'));
  assert.notStrictEqual(sw.match(/const CACHE = '([^']+)'/)[1], fs.readFileSync(path.join(ICI, 'sw.js'), 'utf8').match(/const CACHE = '([^']+)'/)[1], 'nouveau cache');
});
test('le jeu chargé par le paquet est le même que celui des scripts séparés', () => {
  const a = charger(ICI, srcs(pageDev)), b = charger(DEST, srcs(pageProd));
  const resume = w => JSON.stringify({ matieres:w.MATIERES.LISTE.map(m => m.id + ':' + m.chapitres.length + ':' + m.chapitres.reduce((t, c) => t + (c.banque ? c.banque.length : 0), 0)),
    actions:Object.keys(w.AMI_MODULES.actions).sort(), maths:w.MATHS ? Object.keys(w.MATHS).length : 0, docs:w.AMI_DOCUMENTS.DOCS.length });
  assert.strictEqual(resume(b), resume(a));
  b.AmiDesMots.accueil(); assert.ok(b.document.querySelector('main, .accueil'), 'l’accueil s’affiche');
  const x = b.document.createElement('button'); x.dataset.a = 'matieres'; b.document.body.appendChild(x); x.click();
  assert.ok(b.document.querySelector('[data-a="matiere"][data-v="anglais-inter"]'), 'écran des matières');
  a.close(); b.close();
});
fs.rmSync(DEST, { recursive:true, force:true });
console.log(`\n${ok} réussi(s), ${ko} échoué(s)`); process.exit(ko ? 1 : 0);
