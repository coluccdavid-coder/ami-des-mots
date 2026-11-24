// Ami des mots — « On rigole et on apprend » (v5.42) : jeux pour francophones qui apprennent l'anglais.
// Plumo se trompe exprès · Le jeu des oreilles · True or false? · Calendrier de l'Avent · Ma maison ·
// le running gag de la chocolatine · les défis entre potes (lien, sans serveur).
// Phrases et traductions vérifiées à la main : ne pas en inventer. On taquine Plumo ou la confusion, jamais l'enfant.
(function(){
  // ── Plumo se trompe exprès : ses répliques quand on le corrige… ou quand on l'accuse à tort ──
  const AMI_VEXE = [
    { en:'Oh no… You’re right. 😤', fr:'Oh non… Tu as raison.' },
    { en:'Hmph! I was testing you!', fr:'Pff ! C’était pour te tester !' },
    { en:'OK, OK… you’re the teacher now.', fr:'D’accord, d’accord… c’est toi le prof maintenant.' },
    { en:'Who taught you that? Oh wait… me!', fr:'Qui t’a appris ça ? Ah oui… moi !' }
  ];
  const AMI_MALIN = [
    { en:'Ha! My sentence was perfect! Gotcha!', fr:'Ha ! Ma phrase était parfaite ! Je t’ai eu !' },
    { en:'Nope! No mistake this time!', fr:'Raté ! Pas de faute cette fois !' }
  ];
  const AMI_FILOU = [
    { en:'Hee hee… you didn’t see my mistake!', fr:'Hi hi… tu n’as pas vu ma faute !' },
    { en:'Sneaky Plumo strikes again!', fr:'Plumo le filou a encore frappé !' }
  ];

  // ── Le jeu des oreilles : paires de mots qui se ressemblent à l'oreille (les francophones les confondent) ──
  const PAIRES = [
    { a:{ en:'ship', e:'🚢', fr:'un bateau' }, b:{ en:'sheep', e:'🐑', fr:'un mouton' }, rire:'traverser la mer sur un mouton, ça mouille la laine ! 🌊' },
    { a:{ en:'three', e:'3️⃣', fr:'trois' }, b:{ en:'tree', e:'🌳', fr:'un arbre' }, rire:'compter jusqu’à « arbre », c’est original ! 🌳' },
    { a:{ en:'hat', e:'🎩', fr:'un chapeau' }, b:{ en:'hut', e:'🛖', fr:'une cabane' }, rire:'mettre une cabane sur sa tête, ça protège bien de la pluie ! 🛖' },
    { a:{ en:'pen', e:'🖊️', fr:'un stylo' }, b:{ en:'pan', e:'🍳', fr:'une poêle' }, rire:'écrire avec une poêle, les devoirs vont sentir l’omelette ! 🍳' },
    { a:{ en:'bag', e:'👜', fr:'un sac' }, b:{ en:'bug', e:'🐛', fr:'une petite bête' }, rire:'ranger ses affaires dans une chenille, elle va chatouiller ! 🐛' },
    { a:{ en:'mouse', e:'🐭', fr:'une souris' }, b:{ en:'mouth', e:'👄', fr:'une bouche' }, rire:'une souris à la place de la bouche, pratique pour manger du fromage ! 🧀' },
    { a:{ en:'pear', e:'🍐', fr:'une poire' }, b:{ en:'bear', e:'🐻', fr:'un ours' }, rire:'croquer dans un ours au goûter ? L’ours n’est pas d’accord ! 🐻' },
    { a:{ en:'walk', e:'🚶', fr:'marcher' }, b:{ en:'work', e:'💼', fr:'travailler' }, rire:'aller « travailler » au parc au lieu de se promener ? Quelle idée ! 💼' },
    { a:{ en:'sink', e:'🚰', fr:'un évier' }, b:{ en:'think', e:'🤔', fr:'penser' }, rire:'penser dans l’évier, ça mouille les idées ! 🚰' },
    { a:{ en:'light', e:'💡', fr:'une lampe' }, b:{ en:'right', e:'👉', fr:'à droite' }, rire:'tourner « à lampe » au carrefour ? Le GPS de Plumo a grillé ! 💡' },
    { a:{ en:'lock', e:'🔒', fr:'un cadenas' }, b:{ en:'rock', e:'🪨', fr:'un rocher' }, rire:'fermer son vélo avec un rocher, c’est lourd mais efficace ! 🪨' },
    { a:{ en:'fly', e:'🪰', fr:'une mouche' }, b:{ en:'fry', e:'🍟', fr:'une frite' }, rire:'une mouche dans le cornet de frites ? Beurk, change d’oreille ! 🪰' },
    { a:{ en:'bin', e:'🗑️', fr:'une poubelle' }, b:{ en:'bean', e:'🫘', fr:'un haricot' }, rire:'manger une poubelle à la place des haricots ? Pas très bon ! 🗑️' },
    { a:{ en:'cat', e:'🐱', fr:'un chat' }, b:{ en:'cut', e:'✂️', fr:'couper' }, rire:'un chat à la place des ciseaux : le dessin va être griffé ! ✂️' }
  ];

  // ── True or false? : Plumo dit des vérités… et des bêtises ──
  const VRAI_FAUX = [
    { en:'Cows can fly.', fr:'Les vaches savent voler.', vrai:false, rire:'Si les vaches volaient, il faudrait de très grands parapluies ! 🐄☂️' },
    { en:'Fish live in water.', fr:'Les poissons vivent dans l’eau.', vrai:true, rire:'Un poisson dans le désert, ce serait une drôle de vie ! 🐟' },
    { en:'Owls are awake at night.', fr:'Les hiboux sont réveillés la nuit.', vrai:true, rire:'C’est pour ça que Plumo bâille toute la journée ! 🦉' },
    { en:'Bananas are blue.', fr:'Les bananes sont bleues.', vrai:false, rire:'Une banane bleue ? Plumo a mis ses lunettes de soleil à l’envers ! 🍌' },
    { en:'Penguins can swim.', fr:'Les manchots savent nager.', vrai:true, rire:'Ils nagent même mieux qu’ils ne marchent ! 🐧' },
    { en:'Cats say “woof”.', fr:'Les chats font « ouaf ».', vrai:false, rire:'Un chat qui aboie ? Paco est jaloux ! Les chats font « meow ». 🐱' },
    { en:'Plumo is a penguin.', fr:'Plumo est un manchot.', vrai:false, rire:'Plumo est un hibou ! Il en a les plumes… et les grands yeux. 🦉' },
    { en:'A week has seven days.', fr:'Une semaine a sept jours.', vrai:true, rire:'Et Plumo voudrait sept dimanches ! 📅' },
    { en:'Spiders have eight legs.', fr:'Les araignées ont huit pattes.', vrai:true, rire:'Huit chaussettes à mettre chaque matin ! 🕷️🧦' },
    { en:'Elephants are very small.', fr:'Les éléphants sont tout petits.', vrai:false, rire:'Un éléphant dans la poche ? Ça déborde un peu ! 🐘' },
    { en:'The moon is made of cheese.', fr:'La Lune est en fromage.', vrai:false, rire:'Les souris l’auraient déjà mangée ! 🌕🧀' },
    { en:'Dogs have four legs.', fr:'Les chiens ont quatre pattes.', vrai:true, rire:'Paco a vérifié : quatre, pas une de plus ! 🐶' },
    { en:'Ice is cold.', fr:'La glace est froide.', vrai:true, rire:'Une glace chaude, ce serait de la soupe ! 🧊' },
    { en:'Birds have teeth.', fr:'Les oiseaux ont des dents.', vrai:false, rire:'Plumo n’a jamais vu de dentiste pour oiseaux ! Ils ont un bec. 🐦' },
    { en:'Paris is in England.', fr:'Paris est en Angleterre.', vrai:false, rire:'Paris est en France ! Londres, c’est en Angleterre. Plumo s’est perdu dans le métro… 🗼' },
    { en:'Bees make honey.', fr:'Les abeilles font du miel.', vrai:true, rire:'Et Plumo en met sur ses tartines ! 🐝🍯' },
    { en:'Trees can walk.', fr:'Les arbres savent marcher.', vrai:false, rire:'Un arbre qui se promène ? Les oiseaux auraient le mal de mer ! 🌳' },
    { en:'A triangle has three sides.', fr:'Un triangle a trois côtés.', vrai:true, rire:'Tri = trois, comme dans tricycle ! 🔺' },
    { en:'Tomatoes are blue.', fr:'Les tomates sont bleues.', vrai:false, rire:'Bleues ? Elles rougiraient de honte ! 🍅' },
    { en:'Giraffes have long necks.', fr:'Les girafes ont un long cou.', vrai:true, rire:'Parfait pour regarder par-dessus les murs ! 🦒' }
  ];

  // ── Calendrier de l'Avent : un mot d'hiver par jour du 1er au 24 décembre ──
  const AVENT = [
    { e:'❄️', en:'snow', fr:'la neige', phrase:{ en:'Look! It’s snowing!', fr:'Regarde ! Il neige !' }, vanne:'« snow » et « slow » (lent) : la neige tombe… doucement ! 🐌' },
    { e:'⛄', en:'snowman', fr:'le bonhomme de neige', phrase:{ en:'Let’s build a snowman!', fr:'Faisons un bonhomme de neige !' }, vanne:'Plumo a fait un bonhomme de neige… avec un bec de carotte ! 🥕' },
    { e:'🎁', en:'present', fr:'le cadeau', phrase:{ en:'This present is for you.', fr:'Ce cadeau est pour toi.' }, vanne:'« present » veut aussi dire « le présent » : le meilleur cadeau, c’est maintenant ! ⏰' },
    { e:'⭐', en:'star', fr:'l’étoile', phrase:{ en:'There is a star on the tree.', fr:'Il y a une étoile sur le sapin.' }, vanne:'Plumo voulait être l’étoile du sapin… trop lourd ! 🦉' },
    { e:'🎄', en:'Christmas tree', fr:'le sapin de Noël', phrase:{ en:'We decorate the Christmas tree.', fr:'Nous décorons le sapin de Noël.' }, vanne:'Mina a grimpé dans le sapin. Les boules sont tombées. Toutes. 🐱' },
    { e:'🦌', en:'reindeer', fr:'le renne', phrase:{ en:'The reindeer can fly!', fr:'Le renne sait voler !' }, vanne:'« reindeer » sonne comme « rain » (pluie) + « deer » (cerf) : un cerf de pluie ? 🌧️🦌' },
    { e:'🔔', en:'bell', fr:'la cloche', phrase:{ en:'Can you hear the bells?', fr:'Tu entends les cloches ?' }, vanne:'Ding dong ! Plumo a confondu la cloche et la sonnette ! 🔔' },
    { e:'🧦', en:'sock', fr:'la chaussette', phrase:{ en:'I have a big red sock.', fr:'J’ai une grosse chaussette rouge.' }, vanne:'Les chaussettes de Noël sont énormes… Plumo y dort ! 🧦' },
    { e:'🍪', en:'cookie', fr:'le biscuit', phrase:{ en:'Can I have a cookie, please?', fr:'Je peux avoir un biscuit, s’il te plaît ?' }, vanne:'Paco a mangé les biscuits du Père Noël. Il nie tout. 🐶🍪' },
    { e:'🧣', en:'scarf', fr:'l’écharpe', phrase:{ en:'Put on your scarf, it’s cold!', fr:'Mets ton écharpe, il fait froid !' }, vanne:'Une écharpe de 3 mètres pour Plumo : on ne voit plus que ses yeux ! 👀' },
    { e:'🧤', en:'gloves', fr:'les gants', phrase:{ en:'My gloves are warm.', fr:'Mes gants sont chauds.' }, vanne:'Plumo a des gants… pour ses ailes ? Il vole tout de travers ! 🧤' },
    { e:'🛷', en:'sledge', fr:'la luge', phrase:{ en:'Let’s go on the sledge!', fr:'Allons faire de la luge !' }, vanne:'Plumo fait de la luge sur la colline. Freins ? Quels freins ? 🛷💨' },
    { e:'🎅', en:'Father Christmas', fr:'le Père Noël', phrase:{ en:'Father Christmas brings presents.', fr:'Le Père Noël apporte des cadeaux.' }, vanne:'Aux États-Unis, on dit aussi « Santa ». Plumo lui écrit dans les deux langues, au cas où ! ✉️' },
    { e:'🕯️', en:'candle', fr:'la bougie', phrase:{ en:'The candle is very bright.', fr:'La bougie est très lumineuse.' }, vanne:'Plumo a voulu souffler la bougie… et s’est décoiffé les plumes ! 🕯️' },
    { e:'🍫', en:'hot chocolate', fr:'le chocolat chaud', phrase:{ en:'I love hot chocolate!', fr:'J’adore le chocolat chaud !' }, vanne:'Moustache de chocolat sur un hibou : très chic ! 🥸' },
    { e:'🧝', en:'elf', fr:'le lutin', phrase:{ en:'The elf makes toys.', fr:'Le lutin fabrique des jouets.' }, vanne:'Plumo a postulé comme lutin. Refusé : trop de plumes dans les jouets ! 🧸' },
    { e:'🎀', en:'ribbon', fr:'le ruban', phrase:{ en:'The present has a pink ribbon.', fr:'Le cadeau a un ruban rose.' }, vanne:'Mina joue avec le ruban. Le cadeau n’est plus emballé. 🐱🎀' },
    { e:'⛸️', en:'ice skates', fr:'les patins à glace', phrase:{ en:'I can skate on the ice!', fr:'Je sais patiner sur la glace !' }, vanne:'Plumo patine comme un pingouin en vacances. Boum ! ⛸️' },
    { e:'🔥', en:'fire', fr:'le feu', phrase:{ en:'It’s warm near the fire.', fr:'Il fait chaud près du feu.' }, vanne:'Paco dort devant le feu. Il ronfle comme un dragon ! 🐉' },
    { e:'💌', en:'card', fr:'la carte', phrase:{ en:'I write a card to Grandma.', fr:'J’écris une carte à Mamie.' }, vanne:'« card » = une carte… mais « car » = une voiture ! Ne poste pas une voiture ! 🚗' },
    { e:'🌟', en:'shining', fr:'brillant', phrase:{ en:'The lights are shining.', fr:'Les lumières brillent.' }, vanne:'Plumo brille aussi… quand il a fini ses devoirs ! ✨' },
    { e:'🎶', en:'song', fr:'la chanson', phrase:{ en:'Let’s sing a song!', fr:'Chantons une chanson !' }, vanne:'Plumo chante faux. Mais très fort. Les rennes ont fui. 🦌💨' },
    { e:'👨‍👩‍👧', en:'family', fr:'la famille', phrase:{ en:'I love my family.', fr:'J’aime ma famille.' }, vanne:'La famille de Plumo : 12 cousins hiboux, tous aussi bavards ! 🦉🦉🦉' },
    { e:'🎉', en:'Merry Christmas', fr:'Joyeux Noël', phrase:{ en:'Merry Christmas, everybody!', fr:'Joyeux Noël à tous !' }, vanne:'Plumo a mis son plus beau nœud papillon pour te souhaiter un joyeux Noël ! 🎀🦉' }
  ];
  // Jour ouvrable : en décembre, jusqu'au jour J ; du 25 décembre au 6 janvier, tout ; sinon, la case 1 en avant-première.
  function aventOuvert(date){
    const d = date || new Date(), m = d.getMonth(), j = d.getDate();
    if(m === 11) return Math.min(24, j);
    if(m === 0 && j <= 6) return 24;
    return 0;
  }

  // ── Ma maison : on dépense ses plumes en meubles… dont on apprend le nom anglais ──
  const MAISON = [
    { id:'sofa', e:'🛋️', en:'a comfy sofa', fr:'un canapé confortable', prix:10, zone:'sol', rire:'Plumo s’y installe déjà… pour une sieste de 3 heures ! 😴' },
    { id:'lampe', e:'💡', en:'a bright lamp', fr:'une lampe lumineuse', prix:6, zone:'sol', rire:'Enfin de la lumière ! Plumo arrête de lire dans le noir. 📖' },
    { id:'plante', e:'🪴', en:'a green plant', fr:'une plante verte', prix:5, zone:'sol', rire:'Plumo lui parle anglais : elle pousse deux fois plus vite ! 🌱' },
    { id:'lit', e:'🛏️', en:'a big bed', fr:'un grand lit', prix:12, zone:'sol', rire:'Un hibou dans un lit ? Il préfère dormir debout… mais bon ! 🦉' },
    { id:'tele', e:'📺', en:'a television', fr:'une télévision', prix:12, zone:'sol', rire:'Plumo ne regarde que des dessins animés… en anglais ! 📺' },
    { id:'chaise', e:'🪑', en:'a wooden chair', fr:'une chaise en bois', prix:4, zone:'sol', rire:'Une chaise ? Paco va la mâchouiller. Promis, non. Peut-être. 🐶' },
    { id:'guitare', e:'🎸', en:'a guitar', fr:'une guitare', prix:9, zone:'sol', rire:'Plumo va donner un concert… les voisins ont acheté des bouchons d’oreilles ! 🙉' },
    { id:'piano', e:'🎹', en:'a piano', fr:'un piano', prix:15, zone:'sol', rire:'Do, ré, mi… Plumo joue avec ses pieds. Ça s’entend ! 🎹' },
    { id:'ours', e:'🧸', en:'a teddy bear', fr:'un ours en peluche', prix:5, zone:'sol', rire:'« teddy bear » : un ours (bear), pas une poire (pear) ! 🍐🧸' },
    { id:'livres', e:'📚', en:'a pile of books', fr:'une pile de livres', prix:6, zone:'sol', rire:'Plumo les a tous lus. Enfin, il a regardé les images. 📚' },
    { id:'ordi', e:'💻', en:'a computer', fr:'un ordinateur', prix:14, zone:'sol', rire:'Plumo cherche « mouse »… et trouve une souris ! 🐭🖱️' },
    { id:'chat', e:'🐈', en:'a lazy cat', fr:'un chat paresseux', prix:8, zone:'sol', rire:'Il dort 20 heures par jour. Plumo est jaloux. 😺' },
    { id:'tableau', e:'🖼️', en:'a pretty painting', fr:'un joli tableau', prix:8, zone:'mur', rire:'C’est un portrait de Plumo. Évidemment. 🖼️🦉' },
    { id:'horloge', e:'🕰️', en:'an old clock', fr:'une vieille horloge', prix:7, zone:'mur', rire:'« an » old clock : devant « old », le « a » devient « an » ! ⏰' },
    { id:'fenetre', e:'🪟', en:'a big window', fr:'une grande fenêtre', prix:6, zone:'mur', rire:'Plumo peut enfin regarder les oiseaux… ses cousins ! 🐦' },
    { id:'miroir', e:'🪞', en:'a round mirror', fr:'un miroir rond', prix:7, zone:'mur', rire:'Plumo se regarde : « What a handsome owl! » (Quel beau hibou !) 🦉✨' }
  ];
  const PLACES = { sol:6, mur:3 };

  // ── Le running gag : comment dit-on « chocolatine » en anglais ? (révélé à la fin) ──
  const GAG = [
    'Au fait… comment dit-on « chocolatine » en anglais ? Plumo cherche encore. 🥐🤔',
    'Plumo a demandé à Paco pour « chocolatine ». Paco a répondu « woof ». Pas très utile. 🐶',
    'Toujours pas trouvé « chocolatine »… Plumo a fouillé trois dictionnaires et un sac de croissants. 📚🥐',
    'Mina sait peut-être dire « chocolatine » en anglais. Mais elle ne parle qu’aux poissons. 🐱🐟',
    'Professor Puzzle dit que « chocolatine », c’est un piège. Plumo a peur. 🪤🥐',
    'Plumo a rêvé de « chocolatine » cette nuit. Il s’est réveillé avec du chocolat sur le bec. 😴🍫',
    'Captain Finn a vu « chocolatine » sur sa carte au trésor… c’était une tache de chocolat. 🗺️',
    'Plumo pense qu’il est tout près de trouver « chocolatine ». Encore un petit effort ! 🔍'
  ];
  const REVELATION = 'ENFIN ! Plumo a trouvé : en anglais, on dit « pain au chocolat »… ou « chocolate croissant » ! Et le débat chocolatine ou pain au chocolat ? Trop dangereux, même pour un hibou. 🥐🦉🏆';

  // ── Défi entre potes : un lien qui contient la graine des questions, le score et un pseudo (rien d'autre). ──
  const PSEUDO_MAX = 12;
  const nettoiePseudo = p => String(p || '').replace(/[^\p{L}\p{N} _-]/gu, '').trim().slice(0, PSEUDO_MAX);
  function coderDefi(o){
    const t = JSON.stringify(Object.assign({ v:1, s:o.s >>> 0, n:o.n, sc:o.sc, p:nettoiePseudo(o.p) }, /^(6e|5e|4e|3e|2nde|1re|Tle)$/.test(o.m || '') ? { m:o.m } : {}));
    return btoa(unescape(encodeURIComponent(t))).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
  }
  function lireDefi(code){
    try{
      if(typeof code !== 'string' || code.length > 200) return null;
      const b = code.replace(/-/g, '+').replace(/_/g, '/');
      const o = JSON.parse(decodeURIComponent(escape(atob(b + '==='.slice((b.length + 3) % 4)))));
      if(o.v !== 1 || !Number.isInteger(o.s) || o.s < 0 || ![6, 8, 10].includes(o.n) || !Number.isInteger(o.sc) || o.sc < 0 || o.sc > o.n) return null;
      return Object.assign({ s:o.s, n:o.n, sc:o.sc, p:nettoiePseudo(o.p) || 'Un pote' }, /^(6e|5e|4e|3e|2nde|1re|Tle)$/.test(o.m || '') ? { m:o.m } : {});
    }catch(e){ return null; }
  }
  // Hasard reproductible (même graine = mêmes questions sur les deux téléphones).
  function hasardGraine(graine){ let a = graine >>> 0; return () => { a = (a + 0x6D2B79F5) >>> 0; let t = a; t = Math.imul(t ^ (t >>> 15), t | 1); t ^= t + Math.imul(t ^ (t >>> 7), t | 61); return ((t ^ (t >>> 14)) >>> 0) / 4294967296; }; }

  // ── Battle de rap (paroles originales) : Plumo rappe, l'enfant complète ses rimes. Le mot doit RIMER et avoir du SENS. ──
  const RAP = [
    { ami:[['Yo! Listen up, I’m Plumo the owl,', 'Yo ! Écoutez, je suis Plumo le hibou,'], ['when I start to rap, all the wolves start to howl!', 'quand je rappe, tous les loups se mettent à hurler !'],
           ['My feathers are fresh and my English is cool,', 'Mes plumes sont stylées et mon anglais est cool,'], ['I’m the smartest bird in the whole English school!', 'je suis l’oiseau le plus malin de toute l’école d’anglais !']],
      toi:[ { a:['You say you’re the smartest, but here is the news:', 'Tu dis que t’es le plus malin, mais voici la nouvelle :'], b:'you can’t even put on your own little ___!', bfr:'tu n’arrives même pas à mettre tes petites chaussures !',
              bon:'shoes', faux:[{ m:'socks', vanne:'« socks » ne rime pas avec « news » ! Le public attend la rime… silence gênant. 🦗' }, { m:'blues', vanne:'« blues » rime avec « news »… mais on ne met pas un blues à ses pieds ! 🎷' }] },
            { a:['You rap like a robot that’s stuck in the rain,', 'Tu rappes comme un robot coincé sous la pluie,'], b:'my rhymes are so fast, they could race a ___!', bfr:'mes rimes vont si vite qu’elles feraient la course avec un train !',
              bon:'train', faux:[{ m:'car', vanne:'« car » ne rime pas avec « rain »… le public se gratte la tête. 🤔' }, { m:'brain', vanne:'« brain » rime avec « rain »… mais faire la course avec un cerveau ? Il n’a pas de jambes ! 🧠' }] } ] },
    { ami:[['I fly in the sky like a superstar,', 'Je vole dans le ciel comme une superstar,'], ['my rhymes are so good, I could drive a car!', 'mes rimes sont si bonnes que je pourrais conduire une voiture !'],
           ['I know every word, from A to Z,', 'Je connais tous les mots, de A à Z,'], ['nobody in town is as clever as me!', 'personne en ville n’est aussi malin que moi !']],
      toi:[ { a:['You drive a car? With your tiny wings?', 'Tu conduis une voiture ? Avec tes toutes petites ailes ?'], b:'you crash into trees and a lot of other ___!', bfr:'tu fonces dans les arbres et dans plein d’autres choses !',
              bon:'things', faux:[{ m:'cars', vanne:'« cars » ne rime pas avec « wings » ! Le DJ arrête le son. 🎧' }, { m:'kings', vanne:'« kings » rime avec « wings »… mais il n’y a pas de rois dans les arbres ! 👑🌳' }] },
            { a:['You know every word? Then tell me, my friend,', 'Tu connais tous les mots ? Alors dis-moi, mon ami,'], b:'why do you say “chocolatine” at the ___?', bfr:'pourquoi tu dis « chocolatine » à la fin ?',
              bon:'end', faux:[{ m:'start', vanne:'« start » ne rime pas avec « friend »… le public fait « ouuuh ». 😬' }, { m:'bend', vanne:'« bend » (un virage) rime avec « friend »… mais dire « chocolatine » au virage ? Plumo conduit déjà assez mal ! 🚗' }] } ] },
    { ami:[['OK, OK, you’re good, I admit,', 'D’accord, d’accord, t’es bon, je l’admets,'], ['but I’m the best rapper, and that is it!', 'mais le meilleur rappeur, c’est moi, point final !'],
           ['I’m the champion, the boss of this town,', 'Je suis le champion, le chef de cette ville,'], ['nobody, nobody can take my crown!', 'personne, personne ne peut prendre ma couronne !']],
      toi:[ { a:['The boss of this town? You’re sleeping all day,', 'Le chef de cette ville ? Tu dors toute la journée,'], b:'you snore so loud that the cows run ___!', bfr:'tu ronfles si fort que les vaches s’enfuient !',
              bon:'away', faux:[{ m:'home', vanne:'« home » ne rime pas avec « day »… même les vaches attendaient la rime ! 🐄' }, { m:'hay', vanne:'« hay » (le foin) rime avec « day »… mais les vaches courent vers le foin, pas loin de tes ronflements ! 🌾' }] },
            { a:['So give me the mic and sit down, little bird,', 'Alors donne-moi le micro et assieds-toi, petit oiseau,'], b:'’cause I just rapped better on every ___!', bfr:'parce que je viens de mieux rapper sur chaque mot !',
              bon:'word', faux:[{ m:'line', vanne:'« line » ne rime pas avec « bird »… presque, mais non ! 🎤' }, { m:'third', vanne:'« third » (troisième) rime avec « bird »… mais « sur chaque troisième » ? Le public s’y perd ! 🔢' }] } ] }
  ];
  const FOULE = { feu:['🔥 The crowd goes wild!', '🙌 Oooooh!', '🎉 Mic drop!'], froid:['🦗 Silence…', '😬 Ouuuh…', '🤨 Hmm…'] };
  window.RIGOLADE = { RAP, FOULE, AMI_VEXE, AMI_MALIN, AMI_FILOU, PAIRES, VRAI_FAUX, AVENT, aventOuvert, MAISON, PLACES, GAG, REVELATION,
    coderDefi, lireDefi, hasardGraine, nettoiePseudo, PSEUDO_MAX };
})();
