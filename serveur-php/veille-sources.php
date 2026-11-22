<?php
// Sources OFFICIELLES lues par la veille (programmes et sujets d'examen). Seuls ces domaines sont acceptés.
// Les adresses du ministère changent parfois : en ajouter ou en corriger ici (une ligne par document).
// [sorte, classe, adresse] — sorte : 'programme' ou 'annales'. classe : 6e, 5e, 4e, 3e, 2nde, 1re, Tle.
return [
  'domaines' => ['www.education.gouv.fr', 'education.gouv.fr', 'eduscol.education.fr', 'eduscol.education.gouv.fr'],
  'sources' => [
    ['programme', '6e',   'https://eduscol.education.fr/document/14014/download'],          // Attendus de fin d'année de 6e
    ['programme', '5e',   'https://eduscol.education.gouv.fr/4509/mathematiques'],           // Page maths Eduscol (cycle 4)
    ['programme', '4e',   'https://eduscol.education.gouv.fr/4509/mathematiques'],
    ['programme', '3e',   'https://eduscol.education.gouv.fr/4509/mathematiques'],
    ['programme', '2nde', 'https://eduscol.education.gouv.fr/4509/mathematiques'],
    ['programme', '1re',  'https://www.education.gouv.fr/reussir-au-lycee/epreuve-anticipee-de-mathematiques-en-classe-de-premiere-450607'],
    ['programme', 'Tle',  'https://eduscol.education.gouv.fr/4509/mathematiques'],
    ['annales',   '3e',   'https://eduscol.education.gouv.fr/5202/preparer-le-diplome-national-du-brevet-dnb-avec-les-sujets-des-annales'],
    ['annales',   '1re',  'https://www.education.gouv.fr/reussir-au-lycee/epreuve-anticipee-de-mathematiques-en-classe-de-premiere-450607'],
  ],
];
