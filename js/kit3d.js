// Ami des mots — boîte à outils 3D partagée (Mots City, monde 3D).
// Modèles KayKit (Kay Lousberg, CC0) préparés par outils/preparer-modeles.mjs.
// Habitants et nature Quaternius (CC0) préparés par outils/preparer-quaternius.mjs et preparer-nature.mjs
// (compression meshopt, décodeur local vendor/jsm/libs/meshopt_decoder.module.js).
// Si un modèle ne charge pas (réseau, vieux navigateur), chaque jeu garde son décor dessiné par le code.
import * as THREE from 'three';
import { GLTFLoader } from '../vendor/jsm/loaders/GLTFLoader.js';
import * as SkeletonUtils from '../vendor/jsm/utils/SkeletonUtils.js';
import { mergeGeometries } from '../vendor/jsm/utils/BufferGeometryUtils.js';
import { EffectComposer } from '../vendor/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from '../vendor/jsm/postprocessing/RenderPass.js';
import { UnrealBloomPass } from '../vendor/jsm/postprocessing/UnrealBloomPass.js';
import { OutputPass } from '../vendor/jsm/postprocessing/OutputPass.js';
import { ShaderPass } from '../vendor/jsm/postprocessing/ShaderPass.js';
import { GTAOPass } from '../vendor/jsm/postprocessing/GTAOPass.js';
import { SMAAPass } from '../vendor/jsm/postprocessing/SMAAPass.js';
import { Sky } from '../vendor/jsm/objects/Sky.js';
import { MeshoptDecoder } from '../vendor/jsm/libs/meshopt_decoder.module.js';

export const PERSOS = ['rogue', 'mage', 'knight', 'barbarian'];
// Habitants Quaternius (même squelette pour tous ; animations rangées dans q-casual_male.glb).
export const HABITANTS = ['Casual_Male', 'Casual_Female', 'Casual2_Male', 'Casual2_Female', 'Casual3_Male', 'Casual3_Female', 'Casual_Bald',
  'Chef_Male', 'Chef_Female', 'Doctor_Male_Old', 'Doctor_Female_Young', 'Worker_Male', 'Worker_Female', 'Suit_Male', 'Suit_Female',
  'OldClassy_Male', 'OldClassy_Female', 'Kimono_Female', 'Cowboy_Female', 'Cowboy_Male', 'Pirate_Male', 'Wizard', 'Witch', 'Elf',
  'Viking_Female', 'Knight_Golden_Male', 'Cow', 'Pug'];
// Les noms d'animation KayKit utilisés par les jeux → l'équivalent Quaternius.
const ALIAS_Q = { Idle:'Idle', Unarmed_Idle:'Idle', Walking_A:'Walk', Walking_B:'Walk', Walking_C:'Walk', Walking_Backwards:'Walk',
  Running_A:'Run', Running_B:'Run', Jump_Full_Short:'Jump', Jump_Idle:'Jump', Jump_Start:'Jump', Jump_Land:'Jump',
  Cheer:'Victory', Interact:'PickUp', PickUp:'PickUp', Use_Item:'PickUp', Sit_Chair_Down:'SitDown', Sit_Chair_Idle:'SitDown',
  Sit_Floor_Idle:'SitDown', Sit_Chair_StandUp:'StandUp', Dodge_Left:'Roll', Dodge_Right:'Roll', Dodge_Backward:'Roll', Lie_Idle:'SitDown',
  Victory:'Victory', Walk_Carry:'Walk_Carry', Run_Carry:'Run_Carry' };
const TONS_PEAU = [0xe0ac69, 0x8d5524, 0xf1c27d, 0xc68642, 0xffdbac, 0x6b4423, 0xd29c74, 0xa86b4c];
const ECHELLE_Q = .6;   // les modèles Quaternius mesurent ~3,1 m : ramenés à la taille des personnages KayKit

