// Prépare le pack Quaternius « Ultimate Nature Pack » (CC0) : OBJ → un seul nature.glb.
// Chaque objet devient une scène nommée (CommonTree_1, Rock_2…), comme ville-kaykit.glb.
// Outils (hors appli) : @gltf-transform/core, functions, extensions, meshoptimizer.
// Usage : node outils/preparer-nature.mjs <dossier OBJ du pack Nature> <sortie.glb>
import { NodeIO, Document } from '@gltf-transform/core';
import { ALL_EXTENSIONS } from '@gltf-transform/extensions';
import { prune, dedup, weld, meshopt, mergeDocuments, unpartition } from '@gltf-transform/functions';
import { MeshoptEncoder } from 'meshoptimizer';
import fs from 'node:fs'; import path from 'node:path';
const [src, sortie] = process.argv.slice(2);
await MeshoptEncoder.ready;
const io = new NodeIO().registerExtensions(ALL_EXTENSIONS).registerDependencies({ 'meshopt.encoder': MeshoptEncoder });
// Végétation de climat tempéré et de bord de mer (le village et Mots City). Pas de neige ni d'arbres morts.
export const OBJETS = [
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
function objVersDoc(nom){
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
      for(let i = 1; i + 1 < pts.length; i++) for(const q of [pts[0], pts[i], pts[i + 1]]){
        g.p.push(...v[+q[0] - 1]); g.n.push(...(q[2] ? vn[+q[2] - 1] : [0, 1, 0]));
      }
    }
  }
  const d = new Document(), buf = d.createBuffer(), mesh = d.createMesh(nom);
  for(const [m, g] of groupes){
    const c = kd[m] || [.8, .8, .8];
    const materiau = d.createMaterial(m).setBaseColorFactor([...c, 1]).setRoughnessFactor(.85).setMetallicFactor(0);
    mesh.addPrimitive(d.createPrimitive().setMaterial(materiau)
      .setAttribute('POSITION', d.createAccessor().setType('VEC3').setArray(new Float32Array(g.p)).setBuffer(buf))
      .setAttribute('NORMAL', d.createAccessor().setType('VEC3').setArray(new Float32Array(g.n)).setBuffer(buf)));
  }
  d.createScene(nom).addChild(d.createNode(nom).setMesh(mesh));
  return d;
}
let base = null;
for(const nom of OBJETS){ const d = objVersDoc(nom); if(!base) base = d; else mergeDocuments(base, d); }
await base.transform(dedup(), unpartition(), prune({ keepLeaves: true }), weld(), meshopt({ encoder: MeshoptEncoder, level: 'medium' }));
await io.write(sortie, base);
console.log('nature →', sortie, (fs.statSync(sortie).size / 1024).toFixed(0) + ' Ko,', base.getRoot().listScenes().length, 'objets,', base.getRoot().listMaterials().length, 'matériaux :', base.getRoot().listMaterials().map(m => m.getName()).join(' '));
