// Ami des mots — fabrique la paire de clés des certificats d'abonnement Plus.
// À lancer UNE fois : node outils/generer-cles.js [dossier]
//  · la clé PRIVÉE est écrite dans ami-cle-privee.pem (serveur PHP : à poser HORS du site, à côté de
//    config-ami.php) et affichée au format Supabase si vous gardez Supabase ; jamais dans GitHub ;
//  · la clé PUBLIQUE va dans CONFIG.CLE_PUBLIQUE (js/jeu.js) : elle peut être vue de tous.
'use strict';
const { generateKeyPairSync } = require('crypto'), fs = require('fs'), path = require('path');
const dossier = process.argv[2] || '.';
const { privateKey, publicKey } = generateKeyPairSync('ec', { namedCurve:'P-256' });
const fichier = path.join(dossier, 'ami-cle-privee.pem');
if(fs.existsSync(fichier)){ console.error('Refus : ' + fichier + ' existe déjà (ne pas écraser une clé en service).'); process.exit(1); }
fs.writeFileSync(fichier, privateKey.export({ type:'pkcs8', format:'pem' }), { mode:0o600 });
const priv = privateKey.export({ format:'jwk' }), pub = publicKey.export({ format:'jwk' });
console.log('\n1) Serveur PHP : ' + fichier + ' → à déposer hors du site (voir serveur-php/LISEZMOI.md).');
console.log('   (Supabase, si vous le gardez : supabase secrets set AMI_CLE_PRIVEE=\'' + JSON.stringify(priv) + '\')');
console.log('\n2) Dans js/jeu.js, CONFIG :\n');
console.log('CLE_PUBLIQUE:' + JSON.stringify({ kty:pub.kty, crv:pub.crv, x:pub.x, y:pub.y }));
console.log('\nPuis : npm run verifier\n');
