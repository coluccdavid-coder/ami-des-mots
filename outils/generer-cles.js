// Ami des mots — fabrique la paire de clés des certificats d'abonnement.
// À lancer UNE fois : node outils/generer-cles.js
//  · la clé PRIVÉE va dans les secrets Supabase (AMI_CLE_PRIVEE), jamais ailleurs ;
//  · la clé PUBLIQUE va dans CONFIG.CLE_PUBLIQUE (js/jeu.js) : elle peut être vue de tous.
'use strict';
const { webcrypto } = require('crypto');
(async () => {
  const k = await webcrypto.subtle.generateKey({ name:'ECDSA', namedCurve:'P-256' }, true, ['sign', 'verify']);
  const priv = await webcrypto.subtle.exportKey('jwk', k.privateKey), pub = await webcrypto.subtle.exportKey('jwk', k.publicKey);
  console.log('\n1) Secret Supabase (à garder pour vous) :\n');
  console.log("supabase secrets set AMI_CLE_PRIVEE='" + JSON.stringify(priv) + "'");
  console.log('\n2) Dans js/jeu.js, CONFIG :\n');
  console.log('CLE_PUBLIQUE:' + JSON.stringify({ kty:pub.kty, crv:pub.crv, x:pub.x, y:pub.y }));
  console.log('\nPuis : node outils/construire-sw.js\n');
})();
