// Salon en ligne : deux navigateurs se retrouvent dans un salon privé et font une battle complète.
// Usage : node serveur.js . 8765 & node faux-realtime.js 8790 & node test-salon-direct.js [captures]
// Avec le serveur PHP : SERVEUR=http://127.0.0.1:8770/ node test-salon-direct.js (php -S sur serveur-php/)
const puppeteer = require('puppeteer-core');
const dossier = process.argv[2] || '.';
let ok = 0, ko = 0; const verif = (nom, c, info) => { c ? ok++ : ko++; console.log((c ? '✔ ' : '✘ ') + nom + (c ? '' : ' — ' + JSON.stringify(info))); };
const pause = ms => new Promise(r => setTimeout(r, ms));
(async () => {
  const b = await puppeteer.launch({ executablePath:process.env.CHROME || '/usr/bin/google-chrome', headless:'new', args:['--no-sandbox', '--no-proxy-server'] });
  const err = [];
  async function joueur(nom){
    const ctx = await b.createBrowserContext(), p = await ctx.newPage(); await p.setViewport({ width:700, height:900 }); await p.setBypassCSP(true);
    p.on('pageerror', e => err.push(nom + ' : ' + e));
    await p.evaluateOnNewDocument(srv => { window.CONFIG_JEU = srv ? { SERVEUR:srv, MODE_PAYANT:false } : { SALON_URL:'http://localhost:8790', SALON_CLE:'anon-test', MODE_PAYANT:false }; try{ localStorage.setItem('ami_accueil3d', '0'); }catch(e){} }, process.env.SERVEUR || '');
    await p.goto('http://localhost:8765/index.html?aller=salon', { waitUntil:'load' }); await p.waitForSelector('#pseudo');
    await p.type('#pseudo', nom); return p;
  }
  const A = await joueur('Léa'), B = await joueur('Tom');
  await A.click('[data-a="salon-creer"]'); await A.waitForSelector('.code-salon', { timeout:10000 });
  const code = await A.$eval('.code-salon', e => e.textContent.trim());
  verif('Léa crée un salon privé (code de 5 lettres)', /^[A-HJ-NP-Z]{5}$/.test(code), code);
  await B.$eval('#code-salon', (e, c) => { e.value = c; }, code); await B.click('[data-a="salon-rejoindre"]');
  await A.waitForFunction(() => document.querySelectorAll('.joueur-salon').length === 2, { timeout:10000 }).catch(() => {});
  await B.waitForFunction(() => document.querySelectorAll('.joueur-salon').length === 2, { timeout:10000 }).catch(() => {});
  const vus = async p => p.$$eval('.joueur-salon .nom', l => l.map(e => e.textContent));
  const va = await vus(A), vb = await vus(B);
  verif('les deux se voient dans le vaisseau', va.length === 2 && vb.length === 2 && va.join().includes('Tom') && vb.join().includes('Léa'), { va, vb });
  verif('Léa (arrivée la 1re) est l’hôte : elle seule a « Lancer »', !!(await A.$('[data-a="salon-lancer"]:not([disabled])')) && !(await B.$('[data-a="salon-lancer"]')));
  await B.click('[data-a="salon-reaction"]'); await A.waitForFunction(() => [...document.querySelectorAll('.bulle-reaction')].some(e => e.textContent.trim()), { timeout:5000 }).catch(() => {});
  const bulle = await A.$$eval('.bulle-reaction', l => l.map(e => e.textContent).join(''));
  verif('une réaction de Tom apparaît chez Léa', bulle.trim().length > 0, bulle);
  await A.screenshot({ path:dossier + '/salon-vaisseau.png' });
  await A.click('[data-a="salon-lancer"]');
  for(let i = 0; i < 6; i++){
    for(const p of [A, B]) await p.waitForFunction(n => (document.querySelector('.piege-cat') || {}).textContent?.includes('Question ' + n + '/'), { timeout:25000 }, i + 1);
    if(i === 0){ const q = await Promise.all([A, B].map(p => p.$$eval('.piege-opt', l => l.map(e => e.textContent).sort().join('|')))); verif('même question chez les deux', q[0] === q[1], q); }
    await A.click('.piege-opt'); await B.click('.piege-opt:last-child');
    if(i === 0){ await pause(600); const sc = await A.$eval('#scores-salon', e => e.textContent); verif('les scores des deux apparaissent', /Léa/.test(sc) && /Tom/.test(sc), sc); await A.screenshot({ path:dossier + '/salon-question.png' }); }
  }
  for(const p of [A, B]) await p.waitForSelector('.podium', { timeout:25000 });
  const pod = await Promise.all([A, B].map(p => p.$$eval('.podium li', l => l.map(e => e.textContent))));
  verif('podium identique chez les deux, 2 joueurs', pod[0].length === 2 && pod[0].join() === pod[1].join(), pod);
  await B.screenshot({ path:dossier + '/salon-podium.png' });
  await B.click('[data-a="salon-quitter"]'); await pause(800); if(await A.$('[data-a="salon-retour"]')) await A.click('[data-a="salon-retour"]'); await pause(400);
  verif('quand Tom part, Léa le voit partir', (await vus(A)).length === 1, await vus(A));
  verif('aucune erreur', !err.length, err);
  console.log(`\n${ok} réussi(s), ${ko} échoué(s)`); await b.close(); process.exit(ko ? 1 : 0);
})();
