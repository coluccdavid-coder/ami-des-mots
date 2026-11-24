// v6.1 : programme anglais (England) dans un vrai navigateur : accueil, matière, quiz, mock SATs, Times tables check (captures).
// Usage : node serveur.js . 8765 & node test-angleterre.js [dossier captures]
const puppeteer = require('puppeteer-core');
const dossier = process.argv[2] || '.';
let ok = 0, ko = 0; const verif = (nom, c, info) => { c ? ok++ : ko++; console.log((c ? '✔ ' : '✘ ') + nom + (c ? '' : ' — ' + JSON.stringify(info))); };
const pause = ms => new Promise(r => setTimeout(r, ms));
(async () => {
  const b = await puppeteer.launch({ executablePath:process.env.CHROME || '/usr/bin/google-chrome', headless:'new', args:['--no-sandbox'] });
  const w = await b.newPage(); await w.setViewport({ width:420, height:860 }); const err = []; w.on('pageerror', e => err.push(String(e)));
  await w.goto('http://localhost:8765/index.html?aller=classique', { waitUntil:'load' }); await w.waitForFunction(() => window.AmiDesMots && window.AMI_MODULES && window.ENGLAND);
  const clic = (sel) => w.evaluate(s => { const e = document.querySelector(s); if(e) e.click(); return !!e; }, sel);
  const bouton = (a, v) => w.evaluate((a, v) => { const x = document.createElement('button'); x.dataset.a = a; if(v) x.dataset.v = v; document.body.appendChild(x); x.click(); x.remove(); }, a, v);
  await bouton('matieres'); verif('carte « England curriculum » dans Matières', await clic('[data-a="gb-programme"][data-v="gb"]'));
  await pause(200); await w.screenshot({ path:dossier + '/england-accueil.png', fullPage:true });
  await clic('[data-a="gb-niveau"][data-v="Y11"]'); await clic('[data-a="gb-matiere"][data-v="gb-maths"]'); await pause(150);
  await w.screenshot({ path:dossier + '/england-maths-y11.png', fullPage:true });
  await clic('[data-a="gb-melange"]'); await pause(150); await clic('[data-a="qz-rep"]'); await pause(200);
  await w.screenshot({ path:dossier + '/england-question.png', fullPage:true });
  await bouton('gb-mock', 'sats-maths');
  for(let p = 0; p < 3; p++){ await clic('[data-a="gb-paper"]'); await w.evaluate(() => { while(document.querySelector('[data-a="qz-rep"]')){ document.querySelector('[data-a="qz-rep"]').click(); document.querySelector('[data-a="qz-suivant"]').click(); } }); }
  await pause(200); const r = await w.evaluate(() => document.querySelector('.note-examen') && document.querySelector('.note-examen').textContent);
  verif('mock SATs maths : scaled score', /Scaled score|Below 80/.test(r || ''), r); await w.screenshot({ path:dossier + '/england-sats.png', fullPage:true });
  await bouton('gb-mtc'); await pause(300); await w.screenshot({ path:dossier + '/england-mtc.png' });
  const q = await w.evaluate(() => document.querySelector('.mtc-question').textContent.match(/(\d+) × (\d+)/).slice(1).map(Number));
  await w.type('#mtc-rep', String(q[0] * q[1])); await w.keyboard.press('Enter'); await pause(100);
  verif('Times tables check : réponse au clavier', await w.evaluate(() => /✅/.test(document.getElementById('mtc-msg').textContent)));
  await pause(6800); verif('6 secondes écoulées : question suivante corrigée « Time! »', await w.evaluate(() => /Time!/.test((document.getElementById('mtc-msg') || {}).textContent || '') || /3\/25/.test(document.body.textContent)));
  await bouton('gb-mtc-stop'); await bouton('gb-officiel'); await pause(150); await w.screenshot({ path:dossier + '/england-officiel.png', fullPage:true });
  verif('aucune erreur de page', !err.length, err);
  console.log(`\n${ok} réussi(s), ${ko} échoué(s)`); await b.close(); process.exit(ko ? 1 : 0);
})();
