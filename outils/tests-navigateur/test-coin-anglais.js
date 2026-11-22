// Coin anglais : professeur Puzzle et portail dans le village, lien direct, écrans battle/dictée (captures).
// Usage : node serveur.js . 8765 & node test-coin-anglais.js [dossier captures]
const puppeteer = require('puppeteer-core');
const dossier = process.argv[2] || '.';
let ok = 0, ko = 0; const verif = (nom, c, info) => { c ? ok++ : ko++; console.log((c ? '✔ ' : '✘ ') + nom + (c ? '' : ' — ' + JSON.stringify(info))); };
(async () => {
  const b = await puppeteer.launch({ executablePath:process.env.CHROME || '/usr/bin/google-chrome', headless:'new', protocolTimeout:900000, args:['--no-sandbox', '--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--no-proxy-server', '--lang=fr-FR'] });
  const w = await b.newPage(); await w.setViewport({ width:900, height:640 }); const err = []; w.on('pageerror', e => { err.push(String(e)); console.log('ERREUR PAGE', String(e)); });
  await w.goto('http://localhost:8765/monde-3d.html', { waitUntil:'load', timeout:300000 }); await w.waitForFunction(() => window.__monde, { timeout:300000 });
  const v = await w.evaluate(() => { const M = __monde; const q = !!(M.prof.kit && M.prof.kit.userData.quaternius);
    M.piegeProf(); const p = PIEGES.liste.find(x => document.querySelector('#dialogText').textContent.includes(x.fr));
    const faux = M.repondreProf(p, p.faux[0].en), txtFaux = document.querySelector('#dialogText').textContent;
    const juste = M.repondreProf(p, p.bon), txt = document.querySelector('#dialogText').textContent;
    return { q, faux, juste, vanne:txtFaux.includes(p.faux[0].vanne) && txtFaux.includes(p.bon), serie:/Série : 1/.test(txt), portail:M.portails.some(x => x.dest === 'anglais') }; });
  verif('Professor Puzzle est un personnage Quaternius', v.q, v);
  verif('il tend un piège : vanne + bonne phrase', v.faux === false && v.vanne, v);
  verif('bonne réponse : série', v.juste === true && v.serie, v);
  verif('portail « Le coin anglais »', v.portail, v);
  verif('village : aucune erreur', !err.length, err); err.length = 0;
  // Lien direct depuis le portail
  // Langues : je parle français, j'apprends l'anglais (sauvegardé), puis lien direct du portail.
  await w.goto('http://localhost:8765/index.html?aller=classique', { waitUntil:'load' }); await w.waitForFunction(() => window.AmiDesMots);
  await w.evaluate(() => { const b = AmiDesMots.base; b.ui = 'fr'; b.cible = 'en'; localStorage.setItem('amidesmots:v2', JSON.stringify(b)); });
  await w.goto('http://localhost:8765/index.html?aller=anglais', { waitUntil:'load' }); await w.waitForFunction(() => window.AmiDesMots);
  const c = await w.evaluate(() => ({ cartes:document.querySelectorAll('.carte-anglais').length, ui:AmiDesMots.base.ui, cible:AmiDesMots.base.cible }));
  verif('?aller=anglais ouvre le coin anglais (12 activités)', c.cartes === 12, c);
  await w.screenshot({ path:dossier + '/coin-anglais.png' });
  await w.evaluate(() => { document.querySelector('[data-a="battle"]').click(); document.querySelector('[data-a="battle-go"][data-v="ami"]').click(); }); await new Promise(r => setTimeout(r, 300));
  await w.evaluate(() => { const t = document.querySelector('.bulle-ami .piege-fr').textContent, m = ANGLAIS.BATTLE.find(x => t.includes(x.ami)); [...document.querySelectorAll('.piege-opt')].find(x => x.textContent !== m.bon.en).click(); });
  await new Promise(r => setTimeout(r, 300)); await w.screenshot({ path:dossier + '/battle.png', fullPage:true });
  await w.evaluate(() => { document.querySelector('[data-a="battle"]').click(); document.querySelector('[data-a="anglais"]').click(); document.querySelector('[data-a="dictee"]').click(); });
  await w.evaluate(() => { document.querySelector('#dictee-texte').value = 'I can sea the see'; document.querySelector('[data-a="dictee-verifier"]').click(); });
  await new Promise(r => setTimeout(r, 300)); await w.screenshot({ path:dossier + '/dictee.png', fullPage:true });
  verif('écrans : aucune erreur', !err.length, err);
  console.log(`\n${ok} réussi(s), ${ko} échoué(s)`); await b.close(); process.exit(ko ? 1 : 0);
})();
