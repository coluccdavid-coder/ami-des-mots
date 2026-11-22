# Architecture du professeur pédagogique

## Règle fondamentale
Le moteur local décide de la progression. Un modèle IA peut aider à formuler une explication ou proposer un exercice à partir d'un contenu autorisé, mais ne devient jamais la source de vérité pédagogique.

## Flux cible

1. Le jeu détecte une réponse et identifie une notion (ex. `en.present.be`).
2. `AMI_APPRENTISSAGE` met à jour le niveau de maîtrise et calcule la date de révision.
3. Le moteur local sélectionne une explication connue et un exercice adapté.
4. Si le parent a activé le tuteur distant et si le réseau est disponible, le serveur peut reformuler cette explication à partir d'un catalogue autorisé.
5. Le client valide le schéma et affiche uniquement du texte échappé.
6. En cas d'erreur, de délai dépassé ou de réponse invalide, le contenu local est utilisé.

## Contrat API futur

`POST /tuteur.php`

Requête minimale :
```json
{
  "version": 1,
  "langue": "fr",
  "niveau": 1,
  "notion": "en.present.be",
  "type": "explication_courte",
  "erreur": "confusion_auxiliaire"
}
```

Réponse autorisée :
```json
{
  "version": 1,
  "notion": "en.present.be",
  "explication": "Avec I, on utilise am.",
  "exemple": "I am happy.",
  "question_suivante": "choix_multiple",
  "contenu_id": "en.present.be.03"
}
```

Le serveur doit refuser les champs inattendus, borner chaque chaîne, appliquer un quota et valider la réponse du fournisseur IA avant de la renvoyer. La clé fournisseur reste exclusivement côté serveur.

## Données interdites par défaut
- nom/prénom, date de naissance, adresse, email ;
- enregistrement audio ou transcription libre ;
- historique détaillé complet ;
- identifiants publicitaires ou suivi inter-sites.

## Sécurité et qualité
- Pas de chat libre ni de génération libre de liens/images pour les enfants.
- Modération entrée/sortie et liste blanche de notions.
- Pas de diagnostic psychologique, médical ou scolaire.
- Toute correction doit correspondre à une règle validée dans les données pédagogiques.
- Le tuteur ne note pas l'accent si aucune mesure fiable n'est disponible.
- Mode parent : activation/désactivation, durée de conservation, suppression des données locales.