// ── Chargement ────────────────────────────────────────────────────
export async function chargerKit(progres){
  const gl = new GLTFLoader().setMeshoptDecoder(MeshoptDecoder); let n = 0;
  const charge = u => gl.loadAsync(u).then(g => { if(progres) progres(++n, 8); return g; });
  try{
    const [ville, ...persos] = await Promise.all(['assets/3d/ville-kaykit.glb'].concat(PERSOS.map(p => 'assets/3d/' + p + '.glb')).map(charge));
    const objets = {}; for(const s of ville.scenes) objets[s.name] = s;
    // La palette KayKit est un petit dessin : pas de lissage, sinon les couleurs bavent.
    ville.scenes[0].traverse(o => { if(o.isMesh && o.material.map){ o.material.map.magFilter = THREE.NearestFilter; o.material.roughness = .72; o.material.metalness = 0; } });
    for(const s of ville.scenes) s.traverse(o => { if(o.isMesh){ o.material.roughness = .72; o.material.metalness = 0; } });
    const corps = {}; PERSOS.forEach((p, i) => { corps[p] = persos[i].scene; persos[i].scene.traverse(o => { if(o.isMesh){ o.castShadow = true; o.frustumCulled = false; } }); });
    const clips = {}; for(const c of persos[0].animations) clips[c.name] = c;
    let matVille = null; ville.scenes[0].traverse(o => { if(o.isMesh && !matVille) matVille = o.material; });
    // La nuit, la palette s'éclaire doucement (fenêtres, enseignes) : voir lueurVille().
    if(matVille){ matVille.emissive = new THREE.Color(0xffc98a); matVille.emissiveMap = matVille.map; matVille.emissiveIntensity = 0; }
    const KIT = { objets, corps, clips, matVille, clipsQ:null, nature:false, chargeur:gl };
    // La nature Quaternius complète le kit ; si elle manque, les jeux gardent leurs arbres dessinés.
    try{ const nat = await charge('assets/3d/nature.glb'); for(const s of nat.scenes) objets[s.name] = s; KIT.nature = true;
      // Les verts Blender d'origine paraissent ternes sous notre éclairage : un peu plus vifs et clairs.
      const vus = new Set(); for(const s of nat.scenes) s.traverse(o => { if(o.isMesh && !vus.has(o.material)){ vus.add(o.material); if(/Green|Leaves/.test(o.material.name)) o.material.color.offsetHSL(.01, .18, .07); } });
    }catch(e){}
    // Véhicules (voitures, bus, ambulance, vélo) et ruines Quaternius (CC0) : facultatifs, comme la nature.
    for(const [f, cle] of [['assets/3d/vehicules.glb', 'vehicules'], ['assets/3d/ruines.glb', 'ruines']]){
      try{ const g = await charge(f); for(const s of g.scenes) objets[s.name] = s; KIT[cle] = true; }catch(e){}
    }
    return KIT;
  }catch(e){ return null; }
}
// Charge seulement les habitants demandés (+ les animations communes). Ceux qui manquent sont ignorés.
export async function chargerHabitants(KIT, noms){
  if(!KIT) return [];
  await MeshoptDecoder.ready;
  const charge = nom => KIT.chargeur.loadAsync('assets/3d/q/q-' + nom.toLowerCase() + '.glb').then(g => {
    // Le style d'origine dessine des silhouettes noires aux yeux blancs : on leur donne des tons de peau variés
    // et des yeux sombres (plus chaleureux pour des enfants). La vache et le carlin gardent leur costume.
    const ton = TONS_PEAU[HABITANTS.indexOf(nom) % TONS_PEAU.length], costume = /^(Cow|Pug)$/.test(nom);
    g.scene.traverse(o => { if(o.isMesh){ o.castShadow = true; o.frustumCulled = false; o.material.metalness = 0; o.material.roughness = .75;
      if(!costume && o.material.name === 'Skin') o.material.color.setHex(ton);
      if(!costume && o.material.name === 'Face') o.material.color.setHex(0x2a1c14); } });
    KIT.corps['q:' + nom] = g.scene;
    if(g.animations.length && !KIT.clipsQ){ KIT.clipsQ = {}; for(const c of g.animations) KIT.clipsQ[c.name] = c; }
    return nom;
  }).catch(() => null);
  const liste = ['Casual_Male'].concat(noms.filter(n => n !== 'Casual_Male' && HABITANTS.includes(n)));
  const ok = (await Promise.all(liste.map(n => KIT.corps['q:' + n] ? n : charge(n)))).filter(Boolean);
  if(!KIT.clipsQ) return [];   // sans animations, on n'utilise pas ces personnages
  return ok.filter(n => noms.includes(n));
}

