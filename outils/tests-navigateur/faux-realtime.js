// Faux serveur « Supabase Realtime » (protocole Phoenix v1) pour tester le salon sans compte Supabase.
// Usage : node faux-realtime.js [port]  (ws://localhost:8790/realtime/v1/websocket)
const { WebSocketServer } = require('ws');
const port = +(process.argv[2] || 8790), sujets = new Map(); // sujet -> Map(ws -> {cle, meta})
const wss = new WebSocketServer({ port, path:'/realtime/v1/websocket' });
const envoyer = (ws, m) => { try{ ws.send(JSON.stringify(m)); }catch(e){} };
const tous = (topic, m) => { for(const ws of (sujets.get(topic) || new Map()).keys()) envoyer(ws, m); };
function partir(ws, topic){ const s = sujets.get(topic); if(!s || !s.has(ws)) return; const { cle, meta } = s.get(ws); s.delete(ws); if(meta) tous(topic, { topic, event:'presence_diff', payload:{ joins:{}, leaves:{ [cle]:{ metas:[meta] } } }, ref:null }); }
wss.on('connection', (ws, req) => {
  if(!/apikey=anon-test/.test(req.url)) return ws.close(4001, 'clé');
  ws.on('message', d => { let m; try{ m = JSON.parse(d); }catch(e){ return; } const { topic, event, payload, ref } = m;
    if(event === 'heartbeat') return envoyer(ws, { topic:'phoenix', event:'phx_reply', payload:{ status:'ok', response:{} }, ref });
    if(event === 'phx_join'){ if(!sujets.has(topic)) sujets.set(topic, new Map()); sujets.get(topic).set(ws, { cle:payload.config.presence.key, meta:null });
      envoyer(ws, { topic, event:'phx_reply', payload:{ status:'ok', response:{} }, ref });
      const etat = {}; for(const v of sujets.get(topic).values()) if(v.meta) etat[v.cle] = { metas:[v.meta] }; envoyer(ws, { topic, event:'presence_state', payload:etat, ref:null }); return; }
    const s = sujets.get(topic); if(!s || !s.has(ws)) return;
    if(event === 'presence'){ const v = s.get(ws); v.meta = payload.payload; tous(topic, { topic, event:'presence_diff', payload:{ joins:{ [v.cle]:{ metas:[v.meta] } }, leaves:{} }, ref:null }); }
    else if(event === 'broadcast') tous(topic, { topic, event:'broadcast', payload:{ type:'broadcast', event:payload.event, payload:payload.payload }, ref:null });
    else if(event === 'phx_leave') partir(ws, topic);
  });
  ws.on('close', () => { for(const t of sujets.keys()) partir(ws, t); });
});
console.log('faux realtime sur ' + port);
