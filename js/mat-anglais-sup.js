// Ami des mots — v6.4 : l'anglais après le bac (niveau « Sup ») dans la matière Anglais du programme français.
// Certifications (TOEIC, IELTS, Cambridge), anglais universitaire, anglais scientifique (et de la NASA),
// anglais professionnel, grammaire et expressions de niveau C1. Vannes sur la réponse, jamais sur l'élève.
(function(){
  'use strict';
  const M = window.MATIERES; if(!M) return;
  if(!M.NIVEAUX.includes('Sup')) M.NIVEAUX.push('Sup');
  const m = M.trouver('langlais'); if(!m) return;
  const C = (id, nom, dom, banque) => ({ id, nom, dom, niv:['Sup'], banque });
  const CERTIFS = [
    ['Le TOEIC Listening & Reading est noté sur…', '990 points', [['20', 'Ça, c’est le bac. Le TOEIC voit plus grand.'], ['100', 'Un peu plus que ça.'], ['9', 'Neuf, c’est l’IELTS. Le TOEIC compte large.']], '10 à 990 points ; 200 questions en 2 heures.'],
    ['Combien de questions compte le TOEIC Listening & Reading ?', '200', [['20', 'Dix fois plus. Prévois un bon petit-déjeuner.'], ['1 000', 'Ouf, non.'], ['50', 'Quatre fois plus. Courage !']], '100 en écoute, 100 en lecture.'],
    ['L’IELTS donne une note en « bands » de…', '0 à 9', [['A à F', 'Ça, c’est le système américain des notes.'], ['0 à 990', 'Ça, c’est le TOEIC.'], ['A1 à C2', 'Ça, c’est l’échelle européenne.']], 'Beaucoup d’universités britanniques demandent 6,5 ou 7.'],
    ['Le « Cambridge C1 Advanced » vise le niveau…', 'C1 du CECRL', [['A1', 'Un poil plus haut.'], ['B1', 'Encore un étage au-dessus de B2.'], ['C2', 'C2, c’est encore un cran au-dessus.']], 'A1, A2, B1, B2, C1, C2.'],
    ['Pour étudier dans une université britannique, on présente souvent…', 'l’IELTS Academic', [['le permis de conduire', 'Plumo t’arrête.'], ['le brevet', 'Pas suffisant.'], ['le TOEIC Bridge', 'C’est une version pour débutants.']], 'L’IELTS General Training sert plutôt à l’immigration et au travail.'],
    ['Le niveau visé en fin de terminale (LVA) est en général…', 'B2', [['C2', 'C2, c’est la maîtrise quasi native.'], ['A1', 'Bien plus haut.'], ['B1', 'Un peu plus haut en terminale.']], 'Après le bac, on vise C1 pour les études et métiers internationaux.'],
    ['Au TOEIC, la partie « Listening » dure environ…', '45 minutes', [['5 minutes', 'Un peu plus.'], ['3 heures', 'Tout le test dure 2 heures.'], ['10 minutes', 'Plus long que ça.']], 'Reading : 75 minutes.'],
    ['Le CLES est…', 'une certification en langues des universités françaises', [['un club de foot', 'Non.'], ['un test de code de la route', 'Non.'], ['un fromage', 'Plumo a faim, mais non. 🧀']], 'Niveaux B1, B2 et C1.']];
  const ACADEMIC = [
    ['En anglais universitaire, « hedging » consiste à…', 'nuancer une affirmation (may, might, suggest)', [['crier ses conclusions', 'L’université préfère la nuance.'], ['tailler une haie', 'Hedge = haie, mais ici, non. 🌳'], ['traduire mot à mot', 'Ce n’est pas ça.']], '« The results suggest that… » plutôt que « This proves… ».'],
    ['« Abstract » en tête d’un article scientifique, c’est…', 'le résumé', [['un tableau abstrait', 'Pas d’art moderne ici.'], ['la bibliographie', 'Elle est à la fin.'], ['la page de titre', 'Le titre est au-dessus.']], 'Objectif, méthode, résultats, conclusion en quelques lignes.'],
    ['Quel registre convient à une dissertation en anglais ?', 'formel : pas de contractions ni d’argot', [['« gonna » et « wanna »', 'Ton correcteur va pleurer.'], ['des emojis', 'Plumo les adore, pas le jury.'], ['écrire en SMS', 'LOL, non.']], '« do not » plutôt que « don’t ».'],
    ['« Furthermore » signifie…', 'de plus', [['cependant', 'Ça, c’est however.'], ['plus loin', 'Faux ami partiel : ici, c’est « de plus ».'], ['néanmoins', 'Ça, c’est nevertheless.']], 'Mots de liaison : moreover, furthermore, in addition.'],
    ['Citer ses sources évite…', 'le plagiat', [['les vacances', 'Dommage.'], ['les fautes d’orthographe', 'Ça, c’est la relecture.'], ['les mauvaises notes', 'Pas directement.']], 'Styles courants : APA, Harvard, MLA.'],
    ['« Et al. » dans une référence veut dire…', 'et d’autres auteurs', [['etc.', 'Proche, mais pour des personnes.'], ['à la fin', 'Non.'], ['et alors', 'Non.']], 'Smith et al. (2024).'],
    ['« A thesis statement » est…', 'la phrase qui annonce ta thèse', [['un mémoire de 300 pages', 'Ça, c’est une « thesis » tout court.'], ['un relevé de notes', 'Non.'], ['une citation célèbre', 'Non : c’est TA thèse.']], 'En fin d’introduction.'],
    ['Quel verbe est le plus « académique » ?', 'to investigate', [['to look into stuff', 'Trop familier.'], ['to check out', 'Familier aussi.'], ['to have a look-see', 'Trop familier.']], 'Verbes précis : investigate, assess, demonstrate.']];
  const SCIENCE = [
    ['« One billion » en français, c’est…', 'un milliard', [['un billion', 'Piège ! Le « billion » français vaut mille milliards.'], ['un million', 'Mille fois trop petit.'], ['mille', 'Très loin du compte.']], 'Faux ami classique dans les articles scientifiques.'],
    ['Comment lit-on « 3.5 » en anglais ?', 'three point five', [['three comma five', 'En anglais, la virgule décimale est un point.'], ['thirty-five', 'Le point a disparu.'], ['three and five', 'Le point se dit « point ».']], '3,5 en français = 3.5 en anglais.'],
    ['« Thrust » en français ?', 'la poussée', [['la confiance', 'C’est trust, sans h.'], ['le carburant', 'C’est fuel ou propellant.'], ['la soif', 'C’est thirst.']], 'Vocabulaire de la NASA.'],
    ['« Peer review » signifie…', 'relecture par des pairs (d’autres chercheurs)', [['revue de presse', 'Non.'], ['regarder par la fenêtre', 'Peer = scruter aussi, mais ici non.'], ['revue de mode', 'Non.']], 'Avant publication d’un article.'],
    ['« A hypothesis » au pluriel ?', 'hypotheses', [['hypothesises', 'Pluriel grec : -sis → -ses.'], ['hypothesis’s', 'L’apostrophe ne fait jamais de pluriel.'], ['hypothesi', 'Pluriel inventé.']], 'analysis → analyses, crisis → crises.'],
    ['« Data » est à l’origine…', 'le pluriel de « datum »', [['un mot français', 'Non, latin.'], ['une marque', 'Non.'], ['un logiciel', 'Non.']], 'On entend « the data show » et « the data shows ».'],
    ['« Launch pad » veut dire…', 'pas de tir', [['tablette de lancement de jeux', 'Plumo rigole.'], ['cahier de brouillon', 'Pad, mais non.'], ['coussin de tir', 'Trop littéral.']], 'Le pas de tir 39B a lancé Artemis II en 2026.'],
    ['« Two-thirds » se traduit par…', 'deux tiers', [['deux troisièmes', 'Traduction trop littérale.'], ['trente-deux', 'Non.'], ['deuxième tiers', 'Non.']], 'Fractions : a half, a third, a quarter.']];
  const PRO = [
    ['Pour finir un e-mail professionnel formel, on écrit…', 'Kind regards,', [['Bisous,', 'Pas avec un recruteur.'], ['See ya!', 'Trop familier.'], ['Ciao,', 'Trop familier pour un recruteur.']], 'Aussi : Best regards, Yours sincerely (lettre).'],
    ['« Actually » veut dire…', 'en fait', [['actuellement', 'Faux ami ! Actuellement = currently.'], ['activement', 'Non.'], ['actif', 'Non.']], 'Faux ami très fréquent.'],
    ['« Eventually » veut dire…', 'finalement', [['éventuellement', 'Faux ami ! Éventuellement = possibly.'], ['en avance', 'Non.'], ['évidemment', 'Ça, c’est obviously.']], 'Autre faux ami classique.'],
    ['Un « CV » en anglais britannique, c’est aussi…', 'un résumé (US) / CV (UK)', [['une lettre de motivation', 'Ça, c’est une cover letter.'], ['un bulletin de salaire', 'Non.'], ['un casier judiciaire', 'Non.']], 'Aux États-Unis, on dit souvent « résumé ».'],
    ['En entretien, « Tell me about yourself » demande…', 'un court résumé de ton parcours', [['ta vie entière depuis le CP', 'Trop long.'], ['ton plat préféré uniquement', 'Pas seulement.'], ['une blague', 'Pas en entretien.']], 'Parcours, compétences, motivation, en deux minutes.'],
    ['« To schedule a meeting » veut dire…', 'planifier une réunion', [['annuler une réunion', 'Ça, c’est cancel.'], ['dormir en réunion', 'Plumo n’a rien vu.'], ['déménager une réunion', 'Non.']], 'Vocabulaire de bureau.'],
    ['« I look forward to hearing from you » signifie…', 'dans l’attente de votre réponse', [['je regarde devant moi', 'Trop littéral.'], ['je vous entends mal', 'Non.'], ['je regarde en avant', 'Trop littéral.']], 'Formule de fin de lettre.'],
    ['« Deadline » veut dire…', 'date limite', [['ligne morte', 'Littéral, mais faux.'], ['date de naissance', 'Non.'], ['ligne de départ', 'Non.']], 'Meet a deadline = respecter une échéance.']];
  const C1 = [
    ['Complète (inversion) : « Not only ___ late, but he also forgot the keys. »', 'was he', [['he was', 'Après « Not only » en tête, on inverse.'], ['he is', 'Temps et ordre à revoir.'], ['did he was', 'Deux verbes se battent.']], 'Inversion après une expression négative en tête.'],
    ['« If I had studied harder, I ___ a doctor now. » (mixed conditional)', 'would be', [['would have been', 'Le résultat est au présent (now).'], ['will be', 'Pas avec un passé irréel.'], ['would had been', 'Ça n’existe pas.']], 'Condition passée → conséquence présente.'],
    ['« It’s high time we ___ . »', 'left', [['leave', 'Après « It’s high time », on met le prétérit.'], ['will leave', 'Non.'], ['leaving', 'Après « It’s high time + sujet », prétérit.']], 'Sens : il serait grand temps.'],
    ['« To beat around the bush » veut dire…', 'tourner autour du pot', [['taper dans un buisson', 'Trop littéral.'], ['gagner facilement', 'Non.'], ['battre un buisson', 'Trop littéral.']], 'Expression idiomatique.'],
    ['« A blessing in disguise » veut dire…', 'un mal pour un bien', [['un déguisement béni', 'Non.'], ['une mauvaise nouvelle', 'Le contraire au final.'], ['une bénédiction déguisée en clown', 'Plumo rit, mais non.']], 'Idiom de niveau C1.'],
    ['« The more you practise, ___ you get. »', 'the better', [['the best', 'Comparatif double : the more…, the better.'], ['better', 'Il manque « the ».'], ['the most good', 'Ça n’existe pas.']], 'Plus… plus…'],
    ['« I’d rather you ___ smoke here. »', 'didn’t', [['don’t', 'Après « I’d rather + sujet », prétérit.'], ['not', 'Il manque l’auxiliaire.'], ['wouldn’t', 'Après « I’d rather + sujet », prétérit simple.']], 'Préférence sur autrui.'],
    ['« Hardly ___ arrived when the phone rang. »', 'had I', [['I had', 'Inversion après « Hardly ».'], ['I have', 'Temps et ordre à revoir.'], ['had I have', 'Ça n’existe pas.']], 'Hardly… when = à peine… que.']];
  m.chapitres.push(C('sup-certifs', 'Certifications : TOEIC, IELTS, Cambridge', 'Après le bac', CERTIFS),
    C('sup-academic', 'Anglais universitaire', 'Après le bac', ACADEMIC),
    C('sup-science', 'Anglais scientifique (et de la NASA)', 'Après le bac', SCIENCE),
    C('sup-pro', 'Anglais professionnel : e-mails, CV, entretiens', 'Après le bac', PRO),
    C('sup-c1', 'Grammaire et expressions de niveau C1', 'Après le bac', C1));
  m.examens = Object.assign(m.examens || {}, { Sup:'Test de niveau C1 (après le bac)' });
})();
