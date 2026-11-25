// Ami des mots — réglages PUBLICS du site (aucun secret ici). Fabriqué par : node outils/configurer.js
// Vide : le jeu marche sans serveur (pas d'abonnement, pas de salon en direct, pas d'IA).
window.CONFIG_JEU = Object.assign({
  // Phase de lancement : aucun contenu payant ni verrouillage.
  MODE_PAYANT:false,
  // Village (2D et 3D) caché pour l'instant : true = caché, false = visible. Rien n'est supprimé.
  VILLAGE_CACHE:true,
  // L'essentiel pour l'instant : true = débranché / caché, false = de retour.
  VOIX_COUPEES:true,       // Plumo ne commente plus à voix haute (consignes, vannes, professeur)
  JEUX_ECOUTE_CACHE:false, // exception : les jeux d'écoute et les boutons 🔊 🐢 🎤 restent
  BOUCHE_CACHE:true,       // « Comment la bouche fait ce mot » (👄)
  MOTS_CITY_CACHE:true,    // Mots City
  ACCUEIL_SIMPLE:true,     // accueil en 4 grandes portes (false = l'ancien accueil avec tous les boutons)
  OUVRIR_MATIERES:true,   // v6.38 : l'appli s'ouvre à chaque visite sur la table des matières (false = sur l'accueil des jeux)
  SERVEUR:'',
  CLE_PUBLIQUE:null,
  LIEN_PAIEMENT:'',
  LIEN_GESTION:''
}, window.CONFIG_JEU || {});
