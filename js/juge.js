// Ami des mots — le juge de vannes de Plumo.
// Il fait la part des choses AVANT qu'une vanne arrive à un enfant (vannes de la famille, futures vannes générées) :
//   ✅ on taquine la confusion, Plumo, ou une situation absurde ;
//   ❌ on ne vise jamais la personne : insultes, moqueries sur le physique, gros mots, violence, discriminations,
//      informations personnelles (liens, numéros, e-mails, @pseudos).
// Puis il apprend des réactions de la famille : 😂 « je la garde » fait monter une vanne, 🙄 « pas drôle » la fait
// descendre ; sous un certain seuil, elle est retirée automatiquement.
// Ce n'est pas une IA « magique » : des règles claires, testées, et l'avis de la famille.
(function(){
  const bas = s => String(s || '').normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();
  const GROS = ['merde', 'putain', 'connard', 'connasse', 'salope', 'pute', 'encule', 'batard', 'nique', 'ntm', 'fdp', 'pd', 'bordel', 'chier', 'couille', 'bite', 'cul',
    'fuck', 'shit', 'bitch', 'bastard', 'asshole', 'dick', 'crap', 'damn', 'piss', 'wtf'];
  const INSULTES = ['nul', 'nulle', 'nuls', 'bete', 'betes', 'idiot', 'idiote', 'stupide', 'debile', 'abruti', 'abrutie', 'cretin', 'cretine', 'imbecile', 'naze', 'boulet', 'con', 'conne', 'moche', 'laid', 'laide', 'gros', 'grosse', 'nain', 'naine',
    'stupid', 'dumb', 'idiot', 'moron', 'loser', 'ugly', 'fat', 'useless', 'silly', 'lame'];
  const VIOLENCE = ['tuer', 'tue', 'meurs', 'creve', 'crever', 'frapper', 'tape', 'taper', 'baffe', 'gifle', 'sang', 'couteau', 'arme', 'pistolet', 'fusil', 'bombe',
    'kill', 'die', 'dead', 'blood', 'knife', 'gun', 'punch', 'slap', 'hit you'];
  const DISCRIM = ['mongol', 'gogol', 'triso', 'retarde', 'autiste', 'handicape', 'negre', 'bougnoule', 'feuj', 'youpin', 'pede', 'tapette', 'gouine', 'chinetoque', 'bamboula', 'retard', 'retarded', 'faggot', 'nigger', 'spastic'];
  // « tu es / t'es / you are / you're » + mot blessant = on vise la personne.
  const VISE = /\b(tu es|t es|tu as l air|t as l air|t es vraiment|t es trop|vous etes|ta mere|ton pere|ta soeur|ton frere|you are|you re|youre|ur|your mom|your mum|your face|ta tete|ta face|ton nez|tes dents|tes oreilles)\b/;
  const mots = t => bas(t).replace(/[’']/g, ' ').replace(/[^a-z0-9 ]/g, ' ').split(/\s+/).filter(Boolean);
  function juger(texte){
    // « wesh gros », « …, gros » : on interpelle un pote, ce n'est pas une moquerie (« t'es gros » reste refusé).
    const t = String(texte || ''), sansAppel = t.replace(/\b(wesh|tranquille|salut|merci|allez|eh|oh)[\s,]+gros\b/gi, '$1').replace(/,\s*gros\b/gi, ',');
    const raisons = [], m = mots(sansAppel), phrase = ' ' + m.join(' ') + ' ';
    if(!t.trim()) raisons.push('vide');
    if(t.length > 300) raisons.push('trop longue');
    if(m.some(x => GROS.includes(x))) raisons.push('gros mot');
    if(m.some(x => DISCRIM.includes(x))) raisons.push('moquerie blessante (origine, handicap…)');
    if(VIOLENCE.some(v => phrase.includes(' ' + v + ' '))) raisons.push('violence');
    if(VISE.test(phrase) && m.some(x => INSULTES.includes(x))) raisons.push('vise la personne');
    if(/ (ta mere|ton pere|ta daronne|ton daron|your mom|your mum|yo mama|your mother) /.test(phrase)) raisons.push('vise la famille de quelqu’un');
    if(/\b(https?:\/\/|www\.)/i.test(t) || /\S+@\S+\.\S+/.test(t) || /@\w{2,}/.test(t) || /\+?\d[\d .-]{6,}\d/.test(t)) raisons.push('information personnelle');
    return { ok:!raisons.length, raisons };
  }
  // Apprentissage : un score par vanne (😂 +2, 🙄 -3). Retirée sous -2.
  const SEUIL = -2;
  function noter(scores, texte, delta){
    const o = scores && typeof scores === 'object' ? scores : {};
    const k = String(texte).slice(0, 300); o[k] = Math.max(-20, Math.min(20, (Number(o[k]) || 0) + delta));
    const cles = Object.keys(o); if(cles.length > 300) delete o[cles.sort((a, b) => Math.abs(o[a]) - Math.abs(o[b]))[0]];
    return o;
  }
  const retiree = (scores, texte) => !!scores && (Number(scores[String(texte).slice(0, 300)]) || 0) <= SEUIL;
  const poids = (scores, texte) => { const s = scores ? Number(scores[String(texte).slice(0, 300)]) || 0 : 0; return s <= SEUIL ? 0 : s >= 4 ? 4 : s >= 2 ? 3 : 1; };
  window.JUGE = { juger, noter, retiree, poids, SEUIL };
})();