// ── Personnages animés (squelette + vraies animations) ───────────
// Retourne un Group ; userData.kit = { mixer, actions, courant }.
// nom : 'rogue'… (KayKit) ou 'q:Chef_Female'… (Quaternius, après chargerHabitants).
export function perso(KIT, nom, echelle = .78){
  const q = /^q:/.test(nom) && KIT.corps[nom] && KIT.clipsQ;
  const base = q ? KIT.corps[nom] : (KIT.corps[nom] || KIT.corps.rogue);
  const o = SkeletonUtils.clone(base); o.scale.setScalar(q ? echelle / .78 * ECHELLE_Q : echelle);
  const g = new THREE.Group(); g.add(o);
  const mixer = new THREE.AnimationMixer(o), actions = {};
  if(q){ for(const n in ALIAS_Q) if(KIT.clipsQ[ALIAS_Q[n]]) actions[n] = mixer.clipAction(KIT.clipsQ[ALIAS_Q[n]]); for(const n in KIT.clipsQ) actions[n] = mixer.clipAction(KIT.clipsQ[n]); }
  else for(const n in KIT.clips) actions[n] = mixer.clipAction(KIT.clips[n]);
  for(const n of ['Jump_Start', 'Jump_Land', 'Sit_Chair_Down', 'Sit_Chair_StandUp', 'Dodge_Left', 'Dodge_Right', 'Dodge_Backward', 'PickUp', 'Interact', 'Use_Item', 'SitDown', 'StandUp', 'Roll']) if(actions[n]){ actions[n].setLoop(THREE.LoopOnce); actions[n].clampWhenFinished = true; }
  g.userData.quaternius = !!q;
  g.userData.kit = { mixer, actions, courant:null, verrou:0 };
  jouer(g, 'Idle', 0);
  return g;
}
export function jouer(g, nom, fondu = .2, vitesse = 1){
  const k = g.userData.kit; if(!k) return;
  const a = k.actions[nom] || k.actions.Idle; a.timeScale = vitesse;
  if(k.courant === a) return;
  a.reset().play();
  if(k.courant) k.courant.crossFadeTo(a, fondu, false);
  k.courant = a;
}
// Un geste ponctuel (saut de côté, joie…) puis retour à l'animation normale.
export function geste(g, nom, duree){ const k = g.userData.kit; if(!k || !k.actions[nom]) return; jouer(g, nom, .12); k.verrou = duree || k.actions[nom].getClip().duration; }
// Choisit l'animation selon la vitesse (m/s) : repos, marche, course, saut, assis.
export function animerKit(g, vitesse, dt, mode){
  const k = g.userData.kit; if(!k) return false;
  if(k.verrou > 0){ k.verrou -= dt; k.mixer.update(dt); return true; }
  const v = Math.abs(vitesse);
  if(mode === 'assis') jouer(g, 'Sit_Chair_Idle', .25);
  else if(mode === 'air') jouer(g, 'Jump_Idle', .1);
  else if(vitesse < -.2) jouer(g, 'Walking_Backwards', .2, Math.min(1.6, v / 1.6));
  else if(v > 5.5) jouer(g, 'Running_A', .2, Math.max(.8, Math.min(1.5, v / 6.5)));
  else if(v > .3) jouer(g, 'Walking_A', .2, Math.max(.6, Math.min(1.7, v / 2.4)));
  else jouer(g, 'Idle', .3);
  k.mixer.update(dt);
  return true;
}

// ── Décor statique fusionné : un seul objet par matériau ─────────
// liste : [{ nom, x, y, z, ry, s }]. Beaucoup d'objets, très peu d'appels de dessin.
export function fusionner(KIT, liste, ombres = true){
  const parMat = new Map(), m4 = new THREE.Matrix4(), q = new THREE.Quaternion(), e = new THREE.Euler();
  for(const it of liste){
    const sc = KIT.objets[it.nom]; if(!sc) continue; sc.updateMatrixWorld(true);
    const place = new THREE.Matrix4().compose(new THREE.Vector3(it.x, it.y || 0, it.z), q.setFromEuler(e.set(0, it.ry || 0, 0)), new THREE.Vector3(it.s, it.sy || it.s, it.s));
    sc.traverse(o => {
      if(!o.isMesh) return;
      let g = o.geometry.clone();
      for(const k of Object.keys(g.attributes)) if(!['position', 'normal', 'uv'].includes(k)) g.deleteAttribute(k);
      // Modèles compressés (meshopt) : entiers 16 bits normalisés → flottants, sinon applyMatrix4 écrase la forme.
      for(const k of Object.keys(g.attributes)){ const a = g.attributes[k];
        if(a.isInterleavedBufferAttribute || a.normalized || !(a.array instanceof Float32Array)){ const n = a.itemSize, t = new Float32Array(a.count * n);
          for(let i = 0; i < a.count; i++){ t[i * n] = a.getX(i); if(n > 1) t[i * n + 1] = a.getY(i); if(n > 2) t[i * n + 2] = a.getZ(i); }
          g.setAttribute(k, new THREE.BufferAttribute(t, n)); } }
      if(g.index) g = g.toNonIndexed();
      g.applyMatrix4(m4.multiplyMatrices(place, o.matrixWorld));
      const cle = o.material.uuid; if(!parMat.has(cle)) parMat.set(cle, { mat:o.material, geos:[] }); parMat.get(cle).geos.push(g);
    });
  }
  const meshes = [];
  for(const { mat, geos } of parMat.values()){ const m = new THREE.Mesh(mergeGeometries(geos, false), mat); m.castShadow = ombres; m.receiveShadow = true; meshes.push(m); }
  return meshes;
}
// Un objet mobile (voiture…) : copie indépendante, roues repérées.
export function objet(KIT, nom, echelle){
  const o = KIT.objets[nom].clone(true); o.scale.setScalar(echelle);
  // Conserver l'axe natif des modèles KayKit : leur pivot est déjà orienté
  // dans le sens de l'avant utilisé par la circulation du monde (+Z).
  // Ne pas appliquer de demi-tour ici : le parent du véhicule gère le sens
  // selon sa vitesse (0 pour +Z, PI pour -Z).
  const roues = []; o.traverse(x => { if(x.isMesh){ x.castShadow = true; x.receiveShadow = true; } if(/wheel/i.test(x.name)) roues.push(x); });
  const g = new THREE.Group(); g.add(o); return { g, roues };
}

