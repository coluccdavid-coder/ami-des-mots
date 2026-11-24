// Ami des mots — v5.93 : ESPAGNOL et ALLEMAND en LVB, de la 5e au bac (même modèle que l'anglais).
// Niveaux visés : A1 en fin de 5e, A2 en fin de 3e, B1 en fin de Tle (LVB). Au bac, les LV comptent en contrôle continu.
// Vannes sur la réponse, jamais sur l'élève. [question, bonne, [[mauvaise, vanne]…], explication]
(function(){
  'use strict';
  const M = window.MATIERES; if(!M) return;
  const ch = (id, nom, dom, niv, banque) => ({ id, nom, dom, niv, banque });

  // ═════════ ESPAGNOL ═════════
  const ES_BASES = [
    ['« Je m’appelle Léa » se dit :', 'Me llamo Léa.', [['Yo llamo Léa.', 'Sans « me », tu appelles Léa au téléphone. 📞'], ['Me llama Léa.', '« llama », c’est « il/elle appelle ». Toi, c’est « llamo ». 🙋'], ['Soy llamo Léa.', 'Deux verbes collés, ta phrase a pris un bouchon. 🚗']], 'Llamarse : me llamo, te llamas, se llama.'],
    ['Article de « casa » (maison) :', 'la casa', [['el casa', '« casa » se termine par -a : féminin, « la ». 🏠'], ['lo casa', '« lo » n’est pas un article devant un nom. 🧩'], ['los casa', '« los », c’est pour plusieurs. Une seule maison ici. 🏡']], 'El (masculin), la (féminin), los, las (pluriel).'],
    ['« J’aime le chocolat » :', 'Me gusta el chocolate.', [['Yo gusto el chocolate.', '« Yo gusto » : c’est toi qui plais au chocolat. Le monde à l’envers. 🍫'], ['Me gustan el chocolate.', 'Une seule chose aimée : « gusta », sans -n. 🍫'], ['Me gusta chocolate.', 'L’espagnol garde l’article : « el chocolate ». 🍬']], 'Me gusta + singulier ; me gustan + pluriel (me gustan los gatos).'],
    ['Conjugue « hablar » avec « nosotros » :', 'hablamos', [['hablan', '« hablan », c’est « ils parlent ». Tu as invité trop de monde. 👥'], ['hablo', '« hablo », c’est « je parle ». Tu es seul dans le « nous ». 🙋'], ['hablamo', 'Il manque le -s final. Petite lettre, gros effet. 🔤']], 'Hablar : hablo, hablas, habla, hablamos, habláis, hablan.'],
    ['Comment dit-on « quinze » ?', 'quince', [['cinco', 'Cinco, c’est cinq. Il manque dix. 🔢'], ['quinientos', 'Quinientos, c’est cinq cents. Ta réponse a pris l’ascenseur. 🛗'], ['catorce', 'Catorce, c’est quatorze. Une marche de moins. 🪜']], 'Once, doce, trece, catorce, quince.'],
    ['Quelle est la capitale du Mexique ?', 'Mexico (Ciudad de México)', [['Madrid', 'Madrid, c’est l’Espagne. Ta réponse a traversé l’Atlantique dans le mauvais sens. ✈️'], ['Buenos Aires', 'Buenos Aires, c’est l’Argentine. 🇦🇷'], ['Lima', 'Lima, c’est le Pérou. 🇵🇪']], 'L’espagnol est parlé dans une vingtaine de pays.']
  ];
  const ES_PRESENT = [
    ['« J’ai treize ans » :', 'Tengo trece años.', [['Soy trece años.', 'Comme en français, l’âge se dit avec « avoir » : tengo. 🎂'], ['Tengo trece anos.', 'Sans tilde, « años » devient un tout autre mot. Garde le ñ ! 🙈'], ['Estoy trece años.', '« Estoy », c’est être (état). L’âge, c’est « tengo ». 🎈']], 'Tener : tengo, tienes, tiene, tenemos, tenéis, tienen.'],
    ['« Je vais au collège » :', 'Voy al colegio.', [['Voy a el colegio.', 'A + el se contracte : « al ». 🚌'], ['Vo al colegio.', '« Ir » est irrégulier : voy, vas, va… 🎒'], ['Soy al colegio.', '« Soy », c’est « je suis ». Tu es devenu le collège. 🏫']], 'Ir : voy, vas, va, vamos, vais, van. A + el = al.'],
    ['« Je suis en train de manger » :', 'Estoy comiendo.', [['Soy comiendo.', 'L’action en cours se fait avec « estar ». 🍽️'], ['Estoy comendo.', 'Gérondif des verbes en -er : -iendo. Comiendo. 🥘'], ['Estoy a comer.', 'Ça, c’est du portugais du Portugal (estou a comer). En espagnol : estoy comiendo. 🌍']], 'Estar + gérondif (-ando, -iendo) : action en cours.'],
    ['Que signifie « hay » ?', 'il y a', [['il a', '« Il a », c’est « tiene ». 🧩'], ['il est', '« Il est », c’est « es » ou « está ». 🔄'], ['aujourd’hui', 'Aujourd’hui, c’est « hoy ». Une lettre d’écart, un sens d’écart. 📅']], 'Hay + nom : hay un parque (il y a un parc).']
  ];
  const ES_PASSE = [
    ['« Hier, j’ai parlé avec Ana » :', 'Ayer hablé con Ana.', [['Ayer he hablado con Ana.', 'Avec « ayer », l’espagnol préfère le passé simple (indefinido) : hablé. 📅'], ['Ayer hablo con Ana.', 'Présent avec « hier » : ta phrase vit dans le mauvais calendrier. 🗓️'], ['Ayer hablaba con Ana.', 'L’imparfait raconte une habitude ou un décor. Ici, c’est une action finie. 🎬']], 'Pretérito indefinido : hablé, hablaste, habló, hablamos, hablasteis, hablaron.'],
    ['« Quand j’étais petit, je jouais au foot » :', 'Cuando era pequeño, jugaba al fútbol.', [['Cuando fui pequeño, jugué al fútbol.', 'Une habitude passée appelle l’imparfait : era, jugaba. ⚽'], ['Cuando estaba pequeño, jugaba al fútbol.', 'Petit (âge), c’est une caractéristique : « ser ». 🧒'], ['Cuando soy pequeño, juego al fútbol.', 'Présent pour un souvenir : la machine à remonter le temps est en panne. ⏳']], 'Imparfait : habitude ou description dans le passé.'],
    ['« Je vais étudier » (futur proche) :', 'Voy a estudiar.', [['Voy estudiar.', 'Il manque le « a ». Le futur proche, c’est ir + a + infinitif. 🔗'], ['Iré a estudiar.', 'Ça, c’est « j’irai étudier » (futur simple + déplacement). 🚶'], ['Estoy a estudiar.', 'Le futur proche ne se fait pas avec « estar ». 🔮']], 'Ir a + infinitif = futur proche.'],
    ['« Il faut travailler » (en général) :', 'Hay que trabajar.', [['Tiene que trabajar.', '« Tiene que », c’est « il doit » (une personne précise). En général : hay que. 👷'], ['Es que trabajar.', '« Es que » veut dire « c’est que… ». Pas une obligation. 🙃'], ['Debe trabajar hay.', 'Deux obligations mélangées et un « hay » perdu à la fin. 🧩']], 'Hay que + infinitif (impersonnel) ; tener que + infinitif (personnel).']
  ];
  const ES_SER_ESTAR = [
    ['« Madrid est en Espagne » :', 'Madrid está en España.', [['Madrid es en España.', 'La localisation se dit avec « estar ». 🗺️'], ['Madrid hay en España.', '« Hay » sert à dire qu’une chose existe, pas où elle est. 📍'], ['Madrid tiene en España.', 'Madrid ne possède pas l’Espagne. 👑']], 'Estar : lieu, état passager. Ser : identité, caractéristique, origine.'],
    ['« Elle est fatiguée » :', 'Está cansada.', [['Es cansada.', '« Es cansada » voudrait dire qu’elle est ennuyeuse, de nature. Pas sympa ! 😴'], ['Está cansado.', 'Elle est une fille : cansada, au féminin. 👩'], ['Tiene cansada.', 'Elle n’a pas « une fatiguée ». 🙃']], 'État passager : estar.'],
    ['« Je suis français » :', 'Soy francés.', [['Estoy francés.', 'La nationalité, c’est l’identité : « ser ». 🇫🇷'], ['Soy de francés.', 'Le « de » sert à l’origine d’une ville ou d’un pays (soy de Francia), pas devant l’adjectif. 🧭'], ['Soy francés es.', 'Un « es » en trop à la fin : ta phrase a eu le hoquet. 🫢']], 'Ser : nationalité, profession, caractère.'],
    ['« Je le vois » (le livre) :', 'Lo veo.', [['Le veo.', '« Le » est surtout un complément indirect (« à lui »). Pour l’objet direct masculin : lo. 📘'], ['Veo lo.', 'Avec un verbe conjugué, le pronom se place devant : lo veo. ⬅️'], ['Lo vo.', '« Ver » fait « veo » à la première personne. 👀']], 'Pronoms COD : lo, la, los, las, placés avant le verbe conjugué.']
  ];
  const ES_LYCEE = [
    ['« Je veux que tu viennes » :', 'Quiero que vengas.', [['Quiero que vienes.', 'Après « querer que », on met le subjonctif : vengas. 🙏'], ['Quiero que venir.', 'Pas d’infinitif après « que » quand le sujet change. 🔀'], ['Quiero venir tú.', 'Ta phrase a mis « tú » en bout de quai. Il faut « que vengas ». 🚉']], 'Querer que + subjonctif présent.'],
    ['« Quand tu arriveras, appelle-moi » :', 'Cuando llegues, llámame.', [['Cuando llegarás, llámame.', 'Après « cuando » + futur, l’espagnol met le subjonctif, pas le futur. ⏰'], ['Cuando llegas, llámame.', 'L’indicatif ici parle d’une habitude. Pour un futur : subjonctif. 📆'], ['Cuando llegues, me llama.', '« me llama », c’est « il m’appelle ». L’ordre, c’est llámame. 📲']], 'Cuando + subjonctif pour une action future.'],
    ['« Si j’avais de l’argent, je voyagerais » :', 'Si tuviera dinero, viajaría.', [['Si tendría dinero, viajaría.', 'Jamais de conditionnel après « si » : on met le subjonctif imparfait. ✈️'], ['Si tengo dinero, viajaría.', 'Présent et conditionnel ne vont pas ensemble ici. 🧩'], ['Si tuviera dinero, viajaré.', 'Le futur ne colle pas avec l’hypothèse. Conditionnel : viajaría. 🌍']], 'Si + subjonctif imparfait, conditionnel.'],
    ['Faux ami : « embarazada » veut dire :', 'enceinte', [['embarrassée', 'Le faux ami le plus célèbre ! Gênée se dit « avergonzada ». 😳'], ['embrassée', 'Embrassée, c’est « besada » ou « abrazada ». 💬'], ['embarquée', 'Embarquée, c’est « embarcada ». ⛵']], 'Faux amis : embarazada (enceinte), constipado (enrhumé), exquisito (délicieux).'],
    ['Faux ami : « constipado » veut dire :', 'enrhumé', [['constipé', 'Piège classique : en espagnol, c’est le nez qui est bouché. 🤧'], ['constant', 'Constant se dit « constante ». 🔁'], ['content', 'Content se dit « contento ». 😊']], 'Estoy constipado = je suis enrhumé.']
  ];
  const ES_VOCAB = [
    ['« Lunes » veut dire :', 'lundi', [['la lune', 'Bien vu, ça vient de la lune… mais c’est le jour : lundi. 🌙'], ['mardi', 'Mardi, c’est « martes ». 📅'], ['dimanche', 'Dimanche, c’est « domingo ». ☀️']], 'Lunes, martes, miércoles, jueves, viernes, sábado, domingo.'],
    ['« Rojo » est quelle couleur ?', 'rouge', [['rose', 'Rose, c’est « rosa ». 🌸'], ['jaune', 'Jaune, c’est « amarillo ». 🟡'], ['orange', 'Orange, c’est « naranja ». 🍊']], 'Rojo, azul, verde, amarillo, negro, blanco.'],
    ['« El abuelo » est :', 'le grand-père', [['l’oncle', 'L’oncle, c’est « el tío ». 👨'], ['le cousin', 'Le cousin, c’est « el primo ». 🧑'], ['le frère', 'Le frère, c’est « el hermano ». 👦']], 'Padre, madre, hermano, abuelo, tío, primo.'],
    ['« El cuaderno » est :', 'le cahier', [['le cartable', 'Le cartable, c’est « la mochila ». 🎒'], ['le stylo', 'Le stylo, c’est « el bolígrafo » ou « el boli ». 🖊️'], ['la règle', 'La règle, c’est « la regla ». 📏']], 'Le matériel de classe : el cuaderno, el libro, el lápiz, la goma.'],
    ['« ¿Qué hora es? » veut dire :', 'Quelle heure est-il ?', [['Où es-tu ?', 'Où es-tu, c’est « ¿Dónde estás? ». 📍'], ['Comment ça va ?', 'Ça, c’est « ¿Qué tal? ». 👋'], ['Quel âge as-tu ?', 'C’est « ¿Cuántos años tienes? ». 🎂']], 'Es la una, son las dos, son las tres y media.']
  ];
  M.ajouter({ id:'lespagnol', nom:'Espagnol (LVB)', ic:'🇪🇸',
    examens:{ '5e':'Évaluation d’espagnol de 5e (A1)', '4e':'Évaluation d’espagnol de 4e', '3e':'Évaluation d’espagnol de 3e (A2)', '2nde':'Évaluation d’espagnol de 2nde', '1re':'Bac blanc d’espagnol · 1re', 'Tle':'Bac blanc d’espagnol LVB (B1)' },
    chapitres:[
      ch('es-bases', 'Se présenter, articles, gustar', 'Bases', ['5e', '4e'], ES_BASES),
      ch('es-present', 'Présent irrégulier, estar + gérondif', 'Grammaire', ['5e', '4e', '3e'], ES_PRESENT),
      ch('es-vocab', 'Jours, couleurs, famille, classe', 'Vocabulaire', ['5e', '4e', '3e'], ES_VOCAB),
      ch('es-passe', 'Passé, futur proche, obligation', 'Grammaire', ['3e', '2nde', '1re'], ES_PASSE),
      ch('es-ser', 'Ser ou estar, pronoms', 'Grammaire', ['2nde', '1re'], ES_SER_ESTAR),
      ch('es-lycee', 'Subjonctif, hypothèse, faux amis', 'Grammaire', ['1re', 'Tle'], ES_LYCEE),
      ch('es-bases-lycee', 'Révisions des bases', 'Bases', ['2nde', 'Tle'], ES_BASES.concat(ES_PRESENT))
    ] });

  // ═════════ ALLEMAND ═════════
  const DE_BASES = [
    ['« Je m’appelle Tom » :', 'Ich heiße Tom.', [['Ich heißt Tom.', '« heißt » va avec du, er, sie. Avec ich : heiße. 🙋'], ['Ich bin heiße Tom.', 'Deux verbes collés pour une seule place. 🧩'], ['Mich heiße Tom.', '« mich » est un complément. Le sujet, c’est « ich ». 🎯']], 'Heißen : ich heiße, du heißt, er heißt.'],
    ['Article de « Mädchen » (fille) :', 'das Mädchen', [['die Mädchen', 'Piège ! Les mots en -chen sont neutres : das. 👧'], ['der Mädchen', '« der » est masculin. Ici, neutre. 🧩'], ['den Mädchen', '« den » est un accusatif masculin ou un datif pluriel. 🔄']], 'Les noms en -chen et -lein sont neutres (das).'],
    ['« Je n’ai pas de chien » :', 'Ich habe keinen Hund.', [['Ich habe nicht Hund.', 'Devant un nom avec article indéfini, on nie avec « kein ». 🐕'], ['Ich habe kein Hund.', 'Hund est masculin, complément d’objet : accusatif « keinen ». 🦴'], ['Ich nicht habe Hund.', 'Le verbe doit rester en deuxième position. 🥈']], 'Kein / keine / keinen : la négation devant un nom.'],
    ['Où va le verbe ? « Heute ___ ich Fußball. »', 'spiele', [['Heute ich spiele Fußball.', 'En allemand, le verbe conjugué est toujours en 2e position : Heute spiele ich… ⚽'], ['spielen', 'Infinitif au lieu de la forme conjuguée : ta phrase est restée au vestiaire. 👟'], ['spielt', '« spielt » va avec er/sie/es. Avec ich : spiele. 🙋']], 'Verbe conjugué en deuxième position : Heute spiele ich Fußball.'],
    ['Quelle est la capitale de l’Autriche ?', 'Vienne (Wien)', [['Berlin', 'Berlin, c’est l’Allemagne. Voisin, mais pas le même pays. 🇩🇪'], ['Berne', 'Berne, c’est la Suisse. 🇨🇭'], ['Munich', 'Munich est en Allemagne, en Bavière. 🥨']], 'L’allemand est parlé en Allemagne, en Autriche, en Suisse, au Liechtenstein, au Luxembourg…'],
    ['Comment dit-on « vingt et un » ?', 'einundzwanzig', [['zwanzigeins', 'L’allemand dit les unités avant les dizaines : « un-et-vingt ». 🔢'], ['zweiundzwanzig', 'Ça, c’est 22. Une de trop. ➕'], ['einszwanzig', 'Il manque le « und ». 🔗']], '21 = einundzwanzig, 35 = fünfunddreißig.']
  ];
  const DE_COLLEGE = [
    ['« Je dois faire mes devoirs » :', 'Ich muss meine Hausaufgaben machen.', [['Ich muss machen meine Hausaufgaben.', 'Avec un modal, l’infinitif part à la fin de la phrase. 📚'], ['Ich muss meine Hausaufgaben zu machen.', 'Pas de « zu » après un modal. ✂️'], ['Ich müsse meine Hausaufgaben machen.', '« müsse » est un subjonctif. Ici, c’est « muss ». 🎯']], 'Modal (können, müssen, wollen…) en 2e position, infinitif à la fin.'],
    ['« J’ai joué » (spielen) :', 'Ich habe gespielt.', [['Ich bin gespielt.', 'Spielen fait son passé avec « haben ». « Sein » est surtout pour les déplacements. 🎮'], ['Ich habe spielt.', 'Il manque le « ge- » du participe : gespielt. 🧩'], ['Ich habe gespielen.', 'Verbe régulier : participe en ge-…-t. 🔧']], 'Parfait : haben/sein + participe passé (ge-spiel-t).'],
    ['« Je suis allé à Berlin » :', 'Ich bin nach Berlin gefahren.', [['Ich habe nach Berlin gefahren.', 'Un déplacement prend l’auxiliaire « sein ». 🚆'], ['Ich bin nach Berlin gefahrt.', 'Fahren est irrégulier : gefahren. 🛤️'], ['Ich bin zu Berlin gefahren.', 'Pour une ville ou un pays sans article : nach. 🧭']], 'Verbes de déplacement au parfait avec sein.'],
    ['« … parce qu’il est malade » :', '… weil er krank ist.', [['… weil er ist krank.', 'Après « weil », le verbe conjugué part à la fin. 🏁'], ['… denn er krank ist.', 'Après « denn », pas d’inversion : denn er ist krank. 🔄'], ['… weil ist er krank.', 'Le verbe a sauté au mauvais endroit. 🦘']], 'Subordonnée (weil, dass, wenn) : verbe conjugué à la fin.'],
    ['« Je vais au cinéma avec mon frère » :', 'Ich gehe mit meinem Bruder ins Kino.', [['Ich gehe mit mein Bruder ins Kino.', '« mit » demande le datif : meinem. 🎬'], ['Ich gehe mit meinen Bruder ins Kino.', '« meinen » est un accusatif. Après « mit » : datif, meinem. 🍿'], ['Ich gehe mit meinem Bruder in Kino.', 'Direction vers un lieu : in + das = ins. 🎟️']], 'Mit, von, zu, bei, aus, nach, seit + datif.']
  ];
  const DE_LYCEE = [
    ['« Si j’étais riche, je voyagerais » :', 'Wenn ich reich wäre, würde ich reisen.', [['Wenn ich reich bin, würde ich reisen.', 'Pour une hypothèse irréelle : Konjunktiv II, wäre. 💭'], ['Wenn ich reich wäre, ich würde reisen.', 'Après la subordonnée, le verbe vient tout de suite : würde ich. 🔄'], ['Wenn ich wäre reich, würde ich reisen.', 'Dans la subordonnée, le verbe va à la fin : reich wäre. 🏁']], 'Konjunktiv II : wäre, hätte, würde + infinitif.'],
    ['« La maison est construite » (passif) :', 'Das Haus wird gebaut.', [['Das Haus ist bauen.', 'Le passif se fait avec « werden » + participe passé. 🏗️'], ['Das Haus wird bauen.', 'Ça, c’est un futur : la maison va construire. Elle est douée. 🏠'], ['Das Haus wird gebaute.', 'Le participe ne prend pas de terminaison ici. 🧱']], 'Passif : werden + participe passé.'],
    ['« L’homme qui habite ici » :', 'der Mann, der hier wohnt', [['der Mann, der wohnt hier', 'Dans une relative, le verbe va à la fin. 🏠'], ['der Mann, die hier wohnt', 'Cet article-là est féminin ou pluriel. Mann est masculin : der. 👨'], ['der Mann, was hier wohnt', '« was » s’emploie après « alles », « etwas »… pas après un nom. 🧩']], 'Pronom relatif = article défini ; verbe à la fin de la relative.'],
    ['Faux ami : « bekommen » veut dire :', 'recevoir', [['devenir', 'Devenir se dit « werden ». Piège classique ! 🎭'], ['commencer', 'Commencer, c’est « beginnen » ou « anfangen ». ▶️'], ['comprendre', 'Comprendre, c’est « verstehen ». 🧠']], 'Ich bekomme ein Geschenk = je reçois un cadeau.'],
    ['Faux ami : « das Gymnasium » désigne :', 'le lycée (et le collège long)', [['la salle de sport', 'La salle de sport, c’est « Turnhalle ». 🏋️'], ['l’hôpital', 'L’hôpital, c’est « das Krankenhaus ». 🏥'], ['la gymnastique', 'La gymnastique, c’est « das Turnen ». 🤸']], 'Gymnasium : établissement qui mène à l’Abitur, le bac allemand.']
  ];
  const DE_VOCAB = [
    ['« Montag » veut dire :', 'lundi', [['mardi', 'Mardi, c’est « Dienstag ». 📅'], ['mois', 'Mois, c’est « der Monat ». Ressemblant, mais non. 🗓️'], ['montagne', 'Montagne, c’est « der Berg ». ⛰️']], 'Montag, Dienstag, Mittwoch, Donnerstag, Freitag, Samstag, Sonntag.'],
    ['« Grün » est quelle couleur ?', 'vert', [['gris', 'Gris, c’est « grau ». 🐘'], ['rouge', 'Rouge, c’est « rot ». 🍓'], ['bleu', 'Bleu, c’est « blau ». 💙']], 'Rot, blau, grün, gelb, schwarz, weiß.'],
    ['« Die Schwester » est :', 'la sœur', [['la mère', 'La mère, c’est « Mutter ». 👩'], ['la grand-mère', 'La grand-mère, c’est « Oma » ou « Großmutter ». 👵'], ['la tante', 'La tante, c’est « Tante ». 🧩']], 'Vater, Mutter, Bruder, Schwester, Opa, Oma.'],
    ['« Das Heft » est :', 'le cahier', [['le livre', 'Le livre, c’est « das Buch ». 📖'], ['le stylo', 'Le stylo, c’est « der Kuli ». 🖊️'], ['la trousse', 'La trousse, c’est « das Mäppchen ». ✏️']], 'Das Heft, das Buch, der Bleistift, der Radiergummi.'],
    ['« Wie spät ist es? » veut dire :', 'Quelle heure est-il ?', [['Comment vas-tu ?', 'Ça, c’est « Wie geht’s? ». 👋'], ['Il est tard ?', 'Bien tenté, « spät » veut dire tard, mais la question demande l’heure. ⏰'], ['Où habites-tu ?', 'C’est « Wo wohnst du? ». 🏠']], 'Es ist drei Uhr. Es ist halb vier (= 3 h 30 !).']
  ];
  const DE_2NDE = [
    ['Prétérit de « sein » avec « ich » :', 'ich war', [['ich bin', 'Ça, c’est le présent. Ta réponse a oublié de remonter le temps. ⏪'], ['ich wäre', 'Ça, c’est le Konjunktiv II (je serais). 💭'], ['ich warte', '« warten », c’est attendre. Ta réponse attend encore. ⏳']], 'Prétérit : ich war, ich hatte (sein, haben).'],
    ['« Plus grand que » :', 'größer als', [['mehr groß als', 'L’allemand ajoute -er à l’adjectif, comme l’anglais : größer. 📏'], ['größer wie', 'Pour comparer, c’est « als ». « wie » sert à l’égalité (so groß wie). ⚖️'], ['großer als', 'Il manque l’Umlaut : größer. Deux petits points, gros changement. 🔤']], 'Comparatif : -er + als ; égalité : so … wie.'],
    ['« Quand j’étais petit… » (une seule fois dans le passé) :', 'Als ich klein war, …', [['Wenn ich klein war, …', 'Pour un moment unique du passé, on dit « als ». « Wenn » sert à la répétition ou au futur. 🧒'], ['Als ich war klein, …', 'Subordonnée : le verbe va à la fin (klein war). 🏁'], ['Wann ich klein war, …', '« Wann » sert à poser une question (quand ?). ❓']], 'Als : fait unique passé ; wenn : répétition ou condition ; wann : question.'],
    ['Prétérit de « haben » avec « wir » :', 'wir hatten', [['wir haben', 'Présent. Le prétérit, c’est « hatten ». ⏪'], ['wir hätten', 'Ça, c’est le Konjunktiv II (nous aurions). 💭'], ['wir hattet', '« hattet » va avec « ihr ». 👥']], 'Haben au prétérit : hatte, hattest, hatte, hatten, hattet, hatten.'],
    ['« Le plus rapide » (superlatif) :', 'am schnellsten', [['am schnellster', 'Après « am », la terminaison est -sten. 🏃'], ['der mehr schnell', 'L’allemand ne construit pas le superlatif avec « mehr ». 🚫'], ['am schnell', 'Il manque la terminaison -sten. 🏁']], 'Superlatif : am …sten (Er läuft am schnellsten).']
  ];
  M.ajouter({ id:'lallemand', nom:'Allemand (LVB)', ic:'🇩🇪',
    examens:{ '5e':'Évaluation d’allemand de 5e (A1)', '4e':'Évaluation d’allemand de 4e', '3e':'Évaluation d’allemand de 3e (A2)', '2nde':'Évaluation d’allemand de 2nde', '1re':'Bac blanc d’allemand · 1re', 'Tle':'Bac blanc d’allemand LVB (B1)' },
    chapitres:[
      ch('de-bases', 'Se présenter, articles, négation, ordre des mots', 'Bases', ['5e', '4e', '3e'], DE_BASES),
      ch('de-vocab', 'Jours, couleurs, famille, classe', 'Vocabulaire', ['5e', '4e'], DE_VOCAB),
      ch('de-college', 'Modaux, parfait, subordonnées, datif', 'Grammaire', ['4e', '3e', '2nde'], DE_COLLEGE),
      ch('de-2nde', 'Prétérit, comparatif, wenn ou als', 'Grammaire', ['2nde', '1re'], DE_2NDE),
      ch('de-lycee', 'Konjunktiv II, passif, relatives, faux amis', 'Grammaire', ['1re', 'Tle'], DE_LYCEE),
      ch('de-revisions', 'Révisions du collège', 'Bases', ['2nde', '1re', 'Tle'], DE_BASES.concat(DE_COLLEGE))
    ] });
})();
