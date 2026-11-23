// Coin maths (Prof Pi) et labo des sciences dans un vrai Chrome : écrans, vanne à l'erreur, examen, captures.
// Usage : node serveur.js . 8765 & node test-maths-sciences.js [captures]
const puppeteer = require('puppeteer-core');
const dossier = process.argv[2] || '.';
let ok = 0, ko = 0; const verif = (n, c, i) => { c ? ok++ : ko++; console.log((c ? '✔ ' : '✘ ') + n + (c ? '' : ' — ' + JSON.stringify(i))); };
(async () => {
  const b = await puppeteer.launch({ executablePath:process.env.CHROME || '/usr/bin/google-chrome', headless:'new', args:['--no-sandbox', '--no-proxy-server'] });
  const p = await b.newPage(); await p.setViewport({ width:420, height:860, deviceScaleFactor:1 }); const err = []; p.on('pageerror', e => err.push(String(e))); p.on('console', m => m.type() === 'error' && err.push(m.text()));
  await p.evaluateOnNewDocument(() => { window.CONFIG_JEU = { MODE_PAYANT:false }; try{ localStorage.setItem('ami_accueil3d', '0'); }catch(e){} });
  await p.goto('http://localhost:8765/index.html', { waitUntil:'load' }); await p.waitForSelector('[data-a="maths"]');
  verif('accueil : boutons maths et matières (sciences dedans)', !!(await p.$('[data-a="maths"]')) && !!(await p.$('[data-a="matieres"]')));
  await p.click('[data-a="maths"]'); await p.waitForSelector('.coin-maths');
  await p.click('[data-a="maths-niveau"][data-v="4e"]'); await p.screenshot({ path:dossier + '/maths-accueil.png', fullPage:true });
  const chaps = await p.$$eval('[data-a="maths-chap"]', l => l.length); verif('4e : chapitres jouables', chaps >= 8, chaps);
  await p.click('[data-a="maths-ton"][data-v="sanspitie"]'); await p.click('[data-a="maths-chap"][data-v="4-pythagore"]'); await p.waitForSelector('.piege-opt');
  // Trouver une mauvaise réponse : celle qui n'est pas la bonne d'après le moteur (on lit la question affichée).
  const faux = await p.evaluate(() => { const o = [...document.querySelectorAll('.piege-opt')]; const n = (document.querySelector('.piege-fr').textContent.match(/\d+/g) || []).map(Number);
    const hyp = /Hypoténuse \?/.test(document.querySelector('.piege-fr').textContent); const bon = hyp ? Math.sqrt(n[0] ** 2 + n[1] ** 2) : Math.sqrt(n[0] ** 2 - n[1] ** 2);
    const i = o.findIndex(b => parseFloat(b.textContent.replace(',', '.')) !== bon); o[i].click(); return { bon, choisi:o[i].textContent }; });
  await p.waitForSelector('#qz-retour .piege-vanne'); const r = await p.$eval('#qz-retour', e => e.textContent);
  verif('mauvaise réponse : Prof Pi vanne et explique', /🦝/.test(r) && /💡/.test(r) && r.includes(String(faux.bon)), { r, faux });
  verif('Prof Pi change de tête (mdr)', await p.$eval('#ami-qz', e => /Prof Pi/.test(e.innerHTML)));
  await p.screenshot({ path:dossier + '/maths-vanne.png', fullPage:true });
  await p.click('[data-a="maths"]'); await p.click('[data-a="maths-niveau"][data-v="1re"]'); await p.click('[data-a="maths-examen"]'); await p.waitForSelector('.piege-opt');
  verif('1re : épreuve anticipée blanche (12 questions)', /Épreuve anticipée blanche · 1re · 1\/12/.test(await p.$eval('.piege-cat', e => e.textContent)));
  await p.goto('http://localhost:8765/index.html', { waitUntil:'load' }); await p.click('[data-a="matieres"]'); await p.click('[data-a="sciences"]'); await p.click('[data-a="sciences-theme"][data-v="espace"]'); await p.waitForSelector('.piege-opt');
  await p.evaluate(() => { const q = SCIENCES.Q.find(x => x[2] === document.querySelector('.piege-fr').textContent); [...document.querySelectorAll('.piege-opt')].find(b => b.textContent !== q[3]).click(); });
  await p.waitForSelector('#qz-retour .piege-vanne'); await p.screenshot({ path:dossier + '/sciences-clash.png', fullPage:true });
  verif('sciences : clash + explication', (await p.$eval('#qz-retour', e => e.textContent)).length > 40);
  verif('aucune erreur', !err.length, err);
  console.log(`\n${ok} réussi(s), ${ko} échoué(s)`); await b.close(); process.exit(ko ? 1 : 0);
})();
