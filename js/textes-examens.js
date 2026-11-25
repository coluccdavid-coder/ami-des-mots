// Ami des mots — v6.40 : titres des examens (blancs, épreuves, annales) et écran « Officiel » dans les 5 langues de l'interface.
// Clé = texte français ; valeurs = [en, es, de, it, pt], comme js/textes-ecrans.js (chargé avant).
// Les sigles officiels français (brevet, bac, CAP, BO, SES, HGGSP, HLP, NSI, STMG…) restent tels quels : ce sont des noms d'examens et de filières.
// À faire relire par des locuteurs natifs (docs/RELECTURE-PROFS.md).
(function(){
  'use strict';
  const T = window.TRAD_ECRANS; if(!T) return;
  const S = (fr, en, es, de, it, pt) => { if(!T[fr]) T[fr] = [en, es, de, it, pt]; };
  // Spécialités : même modèle dans chaque langue.
  const SPE = { en:'Specialty', es:'Especialidad', de:'Schwerpunktfach', it:'Specialità', pt:'Especialidade' };
  const spe = (fr, en, es, de, it, pt) => S('Spécialité ' + fr, SPE.en + ' ' + en, SPE.es + ' ' + es, SPE.de + ' ' + de, SPE.it + ' ' + it, SPE.pt + ' ' + pt);
  const spe26 = (fr, en, es, de, it, pt) => S('Bac 2026 · Spécialité ' + fr, 'Bac 2026 · ' + SPE.en + ' ' + en, 'Bac 2026 · ' + SPE.es + ' ' + es, 'Bac 2026 · ' + SPE.de + ' ' + de, 'Bac 2026 · ' + SPE.it + ' ' + it, 'Bac 2026 · ' + SPE.pt + ' ' + pt);

  // Page d'accueil (v6.40).
  S('Entrer', 'Enter', 'Entrar', 'Eintreten', 'Entra', 'Entrar');

  // ── Blancs ──
  S('Brevet blanc 2026', 'Mock brevet 2026', 'Brevet de prueba 2026', 'Probe-Brevet 2026', 'Brevet di prova 2026', 'Brevet simulado 2026');
  S('Maths anticipées blanc · spécialité', 'Mock early maths exam · with specialty', 'Matemáticas anticipadas de prueba · con especialidad', 'Probeprüfung vorgezogene Mathematik · mit Schwerpunktfach', 'Matematica anticipata di prova · con specialità', 'Matemática antecipada simulada · com especialidade');
  S('Maths anticipées blanc · sans spécialité', 'Mock early maths exam · without specialty', 'Matemáticas anticipadas de prueba · sin especialidad', 'Probeprüfung vorgezogene Mathematik · ohne Schwerpunktfach', 'Matematica anticipata di prova · senza specialità', 'Matemática antecipada simulada · sem especialidade');
  S('Bac de français blanc', 'Mock French bac', 'Bac de francés de prueba', 'Probe-Bac Französisch', 'Bac di francese di prova', 'Bac de francês simulado');
  spe('mathématiques', 'mathematics', 'matemáticas', 'Mathematik', 'matematica', 'matemática');
  spe('physique-chimie', 'physics-chemistry', 'física y química', 'Physik-Chemie', 'fisica-chimica', 'física e química');
  spe('SVT', 'biology and earth sciences (SVT)', 'biología y geología (SVT)', 'Biologie und Geowissenschaften (SVT)', 'scienze della vita e della Terra (SVT)', 'ciências da vida e da Terra (SVT)');
  spe('SES', 'economics and social sciences (SES)', 'ciencias económicas y sociales (SES)', 'Wirtschafts- und Sozialwissenschaften (SES)', 'scienze economiche e sociali (SES)', 'ciências económicas e sociais (SES)');
  spe('HGGSP', 'history, geography, geopolitics and political science (HGGSP)', 'historia, geografía, geopolítica y ciencias políticas (HGGSP)', 'Geschichte, Geografie, Geopolitik und Politikwissenschaft (HGGSP)', 'storia, geografia, geopolitica e scienze politiche (HGGSP)', 'história, geografia, geopolítica e ciência política (HGGSP)');
  spe('HLP', 'humanities, literature and philosophy (HLP)', 'humanidades, literatura y filosofía (HLP)', 'Geisteswissenschaften, Literatur und Philosophie (HLP)', 'discipline umanistiche, letteratura e filosofia (HLP)', 'humanidades, literatura e filosofia (HLP)');
  spe('NSI', 'computer science (NSI)', 'informática (NSI)', 'Informatik (NSI)', 'informatica (NSI)', 'informática (NSI)');
  spe('sciences de l’ingénieur', 'engineering science', 'ciencias de la ingeniería', 'Ingenieurwissenschaften', 'scienze dell’ingegneria', 'ciências da engenharia');
  spe('LLCER anglais', 'English language, literature and culture (LLCER)', 'lengua, literatura y cultura inglesas (LLCER)', 'englische Sprache, Literatur und Kultur (LLCER)', 'lingua, letteratura e cultura inglese (LLCER)', 'língua, literatura e cultura inglesas (LLCER)');
  spe('arts · histoire des arts', 'arts · art history', 'artes · historia del arte', 'Kunst · Kunstgeschichte', 'arti · storia dell’arte', 'artes · história da arte');
  spe('arts · cinéma-audiovisuel', 'arts · film and audiovisual', 'artes · cine y audiovisual', 'Kunst · Film und Medien', 'arti · cinema e audiovisivo', 'artes · cinema e audiovisual');
  spe('arts · musique', 'arts · music', 'artes · música', 'Kunst · Musik', 'arti · musica', 'artes · música');
  spe('arts · théâtre', 'arts · theatre', 'artes · teatro', 'Kunst · Theater', 'arti · teatro', 'artes · teatro');
  spe('arts plastiques', 'visual arts', 'artes plásticas', 'bildende Kunst', 'arti visive', 'artes plásticas');
  spe('arts · danse', 'arts · dance', 'artes · danza', 'Kunst · Tanz', 'arti · danza', 'artes · dança');
  spe('biologie-écologie', 'biology-ecology', 'biología y ecología', 'Biologie-Ökologie', 'biologia-ecologia', 'biologia-ecologia');
  spe('EPPCS (sport)', 'physical education, sport practice and culture (EPPCS)', 'educación física, prácticas y cultura deportivas (EPPCS)', 'Sport: Praxis und Kultur (EPPCS)', 'educazione fisica, pratiche e cultura sportiva (EPPCS)', 'educação física, práticas e cultura desportivas (EPPCS)');
  spe('LLCA latin', 'Latin language, literature and culture (LLCA)', 'lengua, literatura y cultura latinas (LLCA)', 'Latein: Sprache, Literatur und Kultur (LLCA)', 'lingua, letteratura e cultura latina (LLCA)', 'língua, literatura e cultura latinas (LLCA)');
  spe('LLCA grec', 'Ancient Greek language, literature and culture (LLCA)', 'lengua, literatura y cultura griegas (LLCA)', 'Altgriechisch: Sprache, Literatur und Kultur (LLCA)', 'lingua, letteratura e cultura greca (LLCA)', 'língua, literatura e cultura gregas (LLCA)');
  spe('LLCER espagnol', 'Spanish language, literature and culture (LLCER)', 'lengua, literatura y cultura españolas (LLCER)', 'spanische Sprache, Literatur und Kultur (LLCER)', 'lingua, letteratura e cultura spagnola (LLCER)', 'língua, literatura e cultura espanholas (LLCER)');
  spe('LLCER allemand', 'German language, literature and culture (LLCER)', 'lengua, literatura y cultura alemanas (LLCER)', 'deutsche Sprache, Literatur und Kultur (LLCER)', 'lingua, letteratura e cultura tedesca (LLCER)', 'língua, literatura e cultura alemãs (LLCER)');
  spe('LLCER italien', 'Italian language, literature and culture (LLCER)', 'lengua, literatura y cultura italianas (LLCER)', 'italienische Sprache, Literatur und Kultur (LLCER)', 'lingua, letteratura e cultura italiana (LLCER)', 'língua, literatura e cultura italianas (LLCER)');
  spe('LLCER portugais', 'Portuguese language, literature and culture (LLCER)', 'lengua, literatura y cultura portuguesas (LLCER)', 'portugiesische Sprache, Literatur und Kultur (LLCER)', 'lingua, letteratura e cultura portoghese (LLCER)', 'língua, literatura e cultura portuguesas (LLCER)');
  spe('anglais monde contemporain', 'English: the contemporary world', 'inglés, mundo contemporáneo', 'Englisch: die Welt von heute', 'inglese, mondo contemporaneo', 'inglês, mundo contemporâneo');
  for(const s of ['STMG', 'STI2D', 'ST2S', 'STL', 'STD2A', 'STHR', 'S2TMD'])
    S('Bac techno ' + s + ' blanc', 'Mock technological bac ' + s, 'Bac tecnológico ' + s + ' de prueba', 'Probe-Bac Technologie ' + s, 'Bac tecnologico ' + s + ' di prova', 'Bac tecnológico ' + s + ' simulado');
  S('Oral du brevet', 'Brevet oral exam', 'Oral del brevet', 'Mündliche Brevet-Prüfung', 'Orale del brevet', 'Oral do brevet');
  S('Oral de français', 'French oral exam', 'Oral de francés', 'Mündliche Prüfung Französisch', 'Orale di francese', 'Oral de francês');
  S('Grand oral', 'Grand oral (final oral exam)', 'Gran oral (examen oral final)', 'Grand oral (große mündliche Prüfung)', 'Grand oral (grande orale finale)', 'Grand oral (grande prova oral final)');
  S('Bac pro blanc (épreuves générales)', 'Mock vocational bac (general subjects)', 'Bac profesional de prueba (materias generales)', 'Probe-Berufsbac (allgemeine Fächer)', 'Bac professionale di prova (materie generali)', 'Bac profissional simulado (disciplinas gerais)');
  S('CAP blanc (épreuves générales)', 'Mock CAP (general subjects)', 'CAP de prueba (materias generales)', 'Probe-CAP (allgemeine Fächer)', 'CAP di prova (materie generali)', 'CAP simulado (disciplinas gerais)');

  // ── Épreuves ──
  S('Mathématiques', 'Mathematics', 'Matemáticas', 'Mathematik', 'Matematica', 'Matemática');
  S('Histoire-géographie', 'History and geography', 'Historia y geografía', 'Geschichte und Geografie', 'Storia e geografia', 'História e geografia');
  S('Enseignement moral et civique', 'Moral and civic education', 'Educación moral y cívica', 'Moral- und Staatsbürgerkunde', 'Educazione morale e civica', 'Educação moral e cívica');
  S('Maths anticipées · avec spécialité', 'Early maths exam · with specialty', 'Matemáticas anticipadas · con especialidad', 'Vorgezogene Mathematik · mit Schwerpunktfach', 'Matematica anticipata · con specialità', 'Matemática antecipada · com especialidade');
  S('Maths anticipées · sans spécialité', 'Early maths exam · without specialty', 'Matemáticas anticipadas · sin especialidad', 'Vorgezogene Mathematik · ohne Schwerpunktfach', 'Matematica anticipata · senza specialità', 'Matemática antecipada · sem especialidade');
  S('Français (épreuves anticipées)', 'French (early exams)', 'Francés (pruebas anticipadas)', 'Französisch (vorgezogene Prüfungen)', 'Francese (prove anticipate)', 'Francês (provas antecipadas)');
  S('STMG · management, sciences de gestion et numérique', 'STMG · management, business science and digital', 'STMG · gestión, ciencias de la gestión y digital', 'STMG · Management, Betriebswirtschaft und Digitales', 'STMG · management, scienze della gestione e digitale', 'STMG · gestão, ciências de gestão e digital');
  S('STMG · droit et économie', 'STMG · law and economics', 'STMG · derecho y economía', 'STMG · Recht und Wirtschaft', 'STMG · diritto ed economia', 'STMG · direito e economia');
  S('STI2D · ingénierie + physique-chimie et maths', 'STI2D · engineering + physics-chemistry and maths', 'STI2D · ingeniería + física y química y matemáticas', 'STI2D · Ingenieurwesen + Physik-Chemie und Mathematik', 'STI2D · ingegneria + fisica-chimica e matematica', 'STI2D · engenharia + física e química e matemática');
  S('ST2S · chimie, biologie et physiopathologie humaines', 'ST2S · human chemistry, biology and pathophysiology', 'ST2S · química, biología y fisiopatología humanas', 'ST2S · Chemie, Biologie und Pathophysiologie des Menschen', 'ST2S · chimica, biologia e fisiopatologia umane', 'ST2S · química, biologia e fisiopatologia humanas');
  S('STL · biochimie-biologie-biotechnologies', 'STL · biochemistry, biology and biotechnology', 'STL · bioquímica, biología y biotecnologías', 'STL · Biochemie, Biologie und Biotechnologie', 'STL · biochimica, biologia e biotecnologie', 'STL · bioquímica, biologia e biotecnologias');
  S('STD2A · analyse et méthodes en design', 'STD2A · design analysis and methods', 'STD2A · análisis y métodos de diseño', 'STD2A · Analyse und Methoden im Design', 'STD2A · analisi e metodi del design', 'STD2A · análise e métodos em design');
  S('STHR · économie-gestion hôtelière', 'STHR · hotel economics and management', 'STHR · economía y gestión hotelera', 'STHR · Hotelwirtschaft und -management', 'STHR · economia e gestione alberghiera', 'STHR · economia e gestão hoteleira');
  S('S2TMD · culture et sciences chorégraphiques, musicales ou théâtrales', 'S2TMD · dance, music or theatre culture and science', 'S2TMD · cultura y ciencias coreográficas, musicales o teatrales', 'S2TMD · Kultur und Wissenschaft von Tanz, Musik oder Theater', 'S2TMD · cultura e scienze coreutiche, musicali o teatrali', 'S2TMD · cultura e ciências coreográficas, musicais ou teatrais');
  S('Bac pro · français', 'Vocational bac · French', 'Bac profesional · francés', 'Berufsbac · Französisch', 'Bac professionale · francese', 'Bac profissional · francês');
  S('Bac pro · histoire-géographie-EMC', 'Vocational bac · history, geography and civics', 'Bac profesional · historia, geografía y educación cívica', 'Berufsbac · Geschichte, Geografie und Staatsbürgerkunde', 'Bac professionale · storia, geografia ed educazione civica', 'Bac profissional · história, geografia e educação cívica');
  S('Bac pro · mathématiques et physique-chimie', 'Vocational bac · maths and physics-chemistry', 'Bac profesional · matemáticas y física y química', 'Berufsbac · Mathematik und Physik-Chemie', 'Bac professionale · matematica e fisica-chimica', 'Bac profissional · matemática e física e química');
  S('Bac pro · prévention, santé, environnement (PSE)', 'Vocational bac · prevention, health and environment (PSE)', 'Bac profesional · prevención, salud y medio ambiente (PSE)', 'Berufsbac · Prävention, Gesundheit, Umwelt (PSE)', 'Bac professionale · prevenzione, salute, ambiente (PSE)', 'Bac profissional · prevenção, saúde, ambiente (PSE)');
  S('Bac pro · économie-droit / économie-gestion', 'Vocational bac · economics and law / economics and management', 'Bac profesional · economía y derecho / economía y gestión', 'Berufsbac · Wirtschaft und Recht / Wirtschaft und Management', 'Bac professionale · economia e diritto / economia e gestione', 'Bac profissional · economia e direito / economia e gestão');
  S('Bac pro · langue vivante (anglais)', 'Vocational bac · modern language (English)', 'Bac profesional · lengua extranjera (inglés)', 'Berufsbac · Fremdsprache (Englisch)', 'Bac professionale · lingua straniera (inglese)', 'Bac profissional · língua estrangeira (inglês)');
  S('CAP · français et histoire-géo-EMC', 'CAP · French, history, geography and civics', 'CAP · francés, historia, geografía y educación cívica', 'CAP · Französisch, Geschichte, Geografie und Staatsbürgerkunde', 'CAP · francese, storia, geografia ed educazione civica', 'CAP · francês, história, geografia e educação cívica');
  S('CAP · mathématiques et physique-chimie', 'CAP · maths and physics-chemistry', 'CAP · matemáticas y física y química', 'CAP · Mathematik und Physik-Chemie', 'CAP · matematica e fisica-chimica', 'CAP · matemática e física e química');
  S('CAP · prévention, santé, environnement', 'CAP · prevention, health and environment', 'CAP · prevención, salud y medio ambiente', 'CAP · Prävention, Gesundheit, Umwelt', 'CAP · prevenzione, salute, ambiente', 'CAP · prevenção, saúde, ambiente');

  // ── Annales 2026 ──
  S('Brevet 2026 · Mathématiques', 'Brevet 2026 · Mathematics', 'Brevet 2026 · Matemáticas', 'Brevet 2026 · Mathematik', 'Brevet 2026 · Matematica', 'Brevet 2026 · Matemática');
  S('Brevet 2026 · Mathématiques (autre centre)', 'Brevet 2026 · Mathematics (other exam centre)', 'Brevet 2026 · Matemáticas (otro centro)', 'Brevet 2026 · Mathematik (anderes Prüfungszentrum)', 'Brevet 2026 · Matematica (altro centro)', 'Brevet 2026 · Matemática (outro centro)');
  S('Brevet 2026 · Français', 'Brevet 2026 · French', 'Brevet 2026 · Francés', 'Brevet 2026 · Französisch', 'Brevet 2026 · Francese', 'Brevet 2026 · Francês');
  S('Brevet 2026 · Histoire-géographie et EMC', 'Brevet 2026 · History, geography and civics', 'Brevet 2026 · Historia, geografía y educación cívica', 'Brevet 2026 · Geschichte, Geografie und Staatsbürgerkunde', 'Brevet 2026 · Storia, geografia ed educazione civica', 'Brevet 2026 · História, geografia e educação cívica');
  S('Brevet 2026 · Sciences', 'Brevet 2026 · Science', 'Brevet 2026 · Ciencias', 'Brevet 2026 · Naturwissenschaften', 'Brevet 2026 · Scienze', 'Brevet 2026 · Ciências');
  S('Bac 2026 · Maths anticipées (spécialité)', 'Bac 2026 · Early maths exam (specialty)', 'Bac 2026 · Matemáticas anticipadas (especialidad)', 'Bac 2026 · Vorgezogene Mathematik (Schwerpunktfach)', 'Bac 2026 · Matematica anticipata (specialità)', 'Bac 2026 · Matemática antecipada (especialidade)');
  S('Bac 2026 · Maths anticipées (sans spécialité)', 'Bac 2026 · Early maths exam (without specialty)', 'Bac 2026 · Matemáticas anticipadas (sin especialidad)', 'Bac 2026 · Vorgezogene Mathematik (ohne Schwerpunktfach)', 'Bac 2026 · Matematica anticipata (senza specialità)', 'Bac 2026 · Matemática antecipada (sem especialidade)');
  S('Bac 2026 · Français (épreuve anticipée)', 'Bac 2026 · French (early exam)', 'Bac 2026 · Francés (prueba anticipada)', 'Bac 2026 · Französisch (vorgezogene Prüfung)', 'Bac 2026 · Francese (prova anticipata)', 'Bac 2026 · Francês (prova antecipada)');
  spe26('maths', 'maths', 'matemáticas', 'Mathematik', 'matematica', 'matemática');
  spe26('physique-chimie', 'physics-chemistry', 'física y química', 'Physik-Chemie', 'fisica-chimica', 'física e química');
  for(const s of ['SVT', 'SES', 'HGGSP', 'HLP', 'NSI']) spe26(s, s, s, s, s, s);
  spe26('SI', 'engineering science (SI)', 'ciencias de la ingeniería (SI)', 'Ingenieurwissenschaften (SI)', 'scienze dell’ingegneria (SI)', 'ciências da engenharia (SI)');
  S('Bac 2026 · LLCER anglais', 'Bac 2026 · English language, literature and culture (LLCER)', 'Bac 2026 · Lengua, literatura y cultura inglesas (LLCER)', 'Bac 2026 · Englische Sprache, Literatur und Kultur (LLCER)', 'Bac 2026 · Lingua, letteratura e cultura inglese (LLCER)', 'Bac 2026 · Língua, literatura e cultura inglesas (LLCER)');
  S('Bac 2026 · Philosophie', 'Bac 2026 · Philosophy', 'Bac 2026 · Filosofía', 'Bac 2026 · Philosophie', 'Bac 2026 · Filosofia', 'Bac 2026 · Filosofia');

  // ── Écran « Officiel » : programmes ──
  S('Collège · cycle 3 (6e)', 'Lower secondary · cycle 3 (Year 7)', 'Collège · ciclo 3 (6e, primero de secundaria)', 'Collège · Zyklus 3 (6e, Klasse 6)', 'Collège · ciclo 3 (6e, prima media)', 'Collège · ciclo 3 (6e, 6.º ano)');
  S('Français et maths : BO n° 16 du 17 avril 2025', 'French and maths: Official Bulletin no. 16, 17 April 2025', 'Francés y matemáticas: Boletín Oficial n.º 16 del 17 de abril de 2025', 'Französisch und Mathematik: Amtsblatt Nr. 16 vom 17. April 2025', 'Francese e matematica: Bollettino ufficiale n. 16 del 17 aprile 2025', 'Francês e matemática: Boletim Oficial n.º 16 de 17 de abril de 2025');
  S('Collège · cycle 4 (5e, 4e, 3e)', 'Lower secondary · cycle 4 (Years 8 to 10)', 'Collège · ciclo 4 (5e, 4e, 3e)', 'Collège · Zyklus 4 (5e, 4e, 3e: Klassen 7 bis 9)', 'Collège · ciclo 4 (5e, 4e, 3e)', 'Collège · ciclo 4 (5e, 4e, 3e)');
  S('Français et maths : BO n° 10 du 5 mars 2026 (5e en 2026, 4e en 2027, 3e en 2028) ; autres matières : BO n° 31 du 30 juillet 2020',
    'French and maths: Official Bulletin no. 10, 5 March 2026 (Year 8 in 2026, Year 9 in 2027, Year 10 in 2028); other subjects: Official Bulletin no. 31, 30 July 2020',
    'Francés y matemáticas: Boletín Oficial n.º 10 del 5 de marzo de 2026 (5e en 2026, 4e en 2027, 3e en 2028); otras asignaturas: Boletín Oficial n.º 31 del 30 de julio de 2020',
    'Französisch und Mathematik: Amtsblatt Nr. 10 vom 5. März 2026 (5e ab 2026, 4e ab 2027, 3e ab 2028); andere Fächer: Amtsblatt Nr. 31 vom 30. Juli 2020',
    'Francese e matematica: Bollettino ufficiale n. 10 del 5 marzo 2026 (5e nel 2026, 4e nel 2027, 3e nel 2028); altre materie: Bollettino ufficiale n. 31 del 30 luglio 2020',
    'Francês e matemática: Boletim Oficial n.º 10 de 5 de março de 2026 (5e em 2026, 4e em 2027, 3e em 2028); outras disciplinas: Boletim Oficial n.º 31 de 30 de julho de 2020');
  S('Lycée général et technologique', 'General and technological upper secondary', 'Lycée general y tecnológico', 'Allgemeines und technologisches Lycée', 'Lycée generale e tecnologico', 'Lycée geral e tecnológico');
  S('Tous les programmes, matière par matière', 'All the curricula, subject by subject', 'Todos los programas, asignatura por asignatura', 'Alle Lehrpläne, Fach für Fach', 'Tutti i programmi, materia per materia', 'Todos os programas, disciplina a disciplina');
  S('Voie générale : spécialités', 'General track: specialties', 'Vía general: especialidades', 'Allgemeiner Zweig: Schwerpunktfächer', 'Indirizzo generale: specialità', 'Via geral: especialidades');
  S('Les spécialités de première et de terminale', 'Year 12 and Year 13 specialties', 'Las especialidades de première y terminale', 'Die Schwerpunktfächer der première und terminale', 'Le specialità di première e terminale', 'As especialidades de première e terminale');
  S('Mathématiques au lycée', 'Mathematics in upper secondary', 'Matemáticas en el lycée', 'Mathematik am Lycée', 'Matematica al lycée', 'Matemática no lycée');
  S('Nouveaux programmes : BO du 2 avril 2026', 'New curricula: Official Bulletin, 2 April 2026', 'Nuevos programas: Boletín Oficial del 2 de abril de 2026', 'Neue Lehrpläne: Amtsblatt vom 2. April 2026', 'Nuovi programmi: Bollettino ufficiale del 2 aprile 2026', 'Novos programas: Boletim Oficial de 2 de abril de 2026');
  S('Langues vivantes au lycée', 'Modern languages in upper secondary', 'Lenguas extranjeras en el lycée', 'Fremdsprachen am Lycée', 'Lingue straniere al lycée', 'Línguas estrangeiras no lycée');
  S('BO n° 22 du 29 mai 2025', 'Official Bulletin no. 22, 29 May 2025', 'Boletín Oficial n.º 22 del 29 de mayo de 2025', 'Amtsblatt Nr. 22 vom 29. Mai 2025', 'Bollettino ufficiale n. 22 del 29 maggio 2025', 'Boletim Oficial n.º 22 de 29 de maio de 2025');
  S('SVT au lycée', 'Biology and earth sciences (SVT) in upper secondary', 'Biología y geología (SVT) en el lycée', 'Biologie und Geowissenschaften (SVT) am Lycée', 'Scienze della vita e della Terra (SVT) al lycée', 'Ciências da vida e da Terra (SVT) no lycée');
  S('Seconde, spécialité de première et de terminale', 'Year 11, plus the Year 12 and Year 13 specialty', 'Seconde, especialidad de première y terminale', 'Seconde sowie Schwerpunktfach der première und terminale', 'Seconde, specialità di première e terminale', 'Seconde, especialidade de première e terminale');
  S('Bac technologique : les séries', 'Technological bac: the tracks', 'Bac tecnológico: las series', 'Technologisches Bac: die Zweige', 'Bac tecnologico: gli indirizzi', 'Bac tecnológico: as séries');
  S('STMG, STI2D, ST2S, STL, STD2A, STHR, S2TMD', 'STMG, STI2D, ST2S, STL, STD2A, STHR, S2TMD', 'STMG, STI2D, ST2S, STL, STD2A, STHR, S2TMD', 'STMG, STI2D, ST2S, STL, STD2A, STHR, S2TMD', 'STMG, STI2D, ST2S, STL, STD2A, STHR, S2TMD', 'STMG, STI2D, ST2S, STL, STD2A, STHR, S2TMD');

  // ── Écran « Officiel » : annales et épreuves ──
  S('Annales du brevet (depuis 2018)', 'Past brevet papers (since 2018)', 'Exámenes anteriores del brevet (desde 2018)', 'Frühere Brevet-Prüfungen (seit 2018)', 'Prove passate del brevet (dal 2018)', 'Provas anteriores do brevet (desde 2018)');
  S('Tous les sujets officiels, par session et par matière', 'All the official papers, by session and subject', 'Todos los exámenes oficiales, por convocatoria y asignatura', 'Alle offiziellen Prüfungen, nach Termin und Fach', 'Tutte le prove ufficiali, per sessione e materia', 'Todas as provas oficiais, por sessão e disciplina');
  S('Annales du bac général et technologique (depuis 2021)', 'Past general and technological bac papers (since 2021)', 'Exámenes anteriores del bac general y tecnológico (desde 2021)', 'Frühere Prüfungen des allgemeinen und technologischen Bac (seit 2021)', 'Prove passate del bac generale e tecnologico (dal 2021)', 'Provas anteriores do bac geral e tecnológico (desde 2021)');
  S('Français, philosophie, spécialités, maths anticipées', 'French, philosophy, specialties, early maths exam', 'Francés, filosofía, especialidades, matemáticas anticipadas', 'Französisch, Philosophie, Schwerpunktfächer, vorgezogene Mathematik', 'Francese, filosofia, specialità, matematica anticipata', 'Francês, filosofia, especialidades, matemática antecipada');
  S('Tous les sujets 2026', 'All the 2026 papers', 'Todos los exámenes de 2026', 'Alle Prüfungen 2026', 'Tutte le prove del 2026', 'Todas as provas de 2026');
  S('Brevet, bac et CAP, session 2026', 'Brevet, bac and CAP, 2026 session', 'Brevet, bac y CAP, convocatoria de 2026', 'Brevet, Bac und CAP, Prüfungstermin 2026', 'Brevet, bac e CAP, sessione 2026', 'Brevet, bac e CAP, sessão de 2026');
  S('Les épreuves du brevet', 'The brevet exams', 'Las pruebas del brevet', 'Die Prüfungen des Brevet', 'Le prove del brevet', 'As provas do brevet');
  S('Définition officielle des épreuves', 'Official description of the exams', 'Definición oficial de las pruebas', 'Offizielle Beschreibung der Prüfungen', 'Definizione ufficiale delle prove', 'Definição oficial das provas');
  S('Les épreuves terminales du bac général', 'Final exams of the general bac', 'Las pruebas finales del bac general', 'Die Abschlussprüfungen des allgemeinen Bac', 'Le prove finali del bac generale', 'As provas finais do bac geral');
  S('Coefficients, durées, nature', 'Weightings, durations, format', 'Coeficientes, duración, tipo de prueba', 'Gewichtung, Dauer, Art der Prüfung', 'Coefficienti, durata, tipo di prova', 'Coeficientes, duração, tipo de prova');
  S('Les épreuves terminales du bac technologique', 'Final exams of the technological bac', 'Las pruebas finales del bac tecnológico', 'Die Abschlussprüfungen des technologischen Bac', 'Le prove finali del bac tecnologico', 'As provas finais do bac tecnológico');
  S('Deux spécialités par série, coefficient 16', 'Two specialties per track, weighting 16', 'Dos especialidades por serie, coeficiente 16', 'Zwei Schwerpunktfächer pro Zweig, Gewichtung 16', 'Due specialità per indirizzo, coefficiente 16', 'Duas especialidades por série, coeficiente 16');
  S('Le Grand oral', 'The Grand oral', 'El Gran oral', 'Das Grand oral', 'Il Grand oral', 'O Grand oral');
  S('Déroulé et coefficients', 'How it works and weightings', 'Desarrollo y coeficientes', 'Ablauf und Gewichtung', 'Svolgimento e coefficienti', 'Desenrolar e coeficientes');
  S('Le baccalauréat professionnel', 'The vocational baccalauréat', 'El bachillerato profesional', 'Das berufliche Baccalauréat', 'Il baccalaureato professionale', 'O bacharelato profissional');
  S('Épreuves, calendrier, sujets d’enseignement général', 'Exams, timetable, general-subject papers', 'Pruebas, calendario, exámenes de materias generales', 'Prüfungen, Zeitplan, Prüfungen der allgemeinen Fächer', 'Prove, calendario, prove delle materie generali', 'Provas, calendário, provas das disciplinas gerais');
  S('Le CAP', 'The CAP', 'El CAP', 'Das CAP', 'Il CAP', 'O CAP');
  S('Épreuves et organisation', 'Exams and organisation', 'Pruebas y organización', 'Prüfungen und Organisation', 'Prove e organizzazione', 'Provas e organização');
  S('Base nationale des sujets d’examens de l’enseignement professionnel', 'National database of vocational exam papers', 'Base nacional de exámenes de la enseñanza profesional', 'Nationale Datenbank der Prüfungen der Berufsbildung', 'Banca dati nazionale delle prove dell’istruzione professionale', 'Base nacional de provas do ensino profissional');
  S('Sujets professionnels (notamment de CAP)', 'Vocational papers (including CAP)', 'Exámenes profesionales (en particular del CAP)', 'Berufliche Prüfungen (vor allem CAP)', 'Prove professionali (in particolare del CAP)', 'Provas profissionais (sobretudo do CAP)');
})();