// Véhicule Quaternius : remis dans l'axe (avance vers +z, phares devant), posé au sol, à la longueur voulue (m).
// Avant des modèles sans phares nommés, sur leur grand axe d'origine (vérifié sur les modèles du pack).
export const AVANT_Q = { Bus:'min', SchoolBus:'min', Ambulance:'max' };
export const VEHICULES_Q = { NormalCar1:4.4, NormalCar2:4.4, SUV:4.8, Taxi:4.5, SportsCar:4.5, Cop:4.6, Bus:10, SchoolBus:9, Ambulance:6, Bicycle:1.8 };
export function objetVehicule(KIT, nom, longueur){
  const src = KIT.objets[nom]; if(!src) return null;
  const o = src.clone(true), boite = new THREE.Box3().setFromObject(o), t = boite.getSize(new THREE.Vector3());
  const pivot = new THREE.Group(); pivot.add(o);
  if(t.x > t.z) pivot.rotation.y = Math.PI / 2;   // la longueur doit suivre l'axe z
  pivot.updateMatrixWorld(true);
  // Les phares (ou la lumière bleue) indiquent l'avant.
  let avant = null; o.traverse(x => { if(x.isMesh && /Headlight|BlueLight/i.test(x.material.name)){ const b = new THREE.Box3().setFromObject(x); avant = b.getCenter(new THREE.Vector3()).z - new THREE.Box3().setFromObject(pivot).getCenter(new THREE.Vector3()).z; } });
  // Sans phares nommés (bus, car scolaire, ambulance), l'avant est connu d'après la forme du modèle :
  // côté « min » ou « max » de son grand axe d'origine (capot plus bas, pare-brise).
  if(avant === null && AVANT_Q[nom]){ const ax = t.x > t.z ? new THREE.Vector3(1, 0, 0) : new THREE.Vector3(0, 0, 1); if(AVANT_Q[nom] === 'min') ax.negate(); avant = ax.applyEuler(pivot.rotation).z; }
  if(avant !== null && avant < 0) pivot.rotation.y += Math.PI;
  pivot.updateMatrixWorld(true);
  const b2 = new THREE.Box3().setFromObject(pivot), t2 = b2.getSize(new THREE.Vector3()), c2 = b2.getCenter(new THREE.Vector3());
  const k = (longueur || VEHICULES_Q[nom] || 4.5) / Math.max(t2.z, .01);
  const g = new THREE.Group(); pivot.position.set(-c2.x, -b2.min.y, -c2.z); const echelle = new THREE.Group(); echelle.scale.setScalar(k); echelle.add(pivot); g.add(echelle);
  g.traverse(x => { if(x.isMesh){ x.castShadow = true; x.receiveShadow = true; } });
  g.userData.longueur = t2.z * k;
  return { g, roues:[] };
}

