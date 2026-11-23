// Ami des mots — effets ULTRA des écrans de jeu (v5.67). Actifs seulement quand <html> a la classe gfx-ultra
// (réglage Graphismes, appareil puissant, et le système ne demande pas moins d'animations).
//  · fond animé : nébuleuses qui dérivent, étoiles qui scintillent en parallaxe, étoiles filantes ;
//  · bonne réponse : explosion d'étincelles avec gravité et onde de choc ; erreur : secousse et éclair rouge ;
//  · images et cartes qui s'inclinent sous le doigt ou la souris ; entrée en cascade des écrans.
// Tout est dessiné en local (canvas), sans bibliothèque ni téléchargement ; mis en pause quand l'onglet est caché.
(function(){
  'use strict';
  if(typeof document === 'undefined' || !window.requestAnimationFrame) return;
  const H = document.documentElement, actif = () => H.classList.contains('gfx-ultra');
  let fond = null, gF = null, eclats = null, gE = null, boucle = 0, dernier = 0, t0 = performance.now();
  const etoiles = [], nebs = [], filantes = [], parts = [], ondes = [];
  let px = 0, py = 0, cibleX = 0, cibleY = 0, W = 0, Hh = 0, flashRouge = 0;

  function creer(){
    if(fond) return;
    fond = document.createElement('canvas'); fond.id = 'fond-ultra'; fond.setAttribute('aria-hidden', 'true');
    eclats = document.createElement('canvas'); eclats.id = 'eclats-ultra'; eclats.setAttribute('aria-hidden', 'true');
    document.body.prepend(fond); document.body.appendChild(eclats);
    gF = fond.getContext('2d'); gE = eclats.getContext('2d');
    redim();
    for(let i = 0; i < 220; i++) etoiles.push({ x:Math.random(), y:Math.random(), z:.2 + Math.random() * .8, p:Math.random() * 6.28, v:.6 + Math.random() * 2 });
    const teintes = [[123, 92, 255], [43, 224, 176], [255, 122, 217], [79, 216, 255], [255, 201, 60]];
    for(let i = 0; i < 6; i++) nebs.push({ x:Math.random(), y:Math.random(), r:.35 + Math.random() * .4, c:teintes[i % teintes.length], a:Math.random() * 6.28, v:.00004 + Math.random() * .00006, o:.10 + Math.random() * .1 });
  }
  function redim(){
    if(!fond) return;
    W = innerWidth; Hh = innerHeight;
    // Le fond est flou par nature : demi-résolution, agrandie par le navigateur (bien plus léger).
    fond.width = Math.ceil(W / 2); fond.height = Math.ceil(Hh / 2);
    const d = Math.min(devicePixelRatio || 1, 2); eclats.width = W * d; eclats.height = Hh * d; gE.setTransform(d, 0, 0, d, 0, 0);
  }

  function dessinerFond(t){
    const w = fond.width, h = fond.height;
    gF.globalCompositeOperation = 'source-over';
    const bg = gF.createLinearGradient(0, 0, 0, h); bg.addColorStop(0, '#0d0730'); bg.addColorStop(.55, '#1a0f4a'); bg.addColorStop(1, '#071a33');
    gF.fillStyle = bg; gF.fillRect(0, 0, w, h);
    gF.globalCompositeOperation = 'lighter';
    for(const n of nebs){
      n.a += n.v * 16;
      const x = (n.x + Math.cos(n.a) * .12 + px * .03) * w, y = (n.y + Math.sin(n.a * 1.3) * .1 + py * .03) * h, r = n.r * Math.max(w, h);
      const g = gF.createRadialGradient(x, y, 0, x, y, r);
      g.addColorStop(0, 'rgba(' + n.c + ',' + n.o + ')'); g.addColorStop(.5, 'rgba(' + n.c + ',' + (n.o * .35) + ')'); g.addColorStop(1, 'rgba(' + n.c + ',0)');
      gF.fillStyle = g; gF.fillRect(0, 0, w, h);
    }
    for(const e of etoiles){
      const x = ((e.x + px * .02 * e.z) % 1 + 1) % 1 * w, y = ((e.y + py * .02 * e.z + t * .0000025 * e.z) % 1 + 1) % 1 * h;
      const a = .35 + .65 * Math.abs(Math.sin(t * .001 * e.v + e.p));
      gF.fillStyle = 'rgba(255,255,255,' + (a * e.z).toFixed(3) + ')';
      const s = e.z * 1.3; gF.fillRect(x, y, s, s);
      if(e.z > .85 && a > .9){ gF.fillStyle = 'rgba(200,220,255,' + ((a - .9) * 3).toFixed(3) + ')'; gF.fillRect(x - s * 2, y, s * 5, s * .5); gF.fillRect(x, y - s * 2, s * .5, s * 5); }
    }
    if(Math.random() < .006 && filantes.length < 2) filantes.push({ x:Math.random() * w, y:Math.random() * h * .5, vx:-(3 + Math.random() * 3), vy:1.5 + Math.random() * 1.5, vie:1 });
    for(let i = filantes.length - 1; i >= 0; i--){
      const f = filantes[i]; f.x += f.vx; f.y += f.vy; f.vie -= .02;
      const g = gF.createLinearGradient(f.x, f.y, f.x - f.vx * 14, f.y - f.vy * 14);
      g.addColorStop(0, 'rgba(255,255,255,' + f.vie + ')'); g.addColorStop(1, 'rgba(255,255,255,0)');
      gF.strokeStyle = g; gF.lineWidth = 1.4; gF.beginPath(); gF.moveTo(f.x, f.y); gF.lineTo(f.x - f.vx * 14, f.y - f.vy * 14); gF.stroke();
      if(f.vie <= 0) filantes.splice(i, 1);
    }
    gF.globalCompositeOperation = 'source-over';
  }

  function exploser(el, bon){
    if(!actif() || !el || !el.getBoundingClientRect) return;
    creer();
    const r = el.getBoundingClientRect(), cx = r.left + r.width / 2, cy = r.top + r.height / 2;
    if(bon){
      const couleurs = ['#FFC93C', '#2BE0B0', '#ffffff', '#FF7AD9', '#4FD8FF', '#B69CFF'];
      for(let i = 0; i < 90; i++){
        const a = Math.random() * Math.PI * 2, v = 3 + Math.random() * 9;
        parts.push({ x:cx + (Math.random() - .5) * r.width * .6, y:cy, vx:Math.cos(a) * v, vy:Math.sin(a) * v - 4, g:.22, vie:1, d:.011 + Math.random() * .012,
          c:couleurs[i % couleurs.length], t:2 + Math.random() * 4, rot:Math.random() * 6.28, vr:(Math.random() - .5) * .4, forme:i % 3 });
      }
      ondes.push({ x:cx, y:cy, r:10, vie:1, c:'43,224,176' }); ondes.push({ x:cx, y:cy, r:4, vie:1, c:'255,201,60', lent:true });
    } else {
      for(let i = 0; i < 26; i++){ const a = Math.random() * Math.PI * 2, v = 1.5 + Math.random() * 4;
        parts.push({ x:cx, y:cy, vx:Math.cos(a) * v, vy:Math.sin(a) * v, g:.12, vie:1, d:.03, c:'#FF5D7A', t:2 + Math.random() * 2, rot:0, vr:0, forme:0 }); }
      flashRouge = 1;
      const m = document.querySelector('main'); if(m){ m.classList.remove('secousse-ultra'); void m.offsetWidth; m.classList.add('secousse-ultra'); }
    }
  }

  function dessinerEclats(){
    gE.clearRect(0, 0, W, Hh);
    if(flashRouge > 0){
      const g = gE.createRadialGradient(W / 2, Hh / 2, Math.min(W, Hh) * .3, W / 2, Hh / 2, Math.max(W, Hh) * .75);
      g.addColorStop(0, 'rgba(255,40,80,0)'); g.addColorStop(1, 'rgba(255,40,80,' + (flashRouge * .35).toFixed(3) + ')');
      gE.fillStyle = g; gE.fillRect(0, 0, W, Hh); flashRouge = Math.max(0, flashRouge - .05);
    }
    gE.globalCompositeOperation = 'lighter';
    for(let i = ondes.length - 1; i >= 0; i--){
      const o = ondes[i]; o.r += o.lent ? 4 : 9; o.vie -= o.lent ? .025 : .04;
      gE.strokeStyle = 'rgba(' + o.c + ',' + Math.max(0, o.vie).toFixed(3) + ')'; gE.lineWidth = 3 + o.vie * 5;
      gE.beginPath(); gE.arc(o.x, o.y, o.r, 0, Math.PI * 2); gE.stroke();
      if(o.vie <= 0) ondes.splice(i, 1);
    }
    for(let i = parts.length - 1; i >= 0; i--){
      const p = parts[i]; p.vx *= .985; p.vy = p.vy * .985 + p.g; p.x += p.vx; p.y += p.vy; p.rot += p.vr; p.vie -= p.d;
      if(p.vie <= 0){ parts.splice(i, 1); continue; }
      gE.save(); gE.translate(p.x, p.y); gE.rotate(p.rot); gE.globalAlpha = Math.min(1, p.vie * 1.4);
      gE.shadowColor = p.c; gE.shadowBlur = 12; gE.fillStyle = p.c;
      if(p.forme === 1){ gE.fillRect(-p.t, -p.t * .4, p.t * 2, p.t * .8); }
      else if(p.forme === 2){ gE.beginPath(); for(let k = 0; k < 4; k++){ const a = k * Math.PI / 2; gE.lineTo(Math.cos(a) * p.t * 1.6, Math.sin(a) * p.t * 1.6); gE.lineTo(Math.cos(a + .785) * p.t * .45, Math.sin(a + .785) * p.t * .45); } gE.fill(); }
      else { gE.beginPath(); gE.arc(0, 0, p.t * .7, 0, Math.PI * 2); gE.fill(); }
      gE.restore();
    }
    gE.globalCompositeOperation = 'source-over';
  }

  function image(t){
    boucle = 0;
    if(!actif() || document.hidden){ return; }
    boucle = requestAnimationFrame(image);
    px += (cibleX - px) * .04; py += (cibleY - py) * .04;
    if(t - dernier > 33){ dernier = t; dessinerFond(t - t0); }   // le fond à 30 images/s suffit
    if(parts.length || ondes.length || flashRouge > 0) dessinerEclats(); else if(eclats && eclats.dataset.sale !== '0'){ gE.clearRect(0, 0, W, Hh); eclats.dataset.sale = '0'; }
    if(parts.length) eclats.dataset.sale = '1';
  }
  function demarrer(){
    if(actif()){ creer(); fond.style.display = eclats.style.display = ''; if(!boucle) boucle = requestAnimationFrame(image); }
    else if(fond){ fond.style.display = eclats.style.display = 'none'; if(boucle){ cancelAnimationFrame(boucle); boucle = 0; } }
  }

  // Les réponses : on regarde quand un élément reçoit la classe « juste » ou « faux ».
  const obs = new MutationObserver(liste => {
    if(!actif()) return;
    for(const m of liste){
      if(m.type === 'attributes' && m.attributeName === 'class'){
        const el = m.target, avant = String(m.oldValue || '');
        if(el.classList.contains('juste') && !/\bjuste\b/.test(avant)) exploser(el, true);
        else if(el.classList.contains('faux') && !/\bfaux\b/.test(avant)) exploser(el, false);
      } else if(m.type === 'childList' && m.target.tagName === 'MAIN' && m.addedNodes.length){
        m.target.classList.remove('entree-ultra'); void m.target.offsetWidth; m.target.classList.add('entree-ultra');
      }
    }
  });
  // Inclinaison 3D des images et cartes sous le pointeur.
  function incliner(e){
    cibleX = e.clientX / innerWidth - .5; cibleY = e.clientY / innerHeight - .5;
    if(!actif()) return;
    const c = e.target && e.target.closest && e.target.closest('.pic-grande, .cadre-image, .carte, .choix-img, .carte-jeu, .tuile');
    document.querySelectorAll('.incline-ultra').forEach(x => { if(x !== c){ x.classList.remove('incline-ultra'); x.style.removeProperty('--rx'); x.style.removeProperty('--ry'); } });
    if(!c) return;
    const r = c.getBoundingClientRect(), x = (e.clientX - r.left) / r.width - .5, y = (e.clientY - r.top) / r.height - .5;
    c.classList.add('incline-ultra'); c.style.setProperty('--rx', (-y * 10).toFixed(2) + 'deg'); c.style.setProperty('--ry', (x * 12).toFixed(2) + 'deg');
    c.style.setProperty('--mx', ((x + .5) * 100).toFixed(1) + '%'); c.style.setProperty('--my', ((y + .5) * 100).toFixed(1) + '%');
  }
  function lancer(){
    obs.observe(document.body, { subtree:true, attributes:true, attributeFilter:['class'], attributeOldValue:true, childList:true });
    addEventListener('pointermove', incliner, { passive:true });
    addEventListener('resize', redim);
    document.addEventListener('visibilitychange', () => { if(!document.hidden) demarrer(); });
    addEventListener('ami-graphismes', demarrer);
    demarrer();
  }
  window.ULTRA_ECRANS = { exploser, demarrer };
  if(document.readyState === 'loading') document.addEventListener('DOMContentLoaded', lancer); else lancer();
})();
