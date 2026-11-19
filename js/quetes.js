// Ami des mots — quêtes du village 3D.
// « Les plumes perdues d'Ami » : le vent a emporté 10 plumes ; sans elles, Ami ne peut plus voler.
// Chaque habitant anglophone (et Paco, Mina) donne un indice EN ANGLAIS quand on réussit son défi.
// Les indices font pratiquer les mots de lieu : behind, under, next to, in front of, on, between…
// Positions choisies hors des obstacles (bâtiments, fontaine, arbres) et dans la zone de jeu.
(function(){
  const PLUMES = [
    { id:'p1', donneur:'teacher', x:7.2, y:.3, z:-21.3, en:'I saw a golden feather behind the school!', fr:'J’ai vu une plume dorée derrière l’école !', mot:{ en:'behind', fr:'derrière' } },
    { id:'p2', donneur:'doctor', x:-23.1, y:.25, z:-16.6, en:'Look under the big tree, near the forest.', fr:'Regarde sous le grand arbre, près de la forêt.', mot:{ en:'under', fr:'sous' } },
    { id:'p3', donneur:'farmer', x:3.1, y:.3, z:4.3, en:'There’s a feather next to the fountain.', fr:'Il y a une plume à côté de la fontaine.', mot:{ en:'next to', fr:'à côté de' } },
    { id:'p4', donneur:'builder', x:9, y:.3, z:19.4, en:'Go in front of the café!', fr:'Va devant le café !', mot:{ en:'in front of', fr:'devant' } },
    { id:'p5', donneur:'granny', x:5, y:.72, z:8, en:'A feather is on the bench, dear.', fr:'Une plume est sur le banc, mon petit.', mot:{ en:'on', fr:'sur' } },
    { id:'p6', donneur:'pirate', x:-6, y:.3, z:-3.2, en:'Ahoy! The treasure is between the lamp and the bench!', fr:'Ohé ! Le trésor est entre le lampadaire et le banc !', mot:{ en:'between', fr:'entre' } },
    { id:'p7', donneur:'wizard', x:-7, y:.3, z:-21.3, en:'My magic says: behind the market!', fr:'Ma magie dit : derrière le marché !', mot:{ en:'market', fr:'marché' } },
    { id:'p8', donneur:'cow', x:26, y:.25, z:24.5, en:'Moo! It’s in the tall grass, near me.', fr:'Meuh ! Elle est dans les hautes herbes, près de moi.', mot:{ en:'grass', fr:'herbe' } },
    { id:'p9', donneur:'paco', x:-9, y:.3, z:10.8, en:'Woof! I hid it behind the house!', fr:'Ouaf ! Je l’ai cachée derrière la maison !', mot:{ en:'house', fr:'maison' } },
    { id:'p10', donneur:'mina', x:11.5, y:.3, z:-13, en:'Meow… it’s in front of the school.', fr:'Miaou… elle est devant l’école.', mot:{ en:'school', fr:'école' } }
  ];
  const CLE = 'ami3d_quete_plumes';
  // État fiable : seulement des identifiants connus, sans doublon.
  function propre(o){
    const ids = new Set(PLUMES.map(p => p.id));
    const liste = a => Array.isArray(a) ? [...new Set(a.filter(x => ids.has(x)))] : [];
    return { indices:liste(o && o.indices), trouvees:liste(o && o.trouvees) };
  }
  function charger(){ try{ return propre(JSON.parse(localStorage.getItem(CLE) || '{}')); }catch(e){ return propre({}); } }
  function garder(e){ try{ localStorage.setItem(CLE, JSON.stringify(propre(e))); }catch(err){} }
  const deDonneur = d => PLUMES.find(p => p.donneur === d) || null;
  // Le donneur révèle son indice (une seule fois). Renvoie la plume si l'indice est nouveau.
  function reveler(e, donneur){ const p = deDonneur(donneur); if(!p || e.indices.includes(p.id)) return null; e.indices.push(p.id); return p; }
  function trouver(e, id){ if(e.trouvees.includes(id)) return false; e.trouvees.push(id); if(!e.indices.includes(id)) e.indices.push(id); return true; }
  const toutes = e => e.trouvees.length === PLUMES.length;
  window.QUETES = { PLUMES, CLE, propre, charger, garder, deDonneur, reveler, trouver, toutes,
    BUT:'Le vent a emporté 10 plumes d’Ami : sans elles, il ne peut plus voler ! Réussis le défi d’un habitant : il te dira en anglais où une plume est cachée.',
    RECOMPENSE:'Ami revole : saut géant et vol plané (Espace ou bouton ⤒).' };
})();
