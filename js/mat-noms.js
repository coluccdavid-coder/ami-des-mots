// Ami des mots — v6.37 : nom de chaque matière dans les 5 autres langues de l'interface (en, es, de, it, pt).
// Complète seulement les noms absents : une traduction déjà présente dans un fichier mat-trad-* reste prioritaire.
// Les questions elles-mêmes gardent leurs propres traductions (ou restent en français si une matière n'est pas encore traduite).
(function(){
  'use strict';
  const T = window.MATIERES_LANGUES = window.MATIERES_LANGUES || {};
  const N = {
    francais:['French (language and literature)', 'Francés (lengua y literatura)', 'Französisch (Sprache und Literatur)', 'Francese (lingua e letteratura)', 'Francês (língua e literatura)'],
    histoire:['History, geography & citizenship', 'Historia-geografía y EMC', 'Geschichte, Geografie & Bürgerkunde', 'Storia, geografia ed educazione civica', 'História, geografia e cidadania'],
    svt:['Life and earth sciences (SVT)', 'Ciencias de la vida y de la Tierra (SVT)', 'Biologie und Geowissenschaften (SVT)', 'Scienze della vita e della Terra (SVT)', 'Ciências da vida e da Terra (SVT)'],
    physique:['Physics and chemistry', 'Física y química', 'Physik und Chemie', 'Fisica e chimica', 'Física e química'],
    medecine:['Medicine', 'Medicina', 'Medizin', 'Medicina', 'Medicina'],
    droit:['Law (French law degree)', 'Derecho (grado en Derecho francés)', 'Rechtswissenschaft (französisches Recht)', 'Giurisprudenza (diritto francese)', 'Direito (direito francês)'],
    astro:['Astrophysics', 'Astrofísica', 'Astrophysik', 'Astrofisica', 'Astrofísica'],
    langlais:['English (French school curriculum)', 'Inglés (programa escolar francés)', 'Englisch (französischer Lehrplan)', 'Inglese (programma scolastico francese)', 'Inglês (programa escolar francês)'],
    philo:['Philosophy', 'Filosofía', 'Philosophie', 'Filosofia', 'Filosofia'],
    lespagnol:['Spanish (second foreign language)', 'Español (segunda lengua extranjera)', 'Spanisch (zweite Fremdsprache)', 'Spagnolo (seconda lingua straniera)', 'Espanhol (segunda língua estrangeira)'],
    lallemand:['German (second foreign language)', 'Alemán (segunda lengua extranjera)', 'Deutsch (zweite Fremdsprache)', 'Tedesco (seconda lingua straniera)', 'Alemão (segunda língua estrangeira)'],
    ses:['Economics and social sciences (SES)', 'Ciencias económicas y sociales (SES)', 'Wirtschafts- und Sozialwissenschaften (SES)', 'Scienze economiche e sociali (SES)', 'Ciências económicas e sociais (SES)'],
    hggsp:['HGGSP (history, geography, geopolitics & political science)', 'HGGSP (historia, geografía, geopolítica y ciencias políticas)', 'HGGSP (Geschichte, Geografie, Geopolitik & Politikwissenschaft)', 'HGGSP (storia, geografia, geopolitica e scienze politiche)', 'HGGSP (história, geografia, geopolítica e ciência política)'],
    hlp:['HLP (humanities, literature and philosophy)', 'HLP (humanidades, literatura y filosofía)', 'HLP (Geisteswissenschaften, Literatur und Philosophie)', 'HLP (discipline umanistiche, letteratura e filosofia)', 'HLP (humanidades, literatura e filosofia)'],
    nsi:['Computer science (NSI)', 'Informática (NSI)', 'Informatik (NSI)', 'Informatica (NSI)', 'Informática (NSI)'],
    nasa:['Target NASA', 'Objetivo NASA', 'Ziel NASA', 'Obiettivo NASA', 'Objetivo NASA'],
    techno:['Design and technology', 'Tecnología', 'Technik', 'Tecnologia', 'Tecnologia'],
    arts:['Arts: art, music, art history', 'Artes: artes plásticas, música, historia del arte', 'Kunst: bildende Kunst, Musik, Kunstgeschichte', 'Arti: arti visive, musica, storia dell’arte', 'Artes: artes visuais, música, história da arte'],
    eps:['PE: knowledge, health, safety, rules', 'Educación física: conocimientos, salud, seguridad, reglas', 'Sport: Wissen, Gesundheit, Sicherheit, Regeln', 'Educazione fisica: conoscenze, salute, sicurezza, regole', 'Educação física: conhecimentos, saúde, segurança, regras'],
    lca:['Latin and Greek (classics)', 'Latín y griego (cultura clásica)', 'Latein und Griechisch (Antike)', 'Latino e greco (cultura classica)', 'Latim e grego (cultura clássica)']
  };
  ['en', 'es', 'de', 'it', 'pt'].forEach((l, i) => {
    const d = T[l] = T[l] || { noms:{}, q:{} }; d.noms = d.noms || {}; d.q = d.q || {};
    for(const [id, v] of Object.entries(N)){ const x = d.noms[id] = d.noms[id] || { dom:{}, ch:{} }; if(!x.nom) x.nom = v[i]; x.dom = x.dom || {}; x.ch = x.ch || {}; }
  });
})();
