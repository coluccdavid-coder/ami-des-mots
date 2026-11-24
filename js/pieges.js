// Ami des mots — « Les pièges de l'anglais » (pour les francophones qui apprennent l'anglais).
// Chaque piège : une phrase française, LA bonne phrase anglaise, et des erreurs typiques de
// francophones (calques, faux amis). Chaque erreur a SA vanne : elle montre en riant ce
// qu'un anglophone comprendrait, puis la règle. On taquine la confusion, jamais la personne.
// Traductions vérifiées à la main : ne pas en inventer. niv 1 = débutant, 2 = un peu plus loin.
(function(){
  const PIEGES = [
    // — Être ou avoir ? —
    { id:'age', cat:'etre', niv:1, fr:'J’ai 10 ans.', bon:'I am 10 years old.',
      faux:[{ en:'I have 10 years.', vanne:'« I have 10 years » : on dirait que tu gardes 10 années dans ta poche ! 🎒' }],
      regle:'En anglais, on EST son âge : I am 10 (years old).' },
    { id:'chaud', cat:'etre', niv:1, fr:'J’ai chaud.', bon:'I’m hot.',
      faux:[{ en:'I have hot.', vanne:'« I have hot » : tu as quoi, un radiateur dans ton sac ? 🔥' }],
      regle:'Chaud, froid, faim, soif, peur : en anglais, on EST : I’m hot, I’m cold.' },
    { id:'faim', cat:'etre', niv:1, fr:'J’ai faim.', bon:'I’m hungry.',
      faux:[{ en:'I have hunger.', vanne:'« I have hunger » : Plumo fouille ton cartable pour trouver « la faim »… introuvable ! 🦉' },
            { en:'I have hungry.', vanne:'« I have hungry » : « hungry » n’est pas un objet qu’on possède, c’est comme on se sent !' }],
      regle:'J’ai faim = I’m hungry. J’ai soif = I’m thirsty.' },
    { id:'peur', cat:'etre', niv:1, fr:'J’ai peur.', bon:'I’m scared.',
      faux:[{ en:'I have fear.', vanne:'« I have fear » : on dirait que tu as adopté un petit monstre appelé « Fear » ! 👻' }],
      regle:'J’ai peur = I’m scared (ou I’m afraid).' },
    { id:'accord', cat:'etre', niv:1, fr:'Je suis d’accord.', bon:'I agree.',
      faux:[{ en:'I am agree.', vanne:'« I am agree » : Plumo est d’accord… pour dire que ça ne se dit pas ! « agree » est déjà un verbe.' }],
      regle:'« agree » est un verbe : I agree, I don’t agree.' },
    { id:'nom', cat:'etre', niv:1, fr:'Je m’appelle Léa.', bon:'My name is Léa.',
      faux:[{ en:'I call myself Léa.', vanne:'« I call myself Léa » : on dirait que tu te téléphones à toi-même ! 📞 « Allô, Léa ? Oui, c’est Léa. »' }],
      regle:'Pour se présenter : My name is… ou I’m…' },
    { id:'cava', cat:'etre', niv:1, fr:'Comment ça va ?', bon:'How are you?',
      faux:[{ en:'How does it go?', vanne:'« How does it go? » : l’Anglais regarde ton vélo, ta montre, ton bus… Qu’est-ce qui « va » ? 🤔' }],
      regle:'Pour demander des nouvelles : How are you? — I’m fine, thank you!' },
    { id:'beau', cat:'etre', niv:1, fr:'Il fait beau.', bon:'The weather is nice.',
      faux:[{ en:'It makes beautiful.', vanne:'« It makes beautiful » : le ciel fabrique de la beauté en usine ? Joli… mais faux ! ☀️' }],
      regle:'Le temps qu’il fait : The weather is nice. It’s sunny. It’s raining.' },
    { id:'velo', cat:'etre', niv:1, fr:'Je fais du vélo.', bon:'I ride a bike.',
      faux:[{ en:'I make bike.', vanne:'« I make bike » : tu FABRIQUES des vélos ? Bravo l’ingénieur ! 🔧🚲' }],
      regle:'« faire » ne se traduit pas toujours par « make » : I ride a bike, I play football.' },
    // — L'ordre des mots —
    { id:'rouge', cat:'ordre', niv:1, fr:'une voiture rouge', bon:'a red car',
      faux:[{ en:'a car red', vanne:'« a car red » : la pauvre voiture rougit de honte ! 🚗 En anglais, la couleur passe devant.' }],
      regle:'L’adjectif se met AVANT le nom : a red car, a big dog.' },
    { id:'grand', cat:'ordre', niv:1, fr:'un gros chien', bon:'a big dog',
      faux:[{ en:'a dog big', vanne:'« a dog big » : le chien attend son adjectif derrière lui, il tourne en rond ! 🐕' }],
      regle:'L’adjectif se met AVANT le nom : a big dog.' },
    { id:'possessif', cat:'ordre', niv:2, fr:'le chat de Léa', bon:'Léa’s cat',
      faux:[{ en:'the cat of Léa', vanne:'« the cat of Léa » : compris, mais ça sonne comme un vieux grimoire de sorcier ! 📜' }],
      regle:'Pour dire « de quelqu’un », on ajoute ’s : Léa’s cat, my mum’s car.' },
    { id:'question', cat:'ordre', niv:1, fr:'Tu aimes le chocolat ?', bon:'Do you like chocolate?',
      faux:[{ en:'Like you chocolate?', vanne:'« Like you chocolate? » : on dirait un robot qui a perdu ses piles ! 🤖' },
            { en:'You like the chocolate?', vanne:'Presque ! Mais en anglais, les questions démarrent avec un petit mot magique : Do… ✨' }],
      regle:'Les questions commencent souvent par Do / Does : Do you like…?' },
    { id:'negation', cat:'ordre', niv:1, fr:'Je n’ai pas de chat.', bon:'I don’t have a cat.',
      faux:[{ en:'I have not cat.', vanne:'« I have not cat » : le chat est parti, et il a emporté la moitié de la phrase ! 🐈' }],
      regle:'Pour dire « ne… pas » : I don’t + verbe : I don’t have, I don’t like.' },
    // — Les petits mots —
    { id:'an', cat:'petits', niv:1, fr:'un éléphant', bon:'an elephant',
      faux:[{ en:'a elephant', vanne:'« a elephant » : les deux voyelles se cognent, BAM ! 🐘 Devant un son voyelle, « a » devient « an ».' }],
      regle:'Devant un son voyelle : an (an apple, an elephant). Sinon : a (a dog).' },
    { id:'metier', cat:'petits', niv:1, fr:'Il est médecin.', bon:'He is a doctor.',
      faux:[{ en:'He is doctor.', vanne:'Le petit « a » a été oublié : il boude dans un coin de la phrase ! 😤' }],
      regle:'Pour un métier, on met « a » ou « an » : He is a doctor. She is an artist.' },
    { id:'people', cat:'petits', niv:1, fr:'Les gens sont gentils.', bon:'People are nice.',
      faux:[{ en:'People is nice.', vanne:'« People is » : toute la foule proteste ! « People », c’est déjà plein de monde : on dit « are ». 👥' }],
      regle:'« people » est un pluriel : people are.' },
    { id:'info', cat:'petits', niv:2, fr:'J’ai des informations.', bon:'I have some information.',
      faux:[{ en:'I have some informations.', vanne:'« informations » avec un s : en anglais, c’est un gros tas qu’on ne compte pas, jamais de s ! 📚' }],
      regle:'« information » ne prend pas de s : some information.' },
    // — Pluriels rebelles —
    { id:'souris', cat:'pluriel', niv:1, fr:'deux souris', bon:'two mice',
      faux:[{ en:'two mouses', vanne:'« mouses » : les souris anglaises sont vexées, elles se font appeler « mice » ! 🐭🐭' }],
      regle:'Pluriels rebelles : a mouse → two mice, a child → two children.' },
    { id:'dents', cat:'pluriel', niv:1, fr:'mes dents', bon:'my teeth',
      faux:[{ en:'my tooths', vanne:'« tooths » : le dentiste anglais en tombe de sa chaise ! 🦷 On dit « teeth ».' }],
      regle:'a tooth → teeth, a foot → feet.' },
    { id:'enfants', cat:'pluriel', niv:1, fr:'trois enfants', bon:'three children',
      faux:[{ en:'three childs', vanne:'« childs » : les enfants ont mis le bazar dans le mot ! On dit « children ». 🧒🧒🧒' }],
      regle:'a child → children.' },
    // — Faux amis —
    { id:'pain', cat:'fauxamis', niv:1, fr:'Je mange du pain.', bon:'I’m eating bread.',
      faux:[{ en:'I’m eating pain.', vanne:'« pain » en anglais, c’est la douleur ! Manger de la douleur au petit-déjeuner, aïe aïe aïe. 🍞' }],
      regle:'Faux ami : le pain = bread ; « pain » = la douleur.' },
    { id:'coin', cat:'fauxamis', niv:1, fr:'au coin de la rue', bon:'on the corner of the street',
      faux:[{ en:'on the coin of the street', vanne:'« coin » = une pièce de monnaie ! Tu cherches des sous par terre ? 🪙' }],
      regle:'Faux ami : le coin = the corner ; « coin » = une pièce.' },
    { id:'librairie', cat:'fauxamis', niv:1, fr:'Je vais à la librairie acheter un livre.', bon:'I’m going to the bookshop to buy a book.',
      faux:[{ en:'I’m going to the library to buy a book.', vanne:'À la « library » (la bibliothèque), on emprunte les livres… on ne les achète pas ! 📚' }],
      regle:'Faux ami : une librairie = a bookshop ; « library » = une bibliothèque.' },
    { id:'actuellement', cat:'fauxamis', niv:2, fr:'Actuellement, j’habite à Lyon.', bon:'I currently live in Lyon.',
      faux:[{ en:'Actually, I live in Lyon.', vanne:'« Actually » veut dire « en fait » : on dirait que tu avoues un grand secret sur Lyon ! 🤫' }],
      regle:'Faux ami : actuellement = currently / at the moment ; « actually » = en fait.' },
    { id:'sensible', cat:'fauxamis', niv:2, fr:'Elle est très sensible.', bon:'She is very sensitive.',
      faux:[{ en:'She is very sensible.', vanne:'« sensible » en anglais = raisonnable : tu viens de dire qu’elle range sa chambre sans qu’on lui demande ! 🧹' }],
      regle:'Faux ami : sensible = sensitive ; « sensible » = raisonnable.' },
    { id:'raisin', cat:'fauxamis', niv:1, fr:'J’aime le raisin.', bon:'I like grapes.',
      faux:[{ en:'I like raisins.', vanne:'« raisins », ce sont les raisins SECS ! Tout fripés, comme Plumo après le bain. 🍇' }],
      regle:'Faux ami : le raisin = grapes ; « raisins » = les raisins secs.' },
    { id:'monnaie', cat:'fauxamis', niv:2, fr:'Tu as de la monnaie ?', bon:'Do you have any change?',
      faux:[{ en:'Do you have any money?', vanne:'« money », c’est l’argent en général : tu demandes à quelqu’un s’il est riche ! 💰 La petite monnaie = change.' }],
      regle:'La monnaie (les pièces) = change ; « money » = l’argent.' }
  ];
  const CATS = { etre:'Être, avoir ou faire ?', ordre:'L’ordre des mots', petits:'Les petits mots', pluriel:'Les pluriels rebelles', fauxamis:'Les faux amis' };
  // Boîtes de révision (0 à 4) : une erreur ramène en boîte 0, une réussite fait monter d'une boîte.
  const DELAIS = [0, 1, 3, 7, 21];
  const jourNum = d => Math.floor((d || Date.now()) / 864e5);
  function propre(o){
    const r = {}; if(!o || typeof o !== 'object') return r;
    for(const p of PIEGES){ const x = o[p.id]; if(x && Number.isInteger(x.b) && x.b >= 0 && x.b <= 4 && Number.isInteger(x.d)) r[p.id] = { b:x.b, d:x.d }; }
    return r;
  }
  function noter(etat, id, juste, maintenant){
    const x = etat[id] || { b:0, d:0 }, b = juste ? Math.min(4, x.b + 1) : 0;
    etat[id] = { b, d:jourNum(maintenant) + DELAIS[b] }; return etat[id];
  }
  // Une séance : d'abord les pièges dus (les plus fragiles), puis des nouveaux, jamais deux fois le même.
  function seance(etat, n, maintenant, rnd){
    rnd = rnd || Math.random; const auj = jourNum(maintenant);
    const dus = PIEGES.filter(p => etat[p.id] && etat[p.id].d <= auj).sort((a, b) => etat[a.id].b - etat[b.id].b);
    const neufs = PIEGES.filter(p => !etat[p.id]).sort((a, b) => a.niv - b.niv || rnd() - .5);
    const autres = PIEGES.filter(p => etat[p.id] && etat[p.id].d > auj).sort((a, b) => etat[a.id].b - etat[b.id].b);
    return dus.concat(neufs, autres).slice(0, n);
  }
  const maitrises = etat => PIEGES.filter(p => etat[p.id] && etat[p.id].b >= 3).length;
  function options(p, rnd){
    rnd = rnd || Math.random; const o = [p.bon].concat(p.faux.map(f => f.en));
    for(let i = o.length - 1; i > 0; i--){ const j = Math.floor(rnd() * (i + 1)); [o[i], o[j]] = [o[j], o[i]]; }
    return o;
  }
  window.PIEGES = { liste:PIEGES, CATS, propre, noter, seance, maitrises, options, jourNum };
})();
