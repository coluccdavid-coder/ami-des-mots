// Ami des mots — coin admin : choisir ce qui est gratuit et ce qui est dans Plus.
// Cette page ne change rien en direct chez les joueurs : elle fabrique le fichier js/offre.js,
// qu'on remplace dans le dépôt GitHub (voir COIN-ADMIN.md). Le brouillon reste sur cet appareil.
(function(){
  'use strict';
  // Mêmes sortes de jeux que js/jeu.js (MECAS) ; un test vérifie qu'elles correspondent.
  const JEUX = [
    ['decouvrir', '📖', 1], ['quel_mot', '🖼️', 3], ['vrai_faux', '✅', 3], ['ombre', '🌑', 3], ['devinette', '🌫️', 3], ['intrus', '🧐', 3], ['panier', '🧺', 2],
    ['ecoute', '👂', 3], ['ecoute_mot', '🎧', 3], ['traduction', '🌍', 3], ['traduction_inverse', '🔁', 3],
    ['premiere_lettre', '🅰️', 3], ['lettre_manquante', '✏️', 3], ['lettres', '🔤', 3],
    ['memoire', '🧠', 3], ['memoire_trad', '🃏', 3], ['relier', '🔗', 3], ['chrono', '⏱️', 1], ['grand_quiz', '🏁', 1]
  ];
  // Mêmes coins que js/jeu.js (COINS) ; un test vérifie qu'ils correspondent.
  const COINS = [
    ['Coin anglais', [['pieges', '🪤', 'Pièges des francophones'], ['situations', '☕', 'Situations de la vie'], ['histoires', '📚', 'Histoires'], ['dictee', '✍️', 'Dictée rigolote'], ['parcours', '🗺️', 'Parcours'], ['phrases', '🧩', 'Atelier des phrases']]],
    ['Battles', [['battle', '🎤', 'Battle de vannes'], ['rap', '🎧', 'Rap battle (scène 8 temps)'], ['tournoi', '🏆', 'Tournoi en famille'], ['defi-pote', '🔗', 'Défi entre potes (lien)'], ['salon', '🚀', 'Salon en ligne (battles à distance)']]],
    ['Pour rire', [['trompe', '🦉', 'Plumo se trompe exprès'], ['oreilles', '👂', 'Les oreilles de Plumo'], ['vraifaux', '✅', 'Vrai ou faux rigolo'], ['avent', '🎄', 'Calendrier de l’Avent'], ['betisier', '📺', 'Bêtisier'], ['maison', '🏠', 'Maison de Plumo']]],
    ['Maths et sciences', [['maths', '🔢', 'Coin maths (6e → Terminale)'], ['sciences', '🚀', 'Labo des sciences']]],
    ['Mondes 3D', [['village3d', '🌍', 'Village 3D'], ['motscity', '🛵', 'Mots City']]]
  ];
  const TOUS_COINS = COINS.flatMap(([, l]) => l.map(c => c[0]));
  const DEFAUT = { MODE_PAYANT:false, PRIX:'5,99 €', THEMES_GRATUITS:['animaux', 'manger', 'maison', 'ville', 'nature', 'corps', 'ecole', 'transports'], JEUX_GRATUITS:['decouvrir', 'ecoute', 'quel_mot', 'traduction', 'vrai_faux', 'ombre', 'devinette', 'intrus', 'panier', 'ecoute_mot', 'traduction_inverse', 'premiere_lettre', 'lettre_manquante', 'lettres', 'memoire', 'memoire_trad', 'relier', 'chrono', 'grand_quiz'], JOUEURS_GRATUITS:6, COINS_PLUS:[] };
  const CLE = 'ami_admin_brouillon';
  const THEMES = window.THEMES || [];
  const nomTheme = th => ((window.TEXTES || {}).fr || {})['th_' + th] || th;
  const nomJeu = m => ((window.TEXTES || {}).fr || {})['j_' + m] || m;
  const esc = s => String(s).replace(/[&<>"']/g, c => ({ '&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;', "'":'&#39;' })[c]);

  // Lecture prudente d'une offre (même règles que le jeu).
  function propre(o){
    const r = JSON.parse(JSON.stringify(DEFAUT)); if(!o || typeof o !== 'object') return r;
    const liste = (x, connus) => Array.isArray(x) ? [...new Set(x.filter(e => connus.includes(e)))] : null;
    if(typeof o.MODE_PAYANT === 'boolean') r.MODE_PAYANT = o.MODE_PAYANT;
    if(typeof o.PRIX === 'string' && o.PRIX.trim() && o.PRIX.length <= 20) r.PRIX = o.PRIX.trim();
    const th = liste(o.THEMES_GRATUITS, THEMES); if(th) r.THEMES_GRATUITS = th;
    const je = liste(o.JEUX_GRATUITS, JEUX.map(j => j[0])); if(je) r.JEUX_GRATUITS = je;
    const co = liste(o.COINS_PLUS, TOUS_COINS); if(co) r.COINS_PLUS = co;
    if(Number.isInteger(o.JOUEURS_GRATUITS) && o.JOUEURS_GRATUITS >= 1 && o.JOUEURS_GRATUITS <= 6) r.JOUEURS_GRATUITS = o.JOUEURS_GRATUITS;
    return r;
  }
  const publiee = () => propre(window.OFFRE_AMI);
  let offre = (() => { try{ const b = JSON.parse(localStorage.getItem(CLE)); if(b) return propre(b); }catch(e){} return publiee(); })();
  const garder = () => { try{ localStorage.setItem(CLE, JSON.stringify(offre)); }catch(e){} };

  function bilan(o){
    const totalJeux = JEUX.reduce((n, j) => n + j[2], 0);
    const jeux = JEUX.filter(j => o.JEUX_GRATUITS.includes(j[0])).reduce((n, j) => n + j[2], 0);
    const coins = TOUS_COINS.filter(c => !o.COINS_PLUS.includes(c)).length;
    const alertes = [];
    if(o.MODE_PAYANT){
      if(!o.THEMES_GRATUITS.length) alertes.push('Aucun thème gratuit : un joueur gratuit ne pourra jouer à aucun jeu de mots.');
      if(!o.JEUX_GRATUITS.length) alertes.push('Aucune sorte de jeu gratuite : la découverte du jeu sera vide.');
      if(o.THEMES_GRATUITS.length === THEMES.length && o.JEUX_GRATUITS.length === JEUX.length && !o.COINS_PLUS.length && o.JOUEURS_GRATUITS >= 6) alertes.push('Tout est gratuit : Plus n’apporte plus rien.');
    }
    return { jeux, totalJeux, themes:o.THEMES_GRATUITS.length, totalThemes:THEMES.length, coins, totalCoins:TOUS_COINS.length, alertes };
  }

  // Le fichier js/offre.js, prêt à remplacer celui du dépôt.
  function fichier(o){
    const l = a => '[' + a.map(x => "'" + x + "'").join(', ') + ']';
    return '// Ami des mots — ce qui est gratuit et ce qui est dans Plus.\n' +
      '// Fichier fabriqué par le coin admin (admin.html) le ' + new Date().toISOString().slice(0, 10) + '.\n' +
      '// Remplacer js/offre.js dans le dépôt par ce fichier (voir COIN-ADMIN.md).\n' +
      '// Il ne donne jamais Plus à personne : il dit seulement ce qui est réservé à Plus.\n' +
      '// Plus lui-même ne s\'ouvre qu\'avec un certificat signé par le serveur.\n' +
      'window.OFFRE_AMI = {\n' +
      '  // false : tout est ouvert, aucun paiement.\n' +
      '  MODE_PAYANT:' + o.MODE_PAYANT + ',\n' +
      "  PRIX:'" + o.PRIX.replace(/['\\\n]/g, '') + "',\n" +
      '  // Thèmes de mots gratuits (les autres sont dans Plus).\n' +
      '  THEMES_GRATUITS:' + l(o.THEMES_GRATUITS) + ',\n' +
      '  // Sortes de jeux gratuites, à tous leurs niveaux.\n' +
      '  JEUX_GRATUITS:' + l(o.JEUX_GRATUITS) + ',\n' +
      '  // Nombre de joueurs gratuits (6 au plus avec Plus).\n' +
      '  JOUEURS_GRATUITS:' + o.JOUEURS_GRATUITS + ',\n' +
      '  // Coins réservés à Plus (vide : tous les coins sont gratuits).\n' +
      '  COINS_PLUS:' + l(o.COINS_PLUS) + '\n' +
      '};\n';
  }
  const pareil = (a, b) => JSON.stringify(a) === JSON.stringify(b);

  const $ = s => document.querySelector(s);
  const interrupteur = (nom, gratuit, attr, val, detail) => '<label class="choix ' + (gratuit ? 'gratuit' : 'plus') + '"><input type="checkbox" data-' + attr + '="' + esc(val) + '"' + (gratuit ? ' checked' : '') + '>' +
    '<span class="nom">' + nom + (detail ? ' <small>' + esc(detail) + '</small>' : '') + '</span><span class="etat">' + (gratuit ? '🆓 Gratuit' : '✨ Plus') + '</span></label>';

  function afficher(){
    const o = offre, b = bilan(o), change = !pareil(o, publiee());
    $('#app').innerHTML =
      '<header><h1>🛠️ Coin admin — Gratuit ou Plus</h1><p>Coche ce qui est <strong>gratuit</strong>. Ce qui n’est pas coché est réservé à <strong>Plus ✨</strong>.</p><p>💡 Avec le serveur en ligne, règle tout <strong>en direct</strong> (payant, prix, liens Stripe) dans le compte admin protégé : <code>https://ton-domaine.fr/serveur/admin/</code> (voir COIN-ADMIN.md).</p></header>' +
      '<section class="resume" aria-live="polite"><div><b>' + b.themes + '/' + b.totalThemes + '</b> thèmes gratuits</div><div><b>' + b.jeux + '/' + b.totalJeux + '</b> jeux gratuits</div><div><b>' + b.coins + '/' + b.totalCoins + '</b> coins gratuits</div><div><b>' + o.JOUEURS_GRATUITS + '</b> joueur' + (o.JOUEURS_GRATUITS > 1 ? 's' : '') + ' gratuit' + (o.JOUEURS_GRATUITS > 1 ? 's' : '') + '</div></section>' +
      (b.alertes.length ? '<div class="alerte" role="alert">⚠️ ' + b.alertes.map(esc).join('<br>⚠️ ') + '</div>' : '') +
      '<section><h2>💶 L’offre</h2>' +
        '<label class="ligne"><input type="checkbox" id="mode"' + (o.MODE_PAYANT ? ' checked' : '') + '> Offre Plus activée <small>(décoché : tout est gratuit, aucun paiement)</small></label>' +
        '<label class="ligne">Prix affiché <input id="prix" maxlength="20" value="' + esc(o.PRIX) + '"></label>' +
        '<label class="ligne">Joueurs gratuits <input id="joueurs" type="number" min="1" max="6" value="' + o.JOUEURS_GRATUITS + '"> <small>(Plus : 6)</small></label></section>' +
      '<fieldset' + (o.MODE_PAYANT ? '' : ' disabled') + '>' +
      '<section><h2>🗂️ Thèmes de mots</h2><div class="grille">' + THEMES.map(th => interrupteur(esc(nomTheme(th)), o.THEMES_GRATUITS.includes(th), 'theme', th)).join('') + '</div></section>' +
      '<section><h2>🎮 Jeux de mots</h2><div class="grille">' + JEUX.map(([m, ic, n]) => interrupteur(ic + ' ' + esc(nomJeu(m)), o.JEUX_GRATUITS.includes(m), 'jeu', m, n > 1 ? n + ' niveaux' : '1 jeu')).join('') + '</div></section>' +
      COINS.map(([titre, l]) => '<section><h2>' + esc(titre) + '</h2><div class="grille">' + l.map(([c, ic, nom]) => interrupteur(ic + ' ' + esc(nom), !o.COINS_PLUS.includes(c), 'coin', c)).join('') + '</div></section>').join('') +
      '</fieldset>' +
      '<section class="publier"><h2>📦 Publier</h2>' +
        '<p>' + (change ? '✏️ Tu as des changements par rapport à l’offre en ligne.' : '✅ C’est exactement l’offre en ligne.') + '</p>' +
        '<p class="boutons"><button id="telecharger"' + (change ? '' : ' disabled') + '>⬇️ Télécharger offre.js</button> <button id="copier">📋 Copier le fichier</button> <button id="annuler"' + (change ? '' : ' disabled') + '>↩️ Revenir à l’offre en ligne</button></p>' +
        '<p class="petit">Ensuite : remplace <code>js/offre.js</code> dans le dépôt, lance <code>npm run verifier</code>, puis publie (voir COIN-ADMIN.md). Les joueurs voient la nouvelle offre à leur prochaine visite.</p>' +
        '<details><summary>Voir le fichier</summary><pre id="apercu">' + esc(fichier(o)) + '</pre></details></section>';
  }

  document.addEventListener('change', ev => {
    const e = ev.target, o = offre, bascule = (l, x, dans) => { const i = l.indexOf(x); if(dans && i < 0) l.push(x); if(!dans && i >= 0) l.splice(i, 1); };
    if(e.id === 'mode') o.MODE_PAYANT = e.checked;
    else if(e.id === 'prix') o.PRIX = e.value.trim().slice(0, 20) || DEFAUT.PRIX;
    else if(e.id === 'joueurs') o.JOUEURS_GRATUITS = Math.max(1, Math.min(6, parseInt(e.value, 10) || 1));
    else if(e.dataset.theme) bascule(o.THEMES_GRATUITS, e.dataset.theme, e.checked);
    else if(e.dataset.jeu) bascule(o.JEUX_GRATUITS, e.dataset.jeu, e.checked);
    else if(e.dataset.coin) bascule(o.COINS_PLUS, e.dataset.coin, !e.checked);
    else return;
    // Ordre stable : celui des listes du jeu.
    o.THEMES_GRATUITS = THEMES.filter(x => o.THEMES_GRATUITS.includes(x));
    o.JEUX_GRATUITS = JEUX.map(j => j[0]).filter(x => o.JEUX_GRATUITS.includes(x));
    o.COINS_PLUS = TOUS_COINS.filter(x => o.COINS_PLUS.includes(x));
    garder(); afficher();
  });
  document.addEventListener('click', ev => {
    const id = ev.target.id;
    if(id === 'telecharger'){
      const a = document.createElement('a'); a.href = URL.createObjectURL(new Blob([fichier(offre)], { type:'text/javascript' })); a.download = 'offre.js';
      document.body.appendChild(a); a.click(); a.remove(); setTimeout(() => URL.revokeObjectURL(a.href), 2000);
    }
    else if(id === 'copier'){ const t = fichier(offre); (navigator.clipboard ? navigator.clipboard.writeText(t) : Promise.reject()).then(() => { ev.target.textContent = '✅ Copié'; }, () => { ev.target.textContent = '❌ Copie impossible : utilise « Voir le fichier »'; }); }
    else if(id === 'annuler'){ offre = publiee(); try{ localStorage.removeItem(CLE); }catch(e){} afficher(); }
  });
  window.AdminAmi = { JEUX, COINS, TOUS_COINS, propre, bilan, fichier, get offre(){ return offre; } };
  afficher();
})();
