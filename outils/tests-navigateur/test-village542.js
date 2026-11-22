// Village v5.42 : Ami says (Coach Kim), étiquettes, café et école, météo, photo.
// Usage : node serveur.js . 8765 & node test-village542.js [dossier captures]
const puppeteer = require('puppeteer-core');
const dossier = process.argv[2] || '.';
let ok = 0, ko = 0; const verif = (nom, c, info) => { c ? ok++ : ko++; console.log((c ? '✔ ' : '✘ ') + nom + (c ? '' : ' — ' + JSON.stringify(info))); };
const pause = ms => new Promise(r => setTimeout(r, ms));
(async () => {
  const b = await puppeteer.launch({ executablePath:process.env.CHROME || '/usr/bin/google-chrome', headless:'new', protocolTimeout:900000, args:['--no-sandbox', '--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--no-proxy-server'] });
  const w = await b.newPage(); await w.setViewport({ width:900, height:600 }); const err = []; w.on('pageerror', e => { err.push(String(e)); console.log('ERREUR PAGE', String(e)); });
  await w.goto('http://localhost:8765/monde-3d.html', { waitUntil:'load', timeout:300000 }); await w.waitForFunction(() => window.__monde, { timeout:300000 });
  await w.evaluate(() => { for(const n of __monde.residents()) n.pause = 1e9; });
  // Ami says : un ordre « Ami says: go to the fountain » réussi, un piège sans « Ami says » où on ne bouge pas
  const as = await w.evaluate(async () => { const M = __monde, p = M.player.position, R = M.resultatAS; M.lancerAS(); const j = M.jeuAS;
    p.set(20, 0, 20); await new Promise(r => setTimeout(r, 200));
    const avant = j.score; j.ordre = { ...M.ORDRES[1], ami:true, t0:performance.now(), dur:8000, p0:p.clone(), bouge:0 }; p.set(-1, 0, 7.5); await new Promise(r => setTimeout(r, 600));
    const o = { ami:false, dur:8000 }, f = { fige:true, ami:true, dur:4000 };
    return { s1:j.score - avant, r2:R(o, 8100, false, 0), r3:R(o, 1000, true, 2), r4:R({ ami:true, dur:8000 }, 8100, false, 0), r5:R(f, 4100, false, 0), r6:R(f, 1000, false, 1), r7:R(o, 1000, false, 0), bandeau:!document.querySelector('#amisays').hidden }; });
  verif('Ami says : ordre réussi en vrai (aller à la fontaine) = +1', as.s1 === 1, as);
  verif('règle : sans « Ami says », ne pas bouger = point ; bouger = Gotcha', as.r2 === 'point' && as.r3 === 'gotcha', as);
  verif('règle : avec « Ami says », trop lent ; « freeze » tenu = point, bougé = raté ; on attend sinon', as.r4 === 'lent' && as.r5 === 'point' && as.r6 === 'bouge' && as.r7 === null, as);
  verif('bandeau de l’ordre affiché', as.bandeau, as);
  await w.evaluate(() => { const M = __monde; M.jeuAS && (M.jeuAS.n = 99); });
  await pause(2200); await w.evaluate(() => { if(document.querySelector('#dialog').style.display === 'block') document.querySelector('#closeDialog').click(); });
  // Étiquettes
  const et = await w.evaluate(async () => { const M = __monde; M.player.position.set(-1.2, 0, 7.2); await new Promise(r => setTimeout(r, 800)); const b = document.querySelector('#etiquette'); return { vis:!b.hidden, txt:b.textContent, vus:[...M.vusE] }; });
  verif('étiquette « fountain » près de la fontaine', et.vis && /fountain · la fontaine/.test(et.txt) && et.vus.includes('fountain'), et);
  // Café : entrer, commander avec Tom, sortir
  const cafe = await w.evaluate(async () => { const M = __monde; M.passerPorte('cafe'); await new Promise(r => setTimeout(r, 600)); const d1 = M.dedans, p = M.player.position.clone();
    M.parlerServeur(); const t1 = document.querySelector('#dialogText').textContent;
    const bon = ANGLAIS.SITUATIONS.find(x => x.id === 'cafe').etapes[0].bon; [...document.querySelectorAll('#answers button')].find(b => b.textContent === bon).click(); const t2 = document.querySelector('#dialogText').textContent;
    document.querySelector('#closeDialog').click();
    // On ne sort pas des murs
    M.player.position.set(200, 0, 15); await new Promise(r => setTimeout(r, 400)); const borne = M.player.position.x;
    M.passerPorte('dehors'); await new Promise(r => setTimeout(r, 300)); return { d1, x:p.x, t1, t2, borne, apres:M.dedans, pos:M.player.position.toArray().map(v => +v.toFixed(1)) }; });
  verif('on entre dans le café', cafe.d1 === 'cafe' && cafe.x > 70, cafe);
  verif('Tom parle anglais, la bonne réponse fait avancer la scène', /What would you like/.test(cafe.t1) && /two pounds/.test(cafe.t2), cafe);
  verif('les murs du café retiennent le joueur', cafe.borne <= 85.6, cafe);
  verif('on ressort devant le café', cafe.apres === null && cafe.pos[2] > 19, cafe);
  // École : Mr Brown demande de montrer un objet
  const ecole = await w.evaluate(async () => { const M = __monde; M.passerPorte('ecole'); M.parlerMaitre(); const t = document.querySelector('#dialogText').textContent; document.querySelector('#closeDialog').click();
    const o = M.classe.l[0]; M.player.position.set(o.x, 0, o.z + .5); await new Promise(r => setTimeout(r, 800)); const i = M.classe ? M.classe.i : 'fini';
    M.player.position.set(80, 0, -12); await new Promise(r => setTimeout(r, 2500)); await new Promise(r => setTimeout(r, 300)); return { t, i, objet:o.en }; });
  verif('Mr Brown : « Show me the … » puis l’objet est validé', /Show me the/.test(ecole.t) && ecole.i === 1, ecole);
  await w.screenshot({ path:dossier + '/ecole.png' });
  await w.evaluate(() => __monde.passerPorte('dehors'));
  // Météo + photo
  const m = await w.evaluate(async () => { const M = __monde; M.appliquerMeteo('neige'); await new Promise(r => setTimeout(r, 500)); const neige = M.precip.visible;
    M.appliquerMeteo('soleil'); const soleil = !M.precip.visible; M.appliquerMeteo('pluie'); return { neige, soleil, pluie:M.precip.visible, meteo:M.meteo }; });
  verif('météo : neige, soleil, pluie', m.neige && m.soleil && m.pluie && m.meteo === 'pluie', m);
  await w.evaluate(() => { __monde.appliquerMeteo('neige'); __monde.player.position.set(0, 0, 14); }); await pause(4000); await w.screenshot({ path:dossier + '/neige.png' });
  const ph = await w.evaluate(async () => { __monde.prendrePhoto(['Best day ever!', 'Le plus beau jour !']); await new Promise(r => setTimeout(r, 1500)); const i = document.querySelector('#photo-img'); return { vis:!document.querySelector('#photo').hidden, taille:i.src.length, jpeg:i.src.startsWith('data:image/jpeg') }; });
  verif('photo prise avec légende (image locale)', ph.vis && ph.jpeg && ph.taille > 20000, ph);
  await w.screenshot({ path:dossier + '/photo.png' });
  verif('aucune erreur', !err.length, err);
  console.log(`\n${ok} réussi(s), ${ko} échoué(s)`); await b.close(); process.exit(ko ? 1 : 0);
})();
