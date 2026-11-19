// Ami des mots — le coin anglais (pour les francophones) : battle de vannes, situations de la vie, dictée rigolote.
// Toutes les phrases et traductions sont écrites et vérifiées à la main : ne pas en inventer.
// Règle d'or : on taquine Ami ou la confusion, jamais l'enfant. Les vannes de la battle visent Ami (qui adore ça).
(function(){
  // ── BATTLE DE VANNES ── Ami se vante en anglais ; l'enfant choisit LA réplique juste et drôle.
  // Chaque mauvaise réplique : soit une faute (la vanne explique), soit hors sujet (la vanne le dit gentiment).
  const BATTLE = [
    { ami:'I’m the fastest bird in the village!', fr:'Je suis l’oiseau le plus rapide du village !',
      bon:{ en:'Fast? You’re slower than a snail on holiday!', fr:'Rapide ? Tu es plus lent qu’un escargot en vacances !' },
      faux:[{ en:'You are more fast than a snail!', vanne:'« more fast » : la phrase court trop vite et se prend les pieds ! Pour un mot court, on dit « faster ». 🐌' },
            { en:'I like cheese.', vanne:'« I like cheese » : bonne nouvelle pour le fromage… mais ce n’est pas une réplique ! 🧀' }] },
    { ami:'I can read one hundred books a day!', fr:'Je peux lire cent livres par jour !',
      bon:{ en:'Sure, and I can ride my bike to the moon!', fr:'Bien sûr, et moi je vais sur la Lune à vélo !' },
      faux:[{ en:'Sure, and I can to ride my bike to the moon!', vanne:'Après « can », jamais de « to » : I can ride. Le « to » est parti tout seul dans la fusée ! 🚀' },
            { en:'Yes, it’s Tuesday.', vanne:'« Yes, it’s Tuesday » : Ami cherche encore le rapport avec les livres… 📅' }] },
    { ami:'My feathers are more beautiful than your hair!', fr:'Mes plumes sont plus belles que tes cheveux !',
      bon:{ en:'Your feathers look like a pillow after a pillow fight!', fr:'Tes plumes ressemblent à un oreiller après une bataille de polochons !' },
      faux:[{ en:'Your feathers looks like a pillow after a pillow fight!', vanne:'« feathers », c’est plusieurs plumes : elles « look », sans s ! 🪶' },
            { en:'I have ten years.', vanne:'Hors sujet… et en plus c’est un piège : on dit « I am ten » ! 😉' }] },
    { ami:'I never make mistakes in English.', fr:'Je ne fais jamais de fautes en anglais.',
      bon:{ en:'Never? Yesterday you said “a elephant”!', fr:'Jamais ? Hier, tu as dit « a elephant » !' },
      faux:[{ en:'Never? Yesterday you say “a elephant”!', vanne:'« Yesterday » = hier : le verbe doit voyager dans le passé, « you said » ! ⏳' },
            { en:'Good morning, teacher.', vanne:'Très poli… mais Ami attendait une réplique, pas un bonjour ! 🦉' }] },
    { ami:'I’m so clever, I know every word!', fr:'Je suis tellement malin que je connais tous les mots !',
      bon:{ en:'OK, clever owl: how do you say “chocolatine”?', fr:'D’accord, chouette maligne : comment dit-on « chocolatine » ?' },
      faux:[{ en:'OK, clever owl: how you say “chocolatine”?', vanne:'Il manque un petit mot : how DO you say…? Sans lui, la question tombe à plat ! 🥐' },
            { en:'My cat is orange.', vanne:'Joli chat… mais Ami attendait une réplique ! 🐈' }] },
    { ami:'I sing better than a rock star!', fr:'Je chante mieux qu’une rock star !',
      bon:{ en:'When you sing, even the dogs cover their ears!', fr:'Quand tu chantes, même les chiens se bouchent les oreilles !' },
      faux:[{ en:'When you sing, even the dogs covers their ears!', vanne:'« the dogs » : plusieurs chiens, donc « cover », sans s ! 🐶🐶' },
            { en:'Where is the station?', vanne:'Tu demandes la gare au milieu d’une battle ? Ami est perdu ! 🚉' }] },
    { ami:'I’m the king of this village!', fr:'Je suis le roi de ce village !',
      bon:{ en:'The king? You can’t even find your own feathers!', fr:'Le roi ? Tu ne retrouves même pas tes propres plumes !' },
      faux:[{ en:'The king? You can’t even to find your own feathers!', vanne:'Après « can’t », pas de « to » : you can’t find. Le « to » s’est perdu avec les plumes ! 🪶' },
            { en:'I am agree.', vanne:'« I am agree » : un piège ! On dit « I agree »… et en plus, tu viens d’être d’accord avec Ami ! 😂' }] },
    { ami:'I wake up very early every day.', fr:'Je me lève très tôt tous les jours.',
      bon:{ en:'Owls sleep all day! You wake up at dinner time!', fr:'Les chouettes dorment toute la journée ! Tu te réveilles à l’heure du dîner !' },
      faux:[{ en:'Owls sleeps all day! You wake up at dinner time!', vanne:'« Owls » : plusieurs chouettes, donc « sleep », sans s ! 🦉🦉' },
            { en:'I eat pain every morning.', vanne:'« pain » = la douleur ! Un petit-déjeuner qui fait aïe… et ce n’est pas une réplique ! 🍞' }] },
    { ami:'I’m the best dancer in the world!', fr:'Je suis le meilleur danseur du monde !',
      bon:{ en:'You dance like a penguin on ice skates!', fr:'Tu danses comme un pingouin en patins à glace !' },
      faux:[{ en:'You dance like a penguin on ice skate!', vanne:'Deux pieds, deux patins : « skates », avec un s ! ⛸️⛸️' },
            { en:'It’s raining today.', vanne:'La météo, c’est sympa… mais Ami veut une réplique, pas un bulletin ! 🌧️' }] }
  ];
  // Réactions d'Ami quand la réplique fait mouche (il adore perdre… presque).
  const AIE = [
    { en:'Ouch! Good one!', fr:'Aïe ! Bien envoyé !' },
    { en:'Ha ha! You got me!', fr:'Ha ha ! Tu m’as eu !' },
    { en:'Hey! That’s not fair… but it’s funny!', fr:'Hé ! Ce n’est pas juste… mais c’est drôle !' },
    { en:'OK, OK, I give up!', fr:'D’accord, d’accord, j’abandonne !' }
  ];

  // ── SITUATIONS DE LA VIE ── petits dialogues. Chaque étape : on écoute, on choisit sa réplique.
  // mode 'comprendre' : la question porte sur le sens (choix en français).
  const SITUATIONS = [
    { id:'cafe', titre:'Au café', icone:'☕', qui:'Le serveur', etapes:[
      { dit:'Hello! What would you like?', fr:'Bonjour ! Qu’est-ce que tu voudrais ?',
        bon:'Can I have a hot chocolate, please?',
        faux:[{ en:'Give me hot.', vanne:'« Give me hot » : donne-moi du chaud ? Le serveur t’apporte un radiateur ! 🔥 (Et on dit please.)' },
              { en:'I would like a hot dog chocolate.', vanne:'Un hot-dog au chocolat ? Le serveur se demande s’il doit appeler le chef… 🌭🍫' }] },
      { dit:'Here you are. That’s two pounds, please.', fr:'Voilà. Ça fait deux livres, s’il te plaît.',
        bon:'Here you are. Thank you!',
        faux:[{ en:'I am two pounds.', vanne:'« I am two pounds » : tu pèses deux livres ? Léger comme une plume ! 🪶' },
              { en:'Goodbye, cow!', vanne:'Le serveur n’est pas une vache… 🐄 On paie et on dit thank you !' }] },
      { dit:'Have a nice day!', fr:'Bonne journée !',
        bon:'You too! Goodbye!',
        faux:[{ en:'Me too!', vanne:'« Me too » : tu te souhaites une bonne journée à toi-même ? On répond « You too! » 😄' },
              { en:'Yes, I have.', vanne:'Hors sujet : on répond simplement « You too! »' }] } ] },
    { id:'ecole', titre:'Un nouveau copain', icone:'🏫', qui:'Sam', etapes:[
      { dit:'Hi! I’m Sam. What’s your name?', fr:'Salut ! Moi, c’est Sam. Comment tu t’appelles ?',
        bon:'Hi Sam! My name is Léo.',
        faux:[{ en:'Hi Sam! I call myself Léo.', vanne:'« I call myself Léo » : on dirait que tu te téléphones à toi-même ! 📞' },
              { en:'I am ten years old.', vanne:'Sam voulait ton prénom, pas ton âge ! 🎂' }] },
      { dit:'How old are you?', fr:'Tu as quel âge ?',
        bon:'I’m nine. And you?',
        faux:[{ en:'I have nine years. And you?', vanne:'Le piège ! En anglais, on EST son âge : « I’m nine ». 🎒' },
              { en:'I’m blue. And you?', vanne:'« I’m blue » : tu es bleu ? Sam se demande si tu as froid ! 💙' }] },
      { dit:'Do you want to play football?', fr:'Tu veux jouer au foot ?',
        bon:'Yes, I’d love to!',
        faux:[{ en:'Yes, I want play.', vanne:'Il manque le petit « to » : I want TO play. Le ballon attend ! ⚽' },
              { en:'No, I am a football.', vanne:'Tu es un ballon ? Attention, Sam va tirer au but ! ⚽😂' }] } ] },
    { id:'magasin', titre:'Au magasin', icone:'🛍️', qui:'La vendeuse', etapes:[
      { dit:'Hello! Can I help you?', fr:'Bonjour ! Je peux t’aider ?',
        bon:'Yes, please. I’m looking for a T-shirt.',
        faux:[{ en:'Yes, please. I search a T-shirt.', vanne:'Chercher un objet : « I’m looking for… ». Le T-shirt se cache, il faut le dire comme il faut ! 👕' },
              { en:'No, I am a T-shirt.', vanne:'Un T-shirt qui parle ? La vendeuse appelle le magicien du village ! 👕✨' }] },
      { dit:'What colour would you like?', fr:'Quelle couleur voudrais-tu ?',
        bon:'A red one, please.',
        faux:[{ en:'A T-shirt red, please.', vanne:'La couleur passe devant : « a red T-shirt » (ou « a red one ») ! 🎨' },
              { en:'Seven o’clock, please.', vanne:'Sept heures, c’est l’heure, pas une couleur ! ⏰' }] },
      { dit:'Here you are. It’s ten pounds.', fr:'Voilà. Ça fait dix livres.',
        bon:'Here you are. Thank you!',
        faux:[{ en:'Thank you very match!', vanne:'« match », c’est un match ! Tu remercies une équipe de foot ? On dit « much ». ⚽' },
              { en:'You’re welcome!', vanne:'« You’re welcome » = de rien : c’est la vendeuse qui devrait le dire ! Toi, tu dis « Thank you! »' }] } ] },
    { id:'chemin', titre:'Demander son chemin', icone:'🗺️', qui:'Une passante', intro:'Tu cherches la gare. Demande à la passante !', etapes:[
      { dit:'', fr:'',
        bon:'Excuse me, where is the station?',
        faux:[{ en:'Excuse me, where is the gare?', vanne:'« gare » n’est pas anglais : la passante cherche « gare » dans son dictionnaire… On dit « station ». 🚉' },
              { en:'Excuse me, I am lost the station.', vanne:'« I am lost the station » : c’est la gare qui est perdue ? 😂 On demande : where is the station?' }] },
      { dit:'Go straight on, then turn left.', fr:'Va tout droit, puis tourne à gauche.', mode:'comprendre', question:'Qu’est-ce qu’elle t’a dit ?',
        bon:'Tout droit, puis à gauche.',
        faux:[{ en:'Tout droit, puis à droite.', vanne:'« left » = gauche ! En tournant à droite, tu arrives… à la piscine ! 🏊' },
              { en:'Elle aime beaucoup les trains.', vanne:'Elle ne parle pas de ses goûts : écoute encore, avec « straight » et « left ». 🚂' }] },
      { dit:'The station is next to the bank.', fr:'La gare est à côté de la banque.',
        bon:'Thank you very much!',
        faux:[{ en:'Thank you very match!', vanne:'« match », c’est un match de foot ! On dit « much ». ⚽' },
              { en:'You’re welcome!', vanne:'« You’re welcome » = de rien : c’est elle qui t’a aidé, c’est toi qui dis « Thank you! »' }] } ] },
    { id:'diner', titre:'Dîner chez un ami', icone:'🍝', qui:'La maman de Sam', etapes:[
      { dit:'Are you hungry?', fr:'Tu as faim ?',
        bon:'Yes, I’m very hungry!',
        faux:[{ en:'Yes, I have hunger.', vanne:'Le piège ! La faim, on l’EST : « I’m hungry ». 🍽️' },
              { en:'Yes, I am a sandwich.', vanne:'Tu es un sandwich ? Attention, le chien te regarde ! 🥪🐶' }] },
      { dit:'Do you like pasta?', fr:'Tu aimes les pâtes ?',
        bon:'Yes, I love pasta!',
        faux:[{ en:'Yes, I love the pastas!', vanne:'« pasta » ne prend pas de s, et pas besoin de « the » : « I love pasta! » 🍝' },
              { en:'No, I like my bike.', vanne:'Ton vélo ne se mange pas… réponds à la question sur les pâtes ! 🚲' }] },
      { dit:'Would you like some more?', fr:'Tu en veux encore ?',
        bon:'No, thank you. I’m full!',
        faux:[{ en:'No, thank you. I’m complete!', vanne:'« I’m complete » : tu es terminé, comme un puzzle ? 🧩 Quand on n’a plus faim : « I’m full! »' },
              { en:'Yes, I’m nine.', vanne:'Ton âge ne remplit pas l’assiette ! On te demande si tu veux encore des pâtes. 🍝' }] } ] }
  ];

  // ── DICTÉE RIGOLOTE ── Ami dit une phrase, on l'écrit. Beaucoup d'homophones (même son, autre sens).
  const DICTEE = [
    { en:'I can see the sea.', fr:'Je vois la mer.' },
    { en:'My son likes the sun.', fr:'Mon fils aime le soleil.' },
    { en:'I ate eight apples.', fr:'J’ai mangé huit pommes.' },
    { en:'I have two cats, too.', fr:'J’ai deux chats, aussi.' },
    { en:'I know the answer.', fr:'Je connais la réponse.' },
    { en:'Write the right word.', fr:'Écris le bon mot.' },
    { en:'Come here! Can you hear the bird?', fr:'Viens ici ! Tu entends l’oiseau ?' },
    { en:'I have four books for you.', fr:'J’ai quatre livres pour toi.' },
    { en:'The wind blew my blue hat.', fr:'Le vent a soufflé mon chapeau bleu.' },
    { en:'The dog is under the table.', fr:'Le chien est sous la table.' },
    { en:'I would like a cup of tea.', fr:'Je voudrais une tasse de thé.' },
    { en:'Where is my red pen?', fr:'Où est mon stylo rouge ?' },
    { en:'The flower is in the garden.', fr:'La fleur est dans le jardin.' },
    { en:'We meet at nine.', fr:'On se retrouve à neuf heures.' }
  ];
  // Homophones : le sens de chaque mot, pour une vanne qui explique la confusion.
  const SENS = { see:'voir', sea:'la mer', sun:'le soleil', son:'le fils', ate:'a mangé', eight:'huit', two:'deux', too:'aussi', to:'à / vers',
    know:'savoir', no:'non', write:'écrire', right:'juste / à droite', hear:'entendre', here:'ici', four:'quatre', for:'pour',
    blue:'bleu', blew:'a soufflé', flower:'la fleur', flour:'la farine', meet:'se retrouver', meat:'la viande', i:'je', eye:'l’œil',
    by:'par', buy:'acheter', bye:'au revoir', one:'un', won:'a gagné', wood:'le bois', would:'(voudrais)', tea:'le thé', tee:'le tee de golf' };
  const HOMO = [['see', 'sea'], ['sun', 'son'], ['ate', 'eight'], ['two', 'too', 'to'], ['know', 'no'], ['write', 'right'], ['hear', 'here'],
    ['four', 'for'], ['blue', 'blew'], ['flower', 'flour'], ['meet', 'meat'], ['i', 'eye'], ['by', 'buy', 'bye'], ['one', 'won'], ['wood', 'would'], ['tea', 'tee']];
  const SPECIALES = {
    'sea>see':'« sea », c’est la mer ! Ici on voulait « see » (voir)… On ne voit pas avec un maillot de bain ! 🌊👓',
    'see>sea':'« see » = voir. La mer, c’est « sea », avec un A comme… Aquarium ! 🌊',
    'sun>son':'« sun », c’est le soleil ! Ton fils brille, mais pas à ce point ! ☀️ Le fils = « son ».',
    'son>sun':'« son » = le fils. Le soleil, c’est « sun » : un U comme un grand sourire ! ☀️',
    'eight>ate':'« eight » = huit ! Tu as mangé un chiffre ? 8️⃣ « a mangé » = « ate ».',
    'flour>flower':'« flour », c’est la farine ! Une farine dans le jardin, ça fait un gâteau, pas un bouquet ! 🌸',
    'meat>meet':'« meat », c’est la viande ! On se retrouve à neuf heures… pas avec un steak ! 🥩'
  };
  const CONTRACTIONS = { 'i’m':'i am', 'it’s':'it is', 'don’t':'do not', 'can’t':'can not', 'cannot':'can not', 'i’ve':'i have', 'you’re':'you are', 'what’s':'what is', 'where’s':'where is', 'he’s':'he is', 'she’s':'she is' };
  // Mots normalisés : minuscules, apostrophes unifiées, ponctuation retirée, contractions dépliées.
  function mots(t){
    const l = String(t || '').toLowerCase().replace(/['‘`´]/g, '’').replace(/[^a-z0-9’\s-]/g, ' ').split(/\s+/).filter(Boolean);
    return l.flatMap(m => (CONTRACTIONS[m] || m).split(' '));
  }
  function distance(x, y){ const d = Array.from({ length:x.length + 1 }, (_, i) => [i].concat(new Array(y.length).fill(0)));
    for(let j = 1; j <= y.length; j++) d[0][j] = j;
    for(let i = 1; i <= x.length; i++) for(let j = 1; j <= y.length; j++) d[i][j] = Math.min(d[i - 1][j] + 1, d[i][j - 1] + 1, d[i - 1][j - 1] + (x[i - 1] === y[j - 1] ? 0 : 1));
    return d[x.length][y.length]; }
  const proches = (t, j) => HOMO.some(g => g.includes(t) && g.includes(j)) || distance(t, j) <= Math.max(1, Math.floor(j.length / 3));
  // Compare la phrase écrite à la phrase attendue (plus longue sous-suite commune).
  function corriger(attendu, ecrit){
    const a = mots(attendu), b = mots(ecrit), n = a.length, m = b.length;
    const L = Array.from({ length:n + 1 }, () => new Array(m + 1).fill(0));
    for(let i = n - 1; i >= 0; i--) for(let j = m - 1; j >= 0; j--) L[i][j] = a[i] === b[j] ? L[i + 1][j + 1] + 1 : Math.max(L[i + 1][j], L[i][j + 1]);
    const etat = new Array(n).fill(false), erreurs = []; let i = 0, j = 0, enTrop = [];
    while(i < n && j < m){ if(a[i] === b[j]){ etat[i] = true; i++; j++; } else if(L[i + 1][j] >= L[i][j + 1]){ erreurs.push({ attendu:a[i], ecrit:null }); i++; } else { enTrop.push(b[j]); j++; } }
    while(i < n){ erreurs.push({ attendu:a[i], ecrit:null }); i++; }
    while(j < m){ enTrop.push(b[j]); j++; }
    // Associe un mot manquant à un mot écrit en trop seulement s'ils se ressemblent (faute d'orthographe) ou se prononcent pareil.
    for(const e of erreurs){ const k = enTrop.findIndex(t => proches(t, e.attendu)); if(k >= 0) e.ecrit = enTrop.splice(k, 1)[0]; }
    return { juste:erreurs.length === 0 && enTrop.length === 0, mots:a, ok:etat, erreurs, enTrop, score:n ? Math.round(100 * etat.filter(Boolean).length / n) : 0 };
  }
  // Vanne pour une erreur de dictée : homophone (avec le sens), mot oublié, ou orthographe.
  function vanneDictee(e, score){
    if(score !== undefined && score < 50) return 'Oups, Ami a dit une autre phrase ! Réécoute avec 🐢 « Lentement », mot par mot. 👂';
    if(!e) return '';
    const t = e.ecrit, j = e.attendu;
    if(!t) return '« ' + j + ' » a disparu : il s’est caché sous la table ! 🙈';
    if(SPECIALES[t + '>' + j]) return SPECIALES[t + '>' + j];
    if(HOMO.some(g => g.includes(t) && g.includes(j)))
      return '« ' + t + ' » veut dire « ' + (SENS[t] || '?') + ' »… mais ici, c’était « ' + j + ' » (' + (SENS[j] || '?') + ') ! Même son, autre sens : l’anglais adore ces farces. 😜';
    return '« ' + t + ' » ? Presque ! On écrit « ' + j + ' ». Les lettres anglaises adorent jouer à cache-cache ! 🙈';
  }
  const melanger = (l, rnd) => { const o = l.slice(); rnd = rnd || Math.random; for(let i = o.length - 1; i > 0; i--){ const k = Math.floor(rnd() * (i + 1)); [o[i], o[k]] = [o[k], o[i]]; } return o; };
  window.ANGLAIS = { BATTLE, AIE, SITUATIONS, DICTEE, SENS, HOMO, mots, corriger, vanneDictee, melanger };
})();
