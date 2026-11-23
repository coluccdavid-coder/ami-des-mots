// Ami des mots — v5.76 : FRANÇAIS, de la 6e au bac (programmes du collège, épreuve anticipée de français).
// La conjugaison est fabriquée à partir de tableaux vérifiés (verbes réguliers du 1er et du 2e groupe, et les
// irréguliers les plus fréquents) : des milliers de questions, toutes justes. Le reste vient de banques écrites.
(function(){
  'use strict';
  if(!window.MATIERES) return;
  const P = ['je', 'tu', 'il', 'nous', 'vous', 'ils'];
  const voyelle = s => /^[aeiouyéèêâîôh]/i.test(s);
  const pron = (i, forme) => i === 0 && voyelle(forme) ? 'j’' : P[i] + ' ';
  // Tableaux : présent, imparfait, futur, conditionnel, passé simple, participe passé, auxiliaire.
  const IRR = {
    'être':{ pr:['suis', 'es', 'est', 'sommes', 'êtes', 'sont'], im:'ét', fu:'ser', ps:['fus', 'fus', 'fut', 'fûmes', 'fûtes', 'furent'], pp:'été', aux:'avoir' },
    'avoir':{ pr:['ai', 'as', 'a', 'avons', 'avez', 'ont'], im:'av', fu:'aur', ps:['eus', 'eus', 'eut', 'eûmes', 'eûtes', 'eurent'], pp:'eu', aux:'avoir' },
    'aller':{ pr:['vais', 'vas', 'va', 'allons', 'allez', 'vont'], im:'all', fu:'ir', ps:['allai', 'allas', 'alla', 'allâmes', 'allâtes', 'allèrent'], pp:'allé', aux:'être' },
    'faire':{ pr:['fais', 'fais', 'fait', 'faisons', 'faites', 'font'], im:'fais', fu:'fer', ps:['fis', 'fis', 'fit', 'fîmes', 'fîtes', 'firent'], pp:'fait', aux:'avoir' },
    'prendre':{ pr:['prends', 'prends', 'prend', 'prenons', 'prenez', 'prennent'], im:'pren', fu:'prendr', ps:['pris', 'pris', 'prit', 'prîmes', 'prîtes', 'prirent'], pp:'pris', aux:'avoir' },
    'venir':{ pr:['viens', 'viens', 'vient', 'venons', 'venez', 'viennent'], im:'ven', fu:'viendr', ps:['vins', 'vins', 'vint', 'vînmes', 'vîntes', 'vinrent'], pp:'venu', aux:'être' },
    'pouvoir':{ pr:['peux', 'peux', 'peut', 'pouvons', 'pouvez', 'peuvent'], im:'pouv', fu:'pourr', ps:['pus', 'pus', 'put', 'pûmes', 'pûtes', 'purent'], pp:'pu', aux:'avoir' },
    'vouloir':{ pr:['veux', 'veux', 'veut', 'voulons', 'voulez', 'veulent'], im:'voul', fu:'voudr', ps:['voulus', 'voulus', 'voulut', 'voulûmes', 'voulûtes', 'voulurent'], pp:'voulu', aux:'avoir' },
    'dire':{ pr:['dis', 'dis', 'dit', 'disons', 'dites', 'disent'], im:'dis', fu:'dir', ps:['dis', 'dis', 'dit', 'dîmes', 'dîtes', 'dirent'], pp:'dit', aux:'avoir' },
    'voir':{ pr:['vois', 'vois', 'voit', 'voyons', 'voyez', 'voient'], im:'voy', fu:'verr', ps:['vis', 'vis', 'vit', 'vîmes', 'vîtes', 'virent'], pp:'vu', aux:'avoir' },
    'savoir':{ pr:['sais', 'sais', 'sait', 'savons', 'savez', 'savent'], im:'sav', fu:'saur', ps:['sus', 'sus', 'sut', 'sûmes', 'sûtes', 'surent'], pp:'su', aux:'avoir' }
  };
  const ER = ['parler', 'chanter', 'aimer', 'jouer', 'regarder', 'danser', 'marcher', 'trouver', 'écouter', 'arriver', 'rêver', 'dessiner'];
  const IR = ['finir', 'choisir', 'grandir', 'réussir', 'remplir', 'rougir'];
  const AUX_ETRE_ER = ['arriver'];
  function tableau(v){
    if(IRR[v]) return IRR[v];
    if(ER.includes(v)){ const r = v.slice(0, -2); return { pr:[r + 'e', r + 'es', r + 'e', r + 'ons', r + 'ez', r + 'ent'], im:r, fu:v, ps:[r + 'ai', r + 'as', r + 'a', r + 'âmes', r + 'âtes', r + 'èrent'], pp:r + 'é', aux:AUX_ETRE_ER.includes(v) ? 'être' : 'avoir' }; }
    const r = v.slice(0, -2); return { pr:[r + 'is', r + 'is', r + 'it', r + 'issons', r + 'issez', r + 'issent'], im:r + 'iss', fu:v, ps:[r + 'is', r + 'is', r + 'it', r + 'îmes', r + 'îtes', r + 'irent'], pp:r + 'i', aux:'avoir' };
  }
  const T_IMP = ['ais', 'ais', 'ait', 'ions', 'iez', 'aient'], T_FUT = ['ai', 'as', 'a', 'ons', 'ez', 'ont'];
  function forme(v, temps, i){
    const t = tableau(v);
    if(temps === 'présent') return t.pr[i];
    if(temps === 'imparfait') return t.im + T_IMP[i];
    if(temps === 'futur') return (t.fu.endsWith('e') && !IRR[v] ? t.fu.slice(0, -1) : t.fu) + T_FUT[i];
    if(temps === 'conditionnel') return (t.fu.endsWith('e') && !IRR[v] ? t.fu.slice(0, -1) : t.fu) + T_IMP[i];
    if(temps === 'passé simple') return t.ps[i];
    if(temps === 'passé composé'){
      if(t.aux === 'être') return ['suis', 'es', 'est', 'sommes', 'êtes', 'sont'][i] + ' ' + t.pp + (i >= 3 ? 's' : '');
      return IRR.avoir.pr[i] + ' ' + t.pp;
    }
    return '';
  }
  const TEMPS_NIV = { '6e':['présent', 'imparfait', 'futur', 'passé composé'], '5e':['présent', 'imparfait', 'futur', 'passé composé', 'passé simple'], '4e':['imparfait', 'futur', 'passé simple', 'conditionnel', 'passé composé'] };
  const tempsDe = n => TEMPS_NIV[n] || ['présent', 'imparfait', 'futur', 'conditionnel', 'passé simple', 'passé composé'];
  const VAN_CONJ = {
    personne:['« {f} » ? Bon temps, mauvaise personne : le verbe a parlé à quelqu’un d’autre. 📞', '« {f} » ? La terminaison s’est trompée de pronom. Elle cherche encore sa place. 🪑', '« {f} » ? Tout est juste sauf la fin. C’est comme mettre les chaussures de ton voisin. 👟'],
    futcond:['« {f} » ? Futur ou conditionnel… « -rai », c’est sûr ; « -rais », c’est peut-être. Là, tu as hésité au mauvais moment. 🤷', '« {f} » ? Un « s » de trop ou de moins, et le futur devient un rêve. Ou l’inverse. 💭'],
    temps:['« {f} » ? Bonne personne, mauvais temps : ton verbe a pris le mauvais train. 🚆', '« {f} » ? Le verbe a voyagé dans le temps sans prévenir. Marty McFly est jaloux. ⏳', '« {f} » ? Ce temps-là existe, mais ce n’est pas celui qu’on t’a demandé. 🕰️'],
    invente:['« {f} » ? Ce verbe vient d’être inventé. L’Académie française n’est pas au courant. 📚', '« {f} » ? Joli essai. Mais ce verbe est irrégulier : il fait ce qu’il veut, et pas ça. 😤']
  };
  const tire = (l, r) => l[Math.floor(r() * l.length)];
  function genConjugaison(r, niveau){
    const verbes = Object.keys(IRR).concat(ER, IR), v = verbes[Math.floor(r() * verbes.length)];
    const temps = tire(tempsDe(niveau), r);
    let i = Math.floor(r() * 6);
    if(temps === 'passé composé' && tableau(v).aux === 'être') i = [2, 5][Math.floor(r() * 2)];
    const bon = pron(i, forme(v, temps, i)) + forme(v, temps, i);
    const faux = [], ajoute = (txt, type) => { if(txt && txt !== bon && !faux.some(f => f.en === txt)) faux.push({ en:txt, vanne:tire(VAN_CONJ[type], r) }); };
    // Erreurs typiques : mauvaise personne, futur/conditionnel, autre temps, forme « régularisée » d'un irrégulier.
    const j = [1, 0, 0, 4, 3, 2][i]; ajoute(pron(i, forme(v, temps, j)) + forme(v, temps, j), 'personne');
    if(temps === 'futur') ajoute(pron(i, forme(v, 'conditionnel', i)) + forme(v, 'conditionnel', i), 'futcond');
    if(temps === 'conditionnel') ajoute(pron(i, forme(v, 'futur', i)) + forme(v, 'futur', i), 'futcond');
    if(IRR[v] && (temps === 'futur' || temps === 'conditionnel')){ const reg = v.replace(/e$/, '') + (temps === 'futur' ? T_FUT[i] : T_IMP[i]); ajoute(pron(i, reg) + reg, 'invente'); }
    if(IRR[v] && temps === 'passé simple' && !['être', 'avoir', 'aller', 'voir', 'savoir'].includes(v)){ const reg = v.replace(/(re|ir|oir)$/, '') + ['ai', 'as', 'a', 'âmes', 'âtes', 'èrent'][i]; ajoute(pron(i, reg) + reg, 'invente'); }
    for(const t2 of melanger(['présent', 'imparfait', 'futur', 'passé simple', 'passé composé'].filter(x => x !== temps), r)){ if(faux.length >= 3) break;
      if(t2 === 'passé composé' && tableau(v).aux === 'être' && i !== 2 && i !== 5) continue; const f = forme(v, t2, i); ajoute(pron(i, f) + f, 'temps'); }
    return { consigne:'Conjugaison', enonce:'Conjugue « ' + v + ' » ' + (/^[aeiou]/.test(temps) ? 'à l’' : 'au ') + temps + ' avec « ' + (i === 0 ? 'je' : P[i]) + ' ».', bon, faux:faux.slice(0, 3),
      regle:temps === 'futur' ? 'Futur : infinitif + -ai, -as, -a, -ons, -ez, -ont (irréguliers : je serai, j’irai, je ferai, je viendrai…).' :
        temps === 'conditionnel' ? 'Conditionnel : radical du futur + terminaisons de l’imparfait (-ais, -ais, -ait, -ions, -iez, -aient).' :
        temps === 'imparfait' ? 'Imparfait : radical du « nous » au présent + -ais, -ais, -ait, -ions, -iez, -aient.' :
        temps === 'passé simple' ? 'Passé simple : -ai, -as, -a, -âmes, -âtes, -èrent pour les verbes en -er ; -is / -us / -ins pour les autres.' :
        temps === 'passé composé' ? 'Passé composé : auxiliaire être ou avoir au présent + participe passé (accordé avec le sujet après « être »).' :
        'Présent : attention aux terminaisons selon la personne (je -e/-s, tu -s, il -e/-t, nous -ons, vous -ez, ils -ent).' };
  }
  const melanger = (l, r) => window.MATIERES.melanger(l, r);
  // Homophones : on choisit le bon mot dans une phrase.
  const VAN_H = {
    'a/à':'Astuce : si tu peux dire « avait », c’est « a ». Sinon, c’est « à ». Là, « {f} » a mis son accent pour rien. 🎩',
    'et/est':'« Et » relie, « est » c’est le verbe être (on peut dire « était »). « {f} » ? Mauvaise prise. 🔌',
    'son/sont':'« Sont » = « étaient » (verbe être) ; « son » = « le sien ». « {f} » s’est trompé de rôle. 🎭',
    'on/ont':'« Ont » = « avaient » ; « on » = « il ». « {f} » ? Le verbe avoir n’a rien demandé. 😤',
    'ces/ses/c’est/s’est':'« ses » = les siens ; « ces » = ceux-là ; « c’est » = cela est ; « s’est » = verbe pronominal. « {f} » a tiré au sort, avoue. 🎲',
    'ou/où':'« Où » (avec accent) parle d’un lieu ou d’un moment ; « ou » = « ou bien ». « {f} » ? L’accent s’est perdu en route. 🧭',
    'ce/se':'« Se » va avec un verbe (il se lave) ; « ce » montre une chose (ce livre). « {f} » ? Mauvais costume. 👔',
    'leur/leurs':'« Leur » devant un verbe ne prend jamais de -s ; devant un nom au pluriel, si. « {f} » ? Le -s s’est invité à la mauvaise fête. 🎉',
    'peu/peut':'« Peut » = verbe pouvoir (pouvait) ; « peu » = pas beaucoup. « {f} » ? Peu probable. 😏',
    'mais/mes':'« Mais » oppose ; « mes » = les miens. « {f} » ? Mes condoléances à la phrase. 🙃',
    'la/là/l’a':'« Là » (accent) = un lieu ; « la » = article ou pronom ; « l’a » = l’avait. « {f} » ? Tu étais presque là. 📍',
    'quand/quant/qu’en':'« Quand » = lorsque ; « quant à » = en ce qui concerne ; « qu’en » = que + en. « {f} » ? Quand même… ⏱️',
    'sa/ça':'« Ça » = cela ; « sa » = la sienne. « {f} » ? Ça ne va pas du tout. 😬'
  };
  const H = [
    ['Il ___ un vélo rouge.', 'a', ['à'], 'a/à'], ['Je vais ___ la piscine.', 'à', ['a'], 'a/à'], ['Elle ___ peur des araignées.', 'a', ['à'], 'a/à'], ['C’est un moulin ___ vent.', 'à', ['a'], 'a/à'],
    ['Le chat ___ le chien jouent.', 'et', ['est'], 'et/est'], ['Le ciel ___ tout bleu.', 'est', ['et'], 'et/est'], ['Il ___ parti tôt.', 'est', ['et'], 'et/est'],
    ['Ils ___ en retard.', 'sont', ['son'], 'son/sont'], ['Il a perdu ___ cartable.', 'son', ['sont'], 'son/sont'], ['Tes amis ___ très drôles.', 'sont', ['son'], 'son/sont'],
    ['Ils ___ gagné le match.', 'ont', ['on'], 'on/ont'], ['___ part à la plage demain.', 'On', ['Ont'], 'on/ont'], ['Mes parents ___ un chien.', 'ont', ['on'], 'on/ont'],
    ['Il range ___ affaires.', 'ses', ['ces', 'c’est', 's’est'], 'ces/ses/c’est/s’est'], ['Regarde ___ nuages là-bas !', 'ces', ['ses', 'c’est', 's’est'], 'ces/ses/c’est/s’est'],
    ['___ mon meilleur ami.', 'C’est', ['S’est', 'Ses', 'Ces'], 'ces/ses/c’est/s’est'], ['Elle ___ levée tôt.', 's’est', ['c’est', 'ses', 'ces'], 'ces/ses/c’est/s’est'],
    ['Tu veux du jus ___ du lait ?', 'ou', ['où'], 'ou/où'], ['___ as-tu caché les clés ?', 'Où', ['Ou'], 'ou/où'], ['Le jour ___ il est né, il neigeait.', 'où', ['ou'], 'ou/où'],
    ['Il ___ brosse les dents.', 'se', ['ce'], 'ce/se'], ['___ gâteau est délicieux.', 'Ce', ['Se'], 'ce/se'],
    ['Je ___ parle souvent (à mes cousins).', 'leur', ['leurs'], 'leur/leurs'], ['Ils ont oublié ___ manteaux.', 'leurs', ['leur'], 'leur/leurs'], ['Elles ont vendu ___ maison.', 'leur', ['leurs'], 'leur/leurs'],
    ['Il ___ venir demain.', 'peut', ['peu'], 'peu/peut'], ['Il mange très ___.', 'peu', ['peut'], 'peu/peut'],
    ['J’ai rangé ___ jouets.', 'mes', ['mais'], 'mais/mes'], ['Il pleut, ___ on sort quand même.', 'mais', ['mes'], 'mais/mes'],
    ['Pose ton sac ___.', 'là', ['la', 'l’a'], 'la/là/l’a'], ['Il ___ vu hier (la voiture).', 'l’a', ['la', 'là'], 'la/là/l’a'], ['Ferme ___ porte.', 'la', ['là', 'l’a'], 'la/là/l’a'],
    ['___ il pleut, je prends mon parapluie.', 'Quand', ['Quant', 'Qu’en'], 'quand/quant/qu’en'], ['___ à moi, je reste ici.', 'Quant', ['Quand', 'Qu’en'], 'quand/quant/qu’en'], ['Qu’est-ce ___ penses-tu ? (que + en)', 'qu’en', ['quand', 'quant'], 'quand/quant/qu’en'],
    ['Elle a oublié ___ trousse.', 'sa', ['ça'], 'sa/ça'], ['___ m’étonnerait beaucoup !', 'Ça', ['Sa'], 'sa/ça']
  ].map(([e, b, f, k]) => [e, b, f.map(x => [x, VAN_H[k]]), VAN_H[k].split(' « {f} »')[0], 'Le bon mot']);
  // Accord du participe passé.
  const ACC = [
    ['Les filles sont (parti) tôt.', 'parties', [['parti', 'Avec « être », on accorde avec le sujet : les filles → parties. Ton participe est resté seul au garçon. 👗'], ['partis', 'Les filles, c’est féminin pluriel : -ies. Là, tu as mis le pluriel masculin. 🎀']], 'Avec « être », le participe s’accorde avec le sujet.'],
    ['Ma sœur est (venu) me voir.', 'venue', [['venu', 'Ta sœur est une fille : venue avec un -e. Sinon, c’est ton frère qui arrive. 👧'], ['venus', 'Un seul personnage, féminin : venue. Pas une foule. 👥']], 'Avec « être », accord avec le sujet.'],
    ['Elles ont (mangé) des pommes.', 'mangé', [['mangées', 'Avec « avoir », on n’accorde pas avec le sujet ! Ton -es a mangé la règle. 🍎'], ['mangés', 'Avec « avoir », pas d’accord avec le sujet. Le -s est de trop.']], 'Avec « avoir », pas d’accord avec le sujet.'],
    ['Les lettres que j’ai (écrit)…', 'écrites', [['écrit', 'Le COD (« que » = les lettres) est placé AVANT avoir : on accorde ! Piège classique, tu as plongé. 🪤'], ['écris', '« Écris » ? C’est le verbe au présent, pas le participe. Mauvais rayon. 🛒']], 'Avec « avoir », on accorde avec le COD placé avant le verbe.'],
    ['La chanson qu’il a (chanté) était belle.', 'chantée', [['chanté', 'Le COD « qu’ » (la chanson) est avant : accord au féminin. Ta chanson a perdu son -e. 🎵'], ['chantés', 'La chanson : féminin singulier, -ée. Pas un chœur entier. 🎤']], 'COD placé avant « avoir » : accord.'],
    ['Nous sommes (allé) au cinéma (Léo et Tom).', 'allés', [['allé', 'Nous = plusieurs garçons : allés, avec un -s. Tu es parti tout seul au cinéma ? 🍿'], ['allées', 'Léo et Tom sont des garçons : allés. Pas allées. 🎬']], 'Avec « être », accord avec le sujet.'],
    ['Ils ont (fini) leurs devoirs.', 'fini', [['finis', 'Avec « avoir » et le COD après : pas d’accord. Les devoirs ne sont pas encore arrivés dans la phrase ! 📒'], ['finit', '« Finit », c’est le présent. On voulait le participe passé. ⏱️']], 'Avec « avoir », pas d’accord si le COD est après.']
  ];
  // Nature des mots.
  const NAT = [
    ['Dans « Le chat dort », « dort » est :', 'un verbe', [['un nom', 'On peut le conjuguer (il dormait) : c’est un verbe. Un nom ne se conjugue pas. 😴'], ['un adjectif', 'Un adjectif décrit un nom. « Dort » raconte une action : verbe. 🛌'], ['un adverbe', 'Un adverbe est invariable et modifie un verbe. « Dort » EST le verbe. 💤']], 'Le verbe se conjugue et exprime une action ou un état.'],
    ['Dans « une maison immense », « immense » est :', 'un adjectif', [['un nom', '« Immense » décrit la maison : c’est un adjectif. Tu ne peux pas habiter dans « immense ». 🏠'], ['un verbe', 'On ne peut pas dire « j’immense ». Ce n’est pas un verbe. 🚫'], ['un adverbe', 'Il s’accorde (des maisons immenses) : adjectif. Un adverbe, lui, ne bouge pas. 🗿']], 'L’adjectif qualificatif décrit un nom et s’accorde avec lui.'],
    ['Dans « Il court vite », « vite » est :', 'un adverbe', [['un adjectif', '« Vite » modifie le verbe « court » et ne s’accorde pas : adverbe. 🏃'], ['un nom', 'On ne peut pas mettre « le » devant : pas un nom. 🙅'], ['un verbe', '« Vite » ne se conjugue pas. Essaie « je vite »… non. 😅']], 'L’adverbe est invariable ; il modifie un verbe, un adjectif ou un autre adverbe.'],
    ['Dans « Elle chante sous la pluie », « sous » est :', 'une préposition', [['un adverbe', '« Sous » introduit un groupe (sous la pluie) : préposition. ☔'], ['une conjonction', 'Une conjonction relie deux propositions (mais, quand…). « Sous » introduit juste « la pluie ». 🌧️'], ['un déterminant', 'Le déterminant, c’est « la ». « Sous » est devant lui. 🔍']], 'La préposition introduit un complément (à, de, dans, sous, sur, avec…).'],
    ['Dans « Je pense qu’il viendra », « que » (qu’) est :', 'une conjonction de subordination', [['un pronom relatif', 'Il n’y a pas de nom remplacé avant : c’est une conjonction de subordination. 🔗'], ['un déterminant', 'Un déterminant va devant un nom. Ici, il y a « il viendra » derrière. 🙃'], ['un adverbe', 'Il introduit une proposition subordonnée : conjonction. 🧩']], 'La conjonction de subordination (que, quand, si, parce que…) introduit une subordonnée.'],
    ['Dans « Le livre que je lis », « que » est :', 'un pronom relatif', [['une conjonction de subordination', '« Que » remplace « le livre » (je lis le livre) : pronom relatif. 📖'], ['un adverbe', 'Il remplace un nom : c’est un pronom. 🔁'], ['un déterminant', 'Pas de nom juste après : ce n’est pas un déterminant. 🚫']], 'Le pronom relatif (qui, que, dont, où) reprend un nom : l’antécédent.'],
    ['Dans « Ces fleurs sentent bon », « ces » est :', 'un déterminant', [['un pronom', '« Ces » est devant le nom « fleurs » : déterminant (démonstratif). 🌸'], ['un adjectif qualificatif', 'Il ne décrit pas les fleurs, il les montre : déterminant démonstratif. 👉'], ['une préposition', 'Pas de complément introduit ici : c’est un déterminant. 🙅']], 'Le déterminant se place devant le nom (le, une, ces, mon, quelques…).'],
    ['Dans « Lui, il a tout compris », « lui » est :', 'un pronom', [['un nom', '« Lui » remplace une personne : pronom personnel. 👤'], ['un déterminant', 'Aucun nom après lui. Il est tout seul : pronom. 🧍'], ['un adverbe', 'Il remplace quelqu’un : pronom. 🔄']], 'Le pronom remplace un nom ou un groupe nominal.']
  ];
  // Fonctions dans la phrase.
  const FON = [
    ['Dans « Léa mange une pomme », « une pomme » est :', 'COD', [['sujet', 'Qui mange ? Léa. Le sujet, c’est elle. La pomme, elle, se fait manger : COD. 🍏'], ['COI', 'Pas de préposition : « manger quoi ? une pomme » → COD. 🎯'], ['attribut du sujet', 'L’attribut va avec être, sembler, paraître… Pas avec manger. 🍽️']], 'COD : on le trouve avec « verbe + quoi ? / qui ? », sans préposition.'],
    ['Dans « Il parle à son frère », « à son frère » est :', 'COI', [['COD', 'Il y a une préposition « à » : c’est un COI. Le COD n’en a jamais. 📮'], ['complément circonstanciel', 'On ne peut ni le supprimer ni le déplacer facilement : il complète le verbe. COI. 🔒'], ['sujet', 'Le sujet, c’est « il ». Le frère reçoit la parole : COI. 🗣️']], 'COI : complément introduit par une préposition (à, de…), qu’on ne peut pas déplacer.'],
    ['Dans « Ma tante est médecin », « médecin » est :', 'attribut du sujet', [['COD', 'Avec « être », pas de COD : « médecin » dit ce qu’est ta tante → attribut. 🩺'], ['sujet', 'Le sujet, c’est « ma tante ». 👩'], ['complément du nom', 'Il ne complète pas un nom avec « de » : c’est l’attribut du sujet. 🏷️']], 'Attribut du sujet : après être, sembler, devenir, paraître, rester…'],
    ['Dans « Hier, nous sommes allés à Paris », « Hier » est :', 'complément circonstanciel de temps', [['COD', '« Hier » dit QUAND. On peut le déplacer ou le supprimer : complément circonstanciel de temps. 📅'], ['sujet', 'Le sujet, c’est « nous ». « Hier » ne fait rien, il donne la date. 🗓️'], ['complément circonstanciel de lieu', '« Hier » ne dit pas OÙ mais QUAND. Le lieu, c’est Paris. 🗼']], 'Les compléments circonstanciels (temps, lieu, manière, cause…) se déplacent et se suppriment.'],
    ['Dans « Le chien de Paul aboie », « de Paul » est :', 'complément du nom', [['COI', '« De Paul » complète le nom « chien », pas le verbe : complément du nom. 🐕'], ['sujet', 'Le sujet, c’est « le chien de Paul » en entier ; « de Paul » le précise. 🔍'], ['complément circonstanciel', 'Il ne se déplace pas : « De Paul le chien aboie » ? Non. Complément du nom. 🙅']], 'Le complément du nom précise un nom, souvent avec « de ».'],
    ['Dans « Dans la cour, les enfants jouent », « les enfants » est :', 'sujet', [['COD', 'Qui joue ? Les enfants : c’est le sujet. 🧒'], ['complément circonstanciel de lieu', 'Le lieu, c’est « dans la cour ». « Les enfants » font l’action : sujet. ⚽'], ['attribut du sujet', 'Pas de verbe d’état ici. Ce sont eux qui jouent : sujet. 🎈']], 'Le sujet répond à « qui est-ce qui ? » + verbe.']
  ];
  // Figures de style.
  const FIG = [
    ['« Ses yeux brillent comme des étoiles. »', 'une comparaison', [['une métaphore', 'Il y a « comme » : c’est une comparaison. La métaphore, elle, se passe de « comme ». ⭐'], ['une personnification', 'Les yeux sont déjà humains. Ici, on compare avec « comme ». 👀'], ['une hyperbole', 'Ce n’est pas une exagération énorme, c’est un rapprochement avec « comme ». 🔭']], 'Comparaison : rapprochement avec un outil (comme, tel, pareil à…).'],
    ['« Cet homme est un lion. »', 'une métaphore', [['une comparaison', 'Pas de « comme » : c’est une métaphore. Personne ne va lui donner de la viande crue. 🦁'], ['une personnification', 'On ne donne pas des traits humains à une chose : on assimile l’homme à un lion. Métaphore. 🐾'], ['une litote', 'La litote dit moins pour suggérer plus. Ici on dit carrément « un lion ». 🔊']], 'Métaphore : rapprochement sans outil de comparaison.'],
    ['« Le vent hurlait de colère. »', 'une personnification', [['une comparaison', 'Pas de « comme ». Le vent pousse des cris de colère comme une personne : personnification. 🌬️'], ['une hyperbole', 'On ne grossit pas un fait : on prête des sentiments humains au vent. 😠'], ['une anaphore', 'L’anaphore répète un mot en début de phrase. Ici, rien n’est répété. 🔁']], 'Personnification : donner des caractéristiques humaines à une chose ou un animal.'],
    ['« Je meurs de faim. »', 'une hyperbole', [['une litote', 'C’est l’inverse : on exagère à fond. Personne ne meurt avant le goûter. 🍕'], ['une métaphore', 'Ce n’est pas un rapprochement d’images, c’est une énorme exagération. 📢'], ['un euphémisme', 'L’euphémisme adoucit. Là, on dramatise. 🎭']], 'Hyperbole : exagération.'],
    ['« Va, je ne te hais point. » (Le Cid)', 'une litote', [['une hyperbole', 'On dit MOINS (« je ne te hais point ») pour faire comprendre PLUS (« je t’aime »). Litote. 💘'], ['un oxymore', 'Pas de mots contraires collés. C’est une litote. 🧩'], ['une comparaison', 'Aucun « comme » à l’horizon. 🔭']], 'Litote : dire moins pour suggérer plus.'],
    ['« Cette obscure clarté qui tombe des étoiles » (Corneille)', 'un oxymore', [['une antithèse', 'Les deux contraires sont collés dans le même groupe (« obscure clarté ») : oxymore. L’antithèse les oppose plus loin. 🌗'], ['une hyperbole', 'Rien d’exagéré : on associe deux mots contraires. ☯️'], ['une personnification', 'La clarté ne fait rien d’humain ici. 🔦']], 'Oxymore : deux mots de sens opposés réunis dans une même expression.'],
    ['« Rome, l’unique objet de mon ressentiment ! Rome, à qui vient ton bras d’immoler mon amant ! » (Corneille)', 'une anaphore', [['une gradation', 'Le même mot (« Rome ») revient en début de vers : anaphore. 🏛️'], ['une litote', 'Aucune atténuation ici, plutôt de la colère répétée. 😤'], ['une métaphore', 'Le procédé qui saute aux yeux, c’est la répétition de « Rome ». 🔁']], 'Anaphore : répétition d’un mot en début de vers ou de phrase.'],
    ['« Il est parti » (pour dire « il est mort »)', 'un euphémisme', [['une litote', 'On adoucit une réalité pénible : euphémisme. La litote, elle, suggère plus fort. 🕊️'], ['une hyperbole', 'Au contraire, on atténue. 🔉'], ['une antithèse', 'Pas d’idées opposées mises face à face. ⚖️']], 'Euphémisme : atténuer une réalité dure ou choquante.'],
    ['« Va, cours, vole, et nous venge ! » (Corneille)', 'une gradation', [['une anaphore', 'Les verbes ne se répètent pas : ils montent en intensité. Gradation. 📈'], ['un oxymore', 'Aucun contraire ici, juste une accélération. 🏃'], ['une litote', 'Rien d’atténué : ça monte en puissance. 🚀']], 'Gradation : termes de plus en plus forts (ou faibles).'],
    ['« Pour qui sont ces serpents qui sifflent sur vos têtes ? » (Racine)', 'une allitération', [['une assonance', 'Ce sont des CONSONNES qui se répètent (le son « s ») : allitération. L’assonance, c’est les voyelles. 🐍'], ['une anaphore', 'On ne répète pas un mot, mais un son. 🎶'], ['une comparaison', 'Pas de « comme » : c’est un jeu de sons. 🔊']], 'Allitération : répétition d’un son consonne.']
  ];
  // Vocabulaire.
  const VOC = [
    ['Le contraire de « généreux » :', 'avare', [['gentil', '« Gentil » n’est pas le contraire, c’est presque un cousin. 🤝'], ['riche', 'On peut être riche ET généreux. Le contraire, c’est avare. 💰'], ['heureux', 'Rien à voir avec la générosité. 😊']], 'Antonyme : mot de sens contraire.'],
    ['Un synonyme de « rapide » :', 'véloce', [['lent', 'C’est l’inverse ! Ton escargot est vexé. 🐌'], ['lourd', 'Lourd et rapide, c’est rare. ⚓'], ['bruyant', 'Rapide ne veut pas dire bruyant. Une flèche est silencieuse. 🏹']], 'Synonyme : mot de sens proche.'],
    ['Le préfixe de « impossible » signifie :', 'le contraire', [['avant', '« Pré- » veut dire avant. « Im- / in- », c’est le contraire. ⏮️'], ['de nouveau', 'Ça, c’est « re- » (refaire). 🔁'], ['très', 'Pas de « très » dans « impossible ». C’est « pas possible ». 🚫']], 'Préfixe in- / im- / il- / ir- : sens contraire (inutile, illisible, irréel).'],
    ['« Anticonstitutionnellement » est formé avec le préfixe « anti- » qui veut dire :', 'contre', [['avant', '« Anti- » = contre (antivol, antivirus). « Ante- » veut dire avant. 🛡️'], ['après', 'Ça serait « post- ». 📮'], ['beaucoup', '« Anti- » est contre, pas beaucoup. 🙅']], 'Anti- : contre.'],
    ['Le mot de la même famille que « terre » :', 'souterrain', [['tellement', 'Aucun lien avec la terre : juste un son proche. 🌍'], ['terrible', 'Piège ! « Terrible » vient de « terreur », pas de « terre ». 😱'], ['tirelire', 'Tirelire et terre ? Rien en commun à part tes économies. 🐷']], 'Famille de mots : même radical et même sens de base (terre, terrain, souterrain, atterrir).']
  ];
  // Littérature (lycée : épreuve anticipée de français) : auteurs, œuvres, mouvements.
  const LIT = [
    ['Qui a écrit « Les Misérables » ?', 'Victor Hugo', [['Émile Zola', 'Zola, c’est « Germinal ». Jean Valjean appartient à Victor Hugo. 📚'], ['Molière', 'Molière écrivait du théâtre au XVIIe siècle. Les Misérables, c’est Hugo, en 1862. 🎭'], ['Voltaire', 'Voltaire, c’est « Candide ». Mauvais siècle, mauvais rayon. 🕯️']], 'Victor Hugo, « Les Misérables » (1862), roman romantique.'],
    ['« Germinal » est un roman de :', 'Émile Zola', [['Honoré de Balzac', 'Balzac, c’est « Le Père Goriot ». Les mineurs de Germinal, c’est Zola. ⛏️'], ['Gustave Flaubert', 'Flaubert, c’est « Madame Bovary ». 📖'], ['Guy de Maupassant', 'Maupassant, c’est « Bel-Ami ». Bon courant, mauvais auteur. ✒️']], 'Zola, « Germinal » (1885), naturalisme.'],
    ['« Candide » (1759) appartient au mouvement des :', 'Lumières', [['Romantisme', 'Le romantisme arrive au XIXe siècle. Candide, c’est Voltaire et les Lumières. 💡'], ['Surréalisme', 'Le surréalisme, c’est le XXe siècle. Voltaire serait perdu. 🌀'], ['Humanisme', 'L’humanisme, c’est le XVIe siècle (Rabelais, Montaigne). 📜']], 'Les Lumières (XVIIIe) : Voltaire, Diderot, Rousseau, Montesquieu.'],
    ['« Les Fleurs du mal » (1857) sont de :', 'Charles Baudelaire', [['Arthur Rimbaud', 'Rimbaud, c’est « Le Bateau ivre ». Les Fleurs du mal, c’est Baudelaire. 🌹'], ['Paul Verlaine', 'Verlaine, c’est « Poèmes saturniens ». 🎻'], ['Guillaume Apollinaire', 'Apollinaire, c’est « Alcools », en 1913. 🍷']], 'Baudelaire, « Les Fleurs du mal » (1857), poésie.'],
    ['Molière a écrit :', 'Le Misanthrope', [['Phèdre', '« Phèdre », c’est Racine : une tragédie. Molière, lui, faisait rire. 🎭'], ['Le Cid', '« Le Cid », c’est Corneille. 🗡️'], ['Gargantua', '« Gargantua », c’est Rabelais, au XVIe siècle. 🍗']], 'Molière (XVIIe, classicisme) : comédies comme « Le Misanthrope », « Tartuffe », « Le Malade imaginaire ».'],
    ['Quel mouvement associe Zola et Maupassant ?', 'le naturalisme', [['le romantisme', 'Le romantisme, c’est Hugo, Lamartine, Musset. Zola, c’est le naturalisme. 🔬'], ['le classicisme', 'Le classicisme, c’est le XVIIe siècle. Trop tôt de deux siècles. ⏰'], ['le symbolisme', 'Le symbolisme, c’est Verlaine et Mallarmé, en poésie. 🎼']], 'Naturalisme (fin XIXe) : Zola, Maupassant ; décrire la société de façon quasi scientifique.'],
    ['« L’Étranger » (1942) est un roman d’ :', 'Albert Camus', [['Jean-Paul Sartre', 'Sartre a écrit « La Nausée ». Meursault, c’est Camus. ☀️'], ['Eugène Ionesco', 'Ionesco écrivait du théâtre (« Rhinocéros »). 🦏'], ['Marcel Proust', 'Proust, c’est « À la recherche du temps perdu ». 🍪']], 'Camus, « L’Étranger » (1942).'],
    ['Montaigne et Rabelais appartiennent à :', 'l’humanisme', [['les Lumières', 'Les Lumières, c’est le XVIIIe. Montaigne et Rabelais, c’est le XVIe : humanisme. 📜'], ['le réalisme', 'Le réalisme, c’est Balzac et Flaubert, au XIXe. 🏙️'], ['le surréalisme', 'Le surréalisme, c’est Breton, au XXe. 🌀']], 'Humanisme (XVIe) : Rabelais, Montaigne, du Bellay, Ronsard.'],
    ['« Phèdre » de Racine est :', 'une tragédie', [['une comédie', 'Chez Racine, on ne rit pas beaucoup : c’est une tragédie. 😢'], ['un roman', 'C’est du théâtre, en vers. 🎭'], ['une fable', 'Les fables, c’est La Fontaine. 🦊']], 'Racine (XVIIe) : tragédies classiques en alexandrins.'],
    ['Un alexandrin est un vers de :', '12 syllabes', [['10 syllabes', 'Ça, c’est le décasyllabe. L’alexandrin en a 12. 🔢'], ['8 syllabes', 'Ça, c’est l’octosyllabe. 🎵'], ['14 syllabes', 'Un peu trop long : l’alexandrin s’arrête à 12. ✋']], 'Alexandrin : vers de 12 syllabes.']
  ];
  window.MATIERES.ajouter({ id:'francais', nom:'Français', ic:'📝', examens:{ '3e':'Brevet blanc de français', '1re':'Bac de français blanc' },
    chapitres:[
      { id:'conjugaison', nom:'Conjugaison', dom:'Le verbe', niv:['6e', '5e', '4e', '3e', '2nde'], gen:genConjugaison },
      { id:'homophones', nom:'Homophones (a/à, et/est…)', dom:'Orthographe', niv:['6e', '5e', '4e', '3e'], banque:H },
      { id:'accords', nom:'Accord du participe passé', dom:'Orthographe', niv:['5e', '4e', '3e', '2nde'], banque:ACC },
      { id:'nature', nom:'Nature des mots', dom:'Grammaire', niv:['6e', '5e', '4e', '3e'], banque:NAT },
      { id:'fonctions', nom:'Fonctions dans la phrase', dom:'Grammaire', niv:['6e', '5e', '4e', '3e', '2nde'], banque:FON },
      { id:'vocabulaire', nom:'Vocabulaire', dom:'Lexique', niv:['6e', '5e', '4e'], banque:VOC },
      { id:'figures', nom:'Figures de style', dom:'Lire les textes', niv:['4e', '3e', '2nde', '1re'], banque:FIG },
      { id:'litterature', nom:'Auteurs, œuvres, mouvements', dom:'Littérature', niv:['3e', '2nde', '1re'], banque:LIT }
    ] });
  window.MATIERES._francais = { forme, tableau, pron };
})();
