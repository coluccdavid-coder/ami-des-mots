// Ami des mots — réglage des graphismes partagé par le jeu, le village 3D et Mots City (v5.67).
// « auto » : Ultra sur les appareils puissants (PC, téléphones haut de gamme), Normal ailleurs.
// Le choix est gardé sur l'appareil (localStorage « ami-graphismes »), jamais envoyé.
(function(){
  'use strict';
  const CLE = 'ami-graphismes', CHOIX = ['auto', 'normal', 'ultra'];
  function choix(){ try{ const v = localStorage.getItem(CLE); return CHOIX.includes(v) ? v : 'auto'; }catch(e){ return 'auto'; } }
  function definir(v){ if(!CHOIX.includes(v)) return; try{ localStorage.setItem(CLE, v); }catch(e){} appliquer(); }
  let memo = null;
  // Appareil assez puissant pour l'Ultra ? Carte graphique réelle (pas un rendu logiciel), assez de cœurs et de mémoire.
  function puissant(){
    if(memo !== null) return memo;
    try{ const s = sessionStorage.getItem(CLE + '-puissant'); if(s === '1' || s === '0') return (memo = s === '1'); }catch(e){}
    let ok = false;
    try{
      const c = document.createElement('canvas'), gl = c.getContext('webgl2');
      if(gl){
        const info = gl.getExtension('WEBGL_debug_renderer_info');
        const nom = String(info ? gl.getParameter(info.UNMASKED_RENDERER_WEBGL) : gl.getParameter(gl.RENDERER) || '');
        const logiciel = /swiftshader|llvmpipe|software|basic render|lavapipe|mesa offscreen/i.test(nom);
        const vieux = /mali-[4t][0-9]{2}\b|adreno \(tm\) [3-5][0-9]{2}\b|powervr sgx|intel\(r\) hd graphics [2-4][0-9]{3}/i.test(nom);
        const coeurs = navigator.hardwareConcurrency || 4, memoire = navigator.deviceMemory || 8;
        const tactile = matchMedia('(pointer:coarse)').matches;
        ok = !logiciel && !vieux && (tactile ? coeurs >= 8 && memoire >= 6 : coeurs >= 4 && memoire >= 4);
        const perte = gl.getExtension('WEBGL_lose_context'); if(perte) perte.loseContext();
      }
    }catch(e){ ok = false; }
    try{ sessionStorage.setItem(CLE + '-puissant', ok ? '1' : '0'); }catch(e){}
    return (memo = ok);
  }
  function mouvementReduit(){ try{ return matchMedia('(prefers-reduced-motion: reduce)').matches; }catch(e){ return false; } }
  function estUltra(){ const c = choix(); return c === 'ultra' || (c === 'auto' && puissant()); }
  // Sur les écrans du jeu : la classe gfx-ultra active les effets (fond animé, particules…) sauf si le système
  // demande moins d'animations.
  function appliquer(){
    const h = document.documentElement; if(!h) return;
    h.classList.toggle('gfx-ultra', estUltra() && !mouvementReduit());
    try{ window.dispatchEvent(new CustomEvent('ami-graphismes', { detail:{ ultra:estUltra() } })); }catch(e){}
  }
  window.GRAPHISMES = { choix, definir, puissant, estUltra, mouvementReduit, appliquer, CHOIX };
  appliquer();
})();
