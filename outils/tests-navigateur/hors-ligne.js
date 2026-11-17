const puppeteer = require('puppeteer-core');
(async () => { const b = await puppeteer.launch({ executablePath:(process.env.CHROME || '/usr/bin/google-chrome'), headless:'new', args:['--no-sandbox','--use-angle=swiftshader','--enable-unsafe-swiftshader','--ignore-gpu-blocklist','--no-proxy-server'] });
 const p = await b.newPage(); const err = []; p.on('pageerror', e => err.push(String(e)));
 await p.goto('http://localhost:8765/index.html', { waitUntil:'load', timeout:90000 });
 const sw = await p.evaluate(async () => { if(!navigator.serviceWorker) return 'pas de SW'; await navigator.serviceWorker.register('sw.js'); const r = await Promise.race([navigator.serviceWorker.ready.then(() => 'prêt'), new Promise(x => setTimeout(() => x('délai'), 60000))]); return r; });
 console.log('service worker :', sw);
 await new Promise(r => setTimeout(r, 3000));
 await p.setOfflineMode(true);
 for(const [page, cle] of [['mots-city.html', '__city'], ['monde-3d.html', '__monde']]){
   await p.goto('http://localhost:8765/' + page, { waitUntil:'load', timeout:90000 }).catch(e => console.log('navigation', e.message));
   const ok = await p.waitForFunction(k => window[k], { timeout:60000 }, cle).then(() => true).catch(() => false);
   console.log('hors ligne,', page, ':', ok ? 'OK, le jeu démarre' : 'ÉCHEC');
 }
 console.log('erreurs :', err.length ? err.join(' | ') : 'aucune'); await b.close(); })();
