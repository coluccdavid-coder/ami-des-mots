// Ami des mots — v6.64 : SVT DU LYCÉE (2nde, 1re, Tle) — chaque chapitre à banque passe à 20 questions,
// en français, anglais, espagnol et allemand, dans le même ordre.
// Chargé après les traductions et avant js/themes.js.
(function(){
  'use strict';
  const M = window.MATIERES; if(!M) return;
  const T = window.MATIERES_LANGUES || {};
  const L = (mid, cid, tr) => {
    const m = M.trouver(mid), c = m && m.chapitres.find(x => x.id === cid); if(!c || !Array.isArray(c.banque)) return;
    const k = mid + '/' + cid, n0 = c.banque.length;
    for(const l of ['en', 'es', 'de']){ const q = T[l] && T[l].q && T[l].q[k]; if(q && (!tr[l] || tr[l].length !== tr.fr.length || q.length !== n0)) return; }
    c.banque.push(...tr.fr);
    for(const l of ['en', 'es', 'de']){ const q = T[l] && T[l].q && T[l].q[k]; if(q) q.push(...tr[l]); }
    if(c.nivQ) c.nivQ = c.banque.map((_, i) => i < n0 ? c.nivQ[i] : c.niv.slice());
  };
  const Q = (q, bon, f1, v1, f2, v2, f3, v3, r) => [q, bon, [[f1, v1], [f2, v2], [f3, v3]], r];

  // ═════════ 2nde : ADN, biodiversité, reproduction ═════════
  L('svt', 'r-s2', {
    fr:[
      Q('Quelles sont les quatre bases (nucléotides) de l’ADN ?', 'A, T, C et G', 'A, B, C et D', 'Ce n’est pas l’alphabet ! 🔤', 'H, O, N et C', 'Ce sont des atomes. ⚛️', 'X, Y, Z et W', 'Non. 🙅', 'Adénine, thymine, cytosine, guanine.'),
      Q('Dans l’ADN, avec quelle base l’adénine (A) s’associe-t-elle ?', 'la thymine (T)', 'la guanine (G)', 'G va avec C. 🔗', 'la cytosine (C)', 'C va avec G. 🔗', 'une autre adénine', 'Non. 🔄', 'A–T et C–G : c’est la complémentarité des bases.'),
      Q('Quelle est l’unité de base de tout être vivant ?', 'la cellule', 'l’atome', 'Il existe aussi dans les cailloux ! 🪨', 'l’organe', 'Il est fait de cellules. 🫀', 'la molécule d’eau', 'Non. 💧', 'Tous les êtres vivants sont faits d’une ou de plusieurs cellules.'),
      Q('Que produit la photosynthèse ?', 'de la matière organique et du dioxygène', 'du dioxyde de carbone seulement', 'C’est ce qu’elle consomme. 🌬️', 'du pétrole', 'Non. 🛢️', 'de l’azote', 'Non. 🙅', 'À partir de CO₂, d’eau et de lumière.'),
      Q('Qu’est-ce qu’une espèce endémique ?', 'une espèce qui ne vit naturellement que dans une région précise', 'une espèce présente partout sur Terre', 'C’est l’inverse. 🌍', 'une espèce disparue', 'Ça, c’est une espèce éteinte. 🦤', 'une espèce domestique', 'Non. 🐄', 'Exemple : le lémurien à Madagascar.'),
      Q('Quel savant a proposé la théorie de l’évolution par sélection naturelle (1859) ?', 'Charles Darwin', 'Louis Pasteur', 'Il a travaillé sur les microbes. 🦠', 'Isaac Newton', 'Il a travaillé sur la gravitation. 🍎', 'Gregor Mendel', 'Il a travaillé sur l’hérédité. 🌱', 'L’Origine des espèces.'),
      Q('Quel organe produit les ovules ?', 'les ovaires', 'l’utérus', 'Il accueille l’embryon. 🤰', 'les testicules', 'Ils produisent les spermatozoïdes. 🔄', 'le pancréas', 'Il produit l’insuline. 🍬', 'Un ovule est libéré à chaque cycle environ.'),
      Q('Quelle glande, à la base du cerveau, commande la production des hormones sexuelles ?', 'l’hypophyse', 'la thyroïde', 'Elle est dans le cou. 🦒', 'le foie', 'Ce n’est pas une glande du cerveau. 🫁', 'le cœur', 'Non. ❤️', 'Elle est elle-même contrôlée par l’hypothalamus.'),
      Q('Comment agit la pilule contraceptive hormonale ?', 'elle bloque l’ovulation', 'elle détruit les spermatozoïdes dans l’estomac', 'Non. 🙅', 'elle protège des infections sexuellement transmissibles', 'Seul le préservatif protège des IST. 🛡️', 'elle n’a aucun effet sur les hormones', 'Non. 🙅', 'Elle contient des hormones de synthèse.'),
      Q('Quel moyen de contraception protège aussi des IST ?', 'le préservatif', 'la pilule', 'Elle ne protège pas des IST. 🛡️', 'le stérilet', 'Il ne protège pas des IST. 🛡️', 'l’implant', 'Il ne protège pas des IST. 🛡️', 'C’est le seul moyen qui protège des infections sexuellement transmissibles.')
    ],
    en:[
      Q('What are the four bases (nucleotides) of DNA?', 'A, T, C and G', 'A, B, C and D', 'That is not the alphabet! 🔤', 'H, O, N and C', 'Those are atoms. ⚛️', 'X, Y, Z and W', 'No. 🙅', 'Adenine, thymine, cytosine, guanine.'),
      Q('In DNA, which base does adenine (A) pair with?', 'thymine (T)', 'guanine (G)', 'G goes with C. 🔗', 'cytosine (C)', 'C goes with G. 🔗', 'another adenine', 'No. 🔄', 'A–T and C–G: this is base complementarity.'),
      Q('What is the basic unit of every living thing?', 'the cell', 'the atom', 'Pebbles have atoms too! 🪨', 'the organ', 'It is made of cells. 🫀', 'the water molecule', 'No. 💧', 'All living things are made of one or more cells.'),
      Q('What does photosynthesis produce?', 'organic matter and oxygen', 'only carbon dioxide', 'That is what it uses. 🌬️', 'oil', 'No. 🛢️', 'nitrogen', 'No. 🙅', 'From CO₂, water and light.'),
      Q('What is an endemic species?', 'a species that lives naturally only in one specific region', 'a species found everywhere on Earth', 'The opposite. 🌍', 'an extinct species', 'That is an extinct species. 🦤', 'a domestic species', 'No. 🐄', 'Example: lemurs in Madagascar.'),
      Q('Which scientist proposed the theory of evolution by natural selection (1859)?', 'Charles Darwin', 'Louis Pasteur', 'He worked on microbes. 🦠', 'Isaac Newton', 'He worked on gravitation. 🍎', 'Gregor Mendel', 'He worked on heredity. 🌱', 'On the Origin of Species.'),
      Q('Which organ produces egg cells?', 'the ovaries', 'the uterus', 'It hosts the embryo. 🤰', 'the testicles', 'They produce sperm. 🔄', 'the pancreas', 'It produces insulin. 🍬', 'About one egg cell is released each cycle.'),
      Q('Which gland, at the base of the brain, controls the production of sex hormones?', 'the pituitary gland', 'the thyroid', 'It is in the neck. 🦒', 'the liver', 'It is not a brain gland. 🫁', 'the heart', 'No. ❤️', 'It is itself controlled by the hypothalamus.'),
      Q('How does the hormonal contraceptive pill work?', 'it blocks ovulation', 'it destroys sperm in the stomach', 'No. 🙅', 'it protects against sexually transmitted infections', 'Only condoms protect against STIs. 🛡️', 'it has no effect on hormones', 'No. 🙅', 'It contains synthetic hormones.'),
      Q('Which method of contraception also protects against STIs?', 'the condom', 'the pill', 'It does not protect against STIs. 🛡️', 'the IUD (coil)', 'It does not protect against STIs. 🛡️', 'the implant', 'It does not protect against STIs. 🛡️', 'It is the only method that protects against sexually transmitted infections.')
    ],
    es:[
      Q('¿Cuáles son las cuatro bases (nucleótidos) del ADN?', 'A, T, C y G', 'A, B, C y D', '¡No es el abecedario! 🔤', 'H, O, N y C', 'Son átomos. ⚛️', 'X, Y, Z y W', 'No. 🙅', 'Adenina, timina, citosina, guanina.'),
      Q('En el ADN, ¿con qué base se empareja la adenina (A)?', 'con la timina (T)', 'con la guanina (G)', 'G va con C. 🔗', 'con la citosina (C)', 'C va con G. 🔗', 'con otra adenina', 'No. 🔄', 'A–T y C–G: es la complementariedad de las bases.'),
      Q('¿Cuál es la unidad básica de todo ser vivo?', 'la célula', 'el átomo', '¡Las piedras también tienen átomos! 🪨', 'el órgano', 'Está hecho de células. 🫀', 'la molécula de agua', 'No. 💧', 'Todos los seres vivos están formados por una o varias células.'),
      Q('¿Qué produce la fotosíntesis?', 'materia orgánica y oxígeno', 'solo dióxido de carbono', 'Es lo que consume. 🌬️', 'petróleo', 'No. 🛢️', 'nitrógeno', 'No. 🙅', 'A partir de CO₂, agua y luz.'),
      Q('¿Qué es una especie endémica?', 'una especie que solo vive de forma natural en una región concreta', 'una especie presente en toda la Tierra', 'Al revés. 🌍', 'una especie desaparecida', 'Eso es una especie extinta. 🦤', 'una especie doméstica', 'No. 🐄', 'Ejemplo: los lémures en Madagascar.'),
      Q('¿Qué científico propuso la teoría de la evolución por selección natural (1859)?', 'Charles Darwin', 'Louis Pasteur', 'Trabajó en los microbios. 🦠', 'Isaac Newton', 'Trabajó en la gravitación. 🍎', 'Gregor Mendel', 'Trabajó en la herencia. 🌱', 'El origen de las especies.'),
      Q('¿Qué órgano produce los óvulos?', 'los ovarios', 'el útero', 'Acoge al embrión. 🤰', 'los testículos', 'Producen espermatozoides. 🔄', 'el páncreas', 'Produce insulina. 🍬', 'Se libera aproximadamente un óvulo en cada ciclo.'),
      Q('¿Qué glándula, en la base del cerebro, controla la producción de hormonas sexuales?', 'la hipófisis', 'la tiroides', 'Está en el cuello. 🦒', 'el hígado', 'No es una glándula del cerebro. 🫁', 'el corazón', 'No. ❤️', 'A su vez la controla el hipotálamo.'),
      Q('¿Cómo actúa la píldora anticonceptiva hormonal?', 'bloquea la ovulación', 'destruye los espermatozoides en el estómago', 'No. 🙅', 'protege de las infecciones de transmisión sexual', 'Solo el preservativo protege de las ITS. 🛡️', 'no tiene ningún efecto en las hormonas', 'No. 🙅', 'Contiene hormonas sintéticas.'),
      Q('¿Qué método anticonceptivo protege también de las ITS?', 'el preservativo', 'la píldora', 'No protege de las ITS. 🛡️', 'el DIU', 'No protege de las ITS. 🛡️', 'el implante', 'No protege de las ITS. 🛡️', 'Es el único método que protege de las infecciones de transmisión sexual.')
    ],
    de:[
      Q('Welche vier Basen (Nukleotide) hat die DNA?', 'A, T, C und G', 'A, B, C und D', 'Das ist nicht das Alphabet! 🔤', 'H, O, N und C', 'Das sind Atome. ⚛️', 'X, Y, Z und W', 'Nein. 🙅', 'Adenin, Thymin, Cytosin, Guanin.'),
      Q('Mit welcher Base paart sich Adenin (A) in der DNA?', 'mit Thymin (T)', 'mit Guanin (G)', 'G passt zu C. 🔗', 'mit Cytosin (C)', 'C passt zu G. 🔗', 'mit einem anderen Adenin', 'Nein. 🔄', 'A–T und C–G: das ist die Basenpaarung.'),
      Q('Was ist die Grundeinheit jedes Lebewesens?', 'die Zelle', 'das Atom', 'Auch Steine haben Atome! 🪨', 'das Organ', 'Es besteht aus Zellen. 🫀', 'das Wassermolekül', 'Nein. 💧', 'Alle Lebewesen bestehen aus einer oder mehreren Zellen.'),
      Q('Was entsteht bei der Fotosynthese?', 'organische Stoffe und Sauerstoff', 'nur Kohlenstoffdioxid', 'Das wird verbraucht. 🌬️', 'Erdöl', 'Nein. 🛢️', 'Stickstoff', 'Nein. 🙅', 'Aus CO₂, Wasser und Licht.'),
      Q('Was ist eine endemische Art?', 'eine Art, die natürlich nur in einer bestimmten Region lebt', 'eine Art, die überall auf der Erde vorkommt', 'Umgekehrt. 🌍', 'eine verschwundene Art', 'Das ist eine ausgestorbene Art. 🦤', 'ein Haustier', 'Nein. 🐄', 'Beispiel: Lemuren auf Madagaskar.'),
      Q('Welcher Forscher stellte die Evolutionstheorie durch natürliche Selektion auf (1859)?', 'Charles Darwin', 'Louis Pasteur', 'Er erforschte Mikroben. 🦠', 'Isaac Newton', 'Er erforschte Gravitation. 🍎', 'Gregor Mendel', 'Er erforschte Vererbung. 🌱', 'Über den Ursprung der Arten.'),
      Q('Welches Organ bildet die Eizellen?', 'die Eierstöcke', 'die Gebärmutter', 'Dort wächst der Embryo. 🤰', 'die Hoden', 'Dort entstehen Spermien. 🔄', 'die Bauchspeicheldrüse', 'Sie bildet Insulin. 🍬', 'Etwa eine Eizelle pro Zyklus wird freigesetzt.'),
      Q('Welche Drüse an der Basis des Gehirns steuert die Bildung der Geschlechtshormone?', 'die Hypophyse', 'die Schilddrüse', 'Sie liegt im Hals. 🦒', 'die Leber', 'Das ist keine Drüse im Gehirn. 🫁', 'das Herz', 'Nein. ❤️', 'Sie wird ihrerseits vom Hypothalamus gesteuert.'),
      Q('Wie wirkt die hormonelle Antibabypille?', 'sie verhindert den Eisprung', 'sie zerstört Spermien im Magen', 'Nein. 🙅', 'sie schützt vor sexuell übertragbaren Infektionen', 'Nur Kondome schützen davor. 🛡️', 'sie hat keine Wirkung auf Hormone', 'Nein. 🙅', 'Sie enthält künstliche Hormone.'),
      Q('Welches Verhütungsmittel schützt auch vor sexuell übertragbaren Infektionen?', 'das Kondom', 'die Pille', 'Sie schützt nicht davor. 🛡️', 'die Spirale', 'Sie schützt nicht davor. 🛡️', 'das Implantat', 'Es schützt nicht davor. 🛡️', 'Es ist das einzige Mittel, das vor solchen Infektionen schützt.')
    ]
  });

  // ═════════ 1re : mitose, immunité, mutations, plaques ═════════
  L('svt', 'r-s1', {
    fr:[
      Q('Pourquoi dit-on que la réplication de l’ADN est « semi-conservative » ?', 'chaque nouvelle molécule garde un brin ancien et un brin nouveau', 'la moitié de l’ADN est détruite', 'Rien n’est détruit. 🙅', 'seule la moitié des gènes est copiée', 'Tout est copié. 📄', 'elle a lieu une fois sur deux', 'Non. 🔄', 'Démontré par Meselson et Stahl en 1958.'),
      Q('Qu’est-ce qu’un cancer, au niveau des cellules ?', 'une multiplication incontrôlée de cellules, due à des mutations', 'une infection par un virus seulement', 'Pas forcément. 🦠', 'une carence en vitamines', 'Non. 🍊', 'un manque de cellules', 'C’est l’inverse. 🔄', 'Les cellules échappent aux contrôles de la division.'),
      Q('Quel agent mutagène vient du Soleil ?', 'les rayons ultraviolets (UV)', 'les ondes radio', 'Elles ne sont pas mutagènes à faible dose. 📻', 'le vent', 'Non. 🌬️', 'la lumière de la Lune', 'Non. 🌙', 'D’où l’importance de la crème solaire.'),
      Q('Sur quoi repose la lithosphère, rigide ?', 'sur l’asthénosphère, plus ductile', 'sur le noyau de fer', 'Il est beaucoup plus profond. 🧲', 'sur l’atmosphère', 'Elle est au-dessus ! ☁️', 'sur de l’eau liquide', 'Non. 💧', 'Les plaques lithosphériques se déplacent sur l’asthénosphère.'),
      Q('Comment appelle-t-on la limite entre la croûte et le manteau ?', 'le Moho', 'la dorsale', 'C’est une zone de divergence. 🌋', 'la fosse', 'C’est une zone de subduction. 🕳️', 'l’équateur', 'Ce n’est pas une limite interne ! 🌍', 'Découvert par le sismologue Mohorovičić.'),
      Q('Quel savant a proposé la dérive des continents en 1912 ?', 'Alfred Wegener', 'Charles Darwin', 'Il a travaillé sur l’évolution. 🐢', 'Louis Pasteur', 'Il a travaillé sur les microbes. 🦠', 'Albert Einstein', 'Il a travaillé sur la relativité. 🌌', 'Il s’appuyait sur la forme des côtes et sur les fossiles.'),
      Q('Quelles cellules immunitaires détruisent les cellules infectées par un virus ?', 'les lymphocytes T cytotoxiques', 'les globules rouges', 'Ils transportent le dioxygène. 🫁', 'les neurones', 'Ils transmettent des messages nerveux. 🧠', 'les cellules de la peau', 'Non. 🙅', 'C’est la réponse immunitaire adaptative à médiation cellulaire.'),
      Q('Qu’est-ce que la phagocytose ?', 'l’ingestion et la digestion d’un microbe par une cellule immunitaire', 'la production d’anticorps', 'C’est le rôle des plasmocytes. 🧪', 'la division d’une cellule', 'C’est la mitose. ✂️', 'la respiration d’une cellule', 'Non. 🌬️', 'Réalisée notamment par les macrophages.'),
      Q('Que reconnaît un anticorps ?', 'un antigène précis', 'tous les microbes à la fois', 'Un anticorps est spécifique. 🎯', 'les vitamines', 'Non. 🍊', 'les globules rouges du corps', 'Non. 🙅', 'Comme une clé et sa serrure.'),
      Q('Comment des bactéries deviennent-elles résistantes aux antibiotiques ?', 'des mutations apparaissent et les bactéries résistantes sont sélectionnées', 'elles apprennent à lire la notice', 'Non ! 😄', 'les antibiotiques les rendent plus fortes directement', 'Le médicament trie, il ne transforme pas. 🔍', 'elles changent d’espèce', 'Non. 🔄', 'Le mauvais usage des antibiotiques favorise cette sélection.')
    ],
    en:[
      Q('Why is DNA replication called “semi-conservative”?', 'each new molecule keeps one old strand and one new strand', 'half of the DNA is destroyed', 'Nothing is destroyed. 🙅', 'only half of the genes are copied', 'Everything is copied. 📄', 'it happens every other time', 'No. 🔄', 'Shown by Meselson and Stahl in 1958.'),
      Q('What is cancer at the level of cells?', 'uncontrolled multiplication of cells, due to mutations', 'only a viral infection', 'Not necessarily. 🦠', 'a vitamin deficiency', 'No. 🍊', 'a lack of cells', 'The opposite. 🔄', 'Cells escape the controls on division.'),
      Q('Which mutagen comes from the Sun?', 'ultraviolet (UV) rays', 'radio waves', 'They are not mutagenic at low doses. 📻', 'wind', 'No. 🌬️', 'moonlight', 'No. 🌙', 'Hence the importance of sunscreen.'),
      Q('What does the rigid lithosphere rest on?', 'on the more ductile asthenosphere', 'on the iron core', 'It is much deeper. 🧲', 'on the atmosphere', 'That is above! ☁️', 'on liquid water', 'No. 💧', 'Lithospheric plates move on the asthenosphere.'),
      Q('What is the boundary between the crust and the mantle called?', 'the Moho', 'the ridge', 'That is a divergence zone. 🌋', 'the trench', 'That is a subduction zone. 🕳️', 'the equator', 'That is not an inner boundary! 🌍', 'Discovered by the seismologist Mohorovičić.'),
      Q('Which scientist proposed continental drift in 1912?', 'Alfred Wegener', 'Charles Darwin', 'He worked on evolution. 🐢', 'Louis Pasteur', 'He worked on microbes. 🦠', 'Albert Einstein', 'He worked on relativity. 🌌', 'He relied on the shape of coastlines and on fossils.'),
      Q('Which immune cells destroy cells infected by a virus?', 'cytotoxic T lymphocytes', 'red blood cells', 'They carry oxygen. 🫁', 'neurons', 'They transmit nerve messages. 🧠', 'skin cells', 'No. 🙅', 'This is the cell-mediated adaptive immune response.'),
      Q('What is phagocytosis?', 'the ingestion and digestion of a microbe by an immune cell', 'the production of antibodies', 'That is the role of plasma cells. 🧪', 'the division of a cell', 'That is mitosis. ✂️', 'cell respiration', 'No. 🌬️', 'Carried out mainly by macrophages.'),
      Q('What does an antibody recognise?', 'a specific antigen', 'all microbes at once', 'An antibody is specific. 🎯', 'vitamins', 'No. 🍊', 'the body’s red cells', 'No. 🙅', 'Like a key and its lock.'),
      Q('How do bacteria become resistant to antibiotics?', 'mutations appear and resistant bacteria are selected', 'they learn to read the leaflet', 'No! 😄', 'antibiotics make them stronger directly', 'The drug sorts; it does not transform. 🔍', 'they change species', 'No. 🔄', 'Misuse of antibiotics favours this selection.')
    ],
    es:[
      Q('¿Por qué se dice que la replicación del ADN es «semiconservativa»?', 'cada nueva molécula conserva una hebra antigua y una nueva', 'la mitad del ADN se destruye', 'No se destruye nada. 🙅', 'solo se copia la mitad de los genes', 'Se copia todo. 📄', 'ocurre una vez de cada dos', 'No. 🔄', 'Lo demostraron Meselson y Stahl en 1958.'),
      Q('¿Qué es un cáncer a nivel celular?', 'una multiplicación descontrolada de células, debida a mutaciones', 'solo una infección por un virus', 'No necesariamente. 🦠', 'una falta de vitaminas', 'No. 🍊', 'una falta de células', 'Al revés. 🔄', 'Las células escapan a los controles de la división.'),
      Q('¿Qué agente mutágeno procede del Sol?', 'los rayos ultravioleta (UV)', 'las ondas de radio', 'No son mutágenas a dosis bajas. 📻', 'el viento', 'No. 🌬️', 'la luz de la Luna', 'No. 🌙', 'De ahí la importancia de la crema solar.'),
      Q('¿Sobre qué descansa la litosfera, rígida?', 'sobre la astenosfera, más dúctil', 'sobre el núcleo de hierro', 'Está mucho más abajo. 🧲', 'sobre la atmósfera', '¡Está encima! ☁️', 'sobre agua líquida', 'No. 💧', 'Las placas litosféricas se desplazan sobre la astenosfera.'),
      Q('¿Cómo se llama el límite entre la corteza y el manto?', 'el Moho', 'la dorsal', 'Es una zona de divergencia. 🌋', 'la fosa', 'Es una zona de subducción. 🕳️', 'el ecuador', '¡No es un límite interno! 🌍', 'Lo descubrió el sismólogo Mohorovičić.'),
      Q('¿Qué científico propuso la deriva continental en 1912?', 'Alfred Wegener', 'Charles Darwin', 'Trabajó en la evolución. 🐢', 'Louis Pasteur', 'Trabajó en los microbios. 🦠', 'Albert Einstein', 'Trabajó en la relatividad. 🌌', 'Se basaba en la forma de las costas y en los fósiles.'),
      Q('¿Qué células inmunitarias destruyen las células infectadas por un virus?', 'los linfocitos T citotóxicos', 'los glóbulos rojos', 'Transportan oxígeno. 🫁', 'las neuronas', 'Transmiten mensajes nerviosos. 🧠', 'las células de la piel', 'No. 🙅', 'Es la respuesta inmunitaria adaptativa celular.'),
      Q('¿Qué es la fagocitosis?', 'la ingestión y digestión de un microbio por una célula inmunitaria', 'la producción de anticuerpos', 'Ese es el papel de las células plasmáticas. 🧪', 'la división de una célula', 'Eso es la mitosis. ✂️', 'la respiración de una célula', 'No. 🌬️', 'La realizan sobre todo los macrófagos.'),
      Q('¿Qué reconoce un anticuerpo?', 'un antígeno concreto', 'todos los microbios a la vez', 'Un anticuerpo es específico. 🎯', 'las vitaminas', 'No. 🍊', 'los glóbulos rojos del cuerpo', 'No. 🙅', 'Como una llave y su cerradura.'),
      Q('¿Cómo se vuelven resistentes las bacterias a los antibióticos?', 'aparecen mutaciones y se seleccionan las bacterias resistentes', 'aprenden a leer el prospecto', '¡No! 😄', 'los antibióticos las hacen más fuertes directamente', 'El medicamento selecciona, no transforma. 🔍', 'cambian de especie', 'No. 🔄', 'El mal uso de los antibióticos favorece esta selección.')
    ],
    de:[
      Q('Warum nennt man die DNA-Replikation „semikonservativ“?', 'jedes neue Molekül behält einen alten und einen neuen Strang', 'die Hälfte der DNA wird zerstört', 'Nichts wird zerstört. 🙅', 'nur die Hälfte der Gene wird kopiert', 'Alles wird kopiert. 📄', 'sie findet nur jedes zweite Mal statt', 'Nein. 🔄', 'Nachgewiesen von Meselson und Stahl 1958.'),
      Q('Was ist Krebs auf der Ebene der Zellen?', 'eine unkontrollierte Vermehrung von Zellen durch Mutationen', 'nur eine Virusinfektion', 'Nicht unbedingt. 🦠', 'ein Vitaminmangel', 'Nein. 🍊', 'ein Mangel an Zellen', 'Umgekehrt. 🔄', 'Zellen entziehen sich der Kontrolle der Teilung.'),
      Q('Welches Mutagen kommt von der Sonne?', 'ultraviolette Strahlen (UV)', 'Radiowellen', 'In geringer Dosis sind sie nicht mutagen. 📻', 'der Wind', 'Nein. 🌬️', 'das Mondlicht', 'Nein. 🌙', 'Deshalb ist Sonnencreme wichtig.'),
      Q('Worauf liegt die starre Lithosphäre?', 'auf der zähplastischen Asthenosphäre', 'auf dem Eisenkern', 'Er liegt viel tiefer. 🧲', 'auf der Atmosphäre', 'Das ist oben! ☁️', 'auf flüssigem Wasser', 'Nein. 💧', 'Lithosphärenplatten bewegen sich auf der Asthenosphäre.'),
      Q('Wie heißt die Grenze zwischen Erdkruste und Erdmantel?', 'die Moho', 'der Rücken', 'Das ist eine Spreizungszone. 🌋', 'der Tiefseegraben', 'Das ist eine Subduktionszone. 🕳️', 'der Äquator', 'Das ist keine innere Grenze! 🌍', 'Entdeckt vom Seismologen Mohorovičić.'),
      Q('Welcher Forscher schlug 1912 die Kontinentaldrift vor?', 'Alfred Wegener', 'Charles Darwin', 'Er erforschte Evolution. 🐢', 'Louis Pasteur', 'Er erforschte Mikroben. 🦠', 'Albert Einstein', 'Er erforschte Relativität. 🌌', 'Er stützte sich auf Küstenformen und Fossilien.'),
      Q('Welche Immunzellen zerstören virusinfizierte Zellen?', 'zytotoxische T-Lymphozyten', 'rote Blutkörperchen', 'Sie transportieren Sauerstoff. 🫁', 'Nervenzellen', 'Sie leiten Nervensignale. 🧠', 'Hautzellen', 'Nein. 🙅', 'Das ist die zelluläre Immunantwort.'),
      Q('Was ist Phagozytose?', 'das Aufnehmen und Verdauen eines Mikroben durch eine Immunzelle', 'die Bildung von Antikörpern', 'Das machen Plasmazellen. 🧪', 'die Teilung einer Zelle', 'Das ist Mitose. ✂️', 'die Zellatmung', 'Nein. 🌬️', 'Vor allem Makrophagen machen das.'),
      Q('Was erkennt ein Antikörper?', 'ein bestimmtes Antigen', 'alle Mikroben gleichzeitig', 'Ein Antikörper ist spezifisch. 🎯', 'Vitamine', 'Nein. 🍊', 'körpereigene rote Blutkörperchen', 'Nein. 🙅', 'Wie ein Schlüssel und sein Schloss.'),
      Q('Wie werden Bakterien gegen Antibiotika resistent?', 'es entstehen Mutationen, und resistente Bakterien werden selektiert', 'sie lernen den Beipackzettel lesen', 'Nein! 😄', 'Antibiotika machen sie direkt stärker', 'Das Medikament sortiert nur. 🔍', 'sie wechseln die Art', 'Nein. 🔄', 'Falscher Gebrauch von Antibiotika begünstigt diese Selektion.')
    ]
  });

  // ═════════ Tle : méiose, évolution, climat, nerfs ═════════
  L('svt', 'r-st', {
    fr:[
      Q('Combien de cellules filles une méiose produit-elle ?', '4', '2', 'C’est la mitose. ✂️', '1', 'Non. 🙅', '46', 'C’est le nombre de chromosomes ! 🧬', 'Quatre cellules à 23 chromosomes chez l’humain.'),
      Q('Qu’est-ce que la dérive génétique ?', 'la variation au hasard de la fréquence des allèles, surtout dans les petites populations', 'le déplacement des continents', 'C’est la dérive des continents. 🌍', 'une mutation provoquée volontairement', 'Non. 🧪', 'la sélection des plus forts', 'C’est la sélection naturelle. 🔍', 'Elle ne dépend pas de l’avantage des allèles.'),
      Q('Quelle hormone fait augmenter la glycémie ?', 'le glucagon', 'l’insuline', 'Elle la fait baisser. 📉', 'l’adrénaline seulement', 'Elle aide, mais l’hormone principale est le glucagon. 🤔', 'la testostérone', 'Non. 🙅', 'Insuline et glucagon sont produits par le pancréas.'),
      Q('Qu’est-ce que le diabète de type 1 ?', 'une maladie où le pancréas ne produit plus d’insuline', 'un excès de sucre dans les fruits', 'Non. 🍎', 'une maladie des os', 'Non. 🦴', 'une allergie au gluten', 'Non. 🌾', 'Il est traité par des injections d’insuline.'),
      Q('Quel neurotransmetteur commande la contraction musculaire à la jonction neuromusculaire ?', 'l’acétylcholine', 'l’insuline', 'C’est une hormone. 🍬', 'l’hémoglobine', 'Elle transporte le dioxygène. 🫁', 'le glucose', 'C’est un sucre. 🍯', 'Elle est libérée dans la synapse entre neurone et muscle.'),
      Q('Que dit le principe de recoupement en datation relative ?', 'une structure qui en recoupe une autre est plus récente', 'les roches du bas sont les plus jeunes', 'C’est l’inverse. 🔄', 'tous les fossiles ont le même âge', 'Non. 🦴', 'une faille est toujours plus vieille que les couches', 'C’est l’inverse. 🔄', 'Une faille est plus récente que les couches qu’elle coupe.'),
      Q('Quel gaz à effet de serre est émis surtout par l’élevage et les rizières ?', 'le méthane (CH₄)', 'le dioxygène (O₂)', 'Ce n’est pas un gaz à effet de serre. 🌬️', 'l’azote (N₂)', 'Non. 🙅', 'l’hélium', 'Non. 🎈', 'Il réchauffe beaucoup plus que le CO₂, à quantité égale.'),
      Q('Qu’est-ce que l’albédo ?', 'la part du rayonnement solaire renvoyée par une surface', 'la température moyenne de la Terre', 'Non. 🌡️', 'la quantité de pluie', 'Non. 🌧️', 'la hauteur des nuages', 'Non. ☁️', 'La glace a un albédo élevé ; l’océan, faible.'),
      Q('Où est apparu Homo sapiens ?', 'en Afrique', 'en Europe', 'Il y arrive plus tard. 🇪🇺', 'en Australie', 'Bien plus tard. 🦘', 'en Antarctique', 'Non ! 🐧', 'Il y a environ 300 000 ans.'),
      Q('Quelle hormone est libérée en cas de stress prolongé ?', 'le cortisol', 'l’insuline', 'Elle régule la glycémie. 🍬', 'la mélatonine', 'Elle aide à dormir. 😴', 'l’ocytocine', 'Elle joue sur l’attachement et l’accouchement. 🤱', 'Il est produit par les glandes surrénales.')
    ],
    en:[
      Q('How many daughter cells does meiosis produce?', '4', '2', 'That is mitosis. ✂️', '1', 'No. 🙅', '46', 'That is the number of chromosomes! 🧬', 'Four cells with 23 chromosomes in humans.'),
      Q('What is genetic drift?', 'random variation in allele frequency, especially in small populations', 'the movement of continents', 'That is continental drift. 🌍', 'a deliberately caused mutation', 'No. 🧪', 'selection of the strongest', 'That is natural selection. 🔍', 'It does not depend on any advantage of the alleles.'),
      Q('Which hormone raises blood sugar?', 'glucagon', 'insulin', 'It lowers it. 📉', 'only adrenaline', 'It helps, but the main hormone is glucagon. 🤔', 'testosterone', 'No. 🙅', 'Insulin and glucagon are produced by the pancreas.'),
      Q('What is type 1 diabetes?', 'a disease in which the pancreas no longer produces insulin', 'too much sugar in fruit', 'No. 🍎', 'a bone disease', 'No. 🦴', 'a gluten allergy', 'No. 🌾', 'It is treated with insulin injections.'),
      Q('Which neurotransmitter triggers muscle contraction at the neuromuscular junction?', 'acetylcholine', 'insulin', 'That is a hormone. 🍬', 'haemoglobin', 'It carries oxygen. 🫁', 'glucose', 'That is a sugar. 🍯', 'It is released into the synapse between neuron and muscle.'),
      Q('What does the principle of cross-cutting relationships say in relative dating?', 'a structure that cuts across another is younger', 'the bottom rocks are the youngest', 'The opposite. 🔄', 'all fossils are the same age', 'No. 🦴', 'a fault is always older than the layers', 'The opposite. 🔄', 'A fault is younger than the layers it cuts.'),
      Q('Which greenhouse gas comes mainly from livestock and rice paddies?', 'methane (CH₄)', 'oxygen (O₂)', 'It is not a greenhouse gas. 🌬️', 'nitrogen (N₂)', 'No. 🙅', 'helium', 'No. 🎈', 'For the same amount, it warms much more than CO₂.'),
      Q('What is albedo?', 'the share of solar radiation reflected by a surface', 'the Earth’s average temperature', 'No. 🌡️', 'the amount of rain', 'No. 🌧️', 'the height of clouds', 'No. ☁️', 'Ice has a high albedo; the ocean, a low one.'),
      Q('Where did Homo sapiens first appear?', 'in Africa', 'in Europe', 'It arrived there later. 🇪🇺', 'in Australia', 'Much later. 🦘', 'in Antarctica', 'No! 🐧', 'About 300,000 years ago.'),
      Q('Which hormone is released during prolonged stress?', 'cortisol', 'insulin', 'It regulates glucose levels. 🍬', 'melatonin', 'It helps you sleep. 😴', 'oxytocin', 'It plays a part in attachment and childbirth. 🤱', 'It is produced by the adrenal glands.')
    ],
    es:[
      Q('¿Cuántas células hijas produce una meiosis?', '4', '2', 'Eso es la mitosis. ✂️', '1', 'No. 🙅', '46', '¡Es el número de cromosomas! 🧬', 'Cuatro células con 23 cromosomas en el ser humano.'),
      Q('¿Qué es la deriva genética?', 'la variación al azar de la frecuencia de los alelos, sobre todo en poblaciones pequeñas', 'el desplazamiento de los continentes', 'Eso es la deriva continental. 🌍', 'una mutación provocada a propósito', 'No. 🧪', 'la selección de los más fuertes', 'Eso es la selección natural. 🔍', 'No depende de la ventaja de los alelos.'),
      Q('¿Qué hormona hace subir la glucemia?', 'el glucagón', 'la insulina', 'La hace bajar. 📉', 'solo la adrenalina', 'Ayuda, pero la principal es el glucagón. 🤔', 'la testosterona', 'No. 🙅', 'La insulina y el glucagón los produce el páncreas.'),
      Q('¿Qué es la diabetes de tipo 1?', 'una enfermedad en la que el páncreas ya no produce insulina', 'un exceso de azúcar en la fruta', 'No. 🍎', 'una enfermedad de los huesos', 'No. 🦴', 'una alergia al gluten', 'No. 🌾', 'Se trata con inyecciones de insulina.'),
      Q('¿Qué neurotransmisor ordena la contracción muscular en la unión neuromuscular?', 'la acetilcolina', 'la insulina', 'Es una hormona. 🍬', 'la hemoglobina', 'Transporta oxígeno. 🫁', 'la glucosa', 'Es un azúcar. 🍯', 'Se libera en la sinapsis entre neurona y músculo.'),
      Q('¿Qué dice el principio de intersección en la datación relativa?', 'una estructura que corta a otra es más reciente', 'las rocas de abajo son las más jóvenes', 'Al revés. 🔄', 'todos los fósiles tienen la misma edad', 'No. 🦴', 'una falla siempre es más antigua que las capas', 'Al revés. 🔄', 'Una falla es más reciente que las capas que corta.'),
      Q('¿Qué gas de efecto invernadero emiten sobre todo la ganadería y los arrozales?', 'el metano (CH₄)', 'el oxígeno (O₂)', 'No es un gas de efecto invernadero. 🌬️', 'el nitrógeno (N₂)', 'No. 🙅', 'el helio', 'No. 🎈', 'A igual cantidad, calienta mucho más que el CO₂.'),
      Q('¿Qué es el albedo?', 'la parte de la radiación solar que refleja una superficie', 'la temperatura media de la Tierra', 'No. 🌡️', 'la cantidad de lluvia', 'No. 🌧️', 'la altura de las nubes', 'No. ☁️', 'El hielo tiene un albedo alto; el océano, bajo.'),
      Q('¿Dónde apareció el Homo sapiens?', 'en África', 'en Europa', 'Llega más tarde. 🇪🇺', 'en Australia', 'Mucho más tarde. 🦘', 'en la Antártida', '¡No! 🐧', 'Hace unos 300 000 años.'),
      Q('¿Qué hormona se libera en caso de estrés prolongado?', 'el cortisol', 'la insulina', 'Regula la glucemia. 🍬', 'la melatonina', 'Ayuda a dormir. 😴', 'la oxitocina', 'Interviene en el apego y el parto. 🤱', 'La producen las glándulas suprarrenales.')
    ],
    de:[
      Q('Wie viele Tochterzellen entstehen bei der Meiose?', '4', '2', 'Das ist Mitose. ✂️', '1', 'Nein. 🙅', '46', 'Das ist Zahl der Chromosomen! 🧬', 'Vier Zellen mit je 23 Chromosomen beim Menschen.'),
      Q('Was ist genetische Drift?', 'die zufällige Veränderung der Allelhäufigkeit, besonders in kleinen Populationen', 'das Wandern der Kontinente', 'Das ist Kontinentaldrift. 🌍', 'eine absichtlich ausgelöste Mutation', 'Nein. 🧪', 'die Auslese der Stärksten', 'Das ist natürliche Selektion. 🔍', 'Sie hängt nicht vom Vorteil der Allele ab.'),
      Q('Welches Hormon erhöht den Blutzucker?', 'Glukagon', 'Insulin', 'Es senkt ihn. 📉', 'nur Adrenalin', 'Es hilft, aber das Haupthormon ist Glukagon. 🤔', 'Testosteron', 'Nein. 🙅', 'Insulin und Glukagon bildet die Bauchspeicheldrüse.'),
      Q('Was ist Diabetes Typ 1?', 'eine Krankheit, bei der die Bauchspeicheldrüse kein Insulin mehr bildet', 'zu viel Zucker im Obst', 'Nein. 🍎', 'eine Knochenkrankheit', 'Nein. 🦴', 'eine Glutenallergie', 'Nein. 🌾', 'Behandelt wird er mit Insulinspritzen.'),
      Q('Welcher Neurotransmitter löst an der motorischen Endplatte die Muskelkontraktion aus?', 'Acetylcholin', 'Insulin', 'Das ist ein Hormon. 🍬', 'Hämoglobin', 'Es transportiert Sauerstoff. 🫁', 'Glukose', 'Das ist ein Zucker. 🍯', 'Es wird in den Spalt zwischen Nerv und Muskel ausgeschüttet.'),
      Q('Was besagt das Durchschneidungsprinzip bei der relativen Datierung?', 'eine Struktur, die eine andere durchschneidet, ist jünger', 'die unteren Gesteine sind die jüngsten', 'Umgekehrt. 🔄', 'alle Fossilien sind gleich alt', 'Nein. 🦴', 'eine Verwerfung ist immer älter als Schichten', 'Umgekehrt. 🔄', 'Eine Verwerfung ist jünger als Schichten, durch welche sie verläuft.'),
      Q('Welches Treibhausgas stammt vor allem aus Viehzucht und Reisfeldern?', 'Methan (CH₄)', 'Sauerstoff (O₂)', 'Kein Treibhausgas. 🌬️', 'Stickstoff (N₂)', 'Nein. 🙅', 'Helium', 'Nein. 🎈', 'Bei gleicher Menge erwärmt es viel stärker als CO₂.'),
      Q('Was ist die Albedo?', 'der Anteil der Sonnenstrahlung, den eine Oberfläche zurückwirft', 'die Durchschnittstemperatur der Erde', 'Nein. 🌡️', 'die Regenmenge', 'Nein. 🌧️', 'die Höhe der Wolken', 'Nein. ☁️', 'Eis hat eine hohe Albedo, Ozeane eine niedrige.'),
      Q('Wo ist Homo sapiens entstanden?', 'in Afrika', 'in Europa', 'Er kam erst später dorthin. 🇪🇺', 'in Australien', 'Viel später. 🦘', 'in der Antarktis', 'Nein! 🐧', 'Vor etwa 300 000 Jahren.'),
      Q('Welches Hormon wird bei länger anhaltendem Stress ausgeschüttet?', 'Cortisol', 'Insulin', 'Es regelt den Blutzucker. 🍬', 'Melatonin', 'Es hilft beim Einschlafen. 😴', 'Oxytocin', 'Es wirkt bei Bindung und Geburt. 🤱', 'Es wird in den Nebennieren gebildet.')
    ]
  });

  // ═════════ Cours de 2nde ═════════
  L('svt', 'cours-sv2', {
    fr:[
      Q('Quelle structure délimite toute cellule ?', 'la membrane plasmique', 'la paroi', 'Seules certaines cellules en ont une, comme les végétales. 🌿', 'le noyau', 'Il est à l’intérieur. 🎯', 'la mitochondrie', 'Elle est à l’intérieur. ⚡', 'Elle contrôle les échanges avec l’extérieur.'),
      Q('Qu’ont les cellules végétales que n’ont pas les cellules animales ?', 'une paroi et des chloroplastes', 'un noyau', 'Les cellules animales en ont aussi. 🎯', 'une membrane', 'Toutes les cellules en ont une. 🫧', 'des mitochondries', 'Les cellules animales en ont aussi. ⚡', 'La paroi est faite surtout de cellulose.'),
      Q('Qu’est-ce qu’un agrosystème ?', 'un écosystème cultivé et géré par l’être humain', 'un écosystème sans aucun être vivant', 'Non. 🏜️', 'une forêt vierge', 'C’est un écosystème naturel. 🌳', 'une usine d’engrais', 'Non. 🏭', 'Un champ de blé est un agrosystème.'),
      Q('De quoi naît un sol ?', 'de l’altération d’une roche mère et de l’apport de matière organique', 'de la pluie seulement', 'Elle aide, mais pas seule. 🌧️', 'de la lave fraîche uniquement', 'Pas uniquement. 🌋', 'du sable de la plage', 'Non. 🏖️', 'Il faut des siècles pour former quelques centimètres de sol.'),
      Q('Qu’est-ce que le microbiote intestinal ?', 'l’ensemble des micro-organismes qui vivent dans notre intestin', 'une maladie de l’intestin', 'Il est au contraire utile. 💪', 'un médicament', 'Non. 💊', 'un muscle de l’intestin', 'Non. 🙅', 'Il aide à la digestion et à l’immunité.'),
      Q('Comment s’appelle la cellule reproductrice femelle libérée à l’ovulation ?', 'l’ovocyte (ovule)', 'le spermatozoïde', 'C’est la cellule mâle. 🔄', 'le neurone', 'Non. 🧠', 'le globule blanc', 'Non. 🛡️', 'Il peut être fécondé dans les trompes.'),
      Q('Qu’est-ce qu’un fossile ?', 'un reste ou une trace d’être vivant conservé dans une roche', 'un caillou de forme bizarre', 'Pas forcément ! 🪨', 'un animal très vieux encore vivant', 'Non. 🐢', 'un minéral précieux', 'Non. 💎', 'Les fossiles aident à reconstituer l’histoire du vivant.'),
      Q('Pourquoi une population isolée sur une île peut-elle évoluer différemment ?', 'à cause de la sélection naturelle et de la dérive dans un milieu différent', 'parce qu’elle ne voit pas les autres', 'Ce n’est pas une question de vue. 👀', 'parce qu’elle mange du sable', 'Non ! 🏝️', 'parce qu’elle n’a plus de gènes', 'Non. 🧬', 'Les pinsons des Galápagos en sont un exemple célèbre.')
    ],
    en:[
      Q('Which structure surrounds every cell?', 'the plasma membrane', 'the cell wall', 'Only some cells have one, such as plant cells. 🌿', 'the nucleus', 'It is inside. 🎯', 'the mitochondrion', 'It is inside. ⚡', 'It controls exchanges with the outside.'),
      Q('What do plant cells have that animal cells do not?', 'a cell wall and chloroplasts', 'a nucleus', 'Animal cells have one too. 🎯', 'a membrane', 'All cells have one. 🫧', 'mitochondria', 'Animal cells have them too. ⚡', 'The wall is made mainly of cellulose.'),
      Q('What is an agrosystem?', 'an ecosystem farmed and managed by humans', 'an ecosystem with no living things', 'No. 🏜️', 'a virgin forest', 'That is a natural ecosystem. 🌳', 'a fertiliser factory', 'No. 🏭', 'A wheat field is an agrosystem.'),
      Q('What does soil form from?', 'the weathering of a parent rock and the addition of organic matter', 'rain alone', 'It helps, but not alone. 🌧️', 'only fresh lava', 'Not only. 🌋', 'beach sand', 'No. 🏖️', 'It takes centuries to form a few centimetres of soil.'),
      Q('What is the gut microbiota?', 'all the micro-organisms living in our intestine', 'a disease of the intestine', 'On the contrary, it is useful. 💪', 'a medicine', 'No. 💊', 'a muscle of the intestine', 'No. 🙅', 'It helps digestion and immunity.'),
      Q('What is the female reproductive cell released at ovulation called?', 'the oocyte (egg cell)', 'the sperm cell', 'That is the male cell. 🔄', 'the neuron', 'No. 🧠', 'the white blood cell', 'No. 🛡️', 'It can be fertilised in the fallopian tubes.'),
      Q('What is a fossil?', 'a remain or trace of a living thing preserved in rock', 'an oddly shaped pebble', 'Not necessarily! 🪨', 'a very old animal still alive', 'No. 🐢', 'a precious mineral', 'No. 💎', 'Fossils help reconstruct the history of life.'),
      Q('Why can a population isolated on an island evolve differently?', 'because of natural selection and drift in a different environment', 'because it cannot see the others', 'It is not about eyesight. 👀', 'because it eats sand', 'No! 🏝️', 'because it has no genes left', 'No. 🧬', 'The Galápagos finches are a famous example.')
    ],
    es:[
      Q('¿Qué estructura delimita toda célula?', 'la membrana plasmática', 'la pared celular', 'Solo algunas células la tienen, como las vegetales. 🌿', 'el núcleo', 'Está dentro. 🎯', 'la mitocondria', 'Está dentro. ⚡', 'Controla los intercambios con el exterior.'),
      Q('¿Qué tienen las células vegetales que no tienen las animales?', 'una pared celular y cloroplastos', 'un núcleo', 'Las animales también lo tienen. 🎯', 'una membrana', 'Todas las células la tienen. 🫧', 'mitocondrias', 'Las animales también las tienen. ⚡', 'La pared está hecha sobre todo de celulosa.'),
      Q('¿Qué es un agrosistema?', 'un ecosistema cultivado y gestionado por el ser humano', 'un ecosistema sin ningún ser vivo', 'No. 🏜️', 'un bosque virgen', 'Es un ecosistema natural. 🌳', 'una fábrica de abonos', 'No. 🏭', 'Un campo de trigo es un agrosistema.'),
      Q('¿De qué nace un suelo?', 'de la alteración de una roca madre y del aporte de materia orgánica', 'solo de la lluvia', 'Ayuda, pero no sola. 🌧️', 'solo de lava fresca', 'No solo. 🌋', 'de la arena de la playa', 'No. 🏖️', 'Se necesitan siglos para formar unos centímetros de suelo.'),
      Q('¿Qué es la microbiota intestinal?', 'el conjunto de microorganismos que viven en nuestro intestino', 'una enfermedad del intestino', 'Al contrario, es útil. 💪', 'un medicamento', 'No. 💊', 'un músculo del intestino', 'No. 🙅', 'Ayuda a la digestión y a la inmunidad.'),
      Q('¿Cómo se llama la célula reproductora femenina liberada en la ovulación?', 'el ovocito (óvulo)', 'el espermatozoide', 'Es la célula masculina. 🔄', 'la neurona', 'No. 🧠', 'el glóbulo blanco', 'No. 🛡️', 'Puede ser fecundado en las trompas.'),
      Q('¿Qué es un fósil?', 'un resto o una huella de un ser vivo conservado en una roca', 'una piedra de forma rara', '¡No necesariamente! 🪨', 'un animal muy viejo todavía vivo', 'No. 🐢', 'un mineral precioso', 'No. 💎', 'Los fósiles ayudan a reconstruir la historia de la vida.'),
      Q('¿Por qué una población aislada en una isla puede evolucionar de forma distinta?', 'por la selección natural y la deriva en un medio diferente', 'porque no ve a las demás', 'No es cuestión de vista. 👀', 'porque come arena', '¡No! 🏝️', 'porque ya no tiene genes', 'No. 🧬', 'Los pinzones de las Galápagos son un ejemplo célebre.')
    ],
    de:[
      Q('Welche Struktur umgibt jede Zelle?', 'die Zellmembran', 'die Zellwand', 'Nur manche Zellen haben eine, etwa Pflanzenzellen. 🌿', 'der Zellkern', 'Er liegt innen. 🎯', 'das Mitochondrium', 'Es liegt innen. ⚡', 'Sie steuert den Austausch mit der Umgebung.'),
      Q('Was haben Pflanzenzellen, Tierzellen aber nicht?', 'eine Zellwand und Chloroplasten', 'einen Zellkern', 'Tierzellen haben auch einen. 🎯', 'eine Membran', 'Alle Zellen haben eine. 🫧', 'Mitochondrien', 'Tierzellen haben auch welche. ⚡', 'Zellwände bestehen vor allem aus Cellulose.'),
      Q('Was ist ein Agrarökosystem?', 'ein vom Menschen bewirtschaftetes Ökosystem', 'ein Ökosystem ohne Lebewesen', 'Nein. 🏜️', 'ein Urwald', 'Das ist ein natürliches Ökosystem. 🌳', 'eine Düngerfabrik', 'Nein. 🏭', 'Ein Weizenfeld ist ein Agrarökosystem.'),
      Q('Woraus entsteht ein Boden?', 'aus der Verwitterung eines Ausgangsgesteins und organischem Material', 'nur aus Regen', 'Er hilft, aber nicht allein. 🌧️', 'nur aus frischer Lava', 'Nicht nur. 🌋', 'aus Strandsand', 'Nein. 🏖️', 'Für wenige Zentimeter Boden braucht es Jahrhunderte.'),
      Q('Was ist das Darmmikrobiom?', 'alle Mikroorganismen, welche in unserem Darm leben', 'eine Darmkrankheit', 'Im Gegenteil, es ist nützlich. 💪', 'ein Medikament', 'Nein. 💊', 'ein Darmmuskel', 'Nein. 🙅', 'Es hilft bei Verdauung und Immunabwehr.'),
      Q('Wie heißt eine weibliche Keimzelle, welche beim Eisprung freigesetzt wird?', 'die Eizelle', 'das Spermium', 'Das ist männlich. 🔄', 'die Nervenzelle', 'Nein. 🧠', 'das weiße Blutkörperchen', 'Nein. 🛡️', 'Sie kann im Eileiter befruchtet werden.'),
      Q('Was ist ein Fossil?', 'ein Überrest oder eine Spur eines Lebewesens, im Gestein erhalten', 'ein seltsam geformter Stein', 'Nicht unbedingt! 🪨', 'ein sehr altes, noch lebendes Tier', 'Nein. 🐢', 'ein Edelstein', 'Nein. 💎', 'Fossilien helfen, Geschichte des Lebens zu rekonstruieren.'),
      Q('Warum kann sich eine isolierte Inselpopulation anders entwickeln?', 'durch natürliche Selektion und Drift in einer anderen Umwelt', 'weil sie andere nicht sieht', 'Mit Sehen hat das nichts zu tun. 👀', 'weil sie Sand frisst', 'Nein! 🏝️', 'weil sie keine Gene mehr hat', 'Nein. 🧬', 'Darwinfinken auf Galápagos sind ein berühmtes Beispiel.')
    ]
  });

  // ═════════ Cours de 1re ═════════
  L('svt', 'cours-sv1', {
    fr:[
      Q('Qu’est-ce qui rend une enzyme spécifique ?', 'la forme de son site actif, adaptée à un substrat', 'sa couleur', 'Non. 🎨', 'sa taille seulement', 'Pas seulement. 📏', 'la température de la pièce', 'Elle influence son activité, pas sa spécificité. 🌡️', 'Modèle de la clé et de la serrure.'),
      Q('Qu’est-ce que le phénotype ?', 'l’ensemble des caractères observables d’un individu', 'l’ensemble de ses gènes', 'C’est le génotype. 🧬', 'une photo de famille', 'Non ! 📸', 'une maladie génétique', 'Non. 🙅', 'Il existe à l’échelle de l’organisme, de la cellule et des molécules.'),
      Q('Où a lieu la traduction de l’ARN messager en protéine ?', 'dans les ribosomes, dans le cytoplasme', 'dans le noyau', 'C’est là qu’a lieu la transcription. 🎯', 'dans la membrane', 'Non. 🫧', 'dans le sang', 'Non. 🙅', 'L’ARNm sort du noyau pour être traduit.'),
      Q('Combien de nucléotides forment un codon ?', '3', '2', 'Il en faut un de plus. ➕', '4', 'Un de trop. ➖', '20', 'C’est à peu près le nombre d’acides aminés. 🔢', 'Chaque codon correspond à un acide aminé ou à un signal stop.'),
      Q('Que se passe-t-il au niveau d’une dorsale océanique ?', 'deux plaques s’écartent et une nouvelle lithosphère se forme', 'deux continents entrent en collision', 'C’est la formation des montagnes. 🏔️', 'une plaque plonge sous une autre', 'C’est la subduction. 🕳️', 'rien ne bouge', 'Non. 🌋', 'C’est une zone de divergence.'),
      Q('Quelle roche forme l’essentiel du manteau supérieur ?', 'la péridotite', 'le granite', 'Il forme la croûte continentale. 🏔️', 'le calcaire', 'C’est une roche sédimentaire. 🐚', 'le sable', 'Ce n’est pas une roche du manteau. 🏖️', 'Elle est riche en olivine, de couleur verte.'),
      Q('Quels sont les signes de la réaction inflammatoire ?', 'rougeur, chaleur, gonflement et douleur', 'froid, pâleur et silence', 'Non. 🥶', 'faim et soif', 'Non. 🍽️', 'éternuements seulement', 'Pas seulement. 🤧', 'Elle fait partie de l’immunité innée.'),
      Q('Qu’est-ce qu’un réseau trophique ?', 'l’ensemble des chaînes alimentaires reliées dans un écosystème', 'un réseau de routes', 'Non. 🛣️', 'un réseau informatique', 'Non. 💻', 'le système nerveux', 'Non. 🧠', 'Il montre qui mange qui.')
    ],
    en:[
      Q('What makes an enzyme specific?', 'the shape of its active site, matched to a substrate', 'its colour', 'No. 🎨', 'only its size', 'Not only. 📏', 'the room temperature', 'It affects activity, not specificity. 🌡️', 'The lock-and-key model.'),
      Q('What is the phenotype?', 'all the observable characteristics of an individual', 'all its genes', 'That is the genotype. 🧬', 'a family photo', 'No! 📸', 'a genetic disease', 'No. 🙅', 'It exists at the level of the organism, the cell and the molecules.'),
      Q('Where is messenger RNA translated into protein?', 'in the ribosomes, in the cytoplasm', 'in the nucleus', 'That is where transcription happens. 🎯', 'in the membrane', 'No. 🫧', 'in the bloodstream', 'No. 🙅', 'mRNA leaves the nucleus to be translated.'),
      Q('How many nucleotides make up a codon?', '3', '2', 'One more is needed. ➕', '4', 'One too many. ➖', '20', 'That is roughly the number of amino acids. 🔢', 'Each codon corresponds to an amino acid or a stop signal.'),
      Q('What happens at a mid-ocean ridge?', 'two plates move apart and new lithosphere forms', 'two continents collide', 'That is mountain building. 🏔️', 'one plate sinks beneath another', 'That is subduction. 🕳️', 'nothing moves', 'No. 🌋', 'It is a divergence zone.'),
      Q('Which rock makes up most of the upper mantle?', 'peridotite', 'granite', 'It forms the continental crust. 🏔️', 'limestone', 'That is a sedimentary rock. 🐚', 'sand', 'That is not a mantle rock. 🏖️', 'It is rich in olivine, which is green.'),
      Q('What are the signs of inflammation?', 'redness, heat, swelling and pain', 'cold, paleness and silence', 'No. 🥶', 'hunger and thirst', 'No. 🍽️', 'only sneezing', 'Not only. 🤧', 'It is part of innate immunity.'),
      Q('What is a food web?', 'all the linked food chains in an ecosystem', 'a road network', 'No. 🛣️', 'a computer network', 'No. 💻', 'the nervous system', 'No. 🧠', 'It shows who eats whom.')
    ],
    es:[
      Q('¿Qué hace específica a una enzima?', 'la forma de su centro activo, adaptada a un sustrato', 'su color', 'No. 🎨', 'solo su tamaño', 'No solo. 📏', 'la temperatura de la habitación', 'Influye en su actividad, no en su especificidad. 🌡️', 'Modelo de la llave y la cerradura.'),
      Q('¿Qué es el fenotipo?', 'el conjunto de caracteres observables de un individuo', 'el conjunto de sus genes', 'Eso es el genotipo. 🧬', 'una foto de familia', '¡No! 📸', 'una enfermedad genética', 'No. 🙅', 'Existe a escala del organismo, de la célula y de las moléculas.'),
      Q('¿Dónde se traduce el ARN mensajero en proteína?', 'en los ribosomas, en el citoplasma', 'en el núcleo', 'Ahí ocurre la transcripción. 🎯', 'en la membrana', 'No. 🫧', 'en la sangre', 'No. 🙅', 'El ARNm sale del núcleo para ser traducido.'),
      Q('¿Cuántos nucleótidos forman un codón?', '3', '2', 'Falta uno. ➕', '4', 'Sobra uno. ➖', '20', 'Es más o menos el número de aminoácidos. 🔢', 'Cada codón corresponde a un aminoácido o a una señal de parada.'),
      Q('¿Qué ocurre en una dorsal oceánica?', 'dos placas se separan y se forma nueva litosfera', 'dos continentes chocan', 'Eso forma montañas. 🏔️', 'una placa se hunde bajo otra', 'Eso es la subducción. 🕳️', 'nada se mueve', 'No. 🌋', 'Es una zona de divergencia.'),
      Q('¿Qué roca forma la mayor parte del manto superior?', 'la peridotita', 'el granito', 'Forma la corteza continental. 🏔️', 'la caliza', 'Es una roca sedimentaria. 🐚', 'la arena', 'No es una roca del manto. 🏖️', 'Es rica en olivino, de color verde.'),
      Q('¿Cuáles son los signos de la reacción inflamatoria?', 'enrojecimiento, calor, hinchazón y dolor', 'frío, palidez y silencio', 'No. 🥶', 'hambre y sed', 'No. 🍽️', 'solo estornudos', 'No solo. 🤧', 'Forma parte de la inmunidad innata.'),
      Q('¿Qué es una red trófica?', 'el conjunto de cadenas alimentarias conectadas en un ecosistema', 'una red de carreteras', 'No. 🛣️', 'una red informática', 'No. 💻', 'el sistema nervioso', 'No. 🧠', 'Muestra quién se come a quién.')
    ],
    de:[
      Q('Was macht ein Enzym spezifisch?', 'Form seines aktiven Zentrums, passend zu einem Substrat', 'seine Farbe', 'Nein. 🎨', 'nur seine Größe', 'Nicht nur. 📏', 'Raumtemperatur', 'Sie beeinflusst Aktivität, nicht Spezifität. 🌡️', 'Schlüssel-Schloss-Prinzip.'),
      Q('Was ist der Phänotyp?', 'alle beobachtbaren Merkmale eines Lebewesens', 'alle seine Gene', 'Das ist der Genotyp. 🧬', 'ein Familienfoto', 'Nein! 📸', 'eine Erbkrankheit', 'Nein. 🙅', 'Er zeigt sich auf Ebene von Organismus, Zelle und Molekülen.'),
      Q('Wo wird Boten-RNA in Protein übersetzt?', 'an Ribosomen im Zytoplasma', 'im Zellkern', 'Dort findet Transkription statt. 🎯', 'in der Membran', 'Nein. 🫧', 'im Blut', 'Nein. 🙅', 'mRNA verlässt den Kern, um übersetzt zu werden.'),
      Q('Aus wie vielen Nukleotiden besteht ein Codon?', '3', '2', 'Eins fehlt. ➕', '4', 'Eins zu viel. ➖', '20', 'Das ist ungefähr Zahl der Aminosäuren. 🔢', 'Jedes Codon steht für eine Aminosäure oder ein Stoppsignal.'),
      Q('Was passiert an einem mittelozeanischen Rücken?', 'zwei Platten entfernen sich, und neue Lithosphäre entsteht', 'zwei Kontinente stoßen zusammen', 'So entstehen Gebirge. 🏔️', 'eine Platte taucht unter eine andere', 'Das ist Subduktion. 🕳️', 'nichts bewegt sich', 'Nein. 🌋', 'Es ist eine Spreizungszone.'),
      Q('Welches Gestein bildet den größten Teil des oberen Erdmantels?', 'Peridotit', 'Granit', 'Er bildet kontinentale Kruste. 🏔️', 'Kalkstein', 'Das ist ein Sedimentgestein. 🐚', 'Sand', 'Kein Mantelgestein. 🏖️', 'Er ist reich an grünem Olivin.'),
      Q('Was sind Anzeichen einer Entzündung?', 'Rötung, Wärme, Schwellung und Schmerz', 'Kälte, Blässe und Stille', 'Nein. 🥶', 'Hunger und Durst', 'Nein. 🍽️', 'nur Niesen', 'Nicht nur. 🤧', 'Sie gehört zur angeborenen Immunabwehr.'),
      Q('Was ist ein Nahrungsnetz?', 'alle verbundenen Nahrungsketten eines Ökosystems', 'ein Straßennetz', 'Nein. 🛣️', 'ein Computernetz', 'Nein. 💻', 'das Nervensystem', 'Nein. 🧠', 'Es zeigt, wer wen frisst.')
    ]
  });

  // ═════════ Cours de Tle ═════════
  L('svt', 'cours-svt', {
    fr:[
      Q('Qu’est-ce que la spéciation ?', 'la formation d’une nouvelle espèce à partir d’une population', 'la disparition d’une espèce', 'C’est l’extinction. 🦤', 'le classement des espèces', 'C’est la classification. 📋', 'la domestication d’un animal', 'Non. 🐕', 'Elle passe souvent par un isolement reproducteur.'),
      Q('Quels sont les principaux puits de carbone naturels ?', 'les océans et les forêts', 'les voitures et les usines', 'Ce sont des sources ! 🚗', 'les volcans', 'Ils émettent du CO₂. 🌋', 'les déserts de sable', 'Ils stockent très peu. 🏜️', 'Ils absorbent une partie du CO₂ que nous émettons.'),
      Q('Quelle roche caractérise la croûte continentale ?', 'le granite', 'le basalte', 'Il forme surtout la croûte océanique. 🌊', 'la péridotite', 'Elle forme le manteau. 🟢', 'le charbon', 'C’est une roche sédimentaire combustible. ⛏️', 'La croûte continentale est plus épaisse et moins dense.'),
      Q('Quel centre nerveux commande le réflexe myotatique ?', 'la moelle épinière', 'le cortex moteur', 'Il commande les mouvements volontaires. 🧠', 'le cœur', 'Non. ❤️', 'l’estomac', 'Non. 🍽️', 'Le réflexe ne passe pas par le cerveau.'),
      Q('Grâce à quelles protéines une fibre musculaire se contracte-t-elle ?', 'l’actine et la myosine', 'l’insuline et le glucagon', 'Ce sont des hormones. 🍬', 'l’hémoglobine', 'Elle transporte le dioxygène. 🫁', 'la kératine', 'Elle forme les ongles et les cheveux. 💅', 'Les filaments glissent les uns sur les autres.'),
      Q('Qu’a changé la domestication des plantes cultivées ?', 'l’être humain a sélectionné des caractères utiles, comme de gros grains', 'les plantes sont devenues sauvages', 'C’est l’inverse. 🔄', 'les plantes ont perdu leurs gènes', 'Non. 🧬', 'rien du tout', 'Le maïs ne ressemble plus à son ancêtre ! 🌽', 'Le maïs descend de la téosinte, au Mexique.'),
      Q('Qu’est-ce que le pergélisol (permafrost) ?', 'un sol gelé en permanence depuis au moins deux ans', 'un glacier qui avance', 'Non. 🏔️', 'de la neige fraîche', 'Non. ❄️', 'un sol volcanique', 'Non. 🌋', 'Son dégel libère du méthane et du CO₂.'),
      Q('Comment les plantes à fleurs attirent-elles les pollinisateurs ?', 'par des couleurs, des odeurs et du nectar', 'par des cris', 'Les plantes ne crient pas ! 🔇', 'en se déplaçant vers eux', 'Elles sont fixées. 🌱', 'grâce à des aimants', 'Non ! 🧲', 'C’est un exemple de coévolution.')
    ],
    en:[
      Q('What is speciation?', 'the formation of a new species from a population', 'the disappearance of a species', 'That is extinction. 🦤', 'the classification of species', 'That is classification. 📋', 'the domestication of an animal', 'No. 🐕', 'It often involves reproductive isolation.'),
      Q('What are the main natural carbon sinks?', 'oceans and forests', 'cars and factories', 'Those are sources! 🚗', 'volcanoes', 'They emit CO₂. 🌋', 'sand deserts', 'They store very little. 🏜️', 'They absorb part of the CO₂ we emit.'),
      Q('Which rock is typical of the continental crust?', 'granite', 'basalt', 'It forms mainly the oceanic crust. 🌊', 'peridotite', 'It forms the mantle. 🟢', 'coal', 'That is a combustible sedimentary rock. ⛏️', 'The continental crust is thicker and less dense.'),
      Q('Which nerve centre controls the stretch reflex?', 'the spinal cord', 'the motor cortex', 'It controls voluntary movements. 🧠', 'the heart', 'No. ❤️', 'the stomach', 'No. 🍽️', 'The reflex does not go through the brain.'),
      Q('Which proteins allow a muscle fibre to contract?', 'actin and myosin', 'insulin and glucagon', 'Those are hormones. 🍬', 'haemoglobin', 'It carries oxygen. 🫁', 'keratin', 'It forms nails and hair. 💅', 'The filaments slide over each other.'),
      Q('What did the domestication of crop plants change?', 'humans selected useful traits, such as large grains', 'plants became wild', 'The opposite. 🔄', 'plants lost their genes', 'No. 🧬', 'nothing at all', 'Maize no longer looks like its ancestor! 🌽', 'Maize descends from teosinte, in Mexico.'),
      Q('What is permafrost?', 'ground that has stayed frozen for at least two years', 'an advancing glacier', 'No. 🏔️', 'fresh snow', 'No. ❄️', 'volcanic soil', 'No. 🌋', 'Its thaw releases methane and CO₂.'),
      Q('How do flowering plants attract pollinators?', 'with colours, scents and nectar', 'by shouting', 'Plants do not shout! 🔇', 'by moving towards them', 'They are rooted. 🌱', 'with magnets', 'No! 🧲', 'This is an example of coevolution.')
    ],
    es:[
      Q('¿Qué es la especiación?', 'la formación de una nueva especie a partir de una población', 'la desaparición de una especie', 'Eso es la extinción. 🦤', 'la clasificación de las especies', 'Eso es la clasificación. 📋', 'la domesticación de un animal', 'No. 🐕', 'A menudo pasa por un aislamiento reproductivo.'),
      Q('¿Cuáles son los principales sumideros naturales de carbono?', 'los océanos y los bosques', 'los coches y las fábricas', '¡Son fuentes! 🚗', 'los volcanes', 'Emiten CO₂. 🌋', 'los desiertos de arena', 'Almacenan muy poco. 🏜️', 'Absorben parte del CO₂ que emitimos.'),
      Q('¿Qué roca caracteriza la corteza continental?', 'el granito', 'el basalto', 'Forma sobre todo la corteza oceánica. 🌊', 'la peridotita', 'Forma el manto. 🟢', 'el carbón', 'Es una roca sedimentaria combustible. ⛏️', 'La corteza continental es más gruesa y menos densa.'),
      Q('¿Qué centro nervioso controla el reflejo miotático?', 'la médula espinal', 'la corteza motora', 'Controla los movimientos voluntarios. 🧠', 'el corazón', 'No. ❤️', 'el estómago', 'No. 🍽️', 'El reflejo no pasa por el cerebro.'),
      Q('¿Gracias a qué proteínas se contrae una fibra muscular?', 'la actina y la miosina', 'la insulina y el glucagón', 'Son hormonas. 🍬', 'la hemoglobina', 'Transporta oxígeno. 🫁', 'la queratina', 'Forma uñas y pelo. 💅', 'Los filamentos se deslizan unos sobre otros.'),
      Q('¿Qué cambió la domesticación de las plantas cultivadas?', 'el ser humano seleccionó caracteres útiles, como granos grandes', 'las plantas se volvieron salvajes', 'Al revés. 🔄', 'las plantas perdieron sus genes', 'No. 🧬', 'nada en absoluto', '¡El maíz ya no se parece a su antepasado! 🌽', 'El maíz desciende del teosinte, en México.'),
      Q('¿Qué es el permafrost?', 'un suelo congelado de forma permanente desde hace al menos dos años', 'un glaciar que avanza', 'No. 🏔️', 'nieve fresca', 'No. ❄️', 'un suelo volcánico', 'No. 🌋', 'Su deshielo libera metano y CO₂.'),
      Q('¿Cómo atraen las plantas con flores a los polinizadores?', 'con colores, olores y néctar', 'con gritos', '¡Las plantas no gritan! 🔇', 'desplazándose hacia ellos', 'Están fijas. 🌱', 'con imanes', '¡No! 🧲', 'Es un ejemplo de coevolución.')
    ],
    de:[
      Q('Was ist Artbildung?', 'Entstehung einer neuen Art aus einer Population', 'Verschwinden einer Art', 'Das ist Aussterben. 🦤', 'Einordnung von Arten', 'Das ist Systematik. 📋', 'Zähmung eines Tieres', 'Nein. 🐕', 'Oft geht ihr eine Fortpflanzungsisolation voraus.'),
      Q('Was sind wichtigste natürliche Kohlenstoffsenken?', 'Ozeane und Wälder', 'Autos und Fabriken', 'Das sind Quellen! 🚗', 'Vulkane', 'Sie stoßen CO₂ aus. 🌋', 'Sandwüsten', 'Sie speichern sehr wenig. 🏜️', 'Sie nehmen einen Teil unseres CO₂ auf.'),
      Q('Welches Gestein ist typisch für kontinentale Kruste?', 'Granit', 'Basalt', 'Er bildet vor allem ozeanische Kruste. 🌊', 'Peridotit', 'Er bildet den Mantel. 🟢', 'Kohle', 'Das ist ein brennbares Sedimentgestein. ⛏️', 'Kontinentale Kruste ist dicker und weniger dicht.'),
      Q('Welches Nervenzentrum steuert den Dehnungsreflex?', 'das Rückenmark', 'der motorische Cortex', 'Er steuert willkürliche Bewegungen. 🧠', 'das Herz', 'Nein. ❤️', 'der Magen', 'Nein. 🍽️', 'Der Reflex läuft nicht über das Gehirn.'),
      Q('Dank welcher Proteine zieht sich eine Muskelfaser zusammen?', 'Aktin und Myosin', 'Insulin und Glukagon', 'Das sind Hormone. 🍬', 'Hämoglobin', 'Es transportiert Sauerstoff. 🫁', 'Keratin', 'Es bildet Nägel und Haare. 💅', 'Filamente gleiten aneinander vorbei.'),
      Q('Was hat die Domestizierung von Kulturpflanzen verändert?', 'der Mensch hat nützliche Merkmale ausgewählt, etwa große Körner', 'Pflanzen wurden wild', 'Umgekehrt. 🔄', 'Pflanzen verloren ihre Gene', 'Nein. 🧬', 'gar nichts', 'Mais sieht seinem Vorfahren nicht mehr ähnlich! 🌽', 'Mais stammt von der Teosinte aus Mexiko ab.'),
      Q('Was ist Permafrost?', 'Boden, welcher seit mindestens zwei Jahren dauerhaft gefroren ist', 'ein vorrückender Gletscher', 'Nein. 🏔️', 'Neuschnee', 'Nein. ❄️', 'vulkanischer Boden', 'Nein. 🌋', 'Sein Auftauen setzt Methan und CO₂ frei.'),
      Q('Wie locken Blütenpflanzen Bestäuber an?', 'mit Farben, Düften und Nektar', 'mit Rufen', 'Pflanzen rufen nicht! 🔇', 'indem sie zu ihnen wandern', 'Sie sind fest verwurzelt. 🌱', 'mit Magneten', 'Nein! 🧲', 'Das ist ein Beispiel für Koevolution.')
    ]
  });
})();