// ── Ambiance : ciel réaliste, reflets, lueur des lumières (bloom) ─
// v5.67 — Mode ULTRA : occlusion ambiante (GTAO : les coins et le dessous des objets s'assombrissent), rayons de
// soleil à travers les arbres et les bâtiments, étalonnage cinéma (contraste, couleurs chaudes, vignette, grain léger),
// anticrénelage SMAA, poussières dorées qui flottent dans la lumière. Activé par amb.niveau('ultra').
const ShaderCinema = {
  uniforms:{ tDiffuse:{ value:null }, soleilEcran:{ value:new THREE.Vector2(.5, .8) }, forceRayons:{ value:.0 }, aspect:{ value:1 },
    temps:{ value:0 }, nuit:{ value:0 }, vignette:{ value:.32 }, grain:{ value:.025 } },
  vertexShader:'varying vec2 vUv; void main(){ vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }',
  fragmentShader:`
    uniform sampler2D tDiffuse; uniform vec2 soleilEcran; uniform float forceRayons, aspect, temps, nuit, vignette, grain; varying vec2 vUv;
    float lum(vec3 c){ return dot(c, vec3(.2126, .7152, .0722)); }
    float hasard(vec2 p){ return fract(sin(dot(p, vec2(12.9898, 78.233)) + temps) * 43758.5453); }
    void main(){
      vec2 d = vUv - .5; float r = length(d * vec2(aspect, 1.));
      // Légère aberration chromatique sur les bords (comme un vrai objectif).
      vec2 ab = d * .0025 * r;
      vec3 c = vec3(texture2D(tDiffuse, vUv + ab).r, texture2D(tDiffuse, vUv).g, texture2D(tDiffuse, vUv - ab).b);
      // Rayons de soleil : on marche de chaque pixel vers le soleil ; les zones très lumineuses (ciel, halo)
      // laissent passer la lumière, les toits et les arbres la coupent.
      if(forceRayons > .001){
        vec2 pas = (vUv - soleilEcran) / 48. * .9; vec2 p = vUv; float decroit = 1., acc = 0.;
        for(int i = 0; i < 48; i++){ p -= pas; vec3 e = texture2D(tDiffuse, clamp(p, .001, .999)).rgb; acc += smoothstep(.9, 1.7, lum(e)) * decroit; decroit *= .955; }
        float bord = smoothstep(1.3, .2, length((vUv - soleilEcran) * vec2(aspect, 1.)));
        c += vec3(1., .86, .62) * acc / 48. * forceRayons * bord * 2.2;
      }
      // Étalonnage : un peu plus de contraste et de couleur, hautes lumières chaudes, ombres légèrement bleutées.
      // (v5.71) Avant : un contraste à pivot fixe en lumière linéaire mettait toutes les valeurs sombres
      // à zéro : la nuit devenait noire. Maintenant le contraste est relatif (il multiplie, il ne soustrait jamais),
      // et la nuit reçoit un léger relevé des ombres pour rester lisible.
      float l = lum(c); c = mix(vec3(l), c, 1.22 - nuit * .1);
      c = mix(c, c * vec3(1.05, 1.0, .93), smoothstep(.4, 1.2, l) * (1. - nuit));
      c = mix(c, c * vec3(.95, .99, 1.07), smoothstep(.35, 0., l));
      float k = 1. + .12 * (l - .18) / (l + .18) * (1. - nuit);
      c *= k;
      c += vec3(.010, .012, .022) * nuit * (1. - smoothstep(0., .12, l));
      c *= 1. - vignette * (1. - nuit * .5) * smoothstep(.45, 1.15, r);
      c += (hasard(vUv * 512.) - .5) * grain * (.25 + l);
      gl_FragColor = vec4(max(c, 0.), 1.);
    }`
};

