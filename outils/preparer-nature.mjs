// Prépare le pack Quaternius « Ultimate Nature Pack » (CC0) : OBJ → un seul nature.glb.
// Chaque objet devient une scène nommée (CommonTree_1, Rock_2…), comme ville-kaykit.glb.
// Outils (hors appli) : @gltf-transform/core, functions, extensions, meshoptimizer.
// Usage : node outils/preparer-nature.mjs <dossier OBJ[:autre dossier]> <sortie.glb> [liste.json]
//   sans liste : la sélection Nature ; avec liste : outils/listes/vehicules.json, ruines.json…
import { NodeIO, Document } from '@gltf-transform/core';
import { ALL_EXTENSIONS } from '@gltf-transform/extensions';
import { prune, dedup, weld, meshopt, mergeDocuments, unpartition } from '@gltf-transform/functions';
import { MeshoptEncoder } from 'meshoptimizer';
import fs from 'node:fs'; import path from 'node:path';
const [srcs, sortie, listeFichier] = process.argv.slice(2);
const DOSSIERS = srcs.split(':');
await MeshoptEncoder.ready;
const io = new NodeIO().registerExtensions(ALL_EXTENSIONS).registerDependencies({ 'meshopt.encoder': MeshoptEncoder });
// Végétation de climat tempéré et de bord de mer (le village et Mots City). Pas de neige ni d'arbres morts.
const NATURE = [
  ...[1, 2, 3, 4, 5].map(i => 'CommonTree_' + i), ...[1, 2, 3].map(i => 'CommonTree_Autumn_' + i),
  ...[1, 2, 3, 4, 5].map(i => 'BirchTree_' + i), ...[1, 2, 3].map(i => 'PineTree_' + i),
  ...[1, 2, 3].map(i => 'Willow_' + i), ...[1, 2, 3, 4].map(i => 'PalmTree_' + i),
  'Bush_1', 'Bush_2', 'BushBerries_1', 'BushBerries_2', 'Flowers', 'Grass', 'Grass_2', 'Grass_Short',
  ...[1, 2, 3, 4, 5].map(i => 'Plant_' + i), ...[1, 2, 3, 4, 5, 6, 7].map(i => 'Rock_' + i), 'Rock_Moss_1', 'Rock_Moss_2', 'Rock_Moss_3',
  'TreeStump', 'TreeStump_Moss', 'WoodLog', 'WoodLog_Moss', 'Lilypad', 'Corn_1', 'Corn_2', 'Wheat'];
