-- Ami des mots Plus — schéma v5.1.
-- À exécuter dans Supabase avant de redéployer la fonction ami-abonnement.

create table if not exists public.ami_abonnements(
  code text primary key check (code ~ '^AMI-[A-Z0-9]{4}-[A-Z0-9]{4}-[A-Z0-9]{4}$'),
  client text,
  abonnement text unique,
  statut text not null,
  fin timestamptz,
  maj timestamptz not null default now()
);

alter table public.ami_abonnements enable row level security;
revoke all on public.ami_abonnements from anon, authenticated;

-- Registre des événements Stripe traités : les retries ne rejouent pas les écritures.
create table if not exists public.ami_evenements_stripe(
  event_id text primary key,
  type text not null,
  traite timestamptz not null default now()
);
alter table public.ami_evenements_stripe enable row level security;
revoke all on public.ami_evenements_stripe from anon, authenticated;

-- Écriture atomique : un code ne peut pas être lié à deux abonnements actifs.
-- Retourne 'ok' ou 'deja_actif'. Un abonnement identique est idempotent.
create or replace function public.ami_enregistrer_abonnement(
  p_code text,
  p_client text,
  p_abonnement text,
  p_statut text,
  p_fin timestamptz
) returns text
language plpgsql
security definer
set search_path = public, pg_temp
as $$
declare
  actuel public.ami_abonnements%rowtype;
begin
  if p_code is null or p_code !~ '^AMI-[A-Z0-9]{4}-[A-Z0-9]{4}-[A-Z0-9]{4}$'
     or p_abonnement is null or p_abonnement = '' or p_client is null or p_client = ''
     or p_statut is null or p_fin is null then
    raise exception 'Paramètres abonnement invalides';
  end if;

  perform pg_advisory_xact_lock(hashtext(p_code));
  select * into actuel from public.ami_abonnements
    where code = p_code for update;

  if found then
    if actuel.abonnement = p_abonnement then
      update public.ami_abonnements
        set client = p_client, statut = p_statut, fin = p_fin, maj = now()
        where code = p_code;
      return 'ok';
    end if;

    if actuel.abonnement is not null
       and actuel.statut in ('active', 'trialing', 'past_due')
       and actuel.fin > now() then
      return 'deja_actif';
    end if;
  end if;

  insert into public.ami_abonnements(code, client, abonnement, statut, fin, maj)
    values (p_code, p_client, p_abonnement, p_statut, p_fin, now())
  on conflict (code) do update set
    client = excluded.client,
    abonnement = excluded.abonnement,
    statut = excluded.statut,
    fin = excluded.fin,
    maj = now();

  return 'ok';
end;
$$;

revoke all on function public.ami_enregistrer_abonnement(text, text, text, text, timestamptz)
  from public, anon, authenticated;
grant execute on function public.ami_enregistrer_abonnement(text, text, text, text, timestamptz)
  to service_role;
