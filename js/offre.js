// Ami des mots — ce qui est gratuit et ce qui est dans Plus.
// Ce fichier se fabrique avec le coin admin (admin.html) : on coche, on télécharge,
// puis on remplace ce fichier dans le dépôt (voir COIN-ADMIN.md).
// Il ne donne jamais Plus à personne : il dit seulement ce qui est réservé à Plus.
// Plus lui-même ne s'ouvre qu'avec un certificat signé par le serveur.
window.OFFRE_AMI = {
  // false : tout est ouvert, aucun paiement.
  MODE_PAYANT:false,
  PRIX:'5,99 €',
  // Thèmes de mots gratuits (les autres sont dans Plus).
  THEMES_GRATUITS:['animaux', 'manger', 'maison', 'habits', 'nature', 'ville', 'musique', 'atelier'],
  // Sortes de jeux gratuites, à tous leurs niveaux.
  JEUX_GRATUITS:['decouvrir', 'ecoute', 'quel_mot', 'traduction', 'vrai_faux', 'ombre', 'devinette', 'intrus', 'panier', 'ecoute_mot', 'traduction_inverse', 'premiere_lettre', 'lettre_manquante', 'lettres', 'memoire', 'memoire_trad', 'relier', 'chrono', 'grand_quiz'],
  // Nombre de joueurs gratuits (6 au plus avec Plus).
  JOUEURS_GRATUITS:6,
  // Coins réservés à Plus (vide : tous les coins sont gratuits).
  COINS_PLUS:[]
};
