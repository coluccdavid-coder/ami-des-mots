// v5.95 : audit d'accessibilité (axe-core, règles WCAG 2.1 A et AA) sur les écrans principaux.
// Usage : node serveur.js . 8765 & NODE_PATH=... node test-accessibilite.js [--detail]
// Nécessite puppeteer-core et axe-core (npm i axe-core puppeteer-core dans un dossier d'outils).
const puppeteer = require('puppeteer-core');
const fs = require('fs');
const AXE = fs.readFileSync(require.resolve('axe-core/axe.min.js'), 'utf8');
const detail = process.argv.includes('--detail');
let ok = 0, ko = 0; const verif = (nom, c, info) => { c ? ok++ : ko++; console.log((c ? '✔ ' : '✘ ') + nom + (c ? '' : ' — ' + info)); };
// Écrans : suite d'actions data-a / data-v à cliquer depuis l'accueil.
const ECRANS = [
  ['accueil', []],
  ['matières', [['matieres']]],
  ['questions de maths', [['matieres'], ['matiere', 'maths']]],
  ['coin anglais', [['anglais']]],
  ['battles', [['battle']]],
  ['clash libre', [['battle'], ['clash-libre']]],
  ['offre Plus', [['plus']]],
  ['réglages', [['reglages']]]
];
(async () => {
  const b = await puppeteer.launch({ executablePath:process.env.CHROME || '/usr/bin/google-chrome', headless:'new', args:['--no-sandbox', '--no-proxy-server', '--lang=fr-FR'] });
  const w = await b.newPage(); await w.setViewport({ width:420, height:820 });
  const err = []; w.on('pageerror', e => err.push(String(e)));
  for(const [nom, actions] of ECRANS){
    await w.goto('http://localhost:8765/index.html?aller=classique', { waitUntil:'load' }); await w.waitForFunction(() => window.AmiDesMots);
    await w.evaluate(() => { const b = AmiDesMots.base; b.ui = 'fr'; b.presente = true; });
    for(const [a, v] of actions){
      const fait = await w.evaluate((a, v) => { const x = document.createElement('button'); x.dataset.a = a; if(v != null) x.dataset.v = v; document.body.appendChild(x); x.click(); x.remove(); return true; }, a, v || null);
      if(!fait) break; await new Promise(r => setTimeout(r, 250));
    }
    await w.evaluate(AXE);
    const r = await w.evaluate(async () => { const r = await axe.run(document, { runOnly:{ type:'tag', values:['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'] }, resultTypes:['violations'] });
      return r.violations.map(v => ({ id:v.id, impact:v.impact, n:v.nodes.length, ex:v.nodes.slice(0, 3).map(n => n.target.join(' ') + ' :: ' + (n.failureSummary || '').split('\n').slice(1, 2).join('')) })); });
    const graves = r.filter(v => v.impact === 'critical' || v.impact === 'serious');
    verif('« ' + nom + ' » : aucune violation grave (WCAG 2.1 AA)', !graves.length, graves.map(v => v.id + '×' + v.n).join(', '));
    if(detail) for(const v of r) console.log('   ', v.impact, v.id, '×' + v.n, '\n      ' + v.ex.join('\n      '));
  }
  // Page légale (hors application).
  await w.goto('http://localhost:8765/legal.html', { waitUntil:'load' }); await w.evaluate(AXE);
  const rl = await w.evaluate(async () => (await axe.run(document, { runOnly:{ type:'tag', values:['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'] } })).violations.filter(v => v.impact === 'critical' || v.impact === 'serious').map(v => v.id + '×' + v.nodes.length));
  verif('« legal.html » : aucune violation grave (WCAG 2.1 AA)', !rl.length, rl.join(', '));
  verif('aucune erreur de page', !err.length, err.join(' | '));
  console.log(`\n${ok} réussi(s), ${ko} échoué(s)`); await b.close(); process.exit(ko ? 1 : 0);
})();
