// v5.78 : épreuves construites comme les vraies (DNB 2026, épreuve anticipée de maths de 1re, bac de français).
// Ce sont des « sujets jumeaux » : même construction, mêmes types d'exercices et même barème que les sujets officiels,
// avec d'autres nombres et d'autres textes (écrits pour Ami des mots). Les sujets officiels restent sur education.gouv.fr (lien dans l'appli).
// Chaque générateur reçoit r() (hasard reproductible) et renvoie un exercice { titre, pts, contexte, questions:[{ q, bon, faux:[[réponse, vanne]], regle }] }.
(function(){
  'use strict';
  const hasard = g => { let a = (g >>> 0) || 1; return () => { a = (a + 0x6D2B79F5) | 0; let t = Math.imul(a ^ (a >>> 15), 1 | a); t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t; return ((t ^ (t >>> 14)) >>> 0) / 4294967296; }; };
  const ent = (r, a, b) => a + Math.floor(r() * (b - a + 1));
  const un = (r, l) => l[Math.floor(r() * l.length)];
  const nb = (x, d = 2) => { const v = Math.round(x * 10 ** d) / 10 ** d; return String(Object.is(v, -0) ? 0 : v).replace('.', ','); };
  const pgcd = (a, b) => { a = Math.abs(a); b = Math.abs(b); while(b){ [a, b] = [b, a % b]; } return a || 1; };
  const frac = (a, b) => { const g = pgcd(a, b); a /= g; b /= g; if(b < 0){ a = -a; b = -b; } return b === 1 ? String(a) : a + '/' + b; };
  // Une question : on retire les mauvaises réponses égales à la bonne ou en double.
  const Q = (q, bon, faux, regle) => { const vu = new Set([String(bon)]), f = [];
    for(const [x, v] of faux){ const s = String(x); if(!vu.has(s)){ vu.add(s); f.push([s, v]); } }
    return { q, bon:String(bon), faux:f.slice(0, 3), regle }; };
  const VF = (q, vrai, regle, vanne) => Q(q, vrai ? 'Vrai' : 'Faux', [[vrai ? 'Faux' : 'Vrai', vanne]], regle);

  // ───────────── DNB · Mathématiques · Partie 1 : automatismes (6 points, 20 min, sans calculatrice) ─────────────
  const AUTO_DNB = [
    r => { const b = un(r, [5, 7, 9, 11]), a = ent(r, 1, b - 3), c = ent(r, 1, b - a - 1);
      return Q('Calculer ' + a + '/' + b + ' + ' + c + '/' + b + '.', frac(a + c, b), [[(a + c) + '/' + (2 * b), 'Additionner les dénominateurs ? Les parts de pizza ne rétrécissent pas parce qu’on en mange deux. 🍕'], [(a * c) + '/' + b, 'Tu as multiplié au lieu d’additionner. Ami voit le signe + d’ici, il a de bons yeux.']], 'Même dénominateur : on additionne les numérateurs et on garde le dénominateur.'); },
    r => { const p = un(r, [40, 45, 60, 80, 120, 150]), t = un(r, [10, 20, 25]);
      return Q('Un article coûte ' + p + ' €. Il est soldé de ' + t + ' %. Quel est son nouveau prix ?', nb(p * (1 - t / 100)) + ' €', [[nb(p - t) + ' €', 'Tu as enlevé ' + t + ' euros, pas ' + t + ' %. Le vendeur te remercie pour ce cadeau.'], [nb(p * t / 100) + ' €', 'Ça, c’est le montant de la réduction. Tu paies la réduction ? Généreux.']], 'Baisser de ' + t + ' %, c’est multiplier par ' + nb(1 - t / 100) + '.'); },
    r => { const a = ent(r, 2, 7), x = ent(r, 2, 9), b = ent(r, 3, 20), c = a * x - b;
      return Q('Résoudre ' + a + 'x − ' + b + ' = ' + c + '.', 'x = ' + x, [['x = ' + nb((c - b) / a), 'Le ' + b + ' a changé de côté sans changer de signe. Il voyage sans passeport. ✈️'], ['x = ' + (c + b), 'Tu as oublié de diviser par ' + a + '. Il attend toujours, le pauvre.']], 'On ajoute ' + b + ' des deux côtés, puis on divise par ' + a + '.'); },
    r => { const l = Array.from({ length:9 }, () => ent(r, 1, 30)), s = l.slice().sort((a, b) => a - b), moy = l.reduce((t, x) => t + x, 0) / 9;
      return Q('Quelle est la médiane de la série : ' + l.join(' ; ') + ' ?', String(s[4]), [[String(l[4]), 'Tu as pris le nombre du milieu… sans ranger la série. C’est comme chercher le milieu d’une file d’attente en vrac.'], [nb(moy, 1), 'Ça, c’est la moyenne. La médiane et la moyenne sont cousines, pas jumelles.']], 'On range la série dans l’ordre : la médiane est la 5e valeur sur 9.'); },
    r => { const l = Array.from({ length:4 }, () => 2 * ent(r, 4, 9));
      return Q('Quelle est la moyenne de la série : ' + l.join(' ; ') + ' ?', nb(l.reduce((t, x) => t + x, 0) / 4), [[nb(l.reduce((t, x) => t + x, 0)), 'Ça, c’est la somme. Il manque la division par 4 : elle est partie en vacances.'], [nb((Math.min(...l) + Math.max(...l)) / 2), 'Le milieu entre le plus petit et le plus grand, ce n’est pas la moyenne. Bien tenté !']], 'Moyenne = somme des valeurs ÷ nombre de valeurs.'); },
    r => { const p = un(r, [3, 7, 9, 11, 13]), q = ent(r, 11, 60), n = p * q, c = [p + 1, p + 2, 2 * p + 1, p + 4, p + 6, 2 * p - 1].filter(x => x > 1 && n % x);
      return Q('Parmi ces nombres, lequel est un diviseur de ' + n + ' ?', String(p), [[String(c[0]), c[0] + ' ne divise pas ' + n + '. Ami a vérifié avec ses plumes, il en manque.'], [String(c[1]), 'Raté : ' + n + ' ÷ ' + c[1] + ' ne tombe pas juste.'], [String(n + 1), 'Un nombre plus grand que ' + n + ' ne peut pas le diviser. Ça déborde !']], n + ' = ' + p + ' × ' + q + '.'); },
    r => { const [k, m] = un(r, [[1, 6], [3, 18], [5, 30], [2, 12]]);
      return Q('Combien de minutes y a-t-il dans ' + k + '/10 d’heure ?', m + ' min', [[(k * 10) + ' min', 'Une heure n’a pas 100 minutes. Sinon Ami dormirait plus longtemps. ⏰'], [k + ' min', 'Il manque une conversion : on part d’heures, pas de minutes.']], '1 h = 60 min, donc 1/10 h = 6 min.'); },
    r => { const v = un(r, [20, 30, 60, 90]), t = un(r, [10, 15, 20, 30, 40]), d = v * t / 60;
      return Q('Un cycliste roule à ' + v + ' km/h. Combien de minutes met-il pour parcourir ' + nb(d) + ' km ?', nb(t) + ' min', [[nb(d / v) + ' min', 'C’est une durée en heures écrite comme des minutes. Le cycliste est arrivé avant d’être parti.'], [nb(v / d) + ' min', 'Vitesse ÷ distance ? La formule a fait un salto arrière.']], 'Durée = distance ÷ vitesse, puis on convertit en minutes (× 60).'); },
    r => { const b = ent(r, 3, 12), h = 2 * ent(r, 2, 6);
      return Q('Aire d’un triangle de base ' + b + ' cm et de hauteur ' + h + ' cm ?', (b * h / 2) + ' cm²', [[(b * h) + ' cm²', 'Ça, c’est l’aire du rectangle. Le triangle n’en est que la moitié, il est vexé.'], [(b + h) + ' cm²', 'Additionner base et hauteur ? L’aire ne marche pas comme une addition de courses.']], 'Aire d’un triangle = base × hauteur ÷ 2.'); },
    r => { const [t, bon, f1, f2] = un(r, [['la moitié', 'n ÷ 2', '2n', 'n − 2'], ['le double', '2n', 'n²', 'n + 2'], ['le triple augmenté de 1', '3n + 1', '3(n + 1)', 'n³ + 1'], ['le carré', 'n²', '2n', 'n × 2']]);
      return Q('Quelle expression donne ' + t + ' d’un nombre n ?', bon, [[f1, 'Presque ! Mais ce n’est pas la même opération. Ami a vérifié avec n = 3.'], [f2, 'Teste avec n = 10 : ça ne donne pas le bon résultat. Le test, c’est la vie.']], 'Pour vérifier une expression, on la teste avec un nombre simple.'); },
    r => { const x = ent(r, 1, 6) * un(r, [1, -1]), y = ent(r, 1, 6) * un(r, [1, -1]), c = p => '(' + p[0] + ' ; ' + p[1] + ')';
      return Q('Le point K a pour coordonnées ' + c([x, y]) + '. Quelles sont les coordonnées de son symétrique par rapport à l’origine O ?', c([-x, -y]), [[c([x, -y]), 'Ça, c’est une symétrie par rapport à l’axe des abscisses. Mauvais miroir !'], [c([-x, y]), 'Symétrie par rapport à l’axe des ordonnées. Ami te tend un autre miroir.'], [c([y, x]), 'Tu as échangé x et y. Ce n’est pas une danse de salon.']], 'Symétrie centrale de centre O : on change le signe des deux coordonnées.'); },
    r => Q('ABC est rectangle en B. On connaît AC et l’angle BAC. Quelle formule donne AB ?', 'AB = AC × cos(BAC)', [['AB = AC × sin(BAC)', 'Le sinus, c’est pour le côté opposé. Ici AB est adjacent à l’angle.'], ['AB = AC × tan(BAC)', 'La tangente ne marche pas avec l’hypoténuse. Elle boude.'], ['AB = AC ÷ cos(BAC)', 'Tu as divisé : AB deviendrait plus long que l’hypoténuse. Impossible, physiquement vexant.']], 'CAH : cos = côté adjacent ÷ hypoténuse.'),
    r => { const a = ent(r, 12, 98) / 10, k = ent(r, 3, 8), n = a * 10 ** k;
      return Q('Écrire ' + String(Math.round(n)).replace(/\B(?=(\d{3})+(?!\d))/g, ' ') + ' en écriture scientifique.', nb(a, 1) + ' × 10^' + k, [[nb(a * 10, 0) + ' × 10^' + (k - 1), 'Le nombre devant doit être entre 1 et 10. Là, il a trop mangé.'], [nb(a, 1) + ' × 10^' + (k + 1), 'Une puissance de trop : tu as ajouté un zéro gratuit.']], 'Écriture scientifique : a × 10^n avec 1 ≤ a < 10.'); },
    r => { const t = un(r, [10, 20, 25, 30, 75]), n = un(r, [40, 80, 120, 200, 360]);
      return Q('Calculer ' + t + ' % de ' + n + '.', nb(n * t / 100), [[nb(n / t), 'Diviser par ' + t + ' n’est pas prendre ' + t + ' %. Le pourcentage a perdu son « pour cent ».'], [nb(n - t), 'Tu as enlevé ' + t + ' au lieu de prendre ' + t + ' %. Raté avec panache.']], t + ' % de ' + n + ' = ' + n + ' × ' + t + ' ÷ 100.'); },
    r => { const a = ent(r, 2, 6), b = ent(r, 2, 6);
      return Q('Un sac contient ' + a + ' boules rouges et ' + b + ' boules bleues. On tire une boule au hasard. Probabilité d’avoir une rouge ?', frac(a, a + b), [[frac(a, b), 'Rouges ÷ bleues ? Il faut diviser par le nombre TOTAL de boules.'], [frac(1, 2), 'Deux couleurs ne veut pas dire une chance sur deux. Sinon Ami gagnerait au loto une fois sur deux.']], 'Probabilité = cas favorables ÷ cas possibles = ' + a + ' ÷ ' + (a + b) + '.'); }
  ];

  // ───────────── DNB · Mathématiques · Partie 2 : exercices (jumeaux des sujets 2026) ─────────────
  // Jumeau de l'exercice de géométrie (triangles, Pythagore, trigonométrie, Thalès, homothétie).
  function exoGeoHomothetie(r){
    const k = un(r, [1, 2]), [a, b, c] = un(r, [[3, 4, 5], [5, 12, 13], [8, 15, 17]]).map(x => x * k), rap = un(r, [2, 2.5, 4]); // longueurs exactes au centième : les rapports affichés restent égaux
    const AM = a, AB = b, MB = c, AT = AM / rap, AE = AB / rap, MT = AM + AT, ang = Math.round(Math.atan(AM / AB) * 180 / Math.PI);
    return { titre:'Géométrie', pts:4, contexte:'Les droites (BE) et (TM) se coupent en A. Le triangle ABM est rectangle en A. Figure hors échelle.\nAT = ' + nb(AT) + ' m ; MT = ' + nb(MT) + ' m ; AE = ' + nb(AE) + ' m ; MB = ' + nb(MB) + ' m.',
      questions:[
        Q('Les points T, A et M sont alignés dans cet ordre. Combien mesure AM ?', nb(AM) + ' m', [[nb(MT + AT) + ' m', 'Tu as ajouté AT au lieu de l’enlever. A est ENTRE T et M.'], [nb(MT) + ' m', 'Ça, c’est MT en entier. AM n’en est qu’un morceau.']], 'AM = MT − AT.'),
        Q('Combien mesure AB ?', nb(AB) + ' m', [[nb(Math.sqrt(MB * MB + AM * AM)) + ' m', 'Tu as additionné les carrés : ça donne l’hypoténuse. Mais l’hypoténuse, c’est MB !'], [nb(MB - AM) + ' m', 'Pythagore ne se fait pas avec une soustraction de longueurs. Il faut les carrés !']], 'Pythagore dans ABM rectangle en A : AB² = MB² − AM².'),
        Q('Mesure de l’angle ABM, arrondie au degré ?', ang + '°', [[(90 - ang) + '°', 'C’est l’autre angle aigu du triangle. Tu as visé le voisin.'], [nb(Math.atan(AM / AB)), 'Ta calculatrice est en mode radians ! Ami le voit d’ici. Passe-la en degrés.']], 'tan(ABM) = AM ÷ AB (côté opposé ÷ côté adjacent).'),
        Q('Les droites (TE) et (BM) sont-elles parallèles ?', 'Oui, car AT/AM = AE/AB', [['Non, car AT ≠ AE', 'Ce ne sont pas les longueurs qui doivent être égales, mais les RAPPORTS.'], ['On ne peut pas savoir', 'On peut : la réciproque de Thalès est faite pour ça !']], 'AT/AM = ' + nb(AT / AM, 3) + ' et AE/AB = ' + nb(AE / AB, 3) + ' : réciproque du théorème de Thalès.'),
        Q('Rapport de l’homothétie de centre A qui transforme AET en ABM ?', nb(-rap), [[nb(rap), 'Le signe ! A est entre les deux triangles : l’homothétie retourne la figure, donc le rapport est négatif.'], [nb(-1 / rap), 'C’est l’homothétie inverse : de ABM vers AET.']], 'Rapport −AM/AT, négatif car A est entre T et M.')
      ] };
  }
  // Jumeau de l'exercice « programme de calcul » + Scratch.
  function exoProgramme(r){
    let a, b, c, x0; do { a = ent(r, 1, 5); b = ent(r, 2, 6); c = ent(r, 1, 4); } while((a * b) % (b + c));
    x0 = ent(r, 1, 4); const val = x => (x - a) * b + c * x, sol = a * b / (b + c);
    return { titre:'Programme de calcul et algorithmique', pts:4, contexte:'Programme A : choisir un nombre ; soustraire ' + a + ' ; multiplier par ' + b + ' ; ajouter ' + (c === 1 ? 'le nombre de départ' : c === 2 ? 'le double du nombre de départ' : c === 3 ? 'le triple du nombre de départ' : 'le quadruple du nombre de départ') + '.\nProgramme B (Scratch) : dire « ' + (b + c) + ' × nombre − ' + (a * b) + ' ».',
      questions:[
        Q('Avec ' + x0 + ' comme nombre de départ, que donne le programme A ?', String(val(x0)), [[String((x0 - a) * b), 'Tu as oublié la dernière étape. Le programme n’était pas fini !'], [String(x0 - a * b + c * x0), 'Les parenthèses ! On soustrait ' + a + ' AVANT de multiplier.']], '(' + x0 + ' − ' + a + ') × ' + b + ' + ' + c + ' × ' + x0 + ' = ' + val(x0) + '.'),
        Q('Expression du résultat du programme A en fonction de x ?', (b + c) + 'x − ' + (a * b), [[(b + c) + 'x − ' + a, 'Le ' + a + ' doit aussi être multiplié par ' + b + '. La distributivité ne fait pas de jaloux.'], [(b * c) + 'x − ' + (a * b), 'On ADDITIONNE ' + b + 'x et ' + c + 'x, on ne les multiplie pas.']], '(x − ' + a + ') × ' + b + ' + ' + c + 'x = ' + b + 'x − ' + (a * b) + ' + ' + c + 'x.'),
        Q('Quel nombre de départ donne 0 ?', nb(sol), [[nb(-sol), 'Le signe s’est trompé de chemin en route.'], [String(a), 'Avec ' + a + ', la parenthèse fait 0… mais il reste ' + c + ' × ' + a + ' à ajouter !']], (b + c) + 'x − ' + (a * b) + ' = 0 donne x = ' + (a * b) + ' ÷ ' + (b + c) + '.'),
        Q('Les programmes A et B donnent-ils toujours le même résultat ?', 'Oui, pour tout nombre x', [['Seulement pour x = ' + x0, 'Un seul exemple ne prouve rien. Il faut l’expression littérale !'], ['Non, jamais', 'Compare les expressions : elles sont identiques.']], 'A donne ' + (b + c) + 'x − ' + (a * b) + ', exactement comme B.')
      ] };
  }
  // Jumeau de l'exercice « tarifs » (fonctions, proportionnalité, tableur).
  function exoTarifs(r){
    let p, s, q, F, n1, n2, essais = 0; do { if(++essais > 300){ p = 5.5; q = 3.5; s = 15; F = 64; n1 = 8; n2 = 15; break; } p = ent(r, 8, 14) / 2; q = ent(r, 4, Math.floor(p * 2) - 3) / 2; s = ent(r, 2, 6) * 5; F = ent(r, 10, 20) * 5; n1 = Math.floor(s / (p - q)) + 1; n2 = Math.floor((F - s) / q) + 1; } while(!(n1 > 2 && n2 > n1 + 2 && F > s + 10));
    const n = ent(r, 6, 14);
    return { titre:'Fonctions, proportionnalité et tableur', pts:4, contexte:'Un centre de loisirs propose trois tarifs par demi-journée :\nTarif A : ' + nb(p) + ' € la demi-journée.\nTarif B : abonnement de ' + s + ' €, puis ' + nb(q) + ' € la demi-journée.\nTarif C : forfait de ' + F + ' € pour l’année.',
      questions:[
        Q('Prix de ' + n + ' demi-journées avec le tarif B ?', nb(s + q * n) + ' €', [[nb(q * n) + ' €', 'Et l’abonnement ? Il est payant, lui aussi !'], [nb((s + q) * n) + ' €', 'L’abonnement se paie UNE fois, pas à chaque demi-journée. Ouille.']], s + ' + ' + nb(q) + ' × ' + n + ' = ' + nb(s + q * n) + ' €.'),
        Q('Quelle fonction correspond au tarif B ?', 'f(x) = ' + s + ' + ' + nb(q) + 'x', [['f(x) = ' + nb(p) + 'x', 'Ça, c’est le tarif A : pas d’abonnement.'], ['f(x) = ' + F, 'Fonction constante : c’est le forfait C.']], 'Abonnement fixe + prix par demi-journée × x.'),
        Q('Le tarif B est-il proportionnel au nombre de demi-journées ?', 'Non, car sa droite ne passe pas par l’origine', [['Oui, car c’est une droite', 'Toutes les droites ne sont pas proportionnelles : il faut passer par l’origine.'], ['Oui, car le prix augmente', 'Ça augmente, oui, mais 0 demi-journée coûte déjà ' + s + ' €.']], 'Proportionnalité : droite qui passe par l’origine (0 € pour 0 demi-journée).'),
        Q('À partir de combien de demi-journées le tarif B devient-il plus avantageux que le A ?', String(n1), [[String(n1 - 1), 'À ' + (n1 - 1) + ', le tarif A est encore moins cher ou égal. Vérifie !'], [String(n2), 'Ça, c’est le seuil entre B et C.']], 'On cherche le plus petit entier n tel que ' + s + ' + ' + nb(q) + 'n < ' + nb(p) + 'n.'),
        Q('À partir de combien de demi-journées le forfait C devient-il le plus avantageux ?', String(n2), [[String(n2 - 1), 'À ' + (n2 - 1) + ', le tarif B est encore moins cher ou égal.'], [String(n1), 'Ça, c’est le seuil entre A et B. Tu as changé de match.']], 'On cherche le plus petit entier n tel que ' + F + ' < ' + s + ' + ' + nb(q) + 'n.'),
        Q('Dans le tableur, quelle formule calcule le tarif B en B2 (nombre de demi-journées en A2) ?', '=' + s + '+' + nb(q).replace(',', '.') + '*A2', [['=' + nb(p).replace(',', '.') + '*A2', 'Formule du tarif A. Mauvaise colonne, champion.'], ['=(' + s + '+' + nb(q).replace(',', '.') + ')*A2', 'Les parenthèses multiplient aussi l’abonnement. Le tableur ne pardonne pas.']], 'Une formule de tableur commence par = et utilise la cellule A2.')
      ] };
  }
  // Jumeau de l'exercice de géométrie court (réciproque de Pythagore, aire, Thalès).
  function exoGeoTriangles(r){
    const k = un(r, [1, 2, 3]), [a, b, c] = un(r, [[3, 4, 5], [6, 8, 10], [5, 12, 13]]).map(x => x * k), m = un(r, [2, 3]);
    return { titre:'Géométrie', pts:2.5, contexte:'Dans le triangle AED : AE = ' + a + ' cm, ED = ' + b + ' cm et AD = ' + c + ' cm. Sur [AD], on place C tel que AC = ' + nb(c / m) + ' cm, et sur [AE], on place B tel que (BC) // (ED).',
      questions:[
        Q('Le triangle AED est-il rectangle ?', 'Oui, en E', [['Oui, en A', 'L’angle droit est en face de l’hypoténuse, le plus grand côté. Ici, c’est AD : l’angle droit est en E.'], ['Non', a + '² + ' + b + '² = ' + (a * a + b * b) + ' = ' + c + '². C’est la réciproque de Pythagore qui te dit le contraire !']], 'AE² + ED² = AD² : réciproque du théorème de Pythagore.'),
        Q('Aire du triangle AED ?', (a * b / 2) + ' cm²', [[(a * b) + ' cm²', 'Il manque le ÷ 2. Le triangle réclame sa moitié.'], [(a * c / 2) + ' cm²', 'AD n’est pas une hauteur : c’est l’hypoténuse.']], 'Triangle rectangle en E : aire = AE × ED ÷ 2.'),
        Q('Longueur BC ?', nb(b / m) + ' cm', [[nb(b * m) + ' cm', 'Le petit triangle est plus petit : on divise, on ne multiplie pas.'], [nb(c / m) + ' cm', 'Ça, c’est AC. Tu as pris le mauvais côté.']], 'Thalès : AC/AD = BC/ED = 1/' + m + '.')
      ] };
  }
  // Jumeau de l'exercice « fonctions » (image, antécédent, tableur, graphique, équation).
  function exoFonctions(r){
    const a = ent(r, 1, 3), b = ent(r, 1, 4), c = ent(r, 2, 3), d = ent(r, 1, 3), f = x => (x - a) * (x + b), g = x => c * x + d, x1 = -ent(r, 2, 5), y = c * ent(r, 1, 4) + d;
    const sols = []; for(let x = -10; x <= 10; x++) if(f(x) === g(x)) sols.push(x);
    return { titre:'Fonctions', pts:3.5, contexte:'f(x) = (x − ' + a + ')(x + ' + b + ') et g(x) = ' + c + 'x + ' + d + '.',
      questions:[
        Q('Calculer f(' + x1 + ').', String(f(x1)), [[String((x1 - a) + (x1 + b)), 'Tu as ADDITIONNÉ les parenthèses. Entre deux parenthèses collées, c’est une multiplication !'], [String(-f(x1)), 'Moins par moins donne plus. Le signe t’a eu.']], '(' + x1 + ' − ' + a + ') × (' + x1 + ' + ' + b + ') = ' + f(x1) + '.'),
        Q('Antécédent de ' + y + ' par g ?', nb((y - d) / c), [[String(g(y)), 'Ça, c’est l’IMAGE de ' + y + '. L’antécédent, c’est le nombre de départ.'], [nb((y + d) / c), 'On enlève ' + d + ', on ne l’ajoute pas.']], 'On résout ' + c + 'x + ' + d + ' = ' + y + '.'),
        Q('Dans le tableur, formule pour f(x) en B2 si x est en A2 ?', '=(A2-' + a + ')*(A2+' + b + ')', [['=A2-' + a + '*A2+' + b, 'Sans parenthèses, le tableur fait les priorités à sa façon. Il n’est pas télépathe.'], ['(A2-' + a + ')*(A2+' + b + ')', 'Il manque le = au début : le tableur croit que c’est du texte.']], 'Toujours = au début, et les parenthèses comme dans l’expression.'),
        Q('Combien de solutions entières entre −10 et 10 a l’équation f(x) = g(x) ?', String(sols.length), [[String(sols.length + 1), 'Il y en a une en trop. Recompte au tableur !'], [String(Math.max(0, sols.length - 1)), 'Il en manque une. Elle se cache bien.']], sols.length ? 'Solutions : ' + sols.join(' et ') + '.' : 'Aucune solution entière dans cet intervalle.')
      ] };
  }
  // Jumeau de l'exercice « statistiques, pourcentages, écriture scientifique ».
  function exoStatsEnergie(r){
    const N = un(r, [400, 500, 800, 1000]), pc = un(r, [60, 75, 80, 90]), ch = Math.round(N * un(r, [0.4, 0.5])), ok = Math.round(N * pc / 100), gwh = un(r, [2, 5, 8]), col = un(r, [250, 400, 500]);
    return { titre:'Statistiques, proportionnalité et écriture scientifique', pts:4, contexte:'Partie A. Une intelligence artificielle classe ' + N + ' images : ' + ch + ' images de chats, les autres de chiens. Elle réussit ' + pc + ' % de ses classements.\nPartie B. Son entraînement a consommé ' + gwh + ' GWh. Un collège consomme ' + col + ' MWh par an.',
      questions:[
        Q('Combien d’images de chiens ?', String(N - ch), [[String(ch), 'Ça, ce sont les chats. Les chiens aboient d’indignation.'], [String(N + ch), 'On enlève, on n’ajoute pas !']], N + ' − ' + ch + ' = ' + (N - ch) + '.'),
        Q('Combien d’images bien classées ?', String(ok), [[String(N - ok), 'Ça, ce sont les ratées. L’IA ne veut pas qu’on en parle.'], [String(pc), 'C’est le pourcentage, pas le nombre d’images.']], pc + ' % de ' + N + ' = ' + ok + '.'),
        Q('Probabilité qu’une image prise au hasard soit mal classée (écriture décimale) ?', nb(1 - pc / 100), [[nb(pc / 100), 'Ça, c’est la probabilité d’être BIEN classée.'], [String(N - ok), 'Une probabilité est entre 0 et 1. Là, c’est un effectif.']], '1 − ' + nb(pc / 100) + ' = ' + nb(1 - pc / 100) + '.'),
        Q(gwh + ' GWh, combien de Wh ?', gwh + ' × 10^9 Wh', [[gwh + ' × 10^6 Wh', '10^6, c’est méga. Giga, c’est 10^9 : trois zéros de plus !'], [gwh + ' × 10^3 Wh', 'Il manque six zéros. Ils sont partis en vacances.']], 'Giga = 10^9.'),
        Q('Combien de collèges entiers pourrait-on alimenter pendant un an avec cette énergie ?', String(Math.floor(gwh * 1000 / col)), [[String(gwh * 1000 * col), 'Tu as multiplié : il fallait diviser. L’énergie ne se multiplie pas comme des petits pains.'], [nb(col / gwh / 1000, 3), 'Division à l’envers. Le résultat ne veut plus rien dire.']], gwh + ' GWh = ' + (gwh * 1000) + ' MWh ; ' + (gwh * 1000) + ' ÷ ' + col + ' = ' + nb(gwh * 1000 / col) + ', donc ' + Math.floor(gwh * 1000 / col) + ' collèges entiers.')
      ] };
  }
  // Jumeau de l'exercice de programmation (lutin, carrés, triangles).
  function exoLutin(r){
    const L = un(r, [50, 80, 100, 120]);
    return { titre:'Programmation', pts:2, contexte:'Un lutin part du point (0 ; 0), orienté vers la droite. Les blocs « avancer de … » et « tourner de … degrés » permettent de tracer des carrés et des triangles équilatéraux de côté ' + L + '.',
      questions:[
        Q('Coordonnées du lutin après « avancer de ' + L + ' » ?', '(' + L + ' ; 0)', [['(0 ; ' + L + ')', 'Il regardait vers la droite, pas vers le haut. Il a pris l’ascenseur ?'], ['(' + L + ' ; ' + L + ')', 'Il a avancé en ligne droite, pas en diagonale.']], 'Vers la droite, seule l’abscisse augmente.'),
        Q('De combien de degrés tourner à chaque coin pour un triangle équilatéral ?', '120°', [['60°', '60°, c’est l’angle INTÉRIEUR. Le lutin tourne de l’angle extérieur : 180 − 60.'], ['90°', '90°, c’est pour un carré. Le triangle te regarde de travers.']], 'Angle extérieur = 180° − 60° = 120° ; trois tours de 120° font 360°.'),
        Q('Combien de fois répéter « avancer de ' + L + ', tourner de 90° » pour un carré ?', '4', [['3', 'Avec trois côtés, le carré reste ouvert. Les courants d’air, très peu pour lui.'], ['360', 'On répète 4 fois, pas 360. Le lutin a le tournis.']], '4 côtés × 90° = 360°.')
      ] };
  }

  // ───────────── DNB · Français (jumeau : compréhension + grammaire 50 pts, dictée 10 pts) ─────────────
  // Textes écrits pour Ami des mots, construits comme les textes du brevet (récit à la première personne, souvenir de guerre ou d'enfance).
  const TEXTES_DNB = [
    { titre:'« La sentinelle »', source:'Texte écrit pour Ami des mots, à la manière d’un récit autobiographique de la Grande Guerre.',
      texte:'Cette nuit-là, je montais la garde seul au bout de la tranchée. Le froid mordait mes doigts et la pluie avait cessé. Je n’entendais plus rien : ni les canons, ni les voix des camarades endormis. Ce silence m’inquiétait davantage que le vacarme des jours précédents. Soudain, un bruit léger glissa dans les barbelés. Je serrai mon fusil. Était-ce un rat, un homme, le vent ? Je retenais mon souffle. Je me répétais que les rats sont nombreux ici, que le vent joue des tours, que l’ennemi dort comme nous. Rien ne bougeait plus. Pourtant, jusqu’à l’aube, je sentis peser sur moi un regard invisible.',
      questions:[
        Q('Quel sentiment domine chez le narrateur ?', 'L’inquiétude, puis la peur', [['La joie', 'Le narrateur retient son souffle dans le noir. Ce n’est pas une fête d’anniversaire.'], ['L’ennui', 'Il est aux aguets, pas en train de bâiller. Relis la fin du texte !']], 'Indices : « m’inquiétait », « je retenais mon souffle », « un regard invisible ».'),
        Q('Pourquoi le silence inquiète-t-il le narrateur ?', 'Parce qu’il est inhabituel et peut cacher un danger', [['Parce qu’il aime le bruit des canons', 'Il n’aime pas les canons : c’est le CONTRASTE avec les jours précédents qui l’inquiète.'], ['Parce qu’il veut dormir', 'Il monte la garde : dormir est justement interdit.']], 'Le silence contraste avec « le vacarme des jours précédents ».'),
        Q('« Était-ce un rat, un homme, le vent ? » Quel procédé exprime l’inquiétude ?', 'Une question rhétorique avec une énumération', [['Une comparaison', 'Il n’y a pas de « comme » ni de rapprochement entre deux éléments.'], ['Une hyperbole', 'Rien n’est exagéré ici : ce sont des hypothèses qui s’enchaînent.']], 'Les hypothèses énumérées traduisent le doute et l’angoisse.'),
        Q('Comment le narrateur essaie-t-il de se rassurer ?', 'Il se répète des explications rassurantes', [['Il appelle ses camarades', 'Ses camarades dorment : il reste seul avec ses pensées.'], ['Il quitte son poste', 'Il ne bouge pas. Une sentinelle qui part, c’est un scénario de film raté.']], '« Je me répétais que les rats sont nombreux… que l’ennemi dort comme nous. »'),
        Q('« Je retenais mon souffle » : à quel temps est le verbe ?', 'Imparfait de l’indicatif', [['Passé simple', 'Le passé simple serait « je retins ». Ici, la terminaison -ais trahit l’imparfait.'], ['Plus-que-parfait', 'Le plus-que-parfait aurait un auxiliaire : « j’avais retenu ».']], 'Terminaison -ais à la 1re personne : imparfait.'),
        Q('Valeur de l’imparfait dans « je retenais mon souffle » ?', 'Action qui dure, en arrière-plan', [['Action brève et soudaine', 'Ça, c’est le rôle du passé simple : « un bruit glissa ».'], ['Vérité générale', 'Une vérité générale est au présent : « les rats sont nombreux ».']], 'L’imparfait décrit une action en cours, qui dure.'),
        Q('« Soudain, un bruit léger glissa » : classe grammaticale de « léger » ?', 'Adjectif qualificatif', [['Adverbe', 'Un adverbe est invariable. « Léger » s’accorde avec « bruit » : légère, légers…'], ['Nom', 'Il ne désigne rien tout seul : il qualifie le nom « bruit ».']], '« Léger » qualifie le nom « bruit » et s’accorde avec lui.'),
        Q('Fonction de « léger » dans cette phrase ?', 'Épithète du nom « bruit »', [['Attribut du sujet', 'Il n’y a pas de verbe d’état entre « bruit » et « léger ».'], ['COD', 'Un adjectif n’est jamais COD. Ami a failli tomber de sa branche.']], 'Placé directement à côté du nom, sans verbe : épithète.'),
        Q('« Invisible » est formé de :', 'in- (préfixe) + vis (radical) + -ible (suffixe)', [['invi- + sible', 'Ce découpage n’existe pas. Le radical est « vis », comme dans « vision ».'], ['in- + visible, sans suffixe', '« -ible » est bien un suffixe : il signifie « qui peut être ».']], 'in- = contraire ; vis = voir ; -ible = qui peut être.'),
        Q('Mot de la même famille que « invisible » ?', 'visibilité', [['vitesse', 'Même début de mot, mais pas le même sens. Fausse famille, vraie arnaque.'], ['visiteur', 'Visiter vient d’un autre verbe latin. Cousin éloigné, pas frère.']], 'Même radical « vis », sens lié à « voir ».'),
        Q('Réécriture : « Je retenais mon souffle. Je serrai mon fusil. » avec « nous » :', 'Nous retenions notre souffle. Nous serrâmes nos fusils.', [['Nous retenions notre souffle. Nous serrions nos fusils.', 'Le passé simple doit rester un passé simple : « nous serrâmes ».'], ['Nous retenaient notre souffle. Nous serrâmes nos fusils.', '« Nous retenaient » ? La terminaison -aient, c’est pour « ils ».'], ['Nous retenions notre souffle. Nous serrâmes nos fusil.', '« Nos » annonce un pluriel : il faut un s à la fin du mot.']], 'On change la personne, les verbes ET les déterminants possessifs, sans changer les temps.')
      ] },
    { titre:'« Le grenier »', source:'Texte écrit pour Ami des mots, à la manière d’un souvenir d’enfance.',
      texte:'Chaque été, ma grand-mère m’interdisait de monter au grenier. Évidemment, je n’avais qu’une idée en tête : y aller. Un après-midi de canicule, pendant qu’elle faisait la sieste, je gravis l’escalier sur la pointe des pieds. La porte grinça comme une vieille chanson. À l’intérieur, la poussière dansait dans un rayon de soleil. Des malles fermées dormaient sous des draps blancs. J’en ouvris une, le cœur battant. Elle contenait des lettres, des centaines de lettres, toutes adressées à une femme que je ne connaissais pas. Je compris plus tard que cette inconnue, c’était ma grand-mère à vingt ans.',
      questions:[
        Q('Pourquoi le narrateur monte-t-il au grenier ?', 'Par curiosité, parce que c’est interdit', [['Pour faire le ménage', 'La poussière dansait… et personne ne l’a dérangée. Pas de ménage en vue.'], ['Parce que sa grand-mère le lui demande', 'Elle le lui INTERDIT. Relis la première phrase !']], '« Évidemment, je n’avais qu’une idée en tête : y aller. »'),
        Q('« La porte grinça comme une vieille chanson » : quel procédé ?', 'Une comparaison', [['Une métaphore', 'Il y a l’outil « comme » : c’est donc une comparaison.'], ['Une antithèse', 'Une antithèse oppose deux idées. Ici, on rapproche deux sons.']], 'Comparaison : comparé (le grincement), outil (comme), comparant (une vieille chanson).'),
        Q('« Des malles fermées dormaient » : quel procédé ?', 'Une personnification', [['Une comparaison', 'Pas de « comme » ici. Les malles dorment vraiment, dans le texte.'], ['Une énumération', 'Il n’y a pas de liste. Juste des malles qui font la sieste.']], 'On prête une action humaine (dormir) à des objets.'),
        Q('Quelle révélation termine le texte ?', 'La destinataire des lettres est la grand-mère jeune', [['Les lettres sont pour le narrateur', 'Elles sont adressées à une femme « inconnue »… qui ne l’est pas tant que ça.'], ['La grand-mère cache un trésor en or', 'Le trésor, ce sont les lettres. Pas de pièces d’or, désolé.']], 'Dernière phrase : « cette inconnue, c’était ma grand-mère à vingt ans ».'),
        Q('« je gravis l’escalier » : temps du verbe ?', 'Passé simple de l’indicatif', [['Présent', 'Le présent serait « je gravis » aussi… mais le récit est au passé : c’est le passé simple, comme « j’ouvris », « je compris ».'], ['Imparfait', 'L’imparfait serait « je gravissais ».']], 'Action de premier plan dans un récit au passé : passé simple.'),
        Q('Dans « pendant qu’elle faisait la sieste », la proposition subordonnée est :', 'Circonstancielle de temps', [['Relative', 'Une relative complète un nom, avec qui, que, dont… Ici, « pendant que » indique le moment.'], ['Complétive', 'Une complétive est COD d’un verbe. Ici, elle indique QUAND.']], '« Pendant que » introduit une circonstancielle de temps.'),
        Q('Fonction de « au grenier » dans « monter au grenier » ?', 'Complément du verbe indiquant le lieu', [['Sujet', 'Le grenier ne monte nulle part. C’est le narrateur qui monte.'], ['Épithète', 'Une épithète est un adjectif. « Au grenier » est un groupe prépositionnel.']], 'Il répond à la question « où ? ».'),
        Q('Réécriture : « J’en ouvris une, le cœur battant. » avec « elles » :', 'Elles en ouvrirent une, le cœur battant.', [['Elles en ouvrit une, le cœur battant.', 'Avec « elles », il faut -irent : le verbe s’accorde avec son sujet.'], ['Elles en ouvraient une, le cœur battant.', 'Le temps a changé en route : il fallait garder le passé simple.']], 'Passé simple, 3e personne du pluriel : ouvrirent.')
      ] }
  ];
  // Dictée « à trous » : la bonne graphie parmi les pièges classiques du brevet (accords, homophones, participes passés).
  const DICTEE = [
    ['Les lettres qu’elle avait ___ dormaient au fond de la malle.', 'écrites', ['écrit', 'écrits'], 'Participe passé avec « avoir » : accord avec le COD placé avant (« les lettres », féminin pluriel).'],
    ['Ils se sont ___ sans un mot.', 'regardés', ['regardé', 'regarder'], 'Verbe pronominal : « se » est COD, donc accord avec le sujet.'],
    ['La pluie ___ cessé depuis longtemps.', 'avait', ['avais', 'avaient'], 'Le sujet « la pluie » est à la 3e personne du singulier.'],
    ['___ soldats attendaient l’aube.', 'Ces', ['Ses', 'C’est'], '« Ces » = démonstratif (on montre) ; « ses » = possessif.'],
    ['Elle ne savait plus ___ aller.', 'où', ['ou', 'houx'], '« Où » indique le lieu ; « ou » = « ou bien ».'],
    ['Les enfants sont ___ en courant.', 'partis', ['parti', 'partit'], 'Avec « être », le participe passé s’accorde avec le sujet.'],
    ['Il faut ___ la porte doucement.', 'fermer', ['fermé', 'fermez'], 'Après « il faut », on met l’infinitif. Astuce : remplace par « mordre ».'],
    ['___ n’est pas facile de se taire.', 'Ce', ['Se', 'Ceux'], '« Ce » peut être remplacé par « cela ».'],
    ['Quelles que soient tes ___, garde courage.', 'peurs', ['peur', 'peures'], '« Tes » annonce un pluriel.'],
    ['Les feuilles ___ dans le vent.', 'tourbillonnaient', ['tourbillonnait', 'tourbillonnais'], 'Sujet pluriel : terminaison -aient.']
  ];
  const VANNES_DICTEE = ['Le correcteur pleure, Ami prépare un mouchoir. Relis l’accord !', 'Raté : cette orthographe a fait un détour par la forêt.', 'Presque ! Mais la terminaison est partie sans prévenir.', 'Ami a entouré cette faute en rouge fluo. Avec amour.'];
  const REDACTION = [['Sujet de réflexion', 'Selon vous, le silence peut-il être plus inquiétant que le bruit ? Vous répondrez dans un développement organisé et argumenté.'],
    ['Sujet d’imagination', 'Le narrateur raconte, des années plus tard, ce qu’il a découvert cette nuit-là. Votre texte mêlera récit et émotions.']];

  // ───────────── DNB · Histoire-géographie (40 pts) et EMC (20 pts) ─────────────
  const HG_GEO = [
    { titre:'Analyser et comprendre des documents en géographie — Les espaces productifs et leurs évolutions', pts:15, contexte:'Document (rédigé pour Ami des mots) : « Depuis les années 1970, beaucoup d’anciennes régions industrielles, comme le Nord ou la Lorraine, ont perdu des usines face à la concurrence mondiale. Les nouvelles usines s’installent plutôt près des grandes villes, des autoroutes, des ports et des frontières. Un constructeur automobile étranger a ainsi choisi le Valenciennois : main-d’œuvre qualifiée, terrains disponibles, autoroutes et proximité de l’Europe du Nord. Être connecté au monde devient un atout décisif. »',
      questions:[
        Q('Une cause du déclin des anciens espaces industriels ?', 'La concurrence mondiale', [['Le manque de soleil', 'Les usines n’ont pas besoin de bronzer. Relis le document !'], ['La construction d’autoroutes', 'Les autoroutes attirent les usines, elles ne les font pas fuir.']], 'Le document cite « la concurrence mondiale ».'),
        Q('Où s’installent les nouvelles usines ?', 'Près des grandes villes, des axes de transport et des frontières', [['Au sommet des montagnes', 'Livrer des voitures en télésiège ? Original, mais non.'], ['Uniquement dans les campagnes isolées', 'Isolées = mal reliées. Exactement ce que les usines évitent.']], 'Accessibilité et proximité des marchés.'),
        Q('Pourquoi ce constructeur a-t-il choisi le Valenciennois ?', 'Main-d’œuvre qualifiée, terrains, autoroutes, proximité de l’Europe du Nord', [['Pour la plage', 'Le Valenciennois n’est pas en bord de mer. Ami a vérifié sur la carte.'], ['Parce que les usines y sont interdites', 'Si c’était interdit, il n’y aurait pas d’usine. Logique implacable.']], 'Le document donne quatre raisons.'),
        Q('Pourquoi être connecté au monde est-il un atout ?', 'Pour importer, exporter et attirer les entreprises', [['Pour avoir le wifi gratuit', 'On parle de routes, de ports et d’échanges… pas de wifi. 😏'], ['Pour fermer les frontières', 'C’est l’inverse : être connecté, c’est échanger.']], 'Mondialisation : les échanges passent par les axes de transport.'),
        Q('Quelle phrase résume le mieux le document ?', 'Les espaces productifs se transforment avec la mondialisation', [['L’industrie française a totalement disparu', 'Elle s’est transformée et déplacée, pas évaporée.'], ['Rien n’a changé depuis 1970', 'Le document parle justement de changements.']], 'Mutation des espaces productifs : déclin, reconversion, nouvelles implantations.')
      ] },
    { titre:'Analyser et comprendre des documents en géographie — Les aires urbaines', pts:15, contexte:'Document (rédigé pour Ami des mots) : « Aujourd’hui, plus de huit Français sur dix vivent dans une aire urbaine. Autour des villes-centres, les banlieues puis les couronnes périurbaines s’étendent, avec des maisons individuelles et des zones commerciales. Les habitants du périurbain se déplacent beaucoup en voiture pour aller travailler. Pour limiter l’étalement urbain, certaines villes développent les transports en commun et rénovent les quartiers anciens. »',
      questions:[
        Q('Quelle part de la population vit dans une aire urbaine ?', 'Plus de huit Français sur dix', [['Un sur dix', 'C’est l’inverse ! La France est très urbaine.'], ['La moitié', 'Le document donne une proportion bien plus forte.']], 'Plus de 80 % de la population.'),
        Q('Comment s’appelle l’espace autour des banlieues, avec maisons individuelles ?', 'La couronne périurbaine', [['Le centre-ville', 'Le centre, c’est au milieu. Le périurbain, c’est autour.'], ['L’espace rural isolé', 'Le périurbain dépend de la ville : ses habitants y vont tous les jours.']], 'Périurbain = autour de la ville, sous son influence.'),
        Q('Un problème lié à l’étalement urbain ?', 'Beaucoup de trajets en voiture', [['Trop de transports en commun', 'C’est justement la solution, pas le problème.'], ['Pas assez de maisons', 'Le document parle plutôt de maisons qui s’étendent partout.']], 'Mobilités pendulaires, embouteillages, pollution.'),
        Q('Une solution évoquée par le document ?', 'Développer les transports en commun', [['Construire plus loin encore', 'Ça aggraverait l’étalement. Ami secoue la tête.'], ['Interdire les voitures partout', 'Le document ne propose pas ça. Pas de solution magique.']], 'Transports en commun et rénovation des quartiers anciens.')
      ] }
  ];
  const HG_REPERES = [
    ['Fin de la Seconde Guerre mondiale en Europe', '1945', ['1918', '1939']],
    ['Traité de Rome (création de la CEE)', '1957', ['1945', '1992']],
    ['Traité de Maastricht', '1992', ['1957', '2002']],
    ['Mise en circulation des pièces et billets en euros', '2002', ['1992', '1999']],
    ['Chute du mur de Berlin', '1989', ['1961', '1991']],
    ['Fin de l’URSS', '1991', ['1989', '1945']],
    ['Début de la Ve République', '1958', ['1946', '1968']],
    ['Droit de vote des femmes en France', '1944', ['1918', '1968']],
    ['Fin de la guerre d’Algérie', '1962', ['1954', '1958']],
    ['Début de la Première Guerre mondiale', '1914', ['1918', '1939']],
    ['Révolutions russes', '1917', ['1914', '1922']],
    ['Arrivée d’Hitler au pouvoir', '1933', ['1939', '1923']],
    ['Début de la Seconde Guerre mondiale', '1939', ['1933', '1945']],
    ['Appel du général de Gaulle', '18 juin 1940', ['6 juin 1944', '8 mai 1945']],
    ['Débarquement de Normandie', '6 juin 1944', ['18 juin 1940', '8 mai 1945']]
  ];
  const HG_DEV = [
    { titre:'Maîtriser différents langages — La construction européenne depuis 1945', questions:[
      Q('Quel objectif principal des débuts de la construction européenne ?', 'Garantir la paix, notamment entre la France et l’Allemagne', [['Créer une armée pour conquérir l’Asie', 'Pas du tout ! L’idée, c’était justement d’arrêter les guerres.'], ['Supprimer tous les pays', 'Les pays restent : ils coopèrent.']], 'Réconciliation franco-allemande après deux guerres mondiales.'),
      Q('Quel ordre chronologique est juste ?', 'CEE (1957) → Maastricht (1992) → euro en circulation (2002)', [['Euro (2002) → CEE (1957) → Maastricht (1992)', 'L’euro avant la CEE ? Ami a vu une monnaie voyager dans le temps.'], ['Maastricht (1992) → CEE (1957) → euro (2002)', 'La CEE arrive en premier. Remets la frise dans l’ordre !']], 'Les étapes : 1951 CECA, 1957 traité de Rome, 1992 Maastricht, 2002 euro.'),
      Q('Que crée le traité de Maastricht ?', 'L’Union européenne et la citoyenneté européenne', [['La CEE', 'La CEE, c’est 1957, avec le traité de Rome.'], ['L’ONU', 'L’ONU est mondiale, créée en 1945. Mauvais continent, mauvaise date.']], 'Maastricht, 1992 : UE, citoyenneté européenne, projet de monnaie unique.'),
      Q('Que signifie « élargissement » ?', 'L’entrée de nouveaux pays dans l’Union', [['L’agrandissement des routes européennes', 'On parle de pays membres, pas de la largeur des autoroutes.'], ['La sortie d’un pays', 'Ça, c’est l’inverse. Un départ, pas une arrivée.']], 'De 6 pays fondateurs à 27 membres aujourd’hui.')
    ] },
    { titre:'Maîtriser différents langages — La Première Guerre mondiale, une guerre totale', questions:[
      Q('Pourquoi parle-t-on de « guerre totale » ?', 'Toute la société et l’économie sont mobilisées', [['Parce que tous les soldats ont gagné', 'Il n’y a pas de « tous gagnants » dans une guerre. Hélas.'], ['Parce qu’elle a duré un seul jour', 'Elle a duré plus de quatre ans. Un seul jour, ce serait une sortie scolaire.']], 'Mobilisation des soldats, des civils, des industries et des colonies.'),
      Q('Quelle bataille de 1916 symbolise l’enfer des tranchées pour les Français ?', 'Verdun', [['Austerlitz', 'Austerlitz, c’est Napoléon, en 1805. Un siècle trop tôt !'], ['Waterloo', 'Waterloo, 1815 : encore Napoléon. Il est partout, celui-là.']], 'Verdun, 1916 : des centaines de milliers de victimes.'),
      Q('Quand l’armistice est-il signé ?', '11 novembre 1918', [['8 mai 1945', 'Ça, c’est la fin de la Seconde Guerre mondiale en Europe.'], ['14 juillet 1918', 'Le 14 juillet, c’est la fête nationale.']], 'Armistice du 11 novembre 1918.')
    ] }
  ];
  const EMC = [
    { titre:'Enseignement moral et civique — La commémoration du 11 novembre', pts:20, contexte:'Situation : ton collège participe à la cérémonie du 11 novembre. Une loi de 2012 fait de ce jour la commémoration de tous les morts pour la France. La mairie affiche le programme : rassemblement au monument aux morts, lecture des noms, minute de silence, chant de La Marseillaise par les élèves.',
      questions:[
        Q('Que commémore la République le 11 novembre ?', 'L’armistice de 1918 et tous les morts pour la France', [['La prise de la Bastille', 'Ça, c’est le 14 juillet. Mauvais jour, mauvais siècle.'], ['La fin de la Seconde Guerre mondiale', 'C’est le 8 mai. Les dates se bousculent, mais non.']], 'Depuis la loi de 2012, on honore aussi tous les morts pour la France.'),
        Q('Deux acteurs de cette journée ?', 'Le maire et les élèves', [['Le président des États-Unis et un footballeur', 'Belle affiche, mais pas dans ce document !'], ['Personne : la cérémonie est automatique', 'Une cérémonie sans personne, c’est triste… et faux.']], 'Le document cite la mairie et les élèves.'),
        Q('Quelle valeur de la République cette journée met-elle en avant ?', 'La fraternité', [['La compétition', 'Une commémoration n’est pas un match.'], ['La vitesse', 'La minute de silence n’est pas une course. Elle dure une minute, pile.']], 'Se rassembler pour honorer ensemble ceux qui sont morts : fraternité et mémoire partagée.'),
        Q('En quoi la journée renforce-t-elle la cohésion nationale ?', 'Elle rassemble les citoyens autour d’une mémoire commune', [['Elle sépare les générations', 'Au contraire : jeunes et anciens sont réunis.'], ['Elle oblige à faire la fête', 'C’est un moment de recueillement, pas une fête.']], 'Mémoire commune, rassemblement intergénérationnel.'),
        Q('Quelle action du collège a le plus de sens pour cette journée ?', 'Lire les noms des morts de la commune avec les élèves', [['Organiser un concours de pétards', 'Bruyant, déplacé, et Ami a sursauté rien qu’en lisant.'], ['Ne rien faire et rester chez soi', 'La commémoration, c’est justement participer.']], 'Transmettre la mémoire aux jeunes générations.')
      ] },
    { titre:'Enseignement moral et civique — La laïcité à l’école', pts:20, contexte:'Situation : un élève de 6e demande pourquoi il n’y a pas de signe religieux sur les murs de la classe, alors que chacun peut croire ce qu’il veut.',
      questions:[
        Q('Quelle loi sépare les Églises et l’État en France ?', 'La loi de 1905', [['La loi de 1789', '1789, c’est la Déclaration des droits de l’homme.'], ['La loi de 1958', '1958, c’est la Constitution de la Ve République.']], 'Loi du 9 décembre 1905.'),
        Q('La laïcité, c’est :', 'La liberté de croire ou de ne pas croire, et la neutralité de l’État', [['L’interdiction de toutes les religions', 'Non ! Chacun reste libre de croire. C’est l’État qui est neutre.'], ['L’obligation de choisir une religion', 'C’est l’inverse : personne n’est obligé.']], 'Liberté de conscience + neutralité des services publics.'),
        Q('Pourquoi l’école publique est-elle neutre ?', 'Pour accueillir tous les élèves de la même façon', [['Pour faire des économies de décoration', 'Bien tenté, mais ce n’est pas une question de budget.'], ['Parce que les profs n’aiment pas les murs décorés', 'Les dessins, si ! Les signes religieux, non : neutralité.']], 'Égalité de traitement de tous les élèves.')
      ] }
  ];

  // ───────────── DNB · Sciences (physique-chimie 10 pts + SVT 10 pts) ─────────────
  function scPhysiqueF1(r){
    const m = un(r, [70, 100, 120]), mo = Math.round(m * 3.5), mco2 = Math.round(m * 3.08), meau = m + mo - mco2, v = un(r, [180, 216, 252]);
    return { titre:'Physique-chimie — Une voiture de course et son carburant', pts:10, contexte:'Une voiture de course part de l’arrêt, accélère en ligne droite, puis prend un virage. Son essence contient de l’octane, de formule C8H18. Lors de la combustion de ' + m + ' kg d’essence avec ' + mo + ' kg de dioxygène, il se forme ' + mco2 + ' kg de dioxyde de carbone et de l’eau.',
      questions:[
        Q('Le mouvement entre le départ et le début du virage est :', 'Rectiligne et accéléré', [['Rectiligne et uniforme', 'Uniforme = vitesse constante. Or la voiture part de l’arrêt : elle accélère !'], ['Circulaire et ralenti', 'Le virage vient APRÈS. Et elle ne ralentit pas, elle fonce.']], 'Ligne droite + vitesse qui augmente.'),
        Q('Combien d’atomes dans une molécule d’octane C8H18 ?', '26', [['2', 'Deux SORTES d’atomes, oui : carbone et hydrogène. Mais 26 atomes au total.'], ['18', 'Tu as oublié les 8 atomes de carbone. Ils sont vexés.']], '8 + 18 = 26.'),
        Q('Quel gaz produit par la combustion contribue au réchauffement climatique ?', 'Le dioxyde de carbone (CO2)', [['Le dioxygène', 'Le dioxygène est CONSOMMÉ par la combustion.'], ['L’azote', 'L’azote ne participe pas à cette réaction.']], 'Le CO2 est un gaz à effet de serre.'),
        Q('Masse d’eau formée ?', meau + ' kg', [[(m + mo + mco2) + ' kg', 'Tu as tout additionné. Le CO2 est un PRODUIT : on le soustrait.'], [(mo - m) + ' kg', 'Conservation de la masse : réactifs = produits. Ce calcul n’en tient pas compte.']], 'Conservation de la masse : ' + m + ' + ' + mo + ' − ' + mco2 + ' = ' + meau + ' kg.'),
        Q('La voiture roule à ' + v + ' km/h. Vitesse en m/s ?', nb(v / 3.6) + ' m/s', [[nb(v * 3.6) + ' m/s', 'Multiplier par 3,6 transforme les m/s en km/h. Ici, c’est l’inverse !'], [String(v) + ' m/s', 'Sans conversion, la voiture irait plus vite qu’un avion de ligne.']], 'On divise par 3,6.'),
        Q('Un avantage du dihydrogène par rapport à l’essence ?', 'Sa combustion ne rejette que de l’eau', [['Il est gratuit et pousse dans les arbres', 'Ami aimerait bien. Mais non.'], ['Il ne nécessite aucune énergie pour être produit', 'Produire du dihydrogène demande de l’énergie : c’est son inconvénient.']], 'Pas de CO2 rejeté par le moteur ; mais sa production peut en émettre.')
      ] };
  }
  function scPhysiqueTrain(r){
    const d = un(r, [150, 240, 300]), t = un(r, [1, 1.5, 2]), P = un(r, [2000, 3000, 4000]), h = un(r, [2, 3]);
    return { titre:'Physique-chimie — Un voyage en train électrique', pts:10, contexte:'Un train parcourt ' + d + ' km en ' + nb(t) + ' h. Dans le wagon, un radiateur électrique de puissance ' + P + ' W fonctionne pendant ' + h + ' h. Le train est alimenté par une ligne électrique.',
      questions:[
        Q('Vitesse moyenne du train ?', nb(d / t) + ' km/h', [[nb(d * t) + ' km/h', 'Vitesse = distance ÷ durée. Multiplier, c’est envoyer le train dans l’espace.'], [nb(t / d, 3) + ' km/h', 'Formule à l’envers : le train recule.']], 'v = d ÷ t.'),
        Q('Énergie consommée par le radiateur ?', nb(P * h / 1000) + ' kWh', [[nb(P / h / 1000) + ' kWh', 'E = P × t, pas P ÷ t.'], [nb(P * h) + ' kWh', 'Le résultat est en Wh. Pour des kWh, on divise par 1 000.']], 'E = P × t = ' + P + ' W × ' + h + ' h = ' + (P * h) + ' Wh.'),
        Q('Quelle conversion d’énergie réalise le radiateur ?', 'Électrique → thermique', [['Thermique → électrique', 'C’est l’inverse : il reçoit de l’électricité et donne de la chaleur.'], ['Chimique → lumineuse', 'Le radiateur ne brûle rien et n’éclaire pas. Sauf s’il est en panne.']], 'Un radiateur transforme l’énergie électrique en chaleur.'),
        Q('Unité de la puissance ?', 'Le watt (W)', [['Le joule (J)', 'Le joule, c’est l’ÉNERGIE. La puissance, c’est le watt.'], ['Le kilomètre (km)', 'Le kilomètre mesure une distance. Mauvais rayon du magasin.']], 'Puissance en watts, énergie en joules ou en kWh.')
      ] };
  }
  function svtChauveSouris(r){
    const tR = 37, tT = un(r, [5, 6, 8]), rs = un(r, [8, 10, 12]), rm = rs * un(r, [2, 3]);
    return { titre:'SVT — Une maladie des chauves-souris', pts:10, contexte:'Un champignon microscopique se développe sur la peau nue de chauves-souris pendant l’hibernation. Données : température corporelle en réveil ' + tR + ' °C, en torpeur ' + tT + ' °C. Un animal sain se réveille ' + rs + ' fois pendant l’hiver ; un animal malade, ' + rm + ' fois. Chaque réveil consomme beaucoup de réserves. Une bactérie testée en laboratoire fait disparaître le champignon.',
      questions:[
        Q('Ce champignon est :', 'Un micro-organisme', [['Un animal', 'Un champignon n’est ni un animal ni une plante. Il a son propre règne !'], ['Un virus', 'Un virus est bien plus petit et n’est pas un champignon.']], 'Les champignons microscopiques font partie des micro-organismes.'),
        Q('Température d’un animal en torpeur ?', tT + ' °C', [[tR + ' °C', 'Ça, c’est en réveil. En torpeur, le corps se refroidit fortement.'], [(tR - tT) + ' °C', 'C’est la différence entre les deux, pas la température.']], 'Lecture directe des données.'),
        Q('Effet du champignon sur les réveils ?', 'Il les multiplie par ' + (rm / rs), [['Il les supprime', 'C’est l’inverse : l’animal malade se réveille BEAUCOUP plus.'], ['Aucun effet', rs + ' contre ' + rm + ' : la différence saute aux yeux.']], rm + ' ÷ ' + rs + ' = ' + (rm / rs) + '.'),
        Q('Pourquoi les chauves-souris malades meurent-elles plus souvent ?', 'Elles épuisent leurs réserves d’énergie avant la fin de l’hiver', [['Elles mangent trop pendant l’hibernation', 'En hibernation, on ne mange pas. On dort.'], ['Le froid les rend malades', 'C’est le champignon qui provoque les réveils, pas le froid seul.']], 'Plus de réveils = plus de dépense d’énergie = réserves épuisées.'),
        Q('Comment la bactérie pourrait-elle limiter la mortalité ?', 'En éliminant le champignon, elle réduit les réveils et préserve les réserves', [['En réchauffant la grotte', 'La bactérie n’est pas un radiateur. 🔥'], ['En nourrissant les chauves-souris', 'Elle s’attaque au champignon, pas à la faim.']], 'Raisonnement en chaîne : moins de champignon → moins de réveils → réserves conservées.')
      ] };
  }
  function svtVaccin(r){
    const j = un(r, [7, 10, 14]);
    return { titre:'SVT — La vaccination', pts:10, contexte:'Un vaccin contient un microbe rendu inoffensif. Après une première injection, le taux d’anticorps augmente lentement et atteint un pic au bout de ' + j + ' jours. Lors d’un rappel, il augmente beaucoup plus vite et plus fort.',
      questions:[
        Q('Que contient un vaccin ?', 'Un microbe rendu inoffensif, ou une partie de ce microbe', [['Des anticorps tout prêts', 'Ça, c’est un sérum. Le vaccin fait fabriquer ses PROPRES anticorps.'], ['Des antibiotiques', 'Les antibiotiques soignent certaines infections bactériennes. Rien à voir.']], 'Le vaccin déclenche une réponse immunitaire sans rendre malade.'),
        Q('Pourquoi la réponse est-elle plus rapide au rappel ?', 'Grâce à la mémoire immunitaire', [['Parce que le microbe est fatigué', 'Le microbe n’a pas d’état d’âme. C’est le corps qui se souvient.'], ['Par hasard', 'Ce n’est pas un tirage au sort : c’est la mémoire immunitaire.']], 'Les lymphocytes mémoire réagissent vite et fort.'),
        Q('Quelles cellules produisent les anticorps ?', 'Des lymphocytes', [['Les globules rouges', 'Les globules rouges transportent le dioxygène. Pas d’anticorps chez eux.'], ['Les neurones', 'Les neurones transmettent des messages nerveux.']], 'Les lymphocytes B produisent les anticorps.'),
        Q('Au bout de combien de jours le pic d’anticorps est-il atteint après la 1re injection ?', String(j), [[String(j * 2), 'Relis le document : le pic arrive plus tôt.'], ['1', 'Le premier contact est LENT. Un seul jour, c’est la réponse du rappel… et encore.']], 'Lecture directe du document.')
      ] };
  }

  // ───────────── Bac · Épreuve anticipée de mathématiques (1re), 2 h, 6 + 14 points ─────────────
  const AUTO_SPE = [
    r => { const a = ent(r, 2, 7); return Q('Développer (x + ' + a + ')².', 'x² + ' + (2 * a) + 'x + ' + (a * a), [['x² + ' + (a * a), 'Le double produit a disparu ! Il réclame sa place : ' + (2 * a) + 'x.'], ['x² + ' + a + 'x + ' + (a * a), 'Le terme du milieu, c’est 2 × x × ' + a + '. Il manque le 2.']], '(a + b)² = a² + 2ab + b².'); },
    r => { const x1 = ent(r, 0, 2), y1 = ent(r, -3, 3), dx = ent(r, 1, 3), m = ent(r, -3, 3) || 2, y2 = y1 + m * dx, p = y1 - m * x1;
      return Q('Équation de la droite passant par A(' + x1 + ' ; ' + y1 + ') et B(' + (x1 + dx) + ' ; ' + y2 + ') ?', 'y = ' + m + 'x ' + (p < 0 ? '− ' + -p : '+ ' + p), [['y = ' + (-m) + 'x ' + (p < 0 ? '− ' + -p : '+ ' + p), 'Le coefficient directeur a changé de signe. La droite monte ou descend ? Regarde les points !'], ['y = ' + nb(dx / ((y2 - y1) || 1)) + 'x + ' + p, 'Tu as calculé Δx ÷ Δy. C’est Δy ÷ Δx !']], 'm = (yB − yA) ÷ (xB − xA), puis p = yA − m × xA.'); },
    r => { const t = un(r, [5, 10, 20, 25, 40]); return Q('Une hausse de ' + t + ' % correspond à un coefficient multiplicateur de :', nb(1 + t / 100), [[nb(t / 100), 'Ça, c’est juste la hausse. Il faut garder le prix de départ : 1 + ' + nb(t / 100) + '.'], [nb(1 - t / 100), 'Ça, c’est une BAISSE de ' + t + ' %. Le prix fait demi-tour.']], 'Hausse de t % : × (1 + t/100).'); },
    r => { const a = ent(r, 2, 9) * 1000 + ent(r, 1, 99), b = ent(r, 2, 9) * 10 + ent(r, 0, 9), o = Math.round(a / b / 10) * 10 || Math.round(a / b);
      return Q('Ordre de grandeur de ' + a + ' ÷ ' + b + ' ?', String(Math.round(Math.round(a / 1000) * 1000 / (Math.round(b / 10) * 10))), [[String(Math.round(a / 1000) * 1000 * Math.round(b / 10) * 10), 'Multiplier au lieu de diviser : le résultat explose.'], [String(Math.round(a / 1000)), 'Il manque un facteur. Ordre de grandeur, pas ordre de grandeur approximatif du hasard.']], 'On arrondit : ' + (Math.round(a / 1000) * 1000) + ' ÷ ' + (Math.round(b / 10) * 10) + '.'); },
    r => { const ips = un(r, [24, 25, 30, 60]), s = un(r, [2, 5, 10, 90]); return Q('Une vidéo affiche ' + ips + ' images par seconde. Combien d’images en ' + s + ' s ?', String(ips * s), [[nb(ips / s), 'Diviser par la durée ? Plus la vidéo est longue, moins il y aurait d’images. Étrange.'], [String(ips + s), 'Addition sauvage détectée. C’est de la proportionnalité : on multiplie.']], ips + ' × ' + s + '.'); },
    r => { const a = ent(r, 1, 3), b = ent(r, -4, 4), c = ent(r, -5, 5), x = ent(r, -3, 3), y = a * x * x + b * x + c, yf = y + ent(r, 1, 3);
      return Q('f(x) = ' + a + 'x² ' + (b < 0 ? '− ' + -b : '+ ' + b) + 'x ' + (c < 0 ? '− ' + -c : '+ ' + c) + '. Quel point appartient à la courbe de f ?', '(' + x + ' ; ' + y + ')', [['(' + x + ' ; ' + yf + ')', 'Calcule f(' + x + ') : ça ne donne pas ' + yf + '. Raté de peu !'], ['(' + y + ' ; ' + x + ')', 'Abscisse et ordonnée ont échangé leurs places. Elles ne sont pas d’accord.']], 'Un point (x ; y) est sur la courbe si y = f(x).'); },
    r => { const a = ent(r, 2, 6), b = ent(r, 2, 6); return Q('Calculer 10^' + a + ' × 10^' + b + ' ÷ 10^' + (a + b - 1) + '.', '10', [['10^' + (a * b), 'Les puissances se multiplient ? Non : les EXPOSANTS s’additionnent.'], ['1', 'Il reste un exposant 1 : 10^1 = 10.']], 'On additionne puis on soustrait les exposants.'); },
    r => { const N = un(r, [200, 250, 400]), p = un(r, [12, 15, 20]); return Q('Dans un lycée de ' + N + ' élèves, ' + p + ' % étudient le latin. Combien d’élèves ?', String(N * p / 100), [[String(N - p), 'On ne soustrait pas un pourcentage comme ça. Le latin proteste en latin.'], [nb(N / p), 'Diviser par ' + p + ' ? Ce n’est pas ça, prendre ' + p + ' %.']], N + ' × ' + p + ' ÷ 100.'); }
  ];
  const AUTO_COMMUN = [
    r => { const [n, d] = un(r, [[3, 4], [7, 8], [1, 5], [3, 20], [9, 25]]); return Q('Écriture décimale de ' + n + '/' + d + ' ?', nb(n / d, 3), [[nb(d / n, 3), 'Tu as divisé à l’envers. Le dénominateur, c’est EN BAS.'], [n + ',' + d, 'Une fraction n’est pas un nombre à virgule déguisé. Ce serait trop simple.']], n + ' ÷ ' + d + '.'); },
    r => { const a = ent(r, 2, 5), b = ent(r, 1, 9), c = a * ent(r, 2, 6) + b; return Q('Résoudre ' + a + 'x + ' + b + ' = ' + c + '.', 'x = ' + nb((c - b) / a), [['x = ' + nb((c + b) / a), 'Le ' + b + ' change de côté… et donc de signe !'], ['x = ' + (c - b), 'Il manque la division par ' + a + '.']], 'x = (' + c + ' − ' + b + ') ÷ ' + a + '.'); },
    r => { const a = un(r, [10, 20, 50]), b = un(r, [10, 20]); return Q('Un prix augmente de ' + a + ' % puis baisse de ' + b + ' %. Coefficient multiplicateur global ?', nb((1 + a / 100) * (1 - b / 100), 3), [[nb(1 + (a - b) / 100, 3), 'Les pourcentages successifs ne s’additionnent pas : on MULTIPLIE les coefficients.'], [nb((1 + a / 100) + (1 - b / 100), 3), 'Additionner les coefficients ? Le prix ferait un bond de géant.']], nb(1 + a / 100) + ' × ' + nb(1 - b / 100) + '.'); },
    r => { const x1 = ent(r, 0, 3), y1 = ent(r, 0, 5), dx = ent(r, 1, 4), m = ent(r, -3, 3) || 1; return Q('Coefficient directeur de la droite passant par (' + x1 + ' ; ' + y1 + ') et (' + (x1 + dx) + ' ; ' + (y1 + m * dx) + ') ?', String(m), [[nb(1 / m), 'Δx ÷ Δy : c’est le monde à l’envers.'], [String(-m), 'Le signe ! La droite monte ou descend ?']], 'm = Δy ÷ Δx.'); }
  ];
  function bacProbaArbre(r){
    const [p, a, b] = un(r, [[0.3, 0.5, 0.2], [0.4, 0.6, 0.3], [0.2, 0.7, 0.4], [0.25, 0.8, 0.4]]), pA = p * a + (1 - p) * b;
    const n = Math.round(p * a * 1000), d = Math.round(pA * 1000);
    return { titre:'Probabilités', pts:5, contexte:'Un loueur propose des vélos électriques (événement E) et traditionnels. ' + Math.round(p * 100) + ' % des clients louent un vélo électrique. Parmi eux, ' + Math.round(a * 100) + ' % prennent une assurance (événement A) ; parmi les autres, ' + Math.round(b * 100) + ' %.',
      questions:[
        Q('P(Ē) = ?', nb(1 - p), [[nb(p), 'Ça, c’est P(E). La barre veut dire « contraire ».'], [nb(1 - a), 'Tu mélanges les branches de l’arbre.']], 'P(Ē) = 1 − P(E).'),
        Q('P_E(A) = ?', nb(a), [[nb(p * a, 3), 'Ça, c’est P(E ∩ A). P_E(A) se lit directement sur la branche.'], [nb(b), 'Mauvaise branche : celle-ci concerne les vélos traditionnels.']], 'Probabilité de A sachant E : sur la branche.'),
        Q('P(E ∩ A) = ?', nb(p * a, 3), [[nb(p + a, 3), 'On MULTIPLIE le long d’une branche. Additionner, c’est pour les chemins différents.'], [nb(a, 3), 'Il manque P(E) dans le produit.']], 'P(E ∩ A) = P(E) × P_E(A).'),
        Q('P(A) = ?', nb(pA, 3), [[nb(p * a, 3), 'Il manque le chemin des vélos traditionnels. Formule des probabilités totales !'], [nb(a + b, 3), 'On ne peut pas additionner deux probabilités conditionnelles comme ça.']], 'P(A) = P(E ∩ A) + P(Ē ∩ A).'),
        Q('P_A(E) en fraction irréductible ?', frac(n, d), [[frac(Math.round(a * 1000), 1000), 'Ça, c’est P_E(A) : l’ordre compte dans une probabilité conditionnelle.'], [frac(d, n), 'Fraction à l’envers : une probabilité ne dépasse jamais 1.']], 'P_A(E) = P(E ∩ A) ÷ P(A).')
      ] };
  }
  function bacVraiFaux(r){
    const u = un(r, [1, 3, -3, 2, 5]), dis = u * u - 4, k = ent(r, 2, 5), q = k === 2 ? ent(r, 3, 4) : ent(r, 2, k - 1), aPt = ent(r, 1, 4), dans = r() < 0.5;
    return { titre:'Vrai ou faux (justifier)', pts:5, contexte:'Trois affirmations indépendantes.',
      questions:[
        VF('L’équation x² + ' + u + 'x + 1 = 0 admet deux solutions réelles distinctes.', dis > 0, 'Δ = ' + u + '² − 4 = ' + dis + (dis > 0 ? ' > 0 : deux solutions.' : dis === 0 ? ' : une seule solution.' : ' < 0 : aucune solution réelle.'), 'Calcule le discriminant avant de répondre. Δ ne ment jamais.'),
        VF('La suite définie par u_n = ' + k + ' × ' + q + '^n est géométrique de raison ' + k + '.', false, 'u_(n+1) = ' + q + ' × u_n : la raison est ' + q + ', le premier terme ' + k + '.', 'La raison, c’est le nombre qui se répète en multipliant : ' + q + '.'),
        VF('Le point (' + aPt + ' ; ' + (dans ? aPt + 1 : aPt + 2) + ') appartient à la tangente à la courbe de exp en 0.', dans, 'La tangente en 0 a pour équation y = x + 1.', 'La tangente en 0 : y = exp(0) + exp(0)(x − 0) = x + 1. Teste le point !')
      ] };
  }
  function bacProduitScalaire(r){
    const p = ent(r, 3, 6), k = ent(r, 0, 2), x = ent(r, 2, 6);
    return { titre:'Géométrie et produit scalaire', pts:4, contexte:'Dans un repère orthonormé : P(' + p + ' ; 0), K(' + k + ' ; 0) et M(' + x + ' ; 3).',
      questions:[
        Q('Coordonnées du vecteur KP ?', '(' + (p - k) + ' ; 0)', [['(' + (k - p) + ' ; 0)', 'KP = P − K, pas K − P. L’ordre compte !'], ['(' + p + ' ; ' + k + ')', 'Ce sont des points mélangés, pas un vecteur.']], 'KP = (xP − xK ; yP − yK).'),
        Q('Norme de KM ?', '√' + ((x - k) ** 2 + 9), [[String(x - k + 3), 'Une norme n’est pas une somme : Pythagore, avec des carrés !'], ['√' + ((x - k) + 3), 'Il faut élever au CARRÉ avant d’additionner.']], '‖KM‖ = √((' + (x - k) + ')² + 3²).'),
        Q('Produit scalaire KP · KM ?', String((p - k) * (x - k)), [[String((p - k) * (x - k) + 3), 'La deuxième coordonnée de KP vaut 0 : 0 × 3 = 0.'], [String((p - k) + (x - k)), 'xx′ + yy′, avec des multiplications !']], 'KP · KM = xx′ + yy′ = ' + (p - k) + ' × ' + (x - k) + ' + 0 × 3.')
      ] };
  }
  function bacTableau(r){
    const t = { j2:ent(r, 10, 20), j1:ent(r, 10, 20), jt:ent(r, 8, 18), a2:ent(r, 10, 25), a1:ent(r, 10, 25), at:ent(r, 10, 25) };
    const J = t.j2 + t.j1 + t.jt, S2 = t.j2 + t.a2, T = t.jt + t.at;
    const tot = t.j2 + t.j1 + t.jt + t.a2 + t.a1 + t.at;
    return { titre:'Probabilités (tableau croisé)', pts:6, contexte:'Un lycée accueille ' + tot + ' sportifs de haut niveau : judo (J) ou section aquatique (A).\nSeconde : ' + t.j2 + ' en judo, ' + t.a2 + ' en aquatique. Première : ' + t.j1 + ' en judo, ' + t.a1 + ' en aquatique. Terminale : ' + t.jt + ' en judo, ' + t.at + ' en aquatique.\nOn choisit un sportif au hasard. S = « il est en seconde », T = « il est en terminale ».',
      questions:[
        Q('P(A ∩ S) = ?', frac(t.a2, tot), [[frac(t.a2, S2), 'Ça, c’est P_S(A) : tu as divisé par les secondes seulement.'], [frac(t.a2 + t.a1 + t.at, tot), 'Ça, c’est P(A) tout court.']], 'Aquatique ET seconde : ' + t.a2 + ' sur ' + tot + '.'),
        Q('P_S(A) = ?', frac(t.a2, S2), [[frac(t.a2, tot), 'Sachant S : on se restreint aux secondes (' + S2 + ' élèves).'], [frac(t.a2, t.a2 + t.a1 + t.at), 'Ça, c’est P_A(S). L’ordre compte !']], t.a2 + ' ÷ ' + S2 + '.'),
        Q('P(J) = ?', frac(J, tot), [[frac(J, tot - J), 'Divise par le total, pas par les nageurs.'], [frac(t.j2, tot), 'Seulement les judokas de seconde ? Il en manque.']], J + ' judokas sur ' + tot + '.'),
        Q('P_T(J) = ?', frac(t.jt, T), [[frac(t.jt, tot), 'Sachant T : on divise par le nombre de terminales (' + T + ').'], [frac(t.jt, J), 'Ça, c’est P_J(T).']], t.jt + ' ÷ ' + T + '.'),
        VF('Les événements J et T sont indépendants.', t.jt * tot === J * T, 'Indépendants si P(J ∩ T) = P(J) × P(T) : ' + frac(t.jt, tot) + ' contre ' + frac(J * T, tot * tot) + '.', 'Compare P(J ∩ T) et P(J) × P(T) avant de conclure !')
      ] };
  }
  function bacPlacements(r){
    const C = un(r, [10000, 20000, 15000]), R = un(r, [150, 200, 300]), t = un(r, [1.5, 2, 2.5, 3]), cible = C + un(r, [1500, 2000, 2400]);
    const nA = Math.ceil((cible - C) / R); let nB = 0, v = C; while(v < cible && nB < 100){ v *= 1 + t / 100; nB++; }
    return { titre:'Suites et placements', pts:8, contexte:'Emma et Pierre placent ' + C + ' € et visent ' + cible + ' €.\nPlacement A : + ' + R + ' € chaque année (a_0 = ' + C + ').\nPlacement B : + ' + nb(t) + ' % chaque année (b_0 = ' + C + ').',
      questions:[
        Q('a_1 = ?', String(C + R), [[nb(C * (1 + R / 100)), 'Placement A : on AJOUTE ' + R + ' €, ce n’est pas un pourcentage.'], [String(R), 'Le capital de départ a disparu. Les banques adorent.']], C + ' + ' + R + '.'),
        Q('Nature de la suite (a_n) ?', 'Arithmétique de raison ' + R, [['Géométrique de raison ' + R, 'On ajoute toujours la même somme : c’est ARITHMÉTIQUE.'], ['Ni l’un ni l’autre', 'a_(n+1) = a_n + ' + R + ' : c’est la définition d’une suite arithmétique.']], 'a_(n+1) = a_n + ' + R + '.'),
        Q('Expression de a_n ?', 'a_n = ' + C + ' + ' + R + 'n', [['a_n = ' + C + ' × ' + R + '^n', 'Formule géométrique pour une suite arithmétique ? Le compte en banque exploserait.'], ['a_n = ' + R + ' + ' + C + 'n', 'Premier terme et raison ont échangé leurs places.']], 'a_n = a_0 + n × r.'),
        Q('b_1 = ?', nb(C * (1 + t / 100)), [[nb(C + t), 'On a ajouté ' + nb(t) + ' € au lieu de ' + nb(t) + ' %. Les centimes rigolent.'], [nb(C * t / 100), 'Ça, ce sont seulement les intérêts.']], C + ' × ' + nb(1 + t / 100) + '.'),
        Q('Nature de la suite (b_n) ?', 'Géométrique de raison ' + nb(1 + t / 100), [['Géométrique de raison ' + nb(t / 100), 'La raison, c’est le coefficient multiplicateur : 1 + ' + nb(t / 100) + '.'], ['Arithmétique de raison ' + nb(t), 'On multiplie à chaque fois : c’est GÉOMÉTRIQUE.']], 'b_(n+1) = ' + nb(1 + t / 100) + ' × b_n.'),
        Q('Au bout de combien d’années le placement A atteint-il l’objectif ?', String(nA), [[String(nA - 1), 'À ' + (nA - 1) + ' ans, il manque encore un peu. Patience !'], [String(nB), 'Ça, c’est le placement B.']], C + ' + ' + R + 'n ≥ ' + cible + '.'),
        Q('Au bout de combien d’années le placement B atteint-il l’objectif ?', String(nB), [[String(nB - 1), 'Pas encore à ' + (nB - 1) + ' ans : recalcule au tableur.'], [String(nA), 'Ça, c’est le placement A.']], 'On calcule les termes successifs jusqu’à dépasser ' + cible + ' €.'),
        Q('Quel placement conseiller ?', nA < nB ? 'Le placement A' : nA > nB ? 'Le placement B' : 'Les deux se valent', [[nA < nB ? 'Le placement B' : 'Le placement A', 'Compare les années : ce placement arrive plus tard au but.'], ['On ne peut pas savoir', 'Tu as tout calculé : il suffit de comparer !']], 'A : ' + nA + ' ans ; B : ' + nB + ' ans.')
      ] };
  }

  // ───────────── Bac de français (1re) : méthode, œuvres au programme 2026-2027, question de grammaire de l'oral ─────────────
  // Œuvres : programme national d'œuvres 2026-2027 (BO n° 30 du 24 juillet 2025), voie générale.
  const OEUVRES = [
    ['Chrétien de Troyes', 'Le Chevalier de la charrette', 'le roman et le récit du Moyen Âge au XXIe siècle', 'Le roman et l’invention de l’amour'],
    ['Émile Zola', 'Pot-Bouille', 'le roman et le récit du Moyen Âge au XXIe siècle', 'Dévoiler les rouages de la société'],
    ['Simone Schwarz-Bart', 'Pluie et vent sur Télumée Miracle', 'le roman et le récit du Moyen Âge au XXIe siècle', 'Tisser les mémoires, habiter le monde'],
    ['Arthur Rimbaud', 'Cahier de Douai', 'la poésie du XIXe au XXIe siècle', 'Émancipations créatrices'],
    ['Francis Ponge', 'La rage de l’expression', 'la poésie du XIXe au XXIe siècle', 'Dans l’atelier du poète'],
    ['Hélène Dorion', 'Mes forêts', 'la poésie du XIXe au XXIe siècle', 'La poésie, la nature, l’intime'],
    ['Étienne de La Boétie', 'Discours de la servitude volontaire', 'la littérature d’idées du XVIe au XVIIIe siècle', '« Défendre » et « entretenir » la liberté'],
    ['Fontenelle', 'Entretiens sur la pluralité des mondes', 'la littérature d’idées du XVIe au XVIIIe siècle', 'Le goût de la science'],
    ['Françoise de Graffigny', 'Lettres d’une Péruvienne', 'la littérature d’idées du XVIe au XVIIIe siècle', '« Un nouvel univers s’est offert à mes yeux »'],
    ['Pierre Corneille', 'Le Menteur', 'le théâtre du XVIIe au XXIe siècle', 'Mensonge et comédie'],
    ['Alfred de Musset', 'On ne badine pas avec l’amour', 'le théâtre du XVIIe au XXIe siècle', 'Les jeux du cœur et de la parole'],
    ['Nathalie Sarraute', 'Pour un oui ou pour un non', 'le théâtre du XVIIe au XXIe siècle', 'Théâtre et dispute']
  ];
  function bacOeuvres(r){
    const l = OEUVRES.slice().sort(() => r() - 0.5).slice(0, 5);
    return { titre:'Les œuvres au programme (bac 2027)', pts:5, contexte:'Programme national d’œuvres de première, année 2026-2027 (voie générale).',
      questions:l.map(([aut, tit, obj, par], i) => { const autres = OEUVRES.filter(o => o[1] !== tit);
        return i % 2 ? Q('Quel est le parcours associé à « ' + tit + ' » ?', par, autres.slice(0, 6).filter(o => o[3] !== par).slice(0, 2).map(o => [o[3], 'Ce parcours va avec « ' + o[1] + ' ». Les œuvres ont chacune leur cavalier !']), aut + ', « ' + tit + ' » : parcours « ' + par + ' ».')
          : Q('Qui a écrit « ' + tit + ' » ?', aut, autres.filter(o => o[0] !== aut).slice(i, i + 2).map(o => [o[0], o[0] + ' a écrit « ' + o[1] + ' ». Ami confond aussi parfois ses neveux.']), '« ' + tit + ' » (' + obj + ').'); }) };
  }
  function bacMethode(r){
    return { titre:'Méthode du commentaire et de la dissertation', pts:7, contexte:'L’écrit dure 4 heures : commentaire d’un texte OU dissertation sur une œuvre au programme et son parcours.',
      questions:[
        Q('Une problématique de commentaire, c’est :', 'Une question qui guide l’analyse du texte', [['Le résumé du texte', 'Résumer n’est pas commenter. Le correcteur bâille déjà.'], ['La biographie de l’auteur', 'Trois lignes de contexte suffisent. Pas sa vie entière.']], 'Exemple : « Comment ce texte fait-il de… un… ? »'),
        Q('Dans un commentaire, chaque idée doit s’appuyer sur :', 'Une citation analysée (procédé + effet)', [['Une opinion personnelle', 'L’avis seul ne suffit pas : il faut des preuves dans le texte.'], ['Une citation sans analyse', 'Citer sans analyser, c’est montrer la photo sans dire ce qu’on voit.']], 'Citation → procédé → interprétation.'),
        Q('Un plan dialectique de dissertation, c’est :', 'Thèse, antithèse, puis dépassement', [['Introduction, introduction, introduction', 'Trois introductions ? Le correcteur cherche la sortie.'], ['Une liste de citations', 'Une dissertation argumente, elle ne collectionne pas.']], 'On examine la question sous plusieurs angles avant de conclure.'),
        Q('Que doit contenir l’introduction d’une dissertation ?', 'Une amorce, le sujet, une problématique et l’annonce du plan', [['Seulement la conclusion', 'Commencer par la fin ? Spoiler interdit.'], ['Uniquement la citation du sujet', 'Il faut l’analyser, la problématiser et annoncer le plan.']], 'Amorce → sujet → problématique → plan.'),
        Q('« Ses yeux étaient deux étoiles. » Procédé ?', 'Une métaphore', [['Une comparaison', 'Il n’y a pas d’outil de comparaison (« comme », « tel »).'], ['Une litote', 'Une litote dit moins pour suggérer plus. Ici, c’est une image.']], 'Rapprochement sans outil : métaphore.'),
        Q('« Va, je ne te hais point. » Procédé ?', 'Une litote', [['Une hyperbole', 'L’hyperbole exagère. Ici, on dit MOINS pour suggérer l’amour.'], ['Une anaphore', 'Une anaphore répète un mot en début de vers ou de phrase.']], 'Dire « je ne te hais point » pour suggérer « je t’aime ».'),
        Q('Un connecteur qui marque l’opposition ?', 'Cependant', [['Donc', '« Donc » annonce une conséquence.'], ['De plus', '« De plus » ajoute un argument.']], 'Cependant, pourtant, néanmoins, en revanche…')
      ] };
  }
  // Question de grammaire de l'oral : analyse syntaxique (négation, interrogation, subordonnées).
  const GRAMMAIRE_ORAL = [
    ['« Il ne viendra jamais. »', 'Négation partielle', ['Négation totale', '« Jamais » porte sur le temps : la négation est partielle. Totale, ce serait « ne… pas ».'], 'Négation partielle : ne… jamais, ne… rien, ne… personne.'],
    ['« Je ne sais pas. »', 'Négation totale', ['Négation partielle', '« Ne… pas » nie toute la phrase : négation totale.'], 'Ne… pas / ne… point : négation totale.'],
    ['« Viendras-tu demain ? »', 'Interrogation totale', ['Interrogation partielle', 'On peut répondre par oui ou non : c’est une interrogation TOTALE.'], 'Totale : réponse oui/non. Partielle : mot interrogatif (où, quand, qui…).'],
    ['« Où vas-tu ? »', 'Interrogation partielle', ['Interrogation totale', 'Impossible de répondre « oui » à « où vas-tu ? ». C’est partiel.'], 'Le mot interrogatif « où » porte sur un élément.'],
    ['« Je me demande s’il viendra. »', 'Interrogation indirecte', ['Interrogation directe', 'Pas de point d’interrogation, la question dépend de « je me demande » : indirecte.'], 'Interrogation indirecte : subordonnée introduite par « si », complément d’un verbe.'],
    ['« Le livre que tu lis est ancien. »', 'Proposition subordonnée relative', ['Proposition subordonnée complétive', '« Que » reprend « le livre » : c’est un pronom relatif, donc une relative.'], 'La relative complète un nom (l’antécédent).'],
    ['« Je crois que tu as raison. »', 'Proposition subordonnée complétive', ['Proposition subordonnée relative', 'Ici, « que » ne reprend aucun nom : c’est une conjonction. La subordonnée est COD de « crois ».'], 'Complétive : COD du verbe, introduite par la conjonction « que ».'],
    ['« Bien qu’il pleuve, nous sortons. »', 'Subordonnée circonstancielle de concession', ['Subordonnée circonstancielle de cause', 'La pluie n’est pas la RAISON de sortir : on sort MALGRÉ elle.'], '« Bien que » + subjonctif : concession.'],
    ['« Il travaille pour qu’on le respecte. »', 'Subordonnée circonstancielle de but', ['Subordonnée circonstancielle de conséquence', '« Pour que » exprime l’objectif visé : c’est le but.'], '« Pour que, afin que » + subjonctif : but.'],
    ['« S’il fait beau, nous irons à la mer. »', 'Subordonnée circonstancielle de condition', ['Subordonnée circonstancielle de temps', '« Si » pose une condition, pas un moment.'], '« Si » + indicatif : condition (hypothèse).']
  ];

  // ───────────── Assemblage : épreuves, annales, examens blancs ─────────────
  // Une épreuve = { id, titre, matiere, duree, parties:[{ titre, info, exos:[exercice] }], nonNote? }.
  const exoAuto = (r, pool, n, pts) => ({ titre:'Automatismes', pts, contexte:'', questions:pool.slice().sort(() => r() - 0.5).slice(0, n).map(g => g(r)) });
  const exoDictee = (r, n) => ({ titre:'Dictée (choisis la bonne orthographe)', pts:10, contexte:'', questions:DICTEE.slice().sort(() => r() - 0.5).slice(0, n).map(([ph, bon, f, regle], i) => Q(ph, bon, f.map((x, k) => [x, VANNES_DICTEE[(i + k) % VANNES_DICTEE.length]]), regle)) });
  const exoReperes = (r, n, pts) => ({ titre:'Repères historiques', pts, contexte:'Associe chaque repère à sa date.', questions:HG_REPERES.slice().sort(() => r() - 0.5).slice(0, n).map(([ev, d, f]) => Q(ev + ' : quelle date ?', d, f.map(x => [x, 'Ami a regardé la frise : ' + x + ', c’est un autre repère. Ce n’est pas le bon wagon du train de l’histoire.']), ev + ' : ' + d + '.')) });
  const exoGrammaireOral = (r, n) => ({ titre:'Question de grammaire (oral)', pts:8, contexte:'À l’oral, la question de grammaire porte sur l’analyse syntaxique d’une courte phrase.', questions:GRAMMAIRE_ORAL.slice().sort(() => r() - 0.5).slice(0, n).map(([ph, bon, [f, v], regle]) => Q('Analyse : ' + ph, bon, [[f, v]], regle)) });
  const texteExo = t => ({ titre:'Compréhension et grammaire — ' + t.titre, pts:50, contexte:t.texte + '\n\n— ' + t.source, questions:t.questions });

  const EPREUVES = {
    // DNB 2026
    'dnb-francais':{ titre:'Français', matiere:'francais', duree:'3 h (1 h 10 + 20 min + 1 h 30)', officiel:'Compréhension et grammaire 50 pts · dictée 10 pts · rédaction 40 pts',
      faire:r => [texteExo(un(r, TEXTES_DNB)), exoDictee(r, 5)], nonNote:'Rédaction (40 points) : à faire sur papier, elle n’est pas notée par l’appli. Sujets au choix :\n' + REDACTION.map(x => '• ' + x[0] + ' : ' + x[1]).join('\n'), surPoints:60 },
    'dnb-maths':{ titre:'Mathématiques', matiere:'maths', duree:'2 h (20 min sans calculatrice + 1 h 40)', officiel:'Automatismes 6 pts · problèmes 14 pts (dont 2 pts de rédaction)',
      faire:r => { const a = r() < 0.5; return [exoAuto(r, AUTO_DNB, a ? 9 : 8, 6)].concat(a ? [exoGeoHomothetie(r), exoProgramme(r), exoTarifs(r)] : [exoGeoTriangles(r), exoFonctions(r), exoStatsEnergie(r), exoLutin(r)]); } },
    'dnb-histoire':{ titre:'Histoire-géographie', matiere:'histoire', duree:'2 h avec l’EMC', officiel:'Géographie 15 pts · développement construit 18 pts · repères 7 pts',
      faire:r => { const d = un(r, HG_DEV); return [un(r, HG_GEO), { titre:d.titre, pts:18, contexte:'Développement construit : prépare les idées et l’ordre de ton texte.', questions:d.questions }, exoReperes(r, 4, 7)]; } },
    'dnb-emc':{ titre:'Enseignement moral et civique', matiere:'histoire', duree:'compris dans les 2 h', officiel:'Situation pratique 20 pts', faire:r => [un(r, EMC)] },
    'dnb-sciences':{ titre:'Sciences', matiere:'svt', duree:'1 h (30 min + 30 min)', officiel:'Physique-chimie 10 pts · SVT 10 pts',
      faire:r => [(r() < 0.5 ? scPhysiqueF1 : scPhysiqueTrain)(r), (r() < 0.5 ? svtChauveSouris : svtVaccin)(r)] },
    // Épreuve anticipée de maths (1re)
    'eam-spe':{ titre:'Maths anticipées · avec spécialité', matiere:'maths', duree:'2 h, sans calculatrice', officiel:'Automatismes (QCM) 6 pts · exercices 14 pts',
      faire:r => [exoAuto(r, AUTO_SPE, 8, 6), bacProbaArbre(r), bacVraiFaux(r), bacProduitScalaire(r)] },
    'eam-commun':{ titre:'Maths anticipées · sans spécialité', matiere:'maths', duree:'2 h, sans calculatrice', officiel:'Automatismes (QCM) 6 pts · exercices 14 pts',
      faire:r => [exoAuto(r, AUTO_COMMUN.concat(AUTO_DNB.slice(1, 5), AUTO_SPE.slice(2, 3)), 8, 6), bacTableau(r), bacPlacements(r)] },
    // Bac de français (1re)
    'eaf':{ titre:'Français (épreuves anticipées)', matiere:'francais', duree:'écrit 4 h + oral', officiel:'Écrit : commentaire ou dissertation · oral : explication + question de grammaire',
      faire:r => [bacOeuvres(r), bacMethode(r), exoGrammaireOral(r, 5)], nonNote:'Le vrai écrit se rédige : un commentaire ou une dissertation de 4 heures. L’appli entraîne la méthode, les œuvres et la grammaire de l’oral ; la note est une estimation de préparation, pas une note d’examen.' }
  };
  // Examens blancs : plusieurs épreuves, coefficients officiels.
  const BLANCS = {
    brevet:{ titre:'Brevet blanc 2026', ic:'🎓', niveau:'3e', epreuves:[['dnb-francais', 2], ['dnb-maths', 2], ['dnb-histoire', 1.5], ['dnb-emc', 0.5], ['dnb-sciences', 2]],
      bilan:'Au vrai brevet, ces épreuves comptent pour 60 % et le contrôle continu pour 40 % ; l’oral compte aussi. Diplôme à partir de 10/20 de moyenne finale.' },
    'bac-maths-spe':{ titre:'Maths anticipées blanc · spécialité', ic:'🔢', niveau:'1re', epreuves:[['eam-spe', 1]] },
    'bac-maths':{ titre:'Maths anticipées blanc · sans spécialité', ic:'🔢', niveau:'1re', epreuves:[['eam-commun', 1]] },
    'bac-francais':{ titre:'Bac de français blanc', ic:'📝', niveau:'1re', epreuves:[['eaf', 1]] }
  };
  // Annales : un jumeau pour chaque sujet officiel 2026 étudié, avec le lien vers le PDF officiel.
  const OFF = 'https://www.education.gouv.fr/sites/default/files/document/';
  const ANNALES = [
    { id:'dnb26-maths-an', titre:'Brevet 2026 · Mathématiques', ref:'26GENMATAN1', url:OFF + 'diplome-national-du-brevet-2026-mathematiques-serie-generale-516986.pdf',
      faire:r => [exoAuto(r, [AUTO_DNB[0], AUTO_DNB[1], AUTO_DNB[11], AUTO_DNB[2], AUTO_DNB[10], AUTO_DNB[3], AUTO_DNB[5]], 7, 6), exoGeoTriangles(r), exoFonctions(r), exoStatsEnergie(r), exoLutin(r)], matiere:'maths' },
    { id:'dnb26-maths-ag', titre:'Brevet 2026 · Mathématiques (autre centre)', ref:'26GENMATAG1', url:OFF + 'diplome-national-du-brevet-2026-mathematiques-serie-generale-518657.pdf',
      faire:r => [exoAuto(r, [AUTO_DNB[10], AUTO_DNB[8], AUTO_DNB[14], AUTO_DNB[9], AUTO_DNB[6], AUTO_DNB[4], AUTO_DNB[7]], 7, 6), exoGeoHomothetie(r), exoProgramme(r), exoTarifs(r)], matiere:'maths' },
    { id:'dnb26-francais', titre:'Brevet 2026 · Français', ref:'26GEN-FR', url:OFF + 'diplome-national-du-brevet-2026-francais-grammaire-et-competences-linguistiques-comprehension-et_3.pdf',
      faire:r => [texteExo(TEXTES_DNB[0]), exoDictee(r, 5)], matiere:'francais' },
    { id:'dnb26-hgemc', titre:'Brevet 2026 · Histoire-géographie et EMC', ref:'26GENHGEMCAN1', url:OFF + 'diplome-national-du-brevet-2026-histoire-geographie-enseignement-moral-et-civique-serie-generale.pdf',
      faire:r => [HG_GEO[0], { titre:HG_DEV[0].titre, pts:18, contexte:'Développement construit.', questions:HG_DEV[0].questions }, exoReperes(r, 3, 7), EMC[0]], matiere:'histoire' },
    { id:'dnb26-sciences', titre:'Brevet 2026 · Sciences', ref:'26GENSCAN1', url:OFF + 'diplome-national-du-brevet-2026-sciences-serie-generale-517070.pdf',
      faire:r => [scPhysiqueF1(r), svtChauveSouris(r)], matiere:'svt' },
    { id:'eam26-spe', titre:'Bac 2026 · Maths anticipées (spécialité)', ref:'26-MATSPEGEME1', url:OFF + 'baccalaureat-general-2026-mathematiques-epreuve-anticipee-pour-les-candidats-avec-enseignements-de.pdf',
      faire:r => [exoAuto(r, AUTO_SPE, 8, 6), bacProbaArbre(r), bacVraiFaux(r), bacProduitScalaire(r)], matiere:'maths' },
    { id:'eam26-commun', titre:'Bac 2026 · Maths anticipées (sans spécialité)', ref:'26-MATGEME1', url:OFF + 'baccalaureat-general-2026-mathematiques-epreuve-anticipee-pour-les-candidats-sans-enseignements-de.pdf',
      faire:r => [exoAuto(r, AUTO_COMMUN.concat(AUTO_DNB.slice(1, 5), AUTO_SPE.slice(2, 3)), 8, 6), bacTableau(r), bacPlacements(r)], matiere:'maths' },
    { id:'eaf26', titre:'Bac 2026 · Français (épreuve anticipée)', ref:'26-FRGEME1', url:OFF + 'baccalaureat-general-2026-francais-epreuve-anticipee-517283.pdf',
      faire:r => [bacOeuvres(r), bacMethode(r), exoGrammaireOral(r, 5)], matiere:'francais' }
  ];

  // Transforme une épreuve en liste de questions pour le moteur du jeu, avec les points de chaque question.
  function aplatir(exos, matiere){
    const l = []; let num = 0;
    exos.forEach((ex, k) => { const n = ex.questions.length, pts = ex.pts / n, auto = ex.titre === 'Automatismes'; if(!auto) num++;
      ex.questions.forEach((q, i) => l.push({ id:'epr:' + matiere + ':' + k + ':' + i, chap:'epreuve', matiere, lang:'fr', pts,
        consigne:(auto ? 'Partie 1 · Automatismes' : 'Exercice ' + num + ' · ' + ex.titre) + ' — question ' + (i + 1) + '/' + n + ' (' + nb(pts) + ' pt)',
        contexte:ex.contexte, enonce:q.q, bon:q.bon, faux:q.faux.map(([en, vanne]) => ({ en, vanne })), regle:q.regle })); });
    return l;
  }
  function construire(id, graine){
    const e = EPREUVES[id]; if(!e) return null; const r = hasard(graine), exos = e.faire(r);
    return { id, titre:e.titre, matiere:e.matiere, duree:e.duree, officiel:e.officiel, nonNote:e.nonNote || '', liste:aplatir(exos, e.matiere), total:exos.reduce((t, x) => t + x.pts, 0) };
  }
  function annale(id, graine){
    const a = ANNALES.find(x => x.id === id); if(!a) return null; const r = hasard(graine), exos = a.faire(r);
    return { id, titre:a.titre, ref:a.ref, url:a.url, matiere:a.matiere, liste:aplatir(exos, a.matiere), total:exos.reduce((t, x) => t + x.pts, 0) };
  }
  // Note sur 20 à partir des points gagnés.
  const note20 = (pts, total) => Math.round(20 * pts / Math.max(1e-9, total) * 10) / 10;
  const moyenne = (notes, coefs) => { const c = coefs.reduce((t, x) => t + x, 0); return Math.round(notes.reduce((t, n, i) => t + n * coefs[i], 0) / c * 10) / 10; };

  window.EPREUVES = { EPREUVES, BLANCS, ANNALES, construire, annale, note20, moyenne, hasard, outils:{ Q, VF, nb, frac, ent, un, pgcd, OFF }, _test:{ AUTO_DNB, AUTO_SPE, AUTO_COMMUN, TEXTES_DNB, HG_GEO, HG_DEV, EMC, GRAMMAIRE_ORAL, OEUVRES,
    gens:[exoGeoHomothetie, exoProgramme, exoTarifs, exoGeoTriangles, exoFonctions, exoStatsEnergie, exoLutin, scPhysiqueF1, scPhysiqueTrain, svtChauveSouris, svtVaccin, bacProbaArbre, bacVraiFaux, bacProduitScalaire, bacTableau, bacPlacements, bacOeuvres, bacMethode] } };
})();
