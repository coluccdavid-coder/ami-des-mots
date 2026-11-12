-- Ami des mots Plus — abonnements (à exécuter une fois dans Supabase › SQL).
-- Une ligne par code d'abonnement anonyme (AMI-XXXX-XXXX-XXXX) tiré sur
-- l'appareil du joueur. Aucun nom ni progrès : seulement le code, les
-- identifiants Stripe et l'état de l'abonnement.
create table if not exists public.ami_abonnements(
  code        text primary key check (code ~ '^AMI-[A-Z0-9]{4}-[A-Z0-9]{4}-[A-Z0-9]{4}$'),
  client      text,                -- identifiant client Stripe (cus_…)
  abonnement  text unique,         -- identifiant d'abonnement Stripe (sub_…)
  statut      text not null,       -- active, trialing, past_due, canceled…
  fin         timestamptz,         -- fin de la période payée
  maj         timestamptz not null default now()
);
-- Personne n'y accède depuis le navigateur : seule la fonction
-- ami-abonnement (clé de service) lit et écrit.
alter table public.ami_abonnements enable row level security;
revoke all on public.ami_abonnements from anon, authenticated;
