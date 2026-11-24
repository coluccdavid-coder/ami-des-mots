// Ami des mots — v6.0 : une saison par mois. Objectif : 150 bonnes réponses dans le mois (tous les jeux comptent).
// Récompense : le badge du mois + la tenue exclusive de la saison pour Plumo (bonnet, fleur, casquette, chapeau de sorcière).
// Tout reste sur l'appareil.
(function(){
  'use strict';
  const M = window.AMI_MODULES; if(!M) return;
  const OBJECTIF = 150;
  // [émoji, nom FR, [en, es, de, it, pt], tenue]
  const SAISONS = [
    ['❄️', 'Saison des flocons', ['Snowflake season', 'Temporada de los copos', 'Schneeflocken-Saison', 'Stagione dei fiocchi', 'Temporada dos flocos'], 'bonnet'],
    ['🎭', 'Saison du carnaval', ['Carnival season', 'Temporada de carnaval', 'Karnevalssaison', 'Stagione del carnevale', 'Temporada do Carnaval'], 'bonnet'],
    ['🌱', 'Saison des pousses', ['Sprout season', 'Temporada de los brotes', 'Sprossen-Saison', 'Stagione dei germogli', 'Temporada dos rebentos'], 'fleur'],
    ['🐟', 'Saison des farceurs', ['Pranksters’ season', 'Temporada de los bromistas', 'Saison der Spaßvögel', 'Stagione dei burloni', 'Temporada dos brincalhões'], 'fleur'],
    ['🌸', 'Saison des fleurs', ['Flower season', 'Temporada de las flores', 'Blumen-Saison', 'Stagione dei fiori', 'Temporada das flores'], 'fleur'],
    ['☀️', 'Saison du soleil', ['Sunshine season', 'Temporada del sol', 'Sonnen-Saison', 'Stagione del sole', 'Temporada do sol'], 'casquette'],
    ['🏖️', 'Saison des vacances', ['Holiday season', 'Temporada de vacaciones', 'Ferien-Saison', 'Stagione delle vacanze', 'Temporada de férias'], 'casquette'],
    ['🍦', 'Saison des glaces', ['Ice-cream season', 'Temporada de los helados', 'Eis-Saison', 'Stagione dei gelati', 'Temporada dos gelados'], 'casquette'],
    ['🎒', 'Saison de la rentrée', ['Back-to-school season', 'Temporada de la vuelta al cole', 'Schulstart-Saison', 'Stagione del rientro', 'Temporada do regresso às aulas'], 'sorciere'],
    ['🎃', 'Saison des citrouilles', ['Pumpkin season', 'Temporada de las calabazas', 'Kürbis-Saison', 'Stagione delle zucche', 'Temporada das abóboras'], 'sorciere'],
    ['🍂', 'Saison des feuilles', ['Falling-leaves season', 'Temporada de las hojas', 'Blätter-Saison', 'Stagione delle foglie', 'Temporada das folhas'], 'sorciere'],
    ['🎄', 'Saison des étoiles', ['Star season', 'Temporada de las estrellas', 'Sternen-Saison', 'Stagione delle stelle', 'Temporada das estrelas'], 'bonnet']
  ];
  const TENUES = {
    bonnet:{ ic:'🧶', fr:'Bonnet d’hiver', t:['Winter hat', 'Gorro de invierno', 'Wintermütze', 'Berretto invernale', 'Gorro de inverno'], cadre:'27 -14 46 34',
      plat:'<defs><linearGradient id="bon3d" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stop-color="#ff6b6b"/><stop offset="1" stop-color="#b8282f"/></linearGradient></defs>' +
        '<path d="M31 14 Q31 -6 50 -7 Q69 -6 69 14 Z" fill="url(#bon3d)"/><path d="M38 12 L40 -2 M46 13 L47 -5 M54 13 L53 -5 M62 12 L60 -2" stroke="rgba(0,0,0,.18)" stroke-width="1.2"/>' +
        '<rect x="29" y="10" width="42" height="7" rx="3.5" fill="#f3f3f3"/><circle cx="50" cy="-9" r="5.5" fill="#fff"/><circle cx="48.5" cy="-10.5" r="2" fill="rgba(255,255,255,.9)"/>' },
    fleur:{ ic:'🌼', fr:'Fleur de printemps', t:['Spring flower', 'Flor de primavera', 'Frühlingsblume', 'Fiore di primavera', 'Flor de primavera'], cadre:'27 -14 46 34',
      plat:'<g transform="translate(63 6)">' + [0, 72, 144, 216, 288].map(a => '<ellipse rx="4.2" ry="7" fill="#ff9ecf" stroke="#e06aa8" stroke-width=".6" transform="rotate(' + a + ') translate(0 -6)"/>').join('') +
        '<circle r="4.2" fill="#ffd43b" stroke="#e0a800" stroke-width=".8"/><circle cx="-1.3" cy="-1.3" r="1.3" fill="#fff6c2"/></g><path d="M58 13 Q60 9 63 10" stroke="#2f9e44" stroke-width="2" fill="none"/>' },
    casquette:{ ic:'🧢', fr:'Casquette d’été', t:['Summer cap', 'Gorra de verano', 'Sommerkappe', 'Cappellino estivo', 'Boné de verão'], cadre:'27 -14 58 34',
      plat:'<defs><linearGradient id="cas3d" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stop-color="#4dabf7"/><stop offset="1" stop-color="#1864ab"/></linearGradient></defs>' +
        '<path d="M32 15 Q32 -4 50 -5 Q68 -4 68 15 Z" fill="url(#cas3d)"/><path d="M62 13 Q78 10 84 15 Q76 19 62 17 Z" fill="#1c7ed6"/><circle cx="50" cy="-4.5" r="2" fill="#1864ab"/>' +
        '<path d="M42 3 Q50 0 58 3" stroke="#fff" stroke-width="2.4" fill="none" stroke-linecap="round"/>' },
    sorciere:{ ic:'🎩', fr:'Chapeau de sorcière', t:['Witch hat', 'Sombrero de bruja', 'Hexenhut', 'Cappello da strega', 'Chapéu de bruxa'], cadre:'24 -26 52 46',
      plat:'<defs><linearGradient id="sor3d" x1="0" x2="1"><stop offset="0" stop-color="#3b2a66"/><stop offset=".5" stop-color="#6741d9"/><stop offset="1" stop-color="#2b1d52"/></linearGradient></defs>' +
        '<path d="M37 15 L57 -24 Q60 -25 59 -20 L64 15 Z" fill="url(#sor3d)"/><rect x="38" y="8" width="25" height="5" fill="#f59f00"/><rect x="47" y="7.5" width="6" height="6" rx="1" fill="none" stroke="#ffe066" stroke-width="1.4"/>' +
        '<ellipse cx="50" cy="15.5" rx="25" ry="4.6" fill="#2b1d52"/><path d="M27 15 Q50 12 73 15" stroke="rgba(255,255,255,.25)" stroke-width=".8" fill="none"/>' }
  };
  const tx = M.tx, api = () => M.api;
  M.textes({
    '{0} : {1}/{2} bonnes réponses ce mois-ci · récompense : badge + {3}': ['{0}: {1}/{2} right answers this month · reward: badge + {3}', '{0}: {1}/{2} respuestas correctas este mes · premio: insignia + {3}', '{0}: {1}/{2} richtige Antworten diesen Monat · Belohnung: Abzeichen + {3}', '{0}: {1}/{2} risposte giuste questo mese · premio: distintivo + {3}', '{0}: {1}/{2} respostas certas este mês · prémio: emblema + {3}'],
    '{0} réussie ! Badge gagné, et {1} pour Plumo (vestiaire). 🏅': ['{0} completed! Badge earned, and {1} for Plumo (wardrobe). 🏅', '¡{0} superada! Insignia ganada y {1} para Plumo (armario). 🏅', '{0} geschafft! Abzeichen verdient und {1} für Plumo (Kleiderschrank). 🏅', '{0} completata! Distintivo vinto e {1} per Plumo (guardaroba). 🏅', '{0} concluída! Emblema ganho e {1} para o Plumo (guarda-roupa). 🏅'],
    '🏅 {0} badge(s) de saison': ['🏅 {0} season badge(s)', '🏅 {0} insignia(s) de temporada', '🏅 {0} Saison-Abzeichen', '🏅 {0} distintivo/i di stagione', '🏅 {0} emblema(s) de temporada'],
    'Gagne une saison de {0}': ['Win a {0} season', 'Gana una temporada de {0}', 'Gewinne eine Saison im {0}', 'Vinci una stagione di {0}', 'Ganha uma temporada de {0}'],
    'l’hiver': ['winter', 'invierno', 'Winter', 'inverno', 'inverno'], 'printemps': ['spring', 'primavera', 'Frühling', 'primavera', 'primavera'], 'l’été': ['summer', 'verano', 'Sommer', 'estate', 'verão'], 'l’automne': ['autumn', 'otoño', 'Herbst', 'autunno', 'outono']
  });
  const RANG = { en:0, es:1, de:2, it:3, pt:4 };
  const nomSaison = (s, ui) => ui === 'fr' ? s[1] : s[2][RANG[ui] != null ? RANG[ui] : 0];
  const nomTenue = (k, ui) => ui === 'fr' ? TENUES[k].fr : TENUES[k].t[RANG[ui] != null ? RANG[ui] : 0];
  const mois = () => { const d = new Date(); return d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0'); };
  const saisonDe = m => SAISONS[(+m.slice(5) - 1 + 12) % 12];
  const QUART = { bonnet:'l’hiver', fleur:'printemps', casquette:'l’été', sorciere:'l’automne' };
  function etat(){ const j = api().J(); if(!j.saison || j.saison.mois !== mois()) j.saison = { mois:mois(), ok:0 }; if(!Array.isArray(j.badges)) j.badges = []; return j; }
  // Les tenues : débloquées par un badge d'une saison qui les donne.
  M.accessoires = M.accessoires || {};
  for(const [k, x] of Object.entries(TENUES)) M.accessoires[k] = { plat:x.plat, cadre:x.cadre, nom:ui => x.ic + ' ' + nomTenue(k, ui),
    debloque:() => { const j = api().J(); return Array.isArray(j.badges) && j.badges.some(b => saisonDe(b)[3] === k); },
    condition:() => tx('Gagne une saison de {0}', tx(QUART[k])) };
  M.hooks.reponse.push(ok => {
    if(!ok) return; const j = etat(); j.saison.ok++;
    if(j.saison.ok === OBJECTIF && !j.badges.includes(j.saison.mois)){ j.badges.push(j.saison.mois); const s = saisonDe(j.saison.mois), ui = api().base().ui;
      api().garder(); api().annonce(tx('{0} réussie ! Badge gagné, et {1} pour Plumo (vestiaire). 🏅', s[0] + ' ' + nomSaison(s, ui), nomTenue(s[3], ui))); try{ api().bruit('fin'); }catch(e){} }
  });
  M.cartes.accueil.push(ui => {
    const j = etat(), s = saisonDe(j.saison.mois), n = Math.min(OBJECTIF, j.saison.ok), fini = j.badges.includes(j.saison.mois), esc = api().esc;
    return '<button class="carte-saison' + (fini ? ' finie' : '') + '" data-a="vestiaire"><span class="saison-texte">' + esc(tx('{0} : {1}/{2} bonnes réponses ce mois-ci · récompense : badge + {3}', s[0] + ' ' + nomSaison(s, ui), n, OBJECTIF, TENUES[s[3]].ic + ' ' + nomTenue(s[3], ui))) + '</span>' +
      '<span class="saison-barre" aria-hidden="true"><i style="width:' + Math.round(100 * n / OBJECTIF) + '%"></i></span>' + (j.badges.length ? '<small>' + esc(tx('🏅 {0} badge(s) de saison', j.badges.length)) + '</small>' : '') + '</button>';
  });
  M.saisons = { SAISONS, TENUES, OBJECTIF, saisonDe, mois };
})();
