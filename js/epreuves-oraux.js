// v5.83 : les épreuves orales (oral du brevet, oral de français, Grand oral) + l'espace « Officiel » : liens vers tous les programmes et toutes les annales.
// Les oraux ne peuvent pas être notés par l'appli (c'est une prise de parole) : l'appli entraîne le déroulé, les attendus et la méthode.
(function(){
  'use strict';
  const E = window.EPREUVES; if(!E) return;
  const { Q } = E.outils;
  const tirer = (r, l, n) => l.slice().sort(() => r() - 0.5).slice(0, n);
  const bloc = (titre, pts, contexte, l, r, n) => ({ titre, pts, contexte, questions:tirer(r, l, n).map(([q, bon, faux, regle]) => Q(q, bon, faux, regle)) });

  const ORAL_DNB = [
    ['Combien de temps dure l’oral du brevet quand on le passe seul ?', '15 minutes : 5 min d’exposé et 10 min d’entretien', [['1 heure', 'Plumo t’imagine en train de parler une heure… le jury aussi a envie de goûter.'], ['5 minutes en tout', 'Les 5 minutes, c’est seulement l’exposé. Il reste 10 minutes d’échange.']], 'En groupe : 25 minutes (10 min d’exposé, 15 min d’entretien).'],
    ['Depuis 2026, l’oral du brevet est noté :', 'Sur 20 : maîtrise de l’expression orale et maîtrise du sujet', [['Sur 800 points', 'Le système sur 800 points a disparu en 2026.'], ['Il n’est pas noté', 'Si : c’est une vraie épreuve, coefficient 2.']], 'Expression orale 8 points, sujet 12 points.'],
    ['Sur quoi peut porter l’oral du brevet ?', 'Un projet mené pendant l’année (histoire des arts, parcours, projet interdisciplinaire…)', [['Un sujet tiré au sort le jour même', 'C’est l’élève qui choisit son sujet à l’avance.'], ['Uniquement les maths', 'Non : le sujet vient d’un projet de l’année.']], 'Le sujet est choisi par l’élève.'],
    ['Pendant l’exposé, il vaut mieux :', 'Regarder le jury et s’appuyer sur quelques notes', [['Lire un texte rédigé mot à mot', 'Lire en entier, c’est la meilleure façon de perdre le jury. Et la ligne.'], ['Parler le plus vite possible', 'Le jury n’est pas un chronomètre.']], 'Contact visuel, notes courtes, voix posée.'],
    ['Peut-on présenter l’oral du brevet en langue étrangère ?', 'Oui, en partie ou en totalité', [['Non, c’est interdit', 'C’est autorisé (sans bonus de points).'], ['Seulement en latin', 'Plumo adore le latin, mais non.']], 'Possible en LV1 ou LV2.']
  ];
  const ORAL_EAF = [
    ['L’oral de français dure :', '20 minutes, après 30 minutes de préparation', [['2 heures', 'Ce serait une conférence. Le jury s’endormirait.'], ['5 minutes', 'Bien plus : 20 minutes.']], 'Coefficient 5.'],
    ['La première partie de l’oral de français comprend :', 'L’explication linéaire d’un extrait étudié et une question de grammaire', [['Une dictée', 'Pas de dictée au lycée.'], ['Un QCM', 'Non : c’est une explication orale.']], 'Partie 1 sur 12 points.'],
    ['La question de grammaire porte :', 'Sur un passage de l’extrait expliqué', [['Sur tout le programme de seconde au hasard', 'Elle porte sur l’extrait.'], ['Sur l’orthographe de son nom', 'Plumo rit, mais non.']], 'Analyse syntaxique : négation, interrogation, subordonnées…'],
    ['La deuxième partie de l’oral de français, c’est :', 'La présentation d’une œuvre choisie puis un entretien avec l’examinateur', [['Une deuxième explication de texte', 'Non : c’est un entretien sur une œuvre.'], ['Un exposé sur sa vie', 'Cette réponse est partie faire un tour et elle a oublié de revenir.']], 'Partie 2 sur 8 points.'],
    ['Une explication linéaire suit :', 'L’ordre du texte, mouvement par mouvement', [['L’ordre alphabétique des mots', 'Créatif, mais faux.'], ['Seulement la fin du texte', 'Il faut tout le passage, dans l’ordre.']], 'Introduction, lecture, mouvements, conclusion.']
  ];
  const GRAND_ORAL = [
    ['Le Grand oral dure :', '20 minutes, après 20 minutes de préparation', [['1 heure', 'Plumo a vérifié trois fois : c’est toujours non. Mais c’était audacieux.'], ['10 minutes', 'Plus que ça : 20 minutes.']], 'Depuis la session 2027 : présentation d’une question (10 min) puis échange avec le jury (10 min).'],
    ['Sur quoi portent les questions du Grand oral ?', 'Sur une ou deux spécialités suivies en terminale', [['Sur la philosophie uniquement', 'Non : sur les spécialités.'], ['Sur n’importe quel sujet du jour', 'Le candidat prépare deux questions à l’avance.']], 'Le jury choisit l’une des deux questions.'],
    ['Pendant la présentation de la question, le candidat :', 'Parle sans notes, debout en général', [['Lit sa copie', 'Pas de lecture : on parle à l’oral, vraiment.'], ['Montre un film', 'Celle-là, même un GPS en panne ne l’aurait pas choisie.']], 'Environ 10 minutes depuis la session 2027 (5 minutes avant). Le support éventuel n’est pas évalué.'],
    ['Depuis la session 2027, le Grand oral se déroule en :', 'Deux temps de 10 minutes : la présentation d’une question, puis l’échange avec le jury', [['Trois temps, avec un échange final sur le projet d’orientation', 'C’était la règle jusqu’à la session 2026 : ce troisième temps a été supprimé.'], ['Un seul exposé de 20 minutes, sans question du jury', 'Le jury échange bien avec toi pendant 10 minutes.']], 'Note de service du 17 septembre 2026 (BO spécial n° 4).'],
    ['Coefficient du Grand oral en voie générale à partir de la session 2027 :', '8', [['10', '10, c’était jusqu’à la session 2026 incluse.'], ['16', '16, c’est une spécialité.']], 'Et 12 en voie technologique (14 jusqu’en 2026).']
  ];
  Object.assign(E.EPREUVES, {
    'dnb-oral':{ titre:'Oral du brevet', matiere:'francais', duree:'15 min (5 + 10)', officiel:'Noté sur 20 : expression orale 8 pts, maîtrise du sujet 12 pts',
      faire:r => [bloc('Déroulé et attendus', 20, '', ORAL_DNB, r, 5)], nonNote:'Entraîne-toi à voix haute : présente ton projet en 5 minutes chrono, devant quelqu’un.' },
    'eaf-oral':{ titre:'Oral de français', matiere:'francais', duree:'20 min, préparation 30 min', officiel:'Explication + grammaire (12 pts), œuvre choisie + entretien (8 pts)',
      faire:r => [bloc('Déroulé et méthode', 20, '', ORAL_EAF, r, 5)], nonNote:'Entraîne-toi à expliquer un extrait à voix haute en 10 minutes.' },
    'grand-oral':{ titre:'Grand oral', matiere:'francais', duree:'20 min, préparation 20 min', officiel:'Session 2027 : présentation d’une question (10 min) puis échange avec le jury (10 min) · coefficient 8',
      faire:r => [bloc('Déroulé et méthode', 20, '', GRAND_ORAL, r, 5)], nonNote:'Prépare tes deux questions et entraîne-toi à en présenter une sans notes en 10 minutes.' }
  });
  E.BLANCS['oral-dnb'] = { titre:'Oral du brevet', ic:'🎤', niveau:'3e', epreuves:[['dnb-oral', 1]] };
  E.BLANCS['oral-eaf'] = { titre:'Oral de français', ic:'🎤', niveau:'1re', epreuves:[['eaf-oral', 1]] };
  E.BLANCS['grand-oral'] = { titre:'Grand oral', ic:'🎤', niveau:'Tle', epreuves:[['grand-oral', 1]] };
  // Le brevet blanc complet ajoute l'oral (coefficient 2), comme le vrai DNB : quatre écrits et un oral.
  if(E.BLANCS.brevet && !E.BLANCS.brevet.epreuves.some(p => p[0] === 'dnb-oral')) E.BLANCS.brevet.epreuves.push(['dnb-oral', 2]);

  // ───── Espace « Officiel » : programmes et annales (liens vérifiés vers les sites du ministère) ─────
  E.OFFICIEL = {
    programmes:[
      ['Collège · cycle 3 (6e)', 'https://eduscol.education.gouv.fr/4356/enseigner-au-cycle-3', 'Français et maths : BO n° 16 du 17 avril 2025'],
      ['Collège · cycle 4 (5e, 4e, 3e)', 'https://eduscol.education.gouv.fr/4362/enseigner-au-cycle-4', 'Français et maths : BO n° 10 du 5 mars 2026 (5e en 2026, 4e en 2027, 3e en 2028) ; autres matières : BO n° 31 du 30 juillet 2020'],
      ['Lycée général et technologique', 'https://eduscol.education.gouv.fr/4368/enseigner-au-lycee-generaltechnologique', 'Tous les programmes, matière par matière'],
      ['Voie générale : spécialités', 'https://eduscol.education.gouv.fr/5418/cycle-terminal-de-la-voie-generale', 'Les spécialités de première et de terminale'],
      ['Mathématiques au lycée', 'https://eduscol.education.gouv.fr/1723/programmes-et-ressources-en-mathematiques-voie-gt', 'Nouveaux programmes : BO du 2 avril 2026'],
      ['Langues vivantes au lycée', 'https://eduscol.education.gouv.fr/1726/programmes-et-ressources-en-langues-vivantes-voie-gt', 'BO n° 22 du 29 mai 2025'],
      ['SVT au lycée', 'https://eduscol.education.gouv.fr/5835/programmes-et-ressources-en-sciences-de-la-vie-et-de-la-terre-voie-gt', 'Seconde, spécialité de première et de terminale'],
      ['Bac technologique : les séries', 'https://eduscol.education.gouv.fr/4539/baccalaureat-technologique', 'STMG, STI2D, ST2S, STL, STD2A, STHR, S2TMD']
    ],
    annales:[
      ['Annales du brevet (depuis 2018)', 'https://eduscol.education.gouv.fr/5202/preparer-le-diplome-national-du-brevet-dnb-avec-les-sujets-des-annales', 'Tous les sujets officiels, par session et par matière'],
      ['Annales du bac général et technologique (depuis 2021)', 'https://eduscol.education.gouv.fr/5199/annales-des-epreuves-du-baccalaureat-des-voies-generale-et-technologique', 'Français, philosophie, spécialités, maths anticipées'],
      ['Tous les sujets 2026', 'https://www.education.gouv.fr/brevet-bac-et-cap-les-sujets-des-examens-2026-504911', 'Brevet, bac et CAP, session 2026'],
      ['Les épreuves du brevet', 'https://eduscol.education.gouv.fr/716/les-epreuves-du-dnb', 'Définition officielle des épreuves'],
      ['Les épreuves terminales du bac général', 'https://eduscol.education.gouv.fr/5706/les-epreuves-terminales-du-baccalaureat-general', 'Coefficients, durées, nature'],
      ['Les épreuves terminales du bac technologique', 'https://eduscol.education.gouv.fr/5616/les-epreuves-terminales-du-baccalaureat-technologique', 'Deux spécialités par série, coefficient 16'],
      ['Le Grand oral', 'https://eduscol.education.gouv.fr/729/presentation-du-grand-oral', 'Déroulé et coefficients'],
      ['BO spécial n° 4 du 17 septembre 2026', 'https://www.education.gouv.fr/bo/2026/Special4', 'Nouvelles définitions : brevet 2027, Grand oral, philosophie, épreuves anticipées']
    ]
  };
})();
