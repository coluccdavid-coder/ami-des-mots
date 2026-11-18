# Modèles 3D

- **KayKit : City Builder Bits 1.0** et **KayKit : Adventurers Character Pack 1.0**
  par Kay Lousberg — www.kaylousberg.com — licence **CC0 1.0** (domaine public).
  Merci à Kay Lousberg ! (crédit facultatif, mais mérité)

Fichiers préparés par `outils/preparer-modeles.mjs` :
- armes et animations de combat retirées (jeu familial, sans violence) ;
- animations rangées une seule fois dans `rogue.glb` (squelette commun aux 4 personnages) ;
- tout le kit de ville regroupé dans `ville-kaykit.glb` (une seule texture).

- **Ultimate Animated Character Pack (nov. 2019)** et **Ultimate Nature Pack (juin 2019)**
  par Quaternius — quaternius.com — licence **CC0 1.0** (domaine public).
  Merci à Quaternius ! (crédit facultatif, mais mérité)

Fichiers préparés par `outils/preparer-quaternius.mjs` et `outils/preparer-nature.mjs` :
- 28 habitants choisis (métiers, figures sympathiques ; pas de soldats, zombies ni ninjas) dans `q/` ;
- animations de combat retirées (Death, Punch, RecieveHit, Shoot_OneHanded, SwordSlash, Defeat) ;
  les 11 animations gardées sont rangées une seule fois dans `q/q-casual_male.glb` ;
- 54 éléments de nature tempérée et de bord de mer (pas de neige ni d'arbres morts) dans `nature.glb` ;
- compression meshopt (décodeur MIT : `vendor/jsm/libs/meshopt_decoder.module.js`, three.js r160).
