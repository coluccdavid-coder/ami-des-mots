# Publier sur le Play Store et l'App Store : la fiche prête à remplir

La fabrication de l'appli Android est décrite dans `ANDROID.md`. Ici : tout ce qu'il faut **saisir** dans les stores.
Captures prêtes : `docs/stores/captures/` (format téléphone 1080 × 1920).

## Le paiement dans les stores (v5.94)

L'appli des stores n'affiche **pas** les liens Stripe : elle propose l'achat par **Google Play Billing** ou **l'achat
intégré d'Apple**, comme ils l'exigent. Chaque achat est vérifié par ton serveur auprès de Google ou d'Apple.
Mise en place complète : `docs/PAIEMENT.md`.

Produits à créer dans la Play Console et App Store Connect (mêmes identifiants partout) :

| Identifiant | Type | Formule |
| --- | --- | --- |
| `plus_mensuel` | Abonnement | Mensuel |
| `plus_annuel` | Abonnement | Annuel |
| `plus_famille` | Abonnement | Famille |
| `plus_a_vie` | Produit unique (non consommable) | À vie |

Dans le compte admin, coche la colonne « Stores » des formules à proposer dans l'appli.
Dans les questionnaires des stores, réponds alors « oui » à « achats numériques ».

## Fiche Play Store

**Nom (30 caractères max) :** Ami des mots : réviser en riant

**Description courte (80 max) :**
Vocabulaire, anglais et révisions de la 6e au bac, avec un hibou qui te vanne.

**Description complète :**

> Ami des mots, c'est l'appli où l'on révise en se chambrant.
>
> 🦉 Plumo, le hibou, te pose des questions… et te vanne gentiment quand tu te trompes. Toujours sur la réponse,
> jamais sur toi. Enchaîne 4 bonnes réponses et sa bande débarque pour se moquer… de lui.
>
> 📚 De la 6e au bac : anglais, espagnol, allemand, maths, français, histoire-géo, SVT, physique-chimie, philo.
> Une évaluation par niveau, des brevets et bacs blancs construits comme les vrais.
>
> 🗯️ Clash libre : on se vanne entre potes, en anglais et en français. Les vannes qui visent la personne sont refusées.
>
> 👪 Pour toute la famille : des jeux de mots en images pour les plus petits, un espace parents avec le bilan de la semaine.
>
> 🔒 Sans compte, sans publicité, sans pistage. La progression reste sur le téléphone. Marche hors connexion.

**Catégorie :** Éducation. **Coordonnées :** adresse e-mail de contact + lien vers `legal.html`.

## Public cible et règles « Familles » (Google)

- Tranches d'âge : 6-8, 9-12, 13 ans et plus (le jeu vise toute la famille).
- Avec des moins de 13 ans dans la cible, l'appli doit suivre le **programme Familles** : pas de publicité (✅),
  pas de bibliothèque de pistage (✅), politique de confidentialité (✅ `legal.html#confidentialite`).
- Le micro : préciser qu'il sert à « Répète après Plumo », que l'enregistrement reste sur le téléphone et est effacé.

## Formulaire « Sécurité des données » (Google)

| Question | Réponse |
| --- | --- |
| L'appli collecte-t-elle des données ? | Oui, de façon limitée : textes envoyés à l'IA (sans donnée personnelle), surnom dans les battles à distance. |
| Données partagées avec des tiers ? | Non (Anthropic et OVH sont des sous-traitants, pas des tiers au sens de Google). |
| Données chiffrées en transit ? | Oui (HTTPS). |
| L'utilisateur peut-il demander la suppression ? | Oui (e-mail de contact) ; les données du téléphone s'effacent en désinstallant. |
| Enregistrements audio | Non collectés : traités sur l'appareil seulement. |
| Localisation, contacts, identifiants publicitaires | Non. |

## Questionnaire de classification (IARC)

- Violence, peur, sexualité, drogues, jeux d'argent : **non**.
- Langage grossier : **non** (filtré par le juge).
- Les utilisateurs peuvent-ils communiquer entre eux ? **Oui, de façon limitée** : battles en salon, réactions toutes
  faites ; chat écrit seulement dans les salons privés, si un parent l'autorise.
- Achats numériques : **oui** si des formules sont proposées dans l'appli (abonnements et achat unique).

Le classement (PEGI en Europe) est attribué automatiquement à partir de ces réponses ; la communication entre joueurs ajoute une mention « interactions entre utilisateurs ».

## App Store (Apple), quand tu seras prêt

- Compte Apple Developer payant. L'appli iOS se fabrique avec Capacitor, comme Android, mais **il faut un Mac**
  (ou un service de compilation en ligne).
- Catégorie « Éducation ». Éviter la catégorie « Enfants » au départ : elle interdit les liens externes et les achats sans
  contrôle parental, et le jeu ouvre des liens vers les programmes officiels.
- Fiche de confidentialité Apple : mêmes réponses que pour Google.

## Captures

| Fichier | Ce qu'elle montre |
| --- | --- |
| `docs/stores/captures/1-accueil.jpg` | L'accueil avec Plumo |
| `docs/stores/captures/2-question.jpg` | Une question avec sa vanne |
| `docs/stores/captures/3-bande.jpg` | La bande qui vanne Plumo après 4 bonnes réponses |
| `docs/stores/captures/4-matieres.jpg` | Le choix des matières de la 6e au bac |
| `docs/stores/captures/5-clash.jpg` | Le Clash libre |