// Lecture OBJ minimale (export Blender : v, vn, f a//n, usemtl) : facettes à plat, un primitif par matériau.
function lireMtl(fichier){
  const mats = {}; let cur = null;
  for(const l of fs.readFileSync(fichier, 'utf8').split('\n')){
    const t = l.trim().split(/\s+/);
    if(t[0] === 'newmtl') cur = mats[t[1]] = [.8, .8, .8];
    else if(t[0] === 'Kd' && cur) cur.splice(0, 3, +t[1], +t[2], +t[3]);
  }
  return mats;
}
// Le pack « Public Transport » exporte tous ses matériaux en gris (0,64) : leurs vraies couleurs sont dans leurs noms
// (voir Preview.png du pack). Couleurs sRGB ; appliquées seulement quand le MTL ne donne que ce gris.
const COULEURS = {
  Bus:{ Top:0x5b93d6, Material:0x18191c, Bottom:0x22355a, Bumper:0x3b3f46, Details:0x15171b, Lights:0xffe08a, Windows:0x8fd3e0 },
  SchoolBus:{ Yellow:0xf5cf55, Windows:0x24d6f0, Details:0x15171b, Wheel:0x18191c, Bumper:0x3b3f46, Lights:0xfff2b0 },
  Ambulance:{ White:0xf2f3f5, Material:0x18191c, Red:0xe2433c, Grey:0x6c7078, Windows:0x3f7fe8, Bumper:0x3b3f46, Lights:0xffe08a },
  Bicycle:{ Bike:0xe0353a, Handle:0x1c1c1f, Wheel:0x1c1c1f, 'Material.003':0x8a8e96 },
  TrafficLight:{ TrafficLight:0x6c7078, Red:0xff3b30, Yellow:0xffcc00, Green:0x34c759 },
  TrafficCone:{ Orange:0xff7a1a, White:0xf2f3f5 }
};
const lineaire = h => [(h >> 16) & 255, (h >> 8) & 255, h & 255].map(c => (c / 255) ** 2.2);
// Découpe d'un polygone en triangles. Un éventail suffit pour un polygone convexe ; les grands polygones creux
// (flancs de bus autour des fenêtres) demandent la méthode des « oreilles », sinon des triangles débordent sur les vitres.
function trianguler(P){
  const n = P.length; if(n === 3) return [[0, 1, 2]];
  // Normale (Newell) puis projection sur le plan le plus « à plat ».
  let nx = 0, ny = 0, nz = 0;
  for(let i = 0; i < n; i++){ const a = P[i], b = P[(i + 1) % n]; nx += (a[1] - b[1]) * (a[2] + b[2]); ny += (a[2] - b[2]) * (a[0] + b[0]); nz += (a[0] - b[0]) * (a[1] + b[1]); }
  const ax = Math.abs(nx), ay = Math.abs(ny), az = Math.abs(nz);
  const [u, w, sg] = az >= ax && az >= ay ? [0, 1, Math.sign(nz)] : ax >= ay ? [1, 2, Math.sign(nx)] : [2, 0, Math.sign(ny)];
  const Q = P.map(p => [p[u], p[w]]), aire = (a, b, c) => ((Q[b][0] - Q[a][0]) * (Q[c][1] - Q[a][1]) - (Q[b][1] - Q[a][1]) * (Q[c][0] - Q[a][0])) * (sg || 1);
  const dedans = (p, a, b, c) => { const d1 = aire(a, b, p), d2 = aire(b, c, p), d3 = aire(c, a, p); return d1 >= 0 && d2 >= 0 && d3 >= 0; };
  const reste = [...Array(n).keys()], out = []; let garde = 0;
  while(reste.length > 3 && garde++ < 5000){
    let coupe = false;
    for(let i = 0; i < reste.length; i++){
      const a = reste[(i + reste.length - 1) % reste.length], b = reste[i], c = reste[(i + 1) % reste.length];
      if(aire(a, b, c) <= 1e-12) continue;
      if(reste.some(p => p !== a && p !== b && p !== c && dedans(p, a, b, c))) continue;
      out.push([a, b, c]); reste.splice(i, 1); coupe = true; break;
    }
    if(!coupe) break;
  }
  if(reste.length === 3) out.push(reste.slice());
  else if(reste.length > 3) for(let i = 1; i + 1 < reste.length; i++) out.push([reste[0], reste[i], reste[i + 1]]); // dernier recours
  return out;
}
function objVersDoc(nom){
  const src = DOSSIERS.find(d => fs.existsSync(path.join(d, nom + '.obj')));
  if(!src) throw new Error('OBJ introuvable : ' + nom);
  const txt = fs.readFileSync(path.join(src, nom + '.obj'), 'utf8');
  const kd = lireMtl(path.join(src, nom + '.mtl'));
  const v = [], vn = [], groupes = new Map(); let mat = 'defaut';
  for(const l of txt.split('\n')){
    const t = l.trim().split(/\s+/);
    if(t[0] === 'v') v.push([+t[1], +t[2], +t[3]]);
    else if(t[0] === 'vn') vn.push([+t[1], +t[2], +t[3]]);
    else if(t[0] === 'usemtl') mat = t[1];
    else if(t[0] === 'f'){
      const pts = t.slice(1).map(x => x.split('/'));
      if(!groupes.has(mat)) groupes.set(mat, { p: [], n: [] });
      const g = groupes.get(mat);
      for(const [i, j, k] of trianguler(pts.map(q => v[+q[0] - 1]))) for(const q of [pts[i], pts[j], pts[k]]){
        g.p.push(...v[+q[0] - 1]); g.n.push(...(q[2] ? vn[+q[2] - 1] : [0, 1, 0]));
      }
    }
  }
  const d = new Document(), buf = d.createBuffer(), mesh = d.createMesh(nom);
  for(const [m, g] of groupes){
    const gris = kd[m] && kd[m].every(x => Math.abs(x - .64) < .001);
    const c = gris && COULEURS[nom] && COULEURS[nom][m] != null ? lineaire(COULEURS[nom][m]) : kd[m] || [.8, .8, .8];
    const materiau = d.createMaterial(m).setBaseColorFactor([...c, 1]).setRoughnessFactor(.85).setMetallicFactor(0);
    mesh.addPrimitive(d.createPrimitive().setMaterial(materiau)
      .setAttribute('POSITION', d.createAccessor().setType('VEC3').setArray(new Float32Array(g.p)).setBuffer(buf))
      .setAttribute('NORMAL', d.createAccessor().setType('VEC3').setArray(new Float32Array(g.n)).setBuffer(buf)));
  }
  d.createScene(nom).addChild(d.createNode(nom).setMesh(mesh));
  return d;
}
const OBJETS = listeFichier ? JSON.parse(fs.readFileSync(listeFichier, 'utf8')) : NATURE;
let base = null;
for(const nom of OBJETS){ const d = objVersDoc(nom); if(!base) base = d; else mergeDocuments(base, d); }
await base.transform(dedup(), unpartition(), prune({ keepLeaves: true }), weld(), meshopt({ encoder: MeshoptEncoder, level: 'medium' }));
await io.write(sortie, base);
console.log(path.basename(sortie) + ' →', sortie, (fs.statSync(sortie).size / 1024).toFixed(0) + ' Ko,', base.getRoot().listScenes().length, 'objets,', base.getRoot().listMaterials().length, 'matériaux :', base.getRoot().listMaterials().map(m => m.getName()).join(' '));
