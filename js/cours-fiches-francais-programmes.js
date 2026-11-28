// Ami des mots — v10.6 : fiches de cours des chapitres de français ajoutés d'après les programmes officiels.
(function(){
  'use strict';
  const C = window.AMI_COURS; if(!C || !C.ajouter) return;
  const f = (cle, titre, essentiel, enonce, etapes, methode, pieges, vanne) => C.ajouter(cle, { titre, essentiel, exemple:{ enonce, etapes }, methode, pieges, vanne });

  f('francais/pgm-6e', 'Lire en 6e : les cinq entrées du programme',
    ['Récits des origines : mythes grecs (Prométhée, Pandore), Genèse (création, Déluge), Ovide (« Les Métamorphoses »). Ils expliquent le monde.',
     'Poésie : vers, strophe, rime, assonance, personnification, calligramme. On lit et on dit les poèmes à voix haute.',
     'Théâtre « se masquer, jouer, déjouer » : farce médiévale, Molière ; didascalie, aparté, ruse et trompeur trompé.',
     'Récits d’aventure (Robinson, L’Île au trésor, Jules Verne, L’Odyssée) et monstres (Méduse, Minotaure, la Bête) : le héros affronte des épreuves.'],
    'Pourquoi l’aparté est-il utile dans une pièce où un personnage ment ?', ['L’aparté est entendu du public, pas des autres personnages.', 'Le personnage y dit ce qu’il pense vraiment.', 'Le public comprend donc la ruse avant la victime : c’est ce qui fait rire.'],
    ['Pour un récit des origines, demande-toi : qu’est-ce que ce texte explique ?', 'Pour un poème, lis-le à voix haute et repère les sons qui reviennent.'],
    ['Confondre mythe (très ancien, oral, dieux) et conte (merveilleux, « il était une fois »).', 'Confondre l’auteur et le narrateur.'],
    'Plumo a essayé de regarder Méduse dans les yeux pour être poli. Il est resté en statue une heure. Heureusement, c’était une statue très élégante. 🗿');
  f('francais/pgm-5e', 'Lire et dire en 5e : comédie, fables, paroles rapportées',
    ['Comédie : le valet rusé (Scapin) ou l’île où maîtres et esclaves échangent leurs rôles (Marivaux) mettent la société sens dessus dessous.',
     'Quatre comiques : de mots, de gestes, de situation (quiproquo), de caractère.',
     'Fables (La Fontaine) : un récit plaisant + une morale qui instruit.',
     'Discours direct (guillemets) et indirect (« que », pronoms qui changent) ; registres (comique, tragique, lyrique, épique) ; néologismes ; valeurs du présent et de l’imparfait.'],
    'Transforme : Il dit : « Je pars demain. »', ['Verbe introducteur + « que » : Il dit que…', 'Le pronom change : « je » devient « il ».', '« dit » est au présent : le temps ne change pas → Il dit qu’il part demain.'],
    ['Au discours indirect, vérifie trois choses : les pronoms, les temps, les indicateurs de temps.', 'Pour un registre, demande-toi quel effet le texte veut produire sur toi.'],
    ['Garder les guillemets au discours indirect.', 'Oublier de changer « je » en « il » ou « elle ».'],
    'Plumo a voulu jouer Scapin. Il a mis Géronte dans un sac… puis il a oublié lequel. Il a fini par ouvrir le sac de pommes de terre. 🥔');
  f('francais/pgm-4e', 'Lire en 4e : la presse et la ville',
    ['Article de presse : titre, chapeau, intertitres, corps, signature ; on distingue fait (vérifiable) et opinion (jugement).',
     'Vérifier une information : source, date, auteur, recoupement avec d’autres médias fiables ; se méfier des infox.',
     'La ville dans la littérature : Baudelaire (« À une passante »), Zola (« Au Bonheur des Dames »), le roman réaliste et naturaliste.',
     'Langue : discours indirect libre, passé antérieur, subjonctif après « il faut que, je veux que, bien que ».'],
    'Fait ou opinion : « Le musée a accueilli 3 000 visiteurs. C’est la plus belle exposition de la décennie. »', ['Première phrase : un chiffre vérifiable → fait.', 'Seconde phrase : un jugement (« la plus belle ») → opinion.', 'Un bon article signale clairement quand il donne un avis.'],
    ['Cherche toujours qui parle, quand et d’où vient l’information.', 'Au discours indirect après un verbe au passé : présent → imparfait, futur → conditionnel.'],
    ['Prendre une opinion bien écrite pour un fait.', 'Écrire « Il m’a demandé où vas-tu ».'],
    'Plumo a lu sur Internet que les pigeons étaient des drones. Il a recoupé : son cousin pigeon a vérifié qu’il n’avait pas de batterie. 🕊️');
  f('francais/pgm-3e', 'Lire en 3e : se raconter, dénoncer, rêver la science',
    ['Se raconter : autobiographie (auteur = narrateur = personnage, pacte autobiographique), mémoires, journal ; Rousseau, Sarraute.',
     'Dénoncer : Voltaire (« Candide », ironie), Zola (« J’accuse… ! », 1898), Hugo ; l’ironie dit le contraire de ce qu’on pense.',
     'Progrès et rêves scientifiques : Jules Verne, « Frankenstein » (1818) ; les dystopies « 1984 », « Le Meilleur des mondes », « Fahrenheit 451 ».',
     'Utopie = société idéale ; dystopie = société inquiétante qui met en garde.'],
    'Comment repérer l’ironie dans une phrase de Voltaire ?', ['Repère un éloge qui semble trop fort ou décalé.', 'Compare-le avec les faits racontés (souvent cruels).', 'L’écart entre les deux montre ce que Voltaire pense vraiment : il dénonce.'],
    ['Pour une autobiographie, cherche les indices du pacte : prénom de l’auteur, dates réelles.', 'Pour un texte qui dénonce, nomme précisément ce qui est dénoncé.'],
    ['Confondre biographie et autobiographie.', 'Prendre l’ironie au premier degré.'],
    'Plumo a voulu construire un Frankenstein en Lego. La créature a refusé de marcher sans le mode d’emploi. Très raisonnable, finalement. 🧱');
  f('francais/pgm-2nde', 'Seconde : littérature d’idées, poésie du Moyen Âge au XVIIIe siècle, langue',
    ['Poésie : Villon (ballade), Ronsard et Du Bellay (sonnet, Pléiade, « carpe diem »), La Fontaine ; l’alexandrin (12 syllabes, césure).',
     'Littérature d’idées et presse (XIXe-XXIe) : essai, discours, lettre ouverte, tribune, éditorial ; Hugo contre la peine de mort, Zola.',
     'Convaincre (raison, arguments, exemples) et persuader (émotions, images).',
     'Langue : valeurs des temps (passé simple au premier plan, imparfait en arrière-plan) ; lexique (étymologie, polysémie).'],
    'Analyse « Cueillez dès aujourd’hui les roses de la vie » (Ronsard).', ['Impératif « cueillez » : une invitation adressée à la femme aimée.', '« les roses de la vie » : métaphore de la jeunesse et de la beauté.', 'Thème : carpe diem, profiter du présent car le temps passe.'],
    ['Pour un sonnet, repère la volta (le tournant), souvent entre quatrains et tercets.', 'Pour un texte d’idées, formule la thèse en une phrase.'],
    ['Compter les syllabes sans le « e » muet prononcé devant consonne.', 'Confondre thème (de quoi on parle) et thèse (ce qu’on défend).'],
    'Plumo a compté les syllabes de son alexandrin : treize. Il a enlevé une plume pour alléger. Toujours treize. Le « e » muet, lui, ne s’est pas tu. 🪶');
  f('francais/pgm-1re-circ', 'Les subordonnées circonstancielles',
    ['Elles complètent la principale et expriment une circonstance : temps, cause, conséquence, but, concession, condition, comparaison.',
     'Indicatif : cause (parce que, puisque), conséquence (si… que, si bien que), temps réalisé (quand, après que).',
     'Subjonctif : but (pour que, afin que), concession (bien que, quoique), temps non réalisé (avant que, jusqu’à ce que).',
     'Condition : « si » + présent → futur ; « si » + imparfait → conditionnel présent ; « si » + plus-que-parfait → conditionnel passé. Jamais de conditionnel après « si ».'],
    'Donne la nature et la fonction de « bien qu’il soit fatigué » dans « Bien qu’il soit fatigué, il travaille ».', ['Elle commence par une conjonction (« bien que ») et contient un verbe : subordonnée conjonctive.', 'Elle s’oppose à ce qu’on attendrait : circonstancielle de concession.', '« bien que » impose le subjonctif : « soit ».'],
    ['Remplace la subordonnée par un groupe nominal : « malgré sa fatigue » → concession.', 'Pose la question : pourquoi ? dans quel but ? malgré quoi ? à quelle condition ?'],
    ['Écrire « si j’aurais ».', 'Mettre le subjonctif après « après que ».'],
    'Plumo a dit : « Si j’aurais des ailes, je volerais. » Le correcteur a répondu : « Bien que tu en aies, tu fais des fautes. » Touché. 🪽');
})();
