// Ami des mots Plus — vérification publique + webhook Stripe signé.
// GET ?code=AMI-… : renvoie un certificat signé si l'abonnement est actif.
// POST : traite les événements Stripe. Déployer avec --no-verify-jwt.
//
// Secrets : STRIPE_SECRET_KEY, STRIPE_WEBHOOK_SECRET, SUPABASE_URL,
// SUPABASE_SERVICE_ROLE_KEY, AMI_CLE_PRIVEE.
// CORS : AMI_ORIGINES=https://jeu.example,https://www.jeu.example
// (AMI_ORIGINE reste accepté pour compatibilité).
import Stripe from 'npm:stripe@17';
import { createClient } from 'npm:@supabase/supabase-js@2';

const stripe = new Stripe(Deno.env.get('STRIPE_SECRET_KEY') ?? '');
const SECRET = Deno.env.get('STRIPE_WEBHOOK_SECRET') ?? '';
const ORIGINES = (Deno.env.get('AMI_ORIGINES') ?? Deno.env.get('AMI_ORIGINE') ?? '*')
  .split(',').map(x => x.trim()).filter(Boolean);
const db = createClient(
  Deno.env.get('SUPABASE_URL') ?? '',
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
);
const CLE_PRIVEE = Deno.env.get('AMI_CLE_PRIVEE') ?? '';
let cle: CryptoKey | null = null;

const FORMAT = /^AMI-[A-Z0-9]{4}-[A-Z0-9]{4}-[A-Z0-9]{4}$/;
const ACTIFS = ['active', 'trialing', 'past_due'];

const b64u = (b: Uint8Array) =>
  btoa(String.fromCharCode(...b)).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');

async function signer(code: string, fin: string): Promise<string> {
  if (!CLE_PRIVEE) throw new Error('AMI_CLE_PRIVEE manquante');
  cle ??= await crypto.subtle.importKey(
    'jwk', JSON.parse(CLE_PRIVEE),
    { name: 'ECDSA', namedCurve: 'P-256' }, false, ['sign']
  );
  const charge = b64u(new TextEncoder().encode(JSON.stringify({ c: code, f: fin })));
  const sig = new Uint8Array(await crypto.subtle.sign(
    { name: 'ECDSA', hash: 'SHA-256' }, cle, new TextEncoder().encode(charge)
  ));
  return charge + '.' + b64u(sig);
}

function cors(req: Request): Headers {
  const h = new Headers({
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, stripe-signature',
    'Vary': 'Origin',
    'Cache-Control': 'no-store'
  });
  const origin = req.headers.get('origin');
  if (ORIGINES.includes('*')) h.set('Access-Control-Allow-Origin', '*');
  else if (origin && ORIGINES.includes(origin)) h.set('Access-Control-Allow-Origin', origin);
  return h;
}
const json = (req: Request, data: unknown, status = 200) => {
  const h = cors(req);
  h.set('Content-Type', 'application/json');
  return new Response(JSON.stringify(data), { status, headers: h });
};
const verifierEcriture = (r: { error: unknown }) => {
  if (r.error) throw new Error(String((r.error as any).message ?? r.error));
};

// Champ compatible avec les deux formes Stripe de current_period_end.
function finDe(sub: Stripe.Subscription): string | null {
  const s = (sub as any).current_period_end ?? sub.items?.data?.[0]?.current_period_end;
  return s ? new Date(s * 1000).toISOString() : null;
}

