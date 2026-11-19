// Ami des mots — les habitants anglophones du village 3D.
// Chacun se présente en anglais (phrase simple + traduction), puis pose un mini-défi sur un mot.
// Personnages : pack Quaternius (CC0). Traductions vérifiées à la main : ne pas en inventer.
(function(){
  const METIERS = [
    { id:'teacher', corps:'Suit_Female', nom:'Mrs Taylor', emoji:'👩‍🏫', x:12.5, z:-11.5,
      en:'Hello! I’m a teacher. I work at the school.', fr:'Bonjour ! Je suis professeure. Je travaille à l’école.',
      mot:{ en:'teacher', fr:'professeur', e:'👩‍🏫' } },
    { id:'doctor', corps:'Doctor_Female_Young', nom:'Doctor Lee', emoji:'🩺', x:-11.5, z:7.5,
      en:'Hi! I’m a doctor. I help people when they are ill.', fr:'Salut ! Je suis médecin. J’aide les gens quand ils sont malades.',
      mot:{ en:'doctor', fr:'médecin', e:'🩺' } },
    { id:'farmer', corps:'Cowboy_Male', nom:'Farmer Joe', emoji:'🧑‍🌾', x:22.5, z:0,
      en:'Hello! I’m a farmer. I grow vegetables.', fr:'Bonjour ! Je suis agriculteur. Je fais pousser des légumes.',
      mot:{ en:'farmer', fr:'agriculteur', e:'🧑‍🌾' } },
    { id:'builder', corps:'Worker_Male', nom:'Bob', emoji:'👷', x:14.5, z:24,
      en:'Hi! I’m a builder. I build houses.', fr:'Salut ! Je suis ouvrier du bâtiment. Je construis des maisons.',
      mot:{ en:'house', fr:'maison', e:'🏠' } },
    { id:'granny', corps:'OldClassy_Female', nom:'Granny Rose', emoji:'👵', x:-14, z:22,
      en:'Hello, dear! I’m a grandmother. I love telling stories.', fr:'Bonjour, mon petit ! Je suis grand-mère. J’adore raconter des histoires.',
      mot:{ en:'grandmother', fr:'grand-mère', e:'👵' } },
    { id:'pirate', corps:'Pirate_Male', nom:'Captain Finn', emoji:'🏴‍☠️', x:11.5, z:-27,
      en:'Ahoy! I’m a pirate. I’m looking for treasure.', fr:'Ohé ! Je suis pirate. Je cherche un trésor.',
      mot:{ en:'treasure', fr:'trésor', e:'💰' } },
    { id:'wizard', corps:'Wizard', nom:'Wizard Pip', emoji:'🧙', x:-22, z:-12,
      en:'Hello! I’m a wizard. Look at my magic hat!', fr:'Bonjour ! Je suis magicien. Regarde mon chapeau magique !',
      mot:{ en:'hat', fr:'chapeau', e:'🎩' } },
    { id:'cow', corps:'Cow', nom:'Daisy', emoji:'🐄', x:22.5, z:21,
      en:'Moo! I’m a cow… well, a friend in a cow costume. Cows give milk.', fr:'Meuh ! Je suis une vache… enfin, une amie déguisée en vache. Les vaches donnent du lait.',
      mot:{ en:'milk', fr:'lait', e:'🥛' } }
  ];
  // Vannes : on taquine la confusion, jamais la personne. {f} = mot choisi, {j} = bon mot, {n} = habitant.
  const VANNES = [
    '« {f} » ? {n} sourit : presque ! Le mot, c’est « {j} ».',
    'Oups, « {f} », c’est le mot d’un autre habitant ! Ici, on dit « {j} ».',
    '« {f} » ? Bonne idée… pour une autre histoire. Ici, c’est « {j} ».',
    '{n} fait semblant de chercher « {f} » partout… mais c’était « {j} » !'
  ];
  const tirer = (liste, rnd) => liste[Math.floor((rnd || Math.random)() * liste.length)];
  // Un défi : « Comment dit-on {fr} en anglais ? » avec 3 choix (le bon + 2 mots d'autres habitants).
  function quiz(id, rnd){
    const m = METIERS.find(x => x.id === id); if(!m) return null;
    const autres = METIERS.filter(x => x.id !== id).map(x => x.mot.en);
    const choix = [m.mot.en];
    while(choix.length < 3){ const o = tirer(autres, rnd); if(!choix.includes(o)) choix.push(o); }
    for(let i = choix.length - 1; i > 0; i--){ const j = Math.floor((rnd || Math.random)() * (i + 1)); [choix[i], choix[j]] = [choix[j], choix[i]]; }
    return { question:'Comment dit-on « ' + m.mot.fr + ' » en anglais ?', choix, bonne:m.mot.en };
  }
  function vanne(id, faux, rnd, sauf){
    const m = METIERS.find(x => x.id === id); if(!m) return '';
    const l = VANNES.filter(v => v !== sauf);
    const v = tirer(l.length ? l : VANNES, rnd);
    return { modele:v, texte:v.replace('{f}', faux).replace('{j}', m.mot.en).replace(/\{n\}/g, m.nom) };
  }
  window.METIERS = { liste:METIERS, quiz, vanne, VANNES };
})();
