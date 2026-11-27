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
    examens:[['gcse', 'Year 11'], ['a-levels', 'Year 13']] },
  // v6.82 : Portugal (ensino básico 2.º–3.º ciclos, ensino secundário).
  pt:{ nom:'Portugal', drapeau:'🇵🇹', langue:'pt', classes:[['6.º ano', '6e', 11], ['7.º ano', '5e', 12], ['8.º ano', '4e', 13], ['9.º ano', '3e', 14], ['10.º ano', '2nde', 15], ['11.º ano', '1re', 16], ['12.º ano', 'Tle', 17]],
    examens:[['provas-finais-9', '9.º ano'], ['exames-nacionais', '11.º e 12.º anos']] }
};
// Entraînements d'examen dans la langue du pays : maths (exercices du coin maths, traduits) ; v6.80 : aussi les matières du pays
// (matiere + chap, js/pays-*.js) et, pour l'Angleterre, le programme anglais complet (england = matière ENGLAND).
// niveau = classe française dont on tire les chapitres ; bareme = comment la note est rendue.
window.BLANCS_PAYS = {
  it:[{ id:'it-matematica', examen:'esame-di-maturita', titre:'Allenamento · Matematica (maturità)', niveau:'Tle', n:20, minutes:60, bareme:'sur20' },
    { id:'it-prima-prova', examen:'esame-di-maturita', titre:'Allenamento · Prima prova (italiano)', matiere:'it-italiano', chap:'it-italiano-lycee', niveau:'Tle', n:15, minutes:25, bareme:'sur20' },
    { id:'it-storia-civica', examen:'esame-di-maturita', titre:'Verifica · Storia ed educazione civica', matiere:'it-storia', chap:'it-storia-lycee', niveau:'Tle', n:15, minutes:20, bareme:'sur10' },
    { id:'it-filosofia-colloquio', examen:'esame-di-maturita', titre:'Verso il colloquio · Filosofia', matiere:'it-filosofia', chap:'it-filosofia-lycee', niveau:'Tle', n:15, minutes:20, bareme:'sur10' },
    { id:'it-scienze-verifica', examen:'esame-di-maturita', titre:'Verifica · Scienze (superiori)', matiere:'it-scienze', chap:'it-scienze-lycee', niveau:'1re', n:15, minutes:20, bareme:'sur10' },
    { id:'it-esame-terza-media', examen:'esame-di-maturita', titre:'Verso l’esame di terza media · Italiano e storia', matiere:'it-italiano', chap:'it-italiano-college', niveau:'3e', n:15, minutes:20, bareme:'sur10' }],
  es:[{ id:'es-pau-mates', examen:'pau', titre:'Simulacro · Matemáticas II (PAU)', niveau:'Tle', n:20, minutes:90, bareme:'sur10' },
    { id:'es-pau-lengua', examen:'pau', titre:'Simulacro · Lengua castellana y literatura II (PAU)', matiere:'es-lengua', chap:'es-lengua-lycee', niveau:'Tle', n:15, minutes:25, bareme:'sur10' },
    { id:'es-pau-historia', examen:'pau', titre:'Simulacro · Historia de España (PAU)', matiere:'es-historia', chap:'es-historia-lycee', niveau:'Tle', n:15, minutes:25, bareme:'sur10' },
    { id:'es-pau-filosofia', examen:'pau', titre:'Simulacro · Historia de la Filosofía (PAU)', matiere:'es-filosofia', chap:'es-filosofia-lycee', niveau:'Tle', n:15, minutes:25, bareme:'sur10' },
    { id:'es-pau-ciencias', examen:'pau', titre:'Simulacro · Biología, Química y Física (PAU)', matiere:'es-ciencias', chap:'es-ciencias-lycee', niveau:'Tle', n:15, minutes:25, bareme:'sur10' },
    { id:'es-eso-historia', examen:'pau', titre:'Control · Geografía e Historia (ESO)', matiere:'es-historia', chap:'es-historia-college', niveau:'3e', n:15, minutes:20, bareme:'sur10' }],
  de:[{ id:'de-abitur-mathe', examen:'abitur', titre:'Abitur-Training · Mathematik', niveau:'Tle', n:20, minutes:60, bareme:'pourcent' },
    { id:'de-abitur-deutsch', examen:'abitur', titre:'Abitur-Training · Deutsch', matiere:'de-deutsch', chap:'de-deutsch-lycee', niveau:'Tle', n:15, minutes:25, bareme:'pourcent' },
    { id:'de-abitur-geschichte', examen:'abitur', titre:'Abitur-Training · Geschichte', matiere:'de-geschichte', chap:'de-geschichte-lycee', niveau:'Tle', n:15, minutes:25, bareme:'pourcent' },
    { id:'de-abitur-naturwissenschaften', examen:'abitur', titre:'Abitur-Training · Biologie, Chemie, Physik', matiere:'de-naturwissenschaften', chap:'de-naturwissenschaften-lycee', niveau:'Tle', n:15, minutes:25, bareme:'pourcent' },
    { id:'de-abitur-geographie', examen:'abitur', titre:'Abitur-Training · Geographie', matiere:'de-erdkunde', chap:'de-erdkunde-lycee', niveau:'Tle', n:15, minutes:25, bareme:'pourcent' },
    { id:'de-klassenarbeit-deutsch', examen:'abitur', titre:'Klassenarbeit · Deutsch (Sek. I)', matiere:'de-deutsch', chap:'de-deutsch-college', niveau:'3e', n:15, minutes:20, bareme:'pourcent' }],
  us:[{ id:'us-sat-math', examen:'sat', titre:'SAT Math practice', niveau:'1re', n:22, minutes:35, bareme:'brut' },
    { id:'us-sat-rw', examen:'sat', titre:'SAT Reading & Writing practice', matiere:'us-ela', chap:'us-ela-lycee', niveau:'1re', n:15, minutes:20, bareme:'brut' },
    { id:'us-history-gov', examen:'sat', titre:'U.S. History & Government practice', matiere:'us-history', chap:'us-history-lycee', niveau:'Tle', n:15, minutes:20, bareme:'pourcent' },
    { id:'us-ap-human-geography', examen:'sat', titre:'AP Human Geography practice', matiere:'us-geography', chap:'us-geography-lycee', niveau:'1re', n:15, minutes:20, bareme:'pourcent' },
    { id:'us-science-practice', examen:'sat', titre:'Biology, Chemistry & Physics practice', matiere:'us-science', chap:'us-science-lycee', niveau:'2nde', n:15, minutes:20, bareme:'pourcent' },
    { id:'us-civics-test', examen:'sat', titre:'Civics test practice (Grades 6–8)', matiere:'us-history', chap:'us-history-college', niveau:'4e', n:15, minutes:15, bareme:'pourcent' }],
  uk:[{ id:'uk-gcse-maths', examen:'gcse', titre:'GCSE Maths practice', niveau:'3e', n:20, minutes:45, bareme:'brut' },
    { id:'uk-gcse-english', examen:'gcse', titre:'GCSE English practice', england:'gb-english', niveau:'Y11', n:20, minutes:30, bareme:'brut' },
    { id:'uk-gcse-history', examen:'gcse', titre:'GCSE History practice', england:'gb-history', niveau:'Y11', n:20, minutes:30, bareme:'brut' },
    { id:'uk-a-level-english', examen:'a-levels', titre:'A level English Literature practice', england:'gb-english', niveau:'Y13', n:8, minutes:12, bareme:'pourcent' }],
  pt:[{ id:'pt-prova-final-matematica', examen:'provas-finais-9', titre:'Treino · Prova final de Matemática (9.º ano)', niveau:'3e', n:20, minutes:40, bareme:'pourcent' },
    { id:'pt-prova-final-portugues', examen:'provas-finais-9', titre:'Treino · Prova final de Português (9.º ano)', matiere:'pt-portugues', chap:'pt-portugues-college', niveau:'3e', n:15, minutes:25, bareme:'pourcent' },
    { id:'pt-exame-matematica-a', examen:'exames-nacionais', titre:'Treino · Exame nacional de Matemática A (635)', niveau:'Tle', n:20, minutes:45, bareme:'sur20' },
    { id:'pt-exame-portugues', examen:'exames-nacionais', titre:'Treino · Exame nacional de Português (639)', matiere:'pt-portugues', chap:'pt-portugues-lycee', niveau:'Tle', n:15, minutes:25, bareme:'sur20' },
    { id:'pt-exame-historia-a', examen:'exames-nacionais', titre:'Treino · Exame nacional de História A (623)', matiere:'pt-historia', chap:'pt-historia-lycee', niveau:'Tle', n:15, minutes:25, bareme:'sur20' },
    { id:'pt-exame-ciencias', examen:'exames-nacionais', titre:'Treino · Biologia e Geologia / Física e Química A (11.º ano)', matiere:'pt-ciencias', chap:'pt-ciencias-lycee', niveau:'1re', n:15, minutes:25, bareme:'sur20' },
    { id:'pt-exame-filosofia', examen:'exames-nacionais', titre:'Treino · Exame nacional de Filosofia (714)', matiere:'pt-filosofia', chap:'pt-filosofia-lycee', niveau:'1re', n:15, minutes:25, bareme:'sur20' }]
};
