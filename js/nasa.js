// Ami des mots — v6.4 : « 🚀 Objectif NASA » (programme français) et « 🚀 Road to NASA » (programme anglais).
// Les diplômes et parcours pour travailler à la NASA (et à l'ESA, au CNES, à la UK Space Agency), les métiers,
// puis TOUS les exercices qui vont avec : fusées, orbites, communications, unités, vie à bord, missions,
// anglais de mission, code, et la géopolitique de l'espace. Calculs générés et vérifiés (tests).
// Sources des conditions : nasa.gov (astronautes, stages), esa.int (Graduate Trainees) — à jour fin 2026.
(function(){
  'use strict';
  const GM = { terre:3.986e14, lune:4.905e12, mars:4.283e13 }, RAYON = { terre:6371e3, lune:1737e3, mars:3390e3 }, g0 = 9.81;
  const un = (r, l) => l[Math.floor(r() * l.length)];
  const fmt = (lang, x, d = 2) => { const v = Math.round(x * 10 ** d) / 10 ** d; const s = String(Object.is(v, -0) ? 0 : v); return lang === 'fr' || lang === 'es' ? s.replace('.', ',') : s; };
  const Q = (enonce, bon, faux, regle) => { const vu = new Set([String(bon)]), f = [];
    for(const [x, v] of faux){ const s = String(x); if(!vu.has(s)){ vu.add(s); f.push({ en:s, vanne:v }); } } return { enonce, bon:String(bon), faux:f.slice(0, 3), regle }; };
  const T = (lang, fr, en, es) => lang === 'fr' ? fr : lang === 'es' && es !== undefined ? es : en;   // v6.18 : et l’espagnol
  // ───────── Générateurs bilingues ─────────
  const GEN = {
    fusees:[
      (r, L) => { const ve = un(r, [2.5, 3, 3.5, 4.4]), R = un(r, [2, 3, 4, 5, 8]), dv = ve * Math.log(R);
        return Q(T(L, 'Équation de Tsiolkovski : vitesse d’éjection ' + fmt(L, ve, 1) + ' km/s, rapport de masse m₀/m_f = ' + R + '. Quel Δv ?', 'Rocket equation: exhaust velocity ' + ve + ' km/s, mass ratio m₀/m_f = ' + R + '. What is Δv?', 'Ecuación de Tsiolkovski: velocidad de eyección ' + fmt(L, ve, 1) + ' km/s, razón de masas m₀/m_f = ' + R + '. ¿Cuál es el Δv?'),
          fmt(L, dv, 2) + ' km/s', [[fmt(L, ve * Math.log10(R), 2) + ' km/s', T(L, 'C’est le logarithme NÉPÉRIEN (ln), pas log₁₀.', 'It is the NATURAL log (ln), not log₁₀.', 'Es el logaritmo NEPERIANO (ln), no log₁₀.')], [fmt(L, ve * R, 1) + ' km/s', T(L, 'Multiplier par le rapport de masse ? La fusée irait un peu trop vite.', 'Multiplying by the mass ratio? That rocket would be a bit too fast.', '¿Multiplicar por la razón de masas? El cohete iría un poco demasiado rápido.')], [fmt(L, ve / R, 2) + ' km/s', T(L, 'Diviser ? Le carburant servirait à freiner.', 'Dividing? The fuel would be used to brake.', '¿Dividir? El combustible serviría para frenar.')]],
          'Δv = v_e × ln(m₀/m_f)'); },
      (r, L) => { const F = un(r, [7.6, 15, 35, 39]), m = un(r, [500, 1000, 2600, 3000]), tw = F * 1e6 / (m * 1000 * g0);
        return Q(T(L, 'Une fusée de ' + m + ' t a une poussée de ' + fmt(L, F, 1) + ' MN. Quel est son rapport poussée/poids (g = 9,81) ?', 'A ' + m + ' t rocket has ' + F + ' MN of thrust. What is its thrust-to-weight ratio (g = 9.81)?', 'Un cohete de ' + m + ' t tiene un empuje de ' + fmt(L, F, 1) + ' MN. ¿Cuál es su relación empuje/peso (g = 9,81)?'),
          fmt(L, tw, 2), [[fmt(L, F * 1e6 / (m * 1000), 2), T(L, 'Le poids, c’est m × g : tu as oublié g.', 'Weight is m × g: you forgot g.', 'El peso es m × g: te has olvidado de g.')], [fmt(L, F / m, 4), T(L, 'Attention aux unités : MN et tonnes, à convertir en N et kg.', 'Watch the units: MN and tonnes must become N and kg.', 'Cuidado con las unidades: MN y toneladas hay que pasarlos a N y kg.')]],
          T(L, 'Poussée ÷ (m × g). Il faut plus de 1 pour décoller.', 'Thrust ÷ (m × g). It must be above 1 to lift off.', 'Empuje ÷ (m × g). Tiene que ser mayor que 1 para despegar.')); },
      (r, L) => { const F = un(r, [30, 35, 39]), m = un(r, [1000, 1500, 2000, 2600]), a = F * 1e6 / (m * 1000) - g0;
        return Q(T(L, 'Au décollage : poussée ' + F + ' MN, masse ' + m + ' t. Accélération verticale (g = 9,81 m/s²) ?', 'At liftoff: thrust ' + F + ' MN, mass ' + m + ' t. Vertical acceleration (g = 9.81 m/s²)?', 'En el despegue: empuje ' + F + ' MN, masa ' + m + ' t. ¿Aceleración vertical (g = 9,81 m/s²)?'),
          fmt(L, a, 2) + ' m/s²', [[fmt(L, a + g0, 2) + ' m/s²', T(L, 'Tu as oublié le poids qui tire vers le bas : a = F/m − g.', 'You forgot the weight pulling down: a = F/m − g.', 'Te olvidaste del peso que tira hacia abajo: a = F/m − g.')], [fmt(L, a + 2 * g0, 2) + ' m/s²', T(L, 'Le poids s’oppose à la poussée, il ne l’aide pas.', 'Weight opposes the thrust, it does not help.', 'El peso se opone al empuje; no lo ayuda.')]],
          'a = F/m − g'); }],
    orbites:[
      (r, L) => { const [nom, h] = un(r, [['ISS', 400], ['Hubble', 540], ['GPS', 20200], [T(L, 'géostationnaire', 'geostationary', 'geoestacionario'), 35786]]), v = Math.sqrt(GM.terre / (RAYON.terre + h * 1e3)) / 1e3;
        return Q(T(L, 'Vitesse d’un satellite en orbite circulaire à ' + h.toLocaleString('fr-FR') + ' km d’altitude (' + nom + ') ? (GM = 3,986 × 10¹⁴, R = 6 371 km)', 'Speed of a satellite in circular orbit at ' + h.toLocaleString('en-GB') + ' km altitude (' + nom + ')? (GM = 3.986 × 10¹⁴, R = 6,371 km)', '¿Velocidad de un satélite en órbita circular a ' + h.toLocaleString('es-ES') + ' km de altitud (' + nom + ')? (GM = 3,986 × 10¹⁴, R = 6371 km)'),
          fmt(L, v, 2) + ' km/s', [[fmt(L, Math.sqrt(GM.terre / (h * 1e3)) / 1e3, 2) + ' km/s', T(L, 'r se mesure depuis le CENTRE de la Terre : R + h.', 'r is measured from Earth’s CENTRE: R + h.', 'r se mide desde el CENTRO de la Tierra: R + h.')], [fmt(L, GM.terre / (RAYON.terre + h * 1e3) / 1e6, 1) + ' km/s', T(L, 'Il manque la racine carrée : v = √(GM/r).', 'You forgot the square root: v = √(GM/r).', 'Falta la raíz cuadrada: v = √(GM/r).')]],
          'v = √(GM / (R + h))'); },
      (r, L) => { const [nom, h] = un(r, [['ISS', 400], [T(L, 'géostationnaire', 'geostationary', 'geoestacionario'), 35786], ['GPS', 20200]]), rr = RAYON.terre + h * 1e3, t = 2 * Math.PI * Math.sqrt(rr ** 3 / GM.terre) / 60;
        const aff = x => x > 300 ? fmt(L, x / 60, 1) + ' h' : fmt(L, x, 0) + ' min';
        return Q(T(L, 'Période de l’orbite à ' + h.toLocaleString('fr-FR') + ' km (' + nom + ') ?', 'Orbital period at ' + h.toLocaleString('en-GB') + ' km (' + nom + ')?', '¿Periodo de la órbita a ' + h.toLocaleString('es-ES') + ' km (' + nom + ')?'), aff(t),
          [[aff(t * 2), T(L, 'Deux fois trop long : T = 2π√(r³/GM).', 'Twice too long: T = 2π√(r³/GM).', 'El doble de largo: T = 2π√(r³/GM).')], [aff(t / (2 * Math.PI)), T(L, 'Tu as oublié le 2π.', 'You forgot the 2π.', 'Te olvidaste del 2π.')]],
          'T = 2π √(r³ / GM)'); },
      (r, L) => { const [k, nom] = un(r, [['terre', T(L, 'la Terre', 'Earth', 'la Tierra')], ['lune', T(L, 'la Lune', 'the Moon', 'la Luna')], ['mars', 'Mars']]), v = Math.sqrt(2 * GM[k] / RAYON[k]) / 1e3;
        return Q(T(L, 'Vitesse de libération à la surface de ' + nom + ' ?', 'Escape velocity at the surface of ' + nom + '?', '¿Velocidad de escape en la superficie de ' + nom + '?'), fmt(L, v, 2) + ' km/s',
          [[fmt(L, v / Math.SQRT2, 2) + ' km/s', T(L, 'Ça, c’est la vitesse orbitale au ras du sol : il manque le facteur 2 sous la racine.', 'That is the orbital speed at ground level: the 2 under the root is missing.', 'Esa es la velocidad orbital a ras de suelo: falta el factor 2 bajo la raíz.')], [fmt(L, v * Math.SQRT2, 2) + ' km/s', T(L, 'Un facteur 2 en trop sous la racine.', 'One factor of 2 too many under the root.', 'Un factor 2 de más bajo la raíz.')]],
          'v_lib = √(2GM / R)'); },
      (r, L) => { const h = un(r, [400, 6371, 12742]), gh = g0 * (RAYON.terre / (RAYON.terre + h * 1e3)) ** 2;
        return Q(T(L, 'Pesanteur à ' + h.toLocaleString('fr-FR') + ' km d’altitude (g au sol = 9,81) ?', 'Gravity at ' + h.toLocaleString('en-GB') + ' km altitude (g at ground = 9.81)?', '¿Gravedad a ' + h.toLocaleString('es-ES') + ' km de altitud (g en el suelo = 9,81)?'), fmt(L, gh, 2) + ' m/s²',
          [['0 m/s²', T(L, 'En orbite, il y a de la gravité ! Les astronautes flottent parce qu’ils tombent en permanence.', 'There IS gravity in orbit! Astronauts float because they are always falling.', '¡En órbita SÍ hay gravedad! Los astronautas flotan porque están cayendo todo el tiempo.')], [fmt(L, g0 * RAYON.terre / (RAYON.terre + h * 1e3), 2) + ' m/s²', T(L, 'C’est en 1/r², pas en 1/r.', 'It goes as 1/r², not 1/r.', 'Va como 1/r², no como 1/r.')]],
          'g(h) = g₀ × (R / (R + h))²'); }],
    communications:[
      (r, L) => { const [nom, d] = un(r, [[T(L, 'la Lune', 'the Moon', 'la Luna'), 384400], [T(L, 'Mars (au plus près)', 'Mars (closest)', 'Marte (en su punto más cercano)'), 54.6e6], [T(L, 'Mars (au plus loin)', 'Mars (furthest)', 'Marte (en su punto más lejano)'), 401e6], [T(L, 'le Soleil', 'the Sun', 'el Sol'), 149.6e6]]), t = d / 299792;
        const aff = x => x < 60 ? fmt(L, x, 2) + ' s' : fmt(L, x / 60, 1) + ' min';
        return Q(T(L, 'Combien de temps met un signal radio pour aller de la Terre à ' + nom + ' ?', 'How long does a radio signal take from Earth to ' + nom + '?', '¿Cuánto tarda una señal de radio en ir de la Tierra a ' + nom + '?'), aff(t),
          [[aff(t * 2), T(L, 'Ça, c’est l’aller-retour.', 'That is the round trip.', 'Eso es la ida y vuelta.')], [aff(t / 60), T(L, 'Conversion secondes/minutes ratée.', 'Seconds/minutes conversion went wrong.', 'Conversión segundos/minutos fallida.')]],
          T(L, 't = d / c, avec c ≈ 300 000 km/s. Pour Mars : de 3 à 22 minutes, donc pas de pilotage en direct.', 't = d / c, with c ≈ 300,000 km/s. For Mars: 3 to 22 minutes, so no live driving.', 't = d / c, con c ≈ 300 000 km/s. Para Marte: de 3 a 22 minutos, así que nada de pilotar en directo.')); },
      (r, L) => { const D = un(r, [1, 2, 4]), lam = un(r, [3.6, 8.4]), th = 1.22 * (lam / 100) / D * 180 / Math.PI;
        return Q(T(L, 'Une antenne de ' + D + ' m émet à λ = ' + fmt(L, lam, 1) + ' cm. Ouverture du faisceau ≈ 1,22 λ/D, en degrés ?', 'A ' + D + ' m dish transmits at λ = ' + lam + ' cm. Beam width ≈ 1.22 λ/D, in degrees?', 'Una antena de ' + D + ' m emite a λ = ' + fmt(L, lam, 1) + ' cm. ¿Apertura del haz ≈ 1,22 λ/D, en grados?'), fmt(L, th, 2) + '°',
          [[fmt(L, th * 100, 1) + '°', T(L, 'λ en centimètres, D en mètres : convertis d’abord.', 'λ in centimetres, D in metres: convert first.', 'λ en centímetros, D en metros: convierte primero.')], [fmt(L, 1.22 * (lam / 100) / D, 3) + '°', T(L, 'Ce résultat est en radians.', 'That result is in radians.', 'Ese resultado está en radianes.')]],
          T(L, 'Plus l’antenne est grande, plus le faisceau est fin (Deep Space Network : 34 et 70 m).', 'The bigger the dish, the narrower the beam (Deep Space Network: 34 m and 70 m).', 'Cuanto más grande es la antena, más fino es el haz (Deep Space Network: 34 y 70 m).')); }],
    unites:[
      (r, L) => { const lbf = un(r, [1000, 5000, 10000, 50000]), n = lbf * 4.448;
        return Q(T(L, 'Convertis ' + lbf.toLocaleString('fr-FR') + ' livres-force (lbf) en newtons (1 lbf = 4,448 N).', 'Convert ' + lbf.toLocaleString('en-GB') + ' pounds-force (lbf) into newtons (1 lbf = 4.448 N).', 'Convierte ' + lbf.toLocaleString('es-ES') + ' libras-fuerza (lbf) en newtons (1 lbf = 4,448 N).'),
          Math.round(n).toLocaleString(T(L, 'fr-FR', 'en-GB', 'es-ES')) + ' N', [[lbf.toLocaleString(T(L, 'fr-FR', 'en-GB', 'es-ES')) + ' N', T(L, 'Sans conversion : c’est l’erreur qui a perdu Mars Climate Orbiter en 1999.', 'No conversion: that is the mistake that lost Mars Climate Orbiter in 1999.', 'Sin conversión: es el error que hizo perder la Mars Climate Orbiter en 1999.')], [Math.round(lbf / 4.448).toLocaleString(T(L, 'fr-FR', 'en-GB', 'es-ES')) + ' N', T(L, 'Division au lieu de multiplication.', 'Divided instead of multiplied.', 'Dividiste en vez de multiplicar.')]],
          T(L, 'NASA mélangeait unités impériales et métriques : aujourd’hui, tout est vérifié deux fois.', 'NASA once mixed imperial and metric units: now everything is checked twice.', 'La NASA mezcló unidades imperiales y métricas: hoy todo se comprueba dos veces.')); },
      (r, L) => { const mi = un(r, [17500, 25000, 1000]), km = mi * 1.609;
        return Q(T(L, '“' + mi.toLocaleString('en-US') + ' mph” : combien de km/h (1 mile = 1,609 km) ?', '“' + mi.toLocaleString('en-US') + ' mph”: how many km/h (1 mile = 1.609 km)?', '«' + mi.toLocaleString('en-US') + ' mph»: ¿cuántos km/h son (1 milla = 1,609 km)?'), Math.round(km).toLocaleString(T(L, 'fr-FR', 'en-GB', 'es-ES')) + ' km/h',
          [[Math.round(mi / 1.609).toLocaleString(T(L, 'fr-FR', 'en-GB', 'es-ES')) + ' km/h', T(L, 'Un kilomètre est plus court qu’un mile : il y en a plus.', 'A kilometre is shorter than a mile: you get more of them.', 'Un kilómetro es más corto que una milla: salen más.')], [mi.toLocaleString(T(L, 'fr-FR', 'en-GB', 'es-ES')) + ' km/h', T(L, 'Miles et kilomètres ne sont pas jumeaux.', 'Miles and kilometres are not twins.', 'Millas y kilómetros no son gemelos.')]],
          T(L, '17 500 mph ≈ 28 000 km/h : la vitesse de l’ISS.', '17,500 mph ≈ 28,000 km/h: the speed of the ISS.', '17 500 mph ≈ 28 000 km/h: la velocidad de la ISS.')); },
      (r, L) => { const f = un(r, [-250, -100, 32, 212]), c = (f - 32) * 5 / 9;
        return Q(T(L, 'Convertis ' + f + ' °F en °C.', 'Convert ' + f + ' °F to °C.', 'Convierte ' + f + ' °F en °C.'), fmt(L, c, 1) + ' °C',
          [[fmt(L, f * 5 / 9, 1) + ' °C', T(L, 'Il faut d’abord retirer 32.', 'Subtract 32 first.', 'Primero hay que restar 32.')], [fmt(L, (f + 32) * 5 / 9, 1) + ' °C', T(L, 'C’est −32, pas +32.', 'It is −32, not +32.', 'Es −32, no +32.')]],
          '°C = (°F − 32) × 5/9'); }],
    survie:[
      (r, L) => { const n = un(r, [3, 4, 6, 7]), j = un(r, [10, 30, 180]), o2 = n * j * 0.84;
        return Q(T(L, 'Un astronaute consomme environ 0,84 kg d’oxygène par jour. Combien pour ' + n + ' astronautes pendant ' + j + ' jours ?', 'An astronaut uses about 0.84 kg of oxygen per day. How much for ' + n + ' astronauts over ' + j + ' days?', 'Un astronauta consume unos 0,84 kg de oxígeno al día. ¿Cuánto hace falta para ' + n + ' astronautas durante ' + j + ' días?'), fmt(L, o2, 1) + ' kg',
          [[fmt(L, n * 0.84, 2) + ' kg', T(L, 'Ça, c’est une seule journée.', 'That is just one day.', 'Eso es un solo día.')], [fmt(L, j * 0.84, 1) + ' kg', T(L, 'Et les autres membres d’équipage ? Ils respirent aussi.', 'What about the rest of the crew? They breathe too.', '¿Y el resto de la tripulación? También respiran.')]],
          T(L, 'Total = personnes × jours × consommation journalière.', 'Total = people × days × daily use.', 'Total = personas × días × consumo diario.')); },
      (r, L) => { const l = un(r, [100, 500, 1000]), p = 98, recup = l * p / 100;
        return Q(T(L, 'L’ISS recycle environ 98 % de son eau. Sur ' + l + ' L utilisés, combien en récupère-t-on ?', 'The ISS recycles about 98% of its water. Out of ' + l + ' L used, how much comes back?', 'La ISS recicla alrededor del 98 % de su agua. De ' + l + ' L usados, ¿cuánto se recupera?'), fmt(L, recup, 0) + ' L',
          [[fmt(L, l * 0.02, 0) + ' L', T(L, 'Ça, c’est ce qui est perdu.', 'That is what is lost.', 'Eso es lo que se pierde.')], [fmt(L, l * 0.98 / 100, 2) + ' L', T(L, '98 % veut dire 0,98, pas 0,0098.', '98% means 0.98, not 0.0098.', '98 % quiere decir 0,98, no 0,0098.')]],
          T(L, 'Urine et sueur sont filtrées : « le café d’hier devient l’eau de demain ».', 'Urine and sweat are filtered: “yesterday’s coffee becomes tomorrow’s water”.', 'La orina y el sudor se filtran: «el café de ayer es el agua de mañana».')); }]
  };
  // ───────── Banques FR / EN ─────────
  const FR = {
    parcours:[
      ['Pour être astronaute de la NASA, la première condition est…', 'd’être citoyen américain', [['d’avoir 18 ans', 'Il n’y a pas de limite d’âge officielle.'], ['de parler russe', 'Utile sur l’ISS, mais pas la première condition.']], 'Les doubles nationaux peuvent postuler.'],
      ['Diplôme minimum pour postuler comme astronaute NASA ?', 'un master scientifique (STEM)', [['le bac', 'Il faudra encore au moins cinq ans d’études.'], ['un BTS', 'Pas suffisant pour ce poste.']], 'Ingénierie, biologie, physique, informatique, maths ; depuis 2026, un master en soins infirmiers compte aussi. Équivalents : médecine, doctorat en cours, école de pilote d’essai.'],
      ['Combien d’années d’expérience professionnelle après ce diplôme ?', '3 ans au moins', [['aucune', 'La NASA veut des gens qui ont déjà travaillé.'], ['20 ans', 'Ce serait beaucoup.']], 'Ou des heures de vol pour les pilotes (750 h comme commandant de bord sur avion à réaction).'],
      ['Les stages NASA « OSTEM » et « Pathways » sont ouverts…', 'aux citoyens américains', [['à tout le monde', 'Non, il faut la nationalité américaine.'], ['seulement aux astronautes', 'Ce sont des stages pour étudiants.']], 'Un programme « International Intern » existe pour les pays ayant un accord avec la NASA.'],
      ['Pour un Français, la voie la plus réaliste vers les métiers du spatial passe par…', 'l’ESA, le CNES et l’industrie (Airbus, Thales, ArianeGroup…)', [['un concours télé', 'Plumo adore la télé, mais non.'], ['un visa de touriste', 'Il ne permet pas de travailler.']], 'Et des partenariats avec la NASA via ces organismes.'],
      ['Le programme « Graduate Trainee » de l’ESA demande…', 'un master (en dernière année ou tout juste obtenu)', [['le brevet', 'Il faut un master.'], ['10 ans d’expérience', 'C’est pour les jeunes diplômés.']], 'Ouvert aux citoyens des États membres de l’ESA (dont la France).'],
      ['Quelles langues de travail à l’ESA ?', 'l’anglais et le français', [['l’allemand uniquement', 'Non.'], ['le latin', 'Plumo l’aurait parié pour le Vatican.']], 'Une bonne maîtrise de l’une des deux est exigée.'],
      ['Après le bac, quel parcours mène le plus souvent aux métiers du spatial ?', 'prépa ou licence scientifique, puis école d’ingénieurs ou master', [['bac puis directement astronaute', 'Il manque une dizaine d’années.'], ['aucun, on est repéré au hasard', 'Non.']], 'Écoles connues : ISAE-SUPAERO, Centrale, Polytechnique, universités (master astrophysique).'],
      ['Quelles spécialités au lycée pour viser le spatial ?', 'maths et physique-chimie', [['seulement SES', 'Pas assez de sciences pour l’ingénierie.'], ['aucune importance', 'Les maths comptent beaucoup.']], 'Option maths expertes conseillée ; NSI est un plus pour les logiciels.'],
      ['Thomas Pesquet a fait des études…', 'd’ingénieur (SUPAERO), puis il a été pilote de ligne', [['de cuisine', 'Il cuisinait dans l’ISS, mais non.'], ['de droit', 'Non.']], 'Sélectionné par l’ESA en 2009.']],
    metiers:[
      ['Combien de personnes travaillent à la NASA, environ ?', 'près de 18 000 salariés', [['20', 'Un peu plus que ça.'], ['10 millions', 'Beaucoup moins.']], 'Plus de nombreux sous-traitants.'],
      ['Qui surveille une mission depuis le sol, en direct ?', 'les contrôleurs de vol (Mission Control)', [['les astronautes eux-mêmes uniquement', 'Ils ne sont jamais seuls.'], ['personne', 'Il y a toujours quelqu’un.']], 'À Houston (Johnson Space Center).'],
      ['Le JPL (Jet Propulsion Laboratory) est surtout connu pour…', 'les robots et rovers martiens', [['les fusées habitées seulement', 'Plutôt les sondes et rovers.'], ['les avions de ligne', 'Non.']], 'Perseverance, Curiosity, Voyager.'],
      ['Un ingénieur système…', 'fait fonctionner ensemble toutes les parties d’un engin', [['répare les ordinateurs du bureau', 'Pas que.'], ['dessine les logos', 'Non.']], 'Vision d’ensemble, exigences, tests.'],
      ['Quel métier analyse les roches lunaires ramenées ?', 'géologue / planétologue', [['astronome uniquement', 'Ce sont surtout des géologues.'], ['chimiste culinaire', 'Non.']], 'Les échantillons Apollo sont encore étudiés.'],
      ['Un médecin de l’espace (flight surgeon) s’occupe…', 'de la santé des astronautes avant, pendant et après le vol', [['de soigner les fusées', 'Les fusées ont des ingénieurs.'], ['des extraterrestres', 'Pas encore.']], 'Os, muscles, radiations, vue.'],
      ['Le centre de lancement de la NASA en Floride est…', 'le Kennedy Space Center', [['le Johnson Space Center', 'C’est à Houston (contrôle des vols habités).'], ['Kourou', 'C’est le port spatial européen.']], 'Pas de tir 39B pour Artemis.'],
      ['Sans aller dans l’espace, on peut travailler pour une mission NASA…', 'comme ingénieur, scientifique, programmeur ou technicien', [['impossible', 'L’immense majorité travaille au sol.'], ['seulement comme guide touristique', 'Non.']], 'Des milliers de métiers au sol.']],
    exploration:[
      ['Quand Apollo 11 s’est-il posé sur la Lune ?', '20 juillet 1969', [['1957', 'C’est Spoutnik.'], ['2001', 'Non.']], 'Neil Armstrong et Buzz Aldrin.'],
      ['Quand Artemis II a-t-il décollé ?', 'le 1er avril 2026', [['1969', 'C’est Apollo 11.'], ['il n’a jamais décollé', 'Si : quatre astronautes autour de la Lune.']], 'Survol de la Lune le 6 avril, amerrissage le 10 avril 2026.'],
      ['Qui faisait partie de l’équipage d’Artemis II ?', 'Wiseman, Glover, Koch et le Canadien Hansen', [['Armstrong et Aldrin', 'Ça, c’est Apollo 11.'], ['Thomas Pesquet', 'Pas cette fois.']], 'Première femme et premier Canadien à aller vers la Lune.'],
      ['Depuis quand l’ISS est-elle habitée en continu ?', 'novembre 2000', [['1969', 'Non.'], ['2020', 'Bien avant.']], 'Plus de 25 ans de présence humaine.'],
      ['Quel rover de la NASA explore le cratère Jezero sur Mars ?', 'Perseverance', [['Sojourner', 'Premier rover, en 1997.'], ['Spoutnik', 'C’est un satellite soviétique.']], 'Arrivé en février 2021, avec l’hélicoptère Ingenuity.'],
      ['Où se trouve le télescope James Webb ?', 'près du point de Lagrange L2, à 1,5 million de km', [['en orbite basse comme Hubble', 'Webb est bien plus loin.'], ['sur la Lune', 'Non.']], 'Lancé par une Ariane 5 en décembre 2021.'],
      ['Quelle sonde est la plus éloignée de la Terre ?', 'Voyager 1', [['Hubble', 'Il tourne autour de la Terre.'], ['Perseverance', 'Elle est sur Mars.']], 'Lancée en 1977, dans l’espace interstellaire.'],
      ['Que vise le programme Artemis ?', 'retourner sur la Lune pour y rester, puis préparer Mars', [['aller sur le Soleil', 'Trop chaud.'], ['remplacer l’ISS par un avion', 'Non.']], 'Pôle Sud lunaire, station Gateway.']],
    anglais:[
      ['« Liftoff » veut dire…', 'décollage', [['atterrissage', 'C’est landing.'], ['carburant', 'C’est fuel ou propellant.']], 'NASA travaille en anglais : le vocabulaire compte.'],
      ['« Splashdown » veut dire…', 'amerrissage', [['explosion', 'Non.'], ['décollage', 'Non.']], 'Orion amerrit dans le Pacifique.'],
      ['« Payload » veut dire…', 'charge utile', [['salaire', 'Pay… load, mais non.'], ['moteur', 'Non.']], 'Ce que la fusée transporte.'],
      ['« Thrust » veut dire…', 'poussée', [['confiance', 'C’est trust (sans h).'], ['vitesse', 'C’est speed.']], 'Mesurée en newtons (ou livres-force).'],
      ['« Go / No go » sert à…', 'donner son accord (ou pas) pour continuer', [['saluer', 'Non.'], ['jouer au go', 'Plumo y joue, mais non.']], 'Chaque responsable répond avant le lancement.'],
      ['« Houston, we’ve had a problem » a été dit pendant…', 'Apollo 13 (1970)', [['Apollo 11', 'Apollo 11 s’est bien passé.'], ['Artemis II', 'Non.']], 'Une explosion d’un réservoir d’oxygène ; l’équipage est rentré sain et sauf.'],
      ['« EVA » (extravehicular activity) désigne…', 'une sortie dans l’espace', [['un prénom', 'Ici, non.'], ['un repas', 'Non.']], 'Sortie en scaphandre.'],
      ['« Abort » veut dire…', 'interrompre la mission', [['à bord', 'C’est aboard.'], ['réussir', 'Non.']], 'Système d’abandon d’Orion : il éloigne la capsule en cas de problème.']],
    code:[
      ['Quel langage est très utilisé à la NASA pour l’analyse de données ?', 'Python', [['le HTML seul', 'HTML fait des pages, pas des calculs.'], ['aucun', 'Il y en a plein.']], 'Aussi C/C++ pour les logiciels de vol.'],
      ['Le code du guidage d’Apollo a été dirigé par…', 'Margaret Hamilton', [['Ada Lovelace', 'Elle a vécu au XIXe siècle.'], ['Bill Gates', 'Non.']], 'Au MIT, années 1960.'],
      ['Pourquoi tester un logiciel de vol des milliers de fois ?', 'parce qu’une erreur peut faire perdre la mission', [['pour passer le temps', 'Non.'], ['ce n’est pas utile', 'Si, très.']], 'Ariane 5 vol 501 (1996) : erreur logicielle.'],
      ['En Python, que donne 2 ** 10 ?', '1024', [['20', 'C’est 2 × 10.'], ['100', 'C’est 10².']], '** = puissance.'],
      ['Une boucle « for » sert à…', 'répéter des instructions', [['arrêter le programme', 'Non.'], ['dessiner une fusée', 'Seulement si tu le codes.']], 'Simulation : on avance le temps pas à pas.'],
      ['Dans une simulation d’orbite, à chaque pas on met à jour…', 'la position et la vitesse', [['la couleur de la fusée', 'Non.'], ['le nom des astronautes', 'Non.']], 'Méthode d’Euler : x += v dt ; v += a dt.'],
      ['Quel est le binaire de 5 ?', '101', [['110', 'C’est 6.'], ['111', 'C’est 7.']], '4 + 1.'],
      ['Pourquoi les sondes lointaines sont-elles en partie autonomes ?', 'à cause du délai des communications', [['parce que la NASA s’ennuie', 'Non.'], ['parce que la radio est interdite', 'Non.']], 'Mars : jusqu’à 22 minutes de délai.']],
    geopolitique:[
      ['Quel traité de 1967 interdit à un pays de s’approprier la Lune ?', 'le traité de l’espace', [['le traité de Versailles', 'C’est 1919.'], ['le traité de Rome', 'C’est 1957, l’Europe.']], 'Il interdit aussi les armes nucléaires en orbite.'],
      ['Quel satellite a lancé la course à l’espace en 1957 ?', 'Spoutnik 1 (URSS)', [['Apollo 11', 'C’est 1969.'], ['Hubble', 'C’est 1990.']], 'Guerre froide : rivalité États-Unis / URSS.'],
      ['Premier humain dans l’espace ?', 'Youri Gagarine (1961)', [['Neil Armstrong', 'Premier sur la Lune, en 1969.'], ['Thomas Pesquet', 'Bien plus tard.']], 'URSS, 12 avril 1961.'],
      ['Les accords Artemis (2020) sont…', 'des principes pour explorer la Lune ensemble, proposés par les États-Unis', [['un traité militaire', 'Non, ils concernent l’exploration civile.'], ['un accord de football', 'Non.']], 'La France les a signés en 2022.'],
      ['Quelle station spatiale la Chine a-t-elle construite ?', 'Tiangong', [['Mir', 'Mir était soviétique puis russe.'], ['Skylab', 'Skylab était américain.']], 'Terminée en 2022.'],
      ['Quel pays a posé une sonde près du pôle Sud lunaire en 2023 ?', 'l’Inde (Chandrayaan-3)', [['la France', 'Non.'], ['le Brésil', 'Non.']], 'Le pôle Sud intéresse pour sa glace d’eau.'],
      ['Galileo est…', 'le système de navigation européen, concurrent du GPS', [['un télescope de la NASA', 'Galileo (le savant) avait une lunette, mais ici non.'], ['une fusée', 'Non.']], 'Indépendance stratégique de l’Europe.'],
      ['Pourquoi l’espace est-il un enjeu de puissance ?', 'satellites de communication, de navigation, d’observation et militaires', [['pour le tourisme uniquement', 'Pas seulement.'], ['il n’y a aucun enjeu', 'Il y en a beaucoup.']], 'Les tirs antisatellites créent des débris dangereux pour tous.'],
      ['Ariane 6 a fait son premier vol en…', '2024', [['1979', 'C’est Ariane 1.'], ['2030', 'Il a déjà volé.']], 'L’accès autonome de l’Europe à l’espace.'],
      ['Quels partenaires construisent et utilisent l’ISS ?', 'États-Unis, Russie, Europe, Japon et Canada', [['uniquement les États-Unis', 'C’est une coopération internationale.'], ['la Chine et l’Inde', 'Elles n’en font pas partie.']], 'Une coopération née après la guerre froide.']],
    // v6.6 : GEOPS — Géosciences Paris-Saclay (UMR 8148, CNRS et Université Paris-Saclay), la Terre et les planètes.
    geops:[
      ['GEOPS, c’est…', 'le laboratoire Géosciences Paris-Saclay (CNRS et Université Paris-Saclay)', [['une agence spatiale', 'Non : un laboratoire de recherche en sciences de la Terre et des planètes.'], ['un satellite européen', 'Non, c’est un labo, pas un objet en orbite.']], 'Unité mixte de recherche UMR 8148, membre de l’OSU Paris-Saclay et de la fédération IPSL.'],
      ['Lequel de ces thèmes de recherche est celui de GEOPS ?', 'Évolution de la Terre et des Planètes', [['Physique des particules', 'Ça, c’est plutôt le CERN.'], ['Chirurgie cardiaque', 'Mauvais labo, mauvais étage.']], 'Les 4 thèmes : Bassins & Ressources, Évolution de la Terre et des Planètes, Paléoclimats & Dynamique sédimentaire, Zone critique.'],
      ['Quel master est rattaché à GEOPS ?', 'Sciences de la Terre et des Planètes, Environnement', [['Droit des affaires', 'Pas de failles… juridiques ici.'], ['Commerce international', 'On parle de plaques, pas de marchés.']], 'Université Paris-Saclay. En licence : Sciences de la Terre, ou double diplôme Géosciences-Physique.'],
      ['Pour étudier les planètes en géosciences après le bac, on commence par…', 'une licence de sciences de la Terre (ou double diplôme géosciences-physique)', [['un CAP pâtisserie', 'Les couches géologiques, ce n’est pas un mille-feuille.'], ['rien : on part directement sur Mars', 'Il faut d’abord apprendre à lire les roches.']], 'Puis master, puis doctorat (environ 3 ans) pour devenir chercheur.'],
      ['Les « Paléoclimats » étudient…', 'les climats du passé', [['la météo de demain', 'Ça, c’est la prévision météo.'], ['les climats des jeux vidéo', 'Non.']], 'On les lit dans les carottes de glace, les sédiments, les coraux.'],
      ['Que trouve-t-on dans une carotte de glace de l’Antarctique ?', 'des bulles d’air anciennes qui gardent la composition de l’atmosphère passée', [['du pétrole', 'Pas dans la glace.'], ['des fossiles de dinosaures', 'La glace la plus vieille a environ 800 000 ans, bien après eux.']], 'On y mesure le CO₂ et les isotopes de l’oxygène.'],
      ['La « zone critique », c’est…', 'la fine couche de la Terre entre le sommet de la végétation et les eaux souterraines', [['le noyau de la Terre', 'Bien trop profond.'], ['la zone de danger d’un volcan', 'Non, c’est un terme scientifique précis.']], 'Sol, roche altérée, eau, vie : là où se jouent nos ressources.'],
      ['Un bassin sédimentaire, c’est…', 'une zone où des sédiments s’accumulent en couches pendant des millions d’années', [['une piscine', 'Non.'], ['un volcan éteint', 'Non, c’est une dépression qui se remplit.']], 'On y trouve eau souterraine, sel, charbon, pétrole, gaz… et la mémoire du climat.'],
      ['Quel est l’âge de la Terre ?', 'environ 4,5 milliards d’années', [['environ 6 000 ans', 'Les roches datées disent bien plus.'], ['environ 45 millions d’années', 'Il manque deux zéros.']], 'Datation radiométrique des météorites : 4,54 milliards d’années.'],
      ['La plus haute montagne connue du système solaire, Olympus Mons, est sur…', 'Mars', [['la Lune', 'Non.'], ['la Terre', 'L’Everest fait moins de 9 km ; Olympus Mons plus de 20.']], 'C’est un volcan bouclier géant.'],
      ['Dans quel cratère martien le rover Perseverance s’est-il posé en 2021 ?', 'Jezero, un ancien lac', [['Gale', 'C’est celui de Curiosity (2012).'], ['Copernic', 'C’est un cratère de la Lune.']], 'Un ancien delta : idéal pour chercher des traces de vie passée.'],
      ['Comment sait-on qu’il a coulé de l’eau liquide sur Mars ?', 'par les vallées, les deltas et des minéraux formés dans l’eau', [['on l’a goûtée', 'Non.'], ['parce que Mars est rouge', 'Le rouge vient de la rouille.']], 'Argiles et sulfates se forment en présence d’eau.'],
      ['La théorie qui explique séismes, volcans et montagnes sur Terre, c’est…', 'la tectonique des plaques', [['la théorie du Big Bang', 'Celle-là, c’est pour l’Univers.'], ['la gravitation de la Lune', 'Elle fait les marées, pas les montagnes.']], 'Les plaques bougent de quelques centimètres par an.'],
      ['Comment pense-t-on que la Lune s’est formée ?', 'par un impact géant entre la jeune Terre et un corps de la taille de Mars', [['elle a été capturée par hasard', 'Hypothèse ancienne, abandonnée.'], ['elle est sortie d’un volcan terrestre', 'Non.']], 'Les roches lunaires d’Apollo ressemblent beaucoup au manteau terrestre.'],
      ['Pourquoi un géologue peut-il être utile à une mission spatiale ?', 'pour choisir où se poser et quels échantillons prélever', [['pour piloter la fusée', 'Ça, c’est le pilote.'], ['pour cuisiner à bord', 'Non.']], 'Harrison Schmitt, géologue, a marché sur la Lune avec Apollo 17 (1972).']]
  };
  const EN = {
    parcours:[
      ['To become a NASA astronaut, the first requirement is…', 'being a US citizen', [['being 18', 'There is no official age limit.'], ['speaking Russian', 'Useful on the ISS, but not the first requirement.']], 'Dual citizens can apply.'],
      ['Minimum degree to apply as a NASA astronaut?', 'a master’s degree in a STEM field', [['A levels', 'At least five more years of study needed.'], ['a GCSE in PE', 'Fitness helps, but no.']], 'Engineering, biology, physics, computer science, maths; since 2026 a master’s in nursing also counts. Equivalents: medical degree, PhD study, test pilot school.'],
      ['How many years of professional experience after that degree?', 'at least 3', [['none', 'NASA wants people who have already worked.'], ['20', 'That would be a lot.']], 'Or flight hours for pilots (750 h pilot-in-command in jets).'],
      ['NASA’s OSTEM and Pathways internships are open to…', 'US citizens', [['everyone', 'No, US citizenship is required.'], ['astronauts only', 'They are for students.']], 'An International Intern programme exists for countries with a NASA agreement.'],
      ['For a British student, the most realistic route into space careers is…', 'ESA, the UK Space Agency and industry (Airbus, Surrey Satellite Technology…)', [['a TV talent show', 'Plumo loves TV, but no.'], ['a tourist visa', 'It does not let you work.']], 'Plus NASA partnerships through these organisations.'],
      ['ESA’s Graduate Trainee programme asks for…', 'a master’s degree (final year or just finished)', [['GCSEs only', 'A master’s is needed.'], ['10 years’ experience', 'It is for new graduates.']], 'Open to citizens of ESA member states (including the UK).'],
      ['ESA’s working languages are…', 'English and French', [['German only', 'No.'], ['Latin', 'No.']], 'Good knowledge of one of them is required.'],
      ['Which A levels open the most doors to space engineering?', 'maths and physics (Further Maths helps)', [['only art', 'Great subject, but engineering needs maths.'], ['it does not matter', 'Maths matters a lot.']], 'Then a degree: aerospace engineering, physics, computer science…'],
      ['Tim Peake trained first as…', 'an army helicopter pilot and test pilot', [['a chef', 'He ate space food, but no.'], ['a footballer', 'No.']], 'Selected by ESA in 2009.'],
      ['A degree apprenticeship in aerospace engineering lets you…', 'earn a degree while working for a company', [['skip all maths', 'Lots of maths.'], ['become an astronaut next week', 'A bit fast.']], 'Offered by firms like Airbus and BAE Systems.']],
    metiers:[
      ['Roughly how many people work for NASA?', 'about 18,000 employees', [['20', 'A few more.'], ['10 million', 'Far fewer.']], 'Plus many contractors.'],
      ['Who monitors a mission live from the ground?', 'flight controllers (Mission Control)', [['the astronauts alone', 'They are never alone.'], ['nobody', 'Someone is always watching.']], 'In Houston (Johnson Space Center).'],
      ['NASA’s JPL is best known for…', 'robotic probes and Mars rovers', [['airliners', 'No.'], ['only crewed rockets', 'Mostly robots.']], 'Perseverance, Curiosity, Voyager.'],
      ['A systems engineer…', 'makes all the parts of a spacecraft work together', [['only fixes office printers', 'Much more than that.'], ['designs logos', 'No.']], 'Big picture, requirements, testing.'],
      ['Who analyses Moon rocks brought back?', 'geologists / planetary scientists', [['chefs', 'No.'], ['lawyers', 'No.']], 'Apollo samples are still studied.'],
      ['A flight surgeon looks after…', 'astronauts’ health before, during and after flight', [['the rockets', 'Rockets have engineers.'], ['aliens', 'Not yet.']], 'Bones, muscles, radiation, eyesight.'],
      ['NASA’s launch centre in Florida is…', 'Kennedy Space Center', [['Johnson Space Center', 'That is Houston (human spaceflight control).'], ['Kourou', 'That is Europe’s spaceport.']], 'Pad 39B for Artemis.'],
      ['Without going to space, you can work on a NASA mission as…', 'an engineer, scientist, programmer or technician', [['nothing', 'Most people work on the ground.'], ['only a tour guide', 'No.']], 'Thousands of jobs on the ground.']],
    exploration:[
      ['When did Apollo 11 land on the Moon?', '20 July 1969', [['1957', 'That is Sputnik.'], ['2001', 'No.']], 'Neil Armstrong and Buzz Aldrin.'],
      ['When did Artemis II launch?', '1 April 2026', [['1969', 'That is Apollo 11.'], ['it never launched', 'It did: four astronauts around the Moon.']], 'Lunar flyby on 6 April, splashdown on 10 April 2026.'],
      ['Who flew on Artemis II?', 'Wiseman, Glover, Koch and Canada’s Hansen', [['Armstrong and Aldrin', 'That is Apollo 11.'], ['Tim Peake', 'Not this time.']], 'First woman and first Canadian to travel to the Moon.'],
      ['Since when has the ISS been continuously crewed?', 'November 2000', [['1969', 'No.'], ['2020', 'Much earlier.']], 'More than 25 years of human presence.'],
      ['Which NASA rover explores Jezero crater on Mars?', 'Perseverance', [['Sojourner', 'The first rover, in 1997.'], ['Sputnik', 'A Soviet satellite.']], 'Landed in February 2021, with the Ingenuity helicopter.'],
      ['Where is the James Webb Space Telescope?', 'near the L2 Lagrange point, 1.5 million km away', [['in low orbit like Hubble', 'Webb is much further.'], ['on the Moon', 'No.']], 'Launched on an Ariane 5 in December 2021.'],
      ['Which probe is furthest from Earth?', 'Voyager 1', [['Hubble', 'It orbits Earth.'], ['Perseverance', 'It is on Mars.']], 'Launched 1977, now in interstellar space.'],
      ['What is the Artemis programme’s goal?', 'to return to the Moon to stay, then prepare for Mars', [['to visit the Sun', 'Too hot.'], ['to replace the ISS with a plane', 'No.']], 'Lunar South Pole, Gateway station.']],
    anglais:[
      ['“Go / No go” is used to…', 'confirm (or not) that a team is ready to continue', [['say hello', 'No.'], ['play a board game', 'Plumo plays Go, but no.']], 'Each controller answers before launch.'],
      ['“Houston, we’ve had a problem” was said during…', 'Apollo 13 (1970)', [['Apollo 11', 'Apollo 11 went smoothly.'], ['Artemis II', 'No.']], 'An oxygen tank exploded; the crew returned safely.'],
      ['“EVA” (extravehicular activity) means…', 'a spacewalk', [['a name', 'Not here.'], ['a meal', 'No.']], 'Done in a spacesuit.'],
      ['“Abort” means…', 'stopping the mission early for safety', [['aboard', 'That is a different word.'], ['succeeding', 'No.']], 'Orion’s launch abort system pulls the capsule away.'],
      ['“Payload” means…', 'what the rocket carries', [['the crew’s salary', 'Pay… load, but no.'], ['the engine', 'No.']], 'Satellites, capsules, cargo.'],
      ['“Splashdown” means…', 'landing in the sea', [['launching', 'No.'], ['an explosion', 'No.']], 'Orion lands in the Pacific.'],
      ['“T-minus 10” means…', '10 seconds before launch', [['10 minutes after launch', 'Minus: before.'], ['10 tonnes', 'No.']], 'The countdown.'],
      ['“Mission Control” is…', 'the team on the ground running the mission', [['a video game', 'There are games too, but no.'], ['the rocket’s engine', 'No.']], 'Houston for human flights.']],
    code:[
      ['Which language is widely used at NASA for data analysis?', 'Python', [['HTML alone', 'HTML makes pages, not calculations.'], ['none', 'Lots are used.']], 'Also C/C++ for flight software.'],
      ['Who led the Apollo guidance software team?', 'Margaret Hamilton', [['Ada Lovelace', 'She lived in the 19th century.'], ['Bill Gates', 'No.']], 'At MIT, 1960s.'],
      ['Why test flight software thousands of times?', 'one bug can lose a mission', [['to pass the time', 'No.'], ['it is not useful', 'It is vital.']], 'Ariane 5 flight 501 (1996) failed because of a software error.'],
      ['In Python, what is 2 ** 10?', '1024', [['20', 'That is 2 × 10.'], ['100', 'That is 10².']], '** = power.'],
      ['A “for” loop is used to…', 'repeat instructions', [['stop the program', 'No.'], ['draw a rocket', 'Only if you code it.']], 'Simulations step through time.'],
      ['In an orbit simulation, each step updates…', 'position and velocity', [['the rocket’s colour', 'No.'], ['the astronauts’ names', 'No.']], 'Euler method: x += v·dt; v += a·dt.'],
      ['What is 5 in binary?', '101', [['110', 'That is 6.'], ['111', 'That is 7.']], '4 + 1.'],
      ['Why are deep-space probes partly autonomous?', 'because of the communication delay', [['because NASA is bored', 'No.'], ['radio is banned', 'No.']], 'Mars: up to 22 minutes of delay.']],
    geopolitique:[
      ['Which 1967 treaty stops any country claiming the Moon?', 'the Outer Space Treaty', [['the Treaty of Versailles', 'That is 1919.'], ['Magna Carta', 'That is 1215.']], 'It also bans nuclear weapons in orbit.'],
      ['Which satellite started the space race in 1957?', 'Sputnik 1 (USSR)', [['Apollo 11', 'That is 1969.'], ['Hubble', 'That is 1990.']], 'Cold War rivalry between the USA and USSR.'],
      ['First human in space?', 'Yuri Gagarin (1961)', [['Neil Armstrong', 'First on the Moon, 1969.'], ['Tim Peake', 'Much later.']], 'USSR, 12 April 1961.'],
      ['The Artemis Accords (2020) are…', 'US-led principles for exploring the Moon together', [['a military treaty', 'No, they are about civil exploration.'], ['a football deal', 'No.']], 'The UK was a founding signatory in 2020.'],
      ['Which space station did China build?', 'Tiangong', [['Mir', 'Mir was Soviet then Russian.'], ['Skylab', 'Skylab was American.']], 'Completed in 2022.'],
      ['Which country landed near the lunar South Pole in 2023?', 'India (Chandrayaan-3)', [['the UK', 'No.'], ['Brazil', 'No.']], 'The South Pole has water ice.'],
      ['Galileo is…', 'Europe’s satellite navigation system, an alternative to GPS', [['a NASA telescope', 'No.'], ['a rocket', 'No.']], 'Strategic independence.'],
      ['Why is space a matter of power between countries?', 'satellites for communication, navigation, observation and defence', [['only for tourism', 'Not only.'], ['it is not', 'It very much is.']], 'Anti-satellite tests create debris dangerous for everyone.'],
      ['Who are the ISS partners?', 'the USA, Russia, Europe, Japan and Canada', [['only the USA', 'It is an international partnership.'], ['China and India', 'Not part of it.']], 'A partnership born after the Cold War.'],
      ['The US Space Force was created in…', '2019', [['1957', 'No.'], ['1969', 'No.']], 'France created its Space Command the same year.']],
    // v6.6 : GEOPS — Géosciences Paris-Saclay (UMR 8148, CNRS and Université Paris-Saclay), Earth and planetary sciences.
    geops:[
      ['GEOPS is…', 'the Paris-Saclay geosciences lab (CNRS and Université Paris-Saclay)', [['a space agency', 'No: a research lab in Earth and planetary sciences.'], ['a European satellite', 'No, it is a lab, not something in orbit.']], 'Joint research unit UMR 8148, member of OSU Paris-Saclay and the IPSL federation.'],
      ['Which of these is one of GEOPS’s research themes?', 'Evolution of the Earth and Planets', [['Particle physics', 'That is more CERN.'], ['Heart surgery', 'Wrong lab, wrong floor.']], 'The 4 themes: Basins & Resources, Evolution of the Earth and Planets, Palaeoclimates & Sediment Dynamics, Critical Zone.'],
      ['Which master’s degree is linked to GEOPS?', 'Earth and Planetary Sciences, Environment', [['Business law', 'No legal faults here, only geological ones.'], ['International trade', 'We talk about plates, not markets.']], 'Université Paris-Saclay. At bachelor level: Earth Sciences, or a double degree in Geosciences and Physics.'],
      ['To study planets in geosciences after school, you start with…', 'a degree in Earth sciences (or geosciences and physics)', [['a baking course', 'Rock layers are not a layer cake.'], ['nothing: straight to Mars', 'First you learn to read rocks.']], 'Then a master’s, then a PhD (about 3 years) to become a researcher.'],
      ['Palaeoclimate research studies…', 'the climates of the past', [['tomorrow’s weather', 'That is weather forecasting.'], ['climates in video games', 'No.']], 'They are read in ice cores, sediments and corals.'],
      ['What is inside an Antarctic ice core?', 'ancient air bubbles that keep the make-up of the past atmosphere', [['oil', 'Not in ice.'], ['dinosaur fossils', 'The oldest ice is about 800,000 years old, long after them.']], 'Scientists measure CO₂ and oxygen isotopes in them.'],
      ['The “critical zone” is…', 'the thin layer of the Earth from the treetops down to the groundwater', [['the Earth’s core', 'Far too deep.'], ['the danger zone around a volcano', 'No, it is a precise scientific term.']], 'Soil, weathered rock, water and life: where our resources come from.'],
      ['A sedimentary basin is…', 'an area where sediments pile up in layers over millions of years', [['a swimming pool', 'No.'], ['an extinct volcano', 'No, it is a hollow that fills up.']], 'It can hold groundwater, salt, coal, oil, gas… and a record of past climates.'],
      ['How old is the Earth?', 'about 4.5 billion years', [['about 6,000 years', 'Dated rocks say far more.'], ['about 45 million years', 'Two zeros are missing.']], 'Radiometric dating of meteorites: 4.54 billion years.'],
      ['The highest known mountain in the solar system, Olympus Mons, is on…', 'Mars', [['the Moon', 'No.'], ['Earth', 'Everest is under 9 km; Olympus Mons is over 20.']], 'It is a giant shield volcano.'],
      ['In which Martian crater did the Perseverance rover land in 2021?', 'Jezero, an ancient lake', [['Gale', 'That is Curiosity’s crater (2012).'], ['Copernicus', 'That is a crater on the Moon.']], 'An ancient river delta: ideal for looking for signs of past life.'],
      ['How do we know liquid water once flowed on Mars?', 'from valleys, deltas and minerals that form in water', [['someone tasted it', 'No.'], ['because Mars is red', 'The red comes from rust.']], 'Clays and sulfates form when water is present.'],
      ['The theory that explains earthquakes, volcanoes and mountains on Earth is…', 'plate tectonics', [['the Big Bang theory', 'That one is about the Universe.'], ['the Moon’s gravity', 'It makes tides, not mountains.']], 'Plates move a few centimetres a year.'],
      ['How do scientists think the Moon formed?', 'from a giant impact between the young Earth and a Mars-sized body', [['it was captured by chance', 'An old idea, now abandoned.'], ['it came out of a volcano on Earth', 'No.']], 'Apollo’s Moon rocks look a lot like the Earth’s mantle.'],
      ['Why can a geologist be useful on a space mission?', 'to choose where to land and which samples to collect', [['to fly the rocket', 'That is the pilot’s job.'], ['to cook on board', 'No.']], 'Harrison Schmitt, a geologist, walked on the Moon with Apollo 17 (1972).']]
  };
  // ───────── Assemblage ─────────
  const CH = [['parcours', '🎓 Parcours et diplômes', '🎓 Routes and qualifications', 'Parcours'], ['metiers', '👩‍🚀 Métiers de la NASA et du spatial', '👩‍🚀 Jobs at NASA and in space', 'Parcours'],
    ['fusees', '🚀 Fusées et propulsion', '🚀 Rockets and propulsion', 'Exercices'], ['orbites', '🛰️ Orbites et gravitation', '🛰️ Orbits and gravity', 'Exercices'],
    ['communications', '📡 Communications et distances', '📡 Communications and distances', 'Exercices'], ['unites', '📏 Unités et conversions', '📏 Units and conversions', 'Exercices'],
    ['survie', '🧑‍🚀 Vie à bord', '🧑‍🚀 Life on board', 'Exercices'], ['exploration', '🌕 Missions : Apollo, ISS, Artemis, Mars', '🌕 Missions: Apollo, ISS, Artemis, Mars', 'Culture'],
    ['anglais', '🗣️ Anglais de mission', '🗣️ Mission English', 'Culture'], ['code', '💻 Code et logiciels de vol', '💻 Code and flight software', 'Exercices'],
    ['geopolitique', '🌍 Géopolitique de l’espace', '🌍 Space geopolitics', 'Culture'],
    ['geops', '🪨 GEOPS : géosciences de la Terre et des planètes', '🪨 GEOPS: Earth and planetary geosciences', 'Geo']];
  const banqueEN = (L, x) => x;   // même format
  // Français : matière « Objectif NASA » (2nde → Sup).
  const M = window.MATIERES;
  if(M){ if(!M.NIVEAUX.includes('Sup')) M.NIVEAUX.push('Sup');
    const niv = id => ['parcours', 'metiers', 'exploration', 'anglais', 'geopolitique', 'geops'].includes(id) ? ['2nde', '1re', 'Tle', 'Sup'] : ['1re', 'Tle', 'Sup'];
    M.ajouter({ id:'nasa', nom:'Objectif NASA', ic:'🚀', examens:{}, chapitres:CH.map(([id, fr, , dom]) => ({ id, nom:fr.replace(/^\S+ /, ''), dom:{ Parcours:'Parcours', Exercices:'Exercices', Culture:'Culture spatiale', Geo:'Géosciences (GEOPS)' }[dom], niv:niv(id),
      banque:FR[id], gen:GEN[id] ? (r, n, l) => { const lg = l === 'en' || l === 'es' ? l : 'fr', x = un(r, GEN[id])(r, lg); x.lang = lg; if(lg !== 'fr') x.consigne = lg === 'en' ? 'Calculation' : 'Cálculo'; return x; } : undefined, genLangues:GEN[id] ? ['en', 'es'] : undefined })) });
    // L'ancien chapitre « nasa » de l'astrophysique est remplacé par cette matière complète.
    const astro = M.trouver('astro'); if(astro) astro.chapitres = astro.chapitres.filter(c => c.id !== 'nasa'); }
  // Anglais : « Road to NASA » (Year 10 → University).
  const E = window.ENGLAND;
  if(E){ const niv = id => ['parcours', 'metiers', 'exploration', 'anglais', 'geopolitique', 'geops'].includes(id) ? ['Y10', 'Y11', 'Y12', 'Y13', 'Uni'] : ['Y12', 'Y13', 'Uni'];
    E.ajouter({ id:'gb-nasa', nom:'Road to NASA', ic:'🚀', sous:'Qualifications, jobs and all the exercises: rockets, orbits, comms, units, space geopolitics, GEOPS geosciences', examens:{ Uni:'Road to NASA quiz', Y13:'Road to NASA quiz' },
      chapitres:CH.map(([id, , en, dom]) => ({ id, nom:en.replace(/^\S+ /, ''), dom:{ Parcours:'Routes', Exercices:'Exercises', Culture:'Space culture', Geo:'Geosciences (GEOPS)' }[dom], niv:niv(id), banque:banqueEN('en', EN[id]), gen:GEN[id] ? r => un(r, GEN[id])(r, 'en') : undefined })) });
    const astro = E.trouver('gb-astro'); if(astro) astro.chapitres = astro.chapitres.filter(c => c.id !== 'space-careers');
    if(E.PROGRAMME){ E.PROGRAMME['gb-nasa'] = [['Routes, qualifications and jobs (NASA, ESA, UK Space Agency)', 'GCSE → University', ['parcours', 'metiers']], ['Rockets, orbits and communications', 'A level physics · University', ['fusees', 'orbites', 'communications']],
        ['Units, life support and flight software', 'A level · University', ['unites', 'survie', 'code']], ['Missions, mission English and space geopolitics', 'GCSE → University', ['exploration', 'anglais', 'geopolitique']], ['Earth and planetary geosciences (GEOPS, Université Paris-Saclay)', 'GCSE → University', ['geops']]];
      const p = E.PROGRAMME['gb-astro']; if(p) E.PROGRAMME['gb-astro'] = p.filter(x => !x[2].includes('space-careers')); }
    if(E.EXAMENS) E.EXAMENS['uni-nasa'] = { titre:'Road to NASA: knowledge & calculations', ic:'🚀', niveau:'Uni', note:'alevel', papers:[
      { titre:'Rockets, orbits & communications', duree:'—', points:null, matiere:'gb-nasa', chapitres:['fusees', 'orbites', 'communications', 'unites'], n:10, niveau:'Uni' },
      { titre:'Routes, missions & geopolitics', duree:'—', points:null, matiere:'gb-nasa', chapitres:['parcours', 'exploration', 'geopolitique', 'survie', 'geops'], n:10, niveau:'Uni' }] }; }
  window.NASA_GEN = GEN;
  window.NASA_EN = EN;   // v6.14 : repris pour traduire « Objectif NASA » quand c'est la même question   // pour les tests
})();
