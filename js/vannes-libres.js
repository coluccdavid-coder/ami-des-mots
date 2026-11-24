// Ami des mots — « Clash libre » : on se vanne, tout simplement, entre potes (un téléphone, chacun son tour).
// Chaque vanne existe en anglais et en français : on chambre en apprenant des expressions d'aujourd'hui
// (skill issue, aura, NPC, mid, no cap…). On points d'« aura » : 😂 +3, 🔥 +5, 🙄 0, 🚫 trop méchant −2.
// Règle d'or : on vise ce qu'on fait (le jeu, les devoirs, le téléphone, la playlist…), JAMAIS la personne :
// ni physique, ni famille, ni origine, ni religion, ni handicap, ni argent. Les vannes écrites passent au juge.
(function(){
  'use strict';
  // [id, icône, nom, [[anglais, français], …]]
  const CATEGORIES = [
    ['wesh', '🔥', 'Wesh gros (ça pique)', [
      ['Bro, you’re wild. Wrong answer, full confidence.', 'Wesh gros, t’es un ouf : mauvaise réponse, confiance à fond.'],
      ['Bruh. Even autocorrect gave up on you.', 'Wesh, même le correcteur automatique a lâché l’affaire avec toi.'],
      ['Fam, your plan had zero steps and it still failed.', 'Frérot, ton plan avait zéro étape et il a quand même raté.'],
      ['It’s not the Wi-Fi lagging, bro. It’s you.', 'C’est pas le wifi qui lag, gros. C’est toi.'],
      ['Bro thinks he’s the final boss. He’s the tutorial.', 'Il se prend pour le boss final, gros. C’est le tuto.'],
      ['Bro got outplayed by a door.', 'Wesh, il a perdu un duel contre une porte.'],
      ['Bro is speedrunning bad decisions.', 'Il fait un speedrun des mauvaises décisions, le gars.'],
      ['You’re a legend, bro… the legend of the wrong answer.', 'T’es une légende, gros… la légende de la mauvaise réponse.'],
      ['Chill, bro. Even your shadow left you on read.', 'Tranquille, gros. Même ton ombre t’a laissé en vu.'],
      ['Bro said “trust me” and the GPS logged off.', 'Il a dit « t’inquiète » et le GPS s’est déconnecté.'],
      ['You cooked… and the smoke alarm started clapping.', 'T’as cuisiné… et le détecteur de fumée s’est mis à applaudir.'],
      ['Your confidence is a bug, fam. Please report it.', 'Ta confiance, c’est un bug, frérot. Signale-le.'],
      ['You’re crazy, bro: you studied the wrong test with full focus.', 'T’es un ouf, toi : t’as révisé le mauvais contrôle à fond.'],
      ['Bro, your comeback arrived by post.', 'Wesh gros, ta riposte est arrivée par La Poste.']
    ]],
    ['jeu', '🎮', 'Skill issue (le jeu)', [
      ['Skill issue.', 'Problème de niveau. C’est tout.'],
      ['You play like the tutorial is still on.', 'Tu joues comme si le tuto était encore activé.'],
      ['Your aim is on airplane mode.', 'Ta visée est en mode avion.'],
      ['Even the loading screen is faster than you.', 'Même l’écran de chargement va plus vite que toi.'],
      ['Your best combo is the pause button.', 'Ton meilleur combo, c’est le bouton pause.'],
      ['You got lost in a straight corridor.', 'Tu t’es perdu dans un couloir tout droit.'],
      ['The boss felt sorry for you and slowed down.', 'Le boss a eu pitié et a ralenti.'],
      ['Your controller asked for a new player.', 'Ta manette a demandé un nouveau joueur.']
    ]],
    ['aura', '✨', 'Aura & NPC', [
      ['That move was minus one thousand aura.', 'Ce coup-là : moins mille d’aura.'],
      ['NPC energy detected.', 'Énergie de PNJ détectée.'],
      ['Your aura just went offline.', 'Ton aura vient de passer hors ligne.'],
      ['Mid. Very mid.', 'Moyen. Très moyen.'],
      ['That joke was so mid, even the Wi-Fi left.', 'Cette blague était tellement moyenne que même le wifi est parti.'],
      ['You walked in like a main character and tripped on the intro.', 'Tu es arrivé comme le héros du film et tu as trébuché dans le générique.'],
      ['Your vibe needs a software update.', 'Ton style a besoin d’une mise à jour.'],
      ['It’s giving… background character.', 'Ça fait… figurant au fond de l’image.']
    ]],
    ['ecole', '📚', 'Devoirs & école', [
      ['Your homework has been loading since September.', 'Tes devoirs chargent depuis septembre.'],
      ['Your excuses have more chapters than your textbook.', 'Tes excuses ont plus de chapitres que ton manuel.'],
      ['The teacher said “test tomorrow” and you heard “party tomorrow”.', 'Le prof a dit « contrôle demain » et tu as entendu « fête demain ».'],
      ['Your pencil case is just a home for crumbs.', 'Ta trousse, c’est juste une maison pour les miettes.'],
      ['You revised so little, your notebook asked for your name.', 'Tu as tellement peu révisé que ton cahier t’a demandé ton prénom.'],
      ['Your homework says “the dog ate me”.', 'Tes devoirs disent : « le chien m’a mangé ».'],
      ['You copied the answers… from the wrong subject.', 'Tu as copié les réponses… de la mauvaise matière.']
    ]],
    ['tel', '📱', 'Téléphone & réseaux', [
      ['Your screen time is a full-time job.', 'Ton temps d’écran, c’est un CDI.'],
      ['Your phone needs a holiday away from you.', 'Ton téléphone a besoin de vacances loin de toi.'],
      ['You reply “ok” so slowly, the “k” arrives next week.', 'Tu réponds « ok » tellement lentement que le « k » arrive la semaine prochaine.'],
      ['Your battery lasts longer than your attention span.', 'Ta batterie tient plus longtemps que ta concentration.'],
      ['Your best post got three likes: you, you and your other account.', 'Ton meilleur post a eu trois likes : toi, toi et ton deuxième compte.'],
      ['You left the group chat and nobody noticed for a week.', 'Tu as quitté le groupe et personne ne l’a vu pendant une semaine.'],
      ['Your typing bubble has been there since last Tuesday.', 'Ta bulle « en train d’écrire » est là depuis mardi dernier.']
    ]],
    ['vie', '🍳', 'La vie de tous les jours', [
      ['You burnt cereal. Cereal.', 'Tu as cramé des céréales. Des céréales.'],
      ['Your alarm clock gave up on you.', 'Ton réveil a démissionné.'],
      ['Your playlist sounds like a shopping centre lift.', 'Ta playlist sonne comme l’ascenseur d’un centre commercial.'],
      ['You dance like the music is buffering.', 'Tu danses comme si la musique était en train de charger.'],
      ['Your room is a museum of lost socks.', 'Ta chambre, c’est le musée des chaussettes perdues.'],
      ['You pushed a door that said “pull”. Twice.', 'Tu as poussé une porte où c’était écrit « tirez ». Deux fois.'],
      ['Your sense of direction uses a broken map.', 'Ton sens de l’orientation utilise une carte déchirée.']
    ]],
    // v5.88 : sélection de David, triée comme le ferait l'IA du jeu (on vise la copie, le travail, les excuses — pas la personne).
    ['repartie', '🧠', 'Réparties du tac au tac', [
      ['They say silence is golden. Try it, you’d save a fortune.', 'Tu sais, le silence est d’or. Tu devrais essayer, ça te ferait des économies.'],
      ['I’d agree with you, but then we’d both be wrong.', 'Je suis d’accord avec toi, mais comme ça on aurait tous les deux tort.'],
      ['I admire your confidence. It takes guts to say that out loud.', 'J’admire ta confiance en toi. Franchement, il en faut pour dire ça à voix haute.'],
      ['If your joke were a spice, it would be flour.', 'Si ta blague était une épice, ce serait de la farine.'],
      ['Don’t worry, even the pros started somewhere… not this low, but still.', 'T’inquiète, même les pros ont commencé quelque part… bon, pas aussi bas, mais quand même.'],
      ['You talk a lot to say nothing: a draft essay that never found its question.', 'Tu parles beaucoup pour ne rien dire : le brouillon d’une dissert qui n’a jamais trouvé sa problématique.'],
      ['Your ego is inversely proportional to your average.', 'T’as un ego inversement proportionnel à ta moyenne générale.']
    ]],
    ['absurde', '🌀', 'Absurde (ça déstabilise)', [
      ['You’re the type to check the weather before going to the swimming pool.', 'T’es le genre à vérifier la météo avant d’aller à la piscine.'],
      ['You’re the type who blows on ice cream because it’s too cold.', 'T’es le genre à souffler sur ta glace parce qu’elle est trop froide.'],
      ['Even downhill with the wind behind them, your ideas struggle to get started.', 'Même en descente avec le vent dans le dos, tes idées ont du mal à démarrer.'],
      ['You could mess up boiling water.', 'T’es capable de rater de l’eau bouillante.'],
      ['You’re so late, even your shadow just got here.', 'T’arrives tellement tard que même ton ombre vient d’arriver.'],
      ['You’d miss the ocean falling off a boat.', 'Tu serais capable de rater l’océan en tombant d’un bateau.']
    ]],
    ['matieres', '📐', 'Matières (du collège au bac)', [
      ['Your answer is like x: nobody knows where it came from and everyone’s looking for its value.', 'Ta réponse, c’est comme le x : personne ne sait d’où elle sort et tout le monde cherche sa valeur.'],
      ['Your average and 10 out of 20 are like an asymptote: closer and closer, but they never touch.', 'Ta moyenne et la barre des 10, c’est une asymptote : ça s’approche, mais ça se touche jamais.'],
      ['Even a circle has more sides than your argument.', 'Même un cercle a plus de côtés que ton argumentation.'],
      ['Even with a binomial law, the probability you get this chapter tends to zero.', 'Même avec une loi binomiale, la probabilité que tu captes ce chapitre tend vers zéro.'],
      ['Your proof by induction is so shaky, even the base case is wrong.', 'Ton raisonnement par récurrence est tellement bancal que même l’initialisation est fausse.'],
      ['Your answer is a division by zero: forbidden, meaningless, and it crashes everything.', 'Ta réponse, c’est une division par zéro : interdite, absurde, et ça fait tout planter.'],
      ['Your focus curve is strictly decreasing from the very first second.', 'La courbe de ta concentration est strictement décroissante dès la première seconde.'],
      ['Your maths level is so negative, not even an absolute value can help.', 'Ton niveau en maths est tellement négatif que même une valeur absolue peut plus rien pour toi.'],
      ['Your essay is so empty that even skipping three lines per sentence, it wouldn’t fill a double sheet.', 'Ta copie est tellement vide que même en sautant trois lignes par phrase, tu remplirais pas une copie double.'],
      ['You look as lost as someone reading Molière without the footnotes.', 'T’as l’air aussi perdu que quelqu’un qui lit du Molière sans les notes de bas de page.'],
      ['Descartes said “I think, therefore I am.” Your essay doesn’t exist yet.', 'Descartes a dit « Je pense, donc je suis ». Ta copie, elle, n’existe pas encore.'],
      ['Your school year is a classical tragedy: lots of drama, zero action, and everyone knows how it ends.', 'Ton année, c’est une tragédie classique : beaucoup de drama, zéro action, et tout le monde sait comment ça finit.'],
      ['Your arguments are so off-topic, the examiner thinks they grabbed the wrong pile.', 'Tes arguments sont tellement hors sujet que le correcteur croit qu’il a pris la mauvaise pile de copies.'],
      ['Your excuses are like irregular verbs: unpredictable and impossible to remember.', 'Tes excuses, c’est comme les verbes irréguliers : imprévisibles et impossibles à retenir.'],
      ['When you conjugate in English, even the translator adds a question mark.', 'Quand tu conjugues en anglais, même le traducteur met un point d’interrogation.'],
      ['Apart from “hola” and “biblioteca”, your Spanish fits on a canteen ticket.', 'À part « hola » et « biblioteca », ton espagnol tient sur un ticket de cantine.'],
      ['You’re so behind on revision, the French Revolution is still breaking news for you.', 'T’as tellement de révisions en souffrance que pour toi, la Révolution française, c’est encore l’actu.'],
      ['You skipped so many lessons, you think the Hundred Years’ War was a one-week misunderstanding.', 'T’as séché tellement de cours que pour toi, la guerre de Cent Ans, c’était un malentendu d’une semaine.'],
      ['Your memory is so short, yesterday morning’s lesson is already ancient history.', 'Ta mémoire est tellement courte que le cours d’hier matin, c’est déjà de l’histoire ancienne.'],
      ['Even with a map and a compass, you’d get lost on a world map.', 'Même avec une carte et une boussole, tu te perdrais sur le planisphère.'],
      ['You think Australia is next door to Austria.', 'Tu crois que l’Australie est à côté de l’Autriche.'],
      ['Your diplomacy is so bad, you could start a cold war asking for the time.', 'Ta diplomatie est tellement ratée que tu déclencherais une guerre froide en demandant l’heure.'],
      ['Your answer took so long, light had time to go around the Earth a million times.', 'Ta réponse a mis tellement de temps que la lumière a eu le temps de faire un million de fois le tour de la Terre.'],
      ['Between your notes and this lesson, there’s zero chemical reaction.', 'Entre tes notes et ce cours, aucune réaction chimique.'],
      ['You’re like a noble gas: you take up space but react to absolutely nothing.', 'T’es comme un gaz noble : tu prends de la place, mais tu réagis avec absolument rien.'],
      ['You have the kinetic energy of a pebble at the bottom of a lake.', 'T’as autant d’énergie cinétique qu’un caillou au fond d’un lac.'],
      ['You have so much inertia in the morning, it would take a catapult to get you working.', 'T’as tellement d’inertie le matin qu’il faudrait une catapulte pour te mettre au travail.'],
      ['Your reflexes still send messages by carrier pigeon.', 'Tes réflexes envoient encore leurs messages par pigeon voyageur.'],
      ['Your code has so many bugs, the compiler resigned.', 'Ton code a tellement de bugs que le compilateur a posé sa démission.'],
      ['You’re like an infinite loop in Python: you go round in circles and overheat everyone.', 'T’es comme une boucle infinie en Python : tu tournes en rond et tu fais surchauffer tout le monde.'],
      ['Your revision method runs on 2 MB of RAM.', 'Ta méthode de révision tourne avec 2 Mo de RAM.'],
      ['Even with a 3D plan and the instructions, you couldn’t build a stool.', 'Même avec un plan en 3D et la notice, tu saurais pas monter un tabouret.'],
      ['Your artwork is abstract art: nobody gets it and everyone is being polite.', 'Ton œuvre, c’est de l’art abstrait : personne comprend et tout le monde fait semblant d’être poli.'],
      ['You’re a perfect lesson in supply and demand: nobody asked, yet you still supplied.', 'T’es la loi de l’offre et de la demande : personne t’a rien demandé, mais tu ramènes quand même ta fraise.'],
      ['Your grades have been in recession since September.', 'Tes notes sont en pleine récession depuis la rentrée.'],
      ['You’ve had a monopoly on bad ideas since the start of the year.', 'T’as le monopole des mauvaises idées depuis le début de l’année.'],
      ['Your revision is a deadweight loss: big investment, zero return.', 'Tes révisions, c’est une perte sèche : beaucoup d’investissement, zéro rendement.']
    ]],
    ['exam', '📝', 'Contrôles, bac & Parcoursup', [
      ['You’re so unprepared, the invigilator will feel sorry collecting your blank sheet.', 'T’es tellement pas prêt que le surveillant va avoir pitié en ramassant ta copie blanche.'],
      ['Your report card looks like a winter forecast: below zero, with drops all week.', 'Ton bulletin, c’est la météo d’hiver : en dessous de zéro, avec des chutes prévues toute la semaine.'],
      ['Even copying the top student, you’d misspell their name.', 'Même en copiant sur le premier de la classe, tu ferais des fautes en recopiant son nom.'],
      ['Your goal isn’t a distinction, it’s a “took part” certificate.', 'Ton objectif au bac, c’est pas la mention Très bien, c’est la mention « A participé ».'],
      ['You make so many spelling mistakes, the dictionary files a complaint every time you pick up a pen.', 'Tu fais tellement de fautes que le Bescherelle porte plainte dès que tu ouvres un stylo.'],
      ['Your English is so shaky, even the voice assistant pretends not to hear you.', 'Ton anglais est tellement approximatif que même l’assistant vocal fait semblant de pas t’entendre.'],
      ['You revise the night before like the whole syllabus fits on a sticky note.', 'Tu révises la veille comme si tout le programme tenait sur un Post-it.'],
      ['Even the admissions algorithm would put your file on an endless waiting list.', 'Même l’algorithme de Parcoursup mettrait ton dossier en liste d’attente infinie.'],
      ['You’ve got five minutes to convince the jury; by second three, they’re thinking about their coffee break.', 'T’as cinq minutes pour convaincre le jury ; dès la troisième seconde, ils pensent à leur pause café.'],
      ['When you open your grades, the app suggests dark mode to hide all the red.', 'Quand tu ouvres Pronote, l’appli te propose le mode sombre pour cacher le rouge.'],
      ['You won’t take your exams in June, you’ll take them in overtime in July.', 'Toi, le bac, tu le passes pas en juin : tu le passes en heures sup’ en juillet.']
    ]],
    ['classe', '🏫', 'Vie de classe', [
      ['You’ve slept on your desk so much, your forehead has the wood grain printed on it.', 'T’as tellement dormi sur ta table que ton front a pris l’empreinte du bois.'],
      ['You turn up so late, the school app thinks you’re a ghost student.', 'T’arrives tellement tard que Pronote te prend pour un élève fantôme.'],
      ['In PE, you’ve got the stamina of a phone on 1% in battery saver mode.', 'En EPS, t’as le cardio d’un téléphone à 1 % en mode économie d’énergie.'],
      ['Your bag weighs 15 kilos and holds zero knowledge: it’s just ballast so you don’t float away.', 'Ton sac pèse 15 kilos et contient zéro connaissance : c’est juste du lest pour pas t’envoler.']
    ]],
    ['riposte', '🛡️', 'Ripostes', [
      ['Cute. Now try again with a punchline.', 'Mignon. Maintenant, réessaie avec une chute.'],
      ['My calculator tells better jokes.', 'Ma calculatrice fait de meilleures blagues.'],
      ['Is that a roast or a weather report?', 'C’est une vanne ou la météo ?'],
      ['No cap, that was weak.', 'Sans mentir, c’était faiblard.'],
      ['Your roast came out frozen.', 'Ta vanne est sortie surgelée.'],
      ['Ratio. Even the silence laughed louder.', 'Ratio. Même le silence a rigolé plus fort.'],
      ['Nice try. Delete it and say sorry to the joke.', 'Bien essayé. Efface et excuse-toi auprès de la blague.'],
      ['I’ve seen better comebacks in a boomerang shop.', 'J’ai vu de meilleurs retours dans un magasin de boomerangs.']
    ]]
  ];
  // Réactions de celui qui reçoit la vanne : [id, icône, libellé, aura]
  const REACTIONS = [['rire', '😂', 'Wesh, il m’a eu', 3], ['feu', '🔥', 'T’es un ouf, quelle punchline', 5], ['bof', '🙄', 'Bof, gros', 0], ['mechant', '🚫', 'Là, c’est trop méchant', -2]];
  const TITRES = [[0, '🌱 Apprenti vanneur'], [10, '🎤 Vanneur confirmé'], [20, '🔥 Punchline sur pattes'], [30, '👑 Aura infinie']];
  // Ce qu'on ne vise jamais (en plus du juge de Plumo) : physique, origine, religion, argent, famille.
  const bas = s => String(s || '').normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().replace(/[’']/g, ' ');
  const INTERDITS = ['cheveux', 'chauve', 'poids', 'maigre', 'boutons', 'acne', 'lunettes', 'appareil dentaire', 'dents', 'nez', 'oreilles', 'peau', 'couleur de peau', 'taille', 'petit gros',
    'pauvre', 'clochard', 'sdf', 'origine', 'pays', 'bled', 'arabe', 'rebeu', 'renoi', 'noir', 'blanc', 'chinois', 'juif', 'musulman', 'chretien', 'religion', 'immigre',
    'orphelin', 'divorce', 'mere', 'pere', 'daron', 'daronne', 'soeur', 'frere', 'grand mere', 'famille',
    'hair', 'bald', 'skinny', 'teeth', 'glasses', 'nose', 'skin', 'poor', 'religion', 'mother', 'father', 'sister', 'brother', 'family'];
  function juger(texte){
    const t = String(texte || '').trim();
    const r = window.JUGE ? window.JUGE.juger(t) : { ok:!!t, raisons:t ? [] : ['vide'] };
    const raisons = r.raisons.slice();
    if(t.length > 140) raisons.push('trop longue (140 caractères max)');
    const p = ' ' + bas(t).replace(/[^a-z0-9 ]/g, ' ').replace(/\s+/g, ' ') + ' ';
    if(INTERDITS.some(m => p.includes(' ' + m + ' ') || p.includes(' ' + m + 's '))) raisons.push('on vise ce que fait la personne, pas qui elle est (physique, famille, origine…)');
    return { ok:!raisons.length, raisons:[...new Set(raisons)] };
  }
  // v5.87 : « ⭐ Nos vannes » = celles ajoutées par les joueurs. Seules celles validées (IA, ou règles sans serveur) sortent ;
  // celles « en attente » de l'IA restent de côté.
  const utilisables = perso => (Array.isArray(perso) ? perso : []).filter(v => v && v.fr && v.etat !== 'attente').map(v => ({ cat:'perso', ic:'⭐', en:v.en || '', fr:v.fr, perso:true }));
  const cle = v => v.en || v.fr;
  const toutes = perso => CATEGORIES.flatMap(([id, ic, nom, l]) => l.map(([en, fr]) => ({ cat:id, ic, en, fr }))).concat(utilisables(perso));
  // Trois cartes de catégories différentes (« ⭐ Nos vannes » compte comme une catégorie), sans celles déjà jouées si possible.
  function tirer(deja, hasard, perso){
    const h = hasard || Math.random, vues = new Set(deja || []), tt = toutes(perso);
    const cats = [...new Set(tt.map(v => v.cat))].sort(() => h() - .5), main = [];
    for(const c of cats){
      if(main.length >= 3) break;
      const l = tt.filter(v => v.cat === c && !vues.has(cle(v))), ll = l.length ? l : tt.filter(v => v.cat === c);
      main.push(ll[Math.floor(h() * ll.length)]);
    }
    return main;
  }
  const titre = aura => TITRES.filter(t => aura >= t[0]).pop()[1];
  window.VANNES_LIBRES = { CATEGORIES, REACTIONS, TITRES, INTERDITS, juger, toutes, tirer, titre, cle };
})();
