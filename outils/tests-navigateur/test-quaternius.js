// Vérifie les modèles Quaternius dans le village et Mots City : chargement (meshopt), animations, tailles, défis, végétation.
// Usage : node serveur.js & node test-quaternius.js [dossier captures]
const puppeteer = require('puppeteer-core');
const dossier = process.argv[2] || '.';
let ok = 0, ko = 0; const verif = (nom, c, info) => { c ? ok++ : ko++; console.log((c ? '✔ ' : '✘ ') + nom + (c ? '' : ' — ' + JSON.stringify(info))); };
(async () => {
  const b = await puppeteer.launch({ executablePath:'/usr/bin/google-chrome', headless:'new', protocolTimeout:900000, args:['--no-sandbox', '--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--no-proxy-server'] });
  const w = await b.newPage(); await w.setViewport({ width:900, height:560 }); const err = []; w.on('pageerror', e => err.push(String(e))); w.on('console', m => { if(m.type() === 'error') err.push(m.text()); });
  await w.goto('http://localhost:8765/monde-3d.html', { waitUntil:'load', timeout:300000 }); await w.waitForFunction(() => window.__monde, { timeout:300000 });
  const v = await w.evaluate(() => {
    const M = __monde, THREE_ = null;
    const haut = g => { let min = 1e9, max = -1e9; g.updateMatrixWorld(true); g.traverse(o => { if(o.isSkinnedMesh){ o.computeBoundingBox && o.computeBoundingBox(); const bb = o.boundingBox.clone().applyMatrix4(o.matrixWorld); min = Math.min(min, bb.min.y); max = Math.max(max, bb.max.y); } }); return +(max - min).toFixed(2); };
    const res = M.residents();
    return { hab:M.HAB.length, nature:M.kit && M.kit.nature, veg:M.vegetation.length, metiers:M.habitants.length,
      quat:res.filter(n => n.kit && n.kit.userData.quaternius).length, total:res.length,
      hauteurs:res.map(n => n.kit ? haut(n.kit) : 0),
      feuillage:(() => { let h = 0; M.player.parent.traverse(o => { if(o.isMesh && o.material && o.material.name === 'Green' && !o.isSkinnedMesh){ o.geometry.computeBoundingBox(); h = Math.max(h, o.geometry.boundingBox.max.y); } }); return +h.toFixed(1); })(), actions:res[0].kit ? Object.keys(res[0].kit.userData.kit.actions).length : 0 };
  });
  verif('habitants Quaternius chargés (compression meshopt)', v.hab >= 12, v);
  verif('nature chargée et plantée', v.nature && v.veg > 150, v);
  verif('arbres fusionnés intacts (feuillage en hauteur)', v.feuillage > 3 && v.feuillage < 15, v.feuillage);
  verif('8 habitants anglophones', v.metiers === 8, v);
  verif('tous les habitants sont des modèles Quaternius animés', v.quat === v.total, v);
  verif('tailles cohérentes (1,4 à 2,7 m, chapeau compris)', v.hauteurs.every(h => h > 1.4 && h < 2.7), v.hauteurs);
  // Ils marchent vraiment : la pose change avec le temps
  const pose = () => w.evaluate(() => { const k = __monde.residents()[4].kit; let s = 0; k.traverse(o => { if(o.isBone) s += o.quaternion.x + o.quaternion.y * 2 + o.quaternion.z * 3; }); return s; });
  const p1 = await pose(); await new Promise(r => setTimeout(r, 1500)); const p2 = await pose();
  verif('les squelettes bougent (animation)', Math.abs(p1 - p2) > 1e-3, [p1, p2]);
  // Dialogue + défi d'un habitant
  const d = await w.evaluate(() => { const M = __monde, n = M.habitants.find(h => h.metier.id === 'pirate'); M.parlerMetier(n);
    const intro = document.querySelector('#dialogText').textContent;
    const faux = M.repondreMetier(n, 'hat'), txtFaux = document.querySelector('#dialogText').textContent;
    const juste = M.repondreMetier(n, 'treasure'), txtJuste = document.querySelector('#dialogText').textContent;
    return { intro, faux, txtFaux, juste, txtJuste, appris:localStorage.getItem('ami3d_metiers') }; });
  verif('présentation anglais + français', /treasure/.test(d.intro) && /trésor/.test(d.intro), d.intro);
  verif('mauvaise réponse : vanne qui cite les deux mots', d.faux === false && d.txtFaux.includes('« hat »') && d.txtFaux.includes('« treasure »'), d.txtFaux);
  verif('bonne réponse retenue', d.juste === true && /pirate/.test(d.appris), d);
  await w.evaluate(() => { document.querySelector('#closeDialog').click(); const p = __monde.player; p.position.set(16, 0, 18); });
  await new Promise(r => setTimeout(r, 2500)); await w.screenshot({ path:dossier + '/village-quaternius.png' });
  await w.evaluate(() => { const p = __monde.player; p.position.set(-6, 0, 2); });
  await new Promise(r => setTimeout(r, 2500)); await w.screenshot({ path:dossier + '/village-quaternius-2.png' });
  verif('village : aucune erreur', !err.length, err); err.length = 0;
  // Mots City
  await w.goto('http://localhost:8765/mots-city.html', { waitUntil:'load', timeout:300000 }); await w.waitForFunction(() => window.__city, { timeout:300000 });
  const c = await w.evaluate(() => ({ foule:__city.foule.length, nature:__city.nature.length, passants:__city.passants.filter(p => p.p.userData.quaternius).length, n:__city.passants.length }));
  verif('Mots City : foule variée', c.foule >= 10 && c.passants === c.n, c);
  verif('Mots City : palmiers et parcs Quaternius', c.nature > 100, c);
  await new Promise(r => setTimeout(r, 2000)); await w.screenshot({ path:dossier + '/city-quaternius.png' });
  verif('Mots City : aucune erreur', !err.length, err);
  console.log(`\n${ok} réussi(s), ${ko} échoué(s)`); await b.close(); process.exit(ko ? 1 : 0);
})();
