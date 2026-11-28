// Ami des mots — v10.5 : PLUMO VIVANT.
// 1) Des réactions qui ne se répètent pas : chaque « bravo » est composé d'une ouverture et d'une réaction de Plumo
//    (14 × 30 en français, 10 × 30 dans les autres langues, soit plus de 300 phrases par langue). Le jeu les tire
//    sans remise grâce à la mémoire des vannes déjà dites (js/jeu.js, memoireVannes) : rien ne revient avant longtemps.
// 2) Un hibou qui bouge tout le temps : il respire, regarde à droite et à gauche, penche la tête, sautille, se dandine,
//    gonfle ses plumes, suit le pointeur des yeux, et réagit quand on le touche. Rien de tout ça si l'utilisateur a
//    demandé moins d'animations (réglage du système ou mode « facile »).
(function(){
  'use strict';
  const OUV = {
    fr:['Bravo !', 'Exact !', 'Juste !', 'Bien vu !', 'Impeccable !', 'Dans le mille !', 'Parfait !', 'Excellent !', 'Carton plein !', 'Joli coup !', 'Bingo !', 'C’est ça !', 'Tout bon !', 'Validé !'],
    en:['Correct!', 'Right!', 'Spot on!', 'Nailed it!', 'Perfect!', 'Bullseye!', 'Brilliant!', 'Yes!', 'Bingo!', 'Exactly!'],
    es:['¡Correcto!', '¡Exacto!', '¡Bien visto!', '¡Perfecto!', '¡En el blanco!', '¡Genial!', '¡Bingo!', '¡Eso es!', '¡Impecable!', '¡Muy bien!'],
    de:['Richtig!', 'Genau!', 'Volltreffer!', 'Perfekt!', 'Super!', 'Bingo!', 'Klasse!', 'Stimmt!', 'Spitze!', 'Sauber!'],
    it:['Esatto!', 'Giusto!', 'Ben visto!', 'Perfetto!', 'Centro!', 'Bravo!', 'Bingo!', 'Proprio così!', 'Impeccabile!', 'Ottimo!'],
    pt:['Certo!', 'Exato!', 'Bem visto!', 'Perfeito!', 'Na mouche!', 'Muito bem!', 'Bingo!', 'É isso!', 'Impecável!', 'Excelente!']
  };
  const ACT = {
    fr:['Plumo range sa vanne… pour l’instant. 😏', 'Plumo applaudit des deux ailes. 👏', 'Plumo cherche une faute à la loupe : rien. 🔍', 'Plumo note ça dans son carnet secret. 📒', 'Plumo fait un petit salto de joie. 🤸', 'Plumo hulule de fierté. 🦉', 'Plumo range son stylo rouge, vexé. 🖍️', 'Plumo te tire son chapeau. 🎩', 'Plumo danse sur sa branche. 💃', 'Plumo voulait te piéger : raté pour lui ! 🪤', 'Plumo ébouriffe ses plumes de surprise. 🪶', 'Plumo lève le pouce… enfin, l’aile. 👍', 'Plumo prépare déjà une question plus dure. 😈', 'Plumo lance des confettis. 🎉', 'Plumo dit que ton cerveau chauffe bien. 🔥', 'Plumo fait semblant de ne pas être impressionné. 🙄', 'Plumo cligne des yeux, épaté. 👀', 'Plumo t’accorde une médaille en carton. 🥇', 'Plumo a perdu son pari contre toi. 💸', 'Plumo range sa blague dans le tiroir. 🗄️', 'Plumo appelle sa grand-mère pour raconter. 📞', 'Plumo tourne la tête à 270° de surprise. 🌀', 'Plumo fait une révérence. 🙇', 'Plumo hoche la tête comme un prof content. 🎓', 'Plumo écrit « respect » dans le ciel. ✍️', 'Plumo te passe le micro. 🎤', 'Plumo dit : « je le savais… enfin, presque ». 🤭', 'Plumo sort sa trompette. 🎺', 'Plumo ajoute une étoile à ta constellation. ⭐', 'Plumo ne trouve rien à redire, et ça l’agace. 😤'],
    en:['Plumo puts his joke away… for now. 😏', 'Plumo claps both wings. 👏', 'Plumo checks with a magnifying glass: nothing to fix. 🔍', 'Plumo writes it in his secret notebook. 📒', 'Plumo does a little happy flip. 🤸', 'Plumo hoots with pride. 🦉', 'Plumo puts his red pen away, sulking. 🖍️', 'Plumo takes his hat off to you. 🎩', 'Plumo dances on his branch. 💃', 'Plumo tried to trap you and failed! 🪤', 'Plumo ruffles his feathers in surprise. 🪶', 'Plumo gives you a thumbs up… well, a wing up. 👍', 'Plumo is already preparing a harder one. 😈', 'Plumo throws confetti. 🎉', 'Plumo says your brain is warming up nicely. 🔥', 'Plumo pretends not to be impressed. 🙄', 'Plumo blinks, amazed. 👀', 'Plumo awards you a cardboard medal. 🥇', 'Plumo lost his bet against you. 💸', 'Plumo files his joke in the drawer. 🗄️', 'Plumo phones his granny to tell her. 📞', 'Plumo turns his head 270 degrees in surprise. 🌀', 'Plumo takes a bow. 🙇', 'Plumo nods like a happy teacher. 🎓', 'Plumo writes “respect” in the sky. ✍️', 'Plumo hands you the mic. 🎤', 'Plumo says: “I knew it… well, almost.” 🤭', 'Plumo gets out his trumpet. 🎺', 'Plumo adds a star to your constellation. ⭐', 'Plumo cannot find a single thing to fix, and it annoys him. 😤'],
    es:['Plumo guarda su broma… por ahora. 😏', 'Plumo aplaude con las dos alas. 👏', 'Plumo busca un fallo con la lupa: nada. 🔍', 'Plumo lo apunta en su cuaderno secreto. 📒', 'Plumo da una voltereta de alegría. 🤸', 'Plumo ulula de orgullo. 🦉', 'Plumo guarda su boli rojo, molesto. 🖍️', 'Plumo se quita el sombrero ante ti. 🎩', 'Plumo baila en su rama. 💃', 'Plumo quería pillarte: ¡le salió mal! 🪤', 'Plumo eriza las plumas de sorpresa. 🪶', 'Plumo levanta el pulgar… bueno, el ala. 👍', 'Plumo ya prepara una pregunta más difícil. 😈', 'Plumo lanza confeti. 🎉', 'Plumo dice que tu cerebro está a tope. 🔥', 'Plumo finge que no está impresionado. 🙄', 'Plumo parpadea, asombrado. 👀', 'Plumo te da una medalla de cartón. 🥇', 'Plumo ha perdido su apuesta contigo. 💸', 'Plumo guarda su chiste en el cajón. 🗄️', 'Plumo llama a su abuela para contárselo. 📞', 'Plumo gira la cabeza 270 grados de sorpresa. 🌀', 'Plumo hace una reverencia. 🙇', 'Plumo asiente como un profe contento. 🎓', 'Plumo escribe «respeto» en el cielo. ✍️', 'Plumo te pasa el micro. 🎤', 'Plumo dice: «lo sabía… bueno, casi». 🤭', 'Plumo saca su trompeta. 🎺', 'Plumo añade una estrella a tu constelación. ⭐', 'Plumo no encuentra nada que corregir, y eso le fastidia. 😤'],
    de:['Plumo steckt seinen Witz weg… vorerst. 😏', 'Plumo klatscht mit beiden Flügeln. 👏', 'Plumo sucht mit der Lupe einen Fehler: nichts. 🔍', 'Plumo schreibt es in sein geheimes Notizbuch. 📒', 'Plumo macht vor Freude einen Salto. 🤸', 'Plumo schuhut vor Stolz. 🦉', 'Plumo legt beleidigt seinen Rotstift weg. 🖍️', 'Plumo zieht den Hut vor dir. 🎩', 'Plumo tanzt auf seinem Ast. 💃', 'Plumo wollte dich reinlegen: Pech gehabt! 🪤', 'Plumo plustert vor Staunen die Federn auf. 🪶', 'Plumo zeigt dir den Daumen… na ja, den Flügel. 👍', 'Plumo bereitet schon eine schwerere Frage vor. 😈', 'Plumo wirft Konfetti. 🎉', 'Plumo sagt, dein Gehirn läuft warm. 🔥', 'Plumo tut so, als wäre er nicht beeindruckt. 🙄', 'Plumo blinzelt, verblüfft. 👀', 'Plumo verleiht dir eine Medaille aus Pappe. 🥇', 'Plumo hat seine Wette gegen dich verloren. 💸', 'Plumo legt seinen Witz in die Schublade. 🗄️', 'Plumo ruft seine Oma an, um es zu erzählen. 📞', 'Plumo dreht vor Staunen den Kopf um 270 Grad. 🌀', 'Plumo verbeugt sich. 🙇', 'Plumo nickt wie ein zufriedener Lehrer. 🎓', 'Plumo schreibt „Respekt“ in den Himmel. ✍️', 'Plumo reicht dir das Mikro. 🎤', 'Plumo sagt: „Wusste ich doch… fast.“ 🤭', 'Plumo holt seine Trompete heraus. 🎺', 'Plumo setzt einen Stern in dein Sternbild. ⭐', 'Plumo findet nichts zu meckern, und das ärgert ihn. 😤'],
    it:['Plumo mette via la sua battuta… per ora. 😏', 'Plumo applaude con tutte e due le ali. 👏', 'Plumo cerca un errore con la lente: niente. 🔍', 'Plumo lo annota nel suo quaderno segreto. 📒', 'Plumo fa una capriola di gioia. 🤸', 'Plumo bubola di orgoglio. 🦉', 'Plumo mette via la penna rossa, offeso. 🖍️', 'Plumo si toglie il cappello. 🎩', 'Plumo balla sul suo ramo. 💃', 'Plumo voleva fregarti: gli è andata male! 🪤', 'Plumo arruffa le piume per la sorpresa. 🪶', 'Plumo alza il pollice… cioè, l’ala. 👍', 'Plumo prepara già una domanda più difficile. 😈', 'Plumo lancia coriandoli. 🎉', 'Plumo dice che il tuo cervello gira a mille. 🔥', 'Plumo finge di non essere colpito. 🙄', 'Plumo sbatte le palpebre, stupito. 👀', 'Plumo ti dà una medaglia di cartone. 🥇', 'Plumo ha perso la scommessa contro di te. 💸', 'Plumo mette la sua battuta nel cassetto. 🗄️', 'Plumo chiama la nonna per raccontarglielo. 📞', 'Plumo gira la testa di 270 gradi per la sorpresa. 🌀', 'Plumo fa un inchino. 🙇', 'Plumo annuisce come un prof contento. 🎓', 'Plumo scrive «rispetto» nel cielo. ✍️', 'Plumo ti passa il microfono. 🎤', 'Plumo dice: «lo sapevo… quasi». 🤭', 'Plumo tira fuori la tromba. 🎺', 'Plumo aggiunge una stella alla tua costellazione. ⭐', 'Plumo non trova niente da ridire, e la cosa lo irrita. 😤'],
    pt:['O Plumo guarda a piada… por agora. 😏', 'O Plumo aplaude com as duas asas. 👏', 'O Plumo procura um erro com a lupa: nada. 🔍', 'O Plumo aponta isto no caderno secreto. 📒', 'O Plumo dá uma cambalhota de alegria. 🤸', 'O Plumo pia de orgulho. 🦉', 'O Plumo guarda a caneta vermelha, amuado. 🖍️', 'O Plumo tira-te o chapéu. 🎩', 'O Plumo dança no seu ramo. 💃', 'O Plumo queria apanhar-te: correu-lhe mal! 🪤', 'O Plumo eriça as penas de surpresa. 🪶', 'O Plumo levanta o polegar… bem, a asa. 👍', 'O Plumo já prepara uma pergunta mais difícil. 😈', 'O Plumo atira confetes. 🎉', 'O Plumo diz que o teu cérebro está a todo o gás. 🔥', 'O Plumo finge que não ficou impressionado. 🙄', 'O Plumo pestaneja, espantado. 👀', 'O Plumo dá-te uma medalha de cartão. 🥇', 'O Plumo perdeu a aposta contra ti. 💸', 'O Plumo guarda a piada na gaveta. 🗄️', 'O Plumo liga à avó para contar. 📞', 'O Plumo roda a cabeça 270 graus de surpresa. 🌀', 'O Plumo faz uma vénia. 🙇', 'O Plumo acena como um professor contente. 🎓', 'O Plumo escreve «respeito» no céu. ✍️', 'O Plumo passa-te o microfone. 🎤', 'O Plumo diz: «eu sabia… quase». 🤭', 'O Plumo tira o trompete. 🎺', 'O Plumo junta uma estrela à tua constelação. ⭐', 'O Plumo não encontra nada a corrigir, e isso irrita-o. 😤']
  };
  const cache = {};
  function bravos(lang){ const l = OUV[lang] ? lang : 'fr'; if(cache[l]) return cache[l];
    const out = []; for(const a of ACT[l]) for(const o of OUV[l]) out.push(o + ' ' + a); return (cache[l] = out); }
  window.PLUMO_VARIETE = { OUV, ACT, bravos };

  // ── Animations ──
  const IDLE = ['regarde', 'penche', 'sautille', 'dandine', 'gonfle', 'hoche', 'tourne'];
  const calme = () => { try{ return (window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches) || document.documentElement.hasAttribute('data-facile'); }catch(e){ return false; } };
  const prochain = new WeakMap();
  function tic(){
    if(calme() || typeof document === 'undefined') return;
    const now = Date.now();
    document.querySelectorAll('.ami-3d-corps').forEach(el => {
      if(!prochain.has(el)){ prochain.set(el, now + 1500 + Math.random() * 3500); return; }
      if(now < prochain.get(el) || el.dataset.vit) return;
      const a = IDLE[Math.floor(Math.random() * IDLE.length)];
      el.dataset.vit = a; el.classList.add('ami-vit-' + a);
      setTimeout(() => { el.classList.remove('ami-vit-' + a); delete el.dataset.vit; prochain.set(el, Date.now() + 2500 + Math.random() * 4500); }, 1600);
    });
  }
  // Les yeux suivent le pointeur : le hibou se tourne légèrement vers lui.
  let dernier = 0;
  function suivre(ev){
    if(calme()) return; const t = Date.now(); if(t - dernier < 60) return; dernier = t;
    document.querySelectorAll('.ami-3d').forEach(img => { const r = img.getBoundingClientRect(); if(!r.width) return;
      const dx = Math.max(-1, Math.min(1, (ev.clientX - (r.left + r.width / 2)) / 400)), dy = Math.max(-1, Math.min(1, (ev.clientY - (r.top + r.height / 2)) / 400));
      img.style.transform = 'rotateY(' + (dx * 14).toFixed(1) + 'deg) rotateX(' + (-dy * 6).toFixed(1) + 'deg) rotateZ(' + (dx * 3).toFixed(1) + 'deg)'; });
  }
  // Toucher Plumo le fait réagir.
  function toucher(ev){
    const el = ev.target && ev.target.closest && ev.target.closest('.ami-3d-corps'); if(!el || calme()) return;
    el.classList.remove('ami-vit-chatouille'); void el.offsetWidth; el.classList.add('ami-vit-chatouille');
    setTimeout(() => el.classList.remove('ami-vit-chatouille'), 900);
  }
  if(typeof document !== 'undefined' && typeof setInterval === 'function'){
    setInterval(tic, 700);
    document.addEventListener('pointermove', suivre, { passive:true });
    document.addEventListener('pointerdown', toucher, { passive:true });
  }
  window.PLUMO_VIVANT = { IDLE, tic, calme };
})();
