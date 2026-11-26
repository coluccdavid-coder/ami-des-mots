// Ami des mots — v6.19 : chaque sujet à sa place. Les chapitres « Par thème » rassemblent TOUTES les questions
// d'un même sujet (une guerre, une époque, la géographie…) qui étaient dispersées dans les chapitres de révision.
// Rien n'est supprimé : les questions restent aussi dans leur chapitre d'origine. Les traductions suivent
// automatiquement, question par question, dès que tous les morceaux du thème sont traduits dans la langue.
(function(){
  'use strict';
  const M = window.MATIERES; if(!M) return;
  const NIV = M.NIVEAUX;
  // refs : [[chapitre, [indices…]], …] ; un indice absent = tout le chapitre.
  function ajouterThemes(mid, domFr, themes, noms){
    const m = M.trouver(mid); if(!m) return;
    const nouveaux = [];
    for(const t of themes){
      // v6.64 / v6.67 / v6.68 : les questions ajoutées au lycée (SVT, physique, histoire-géo) (indices 10 à 19) sont rangées dans leurs thèmes.
      // v6.58 : une même question (même énoncé) n'entre qu'une fois dans un thème, même si un cours de l'année la reprend.
      const parts = [], vus = new Set();
      for(const [cid, idx] of t.refs){ const ch = m.chapitres.find(c => c.id === cid && c.banque); if(!ch) continue;
        (idx || ch.banque.map((_, i) => i)).forEach(i => { const q = ch.banque[i]; if(q && !vus.has(q[0])){ vus.add(q[0]); parts.push([ch, i]); } }); }
      if(!parts.length) continue;
      const nivQ = parts.map(([ch, i]) => ((ch.nivQ && ch.nivQ[i]) || ch.niv).slice());
      const niv = NIV.filter(n => nivQ.some(v => v.includes(n)));
      // v6.29 : chaque question garde les classes de son chapitre d'origine (nivQ) : une série de 6e ne pioche plus dans les questions de 3e ou du lycée.
      nouveaux.push({ id:t.id, nom:t.nom, dom:domFr, niv, theme:true, banque:parts.map(([ch, i]) => ch.banque[i]), nivQ, _parts:parts });
    }
    m.chapitres = nouveaux.concat(m.chapitres.filter(c => !nouveaux.some(n => n.id === c.id)));
    // Traductions : calculées à la demande, pour suivre les fichiers de traduction quel que soit leur ordre de chargement.
    const ML = window.MATIERES_LANGUES || (window.MATIERES_LANGUES = {});
    for(const l of Object.keys(ML)){
      const d = ML[l]; d.q = d.q || {}; d.noms = d.noms || {};
      for(const ch of nouveaux){
        Object.defineProperty(d.q, mid + '/' + ch.id, { configurable:true, enumerable:false, get(){
          const out = ch._parts.map(([c, i]) => { const t = d.q[mid + '/' + c.id]; return t && t.length === c.banque.length ? t[i] : null; });
          return out.every(Boolean) ? out : undefined; } });
      }
      const n = noms[l]; if(n){ const x = d.noms[mid] = d.noms[mid] || { dom:{}, ch:{} }; x.dom = x.dom || {}; x.ch = x.ch || {};
        x.dom[domFr] = n.dom; for(const k in n.ch) x.ch[k] = n.ch[k]; }
    }
  }
  M.ajouterThemes = ajouterThemes;

  // ───── Histoire-géographie & EMC ─────
  ajouterThemes('histoire', 'Par thème', [
    { id:'th-antiquite', nom:'L’Antiquité et les premiers humains', refs:[['antiquite'], ['r-h6', [0, 2, 3, 4]], ['cours-h6'], ['cpl-h6-hebreux'], ['cours-hg2', [12, 13]]] },
    { id:'th-moyen-age', nom:'Le Moyen Âge', refs:[['moyen-age', [0, 2, 4, 5, 6, 7, 8, 9, 10, 11, 12]], ['r-h5', [1]], ['cours-h5', [0, 1, 2, 3, 4, 5, 6]], ['cpl-h5-capetiens']] },
    { id:'th-renaissance', nom:'Renaissance, Réformes, absolutisme et Lumières', refs:[['moyen-age', [1, 3]], ['r-h5', [3, 4]], ['r-h2', [0, 1, 2]], ['cours-h5', [7, 8, 9, 10, 11]], ['cours-h4', [0]], ['r-h2', [4, 5, 6, 7, 8, 9, 10, 11, 12]], ['lycee', [19]], ['cours-hg2', [14, 15]]] },
    { id:'th-revolution', nom:'La Révolution française et l’Empire', refs:[['revolution', [0, 1, 2, 6, 7, 8, 9, 10, 11]], ['r-h4', [1]], ['lycee', [0]], ['cours-h4', [1, 2, 3, 4]], ['lycee', [5, 6, 7]], ['r-h2', [13]], ['r-h1', [10]]] },
    { id:'th-xixe', nom:'Le XIXe siècle et la IIIe République', refs:[['revolution', [3, 4, 5, 12, 13]], ['r-h4', [3, 4]], ['r-h1', [0]], ['cours-h4', [5, 6, 7, 8, 9, 10, 11]], ['cpl-h4-femmes'], ['lycee', [8, 9]], ['r-h1', [3, 4, 5, 6, 7, 8, 9, 11, 12, 13, 14]], ['cours-hg1', [12, 13, 14, 15]]] },
    { id:'th-1gm', nom:'La Première Guerre mondiale (1914-1918)', refs:[['xxe', [0]], ['r-h3', [0, 1]], ['pgm-cours']] },
    { id:'th-entre-deux', nom:'L’entre-deux-guerres : crise, totalitarismes, Front populaire', refs:[['r-h3', [2]], ['lycee', [1]], ['cours-h3', [0, 1, 2]], ['cpl-h3-entre'], ['lycee', [11]], ['r-ht', [4]], ['r-ht', [0]]] },
    { id:'th-2gm', nom:'La Seconde Guerre mondiale (1939-1945) : toutes les questions', refs:[['xxe', [1, 7]], ['seconde-guerre'], ['sgm-cours']] },
    { id:'th-guerre-froide', nom:'Guerre froide et décolonisation', refs:[['xxe', [4, 5]], ['lycee', [3]], ['r-ht', [1]], ['cours-h3', [4, 5, 6, 11]], ['cpl-h3-gf'], ['lycee', [14, 16, 17]], ['r-ht', [5, 6, 7, 8]]] },
    { id:'th-france-1945', nom:'La France depuis 1945 et la Ve République', refs:[['xxe', [2, 3]], ['r-h3', [6]], ['lycee', [2]], ['cours-h3', [3, 8, 9, 10]], ['cpl-h3-france'], ['lycee', [10, 12, 13, 15]], ['r-ht', [16]]] },
    { id:'th-europe-monde', nom:'Construction européenne, ONU et mondialisation', refs:[['xxe', [6]], ['r-ht', [2]], ['lycee', [4]], ['cours-h3', [7]], ['lycee', [18]], ['r-ht', [9, 10, 11, 12, 13, 14, 15, 17, 18, 19]], ['cours-hgt', [12, 13, 14]]] },
    { id:'th-geo', nom:'La géographie : toutes les questions', refs:[['geo'], ['r-h6', [5]], ['r-h5', [5]], ['r-h4', [5]], ['r-h2', [3]], ['r-h1', [2]], ['r-ht', [3]], ['cours-g6'], ['cours-g5'], ['cours-g4'], ['cours-g3'], ['r-h2', [14, 15, 16, 17, 18, 19]], ['r-h1', [15, 16, 17, 18, 19]], ['cours-hg2', [16, 17, 18, 19]], ['cours-hg1', [16, 17, 18, 19]], ['cours-hgt', [15, 16, 17, 18, 19]]] },
    { id:'th-emc', nom:'L’EMC : toutes les questions', refs:[['emc'], ['cours-emc-c3'], ['cours-emc-c4'], ['cours-emc6'], ['cours-emc5'], ['cours-emc4'], ['cours-emc3']] }
  ], {
    en:{ dom:'By topic', ch:{ 'th-antiquite':'Antiquity and the first humans', 'th-moyen-age':'The Middle Ages', 'th-renaissance':'Renaissance, Reformations, absolutism and the Enlightenment',
      'th-revolution':'The French Revolution and the Empire', 'th-xixe':'The 19th century and the Third Republic', 'th-1gm':'The First World War (1914–1918)',
      'th-entre-deux':'Between the wars: crisis, totalitarianism, Popular Front', 'th-2gm':'The Second World War (1939–1945): every question', 'th-guerre-froide':'Cold War and decolonisation',
      'th-france-1945':'France since 1945 and the Fifth Republic', 'th-europe-monde':'European integration, the UN and globalisation', 'th-geo':'Geography: every question', 'th-emc':'Civics (EMC): every question' } },
    es:{ dom:'Por temas', ch:{ 'th-antiquite':'La Antigüedad y los primeros humanos', 'th-moyen-age':'La Edad Media', 'th-renaissance':'Renacimiento, Reformas, absolutismo e Ilustración',
      'th-revolution':'La Revolución francesa y el Imperio', 'th-xixe':'El siglo XIX y la Tercera República', 'th-1gm':'La Primera Guerra Mundial (1914-1918)',
      'th-entre-deux':'El periodo de entreguerras: crisis, totalitarismos, Frente Popular', 'th-2gm':'La Segunda Guerra Mundial (1939-1945): todas las preguntas', 'th-guerre-froide':'Guerra Fría y descolonización',
      'th-france-1945':'Francia desde 1945 y la Quinta República', 'th-europe-monde':'Construcción europea, ONU y globalización', 'th-geo':'La geografía: todas las preguntas', 'th-emc':'La EMC: todas las preguntas' } }
  });
  // ───── SVT ─────
  ajouterThemes('svt', 'Par thème', [
    { id:'th-cellule-adn', nom:'Cellule, ADN et génétique', refs:[['r-s2', [10, 11, 12]], ['r-s1', [10, 11, 12]], ['r-st', [10]], ['vivant', [0, 1, 2]], ['genetique', [2, 3, 15, 16, 17, 18, 19]], ['r-s2', [0, 3, 4, 9]], ['r-s1', [0, 2, 6, 8]], ['r-st', [0, 8]], ['cours-s6', [0]], ['cours-s4', [10]], ['cours-s3', [1, 2, 3, 9]]] },
    { id:'th-plantes', nom:'Plantes, photosynthèse, classification et développement', refs:[['r-s2', [13]], ['vivant', [3, 21]], ['r-s6', [0, 2, 5, 6, 7, 8, 10, 11, 12, 16, 17, 18]], ['cours-s6', [1, 3, 4, 5, 10, 11, 14, 15, 16, 19]]] },
    { id:'th-ecosystemes', nom:'Écosystèmes, biodiversité et évolution', refs:[['r-s2', [14, 15]], ['r-st', [11, 18]], ['vivant', [4, 20]], ['r-s6', [4, 13, 14, 15, 19]], ['r-s2', [1, 7, 8]], ['r-st', [1, 5]], ['cours-s6', [6, 7, 12, 13, 17, 18]], ['cours-s3', [4, 5, 12, 13, 17]]] },
    { id:'th-immunite', nom:'Microbes et immunité', refs:[['r-s1', [16, 17, 18, 19]], ['vivant', [18]], ['corps', [1]], ['r-s6', [9]], ['r-s54', [6]], ['r-s1', [1, 4, 5, 9]], ['cours-s6', [8]], ['cours-s3', [6, 7, 14, 15, 16, 19]]] },
    { id:'th-corps', nom:'Corps humain : nutrition, effort, reproduction, hormones, nerfs', refs:[['r-s2', [16, 17, 18, 19]], ['r-st', [12, 13, 14, 19]], ['corps', [0, 2, 15, 16, 17, 18, 19]], ['r-s6', [3]], ['r-s54', [0, 1, 2, 3, 5, 8, 9, 10, 11, 12, 13, 17, 18]], ['r-s2', [2, 5, 6]], ['r-st', [3, 6, 7]], ['cours-s6', [9]], ['cours-s5', [0, 1, 2, 3, 4, 5, 6, 11, 12, 13, 14, 15]], ['cours-s4', [0, 1, 2, 3, 4, 5, 12, 13, 14, 15, 16, 17]], ['cours-s3', [10, 11]]] },
    { id:'th-terre', nom:'La Terre : géologie et climat', refs:[['r-s1', [13, 14, 15]], ['r-st', [15, 16, 17]], ['terre', [0, 15, 16, 17, 18, 19]], ['r-s54', [4, 7, 14, 15, 16, 19]], ['r-s1', [3, 7]], ['r-st', [2, 4, 9]], ['cours-s5', [7, 8, 9, 10, 16, 17, 18, 19]], ['cours-s4', [6, 7, 8, 9, 18, 19]], ['cours-s3', [8, 18]], ['cpl-s6']] }
  ], {
    en:{ dom:'By topic', ch:{ 'th-cellule-adn':'Cells, DNA and genetics', 'th-plantes':'Plants, photosynthesis, classification and development', 'th-ecosystemes':'Ecosystems, biodiversity and evolution',
      'th-immunite':'Microbes and immunity', 'th-corps':'The human body: nutrition, exercise, reproduction, hormones, nerves', 'th-terre':'The Earth: geology and climate' } },
    es:{ dom:'Por temas', ch:{ 'th-cellule-adn':'Célula, ADN y genética', 'th-plantes':'Plantas, fotosíntesis, clasificación y desarrollo', 'th-ecosystemes':'Ecosistemas, biodiversidad y evolución',
      'th-immunite':'Microbios e inmunidad', 'th-corps':'Cuerpo humano: nutrición, esfuerzo, reproducción, hormonas, nervios', 'th-terre':'La Tierra: geología y clima' } }
  });

  // ───── Physique-chimie ─────
  ajouterThemes('physique', 'Par thème', [
    { id:'th-etats', nom:'États de la matière, mélanges et gaz', refs:[['matiere', [2, 3]], ['r-p6', [0, 2, 3, 6, 8, 10, 11, 18]], ['r-pt', [6]], ['cours-p5', [1, 2, 3, 4, 11, 12, 13, 14, 15]]] },
    { id:'th-chimie', nom:'Atomes, molécules et transformations chimiques', refs:[['r-p1', [10, 11, 12, 19]], ['r-pt', [11, 19]], ['matiere', [0, 4, 5]], ['r-p1', [0, 3, 5, 8]], ['cours-p4', [0, 1, 2, 12, 13, 14]], ['cours-p3', [0, 1, 12]]] },
    { id:'th-ph', nom:'Acides, bases, pH et équilibres', refs:[['r-pt', [9, 10]], ['matiere', [1]], ['r-pt', [1, 7]], ['cours-p3', [2, 13, 14]]] },
    { id:'th-electricite', nom:'Électricité', refs:[['r-p1', [16]], ['r-pt', [14]], ['elec'], ['r-p6', [5, 16]], ['r-pt', [5]], ['cours-p5', [5, 6, 7, 18]], ['cours-p4', [3, 4, 5, 15, 16]], ['cours-p3', [3, 4]], ['cpl-pc-elec']] },
    { id:'th-mouvement', nom:'Mouvements, forces et gravitation', refs:[['r-p1', [15]], ['r-pt', [12, 13]], ['r-p6', [7, 14, 19]], ['r-pt', [0, 3, 8]], ['cours-p4', [6, 7, 17, 18]], ['cours-p3', [6, 7, 8, 11, 15]]] },
    { id:'th-energie', nom:'L’énergie', refs:[['r-p1', [13, 14]], ['r-pt', [17]], ['r-p6', [4, 9, 12, 13, 17]], ['r-p1', [1, 4, 6]], ['cours-p3', [5, 9, 10, 16, 17, 18, 19]]] },
    { id:'th-ondes', nom:'Ondes, lumière et radioactivité', refs:[['r-p1', [17, 18]], ['r-pt', [15, 16, 18]], ['r-p6', [15]], ['r-p1', [2, 7, 9]], ['r-pt', [2]], ['cours-p5', [8, 9, 10, 16, 17, 19]], ['cours-p4', [8, 9, 10, 11, 19]]] }
  ], {
    en:{ dom:'By topic', ch:{ 'th-etats':'States of matter, mixtures and gases', 'th-chimie':'Atoms, molecules and chemical reactions', 'th-ph':'Acids, bases, pH and equilibria',
      'th-electricite':'Electricity', 'th-mouvement':'Motion, forces and gravity', 'th-energie':'Energy', 'th-ondes':'Waves, light and radioactivity' } },
    es:{ dom:'Por temas', ch:{ 'th-etats':'Estados de la materia, mezclas y gases', 'th-chimie':'Átomos, moléculas y transformaciones químicas', 'th-ph':'Ácidos, bases, pH y equilibrios',
      'th-electricite':'Electricidad', 'th-mouvement':'Movimientos, fuerzas y gravitación', 'th-energie':'La energía', 'th-ondes':'Ondas, luz y radiactividad' } }
  });
})();
