// Vérifie que les jambes bougent vraiment pendant la marche (joueur + habitants).
const puppeteer = require('puppeteer-core');
(async () => { const b = await puppeteer.launch({ executablePath:'/usr/bin/google-chrome', headless:'new', protocolTimeout:600000, args:['--no-sandbox','--use-angle=swiftshader','--enable-unsafe-swiftshader','--ignore-gpu-blocklist','--no-proxy-server'] });
 const p = await b.newPage(); const err = []; p.on('pageerror', e => err.push(String(e)));
 await p.setViewport({ width:480, height:320 });
 await p.goto((process.argv[2] || 'http://localhost:8765') + '/monde-3d.html', { waitUntil:'load', timeout:90000 });
 await p.waitForFunction(() => window.__monde, { timeout:60000 });
 await new Promise(r => setTimeout(r, 800));
 const echant = async () => p.evaluate(() => ({ j:__monde.player.userData.legs.map(l => l.rotation.x), h:__monde.residents().map(n => n.kit ? (n.kit.userData.kit.courant ? n.kit.userData.kit.courant.getClip().name : '') : n.legs[0].rotation.x) }));
 await p.evaluate(() => { __monde.keys.arrowup = true; }); const vus = [];
 for(let k = 0; k < 6; k++){ await new Promise(r => setTimeout(r, 1200)); vus.push(await echant()); }
 const z = await p.evaluate(() => __monde.player.position.z); console.log('le joueur avance (z) :', z.toFixed(2));
 await p.evaluate(() => { __monde.keys.arrowup = false; });
 await p.screenshot({ path:'' + require("os").tmpdir() + '/12-monde-marche.png' });
 const ampJ = Math.max(...vus.map(v => Math.abs(v.j[0]))), opp = vus.every(v => Math.abs(v.j[0] + v.j[1]) < 1e-6);
 const ampH = vus.flatMap(v => v.h).some(x => typeof x === 'string') ? 'animations : ' + [...new Set(vus.flatMap(v => v.h))].join(',') : Math.max(...vus.flatMap(v => v.h.map(Math.abs))).toFixed(2) + ' rad';
 console.log('joueur : amplitude', ampJ.toFixed(2), 'rad, jambes opposées :', opp);
 console.log('habitants :', ampH);
 await new Promise(r => setTimeout(r, 6000));
 const repos = await echant(); console.log('joueur à l’arrêt :', repos.j.map(x => x.toFixed(3)).join(' '));
 console.log('erreurs :', err.join(' | ') || 'aucune'); await b.close(); })();
