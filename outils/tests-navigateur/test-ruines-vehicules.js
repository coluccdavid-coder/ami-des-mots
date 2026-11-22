// Ruines + chasse au trésor (village), portails en pierre, vie du village, qualité auto ; véhicules de Mots City.
// Usage : node serveur.js . 8765 & node test-ruines-vehicules.js [dossier captures]
const puppeteer = require('puppeteer-core');
const dossier = process.argv[2] || '.';
let ok = 0, ko = 0; const verif = (nom, c, info) => { c ? ok++ : ko++; console.log((c ? '✔ ' : '✘ ') + nom + (c ? '' : ' — ' + JSON.stringify(info))); };
const pause = ms => new Promise(r => setTimeout(r, ms));
(async () => {
  const b = await puppeteer.launch({ executablePath:process.env.CHROME || '/usr/bin/google-chrome', headless:'new', protocolTimeout:900000, args:['--no-sandbox', '--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--no-proxy-server'] });
  const w = await b.newPage(); await w.setViewport({ width:900, height:600 }); const err = []; w.on('pageerror', e => { err.push(String(e)); console.log('ERREUR PAGE', String(e)); });
  await w.goto('http://localhost:8765/monde-3d.html', { waitUntil:'load', timeout:300000 }); await w.waitForFunction(() => window.__monde, { timeout:300000 });
  await w.evaluate(() => { localStorage.removeItem('ami3d_tresor'); localStorage.removeItem('ami3d_qualite'); }); await w.reload({ waitUntil:'load' }); await w.waitForFunction(() => window.__monde, { timeout:300000 });
  const v = await w.evaluate(() => { const M = __monde; let arches = 0; M.player.parent.traverse(o => { if(o.name && /Arch_Round_RoundColumn/.test(o.name)) arches++; });
    const p1 = { x:0, z:-30.15 }; M.borner(p1); const p2 = { x:19, z:-40 }; M.borner(p2); const p3 = { x:9.6, z:-40 }; M.borner(p3);
    return { ruines:M.ruines.length, arches, oiseaux:M.oiseaux.length, p1, p2, p3 }; });
  verif('ruines construites', v.ruines >= 25, v);
  verif('portails en arche de pierre (15 + l’entrée des ruines)', v.arches >= 16, v);
  verif('limites : on entre dans les ruines au sud-est, pas ailleurs', v.p1.z === -30 && v.p1.x === 0 && v.p2.z === -40 && v.p3.x === 10 && v.p3.z === -40, v);
  verif('des oiseaux volent', v.oiseaux === 7, v);
  // Chasse au trésor : entrée, puis les 5 indices dans l'ordre
  const etapes = await w.evaluate(async () => { const M = __monde, pas = async (x, z) => { M.player.position.set(x, 0, z); await new Promise(r => setTimeout(r, 700)); };
    const dlg = () => document.querySelector('#dialog').style.display === 'block' ? document.querySelector('#dialogText').textContent : '';
    const fermer = () => { if(document.querySelector('#dialog').style.display === 'block') document.querySelector('#closeDialog').click(); };
    for(const n of M.residents()) n.pause = 1e9;
    await pas(19, -32.5); const accueil = dlg(); fermer();
    // Mauvais endroit d'abord : rien ne se valide
    await pas(25, -41.3); const avant = M.tresor.etape; fermer();
    const textes = [];
    for(const t of M.TRESOR){ await pas(t.x, t.z); textes.push(dlg()); fermer(); }
    return { accueil, avant, fin:M.tresor.etape, textes }; });
  verif('accueil des ruines en anglais + français', /lost ruins/.test(etapes.accueil) && /Bienvenue/.test(etapes.accueil), etapes.accueil);
  verif('au mauvais endroit, l’indice ne se valide pas', etapes.avant === 0, etapes);
  verif('les 5 indices s’enchaînent en anglais', /behind the fox/.test(etapes.textes[0]) && /next to the column/.test(etapes.textes[1]) && /stairs/.test(etapes.textes[2]) && /under the flag/.test(etapes.textes[3]), etapes.textes);
  verif('trésor trouvé', etapes.fin === 5 && /treasure/.test(etapes.textes[4]), etapes);
  await w.evaluate(() => { document.querySelector('#closeDialog') && document.querySelector('#closeDialog').click(); __monde.player.position.set(19, 0, -36); });
  await pause(5000); await w.screenshot({ path:dossier + '/ruines.png' });
  await w.evaluate(() => { __monde.player.position.set(0, 0, 33); }); await pause(5000); await w.screenshot({ path:dossier + '/portails-pierre.png' });
  const q = await w.evaluate(() => { __monde.alleger(); return { q:__monde.qualite, f:__monde.feuilles.visible, memo:localStorage.getItem('ami3d_qualite') }; });
  verif('qualité allégée (et mémorisée) si le téléphone peine', q.q === 'basse' && !q.f && q.memo === 'basse', q);
  await w.evaluate(() => localStorage.removeItem('ami3d_qualite'));
  verif('village : aucune erreur', !err.length, err); err.length = 0;
  // Mots City : véhicules Quaternius, bien posés et dans l'axe
  await w.goto('http://localhost:8765/mots-city.html', { waitUntil:'load', timeout:300000 }); await w.waitForFunction(() => window.__city, { timeout:300000 });
  const c = await w.evaluate(() => { const T = window.__city.voitures; const THREE_ = null;
    return T.map(v => { let min = 1e9, max = -1e9, xs = [], zs = []; v.g.updateMatrixWorld(true); v.g.traverse(o => { if(o.isMesh){ o.geometry.computeBoundingBox(); const bb = o.geometry.boundingBox.clone().applyMatrix4(o.matrixWorld); min = Math.min(min, bb.min.y); max = Math.max(max, bb.max.y); } });
      return { nom:v.nom, h:+(max - min).toFixed(2), sol:+min.toFixed(2), r:+v.r.toFixed(1) }; }); });
  verif('6 véhicules Quaternius dont bus, bus scolaire, ambulance', ['Bus', 'SchoolBus', 'Ambulance', 'Taxi'].every(n => c.some(x => x.nom === n)), c);
  verif('posés au sol, hauteurs plausibles', c.every(x => Math.abs(x.sol) < .15 && x.h > 1 && x.h < 4.5), c);
  verif('les gros véhicules ont une plus grande zone de collision', c.find(x => x.nom === 'Bus').r > c.find(x => x.nom === 'Taxi').r, c);
  await w.evaluate(() => { const T = __city.voitures.find(v => v.nom === 'Bus'); const p = T.g.position; __city.pieton && 0; window.__busPos = { x:p.x, z:p.z }; });
  await pause(1500); await w.screenshot({ path:dossier + '/city-vehicules.png' });
  verif('Mots City : aucune erreur', !err.length, err);
  console.log(`\n${ok} réussi(s), ${ko} échoué(s)`); await b.close(); process.exit(ko ? 1 : 0);
})();
