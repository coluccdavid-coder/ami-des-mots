// Ami des mots — v6.47 : « 📼 Le défi rétro » — pour le fun, cinq épreuves « comme dans les années 70 »
// (dictée d'autrefois, analyse logique, maths modernes, calcul et mesures, géographie par cœur), un « Grand BEPC rétro »
// noté sur 20 avec mention, et une page « Le programme des années 70 » (repères vérifiés, sources citées).
// En français seulement (l'école française de l'époque) : la carte n'apparaît pas dans les autres langues.
// Les questions sont INSPIRÉES des programmes de l'époque : ce ne sont pas de vrais sujets d'examen.
// Format : [question, bonne, [[mauvaise, vanne]×3], règle].
(function(){
  'use strict';
  const M = window.AMI_MODULES; if(!M) return;
  const api = () => M.api;

  const EPREUVES = [
    { id:'dictee', ic:'✒️', nom:'Dictée et orthographe d’autrefois', sous:'Imparfait du subjonctif, pluriels pièges, accords à l’ancienne', q:[
      ['Complète à l’imparfait du subjonctif : « Il fallait que nous … (aller). »', 'allassions', [['allions', 'Ça, c’est l’imparfait de l’indicatif : trop facile pour 1975 ! 🎩'], ['allâmes', 'Passé simple : on était presque au bal, mais pas tout à fait. 💃'], ['aillons', 'Subjonctif présent : l’instit aurait froncé les sourcils. 🧐']], 'Imparfait du subjonctif : que j’allasse, que nous allassions, qu’ils allassent.'],
      ['Complète à l’imparfait du subjonctif : « Je voulais qu’il … (venir). »', 'vînt', [['vint', 'Sans accent, c’est le passé simple : le circonflexe fait toute la différence ! 🎩'], ['vienne', 'Subjonctif présent : on parle comme en 2026. 📱'], ['venait', 'Imparfait de l’indicatif : raté pour le subjonctif. 🙃']], 'À la 3e personne du singulier, l’imparfait du subjonctif prend un accent circonflexe : qu’il vînt, qu’il fût, qu’il eût.'],
      ['Complète à l’imparfait du subjonctif : « Bien qu’elle … (être) fatiguée… »', 'fût', [['fut', 'Passé simple : il manque le petit chapeau. 🎩'], ['soit', 'Subjonctif présent : correct aujourd’hui, mais pas à l’imparfait. ⏳'], ['était', '« Bien que » exige le subjonctif. 📏']], '« Bien que » est toujours suivi du subjonctif.'],
      ['Quel est le pluriel de « un chou-fleur » ?', 'des choux-fleurs', [['des chou-fleurs', 'Le chou aussi se multiplie ! 🥦'], ['des choux-fleur', 'Il y a plusieurs fleurs aussi. 🌼'], ['des chous-fleurs', '« Chou » fait partie des sept mots en -ou qui prennent un x. ✖️']], 'Nom + nom : les deux s’accordent. Bijou, caillou, chou, genou, hibou, joujou, pou prennent un x.'],
      ['Quel est le pluriel de « un timbre-poste » ?', 'des timbres-poste', [['des timbres-postes', 'Ce sont des timbres pour LA poste : « poste » ne bouge pas. 📮'], ['des timbre-postes', 'C’est le timbre qui se multiplie. 📬'], ['des timbre-poste', 'Il faut quand même un s à « timbres ». ✉️']], 'Timbre-poste = timbre pour la poste : seul « timbre » prend la marque du pluriel.'],
      ['Quel est le pluriel de « un œil-de-bœuf » (une petite fenêtre ronde) ?', 'des œils-de-bœuf', [['des yeux-de-bœuf', 'Pour la fenêtre, on garde « œils » : piège de champion ! 👁️'], ['des œil-de-bœufs', 'Le bœuf reste seul. 🐂'], ['des yeux-de-bœufs', 'Double raté, mais joli effort. 🙈']], 'Dans les noms composés désignant des objets (œil-de-bœuf, œil-de-perdrix), on écrit « œils ».'],
      ['Quel est le pluriel de « un bail » ?', 'des baux', [['des bails', 'Raté : comme le travail, le bail devient « -aux ». 🏠'], ['des bailles', 'Une baille, c’est un baquet ! 🪣'], ['des bauls', 'Ce mot n’existe pas. 🤷']], 'Bail, corail, émail, soupirail, travail, vantail, vitrail font leur pluriel en -aux.'],
      ['Complète : « Les efforts qu’il a … pour réussir. »', 'fallu', [['fallus', 'Le participe d’un verbe impersonnel ne s’accorde jamais. 🔒'], ['fallue', 'Toujours invariable. 🔒'], ['fallues', 'Invariable, même avec des efforts ! 💪']], '« Il a fallu » : verbe impersonnel, participe passé invariable.'],
      ['Complète : « … riches qu’ils soient, ils restent modestes. » (= si riches)', 'Quelque', [['Quelques', 'Devant un adjectif, « quelque » veut dire « si » : il reste invariable. 📏'], ['Quel que', 'Celui-là va devant le verbe être. 🔁'], ['Quels que', 'Il en faudrait un verbe juste après. 🔁']], 'Quelque + adjectif + que = « si … que » : quelque est alors un adverbe, invariable.'],
      ['Complète : « … soient vos raisons, venez. »', 'Quelles que', [['Quelque', 'Devant le verbe être, on écrit en deux mots. ✂️'], ['Quel que', 'Il s’accorde avec « raisons » : féminin pluriel. 👯'], ['Quelques', 'Celui-là s’accorde avec un nom, pas devant un verbe. 🔁']], 'Quel que + être : « quel » s’accorde avec le sujet (quelles que soient vos raisons).'],
      ['Complète : « Les rois se sont … sur le trône. » (succéder)', 'succédé', [['succédés', 'On succède À quelqu’un : « se » est complément indirect, pas d’accord. 🔒'], ['succédées', 'Toujours invariable ici. 🔒'], ['succéder', 'Il faut le participe passé. ⏳']], 'Se succéder, se parler, se nuire, se plaire : le participe reste invariable.'],
      ['Dans l’orthographe d’avant la réforme de 1990, comment écrit-on : « il … (paraître) » ?', 'paraît', [['parait', 'Accepté depuis 1990, mais l’instit de 1975 aurait mis une faute ! 📕'], ['parraît', 'Un seul r, malheureux ! ✏️'], ['paraie', 'Ce n’est pas une forme de ce verbe. 🙃']], 'Autrefois, le i prenait un accent circonflexe devant un t : il paraît, il connaît.'],
      ['Comment écrivait-on toujours ce légume avant les rectifications de 1990 ?', 'oignon', [['ognon', 'C’est l’orthographe proposée en 1990 : trop moderne pour le BEPC ! 🧅'], ['onion', 'Ça, c’est de l’anglais ! 🇬🇧'], ['oignion', 'Un i de trop : ça pique les yeux. 😭']], 'On prononce « o-gnon », mais l’orthographe traditionnelle garde le i.'],
      ['Complète : « Ils se sont … des cadeaux. » (offrir)', 'offert', [['offerts', 'Le complément d’objet direct (« des cadeaux ») est placé après : pas d’accord. 🎁'], ['offertes', 'Pas d’accord ici. 🎁'], ['offrir', 'Il faut le participe passé. ⏳']], 'Verbe pronominal + COD placé après : le participe ne s’accorde pas.'],
      ['Comment écrit-on 80 en lettres ?', 'quatre-vingts', [['quatre-vingt', 'Il manque le s : « vingt » multiplié et non suivi d’un autre nombre prend un s. ✖️'], ['quatres-vingts', '« Quatre » reste invariable. 4️⃣'], ['quatre vingt', 'Il faut le trait d’union… et le s ! ➖']], 'Vingt et cent prennent un s quand ils sont multipliés et terminent le nombre : quatre-vingts, trois cents.'],
      ['Comment écrit-on 302 en lettres (orthographe traditionnelle) ?', 'trois cent deux', [['trois cents deux', '« Cent » suivi d’un autre nombre ne prend pas de s. ✖️'], ['trois-cent-deux', 'Tout avec des traits d’union : c’est l’orthographe de 1990. 📏'], ['trois cent deuxs', '« Deux » est invariable. 2️⃣']], 'Traditionnellement, pas de trait d’union entre cent et le nombre qui suit.'],
      ['Choisis l’orthographe correcte :', 'un abri', [['un abrit', 'Pas de t, même si l’on dit « abriter ». 🏚️'], ['un abbri', 'Un seul b suffit. ✏️'], ['un abris', 'Au singulier, pas de s. ☂️']], 'Abri, mais abriter : le mot de la même famille ne dit pas toujours la lettre finale.'],
      ['Complète : « des robes … » (bleu clair)', 'bleu clair', [['bleues claires', 'Couleur composée de deux mots : tout reste invariable. 🎨'], ['bleus clairs', 'Toujours invariable. 🎨'], ['bleue claire', 'Il y a plusieurs robes… et ça reste invariable de toute façon. 👗']], 'Les adjectifs de couleur composés restent invariables : des yeux bleu-vert, des robes bleu clair.'],
      ['Complète au passé simple : « Ils … (venir) hier. »', 'vinrent', [['venirent', 'Venir est un verbe irrégulier : son passé simple est en « vin-». 🎩'], ['vinrèrent', 'Ce n’est pas un verbe du 1er groupe. 🙃'], ['vènent', 'Ce n’est pas un temps du passé. ⏳']], 'Passé simple de venir : je vins, tu vins, il vint, nous vînmes, vous vîntes, ils vinrent.'],
      ['Complète au passé simple : « Hier, nous … (résoudre) le problème. »', 'résolûmes', [['résolvîmes', 'Le passé simple de « résoudre » se fait en « résolu- ». 🔧'], ['résoudîmes', 'Ce n’est pas la bonne base. 🔧'], ['résolumes', 'Il manque l’accent circonflexe de « nous ». 🎩']], 'Au passé simple, nous et vous prennent un accent circonflexe : nous résolûmes, vous résolûtes.']
    ]},
    { id:'analyse', ic:'🔎', nom:'Analyse logique et grammaticale', sous:'Propositions, compléments et termes d’autrefois', q:[
      ['« Il donne un livre à son frère. » Comment les grammaires d’autrefois appelaient-elles « à son frère » ?', 'complément d’attribution', [['complément de lieu', 'Le frère n’est pas un endroit ! 🗺️'], ['complément d’objet direct', 'Il y a une préposition : ce n’est pas un COD. 🔗'], ['attribut du sujet', 'Il n’y a pas de verbe d’état. 🧩']], 'Aujourd’hui, on parle de complément d’objet second (ou indirect).'],
      ['Que fait-on dans une « analyse logique » ?', 'on découpe la phrase en propositions et on donne leur nature et leur fonction', [['on donne la nature de chaque mot', 'Ça, c’est l’analyse grammaticale. 🔤'], ['on cherche la morale du texte', 'Ça, c’est l’explication de texte. 📖'], ['on compte les syllabes', 'Ça, c’est la poésie. 🎶']], 'Analyse grammaticale = mot par mot ; analyse logique = proposition par proposition.'],
      ['Combien de propositions dans « Je pense que tu viendras quand il fera beau » ?', 'trois', [['une', 'Compte les verbes conjugués. 🔢'], ['deux', 'Il y en a une de plus. 🔢'], ['quatre', 'Un de trop. 🔢']], 'Une proposition par verbe conjugué : pense, viendras, fera.'],
      ['Dans « Je pense que tu viendras », quelle est la nature de « que tu viendras » ?', 'une proposition subordonnée conjonctive', [['une proposition subordonnée relative', 'Ce « que » ne remplace aucun nom. 🔄'], ['une proposition principale', 'C’est « je pense » la principale. 👑'], ['une proposition indépendante', 'Elle dépend de « je pense ». 🔗']], 'Introduite par la conjonction « que », elle est complément d’objet du verbe « pense ».'],
      ['Dans « Viens quand il fera beau », quelle est la nature de « quand il fera beau » ?', 'une subordonnée circonstancielle de temps', [['une subordonnée relative', 'Pas d’antécédent ici. 🔄'], ['une principale', 'La principale, c’est « Viens ». 👑'], ['une subordonnée de cause', 'Elle dit quand, pas pourquoi. ⏰']], 'Les circonstancielles disent le temps, la cause, le but, la conséquence, la condition…'],
      ['Dans « L’homme que j’ai vu est parti », quelle est la nature de « que j’ai vu » ?', 'une proposition subordonnée relative', [['une subordonnée conjonctive', 'Ici « que » reprend « l’homme ». 🔄'], ['une principale', 'Non. 👑'], ['une indépendante', 'Elle dépend du nom « homme ». 🔗']], 'La relative complète un nom, son antécédent.'],
      ['Dans « L’homme que j’ai vu », quelle est la fonction du pronom « que » ?', 'complément d’objet direct de « ai vu »', [['sujet de « ai vu »', 'Le sujet, c’est « j’ ». 👤'], ['conjonction de subordination', 'Ici, c’est un pronom relatif. 🔄'], ['complément d’attribution', 'Pas de préposition à. 🔗']], 'J’ai vu qui ? L’homme, repris par « que ».'],
      ['Analyse grammaticale de « le » dans « Je le vois » :', 'pronom personnel, complément d’objet direct de « vois »', [['article défini', 'Il n’accompagne aucun nom. 🏷️'], ['adjectif possessif', 'Non. 🏷️'], ['pronom personnel sujet', 'Le sujet, c’est « je ». 👤']], 'Devant un verbe, « le, la, les » sont des pronoms.'],
      ['Analyse grammaticale de « le » dans « le chien » :', 'article défini', [['pronom personnel', 'Il accompagne un nom : c’est un article. 🐕'], ['adjectif démonstratif', 'Ce serait « ce chien ». 👉'], ['préposition', 'Non. 🔗']], 'Articles définis : le, la, les, l’.'],
      ['Dans « Pierre est malade », quelle est la fonction de « malade » ?', 'attribut du sujet', [['complément d’objet direct', 'Après « être », ce n’est pas un COD. 🧩'], ['épithète', 'Il y a un verbe d’état entre les deux. 🧩'], ['complément circonstanciel', 'Non. ⏰']], 'Après un verbe d’état (être, paraître, sembler…), on trouve l’attribut.'],
      ['Comment appelle-t-on une phrase qui ne contient qu’un seul verbe conjugué ?', 'une proposition indépendante', [['une proposition principale', 'Une principale a au moins une subordonnée. 👑'], ['une proposition subordonnée', 'Elle ne dépend de rien. 🔗'], ['une phrase nominale', 'Une phrase nominale n’a pas de verbe. 🚫']], 'Une seule proposition, qui ne dépend d’aucune autre.'],
      ['Dans « Il pleut », quelle est la fonction de « il » ?', 'sujet apparent (verbe impersonnel)', [['sujet réel', 'Il ne désigne personne. 👻'], ['complément d’objet direct', 'Non. 🔤'], ['attribut', 'Non. 🧩']], 'Avec un verbe impersonnel, « il » est un sujet apparent.'],
      ['Dans « Il est arrivé un malheur », quelle est la fonction de « un malheur » ?', 'sujet réel', [['complément d’objet direct', '« Arriver » n’a pas de COD. 🚪'], ['sujet apparent', 'Le sujet apparent, c’est « il ». 👻'], ['attribut du sujet', 'Non. 🧩']], 'On peut dire : « Un malheur est arrivé ».'],
      ['Dans « Paris, capitale de la France, est très peuplée », quelle est la fonction de « capitale de la France » ?', 'apposition au nom « Paris »', [['complément d’objet direct', 'Il n’y a pas de verbe d’action. 🔤'], ['sujet', 'Le sujet, c’est « Paris ». 🗼'], ['complément circonstanciel de lieu', 'Elle ne dit pas où. 📍']], 'L’apposition, souvent entre virgules, précise le nom.'],
      ['Dans « Le chat est poursuivi par le chien », quelle est la fonction de « par le chien » ?', 'complément d’agent', [['complément de lieu', 'Il ne dit pas où. 📍'], ['complément d’objet indirect', 'Il fait l’action dans une phrase passive. 🐕'], ['sujet', 'Le sujet grammatical, c’est « le chat ». 🐈']], 'À la voix passive, celui qui fait l’action est complément d’agent.'],
      ['« Qu’il vienne ! » : à quel mode est le verbe ?', 'au subjonctif', [['à l’indicatif', 'L’indicatif serait « il vient ». 📏'], ['à l’impératif', 'L’impératif n’a pas de 3e personne. 📢'], ['au conditionnel', 'Ce serait « il viendrait ». 🤔']], 'Le subjonctif exprime ici un ordre ou un souhait à la 3e personne.'],
      ['« En marchant, il chantait » : comment s’appelle la forme « en marchant » ?', 'le gérondif', [['l’infinitif', 'Ce serait « marcher ». ➡️'], ['le participe passé', 'Ce serait « marché ». ⏳'], ['le subjonctif', 'Non. 📏']], 'Gérondif = « en » + participe présent.'],
      ['« La lettre a été écrite par Marie » : à quelle voix est le verbe ?', 'à la voix passive', [['à la voix active', 'À l’actif : « Marie a écrit la lettre ». 🔁'], ['à la voix pronominale', 'Pas de « se ». 🪞'], ['au mode impératif', 'Non. 📢']], 'Voix passive : être + participe passé, et souvent un complément d’agent.'],
      ['Dans la grammaire traditionnelle, comment appelait-on « mon » dans « mon livre » ?', 'un adjectif possessif', [['un pronom possessif', 'Le pronom serait « le mien ». 🔄'], ['un article', 'Les articles sont le, la, les, un… 🏷️'], ['un adverbe', 'Non. 🔤']], 'Aujourd’hui, on dit plutôt « déterminant possessif ».'],
      ['À quel groupe appartient le verbe « courir » ?', 'au 3e groupe', [['au 1er groupe', 'Le 1er groupe, ce sont les verbes en -er (sauf aller). 1️⃣'], ['au 2e groupe', 'Le 2e groupe se conjugue comme finir : nous finissons. 2️⃣'], ['à aucun groupe', 'Tous les verbes ont un groupe. 🔢']], '3e groupe : tous les autres verbes (courir, prendre, voir, aller…).']
    ]},
    { id:'mathsmod', ic:'🧮', nom:'Maths modernes', sous:'Ensembles, intersections, bases de numération', q:[
      ['A = {1 ; 2 ; 3} et B = {2 ; 3 ; 4}. Que vaut A ∩ B (A inter B) ?', '{2 ; 3}', [['{1 ; 2 ; 3 ; 4}', 'Ça, c’est la réunion ! 🔗'], ['{1 ; 4}', 'Ce sont les éléments qui ne sont pas en commun. 🙃'], ['∅', 'Elles ont pourtant des éléments en commun. 🔍']], 'L’intersection contient les éléments qui sont à la fois dans A et dans B.'],
      ['A = {1 ; 2 ; 3} et B = {2 ; 3 ; 4}. Que vaut A ∪ B (A union B) ?', '{1 ; 2 ; 3 ; 4}', [['{2 ; 3}', 'Ça, c’est l’intersection ! ✂️'], ['{1 ; 2 ; 2 ; 3 ; 3 ; 4}', 'Dans un ensemble, on n’écrit pas deux fois le même élément. 🧹'], ['{1 ; 4}', 'Il manque les éléments communs. 🔍']], 'La réunion contient tous les éléments de A et de B.'],
      ['Quel symbole signifie « appartient à » ?', '∈', [['⊂', 'Lui veut dire « est inclus dans ». 📦'], ['∩', 'Lui, c’est « inter ». ✂️'], ['∪', 'Lui, c’est « union ». 🔗']], '3 ∈ {1 ; 2 ; 3} se lit « 3 appartient à l’ensemble ».'],
      ['Comment note-t-on l’ensemble vide ?', '∅', [['0', 'Zéro est un nombre, pas un ensemble. 0️⃣'], ['{0}', 'Cet ensemble contient un élément : 0 ! 📦'], ['∞', 'C’est l’infini. ♾️']], 'L’ensemble vide ne contient aucun élément.'],
      ['Combien d’éléments compte l’ensemble {a ; b ; c ; d} ?', '4', [['3', 'Recompte les lettres. 🔢'], ['5', 'Les accolades ne comptent pas ! 🙃'], ['1', 'C’est un ensemble de plusieurs éléments. 📦']], 'Le nombre d’éléments s’appelle le cardinal de l’ensemble.'],
      ['Comment écrit-on cinq en base deux ?', '101', [['5', 'En base deux, il n’y a que les chiffres 0 et 1. 🔢'], ['110', 'Ça, c’est six. 🔢'], ['111', 'Ça, c’est sept. 🔢']], '5 = 1 × 4 + 0 × 2 + 1 × 1.'],
      ['Que vaut 1011 (écrit en base deux) en base dix ?', '11', [['1011', 'Il faut le convertir ! 🔄'], ['13', 'Recompte : 8 + 0 + 2 + 1. 🔢'], ['9', 'Il manque le 2. 🔢']], '1 × 8 + 0 × 4 + 1 × 2 + 1 × 1 = 11.'],
      ['Comment écrit-on sept en base cinq ?', '12', [['7', 'En base cinq, le chiffre 7 n’existe pas. 🖐️'], ['21', 'Ça vaudrait 2 × 5 + 1 = 11. 🔄'], ['111', 'Ce serait de la base deux. 🔢']], '7 = 1 paquet de cinq + 2 unités : on écrit 12.'],
      ['Quels chiffres utilise-t-on en base cinq ?', '0, 1, 2, 3 et 4', [['1, 2, 3, 4 et 5', 'Le 5 forme déjà un paquet. 🖐️'], ['0 et 1', 'Ça, c’est la base deux. 🔢'], ['0 à 9', 'Ça, c’est la base dix. 🔟']], 'En base b, on utilise les chiffres de 0 à b − 1.'],
      ['Que signifie A ⊂ B ?', 'tout élément de A est aussi un élément de B', [['A et B n’ont rien en commun', 'Ce serait A ∩ B = ∅. 🚫'], ['B est inclus dans A', 'C’est l’inverse. 🔁'], ['A et B ont le même nombre d’éléments', 'Pas forcément. 🔢']], 'A ⊂ B se lit « A est inclus dans B ».'],
      ['À quoi sert un diagramme de Venn ?', 'à représenter des ensembles et leurs intersections avec des patates', [['à tracer des courbes', 'Ça, c’est un graphique. 📈'], ['à poser une division', 'Non. ➗'], ['à mesurer des angles', 'Ça, c’est le rapporteur. 📐']], 'Les fameuses « patates » des cahiers de maths modernes !'],
      ['Quel est l’ensemble des nombres pairs compris entre 1 et 9 ?', '{2 ; 4 ; 6 ; 8}', [['{1 ; 3 ; 5 ; 7 ; 9}', 'Ce sont les impairs. 🔢'], ['{0 ; 2 ; 4 ; 6 ; 8}', '0 n’est pas compris entre 1 et 9. 0️⃣'], ['{2 ; 4 ; 6 ; 8 ; 10}', '10 dépasse 9. 🔟']], 'Un ensemble peut se définir par une propriété de ses éléments.'],
      ['E = {1 ; 2 ; 3 ; 4} et A = {1 ; 2}. Quel est le complémentaire de A dans E ?', '{3 ; 4}', [['{1 ; 2}', 'Ça, c’est A lui-même. 🪞'], ['∅', 'Il reste des éléments. 🔍'], ['{1 ; 2 ; 3 ; 4}', 'Ça, c’est E. 📦']], 'Le complémentaire de A, ce sont les éléments de E qui ne sont pas dans A.'],
      ['Dans une application, combien d’images a chaque élément de l’ensemble de départ ?', 'une seule', [['aucune', 'Chaque élément doit avoir une image. 🎯'], ['deux', 'Une seule, sinon ce n’est pas une application. 🎯'], ['autant qu’on veut', 'Non. 🎯']], 'Une application associe à chaque élément de départ une image et une seule.'],
      ['Comment écrit-on dix en base deux ?', '1010', [['10', 'Ça, c’est deux en base deux ! 🔢'], ['1100', 'Ça, c’est douze. 🔢'], ['1001', 'Ça, c’est neuf. 🔢']], '10 = 8 + 2 : 1 × 8 + 0 × 4 + 1 × 2 + 0 × 1.'],
      ['Combien de couples contient le produit {a ; b} × {1 ; 2} ?', '4', [['2', 'Chaque lettre va avec chaque chiffre. 🔗'], ['3', 'Il en manque un. 🔢'], ['6', 'Un peu trop. 🔢']], 'Les couples : (a ; 1), (a ; 2), (b ; 1), (b ; 2).'],
      ['Les couples (a ; b) et (b ; a) sont-ils égaux (si a ≠ b) ?', 'non, l’ordre compte dans un couple', [['oui, ce sont les mêmes lettres', 'Dans un couple, l’ordre compte ! 🔁'], ['oui, toujours', 'Non. 🔁'], ['seulement le dimanche', 'Les maths ne prennent pas de jour de repos. 📅']], 'C’est la différence entre un couple et un ensemble {a ; b}.'],
      ['Dans 352 écrit en base dix, que vaut le chiffre 3 ?', '300 (trois centaines)', [['3', 'Sa position compte ! 📍'], ['30', 'Il est au rang des centaines. 📍'], ['3 000', 'Pas si loin à gauche. 📍']], 'Dans le tableau de numération, chaque rang vaut dix fois le précédent.'],
      ['En base deux, combien font 1 + 1 ?', '10', [['2', 'Le chiffre 2 n’existe pas en base deux ! 🔢'], ['11', 'Ça vaut trois. 🔢'], ['0', 'Il y a une retenue. ➕']], '1 + 1 = deux, qui s’écrit 10 en base deux.'],
      ['Comment a-t-on appelé les maths enseignées à l’école à partir de 1970, avec les ensembles ?', 'les « mathématiques modernes »', [['les mathématiques antiques', 'C’est plutôt celles d’Euclide. 🏛️'], ['le calcul mental', 'Il existait bien avant. 🧠'], ['l’algèbre de Boole uniquement', 'Ce n’en était qu’une petite partie. 🔌']], 'Le programme de l’école primaire du 2 janvier 1970 les introduit ; elles sont allégées à la fin des années 1970.']
    ]},
    { id:'calcul', ic:'🧠', nom:'Calcul mental et mesures', sous:'Tables, preuve par neuf, ares, stères et quintaux', q:[
      ['7 × 8 = ?', '56', [['54', 'Ça, c’est 6 × 9. 🔢'], ['63', 'Ça, c’est 7 × 9. 🔢'], ['48', 'Ça, c’est 6 × 8. 🔢']], '5, 6, 7, 8 : 56 = 7 × 8.'],
      ['9 × 7 = ?', '63', [['56', 'Ça, c’est 7 × 8. 🔢'], ['72', 'Ça, c’est 9 × 8. 🔢'], ['61', 'Presque, mais ce n’est même pas dans la table. 🙃']], 'Astuce : 9 × 7 = 70 − 7.'],
      ['12 × 12 = ?', '144', [['124', 'Raté de 20. 🔢'], ['142', 'Presque ! 🔢'], ['1 212', 'On ne colle pas les nombres ! 😄']], 'Une « grosse » (douze douzaines) faisait 144 objets.'],
      ['À quoi sert la « preuve par neuf » ?', 'à vérifier une multiplication (elle détecte beaucoup d’erreurs, pas toutes)', [['à diviser par neuf plus vite', 'Ce n’est pas son rôle. ➗'], ['à trouver les nombres premiers', 'Non. 🔢'], ['à calculer un pourcentage', 'Non. 💯']], 'Elle ne voit pas, par exemple, deux chiffres inversés : c’est une vérification, pas une preuve absolue.'],
      ['Combien de litres dans un hectolitre ?', '100', [['10', 'Ça, c’est le décalitre. 🪣'], ['1 000', 'Ça, c’est le mètre cube… en litres. 📦'], ['0,1', 'Ça, c’est le décilitre. 🥛']], 'Hecto = cent.'],
      ['Combien de mètres dans un décamètre ?', '10', [['0,1', 'Ça, c’est le décimètre. 📏'], ['100', 'Ça, c’est l’hectomètre. 📏'], ['1 000', 'Ça, c’est le kilomètre. 📏']], 'Déca = dix ; déci = un dixième.'],
      ['Combien de mètres carrés dans un are ?', '100', [['10', 'Un are, c’est un carré de 10 m de côté. 🟩'], ['1 000', 'Trop. 🟩'], ['10 000', 'Ça, c’est l’hectare. 🌾']], '1 a = 100 m² = un carré de 10 m sur 10 m.'],
      ['Combien de mètres carrés dans un hectare ?', '10 000', [['100', 'Ça, c’est l’are. 🟩'], ['1 000', 'Il manque un zéro. 🔢'], ['1 000 000', 'Ça, c’est le kilomètre carré. 🗺️']], '1 ha = 100 a = un carré de 100 m de côté.'],
      ['Combien de kilogrammes dans une tonne ?', '1 000', [['100', 'Ça, c’est le quintal. ⚖️'], ['10', 'Bien trop léger. 🪶'], ['10 000', 'Trop lourd. 🐘']], '1 t = 10 quintaux = 1 000 kg.'],
      ['Combien de minutes dans 3 h 45 min ?', '225', [['345', 'Une heure, c’est 60 minutes, pas 100 ! ⏰'], ['185', 'Recompte : 3 × 60 + 45. ⏰'], ['205', 'Presque. ⏰']], '3 × 60 = 180, puis 180 + 45 = 225.'],
      ['Combien font 25 % de 80 ?', '20', [['25', 'C’est le pourcentage, pas le résultat. 💯'], ['40', 'Ça, c’est la moitié. ➗'], ['8', 'Ça, c’est 10 %. 💯']], '25 % = un quart : 80 ÷ 4 = 20.'],
      ['Qu’est-ce qu’un stère ?', 'une unité de bois de chauffage : environ 1 m³ de bûches empilées', [['une unité de longueur', 'Non. 📏'], ['une monnaie ancienne', 'Non. 🪙'], ['un instrument de mesure', 'Non. 🔧']], 'On achetait (et on achète encore) le bois de chauffage au stère.'],
      ['Combien de kilogrammes dans un quintal ?', '100', [['1 000', 'Ça, c’est la tonne. ⚖️'], ['10', 'Trop léger. 🪶'], ['50', 'Non. ⚖️']], 'Le quintal servait beaucoup pour les récoltes de blé.'],
      ['15 × 4 = ?', '60', [['45', 'Ça, c’est 15 × 3. 🔢'], ['54', 'Non. 🔢'], ['19', 'Ça, c’est 15 + 4 ! ➕']], 'Astuce : 15 × 4 = 30 × 2.'],
      ['1 000 − 375 = ?', '625', [['735', 'Raté de 110. 🔢'], ['725', 'Attention aux retenues. 🔢'], ['635', 'Presque. 🔢']], 'Complète jusqu’à 1 000 : 375 + 25 = 400, puis 400 + 600 = 1 000.'],
      ['Quelle est la moitié de 3/4 ?', '3/8', [['3/2', 'Ça, c’est le double. ✖️'], ['1/4', 'Non. 🍰'], ['6/4', 'Ça aussi, c’est le double. ✖️']], 'Prendre la moitié = multiplier le dénominateur par 2.'],
      ['3 cahiers coûtent 6 francs. Combien coûtent 5 cahiers ?', '10 francs', [['8 francs', 'Un cahier coûte 2 francs. 🔢'], ['12 francs', 'Ce serait le prix de 6 cahiers. 🔢'], ['30 francs', 'Il ne faut pas multiplier 6 par 5. 🙃']], 'Règle de trois : 6 ÷ 3 = 2 francs le cahier, puis 2 × 5 = 10.'],
      ['Un train roule à 120 km/h pendant 2 h 30. Quelle distance parcourt-il ?', '300 km', [['240 km', 'Il manque la demi-heure. 🚂'], ['250 km', 'Non. 🚂'], ['360 km', 'Ce serait en 3 h. 🚂']], '120 × 2 = 240, et 60 km en une demi-heure : 300 km.'],
      ['À quelle fraction est égal 0,25 ?', '1/4', [['1/25', 'Ça vaut 0,04. 🔢'], ['2/5', 'Ça vaut 0,4. 🔢'], ['1/2', 'Ça vaut 0,5. 🔢']], '0,25 = 25/100 = 1/4.'],
      ['En 1960, combien d’anciens francs vaut un « nouveau franc » ?', '100', [['10', 'Pas assez. 🪙'], ['1 000', 'Trop. 🪙'], ['6,55957', 'Ça, c’est le taux de l’euro en francs, en 1999. 💶']], 'Pendant des années, beaucoup de gens ont continué à compter en anciens francs !']
    ]},
    { id:'geo', ic:'🗺️', nom:'Géographie par cœur', sous:'Préfectures, fleuves, affluents et numéros de départements', q:[
      ['Quelle est la préfecture de la Gironde ?', 'Bordeaux', [['Arcachon', 'Belle plage, mais pas préfecture. 🏖️'], ['Libourne', 'C’est une sous-préfecture. 🍷'], ['Toulouse', 'C’est en Haute-Garonne. 🚀']], 'Gironde (33) : Bordeaux.'],
      ['Quelle est la préfecture du Finistère ?', 'Quimper', [['Brest', 'Plus grande ville du département, mais pas préfecture : piège classique ! ⚓'], ['Rennes', 'C’est en Ille-et-Vilaine. 🏛️'], ['Lorient', 'C’est dans le Morbihan. 🌊']], 'Finistère (29) : Quimper.'],
      ['Quelle est la préfecture de la Savoie ?', 'Chambéry', [['Annecy', 'C’est la préfecture de la Haute-Savoie. 🏔️'], ['Grenoble', 'C’est en Isère. 🚡'], ['Albertville', 'Ville olympique de 1992, mais sous-préfecture. ⛷️']], 'Savoie (73) : Chambéry.'],
      ['Quelle est la préfecture du Calvados ?', 'Caen', [['Bayeux', 'Célèbre tapisserie, mais sous-préfecture. 🧵'], ['Rouen', 'C’est en Seine-Maritime. 🏛️'], ['Deauville', 'Planches célèbres, pas préfecture. 🏖️']], 'Calvados (14) : Caen.'],
      ['Quelle ville est devenue préfecture du Var en 1974, à la place de Draguignan ?', 'Toulon', [['Nice', 'C’est dans les Alpes-Maritimes. 🌴'], ['Hyères', 'Non. 🌊'], ['Fréjus', 'Non. ⛪']], 'Avant 1974, la préfecture du Var était Draguignan.'],
      ['Quelle est la préfecture de la Marne ?', 'Châlons-en-Champagne', [['Reims', 'La plus grande ville, mais pas la préfecture : piège ! 🍾'], ['Épernay', 'Capitale du champagne, mais sous-préfecture. 🥂'], ['Troyes', 'C’est dans l’Aube. 🏛️']], 'Marne (51) : Châlons-en-Champagne, autrefois appelée Châlons-sur-Marne.'],
      ['Quelle est la préfecture de la Saône-et-Loire ?', 'Mâcon', [['Chalon-sur-Saône', 'Plus peuplée, mais sous-préfecture. 🏞️'], ['Dijon', 'C’est en Côte-d’Or. 🥄'], ['Autun', 'C’est une sous-préfecture. 🏛️']], 'Saône-et-Loire (71) : Mâcon.'],
      ['Quelle est la préfecture de l’Aveyron ?', 'Rodez', [['Millau', 'Célèbre viaduc, mais sous-préfecture. 🌉'], ['Albi', 'C’est dans le Tarn. 🧱'], ['Cahors', 'C’est dans le Lot. 🍷']], 'Aveyron (12) : Rodez.'],
      ['Quelle est la préfecture du Bas-Rhin ?', 'Strasbourg', [['Colmar', 'C’est dans le Haut-Rhin. 🥨'], ['Mulhouse', 'C’est dans le Haut-Rhin. 🏭'], ['Metz', 'C’est en Moselle. 🏛️']], 'Bas-Rhin (67) : Strasbourg.'],
      ['Quelle est la préfecture de la Seine-Maritime ?', 'Rouen', [['Le Havre', 'Plus peuplée, mais pas préfecture : piège ! ⚓'], ['Dieppe', 'C’est une sous-préfecture. 🐟'], ['Caen', 'C’est dans le Calvados. 🏛️']], 'Seine-Maritime (76) : Rouen.'],
      ['Quel fleuve traverse Lyon et se jette dans la mer Méditerranée ?', 'le Rhône', [['la Loire', 'Elle se jette dans l’Atlantique. 🌊'], ['la Seine', 'Elle se jette dans la Manche. 🌊'], ['la Garonne', 'Elle rejoint l’Atlantique. 🌊']], 'Le Rhône naît en Suisse, dans le glacier du Rhône.'],
      ['Quel affluent rejoint le Rhône à Lyon ?', 'la Saône', [['la Marne', 'Elle rejoint la Seine. 🏞️'], ['l’Isère', 'Elle rejoint le Rhône plus au sud, près de Valence. 🏔️'], ['le Doubs', 'Il rejoint la Saône. 🏞️']], 'Le confluent du Rhône et de la Saône est au sud de Lyon.'],
      ['Quel est le plus long fleuve de France ?', 'la Loire', [['la Seine', 'Plus courte. 🌊'], ['le Rhône', 'Très puissant, mais plus court : environ 810 km, dont une partie en Suisse. 🇨🇭'], ['la Garonne', 'Plus courte. 🌊']], 'La Loire coule sur environ 1 000 km, entièrement en France.'],
      ['Dans quoi se jette la Garonne ?', 'dans l’océan Atlantique, par l’estuaire de la Gironde', [['dans la mer Méditerranée', 'Non, elle part vers l’ouest. 🧭'], ['dans la Loire', 'Non. 🏞️'], ['dans le lac Léman', 'Non. 🏔️']], 'La Garonne et la Dordogne se rejoignent pour former la Gironde.'],
      ['Quel affluent rejoint la Seine à Conflans-Sainte-Honorine ?', 'l’Oise', [['la Marne', 'Elle rejoint la Seine près de Paris, à Charenton. 🏞️'], ['l’Yonne', 'Elle la rejoint à Montereau. 🏞️'], ['l’Eure', 'Elle la rejoint plus en aval, en Normandie. 🏞️']], 'Conflans vient du latin « confluentes » : là où les rivières se rencontrent.'],
      ['Où se jette la Marne ?', 'dans la Seine', [['dans le Rhin', 'Non. 🏞️'], ['dans la Loire', 'Non. 🏞️'], ['dans la Manche', 'Non, c’est un affluent. 🌊']], 'Elle rejoint la Seine au sud-est de Paris.'],
      ['Quel massif montagneux occupe le centre de la France ?', 'le Massif central', [['le Jura', 'Il est à l’est, le long de la Suisse. 🧀'], ['les Vosges', 'Elles sont au nord-est. 🌲'], ['les Pyrénées', 'Elles sont au sud, le long de l’Espagne. 🇪🇸']], 'On y trouve les volcans d’Auvergne.'],
      ['Quelles régions le massif des Vosges sépare-t-il ?', 'l’Alsace et la Lorraine', [['la Bretagne et la Normandie', 'Non. 🗺️'], ['la Savoie et le Dauphiné', 'Ce sont les Alpes. 🏔️'], ['le Languedoc et la Provence', 'Non. 🗺️']], 'Le Grand Ballon est son point culminant.'],
      ['Quel département porte le numéro 75 ?', 'Paris', [['les Yvelines', 'Elles ont le 78. 🏰'], ['la Seine-Saint-Denis', 'Elle a le 93. 🏟️'], ['le Rhône', 'Il a le 69. 🦁']], 'Les numéros suivent à peu près l’ordre alphabétique de 1790.'],
      ['Quel département porte le numéro 13 ?', 'les Bouches-du-Rhône', [['le Var', 'Il a le 83. 🌊'], ['le Calvados', 'Il a le 14. 🍎'], ['le Cantal', 'Il a le 15. 🧀']], 'Préfecture : Marseille.']
    ]}
  ];

  // Repères vérifiés (voir les sources en bas de la page). Texte uniquement en français.
  const PROGRAMME = [
    ['🏫 À l’école primaire', [
      'En 1969, le « tiers-temps pédagogique » : le français et le calcul se font le matin ; les « activités d’éveil » (histoire, géographie, sciences, arts) et le sport occupent le reste du temps.',
      'Le sport passe à 6 heures par semaine, au lieu de 2 h 30.',
      'À la rentrée 1972, le jour sans classe passe du jeudi au mercredi… et on a toujours classe le samedi matin.',
      'Entre 1977 et 1980, de nouveaux programmes : 27 heures par semaine sur neuf demi-journées, avec, au cours élémentaire et moyen, 9 h de français, 6 h de mathématiques, 7 h d’activités d’éveil et 5 h de sport.'
    ]],
    ['🧮 Les « maths modernes »', [
      'Le programme du 2 janvier 1970 fait entrer les « mathématiques modernes » à l’école primaire : ensembles, relations, bases de numération.',
      'Au collège, les programmes « réformés » arrivent à partir de 1971, puis sont allégés à la fin des années 1970 : on a parlé de « réforme de la réforme ».',
      'Les fameuses « patates » (diagrammes de Venn) remplissent alors les cahiers… et désarçonnent bien des parents.'
    ]],
    ['🎒 Le collège et le BEPC', [
      'Jusqu’en 1977, après le CM2, les élèves sont répartis en filières : lycée, collège d’enseignement général (CEG), classes de transition…',
      'La loi Haby du 11 juillet 1975 crée le « collège unique », appliqué à la rentrée 1977 : les mêmes classes pour tous, de la 6e à la 3e.',
      'À cette rentrée 1977, les cours passent de 55 à 50 minutes, et les manuels de 6e sont prêtés aux élèves.',
      'Le BEPC (brevet d’études du premier cycle) sanctionne la fin du collège ; la loi Haby prévoit de le remplacer par le brevet des collèges, ce qui est fait au milieu des années 1980.'
    ]],
    ['🏛️ Le latin', [
      'En 1968, le latin disparaît de la 6e, puis de la 5e en 1969 : il commence alors en 4e. Une vraie « guerre du latin » agite les journaux !'
    ]],
    ['✒️ Ce qu’on pratiquait beaucoup', [
      'La dictée quotidienne, la récitation, l’analyse grammaticale (mot par mot) et l’analyse logique (proposition par proposition).',
      'Le calcul mental, les tables, la preuve par neuf et les conversions d’unités (ares, stères, quintaux…).',
      'Les préfectures, les fleuves et leurs affluents, appris par cœur avec la carte murale.'
    ]]
  ];
  const SOURCES = [
    ['Larousse, Journal de l’année 1970 : « Primaire : le tiers temps »', 'https://www.larousse.fr/archives/journaux_annee/1970/332/loisirs'],
    ['Ministère de l’Éducation nationale : arrêté reportant la coupure du jeudi au mercredi (1972)', 'https://education.gouv.fr/media/20936/download'],
    ['Objectifs et programmes du cycle élémentaire (1978)', 'https://didacfran.univ-rouen.fr/sites/didacfran.univ-rouen.fr/files/ressources/1978_objectifs_et_programmes_du_cycle_elementaire_7_juillet_1978.pdf'],
    ['APMEP / Publimath : le programme du 2 janvier 1970', 'https://bibnum.publimath.fr/AAA/AAA72005.pdf'],
    ['IREM de Grenoble : les programmes de 1971 et 1978 au collège', 'https://irem.univ-grenoble-alpes.fr/medias/fichier/5x3_1570714298158-pdf'],
    ['Vie-publique.fr : le collège unique, de la loi Haby à aujourd’hui', 'https://www.vie-publique.fr/eclairage/38483-le-debat-sur-le-college-unique'],
    ['Larousse, Journal de l’année 1977 : la réforme Haby', 'https://www.larousse.fr/archives/journaux_annee/1977/307/education'],
    ['Larousse, Journal de l’année 1969 : le latin en sixième', 'https://www.larousse.fr/archives/journaux_annee/1969/305/education']
  ];

  const SERIE = 20, P = () => window.AMI_RETRO_PLUS ? window.AMI_RETRO : null;   // v8.4 : le module « plus » ajoute dictée, certif, duel et récompenses
  const enFrancais = () => { const b = api() && api().base(); return !b || !b.ui || b.ui === 'fr'; };
  const melanger = a => { const t = a.slice(); for(let i = t.length - 1; i > 0; i--){ const j = Math.floor(Math.random() * (i + 1)); [t[i], t[j]] = [t[j], t[i]]; } return t; };
  const enQuestion = (e, x, i) => {
    const faux = x[2].map(f => ({ en:f[0], vanne:f[1] }));
    return { id:'retro:' + e.id + '#' + i, matiere:'francais', lang:'fr', consigne:'📼 ' + e.nom, enonce:x[0], bon:x[1], faux, regle:x[3],
      vanneDe:choix => { const f = faux.find(z => z.en === choix); return f ? f.vanne : 'Raté !'; } };
  };
  const MENTIONS = n => n >= 16 ? 'mention Très bien' : n >= 14 ? 'mention Bien' : n >= 12 ? 'mention Assez bien' : n >= 10 ? 'admis' : 'ajourné… on retente à la session de septembre ?';

  function accueilRetro(){
    const A = api(), esc = A.esc;
    A.poser(A.barre('matieres') + '<main class="coin-anglais retro-ecran"><h2>📼 Le défi rétro</h2>' +
      '<p class="intro">Retour en 1978 ! Des épreuves « comme à l’époque », pour se mesurer en famille. Les parents et grands-parents vont-ils faire mieux que toi ?</p>' +
      '<p class="petit retro-avert">Questions inspirées des programmes d’autrefois : ce ne sont pas de vrais sujets d’examen.</p>' +
      (P() ? '<p class="retro-resume"><button class="petit-bouton" data-a="retro-cahier">' + esc(P().resume()) + ' · 🏅 tableau d’honneur</button></p>' : '') +
      '<h3>🎓 Les grands examens</h3><div class="cartes-anglais">' +
        (P() ? M.carte('retro-dictee', '', '✒️', 'La vraie dictée', 'Plumo dicte, tu écris, correction mot à mot comme au certif') +
          M.carte('retro-certif', '', '📜', 'Le Certificat d’études', 'Années 50 : la dictée, puis 20 questions, reçu ou ajourné') : '') +
        M.carte('retro-bepc', '', '🎓', 'Le Grand BEPC rétro', '20 questions de toutes les épreuves, noté sur 20, avec mention') +
        (P() ? M.carte('retro-duel', '', '⚔️', 'Le duel des générations', 'Enfant contre parent ou grand-parent : les mêmes questions') : '') +
      '</div><h3>📚 Les épreuves</h3><div class="cartes-anglais">' +
        EPREUVES.map(e => M.carte('retro-go', e.id, e.ic, esc(e.nom), esc(e.sous) + ' · ' + Math.min(SERIE, e.q.length) + ' questions tirées parmi ' + e.q.length)).join('') +
      '</div><div class="cartes-anglais">' +
        M.carte('retro-programme', '', '📜', 'Le programme des années 70', 'Tiers-temps, maths modernes, collège unique, BEPC : les vrais repères') +
        (P() ? M.carte('retro-certif-page', '', '🏫', 'Le certif, c’était quoi ?', 'De Victor Duruy (1866) à 1989 : les repères sourcés') : '') +
      '</div></main>');
  }
  function fin(z, titre, id){
    const A = api(), esc = A.esc, n = Math.round(z.bonnes / z.liste.length * 20);
    const j = A.J(); j.plumes += z.bonnes; A.garder(); A.bruit('fin');
    const recomp = P() ? P().recompenser(z.bonnes, id, n) : '';
    A.poser(A.barre('retro') + '<main class="centre retro-fin"><div class="ami-moyen">' + A.ami(n >= 14 ? 'fete' : 'mdr') + '</div><h2>' + esc(titre) + '</h2>' +
      '<p class="gros-score">' + n + '/20</p><p><strong>' + esc('Résultat : ' + MENTIONS(n)) + '</strong></p>' +
      '<p>' + esc(n >= 16 ? 'Ton instit de 1978 t’aurait donné un bon point ET une image !' : n >= 10 ? 'Admis ! Tu aurais eu ta place sur le banc de la communale.' : 'Pas de panique : en 1978 aussi, on révisait ses tables le soir.') + '</p>' +
      '<p>🪶 +' + z.bonnes + ' plumes</p>' + recomp +
      '<div class="actions serrees"><button class="moyen plein" data-a="retro">📼 Autre épreuve</button><button class="moyen" data-a="retro-programme">📜 Le programme des années 70</button></div></main>');
  }
  function lancer(id){
    const e = EPREUVES.find(x => x.id === id); if(!e) return accueilRetro();
    const liste = melanger(e.q.map((x, i) => enQuestion(e, x, i))).slice(0, SERIE);   // v8.4 : 20 questions tirées parmi 40
    api().questionsGo(liste, { titre:e.ic + ' ' + e.nom, retour:'retro', sujet:'sciences', fin:z => fin(z, e.ic + ' ' + e.nom, e.id) });
  }
  function bepc(){
    // v8.4 : 20 questions au total, réparties sur toutes les épreuves (3 au plus par épreuve).
    const par = Math.ceil(SERIE / EPREUVES.length);
    const liste = melanger([].concat(...EPREUVES.map(e => melanger(e.q.map((x, i) => enQuestion(e, x, i))).slice(0, par)))).slice(0, SERIE);
    api().questionsGo(liste, { titre:'🎓 Le Grand BEPC rétro', retour:'retro', sujet:'sciences', fin:z => fin(z, '🎓 Ton BEPC rétro', 'bepc') });
  }
  function programme(){
    const A = api(), esc = A.esc;
    A.poser(A.barre('retro') + '<main class="coin-anglais retro-programme"><h2>📜 L’école des années 70</h2>' +
      '<p class="intro">Ce qui a vraiment changé à l’école entre 1968 et 1980, d’après les textes officiels et les archives de l’époque.</p>' +
      PROGRAMME.map(([t, l]) => '<section class="retro-bloc"><h3>' + esc(t) + '</h3><ul>' + l.map(x => '<li>' + esc(x) + '</li>').join('') + '</ul></section>').join('') +
      '<section class="retro-bloc retro-sources"><h3>📚 Sources</h3><ul>' + SOURCES.map(([t, u]) => '<li><a href="' + esc(u) + '" target="_blank" rel="noopener">' + esc(t) + '</a></li>').join('') + '</ul></section>' +
      '<div class="actions serrees"><button class="moyen plein" data-a="retro-bepc">🎓 Passer le BEPC rétro</button><button class="moyen" data-a="retro">📼 Le défi rétro</button></div></main>');
  }

  M.cartes.matiere.push(() => enFrancais() ? M.carte('retro', '', '📼', 'Le défi rétro', 'Pour le fun : l’école des années 70, dictée, maths modernes, BEPC') : '');
  Object.assign(M.actions, { 'retro':() => accueilRetro(), 'retro-go':v => lancer(v), 'retro-bepc':() => bepc(), 'retro-programme':() => programme() });
  window.AMI_RETRO = { EPREUVES, PROGRAMME, SOURCES };
})();
