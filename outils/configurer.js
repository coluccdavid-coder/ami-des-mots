// Ami des mots — branche le site sur son serveur PHP, sans toucher au code du jeu.
// node outils/configurer.js --serveur https://ami-des-mots.fr/serveur/ [--cle-publique '{"kty":"EC",…}']
//                           [--paiement https://buy.stripe.com/…] [--gestion https://billing.stripe.com/…]
// Écrit js/config-site.js et ajoute l'adresse du serveur à la sécurité du contenu (CSP) de index.html.
// Puis : npm run verifier
'use strict';
const fs = require('fs'), path = require('path'), ICI = path.join(__dirname, '..');
const a = process.argv.slice(2), lire = n => { const i = a.indexOf(n); return i >= 0 ? a[i + 1] : undefined; };
const f = path.join(ICI, 'js/config-site.js'), actuel = {};
try{ const w = { CONFIG_JEU:undefined }; new Function('window', fs.readFileSync(f, 'utf8'))(w); Object.assign(actuel, w.CONFIG_JEU); }catch(e){}
const c = Object.assign({ SERVEUR:'', CLE_PUBLIQUE:null, LIEN_PAIEMENT:'', LIEN_GESTION:'' }, actuel);
const https = (u, nom) => { let x; try{ x = new URL(u); }catch(e){} if(!x || x.protocol !== 'https:') { console.error(nom + ' doit être une adresse https://'); process.exit(1); } return x; };
if(lire('--serveur') !== undefined){ const u = lire('--serveur'); c.SERVEUR = u ? https(u, '--serveur').href.replace(/\/?$/, '/') : ''; }
if(lire('--cle-publique') !== undefined){ const k = JSON.parse(lire('--cle-publique')); if(k.d) { console.error('Refus : c’est la clé PRIVÉE. Donnez la clé publique.'); process.exit(1); } c.CLE_PUBLIQUE = { kty:k.kty, crv:k.crv, x:k.x, y:k.y }; }
if(lire('--paiement') !== undefined) c.LIEN_PAIEMENT = lire('--paiement') ? https(lire('--paiement'), '--paiement').href : '';
if(lire('--gestion') !== undefined) c.LIEN_GESTION = lire('--gestion') ? https(lire('--gestion'), '--gestion').href : '';
fs.writeFileSync(f, "// Ami des mots — réglages PUBLICS du site (aucun secret ici). Fabriqué par : node outils/configurer.js\n" +
  "// Vide : le jeu marche sans serveur (pas d'abonnement, pas de salon en direct, pas d'IA).\n" +
  'window.CONFIG_JEU = Object.assign(' + JSON.stringify(c, null, 2) + ', window.CONFIG_JEU || {});\n');
// CSP : 'self' + Supabase (option) + l'origine du serveur si elle est ailleurs.
const ih = path.join(ICI, 'index.html'); let h = fs.readFileSync(ih, 'utf8');
const origine = c.SERVEUR ? new URL(c.SERVEUR).origin : '';
h = h.replace(/connect-src [^;]*;/, "connect-src 'self'" + (origine ? ' ' + origine : '') + ' https://*.supabase.co wss://*.supabase.co;');
fs.writeFileSync(ih, h);
console.log('✔ js/config-site.js et index.html mis à jour.' + (origine ? ' Serveur : ' + c.SERVEUR : ' (sans serveur)') + '\nPuis : npm run verifier');