Deno.serve(async (req) => {
  const origin = req.headers.get('origin');
  const corsHeaders = cors(req);
  if (req.method === 'OPTIONS') {
    if (!ORIGINES.includes('*') && origin && !ORIGINES.includes(origin)) {
      return new Response('origine interdite', { status: 403, headers: corsHeaders });
    }
    return new Response(null, { status: 204, headers: corsHeaders });
  }

  if (req.method === 'GET') {
    if (!ORIGINES.includes('*') && origin && !ORIGINES.includes(origin)) {
      return json(req, { erreur: 'origine_interdite' }, 403);
    }
    const code = new URL(req.url).searchParams.get('code') ?? '';
    if (!FORMAT.test(code)) return json(req, { actif: false });
    const { data, error } = await db.from('ami_abonnements')
      .select('statut, fin').eq('code', code).maybeSingle();
    // Ne pas transformer une panne de base en réponse « inactif ».
    if (error) return json(req, { erreur: 'indisponible' }, 503);
    const actif = !!data && ACTIFS.includes(data.statut) &&
      !!data.fin && Date.parse(data.fin) > Date.now();
    try {
      return json(req, {
        actif,
        fin: data?.fin ?? null,
        jeton: actif ? await signer(code, data!.fin) : null
      });
    } catch (e) {
      console.error('ami-abonnement signature', e);
      return json(req, { erreur: 'signature_indisponible' }, 503);
    }
  }

  if (req.method === 'POST') {
    let ev: Stripe.Event;
    try {
      ev = await stripe.webhooks.constructEventAsync(
        await req.text(),
        req.headers.get('stripe-signature') ?? '',
        SECRET,
        undefined,
        Stripe.createSubtleCryptoProvider()
      );
    } catch (_) {
      return new Response('signature invalide', { status: 400 });
    }

    try {
      // Déduplication des livraisons Stripe. La table est créée par le SQL v5.1.
      const precedent = await db.from('ami_evenements_stripe')
        .select('event_id').eq('event_id', ev.id).maybeSingle();
      verifierEcriture(precedent);
      if (precedent.data) return json(req, { recu: true, doublon: true });

      if (ev.type === 'checkout.session.completed' ||
          ev.type === 'checkout.session.async_payment_succeeded') {
        const session = ev.data.object as Stripe.Checkout.Session;
        const code = session.client_reference_id ?? '';
        if (session.mode === 'subscription' && FORMAT.test(code) && session.subscription) {
          const subId = typeof session.subscription === 'string'
            ? session.subscription : session.subscription.id;
          const sub = await stripe.subscriptions.retrieve(subId);
          const clientSession = typeof session.customer === 'string'
            ? session.customer : session.customer?.id ?? '';
          const clientSub = typeof sub.customer === 'string'
            ? sub.customer : sub.customer.id;
          if (!clientSession || clientSession !== clientSub) {
            throw new Error('Client Stripe incohérent entre la session et l’abonnement');
          }
          const fin = finDe(sub);
          if (!fin) throw new Error('Fin de période absente pour l’abonnement Stripe');

          const enregistrement = await db.rpc('ami_enregistrer_abonnement', {
            p_code: code,
            p_client: clientSub,
            p_abonnement: sub.id,
            p_statut: sub.status,
            p_fin: fin
          });
          verifierEcriture(enregistrement);

          if (enregistrement.data === 'deja_actif') {
            // Le même code possède déjà un abonnement actif différent.
            // On annule le doublon pour éviter deux renouvellements.
            // Vérifier/rembourser la première facture dans Stripe : une annulation
            // n'effectue pas automatiquement le remboursement du paiement initial.
            if (sub.status !== 'canceled') {
              await stripe.subscriptions.cancel(sub.id, { prorate: false });
            }
            console.error('AMI_DOUBLON_ABONNEMENT', { code, abonnementAnnule: sub.id });
          } else if (enregistrement.data !== 'ok') {
            throw new Error('Résultat inattendu de ami_enregistrer_abonnement');
          }
        }
      }

      if (ev.type === 'customer.subscription.updated' ||
          ev.type === 'customer.subscription.deleted') {
        const id = (ev.data.object as Stripe.Subscription).id;
        // Stripe peut livrer les événements dans le désordre : on relit l'état actuel.
        const sub = await stripe.subscriptions.retrieve(id);
        const maj = await db.from('ami_abonnements')
          .update({ statut: sub.status, fin: finDe(sub), maj: new Date().toISOString() })
          .eq('abonnement', sub.id).select('code');
        verifierEcriture(maj);
        // Si le webhook d'abonnement arrive avant checkout.session.completed,
        // aucune ligne n'existe encore. Le traitement checkout relira ensuite
        // l'état actuel de Stripe et enregistrera le bon statut.
      }

      const marque = await db.from('ami_evenements_stripe')
        .insert({ event_id: ev.id, type: ev.type });
      verifierEcriture(marque);
    } catch (e) {
      console.error('ami-abonnement', ev.type, ev.id, e instanceof Error ? e.message : e);
      return json(req, { recu: false }, 500); // Stripe réessaiera.
    }
    return json(req, { recu: true });
  }

  return new Response('', { status: 405, headers: corsHeaders });
});