export function ambiance(renderer, scene, camera, { haute = true } = {}){
  const sky = new Sky(); sky.scale.setScalar(450); scene.add(sky);
  // v5.60 — Ciel affiché : un dégradé franc (bleu profond en haut, clair à l'horizon, halo autour du soleil).
  // Le ciel physique (Sky) reste calculé pour les reflets, mais à l'écran il paraissait blanc et délavé.
  const degrade = new THREE.Mesh(new THREE.SphereGeometry(1, 48, 24), new THREE.ShaderMaterial({
    uniforms:{ haut:{ value:new THREE.Color(0x2f7fe0) }, horizon:{ value:new THREE.Color(0xbfe4ff) }, halo:{ value:new THREE.Color(0xfff0c8) }, dirSoleil:{ value:new THREE.Vector3(0, 1, 0) }, forceHalo:{ value:.55 } },
    vertexShader:'varying vec3 vDir; void main(){ vDir = normalize(position); gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }',
    fragmentShader:'uniform vec3 haut; uniform vec3 horizon; uniform vec3 halo; uniform vec3 dirSoleil; uniform float forceHalo; varying vec3 vDir;' +
      'void main(){ float h = clamp(vDir.y, -0.2, 1.0); vec3 c = mix(horizon, haut, pow(max(h, 0.0), 0.55)); if(h < 0.0) c = horizon * (1.0 + h * 1.5);' +
      ' float s = max(dot(normalize(vDir), normalize(dirSoleil)), 0.0); c += halo * (pow(s, 64.0) * 1.2 + pow(s, 6.0) * 0.25) * forceHalo; gl_FragColor = vec4(c, 1.0); }',
    side:THREE.BackSide, depthWrite:false, fog:false, toneMapped:false }));
  degrade.renderOrder = -1; degrade.frustumCulled = false; scene.add(degrade);
  degrade.onBeforeRender = () => { degrade.scale.copy(sky.scale).multiplyScalar(.98); };
  sky.material.colorWrite = false; sky.material.depthWrite = false;
  const COULEURS_CIEL = { jour:[0x2f7fe0, 0xbfe4ff], couchant:[0x4a5fb8, 0xffb27a], nuit:[0x070b24, 0x1b2550] };
  const U = sky.material.uniforms; U.turbidity.value = 3.2; U.rayleigh.value = 2.4; U.mieCoefficient.value = .004; U.mieDirectionalG.value = .86;
  const soleil = new THREE.Vector3();
  // Étoiles (visibles la nuit)
  const pts = []; for(let i = 0; i < 1400; i++){ const t = Math.random() * Math.PI * 2, p = Math.acos(Math.random() * .9); pts.push(Math.sin(p) * Math.cos(t) * 400, Math.cos(p) * 400, Math.sin(p) * Math.sin(t) * 400); }
  const etoiles = new THREE.Points(new THREE.BufferGeometry().setAttribute('position', new THREE.Float32BufferAttribute(pts, 3)), new THREE.PointsMaterial({ color:0xffffff, size:1.6, sizeAttenuation:false, transparent:true, opacity:0, fog:false, depthWrite:false }));
  scene.add(etoiles);
  const pmrem = new THREE.PMREMGenerator(renderer), envScene = new THREE.Scene(), skyEnv = new Sky(); skyEnv.scale.setScalar(450); envScene.add(skyEnv);
  Object.assign(skyEnv.material.uniforms.turbidity, { value:5 });
  let env = null, derniereElev = 999;
  let composer = null, bloom = null, ao = null, cinema = null, smaa = null, ultra = false, nuitCourante = 0, elevCourante = 50;
  const taille = () => renderer.getDrawingBufferSize(new THREE.Vector2());
  function construire(){
    if(composer) return;
    composer = new EffectComposer(renderer); composer.addPass(new RenderPass(scene, camera));
    const t = taille();
    ao = new GTAOPass(scene, camera, t.x, t.y); ao.enabled = false;
    ao.updateGtaoMaterial({ radius:.55, distanceExponent:1.6, thickness:.8, scale:1, samples:12 });
    ao.updatePdMaterial({ lumaPhi:10, depthPhi:2, normalPhi:3, radius:6, rings:2, samples:12 });
    ao.blendIntensity = 1.15; composer.addPass(ao);
    bloom = new UnrealBloomPass(new THREE.Vector2(innerWidth / 2, innerHeight / 2), .3, .45, 1.05); composer.addPass(bloom);
    cinema = new ShaderPass(ShaderCinema); cinema.enabled = false; composer.addPass(cinema);
    composer.addPass(new OutputPass());
    smaa = new SMAAPass(t.x, t.y); smaa.enabled = false; composer.addPass(smaa);
  }
  if(haute) construire();
  // Poussières dorées qui flottent autour de la caméra et brillent dans le soleil (Ultra seulement).
  const NP = 700, posP = new Float32Array(NP * 3), graineP = new Float32Array(NP);
  for(let i = 0; i < NP; i++){ posP[i * 3] = (Math.random() - .5) * 60; posP[i * 3 + 1] = Math.random() * 14; posP[i * 3 + 2] = (Math.random() - .5) * 60; graineP[i] = Math.random() * 100; }
  const geoP = new THREE.BufferGeometry(); geoP.setAttribute('position', new THREE.BufferAttribute(posP, 3)); geoP.setAttribute('graine', new THREE.BufferAttribute(graineP, 1));
  const matP = new THREE.ShaderMaterial({ transparent:true, depthWrite:false, blending:THREE.AdditiveBlending, fog:false,
    uniforms:{ temps:{ value:0 }, centre:{ value:new THREE.Vector3() }, couleur:{ value:new THREE.Color(1, .85, .55) }, force:{ value:1 }, echelleP:{ value:1 } },
    vertexShader:`attribute float graine; uniform float temps, echelleP; uniform vec3 centre; varying float vA;
      void main(){ vec3 p = position; p.x += sin(temps * .21 + graine) * 1.6; p.y += sin(temps * .13 + graine * 1.7) * .9 + mod(temps * .25 + graine, 14.); p.z += cos(temps * .17 + graine) * 1.6;
        p.y = mod(p.y, 14.); p.x = centre.x + mod(p.x - centre.x + 30., 60.) - 30.; p.z = centre.z + mod(p.z - centre.z + 30., 60.) - 30.;
        vec4 mv = modelViewMatrix * vec4(p, 1.); gl_Position = projectionMatrix * mv;
        vA = (.45 + .55 * sin(temps * 1.7 + graine * 3.)) * smoothstep(40., 6., -mv.z);
        gl_PointSize = (2.2 + fract(graine) * 2.6) * echelleP * 40. / max(1., -mv.z); }`,
    fragmentShader:`uniform vec3 couleur; uniform float force; varying float vA;
      void main(){ float d = length(gl_PointCoord - .5); if(d > .5) discard; gl_FragColor = vec4(couleur, smoothstep(.5, 0., d) * vA * force * .55); }` });
  const poussieres = new THREE.Points(geoP, matP); poussieres.frustumCulled = false; poussieres.visible = false; scene.add(poussieres);
  // Garde-fou : si l'Ultra rame (plus de 45 ms par image en moyenne), on retire d'abord l'occlusion puis les rayons.
  let mes = { n:0, t:0, avant:0 }, alleges = 0, surAllege = null;
  const horloge = new THREE.Clock();
  return {
    sky, etoiles, degrade,
    // élévation et azimut en degrés ; nuit de 0 à 1
    soleil(elev, azim, nuit){
      soleil.setFromSphericalCoords(1, THREE.MathUtils.degToRad(90 - elev), THREE.MathUtils.degToRad(azim));
      U.sunPosition.value.copy(soleil); U.rayleigh.value = 2.4 + Math.max(0, 1 - elev / 25) * 1.2;
      sky.visible = elev > -7;
      { // Dégradé du ciel selon la hauteur du soleil : jour → couchant → nuit.
        const D = degrade.material.uniforms, jour = Math.min(1, Math.max(0, (elev - 4) / 16)), nuitK = Math.min(1, Math.max(0, (-elev + 2) / 10));
        const m = (a, b, k) => new THREE.Color(a).lerp(new THREE.Color(b), k);
        D.haut.value.copy(m(COULEURS_CIEL.couchant[0], COULEURS_CIEL.jour[0], jour)).lerp(new THREE.Color(COULEURS_CIEL.nuit[0]), nuitK);
        D.horizon.value.copy(m(COULEURS_CIEL.couchant[1], COULEURS_CIEL.jour[1], jour)).lerp(new THREE.Color(COULEURS_CIEL.nuit[1]), nuitK);
        D.dirSoleil.value.copy(soleil); D.forceHalo.value = elev > -4 ? .55 + (1 - jour) * .4 : 0;
        if(scene.fog) scene.fog.color.copy(D.horizon.value);
        if(scene.background && scene.background.isColor) scene.background.copy(D.horizon.value);
      } etoiles.material.opacity = Math.max(0, nuit - .35) * 1.4;
      // Seuil > 1 : seules les vraies sources (néons, lampes, phares) brillent, pas le soleil sur les murs.
      nuitCourante = nuit; elevCourante = elev;
      if(ao) ao.blendIntensity = 1.15 - nuit * .65;
      if(bloom){ bloom.strength = (ultra ? .28 : .15) + nuit * .6; bloom.threshold = (ultra ? .95 : 1.05) - nuit * .35; bloom.radius = ultra ? .6 : .45; }
      matP.uniforms.couleur.value.set(nuit > .5 ? 0xbfe8ff : 0xffd98c);
      if((composer || ultra) && Math.abs(elev - derniereElev) > 2.5){
        derniereElev = elev; skyEnv.material.uniforms.sunPosition.value.copy(soleil); Object.assign(skyEnv.material.uniforms.rayleigh, { value:U.rayleigh.value });
        if(env) env.dispose();
        env = elev > -5 ? pmrem.fromScene(envScene, .04).texture : null;
        scene.environment = env;
        // Reflets du ciel dosés (three r160 n'a pas de réglage global) : sinon tout paraît délavé.
        const k = Math.max(.08, Math.min(.38, (elev + 5) / 70));
        scene.traverse(o => { const m = o.material; if(m) for(const x of Array.isArray(m) ? m : [m]) if('envMapIntensity' in x) x.envMapIntensity = k; });
      }
      return soleil;
    },
    rendre(){
      if(ultra){
        const t = horloge.getElapsedTime(), U2 = cinema.uniforms;
        matP.uniforms.temps.value = t; matP.uniforms.centre.value.copy(camera.position); matP.uniforms.echelleP.value = renderer.getPixelRatio();
        matP.uniforms.force.value = nuitCourante > .5 ? .7 : Math.max(.15, Math.min(1, elevCourante / 30));
        // Position du soleil à l'écran, pour les rayons (atténués s'il est derrière la caméra ou couché).
        const ps = camera.position.clone().addScaledVector(soleil, 400).project(camera);
        const devant = ps.z < 1 && elevCourante > -2, dist = Math.hypot(ps.x, ps.y);
        U2.soleilEcran.value.set(ps.x * .5 + .5, ps.y * .5 + .5); U2.aspect.value = camera.aspect || 1; U2.temps.value = t % 100; U2.nuit.value = nuitCourante;
        U2.forceRayons.value = devant && nuitCourante < .6 ? Math.max(0, 1 - Math.max(0, dist - 1) * .8) * (1 - nuitCourante) * .9 : 0;
        // Garde-fou de fluidité.
        const now = performance.now(); if(mes.avant){ mes.n++; if(mes.n > 30) mes.t += now - mes.avant; } mes.avant = now;
        if(mes.n >= 150){ const moy = mes.t / 120; mes = { n:0, t:0, avant:now };
          if(moy > 45 && alleges < 2){ alleges++; if(alleges === 1) ao.enabled = false; else { U2.forceRayons.value = 0; cinema.enabled = false; } if(surAllege) surAllege(alleges); } }
      }
      if(composer) composer.render(); else renderer.render(scene, camera);
    },
    redim(w, h){ if(composer){ composer.setSize(w, h); bloom.resolution.set(w / 2, h / 2); const t = taille(); if(ao) ao.setSize(t.x, t.y); if(smaa) smaa.setSize(t.x, t.y); } },
    // 'ultra' ou 'normal' : tout se règle à chaud, sans recharger la page.
    niveau(n){
      ultra = n === 'ultra';
      derniereElev = 999;
      if(ultra) construire();
      if(composer){ ao.enabled = ultra && alleges < 1; cinema.enabled = ultra && alleges < 2; smaa.enabled = ultra; }
      poussieres.visible = ultra;
      mes = { n:0, t:0, avant:0 };
      if(composer){ const t = taille(); composer.setSize(innerWidth, innerHeight); ao.setSize(t.x, t.y); smaa.setSize(t.x, t.y); }
      return ultra;
    },
    surAllege(f){ surAllege = f; },
    get ultra(){ return ultra; },
    get haute(){ return !!composer; }
  };
}

