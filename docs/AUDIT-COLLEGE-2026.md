# Audit du programme du collège — Ami des mots v6.28

Date : 25 novembre 2026. Année scolaire de référence : 2026-2027.

## Suivi — v6.29

| | Avant (v6.28) | Après (v6.29) |
|---|---|---|
| ❌ notions absentes | 13 | **0** |
| 🟠 notions partielles | 18 | 11 |
| ✅ notions couvertes | 148 | 168 |

- **Questions hors niveau corrigées.** Chaque question d’un chapitre « Par thème » garde maintenant la classe de son chapitre d’origine (`nivQ`). Quelques questions de chapitres larges ont aussi reçu leur classe précise (js/mat-niveaux.js). Résultat : plus aucune question sur l’ADN, les allèles, le pH ou la radioactivité en 6e et en 5e.
- **EMC :** un cours par classe, conforme au programme 2024 (js/mat-cours-emc.js).
- **Notions ajoutées :**
  - femmes au XIXe siècle ;
  - Terre active en 6e ;
  - premiers programmes en 6e ;
  - sécurité électrique et signaux ;
  - technologie : 3 chapitres (numérique et IA, énergie et fabrication, projet) ;
  - français : types de phrases, modes et temps composés, orthographe de 1990, « Dire l’amour ».
- **Générateur de conjugaison :** le conditionnel est ajouté en 5e.
- **Reste partiel** (1 ou 2 questions) :
  - monothéisme juif ;
  - Capétiens ;
  - familles de matériaux ;
  - composition de l’Univers ;
  - groupe nominal ;
  - étymologie ;
  - focalisation ;
  - entrées de 5e « poésie » et « héros ».
- **Reste à faire :**
  - maths (point 5) ;
  - langues vivantes (point 4) ;
  - brevet (point 7) ;
  - matières absentes (point 6) ;
  - italien et portugais (point 8).

## Méthode

- Inventaire automatique de toutes les questions accessibles en 6e, 5e, 4e et 3e (banques et générateurs).
- Comparaison avec la liste des notions des programmes en vigueur, notion par notion.
  - Le script cherche des mots-clés dans le titre du chapitre, la question, la réponse et la règle.
  - Tous les « manquant » ont ensuite été vérifiés à la main.
- Seuils : ❌ manquant = 0 question · 🟠 partiel = 1 ou 2 questions · ✅ couvert = 3 questions ou plus.
- Limite : « couvert » veut dire « au moins 3 questions sur la notion ». Ça ne veut pas dire que la notion est traitée en profondeur. Seul un professeur peut valider le fond (voir RELECTURE-PROFS.md).

## Programmes en vigueur en 2026-2027

| Matière | 6e | 5e | 4e | 3e |
|---|---|---|---|---|
| Français, maths | 2025 (cycle 3) | **BO n° 10 du 5 mars 2026** (nouveau) | BO 2020 (nouveau en 2027) | BO 2020 (nouveau en 2028) |
| Langues vivantes | BO n° 22 du 29 mai 2025 | BO 2025 (nouveau) | BO 2020 | BO 2020 |
| EMC | **BO n° 24 du 13 juin 2024** | BO 2024 | BO 2024 | BO 2024 (nouveau) |
| Histoire-géo | BO 2020 | BO 2020 | BO 2020 | BO 2020 |
| Sciences et technologie (6e) | version 2023 (nouveau programme BO 11 juin 2026 en 6e seulement en 2027) | — | — | — |
| SVT, physique-chimie | — | BO 2020 (par cycle) | BO 2020 | BO 2020 |
| Technologie | — | **BO n° 9 du 29 février 2024** | BO 2024 | BO 2024 (nouveau) |

## 1. Problème transversal : des questions hors niveau

Les chapitres « Par thème » sont proposés de la 6e à la Terminale, sans filtre par classe.

