// Ami des mots — v10.10 : réponse au service worker « cette page sait se mettre à jour toute seule ».
// Une nouvelle version demande à chaque onglet ouvert « version? » ; sans réponse en 3 secondes (ancien code d'avant la v10.10),
// l'onglet est rechargé d'office. Avec ce fichier, la page répond : c'est elle qui choisit le bon moment (jeu.js, v10.9).
(function(){
  'use strict';
  try{
    const sw = navigator.serviceWorker; if(!sw) return;
    sw.addEventListener('message', e => { if(e.data && e.data.ami === 'version?' && e.source && e.source.postMessage) e.source.postMessage({ ami:'a-jour' }); });
    if(sw.startMessages) sw.startMessages();
  }catch(e){ /* sans service worker : rien à faire */ }
})();
