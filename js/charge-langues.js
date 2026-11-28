// Ami des mots — v8.7 : chargement à la demande des traductions italiennes et portugaises des matières (≈ 1,7 Mo).
// Ces fichiers ne servent qu'aux joueurs dont l'interface est en italien ou en portugais : ils ne sont plus chargés au démarrage
// pour tout le monde. Ils sont chargés (dans l'ordre) quand la langue de l'interface (attribut lang de <html>) passe à « it » ou « pt »,
// une fois le jeu entièrement chargé. Le service worker les garde quand même hors connexion.
(function(){
  'use strict';
  const A_LA_DEMANDE = {
    it:['js/mat-trad-it-svt.js', 'js/mat-trad-it-physique.js', 'js/mat-trad-it-techno.js', 'js/mat-trad-it-histoire.js', 'js/mat-trad-it-lycee.js', 'js/mat-trad-it-sup.js'],
    pt:['js/mat-trad-pt-svt.js', 'js/mat-trad-pt-physique.js', 'js/mat-trad-pt-techno.js', 'js/mat-trad-pt-histoire.js', 'js/mat-trad-pt-lycee.js', 'js/mat-trad-pt-sup.js']
  };
  const promesses = {};
  let pret = document.readyState !== 'loading';
  function un(src){
    return new Promise(res => {
      if(document.querySelector('script[data-langue-src="' + src + '"]')) return res();
      const s = document.createElement('script'); s.src = src; s.async = false; s.dataset.langueSrc = src;
      s.onload = () => res(); s.onerror = () => res();   // hors ligne et absent du cache : on reste en français, sans bloquer
      document.head.appendChild(s);
    });
  }
  function charger(l){
    if(!A_LA_DEMANDE[l]) return Promise.resolve(false);
    if(!promesses[l]) promesses[l] = A_LA_DEMANDE[l].reduce((p, f) => p.then(() => un(f)), Promise.resolve()).then(() => {
      try{ document.dispatchEvent(new CustomEvent('ami:langue-chargee', { detail:{ langue:l } })); }catch(e){}
      return true;
    });
    return promesses[l];
  }
  const verifier = () => { if(pret) charger((document.documentElement.lang || '').slice(0, 2).toLowerCase()); };
  if(!pret) document.addEventListener('DOMContentLoaded', () => { pret = true; verifier(); });
  try{ new MutationObserver(verifier).observe(document.documentElement, { attributes:true, attributeFilter:['lang'] }); }catch(e){}
  verifier();
  window.AMI_LANGUES = { A_LA_DEMANDE, charger, charge:l => !!promesses[l] };
})();
