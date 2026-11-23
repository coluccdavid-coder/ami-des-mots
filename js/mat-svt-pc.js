// Ami des mots — v5.76 : SVT et PHYSIQUE-CHIMIE (collège et lycée).
// Les calculs de physique sont fabriqués et calculés par le jeu (réponses toujours justes) ; le reste vient de banques.
(function(){
  'use strict';
  if(!window.MATIERES) return;
  const nb = x => String(Math.round(x * 1000) / 1000).replace('.', ',');
  const ent = (r, a, b) => a + Math.floor(r() * (b - a + 1));
  // Fabrique une question de calcul : la bonne réponse et trois erreurs classiques, chacune avec sa vanne.
  const calc = (enonce, bon, unite, erreurs, regle) => ({ consigne:'Calcul', enonce, bon:nb(bon) + ' ' + unite, regle,
    faux:erreurs.filter(e => isFinite(e[0]) && Math.abs(e[0] - bon) > 1e-9).map(e => ({ en:nb(e[0]) + ' ' + (e[2] || unite), vanne:e[1] })) });
  const GEN = {
    ohm:r => { const R = [10, 20, 50, 100, 220, 470][ent(r, 0, 5)], I = [0.1, 0.2, 0.5, 0.02, 0.05][ent(r, 0, 4)];
      return calc('Une résistance de ' + R + ' Ω est traversée par un courant de ' + nb(I) + ' A. Quelle est la tension U à ses bornes ?', R * I, 'V',
        [[R / I, 'Tu as divisé R par I. La loi d’Ohm, c’est U = R × I : on multiplie ! Ta tension a explosé le compteur. ⚡'], [I / R, 'I ÷ R ? La formule est U = R × I. Là, ta tension est minuscule, même une pile de montre rigole. 🔋'], [R + I, 'Additionner des ohms et des ampères ? Ça donne des patates et des carottes. U = R × I. 🥕']],
        'Loi d’Ohm : U = R × I (U en volts, R en ohms, I en ampères).'); },
    puissance:r => { const U = [6, 12, 230][ent(r, 0, 2)], I = [0.5, 2, 5, 10][ent(r, 0, 3)];
      return calc('Un appareil fonctionne sous ' + U + ' V et est traversé par ' + nb(I) + ' A. Quelle est sa puissance ?', U * I, 'W',
        [[U / I, 'P = U × I, pas U ÷ I. Ton grille-pain ne chauffe plus. 🍞'], [U + I, 'On multiplie, on n’additionne pas : P = U × I. ⚡'], [U * I * 1000, 'Pourquoi multiplier par 1 000 ? Ton appareil se prend pour une centrale nucléaire. ☢️']],
        'Puissance électrique : P = U × I (en watts).'); },
    vitesse:r => { const d = [100, 150, 240, 360, 600][ent(r, 0, 4)], t = [2, 3, 4, 5][ent(r, 0, 3)];
      return calc('Une voiture parcourt ' + d + ' km en ' + t + ' h. Quelle est sa vitesse moyenne ?', d / t, 'km/h',
        [[d * t, 'd × t ? Ta voiture roule plus vite qu’une fusée. La vitesse, c’est v = d ÷ t. 🚀'], [t / d, 't ÷ d ? Ta voiture avance moins vite qu’un escargot endormi. v = d ÷ t. 🐌'], [d - t, 'Soustraire des km et des heures ? Les unités font la grimace. v = d ÷ t. 😬']],
        'Vitesse moyenne : v = d ÷ t.'); },
    masseVol:r => { const m = [200, 270, 540, 790, 1000][ent(r, 0, 4)], V = [100, 200, 250][ent(r, 0, 2)];
      return calc('Un objet a une masse de ' + m + ' g et un volume de ' + V + ' cm³. Quelle est sa masse volumique ?', m / V, 'g/cm³',
        [[m * V, 'm × V ? Ton objet devient plus lourd qu’une baleine. ρ = m ÷ V. 🐋'], [V / m, 'V ÷ m, c’est l’inverse. ρ = m ÷ V. 🔄'], [m - V, 'On divise, on ne soustrait pas : ρ = m ÷ V. ➗']],
        'Masse volumique : ρ = m ÷ V. L’eau : 1 g/cm³.'); },
    energie:r => { const P = [60, 100, 1000, 2000][ent(r, 0, 3)], t = [2, 3, 5][ent(r, 0, 2)];
      return calc('Un appareil de ' + P + ' W fonctionne pendant ' + t + ' h. Quelle énergie consomme-t-il ?', P * t, 'Wh',
        [[P / t, 'P ÷ t ? Plus il fonctionne longtemps, moins il consomme ? Ton compteur rêve. E = P × t. 💡'], [P + t, 'On multiplie : E = P × t. Additionner des watts et des heures, ça ne se fait pas. ⏱️'], [P * t * 60, 'Pourquoi × 60 ? Ici le temps est déjà en heures. E = P × t en Wh. 🕐']],
        'Énergie : E = P × t (W × h = Wh).'); },
    poids:r => { const m = [2, 5, 10, 50, 70][ent(r, 0, 4)];
      return calc('Quel est le poids, sur Terre, d’un objet de ' + m + ' kg ? (g = 10 N/kg)', m * 10, 'N',
        [[m, 'Ça, c’est la masse, en kg ! Le poids se calcule : P = m × g. ⚖️'], [m / 10, 'Divisé par 10 ? Ton objet flotte comme sur la Lune… en pire. P = m × g. 🌙'], [m + 10, 'On multiplie par g, on n’ajoute pas. 🧮']],
        'Poids : P = m × g (g ≈ 10 N/kg sur Terre). La masse ne change pas, le poids si.'); }
  };
  // [question, bonne, [[mauvaise, vanne]…], explication]
  const CHIMIE = [
    ['Quelle est la formule de l’eau ?', 'H₂O', [['CO₂', 'CO₂, c’est le dioxyde de carbone. Tu bois des bulles de gaz ? 🫧'], ['O₂', 'O₂, c’est le dioxygène qu’on respire. Il manque l’hydrogène. 💨'], ['H₂O₂', 'H₂O₂, c’est l’eau oxygénée. Ne la bois surtout pas. 🚫']], 'Une molécule d’eau : 2 atomes d’hydrogène et 1 atome d’oxygène.'],
    ['Une solution de pH 3 est :', 'acide', [['basique', 'Basique, c’est au-dessus de 7. pH 3, c’est acide comme un citron. 🍋'], ['neutre', 'Neutre, c’est pH 7, comme l’eau pure. 💧'], ['salée', 'Le pH mesure l’acidité, pas le sel. 🧂']], 'pH < 7 : acide ; pH = 7 : neutre ; pH > 7 : basique.'],
    ['Comment s’appelle le passage de l’état liquide à l’état gazeux ?', 'la vaporisation', [['la fusion', 'La fusion, c’est solide → liquide (le glaçon qui fond). 🧊'], ['la condensation', 'La condensation, c’est l’inverse : gaz → liquide. 🔄'], ['la solidification', 'Solidification : liquide → solide. ❄️']], 'Fusion (s→l), vaporisation (l→g), condensation (g→l), solidification (l→s).'],
    ['À quelle température l’eau pure bout-elle (au niveau de la mer) ?', '100 °C', [['0 °C', 'À 0 °C, elle gèle ! Tu as mis ta casserole au congélateur. 🧊'], ['50 °C', 'À 50 °C, ton thé est tiède, pas bouillant. 🍵'], ['212 °C', '212, ce sont des degrés Fahrenheit. Tu t’es trompé de pays. 🇺🇸']], 'L’eau bout à 100 °C et gèle à 0 °C.'],
    ['De quoi est composé le noyau d’un atome ?', 'de protons et de neutrons', [['d’électrons', 'Les électrons tournent AUTOUR du noyau. 🌀'], ['de molécules', 'C’est l’inverse : les molécules sont faites d’atomes. 🔬'], ['de cellules', 'Les cellules, c’est la SVT. Ton atome n’est pas vivant. 🧫']], 'Noyau = protons + neutrons ; les électrons sont autour.'],
    ['Lors d’une transformation chimique, la masse totale :', 'se conserve', [['augmente', 'Rien ne se crée ! Lavoisier : « Rien ne se perd, rien ne se crée, tout se transforme. » ⚗️'], ['diminue', 'Rien ne se perd non plus. La masse se conserve. ⚖️'], ['double', 'Si la masse doublait, on serait tous riches en or. 💰']], 'Conservation de la masse (Lavoisier).']
  ];
  const ELEC = [
    ['Avec quel appareil mesure-t-on une tension ?', 'un voltmètre', [['un ampèremètre', 'L’ampèremètre mesure l’intensité. La tension, c’est le voltmètre. 🔌'], ['un thermomètre', 'Celui-là mesure la température. ⚡≠🌡️'], ['une balance', 'La balance mesure une masse. ⚖️']], 'Tension : voltmètre, branché en dérivation. Intensité : ampèremètre, en série.'],
    ['Dans un circuit en série, si une lampe grille, les autres :', 's’éteignent', [['brillent plus fort', 'Le circuit est coupé : plus de courant pour personne. 💡'], ['continuent de briller', 'Ça, c’est en dérivation. En série, tout s’arrête. 🔦'], ['changent de couleur', 'Joli, mais non. Elles s’éteignent toutes. 🌈']], 'En série, une seule boucle : si elle est ouverte, le courant ne passe plus.'],
    ['L’unité de l’intensité du courant est :', 'l’ampère (A)', [['le volt (V)', 'Le volt, c’est la tension. 🔋'], ['le watt (W)', 'Le watt, c’est la puissance. 💡'], ['l’ohm (Ω)', 'L’ohm, c’est la résistance. 🧱']], 'Intensité en ampères (A), tension en volts (V), résistance en ohms (Ω), puissance en watts (W).']
  ];
  const SVT = [
    ['Quelle est l’unité de base du vivant ?', 'la cellule', [['l’atome', 'L’atome n’est pas vivant. La plus petite unité vivante, c’est la cellule. 🧫'], ['l’organe', 'Un organe est fait de millions de cellules. Trop gros. 🫀'], ['l’ADN', 'L’ADN est DANS la cellule. 🧬']], 'Tous les êtres vivants sont faits de cellules.'],
    ['Où se trouve l’ADN dans une cellule animale ?', 'dans le noyau', [['dans la membrane', 'La membrane entoure la cellule. L’ADN est rangé dans le noyau. 🗄️'], ['dans le cytoplasme seulement', 'Le cytoplasme remplit la cellule, mais l’ADN est dans le noyau. 📦'], ['dans la paroi', 'Les cellules animales n’ont même pas de paroi (les végétales, oui). 🌱']], 'L’ADN (chromosomes) est dans le noyau.'],
    ['Combien de chromosomes possède une cellule humaine (hors cellules reproductrices) ?', '46', [['23', '23, c’est le nombre dans un spermatozoïde ou un ovule. Les autres en ont 46. 🧬'], ['48', '48, c’est le chimpanzé ! Presque cousin. 🐒'], ['12', 'Bien trop peu. 46, soit 23 paires. 🔢']], '46 chromosomes, soit 23 paires.'],
    ['Que fabriquent les plantes grâce à la photosynthèse ?', 'de la matière organique et du dioxygène', [['du dioxyde de carbone', 'C’est l’inverse : elles CONSOMMENT le dioxyde de carbone. 🌿'], ['de l’azote', 'L’azote vient surtout du sol, pas de la photosynthèse. 🪴'], ['de la chaleur seulement', 'Elles fabriquent du sucre et rejettent du dioxygène. ☀️']], 'Photosynthèse : eau + CO₂ + lumière → matière organique + O₂.'],
    ['Quel organe filtre le sang pour fabriquer l’urine ?', 'les reins', [['le foie', 'Le foie fait plein de choses, mais l’urine, ce sont les reins. 🫘'], ['le cœur', 'Le cœur pompe, il ne filtre pas. 💗'], ['les poumons', 'Les poumons échangent des gaz. 🫁']], 'Les reins filtrent environ 180 litres par jour.'],
    ['Quelles cellules défendent l’organisme contre les microbes ?', 'les globules blancs', [['les globules rouges', 'Les globules rouges transportent l’oxygène. Les vigiles, ce sont les blancs. 🛡️'], ['les neurones', 'Les neurones transmettent les messages nerveux. 🧠'], ['les plaquettes', 'Les plaquettes servent à la cicatrisation. 🩹']], 'Les globules blancs (leucocytes) assurent les défenses de l’organisme.'],
    ['Que provoque le déplacement des plaques tectoniques ?', 'des séismes et des volcans', [['les saisons', 'Les saisons viennent de l’inclinaison de la Terre. 🌍'], ['les marées', 'Les marées, c’est surtout la Lune. 🌙'], ['les nuages', 'Les nuages, c’est la météo. ☁️']], 'Les plaques bougent de quelques cm par an : séismes, volcans, montagnes.'],
    ['Quel est le rôle des muscles ?', 'permettre le mouvement en se contractant', [['fabriquer les os', 'Les os se fabriquent tout seuls (enfin, avec du calcium). 🦴'], ['digérer', 'La digestion, c’est le tube digestif. 🍽️'], ['penser', 'C’est le cerveau qui pense. 🧠']], 'Le muscle se contracte et tire sur l’os grâce au tendon.'],
    ['Comment s’appelle l’ensemble des êtres vivants et de leur milieu ?', 'un écosystème', [['un organe', 'Un organe est une partie d’un être vivant. 🫀'], ['une cellule', 'Trop petit ! 🔬'], ['un climat', 'Le climat fait partie du milieu, mais l’ensemble, c’est l’écosystème. 🌳']], 'Écosystème = biotope (milieu) + biocénose (êtres vivants).']
  ];
  const SVT_LYC = [
    ['Comment s’appelle la division cellulaire qui produit les gamètes ?', 'la méiose', [['la mitose', 'La mitose donne deux cellules identiques. Les gamètes, c’est la méiose. 🧬'], ['la photosynthèse', 'Ça, c’est la fabrication de matière par les plantes. 🌿'], ['la fécondation', 'La fécondation réunit deux gamètes déjà formés. 💞']], 'Méiose : 4 cellules à 23 chromosomes à partir d’une cellule à 46.'],
    ['Que transporte l’ARN messager ?', 'une copie de l’information d’un gène', [['de l’oxygène', 'Ça, c’est le rôle de l’hémoglobine. 🫁'], ['des protéines déjà faites', 'Il transporte le PLAN, les protéines sont fabriquées ensuite. 📃'], ['de l’énergie', 'L’énergie, c’est plutôt l’ATP. ⚡']], 'L’ARNm est la copie d’un gène, traduite en protéine dans le cytoplasme.']
  ];
  window.MATIERES.ajouter({ id:'svt', nom:'SVT', ic:'🧬', examens:{},
    chapitres:[
      { id:'vivant', nom:'Le vivant et la cellule', dom:'Le vivant', niv:['6e', '5e', '4e', '3e'], banque:SVT.slice(0, 4).concat(SVT.slice(8)) },
      { id:'corps', nom:'Corps humain et santé', dom:'Corps humain', niv:['5e', '4e', '3e'], banque:SVT.slice(4, 6).concat(SVT.slice(7, 8)) },
      { id:'terre', nom:'La planète Terre', dom:'Terre', niv:['5e', '4e', '3e'], banque:SVT.slice(6, 7).concat(SVT.slice(3, 4)) },
      { id:'genetique', nom:'Génétique', dom:'Le vivant', niv:['3e', '2nde', '1re'], banque:SVT.slice(1, 3).concat(SVT_LYC) }
    ] });
  window.MATIERES.ajouter({ id:'physique', nom:'Physique-chimie', ic:'⚗️', examens:{},
    chapitres:[
      { id:'matiere', nom:'La matière et ses états', dom:'Chimie', niv:['5e', '4e', '3e', '2nde'], banque:CHIMIE },
      { id:'elec', nom:'Électricité', dom:'Physique', niv:['5e', '4e', '3e'], banque:ELEC, gen:r => (r() < .5 ? GEN.ohm : GEN.puissance)(r) },
      { id:'mouvement', nom:'Vitesse et poids', dom:'Physique', niv:['4e', '3e', '2nde'], gen:r => (r() < .5 ? GEN.vitesse : GEN.poids)(r) },
      { id:'energie', nom:'Énergie', dom:'Physique', niv:['3e', '2nde'], gen:GEN.energie },
      { id:'masse-vol', nom:'Masse volumique', dom:'Chimie', niv:['4e', '3e', '2nde'], gen:GEN.masseVol }
    ] });
})();
