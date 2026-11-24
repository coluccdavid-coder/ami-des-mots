// Ami des mots — v6.0 : outils communs des modules (js/mod-*.js).
// Un module : ajoute ses textes (français + [en, es, de, it, pt]), ses actions data-a et ses cartes dans les écrans.
(function(){
  'use strict';
  const M = window.AMI_MODULES = window.AMI_MODULES || { actions:{}, hooks:{ reponse:[], question:[] }, cartes:{ battle:[], matiere:[], parents:[], anglais:[], accueil:[], plus:[] } };
  if(!M.cartes.plus) M.cartes.plus = [];
  if(!M.hooks.question) M.hooks.question = [];
  const api = () => M.api;
  // Textes : clé = français ; valeur = [en, es, de, it, pt]. Une autre langue prend l'anglais ; le français reste le français.
  M.textes = function(o){ window.TRAD_ECRANS = window.TRAD_ECRANS || {}; Object.assign(window.TRAD_ECRANS, o); };
  M.tx = function(fr, ...v){ const ui = api() ? api().base().ui : 'fr'; let s = fr;
    if(ui !== 'fr'){ const t = (window.TRAD_ECRANS || {})[fr]; if(t) s = t[{ en:0, es:1, de:2, it:3, pt:4 }[ui] != null ? { en:0, es:1, de:2, it:3, pt:4 }[ui] : 0]; }
    return v.length ? s.replace(/\{(\d)\}/g, (x, i) => v[+i] != null ? String(v[+i]) : '') : s; };
  // Adresse d'un point d'accès du serveur (vide si le jeu n'a pas de serveur).
  M.serveur = function(fichier){ const s = api() && api().CONFIG.SERVEUR; return s ? String(s).replace(/\/?$/, '/') + fichier : ''; };
  // Envoi JSON au serveur : { ok, statut, d } ; jamais d'exception.
  M.envoyer = async function(fichier, corps){
    const u = M.serveur(fichier); if(!u || typeof fetch !== 'function') return { ok:false, statut:0, d:null };
    try{ const r = await fetch(u, { method:'POST', cache:'no-store', credentials:'omit', headers:{ 'Content-Type':'application/json' }, body:JSON.stringify(corps) });
      const d = await r.json().catch(() => null); return { ok:r.ok, statut:r.status, d }; }catch(e){ return { ok:false, statut:0, d:null }; }
  };
  // Jeton d'appareil au hasard (jamais un nom) ; le serveur n'en garde que l'empreinte.
  M.jeton = function(){ const b = api().base(); if(!b.jetonAppareil || !/^[A-Za-z0-9_-]{24,64}$/.test(b.jetonAppareil)){
    const o = new Uint8Array(24); (window.crypto || {}).getRandomValues ? crypto.getRandomValues(o) : o.forEach((x, i) => o[i] = Math.random() * 256);
    b.jetonAppareil = Array.from(o, x => 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_'[x & 63]).join(''); api().garder(); }
    return b.jetonAppareil; };
  // Pseudo acceptable : 2 à 16 caractères simples, accepté par le juge de Plumo, pas de numéro.
  M.pseudoOk = function(p){ p = String(p || '').trim().replace(/\s+/g, ' ');
    return /^[\p{L}\p{N} _'-]{2,16}$/u.test(p) && !/\d{5,}/.test(p) && (!window.JUGE || JUGE.juger(p).ok) ? p : null; };
  M.carte = (a, v, ic, titre, sous) => '<button class="carte-anglais" data-a="' + a + '"' + (v ? ' data-v="' + v + '"' : '') + '><span class="ic">' + ic + '</span><strong>' + titre + '</strong><small>' + sous + '</small></button>';
})();
