# Veille des programmes, des épreuves et des diplômes

Quand un ministère change un programme, un examen ou un diplôme, Ami des mots le repère tout seul et prépare la mise à jour.
Un adulte n'a plus qu'à relire et cliquer sur « Publier ». Pour certaines informations, la publication peut même être automatique.

## Comment ça marche

1. **Lecture des sources officielles.** `serveur-php/veille.php` lit chaque document listé dans `serveur-php/veille-sources.php`.
   - Seuls les domaines officiels du pays sont acceptés, y compris après une redirection (éduscol et education.gouv.fr pour la France, mim.gov.it et istruzione.it pour l'Italie, boe.es pour l'Espagne, kmk.org pour l'Allemagne, thecorestandards.org pour les États-Unis, gov.uk pour le Royaume-Uni).
2. **Détection d'un changement.** Chaque document a une empreinte. S'il n'a pas changé depuis la dernière lecture, il n'est pas relu : la veille ne coûte rien tant que rien ne bouge.
3. **Proposition de l'IA.** Si le document a changé, Claude en tire une proposition structurée :
   - **programme** : les chapitres en vigueur d'une matière et d'une classe, reliés aux chapitres du jeu qui les couvrent déjà, et la liste de ce qui change ;
   - **épreuve** et **diplôme** : l'examen tel qu'il est en vigueur (épreuves, durée, notation, conditions d'obtention, ce qui change) ;
   - **annales** : les sujets officiels, avec des liens vers le site du ministère uniquement ;
   - **questions** : pour un chapitre du programme que le jeu ne couvre pas encore (France), une série de 20 questions avec leurres et vannes.
4. **Nettoyage.** Le serveur ne garde que des champs courts et attendus : pas de HTML, pas de lien hors des domaines officiels. Les questions incomplètes sont écartées, et il en faut au moins 10.
5. **Validation.** Le coin admin du serveur (`serveur-php/admin/`) affiche chaque proposition avec sa source. Un adulte la publie ou la rejette.
6. **Dans le jeu.** `js/mod-veille-programmes.js` récupère ce qui est publié :
   - les nouveaux chapitres apparaissent dans la matière et la classe concernées, marqués 🆕 ;
   - « ce qui change » pour les examens s'affiche dans l'onglet 🏛️ Officiel.

   Le jeu revérifie tout : format, identifiants, vannes passées au juge de Plumo. Une question douteuse n'est jamais montrée.

## Publication automatique

Dans `config.php` :

```php
'veille_publication_auto' => ['epreuve', 'diplome', 'annales'],   // se publient sans validation
'veille_chapitres_max' => 2,                                       // nouveaux chapitres rédigés par passage (0 à 6)
```

- `programme`, `annales`, `epreuve` et `diplome` peuvent se publier seuls.
- **Les questions, jamais.** Même si `questions` est ajouté à la liste, le serveur l'ignore. Une question fausse apprise par un enfant coûte plus cher qu'un clic de relecture. Le test serveur le vérifie.

## Lancer la veille régulièrement

- En ligne de commande : `php serveur-php/veille.php`.
- Par une tâche planifiée web (OVH : « Tâches planifiées - Cron »), une fois par semaine par exemple : `https://…/serveur/veille.php?jeton=<veille_jeton>`. Le jeton se règle dans `config.php`.

Il faut une clé Claude côté serveur (`anthropic_cle`). Sans clé, la veille ne fait rien. Aucune clé n'est jamais envoyée au navigateur.

## Ajouter un pays, une matière ou un examen

Ajoute une ligne dans `veille-sources.php` :

```php
['systeme' => 'fr', 'sorte' => 'programme', 'matiere' => 'svt', 'classe' => '3e', 'url' => 'https://eduscol.education.gouv.fr/…'],
```

- `matiere` : l'identifiant d'une matière du jeu (`francais`, `histoire`, `svt`, `physique`…), ou `toutes` pour un examen.
- `classe` : pour un autre pays, la classe française équivalente la plus proche.
- `id` (examens et diplômes) : l'identifiant de la fiche à mettre à jour, par exemple `diplome-national-du-brevet`, `esame-di-maturita`, `pau`, `abitur`, `sat`, `gcse`. La fiche publiée remplace alors celle qui est intégrée au jeu (`js/examens-monde.js`), au lieu de s'ajouter à côté.
- Pour un nouveau pays, ajoute son entrée dans `systemes`, avec ses domaines officiels.

Les adresses des ministères changent parfois. Une source qui ne répond plus apparaît dans le journal de la veille (« ✘ 404 »).

## Les examens déjà dans le jeu

`js/examens-monde.js` contient les fiches des examens de France (brevet, bac général), d'Italie (esame di maturità), d'Espagne (PAU), d'Allemagne (Abitur), des États-Unis (SAT) et d'Angleterre (GCSE, A levels). Elles ont été vérifiées sur les sources officielles en novembre 2026 et s'affichent dans l'onglet 🏛️ Officiel, même sans serveur. La veille les tient ensuite à jour.

## Limites actuelles

- Les nouveaux chapitres avec questions concernent la France. Pour les autres pays, la veille publie les programmes et les examens (onglet Officiel). Elle ne rédige pas encore de questions, car le jeu n'a pas encore de parcours par pays.
- Une page d'actualité qui change souvent produit souvent une nouvelle proposition. Préférer les pages de programme ou les textes du Bulletin officiel.
