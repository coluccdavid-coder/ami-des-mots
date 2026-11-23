// Ami des mots — réglages PUBLICS du site (aucun secret ici). Fabriqué par : node outils/configurer.js
// Vide : le jeu marche sans serveur (pas d'abonnement, pas de salon en direct, pas d'IA).
window.CONFIG_JEU = Object.assign({
  // Phase de lancement : aucun contenu payant ni verrouillage.
  MODE_PAYANT:false,
  // Village (2D et 3D) caché pour l'instant : true = caché, false = visible. Rien n'est supprimé.
  VILLAGE_CACHE:true,
  SERVEUR:'',
  CLE_PUBLIQUE:null,
  LIEN_PAIEMENT:'',
  LIEN_GESTION:''
}, window.CONFIG_JEU || {});