// Façade de tour en verre : bandes d'étages et montants (le verre reflète le ciel via scene.environment).
export function texFacadeVerre(){
  const c = document.createElement('canvas'); c.width = 64; c.height = 64; const g = c.getContext('2d');
  g.fillStyle = '#9fc4dc'; g.fillRect(0, 0, 64, 64);
  g.fillStyle = '#e8eef3'; g.fillRect(0, 54, 64, 10);             // dalle d'étage
  g.fillStyle = '#c9d6df'; g.fillRect(0, 0, 3, 64); g.fillRect(31, 0, 2, 54);   // montants
  const t = new THREE.CanvasTexture(c); t.wrapS = t.wrapT = THREE.RepeatWrapping; t.colorSpace = THREE.SRGBColorSpace; return t;
}
// ── Textures dessinées par le code (herbe, sable, bitume, vagues) ─
export function texBruit(base, ecart, taille = 128, rep = 40){
  const c = document.createElement('canvas'); c.width = c.height = taille; const g = c.getContext('2d'), col = new THREE.Color(base);
  const img = g.createImageData(taille, taille);
  for(let i = 0; i < taille * taille; i++){ const k = 1 + (Math.random() - .5) * ecart; img.data[i * 4] = Math.min(255, col.r * 255 * k); img.data[i * 4 + 1] = Math.min(255, col.g * 255 * k); img.data[i * 4 + 2] = Math.min(255, col.b * 255 * k); img.data[i * 4 + 3] = 255; }
  g.putImageData(img, 0, 0);
  const t = new THREE.CanvasTexture(c); t.wrapS = t.wrapT = THREE.RepeatWrapping; t.repeat.set(rep, rep); t.colorSpace = THREE.SRGBColorSpace; t.anisotropy = 4; return t;
}
// Carte de relief pour l'eau : petites vagues qui scintillent.
export function texVagues(taille = 256){
  const c = document.createElement('canvas'); c.width = c.height = taille; const g = c.getContext('2d'), img = g.createImageData(taille, taille);
  const h = (x, y) => Math.sin(x * .09) * Math.cos(y * .07) + Math.sin((x + y) * .05) * .6 + Math.sin(x * .23 - y * .17) * .3;
  for(let y = 0; y < taille; y++) for(let x = 0; x < taille; x++){
    const dx = h(x + 1, y) - h(x - 1, y), dy = h(x, y + 1) - h(x, y - 1), i = (y * taille + x) * 4;
    img.data[i] = 128 + dx * 60; img.data[i + 1] = 128 + dy * 60; img.data[i + 2] = 255; img.data[i + 3] = 255;
  }
  g.putImageData(img, 0, 0);
  const t = new THREE.CanvasTexture(c); t.wrapS = t.wrapT = THREE.RepeatWrapping; t.repeat.set(30, 10); return t;
}
