// =====================================================================
//  AMI DES MOTS — le jeu (v2)
//  ---------------------------------------------------------------------
//  Produit SÉPARÉ de reparole.fr : même hibou, mêmes images, mêmes mots,
//  mais un jeu grand public, pas un outil de soin.
//   · aucune promesse de santé, aucun compte, aucune publicité ;
//   · rien n'est envoyé : la progression reste dans le navigateur ;
//   · voix : les enregistrements de ReParole (même texte → même fichier),
//     sinon la voix du téléphone, sinon rien (jamais une voix étrangère).
//  v2 : plusieurs joueurs sur un appareil (la famille), révision espacée
//  (les mots manqués reviennent), défi du jour, carnet de mots, trophées,
//  « Vrai ou faux ? », bruitages.
// =====================================================================
(function(){
  'use strict';

  // ── Réglages du produit ───────────────────────────────────────────
  const CONFIG = window.CONFIG_JEU = Object.assign({
    // Où trouver les voix enregistrées (dossier audio/ de ReParole).
    AUDIO_BASE:'https://reparole.fr/audio/',
    // ── Gratuit / Ami des mots Plus (abonnement mensuel) ──
    // Gratuit : 3 thèmes, 10 jeux sur 50, 1 joueur ; le défi du jour, la
    // révision, le carnet, les trophées et le vestiaire restent gratuits (sur
    // les mots gratuits). Plus : tous les thèmes, les 50 jeux, 6 joueurs.
    // MODE_PAYANT:false ouvre tout (aucun paiement).
    MODE_PAYANT:true,
    THEMES_GRATUITS:['animaux', 'manger', 'maison'],
    // Sortes de jeux gratuites, à tous leurs niveaux : 1 + 3 + 3 + 3 = 10 jeux sur 50.
    JEUX_GRATUITS:['decouvrir', 'ecoute', 'quel_mot', 'traduction'],
    JOUEURS_GRATUITS:1,
    PRIX:'5,99 €',
    // Lien de paiement Stripe (abonnement mensuel). Vide : « Bientôt disponible ».
    LIEN_PAIEMENT:'',
    // Portail client Stripe (gérer / résilier l'abonnement).
    LIEN_GESTION:'',
    // Fonction serveur qui dit si un code d'abonnement est actif
    // (serveur/functions/ami-abonnement). Vide : rien n'est vérifié.
    API_ABONNEMENT:'',
    // On ne demande jamais un mot jamais vu : il est d'abord présenté
    // (« Nouveau mot ! » : image, mot, traduction, voix).
    PRESENTER_NOUVEAUX:true,
    // Clé PUBLIQUE (JWK, ECDSA P-256) qui vérifie les certificats signés par
    // le serveur : node outils/generer-cles.js. Sans elle, Plus ne s'ouvre pas.
    CLE_PUBLIQUE:null
  }, window.CONFIG_JEU || {});

  const UI = Object.keys(window.TEXTES);
  // Langues visibles pendant la phase de lancement des voix dédiées.
  // Les autres langues et leurs contenus restent intégralement dans donnees.js.
  const APPRENDRE = ['fr', 'en'];
  const DEFI = 8, MAX_JOUEURS = 6;
  const ACCESSOIRES = [['echarpe', 15], ['lunettes', 40], ['noeud', 80], ['chapeau', 140], ['couronne', 250]];
  const COULEURS = [['#B7845A', '#DBAA78', '#8C5E37'], ['#6E8FB8', '#A6C1E0', '#4A6A93'], ['#C9787A', '#EBB0B1', '#9E5153'], ['#7FA36B', '#B5D3A2', '#587C46'], ['#A08AC0', '#CDBDE3', '#76619A'], ['#7D7D7D', '#B9B9B9', '#555555']];
  // Révision espacée (boîtes de Leitner) : jours avant de revoir un mot.
  const INTERVALLES = [0, 1, 3, 7, 16];
  const BIEN_CONNU = 3;
  const TROPHEES = ['premiere', 'serie3', 'serie7', 'mots25', 'mots100', 'theme', 'defi5'];
  const LOCALES = { fr:'fr-FR', en:'en-GB', es:'es-ES', it:'it-IT', pt:'pt-PT', de:'de-DE', ar:'ar-SA', tr:'tr-TR', pl:'pl-PL', ja:'ja-JP', uk:'uk-UA', ko:'ko-KR' };
  const SANS_LETTRES = ['ja', 'ko'];
  const RTL = ['ar', 'dz', 'ma', 'tn'];

  // ── Stockage : plusieurs joueurs, un seul enregistrement ──────────
  const CLE = 'amidesmots:v2', ANCIENNE = 'amidesmots:v1';
  const nouveauJoueur = (nom, couleur) => ({ nom:nom || '', couleur:couleur || 0, plumes:0, etoiles:{}, jours:[], porte:[], mots:{}, trophees:[], defis:[] });
  const base = lire();
  function lire(){
    let d = null;
    try{ d = JSON.parse(localStorage.getItem(CLE)); }catch(e){}
    if(d && Array.isArray(d.joueurs) && d.joueurs.length) return d;
    // Reprise de la v1 : sa progression devient le premier joueur.
    let v1 = null;
    try{ v1 = JSON.parse(localStorage.getItem(ANCIENNE)); }catch(e){}
    const j = Object.assign(nouveauJoueur(''), v1 ? { plumes:v1.plumes || 0, etoiles:v1.etoiles || {}, jours:v1.jours || [], porte:v1.porte || [] } : {});
    return { ui:v1 && v1.ui, cible:v1 && v1.cible, son:true, joueurs:[j], actif:0 };
  }
  function garder(){ try{ localStorage.setItem(CLE, JSON.stringify(base)); localStorage.removeItem(ANCIENNE); }catch(e){} }
  const J = () => base.joueurs[base.actif] || base.joueurs[0];
  if(!UI.includes(base.ui)){
    const nav = (navigator.language || 'fr').slice(0, 2).toLowerCase();
    base.ui = UI.includes(nav) ? nav : 'fr';
  }
  if(!APPRENDRE.includes(base.cible)){
    // Conserver le choix précédent pour une réactivation ultérieure,
    // sans l'afficher ni le supprimer des données de l'application.
    if(base.cible) base.cibleMasquee = base.cible;
    base.cible = base.ui === 'fr' ? 'en' : 'fr';
  }
  if(base.son === undefined) base.son = true;

  // ── Abonnement ────────────────────────────────────────────────────
  // Un code anonyme, tiré au hasard sur l'appareil : c'est lui qu'on donne
  // à Stripe (client_reference_id) et lui seul qu'on envoie pour vérifier.
  // Aucun nom, aucune adresse, aucun progrès ne quitte l'appareil.
  function nouveauCode(){
    const A = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789', b = new Uint8Array(12);
    (window.crypto || {}).getRandomValues ? crypto.getRandomValues(b) : b.forEach((x, i) => { b[i] = Math.random() * 256; });
    const c = Array.from(b, x => A[x % A.length]).join('');
    return 'AMI-' + c.slice(0, 4) + '-' + c.slice(4, 8) + '-' + c.slice(8);
  }
  // Sur l'appareil on ne garde que le code et le dernier CERTIFICAT signé par
  // le serveur ({code, fin} + signature ECDSA). Plus s'ouvre seulement si la
  // signature est vérifiée avec la clé publique du jeu : modifier le stockage
  // du navigateur ne débloque rien. (Les anciens champs actif/fin sont ignorés.)
  base.abo = { code:(base.abo && base.abo.code) || '', jeton:(base.abo && base.abo.jeton) || '', verifie:(base.abo && base.abo.verifie) || '' };
  if(!base.abo.code) base.abo.code = nouveauCode();
  const GRACE = 3 * 864e5;   // hors ligne : l'abonnement reste ouvert 3 jours après la date signée
  let droits = null;          // { fin } — en mémoire seulement, après vérification de la signature
  const plus = () => !CONFIG.MODE_PAYANT || !!(droits && Date.parse(droits.fin) + GRACE > Date.now());
  const b64u = x => Uint8Array.from(atob(x.replace(/-/g, '+').replace(/_/g, '/') + '==='.slice((x.length + 3) % 4)), c => c.charCodeAt(0));
  async function verifierJeton(jeton, code){
    try{
      if(!jeton || !CONFIG.CLE_PUBLIQUE || !(window.crypto && crypto.subtle)) return null;
      const [charge, sig] = String(jeton).split('.');
      const cle = await crypto.subtle.importKey('jwk', CONFIG.CLE_PUBLIQUE, { name:'ECDSA', namedCurve:'P-256' }, false, ['verify']);
      if(!await crypto.subtle.verify({ name:'ECDSA', hash:'SHA-256' }, cle, b64u(sig), new TextEncoder().encode(charge))) return null;
      const d = JSON.parse(new TextDecoder().decode(b64u(charge)));
      return d.c === code && d.f ? { fin:d.f } : null;
    }catch(e){ return null; }
  }
  const formatCode = c => String(c || '').toUpperCase().replace(/[^A-Z0-9]/g, '').replace(/^AMI/, '').slice(0, 12).replace(/^(.{4})(.{4})(.{4})$/, 'AMI-$1-$2-$3');
  async function verifier(code){
    if(!CONFIG.API_ABONNEMENT) return null;
    try{
      const r = await fetch(CONFIG.API_ABONNEMENT + '?code=' + encodeURIComponent(code), { cache:'no-store' });
      if(!r.ok) return null;
      const d = await r.json();
      return { actif:!!d.actif, jeton:d.jeton || '' };
    }catch(e){ return null; }
  }
  async function rafraichir(force){
    if(!CONFIG.MODE_PAYANT || !CONFIG.API_ABONNEMENT) return;
    if(!force && base.abo.verifie === jour()) return;
    const r = await verifier(base.abo.code);
    if(!r) return;                                   // hors ligne : on garde ce qu'on sait
    const avant = plus();
    base.abo.jeton = r.actif ? r.jeton : ''; base.abo.verifie = jour(); garder();
    droits = await verifierJeton(base.abo.jeton, base.abo.code);
    if(plus() !== avant && !partie) accueil();
  }

  // ── Petits outils ─────────────────────────────────────────────────
  const $ = s => document.querySelector(s);
  const esc = s => String(s == null ? '' : s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  const t = (k, ...p) => { const v = TEXTES[base.ui][k]; return typeof v === 'function' ? v(...p) : v; };
  const melanger = a => { a = a.slice(); for(let i = a.length - 1; i > 0; i--){ const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
  const jour = (dec) => { const d = new Date(); d.setDate(d.getDate() + (dec || 0)); return d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0'); };
  const graphemes = s => (window.Intl && Intl.Segmenter) ? Array.from(new Intl.Segmenter(undefined, { granularity:'grapheme' }).segment(s), x => x.segment) : [...s];
  // Lecture facile (pensée pour les personnes dys) : réglage propre à chaque joueur.
  const facile = () => !!(base.joueurs[base.actif] || {}).facile;
  const sobre = () => { if(facile()) return true; try{ return matchMedia('(prefers-reduced-motion: reduce)').matches; }catch(e){ return false; } };

  function affiche(lang, mot){
    if(!mot || !/[A-ZÀ-ÞĀ-ſА-ЯІЇЄҐ]/.test(mot) || mot !== mot.toUpperCase()) return mot;
    const bas = mot.toLocaleLowerCase(lang === 'tr' ? 'tr' : lang === 'kab' ? 'fr' : lang);
    return lang === 'de' ? bas.charAt(0).toLocaleUpperCase('de') + bas.slice(1) : bas;
  }
  const ouvert = th => plus() || CONFIG.THEMES_GRATUITS.includes(th);
  const jeuOuvert = j => plus() || CONFIG.JEUX_GRATUITS.includes(String(j).split(':')[0]);
  // Nombre de mots réellement disponibles dans une langue (affiché dans le choix).
  const nbMots = lang => distincts(Object.keys(MOTS).filter(e => MOTS[e][lang]), lang).length;
  const motsDu = (theme, lang) => Object.keys(MOTS).filter(e => MOTS[e].theme === theme && MOTS[e][lang]);
  const motsOuverts = lang => Object.keys(MOTS).filter(e => MOTS[e][lang] && ouvert(MOTS[e].theme));
  function distincts(liste, lang){
    const vu = new Set();
    return liste.filter(e => { const m = affiche(lang, MOTS[e][lang]).toLowerCase(); if(vu.has(m)) return false; vu.add(m); return true; });
  }
  const image = (e, cls) => '<img class="' + (cls || 'pic') + '" src="img/pictos/' + MOTS[e].img + '.webp" alt="" draggable="false">';
  const dirCible = () => RTL.includes(base.cible) ? 'rtl' : 'ltr';
  const nomMot = e => affiche(base.cible, MOTS[e][base.cible]);

  // ── Révision espacée ──────────────────────────────────────────────
  const cleMot = e => base.cible + ':' + e;
  const fiche = e => J().mots[cleMot(e)];
  function noter(e, juste){
    const k = cleMot(e), f = J().mots[k] || { b:0, d:jour() };
    f.b = juste ? Math.min(4, f.b + 1) : 0;
    f.d = jour(INTERVALLES[f.b]);
    J().mots[k] = f;
  }
  const aRevoir = () => motsOuverts(base.cible).filter(e => { const f = fiche(e); return f && f.d <= jour(); })
    .sort((a, b) => fiche(a).b - fiche(b).b || (fiche(a).d < fiche(b).d ? -1 : 1));
  const bienConnus = () => Object.keys(J().mots).filter(k => k.startsWith(base.cible + ':') && J().mots[k].b >= BIEN_CONNU).length;

  // ── La voix et les bruitages ──────────────────────────────────────
  function fnv1a(str){ let h = 0x811c9dc5; for(let i = 0; i < str.length; i++){ h ^= str.charCodeAt(i); h = Math.imul(h, 0x01000193); } return (h >>> 0).toString(36); }
  function kabSlug(w){
    return (w || '').toLowerCase().replace(/ɣ/g, 'gh').replace(/ḥ/g, 'h').replace(/ɛ/g, 'aa').replace(/ṛ/g, 'r').replace(/ṣ/g, 's')
      .replace(/ṭ/g, 't').replace(/ẓ/g, 'z').replace(/ḍ/g, 'd').replace(/ǧ/g, 'j').normalize('NFD').replace(/[̀-ͯ]/g, '')
      .replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
  }
  const urlVoix = (lang, texte) => CONFIG.AUDIO_BASE + (lang === 'kab' ? 'kab/' + kabSlug(texte) : lang + '/' + fnv1a(texte)) + '.mp3';
  let lecteur = null;
  function voixNavigateur(lang, texte){
    const loc = LOCALES[lang];
    if(!loc || !window.speechSynthesis) return false;
    const toutes = speechSynthesis.getVoices();
    const code = loc.slice(0, 2).toLowerCase();
    const voix = toutes.filter(v => v.lang && v.lang.replace('_', '-').toLowerCase().startsWith(code));
    const u = new SpeechSynthesisUtterance(texte);
    u.lang = loc; u.rate = .9;
    // Privilégier une voix de la bonne langue ; si Android n'a pas encore
    // chargé sa liste, garder la voix système plutôt que de ne rien dire.
    const v = voix.find(x => /natural|neural|premium|enhanced|google/i.test(x.name)) || voix[0] || toutes.find(x => x.default) || toutes[0];
    if(v) u.voice = v;
    let lance = false;
    const parler = () => {
      if(lance) return;
      lance = true;
      try{ speechSynthesis.cancel(); speechSynthesis.resume(); speechSynthesis.speak(u); }catch(e){}
    };
    // Sur certains téléphones, getVoices() est vide au tout premier appel.
    if(!toutes.length && speechSynthesis.addEventListener){
      const charge = () => { speechSynthesis.removeEventListener('voiceschanged', charge); parler(); };
      speechSynthesis.addEventListener('voiceschanged', charge, { once:true });
      setTimeout(parler, 700);
    }else{
      setTimeout(parler, 80);
    }
    return true;
  }
  // Les consignes (dans la langue du joueur) sont lues par la voix du téléphone.
  function lireConsigne(texte){ if(texte && !voixNavigateur(base.ui, texte)) silence(); }
  function silence(){ const n = $('#note-voix'); if(n){ n.textContent = '🔇 ' + t('sans_voix'); setTimeout(() => { if(n.isConnected) n.textContent = ''; }, 2500); } }
  window.speak = function(texte, langueForce){
    const lang = langueForce || base.cible;
    try{ if(lecteur){ lecteur.pause(); lecteur = null; } if(window.speechSynthesis) speechSynthesis.cancel(); }catch(e){}
    const a = new Audio(urlVoix(lang, texte));
    lecteur = a;
    let fini = false;
    const repli = () => {
      if(fini) return;
      fini = true; clearTimeout(garde);
      if(lecteur === a) lecteur = null;
      // Ne pas rester muet si le MP3 distant est absent, lent ou refusé.
      if(!voixNavigateur(lang, texte)) silence();
    };
    const garde = setTimeout(() => { if(a.readyState < 2){ try{ a.pause(); }catch(e){} repli(); } }, 2200);
    a.addEventListener('playing', () => { fini = true; clearTimeout(garde); }, { once:true });
    a.addEventListener('error', () => repli(), { once:true });
    const p = a.play();
    if(p && p.catch) p.catch(() => repli());
  };
  function precharger(emojis){
    if(navigator.connection && navigator.connection.saveData) return;
    emojis.forEach(e => { const m = aDire(e); if(m){ const a = new Audio(); a.preload = 'auto'; a.src = urlVoix(base.cible, m); } });
  }
  // Le texte exact que ReParole a enregistré (js/voix.js) : « poisson », pas « POISSON ».
  function aDire(e){ const v = window.VOIX && VOIX[base.cible]; return (v && v[e]) || MOTS[e][base.cible]; }
  const dire = e => window.speak(aDire(e));
  // Bruitages fabriqués sur place (aucun fichier) ; coupés dans les réglages.
  let ctx = null;
  function bruit(sorte){
    if(!base.son) return;
    try{
      const AC = window.AudioContext || window.webkitAudioContext; if(!AC) return;
      ctx = ctx || new AC();
      const notes = { juste:[[660, 0], [880, .09]], faux:[[220, 0]], fin:[[523, 0], [659, .12], [784, .24], [1047, .36]], tuile:[[500, 0]] }[sorte] || [];
      notes.forEach(([f, d]) => {
        const o = ctx.createOscillator(), g = ctx.createGain(), t0 = ctx.currentTime + d;
        o.type = sorte === 'faux' ? 'triangle' : 'sine'; o.frequency.value = f;
        g.gain.setValueAtTime(.0001, t0); g.gain.exponentialRampToValueAtTime(sorte === 'tuile' ? .05 : .12, t0 + .02); g.gain.exponentialRampToValueAtTime(.0001, t0 + (sorte === 'faux' ? .28 : .2));
        o.connect(g); g.connect(ctx.destination); o.start(t0); o.stop(t0 + .3);
      });
    }catch(e){}
  }

  // ── Ami ───────────────────────────────────────────────────────────
  function ami(humeur, opts){
    opts = opts || {};
    const [c1, c2, c3] = COULEURS[opts.couleur != null ? opts.couleur : (J().couleur || 0)] || COULEURS[0];
    const id = 'ami-c' + (opts.couleur != null ? opts.couleur : (J().couleur || 0));
    const yeux = humeur === 'surpris' ? 7.5 : 6.5;
    const ailes = humeur === 'fete'
      ? '<path fill="' + c3 + '" d="M33 50 C21 41 15 25 21 15 C28 26 34 40 37 52 Z"/><path fill="' + c3 + '" d="M67 50 C79 41 85 25 79 15 C72 26 66 40 63 52 Z"/>'
      : '<path fill="' + c3 + '" d="M31 50 C19 58 20 80 33 91 C30 74 31 60 35 52 Z"/><path fill="' + c3 + '" d="M69 50 C81 58 80 80 67 91 C70 74 69 60 65 52 Z"/>';
    const porte = opts.porte || J().porte;
    const acc = {
      echarpe:'<path d="M33 86 Q50 96 67 86 L67 92 Q50 102 33 92 Z" fill="#d9534f"/><path d="M58 92 L62 108 L55 108 L53 94 Z" fill="#c9443f"/>',
      lunettes:'<g fill="none" stroke="#1d2521" stroke-width="2.2"><circle cx="37" cy="44" r="12.5"/><circle cx="63" cy="44" r="12.5"/><path d="M49.5 43 Q50 40 50.5 43"/></g>',
      noeud:'<path d="M50 90 L40 84 L40 96 Z M50 90 L60 84 L60 96 Z" fill="#2a6fd6"/><circle cx="50" cy="90" r="2.6" fill="#1d4f9e"/>',
      chapeau:'<ellipse cx="50" cy="15" rx="22" ry="4.5" fill="#2b2b2b"/><path d="M36 15 L38 -3 L62 -3 L64 15 Z" fill="#2b2b2b"/><rect x="37.6" y="9" width="24.8" height="3.6" fill="#d9534f"/>',
      couronne:'<path d="M34 16 L36 0 L43 9 L50 -3 L57 9 L64 0 L66 16 Z" fill="#f2c230" stroke="#c99a12" stroke-width="1"/><circle cx="50" cy="8" r="2" fill="#d9534f"/>'
    };
    const dessus = porte.filter(k => acc[k] && k !== 'echarpe' && k !== 'noeud').map(k => acc[k]).join('');
    const cou = porte.filter(k => k === 'echarpe' || k === 'noeud').map(k => acc[k]).join('');
    const bouge = sobre() || opts.immobile ? '' : ' ami-bouge';
    return '<svg class="companion-svg ami' + bouge + (humeur === 'fete' ? ' ami-fete' : '') + '" viewBox="0 -6 100 126" aria-hidden="true" focusable="false">' +
      '<defs><radialGradient id="' + id + '" cx="40%" cy="30%" r="80%"><stop offset="0%" stop-color="' + c2 + '"/><stop offset="55%" stop-color="' + c1 + '"/><stop offset="100%" stop-color="' + c3 + '"/></radialGradient></defs>' +
      '<path d="M42 97 l-5 8 M42 97 l0 9 M42 97 l5 8 M58 97 l-5 8 M58 97 l0 9 M58 97 l5 8" fill="none" stroke="#E8973A" stroke-width="2.6" stroke-linecap="round"/>' +
      ailes +
      '<path fill="' + c3 + '" d="M 40 20 L 33 3 L 52 16 Z"/><path fill="' + c3 + '" d="M 60 20 L 67 3 L 48 16 Z"/>' +
      '<path fill="url(#' + id + ')" d="M50 14 C27 14 19 35 19 59 C19 85 34 101 50 101 C66 101 81 85 81 59 C81 35 73 14 50 14 Z"/>' +
      '<ellipse cx="50" cy="70" rx="19" ry="22" fill="#F6EAD2" opacity=".92"/>' +
      '<circle cx="37" cy="44" r="17" fill="#F6EAD2" stroke="#C9A878" stroke-width="1.2"/><circle cx="63" cy="44" r="17" fill="#F6EAD2" stroke="#C9A878" stroke-width="1.2"/>' +
      '<circle cx="37" cy="44" r="11.5" fill="#fff"/><circle cx="63" cy="44" r="11.5" fill="#fff"/>' +
      '<g class="pupilles"><ellipse cx="37" cy="45" rx="6.5" ry="' + yeux + '" fill="#1d2521"/><ellipse cx="63" cy="45" rx="6.5" ry="' + yeux + '" fill="#1d2521"/>' +
      '<circle cx="40" cy="41.5" r="2.6" fill="#fff"/><circle cx="66" cy="41.5" r="2.6" fill="#fff"/></g>' +
      (opts.immobile ? '' : '<g class="paupieres" fill="' + c1 + '"><ellipse cx="37" cy="44" rx="12" ry="12"/><ellipse cx="63" cy="44" rx="12" ry="12"/></g>') +
      cou +
      '<path class="companion-beak" fill="#E8973A" d="M 50 50 L 45 55 Q 50 63 55 55 Z"/>' +
      dessus +
      '</svg>';
  }

  // ── Écrans ────────────────────────────────────────────────────────
  // Couleur de chaque thème (cartes, barre de progression, accents).
  const COUL_THEME = { animaux:'#FF8A3D', manger:'#FF5D6C', maison:'#4D7CFE', habits:'#F06BB1', nature:'#25B26A', ville:'#7A5CFA', musique:'#B04CF0', atelier:'#0FAFBF' };
  const couleurDe = th => COUL_THEME[th] || '#7A5CFA';
  function poser(html, ecran){
    if(typeof fermerFenetre === 'function') fermerFenetre();
    const r = $('#app');
    r.innerHTML = html;
    r.dataset.ecran = ecran || '';
    r.classList.remove('entree'); if(!sobre()){ void r.offsetWidth; r.classList.add('entree'); }
    document.documentElement.lang = base.ui;
    document.documentElement.dir = RTL.includes(base.ui) ? 'rtl' : 'ltr';
    if(facile()) document.documentElement.dataset.facile = '1'; else delete document.documentElement.dataset.facile;
    window.scrollTo(0, 0);
    const f = r.querySelector('h1, h2'); if(f){ f.setAttribute('tabindex', '-1'); f.focus({ preventScroll:true }); }
  }
  const barre = (retour) => '<header class="barre">' +
    (retour ? '<button class="bouton-rond" data-a="' + retour + '" aria-label="' + esc(t('retour')) + '">' + (RTL.includes(base.ui) ? '→' : '←') + '</button>' : '<span></span>') +
    '<span class="compteur" aria-label="' + esc(J().plumes + ' ' + t('plumes')) + '">🪶 ' + J().plumes + '</span></header>';

  function serie(){
    const j = new Set(J().jours);
    let n = 0, dec = j.has(jour()) ? 0 : -1;
    while(j.has(jour(dec))){ n++; dec--; }
    return n;
  }
  // Toast : un trophée, un accessoire.
  function annonce(txt){
    const d = document.createElement('div'); d.className = 'toast'; d.setAttribute('role', 'status'); d.textContent = txt;
    document.body.appendChild(d); setTimeout(() => d.remove(), 3200);
  }

  function accueil(){
    if(base.joueurs.length > 1 && !accueil.choisi) return quiJoue();
    const fait = J().jours.includes(jour()), s = serie(), rev = aRevoir().length, defiFait = J().defis.includes(jour());
    const opts = (liste, choisi, compter) => liste.map(l => '<option value="' + l + '"' + (l === choisi ? ' selected' : '') + '>' + esc(LANGUES_APPRENDRE[l]) + (compter ? ' · ' + esc(t('nb_mots', nbMots(l))) : '') + '</option>').join('');
    poser('<section class="ciel">' + barre('') +
      paysage() +
      '<div class="ciel-in">' +
        '<div class="perchoir"><span class="lune" aria-hidden="true"></span><span class="branche" aria-hidden="true"></span>' +
        '<button class="ami-grand" data-a="vestiaire" aria-label="' + esc(t('vestiaire')) + '">' + ami('content') + '</button></div>' +
        '<h1>Ami des mots</h1>' +
        (J().nom ? '<p class="joueur">' + esc(t('bonjour', J().nom)) + (base.joueurs.length > 1 ? ' · <button class="lien" data-a="qui">' + esc(t('changer_joueur')) + '</button>' : '') + '</p>' : '<p class="accroche">' + esc(t('accroche')) + '</p>') +
        '<div class="choix-langues">' +
          '<label>' + esc(t('je_parle')) + '<select id="ui">' + opts(UI, base.ui) + '</select></label>' +
          '<label>' + esc(t('j_apprends')) + '<select id="cible">' + opts(APPRENDRE, base.cible) + '</select></label>' +
        '</div></div></section>' +
      '<main class="accueil">' +
        '<button class="gros defi' + (defiFait ? ' fait' : '') + '" data-a="defi">' + (defiFait ? '✓ ' : '⚡ ') + esc(t('defi')) + '</button>' +
        '<button class="gros apprendre" data-a="lecon">📚 ' + esc(t('apprendre')) + '</button>' +
        '<button class="gros phrases-accueil" data-a="phrases">💬 ' + (base.ui === 'en' ? 'Build your first sentences' : 'Atelier des phrases') + ' <span>✨</span></button>' +
        '<button class="gros village-accueil" data-a="village">🗺️ ' + {"fr": "Explorer le village", "en": "Explore the word village", "es": "Explorar el pueblo", "it": "Esplora il villaggio", "pt": "Explorar a aldeia", "de": "Das Wörterdorf erkunden", "ar": "استكشف قرية الكلمات", "tr": "Kelime köyünü keşfet", "pl": "Odkryj wioskę słów", "ja": "ことばの村を探検", "uk": "Дослідити селище слів", "ko": "단어 마을 탐험하기", "dz": "اكتشف قرية الكلمات", "ma": "اكتشف قرية الكلمات", "tn": "اكتشف قرية الكلمات", "kab": "Snirem tamdint n wawalen"}[base.ui] + '</button>' +
        '<div class="actions serrees">' +
          '<button class="moyen" data-a="themes">▶ ' + esc(t('jouer')) + '</button>' +
          '<button class="moyen" data-a="revoir">🔁 ' + esc(t('revoir')) + (rev ? ' <span class="pastille">' + rev + '</span>' : '') + '</button>' +
        '</div>' +
        '<p class="objectif"><span>' + esc(fait ? t('objectif_fait') : t('objectif')) + '</span>' + (s ? '<span class="serie">🔥 ' + esc(t('serie', s)) + '</span>' : '') + '</p>' +
        motDuJour() + astuceDuJour() +
        (CONFIG.MODE_PAYANT && !plus() ? '<button class="bandeau-plus" data-a="plus">✨ <strong>' + esc(t('plus')) + '</strong> · ' + esc(t('plus_court')) + '</button>' : '') +
        '<nav class="raccourcis">' +
          '<button data-a="carnet"><span aria-hidden="true">📒</span>' + esc(t('carnet')) + '</button>' +
          '<button data-a="trophees"><span aria-hidden="true">🏆</span>' + esc(t('trophees')) + '</button>' +
          '<button data-a="vestiaire"><span aria-hidden="true">👗</span>' + esc(t('vestiaire')) + '</button>' +
          '<button data-a="astuces"><span aria-hidden="true">💡</span>' + esc(t('astuces')) + '</button>' +
          '<button data-a="reglages"><span aria-hidden="true">⚙️</span>' + esc(t('reglages')) + '</button>' +
        '</nav>' +
      '</main>', 'accueil');
    $('#ui').addEventListener('change', ev => { base.ui = ev.target.value; garder(); accueil(); });
    $('#cible').addEventListener('change', ev => { base.cible = ev.target.value; garder(); prefs(); accueil(); });
  }
  // Le décor de l'accueil : aurore, collines, lucioles, une étoile filante.
  function paysage(){
    return '<div class="decor" aria-hidden="true">' +
      '<span class="aurore"></span><span class="filante"></span>' +
      Array.from({ length:7 }, (_, i) => '<span class="luciole" style="--x:' + [8, 22, 37, 63, 78, 90, 52][i] + '%;--y:' + [62, 78, 70, 74, 60, 80, 86][i] + '%;--d:' + (i * .9).toFixed(1) + 's"></span>').join('') +
      '<svg class="collines" viewBox="0 0 400 120" preserveAspectRatio="none">' +
        '<path d="M0 70 C60 40 110 62 170 48 C230 34 290 66 400 42 L400 120 L0 120Z" fill="#2B2178"/>' +
        '<path d="M0 88 C70 66 120 92 190 76 C260 60 320 90 400 70 L400 120 L0 120Z" fill="#1F175E"/>' +
        '<path d="M0 104 C80 92 150 110 230 98 C300 88 350 104 400 96 L400 120 L0 120Z" fill="#160F47"/>' +
        '<g fill="#160F47"><path d="M34 98 l9 -30 l9 30z"/><path d="M48 100 l7 -22 l7 22z"/><path d="M344 96 l10 -34 l10 34z"/><path d="M360 98 l7 -22 l7 22z"/></g>' +
      '</svg></div>';
  }
  // Le mot du jour : le même toute la journée, pris dans les mots ouverts.
  function motDuJour(){
    const l = distincts(motsOuverts(base.cible), base.cible).sort(); if(!l.length) return '';
    const n = [...(jour() + base.cible)].reduce((a, c) => (a * 31 + c.charCodeAt(0)) >>> 0, 3);
    const e = l[n % l.length], tr = traduction(e);
    return '<section class="carte-jour mot-jour"><h2>☀️ ' + esc(t('mot_du_jour')) + '</h2><div class="mot-jour-in">' + image(e, 'pic-jour') +
      '<div><p class="mot-jour-mot" dir="' + dirCible() + '">' + esc(nomMot(e)) + '</p>' + (tr ? '<p class="mot-jour-trad" dir="auto">= ' + esc(tr) + '</p>' : '') +
      '<div class="mot-jour-actions"><button class="moyen" data-a="ecouter" data-v="' + e + '">🔊</button><button class="moyen" data-a="lent" data-v="' + e + '" aria-label="' + esc(t('lentement')) + '">🐢</button>' +
      (window.Articulation ? '<button class="moyen" data-a="bouche" data-v="' + e + '" aria-label="' + esc(t('bouche')) + '">👄</button>' : '') +
      '<button class="moyen" data-a="a-toi" data-v="' + e + '" aria-label="' + esc(t('a_toi')) + '">🎤</button></div></div></div></section>';
  }
  function astuceDuJour(){
    const l = t('conseils'); if(!Array.isArray(l) || !l.length) return '';
    const [titre, texte] = l[Math.floor(Date.now() / 864e5) % l.length];
    return '<section class="carte-jour astuce-jour"><h2>💡 ' + esc(t('astuce_ami')) + '</h2><p><strong>' + esc(titre) + '</strong> ' + esc(texte) + '</p>' +
      '<button class="lien" data-a="astuces">' + esc(t('toutes_astuces')) + '</button></section>';
  }
  // Comment réussir à parler une autre langue : les conseils d'Ami.
  function astuces(){
    const l = t('conseils') || [];
    poser(barre('accueil') + '<main class="astuces"><div class="ami-moyen">' + ami('content') + '</div><h2>💡 ' + esc(t('astuces_titre')) + '</h2><p class="aide">' + esc(t('astuces_intro')) + '</p>' +
      '<ol class="liste-astuces">' + l.map(([titre, texte], k) => '<li><span class="num" aria-hidden="true">' + ['🗓️', '🗣️', '🔁', '🙌', '🏷️', '👨‍👩‍👧', '🎵', '🧠'][k % 8] + '</span><div><strong>' + esc(titre) + '</strong><p>' + esc(texte) + '</p></div></li>').join('') + '</ol>' +
      '<div class="actions"><button class="moyen plein" data-a="lecon">📚 ' + esc(t('apprendre')) + '</button></div></main>', 'astuces');
  }
  // « À toi ! » : on écoute Ami, on s'enregistre, on compare. Tout reste sur l'appareil.
  let micro = null;
  function fenetre(html){
    fermerFenetre();
    const f = document.createElement('div'); f.className = 'fenetre-fond'; f.id = 'fenetre';
    f.innerHTML = '<div class="fenetre" role="dialog" aria-modal="true">' + html + '<button class="fermer-fenetre" data-a="fermer-fenetre" aria-label="' + esc(t('retour')) + '">✕</button></div>';
    document.body.appendChild(f);
    const b = f.querySelector('button'); if(b) b.focus();
  }
  function fermerFenetre(){
    const f = $('#fenetre'); if(f) f.remove();
    if(micro){ try{ micro.rec && micro.rec.state === 'recording' && micro.rec.stop(); micro.flux && micro.flux.getTracks().forEach(p => p.stop()); if(micro.url) URL.revokeObjectURL(micro.url); }catch(e){} micro = null; }
  }
  function aToi(e){
    const tr = traduction(e);
    fenetre('<div class="a-toi">' + image(e, 'pic-moyenne') + '<p class="mot-source" dir="' + dirCible() + '">' + esc(nomMot(e)) + '</p>' + (tr ? '<p class="trad-nouveau" dir="auto">= ' + esc(tr) + '</p>' : '') +
      '<p class="aide" id="a-toi-etat">' + esc(t('a_toi_aide')) + '</p>' +
      '<div class="actions">' + ecouteBtn(e) + '<button class="gros micro" id="btn-micro" data-a="enregistrer" data-v="' + e + '">🎤 ' + esc(t('parler')) + '</button></div>' +
      '<div class="actions" id="a-toi-apres" hidden><button class="moyen" data-a="me-reecouter">👂 ' + esc(t('me_reecouter')) + '</button><button class="moyen" data-a="ecouter" data-v="' + e + '">🦉 ' + esc(t('ecouter_ami')) + '</button></div>' +
      '<p class="petit">🔒 ' + esc(t('a_toi_prive')) + '</p></div>');
    dire(e);
  }
  async function enregistrer(e){
    const etat = $('#a-toi-etat'), btn = $('#btn-micro');
    const bravo = () => {
      const k = cleMot(e), j = J(); j.parle = j.parle || [];
      if(!j.parle.includes(k)){ j.parle = j.parle.concat(k).slice(-2000); j.plumes += 1; garder(); }
      if(etat) etat.textContent = t('a_toi_bravo');
      eclat(btn); bruit('juste');
    };
    if(!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia || !window.MediaRecorder){
      if(etat) etat.textContent = t('sans_micro');
      if(btn){ btn.textContent = '✓ ' + t('je_l_ai_dit'); btn.dataset.a = 'je-l-ai-dit'; }
      return;
    }
    try{
      const flux = await navigator.mediaDevices.getUserMedia({ audio:true });
      const morceaux = [], rec = new MediaRecorder(flux);
      micro = { flux, rec };
      rec.ondataavailable = ev => { if(ev.data && ev.data.size) morceaux.push(ev.data); };
      rec.onstop = () => {
        flux.getTracks().forEach(p => p.stop());
        if(!micro) return;
        micro.url = URL.createObjectURL(new Blob(morceaux, { type:rec.mimeType || 'audio/webm' }));
        btn.classList.remove('enregistre'); btn.textContent = '🎤 ' + t('reessayer');
        const ap = $('#a-toi-apres'); if(ap) ap.hidden = false;
        // Ma voix, puis celle d'Ami, pour comparer.
        const a = new Audio(micro.url); a.onended = () => setTimeout(() => dire(e), 300); a.play().catch(() => {});
        bravo();
      };
      rec.start(); btn.classList.add('enregistre'); btn.textContent = '⏺ ' + t('j_ecoute');
      if(etat) etat.textContent = t('dis_le_mot');
      setTimeout(() => { if(rec.state === 'recording') rec.stop(); }, 3000);
    }catch(err){
      if(etat) etat.textContent = t('sans_micro');
      if(btn){ btn.textContent = '✓ ' + t('je_l_ai_dit'); btn.dataset.a = 'je-l-ai-dit'; }
    }
  }
  // Le module « bouche » de ReParole parle la langue du jeu.
  window.I18N = { t:k => t(k) };
  window.I18N_STRINGS = new Proxy({}, { get:() => TEXTES[base.ui] });
  window.Companion = { svg:() => ami('content', { immobile:true }) };
  function prefs(){ window.Prefs = { data:{ lang:base.cible } }; }

  // ── Joueurs ───────────────────────────────────────────────────────
  function quiJoue(){
    poser(barre('') + '<main class="centre"><h2>' + esc(t('qui_joue')) + '</h2><div class="grille joueurs">' +
      base.joueurs.map((j, i) => '<button class="joueur-carte" data-a="choisir-joueur" data-v="' + i + '"><div class="ami-mini">' + ami('content', { couleur:j.couleur, porte:j.porte, immobile:true }) + '</div><strong>' + esc(j.nom || '—') + '</strong><span>🪶 ' + j.plumes + '</span></button>').join('') +
      (base.joueurs.length < MAX_JOUEURS ? '<button class="joueur-carte ajout" data-a="nouveau-joueur">' + (plus() ? '' : '<span class="badge-plus">' + esc(t('plus_badge')) + '</span>') + '<span class="plus" aria-hidden="true">＋</span><strong>' + esc(t('ajouter_joueur')) + '</strong></button>' : '') +
      '</div></main>');
  }
  function formJoueur(i){
    const j = i != null ? base.joueurs[i] : null;
    const c = j ? j.couleur : base.joueurs.length % COULEURS.length;
    poser(barre(base.joueurs.length > 1 || j ? 'reglages' : 'accueil') + '<main class="centre"><div class="ami-moyen" id="apercu-ami">' + ami('content', { couleur:c, porte:j ? j.porte : [] }) + '</div>' +
      '<h2>' + esc(j ? t('modifier_joueur') : t('ajouter_joueur')) + '</h2>' +
      '<form id="form-joueur" class="form"><label>' + esc(t('prenom')) + '<input id="nom-joueur" maxlength="20" autocomplete="off" value="' + esc(j ? j.nom : '') + '"></label>' +
      '<fieldset><legend>' + esc(t('couleur')) + '</legend><div class="couleurs">' + COULEURS.map((k, n) => '<label class="pastille-couleur" style="--c:' + k[0] + '"><input type="radio" name="couleur" value="' + n + '"' + (n === c ? ' checked' : '') + '><span></span></label>').join('') + '</div></fieldset>' +
      '<button class="gros" type="submit">' + esc(t('valider')) + '</button></form>' +
      (j && base.joueurs.length > 1 ? '<p><button class="moyen" data-a="supprimer-joueur" data-v="' + i + '">' + esc(t('supprimer_joueur')) + '</button></p>' : '') + '</main>');
    const f = $('#form-joueur');
    f.addEventListener('change', () => { const n = Number(f.querySelector('input[name=couleur]:checked').value); $('#apercu-ami').innerHTML = ami('content', { couleur:n, porte:j ? j.porte : [] }); });
    f.addEventListener('submit', ev => {
      ev.preventDefault();
      const nom = $('#nom-joueur').value.trim().slice(0, 20), couleur = Number(f.querySelector('input[name=couleur]:checked').value) || 0;
      if(j){ j.nom = nom; j.couleur = couleur; }
      else if(!base.joueurs[0].nom && base.joueurs.length === 1 && !base.joueurs[0].plumes && !Object.keys(base.joueurs[0].mots).length){ Object.assign(base.joueurs[0], { nom, couleur }); base.actif = 0; }
      else { base.joueurs.push(nouveauJoueur(nom, couleur)); base.actif = base.joueurs.length - 1; }
      garder(); accueil.choisi = true; accueil();
    });
  }

  // ── Le catalogue : 19 sortes de jeux, déclinées en niveaux = 50 jeux ──
  // Tous puisent dans les mêmes mots et images (ceux de ReParole : la vie
  // de tous les jours). Facile : 3 choix · Normal : 4 · Expert : 6.
  const NIVEAUX = { f:{ choix:3, n:5, paires:4, relier:3, panier:6, lmin:3, lmax:4 }, n:{ choix:4, n:6, paires:6, relier:4, panier:10, lmin:4, lmax:6 }, e:{ choix:6, n:8, paires:8, relier:5, panier:14, lmin:6, lmax:12 } };
  const FNE = ['f', 'n', 'e'];
  const MECAS = [
    ['decouvrir', '📖', 'images', ['n']], ['quel_mot', '🖼️', 'images', FNE], ['vrai_faux', '✅', 'images', FNE],
    ['ombre', '🌑', 'images', FNE], ['devinette', '🌫️', 'images', FNE], ['intrus', '🧐', 'images', FNE], ['panier', '🧺', 'images', ['f', 'n']],
    ['ecoute', '👂', 'ecoute', FNE], ['ecoute_mot', '🎧', 'ecoute', FNE],
    ['traduction', '🌍', 'traduction', FNE], ['traduction_inverse', '🔁', 'traduction', FNE],
    ['premiere_lettre', '🅰️', 'lettres', FNE], ['lettre_manquante', '✏️', 'lettres', FNE], ['lettres', '🔤', 'lettres', FNE],
    ['memoire', '🧠', 'memoire', FNE], ['memoire_trad', '🃏', 'memoire', FNE], ['relier', '🔗', 'memoire', FNE],
    ['chrono', '⏱️', 'defis', ['n']], ['grand_quiz', '🏁', 'defis', ['n']]
  ];
  const FAMILLES = ['images', 'ecoute', 'traduction', 'lettres', 'memoire', 'defis'];
  const CATALOGUE = MECAS.flatMap(([m, ic, fam, nivs]) => nivs.map(n => ({ id:m + ':' + n, meca:m, niv:n, ic, fam, seul:nivs.length === 1 })));
  const mecaDe = id => String(id).split(':')[0];
  const normaliser = id => { if(String(id).includes(':')) return id; const m = MECAS.find(x => x[0] === id); return id + ':' + (m && !m[3].includes('n') ? m[3][0] : 'n'); };
  const nomJeu = id => { const [m, n] = id.split(':'), c = CATALOGUE.find(x => x.id === id); return t('j_' + m) + (c && !c.seul ? ' · ' + t('niv_' + n) : ''); };
  const DUREE_CHRONO = 60000;

  const avecTrad = liste => base.ui === base.cible ? [] : liste.filter(e => MOTS[e][base.ui]);
  const autresThemes = th => THEMES.filter(x => x !== th && ouvert(x) && distincts(motsDu(x, base.cible), base.cible).length >= 4);
  function disponible(meca, th){
    const mots = motsDu(th, base.cible);
    if(/^traduction|memoire_trad/.test(meca)) return distincts(avecTrad(mots), base.cible).length >= 4;
    if(meca === 'lettres' || meca === 'lettre_manquante') return lettresPossibles(mots).length >= 4;
    if(meca === 'intrus' || meca === 'panier') return autresThemes(th).length > 0;
    return true;
  }

  function themes(){
    const cartes = THEMES.map(th => {
      const liste = distincts(motsDu(th, base.cible), base.cible);
      if(liste.length < 4) return '';
      const libre = ouvert(th);
      const connus = liste.filter(e => { const f = fiche(e); return f && f.b >= BIEN_CONNU; }).length;
      const pc = Math.round(100 * connus / liste.length);
      return '<button class="theme' + (libre ? '' : ' verrou') + '" style="--th:' + couleurDe(th) + '" data-a="theme" data-v="' + th + '"><span class="disque">' + image(liste[0], 'pic-theme') + '</span>' +
        '<span class="nom">' + esc(t('th_' + th)) + '</span>' +
        (libre ? '<span class="jauge" role="img" aria-label="' + esc(t('connus', connus, liste.length)) + '"><span style="width:' + pc + '%"></span></span><span class="petit">' + connus + ' / ' + liste.length + '</span>'
               : '<span class="badge-plus">✨ ' + esc(t('plus_badge')) + '</span>') + '</button>';
    }).join('');
    poser(barre('accueil') + '<main><h2>' + esc(t('themes')) + ' · <span dir="auto">' + esc(LANGUES_APPRENDRE[base.cible]) + '</span></h2><div class="grille">' + cartes + '</div></main>');
  }

  let theme = null;
  const etoilesHTML = n => '<span class="etoiles" aria-label="' + n + '/3">' + '★'.repeat(n) + '<span class="vide">' + '★'.repeat(3 - n) + '</span></span>';
  function choisirJeu(th){
    theme = th;
    if(!ouvert(th)) return ecranPlus('themes');
    const dispo = MECAS.filter(([m]) => disponible(m, th));
    const nb = dispo.reduce((s, x) => s + x[3].length, 0);
    const corps = FAMILLES.map(f => {
      const l = dispo.filter(x => x[2] === f); if(!l.length) return '';
      return '<h3 class="famille">' + esc(t('fam_' + f)) + '</h3><div class="liste-jeux">' + l.map(([m, ic, , nivs]) =>
        '<div class="jeu-ligne"><span class="ic" aria-hidden="true">' + ic + '</span><div class="txt"><strong>' + esc(t('j_' + m)) + '</strong><span class="petit">' + esc(aideDe(m)) + '</span></div>' +
        '<div class="niveaux">' + nivs.map(n => {
          const id = m + ':' + n, et = J().etoiles[base.cible + ':' + th + ':' + id] || 0;
          const label = nivs.length === 1 ? t('jouer') : t('niv_' + n);
          return jeuOuvert(id)
            ? '<button class="niv" data-a="jeu" data-v="' + id + '" aria-label="' + esc(nomJeu(id)) + '"><span>' + esc(label) + '</span>' + etoilesHTML(et) + '</button>'
            : '<button class="niv verrou" data-a="plus" data-v="theme-retour" aria-label="' + esc(nomJeu(id)) + ' — ' + esc(t('plus_badge')) + '"><span>' + esc(label) + '</span><span class="badge-plus">✨ ' + esc(t('plus_badge')) + '</span></button>';
        }).join('') + '</div></div>').join('') + '</div>';
    }).join('');
    poser(barre('themes') + '<main class="jeux-theme" style="--th:' + couleurDe(th) + '"><div class="entete-theme">' + image(motsDu(th, base.cible)[0], 'pic-entete') + '<div><h2>' + esc(t('th_' + th)) + '</h2><p class="aide">' + esc(t('jeux_total', nb)) + '</p></div></div>' + corps + '</main>');
  }
  const aideDe = m => m === 'traduction' ? t('a_traduction', LANGUES_APPRENDRE[base.cible]) : m === 'decouvrir' ? t('a_decouvrir') : t('a_' + m);

  // ── Une partie ────────────────────────────────────────────────────
  let partie = null;
  const retourPartie = () => partie && partie.mode !== 'theme' ? 'accueil' : 'theme-retour';
  function cadre(titre, aide, corps){
    const chrono = partie.chronoFin ? '<p class="chrono" aria-live="off">⏱️ <span id="chrono">' + Math.max(0, Math.ceil((partie.chronoFin - Date.now()) / 1000)) + '</span> s · ✓ ' + partie.bonnes + '</p>' : '';
    const prog = partie.chronoFin ? '' : '<div class="progres" role="progressbar" aria-valuemin="0" aria-valuemax="' + partie.total + '" aria-valuenow="' + partie.i + '"><span style="width:' + Math.round(100 * partie.i / partie.total) + '%"></span></div>';
    const th = partie.mode === 'theme' ? theme : MOTS[motI()] && MOTS[motI()].theme;
    poser(barre(retourPartie()) + '<main class="partie" style="--th:' + couleurDe(th) + '">' +
      '<div class="tete"><div class="ami-petit" id="ami-partie">' + ami('content') + '</div><span class="combo' + ((partie.combo || 0) >= 2 ? ' vu' : '') + '" id="combo" aria-hidden="true">' + ((partie.combo || 0) >= 2 ? '🔥 ×' + partie.combo : '') + '</span><div><h2>' + esc(titre) + '</h2><p class="aide"><span id="consigne">' + esc(aide) + '</span> <button class="lire-consigne" data-a="consigne" aria-label="' + esc(t('lire_consigne')) + '">🔊</button></p></div></div>' +
      chrono + prog + '<div class="scene">' + corps + '</div>' + '<p class="bulle" id="bulle" role="status" aria-live="polite"></p><button class="moyen continuer-erreur" id="continuer-erreur" data-a="continuer-erreur" hidden>✓ ' + (base.ui === 'en' ? 'I understand — next' : 'J’ai compris — continuer') + '</button><p class="note" id="note-voix" aria-live="polite"></p></main>');
    if(facile() && partie.i === 0 && !partie.consigneLue){ partie.consigneLue = true; setTimeout(() => lireConsigne(aide), 250); }
  }
  // Humour réglable : les plaisanteries visent Ami, le mot ou la situation,
  // jamais le joueur. Le niveau est mémorisé par profil.
  let derniereBlague = -1;
  const BLAGUES_AMI = {
    fr:[
      {
        eclair:[
          "J’ai voulu aller plus vite que la lumière. Résultat : je suis arrivé avant la bonne réponse.",
          "Mon dictionnaire m’a dit de tourner la page. J’ai tourné l’écran… on n’avance pas.",
          "Je voulais faire mouche. J’ai surtout fait « bzz » à côté.",
          "J’ai le compas dans l’œil… mais il indique le mauvais nord."
        ],
        devinette:[
          "Pourquoi le livre de maths est-il toujours fatigué ? Parce qu’il a trop de problèmes !",
          "Quel est le comble pour un électricien ? De ne pas être au courant !",
          "Pourquoi les poissons détestent l’ordinateur ? À cause du net !",
          "Quel animal est toujours en retard ? Le morse… il prend son temps pour envoyer ses messages !"
        ],
        chute:[
          "Un dictionnaire entre dans un café. Le serveur demande : « Un mot, comme d’habitude ? » Le dictionnaire répond : « Non, aujourd’hui je prends une expression ! »",
          "Ami demande à son réveil : « Tu peux me donner l’heure ? » Le réveil répond : « Je peux, mais après tu vas encore me sonner les cloches ! »",
          "Un escargot entre dans une bibliothèque. La bibliothécaire demande : « Vous cherchez un livre rapide ? » Il répond : « Non, j’ai tout mon temps. »",
          "Ami ouvre son cahier de révision. Une page blanche lui dit : « Alors, on commence ? » Ami répond : « Tu m’as déjà tout appris ! »"
        ]
      },
      {
        eclair:[
          "J’ai cliqué avec assurance. C’est fou comme on peut se tromper avec élégance.",
          "Mon cerveau a pris une pause café. Visiblement, il n’a pas repris son service.",
          "Je pensais avoir un éclair de génie. C’était juste l’ampoule du couloir.",
          "J’ai suivi mon instinct. Il m’a conduit directement dans le décor."
        ],
        devinette:[
          "Pourquoi les livres ont-ils toujours froid ? Parce qu’ils ont une couverture !",
          "Qu’est-ce qui est jaune et qui attend ? Jonathan !",
          "Pourquoi les plongeurs plongent-ils toujours en arrière ? Parce que sinon ils tombent dans le bateau !",
          "Quel est le comble pour un jardinier ? Raconter des salades !"
        ],
        chute:[
          "Ami demande à son crayon : « Tu as une idée ? » Le crayon répond : « Oui, mais je n’arrive pas à la mettre au point. »",
          "Un ordinateur va chez le médecin. « Docteur, j’ai des fenêtres partout ! » Le médecin répond : « Vous avez essayé de fermer les yeux ? »",
          "Un zéro rencontre un huit. « Jolie ceinture ! » lui dit-il. Le huit répond : « Merci, je voulais être bien entouré. »",
          "Ami dit au dictionnaire : « Tu as réponse à tout ! » Le dictionnaire répond : « Oui, mais toi, tu ne poses jamais la bonne question. »"
        ]
      },
      {
        eclair:[
          "J’ai tellement réfléchi que la bonne réponse a eu le temps de prendre sa retraite.",
          "Mon cerveau a fait un sans-faute… dans la mauvaise direction.",
          "J’ai voulu jouer au génie. Pour l’instant, je joue surtout au « mais où est-ce que j’ai cliqué ? »",
          "Je viens de battre un record : choisir très vite une réponse très fausse."
        ],
        devinette:[
          "Pourquoi les fantômes sont-ils de mauvais menteurs ? Parce qu’on voit à travers eux !",
          "Qu’est-ce qu’un chat tombé dans un pot de peinture le jour de Noël ? Un chat peint de Noël !",
          "Quel est le comble pour un facteur ? Perdre la lettre !",
          "Pourquoi les livres de cuisine sont-ils si drôles ? Parce qu’ils racontent des histoires à tomber dans les pommes !"
        ],
        chute:[
          "Un prof demande à Ami : « Si tu as trois pommes et que je t’en prends deux, qu’est-ce qu’il te reste ? » Ami répond : « Une bonne raison de cacher mon goûter ! »",
          "Ami entre dans une boulangerie : « Vous avez du pain d’hier ? » Le boulanger répond oui. « Parfait, je repasse demain, il sera encore meilleur ! »",
          "Une ampoule dit à une autre : « Tu as l’air éteinte. » L’autre répond : « Normal, je traverse une période sombre. »",
          "Ami demande à la pendule : « Pourquoi tu tournes en rond ? » Elle répond : « Parce que j’ai toujours eu les aiguilles qui me démangent ! »"
        ]
      },
      {
        eclair:[
          "J’ai pris une décision tellement brillante que même la bonne réponse a préféré rester dans l’ombre.",
          "Mon cerveau vient de déposer un recours : il affirme qu’il n’était pas présent au moment du clic.",
          "J’ai confondu vitesse et précipitation. Le dictionnaire vient de me donner la définition.",
          "Je suis un hibou rare : je peux regarder une image et penser à tout sauf au bon mot."
        ],
        devinette:[
          "Quel est le comble pour un serrurier ? Se faire mettre à la porte !",
          "Pourquoi les plongeurs se laissent-ils tomber en arrière ? Parce que devant, il y a le bateau !",
          "Qu’est-ce qui court sans jamais bouger ? Un robinet… quand il fuit !",
          "Pourquoi les calendriers sont-ils populaires ? Parce qu’ils ont beaucoup de dates !"
        ],
        chute:[
          "Ami annonce : « J’ai enfin trouvé la méthode pour ne plus faire d’erreur ! » Le dictionnaire demande : « Laquelle ? » Ami répond : « Je laisse les autres répondre à ma place. »",
          "Un dictionnaire demande à un roman : « Alors, tu racontes quoi ? » Le roman répond : « Une longue histoire. » Le dictionnaire soupire : « Moi, je n’ai que des mots. »",
          "Ami demande à son miroir : « Qui est le plus malin du nid ? » Le miroir répond : « Je ne veux pas me mêler de vos histoires de famille. »",
          "Un escargot se fait arrêter pour excès de vitesse. Il proteste : « Mais je n’ai même pas dépassé ma coquille ! »"
        ]
      }
    ],
    en:[
      {
        eclair:[
          "I tried to beat the speed of light. I arrived before the right answer.",
          "My dictionary told me to turn the page. I turned the screen. Not much progress!",
          "I wanted to make a hit. All I made was a little buzz in the wrong place.",
          "I have a good eye… it just points north in the wrong direction."
        ],
        devinette:[
          "Why was the maths book so tired? It had too many problems!",
          "What is an electrician’s worst nightmare? Not being kept in the loop!",
          "Why do fish dislike the internet? Too many nets!",
          "Which animal sends the slowest messages? The snail. It takes its time!"
        ],
        chute:[
          "A dictionary walks into a café. The waiter asks, “The usual word?” The dictionary says, “Not today. I’ll have an expression!”",
          "Ami asks his alarm clock, “What time is it?” The clock says, “I’ll tell you, but please stop ringing my bells!”",
          "A snail enters a library. The librarian asks, “Looking for a quick read?” The snail says, “No rush. I’ve got all day.”",
          "Ami opens his revision notebook. A blank page asks, “Shall we start?” Ami says, “You’ve already taught me everything!”"
        ]
      },
      {
        eclair:[
          "I clicked with confidence. It's amazing how elegantly you can be wrong.",
          "My brain took a coffee break. Apparently, it forgot to come back.",
          "I thought I had a brilliant idea. It was just the hallway light.",
          "I followed my instincts. They led me straight into a wall."
        ],
        devinette:[
          "Why are books always cold? They have a cover!",
          "What is yellow and waiting? A banana at the bus stop!",
          "Why do divers fall backwards into the water? Because forwards, they’d fall into the boat!",
          "What is a gardener’s favourite kind of story? One with lots of plot twists!"
        ],
        chute:[
          "Ami asks his pencil, “Got any ideas?” The pencil says, “Yes, but I can’t quite make my point.”",
          "A computer visits the doctor. “Doctor, I have windows everywhere!” The doctor says, “Have you tried closing your eyes?”",
          "A zero meets an eight. “Nice belt!” says the zero. The eight replies, “Thanks, I like to keep things together.”",
          "Ami tells the dictionary, “You have an answer for everything!” The dictionary replies, “Yes, but you never ask the right question.”"
        ]
      },
      {
        eclair:[
          "I thought so hard the right answer had time to retire.",
          "My brain made a perfect move… in the wrong direction.",
          "I tried to be a genius. So far, I'm mostly wondering where I clicked.",
          "I just broke a record: choosing a very wrong answer very quickly."
        ],
        devinette:[
          "Why are ghosts terrible liars? You can see right through them!",
          "What do you call a cat covered in paint at Christmas? A merry-paint cat!",
          "What is a postman's worst fear? Losing the mail!",
          "Why are cookbooks so funny? Their stories are full of food for thought!"
        ],
        chute:[
          "A teacher asks Ami, “If you have three apples and I take two, what have you got left?” Ami says, “A very good reason to hide my snacks!”",
          "Ami visits a bakery. “Do you have yesterday’s bread?” “Yes,” says the baker. “Great! I’ll come back tomorrow. It’ll be even older!”",
          "One light bulb says to another, “You look switched off.” The other replies, “I'm just going through a dark phase.”",
          "Ami asks the clock, “Why do you go round in circles?” It replies, “Because I’ve always had hands that point!”"
        ]
      },
      {
        eclair:[
          "I made such a brilliant choice that even the right answer decided to stay in the shadows.",
          "My brain has filed an appeal. It claims it wasn't present when I clicked.",
          "I confused speed with rushing. The dictionary has just given me the definition.",
          "I'm a rare owl: I can look straight at a picture and think of every word except the right one."
        ],
        devinette:[
          "What is a locksmith’s worst nightmare? Being locked out!",
          "Why do divers fall backwards? Because the boat is in front of them!",
          "What runs but never moves? A leaking tap!",
          "Why are calendars so popular? They have so many dates!"
        ],
        chute:[
          "Ami announces, “I've found a way to never make mistakes again!” The dictionary asks, “How?” Ami replies, “I'll let someone else answer.”",
          "A dictionary asks a novel, “What are you about?” The novel says, “A long story.” The dictionary sighs, “I only have words.”",
          "Ami asks his mirror, “Who's the cleverest in the nest?” The mirror replies, “I don't want to get involved in family matters.”",
          "A snail gets stopped for speeding. “But I haven't even passed my shell!” it protests."
        ]
      }
    ]
  };
  function niveauHumour(){
    const n = Number(J().humour);
    return Number.isInteger(n) && n >= 0 && n <= 3 ? n : 0;
  }
  function langueBlagues(){
    const l = J().langueBlagues;
    return l === 'en' ? 'en' : l === 'fr' ? 'fr' : (base.ui === 'en' ? 'en' : 'fr');
  }
  function blague(){
    const niveau = niveauHumour();
    const langue = langueBlagues();
    const formats = BLAGUES_AMI[langue][niveau];
    if(!formats) return langue === 'en' ? 'Oops! My owl brain got its feathers in a twist!' : 'Oups ! Mon cerveau de hibou a emmêlé ses plumes !';
    const types = ['eclair','devinette','chute'];
    const type = types[Math.floor(Math.random() * types.length)];
    const liste = formats[type];
    if(!Array.isArray(liste) || !liste.length) return langue === 'en' ? 'Oops! Let’s try that again!' : 'Oups ! On réessaie ?';
    let k;
    do{ k = Math.floor(Math.random() * liste.length); }while(liste.length > 1 && k === derniereBlague);
    derniereBlague = k;
    const prefixe = langue === 'en'
      ? (type === 'devinette' ? 'Riddle time! ' : type === 'chute' ? 'A tiny story! ' : '')
      : (type === 'devinette' ? 'Petite devinette ! ' : type === 'chute' ? 'Une mini-histoire ! ' : '');
    return prefixe + liste[k];
  }
  function correctionDansLangue(mot){
    return langueBlagues() === 'en' ? 'The correct answer was: ' + mot : "C'était : " + mot;
  }
  function amiDit(txt, humeur){
    const b = $('#bulle'); if(b){ b.textContent = txt; b.className = 'bulle ' + (humeur === 'fete' ? 'ok' : humeur === 'surpris' ? 'ko' : ''); }
    const a = $('#ami-partie'); if(a) a.innerHTML = ami(humeur || 'content');
  }
  // mode : 'theme' (un thème, un jeu), 'defi' (8 mots de partout), 'revoir' (les mots dus).
  function commencer(id, mode, liste){
    mode = mode || 'theme';
    id = mode === 'theme' ? normaliser(id) : id;
    if(mode === 'theme' && (!jeuOuvert(id) || !ouvert(theme))) return ecranPlus('theme-retour');
    const meca = mecaDe(id), niv = (id.split(':')[1]) || 'n';
    let N = NIVEAUX[niv] || NIVEAUX.n;
    // Lecture facile : 3 choix au plus, moins de paires, jamais de temps limité.
    if(facile()) N = Object.assign({}, N, { choix:Math.min(N.choix, 3), paires:Math.min(N.paires, 4), relier:Math.min(N.relier, 3) });
    const pool = distincts(mode === 'theme' ? motsDu(theme, base.cible) : motsOuverts(base.cible), base.cible);
    let mots = liste || melanger(pool);
    if(/^traduction|memoire_trad/.test(meca)) mots = avecTrad(mots);
    if(meca === 'lettres'){ const p = lettresPossibles(mots), l = p.filter(e => { const n = graphemes(nomMot(e)).length; return n >= N.lmin && n <= N.lmax; }); mots = melanger(l.length >= 4 ? l : p); }
    if(meca === 'lettre_manquante') mots = melanger(lettresPossibles(mots));
    if(meca === 'panier'){
      const autre = melanger(autresThemes(theme))[0];
      const a = melanger(pool).slice(0, Math.ceil(N.panier / 2)), b = melanger(distincts(motsDu(autre, base.cible), base.cible)).slice(0, Math.floor(N.panier / 2));
      mots = melanger(a.concat(b));
      var paniers = melanger([theme, autre]);
    }
    partie = { jeu:id, meca, niv, N, mode, i:0, erreurs:0, bonnes:0, liste:mots, tous:pool, total:N.n, paniers };
    if(meca === 'decouvrir') partie.total = 8;
    if(/^memoire/.test(meca)) partie.total = 1;
    if(meca === 'relier') partie.total = 2;
    if(meca === 'panier') partie.total = mots.length;
    if(meca === 'grand_quiz') partie.total = 15;
    if(mode !== 'theme') partie.total = mots.length;
    if(mode === 'lecon') partie.total = mots.length;
    if(!/^(memoire|relier|grand_quiz|chrono)/.test(meca)) partie.total = Math.min(partie.total, mots.length);
    if(meca === 'chrono' && facile()) partie.total = 12;
    if(meca === 'chrono' && !facile()){
      partie.total = 999; partie.chronoFin = Date.now() + DUREE_CHRONO;
      const p = partie;
      p.tic = setInterval(() => {
        if(partie !== p || p.fini){ clearInterval(p.tic); return; }
        const r = Math.max(0, Math.ceil((p.chronoFin - Date.now()) / 1000)), c = $('#chrono'); if(c) c.textContent = r;
        if(r <= 0){ clearInterval(p.tic); if(!p.verrou) fin(); else p.finir = true; }
      }, 250);
    }
    question();
  }
  // Les jeux « mélangés » (défi, révision, contre la montre, grand quiz).
  function mixte(){
    const l = ['ecoute', 'quel_mot', 'vrai_faux', 'ombre', 'ecoute_mot'];
    const e = motI();
    if(base.ui !== base.cible && MOTS[e][base.ui]) l.push('traduction', 'traduction_inverse');
    if(!SANS_LETTRES.includes(base.cible) && lettresPossibles([e]).length) l.push('premiere_lettre');
    return partie.mode === 'theme' ? l : partie.mode === 'lecon' ? l.filter(x => x !== 'ombre') : l.slice(0, 3);
  }
  const motI = () => partie.liste[partie.i % partie.liste.length];
  const Q = {};
  function question(){
    if(partie.fini) return;
    if(partie.finir || (partie.chronoFin && Date.now() >= partie.chronoFin)) return fin();
    if(partie.i >= partie.total) return fin();
    partie.deja = false;
    // Un mot jamais vu est présenté avant d'être demandé.
    const QUESTION_MOT = ['ecoute', 'ecoute_mot', 'quel_mot', 'vrai_faux', 'ombre', 'devinette', 'traduction', 'traduction_inverse', 'premiere_lettre', 'lettre_manquante', 'lettres', 'chrono', 'grand_quiz'];
    const m0 = partie.liste[partie.i % partie.liste.length];
    if(CONFIG.PRESENTER_NOUVEAUX && m0 && !fiche(m0) && !(partie.presentes || (partie.presentes = new Set())).has(m0) && (partie.mode !== 'theme' || QUESTION_MOT.includes(partie.meca))) return presenter(m0);
    let j = partie.meca;
    if(partie.mode !== 'theme') { const l = mixte(); j = l[(partie.i + (partie.decal || (partie.decal = 1 + Math.floor(Math.random() * 3)))) % l.length]; }
    else if(j === 'chrono' || j === 'grand_quiz'){ const l = mixte(); j = l[Math.floor(Math.random() * l.length)]; }
    partie.courant = j;
    Q[j]();
  }
  const nbChoix = () => partie.mode === 'theme' && partie.meca !== 'chrono' && partie.meca !== 'grand_quiz' ? partie.N.choix : facile() ? 3 : 4;
  // En lecture facile, la consigne est lue d'abord : le mot attend qu'elle finisse.
  const delaiMot = () => facile() && partie.i === 0 ? 3200 : 300;
  function choixAvec(bonne, k, filtre){
    k = k || nbChoix(); filtre = filtre || (() => true);
    const vu = new Set([affiche(base.cible, MOTS[bonne][base.cible]).toLowerCase()]);
    const prendre = l => melanger(l).filter(e => { if(e === bonne || !filtre(e)) return false; const m = nomMot(e).toLowerCase(); if(vu.has(m)) return false; vu.add(m); return true; });
    let autres = prendre(partie.tous);
    // Mêmes thèmes d'abord : le choix est plus intéressant.
    autres.sort((a, b) => (MOTS[b].theme === MOTS[bonne].theme) - (MOTS[a].theme === MOTS[bonne].theme));
    if(autres.length < k - 1) autres = autres.concat(prendre(motsOuverts(base.cible)));
    return melanger([bonne].concat(autres.slice(0, k - 1)));
  }
  const traduction = e => (base.ui !== base.cible && MOTS[e][base.ui]) ? affiche(base.ui, MOTS[e][base.ui]) : '';
  const titreDe = j => partie.mode === 'defi' ? t('defi') : partie.mode === 'revoir' ? t('revoir') : partie.mode === 'lecon' ? t('apprendre') : partie.meca === 'chrono' || partie.meca === 'grand_quiz' ? t('j_' + partie.meca) : nomJeu(partie.jeu);
  const boutonsImages = ch => '<div class="choix-images' + (ch.length > 4 ? ' six' : '') + '">' + ch.map(x => '<button class="choix-img" data-a="repondre" data-v="' + x + '" aria-label="' + esc(nomMot(x)) + '">' + image(x) + '</button>').join('') + '</div>';
  const boutonsMots = (ch, aff, dir) => '<div class="choix-mots' + (ch.length > 4 ? ' six' : '') + '">' + ch.map(x => '<button class="choix-mot" data-a="repondre" data-v="' + x + '" dir="' + (dir || dirCible()) + '">' + esc(aff ? aff(x) : nomMot(x)) + '</button>').join('') + '</div>';
  const ecouteBtn = (e, gros) => '<span class="ecoutes"><button class="' + (gros ? 'gros' : 'moyen') + '" data-a="ecouter" data-v="' + e + '">🔊 ' + esc(t('ecouter')) + '</button>' +
    '<button class="lent" data-a="lent" data-v="' + e + '" aria-label="' + esc(t('lentement')) + '" title="' + esc(t('lentement')) + '">🐢</button></span>';
  // Écouter lentement : la voix enregistrée ralentie (sans changer la hauteur), ou la voix du téléphone au ralenti.
  function direLent(e){
    const et = window.Articulation && Articulation._etat;
    if(et){ et.lent = true; setTimeout(() => { et.lent = false; }, 4000); }
    dire(e);
  }

  // « Nouveau mot ! » : la carte de découverte, puis la question sur ce mot.
  function presenter(e){
    partie.presentes.add(e);
    const tr = traduction(e);
    cadre(t('nouveau_mot'), t('a_nouveau_mot'),
      '<div class="centre nouveau-mot">' + image(e, 'pic-grande') +
      '<p class="mot-source" dir="' + dirCible() + '">' + esc(nomMot(e)) + '</p>' + (tr ? '<p class="trad-nouveau" dir="auto">= ' + esc(tr) + '</p>' : '') +
      ecouteBtn(e) + '<div class="prononcer">' + (window.Articulation ? '<button class="moyen" data-a="bouche" data-v="' + e + '">👄 ' + esc(t('bouche')) + '</button>' : '') +
      '<button class="moyen" data-a="a-toi" data-v="' + e + '">🎤 ' + esc(t('a_toi')) + '</button></div></div>' +
      '<div class="actions"><button class="moyen plein" data-a="compris" data-v="' + e + '">' + esc(t('compris')) + ' ›</button>' +
      '<button class="moyen" data-a="deja-connu" data-v="' + e + '">' + esc(t('deja_connu')) + '</button></div>');
    precharger([e]); setTimeout(() => dire(e), delaiMot());
  }
  Q.decouvrir = function(){
    const e = partie.liste[partie.i], tr = traduction(e);
    cadre(t('j_decouvrir'), t('retourner'),
      '<button class="carte" id="carte" aria-label="' + esc(t('retourner')) + '"><span class="carte-in">' +
        '<span class="face recto">' + image(e, 'pic-carte') + '</span>' +
        '<span class="face verso"><span class="mot" dir="' + dirCible() + '">' + esc(nomMot(e)) + '</span>' + (tr ? '<span class="trad" dir="auto">' + esc(tr) + '</span>' : '') + '</span>' +
      '</span></button>' +
      '<div class="actions">' + ecouteBtn(e) + '<button class="moyen plein" data-a="suivant">' + esc(t('suivant')) + ' ›</button></div>');
    precharger([e]);
    // Découvrir un mot l'ajoute au carnet (à revoir demain).
    if(!fiche(e)){ J().mots[cleMot(e)] = { b:0, d:jour(1) }; garder(); }
    dire(e);
  };
  Q.ecoute = function(){
    const e = motI(), ch = choixAvec(e);
    partie.bonne = e;
    cadre(titreDe('ecoute'), t('a_ecoute'), '<div class="centre">' + ecouteBtn(e, true) + '</div>' + boutonsImages(ch));
    precharger(ch); setTimeout(() => dire(e), delaiMot());
  };
  Q.ecoute_mot = function(){
    const e = motI(), ch = choixAvec(e);
    partie.bonne = e;
    cadre(titreDe('ecoute_mot'), t('a_ecoute_mot'), '<div class="centre">' + ecouteBtn(e, true) + '</div>' + boutonsMots(ch));
    precharger([e]); setTimeout(() => dire(e), delaiMot());
  };
  Q.quel_mot = function(cls){
    const e = motI(), ch = choixAvec(e);
    partie.bonne = e;
    const m = typeof cls === 'string' ? cls : 'quel_mot';
    const duree = Math.round(({ f:8, n:11, e:15 }[partie.niv] || 11) * (facile() ? 1.8 : 1));
    cadre(titreDe(m), t('a_' + m), '<div class="centre"><span class="cadre-image">' + image(e, 'pic-grande' + (m === 'ombre' ? ' ombre' : m === 'devinette' ? ' flou' : '')).replace('<img ', '<img style="--duree:' + duree + 's" ') + '</span></div>' + boutonsMots(ch));
    precharger([e]);
    // L'instruction est lue dans la langue de l'interface, sans prononcer
    // le mot recherché : le joueur doit toujours le deviner.
    if(partie.i === 0) setTimeout(() => lireConsigne(t('a_' + m)), 220);
  };
  // Ombre : image détourée → silhouette pleine ; image sur fond blanc → filtre à seuil.
  Q.ombre = () => {
    Q.quel_mot('ombre');
    const img = document.querySelector('img.ombre');
    const tester = () => { try{
      const c = document.createElement('canvas'); c.width = c.height = 8;
      const x = c.getContext('2d'); x.drawImage(img, 0, 0, 8, 8);
      if(x.getImageData(0, 0, 1, 1).data[3] < 20 && x.getImageData(7, 7, 1, 1).data[3] < 20) img.classList.add('pleine');
    }catch(e){} };
    if(img){ if(img.complete) tester(); else img.addEventListener('load', tester, { once:true }); }
  };
  Q.devinette = () => Q.quel_mot('devinette');
  Q.traduction = function(){
    const e = motI(), ch = choixAvec(e, 0, x => !!MOTS[x][base.ui]);
    partie.bonne = e;
    cadre(titreDe('traduction'), t('a_traduction', LANGUES_APPRENDRE[base.cible]),
      '<div class="centre"><p class="mot-source" dir="auto">' + esc(traduction(e)) + '</p><p class="petit" dir="auto">' + esc(LANGUES_APPRENDRE[base.ui]) + ' → ' + esc(LANGUES_APPRENDRE[base.cible]) + '</p></div>' + boutonsMots(ch));
    precharger(ch);
  };
  Q.traduction_inverse = function(){
    const e = motI(), ch = choixAvec(e, 0, x => !!MOTS[x][base.ui]);
    partie.bonne = e;
    cadre(titreDe('traduction_inverse'), t('a_traduction_inverse'),
      '<div class="centre"><p class="mot-source" dir="' + dirCible() + '">' + esc(nomMot(e)) + '</p>' + ecouteBtn(e) + '</div>' + boutonsMots(ch, traduction, 'auto'));
    precharger([e]); setTimeout(() => dire(e), delaiMot());
  };
  // Vrai ou faux : une image, un nom — le bon une fois sur deux.
  Q.vrai_faux = function(){
    const e = motI();
    const autre = choixAvec(e, 2).find(x => x !== e);
    const vrai = !autre || Math.random() < .5;
    partie.bonne = e; partie.vf = vrai;
    cadre(titreDe('vrai_faux'), t('a_vrai_faux'),
      '<div class="centre">' + image(e, 'pic-grande') + '<p class="mot-vf" dir="' + dirCible() + '">' + esc(nomMot(vrai ? e : autre)) + '</p></div>' +
      '<div class="choix-vf"><button class="choix-mot vf-oui" data-a="vf" data-v="1">✓ ' + esc(t('vrai')) + '</button><button class="choix-mot vf-non" data-a="vf" data-v="0">✗ ' + esc(t('faux')) + '</button></div>');
    precharger([e]); setTimeout(() => dire(vrai ? e : autre), delaiMot());
  };
  // L'intrus : des images d'un thème, et une d'un autre.
  Q.intrus = function(){
    const k = nbChoix(), base0 = partie.liste[partie.i % partie.liste.length];
    const memes = [base0].concat(melanger(partie.tous.filter(x => x !== base0 && MOTS[x].theme === MOTS[base0].theme))).slice(0, k - 1);
    const autres = melanger(motsOuverts(base.cible).filter(x => MOTS[x].theme !== MOTS[base0].theme && ouvert(MOTS[x].theme)));
    const intrus = autres[0];
    partie.bonne = intrus;
    cadre(titreDe('intrus'), t('a_intrus'), boutonsImages(melanger(memes.concat(intrus))));
  };
  // Le bon panier : à quel thème appartient cette image ?
  Q.panier = function(){
    const e = partie.liste[partie.i];
    partie.bonne = e;
    cadre(titreDe('panier'), t('a_panier'), '<div class="centre">' + image(e, 'pic-grande') + '<p class="mot-vf" dir="' + dirCible() + '">' + esc(nomMot(e)) + '</p></div>' +
      '<div class="choix-vf">' + partie.paniers.map(th => '<button class="choix-mot panier" data-a="panier" data-v="' + th + '">🧺 ' + esc(t('th_' + th)) + '</button>').join('') + '</div>');
    precharger([e]); dire(e);
  };
  function panier(btn){
    if(partie.verrou) return;
    const juste = btn.dataset.v === MOTS[partie.bonne].theme;
    juger(btn, juste, false);
  }
  // Première lettre / lettre manquante : choisir une lettre.
  const premiere = e => graphemes(nomMot(e))[0];
  function lettresLeurres(bonne, k){
    const toutes = new Set();
    motsOuverts(base.cible).forEach(x => graphemes(nomMot(x)).forEach(g => { if(/\S/.test(g) && !/['’\-]/.test(g)) toutes.add(g); }));
    toutes.delete(bonne);
    return melanger([bonne].concat(melanger([...toutes]).slice(0, k - 1)));
  }
  Q.premiere_lettre = function(){
    const e = motI(), g = premiere(e);
    partie.bonne = e; partie.attendu = g;
    cadre(titreDe('premiere_lettre'), t('a_premiere_lettre'), '<div class="centre">' + image(e, 'pic-moyenne') + '<div>' + ecouteBtn(e) + '</div></div>' +
      '<div class="tuiles grandes" dir="' + dirCible() + '">' + lettresLeurres(g, nbChoix()).map(x => '<button class="tuile" data-a="lettre-choix" data-v="' + esc(x) + '">' + esc(x) + '</button>').join('') + '</div>');
    precharger([e]);
  };
  Q.lettre_manquante = function(){
    const e = motI(), g = graphemes(nomMot(e));
    const places = g.map((x, i) => i).filter(i => /\S/.test(g[i]) && (g.length < 4 || i > 0));
    const trou = places[Math.floor(Math.random() * places.length)];
    partie.bonne = e; partie.attendu = g[trou];
    cadre(titreDe('lettre_manquante'), t('a_lettre_manquante'), '<div class="centre">' + image(e, 'pic-moyenne') + '</div>' +
      '<div class="reponse" dir="' + dirCible() + '">' + g.map((x, i) => '<span class="case' + (i === trou ? ' trou' : ' pleine') + '">' + (i === trou ? '?' : esc(x)) + '</span>').join('') + '</div>' +
      '<div class="tuiles grandes" dir="' + dirCible() + '">' + lettresLeurres(g[trou], nbChoix()).map(x => '<button class="tuile" data-a="lettre-choix" data-v="' + esc(x) + '">' + esc(x) + '</button>').join('') + '</div>');
    precharger([e]);
  };
  function lettreChoix(btn){
    if(partie.verrou) return;
    const juste = btn.dataset.v === partie.attendu;
    if(juste){ const t0 = document.querySelector('.case.trou'); if(t0){ t0.textContent = partie.attendu; t0.classList.add('juste'); } }
    juger(btn, juste, true);
  }
  // Juste / faux, commun à tous les jeux à choix.
  function juger(btn, juste, reessai){
    if(!partie.deja){ noter(partie.bonne, juste); if(juste) partie.bonnes++; }
    if(juste && !partie.deja) serieUp(); else if(!juste) partie.combo = 0;
    vibrer(juste);
    if(juste) eclat(btn);
    partie.deja = true; garder();
    if(juste){
      partie.verrou = true;
      btn.classList.add('juste'); bruit('juste');
      document.querySelectorAll('.ombre, .flou').forEach(i => i.classList.add('revele'));
      const tr = /quel_mot|ombre|devinette|ecoute_mot|vrai_faux|ecoute|lettre/.test(partie.courant) ? traduction(partie.bonne) : '';
      amiDit(melanger(t('bravo'))[0] + (tr ? ' — ' + tr : ''), 'fete');
      dire(partie.bonne);
      setTimeout(() => { partie.verrou = false; partie.i++; question(); }, partie.chronoFin ? 900 : 1500);
    }else{
      partie.erreurs++; bruit('faux');
      partie.verrou = true;
      partie.attenteErreur = true;
      btn.classList.add('faux');
      btn.disabled = true;
      // Bloquer les autres choix jusqu'à ce que le joueur ait lu/écouté le retour.
      document.querySelectorAll('.scene button').forEach(x => { x.disabled = true; });
      const tr = traduction(partie.bonne);
      const bonneReponse = partie.courant === 'panier'
        ? t('th_' + MOTS[partie.bonne].theme)
        : nomMot(partie.bonne) + (tr ? ' (' + tr + ')' : '');
      const message = blague() + ' ' + correctionDansLangue(bonneReponse);
      amiDit(message, 'surpris');
      const suite = $('#continuer-erreur');
      if(suite){ suite.hidden = false; suite.focus({preventScroll:true}); }
      // Une seule lecture vocale : la blague ET la bonne réponse, dans cet ordre.
      if(window.speak) window.speak(message, langueBlagues());
    }
  }
  // Étincelles qui jaillissent d'une bonne réponse.
  function eclat(el){
    if(sobre() || !el || !el.getBoundingClientRect || !document.body.animate) return;
    const r = el.getBoundingClientRect(), cx = r.left + r.width / 2, cy = r.top + r.height / 2;
    for(let k = 0; k < 16; k++){
      const p = document.createElement('i'); p.className = 'etincelle'; p.textContent = k % 3 ? '✦' : '★';
      p.style.left = cx + 'px'; p.style.top = cy + 'px'; p.style.color = ['#FFC93C', '#2BE0B0', '#fff', '#FF7AD9', '#4FD8FF'][k % 5];
      document.body.appendChild(p);
      const a = (Math.PI * 2 * k) / 16 + Math.random() * .4, d = 60 + Math.random() * 70;
      p.animate([{ transform:'translate(-50%,-50%) scale(.4)', opacity:1 }, { transform:'translate(calc(-50% + ' + Math.cos(a) * d + 'px), calc(-50% + ' + Math.sin(a) * d + 'px)) scale(1.1) rotate(' + (Math.random() * 180) + 'deg)', opacity:0 }],
        { duration:650 + Math.random() * 300, easing:'cubic-bezier(.2,.8,.3,1)' }).onfinish = () => p.remove();
    }
  }
  function vibrer(juste){ try{ if(!facile() && navigator.vibrate) navigator.vibrate(juste ? 18 : [30, 50, 30]); }catch(e){} }
  // Série de bonnes réponses du premier coup : 🔥 ×3, ×4…
  function serieUp(){
    partie.combo = (partie.combo || 0) + 1;
    const c = $('#combo');
    if(c && partie.combo >= 2){ c.textContent = '🔥 ×' + partie.combo; c.classList.remove('pop'); void c.offsetWidth; c.classList.add('pop', 'vu'); }
  }
  function vf(btn){
    if(partie.verrou) return;
    juger(btn, (btn.dataset.v === '1') === partie.vf, false);
  }
  function repondre(btn){
    if(partie.verrou) return;
    juger(btn, btn.dataset.v === partie.bonne, true);
  }

  // Mémoire : image ↔ mot, ou mot ↔ traduction.
  Q.memoire = function(){
    const trad = partie.meca === 'memoire_trad';
    const paires = partie.liste.slice(0, partie.N.paires);
    const cartes = melanger(paires.flatMap(e => [{ e, k:trad ? 'trad' : 'img' }, { e, k:'mot' }]));
    partie.mem = { ouvertes:[], trouvees:0, n:paires.length };
    cadre(nomJeu(partie.jeu), t(trad ? 'a_memoire_trad' : 'a_memoire'), '<div class="memoire' + (paires.length > 6 ? ' huit' : paires.length < 5 ? ' quatre' : '') + '">' + cartes.map((c, i) =>
      '<button class="mcarte" data-a="mcarte" data-v="' + c.e + '" data-i="' + i + '" aria-label="?"><span class="carte-in"><span class="face recto">?</span><span class="face verso">' +
      (c.k === 'img' ? image(c.e, 'pic-m') : c.k === 'trad' ? '<span class="mot-m trad-m" dir="auto">' + esc(traduction(c.e)) + '</span>' : '<span class="mot-m" dir="' + dirCible() + '">' + esc(nomMot(c.e)) + '</span>') + '</span></span></button>').join('') + '</div>');
    precharger(paires);
  };
  Q.memoire_trad = Q.memoire;
  function mcarte(btn){
    const M = partie.mem;
    if(M.bloque || btn.classList.contains('ouverte')) return;
    btn.classList.add('ouverte'); btn.setAttribute('aria-label', btn.textContent); bruit('tuile');
    M.ouvertes.push(btn);
    if(M.ouvertes.length < 2) return;
    const [a, b] = M.ouvertes; M.ouvertes = [];
    if(a.dataset.v === b.dataset.v){
      a.classList.add('trouvee'); b.classList.add('trouvee'); M.trouvees++; eclat(b); vibrer(true);
      noter(a.dataset.v, true); garder();
      bruit('juste'); dire(a.dataset.v); amiDit(melanger(t('bravo'))[0], 'fete');
      if(M.trouvees === M.n){ partie.i = 1; setTimeout(fin, 1400); }
    }else{
      partie.erreurs++; M.bloque = true;
      setTimeout(() => { [a, b].forEach(x => { x.classList.remove('ouverte'); x.setAttribute('aria-label', '?'); }); M.bloque = false; }, 1100);
    }
  }
  // Relier : les images d'un côté, les mots de l'autre.
  Q.relier = function(){
    const k = partie.N.relier, debut = partie.i * k;
    let l = partie.liste.slice(debut, debut + k);
    if(l.length < k) l = melanger(partie.liste).slice(0, k);
    partie.rel = { sel:null, faits:0, k:l.length };
    cadre(nomJeu(partie.jeu), t('a_relier'), '<div class="relier"><div class="col">' + melanger(l).map(e => '<button class="rel rel-g" data-a="relier" data-c="g" data-v="' + e + '" aria-label="' + esc(nomMot(e)) + '">' + image(e, 'pic-m') + '</button>').join('') + '</div>' +
      '<div class="col">' + melanger(l).map(e => '<button class="rel rel-d" data-a="relier" data-c="d" data-v="' + e + '" dir="' + dirCible() + '">' + esc(nomMot(e)) + '</button>').join('') + '</div></div>');
    precharger(l);
  };
  function relier(btn){
    const R = partie.rel; if(!R || btn.classList.contains('trouvee')) return;
    if(!R.sel || R.sel.dataset.c === btn.dataset.c){
      if(R.sel) R.sel.classList.remove('choisi');
      R.sel = btn; btn.classList.add('choisi'); bruit('tuile');
      if(btn.dataset.c === 'g') dire(btn.dataset.v);
      return;
    }
    const a = R.sel; R.sel = null; a.classList.remove('choisi');
    if(a.dataset.v === btn.dataset.v){
      [a, btn].forEach(x => { x.classList.add('trouvee'); x.disabled = true; });
      noter(btn.dataset.v, true); garder(); bruit('juste'); dire(btn.dataset.v); R.faits++; eclat(btn); vibrer(true);
      if(R.faits === R.k){ amiDit(melanger(t('bravo'))[0], 'fete'); setTimeout(() => { partie.i++; question(); }, 1100); }
    }else{
      partie.erreurs++; bruit('faux'); amiDit(blague(), 'surpris');
      [a, btn].forEach(x => { x.classList.add('faux'); setTimeout(() => x.classList.remove('faux'), 600); });
    }
  }

  function lettresPossibles(liste){
    if(SANS_LETTRES.includes(base.cible)) return [];
    return distincts(liste, base.cible).filter(e => {
      const m = nomMot(e), n = graphemes(m).length;
      return !/\s|'|-/.test(m) && n >= 3 && n <= 10;
    });
  }
  Q.lettres = function(){
    const e = partie.liste[partie.i], g = graphemes(nomMot(e));
    let ordre = melanger(g.map((x, i) => i));
    if(ordre.every((x, i) => g[x] === g[i])) ordre = ordre.reverse();
    partie.lettres = { g, pris:[], e, faute:false };
    cadre(nomJeu(partie.jeu), t('a_lettres'),
      '<div class="centre">' + image(e, 'pic-moyenne') + '</div>' +
      '<div class="reponse" id="reponse" dir="' + dirCible() + '">' + g.map(() => '<span class="case"></span>').join('') + '</div>' +
      '<div class="tuiles" dir="' + dirCible() + '">' + ordre.map(i => '<button class="tuile" data-a="lettre" data-v="' + i + '">' + esc(g[i]) + '</button>').join('') + '</div>' +
      '<div class="actions">' + ecouteBtn(e) + '<button class="moyen" data-a="effacer">⌫ ' + esc(t('effacer')) + '</button></div>');
    precharger([e]);
  };
  function lettre(btn){
    const L = partie.lettres; if(L.fini) return;
    btn.disabled = true; L.pris.push(Number(btn.dataset.v)); bruit('tuile');
    const cases = document.querySelectorAll('#reponse .case');
    L.pris.forEach((idx, k) => { cases[k].textContent = L.g[idx]; });
    if(L.pris.length < L.g.length) return;
    if(L.pris.map(i => L.g[i]).join('') === L.g.join('')){
      L.fini = true; $('#reponse').classList.add('juste'); eclat($('#reponse')); vibrer(true);
      noter(L.e, !L.faute); garder();
      bruit('juste'); amiDit(melanger(t('bravo'))[0], 'fete'); dire(L.e);
      setTimeout(() => { partie.i++; question(); }, 1500);
    }else{
      partie.erreurs++; L.faute = true; $('#reponse').classList.add('faux'); bruit('faux');
      amiDit(blague(), 'surpris');
      setTimeout(effacer, 900);
    }
  }
  function effacer(){
    const L = partie.lettres; if(!L || L.fini) return;
    L.pris = [];
    document.querySelectorAll('#reponse .case').forEach(c => { c.textContent = ''; });
    const r = $('#reponse'); if(r) r.classList.remove('faux');
    document.querySelectorAll('.tuile').forEach(b => { b.disabled = false; });
  }

  // ── Fin de partie : étoiles, plumes, trophées ─────────────────────
  function trophees(){
    const j = J(), gagnes = [];
    // Un thème « parfait » : 3 étoiles à 10 jeux différents de ce thème.
    const theme = THEMES.some(th => Object.keys(j.etoiles).filter(k => k.startsWith(base.cible + ':' + th + ':') && j.etoiles[k] === 3).length >= 10);
    const regles = { premiere:true, serie3:serie() >= 3, serie7:serie() >= 7, mots25:bienConnus() >= 25, mots100:bienConnus() >= 100, theme, defi5:j.defis.length >= 5 };
    for(const k of TROPHEES) if(regles[k] && !j.trophees.includes(k)){ j.trophees.push(k); gagnes.push(k); }
    return gagnes;
  }
  function fin(){
    if(partie.fini) return;
    partie.fini = true; if(partie.tic) clearInterval(partie.tic);
    const j = J(), err = partie.erreurs, m = partie.meca;
    let etoiles = m === 'decouvrir' ? 3 : err === 0 ? 3 : err <= Math.max(2, Math.floor(partie.total / 4)) ? 2 : 1;
    if(m === 'chrono' && partie.chronoFin) etoiles = partie.bonnes >= 15 ? 3 : partie.bonnes >= 8 ? 2 : 1;
    let gain = m === 'decouvrir' ? partie.total : /^memoire/.test(m) ? partie.N.paires + etoiles : m === 'relier' ? partie.N.relier * 2 + etoiles : m === 'chrono' ? partie.bonnes + etoiles : partie.total + etoiles;
    const premierDefi = partie.mode === 'defi' && !j.defis.includes(jour());
    if(premierDefi){ gain *= 2; j.defis = j.defis.concat(jour()).slice(-60); }
    if(partie.mode === 'theme'){ const cle = base.cible + ':' + theme + ':' + partie.jeu; j.etoiles[cle] = Math.max(j.etoiles[cle] || 0, etoiles); }
    const avant = j.plumes;
    j.plumes += gain;
    if(!j.jours.includes(jour())) j.jours = j.jours.concat(jour()).slice(-60);
    const accs = ACCESSOIRES.filter(([k, n]) => avant < n && j.plumes >= n).map(([k]) => k);
    const trs = trophees();
    garder();
    bruit('fin');
    const retour = partie.mode === 'theme' ? 'theme-retour' : 'accueil';
    poser(barre(retour) + '<main class="centre fin">' +
      '<div class="ami-moyen">' + ami('fete') + '</div><h2>' + esc(premierDefi ? t('defi_fait') : partie.mode === 'lecon' ? t('lecon_fin', partie.appris.length) : m === 'chrono' && partie.chronoFin ? t('temps_fini') : t('fin_titre')) + '</h2>' +
      (partie.mode === 'lecon' ? '<div class="mots-appris">' + partie.appris.map(e => '<button class="mot-appris" data-a="ecouter" data-v="' + e + '">' + image(e, 'pic-mini') + '<strong dir="' + dirCible() + '">' + esc(nomMot(e)) + '</strong><span dir="auto">' + esc(traduction(e)) + '</span></button>').join('') + '</div>' : '') +
      (m === 'chrono' && partie.chronoFin ? '<p class="gain">' + esc(t('score', partie.bonnes)) + '</p>' : '') +
      '<p class="grosses-etoiles" aria-label="' + etoiles + '/3">' + '★'.repeat(etoiles) + '<span class="vide">' + '★'.repeat(3 - etoiles) + '</span></p>' +
      '<p class="gain">🪶 <span id="gain-plumes" data-n="' + gain + '">' + esc(t('fin_plumes', gain)) + '</span>' + (premierDefi ? ' (×2)' : '') + '</p>' +
      trs.map(k => '<p class="nouveau">🏆 ' + esc(t('nouveau_trophee')) + ' — ' + esc(t('tr_' + k)) + '</p>').join('') +
      (accs.length ? '<p class="nouveau">🎁 ' + esc(t('nouveau')) + ' — ' + accs.map(k => esc(t('acc_' + k))).join(', ') + '</p><p><button class="moyen" data-a="vestiaire">👗 ' + esc(t('vestiaire')) + '</button></p>' : '') +
      '<div class="actions">' + (partie.mode === 'theme' ? '<button class="moyen plein" data-a="jeu" data-v="' + partie.jeu + '">↻ ' + esc(t('rejouer')) + '</button><button class="moyen" data-a="theme-retour">' + esc(t('autre_jeu')) + '</button>'
        : '<button class="moyen plein" data-a="accueil">' + esc(t('retour')) + '</button>') + '</div>' +
      (sobre() ? '' : '<div class="confettis" aria-hidden="true">' + Array.from({ length:24 }, (_, i) => '<i style="--x:' + (Math.random() * 100).toFixed(1) + '%;--d:' + (Math.random() * .8).toFixed(2) + 's;--c:' + ['#f2c230', '#1f9e76', '#d9534f', '#2a6fd6'][i % 4] + '"></i>').join('') + '</div>') +
      '</main>', 'fin');
    const g = $('#gain-plumes');
    if(g && !sobre()){ const n = gain, t0 = performance.now(); const pas = now => { const k = Math.min(1, (now - t0) / 900), v = Math.round(n * (1 - Math.pow(1 - k, 3))); g.textContent = t('fin_plumes', v); if(k < 1) requestAnimationFrame(pas); }; g.textContent = t('fin_plumes', 0); setTimeout(() => requestAnimationFrame(pas), 450); }
  }


  // ── Le village d'Ami : carte d'aventure reliée aux thèmes existants ──
  const VILLAGE_TEXT = {
    fr:{title:"Le village des mots",intro:"Ami a besoin de toi ! Choisis un lieu et pars à la découverte des mots.",mission:"Ta mission",hint:"Chaque lieu cache des mots à découvrir. Termine une partie pour faire progresser ton carnet.",back:"Retour au nid"},
    en:{title:"The Word Village",intro:"Ami needs your help! Pick a place and discover new words.",mission:"Your mission",hint:"Every place is full of words. Finish a game to grow your word notebook.",back:"Back to the nest"},
    es:{title:"El pueblo de las palabras",intro:"¡Ami necesita tu ayuda! Elige un lugar y descubre palabras.",mission:"Tu misión",hint:"Cada lugar esconde palabras. Termina una partida para llenar tu cuaderno.",back:"Volver al nido"},
    it:{title:"Il villaggio delle parole",intro:"Ami ha bisogno di te! Scegli un luogo e scopri nuove parole.",mission:"La tua missione",hint:"Ogni luogo nasconde parole. Completa una partita per arricchire il quaderno.",back:"Torna al nido"},
    pt:{title:"A aldeia das palavras",intro:"O Ami precisa de ti! Escolhe um lugar e descobre palavras.",mission:"A tua missão",hint:"Cada lugar esconde palavras. Termina uma partida para encher o caderno.",back:"Voltar ao ninho"},
    de:{title:"Das Wörterdorf",intro:"Ami braucht dich! Wähle einen Ort und entdecke neue Wörter.",mission:"Deine Mission",hint:"An jedem Ort warten Wörter. Beende ein Spiel und fülle dein Wörterbuch.",back:"Zurück zum Nest"},
    ar:{title:"قرية الكلمات",intro:"آمي يحتاج إليك! اختر مكاناً واكتشف كلمات جديدة.",mission:"مهمتك",hint:"في كل مكان كلمات جديدة. أكمل لعبة لتضيفها إلى دفتر كلماتك.",back:"العودة إلى العش"},
    tr:{title:"Kelime Köyü",intro:"Ami'nin yardımına ihtiyacı var! Bir yer seç ve yeni kelimeler keşfet.",mission:"Görevin",hint:"Her yerde keşfedilecek kelimeler var. Defterini geliştirmek için bir oyunu bitir.",back:"Yuvaya dön"},
    pl:{title:"Wioska słów",intro:"Ami potrzebuje pomocy! Wybierz miejsce i odkrywaj słowa.",mission:"Twoja misja",hint:"W każdym miejscu czekają słowa. Ukończ grę, aby uzupełnić notes.",back:"Wróć do gniazda"},
    ja:{title:"ことばの村",intro:"アミが助けを待っているよ！場所を選んで新しい言葉を見つけよう。",mission:"ミッション",hint:"それぞれの場所に言葉が隠れているよ。ゲームを終えてノートを育てよう。",back:"巣に戻る"},
    uk:{title:"Селище слів",intro:"Амі потрібна твоя допомога! Обери місце й відкривай слова.",mission:"Твоє завдання",hint:"У кожному місці є нові слова. Заверши гру, щоб поповнити записник.",back:"До гнізда"},
    ko:{title:"단어 마을",intro:"아미에게 도움이 필요해요! 장소를 골라 새 단어를 찾아봐요.",mission:"미션",hint:"각 장소에는 단어가 숨어 있어요. 게임을 마치고 단어장을 채워요.",back:"둥지로 돌아가기"},
    dz:{title:"قرية الكلمات",intro:"آمي يحتاج مساعدتك! اختار مكان واكتشف كلمات جديدة.",mission:"مهمتك",hint:"كل بلاصة فيها كلمات. كمّل لعبة باش تعمّر كراسك.",back:"ارجع للعش"},
    ma:{title:"قرية الكلمات",intro:"آمي محتاج مساعدتك! اختار بلاصة واكتشف كلمات جديدة.",mission:"المهمة ديالك",hint:"كل بلاصة فيها كلمات. كمل لعبة باش تعمر الدفتر ديالك.",back:"رجع للعش"},
    tn:{title:"قرية الكلمات",intro:"آمي يستحق مساعدتك! اختار بلاصة واكتشف كلمات جديدة.",mission:"مهمتك",hint:"كل بلاصة فيها كلمات. كمّل لعبة باش تعمّر كراسك.",back:"ارجع للعش"},
    kab:{title:"Tamdint n wawalen",intro:"Ami yesra tallelt-ik! Fren adeg sakin snirem awalen imaynuten.",mission:"Tameẓla-k",hint:"Yal adeg yesɛa awalen. Fak urar akken ad ternuḍ deg tferkit-ik.",back:"Uɣal ɣer usennun"}
  };
  const LIEUX_VILLAGE = [
    {theme:'animaux',icon:'🌳',fr:'La forêt des animaux',en:'Animal Forest'},
    {theme:'manger',icon:'🍓',fr:'Le marché gourmand',en:'The Food Market'},
    {theme:'maison',icon:'🏡',fr:'La maison bavarde',en:'The Talking House'},
    {theme:'nature',icon:'🌻',fr:'Le jardin merveilleux',en:'The Wonder Garden'},
    {theme:'ville',icon:'🚲',fr:'La place du village',en:'Village Square'},
    {theme:'musique',icon:'🎵',fr:'La scène enchantée',en:'The Magic Stage'},
    {theme:'habits',icon:'🧢',fr:'La boutique des costumes',en:'The Costume Shop'},
    {theme:'atelier',icon:'🔭',fr:'Le laboratoire curieux',en:'The Curious Lab'}
  ];
  function village(){
    const tx=VILLAGE_TEXT[base.ui] || VILLAGE_TEXT.fr;
    const cartes=LIEUX_VILLAGE.map(l=>{
      const n=distincts(motsDu(l.theme,base.cible),base.cible).length;
      if(n<4) return '';
      const libre=ouvert(l.theme), visite=(J().villageVisites||[]).includes(jour()+':'+l.theme);
      const titre=l[base.ui]||l.fr;
      return '<button class="lieu-village'+(libre?'':' verrou')+(visite?' visite':'')+'" data-a="'+(libre?'village-lieu':'plus')+'" data-v="'+l.theme+'">' +
        '<span class="lieu-icone" aria-hidden="true">'+l.icon+'</span><span class="lieu-titre">'+esc(titre)+'</span>' +
        '<span class="lieu-theme">'+esc(t('th_'+l.theme))+'</span>' +
        '<span class="lieu-bas">'+(libre?(visite?'✓ '+(base.ui==='en'?'Visited today':'Visité aujourd’hui'):(base.ui==='en'?'Explore this place':'Explorer ce lieu')):'✨ '+esc(t('plus_badge')) )+'</span></button>';
    }).join('');
    const dialogues={
      fr:["Psst… j’ai entendu des mots rigolos dans la forêt !","Le marché sent bon… et les mots aussi !","Dans cette maison, chaque objet a une histoire.","Tu es prêt ? Le village compte sur toi !"],
      en:["Psst… I heard funny words in the forest!","The market smells lovely… and so do the words!","Every object in this house has a story.","Ready? The whole village is counting on you!"]
    };
    const ds=dialogues[base.ui]||dialogues.fr, d=ds[Math.floor(Math.random()*ds.length)];
    poser(barre('accueil')+'<main class="village-page"><div class="village-ciel"><div class="village-ami ami-3d">'+ami('content')+'</div><div class="village-parole">💬 '+esc(d)+'</div><p class="sur-titre-phrases">🗺️ '+esc(tx.mission)+'</p><h2>'+esc(tx.title)+'</h2><p class="village-intro">'+esc(tx.intro)+'</p></div>' +
      '<div class="village-carte">'+cartes+'</div><p class="village-aide">✨ '+esc(tx.hint)+'</p><div class="actions"><button class="moyen" data-a="accueil">← '+esc(tx.back)+'</button></div></main>','village');
  }
  function entrerVillageLieu(th){
    if(!LIEUX_VILLAGE.some(x=>x.theme===th)) return village();
    if(!ouvert(th)) return ecranPlus('village');
    J().villageVisites=J().villageVisites||[];
    const k=jour()+':'+th;
    if(!J().villageVisites.includes(k)) J().villageVisites.push(k);
    J().villageVisites=J().villageVisites.slice(-80);
    garder();
    choisirJeu(th);
  }

  // ── Défi du jour et révision ──────────────────────────────────────
  function defi(){
    // Le même défi toute la journée (tirage fixé par la date et la langue).
    let graine = [...(jour() + base.cible)].reduce((s, c) => (s * 31 + c.charCodeAt(0)) >>> 0, 7);
    const alea = () => { graine = (graine * 1103515245 + 12345) >>> 0; return graine / 4294967296; };
    const pool = distincts(motsOuverts(base.cible), base.cible).sort();
    const choisis = [];
    while(choisis.length < Math.min(DEFI, pool.length)){ const e = pool[Math.floor(alea() * pool.length)]; if(!choisis.includes(e)) choisis.push(e); }
    commencer('defi:n', 'defi', choisis);
  }

  // ── Atelier des phrases : phrases courtes relues, FR/EN uniquement ──
  // Les autres langues restent disponibles pour les jeux de mots ; les phrases
  // ne sont proposées que lorsqu'un jeu de phrases relu est fourni.
  const PHRASES = {
    fr: [
      "Le chat dort sur le tapis.",
      "Le petit chien joue dans le jardin.",
      "La maman prépare un bon repas.",
      "Le garçon regarde un grand livre.",
      "La fille boit de l’eau fraîche.",
      "Le lapin mange une carotte orange.",
      "Le soleil brille dans le ciel.",
      "Le papillon vole près des fleurs.",
      "Le bébé rit avec son papa.",
      "Le poisson nage dans l’eau.",
      "Nous allons jouer dans la maison.",
      "J’aime apprendre de nouveaux mots."
    ],
    en: [
      "The cat sleeps on the rug.",
      "The little dog plays in the garden.",
      "Mum is making a tasty meal.",
      "The boy is reading a big book.",
      "The girl drinks fresh water.",
      "The rabbit eats an orange carrot.",
      "The sun is shining in the sky.",
      "The butterfly flies near the flowers.",
      "The baby laughs with Dad.",
      "The fish swims in the water.",
      "We are going to play inside.",
      "I love learning new words."
    ]
  };
  let atelierPhrase = null;
  function afficherPhrase(){
    const p = atelierPhrase;
    if(!p) return accueil();
    const fini = p.index >= p.liste.length;
    if(fini){
      poser(barre('accueil') + '<main class="atelier-phrases fin-phrases">' +
        '<div class="ami-moyen ami-3d">' + ami('fete') + '</div>' +
        '<p class="sur-titre-phrases">✨ ' + (base.ui === 'en' ? 'MISSION COMPLETE' : 'MISSION TERMINÉE') + '</p>' +
        '<h2>' + (base.ui === 'en' ? 'Sentence superstar!' : 'Champion des phrases !') + '</h2>' +
        '<p>' + (base.ui === 'en' ? 'You built 12 sentences. Ami is proud of you!' : 'Tu as construit 12 phrases. Ami est très fier de toi !') + '</p>' +
        '<p class="gain-phrases">⭐ +' + p.gain + ' plumes</p>' +
        '<button class="moyen plein" data-a="accueil">' + (base.ui === 'en' ? 'Back to the nest' : 'Retour au nid') + '</button></main>');
      return;
    }
    const phrase = p.liste[p.index];
    const tokens = phrase.split(' ');
    const choisis = p.choisis;
    const ordre = tokens.map((_,i)=>i).filter(i=>!choisis.includes(i));
    const titre = base.ui === 'en' ? 'Sentence workshop' : 'Atelier des phrases';
    const aide = base.ui === 'en' ? 'Tap the words in the right order.' : 'Touche les mots dans le bon ordre.';
    const langue = base.cible === 'en' ? 'English' : 'Français';
    poser(barre('accueil') + '<main class="atelier-phrases">' +
      '<div class="atelier-entete"><div class="ami-phrase ami-3d" id="ami-phrase">' + ami('content') + '</div>' +
      '<div><p class="sur-titre-phrases">🧩 ' + titre + '</p><h2>' + (base.ui === 'en' ? 'Put the sentence together!' : 'Construis la phrase !') + '</h2>' +
      '<p class="aide-phrases">' + aide + '</p><span class="langue-phrase">' + langue + '</span></div></div>' +
      '<div class="progress-phrases" aria-label="' + (p.index+1) + ' / ' + p.liste.length + '"><span style="width:' + ((p.index/p.liste.length)*100) + '%"></span></div>' +
      '<p class="compteur-phrases">' + (base.ui === 'en' ? 'Sentence' : 'Phrase') + ' ' + (p.index+1) + ' / ' + p.liste.length + '</p>' +
      '<div class="phrase-construite" aria-live="polite" dir="auto">' + (choisis.length ? choisis.map(i=>'<span class="mot-place">'+esc(tokens[i])+'</span>').join(' ') : '<span class="placeholder-phrase">'+(base.ui==='en'?'Your sentence will appear here…':'Ta phrase apparaîtra ici…')+'</span>') + '</div>' +
      '<div class="tuiles-phrases" dir="auto">' + melanger(ordre).map(i=>'<button class="tuile-phrase" data-a="phrase-token" data-v="'+i+'">'+esc(tokens[i])+'</button>').join('') + '</div>' +
      '<p class="retour-phrase" id="retour-phrase" role="status" aria-live="polite">'+(base.ui==='en'?'Ami says: Let’s make a sentence!':'Ami dit : Allez, on fabrique une phrase !')+'</p>' +
      '<div class="actions actions-phrases">' +
      '<button class="moyen" data-a="phrase-reset">↶ '+(base.ui==='en'?'Start again':'Recommencer')+'</button>' +
      '<button class="moyen" data-a="phrase-hint">💡 '+(base.ui==='en'?'Hint':'Indice')+'</button>' +
      '<button class="moyen plein" data-a="phrase-check">✓ '+(base.ui==='en'?'Check':'Vérifier')+'</button></div>' +
      '<p class="note-phrases">'+(base.ui==='en'?'No rush. Learning is an adventure!':'Pas de chrono : apprendre, c’est une aventure !')+'</p></main>');
  }
  function atelierPhrases(){
    if(!PHRASES[base.cible]){
      const en = base.ui === 'en';
      poser(barre('accueil') + '<main class="centre atelier-phrases">' +
        '<div class="ami-moyen ami-3d">'+ami('content')+'</div><h2>💬 '+(en?'Sentence workshop':'Atelier des phrases')+'</h2>' +
        '<p>'+(en?'Carefully reviewed sentence activities are currently available in French and English. Word games remain available in all 16 languages.':'Les phrases relues sont disponibles pour le moment en français et en anglais. Les jeux de mots restent disponibles dans les 16 langues.')+'</p>' +
        '<button class="moyen plein" data-a="accueil">'+(en?'Back':'Retour')+'</button></main>');
      return;
    }
    atelierPhrase={liste:melanger(PHRASES[base.cible].slice()),index:0,choisis:[],gain:0};
    afficherPhrase();
  }
  function choisirMotPhrase(i){
    if(!atelierPhrase) return;
    const p=atelierPhrase, tokens=p.liste[p.index].split(' ');
    if(p.choisis.includes(i) || i<0 || i>=tokens.length) return;
    p.choisis.push(i);
    afficherPhrase();
  }
  function verifierPhrase(){
    if(!atelierPhrase) return;
    const p=atelierPhrase, tokens=p.liste[p.index].split(' ');
    const zone=$('#retour-phrase');
    if(p.choisis.length!==tokens.length || p.choisis.some((v,i)=>v!==i)){
      if(zone) zone.textContent=blague();
      const amiEl=$('#ami-phrase'); if(amiEl){amiEl.classList.remove('ami-raté'); void amiEl.offsetWidth; amiEl.classList.add('ami-raté');}
      bruit('faux');
      return;
    }
    p.gain+=3; J().plumes+=3; garder(); bruit('juste');
    const zone2=$('#retour-phrase');
    if(zone2) zone2.textContent=base.ui==='en'?'Brilliant! Ami is doing a happy dance!':'Bravo ! Ami fait sa danse de la victoire !';
    const amiEl=$('#ami-phrase'); if(amiEl){amiEl.innerHTML=ami('fete');amiEl.classList.add('ami-3d');}
    const boutons=document.querySelectorAll('.tuile-phrase'); boutons.forEach(b=>b.disabled=true);
    const check=$('[data-a="phrase-check"]'); if(check) check.disabled=true;
    const hint=$('[data-a="phrase-hint"]'); if(hint) hint.disabled=true;
    const reset=$('[data-a="phrase-reset"]'); if(reset) reset.disabled=true;
    const next=document.createElement('button'); next.className='moyen plein'; next.dataset.a='phrase-next';
    next.textContent=base.ui==='en'?'Next sentence →':'Phrase suivante →';
    $('.actions-phrases')?.appendChild(next);
    eclat($('.phrase-construite'));
  }
  function indicePhrase(){
    if(!atelierPhrase) return;
    const p=atelierPhrase, tokens=p.liste[p.index].split(' ');
    const prochain=p.choisis.length;
    if(prochain<tokens.length){
      const zone=$('#retour-phrase');
      if(zone) zone.textContent=(base.ui==='en'?'Ami’s hint: the next word is “':'Indice d’Ami : le prochain mot est « ')+tokens[prochain]+(base.ui==='en'?'”':' »');
    }
  }

  // Leçon : 5 mots nouveaux d'un même thème, présentés puis joués 10 fois.
  function lecon(){
    const libres = THEMES.filter(ouvert);
    let choisis = [];
    for(const th of libres){
      const neufs = distincts(motsDu(th, base.cible), base.cible).filter(e => !fiche(e));
      if(neufs.length >= 3){ choisis = neufs.slice(0, 5); break; }
    }
    if(!choisis.length){
      poser(barre('accueil') + '<main class="centre"><div class="ami-moyen">' + ami('fete') + '</div><h2>📚 ' + esc(t('apprendre')) + '</h2><p>' + esc(t('lecon_rien')) + '</p>' +
        '<p><button class="moyen plein" data-a="revoir">🔁 ' + esc(t('revoir')) + '</button></p></main>');
      return;
    }
    const tours = melanger(choisis).concat(melanger(choisis));
    commencer('lecon:n', 'lecon', tours);
    partie.tous = choisis.concat(distincts(motsOuverts(base.cible), base.cible).filter(e => !choisis.includes(e) && fiche(e)));
    partie.appris = choisis;
  }
  function revoir(){
    const dus = aRevoir().slice(0, 10);
    if(dus.length < 1){
      poser(barre('accueil') + '<main class="centre"><div class="ami-moyen">' + ami('content') + '</div><h2>🔁 ' + esc(t('revoir')) + '</h2><p>' + esc(t('revoir_rien')) + '</p>' +
        '<p><button class="moyen plein" data-a="themes">▶ ' + esc(t('jouer')) + '</button></p></main>');
      return;
    }
    commencer('revoir:n', 'revoir', dus);
  }

  // ── Carnet, trophées, vestiaire, réglages ─────────────────────────
  function carnet(){
    const vus = Object.keys(MOTS).filter(e => MOTS[e][base.cible] && fiche(e));
    const corps = !vus.length ? '<p class="centre">' + esc(t('carnet_vide')) + '</p>' : THEMES.map(th => {
      const l = vus.filter(e => MOTS[e].theme === th); if(!l.length) return '';
      return '<h3>' + esc(t('th_' + th)) + '</h3><ul class="carnet">' + l.map(e => {
        const b = fiche(e).b, tr = traduction(e);
        return '<li><button class="ligne-carnet" data-a="ecouter" data-v="' + e + '" aria-label="' + esc(t('ecouter') + ' : ' + nomMot(e)) + '">' + image(e, 'pic-mini') +
          '<span class="txt"><strong dir="' + dirCible() + '">' + esc(nomMot(e)) + '</strong>' + (tr ? '<span dir="auto">' + esc(tr) + '</span>' : '') + '</span>' +
          '<span class="points" aria-label="' + b + '/4">' + '●'.repeat(b) + '<span class="vide">' + '●'.repeat(4 - b) + '</span></span><span aria-hidden="true">🔊</span></button></li>';
      }).join('') + '</ul>';
    }).join('');
    poser(barre('accueil') + '<main><h2>📒 ' + esc(t('carnet')) + '</h2><p class="aide">' + esc(t('carnet_aide')) + ' · ' + esc(t('maitrise', bienConnus())) + '</p>' + corps + '<p class="note" id="note-voix" aria-live="polite"></p></main>');
  }
  function ecranTrophees(){
    poser(barre('accueil') + '<main class="centre"><h2>🏆 ' + esc(t('trophees')) + '</h2><div class="grille accs">' + TROPHEES.map(k => {
      const ok = J().trophees.includes(k);
      return '<div class="acc' + (ok ? '' : ' verrou') + '"><span class="coupe" aria-hidden="true">' + (ok ? '🏆' : '🔒') + '</span><strong>' + esc(t('tr_' + k)) + '</strong></div>';
    }).join('') + '</div></main>');
  }
  function vestiaire(){
    poser(barre('accueil') + '<main class="centre"><div class="ami-grand">' + ami('content') + '</div><h2>' + esc(t('vestiaire')) + '</h2>' +
      '<p>🪶 ' + J().plumes + ' ' + esc(t('plumes')) + '</p><div class="grille accs">' + ACCESSOIRES.map(([k, n]) => {
        const dispo = J().plumes >= n, porte = J().porte.includes(k);
        return '<div class="acc' + (dispo ? '' : ' verrou') + '"><div class="ami-mini">' + ami('content', { porte:[k], immobile:true }) + '</div><strong>' + esc(t('acc_' + k)) + '</strong>' +
          (dispo ? '<button class="moyen' + (porte ? '' : ' plein') + '" data-a="porter" data-v="' + k + '">' + esc(porte ? t('enlever') : t('mettre')) + '</button>'
                 : '<span class="seuil">🔒 ' + esc(t('a_partir', n)) + '</span>') + '</div>';
      }).join('') + '</div></main>');
  }
  function reglages(){
    poser(barre('accueil') + '<main class="texte"><h2>⚙️ ' + esc(t('reglages')) + '</h2>' +
      '<div class="reglage reglage-facile"><span><strong>📖 ' + esc(t('facile')) + '</strong><span class="petit">' + esc(t('facile_aide')) + '</span></span><button class="moyen' + (facile() ? ' plein' : '') + '" data-a="facile" aria-pressed="' + facile() + '">' + esc(facile() ? t('oui') : t('non')) + '</button></div>' +
      '<div class="reglage"><span>🔔 ' + esc(t('son')) + '</span><button class="moyen' + (base.son ? ' plein' : '') + '" data-a="son" aria-pressed="' + base.son + '">' + esc(base.son ? t('oui') : t('non')) + '</button></div>' +
      '<section class="reglage-humour"><h3>😂 ' + (base.ui === 'en' ? 'Ami’s joke level' : 'Le niveau des blagues d’Ami') + '</h3><p class="petit">' + (base.ui === 'en' ? 'Ami only teases himself, the words or the situation — never the player.' : 'Ami se moque de lui-même, des mots ou de la situation — jamais du joueur.') + '</p><div class="choix-humour">' +
      ['Tout doux','Taquin','Piquant','Corsé 🪶'].map((nom, i) => '<button class="moyen' + (niveauHumour() === i ? ' plein' : '') + '" data-a="humour" data-v="' + i + '" aria-pressed="' + (niveauHumour() === i) + '">' + (base.ui === 'en' ? ['Gentle','Playful','Spicy','Extra cheeky 🪶'][i] : nom) + '</button>').join('') +
      '</div><p class="petit">' + (base.ui === 'en' ? 'Even the spiciest level stays kind.' : 'Même le niveau le plus corsé reste bienveillant.') + '</p>' +
      '<h3 class="langue-blagues-titre">🗣️ ' + (base.ui === 'en' ? 'Language of the jokes' : 'Langue des blagues') + '</h3><p class="petit">' + (base.ui === 'en' ? 'Choose the language Ami uses for jokes and spoken feedback.' : 'Choisis la langue utilisée par Ami pour ses blagues et ses commentaires vocaux.') + '</p><div class="choix-humour choix-langue-blagues">' +
      '<button class="moyen' + (langueBlagues() === 'fr' ? ' plein' : '') + '" data-a="langue-blagues" data-v="fr" aria-pressed="' + (langueBlagues() === 'fr') + '">🇫🇷 Français</button>' +
      '<button class="moyen' + (langueBlagues() === 'en' ? ' plein' : '') + '" data-a="langue-blagues" data-v="en" aria-pressed="' + (langueBlagues() === 'en') + '">🇬🇧 English</button>' +
      '</div></section>' +
      (CONFIG.MODE_PAYANT ? '<h3>✨ ' + esc(t('plus')) + '</h3>' + (plus()
        ? '<p>' + esc(t('abo_actif', droits ? new Date(droits.fin).toLocaleDateString(base.ui) : '')) + '</p>' + (CONFIG.LIEN_GESTION ? '<p><a class="moyen" href="' + esc(CONFIG.LIEN_GESTION) + '" target="_blank" rel="noopener">' + esc(t('gerer_abo')) + '</a></p>' : '')
        : '<p><button class="moyen plein" data-a="plus" data-v="reglages">' + esc(t('decouvrir_plus')) + '</button></p>') +
        '<p class="petit">' + esc(t('code_abo')) + '<br><code>' + esc(base.abo.code) + '</code><br>' + esc(t('code_aide')) + '</p>' : '') +
      '<h3>' + esc(t('joueurs')) + '</h3><div class="liste-joueurs">' + base.joueurs.map((j, i) =>
        '<button class="ligne-carnet" data-a="modifier-joueur" data-v="' + i + '"><span class="ami-icone">' + ami('content', { couleur:j.couleur, porte:j.porte, immobile:true }) + '</span><span class="txt"><strong>' + esc(j.nom || '—') + (i === base.actif ? ' ✓' : '') + '</strong><span>🪶 ' + j.plumes + '</span></span><span aria-hidden="true">✏️</span></button>').join('') + '</div>' +
      (base.joueurs.length < MAX_JOUEURS ? '<p><button class="moyen" data-a="nouveau-joueur">＋ ' + esc(t('ajouter_joueur')) + (plus() ? '' : ' ✨') + '</button></p>' : '') +
      '<h3>💾 ' + esc(t('sauvegarde')) + '</h3><p class="petit">' + esc(t('sauvegarde_aide')) + '</p>' +
      '<div class="actions"><button class="moyen" data-a="sauvegarder">⬇️ ' + esc(t('sauvegarder')) + '</button><button class="moyen" data-a="restaurer">⬆️ ' + esc(t('restaurer')) + '</button></div>' +
      '<input type="file" id="fichier-sauvegarde" accept="application/json,.json" hidden><p id="etat-sauvegarde" class="petit" role="status"></p>' +
      '<h3>' + esc(t('apropos')) + '</h3><p>' + esc(t('apropos_texte')) + '</p><p class="petit">' + esc(t('apropos_voix')) + '</p>' +
      '<p class="petit">Ami des mots · ReParole (reparole.fr)<br>David Colucci — colucci.david@yahoo.fr · GitHub Pages (GitHub, Inc.)</p>' +
      '<p><button class="moyen" data-a="effacer-tout">' + esc(t('effacer_progres')) + '</button></p></main>');
  }

  // ── Ami des mots Plus ─────────────────────────────────────────────
  let retourPlus = 'accueil';
  function ecranPlus(retour){
    retourPlus = retour || 'accueil';
    const lien = CONFIG.LIEN_PAIEMENT ? CONFIG.LIEN_PAIEMENT + (CONFIG.LIEN_PAIEMENT.includes('?') ? '&' : '?') + 'client_reference_id=' + encodeURIComponent(base.abo.code) : '';
    poser(barre(retourPlus) + '<main class="centre plus">' +
      '<div class="ami-moyen">' + ami('fete', { porte:['couronne'] }) + '</div>' +
      '<h2>✨ ' + esc(t('plus')) + '</h2><p>' + esc(t('plus_titre')) + '</p>' +
      '<ul class="avantages">' + t('plus_avantages').map(a => '<li>' + esc(a) + '</li>').join('') + '</ul>' +
      '<p class="prix"><strong>' + esc(t('plus_prix', CONFIG.PRIX)) + '</strong><br><span class="petit">' + esc(t('sans_engagement')) + '</span></p>' +
      (lien ? '<p><a class="gros" href="' + esc(lien) + '" rel="noopener">' + esc(t('s_abonner')) + '</a></p>' : '<p class="gros desactive" aria-disabled="true">' + esc(t('bientot')) + '</p>') +
      '<p class="petit">' + esc(t('gratuit_reste')) + '</p>' +
      (CONFIG.API_ABONNEMENT ? '<details class="deja"><summary>' + esc(t('deja_abonne')) + '</summary><form id="form-code" class="form"><label>' + esc(t('code_abo')) +
        '<input id="code" autocomplete="off" autocapitalize="characters" spellcheck="false" placeholder="AMI-XXXX-XXXX-XXXX"></label><button class="moyen plein" type="submit">' + esc(t('verifier')) + '</button><p id="code-etat" role="status"></p></form></details>' : '') +
      '</main>');
    const f = $('#form-code');
    if(f) f.addEventListener('submit', async ev => {
      ev.preventDefault();
      const code = formatCode($('#code').value), etat = $('#code-etat');
      if(!/^AMI-[A-Z0-9]{4}-[A-Z0-9]{4}-[A-Z0-9]{4}$/.test(code)){ etat.textContent = t('abo_inconnu'); return; }
      etat.textContent = '…';
      const r = await verifier(code);
      if(!r){ etat.textContent = t('hors_ligne'); return; }
      const d = r.actif ? await verifierJeton(r.jeton, code) : null;
      if(!d){ etat.textContent = t('abo_inconnu'); return; }
      Object.assign(base.abo, { code, jeton:r.jeton, verifie:jour() }); droits = d; garder();
      annonce('✨ ' + t('plus')); accueil();
    });
  }

  // ── Sauvegarde : un fichier .json à garder (iPhone peut vider le stockage
  // d'un site non installé après quelques semaines sans visite). ──────────
  function sauvegarder(){
    const d = JSON.stringify({ app:'ami-des-mots', version:2, date:new Date().toISOString(), donnees:base }, null, 1);
    const a = document.createElement('a');
    a.href = URL.createObjectURL(new Blob([d], { type:'application/json' }));
    a.download = 'ami-des-mots-' + jour() + '.json';
    document.body.appendChild(a); a.click(); setTimeout(() => { URL.revokeObjectURL(a.href); a.remove(); }, 1000);
  }
  // Contrôles stricts : taille, forme, valeurs bornées ; tout le reste est ignoré.
  const DATE = /^\d{4}-\d{2}-\d{2}$/, CLE_ETOILE = /^[a-z]{2,3}:[a-z]+:[a-z_]+:[fne]$/, CLE_MOT = /^[a-z]{2,3}:[^:]{1,16}$/;
  const filtrerObjet = (o, cle, val, max) => { const r = {}; if(o && typeof o === 'object' && !Array.isArray(o)) Object.keys(o).slice(0, max).forEach(k => { if(cle.test(k) && val(o[k])) r[k] = o[k]; }); return r; };
  const dates = l => Array.isArray(l) ? l.filter(x => typeof x === 'string' && DATE.test(x)).slice(-60) : [];
  function restaurer(fichier){
    const etat = $('#etat-sauvegarde'), lu = new FileReader();
    if(!fichier || fichier.size > 2e6){ if(etat) etat.textContent = t('restaure_ko'); return; }
    lu.onload = async () => {
      try{
        const d = JSON.parse(lu.result).donnees;
        if(!d || !Array.isArray(d.joueurs) || !d.joueurs.length || d.joueurs.length > MAX_JOUEURS) throw new Error('format');
        const propre = j => Object.assign(nouveauJoueur(String(j.nom || '').slice(0, 20), Math.min(COULEURS.length - 1, Math.max(0, Math.floor(Number(j.couleur)) || 0))), {
          plumes:Math.min(1e6, Math.max(0, Math.floor(Number(j.plumes)) || 0)),
          etoiles:filtrerObjet(j.etoiles, CLE_ETOILE, v => [1, 2, 3].includes(v), 5000),
          jours:dates(j.jours), defis:dates(j.defis),
          porte:Array.isArray(j.porte) ? j.porte.filter(k => ACCESSOIRES.some(a => a[0] === k)) : [],
          mots:filtrerObjet(j.mots, CLE_MOT, v => v && [0, 1, 2, 3, 4].includes(v.b) && DATE.test(v.d), 5000),
          trophees:Array.isArray(j.trophees) ? j.trophees.filter(k => TROPHEES.includes(k)) : [], facile:!!j.facile });
        base.joueurs = d.joueurs.map(propre); base.actif = 0;
        if(UI.includes(d.ui)) base.ui = d.ui;
        if(APPRENDRE.includes(d.cible)) base.cible = d.cible;
        else if(d.cible){
          base.cibleMasquee = d.cible;
          base.cible = base.ui === 'fr' ? 'en' : 'fr';
        }
        // Le code d'abonnement revient ; le certificat sera redemandé au serveur.
        if(d.abo && /^AMI-[A-Z0-9]{4}-[A-Z0-9]{4}-[A-Z0-9]{4}$/.test(d.abo.code)){ base.abo = { code:d.abo.code, jeton:'', verifie:'' }; droits = null; }
        garder(); annonce('💾 ' + t('restaure_ok')); accueil.choisi = false; accueil(); rafraichir(true);
      }catch(e){ if(etat) etat.textContent = t('restaure_ko'); }
    };
    lu.readAsText(fichier);
  }
  document.addEventListener('change', ev => { if(ev.target.id === 'fichier-sauvegarde' && ev.target.files[0]) restaurer(ev.target.files[0]); });

  // ── Un seul écouteur pour toute l'application ─────────────────────
  document.addEventListener('click', ev => {
    const b = ev.target.closest('[data-a]'); if(!b) return;
    const v = b.dataset.v;
    switch(b.dataset.a){
      case 'accueil': return accueil();
      case 'themes': return themes();
      case 'theme': return choisirJeu(v);
      case 'theme-retour': return choisirJeu(theme);
      case 'jeu': return commencer(v);
      case 'defi': return defi();
      case 'lecon': return lecon();
      case 'phrases': return atelierPhrases();
      case 'village': return village();
      case 'village-lieu': return entrerVillageLieu(v);
      case 'phrase-token': return choisirMotPhrase(Number(v));
      case 'phrase-check': return verifierPhrase();
      case 'phrase-hint': return indicePhrase();
      case 'phrase-reset': if(atelierPhrase) atelierPhrase.choisis=[]; return afficherPhrase();
      case 'phrase-next': if(atelierPhrase){ atelierPhrase.index++; atelierPhrase.choisis=[]; } return afficherPhrase();
      case 'compris': if(!fiche(v)){ J().mots[cleMot(v)] = { b:0, d:jour() }; garder(); } return question();
      case 'deja-connu': J().mots[cleMot(v)] = { b:1, d:jour(1) }; garder(); return question();
      case 'revoir': return revoir();
      case 'ecouter': return dire(v);
      case 'lent': return direLent(v);
      case 'bouche': fermerFenetre(); return window.Articulation && Articulation.montrer(aDire(v), b);
      case 'a-toi': return aToi(v);
      case 'enregistrer': return b.classList.contains('enregistre') ? (micro && micro.rec && micro.rec.state === 'recording' && micro.rec.stop()) : enregistrer(v);
      case 'je-l-ai-dit': { const k = cleMot(v), j = J(); j.parle = j.parle || []; if(!j.parle.includes(k)){ j.parle = j.parle.concat(k); j.plumes += 1; garder(); } const et = $('#a-toi-etat'); if(et) et.textContent = t('a_toi_bravo'); eclat(b); bruit('juste'); return; }
      case 'me-reecouter': if(micro && micro.url) new Audio(micro.url).play().catch(() => {}); return;
      case 'fermer-fenetre': return fermerFenetre();
      case 'astuces': return astuces();
      case 'suivant': partie.i++; return question();
      case 'repondre': return repondre(b);
      case 'vf': return vf(b);
      case 'mcarte': return mcarte(b);
      case 'panier': return panier(b);
      case 'lettre-choix': return lettreChoix(b);
      case 'relier': return relier(b);
      case 'lettre': return lettre(b);
      case 'effacer': return effacer();
      case 'carnet': return carnet();
      case 'trophees': return ecranTrophees();
      case 'vestiaire': return vestiaire();
      case 'reglages': case 'apropos': return reglages();
      case 'qui': accueil.choisi = false; return quiJoue();
      case 'choisir-joueur': base.actif = Number(v); garder(); accueil.choisi = true; return accueil();
      case 'nouveau-joueur': return base.joueurs.length >= CONFIG.JOUEURS_GRATUITS && !plus() && !(base.joueurs.length === 1 && !base.joueurs[0].nom) ? ecranPlus('reglages') : formJoueur(null);
      case 'plus': return ecranPlus(v || 'accueil');
      case 'modifier-joueur': return formJoueur(Number(v));
      case 'supprimer-joueur':
        if(!b.dataset.ok){ b.dataset.ok = 1; b.textContent = t('confirmer'); return; }
        base.joueurs.splice(Number(v), 1); base.actif = 0; garder(); return reglages();
      case 'facile': J().facile = !J().facile; garder(); return reglages();
      case 'consigne': return lireConsigne(($('#consigne') || {}).textContent);
      case 'humour': J().humour = Math.max(0, Math.min(3, Number(v) || 0)); garder(); return reglages();
      case 'langue-blagues': J().langueBlagues = v === 'en' ? 'en' : 'fr'; garder(); return reglages();
      case 'continuer-erreur':
        if(!partie || !partie.attenteErreur) return;
        partie.attenteErreur = false;
        partie.verrou = false;
        const boutonSuite = $('#continuer-erreur'); if(boutonSuite) boutonSuite.hidden = true;
        if(partie.finir || (partie.chronoFin && Date.now() >= partie.chronoFin)) return fin();
        partie.i++; return question();
      case 'sauvegarder': return sauvegarder();
      case 'restaurer': return $('#fichier-sauvegarde').click();
      case 'son': base.son = !base.son; garder(); bruit('juste'); return reglages();
      case 'porter': { const j = J(); j.porte = j.porte.includes(v) ? j.porte.filter(x => x !== v) : j.porte.concat(v); garder(); return vestiaire(); }
      case 'effacer-tout':
        if(!b.dataset.ok){ b.dataset.ok = 1; b.textContent = t('confirmer'); return; }
        Object.assign(J(), { plumes:0, etoiles:{}, jours:[], porte:[], mots:{}, trophees:[], defis:[] }); garder(); return accueil();
    }
  });
  document.addEventListener('keydown', ev => { if(ev.key === 'Escape' && $('#fenetre')) fermerFenetre(); });
  document.addEventListener('click', ev => { if(ev.target.id === 'fenetre') fermerFenetre(); });
  document.addEventListener('click', ev => {
    const c = ev.target.closest('#carte'); if(!c) return;
    c.classList.toggle('retournee');
    if(c.classList.contains('retournee')) dire(partie.liste[partie.i]);
  });

  // Ami suit le doigt (ou la souris) du regard ; les cartes de thème s'inclinent.
  document.addEventListener('pointermove', ev => {
    if(sobre()) return;
    const x = (ev.clientX / innerWidth - .5) * 2, y = (ev.clientY / innerHeight - .5) * 2;
    document.documentElement.style.setProperty('--ox', (x * 2.6).toFixed(2) + 'px');
    document.documentElement.style.setProperty('--oy', (y * 2.2).toFixed(2) + 'px');
    const c = ev.target.closest && ev.target.closest('.theme');
    if(c && ev.pointerType === 'mouse'){ const r = c.getBoundingClientRect(); c.style.setProperty('--rx', (((ev.clientY - r.top) / r.height - .5) * -10).toFixed(1) + 'deg'); c.style.setProperty('--ry', (((ev.clientX - r.left) / r.width - .5) * 12).toFixed(1) + 'deg'); }
  }, { passive:true });
  document.addEventListener('pointerout', ev => { const c = ev.target.closest && ev.target.closest('.theme'); if(c){ c.style.removeProperty('--rx'); c.style.removeProperty('--ry'); } });

  // Demande au navigateur de ne pas effacer la progression quand la place manque.
  try{ if(navigator.storage && navigator.storage.persist) navigator.storage.persist(); }catch(e){}
  prefs();
  // Retour de la page de paiement (?abonne=1) : on vérifie tout de suite.
  const retourPaiement = /[?&]abonne=1/.test(location.search);
  if(retourPaiement) try{ history.replaceState(null, '', location.pathname); }catch(e){}
  // Au lancement : le certificat gardé est vérifié (hors connexion aussi), puis le serveur est consulté.
  window.AmiDesMotsPret = verifierJeton(base.abo.jeton, base.abo.code).then(d => { droits = d; if(d && !partie) accueil(); return rafraichir(retourPaiement); });
  // Le webhook Stripe peut arriver quelques secondes après le retour.
  if(retourPaiement) [5000, 15000, 40000].forEach(ms => setTimeout(() => { if(!plus()) rafraichir(true); }, ms));
  if(window.Articulation) try{ Articulation.init(); }catch(e){}
  if('serviceWorker' in navigator && location.protocol === 'https:') navigator.serviceWorker.register('sw.js').catch(() => {});
  window.AmiDesMots = { base, J, affiche, fnv1a, urlVoix, accueil, themes, choisirJeu, commencer, lettresPossibles, distincts, motsDu, aDire, CATALOGUE, MECAS, disponible, nomJeu, aRevoir, noter, jour, defi, revoir, lecon, astuces, aToi, blague, carnet, reglages, CONFIG, facile, nbMots, restaurer, verifierJeton, plus, ecranPlus, formatCode, rafraichir,
    get etat(){ return J(); } };
  garder();
  accueil();
})();
