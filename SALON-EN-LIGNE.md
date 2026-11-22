# Salon en ligne — battles à distance entre potes (Supabase Realtime)

Sans réglage, le jeu propose seulement le **défi par lien** (aucun serveur). Pour le **salon en direct**
(on se retrouve dans un vaisseau avec un code, comme dans Among Us), il faut :
- **soit le serveur PHP d'Ami des mots** (recommandé, sans Supabase) : voir `serveur-php/LISEZMOI.md`, puis
  `node outils/configurer.js --serveur https://ton-domaine.fr/serveur/`. Rafraîchissement environ chaque seconde ;
- **soit** un projet Supabase (ci-dessous).

Battles possibles : anglais ou **maths** (le chef du salon choisit ; le niveau de maths est le sien).

## 1. Brancher
1. Projet Supabase (celui des abonnements convient) → **Project Settings → API**.
2. Copie l'**URL du projet** (`https://xxxx.supabase.co`) et la clé **`anon` (publique)**.
   **Jamais la clé `service_role`** : elle est secrète et ne doit jamais aller dans le navigateur ni dans le dépôt.
3. Dans `js/jeu.js`, section `CONFIG` :
   ```js
   SALON_URL:'https://xxxx.supabase.co',
   SALON_CLE:'eyJ...clé anon...',
   ```
4. Realtime « Broadcast » et « Presence » sont actifs par défaut sur les projets Supabase. Les salons n'utilisent
   **aucune table** : rien n'est stocké sur le serveur.
5. La sécurité du contenu (CSP) de `index.html` autorise déjà `https://*.supabase.co` et `wss://*.supabase.co`.
6. `npm run verifier`, puis publication habituelle.

## 2. Comment ça marche
- **Salon privé** : un code de 5 lettres à donner à ses potes (ou bouton « envoie l'invitation »).
- **Salons publics** : la liste des salons ouverts ; on y entre en un clic.
- Le premier arrivé (👑) lance la battle : 6 questions mêlées (pièges, battle, vrai/faux, écoute), 15 secondes
  chacune, +100 points si c'est juste, jusqu'à +50 pour la vitesse. Podium à la fin.
- Réactions toutes faites (😂 LOL, 🔥 Fire…) pendant toute la partie.

## 3. Règles de sécurité (pour les enfants)
- **Pseudos seulement** (12 caractères au plus), jamais de compte, rien n'est gardé sur le serveur.
- **Salons publics : réactions toutes faites seulement.** Tout texte libre reçu dans un salon public est ignoré.
- **Chat libre : seulement dans un salon privé, et seulement si un parent l'active** dans l'Espace parents
  (désactivé par défaut).
- Un filtre, à la réception, masque gros mots, liens, numéros de téléphone, e-mails, @pseudos et applis de contact.
- On peut rendre un joueur **muet** en le touchant.

## 4. Tester sans Supabase
Un faux serveur Realtime est fourni pour les tests : voir `outils/tests-navigateur/LISEZMOI.md`
(`faux-realtime.js` + `test-salon-direct.js` : deux navigateurs font une battle complète).

## Limite
La partie est arbitrée par les navigateurs (pas de serveur de jeu) : c'est fait pour jouer entre potes et en
famille, pas pour un classement mondial à enjeu.
