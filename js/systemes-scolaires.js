// v6.77 : les systèmes scolaires — classes de chaque pays et leur équivalent français le plus proche (même âge d'entrée).
// Sert au parcours « Mon pays » (js/mod-parcours-pays.js) : réviser au bon niveau, connaître ses examens, s'entraîner.
// [nom local de la classe, équivalent français, âge habituel en début d'année]
window.SYSTEMES_SCOLAIRES = {
  fr:{ nom:'France', drapeau:'🇫🇷', langue:'fr', classes:[['6e', '6e', 11], ['5e', '5e', 12], ['4e', '4e', 13], ['3e', '3e', 14], ['Seconde', '2nde', 15], ['Première', '1re', 16], ['Terminale', 'Tle', 17]],
    examens:[['diplome-national-du-brevet', '3e'], ['baccalaureat-general', 'Terminale']] },
  it:{ nom:'Italia', drapeau:'🇮🇹', langue:'it', classes:[['1ª media', '6e', 11], ['2ª media', '5e', 12], ['3ª media', '4e', 13], ['1ª superiore', '3e', 14], ['2ª superiore', '2nde', 15], ['3ª superiore', '1re', 16], ['4ª superiore', 'Tle', 17], ['5ª superiore', 'Tle', 18]],
    examens:[['esame-di-maturita', '5ª superiore']] },
  es:{ nom:'España', drapeau:'🇪🇸', langue:'es', classes:[['6º de Primaria', '6e', 11], ['1º de ESO', '5e', 12], ['2º de ESO', '4e', 13], ['3º de ESO', '3e', 14], ['4º de ESO', '2nde', 15], ['1º de Bachillerato', '1re', 16], ['2º de Bachillerato', 'Tle', 17]],
    examens:[['pau', '2º de Bachillerato']] },
  de:{ nom:'Deutschland', drapeau:'🇩🇪', langue:'de', classes:[['Klasse 6', '6e', 11], ['Klasse 7', '5e', 12], ['Klasse 8', '4e', 13], ['Klasse 9', '3e', 14], ['Klasse 10', '2nde', 15], ['Klasse 11', '1re', 16], ['Klasse 12 / 13', 'Tle', 17]],
    examens:[['abitur', 'Klasse 12 / 13']] },
  us:{ nom:'United States', drapeau:'🇺🇸', langue:'en', classes:[['Grade 6', '6e', 11], ['Grade 7', '5e', 12], ['Grade 8', '4e', 13], ['Grade 9', '3e', 14], ['Grade 10', '2nde', 15], ['Grade 11', '1re', 16], ['Grade 12', 'Tle', 17]],
    examens:[['sat', 'Grade 11 / 12']] },
  uk:{ nom:'England', drapeau:'🇬🇧', langue:'en', classes:[['Year 7', '6e', 11], ['Year 8', '5e', 12], ['Year 9', '4e', 13], ['Year 10', '3e', 14], ['Year 11', '2nde', 15], ['Year 12', '1re', 16], ['Year 13', 'Tle', 17]],
    examens:[['gcse', 'Year 11'], ['a-levels', 'Year 13']] }
};
// Entraînements d'examen en maths, dans la langue du pays (exercices du coin maths, traduits) :
// niveau = classe française dont on tire les chapitres ; bareme = comment la note est rendue.
window.BLANCS_PAYS = {
  it:[{ id:'it-matematica', examen:'esame-di-maturita', titre:'Allenamento · Matematica (maturità)', niveau:'Tle', n:20, minutes:60, bareme:'sur20' }],
  es:[{ id:'es-pau-mates', examen:'pau', titre:'Simulacro · Matemáticas II (PAU)', niveau:'Tle', n:20, minutes:90, bareme:'sur10' }],
  de:[{ id:'de-abitur-mathe', examen:'abitur', titre:'Abitur-Training · Mathematik', niveau:'Tle', n:20, minutes:60, bareme:'pourcent' }],
  us:[{ id:'us-sat-math', examen:'sat', titre:'SAT Math practice', niveau:'1re', n:22, minutes:35, bareme:'brut' }],
  uk:[{ id:'uk-gcse-maths', examen:'gcse', titre:'GCSE Maths practice', niveau:'3e', n:20, minutes:45, bareme:'brut' }]
};
