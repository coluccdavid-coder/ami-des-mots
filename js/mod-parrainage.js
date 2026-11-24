// Ami des mots — v6.0 : parrainage. Lien d'invitation ?parrain=<code AMI> ; si la famille invitée prend Plus,
// la famille qui a invité reçoit un code cadeau d'un mois (serveur-php/parrainage.php). Seuls les codes AMI circulent.
(function(){
  'use strict';
  const M = window.AMI_MODULES; if(!M) return;
  M.textes({
    '🤝 Parraine une famille': ['🤝 Refer a family', '🤝 Recomienda a una familia', '🤝 Lade eine Familie ein', '🤝 Invita una famiglia', '🤝 Recomenda a uma família'],
    'Si elle prend Plus, tu reçois 1 mois offert (jusqu’à 12 par an).': ['If they get Plus, you get 1 free month (up to 12 a year).', 'Si contrata Plus, recibes 1 mes gratis (hasta 12 al año).', 'Wenn sie Plus nimmt, bekommst du 1 Gratismonat (bis zu 12 pro Jahr).', 'Se prende Plus, ricevi 1 mese gratis (fino a 12 all’anno).', 'Se ela aderir ao Plus, recebes 1 mês grátis (até 12 por ano).'],
    '📤 Envoyer mon lien': ['📤 Send my link', '📤 Enviar mi enlace', '📤 Meinen Link senden', '📤 Invia il mio link', '📤 Enviar o meu link'],
    'Viens apprendre en rigolant avec Plumo sur Ami des mots !': ['Come and learn while laughing with Plumo on Ami des mots!', '¡Ven a aprender riéndote con Plumo en Ami des mots!', 'Lern mit Spaß und Plumo bei Ami des mots!', 'Vieni a imparare ridendo con Plumo su Ami des mots!', 'Vem aprender a rir com o Plumo no Ami des mots!'],
    '🎁 Mois offerts grâce au parrainage :': ['🎁 Months earned through referrals:', '🎁 Meses ganados por recomendación:', '🎁 Durch Einladungen verdiente Monate:', '🎁 Mesi ottenuti con gli inviti:', '🎁 Meses ganhos por recomendação:'],
    'Utiliser': ['Redeem', 'Usar', 'Einlösen', 'Usa', 'Usar'],
    '{0} famille(s) invitée(s) n’ont pas encore pris Plus.': ['{0} invited family(ies) haven’t taken Plus yet.', '{0} familia(s) invitada(s) aún no han contratado Plus.', '{0} eingeladene Familie(n) hat/haben Plus noch nicht.', '{0} famiglia/e invitata/e non ha/hanno ancora preso Plus.', '{0} família(s) convidada(s) ainda não aderiu/aderiram ao Plus.'],
    '📋 Lien copié !': ['📋 Link copied!', '📋 ¡Enlace copiado!', '📋 Link kopiert!', '📋 Link copiato!', '📋 Link copiado!']
  });
  const tx = M.tx, api = () => M.api;
  const FORMAT = /^AMI-[A-Z0-9]{4}-[A-Z0-9]{4}-[A-Z0-9]{4}$/;
  const actif = () => { const A = api(); return !!(A.CONFIG.MODE_PAYANT && M.serveur('parrainage.php')); };
  async function lier(){
    const b = api().base(); if(!b.parrain || b.parrainLie || !b.abo || !FORMAT.test(b.abo.code) || b.parrain === b.abo.code || !M.serveur('parrainage.php')) return;
    const r = await M.envoyer('parrainage.php', { action:'lier', code:b.abo.code, parrain:b.parrain });
    if(r.ok && r.d){ b.parrainLie = true; api().garder(); }
  }
  M.cartes.plus.push(() => {
    if(!actif()) return '';
    setTimeout(chargerCadeaux, 0); lier();
    return '<section class="parrainage"><h3>' + tx('🤝 Parraine une famille') + '</h3><p class="petit">' + tx('Si elle prend Plus, tu reçois 1 mois offert (jusqu’à 12 par an).') + '</p>' +
      '<p><button class="moyen" data-a="parrainer">' + tx('📤 Envoyer mon lien') + '</button></p><div id="parrainage-cadeaux"></div><p class="aide" id="parrainage-msg" role="status"></p></section>';
  });
  async function chargerCadeaux(){
    const z = document.getElementById('parrainage-cadeaux'), b = api().base(); if(!z || !b.abo || !FORMAT.test(b.abo.code)) return;
    const r = await M.envoyer('parrainage.php', { action:'mes', code:b.abo.code }); if(!r.ok || !r.d || !document.body.contains(z)) return;
    const esc = api().esc, c = r.d.cadeaux || [];
    z.innerHTML = (c.length ? '<p>' + tx('🎁 Mois offerts grâce au parrainage :') + '</p><ul class="pieges-cats">' + c.map(x => '<li><code>' + esc(x.code) + '</code> <button class="petit-bouton" data-a="parrain-utiliser" data-v="' + esc(x.code) + '">' + tx('Utiliser') + '</button></li>').join('') + '</ul>' : '') +
      (r.d.en_attente ? '<p class="petit">' + esc(tx('{0} famille(s) invitée(s) n’ont pas encore pris Plus.', r.d.en_attente)) + '</p>' : '');
  }
  Object.assign(M.actions, {
    'parrainer': async () => { const b = api().base(), lien = location.origin + location.pathname + '?parrain=' + encodeURIComponent(b.abo.code), txt = tx('Viens apprendre en rigolant avec Plumo sur Ami des mots !'), m = document.getElementById('parrainage-msg');
      try{ if(navigator.share){ await navigator.share({ title:'Ami des mots', text:txt, url:lien }); return; } await navigator.clipboard.writeText(txt + ' ' + lien); if(m) m.textContent = tx('📋 Lien copié !'); }catch(e){ if(m) m.textContent = lien; } },
    // Le code cadeau va dans le formulaire « J'ai un code cadeau » de l'écran Plus (même vérification par le serveur).
    'parrain-utiliser': v => { const d = document.querySelector('details.deja'), i = document.getElementById('cadeau'); if(d) d.open = true; if(i){ i.value = v; i.focus(); const f = document.getElementById('form-cadeau'); if(f && f.requestSubmit) f.requestSubmit(); } }
  });
  M.auDemarrage = (M.auDemarrage || []).concat(() => { const p = new URLSearchParams(location.search).get('parrain'); const b = api().base();
    if(p && FORMAT.test(p) && !b.parrain && (!b.abo || p !== b.abo.code)){ b.parrain = p; api().garder(); lier(); } });
})();
