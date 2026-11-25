// Ami des mots — textes de l'interface. Une langue d'interface absente
// d'ici n'est pas proposée : jamais de texte français à sa place.
// Les fonctions reçoivent un nombre ou un mot.
window.LANGUES_APPRENDRE = {
  fr:'Français', en:'English', es:'Español', it:'Italiano', pt:'Português', de:'Deutsch', ko:'한국어',
  dz:'الدارجة الجزائرية', ma:'الدارجة المغربية', tn:'الدارجة التونسية', kab:'Taqbaylit'
};
window.TEXTES = {
fr:{
  accroche:"Toutes les matières, de la 6e au bac, avec un hibou qui te vanne.",
  je_parle:"Je parle", j_apprends:"J'apprends", jouer:"Jouer", plumes:"plumes",
  serie:n => n > 1 ? `${n} jours de suite` : `1 jour`, objectif:"Objectif du jour : une partie", objectif_fait:"Objectif du jour atteint ✓",
  th_animaux:"Animaux", th_manger:"À table", th_maison:"La maison", th_habits:"Habits", th_nature:"Nature", th_ville:"En ville", th_musique:"Musique et fête", th_atelier:"Atelier et sciences",
  j_decouvrir:"Découvrir", j_ecoute:"Écoute et trouve", j_quel_mot:"Quel mot ?", j_memoire:"Mémoire", j_lettres:"Lettres en vrac",
  a_decouvrir:"Regardez, écoutez, retournez la carte.", a_ecoute:"Écoutez, puis touchez la bonne image.", a_quel_mot:"Quel est le nom de cette image ?", a_memoire:"Retrouvez chaque image et son mot.", a_lettres:"Remettez les lettres dans l'ordre.",
  bravo:["Bravo !", "Super !", "Oui, c'est ça !"], rate:"Pas tout à fait. Essayez encore !", c_etait:m => `C'était : ${m}`,
  fin_titre:"Partie terminée !", fin_plumes:n => `+${n} plumes`, rejouer:"Rejouer", autre_jeu:"Autre jeu", themes:"Thèmes",
  suivant:"Suivant", ecouter:"Écouter", retour:"Retour", effacer:"Effacer", retourner:"Touchez la carte pour la retourner.",
  vestiaire:"Le vestiaire de Plumo", acc_echarpe:"Écharpe", acc_lunettes:"Lunettes", acc_noeud:"Nœud papillon", acc_chapeau:"Chapeau", acc_couronne:"Couronne",
  a_partir:n => `À ${n} plumes`, porte:"Plumo le porte", mettre:"Lui mettre", enlever:"Lui enlever", nouveau:"Nouveau dans le vestiaire !",
  verrou:"Version complète", verrou_aide:"Ce thème fait partie de la version complète.",
  peu_de_mots:"Pas encore assez de mots dans ce thème pour cette langue.", sans_voix:"Pas encore de voix pour ce mot.",
  apropos:"À propos", apropos_texte:"Ami des mots est un jeu pour apprendre et réviser des mots en images. C'est un jeu : il ne soigne rien et ne remplace aucun professionnel. Rien n'est envoyé : vos progrès restent sur cet appareil, sans compte et sans publicité.",
  effacer_progres:"Effacer mes progrès", confirmer:"Touchez encore pour confirmer"
},
en:{
  accroche:"Every subject, from Year 7 to the final exams, with an owl who teases you.",
  je_parle:"I speak", j_apprends:"I'm learning", jouer:"Play", plumes:"feathers",
  serie:n => n > 1 ? `${n} days in a row` : `1 day`, objectif:"Today's goal: one game", objectif_fait:"Today's goal reached ✓",
  th_animaux:"Animals", th_manger:"At the table", th_maison:"The house", th_habits:"Clothes", th_nature:"Nature", th_ville:"In town", th_musique:"Music and fun", th_atelier:"Workshop and science",
  j_decouvrir:"Discover", j_ecoute:"Listen and find", j_quel_mot:"Which word?", j_memoire:"Memory", j_lettres:"Jumbled letters",
  a_decouvrir:"Look, listen, flip the card.", a_ecoute:"Listen, then tap the right picture.", a_quel_mot:"What is this picture called?", a_memoire:"Match each picture with its word.", a_lettres:"Put the letters back in order.",
  bravo:["Well done!", "Great!", "Yes, that's it!"], rate:"Not quite. Try again!", c_etait:m => `It was: ${m}`,
  fin_titre:"Game over!", fin_plumes:n => `+${n} feathers`, rejouer:"Play again", autre_jeu:"Another game", themes:"Themes",
  suivant:"Next", ecouter:"Listen", retour:"Back", effacer:"Clear", retourner:"Tap the card to flip it.",
  vestiaire:"Plumo's wardrobe", acc_echarpe:"Scarf", acc_lunettes:"Glasses", acc_noeud:"Bow tie", acc_chapeau:"Hat", acc_couronne:"Crown",
  a_partir:n => `At ${n} feathers`, porte:"Plumo is wearing it", mettre:"Put it on", enlever:"Take it off", nouveau:"New in the wardrobe!",
  verrou:"Full version", verrou_aide:"This theme is part of the full version.",
  peu_de_mots:"Not enough words in this theme for this language yet.", sans_voix:"No voice for this word yet.",
  apropos:"About", apropos_texte:"Ami des mots is a game to learn and review words in pictures. It is a game: it does not treat anything and does not replace any professional. Nothing is sent: your progress stays on this device, with no account and no ads.",
  effacer_progres:"Erase my progress", confirmer:"Tap again to confirm"
},
es:{
  accroche:"Todas las asignaturas, del colegio al bachillerato, con un búho que te pica.",
  je_parle:"Hablo", j_apprends:"Aprendo", jouer:"Jugar", plumes:"plumas",
  serie:n => n > 1 ? `${n} días seguidos` : `1 día`, objectif:"Objetivo de hoy: una partida", objectif_fait:"Objetivo de hoy cumplido ✓",
  th_animaux:"Animales", th_manger:"A la mesa", th_maison:"La casa", th_habits:"Ropa", th_nature:"Naturaleza", th_ville:"En la ciudad", th_musique:"Música y fiesta", th_atelier:"Taller y ciencias",
  j_decouvrir:"Descubrir", j_ecoute:"Escucha y encuentra", j_quel_mot:"¿Qué palabra?", j_memoire:"Memoria", j_lettres:"Letras revueltas",
  a_decouvrir:"Mira, escucha, gira la tarjeta.", a_ecoute:"Escucha y toca la imagen correcta.", a_quel_mot:"¿Cómo se llama esta imagen?", a_memoire:"Encuentra cada imagen y su palabra.", a_lettres:"Pon las letras en orden.",
  bravo:["¡Bravo!", "¡Genial!", "¡Sí, eso es!"], rate:"No del todo. ¡Inténtalo otra vez!", c_etait:m => `Era: ${m}`,
  fin_titre:"¡Partida terminada!", fin_plumes:n => `+${n} plumas`, rejouer:"Volver a jugar", autre_jeu:"Otro juego", themes:"Temas",
  suivant:"Siguiente", ecouter:"Escuchar", retour:"Volver", effacer:"Borrar", retourner:"Toca la tarjeta para girarla.",
  vestiaire:"El armario de Plumo", acc_echarpe:"Bufanda", acc_lunettes:"Gafas", acc_noeud:"Pajarita", acc_chapeau:"Sombrero", acc_couronne:"Corona",
  a_partir:n => `Con ${n} plumas`, porte:"Plumo lo lleva puesto", mettre:"Ponérselo", enlever:"Quitárselo", nouveau:"¡Novedad en el armario!",
  verrou:"Versión completa", verrou_aide:"Este tema forma parte de la versión completa.",
  peu_de_mots:"Aún no hay suficientes palabras en este tema para este idioma.", sans_voix:"Aún no hay voz para esta palabra.",
  apropos:"Acerca de", apropos_texte:"Ami des mots es un juego para aprender y repasar palabras con imágenes. Es un juego: no cura nada y no sustituye a ningún profesional. No se envía nada: tu progreso se queda en este dispositivo, sin cuenta y sin publicidad.",
  effacer_progres:"Borrar mi progreso", confirmer:"Toca otra vez para confirmar"
},
it:{
  accroche:"Tutte le materie, dalla scuola media alla maturità, con un gufo che ti prende in giro.",
  je_parle:"Parlo", j_apprends:"Imparo", jouer:"Gioca", plumes:"piume",
  serie:n => n > 1 ? `${n} giorni di fila` : `1 giorno`, objectif:"Obiettivo di oggi: una partita", objectif_fait:"Obiettivo di oggi raggiunto ✓",
  th_animaux:"Animali", th_manger:"A tavola", th_maison:"La casa", th_habits:"Vestiti", th_nature:"Natura", th_ville:"In città", th_musique:"Musica e festa", th_atelier:"Laboratorio e scienze",
  j_decouvrir:"Scoprire", j_ecoute:"Ascolta e trova", j_quel_mot:"Quale parola?", j_memoire:"Memoria", j_lettres:"Lettere in disordine",
  a_decouvrir:"Guarda, ascolta, gira la carta.", a_ecoute:"Ascolta, poi tocca l'immagine giusta.", a_quel_mot:"Come si chiama questa immagine?", a_memoire:"Trova ogni immagine e la sua parola.", a_lettres:"Rimetti le lettere in ordine.",
  bravo:["Bravo!", "Ottimo!", "Sì, è giusto!"], rate:"Non proprio. Riprova!", c_etait:m => `Era: ${m}`,
  fin_titre:"Partita finita!", fin_plumes:n => `+${n} piume`, rejouer:"Rigioca", autre_jeu:"Altro gioco", themes:"Temi",
  suivant:"Avanti", ecouter:"Ascolta", retour:"Indietro", effacer:"Cancella", retourner:"Tocca la carta per girarla.",
  vestiaire:"Il guardaroba di Plumo", acc_echarpe:"Sciarpa", acc_lunettes:"Occhiali", acc_noeud:"Papillon", acc_chapeau:"Cappello", acc_couronne:"Corona",
  a_partir:n => `Con ${n} piume`, porte:"Plumo lo indossa", mettre:"Mettiglielo", enlever:"Toglieglielo", nouveau:"Novità nel guardaroba!",
  verrou:"Versione completa", verrou_aide:"Questo tema fa parte della versione completa.",
  peu_de_mots:"Non ci sono ancora abbastanza parole in questo tema per questa lingua.", sans_voix:"Ancora nessuna voce per questa parola.",
  apropos:"Informazioni", apropos_texte:"Ami des mots è un gioco per imparare e ripassare parole con le immagini. È un gioco: non cura niente e non sostituisce nessun professionista. Non viene inviato niente: i tuoi progressi restano su questo dispositivo, senza account e senza pubblicità.",
  effacer_progres:"Cancella i miei progressi", confirmer:"Tocca di nuovo per confermare"
},
pt:{
  accroche:"Todas as disciplinas, do 2.º ciclo ao secundário, com um mocho que te provoca.",
  je_parle:"Falo", j_apprends:"Aprendo", jouer:"Jogar", plumes:"penas",
  serie:n => n > 1 ? `${n} dias seguidos` : `1 dia`, objectif:"Objetivo de hoje: um jogo", objectif_fait:"Objetivo de hoje cumprido ✓",
  th_animaux:"Animais", th_manger:"À mesa", th_maison:"A casa", th_habits:"Roupa", th_nature:"Natureza", th_ville:"Na cidade", th_musique:"Música e festa", th_atelier:"Oficina e ciências",
  j_decouvrir:"Descobrir", j_ecoute:"Ouve e encontra", j_quel_mot:"Que palavra?", j_memoire:"Memória", j_lettres:"Letras baralhadas",
  a_decouvrir:"Olha, ouve, vira a carta.", a_ecoute:"Ouve e toca na imagem certa.", a_quel_mot:"Como se chama esta imagem?", a_memoire:"Encontra cada imagem e a sua palavra.", a_lettres:"Põe as letras por ordem.",
  bravo:["Boa!", "Fantástico!", "Sim, é isso!"], rate:"Ainda não. Tenta outra vez!", c_etait:m => `Era: ${m}`,
  fin_titre:"Jogo terminado!", fin_plumes:n => `+${n} penas`, rejouer:"Jogar outra vez", autre_jeu:"Outro jogo", themes:"Temas",
  suivant:"Seguinte", ecouter:"Ouvir", retour:"Voltar", effacer:"Apagar", retourner:"Toca na carta para a virar.",
  vestiaire:"O guarda-roupa do Plumo", acc_echarpe:"Cachecol", acc_lunettes:"Óculos", acc_noeud:"Laço", acc_chapeau:"Chapéu", acc_couronne:"Coroa",
  a_partir:n => `Com ${n} penas`, porte:"O Plumo está a usá-lo", mettre:"Vestir-lho", enlever:"Tirar-lho", nouveau:"Novidade no guarda-roupa!",
  verrou:"Versão completa", verrou_aide:"Este tema faz parte da versão completa.",
  peu_de_mots:"Ainda não há palavras suficientes neste tema para esta língua.", sans_voix:"Ainda não há voz para esta palavra.",
  apropos:"Sobre", apropos_texte:"Ami des mots é um jogo para aprender e rever palavras com imagens. É um jogo: não trata nada e não substitui nenhum profissional. Nada é enviado: o teu progresso fica neste aparelho, sem conta e sem publicidade.",
  effacer_progres:"Apagar o meu progresso", confirmer:"Toca outra vez para confirmar"
},
de:{
  accroche:"Alle Fächer, von der Unterstufe bis zum Abitur – mit einer Eule, die dich neckt.",
  je_parle:"Ich spreche", j_apprends:"Ich lerne", jouer:"Spielen", plumes:"Federn",
  serie:n => n > 1 ? `${n} Tage in Folge` : `1 Tag`, objectif:"Ziel für heute: ein Spiel", objectif_fait:"Ziel für heute erreicht ✓",
  th_animaux:"Tiere", th_manger:"Bei Tisch", th_maison:"Das Haus", th_habits:"Kleidung", th_nature:"Natur", th_ville:"In der Stadt", th_musique:"Musik und Feste", th_atelier:"Werkstatt und Wissenschaft",
  j_decouvrir:"Entdecken", j_ecoute:"Hören und finden", j_quel_mot:"Welches Wort?", j_memoire:"Memory", j_lettres:"Buchstabensalat",
  a_decouvrir:"Schau, hör zu, dreh die Karte um.", a_ecoute:"Hör zu und tippe auf das richtige Bild.", a_quel_mot:"Wie heißt dieses Bild?", a_memoire:"Finde zu jedem Bild sein Wort.", a_lettres:"Bring die Buchstaben in die richtige Reihenfolge.",
  bravo:["Bravo!", "Super!", "Ja, genau!"], rate:"Nicht ganz. Versuch es noch einmal!", c_etait:m => `Es war: ${m}`,
  fin_titre:"Spiel beendet!", fin_plumes:n => `+${n} Federn`, rejouer:"Noch einmal", autre_jeu:"Anderes Spiel", themes:"Themen",
  suivant:"Weiter", ecouter:"Anhören", retour:"Zurück", effacer:"Löschen", retourner:"Tippe auf die Karte, um sie umzudrehen.",
  vestiaire:"Plumos Kleiderschrank", acc_echarpe:"Schal", acc_lunettes:"Brille", acc_noeud:"Fliege", acc_chapeau:"Hut", acc_couronne:"Krone",
  a_partir:n => `Ab ${n} Federn`, porte:"Plumo trägt es", mettre:"Anziehen", enlever:"Ausziehen", nouveau:"Neu im Kleiderschrank!",
  verrou:"Vollversion", verrou_aide:"Dieses Thema gehört zur Vollversion.",
  peu_de_mots:"Für diese Sprache gibt es in diesem Thema noch nicht genug Wörter.", sans_voix:"Für dieses Wort gibt es noch keine Stimme.",
  apropos:"Über", apropos_texte:"Ami des mots ist ein Spiel, um Wörter mit Bildern zu lernen und zu wiederholen. Es ist ein Spiel: Es heilt nichts und ersetzt keine Fachkraft. Nichts wird gesendet: Dein Fortschritt bleibt auf diesem Gerät, ohne Konto und ohne Werbung.",
  effacer_progres:"Meinen Fortschritt löschen", confirmer:"Zum Bestätigen noch einmal tippen"
}
};

