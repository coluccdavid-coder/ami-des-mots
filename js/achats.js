// Ami des mots — v5.94 : achats de Plus DANS L'APPLI (Google Play Billing, achat intégré Apple),
// avec le module cordova-plugin-purchase (ajouté par .github/workflows/android.yml). Sur le site : inactif.
// Chaque achat est envoyé au serveur (magasin.php), qui le vérifie auprès de Google / Apple et renvoie
// un certificat signé : le téléphone n'ouvre jamais Plus tout seul.
(function(){
  'use strict';
  const PRODUITS = { mensuel:'plus_mensuel', annuel:'plus_annuel', famille:'plus_famille', a_vie:'plus_a_vie' };
  const natif = () => !!(window.Capacitor && typeof Capacitor.isNativePlatform === 'function' && Capacitor.isNativePlatform() && window.CdvPurchase && CdvPurchase.store);
  let pret = false, reglages = null;
  function plateforme(){ const P = CdvPurchase.Platform; return Capacitor.getPlatform() === 'ios' ? P.APPLE_APPSTORE : P.GOOGLE_PLAY; }
  // Envoie l'achat au serveur ; renvoie sa réponse ({ actif, jeton }) ou null.
  async function verifierAuServeur(produit, jeton){
    if(!reglages || !reglages.api || !jeton) return null;
    try{
      const r = await fetch(reglages.api, { method:'POST', cache:'no-store', headers:{ 'Content-Type':'application/json' },
        body:JSON.stringify({ code:reglages.code(), plateforme:Capacitor.getPlatform() === 'ios' ? 'apple' : 'google', produit, jeton }) });
      const d = await r.json().catch(() => null);
      return d && typeof d.actif === 'boolean' ? d : null;
    }catch(e){ return null; }
  }
  // Le jeton à vérifier : jeton d'achat Google (purchaseId) ou n° de transaction Apple.
  const jetonDe = t => t && (t.purchaseId || t.transactionId) ? String(t.purchaseId || t.transactionId) : '';
  async function init(options){
    reglages = options;
    if(pret || !natif()) return false;
    const { store, ProductType } = CdvPurchase, p = plateforme();
    store.register(Object.keys(PRODUITS).map(k => ({ id:PRODUITS[k], platform:p, type:k === 'a_vie' ? ProductType.NON_CONSUMABLE : ProductType.PAID_SUBSCRIPTION })));
    // Rattache l'achat au code AMI du joueur (empreinte, pas le code lui-même).
    store.applicationUsername = () => reglages.compte ? reglages.compte() : '';
    // Validation par NOTRE serveur (pas de service tiers).
    store.validator = async (recu, rappel) => {
      const t = (recu.transactions || [])[recu.transactions ? recu.transactions.length - 1 : 0] || recu, produit = ((t.products || [])[0] || {}).id || '';
      const d = await verifierAuServeur(produit, jetonDe(t));
      if(d && d.actif){ reglages.certificat(d); rappel({ ok:true, data:{ id:produit, latest_receipt:true, transaction:recu.nativeData || {} } }); }
      else rappel({ ok:false, code:6778003, message:'Achat non confirmé par le serveur' });
    };
    store.when().approved(t => t.verify()).verified(r => r.finish());
    await store.initialize([p]);
    pret = true; return true;
  }
  const produitDe = formule => pret ? CdvPurchase.store.get(PRODUITS[formule], plateforme()) : null;
  function prix(formule){ const x = produitDe(formule); return x && x.pricing && x.pricing.price ? x.pricing.price : ''; }
  async function acheter(formule){
    const x = produitDe(formule), o = x && x.getOffer && x.getOffer();
    if(!o) return { ok:false, raison:'indisponible' };
    const err = await o.order();
    return err ? { ok:false, raison:err.message || 'annule' } : { ok:true };
  }
  async function restaurer(){ if(!pret) return false; await CdvPurchase.store.restorePurchases(); return true; }
  window.ACHATS = { PRODUITS, natif, init, prix, acheter, restaurer };
})();
