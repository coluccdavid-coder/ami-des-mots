// Ami des mots — le professeur hibou animé comme un dessin animé (v5.70).
// Le hibou est un SVG « articulé » : corps, tête, ailes, paupières, pupilles, sourcils, bec. Ce fichier le fait vivre :
//  · au repos : il respire, cligne des yeux, suit le pointeur du regard, remue les aigrettes ;
//  · quand il parle : le bec bouge avec la voix (mots prononcés), une bulle affiche la phrase ;
//  · réactions : bonjour (il salue), réfléchit (aile au menton), bravo (saut, ailes en l'air, yeux rieurs, étoiles),
//    erreur (il secoue la tête, un sourcil levé, « hmm »), chatouilles quand on le touche.
// Un petit hibou identique suit la leçon dans un coin quand le grand n'est plus à l'écran.
// La voix : celle de l'appareil, coupable avec 🔊/🔇 (gardé sur l'appareil). Rien n'est envoyé.
(function(){
  'use strict';
  const reduit = (() => { try{ return matchMedia('(prefers-reduced-motion: reduce)').matches; }catch(e){ return false; } })();

  // ── Le dessin (réutilisé pour le grand et le petit hibou) ──
  function svgHibou(id){
    const u = s => s + '-' + id;
    return '<svg class="owl-svg hibou-anime" viewBox="0 0 260 270" role="img" aria-label="Ami le hibou, ton professeur">' +
    '<defs><linearGradient id="' + u('pl') + '" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#f6bd70"/><stop offset=".55" stop-color="#b96c43"/><stop offset="1" stop-color="#70402f"/></linearGradient>' +
    '<radialGradient id="' + u('ve') + '"><stop stop-color="#fff1cf"/><stop offset="1" stop-color="#dfb98a"/></radialGradient>' +
    '<linearGradient id="' + u('ai') + '" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#d88b50"/><stop offset="1" stop-color="#7d4937"/></linearGradient>' +
    '<filter id="' + u('om') + '"><feGaussianBlur stdDeviation="7"/></filter>' +
    '<clipPath id="' + u('og') + '"><ellipse cx="99" cy="111" rx="33" ry="37"/></clipPath><clipPath id="' + u('od') + '"><ellipse cx="161" cy="111" rx="33" ry="37"/></clipPath></defs>' +
    '<ellipse class="h-ombre" cx="130" cy="246" rx="75" ry="12" fill="#15143b" opacity=".28" filter="url(#' + u('om') + ')"/>' +
    '<g class="h-tout">' +
      '<path d="M91 222 L84 245 L111 245 L119 226 M141 226 L149 245 L176 245 L169 222" fill="#f2a83e" stroke="#a55e2d" stroke-width="4" stroke-linejoin="round"/>' +
      '<g class="h-aile h-aile-g"><path d="M58 126 Q22 125 25 187 Q42 213 77 196Z" fill="url(#' + u('ai') + ')" stroke="#693d31" stroke-width="4"/></g>' +
      '<g class="h-aile h-aile-d"><path d="M202 126 Q238 125 235 187 Q218 213 183 196Z" fill="url(#' + u('ai') + ')" stroke="#693d31" stroke-width="4"/></g>' +
      '<g class="h-corps">' +
        '<path d="M65 78 Q36 30 80 48 L104 65 Q130 46 156 65 L184 45 Q220 34 196 88 L204 175 Q196 227 130 232 Q64 227 56 175Z" fill="url(#' + u('pl') + ')" stroke="#693d31" stroke-width="5"/>' +
        '<path d="M72 155 Q82 102 130 105 Q178 102 188 155 Q180 220 130 221 Q80 220 72 155Z" fill="url(#' + u('ve') + ')"/>' +
        '<path class="h-sourire" d="M104 187 Q130 202 156 187" fill="none" stroke="#c58b5a" stroke-width="4" stroke-linecap="round"/>' +
        '<g class="h-tete">' +
          '<g class="h-aigrette h-aigrette-g"><path d="M75 61 L69 20 Q98 31 112 57" fill="#bd7449" stroke="#70412f" stroke-width="4"/></g>' +
          '<g class="h-aigrette h-aigrette-d"><path d="M185 60 L193 20 Q164 31 148 57" fill="#bd7449" stroke="#70412f" stroke-width="4"/></g>' +
          '<g class="h-yeux">' +
            '<g fill="#fff8e9" stroke="#70412f" stroke-width="4"><ellipse cx="99" cy="111" rx="35" ry="39"/><ellipse cx="161" cy="111" rx="35" ry="39"/></g>' +
            '<g class="h-pupilles"><g fill="#25304e"><ellipse cx="105" cy="116" rx="13" ry="18"/><ellipse cx="155" cy="116" rx="13" ry="18"/></g>' +
              '<g fill="#fff"><circle cx="110" cy="108" r="5"/><circle cx="160" cy="108" r="5"/><circle cx="101" cy="124" r="2.2"/><circle cx="151" cy="124" r="2.2"/></g></g>' +
            // Paupières : un rideau de plumes qui descend, découpé à la forme de l'œil.
            '<g clip-path="url(#' + u('og') + ')"><rect class="h-paupiere" x="60" y="70" width="80" height="84" fill="#c98250"/></g>' +
            '<g clip-path="url(#' + u('od') + ')"><rect class="h-paupiere" x="122" y="70" width="80" height="84" fill="#c98250"/></g>' +
            // Yeux rieurs (bravo) : deux arcs « ^ ^ ».
            '<g class="h-rieurs" fill="none" stroke="#25304e" stroke-width="7" stroke-linecap="round"><path d="M80 118 Q99 92 118 118"/><path d="M142 118 Q161 92 180 118"/></g>' +
          '</g>' +
          '<g class="h-sourcil h-sourcil-g"><path d="M72 66 Q98 52 122 66" fill="none" stroke="#5a3226" stroke-width="7" stroke-linecap="round"/></g>' +
          '<g class="h-sourcil h-sourcil-d"><path d="M138 66 Q162 52 188 66" fill="none" stroke="#5a3226" stroke-width="7" stroke-linecap="round"/></g>' +
          '<g class="h-bec"><ellipse class="h-bouche" cx="130" cy="156" rx="9" ry="9" fill="#5b1f2b"/>' +
            '<path class="h-bec-bas" d="M121 152 L139 152 L130 168Z" fill="#e0912e" stroke="#9a5b2d" stroke-width="3" stroke-linejoin="round"/>' +
            '<path class="h-bec-haut" d="M117 143 L143 143 L130 160Z" fill="#f2a83e" stroke="#9a5b2d" stroke-width="3" stroke-linejoin="round"/></g>' +
        '</g>' +
      '</g>' +
      // L'aile qui salue (levée à droite), comme sur le dessin d'origine.
      '<g class="h-salut"><path d="M182 80 Q215 59 223 96 Q222 122 196 139" fill="#d98d52" stroke="#70412f" stroke-width="4"/><path d="M190 95 Q211 86 215 102" fill="none" stroke="#f7d7a7" stroke-width="5" stroke-linecap="round"/></g>' +
    '</g>' +
    '<g class="h-etoiles" fill="#ffd36b"><path d="M40 40 l5 12 13 1 -10 8 3 13 -11 -7 -11 7 3 -13 -10 -8 13 -1z"/><path d="M215 30 l4 9 10 1 -8 6 3 10 -9 -5 -9 5 3 -10 -8 -6 10 -1z"/><path d="M228 150 l3 7 8 1 -6 5 2 8 -7 -4 -7 4 2 -8 -6 -5 8 -1z"/></g>' +
    '<g class="h-hmm"><text x="200" y="40" font-size="34" font-weight="900" fill="#fff">?</text></g>' +
    '</svg>';
  }

  // ── Voix (celle de l'appareil) ──
  const CLE_VOIX = 'ami-prof-voix';
  let voixOn = (() => { try{ return localStorage.getItem(CLE_VOIX) !== '0'; }catch(e){ return true; } })();
  function noteVoix(v){ const n = v.name || ''; let p = 0;
    if(/natural|online|neural/i.test(n)) p += 100; if(/premium|enhanced|siri/i.test(n)) p += 80; if(/google/i.test(n)) p += 60; if(/^fr-FR/i.test(v.lang)) p += 20;
    if(/espeak|hortense|julie|paul|compact/i.test(n)) p -= 60; return p; }
  function voixFr(){ if(!window.speechSynthesis) return null; return speechSynthesis.getVoices().filter(v => /^fr/i.test(v.lang)).sort((a, b) => noteVoix(b) - noteVoix(a))[0] || null; }
  const sansEmojis = t => String(t || '').replace(/[\p{Extended_Pictographic}\u{1F1E6}-\u{1F1FF}️‍⃣]/gu, '').replace(/[«»"“”]/g, '').replace(/\s{2,}/g, ' ').trim();

  // ── Le contrôleur ──
  const hiboux = [];           // { racine, svg, bulle }
  let numeroEtat = 0, etat = 'repos', parle = false, ouverture = 0, cibleOuv = 0, regardX = 0, regardY = 0, cibleX = 0, cibleY = 0, minuteurBulle = 0;
  const tous = sel => hiboux.flatMap(h => [...h.svg.querySelectorAll(sel)]);

  function poserClasse(c, ms){
    for(const h of hiboux){ h.svg.classList.remove('h-bravo', 'h-erreur', 'h-reflechit', 'h-salue', 'h-chatouille'); void h.svg.getBoundingClientRect(); if(c) h.svg.classList.add(c); }
    etat = c || 'repos'; const jeton = ++numeroEtat;
    if(ms) setTimeout(() => { if(jeton === numeroEtat){ for(const h of hiboux) h.svg.classList.remove(c); etat = 'repos'; } }, ms);
  }
  function bulle(texte, ms){
    clearTimeout(minuteurBulle);
    for(const h of hiboux){ if(!h.bulle) continue; h.bulle.textContent = texte; h.bulle.classList.toggle('visible', !!texte); }
    if(texte) minuteurBulle = setTimeout(() => { for(const h of hiboux) if(h.bulle) h.bulle.classList.remove('visible'); }, ms || Math.max(2600, texte.length * 65));
  }
  // Le hibou dit une phrase : bulle + voix + bec qui bouge.
  function dire(texte, opts){
    opts = opts || {};
    if(!opts.sansBulle) bulle(texte.length > 140 ? texte.slice(0, 137) + '…' : texte, opts.ms);
    const t = sansEmojis(texte);
    if(!voixOn || !t || !window.speechSynthesis){ simulerParole(t); return; }
    try{
      speechSynthesis.cancel();
      const u = new SpeechSynthesisUtterance(t), v = voixFr(); if(v) u.voice = v;
      u.lang = 'fr-FR'; u.rate = 1.02; u.pitch = 1.12;
      u.onstart = () => { parle = true; }; u.onend = u.onerror = () => { parle = false; cibleOuv = 0; };
      u.onboundary = () => { cibleOuv = 1; setTimeout(() => { cibleOuv = .25; }, 110); };
      speechSynthesis.speak(u);
      // Si la voix ne démarre pas (appareil sans voix), on anime quand même le bec.
      setTimeout(() => { if(!parle && !speechSynthesis.speaking) simulerParole(t); }, 700);
    }catch(e){ simulerParole(t); }
  }
  let finSimul = 0;
  function simulerParole(t){ parle = true; clearTimeout(finSimul); finSimul = setTimeout(() => { parle = false; cibleOuv = 0; }, Math.min(9000, 400 + String(t).length * 55)); }
  function taire(){ try{ speechSynthesis.cancel(); }catch(e){} parle = false; cibleOuv = 0; }

  // Boucle d'animation : respiration, regard, bec, clignements.
  let prochainClin = performance.now() + 1800, t0 = performance.now();
  function image(now){
    requestAnimationFrame(image);
    if(document.hidden || !hiboux.length) return;
    const t = (now - t0) / 1000;
    regardX += (cibleX - regardX) * .12; regardY += (cibleY - regardY) * .12;
    if(parle){ if(Math.random() < .22) cibleOuv = .15 + Math.random() * .85; }
    ouverture += (cibleOuv - ouverture) * .45;
    const respire = reduit ? 0 : Math.sin(t * 2.1);
    for(const h of hiboux){
      const s = h.svg;
      if(!reduit){
        s.querySelector('.h-corps').style.transform = 'scale(' + (1 + respire * .008) + ',' + (1 + respire * .016) + ')';
        if(etat === 'repos') s.querySelector('.h-tete').style.transform = 'rotate(' + (Math.sin(t * .7) * 2.2 + regardX * 4) + 'deg) translateY(' + (respire * -1.2) + 'px)';
        else s.querySelector('.h-tete').style.removeProperty('transform');
      }
      s.querySelector('.h-pupilles').style.transform = 'translate(' + (regardX * 9).toFixed(2) + 'px,' + (regardY * 9).toFixed(2) + 'px)';
      s.querySelector('.h-bec-bas').style.transform = 'translateY(' + (ouverture * 9).toFixed(2) + 'px)';
      s.querySelector('.h-bouche').style.transform = 'scaleY(' + (.2 + ouverture * 1.3).toFixed(3) + ')';
    }
    if(now > prochainClin){
      cligner(); if(Math.random() < .25) setTimeout(cligner, 260);
      prochainClin = now + 2200 + Math.random() * 3800;
      if(!reduit && Math.random() < .35) for(const a of tous('.h-aigrette-' + (Math.random() < .5 ? 'g' : 'd'))){ a.classList.remove('frise'); void a.getBoundingClientRect(); a.classList.add('frise'); }
    }
  }
  function cligner(){ for(const p of tous('.h-paupiere')){ p.classList.remove('clin'); void p.getBoundingClientRect(); p.classList.add('clin'); } }

  // ── Réactions publiques ──
  const PHRASES = {
    bonjour:['Hello ! Moi, c’est Ami, ton prof. On s’y met ?', 'Salut ! Prêt à faire chauffer tes neurones ?', 'Coucou ! J’ai préparé une leçon aux petits oignons.'],
    lecon:['C’est parti ! Aujourd’hui : ', 'Ouvre grand tes oreilles. Au programme : ', 'Leçon du jour, attention les yeux : '],
    exercice:['À toi de jouer ! Prends ton temps.', 'Je te regarde… pas de pression. Bon, un peu.', 'Réfléchis bien, je compte sur toi !'],
    chatouille:['Hi hi hi ! Arrête, ça chatouille !', 'Eh ! Mes plumes sont fragiles !', 'Ouh là, pas sous les ailes !', 'Concentre-toi sur la leçon, pas sur mes plumes ! 😄']
  };
  const tirer = l => l[Math.floor(Math.random() * l.length)];
  const PROF = {
    bonjour(){ poserClasse('h-salue', 2600); bulle(tirer(PHRASES.bonjour), 4200); },
    lecon(titre){ poserClasse('h-salue', 1500); dire(tirer(PHRASES.lecon) + titre + '.'); },
    lireLecon(texte){ poserClasse(null); dire(texte, { ms:Math.max(5000, texte.length * 70) }); },
    reflechit(){ poserClasse('h-reflechit', 3200); setTimeout(() => { if(!parle) bulle(tirer(PHRASES.exercice), 3200); }, 300); },
    bravo(texte){ poserClasse('h-bravo', 2400); cibleY = -.4; setTimeout(() => { cibleY = 0; }, 1200); dire(texte || 'Bravo !'); },
    erreur(texte){ poserClasse('h-erreur', 2200); dire(texte || 'Hmm… on reprend.'); },
    dire, taire, bulle,
    voix(on){ if(typeof on === 'boolean'){ voixOn = on; try{ localStorage.setItem(CLE_VOIX, on ? '1' : '0'); }catch(e){} if(!on) taire(); } return voixOn; },
    monter(racine, avecBulle){
      if(!racine) return null;
      const id = 'h' + hiboux.length;
      racine.innerHTML = svgHibou(id) + (avecBulle ? '<div class="bulle-hibou" role="status" aria-live="polite"></div>' : '');
      const h = { racine, svg:racine.querySelector('svg'), bulle:racine.querySelector('.bulle-hibou') };
      h.svg.addEventListener('click', () => { if(etat === 'repos'){ poserClasse('h-chatouille', 900); dire(tirer(PHRASES.chatouille)); } });
      h.svg.style.cursor = 'pointer';
      hiboux.push(h); return h;
    }
  };
  addEventListener('pointermove', e => {
    const h = hiboux.find(x => x.racine.offsetParent) || hiboux[0]; if(!h) return;
    const r = h.svg.getBoundingClientRect(), cx = r.left + r.width / 2, cy = r.top + r.height * .42;
    cibleX = Math.max(-1, Math.min(1, (e.clientX - cx) / 400)); cibleY = Math.max(-1, Math.min(1, (e.clientY - cy) / 400));
  }, { passive:true });
  if(window.speechSynthesis && speechSynthesis.addEventListener) speechSynthesis.addEventListener('voiceschanged', () => {});
  requestAnimationFrame(image);
  window.PROF_ANIME = PROF;
})();
