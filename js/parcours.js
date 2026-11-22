// Ami des mots — le parcours d'anglais par niveaux (francophones), les phrases à répéter, « Invente ta vanne ».
// Fonctions pures (testables) : la progression se calcule à partir des compteurs du joueur.
(function(){
  // Chaque étape : un compteur à atteindre et l'activité qui le fait monter.
  const NIVEAUX = [
    { n:1, titre:'Premiers pas', icone:'🌱', etapes:[
      { id:'mots', n:10, texte:'Connaître 10 mots', action:'lecon', icone:'📚' },
      { id:'pieges', n:5, texte:'Déjouer 5 pièges', action:'pieges', icone:'🪤' },
      { id:'situations', n:1, texte:'Réussir 1 situation de la vie', action:'situations', icone:'☕' },
      { id:'histoires', n:1, texte:'Lire 1 histoire', action:'histoires', icone:'📖' },
      { id:'repete', n:3, texte:'Répéter 3 phrases après Ami', action:'repeter', icone:'🎤' } ] },
    { n:2, titre:'Premières phrases', icone:'🌿', etapes:[
      { id:'mots', n:30, texte:'Connaître 30 mots', action:'lecon', icone:'📚' },
      { id:'pieges', n:12, texte:'Déjouer 12 pièges', action:'pieges', icone:'🪤' },
      { id:'situations', n:3, texte:'Réussir 3 situations', action:'situations', icone:'☕' },
      { id:'histoires', n:3, texte:'Lire 3 histoires', action:'histoires', icone:'📖' },
      { id:'dictees', n:5, texte:'Écrire 5 phrases parfaites en dictée', action:'dictee', icone:'✍️' },
      { id:'repete', n:8, texte:'Répéter 8 phrases après Ami', action:'repeter', icone:'🎤' } ] },
    { n:3, titre:'Petites conversations', icone:'🌳', etapes:[
      { id:'mots', n:60, texte:'Connaître 60 mots', action:'lecon', icone:'📚' },
      { id:'pieges', n:22, texte:'Déjouer 22 pièges', action:'pieges', icone:'🪤' },
      { id:'situations', n:5, texte:'Réussir les 5 situations', action:'situations', icone:'☕' },
      { id:'histoires', n:5, texte:'Lire les 5 histoires', action:'histoires', icone:'📖' },
      { id:'dictees', n:12, texte:'Écrire 12 phrases parfaites en dictée', action:'dictee', icone:'✍️' },
      { id:'repete', n:15, texte:'Répéter 15 phrases après Ami', action:'repeter', icone:'🎤' },
      { id:'victoires', n:3, texte:'Gagner 3 battles de vannes', action:'battle', icone:'🎤' } ] }
  ];
  // stats : { mots, pieges, situations, histoires, dictees, repete, victoires } ; valides : niveaux réussis à l'examen.
  function progression(stats, valides){
    valides = Array.isArray(valides) ? valides : [];
    return NIVEAUX.map(niv => {
      const etapes = niv.etapes.map(e => ({ ...e, fait:Math.min(e.n, Math.max(0, Number(stats[e.id]) || 0)), ok:(Number(stats[e.id]) || 0) >= e.n }));
      const ouvert = niv.n === 1 || valides.includes(niv.n - 1);
      return { ...niv, etapes, ouvert, pret:ouvert && etapes.every(e => e.ok), valide:valides.includes(niv.n) };
    });
  }
  const niveauActuel = valides => { let n = 0; for(const v of NIVEAUX) if(valides.includes(v.n)) n = v.n; else break; return n; };

  // Examen d'un niveau : 8 questions à choix (pièges du niveau + répliques des situations). Réussi à 6/8.
  const melanger = (l, rnd) => { const o = l.slice(); rnd = rnd || Math.random; for(let i = o.length - 1; i > 0; i--){ const k = Math.floor(rnd() * (i + 1)); [o[i], o[k]] = [o[k], o[i]]; } return o; };
  function examen(n, P, A, rnd){
    const pieges = P.liste.filter(p => p.niv <= (n === 1 ? 1 : 2)).map(p => ({ consigne:'Comment dit-on en anglais ?', enonce:'🇫🇷 ' + p.fr, bon:p.bon, faux:p.faux, regle:p.regle, dire:p.bon }));
    const repliques = [];
    for(const s of A.SITUATIONS) for(const et of s.etapes) if(et.dit && et.mode !== 'comprendre')
      repliques.push({ consigne:s.icone + ' ' + s.qui + ' te dit :', enonce:'« ' + et.dit + ' »', bon:et.bon, faux:et.faux, regle:'🇫🇷 ' + et.fr, dire:et.bon });
    const q = melanger(pieges, rnd).slice(0, 5).concat(melanger(repliques, rnd).slice(0, 3));
    return melanger(q, rnd);
  }
  const REUSSITE = 6;

  // Phrases utiles à répéter après Ami (enregistrées seulement sur l'appareil, puis effacées).
  const REPETER = [
    { en:'Hello! My name is Léo.', fr:'Bonjour ! Je m’appelle Léo.' },
    { en:'How are you?', fr:'Comment ça va ?' },
    { en:'I’m fine, thank you!', fr:'Ça va bien, merci !' },
    { en:'I am nine years old.', fr:'J’ai neuf ans.' },
    { en:'Can I have a hot chocolate, please?', fr:'Je peux avoir un chocolat chaud, s’il te plaît ?' },
    { en:'Excuse me, where is the station?', fr:'Excusez-moi, où est la gare ?' },
    { en:'Thank you very much!', fr:'Merci beaucoup !' },
    { en:'I don’t understand.', fr:'Je ne comprends pas.' },
    { en:'Can you say that again, please?', fr:'Tu peux répéter, s’il te plaît ?' },
    { en:'I like chocolate, but I don’t like spinach.', fr:'J’aime le chocolat, mais je n’aime pas les épinards.' },
    { en:'I’m hungry!', fr:'J’ai faim !' },
    { en:'Do you want to play football?', fr:'Tu veux jouer au foot ?' },
    { en:'Yes, I’d love to!', fr:'Oui, avec plaisir !' },
    { en:'I have a red bike.', fr:'J’ai un vélo rouge.' },
    { en:'My favourite animal is the owl.', fr:'Mon animal préféré, c’est le hibou.' },
    { en:'It’s raining today.', fr:'Il pleut aujourd’hui.' },
    { en:'Where is the toilet, please?', fr:'Où sont les toilettes, s’il vous plaît ?' },
    { en:'See you tomorrow!', fr:'À demain !' },
    { en:'Happy birthday!', fr:'Joyeux anniversaire !' },
    { en:'Good night, sleep well!', fr:'Bonne nuit, dors bien !' }
  ];

  // « Invente ta vanne » : toutes les combinaisons sont justes en anglais. On taquine Ami, jamais une personne.
  const INVENTE = {
    verbes:[ { en:'dance', fr:'danses' }, { en:'sing', fr:'chantes' }, { en:'run', fr:'cours' }, { en:'sleep', fr:'dors' }, { en:'eat', fr:'manges' } ],
    animaux:[ { en:'a penguin', fr:'un pingouin' }, { en:'a snail', fr:'un escargot' }, { en:'a sleepy cat', fr:'un chat endormi' }, { en:'a happy hippo', fr:'un hippopotame joyeux' }, { en:'a crazy chicken', fr:'une poule folle' } ],
    lieux:[ { en:'on ice skates', fr:'en patins à glace' }, { en:'in a washing machine', fr:'dans une machine à laver' }, { en:'on the moon', fr:'sur la Lune' }, { en:'in a bathtub', fr:'dans une baignoire' }, { en:'at a disco', fr:'en discothèque' } ]
  };
  function inventer(v, a, l){
    const V = INVENTE.verbes[v], An = INVENTE.animaux[a], L = INVENTE.lieux[l];
    if(!V || !An || !L) return null;
    return { en:'Ami, you ' + V.en + ' like ' + An.en + ' ' + L.en + '!', fr:'Ami, tu ' + V.fr + ' comme ' + An.fr + ' ' + L.fr + ' !' };
  }
  window.PARCOURS = { NIVEAUX, progression, niveauActuel, examen, REUSSITE, REPETER, INVENTE, inventer, melanger };
})();
