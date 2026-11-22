// Régressions : droite = droite écran et véhicules orientés dans leur sens réel.
// Usage : node serveur.js . 8765 & node outils/tests-navigateur/test-sens-univers.js
const puppeteer = require('puppeteer-core');
(async () => {
  const b = await puppeteer.launch({ executablePath:process.env.CHROME || '/usr/bin/google-chrome', headless:'new',
    args:['--no-sandbox','--use-angle=swiftshader','--enable-unsafe-swiftshader','--no-proxy-server'] });
  try {
    const p = await b.newPage(); await p.setViewport({width:1200,height:800});
    await p.goto('http://localhost:8765/monde-3d.html',{waitUntil:'load',timeout:120000});
    await p.waitForFunction(()=>window.__monde,{timeout:120000});
    const droite = await p.evaluate(async () => {
      const M=__monde, start=M.player.position.clone();
      M.player.position.set(0,0,0); await new Promise(r=>setTimeout(r,500));
      M.camera.updateMatrixWorld(true);
      const e=M.camera.matrixWorld.elements, rx=e[0], rz=e[2];
      const before={x:M.player.position.x,z:M.player.position.z}; M.keys.arrowright=true;
      await new Promise(r=>setTimeout(r,500)); M.keys.arrowright=false;
      const dx=M.player.position.x-before.x, dz=M.player.position.z-before.z;
      return {dot:dx*rx+dz*rz,dx,dz};
    });
    if(!(droite.dot>0.1)) throw new Error('Flèche droite incorrecte : '+JSON.stringify(droite));
    const autos=await p.evaluate(async()=>{
      const M=__monde; M.player.position.set(25,0,30);
      const out=M.traffic.map(c=>{
        c.g.updateMatrixWorld(true); const e=c.g.matrixWorld.elements;
        return {speed:c.speed,avantZ:e[10],roues:c.wheels.map(w=>w.rotation.x)};
      });
      await new Promise(r=>setTimeout(r,600));
      return out.map((c,i)=>({speed:c.speed,avantZ:c.avantZ,delta:M.traffic[i].wheels[0].rotation.x-c.roues[0]}));
    });
    for(const c of autos){
      if(Math.sign(c.avantZ)!==Math.sign(c.speed)) throw new Error('Voiture orientée à contre-sens : '+JSON.stringify(c));
      if(Math.sign(c.delta)!==Math.sign(c.speed)) throw new Error('Roues tournant à contre-sens : '+JSON.stringify(c));
    }
    console.log('✔ Flèche droite, orientation et rotation des roues : OK');
  } finally { await b.close(); }
})().catch(e=>{console.error(e);process.exit(1)});