- En SVT, un élève de 6e reçoit des questions sur l’ADN, les allèles, les anticorps et les hormones. Ce sont des notions de 3e et du lycée.
  - « Cellule, ADN et génétique » : 19 questions hors niveau sur 21.
  - « Corps humain » : 12 sur 31.
- En physique-chimie, un élève de 5e reçoit des questions sur le pH, les ions et la radioactivité. Ce sont des notions de 3e et du lycée.
- En histoire-géo, « La géographie : toutes les questions » (61 questions) est proposée telle quelle de la 6e à la 3e.

**À faire :** filtrer chaque question d’un chapitre thématique selon la classe de la notion, et non selon le thème.

## 2. Notions absentes (❌) — à créer en priorité

| Matière | Classe | Notion du programme |
|---|---|---|
| Histoire | 4e | Conditions des femmes au XIXe siècle |
| EMC | 5e | Égalité femmes-hommes (sous-thème obligatoire du programme 2024) |
| EMC | 3e | L’opinion : médias, sondages, désinformation, intelligence artificielle |
| Sciences et techno | 6e | Programmation et algorithmes simples |
| Sciences et techno | 6e | Phénomènes géologiques (volcans, séismes) au niveau 6e |
| Physique-chimie | cycle 4 | Sécurité électrique (court-circuit, fusible, disjoncteur, électrocution) |
| Physique-chimie | cycle 4 | Signaux électriques et transmission d’information |
| Technologie | cycle 4 | Intelligence artificielle : types d’apprentissage, usages, biais (nouveau dans le programme 2024) |
| Technologie | cycle 4 | Unités d’information : bit, octet, Ko, Mo, Go, ordres de grandeur |
| Français | 5e-3e | Types et formes de phrases (déclarative, interrogative, exclamative, impérative ; négative ; phrase non verbale) |
| Français | 5e-3e | Le générateur de conjugaison ne propose jamais le subjonctif, l’impératif, le plus-que-parfait, le passé antérieur ni le futur antérieur. En 5e, il ne propose pas non plus le conditionnel, pourtant au nouveau programme 2026. |
| Français | tous | Orthographe rectifiée de 1990 (référence du nouveau programme) : aucune question ni mention |
| Français | 4e | Entrée « Dire l’amour » (poésie lyrique) |

## 3. Notions partielles (🟠) — 1 ou 2 questions seulement

- **Histoire 6e :** naissance du monothéisme juif.
- **Histoire 5e :** villes et société urbaine médiévales ; affirmation de l’État monarchique (Capétiens, Valois, guerre de Cent Ans).
- **Géographie 4e :** migrations transnationales ; tourisme.
- **Géographie 5e :** nourrir l’humanité.
- **EMC 6e :** règles et responsabilité.
- **EMC 4e :** justice ; liberté de la presse ; Charte de l’environnement.
- **EMC 3e :** laïcité (loi de 1905).
- **SVT cycle 4 :** la Terre dans le système solaire ; risques naturels et prévention.
- **Sciences 6e :** familles de matériaux.
- **Physique-chimie :** composition de l’Univers (éléments, tableau) ; loi d’Ohm.
- **Technologie :**
  - cybersécurité et cyberviolence ;
  - cahier des charges, normes et labels ;
  - chaîne d’énergie (moteurs, transmissions) ;
  - dépannage et sécurité en atelier ;
  - gestion de projet ;
  - prototypage et tests ;
  - objets communicants.
- **Français :**
  - groupe nominal (épithète, complément du nom, apposition) ;
  - discours rapporté ;
  - étymologie ;
  - point de vue et focalisation.
  - Entrées de 5e : « Voyager en poésie », « Devenir héroïne, héros ».
  - Entrées de 3e : « Se raconter », « Dénoncer », « Visions poétiques ».

## 4. Matières entières trop minces

