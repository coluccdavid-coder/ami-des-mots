// Test de Mots City dans un vrai Chrome sans écran (WebGL logiciel).
const puppeteer = require('puppeteer-core');
const URL = process.argv[2] || 'http://localhost:8765/mots-city.html', OUT = (process.env.CAPTURES || require('os').tmpdir()) + '/';
const ok = [], ko = [];
const verif = (nom, cond, info) => (cond ? ok : ko).push(nom + (cond ? '' : ' — ' + (info || '')));
(async () => {
  const b = await puppeteer.launch({ executablePath:(process.env.CHROME || '/usr/bin/google-chrome'), headless:'new', args:['--no-sandbox', '--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--ignore-gpu-blocklist', '--autoplay-policy=no-user-gesture-required', '--no-proxy-server'] });
  const p = await b.newPage(); await p.setViewport({ width:1280, height:720 });
  const erreurs = []; p.on('pageerror', e => erreurs.push(String(e))); p.on('console', m => { if(m.type() === 'error') erreurs.push(m.text()); });
  p.on('requestfailed', r => erreurs.push('requête échouée : ' + r.url()));
  await p.goto(URL, { waitUntil:'load', timeout:90000 });
  await p.waitForFunction(() => window.__city, { timeout:30000 });
  await new Promise(r => setTimeout(r, 1500));
  await p.screenshot({ path:OUT + '1-aide.png' });
  verif('aide affichée au départ', await p.$eval('#panneau', e => e.classList.contains('vu')));
  await p.click('#panneau .fermer');
  await new Promise(r => setTimeout(r, 600));
  await p.screenshot({ path:OUT + '2-depart.png' });
  // ▲ avance
  const z0 = await p.evaluate(() => __city.etat.z);
  await p.keyboard.down('ArrowUp'); await new Promise(r => setTimeout(r, 1500)); await p.keyboard.up('ArrowUp');
  const e1 = await p.evaluate(() => ({ ...__city.etat }));
  verif('▲ fait avancer (vers le nord au départ)', e1.z < z0 - .3, JSON.stringify(e1));
  await p.screenshot({ path:OUT + '3-route.png' });
  // ◀ = gauche à l'écran : on garde la caméra d'avant le virage, puis on projette la nouvelle position.
  for(const [touche, sens, nom] of [['ArrowLeft', -1, 'flèche gauche'], ['KeyQ', -1, 'Q (ZQSD)'], ['ArrowRight', 1, 'flèche droite'], ['KeyD', 1, 'D']]){
    await p.evaluate(() => { __city.etat.x = -17; __city.etat.z = 50; __city.etat.h = Math.PI; __city.etat.v = 10; window.__cam = __city.camera.clone(); window.__cam.updateMatrixWorld(); });
    await new Promise(r => setTimeout(r, 300));
    await p.evaluate(() => { __city.etat.x = -17; __city.etat.z = 50; __city.etat.h = Math.PI; __city.etat.v = 10; });
    await p.evaluate(() => { window.__cam = __city.camera.clone(); window.__cam.position.copy(__city.camera.position); window.__cam.quaternion.copy(__city.camera.quaternion); window.__cam.updateMatrixWorld(); window.__x0 = __city.etat.x; window.__z0 = __city.etat.z; });
    await p.keyboard.down('ArrowUp'); await p.keyboard.down(touche); await new Promise(r => setTimeout(r, 700)); await p.keyboard.up(touche); await p.keyboard.up('ArrowUp');
    const ndc = await p.evaluate(() => { const T = __city.camera.constructor; const v = __city.camera.position.clone().set(__city.etat.x, 1, __city.etat.z); const a = v.clone().project(window.__cam); const o = v.clone().set(window.__x0, 1, window.__z0).project(window.__cam); return a.x - o.x; });
    verif(nom + ' tourne du bon côté à l’écran', Math.sign(ndc) === sens, 'décalage écran ' + ndc.toFixed(3));
  }
  // ▼ freine puis recule
  await p.evaluate(() => { __city.etat.x = -17; __city.etat.z = 50; __city.etat.h = Math.PI; __city.etat.v = 0; });
  const zb = await p.evaluate(() => __city.etat.z);
  await p.keyboard.down('KeyS'); await new Promise(r => setTimeout(r, 900)); await p.keyboard.up('KeyS');
  verif('▼ / S fait reculer', await p.evaluate(z => __city.etat.z > z + .05, zb));
  // Collision : foncer dans un immeuble ne le traverse pas.
  const mur = await p.evaluate(() => { const m = __city.murs.find(m => m.x2 - m.x1 > 6); return m; });
  await p.evaluate(m => { __city.etat.x = (m.x1 + m.x2) / 2; __city.etat.z = m.z2 + 3; __city.etat.h = Math.PI; __city.etat.v = 15; }, mur);
  await p.keyboard.down('ArrowUp'); await new Promise(r => setTimeout(r, 1200)); await p.keyboard.up('ArrowUp');
  const dans = await p.evaluate(m => { const e = __city.etat; return e.x > m.x1 + .1 && e.x < m.x2 - .1 && e.z > m.z1 + .1 && e.z < m.z2 - .1; }, mur);
  verif('on ne traverse pas les immeubles', !dans);
  const aller = (x, z) => p.evaluate((x, z) => { __city.etat.x = x; __city.etat.z = z; __city.etat.v = 0; }, x, z);
  const attendre = ms => new Promise(r => setTimeout(r, ms));
  const bulle = () => p.$eval('#bulle', e => e.textContent);
  // ── Livraison ──
  await p.evaluate(() => __city.lancer('livraison')); await attendre(300);
  let m = await p.evaluate(() => ({ ...__city.mission }));
  await aller(m.cible[0], m.cible[1]); await attendre(400);
  verif('livraison : le client parle anglais', /please|Bring|need/i.test(await bulle()), await bulle());
  await p.screenshot({ path:OUT + '4-client.png' });
  m = await p.evaluate(() => ({ ...__city.mission, etals:__city.etals.map(e => ({ x:e.x, z:e.z, e:e.e })) }));
  verif('livraison : étape marché', m.etape === 'marche', m.etape);
  const faux = m.etals.find(e => e.e !== m.voulu), vrai = m.etals.find(e => e.e === m.voulu);
  await aller(faux.x, faux.z); await attendre(400);
  const vb = await bulle(), en = await p.evaluate(e => window.MotsCity.en(e), faux.e), enJ = await p.evaluate(e => window.MotsCity.en(e), m.voulu);
  verif('livraison : la vanne cite l’étal choisi et la commande', vb.includes(en) && vb.includes(enJ), vb);
  await p.screenshot({ path:OUT + '5-vanne.png' });
  await aller(0, 0); await attendre(200); await aller(vrai.x, vrai.z); await attendre(400);
  verif('livraison : le bon étal donne la commande', await p.evaluate(() => __city.mission.etape) === 'retour');
  const pl0 = await p.evaluate(() => __city.save.plumes);
  m = await p.evaluate(() => ({ ...__city.mission })); await aller(m.cible[0], m.cible[1]); await attendre(400);
  verif('livraison : réussie, plumes gagnées', await p.evaluate(p0 => !__city.mission && __city.save.plumes > p0, pl0));
  await p.screenshot({ path:OUT + '6-reussite.png' });
  // ── Taxi ──
  await p.evaluate(() => __city.lancer('taxi')); await attendre(300);
  m = await p.evaluate(() => ({ ...__city.mission })); await aller(m.cible[0], m.cible[1]); await attendre(400);
  verif('taxi : le passager donne la destination en anglais', /the /i.test(await bulle()), await bulle());
  const lieux = await p.evaluate(() => Object.entries(__city.lieux).map(([e, l]) => ({ e, x:l.x, z:l.z })));
  const mauvais = lieux.find(l => l.e !== m.voulu), bon = lieux.find(l => l.e === m.voulu);
  await aller(mauvais.x + 5, mauvais.z + 5); await attendre(400);
  const tb = await bulle(), enM = await p.evaluate(e => window.MotsCity.en(e), mauvais.e);
  verif('taxi : la vanne cite le mauvais lieu', tb.includes(enM), tb);
  await aller(bon.x + 5, bon.z + 5); await attendre(400);
  verif('taxi : bon lieu = réussite', await p.evaluate(() => !__city.mission));
  // ── Lettres ──
  await p.evaluate(() => __city.lancer('lettres')); await attendre(300);
  m = await p.evaluate(() => ({ mot:__city.mission.mot, l:__city.scene.children.length }));
  const lettres = await p.evaluate(() => window.__lettres = null);
  const pos = await p.evaluate(() => { const m = __city.mission; return null; });
  // On retrouve les lettres via la scène : chaque sprite a une position ; on demande au jeu son état.
  const L = await p.evaluate(() => { const out = []; __city.scene.traverse(o => {}); return out; });
  void lettres; void pos; void L;
  verif('lettres : mission lancée', !!m.mot);
  {
    const mot = m.mot; let L = await p.evaluate(() => __city.lettres);
    verif('lettres : toutes les lettres sont dans la ville', L.every(l => Math.abs(l.x) <= 92 && Math.abs(l.z) <= 92), JSON.stringify(L));
    const leurre = L.find(l => !mot.includes(l.c));
    await aller(leurre.x, leurre.z); await attendre(400);
    const lb = await bulle(); verif('lettres : une mauvaise lettre déclenche une vanne avec la lettre', lb.includes(leurre.c) && /suivante/.test(lb), lb);
    await aller(0, 60); await attendre(200);
    for(let i = 0; i < mot.length; i++){
      L = await p.evaluate(() => __city.lettres);
      const l = L.find(x => x.c === mot[i] && !x.pris); if(!l){ verif('lettres : lettre ' + mot[i] + ' trouvée', false); break; }
      await aller(l.x, l.z); await attendre(350); await aller(0, 60); await attendre(150);
    }
    verif('lettres : mot complet = réussite', await p.evaluate(() => !__city.mission), mot);
  }
  await p.screenshot({ path:OUT + '7-lettres.png' });
  // Plan et panneaux
  await p.keyboard.press('KeyM'); await attendre(300);
  verif('M ouvre le téléphone', await p.$eval('#panneau', e => e.classList.contains('vu')));
  await p.screenshot({ path:OUT + '8-telephone.png' });
  await p.keyboard.press('Escape'); await attendre(200);
  verif('Échap ferme le téléphone', !(await p.$eval('#panneau', e => e.classList.contains('vu'))));
  await p.keyboard.press('KeyR'); await attendre(300);
  verif('R : la radio parle anglais avec la traduction', /Radio Plume/.test(await bulle()));
  // Mobile
  const t = await b.newPage(); await t.emulate({ viewport:{ width:390, height:844, isMobile:true, hasTouch:true, deviceScaleFactor:2 }, userAgent:'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 Mobile/15E148' });
  t.on('pageerror', e => erreurs.push('mobile: ' + e));
  await t.goto(URL, { waitUntil:'load', timeout:90000 }); await t.waitForFunction(() => window.__city); await attendre(1200);
  await t.click('#panneau .fermer'); await attendre(400);
  const z1 = await t.evaluate(() => __city.etat.z);
  const btn = await t.$('[data-dir="haut"]'); const bb = await btn.boundingBox();
  await t.touchscreen.touchStart(bb.x + bb.width / 2, bb.y + bb.height / 2); await attendre(1000); await t.touchscreen.touchEnd();
  verif('tactile : ▲ fait avancer', await t.evaluate(z => __city.etat.z < z - 2, z1));
  await t.screenshot({ path:OUT + '9-mobile.png' });
  // Retour : depuis l'accueil, le bouton ramène à l'accueil.
  const r = await b.newPage(); r.on('pageerror', e => erreurs.push('retour: ' + e));
  await r.goto(URL.replace('mots-city.html', 'index.html'), { waitUntil:'load', timeout:90000 });
  await r.waitForSelector('a[href="mots-city.html"]', { timeout:20000 }).catch(() => {});
  const lien = await r.$('a[href="mots-city.html"]');
  if(lien){ await Promise.all([r.waitForNavigation({ waitUntil:'load', timeout:90000 }), lien.click()]); await r.waitForFunction(() => window.__city, { timeout:60000 });
    await attendre(800);
    const ouvert = await r.$eval('#panneau', e => e.classList.contains('vu'));
    if(ouvert){ await r.click('#retour'); await attendre(200); verif('← ferme d’abord la fenêtre ouverte, sans quitter', await r.evaluate(() => !!window.__city && !document.querySelector('#panneau').classList.contains('vu'))); }
    await r.click('#retour');
    await r.waitForFunction(() => !window.__city, { timeout:60000 }).catch(() => {});
    verif('← Retour ramène à l’accueil', /index\.html|\/$/.test(r.url()), r.url()); }
  else verif('le lien Mots City est sur l’accueil (sinon : écran joueur d’abord)', false, 'lien absent');
  // Monde 3D : défi de Paco
  const w = await b.newPage(); w.on('pageerror', e => erreurs.push('monde3d: ' + e));
  await w.goto(URL.replace('mots-city.html', 'monde-3d.html'), { waitUntil:'load', timeout:90000 }); await w.waitForFunction(() => window.__monde, { timeout:60000 });
  await w.evaluate(() => __monde.petQuiz('dog')); await attendre(200);
  const q = await w.evaluate(() => ({ t:document.querySelector('#dialogText').textContent, b:[...document.querySelectorAll('#answers button')].map(x => x.textContent) }));
  verif('monde 3D : Paco pose une question d’anglais à 3 choix', /en anglais/.test(q.t) && q.b.length === 3, JSON.stringify(q));
  const bonne = await w.evaluate(() => { const fr = document.querySelector('#dialogText').textContent.match(/« (.+) »/)[1]; const e = Object.keys(MOTS).find(k => MOTS[k].fr.toLowerCase() === fr); return MOTS[e].en.toLowerCase(); });
  await w.evaluate(b => [...document.querySelectorAll('#answers button')].find(x => x.textContent !== b).click(), bonne); await attendre(200);
  const vp = await w.$eval('#dialogText', e => e.textContent);
  verif('monde 3D : la vanne de Paco cite l’erreur et la bonne réponse', vp.includes('« ' + bonne + ' »'), vp);
  await w.screenshot({ path:OUT + '10-paco.png' });
  verif('aucune erreur de console', erreurs.length === 0, erreurs.join(' | '));
  console.log('RÉUSSIS :\n  ' + ok.join('\n  ')); console.log('ÉCHECS :\n  ' + (ko.join('\n  ') || '(aucun)'));
  await b.close(); process.exit(ko.length ? 1 : 0);
})().catch(e => { console.error('PLANTAGE', e); process.exit(2); });
