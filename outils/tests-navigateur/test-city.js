// Test de Mots City dans un vrai Chrome sans écran (WebGL logiciel, donc lent).
const puppeteer = require('puppeteer-core');
const URL = process.argv[2] || 'http://localhost:8765/mots-city.html', OUT = process.env.CAPTURES ? process.env.CAPTURES + '/' : require('os').tmpdir() + '/';
const ok = [], ko = [];
const verif = (nom, cond, info) => (cond ? ok : ko).push(nom + (cond ? '' : ' — ' + (info || '')));
const attendre = ms => new Promise(r => setTimeout(r, ms));
(async () => {
  const b = await puppeteer.launch({ executablePath:process.env.CHROME || '/usr/bin/google-chrome', headless:'new', protocolTimeout:600000,
    args:['--no-sandbox', '--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--ignore-gpu-blocklist', '--no-proxy-server'] });
  const p = await b.newPage(); await p.setViewport({ width:960, height:600 });
  const erreurs = []; p.on('pageerror', e => erreurs.push(String(e))); p.on('console', m => { if(m.type() === 'error') erreurs.push(m.text()); });
  p.on('requestfailed', r => erreurs.push('requête échouée : ' + r.url()));
  await p.goto(URL, { waitUntil:'load', timeout:120000 });
  await p.waitForFunction(() => window.__city, { timeout:60000 }); await attendre(1500);
  await p.screenshot({ path:OUT + '1-titre.png' });
  verif('écran titre au départ', await p.$eval('#panneau', e => e.classList.contains('vu')));
  verif('4 tenues proposées', (await p.$$('.tenues button')).length === 4);
  await p.click('.tenues button[data-tenue="2"]'); await attendre(300);
  verif('choisir une tenue la garde', await p.evaluate(() => __city.save.tenue === 2));
  await p.click('#panneau .fermer'); await attendre(800);
  const aller = (x, z, h) => p.evaluate((x, z, h) => { const e = __city.etat; e.x = x; e.z = z; if(h != null) e.h = h; e.v = 0; }, x, z, h);
  const bulle = () => p.$eval('#bulle', e => e.textContent);
  // ── À pied ──
  verif('on commence à pied', await p.evaluate(() => !__city.conduite));
  await aller(-17, 62, Math.PI);
  await p.evaluate(() => __city.entree.haut = true);
  const jambes = [];
  for(let k = 0; k < 6; k++){ await attendre(700); jambes.push(await p.evaluate(() => { const u = __city.heros.userData; return { c:u.cuisses.map(x => x.rotation.x), t:u.tibias.map(x => x.rotation.x), b:u.bras.map(x => x.rotation.x) }; })); }
  await p.evaluate(() => __city.entree.haut = false);
  const z1 = await p.evaluate(() => __city.etat.z);
  verif('▲ fait marcher vers l’avant', z1 < 61, 'z=' + z1);
  const ampC = Math.max(...jambes.map(j => Math.abs(j.c[0]))), ampT = Math.max(...jambes.map(j => j.t[0])), ampB = Math.max(...jambes.map(j => Math.abs(j.b[0])));
  verif('héros : les cuisses bougent en marchant', ampC > .3, 'amplitude ' + ampC.toFixed(2));
  verif('héros : les genoux plient', ampT > .25, 'flexion ' + ampT.toFixed(2));
  verif('héros : les bras balancent', ampB > .2, 'amplitude ' + ampB.toFixed(2));
  verif('héros : jambes en opposition', jambes.some(j => Math.sign(j.c[0]) !== Math.sign(j.c[1]) && Math.abs(j.c[0]) > .1));
  await attendre(1500);
  const repos = await p.evaluate(() => __city.heros.userData.cuisses.map(x => Math.abs(x.rotation.x)));
  verif('héros : jambes droites à l’arrêt', repos.every(x => x < .05), repos.join(' '));
  const pas = await p.evaluate(() => __city.passants.slice(0, 6).map(q => Math.abs(q.p.userData.cuisses[0].rotation.x) + Math.abs(q.p.userData.cuisses[1].rotation.x)));
  verif('passants : les jambes bougent', Math.max(...pas) > .2, pas.map(x => x.toFixed(2)).join(' '));
  await p.screenshot({ path:OUT + '2-a-pied.png' });
  // Gauche = gauche, à pied puis en véhicule
  async function sens(touche, attendu, nom){
    await p.evaluate(() => { const e = __city.etat; e.x = -17; e.z = 40; e.h = Math.PI; e.v = 0; });
    await attendre(1500);
    await p.evaluate(() => { const c = __city.camera; window.__cam = c.clone(); window.__cam.position.copy(c.position); window.__cam.quaternion.copy(c.quaternion); window.__cam.updateMatrixWorld(); window.__x0 = __city.etat.x; window.__z0 = __city.etat.z; });
    await p.keyboard.down('ArrowUp'); await p.keyboard.down(touche); await attendre(1600); await p.keyboard.up(touche); await p.keyboard.up('ArrowUp');
    const d = await p.evaluate(() => { const V = __city.camera.position.clone(); const a = V.clone().set(__city.etat.x, 1, __city.etat.z).project(window.__cam), o = V.clone().set(window.__x0, 1, window.__z0).project(window.__cam); return a.x - o.x; });
    verif(nom + ' tourne du bon côté à l’écran', Math.sign(d) === attendu, 'décalage ' + d.toFixed(3));
  }
  await sens('ArrowLeft', -1, 'à pied : flèche gauche'); await sens('KeyD', 1, 'à pied : D');
  // Collision à pied
  const mur = await p.evaluate(() => __city.murs.find(m => m.x2 - m.x1 > 6));
  await aller((mur.x1 + mur.x2) / 2, mur.z2 + 1.5, Math.PI);
  await p.evaluate(() => __city.entree.haut = true); await attendre(2500); await p.evaluate(() => __city.entree.haut = false);
  verif('à pied : on ne traverse pas les immeubles', await p.evaluate(m => { const e = __city.etat; return !(e.x > m.x1 && e.x < m.x2 && e.z > m.z1 && e.z < m.z2); }, mur));
  // Saut
  await p.evaluate(() => __city.entree.saut = true); await attendre(250); const y = await p.evaluate(() => __city.etat.y); await p.evaluate(() => __city.entree.saut = false);
  verif('Espace fait sauter', y > .1, 'y=' + y);
  // ── Monter dans un véhicule ──
  const scoot = await p.evaluate(() => { const v = __city.vehicules.find(v => v.type === 'scooter'); return { x:v.x, z:v.z }; });
  await aller(scoot.x + 2, scoot.z); await attendre(800);
  verif('près du scooter : bouton « Monter »', await p.$eval('#monter', e => e.classList.contains('vu') && /scooter/.test(e.textContent)));
  await p.keyboard.press('KeyE'); await attendre(500);
  verif('E fait monter sur le scooter', await p.evaluate(() => __city.conduite && __city.conduite.type === 'scooter'));
  await sens('ArrowLeft', -1, 'scooter : flèche gauche'); await sens('ArrowRight', 1, 'scooter : flèche droite');
  await p.keyboard.press('KeyR'); await attendre(300);
  verif('R en véhicule : une station de radio', /Plume FM|Lagon|Talk|éteinte/.test(await p.$eval('#station', e => e.textContent)));
  await p.screenshot({ path:OUT + '3-scooter.png' });
  await p.evaluate(() => { __city.etat.v = 0; }); await p.keyboard.press('KeyE'); await attendre(500);
  verif('E fait descendre', await p.evaluate(() => !__city.conduite));
  // ── Livraison (à pied) ──
  await p.evaluate(() => __city.lancer('livraison')); await attendre(300);
  let m = await p.evaluate(() => ({ ...__city.mission }));
  await aller(m.cible[0], m.cible[1]); await attendre(700);
  verif('livraison : le client parle anglais', /please|Bring|need/i.test(await bulle()), await bulle());
  m = await p.evaluate(() => ({ ...__city.mission, etals:__city.etals.map(e => ({ x:e.x, z:e.z, e:e.e })) }));
  const faux = m.etals.find(e => e.e !== m.voulu), vrai = m.etals.find(e => e.e === m.voulu);
  await aller(faux.x, faux.z); await attendre(700);
  const vb = await bulle(), en = await p.evaluate(e => MotsCity.en(e), faux.e), enJ = await p.evaluate(e => MotsCity.en(e), m.voulu);
  verif('livraison : la vanne cite l’étal choisi et la commande', vb.includes(en) && vb.includes(enJ), vb);
  await p.screenshot({ path:OUT + '4-vanne.png' });
  await aller(0, 0); await attendre(400); await aller(vrai.x, vrai.z); await attendre(700);
  verif('livraison : le bon étal donne la commande', await p.evaluate(() => __city.mission.etape) === 'retour');
  const pl0 = await p.evaluate(() => __city.save.plumes);
  m = await p.evaluate(() => ({ ...__city.mission })); await aller(m.cible[0], m.cible[1]); await attendre(700);
  verif('livraison : réussie, plumes gagnées', await p.evaluate(p0 => !__city.mission && __city.save.plumes > p0, pl0));
  // ── Taxi : il faut un véhicule ──
  await p.evaluate(() => __city.lancer('taxi')); await attendre(300);
  m = await p.evaluate(() => ({ ...__city.mission }));
  await aller(m.cible[0], m.cible[1]); await attendre(700);
  verif('taxi à pied : le passager attend un véhicule', await p.evaluate(() => __city.mission.etape === 'client'));
  await p.evaluate(() => { const v = __city.vehicules.find(v => v.type === 'cabriolet'); __city.monter(v); });
  await aller(m.cible[0], m.cible[1]); await attendre(700);
  verif('taxi en voiture : le passager monte et parle anglais', await p.evaluate(() => __city.mission.etape === 'route') && /the /i.test(await bulle()), await bulle());
  const lieux = await p.evaluate(() => Object.entries(__city.lieux).map(([e, l]) => ({ e, x:l.x, z:l.z })));
  const mauvais = lieux.find(l => l.e !== m.voulu && l.e !== '⛵'), bon = lieux.find(l => l.e === m.voulu);
  await aller(mauvais.x + 5, mauvais.z + 5); await attendre(700);
  const tb = await bulle(), enM = await p.evaluate(e => MotsCity.en(e), mauvais.e);
  verif('taxi : la vanne cite le mauvais lieu', tb.includes(enM), tb);
  await p.screenshot({ path:OUT + '5-taxi.png' });
  await aller(bon.x + 4, bon.z + 4); await attendre(700);
  verif('taxi : bon lieu = réussite', await p.evaluate(() => !__city.mission));
  await p.evaluate(() => { __city.etat.v = 0; __city.descendre(); }); await attendre(300);
  // ── Lettres ──
  await p.evaluate(() => __city.lancer('lettres')); await attendre(300);
  const mot = await p.evaluate(() => __city.mission.mot); let L = await p.evaluate(() => __city.lettres);
  verif('lettres : toutes dans la ville', L.every(l => Math.abs(l.x) <= 92 && Math.abs(l.z) <= 92));
  const leurre = L.find(l => !mot.includes(l.c));
  await aller(leurre.x, leurre.z); await attendre(700);
  const lb = await bulle(); verif('lettres : mauvaise lettre = vanne avec la lettre', lb.includes(leurre.c) && /suivante/.test(lb), lb);
  await aller(0, 60); await attendre(300);
  for(let i = 0; i < mot.length; i++){ L = await p.evaluate(() => __city.lettres); const l = L.find(x => x.c === mot[i] && !x.pris); if(!l) break; await aller(l.x, l.z); await attendre(600); await aller(0, 60); await attendre(300); }
  verif('lettres : mot complet = réussite', await p.evaluate(() => !__city.mission), mot);
  // ── Plume dorée ──
  const d0 = await p.evaluate(() => __city.dorees().find(d => d.vu && d.z < 90));
  const n0 = await p.evaluate(() => __city.save.dorees.length);
  await aller(d0.x, d0.z); await attendre(800);
  verif('plume dorée : ramassée, un mot appris', await p.evaluate(n => __city.save.dorees.length === n + 1, n0) && /nouveau mot/.test(await bulle()), await bulle());
  // ── Nuit ──
  await p.evaluate(() => __city.regler(23)); await aller(-17, 20, Math.PI); await attendre(2500);
  verif('la nuit tombe (néons, lampadaires)', await p.evaluate(() => __city.nuit > .8), String(await p.evaluate(() => __city.nuit)));
  await p.screenshot({ path:OUT + '6-nuit.png' });
  await p.evaluate(() => __city.regler(18.3)); await aller(10, 112, 0); await attendre(2500);
  await p.screenshot({ path:OUT + '7-plage.png' });
  // ── Interface ──
  await p.keyboard.press('KeyM'); await attendre(300);
  verif('M ouvre le téléphone', await p.$eval('#panneau', e => e.classList.contains('vu')));
  await p.keyboard.press('Escape'); await attendre(200);
  verif('Échap ferme le téléphone', !(await p.$eval('#panneau', e => e.classList.contains('vu'))));
  // ── Mobile ──
  const t = await b.newPage(); await t.emulate({ viewport:{ width:390, height:844, isMobile:true, hasTouch:true, deviceScaleFactor:2 }, userAgent:'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) Mobile/15E148' });
  t.on('pageerror', e => erreurs.push('mobile: ' + e));
  await t.goto(URL, { waitUntil:'load', timeout:120000 }); await t.waitForFunction(() => window.__city); await attendre(1200);
  await t.click('#panneau .fermer'); await attendre(500);
  const zm = await t.evaluate(() => __city.etat.z);
  const btn = await t.$('[data-dir="haut"]'); const bb = await btn.boundingBox();
  await t.touchscreen.touchStart(bb.x + bb.width / 2, bb.y + bb.height / 2); await attendre(1500); await t.touchscreen.touchEnd();
  verif('tactile : ▲ fait avancer', await t.evaluate(z => __city.etat.z < z - .3, zm));
  await t.screenshot({ path:OUT + '8-mobile.png' });
  // ── Retour depuis l'accueil ──
  const r = await b.newPage(); r.on('pageerror', e => erreurs.push('retour: ' + e));
  await r.goto(URL.replace('mots-city.html', 'index.html'), { waitUntil:'load', timeout:120000 });
  await r.waitForSelector('a[href="mots-city.html"]', { timeout:20000 }).catch(() => {});
  const lien = await r.$('a[href="mots-city.html"]');
  if(lien){ await Promise.all([r.waitForNavigation({ waitUntil:'load', timeout:120000 }), lien.click()]); await r.waitForFunction(() => window.__city, { timeout:60000 }); await attendre(800);
    await r.click('#retour'); await attendre(300);
    verif('← ferme d’abord la fenêtre ouverte', await r.evaluate(() => !!window.__city && !document.querySelector('#panneau').classList.contains('vu')));
    await r.click('#retour'); await r.waitForFunction(() => !window.__city, { timeout:60000 }).catch(() => {});
    verif('← Retour ramène à l’accueil', /index\.html|\/$/.test(r.url()), r.url()); }
  else verif('lien Mots City sur l’accueil', false);
  verif('aucune erreur de console', erreurs.length === 0, erreurs.join(' | '));
  console.log('RÉUSSIS (' + ok.length + ') :\n  ' + ok.join('\n  ')); console.log('ÉCHECS :\n  ' + (ko.join('\n  ') || '(aucun)'));
  await b.close(); process.exit(ko.length ? 1 : 0);
})().catch(e => { console.error('PLANTAGE', e); process.exit(2); });
