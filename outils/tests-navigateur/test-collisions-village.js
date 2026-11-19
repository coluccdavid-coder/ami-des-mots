// Village 3D : on ne traverse plus les bâtiments, la fontaine, les arbres, les habitants ni les voitures.
// Usage : node serveur.js . 8765 & node test-collisions-village.js
const puppeteer = require('puppeteer-core');
let ok = 0, ko = 0; const verif = (nom, c, info) => { c ? ok++ : ko++; console.log((c ? '✔ ' : '✘ ') + nom + (c ? '' : ' — ' + JSON.stringify(info))); };
const pause = ms => new Promise(r => setTimeout(r, ms));
(async () => {
  const b = await puppeteer.launch({ executablePath:process.env.CHROME || '/usr/bin/google-chrome', headless:'new', protocolTimeout:900000, args:['--no-sandbox', '--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--no-proxy-server'] });
  const w = await b.newPage(); await w.setViewport({ width:800, height:500 }); const err = []; w.on('pageerror', e => { err.push(String(e)); console.log('ERREUR PAGE', String(e)); });
  await w.goto('http://localhost:8765/monde-3d.html', { waitUntil:'load', timeout:300000 }); await w.waitForFunction(() => window.__monde, { timeout:120000 });
  const pos = () => w.evaluate(() => { const p = __monde.player.position; return { x:+p.x.toFixed(2), z:+p.z.toFixed(2) }; });
  verif('obstacles recensés', (await w.evaluate(() => __monde.obstacles.length)) > 25);
  for(const [nom, x, z, test] of [['le marché', -9, -17, p => Math.abs(p.x + 9) > 3.6 || Math.abs(p.z + 17) > 3.1], ['la fontaine', .3, 4.2, p => Math.hypot(p.x, p.z - 4) > 2.9], ['un arbre', -10, -20, p => Math.hypot(p.x + 10, p.z + 20) > .9]]){
    await w.evaluate((x, z) => __monde.player.position.set(x, 0, z), x, z); await pause(600);
    const p = await pos(); verif('on ressort de ' + nom, test(p), p);
  }
  // Marcher vers le café : on s'arrête contre le mur au lieu d'entrer.
  await w.evaluate(() => { __monde.player.position.set(9, 0, 23); __monde.keys.s = true; }); await pause(4000);
  await w.evaluate(() => { __monde.keys.s = false; });
  const p = await pos(); verif('bloqué contre la façade du café', p.z > 18.2, p);
  // Voiture : le joueur se met devant, elle s'arrête et ne le traverse pas.
  const r = await w.evaluate(async () => { const c = __monde.traffic[0], s = Math.sign(c.speed); const z0 = c.g.position.z;
    __monde.player.position.set(c.g.position.x, 0, z0 + s * 3.2); await new Promise(r => setTimeout(r, 1500));
    const pl = __monde.player.position; return { arret:c.arret, bouge:Math.abs(c.g.position.z - z0), dans:Math.abs(pl.x - c.g.position.x) < 1 && Math.abs(pl.z - c.g.position.z) < 1.7 }; });
  verif('la voiture s\'arrête devant le joueur', r.arret && r.bouge < .5, r);
  verif('on ne traverse pas la voiture', !r.dans, r);
  await w.evaluate(() => __monde.player.position.set(0, 0, 14)); await pause(1500);
  const repart = await w.evaluate(() => !__monde.traffic[0].arret); verif('elle repart quand la voie est libre', repart);
  verif('aucune erreur', !err.length, err);
  console.log(`\n${ok} réussi(s), ${ko} échoué(s)`); await b.close(); process.exit(ko ? 1 : 0);
})();
