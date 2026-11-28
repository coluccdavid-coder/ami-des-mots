// Ami des mots — v8.4 : le défi rétro étoffé.
// • La vraie dictée : Plumo lit (voix de synthèse, rien n'est enregistré), l'élève écrit, correction mot à mot, barème du certificat d'études.
// • Quatre nouvelles épreuves (histoire par cœur, leçons de choses, mots de l'école d'autrefois, problèmes à l'ancienne)
//   et 20 questions de plus pour chacune des cinq épreuves d'origine (40 chacune).
// • Le Certificat d'études (dictée + 20 questions), avec une page de repères sourcés.
// • Le duel des générations : les mêmes 10 questions pour deux joueurs.
// • Les récompenses d'époque : bons points, images à collectionner, tableau d'honneur.
// En français seulement, comme le reste du défi rétro. Textes des dictées : domaine public (La Fontaine, Daudet, Hugo, Verlaine).
(function(){
  'use strict';
  const M = window.AMI_MODULES; if(!M || !window.AMI_RETRO) return;
  const api = () => M.api;
  // ———— 20 questions de plus pour chacune des cinq épreuves d’origine ————
  const PLUS = {
    dictee:[
      ['Quel est le pluriel de « un festival » ?', 'des festivals', [['des festivaux', 'Festival fait partie des rebelles en -al : bal, carnaval, chacal, festival, récital, régal. 🎪'], ['des festivales', 'Pas de e ici. ✏️'], ['des festival', 'Il faut bien un s au pluriel. ✖️']], 'Bal, carnaval, chacal, festival, récital, régal : pluriel en -als.'],
      ['Quel est le pluriel de « un détail » ?', 'des détails', [['des détaux', 'Seuls sept mots en -ail font -aux (bail, corail, émail, soupirail, travail, vantail, vitrail). 🔍'], ['des détailx', 'Ce x n’existe pas. ❌'], ['des détail', 'Il manque le s. ✖️']], 'La plupart des noms en -ail prennent un s : des détails, des éventails.'],
      ['Quel est le pluriel de « un bijou » ?', 'des bijoux', [['des bijous', 'Bijou est dans la liste des sept : bijou, caillou, chou, genou, hibou, joujou, pou. 💎'], ['des bijou', 'Il faut une marque du pluriel. ✖️'], ['des bijeaux', 'Ce n’est pas un mot en -eau. 🙃']], 'Bijou, caillou, chou, genou, hibou, joujou, pou prennent un x au pluriel.'],
      ['Quel est le pluriel de « un pneu » ?', 'des pneus', [['des pneux', 'Pneu fait partie des exceptions en -eu, avec bleu et émeu. 🚲'], ['des pneu', 'Il manque le s. ✖️'], ['des pneaux', 'Ce mot n’existe pas. 🙃']], 'Les noms en -eu prennent un x (des jeux), sauf bleu, émeu, pneu… qui prennent un s.'],
      ['Dans l’orthographe traditionnelle, quel est le pluriel de « un porte-monnaie » ?', 'des porte-monnaie', [['des portes-monnaies', '« Porte » est un verbe : il ne prend pas de s. 👛'], ['des porte-monnaies', 'Accepté depuis 1990, mais pas dans la dictée de 1978 ! 📕'], ['des portes-monnaie', 'Le verbe ne s’accorde pas. 👛']], 'Verbe + nom : le verbe reste invariable ; ici la monnaie reste au singulier (traditionnellement).'],
      ['Complète : « Ils se sont … les mains. » (laver)', 'lavé', [['lavés', 'Ils ont lavé quoi ? Les mains, placées après : pas d’accord. 🧼'], ['lavées', 'Le COD est après le verbe : pas d’accord. 🧼'], ['laver', 'Il faut le participe passé. ⏳']], 'Le COD « les mains » est placé après : le participe reste invariable.'],
      ['Complète : « Les fleurs que j’ai … sont fanées. » (cueillir)', 'cueillies', [['cueilli', 'Le COD « que » (= les fleurs) est placé avant : on accorde. 🌸'], ['cueillis', 'Les fleurs sont féminines. 🌼'], ['cueillir', 'Il faut le participe passé. ⏳']], 'Avec avoir, le participe s’accorde avec le COD placé avant.'],
      ['Complète : « Elle s’est … de peur. » (évanouir)', 'évanouie', [['évanoui', 'Elle : féminin, il faut un e. 👗'], ['évanouis', 'Il n’y a qu’une personne. 1️⃣'], ['évanouit', 'Ce serait un verbe conjugué, pas un participe. ⏳']], 'S’évanouir est essentiellement pronominal : le participe s’accorde avec le sujet.'],
      ['Complète à l’imparfait du subjonctif : « Il fallait que tu … (avoir) du courage. »', 'eusses', [['avais', 'Imparfait de l’indicatif : raté pour le subjonctif. 🙃'], ['aies', 'Subjonctif présent : trop moderne. 📱'], ['eus', 'Passé simple : presque, mais non. 🎩']], 'Que j’eusse, que tu eusses, qu’il eût, que nous eussions.'],
      ['Complète au passé simple : « Il … (peindre) un tableau. »', 'peignit', [['peindit', 'Le radical du passé simple est « peign- ». 🎨'], ['peinta', 'Ce n’est pas un verbe en -er. 🙃'], ['peint', 'Ça peut être le présent ou le participe. ⏳']], 'Je peignis, tu peignis, il peignit, nous peignîmes.'],
      ['Complète au passé simple : « Ils … (prendre) le train. »', 'prirent', [['prenèrent', 'Prendre n’est pas du 1er groupe. 🚂'], ['prendirent', 'Le radical est « pri- ». 🔧'], ['prennent', 'C’est le présent. ⏳']], 'Je pris, tu pris, il prit, nous prîmes, vous prîtes, ils prirent.'],
      ['Comment écrit-on 200 en lettres ?', 'deux cents', [['deux cent', '« Cent » multiplié et en fin de nombre prend un s. ✖️'], ['deux-cents', 'Pas de trait d’union dans l’orthographe traditionnelle. ➖'], ['deuxs cents', '« Deux » est invariable. 2️⃣']], 'Deux cents, mais deux cent trois.'],
      ['Comment écrit-on 3 000 en lettres ?', 'trois mille', [['trois milles', '« Mille » est toujours invariable. 🔒'], ['trois-mille', 'Pas de trait d’union dans l’orthographe traditionnelle. ➖'], ['trois mil', 'On écrit « mil » seulement dans certaines dates anciennes. 📅']], 'Mille ne prend jamais de s.'],
      ['Complète : « Je … donne des livres. » (à eux)', 'leur', [['leurs', 'Devant un verbe, « leur » est un pronom : jamais de s. 🔒'], ['leure', 'Ce mot n’existe pas. 🙃'], ['l’heure', 'Ça, c’est pour lire l’horloge ! ⏰']], '« Leur » pronom (= à eux) est invariable.'],
      ['Complète : « … un beau jour ! »', 'C’est', [['S’est', '« S’est » vient d’un verbe pronominal (il s’est levé). 🪞'], ['Ces', 'Ça, c’est un déterminant pluriel. 👉'], ['Ses', 'Ça, c’est un possessif. 🎒']], 'C’est = cela est.'],
      ['Complète : « Il … mangé sa soupe. »', 'a', [['à', 'Avec un accent, c’est une préposition. 📍'], ['as', 'Ça, c’est pour « tu ». 👤'], ['ah', 'Ça, c’est une exclamation ! 😮']], 'On peut remplacer par « avait » : c’est le verbe avoir.'],
      ['Complète : « Elles sont … contentes. »', 'toutes', [['tout', 'Devant un adjectif féminin commençant par une consonne, « tout » s’accorde. 🎀'], ['toute', 'Elles sont plusieurs. 👯'], ['touts', 'Ce mot n’existe pas. 🙃']], 'Tout adverbe varie devant un adjectif féminin commençant par une consonne ou un h aspiré.'],
      ['Complète : « Il est deux heures et … »', 'demie', [['demi', 'Après le nom, « demi » s’accorde en genre : une heure et demie. ⏰'], ['demis', 'Il n’y a qu’une demie. 1️⃣'], ['demies', 'Toujours au singulier ici. 1️⃣']], 'Une demi-heure, mais deux heures et demie.'],
      ['Comment écrit-on « marcher … » (sans chaussures) ?', 'nu-pieds', [['nus-pieds', 'Devant le nom, avec un trait d’union, « nu » ne s’accorde pas. 🦶'], ['nu pieds', 'Il faut le trait d’union. ➖'], ['nus pied', 'Double raté ! 🙈']], 'Nu-pieds, nu-tête, mais pieds nus.'],
      ['Complète : « Il … promène dans le parc. »', 'se', [['ce', '« Ce » est un démonstratif. 👉'], ['ceux', 'Ça, c’est un pronom pluriel. 👥'], ['seu', 'Ce mot n’existe pas. 🙃']], 'Devant un verbe, on écrit « se » (pronom réfléchi) : il se lave, il se promène.']
    ],
    analyse:[
      ['« Le soleil brille. » Quelle est la nature de « brille » ?', 'un verbe', [['un nom', 'Un nom désigne une chose ou un être. 🏷️'], ['un adjectif', 'L’adjectif qualifie un nom. 🎨'], ['un adverbe', 'L’adverbe modifie un verbe ou un adjectif. 🔧']], 'Le verbe exprime une action ou un état ; il se conjugue.'],
      ['« Il marche lentement. » Quelle est la nature de « lentement » ?', 'un adverbe', [['un adjectif', 'Il ne qualifie aucun nom. 🎨'], ['un verbe', 'Il ne se conjugue pas. ⏳'], ['un nom', 'Non. 🏷️']], 'Beaucoup d’adverbes de manière se terminent en -ment.'],
      ['« Je mange une pomme. » Quelle est la fonction de « une pomme » ?', 'complément d’objet direct', [['sujet', 'Le sujet, c’est « je ». 👤'], ['attribut du sujet', 'Il n’y a pas de verbe d’état. 🧩'], ['complément circonstanciel', 'Elle ne dit ni où ni quand. ⏰']], 'Je mange quoi ? Une pomme : COD, sans préposition.'],
      ['« Il parle à sa mère. » Quelle est la fonction de « à sa mère » ?', 'complément d’objet indirect', [['complément d’objet direct', 'Il y a la préposition « à ». 🔗'], ['complément de lieu', 'Sa mère n’est pas un endroit ! 🗺️'], ['sujet', 'Non. 👤']], 'Parler à quelqu’un : COI, introduit par une préposition.'],
      ['« Il part demain. » Quelle est la fonction de « demain » ?', 'complément circonstanciel de temps', [['complément d’objet direct', 'On ne part pas « quelque chose ». 🚪'], ['complément de lieu', 'Il dit quand, pas où. 📍'], ['attribut', 'Non. 🧩']], 'Le complément circonstanciel de temps répond à « quand ? ».'],
      ['« Il habite à Paris. » Quelle est la fonction de « à Paris » ?', 'complément circonstanciel de lieu', [['complément d’objet direct', 'Il y a une préposition. 🔗'], ['complément de temps', 'Il dit où, pas quand. ⏰'], ['sujet', 'Non. 👤']], 'Il répond à la question « où ? ».'],
      ['« Il tremble de froid. » Quelle est la fonction de « de froid » ?', 'complément circonstanciel de cause', [['complément de but', 'Il ne tremble pas pour avoir froid ! 🥶'], ['complément de lieu', 'Non. 📍'], ['complément d’objet direct', 'Non. 🔤']], 'Il répond à « pourquoi ? » : c’est la cause.'],
      ['« Un gros chien aboie. » Quelle est la fonction de « gros » ?', 'épithète du nom « chien »', [['attribut du sujet', 'Il n’y a pas de verbe d’état entre les deux. 🧩'], ['complément d’objet direct', 'Non. 🔤'], ['sujet', 'Le sujet, c’est « un gros chien ». 🐕']], 'L’épithète est placée directement à côté du nom.'],
      ['« Il travaille pour réussir. » Quelle est la fonction de « pour réussir » ?', 'complément circonstanciel de but', [['complément de cause', 'Réussir est ce qu’il vise, pas la raison qui le pousse. 🎯'], ['complément d’objet direct', 'Il y a une préposition. 🔗'], ['complément de temps', 'Non. ⏰']], 'Il répond à « dans quel but ? ».'],
      ['Quelle est la nature de « et » ?', 'une conjonction de coordination', [['une préposition', 'Les prépositions sont à, de, pour, dans… 🔗'], ['un adverbe', 'Non. 🔧'], ['un pronom', 'Non. 👤']], 'Mais, ou, et, donc, or, ni, car.'],
      ['Quelle est la nature de « dans » ?', 'une préposition', [['une conjonction', 'Elle n’introduit pas de proposition. 🔗'], ['un adverbe', 'Non. 🔧'], ['un nom', 'Non. 🏷️']], 'À, dans, par, pour, en, vers, avec, de, sans, sous…'],
      ['« Je crois qu’il viendra. » Quelle est la fonction de « qu’il viendra » ?', 'complément d’objet direct de « crois »', [['sujet de « crois »', 'Le sujet, c’est « je ». 👤'], ['complément circonstanciel de temps', 'Elle ne dit pas quand. ⏰'], ['épithète', 'Non. 🎨']], 'Je crois quoi ? Qu’il viendra.'],
      ['« Si tu viens, je serai content. » Quelle est la nature de « si tu viens » ?', 'une subordonnée circonstancielle de condition', [['une subordonnée de temps', 'Elle pose une condition. 🤔'], ['une principale', 'La principale, c’est « je serai content ». 👑'], ['une relative', 'Il n’y a pas d’antécédent. 🔄']], '« Si » introduit souvent une condition.'],
      ['« Il est parti parce qu’il était fatigué. » Que marque la subordonnée ?', 'la cause', [['le but', 'Il n’est pas parti pour être fatigué ! 😴'], ['la conséquence', 'C’est l’inverse. 🔄'], ['le temps', 'Non. ⏰']], 'Parce que, puisque, comme : la cause.'],
      ['« Je viendrais si je pouvais. » À quel mode est « viendrais » ?', 'au conditionnel', [['à l’indicatif futur', 'Le futur serait « viendrai », sans s. 📏'], ['au subjonctif', 'Non. 📏'], ['à l’impératif', 'Non. 📢']], 'Le conditionnel exprime ce qui dépend d’une condition.'],
      ['« Nous chanterons. » À quel temps est le verbe ?', 'au futur simple', [['au présent', 'Ce serait « nous chantons ». ⏳'], ['à l’imparfait', 'Ce serait « nous chantions ». ⏳'], ['au conditionnel', 'Ce serait « nous chanterions ». 🤔']], 'Futur simple : infinitif + -ai, -as, -a, -ons, -ez, -ont.'],
      ['« J’avais chanté. » À quel temps est le verbe ?', 'au plus-que-parfait', [['au passé composé', 'Ce serait « j’ai chanté ». ⏳'], ['au passé simple', 'Ce serait « je chantai ». 🎩'], ['au futur antérieur', 'Ce serait « j’aurai chanté ». ⏳']], 'Plus-que-parfait : auxiliaire à l’imparfait + participe passé.'],
      ['Quelle est la nature de « celui-ci » ?', 'un pronom démonstratif', [['un adjectif démonstratif', 'Il remplace un nom, il ne l’accompagne pas. 🔄'], ['un pronom possessif', 'Ce serait « le mien ». 🎒'], ['un adverbe', 'Non. 🔧']], 'Celui, celle, ceux, celui-ci, cela…'],
      ['« L’enfant qui joue. » Quelle est la nature de « qui » ?', 'un pronom relatif', [['un pronom interrogatif', 'Il ne pose pas de question ici. ❓'], ['une conjonction', 'Il remplace « l’enfant ». 🔄'], ['un adverbe', 'Non. 🔧']], 'Qui, que, quoi, dont, où : pronoms relatifs.'],
      ['« Hélas ! » Quelle est la nature de ce mot ?', 'une interjection', [['un adverbe', 'Il exprime un sentiment, à lui tout seul. 😢'], ['un verbe', 'Il ne se conjugue pas. ⏳'], ['un nom', 'Non. 🏷️']], 'Ah !, oh !, hélas !, bravo ! : des interjections.']
    ],
    mathsmod:[
      ['Combien de parties (sous-ensembles) a l’ensemble {a ; b} ?', '4', [['2', 'N’oublie pas ∅ et l’ensemble lui-même. 📦'], ['3', 'Il en manque une. 🔢'], ['1', 'Bien plus. 🔢']], '∅, {a}, {b}, {a ; b}.'],
      ['Combien d’éléments a {1 ; 2 ; 3} ∪ {3 ; 4} ?', '4', [['5', 'Le 3 commun ne compte qu’une fois. 🧹'], ['2', 'Ça, c’est la taille du deuxième ensemble. 🔢'], ['1', 'Ça, c’est l’intersection. ✂️']], '{1 ; 2 ; 3 ; 4} : quatre éléments.'],
      ['Que vaut A ∩ ∅ ?', '∅', [['A', 'Ça, c’est A ∪ ∅. 🔗'], ['{0}', 'Ça contient un élément. 📦'], ['tous les nombres', 'Non. ♾️']], 'Rien n’est commun avec l’ensemble vide.'],
      ['Que vaut A ∪ ∅ ?', 'A', [['∅', 'Ça, c’est A ∩ ∅. ✂️'], ['{A}', 'Ce serait un ensemble qui contient A. 📦'], ['{0}', 'Non. 0️⃣']], 'Ajouter rien ne change rien.'],
      ['Comment écrit-on trois en base deux ?', '11', [['3', 'Le chiffre 3 n’existe pas en base deux. 🔢'], ['101', 'Ça, c’est cinq. 🔢'], ['10', 'Ça, c’est deux. 🔢']], '3 = 1 × 2 + 1.'],
      ['Comment écrit-on huit en base deux ?', '1000', [['111', 'Ça, c’est sept. 🔢'], ['1001', 'Ça, c’est neuf. 🔢'], ['8', 'Le chiffre 8 n’existe pas en base deux. 🔢']], '8 = 1 × 8 + 0 × 4 + 0 × 2 + 0 × 1.'],
      ['Que vaut 111 (base deux) en base dix ?', '7', [['111', 'Il faut convertir ! 🔄'], ['3', 'Ça, c’est 11 en base deux. 🔢'], ['6', 'Il manque l’unité. 🔢']], '4 + 2 + 1 = 7.'],
      ['Que vaut 23 (base cinq) en base dix ?', '13', [['23', 'Il faut convertir ! 🔄'], ['11', 'Recompte : 2 × 5 + 3. 🔢'], ['15', 'Non. 🔢']], '2 paquets de cinq + 3 unités = 13.'],
      ['Que vaut 100 (base cinq) en base dix ?', '25', [['100', 'Il faut convertir ! 🔄'], ['5', 'Ça, c’est 10 en base cinq. 🔢'], ['10', 'Non. 🔢']], '1 × 5 × 5 = 25.'],
      ['Comment écrit-on quatre en base trois ?', '11', [['4', 'Le chiffre 4 n’existe pas en base trois. 🔢'], ['100', 'Ça vaut neuf. 🔢'], ['12', 'Ça vaut cinq. 🔢']], '4 = 1 × 3 + 1.'],
      ['Que signifie le symbole ∉ ?', 'n’appartient pas à', [['appartient à', 'C’est ∈, sans la barre. ✅'], ['est inclus dans', 'C’est ⊂. 📦'], ['est égal à', 'C’est =. 🟰']], '5 ∉ {1 ; 2 ; 3}.'],
      ['La relation « est égal à » est-elle réflexive ?', 'oui : tout nombre est égal à lui-même', [['non, jamais', 'Si : 3 = 3. 🪞'], ['seulement pour zéro', 'Pour tous les nombres. 🔢'], ['seulement le lundi', 'Les maths ne regardent pas le calendrier. 📅']], 'Une relation est réflexive si chaque élément est en relation avec lui-même.'],
      ['Quand on écrit tous les éléments d’un ensemble entre accolades, comment dit-on qu’il est défini ?', 'en extension', [['en compréhension', 'Ça, c’est quand on donne une propriété. 📝'], ['en intersection', 'Non. ✂️'], ['en base deux', 'Non. 🔢']], '{2 ; 4 ; 6} est en extension ; « les nombres pairs inférieurs à 7 » est en compréhension.'],
      ['A = {1 ; 2 ; 3 ; 4 ; 5} et B = {2 ; 4 ; 6}. Que vaut A ∩ B ?', '{2 ; 4}', [['{2 ; 4 ; 6}', 'Le 6 n’est pas dans A. 🔍'], ['{1 ; 3 ; 5}', 'Ce sont les éléments de A qui ne sont pas dans B. 🙃'], ['{1 ; 2 ; 3 ; 4 ; 5 ; 6}', 'Ça, c’est la réunion. 🔗']], 'Les éléments communs aux deux.'],
      ['A = {1 ; 2 ; 3} et B = {2}. Que vaut A privé de B (A \\ B) ?', '{1 ; 3}', [['{2}', 'Ça, c’est ce qu’on enlève. ✂️'], ['{1 ; 2 ; 3}', 'Il faut enlever le 2. 🧹'], ['∅', 'Il reste des éléments. 🔍']], 'On garde les éléments de A qui ne sont pas dans B.'],
      ['Que veut dire « deux ensembles disjoints » ?', 'ils n’ont aucun élément commun', [['ils sont égaux', 'Non. 🟰'], ['l’un est inclus dans l’autre', 'Non. 📦'], ['ils sont vides', 'Pas forcément. 📦']], 'Leur intersection est vide.'],
      ['Combien de couples contient {a ; b} × {1 ; 2 ; 3} ?', '6', [['5', 'Multiplie : 2 × 3. ✖️'], ['3', 'Non. 🔢'], ['9', 'Ce serait 3 × 3. 🔢']], 'Le cardinal d’un produit est le produit des cardinaux.'],
      ['En base seize, comment écrit-on dix ?', 'A', [['10', 'Ça vaudrait seize. 🔢'], ['J', 'On commence par A. 🔤'], ['X', 'C’est le chiffre romain. 🏛️']], 'En base seize : 0 à 9, puis A, B, C, D, E, F.'],
      ['Quel est l’ensemble des diviseurs de 6 ?', '{1 ; 2 ; 3 ; 6}', [['{2 ; 3}', 'N’oublie pas 1 et 6. 🔍'], ['{6 ; 12 ; 18}', 'Ce sont des multiples. ✖️'], ['{1 ; 6}', 'Il en manque deux. 🔍']], 'Un diviseur de 6 divise 6 sans reste.'],
      ['Quel est l’ensemble des multiples non nuls de 3 inférieurs à 10 ?', '{3 ; 6 ; 9}', [['{1 ; 3}', 'Ce sont des diviseurs. ➗'], ['{3 ; 6 ; 9 ; 12}', '12 dépasse 10. 🔟'], ['{0 ; 3 ; 6 ; 9}', 'On a dit non nuls. 0️⃣']], 'Les multiples de 3 : 3, 6, 9, 12…']
    ],
    calcul:[
      ['8 × 9 = ?', '72', [['64', 'Ça, c’est 8 × 8. 🔢'], ['81', 'Ça, c’est 9 × 9. 🔢'], ['63', 'Ça, c’est 7 × 9. 🔢']], 'Astuce : 8 × 9 = 80 − 8.'],
      ['6 × 7 = ?', '42', [['36', 'Ça, c’est 6 × 6. 🔢'], ['48', 'Ça, c’est 6 × 8. 🔢'], ['49', 'Ça, c’est 7 × 7. 🔢']], '6 × 7 = 42.'],
      ['11 × 11 = ?', '121', [['111', 'Non. 🔢'], ['1 111', 'On ne colle pas les nombres ! 😄'], ['122', 'Presque. 🔢']], '11 × 11 = 110 + 11.'],
      ['25 × 4 = ?', '100', [['29', 'Ça, c’est 25 + 4 ! ➕'], ['75', 'Ça, c’est 25 × 3. 🔢'], ['125', 'Ça, c’est 25 × 5. 🔢']], 'Quatre pièces de 25 font 100.'],
      ['144 ÷ 12 = ?', '12', [['14', 'Non. ➗'], ['11', 'Ça ferait 132. 🔢'], ['13', 'Ça ferait 156. 🔢']], 'Une grosse = douze douzaines.'],
      ['Combien de centilitres dans un litre ?', '100', [['10', 'Ça, c’est le nombre de décilitres. 🥛'], ['1 000', 'Ça, c’est le nombre de millilitres. 💧'], ['1', 'Non. 🥛']], 'Centi = un centième.'],
      ['Combien de litres dans un mètre cube ?', '1 000', [['100', 'Il manque un zéro. 📦'], ['10', 'Bien trop peu. 📦'], ['1', 'Ça, c’est le décimètre cube. 🧊']], '1 m³ = 1 000 dm³ = 1 000 L.'],
      ['Combien de litres dans un décimètre cube ?', '1', [['10', 'Non. 🧊'], ['100', 'Non. 🧊'], ['1 000', 'Ça, c’est le mètre cube. 📦']], 'Un cube de 10 cm de côté contient un litre.'],
      ['Combien de minutes dans un quart d’heure ?', '15', [['25', 'Une heure fait 60 minutes, pas 100. ⏰'], ['20', 'Ça, c’est un tiers d’heure. ⏰'], ['30', 'Ça, c’est une demi-heure. ⏰']], '60 ÷ 4 = 15.'],
      ['Combien font 10 % de 250 ?', '25', [['10', 'C’est le pourcentage. 💯'], ['2,5', 'Ce serait 1 %. 💯'], ['50', 'Ce serait 20 %. 💯']], '10 % = un dixième.'],
      ['Combien font 50 % de 46 ?', '23', [['50', 'C’est le pourcentage. 💯'], ['46', 'Ça, c’est 100 %. 💯'], ['26', 'Non. ➗']], '50 % = la moitié.'],
      ['Quel est le périmètre d’un carré de 7 cm de côté ?', '28 cm', [['49 cm', 'Ça, c’est l’aire (en cm²). 🟩'], ['14 cm', 'Il y a quatre côtés. 🔲'], ['21 cm', 'Il manque un côté. 🔲']], 'Périmètre du carré = 4 × côté.'],
      ['Quelle est l’aire d’un rectangle de 8 cm sur 5 cm ?', '40 cm²', [['26 cm²', 'Ça, c’est le périmètre (26 cm). 🔲'], ['13 cm²', 'Ça, c’est 8 + 5. ➕'], ['45 cm²', 'Non. 🔢']], 'Aire du rectangle = longueur × largeur.'],
      ['Combien d’objets dans une demi-douzaine ?', '6', [['12', 'Ça, c’est une douzaine. 🥚'], ['5', 'Non. 🥚'], ['24', 'Ça, c’est deux douzaines. 🥚']], 'Une douzaine = 12 ; la moitié = 6.'],
      ['0,5 + 0,25 = ?', '0,75', [['0,30', 'On n’ajoute pas les chiffres comme ça ! 🔢'], ['0,525', 'Aligne les virgules. 📏'], ['1', 'Non. 🔢']], 'Une moitié + un quart = trois quarts.'],
      ['Combien font les trois quarts de 20 ?', '15', [['5', 'Ça, c’est un quart. 🍰'], ['10', 'Ça, c’est la moitié. 🍰'], ['60', 'Ça, c’est 3 × 20. ✖️']], '20 ÷ 4 = 5, puis 5 × 3 = 15.'],
      ['456 + 378 = ?', '834', [['724', 'Attention aux retenues. ➕'], ['824', 'Une retenue oubliée. ➕'], ['844', 'Non. ➕']], '456 + 300 = 756, + 78 = 834.'],
      ['Un objet coûte 5 francs. Combien coûtent 7 objets ?', '35 francs', [['12 francs', 'Ça, c’est 5 + 7 ! ➕'], ['30 francs', 'Ce serait 6 objets. 🔢'], ['40 francs', 'Ce serait 8 objets. 🔢']], '5 × 7 = 35.'],
      ['Combien de centimes dans un franc ?', '100', [['10', 'Non. 🪙'], ['1 000', 'Non. 🪙'], ['20', 'Non. 🪙']], 'Comme pour l’euro : 1 franc = 100 centimes.'],
      ['Combien de mètres dans un hectomètre ?', '100', [['10', 'Ça, c’est le décamètre. 📏'], ['1 000', 'Ça, c’est le kilomètre. 📏'], ['0,01', 'Ça, c’est le centimètre. 📏']], 'Hecto = cent.']
    ],
    geo:[
      ['Quelle est la préfecture du Nord ?', 'Lille', [['Roubaix', 'Grande ville, mais pas préfecture. 🏭'], ['Dunkerque', 'C’est une sous-préfecture. ⚓'], ['Amiens', 'C’est dans la Somme. ⛪']], 'Nord (59) : Lille.'],
      ['Quelle est la préfecture de la Haute-Garonne ?', 'Toulouse', [['Bordeaux', 'C’est en Gironde. 🍷'], ['Montauban', 'C’est dans le Tarn-et-Garonne. 🧱'], ['Saint-Gaudens', 'C’est une sous-préfecture. 🏔️']], 'Haute-Garonne (31) : Toulouse.'],
      ['Quelle est la préfecture de l’Hérault ?', 'Montpellier', [['Béziers', 'Sous-préfecture. 🍇'], ['Sète', 'Belle ville de port, pas préfecture. 🐟'], ['Nîmes', 'C’est dans le Gard. 🏛️']], 'Hérault (34) : Montpellier.'],
      ['Quelle est la préfecture d’Ille-et-Vilaine ?', 'Rennes', [['Saint-Malo', 'Sous-préfecture. ⚓'], ['Vannes', 'C’est dans le Morbihan. 🌊'], ['Nantes', 'C’est en Loire-Atlantique. 🐘']], 'Ille-et-Vilaine (35) : Rennes.'],
      ['Quelle est la préfecture de la Loire-Atlantique ?', 'Nantes', [['Saint-Nazaire', 'Sous-préfecture. 🚢'], ['Angers', 'C’est dans le Maine-et-Loire. 🏰'], ['La Baule', 'Belle plage, pas préfecture. 🏖️']], 'Loire-Atlantique (44) : Nantes.'],
      ['Quelle est la préfecture de l’Isère ?', 'Grenoble', [['Vienne', 'Sous-préfecture. 🏛️'], ['Chambéry', 'C’est en Savoie. 🏔️'], ['Valence', 'C’est dans la Drôme. 🍑']], 'Isère (38) : Grenoble.'],
      ['Quelle est la préfecture de la Haute-Savoie ?', 'Annecy', [['Chamonix', 'Célèbre pour le mont Blanc, mais pas préfecture. 🏔️'], ['Chambéry', 'C’est en Savoie. 🏔️'], ['Évian-les-Bains', 'Célèbre pour son eau, pas préfecture. 💧']], 'Haute-Savoie (74) : Annecy.'],
      ['Quelle est la préfecture du Puy-de-Dôme ?', 'Clermont-Ferrand', [['Vichy', 'C’est dans l’Allier. 💧'], ['Riom', 'Sous-préfecture. 🏛️'], ['Aurillac', 'C’est dans le Cantal. 🧀']], 'Puy-de-Dôme (63) : Clermont-Ferrand.'],
      ['Quelle est la préfecture de la Corrèze ?', 'Tulle', [['Brive-la-Gaillarde', 'Plus peuplée, mais sous-préfecture : piège ! 🏉'], ['Limoges', 'C’est en Haute-Vienne. 🍽️'], ['Ussel', 'Sous-préfecture. 🌲']], 'Corrèze (19) : Tulle.'],
      ['Quelle est la préfecture du Pas-de-Calais ?', 'Arras', [['Calais', 'Malgré le nom du département, ce n’est pas la préfecture : piège ! ⛴️'], ['Boulogne-sur-Mer', 'Sous-préfecture. 🐟'], ['Lille', 'C’est dans le Nord. 🏭']], 'Pas-de-Calais (62) : Arras.'],
      ['Quelle est la préfecture de la Manche ?', 'Saint-Lô', [['Cherbourg', 'Plus grande ville, mais pas préfecture : piège ! ⚓'], ['Granville', 'Non. 🌊'], ['Caen', 'C’est dans le Calvados. 🏛️']], 'Manche (50) : Saint-Lô.'],
      ['Quelle est la préfecture de la Meurthe-et-Moselle ?', 'Nancy', [['Metz', 'C’est en Moselle. 🏛️'], ['Lunéville', 'Sous-préfecture. 🏰'], ['Épinal', 'C’est dans les Vosges. 🖼️']], 'Meurthe-et-Moselle (54) : Nancy.'],
      ['Quelle est la préfecture de la Moselle ?', 'Metz', [['Nancy', 'C’est en Meurthe-et-Moselle. 🏛️'], ['Thionville', 'Sous-préfecture. 🏭'], ['Strasbourg', 'C’est dans le Bas-Rhin. 🥨']], 'Moselle (57) : Metz.'],
      ['Quel département porte le numéro 69 ?', 'le Rhône', [['la Loire', 'Elle a le 42. 🏞️'], ['l’Ain', 'Il a le 01. 🐔'], ['l’Isère', 'Elle a le 38. 🏔️']], 'Préfecture : Lyon.'],
      ['Quel département porte le numéro 59 ?', 'le Nord', [['la Somme', 'Elle a le 80. ⛪'], ['le Pas-de-Calais', 'Il a le 62. ⛴️'], ['l’Aisne', 'Elle a le 02. 🏰']], 'Préfecture : Lille.'],
      ['Quel département porte le numéro 06 ?', 'les Alpes-Maritimes', [['l’Ardèche', 'Elle a le 07. 🏞️'], ['les Hautes-Alpes', 'Elles ont le 05. 🏔️'], ['l’Aude', 'Elle a le 11. 🏰']], 'Préfecture : Nice.'],
      ['Quel est le plus haut sommet de France, dans les Alpes ?', 'le mont Blanc', [['le puy de Dôme', 'Il est dans le Massif central, bien plus bas. 🌋'], ['le Vignemale', 'Il est dans les Pyrénées. 🇪🇸'], ['le mont Ventoux', 'Le « géant de Provence », bien plus bas. 🚴']], 'Il dépasse 4 800 mètres.'],
      ['Quel fleuve traverse Paris ?', 'la Seine', [['la Loire', 'Elle passe à Orléans et à Nantes. 🏰'], ['la Marne', 'C’est un affluent de la Seine. 🏞️'], ['le Rhône', 'Il passe à Lyon. 🦁']], 'Elle se jette dans la Manche, au Havre.'],
      ['Quel fleuve passe à Nantes ?', 'la Loire', [['la Seine', 'Elle passe à Paris et à Rouen. 🗼'], ['la Garonne', 'Elle passe à Bordeaux. 🍷'], ['la Vilaine', 'Elle passe à Rennes. 🏛️']], 'La Loire se jette dans l’Atlantique, à Saint-Nazaire.'],
      ['Quel fleuve forme la frontière entre la France et l’Allemagne, près de Strasbourg ?', 'le Rhin', [['le Rhône', 'Il coule vers la Méditerranée. 🌊'], ['la Moselle', 'C’est un affluent du Rhin. 🏞️'], ['la Meuse', 'Elle part vers la Belgique. 🇧🇪']], 'Le Rhin se jette dans la mer du Nord.']
    ]
  };
  // ———— Quatre nouvelles épreuves ————
  const NOUVELLES = [
    { id:'histoire', ic:'🏰', nom:'Histoire par cœur', sous:'Les dates qu’on récitait : de Vercingétorix à la Lune', q:[
      ['Que s’est-il passé à Alésia en 52 avant J.-C. ?', 'Vercingétorix s’est rendu à Jules César', [['Clovis a été baptisé', 'C’était à Reims, vers 496. ⛪'], ['Charlemagne a été couronné', 'C’était à Rome, en 800. 👑'], ['Jeanne d’Arc a délivré la ville', 'Elle a délivré Orléans, en 1429. ⚔️']], 'La fin de la guerre des Gaules.'],
      ['Vers quelle date situe-t-on traditionnellement le baptême de Clovis ?', 'vers 496', [['en 1515', 'Ça, c’est Marignan. 🐴'], ['en 800', 'Ça, c’est Charlemagne. 👑'], ['en 1789', 'Ça, c’est la Révolution. 🇫🇷']], 'Il est baptisé à Reims par l’évêque Remi.'],
      ['Que retient-on de l’année 732 ?', 'Charles Martel arrête une armée arabe près de Poitiers', [['la prise de la Bastille', 'C’est 1789. 🏰'], ['le sacre de Napoléon', 'C’est 1804. 👑'], ['la découverte de l’Amérique', 'C’est 1492. ⛵']], 'La bataille de Poitiers.'],
      ['Qui est couronné empereur à Rome en l’an 800 ?', 'Charlemagne', [['Clovis', 'Il est mort bien avant, en 511. ⛪'], ['Hugues Capet', 'Il devient roi en 987. 👑'], ['Napoléon Ier', 'Il est sacré en 1804, à Paris. 🎖️']], 'Couronné par le pape Léon III.'],
      ['Qui devient roi des Francs en 987 ?', 'Hugues Capet', [['Charlemagne', 'Il est empereur en 800. 👑'], ['Louis XIV', 'Il règne à partir de 1643. ☀️'], ['Saint Louis', 'Il règne au XIIIe siècle. ⚜️']], 'Il fonde la dynastie des Capétiens.'],
      ['Quelle ville Jeanne d’Arc délivre-t-elle en 1429 ?', 'Orléans', [['Paris', 'Elle n’arrive pas à la prendre. 🗼'], ['Rouen', 'C’est là qu’elle meurt, en 1431. 🔥'], ['Reims', 'C’est là qu’elle fait sacrer Charles VII. ⛪']], 'On l’appelle la Pucelle d’Orléans.'],
      ['Que s’est-il passé en 1492 ?', 'Christophe Colomb a atteint l’Amérique', [['la bataille de Marignan', 'C’est 1515. 🐴'], ['l’édit de Nantes', 'C’est 1598. 📜'], ['la Révolution française', 'C’est 1789. 🇫🇷']], 'Il croyait arriver aux Indes.'],
      ['Quelle bataille est associée à l’année 1515 ?', 'Marignan', [['Waterloo', 'C’est 1815. 🎖️'], ['Alésia', 'C’est 52 avant J.-C. 🛡️'], ['Poitiers', 'C’est 732. ⚔️']], 'Victoire de François Ier en Italie : la date la plus célèbre des écoliers.'],
      ['Quel roi signe l’édit de Nantes en 1598 ?', 'Henri IV', [['Louis XIV', 'Il le révoque en 1685. ☀️'], ['François Ier', 'Il est mort en 1547. 🎨'], ['Louis XVI', 'Non. 👑']], 'L’édit accorde la liberté de culte aux protestants.'],
      ['Quel roi est surnommé le Roi-Soleil ?', 'Louis XIV', [['Louis XVI', 'Il règne au moment de la Révolution. 🇫🇷'], ['Henri IV', 'On l’appelle le bon roi Henri. 🐔'], ['Louis IX', 'C’est Saint Louis. ⚜️']], 'Il fait construire le château de Versailles.'],
      ['Que s’est-il passé le 14 juillet 1789 ?', 'la prise de la Bastille', [['le sacre de Napoléon', 'C’est 1804. 👑'], ['l’armistice', 'C’est le 11 novembre 1918. 🕊️'], ['le baptême de Clovis', 'C’est vers 496. ⛪']], 'Elle devient la fête nationale en 1880.'],
      ['En quelle année Napoléon Bonaparte est-il sacré empereur ?', '1804', [['1789', 'C’est la Révolution. 🇫🇷'], ['1815', 'C’est Waterloo. 🎖️'], ['1848', 'C’est la IIe République. 🗳️']], 'Le sacre a lieu à Notre-Dame de Paris.'],
      ['Quelle défaite met fin à l’Empire de Napoléon en 1815 ?', 'Waterloo', [['Austerlitz', 'Ça, c’est une victoire, en 1805. ☀️'], ['Marignan', 'C’est 1515. 🐴'], ['Verdun', 'C’est 1916. 🪖']], 'Waterloo se trouve en Belgique.'],
      ['Quelle République est proclamée le 4 septembre 1870 ?', 'la IIIe République', [['la Ire République', 'Elle date de 1792. 🇫🇷'], ['la Ve République', 'Elle date de 1958. 🗳️'], ['la IVe République', 'Elle date de 1946. 🏛️']], 'Après la défaite de Sedan face à la Prusse.'],
      ['Que rendent les lois Jules Ferry de 1881 et 1882 ?', 'l’école primaire gratuite, obligatoire et laïque', [['l’école payante pour tous', 'C’est l’inverse. 🔄'], ['le baccalauréat obligatoire', 'Non. 🎓'], ['les vacances interdites', 'Non ! 🏖️']], 'La loi du 28 mars 1882 rend l’instruction obligatoire de 6 à 13 ans.'],
      ['Que fête-t-on le 11 novembre ?', 'l’armistice de 1918, fin des combats de la Grande Guerre', [['la prise de la Bastille', 'C’est le 14 juillet. 🏰'], ['la fin de la Seconde Guerre mondiale en Europe', 'C’est le 8 mai 1945. 🕊️'], ['le baptême de Clovis', 'Non. ⛪']], 'Il est signé dans un wagon, en forêt de Compiègne.'],
      ['Que rappelle la date du 8 mai 1945 ?', 'la fin de la Seconde Guerre mondiale en Europe', [['l’armistice de 1918', 'C’est le 11 novembre. 🕊️'], ['le premier pas sur la Lune', 'C’est 1969. 🌕'], ['la naissance de la Ve République', 'C’est 1958. 🗳️']], 'L’Allemagne capitule sans condition.'],
      ['En quelle année naît la Ve République ?', '1958', [['1945', 'C’est la fin de la guerre. 🕊️'], ['1968', 'C’est Mai 68. 📣'], ['1981', 'Non. 🗳️']], 'Sa Constitution est adoptée par référendum, le 28 septembre 1958.'],
      ['Quel historien a écrit les célèbres manuels d’histoire de l’école primaire, surnommés « le petit Lavisse » ?', 'Ernest Lavisse', [['Jules Michelet', 'Grand historien, mais pas l’auteur du « petit Lavisse ». 📚'], ['Victor Hugo', 'Il était écrivain et poète. ✒️'], ['Jules Ferry', 'Il était ministre, pas auteur de manuels. 🏛️']], 'Ses manuels ont servi à des générations d’écoliers.'],
      ['En quelle année un homme marche-t-il pour la première fois sur la Lune ?', '1969', [['1957', 'C’est le lancement de Spoutnik. 🛰️'], ['1961', 'C’est le premier homme dans l’espace, Gagarine. 🚀'], ['1975', 'Non. 🌕']], 'Neil Armstrong, mission Apollo 11.']
    ]},
    { id:'choses', ic:'🔬', nom:'Leçons de choses', sous:'Les sciences d’autrefois : l’eau, les bêtes, les plantes', q:[
      ['À quelle température l’eau bout-elle au niveau de la mer ?', '100 °C', [['0 °C', 'Ça, c’est quand elle gèle. 🧊'], ['50 °C', 'Bien trop tiède. 🛁'], ['37 °C', 'Ça, c’est la température du corps. 🌡️']], 'En montagne, elle bout un peu avant.'],
      ['À quelle température l’eau gèle-t-elle ?', '0 °C', [['100 °C', 'Ça, c’est quand elle bout. ♨️'], ['10 °C', 'Il fait frais, mais l’eau reste liquide. 🌊'], ['−50 °C', 'Bien avant ! 🧊']], 'L’échelle Celsius se fonde sur ces deux repères.'],
      ['Quels sont les trois états de l’eau ?', 'solide, liquide et gazeux', [['chaud, froid et tiède', 'Ce sont des températures. 🌡️'], ['pluie, neige et grêle', 'Ce sont des précipitations. 🌧️'], ['douce, salée et gazeuse', 'Ce sont des sortes d’eau à boire ! 🥤']], 'La glace, l’eau, la vapeur.'],
      ['Comment les vieux manuels appelaient-ils la photosynthèse des plantes ?', 'la fonction chlorophyllienne', [['la respiration des racines', 'Ce n’est pas la même chose. 🌱'], ['la germination', 'C’est la naissance de la plante. 🌰'], ['la pollinisation', 'C’est le transport du pollen. 🐝']], 'Grâce à la chlorophylle verte, la plante fabrique sa matière avec la lumière.'],
      ['Combien de pattes a un insecte ?', '6', [['8', 'Ça, c’est l’araignée, qui n’est pas un insecte. 🕷️'], ['4', 'Non. 🐞'], ['10', 'Non. 🦀']], 'Tête, thorax, abdomen et six pattes.'],
      ['L’araignée est-elle un insecte ?', 'non, c’est un arachnide, avec 8 pattes', [['oui, comme la fourmi', 'Elle a deux pattes de trop. 🐜'], ['oui, c’est un insecte volant', 'Elle ne vole pas. 🕸️'], ['non, c’est un mammifère', 'Non plus ! 🐭']], 'Les arachnides ont huit pattes.'],
      ['Comment s’appelle la transformation de la chenille en papillon ?', 'la métamorphose', [['la germination', 'Ça, c’est pour les graines. 🌰'], ['l’hibernation', 'Ça, c’est dormir l’hiver. 🐻'], ['la migration', 'Ça, c’est voyager. 🦢']], 'Œuf, chenille, chrysalide, papillon.'],
      ['Que devient le têtard ?', 'une grenouille', [['un poisson', 'Il en a l’air, mais non. 🐟'], ['un serpent', 'Non. 🐍'], ['un papillon', 'Ça, c’est la chenille. 🦋']], 'Lui aussi subit une métamorphose.'],
      ['La baleine est-elle un poisson ?', 'non, c’est un mammifère : elle allaite ses petits', [['oui, elle vit dans l’eau', 'Vivre dans l’eau ne suffit pas. 🌊'], ['oui, elle a des écailles', 'Elle n’en a pas. 🐋'], ['non, c’est un oiseau', 'Non ! 🐦']], 'Elle respire de l’air avec des poumons.'],
      ['La chauve-souris est-elle un oiseau ?', 'non, c’est un mammifère volant', [['oui, elle a des plumes', 'Elle n’a pas de plumes. 🪶'], ['oui, elle pond des œufs', 'Elle met bas et allaite. 🍼'], ['non, c’est un insecte', 'Non. 🐞']], 'Ses ailes sont faites de peau tendue entre les doigts.'],
      ['Quel métal un aimant attire-t-il ?', 'le fer', [['le cuivre', 'L’aimant ne l’attire pas. 🟠'], ['l’or', 'Non. 💛'], ['l’aluminium', 'Non. 🥫']], 'Le fer, le nickel et le cobalt sont attirés.'],
      ['Que montre l’aiguille d’une boussole ?', 'le nord (magnétique)', [['le sud géographique exactement', 'Non. 🧭'], ['l’heure', 'Ça, c’est une montre ! ⌚'], ['la température', 'Ça, c’est un thermomètre. 🌡️']], 'L’aiguille aimantée s’oriente selon le champ magnétique de la Terre.'],
      ['À quoi sert le cœur ?', 'à faire circuler le sang dans le corps', [['à respirer', 'Ça, ce sont les poumons. 🫁'], ['à digérer', 'Ça, c’est l’estomac et l’intestin. 🍽️'], ['à penser', 'Ça, c’est le cerveau. 🧠']], 'C’est un muscle qui fonctionne comme une pompe.'],
      ['Combien de dents a un adulte, dents de sagesse comprises ?', '32', [['20', 'Ça, ce sont les dents de lait. 🦷'], ['28', 'Sans les dents de sagesse. 🦷'], ['40', 'Trop. 🦷']], 'Un enfant a 20 dents de lait.'],
      ['Comment appelle-t-on un animal qui mange de l’herbe, comme la vache ?', 'un herbivore', [['un carnivore', 'Il mange de la viande. 🥩'], ['un insectivore', 'Il mange des insectes. 🐜'], ['un omnivore', 'Il mange de tout. 🍽️']], 'La vache est aussi un ruminant : elle remâche l’herbe.'],
      ['Que faut-il à une graine de haricot posée sur du coton pour germer ?', 'de l’eau, de l’air et une température douce', [['du sel', 'Le sel l’empêcherait plutôt. 🧂'], ['de l’obscurité totale et du froid', 'Il faut au contraire de la douceur. 🥶'], ['de la musique', 'Ça ne gêne pas, mais ça ne suffit pas ! 🎵']], 'L’expérience classique de la classe : le haricot sur du coton humide.'],
      ['Que mesure un baromètre ?', 'la pression de l’air', [['la température', 'Ça, c’est le thermomètre. 🌡️'], ['la vitesse du vent', 'Ça, c’est l’anémomètre. 🌬️'], ['la pluie tombée', 'Ça, c’est le pluviomètre. 🌧️']], 'Quand la pression baisse, le mauvais temps arrive souvent.'],
      ['Quel gaz occupe la plus grande place dans l’air ?', 'l’azote', [['l’oxygène', 'Il fait environ un cinquième de l’air. 🫁'], ['le gaz carbonique', 'Il y en a très peu. 🌫️'], ['l’hélium', 'Presque pas. 🎈']], 'Environ 78 % d’azote et 21 % d’oxygène.'],
      ['Combien de temps environ sépare deux pleines lunes ?', 'environ 29 jours et demi', [['7 jours', 'Ça, c’est environ un quartier. 🌓'], ['365 jours', 'Ça, c’est une année. 📅'], ['24 heures', 'Ça, c’est une journée. 🌞']], 'C’est l’origine du mot « mois ».'],
      ['Pourquoi a-t-on des saisons ?', 'parce que l’axe de la Terre est incliné', [['parce que la Terre s’éloigne beaucoup du Soleil en hiver', 'Elle est même un peu plus proche en janvier ! 🌍'], ['parce que la Lune cache le Soleil', 'Ça, c’est une éclipse. 🌑'], ['parce que les nuages changent', 'Non. ☁️']], 'Selon la saison, les rayons du Soleil arrivent plus ou moins droits.']
    ]},
    { id:'vocab', ic:'🎒', nom:'Les mots de l’école d’autrefois', sous:'Plumier, buvard, bons points et blouse grise', q:[
      ['Qu’est-ce qu’un plumier ?', 'une boîte pour ranger le porte-plume et les crayons', [['un oreiller en plumes', 'On ne dormait pas en classe ! 🛏️'], ['un oiseau de basse-cour', 'Non. 🐓'], ['un chapeau d’écolier', 'Non. 🎩']], 'Souvent en bois, avec un couvercle qui glisse.'],
      ['Qu’est-ce qu’un encrier ?', 'un petit pot d’encre, souvent encastré dans le pupitre', [['un stylo à bille', 'Il arrive plus tard. 🖊️'], ['un livre de poésie', 'Non. 📖'], ['une tache sur le cahier', 'Ça, c’est un pâté ! 🫠']], 'Le maître ou un élève le remplissait régulièrement.'],
      ['À quoi servait le buvard ?', 'à sécher l’encre fraîche sans faire de taches', [['à boire en classe', 'Malgré son nom, non ! 🥤'], ['à effacer le tableau', 'Ça, c’est l’éponge ou la brosse. 🧽'], ['à couvrir les livres', 'Non. 📚']], 'Un papier très absorbant.'],
      ['Qu’est-ce qu’un porte-plume ?', 'le manche sur lequel on fixe la plume métallique', [['un oiseau qui porte des plumes', 'Non ! 🐦'], ['une trousse', 'Non. 👝'], ['un cartable', 'Non. 🎒']], 'On trempait la plume dans l’encrier.'],
      ['Qu’est-ce qu’un « pâté » dans un cahier d’écolier ?', 'une grosse tache d’encre', [['un dessin réussi', 'Non. 🎨'], ['un goûter caché', 'Pas dans ce sens ! 🥪'], ['une bonne note', 'Non. 📝']], 'D’où l’importance du buvard.'],
      ['Qu’est-ce qu’un bon point ?', 'une petite carte de récompense donnée par le maître', [['une punition', 'C’est l’inverse. 🎉'], ['une note sur 20', 'Non. 📝'], ['un point de couture', 'Non. 🧵']], 'Avec plusieurs bons points, on recevait souvent une image.'],
      ['Pourquoi portait-on une blouse en classe ?', 'pour protéger ses vêtements de l’encre et de la craie', [['pour faire du sport', 'Non. ⚽'], ['parce qu’il faisait froid', 'Ce n’était pas la raison principale. 🧥'], ['pour aller à la piscine', 'Non. 🏊']], 'Souvent grise ou bleue.'],
      ['Qu’est-ce qu’un pupitre ?', 'une table d’écolier, souvent avec un couvercle et un encrier', [['un instrument de musique', 'Non. 🎺'], ['un tableau noir', 'Non. 🟫'], ['une chaise de maître', 'Non. 🪑']], 'Les élèves y rangeaient leurs affaires.'],
      ['Sur quoi écrivait-on à la craie, à sa place, pour montrer sa réponse ?', 'sur une ardoise', [['sur un buvard', 'Il sert à sécher l’encre. 💧'], ['sur un plumier', 'C’est une boîte. 📦'], ['sur la blouse', 'Non ! 🧥']], 'On levait l’ardoise pour que le maître la voie.'],
      ['Qu’était le certificat d’études ?', 'le diplôme de fin d’école primaire', [['le diplôme de fin de lycée', 'Ça, c’est le baccalauréat. 🎓'], ['un permis de conduire', 'Non. 🚗'], ['un bulletin de santé', 'Non. 🩺']], 'Le « certif ».'],
      ['Comment le poète Charles Péguy surnomme-t-il les instituteurs de la République ?', 'les hussards noirs', [['les mousquetaires gris', 'Non. 🤺'], ['les chevaliers blancs', 'Non. 🐴'], ['les gardiens bleus', 'Non. 💙']], 'Noirs, à cause de leur tenue sombre.'],
      ['Qu’est-ce que le préau ?', 'la partie couverte de la cour de récréation', [['le bureau du directeur', 'Non. 🚪'], ['un exercice de calcul', 'Non. 🔢'], ['la cantine', 'Non. 🍽️']], 'On s’y abritait les jours de pluie.'],
      ['Que désignait « la communale » ?', 'l’école primaire publique de la commune', [['la mairie', 'Elle était souvent dans le même bâtiment ! 🏛️'], ['la fête du village', 'Non. 🎉'], ['la boulangerie', 'Non. 🥖']], '« Aller à la communale ».'],
      ['Que sont les célèbres cartes de Vidal-Lablache ?', 'des cartes murales de géographie accrochées en classe', [['des cartes à jouer', 'Non. 🃏'], ['des cartes postales', 'Non. 💌'], ['des cartes d’identité', 'Non. 🪪']], 'Paul Vidal de La Blache était géographe.'],
      ['Qu’est-ce que le tableau d’honneur ?', 'la liste des meilleurs élèves, affichée ou annoncée', [['le tableau noir', 'Non. 🟫'], ['un tableau de peinture', 'Non. 🖼️'], ['la liste des punis', 'C’est l’inverse. 🙃']], 'Une récompense pour le travail et la conduite.'],
      ['Quel livre de lecture très célèbre raconte le voyage de deux frères à travers la France ?', 'Le Tour de la France par deux enfants', [['Le Petit Prince', 'Il paraît en 1943 et se passe dans les étoiles. 🌹'], ['Les Misérables', 'C’est un grand roman de Victor Hugo. 📚'], ['Vingt mille lieues sous les mers', 'C’est sous l’eau, avec le capitaine Nemo. 🐙']], 'Écrit par G. Bruno, il paraît en 1877.'],
      ['Comment appelait-on l’exercice où l’on écrivait un petit texte sur un sujet donné ?', 'la rédaction', [['la récitation', 'Ça, c’est dire un texte par cœur. 🎤'], ['la dictée', 'Ça, c’est écrire ce que dit le maître. ✒️'], ['la leçon de choses', 'Ça, c’est les sciences. 🔬']], 'On dit aujourd’hui « production d’écrit » ou « expression écrite ».'],
      ['Qu’est-ce que la récitation ?', 'dire par cœur un poème ou un texte appris', [['lire un texte inconnu', 'Non : il fallait l’apprendre avant. 📖'], ['chanter l’hymne national', 'Pas seulement. 🎶'], ['réciter ses tables de multiplication seulement', 'Les tables, c’était aussi par cœur, mais la récitation, c’est la poésie. 📜']], 'Les fables de La Fontaine étaient très souvent choisies.'],
      ['Qu’était le « cahier du jour » ?', 'le cahier où l’on faisait les exercices de la journée', [['un journal intime', 'Non. 📔'], ['un calendrier', 'Non. 📅'], ['le cahier du maître', 'Non. 👨‍🏫']], 'On y écrivait la date en haut de la page, chaque matin.'],
      ['Qu’est-ce que le cartable ?', 'le sac de l’écolier, porté à la main ou sur le dos', [['un tableau de cartes', 'Non. 🗺️'], ['un cahier', 'Non. 📒'], ['un pupitre', 'Non. 🪑']], 'Souvent en cuir, avec une boucle.']
    ]},
    { id:'problemes', ic:'🚂', nom:'Problèmes à l’ancienne', sous:'Robinets, trains, intérêts et marchands', q:[
      ['Un robinet verse 10 litres par minute. En combien de temps remplit-il une baignoire de 150 litres ?', '15 minutes', [['10 minutes', 'Il n’y aurait que 100 litres. 🛁'], ['150 minutes', 'Il verse 10 litres chaque minute. 🚰'], ['1 500 minutes', 'On ne multiplie pas ! ✖️']], '150 ÷ 10 = 15.'],
      ['Un robinet verse 12 litres par minute, mais la bonde fuit de 2 litres par minute. En combien de temps remplit-on 100 litres ?', '10 minutes', [['8 minutes', 'Tu as oublié la fuite. 💧'], ['50 minutes', 'Ce serait avec la fuite seule. 🙃'], ['12 minutes', 'Non. 🛁']], 'Il reste 12 − 2 = 10 litres par minute.'],
      ['Un train part à 8 h et roule 3 h 30 min. À quelle heure arrive-t-il ?', '11 h 30', [['11 h 50', 'Une heure fait 60 minutes. ⏰'], ['10 h 30', 'Il manque une heure. ⏰'], ['12 h', 'Non. ⏰']], '8 h + 3 h 30 min = 11 h 30.'],
      ['Un train roule à 90 km/h. Combien de temps met-il pour faire 270 km ?', '3 heures', [['2 heures', 'Il ne ferait que 180 km. 🚂'], ['4 heures', 'Il ferait 360 km. 🚂'], ['30 minutes', 'Bien trop rapide ! 🚀']], '270 ÷ 90 = 3.'],
      ['Deux trains partent en même temps de deux villes distantes de 300 km et roulent l’un vers l’autre, à 60 km/h et 90 km/h. Au bout de combien de temps se croisent-ils ?', '2 heures', [['5 heures', 'Ce serait pour le train lent seul. 🐢'], ['1 heure', 'Ils n’auraient fait que 150 km. 🔢'], ['3 heures', 'Ils auraient fait 450 km. 🔢']], 'Ils se rapprochent de 60 + 90 = 150 km par heure : 300 ÷ 150 = 2.'],
      ['On place 1 000 francs à la caisse d’épargne, à 5 % par an. Combien rapportent-ils en un an ?', '50 francs', [['5 francs', 'Ce serait 0,5 %. 💯'], ['500 francs', 'Ce serait 50 %. 💯'], ['1 050 francs', 'Ça, c’est ce qu’on a en tout au bout d’un an. 🏦']], '5 % de 1 000 = 50 : l’intérêt simple.'],
      ['Un marchand achète une pièce de tissu 40 francs et la revend 52 francs. Quel est son bénéfice ?', '12 francs', [['92 francs', 'On ne les additionne pas ! ➕'], ['52 francs', 'Ça, c’est le prix de vente. 🏷️'], ['8 francs', 'Non. 🔢']], 'Bénéfice = prix de vente − prix d’achat.'],
      ['Avec ce bénéfice de 12 francs sur 40 francs d’achat, quel est le pourcentage de bénéfice ?', '30 %', [['12 %', 'Il faut comparer à 40, pas à 100. 💯'], ['52 %', 'Non. 💯'], ['40 %', 'Non. 💯']], '12 ÷ 40 = 0,30.'],
      ['Un champ rectangulaire mesure 50 m sur 40 m. Quelle est sa surface en ares ?', '20 ares', [['2 ares', 'Il manque un zéro. 🔢'], ['200 ares', 'Un zéro de trop. 🔢'], ['90 ares', 'Ça, c’est 50 + 40. ➕']], '50 × 40 = 2 000 m², et 1 are = 100 m².'],
      ['Combien de mètres de clôture faut-il pour faire le tour de ce champ de 50 m sur 40 m ?', '180 m', [['90 m', 'Il y a quatre côtés. 🔲'], ['2 000 m', 'Ça, c’est la surface en m². 🟩'], ['200 m', 'Non. 🔢']], 'Périmètre = 2 × (50 + 40).'],
      ['Une fermière vend 3 douzaines d’œufs à 50 centimes l’œuf. Combien gagne-t-elle ?', '18 francs', [['1,50 franc', 'Ce serait 3 œufs seulement. 🥚'], ['36 francs', 'Ce serait à 1 franc l’œuf. 🥚'], ['6 francs', 'Non. 🥚']], '3 × 12 = 36 œufs ; 36 × 0,50 = 18.'],
      ['Un ouvrier gagne 12 francs de l’heure et travaille 8 heures. Combien gagne-t-il dans la journée ?', '96 francs', [['20 francs', 'Ça, c’est 12 + 8. ➕'], ['86 francs', 'Recompte. 🔢'], ['120 francs', 'Ce serait en 10 heures. ⏰']], '12 × 8 = 96.'],
      ['5 ouvriers font un travail en 12 jours. Combien de jours faut-il à 10 ouvriers travaillant de la même façon ?', '6 jours', [['24 jours', 'Plus d’ouvriers vont plus vite, pas moins vite ! 👷'], ['12 jours', 'Le nombre d’ouvriers a doublé. 👷'], ['10 jours', 'Non. 🔢']], 'Deux fois plus d’ouvriers : deux fois moins de temps.'],
      ['Un père a 40 ans et son fils 10 ans. Dans combien d’années le père aura-t-il le triple de l’âge de son fils ?', 'dans 5 ans', [['dans 10 ans', 'Le père aurait 50 ans et le fils 20. 🔢'], ['dans 30 ans', 'Non. 🔢'], ['c’est déjà le cas', 'Aujourd’hui, c’est le quadruple. 🔢']], 'Dans 5 ans : 45 ans et 15 ans, et 45 = 3 × 15.'],
      ['Deux frères se partagent 60 billes ; l’aîné en a 10 de plus que le cadet. Combien en a chacun ?', '35 et 25', [['30 et 30', 'L’aîné doit en avoir 10 de plus. ⚖️'], ['40 et 20', 'L’écart serait de 20. 🔢'], ['50 et 10', 'Non. 🔢']], '60 − 10 = 50 ; 50 ÷ 2 = 25 ; 25 + 10 = 35.'],
      ['Un tonneau contient 225 litres. Combien de bouteilles de 0,75 litre peut-on remplir ?', '300', [['225', 'Une bouteille ne contient pas un litre. 🍾'], ['168', 'Non. 🔢'], ['3 000', 'Un zéro de trop. 🔢']], '225 ÷ 0,75 = 300.'],
      ['Un cycliste roule à 15 km/h pendant 40 minutes. Quelle distance parcourt-il ?', '10 km', [['15 km', 'Ce serait en une heure. 🚴'], ['6 km', 'Non. 🚴'], ['600 km', 'Un vrai Tour de France ! 🏆']], '40 minutes = deux tiers d’heure : 15 × 2 ÷ 3 = 10.'],
      ['On achète 15 mètres de tissu à 6 francs le mètre. Combien paie-t-on ?', '90 francs', [['21 francs', 'Ça, c’est 15 + 6. ➕'], ['80 francs', 'Non. 🔢'], ['96 francs', 'Non. 🔢']], '15 × 6 = 90.'],
      ['On paie 37 francs avec un billet de 50 francs. Combien rend-on ?', '13 francs', [['23 francs', 'Recompte : 37 + 13 = 50. 🔢'], ['87 francs', 'Ça, c’est 37 + 50 ! ➕'], ['17 francs', 'Non. 🔢']], 'On complète : 37 + 3 = 40, puis 40 + 10 = 50.'],
      ['Un article coûte 80 francs ; le marchand fait une remise de 10 %. Combien le paie-t-on ?', '72 francs', [['70 francs', 'La remise est de 8 francs, pas de 10. 💯'], ['88 francs', 'Ça, c’est une hausse ! 📈'], ['8 francs', 'Ça, c’est la remise elle-même. 🏷️']], '10 % de 80 = 8 ; 80 − 8 = 72.']
    ]}
  ];
  // ———— Dictées : textes du domaine public, recopiés d’éditions vérifiées ————
  const DICTEES = [
    { id:'corbeau', titre:'Le Corbeau et le Renard (début)', auteur:'Jean de La Fontaine', oeuvre:'Fables, livre I (1668)',
      texte:'Maître Corbeau, sur un arbre perché, Tenait en son bec un fromage. Maître Renard, par l’odeur alléché, Lui tint à peu près ce langage : « Et bonjour, Monsieur du Corbeau. »' },
    { id:'corbeau-fin', titre:'Le Corbeau et le Renard (fin)', auteur:'Jean de La Fontaine', oeuvre:'Fables, livre I (1668)',
      texte:'Le Renard s’en saisit, et dit : « Mon bon Monsieur, Apprenez que tout flatteur Vit aux dépens de celui qui l’écoute. Cette leçon vaut bien un fromage, sans doute. » Le Corbeau, honteux et confus, Jura, mais un peu tard, qu’on ne l’y prendrait plus.' },
    { id:'cigale', titre:'La Cigale et la Fourmi (début)', auteur:'Jean de La Fontaine', oeuvre:'Fables, livre I (1668)',
      texte:'La Cigale, ayant chanté Tout l’été, Se trouva fort dépourvue Quand la bise fut venue : Pas un seul petit morceau De mouche ou de vermisseau.' },
    { id:'loup', titre:'Le Loup et l’Agneau (début)', auteur:'Jean de La Fontaine', oeuvre:'Fables, livre I (1668)',
      texte:'La raison du plus fort est toujours la meilleure : Nous l’allons montrer tout à l’heure. Un Agneau se désaltérait Dans le courant d’une onde pure.' },
    { id:'chevre', titre:'La Chèvre de M. Seguin', auteur:'Alphonse Daudet', oeuvre:'Lettres de mon moulin (1869)',
      texte:'Ah ! Gringoire, qu’elle était jolie la petite chèvre de M. Seguin ! qu’elle était jolie avec ses yeux doux, sa barbiche de sous-officier, ses sabots noirs et luisants…' },
    { id:'demain', titre:'Demain, dès l’aube… (1re strophe)', auteur:'Victor Hugo', oeuvre:'Les Contemplations (1856)',
      texte:'Demain, dès l’aube, à l’heure où blanchit la campagne, Je partirai. Vois-tu, je sais que tu m’attends. J’irai par la forêt, j’irai par la montagne. Je ne puis demeurer loin de toi plus longtemps.' },
    { id:'demain2', titre:'Demain, dès l’aube… (2e strophe)', auteur:'Victor Hugo', oeuvre:'Les Contemplations (1856)',
      texte:'Je marcherai les yeux fixés sur mes pensées, Sans rien voir au dehors, sans entendre aucun bruit, Seul, inconnu, le dos courbé, les mains croisées, Triste, et le jour pour moi sera comme la nuit.' },
    { id:'automne', titre:'Chanson d’automne (1re strophe)', auteur:'Paul Verlaine', oeuvre:'Poèmes saturniens (1866)',
      texte:'Les sanglots longs Des violons De l’automne Blessent mon cœur D’une langueur Monotone.' }
  ];

  // ———— Repères du Certificat d’études (vérifiés, sources citées) ————
  const CERTIF = [
    'Une circulaire du ministre Victor Duruy crée le certificat d’études primaires le 20 août 1866.',
    'La loi du 28 mars 1882 (loi Jules Ferry sur l’instruction obligatoire) l’inscrit dans la loi : il est décerné après un examen public, dès l’âge de onze ans.',
    'Son nom officiel était « certificat d’études primaires élémentaires » ; tout le monde disait « le certif ».',
    'On le passait entre 11 et 13 ans jusqu’en 1936, puis à 14 ans quand la scolarité obligatoire a été allongée.',
    'Vers 1950, l’examen durait une journée entière et comptait neuf épreuves : dictée, rédaction, problèmes, calcul mental, histoire, géographie, sciences…',
    'La dictée ouvrait la journée : cinq fautes, c’était zéro, et un zéro en orthographe ou en calcul était éliminatoire.',
    'Le décret du 28 août 1989 l’a supprimé, à partir du 1er janvier 1991.'
  ];
  const SOURCES_CERTIF = [
    ['Hérodote : 20 août 1866, naissance du certificat d’études', 'https://www.herodote.net/almanach-ID-3341.php'],
    ['Tangente Éducation : le certif, un examen de la IIIe République', 'https://www.tangente-education.com/articles/tge_08_a1.pdf'],
    ['RFGénéalogie : vive le certif !', 'https://www.rfgenealogie.com/infos/vive-le-certif'],
    ['Histoire de l’éducation : quelle histoire pour le certificat d’études ?', 'https://journals.openedition.org/histoire-education/1234'],
    ['Ministère de l’Éducation nationale : décret n° 89-607 du 28 août 1989', 'https://education.gouv.fr/media/10067/download']
  ];

  // ———— Les images à collectionner (une image pour dix bons points) ————
  const IMAGES = [
    ['🚂', 'La locomotive à vapeur'], ['🗼', 'La tour Eiffel'], ['🐓', 'Le coq gaulois'], ['🌻', 'Le tournesol'], ['🦉', 'La chouette savante'],
    ['⛵', 'Le voilier de Colomb'], ['🏰', 'Le château fort'], ['🐝', 'L’abeille travailleuse'], ['🌍', 'La mappemonde'], ['🎻', 'Le violon'],
    ['🚲', 'La bicyclette'], ['🌕', 'La Lune d’Apollo 11']
  ];
  // ———— Outils ————
  const R = window.AMI_RETRO;
  const esc = s => api().esc(s);
  const melanger = a => { const t = a.slice(); for(let i = t.length - 1; i > 0; i--){ const j = Math.floor(Math.random() * (i + 1)); [t[i], t[j]] = [t[j], t[i]]; } return t; };
  const enQuestion = (e, x, i) => { const faux = x[2].map(f => ({ en:f[0], vanne:f[1] }));
    return { id:'retro:' + e.id + '#' + i, matiere:'francais', lang:'fr', consigne:'📼 ' + e.nom, enonce:x[0], bon:x[1], faux, regle:x[3],
      vanneDe:choix => { const f = faux.find(z => z.en === choix); return f ? f.vanne : 'Raté !'; } }; };
  const tirer = (id, n) => { const e = R.EPREUVES.find(x => x.id === id); return e ? melanger(e.q.map((x, i) => enQuestion(e, x, i))).slice(0, n) : []; };
  const virg = n => String(Math.round(n * 10) / 10).replace('.', ',');

  // ———— Récompenses d’époque : bons points, images, tableau d’honneur ————
  function cahier(){ const j = api().J(); if(!j.retro || typeof j.retro !== 'object') j.retro = {}; const c = j.retro;
    if(!Number.isFinite(c.bons)) c.bons = 0; if(!Array.isArray(c.images)) c.images = []; if(!c.honneur || typeof c.honneur !== 'object') c.honneur = {}; return c; }
  // Ajoute des bons points (et les images gagnées tous les dix), note la meilleure note de l’épreuve. Renvoie le petit bilan à afficher.
  function recompenser(bons, id, note20){
    const A = api(), c = cahier(), avant = Math.floor(c.bons / 10); c.bons += Math.max(0, Math.round(bons));
    const nouvelles = [];
    for(let k = avant; k < Math.floor(c.bons / 10) && c.images.length < IMAGES.length; k++){ const im = IMAGES[c.images.length]; c.images.push(im[1]); nouvelles.push(im); }
    let record = false;
    if(id && Number.isFinite(note20)){ const r = Math.round(note20 * 10) / 10; if(!(c.honneur[id] >= r)){ record = c.honneur[id] != null || r >= 10; c.honneur[id] = r; } }
    A.garder();
    return '<div class="retro-recompense"><p>🎫 +' + Math.round(bons) + ' bon' + (Math.round(bons) > 1 ? 's' : '') + ' point' + (Math.round(bons) > 1 ? 's' : '') + ' (' + c.bons + ' en tout)</p>' +
      nouvelles.map(([ic, t]) => '<p class="retro-image-gagnee">🖼️ Nouvelle image : <strong>' + ic + ' ' + esc(t) + '</strong> !</p>').join('') +
      (record ? '<p>🏅 Nouveau record au tableau d’honneur : ' + virg(c.honneur[id]) + '/20</p>' : '') + '</div>';
  }
  function resume(){ const c = cahier(); return '🎫 ' + c.bons + ' bon' + (c.bons > 1 ? 's' : '') + ' point' + (c.bons > 1 ? 's' : '') + ' · 🖼️ ' + c.images.length + '/' + IMAGES.length + ' images'; }
  const NOMS = () => Object.assign({ dictee:'✒️ La vraie dictée', certif:'📜 Le Certificat d’études', bepc:'🎓 Le Grand BEPC rétro' }, ...R.EPREUVES.map(e => ({ [e.id]:e.ic + ' ' + e.nom })));
  function pageCahier(){
    const A = api(), c = cahier(), noms = NOMS(), h = Object.keys(c.honneur).sort((a, b) => c.honneur[b] - c.honneur[a]);
    A.poser(A.barre('retro') + '<main class="coin-anglais retro-programme retro-cahier"><h2>🎫 Mes bons points et mes images</h2>' +
      '<p class="intro">Autrefois, le maître donnait un bon point pour une bonne réponse ; dix bons points s’échangeaient contre une image. Ici, chaque bonne réponse du défi rétro rapporte un bon point.</p>' +
      '<section class="retro-bloc"><h3>🎫 ' + c.bons + ' bon' + (c.bons > 1 ? 's' : '') + ' point' + (c.bons > 1 ? 's' : '') + '</h3><p>' + (c.images.length < IMAGES.length ? 'Encore ' + (10 - c.bons % 10) + ' pour la prochaine image.' : 'Tu as toute la collection ! Bravo !') + '</p></section>' +
      '<section class="retro-bloc"><h3>🖼️ Ma collection d’images</h3><div class="retro-images">' +
        IMAGES.map(([ic, t]) => c.images.includes(t) ? '<div class="retro-image"><span class="ic">' + ic + '</span><small>' + esc(t) + '</small></div>' : '<div class="retro-image cachee" aria-label="Image à gagner"><span class="ic">❔</span><small>À gagner</small></div>').join('') + '</div></section>' +
      '<section class="retro-bloc"><h3>🏅 Mon tableau d’honneur</h3>' + (h.length ? '<ul>' + h.map(id => '<li>' + esc(noms[id] || id) + ' : <strong>' + virg(c.honneur[id]) + '/20</strong></li>').join('') + '</ul>' : '<p>Passe une épreuve pour y inscrire ta meilleure note.</p>') + '</section>' +
      '<div class="actions serrees"><button class="moyen plein" data-a="retro">📼 Le défi rétro</button></div></main>');
  }

  // ———— La vraie dictée : Plumo lit, l’élève écrit, correction mot à mot ————
  // Barème du certificat d’études : la dictée est notée sur 10 ; une faute enlève 2 points (cinq fautes = zéro),
  // une erreur d’accent ou de majuscule seulement enlève 1 point. La ponctuation est montrée mais pas comptée.
  const PONCT = { ',':'virgule', '.':'point', ';':'point-virgule', ':':'deux-points', '!':'point d’exclamation', '?':'point d’interrogation', '…':'points de suspension', '«':'ouvrez les guillemets', '»':'fermez les guillemets' };
  function groupes(texte){ // découpe en groupes de mots, à la ponctuation
    const l = [], re = /[^,.;:!?…«»]+[,.;:!?…«»]*|[«»][,.;:!?…]*/g; let m;
    while((m = re.exec(texte))){ const s = m[0].trim(); if(s) l.push(s); }
    return l;
  }
  const aDire = (g, ponct) => ponct ? g.replace(/\s*([,.;:!?…«»])/g, (x, p) => ', ' + PONCT[p] + ', ').replace(/^,\s*/, '') : g.replace(/[«»]/g, '');
  const norm = s => s.replace(/[’‘`]/g, '\'').normalize('NFC');
  const mots = t => norm(t).split(/\s+/).map(m => m.replace(/^[«»"“”(\[,.;:!?…—–]+|[«»"“”)\],.;:!?…—–]+$/g, '')).filter(Boolean);
  const plat = m => m.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();
  function comparer(attendu, ecrit){
    const a = mots(attendu), b = mots(ecrit), n = a.length, m = b.length;
    const cout = (x, y) => x === y ? 0 : plat(x) === plat(y) ? 0.5 : 1;
    const D = Array.from({ length:n + 1 }, (_, i) => Array.from({ length:m + 1 }, (_, j) => i + j));
    for(let i = 1; i <= n; i++) for(let j = 1; j <= m; j++) D[i][j] = Math.min(D[i - 1][j] + 1, D[i][j - 1] + 1, D[i - 1][j - 1] + cout(a[i - 1], b[j - 1]));
    const res = []; let i = n, j = m;
    while(i > 0 || j > 0){
      if(i > 0 && j > 0 && D[i][j] === D[i - 1][j - 1] + cout(a[i - 1], b[j - 1])){ const c = cout(a[i - 1], b[j - 1]); res.push({ t:c === 0 ? 'ok' : c < 1 ? 'demi' : 'faute', a:a[i - 1], b:b[j - 1] }); i--; j--; }
      else if(i > 0 && D[i][j] === D[i - 1][j] + 1){ res.push({ t:'oubli', a:a[i - 1] }); i--; }
      else { res.push({ t:'trop', b:b[j - 1] }); j--; }
    }
    res.reverse();
    const fautes = res.filter(r => r.t === 'faute' || r.t === 'oubli' || r.t === 'trop').length, demis = res.filter(r => r.t === 'demi').length;
    return { res, fautes, demis, note:Math.max(0, 10 - 2 * fautes - demis) };
  }
  let dict = null;
  function choixDictee(){
    const A = api();
    A.poser(A.barre('retro') + '<main class="coin-anglais retro-ecran"><h2>✒️ La vraie dictée</h2>' +
      '<p class="intro">Plumo lit le texte groupe de mots par groupe de mots, en disant la ponctuation, comme le maître d’autrefois. Tu écris, puis tu corriges : barème du certificat d’études, une faute = 2 points en moins sur 10.</p>' +
      '<p class="petit">Rien n’est enregistré : seul Plumo parle.</p><div class="cartes-anglais">' +
      DICTEES.map(d => M.carte('retro-dictee-go', d.id, '✒️', esc(d.titre), esc(d.auteur + ' · ' + d.oeuvre))).join('') + '</div></main>');
  }
  function dictee(id, certif){
    const A = api(), d = DICTEES.find(x => x.id === id) || DICTEES[Math.floor(Math.random() * DICTEES.length)];
    dict = { d, g:groupes(d.texte), i:0, ponct:true, certif:!!certif };
    A.poser(A.barre(certif ? 'retro' : 'retro-dictee') + '<main class="coin-anglais retro-dictee">' +
      '<h2>' + (certif ? '📜 Certificat d’études · 1re épreuve : la dictée' : '✒️ La vraie dictée') + '</h2>' +
      '<p class="intro"><strong>' + esc(d.titre) + '</strong> — ' + esc(d.auteur) + '</p>' +
      '<p class="petit">' + (/Fontaine|Hugo|Verlaine/.test(d.auteur) ? 'C’est un poème : chaque vers commence par une majuscule. Écris à la suite, sans revenir à la ligne.' : 'Écris à la suite, en respectant la ponctuation.') + '</p>' +
      '<div class="actions serrees">' +
        '<button class="moyen plein" data-a="retro-dictee-lire" data-v="suivant">▶ Groupe suivant</button>' +
        '<button class="moyen" data-a="retro-dictee-lire" data-v="relire">🔁 Relire ce groupe</button>' +
        '<button class="moyen" data-a="retro-dictee-lire" data-v="tout">🔊 Tout le texte</button>' +
        '<button class="petit-bouton" data-a="retro-dictee-ponct" aria-pressed="true">🔤 Ponctuation dite : oui</button></div>' +
      '<p id="dictee-etat" class="petit" role="status" aria-live="polite">Groupe 0 sur ' + dict.g.length + '</p>' +
      '<label for="dictee-copie" class="petit">Ta copie :</label>' +
      '<textarea id="dictee-copie" class="dictee-copie" rows="6" autocomplete="off" autocapitalize="sentences" spellcheck="false" lang="fr"></textarea>' +
      '<div class="actions serrees"><button class="moyen plein" data-a="retro-dictee-corriger">✅ Je rends ma copie</button></div>' +
      (('speechSynthesis' in window) || typeof window.speak === 'function' ? '' : '<p class="petit">Cet appareil ne sait pas lire à voix haute : demande à un adulte de dicter, avec le texte caché ci-dessous.</p>') +
      '<details class="petit"><summary>👀 Pour l’adulte qui dicte (ne pas regarder si tu écris !)</summary><p>' + esc(d.texte) + '</p></details></main>');
  }
  function lire(v){
    if(!dict) return; const g = dict.g;
    let t = '';
    if(v === 'tout') t = g.map(x => aDire(x, false)).join(' ');
    else { if(v === 'suivant' && dict.i < g.length) dict.i++; const k = Math.max(1, dict.i); t = aDire(g[k - 1], dict.ponct); }
    const e = document.getElementById('dictee-etat'); if(e) e.textContent = 'Groupe ' + dict.i + ' sur ' + g.length + (dict.i >= g.length ? ' · c’est fini : relis ta copie !' : '');
    try{ if(typeof window.speak === 'function') window.speak(t, 'fr'); }catch(x){}
  }
  function corriger(){
    const A = api(); if(!dict) return choixDictee();
    const el = document.getElementById('dictee-copie'), copie = el ? el.value : '';
    const c = comparer(dict.d.texte, copie), d = dict.d, certif = dict.certif;
    const mot = r => r.t === 'ok' ? '<span class="d-ok">' + esc(r.a) + '</span>' : r.t === 'demi' ? '<span class="d-demi" title="accent ou majuscule">' + esc(r.a) + ' <s>' + esc(r.b) + '</s></span>' :
      r.t === 'faute' ? '<span class="d-faute">' + esc(r.a) + ' <s>' + esc(r.b) + '</s></span>' : r.t === 'oubli' ? '<span class="d-oubli" title="mot oublié">' + esc(r.a) + '</span>' : '<span class="d-trop" title="mot en trop"><s>' + esc(r.b) + '</s></span>';
    const bilan = c.fautes + c.demis === 0 ? 'Zéro faute : le maître t’aurait donné une image !' : c.note === 0 ? 'Cinq fautes ou plus : au certificat, c’était zéro… mais chaque dictée te fait progresser.' : c.note >= 8 ? 'Très belle dictée !' : 'Regarde bien les mots en couleur : ce sont eux qu’il faut retenir.';
    const recomp = certif ? '' : recompenser(c.note, 'dictee', c.note * 2);
    if(certif){ certifEtat.dictee = c.note; }
    A.bruit && A.bruit('fin');
    A.poser(A.barre(certif ? 'retro' : 'retro-dictee') + '<main class="coin-anglais retro-dictee retro-fin"><h2>✒️ Correction</h2>' +
      '<p class="gros-score">' + c.note + '/10</p><p><strong>' + c.fautes + ' faute' + (c.fautes > 1 ? 's' : '') + (c.demis ? ' et ' + c.demis + ' erreur' + (c.demis > 1 ? 's' : '') + ' d’accent ou de majuscule' : '') + '</strong></p><p>' + esc(bilan) + '</p>' +
      '<div class="dictee-correction" lang="fr">' + c.res.map(mot).join(' ') + '</div>' +
      '<p class="petit">🟢 juste · 🟠 accent ou majuscule (1 point) · 🔴 faute (2 points) · mot souligné : oublié · mot barré seul : en trop. La ponctuation n’est pas comptée.</p>' +
      '<details class="petit"><summary>📖 Le texte exact</summary><p>' + esc(d.texte) + '</p><p>' + esc(d.auteur + ', ' + d.oeuvre) + '</p></details>' + recomp +
      '<div class="actions serrees">' + (certif ? '<button class="moyen plein" data-a="retro-certif-suite">' + (c.note === 0 ? '📜 Voir le résultat' : '📜 Continuer le certificat') + '</button>' :
        '<button class="moyen plein" data-a="retro-dictee-go" data-v="">🎲 Une autre dictée</button><button class="moyen" data-a="retro-dictee-go" data-v="' + d.id + '">🔁 Refaire celle-ci</button><button class="moyen" data-a="retro">📼 Le défi rétro</button>') + '</div></main>');
  }

  // ———— Le Certificat d’études : la dictée, puis 20 questions ————
  let certifEtat = {};
  function certif(){ certifEtat = { dictee:null }; dictee(null, true); }
  function certifSuite(){
    const A = api(); if(certifEtat.dictee === 0) return certifFin(null);
    const liste = melanger([].concat(tirer('dictee', 3), tirer('analyse', 2), tirer('calcul', 4), tirer('problemes', 4), tirer('histoire', 3), tirer('geo', 2), tirer('choses', 2)));
    A.questionsGo(liste, { titre:'📜 Certificat d’études', retour:'retro', sujet:'sciences', fin:z => certifFin(z) });
  }
  function certifFin(z){
    const A = api(), dic = certifEtat.dictee || 0, qcm = z ? Math.round(z.bonnes / z.liste.length * 100) / 10 : 0, total = Math.round((dic + qcm) * 10) / 10;
    const recu = dic > 0 && total >= 10;
    const recomp = recompenser((z ? z.bonnes : 0) + dic, 'certif', total);
    A.poser(A.barre('retro') + '<main class="centre retro-fin"><div class="ami-moyen">' + A.ami(recu ? 'fete' : 'mdr') + '</div><h2>📜 Ton certificat d’études</h2>' +
      '<p class="gros-score">' + virg(total) + '/20</p><p>✒️ Dictée : ' + dic + '/10 · 🧮 Questions : ' + (z ? virg(qcm) + '/10' : 'non passées') + '</p>' +
      '<p><strong>' + (recu ? '🎉 Reçu au certificat d’études ! Autrefois, on l’annonçait fièrement à toute la famille.' : dic === 0 ? 'Zéro à la dictée : autrefois, c’était éliminatoire. On s’entraîne et on retente ?' : 'Ajourné… on retente l’an prochain ? Ou tout de suite !') + '</strong></p>' + recomp +
      '<div class="actions serrees"><button class="moyen plein" data-a="retro-certif">🔁 Repasser le certificat</button><button class="moyen" data-a="retro-certif-page">📜 Le certif, c’était quoi ?</button><button class="moyen" data-a="retro">📼 Le défi rétro</button></div></main>');
  }
  function certifPage(){
    const A = api();
    A.poser(A.barre('retro') + '<main class="coin-anglais retro-programme"><h2>📜 Le certificat d’études</h2>' +
      '<p class="intro">L’examen qui a marqué des générations de grands-parents, de 1866 à 1989.</p>' +
      '<section class="retro-bloc"><h3>📅 Les repères</h3><ul>' + CERTIF.map(x => '<li>' + esc(x) + '</li>').join('') + '</ul></section>' +
      '<section class="retro-bloc"><h3>🎮 Ici, dans le défi rétro</h3><ul><li>Une vraie dictée notée sur 10, avec le barème d’autrefois.</li><li>Puis 20 questions : orthographe, grammaire, calcul, problèmes, histoire, géographie et sciences, notées sur 10.</li><li>Reçu avec 10/20, à condition de ne pas avoir zéro à la dictée.</li></ul><p class="petit">C’est un jeu inspiré de l’examen : ce ne sont pas de vrais sujets.</p></section>' +
      '<section class="retro-bloc retro-sources"><h3>📚 Sources</h3><ul>' + SOURCES_CERTIF.map(([t, u]) => '<li><a href="' + esc(u) + '" target="_blank" rel="noopener">' + esc(t) + '</a></li>').join('') + '</ul></section>' +
      '<div class="actions serrees"><button class="moyen plein" data-a="retro-certif">📜 Passer le certificat</button><button class="moyen" data-a="retro">📼 Le défi rétro</button></div></main>');
  }

  // ———— Le duel des générations : les mêmes 10 questions pour deux joueurs ————
  let duel = null;
  function duelAccueil(){
    const A = api();
    A.poser(A.barre('retro') + '<main class="coin-anglais retro-ecran retro-duel"><h2>⚔️ Le duel des générations</h2>' +
      '<p class="intro">Un enfant contre un parent ou un grand-parent : les mêmes dix questions, chacun son tour. Qui aurait eu le meilleur bulletin en 1978 ?</p>' +
      '<p><label>Joueur 1 <input id="duel-n1" type="text" maxlength="20" value="Moi" autocomplete="off"></label></p>' +
      '<p><label>Joueur 2 <input id="duel-n2" type="text" maxlength="20" value="Papi ou Mamie" autocomplete="off"></label></p>' +
      '<p class="petit">Les prénoms restent sur cet écran : ils ne sont pas enregistrés.</p><div class="cartes-anglais">' +
      M.carte('retro-duel-go', 'melange', '🎲', 'Le grand mélange', 'Un peu de tout') +
      R.EPREUVES.map(e => M.carte('retro-duel-go', e.id, e.ic, esc(e.nom), esc(e.sous))).join('') + '</div></main>');
  }
  function duelGo(v){
    const n1 = (document.getElementById('duel-n1') || {}).value, n2 = (document.getElementById('duel-n2') || {}).value;
    const liste = v === 'melange' ? melanger([].concat(...R.EPREUVES.map(e => tirer(e.id, 2)))).slice(0, 10) : tirer(v, 10);
    if(!liste.length) return duelAccueil();
    duel = { noms:[(n1 || '').trim().slice(0, 20) || 'Joueur 1', (n2 || '').trim().slice(0, 20) || 'Joueur 2'], liste, scores:[], i:0 };
    duelTour();
  }
  function duelTour(){
    const A = api(), d = duel; if(!d) return duelAccueil();
    if(d.i >= 2) return duelFin();
    A.poser(A.barre('retro') + '<main class="centre retro-duel"><h2>⚔️ Au tour de ' + esc(d.noms[d.i]) + '</h2>' +
      (d.i === 1 ? '<p>' + esc(d.noms[0]) + ' a fini. Passe la tablette à ' + esc(d.noms[1]) + ' — et on ne souffle pas les réponses !</p>' : '<p>Dix questions, sans aide. ' + esc(d.noms[1]) + ' ne regarde pas !</p>') +
      '<div class="actions serrees"><button class="moyen plein" data-a="retro-duel-joue">▶ C’est parti</button></div></main>');
  }
  function duelJoue(){
    const A = api(), d = duel; if(!d) return duelAccueil();
    const copie = d.liste.map(q => Object.assign({}, q));
    A.questionsGo(copie, { titre:'⚔️ ' + d.noms[d.i], retour:'retro-duel', sujet:'sciences', fin:z => { d.scores[d.i] = z.bonnes; d.i++; duelTour(); } });
  }
  function duelFin(){
    const A = api(), d = duel, [a, b] = d.scores, n = d.liste.length;
    const gagnant = a === b ? 'Égalité parfaite : les générations se tiennent la main !' : (a > b ? d.noms[0] : d.noms[1]) + ' remporte le duel !';
    const recomp = recompenser(a, null, null);
    A.poser(A.barre('retro') + '<main class="centre retro-fin retro-duel"><div class="ami-moyen">' + A.ami('fete') + '</div><h2>⚔️ ' + esc(gagnant) + '</h2>' +
      '<div class="duel-scores"><p><strong>' + esc(d.noms[0]) + '</strong> : ' + a + '/' + n + '</p><p><strong>' + esc(d.noms[1]) + '</strong> : ' + b + '/' + n + '</p></div>' +
      '<p class="petit">Les bons points vont au joueur de ce profil (' + esc(d.noms[0]) + ').</p>' + recomp +
      '<div class="actions serrees"><button class="moyen plein" data-a="retro-duel">🔁 Revanche</button><button class="moyen" data-a="retro">📼 Le défi rétro</button></div></main>');
  }

  // ———— Branchements ————
  for(const [id, l] of Object.entries(PLUS)){ const e = R.EPREUVES.find(x => x.id === id); if(e) e.q.push(...l); }
  R.EPREUVES.push(...NOUVELLES);
  window.AMI_RETRO_PLUS = true;
  Object.assign(R, { DICTEES, CERTIF, SOURCES_CERTIF, IMAGES, comparer, groupes, recompenser, resume, cahier });
  Object.assign(M.actions, {
    'retro-dictee':() => choixDictee(),
    'retro-dictee-go':v => dictee(v || null, false),
    'retro-dictee-lire':v => lire(v),
    'retro-dictee-ponct':() => { if(!dict) return; dict.ponct = !dict.ponct; const b = document.querySelector('[data-a="retro-dictee-ponct"]'); if(b){ b.setAttribute('aria-pressed', String(dict.ponct)); b.textContent = '🔤 Ponctuation dite : ' + (dict.ponct ? 'oui' : 'non'); } },
    'retro-dictee-corriger':() => corriger(),
    'retro-certif':() => certif(),
    'retro-certif-suite':() => certifSuite(),
    'retro-certif-page':() => certifPage(),
    'retro-duel':() => duelAccueil(),
    'retro-duel-go':v => duelGo(v),
    'retro-duel-joue':() => duelJoue(),
    'retro-cahier':() => pageCahier()
  });
})();