// ── v2 : joueurs, défi, révision, carnet, trophées, Vrai ou faux, Plus ──
(function(){
const V2 = {
fr:{
  bonjour:n => `Bonjour ${n} !`, changer_joueur:"Changer de joueur", qui_joue:"Qui joue ?", ajouter_joueur:"Ajouter un joueur", modifier_joueur:"Modifier le joueur",
  prenom:"Prénom", couleur:"Couleur de Plumo", valider:"Valider", supprimer_joueur:"Supprimer ce joueur", joueurs:"Joueurs",
  defi:"Défi du jour", defi_fait:"Défi du jour réussi !", revoir:"À revoir", revoir_rien:"Rien à revoir aujourd'hui. Jouez pour découvrir de nouveaux mots !",
  carnet:"Mon carnet", carnet_aide:"Touchez un mot pour l'écouter.", carnet_vide:"Votre carnet est vide. Jouez pour le remplir !",
  maitrise:n => `${n} mots bien connus`, connus:(a, b) => `${a} mots bien connus sur ${b}`,
  j_vrai_faux:"Vrai ou faux ?", a_vrai_faux:"Ce mot va-t-il avec l'image ?", vrai:"Vrai", faux:"Faux",
  trophees:"Trophées", tr_premiere:"Première partie", tr_serie3:"3 jours de suite", tr_serie7:"7 jours de suite", tr_mots25:"25 mots bien connus", tr_mots100:"100 mots bien connus", tr_theme:"Un thème parfait", tr_defi5:"5 défis du jour", nouveau_trophee:"Nouveau trophée",
  reglages:"Réglages", son:"Bruitages", oui:"Oui", non:"Non",
  plus:"Ami des mots Plus", plus_court:"tous les thèmes et tous les jeux", plus_badge:"Plus", plus_titre:"Tout Ami des mots, pour toute la famille.",
  plus_avantages:["Les 8 thèmes, tous les mots", "Les 6 jeux, dont Mémoire et Lettres en vrac", "Jusqu'à 6 joueurs sur l'appareil", "Les nouveaux mots et jeux à venir"],
  plus_prix:p => `${p} par mois`, sans_engagement:"Sans engagement, résiliable à tout moment.", s_abonner:"S'abonner", bientot:"Bientôt disponible",
  gratuit_reste:"La version gratuite reste gratuite : 3 thèmes, 3 jeux, le défi du jour et la révision.",
  deja_abonne:"J'ai déjà un abonnement", code_abo:"Code d'abonnement", code_aide:"Notez ce code : il permet de retrouver l'abonnement sur un autre appareil.", verifier:"Vérifier",
  abo_actif:d => `Abonnement actif${d ? ` (jusqu'au ${d})` : ''}. Merci !`, abo_inconnu:"Code introuvable ou abonnement terminé.", hors_ligne:"Vérification impossible pour l'instant. Réessayez plus tard.", gerer_abo:"Gérer ou résilier l'abonnement", decouvrir_plus:"Découvrir Ami des mots Plus",
  apropos_texte:"Ami des mots est un jeu pour apprendre et réviser des mots en images. C'est un jeu : il ne soigne rien et ne remplace aucun professionnel. Sans compte et sans publicité : vos progrès restent sur cet appareil. Pour l'abonnement, seul un code anonyme est vérifié ; le paiement est géré par Stripe."
},
en:{
  bonjour:n => `Hello ${n}!`, changer_joueur:"Switch player", qui_joue:"Who's playing?", ajouter_joueur:"Add a player", modifier_joueur:"Edit player",
  prenom:"First name", couleur:"Plumo's colour", valider:"OK", supprimer_joueur:"Delete this player", joueurs:"Players",
  defi:"Daily challenge", defi_fait:"Daily challenge done!", revoir:"Review", revoir_rien:"Nothing to review today. Play to discover new words!",
  carnet:"My notebook", carnet_aide:"Tap a word to hear it.", carnet_vide:"Your notebook is empty. Play to fill it!",
  maitrise:n => `${n} words known well`, connus:(a, b) => `${a} of ${b} words known well`,
  j_vrai_faux:"True or false?", a_vrai_faux:"Does this word match the picture?", vrai:"True", faux:"False",
  trophees:"Trophies", tr_premiere:"First game", tr_serie3:"3 days in a row", tr_serie7:"7 days in a row", tr_mots25:"25 words known well", tr_mots100:"100 words known well", tr_theme:"A perfect theme", tr_defi5:"5 daily challenges", nouveau_trophee:"New trophy",
  reglages:"Settings", son:"Sound effects", oui:"On", non:"Off",
  plus:"Ami des mots Plus", plus_court:"every theme and every game", plus_badge:"Plus", plus_titre:"All of Ami des mots, for the whole family.",
  plus_avantages:["All 8 themes, every word", "All 6 games, including Memory and Jumbled letters", "Up to 6 players on this device", "New words and games as they come"],
  plus_prix:p => `${p} a month`, sans_engagement:"No commitment, cancel at any time.", s_abonner:"Subscribe", bientot:"Coming soon",
  gratuit_reste:"The free version stays free: 3 themes, 3 games, the daily challenge and review.",
  deja_abonne:"I already have a subscription", code_abo:"Subscription code", code_aide:"Write this code down: it restores the subscription on another device.", verifier:"Check",
  abo_actif:d => `Subscription active${d ? ` (until ${d})` : ''}. Thank you!`, abo_inconnu:"Code not found or subscription ended.", hors_ligne:"Can't check right now. Please try again later.", gerer_abo:"Manage or cancel the subscription", decouvrir_plus:"Discover Ami des mots Plus",
  apropos_texte:"Ami des mots is a game for learning and reviewing words with pictures. It is a game: it doesn't treat anything and doesn't replace any professional. No account and no ads: your progress stays on this device. For the subscription, only an anonymous code is checked; payment is handled by Stripe."
},
es:{
  bonjour:n => `¡Hola, ${n}!`, changer_joueur:"Cambiar de jugador", qui_joue:"¿Quién juega?", ajouter_joueur:"Añadir un jugador", modifier_joueur:"Editar jugador",
  prenom:"Nombre", couleur:"Color de Plumo", valider:"Aceptar", supprimer_joueur:"Eliminar este jugador", joueurs:"Jugadores",
  defi:"Reto del día", defi_fait:"¡Reto del día superado!", revoir:"Repasar", revoir_rien:"Nada que repasar hoy. ¡Juega para descubrir palabras nuevas!",
  carnet:"Mi cuaderno", carnet_aide:"Toca una palabra para escucharla.", carnet_vide:"Tu cuaderno está vacío. ¡Juega para llenarlo!",
  maitrise:n => `${n} palabras bien sabidas`, connus:(a, b) => `${a} de ${b} palabras bien sabidas`,
  j_vrai_faux:"¿Verdadero o falso?", a_vrai_faux:"¿Esta palabra va con la imagen?", vrai:"Verdadero", faux:"Falso",
  trophees:"Trofeos", tr_premiere:"Primera partida", tr_serie3:"3 días seguidos", tr_serie7:"7 días seguidos", tr_mots25:"25 palabras bien sabidas", tr_mots100:"100 palabras bien sabidas", tr_theme:"Un tema perfecto", tr_defi5:"5 retos del día", nouveau_trophee:"Nuevo trofeo",
  reglages:"Ajustes", son:"Efectos de sonido", oui:"Sí", non:"No",
  plus:"Ami des mots Plus", plus_court:"todos los temas y todos los juegos", plus_badge:"Plus", plus_titre:"Todo Ami des mots, para toda la familia.",
  plus_avantages:["Los 8 temas, todas las palabras", "Los 6 juegos, incluidos Memoria y Letras revueltas", "Hasta 6 jugadores en el dispositivo", "Las nuevas palabras y juegos que lleguen"],
  plus_prix:p => `${p} al mes`, sans_engagement:"Sin permanencia, cancela cuando quieras.", s_abonner:"Suscribirse", bientot:"Próximamente",
  gratuit_reste:"La versión gratuita sigue siendo gratuita: 3 temas, 3 juegos, el reto del día y el repaso.",
  deja_abonne:"Ya tengo una suscripción", code_abo:"Código de suscripción", code_aide:"Apunta este código: sirve para recuperar la suscripción en otro dispositivo.", verifier:"Comprobar",
  abo_actif:d => `Suscripción activa${d ? ` (hasta el ${d})` : ''}. ¡Gracias!`, abo_inconnu:"Código no encontrado o suscripción terminada.", hors_ligne:"No se puede comprobar ahora. Inténtalo más tarde.", gerer_abo:"Gestionar o cancelar la suscripción", decouvrir_plus:"Descubrir Ami des mots Plus",
  apropos_texte:"Ami des mots es un juego para aprender y repasar palabras con imágenes. Es un juego: no cura nada ni sustituye a ningún profesional. Sin cuenta y sin publicidad: tu progreso se queda en este dispositivo. Para la suscripción solo se comprueba un código anónimo; el pago lo gestiona Stripe."
},
it:{
  bonjour:n => `Ciao ${n}!`, changer_joueur:"Cambia giocatore", qui_joue:"Chi gioca?", ajouter_joueur:"Aggiungi un giocatore", modifier_joueur:"Modifica giocatore",
  prenom:"Nome", couleur:"Colore di Plumo", valider:"Conferma", supprimer_joueur:"Elimina questo giocatore", joueurs:"Giocatori",
  defi:"Sfida del giorno", defi_fait:"Sfida del giorno superata!", revoir:"Da ripassare", revoir_rien:"Niente da ripassare oggi. Gioca per scoprire nuove parole!",
  carnet:"Il mio quaderno", carnet_aide:"Tocca una parola per ascoltarla.", carnet_vide:"Il tuo quaderno è vuoto. Gioca per riempirlo!",
  maitrise:n => `${n} parole ben conosciute`, connus:(a, b) => `${a} parole su ${b} ben conosciute`,
  j_vrai_faux:"Vero o falso?", a_vrai_faux:"Questa parola va con l'immagine?", vrai:"Vero", faux:"Falso",
  trophees:"Trofei", tr_premiere:"Prima partita", tr_serie3:"3 giorni di fila", tr_serie7:"7 giorni di fila", tr_mots25:"25 parole ben conosciute", tr_mots100:"100 parole ben conosciute", tr_theme:"Un tema perfetto", tr_defi5:"5 sfide del giorno", nouveau_trophee:"Nuovo trofeo",
  reglages:"Impostazioni", son:"Effetti sonori", oui:"Sì", non:"No",
  plus:"Ami des mots Plus", plus_court:"tutti i temi e tutti i giochi", plus_badge:"Plus", plus_titre:"Tutto Ami des mots, per tutta la famiglia.",
  plus_avantages:["Tutti gli 8 temi, tutte le parole", "Tutti i 6 giochi, compresi Memoria e Lettere in disordine", "Fino a 6 giocatori sul dispositivo", "Le nuove parole e i nuovi giochi in arrivo"],
  plus_prix:p => `${p} al mese`, sans_engagement:"Senza vincoli, disdici quando vuoi.", s_abonner:"Abbonati", bientot:"Presto disponibile",
  gratuit_reste:"La versione gratuita resta gratuita: 3 temi, 3 giochi, la sfida del giorno e il ripasso.",
  deja_abonne:"Ho già un abbonamento", code_abo:"Codice di abbonamento", code_aide:"Annota questo codice: serve a ritrovare l'abbonamento su un altro dispositivo.", verifier:"Verifica",
  abo_actif:d => `Abbonamento attivo${d ? ` (fino al ${d})` : ''}. Grazie!`, abo_inconnu:"Codice non trovato o abbonamento scaduto.", hors_ligne:"Impossibile verificare ora. Riprova più tardi.", gerer_abo:"Gestisci o disdici l'abbonamento", decouvrir_plus:"Scopri Ami des mots Plus",
  apropos_texte:"Ami des mots è un gioco per imparare e ripassare parole con le immagini. È un gioco: non cura nulla e non sostituisce alcun professionista. Senza account e senza pubblicità: i tuoi progressi restano su questo dispositivo. Per l'abbonamento si verifica solo un codice anonimo; il pagamento è gestito da Stripe."
},
pt:{
  bonjour:n => `Olá, ${n}!`, changer_joueur:"Mudar de jogador", qui_joue:"Quem joga?", ajouter_joueur:"Adicionar um jogador", modifier_joueur:"Editar jogador",
  prenom:"Nome", couleur:"Cor do Plumo", valider:"Confirmar", supprimer_joueur:"Apagar este jogador", joueurs:"Jogadores",
  defi:"Desafio do dia", defi_fait:"Desafio do dia concluído!", revoir:"Rever", revoir_rien:"Nada para rever hoje. Jogue para descobrir palavras novas!",
  carnet:"O meu caderno", carnet_aide:"Toque numa palavra para a ouvir.", carnet_vide:"O seu caderno está vazio. Jogue para o preencher!",
  maitrise:n => `${n} palavras bem sabidas`, connus:(a, b) => `${a} de ${b} palavras bem sabidas`,
  j_vrai_faux:"Verdadeiro ou falso?", a_vrai_faux:"Esta palavra corresponde à imagem?", vrai:"Verdadeiro", faux:"Falso",
  trophees:"Troféus", tr_premiere:"Primeiro jogo", tr_serie3:"3 dias seguidos", tr_serie7:"7 dias seguidos", tr_mots25:"25 palavras bem sabidas", tr_mots100:"100 palavras bem sabidas", tr_theme:"Um tema perfeito", tr_defi5:"5 desafios do dia", nouveau_trophee:"Novo troféu",
  reglages:"Definições", son:"Efeitos sonoros", oui:"Sim", non:"Não",
  plus:"Ami des mots Plus", plus_court:"todos os temas e todos os jogos", plus_badge:"Plus", plus_titre:"Todo o Ami des mots, para toda a família.",
  plus_avantages:["Os 8 temas, todas as palavras", "Os 6 jogos, incluindo Memória e Letras baralhadas", "Até 6 jogadores no dispositivo", "As novas palavras e jogos que vierem"],
  plus_prix:p => `${p} por mês`, sans_engagement:"Sem fidelização, cancele quando quiser.", s_abonner:"Subscrever", bientot:"Brevemente",
  gratuit_reste:"A versão gratuita continua gratuita: 3 temas, 3 jogos, o desafio do dia e a revisão.",
  deja_abonne:"Já tenho uma subscrição", code_abo:"Código de subscrição", code_aide:"Guarde este código: permite recuperar a subscrição noutro dispositivo.", verifier:"Verificar",
  abo_actif:d => `Subscrição ativa${d ? ` (até ${d})` : ''}. Obrigado!`, abo_inconnu:"Código não encontrado ou subscrição terminada.", hors_ligne:"Não é possível verificar agora. Tente mais tarde.", gerer_abo:"Gerir ou cancelar a subscrição", decouvrir_plus:"Descobrir o Ami des mots Plus",
  apropos_texte:"Ami des mots é um jogo para aprender e rever palavras com imagens. É um jogo: não trata nada nem substitui nenhum profissional. Sem conta e sem publicidade: o seu progresso fica neste dispositivo. Para a subscrição só se verifica um código anónimo; o pagamento é gerido pela Stripe."
},
de:{
  bonjour:n => `Hallo ${n}!`, changer_joueur:"Spieler wechseln", qui_joue:"Wer spielt?", ajouter_joueur:"Spieler hinzufügen", modifier_joueur:"Spieler bearbeiten",
  prenom:"Vorname", couleur:"Plumos Farbe", valider:"Bestätigen", supprimer_joueur:"Diesen Spieler löschen", joueurs:"Spieler",
  defi:"Tagesaufgabe", defi_fait:"Tagesaufgabe geschafft!", revoir:"Wiederholen", revoir_rien:"Heute gibt es nichts zu wiederholen. Spiel und entdecke neue Wörter!",
  carnet:"Mein Heft", carnet_aide:"Tippe auf ein Wort, um es zu hören.", carnet_vide:"Dein Heft ist leer. Spiel, um es zu füllen!",
  maitrise:n => `${n} Wörter gut gelernt`, connus:(a, b) => `${a} von ${b} Wörtern gut gelernt`,
  j_vrai_faux:"Richtig oder falsch?", a_vrai_faux:"Passt dieses Wort zum Bild?", vrai:"Richtig", faux:"Falsch",
  trophees:"Pokale", tr_premiere:"Erstes Spiel", tr_serie3:"3 Tage am Stück", tr_serie7:"7 Tage am Stück", tr_mots25:"25 Wörter gut gelernt", tr_mots100:"100 Wörter gut gelernt", tr_theme:"Ein perfektes Thema", tr_defi5:"5 Tagesaufgaben", nouveau_trophee:"Neuer Pokal",
  reglages:"Einstellungen", son:"Geräusche", oui:"An", non:"Aus",
  plus:"Ami des mots Plus", plus_court:"alle Themen und alle Spiele", plus_badge:"Plus", plus_titre:"Ganz Ami des mots, für die ganze Familie.",
  plus_avantages:["Alle 8 Themen, alle Wörter", "Alle 6 Spiele, auch Memory und Buchstabensalat", "Bis zu 6 Spieler auf dem Gerät", "Neue Wörter und Spiele, sobald sie kommen"],
  plus_prix:p => `${p} pro Monat`, sans_engagement:"Ohne Bindung, jederzeit kündbar.", s_abonner:"Abonnieren", bientot:"Bald verfügbar",
  gratuit_reste:"Die kostenlose Version bleibt kostenlos: 3 Themen, 3 Spiele, die Tagesaufgabe und das Wiederholen.",
  deja_abonne:"Ich habe schon ein Abo", code_abo:"Abo-Code", code_aide:"Notiere diesen Code: Damit findest du das Abo auf einem anderen Gerät wieder.", verifier:"Prüfen",
  abo_actif:d => `Abo aktiv${d ? ` (bis ${d})` : ''}. Danke!`, abo_inconnu:"Code nicht gefunden oder Abo beendet.", hors_ligne:"Prüfen gerade nicht möglich. Versuch es später noch einmal.", gerer_abo:"Abo verwalten oder kündigen", decouvrir_plus:"Ami des mots Plus entdecken",
  apropos_texte:"Ami des mots ist ein Spiel, um Wörter mit Bildern zu lernen und zu wiederholen. Es ist ein Spiel: Es behandelt nichts und ersetzt keine Fachkraft. Ohne Konto und ohne Werbung: Dein Fortschritt bleibt auf diesem Gerät. Für das Abo wird nur ein anonymer Code geprüft; die Zahlung läuft über Stripe."
}
};
for(const l in V2) if(window.TEXTES[l]) Object.assign(window.TEXTES[l], V2[l]);
})();

// ── v3 : 50 jeux (19 sortes × niveaux) ──
(function(){
const V3 = {
fr:{
  fam_images:"Images", fam_ecoute:"Écoute", fam_traduction:"Traduction", fam_lettres:"Lettres", fam_memoire:"Mémoire et paires", fam_defis:"Défis",
  niv_f:"Facile", niv_n:"Normal", niv_e:"Expert", jeux_total:n => `${n} jeux dans ce thème`,
  j_traduction:"Traduction", j_traduction_inverse:"Que veut dire ce mot ?", j_ecoute_mot:"Écoute et lis", j_intrus:"L'intrus", j_ombre:"Ombres", j_devinette:"Image floue",
  j_premiere_lettre:"Première lettre", j_lettre_manquante:"Lettre manquante", j_memoire_trad:"Mémoire des traductions", j_relier:"Relier", j_panier:"Le bon panier", j_chrono:"Contre la montre", j_grand_quiz:"Grand quiz",
  a_traduction:l => `Comment dit-on ce mot en ${l} ?`, a_traduction_inverse:"Choisissez le mot qui a le même sens.", a_ecoute_mot:"Écoutez, puis touchez le bon mot écrit.",
  a_intrus:"Une image n'est pas du même groupe : laquelle ?", a_ombre:"Qui se cache dans l'ombre ?", a_devinette:"L'image devient nette : trouvez-la vite !",
  a_premiere_lettre:"Par quelle lettre commence ce mot ?", a_lettre_manquante:"Quelle lettre manque ?", a_memoire_trad:"Retrouvez chaque mot et sa traduction.",
  a_relier:"Touchez une image, puis son mot.", a_panier:"Dans quel panier va-t-il ?", a_chrono:"Le plus de bonnes réponses en 60 secondes.", a_grand_quiz:"15 questions de toutes sortes.",
  score:n => `${n} bonnes réponses`, temps_fini:"Temps écoulé !",
  plus_court:"les 50 jeux et tous les thèmes",
  plus_avantages:["Les 50 jeux (19 sortes, 3 niveaux)", "Les 8 thèmes, tous les mots", "Jusqu'à 6 joueurs sur l'appareil", "Les nouveaux mots et jeux à venir"],
  gratuit_reste:"La version gratuite reste gratuite : 10 jeux (dont la traduction), 3 thèmes, le défi du jour et la révision."
},
en:{
  fam_images:"Pictures", fam_ecoute:"Listening", fam_traduction:"Translation", fam_lettres:"Letters", fam_memoire:"Memory and pairs", fam_defis:"Challenges",
  niv_f:"Easy", niv_n:"Normal", niv_e:"Expert", jeux_total:n => `${n} games in this theme`,
  j_traduction:"Translation", j_traduction_inverse:"What does it mean?", j_ecoute_mot:"Listen and read", j_intrus:"Odd one out", j_ombre:"Shadows", j_devinette:"Blurry picture",
  j_premiere_lettre:"First letter", j_lettre_manquante:"Missing letter", j_memoire_trad:"Translation memory", j_relier:"Match up", j_panier:"The right basket", j_chrono:"Against the clock", j_grand_quiz:"Big quiz",
  a_traduction:l => `How do you say this word in ${l}?`, a_traduction_inverse:"Pick the word with the same meaning.", a_ecoute_mot:"Listen, then tap the right written word.",
  a_intrus:"One picture doesn't belong: which one?", a_ombre:"Who is hiding in the shadow?", a_devinette:"The picture gets sharper: find it fast!",
  a_premiere_lettre:"What letter does this word start with?", a_lettre_manquante:"Which letter is missing?", a_memoire_trad:"Match each word with its translation.",
  a_relier:"Tap a picture, then its word.", a_panier:"Which basket does it go in?", a_chrono:"As many right answers as you can in 60 seconds.", a_grand_quiz:"15 questions of every kind.",
  score:n => `${n} right answers`, temps_fini:"Time's up!",
  plus_court:"all 50 games and every theme",
  plus_avantages:["All 50 games (19 kinds, 3 levels)", "All 8 themes, every word", "Up to 6 players on this device", "New words and games as they come"],
  gratuit_reste:"The free version stays free: 10 games (including translation), 3 themes, the daily challenge and review."
},
es:{
  fam_images:"Imágenes", fam_ecoute:"Escucha", fam_traduction:"Traducción", fam_lettres:"Letras", fam_memoire:"Memoria y parejas", fam_defis:"Retos",
  niv_f:"Fácil", niv_n:"Normal", niv_e:"Experto", jeux_total:n => `${n} juegos en este tema`,
  j_traduction:"Traducción", j_traduction_inverse:"¿Qué significa?", j_ecoute_mot:"Escucha y lee", j_intrus:"El intruso", j_ombre:"Sombras", j_devinette:"Imagen borrosa",
  j_premiere_lettre:"Primera letra", j_lettre_manquante:"Letra que falta", j_memoire_trad:"Memoria de traducciones", j_relier:"Unir", j_panier:"La cesta correcta", j_chrono:"Contrarreloj", j_grand_quiz:"Gran concurso",
  a_traduction:l => `¿Cómo se dice esta palabra en ${l}?`, a_traduction_inverse:"Elige la palabra que significa lo mismo.", a_ecoute_mot:"Escucha y toca la palabra escrita correcta.",
  a_intrus:"Una imagen no es del mismo grupo: ¿cuál?", a_ombre:"¿Quién se esconde en la sombra?", a_devinette:"La imagen se aclara: ¡adivínala rápido!",
  a_premiere_lettre:"¿Con qué letra empieza esta palabra?", a_lettre_manquante:"¿Qué letra falta?", a_memoire_trad:"Encuentra cada palabra y su traducción.",
  a_relier:"Toca una imagen y luego su palabra.", a_panier:"¿En qué cesta va?", a_chrono:"Todas las respuestas correctas que puedas en 60 segundos.", a_grand_quiz:"15 preguntas de todo tipo.",
  score:n => `${n} respuestas correctas`, temps_fini:"¡Se acabó el tiempo!",
  plus_court:"los 50 juegos y todos los temas",
  plus_avantages:["Los 50 juegos (19 tipos, 3 niveles)", "Los 8 temas, todas las palabras", "Hasta 6 jugadores en el dispositivo", "Las nuevas palabras y juegos que lleguen"],
  gratuit_reste:"La versión gratuita sigue siendo gratuita: 10 juegos (con la traducción), 3 temas, el reto del día y el repaso."
},
it:{
  fam_images:"Immagini", fam_ecoute:"Ascolto", fam_traduction:"Traduzione", fam_lettres:"Lettere", fam_memoire:"Memoria e coppie", fam_defis:"Sfide",
  niv_f:"Facile", niv_n:"Normale", niv_e:"Esperto", jeux_total:n => `${n} giochi in questo tema`,
  j_traduction:"Traduzione", j_traduction_inverse:"Che cosa significa?", j_ecoute_mot:"Ascolta e leggi", j_intrus:"L'intruso", j_ombre:"Ombre", j_devinette:"Immagine sfocata",
  j_premiere_lettre:"Prima lettera", j_lettre_manquante:"Lettera mancante", j_memoire_trad:"Memoria delle traduzioni", j_relier:"Collega", j_panier:"Il cesto giusto", j_chrono:"Contro il tempo", j_grand_quiz:"Grande quiz",
  a_traduction:l => `Come si dice questa parola in ${l}?`, a_traduction_inverse:"Scegli la parola con lo stesso significato.", a_ecoute_mot:"Ascolta, poi tocca la parola scritta giusta.",
  a_intrus:"Un'immagine non è dello stesso gruppo: quale?", a_ombre:"Chi si nasconde nell'ombra?", a_devinette:"L'immagine diventa nitida: indovinala in fretta!",
  a_premiere_lettre:"Con quale lettera inizia questa parola?", a_lettre_manquante:"Quale lettera manca?", a_memoire_trad:"Trova ogni parola e la sua traduzione.",
  a_relier:"Tocca un'immagine, poi la sua parola.", a_panier:"In quale cesto va?", a_chrono:"Più risposte giuste possibili in 60 secondi.", a_grand_quiz:"15 domande di ogni tipo.",
  score:n => `${n} risposte giuste`, temps_fini:"Tempo scaduto!",
  plus_court:"i 50 giochi e tutti i temi",
  plus_avantages:["Tutti i 50 giochi (19 tipi, 3 livelli)", "Tutti gli 8 temi, tutte le parole", "Fino a 6 giocatori sul dispositivo", "Le nuove parole e i nuovi giochi in arrivo"],
  gratuit_reste:"La versione gratuita resta gratuita: 10 giochi (compresa la traduzione), 3 temi, la sfida del giorno e il ripasso."
},
pt:{
  fam_images:"Imagens", fam_ecoute:"Ouvir", fam_traduction:"Tradução", fam_lettres:"Letras", fam_memoire:"Memória e pares", fam_defis:"Desafios",
  niv_f:"Fácil", niv_n:"Normal", niv_e:"Especialista", jeux_total:n => `${n} jogos neste tema`,
  j_traduction:"Tradução", j_traduction_inverse:"O que quer dizer?", j_ecoute_mot:"Ouve e lê", j_intrus:"O intruso", j_ombre:"Sombras", j_devinette:"Imagem desfocada",
  j_premiere_lettre:"Primeira letra", j_lettre_manquante:"Letra em falta", j_memoire_trad:"Memória das traduções", j_relier:"Ligar", j_panier:"O cesto certo", j_chrono:"Contra o relógio", j_grand_quiz:"Grande quiz",
  a_traduction:l => `Como se diz esta palavra em ${l}?`, a_traduction_inverse:"Escolha a palavra com o mesmo sentido.", a_ecoute_mot:"Ouça e toque na palavra escrita certa.",
  a_intrus:"Uma imagem não é do mesmo grupo: qual?", a_ombre:"Quem se esconde na sombra?", a_devinette:"A imagem fica nítida: adivinhe depressa!",
  a_premiere_lettre:"Por que letra começa esta palavra?", a_lettre_manquante:"Que letra falta?", a_memoire_trad:"Encontre cada palavra e a sua tradução.",
  a_relier:"Toque numa imagem e depois na sua palavra.", a_panier:"Em que cesto vai?", a_chrono:"O máximo de respostas certas em 60 segundos.", a_grand_quiz:"15 perguntas de todos os tipos.",
  score:n => `${n} respostas certas`, temps_fini:"Acabou o tempo!",
  plus_court:"os 50 jogos e todos os temas",
  plus_avantages:["Os 50 jogos (19 tipos, 3 níveis)", "Os 8 temas, todas as palavras", "Até 6 jogadores no dispositivo", "As novas palavras e jogos que vierem"],
  gratuit_reste:"A versão gratuita continua gratuita: 10 jogos (incluindo a tradução), 3 temas, o desafio do dia e a revisão."
},
de:{
  fam_images:"Bilder", fam_ecoute:"Hören", fam_traduction:"Übersetzen", fam_lettres:"Buchstaben", fam_memoire:"Memory und Paare", fam_defis:"Herausforderungen",
  niv_f:"Leicht", niv_n:"Mittel", niv_e:"Profi", jeux_total:n => `${n} Spiele in diesem Thema`,
  j_traduction:"Übersetzen", j_traduction_inverse:"Was bedeutet das?", j_ecoute_mot:"Hören und lesen", j_intrus:"Was passt nicht?", j_ombre:"Schatten", j_devinette:"Unscharfes Bild",
  j_premiere_lettre:"Erster Buchstabe", j_lettre_manquante:"Fehlender Buchstabe", j_memoire_trad:"Übersetzungs-Memory", j_relier:"Verbinden", j_panier:"Der richtige Korb", j_chrono:"Gegen die Uhr", j_grand_quiz:"Großes Quiz",
  a_traduction:l => `Wie heißt dieses Wort auf ${l}?`, a_traduction_inverse:"Wähle das Wort mit derselben Bedeutung.", a_ecoute_mot:"Hör zu und tippe auf das richtige geschriebene Wort.",
  a_intrus:"Ein Bild gehört nicht dazu: welches?", a_ombre:"Wer versteckt sich im Schatten?", a_devinette:"Das Bild wird scharf: Errate es schnell!",
  a_premiere_lettre:"Mit welchem Buchstaben beginnt dieses Wort?", a_lettre_manquante:"Welcher Buchstabe fehlt?", a_memoire_trad:"Finde jedes Wort und seine Übersetzung.",
  a_relier:"Tippe auf ein Bild, dann auf sein Wort.", a_panier:"In welchen Korb gehört es?", a_chrono:"So viele richtige Antworten wie möglich in 60 Sekunden.", a_grand_quiz:"15 Fragen aller Art.",
  score:n => `${n} richtige Antworten`, temps_fini:"Die Zeit ist um!",
  plus_court:"alle 50 Spiele und alle Themen",
  plus_avantages:["Alle 50 Spiele (19 Arten, 3 Stufen)", "Alle 8 Themen, alle Wörter", "Bis zu 6 Spieler auf dem Gerät", "Neue Wörter und Spiele, sobald sie kommen"],
  gratuit_reste:"Die kostenlose Version bleibt kostenlos: 10 Spiele (mit Übersetzen), 3 Themen, die Tagesaufgabe und das Wiederholen."
}
};
for(const l in V3) if(window.TEXTES[l]) Object.assign(window.TEXTES[l], V3[l]);
})();

// ── v3.2 : lecture facile (pensée pour les personnes dys) ──
(function(){
const V = {
fr:{ facile:"Lecture facile", facile_aide:"Plus d'espace entre les lettres, consignes lues à voix haute, 3 choix au plus, jamais de temps limité.", lire_consigne:"Écouter la consigne" },
en:{ facile:"Easy reading", facile_aide:"More space between letters, instructions read aloud, 3 choices at most, never a time limit.", lire_consigne:"Hear the instruction" },
es:{ facile:"Lectura fácil", facile_aide:"Más espacio entre las letras, instrucciones leídas en voz alta, 3 opciones como máximo, nunca con tiempo límite.", lire_consigne:"Escuchar la instrucción" },
it:{ facile:"Lettura facile", facile_aide:"Più spazio tra le lettere, istruzioni lette ad alta voce, al massimo 3 scelte, mai un limite di tempo.", lire_consigne:"Ascolta l'istruzione" },
pt:{ facile:"Leitura fácil", facile_aide:"Mais espaço entre as letras, instruções lidas em voz alta, 3 escolhas no máximo, nunca com limite de tempo.", lire_consigne:"Ouvir a instrução" },
de:{ facile:"Leichtes Lesen", facile_aide:"Mehr Abstand zwischen den Buchstaben, Anweisungen werden vorgelesen, höchstens 3 Antworten, nie ein Zeitlimit.", lire_consigne:"Anweisung anhören" }
};
for(const l in V) if(window.TEXTES[l]) Object.assign(window.TEXTES[l], V[l]);
})();

// ── v4.1 : nombre de mots par langue, sauvegarde des progrès ──
(function(){
const V = {
fr:{ nb_mots:n => `${n} mots`, sauvegarde:"Mes progrès", sauvegarde_aide:"Gardez un fichier de sauvegarde : il permet de retrouver tous les joueurs et leurs progrès sur ce téléphone ou un autre.", sauvegarder:"Sauvegarder", restaurer:"Restaurer", restaure_ok:"Progrès restaurés", restaure_ko:"Ce fichier n'est pas une sauvegarde d'Ami des mots." },
en:{ nb_mots:n => `${n} words`, sauvegarde:"My progress", sauvegarde_aide:"Keep a backup file: it brings back every player and their progress on this phone or another.", sauvegarder:"Back up", restaurer:"Restore", restaure_ok:"Progress restored", restaure_ko:"This file is not an Ami des mots backup." },
es:{ nb_mots:n => `${n} palabras`, sauvegarde:"Mi progreso", sauvegarde_aide:"Guarda un archivo de copia: recupera a todos los jugadores y su progreso en este teléfono o en otro.", sauvegarder:"Guardar copia", restaurer:"Restaurar", restaure_ok:"Progreso restaurado", restaure_ko:"Este archivo no es una copia de Ami des mots." },
it:{ nb_mots:n => `${n} parole`, sauvegarde:"I miei progressi", sauvegarde_aide:"Conserva un file di backup: ritrova tutti i giocatori e i loro progressi su questo telefono o su un altro.", sauvegarder:"Salva", restaurer:"Ripristina", restaure_ok:"Progressi ripristinati", restaure_ko:"Questo file non è un backup di Ami des mots." },
pt:{ nb_mots:n => `${n} palavras`, sauvegarde:"O meu progresso", sauvegarde_aide:"Guarde um ficheiro de cópia: recupera todos os jogadores e o seu progresso neste telemóvel ou noutro.", sauvegarder:"Guardar cópia", restaurer:"Restaurar", restaure_ok:"Progresso restaurado", restaure_ko:"Este ficheiro não é uma cópia do Ami des mots." },
de:{ nb_mots:n => `${n} Wörter`, sauvegarde:"Mein Fortschritt", sauvegarde_aide:"Bewahre eine Sicherungsdatei auf: Damit holst du alle Spieler und ihren Fortschritt auf dieses oder ein anderes Handy zurück.", sauvegarder:"Sichern", restaurer:"Wiederherstellen", restaure_ok:"Fortschritt wiederhergestellt", restaure_ko:"Diese Datei ist keine Sicherung von Ami des mots." }
};
for(const l in V) if(window.TEXTES[l]) Object.assign(window.TEXTES[l], V[l]);
})();

// ── v4.2 : transparence sur les voix ──
(function(){
const V = {
fr:{ apropos_voix:"Les voix enregistrées des mots sont lues depuis le site d’Ami des mots lui-même ; s’il manque un son, la voix du téléphone prend le relais. Aucun nom ni aucune progression n’est envoyé." },
en:{ apropos_voix:"Recorded word voices are played from the Ami des mots website itself; if a sound is missing, the phone’s voice takes over. No name or progress is sent." },
es:{ apropos_voix:"Las voces grabadas de las palabras se reproducen desde la propia web de Ami des mots; si falta un sonido, la voz del teléfono toma el relevo. No se envía ningún nombre ni progreso." },
it:{ apropos_voix:"Le voci registrate delle parole vengono riprodotte dal sito di Ami des mots stesso; se manca un suono, subentra la voce del telefono. Nessun nome né progresso viene inviato." },
pt:{ apropos_voix:"As vozes gravadas das palavras são reproduzidas a partir do próprio site do Ami des mots; se faltar um som, a voz do telemóvel assume. Nenhum nome nem progresso é enviado." },
de:{ apropos_voix:"Aufgenommene Wortstimmen werden von der Ami-des-mots-Website selbst abgespielt; fehlt ein Ton, übernimmt die Stimme des Handys. Es werden weder Namen noch Fortschritte gesendet." }
};
for(const l in V) if(window.TEXTES[l]) Object.assign(window.TEXTES[l], V[l]);
})();

// ── v4.4 : apprendre avant de jouer (leçons, mots présentés) ──
(function(){
const V = {
fr:{ apprendre:"Apprendre 5 mots", nouveau_mot:"Nouveau mot !", a_nouveau_mot:"Regardez, écoutez, puis on joue avec ce mot.", compris:"J'ai compris", deja_connu:"Je le connais déjà", lecon_fin:n => `${n} nouveaux mots !`, lecon_rien:"Vous avez découvert tous les mots. Révisez-les dans « À revoir »." },
en:{ apprendre:"Learn 5 words", nouveau_mot:"New word!", a_nouveau_mot:"Look, listen, then we'll play with this word.", compris:"Got it", deja_connu:"I already know it", lecon_fin:n => `${n} new words!`, lecon_rien:"You've discovered every word. Practise them in Review." },
es:{ apprendre:"Aprender 5 palabras", nouveau_mot:"¡Palabra nueva!", a_nouveau_mot:"Mira, escucha y luego jugamos con esta palabra.", compris:"Entendido", deja_connu:"Ya la conozco", lecon_fin:n => `¡${n} palabras nuevas!`, lecon_rien:"Has descubierto todas las palabras. Repásalas en «Repasar»." },
it:{ apprendre:"Impara 5 parole", nouveau_mot:"Parola nuova!", a_nouveau_mot:"Guarda, ascolta, poi giochiamo con questa parola.", compris:"Ho capito", deja_connu:"La conosco già", lecon_fin:n => `${n} parole nuove!`, lecon_rien:"Hai scoperto tutte le parole. Ripassale in «Da ripassare»." },
pt:{ apprendre:"Aprender 5 palavras", nouveau_mot:"Palavra nova!", a_nouveau_mot:"Olhe, ouça e depois jogamos com esta palavra.", compris:"Percebi", deja_connu:"Já a conheço", lecon_fin:n => `${n} palavras novas!`, lecon_rien:"Já descobriu todas as palavras. Reveja-as em «Rever»." },
de:{ apprendre:"5 Wörter lernen", nouveau_mot:"Neues Wort!", a_nouveau_mot:"Schau, hör zu, dann spielen wir mit diesem Wort.", compris:"Verstanden", deja_connu:"Kenne ich schon", lecon_fin:n => `${n} neue Wörter!`, lecon_rien:"Du hast alle Wörter entdeckt. Wiederhole sie unter „Wiederholen“." }
};
for(const l in V) if(window.TEXTES[l]) Object.assign(window.TEXTES[l], V[l]);
})();

// ── v5 : blagues de Plumo, prononciation, conseils, mot du jour ──
// Les blagues portent sur Plumo ou sur le mot, JAMAIS sur la personne.
(function(){
const V = {
fr:{
  blagues:["Oups ! Hier, j'ai dit bonjour à un lampadaire. Tout le monde se trompe !", "Pas grave ! Même les hiboux se trompent… surtout avant leur goûter de minuit.", "Ce mot joue à cache-cache avec nous. On le retrouve ?", "Tu as essayé, et c'est comme ça que le cerveau se muscle !", "Hou hou ! Mes plumes se sont emmêlées aussi. Encore une fois ?", "Ce mot est farceur : il s'est déguisé ! Regardons mieux.", "Une erreur, c'est un mot qui dit : « Reviens me voir ! »", "Mon arrière-grand-hibou confondait un chat et un chapeau. Véridique !", "Oh ! Une erreur sauvage apparaît… On l'attrape ensemble ?", "Chaque erreur me fait pousser une plume de sagesse. Merci !", "Tu viens d'inventer un nouveau mot ! On cherche l'autre ?", "J'ai une collection d'erreurs. Elles sont toutes très jolies."],
  lentement:"Écouter lentement", bouche:"Voir la bouche", a_toi:"À toi !", a_toi_aide:"Écoute Plumo, puis appuie sur le micro et dis le mot.", parler:"Parler", j_ecoute:"Je t'écoute…", dis_le_mot:"Dis le mot maintenant !",
  me_reecouter:"Me réécouter", ecouter_ami:"Écouter Plumo", a_toi_prive:"Ta voix reste sur cet appareil : rien n'est envoyé ni gardé.", a_toi_bravo:"Bravo, tu as osé parler ! Compare ta voix à celle de Plumo.",
  sans_micro:"Pas de micro ? Dis le mot à voix haute : c'est déjà très bien !", je_l_ai_dit:"Je l'ai dit !", reessayer:"Réessayer",
  mot_du_jour:"Le mot du jour", astuce_ami:"L'astuce de Plumo", toutes_astuces:"Toutes les astuces", astuces:"Astuces", astuces_titre:"Comment parler une autre langue", astuces_intro:"Personne ne naît en parlant une langue : tout le monde l'apprend, petit à petit. Voici mes secrets.",
  conseils:[["Un peu chaque jour.", "Cinq minutes par jour valent mieux qu'une heure le dimanche : le cerveau aime les rendez-vous réguliers."], ["Parle à voix haute.", "Dis chaque mot, même tout seul. Ta bouche apprend aussi, pas seulement tes yeux."], ["Répète comme un écho.", "Écoute, puis répète tout de suite avec la même musique. Le bouton 🐢 aide pour les mots difficiles."], ["Ose te tromper.", "Personne ne parle parfaitement au début. Chaque erreur te rapproche du bon mot."], ["Colle des mots partout.", "Mets de petites étiquettes sur les objets de la maison : porte, table, fenêtre…"], ["Apprends en famille.", "Demande à un parent ou à un grand-parent de te dire les mots de sa langue, et apprends-lui les tiens."], ["Chante et écoute.", "Chansons, dessins animés, histoires : ton oreille s'habitue aux sons sans effort."], ["Revois au bon moment.", "« À revoir » te redonne les mots juste avant que tu les oublies. C'est le secret des mots qui restent."]],
  ou_bouche_titre:"Comment la bouche fait ce mot", ou_nez:"l'air passe par le nez", ou_voix:"la gorge vibre", ou_normal:"Normal", ou_lent:"Lentement", ou_fermer:"Fermer", ou_schema_note:"Un dessin simple pour s'aider ; la voix reste le meilleur modèle.", ou_bouche_btn:"Voir la bouche"
},
en:{
  blagues:["Oops! Yesterday I said hello to a lamppost. Everyone gets things wrong!", "No problem! Even owls make mistakes… especially before their midnight snack.", "This word is playing hide-and-seek with us. Shall we find it?", "You tried, and that's how a brain gets stronger!", "Hoo hoo! My feathers got tangled too. One more time?", "This word is a joker: it's wearing a disguise! Let's look again.", "A mistake is just a word saying: “Come back and see me!”", "My great-grandfather owl mixed up a cat and a hat. True story!", "Oh! A wild mistake appears… Shall we catch it together?", "Every mistake grows me a feather of wisdom. Thanks!", "You just invented a new word! Shall we find the other one?", "I collect mistakes. They're all very pretty."],
  lentement:"Listen slowly", bouche:"See the mouth", a_toi:"Your turn!", a_toi_aide:"Listen to Plumo, then press the mic and say the word.", parler:"Speak", j_ecoute:"I'm listening…", dis_le_mot:"Say the word now!",
  me_reecouter:"Hear myself", ecouter_ami:"Hear Plumo", a_toi_prive:"Your voice stays on this device: nothing is sent or kept.", a_toi_bravo:"Well done, you dared to speak! Compare your voice with Plumo's.",
  sans_micro:"No microphone? Say the word out loud: that's already great!", je_l_ai_dit:"I said it!", reessayer:"Try again",
  mot_du_jour:"Word of the day", astuce_ami:"Plumo's tip", toutes_astuces:"All the tips", astuces:"Tips", astuces_titre:"How to speak another language", astuces_intro:"Nobody is born speaking a language: everyone learns it, little by little. Here are my secrets.",
  conseils:[["A little every day.", "Five minutes a day beat one hour on Sunday: the brain loves regular appointments."], ["Speak out loud.", "Say every word, even on your own. Your mouth learns too, not just your eyes."], ["Repeat like an echo.", "Listen, then repeat straight away with the same melody. The 🐢 button helps with hard words."], ["Dare to make mistakes.", "Nobody speaks perfectly at first. Every mistake brings you closer to the right word."], ["Stick words everywhere.", "Put little labels on things at home: door, table, window…"], ["Learn as a family.", "Ask a parent or grandparent to tell you words in their language, and teach them yours."], ["Sing and listen.", "Songs, cartoons, stories: your ear gets used to the sounds without effort."], ["Review at the right time.", "Review gives you words back just before you forget them. That's the secret of words that stick."]],
  ou_bouche_titre:"How the mouth makes this word", ou_nez:"air goes through the nose", ou_voix:"the throat vibrates", ou_normal:"Normal", ou_lent:"Slowly", ou_fermer:"Close", ou_schema_note:"A simple drawing to help; the voice is still the best model.", ou_bouche_btn:"See the mouth"
},
es:{
  blagues:["¡Uy! Ayer saludé a una farola. ¡Todo el mundo se equivoca!", "¡No pasa nada! Hasta los búhos se equivocan… sobre todo antes de su merienda de medianoche.", "Esta palabra juega al escondite con nosotros. ¿La buscamos?", "Lo has intentado, ¡y así es como el cerebro se pone fuerte!", "¡Uh, uh! A mí también se me enredaron las plumas. ¿Otra vez?", "Esta palabra es bromista: ¡se ha disfrazado! Miremos mejor.", "Un error es una palabra que dice: «¡Vuelve a verme!»", "Mi bisabuelo búho confundía un gato con un sombrero. ¡De verdad!", "¡Oh! Aparece un error salvaje… ¿Lo atrapamos juntos?", "Cada error me hace crecer una pluma de sabiduría. ¡Gracias!", "¡Acabas de inventar una palabra nueva! ¿Buscamos la otra?", "Colecciono errores. Todos son muy bonitos."],
  lentement:"Escuchar despacio", bouche:"Ver la boca", a_toi:"¡Te toca!", a_toi_aide:"Escucha a Plumo, luego pulsa el micro y di la palabra.", parler:"Hablar", j_ecoute:"Te escucho…", dis_le_mot:"¡Di la palabra ahora!",
  me_reecouter:"Volver a oírme", ecouter_ami:"Escuchar a Plumo", a_toi_prive:"Tu voz se queda en este dispositivo: no se envía ni se guarda nada.", a_toi_bravo:"¡Bravo, te has atrevido a hablar! Compara tu voz con la de Plumo.",
  sans_micro:"¿No hay micro? Di la palabra en voz alta: ¡eso ya está muy bien!", je_l_ai_dit:"¡Lo he dicho!", reessayer:"Reintentar",
  mot_du_jour:"La palabra del día", astuce_ami:"El truco de Plumo", toutes_astuces:"Todos los trucos", astuces:"Trucos", astuces_titre:"Cómo hablar otro idioma", astuces_intro:"Nadie nace hablando un idioma: todos lo aprendemos poco a poco. Estos son mis secretos.",
  conseils:[["Un poco cada día.", "Cinco minutos al día valen más que una hora el domingo: al cerebro le encantan las citas regulares."], ["Habla en voz alta.", "Di cada palabra, aunque estés solo. Tu boca también aprende, no solo tus ojos."], ["Repite como un eco.", "Escucha y repite enseguida con la misma música. El botón 🐢 ayuda con las palabras difíciles."], ["Atrévete a equivocarte.", "Nadie habla perfectamente al principio. Cada error te acerca a la palabra correcta."], ["Pega palabras por todas partes.", "Pon pequeñas etiquetas en las cosas de casa: puerta, mesa, ventana…"], ["Aprende en familia.", "Pide a un padre o a un abuelo que te diga palabras de su idioma, y enséñale las tuyas."], ["Canta y escucha.", "Canciones, dibujos animados, cuentos: tu oído se acostumbra a los sonidos sin esfuerzo."], ["Repasa en el momento justo.", "«Repasar» te devuelve las palabras justo antes de que las olvides. Es el secreto de las palabras que se quedan."]],
  ou_bouche_titre:"Cómo hace la boca esta palabra", ou_nez:"el aire pasa por la nariz", ou_voix:"la garganta vibra", ou_normal:"Normal", ou_lent:"Despacio", ou_fermer:"Cerrar", ou_schema_note:"Un dibujo sencillo para ayudar; la voz sigue siendo el mejor modelo.", ou_bouche_btn:"Ver la boca"
},
it:{
  blagues:["Ops! Ieri ho salutato un lampione. Tutti sbagliano!", "Niente di grave! Anche i gufi sbagliano… soprattutto prima della merenda di mezzanotte.", "Questa parola gioca a nascondino con noi. La ritroviamo?", "Hai provato, ed è così che il cervello diventa forte!", "Uh uh! Anche le mie piume si sono aggrovigliate. Un'altra volta?", "Questa parola è burlona: si è travestita! Guardiamo meglio.", "Un errore è una parola che dice: «Torna a trovarmi!»", "Il mio bisnonno gufo confondeva un gatto con un cappello. Giuro!", "Oh! Appare un errore selvatico… Lo catturiamo insieme?", "Ogni errore mi fa crescere una piuma di saggezza. Grazie!", "Hai appena inventato una parola nuova! Cerchiamo l'altra?", "Colleziono errori. Sono tutti bellissimi."],
  lentement:"Ascolta piano", bouche:"Guarda la bocca", a_toi:"Tocca a te!", a_toi_aide:"Ascolta Plumo, poi premi il microfono e di' la parola.", parler:"Parla", j_ecoute:"Ti ascolto…", dis_le_mot:"Di' la parola adesso!",
  me_reecouter:"Riascoltarmi", ecouter_ami:"Ascolta Plumo", a_toi_prive:"La tua voce resta su questo dispositivo: niente viene inviato o conservato.", a_toi_bravo:"Bravo, hai osato parlare! Confronta la tua voce con quella di Plumo.",
  sans_micro:"Niente microfono? Di' la parola ad alta voce: va già benissimo!", je_l_ai_dit:"L'ho detta!", reessayer:"Riprova",
  mot_du_jour:"La parola del giorno", astuce_ami:"Il trucco di Plumo", toutes_astuces:"Tutti i trucchi", astuces:"Trucchi", astuces_titre:"Come parlare un'altra lingua", astuces_intro:"Nessuno nasce parlando una lingua: tutti la imparano, poco a poco. Ecco i miei segreti.",
  conseils:[["Un po' ogni giorno.", "Cinque minuti al giorno valgono più di un'ora la domenica: il cervello ama gli appuntamenti regolari."], ["Parla ad alta voce.", "Di' ogni parola, anche da solo. Anche la tua bocca impara, non solo gli occhi."], ["Ripeti come un'eco.", "Ascolta, poi ripeti subito con la stessa musica. Il pulsante 🐢 aiuta con le parole difficili."], ["Osa sbagliare.", "Nessuno parla perfettamente all'inizio. Ogni errore ti avvicina alla parola giusta."], ["Attacca parole ovunque.", "Metti piccole etichette sugli oggetti di casa: porta, tavolo, finestra…"], ["Impara in famiglia.", "Chiedi a un genitore o a un nonno di dirti le parole della sua lingua, e insegnagli le tue."], ["Canta e ascolta.", "Canzoni, cartoni animati, storie: il tuo orecchio si abitua ai suoni senza fatica."], ["Ripassa al momento giusto.", "«Da ripassare» ti ridà le parole proprio prima che tu le dimentichi. È il segreto delle parole che restano."]],
  ou_bouche_titre:"Come la bocca fa questa parola", ou_nez:"l'aria passa dal naso", ou_voix:"la gola vibra", ou_normal:"Normale", ou_lent:"Piano", ou_fermer:"Chiudi", ou_schema_note:"Un disegno semplice per aiutarsi; la voce resta il modello migliore.", ou_bouche_btn:"Guarda la bocca"
},
pt:{
  blagues:["Ups! Ontem disse olá a um candeeiro de rua. Toda a gente se engana!", "Não faz mal! Até os mochos se enganam… sobretudo antes do lanche da meia-noite.", "Esta palavra está a brincar às escondidas connosco. Vamos encontrá-la?", "Tentaste, e é assim que o cérebro fica forte!", "Uh uh! As minhas penas também se enredaram. Mais uma vez?", "Esta palavra é brincalhona: mascarou-se! Vamos olhar melhor.", "Um erro é uma palavra a dizer: «Volta a visitar-me!»", "O meu bisavô mocho confundia um gato com um chapéu. Verdade!", "Oh! Aparece um erro selvagem… Apanhamo-lo juntos?", "Cada erro faz-me crescer uma pena de sabedoria. Obrigado!", "Acabaste de inventar uma palavra nova! Procuramos a outra?", "Faço coleção de erros. São todos muito bonitos."],
  lentement:"Ouvir devagar", bouche:"Ver a boca", a_toi:"A tua vez!", a_toi_aide:"Ouve o Plumo, depois carrega no microfone e diz a palavra.", parler:"Falar", j_ecoute:"Estou a ouvir…", dis_le_mot:"Diz a palavra agora!",
  me_reecouter:"Ouvir-me outra vez", ecouter_ami:"Ouvir o Plumo", a_toi_prive:"A tua voz fica neste dispositivo: nada é enviado nem guardado.", a_toi_bravo:"Boa, tiveste coragem de falar! Compara a tua voz com a do Plumo.",
  sans_micro:"Sem microfone? Diz a palavra em voz alta: isso já é ótimo!", je_l_ai_dit:"Já disse!", reessayer:"Tentar outra vez",
  mot_du_jour:"A palavra do dia", astuce_ami:"A dica do Plumo", toutes_astuces:"Todas as dicas", astuces:"Dicas", astuces_titre:"Como falar outra língua", astuces_intro:"Ninguém nasce a falar uma língua: todos a aprendem, aos poucos. Aqui estão os meus segredos.",
  conseils:[["Um pouco todos os dias.", "Cinco minutos por dia valem mais do que uma hora ao domingo: o cérebro adora encontros regulares."], ["Fala em voz alta.", "Diz cada palavra, mesmo sozinho. A tua boca também aprende, não só os teus olhos."], ["Repete como um eco.", "Ouve e repete logo a seguir com a mesma música. O botão 🐢 ajuda nas palavras difíceis."], ["Não tenhas medo de errar.", "Ninguém fala perfeitamente no início. Cada erro aproxima-te da palavra certa."], ["Cola palavras por todo o lado.", "Põe pequenas etiquetas nas coisas de casa: porta, mesa, janela…"], ["Aprende em família.", "Pede a um pai ou a um avô que te diga as palavras da língua dele, e ensina-lhe as tuas."], ["Canta e ouve.", "Canções, desenhos animados, histórias: o teu ouvido habitua-se aos sons sem esforço."], ["Revê no momento certo.", "«Rever» devolve-te as palavras mesmo antes de as esqueceres. É o segredo das palavras que ficam."]],
  ou_bouche_titre:"Como a boca faz esta palavra", ou_nez:"o ar passa pelo nariz", ou_voix:"a garganta vibra", ou_normal:"Normal", ou_lent:"Devagar", ou_fermer:"Fechar", ou_schema_note:"Um desenho simples para ajudar; a voz continua a ser o melhor modelo.", ou_bouche_btn:"Ver a boca"
},
de:{
  blagues:["Hoppla! Gestern habe ich eine Laterne begrüßt. Jeder irrt sich mal!", "Macht nichts! Sogar Eulen irren sich … vor allem vor ihrem Mitternachtssnack.", "Dieses Wort spielt Verstecken mit uns. Finden wir es?", "Du hast es versucht – genau so wird das Gehirn stark!", "Hu hu! Meine Federn haben sich auch verheddert. Noch einmal?", "Dieses Wort ist ein Spaßvogel: Es hat sich verkleidet! Schauen wir genauer hin.", "Ein Fehler ist ein Wort, das sagt: „Besuch mich wieder!“", "Mein Urgroßvater-Uhu hat eine Katze mit einem Hut verwechselt. Ehrlich!", "Oh! Ein wilder Fehler erscheint … Fangen wir ihn zusammen?", "Bei jedem Fehler wächst mir eine Feder der Weisheit. Danke!", "Du hast gerade ein neues Wort erfunden! Suchen wir das andere?", "Ich sammle Fehler. Sie sind alle sehr hübsch."],
  lentement:"Langsam anhören", bouche:"Den Mund sehen", a_toi:"Du bist dran!", a_toi_aide:"Hör Plumo zu, drück dann aufs Mikrofon und sag das Wort.", parler:"Sprechen", j_ecoute:"Ich höre zu …", dis_le_mot:"Sag jetzt das Wort!",
  me_reecouter:"Mich anhören", ecouter_ami:"Plumo anhören", a_toi_prive:"Deine Stimme bleibt auf diesem Gerät: Nichts wird gesendet oder gespeichert.", a_toi_bravo:"Super, du hast dich getraut zu sprechen! Vergleiche deine Stimme mit Amis.",
  sans_micro:"Kein Mikrofon? Sag das Wort laut: Das ist schon toll!", je_l_ai_dit:"Ich hab's gesagt!", reessayer:"Nochmal",
  mot_du_jour:"Das Wort des Tages", astuce_ami:"Plumos Tipp", toutes_astuces:"Alle Tipps", astuces:"Tipps", astuces_titre:"Wie man eine andere Sprache spricht", astuces_intro:"Niemand kommt sprechend auf die Welt: Jeder lernt eine Sprache, nach und nach. Hier sind meine Geheimnisse.",
  conseils:[["Jeden Tag ein bisschen.", "Fünf Minuten am Tag sind besser als eine Stunde am Sonntag: Das Gehirn liebt regelmäßige Termine."], ["Sprich laut.", "Sag jedes Wort, auch wenn du allein bist. Auch dein Mund lernt, nicht nur deine Augen."], ["Wiederhole wie ein Echo.", "Hör zu und sprich sofort mit derselben Melodie nach. Der 🐢-Knopf hilft bei schweren Wörtern."], ["Trau dich, Fehler zu machen.", "Niemand spricht am Anfang perfekt. Jeder Fehler bringt dich dem richtigen Wort näher."], ["Klebe überall Wörter hin.", "Bring kleine Zettel an Dingen im Haus an: Tür, Tisch, Fenster …"], ["Lerne mit der Familie.", "Bitte Eltern oder Großeltern, dir Wörter ihrer Sprache zu sagen, und bring ihnen deine bei."], ["Sing und hör zu.", "Lieder, Zeichentrickfilme, Geschichten: Dein Ohr gewöhnt sich mühelos an die Laute."], ["Wiederhole zur richtigen Zeit.", "„Wiederholen“ gibt dir die Wörter zurück, kurz bevor du sie vergisst. Das ist das Geheimnis der Wörter, die bleiben."]],
  ou_bouche_titre:"Wie der Mund dieses Wort macht", ou_nez:"Luft geht durch die Nase", ou_voix:"der Hals vibriert", ou_normal:"Normal", ou_lent:"Langsam", ou_fermer:"Schließen", ou_schema_note:"Eine einfache Zeichnung als Hilfe; die Stimme bleibt das beste Vorbild.", ou_bouche_btn:"Den Mund sehen"
}
};
for(const l in V) if(window.TEXTES[l]) Object.assign(window.TEXTES[l], V[l]);
})();
