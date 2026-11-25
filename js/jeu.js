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
    CONTACT:'',   // adresse de contact affichée aux parents (ex. contact@amidesmots.fr), réglée par outils/configurer.js
    AUDIO_BASE:'audio/',   // v6.0 : les sons sont servis par le site lui-même (outils/copier-sons.js) ; absent → voix du téléphone
    // ── Gratuit / Ami des mots Plus (abonnement mensuel) ──
    // Phase de lancement : tout l'univers est ouvert gratuitement.
    // Le système Plus est conservé dans le code mais désactivé temporairement.
    MODE_PAYANT:false,
    THEMES_GRATUITS:['animaux', 'manger', 'maison', 'ville', 'nature', 'corps', 'ecole', 'transports'],
    JEUX_GRATUITS:['decouvrir', 'ecoute', 'quel_mot', 'traduction', 'vrai_faux', 'ombre', 'devinette', 'intrus', 'panier', 'ecoute_mot', 'traduction_inverse', 'premiere_lettre', 'lettre_manquante', 'lettres', 'memoire', 'memoire_trad', 'relier', 'chrono', 'grand_quiz'],
    JOUEURS_GRATUITS:6,
    PRIX:'5,99 €',
    // Lien de paiement Stripe (abonnement mensuel). Vide : « Bientôt disponible ».
    LIEN_PAIEMENT:'',
    // Portail client Stripe (gérer / résilier l'abonnement).
    LIEN_GESTION:'',
    // Fonction serveur qui dit si un code d'abonnement est actif
    // (serveur/functions/ami-abonnement). Vide : rien n'est vérifié.
    API_ABONNEMENT:'',
    // Salon des battles en direct (Supabase Realtime) : URL du projet (https://xxxx.supabase.co) et clé PUBLIQUE
    // « anon » (jamais la clé service_role). Vides : seul le défi par lien est proposé. Voir SALON-EN-LIGNE.md.
    // Serveur PHP d'Ami des mots (serveur-php/, ex. 'https://ami-des-mots.fr/serveur/') : abonnement, salon, vannes IA,
    // programmes de maths validés. Rempli par : node outils/configurer.js --serveur <adresse>. Vide : jeu sans serveur.
    SERVEUR:'',
    SALON_URL:'',
    SALON_CLE:'',
    // Générateur de vannes (serveur/functions/ami-vannes, clé Claude côté serveur seulement).
    // Vide : pas de générateur. Réservé à Plus ; un adulte valide chaque vanne.
    API_VANNES:'',
    // On ne demande jamais un mot jamais vu : il est d'abord présenté
    // (« Nouveau mot ! » : image, mot, traduction, voix).
    PRESENTER_NOUVEAUX:true,
    // Clé PUBLIQUE (JWK, ECDSA P-256) qui vérifie les certificats signés par
    // le serveur : node outils/generer-cles.js. Sans elle, Plus ne s'ouvre pas.
    CLE_PUBLIQUE:null,
    // Coins réservés à Plus (choisis dans admin.html, rangés dans js/offre.js).
    COINS_PLUS:[]
  }, offreLue(window.OFFRE_AMI), window.CONFIG_JEU || {});
  // v5.73 : « l'essentiel pour l'instant » (js/config-site.js). Rien n'est supprimé, tout revient en mettant false.
  // VOIX_COUPEES : Plumo ne commente plus à voix haute (consignes, vannes, répliques, professeur).
  // Exception voulue (v5.74) : les jeux où il faut écouter gardent leur voix (mots enregistrés, dictée,
  // Répète après Plumo, jeu des oreilles, « qu'a dit Plumo ? ») ainsi que tous les boutons 🔊 🐢 🎤.
  const voixCoupee = () => !!CONFIG.VOIX_COUPEES;
  const jeuxEcouteCaches = () => !!CONFIG.JEUX_ECOUTE_CACHE;
  const boucheDispo = () => !!window.Articulation && !CONFIG.BOUCHE_CACHE; // « Comment la bouche fait ce mot »
  const JEUX_A_ECOUTER = ['ecoute', 'ecoute_mot'];


  // Avec le serveur PHP, l'abonnement et les vannes IA passent par lui (sauf adresse donnée à part).
  if(CONFIG.SERVEUR){ const b = String(CONFIG.SERVEUR).replace(/\/?$/, '/'); if(!CONFIG.API_ABONNEMENT) CONFIG.API_ABONNEMENT = b + 'abonnement.php'; if(!CONFIG.API_VANNES) CONFIG.API_VANNES = b + 'vannes.php'; if(!CONFIG.API_VANNES_DIRECT) CONFIG.API_VANNES_DIRECT = b + 'vannes-direct.php'; if(!CONFIG.API_VANNE_JUGE) CONFIG.API_VANNE_JUGE = b + 'vanne-juge.php'; if(!CONFIG.API_CADEAU) CONFIG.API_CADEAU = b + 'cadeau.php'; if(!CONFIG.API_MAGASIN) CONFIG.API_MAGASIN = b + 'magasin.php'; if(!CONFIG.API_VISITE) CONFIG.API_VISITE = b + 'visite.php'; if(!CONFIG.API_PLUMES) CONFIG.API_PLUMES = b + 'plumes.php'; }

  // js/offre.js (fabriqué par le coin admin) : on ne garde que les réglages connus, au bon format.
  // Il ne peut que dire ce qui est réservé à Plus, jamais ouvrir Plus.
  function offreLue(o){
    const FORMULES_CONNUES = ['mensuel', 'annuel', 'famille', 'a_vie'], PACKS_CONNUS = ['plumes_petit', 'plumes_moyen', 'plumes_grand'];
    const r = {}; if(!o || typeof o !== 'object') return r;
    const liste = x => Array.isArray(x) ? x.filter(e => typeof e === 'string' && /^[a-z0-9_-]{1,30}$/.test(e)) : null;
    if(typeof o.MODE_PAYANT === 'boolean') r.MODE_PAYANT = o.MODE_PAYANT;
    if(typeof o.PRIX === 'string' && o.PRIX.length <= 20) r.PRIX = o.PRIX;
    for(const k of ['THEMES_GRATUITS', 'JEUX_GRATUITS', 'COINS_PLUS']){ const l = liste(o[k]); if(l) r[k] = l; }
    if(Number.isInteger(o.JOUEURS_GRATUITS) && o.JOUEURS_GRATUITS >= 1 && o.JOUEURS_GRATUITS <= 6) r.JOUEURS_GRATUITS = o.JOUEURS_GRATUITS;
    // v5.85 : liens Stripe réglés dans le coin admin du serveur (seulement des adresses Stripe en https).
    for(const k of ['LIEN_PAIEMENT', 'LIEN_GESTION']) if(typeof o[k] === 'string' && (o[k] === '' || /^https:\/\/(buy|billing)\.stripe\.com\/[A-Za-z0-9_\/?=&.-]{1,200}$/.test(o[k]))) r[k] = o[k];
    // v5.94 : formules (mensuel, annuel, famille, à vie) : prix et essai affichés, lien Stripe, proposée ou non dans les stores.
    if(Array.isArray(o.FORMULES)) r.FORMULES = o.FORMULES.filter(f => f && FORMULES_CONNUES.includes(f.id)).slice(0, 4).map(f => ({ id:f.id,
      prix:typeof f.prix === 'string' ? f.prix.slice(0, 20) : '', essai:typeof f.essai === 'string' ? f.essai.slice(0, 40) : '', magasin:f.magasin === true,
      lien:typeof f.lien === 'string' && /^https:\/\/buy\.stripe\.com\/[A-Za-z0-9_\/?=&.-]{1,200}$/.test(f.lien) ? f.lien : '' }));
    // v5.99 : plumes magiques (crédits d'IA). Le solde n'est jamais lu ici : il vient du serveur (plumes.php).
    if(o.CREDITS && typeof o.CREDITS === 'object') r.CREDITS = { actif:o.CREDITS.actif === true, quota_plus:Number.isInteger(o.CREDITS.quota_plus) && o.CREDITS.quota_plus >= 0 ? o.CREDITS.quota_plus : 0,
      packs:(Array.isArray(o.CREDITS.packs) ? o.CREDITS.packs : []).filter(x => x && PACKS_CONNUS.includes(x.id) && Number.isInteger(x.plumes) && x.plumes > 0).slice(0, 3).map(x => ({ id:x.id, plumes:x.plumes,
        prix:typeof x.prix === 'string' ? x.prix.slice(0, 20) : '', magasin:x.magasin === true,
        lien:typeof x.lien === 'string' && /^https:\/\/buy\.stripe\.com\/[A-Za-z0-9_\/?=&.-]{1,200}$/.test(x.lien) ? x.lien : '' })) };
    return r;
  }

  // v6.0 : les nouveautés vivent dans des modules séparés (js/mod-*.js) pour ne plus grossir ce fichier.
  // Un module ajoute des actions (data-a), des cartes dans les écrans, et écoute les réponses ; il passe par AMI_MODULES.api.
  const MODULES = window.AMI_MODULES = Object.assign({ actions:{}, hooks:{ reponse:[], question:[] }, cartes:{ battle:[], matiere:[], parents:[], anglais:[], accueil:[], plus:[] } }, window.AMI_MODULES || {});
  if(!MODULES.cartes.plus) MODULES.cartes.plus = [];
  if(!MODULES.hooks.question) MODULES.hooks.question = [];
  const cartesModules = zone => (MODULES.cartes[zone] || []).map(f => { try{ return f(base.ui) || ''; }catch(e){ return ''; } }).join('');
  // v5.99.3 : textes des écrans dans la langue de l'interface (js/textes-ecrans.js) ; le français reste le français.
  function TXT(fr){ let l = 'fr'; try{ l = base.ui; }catch(e){} return window.L ? window.L(fr, l) : fr; }
  const UI = Object.keys(window.TEXTES);
  // Langues visibles pendant la phase de lancement des voix dédiées.
  // Les autres langues et leurs contenus restent intégralement dans donnees.js.
  // v5.99.2 : seules les langues enseignées à l'école sont proposées. Les autres langues restent dans les données
  // (et restent choisies si elles l'étaient déjà), elles ne sont simplement plus affichées dans les listes.
  const SCOLAIRES = ['en', 'es', 'de', 'it', 'pt'];   // v5.99.3 : l'arabe est retiré des listes pour l'instant (gardé dans les données)
  const PARLE_VISIBLES = ['fr'].concat(SCOLAIRES);
  const APPRENDRE = SCOLAIRES.concat('fr');   // le français reste à apprendre pour les élèves qui parlent une autre langue
  const apprendreVisibles = () => APPRENDRE.filter(l => l !== base.ui);
  const parleVisibles = () => PARLE_VISIBLES.concat(UI.includes(base.ui) && !PARLE_VISIBLES.includes(base.ui) ? [base.ui] : []);
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
    base.cible = base.ui === 'en' ? 'fr' : 'en';
  }
  if(base.cible === base.ui) base.cible = base.ui === 'en' ? 'fr' : 'en';
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

  // ── v5.85 : l'offre réglée dans le coin admin du serveur (serveur-php/offre.php) ──
  // Elle n'est appliquée que si sa signature est valide (clé publique du jeu) : personne ne peut la fabriquer
  // dans le navigateur. Elle passe avant js/offre.js et config-site.js. Elle ne donne jamais Plus à personne :
  // Plus reste réservé au certificat signé de l'abonnement. Une copie signée est gardée pour le hors-ligne.
  const CLE_OFFRE = 'amidesmots:offre';
  async function verifierOffre(texte, sig){
    try{
      if(typeof texte !== 'string' || typeof sig !== 'string' || texte.length > 20000 || !CONFIG.CLE_PUBLIQUE || !(window.crypto && crypto.subtle)) return null;
      const cle = await crypto.subtle.importKey('jwk', CONFIG.CLE_PUBLIQUE, { name:'ECDSA', namedCurve:'P-256' }, false, ['verify']);
      if(!await crypto.subtle.verify({ name:'ECDSA', hash:'SHA-256' }, cle, b64u(sig), new TextEncoder().encode('offre|' + texte))) return null;
      const o = offreLue(JSON.parse(texte));
      return Object.keys(o).length ? o : null;
    }catch(e){ return null; }
  }
  // Applique une offre signée ; dit si le jeu doit se redessiner (payant allumé / éteint).
  async function appliquerOffre(texte, sig){
    const o = await verifierOffre(texte, sig); if(!o) return false;
    const avant = CONFIG.MODE_PAYANT; Object.assign(CONFIG, o);
    try{ localStorage.setItem(CLE_OFFRE, JSON.stringify({ offre:texte, sig })); }catch(e){}
    if(CONFIG.MODE_PAYANT && !avant){ droits = await verifierJeton(base.abo.jeton, base.abo.code); await rafraichir(true); }
    return true;
  }
  async function offreGardee(){
    try{ const g = JSON.parse(localStorage.getItem(CLE_OFFRE) || 'null'); if(g) return await appliquerOffre(g.offre, g.sig); }catch(e){}
    return false;
  }
  async function offreServeur(){
    if(!CONFIG.SERVEUR || !CONFIG.CLE_PUBLIQUE) return false;
    try{
      const r = await fetch(String(CONFIG.SERVEUR).replace(/\/?$/, '/') + 'offre.php', { cache:'no-cache' });
      if(!r.ok) return false;
      const d = await r.json();
      return d && d.offre ? await appliquerOffre(d.offre, d.sig) : false;
    }catch(e){ return false; }
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
  // Coins (pièges, rap, salon, village 3D…) : chaque coin peut être gratuit ou Plus (coin admin).
  // Chaque action d'entrée mène à son coin ; les actions internes passent par l'entrée.
  const COINS = {
    pieges:['pieges', 'pieges-go'], situations:['situations', 'situation-go'], histoires:['histoires', 'histoire-go'],
    dictee:['dictee'], parcours:['parcours'], phrases:['phrases'], battle:['battle', 'battle-go', 'clash-libre', 'clash-libre-go', 'clash-libre-carte', 'clash-libre-melange', 'clash-libre-ecrire', 'clash-libre-envoyer', 'clash-libre-reaction', 'clash-libre-suite', 'clash-libre-paquet', 'clash-libre-ajouter', 'clash-libre-retirer', 'clash-libre-garder'], rap:['rap'],
    tournoi:['tournoi', 'tournoi-go', 'tournoi-go-memes', 'potes', 'potes-go', 'potes-joue', 'potes-revanche', 'potes-trash'], 'defi-pote':['defi-pote', 'defi-pote-go'],
    salon:['salon', 'salon-creer', 'salon-rejoindre', 'salon-public', 'salon-entrer-public'],
    trompe:['trompe'], oreilles:['oreilles'], vraifaux:['vraifaux'], avent:['avent'], betisier:['betisier'], maison:['maison'],
    maths:['maths', 'maths-chap', 'maths-melange', 'maths-examen', 'maths-defi'], sciences:['sciences', 'sciences-theme', 'matieres', 'matiere', 'matiere-niveau', 'matiere-chap', 'matiere-melange', 'matiere-examen', 'examens', 'examen-go', 'examen-suite', 'annales', 'annale-go', 'annale-suite', 'bac-tle', 'bac-tle-spe', 'bac-tle-go', 'officiel'],
    village3d:['accueil-3d'], motscity:[]
  };
  const COIN_DE = {}; for(const c in COINS) for(const a of COINS[c]) COIN_DE[a] = c;
  const retourCoin = c => ['rap', 'tournoi', 'defi-pote', 'salon'].includes(c) && coinOuvert('battle') ? 'battle' : ['village3d', 'motscity'].includes(c) ? 'accueil' : 'anglais';
  const coinOuvert = c => plus() || !CONFIG.MODE_PAYANT || !CONFIG.COINS_PLUS.includes(c);
  // Après chaque écran : les boutons et liens d'un coin Plus portent le badge ✨.
  function marquerCoins(r){
    if(!CONFIG.MODE_PAYANT || plus() || !CONFIG.COINS_PLUS.length) return;
    r.querySelectorAll('[data-a]').forEach(b => { const c = COIN_DE[b.dataset.a]; if(c && !coinOuvert(c) && !b.querySelector('.badge-plus')){ b.classList.add('verrou'); b.insertAdjacentHTML('beforeend', ' <span class="badge-plus">✨ ' + esc(t('plus_badge')) + '</span>'); } });
    r.querySelectorAll('a[href="mots-city.html"]').forEach(a => { if(!coinOuvert('motscity')){ a.classList.add('verrou'); a.setAttribute('href', '#plus'); a.dataset.a = 'plus'; a.insertAdjacentHTML('beforeend', ' <span class="badge-plus">✨ ' + esc(t('plus_badge')) + '</span>'); } });
  }
  // Nombre de mots réellement disponibles dans une langue (affiché dans le choix).
  const nbMots = lang => distincts(Object.keys(MOTS).filter(e => MOTS[e][lang]), lang).length;
  const motsDu = (theme, lang) => Object.keys(MOTS).filter(e => MOTS[e].theme === theme && MOTS[e][lang]);
  const motsOuverts = lang => Object.keys(MOTS).filter(e => MOTS[e][lang] && ouvert(MOTS[e].theme));
  function distincts(liste, lang){
    const vu = new Set();
    return liste.filter(e => { const m = affiche(lang, MOTS[e][lang]).toLowerCase(); if(vu.has(m)) return false; vu.add(m); return true; });
  }
  const image = (e, cls) => '<img class="' + (cls || 'pic') + '" src="img/pictos/' + MOTS[e].img + '.webp" alt="" draggable="false">';

  // Si une image ne se charge pas (fichier absent ou cache incomplet),
  // garder une réponse visible et jouable plutôt qu'une pastille vide.
  document.addEventListener('error', ev => {
    const img = ev.target;
    if(!img || !img.matches || !img.matches('.choix-img img')) return;
    const bouton = img.closest('.choix-img');
    if(!bouton || bouton.querySelector('.picto-secours')) return;
    img.hidden = true;
    const secours = document.createElement('span');
    secours.className = 'picto-secours';
    secours.setAttribute('aria-hidden', 'true');
    secours.textContent = bouton.dataset.v || '🦉';
    bouton.appendChild(secours);
  }, true);

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
    noterAdaptatif(k, juste);
  }
  // V6 : le moteur adaptatif complète les boîtes de révision historiques.
  // Données isolées par joueur, sans réseau et sans modifier les anciennes fiches.
  function cartesAdaptatives(){
    const profil = J();
    if(!profil.apprentissage || typeof profil.apprentissage !== 'object') profil.apprentissage = { version:1, cartes:{} };
    if(!profil.apprentissage.cartes || typeof profil.apprentissage.cartes !== 'object') profil.apprentissage.cartes = {};
    return profil.apprentissage.cartes;
  }
  function noterAdaptatif(id, juste){
    const A = window.AMI_APPRENTISSAGE;
    if(!A || typeof A.noter !== 'function') return;
    try{
      const cartes = cartesAdaptatives(), ancienne = cartes[id] || A.nouvelleCarte(id);
      cartes[id] = A.noter(ancienne, juste ? 2 : 0, Date.now());
    }catch(e){ /* une fiche invalide ne doit jamais interrompre une partie */ }
  }
  function bilanAdaptatif(){
    const A = window.AMI_APPRENTISSAGE;
    if(!A) return { total:0, aRevoir:0, maitrisees:0, erreurs:0 };
    const cartes = Object.values(cartesAdaptatives());
    return A.resume(cartes, Date.now());
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
  // v5.64 : on classe les voix du téléphone / PC. Les voix « Natural / Online » (Edge), « Google », « Premium /
  // Enhanced » (iPhone, Mac) passent devant ; les vieilles voix robot (eSpeak, Hortense, Zira…) en dernier.
  // Le joueur peut aussi choisir sa voix dans les réglages (gardé sur cet appareil seulement).
  function noteVoix(v, loc){
    const n = (v.name || '') + ' ' + (v.voiceURI || ''), l = (v.lang || '').replace('_', '-').toLowerCase();
    let p = 0;
    if(/natural|online|neural|wavenet|studio/i.test(n)) p += 100;
    if(/premium|enhanced|améliorée|amelioree|siri/i.test(n)) p += 80;
    if(/google/i.test(n)) p += 60;
    if(v.localService === false) p += 10;
    if(l === String(loc || '').toLowerCase()) p += 20;
    if(/espeak|compact|hortense|julie|paul|zira|david|mark|hazel|george|susan|pico|robot|novelty|bad news|bells|boing|bubbles|cellos|whisper|zarvox|trinoids|albert|jester|organ|superstar|wobble/i.test(n)) p -= 60;
    return p;
  }
  function voixClassees(lang){
    const loc = LOCALES[lang]; if(!loc || !window.speechSynthesis || !speechSynthesis.getVoices) return [];
    const code = loc.slice(0, 2).toLowerCase();
    return speechSynthesis.getVoices().filter(v => v.lang && v.lang.replace('_', '-').toLowerCase().startsWith(code))
      .map(v => ({ v, p:noteVoix(v, loc) })).sort((a, b) => b.p - a.p).map(x => x.v);
  }
  function sansEmojis(t){
    return String(t || '').replace(/[\p{Extended_Pictographic}\u{1F1E6}-\u{1F1FF}\u{1F3FB}-\u{1F3FF}\uFE0F\u200D\u20E3]/gu, '')
      .replace(/[«»"“”]/g, '').replace(/\s+([!?.,;:])/g, '$1').replace(/([!?])(\s*[!?])+/g, '$1').replace(/\s{2,}/g, ' ').trim();
  }
  function voixPreferees(){ try{ return JSON.parse(localStorage.getItem('ami-voix') || '{}') || {}; }catch(e){ return {}; } }
  function voixNavigateur(lang, texte, vitesse){
    const loc = LOCALES[lang];
    if(!loc || !window.speechSynthesis) return false;
    // v5.65 : la voix ne lit jamais les émojis (« visage qui pleure de rire »…) ni les drapeaux.
    texte = sansEmojis(texte);
    if(!texte) return true;
    const toutes = speechSynthesis.getVoices();
    const voix = voixClassees(lang), choisie = voixPreferees()[lang];
    const u = new SpeechSynthesisUtterance(texte);
    u.lang = loc; u.rate = vitesse || .95;
    // La voix choisie dans les réglages, sinon la mieux notée ; si Android n'a pas encore
    // chargé sa liste, garder la voix système plutôt que de ne rien dire.
    const v = (choisie && voix.find(x => x.name === choisie)) || voix[0] || toutes.find(x => x.default) || toutes[0];
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
  function lireConsigne(texte){ if(voixCoupee()) return; if(texte && !voixNavigateur(base.ui, texte)) silence(); }
  // Une phrase (vanne + correction) n'a pas d'enregistrement : on ne la demande
  // pas au serveur des voix, on la lit avec la voix du téléphone, sans chevauchement.
  // direPhrase : Plumo qui commente (coupé si VOIX_COUPEES) ; direEcoute : ce qu'il faut écouter (toujours là).
  function direPhrase(texte, langue, vitesse){
    if(voixCoupee()) return;
    direEcoute(texte, langue, vitesse);
  }
  function direEcoute(texte, langue, vitesse){
    // v5.75 : une phrase qui a un vrai enregistrement (js/phrases-enregistrees.js) est jouée en MP3.
    const PE = window.PHRASES_ENREGISTREES;
    if(texte && PE && Array.isArray(PE[langue]) && PE[langue].includes(fnv1a(String(texte).trim()))){
      window.speak(String(texte).trim(), langue); if(vitesse && vitesse < .9 && lecteur) try{ lecteur.playbackRate = .7; }catch(e){} return;
    }
    try{ if(lecteur){ lecteur.pause(); lecteur = null; } }catch(e){}
    if(texte && !voixNavigateur(langue, texte, vitesse)) silence();
  }
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
      if(sorte === 'boing'){ // petit « boing » comique avant une vanne
        const o = ctx.createOscillator(), g = ctx.createGain(), t0 = ctx.currentTime;
        o.type = 'sine'; o.frequency.setValueAtTime(180, t0); o.frequency.exponentialRampToValueAtTime(720, t0 + .12); o.frequency.exponentialRampToValueAtTime(260, t0 + .3);
        g.gain.setValueAtTime(.0001, t0); g.gain.exponentialRampToValueAtTime(.09, t0 + .03); g.gain.exponentialRampToValueAtTime(.0001, t0 + .34);
        o.connect(g); g.connect(ctx.destination); o.start(t0); o.stop(t0 + .36); return;
      }
      const notes = { juste:[[660, 0], [880, .09]], faux:[[220, 0]], fin:[[523, 0], [659, .12], [784, .24], [1047, .36]], tuile:[[500, 0]] }[sorte] || [];
      notes.forEach(([f, d]) => {
        const o = ctx.createOscillator(), g = ctx.createGain(), t0 = ctx.currentTime + d;
        o.type = sorte === 'faux' ? 'triangle' : 'sine'; o.frequency.value = f;
        g.gain.setValueAtTime(.0001, t0); g.gain.exponentialRampToValueAtTime(sorte === 'tuile' ? .05 : .12, t0 + .02); g.gain.exponentialRampToValueAtTime(.0001, t0 + (sorte === 'faux' ? .28 : .2));
        o.connect(g); g.connect(ctx.destination); o.start(t0); o.stop(t0 + .3);
      });
    }catch(e){}
  }

  // ── Plumo ───────────────────────────────────────────────────────────
  // Les visages de Plumo : content, fete, surpris, vexe, mdr, choque, fier, boude, malin, dort.
  function visage(h, yeux, c1, immobile){
    const pup = (dx, ry) => '<g class="pupilles"><ellipse cx="' + (37 + dx) + '" cy="45" rx="6.5" ry="' + ry + '" fill="#1d2521"/><ellipse cx="' + (63 + dx) + '" cy="45" rx="6.5" ry="' + ry + '" fill="#1d2521"/><circle cx="' + (40 + dx) + '" cy="41.5" r="2.6" fill="#fff"/><circle cx="' + (66 + dx) + '" cy="41.5" r="2.6" fill="#fff"/></g>';
    const paup = immobile ? '' : '<g class="paupieres" fill="' + c1 + '"><ellipse cx="37" cy="44" rx="12" ry="12"/><ellipse cx="63" cy="44" rx="12" ry="12"/></g>';
    const demi = '<g fill="' + c1 + '"><path d="M25.5 45 A11.5 11.5 0 0 1 48.5 45 Z"/><path d="M51.5 45 A11.5 11.5 0 0 1 74.5 45 Z"/></g>';
    const trait = d => '<path d="' + d + '" fill="none" stroke="#5b3a1e" stroke-width="3" stroke-linecap="round"/>';
    switch(h){
      case 'mdr': return '<path d="M28 47 Q37 36 46 47 M54 47 Q63 36 72 47" fill="none" stroke="#1d2521" stroke-width="3.2" stroke-linecap="round"/><path d="M24 52 q-3 6 0 9 q3 -3 0 -9 Z M76 52 q-3 6 0 9 q3 -3 0 -9 Z" fill="#6ec6ff"/>';
      case 'dort': return '<path d="M28 45 Q37 51 46 45 M54 45 Q63 51 72 45" fill="none" stroke="#1d2521" stroke-width="3" stroke-linecap="round"/><text x="76" y="22" font-size="13" font-weight="700" fill="#6b6bd6">z</text><text x="85" y="11" font-size="9" font-weight="700" fill="#6b6bd6">z</text>';
      case 'malin': return '<ellipse cx="37" cy="45" rx="6.5" ry="6.5" fill="#1d2521"/><circle cx="40" cy="41.5" r="2.6" fill="#fff"/><path d="M54 46 Q63 39 72 46" fill="none" stroke="#1d2521" stroke-width="3.2" stroke-linecap="round"/>' + trait('M27 31 L46 28') + trait('M54 32 L73 34');
      case 'choque': return '<circle cx="37" cy="44" r="3.2" fill="#1d2521"/><circle cx="63" cy="44" r="3.2" fill="#1d2521"/>' + trait('M26 27 Q37 18 48 27 M52 27 Q63 18 74 27');
      case 'vexe': return pup(0, 6.5) + demi + trait('M26 30 L46 36 M74 30 L54 36') + '<path d="M80 16 l5 5 m0 -5 l-5 5" stroke="#e03131" stroke-width="2.4" stroke-linecap="round"/>';
      case 'boude': return pup(4, 6) + demi + trait('M27 33 L46 33 M54 33 L73 33') + '<text x="78" y="26" font-size="12" fill="#6b6b6b">…</text>';
      case 'fier': return pup(0, 6) + demi + trait('M27 29 Q37 23 47 29 M53 29 Q63 23 73 29') + '<text x="79" y="22" font-size="12">✨</text>';
      default: return pup(0, yeux) + paup;
    }
  }
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
    for(const [k, x] of Object.entries(accModules())) if(x.plat) acc[k] = x.plat;   // v6.0 : tenues de saison
    const dessus = porte.filter(k => acc[k] && k !== 'echarpe' && k !== 'noeud').map(k => acc[k]).join('');
    const cou = porte.filter(k => k === 'echarpe' || k === 'noeud').map(k => acc[k]).join('');
    const bouge = sobre() || opts.immobile ? '' : ' ami-bouge';
    const svg = '<svg class="companion-svg ami' + bouge + (humeur === 'fete' ? ' ami-fete' : '') + '" viewBox="0 -6 100 126" aria-hidden="true" focusable="false">' +
      '<defs><radialGradient id="' + id + '" cx="40%" cy="30%" r="80%"><stop offset="0%" stop-color="' + c2 + '"/><stop offset="55%" stop-color="' + c1 + '"/><stop offset="100%" stop-color="' + c3 + '"/></radialGradient></defs>' +
      '<path d="M42 97 l-5 8 M42 97 l0 9 M42 97 l5 8 M58 97 l-5 8 M58 97 l0 9 M58 97 l5 8" fill="none" stroke="#E8973A" stroke-width="2.6" stroke-linecap="round"/>' +
      ailes +
      '<path fill="' + c3 + '" d="M 40 20 L 33 3 L 52 16 Z"/><path fill="' + c3 + '" d="M 60 20 L 67 3 L 48 16 Z"/>' +
      '<path fill="url(#' + id + ')" d="M50 14 C27 14 19 35 19 59 C19 85 34 101 50 101 C66 101 81 85 81 59 C81 35 73 14 50 14 Z"/>' +
      '<ellipse cx="50" cy="70" rx="19" ry="22" fill="#F6EAD2" opacity=".92"/>' +
      '<circle cx="37" cy="44" r="17" fill="#F6EAD2" stroke="#C9A878" stroke-width="1.2"/><circle cx="63" cy="44" r="17" fill="#F6EAD2" stroke="#C9A878" stroke-width="1.2"/>' +
      '<circle cx="37" cy="44" r="11.5" fill="#fff"/><circle cx="63" cy="44" r="11.5" fill="#fff"/>' +
      visage(humeur, yeux, c1, opts.immobile) +
      cou +
      (['mdr', 'choque'].includes(humeur) ? '<path class="companion-beak" fill="#E8973A" d="M 50 50 L 43 55 Q 50 70 57 55 Z"/><path d="M45.5 57 Q50 64 54.5 57 Z" fill="#7a2d12"/>' : '<path class="companion-beak" fill="#E8973A" d="M 50 50 L 45 55 Q 50 63 55 55 Z"/>') +
      dessus +
      '</svg>';
    if(opts.immobile) return svg;
    // v5.93 : toujours le Plumo en 3D ; les accessoires du vestiaire sont posés par-dessus l'image.
    const CADRES = { echarpe:'0 0 560 613', noeud:'38 82 24 16', lunettes:'0 0 560 613', chapeau:'27 -5 46 25', couronne:'32 -5 36 23' };
    for(const [k, x] of Object.entries(accModules())) if(x.cadre) CADRES[k] = x.cadre;
    // v5.96 : lunettes dessinées sur l'image 3D elle-même (mêmes coordonnées que img/ami-3d-560.webp) :
    // chaque verre est centré sur un œil, inclinées comme la tête, l'œil de droite plus petit (vu de trois quarts).
    const ACC_3D = {
      chapeau:'<defs><linearGradient id="chap3d" x1="0" x2="1"><stop offset="0" stop-color="#1b1b1f"/><stop offset=".35" stop-color="#4a4a52"/><stop offset=".6" stop-color="#2a2a30"/><stop offset="1" stop-color="#111114"/></linearGradient><linearGradient id="bord3d" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#55555e"/><stop offset="1" stop-color="#151518"/></linearGradient><linearGradient id="ruban3d" x1="0" x2="1"><stop offset="0" stop-color="#9e2b27"/><stop offset=".4" stop-color="#e8605a"/><stop offset="1" stop-color="#8a2420"/></linearGradient></defs>' +
        '<path d="M36 15 L38 -3 Q50 -5.5 62 -3 L64 15 Z" fill="url(#chap3d)"/><ellipse cx="50" cy="-3" rx="12" ry="2" fill="#3c3c44"/>' +
        '<path d="M37.6 9 Q50 11 62.4 9 L62.8 12.6 Q50 14.6 37.2 12.6 Z" fill="url(#ruban3d)"/>' +
        '<ellipse cx="50" cy="15.5" rx="22" ry="4.6" fill="url(#bord3d)"/><path d="M30 14.5 Q50 11.5 70 14.5" stroke="rgba(255,255,255,.25)" stroke-width=".8" fill="none"/>' +
        '<path d="M41 -1 L42.5 12" stroke="rgba(255,255,255,.22)" stroke-width="1.6" stroke-linecap="round"/>',
      couronne:'<defs><linearGradient id="or3d" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#fff2a8"/><stop offset=".35" stop-color="#f2c230"/><stop offset=".7" stop-color="#c9900f"/><stop offset="1" stop-color="#8a5f05"/></linearGradient><radialGradient id="rubis3d" cx=".35" cy=".35" r=".7"><stop offset="0" stop-color="#ffb3ae"/><stop offset=".45" stop-color="#d9342b"/><stop offset="1" stop-color="#7a1410"/></radialGradient></defs>' +
        '<path d="M34 16 L36 0 L43 9 L50 -3 L57 9 L64 0 L66 16 Z" fill="url(#or3d)" stroke="#9c6e08" stroke-width=".8" stroke-linejoin="round"/>' +
        '<path d="M34.6 12.5 Q50 15 65.4 12.5" stroke="#9c6e08" stroke-width=".8" fill="none"/>' +
        '<circle cx="36" cy="0" r="1.5" fill="url(#or3d)"/><circle cx="50" cy="-3" r="1.7" fill="url(#or3d)"/><circle cx="64" cy="0" r="1.5" fill="url(#or3d)"/>' +
        '<circle cx="50" cy="8.5" r="2.4" fill="url(#rubis3d)"/><circle cx="42" cy="12" r="1.3" fill="#3f8fe0"/><circle cx="58" cy="12" r="1.3" fill="#3f8fe0"/>' +
        '<path d="M37.5 3 L38.5 13" stroke="rgba(255,255,255,.55)" stroke-width="1" stroke-linecap="round"/>',
      echarpe:'<g class="echarpe-3d"><defs><linearGradient id="ech3d" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ff7b72"/><stop offset=".55" stop-color="#e0413c"/><stop offset="1" stop-color="#a92526"/></linearGradient></defs>' +
      '<path d="M168 278 Q270 330 392 262 L398 296 Q272 372 166 312 Z" fill="url(#ech3d)" stroke="#8d1f1f" stroke-width="3"/>' +
      '<path d="M180 290 Q270 336 384 276" fill="none" stroke="rgba(255,255,255,.28)" stroke-width="4"/>' +
      '<path d="M300 322 Q312 368 296 418 L330 422 Q344 370 330 318 Z" fill="url(#ech3d)" stroke="#8d1f1f" stroke-width="3"/>' +
      '<path d="M298 410 l4 16 M308 412 l2 16 M318 413 l1 16 M327 414 l0 15" stroke="#a92526" stroke-width="4" stroke-linecap="round"/></g>',
      lunettes:'<g class="lunettes-3d">' +
      '<path d="M190 207 Q160 196 132 203" fill="none" stroke="#2b1d14" stroke-width="7" stroke-linecap="round"/>' +
      '<ellipse cx="238" cy="206" rx="55" ry="51" fill="rgba(200,235,255,.16)" stroke="#2b1d14" stroke-width="8" transform="rotate(-17 238 206)"/>' +
      '<ellipse cx="346" cy="173" rx="44" ry="45" fill="rgba(200,235,255,.16)" stroke="#2b1d14" stroke-width="7" transform="rotate(-17 346 173)"/>' +
      '<path d="M290 190 Q296 172 303 176" fill="none" stroke="#2b1d14" stroke-width="7" stroke-linecap="round"/>' +
      '<path d="M205 180 Q220 168 238 168" fill="none" stroke="rgba(255,255,255,.7)" stroke-width="5" stroke-linecap="round"/>' +
      '<path d="M325 146 Q338 138 351 139" fill="none" stroke="rgba(255,255,255,.65)" stroke-width="4" stroke-linecap="round"/></g>' };
    const calques = porte.filter(k => acc[k] && CADRES[k]).map(k => '<svg class="ami-acc ami-acc-' + k + '" viewBox="' + CADRES[k] + '" aria-hidden="true" focusable="false">' + (ACC_3D[k] || acc[k]) + '</svg>').join('');
    const humeurClasse = humeur === 'fete' ? ' ami-3d-fete' : humeur === 'surpris' ? ' ami-3d-surpris' : humeur === 'triste' ? ' ami-3d-triste' : '';
    return '<span class="ami-3d-wrap' + humeurClasse + '" aria-hidden="true"><span class="ami-3d-corps"><img class="ami-3d" src="img/ami-3d-560.webp" alt="" decoding="async">' + calques + '</span></span>';
  }
  // ── Écrans ────────────────────────────────────────────────────────
  // Couleur de chaque thème (cartes, barre de progression, accents).
  const COUL_THEME = { animaux:'#FF8A3D', manger:'#FF5D6C', maison:'#4D7CFE', habits:'#F06BB1', nature:'#25B26A', ville:'#7A5CFA', musique:'#B04CF0', atelier:'#0FAFBF' };
  const couleurDe = th => COUL_THEME[th] || '#7A5CFA';
  function poser(html, ecran){
    if(typeof fermerFenetre === 'function') fermerFenetre();
    const r = $('#app');
    r.innerHTML = html;
    // v5.75 : l'émoji au début d'un titre en dégradé devenait un carré blanc ; on le sort du dégradé.
    try{ r.querySelectorAll('h2').forEach(h => { const n = h.firstChild; if(!n || n.nodeType !== 3) return; const m = n.data.match(/^\s*((?:\p{Extended_Pictographic}|\p{Regional_Indicator})[\uFE0F\u200D\p{Extended_Pictographic}\p{Regional_Indicator}]*)\s*/u);
      if(!m) return; const sp = document.createElement('span'); sp.className = 'emoji-titre'; sp.setAttribute('aria-hidden', 'true'); sp.textContent = m[1]; n.data = ' ' + n.data.slice(m[0].length); h.insertBefore(sp, n); }); }catch(e){}
    r.dataset.ecran = ecran || '';
    r.classList.remove('entree'); if(!sobre()){ void r.offsetWidth; r.classList.add('entree'); }
    document.documentElement.lang = base.ui;
    document.documentElement.dir = RTL.includes(base.ui) ? 'rtl' : 'ltr';
    if(facile()) document.documentElement.dataset.facile = '1'; else delete document.documentElement.dataset.facile;
    marquerCoins(r);
    window.scrollTo(0, 0);
    const f = r.querySelector('h1, h2'); if(f){ f.setAttribute('tabindex', '-1'); f.focus({ preventScroll:true }); }
  }
  const barre = (retour) => '<header class="barre">' +
    (retour ? '<button class="bouton-rond" data-a="' + retour + '" aria-label="' + esc(t('retour')) + '">' + (RTL.includes(base.ui) ? '→' : '←') + '</button>' : '<span></span>') +
    '<span class="compteur" aria-label="' + esc(J().plumes + ' ' + t('plumes')) + '">🪶 ' + J().plumes + '</span></header>';

  // v5.95 : rappels (appli seulement) et « série en danger ».
  function appliquerTexte(){ const t = base.texte; if(t === 'grand' || t === 'tres-grand') document.documentElement.dataset.texte = t; else delete document.documentElement.dataset.texte; }
  function majRappels(){
    if(!window.RAPPELS || !RAPPELS.dispo()) return Promise.resolve({ ok:false, raison:'web' });
    return RAPPELS.planifier(base.rappel, { serie:serie(), joueAujourdhui:J().jours.includes(jour()) },
      { titre:tt('notif_titre'), corps:tt('notif_corps'), dangerTitre:tt('danger_titre'), dangerCorps:tt('danger_corps') }).catch(() => ({ ok:false }));
  }
  function reglageRappels(){
    if(!window.RAPPELS || !RAPPELS.dispo()) return '';
    const r = base.rappel || {}, h = r.heure == null ? 18 : r.heure;
    return '<section class="reglage-rappels"><h3>' + esc(tt('rappel_titre')) + '</h3><p class="petit">' + esc(tt('rappel_aide')) + '</p>' +
      '<div class="reglage"><span>' + esc(tt('rappel_titre').replace(/^\S+\s/, '')) + '</span><button class="moyen' + (r.actif ? ' plein' : '') + '" data-a="rappel" aria-pressed="' + !!r.actif + '">' + esc(tt(r.actif ? 'oui' : 'non')) + '</button></div>' +
      (r.actif ? '<p><label>' + esc(tt('rappel_heure')) + ' <select id="rappel-heure">' + [7, 8, 12, 16, 17, 18, 19, 20].map(x => '<option value="' + x + '"' + (x === h ? ' selected' : '') + '>' + x + ':00</option>').join('') + '</select></label></p>' : '') +
      '<p id="etat-rappel" class="petit" role="status"></p></section>';
  }
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

  // Les 4 portes de l'accueil simplifié.
  function portesAccueil(){
    const en = base.ui === 'en', porte = (a, ic, titre, sous, cls) => '<button class="porte ' + cls + '" data-a="' + a + '"><span class="porte-ic" aria-hidden="true">' + ic + '</span><strong>' + titre + '</strong><small>' + sous + '</small></button>';
    return '<div class="portes">' +
      porte('porte-mots', '🗣️', esc(progTx('porteLangues')) + ' · ' + esc(LANGUES_APPRENDRE[base.cible] || ''), esc(progTx('porteLanguesSous')), 'porte-mots') +
      (window.MATHS ? porte('maths', '🔢', TXT('Maths'), en ? 'Year 6 to final exam · Prof Pi teases' : TXT('De la 6e au bac · Prof Pi te vanne'), 'porte-maths') : '') +
      (window.MATIERES ? porte('matieres', '📚', en ? 'Subjects' : TXT('Matières'), en ? 'French, history, biology, physics, exams' : TXT('Français, histoire-géo, SVT, physique, brevet & bac'), 'porte-sciences')
        : window.SCIENCES ? porte('sciences', '🚀', TXT('Sciences'), en ? 'Planets, rockets, human body' : TXT('Planètes, fusées, corps humain'), 'porte-sciences') : '') +
      // v6.22 : le professeur IA (anglais ET maths) a sa propre porte : on ne le découvrait qu'en ouvrant « Mots & anglais ».
      '<a class="porte porte-prof" href="professeur.html"><span class="porte-ic" aria-hidden="true">🧑‍🏫</span><strong>' + esc(progTx('profIA')) + '</strong><small>' + esc(progTx('profIASous')) + '</small></a>' +
      (window.MATHS || A_EN() ? porte('potes', '⚔️', 'Battle', en ? 'With friends: maths, English, comebacks' : 'Entre potes : maths, anglais, vannes', 'porte-battle') : '') +
      '</div>';
  }
  // Derrière la porte « Mots & anglais » : tout ce qui était sur l'accueil, rien n'est supprimé.
  function porteMots(){
    const en = base.ui === 'en', rev = aRevoir().length, c = (a, ic, t1, t2, href) => href
      ? '<a class="carte-anglais" href="' + href + '"><span class="ic">' + ic + '</span><strong>' + t1 + '</strong><small>' + t2 + '</small></a>'
      : '<button class="carte-anglais" data-a="' + a + '"><span class="ic">' + ic + '</span><strong>' + t1 + '</strong><small>' + t2 + '</small></button>';
    const optsCible = apprendreVisibles().map(l => '<option value="' + l + '"' + (l === base.cible ? ' selected' : '') + '>' + esc(LANGUES_APPRENDRE[l]) + '</option>').join('');
    setTimeout(() => { const sel = document.getElementById('cible'); if(sel) sel.addEventListener('change', ev => { base.cible = ev.target.value; garder(); prefs(); porteMots(); }); });
    poser(barre('accueil') + '<main class="coin-anglais porte-mots-ecran"><h2><span class="emoji-titre" aria-hidden="true">🗣️</span> ' + esc(progTx('porteLangues')) + '</h2>' +
      '<p class="choix-langue-apprise"><label>' + esc(progTx('langueApprise')) + ' <select id="cible">' + optsCible + '</select></label></p><div class="cartes-anglais">' +
      c('lecon', '📚', esc(t('apprendre')), en ? '5 new words with pictures' : TXT('5 nouveaux mots en images')) +
      c('themes', '▶️', esc(t('jouer')), en ? 'All the word games' : TXT('Tous les jeux de mots')) +
      c('revoir', '🔁', esc(t('revoir')) + (rev ? ' (' + rev + ')' : ''), en ? 'Words to practise again' : TXT('Les mots à retravailler')) +
      c('phrases', '💬', en ? 'Sentence workshop' : TXT('Atelier des phrases'), en ? 'Build your first sentences' : TXT('Construis tes premières phrases')) +
      (piegesDispo() ? c(A_EN() ? 'anglais' : 'pieges', '🪤', 'Le coin anglais', en ? 'Traps, situations, dictation, battles' : TXT('Pièges, situations, dictée, battles')) : '') +
      c('', '🧑‍🏫', en ? 'AI teacher' : TXT('Le professeur'), en ? 'Lessons that adapt to you' : TXT('Des leçons qui s’adaptent à toi'), 'professeur.html') +
      (CONFIG.VILLAGE_CACHE ? '' : c('village', '🗺️', en ? 'Word village' : TXT('Le village'), en ? 'Explore by places' : TXT('Explorer par lieux')) + c('accueil-3d', '🌍', en ? '3D village' : TXT('Village 3D'), en ? 'Walk around and play' : TXT('Se promener et jouer'))) +
      (CONFIG.MOTS_CITY_CACHE ? '' : c('', '🛵', 'Mots City', en ? 'English while having fun' : TXT('L’anglais en rigolant'), 'mots-city.html')) +
      '</div></main>');
  }
  function accueil(){
    if(typeof arreterBeat === 'function'){ arreterBeat(); quitterSalon(); }
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
          '<label>' + esc(progTx('maLangue')) + '<select id="ui">' + opts(parleVisibles(), base.ui) + '</select></label>' +
          '<label>' + esc(progTx('monProg')) + '<select id="programme">' + ['fr', 'gb'].map(k => '<option value="' + k + '"' + ((base.programme === 'gb' ? 'gb' : 'fr') === k ? ' selected' : '') + '>' + esc(progTx(k + 'Court')) + '</option>').join('') + '</select></label>' +
        '</div></div></section>' +
      '<main class="accueil">' + cartesModules('accueil') +
        (s >= 2 && !fait ? '<p class="serie-danger" role="status">' + esc(tt('serie_danger', s)) + '</p>' : '') +
        (function(){ const b = bilanAdaptatif(); return b.total ? '<section class="carte-apprentissage" aria-label="Progression adaptative"><strong>🧠 Ton apprentissage</strong><span>' + b.aRevoir + TXT(' notion(s) à revoir · ') + b.maitrisees + TXT(' maîtrisée(s) · ') + b.total + ' suivie(s)</span></section>' : ''; })() +
        '<button class="gros defi' + (defiFait ? ' fait' : '') + '" data-a="defi">' + (defiFait ? '✓ ' : '⚡ ') + esc(t('defi')) + '</button>' +
        '<button class="gros apprendre" data-a="lecon">📚 ' + esc(t('apprendre')) + '</button>' +
        // v5.75 : accueil simplifié — 4 grandes portes ; tout le reste est rangé derrière (ACCUEIL_SIMPLE dans config-site.js).
        (CONFIG.ACCUEIL_SIMPLE ? portesAccueil() : '' +
        '<button class="gros phrases-accueil" data-a="phrases">💬 ' + (base.ui === 'en' ? 'Build your first sentences' : TXT('Atelier des phrases')) + ' <span>✨</span></button>' +
        (piegesDispo() ? '<button class="gros pieges-accueil" data-a="' + (A_EN() ? 'anglais' : 'pieges') + '">🇬🇧 Le coin anglais <span>🪤🎤✍️</span></button>' : '') +
        (CONFIG.VILLAGE_CACHE ? '' : '<button class="gros village-accueil" data-a="village">🗺️ ' + {"fr": TXT("Explorer le village"), "en": "Explore the word village", "es": "Explorar el pueblo", "it": "Esplora il villaggio", "pt": "Explorar a aldeia", "de": "Das Wörterdorf erkunden", "ar": "استكشف قرية الكلمات", "tr": "Kelime köyünü keşfet", "pl": "Odkryj wioskę słów", "ja": "ことばの村を探検", "uk": "Дослідити селище слів", "ko": "단어 마을 탐험하기", "dz": "اكتشف قرية الكلمات", "ma": "اكتشف قرية الكلمات", "tn": "اكتشف قرية الكلمات", "kab": "Snirem tamdint n wawalen"}[base.ui] + '</button>' +
        '<button class="gros monde-3d-accueil" data-a="accueil-3d">🌍 ' + (base.ui === 'en' ? 'Play in the 3D village' : base.ui === 'fr' ? TXT('Jouer dans le village 3D') : '3D') + ' <span>🚀</span></button>') +
        (CONFIG.MOTS_CITY_CACHE ? '' : TXT('<a class="gros monde-3d-accueil mots-city-accueil" href="mots-city.html">🛵 Mots City — l’anglais en rigolant <span>😂</span></a>')) +
        (installation ? TXT('<button class="moyen plein installer-appli" data-a="installer">📲 Installer l’appli sur cet appareil</button>') : '') +
        (window.MATHS ? TXT('<button class="gros monde-3d-accueil maths-accueil" data-a="maths">🔢 Maths de la 6e au bac — Prof Pi te vanne <span>🦝</span></button>') : '') +
        TXT('<a class="gros monde-3d-accueil professeur-ia-accueil" href="professeur.html">🧑‍🏫 Le professeur IA — Anglais & maths <span>✨</span></a>') +
        (window.SCIENCES ? TXT('<button class="gros monde-3d-accueil sciences-accueil" data-a="sciences">🚀 Sciences : planètes, fusées, corps humain <span>🔬</span></button>') : '') +
        (window.MATHS || A_EN() ? '<button class="gros monde-3d-accueil potes-accueil" data-a="potes">⚔️ ' + (base.ui === 'en' ? 'Battle with friends — maths, English, comebacks' : TXT('Battle entre potes — maths, anglais et vannes')) + ' <span>🔥</span></button>' : '')) +
        (CONFIG.ACCUEIL_SIMPLE && installation ? TXT('<button class="moyen plein installer-appli" data-a="installer">📲 Installer l’appli sur cet appareil</button>') : '') +
        (CONFIG.ACCUEIL_SIMPLE ? (rev ? '<div class="actions serrees"><button class="moyen" data-a="revoir">🔁 ' + esc(t('revoir')) + ' <span class="pastille">' + rev + '</span></button></div>' : '') :
        '<div class="actions serrees">' +
          '<button class="moyen" data-a="themes">▶ ' + esc(t('jouer')) + '</button>' +
          '<button class="moyen" data-a="revoir">🔁 ' + esc(t('revoir')) + (rev ? ' <span class="pastille">' + rev + '</span>' : '') + '</button>' +
        '</div>') +
        '<p class="objectif"><span>' + esc(fait ? t('objectif_fait') : t('objectif')) + '</span>' + (s ? '<span class="serie">🔥 ' + esc(t('serie', s)) + '</span>' : '') + '</p>' +
        // Accueil simple : on garde le mot du jour ; l'astuce, les trophées, le vestiaire et les astuces attendent.
        motDuJour() + (CONFIG.ACCUEIL_SIMPLE ? '' : astuceDuJour()) +
        (CONFIG.MODE_PAYANT && !plus() ? '<button class="bandeau-plus" data-a="plus">✨ <strong>' + esc(t('plus')) + '</strong> · ' + esc(t('plus_court')) + '</button>' : '') +
        '<nav class="raccourcis">' +
          '<button data-a="carnet"><span aria-hidden="true">📒</span>' + esc(t('carnet')) + '</button>' +
          (CONFIG.ACCUEIL_SIMPLE ? '' :
          '<button data-a="trophees"><span aria-hidden="true">🏆</span>' + esc(t('trophees')) + '</button>' +
          '<button data-a="vestiaire"><span aria-hidden="true">👗</span>' + esc(t('vestiaire')) + '</button>' +
          '<button data-a="astuces"><span aria-hidden="true">💡</span>' + esc(t('astuces')) + '</button>') +
          '<button data-a="reglages"><span aria-hidden="true">⚙️</span>' + esc(t('reglages')) + '</button>' +
          '<button data-a="parents"><span aria-hidden="true">👪</span>' + (base.ui === 'en' ? 'Parents' : 'Parents') + '</button>' +
        '</nav>' +
        '<p class="liens-legaux"><a href="legal.html#confidentialite">' + esc(tt('confidentialite')) + '</a> · <a href="legal.html#cgu">' + esc(tt('regles')) + '</a> · <a href="legal.html#mentions">' + esc(tt('mentions')) + '</a></p>' +
      '</main>', 'accueil');
    $('#ui').addEventListener('change', ev => { base.ui = ev.target.value; if(base.cible === base.ui) base.cible = base.ui === 'en' ? 'fr' : 'en'; garder(); accueil(); });
    $('#programme').addEventListener('change', ev => { base.programme = ev.target.value === 'gb' ? 'gb' : 'fr'; garder(); accueil(); });
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
      (boucheDispo() ? '<button class="moyen" data-a="bouche" data-v="' + e + '" aria-label="' + esc(t('bouche')) + '">👄</button>' : '') +
      '<button class="moyen" data-a="a-toi" data-v="' + e + '" aria-label="' + esc(t('a_toi')) + '">🎤</button></div></div></div></section>';
  }
  function astuceDuJour(){
    const l = t('conseils'); if(!Array.isArray(l) || !l.length) return '';
    const [titre, texte] = l[Math.floor(Date.now() / 864e5) % l.length];
    return '<section class="carte-jour astuce-jour"><h2>💡 ' + esc(t('astuce_ami')) + '</h2><p><strong>' + esc(titre) + '</strong> ' + esc(texte) + '</p>' +
      '<button class="lien" data-a="astuces">' + esc(t('toutes_astuces')) + '</button></section>';
  }
  // Comment réussir à parler une autre langue : les conseils de Plumo.
  function astuces(){
    const l = t('conseils') || [];
    poser(barre('accueil') + '<main class="astuces"><div class="ami-moyen">' + ami('content') + '</div><h2>💡 ' + esc(t('astuces_titre')) + '</h2><p class="aide">' + esc(t('astuces_intro')) + '</p>' +
      '<ol class="liste-astuces">' + l.map(([titre, texte], k) => '<li><span class="num" aria-hidden="true">' + ['🗓️', '🗣️', '🔁', '🙌', '🏷️', '👨‍👩‍👧', '🎵', '🧠'][k % 8] + '</span><div><strong>' + esc(titre) + '</strong><p>' + esc(texte) + '</p></div></li>').join('') + '</ol>' +
      '<div class="actions"><button class="moyen plein" data-a="lecon">📚 ' + esc(t('apprendre')) + '</button></div></main>', 'astuces');
  }
  // « À toi ! » : on écoute Plumo, on s'enregistre, on compare. Tout reste sur l'appareil.
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
    arreterMicro();
  }
  // Coupe le micro et efface l'enregistrement (rien n'est gardé ni envoyé).
  function arreterMicro(){
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
      const V = window.VANNES && window.VANNES[langueBlagues()];
      if(etat && V && V.micro){ const l = V.micro[niveauHumour()] || V.micro[0]; etat.textContent = remplir(tirerVanne(l), { j:nomVanne(e, langueBlagues()) }); }
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
        // Ma voix, puis celle de Plumo, pour comparer.
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
    if(jeuxEcouteCaches() && JEUX_A_ECOUTER.includes(meca)) return false;
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
      chrono + prog + '<div class="scene">' + corps + '</div>' + '<p class="bulle" id="bulle" role="status" aria-live="polite"></p><div class="apres-erreur"><button class="moyen continuer-erreur" id="continuer-erreur" data-a="continuer-erreur" hidden>✓ ' + (base.ui === 'en' ? 'I understand — next' : 'J’ai compris — continuer') + '</button><button class="petit-bouton garder-vanne" id="garder-vanne" data-a="garder-vanne" hidden>😂</button><button class="petit-bouton pas-drole" id="pas-drole" data-a="pas-drole" hidden>🙄</button></div><p class="note" id="note-voix" aria-live="polite"></p></main>');
    if(facile() && partie.i === 0 && !partie.consigneLue){ partie.consigneLue = true; setTimeout(() => lireConsigne(aide), 250); }
  }
  // Humour réglable : les plaisanteries visent Plumo, le mot ou la situation,
  // jamais le joueur. Le niveau est mémorisé par profil.
  let derniereBlague = '', sceneAnim = null;
  // Suivi des erreurs (pour les vannes qui se souviennent et l'espace parents). Plafonné à 300 entrées.
  function noterErreur(cle){
    const j = J(); j.erreurs = j.erreurs && typeof j.erreurs === 'object' ? j.erreurs : {};
    j.erreurs[cle] = (j.erreurs[cle] || 0) + 1;
    const cles = Object.keys(j.erreurs); if(cles.length > 300) delete j.erreurs[cles.sort((a, b) => j.erreurs[a] - j.erreurs[b])[0]];
    return j.erreurs[cle];
  }
  const BLAGUES_AMI = {
    fr:[
      {
        eclair:["Mon bec a cliqué avant mon cerveau !","Oups… mes lunettes sont en mode avion.","J’ai visé juste. Pas la bonne image, mais juste !","Mon cerveau charge… à 2 %."]
        ,devinette:["Pourquoi Plumo aime les quiz ? Pour se prendre des plumes !","Quel est le sport préféré du hibou ? Le vol… plané !","Pourquoi le hibou révise ? Pour ne pas sécher !","Quel mot fait peur à Plumo ? « Surprise »… surtout au contrôle !","Pourquoi les plongeurs plongent-ils toujours en arrière ? Parce que sinon ils tombent dans le bateau.","Quel est le comble pour un électricien ? Ne pas être au courant.","Que dit un zéro à un huit ? Belle ceinture !","Pourquoi les poissons détestent l’ordinateur ? À cause du net.","Qu’est-ce qui est jaune et qui attend ? Jonathan.","Pourquoi les livres ont-ils toujours froid ? Parce qu’ils ont une couverture.","Quel est le comble pour un jardinier ? Raconter des salades.","J’ai une blague sur les dictionnaires, mais elle manque de définition.","Pourquoi les verbes sont-ils toujours fatigués ? Parce qu’ils se conjuguent à tous les temps.","J’ai voulu faire une blague sur les synonymes, mais je n’ai pas trouvé d’équivalent.","Pourquoi le point final est-il si fier ? Parce qu’il a toujours le dernier mot.","Les lettres se sont disputées. Ça a fini en majuscule.","Le passé composé a quitté le présent : leur relation était devenue trop compliquée."]
        ,chute:["Plumo : « J’étais sûr ! » Le dictionnaire : « C’est bien le problème. »","Plumo cherche ses neurones. Ils sont partis en pause.","Le hibou dit « facile ! » Le quiz répond « ah oui ? »","Plumo a demandé un indice. Son cerveau lui a dit : « Bonne chance. »","Plumo : « Mon cerveau vient de faire une mise à jour. » Le quiz : « Dommage, elle a échoué. »","Plumo n’est pas paresseux : il est en mode économie de mouvement.","Plumo voulait être raisonnable, mais il n’a pas trouvé le bouton.","Plumo a décidé de prendre sa vie en main. Elle lui a demandé de la reposer."]
      },
      {
        eclair:["J’ai cliqué avec panache… et zéro précision.","Mon cerveau a pris la mauvaise sortie.","J’ai confondu réfléchir et cliquer. Classique.","Même mon écho répond mieux que moi."]
        ,devinette:["Pourquoi Plumo aime les dictionnaires ? Ils ne lui coupent jamais la parole !","Quel est le comble du hibou ? Faire chou blanc !","Pourquoi Plumo garde ses plumes ? Pour ne pas perdre la face !","Qu’est-ce qui vole et se trompe ? Moi. Enfin… Plumo !"]
        ,chute:["Plumo : « J’ai une stratégie ! » Le quiz : « Essaie déjà une réponse. »","Le cerveau de Plumo est en réunion. Personne n’a répondu.","Plumo voulait briller. Il a juste clignoté.","Le dictionnaire a soupiré. Même les pages en ont marre."]
      },
      {
        eclair:["Magnifique erreur. On encadre ?","J’ai le talent… de viser à côté.","Mon cerveau vient de poser un RTT.","Je réfléchis très fort. Ça ne se voit pas encore."]
        ,devinette:["Pourquoi Plumo adore les devinettes ? Il peut se tromper en plusieurs étapes !","Quel est le comble pour un hibou ? Avoir la tête dans les nuages !","Pourquoi le quiz rit ? Il connaît déjà la réponse !","Qui a deux yeux et rate la cible ? Plumo, apparemment."]
        ,chute:["Plumo : « C’était presque ça ! » Le quiz : « Dans quel univers ? »","Le cerveau de Plumo a dit oui. La logique a démissionné.","Plumo a choisi au feeling. Le feeling était en congé.","Le hibou a fait son choix. La sagesse n’était pas invitée."]
      },
      {
        eclair:["Même une taupe aurait mieux vu !","J’ai visé la réponse. J’ai touché le décor.","Mon cerveau est officiellement en mode déco.","Je mérite une plume… de consolation."]
        ,devinette:["Quel est le comble de Plumo ? Se faire poser un lapin par sa mémoire !","Pourquoi Plumo ne joue pas à cache-cache ? Il oublie de chercher !","Quelle est la spécialité de Plumo ? Le faux départ !","Qui a raté la réponse avec panache ? Votre hibou préféré."]
        ,chute:["Plumo : « Je maîtrise ! » Le quiz : « On a des doutes. »","Le dictionnaire réclame des vacances loin de Plumo.","Plumo a consulté son instinct. Il a porté plainte.","Le cerveau a quitté le nid. Sans laisser d’adresse."]
      }
    ],
    en:[
      {
        eclair:["My beak clicked before my brain!","Oops… my glasses are in airplane mode.","I aimed right. Just at the wrong picture!","Brain loading… 2%."]
        ,devinette:["Why do owls love quizzes? More chances to wing it!","What’s an owl’s favourite sport? Fly-ing!","Why did the owl revise? To stay sharp!","What scares Plumo? A surprise test!"]
        ,chute:["Plumo: “I was sure!” Dictionary: “That’s the problem.”","Plumo looked for his brain. It’s on a break.","The owl said “easy!” The quiz said “really?”","Plumo asked for a hint. His brain said “good luck.”"]
      },
      {
        eclair:["I clicked with style… and no accuracy.","My brain took the wrong turn.","I confused thinking with clicking. Classic.","Even my echo gets it right."]
        ,devinette:["Why does Plumo love dictionaries? They never interrupt!","What’s an owl’s worst nightmare? A blank look!","Why keep your feathers? To save face!","What flies and gets it wrong? Me. Well, Plumo!"]
        ,chute:["Plumo: “I have a strategy!” Quiz: “Try an answer first.”","Plumo’s brain is in a meeting. No one replied.","Plumo wanted to shine. He just blinked.","The dictionary sighed. Even its pages are tired."]
      },
      {
        eclair:["Brilliant mistake. Shall we frame it?","I have a talent for missing the point.","My brain just booked a day off.","Thinking hard. Results pending."]
        ,devinette:["Why does Plumo love riddles? He can get them wrong in stages!","What’s an owl’s worst habit? Head in the clouds!","Why is the quiz laughing? It knows the answer!","Who has two eyes and misses? Plumo, apparently."]
        ,chute:["Plumo: “That was close!” Quiz: “In which universe?”","Plumo’s brain said yes. Logic resigned.","Plumo trusted his gut. His gut was on holiday.","The owl made a choice. Wisdom wasn't invited."]
      },
      {
        eclair:["A mole could’ve seen that coming!","I aimed for the answer. Hit the scenery.","My brain is officially decorative.","I deserve a consolation feather."]
        ,devinette:["What’s Plumo’s biggest problem? His memory plays hide-and-seek!","Why is Plumo bad at hide-and-seek? He forgets to look!","What’s Plumo’s special skill? A false start!","Who got it wrong with style? Your favourite owl."]
        ,chute:["Plumo: “I’ve got this!” Quiz: “We have doubts.”","The dictionary wants a holiday far away from Plumo.","Plumo asked his instincts. They filed a complaint.","The brain left the nest. No forwarding address."]
      }
    ]
  };
  function niveauHumour(){
    if(facile()) return 0;   // Lecture facile : toujours « Tout doux ».
    const n = Number(J().humour);
    return Number.isInteger(n) && n >= 0 && n <= 3 ? n : 0;
  }
  function langueBlagues(){
    const l = J().langueBlagues;
    if(l === 'en' || l === 'fr') return l;
    return window.TEXTES[base.ui] ? base.ui : 'fr';
  }
  // Vannes (js/vannes.js) : choisies selon L'ERREUR RÉELLEMENT COMMISE.
  // ctx.type : 'mot' (images, traduction…), 'ecoute', 'vf_oui', 'vf_non',
  // 'intrus', 'panier', 'lettre', 'ordre', 'relier'. Les mots sont donnés
  // dans la langue des blagues (pour qu'on comprenne la vanne) ; les jeux de
  // lettres gardent l'orthographe de la langue apprise.
  const remplir = (modele, v) => modele.replace(/\{(\w+)\}/g, (_, k) => v[k] == null ? '' : String(v[k]));
  function tirerVanne(liste){
    if(!liste || !liste.length) return '';
    // Les vannes notées « pas drôle » par la famille ne ressortent plus (s'il en reste d'autres).
    const nul = J().pasDrole; if(Array.isArray(nul) && nul.length){ const l = liste.filter(x => !nul.includes(x)); if(l.length) liste = l; }
    // Plumo apprend (js/juge.js) : chaque vanne a un score familial (😂 +2, 🙄 -3). Les mauvaises disparaissent, les bonnes reviennent plus.
    const sc = J().notesVannes, JG = window.JUGE;
    if(JG && sc && typeof sc === 'object'){ const l = liste.filter(x => !JG.retiree(sc, x)); if(l.length) liste = l; liste = liste.flatMap(x => Array(JG.poids(sc, x)).fill(x)); }
    const aime = J().vannesAimees; if(Array.isArray(aime) && aime.length){ const bonus = liste.filter(x => aime.includes(x)); if(bonus.length) liste = liste.concat(bonus, bonus); }
    let choix = liste[Math.floor(Math.random() * liste.length)];
    if(liste.length > 1 && choix === derniereBlague){
      const autres = liste.filter(x => x !== derniereBlague);
      choix = autres[Math.floor(Math.random() * autres.length)];
    }
    return choix;
  }
  const nomVanne = (e, langue) => {
    const m = MOTS[e]; if(!m) return '';
    const l = m[langue] ? langue : m[base.cible] ? base.cible : base.ui;
    return m[l] ? affiche(l, m[l]).toLowerCase() : '';
  };
  // « le chat », « la tortue », « l’abeille », « le hibou » (js/genres.js).
  function avecArticle(e){
    const g = window.GENRES_FR && window.GENRES_FR[e], m = MOTS[e];
    if(!g || !m || !m.fr) return null;
    const mot = m.fr.toLowerCase(), aspire = (window.H_ASPIRE_FR || []).includes(m.fr.toUpperCase());
    const elide = !aspire && /^[aeiouyhàâéèêëîïôœû]/i.test(mot);
    return { F:(elide ? 'l’' : g === 'f' ? 'la ' : 'le ') + mot, e:g === 'f' ? 'e' : '', p:g === 'f' ? 'elle' : 'il' };
  }
  const majuscule = s => s ? s.charAt(0).toUpperCase() + s.slice(1) : s;
  // Astuce pour distinguer deux mots qu'on confond (js/confusions.js), si on apprend l'anglais.
  function astuce(a, b, langue){
    if(base.cible !== 'en' || !a || !b || !window.CONFUSIONS) return '';
    const c = window.CONFUSIONS.find(x => x.p.includes(a) && x.p.includes(b) && a !== b);
    return c ? (c[langue] || c.fr) : '';
  }
  const initialeDe = s => { const g = graphemes(s).find(x => /\p{L}/u.test(x)); return g ? g.toLowerCase() : ''; };
  const riment = (a, b) => a.length >= 4 && b.length >= 4 && !a.includes(b) && !b.includes(a) && a.slice(-2) === b.slice(-2);
  const nomPanier = (th, langue) => { const T = (window.TEXTES[langue] || {})['th_' + th]; return T || t('th_' + th); };
  function blague(mauvaise, bonne, ctx){
    ctx = ctx || {};
    const langue = langueBlagues(), niveau = niveauHumour();
    const V = window.VANNES && window.VANNES[langue];
    const art = langue === 'fr' ? [avecArticle(mauvaise), avecArticle(bonne)] : [null, null];
    // Langue d'interface sans vannes écrites : les blagues douces traduites de textes.js.
    if(!V){
      const l = (window.TEXTES[langue] || window.TEXTES.fr).blagues;
      const b = tirerVanne(l); derniereBlague = b; return b;
    }
    const type = ctx.type || 'mot';
    const niv = liste => liste && (liste[niveau] || liste[0]);
    const f = ctx.f != null ? ctx.f : nomVanne(mauvaise, langue);
    const j = ctx.j != null ? ctx.j : nomVanne(bonne, langue);
    let pool = null, scene = null;
    // Vanne qui se souvient : la même confusion revient (3e, 5e, 8e, 12e fois).
    if(mauvaise && bonne && f && j && f !== j){
      const n = noterErreur('mot:' + mauvaise + '>' + bonne);
      if(V.souvenir && !facile() && [3, 5, 8, 12, 20].includes(n)){ const b = tirerVanne(V.souvenir); derniereBlague = b; return remplir(b, { f, j, n }); }
    }
    // Le running gag de la chocolatine (rare), puis la révélation finale.
    const R5 = window.RIGOLADE;
    if(R5 && (type === 'mot' || type === 'ecoute') && !facile() && base.ui === 'fr' && (J().gag || 0) <= R5.GAG.length){ const j0 = J(); j0.vannesVues = (j0.vannesVues || 0) + 1;
      if(j0.vannesVues % 30 === 0){ const g = j0.gag || 0; j0.gag = g + 1; const b = g < R5.GAG.length ? R5.GAG[g] : R5.REVELATION; derniereBlague = b; return b; } }
    // Les vannes écrites par la famille (Espace parents).
    const fam = (Array.isArray(J().vannesFamille) ? J().vannesFamille : []).filter(b => !window.JUGE || (JUGE.juger(b).ok && !JUGE.retiree(J().notesVannes, b)));
    if(fam.length && f && j && Math.random() < .08){ const b = fam[Math.floor(Math.random() * fam.length)]; derniereBlague = b; return remplir(b, { f, j }); }
    if((type === 'mot' || type === 'ecoute') && mauvaise && bonne){ const ia = iaPrendre(bonne, mauvaise); if(ia){ derniereBlague = ia; return MARQUE_IA + ia; } }
    if(type === 'mot' || type === 'ecoute'){
      if(!f || !j || f === j) pool = V.secours;
      else{
        const rates = partie ? (partie.rates || (partie.rates = {})) : {};
        const deja = bonne && rates[bonne]; if(bonne) rates[bonne] = (rates[bonne] || 0) + 1;
        const theme = MOTS[bonne] && MOTS[bonne].theme;
        const hasard = () => Math.random();
        if((ctx.serie || 0) >= 3 && hasard() < .7) pool = V.serie;
        else if(deja && hasard() < .6) pool = V.encore;
        else if(type === 'ecoute' && hasard() < .5) pool = V.ecoute;
        // Un personnage du village passe dans la vanne (Paco, Mina, Professor Puzzle).
        // Même initiale ou rime : la remarque est rare et maligne, elle passe avant la vanne objets.
        else if(initialeDe(f) && initialeDe(f) === initialeDe(j) && hasard() < .25) pool = V.initiale;
        else if(riment(f, j) && hasard() < .3) pool = V.rime;
        // v5.64 : la vanne « cash » parle vraiment des deux objets (js/vannes-mots.js).
        else if(langue === 'fr' && vanneObjets(mauvaise, bonne, art, niveau)){ const b = vanneObjets(mauvaise, bonne, art, niveau, true); if(b){ derniereBlague = b; return b; } pool = V.general; }
        else if(V.cameos && !facile() && hasard() < .12){ const b = tirerVanne(V.cameos); derniereBlague = b; return remplir(b, { f, j }); }
        // Scène absurde : ce qui arrive avec le mauvais mot (+ la bonne phrase anglaise).
        else if(V.scenes && V.scenes[theme] && V.scenes[theme].some(x => x.t !== derniereBlague) && !facile() && (langue !== 'fr' || (art[0] && art[1])) && hasard() < .4){
          const toutes = V.scenes[theme], l = toutes.filter(x => x.t !== derniereBlague);
          scene = (l.length ? l : toutes)[Math.floor(Math.random() * (l.length || toutes.length))];
        }
        else if(V.accordees && art[0] && art[1] && hasard() < .3) pool = V.accordees;
        else if(initialeDe(f) && initialeDe(f) === initialeDe(j) && hasard() < .4) pool = V.initiale;
        else if(riment(f, j) && hasard() < .5) pool = V.rime;
        else if(!V.themes[theme] || hasard() < .25) pool = V.general;
        else pool = V.themes[theme];
      }
    }else pool = V[type] || V.secours;
    const valeurs = Object.assign({ f, j, l:initialeDe(f), n:ctx.serie || '' }, ctx);
    if(type === 'mot' || type === 'ecoute') valeurs.l = initialeDe(f);
    if(art[0] && art[1]) Object.assign(valeurs, { F:art[0].F, Fc:majuscule(art[0].F), fe:art[0].e, fp:art[0].p, J:art[1].F, Jc:majuscule(art[1].F), je:art[1].e, jp:art[1].p });
    if(scene){
      const de = x => x.F.replace(/^le /, 'du ').replace(/^la /, 'de la ').replace(/^l’/, 'de l’');
      if(art[1]) valeurs.de_J = de(art[1]); if(art[0]) valeurs.de_F = de(art[0]);
      derniereBlague = scene.t; sceneAnim = { de:bonne, vers:mauvaise };
      let txt = remplir(scene.t, valeurs);
      const je = nomVanne(bonne, 'en');
      if(scene.en && base.cible === 'en' && je) txt += ' 🇬🇧 « ' + majuscule(remplir(scene.en, { je })) + ' »';
      return txt;
    }
    if(type === 'panier'){ valeurs.p = nomPanier(ctx.panier, langue); valeurs.b = nomPanier(ctx.bonPanier, langue); valeurs.m = j; }
    let liste = niv(pool);
    // Lecture facile : Plumo reste doux et préfère les phrases courtes.
    if(facile()){ const courtes = liste.filter(v => v.length <= 60); if(courtes.length >= 2) liste = courtes; }
    const choix = tirerVanne(liste);
    derniereBlague = choix;
    return remplir(choix, valeurs);
  }
  // Sans « controle », dit seulement si une vanne objets est possible ; sinon la fabrique (sans répétition).
  // Sans « fabriquer », dit seulement si une vanne objets est possible ; sinon la fabrique (sans répétition).
  function vanneObjets(mauvaise, bonne, art, niveau, fabriquer){
    const VM = window.VANNES_MOTS, a = VM && VM.mots[mauvaise], b = VM && VM.mots[bonne];
    // Lecture facile : on garde les vannes courtes d'avant.
    if(!a || !b || !art[0] || !art[1] || mauvaise === bonne || facile()) return false;
    if(!fabriquer && Math.random() >= .8) return false;
    const val = { Fc:majuscule(art[0].F), F:art[0].F, J:art[1].F, Jc:majuscule(art[1].F), tf:a.t, Tf:majuscule(a.t), tj:b.t, aj:b.a.replace('{X}', art[0].F) };
    const l = VM.modeles[Math.max(0, Math.min(3, niveau))] || VM.modeles[0];
    // Le juge de Plumo écarte les drôles d'images (« mettre le couteau sur ta tête »…).
    const essais = l.map(m => remplir(m, val).replace(/ à le /g, ' au ').replace(/ de le /g, ' du ')).filter(x => !window.JUGE || JUGE.juger(x).ok);
    if(!essais.length) return false;
    if(!fabriquer) return true;
    const mem = memoireVannes(), neuves = essais.filter(x => mem.age(x) < 0);
    // Toutes déjà dites pour ce duo : la plus ancienne (jamais celle d'il y a un instant).
    const choix = neuves.length ? neuves[Math.floor(Math.random() * neuves.length)] : essais.slice().sort((x, y) => mem.age(y) - mem.age(x))[0];
    mem.noter(choix);
    return choix;
  }
  function correctionDansLangue(mot){
    const l = langueBlagues();
    return l === 'en' ? 'The correct answer was: ' + mot : l === 'fr' ? TXT("C'était : ") + mot : t('c_etait', mot);
  }
  // v5.75 : avant, seule l'humeur « surpris » affichait la bulle d'erreur ; les autres la cachaient.
  function amiDit(txt, humeur){
    const b = $('#bulle'); if(b){ b.textContent = txt; b.className = 'bulle ' + (humeur === 'fete' ? 'ok' : ['surpris', 'mdr', 'choque', 'malin', 'triste', 'vexe'].includes(humeur) ? 'ko' : ''); }
    const a = $('#ami-partie'); if(a) a.innerHTML = ami(humeur || 'content');
  }
  // mode : 'theme' (un thème, un jeu), 'defi' (8 mots de partout), 'revoir' (les mots dus).
  function commencer(id, mode, liste){
    mode = mode || 'theme';
    id = mode === 'theme' ? normaliser(id) : id;
    if(mode === 'theme' && (!jeuOuvert(id) || !ouvert(theme))) return ecranPlus('theme-retour');
    if(jeuxEcouteCaches() && JEUX_A_ECOUTER.includes(mecaDe(id))) id = 'quel_mot:' + ((id.split(':')[1]) || 'n');
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
    const l = ['ecoute', 'quel_mot', 'vrai_faux', 'ombre', 'ecoute_mot'].filter(m => !jeuxEcouteCaches() || !JEUX_A_ECOUTER.includes(m));
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
    // L'IA prépare déjà une vanne pour chaque mauvaise image possible (en français : « sun (soleil) »).
    if(partie.bonne && MOTS[partie.bonne] && langueBlagues() === 'fr'){
      const nom = e => { const c = nomVanne(e, base.cible), f = nomVanne(e, 'fr'); return c && f && c !== f ? c + ' (' + f + ')' : f || c; };
      const ch = [...document.querySelectorAll('[data-a="repondre"]')].map(b => b.dataset.v).filter(e => MOTS[e] && e !== partie.bonne);
      if(ch.length) iaPrecharger('mots', TXT('Quel est le nom de cette image ? (') /* consigne pour l'IA : reste en français */ + LANGUES_APPRENDRE[base.cible] + ')', { id:partie.bonne, texte:nom(partie.bonne) }, ch.map(e => ({ id:e, texte:nom(e) })), niveauHumour(), 'fr');
    }
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
      ecouteBtn(e) + '<div class="prononcer">' + (boucheDispo() ? '<button class="moyen" data-a="bouche" data-v="' + e + '">👄 ' + esc(t('bouche')) + '</button>' : '') +
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
  // v5.64 : la silhouette est découpée à l'avance (img/ombres, outils/fabriquer-ombres.py) : une vraie ombre
  // chinoise lisible. Les photos sans fond blanc (plage, piano…) passent en « lampe torche » : la scène s'éclaire peu à peu.
  Q.ombre = () => {
    Q.quel_mot('ombre');
    const img = document.querySelector('img.ombre');
    if(!img) return;
    const vrai = img.getAttribute('src');
    img.dataset.vrai = vrai;
    img.addEventListener('error', () => { img.classList.add('nuit'); img.src = vrai; }, { once:true });
    img.src = vrai.replace('img/pictos/', 'img/ombres/');
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
    partie.bonne = e; partie.vf = vrai; partie.vfAutre = vrai ? null : autre;
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
    partie.bonne = e; partie.attendu = g[trou]; partie.trou = trou;
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
  // Ce que le joueur a vraiment fait, pour que la vanne parle de cette erreur-là.
  function ctxErreur(btn, serie){
    const c = partie.courant, v = btn.dataset.v;
    if(c === 'vrai_faux') return v === '1' ? { type:'vf_oui', m:nomVanne(partie.vfAutre, langueBlagues()), serie } : { type:'vf_non', serie };
    if(c === 'intrus') return { type:'intrus', serie };
    if(c === 'panier') return { type:'panier', panier:v, bonPanier:MOTS[partie.bonne].theme, serie };
    if(c === 'premiere_lettre' || c === 'lettre_manquante'){
      const g = graphemes(nomMot(partie.bonne)), x = g.slice();
      x[c === 'premiere_lettre' ? 0 : partie.trou] = v;
      return { type:'lettre', l:v, b:partie.attendu, x:x.join(''), j:nomMot(partie.bonne), serie };
    }
    if(c === 'ecoute' || c === 'ecoute_mot') return { type:'ecoute', serie };
    return { type:'mot', serie };
  }
  // ── v5.75 : journal de la semaine (sur l'appareil) pour le résumé des parents ──
  // Par jour : bonnes réponses / erreurs par matière, minutes de jeu. 21 jours gardés au plus.
  function noterJournal(matiere, ok){
    try{ const j = J(), d = jour(); j.journal = j.journal && typeof j.journal === 'object' ? j.journal : {};
      const e = j.journal[d] = j.journal[d] || {}; const k = matiere + (ok ? '+' : '-'); e[k] = (e[k] || 0) + 1;
      if(!j.jours.includes(d)){ j.jours = j.jours.concat(d).slice(-60); majRappels(); }
      const jours = Object.keys(j.journal).sort(); while(jours.length > 21) delete j.journal[jours.shift()];
    }catch(e){}
    // v6.0 : les modules (ligue, saisons…) apprennent chaque réponse.
    for(const f of MODULES.hooks.reponse) try{ f(ok, matiere); }catch(e){}
  }
  setInterval(() => { try{ if(document.hidden || !document.querySelector('main') || document.querySelector('main.accueil')) return;
    const j = J(), d = jour(); j.journal = j.journal || {}; const e = j.journal[d] = j.journal[d] || {}; e.min = (e.min || 0) + 1; garder(); }catch(e){} }, 60000);
  // Juste / faux, commun à tous les jeux à choix.
  function juger(btn, juste, reessai){
    if(!partie.deja) noterJournal('mots', juste);
    const serieAvant = partie.combo || 0;
    if(!partie.deja){ noter(partie.bonne, juste); if(juste) partie.bonnes++; }
    if(juste && !partie.deja) serieUp(); else if(!juste) partie.combo = 0;
    vibrer(juste);
    if(juste) eclat(btn);
    partie.deja = true; garder();
    if(juste){
      partie.verrou = true;
      btn.classList.add('juste'); bruit('juste');
      document.querySelectorAll('.ombre, .flou').forEach(i => { if(i.dataset.vrai && i.getAttribute('src') !== i.dataset.vrai) i.src = i.dataset.vrai; i.classList.add('revele'); });
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
        ? nomPanier(MOTS[partie.bonne].theme, langueBlagues())
        : nomMot(partie.bonne) + (tr ? ' (' + tr + ')' : '');
      const ctx = ctxErreur(btn, serieAvant);
      const motChoisi = ['mot', 'ecoute', 'intrus'].includes(ctx.type) ? btn.dataset.v : null;
      const vanne = blague(motChoisi, partie.bonne, ctx);
      const truc = astuce(motChoisi, partie.bonne, langueBlagues());
      const message = vanne + ' ' + correctionDansLangue(bonneReponse) + (truc ? ' 💡 ' + truc : '');
      amiDit(message, niveauHumour() > 1 ? ['surpris', 'mdr', 'choque', 'malin'][Math.floor(Math.random() * 4)] : 'surpris'); noterBetisier(message);
      if(sceneAnim && !sobre()){ const bl = $('#bulle'); if(bl){ const sa = document.createElement('span'); sa.className = 'scene-anim'; sa.setAttribute('aria-hidden', 'true'); sa.innerHTML = '<span class="de">' + image(sceneAnim.de, 'pic-mini') + '</span><span class="vers">' + image(sceneAnim.vers, 'pic-mini') + '</span>'; bl.prepend(sa); } }
      sceneAnim = null;
      if(niveauHumour() > 0) bruit('boing');
      reactionAmi(niveauHumour());
      partie.derniereVanne = { v:vanne, e:partie.bonne };
      const fav = $('#garder-vanne'); if(fav){ fav.hidden = false; fav.disabled = false; fav.textContent = '😂 ' + (base.ui === 'en' ? 'Keep it' : TXT('Je la garde')); }
      const pd = $('#pas-drole'); if(pd){ pd.hidden = false; pd.disabled = false; pd.textContent = '🙄 ' + (base.ui === 'en' ? 'Not funny' : TXT('Pas drôle')); }
      partie.dernierModele = derniereBlague;
      const suite = $('#continuer-erreur');
      if(suite){ suite.hidden = false; suite.focus({preventScroll:true}); }
      // Une seule lecture vocale : la blague ET la bonne réponse, dans cet ordre.
      direPhrase(message, langueBlagues());
    }
  }
  // Plumo réagit à sa propre vanne : plus le niveau est corsé, plus il en fait.
  const REACTIONS = ['🙈', '👓', '🪶', '💥'];
  function reactionAmi(niveau){
    const w = $('#ami-partie .ami-3d-wrap'); if(!w) return;
    w.classList.add('ami-rx', 'ami-rx-' + niveau);
    if(!sobre()){ const i = document.createElement('i'); i.className = 'ami-rx-objet'; i.setAttribute('aria-hidden', 'true'); i.textContent = REACTIONS[niveau] || REACTIONS[0]; w.appendChild(i); }
  }
  // Carnet des fous rires : les vannes préférées, avec leur mot (on révise en riant).
  function garderVanne(){
    const d = partie && partie.derniereVanne; if(!d || !d.v) return;
    const j = J(); j.fousRires = Array.isArray(j.fousRires) ? j.fousRires : [];
    if(!j.fousRires.some(x => x.v === d.v && x.e === d.e)) j.fousRires = [{ v:d.v, e:d.e }].concat(j.fousRires).slice(0, 60);
    garder();
    const b = $('#garder-vanne'); if(b){ b.textContent = '✓ ' + (base.ui === 'en' ? 'Saved!' : TXT('Gardée !')); b.disabled = true; }
  }
  function fousRires(){
    const l = (J().fousRires || []).filter(x => x && typeof x.v === 'string' && MOTS[x.e]);
    const en = base.ui === 'en';
    const corps = !l.length ? '<p class="centre">' + (en ? 'No jokes yet. After a mistake, tap “😂 Keep it”!' : TXT('Pas encore de vanne. Après une erreur, touche « 😂 Je la garde » !')) + '</p>' :
      '<ul class="carnet">' + l.map((x, i) => '<li><button class="ligne-carnet" data-a="ecouter" data-v="' + x.e + '">' + image(x.e, 'pic-mini') +
        '<span class="txt"><strong>' + esc(nomMot(x.e)) + '</strong><span>' + esc(x.v) + '</span></span></button>' +
        '<button class="petit-bouton" data-a="oublier-vanne" data-v="' + i + '" aria-label="' + (en ? 'Remove' : 'Retirer') + '">✕</button></li>').join('') + '</ul>';
    poser(barre('carnet') + '<main><h2>😂 ' + (en ? 'My laughs' : 'Mes fous rires') + '</h2><p class="aide">' + (en ? 'Tap a joke to hear its word again.' : TXT('Touche une vanne pour réentendre son mot.')) + '</p>' + corps + '<p class="note" id="note-voix" aria-live="polite"></p></main>');
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
      partie.erreurs++; bruit('faux'); amiDit(blague(a.dataset.v, btn.dataset.v, { type:'relier' }), 'surpris');
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
      amiDit(blague(null, L.e, { type:'ordre', x:L.pris.map(i => L.g[i]).join(''), j:nomMot(L.e) }), 'surpris');
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
    if(!j.jours.includes(jour())){ j.jours = j.jours.concat(jour()).slice(-60); majRappels(); }
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


  // ── Le village de Plumo : carte d'aventure reliée aux thèmes existants ──
  const VILLAGE_TEXT = {
    fr:{title:TXT("Le village des mots"),intro:TXT("Plumo a besoin de toi ! Choisis un lieu et pars à la découverte des mots."),mission:"Ta mission",hint:TXT("Chaque lieu cache des mots à découvrir. Termine une partie pour faire progresser ton carnet."),back:TXT("Retour au nid")},
    en:{title:"The Word Village",intro:"Plumo needs your help! Pick a place and discover new words.",mission:"Your mission",hint:"Every place is full of words. Finish a game to grow your word notebook.",back:"Back to the nest"},
    es:{title:"El pueblo de las palabras",intro:"¡Plumo necesita tu ayuda! Elige un lugar y descubre palabras.",mission:"Tu misión",hint:"Cada lugar esconde palabras. Termina una partida para llenar tu cuaderno.",back:"Volver al nido"},
    it:{title:"Il villaggio delle parole",intro:"Plumo ha bisogno di te! Scegli un luogo e scopri nuove parole.",mission:"La tua missione",hint:"Ogni luogo nasconde parole. Completa una partita per arricchire il quaderno.",back:"Torna al nido"},
    pt:{title:"A aldeia das palavras",intro:"O Plumo precisa de ti! Escolhe um lugar e descobre palavras.",mission:"A tua missão",hint:"Cada lugar esconde palavras. Termina uma partida para encher o caderno.",back:"Voltar ao ninho"},
    de:{title:"Das Wörterdorf",intro:"Plumo braucht dich! Wähle einen Ort und entdecke neue Wörter.",mission:"Deine Mission",hint:"An jedem Ort warten Wörter. Beende ein Spiel und fülle dein Wörterbuch.",back:"Zurück zum Nest"},
    ar:{title:"قرية الكلمات",intro:"آمي يحتاج إليك! اختر مكاناً واكتشف كلمات جديدة.",mission:"مهمتك",hint:"في كل مكان كلمات جديدة. أكمل لعبة لتضيفها إلى دفتر كلماتك.",back:"العودة إلى العش"},
    tr:{title:"Kelime Köyü",intro:"Plumo'nun yardımına ihtiyacı var! Bir yer seç ve yeni kelimeler keşfet.",mission:"Görevin",hint:"Her yerde keşfedilecek kelimeler var. Defterini geliştirmek için bir oyunu bitir.",back:"Yuvaya dön"},
    pl:{title:"Wioska słów",intro:"Plumo potrzebuje pomocy! Wybierz miejsce i odkrywaj słowa.",mission:"Twoja misja",hint:"W każdym miejscu czekają słowa. Ukończ grę, aby uzupełnić notes.",back:"Wróć do gniazda"},
    ja:{title:"ことばの村",intro:"アミが助けを待っているよ！場所を選んで新しい言葉を見つけよう。",mission:"ミッション",hint:"それぞれの場所に言葉が隠れているよ。ゲームを終えてノートを育てよう。",back:"巣に戻る"},
    uk:{title:"Селище слів",intro:"Амі потрібна твоя допомога! Обери місце й відкривай слова.",mission:"Твоє завдання",hint:"У кожному місці є нові слова. Заверши гру, щоб поповнити записник.",back:"До гнізда"},
    ko:{title:"단어 마을",intro:"아미에게 도움이 필요해요! 장소를 골라 새 단어를 찾아봐요.",mission:"미션",hint:"각 장소에는 단어가 숨어 있어요. 게임을 마치고 단어장을 채워요.",back:"둥지로 돌아가기"},
    dz:{title:"قرية الكلمات",intro:"آمي يحتاج مساعدتك! اختار مكان واكتشف كلمات جديدة.",mission:"مهمتك",hint:"كل بلاصة فيها كلمات. كمّل لعبة باش تعمّر كراسك.",back:"ارجع للعش"},
    ma:{title:"قرية الكلمات",intro:"آمي محتاج مساعدتك! اختار بلاصة واكتشف كلمات جديدة.",mission:"المهمة ديالك",hint:"كل بلاصة فيها كلمات. كمل لعبة باش تعمر الدفتر ديالك.",back:"رجع للعش"},
    tn:{title:"قرية الكلمات",intro:"آمي يستحق مساعدتك! اختار بلاصة واكتشف كلمات جديدة.",mission:"مهمتك",hint:"كل بلاصة فيها كلمات. كمّل لعبة باش تعمّر كراسك.",back:"ارجع للعش"},
    kab:{title:"Tamdint n wawalen",intro:"Plumo yesra tallelt-ik! Fren adeg sakin snirem awalen imaynuten.",mission:"Tameẓla-k",hint:"Yal adeg yesɛa awalen. Fak urar akken ad ternuḍ deg tferkit-ik.",back:"Uɣal ɣer usennun"}
  };
  const LIEUX_VILLAGE = [
    {theme:'animaux',icon:'🌳',fr:TXT('La forêt des animaux'),en:'Animal Forest'},
    {theme:'manger',icon:'🍓',fr:TXT('Le marché gourmand'),en:'The Food Market'},
    {theme:'maison',icon:'🏡',fr:'La maison bavarde',en:'The Talking House'},
    {theme:'nature',icon:'🌻',fr:'Le jardin merveilleux',en:'The Wonder Garden'},
    {theme:'ville',icon:'🚲',fr:TXT('La place du village'),en:'Village Square'},
    {theme:'musique',icon:'🎵',fr:TXT('La scène enchantée'),en:'The Magic Stage'},
    {theme:'habits',icon:'🧢',fr:TXT('La boutique des costumes'),en:'The Costume Shop'},
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
        '<span class="lieu-bas">'+(libre?(visite?'✓ '+(base.ui==='en'?'Visited today':TXT('Visité aujourd’hui')):(base.ui==='en'?'Explore this place':TXT('Explorer ce lieu'))):'✨ '+esc(t('plus_badge')) )+'</span></button>';
    }).join('');
    const dialogues={
      fr:[TXT("Psst… j’ai entendu des mots rigolos dans la forêt !"),TXT("Le marché sent bon… et les mots aussi !"),TXT("Dans cette maison, chaque objet a une histoire."),TXT("Tu es prêt ? Le village compte sur toi !")],
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

  // ── Accueil en 3D ─────────────────────────────────────────────────
  // Préférence : '1' toujours la 3D, '0' version classique, sinon automatique.
  // Automatique = la 3D, sauf Lecture facile, animations réduites, appareil sans WebGL ou navigateur piloté (tests).
  function accueil3DAuto(){
    let pref = null; try{ pref = localStorage.getItem('ami_accueil3d'); }catch(e){}
    if(pref === '0') return false;
    if(pref === '1') return true;
    if(facile() || sobre() || navigator.webdriver) return false;
    try{ const c = document.createElement('canvas'); return !!(c.getContext('webgl2') || c.getContext('webgl')); }catch(e){ return false; }
  }
  function depuis3D(){ try{ return sessionStorage.getItem('ami_depuis3d') === '1'; }catch(e){ return false; } }
  function retour3D(){
    try{ if(document.referrer && /monde-3d\.html/.test(document.referrer) && history.length > 1) return history.back(); }catch(e){}
    location.href = 'monde-3d.html';
  }
  function ouvrirDepuis3D(dest){
    const [quoi, v] = String(dest).split(':');
    if(quoi === 'lieu' && LIEUX_VILLAGE.some(x => x.theme === v)) return entrerVillageLieu(v);
    const ecrans = { defi, lecon, phrases:atelierPhrases, pieges, anglais:coinAnglais, battle:battleMenu, situations, dictee:dicteeGo, parcours, revision:revisionGo, histoires, repeter, parents, trompe:amiTrompe, oreilles:oreillesGo, vraifaux:vraiFauxGo, avent, maison, betisier, rap:rapGo, tournoi:tournoiMenu, salon:salonAccueil, maths:mathsAccueil, sciences:sciencesAccueil, revoir, carnet, reglages, village };
    // Un coin Plus reste fermé même par un lien du village 3D.
    const coin = COINS[quoi] ? quoi : COIN_DE[quoi];
    if(coin && !coinOuvert(coin)) return ecranPlus(retourCoin(coin));
    return (ecrans[quoi] || accueil)();
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
        '<h2>' + (base.ui === 'en' ? 'Sentence superstar!' : TXT('Champion des phrases !')) + '</h2>' +
        '<p>' + (base.ui === 'en' ? 'You built 12 sentences. Plumo is proud of you!' : TXT('Tu as construit 12 phrases. Plumo est très fier de toi !')) + '</p>' +
        '<p class="gain-phrases">⭐ +' + p.gain + ' plumes</p>' +
        '<button class="moyen plein" data-a="accueil">' + (base.ui === 'en' ? 'Back to the nest' : TXT('Retour au nid')) + '</button></main>');
      return;
    }
    const phrase = p.liste[p.index];
    const tokens = phrase.split(' ');
    const choisis = p.choisis;
    const ordre = tokens.map((_,i)=>i).filter(i=>!choisis.includes(i));
    const titre = base.ui === 'en' ? 'Sentence workshop' : TXT('Atelier des phrases');
    const aide = base.ui === 'en' ? 'Tap the words in the right order.' : TXT('Touche les mots dans le bon ordre.');
    const langue = base.cible === 'en' ? 'English' : TXT('Français');
    poser(barre('accueil') + '<main class="atelier-phrases">' +
      '<div class="atelier-entete"><div class="ami-phrase ami-3d" id="ami-phrase">' + ami('content') + '</div>' +
      '<div><p class="sur-titre-phrases">🧩 ' + titre + '</p><h2>' + (base.ui === 'en' ? 'Put the sentence together!' : TXT('Construis la phrase !')) + '</h2>' +
      '<p class="aide-phrases">' + aide + '</p><span class="langue-phrase">' + langue + '</span></div></div>' +
      '<div class="progress-phrases" aria-label="' + (p.index+1) + ' / ' + p.liste.length + '"><span style="width:' + ((p.index/p.liste.length)*100) + '%"></span></div>' +
      '<p class="compteur-phrases">' + (base.ui === 'en' ? 'Sentence' : 'Phrase') + ' ' + (p.index+1) + ' / ' + p.liste.length + '</p>' +
      '<div class="phrase-construite" aria-live="polite" dir="auto">' + (choisis.length ? choisis.map(i=>'<span class="mot-place">'+esc(tokens[i])+'</span>').join(' ') : '<span class="placeholder-phrase">'+(base.ui==='en'?'Your sentence will appear here…':TXT('Ta phrase apparaîtra ici…'))+'</span>') + '</div>' +
      '<div class="tuiles-phrases" dir="auto">' + melanger(ordre).map(i=>'<button class="tuile-phrase" data-a="phrase-token" data-v="'+i+'">'+esc(tokens[i])+'</button>').join('') + '</div>' +
      '<p class="retour-phrase" id="retour-phrase" role="status" aria-live="polite">'+(base.ui==='en'?'Plumo says: Let’s make a sentence!':TXT('Plumo dit : Allez, on fabrique une phrase !'))+'</p>' +
      '<div class="actions actions-phrases">' +
      '<button class="moyen" data-a="phrase-reset">↶ '+(base.ui==='en'?'Start again':'Recommencer')+'</button>' +
      '<button class="moyen" data-a="phrase-hint">💡 '+(base.ui==='en'?'Hint':'Indice')+'</button>' +
      '<button class="moyen plein" data-a="phrase-check">✓ '+(base.ui==='en'?'Check':TXT('Vérifier'))+'</button></div>' +
      '<p class="note-phrases">'+(base.ui==='en'?'No rush. Learning is an adventure!':TXT('Pas de chrono : apprendre, c’est une aventure !'))+'</p></main>');
  }
  function atelierPhrases(){
    if(!PHRASES[base.cible]){
      const en = base.ui === 'en';
      poser(barre('accueil') + '<main class="centre atelier-phrases">' +
        '<div class="ami-moyen ami-3d">'+ami('content')+'</div><h2>💬 '+(en?'Sentence workshop':TXT('Atelier des phrases'))+'</h2>' +
        '<p>'+(en?'Carefully reviewed sentence activities are currently available in French and English. Word games remain available in the other languages.':TXT('Les phrases relues sont disponibles pour le moment en français et en anglais. Les jeux de mots restent disponibles dans les autres langues.'))+'</p>' +
        '<button class="moyen plein" data-a="accueil">'+(en?'Back':TXT('Retour'))+'</button></main>');
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
      if(zone) zone.textContent = langueBlagues()==='en' ? 'Oops! My words have gone on an adventure without me.' : TXT('Oups ! Mes mots sont partis faire une phrase sans moi !');
      const amiEl=$('#ami-phrase'); if(amiEl){amiEl.classList.remove('ami-raté'); void amiEl.offsetWidth; amiEl.classList.add('ami-raté');}
      bruit('faux');
      return;
    }
    p.gain+=3; J().plumes+=3; garder(); bruit('juste');
    const zone2=$('#retour-phrase');
    if(zone2) zone2.textContent=base.ui==='en'?'Brilliant! Plumo is doing a happy dance!':TXT('Bravo ! Plumo fait sa danse de la victoire !');
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
      if(zone) zone.textContent=(base.ui==='en'?'Plumo’s hint: the next word is “':TXT('Indice de Plumo : le prochain mot est « '))+tokens[prochain]+(base.ui==='en'?'”':' »');
    }
  }

  // Punchline bonus : on chambre la phrase et Plumo, jamais la personne qui joue.
  function vannePiquante(texte){
    const base = String(texte || 'Presque !');
    const langue = base && base.ui === 'en' ? 'en' : 'fr';
    const banque = window.VANNES && (window.VANNES[langue] || window.VANNES.fr);
    const lignes = banque && banque.punchlines;
    if(!Array.isArray(lignes) || !lignes.length) return base;
    const extra = lignes[Math.floor(Math.random() * lignes.length)];
    return base + ' — ' + extra;
  }

  // ── Les pièges de l'anglais (js/pieges.js) : erreurs typiques des francophones ──
  // Une vanne par erreur (ce qu'un anglophone comprendrait), la règle, la bonne phrase dite à voix haute.
  // Révision espacée : chaque piège a sa boîte (0 à 4) ; les pièges ratés reviennent vite.
  let piege = null;
  const piegesDispo = () => !!window.PIEGES && base.cible === 'en' && base.ui === 'fr';
  function etatPieges(){ const j = J(); j.pieges = window.PIEGES.propre(j.pieges); return j.pieges; }
  function pieges(){
    piege = null;
    if(!piegesDispo()){
      poser(barre('accueil') + '<main class="centre"><div class="ami-moyen">' + ami('content') + TXT('</div><h2>🪤 Les pièges de l’anglais</h2>') +
        TXT('<p>Ce coin est fait pour les francophones qui apprennent l’anglais : choisis « Je parle : Français » et « J’apprends : Anglais ».</p>') +
        TXT('<p><button class="moyen plein" data-a="accueil">Retour</button></p></main>'));
      return;
    }
    const P = window.PIEGES, e = etatPieges(), m = P.maitrises(e), auj = P.jourNum(), dus = P.liste.filter(p => e[p.id] && e[p.id].d <= auj).length;
    const cats = Object.keys(P.CATS).map(c => { const l = P.liste.filter(p => p.cat === c), ok = l.filter(p => e[p.id] && e[p.id].b >= 3).length;
      return '<li><span>' + esc(P.CATS[c]) + '</span><span class="points" aria-label="' + ok + '/' + l.length + '">' + ok + '/' + l.length + '</span></li>'; }).join('');
    poser(barre(A_EN() ? 'anglais' : 'accueil') + '<main class="pieges-accueil-ecran">' +
      '<div class="ami-moyen">' + ami('content') + TXT('</div><h2>🪤 Les pièges de l’anglais</h2>') +
      TXT('<p class="pieges-intro">« I have 10 years », « I am agree », « a car red »… Les francophones tombent tous dedans ! Ici, chaque piège a sa vanne : tu ris, et tu ne retombes plus dedans.</p>') +
      TXT('<p class="pieges-score">🏅 Pièges déjoués : <strong>') + m + '/' + P.liste.length + '</strong>' + (dus ? ' · 🔁 ' + dus + TXT(' à revoir') : '') + '</p>' +
      '<ul class="pieges-cats">' + cats + '</ul>' +
      TXT('<button class="gros" data-a="pieges-go">▶ C’est parti (6 pièges)</button></main>'));
  }
  function piegesGo(){
    if(!piegesDispo()) return pieges();
    piege = { liste:window.PIEGES.seance(etatPieges(), 6), i:0, bonnes:0, gain:0, repondu:false };
    afficherPiege();
  }
  function afficherPiege(){
    const pg = piege; if(!pg) return pieges();
    if(pg.i >= pg.liste.length){
      const P = window.PIEGES, m = P.maitrises(etatPieges());
      poser(barre('accueil') + '<main class="centre pieges-fin"><div class="ami-moyen">' + ami('fete') + '</div>' +
        '<h2>' + (pg.bonnes === pg.liste.length ? TXT('Aucun piège ne t’a eu ! 🏆') : TXT('Pièges repérés !')) + '</h2>' +
        '<p>' + pg.bonnes + '/' + pg.liste.length + TXT(' du premier coup · 🏅 ') + m + '/' + P.liste.length + TXT(' pièges déjoués en tout</p>') +
        (pg.gain ? '<p class="gain-phrases">⭐ +' + pg.gain + ' plumes</p>' : '') +
        TXT('<p>Les pièges ratés reviendront bientôt : c’est comme ça qu’on les retient.</p>') +
        TXT('<div class="actions serrees"><button class="moyen plein" data-a="pieges-go">🔁 Encore</button><button class="moyen" data-a="pieges">🪤 Tous les pièges</button><button class="moyen" data-a="') + (A_EN() ? 'anglais' : 'accueil') + '">' + (A_EN() ? '🇬🇧 Coin anglais' : '🏠 Accueil') + '</button></div></main>');
      return;
    }
    const p = pg.liste[pg.i]; pg.repondu = false; pg.options = window.PIEGES.options(p);
    poser(barre('pieges') + '<main class="piege-ecran">' +
      '<p class="piege-cat">' + esc(window.PIEGES.CATS[p.cat]) + ' · ' + (pg.i + 1) + '/' + pg.liste.length + '</p>' +
      '<div class="piege-haut"><div class="ami-moyen" id="ami-piege">' + ami('content') + '</div>' +
      TXT('<div><p class="piege-consigne">Comment dit-on en anglais ?</p><p class="piege-fr">🇫🇷 ') + esc(p.fr) + '</p></div></div>' +
      '<div class="piege-options">' + pg.options.map((o, i) => '<button class="moyen piege-opt" data-a="piege-rep" data-v="' + i + '" lang="en">' + esc(o) + '</button>').join('') + '</div>' +
      '<div class="piege-retour" id="piege-retour" role="status" aria-live="polite"></div></main>');
  }
  function repondrePiege(i){
    const pg = piege; if(!pg || pg.repondu) return;
    const p = pg.liste[pg.i], choix = pg.options[i]; if(choix == null) return;
    pg.repondu = true;
    const juste = choix === p.bon, e = etatPieges();
    window.PIEGES.noter(e, p.id, juste);
    if(juste){ pg.bonnes++; pg.gain += 2; J().plumes += 2; }
    garder();
    document.querySelectorAll('.piege-opt').forEach((b, k) => { b.disabled = true; if(pg.options[k] === p.bon) b.classList.add('ok'); else if(k === i) b.classList.add('ko'); });
    const faux = !juste && p.faux.find(f => f.en === choix);
    const deja = juste ? 0 : noterErreur('piege:' + p.id); if(!juste) garder();
    const a = $('#ami-piege'); if(a) a.innerHTML = ami(juste ? 'fete' : 'surpris');
    const r = $('#piege-retour');
    if(r) r.innerHTML = (juste ? TXT('<p class="piege-bravo">Yes! 🎉 Tu as évité le piège.</p>') : '<p class="piege-vanne">😂 ' + (deja >= 2 ? TXT('Encore ce piège ! Il t’aime bien, on dirait. ') : '') + esc(vannePiquante(faux ? faux.vanne : 'Presque !')) + '</p>') +
      '<p class="piege-bon" lang="en">✅ ' + esc(p.bon) + ' <button class="bouton-rond" data-a="piege-ecouter" aria-label="Écouter la bonne phrase">🔊</button></p>' +
      '<p class="piege-regle">💡 ' + esc(p.regle) + '</p>' +
      '<button class="moyen plein" data-a="piege-suivant">' + (pg.i + 1 < pg.liste.length ? TXT('Piège suivant →') : 'Voir mon score') + '</button>';
    bruit(juste ? 'juste' : 'faux');
    direPhrase(p.bon, 'en');
    const n = $('[data-a="piege-suivant"]'); if(n) n.focus({ preventScroll:true });
  }

  // ── LE COIN ANGLAIS (js/anglais.js) : battle de vannes, situations de la vie, dictée rigolote + les pièges ──
  // Réservé aux francophones qui apprennent l'anglais. Progression dans J().anglais (validée à la restauration).
  const A_EN = () => window.ANGLAIS;
  function etatAnglais(){
    const j = J(), o = j.anglais && typeof j.anglais === 'object' ? j.anglais : {}, ids = A_EN() ? A_EN().SITUATIONS.map(x => x.id) : [];
    const n = (x, max) => Math.min(max, Math.max(0, Math.floor(Number(x)) || 0));
    const hs = window.HISTOIRES ? HISTOIRES.liste.map(x => x.id) : [], nr = window.PARCOURS ? PARCOURS.REPETER.length : 0;
    j.anglais = { situations:Array.isArray(o.situations) ? [...new Set(o.situations.filter(x => ids.includes(x)))] : [], victoires:n(o.victoires, 1e5), battles:n(o.battles, 1e5), dictees:n(o.dictees, 1e5),
      histoires:Array.isArray(o.histoires) ? [...new Set(o.histoires.filter(x => hs.includes(x)))] : [],
      repete:Array.isArray(o.repete) ? [...new Set(o.repete.filter(x => Number.isInteger(x) && x >= 0 && x < nr))] : [],
      niveaux:Array.isArray(o.niveaux) ? [...new Set(o.niveaux.filter(x => [1, 2, 3].includes(x)))].sort() : [],
      revisions:Array.isArray(o.revisions) ? [...new Set(o.revisions.filter(x => Number.isInteger(x) && x > 0))].sort((a, b) => a - b).slice(-400) : [] };
    return j.anglais;
  }
  const traduire = fr => fr ? '<details class="trad"><summary>🇫🇷 Traduire</summary><p>' + esc(fr) + '</p></details>' : '';
  function coinAnglais(){
    piege = battle = situation = dictee = qz = lecture = rep1 = null; arreterMicro(); arreterBeat(); if(salon && !salon.partie) quitterSalon();
    if(!piegesDispo() || !A_EN()) return pieges();
    const e = etatAnglais(), P = window.PIEGES, m = P.maitrises(etatPieges());
    const prog = window.PARCOURS ? PARCOURS.progression(statsAnglais(), e.niveaux) : [], cour = prog.find(n => !n.valide) || prog[prog.length - 1];
    const bj = window.BLAGUES_EN && BLAGUES_EN.duJour(), dus = revisionDue().length, serieJ = serieRevisions();
    const carte = (a, icone, titre, texte, info) => '<button class="carte-anglais" data-a="' + a + '"><span class="ic">' + icone + '</span><strong>' + titre + '</strong><small>' + texte + '</small><em>' + info + '</em></button>';
    poser(barre('accueil') + '<main class="coin-anglais"><div class="ami-moyen">' + ami('content') + '</div>' +
      TXT('<h2>🇬🇧 Le coin anglais</h2><p class="pieges-intro">Pour parler anglais pour de vrai… en rigolant.</p>') +
      (cour ? '<button class="carte-parcours" data-a="parcours"><span class="ic">' + cour.icone + TXT('</span><span><strong>Mon parcours · Niveau ') + cour.n + ' : ' + esc(cour.titre) + '</strong><small>' + (cour.valide ? TXT('🎓 Tous les niveaux réussis !') : cour.pret ? TXT('🎓 Prêt pour l’examen !') : cour.etapes.filter(x => x.ok).length + '/' + cour.etapes.length + TXT(' étapes')) + '</small></span><span class="barre-prog"><i style="width:' + Math.round(100 * cour.etapes.filter(x => x.ok).length / cour.etapes.length) + '%"></i></span></button>' : '') +
      TXT('<button class="carte-revision" data-a="revision">🔁 <strong>Ma révision du jour</strong> <small>') + (dus ? dus + ' chose' + (dus > 1 ? 's' : '') + TXT(' à revoir · 5 minutes') : TXT('De nouveaux pièges t’attendent')) + (serieJ > 1 ? ' · 🔥 ' + serieJ + TXT(' jours de suite') : '') + '</small></button>' +
      (bj ? TXT('<div class="blague-jour"><p><strong>😂 La blague anglaise du jour</strong></p><p class="bj-q" lang="en">') + esc(bj.q) + ' <button class="bouton-rond" data-a="bj-ecouter" aria-label="Écouter la blague">🔊</button></p>' +
        TXT('<details><summary>Réponse…</summary><p class="bj-r" lang="en">') + esc(bj.r) + '</p><p class="petit">🇫🇷 ' + esc(bj.fr) + '</p><p class="bj-jeu">💡 ' + esc(bj.jeu) + '</p></details></div>' : '') +
      '<div class="cartes-anglais">' +
      carte('pieges', '🪤', TXT('Les pièges'), TXT('Les erreurs que font tous les francophones'), '🏅 ' + m + '/' + P.liste.length) +
      carte('situations', '☕', TXT('Situations de la vie'), TXT('Café, école, magasin… choisis ta réplique'), '✅ ' + e.situations.length + '/' + A_EN().SITUATIONS.length) +
      (jeuxEcouteCaches() ? '' : carte('dictee', '✍️', TXT('Dictée rigolote'), TXT('Plumo parle, tu écris (attention aux mots jumeaux !)'), '✍️ ' + e.dictees + ' phrase' + (e.dictees > 1 ? 's' : '') + ' parfaite' + (e.dictees > 1 ? 's' : ''))) +
      carte('histoires', '📖', 'Mini-histoires', TXT('Lis et écoute de petites histoires du village'), '📖 ' + e.histoires.length + '/' + (window.HISTOIRES ? HISTOIRES.liste.length : 0)) +
      (jeuxEcouteCaches() ? '' : carte('repeter', '🗣️', TXT('Répète après Plumo'), TXT('Dis la phrase, réécoute-toi, compare'), '🗣️ ' + e.repete.length + '/' + (window.PARCOURS ? PARCOURS.REPETER.length : 0))) +
      carte('battle', '🎤', 'Battles', TXT('Rap, vannes, en famille, entre potes, en direct'), '🏆 ' + e.victoires + ' victoire' + (e.victoires > 1 ? 's' : '')) +
      cartesModules('anglais') + TXT('</div><h3 class="section-anglais">😂 Pour rire (et apprendre)</h3><div class="cartes-anglais">') +
      carte('trompe', '🦉', TXT('Plumo se trompe exprès'), TXT('Trouve ses fautes et corrige-le !'), '🔔') +
      (jeuxEcouteCaches() ? '' : carte('oreilles', '👂', TXT('Le jeu des oreilles'), TXT('ship ou sheep ? three ou tree ?'), '👂')) +
      carte('vraifaux', '🤥', 'True or false?', TXT('Plumo raconte des bêtises…'), '🤥') +
      carte('avent', '🎄', TXT('Calendrier de l’Avent'), 'Un mot d’hiver par jour', '🎄 ' + (Array.isArray(J().avent) ? J().avent.length : 0) + '/24') +
      carte('betisier', '📺', TXT('Le bêtisier'), TXT('Le best-of de tes vannes de la semaine'), '📺') +
      carte('maison', '🏠', TXT('Ma maison'), TXT('Dépense tes plumes, apprends les meubles'), '🪶 ' + J().plumes) +
      TXT('</div><p><button class="moyen" data-a="parents">👪 Espace parents</button></p></main>'));
  }

  // Battle : 3 manches. Plumo se vante ; on choisit la réplique juste et drôle. Point seulement du premier coup.
  let battle = null;
  // ── v5.86 : Clash libre — on se vanne, tout simplement (un téléphone, chacun son tour, en anglais ET en français) ──
  let clashL = null;
  // v5.99.3 : français pour l'interface française, anglais pour 'en', sinon la traduction (js/textes-ecrans.js) ou à défaut l'anglais.
  const lc = (fr, en) => base.ui === 'fr' ? fr : base.ui === 'en' ? en : (window.TRAD_ECRANS && TRAD_ECRANS[fr] ? TXT(fr) : en); // v5.95 : Clash libre en français pour l'interface française, sinon en anglais
  function clashLibre(){
    const V = window.VANNES_LIBRES; if(!V) return battleMenu();
    const n = (base.clashNoms || ['', '']);
    reverifierPaquet();
    poser(barre('battle') + '<main class="battle-ecran clash-libre"><h2>🗯️ ' + lc('Clash libre', 'Free roast battle') + '</h2>' +
      '<p>' + lc('On se vanne, c’est tout ! Chacun son tour, on se passe le téléphone. Chaque vanne est en <strong>anglais</strong> et en français : tu chambres <em>et</em> tu apprends.', 'Just roast each other! Take turns and pass the phone. Every roast is in <strong>English</strong>: you tease <em>and</em> you learn.') + '</p>' +
      '<p class="aide">👊 ' + lc('Règle d’or : on vise ce que fait l’autre (le jeu, les devoirs, le téléphone…), <strong>jamais qui il est</strong> : ni physique, ni famille, ni origine.', 'Golden rule: roast what the other person does (gaming, homework, phone…), <strong>never who they are</strong>: no looks, no family, no origins.') + '</p>' +
      '<p><label>' + lc('Joueur 1', 'Player 1') + ' <input id="cl-n1" maxlength="16" value="' + esc(n[0]) + '" placeholder="' + lc('Joueur 1', 'Player 1') + '"></label></p>' +
      '<p><label>' + lc('Joueur 2', 'Player 2') + ' <input id="cl-n2" maxlength="16" value="' + esc(n[1]) + '" placeholder="' + lc('Joueur 2', 'Player 2') + '"></label></p>' +
      '<p class="piege-consigne">' + lc('Combien de vannes chacun ?', 'How many roasts each?') + '</p><div class="actions serrees">' +
      [3, 5, 8].map(k => '<button class="moyen' + (k === 5 ? ' plein' : '') + '" data-a="clash-libre-go" data-v="' + k + '">' + k + ' ' + lc('vannes', 'roasts') + '</button>').join('') + '</div>' +
      '<div class="actions serrees"><button class="moyen" data-a="clash-libre-paquet">➕ ' + lc('Ajouter des vannes au paquet', 'Add roasts to the deck') + ' (⭐ ' + paquet().length + ')</button></div></main>');
  }
  function clashLibreGo(nb){
    const V = window.VANNES_LIBRES; if(!V) return battleMenu();
    // Revanche : plus de champs à l'écran, on reprend les noms gardés.
    const garde = base.clashNoms || [], nom = (id, k) => { const x = $(id); const v = String(x ? x.value : (garde[k] || '')).replace(/[<>]/g, '').trim().slice(0, 16); return v && V.juger(v).ok ? v : TXT('Joueur ') + (k + 1); };
    const j = [nom('#cl-n1', 0), nom('#cl-n2', 1)];
    base.clashNoms = j; garder();
    clashL = { j, aura:[0, 0], tour:0, total:Math.max(1, Math.min(8, Number(nb) || 5)) * 2, jouees:[], main:V.tirer([], null, paquet()), vanne:null, ecrire:false, msg:'' };
    clashLibreTour();
  }
  function clashLibreTour(){
    const c = clashL, V = window.VANNES_LIBRES; if(!c || !V) return clashLibre();
    if(c.tour >= c.total) return clashLibreFin();
    const moi = c.tour % 2, lui = 1 - moi;
    const cartes = c.main.map((v, k) => '<button class="carte-anglais clash-carte" data-a="clash-libre-carte" data-v="' + k + '"><span class="ic">' + v.ic + '</span>' + (v.en ? '<strong lang="en">' + esc(v.en) + '</strong>' + (base.ui === 'fr' ? '<small>🇫🇷 ' + esc(v.fr) + '</small>' : '') : '<strong>' + esc(v.fr) + '</strong>') + '</button>').join('');
    poser(barre('battle') + '<main class="battle-ecran clash-libre"><p class="piege-cat">🗯️ ' + lc('Vanne', 'Roast') + ' ' + (Math.floor(c.tour / 2) + 1) + '/' + (c.total / 2) + ' · ✨ ' + esc(c.j[0]) + ' ' + c.aura[0] + ' – ' + c.aura[1] + ' ' + esc(c.j[1]) + '</p>' +
      '<h2>🎤 ' + esc(c.j[moi]) + lc(', envoie ta vanne à ', ', roast ') + esc(c.j[lui]) + ' !</h2>' +
      (c.ecrire
        ? '<p><label>' + lc('Ta vanne (en anglais ou en français)', 'Your roast (in English)') + ' <textarea id="cl-texte" maxlength="140" rows="3"></textarea></label></p>' +
          '<p class="aide" id="cl-msg" role="status" aria-live="polite">' + esc(c.msg) + '</p>' +
          '<div class="actions serrees"><button class="moyen plein" data-a="clash-libre-envoyer">🎤 ' + lc('Envoyer', 'Send') + '</button><button class="moyen" data-a="clash-libre-ecrire">🃏 ' + lc('Revenir aux cartes', 'Back to the cards') + '</button></div>'
        : '<div class="cartes-anglais">' + cartes + '</div><div class="actions serrees"><button class="moyen" data-a="clash-libre-melange">🔁 ' + lc('Autres vannes', 'Other roasts') + '</button><button class="moyen" data-a="clash-libre-ecrire">✍️ ' + lc('J’écris la mienne', 'Write my own') + '</button></div>') +
      '</main>');
  }
  function clashLibreEnvoyer(v){
    const c = clashL; if(!c) return clashLibre();
    c.vanne = v; c.ecrire = false; c.msg = '';
    if(v.cat) c.jouees.push(V_L().cle(v));
    const moi = c.tour % 2, lui = 1 - moi, V = window.VANNES_LIBRES;
    poser(barre('battle') + '<main class="battle-ecran clash-libre centre"><p class="piege-cat">🎤 ' + esc(c.j[moi]) + ' → ' + esc(c.j[lui]) + '</p>' +
      '<div class="bulle-ami clash-vanne">' + (v.en ? '<p class="piege-fr" lang="en">« ' + esc(v.en) + ' »</p>' + (base.ui === 'fr' ? '<p class="petit">🇫🇷 ' + esc(v.fr) + '</p>' : '') : '<p class="piege-fr">« ' + esc(v.fr) + ' »</p>') + '</div>' +
      '<p class="piege-consigne">📱 ' + lc('Passe le téléphone à', 'Pass the phone to') + ' <strong>' + esc(c.j[lui]) + '</strong>. ' + lc('Alors, ta réaction ?', 'So, your reaction?') + '</p>' +
      '<div class="actions serrees">' + V.REACTIONS.map(r => '<button class="moyen" data-a="clash-libre-reaction" data-v="' + r[0] + '">' + r[1] + ' ' + esc(r[2]) + '</button>').join('') + '</div>' +
      (!v.cat ? '<div class="actions serrees"><button class="moyen" data-a="clash-libre-garder">➕ ' + lc('Garder cette vanne dans le paquet', 'Keep this roast in the deck') + '</button></div><p class="aide" id="cl-garde" role="status" aria-live="polite"></p>' : '') + '</main>');
    if(v.en) direPhrase(v.en, 'en');
  }
  function clashLibreReaction(id){
    const c = clashL, V = window.VANNES_LIBRES; if(!c || !c.vanne) return clashLibre();
    const r = V.REACTIONS.find(x => x[0] === id); if(!r) return;
    const moi = c.tour % 2; c.aura[moi] = Math.max(0, c.aura[moi] + r[3]);
    if(r[0] === 'feu' || r[0] === 'rire') bruit('juste');
    // « Trop méchant » sur une vanne du paquet : elle en sort (c'est la famille qui a le dernier mot).
    let sortie = false;
    if(r[0] === 'mechant' && c.vanne.perso){ const avant = paquet().length; base.clashPerso = paquet().filter(x => x.fr !== c.vanne.fr); sortie = paquet().length < avant; garder(); }
    c.tour++; c.vanne = null; c.main = V.tirer(c.jouees, null, paquet());
    if(r[0] === 'mechant'){ c.msg = ''; poser(barre('battle') + '<main class="battle-ecran clash-libre centre"><h2>🚫 ' + lc('Carton jaune', 'Yellow card') + '</h2><p>' + lc('On se chambre, on ne se blesse pas : on vise ce que l’autre fait, pas qui il est. −2 d’aura.', 'We tease, we don’t hurt: roast what they do, not who they are. −2 aura.') + '</p>' + (sortie ? '<p>⭐ ' + lc('Cette vanne sort du paquet.', 'This roast leaves the deck.') + '</p>' : '') + '<button class="moyen plein" data-a="clash-libre-suite">' + lc('Continuer', 'Continue') + ' →</button></main>'); return; }
    clashLibreTour();
  }
  function clashLibreFin(){
    const c = clashL, V = window.VANNES_LIBRES; if(!c) return clashLibre();
    const g = c.aura[0] === c.aura[1] ? -1 : c.aura[0] > c.aura[1] ? 0 : 1;
    const apprises = [...new Set(c.jouees)].map(k => V.toutes(paquet()).find(v => V.cle(v) === k)).filter(v => v && v.en);
    J().plumes += 2; garder();
    poser(barre('battle') + '<main class="centre battle-fin clash-libre"><div class="ami-moyen">' + ami('fete') + '</div>' +
      '<h2>' + (g < 0 ? lc('🤝 Égalité parfaite ! Aura partagée.', '🤝 Perfect tie! Shared aura.') : '🏆 ' + esc(c.j[g]) + lc(' gagne le clash !', ' wins the battle!')) + '</h2>' +
      '<p class="battle-score">✨ ' + esc(c.j[0]) + ' ' + c.aura[0] + ' – ' + c.aura[1] + ' ' + esc(c.j[1]) + '</p>' +
      '<p>' + esc(c.j[0]) + ' : ' + esc(V.titre(c.aura[0])) + ' · ' + esc(c.j[1]) + ' : ' + esc(V.titre(c.aura[1])) + '</p>' +
      (apprises.length ? '<details class="contexte-exo" open><summary>📚 ' + lc('L’anglais que vous venez d’apprendre', 'The English you just learned') + '</summary><ul>' + apprises.map(v => '<li><strong lang="en">' + esc(v.en) + '</strong>' + (base.ui === 'fr' ? ' — ' + esc(v.fr) : '') + '</li>').join('') + '</ul></details>' : '') +
      '<div class="actions serrees"><button class="moyen plein" data-a="clash-libre-go" data-v="' + (c.total / 2) + '">🔁 ' + lc('Revanche', 'Rematch') + '</button><button class="moyen" data-a="clash-libre">🗯️ ' + lc('Changer de joueurs', 'Change players') + '</button><button class="moyen" data-a="battle">🎤 ' + lc('Autres battles', 'Other battles') + '</button></div></main>');
    clashL = null;
  }

  // ── v5.87 : ⭐ le paquet de vannes ajoutées par les joueurs, trié par le juge de Plumo puis par l'IA du serveur ──
  const V_L = () => window.VANNES_LIBRES;
  const paquet = () => Array.isArray(base.clashPerso) ? base.clashPerso.filter(v => v && typeof v.fr === 'string') : [];
  let paquetMsg = '', paquetVerif = false;
  // Réponse de l'IA : { garder, raison, en_corrige } ; null si le serveur ne répond pas.
  async function jugerParIA(fr, en){
    if(!CONFIG.API_VANNE_JUGE || typeof fetch !== 'function') return null;
    try{
      const r = await fetch(CONFIG.API_VANNE_JUGE, { method:'POST', cache:'no-store', headers:{ 'Content-Type':'application/json' }, body:JSON.stringify({ fr, en, ...codePlumes() }) });
      if(!r.ok) return null;
      const d = await r.json(); return d && typeof d.garder === 'boolean' ? d : null;
    }catch(e){ return null; }
  }
  // Ajoute une vanne : règles d'abord (tout de suite), puis l'IA. Sans serveur : règles seules. Serveur muet : en attente.
  async function ajouterAuPaquet(fr, en){
    const V = V_L(); fr = String(fr || '').replace(/\s+/g, ' ').trim().slice(0, 140); en = String(en || '').replace(/\s+/g, ' ').trim().slice(0, 140);
    if(!fr) return { ok:false, msg:TXT('✍️ Écris la vanne en français (l’anglais est en option).') };
    for(const t of [fr, en]) if(t){ const j = V.juger(t); if(!j.ok) return { ok:false, msg:TXT('🛑 Le juge de Plumo refuse : ') + j.raisons.join(', ') + '.' }; }
    if(paquet().some(x => x.fr.toLowerCase() === fr.toLowerCase())) return { ok:false, msg:TXT('⭐ Elle est déjà dans le paquet.') };
    if(paquet().length >= 100) return { ok:false, msg:TXT('Le paquet est plein (100 vannes) : retire-en une d’abord.') };
    let etat = 'regles', msg = TXT('✅ Ajoutée ! Vérifiée par le juge de Plumo.');
    if(CONFIG.API_VANNE_JUGE){
      const ia = await jugerParIA(fr, en);
      if(ia && !ia.garder) return { ok:false, msg:TXT('🤖 L’IA ne la met pas dans le paquet') + (ia.raison ? ' : ' + ia.raison : '.') };
      if(ia){ etat = 'ok'; msg = TXT('🤖✅ L’IA valide, elle entre dans le paquet !'); if(ia.en_corrige && V.juger(ia.en_corrige).ok){ en = ia.en_corrige; msg += TXT(' Anglais corrigé : « ') + en + ' ».'; } }
      else { etat = 'attente'; msg = TXT('⏳ L’IA ne répond pas pour l’instant : la vanne attend sa vérification avant de sortir en jeu.'); }
    }
    base.clashPerso = paquet().concat([{ fr, en, etat }]); garder();
    return { ok:true, msg };
  }
  // À l'ouverture du Clash libre : les vannes en attente repassent devant l'IA (5 au plus).
  async function reverifierPaquet(){
    if(paquetVerif || !CONFIG.API_VANNE_JUGE) return; paquetVerif = true;
    try{
      for(const v of paquet().filter(x => x.etat === 'attente').slice(0, 5)){
        const ia = await jugerParIA(v.fr, v.en); if(!ia) break;
        base.clashPerso = ia.garder ? paquet().map(x => x === v ? Object.assign({}, x, { etat:'ok', en:ia.en_corrige && V_L().juger(ia.en_corrige).ok ? ia.en_corrige : x.en }) : x) : paquet().filter(x => x !== v);
        garder();
      }
    } finally { paquetVerif = false; }
  }
  function clashPaquet(){
    const p = paquet(), etiquette = { ok:TXT('🤖✅ validée par l’IA'), regles:TXT('✅ juge de Plumo'), attente:'⏳ attend l’IA' };
    poser(barre('battle') + TXT('<main class="battle-ecran clash-libre"><h2>⭐ Ajouter des vannes au paquet</h2>') +
      TXT('<p>Vos vannes à vous sortiront dans le Clash libre. ') + (CONFIG.API_VANNE_JUGE ? TXT('🤖 L’IA trie : elle refuse celles qui visent la personne et corrige l’anglais.') : TXT('Le juge de Plumo les vérifie (l’IA s’activera avec le serveur).')) + '</p>' +
      TXT('<p><label>La vanne en français <textarea id="cl-fr" maxlength="140" rows="2"></textarea></label></p>') +
      TXT('<p><label>En anglais (si tu sais, sinon laisse vide) <input id="cl-en" maxlength="140" lang="en"></label></p>') +
      TXT('<div class="actions serrees"><button class="moyen plein" data-a="clash-libre-ajouter">➕ Proposer</button><button class="moyen" data-a="clash-libre">← Retour au clash</button></div>') +
      '<p class="aide" id="cl-paquet-msg" role="status" aria-live="polite">' + esc(paquetMsg) + '</p>' +
      (p.length ? '<h3>⭐ Nos vannes (' + p.length + ')</h3><ul class="liste-paquet">' + p.map((v, k) => '<li><strong>' + esc(v.fr) + '</strong>' + (v.en ? ' <span lang="en">— ' + esc(v.en) + '</span>' : '') + ' <small>' + (etiquette[v.etat] || '') + '</small> <button class="bouton-rond" data-a="clash-libre-retirer" data-v="' + k + '" aria-label="Retirer cette vanne">🗑️</button></li>').join('') + '</ul>' : '') +
      '</main>');
    paquetMsg = '';
  }

  function battleMenu(){
    battle = null; arreterBeat(); quitterSalon();
    if(!piegesDispo() || !A_EN()) return pieges();
    poser(barre('anglais') + TXT('<main class="coin-anglais"><h2>🎤 Battle de vannes</h2><div class="cartes-anglais">') +
      (window.VANNES_LIBRES ? TXT('<button class="carte-anglais" data-a="clash-libre"><span class="ic">🗯️</span><strong>Clash libre</strong><small>On se vanne, c’est tout ! Entre potes, en anglais et en français</small></button>') : '') +
      TXT('<button class="carte-anglais" data-a="battle-go" data-v="ami"><span class="ic">🦉</span><strong>Contre Plumo</strong><small>3 manches : cloue-lui le bec !</small></button>') +
      TXT('<button class="carte-anglais" data-a="battle-go" data-v="famille"><span class="ic">🦊🐼</span><strong>En famille</strong><small>Deux équipes, chacun son tour, Plumo arbitre</small></button>') +
      TXT('<button class="carte-anglais" data-a="invente"><span class="ic">✍️</span><strong>Invente ta vanne</strong><small>Fabrique une vanne en anglais pour Plumo</small></button>') +
      TXT('<button class="carte-anglais" data-a="rap"><span class="ic">🎤🔥</span><strong>Battle de rap</strong><small>Sur scène : complète les rimes de Plumo, fais crier le public !</small></button>') +
      TXT('<button class="carte-anglais" data-a="tournoi"><span class="ic">👨‍👩‍👧</span><strong>Battle en famille</strong><small>2 à 4 joueurs, chacun son tour</small></button>') +
      TXT('<button class="carte-anglais" data-a="defi-pote"><span class="ic">📨</span><strong>Défier un pote</strong><small>Par lien : mêmes questions, on compare</small></button>') +
      TXT('<button class="carte-anglais" data-a="salon"><span class="ic">🛸</span><strong>Salon en direct</strong><small>Retrouve tes potes et battle en même temps</small></button></div></main>'));
  }
  function battleGo(mode){
    if(!piegesDispo() || !A_EN()) return pieges();
    const fam = mode === 'famille';
    // 30 manches (anglais.js + clash.js) : on en tire 3 (4 en famille), jamais deux fois la même dans une battle.
    const toutes = A_EN().BATTLE.concat(window.CLASH ? CLASH.MANCHES : []);
    battle = { manches:A_EN().melanger(toutes).slice(0, fam ? 4 : 3), i:0, toi:0, ami:0, essai:0, fini:false, fam, eq:[0, 0], serie:0, foule:[] };
    afficherBattle();
  }
  function afficherBattle(){
    const b = battle; if(!b) return coinAnglais();
    if(b.i >= b.manches.length && b.fam){
      const g = b.eq[0] === b.eq[1] ? -1 : b.eq[0] > b.eq[1] ? 0 : 1;
      poser(barre('anglais') + '<main class="centre battle-fin"><div class="ami-moyen">' + ami('fete') + '</div>' +
        '<h2>' + (g < 0 ? TXT('Égalité ! Plumo offre des plumes à tout le monde. 🤝') : TXT('Victoire de l’équipe ') + ['🦊', '🐼'][g] + ' !') + '</h2>' +
        '<p class="battle-score">🦊 ' + b.eq[0] + ' – ' + b.eq[1] + TXT(' 🐼</p><p lang="en">🦉 « What a battle! You both speak great English! »</p><p>Quelle battle ! Vous parlez tous très bien anglais !</p>') +
        '<div class="actions serrees"><button class="moyen plein" data-a="battle-go" data-v="famille">🔁 Revanche</button><button class="moyen" data-a="battle">🎤 Autres battles</button></div></main>');
      return;
    }
    if(b.i >= b.manches.length){
      const e = etatAnglais(); e.battles++; const gagne = b.toi > b.ami; if(gagne) e.victoires++; garder();
      poser(barre('anglais') + '<main class="centre battle-fin"><div class="ami-moyen">' + ami(gagne ? 'surpris' : 'fete') + '</div>' +
        '<h2>' + (b.toi === 3 ? TXT('Victoire écrasante ! 🏆') : gagne ? TXT('Tu gagnes la battle ! 🎤') : TXT('Plumo gagne… de justesse ! 🦉')) + '</h2>' +
        '<p class="battle-score">Toi ' + b.toi + ' – ' + b.ami + ' Plumo</p>' +
        '<p lang="en">🦉 « ' + (gagne ? 'OK, you win… Rematch tomorrow?' : 'I win! But your English is getting better!') + ' »</p>' +
        '<p>' + (gagne ? TXT('D’accord, tu as gagné… Revanche demain ?') : TXT('J’ai gagné ! Mais ton anglais progresse !')) + '</p>' +
        '<div class="actions serrees"><button class="moyen plein" data-a="battle-go" data-v="ami">🔁 Revanche</button><button class="moyen" data-a="battle">🎤 Autres battles</button></div></main>');
      return;
    }
    const m = b.manches[b.i]; b.essai = 0; b.fini = false;
    b.options = A_EN().melanger([m.bon.en].concat(m.faux.map(f => f.en)));
    const finale = b.i === b.manches.length - 1, moy = b.foule.length ? Math.round(b.foule.reduce((x, y) => x + y, 0) / b.foule.length) : 0;
    poser(barre('battle') + '<main class="battle-ecran' + (finale ? ' finale' : '') + '"><p class="piege-cat">' + (finale ? '🏆 FINALE · ' : '') + TXT('🎤 Manche ') + (b.i + 1) + '/' + b.manches.length + ' · ' + (b.fam ? '🦊 ' + b.eq[0] + ' – ' + b.eq[1] + TXT(' 🐼 · <strong>À l’équipe ') + ['🦊', '🐼'][b.i % 2] + ' !</strong>' : 'Toi ' + b.toi + ' – ' + b.ami + ' Plumo') + '</p>' +
      '<div class="piege-haut"><div class="ami-moyen" id="ami-battle">' + ami('content') + '</div>' +
      '<div class="bulle-ami"><p class="piege-fr" lang="en">« ' + esc(m.ami) + ' » <button class="bouton-rond" data-a="battle-ecouter" aria-label="Réécouter Plumo">🔊</button></p>' + traduire(m.fr) + '</div></div>' +
      (b.foule.length ? '<div class="clash-public" aria-label="Énergie du public">📣 Public <span class="jauge"><span style="width:' + moy + '%"></span></span>' + (b.serie > 1 ? ' <strong>🔥 x' + b.serie + '</strong>' : '') + '</div>' : '') +
      TXT('<p class="piege-consigne">Ta réplique (juste ET drôle) :</p>') +
      '<div class="piege-options">' + b.options.map((o, i) => '<button class="moyen piege-opt" data-a="battle-rep" data-v="' + i + '" lang="en">' + esc(o) + '</button>').join('') + '</div>' +
      '<div class="piege-retour" id="battle-retour" role="status" aria-live="polite"></div></main>');
    direPhrase(m.ami, 'en');
  }
  function repondreBattle(i){
    const b = battle; if(!b || b.fini) return;
    const m = b.manches[b.i], choix = b.options[i], bouton = document.querySelectorAll('.piege-opt')[i]; if(choix == null || !bouton || bouton.disabled) return;
    const r = $('#battle-retour'), a = $('#ami-battle');
    if(choix === m.bon.en){
      b.fini = true; if(b.fam){ if(b.essai === 0) b.eq[b.i % 2]++; } else if(b.essai === 0){ b.toi++; J().plumes += 2; } else b.ami++;
      garder(); bouton.classList.add('ok'); document.querySelectorAll('.piege-opt').forEach(x => { x.disabled = true; });
      const aie = A_EN().AIE[Math.floor(Math.random() * A_EN().AIE.length)], C = window.CLASH;
      // Public et séries : la foule s'enflamme pour les punchlines du premier coup.
      if(C) b.foule.push(C.energie(b.essai));
      b.serie = b.essai === 0 ? b.serie + 1 : 0;
      const ovation = C && b.essai === 0 ? '<p class="clash-foule">' + esc(C.FOULE[Math.floor(Math.random() * C.FOULE.length)]) + (C.SERIE[Math.min(4, b.serie)] && !b.fam ? ' <strong>' + esc(C.SERIE[Math.min(4, b.serie)]) + '</strong>' : '') + '</p>' : '';
      if(a) a.innerHTML = ami(b.serie >= 3 ? 'choque' : 'surpris');
      if(r) r.innerHTML = '<p class="piege-bravo">🎤 ' + (b.essai === 0 ? (b.fam ? TXT('Bien envoyé ! Point pour l’équipe ') + ['🦊', '🐼'][b.i % 2] + '.' : TXT('Bien envoyé ! Point pour toi.')) : (b.fam ? TXT('Trouvé ! Mais pas de point cette fois.') : TXT('Trouvé ! Mais le point va à Plumo cette fois.'))) + '</p>' +
        '<p class="piege-bon" lang="en">« ' + esc(m.bon.en) + ' »</p><p class="petit">🇫🇷 ' + esc(m.bon.fr) + '</p>' +
        ovation + '<p lang="en">🦉 « ' + esc(aie.en) + ' » <small>(' + esc(aie.fr) + ')</small></p>' +
        '<button class="moyen plein" data-a="battle-suivant">' + (b.i + 1 < b.manches.length ? TXT('Manche suivante →') : TXT('Résultat')) + '</button>';
      bruit('juste'); direPhrase(m.bon.en, 'en');
    } else {
      b.essai++; bouton.disabled = true; bouton.classList.add('ko');
      const f = m.faux.find(x => x.en === choix);
      if(a) a.innerHTML = ami('fete');
      const C = window.CLASH, rip = C ? C.RIPOSTES[(b.i * 3 + b.essai) % C.RIPOSTES.length] : null; b.serie = 0;
      // Plumo contre-attaque (sur la réplique ratée), puis la vanne explique l'erreur d'anglais.
      if(r) r.innerHTML = (rip ? '<p class="clash-riposte" lang="en">🦉 « ' + esc(rip.en) + ' » <small lang="fr">(' + esc(rip.fr) + ')</small></p>' : '') +
        '<p class="piege-vanne">😂 ' + esc(vannePiquante(f ? f.vanne : 'Presque !')) + TXT('</p><p class="petit">Essaie une autre réplique !</p>');
      if(rip && niveauHumour() > 0) direPhrase(rip.en, 'en');
      bruit('faux');
    }
  }

  // Situations : petits dialogues de la vie. On écoute, on choisit sa réplique ; erreur = vanne + on réessaie.
  let situation = null;
  function situations(){
    situation = null;
    if(!piegesDispo() || !A_EN()) return pieges();
    const e = etatAnglais();
    poser(barre('anglais') + TXT('<main class="coin-anglais"><h2>☕ Situations de la vie</h2><p class="pieges-intro">Écoute, puis choisis ce que tu réponds. Comme en vrai !</p><div class="cartes-anglais">') +
      A_EN().SITUATIONS.map(x => '<button class="carte-anglais" data-a="situation-go" data-v="' + x.id + '"><span class="ic">' + x.icone + '</span><strong>' + esc(x.titre) + '</strong><em>' + (e.situations.includes(x.id) ? TXT('✅ réussie') : TXT('▶ à jouer')) + '</em></button>').join('') +
      '</div></main>');
  }
  function situationGo(id){
    const x = A_EN() && A_EN().SITUATIONS.find(s => s.id === id); if(!x) return situations();
    situation = { x, i:0, essai:0, fini:false, premiers:0 }; afficherSituation();
  }
  function afficherSituation(){
    const sn = situation; if(!sn) return situations();
    const x = sn.x;
    if(sn.i >= x.etapes.length){
      const e = etatAnglais(); if(!e.situations.includes(x.id)) e.situations.push(x.id); J().plumes += sn.premiers; garder();
      poser(barre('situations') + '<main class="centre"><div class="ami-moyen">' + ami('fete') + '</div><h2>' + x.icone + ' ' + esc(x.titre) + TXT(' : réussi !</h2>') +
        '<p>' + sn.premiers + '/' + x.etapes.length + TXT(' du premier coup') + (sn.premiers ? ' · ⭐ +' + sn.premiers + ' plumes' : '') + '</p>' +
        TXT('<p>Tu sais maintenant te débrouiller dans cette situation en anglais. 🎉</p>') +
        '<div class="actions serrees"><button class="moyen plein" data-a="situations">☕ Autres situations</button><button class="moyen" data-a="anglais">🇬🇧 Coin anglais</button></div></main>');
      return;
    }
    const et = x.etapes[sn.i]; sn.essai = 0; sn.fini = false;
    sn.options = A_EN().melanger([et.bon].concat(et.faux.map(f => f.en)));
    const comprendre = et.mode === 'comprendre';
    poser(barre('situations') + '<main class="battle-ecran"><p class="piege-cat">' + x.icone + ' ' + esc(x.titre) + ' · ' + (sn.i + 1) + '/' + x.etapes.length + '</p>' +
      (sn.i === 0 && x.intro ? '<p class="situation-intro">📍 ' + esc(x.intro) + '</p>' : '') +
      (et.dit ? '<div class="bulle-ami"><p class="piege-fr"><span class="qui">' + esc(x.qui) + ' :</span> <span lang="en">« ' + esc(et.dit) + ' »</span> <button class="bouton-rond" data-a="situation-ecouter" aria-label="Réécouter">🔊</button></p>' + (comprendre ? '' : traduire(et.fr)) + '</div>' : '') +
      '<p class="piege-consigne">' + (comprendre ? esc(et.question) : TXT('Tu réponds :')) + '</p>' +
      '<div class="piege-options">' + sn.options.map((o, i) => '<button class="moyen piege-opt" data-a="situation-rep" data-v="' + i + '"' + (comprendre ? '' : ' lang="en"') + '>' + esc(o) + '</button>').join('') + '</div>' +
      '<div class="piege-retour" id="situation-retour" role="status" aria-live="polite"></div></main>');
    if(et.dit) direPhrase(et.dit, 'en');
  }
  function repondreSituation(i){
    const sn = situation; if(!sn || sn.fini) return;
    const et = sn.x.etapes[sn.i], choix = sn.options[i], bouton = document.querySelectorAll('.piege-opt')[i]; if(choix == null || !bouton || bouton.disabled) return;
    const r = $('#situation-retour');
    if(choix === et.bon){
      sn.fini = true; if(sn.essai === 0) sn.premiers++;
      bouton.classList.add('ok'); document.querySelectorAll('.piege-opt').forEach(x => { x.disabled = true; });
      if(r) r.innerHTML = '<p class="piege-bravo">✅ ' + (et.mode === 'comprendre' ? 'Bien compris !' : TXT('Parfait, c’est ce qu’on dit !')) + '</p>' + (et.fr && et.mode === 'comprendre' ? '<p class="petit">🇬🇧 « ' + esc(et.dit) + ' » = ' + esc(et.fr) + '</p>' : '') +
        '<button class="moyen plein" data-a="situation-suivant">' + (sn.i + 1 < sn.x.etapes.length ? 'Suite →' : TXT('Fin de la scène')) + '</button>';
      bruit('juste'); if(et.mode !== 'comprendre') direPhrase(et.bon, 'en');
    } else {
      sn.essai++; bouton.disabled = true; bouton.classList.add('ko');
      const f = et.faux.find(x => x.en === choix);
      if(r) r.innerHTML = '<p class="piege-vanne">😂 ' + esc(vannePiquante(f ? f.vanne : 'Presque !')) + '</p><p class="petit">Essaie encore !</p>';
      bruit('faux');
    }
  }

  // Dictée : 5 phrases. Écouter (normal ou lentement), écrire, vérifier. Correction tolérante et vanne sur les homophones.
  let dictee = null;
  function dicteeGo(){
    if(!piegesDispo() || !A_EN()) return pieges();
    dictee = { liste:A_EN().melanger(A_EN().DICTEE).slice(0, 5), i:0, parfaites:0, fait:false }; afficherDictee();
  }
  function afficherDictee(){
    const d = dictee; if(!d) return coinAnglais();
    if(d.i >= d.liste.length){
      poser(barre('anglais') + '<main class="centre"><div class="ami-moyen">' + ami('fete') + TXT('</div><h2>✍️ Dictée terminée !</h2>') +
        '<p>' + d.parfaites + '/' + d.liste.length + ' phrases parfaites' + (d.parfaites ? ' · ⭐ +' + 2 * d.parfaites + ' plumes' : '') + '</p>' +
        TXT('<div class="actions serrees"><button class="moyen plein" data-a="dictee">🔁 Une autre dictée</button><button class="moyen" data-a="anglais">🇬🇧 Coin anglais</button></div></main>'));
      return;
    }
    d.fait = false;
    poser(barre('anglais') + TXT('<main class="battle-ecran dictee-ecran"><p class="piege-cat">✍️ Dictée · ') + (d.i + 1) + '/' + d.liste.length + '</p>' +
      '<div class="piege-haut"><div class="ami-moyen">' + ami('content') + TXT('</div><p class="piege-consigne">Écoute Plumo, puis écris la phrase en anglais.</p></div>') +
      '<div class="actions serrees"><button class="moyen plein" data-a="dictee-ecouter">🔊 Écouter</button><button class="moyen" data-a="dictee-lent">🐢 Lentement</button></div>' +
      '<label class="dictee-label" for="dictee-texte">Ta phrase :</label>' +
      '<textarea id="dictee-texte" lang="en" rows="2" autocapitalize="off" autocomplete="off" autocorrect="off" spellcheck="false" maxlength="160"></textarea>' +
      TXT('<button class="moyen plein" data-a="dictee-verifier">✔ Vérifier</button>') +
      '<div class="piege-retour" id="dictee-retour" role="status" aria-live="polite"></div></main>');
    const z = $('#dictee-texte'); if(z) z.addEventListener('keydown', ev => { if(ev.key === 'Enter' && !ev.shiftKey){ ev.preventDefault(); verifierDictee(); } });
    direEcoute(d.liste[d.i].en, 'en');
  }
  function verifierDictee(){
    const d = dictee; if(!d || d.fait) return;
    const z = $('#dictee-texte'), texte = z ? z.value : '';
    if(!texte.trim()){ if(z) z.focus(); return; }
    d.fait = true; const ph = d.liste[d.i], c = A_EN().corriger(ph.en, texte);
    if(c.juste){ d.parfaites++; J().plumes += 2; etatAnglais().dictees++; garder(); }
    else { for(const e of c.erreurs) if(e.ecrit) noterErreur('dictee:' + e.ecrit + '>' + e.attendu); garder(); }
    const rendu = c.mots.map((m, k) => '<span class="' + (c.ok[k] ? 'mot-ok' : 'mot-ko') + '">' + esc(m) + '</span>').join(' ');
    const r = $('#dictee-retour');
    if(r) r.innerHTML = (c.juste ? TXT('<p class="piege-bravo">✨ Parfait ! Pas une faute.</p>') : '<p class="piege-vanne">😂 ' + esc(c.erreurs.length ? A_EN().vanneDictee(c.erreurs.find(x => x.ecrit) || c.erreurs[0], c.score) : '« ' + c.enTrop[0] + TXT(' » est en trop : Plumo ne l’a pas dit ! 🤫')) + '</p>' + '<p class="dictee-corrige" lang="en">' + rendu + '</p>') +
      '<p class="piege-bon" lang="en">✅ ' + esc(ph.en) + '</p><p class="petit">🇫🇷 ' + esc(ph.fr) + '</p>' +
      '<button class="moyen plein" data-a="dictee-suivant">' + (d.i + 1 < d.liste.length ? 'Phrase suivante →' : TXT('Résultat')) + '</button>';
    if(z) z.readOnly = true; const vb = $('[data-a="dictee-verifier"]'); if(vb) vb.hidden = true;
    bruit(c.juste ? 'juste' : 'faux');
  }



  // ═══════════ v5.42 : on rigole et on apprend ═══════════
  const RG = () => window.RIGOLADE;
  // Le bêtisier garde les vannes vues (pour le best-of du dimanche).
  function noterBetisier(texte){
    if(!texte) return; const j = J(); j.betisier = Array.isArray(j.betisier) ? j.betisier : [];
    j.betisier.push({ v:String(texte).slice(0, 300), t:Date.now() }); if(j.betisier.length > 80) j.betisier = j.betisier.slice(-80);
  }
  const melangeLocal = (l, rnd) => { const o = l.slice(); rnd = rnd || Math.random; for(let i = o.length - 1; i > 0; i--){ const k = Math.floor(rnd() * (i + 1)); [o[i], o[k]] = [o[k], o[i]]; } return o; };

  // ── Plumo se trompe exprès : on le juge, puis on le corrige ──
  let trompe = null;
  function amiTrompe(){
    if(!window.PIEGES || !RG()) return coinAnglais();
    const l = melangeLocal(PIEGES.liste).slice(0, 8).map((p, k) => ({ p, faute:k % 5 !== 2 && Math.random() < .75, k:Math.floor(Math.random() * p.faux.length) }));
    trompe = { l, i:0, score:0, etape:'juger' }; afficherTrompe();
  }
  function afficherTrompe(){
    const t = trompe; if(!t) return coinAnglais();
    if(t.i >= t.l.length){
      J().plumes += t.score; garder(); bruit('fin');
      return poser(barre('anglais') + '<main class="centre"><div class="ami-moyen">' + ami(t.score >= 12 ? 'vexe' : 'malin') + '</div><h2>' + (t.score >= 12 ? TXT('Tu es le prof de Plumo ! 🎓') : 'Plumo t’a eu quelques fois… 😏') + '</h2>' +
        '<p>' + t.score + TXT(' points · ⭐ +') + t.score + ' plumes</p><p lang="en">🦉 « ' + (t.score >= 12 ? 'OK… you’re the teacher now.' : 'Sneaky Plumo strikes again!') + ' »</p>' +
        TXT('<div class="actions serrees"><button class="moyen plein" data-a="trompe">🔁 Encore</button><button class="moyen" data-a="anglais">🇬🇧 Coin anglais</button></div></main>'));
    }
    const x = t.l[t.i], phrase = x.faute ? x.p.faux[x.k].en : x.p.bon;
    t.etape = 'juger';
    poser(barre('anglais') + TXT('<main class="piege-ecran"><p class="piege-cat">🦉 Plumo se trompe exprès · ') + (t.i + 1) + '/' + t.l.length + ' · ' + t.score + ' pts</p>' +
      '<div class="piege-haut"><div class="ami-moyen" id="ami-trompe">' + ami('malin') + '</div><div><p class="piege-consigne">Plumo veut dire : « ' + esc(x.p.fr) + ' »</p>' +
      '<p class="piege-fr" lang="en">🦉 « ' + esc(phrase) + ' » <button class="bouton-rond" data-a="trompe-ecouter" aria-label="Réécouter">🔊</button></p></div></div>' +
      TXT('<p class="piege-consigne">Sa phrase anglaise est…</p><div class="actions serrees"><button class="gros juste-btn" data-a="trompe-juge" data-v="juste">✅ Juste</button><button class="gros buzz-btn" data-a="trompe-juge" data-v="faux">❌ Faux !</button></div>') +
      '<div class="piege-retour" id="trompe-retour" role="status" aria-live="polite"></div></main>');
    direPhrase(phrase, 'en');
  }
  function jugerTrompe(v){
    const t = trompe; if(!t || t.etape !== 'juger') return; const x = t.l[t.i], R = RG(), r = $('#trompe-retour'), a = $('#ami-trompe');
    document.querySelectorAll('[data-a="trompe-juge"]').forEach(b => { b.disabled = true; });
    const ligne = (l, h) => { if(a) a.innerHTML = ami(h); direPhrase(l.en, 'en'); return '<p lang="en">🦉 « ' + esc(l.en) + ' » <small>(' + esc(l.fr) + ')</small></p>'; };
    const suite = '<button class="moyen plein" data-a="trompe-suivant">' + (t.i + 1 < t.l.length ? TXT('Suivant →') : TXT('Résultat')) + '</button>';
    if(x.faute && v === 'faux'){
      t.etape = 'corriger'; t.score += 1; bruit('juste');
      const opts = melangeLocal([x.p.bon, x.p.faux[x.k].en].concat(x.p.faux.filter((f, k) => k !== x.k).map(f => f.en)).slice(0, 3));
      t.opts = opts;
      if(r) r.innerHTML = TXT('<p class="piege-bravo">🔔 Bien vu, il y a une faute ! Maintenant, corrige Plumo :</p><div class="piege-options">') + opts.map((o, k) => '<button class="moyen piege-opt" data-a="trompe-corrige" data-v="' + k + '" lang="en">' + esc(o) + '</button>').join('') + '</div>';
      if(a) a.innerHTML = ami('choque');
    } else if(x.faute){
      t.etape = 'fini'; bruit('faux'); noterBetisier(x.p.faux[x.k].vanne);
      if(r) r.innerHTML = ligne(R.AMI_FILOU[t.i % R.AMI_FILOU.length], 'malin') + '<p class="piege-vanne">😂 ' + esc(x.p.faux[x.k].vanne) + '</p><p class="piege-bon" lang="en">✅ ' + esc(x.p.bon) + '</p><p class="piege-regle">💡 ' + esc(x.p.regle) + '</p>' + suite;
    } else if(v === 'juste'){
      t.etape = 'fini'; t.score += 1; bruit('juste');
      if(r) r.innerHTML = TXT('<p class="piege-bravo">✅ Bien vu, c’était juste !</p>') + ligne({ en:'Thank you! I’m a genius.', fr:TXT('Merci ! Je suis un génie.') }, 'fier') + suite;
    } else {
      t.etape = 'fini'; bruit('faux');
      if(r) r.innerHTML = ligne(R.AMI_MALIN[t.i % R.AMI_MALIN.length], 'malin') + '<p class="piege-bon" lang="en">✅ ' + esc(x.p.bon) + '</p><p class="piege-regle">💡 ' + esc(x.p.regle) + '</p>' + suite;
    }
  }
  function corrigerTrompe(k){
    const t = trompe; if(!t || t.etape !== 'corriger') return; const x = t.l[t.i], choix = t.opts[k], r = $('#trompe-retour'), a = $('#ami-trompe');
    t.etape = 'fini'; const ok = choix === x.p.bon; if(ok) t.score += 2;
    const l = ok ? RG().AMI_VEXE[t.i % RG().AMI_VEXE.length] : { en:'Ha! Not that one either!', fr:TXT('Ha ! Ce n’est pas ça non plus !') };
    if(a) a.innerHTML = ami(ok ? 'vexe' : 'mdr'); direPhrase(ok ? x.p.bon : l.en, 'en');
    if(r) r.innerHTML = (ok ? TXT('<p class="piege-bravo">🎓 Corrigé ! +3 points</p>') : '<p class="piege-vanne">😂 Presque ! La bonne correction :</p>') +
      '<p lang="en">🦉 « ' + esc(l.en) + ' » <small>(' + esc(l.fr) + ')</small></p><p class="piege-bon" lang="en">✅ ' + esc(x.p.bon) + '</p><p class="piege-regle">💡 ' + esc(x.p.regle) + '</p>' +
      '<button class="moyen plein" data-a="trompe-suivant">' + (t.i + 1 < t.l.length ? TXT('Suivant →') : TXT('Résultat')) + '</button>';
    bruit(ok ? 'juste' : 'faux');
  }

  // ── Le jeu des oreilles et True or false? (moteur de questions) ──
  function oreillesGo(){
    const R = RG(); if(!R) return coinAnglais();
    const l = melangeLocal(R.PAIRES).slice(0, 8).map(p => { const c = Math.random() < .5 ? p.a : p.b, o = c === p.a ? p.b : p.a;
      return { consigne:'👂 Écoute bien : qu’a dit Plumo ?', enonce:'', ecoute:c.en, lent:true, bon:c.e, bonTexte:c.e + ' ' + c.en + ' = ' + c.fr, dire:c.en,
        faux:[{ en:o.e, vanne:'« ' + o.en + TXT(' » au lieu de « ') + c.en + ' » : ' + p.rire }], regle:'« ' + p.a.en + ' » ' + p.a.e + ' / « ' + p.b.en + ' » ' + p.b.e + TXT(' : réécoute-les avec 🐢.') }; });
    questionsGo(l, { titre:TXT('👂 Le jeu des oreilles'), retour:'anglais', fin:z => finJeu(z, '👂 Tes oreilles parlent anglais !', 'oreilles') });
  }
  function vraiFauxGo(){
    const R = RG(); if(!R) return coinAnglais();
    const l = melangeLocal(R.VRAI_FAUX).slice(0, 8).map(v => ({ consigne:'🦉 Plumo dit… True or false?', enonce:'« ' + v.en + ' »', ecoute:v.en, trad:v.fr, bon:v.vrai ? 'True' : 'False', dire:v.en,
      bonTexte:(v.vrai ? TXT('True — c’est vrai !') : TXT('False — c’est faux !')), faux:[{ en:v.vrai ? 'False' : 'True', vanne:v.rire }], regle:'😂 ' + v.rire, humeurJuste:v.vrai ? 'fier' : 'mdr', humeurFaux:'malin' }));
    questionsGo(l, { titre:'🤥 True or false?', retour:'anglais', fin:z => finJeu(z, z.bonnes >= 6 ? TXT('Impossible de te raconter des salades ! 🥗') : TXT('Plumo t’a fait avaler quelques bêtises… 😏'), 'vraifaux') });
  }
  function finJeu(z, titre, rejouer){
    J().plumes += z.bonnes; garder(); bruit('fin');
    poser(barre('anglais') + '<main class="centre"><div class="ami-moyen">' + ami(z.bonnes >= z.liste.length - 1 ? 'fete' : 'mdr') + '</div><h2>' + esc(titre) + '</h2><p>' + z.bonnes + '/' + z.liste.length + ' · ⭐ +' + z.bonnes + ' plumes</p>' +
      '<div class="actions serrees"><button class="moyen plein" data-a="' + rejouer + TXT('">🔁 Encore</button><button class="moyen" data-a="anglais">🇬🇧 Coin anglais</button></div></main>'));
  }

  // ── Calendrier de l'Avent ──
  function avent(){
    const R = RG(); if(!R) return coinAnglais();
    const j = J(), ouv = R.aventOuvert(), faits = Array.isArray(j.avent) ? j.avent : [];
    poser(barre('anglais') + TXT('<main class="coin-anglais avent"><h2>🎄 Le calendrier de l’Avent anglais</h2>') +
      '<p class="pieges-intro">' + (ouv ? TXT('Une case par jour : un mot d’hiver, une phrase, une vanne… et un petit défi !') : TXT('Il s’ouvre le 1er décembre ! En avant-première, tu peux ouvrir la case 1.')) + '</p>' +
      '<div class="avent-grille">' + R.AVENT.map((x, k) => { const d = k + 1, ok = d <= Math.max(ouv, 1), fait = faits.includes(d);
        return '<button class="avent-case' + (fait ? ' ouverte' : '') + '" data-a="avent-case" data-v="' + d + '"' + (ok ? '' : ' disabled') + ' aria-label="Jour ' + d + (fait ? ', ouvert' : ok ? '' : TXT(', pas encore')) + '">' + (fait ? x.e : ok ? d : '🔒') + '</button>'; }).join('') + '</div></main>');
  }
  function aventCase(d){
    const R = RG(), x = R && R.AVENT[d - 1]; if(!x || d > Math.max(R.aventOuvert(), 1)) return avent();
    const autres = melangeLocal(R.AVENT.filter(y => y !== x)).slice(0, 2).map(y => y.en), opts = melangeLocal([x.en].concat(autres));
    poser(barre('avent') + '<main class="battle-ecran avent-carte"><p class="piege-cat">🎄 Jour ' + d + '</p><div class="lecture-image" aria-hidden="true">' + x.e + '</div>' +
      '<p class="lecture-texte" lang="en">' + esc(x.en) + ' <button class="bouton-rond" data-a="dire-en" data-v="' + esc(x.en) + '" aria-label="Écouter">🔊</button></p><p class="petit">🇫🇷 ' + esc(x.fr) + '</p>' +
      '<p class="piege-fr" lang="en">« ' + esc(x.phrase.en) + ' » <button class="bouton-rond" data-a="dire-en" data-v="' + esc(x.phrase.en) + TXT('" aria-label="Écouter la phrase">🔊</button></p>') + traduire(x.phrase.fr) +
      '<p class="piege-vanne">😂 ' + esc(x.vanne) + TXT('</p><p class="piege-consigne">Petit défi : comment dit-on « ') + esc(x.fr) + ' » ?</p>' +
      '<div class="piege-options">' + opts.map(o => '<button class="moyen piege-opt" data-a="avent-rep" data-v="' + d + ':' + esc(o) + '" lang="en">' + esc(o) + '</button>').join('') + '</div><p class="aide" id="avent-retour" role="status"></p></main>');
    direPhrase(x.en, 'en');
  }
  function aventRep(v){
    const [d, rep] = [Number(String(v).split(':')[0]), String(v).slice(String(v).indexOf(':') + 1)], x = RG().AVENT[d - 1]; if(!x) return;
    const ok = rep === x.en, r = $('#avent-retour');
    document.querySelectorAll('.piege-opt').forEach(b => { b.disabled = true; if(b.textContent === x.en) b.classList.add('ok'); else if(b.textContent === rep) b.classList.add('ko'); });
    const j = J(); j.avent = Array.isArray(j.avent) ? j.avent : []; const neuf = !j.avent.includes(d); if(neuf){ j.avent.push(d); j.plumes += 2; } garder();
    if(r) r.textContent = (ok ? '🎉 Yes! « ' + x.en + ' » !' : TXT('😂 Presque ! C’était « ') + x.en + ' ».') + (neuf ? ' ⭐ +2 plumes' : '');
    bruit(ok ? 'juste' : 'faux'); direPhrase(x.en, 'en');
  }

  // ── Ma maison : les plumes servent à acheter des meubles (avec leur nom anglais) ──
  function etatMaison(){
    const R = RG(), j = J(), o = j.maison && typeof j.maison === 'object' ? j.maison : {}, ids = R ? R.MAISON.map(x => x.id) : [];
    const achats = Array.isArray(o.achats) ? [...new Set(o.achats.filter(x => ids.includes(x)))] : [];
    const places = {}; for(const [k, v] of Object.entries(o.places || {})) if(/^(sol[0-5]|mur[0-2])$/.test(k) && achats.includes(v) && !Object.values(places).includes(v) && R.MAISON.find(x => x.id === v).zone === k.replace(/\d$/, '')) places[k] = v;
    j.maison = { achats, places }; return j.maison;
  }
  let maisonMsg = '';
  function maison(){
    const R = RG(); if(!R) return accueil();
    const m = etatMaison(), objet = id => R.MAISON.find(x => x.id === id), carton = m.achats.filter(id => !Object.values(m.places).includes(id));
    const fente = k => { const id = m.places[k], x = id && objet(id);
      return '<button class="fente ' + k.replace(/\d$/, '') + (x ? ' pleine' : '') + '" data-a="maison-fente" data-v="' + k + '" aria-label="' + (x ? esc(x.en) : 'Place libre') + '">' + (x ? '<span class="obj">' + x.e + '</span><small lang="en">' + esc(x.en) + '</small>' : '<span class="vide">＋</span>') + '</button>'; };
    poser(barre(piegesDispo() ? 'anglais' : 'accueil') + TXT('<main class="maison-ecran"><h2>🏠 Ma maison</h2><p class="petit">Tes plumes : <strong>') + J().plumes + TXT(' 🪶</strong> · Touche un objet pour entendre son nom.</p>') +
      '<div class="salon-maison"><div class="murs">' + [0, 1, 2].map(i => fente('mur' + i)).join('') + '</div><div class="sols">' + [0, 1, 2, 3, 4, 5].map(i => fente('sol' + i)).join('') + '</div>' +
      '<div class="ami-maison">' + ami('content') + '</div></div>' +
      '<p class="aide" id="maison-msg" role="status" aria-live="polite">' + esc(maisonMsg) + '</p>' +
      (carton.length ? TXT('<p class="petit">📦 Dans le carton : ') + carton.map(id => objet(id).e).join(' ') + TXT(' (touche une place libre pour le poser)</p>') : '') +
      TXT('<h3>🛒 La boutique de Plumo</h3><div class="boutique">') + R.MAISON.map(x => { const a = m.achats.includes(x.id);
        return '<button class="article' + (a ? ' achete' : '') + '" data-a="maison-acheter" data-v="' + x.id + '"' + (a || J().plumes < x.prix ? ' disabled' : '') + '><span class="obj">' + x.e + '</span><span lang="en">' + esc(x.en) + '</span><small>' + esc(x.fr) + '</small><em>' + (a ? '✓' : x.prix + ' 🪶') + '</em></button>'; }).join('') + '</div></main>');
    maisonMsg = '';
  }
  function maisonAcheter(id){
    const R = RG(), x = R && R.MAISON.find(y => y.id === id), m = etatMaison(); if(!x || m.achats.includes(id) || J().plumes < x.prix) return maison();
    J().plumes -= x.prix; m.achats.push(id);
    const libre = Array.from({ length:R.PLACES[x.zone] }, (_, i) => x.zone + i).find(k => !m.places[k]); if(libre) m.places[libre] = id;
    garder(); bruit('juste'); direPhrase(x.en, 'en');
    maisonMsg = '🦉 « ' + x.en + ' » = ' + x.fr + ' ! ' + x.rire + (libre ? '' : TXT(' (Plus de place : il attend dans le carton 📦)'));
    maison();
  }
  function maisonFente(k){
    const R = RG(), m = etatMaison(), id = m.places[k];
    if(id){ const x = R.MAISON.find(y => y.id === id); direPhrase(x.en, 'en'); const e = $('#maison-msg');
      if(e) e.innerHTML = '🔊 « <span lang="en">' + esc(x.en) + '</span> » = ' + esc(x.fr) + ' <button class="petit-bouton" data-a="maison-ranger" data-v="' + k + '">📦 Ranger</button>'; return; }
    const zone = k.replace(/\d$/, ''), dispo = m.achats.find(i => !Object.values(m.places).includes(i) && R.MAISON.find(y => y.id === i).zone === zone);
    if(dispo){ m.places[k] = dispo; garder(); const x = R.MAISON.find(y => y.id === dispo); direPhrase(x.en, 'en'); maisonMsg = '🔊 « ' + x.en + ' » = ' + x.fr; return maison(); }
    const e = $('#maison-msg'); if(e) e.textContent = TXT('Place libre ! Achète un objet ') + (zone === 'mur' ? TXT('pour le mur') : TXT('pour le sol')) + TXT(' dans la boutique. 🛒');
  }

  // ── Le bêtisier de la semaine (best-of des vannes des 7 derniers jours) ──
  let best = null;
  function betisier(){
    const l = (J().betisier || []).filter(x => x && typeof x.v === 'string' && Date.now() - x.t < 7 * 864e5);
    const uniques = [...new Map(l.reverse().map(x => [x.v, x])).values()].slice(0, 5).reverse();
    best = { l:uniques, i:-1 }; afficherBest();
  }
  function afficherBest(){
    const b = best; if(!b) return coinAnglais();
    if(!b.l.length) return poser(barre('anglais') + '<main class="centre"><div class="ami-moyen">' + ami('boude') + TXT('</div><h2>📺 Le bêtisier de Plumo</h2><p>Pas encore de vannes cette semaine ! Joue un peu, trompe-toi un peu… et reviens. 😄</p><p><button class="moyen plein" data-a="anglais">🇬🇧 Coin anglais</button></p></main>'));
    if(b.i < 0) return poser(barre('anglais') + '<main class="centre tele"><div class="ecran-tele"><div class="ami-moyen">' + ami('fete') + TXT('</div><h2>📺 Le bêtisier de Plumo</h2><p>Bienvenue dans l’émission la plus drôle du village ! Voici le top ') + b.l.length + TXT(' de tes confusions de la semaine. Pas de honte : on rit, et on retient !</p></div><button class="gros" data-a="best-suivant">▶ Lancer l’émission</button></main>'));
    if(b.i >= b.l.length) return poser(barre('anglais') + '<main class="centre tele"><div class="ecran-tele"><div class="ami-moyen">' + ami('mdr') + TXT('</div><h2>C’était le bêtisier de Plumo !</h2><p>Rendez-vous la semaine prochaine pour de nouvelles bêtises. 👋</p></div><p><button class="moyen plein" data-a="anglais">🇬🇧 Coin anglais</button></p></main>'));
    const n = b.l.length - b.i, x = b.l[b.i];
    poser(barre('anglais') + '<main class="centre tele"><div class="ecran-tele"><p class="numero">N° ' + n + (n === 1 ? ' 🏆' : '') + '</p><div class="ami-moyen">' + ami(n === 1 ? 'mdr' : ['choque', 'malin', 'fier', 'surpris'][n % 4]) + '</div><p class="piege-vanne">😂 ' + esc(x.v) + '</p></div>' +
      '<button class="gros" data-a="best-suivant">' + (n > 1 ? TXT('Suivant ▶') : TXT('Fin de l’émission')) + '</button></main>');
    if(n === 1) bruit('fin'); else bruit('boing');
  }

  // ── Battles en famille (2 à 4 joueurs, chacun son tour sur le même téléphone) ──
  let tournoi = null;
  function tournoiMenu(){
    const noms = Array.isArray(base.famille) ? base.famille : [];
    poser(barre('battle') + TXT('<main class="coin-anglais"><h2>👨‍👩‍👧 Battle en famille</h2><p class="pieges-intro">2 à 4 joueurs, chacun son tour sur ce téléphone. Mêmes types de questions pour tous : pièges, répliques, oreilles, vrai ou faux.</p>') +
      [0, 1, 2, 3].map(i => TXT('<p><label>Joueur ') + (i + 1) + (i > 1 ? TXT(' (facultatif)') : '') + ' : <input class="champ-pseudo" id="fam' + i + '" maxlength="12" value="' + esc(noms[i] || '') + '" placeholder="Pseudo"></label></p>').join('') +
      TXT('<p><button class="gros" data-a="tournoi-go">▶ C’est parti !</button></p><p class="aide" id="tournoi-msg" role="status"></p></main>'));
  }
  function tournoiGo(){
    const noms = [0, 1, 2, 3].map(i => RG().nettoiePseudo(($('#fam' + i) || {}).value)).filter(Boolean);
    if(noms.length < 2){ const m = $('#tournoi-msg'); if(m) m.textContent = TXT('Il faut au moins 2 joueurs ! 👥'); return; }
    base.famille = noms; garder();
    tournoi = { noms, scores:[], i:0, graine:Math.floor(Math.random() * 1e9) }; tournoiTour();
  }
  function tournoiTour(){
    const t = tournoi; if(!t) return tournoiMenu();
    if(t.i >= t.noms.length){
      const cl = t.noms.map((n, k) => ({ n, s:t.scores[k] })).sort((a, b) => b.s - a.s), ex = cl.filter(x => x.s === cl[0].s).length > 1;
      J().plumes += 3; garder(); bruit('fin');
      return poser(barre('battle') + '<main class="centre"><div class="ami-moyen">' + ami('mdr') + '</div><h2>' + (ex ? TXT('🤝 Égalité au sommet !') : '👑 ' + esc(cl[0].n) + TXT(' gagne la battle !')) + '</h2>' +
        '<ol class="podium">' + cl.map((x, k) => '<li>' + ['🥇', '🥈', '🥉', '🏅'][k] + ' ' + esc(x.n) + ' — ' + x.s + '/6</li>').join('') + '</ol>' +
        TXT('<p lang="en">🦉 « And Plumo? Plumo got zero… because Plumo was the referee! »</p><p class="petit">Et Plumo ? Zéro… parce qu’il était l’arbitre !</p>') +
        '<div class="actions serrees"><button class="moyen plein" data-a="tournoi-go-memes">🔁 Revanche</button><button class="moyen" data-a="battle">🎤 Battles</button></div></main>');
    }
    poser(barre('battle') + '<main class="centre"><div class="ami-moyen">' + ami('fete') + TXT('</div><h2>📱 Passe le téléphone à ') + esc(t.noms[t.i]) + TXT(' !</h2><p>6 questions. Les autres, pas de souffle ! 🤫</p><button class="gros" data-a="tournoi-joue">C’est moi, ') + esc(t.noms[t.i]) + ' ! ▶</button></main>');
  }
  function tournoiJoue(){
    const t = tournoi; if(!t) return;
    questionsGo(window.SALON.questionsMixtes(t.graine + t.i * 7919, 6), { titre:'👨‍👩‍👧 ' + t.noms[t.i], retour:'battle', fin:z => { t.scores[t.i] = z.bonnes; t.i++; tournoiTour(); } });
  }

  // ── v5.68 : Battle entre potes (accueil) — maths, anglais et vannes, 2 à 4 joueurs sur le même appareil ──
  // Chaque joueur répond à la même formule (mêmes types, mêmes niveaux) ; Plumo commente entre les tours et
  // charrie les réponses, jamais les joueurs. Liens vers le défi par lien, le salon en direct et la battle contre Plumo.
  let potes = null;
  const MATIERES_POTES = [['melange', '🎲', TXT('Le grand mélange'), TXT('Maths, anglais ET vannes')], ['culture', '📚', TXT('Culture G'), TXT('Français, histoire-géo, SVT, physique')], ['maths', '🔢', TXT('Maths'), TXT('Calcul, fractions, équations…')], ['anglais', '🇬🇧', TXT('Anglais'), TXT('Pièges, oreille, vrai ou faux')], ['langlais', '🎓', TXT('Anglais du programme'), TXT('De la 6e au bac, à ton niveau : grammaire, irréguliers, faux amis')], [TXT('vannes'), '🎤', TXT('Vannes'), TXT('Plumo clashe : trouve la meilleure punchline')]];
  // Questions d'une battle : graine → toujours les mêmes pour une graine (revanche équitable).
  // Longueur : nombre de questions par joueur (mélange ; une seule matière : un peu moins).
  const LONGUEURS_POTES = { courte:[9, 6, TXT('⚡ Courte')], normale:[15, 10, TXT('🔥 Normale')], marathon:[24, 16, TXT('🏃 Marathon')] };
  function questionsPotes(graine, mode, niveau, longueur){
    const L = LONGUEURS_POTES[longueur] || LONGUEURS_POTES.normale, N = mode === 'melange' ? L[0] : L[1], k = Math.ceil(N / 3);
    const CP = window.CLASH_PLUS, intro = i => CP ? CP.INTROS_POTES[(graine + i * 3) % CP.INTROS_POTES.length] : '';
    const R = window.RIGOLADE, rnd = R ? R.hasardGraine(graine) : Math.random, A = A_EN();
    // Maths : une petite phrase de Plumo avant l'énoncé, pour mettre la pression (pour rire).
    const maths = n => window.MATHS ? MATHS.questionsSalon(graine, n, niveau).map((q, i) => Object.assign(q, { consigne:q.consigne + (intro(i) ? ' · ' + intro(i) : '') })) : [];
    const anglais = n => window.SALON && A ? SALON.questionsMixtes(graine + 17, n * 3).filter(q => !/^b:/.test(q.id)).slice(0, n) : [];
    const vannes = n => {
      if(!A) return [];
      const toutes = A.BATTLE.concat(window.CLASH ? CLASH.MANCHES : []), l = A.melanger(toutes, rnd).slice(0, n);
      return l.map(m => ({ id:'c:' + m.ami, consigne:TXT('🎤 Plumo te clashe : renvoie-lui la meilleure punchline !'), enonce:'« ' + m.ami + ' »', ecoute:m.ami, trad:m.fr,
        bon:m.bon.en, faux:m.faux.slice(0, 3), regle:'🇫🇷 ' + m.bon.fr, dire:m.bon.en }));
    };
    if(mode === 'culture' && window.MATIERES){ const ids = ['francais', 'histoire', 'svt', 'physique'], l = ids.map((id, i) => MATIERES.serie(id, 'melange', niveau, Math.ceil(N / ids.length) + 1, graine + i * 101, 'taquin'));
      const out = []; for(let i = 0; out.length < N && i < N; i++) for(const x of l) if(x[i] && out.length < N) out.push(x[i]); if(out.length) return out; }
    if(mode === 'langlais' && window.MATIERES && MATIERES.trouver('langlais')){ const l = MATIERES.serie('langlais', 'melange', MATIERES.chapitres('langlais', niveau).length ? niveau : '3e', N, graine + 7, 'taquin'); if(l.length) return l; }
    if(mode === 'maths') return maths(N);
    if(mode === 'anglais') return anglais(N);
    if(mode === 'vannes') return vannes(N);
    // Mélange : maths, anglais, vannes, à tour de rôle (ce qui manque est remplacé par ce qui existe).
    const m = maths(k), a = anglais(k), v = vannes(k), out = [];
    for(let i = 0; i < k; i++) for(const l of [m, a, v]) if(l[i] && out.length < N) out.push(l[i]);
    return out.length ? out : maths(N);
  }
  function potesMenu(){
    potes = null;
    const noms = Array.isArray(base.famille) ? base.famille : [], A = A_EN(), niv = window.MATHS ? etatMaths().niveau : '6e';
    const dispo = MATIERES_POTES.filter(([k]) => k === 'maths' ? !!window.MATHS : k === 'melange' ? !!(window.MATHS || A) : k === 'culture' ? !!window.MATIERES : k === 'langlais' ? !!(window.MATIERES && MATIERES.trouver('langlais')) : !!A);
    const choix = dispo.some(x => x[0] === base.potesMode) ? base.potesMode : dispo[0][0];
    poser(barre('accueil') + '<main class="coin-anglais potes"><h2>⚔️ ' + TXT('Battle entre potes') + '</h2>' +
      TXT('<p class="pieges-intro">2 à 4 joueurs sur ce téléphone, chacun son tour. Plumo pose les questions, compte les points… et charrie les mauvaises réponses. 😏</p>') +
      '<div class="cartes-anglais choix-matiere">' + dispo.map(([k, ic, nom, txt]) => '<button class="carte-anglais' + (k === choix ? ' choisie' : '') + '" data-a="potes-matiere" data-v="' + k + '" aria-pressed="' + (k === choix) + '"><span class="ic">' + ic + '</span><strong>' + nom + '</strong><small>' + txt + '</small></button>').join('') + '</div>' +
      '<p class="choix-longueur">' + Object.keys(LONGUEURS_POTES).map(k => { const L = LONGUEURS_POTES[k], ch = (base.potesLongueur || 'normale') === k;
        return '<button class="moyen' + (ch ? ' plein' : '') + '" data-a="potes-longueur" data-v="' + k + '" aria-pressed="' + ch + '">' + L[2] + ' · ' + (choix === 'melange' ? L[0] : L[1]) + TXT(' questions</button>'); }).join(' ') + '</p>' +
      (window.MATHS ? TXT('<p><label>Niveau de maths : <select id="potes-niveau">') + MATHS.NIVEAUX.map(n => '<option' + (n === niv ? ' selected' : '') + '>' + n + '</option>').join('') + '</select></label></p>' : '') +
      [0, 1, 2, 3].map(i => TXT('<p><label>Joueur ') + (i + 1) + (i > 1 ? TXT(' (facultatif)') : '') + ' : <input class="champ-pseudo" id="pote' + i + '" maxlength="12" value="' + esc(noms[i] || '') + '" placeholder="Pseudo"></label></p>').join('') +
      (window.TRASH_TALK ? '<p class="choix-longueur"><button class="moyen' + (base.potesTrash ? ' plein' : '') + '" data-a="potes-trash" aria-pressed="' + !!base.potesTrash + '">🥊 Trash talk : ' + (base.potesTrash ? 'ON' : 'OFF') + '</button></p>' : '') +
      TXT('<p><button class="gros" data-a="potes-go">⚔️ Lancer la battle !</button></p><p class="aide" id="potes-msg" role="status"></p>') +
      TXT('<h3>Autres façons de battle</h3><div class="cartes-anglais">') + cartesModules('battle') +
      TXT('<button class="carte-anglais" data-a="defi-pote"><span class="ic">📨</span><strong>Défier un pote (anglais)</strong><small>Par lien : mêmes questions, on compare</small></button>') +
      (window.MATHS ? TXT('<button class="carte-anglais" data-a="maths-defi"><span class="ic">🔗</span><strong>Défier un pote (maths)</strong><small>Par lien, à ton niveau</small></button>') : '') +
      TXT('<button class="carte-anglais" data-a="salon"><span class="ic">🛸</span><strong>Salon en direct</strong><small>Chacun sur son téléphone, en même temps</small></button>') +
      (A ? TXT('<button class="carte-anglais" data-a="battle-go" data-v="ami"><span class="ic">🦉</span><strong>Contre Plumo</strong><small>3 manches de vannes en anglais</small></button>') : '') +
      '</div></main>');
  }
  function potesGo(){
    const noms = [0, 1, 2, 3].map(i => RG().nettoiePseudo(($('#pote' + i) || {}).value)).filter(Boolean);
    if(noms.length < 2){ const m = $('#potes-msg'); if(m) m.textContent = TXT('Il faut au moins 2 joueurs ! 👥'); return; }
    const nv = $('#potes-niveau'), niveau = nv && window.MATHS && MATHS.NIVEAUX.includes(nv.value) ? nv.value : (window.MATHS ? etatMaths().niveau : '6e');
    base.famille = noms; garder();
    const modes = MATIERES_POTES.map(x => x[0]).filter(k => k === 'maths' ? !!window.MATHS : k === 'melange' ? true : k === 'culture' ? !!window.MATIERES : !!A_EN());
    potes = { noms, scores:[], i:0, mode:modes.includes(base.potesMode) ? base.potesMode : modes[0], niveau, longueur:base.potesLongueur || 'normale', graine:Math.floor(Math.random() * 1e9), trash:!!(base.potesTrash && window.TRASH_TALK) };
    potesTour();
  }
  // Plumo commente le classement entre deux joueurs (il charrie la course, jamais une personne).
  function commentairePotes(p){
    const fait = p.noms.slice(0, p.i).map((n, k) => ({ n, s:p.scores[k] })).sort((a, b) => b.s - a.s), TT = window.TRASH_TALK;
    if(p.trash && TT) return esc(fait.length ? TT.choisir(TT.TOUR, { n:p.noms[p.i], t:fait[0].n, s:fait[0].s, total:p.liste ? p.liste.length : 9 }, memoireVannes()) : TT.choisir(TT.PREMIER, { n:p.noms[p.i] }, memoireVannes()));
    if(!fait.length) return TXT('Premier à passer : pas de pression… enfin si, un peu. 😏');
    const t = fait[0], total = p.liste ? p.liste.length : 9;
    const l = [esc(t.n) + TXT(' mène avec ') + t.s + ' point' + (t.s > 1 ? 's' : '') + TXT('. Qui va le faire tomber de son trône ? 👑'),
      TXT('Score à battre : ') + t.s + '/' + total + TXT('. Plumo a déjà sorti le pop-corn. 🍿'),
      t.s === total ? esc(t.n) + TXT(' a fait un sans-faute. Il faudra un miracle… ou un sans-faute. 😱') : TXT('Le record est à ') + t.s + TXT('. Franchement, c’est jouable. 🔥')];
    return l[(p.i + p.graine) % l.length];
  }
  function potesTour(){
    const p = potes; if(!p) return potesMenu();
    p.liste = questionsPotes(p.graine, p.mode, p.niveau, p.longueur);
    if(p.i >= p.noms.length){
      const cl = p.noms.map((n, k) => ({ n, s:p.scores[k] })).sort((a, b) => b.s - a.s), ex = cl.filter(x => x.s === cl[0].s).length > 1, total = p.liste.length;
      J().plumes += 3; garder(); bruit('fin');
      const titres = [TXT('👑 Roi ou reine de la battle'), TXT('🥈 Presque sur le trône'), TXT('🥉 Sur le podium'), '🛟 Revanche obligatoire'];
      return poser(barre('potes') + '<main class="centre potes-fin"><div class="ami-moyen">' + ami('fete') + '</div><h2>' + (ex ? TXT('🤝 Égalité au sommet !') : '👑 ' + esc(cl[0].n) + TXT(' gagne la battle !')) + '</h2>' +
        '<ol class="podium">' + cl.map((x, k) => '<li>' + ['🥇', '🥈', '🥉', '🏅'][k] + ' <strong>' + esc(x.n) + '</strong> — ' + x.s + '/' + total + ' <small>' + titres[k > 0 && k === cl.length - 1 ? 3 : Math.min(k, 2)] + '</small></li>').join('') + '</ol>' +
        '<p>🦉 ' + (p.trash && window.TRASH_TALK ? esc(TRASH_TALK.choisir(ex ? TRASH_TALK.EGALITE : TRASH_TALK.FIN, { g:cl[0].n, d:cl[cl.length - 1].n }, memoireVannes())) : ex ? TXT('Égalité ! Plumo exige une revanche, il n’a pas fini son pop-corn.') : TXT('Bien joué ') + esc(cl[0].n) + TXT(' ! Les autres : Plumo a noté toutes vos réponses ratées… pour la revanche. 😏')) + '</p>' +
        TXT('<div class="actions serrees"><button class="moyen plein" data-a="potes-revanche">🔁 Revanche (nouvelles questions)</button><button class="moyen" data-a="potes">⚔️ Changer de battle</button></div></main>'));
    }
    const nom = MATIERES_POTES.find(x => x[0] === p.mode) || MATIERES_POTES[0];
    poser(barre('potes') + '<main class="centre potes-tour"><div class="ami-moyen">' + ami('malin') + '</div>' +
      '<p class="piege-cat">' + nom[1] + ' ' + nom[2] + (p.mode === 'melange' || p.mode === 'maths' ? ' · maths ' + esc(p.niveau) : '') + ' · joueur ' + (p.i + 1) + '/' + p.noms.length + '</p>' +
      TXT('<h2>📱 Passe le téléphone à ') + esc(p.noms[p.i]) + ' !</h2><p>' + commentairePotes(p) + '</p><p class="petit">' + p.liste.length + TXT(' questions. Les autres : pas de souffle ! 🤫</p>') +
      TXT('<button class="gros" data-a="potes-joue">C’est moi, ') + esc(p.noms[p.i]) + ' ! ▶</button></main>');
  }
  function potesJoue(){
    const p = potes; if(!p) return potesMenu();
    // Chaque joueur a ses propres questions (même formule), pour que personne ne profite du tour d'avant.
    const liste = questionsPotes(p.graine + p.i * 7919, p.mode, p.niveau, p.longueur);
    questionsGo(liste, { titre:'⚔️ ' + p.noms[p.i], retour:'potes', trash:p.trash, sujet:p.mode === 'maths' ? 'maths' : p.mode === 'vannes' ? 'anglais' : undefined,
      bravo:() => { const B = window.CLASH_PLUS ? CLASH_PLUS.BRAVO_POTES : [TXT('Bravo ! 🎉')]; return B[Math.floor(Math.random() * B.length)]; },
      fin:z => { p.scores[p.i] = z.bonnes; p.i++; potesTour(); } });
  }

  // ── Défi entre potes par lien (sans serveur) ──
  let defiRecu = null, defiCree = null;
  function defiPote(){
    poser(barre('battle') + TXT('<main class="coin-anglais"><h2>📨 Défier un pote</h2><p class="pieges-intro">Tu joues 8 questions, puis tu envoies un lien à ton pote : il joue les MÊMES questions et compare son score. Pas de compte, rien n’est enregistré sur internet : tout est dans le lien.</p>') +
      TXT('<p><label>Ton pseudo (pas ton vrai nom complet) : <input class="champ-pseudo" id="pseudo" maxlength="12" value="') + esc(base.pseudo || '') + TXT('"></label></p><p><button class="gros" data-a="defi-pote-go">▶ Jouer mon défi</button></p></main>'));
  }
  // m : niveau de maths (« 6e »…« Tle ») pour un défi de maths ; absent : défi d'anglais.
  const questionsBattle = (graine, n, m) => m && window.MATHS && MATHS.NIVEAUX.includes(m) ? MATHS.questionsSalon(graine, n, m) : window.SALON.questionsMixtes(graine, n);
  function defiPoteGo(recu, maths){
    const p = RG().nettoiePseudo(($('#pseudo') || {}).value || base.pseudo) || 'Moi'; base.pseudo = p; garder();
    const graine = recu ? recu.s : Math.floor(Math.random() * 1e9), n = recu ? recu.n : 8, m = recu ? recu.m : maths;
    questionsGo(questionsBattle(graine, n, m), { titre:(recu ? TXT('📨 Défi de ') + recu.p : TXT('📨 Mon défi')) + (m ? ' · maths ' + m : ''), retour:m ? 'maths' : 'battle', prof:!!m, lang:m ? MATHS.tr.langue() : undefined, fin:z => {
      J().plumes += z.bonnes; garder(); bruit('fin');
      // Revanche : nouveau défi avec de nouvelles questions… si on veut ; ici, on renvoie son score sur les MÊMES questions.
      const code = RG().coderDefi({ s:graine, n, sc:z.bonnes, p, m }), lien = location.origin + location.pathname + '?defi=' + code;
      defiCree = { lien, texte:p + TXT(' te défie sur Ami des mots ! Score à battre : ') + z.bonnes + '/' + n + ' 🦉' };
      const comp = recu ? (z.bonnes > recu.sc ? '🏆 Tu bats ' + esc(recu.p) + ' (' + z.bonnes + ' contre ' + recu.sc + ') !' : z.bonnes === recu.sc ? TXT('🤝 Égalité avec ') + esc(recu.p) + ' (' + z.bonnes + '/' + n + ') !' : '😅 ' + esc(recu.p) + TXT(' gagne cette fois (') + recu.sc + ' contre ' + z.bonnes + ')… revanche !') : '';
      poser(barre('battle') + '<main class="centre"><div class="ami-moyen">' + ami(recu && z.bonnes > recu.sc ? 'fete' : 'mdr') + '</div><h2>' + (comp || 'Ton score : ' + z.bonnes + '/' + n) + '</h2>' +
        TXT('<p>Envoie le lien à ') + (recu ? esc(recu.p) : TXT('ton pote')) + TXT(' : il joue les mêmes questions et compare !</p>') +
        TXT('<div class="actions serrees"><button class="moyen plein" data-a="defi-partager">📤 Envoyer le défi</button><button class="moyen" data-a="defi-copier">📋 Copier le lien</button></div>') +
        '<p class="lien-defi"><input readonly id="lien-defi" value="' + esc(lien) + TXT('" aria-label="Lien du défi"></p><p class="aide" id="defi-msg" role="status"></p>') +
        '<p><button class="moyen" data-a="battle">🎤 Battles</button></p></main>');
    } });
  }
  function ecranDefiRecu(d){
    defiRecu = d;
    poser(barre('accueil') + '<main class="centre"><div class="ami-moyen">' + ami('malin') + '</div><h2>🎤 ' + esc(d.p) + TXT(' te défie !</h2><p>Score à battre : <strong>') + d.sc + '/' + d.n + TXT('</strong>. Mêmes questions pour vous deux : pièges, répliques, oreilles, vrai ou faux.</p>') +
      '<p><label>Ton pseudo : <input class="champ-pseudo" id="pseudo" maxlength="12" value="' + esc(base.pseudo || '') + TXT('"></label></p><button class="gros" data-a="defi-relever">🔥 Relever le défi</button></main>'));
  }


  // ── Battle de rap : un rythme qui tourne, Plumo rappe, on complète ses rimes ──
  let rap = null, beat = null;
  function lancerBeat(){
    arreterBeat(); if(!base.son) return;
    try{
      const AC = window.AudioContext || window.webkitAudioContext; if(!AC) return; ctx = ctx || new AC();
      const bpm = 88, pas = 60 / bpm / 2; let t = ctx.currentTime + .1, n = 0;
      const coup = (f, d, v, type, t0) => { const o = ctx.createOscillator(), g = ctx.createGain(); o.type = type; o.frequency.setValueAtTime(f, t0); if(type === 'sine') o.frequency.exponentialRampToValueAtTime(40, t0 + d);
        g.gain.setValueAtTime(v, t0); g.gain.exponentialRampToValueAtTime(.0001, t0 + d); o.connect(g); g.connect(ctx.destination); o.start(t0); o.stop(t0 + d + .02); };
      const bruitBlanc = (d, v, t0, f) => { const b = ctx.createBuffer(1, Math.floor(ctx.sampleRate * d), ctx.sampleRate), x = b.getChannelData(0); for(let i = 0; i < x.length; i++) x[i] = Math.random() * 2 - 1;
        const src = ctx.createBufferSource(), g = ctx.createGain(), hp = ctx.createBiquadFilter(); hp.type = 'highpass'; hp.frequency.value = f; src.buffer = b; g.gain.setValueAtTime(v, t0); g.gain.exponentialRampToValueAtTime(.0001, t0 + d);
        src.connect(hp); hp.connect(g); g.connect(ctx.destination); src.start(t0); };
      beat = setInterval(() => {
        while(t < ctx.currentTime + .3){ const k = n % 8;
          if(k === 0 || k === 3 || k === 5) coup(120, .32, .5, 'sine', t);          // grosse caisse
          if(k === 2 || k === 6) bruitBlanc(.16, .22, t, 1500);                     // caisse claire
          bruitBlanc(.04, .06, t, 7000);                                            // charleston
          t += pas; n++; }
      }, 80);
    }catch(e){}
  }
  function arreterBeat(){ if(beat){ clearInterval(beat); beat = null; } }
  function rapGo(){
    const R = RG(); if(!R) return coinAnglais();
    rap = { manche:0, ligne:-1, couplet:0, score:0, foule:50, choisi:[] }; lancerBeat(); afficherRap();
  }
  function scene(contenu){
    return TXT('<main class="rap-scene"><div class="projecteurs" aria-hidden="true"></div><div class="applaudimetre" role="meter" aria-label="Applaudimètre" aria-valuemin="0" aria-valuemax="100" aria-valuenow="') + rap.foule + '"><i style="width:' + rap.foule + TXT('%"></i><span>📣 Le public</span></div>') +
      contenu + '<div class="foule" aria-hidden="true">🙋🧑‍🦱👧🙋‍♂️🧒👦🙋‍♀️🧑👩‍🦰🧔</div></main>';
  }
  function afficherRap(){
    const r = rap, R = RG(); if(!r) return coinAnglais();
    if(r.manche >= R.RAP.length){
      arreterBeat(); const gagne = r.score >= 4; J().plumes += r.score * 2; if(gagne){ const e = etatAnglais(); e.victoires++; } garder(); bruit('fin');
      return poser(barre('battle') + scene('<div class="rap-centre"><div class="ami-moyen">' + ami(gagne ? 'vexe' : 'fier') + '</div><h2>' + (gagne ? TXT('🏆 Champion du micro !') : TXT('🎤 Plumo garde le micro… pour cette fois !')) + '</h2>' +
        '<p>' + r.score + '/6 rimes parfaites · ⭐ +' + r.score * 2 + ' plumes</p><p lang="en">🦉 « ' + (gagne ? 'OK… you win. Mic drop. 🎤⬇️' : 'Plumo is still the king! But you’re getting close…') + ' »</p>' +
        '<div class="actions serrees"><button class="moyen plein" data-a="rap">🔁 Revanche</button><button class="moyen" data-a="battle">🎤 Battles</button></div></div>'));
    }
    const m = R.RAP[r.manche];
    if(r.ligne < 4){ // Plumo rappe son couplet, ligne par ligne
      const l = r.ligne < 0 ? null : m.ami[r.ligne];
      poser(barre('battle') + scene(TXT('<div class="rap-centre"><p class="piege-cat">🎤 Manche ') + (r.manche + 1) + TXT('/3 · Plumo rappe</p><div class="ami-moyen micro-ami">') + ami(r.ligne % 2 ? 'fier' : 'malin') + '</div>' +
        (l ? '<p class="rap-ligne" lang="en">' + esc(l[0]) + '</p>' + traduire(l[1]) : TXT('<p class="rap-ligne">🎶 Le DJ lance le son…</p>')) +
        '<button class="gros" data-a="rap-suivant">' + (r.ligne < 3 ? TXT('Ligne suivante ▶') : TXT('À toi de répondre ! 🎤')) + '</button></div>'));
      if(l) direPhrase(l[0], 'en', 1.05);
      return;
    }
    const c = m.toi[r.couplet]; r.opts = melangeLocal([c.bon].concat(c.faux.map(f => f.m)));
    poser(barre('battle') + scene('<div class="rap-centre"><p class="piege-cat">🎤 À toi ! Rime ' + (r.manche * 2 + r.couplet + 1) + '/6 · ' + r.score + ' parfaites</p><div class="ami-moyen micro-ami">' + ami('surpris') + '</div>' +
      '<p class="rap-ligne" lang="en">' + esc(c.a[0]) + '</p><p class="rap-ligne trou" lang="en">' + esc(c.b).replace('___', '<span class="trou-mot">___</span>') + '</p>' + traduire(c.a[1] + ' / ' + c.bfr) +
      TXT('<p class="piege-consigne">Choisis le mot qui RIME et qui a du SENS :</p><div class="piege-options rap-mots">') + r.opts.map((o, k) => '<button class="moyen piege-opt" data-a="rap-rime" data-v="' + k + '" lang="en">' + esc(o) + '</button>').join('') + '</div>' +
      '<div class="piege-retour" id="rap-retour" role="status" aria-live="polite"></div></div>'));
    direPhrase(c.a[0], 'en', 1.05);
  }
  function rimeRap(k){
    const r = rap; if(!r || r.fini) return; const R = RG(), c = R.RAP[r.manche].toi[r.couplet], mot = r.opts[k]; if(mot == null) return;
    r.fini = true; const ok = mot === c.bon, f = !ok && c.faux.find(x => x.m === mot);
    if(ok){ r.score++; r.foule = Math.min(100, r.foule + 18); } else { r.foule = Math.max(0, r.foule - 15); noterBetisier(f.vanne); noterErreur('rap:' + c.bon + '>' + mot); }
    garder();
    document.querySelectorAll('.rap-mots .piege-opt').forEach((b, i) => { b.disabled = true; if(r.opts[i] === c.bon) b.classList.add('ok'); else if(i === k) b.classList.add('ko'); });
    const vers = c.b.replace('___', c.bon), cri = (ok ? R.FOULE.feu : R.FOULE.froid)[Math.floor(Math.random() * 3)];
    const el = $('#rap-retour'), jauge = document.querySelector('.applaudimetre i'); if(jauge) jauge.style.width = r.foule + '%';
    if(el) el.innerHTML = '<p class="' + (ok ? 'piege-bravo' : 'piege-vanne') + '">' + cri + (ok ? '' : ' ' + esc(f.vanne)) + '</p><p class="piege-bon" lang="en">🎤 « ' + esc(vers) + ' »</p>' +
      '<button class="moyen plein" data-a="rap-apres">Suite ▶</button>';
    bruit(ok ? 'juste' : 'boing'); direPhrase(c.a[0] + ' ' + vers, 'en', 1.05);
  }

  // ── Le salon des battles en direct (Supabase Realtime) ──
  let salon = null;
  const salonPret = () => !!(window.SALON && (CONFIG.SERVEUR || (CONFIG.SALON_URL && CONFIG.SALON_CLE)));
  // Serveur PHP s'il est configuré, sinon Supabase Realtime.
  const connexionSalon = () => CONFIG.SERVEUR ? window.SALON.connecterPhp(CONFIG.SERVEUR) : window.SALON.connecter(CONFIG.SALON_URL, CONFIG.SALON_CLE);
  function salonAccueil(){
    quitterSalon();
    if(!salonPret()) return poser(barre('battle') + TXT('<main class="coin-anglais"><h2>🛸 Le salon des battles en direct</h2><p class="pieges-intro">Le direct n’est pas encore branché sur ce site (il faut le serveur des parents : voir SALON-EN-LIGNE.md).</p><p>En attendant, défie tes potes avec un lien : c’est la même battle, chacun de son côté !</p><p><button class="gros" data-a="defi-pote">📨 Défier un pote par lien</button></p></main>'));
    poser(barre('battle') + TXT('<main class="coin-anglais"><h2>🛸 Le salon des battles</h2><p class="pieges-intro">Retrouve tes potes ou ta famille dans un salon, puis battle en direct : pièges, répliques, oreilles, vrai ou faux !</p>') +
      TXT('<p><label>Ton pseudo (pas ton vrai nom complet) : <input class="champ-pseudo" id="pseudo" maxlength="12" value="') + esc(base.pseudo || '') + '"></label></p>' +
      TXT('<div class="cartes-anglais"><button class="carte-anglais" data-a="salon-creer" data-v="prive"><span class="ic">🔒</span><strong>Salon privé</strong><small>Tu partages un code avec tes potes</small></button>') +
      TXT('<div class="carte-anglais"><span class="ic">🔑</span><strong>J’ai un code</strong><input class="champ-code" id="code-salon" maxlength="5" autocapitalize="characters" placeholder="ABCDE" aria-label="Code du salon"><button class="moyen plein" data-a="salon-rejoindre">Entrer</button></div>') +
      TXT('<button class="carte-anglais" data-a="salon-public"><span class="ic">🌍</span><strong>Salons publics</strong><small>Avec d’autres joueurs : réactions toutes faites seulement</small></button></div>') +
      TXT('<p class="aide" id="salon-msg" role="status"></p><p class="petit">🔒 Rien n’est enregistré sur le serveur. Pas de photo, pas de vrai nom.') + (base.salonChat ? TXT(' Le chat est activé pour les salons privés.') : TXT(' Le chat écrit est désactivé (activable par un parent).')) + '</p></main>');
  }
  function pseudoSalon(){ const p = RG().nettoiePseudo(($('#pseudo') || {}).value || base.pseudo); if(p){ base.pseudo = p; garder(); } return p; }
  function quitterSalon(){ if(salon){ try{ salon.canal && salon.canal.quitter(); salon.lobby && salon.lobby.quitter(); salon.cnx && salon.cnx.fermer(); }catch(e){} clearInterval(salon.chrono); salon = null; } }
  function ouvrirSalon(code, publicS){
    const S = window.SALON, p = pseudoSalon(); if(!p){ const m = $('#salon-msg'); if(m) m.textContent = TXT('Choisis d’abord un pseudo ! 🙂'); return; }
    if(!S.codeValide(code)){ const m = $('#salon-msg'); if(m) m.textContent = 'Le code fait 5 lettres (ex. KTRZB).'; return; }
    quitterSalon();
    const id = Math.random().toString(36).slice(2, 10), cnx = connexionSalon();
    salon = { code, public:!!publicS, id, cnx, joueurs:{}, muets:new Set(), messages:[], partie:null, entree:Date.now(), couleur:Math.floor(Math.random() * 6) };
    salon.canal = cnx.rejoindre('ami-salon-' + code, id, {
      rejoint:() => { salon.canal.suivre({ id, p, c:salon.couleur, t:salon.entree, pub:salon.public }); },
      presence:pr => { if(!salon) return; salon.joueurs = pr; majLobbyPublic(); if(!salon.partie) afficherSalle(); else majScores(); },
      message:(ev, d) => recevoirSalon(ev, d),
      erreur:() => { const m = $('#salle-msg'); if(m) m.textContent = TXT('⚠️ Connexion perdue. Vérifie internet.'); }
    });
    afficherSalle();
  }
  const listeJoueurs = () => Object.values(salon.joueurs || {}).filter(Boolean).sort((a, b) => a.t - b.t || (a.id < b.id ? -1 : 1));
  const estHote = () => { const l = listeJoueurs(); return !!l.length && l[0].id === salon.id; };
  function majLobbyPublic(){
    if(!salon || !salon.public) return;
    if(estHote()){ if(!salon.lobby){ salon.lobby = salon.cnx.rejoindre(window.SALON.PUBLIC, 'salon-' + salon.code, {}); setTimeout(() => majLobbyPublic(), 300); return; }
      salon.lobby.suivre({ code:salon.code, p:base.pseudo, n:listeJoueurs().length, joue:!!salon.partie, t:salon.entree }); }
  }
  function afficherSalle(){
    const S = window.SALON; if(!salon) return salonAccueil();
    const l = listeJoueurs(), hote = estHote(), chat = !salon.public && base.salonChat;
    poser(barre('salon') + '<main class="salle"><h2>🛸 Salon <span class="code-salon">' + salon.code + '</span>' + (salon.public ? ' 🌍' : ' 🔒') + '</h2>' +
      (salon.public ? '' : TXT('<p class="petit">Donne ce code à tes potes, ou <button class="petit-bouton" data-a="salon-inviter">📤 envoie l’invitation</button></p>')) +
      '<div class="vaisseau">' + l.map((j, k) => '<button class="joueur-salon' + (salon.muets.has(j.id) ? ' muet' : '') + '" data-a="salon-muet" data-v="' + esc(j.id) + '" aria-label="' + esc(j.p) + (salon.muets.has(j.id) ? ' (muet)' : '') + '" style="--d:' + (k * .3) + 's">' +
        '<span class="avatar">' + ami(k === 0 ? 'fier' : 'content', { couleur:j.c % 6, immobile:true }) + '</span><span class="nom">' + (k === 0 ? '👑 ' : '') + esc(j.p) + (j.id === salon.id ? ' (toi)' : '') + '</span><span class="bulle-reaction" id="r-' + esc(j.id) + '"></span></button>').join('') + '</div>' +
      '<p class="aide" id="salle-msg" role="status">' + (l.length < 2 ? TXT('En attente d’au moins un autre joueur…') : l.length + TXT(' joueurs dans le salon')) + '</p>' +
      '<div class="reactions">' + S.REACTIONS.map(r => '<button class="reaction" data-a="salon-reaction" data-v="' + r.id + '" title="' + esc(r.fr) + '" lang="en">' + r.e + ' ' + esc(r.en) + '</button>').join('') + '</div>' +
      (chat ? '<div class="chat-salon"><ul id="chat-liste">' + salon.messages.map(m => '<li><strong>' + esc(m.p) + ' :</strong> ' + esc(m.t) + '</li>').join('') + '</ul><p><input id="chat-texte" maxlength="80" placeholder="Message (sois sympa !)" aria-label="Message"> <button class="moyen" data-a="salon-chat">Envoyer</button></p></div>' : '') +
      (hote ? '<p><button class="gros" data-a="salon-lancer"' + (l.length < 2 ? ' disabled' : '') + TXT('>▶ Lancer la battle d’anglais (6 questions)</button></p>') + (window.MATHS ? '<p><button class="moyen" data-a="salon-lancer" data-v="' + etatMaths().niveau + '"' + (l.length < 2 ? ' disabled' : '') + TXT('>🔢 Battle de maths (') + etatMaths().niveau + ')</button></p>' : '') : '<p class="petit">👑 ' + esc(l[0] ? l[0].p : '') + TXT(' lancera la battle.</p>')) +
      TXT('<p class="petit">Touche un joueur pour le rendre muet. 🔇</p></main>'));
  }
  function recevoirSalon(ev, d){
    if(!salon || !d || typeof d !== 'object') return;
    const S = window.SALON, auteur = d.id && salon.joueurs[d.id] ? salon.joueurs[d.id] : null;
    if(d.id && salon.muets.has(d.id) && ev !== 'debut' && ev !== 'suivante' && ev !== 'rep') return;
    if(ev === 'reaction'){ const r = S.REACTIONS.find(x => x.id === d.r); const b = r && $('#r-' + CSS.escape(String(d.id))); if(b){ b.textContent = r.e + ' ' + r.en; b.classList.remove('vue'); void b.offsetWidth; b.classList.add('vue'); } else if(r && salon.partie) toastSalon((auteur ? auteur.p : '?') + ' : ' + r.e + ' ' + r.en); return; }
    if(ev === 'chat'){ if(salon.public || !base.salonChat || !auteur) return; const f = S.filtrer(d.t); if(!f.texte) return;
      salon.messages = salon.messages.concat({ p:auteur.p, t:f.texte }).slice(-30); const ul = $('#chat-liste'); if(ul){ const li = document.createElement('li'); li.innerHTML = '<strong>' + esc(auteur.p) + ' :</strong> ' + esc(f.texte); ul.appendChild(li); ul.scrollTop = 1e6; } return; }
    if(ev === 'debut' && Number.isInteger(d.graine) && [6, 8].includes(d.n)){ const m = typeof d.m === 'string' && window.MATHS && MATHS.NIVEAUX.includes(d.m) ? d.m : null; salon.partie = { graine:d.graine, n:d.n, m, i:-1, liste:questionsBattle(d.graine, d.n, m), scores:{}, reps:{} }; return questionSalon(0); }
    if(ev === 'suivante' && salon.partie && Number.isInteger(d.i) && d.i > salon.partie.i) return questionSalon(d.i);
    if(ev === 'rep' && salon.partie && auteur && Number.isInteger(d.i)){ const P = salon.partie; P.reps[d.i] = P.reps[d.i] || {};
      if(P.reps[d.i][d.id] == null){ P.reps[d.i][d.id] = !!d.ok; P.scores[d.id] = (P.scores[d.id] || 0) + S.points(!!d.ok, Math.max(0, Math.min(15000, Number(d.ms) || 15000)), 15000); }
      majScores(); if(estHote() && Object.keys(P.reps[d.i]).length >= listeJoueurs().length) setTimeout(() => passerSalon(d.i + 1), 2200); }
  }
  function toastSalon(t){ const m = $('#salle-msg'); if(m) m.textContent = t; }
  function passerSalon(i){ if(salon && salon.partie && estHote() && i > salon.partie.i) salon.canal.envoyer('suivante', { i }); }
  function questionSalon(i){
    const P = salon.partie; if(!P || i <= P.i) return; P.i = i; clearInterval(salon.chrono);
    if(i >= P.n){ return finSalon(); }
    const q = P.liste[i]; P.opts = melangeLocal([q.bon].concat(q.faux.map(f => f.en))); P.debut = Date.now(); P.repondu = false;
    poser(barre('salon') + '<main class="piege-ecran salle-partie"><p class="piege-cat">🛸 ' + salon.code + ' · Question ' + (i + 1) + '/' + P.n + '</p><div class="chrono"><i id="chrono"></i></div>' +
      '<div class="piege-haut"><div class="ami-moyen" id="ami-qz">' + ami('malin') + '</div><div><p class="piege-consigne">' + esc(q.consigne) + '</p><p class="piege-fr' + (/\n/.test(q.enonce || '') ? ' piege-code' : '') + '">' + esc(q.enonce || '') + (q.ecoute ? ' <button class="bouton-rond" data-a="salon-ecouter" aria-label="Écouter">🔊</button>' : '') + '</p></div></div>' +
      '<div class="piege-options">' + P.opts.map((o, k) => '<button class="moyen piege-opt" data-a="salon-rep" data-v="' + k + '" lang="en">' + esc(o) + '</button>').join('') + '</div>' +
      '<div class="piege-retour" id="qz-retour" role="status" aria-live="polite"></div><ol class="scores-salon" id="scores-salon"></ol>' +
      '<div class="reactions">' + window.SALON.REACTIONS.slice(0, 4).map(r => '<button class="reaction" data-a="salon-reaction" data-v="' + r.id + '" lang="en">' + r.e + '</button>').join('') + '</div><p class="aide" id="salle-msg" role="status"></p></main>');
    majScores(); if(q.ecoute) direEcoute(q.ecoute, 'en');
    salon.chrono = setInterval(() => { const ms = Date.now() - P.debut, c = $('#chrono'); if(c) c.style.width = Math.max(0, 100 - ms / 150) + '%';
      if(ms > 15000){ if(!P.repondu) repondreSalon(-1); if(estHote() && ms > 17500) passerSalon(i + 1); } }, 200);
  }
  function repondreSalon(k){
    const P = salon && salon.partie; if(!P || P.repondu) return; P.repondu = true;
    const q = P.liste[P.i], choix = P.opts[k], ok = choix === q.bon, ms = Date.now() - P.debut;
    salon.canal.envoyer('rep', { id:salon.id, i:P.i, ok, ms });
    document.querySelectorAll('.piege-opt').forEach((b, i) => { b.disabled = true; if(P.opts[i] === q.bon) b.classList.add('ok'); else if(i === k) b.classList.add('ko'); });
    const f = !ok && k >= 0 && q.faux.find(x => x.en === choix), r = $('#qz-retour'), a = $('#ami-qz');
    if(a) a.innerHTML = ami(ok ? 'fete' : 'mdr');
    if(r) r.innerHTML = (ok ? '<p class="piege-bravo">Yes! 🎉 +' + window.SALON.points(true, ms, 15000) + '</p>' : '<p class="piege-vanne">😂 ' + esc(k < 0 ? TXT('Trop tard ! Plumo a eu le temps de faire une sieste. 😴') : (f && f.vanne) || 'Presque !') + '</p>') + '<p class="piege-bon" lang="en">✅ ' + esc(q.bonTexte || q.bon) + TXT('</p><p class="petit">En attente des autres joueurs…</p>');
    bruit(ok ? 'juste' : 'faux'); if(f && f.vanne) noterBetisier(f.vanne);
  }
  function majScores(){
    const ol = $('#scores-salon'); if(!ol || !salon || !salon.partie) return; const P = salon.partie;
    ol.innerHTML = listeJoueurs().map(j => ({ j, s:P.scores[j.id] || 0, ok:P.reps[P.i] && P.reps[P.i][j.id] != null })).sort((a, b) => b.s - a.s)
      .map(x => '<li>' + esc(x.j.p) + (x.j.id === salon.id ? ' (toi)' : '') + ' — ' + x.s + (x.ok ? ' ✓' : ' …') + '</li>').join('');
  }
  function finSalon(){
    clearInterval(salon.chrono); const P = salon.partie, cl = listeJoueurs().map(j => ({ j, s:P.scores[j.id] || 0 })).sort((a, b) => b.s - a.s);
    const moi = cl.findIndex(x => x.j.id === salon.id); J().plumes += Math.max(1, 4 - moi); if(moi === 0){ etatAnglais().victoires++; } garder(); bruit('fin');
    salon.partie = null; majLobbyPublic();
    poser(barre('salon') + '<main class="centre salle"><div class="ami-moyen">' + ami(moi === 0 ? 'fete' : 'mdr') + '</div><h2>' + (moi === 0 ? TXT('👑 Tu gagnes la battle !') : TXT('🏁 Battle terminée !')) + '</h2>' +
      '<ol class="podium">' + cl.map((x, k) => '<li>' + (['🥇', '🥈', '🥉'][k] || '🏅') + ' ' + esc(x.j.p) + ' — ' + x.s + ' pts</li>').join('') + '</ol>' +
      '<div class="reactions">' + window.SALON.REACTIONS.map(r => '<button class="reaction" data-a="salon-reaction" data-v="' + r.id + '" lang="en">' + r.e + ' ' + esc(r.en) + '</button>').join('') + '</div><p class="aide" id="salle-msg" role="status"></p>' +
      TXT('<div class="actions serrees"><button class="moyen plein" data-a="salon-retour">🛸 Retour au salon</button><button class="moyen" data-a="salon-quitter">🚪 Quitter</button></div></main>'));
  }
  function salonsPublics(){
    if(!salonPret()) return salonAccueil(); const p = pseudoSalon(); if(!p){ const m = $('#salon-msg'); if(m) m.textContent = TXT('Choisis d’abord un pseudo ! 🙂'); return; }
    quitterSalon(); const cnx = connexionSalon(), id = 'v' + Math.random().toString(36).slice(2, 9);
    salon = { cnx, lobbyVue:true }; const rendre = pr => { if(!salon || !salon.lobbyVue) return; const l = Object.values(pr || {}).filter(x => x && window.SALON.codeValide(x.code) && !x.joue && x.n < 8);
      poser(barre('salon') + TXT('<main class="coin-anglais"><h2>🌍 Salons publics</h2><p class="petit">Dans les salons publics, on communique seulement avec des réactions toutes faites. 🛡️</p>') +
        (l.length ? '<div class="cartes-anglais">' + l.map(x => '<button class="carte-anglais" data-a="salon-entrer-public" data-v="' + x.code + '"><span class="ic">🛸</span><strong>' + esc(x.p || '?') + '</strong><small>' + x.n + ' joueur' + (x.n > 1 ? 's' : '') + '</small></button>').join('') + '</div>' : TXT('<p>Aucun salon public ouvert pour l’instant.</p>')) +
        TXT('<p><button class="gros" data-a="salon-creer" data-v="public">🌍 Ouvrir un salon public</button></p></main>')); };
    salon.lobby = cnx.rejoindre(window.SALON.PUBLIC, id, { presence:rendre }); rendre({});
  }

  // ── Statistiques d'anglais (parcours, espace parents) ──
  function statsAnglais(){
    const e = etatAnglais();
    return { mots:base.cible === 'en' ? bienConnus() : 0, pieges:window.PIEGES ? PIEGES.maitrises(etatPieges()) : 0, situations:e.situations.length,
      histoires:e.histoires.length, dictees:e.dictees, repete:e.repete.length, victoires:e.victoires };
  }
  function serieRevisions(){
    const l = etatAnglais().revisions; if(!l.length) return 0;
    const auj = Math.floor(Date.now() / 864e5); if(l[l.length - 1] < auj - 1) return 0;
    let n = 1; for(let i = l.length - 1; i > 0 && l[i] - l[i - 1] === 1; i--) n++; return n;
  }

  // ── Moteur de questions à choix (examens, révision, histoires) : une réponse, une vanne si on se trompe ──
  let qz = null;
  // v5.95 : fréquentation anonyme. Au plus une « ouverture » et une « partie » par jour et par appareil ;
  // n'envoie que le type d'événement et la plateforme (aucun code, aucun identifiant). Respecte « Ne pas me suivre ».
  function compterVisite(e){
    if(!CONFIG.API_VISITE || navigator.doNotTrack === '1' || window.doNotTrack === '1') return;
    const cle = 'amidesmots:visite:' + e, j = new Date().toISOString().slice(0, 10);
    try{ if(localStorage.getItem(cle) === j) return; localStorage.setItem(cle, j); }catch(x){ return; }
    const p = window.Capacitor && Capacitor.getPlatform ? Capacitor.getPlatform() : 'web';
    fetch(CONFIG.API_VISITE, { method:'POST', cache:'no-store', credentials:'omit', keepalive:true, headers:{ 'Content-Type':'application/json' }, body:JSON.stringify({ e, p:['android', 'ios'].includes(p) ? p : 'web' }) }).catch(() => {});
  }
  function questionsGo(liste, opts){ compterVisite('partie'); qz = Object.assign({ liste, i:0, bonnes:0, repondu:false }, opts); afficherQuestion(); }
  // v6.0 : chrono de la veille de contrôle (mm:ss restantes), mis à jour chaque seconde.
  function chrono(fin){ const r = Math.max(0, Math.ceil((fin - Date.now()) / 1000)); return Math.floor(r / 60) + ':' + String(r % 60).padStart(2, '0'); }
  setInterval(() => { if(!qz || !qz.finA) return; const e = document.getElementById('chrono-veille'); if(e) e.textContent = '⏱️ ' + chrono(qz.finA); if(Date.now() >= qz.finA && !qz.repondu && e) afficherQuestion(); }, 1000);
  function afficherQuestion(){
    if(qz && !qz.repondu) qz.debutQ = Date.now();   // v6.9 : chrono de la question (réponse éclair ou lente)
    const z = qz; if(!z) return coinAnglais();
    if(z.i >= z.liste.length || (z.finA && Date.now() >= z.finA)) return z.fin(z);   // v6.0 : finA = fin du chrono (veille de contrôle)
    const q = z.liste[z.i]; z.repondu = false; z.options = A_EN().melanger([q.bon].concat(q.faux.map(f => f.en)));
    poser(barre(z.retour || 'anglais') + '<main class="piege-ecran">' + (z.finA ? '<p class="chrono-veille" id="chrono-veille" role="timer">⏱️ ' + chrono(z.finA) + '</p>' : '') + '<p class="piege-cat">' + esc(z.titre) + ' · ' + (z.i + 1) + '/' + z.liste.length + '</p>' +
      (q.contexte ? TXT('<details class="contexte-exo" open><summary>📄 Énoncé de l’exercice</summary><p>') + esc(q.contexte).replace(/\n/g, '<br>') + '</p></details>' : '') +
      '<div class="piege-haut"><div class="ami-moyen" id="ami-qz">' + (q.image ? image(q.image, 'pic-moyenne') : z.prof ? profPi('content') : ami('content')) + '</div>' +
      '<div><p class="piege-consigne">' + esc(q.consigne) + '</p><p class="piege-fr' + (/\n/.test(q.enonce || '') ? ' piege-code' : '') + '">' + esc(q.enonce || '') + (q.ecoute ? ' <button class="bouton-rond" data-a="qz-ecouter" aria-label="Écouter">🔊</button>' + (q.lent ? ' <button class="bouton-rond" data-a="qz-lent" aria-label="Écouter lentement">🐢</button>' : '') : '') + '</p>' + (q.trad ? traduire(q.trad) : '') + '</div></div>' +
      '<div class="piege-options">' + z.options.map((o, i) => '<button class="moyen piege-opt" data-a="qz-rep" data-v="' + i + '" lang="' + (z.lang || q.lang || 'en') + '">' + esc(o) + '</button>').join('') + '</div>' +
      '<div class="piege-retour" id="qz-retour" role="status" aria-live="polite"></div></main>');
    if(q.ecoute) direEcoute(q.ecoute, 'en');
    if(!q.vanneDe && q.faux && q.faux.length){
      const sujet = z.prof ? 'maths' : z.sujet || (q.lang === 'fr' ? 'sciences' : 'anglais');
      const tm = J().maths && J().maths.ton, ton = (z.prof || q.matiere) ? ({ doux:0, taquin:2, sanspitie:3, trash:3 }[tm] ?? 2) : z.trash ? 3 : niveauHumour();
      iaPrecharger(sujet, [q.consigne, q.enonce].filter(Boolean).join(' — '), q.bon, q.faux.map(x => x.en), ton, 'fr');
    }
  }
  // v5.98 : carnet d'erreurs — les questions de matières ratées sont gardées (80 au plus, sur l'appareil)
  // pour une révision avant un contrôle ; une question réussie ensuite sort du carnet.
  const cleQ = q => String(q.enonce || '') + '\u0001' + String(q.bon);
  function carnetErreurs(q, juste){
    if(!q || !q.matiere || q.vanneDe || !Array.isArray(q.faux) || !q.faux.length) return;
    const j = J(); j.carnet = Array.isArray(j.carnet) ? j.carnet : [];
    const k = cleQ(q), i = j.carnet.findIndex(x => cleQ(x) === k);
    if(juste){ if(i >= 0) j.carnet.splice(i, 1); return; }
    const x = { matiere:q.matiere, consigne:q.consigne, enonce:q.enonce, bon:q.bon, regle:q.regle, lang:q.lang, contexte:q.contexte,
      faux:q.faux.map(f => ({ en:String(f.en), vanne:String(f.vanne || '') })), rate:jour() };
    if(i >= 0) j.carnet.splice(i, 1); j.carnet.push(x); if(j.carnet.length > 80) j.carnet.splice(0, j.carnet.length - 80);
  }
  function carnetGo(){
    const l = (J().carnet || []).slice(); if(!l.length) return matieresAccueil();
    for(let i = l.length - 1; i > 0; i--){ const k = Math.floor(Math.random() * (i + 1)); [l[i], l[k]] = [l[k], l[i]]; }
    questionsGo(l.slice(0, 20).map(x => Object.assign({}, x, { faux:x.faux.map(f => Object.assign({}, f)) })), { titre:'🎯 Mes erreurs', retour:'matieres' });
  }
  function repondreQuestion(i){
    const z = qz; if(!z || z.repondu) return;
    const q = z.liste[z.i], choix = z.options[i]; if(choix == null) return;
    z.repondu = true; const juste = choix === q.bon; if(juste) z.bonnes++;
    noterJournal(q.matiere || (z.prof || q.chap ? 'maths' : window.SCIENCES && SCIENCES.Q.some(x => x[0] === q.id) ? 'sciences' : 'anglais'), juste);
    carnetErreurs(q, juste);
    for(const f of (MODULES.hooks.question || [])) try{ f(juste, q, z); }catch(e){}   // v6.0 : modules (réexplication…)
    if(q.apres) q.apres(juste, choix); garder();
    document.querySelectorAll('.piege-opt').forEach((b, k) => { b.disabled = true; if(z.options[k] === q.bon) b.classList.add('ok'); else if(k === i) b.classList.add('ko'); });
    let f = !juste && (q.vanneDe ? { vanne:q.vanneDe(choix) } : q.faux.find(x => x.en === choix));
    const ia = f && !q.vanneDe && iaPrendre(q.bon, choix);
    if(ia) f = Object.assign({}, f, { vanne:MARQUE_IA + ia + (f.explication || ''), fraiche:null });
    else if(f && typeof f.fraiche === 'function') f.vanne = f.fraiche(memoireVannes()); // la vanne choisie est retenue par fraiche
    else if(f && f.vanne) retenirVanne(f.vanne);
    // Même erreur refaite dans la série : Prof Pi monte en pression (« Mais genre, tu fais exprès ou quoi !!!! »).
    // v6.5 : maths en anglais (interface anglaise) → seulement des vannes anglaises, jamais les listes françaises.
    const langQ = q.lang || z.lang, mathsEn = (!!z.prof || !!q.matiere) && !!langQ && langQ !== 'fr';   // v6.7 : matières traduites aussi   // v6.6 : toute langue traduite, pas seulement l'anglais
    const ESC = mathsEn ? (window.MATHS_LANGUES && MATHS_LANGUES[langQ] && MATHS_LANGUES[langQ].escalade) : window.VANNES_CASH && VANNES_CASH.ESCALADE;
    if(f && f.cle && z.prof && ESC){ z.memesErreurs = z.memesErreurs || {}; const n = z.memesErreurs[f.cle] = (z.memesErreurs[f.cle] || 0) + 1;
      if(n >= 2){ const E = ESC[etatMaths().ton] || ESC.taquin, niv = E[Math.min(n, 4) - 2], m = memoireVannes();
        // Parmi les variantes de ce niveau, une pas encore dite (sinon la plus ancienne).
        const neuves = niv.filter(l => m.age(l) < 0), l = neuves.length ? neuves[Math.floor(Math.random() * neuves.length)] : niv.slice().sort((a, b) => m.age(b) - m.age(a))[0];
        retenirVanne(l); f.vanne = l + ' ' + f.vanne; } }
    // v5.77 : 🥊 trash talk — Plumo chambre la réponse et se la raconte ; il compte les séries.
    const TT = window.TRASH_TALK, gbQ = /^gb-/.test(q.matiere || '') || mathsEn, trash = !!TT && !gbQ && (z.trash || ((z.prof || q.matiere) && (J().maths || {}).ton === 'trash'));   // v6.1 : gbQ = programme anglais, vannes françaises exclues
    const suiteAvant = z.suite || 0;
    z.suite = juste ? Math.max(0, z.suite || 0) + 1 : Math.min(0, z.suite || 0) - 1;
    let bravoTrash = '';
    if(trash){ const m = memoireVannes(), k = Math.abs(z.suite);
      if(juste) bravoTrash = TT.choisir(k >= 3 ? TT.SERIE_OK : TT.BRAVO, { k }, m);
      else if(f){ const x = Math.random(), pool = k >= 3 ? TT.SERIE_KO : x < 0.3 && TT.TCHATCHE ? TT.TCHATCHE : x < 0.55 && TT.IMAGEES ? TT.IMAGEES : TT.ENTREE; f = Object.assign({}, f, { vanne:(pool === TT.IMAGEES ? '🥊 ' : '') + TT.choisir(pool, { k }, m) + ' ' + (f.vanne || '') }); } }
    // v5.80 : en ton taquin ou cash, une expression imagée de temps en temps (sur la réponse, jamais sur le joueur).
    // v5.82 : une vanne trop courte (« Non. ») est toujours relevée par une expression imagée ou de la tchatche ; sinon, une fois sur quatre.
    else if(TT && TT.IMAGEES && f && f.vanne && !gbQ && (z.prof || q.matiere) && (J().maths || {}).ton !== 'doux' && (String(f.vanne).length < 45 || (['taquin', 'sanspitie'].includes((J().maths || {}).ton || 'taquin') && Math.random() < 0.25))){
      const court = /^(Non\.?|Non :.*)$/.test(String(f.vanne).trim()), drole = TT.choisir(Math.random() < 0.7 ? TT.IMAGEES : TT.TCHATCHE.map(x => x.replace(/^🥊 /, '')), {}, memoireVannes());
      f = Object.assign({}, f, { vanne:drole + (court && /^Non\.?$/.test(String(f.vanne).trim()) ? '' : ' ' + f.vanne) }); }
    // v6.9 : réponse lente (plus de 25 s) → on la chambre, gentiment, sur le temps (pas en « Tout doux », pas sur une question en autre langue).
    const dtQ = z.debutQ ? Date.now() - z.debutQ : 0, tonQ = (J().maths || {}).ton || 'taquin', lentQ = dtQ > 25000 && tonQ !== 'doux' && !!TT && !!TT.lent && !gbQ && (q.lang || z.lang || 'fr') === 'fr';
    if(!juste && f && f.vanne && lentQ && Math.random() < 0.6) f = Object.assign({}, f, { vanne:TT.lent(memoireVannes()) + ' ' + f.vanne });
    if(f && f.vanne) noterBetisier(f.vanne);
    // v5.90 : une vanne aussi quand c'est juste (sauf si l'écran a son propre « bravo »).
    const anglaisSeul = gbQ || ((z.lang || q.lang) !== 'fr' && !q.matiere && !z.prof);
    // v6.9 : punchlines arrogantes sur une bonne réponse : éclair (< 3 s), mot difficile (long), ou de temps en temps dans les jeux de mots.
    const frQ = !anglaisSeul && (q.lang || z.lang || 'fr') === 'fr', difQ = /^[\p{L}’'-]{11,}$/u.test(String(q.bon || '')) && !z.prof && !q.matiere;
    if(juste && !bravoTrash && TT && TT.arrogant && frQ && tonQ !== 'doux'){
      if((dtQ > 0 && dtQ < 3000) || difQ) bravoTrash = TT.arrogant({ rapide:dtQ > 0 && dtQ < 3000, difficile:difQ }, memoireVannes()) + (z.bravo ? ' ' + z.bravo() : '');   // le bravo du prof reste
      else if(!z.prof && !q.matiere && Math.random() < 0.35) bravoTrash = TT.arrogant({ mots:true }, memoireVannes());
      else if(dtQ > 25000 && TT.lent) bravoTrash = TT.lent(memoireVannes()) + ' Mais c’est juste ! ✅';
    }
    if(juste && !bravoTrash && !z.bravo && TT && TT.bonneReponse) bravoTrash = TT.bonneReponse((J().maths || {}).ton || 'taquin', z.suite, memoireVannes(), anglaisSeul);
    // v5.91 : 3 d'affilée → Plumo prévient qu'il appelle ses potes ; la 4e → la bande débarque et vanne Plumo (jamais le joueur).
    let bande = null, raccrochage = '';
    if(TT && TT.bandePotes && !anglaisSeul){
      const tonA = (J().maths || {}).ton || 'taquin';
      // v6.4 : la bande ne vient qu'UNE fois par série de questions (plus de rappel à 8, 12… : pas de répétition).
      if(!z.potesVenus && juste && z.suite === 3) bravoTrash = TT.annoncePotes(tonA, memoireVannes());
      else if(!z.potesVenus && juste && z.suite === 4){ bande = TT.bandePotes(memoireVannes(), null, tonA); z.potesVenus = true; }
      else if(!z.potesVenus && !juste && suiteAvant === 3) raccrochage = TT.raccroche(memoireVannes());
    }
    const az = $('#ami-qz'); if(az && !q.image) az.innerHTML = z.prof ? profPi(juste ? 'fier' : 'mdr') : ami(bande ? 'surpris' : juste ? (q.humeurJuste || 'fete') : raccrochage ? 'fete' : (q.humeurFaux || (niveauHumour() > 1 ? 'mdr' : 'surpris')));
    if(z.onReponse) z.onReponse(juste, q);
    const r = $('#qz-retour');
    const fr_ = (z.lang || q.lang) === 'fr';
    z.derniereVanne = (!juste && f && f.vanne ? String(f.vanne) : juste ? bravoTrash : '').slice(0, 220);
    const bandeHtml = bande ? '<div class="bande-potes" role="group" aria-label="La bande de Plumo"><p class="bande-entree">' + esc(bande.entree) + '</p>' +
      bande.potes.map((p, k) => '<p class="pote" style="animation-delay:' + (k * 0.45).toFixed(2) + 's"><span class="pote-ic" aria-hidden="true">' + (window.BANDE && BANDE.svg(p.id) || p.ic) + '</span><span><strong>' + esc(p.nom) + '</strong> ' + esc(p.dit) + '</span></p>').join('') + '</div>' : '';
    if(r) r.innerHTML = (raccrochage ? '<p class="raccroche">' + esc(raccrochage) + '</p>' : '') + bandeHtml + (juste && bande ? '<p class="piege-bravo">🏆 ' + esc(z.suite + TXT(' d’affilée !')) + '</p>' : juste ? '<p class="piege-bravo">' + esc(bravoTrash || (z.bravo ? z.bravo() : fr_ ? TXT('Bravo ! 🎉') : 'Yes! 🎉')) + '</p>' : '<p class="piege-vanne">' + (z.prof ? '🦝 ' : '😂 ') + esc(f && f.vanne ? f.vanne : fr_ ? TXT('Presque !') : 'Nearly!') + '</p>') +
      ((!juste && f && f.vanne) || (juste && bravoTrash) ? '<p class="avis-vanne"><button class="petit-bouton" data-a="qz-avis" data-v="1">😂 ' + (fr_ ? TXT('Trop drôle') : 'Funny') + '</button> <button class="petit-bouton" data-a="qz-avis" data-v="-1">🙄 ' + (fr_ ? TXT('Pas drôle') : 'Not funny') + '</button></p>' : '') +
      '<p class="piege-bon" lang="' + (fr_ ? 'fr' : 'en') + '">✅ ' + esc(q.bonTexte || q.bon) + '</p>' + (q.regle ? '<p class="piege-regle">💡 ' + esc(q.regle) + '</p>' : '') +
      '<button class="moyen plein" data-a="qz-suivant">' + (z.i + 1 < z.liste.length ? TXT('Suivant →') : TXT('Voir le résultat')) + '</button>';
    bruit(juste ? 'juste' : 'faux'); if(!juste && niveauHumour() > 0) bruit('boing');
    if(q.dire) direPhrase(q.dire, 'en');
  }
  const qPiege = p => ({ consigne:TXT('Comment dit-on en anglais ?'), enonce:'🇫🇷 ' + p.fr, bon:p.bon, faux:p.faux, regle:p.regle, dire:p.bon,
    apres:juste => { PIEGES.noter(etatPieges(), p.id, juste); if(!juste) noterErreur('piege:' + p.id); } });

  // ── Parcours par niveaux + examen ──
  function parcours(){
    qz = null;
    if(!piegesDispo() || !window.PARCOURS) return pieges();
    const e = etatAnglais(), prog = PARCOURS.progression(statsAnglais(), e.niveaux);
    poser(barre('anglais') + TXT('<main class="coin-anglais parcours"><h2>🧭 Mon parcours d’anglais</h2><p class="pieges-intro">Trois niveaux. Chaque étape se fait en jouant ; à la fin, un petit examen.</p>') +
      prog.map(n => '<section class="niveau' + (n.ouvert ? '' : ' ferme') + (n.valide ? ' valide' : '') + '"><h3>' + n.icone + TXT(' Niveau ') + n.n + ' · ' + esc(n.titre) + (n.valide ? ' 🎓' : n.ouvert ? '' : ' 🔒') + '</h3>' +
        (n.ouvert ? '<ul>' + n.etapes.map(x => '<li class="' + (x.ok ? 'ok' : '') + '"><button class="etape" data-a="' + x.action + '">' + x.icone + ' ' + esc(x.texte) + '<span>' + (x.ok ? '✅' : x.fait + '/' + x.n) + '</span></button></li>').join('') + '</ul>' +
          (n.valide ? TXT('<p class="petit">Examen réussi ! 🎓</p>') : n.pret ? '<button class="gros" data-a="examen" data-v="' + n.n + TXT('">🎓 Passer l’examen du niveau ') + n.n + '</button>' : TXT('<p class="petit">Termine les étapes pour débloquer l’examen.</p>'))
          : TXT('<p class="petit">Réussis l’examen du niveau ') + (n.n - 1) + TXT(' pour ouvrir celui-ci.</p>')) + '</section>').join('') + '</main>');
  }
  function examenGo(n){
    const e = etatAnglais(), prog = PARCOURS.progression(statsAnglais(), e.niveaux), niv = prog.find(x => x.n === n);
    if(!niv || !niv.pret || niv.valide) return parcours();
    const liste = PARCOURS.examen(n, PIEGES, A_EN()).map(q => Object.assign({}, q, { apres:juste => { if(!juste) noterErreur('examen:' + n); } }));
    questionsGo(liste, { titre:TXT('🎓 Examen du niveau ') + n, retour:'parcours', fin:z => {
      const ok = z.bonnes >= PARCOURS.REUSSITE;
      if(ok){ const et = etatAnglais(); if(!et.niveaux.includes(n)) et.niveaux.push(n); J().plumes += 10; garder(); bruit('fin'); }
      poser(barre('parcours') + '<main class="centre"><div class="ami-moyen">' + ami(ok ? 'fete' : 'content') + '</div><h2>' + (ok ? TXT('🎓 Niveau ') + n + TXT(' réussi !') : 'Presque !') + '</h2>' +
        '<p>' + z.bonnes + '/' + z.liste.length + TXT(' bonnes réponses (il en faut ') + PARCOURS.REUSSITE + ').</p>' +
        (ok ? '<p>⭐ +10 plumes. ' + (n < 3 ? 'Le niveau ' + (n + 1) + TXT(' est ouvert !') : TXT('Tu as terminé tout le parcours ! 🏆')) + '</p>' : TXT('<p>Fais ta révision du jour et retente ta chance : les questions changent à chaque fois.</p>')) +
        '<div class="actions serrees"><button class="moyen plein" data-a="parcours">🧭 Mon parcours</button>' + (ok ? '' : TXT('<button class="moyen" data-a="revision">🔁 Révision</button>')) + '</div></main>');
    } });
  }

  // ── Révision du jour : un seul paquet avec tout ce qui est fragile (mots, pièges, répliques, histoires) ──
  function revisionDue(){
    if(!piegesDispo()) return [];
    const auj = PIEGES.jourNum(), ep = etatPieges();
    const mots = base.cible === 'en' ? aRevoir().slice(0, 4) : [];
    const pg = PIEGES.liste.filter(p => ep[p.id] && ep[p.id].d <= auj).sort((a, b) => ep[a.id].b - ep[b.id].b).slice(0, 3);
    return mots.map(m => ({ mot:m })).concat(pg.map(p => ({ piege:p })));
  }
  function revisionGo(){
    if(!piegesDispo() || !A_EN()) return pieges();
    const e = etatAnglais(), M = A_EN().melanger;
    const liste = revisionDue().map(x => x.mot ? qMot(x.mot) : qPiege(x.piege));
    // Une réplique de situation déjà jouée, une question d'histoire déjà lue.
    const sits = A_EN().SITUATIONS.filter(s => e.situations.includes(s.id));
    const reps = []; for(const s of sits) for(const et of s.etapes) if(et.dit && et.mode !== 'comprendre') reps.push({ consigne:s.icone + ' ' + s.qui + ' te dit :', enonce:'« ' + et.dit + ' »', ecoute:et.dit, bon:et.bon, faux:et.faux, regle:'🇫🇷 ' + et.fr, dire:et.bon });
    if(reps.length) liste.push(M(reps)[0]);
    const hq = []; if(window.HISTOIRES) for(const h of HISTOIRES.liste.filter(h => e.histoires.includes(h.id))) for(const q of h.questions) hq.push(qHistoire(h, q));
    if(hq.length) liste.push(M(hq)[0]);
    // Rien de dû ? Des pièges nouveaux pour avancer.
    if(liste.length < 6) for(const p of PIEGES.seance(etatPieges(), 6)) if(liste.length < 6 && !liste.some(q => q.bon === p.bon)) liste.push(qPiege(p));
    questionsGo(M(liste).slice(0, 8), { titre:TXT('🔁 Révision du jour'), retour:'anglais', fin:z => {
      const r = etatAnglais(), auj = Math.floor(Date.now() / 864e5); if(!r.revisions.includes(auj)) r.revisions.push(auj);
      J().plumes += z.bonnes; garder(); bruit('fin');
      const sj = serieRevisions();
      poser(barre('anglais') + '<main class="centre"><div class="ami-moyen">' + ami('fete') + TXT('</div><h2>🔁 Révision faite !</h2><p>') + z.bonnes + '/' + z.liste.length + ' · ⭐ +' + z.bonnes + ' plumes</p>' +
        (sj > 1 ? '<p class="battle-score">🔥 ' + sj + TXT(' jours de suite</p>') : TXT('<p>Reviens demain : 5 minutes par jour, c’est le secret pour retenir.</p>')) +
        '<div class="actions serrees"><button class="moyen plein" data-a="anglais">🇬🇧 Coin anglais</button><button class="moyen" data-a="parcours">🧭 Mon parcours</button></div></main>');
    } });
  }
  function qMot(e){
    const autres = motsOuverts(base.cible).filter(x => x !== e && MOTS[x] && MOTS[e] && MOTS[x].theme === MOTS[e].theme);
    const l = A_EN().melanger(autres.length >= 2 ? autres : motsOuverts(base.cible).filter(x => x !== e)).slice(0, 2);
    const nom = x => nomMot(x);
    return { consigne:TXT('Comment dit-on en anglais ?'), image:e, enonce:traduction(e) ? '🇫🇷 ' + traduction(e) : '', bon:nom(e), faux:l.map(x => ({ en:nom(x) })), dire:nom(e),
      vanneDe:choix => { const x = l.find(y => nom(y) === choix); return x ? blague(x, e) : 'Presque !'; }, apres:juste => noter(e, juste) };
  }
  const qHistoire = (h, q) => ({ consigne:h.icone + ' ' + h.titre, enonce:q.q, trad:q.fr, bon:q.bon, faux:q.faux, dire:q.bon });

  // ── Mini-histoires : une phrase à la fois, puis 2 questions ──
  let lecture = null;
  function histoires(){
    lecture = null;
    if(!piegesDispo() || !window.HISTOIRES) return pieges();
    const e = etatAnglais();
    poser(barre('anglais') + TXT('<main class="coin-anglais"><h2>📖 Mini-histoires</h2><p class="pieges-intro">Écoute, lis, et réponds à 2 petites questions.</p><div class="cartes-anglais">') +
      HISTOIRES.liste.map(h => '<button class="carte-anglais" data-a="histoire-go" data-v="' + h.id + '"><span class="ic">' + h.icone + '</span><strong lang="en">' + esc(h.titre) + '</strong><small>' + esc(h.fr) + '</small><em>' + (e.histoires.includes(h.id) ? '✅ lue' : TXT('▶ à lire')) + '</em></button>').join('') + '</div></main>');
  }
  function histoireGo(id){ const h = window.HISTOIRES && HISTOIRES.liste.find(x => x.id === id); if(!h) return histoires(); lecture = { h, i:0 }; afficherLigne(); }
  function afficherLigne(){
    const L = lecture; if(!L) return histoires();
    const h = L.h;
    if(L.i >= h.lignes.length){
      return questionsGo(h.questions.map(q => qHistoire(h, q)), { titre:h.icone + ' ' + h.titre, retour:'histoires', fin:z => {
        const e = etatAnglais(); const neuve = !e.histoires.includes(h.id); if(neuve) e.histoires.push(h.id); J().plumes += z.bonnes + (neuve ? 2 : 0); garder(); bruit('fin');
        poser(barre('histoires') + '<main class="centre"><div class="ami-moyen">' + ami('fete') + '</div><h2>' + h.icone + ' The end!</h2><p>' + z.bonnes + '/' + z.liste.length + TXT(' bonnes réponses') + (neuve ? ' · ⭐ +' + (z.bonnes + 2) + ' plumes' : '') + '</p>' +
          '<div class="actions serrees"><button class="moyen plein" data-a="histoires">📖 Autres histoires</button><button class="moyen" data-a="anglais">🇬🇧 Coin anglais</button></div></main>');
      } });
    }
    const [em, en, fr] = h.lignes[L.i];
    poser(barre('histoires') + '<main class="battle-ecran lecture"><p class="piege-cat">' + h.icone + ' <span lang="en">' + esc(h.titre) + '</span> · ' + (L.i + 1) + '/' + h.lignes.length + '</p>' +
      '<div class="lecture-image" aria-hidden="true">' + em + '</div>' +
      '<p class="lecture-texte" lang="en">' + esc(en) + ' <button class="bouton-rond" data-a="ligne-ecouter" aria-label="Écouter">🔊</button></p>' + traduire(fr) +
      '<div class="actions serrees">' + (L.i ? '<button class="moyen" data-a="ligne-avant">←</button>' : '') + '<button class="moyen plein" data-a="ligne-suivante">' + (L.i + 1 < h.lignes.length ? 'Suite →' : TXT('Les questions →')) + '</button></div></main>');
    direPhrase(en, 'en');
  }

  // ── Répète après Plumo : on s'enregistre (sur l'appareil seulement), on se réécoute, on compare ──
  let rep1 = null;
  function repeter(){
    if(!piegesDispo() || !window.PARCOURS) return pieges();
    const e = etatAnglais(), l = PARCOURS.REPETER;
    let i = l.findIndex((x, k) => !e.repete.includes(k)); if(i < 0) i = Math.floor(Math.random() * l.length);
    afficherRepeter(i);
  }
  function afficherRepeter(i){
    arreterMicro();
    const l = PARCOURS.REPETER, ph = l[i]; if(!ph) return repeter();
    rep1 = { i };
    const fait = etatAnglais().repete.includes(i);
    poser(barre('anglais') + TXT('<main class="battle-ecran repeter"><p class="piege-cat">🗣️ Répète après Plumo · ') + etatAnglais().repete.length + '/' + l.length + ' phrases dites</p>' +
      '<div class="piege-haut"><div class="ami-moyen">' + ami('content') + '</div><div><p class="piege-fr" lang="en">« ' + esc(ph.en) + ' »</p>' + traduire(ph.fr) + '</div></div>' +
      '<div class="actions serrees"><button class="moyen" data-a="repeter-ecouter">🔊 Écouter</button><button class="moyen" data-a="repeter-lent">🐢 Lentement</button></div>' +
      TXT('<p><button class="gros micro" id="btn-micro" data-a="repeter-micro">🎤 À moi de le dire</button></p>') +
      '<p class="aide" id="rep-etat">' + (fait ? TXT('✅ Déjà dite. Tu peux t’entraîner encore !') : TXT('Écoute, puis appuie sur 🎤 et dis la phrase.')) + '</p>' +
      TXT('<div class="actions serrees" id="rep-apres" hidden><button class="moyen" data-a="me-reecouter">👂 Me réécouter</button><button class="moyen" data-a="repeter-ecouter">🦉 Plumo</button><button class="moyen plein" data-a="repeter-bien">👍 Bien dit !</button></div>') +
      TXT('<p class="petit">🔒 Ta voix reste sur cet appareil : elle n’est ni gardée ni envoyée.</p>') +
      '<p><button class="moyen" data-a="repeter-suivant">Phrase suivante →</button></p></main>');
    direEcoute(ph.en, 'en');
  }
  async function enregistrerPhrase(){
    const r = rep1; if(!r) return;
    const ph = PARCOURS.REPETER[r.i], etat = $('#rep-etat'), btn = $('#btn-micro'), apres = $('#rep-apres');
    const sansMicro = () => { if(etat) etat.textContent = TXT('Pas de micro ici : dis-la à voix haute, puis touche « 👍 Bien dit ! ».'); if(apres) apres.hidden = false; };
    if(!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia || !window.MediaRecorder) return sansMicro();
    try{
      arreterMicro();
      const flux = await navigator.mediaDevices.getUserMedia({ audio:true }), morceaux = [], rec = new MediaRecorder(flux);
      micro = { flux, rec };
      rec.ondataavailable = ev => { if(ev.data && ev.data.size) morceaux.push(ev.data); };
      rec.onstop = () => {
        flux.getTracks().forEach(p => p.stop()); if(!micro || !rep1) return;
        micro.url = URL.createObjectURL(new Blob(morceaux, { type:rec.mimeType || 'audio/webm' }));
        if(btn){ btn.classList.remove('enregistre'); btn.textContent = TXT('🎤 Encore une fois'); }
        if(apres) apres.hidden = false; if(etat) etat.textContent = TXT('Écoute-toi, puis Plumo : c’est pareil ?');
        const a = new Audio(micro.url); a.onended = () => setTimeout(() => direEcoute(ph.en, 'en'), 300); a.play().catch(() => {});
      };
      rec.start(); if(btn){ btn.classList.add('enregistre'); btn.textContent = TXT('⏺ J’écoute…'); }
      if(etat) etat.textContent = 'Vas-y, dis : « ' + ph.en + ' »';
      setTimeout(() => { if(rec.state === 'recording') rec.stop(); }, Math.min(7000, 2500 + ph.en.length * 70));
    }catch(err){ sansMicro(); }
  }

  // ── Invente ta vanne : 3 choix, toujours une phrase anglaise juste ──
  let invente = null;
  function inventeGo(){
    if(!piegesDispo() || !window.PARCOURS) return pieges();
    invente = invente || { v:0, a:0, l:0 };
    const I = PARCOURS.INVENTE, ph = PARCOURS.inventer(invente.v, invente.a, invente.l);
    const rangee = (cle, liste, titre) => '<p class="piege-consigne">' + titre + '</p><div class="puces">' + liste.map((x, k) => '<button class="puce' + (invente[cle] === k ? ' choisie' : '') + '" data-a="invente-choix" data-v="' + cle + ':' + k + '" aria-pressed="' + (invente[cle] === k) + '" lang="en">' + esc(x.en) + '</button>').join('') + '</div>';
    poser(barre('battle') + TXT('<main class="battle-ecran invente"><h2>✍️ Invente ta vanne pour Plumo</h2>') +
      rangee('v', I.verbes, '1. Ce que fait Plumo') + rangee('a', I.animaux, TXT('2. Comme qui ?')) + rangee('l', I.lieux, '3. Où ça ?') +
      '<div class="bulle-ami"><p class="piege-fr" lang="en">« ' + esc(ph.en) + ' »</p><p class="petit">🇫🇷 ' + esc(ph.fr) + '</p></div>' +
      TXT('<div class="actions serrees"><button class="moyen plein" data-a="invente-dire">🎤 Plumo, écoute ça !</button><button class="moyen" data-a="invente-garder">😂 Je la garde</button></div>') +
      '<p class="aide" id="invente-retour" role="status" aria-live="polite"></p></main>');
  }

  // ── Espace parents : petite question de calcul (pour que les enfants ne tombent pas dessus par hasard) ──
  let porteParents = null, jugeMsg = '';
  // Vannes proposées par l'IA : le juge de Plumo trie d'abord, puis un adulte garde ou jette.
  let vannesIA = null, vannesIAMsg = '', vannesIAEnCours = false;
  async function demanderVannesIA(theme, ton){
    if(!CONFIG.API_VANNES || !plus() || vannesIAEnCours) return;
    vannesIAEnCours = true; vannesIAMsg = TXT('⏳ Plumo réfléchit à des vannes…'); revoirVannesIA();
    try{
      const r = await fetch(CONFIG.API_VANNES, { method:'POST', cache:'no-store', headers:{ 'Content-Type':'application/json' }, body:JSON.stringify({ code:base.abo.code, theme, ton }) });
      const d = await r.json().catch(() => ({}));
      if(d && Array.isArray(d.vannes)){
        const l = d.vannes.filter(x => typeof x === 'string').map(x => x.replace(/[<>]/g, '').trim().slice(0, 140)).filter(Boolean).slice(0, 6);
        const avis = l.map(t => ({ t, a:window.JUGE ? JUGE.juger(t) : { ok:false, raisons:['juge absent'] } }));
        vannesIA = avis.filter(x => x.a.ok).map(x => x.t);
        const refus = avis.length - vannesIA.length;
        vannesIAMsg = vannesIA.length ? '🦉 ' + vannesIA.length + TXT(' proposition(s). À vous de choisir !') + (refus ? TXT(' (Le juge en a déjà retiré ') + refus + '.)' : '') : TXT('🤖 Aucune proposition n’a passé le juge. Réessayez.');
      }
      else vannesIAMsg = d && d.erreur === 'quota' ? TXT('⏰ C’est tout pour aujourd’hui (') + (d.max || 5) + ' demandes par jour).' : d && d.erreur === 'plus_requis' ? TXT('✨ Réservé aux abonnés Plus.') : TXT('😴 Le générateur ne répond pas. Réessayez plus tard.');
    }catch(e){ vannesIAMsg = TXT('📡 Pas de connexion : réessayez plus tard.'); }
    vannesIAEnCours = false; if($('#vannes-ia')) revoirVannesIA();
  }
  function revoirVannesIA(){ tableauParents(); const h = $('#vannes-ia'); if(h && h.scrollIntoView) h.scrollIntoView({ block:'start' }); }
  function parents(){
    porteParents = { a:6 + Math.floor(Math.random() * 4), b:6 + Math.floor(Math.random() * 4) };
    poser(barre('anglais') + TXT('<main class="centre"><h2>👪 Espace parents</h2><p>Pour entrer : combien font ') + porteParents.a + ' × ' + porteParents.b + ' ?</p>' +
      TXT('<p><input id="porte-parents" type="number" inputmode="numeric" aria-label="Résultat" class="champ-court"> <button class="moyen plein" data-a="parents-ouvrir">Entrer</button></p><p class="aide" id="porte-msg" role="status"></p></main>'));
  }
  function libelleErreur(k){
    const [t, x] = [k.slice(0, k.indexOf(':')), k.slice(k.indexOf(':') + 1)];
    if(t === 'mot'){ const [m, b] = x.split('>'); if(MOTS[m] && MOTS[b]) return 'Confond ' + b + ' « ' + nomMot(b) + TXT(' » avec ') + m + ' « ' + nomMot(m) + ' »'; }
    if(t === 'piege' && window.PIEGES){ const p = PIEGES.liste.find(y => y.id === x); if(p) return TXT('Piège : « ') + p.fr + ' » → ' + p.bon; }
    if(t === 'maths' && window.MATHS){ for(const n of MATHS.NIVEAUX){ const c = MATHS.chapitresDe(n).find(y => y[0] === x); if(c) return TXT('Maths ') + n + ' : ' + MATHS.tr.chap(c); } }
    if(t === 'epr' && window.EPREUVES){ const a = EPREUVES.ANNALES.find(y => y.ref === x); return 'Examens blancs : ' + (a ? a.titre : x); }
    if(t === 'mat' && window.MATIERES){ const [id, c] = x.split(':'), m = MATIERES.trouver(id), ch = m && m.chapitres.find(y => y.id === c); if(ch) return m.nom + ' : ' + ch.nom; }
    if(t === 'sciences' && window.SCIENCES){ const q = SCIENCES.parId(x); if(q) return TXT('Sciences : ') + q.q; }
    if(t === 'dictee'){ const [e, a] = x.split('>'); return TXT('Dictée : écrit « ') + e + TXT(' » au lieu de « ') + a + ' »'; }
    if(t === 'examen') return TXT('Erreurs à l’examen du niveau ') + x;
    return null;
  }
  // v5.75 : résumé des 7 derniers jours (tout reste sur l'appareil).
  let bilanTexte = '';
  function resumeSemaine(){
    const jr = J().journal || {}, jours = []; for(let k = 6; k >= 0; k--) jours.push(jour(-k));
    const somme = cle => jours.reduce((t, d) => t + ((jr[d] || {})[cle] || 0), 0);
    const actifs = jours.filter(d => jr[d] && Object.keys(jr[d]).length).length, min = somme('min');
    const mat = [['mots', '🖼️', TXT('Mots')], ['anglais', '🇬🇧', TXT('Anglais')], ['maths', '🔢', TXT('Maths')], ['francais', '📝', TXT('Français')], ['histoire', '🏛️', TXT('Histoire-géo')], ['svt', '🧬', TXT('SVT')], ['physique', '⚗️', TXT('Physique-chimie')], ['medecine', '🩺', TXT('Médecine')], ['droit', '⚖️', TXT('Droit')], ['astro', '🔭', 'Astrophysique'], ['sciences', '🚀', TXT('Sciences')], ['langlais', '🎓', TXT('Anglais du programme')], ['lespagnol', '🇪🇸', TXT('Espagnol')], ['lallemand', '🇩🇪', TXT('Allemand')], ['philo', '🤔', TXT('Philosophie')], ['ses', '📈', 'SES'], ['hggsp', '🌐', 'HGGSP'], ['hlp', '📜', 'HLP'], ['nsi', '💻', 'NSI']].map(([k, ic, nom]) => {
      const b = somme(k + '+'), e = somme(k + '-'), n = b + e; return n ? '<li><span>' + ic + ' ' + nom + '</span><strong>' + b + '/' + n + ' (' + Math.round(b / n * 100) + ' %)</strong></li>' : ''; }).join('');
    const barres = jours.map(d => { const x = jr[d] || {}, n = Object.keys(x).filter(k => /[+-]$/.test(k)).reduce((t, k) => t + x[k], 0);
      return '<span class="jour-barre" title="' + d + ' : ' + n + ' réponses"><i style="height:' + Math.min(100, n * 3) + '%"></i><small>' + ['D', 'L', 'M', 'M', 'J', 'V', 'S'][new Date(d + 'T12:00').getDay()] + '</small></span>'; }).join('');
    const av = Array.isArray(J().avisVannes) ? J().avisVannes : [], top = v => av.filter(x => x.v === v).slice(-4).reverse();
    // v5.93 : comparaison avec la semaine d'avant, notes des évaluations, conseil, bilan à partager.
    const avant = []; for(let k = 13; k >= 7; k--) avant.push(jour(-k));
    const reps = js => js.reduce((t, d) => { const x = jr[d] || {}; return t + Object.keys(x).filter(k => /[+-]$/.test(k)).reduce((u, k) => u + x[k], 0); }, 0);
    const bonnes = js => js.reduce((t, d) => { const x = jr[d] || {}; return t + Object.keys(x).filter(k => /\+$/.test(k)).reduce((u, k) => u + x[k], 0); }, 0);
    const rN = reps(jours), rA = reps(avant), tN = rN ? Math.round(bonnes(jours) / rN * 100) : null, tA = rA ? Math.round(bonnes(avant) / rA * 100) : null;
    const evol = rA ? '<p class="petit">' + (rN >= rA ? '⬆️ ' : '⬇️ ') + esc(tt('semaine_avant', rN, rA)) + (tN != null && tA != null ? ', ' + esc(tt('reussite', tN, tA)) : '') + '.</p>' : '';
    const faibles = [['anglais', 'l’anglais'], ['maths', TXT('les maths')], ['francais', TXT('le français')], ['histoire', TXT('l’histoire-géo')], ['svt', TXT('la SVT')], ['physique', TXT('la physique-chimie')], ['langlais', TXT('l’anglais du programme')], ['philo', TXT('la philo')], ['ses', TXT('les SES')], ['hggsp', TXT('la HGGSP')], ['hlp', TXT('la HLP')], ['nsi', TXT('la NSI')]]
      .map(([k, nom]) => { const b = somme(k + '+'), n = b + somme(k + '-'); return { nom, n, t:n ? b / n : 1 }; }).filter(x => x.n >= 5).sort((a, b) => a.t - b.t)[0];
    const conseil = faibles && faibles.t < .6 ? '<p class="aide">' + esc(tt('conseil', faibles.nom, Math.round(faibles.t * 100))) + '</p>' : '';
    const N = (J().matieres || {}).notes || {}, notes = Object.entries(N).slice(-8);
    const notesHtml = notes.length ? '<h3>' + esc(tt('notes_titre')) + '</h3><ul class="pieges-cats">' + notes.map(([k, v]) => '<li><span>' + esc(k.replace(/^blanc-/, 'Examen blanc ').replace(/-/g, ' · ')) + '</span><strong>' + String(v).replace('.', ',') + '/20</strong></li>').join('') + '</ul>' : '';
    bilanTexte = TXT('Bilan Ami des mots de la semaine : ') + actifs + TXT(' jour(s) de jeu, environ ') + min + ' min, ' + rN + TXT(' réponses') + (tN != null ? ' (' + tN + TXT(' % de réussite)') : '') + '.' + (faibles && faibles.t < .6 ? ' À retravailler : ' + faibles.nom + '.' : '');
    return '<h3>📅 Cette semaine</h3><p class="pieges-intro"><strong>' + actifs + ' jour' + (actifs > 1 ? 's' : '') + TXT('</strong> de jeu sur 7 · <strong>') + min + ' min</strong> environ</p>' + evol + conseil +
      '<div class="semaine-barres" aria-hidden="true">' + barres + '</div>' +
      (mat ? '<ul class="pieges-cats">' + mat + '</ul>' : TXT('<p class="petit">Pas encore de réponses cette semaine.</p>')) +
      notesHtml + '<p><button class="moyen" data-a="bilan-partager">' + esc(tt('partager_bilan')) + '</button></p><p class="aide" id="bilan-msg" role="status" aria-live="polite"></p>' +
      (av.length ? TXT('<h3>😂 Ce qui fait rire (ou pas)</h3><ul class="pieges-cats">') + top(1).map(x => '<li><span>😂 ' + esc(x.t) + '</span></li>').join('') + top(-1).map(x => '<li><span>🙄 ' + esc(x.t) + '</span></li>').join('') + '</ul>' : '');
  }
  function tableauParents(){
    const e = etatAnglais(), s = statsAnglais(), nv = window.PARCOURS ? PARCOURS.niveauActuel(e.niveaux) : 0;
    const err = Object.entries(J().erreurs || {}).map(([k, n]) => [libelleErreur(k), n]).filter(x => x[0]).sort((a, b) => b[1] - a[1]).slice(0, 6);
    const der = e.revisions.length ? new Date(e.revisions[e.revisions.length - 1] * 864e5).toLocaleDateString('fr-FR') : 'jamais';
    const ligne = (ic, t, v) => '<li><span>' + ic + ' ' + t + '</span><strong>' + v + '</strong></li>';
    poser(barre('anglais') + TXT('<main class="coin-anglais parents"><h2>👪 Espace parents</h2>') + cartesModules('parents') +
      TXT('<p class="pieges-intro">Niveau réussi : <strong>') + (nv ? nv + ' / 3' : TXT('pas encore')) + TXT('</strong> · Révisions : <strong>') + e.revisions.length + ' jour' + (e.revisions.length > 1 ? 's' : '') + TXT('</strong> (dernière : ') + der + TXT(', série : ') + serieRevisions() + ')</p>' +
      '<ul class="pieges-cats">' + ligne('📚', TXT('Mots anglais bien connus'), s.mots) + ligne('🪤', TXT('Pièges déjoués'), s.pieges + '/' + (window.PIEGES ? PIEGES.liste.length : 0)) + ligne('☕', TXT('Situations réussies'), s.situations + '/' + A_EN().SITUATIONS.length) +
        ligne('📖', TXT('Histoires lues'), s.histoires + '/' + (window.HISTOIRES ? HISTOIRES.liste.length : 0)) + ligne('✍️', TXT('Phrases parfaites en dictée'), s.dictees) + ligne('🗣️', TXT('Phrases dites à voix haute'), s.repete) + ligne('🎤', TXT('Battles gagnées'), s.victoires) + '</ul>' +
      resumeSemaine() +
      TXT('<h3>🔎 Ce qui coince</h3>') + (err.length ? '<ul class="pieges-cats">' + err.map(([t, n]) => ligne('•', esc(t), n + '×')).join('') + TXT('</ul><p class="petit">Astuce : la révision du jour reprend ces points automatiquement.</p>') : TXT('<p>Rien de particulier pour l’instant. 👍</p>')) +
      TXT('<h3>🤖 Le juge de vannes de Plumo</h3><p class="petit">Plumo garde les vannes qui font rire (😂) et retire celles qui tombent à plat (🙄). Il refuse toute vanne qui vise la personne (insulte, physique, gros mot, violence, infos perso).</p>') +
      '<ul class="pieges-cats">' + (() => { const sc = J().notesVannes || {}, v = Object.values(sc); return TXT('<li><span>😂 Vannes favorites</span><strong>') + v.filter(x => x >= 2).length + TXT('</strong></li><li><span>🗑️ Vannes retirées</span><strong>') + v.filter(x => window.JUGE && x <= JUGE.SEUIL).length + '</strong></li>'; })() + '</ul>' +
      TXT('<h3>😂 Les vannes de la famille</h3><p class="petit">Plumo les ressortira de temps en temps. Écrivez {f} pour le mauvais mot et {j} pour le bon (facultatif). Restez gentils : on taquine la confusion, pas la personne !</p>') +
      '<p><input id="vanne-famille" maxlength="140" placeholder="Ex. : « {f} » ? Même tonton Marcel n’aurait pas osé ! C’était « {j} »." class="champ-long"> <button class="moyen" data-a="vanne-famille-ajout">Ajouter</button></p>' +
      (jugeMsg ? '<p class="aide" role="status">' + esc(jugeMsg) + '</p>' : '') +
      '<ul class="pieges-cats">' + (J().vannesFamille || []).map((v, k) => '<li><span>' + esc(v) + '</span><button class="petit-bouton" data-a="vanne-famille-suppr" data-v="' + k + '" aria-label="Supprimer">🗑️</button></li>').join('') + '</ul>' +
      (CONFIG.API_VANNES ? TXT('<h3 id="vannes-ia">✨ Plumo propose des vannes (IA)</h3>') + (plus()
        ? TXT('<p class="petit">L’IA propose, le juge de Plumo trie, et c’est vous qui choisissez : rien n’arrive dans le jeu sans votre accord.</p>') +
          '<p><select id="vannes-ia-theme" aria-label="Thème">' + THEMES.map(th => '<option value="' + th + '">' + esc(t('th_' + th)) + '</option>').join('') + '<option value="anglais">🇬🇧 Coin anglais</option></select> ' +
          TXT('<select id="vannes-ia-ton" aria-label="Ton"><option value="tout-doux">Tout doux</option><option value="normal" selected>Taquin</option><option value="corse">Corsé (ados)</option></select> ') +
          '<button class="moyen" data-a="vannes-ia"' + (vannesIAEnCours ? ' disabled' : '') + '>✨ Proposer 6 vannes</button></p>' +
          (vannesIAMsg ? '<p class="aide" role="status">' + esc(vannesIAMsg) + '</p>' : '') +
          (vannesIA && vannesIA.length ? '<ul class="pieges-cats">' + vannesIA.map((v, k) => '<li><span>' + esc(v) + '</span><span><button class="petit-bouton" data-a="vanne-ia-garder" data-v="' + k + '" aria-label="Garder">✅</button> <button class="petit-bouton" data-a="vanne-ia-non" data-v="' + k + '" aria-label="Jeter">❌</button></span></li>').join('') + '</ul>' : '')
        : TXT('<p class="petit">✨ Avec Plus, Plumo peut vous proposer des vannes inventées par l’IA, que vous validez une à une.</p>')) : '') +
      TXT('<h3>🛸 Salon des battles</h3><p><label><input type="checkbox" id="salon-chat"') + (base.salonChat ? ' checked' : '') + TXT(' data-a="salon-chat-reglage"> Autoriser le chat écrit dans les salons PRIVÉS (entre potes qui ont le code). Les salons publics restent en réactions toutes faites.</label></p>') +
      TXT('<p class="petit">🔒 Ces informations restent sur cet appareil. <a href="legal.html#confidentialite">') + esc(tt('donnees')) + '</a> · <a href="legal.html#cgv">' + esc(tt('cgv')) + '</a></p></main>');
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
    poser(barre('accueil') + '<main><h2>📒 ' + esc(t('carnet')) + '</h2><p class="aide">' + esc(t('carnet_aide')) + ' · ' + esc(t('maitrise', bienConnus())) + '</p>' +
      '<p class="centre"><button class="moyen" data-a="fous-rires">😂 ' + (base.ui === 'en' ? 'My laughs' : 'Mes fous rires') + ' (' + (J().fousRires || []).length + ')</button></p>' + corps + '<p class="note" id="note-voix" aria-live="polite"></p></main>');
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
      }).join('') + Object.entries(accModules()).map(([k, x]) => { const dispo = x.debloque(), porte = J().porte.includes(k);
        return '<div class="acc saison' + (dispo ? '' : ' verrou') + '"><div class="ami-mini">' + ami('content', { porte:[k], immobile:true }) + '</div><strong>' + esc(x.nom(base.ui)) + '</strong>' +
          (dispo ? '<button class="moyen' + (porte ? '' : ' plein') + '" data-a="porter" data-v="' + k + '">' + esc(porte ? t('enlever') : t('mettre')) + '</button>' : '<span class="seuil">🔒 ' + esc(x.condition(base.ui)) + '</span>') + '</div>'; }).join('') + '</div></main>');
  }
  // v6.0 : accessoires apportés par les modules (tenues de saison) : { plat, cadre, nom(ui), condition(ui), debloque() }.
  function accModules(){ return (MODULES.accessoires && typeof MODULES.accessoires === 'object') ? MODULES.accessoires : {}; }
  // v5.67 : graphismes Auto / Normal / Ultra (gardé sur l'appareil, partagé avec le village 3D et Mots City).
  function reglageGraphismes(){
    const G = window.GRAPHISMES; if(!G) return '';
    const en = base.ui === 'en', c = G.choix(), puissant = G.puissant();
    const noms = { auto:'Auto', normal:'Normal', ultra:'💎 Ultra' };
    return '<section class="reglage-graphismes"><h3>🎨 ' + (en ? 'Graphics' : 'Graphismes') + '</h3><div class="reglage"><span><span class="petit">' +
      (en ? 'Ultra: animated nebula, sparkle explosions, 3D tilt; in the 3D worlds, sun rays, soft shadows and a cinema look. '
        : TXT('Ultra : fond animé, explosions d’étincelles, images en relief ; dans les mondes 3D, rayons de soleil, ombres douces et rendu cinéma. ')) +
      (c === 'auto' ? (en ? (puissant ? 'This device is powerful: Ultra is on.' : 'This device is modest: Normal is used.') : (puissant ? TXT('Cet appareil est puissant : Ultra est activé.') : TXT('Cet appareil est modeste : Normal est utilisé.'))) : '') +
      (G.mouvementReduit() ? (en ? ' Your system asks for fewer animations: effects stay off.' : TXT(' Ton système demande moins d’animations : les effets restent coupés.')) : '') +
      '</span></span><span class="choix-graphismes">' + G.CHOIX.map(k => '<button class="moyen' + (k === c ? ' plein' : '') + '" data-a="graphismes" data-v="' + k + '" aria-pressed="' + (k === c) + '">' + esc(noms[k]) + '</button>').join('') + '</span></div></section>';
  }
  function reglageVoix(){
    const en = base.ui === 'en', langues = [base.ui].concat(base.cible !== base.ui ? [base.cible] : []).filter(l => LOCALES[l]);
    const pref = voixPreferees();
    const blocs = langues.map(l => {
      const liste = voixClassees(l);
      const opts = liste.length ? liste.map((v, i) => '<option value="' + esc(v.name) + '"' + ((pref[l] ? pref[l] === v.name : i === 0) ? ' selected' : '') + '>' + esc(v.name) + (i === 0 ? (en ? ' ★ best' : TXT(' ★ la meilleure')) : '') + '</option>').join('')
        : '<option value="">' + (en ? 'Phone voice (default)' : TXT('Voix du téléphone (par défaut)')) + '</option>';
      return '<div class="reglage reglage-voix"><label><span>' + esc(LANGUES_APPRENDRE[l] || l) + '</span> <select data-voix="' + esc(l) + '">' + opts + '</select></label>' +
        '<button class="moyen" data-a="essai-voix" data-v="' + esc(l) + '">🔊 ' + (en ? 'Try' : TXT('Essayer')) + '</button></div>';
    }).join('');
    return '<section class="reglage-voix-bloc"><h3>🗣️ ' + (en ? 'Plumo’s voice' : TXT('La voix de Plumo')) + '</h3>' + blocs +
      '<p class="petit">' + (en ? 'Robot voice? On a PC, open the app in Microsoft Edge (natural voices) or Chrome (Google voices). On Android: Settings › Text-to-speech › Google engine, then install the high-quality voice.'
        : TXT('Voix de robot ? Sur PC, ouvre l’appli dans Microsoft Edge (voix « Natural ») ou Chrome (voix Google). Sur Android : Paramètres › Synthèse vocale › moteur Google, puis installe la voix « haute qualité ». Les mots anglais, eux, sont de vrais enregistrements.')) + '</p></section>';
  }
  // v6.7 : le programme scolaire suivi est indépendant de la langue de l'appli (France ou Angleterre, dans n'importe quelle langue).
  const PROG_TX = {
    titre:{ fr:'Programme scolaire suivi', en:'School curriculum you follow', es:'Programa escolar que sigues', de:'Lehrplan, dem du folgst', it:'Programma scolastico che segui', pt:'Programa escolar que segues' },
    aide:{ fr:'Indépendant de la langue de l’appli : choisis le pays dont tu suis le programme.', en:'Independent of the app language: choose the country whose curriculum you follow.', es:'Independiente del idioma de la app: elige el país cuyo programa sigues.',
      de:'Unabhängig von der App-Sprache: Wähle das Land, dessen Lehrplan du folgst.', it:'Indipendente dalla lingua dell’app: scegli il Paese di cui segui il programma.', pt:'Independente da língua da aplicação: escolhe o país cujo programa segues.' },
    fr:{ fr:'🇫🇷 France (6e → bac)', en:'🇫🇷 France (6e → baccalauréat)', es:'🇫🇷 Francia (6e → bac)', de:'🇫🇷 Frankreich (6e → Bac)', it:'🇫🇷 Francia (6e → bac)', pt:'🇫🇷 França (6e → bac)' },
    gb:{ fr:'🏴 Angleterre (Year 6 → A level)', en:'🏴 England (Year 6 → A level)', es:'🏴 Inglaterra (Year 6 → A level)', de:'🏴 England (Year 6 → A level)', it:'🏴 Inghilterra (Year 6 → A level)', pt:'🏴 Inglaterra (Year 6 → A level)' },
    // v6.22 : l'accueil ne parle plus de « Je parle / J'apprends » : on choisit sa langue et son programme ; la langue étrangère se choisit dans « Langues ».
    maLangue:{ fr:'🌐 Ma langue', en:'🌐 My language', es:'🌐 Mi idioma', de:'🌐 Meine Sprache', it:'🌐 La mia lingua', pt:'🌐 A minha língua' },
    monProg:{ fr:'📚 Mon programme', en:'📚 My curriculum', es:'📚 Mi programa', de:'📚 Mein Lehrplan', it:'📚 Il mio programma', pt:'📚 O meu programa' },
    frCourt:{ fr:'🇫🇷 France · 6e → bac', en:'🇫🇷 France · 6e → bac', es:'🇫🇷 Francia · 6e → bac', de:'🇫🇷 Frankreich · 6e → Bac', it:'🇫🇷 Francia · 6e → bac', pt:'🇫🇷 França · 6e → bac' },
    gbCourt:{ fr:'🏴 Angleterre · Year 6 → A level', en:'🏴 England · Year 6 → A level', es:'🏴 Inglaterra · Year 6 → A level', de:'🏴 England · Year 6 → A level', it:'🏴 Inghilterra · Year 6 → A level', pt:'🏴 Inglaterra · Year 6 → A level' },
    langueApprise:{ fr:'🗣️ La langue que j’apprends', en:'🗣️ The language I’m learning', es:'🗣️ El idioma que aprendo', de:'🗣️ Die Sprache, die ich lerne', it:'🗣️ La lingua che imparo', pt:'🗣️ A língua que aprendo' },
    porteLangues:{ fr:'Langues', en:'Languages', es:'Idiomas', de:'Sprachen', it:'Lingue', pt:'Línguas' },
    porteLanguesSous:{ fr:'Vocabulaire, phrases, pièges, professeur', en:'Vocabulary, sentences, traps, teacher', es:'Vocabulario, frases, trampas, profesor', de:'Wortschatz, Sätze, Fallen, Lehrer', it:'Vocabolario, frasi, trappole, professore', pt:'Vocabulário, frases, armadilhas, professor' },
    profIA:{ fr:'Le professeur IA', en:'The AI teacher', es:'El profesor IA', de:'Der KI-Lehrer', it:'Il professore IA', pt:'O professor IA' },
    profIASous:{ fr:'Anglais et maths, des leçons qui s’adaptent à toi', en:'English and maths, lessons that adapt to you', es:'Inglés y matemáticas, clases que se adaptan a ti', de:'Englisch und Mathe, Lektionen, die sich dir anpassen', it:'Inglese e matematica, lezioni che si adattano a te', pt:'Inglês e matemática, aulas que se adaptam a ti' },
    pasTraduit:{ en:'Not translated yet: in French', es:'Aún sin traducir: en francés', de:'Noch nicht übersetzt: auf Französisch', it:'Non ancora tradotto: in francese', pt:'Ainda não traduzido: em francês' }
  };
  const progTx = k => (PROG_TX[k] && (PROG_TX[k][base.ui] || PROG_TX[k].en)) || '';
  function reglages(){
    const progActuel = base.programme === 'gb' ? 'gb' : 'fr';
    poser(barre('accueil') + '<main class="texte"><h2>⚙️ ' + esc(t('reglages')) + '</h2>' +
      '<section class="reglage-programme"><h3>📚 ' + esc(progTx('titre')) + '</h3><p class="petit">' + esc(progTx('aide')) + '</p><div class="actions serrees">' +
        ['fr', 'gb'].map(k => '<button class="moyen' + (progActuel === k ? ' plein' : '') + '" data-a="programme-choix" data-v="' + k + '" aria-pressed="' + (progActuel === k) + '">' + esc(progTx(k)) + '</button>').join('') + '</div></section>' +
      '<div class="reglage reglage-facile"><span><strong>📖 ' + esc(t('facile')) + '</strong><span class="petit">' + esc(t('facile_aide')) + '</span></span><button class="moyen' + (facile() ? ' plein' : '') + '" data-a="facile" aria-pressed="' + facile() + '">' + esc(facile() ? t('oui') : t('non')) + '</button></div>' +
      '<div class="reglage"><span>🔔 ' + esc(t('son')) + '</span><button class="moyen' + (base.son ? ' plein' : '') + '" data-a="son" aria-pressed="' + base.son + '">' + esc(base.son ? t('oui') : t('non')) + '</button></div>' +
      '<section class="reglage-humour"><h3>😂 ' + (base.ui === 'en' ? 'Plumo’s joke level' : TXT('Le niveau des blagues de Plumo')) + '</h3><p class="petit">' + (base.ui === 'en' ? 'Plumo only teases himself, the words or the situation — never the player.' : TXT('Plumo se moque de lui-même, des mots ou de la situation — jamais du joueur.')) + '</p>' +
        (facile() ? '<p class="petit">📖 ' + (base.ui === 'en' ? 'Easy reading is on: Plumo stays “gentle”, with short jokes.' : TXT('Lecture facile activée : Plumo reste « Tout doux », avec des vannes courtes.')) + '</p>' : '') + '<div class="choix-humour">' +
      [TXT('Tout doux'),TXT('Taquin'),TXT('Piquant'),TXT('Corsé 🪶')].map((nom, i) => '<button class="moyen' + (niveauHumour() === i ? ' plein' : '') + '" data-a="humour" data-v="' + i + '" aria-pressed="' + (niveauHumour() === i) + '">' + (base.ui === 'en' ? ['Gentle','Playful','Spicy','Extra cheeky 🪶'][i] : nom) + '</button>').join('') +
      '</div><p class="petit">' + (base.ui === 'en' ? 'Even the spiciest level stays kind.' : TXT('Même le niveau le plus corsé reste bienveillant.')) + '</p>' +
      '<h3 class="langue-blagues-titre">🗣️ ' + (base.ui === 'en' ? 'Language of the jokes' : TXT('Langue des blagues')) + '</h3><p class="petit">' + (base.ui === 'en' ? 'Choose the language Plumo uses for jokes and spoken feedback.' : TXT('Choisis la langue utilisée par Plumo pour ses blagues et ses commentaires vocaux.')) + '</p><div class="choix-humour choix-langue-blagues">' +
      '<button class="moyen' + (langueBlagues() === 'fr' ? ' plein' : '') + '" data-a="langue-blagues" data-v="fr" aria-pressed="' + (langueBlagues() === 'fr') + '">🇫🇷 Français</button>' +
      '<button class="moyen' + (langueBlagues() === 'en' ? ' plein' : '') + '" data-a="langue-blagues" data-v="en" aria-pressed="' + (langueBlagues() === 'en') + '">🇬🇧 English</button>' +
      '</div>' +
      (CONFIG.API_VANNES_DIRECT ? '<div class="reglage"><span><strong>🤖 ' + (base.ui === 'en' ? 'Jokes written live by AI' : TXT('Vannes inventées en direct par l’IA')) + '</strong><span class="petit">' + (base.ui === 'en' ? 'A brand-new joke for each mistake. Only the question and the answers are sent, nothing personal.' : TXT('Une vanne toute neuve à chaque erreur. Seules la question et les réponses partent au serveur, rien de personnel.')) + '</span></span><button class="moyen' + (J().vannesIA !== false ? ' plein' : '') + '" data-a="vannes-ia-direct" aria-pressed="' + (J().vannesIA !== false) + '">' + esc(J().vannesIA !== false ? t('oui') : t('non')) + '</button></div>' : '') +
      '</section>' +
      (CONFIG.MODE_PAYANT ? '<h3>✨ ' + esc(t('plus')) + '</h3>' + (plus()
        ? '<p>' + esc(t('abo_actif', droits ? new Date(droits.fin).toLocaleDateString(base.ui) : '')) + '</p>' + (CONFIG.LIEN_GESTION ? '<p><a class="moyen" href="' + esc(CONFIG.LIEN_GESTION) + '" target="_blank" rel="noopener">' + esc(t('gerer_abo')) + '</a></p>' : '')
        : '<p><button class="moyen plein" data-a="plus" data-v="reglages">' + esc(t('decouvrir_plus')) + '</button></p>') +
        '<p class="petit">' + esc(t('code_abo')) + '<br><code>' + esc(base.abo.code) + '</code><br>' + esc(t('code_aide')) + '</p>' : '') +
      '<div class="reglage"><span><strong>🔠 ' + esc(tt('taille_texte')) + '</strong></span><span class="actions serrees">' + [['normal', 'A'], ['grand', 'A+'], ['tres-grand', 'A++']].map(([k, l]) => '<button class="moyen' + ((base.texte || 'normal') === k ? ' plein' : '') + '" data-a="taille-texte" data-v="' + k + '" aria-pressed="' + ((base.texte || 'normal') === k) + '">' + l + '</button>').join('') + '</span></div>' +
      reglageRappels() + reglageGraphismes() + reglageVoix() +
      '<h3>' + esc(t('joueurs')) + '</h3><div class="liste-joueurs">' + base.joueurs.map((j, i) =>
        '<button class="ligne-carnet" data-a="modifier-joueur" data-v="' + i + '"><span class="ami-icone">' + ami('content', { couleur:j.couleur, porte:j.porte, immobile:true }) + '</span><span class="txt"><strong>' + esc(j.nom || '—') + (i === base.actif ? ' ✓' : '') + '</strong><span>🪶 ' + j.plumes + '</span></span><span aria-hidden="true">✏️</span></button>').join('') + '</div>' +
      (base.joueurs.length < MAX_JOUEURS ? '<p><button class="moyen" data-a="nouveau-joueur">＋ ' + esc(t('ajouter_joueur')) + (plus() ? '' : ' ✨') + '</button></p>' : '') +
      '<h3>💾 ' + esc(t('sauvegarde')) + '</h3><p class="petit">' + esc(t('sauvegarde_aide')) + '</p>' +
      '<div class="actions"><button class="moyen" data-a="sauvegarder">⬇️ ' + esc(t('sauvegarder')) + '</button><button class="moyen" data-a="restaurer">⬆️ ' + esc(t('restaurer')) + '</button></div>' +
      '<input type="file" id="fichier-sauvegarde" accept="application/json,.json" hidden><p id="etat-sauvegarde" class="petit" role="status"></p>' +
      '<h3>' + esc(t('apropos')) + '</h3><p>' + esc(t('apropos_texte')) + '</p><p class="petit">' + esc(t('apropos_voix')) + '</p>' +
      '<p class="petit">Ami des mots' + (CONFIG.CONTACT ? ' · ' + esc(CONFIG.CONTACT) : '') + ' · <a href="legal.html#mentions">' + esc(tt('mentions')) + '</a></p>' +
      '<p><button class="moyen" data-a="effacer-tout">' + esc(t('effacer_progres')) + '</button></p></main>');
  }

  // ── Installer l'appli depuis le site (Android, PC : invite du navigateur ; iPhone : Partager → Sur l'écran d'accueil) ──
  let installation = null;
  window.addEventListener('beforeinstallprompt', ev => { ev.preventDefault(); installation = ev; if($('#app') && $('#app').dataset.ecran === 'accueil') accueil(); });
  window.addEventListener('appinstalled', () => { installation = null; });

  // ── Mémoire des vannes déjà dites (par joueur, 400 dernières) : Prof Pi et le labo ne se répètent pas ──
  // Même empreinte pour la vanne modèle (« {f} ») et la vanne affichée (« 5,23 ») : on retire ce qui change
  // (réponse entre guillemets, {valeurs}, chiffres, espaces) et l'explication 💡.
  const normeVanne = t => String(t).split(' 💡 ')[0].replace(/«[^»]*»/g, '').replace(/\{\w+\}/g, '').replace(/[\d\s\u202F,.−-]/g, '');
  const empreinteVanne = t => { let h = 2166136261; for(const c of normeVanne(t).slice(0, 160)) h = Math.imul(h ^ c.charCodeAt(0), 16777619); return (h >>> 0).toString(36); };
  // ── v5.66 : vannes écrites en direct par l'IA (serveur-php/vannes-direct.php) ──
  // Dès qu'une question s'affiche, on demande à l'IA une vanne neuve pour chaque mauvaise réponse possible, en lui
  // donnant les dernières vannes déjà dites. Si elle ne répond pas à temps (ou sans serveur), Plumo garde ses vannes à lui.
  // Rien de personnel ne part : ni prénom, ni code, ni voix — seulement la question et les réponses.
  // v5.98 : toute vanne écrite par l'IA est signalée (« 🤖 ») : le joueur sait quand il lit une IA.
  const MARQUE_IA = '🤖 ';
  // v5.99 : plumes magiques. Allumées dans l'admin, chaque vanne de l'IA coûte une plume : le jeu envoie alors le code
  // (jamais de prénom). Sans plumes, le serveur répond 402 et Plumo garde ses vannes à lui : rien n'est bloqué.
  // Toujours relus par offreLue (comme les formules) : un pack inconnu, négatif ou hors Stripe n'apparaît jamais.
  const reglagesPlumes = () => offreLue({ CREDITS:CONFIG.CREDITS }).CREDITS || { actif:false, quota_plus:0, packs:[] };
  const plumesActives = () => !!(reglagesPlumes().actif && CONFIG.API_PLUMES);
  const codePlumes = () => plumesActives() ? { code:base.abo.code } : {};
  async function soldePlumes(){
    if(!plumesActives() || typeof fetch !== 'function') return null;
    try{ const r = await fetch(CONFIG.API_PLUMES, { method:'POST', cache:'no-store', headers:{ 'Content-Type':'application/json' }, body:JSON.stringify({ code:base.abo.code }) });
      const d = r.ok ? await r.json() : null; return d && d.actif ? d : null; }catch(e){ return null; }
  }
  function blocPlumes(){
    if(!plumesActives()) return '';
    return '<section class="plumes-ia"><h3>🪶 ' + esc(tt('plumes_titre')) + '</h3><p class="petit">' + esc(tt('plumes_aide', reglagesPlumes().quota_plus)) + '</p>' +
      '<p id="plumes-solde" role="status" aria-live="polite">…</p>' +
      (reglagesPlumes().packs.length ? '<p><button class="moyen" data-a="plumes">🪶 ' + esc(tt('plumes_acheter')) + '</button></p>' : '') + '</section>';
  }
  async function afficherSolde(){
    const z = document.getElementById('plumes-solde'); if(!z) return;
    const d = await soldePlumes(); if(!document.body.contains(z)) return;
    z.textContent = d ? tt('plumes_solde', d.solde, d.quota ? d.quota_restant : null) : t('hors_ligne');
    if(d && (d.solde > 0 || d.quota_restant > 0)){ delete base.plumesVides; iaEnPanne = 0; garder(); }
  }
  // Achat de plumes : derrière une question pour adultes (les enfants ne sont jamais poussés à acheter).
  let portePlumes = null;
  function ecranPlumes(ouvert){
    if(!plumesActives()) return ecranPlus();
    if(!ouvert){ portePlumes = { a:6 + Math.floor(Math.random() * 4), b:6 + Math.floor(Math.random() * 4) };
      return poser(barre('plus') + '<main class="centre"><h2>🪶 ' + esc(tt('plumes_titre')) + '</h2><p>' + esc(tt('plumes_adulte', portePlumes.a, portePlumes.b)) + '</p>' +
        '<p><input id="porte-plumes" type="number" inputmode="numeric" aria-label="' + esc(tt('plumes_resultat')) + '" class="champ-court"> <button class="moyen plein" data-a="plumes-ouvrir">OK</button></p><p class="aide" id="porte-plumes-msg" role="status"></p></main>'); }
    const natif = achatsNatifs(), packs = reglagesPlumes().packs.filter(p => natif ? p.magasin : p.lien);
    const carte = p => { const prix = (natif && ACHATS.prix(p.id)) || p.prix || '';
      const corps = '<strong>🪶 ' + p.plumes + '</strong>' + (prix ? '<span class="prix-formule">' + esc(prix) + '</span>' : '') + '<small>' + esc(tt('plumes_vannes', p.plumes)) + '</small>';
      return natif ? '<button class="carte-formule" data-a="plumes-acheter" data-v="' + p.id + '">' + corps + '</button>'
        : '<a class="carte-formule" href="' + esc(p.lien + (p.lien.includes('?') ? '&' : '?') + 'client_reference_id=' + encodeURIComponent(base.abo.code)) + '" rel="noopener">' + corps + '</a>'; };
    poser(barre('plus') + '<main class="centre plus"><h2>🪶 ' + esc(tt('plumes_titre')) + '</h2><p id="plumes-solde" role="status" aria-live="polite">…</p>' +
      (packs.length ? '<div class="formules">' + packs.map(carte).join('') + '</div>' : '<p>' + esc(t('bientot')) + '</p>') +
      '<p class="aide" id="achat-etat" role="status" aria-live="polite"></p><p class="petit">' + esc(tt('plumes_regles')) + ' · <a href="legal.html#cgv">' + esc(tt('cgv')) + '</a></p></main>');
    afficherSolde();
  }
  const cacheIA = new Map(), recentes = [];
  let iaEnPanne = 0;
  const cleIA = (bonne, fausse) => String(bonne) + '\u0001' + String(fausse);
  function iaActive(){ return !!CONFIG.API_VANNES_DIRECT && J().vannesIA !== false && Date.now() > iaEnPanne && typeof fetch === 'function'; }
  function noterRecente(t){ if(!t) return; recentes.push(String(t).slice(0, 170)); if(recentes.length > 30) recentes.shift(); }
  // v5.78 : l'IA s'adapte toute seule à la famille — elle reçoit les vannes notées 😂 (le style qui fait rire ici) et 🙄 (à éviter),
  // et le style « trash talk » si ce ton est choisi. Rien d'autre ne part : ni nom, ni pseudo.
  function goutsHumour(){
    const av = Array.isArray(J().avisVannes) ? J().avisVannes : [], pris = v => av.filter(x => x.v === v).slice(-8).map(x => String(x.t).slice(0, 170));
    return { aimees:pris(1), pasdrole:pris(-1), style:((J().maths || {}).ton === 'trash' || (qz && qz.trash)) ? 'trash' : '' };
  }
  async function iaPrecharger(sujet, question, bonne, fausses, ton, langue){
    if(!iaActive() || !bonne || !fausses || !fausses.length) return;
    // Une réponse = une chaîne, ou { id, texte } (jeux d'images : l'émoji sert de clé, le nom part à l'IA).
    const items = fausses.map(x => typeof x === 'string' ? { id:x, texte:x } : x).filter(x => x && x.id && x.id !== bonne.id && x.id !== bonne && !cacheIA.has(cleIA(bonne.id || bonne, x.id)));
    const cleB = bonne.id || bonne, texteB = bonne.texte || bonne;
    if(!items.length) return;
    const manquent = items.map(x => x.texte);
    items.forEach(x => cacheIA.set(cleIA(cleB, x.id), null));
    const ctl = typeof AbortController === 'function' ? new AbortController() : null, minuteur = setTimeout(() => ctl && ctl.abort(), 9000);
    try{
      const r = await fetch(CONFIG.API_VANNES_DIRECT, { method:'POST', cache:'no-store', headers:{ 'Content-Type':'application/json' }, signal:ctl ? ctl.signal : undefined,
        body:JSON.stringify({ sujet, question:String(question || '').slice(0, 220), bonne:String(texteB).slice(0, 90), fausses:manquent.map(f => String(f).slice(0, 90)), ton, langue:langue || 'fr', deja:recentes.slice(-30), ...codePlumes(), ...goutsHumour() }) });
      if(r.status === 429 || r.status === 503) iaEnPanne = Date.now() + 10 * 60 * 1000;
      if(r.status === 402){ iaEnPanne = Date.now() + 30 * 60 * 1000; base.plumesVides = jour(); garder(); }
      const d = r.ok ? await r.json() : null, v = d && d.vannes;
      items.forEach(x => { const t = v && typeof v[x.texte] === 'string' ? v[x.texte].trim() : '';
        // Le juge de Plumo relit chaque vanne de l'IA ; une vanne déjà dite est jetée.
        if(t && (!window.JUGE || JUGE.juger(t).ok) && memoireVannes().age(t) < 0) cacheIA.set(cleIA(cleB, x.id), t); else cacheIA.delete(cleIA(cleB, x.id)); });
    }catch(e){ items.forEach(x => cacheIA.delete(cleIA(cleB, x.id))); iaEnPanne = Date.now() + 60 * 1000; }
    finally{ clearTimeout(minuteur); if(cacheIA.size > 200) [...cacheIA.keys()].slice(0, cacheIA.size - 200).forEach(k => cacheIA.delete(k)); }
  }
  function iaPrendre(bonne, fausse){
    const k = cleIA(bonne, fausse), t = cacheIA.get(k);
    if(!t) return null;
    cacheIA.delete(k); retenirVanne(t); noterRecente(t);
    return t;
  }
  function memoireVannes(){
    const l = Array.isArray(J().vannesDites) ? J().vannesDites : [];
    // Une vanne modèle ({f}, {j}) est reconnue même une fois les nombres remplacés : on compare sans les chiffres.
    return { age:t => { const i = l.lastIndexOf(empreinteVanne(t)); return i < 0 ? -1 : l.length - i; }, noter:retenirVanne };
  }
  function retenirVanne(t){
    const j = J(); if(!Array.isArray(j.vannesDites)) j.vannesDites = [];
    // On retient la vanne sans ce qui change d'une fois à l'autre (nombres, réponse) ni l'explication 💡.
    j.vannesDites.push(empreinteVanne(t)); if(j.vannesDites.length > 400) j.vannesDites.splice(0, j.vannesDites.length - 400); garder();
  }

  // ── Coin maths (6e → Terminale) : Prof Pi, le raton laveur prof de maths, vanne à chaque erreur ──
  // Exercices fabriqués par js/maths.js (correction calculée), programmes validés par la veille si un serveur est branché.
  function profPi(humeur){
    const bouche = humeur === 'mdr' ? '<path d="M44 74 Q60 92 76 74 Z" fill="#5a2a2a"/>' : humeur === 'fier' ? '<path d="M46 74 Q60 86 74 74" stroke="#2b2b3a" stroke-width="4" fill="none" stroke-linecap="round"/>' : '<path d="M48 76 Q60 82 72 76" stroke="#2b2b3a" stroke-width="4" fill="none" stroke-linecap="round"/>';
    return '<svg class="prof-pi" viewBox="0 0 120 120" role="img" aria-label="Prof Pi"><title>Prof Pi</title>' +
      '<path d="M22 40 L30 12 L48 30 Z M98 40 L90 12 L72 30 Z" fill="#7d7f8c"/><ellipse cx="60" cy="62" rx="42" ry="38" fill="#a7a9b5"/>' +
      '<path d="M20 56 Q60 30 100 56 Q92 70 74 66 Q60 58 46 66 Q28 70 20 56 Z" fill="#33343f"/><ellipse cx="60" cy="84" rx="22" ry="14" fill="#e9e6ee"/>' +
      '<circle cx="42" cy="58" r="11" fill="#fff" stroke="#ffc93c" stroke-width="3"/><circle cx="78" cy="58" r="11" fill="#fff" stroke="#ffc93c" stroke-width="3"/><path d="M53 58 H67" stroke="#ffc93c" stroke-width="3"/>' +
      '<circle cx="' + (humeur === 'mdr' ? 42 : 44) + '" cy="59" r="4" fill="#1b1b24"/><circle cx="' + (humeur === 'mdr' ? 78 : 76) + '" cy="59" r="4" fill="#1b1b24"/><ellipse cx="60" cy="72" rx="6" ry="4" fill="#1b1b24"/>' + bouche +
      '<path d="M30 22 L60 10 L90 22 L60 34 Z" fill="#1f1757"/><path d="M84 24 L88 40" stroke="#ffc93c" stroke-width="3"/><circle cx="88" cy="42" r="3" fill="#ffc93c"/>' +
      '<text x="60" y="27" font-size="10" text-anchor="middle" fill="#ffc93c" font-weight="900">π</text></svg>';
  }
  // v6.22 : un testeur demandait « le ton de Prof Pi, c'est quoi ? » → une phrase d'explication sous les boutons.
  const TON_AIDE = { fr:'Le ton change seulement la façon de réagir à tes réponses : 🧸 encourage, 😏 petite vanne, 🔥 direct, 🥊 vannes piquantes (jamais méchantes). Les questions restent les mêmes.',
    en:'The tone only changes how your answers are greeted: 🧸 encouraging, 😏 a little tease, 🔥 straight talk, 🥊 spicy comebacks (never mean). The questions stay the same.',
    es:'El tono solo cambia cómo se reacciona a tus respuestas: 🧸 te anima, 😏 una pequeña broma, 🔥 directo, 🥊 pullas picantes (nunca crueles). Las preguntas son las mismas.',
    de:'Der Ton ändert nur, wie auf deine Antworten reagiert wird: 🧸 ermutigend, 😏 ein kleiner Spruch, 🔥 direkt, 🥊 freche Sprüche (nie gemein). Die Fragen bleiben gleich.',
    it:'Il tono cambia solo il modo di reagire alle tue risposte: 🧸 incoraggia, 😏 una piccola battuta, 🔥 diretto, 🥊 battute pepate (mai cattive). Le domande restano le stesse.',
    pt:'O tom só muda a forma de reagir às tuas respostas: 🧸 encoraja, 😏 uma pequena piada, 🔥 direto, 🥊 provocações picantes (nunca maldosas). As perguntas são as mesmas.' };
  const tonAide = () => '<p class="petit ton-aide">' + esc(TON_AIDE[base.ui] || TON_AIDE.en) + '</p>';
  const TONS_PROF = [['doux', '🧸 Tout doux'], ['taquin', '😏 Taquin'], ['sanspitie', '🔥 Cash (ados)']].concat(window.TRASH_TALK ? [['trash', '🥊 Trash talk']] : []);
  function etatMaths(){
    const j = J(), o = j.maths && typeof j.maths === 'object' ? j.maths : {}, M = window.MATHS;
    const niveau = M && M.NIVEAUX.includes(o.niveau) ? o.niveau : '6e', ton = TONS_PROF.some(x => x[0] === o.ton) ? o.ton : 'taquin';
    const chap = {}; if(o.chap && typeof o.chap === 'object') for(const [k, v] of Object.entries(o.chap)) if(/^[0-9A-Za-z-]{1,40}$/.test(k) && v && typeof v === 'object') chap[k] = { ok:Math.min(1e5, Math.max(0, Math.floor(+v.ok) || 0)), n:Math.min(1e5, Math.max(0, Math.floor(+v.n) || 0)) };
    const examens = {}; if(o.examens && typeof o.examens === 'object') for(const [k, v] of Object.entries(o.examens)) if(/^(6e|5e|4e|3e|2nde|1re|Tle)$/.test(k) && Number.isFinite(+v)) examens[k] = Math.min(20, Math.max(0, +v));
    j.maths = { niveau, ton, chap, examens }; return j.maths;
  }
  let carteMathsDemandee = false, annalesMaths = {};
  function chargerCarteMaths(){
    // Carte des programmes validée par un adulte sur le serveur (veille). Sans serveur : carte intégrée.
    if(carteMathsDemandee || !CONFIG.SERVEUR || !window.MATHS) return; carteMathsDemandee = true;
    fetch(String(CONFIG.SERVEUR).replace(/\/?$/, '/') + 'programme.php?quoi=maths', { cache:'no-cache' }).then(r => r.ok ? r.json() : null)
      .then(c => { if(!c) return; let maj = false; if(c.carte && MATHS.adopterCarte(c.carte)) maj = true;
        if(c.annales && typeof c.annales === 'object'){ annalesMaths = c.annales; maj = true; } if(maj && $('#app').dataset.ecran === 'maths') mathsAccueil(); }).catch(() => {});
  }
  function mathsAccueil(){
    qz = null; const M = window.MATHS; if(!M) return accueil(); chargerCarteMaths();
    const e = etatMaths(), niv = M.carte.niveaux[e.niveau], doms = [];
    for(const c of niv.chapitres){ let d = doms.find(x => x.d === c[1]); if(!d) doms.push(d = { d:c[1], l:[] }); d.l.push(c); }
    const etoiles = id => { const s = e.chap[id]; if(!s || !s.n) return ''; const p = s.ok / s.n; return s.n >= 10 && p >= .9 ? '⭐⭐⭐' : p >= .7 ? '⭐⭐' : '⭐'; };
    poser(barre('accueil') + '<main class="coin-anglais coin-maths"><div class="prof-entete"><div class="ami-moyen">' + profPi('fier') + TXT('</div><div><h2>🔢 Le coin maths de Prof Pi</h2>') +
      TXT('<p class="pieges-intro">Trompe-toi : je vanne. Réussis : je m’incline. Programme ') + esc(M.carte.annee) + '.</p></div></div>' +
      '<div class="onglets-niveaux" role="tablist">' + M.NIVEAUX.map(n => '<button role="tab" aria-selected="' + (n === e.niveau) + '" class="onglet' + (n === e.niveau ? ' actif' : '') + '" data-a="maths-niveau" data-v="' + n + '">' + n + '</button>').join('') + '</div>' +
      '<p class="petit">📚 ' + esc(M.tr.niveau(e.niveau)) + ' — ' + esc(M.tr.niveau(e.niveau, 'note') || '') + '</p>' +
      TXT('<p class="ton-prof">Ton de Prof Pi : ') + TONS_PROF.map(([k, l]) => '<button class="petit-bouton' + (k === e.ton ? ' actif' : '') + '" data-a="maths-ton" data-v="' + k + '" aria-pressed="' + (k === e.ton) + '">' + TXT(l) + '</button>').join(' ') + '</p>' + tonAide() +
      TXT('<div class="actions serrees"><button class="moyen plein" data-a="maths-melange">🔁 Entraînement mélangé</button>') +
        (niv.examen && M.EXAMENS[niv.examen] ? '<button class="moyen" data-a="maths-examen">📝 ' + esc(M.tr.examen(niv.examen)) + (e.examens[e.niveau] != null ? ' (' + window.MATHS.nb(e.examens[e.niveau], 1) + '/20)' : '') + '</button>' : '') +
        TXT('<button class="moyen" data-a="maths-defi">🔗 Défier un pote</button></div>') +
      // v5.75 : les chapitres rangés par domaine, en blocs côte à côte (plus de longue colonne à moitié vide).
      '<div class="domaines">' + doms.map(d => '<section class="domaine"><h3>' + esc(M.tr.domaine(d.d)) + ' <small>' + d.l.length + '</small></h3><div class="liste-chap">' + d.l.map(c => M.disponible(c[0])
        ? '<button class="chap" data-a="maths-chap" data-v="' + esc(c[0]) + '"><span>' + esc(M.tr.chap(c)) + '</span><em>' + (etoiles(c[0]) || '▶ 10') + '</em></button>'
        : '<div class="chap bientot" aria-disabled="true"><span>' + esc(M.tr.chap(c)) + '</span><em>🛠️</em></div>').join('') + '</div></section>').join('') + '</div>' +
      (() => { const l = (Array.isArray(annalesMaths[e.niveau]) ? annalesMaths[e.niveau] : []).filter(x => x && /^https:\/\/(www\.)?(education\.gouv\.fr|eduscol\.education\.(gouv\.)?fr)\//.test(x.lien)).slice(0, 20);
        return l.length ? TXT('<h3>📄 Sujets officiels (sur le site du ministère)</h3><ul class="pieges-cats">') + l.map(x => '<li><a href="' + esc(x.lien) + '" target="_blank" rel="noopener noreferrer">' + esc((x.session ? x.session + ' — ' : '') + x.titre) + '</a></li>').join('') + '</ul>' : ''; })() +
      TXT('<p class="petit">👥 Battle en direct : ouvre le salon des battles et choisis « maths ».</p></main>'), 'maths');
  }
  const BRAVO_PROF = () => [TXT('Bravo ! Prof Pi range sa vanne… pour l’instant. 😏'), TXT('Juste ! Prof Pi est vexé de ne rien trouver à redire.'), TXT('Exact ! Même ma calculatrice applaudit. 👏'), TXT('Parfait. Je note… et je surveille. 🦝')];
  function mathsSerie(cible, n, titre, fin){
    const M = window.MATHS, e = etatMaths(), liste = M.serie(cible, n, Math.floor(Math.random() * 1e9), e.ton);
    if(!liste.length) return mathsAccueil();
    questionsGo(liste, { titre, retour:'maths', prof:true, lang:M.tr.langue(), bravo:() => { const b = BRAVO_PROF(); return b[Math.floor(Math.random() * b.length)]; },
      onReponse:(juste, q) => { const s = e.chap[q.chap] || (e.chap[q.chap] = { ok:0, n:0 }); s.n++; if(juste) s.ok++; else noterErreur('maths:' + q.chap); garder(); },
      fin:fin || (z => finJeuMaths(z, titre)) });
  }
  function finJeuMaths(z, titre, note){
    const p = z.bonnes / z.liste.length; J().plumes += z.bonnes; garder(); bruit('fin');
    const mot = p === 1 ? TXT('Sans faute. Prof Pi pose sa craie et applaudit. 👏') : p >= .7 ? TXT('Solide ! Prof Pi n’a presque rien à vanner. 😏') : p >= .4 ? TXT('Ça vient ! Prof Pi a eu de quoi rigoler, mais tu progresses.') : TXT('Prof Pi a vidé tout son stock de vannes. On recommence, tu vas le faire taire !');
    poser(barre('maths') + '<main class="centre"><div class="ami-moyen">' + profPi(p >= .7 ? 'fier' : 'mdr') + '</div><h2>' + esc(titre) + '</h2>' +
      '<p class="gros-score">' + z.bonnes + '/' + z.liste.length + (note != null ? ' · ' + window.MATHS.nb(note, 1) + '/20' : '') + '</p><p>' + esc(mot) + '</p><p>🪶 +' + z.bonnes + ' plumes</p>' +
      TXT('<div class="actions serrees"><button class="moyen plein" data-a="maths-melange">🔁 Encore</button><button class="moyen" data-a="maths">🔢 Coin maths</button></div></main>'));
  }
  function mathsExamen(){
    const M = window.MATHS, e = etatMaths(), niv = M.carte.niveaux[e.niveau], ex = niv.examen && M.EXAMENS[niv.examen]; if(!ex) return mathsAccueil();
    mathsSerie(e.niveau, ex.n, '📝 ' + M.tr.examen(niv.examen) + ' · ' + e.niveau, z => { const note = Math.round(20 * z.bonnes / z.liste.length * 10) / 10; etatMaths().examens[e.niveau] = note; garder(); finJeuMaths(z, '📝 ' + M.tr.examen(niv.examen), note); });
  }

  // ── v5.76 : les matières du programme (français, histoire-géo-EMC, SVT, physique-chimie) + brevet & bac blancs ──
  function etatMatieres(){
    const j = J(), o = j.matieres && typeof j.matieres === 'object' ? j.matieres : {}, N = window.MATIERES ? MATIERES.NIVEAUX : [];
    const niveau = N.includes(o.niveau) ? o.niveau : (window.MATHS ? etatMaths().niveau : '6e');
    const chap = {}; if(o.chap && typeof o.chap === 'object') for(const [k, v] of Object.entries(o.chap)) if(/^[0-9a-z-]{1,20}:[0-9a-z-]{1,30}$/.test(k) && v && typeof v === 'object') chap[k] = { ok:Math.min(1e5, Math.max(0, Math.floor(+v.ok || 0))), n:Math.min(1e5, Math.max(0, Math.floor(+v.n || 0))) };
    const notes = {}; if(o.notes && typeof o.notes === 'object') for(const [k, v] of Object.entries(o.notes)) if(/^[0-9a-z-]{1,40}$/.test(k) && Number.isFinite(+v)) notes[k] = Math.min(20, Math.max(0, +v));
    const derniere = window.MATIERES && MATIERES.trouver(o.derniere) ? o.derniere : '';
    j.matieres = { niveau, chap, notes, derniere }; return j.matieres;
  }
  const noteSur20 = z => Math.round(20 * z.bonnes / Math.max(1, z.liste.length) * 10) / 10;
  function matieresAccueil(){
    qz = null; const M = window.MATIERES; if(!M) return accueil();
    const c = (a, v, ic, t1, t2) => '<button class="carte-anglais" data-a="' + a + '"' + (v ? ' data-v="' + v + '"' : '') + '><span class="ic">' + ic + '</span><strong>' + t1 + '</strong><small>' + t2 + '</small></button>';
    poser(barre('accueil') + TXT('<main class="coin-anglais matieres-ecran"><h2>📚 Matières</h2><p class="pieges-intro">Le programme de la 6e au bac, avec Plumo qui vanne les erreurs (jamais toi) et t’explique la bonne réponse.</p>') +
      (window.EPREUVES ? ongletsExamens('matieres') : '') +
      '<div class="cartes-anglais">' + cartesModules('matiere') +
        ((J().carnet || []).length ? c('carnet-erreurs', '', '🎯', 'Mes erreurs (' + J().carnet.length + ')', TXT('Les questions ratées, à revoir avant un contrôle : une bonne réponse les retire')) : '') +
        c('matiere', 'francais', '📝', TXT('Français'), TXT('Conjugaison, orthographe, grammaire, figures de style, littérature')) +
        (M.trouver('lespagnol') ? c('matiere', 'lespagnol', '🇪🇸', TXT('Espagnol (LVB, 5e → bac)'), TXT('Ser ou estar, passé, subjonctif, faux amis')) : '') +
        (M.trouver('lallemand') ? c('matiere', 'lallemand', '🇩🇪', TXT('Allemand (LVB, 5e → bac)'), TXT('Cas, place du verbe, parfait, Konjunktiv II')) : '') +
        (M.trouver('philo') ? c('matiere', 'philo', '🤔', TXT('Philosophie (Tle)'), TXT('Auteurs, notions, méthode de la dissertation')) : '') +
        (M.trouver('ses') ? c('matiere', 'ses', '📈', TXT('SES (spécialité 1re, Tle)'), TXT('Marchés, monnaie, inégalités, mobilité sociale')) : '') +
        (M.trouver('hggsp') ? c('matiere', 'hggsp', '🌐', TXT('HGGSP (spécialité 1re, Tle)'), TXT('Puissance, ONU, espace, mémoire, environnement')) : '') +
        (M.trouver('hlp') ? c('matiere', 'hlp', '📜', TXT('HLP (spécialité 1re, Tle)'), TXT('Parole, représentations du monde, recherche de soi')) : '') +
        (M.trouver('nsi') ? c('matiere', 'nsi', '💻', TXT('NSI (spécialité 1re, Tle)'), TXT('Binaire, Python, réseaux, SQL, algorithmes')) : '') +
        (M.trouver('langlais') ? c('matiere', 'langlais', '🇬🇧', TXT('Anglais (6e → bac)'), TXT('Grammaire, verbes irréguliers, faux amis, axes du bac, compréhension')) : '') +
        (window.MATHS ? c('maths', '', '🔢', TXT('Maths'), TXT('De la 6e au bac, avec Prof Pi')) : '') +
        c('matiere', 'histoire', '🏛️', TXT('Histoire-géo & EMC'), TXT('Repères, géographie, citoyenneté')) +
        c('matiere', 'svt', '🧬', TXT('SVT'), TXT('Le vivant, le corps humain, la Terre, la génétique')) +
        c('matiere', 'physique', '⚗️', TXT('Physique-chimie'), TXT('Matière, électricité, vitesse, énergie')) +
        (window.SCIENCES ? c('sciences', '', '🚀', TXT('Sciences rigolotes'), TXT('Planètes, fusées, médecine… avec des clashs')) : '') +
      '</div>' + (M.trouver('medecine') ? TXT('<section class="domaine"><h3>🎓 Après le bac</h3><div class="cartes-anglais">') +
        c('matiere', 'medecine', '🩺', TXT('Médecine'), TXT('Anatomie, physiologie, études de santé')) + c('matiere', 'droit', '⚖️', TXT('Droit'), TXT('Institutions, bases du droit, métiers')) +
        c('matiere', 'astro', '🔭', 'Astrophysique', 'Étoiles, galaxies, calculs d’astrophysicien') + '</div></section>' : '') + '</main>');
  }
  function matiereAccueil(id){
    qz = null; const M = window.MATIERES, m = M && M.trouver(id); if(!m) return matieresAccueil();
    const e = etatMatieres(); e.derniere = id;
    // v5.82 : une matière sans chapitre à ce niveau (médecine, droit… niveau « Sup ») s'ouvre directement à son niveau.
    if(!M.chapitres(id, e.niveau).length && M.niveauxDe(id).length) e.niveau = M.niveauxDe(id).slice(-1)[0];
    const niveaux = M.NIVEAUX, chs = M.chapitres(id, e.niveau), ton = etatMaths().ton, doms = [];
    for(const c of chs){ let d = doms.find(x => x.d === c.dom); if(!d) doms.push(d = { d:c.dom, l:[] }); d.l.push(c); }
    const etoiles = cid => { const s = e.chap[id + ':' + cid]; if(!s || !s.n) return ''; const p = s.ok / s.n; return s.n >= 10 && p >= .9 ? '⭐⭐⭐' : p >= .7 ? '⭐⭐' : '⭐'; };
    const ex = m.examens && m.examens[e.niveau];
    // v5.83 : la référence du programme officiel du niveau, avec le lien vers éduscol.
    const O = window.EPREUVES && EPREUVES.OFFICIEL, ref = O && ({ '6e':0, '5e':1, '4e':1, '3e':1, '2nde':2, '1re':2, 'Tle':2 })[e.niveau], pr = O && ref != null ? O.programmes[ref] : null;
    poser(barre('matieres') + '<main class="coin-anglais coin-maths matiere-ecran"><h2>' + m.ic + ' ' + esc(M.nom(m)) + '</h2>' +
      (pr ? '<p class="petit ref-programme">📜 Programme officiel (' + esc(pr[0]) + ') : ' + esc(pr[2]) + ' · <a href="' + esc(pr[1]) + TXT('" target="_blank" rel="noopener">voir sur éduscol</a></p>') : '') +
      '<div class="onglets-niveaux" role="tablist">' + niveaux.map(n => { const vide = !M.chapitres(id, n).length;
        return '<button role="tab" aria-selected="' + (n === e.niveau) + '" class="onglet' + (n === e.niveau ? ' actif' : '') + (vide ? ' vide' : '') + '" data-a="matiere-niveau" data-v="' + id + '|' + n + '">' + n + '</button>'; }).join('') + '</div>' +
      TXT('<p class="ton-prof">Ton de Plumo : ') + TONS_PROF.map(([k, l]) => '<button class="petit-bouton' + (k === ton ? ' actif' : '') + '" data-a="maths-ton-matiere" data-v="' + id + '|' + k + '" aria-pressed="' + (k === ton) + '">' + TXT(l) + '</button>').join(' ') + '</p>' + tonAide() +
      (chs.length ? '<div class="actions serrees"><button class="moyen plein" data-a="matiere-melange" data-v="' + id + TXT('">🔁 Entraînement mélangé</button>') +
        (ex ? '<button class="moyen" data-a="matiere-examen" data-v="' + id + '">📝 ' + esc(ex) + (e.notes[id + '-' + e.niveau] != null ? ' (' + String(e.notes[id + '-' + e.niveau]).replace('.', ',') + '/20)' : '') + '</button>' : '') + '</div>' +
        '<div class="domaines">' + doms.map(d => '<section class="domaine"><h3>' + esc(M.nomDom(m, d.d)) + ' <small>' + d.l.length + '</small></h3><div class="liste-chap">' +
          d.l.map(c => '<button class="chap" data-a="matiere-chap" data-v="' + id + '|' + c.id + '"><span>' + esc(M.nomChap(m, c)) + (base.ui !== 'fr' && !M.traduit(m, c) ? ' <small class="pas-traduit" title="' + esc(progTx('pasTraduit')) + '">🇫🇷</small>' : '') + '</span><em>' + (etoiles(c.id) || '▶ 10') + '</em></button>').join('') + '</div></section>').join('') + '</div>'
        : TXT('<p class="pieges-intro">🛠️ Cette matière arrive bientôt pour la ') + esc(e.niveau) + TXT('. Choisis un autre niveau.</p>')) +
      '</main>', 'matieres');
  }
  // Une série de questions d'une matière. fin(z) facultatif (examens).
  function matiereSerie(id, cible, n, titre, fin){
    const M = window.MATIERES, e = etatMatieres(), liste = M.serie(id, cible, e.niveau, n, Math.floor(Math.random() * 1e9), etatMaths().ton);
    if(!liste.length) return matiereAccueil(id);
    const lq = liste.every(q => q.lang && q.lang !== 'fr') ? liste[0].lang : 'fr', BR = lq !== 'fr' && window.MATIERES_LANGUES && MATIERES_LANGUES[lq] && MATIERES_LANGUES[lq].bravo;
    questionsGo(liste, { titre, retour:'matiere', lang:lq, sujet:id, bravo:BR ? () => BR[Math.floor(Math.random() * BR.length)] : undefined,
      onReponse:(juste, q) => { const k = id + ':' + q.chap, s = e.chap[k] || (e.chap[k] = { ok:0, n:0 }); s.n++; if(juste) s.ok++; else noterErreur('mat:' + id + ':' + q.chap); garder(); },
      fin:fin || (z => finMatiere(z, titre, id)) });
  }
  function finMatiere(z, titre, id, note){
    const p = z.bonnes / z.liste.length; J().plumes += z.bonnes; garder(); bruit('fin');
    const mot = p === 1 ? TXT('Sans faute ! Plumo range ses vannes, il n’en a pas eu besoin. 👏') : p >= .7 ? TXT('Solide ! Plumo a cherché la petite bête… pas trouvée. 😏') : p >= .4 ? TXT('Ça vient ! Plumo a bien rigolé, mais tu progresses.') : TXT('Plumo a vidé tout son stock de vannes. On recommence ? 💪');
    poser(barre('matiere') + '<main class="centre"><div class="ami-moyen">' + ami(p >= .7 ? 'fete' : 'malin') + '</div><h2>' + esc(titre) + '</h2>' +
      (note != null ? '<p class="note-examen">' + String(note).replace('.', ',') + ' / 20</p>' : '<p class="score">' + z.bonnes + ' / ' + z.liste.length + '</p>') + '<p>' + mot + '</p>' +
      '<div class="actions serrees"><button class="moyen plein" data-a="matiere-melange" data-v="' + esc(id) + TXT('">🔁 Encore</button><button class="moyen" data-a="matiere" data-v="') + esc(id) + '">📚 ' + esc((window.MATIERES.trouver(id) || {}).nom || '') + '</button></div></main>');
  }
  // ── v5.78 : Brevet & bac blancs et annales, construits comme les vrais sujets 2026 (js/epreuves.js) ──
  let blanc = null;
  const ongletsExamens = actif => '<div class="onglets-matieres" role="tablist">' + [['matieres', TXT('📖 Réviser')], ['examens', TXT('📝 Blancs')], ['annales', TXT('🗂️ Annales')], ['officiel', TXT('🏛️ Officiel')]].map(([a, l]) =>
    '<button class="onglet' + (a === actif ? ' actif' : '') + '" role="tab" aria-selected="' + (a === actif) + '"' + (a === actif ? '' : ' data-a="' + a + '"') + '>' + l + '</button>').join('') + '</div>';
  const virg = n => String(n).replace('.', ',');
  const mentionDe = m => m >= 16 ? TXT('Mention très bien 🏆') : m >= 14 ? 'Mention bien 🥈' : m >= 12 ? 'Mention assez bien 🥉' : m >= 10 ? 'Admis ✅' : TXT('Pas encore… mais tu sais maintenant où ça coince 💪');
  const verdictAmi = m => m >= 16 ? TXT('Plumo range ses vannes au placard : il n’en a pas eu besoin. Respect. 🫡') : m >= 12 ? TXT('Solide ! Plumo a cherché la petite bête… il a trouvé une fourmi, pas plus.') : m >= 8 ? TXT('Ça se joue à pas grand-chose. Plumo a ri, mais il a aussi pris des notes pour t’aider.') : TXT('Plumo a vidé son stock de vannes. Bonne nouvelle : il ne reste que des progrès à faire. 💪');
  function examensAccueil(){
    qz = null; blanc = null; const E = window.EPREUVES, e = etatMatieres(); if(!E) return matieresAccueil();
    poser(barre('matieres') + TXT('<main class="coin-anglais matieres-ecran"><h2>📝 Brevet & bac blancs</h2><p class="pieges-intro">Construits comme les vrais sujets 2026 : mêmes parties, mêmes types d’exercices, même barème. Une note sur 20 par épreuve, puis la moyenne avec les coefficients officiels. Et Plumo qui vanne chaque erreur. 😏</p>') +
      ongletsExamens('examens') + '<div class="cartes-anglais">' + Object.entries(E.BLANCS).filter(([k, x]) => !x.tle && !x.techno && !x.pro && !/^(oral-dnb|oral-eaf|grand-oral)$/.test(k)).map(([k, x]) => '<button class="carte-anglais" data-a="examen-go" data-v="' + k + '"><span class="ic">' + x.ic + '</span><strong>' + esc(x.titre) + '</strong><small>' + esc(x.niveau) + ' · ' +
        x.epreuves.map(p => esc(E.EPREUVES[p[0]].titre)).join(', ') + (e.notes['blanc-' + k] != null ? TXT(' · dernière note : ') + virg(e.notes['blanc-' + k]) + '/20' : '') + '</small></button>').join('') + '</div>' +
      (E.SPES ? TXT('<section class="domaine"><h3>🎒 Terminale : spécialités et philosophie</h3><div class="cartes-anglais"><button class="carte-anglais" data-a="bac-tle"><span class="ic">🎓</span><strong>Bac blanc de terminale</strong><small>2 spécialités au choix + philosophie, coefficients officiels') +
        (e.notes['blanc-bac-tle'] != null ? TXT(' · dernière note : ') + virg(e.notes['blanc-bac-tle']) + '/20' : '') + '</small></button>' +
        Object.entries(E.BLANCS).filter(([, x]) => x.tle).map(([k, x]) => '<button class="carte-anglais" data-a="examen-go" data-v="' + k + '"><span class="ic">' + x.ic + '</span><strong>' + esc(x.titre) + '</strong><small>' + esc(E.EPREUVES[x.epreuves[0][0]].officiel) +
          (e.notes['blanc-' + k] != null ? ' · ' + virg(e.notes['blanc-' + k]) + '/20' : '') + '</small></button>').join('') + '</div></section>' : '') +
      (E.BLANCS['grand-oral'] ? '<section class="domaine"><h3>🎤 Les oraux</h3><div class="cartes-anglais">' + ['oral-dnb', 'oral-eaf', 'grand-oral'].map(k => { const x = E.BLANCS[k], ep = E.EPREUVES[x.epreuves[0][0]];
        return '<button class="carte-anglais" data-a="examen-go" data-v="' + k + '"><span class="ic">🎤</span><strong>' + esc(x.titre) + '</strong><small>' + esc(x.niveau) + ' · ' + esc(ep.duree) + '</small></button>'; }).join('') + '</div></section>' : '') +
      (E.BLANCS['bac-pro'] ? '<section class="domaine"><h3>🔧 Voie professionnelle</h3><div class="cartes-anglais">' + ['bac-pro', 'cap'].map(k => { const x = E.BLANCS[k];
        return '<button class="carte-anglais" data-a="examen-go" data-v="' + k + '"><span class="ic">' + x.ic + '</span><strong>' + esc(x.titre) + '</strong><small>' + x.epreuves.map(p => esc(E.EPREUVES[p[0]].titre.replace(/^(Bac pro|CAP) · /, ''))).join(', ') +
          (e.notes['blanc-' + k] != null ? ' · ' + virg(e.notes['blanc-' + k]) + '/20' : '') + '</small></button>'; }).join('') + '</div></section>' : '') +
      (E.SERIES_TECHNO ? '<section class="domaine"><h3>🛠️ Bac technologique</h3><div class="cartes-anglais">' + Object.entries(E.BLANCS).filter(([, x]) => x.techno).map(([k, x]) => '<button class="carte-anglais" data-a="examen-go" data-v="' + k + '"><span class="ic">' + x.ic + '</span><strong>' + esc(x.titre) + '</strong><small>' +
        x.epreuves.map(p => esc(E.EPREUVES[p[0]].titre)).join(' + ') + (e.notes['blanc-' + k] != null ? ' · ' + virg(e.notes['blanc-' + k]) + '/20' : '') + '</small></button>').join('') + '</div></section>' : '') + '</main>');
  }
  // Bac blanc de terminale : l'élève choisit ses 2 spécialités, la philosophie est ajoutée.
  function bacTerminale(){
    const E = window.EPREUVES; if(!E || !E.SPES) return examensAccueil();
    const choix = (Array.isArray(base.speChoix) ? base.speChoix : []).filter(x => E.SPES.includes(x)).slice(0, 2);
    poser(barre('examens') + TXT('<main class="coin-anglais matieres-ecran"><h2>🎓 Bac blanc de terminale</h2><p class="pieges-intro">Choisis tes 2 spécialités (') + choix.length + TXT('/2). La philosophie s’ajoute automatiquement. Coefficients officiels : 16 par spécialité, 8 pour la philo.</p>') +
      '<div class="cartes-anglais choix-matiere">' + E.SPES.map(id => { const ch = choix.includes(id); return '<button class="carte-anglais' + (ch ? ' choisie' : '') + '" data-a="bac-tle-spe" data-v="' + id + '" aria-pressed="' + ch + '"><span class="ic">' + (ch ? '✅' : '📘') + '</span><strong>' + esc(E.EPREUVES[id].titre.replace(TXT('Spécialité '), '')) + '</strong><small>' + esc(E.EPREUVES[id].duree) + '</small></button>'; }).join('') + '</div>' +
      '<p><button class="gros" data-a="bac-tle-go"' + (choix.length === 2 ? '' : ' disabled') + TXT('>▶ Commencer le bac blanc</button></p></main>'));
  }
  // v5.83 : espace « Officiel » — liens vers tous les programmes et toutes les annales du ministère.
  function officielAccueil(){
    qz = null; const E = window.EPREUVES; if(!E || !E.OFFICIEL) return matieresAccueil();
    const liste = l => '<div class="cartes-anglais">' + l.map(([t, u, d]) => '<a class="carte-anglais lien-carte" href="' + esc(u) + '" target="_blank" rel="noopener"><span class="ic">🔗</span><strong>' + esc(t) + '</strong><small>' + esc(d) + '</small></a>').join('') + '</div>';
    poser(barre('matieres') + TXT('<main class="coin-anglais matieres-ecran"><h2>🏛️ Programmes et annales officiels</h2><p class="pieges-intro">Les textes officiels et tous les vrais sujets, directement sur les sites du ministère (éduscol et education.gouv.fr). Les sujets jumeaux de Plumo sont dans les onglets Blancs et Annales.</p>') +
      ongletsExamens('officiel') + '<section class="domaine"><h3>📚 Programmes scolaires</h3>' + liste(E.OFFICIEL.programmes) + TXT('</section><section class="domaine"><h3>🗂️ Toutes les annales officielles</h3>') + liste(E.OFFICIEL.annales) + '</section></main>');
  }
  function annalesAccueil(){
    qz = null; blanc = null; const E = window.EPREUVES, e = etatMatieres(); if(!E) return matieresAccueil();
    const groupe = (t, l) => '<section class="domaine"><h3>' + t + '</h3><div class="cartes-anglais">' + l.map(a => '<div class="carte-annale"><button class="carte-anglais" data-a="annale-go" data-v="' + a.id + '"><span class="ic">🗂️</span><strong>' + esc(a.titre) + TXT('</strong><small>Jumeau du sujet ') + esc(a.ref) +
      (e.notes['annale-' + a.id] != null ? TXT(' · ta note : ') + virg(e.notes['annale-' + a.id]) + '/20' : '') + '</small></button><a class="lien-officiel" href="' + esc(a.url) + '" target="_blank" rel="noopener">📄 Sujet officiel (PDF)</a></div>').join('') + '</div></section>';
    poser(barre('matieres') + TXT('<main class="coin-anglais matieres-ecran"><h2>🗂️ Annales 2026</h2><p class="pieges-intro">Pour chaque vrai sujet 2026 : un sujet jumeau construit pareil, avec d’autres nombres et d’autres textes. Le vrai sujet officiel est à côté, sur le site du ministère.</p>') +
      ongletsExamens('annales') + '<div class="domaines">' + groupe('🎓 Brevet 2026', E.ANNALES.filter(a => /^dnb/.test(a.id))) + groupe(TXT('🎒 Bac 2026 · épreuves anticipées de 1re'), E.ANNALES.filter(a => !/^dnb/.test(a.id) && !a.tle)) + groupe(TXT('🎓 Bac 2026 · terminale : spécialités et philo'), E.ANNALES.filter(a => a.tle)) + '</div></main>');
  }
  // Une épreuve (ou une annale) se joue avec le moteur de questions ; chaque question rapporte ses points.
  function jouerEpreuve(ep, retour, fin){
    ep.gagnes = 0;
    questionsGo(ep.liste, { titre:'📝 ' + ep.titre, retour, lang:'fr', prof:ep.matiere === 'maths', sujet:ep.matiere,
      onReponse:(juste, q) => { if(juste) ep.gagnes += q.pts; else noterErreur('epr:' + (ep.ref || ep.id)); },
      fin:() => fin(window.EPREUVES.note20(ep.gagnes, ep.total)) });
  }
  function blancGo(k, perso){
    const E = window.EPREUVES, x = perso || (E && E.BLANCS[k]); if(!x) return examensAccueil();
    blanc = { k, x, i:0, notes:[], graine:Math.floor(Math.random() * 1e9) }; blancEpreuve();
  }
  function blancEpreuve(){
    const ex = blanc, E = window.EPREUVES; if(!ex || !E) return examensAccueil();
    if(ex.i >= ex.x.epreuves.length){
      const coefs = ex.x.epreuves.map(p => p[1]), moy = E.moyenne(ex.notes, coefs); etatMatieres().notes['blanc-' + ex.k] = moy; J().plumes += Math.round(moy); garder(); bruit('fin');
      const nonNotes = ex.x.epreuves.map(p => E.EPREUVES[p[0]].nonNote).filter(Boolean);
      return poser(barre('examens') + '<main class="centre examen-fin"><div class="ami-moyen">' + ami(moy >= 10 ? 'fete' : 'malin') + '</div><h2>' + ex.x.ic + ' ' + esc(ex.x.titre) + '</h2>' +
        '<ul class="pieges-cats">' + ex.x.epreuves.map((p, i) => '<li><span>' + esc(E.EPREUVES[p[0]].titre) + (ex.x.epreuves.length > 1 ? ' <small>coef. ' + virg(p[1]) + '</small>' : '') + '</span><strong>' + virg(ex.notes[i]) + '/20</strong></li>').join('') + '</ul>' +
        '<p class="note-examen">' + (ex.x.epreuves.length > 1 ? 'Moyenne : ' : '') + virg(moy) + ' / 20</p><p><strong>' + mentionDe(moy) + '</strong></p><p>🦉 ' + verdictAmi(moy) + '</p>' +
        (ex.x.bilan ? '<p class="petit">' + esc(ex.x.bilan) + '</p>' : '') + nonNotes.map(t => '<p class="petit">✍️ ' + esc(t).replace(/\n/g, '<br>') + '</p>').join('') +
        '<div class="actions serrees"><button class="moyen plein" data-a="examen-go" data-v="' + ex.k + '">🔁 Un autre sujet</button><button class="moyen" data-a="annales">🗂️ Les annales</button></div></main>');
    }
    const [id] = ex.x.epreuves[ex.i], ep = E.construire(id, ex.graine + ex.i * 7919); ex.ep = ep;
    poser(barre('examens') + '<main class="centre"><div class="ami-moyen">' + ami('malin') + '</div><p class="piege-cat">' + esc(ex.x.titre) + TXT(' · épreuve ') + (ex.i + 1) + '/' + ex.x.epreuves.length + '</p><h2>' + esc(ep.titre) + '</h2>' +
      '<p>⏱️ Au vrai examen : ' + esc(ep.duree) + TXT('<br>📋 Barème officiel : ') + esc(ep.officiel) + '</p><p>' + ep.liste.length + TXT(' questions dans l’appli. Prends ton temps : c’est le jour J pour de faux. 📝</p>') +
      (ep.nonNote ? '<p class="petit">✍️ ' + esc(ep.nonNote).replace(/\n/g, '<br>') + '</p>' : '') + TXT('<button class="gros" data-a="examen-suite">C’est parti ▶</button></main>'));
  }
  function blancSuite(){
    const ex = blanc; if(!ex || !ex.ep) return examensAccueil();
    jouerEpreuve(ex.ep, 'examens', note => { ex.notes.push(note); ex.i++; ex.ep = null; blancEpreuve(); });
  }
  let annaleEnCours = null;
  function annaleGo(id){
    const E = window.EPREUVES, a = E && E.annale(id, Math.floor(Math.random() * 1e9)); if(!a) return annalesAccueil();
    annaleEnCours = a;
    poser(barre('annales') + '<main class="centre"><div class="ami-moyen">' + ami('malin') + TXT('</div><p class="piege-cat">🗂️ Annales · jumeau du sujet ') + esc(a.ref) + '</p><h2>' + esc(a.titre) + '</h2>' +
      TXT('<p>Même construction que le vrai sujet, avec d’autres nombres et d’autres textes. ') + a.liste.length + TXT(' questions, notées sur 20.</p><p><a class="lien-officiel" href="') + esc(a.url) + TXT('" target="_blank" rel="noopener">📄 Voir le sujet officiel (PDF)</a></p>') +
      TXT('<button class="gros" data-a="annale-suite">C’est parti ▶</button></main>'));
  }
  function annaleSuite(){
    const a = annaleEnCours; if(!a) return annalesAccueil();
    jouerEpreuve(a, 'annales', note => { etatMatieres().notes['annale-' + a.id] = note; J().plumes += Math.round(note); garder(); bruit('fin');
      poser(barre('annales') + '<main class="centre examen-fin"><div class="ami-moyen">' + ami(note >= 10 ? 'fete' : 'malin') + '</div><h2>🗂️ ' + esc(a.titre) + '</h2><p class="note-examen">' + virg(note) + ' / 20</p><p><strong>' + mentionDe(note) + '</strong></p><p>🦉 ' + verdictAmi(note) + '</p>' +
        '<p><a class="lien-officiel" href="' + esc(a.url) + TXT('" target="_blank" rel="noopener">📄 Maintenant, attaque le vrai sujet officiel (PDF)</a></p>') +
        '<div class="actions serrees"><button class="moyen plein" data-a="annale-go" data-v="' + esc(a.id) + '">🔁 Un autre jumeau</button><button class="moyen" data-a="annales">🗂️ Les annales</button></div></main>'); });
  }

  // ── Coin sciences : espace, fusées, corps humain et médecine — avec des clashs quand on se trompe ──
  function sciencesAccueil(){
    qz = null; const SC = window.SCIENCES; if(!SC) return accueil();
    poser(barre('accueil') + TXT('<main class="coin-anglais coin-sciences"><h2>🚀 Le labo des sciences</h2><p class="pieges-intro">Planètes, fusées, corps humain, médecine. Ici, les mauvaises réponses se font démonter… mais les explications restent sérieuses.</p>') +
      '<div class="cartes-anglais">' + SC.THEMES.map(t => '<button class="carte-anglais" data-a="sciences-theme" data-v="' + t.id + '"><strong>' + t.e + ' ' + esc(t.titre) + '</strong><span>' + esc(t.sous) + '</span></button>').join('') +
      TXT('<button class="carte-anglais" data-a="sciences-theme" data-v="tout"><strong>🎲 Tout mélangé</strong><span>10 questions</span></button></div></main>'), 'sciences');
  }
  function sciencesGo(theme){
    const SC = window.SCIENCES; if(!SC) return accueil();
    const ton = etatMaths().ton, liste = SC.serie(theme, 10, Math.floor(Math.random() * 1e9), ton), t = SC.THEMES.find(x => x.id === theme);
    questionsGo(liste, { titre:(t ? t.e + ' ' + t.titre : TXT('🎲 Sciences')), retour:'sciences', lang:SC.langue ? SC.langue() : 'fr', humeurFaux:'mdr', bravo:SC.bravo && SC.bravo() ? () => SC.bravo() : undefined,
      onReponse:(juste, q) => { if(!juste) noterErreur('sciences:' + q.id); },
      fin:z => { J().plumes += z.bonnes; garder(); bruit('fin'); poser(barre('sciences') + '<main class="centre"><div class="ami-moyen">' + ami(z.bonnes >= 8 ? 'fete' : 'mdr') + TXT('</div><h2>🔬 Résultat du labo</h2><p class="gros-score">') + z.bonnes + '/' + z.liste.length + '</p><p>' + (z.bonnes >= 8 ? TXT('Le labo s’incline : prix Nobel de la récré ! 🏅') : TXT('Le labo a bien rigolé. Revanche ?')) + '</p><p>🪶 +' + z.bonnes + ' plumes</p><div class="actions serrees"><button class="moyen plein" data-a="sciences-theme" data-v="' + esc(theme) + TXT('">🔁 Encore</button><button class="moyen" data-a="sciences">🚀 Labo</button></div></main>')); } });
  }

  // ── Ami des mots Plus ─────────────────────────────────────────────
  let retourPlus = 'accueil';
  // v5.94 : toutes les façons de payer — formules (mensuel, annuel, famille, à vie) par Stripe sur le site,
  // achat Google Play / App Store dans l'appli (vérifié par le serveur), code cadeau, et code d'abonnement déjà payé.
  // v5.95 : textes des écrans récents dans les 11 langues (js/textes-plus.js).
  function tt(k, ...v){ return window.TT ? TT(k, base.ui, ...v) : k; }
  const nomFormule = id => tt(id);
  function formulesOffertes(){
    const valides = (offreLue({ FORMULES:CONFIG.FORMULES }).FORMULES || []);
    const l = valides.length ? valides : (CONFIG.LIEN_PAIEMENT ? [{ id:'mensuel', prix:CONFIG.PRIX, lien:CONFIG.LIEN_PAIEMENT, essai:'', magasin:false }] : []);
    return achatsNatifs() ? l.filter(f => f.magasin) : l.filter(f => f.lien);
  }
  const achatsNatifs = () => !!(window.ACHATS && ACHATS.natif() && CONFIG.API_MAGASIN);
  // Un certificat signé par le serveur (abonnement, cadeau, store) : on le vérifie avant d'ouvrir Plus.
  async function appliquerCertificat(d, code){
    const dd = d && d.actif ? await verifierJeton(d.jeton, code) : null; if(!dd) return false;
    Object.assign(base.abo, { code, jeton:d.jeton, verifie:jour() }); droits = dd; garder(); annonce('✨ ' + t('plus')); return true;
  }
  function ecranPlus(retour){
    retourPlus = retour || 'accueil';
    const natif = achatsNatifs(), fr = base.ui === 'fr', formules = formulesOffertes();
    const carte = f => {
      const prix = (natif && ACHATS.prix(f.id)) || f.prix || '';
      const lien = f.lien ? f.lien + (f.lien.includes('?') ? '&' : '?') + 'client_reference_id=' + encodeURIComponent(base.abo.code) : '';
      const corps = '<strong>' + esc(nomFormule(f.id)) + '</strong>' + (prix ? '<span class="prix-formule">' + esc(prix) + '</span>' : '') + (f.essai ? '<small>🎁 ' + esc(f.essai) + '</small>' : '') +
        (f.id === 'a_vie' ? '<small>' + esc(tt('une_fois')) + '</small>' : f.id === 'famille' ? '<small>' + esc(tt('tous_appareils')) + '</small>' : '');
      return natif ? '<button class="carte-formule" data-a="plus-acheter" data-v="' + f.id + '">' + corps + '</button>' : '<a class="carte-formule" href="' + esc(lien) + '" rel="noopener">' + corps + '</a>';
    };
    poser(barre(retourPlus) + '<main class="centre plus">' +
      '<div class="ami-moyen">' + ami('fete', { porte:['couronne'] }) + '</div>' +
      '<h2>✨ ' + esc(t('plus')) + '</h2><p>' + esc(t('plus_titre')) + '</p>' +
      '<ul class="avantages">' + t('plus_avantages').map(a => '<li>' + esc(a) + '</li>').join('') + '</ul>' +
      (formules.length ? '<div class="formules">' + formules.map(carte).join('') + '</div><p class="petit">' + esc(t('sans_engagement')) + (natif ? ' · ' + esc(tt('paie_dans', Capacitor.getPlatform() === 'ios' ? 'App Store' : 'Google Play')) : '') + '</p>'
        : '<p class="gros desactive" aria-disabled="true">' + esc(t('bientot')) + '</p>') +
      '<p class="aide" id="achat-etat" role="status" aria-live="polite"></p>' +
      (natif ? '<p><button class="moyen" data-a="plus-restaurer">🔄 ' + esc(tt('restaurer')) + '</button></p>' : (CONFIG.LIEN_GESTION ? '<p class="petit"><a href="' + esc(CONFIG.LIEN_GESTION) + '" rel="noopener">' + esc(tt('gerer')) + '</a></p>' : '')) +
      blocPlumes() + cartesModules('plus') +
      '<p class="petit">' + esc(t('gratuit_reste')) + '</p>' +
      (CONFIG.API_CADEAU ? '<details class="deja"><summary>🎁 ' + esc(tt('cadeau_ai')) + '</summary><form id="form-cadeau" class="form"><label>' + esc(tt('cadeau_code')) +
        '<input id="cadeau" autocomplete="off" autocapitalize="characters" spellcheck="false" placeholder="CADEAU-XXXX-XXXX"></label><button class="moyen plein" type="submit">' + esc(tt('utiliser')) + '</button><p id="cadeau-etat" role="status"></p></form></details>' : '') +
      (CONFIG.API_ABONNEMENT ? '<details class="deja"><summary>' + esc(t('deja_abonne')) + '</summary><form id="form-code" class="form"><label>' + esc(t('code_abo')) +
        '<input id="code" autocomplete="off" autocapitalize="characters" spellcheck="false" placeholder="AMI-XXXX-XXXX-XXXX"></label><button class="moyen plein" type="submit">' + esc(t('verifier')) + '</button><p id="code-etat" role="status"></p></form></details>' : '') +
      '<p class="petit"><a href="legal.html#cgv">' + esc(tt('cgv')) + '</a></p></main>');
    afficherSolde(); compterVisite('plus_vu');   // v6.0 : entonnoir anonyme
    document.querySelectorAll('.carte-formule').forEach(x => x.addEventListener('click', () => compterVisite('plus_clic'), { once:true }));
    const f = $('#form-code');
    if(f) f.addEventListener('submit', async ev => {
      ev.preventDefault();
      const code = formatCode($('#code').value), etat = $('#code-etat');
      if(!/^AMI-[A-Z0-9]{4}-[A-Z0-9]{4}-[A-Z0-9]{4}$/.test(code)){ etat.textContent = t('abo_inconnu'); return; }
      etat.textContent = '…';
      const r = await verifier(code);
      if(!r){ etat.textContent = t('hors_ligne'); return; }
      if(!await appliquerCertificat(r, code)){ etat.textContent = t('abo_inconnu'); return; }
      accueil();
    });
    const fc = $('#form-cadeau');
    if(fc) fc.addEventListener('submit', async ev => {
      ev.preventDefault();
      const cadeau = String($('#cadeau').value || '').toUpperCase().replace(/[^A-Z0-9-]/g, '').trim(), etat = $('#cadeau-etat');
      if(!/^CADEAU-[A-Z0-9]{4}-[A-Z0-9]{4}$/.test(cadeau)){ etat.textContent = tt('cadeau_format'); return; }
      etat.textContent = '…';
      try{
        const r = await fetch(CONFIG.API_CADEAU, { method:'POST', cache:'no-store', headers:{ 'Content-Type':'application/json' }, body:JSON.stringify({ code:base.abo.code, cadeau }) });
        const d = await r.json().catch(() => ({}));
        if(r.ok && await appliquerCertificat(d, base.abo.code)){ etat.textContent = tt('cadeau_ok', d.mois); setTimeout(() => accueil(), 1200); return; }
        const msg = { inconnu:tt('cadeau_inconnu'), deja_utilise:tt('cadeau_deja'), deja_a_vie:tt('cadeau_vie'), deja_abonne:tt('cadeau_abonne') };
        etat.textContent = msg[d.erreur] || t('hors_ligne');
      }catch(e){ etat.textContent = t('hors_ligne'); }
    });
  }
  async function acheterPlus(formule){
    const etat = $('#achat-etat'); if(etat) etat.textContent = '…';
    const r = await ACHATS.acheter(formule);
    if(etat) etat.textContent = tt(r.ok ? 'achat_verif' : 'achat_annule');
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
          porte:Array.isArray(j.porte) ? j.porte.filter(k => ACCESSOIRES.some(a => a[0] === k) || Object.prototype.hasOwnProperty.call(accModules(), k)) : [],
          badges:Array.isArray(j.badges) ? j.badges.filter(x => typeof x === 'string' && /^\d{4}-\d{2}$/.test(x)).slice(-60) : [],
          mots:filtrerObjet(j.mots, CLE_MOT, v => v && [0, 1, 2, 3, 4].includes(v.b) && DATE.test(v.d), 5000),
          pieges:window.PIEGES ? window.PIEGES.propre(j.pieges) : {},
          anglais:j.anglais && typeof j.anglais === 'object' ? JSON.parse(JSON.stringify(j.anglais)) : {},
          erreurs:Object.fromEntries(Object.entries(j.erreurs && typeof j.erreurs === 'object' ? j.erreurs : {}).filter(([k, v]) => typeof k === 'string' && k.length < 80 && Number.isInteger(v) && v > 0 && v < 1e5).slice(0, 300)),
          pasDrole:Array.isArray(j.pasDrole) ? j.pasDrole.filter(x => typeof x === 'string' && x.length < 400).slice(-200) : [],
          notesVannes:Object.fromEntries(Object.entries(j.notesVannes && typeof j.notesVannes === 'object' ? j.notesVannes : {}).filter(([k, v]) => typeof k === 'string' && k.length <= 300 && Number.isFinite(v)).map(([k, v]) => [k, Math.max(-20, Math.min(20, Math.round(v)))]).slice(0, 300)),
          vannesAimees:Array.isArray(j.vannesAimees) ? j.vannesAimees.filter(x => typeof x === 'string' && x.length < 400).slice(-100) : [],
          vannesFamille:Array.isArray(j.vannesFamille) ? j.vannesFamille.filter(x => typeof x === 'string' && x.length <= 140).slice(0, 30) : [],
          betisier:Array.isArray(j.betisier) ? j.betisier.filter(x => x && typeof x.v === 'string' && x.v.length <= 300 && Number.isFinite(x.t)).slice(-80) : [],
          avent:Array.isArray(j.avent) ? [...new Set(j.avent.filter(x => Number.isInteger(x) && x >= 1 && x <= 24))] : [],
          maison:j.maison && typeof j.maison === 'object' ? { achats:Array.isArray(j.maison.achats) ? j.maison.achats.filter(x => typeof x === 'string').slice(0, 40) : [], places:j.maison.places && typeof j.maison.places === 'object' ? Object.fromEntries(Object.entries(j.maison.places).filter(([k, v]) => /^(sol[0-5]|mur[0-2])$/.test(k) && typeof v === 'string')) : {} } : { achats:[], places:{} },
          gag:Math.min(20, Math.max(0, Math.floor(Number(j.gag)) || 0)),
          maths:j.maths && typeof j.maths === 'object' ? j.maths : {},
          matieres:j.matieres && typeof j.matieres === 'object' ? j.matieres : {},
          vannesVues:Math.min(1e6, Math.max(0, Math.floor(Number(j.vannesVues)) || 0)),
          vannesIA:j.vannesIA !== false,
          journal:(() => { const o = {}; if(j.journal && typeof j.journal === 'object') for(const [d, x] of Object.entries(j.journal).slice(-21)) if(/^\d{4}-\d\d-\d\d$/.test(d) && x && typeof x === 'object'){ o[d] = {}; for(const [k, n] of Object.entries(x)) if(/^(mots|anglais|maths|sciences|francais|histoire|svt|physique|medecine|droit|astro)[+-]$|^min$/.test(k)) o[d][k] = Math.max(0, Math.min(1e5, Math.floor(Number(n) || 0))); } return o; })(),
          avisVannes:Array.isArray(j.avisVannes) ? j.avisVannes.filter(x => x && typeof x.t === 'string').slice(-150).map(x => ({ t:x.t.slice(0, 220), v:x.v === 1 ? 1 : -1, d:String(x.d || '').slice(0, 10) })) : [],
          vannesDites:Array.isArray(j.vannesDites) ? j.vannesDites.filter(x => typeof x === 'string' && /^[0-9a-z]{1,8}$/.test(x)).slice(-400) : [],
          trophees:Array.isArray(j.trophees) ? j.trophees.filter(k => TROPHEES.includes(k)) : [], facile:!!j.facile });
        base.joueurs = d.joueurs.map(propre); base.actif = 0;
        if(UI.includes(d.ui)) base.ui = d.ui;
        if(APPRENDRE.includes(d.cible)) base.cible = d.cible;
        else if(d.cible){
          base.cibleMasquee = d.cible;
          base.cible = base.ui === 'fr' ? 'en' : 'fr';
        }
        if(base.cible === base.ui) base.cible = base.ui === 'en' ? 'fr' : 'en';   // v6.10 : jamais « Je parle » = « J'apprends » après une restauration
        // Le code d'abonnement revient ; le certificat sera redemandé au serveur.
        if(d.abo && /^AMI-[A-Z0-9]{4}-[A-Z0-9]{4}-[A-Z0-9]{4}$/.test(d.abo.code)){ base.abo = { code:d.abo.code, jeton:'', verifie:'' }; droits = null; }
        garder(); annonce('💾 ' + t('restaure_ok')); accueil.choisi = false; accueil(); rafraichir(true);
      }catch(e){ if(etat) etat.textContent = t('restaure_ko'); }
    };
    lu.readAsText(fichier);
  }
  document.addEventListener('change', ev => { if(ev.target.id === 'rappel-heure'){ base.rappel = Object.assign({}, base.rappel, { heure:Number(ev.target.value) || 18 }); garder(); majRappels(); } });
  document.addEventListener('change', ev => { if(ev.target.id === 'fichier-sauvegarde' && ev.target.files[0]) restaurer(ev.target.files[0]); });
  // Choix de la voix : gardé sur cet appareil ; la liste des voix arrive parfois en retard (Android, Chrome).
  document.addEventListener('change', ev => {
    const l = ev.target && ev.target.dataset && ev.target.dataset.voix; if(!l) return;
    const p = voixPreferees(); if(ev.target.value) p[l] = ev.target.value; else delete p[l];
    try{ localStorage.setItem('ami-voix', JSON.stringify(p)); }catch(e){}
  });
  try{ if(window.speechSynthesis && speechSynthesis.addEventListener) speechSynthesis.addEventListener('voiceschanged', () => {
    const b = document.querySelector('.reglage-voix-bloc'); if(b) b.outerHTML = reglageVoix();
  }); }catch(e){}

  // ── Un seul écouteur pour toute l'application ─────────────────────
  document.addEventListener('click', ev => {
    const b = ev.target.closest('[data-a]'); if(!b) return;
    const v = b.dataset.v;
    if(Object.prototype.hasOwnProperty.call(MODULES.actions, b.dataset.a)) return MODULES.actions[b.dataset.a](v, b, ev);
    if(COIN_DE[b.dataset.a] && !coinOuvert(COIN_DE[b.dataset.a])){ ev.preventDefault(); return ecranPlus(retourCoin(COIN_DE[b.dataset.a])); }
    if(b.tagName === 'A' && b.dataset.a === 'plus') ev.preventDefault();
    switch(b.dataset.a){
      case 'accueil': return depuis3D() ? retour3D() : accueil();
      case 'accueil-3d': if(CONFIG.VILLAGE_CACHE) return accueil(); try{ localStorage.setItem('ami_accueil3d', '1'); }catch(e){} location.href = 'monde-3d.html'; return;
      case 'themes': return depuis3D() ? retour3D() : themes();
      case 'theme': return choisirJeu(v);
      case 'theme-retour': return choisirJeu(theme);
      case 'jeu': return commencer(v);
      case 'defi': return defi();
      case 'porte-mots': return porteMots();
      case 'lecon': return lecon();
      case 'phrases': return atelierPhrases();
      case 'pieges': return pieges();
      case 'anglais': return coinAnglais();
      case 'battle': return battleMenu();
      case 'clash-libre': return clashLibre();
      case 'clash-libre-go': return clashLibreGo(v);
      case 'clash-libre-carte': if(clashL && clashL.main[+v]) return clashLibreEnvoyer(clashL.main[+v]); return clashLibre();
      case 'clash-libre-melange': if(clashL){ clashL.main = window.VANNES_LIBRES.tirer(clashL.jouees, null, paquet()); return clashLibreTour(); } return clashLibre();
      case 'clash-libre-ecrire': if(clashL){ clashL.ecrire = !clashL.ecrire; clashL.msg = ''; return clashLibreTour(); } return clashLibre();
      case 'clash-libre-envoyer': {
        if(!clashL) return clashLibre();
        const x = $('#cl-texte'), t = x ? String(x.value).trim() : '', jg = window.VANNES_LIBRES.juger(t);
        if(!jg.ok){ const m = $('#cl-msg'); if(m) m.textContent = TXT('🛑 Le juge de Plumo refuse : ') + jg.raisons.join(', ') + '.'; return; }
        return clashLibreEnvoyer({ fr:t });
      }
      case 'clash-libre-reaction': return clashLibreReaction(v);
      case 'clash-libre-suite': return clashLibreTour();
      case 'clash-libre-paquet': return clashPaquet();
      case 'clash-libre-ajouter': {
        const fr = $('#cl-fr') ? $('#cl-fr').value : '', en = $('#cl-en') ? $('#cl-en').value : '', m = $('#cl-paquet-msg');
        if(m) m.textContent = CONFIG.API_VANNE_JUGE ? TXT('🤖 L’IA réfléchit…') : '';
        return ajouterAuPaquet(fr, en).then(r => { paquetMsg = r.msg; if(r.ok) return clashPaquet(); const z = $('#cl-paquet-msg'); if(z) z.textContent = r.msg; });
      }
      case 'clash-libre-retirer': { const p = paquet(); if(p[+v]){ p.splice(+v, 1); base.clashPerso = p; garder(); paquetMsg = TXT('🗑️ Retirée du paquet.'); } return clashPaquet(); }
      case 'clash-libre-garder': {
        if(!clashL || !clashL.vanne) return; const b = document.querySelector('[data-a="clash-libre-garder"]'); if(b) b.disabled = true;
        return ajouterAuPaquet(clashL.vanne.fr, '').then(r => { const z = $('#cl-garde'); if(z) z.textContent = r.msg; });
      }
      case 'installer': if(installation){ const ev = installation; installation = null; ev.prompt(); ev.userChoice.finally(() => accueil()); } return;
      case 'maths': return mathsAccueil();
      case 'maths-niveau': if(window.MATHS && MATHS.NIVEAUX.includes(v)){ etatMaths().niveau = v; garder(); } return mathsAccueil();
      case 'programme-choix': base.programme = v === 'gb' ? 'gb' : 'fr'; garder(); return reglages();
      case 'maths-ton': if(TONS_PROF.some(x => x[0] === v)){ etatMaths().ton = v; garder(); } return mathsAccueil();
      case 'maths-chap': { const c = window.MATHS && MATHS.disponible(v) && MATHS.carte.niveaux[etatMaths().niveau].chapitres.find(x => x[0] === v); return c ? mathsSerie(v, 10, '🔢 ' + MATHS.tr.chap(c)) : mathsAccueil(); }
      case 'maths-melange': return mathsSerie(etatMaths().niveau, 10, TXT('🔁 Maths ') + etatMaths().niveau);
      case 'maths-examen': return mathsExamen();
      case 'maths-defi': return defiPoteGo(null, etatMaths().niveau);
      case 'sciences': return sciencesAccueil();
      case 'sciences-theme': return sciencesGo(v === 'tout' || (window.SCIENCES && SCIENCES.THEMES.some(x => x.id === v)) ? v : 'tout');
      case 'battle-go': return battleGo(v);
      case 'invente': return inventeGo();
      case 'invente-choix': { const [c, k] = String(v).split(':'); if(invente && ['v', 'a', 'l'].includes(c)) invente[c] = Number(k) || 0; return inventeGo(); }
      case 'invente-dire': { const ph = invente && PARCOURS.inventer(invente.v, invente.a, invente.l); if(ph){ direEcoute(ph.en, 'en'); const aie = A_EN().AIE[Math.floor(Math.random() * A_EN().AIE.length)]; const r = $('#invente-retour'); if(r) r.textContent = '🦉 « ' + aie.en + ' » (' + aie.fr + ')'; bruit('juste'); } return; }
      case 'invente-garder': { const ph = invente && PARCOURS.inventer(invente.v, invente.a, invente.l); if(ph){ const j = J(); j.fousRires = Array.isArray(j.fousRires) ? j.fousRires : []; const vv = ph.en + ' (' + ph.fr + ')'; if(!j.fousRires.some(x => x.v === vv)) j.fousRires = [{ v:vv, e:'🦉' }].concat(j.fousRires).slice(0, 60); garder(); const r = $('#invente-retour'); if(r) r.textContent = TXT('✓ Rangée dans tes fous rires !'); } return; }
      case 'parcours': return parcours();
      case 'trompe': return amiTrompe();
      case 'trompe-juge': return jugerTrompe(v);
      case 'trompe-corrige': return corrigerTrompe(Number(v));
      case 'trompe-suivant': if(trompe){ trompe.i++; } return afficherTrompe();
      case 'trompe-ecouter': if(trompe && trompe.l[trompe.i]){ const x = trompe.l[trompe.i]; direEcoute(x.faute ? x.p.faux[x.k].en : x.p.bon, 'en'); } return;
      case 'oreilles': return oreillesGo();
      case 'vraifaux': return vraiFauxGo();
      case 'qz-lent': if(qz && qz.liste[qz.i] && qz.liste[qz.i].ecoute) direEcoute(qz.liste[qz.i].ecoute, 'en', .6); return;
      case 'dire-en': return direEcoute(String(v || ''), 'en');
      case 'avent': return avent();
      case 'avent-case': return aventCase(Number(v));
      case 'avent-rep': return aventRep(v);
      case 'maison': return maison();
      case 'maison-acheter': return maisonAcheter(v);
      case 'maison-fente': return maisonFente(v);
      case 'maison-ranger': { const m = etatMaison(); delete m.places[v]; garder(); maisonMsg = TXT('📦 Rangé dans le carton.'); return maison(); }
      case 'betisier': return betisier();
      case 'best-suivant': if(best){ best.i++; } return afficherBest();
      case 'matieres': return matieresAccueil();
      case 'matiere': return matiereAccueil(v || (window.MATIERES && etatMatieres().derniere) || 'francais');
      case 'matiere-niveau': { const [id, n] = String(v).split('|'); if(window.MATIERES && MATIERES.NIVEAUX.includes(n)){ etatMatieres().niveau = n; garder(); } return matiereAccueil(id); }
      case 'maths-ton-matiere': { const [id, k] = String(v).split('|'); if(TONS_PROF.some(x => x[0] === k)){ etatMaths().ton = k; garder(); } return matiereAccueil(id); }
      case 'matiere-chap': { const [id, c] = String(v).split('|'), m = window.MATIERES && MATIERES.trouver(id), ch = m && m.chapitres.find(x => x.id === c); return ch ? matiereSerie(id, c, 10, m.ic + ' ' + MATIERES.nomChap(m, ch)) : matieresAccueil(); }
      case 'matiere-melange': { const m = window.MATIERES && MATIERES.trouver(v); return m ? matiereSerie(v, 'melange', 10, m.ic + ' ' + MATIERES.nom(m) + ' · ' + etatMatieres().niveau) : matieresAccueil(); }
      case 'matiere-examen': { const m = window.MATIERES && MATIERES.trouver(v), e = etatMatieres(), t = m && m.examens && m.examens[e.niveau]; if(!t) return matiereAccueil(v);
        return matiereSerie(v, 'examen', 20, '📝 ' + t, z => { const note = noteSur20(z); etatMatieres().notes[v + '-' + e.niveau] = note; garder(); finMatiere(z, '📝 ' + t, v, note); }); }
      case 'examens': return examensAccueil();
      case 'examen-go': return blancGo(v);
      case 'examen-suite': return blancSuite();
      case 'annales': return annalesAccueil();
      case 'officiel': return officielAccueil();
      case 'bac-tle': return bacTerminale();
      case 'bac-tle-spe': { const E = window.EPREUVES; if(E && E.SPES && E.SPES.includes(v)){ let l = (Array.isArray(base.speChoix) ? base.speChoix : []).filter(x => E.SPES.includes(x));
        l = l.includes(v) ? l.filter(x => x !== v) : l.concat(v).slice(-2); base.speChoix = l; garder(); } return bacTerminale(); }
      case 'bac-tle-go': { const E = window.EPREUVES, l = (Array.isArray(base.speChoix) ? base.speChoix : []).filter(x => E && E.SPES && E.SPES.includes(x)); if(l.length !== 2) return bacTerminale(); return blancGo('bac-tle', E.bacTerminale(l[0], l[1])); }
      case 'annale-go': return annaleGo(v);
      case 'annale-suite': return annaleSuite();
      case 'potes': return potesMenu();
      case 'potes-matiere': if(MATIERES_POTES.some(x => x[0] === v)){ base.potesMode = v; garder(); } return potesMenu();
      case 'potes-longueur': if(LONGUEURS_POTES[v]){ base.potesLongueur = v; garder(); } return potesMenu();
      case 'potes-trash': base.potesTrash = !base.potesTrash; garder(); return potesMenu();
      case 'potes-go': return potesGo();
      case 'potes-joue': return potesJoue();
      case 'potes-revanche': if(potes){ potes = Object.assign(potes, { scores:[], i:0, graine:Math.floor(Math.random() * 1e9) }); return potesTour(); } return potesMenu();
      case 'tournoi': return tournoiMenu();
      case 'tournoi-go': return tournoiGo();
      case 'tournoi-go-memes': if(tournoi){ tournoi = { noms:tournoi.noms, scores:[], i:0, graine:Math.floor(Math.random() * 1e9) }; return tournoiTour(); } return tournoiMenu();
      case 'tournoi-joue': return tournoiJoue();
      case 'defi-pote': return defiPote();
      case 'defi-pote-go': return defiPoteGo(null);
      case 'defi-relever': return defiPoteGo(defiRecu);
      case 'defi-partager': { if(!defiCree) return; if(navigator.share) navigator.share({ title:'Ami des mots', text:defiCree.texte, url:defiCree.lien }).catch(() => {}); else { const m = $('#defi-msg'); if(m) m.textContent = TXT('Copie le lien et envoie-le à ton pote. 📋'); } return; }
      case 'defi-copier': { if(!defiCree) return; const m = $('#defi-msg'); try{ navigator.clipboard.writeText(defiCree.lien).then(() => { if(m) m.textContent = TXT('📋 Lien copié !'); }, () => { if(m) m.textContent = TXT('Sélectionne le lien et copie-le.'); }); }catch(e){ if(m) m.textContent = TXT('Sélectionne le lien et copie-le.'); } const i = $('#lien-defi'); if(i) i.select(); return; }
      case 'rap': return rapGo();
      case 'rap-suivant': if(rap){ rap.ligne++; rap.fini = false; } return afficherRap();
      case 'rap-rime': return rimeRap(Number(v));
      case 'rap-apres': if(rap){ rap.fini = false; rap.couplet++; if(rap.couplet > 1){ rap.couplet = 0; rap.ligne = -1; rap.manche++; } } return afficherRap();
      case 'salon': return salonAccueil();
      case 'salon-creer': return ouvrirSalon(window.SALON.nouveauCode(), v === 'public');
      case 'salon-rejoindre': return ouvrirSalon(String((($('#code-salon') || {}).value || '')).toUpperCase().trim(), false);
      case 'salon-public': return salonsPublics();
      case 'salon-entrer-public': return ouvrirSalon(String(v), true);
      case 'salon-retour': return afficherSalle();
      case 'salon-quitter': quitterSalon(); return salonAccueil();
      case 'salon-lancer': if(salon && estHote() && listeJoueurs().length >= 2) salon.canal.envoyer('debut', Object.assign({ id:salon.id, graine:Math.floor(Math.random() * 1e9), n:6 }, window.MATHS && MATHS.NIVEAUX.includes(v) ? { m:v } : {})); return;
      case 'salon-rep': return repondreSalon(Number(v));
      case 'salon-ecouter': if(salon && salon.partie){ const q = salon.partie.liste[salon.partie.i]; if(q && q.ecoute) direEcoute(q.ecoute, 'en'); } return;
      case 'salon-reaction': if(salon && salon.canal) salon.canal.envoyer('reaction', { id:salon.id, r:String(v) }); return;
      case 'salon-chat': { if(!salon || salon.public || !base.salonChat) return; const z = $('#chat-texte'), f = window.SALON.filtrer(z && z.value); if(f.texte){ salon.canal.envoyer('chat', { id:salon.id, t:f.texte }); z.value = ''; } return; }
      case 'salon-muet': if(salon && v && v !== salon.id){ if(salon.muets.has(v)) salon.muets.delete(v); else salon.muets.add(v); afficherSalle(); } return;
      case 'salon-inviter': { if(!salon) return; const lien = location.origin + location.pathname + '?salon=' + salon.code; if(navigator.share) navigator.share({ title:'Ami des mots', text:TXT('Rejoins mon salon de battle ! Code : ') + salon.code, url:lien }).catch(() => {}); else toastSalon('Code : ' + salon.code + ' — lien : ' + lien); return; }
      case 'salon-chat-reglage': base.salonChat = !!($('#salon-chat') || {}).checked; garder(); return;
      case 'vanne-famille-ajout': { const z = $('#vanne-famille'), t = String(z && z.value || '').replace(/[<>]/g, '').trim().slice(0, 140); if(!t) return;
        const avis = window.JUGE ? JUGE.juger(t) : { ok:true, raisons:[] };
        if(!avis.ok){ jugeMsg = '🤖 Plumo refuse cette vanne (' + avis.raisons.join(', ') + TXT(') : on taquine la confusion, jamais la personne. 🙂'); return tableauParents(); }
        const j = J(); j.vannesFamille = (Array.isArray(j.vannesFamille) ? j.vannesFamille : []).concat(t).slice(0, 30); garder(); jugeMsg = TXT('✅ Vanne acceptée par le juge de Plumo !'); return tableauParents(); }
      case 'vannes-ia': { const th = $('#vannes-ia-theme'), to = $('#vannes-ia-ton'); demanderVannesIA(th ? th.value : 'animaux', to ? to.value : 'normal'); return; }
      case 'vanne-ia-garder': case 'vanne-ia-non': { const k = Number(v), x = vannesIA && vannesIA[k]; if(!x) return;
        vannesIA.splice(k, 1);
        if(b.dataset.a === 'vanne-ia-garder' && (!window.JUGE || JUGE.juger(x).ok)){ const j = J(); j.vannesFamille = (Array.isArray(j.vannesFamille) ? j.vannesFamille : []).concat(x).slice(0, 30); garder(); vannesIAMsg = TXT('✅ Gardée ! Plumo la ressortira de temps en temps.'); }
        else vannesIAMsg = TXT('🗑️ Jetée.');
        return revoirVannesIA(); }
      case 'vanne-famille-suppr': { const j = J(); if(Array.isArray(j.vannesFamille)) j.vannesFamille.splice(Number(v), 1); garder(); return tableauParents(); }
      case 'examen': return examenGo(Number(v));
      case 'revision': return revisionGo();
      case 'qz-rep': return repondreQuestion(Number(v));
      case 'qz-suivant': if(qz){ qz.i++; } return afficherQuestion();
      case 'qz-ecouter': if(qz && qz.liste[qz.i] && qz.liste[qz.i].ecoute) direEcoute(qz.liste[qz.i].ecoute, 'en'); return;
      case 'bj-ecouter': if(window.BLAGUES_EN){ const bj = BLAGUES_EN.duJour(); direEcoute(bj.q + ' … ' + bj.r, 'en'); } return;
      case 'histoires': return histoires();
      case 'histoire-go': return histoireGo(v);
      case 'ligne-suivante': if(lecture){ lecture.i++; } return afficherLigne();
      case 'ligne-avant': if(lecture && lecture.i > 0){ lecture.i--; } return afficherLigne();
      case 'ligne-ecouter': if(lecture && lecture.h.lignes[lecture.i]) direEcoute(lecture.h.lignes[lecture.i][1], 'en'); return;
      case 'repeter': return repeter();
      case 'repeter-ecouter': if(rep1) direEcoute(PARCOURS.REPETER[rep1.i].en, 'en'); return;
      case 'repeter-lent': if(rep1) direEcoute(PARCOURS.REPETER[rep1.i].en, 'en', .6); return;
      case 'repeter-micro': return enregistrerPhrase();
      case 'repeter-bien': { if(rep1){ const e = etatAnglais(); if(!e.repete.includes(rep1.i)){ e.repete.push(rep1.i); J().plumes += 1; garder(); } const s2 = $('#rep-etat'); if(s2) s2.textContent = TXT('✅ Bravo ! Phrase suivante ?'); bruit('juste'); } return; }
      case 'repeter-suivant': { const l = PARCOURS.REPETER, e = etatAnglais(); let i = l.findIndex((x, k) => !e.repete.includes(k) && (!rep1 || k !== rep1.i)); if(i < 0) i = rep1 ? (rep1.i + 1) % l.length : 0; return afficherRepeter(i); }
      case 'parents': return parents();
      case 'bilan-partager': {
        const m = $('#bilan-msg'), txt = bilanTexte || TXT('Bilan Ami des mots');
        if(navigator.share) return navigator.share({ title:TXT('Bilan Ami des mots'), text:txt }).catch(() => {});
        if(navigator.clipboard) return navigator.clipboard.writeText(txt).then(() => { if(m) m.textContent = tt('bilan_copie'); }, () => { if(m) m.textContent = txt; });
        if(m) m.textContent = txt; return;
      }
      case 'parents-ouvrir': { const z = $('#porte-parents'); if(porteParents && z && Number(z.value) === porteParents.a * porteParents.b) return tableauParents(); const m = $('#porte-msg'); if(m) m.textContent = TXT('Ce n’est pas ça. Demande à un adulte ! 😉'); return; }
      case 'battle-rep': return repondreBattle(Number(v));
      case 'battle-suivant': if(battle){ battle.i++; } return afficherBattle();
      case 'battle-ecouter': if(battle && battle.manches[battle.i]) direEcoute(battle.manches[battle.i].ami, 'en'); return;
      case 'situations': return situations();
      case 'situation-go': return situationGo(v);
      case 'situation-rep': return repondreSituation(Number(v));
      case 'situation-suivant': if(situation){ situation.i++; } return afficherSituation();
      case 'situation-ecouter': if(situation){ const et = situation.x.etapes[situation.i]; if(et && et.dit) direEcoute(et.dit, 'en'); } return;
      case 'dictee': return dicteeGo();
      case 'dictee-ecouter': if(dictee && dictee.liste[dictee.i]) direEcoute(dictee.liste[dictee.i].en, 'en'); return;
      case 'dictee-lent': if(dictee && dictee.liste[dictee.i]) direEcoute(dictee.liste[dictee.i].en, 'en', .6); return;
      case 'dictee-verifier': return verifierDictee();
      case 'dictee-suivant': if(dictee){ dictee.i++; } return afficherDictee();
      case 'pieges-go': return piegesGo();
      case 'piege-rep': return repondrePiege(Number(v));
      case 'piege-suivant': if(piege){ piege.i++; } return afficherPiege();
      case 'piege-ecouter': if(piege && piege.liste[piege.i]) direEcoute(piege.liste[piege.i].bon, 'en'); return;
      case 'village': return depuis3D() ? retour3D() : village();
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
      case 'bouche': fermerFenetre(); return boucheDispo() && Articulation.montrer(aDire(v), b);
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
      case 'fous-rires': return fousRires();
      case 'qz-avis': { const t = qz && qz.derniereVanne; if(t){ const j = J(); j.avisVannes = (Array.isArray(j.avisVannes) ? j.avisVannes : []).filter(x => x.t !== t).concat({ t, v:v === '1' ? 1 : -1, d:jour() }).slice(-150); garder();
          document.querySelectorAll('[data-a="qz-avis"]').forEach(x => { x.disabled = true; if(x.dataset.v === v) x.classList.add('plein'); }); } return; }
      case 'garder-vanne': { const m = partie && partie.dernierModele; if(m){ const j = J(); j.vannesAimees = (Array.isArray(j.vannesAimees) ? j.vannesAimees : []).filter(x => x !== m).concat(m).slice(-100); if(window.JUGE) j.notesVannes = JUGE.noter(j.notesVannes, m, 2); } return garderVanne(); }
      case 'pas-drole': { const m = partie && partie.dernierModele; if(m){ const j = J(); j.pasDrole = (Array.isArray(j.pasDrole) ? j.pasDrole : []).filter(x => x !== m).concat(m).slice(-200); if(window.JUGE) j.notesVannes = JUGE.noter(j.notesVannes, m, -3); garder(); } const pd = $('#pas-drole'); if(pd){ pd.textContent = '✓ ' + (base.ui === 'en' ? 'Noted' : TXT('Noté, Plumo la range au placard')); pd.disabled = true; } return; }
      case 'oublier-vanne': { const j = J(), i = Number(v); if(Array.isArray(j.fousRires) && Number.isInteger(i)){ j.fousRires.splice(i, 1); garder(); } return fousRires(); }
      case 'trophees': return ecranTrophees();
      case 'vestiaire': return vestiaire();
      case 'reglages': case 'apropos': return reglages();
      case 'qui': accueil.choisi = false; return quiJoue();
      case 'choisir-joueur': base.actif = Number(v); garder(); accueil.choisi = true; return accueil();
      case 'nouveau-joueur': return base.joueurs.length >= CONFIG.JOUEURS_GRATUITS && !plus() && !(base.joueurs.length === 1 && !base.joueurs[0].nom) ? ecranPlus('reglages') : formJoueur(null);
      case 'plus': return ecranPlus(v || 'accueil');
      case 'plus-acheter': if(achatsNatifs()) return acheterPlus(v); return;
      case 'plumes': return ecranPlumes(false);
      case 'plumes-ouvrir': { const x = Number(($('#porte-plumes') || {}).value); if(portePlumes && x === portePlumes.a * portePlumes.b) return ecranPlumes(true); const m = $('#porte-plumes-msg'); if(m) m.textContent = tt('plumes_rate'); return; }
      case 'plumes-acheter': if(achatsNatifs()) return acheterPlus(v); return;
      case 'plus-restaurer': if(achatsNatifs()){ const e = $('#achat-etat'); if(e) e.textContent = '…'; return ACHATS.restaurer().then(() => { const z = $('#achat-etat'); if(z && !plus()) z.textContent = tt('rien_restaurer'); }); } return;
      case 'modifier-joueur': return formJoueur(Number(v));
      case 'supprimer-joueur':
        if(!b.dataset.ok){ b.dataset.ok = 1; b.textContent = t('confirmer'); return; }
        base.joueurs.splice(Number(v), 1); base.actif = 0; garder(); return reglages();
      case 'facile': J().facile = !J().facile; garder(); return reglages();
      case 'taille-texte': base.texte = ['normal', 'grand', 'tres-grand'].includes(v) ? v : 'normal'; garder(); appliquerTexte(); return reglages();
      case 'carnet-erreurs': return carnetGo();
      case 'consigne': return lireConsigne(($('#consigne') || {}).textContent);
      case 'humour': J().humour = Math.max(0, Math.min(3, Number(v) || 0)); garder(); return reglages();
      case 'langue-blagues': J().langueBlagues = v === 'en' ? 'en' : 'fr'; garder(); return reglages();
      case 'continuer-erreur':
        if(!partie || !partie.attenteErreur) return;
        partie.attenteErreur = false;
        partie.verrou = false;
        const boutonSuite = $('#continuer-erreur'); if(boutonSuite) boutonSuite.hidden = true;
        const boutonFav = $('#garder-vanne'); if(boutonFav) boutonFav.hidden = true;
        if(partie.finir || (partie.chronoFin && Date.now() >= partie.chronoFin)) return fin();
        partie.i++; return question();
      case 'sauvegarder': return sauvegarder();
      case 'restaurer': return $('#fichier-sauvegarde').click();
      case 'essai-voix': {
        const sel = document.querySelector('select[data-voix="' + v + '"]');
        if(sel){ const p = voixPreferees(); if(sel.value) p[v] = sel.value; else delete p[v]; try{ localStorage.setItem('ami-voix', JSON.stringify(p)); }catch(e){} }
        return direPhrase(v === 'fr' ? TXT('Salut ! Moi, c’est Plumo. Tu m’entends bien ?') : v === 'en' ? 'Hi! I am Plumo. Can you hear me?' : (t('a_ombre') || 'Plumo'), v, 1);
      }
      case 'vannes-ia-direct': J().vannesIA = J().vannesIA === false; garder(); return reglages();
      case 'graphismes': if(window.GRAPHISMES) GRAPHISMES.definir(v); return reglages();
      case 'son': base.son = !base.son; garder(); bruit('juste'); return reglages();
      case 'rappel': { const r = base.rappel = Object.assign({ heure:18 }, base.rappel, { actif:!(base.rappel && base.rappel.actif) }); garder();
        return majRappels().then(x => { if(r.actif && x && x.raison === 'permission'){ r.actif = false; garder(); reglages(); const e = document.getElementById('etat-rappel'); if(e) e.textContent = tt('rappel_refuse'); } else reglages(); }); }
      case 'porter': { const j = J(), m = accModules()[v]; if(!j.porte.includes(v) && !(ACCESSOIRES.some(a => a[0] === v && j.plumes >= a[1]) || (m && m.debloque()))) return vestiaire();
        j.porte = j.porte.includes(v) ? j.porte.filter(x => x !== v) : j.porte.concat(v); garder(); return vestiaire(); }
      case 'effacer-tout':
        if(!b.dataset.ok){ b.dataset.ok = 1; b.textContent = t('confirmer'); return; }
        Object.assign(J(), { plumes:0, etoiles:{}, jours:[], porte:[], mots:{}, trophees:[], defis:[], pieges:{}, anglais:{}, erreurs:{}, pasDrole:[], vannesAimees:[], notesVannes:{}, vannesFamille:[], betisier:[], avent:[], maison:{ achats:[], places:{} }, gag:0, maths:{} }); garder(); return accueil();
    }
  });
  document.addEventListener('keydown', ev => { if(ev.key === 'Escape' && $('#fenetre')) fermerFenetre(); });
  document.addEventListener('click', ev => { if(ev.target.id === 'fenetre') fermerFenetre(); });
  document.addEventListener('click', ev => {
    const c = ev.target.closest('#carte'); if(!c) return;
    c.classList.toggle('retournee');
    if(c.classList.contains('retournee')) dire(partie.liste[partie.i]);
  });

  // Plumo suit le doigt (ou la souris) du regard ; les cartes de thème s'inclinent.
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
  // Accueil en 3D : un lien du village 3D (?aller=…) ouvre directement un jeu ; « Accueil » y ramène.
  const params = new URLSearchParams(location.search), lienAller = params.get('aller'), lienDefi = params.get('defi'), lienSalon = params.get('salon');
  if(retourPaiement) try{ history.replaceState(null, '', location.pathname); }catch(e){}
  // Au lancement : le certificat gardé est vérifié (hors connexion aussi), puis le serveur est consulté.
  // v5.85 : l'offre signée (gardée, puis celle du serveur) est appliquée avant ; l'écran se redessine si elle change.
  const redessiner = () => { if(!partie && !lienAller && !lienDefi && !lienSalon && !depuis3D()) accueil(); };
  compterVisite('ouverture'); majRappels(); appliquerTexte();
  window.AmiDesMotsPret = offreGardee().then(g => { if(g) redessiner(); return verifierJeton(base.abo.jeton, base.abo.code); })
    .then(d => { droits = d; if(d) redessiner(); return rafraichir(retourPaiement); })
    .then(() => offreServeur()).then(chg => { if(chg) redessiner(); })
    // v5.94 : achats dans l'appli (Google Play / App Store) ; chaque achat est vérifié par le serveur.
    .then(() => { if(CONFIG.MODE_PAYANT && achatsNatifs()) return ACHATS.init({ api:CONFIG.API_MAGASIN, code:() => base.abo.code, compte:() => fnv1a('ami|' + base.abo.code), plumes:() => afficherSolde(), packs:(plumesActives() ? reglagesPlumes().packs.filter(p => p.magasin).map(p => p.id) : []),
      certificat:async d => { if(await appliquerCertificat(d, base.abo.code) && !partie) accueil(); } }).catch(() => {}); });
  // Le webhook Stripe peut arriver quelques secondes après le retour.
  if(retourPaiement) [5000, 15000, 40000].forEach(ms => setTimeout(() => { if(!plus()) rafraichir(true); }, ms));
  if(boucheDispo()) try{ Articulation.init(); }catch(e){}
  if('serviceWorker' in navigator && location.protocol === 'https:') navigator.serviceWorker.register('sw.js').catch(() => {});
  // v6.0 : ce que les modules peuvent utiliser (rien d'autre).
  MODULES.api = { base:() => base, J, garder, poser, barre, esc, t, tt, TXT, jour, questionsGo, ami, annonce, bruit, plus, accueil, CONFIG,
    etatMatieres, matiereAccueil, matieresAccueil, noterErreur, codePlumes, plumesActives, retour:() => { qz = null; return accueil(); },
    serieMatiere:(id, cible, n, niveau) => window.MATIERES ? MATIERES.serie(id, cible, niveau || etatMatieres().niveau, n, Math.floor(Math.random() * 1e9), etatMaths().ton) : [],
    serieMaths:(n, niveau, graine) => window.MATHS ? MATHS.serie(niveau || etatMaths().niveau, n, graine != null ? graine : Math.floor(Math.random() * 1e9), etatMaths().ton) : [], etatMaths, questionsBattle:typeof questionsBattle === 'function' ? questionsBattle : null, cartesModules };
  // v6.0 : liens d'invitation (?ligue=, ?classe=, ?parrain=) et autres démarrages de modules.
  { const go = () => setTimeout(() => { for(const f of (window.AMI_MODULES.auDemarrage || [])) try{ f(); }catch(e){} }, 0);
    if(document.readyState === 'loading') document.addEventListener('DOMContentLoaded', go); else go(); }
  window.AmiDesMots = { questionsGo, formulesOffertes, appliquerCertificat, qzBonne:() => qz && qz.liste[qz.i] ? qz.liste[qz.i].bon : null, CLE_OFFRE, verifierOffre, base, J, affiche, fnv1a, urlVoix, accueil, themes, choisirJeu, commencer, lettresPossibles, distincts, motsDu, aDire, CATALOGUE, MECAS, disponible, nomJeu, aRevoir, noter, jour, defi, revoir, lecon, astuces, aToi, blague, carnet, noteVoix, sansEmojis, direPhrase, direEcoute, iaPrecharger, iaPrendre, vanneObjets, avecArticle, astuce, niveauHumour, fousRires, reglages, CONFIG, COINS, coinOuvert, offreLue, facile, nbMots, restaurer, verifierJeton, plus, ecranPlus, formatCode, rafraichir,
    get etat(){ return J(); } };
  garder();
  if(lienDefi || lienSalon){
    try{ history.replaceState(null, '', location.pathname); }catch(e){}
    const d = lienDefi && window.RIGOLADE && RIGOLADE.lireDefi(lienDefi);
    if(d && !coinOuvert('defi-pote')) ecranPlus('accueil');
    else if(d) ecranDefiRecu(d);
    else if(lienSalon && !coinOuvert('salon')) ecranPlus('accueil');
    else if(lienSalon && window.SALON && SALON.codeValide(String(lienSalon).toUpperCase())){ salonAccueil(); const z = $('#code-salon'); if(z) z.value = String(lienSalon).toUpperCase(); }
    else accueil();
  }
  else if(lienAller){
    try{ history.replaceState(null, '', location.pathname); }catch(e){}
    if(lienAller === 'classique'){ try{ sessionStorage.removeItem('ami_depuis3d'); localStorage.setItem('ami_accueil3d', '0'); }catch(e){} accueil(); }
    else{ try{ sessionStorage.setItem('ami_depuis3d', '1'); }catch(e){} ouvrirDepuis3D(lienAller); }
  }
  else if(!location.search && !CONFIG.VILLAGE_CACHE && accueil3DAuto() && coinOuvert('village3d')) location.replace('monde-3d.html');
  else accueil();
})();
