// Mots City — la logique du jeu (sans 3D), testable seule.
// Un jeu ORIGINAL de ville ouverte, familial : on livre, on conduit des passagers,
// on attrape des lettres… et chaque erreur déclenche une vanne qui parle de CETTE erreur.
// Interface en français, contenu à apprendre en anglais.
(function(){
  'use strict';
  const M = () => window.MOTS || {};
  const low = s => String(s || '').toLowerCase();
  const en = e => low((M()[e] || {}).en);
  const fr = e => low((M()[e] || {}).fr);

  // Ce qu'on peut livrer (pris au marché) et où un passager peut aller.
  const LIVRABLES = ['🍎','🍌','🍞','🧀','🥛','🥚','🍊','🍇','🍓','🥕','🍄','☕'];
  const LIEUX = ['🏰','🗼','⛲','🏦','📬','🌉','⛱️','⛵','🌳'];
  // Indénombrables / pluriels : « some », sinon « a » / « an ».
  const SOME = ['BREAD','CHEESE','MILK','COFFEE','GRAPES','TROUSERS'];
  function article(e){
    const m = M()[e]; if(!m) return '';
    if(SOME.includes(String(m.en).toUpperCase())) return 'some';
    return /^[aeiou]/i.test(m.en) ? 'an' : 'a';
  }
  const hasard = (l, r) => l[Math.floor((r || Math.random)() * l.length)];
  function melange(l, r){ const a = l.slice(); for(let i = a.length - 1; i > 0; i--){ const j = Math.floor((r || Math.random)() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; }
  const remplir = (t, v) => t.replace(/\{(\w+)\}/g, (_, k) => v[k] == null ? '' : String(v[k]));

  // ── Les missions ───────────────────────────────────────────────
  const DEMANDES = [
    ["Can I have {a} {w}, please?", "Je peux avoir ça, s’il te plaît ?"],
    ["I’m so hungry! Bring me {a} {w}!", "J’ai trop faim ! Apporte-moi ça !"],
    ["Quick, quick! I need {a} {w}!", "Vite, vite ! J’ai besoin de ça !"],
    ["Hello! {A} {w}, please!", "Bonjour ! Ça, s’il te plaît !"]
  ];
  const DESTINATIONS = [
    ["Take me to the {w}, please!", "Emmène-moi là-bas, s’il te plaît !"],
    ["To the {w}! And hurry up!", "Direction là-bas ! Et vite !"],
    ["Hello, driver! The {w}, please.", "Bonjour, chauffeur ! Là-bas, s’il te plaît."],
    ["I’m late! Go to the {w}!", "Je suis en retard ! Va là-bas !"]
  ];
  const existe = l => l.filter(e => M()[e] && M()[e].en && M()[e].fr);
  function livraison(r){
    const items = existe(LIVRABLES), voulu = hasard(items, r);
    const etals = melange([voulu].concat(melange(items.filter(x => x !== voulu && en(x) !== en(voulu)), r).slice(0, 3)), r);
    const [phrase, sens] = hasard(DEMANDES, r);
    const a = article(voulu);
    return { type:'livraison', voulu, etals, phrase:remplir(phrase, { a, A:a.charAt(0).toUpperCase() + a.slice(1), w:en(voulu) }), sens, etape:'client' };
  }
  function taxi(r, exclure){
    const lieux = existe(LIEUX).filter(x => x !== exclure), voulu = hasard(lieux, r);
    const [phrase, sens] = hasard(DESTINATIONS, r);
    return { type:'taxi', voulu, phrase:remplir(phrase, { w:en(voulu) }), sens, etape:'client' };
  }
  function lettres(r){
    const mots = Object.keys(M()).filter(e => /^[A-Z]{3,6}$/.test(String(M()[e].en || '')));
    const e = hasard(mots, r), mot = String(M()[e].en).toUpperCase();
    const leurres = melange('ABCDEFGHIJKLMNOPRSTUW'.split('').filter(c => !mot.includes(c)), r).slice(0, 4);
    return { type:'lettres', voulu:e, mot, pris:'', leurres, etape:'collecte' };
  }

  // ── Les vannes (toujours sur L'ERREUR commise, jamais sur le joueur) ──
  const VANNES = {
    livraison:[
      "« {f} » ? J’ai demandé « {j} » ! Mon ventre est très surpris.",
      "Le client regarde « {f} »… il voulait « {j} ». Il le prend en photo quand même.",
      "« {f} » au lieu de « {j} » ? Ami a lu la commande à l’envers.",
      "Ami a livré « {f} ». Le client a dit « {j} ». Ami accuse son casque.",
      "« {f} » ? Ça n’a pas du tout le goût de « {j} » !",
      "Le client voulait « {j} ». Il hésite à manger « {f} » avec une paille."
    ],
    taxi:[
      "« {f} » ? J’ai dit « {j} » ! Le GPS d’Ami parle hibou.",
      "Arrivée : « {f} ». Destination demandée : « {j} ». Le passager rigole.",
      "Le passager voulait « {j} ». Ami l’a emmené à « {f} ». Visite gratuite !",
      "« {f} », c’est beau, mais le passager a rendez-vous à « {j} » !",
      "Ami a confondu « {f} » et « {j} ». Il promet de relire la carte."
    ],
    lettres:[
      "« {x} » ? Ce mot n’existe pas, même chez les extraterrestres. On cherche « {j} » !",
      "« {l} » s’est invité dans « {j} ». Il n’était pas sur la liste !",
      "Ami a épelé « {x} ». Le dictionnaire tousse.",
      "« {x} »… on dirait un éternuement ! Cherche la lettre suivante de « {j} ».",
      "La lettre « {l} » fait du stop. Pas pour « {j} », désolé !"
    ]
  };
  let derniere = '';
  function vanne(type, v, r){
    const l = VANNES[type] || [];
    let t = hasard(l, r); if(l.length > 1 && t === derniere) t = hasard(l.filter(x => x !== derniere), r);
    derniere = t;
    return remplir(t, v);
  }
  // Juger une réponse. Renvoie { juste, vanne, correction }.
  function juger(mission, choix){
    if(!mission) return { juste:false, vanne:'', correction:'' };
    if(mission.type === 'lettres'){
      const attendu = mission.mot[mission.pris.length];
      if(choix === attendu){ mission.pris += choix; return { juste:true, fini:mission.pris === mission.mot }; }
      const x = mission.pris + choix;
      return { juste:false, vanne:vanne('lettres', { x, l:choix, j:low(mission.mot) }), correction:'La lettre suivante : ' + attendu + ' (' + mission.mot + ' = ' + fr(mission.voulu) + ')' };
    }
    if(choix === mission.voulu) return { juste:true, correction:en(mission.voulu) + ' = ' + fr(mission.voulu) };
    return { juste:false, vanne:vanne(mission.type, { f:en(choix), j:en(mission.voulu) }), correction:en(mission.voulu) + ' = ' + fr(mission.voulu) + ' · ' + en(choix) + ' = ' + fr(choix) };
  }

  // ── Plumes dorées cachées dans la ville : chacune apprend un mot ──
  const PLUMES_DOREES = ['🐱','🦉','🍎','🌙','⭐','🌊','🏝️','⛵','🚗','🎸','☀️','🌹','🔑','👟','🦀','🍓','🎈','🌳','⚓','🦜'];
  // Tenues du héros (couleurs : haut, bas, casquette, chaussures).
  // perso : modèle 3D animé (KayKit, CC0) ; les couleurs servent si les modèles ne chargent pas.
  const TENUES = [
    { nom:'Explorateur', perso:'rogue', haut:0x2ec4b6, bas:0x2d3a5a, casquette:0x1b4965, chaussures:0xff9f1c },
    { nom:'Magicien', perso:'mage', haut:0x8338ec, bas:0x111122, casquette:0x3a86ff, chaussures:0xfb5607 },
    { nom:'Chevalier', perso:'knight', haut:0xc0c8d8, bas:0x3a4a6b, casquette:0xffc75f, chaussures:0x555555 },
    { nom:'Viking', perso:'barbarian', haut:0xe09f3e, bas:0x6b4f3a, casquette:0x9e2a2b, chaussures:0x335c67 },
    // Personnages Quaternius (CC0) ; si le modèle ne charge pas, le jeu prend l'Explorateur.
    { nom:'Pirate', perso:'q:Pirate_Male', haut:0xb23a48, bas:0x2b2d42, casquette:0x111111, chaussures:0x5c3d2e },
    { nom:'Cheffe', perso:'q:Chef_Female', haut:0xffffff, bas:0x2d3a5a, casquette:0xf1f1f1, chaussures:0x333333 },
    { nom:'Sorcière', perso:'q:Witch', haut:0x5a189a, bas:0x240046, casquette:0x10002b, chaussures:0xff9e00 },
    { nom:'Vache rigolote', perso:'q:Cow', haut:0xffffff, bas:0x222222, casquette:0xf7a1c4, chaussures:0x222222 }
  ];

  // ── Les petites phrases de la ville (vraies expressions, avec leur sens) ──
  const PASSANTS = [
    ["Watch out!", "Attention !"], ["Slow down, please!", "Ralentis, s’il te plaît !"],
    ["Excuse me!", "Pardon !"], ["Hey, be careful!", "Hé, fais attention !"],
    ["Nice scooter!", "Joli scooter !"], ["Good morning!", "Bonjour !"],
    ["Have a nice day!", "Bonne journée !"], ["Oops! Sorry!", "Oups ! Pardon !"]
  ];
  const BOBOS = [
    ["Ouch! Sorry, wall!", "Aïe ! Pardon, le mur !"], ["Oops! My bad!", "Oups ! C’est ma faute !"],
    ["Bonk! Excuse me, building!", "Boum ! Pardon, l’immeuble !"], ["The wall says: “Ouch!”", "Le mur dit : « Aïe ! »"]
  ];
  const KLAXON = [["Beep beep!", "Bip bip !"], ["Coming through!", "Laissez passer !"], ["Hello, everybody!", "Bonjour tout le monde !"]];
  const RADIO = [
    ["It’s raining cats and dogs!", "Il pleut des cordes ! (mot à mot : il pleut des chats et des chiens)"],
    ["Piece of cake!", "Fastoche ! (mot à mot : un morceau de gâteau)"],
    ["Hold your horses!", "Doucement, pas si vite ! (mot à mot : retiens tes chevaux)"],
    ["Break a leg!", "Bonne chance ! (mot à mot : casse-toi une jambe — c’est gentil, promis)"],
    ["I’m all ears.", "Je suis tout ouïe. (mot à mot : je suis toutes oreilles)"],
    ["Time flies!", "Le temps passe vite ! (mot à mot : le temps vole)"],
    ["Better late than never.", "Mieux vaut tard que jamais."],
    ["Easy peasy lemon squeezy!", "Simple comme bonjour !"],
    ["Let’s call it a day.", "On s’arrête là pour aujourd’hui."],
    ["Don’t cry over spilt milk.", "Ce qui est fait est fait. (mot à mot : ne pleure pas sur le lait renversé)"]
  ];
  let dernieres = {};
  function phrase(liste, cle, r){
    const l = { passants:PASSANTS, bobos:BOBOS, klaxon:KLAXON, radio:RADIO }[liste];
    let p = hasard(l, r); if(l.length > 1 && p === dernieres[cle || liste]) p = hasard(l.filter(x => x !== dernieres[cle || liste]), r);
    dernieres[cle || liste] = p; return { en:p[0], fr:p[1] };
  }

  // ── Les commandes : chaque touche suit sa flèche ─────────────────
  const TOUCHES = {
    ArrowUp:'haut', KeyW:'haut', KeyZ:'haut',
    ArrowDown:'bas', KeyS:'bas',
    ArrowLeft:'gauche', KeyA:'gauche', KeyQ:'gauche',
    ArrowRight:'droite', KeyD:'droite'
  };
  // e.code donne la position physique (ZQSD sur AZERTY = WASD sur QWERTY) ;
  // e.key couvre les claviers où code manque.
  function direction(ev){
    if(TOUCHES[ev.code]) return TOUCHES[ev.code];
    const k = low(ev.key);
    return { z:'haut', w:'haut', s:'bas', q:'gauche', a:'gauche', d:'droite', arrowup:'haut', arrowdown:'bas', arrowleft:'gauche', arrowright:'droite' }[k] || null;
  }

  // ── Sauvegarde : on valide tout ce qui est relu ──────────────────
  const CLE = 'motscity_v1';
  function propre(o){
    const s = { plumes:0, fun:0, reussies:{ livraison:0, taxi:0, lettres:0 }, appris:[], dorees:[], tenue:0 };
    if(!o || typeof o !== 'object') return s;
    const n = (v, max) => Number.isFinite(+v) ? Math.max(0, Math.min(max, Math.floor(+v))) : 0;
    s.plumes = n(o.plumes, 1e6); s.fun = n(o.fun, 5);
    if(o.reussies && typeof o.reussies === 'object') for(const k in s.reussies) s.reussies[k] = n(o.reussies[k], 1e6);
    if(Array.isArray(o.appris)) s.appris = o.appris.filter(e => typeof e === 'string' && M()[e]).slice(-500);
    if(Array.isArray(o.dorees)) s.dorees = [...new Set(o.dorees.filter(i => Number.isInteger(i) && i >= 0 && i < PLUMES_DOREES.length))];
    s.tenue = n(o.tenue, TENUES.length - 1);
    return s;
  }
  function charger(){ try{ return propre(JSON.parse(localStorage.getItem(CLE) || 'null')); }catch(e){ return propre(null); } }
  function garder(s){ try{ localStorage.setItem(CLE, JSON.stringify(propre(s))); }catch(e){} }

  window.MotsCity = { PLUMES_DOREES, TENUES, LIVRABLES, LIEUX, article, livraison, taxi, lettres, juger, vanne, VANNES, phrase, PASSANTS, BOBOS, KLAXON, RADIO, direction, propre, charger, garder, en, fr, melange };
})();
