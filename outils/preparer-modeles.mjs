// Prépare les modèles 3D (KayKit, CC0) pour le jeu :
// - personnages : on retire les armes et toutes les animations de combat (jeu familial, sans violence),
//   puis on compresse ;
// - kit de ville : tous les objets dans un seul fichier, une seule texture.
// Usage : node outils/preparer-modeles.mjs <dossier KayKit Adventurers> <dossier KayKit City Bits> <sortie>
import { NodeIO } from '@gltf-transform/core';
import { prune, dedup, unpartition, mergeDocuments } from '@gltf-transform/functions';
import fs from 'node:fs'; import path from 'node:path';
const [persos, ville, sortie] = process.argv.slice(2);
const io = new NodeIO();
const ANIMS = ['Idle', 'Unarmed_Idle', 'Walking_A', 'Walking_B', 'Walking_C', 'Walking_Backwards', 'Running_A', 'Running_B', 'Jump_Full_Short', 'Jump_Idle', 'Jump_Start', 'Jump_Land',
  'Cheer', 'Interact', 'PickUp', 'Use_Item', 'Sit_Chair_Down', 'Sit_Chair_Idle', 'Sit_Chair_StandUp', 'Sit_Floor_Idle', 'Dodge_Left', 'Dodge_Right', 'Dodge_Backward', 'Lie_Idle'];
const ARMES = /crossbow|knife|throwable|wand|staff|spellbook|sword|axe|shield|mug|dagger|arrow|quiver|smokebomb/i;
for(const f of fs.readdirSync(persos).filter(f => f.endsWith('.glb'))){
  const doc = await io.read(path.join(persos, f)), root = doc.getRoot();
  for(const a of root.listAnimations()) if(!ANIMS.includes(a.getName())){ for(const c of a.listChannels()) c.dispose(); for(const s of a.listSamplers()) s.dispose(); a.dispose(); }
  for(const n of root.listNodes()) if(ARMES.test(n.getName()) && n.getMesh()){ const m = n.getMesh(); n.setMesh(null); m.dispose(); }
  await doc.transform(prune(), dedup());
  const out = path.join(sortie, f.replace('.glb', '').toLowerCase() + '.glb');
  await io.write(out, doc);
  console.log(f, '→', out, (fs.statSync(out).size / 1024).toFixed(0) + ' Ko,', root.listAnimations().map(a => a.getName()).length, 'animations');
}
// Kit de ville : un seul document, chaque objet = une scène nommée
const base = await io.read(path.join(ville, 'base.gltf'));
const garder = fs.readdirSync(ville).filter(f => f.endsWith('.gltf') && !/withoutBase|^base\.gltf$|road_/.test(f));
for(const f of garder){
  const d = await io.read(path.join(ville, f));
  for(const s of d.getRoot().listScenes()) s.setName(f.replace('.gltf', ''));
  mergeDocuments(base, d);
}
await base.transform(dedup(), unpartition(), prune({ keepLeaves:true }));
const outV = path.join(sortie, 'ville-kaykit.glb'); await io.write(outV, base);
console.log('ville →', outV, (fs.statSync(outV).size / 1024).toFixed(0) + ' Ko,', base.getRoot().listScenes().map(s => s.getName()).join(' '));
