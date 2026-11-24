// Village 3D : quête « Les plumes perdues de Plumo » — indices, plumes atteignables malgré les collisions, vol final.
// Usage : node serveur.js . 8765 & node test-quetes.js [dossier captures]
const puppeteer = require('puppeteer-core');
const dossier = process.argv[2] || '.';
let ok = 0, ko = 0; const verif = (nom, c, info) => { c ? ok++ : ko++; console.log((c ? '✔ ' : '✘ ') + nom + (c ? '' : ' — ' + JSON.stringify(info))); };
const pause = ms => new Promise(r => setTimeout(r, ms));
(async () => {
  const b = await puppeteer.launch({ executablePath:process.env.CHROME || '/usr/bin/google-chrome', headless:'new', protocolTimeout:900000, args:['--no-sandbox', '--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--no-proxy-server'] });
  const w = await b.newPage(); await w.setViewport({ width:900, height:600 }); const err = []; w.on('pageerror', e => { err.push(String(e)); console.log('ERREUR PAGE', String(e)); });
  await w.goto('http://localhost:8765/monde-3d.html', { waitUntil:'load', timeout:300000 }); await w.waitForFunction(() => window.__monde, { timeout:300000 });
  await w.evaluate(() => { localStorage.clear(); }); await w.reload({ waitUntil:'load' }); await w.waitForFunction(() => window.__monde, { timeout:300000 });
  verif('compteur de plumes 0/10', (await w.$eval('#feathers', e => e.textContent)).includes('0/10'));
  // Défi réussi → indice en anglais
  const d = await w.evaluate(() => { const M = __monde, n = M.habitants.find(h => h.metier.id === 'pirate'); M.repondreMetier(n, 'treasure');
    return { txt:document.querySelector('#dialogText').textContent, indices:M.etatQ.indices.slice() }; });
  verif('le pirate donne son indice en anglais + français', /between the lamp and the bench/.test(d.txt) && /entre le lampadaire/.test(d.txt) && d.indices.includes('p6'), d);
  await w.evaluate(() => document.querySelector('#closeDialog').click());
  // Carnet de quêtes
  await w.click('#journalBtn'); await pause(300);
  const j = await w.$eval('#journalList', e => e.innerText);
  verif('carnet : 4 quêtes avec leur but', /Aide tes voisins/.test(j) && /plumes perdues/.test(j) && /Hello, village/.test(j) && /Paco et Mina/.test(j) && (j.match(/But/g) || []).length >= 3, j);
  verif('carnet : l’indice reçu est listé', /between the lamp/.test(j), j);
  await w.screenshot({ path:dossier + '/quetes-carnet.png' }); await w.click('#journalClose');
  // Chaque plume est atteignable (on se place dessus ; les collisions ne doivent pas l'empêcher)
  const manquees = [];
  for(let i = 0; i < 10; i++){
    const r = await w.evaluate(async i => { const p = __monde.pickups[i]; for(const n of __monde.residents()) n.pause = 1e9;
      __monde.player.position.set(p.pl.x, 0, p.pl.z); await new Promise(r => setTimeout(r, 900));
      if(document.querySelector('#dialog').style.display === 'block') document.querySelector('#closeDialog').click();
      return { id:p.id, pris:p.taken }; }, i);
    if(!r.pris) manquees.push(r.id);
  }
  verif('les 10 plumes sont atteignables', !manquees.length, manquees);
  const fin = await w.evaluate(() => ({ voler:__monde.peutVoler, cpt:document.querySelector('#feathers').textContent, titre:document.querySelector('#dialogTitle').textContent }));
  verif('Plumo peut revoler (récompense)', fin.voler && fin.cpt.includes('10/10'), fin);
  await w.evaluate(() => document.querySelector('#closeDialog').click());
  // Vol plané : en gardant le bouton, Plumo reste en l'air bien plus longtemps
  const vol = await w.evaluate(async () => { const M = __monde; M.player.position.set(0, 0, 20); M.move.jump = true; let max = 0, t0 = performance.now(), air = 0;
    while(performance.now() - t0 < 2500){ await new Promise(r => setTimeout(r, 50)); max = Math.max(max, M.player.position.y); if(M.player.position.y > .1) air = performance.now() - t0; }
    M.move.jump = false; return { max:+max.toFixed(2), air:Math.round(air) }; });
  verif('vol plané (haut et long)', vol.max > 1 && vol.air > 1500, vol);
  // La sauvegarde garde la quête
  await w.reload({ waitUntil:'load' }); await w.waitForFunction(() => window.__monde, { timeout:300000 });
  verif('progression gardée après rechargement', (await w.$eval('#feathers', e => e.textContent)).includes('10/10'));
  verif('aucune erreur', !err.length, err);
  console.log(`\n${ok} réussi(s), ${ko} échoué(s)`); await b.close(); process.exit(ko ? 1 : 0);
})();
