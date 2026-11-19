// L'accueil 3D : portails, entrée dans un jeu, retour au village, version classique.
const puppeteer = require('puppeteer-core');
const BASE = process.argv[2] || 'http://localhost:8765/';
const ok = [], ko = []; const verif = (n, c, i) => (c ? ok : ko).push(n + (c ? '' : ' — ' + (i || '')));
const att = ms => new Promise(r => setTimeout(r, ms));
(async () => { const b = await puppeteer.launch({ executablePath:'/usr/bin/google-chrome', headless:'new', protocolTimeout:600000, args:['--no-sandbox','--use-angle=swiftshader','--enable-unsafe-swiftshader','--ignore-gpu-blocklist','--no-proxy-server','--lang=fr-FR'] });
 const p = await b.newPage(); await p.setViewport({ width:1100, height:620 }); const err = []; p.on('pageerror', e => err.push(String(e)));
 await p.evaluateOnNewDocument(() => Object.defineProperty(navigator, 'language', { get:() => 'fr-FR' }));
 // Préférence « 3D » forcée (le navigateur de test est piloté, donc l'automatique reste en 2D).
 await p.goto(BASE + 'index.html', { waitUntil:'load', timeout:120000 }); await p.evaluate(() => localStorage.setItem('ami_accueil3d', '1'));
 await p.goto(BASE + 'index.html', { waitUntil:'load', timeout:120000 }); await att(1500);
 verif('l’accueil ouvre le village 3D', /monde-3d\.html/.test(p.url()), p.url());
 await p.waitForFunction(() => window.__monde, { timeout:120000 });
 const n = await p.evaluate(() => __monde.portails.length);
 verif('15 portails (8 lieux, défi, apprendre, coin anglais, phrases, revoir, carnet, Mots City)', n === 15, String(n));
 // Approcher le portail de la forêt
 await p.evaluate(() => { const f = __monde.portails.find(x => x.dest === 'lieu:animaux'); __monde.player.position.set(f.g.position.x + 1.5, 0, f.g.position.z); });
 await att(2500);
 verif('près d’un portail : « Entrer : La forêt des animaux »', /Entrer : La forêt des animaux/.test(await p.$eval('#interact', e => e.textContent)), await p.$eval('#interact', e => e.textContent));
 await p.screenshot({ path:require('os').tmpdir() + '/p-portail.png' });
 await p.keyboard.press('e'); await att(500);
 const bt = await p.$$eval('#answers button', l => l.map(x => x.textContent));
 verif('E : fenêtre « Entrer / Plus tard »', bt.includes('▶ Entrer'), bt.join(','));
 await Promise.all([p.waitForNavigation({ waitUntil:'load', timeout:120000 }), p.evaluate(() => [...document.querySelectorAll('#answers button')].find(x => x.textContent === '▶ Entrer').click())]);
 await p.waitForFunction(() => window.AmiDesMots, { timeout:60000 }); await att(800);
 verif('le lieu s’ouvre dans l’application', /index\.html$/.test(p.url()) && /animaux|Animaux|forêt/i.test(await p.evaluate(() => document.querySelector('main') ? document.querySelector('main').textContent : '')), p.url());
 await p.screenshot({ path:require('os').tmpdir() + '/p-lieu.png' });
 const acc = await p.$('.barre .bouton-rond');
 await Promise.all([p.waitForNavigation({ waitUntil:'load', timeout:120000 }), acc.click()]); await att(800);
 verif('« Accueil » ramène au village 3D', /monde-3d\.html/.test(p.url()), p.url());
 // Version classique
 await p.waitForFunction(() => window.__monde, { timeout:120000 });
 await Promise.all([p.waitForNavigation({ waitUntil:'load', timeout:120000 }), p.click('#back')]); await p.waitForFunction(() => window.AmiDesMots, { timeout:60000 }); await att(800);
 verif('« Version classique » : accueil 2D', /index\.html$/.test(p.url()) && !!(await p.$('[data-a="accueil-3d"]')), p.url());
 verif('le choix « classique » est retenu', await p.evaluate(() => localStorage.getItem('ami_accueil3d') === '0'));
 console.log('RÉUSSIS (' + ok.length + ') :\n  ' + ok.join('\n  ') + '\nÉCHECS :\n  ' + (ko.join('\n  ') || '(aucun)') + '\nerreurs : ' + (err.join(' | ') || 'aucune'));
 await b.close(); })().catch(e => { console.log('PLANTAGE', e.message); process.exit(2); });
