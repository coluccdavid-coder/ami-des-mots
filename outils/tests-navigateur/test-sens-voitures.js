// Aucune voiture ne roule en marche arrière : pour chaque véhicule de la circulation (village et Mots City), l'avant
// du modèle (+z, phares ou forme du véhicule, voir objetVehicule et garage.html) pointe dans le sens où il avance.
// Usage : node serveur.js . 8765 & node test-sens-voitures.js
const puppeteer = require('puppeteer-core');
let ok = 0, ko = 0; const verif = (n, c, i) => { c ? ok++ : ko++; console.log((c ? '✔ ' : '✘ ') + n + (c ? '' : ' — ' + JSON.stringify(i))); };
(async () => {
  const b = await puppeteer.launch({ executablePath:process.env.CHROME || '/usr/bin/google-chrome', headless:'new', protocolTimeout:300000, args:['--no-sandbox', '--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--no-proxy-server'] });
  for(const url of ['monde-3d.html', 'mots-city.html']){
    const p = await b.newPage(); const err = []; p.on('pageerror', e => err.push(String(e)));
    await p.goto('http://localhost:8765/' + url, { waitUntil:'load', timeout:200000 }); await p.waitForFunction(() => window.__monde || window.__city, { timeout:200000 });
    await new Promise(r => setTimeout(r, 2500));
    for(let tour = 0; tour < 3; tour++){
      const l = await p.evaluate(async () => { const M = window.__monde || window.__city, V = (M.traffic || M.voitures); const a = V.map(c => c.g.position.clone());
        await new Promise(r => setTimeout(r, 500));
        return V.map((c, i) => { const d = c.g.position.clone().sub(a[i]); d.y = 0; const L = d.length(); const z = c.g.localToWorld(c.g.position.constructor ? new (c.g.position.constructor)(0, 0, 1) : null).sub(c.g.getWorldPosition(new (c.g.position.constructor)())); z.y = 0; z.normalize();
          return { nom:c.nom || 'voiture ' + i, L:+L.toFixed(2), dot:L > .05 ? +(d.x * z.x + d.z * z.z).toFixed(3) / L : null }; }); });
      const roulent = l.filter(x => x.dot !== null), arriere = roulent.filter(x => x.dot < .5);
      verif(url + ' (relevé ' + (tour + 1) + ') : ' + roulent.length + ' véhicules en mouvement, aucun en marche arrière', roulent.length >= 2 && !arriere.length, arriere.length ? arriere : l);
      await new Promise(r => setTimeout(r, 1500));
    }
    verif(url + ' : aucune erreur', !err.length, err); await p.close();
  }
  console.log(`\n${ok} réussi(s), ${ko} échoué(s)`); await b.close(); process.exit(ko ? 1 : 0);
})();
