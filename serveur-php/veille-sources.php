<?php
// Sources OFFICIELLES lues par la veille : programmes, épreuves d'examen, diplômes et sujets officiels.
// v6.75 : plusieurs systèmes scolaires (France, Italie, Espagne, Allemagne, États-Unis, Royaume-Uni) et toutes les matières.
// Seuls les domaines officiels de chaque système sont acceptés (aussi après une redirection).
// Les adresses des ministères changent parfois : en ajouter ou en corriger ici, une ligne par document.
//
// Deux formes de ligne :
//  · ancienne forme (maths, France) : [sorte, classe, adresse] — sorte : 'programme' ou 'annales' ;
//  · forme complète : ['systeme' => 'fr', 'sorte' => 'programme'|'epreuve'|'diplome'|'annales', 'matiere' => 'francais', 'classe' => '5e', 'url' => '…']
//    matiere : identifiant d'une matière du jeu (francais, histoire, svt, physique…) ou 'toutes' pour un examen.
//    classe : 6e … Tle pour la France ; pour un autre système, la classe française équivalente la plus proche (indicatif).
return [
  'domaines' => ['www.education.gouv.fr', 'education.gouv.fr', 'eduscol.education.fr', 'eduscol.education.gouv.fr'],
  'systemes' => [
    'fr' => ['nom' => 'France', 'langue' => 'fr', 'domaines' => ['www.education.gouv.fr', 'education.gouv.fr', 'eduscol.education.fr', 'eduscol.education.gouv.fr']],
    'it' => ['nom' => 'Italie', 'langue' => 'it', 'domaines' => ['www.mim.gov.it', 'mim.gov.it', 'www.istruzione.it', 'istruzione.it', 'www.normattiva.it']],
    'es' => ['nom' => 'Espagne', 'langue' => 'es', 'domaines' => ['www.boe.es', 'boe.es', 'www.educacionfpydeportes.gob.es', 'www.lamoncloa.gob.es']],
    'de' => ['nom' => 'Allemagne', 'langue' => 'de', 'domaines' => ['www.kmk.org', 'kmk.org']],
    'us' => ['nom' => 'États-Unis', 'langue' => 'en', 'domaines' => ['www.thecorestandards.org', 'corestandards.org', 'www.nextgenscience.org', 'satsuite.collegeboard.org']],
    'uk' => ['nom' => 'Royaume-Uni', 'langue' => 'en', 'domaines' => ['www.gov.uk']],
    'pt' => ['nom' => 'Portugal', 'langue' => 'pt', 'domaines' => ['eduqa.pt', 'www.eduqa.pt', 'www.dge.mec.pt', 'dge.mec.pt', 'iave.pt', 'www.iave.pt']],
  ],
  'sources' => [
    // ── France, maths (forme historique) ──
    ['programme', '6e',   'https://eduscol.education.fr/document/14014/download'],          // Attendus de fin d'année de 6e
    ['programme', '5e',   'https://eduscol.education.gouv.fr/4509/mathematiques'],           // Page maths Eduscol (cycle 4)
    ['programme', '4e',   'https://eduscol.education.gouv.fr/4509/mathematiques'],
    ['programme', '3e',   'https://eduscol.education.gouv.fr/4509/mathematiques'],
    ['programme', '2nde', 'https://eduscol.education.gouv.fr/4509/mathematiques'],
    ['programme', '1re',  'https://www.education.gouv.fr/reussir-au-lycee/epreuve-anticipee-de-mathematiques-en-classe-de-premiere-450607'],
    ['programme', 'Tle',  'https://eduscol.education.gouv.fr/4509/mathematiques'],
    ['annales',   '3e',   'https://eduscol.education.gouv.fr/5202/preparer-le-diplome-national-du-brevet-dnb-avec-les-sujets-des-annales'],
    ['annales',   '1re',  'https://www.education.gouv.fr/reussir-au-lycee/epreuve-anticipee-de-mathematiques-en-classe-de-premiere-450607'],
    // ── France, autres matières (programmes du cycle 4 : nouveau programme de français en 5e à la rentrée 2026) ──
    ['systeme' => 'fr', 'sorte' => 'programme', 'matiere' => 'francais', 'classe' => '5e', 'url' => 'https://eduscol.education.gouv.fr/4503/francais'],
    ['systeme' => 'fr', 'sorte' => 'programme', 'matiere' => 'francais', 'classe' => '4e', 'url' => 'https://eduscol.education.gouv.fr/4362/enseigner-au-cycle-4'],
    ['systeme' => 'fr', 'sorte' => 'programme', 'matiere' => 'histoire', 'classe' => '3e', 'url' => 'https://eduscol.education.gouv.fr/4362/enseigner-au-cycle-4'],
    ['systeme' => 'fr', 'sorte' => 'programme', 'matiere' => 'svt',      'classe' => '4e', 'url' => 'https://eduscol.education.gouv.fr/4362/enseigner-au-cycle-4'],
    ['systeme' => 'fr', 'sorte' => 'programme', 'matiere' => 'physique', 'classe' => '4e', 'url' => 'https://eduscol.education.gouv.fr/4362/enseigner-au-cycle-4'],
    // ── France, examens et diplômes ──
    ['systeme' => 'fr', 'sorte' => 'epreuve', 'matiere' => 'toutes', 'classe' => '3e',  'url' => 'https://eduscol.education.gouv.fr/5604/modalites-d-attribution-du-diplome-national-du-brevet', 'id' => 'diplome-national-du-brevet'],
    ['systeme' => 'fr', 'sorte' => 'diplome', 'matiere' => 'toutes', 'classe' => '3e',  'url' => 'https://www.education.gouv.fr/le-diplome-national-du-brevet-10613', 'id' => 'diplome-national-du-brevet'],
    ['systeme' => 'fr', 'sorte' => 'epreuve', 'matiere' => 'toutes', 'classe' => 'Tle', 'url' => 'https://www.education.gouv.fr/examens-2026-une-ambition-renouvelee-pour-la-reussite-des-eleves-504806', 'id' => 'baccalaureat-general'],
    // ── Italie : esame di maturità (réforme 2025) ──
    ['systeme' => 'it', 'sorte' => 'epreuve', 'matiere' => 'toutes', 'classe' => 'Tle', 'url' => 'https://www.istruzione.it/esami-di-primo-e-secondo-ciclo-2025-2026/index.html', 'id' => 'esame-di-maturita'],
    // ── Espagne : enseignements minimaux de l'ESO (Real Decreto 217/2022, texte consolidé) ──
    ['systeme' => 'es', 'sorte' => 'programme', 'matiere' => 'toutes', 'classe' => '3e', 'url' => 'https://boe.es/buscar/pdf/2022/BOE-A-2022-4975-consolidado.pdf'],
    // ── Allemagne : Abitur (KMK) ──
    ['systeme' => 'de', 'sorte' => 'diplome', 'matiere' => 'toutes', 'classe' => 'Tle', 'url' => 'https://www.kmk.org/bildungsministerkonferenz/vertiefende-bildungsinhalte/bildungswege-und-schulabschluesse/gymnasiale-oberstufe-und-abitur.html', 'id' => 'abitur'],
    // ── Espagne : PAU (accès à l'université) ──
    ['systeme' => 'es', 'sorte' => 'epreuve', 'matiere' => 'toutes', 'classe' => 'Tle', 'url' => 'https://www.lamoncloa.gob.es/serviciosdeprensa/notasprensa/educacion-fp-deportes/paginas/2024/pau-prueba-acceso-universidad.aspx', 'id' => 'pau'],
    // ── États-Unis : SAT ; Royaume-Uni : GCSE et A levels ──
    ['systeme' => 'us', 'sorte' => 'epreuve', 'matiere' => 'toutes', 'classe' => 'Tle', 'url' => 'https://satsuite.collegeboard.org/sat', 'id' => 'sat'],
    ['systeme' => 'uk', 'sorte' => 'diplome', 'matiere' => 'toutes', 'classe' => '3e', 'url' => 'https://www.gov.uk/national-curriculum/key-stage-4', 'id' => 'gcse'],
    // ── Portugal : Aprendizagens Essenciais (programmes) et EduQA (provas finais, exames nacionais) ──
    ['systeme' => 'pt', 'sorte' => 'programme', 'matiere' => 'toutes', 'classe' => '3e', 'url' => 'https://www.dge.mec.pt/aprendizagens-essenciais-0'],
    ['systeme' => 'pt', 'sorte' => 'epreuve', 'matiere' => 'toutes', 'classe' => 'Tle', 'url' => 'https://eduqa.pt/', 'id' => 'exames-nacionais'],
    // ── États-Unis : Common Core (maths et anglais) ──
    ['systeme' => 'us', 'sorte' => 'programme', 'matiere' => 'maths', 'classe' => '4e', 'url' => 'https://www.thecorestandards.org/about-the-standards/'],
  ],
];
