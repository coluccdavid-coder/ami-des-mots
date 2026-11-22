// Ami des mots — la blague anglaise du jour : de vraies devinettes anglaises pour enfants, avec le jeu de mots expliqué.
// Comprendre une blague dans une autre langue, c'est un déclic : on apprend un double sens à chaque fois.
(function(){
  const BLAGUES = [
    { q:'Why did the cat sit on the computer?', r:'To keep an eye on the mouse!', fr:'Pourquoi le chat s’est-il assis sur l’ordinateur ? Pour surveiller la souris !', jeu:'« mouse », c’est la souris… et aussi la souris de l’ordinateur ! 🐭🖱️' },
    { q:'Why are fish so clever?', r:'Because they live in schools!', fr:'Pourquoi les poissons sont-ils si malins ? Parce qu’ils vivent dans des écoles !', jeu:'« school » veut dire école… mais aussi banc de poissons ! 🐟🏫' },
    { q:'What has hands but can’t clap?', r:'A clock!', fr:'Qu’est-ce qui a des mains mais ne peut pas applaudir ? Une horloge !', jeu:'En anglais, les aiguilles d’une horloge s’appellent des « hands » (des mains) ! 🕒👏' },
    { q:'Why can’t a bicycle stand up by itself?', r:'Because it’s two tired!', fr:'Pourquoi un vélo ne tient-il pas debout tout seul ? Parce qu’il a deux pneus… euh, il est trop fatigué !', jeu:'« two tyred » (deux pneus) se prononce comme « too tired » (trop fatigué) ! 🚲😴' },
    { q:'What’s orange and sounds like a parrot?', r:'A carrot!', fr:'Qu’est-ce qui est orange et sonne comme un perroquet ? Une carotte !', jeu:'« parrot » (perroquet) et « carrot » (carotte) riment ! 🦜🥕' },
    { q:'What do you call a sleeping dinosaur?', r:'A dino-snore!', fr:'Comment appelle-t-on un dinosaure qui dort ? Un dino-ronfle !', jeu:'« snore » veut dire ronfler : dinosaur → dino-SNORE ! 🦕😴' },
    { q:'What do you call a dog magician?', r:'A labracadabrador!', fr:'Comment appelle-t-on un chien magicien ? Un labracadabrador !', jeu:'Labrador + abracadabra = labracadabrador ! 🐕✨' },
    { q:'Why don’t eggs tell jokes?', r:'They would crack each other up!', fr:'Pourquoi les œufs ne racontent-ils pas de blagues ? Ils se feraient craquer !', jeu:'« crack up » veut dire éclater de rire… et « crack », c’est aussi casser une coquille ! 🥚😂' },
    { q:'What do you call a fish with no eyes?', r:'A fsh!', fr:'Comment appelle-t-on un poisson sans yeux ? Un « psson » !', jeu:'« eye » (œil) se prononce comme la lettre I : enlève le I de fIsh, il reste « fsh » ! 🐟👀' },
    { q:'Why did the music teacher need a ladder?', r:'To reach the high notes!', fr:'Pourquoi la prof de musique avait-elle besoin d’une échelle ? Pour atteindre les notes hautes !', jeu:'« high » veut dire haut… et aussi aigu pour une note de musique ! 🪜🎵' },
    { q:'What room has no doors and no windows?', r:'A mushroom!', fr:'Quelle pièce n’a ni porte ni fenêtre ? Un champignon !', jeu:'« room » = une pièce, et champignon se dit « mushROOM » ! 🍄🚪' },
    { q:'Why was the maths book sad?', r:'Because it had too many problems!', fr:'Pourquoi le livre de maths était-il triste ? Parce qu’il avait trop de problèmes !', jeu:'« problems », ce sont les exercices de maths… et aussi les soucis ! 📘😢' },
    { q:'Where do cows go on holiday?', r:'Moo York!', fr:'Où vont les vaches en vacances ? À Meuh York !', jeu:'New York → « Moo » York : « moo », c’est meuh en anglais ! 🐄🗽' },
    { q:'What do bees chew?', r:'Bumble gum!', fr:'Que mâchent les abeilles ? Du bourdon-gomme !', jeu:'« bubble gum » (chewing-gum) + « bumblebee » (bourdon) = bumble gum ! 🐝' },
    { q:'Why did the banana go to the doctor?', r:'Because it wasn’t peeling well!', fr:'Pourquoi la banane est-elle allée chez le médecin ? Parce qu’elle ne se « pelait » pas bien !', jeu:'« peel » = éplucher ; « not peeling well » sonne comme « not feeling well » (ne pas se sentir bien) ! 🍌🩺' },
    { q:'What do you call a train full of bubble gum?', r:'A chew-chew train!', fr:'Comment appelle-t-on un train plein de chewing-gum ? Un tchou-tchou… mâche-mâche !', jeu:'« choo-choo » = tchou-tchou, et « chew » = mâcher : même son ! 🚂' },
    { q:'What did the sea say to the beach?', r:'Nothing, it just waved!', fr:'Qu’a dit la mer à la plage ? Rien, elle a juste fait coucou !', jeu:'« wave » = une vague… et aussi faire coucou de la main ! 🌊👋' },
    { q:'Why did the scarecrow win a prize?', r:'Because he was outstanding in his field!', fr:'Pourquoi l’épouvantail a-t-il gagné un prix ? Parce qu’il était exceptionnel dans son domaine !', jeu:'« outstanding in his field » = excellent dans son domaine… ou « debout dans son champ » ! 🌾🏆' },
    { q:'Knock, knock! — Who’s there? — Lettuce. — Lettuce who?', r:'Lettuce in, it’s cold out here!', fr:'Toc toc ! — Qui est là ? — Laitue. — Laitue qui ? — Laisse-nous entrer, il fait froid !', jeu:'« lettuce » (laitue) se prononce comme « let us » (laisse-nous) ! 🥬🚪' },
    { q:'What is a cat’s favourite colour?', r:'Purr-ple!', fr:'Quelle est la couleur préférée des chats ? Le ronron-violet !', jeu:'« purr » = ronronner, et « purple » = violet ! 🐱💜' }
  ];
  const jour = d => Math.floor((d || Date.now()) / 864e5);
  // Une blague par jour, la même pour toute la famille ce jour-là.
  const duJour = d => BLAGUES[jour(d) % BLAGUES.length];
  window.BLAGUES_EN = { liste:BLAGUES, duJour };
})();
