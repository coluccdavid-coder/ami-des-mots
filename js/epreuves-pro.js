// v5.84 : voie professionnelle — épreuves d'enseignement général du bac professionnel et du CAP.
// Les épreuves professionnelles (propres à chacune des centaines de spécialités) ne sont pas couvertes : leurs sujets ne sont pas publics (sauf CAP).
(function(){
  'use strict';
  const E = window.EPREUVES; if(!E) return;
  const { Q, nb, ent, un } = E.outils;
  const tirer = (r, l, n) => l.slice().sort(() => r() - 0.5).slice(0, n);
  const QS = l => l.map(([q, bon, faux, regle]) => Q(q, bon, faux, regle));
  const bloc = (titre, pts, contexte, l, r, n) => ({ titre, pts, contexte, questions:QS(tirer(r, l, n)) });

  const PSE = [
    ['Le numéro d’urgence européen est :', '112', [['118', 'Ça, ce sont des renseignements. En urgence, c’est le 112.'], ['3615', 'Ça date du Minitel. Plumo a des souvenirs.']], 'Aussi : 15 SAMU, 18 pompiers, 17 police, 114 par SMS pour les personnes sourdes ou malentendantes.'],
    ['Le SAMU se joint au :', '15', [['18', 'Le 18, ce sont les pompiers.'], ['17', 'Le 17, c’est la police.']], 'Urgence médicale : 15.'],
    ['Face à un accident, l’ordre des actions est :', 'Protéger, alerter, secourir', [['Secourir, protéger, alerter', 'D’abord se protéger et protéger les autres, sinon il y a deux victimes.'], ['Alerter, filmer, partir', 'Filmer n’aide personne. Plumo fronce les sourcils.']], 'PAS : protéger, alerter, secourir.'],
    ['Un EPI, c’est :', 'Un équipement de protection individuelle (gants, casque, lunettes…)', [['Un engin de chantier', 'Non : c’est ce qu’on porte pour se protéger.'], ['Une épreuve d’examen', 'Cette réponse est partie faire un tour et elle a oublié de revenir.']], 'Il protège le travailleur d’un risque.'],
    ['Les TMS sont :', 'Des troubles musculosquelettiques liés aux gestes répétés ou aux mauvaises postures', [['Des transports en commun', 'Plumo a vérifié trois fois : c’est toujours non. Mais c’était audacieux.'], ['Des tests médicaux de sport', 'Celle-là, même un GPS en panne ne l’aurait pas choisie.']], 'Première cause de maladie professionnelle en France.'],
    ['Le document unique d’évaluation des risques (DUERP) est obligatoire :', 'Dans toute entreprise qui a au moins un salarié', [['Seulement dans les usines chimiques', 'Toutes les entreprises avec des salariés sont concernées.'], ['Jamais', 'Si, il est obligatoire.']], 'L’employeur doit évaluer les risques.'],
    ['La durée légale du travail en France est de :', '35 heures par semaine', [['48 heures', '48 heures est une durée MAXIMALE, pas la durée légale.'], ['20 heures', 'Bien tenté ! Plumo donne 10 pour le courage et 0 pour le résultat.']], 'Au-delà : heures supplémentaires.'],
    ['Le tri sélectif sert surtout à :', 'Recycler les matériaux et réduire les déchets', [['Remplir plus vite la poubelle', 'Cette réponse a pris le mauvais train. Direction : nulle part, terminus : raté.'], ['Rien du tout', 'Il permet de valoriser les déchets.']], 'Développement durable.'],
    ['Le sommeil est important car il permet :', 'La récupération physique et la mémorisation', [['De grandir de 10 cm par nuit', 'Plumo aimerait bien.'], ['De ne plus jamais manger', 'Plumo a failli tomber de sa branche. Il s’est rattrapé de justesse.']], 'Rythmes biologiques.']
  ];
  function pseConso(r){
    const P = un(r, [60, 1000, 2000]), h = un(r, [2, 5, 10]), prix = un(r, [0.2, 0.25]), kwh = P * h / 1000;
    return { titre:'Consommation et budget', pts:5, contexte:'Un appareil de ' + P + ' W fonctionne ' + h + ' h par jour. Le kWh coûte ' + nb(prix) + ' €.',
      questions:QS([
        ['Énergie consommée par jour ?', nb(kwh, 2) + ' kWh', [[nb(P * h, 0) + ' kWh', 'Ce sont des Wh : divise par 1 000.'], [nb(P / h / 1000, 3) + ' kWh', 'E = P × t.']], 'E = P × t ÷ 1 000.'],
        ['Coût par jour ?', nb(kwh * prix, 2) + ' €', [[nb(kwh + prix, 2) + ' €', 'On multiplie l’énergie par le prix, on n’additionne pas.'], [nb(P * h * prix, 0) + ' €', 'Il faut d’abord des kWh. La facture ferait peur.']], 'Coût = kWh × prix.'],
        ['Coût sur 30 jours ?', nb(kwh * prix * 30, 2) + ' €', [[nb(kwh * prix, 2) + ' €', 'Ça, c’est pour un jour seulement.'], [nb(kwh * prix * 7, 2) + ' €', 'Ça, c’est pour une semaine.']], '× 30.']
      ]) };
  }
  const ECO_DROIT = [
    ['Un CDI est :', 'Un contrat de travail à durée indéterminée', [['Un contrat de 6 mois maximum', 'Ça ressemble plutôt à un CDD.'], ['Un diplôme', 'Réponse originale, ça oui. Juste, pas du tout.']], 'Forme normale du contrat de travail.'],
    ['Un litige entre un salarié et son employeur se règle devant :', 'Le conseil de prud’hommes', [['Le Conseil constitutionnel', 'Lui vérifie les lois, pas les contrats de travail.'], ['La mairie', 'Cette réponse sort tout droit d’un rêve bizarre. Réveille-toi, Plumo t’attend.']], 'Juridiction du travail.'],
    ['La période d’essai permet :', 'À l’employeur et au salarié de vérifier que le poste convient', [['De travailler sans être payé', 'Non : elle est payée.'], ['De ne jamais être embauché', 'Raté ! Mais Plumo garde cette réponse pour son bêtisier préféré.']], 'Rupture plus simple pendant cette période.'],
    ['Une convention collective :', 'Fixe des règles propres à une branche professionnelle', [['Est une fête d’entreprise', 'Là, la réponse a confondu la carte et le territoire. Et la carte était à l’envers.'], ['Remplace le Code du travail', 'Elle le complète, souvent en mieux pour le salarié.']], 'Négociée entre syndicats et employeurs.'],
    ['Une micro-entreprise est :', 'Un régime simplifié pour un entrepreneur individuel', [['Une entreprise de moins de 1 cm', 'Plumo rit, mais non.'], ['Une multinationale', 'Plumo a sorti sa loupe : aucune trace de bonne réponse ici.']], 'Formalités et comptabilité allégées.'],
    ['Le chiffre d’affaires, c’est :', 'Le total des ventes sur une période', [['Le bénéfice', 'Le bénéfice, c’est après avoir retiré les charges.'], ['Le salaire du patron', 'Cette réponse a de l’imagination. Beaucoup trop, même.']], 'CA = prix × quantités vendues.']
  ];
  function gestionFacture(r){
    const ht = un(r, [80, 150, 240, 500]), rem = un(r, [5, 10]), net = ht * (1 - rem / 100);
    return { titre:'Facture et TVA', pts:5, contexte:'Une facture affiche ' + ht + ' € HT, avec une remise de ' + rem + ' %. TVA à 20 %.',
      questions:QS([
        ['Montant net HT après remise ?', nb(net) + ' €', [[nb(ht - rem) + ' €', 'Remise de ' + rem + ' %, pas de ' + rem + ' €.'], [nb(ht * rem / 100) + ' €', 'Ça, c’est le montant de la remise.']], ht + ' × ' + nb(1 - rem / 100) + '.'],
        ['Montant de la TVA ?', nb(net * 0.2) + ' €', [[nb(ht * 0.2) + ' €', 'La TVA se calcule APRÈS la remise.'], ['20 €', 'La TVA est un pourcentage, pas 20 € fixes.']], 'TVA = net HT × 20 %.'],
        ['Montant TTC ?', nb(net * 1.2) + ' €', [[nb(net + 20) + ' €', 'On ajoute 20 %, pas 20 €.'], [nb(net * 0.8) + ' €', 'Ça, c’est une baisse.']], 'TTC = HT × 1,2.']
      ]) };
  }
  const FR_PRO = [
    ['Pour exprimer une opposition, on utilise :', 'Pourtant', [['Donc', 'Donc annonce une conséquence.'], ['De plus', 'De plus ajoute un argument.']], 'Pourtant, cependant, néanmoins…'],
    ['Dans un texte argumentatif, la thèse est :', 'L’opinion que l’auteur défend', [['Un exemple', 'L’exemple illustre un argument.'], ['La conclusion du livre', 'Pas loin… enfin si, très loin. À peu près à l’autre bout du pays.']], 'Thèse → arguments → exemples.'],
    ['« Il court comme le vent. » Procédé ?', 'Une comparaison', [['Une métaphore', 'Il y a « comme » : c’est une comparaison.'], ['Une hyperbole', 'Plumo applaudit l’effort, puis il pose ses ailes sur sa tête.']], 'Outil de comparaison : comme.'],
    ['« Les dossiers que j’ai ___ » :', 'remplis', [['rempli', 'Le COD « que » (les dossiers) est placé avant : accord au masculin pluriel.'], ['remplir', 'Il faut un participe passé.']], 'Accord avec le COD placé avant l’auxiliaire avoir.'],
    ['Un écrit professionnel doit être :', 'Clair, précis et adapté au destinataire', [['Le plus long possible', 'Non : concis.'], ['Écrit en langage SMS', 'Pas au travail, ni à l’examen !']], 'Registre courant ou soutenu.'],
    ['Un personnage de roman qui évolue tout au long du récit suit :', 'Un itinéraire romanesque', [['Une recette', 'Cette réponse mériterait un prix. Le prix de la plus belle sortie de route.'], ['Un sommaire', 'Cette réponse est partie faire un tour et elle a oublié de revenir.']], 'Évolution, épreuves, transformation.']
  ];
  const HG_PRO = [
    ['La Ve République est fondée en :', '1958', [['1945', '1945, c’est la fin de la Seconde Guerre mondiale.'], ['1981', 'Plumo a vérifié trois fois : c’est toujours non. Mais c’était audacieux.']], 'Constitution de 1958.'],
    ['Les femmes votent pour la première fois en France en :', '1945', [['1918', 'Celle-là, même un GPS en panne ne l’aurait pas choisie.'], ['1968', 'Bien tenté ! Plumo donne 10 pour le courage et 0 pour le résultat.']], 'Droit de vote accordé en 1944, premier vote en 1945.'],
    ['Une firme transnationale est :', 'Une entreprise qui a des activités dans plusieurs pays', [['Une petite boutique de quartier', 'Cette réponse a pris le mauvais train. Direction : nulle part, terminus : raté.'], ['Un pays', 'Plumo a failli tomber de sa branche. Il s’est rattrapé de justesse.']], 'Acteur majeur de la mondialisation.'],
    ['Le conteneur a favorisé :', 'La mondialisation des échanges par la mer', [['La fin du commerce', 'C’est l’inverse.'], ['Les voyages dans l’espace', 'Réponse originale, ça oui. Juste, pas du tout.']], 'Transport maritime massifié.'],
    ['La laïcité est fondée sur la loi de :', '1905', [['1789', 'Cette réponse sort tout droit d’un rêve bizarre. Réveille-toi, Plumo t’attend.'], ['1958', 'Raté ! Mais Plumo garde cette réponse pour son bêtisier préféré.']], 'Séparation des Églises et de l’État.'],
    ['L’ONU a été créée en :', '1945', [['1919', 'La SDN, c’était 1919.'], ['1989', 'Là, la réponse a confondu la carte et le territoire. Et la carte était à l’envers.']], 'Pour maintenir la paix.']
  ];
  function mathsPro(r){
    const prix = un(r, [40, 80, 120]), t = un(r, [10, 15, 20]), a = un(r, [3, 6, 5]), b = un(r, [4, 8, 12]), c = Math.sqrt(a * a + b * b), U = un(r, [12, 230]), I = un(r, [2, 5]);
    const l = Array.from({ length:5 }, () => ent(r, 8, 18));
    return { titre:'Mathématiques et physique-chimie', pts:20, contexte:'Situations professionnelles.',
      questions:QS([
        ['Un article à ' + prix + ' € est augmenté de ' + t + ' %. Nouveau prix ?', nb(prix * (1 + t / 100)) + ' €', [[nb(prix + t) + ' €', 'Augmenter de ' + t + ' %, pas de ' + t + ' €.'], [nb(prix * t / 100) + ' €', 'Ça, c’est le montant de la hausse.']], prix + ' × ' + nb(1 + t / 100) + '.'],
        ['Moyenne des notes ' + l.join(' ; ') + ' ?', nb(l.reduce((s, x) => s + x, 0) / 5, 1), [[String(l.reduce((s, x) => s + x, 0)), 'Ça, c’est la somme : divise par 5.'], [String(l[2]), 'Ça, c’est la valeur du milieu de la liste, pas la moyenne.']], 'Somme ÷ effectif.'],
        ['Triangle rectangle de côtés ' + a + ' cm et ' + b + ' cm autour de l’angle droit. Hypoténuse ?', nb(c, 1) + ' cm', [[String(a + b) + ' cm', 'Pythagore utilise les carrés : √(a² + b²).'], [nb(Math.sqrt(Math.abs(b * b - a * a)), 1) + ' cm', 'On ADDITIONNE les carrés pour l’hypoténuse.']], '√(' + a + '² + ' + b + '²).'],
        ['Puissance d’un appareil sous ' + U + ' V parcouru par ' + I + ' A ?', (U * I) + ' W', [[nb(U / I, 1) + ' W', 'P = U × I.'], [String(U + I) + ' W', 'On multiplie.']], 'P = U × I.'],
        ['Une solution a un pH de 3. Elle est :', 'Acide', [['Basique', 'Basique, c’est au-dessus de 7.'], ['Neutre', 'Neutre, c’est 7.']], 'pH < 7 : acide.'],
        ['Fonction f(x) = 2x + 3. f(5) = ?', '13', [['10', 'Et le + 3 ?'], ['25', '2 × 5 + 3, pas 5².']], 'On remplace x par 5.']
      ]) };
  }
  const LV_PRO = [
    ['« Could you send me the invoice? »', 'Pourriez-vous m’envoyer la facture ?', [['Pourriez-vous m’envoyer l’invitation ?', '« Invoice », c’est la facture, pas l’invitation.'], ['Vous avez reçu la facture.', 'C’est une question polie, avec « could ».']], 'Invoice = facture.'],
    ['« The meeting is scheduled for Monday. »', 'La réunion est prévue lundi.', [['La réunion est annulée lundi.', '« Scheduled » = prévu.'], ['La réunion a eu lieu lundi.', 'Non : elle est à venir.']], 'Schedule = planifier.'],
    ['« I look forward to hearing from you. »', 'Dans l’attente de votre réponse.', [['Je regarde devant moi.', 'Expression figée de fin de courrier.'], ['Je vous entends mal.', 'Plumo a sorti sa loupe : aucune trace de bonne réponse ici.']], 'Formule de politesse professionnelle.'],
    ['« Safety first! »', 'La sécurité avant tout !', [['Le salaire d’abord !', 'Safety = sécurité.'], ['Premier secours !', 'Cette réponse a de l’imagination. Beaucoup trop, même.']], 'Consigne de sécurité.']
  ];

  Object.assign(E.EPREUVES, {
    'bp-francais':{ titre:'Bac pro · français', matiere:'francais', duree:'3 h', officiel:'Compréhension, langue et expression écrite', faire:r => [bloc('Lecture, langue et argumentation', 20, '', FR_PRO, r, 6)], nonNote:'Expression écrite argumentée à faire sur papier.' },
    'bp-hgemc':{ titre:'Bac pro · histoire-géographie-EMC', matiere:'histoire', duree:'2 h 30', officiel:'Histoire, géographie, EMC', faire:r => [bloc('Repères et notions', 20, '', HG_PRO, r, 6)] },
    'bp-maths':{ titre:'Bac pro · mathématiques et physique-chimie', matiere:'maths', duree:'épreuves sur support numérique', officiel:'Mathématiques + physique-chimie', faire:r => [mathsPro(r)] },
    'bp-pse':{ titre:'Bac pro · prévention, santé, environnement (PSE)', matiere:'svt', duree:'2 h', officiel:'Santé, risques professionnels, secours, environnement', faire:r => [bloc('Prévention, santé, environnement', 15, '', PSE, r, 6), pseConso(r)] },
    'bp-ecodroit':{ titre:'Bac pro · économie-droit / économie-gestion', matiere:'histoire', duree:'2 h', officiel:'Droit du travail, entreprise, gestion', faire:r => [bloc('Économie et droit', 15, '', ECO_DROIT, r, 5), gestionFacture(r)] },
    'bp-lv':{ titre:'Bac pro · langue vivante (anglais)', matiere:'anglais', duree:'1 h (écrit)', officiel:'Compréhension et expression', faire:r => [bloc('Anglais professionnel', 20, '', LV_PRO, r, 4)] },
    'cap-frhg':{ titre:'CAP · français et histoire-géo-EMC', matiere:'francais', duree:'français écrit 2 h + oraux', officiel:'EG1 : français (écrit et oral), HG-EMC (oral)', faire:r => [bloc('Français', 10, '', FR_PRO, r, 4), bloc('Histoire-géo-EMC', 10, '', HG_PRO, r, 4)] },
    'cap-maths':{ titre:'CAP · mathématiques et physique-chimie', matiere:'maths', duree:'1 h 30', officiel:'EG2 : mathématiques + physique-chimie', faire:r => [mathsPro(r)] },
    'cap-pse':{ titre:'CAP · prévention, santé, environnement', matiere:'svt', duree:'1 h', officiel:'PSE', faire:r => [bloc('Prévention, santé, environnement', 15, '', PSE, r, 5), pseConso(r)] }
  });
  E.BLANCS['bac-pro'] = { titre:'Bac pro blanc (épreuves générales)', ic:'🔧', niveau:'Tle pro', pro:true, epreuves:[['bp-francais', 2.5], ['bp-hgemc', 2.5], ['bp-maths', 2], ['bp-pse', 1], ['bp-ecodroit', 1], ['bp-lv', 2]],
    bilan:'Les coefficients du bac pro varient selon la spécialité ; les épreuves professionnelles (les plus lourdes) sont propres à chaque métier.' };
  E.BLANCS['cap'] = { titre:'CAP blanc (épreuves générales)', ic:'🧰', niveau:'CAP', pro:true, epreuves:[['cap-frhg', 3], ['cap-maths', 2], ['cap-pse', 1]],
    bilan:'Les coefficients peuvent varier selon le CAP ; les épreuves professionnelles sont propres à chaque métier.' };
  if(E.OFFICIEL){
    E.OFFICIEL.annales.push(['Le baccalauréat professionnel', 'https://www.education.gouv.fr/le-baccalaureat-professionnel-9956', 'Épreuves, calendrier, sujets d’enseignement général'],
      ['Le CAP', 'https://www.education.gouv.fr/le-certificat-d-aptitude-professionnelle-cap-9959', 'Épreuves et organisation'],
      ['Base nationale des sujets d’examens de l’enseignement professionnel', 'https://bnseep.eduscol.education.fr/', 'Sujets professionnels (notamment de CAP)']);
  }
})();
