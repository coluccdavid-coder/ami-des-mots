// Ami des mots — v5.93 : la bande de Plumo dessinée (personnages originaux, même style que Plumo :
// formes rondes, dégradé doux, gros yeux). Pico le hérisson, Zaza la grenouille, Rocket le renard.
// BANDE.svg(id, humeur) → SVG ; humeur : 'mdr' (bouche ouverte, rit de Plumo) ou 'malin' (sourire en coin).
(function(){
  'use strict';
  const yeux = (x1, x2, y, r, malin) =>
    '<circle cx="' + x1 + '" cy="' + y + '" r="' + r + '" fill="#fff"/><circle cx="' + x2 + '" cy="' + y + '" r="' + r + '" fill="#fff"/>' +
    '<circle cx="' + (x1 + 1.5) + '" cy="' + (y + 1) + '" r="' + (r * .55) + '" fill="#1d2521"/><circle cx="' + (x2 + 1.5) + '" cy="' + (y + 1) + '" r="' + (r * .55) + '" fill="#1d2521"/>' +
    '<circle cx="' + (x1 + 3) + '" cy="' + (y - 1.5) + '" r="' + (r * .18) + '" fill="#fff"/><circle cx="' + (x2 + 3) + '" cy="' + (y - 1.5) + '" r="' + (r * .18) + '" fill="#fff"/>' +
    (malin ? '<path d="M' + (x1 - r) + ' ' + (y - r + 1) + ' L' + (x1 + r) + ' ' + (y - r + 3) + ' M' + (x2 - r) + ' ' + (y - r + 3) + ' L' + (x2 + r) + ' ' + (y - r + 1) + '" stroke="#1d2521" stroke-width="2.4" stroke-linecap="round"/>' : '');
  const degrade = (id, a, b, c) => '<defs><radialGradient id="' + id + '" cx="40%" cy="30%" r="80%"><stop offset="0%" stop-color="' + a + '"/><stop offset="55%" stop-color="' + b + '"/><stop offset="100%" stop-color="' + c + '"/></radialGradient></defs>';
  const DESSINS = {
    pico(h){
      const pics = []; for(let k = 0; k < 9; k++){ const a = Math.PI * (0.92 + k * 0.145), x = 50 + Math.cos(a) * 34, y = 62 + Math.sin(a) * 36, x2 = 50 + Math.cos(a) * 50, y2 = 62 + Math.sin(a) * 52;
        pics.push('<path d="M' + (50 + Math.cos(a - .14) * 32) + ' ' + (62 + Math.sin(a - .14) * 34) + ' L' + x2.toFixed(1) + ' ' + y2.toFixed(1) + ' L' + (50 + Math.cos(a + .14) * 32) + ' ' + (62 + Math.sin(a + .14) * 34) + ' Z" fill="#6b4a2f"/>'); void x; void y; }
      return degrade('g-pico', '#b98a5e', '#8a5f3a', '#5e3f25') + pics.join('') +
        '<ellipse cx="50" cy="66" rx="32" ry="34" fill="url(#g-pico)"/>' +
        '<ellipse cx="50" cy="76" rx="22" ry="22" fill="#f3dfc1"/>' +
        yeux(41, 59, 64, 7, h === 'malin') +
        '<ellipse cx="50" cy="76" rx="5" ry="3.6" fill="#2b1d14"/>' +
        (h === 'mdr' ? '<path d="M41 83 Q50 95 59 83 Z" fill="#7a2d12"/>' : '<path d="M43 84 Q51 89 58 82" fill="none" stroke="#2b1d14" stroke-width="2.2" stroke-linecap="round"/>') +
        '<ellipse cx="36" cy="80" rx="4" ry="2.4" fill="#f2a08c" opacity=".7"/><ellipse cx="64" cy="80" rx="4" ry="2.4" fill="#f2a08c" opacity=".7"/>' +
        '<path d="M38 100 l-3 7 M62 100 l3 7" stroke="#5e3f25" stroke-width="4" stroke-linecap="round"/>';
    },
    zaza(h){
      return degrade('g-zaza', '#9be07a', '#5cbf4a', '#3a8f33') +
        '<circle cx="34" cy="38" r="15" fill="url(#g-zaza)"/><circle cx="66" cy="38" r="15" fill="url(#g-zaza)"/>' +
        '<ellipse cx="50" cy="70" rx="36" ry="30" fill="url(#g-zaza)"/>' +
        '<ellipse cx="50" cy="82" rx="24" ry="16" fill="#dff5c9"/>' +
        yeux(34, 66, 37, 9, h === 'malin') +
        (h === 'mdr' ? '<path d="M28 64 Q50 92 72 64 Z" fill="#7a2d12"/><path d="M40 76 Q50 84 60 76 Z" fill="#e8667a"/>' : '<path d="M28 66 Q50 80 72 64" fill="none" stroke="#24561f" stroke-width="3" stroke-linecap="round"/>') +
        '<circle cx="45" cy="57" r="1.6" fill="#24561f"/><circle cx="55" cy="57" r="1.6" fill="#24561f"/>' +
        '<ellipse cx="24" cy="70" rx="5" ry="3" fill="#f2a08c" opacity=".6"/><ellipse cx="76" cy="70" rx="5" ry="3" fill="#f2a08c" opacity=".6"/>' +
        '<path d="M22 96 q-8 6 -12 4 M78 96 q8 6 12 4" stroke="#3a8f33" stroke-width="5" stroke-linecap="round" fill="none"/>';
    },
    rocket(h){
      return degrade('g-rocket', '#ffb46a', '#f07c2a', '#c4561a') +
        '<path d="M22 46 L26 10 L44 34 Z" fill="#c4561a"/><path d="M78 46 L74 10 L56 34 Z" fill="#c4561a"/>' +
        '<path d="M27 40 L29 20 L39 34 Z" fill="#3b2418"/><path d="M73 40 L71 20 L61 34 Z" fill="#3b2418"/>' +
        '<path d="M50 30 C26 30 18 48 20 64 C22 84 38 98 50 100 C62 98 78 84 80 64 C82 48 74 30 50 30 Z" fill="url(#g-rocket)"/>' +
        '<path d="M50 100 C40 98 30 88 28 74 C36 80 44 80 50 76 C56 80 64 80 72 74 C70 88 60 98 50 100 Z" fill="#fff4e8"/>' +
        yeux(39, 61, 58, 7.5, h === 'malin') +
        '<ellipse cx="50" cy="76" rx="5" ry="3.6" fill="#2b1d14"/>' +
        (h === 'mdr' ? '<path d="M42 82 Q50 94 58 82 Z" fill="#7a2d12"/>' : '<path d="M44 84 Q52 88 58 81" fill="none" stroke="#2b1d14" stroke-width="2.2" stroke-linecap="round"/>');
    }
  };
  // Images 3D (même style que Plumo) : img/bande/<id>.webp. Si le fichier existe, il remplace le dessin.
  const IMAGES = {};
  // Liste fabriquée par outils/construire-sw.js (npm run verifier) : seules les images présentes sont chargées.
  for(const id of (window.BANDE_IMAGES || [])) if(DESSINS[id]) IMAGES[id] = 'img/bande/' + id + '.webp';
  function svg(id, humeur){
    if(IMAGES[id]) return '<img class="pote-img pote-' + id + '" src="' + IMAGES[id] + '" alt="" decoding="async">';
    const d = DESSINS[id]; if(!d) return '';
    return '<svg class="pote-svg pote-' + id + '" viewBox="0 0 100 110" aria-hidden="true" focusable="false">' + d(humeur || 'mdr') + '</svg>';
  }
  window.BANDE = { svg, ids:Object.keys(DESSINS), IMAGES };
})();
