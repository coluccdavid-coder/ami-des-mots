// Ami des mots — le salon des battles à distance (comme un salon d'attente de jeu en ligne).
// Connexion : Supabase Realtime (diffusion + présence), protocole Phoenix sur WebSocket, sans bibliothèque.
// Rien n'est enregistré sur le serveur : les messages passent, c'est tout. Seule la clé PUBLIQUE « anon » est utilisée.
// Sécurité enfants : salons publics = réactions toutes faites uniquement ; chat libre seulement en salon privé,
// si un parent l'a activé ; filtre à la RÉCEPTION (gros mots, liens, numéros, e-mails, @pseudos) ; joueurs muets.
(function(){
  // ── Questions mélangées, identiques sur tous les téléphones (même graine) ──
  function questionsMixtes(graine, n){
    const R = window.RIGOLADE, P = window.PIEGES, A = window.ANGLAIS, rnd = R.hasardGraine(graine);
    const tirer = l => l[Math.floor(rnd() * l.length)];
    // Questions « qu'a dit Ami ? » retirées seulement si JEUX_ECOUTE_CACHE.
    const types = ['piege', 'battle', 'vf'].concat(window.CONFIG_JEU && CONFIG_JEU.JEUX_ECOUTE_CACHE ? [] : ['oreille']), vus = new Set(), out = [];
    for(let i = 0; out.length < n && i < n * 20; i++){
      const t = types[out.length % types.length]; let q = null;
      if(t === 'piege' && P){ const p = tirer(P.liste); q = { id:'p:' + p.id, consigne:'Comment dit-on en anglais ?', enonce:'🇫🇷 ' + p.fr, bon:p.bon, faux:p.faux.slice(0, 2), regle:p.regle, dire:p.bon }; }
      if(t === 'battle' && A){ const b = tirer(A.BATTLE); q = { id:'b:' + b.ami, consigne:'🦉 Ami se vante : choisis la meilleure réplique !', enonce:'« ' + b.ami + ' »', ecoute:b.ami, bon:b.bon.en, faux:b.faux, regle:'🇫🇷 ' + b.bon.fr, dire:b.bon.en }; }
      if(t === 'vf' && R){ const v = tirer(R.VRAI_FAUX); q = { id:'v:' + v.en, consigne:'True or false?', enonce:'« ' + v.en + ' »', ecoute:v.en, trad:v.fr, bon:v.vrai ? 'True' : 'False', faux:[{ en:v.vrai ? 'False' : 'True', vanne:v.rire }], regle:'😂 ' + v.rire, dire:v.en }; }
      if(t === 'oreille' && R){ const p = tirer(R.PAIRES), cible = rnd() < .5 ? p.a : p.b, autre = cible === p.a ? p.b : p.a;
        q = { id:'o:' + cible.en, consigne:'👂 Écoute : qu’a dit Ami ?', enonce:'', ecoute:cible.en, bon:cible.e, bonTexte:cible.e + ' ' + cible.en + ' = ' + cible.fr, faux:[{ en:autre.e, vanne:'« ' + autre.en + ' » au lieu de « ' + cible.en + ' » : ' + p.rire }], dire:cible.en }; }
      if(q && !vus.has(q.id)){ vus.add(q.id); out.push(q); }
    }
    return out;
  }

  // ── Filtre des messages reçus (chat libre des salons privés) ──
  const GROS = ['merde', 'putain', 'connard', 'connasse', 'salope', 'pute', 'enculé', 'encule', 'batard', 'bâtard', 'nique', 'ntm', 'fdp', 'pd', 'conne', 'con', 'abruti', 'débile', 'idiot', 'stupide', 'nul', 'nulle', 'moche', 'gros porc',
    'fuck', 'shit', 'bitch', 'bastard', 'asshole', 'dick', 'stupid', 'idiot', 'dumb', 'ugly', 'loser', 'kill', 'tuer', 'crève', 'creve'];
  const CONTACT = /(snap|insta|tiktok|discord|whats ?app|telegram|messenger|facebook|fb|signal|adresse|address|t[ée]l[ée]phone|phone|num[ée]ro|number)/i;
  function filtrer(texte){
    let t = String(texte || '').replace(/[\u0000-\u001f\u007f<>]/g, ' ').slice(0, 80);
    const masques = [];
    t = t.replace(/\b(https?:\/\/|www\.)\S+/gi, () => { masques.push('lien'); return '🚫'; });
    t = t.replace(/\S+@\S+\.\S+/g, () => { masques.push('e-mail'); return '🚫'; });
    t = t.replace(/@\w+/g, () => { masques.push('pseudo'); return '🚫'; });
    t = t.replace(/(\+?\d[\d .-]{5,}\d)/g, () => { masques.push('numéro'); return '🚫'; });
    if(CONTACT.test(t)){ masques.push('contact'); t = t.replace(new RegExp(CONTACT.source, 'gi'), '🚫'); }
    const bas = s => s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();
    t = t.split(/(\s+)/).map(m => { const x = bas(m).replace(/[^a-z]/g, ''); return GROS.some(g => bas(g).replace(/[^a-z ]/g, '') === x) ? (masques.push('gros mot'), '🤐') : m; }).join('');
    return { texte:t.trim(), masques };
  }

  // Réactions toutes faites (seules autorisées dans les salons publics).
  const REACTIONS = [
    { id:'gg', e:'🤝', en:'Good game!', fr:'Bien joué !' }, { id:'nice', e:'👏', en:'Nice one!', fr:'Joli coup !' },
    { id:'lol', e:'😂', en:'LOL!', fr:'Mdr !' }, { id:'wow', e:'😮', en:'Wow!', fr:'Waouh !' },
    { id:'again', e:'🔁', en:'Again?', fr:'On rejoue ?' }, { id:'hello', e:'👋', en:'Hello!', fr:'Salut !' },
    { id:'oops', e:'🙈', en:'Oops!', fr:'Oups !' }, { id:'fire', e:'🔥', en:'On fire!', fr:'En feu !' }
  ];
  const LETTRES = 'ABCDEFGHJKLMNPQRSTUVWXYZ';   // sans I ni O (confusion avec 1 et 0)
  const nouveauCode = rnd => Array.from({ length:5 }, () => LETTRES[Math.floor((rnd || Math.random)() * LETTRES.length)]).join('');
  const codeValide = c => typeof c === 'string' && /^[A-HJ-NP-Z]{5}$/.test(c);
  // Score d'une manche : 100 si juste, + bonus de rapidité (jusqu'à 50) ; 0 si faux.
  const points = (juste, ms, limite) => juste ? 100 + Math.round(50 * Math.max(0, 1 - ms / limite)) : 0;

  // ── Connexion Supabase Realtime (protocole Phoenix v1) ──
  function connecter(url, cle, opts){
    opts = opts || {};
    const WS = opts.WebSocket || window.WebSocket;
    const adresse = url.replace(/^http/, 'ws').replace(/\/$/, '') + '/realtime/v1/websocket?apikey=' + encodeURIComponent(cle) + '&vsn=1.0.0';
    let ws = null, ref = 0, battement = null, ouvert = false;
    const canaux = new Map(), file = [];
    const envoyerBrut = m => { m.ref = String(++ref); const s = JSON.stringify(m); if(ouvert) ws.send(s); else file.push(s); };
    function ouvrir(){
      ws = new WS(adresse);
      ws.onopen = () => { ouvert = true; while(file.length) ws.send(file.shift()); battement = setInterval(() => envoyerBrut({ topic:'phoenix', event:'heartbeat', payload:{} }), 25000); };
      ws.onclose = () => { ouvert = false; clearInterval(battement); for(const c of canaux.values()) c.h.ferme && c.h.ferme(); };
      ws.onerror = () => { for(const c of canaux.values()) c.h.erreur && c.h.erreur(); };
      ws.onmessage = ev => {
        let m; try{ m = JSON.parse(ev.data); }catch(e){ return; }
        const c = canaux.get(m.topic); if(!c) return;
        if(m.event === 'phx_reply' && m.payload && m.payload.status === 'ok' && !c.rejoint){ c.rejoint = true; c.h.rejoint && c.h.rejoint(); }
        else if(m.event === 'broadcast' && m.payload) c.h.message && c.h.message(m.payload.event, m.payload.payload || {});
        else if(m.event === 'presence_state') { c.presence = {}; for(const [k, v] of Object.entries(m.payload || {})) c.presence[k] = (v.metas || [])[0]; c.h.presence && c.h.presence(c.presence); }
        else if(m.event === 'presence_diff'){
          for(const [k, v] of Object.entries((m.payload || {}).joins || {})) c.presence[k] = (v.metas || [])[0];
          for(const k of Object.keys((m.payload || {}).leaves || {})) delete c.presence[k];
          c.h.presence && c.h.presence(c.presence);
        }
      };
    }
    ouvrir();
    return {
      // Rejoint « realtime:<sujet> ». cle : identifiant de présence (unique par joueur).
      rejoindre(sujet, cleP, h){
        const topic = 'realtime:' + sujet, c = { h:h || {}, presence:{}, rejoint:false };
        canaux.set(topic, c);
        envoyerBrut({ topic, event:'phx_join', payload:{ config:{ broadcast:{ self:true, ack:false }, presence:{ key:cleP }, private:false } } });
        return {
          envoyer:(event, payload) => envoyerBrut({ topic, event:'broadcast', payload:{ type:'broadcast', event, payload } }),
          suivre:meta => envoyerBrut({ topic, event:'presence', payload:{ type:'presence', event:'track', payload:meta } }),
          quitter:() => { envoyerBrut({ topic, event:'phx_leave', payload:{} }); canaux.delete(topic); },
          get presence(){ return c.presence; }
        };
      },
      fermer(){ clearInterval(battement); try{ ws.close(); }catch(e){} canaux.clear(); }
    };
  }
  // ── Connexion au serveur PHP (serveur-php/salon.php) : sans Supabase, sur un hébergement mutualisé ──
  // Même interface que connecter() ; on relève les nouvelles environ chaque seconde (3 s si l'appli est cachée).
  function connecterPhp(base, opts){
    opts = opts || {};
    const F = opts.fetch || window.fetch.bind(window), adresse = base.replace(/\/?$/, '/') + 'salon.php';
    const canaux = new Map(); let minuteur = null, ferme = false, enCours = false;
    const poster = corps => F(adresse, { method:'POST', headers:{ 'Content-Type':'application/json' }, body:JSON.stringify(corps), cache:'no-store' }).then(r => r.json());
    const pareil = (a, b) => JSON.stringify(Object.keys(a).sort()) === JSON.stringify(Object.keys(b).sort()) && Object.keys(a).every(k => JSON.stringify(a[k]) === JSON.stringify(b[k]));
    async function relever(){
      if(ferme || enCours) return; const l = [...canaux.values()].filter(c => c.rejoint); if(!l.length) return planifier();
      enCours = true;
      try{
        const r = await poster({ action:'relever', canaux:l.map(c => ({ sujet:c.sujet, cle:c.cle, depuis:c.depuis })) });
        for(const c of l){ const d = r && r.canaux && r.canaux[c.sujet]; if(!d || !canaux.has(c.sujet)) continue;
          for(const m of d.messages || []){ c.depuis = Math.max(c.depuis, m.id); c.h.message && c.h.message(m.ev, m.p || {}); }
          const p = d.presence && typeof d.presence === 'object' ? d.presence : {};
          if(!pareil(p, c.presence)){ c.presence = p; c.h.presence && c.h.presence(c.presence); } }
        for(const c of l) c.erreurs = 0;
      }catch(e){ for(const c of l) if(++c.erreurs === 5) c.h.erreur && c.h.erreur(); }
      enCours = false; planifier();
    }
    function planifier(){ clearTimeout(minuteur); if(!ferme) minuteur = setTimeout(relever, typeof document !== 'undefined' && document.hidden ? 3000 : 1000); }
    return {
      rejoindre(sujet, cleP, h){
        const c = { sujet:String(sujet).toLowerCase(), cle:String(cleP).toLowerCase(), h:h || {}, presence:{}, rejoint:false, depuis:0, erreurs:0, meta:null };
        canaux.set(c.sujet, c);
        poster({ action:'rejoindre', sujet:c.sujet, cle:c.cle }).then(r => { if(!r || !r.ok) throw 0; c.depuis = r.dernier || 0; c.rejoint = true; c.h.rejoint && c.h.rejoint(); if(c.meta) poster({ action:'suivre', sujet:c.sujet, cle:c.cle, meta:c.meta }); relever(); })
          .catch(() => { c.h.erreur && c.h.erreur(); });
        return {
          envoyer:(event, payload) => { poster({ action:'envoyer', sujet:c.sujet, evenement:event, charge:payload || {} }).then(() => relever(), () => {}); },
          suivre:meta => { c.meta = meta; if(c.rejoint) poster({ action:'suivre', sujet:c.sujet, cle:c.cle, meta }).then(() => relever(), () => {}); },
          quitter:() => { canaux.delete(c.sujet); poster({ action:'quitter', sujet:c.sujet, cle:c.cle }).catch(() => {}); },
          get presence(){ return c.presence; }
        };
      },
      fermer(){ ferme = true; clearTimeout(minuteur); for(const c of canaux.values()) poster({ action:'quitter', sujet:c.sujet, cle:c.cle }).catch(() => {}); canaux.clear(); }
    };
  }
  window.SALON = { questionsMixtes, filtrer, REACTIONS, nouveauCode, codeValide, points, connecter, connecterPhp, PUBLIC:'ami-salons-publics' };
})();
