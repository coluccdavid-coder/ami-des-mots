# Vannes proposées par l'IA (Claude), validées par un adulte

L'IA ne publie rien toute seule. Trois filtres :
1. **Les règles données à l'IA** (taquiner la confusion ou Ami, jamais la personne ni sa famille, pas de gros mots,
   pas de violence, pas de marques ni de personnes réelles).
2. **Le juge d'Ami** (`js/juge.js`) revérifie chaque proposition sur l'appareil et retire les mauvaises.
3. **Un adulte** choisit dans l'Espace parents : ✅ garder ou ❌ jeter. Seules les vannes gardées entrent dans le jeu
   (avec les vannes de la famille), et la famille peut encore les noter 🙄 pour qu'elles disparaissent.

Réservé aux abonnés **Plus** (ça protège ton crédit API), **5 demandes par jour** et par code.

## Avec le serveur PHP (sans Supabase)
Remplis `anthropic_cle` dans `config-ami.php` (voir `serveur-php/LISEZMOI.md`) : `vannes.php` fait le même travail,
et le jeu l'utilise tout seul dès que `node outils/configurer.js --serveur …` a été lancé.

## Mise en place avec Supabase (une fois)
1. Clé API sur https://console.anthropic.com (avec une limite de dépense mensuelle, conseillé).
2. Supabase → **SQL Editor** : exécute la fin de `serveur/ami-abonnements.sql` (bloc « v5.43 »).
3. Secrets de la fonction (jamais dans le dépôt, jamais dans le navigateur) :
   ```
   supabase secrets set ANTHROPIC_API_KEY=sk-ant-...
   supabase secrets set AMI_ORIGINES=https://ton-site
   ```
   Facultatif : `AMI_MODELE` (défaut `claude-haiku-5-5`, rapide et peu cher).
4. Déploiement : `supabase functions deploy ami-vannes --no-verify-jwt`
5. Dans `js/jeu.js` (CONFIG) : `API_VANNES:'https://xxxx.supabase.co/functions/v1/ami-vannes',`
6. `npm run verifier`, puis publication habituelle.

## Ce qui part vers le serveur
Le code d'abonnement (anonyme), le thème choisi et le ton. Rien sur l'enfant, rien de ce qu'il a joué.

## Pourquoi pas de vannes « cherchées sur le net »
Les vannes trouvées en ligne sont souvent méchantes, protégées par le droit d'auteur, ou visent des gens.
L'IA invente des vannes neuves dans le style d'Ami, et un adulte garde le dernier mot.
