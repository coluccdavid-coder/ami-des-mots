// Mots City : la flèche droite fait partir le héros vers la DROITE de l'écran (à pied et en véhicule), la gauche vers la gauche.
// Usage : node serveur.js . 8765 & node test-sens-city.js
const puppeteer = require('puppeteer-core');
let ok = 0, ko = 0; const verif = (n, c, i) => { c ? ok++ : ko++; console.log((c ? '✔ ' : '✘ ') + n + (c ? '' : ' — ' + JSON.stringify(i))); };
(async () => {
  const b = await puppeteer.launch({ executablePath:process.env.CHROME || '/usr/bin/google-chrome', headless:'new', protocolTimeout:300000, args:['--no-sandbox', '--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--no-proxy-server'] });
  const p = await b.newPage(); await p.setViewport({ width:800, height:600 }); const err = []; p.on('pageerror', e => err.push(String(e)));
  await p.goto('http://localhost:8765/mots-city.html', { waitUntil:'load', timeout:180000 }); await p.waitForFunction(() => window.__city, { timeout:180000 });
  await p.evaluate(() => { const b = document.querySelector('[data-a="jouer"], #jouer, .jouer'); if(b) b.click(); else if(__city.lancer) __city.lancer(); });
  await new Promise(r => setTimeout(r, 1500));
  // Écart horizontal à l'écran entre la position de départ et la position après 1,2 s (avancer + tourner).
  // Le cap tourne-t-il vers le côté droit de la CAMÉRA ? (vecteur « droite » de la caméra, en coordonnées du monde)
  async function essai(touche){
    return p.evaluate(async t => { const C = __city, e = C.conduite || C.pieton, cam = C.camera; await new Promise(r => setTimeout(r, 1500));
      cam.updateMatrixWorld(); const m = cam.matrixWorld.elements, rx = m[0], rz = m[2];
      const h0 = e.h; C.entree.haut = !!C.conduite; C.entree[t] = true; await new Promise(r => setTimeout(r, 600)); C.entree[t] = false; C.entree.haut = false;
      const dx = Math.sin(e.h) - Math.sin(h0), dz = Math.cos(e.h) - Math.cos(h0);
      return { versDroite:dx * rx + dz * rz, tourne:Math.abs(e.h - h0) }; }, touche);
  }
  const d = await essai('droite'), g = await essai('gauche');
  verif('à pied : droite → le héros tourne vers la droite de l’écran', d.versDroite > 0 && d.tourne > .1, d);
  verif('à pied : gauche → le héros tourne vers la gauche de l’écran', g.versDroite < 0 && g.tourne > .1, g);
  await p.evaluate(() => { __city.monter(__city.vehicules[0]); });
  const vd = await essai('droite'), vg = await essai('gauche');
  verif('en véhicule : droite → le nez part à droite de l’écran', vd.versDroite > 0 && vd.tourne > .02, vd);
  verif('en véhicule : gauche → le nez part à gauche de l’écran', vg.versDroite < 0 && vg.tourne > .02, vg);
  verif('aucune erreur', !err.length, err);
  console.log(`\n${ok} réussi(s), ${ko} échoué(s)`); await b.close(); process.exit(ko ? 1 : 0);
})();
