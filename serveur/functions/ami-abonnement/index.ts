// Ami des mots Plus — une seule fonction Supabase, deux rôles :
//  · GET  ?code=AMI-…   → { actif, fin }  (appelée par le jeu)
//  · POST (Stripe)      → webhook signé : enregistre / met à jour l'abonnement
// Déployer : supabase functions deploy ami-abonnement --no-verify-jwt
// Secrets  : supabase secrets set STRIPE_SECRET_KEY=sk_live_… STRIPE_WEBHOOK_SECRET=whsec_… AMI_ORIGINE=https://<adresse du jeu>
//            supabase secrets set AMI_CLE_PRIVEE='<JWK privée donnée par node outils/generer-cles.js>'
// Le jeu ne croit que les certificats signés ici : { c:code, f:fin } + signature ECDSA P-256.
import Stripe from 'npm:stripe@17';
import { createClient } from 'npm:@supabase/supabase-js@2';

const stripe = new Stripe(Deno.env.get('STRIPE_SECRET_KEY') ?? '');
const SECRET = Deno.env.get('STRIPE_WEBHOOK_SECRET') ?? '';
const ORIGINE = Deno.env.get('AMI_ORIGINE') ?? '*';
const db = createClient(Deno.env.get('SUPABASE_URL') ?? '', Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '');
const CLE_PRIVEE = Deno.env.get('AMI_CLE_PRIVEE') ?? '';
let cle: CryptoKey | null = null;
const b64u = (b: Uint8Array) => btoa(String.fromCharCode(...b)).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
async function signer(code: string, fin: string): Promise<string> {
  cle ??= await crypto.subtle.importKey('jwk', JSON.parse(CLE_PRIVEE), { name:'ECDSA', namedCurve:'P-256' }, false, ['sign']);
  const charge = b64u(new TextEncoder().encode(JSON.stringify({ c:code, f:fin })));
  const sig = new Uint8Array(await crypto.subtle.sign({ name:'ECDSA', hash:'SHA-256' }, cle, new TextEncoder().encode(charge)));
  return charge + '.' + b64u(sig);
}
const FORMAT = /^AMI-[A-Z0-9]{4}-[A-Z0-9]{4}-[A-Z0-9]{4}$/;
const ACTIFS = ['active', 'trialing', 'past_due'];   // past_due : Stripe relance le paiement, on laisse jouer

const entetes = { 'Access-Control-Allow-Origin':ORIGINE, 'Access-Control-Allow-Methods':'GET', 'Content-Type':'application/json', 'Cache-Control':'no-store' };
const json = (d: unknown, s = 200) => new Response(JSON.stringify(d), { status:s, headers:entetes });

// Fin de période : champ de l'abonnement (anciennes versions d'API) ou de son premier article (2025+).
function finDe(sub: Stripe.Subscription): string | null {
  const s = (sub as any).current_period_end ?? sub.items?.data?.[0]?.current_period_end;
  return s ? new Date(s * 1000).toISOString() : null;
}

Deno.serve(async (req) => {
  if(req.method === 'OPTIONS') return new Response(null, { headers:entetes });

  if(req.method === 'GET'){
    const code = new URL(req.url).searchParams.get('code') ?? '';
    if(!FORMAT.test(code)) return json({ actif:false });
    const { data } = await db.from('ami_abonnements').select('statut, fin').eq('code', code).maybeSingle();
    const actif = !!data && ACTIFS.includes(data.statut) && !!data.fin && Date.parse(data.fin) > Date.now();
    return json({ actif, fin:data?.fin ?? null, jeton:actif ? await signer(code, data!.fin) : null });
  }

  if(req.method === 'POST'){
    let ev: Stripe.Event;
    try{
      ev = await stripe.webhooks.constructEventAsync(await req.text(), req.headers.get('stripe-signature') ?? '', SECRET, undefined, Stripe.createSubtleCryptoProvider());
    }catch(_){ return new Response('signature invalide', { status:400 }); }

    if(ev.type === 'checkout.session.completed'){
      const s = ev.data.object as Stripe.Checkout.Session;
      const code = s.client_reference_id ?? '';
      if(s.mode === 'subscription' && FORMAT.test(code) && s.subscription){
        const sub = await stripe.subscriptions.retrieve(String(s.subscription));
        await db.from('ami_abonnements').upsert({ code, client:String(s.customer ?? ''), abonnement:sub.id, statut:sub.status, fin:finDe(sub), maj:new Date().toISOString() });
      }
    }
    if(ev.type === 'customer.subscription.updated' || ev.type === 'customer.subscription.deleted'){
      const sub = ev.data.object as Stripe.Subscription;
      await db.from('ami_abonnements').update({ statut:sub.status, fin:finDe(sub), maj:new Date().toISOString() }).eq('abonnement', sub.id);
    }
    return json({ recu:true });
  }
  return new Response('', { status:405 });
});
