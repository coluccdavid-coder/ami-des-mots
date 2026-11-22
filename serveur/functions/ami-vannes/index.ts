// Ami des mots — générateur de vannes (Claude), validé par un adulte.
// POST { code:"AMI-…", theme:"animaux"|…, ton:"tout-doux"|"normal"|"corse" }
// → { vannes:["« {f} » ? …", …] }  (6 propositions au plus ; rien n'est publié sans un adulte).
// Réservé aux abonnés Plus actifs (protège le crédit API), 5 demandes par jour et par code.
// Déployer avec --no-verify-jwt.
//
// Secrets : ANTHROPIC_API_KEY (jamais dans le navigateur ni dans le dépôt), SUPABASE_URL,
// SUPABASE_SERVICE_ROLE_KEY. Facultatif : AMI_MODELE (défaut claude-haiku-5-5).
// CORS : AMI_ORIGINES=https://jeu.example
import { createClient } from 'npm:@supabase/supabase-js@2';

const CLE_API = Deno.env.get('ANTHROPIC_API_KEY') ?? '';
const MODELE = Deno.env.get('AMI_MODELE') ?? 'claude-haiku-5-5';
const ORIGINES = (Deno.env.get('AMI_ORIGINES') ?? '*').split(',').map(x => x.trim()).filter(Boolean);
const db = createClient(Deno.env.get('SUPABASE_URL') ?? '', Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '');
const FORMAT = /^AMI-[A-Z0-9]{4}-[A-Z0-9]{4}-[A-Z0-9]{4}$/;
const ACTIFS = ['active', 'trialing', 'past_due'];
const THEMES = ['animaux', 'manger', 'maison', 'habits', 'nature', 'ville', 'musique', 'atelier', 'anglais'];
const TONS: Record<string, string> = {
  'tout-doux': 'très douces, pour des enfants de 5 à 8 ans, sans aucune moquerie',
  'normal': 'taquines et absurdes, pour des enfants de 7 à 12 ans',
  'corse': 'plus piquantes et absurdes, pour des ados, mais toujours gentilles'
};
const PAR_JOUR = 5;

// Les règles : ce sont les mêmes que celles du juge d'Ami (js/juge.js), qui revérifie tout chez l'utilisateur.
const SYSTEME = `Tu écris des vannes pour « Ami des mots », un jeu familial où des enfants francophones apprennent
l'anglais avec Ami, un hibou farceur. Une vanne sort quand l'enfant confond deux mots.
Règles absolues :
- On taquine la CONFUSION ou Ami lui-même, JAMAIS la personne : ni son physique, ni son intelligence, ni sa famille
  (pas de « ta mère »), ni son origine, sa religion, son genre, un handicap.
- Aucun gros mot, aucune violence, rien de sexuel, rien d'effrayant, aucune info personnelle, aucune marque, aucune
  personne réelle, aucune référence à un film, une chanson ou un personnage protégé.
- Humour absurde et visuel, bienveillant ; l'enfant doit rire et retenir le bon mot.
- En français, 140 caractères au plus. Utilise {f} pour le mauvais mot et {j} pour le bon mot (au moins {j}).
Réponds UNIQUEMENT par un tableau JSON de 6 chaînes, sans autre texte.`;

function cors(req: Request): Headers {
  const h = new Headers({ 'Access-Control-Allow-Methods': 'POST, OPTIONS', 'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type', 'Vary': 'Origin', 'Cache-Control': 'no-store' });
  const o = req.headers.get('origin');
  if (ORIGINES.includes('*')) h.set('Access-Control-Allow-Origin', '*'); else if (o && ORIGINES.includes(o)) h.set('Access-Control-Allow-Origin', o);
  return h;
}
const json = (req: Request, data: unknown, status = 200) => { const h = cors(req); h.set('Content-Type', 'application/json'); return new Response(JSON.stringify(data), { status, headers: h }); };

// Nettoyage de la réponse du modèle : chaînes courtes, sans balises ni liens, avec {j}.
export function propositions(texte: string): string[] {
  let l: unknown; try { l = JSON.parse(texte.slice(texte.indexOf('['), texte.lastIndexOf(']') + 1)); } catch (_) { return []; }
  if (!Array.isArray(l)) return [];
  return [...new Set(l.filter((x): x is string => typeof x === 'string')
    .map(x => x.replace(/[<>]/g, '').replace(/\s+/g, ' ').trim())
    .filter(x => x.length >= 10 && x.length <= 140 && x.includes('{j}') && !/https?:|www\.|@/i.test(x)))].slice(0, 6);
}

Deno.serve(async (req) => {
  const o = req.headers.get('origin');
  if (!ORIGINES.includes('*') && o && !ORIGINES.includes(o)) return json(req, { erreur: 'origine_interdite' }, 403);
  if (req.method === 'OPTIONS') return new Response(null, { status: 204, headers: cors(req) });
  if (req.method !== 'POST') return json(req, { erreur: 'methode' }, 405);
  if (!CLE_API) return json(req, { erreur: 'non_configure' }, 503);
  let corps: any; try { corps = await req.json(); } catch (_) { return json(req, { erreur: 'requete' }, 400); }
  const code = String(corps?.code ?? ''), theme = THEMES.includes(corps?.theme) ? corps.theme : 'animaux', ton = TONS[corps?.ton] ? corps.ton : 'normal';
  if (!FORMAT.test(code)) return json(req, { erreur: 'plus_requis' }, 403);

  const { data, error } = await db.from('ami_abonnements').select('statut, fin').eq('code', code).maybeSingle();
  if (error) return json(req, { erreur: 'indisponible' }, 503);
  if (!data || !ACTIFS.includes(data.statut) || !data.fin || Date.parse(data.fin) <= Date.now()) return json(req, { erreur: 'plus_requis' }, 403);

  const quota = await db.rpc('ami_compter_vannes', { p_code: code, p_max: PAR_JOUR });
  if (quota.error) return json(req, { erreur: 'indisponible' }, 503);
  if (quota.data === false) return json(req, { erreur: 'quota', max: PAR_JOUR }, 429);

  const r = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: { 'x-api-key': CLE_API, 'anthropic-version': '2023-06-01', 'content-type': 'application/json' },
    body: JSON.stringify({ model: MODELE, max_tokens: 700, system: SYSTEME,
      messages: [{ role: 'user', content: `Thème des mots : ${theme}. Vannes ${TONS[ton]}. Donne 6 vannes variées.` }] })
  }).catch(() => null);
  if (!r || !r.ok) { console.error('ami-vannes API', r?.status); return json(req, { erreur: 'ia_indisponible' }, 502); }
  const rep = await r.json();
  const texte = (rep?.content ?? []).filter((b: any) => b.type === 'text').map((b: any) => b.text).join('');
  return json(req, { vannes: propositions(texte) });
});