| Matière | Ce qui existe | Ce qui manque |
|---|---|---|
| Technologie | 1 cours de 12 questions par classe (36 au total) | Le programme 2024 compte 3 thèmes et environ 30 notions. Il faut au moins 1 chapitre par thème (objets et usages, structure et fonctionnement, conception et réalisation) et un chapitre « programmation » avec générateur. |
| Espagnol LV2 | 3 à 4 chapitres par classe, environ 25 à 30 questions | Repères culturels (axes du programme 2025 en 5e), vocabulaire thématique, impératif, pronoms compléments, comparatifs, conditionnel. |
| Allemand LV2 | 2 à 3 chapitres par classe, environ 25 questions | Datif complet, prépositions mixtes, pluriels, prétérit des verbes forts, futur (werden), repères culturels. |
| Anglais LV1 | 6 à 10 chapitres par classe | **Axes culturels obligatoires du programme 2025 : 5e = le Royaume-Uni (axe 6 obligatoire).** En 5e : should/could, opinion (I think…), pronoms réfléchis, dérivation, marqueurs de temps (ago, last…). Une seule question porte sur le Royaume-Uni. |
| EMC | 2 cours par cycle (6e-5e, 4e-3e) | Le programme 2024 a **un thème par classe**. Il faut un cours par classe : 6e « Apprendre à vivre dans une société démocratique », 5e « Égalité, fraternité et solidarité », 4e « Défendre les droits et les libertés », 3e « Faire vivre la démocratie ». |

## 5. Maths — notions absentes

Les chapitres de maths sont nombreux (6e : 26, 5e : 37, 4e : 18, 3e : 17), mais certaines notions des programmes n’ont aucun chapitre :

- **6e :**
  - lire et construire tableaux et graphiques ;
  - droites parallèles et perpendiculaires ;
  - quadrilatères usuels et cercle (vocabulaire) ;
  - mesurer un angle au rapporteur ;
  - patrons de solides.
- **4e (programme 2020) :**
  - translation et rotation ;
  - racine carrée (hors Pythagore) ;
  - notion de fonction (image, tableau de valeurs, courbe) ;
  - étendue ;
  - algorithmique (aucun chapitre en 4e).
- **3e (programme 2020) :**
  - homothétie ;
  - repérage sur la sphère (latitude, longitude) ;
  - sections de solides ;
  - grandeurs composées (débit) ;
  - lecture graphique de fonctions ;
  - algorithmique (aucun chapitre en 3e).

## 6. Matières absentes de l’appli

- Arts plastiques, éducation musicale, histoire des arts (évaluée à l’oral du brevet).
- EPS (connaissances seulement : règles, échauffement, santé).
- Latin et grec (option LCA, 5e-3e).
- Langues vivantes autres que l’anglais, l’espagnol et l’allemand (italien, portugais, arabe, chinois, langues régionales).

## 7. Brevet

- **Absent :** préparation à l’oral (soutenance de projet, 15 min, coefficient 2) : méthode, questions types, grille.
- **Absent :** épreuves blanches complètes au format réel :
  - français : 3 h, dictée et réécriture ;
  - maths : 2 h ;
  - histoire-géo-EMC : 2 h ;
  - sciences : 1 h, 2 matières sur 3.
- L’appli propose des évaluations par matière, mais pas d’épreuve blanche complète au format du brevet.

## 8. Traductions

- Anglais, espagnol, allemand : la quasi-totalité des matières du collège est traduite. Seule exception : l’anglais du programme, qui reste en français.
- Italien et portugais : **seules les maths sont traduites.** Les autres matières s’affichent en français.

## Ordre conseillé pour compléter

1. Corriger les questions hors niveau (point 1). C’est le plus gênant pour un élève de 6e ou de 5e.
2. Créer les notions absentes (point 2), soit environ 13 notions.
3. Passer l’EMC à un cours par classe et étoffer la technologie (point 4).
4. Ajouter les notions de maths absentes (point 5).
5. Étoffer les langues vivantes (axes culturels, grammaire du programme 2025).
6. Préparer le brevet (oral et épreuves blanches au format réel).
7. Ajouter les matières absentes, si tu le souhaites.
