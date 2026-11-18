// Prépare les packs Quaternius (CC0) pour Ami des mots.
// - Personnages (Ultimate Animated Character Pack) : tous partagent le même squelette.
//   Les animations ne sont gardées que dans q-casual_male.glb (le premier), et un corps sans animation par personnage.
//   Animations de combat retirées (jeu familial) : Death, Punch, RecieveHit, Shoot_OneHanded, SwordSlash, Defeat.
// - Nature (Ultimate Nature Pack) : fichiers OBJ convertis à part (voir preparer-nature), puis réunis ici.
// Compression meshopt (EXT_meshopt_compression) : décodée par vendor/jsm/libs/meshopt_decoder.module.js.
// Outils (hors appli) : @gltf-transform/core, functions, extensions, meshoptimizer.
// Usage : node outils/preparer-quaternius.mjs <dossier glTF des personnages> <sortie>
import { NodeIO } from '@gltf-transform/core';
import { prune, dedup, weld, meshopt } from '@gltf-transform/functions';
import { MeshoptEncoder } from 'meshoptimizer';
import { ALL_EXTENSIONS } from '@gltf-transform/extensions';
import fs from 'node:fs'; import path from 'node:path';
const [src, sortie] = process.argv.slice(2);
await MeshoptEncoder.ready;
const io = new NodeIO().registerExtensions(ALL_EXTENSIONS).registerDependencies({ 'meshopt.encoder': MeshoptEncoder });
export const GARDER_ANIMS = ['Idle', 'Walk', 'Run', 'Jump', 'PickUp', 'Victory', 'SitDown', 'StandUp', 'Walk_Carry', 'Run_Carry', 'Roll'];
// Distribution : métiers et figures sympathiques, utiles pour le vocabulaire anglais (chef, doctor, farmer…).
// Pas de soldats, zombies ni ninjas armés.
export const CASTING = ['Casual_Male', 'Casual_Female', 'Casual2_Male', 'Casual2_Female', 'Casual3_Male', 'Casual3_Female', 'Casual_Bald',
  'Chef_Male', 'Chef_Female', 'Doctor_Male_Old', 'Doctor_Female_Young', 'Worker_Male', 'Worker_Female', 'Suit_Male', 'Suit_Female',
  'OldClassy_Male', 'OldClassy_Female', 'Kimono_Female', 'Cowboy_Female', 'Cowboy_Male', 'Pirate_Male', 'Wizard', 'Witch', 'Elf',
  'Viking_Female', 'Knight_Golden_Male', 'Cow', 'Pug'];
fs.mkdirSync(sortie, { recursive: true });
let total = 0;
for(const [i, nom] of CASTING.entries()){
  const doc = await io.read(path.join(src, nom + '.gltf')), root = doc.getRoot();
  for(const a of root.listAnimations()){
    if(i === 0 && GARDER_ANIMS.includes(a.getName())) continue;
    for(const c of a.listChannels()) c.dispose(); for(const s of a.listSamplers()) s.dispose(); a.dispose();
  }
  await doc.transform(weld(), dedup(), prune(), meshopt({ encoder: MeshoptEncoder, level: 'medium' }));
  const out = path.join(sortie, 'q-' + nom.toLowerCase() + '.glb');
  await io.write(out, doc);
  const ko = fs.statSync(out).size / 1024; total += ko;
  console.log(nom.padEnd(20), '→', path.basename(out), ko.toFixed(0) + ' Ko', i === 0 ? root.listAnimations().map(a => a.getName()).join(',') : '');
}
console.log('Total personnages :', (total / 1024).toFixed(2), 'Mo');
