// v6.76 : les examens de fin d'études, pays par pays, tels qu'ils sont en vigueur (vérifiés sur les sources officielles en novembre 2026).
// Même format que ce que publie la veille du serveur (programme.php?quoi=examens) : la veille met à jour ces fiches quand un texte change.
// Rédigé en français ; les noms officiels restent dans la langue du pays.
window.EXAMENS_MONDE = {
  fr:{
    'diplome-national-du-brevet':{ sorte:'diplome', examen:'Diplôme national du brevet (DNB)', classe:'3e', session:'2026', maj:'2026-11-26',
      source:'https://eduscol.education.gouv.fr/5604/modalites-d-attribution-du-diplome-national-du-brevet',
      resume:'Fin du collège. Quatre épreuves écrites (français, mathématiques, histoire-géographie et EMC, sciences) et un oral.',
      conditions:'Diplôme obtenu avec une moyenne finale d’au moins 10/20 : contrôle continu (moyennes de 3e) 40 %, épreuves terminales 60 %. Mentions à partir de 12, 14 et 16/20.',
      epreuves:[
        { nom:'Français', duree:'3 h', notation:'coefficient 2', format:'compréhension et grammaire, dictée, rédaction' },
        { nom:'Mathématiques', duree:'2 h', notation:'coefficient 2', format:'exercices ; toutes les réponses doivent être justifiées' },
        { nom:'Histoire-géographie et EMC', duree:'2 h', notation:'coefficients 1,5 (histoire-géo) et 0,5 (EMC)', format:'deux sous-épreuves enchaînées, sans pause' },
        { nom:'Sciences', duree:'1 h', notation:'coefficient 2', format:'deux disciplines parmi physique-chimie, SVT et technologie' },
        { nom:'Oral', duree:'', notation:'coefficient 2', format:'soutenance d’un projet' }
      ],
      changements:['Fin du total sur 800 points : tout est noté sur 20.', 'Les épreuves finales comptent pour 60 % du résultat.', 'Histoire-géographie et EMC sont notées séparément.'] },
    'baccalaureat-general':{ sorte:'diplome', examen:'Baccalauréat général', classe:'Tle', session:'2026', maj:'2026-11-26',
      source:'https://www.education.gouv.fr/examens-2026-une-ambition-renouvelee-pour-la-reussite-des-eleves-504806',
      resume:'Fin du lycée. Épreuves anticipées en première (français, et désormais mathématiques), puis philosophie, deux spécialités et le Grand oral en terminale.',
      conditions:'Contrôle continu et épreuves finales ; diplôme obtenu avec une moyenne d’au moins 10/20.',
      epreuves:[
        { nom:'Épreuve anticipée de français', duree:'', notation:'écrit et oral', format:'en classe de première' },
        { nom:'Épreuve anticipée de mathématiques', duree:'', notation:'écrit', format:'en classe de première (nouveau en 2026)' },
        { nom:'Philosophie', duree:'', notation:'écrit', format:'en terminale' },
        { nom:'Deux enseignements de spécialité', duree:'', notation:'écrits', format:'en terminale' },
        { nom:'Grand oral', duree:'', notation:'oral', format:'en terminale' }
      ],
      changements:['Nouvelle épreuve anticipée de mathématiques en première.', 'Exigence renforcée de maîtrise du français.'] }
  },
  it:{
    'esame-di-maturita':{ sorte:'diplome', examen:'Esame di maturità', classe:'Tle', session:'2026', maj:'2026-11-26',
      source:'https://www.istruzione.it/esami-di-primo-e-secondo-ciclo-2025-2026/index.html',
      resume:'Fin du lycée en Italie. Deux épreuves écrites puis un oral (« colloquio ») sur quatre disciplines.',
      conditions:'Note sur 100 : crédit scolaire des trois dernières années jusqu’à 40 points (12 + 13 + 15), puis 20 points par épreuve. 60/100 pour réussir ; jusqu’à 3 points de bonus à partir de 90 ; mention « lode » possible.',
      epreuves:[
        { nom:'Prima prova', duree:'', notation:'sur 20', format:'écrit d’italien, le même pour tous' },
        { nom:'Seconda prova', duree:'', notation:'sur 20', format:'écrit de la matière principale de la filière' },
        { nom:'Colloquio', duree:'', notation:'sur 20', format:'oral sur quatre disciplines fixées par le ministère' }
      ],
      changements:['L’examen reprend le nom d’« esame di maturità » (réforme de 2025).', 'Le colloquio porte sur quatre disciplines.', 'Le bonus maximal passe de 5 à 3 points.'] }
  },
  es:{
    'pau':{ sorte:'epreuve', examen:'PAU – Prueba de Acceso a la Universidad', classe:'Tle', session:'2026', maj:'2026-11-26',
      source:'https://www.lamoncloa.gob.es/serviciosdeprensa/notasprensa/educacion-fp-deportes/paginas/2024/pau-prueba-acceso-universidad.aspx',
      resume:'Après le bachillerato, l’examen d’accès à l’université (anciennement EBAU ou « selectividad »).',
      conditions:'Note d’accès = 60 % de la moyenne du bachillerato + 40 % de la phase d’accès (au moins 4/10 à cette phase) ; il faut au moins 5/10. Une phase volontaire peut monter la note d’admission jusqu’à 14.',
      epreuves:[
        { nom:'Lengua castellana y literatura II', duree:'', notation:'sur 10', format:'écrit' },
        { nom:'Historia de España ou Historia de la Filosofía', duree:'', notation:'sur 10', format:'écrit, au choix' },
        { nom:'Lengua extranjera II', duree:'', notation:'sur 10', format:'écrit' },
        { nom:'Matière spécifique de la filière', duree:'', notation:'sur 10', format:'écrit (par exemple Matemáticas II)' }
      ],
      changements:['Nouvelle PAU (décret royal 534/2024) : examens plus centrés sur les compétences.'] }
  },
  de:{
    'abitur':{ sorte:'diplome', examen:'Abitur (Allgemeine Hochschulreife)', classe:'Tle', session:'2026', maj:'2026-11-26',
      source:'https://www.kmk.org/bildungsministerkonferenz/vertiefende-bildungsinhalte/bildungswege-und-schulabschluesse/gymnasiale-oberstufe-und-abitur.html',
      resume:'Fin du lycée (gymnasiale Oberstufe). Les détails varient selon le Land.',
      conditions:'Note globale sur 900 points : jusqu’à 600 pour les cours des deux dernières années, jusqu’à 300 pour l’examen. Il faut au moins 300 points (note 4,0) ; la meilleure note est 1,0.',
      epreuves:[
        { nom:'4 ou 5 matières d’examen', duree:'', notation:'0 à 15 points', format:'au moins 3 écrits, dont 2 matières à niveau renforcé ; au moins 2 parmi allemand, langue étrangère et mathématiques' }
      ],
      changements:[] }
  },
  us:{
    'sat':{ sorte:'epreuve', examen:'SAT', classe:'Tle', session:'2026', maj:'2026-11-26',
      source:'https://satsuite.collegeboard.org/sat',
      resume:'Test d’entrée à l’université utilisé par beaucoup d’universités américaines. Le diplôme de fin de lycée (high school diploma) dépend de chaque État.',
      conditions:'Score de 400 à 1600 (200 à 800 par partie). Pas de note éliminatoire : chaque université fixe ses attentes.',
      epreuves:[
        { nom:'Reading and Writing', duree:'', notation:'200 à 800', format:'sur ordinateur, en deux modules adaptatifs' },
        { nom:'Math', duree:'', notation:'200 à 800', format:'sur ordinateur, en deux modules adaptatifs ; calculatrice autorisée' }
      ],
      changements:[] }
  },
  uk:{
    'gcse':{ sorte:'diplome', examen:'GCSE (Angleterre)', classe:'3e', session:'2026', maj:'2026-11-26',
      source:'https://www.gov.uk/national-curriculum/key-stage-4',
      resume:'Fin de la scolarité obligatoire en Angleterre, vers 16 ans : un examen par matière.',
      conditions:'Notes de 9 (la meilleure) à 1 ; 4 = réussite (« standard pass »), 5 = « strong pass ».',
      epreuves:[{ nom:'Une épreuve par matière', duree:'', notation:'9 à 1', format:'anglais et mathématiques obligatoires' }],
      changements:[] },
    'a-levels':{ sorte:'diplome', examen:'A levels (Angleterre)', classe:'Tle', session:'2026', maj:'2026-11-26',
      source:'https://www.gov.uk/government/collections/national-curriculum',
      resume:'Fin du lycée en Angleterre, vers 18 ans, en général dans trois matières choisies.',
      conditions:'Notes de A* (la meilleure) à E.',
      epreuves:[{ nom:'Une épreuve par matière choisie', duree:'', notation:'A* à E', format:'écrits en fin de deuxième année' }],
      changements:[] }
  }
};
