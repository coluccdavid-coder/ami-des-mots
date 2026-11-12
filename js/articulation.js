// Ami des mots — recopié de ReParole (js/articulation.js, v6.452) : le bec d'Ami
// suit la voix. Ne pas modifier ici : recopier depuis ReParole si besoin.
// =====================================================================
//  v6.452 — ARTICULATION : AMI ARTICULE, ET LA BOUCHE VUE DE PROFIL
//  ---------------------------------------------------------------------
//  Chargé à la demande (par js/suivi.js, après le tableau de bord) : rien
//  de ceci ne pèse sur le premier chargement.
//
//  1. texte → suite de SONS (règles d'écriture par langue) ;
//  2. son → POSTURE (mâchoire, lèvres, langue, voile du palais) ;
//  3. la posture anime : le bec d'Ami, partout où il est affiché, et un
//     schéma de profil de la bouche (« 👄 Voir la bouche ») dans les
//     exercices de répétition et les phrases du quotidien.
//
//  HONNÊTETÉ. C'est un SCHÉMA SIMPLIFIÉ, calculé depuis l'orthographe :
//  les grandes classes de sons (lèvres fermées, pointe de langue, dos de
//  langue, voyelles ouvertes / arrondies, air par le nez) sont celles des
//  manuels ; le détail mot par mot est approximatif, surtout en anglais.
//  À faire valider par un·e orthophoniste (docs/ARTICULATION.md).
//  Langue non prise en charge (kanji, tifinagh) → pas de bouton, jamais
//  un schéma faux.
//
//  SOBRIÉTÉ. `prefers-reduced-motion` : le bec d'Ami ne bouge pas, et le
//  schéma passe d'une posture à l'autre sans glissement.
// =====================================================================
(function(){
  'use strict';

  // ── 1. LES SONS ────────────────────────────────────────────────────
  // v : posture ; voix : les cordes vocales vibrent ; nez : l'air passe
  // par le nez ; d : durée de base (ms).
  const C = (v, voix, nez, d) => ({ v, voix:!!voix, nez:!!nez, d:d || 105 });
  const V = (v, nez, d) => ({ v, voix:true, nez:!!nez, d:d || 170, voyelle:true });
  const SONS = {
    p:C('p',0,0,95), b:C('p',1,0,95), m:C('p',1,1,115),
    f:C('f'), v:C('f',1),
    t:C('t',0,0,90), d:C('t',1,0,90), n:C('t',1,1,110),
    l:C('l',1), s:C('s',0,0,120), z:C('s',1,0,115),
    S:C('ch',0,0,125), Z:C('ch',1,0,120),
    k:C('k',0,0,95), g:C('k',1,0,95), N:C('k',1,1,115),
    R:C('r',1), r:C('rr',1),
    T:C('th'), D:C('th',1),
    h:C('h',0,0,90), q:C('q'), G:C('q',1),
    j:Object.assign(C('i',1,0,80), { glissante:true }), w:Object.assign(C('u',1,0,80), { glissante:true }),
    a:V('a'), e:V('e'), i:V('i'), o:V('o'), u:V('u'), y:V('y'), E:V('oe'), '@':V('@', 0, 120),
    'A~':V('an', 1, 190), 'O~':V('on', 1, 190), 'E~':V('in', 1, 190),
    _:{ v:'_', d:130, pause:true }
  };

  // ── 2. LES POSTURES ────────────────────────────────────────────────
  // m : ouverture de la mâchoire (0–1) ; r : lèvres arrondies ; s : lèvres
  // étirées ; c : lèvres fermées ; f : lèvre du bas sous les dents du haut ;
  // langue : pointe (tx,ty), lame (by, à x=90), dos (dx,dy), arrière (kx,ky).
  const P = (m, r, s, c, f, tx, ty, by, dx, dy, kx, ky) => ({ m, r, s, c, f, tx, ty, by, dx, dy, kx, ky });
  const POSTURES = {
    _:  P(.04, 0, 0, 1, 0, 68,103,  97, 115, 93, 146,112),
    a:  P(1,   0, .1,0, 0, 68,117, 115, 118,113, 148,123),
    e:  P(.55, 0, .45,0,0, 67,109,  97, 108, 88, 146,112),
    i:  P(.24, 0, .9, 0,0, 67,105,  89, 104, 79, 144,108),
    o:  P(.6,  .8, 0, 0,0, 76,113, 107, 128, 90, 150,108),
    u:  P(.28, 1,  0, 0,0, 80,110, 104, 132, 81, 152,100),
    y:  P(.24, 1,  0, 0,0, 67,105,  89, 104, 79, 144,108),
    oe: P(.5,  .7, 0, 0,0, 67,109,  97, 108, 88, 146,112),
    '@':P(.4,  0,  0, 0,0, 68,109, 101, 115, 95, 146,112),
    an: P(.9,  .2, 0, 0,0, 70,116, 113, 122,108, 150,118),
    on: P(.55, .85,0, 0,0, 76,113, 107, 128, 90, 150,108),
    'in':P(.7, 0, .5, 0,0, 67,112, 100, 110, 92, 146,114),
    p:  P(.04, 0,  0, 1,0, 68,103,  97, 115, 93, 146,112),
    f:  P(.12, 0,  0, 0,1, 68,104,  98, 115, 94, 146,112),
    t:  P(.14, 0,  .2,0,0, 65, 86,  88, 112, 92, 146,112),
    l:  P(.3,  0,  .1,0,0, 65, 86,  93, 112, 99, 146,114),
    s:  P(.06, 0,  .5,0,0, 66, 92,  90, 112, 90, 146,112),
    ch: P(.14, .65,0, 0,0, 73, 90,  81, 112, 84, 146,110),
    k:  P(.3,  0,  0, 0,0, 73,111, 102, 128, 77, 151, 96),
    r:  P(.35, 0,  0, 0,0, 71,111, 104, 135, 87, 153, 97),
    rr: P(.28, 0,  0, 0,0, 66, 88,  95, 112, 99, 146,114),
    th: P(.16, 0,  .2,0,0, 55,100,  96, 112, 94, 146,112),
    h:  P(.5,  0,  0, 0,0, 68,110, 102, 115, 96, 146,113),
    q:  P(.45, 0,  0, 0,0, 74,113, 107, 137, 96, 157,112)
  };
  const CLES = ['m','r','s','c','f','tx','ty','by','dx','dy','kx','ky','nez','voix'];
  function posture(son){
    const s = SONS[son] || SONS._;
    return Object.assign({}, POSTURES[s.v] || POSTURES._, { nez:s.nez ? 1 : 0, voix:s.voix ? 1 : 0 });
  }

  // ── 3. DE L'ÉCRIT AUX SONS ─────────────────────────────────────────
  // Règle : [motif (collé à la position), sons, condition]. Conditions :
  // 'D' début de mot, 'V' après une voyelle, 'L' mot de 4 lettres ou plus.
  const R = liste => liste.map(([m, s, c]) => [new RegExp('(?:' + m + ')', 'y'), s, c || '']);
  const VFR = '[aeiouyàâéèêëîïôöùûüœ]';
  const BASE = { a:'a','á':'a','à':'a','â':'a','ã':'a','å':'a','ā':'a', e:'e','é':'e','è':'e','ê':'e','ë':'e','ě':'e',
    i:'i','í':'i','ì':'i','î':'i','ï':'i', o:'o','ó':'o','ò':'o','ô':'o','õ':'o', u:'u','ú':'u','ù':'u','û':'u',
    'ü':'y','ö':'E','ä':'e', y:'i', b:'b', p:'p', m:'m', f:'f', v:'v', t:'t', d:'d', n:'n', l:'l', s:'s', z:'z',
    k:'k', g:'g', q:'k', c:'k', r:'r', h:'h', j:'j', w:'w', x:'k s', 'ñ':'n j', 'ç':'s', 'ß':'s' };
  const LATIN = {
    fr:{
      mots:{ le:'l @', de:'d @', je:'Z @', me:'m @', te:'t @', se:'s @', ne:'n @', ce:'s @', que:'k @',
        les:'l e', des:'d e', mes:'m e', tes:'t e', ses:'s e', ces:'s e', est:'e', et:'e', un:'E~', une:'y n',
        mon:'m O~', ton:'t O~', son:'s O~', bon:'b O~', non:'n O~', en:'A~', on:'O~', oui:'w i', eu:'y',
        tout:'t u', plus:'p l y', 'très':'t R e', merci:'m e R s i', monsieur:'m @ s j E', femme:'f a m',
        soif:'s w a f', cest:'s e', jai:'Z e', nez:'n e', chez:'S e', faim:'f E~', pain:'p E~', eau:'o', temps:'t A~', avc:'a v e s e', fils:'f i s',
        'œuf':'E f', sept:'s e t', mer:'m e R', hiver:'i v e R', avec:'a v e k', sac:'s a k', lit:'l i' },
      regles:R([
        ['eau|au','o'], ['où|oû|ou','u'], ['oin(?!' + VFR + ')','w E~'], ['oî|oi','w a'],
        ['(?:ain|ein|aim)(?!' + VFR + '|[nmh])','E~'],
        ['ien(?!' + VFR + '|[nm])','j E~'],
        ['(?:an|am|en|em)(?!' + VFR + '|[nmh])','A~'],
        ['(?:on|om)(?!' + VFR + '|[nmh])','O~'],
        ['(?:in|im|yn|ym|un|um)(?!' + VFR + '|[nmh])','E~'],
        ['œu|eu|œ','E'], ['eill?(?=e?s?$)|eil','e j'], ['aill|ail(?!' + VFR + ')','a j'],
        ['aî|ai|ei','e'], ['er$|ez$','e','L'],
        ['ch','S'], ['ph','f'], ['gn','n j'], ['qu|q','k'], ['gu(?=[eiyéèê])','g'], ['ge(?=[aoâô])','Z'],
        ['cc(?=[eiyéèê])','k s'], ['c(?=[eiyéèê])','s'], ['ç','s'], ['ck|c','k'],
        ['g(?=[eiyéèê])','Z'], ['j','Z'], ['ill(?=' + VFR + ')','j'], ['ti(?=on)','s j'],
        ['x$',''], ['x','k s'], ['h',''], ['y(?=' + VFR + ')','j'], ['y','i'],
        ['es?$','','L'], ['e$','@'], ['[tdsxzp]s?$','','L'],
        ['e(?=[bcdfgjklmnpqrstvxz]{2}|[bcdfgklmnpqrstvxz]$)','e'], ['e','@'],
        ['ss','s'], ['s(?=' + VFR + ')','z','V'], ['u|û|ù','y'], ['r','R'], ['w','v']
      ])
    },
    en:{
      mots:{ the:'D @', a:'@', i:'a i', you:'j u', to:'t u', 'do':'d u', of:'@ v', is:'i z', are:'a r',
        one:'w a n', two:'t u', water:'w o t @ r', please:'p l i z', thank:'T e N k', me:'m i', he:'h i',
        she:'S i', we:'w i', my:'m a i', no:'n o u', yes:'j e s', have:'h a v', what:'w o t', day:'d e i',
        bread:'b r e d', said:'s e d', door:'d o r', key:'k i', chair:'S e r', knife:'n a i f', clock:'k l o k',
        orange:'o r i n Z', cheese:'S i z', coffee:'k o f i', stroke:'s t r o u k', doctor:'d o k t @ r' },
      regles:R([
        ['tch|sh|ch','S'], ['th','T'], ['ph','f'], ['wh','w'], ['ck','k'], ['qu','k w'], ['ng','N'],
        ['igh','a i'], ['ee|ea','i'], ['oo','u'], ['ou|ow','a u'], ['ai|ay|ey','e i'], ['oi|oy','o i'], ['au|aw','o'],
        ['kn','n','D'], ['wr','r','D'], ['c(?=[eiy])','s'], ['j','Z'], ['y$','i'], ['y','j'], ['x','k s'],
        ['a(?=[bcdfgklmnprstvz]e$)','e i'], ['i(?=[bcdfgklmnprstvz]e$)','a i'], ['o(?=[bcdfgklmnprstvz]e$)','o u'],
        ['e$','','L'], ['u','@']
      ])
    },
    es:{ mots:{}, regles:R([['ch','S'], ['ll','j'], ['rr','r'], ['qu','k'], ['gu(?=[eiéí])','g'], ['c(?=[eiéí])','T'], ['z','T'],
        ['g(?=[eiéí])','q'], ['j','q'], ['h',''], ['v','b'], ['y$','i'], ['y','j'], ['ü','w']]) },
    it:{ mots:{}, regles:R([['gli','l j'], ['gn','n j'], ['sc(?=[ei])','S'], ['ch','k'], ['gh','g'], ['ci(?=[aou])|c(?=[ei])','S'],
        ['gi(?=[aou])|g(?=[ei])','Z'], ['qu','k w'], ['h',''], ['z','t s']]) },
    pt:{ mots:{}, regles:R([['nh','n j'], ['lh','l j'], ['ch','S'], ['qu(?=[eiéí])','k'], ['qu','k w'], ['gu(?=[eiéí])','g'],
        ['ão','A~ w'], ['ã','A~'], ['õ','O~'], ['(?:am|an|âm|ân)(?![aeiouáéíóúâêô])','A~'], ['(?:em|en|ém|ên)(?![aeiouáéíóúâêô])','E~'],
        ['(?:om|on|ôm)(?![aeiouáéíóúâêô])','O~'], ['(?:im|in|um|un)(?![aeiouáéíóúâêô])','E~'],
        ['c(?=[eiéí])','s'], ['g(?=[eiéí])','Z'], ['j','Z'], ['x','S'], ['h',''], ['ss','s'], ['s(?=[aeiouáéíóú])','z','V'], ['rr','R']]) },
    de:{ mots:{}, regles:R([['tsch|sch','S'], ['ch','q'], ['ck','k'], ['ph','f'], ['qu','k v'], ['ei|ai','a i'], ['eu|äu','o i'], ['ie','i'],
        ['au','a u'], ['sp','S p','D'], ['st','S t','D'], ['ss|ß','s'], ['s(?=[aeiouäöü])','z'], ['tz|z','t s'], ['v','f'], ['w','v'],
        ['er$','a','L'], ['h(?![aeiouäöüy])',''], ['e$','@','L'], ['r','R'], ['y','y']]) },
    tr:{ mots:{}, regles:R([['c','Z'], ['ç|ş','S'], ['ğ',''], ['ı','@'], ['j','Z'], ['y','j']]) },
    pl:{ mots:{}, regles:R([['ch','q'], ['cz|sz','S'], ['dzi(?=[aeouąę])|rz|dż|dź','Z'], ['dz','d z'], ['ż|ź','Z'], ['ś|ć','S'],
        ['ci(?=[aeouąę])','S'], ['si(?=[aeouąę])','S'], ['zi(?=[aeouąę])','Z'], ['ni(?=[aeouąę])|ń','n j'],
        ['ł','w'], ['ą','O~'], ['ę','E~'], ['ó','u'], ['w','v'], ['c','t s'], ['y','@']]) },
    kab:{ mots:{}, regles:R([['č','S'], ['ǧ','Z'], ['ɣ|γ','G'], ['ɛ','q'], ['ḥ','h'], ['ṭ','t'], ['ḍ','d'], ['ṣ','s'], ['ẓ','z'], ['ṛ','r'],
        ['c','S'], ['j','Z'], ['x|q','q'], ['y','j'], ['e','@']]) }
  };
  const CYR = { 'а':'a','е':'e','є':'j e','и':'i','і':'i','ї':'j i','о':'o','у':'u','ю':'j u','я':'j a','б':'b','п':'p','м':'m','в':'v','ф':'f',
    'т':'t','д':'d','н':'n','л':'l','с':'s','з':'z','ц':'t s','ш':'S','ж':'Z','ч':'S','щ':'S','к':'k','г':'h','ґ':'g','х':'q','р':'r','й':'j' };
  const ARA = { 'ا':'a','آ':'a','أ':'a','إ':'i','ى':'a','ة':'a','ؤ':'u','ئ':'i','ب':'b','پ':'p','م':'m','ف':'f','ڤ':'v','ت':'t','ط':'t','د':'d','ض':'d',
    'ن':'n','ث':'T','ذ':'D','ظ':'D','س':'s','ص':'s','ز':'z','ش':'S','ج':'Z','چ':'S','ك':'k','ک':'k','گ':'g','ڭ':'g','ق':'q','خ':'q','غ':'G','ع':'q',
    'ح':'h','ه':'h','ل':'l','ر':'r' };
  const HARAKAT = { '\u064E':'a', '\u064F':'u', '\u0650':'i', '\u064B':'a n', '\u064C':'u n', '\u064D':'i n' };
  const HG_I = ['g','k','n','d','t','l','m','b','p','s','s','','Z','S','S','k','t','p','h'];
  const HG_V = ['a','e','j a','j e','o','e','j o','j e','o','w a','w e','w e','j o','u','w o','w e','w i','j u','@','@ i','i'];
  const HG_F = ['','k','k','k','n','n','n','t','l','k','m','l','l','l','p','l','m','p','p','t','t','N','t','t','k','t','p','t'];
  const KANA = (function(){
    const t = {}, voy = ['a','i','u','e','o'];
    const rangs = [['あいうえお',''],['かきくけこ','k'],['がぎぐげご','g'],['さしすせそ','s'],['ざじずぜぞ','z'],['たちつてと','t'],['だぢづでど','d'],
      ['なにぬねの','n'],['はひふへほ','h'],['ばびぶべぼ','b'],['ぱぴぷぺぽ','p'],['まみむめも','m'],['らりるれろ','l']];
    for(const [ks, c] of rangs) [...ks].forEach((k, i) => { t[k] = (c ? c + ' ' : '') + voy[i]; });
    Object.assign(t, { 'し':'S i','じ':'Z i','ち':'S i','ぢ':'Z i','つ':'t s u','づ':'z u','ふ':'f u','や':'j a','ゆ':'j u','よ':'j o','わ':'w a','を':'o','ん':'n',
      'ゃ':'*a','ゅ':'*u','ょ':'*o','っ':'_','ー':'=' });
    return t;
  })();

  const estVoyelle = s => !!(SONS[s] && SONS[s].voyelle);

  function ecriture(txt){
    if(/[\u0600-\u06FF]/.test(txt)) return 'arabe';
    if(/[\uAC00-\uD7A3]/.test(txt)) return 'hangeul';
    if(/[\u4E00-\u9FFF\u2D30-\u2D7F]/.test(txt)) return null;          // kanji, tifinagh : pas de schéma
    if(/[\u3040-\u30FF]/.test(txt)) return 'kana';
    if(/[\u0400-\u04FF]/.test(txt)) return 'cyrillique';
    if(/[a-zA-Z\u00C0-\u024F\u1E00-\u1EFF]/.test(txt)) return 'latin';
    return null;
  }

  // Un mot → [{ son, de, a }] (positions dans le mot).
  function motLatin(mot, lang){
    const L = LATIN[lang] || { mots:{}, regles:[] };
    if(L.mots[mot]) return L.mots[mot].split(' ').map(s => ({ son:s, de:0, a:mot.length }));
    const out = []; let i = 0;
    while(i < mot.length){
      let pris = false;
      for(const [re, sons, cond] of L.regles){
        if(cond.includes('D') && i !== 0) continue;
        if(cond.includes('L') && mot.length < 4) continue;
        if(cond.includes('V') && !(out.length && estVoyelle(out[out.length - 1].son))) continue;
        re.lastIndex = i;
        const m = re.exec(mot);
        if(!m || !m[0]) continue;
        for(const s of (sons ? sons.split(' ') : [])) out.push({ son:s, de:i, a:i + m[0].length });
        i += m[0].length; pris = true; break;
      }
      if(pris) continue;
      const b = BASE[mot[i]];
      if(b) for(const s of b.split(' ')) out.push({ son:s, de:i, a:i + 1 });
      i++;
    }
    return out;
  }
  function motTable(mot, table){
    const out = [];
    [...mot].forEach((ch, i) => { const b = table[ch]; if(b) for(const s of b.split(' ')) out.push({ son:s, de:i, a:i + 1 }); });
    return out;
  }
  function motArabe(mot){
    const out = [], L = [...mot];
    const cons = ch => ARA[ch] && !estVoyelle(ARA[ch]);
    for(let i = 0; i < L.length; i++){
      const ch = L[i], suiv = L[i + 1];
      if(HARAKAT[ch]){ for(const s of HARAKAT[ch].split(' ')) out.push({ son:s, de:i, a:i + 1 }); continue; }
      if(ch === 'و' || ch === 'ي'){
        const voy = ch === 'و' ? 'u' : 'i', gl = ch === 'و' ? 'w' : 'j';
        const avant = out.length ? out[out.length - 1].son : null;
        out.push({ son:(i === 0 || (avant && estVoyelle(avant)) || suiv === 'ا') ? gl : voy, de:i, a:i + 1 });
        continue;
      }
      const b = ARA[ch]; if(!b) continue;
      if(estVoyelle(b) && out.length && out[out.length - 1].son === b) continue;   // fatha + alif : une seule voyelle
      out.push({ son:b, de:i, a:i + 1 });
      // Voyelles brèves non écrites : une ouverture neutre entre deux consonnes.
      if(cons(ch) && suiv && cons(suiv)) out.push({ son:'@', de:i, a:i + 1 });
    }
    return out;
  }
  function motHangeul(mot){
    const out = [];
    [...mot].forEach((ch, i) => {
      const c = ch.codePointAt(0) - 0xAC00;
      if(c < 0 || c > 11171) return;
      const sons = [HG_I[Math.floor(c / 588)], HG_V[Math.floor((c % 588) / 28)], HG_F[c % 28]].filter(Boolean).join(' ');
      for(const s of sons.split(' ')) out.push({ son:s, de:i, a:i + 1 });
    });
    return out;
  }
  function motKana(mot){
    const out = [];
    [...mot].forEach((ch0, i) => {
      const code = ch0.codePointAt(0);
      const ch = (code >= 0x30A1 && code <= 0x30F6) ? String.fromCodePoint(code - 0x60) : ch0;   // katakana → hiragana
      const b = KANA[ch]; if(!b) return;
      const dernier = out[out.length - 1];
      if(b === '='){ if(dernier && estVoyelle(dernier.son)) out.push({ son:dernier.son, de:i, a:i + 1 }); return; }
      if(b[0] === '*'){                                  // きゃ : k i + ゃ → k j a
        if(dernier && dernier.son === 'i'){ dernier.son = 'j'; }
        out.push({ son:b.slice(1), de:i, a:i + 1 }); return;
      }
      for(const s of b.split(' ')) out.push({ son:s, de:i, a:i + 1 });
    });
    return out;
  }

  // Texte → suite de sons avec durées. null : écriture non prise en charge.
  function sequence(texte, lang){
    const brut = String(texte || '');
    const sys = ecriture(brut);
    if(!sys) return null;
    const txt = brut.toLowerCase();
    const seq = [];
    const re = /[\p{L}\p{M}']+/gu; let m, fin = 0;
    while((m = re.exec(txt))){
      if(seq.length) seq.push({ son:'_', de:fin, a:m.index, d:/[.,;:!?،。、؟]/.test(txt.slice(fin, m.index)) ? 260 : 70 });
      const mot = m[0].replace(/'/g, '');
      const sons = sys === 'latin' ? motLatin(mot, lang) : sys === 'cyrillique' ? motTable(mot, CYR)
        : sys === 'arabe' ? motArabe(mot) : sys === 'hangeul' ? motHangeul(mot) : motKana(mot);
      let prec = null;
      for(const s of sons){
        if(!SONS[s.son]) continue;
        if(prec && prec.son === s.son && !estVoyelle(s.son)){ prec.a = m.index + s.a; continue; }   // consonne doublée
        prec = { son:s.son, de:m.index + s.de, a:m.index + s.a, d:SONS[s.son].d };
        seq.push(prec);
      }
      fin = m.index + m[0].length;
    }
    while(seq.length && seq[seq.length - 1].son === '_') seq.pop();
    if(!seq.some(s => s.son !== '_')) return null;
    let t = 0; for(const s of seq){ s.t = t; t += s.d; }
    seq.duree = t;
    return seq;
  }

  // ── 4. L'ANIMATION ────────────────────────────────────────────────
  const sobre = () => { try{ return window.matchMedia('(prefers-reduced-motion: reduce)').matches; }catch(e){ return false; } };
  const repos = () => posture('_');
  const etat = { pose:repos(), seq:null, i:-1, raf:0, horloge:null, t0:0, echelle:1, abonnes:new Set(), dernier:0, lent:false, texte:'' };

  function publier(){ etat.abonnes.forEach(fn => { try{ fn(etat.pose, etat.i, etat.seq); }catch(e){} }); }
  function image(maintenant){
    etat.raf = 0;
    if(!etat.seq) return;
    const t = (etat.horloge ? etat.horloge() : (maintenant - etat.t0)) / etat.echelle;
    if(t >= etat.seq.duree + 120){ arreter(); return; }
    let i = etat.seq.length - 1;
    while(i > 0 && etat.seq[i].t > t) i--;
    etat.i = t >= etat.seq.duree ? -1 : i;
    const cible = etat.i < 0 ? repos() : posture(etat.seq[i].son);
    const dt = Math.min(80, maintenant - (etat.dernier || maintenant)); etat.dernier = maintenant;
    const k = sobre() ? 1 : 1 - Math.exp(-dt / 42);
    for(const c of CLES) etat.pose[c] += (cible[c] - etat.pose[c]) * k;
    publier();
    etat.raf = requestAnimationFrame(image);
  }
  // opts.duree : durée réelle de la parole (ms) ; opts.horloge : temps écoulé (ms).
  function demarrer(seq, opts){
    if(!seq) return;
    opts = opts || {};
    if(etat.raf) cancelAnimationFrame(etat.raf);
    etat.seq = seq; etat.i = -1; etat.horloge = opts.horloge || null; etat.dernier = 0;
    etat.echelle = (opts.duree && seq.duree) ? Math.max(.4, Math.min(4, opts.duree / seq.duree)) : (opts.echelle || 1);
    etat.t0 = performance.now();
    etat.raf = requestAnimationFrame(image);
  }
  function caler(indexCaractere){            // la synthèse annonce le mot qu'elle commence
    if(!etat.seq || etat.horloge) return;
    const s = etat.seq.find(x => x.de >= indexCaractere && x.son !== '_');
    if(s) etat.t0 = performance.now() - s.t * etat.echelle;
  }
  function arreter(){
    if(etat.raf) cancelAnimationFrame(etat.raf);
    etat.raf = 0; etat.seq = null; etat.i = -1; etat.horloge = null;
    etat.pose = repos(); publier();
  }

  // ── 5. LA PAROLE DE L'APPLICATION ─────────────────────────────────
  // On écoute les deux voix de speak() (js/app.js) sans y toucher : la
  // synthèse du navigateur et les fichiers audio/. L'original est
  // TOUJOURS appelé ; une erreur ici ne coupe jamais la voix.
  const langue = () => (window.Prefs && Prefs.data && Prefs.data.lang) || 'fr';
  function brancher(){
    if(brancher.fait) return; brancher.fait = true;
    const parler = window.speak;
    if(typeof parler === 'function'){
      window.speak = function(texte){ etat.texte = String(texte || ''); etat.texteA = Date.now(); return parler.apply(this, arguments); };
    }
    const synth = window.speechSynthesis;
    if(synth && typeof synth.speak === 'function'){
      const dire = synth.speak.bind(synth);
      synth.speak = function(u){
        try{
          if(etat.lent) u.rate = .55;
          const seq = sequence(u.text, langue());
          if(seq){
            const debit = u.rate || 1;
            u.addEventListener('start', () => demarrer(seq, { echelle:1.05 / debit }));
            u.addEventListener('boundary', ev => { if(ev.name !== 'sentence') caler(ev.charIndex || 0); });
            u.addEventListener('end', arreter); u.addEventListener('error', arreter);
          }
        }catch(e){}
        return dire(u);
      };
    }
    const proto = window.HTMLMediaElement && HTMLMediaElement.prototype;
    if(proto && typeof proto.play === 'function'){
      const jouer = proto.play;
      proto.play = function(){
        try{
          const src = this.currentSrc || this.src || '';
          // Le texte ne vaut que pour la parole qui vient d'être demandée.
          if(/\/audio\//.test(src) && etat.texte && Date.now() - etat.texteA < 6000 && !this.__articule){
            this.__articule = true;
            const el = this, seq = sequence(etat.texte, langue());
            etat.texte = '';
            if(etat.lent){ try{ el.preservesPitch = true; el.playbackRate = .65; }catch(e){} }
            if(seq){
              el.addEventListener('playing', () => demarrer(seq, {
                duree:isFinite(el.duration) && el.duration > 0 ? el.duration * 1000 : 0,
                horloge:() => el.currentTime * 1000 }));
              ['ended', 'pause', 'error'].forEach(ev => el.addEventListener(ev, arreter));
            }
          }
        }catch(e){}
        return jouer.apply(this, arguments);
      };
    }
  }

  // ── 6. LE BEC D'AMI ───────────────────────────────────────────────
  // Le bec d'origine (.companion-beak) reste dans la page ; pendant la
  // parole il est masqué et remplacé par un bec en deux parties.
  const NS = 'http://www.w3.org/2000/svg';
  function bec(pose, i){
    const parle = i >= 0 || (etat.seq && pose.m > .08);
    document.querySelectorAll('svg.companion-svg').forEach(svg => {
      const origine = svg.querySelector('.companion-beak'); if(!origine) return;
      let g = svg.querySelector('.ami-bec');
      if(!parle || sobre()){ if(g){ g.remove(); origine.style.visibility = ''; } return; }
      if(!g){
        g = document.createElementNS(NS, 'g'); g.setAttribute('class', 'ami-bec');
        g.innerHTML = '<ellipse class="ami-bec-fond" cx="50" cy="55.5" rx="3.6" ry="0" fill="#5b2a22"/>' +
          '<path class="ami-bec-bas" d="M45.6 55 Q50 61.5 54.4 55 Q50 57.2 45.6 55 Z" fill="#d98a2b" stroke="#a8641a" stroke-width=".5" stroke-linejoin="round"/>' +
          '<path class="ami-bec-haut" d="M50 49.6 L44.6 55 Q50 57.6 55.4 55 Z" fill="#f0a63c" stroke="#a8641a" stroke-width=".5" stroke-linejoin="round"/>';
        origine.parentNode.insertBefore(g, origine.nextSibling);
        origine.style.visibility = 'hidden';
      }
      const ouvert = Math.max(0, pose.m * (1 - pose.c)), large = 1 - .28 * pose.r + .14 * pose.s;
      g.setAttribute('transform', 'translate(50 0) scale(' + large.toFixed(3) + ' 1) translate(-50 0)');
      g.querySelector('.ami-bec-bas').setAttribute('transform', 'translate(0 ' + (ouvert * 7).toFixed(2) + ')');
      const fond = g.querySelector('.ami-bec-fond');
      fond.setAttribute('ry', (ouvert * 4.4).toFixed(2)); fond.setAttribute('cy', (55.5 + ouvert * 3.2).toFixed(2));
    });
  }

  // ── 7. LA BOUCHE VUE DE PROFIL ────────────────────────────────────
  function courbe(pts){               // spline fermée passant par les points
    const n = pts.length; let d = 'M' + pts[0][0].toFixed(1) + ' ' + pts[0][1].toFixed(1);
    for(let i = 0; i < n; i++){
      const p0 = pts[(i - 1 + n) % n], p1 = pts[i], p2 = pts[(i + 1) % n], p3 = pts[(i + 2) % n];
      d += ' C' + (p1[0] + (p2[0] - p0[0]) / 6).toFixed(1) + ' ' + (p1[1] + (p2[1] - p0[1]) / 6).toFixed(1) + ' ' +
        (p2[0] - (p3[0] - p1[0]) / 6).toFixed(1) + ' ' + (p2[1] - (p3[1] - p1[1]) / 6).toFixed(1) + ' ' + p2[0].toFixed(1) + ' ' + p2[1].toFixed(1);
    }
    return d + 'Z';
  }
  const SCHEMA = '<svg class="art-schema" viewBox="16 36 150 134" role="img" aria-hidden="true" focusable="false">' +
    '<path class="art-peau" d="M150 8 C92 4 50 22 44 54 L27 75 Q24 82 35 82 L45 83 L58 90 Q64 76 80 73 Q106 66 132 78 L160 84 L160 8 Z"/>' +
    '<path class="art-nez" d="M46 71 Q100 55 160 66"/>' +
    '<path class="art-air" d="M40 77 Q100 62 156 74"/>' +
    '<path class="art-gorge" d="M160 20 L160 172"/>' +
    '<g class="art-machoire"><path class="art-peau" d="M46 106 Q39 120 50 134 Q70 152 112 154 L160 160 L160 150 Q120 150 110 140 L64 112 Z"/>' +
      '<path class="art-dent" d="M60 100 L64.5 101 L64 113 L60 112 Z"/><path class="art-levre art-levre-bas" d=""/></g>' +
    '<path class="art-langue" d=""/>' +
    '<path class="art-palais" d="M58 89 Q63 77 80 73 Q106 66 132 78"/>' +
    '<path class="art-dent" d="M58 88 L62.5 88 L62 101 L58.5 100 Z"/>' +
    '<path class="art-voile" d=""/>' +
    '<path class="art-levre art-levre-haut" d=""/>' +
    '<g class="art-vibre"><path d="M132 160 q3 -4 6 0 t6 0 t6 0"/><path d="M132 166 q3 -4 6 0 t6 0 t6 0"/></g>' +
    '</svg>';
  function dessiner(svg, p){
    const q = s => svg.querySelector(s);
    const angle = p.m * 8.5;                               // la mâchoire pivote près de l'oreille
    q('.art-machoire').setAttribute('transform', 'rotate(' + (-angle).toFixed(2) + ' 168 92)');
    const bas = p.m * 15;                                  // descente du plancher, à l'avant
    const av = 5 * p.r - 1.5 * p.s;                        // lèvres avancées (arrondies) ou étirées
    const fermeH = 2.2 * p.c, fermeB = 3.2 * p.c;
    q('.art-levre-haut').setAttribute('d', 'M45 83 Q' + (38 - av) + ' 88 ' + (44 - av) + ' ' + (95.5 + fermeH) +
      ' Q51 ' + (98 + fermeH) + ' 57.5 ' + (93 + fermeH * .4) + ' L57 87 Z');
    const dx = 7.5 * p.f, dy = -4 * p.f - fermeB;
    q('.art-levre-bas').setAttribute('d', 'M46 123 Q' + (38 - av + dx * .4) + ' 112 ' + (44 - av + dx) + ' ' + (103 + dy) +
      ' Q' + (51 + dx) + ' ' + (99.5 + dy) + ' ' + (58 + dx * .5) + ' ' + (104 + dy * .5) + ' L58 114 Z');
    q('.art-langue').setAttribute('d', courbe([[152, 152 + bas * .5], [p.kx, p.ky], [p.dx, p.dy], [90, p.by], [p.tx, p.ty],
      [p.tx + 11, p.ty + 11 + bas * .3], [94, 127 + bas * .8], [126, 147 + bas * .7]]));
    const n = p.nez;                                       // voile levé (bouche) ou baissé (nez)
    q('.art-voile').setAttribute('d', 'M132 78 Q' + (147 - 2 * n) + ' ' + (79 + 7 * n) + ' ' + (157 - 8 * n) + ' ' + (91 + 15 * n));
    q('.art-air').style.opacity = (n * .9).toFixed(2);
    q('.art-vibre').style.opacity = (p.voix * .95).toFixed(2);
  }
  function styles(){
    if(document.getElementById('art-css')) return;
    const st = document.createElement('style'); st.id = 'art-css';
    st.textContent = `.art-schema{width:100%;max-width:230px;height:auto;display:block}
.art-peau{fill:#f6dcc6;stroke:#b98a6a;stroke-width:1.4;stroke-linejoin:round}
.art-nez{fill:none;stroke:#b98a6a;stroke-width:1;stroke-dasharray:3 3}
.art-air{fill:none;stroke:#2a8fd6;stroke-width:3.2;stroke-linecap:round;stroke-dasharray:1 7;opacity:0}
.art-gorge{fill:none;stroke:#b98a6a;stroke-width:2.4;stroke-linecap:round}
.art-palais{fill:none;stroke:#8f5d43;stroke-width:3.2;stroke-linecap:round}
.art-voile{fill:none;stroke:#c9766c;stroke-width:6;stroke-linecap:round}
.art-dent{fill:#fff;stroke:#9c9c9c;stroke-width:.9;stroke-linejoin:round}
.art-levre{fill:#d9766f;stroke:#a84f49;stroke-width:1;stroke-linejoin:round}
.art-langue{fill:#ee8f8a;stroke:#b8514c;stroke-width:1.4}
.art-vibre{opacity:0}.art-vibre path{fill:none;stroke:#e2a03f;stroke-width:2.2;stroke-linecap:round}
body.dark-mode .art-peau{fill:#5d4a3d;stroke:#c9a184}body.dark-mode .art-dent{fill:#e9e9e9}
.art-fond{position:fixed;inset:0;background:rgba(10,30,25,.55);z-index:900;display:flex;align-items:center;justify-content:center;padding:14px}
.art-boite{background:var(--surface,#fff);color:var(--ink,#222);border-radius:20px;padding:18px;max-width:560px;width:100%;max-height:94vh;overflow:auto;box-shadow:0 12px 40px rgba(0,0,0,.3);text-align:center}
.art-boite h3{margin:0 0 4px;font-size:1.15rem}
.art-duo{display:flex;gap:12px;align-items:center;justify-content:center;flex-wrap:wrap;margin:8px 0}
.art-ami{width:140px;flex:0 0 auto}.art-ami svg{width:140px;height:auto;display:block;overflow:hidden;animation:none!important}
.art-mot{font-size:1.9rem;font-weight:700;margin:6px 0 2px;line-height:1.3;word-break:break-word}
.art-mot span{border-radius:6px;padding:0 1px;transition:background .08s}
.art-mot .art-ici{background:var(--warm,#e2a03f);color:#fff}
.art-legende{display:flex;gap:14px;justify-content:center;flex-wrap:wrap;font-size:.9rem;color:var(--ink-soft,#666);min-height:1.6em}
.art-legende span{opacity:.3;transition:opacity .1s}.art-legende span.art-oui{opacity:1;font-weight:600;color:var(--ink,#222)}
.art-actions{display:flex;gap:10px;flex-wrap:wrap;justify-content:center;margin-top:12px}
.art-actions button{flex:1 1 130px}
.art-note{font-size:.8rem;color:var(--ink-soft,#666);margin:10px 0 0}
.art-btn{margin-top:10px}`;
    document.head.appendChild(st);
  }

  // ── 8. « VOIR LA BOUCHE » ─────────────────────────────────────────
  const a = k => { const t = (window.I18N_STRINGS || {})[langue()]; return !!t && t[k] !== undefined; };
  const tr = k => a(k) ? I18N.t(k) : '';
  const esc = s => String(s == null ? '' : s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  let ouvert = null;

  function fermer(){
    if(!ouvert) return;
    etat.abonnes.delete(ouvert.maj); etat.lent = false;
    try{ window.speechSynthesis && speechSynthesis.cancel(); }catch(e){}
    arreter(); ouvert.fond.remove();
    if(ouvert.retour && ouvert.retour.focus) ouvert.retour.focus();
    ouvert = null;
  }
  function dire(lent){
    if(!ouvert) return;
    etat.lent = !!lent;
    if(typeof window.speak === 'function') window.speak(ouvert.mot);
    // Sans voix pour cette langue : le schéma se déroule quand même.
    setTimeout(() => { if(ouvert && !etat.seq) demarrer(sequence(ouvert.mot, langue()), { echelle:lent ? 2.2 : 1.3 }); }, 900);
  }
  function montrer(mot, declencheur){
    const seq = sequence(mot, langue());
    if(!seq || !a('ou_bouche_titre')) return;
    fermer(); styles();
    const fond = document.createElement('div'); fond.className = 'art-fond';
    fond.setAttribute('role', 'dialog'); fond.setAttribute('aria-modal', 'true'); fond.setAttribute('aria-label', tr('ou_bouche_titre'));
    const lettres = [...String(mot)].map(ch => '<span>' + esc(ch) + '</span>').join('');
    fond.innerHTML = '<div class="art-boite"><h3>' + esc(tr('ou_bouche_titre')) + '</h3>' +
      '<div class="art-mot" dir="auto">' + lettres + '</div>' +
      '<div class="art-duo"><div class="art-ami"></div><div>' + SCHEMA + '</div></div>' +
      '<div class="art-legende"><span class="art-l-nez">👃 ' + esc(tr('ou_nez')) + '</span><span class="art-l-voix">〰️ ' + esc(tr('ou_voix')) + '</span></div>' +
      '<div class="art-actions"><button type="button" class="btn-primary" data-art="normal">▶ ' + esc(tr('ou_normal')) + '</button>' +
      '<button type="button" class="btn-primary" data-art="lent">🐢 ' + esc(tr('ou_lent')) + '</button>' +
      '<button type="button" class="btn-ghost" data-art="fermer">' + esc(tr('ou_fermer')) + '</button></div>' +
      '<p class="art-note">' + esc(tr('ou_schema_note')) + '</p></div>';
    document.body.appendChild(fond);
    // Ami en gros plan (son visage), pour que le bec se voie.
    const ami = fond.querySelector('.art-ami');
    try{
      if(window.Companion && Companion.svg){
        ami.innerHTML = Companion.svg('speaking', { pose:'neutral' });
        const svg = ami.querySelector('svg'); if(svg){ svg.setAttribute('viewBox', '17 0 66 70'); svg.removeAttribute('width'); svg.removeAttribute('height'); }
      }
    }catch(e){ ami.remove(); }
    const schema = fond.querySelector('.art-schema'), spans = fond.querySelectorAll('.art-mot span');
    const lNez = fond.querySelector('.art-l-nez'), lVoix = fond.querySelector('.art-l-voix');
    // Les positions de la suite sont en unités UTF-16 ; les lettres affichées, en caractères.
    const debuts = []; let pos = 0; for(const ch of String(mot)){ debuts.push(pos); pos += ch.length; }
    const maj = (pose, i, s) => {
      dessiner(schema, pose);
      const cur = (s && i >= 0) ? s[i] : null;
      spans.forEach((sp, k) => sp.classList.toggle('art-ici', !!cur && cur.son !== '_' && debuts[k] >= cur.de && debuts[k] < cur.a));
      lNez.classList.toggle('art-oui', pose.nez > .5); lVoix.classList.toggle('art-oui', !!cur && pose.voix > .5);
    };
    etat.abonnes.add(maj); maj(etat.pose, -1, null);
    ouvert = { fond, mot:String(mot), maj, retour:declencheur || null };
    fond.addEventListener('click', ev => {
      const b = ev.target.closest('[data-art]');
      if(ev.target === fond || (b && b.dataset.art === 'fermer')) return fermer();
      if(b) dire(b.dataset.art === 'lent');
    });
    fond.addEventListener('keydown', ev => { if(ev.key === 'Escape') fermer(); });
    const premier = fond.querySelector('[data-art="normal"]'); if(premier) premier.focus();
    dire(false);
  }
  // Bouton à poser à côté d'un « Écouter ». Rien si la langue ou le mot ne s'y prête pas.
  function bouton(mot){
    if(!a('ou_bouche_btn') || !sequence(mot, langue())) return '';
    return '<button type="button" class="btn-ghost art-btn" data-bouche="' + esc(mot) + '">👄 ' + esc(tr('ou_bouche_btn')) + '</button>';
  }

  // v6.453 — PRÉCHARGER LA VRAIE VOIX. Au premier « Écouter », le fichier
  // audio partait du réseau ; s'il mettait plus de 2,5 s, speak() parlait
  // en voix de robot (filet de sécurité, js/app.js). On le demande dès que
  // la phrase s'affiche : le service worker le garde, et le clic trouve
  // la vraie voix tout de suite. Rien si le téléphone économise les
  // données ; 400 fichiers au plus par visite.
  // Dans le jeu, les voix viennent de reparole.fr (js/jeu.js, precharger) :
  // ce préchargement de ReParole (chemins audio/ locaux) n'a pas lieu ici.
  function precharger(){ /* rien dans Ami des mots */ }
  function prechargerBoutons(racine){
    (racine || document).querySelectorAll('.speak-btn[onclick]').forEach(b => {
      const m = /^speak\((.*)\)$/s.exec(b.getAttribute('onclick') || '');
      if(!m) return;
      try{ const a = m[1].trim(); if(a[0] === '"') precharger(JSON.parse(a)); }catch(e){}
    });
  }

  // Exercices de répétition : le bouton rejoint « Écouter » dès que la
  // question s'affiche (on observe l'écran, sans toucher à js/app.js).
  function surveiller(){
    const corps = document.getElementById('ex-body');
    if(!corps || surveiller.fait) return; surveiller.fait = true;
    const poser = () => {
      prechargerBoutons(corps);
      const ecoute = corps.querySelector('.prompt-card > .speak-btn'), mot = corps.querySelector('.prompt-card > .prompt-main');
      if(!ecoute || !mot || !corps.querySelector('#mic') || corps.querySelector('.art-btn')) return;
      const html = bouton(mot.textContent.trim()); if(!html) return;
      ecoute.insertAdjacentHTML('afterend', ' ' + html);
    };
    new MutationObserver(poser).observe(corps, { childList:true });
    poser();
  }

  function init(){
    styles(); brancher();
    etat.abonnes.add(bec);
    if(!init.clic){
      init.clic = true;
      document.addEventListener('click', ev => {
        const b = ev.target.closest && ev.target.closest('[data-bouche]');
        if(b) montrer(b.dataset.bouche, b);
      });
    }
    surveiller();
  }

  window.Articulation = { precharger, sequence, posture, demarrer, arreter, montrer, fermer, bouton, init, dessiner, SCHEMA, _etat:etat, _ecriture:ecriture };
  if(typeof document !== 'undefined' && document.body) init();
})();
