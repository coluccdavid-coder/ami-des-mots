// Ami des mots — v6.12 : socle commun des matières traduites (allemand, italien, portugais) et noms de la physique-chimie.
// Les calculs de physique (vitesse, poids, énergie, masse volumique, électricité) sont fabriqués directement dans chaque langue.
window.MATIERES_LANGUES = window.MATIERES_LANGUES || {};
(function(ML){
  const BASE = {
    de:{ doux:['Fast!', 'Nicht schlimm, das passiert.', 'Guter Versuch!'],
      cash:['🔥 Im Ernst?', '🔥 Nicht mal im Traum.', '🔥 Meilenweit daneben.', '🔥 Plumo wäre fast von seinem Ast gefallen.', '🔥 Durchatmen. Noch mal.', '🔥 Mutig. Falsch, aber mutig.'],
      bravo:['Richtig! Plumo steckt seinen Spruch weg… vorerst. 😏', 'Genau! Plumo fällt nichts mehr ein.', 'Ja! Plumo klatscht mit den Flügeln. 👏', 'Perfekt! Ich notiere… und behalte dich im Blick. 🦉'] },
    it:{ doux:['Quasi!', 'Non fa niente, capita.', 'Bel tentativo!'],
      cash:['🔥 Sul serio?', '🔥 Neanche per sogno.', '🔥 Mancato di parecchio.', '🔥 Plumo è quasi caduto dal ramo.', '🔥 Respira. Si ricomincia.', '🔥 Audace. Sbagliato, ma audace.'],
      bravo:['Giusto! Plumo mette via la battuta… per ora. 😏', 'Esatto! Plumo non sa cosa dire.', 'Sì! Plumo applaude con le ali. 👏', 'Perfetto! Prendo nota… e osservo. 🦉'] },
    pt:{ doux:['Quase!', 'Não faz mal, acontece.', 'Boa tentativa!'],
      cash:['🔥 A sério?', '🔥 Nem em sonhos.', '🔥 Falhou por muito.', '🔥 O Plumo quase caiu do ramo.', '🔥 Respira. Vamos outra vez.', '🔥 Ousado. Errado, mas ousado.'],
      bravo:['Certo! O Plumo guarda a piada… por agora. 😏', 'Exato! O Plumo não tem nada a dizer.', 'Sim! O Plumo bate as asas. 👏', 'Perfeito! Tomo nota… e fico de olho. 🦉'] }
  };
  for(const l in BASE){ const d = ML[l] = ML[l] || {}; for(const k in BASE[l]) if(!d[k]) d[k] = BASE[l][k]; d.noms = d.noms || {}; d.q = d.q || {}; }
  const PHYS = {
    es:{ nom:'Física y química', dom:{ 'Chimie':'Química', 'Physique':'Física', 'Matière':'Materia', 'Physique-chimie':'Física y química' }, ch:{ elec:'Electricidad', mouvement:'Velocidad y peso', energie:'Energía', 'masse-vol':'Densidad' } },
    de:{ nom:'Physik und Chemie', dom:{ 'Chimie':'Chemie', 'Physique':'Physik', 'Matière':'Materie', 'Physique-chimie':'Physik und Chemie' }, ch:{ elec:'Elektrizität', mouvement:'Geschwindigkeit und Gewichtskraft', energie:'Energie', 'masse-vol':'Dichte' } },
    it:{ nom:'Fisica e chimica', dom:{ 'Chimie':'Chimica', 'Physique':'Fisica', 'Matière':'Materia', 'Physique-chimie':'Fisica e chimica' }, ch:{ elec:'Elettricità', mouvement:'Velocità e peso', energie:'Energia', 'masse-vol':'Densità' } },
    pt:{ nom:'Física e química', dom:{ 'Chimie':'Química', 'Physique':'Física', 'Matière':'Matéria', 'Physique-chimie':'Física e química' }, ch:{ elec:'Eletricidade', mouvement:'Velocidade e peso', energie:'Energia', 'masse-vol':'Massa volúmica' } }
  };
  for(const l in PHYS){ const d = ML[l]; if(!d) continue; d.noms = d.noms || {}; const x = d.noms.physique = d.noms.physique || { dom:{}, ch:{} };
    x.nom = x.nom || PHYS[l].nom; x.dom = Object.assign({}, PHYS[l].dom, x.dom || {}); x.ch = Object.assign({}, PHYS[l].ch, x.ch || {}); }
})(window.MATIERES_LANGUES);
