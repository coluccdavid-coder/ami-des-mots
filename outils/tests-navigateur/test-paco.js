const puppeteer = require('puppeteer-core');
(async () => { const b = await puppeteer.launch({ executablePath:'/usr/bin/google-chrome', headless:'new', protocolTimeout:600000, args:['--no-sandbox','--use-angle=swiftshader','--enable-unsafe-swiftshader','--no-proxy-server'] });
 const w = await b.newPage(); await w.setViewport({ width:480, height:320 }); const err = []; w.on('pageerror', e => err.push(String(e)));
 await w.goto('http://localhost:8765/monde-3d.html', { waitUntil:'load', timeout:120000 }); await w.waitForFunction(() => window.__monde, { timeout:120000 });
 await w.evaluate(() => __monde.petQuiz('dog')); await new Promise(r => setTimeout(r, 400));
 const q = await w.evaluate(() => ({ t:document.querySelector('#dialogText').textContent, n:document.querySelectorAll('#answers button').length }));
 console.log('Paco pose une question :', /en anglais/.test(q.t) && q.n === 3 ? 'OK' : 'ÉCHEC ' + JSON.stringify(q));
 console.log('erreurs :', err.join(' | ') || 'aucune'); await b.close(); })();
