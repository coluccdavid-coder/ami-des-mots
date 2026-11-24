// Ami des mots — mini-histoires en anglais (originales, niveau débutant), avec les personnages du village.
// Une phrase à la fois (voix anglaise + traduction cachée), puis 2 questions de compréhension.
// Traductions vérifiées à la main : ne pas en inventer.
(function(){
  const HISTOIRES = [
    { id:'chapeau', titre:'Plumo’s lost hat', fr:'Le chapeau perdu de Plumo', icone:'🎩', niv:1, lignes:[
      ['🦉', 'This is Plumo. Plumo is an owl.', 'Voici Plumo. Plumo est un hibou.'],
      ['🎩', 'Plumo has a big blue hat.', 'Plumo a un grand chapeau bleu.'],
      ['🌬️', 'One day, the wind is very strong.', 'Un jour, le vent est très fort.'],
      ['💨', 'Whoosh! The hat flies away!', 'Fiouu ! Le chapeau s’envole !'],
      ['🐶', 'Paco the dog sees the hat in a tree.', 'Paco le chien voit le chapeau dans un arbre.'],
      ['🐱', 'Mina the cat climbs the tree.', 'Mina la chatte grimpe dans l’arbre.'],
      ['😊', '“Here is your hat, Plumo!”', '« Voici ton chapeau, Plumo ! »'],
      ['🦉', '“Thank you, my friends!” says Plumo.', '« Merci, mes amis ! » dit Plumo.'] ],
      questions:[
        { q:'What colour is Plumo’s hat?', fr:'De quelle couleur est le chapeau de Plumo ?', bon:'Blue.',
          faux:[{ en:'Red.', vanne:'Rouge ? Plumo n’a pas de casque de pompier ! 🚒 Le chapeau est blue (bleu).' },
                { en:'Green.', vanne:'Vert, comme une grenouille ? 🐸 Non : blue (bleu) !' }] },
        { q:'Who climbs the tree?', fr:'Qui grimpe dans l’arbre ?', bon:'Mina.',
          faux:[{ en:'Paco.', vanne:'Paco qui grimpe aux arbres ? Ce serait tout un spectacle ! 🐶 C’est Mina, la chatte.' },
                { en:'Plumo.', vanne:'Plumo est un hibou : il volerait plutôt ! 🦉 C’est Mina qui grimpe.' }] } ] },
    { id:'gateau', titre:'The big cake', fr:'Le gros gâteau', icone:'🎂', niv:1, lignes:[
      ['🎂', 'It’s Léa’s birthday today.', 'C’est l’anniversaire de Léa aujourd’hui.'],
      ['👨‍🍳', 'Milo makes a big chocolate cake.', 'Milo fait un gros gâteau au chocolat.'],
      ['🐶', 'Paco looks at the cake. He is hungry.', 'Paco regarde le gâteau. Il a faim.'],
      ['🚪', 'Milo goes out. The cake is alone…', 'Milo sort. Le gâteau est tout seul…'],
      ['😱', 'When Milo comes back, the cake is small!', 'Quand Milo revient, le gâteau est tout petit !'],
      ['🍫', 'Paco has chocolate on his nose.', 'Paco a du chocolat sur le nez.'],
      ['⚠️', '“Paco! Chocolate is bad for dogs!”', '« Paco ! Le chocolat, c’est mauvais pour les chiens ! »'],
      ['🎉', 'Everybody laughs, and Léa makes a wish.', 'Tout le monde rit, et Léa fait un vœu.'] ],
      questions:[
        { q:'Whose birthday is it?', fr:'C’est l’anniversaire de qui ?', bon:'Léa’s.',
          faux:[{ en:'Milo’s.', vanne:'Milo fait le gâteau, mais ce n’est pas sa fête ! 🎂 C’est l’anniversaire de Léa.' },
                { en:'Paco’s.', vanne:'Paco aimerait bien… surtout pour le gâteau ! 🐶 Mais c’est la fête de Léa.' }] },
        { q:'Who has chocolate on his nose?', fr:'Qui a du chocolat sur le nez ?', bon:'Paco.',
          faux:[{ en:'Milo.', vanne:'Milo est innocent ! 👨‍🍳 Le coupable a quatre pattes : Paco.' },
                { en:'Plumo.', vanne:'Plumo a un bec, pas un nez ! 🦉 C’est Paco.' }] } ] },
    { id:'pluie', titre:'Max and the rain', fr:'Max et la pluie', icone:'☔', niv:1, lignes:[
      ['⏰', 'It’s seven o’clock. Max wakes up.', 'Il est sept heures. Max se réveille.'],
      ['🥣', 'He eats his breakfast: milk and cereal.', 'Il prend son petit-déjeuner : du lait et des céréales.'],
      ['🎒', 'He takes his bag and goes to school.', 'Il prend son sac et va à l’école.'],
      ['🌧️', 'Oh no! It’s raining!', 'Oh non ! Il pleut !'],
      ['☂️', 'Max has no umbrella.', 'Max n’a pas de parapluie.'],
      ['🐄', 'Daisy gives him a big umbrella.', 'Daisy lui donne un grand parapluie.'],
      ['😄', 'Max arrives at school. He is dry and happy.', 'Max arrive à l’école. Il est au sec et content.'] ],
      questions:[
        { q:'What does Max eat?', fr:'Que mange Max ?', bon:'Milk and cereal.',
          faux:[{ en:'Pizza.', vanne:'De la pizza au petit-déjeuner ? Max en rêve ! 🍕 Mais c’est milk and cereal.' },
                { en:'A chocolate cake.', vanne:'Le gâteau, c’est dans l’autre histoire… et Paco l’a mangé ! 🎂' }] },
        { q:'What’s the weather like?', fr:'Quel temps fait-il ?', bon:'It’s raining.',
          faux:[{ en:'It’s sunny.', vanne:'Avec du soleil, pas besoin de parapluie ! ☀️ Il pleut : it’s raining.' },
                { en:'It’s snowing.', vanne:'De la neige ? Max ferait un bonhomme de neige au lieu d’aller à l’école ! ⛄' }] } ] },
    { id:'tresor', titre:'Captain Finn’s treasure', fr:'Le trésor de Captain Finn', icone:'🗺️', niv:2, lignes:[
      ['🏴‍☠️', 'Captain Finn has a treasure map.', 'Captain Finn a une carte au trésor.'],
      ['🗺️', '“The treasure is under the big tree,” he says.', '« Le trésor est sous le grand arbre », dit-il.'],
      ['🌳', 'He digs under the big tree. Nothing!', 'Il creuse sous le grand arbre. Rien !'],
      ['🏠', 'He looks behind the house. Nothing!', 'Il regarde derrière la maison. Rien !'],
      ['🦉', 'Plumo flies next to him. “Turn the map, Captain!”', 'Plumo vole à côté de lui. « Tourne la carte, capitaine ! »'],
      ['🙃', 'The map is upside down!', 'La carte est à l’envers !'],
      ['🌱', 'The treasure is under the small tree.', 'Le trésor est sous le petit arbre.'],
      ['📚', 'Inside the box, there are… books!', 'Dans la boîte, il y a… des livres !'] ],
      questions:[
        { q:'Where is the treasure?', fr:'Où est le trésor ?', bon:'Under the small tree.',
          faux:[{ en:'Under the big tree.', vanne:'C’est ce que croyait Captain Finn… avec la carte à l’envers ! 🙃 Under the SMALL tree.' },
                { en:'Behind the house.', vanne:'Derrière la maison, il n’a rien trouvé ! 🏠 Le trésor est under the small tree.' }] },
        { q:'What is in the box?', fr:'Qu’y a-t-il dans la boîte ?', bon:'Books.',
          faux:[{ en:'Gold coins.', vanne:'Des pièces d’or ? Le vrai trésor, ici, ce sont des livres ! 📚' },
                { en:'Cakes.', vanne:'Des gâteaux ? Paco serait déjà passé par là ! 🐶 Ce sont des livres.' }] } ] },
    { id:'concert', titre:'The village concert', fr:'Le concert du village', icone:'🎤', niv:2, lignes:[
      ['🎤', 'Tonight, there is a concert in the village.', 'Ce soir, il y a un concert au village.'],
      ['🎸', 'Zoé plays the guitar.', 'Zoé joue de la guitare.'],
      ['🥁', 'Bob plays the drums. Boom, boom!', 'Bob joue de la batterie. Boum, boum !'],
      ['🦉', 'Plumo wants to sing too.', 'Plumo veut chanter, lui aussi.'],
      ['🙉', 'But Plumo sings very, very badly.', 'Mais Plumo chante très, très mal.'],
      ['🐶', 'Paco covers his ears. Mina runs away!', 'Paco se bouche les oreilles. Mina s’enfuit !'],
      ['👏', 'At the end, everybody claps. Plumo is so happy!', 'À la fin, tout le monde applaudit. Plumo est si content !'] ],
      questions:[
        { q:'What does Bob play?', fr:'De quoi joue Bob ?', bon:'The drums.',
          faux:[{ en:'The guitar.', vanne:'La guitare, c’est Zoé ! 🎸 Bob, lui, fait boum boum : the drums.' },
                { en:'Football.', vanne:'Un match pendant le concert ? Plumo serait jaloux ! ⚽ Bob joue de la batterie : the drums.' }] },
        { q:'How does Plumo sing?', fr:'Comment chante Plumo ?', bon:'Very badly.',
          faux:[{ en:'Very well.', vanne:'Very well ? Demande donc à Mina pourquoi elle s’est enfuie ! 🐱 Plumo chante very badly.' },
                { en:'Very blue.', vanne:'Chanter « bleu » ? Joli, mais ça ne veut rien dire ! 💙 Plumo chante very badly.' }] } ] }
  ];
  window.HISTOIRES = { liste:HISTOIRES };
})();
