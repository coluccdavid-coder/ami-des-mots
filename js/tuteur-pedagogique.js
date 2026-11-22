/* Ami des Mots — interface locale du professeur pédagogique.
 * V1 du contrat : ne fabrique jamais de règle. Les aides doivent provenir
 * d'un contenu pédagogique validé transmis par le jeu.
 */
(function(root){
  'use strict';
  const MAX = 420;
  const texte = x => typeof x === 'string' ? x.slice(0, MAX) : '';
  function aide(contenu, demande){
    if(!contenu || typeof contenu !== 'object') return null;
    const type = ['indice','explication','exemple'].includes(demande) ? demande : 'indice';
    const champ = type === 'indice' ? 'indice' : type === 'exemple' ? 'exemple' : 'explication';
    const valeur = texte(contenu[champ]);
    if(!valeur.trim()) return null;
    return Object.freeze({
      type,
      notion: texte(contenu.notion).slice(0, 80),
      texte: valeur,
      source: 'contenu-valide'
    });
  }
  root.AMI_TUTEUR_LOCAL = Object.freeze({ aide });
})(typeof window !== 'undefined' ? window : globalThis);
