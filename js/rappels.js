// Ami des mots — v5.95 : rappels pour revenir jouer (appli Android / iOS seulement).
// Notifications locales planifiées sur l'appareil (@capacitor/local-notifications) : rien ne passe par un serveur.
// Désactivés par défaut ; l'appli demande la permission seulement quand le joueur les allume.
// - id 1 : rappel quotidien à l'heure choisie ;
// - id 2 : « série en danger » ce soir à 20 h si la série dure depuis 2 jours ou plus et qu'on n'a pas encore joué aujourd'hui.
(function(){
  'use strict';
  const QUOTIDIEN = 1, DANGER = 2;
  const plugin = () => window.Capacitor && Capacitor.isNativePlatform && Capacitor.isNativePlatform() && Capacitor.Plugins && Capacitor.Plugins.LocalNotifications || null;
  async function permission(p){
    try{ let s = await p.checkPermissions(); if(s.display !== 'granted') s = await p.requestPermissions(); return s.display === 'granted'; }catch(e){ return false; }
  }
  async function annuler(p, ids){ try{ await p.cancel({ notifications:ids.map(id => ({ id })) }); }catch(e){} }
  // reglage : { actif, heure:0-23 } ; etat : { serie, joueAujourdhui } ; textes : { titre, corps, dangerTitre, dangerCorps }
  async function planifier(reglage, etat, textes, maintenant){
    const p = plugin(); if(!p) return { ok:false, raison:'web' };
    await annuler(p, [QUOTIDIEN, DANGER]);
    if(!reglage || !reglage.actif) return { ok:true, planifies:[] };
    if(!(await permission(p))) return { ok:false, raison:'permission' };
    const h = Math.max(0, Math.min(23, reglage.heure | 0)), n = maintenant || new Date(), liste = [];
    liste.push({ id:QUOTIDIEN, title:textes.titre, body:textes.corps, schedule:{ on:{ hour:h, minute:0 }, allowWhileIdle:true } });
    const soir = new Date(n); soir.setHours(20, 0, 0, 0);
    if(etat && etat.serie >= 2 && !etat.joueAujourdhui && soir > n && h !== 20)
      liste.push({ id:DANGER, title:textes.dangerTitre, body:textes.dangerCorps, schedule:{ at:soir, allowWhileIdle:true } });
    try{ await p.schedule({ notifications:liste }); return { ok:true, planifies:liste.map(x => x.id) }; }catch(e){ return { ok:false, raison:'erreur' }; }
  }
  window.RAPPELS = { dispo:() => !!plugin(), planifier, QUOTIDIEN, DANGER };
})();
