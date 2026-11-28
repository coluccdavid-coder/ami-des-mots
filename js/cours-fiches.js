// Ami des mots — v9.0 : 📚 FICHES DE COURS rédigées (base de connaissances du programme).
// Une fiche par notion : l'essentiel, un exemple corrigé pas à pas, la méthode, les pièges, et une vanne de Plumo.
// Clé : « matière/chapitre » (mêmes identifiants que MATIERES et MATHS), par exemple 'francais/accords' ou 'maths/4-pythagore'.
// Les chapitres sans fiche rédigée gardent « l'essentiel » tiré de leurs questions (📖 Je n'ai pas compris la leçon).
// En français pour l'instant. Rien n'est inventé : notions du programme officiel, exemples vérifiés.
(function(){
  'use strict';
  const F = {}, TR = {};
  const fiche = (cle, o) => { F[cle] = Object.assign({ cle }, o); };

  // ═════════ FRANÇAIS ═════════
  fiche('francais/bac-grammaire', { titre:'La question de grammaire de l’oral',
    essentiel:[
      'À l’oral du bac de français, la question de grammaire porte sur une phrase ou un court passage du texte expliqué.',
      'Les points les plus fréquents : la négation, l’interrogation, les propositions subordonnées (relatives, complétives, circonstancielles).',
      'Négation totale : ne… pas, ne… point. Partielle : ne… jamais, plus, rien, personne, aucun. Restrictive : ne… que (= seulement). Lexicale : préfixes in-, mal-, dé-.',
      'Interrogation totale (réponse oui/non) ou partielle (mot interrogatif) ; directe (« ? ») ou indirecte (dépend d’un verbe comme « se demander »).',
      'Subordonnée relative : introduite par un pronom relatif qui reprend un antécédent. Complétive : introduite par la conjonction « que », souvent COD. Circonstancielle : temps, cause, conséquence, but, concession, condition.'
    ],
    exemple:{ enonce:'Analyse : « Je me demande pourquoi il ne parle jamais. »', etapes:[
      'Je compte les verbes conjugués : « demande », « parle » → deux propositions.',
      '« Je me demande » est la principale. « pourquoi il ne parle jamais » dépend de « demande » : c’est une subordonnée interrogative indirecte, COD de « se demande ».',
      'Dans la subordonnée, « ne… jamais » est une négation partielle (elle porte sur le temps).',
      'Effet : le locuteur exprime une question sans la poser directement ; le mystère du silence est mis en valeur.'
    ] },
    methode:['Relis la phrase à voix haute.', 'Nomme le phénomène avec le mot exact (négation partielle, relative déterminative…).', 'Justifie avec un test (remplacer, supprimer, déplacer).', 'Termine par l’effet sur le sens : le jury attend une analyse, pas une étiquette.'],
    pieges:['Confondre « que » relatif (il reprend un nom) et « que » conjonction (il ne reprend rien).', 'Prendre « ne… que » pour une négation : c’est une restriction.', 'Oublier qu’une interrogation indirecte n’a ni « ? » ni inversion.'],
    vanne:'Plumo a analysé « ne… que » comme une négation pendant trois ans. Il ne s’en est remis que l’an dernier. 🦜' });

  fiche('francais/bac-methode', { titre:'Méthode : commentaire et dissertation',
    essentiel:[
      'L’écrit dure 4 heures. Voie générale : commentaire de texte OU dissertation sur une œuvre au programme et son parcours.',
      'Commentaire : une problématique, un plan thématique en deux ou trois axes, des citations courtes analysées (procédé + effet).',
      'Dissertation : analyser le sujet, poser une problématique, construire un plan (dialectique ou thématique), appuyer chaque argument sur un exemple précis de l’œuvre.',
      'Introduction : amorce, présentation, problématique, annonce du plan. Conclusion : bilan qui répond, puis ouverture.',
      'La langue est évaluée : garder 20 à 30 minutes pour relire.'
    ],
    exemple:{ enonce:'Sujet : « Le théâtre n’est-il qu’un divertissement ? »', etapes:[
      'Mots clés : « théâtre » (texte et représentation), « n’est-il qu’ » (restriction : seulement ?), « divertissement » (plaisir, détente, mais aussi « détourner de »).',
      'Problématique : le plaisir du spectacle empêche-t-il le théâtre d’instruire et de faire réfléchir ?',
      'Plan : I. Le théâtre divertit (rire, intrigue, spectacle). II. Il instruit en divertissant (« corriger les mœurs par le rire »). III. Il peut déranger et faire penser (débats, malaise, dispute).',
      'Chaque partie : deux ou trois arguments, chacun appuyé sur une scène précise de l’œuvre étudiée.'
    ] },
    methode:['Brouillon : 1 h 30 environ (analyse, idées, plan, introduction et conclusion rédigées).', 'Rédaction : 2 heures, une partie après l’autre, avec des transitions.', 'Relecture : accords, homophones, ponctuation.'],
    pieges:['Raconter l’œuvre au lieu de répondre à la question.', 'Citer sans analyser.', 'Un plan qui suit l’ordre des chapitres.', '« Depuis la nuit des temps… » en amorce.'],
    vanne:'Plumo a rendu un jour une dissertation en un seul paragraphe de quatre pages. Le correcteur l’a lue… en apnée. 🤿' });

  fiche('francais/langue-2nde', { titre:'Accords difficiles et phrase complexe',
    essentiel:[
      'Participe passé avec « être » : accord avec le sujet. Avec « avoir » : accord avec le COD seulement s’il est placé avant.',
      'Verbes pronominaux : accord avec le COD placé avant ; si « se » est COI (se parler, se sourire, se plaire), pas d’accord.',
      'Les participes des verbes impersonnels restent invariables (il a fallu, les chaleurs qu’il a fait).',
      'Phrase complexe = plusieurs propositions : juxtaposées (ponctuation), coordonnées (mais, ou, et, donc, or, ni, car) ou subordonnées.',
      'Modes : « après que » + indicatif ; « avant que, bien que, pour que, il faut que » + subjonctif ; jamais de conditionnel après « si ».'
    ],
    exemple:{ enonce:'Accorde : « Les lettres qu’elle s’est (écrire) pendant l’été, elle les a (garder). »', etapes:[
      '« s’est écrit… » : elle a écrit QUOI ? → « que » (= les lettres), placé avant → accord : écrites.',
      '« les a gardé… » : elle a gardé QUOI ? → « les » (= les lettres), placé avant → accord : gardées.',
      'Résultat : « Les lettres qu’elle s’est écrites pendant l’été, elle les a gardées. »'
    ] },
    methode:['Repère l’auxiliaire.', 'Avec « avoir », pose la question « quoi ? » après le participe.', 'Si le COD est avant, accorde ; sinon, laisse invariable.'],
    pieges:['« Ils se sont parlés » (faux : on parle À quelqu’un).', '« Après qu’il soit parti » (faux : indicatif).', '« Si j’aurais su » (faux : si j’avais su).'],
    vanne:'Le participe passé avec « avoir », c’est comme Plumo au réveil : il ne s’accorde avec rien tant qu’on ne lui a pas montré le COD avant. ☕' });

  fiche('francais/accords', { titre:'L’accord du participe passé',
    essentiel:[
      'Employé seul, le participe s’accorde comme un adjectif : des feuilles tombées.',
      'Avec « être », il s’accorde avec le sujet : elles sont parties.',
      'Avec « avoir », il ne s’accorde jamais avec le sujet ; il s’accorde avec le COD placé avant le verbe : la tarte que j’ai mangée.',
      'Le COD placé avant est souvent un pronom : que, la, les, l’, me, te, nous, vous.'
    ],
    exemple:{ enonce:'« Ces chansons, je les ai (écouter) cent fois. »', etapes:['Auxiliaire « avoir ».', 'J’ai écouté QUOI ? → « les » = ces chansons.', '« les » est placé avant le verbe → accord au féminin pluriel : écoutées.'] },
    methode:['Quel auxiliaire ?', '« Être » → accord avec le sujet.', '« Avoir » → cherche le COD : avant = accord, après = invariable.'],
    pieges:['« Elles ont mangées » : jamais d’accord avec le sujet après « avoir ».', 'Le COD « en » n’entraîne pas d’accord : des pommes, j’en ai mangé.'],
    vanne:'Accorder avec le sujet après « avoir », c’est comme saluer le chauffeur du bus d’à côté : sympa, mais hors sujet. 🚌' });

  fiche('francais/homophones', { titre:'Les homophones grammaticaux',
    essentiel:[
      'a / à : « a » est le verbe avoir (on peut dire « avait ») ; « à » est une préposition.',
      'et / est : « et » relie (on peut dire « et puis ») ; « est » est le verbe être (on peut dire « était »).',
      'on / ont : « on » est un pronom (« il ») ; « ont » est le verbe avoir (« avaient »).',
      'son / sont, ces / ses / c’est / s’est, ou / où, peu / peut / peux, leur / leurs, quand / quant / qu’en.'
    ],
    exemple:{ enonce:'« Il … faim, alors il va … la cantine. » (a/à)', etapes:['Premier trou : « Il avait faim » fonctionne → verbe avoir : « a ».', 'Second trou : « il va avait la cantine » ne veut rien dire → préposition : « à ».', 'Résultat : « Il a faim, alors il va à la cantine. »'] },
    methode:['Remplace par l’imparfait (avait, était, avaient).', 'Si la phrase garde son sens, c’est le verbe ; sinon, c’est l’autre mot.'],
    pieges:['« Ses » (les siens) et « ces » (ceux-là).', '« Où » (lieu, temps) et « ou » (ou bien).'],
    vanne:'« Il à faim » : Plumo cherche encore le verbe dans cette phrase. Il a faim, lui aussi, à force de chercher. 🍕' });

  // ═════════ ANGLAIS ═════════
  fiche('langlais/ecrire', { titre:'Écrire en anglais : l’essai et l’e-mail',
    essentiel:[
      'Un essai : introduction (sujet, question), un paragraphe par idée (topic sentence, explication, exemple), conclusion avec une position claire.',
      'Mots de liaison — ajout : moreover, furthermore, in addition ; opposition : however, yet, whereas, on the other hand ; conséquence : therefore, as a result ; exemple : for instance.',
      'Although + proposition ; despite / in spite of + nom ou V-ing. Jamais « although… but ».',
      'E-mail formel : Dear Mr Smith, … I am writing to… / I look forward to hearing from you. / Yours sincerely,'
    ],
    exemple:{ enonce:'Sujet : “Should mobile phones be banned at school?” (120 mots)', etapes:[
      'Introduction : Mobile phones are everywhere, even in classrooms. Should they be banned?',
      'Paragraphe 1 (pour) : First of all, phones distract students. For instance, notifications interrupt lessons.',
      'Paragraphe 2 (contre) : However, phones can also be useful tools, for example to look up a word.',
      'Conclusion : To conclude, I believe phones should be allowed only when the teacher asks for them.'
    ] },
    methode:['Lis la consigne : type de texte, nombre de mots, destinataire.', 'Fais un plan en anglais, pas en français.', 'Utilise au moins cinq mots de liaison différents.', 'Relis : -s de la 3e personne, prétérits irréguliers, ordre des mots.'],
    pieges:['« I am agree » → I agree.', '« According to me » → In my opinion.', '« People is » → people are.', '« Despite of » → despite.'],
    vanne:'Plumo a écrit un essai avec quinze « and » d’affilée. Le correcteur a cru lire une liste de courses. 🛒' });

  fiche('langlais/parler', { titre:'Parler en anglais : continu et interaction',
    essentiel:[
      'Prise de parole en continu : annoncer le sujet, développer deux ou trois idées avec des exemples, conclure.',
      'Interaction : écouter, réagir (That’s a good point), relancer (What do you think?), reformuler (So you mean that…?).',
      'Pour gagner du temps : Well, … / Let me think… / That’s a good question.',
      'Pour contourner un mot inconnu : It’s a kind of… / It’s something you use to…',
      'Pour l’attestation de langues, une interrogation orale de 10 minutes évalue l’expression orale en continu et en interaction.'
    ],
    exemple:{ enonce:'Question : “What is your favourite way to travel?”', etapes:[
      'Annoncer : I’d like to talk about travelling by train.',
      'Idée 1 + exemple : First, it’s relaxing. For example, last summer I went to Lyon and read a whole book.',
      'Idée 2 : What’s more, it’s better for the planet than flying.',
      'Conclure + relancer : So, for me, the train is the best option. What about you?'
    ] },
    methode:['Prépare des phrases-outils, pas un texte par cœur.', 'Parle à un rythme calme : la clarté compte plus que la vitesse.', 'Entraîne-toi à voix haute, chronomètre en main.'],
    pieges:['« I am agree » → I agree.', '« It depends of » → it depends on.', 'Réciter sans regarder son interlocuteur.'],
    vanne:'Plumo a tenu un oral entier avec « euh ». Le jury lui a mis A1… en « euh-nglais ». 🎤' });

  fiche('langlais/pperfect', { titre:'Le present perfect (for, since)',
    essentiel:[
      'Forme : have / has + participe passé (I have lived, she has eaten).',
      'Emplois : un bilan au présent (I have finished), une expérience de vie sans date (I have never been to Rome), une action commencée dans le passé qui dure encore (I have lived here for ten years).',
      'For + durée (for two years) ; since + point de départ (since 2020, since Monday).',
      'Avec une date ou un moment passé précis (yesterday, in 2019, last week), on emploie le prétérit.'
    ],
    exemple:{ enonce:'« J’habite ici depuis cinq ans. »', etapes:['L’action a commencé dans le passé et continue : present perfect.', '« cinq ans » est une durée : for.', '→ I have lived here for five years.'] },
    methode:['Y a-t-il une date passée ? → prétérit.', 'Sinon, bilan, expérience ou durée jusqu’à maintenant ? → present perfect.', 'Durée → for ; point de départ → since.'],
    pieges:['« I live here since 2020 » (calque du présent français) → I have lived here since 2020.', '« I have seen him yesterday » → I saw him yesterday.'],
    vanne:'« I am here since two hours » : Plumo l’a dit à l’aéroport de Londres. Il y est encore, d’après le douanier. ✈️' });

  fiche('langlais/condition', { titre:'If… will / If… would / If… had…',
    essentiel:[
      'Condition réelle : If + présent, will + base. If it rains, I will stay home.',
      'Hypothèse sur le présent : If + prétérit, would + base. If I had time, I would help you. (If I were… est correct à toutes les personnes.)',
      'Regret sur le passé : If + had + participe, would have + participe. If I had known, I would have come.',
      'Jamais de « will » ni de « would » juste après « if ».'
    ],
    exemple:{ enonce:'« Si j’avais su, je serais venu. »', etapes:['Regret sur le passé → troisième type.', 'If + had + participe : If I had known,', 'would have + participe : I would have come.'] },
    methode:['Réel, imaginaire ou regret ?', 'Choisis la paire de temps correspondante.', 'Vérifie qu’aucun will/would ne suit « if ».'],
    pieges:['« If I would have known » → If I had known.', '« If it will rain » → If it rains.'],
    vanne:'If Plumo had revised, he would have passed. Mais Plumo n’a pas révisé : la grammaire, elle, ne pardonne pas. 📜' });

  fiche('langlais/modaux', { titre:'Must, should, have to',
    essentiel:[
      'Must + base : obligation ressentie par celui qui parle (I must study tonight).',
      'Have to + base : obligation venue de l’extérieur (règle, horaire). Passé : had to. Futur : will have to.',
      'Mustn’t : interdiction. Don’t have to : absence d’obligation (ce n’est pas nécessaire).',
      'Should + base : conseil (You should rest).'
    ],
    exemple:{ enonce:'« Tu n’es pas obligé de venir » / « Tu ne dois pas venir »', etapes:['Absence d’obligation → You don’t have to come.', 'Interdiction → You mustn’t come.', 'Le sens est très différent : un seul mot change tout.'] },
    methode:['Obligation, interdiction, absence d’obligation ou conseil ?', 'Après un modal, toujours la base verbale, sans « to » (sauf have to).'],
    pieges:['« He musts » → he must.', '« I must to go » → I must go.', '« mustn’t » ≠ « don’t have to ».'],
    vanne:'Plumo a confondu « mustn’t » et « don’t have to » au zoo : il pensait qu’il n’était « pas obligé » de ne pas nourrir les lions. 🦁' });

  // ═════════ MATHS ═════════
  fiche('maths/4-pythagore', { titre:'Le théorème de Pythagore',
    essentiel:[
      'Dans un triangle rectangle, le carré de l’hypoténuse est égal à la somme des carrés des deux autres côtés.',
      'L’hypoténuse est le côté opposé à l’angle droit : c’est le plus long.',
      'Si ABC est rectangle en A : BC² = AB² + AC².',
      'Réciproque : si BC² = AB² + AC², alors le triangle est rectangle en A.'
    ],
    exemple:{ enonce:'ABC est rectangle en A, AB = 3 cm, AC = 4 cm. Calcule BC.', etapes:['Le triangle est rectangle en A, l’hypoténuse est [BC].', 'BC² = AB² + AC² = 3² + 4² = 9 + 16 = 25.', 'BC = √25 = 5 cm.'] },
    methode:['Écris la phrase : « Le triangle … est rectangle en …, d’après le théorème de Pythagore : … ».', 'Remplace par les valeurs.', 'Calcule, puis prends la racine carrée (longueur positive).'],
    pieges:['Ajouter les côtés au lieu de leurs carrés.', 'Se tromper d’hypoténuse.', 'Pour un petit côté, il faut soustraire : AB² = BC² − AC².'],
    vanne:'3 + 4 = 7, donc l’hypoténuse vaut 7 ? Pythagore se retourne dans sa tombe… au carré. 📐' });

  fiche('maths/3-thales', { titre:'Le théorème de Thalès',
    essentiel:[
      'Si deux droites sécantes en A sont coupées par deux droites parallèles (BC) et (MN), avec M sur (AB) et N sur (AC), alors AM/AB = AN/AC = MN/BC.',
      'Il sert à calculer des longueurs dans des triangles « emboîtés » ou « papillon ».',
      'Réciproque : si les points sont alignés dans le même ordre et que AM/AB = AN/AC, alors (MN) et (BC) sont parallèles.'
    ],
    exemple:{ enonce:'(MN) // (BC), AM = 2, AB = 6, BC = 9. Calcule MN.', etapes:['D’après le théorème de Thalès : AM/AB = MN/BC.', '2/6 = MN/9.', 'MN = 9 × 2 ÷ 6 = 3.'] },
    methode:['Vérifie les parallèles et les alignements.', 'Écris les trois rapports en partant du sommet commun.', 'Garde les deux rapports utiles, puis fais un produit en croix.'],
    pieges:['Mélanger les côtés des deux triangles dans un même rapport.', 'Oublier de citer les droites parallèles.'],
    vanne:'Thalès a mesuré une pyramide avec son ombre. Plumo, lui, a mesuré son ombre… et s’est trouvé très grand. 🌞' });

  fiche('maths/1-second-degre', { titre:'Le second degré',
    essentiel:[
      'Un trinôme : f(x) = ax² + bx + c, avec a ≠ 0.',
      'Discriminant : Δ = b² − 4ac.',
      'Si Δ > 0 : deux racines x₁ = (−b − √Δ)/(2a) et x₂ = (−b + √Δ)/(2a). Si Δ = 0 : une racine double −b/(2a). Si Δ < 0 : aucune racine réelle.',
      'Forme canonique : a(x − α)² + β, avec α = −b/(2a) et β = f(α) ; le sommet de la parabole est (α ; β).',
      'Signe : f(x) est du signe de a, sauf entre les racines.'
    ],
    exemple:{ enonce:'Résous x² − 5x + 6 = 0.', etapes:['a = 1, b = −5, c = 6.', 'Δ = (−5)² − 4 × 1 × 6 = 25 − 24 = 1 > 0.', 'x₁ = (5 − 1)/2 = 2 et x₂ = (5 + 1)/2 = 3.', 'S = {2 ; 3}.'] },
    methode:['Mets l’équation sous la forme ax² + bx + c = 0.', 'Repère a, b, c avec leurs signes.', 'Calcule Δ, conclus sur le nombre de solutions, puis calcule-les.'],
    pieges:['Oublier le signe de b : (−5)² = 25, pas −25.', 'Diviser par a seulement au lieu de 2a.'],
    vanne:'Δ négatif : pas de racine réelle. Comme les excuses de Plumo quand il n’a pas fait ses exercices. 🙃' });

  fiche('maths/3-identites', { titre:'Les identités remarquables',
    essentiel:[
      '(a + b)² = a² + 2ab + b²',
      '(a − b)² = a² − 2ab + b²',
      '(a + b)(a − b) = a² − b²',
      'De gauche à droite on développe ; de droite à gauche on factorise.'
    ],
    exemple:{ enonce:'Développe (2x + 3)².', etapes:['a = 2x, b = 3.', 'a² = 4x², 2ab = 2 × 2x × 3 = 12x, b² = 9.', '(2x + 3)² = 4x² + 12x + 9.'] },
    methode:['Repère la forme (carré d’une somme, d’une différence, ou produit somme × différence).', 'Identifie a et b.', 'Applique la formule, puis réduis.'],
    pieges:['(a + b)² ≠ a² + b² : il manque le double produit 2ab.', '(2x)² = 4x², pas 2x².'],
    vanne:'(a + b)² = a² + b² ? Le double produit 2ab est parti sans prévenir. Plumo l’a vu prendre le bus. 🚌' });

  // ═════════ NIVEAU MATHÉMATICIEN ═════════
  fiche('mathematicien/raisonnement', { titre:'Raisonner comme un mathématicien',
    essentiel:[
      'Négation : non(∀x, P(x)) ⟺ ∃x, non P(x). De Morgan : non(A et B) = non A ou non B.',
      'Implication P ⇒ Q : fausse seulement si P est vraie et Q fausse. Contraposée : non Q ⇒ non P (même valeur de vérité). Réciproque : Q ⇒ P (peut être fausse).',
      'Par l’absurde : supposer le contraire et obtenir une contradiction.',
      'Récurrence : initialisation, hérédité P(n) ⇒ P(n+1), conclusion.',
      'Un contre-exemple suffit à réfuter un énoncé universel ; des exemples ne prouvent jamais un énoncé universel.'
    ],
    exemple:{ enonce:'Montre par récurrence que 1 + 2 + … + n = n(n+1)/2.', etapes:[
      'Initialisation : pour n = 1, 1 = 1 × 2 / 2. Vrai.',
      'Hérédité : supposons 1 + … + n = n(n+1)/2. Alors 1 + … + n + (n+1) = n(n+1)/2 + (n+1) = (n+1)(n+2)/2.',
      'Conclusion : la propriété est vraie pour tout n ≥ 1.'
    ] },
    methode:['Écris l’énoncé avec ses quantificateurs.', 'Choisis l’outil : direct, contraposée, absurde, récurrence, disjonction de cas.', 'Rédige chaque étape avec « donc », « or », « ainsi » : la logique doit se lire.'],
    pieges:['Confondre réciproque et contraposée.', 'Oublier l’initialisation.', 'Inverser l’ordre des quantificateurs.'],
    vanne:'Plumo a « démontré » que tous les nombres sont intéressants : le plus petit nombre inintéressant serait intéressant… Il ne s’en est jamais remis. 🌀' });

  fiche('mathematicien/arithmetique', { titre:'Arithmétique : divisibilité, PGCD, congruences',
    essentiel:[
      'Algorithme d’Euclide : PGCD(a, b) = PGCD(b, r) où r est le reste de a par b ; le dernier reste non nul est le PGCD.',
      'Bézout : PGCD(a, b) = 1 ⟺ ∃u, v ∈ ℤ, au + bv = 1. Gauss : a | bc et PGCD(a, b) = 1 ⇒ a | c.',
      'a ≡ b (mod n) ⟺ n | (a − b). On peut additionner et multiplier des congruences, et les élever à une puissance.',
      'Petit théorème de Fermat : p premier, p ∤ a ⇒ aᵖ⁻¹ ≡ 1 (mod p).',
      'Tout entier ≥ 2 se décompose de façon unique en produit de nombres premiers.'
    ],
    exemple:{ enonce:'Quel est le reste de 3²⁰²⁶ dans la division par 5 ?', etapes:[
      'Fermat : 5 est premier et ne divise pas 3, donc 3⁴ ≡ 1 (mod 5).',
      '2026 = 4 × 506 + 2, donc 3²⁰²⁶ = (3⁴)⁵⁰⁶ × 3² ≡ 1 × 9 ≡ 4 (mod 5).',
      'Le reste est 4.'
    ] },
    methode:['Cherche une puissance qui vaut 1 modulo n (Fermat ou essais).', 'Fais la division euclidienne de l’exposant par cette période.', 'Conclus avec un reste compris entre 0 et n − 1.'],
    pieges:['« a | bc ⇒ a | b ou a | c » est faux en général (vrai si a est premier).', 'Oublier que 1 n’est pas premier.'],
    vanne:'Plumo voulait diviser 7 parts de gâteau entre 3 amis. Il a trouvé le reste : 1. Il l’a mangé, par principe. 🍰' });

  fiche('mathematicien/complexes', { titre:'Les nombres complexes',
    essentiel:[
      'z = a + ib avec i² = −1 ; a est la partie réelle, b la partie imaginaire.',
      'Conjugué : z̄ = a − ib. Module : |z| = √(a² + b²) ; z z̄ = |z|².',
      'Forme exponentielle : z = r e^(iθ), r = |z|, θ = arg(z). Les modules se multiplient, les arguments s’ajoutent.',
      'Équation az² + bz + c = 0 (réels) avec Δ < 0 : z = (−b ± i√|Δ|)/(2a).',
      'Moivre : (e^(iθ))ⁿ = e^(inθ). Les racines n-ièmes de l’unité sont les e^(2ikπ/n).'
    ],
    exemple:{ enonce:'Écris 1 + i sous forme exponentielle.', etapes:['Module : √(1² + 1²) = √2.', 'Argument : cos θ = 1/√2 et sin θ = 1/√2, donc θ = π/4.', '1 + i = √2 e^(iπ/4).'] },
    methode:['Pour diviser, multiplie par le conjugué du dénominateur.', 'Pour une puissance, passe en forme exponentielle.', 'Pour une équation, calcule Δ.'],
    pieges:['|a + ib| = a + b (faux).', 'Oublier que i² = −1 en développant.', 'Argument en degrés au lieu de radians.'],
    vanne:'Plumo trouve les complexes trop compliqués. On lui a expliqué qu’ils sont tout simplement… imaginaires. Il ne voit toujours pas. 👻' });

  // ═════════ NIVEAU GÉNÉTICIEN ═════════
  fiche('geneticien/genetique-moleculaire', { titre:'De l’ADN à la protéine',
    essentiel:[
      'ADN : double hélice, bases complémentaires A–T et G–C ; réplication semi-conservative, synthèse de 5’ vers 3’.',
      'Transcription (noyau) : l’ARN polymérase fabrique un ARN messager ; chez les eucaryotes, l’épissage retire les introns.',
      'Traduction (ribosomes) : chaque codon de 3 nucléotides correspond à un acide aminé ; 64 codons, 20 acides aminés, départ AUG, stops UAA, UAG, UGA.',
      'Mutations : substitution (silencieuse, faux-sens, non-sens), insertion ou délétion (décalage du cadre de lecture).',
      'Outils : PCR (amplifier), séquençage (lire), CRISPR-Cas9 (couper à un endroit précis).'
    ],
    exemple:{ enonce:'Brin matrice d’ADN : 3’-TAC GGA ATT-5’. Quel peptide ?', etapes:['ARN messager complémentaire (5’ → 3’) : AUG CCU UAA.', 'AUG = méthionine (départ), CCU = proline, UAA = stop.', 'Peptide : Met–Pro.'] },
    methode:['Écris le brin d’ARN complémentaire du brin matrice (U à la place de T).', 'Découpe en codons à partir de AUG.', 'Lis le tableau du code génétique jusqu’au premier codon stop.'],
    pieges:['Lire le brin codant au lieu du brin matrice.', 'Oublier que l’ARN contient U et non T.', 'Compter une insertion de 3 nucléotides comme un décalage du cadre.'],
    vanne:'Plumo a tenté de traduire son ADN : il est tombé sur UAA dès le deuxième codon. Résultat : Plumo s’arrête là. 🛑' });

  fiche('geneticien/heredite', { titre:'Hérédité et génétique des populations',
    essentiel:[
      'Aa × Aa : génotypes 1/4 AA, 1/2 Aa, 1/4 aa ; phénotypes 3 : 1. Dihybridisme (gènes indépendants) : 9 : 3 : 3 : 1.',
      'Test-cross : croiser avec un homozygote récessif pour connaître un génotype.',
      'Méiose : deux divisions, 4 cellules haploïdes ; brassage intrachromosomique (crossing-over) et interchromosomique.',
      'Hérédité liée à l’X : une maladie récessive touche plus souvent les garçons (un seul X).',
      'Hardy-Weinberg : p + q = 1 et p² + 2pq + q² = 1 pour une population à l’équilibre.'
    ],
    exemple:{ enonce:'La mucoviscidose (récessive) touche environ 1 naissance sur 2 500. Fréquence des porteurs ?', etapes:['q² = 1/2 500, donc q = 1/50.', 'p = 1 − q ≈ 1.', 'Porteurs ≈ 2pq ≈ 2/50 = 1/25.'] },
    methode:['Écris les gamètes possibles de chaque parent.', 'Fais l’échiquier de croisement.', 'Compte les génotypes, puis les phénotypes.'],
    pieges:['Confondre génotype et phénotype.', 'Oublier que q est la racine de q².', 'Appliquer 9 : 3 : 3 : 1 à des gènes liés.'],
    vanne:'Plumo a croisé deux petits pois jaunes et obtenu un vert. Il a accusé le voisin. Mendel, lui, a souri : Aa × Aa. 🟢' });

  // ═════════ NIVEAU GÉOPHYSICIEN ═════════
  fiche('geophysicien/interieur-terre', { titre:'Sismologie et intérieur de la Terre',
    essentiel:[
      'Ondes P (compression, rapides, traversent tout) ; ondes S (cisaillement, solides seulement) ; ondes de surface (Love, Rayleigh), les plus destructrices.',
      'Discontinuités : Moho (croûte/manteau, 5 à 70 km), Gutenberg (manteau/noyau, 2 900 km), Lehmann (noyau externe liquide / graine solide, 5 150 km).',
      'L’ombre des ondes S prouve que le noyau externe est liquide ; la graine reste solide à cause de la pression.',
      'Magnitude : échelle logarithmique ; +1 de magnitude ≈ énergie × 32.',
      'Lithosphère rigide (les plaques) sur une asthénosphère plus ductile ; le manteau solide convecte lentement.'
    ],
    exemple:{ enonce:'Les ondes P arrivent à 8 km/s, les ondes S à 4,5 km/s, avec 25 s d’écart. Distance de l’épicentre ?', etapes:['d/4,5 − d/8 = 25.', 'd × (1/4,5 − 1/8) = 25, soit d × 0,0972 ≈ 25.', 'd ≈ 257 km.'] },
    methode:['Écris le temps de parcours de chaque onde : t = d / v.', 'Pose l’écart des temps d’arrivée.', 'Résous, puis recoupe avec deux autres stations pour placer l’épicentre.'],
    pieges:['Croire que le manteau est liquide.', 'Confondre amplitude (× 10 par degré) et énergie (× 32).', 'Oublier que les ondes S ne traversent pas les liquides.'],
    vanne:'Plumo a cherché le Moho avec une pelle. Après 40 cm, il a trouvé… un ver de terre. Il reste 29,9996 km. 🪱' });

  fiche('geophysicien/geodynamique', { titre:'Géodynamique : plaques, magnétisme, gravité',
    essentiel:[
      'Les plaques bougent de quelques mm à une dizaine de cm par an (mesures GPS).',
      'Dorsales (divergence, création de lithosphère), subductions (plongée de la lithosphère océanique dense), failles transformantes (coulissage).',
      'Les anomalies magnétiques symétriques autour des dorsales enregistrent les inversions du champ : preuve de l’expansion océanique.',
      'Le champ magnétique naît de la convection du fer liquide du noyau externe (géodynamo).',
      'Isostasie : une montagne a une racine crustale légère (anomalie de Bouguer négative). La pesanteur est plus forte aux pôles qu’à l’équateur.'
    ],
    exemple:{ enonce:'Une bande magnétique de 780 000 ans est à 39 km de l’axe de la dorsale. Vitesse d’expansion ?', etapes:['Vitesse (demi-expansion) = 39 km / 780 000 ans.', '39 km = 3 900 000 cm ; 3 900 000 / 780 000 = 5 cm/an.', 'Expansion totale (les deux côtés) : 10 cm/an.'] },
    methode:['Repère la limite d’inversion datée.', 'Mesure sa distance à l’axe de la dorsale.', 'Convertis en cm et divise par l’âge.'],
    pieges:['Oublier de convertir les km en cm.', 'Confondre demi-vitesse et vitesse totale d’expansion.', 'Penser que le pôle magnétique est fixe.'],
    vanne:'Plumo voulait voir l’Atlantique s’élargir en direct. Après une heure : 0,00001 mm. Il est allé faire une sieste. 😴' });

  const api = {
    F,
    ajouter:fiche,
    // v9.8 : une fiche peut être traduite (TR[langue][clé]) ; sans traduction, la version française est servie.
    traduire:(lang, cle, o) => { (TR[lang] = TR[lang] || {})[cle] = o; },
    get:(cle, lang) => { const f = F[cle]; if(!f) return null; const t = lang && lang !== 'fr' && TR[lang] && TR[lang][cle]; return t ? Object.assign({}, f, t, { exemple:Object.assign({}, f.exemple, t.exemple || {}), lang }) : f; },
    traduite:(cle, lang) => !!(TR[lang] && TR[lang][cle]),
    a:cle => !!F[cle],
    cles:() => Object.keys(F),
    // Les fiches d'une matière (pour la base de connaissances).
    de:mid => Object.values(F).filter(f => f.cle.split('/')[0] === mid)
  };
  window.AMI_COURS = api;
})();
