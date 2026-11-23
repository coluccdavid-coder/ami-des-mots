// v5.79 : épreuves de spécialité de terminale (voie générale) + philosophie, construites comme les sujets 2026.
// Même principe que js/epreuves.js : sujets jumeaux (même construction, autres nombres, autres textes), parties rédigées proposées sur papier,
// calculs justes générés au hasard, une vanne d'Ami pour chaque erreur. Les données chiffrées « de dossier » sont inventées pour l'entraînement.
(function(){
  'use strict';
  const E = window.EPREUVES; if(!E) return;
  const { Q, VF, nb, frac, ent, un, OFF } = E.outils;
  const C = (n, k) => { let r = 1; for(let i = 1; i <= k; i++) r = r * (n - k + i) / i; return r; };
  const melange = (r, l) => l.slice().sort(() => r() - 0.5);
  const tirer = (r, l, n) => melange(r, l).slice(0, n);
  const QS = l => l.map(([q, bon, faux, regle]) => Q(q, bon, faux, regle));

  // ═══════════════ MATHÉMATIQUES (4 h, 4 exercices : 5 + 5 + 4 + 6) ═══════════════
  function speProba(r){
    const pA = un(r, [0.5, 0.6, 0.4]), pB = un(r, [0.12, 0.15, 0.2]), pC = Math.round((1 - pA - pB) * 100) / 100, a = un(r, [0.9, 0.92]), b = un(r, [0.95, 0.96]), c = un(r, [0.85, 0.8]);
    const PT = pA * a + pB * b + pC * c, q = Math.round((1 - PT) * 1000) / 1000, n = un(r, [50, 75, 100]), k = Math.max(1, Math.round(n * q)), pk = C(n, k) * q ** k * (1 - q) ** (n - k);
    return { titre:'Probabilités et loi binomiale', pts:5, contexte:'Un équipementier achète ses pièces à trois fournisseurs : A (' + Math.round(pA * 100) + ' %), B (' + Math.round(pB * 100) + ' %) et C (le reste). Les taux de pièces conformes (événement T) sont ' + Math.round(a * 100) + ' %, ' + Math.round(b * 100) + ' % et ' + Math.round(c * 100) + ' %.\nOn prélève ensuite ' + n + ' pièces (tirage assimilé à un tirage avec remise) ; X compte les pièces non conformes.',
      questions:[
        Q('P(A ∩ T) = ?', nb(pA * a, 3), [[nb(a, 3), 'Ça, c’est P_A(T). L’intersection, c’est le produit le long de la branche.'], [nb(pA + a, 3), 'On multiplie le long d’une branche, on n’additionne pas. Une probabilité de 1,5, c’est un exploit.']], 'P(A ∩ T) = P(A) × P_A(T).'),
        Q('P(T) = ?', nb(PT, 3), [[nb((a + b + c) / 3, 3), 'Moyenne des taux sans les pondérer ? Les fournisseurs n’ont pas tous le même poids !'], [nb(pA * a, 3), 'Il manque les branches B et C. Formule des probabilités totales !']], 'P(T) = P(A)P_A(T) + P(B)P_B(T) + P(C)P_C(T).'),
        Q('Sachant que la pièce n’est pas conforme, probabilité qu’elle vienne de B (au millième) ?', nb(pB * (1 - b) / (1 - PT), 3), [[nb(pB * (1 - b), 3), 'Tu as oublié de diviser par P(T̄). Bayes est vexé.'], [nb(1 - b, 3), 'Ça, c’est P_B(T̄) : l’ordre des événements compte !']], 'P_T̄(B) = P(B ∩ T̄) ÷ P(T̄).'),
        Q('Loi de X ?', 'B(' + n + ' ; ' + nb(q, 3) + ')', [['B(' + n + ' ; ' + nb(1 - q, 3) + ')', 'X compte les NON conformes : le paramètre est P(T̄), pas P(T).'], ['B(' + nb(q, 3) + ' ; ' + n + ')', 'Les paramètres sont dans l’ordre (n ; p). Ami a vu l’inversion depuis sa branche.']], 'Répétition de ' + n + ' épreuves de Bernoulli indépendantes, succès = « non conforme ».'),
        Q('P(X = ' + k + ') arrondie au millième ?', nb(pk, 3), [[nb(q, 3), 'Ça, c’est p : la probabilité pour UNE seule pièce. Il en faut ' + k + ' parmi ' + n + ' !'], [nb(1 - pk, 3), 'Ça, c’est P(X ≠ ' + k + '). Le contraire, pile ce qu’on ne voulait pas.']], 'P(X = k) = C(n, k) p^k (1 − p)^(n − k).'),
        Q('Espérance de X ?', nb(n * q, 2), [[nb(n * (1 - q), 2), 'Ça, c’est l’espérance du nombre de pièces CONFORMES.'], [nb(n * q * (1 - q), 2), 'Ça, c’est la variance. Elles se ressemblent, mais ce ne sont pas des jumelles.']], 'E(X) = np.')
      ] };
  }
  const VF_MATHS = [
    ['La fonction f(x) = 3e^(−x) est solution de l’équation différentielle y′ + y = 0.', true, 'f′(x) = −3e^(−x), donc f′ + f = 0.'],
    ['La fonction f(x) = xe^(−x) est solution de l’équation différentielle y′ + y = 0.', false, 'f′(x) = (1 − x)e^(−x), donc f′ + f = e^(−x), qui n’est pas nul.'],
    ['La fonction f(x) = e^(2x) est solution de y′ = 2y.', true, 'f′(x) = 2e^(2x) = 2f(x).'],
    ['La suite v_n = (3n + sin n) ÷ (n + 1) diverge vers +∞.', false, 'Par encadrement (théorème des gendarmes), elle converge vers 3.'],
    ['Si u_0 = 5 et u_(n+1) = u_n + 2n + 1, alors u_n = n² + 5 pour tout n.', true, 'Par récurrence : (n + 1)² + 5 = n² + 5 + 2n + 1.'],
    ['Si u_0 = 5 et u_(n+1) = u_n + 2n + 1, alors u_n = n² + 6 pour tout n.', false, 'Pour n = 0, n² + 6 = 6 ≠ 5 : c’est faux dès le départ.'],
    ['La somme 1 + e^(−1) + e^(−2) + … + e^(−n) tend vers e ÷ (e − 1).', true, 'Somme géométrique de raison e^(−1) : limite 1 ÷ (1 − e^(−1)) = e ÷ (e − 1).'],
    ['Pour tous réels a et b strictement positifs, ln(a + b) = ln(a) + ln(b).', false, 'C’est ln(ab) = ln(a) + ln(b). Contre-exemple : a = b = 1.'],
    ['La fonction ln est concave sur ]0 ; +∞[.', true, 'ln″(x) = −1 ÷ x² < 0.'],
    ['Pour tout réel x, e^(x) ≥ x + 1.', true, 'La courbe d’exp est au-dessus de sa tangente en 0 (fonction convexe).']
  ];
  function speVF(r){
    return { titre:'Vrai ou faux (justifier)', pts:5, contexte:'Cinq affirmations indépendantes. Au vrai bac, une réponse non justifiée ne rapporte aucun point.',
      questions:tirer(r, VF_MATHS, 5).map(([q, v, regle]) => VF(q, v, regle, v ? 'C’est vrai ! Fais le calcul avant de répondre : la justification, c’est tout le sel.' : 'Piège ! Un contre-exemple ou un calcul suffit à le démolir.')) };
  }
  function speEspace(r){
    const s = un(r, [1, 2, 3, 6]), h = nb(s / 2), d = frac(4 * s, 3);
    return { titre:'Géométrie dans l’espace', pts:4, contexte:'ABCDEFGH est un cube d’arête ' + s + ', dans le repère orthonormé (A ; AB, AD, AE) unité 1. I, J et K sont les milieux de [EF], [EH] et [AE].',
      questions:[
        Q('Coordonnées de I ?', '(' + h + ' ; 0 ; ' + s + ')', [['(' + s + ' ; 0 ; ' + h + ')', 'Le milieu de [EF] est EN HAUT du cube : sa cote vaut ' + s + '.'], ['(' + h + ' ; ' + s + ' ; 0)', 'Ce point est sur la face du bas. I est sur l’arête du haut [EF].']], 'E(0 ; 0 ; ' + s + ') et F(' + s + ' ; 0 ; ' + s + ').'),
        Q('AI · AJ = ?', String(s * s), [[String(s * s / 2), 'Il manque le produit des cotes : ' + s + ' × ' + s + '.'], [String(2 * s * s), 'Un terme a été compté deux fois. La générosité, ce n’est pas pour le produit scalaire.']], 'AI(' + h + ' ; 0 ; ' + s + ') · AJ(0 ; ' + h + ' ; ' + s + ') = 0 + 0 + ' + (s * s) + '.'),
        Q('Mesure de l’angle IAJ au dixième de degré ?', '36,9°', [['53,1°', 'C’est le complémentaire. Ton cosinus a pris le mauvais côté.'], ['0,6°', 'Calculatrice en radians ? Ami le sent d’ici.']], 'cos(IAJ) = AI·AJ ÷ (AI × AJ) = 0,8.'),
        Q('Une équation cartésienne du plan (AIJ) ?', 'x + y − z/2 = 0', [['x + y + z/2 = 0', 'Teste le point I : ça ne marche pas. Le signe de z s’est échappé.'], ['x − y − z/2 = 0', 'Teste J : raté. Le plan a pivoté de travers.']], 'Le vecteur KC(' + s + ' ; ' + s + ' ; −' + h + ') est normal au plan, qui passe par A.'),
        Q('Distance du point C au plan (AIJ) ?', d, [[frac(2 * s, 3), 'Tu as oublié une des deux coordonnées de C dans la formule.'], [String(2 * s), 'Il faut diviser par la norme du vecteur normal (1,5).']], 'd = |' + s + ' + ' + s + ' − 0| ÷ √(1 + 1 + 0,25) = ' + d + '.')
      ] };
  }
  function speAnalyse(r){
    const k = un(r, [1, 2]), f = k === 1 ? 'ln(x) ÷ x' : 'ln(x) ÷ x²';
    return { titre:'Étude de fonction, intégrale et suite', pts:6, contexte:'f(x) = ' + f + ' sur ]0 ; +∞[. On pose I_n = ∫ de 1 à n de f(x) dx.',
      questions:[
        Q('Limite de f en 0⁺ ?', '−∞', [['0', 'ln(x) tend vers −∞ et on divise par un nombre qui tend vers 0⁺ : ça plonge !'], ['+∞', 'ln(x) est NÉGATIF près de 0. Le signe a fait demi-tour.']], 'ln(x) → −∞ et x^' + k + ' → 0⁺.'),
        Q('Limite de f en +∞ ?', '0', [['+∞', 'Croissances comparées : x^' + k + ' gagne la course contre ln(x).'], ['1', 'Pas d’asymptote en y = 1 ici.']], 'Croissances comparées.'),
        Q('f′(x) = ?', k === 1 ? '(1 − ln x) ÷ x²' : '(1 − 2 ln x) ÷ x³', [[k === 1 ? '1 ÷ x²' : '1 ÷ x³', 'Tu as dérivé seulement ln(x). La formule (u/v)′ réclame son dû.'], [k === 1 ? '(1 + ln x) ÷ x²' : '(1 + 2 ln x) ÷ x³', 'Le signe moins de la formule du quotient s’est volatilisé.']], '(u/v)′ = (u′v − uv′) ÷ v².'),
        Q('Le maximum de f est atteint en :', k === 1 ? 'x = e, et vaut 1/e' : 'x = √e, et vaut 1/(2e)', [[k === 1 ? 'x = 1, et vaut 0' : 'x = 1, et vaut 0', 'En x = 1, f vaut 0 mais elle continue de monter après.'], [k === 1 ? 'x = √e, et vaut 1/(2e)' : 'x = e, et vaut 1/e', 'C’est le maximum de l’AUTRE fonction de la famille. Mauvais vestiaire.']], 'f′(x) = 0 quand ' + (k === 1 ? 'ln x = 1' : 'ln x = 1/2') + '.'),
        Q('Équation de la tangente en x = 1 ?', 'y = x − 1', [['y = x', 'f(1) = 0 : la tangente passe par (1 ; 0), pas par l’origine.'], ['y = −x + 1', 'f′(1) = 1, pas −1. La pente monte !']], 'f(1) = 0 et f′(1) = 1.'),
        Q('Limite de I_n quand n → +∞ ?', k === 1 ? '+∞' : '1', [[k === 1 ? '1' : '+∞', k === 1 ? 'Ici I_n = (ln n)² ÷ 2, qui part vers l’infini.' : 'Ici I_n = 1 − (1 + ln n) ÷ n, qui se rapproche de 1.'], ['0', 'L’aire grandit avec n : elle ne peut pas tendre vers 0.']], k === 1 ? 'Primitive (ln x)² ÷ 2.' : 'Intégration par parties : I_n = 1 − (1 + ln n) ÷ n.')
      ] };
  }

  // ═══════════════ PHYSIQUE-CHIMIE (3 h 30, 3 exercices) ═══════════════
  function pcHarpe(r){
    const lam = un(r, [532, 633, 650]), D = un(r, [1.5, 2, 2.5]), a = un(r, [60, 80, 100, 120]), L = 2 * lam * 1e-9 * D / (a * 1e-6) * 1000;
    const S = un(r, [0.5, 0.8, 1.2]), Ec = 1000, Pm = un(r, [80, 120, 150]), Qb = un(r, [20, 40, 60]), I = un(r, [2, 2.5, 4]);
    const R = un(r, [1, 2, 4.7]), tau = un(r, [2, 4, 9.4]), Cf = tau / R, U = un(r, [500, 1000, 1500]);
    return { titre:'Une harpe électrique anti-frelons', pts:11, contexte:'1. Un laser (λ = ' + lam + ' nm) éclaire un fil de diamètre a ; sur un écran à D = ' + nb(D) + ' m, la tache centrale mesure L = ' + nb(L, 1) + ' mm.\n2. Panneau solaire : surface ' + nb(S) + ' m², éclairement ' + Ec + ' W/m², puissance électrique maximale ' + Pm + ' W. Batterie de ' + Qb + ' A·h chargée sous ' + nb(I) + ' A.\n3. Circuit RC : R = ' + nb(R) + ' kΩ, constante de temps mesurée τ = ' + nb(tau, 1) + ' ms ; tension de charge ' + U + ' V.',
      questions:[
        Q('Quel phénomène observe-t-on ?', 'La diffraction', [['La réfraction', 'La réfraction, c’est un changement de milieu. Ici, la lumière contourne un obstacle.'], ['Les interférences', 'Il faut deux sources cohérentes pour des interférences. Ici, un seul fil.']], 'Un obstacle de taille comparable à λ diffracte la lumière.'),
        Q('Relation entre l’écart angulaire θ, λ et a ?', 'θ = λ ÷ a', [['θ = a ÷ λ', 'Plus le fil est fin, plus la tache s’élargit : a doit être au dénominateur.'], ['θ = λ × a', 'L’angle n’a pas d’unité : λ × a donnerait des m².']], 'θ = λ ÷ a (en radians).'),
        Q('Diamètre a du fil ?', a + ' µm', [[nb(a / 2, 0) + ' µm', 'Tu as oublié le facteur 2 : L, c’est la tache ENTIÈRE, des deux côtés.'], [nb(a * 1000, 0) + ' µm', 'Conversion ratée : les mm et les µm ne sont pas copains.']], 'a = 2λD ÷ L.'),
        Q('Si on prend un fil plus fin, la tache centrale :', 'S’élargit', [['Rétrécit', 'L est inversement proportionnelle à a : fil plus fin, tache plus large.'], ['Ne change pas', 'Elle dépend de a. Le fil fin n’est pas invisible pour la lumière.']], 'L = 2λD ÷ a.'),
        Q('Rendement du panneau solaire ?', nb(Pm / (Ec * S) * 100, 1) + ' %', [[nb(Ec * S / Pm, 2) + ' %', 'Rendement à l’envers : il dépasserait les 100 %. Les lois de la physique protestent.'], [nb(Pm / Ec * 100, 1) + ' %', 'Tu as oublié la surface du panneau dans la puissance reçue.']], 'η = P_électrique ÷ (E × S).'),
        Q('Durée de charge de la batterie ?', nb(Qb / I, 1) + ' h', [[nb(Qb * I, 1) + ' h', 'Δt = Q ÷ I, pas Q × I.'], [nb(I / Qb, 2) + ' h', 'Division à l’envers. La batterie se charge en quelques minutes ? Rêve.']], 'Δt = Q ÷ I.'),
        Q('Capacité du condensateur ?', nb(Cf, 2) + ' µF', [[nb(tau * R, 1) + ' µF', 'τ = RC, donc C = τ ÷ R. Multiplier ne marche pas.'], [nb(Cf * 1000, 0) + ' µF', 'Attention aux unités : ms ÷ kΩ donne des µF.']], 'C = τ ÷ R.'),
        Q('Énergie stockée dans le condensateur chargé ?', nb(0.5 * Cf * 1e-6 * U * U, 2) + ' J', [[nb(Cf * 1e-6 * U * U, 2) + ' J', 'Il manque le ½ : le condensateur garde la moitié pour lui.'], [nb(0.5 * Cf * 1e-6 * U, 4) + ' J', 'La tension est AU CARRÉ dans la formule.']], 'E = ½ C U².')
      ] };
  }
  function pcNickel(r){
    const pct = un(r, [10, 12.5, 15]), mp = un(r, [1, 2]), m = mp * 1000 * pct / 100, M = 58.7, F = 96500, I = un(r, [2, 4, 5]), n = m / M, t = n * 2 * F / I;
    return { titre:'Des plantes qui dépolluent : le nickel', pts:5, contexte:'Une plante séchée contient ' + nb(pct, 1) + ' % de nickel en masse. On traite ' + mp + ' kg de plante, puis on dépose le nickel par électrolyse (Ni²⁺ + 2 e⁻ → Ni) sous I = ' + I + ' A.\nDonnées : M(Ni) = 58,7 g/mol ; F = 96 500 C/mol.',
      questions:[
        Q('Masse de nickel récupérable ?', nb(m, 0) + ' g', [[nb(pct, 1) + ' g', 'C’est le pourcentage, pas la masse. Il faut l’appliquer à ' + mp + ' kg.'], [nb(m / 10, 0) + ' g', 'Un zéro a sauté pendant la conversion kg → g.']], mp + ' kg × ' + nb(pct, 1) + ' %.'),
        Q('Ni²⁺ + 2 e⁻ → Ni est :', 'Une réduction', [['Une oxydation', 'L’ion GAGNE des électrons : c’est une réduction.'], ['Une réaction acide-base', 'Pas de proton échangé ici : ce sont des électrons.']], 'Réduction = gain d’électrons.'),
        Q('Quantité de matière de nickel ?', nb(n, 2) + ' mol', [[nb(m * M, 0) + ' mol', 'n = m ÷ M, pas m × M. Les moles s’envolent.'], [nb(M / m, 3) + ' mol', 'Division à l’envers !']], 'n = m ÷ M.'),
        Q('Durée de l’électrolyse ?', nb(t / 3600, 1) + ' h', [[nb(n * F / I / 3600, 1) + ' h', 'Il faut DEUX électrons par ion Ni²⁺ : Q = 2nF.'], [nb(t, 0) + ' h', 'Le résultat est en secondes : convertis en heures (÷ 3 600).']], 't = 2nF ÷ I.'),
        Q('Pour raccourcir l’électrolyse, on peut :', 'Augmenter l’intensité du courant', [['Diminuer l’intensité', 't = Q ÷ I : moins de courant, plus d’attente.'], ['Ajouter de l’eau froide', 'Ce n’est pas un plat de pâtes.']], 't est inversement proportionnelle à I.')
      ] };
  }
  function pcAspirine(r){
    const Cb = 0.05, Veq = un(r, [8.9, 10.6, 11.2, 12.1, 13.4]), V0 = 20, Vt = 100, M = 180.2, // donne de 400 à 600 mg environ : conforme ou non selon le tirage
    nA = Cb * Veq / 1000, mt = nA * Vt / V0 * M * 1000;
    return { titre:'Contrôle d’un comprimé d’aspirine', pts:4, contexte:'Un comprimé « 500 mg » est dissous dans ' + Vt + ' mL d’eau. On titre ' + V0 + ' mL de cette solution par de la soude à ' + nb(Cb) + ' mol/L : équivalence à V_E = ' + nb(Veq, 1) + ' mL. M(aspirine) = 180,2 g/mol. Tolérance : ± 15 %.',
      questions:[
        Q('À l’équivalence :', 'Les réactifs ont été introduits dans les proportions stœchiométriques', [['Le pH vaut toujours 7', 'Pour un acide faible titré par une base forte, le pH à l’équivalence est supérieur à 7.'], ['Il ne reste plus d’eau', 'L’eau ne disparaît pas dans un titrage. Ouf.']], 'Définition de l’équivalence.'),
        Q('Quantité d’aspirine dans les ' + V0 + ' mL titrés ?', nb(nA * 1000, 3) + ' mmol', [[nb(Cb * V0, 3) + ' mmol', 'C’est V_E qu’il faut utiliser, pas le volume titré.'], [nb(nA * 1000 * Vt / V0, 2) + ' mmol', 'Ça, c’est dans tout le comprimé : la question porte sur la prise d’essai.']], 'n = C_B × V_E.'),
        Q('Masse d’aspirine dans le comprimé ?', nb(mt, 0) + ' mg', [[nb(mt * V0 / Vt, 0) + ' mg', 'Il faut ramener à tout le volume : × ' + (Vt / V0) + '.'], [nb(mt / M, 1) + ' mg', 'Tu as divisé par M au lieu de multiplier.']], 'm = n × (' + Vt + ' ÷ ' + V0 + ') × M.'),
        Q('Le comprimé est-il conforme (500 mg ± 15 %) ?', mt >= 425 && mt <= 575 ? 'Oui' : 'Non', [[mt >= 425 && mt <= 575 ? 'Non' : 'Oui', 'Compare avec l’intervalle [425 mg ; 575 mg].'], ['On ne peut pas savoir', 'Tu as tout calculé : il suffit de comparer !']], 'Intervalle accepté : de 425 à 575 mg.')
      ] };
  }

  // ═══════════════ SVT (3 h 30 : synthèse 7 pts + exercice sur documents 8 pts) ═══════════════
  const SVT_COURS = [
    ['Quel message nerveux part de la moelle épinière vers un muscle ?', 'Un message moteur, par un motoneurone', [['Un message sensitif', 'Le message sensitif va du récepteur vers la moelle, pas l’inverse.'], ['Un message hormonal', 'Une hormone voyage par la circulation générale, pas dans un nerf.']], 'Motoneurone : de la moelle épinière vers le muscle.'],
    ['Au niveau d’une synapse neuromusculaire, le neurotransmetteur libéré est :', 'L’acétylcholine', [['L’adrénaline', 'L’adrénaline est surtout une hormone du stress.'], ['L’insuline', 'L’insuline régule la glycémie. Pas de muscle au programme ici.']], 'Acétylcholine à la jonction neuromusculaire.'],
    ['Lors d’un stress aigu, la glande surrénale libère rapidement :', 'De l’adrénaline', [['De la mélatonine', 'La mélatonine, c’est l’hormone du sommeil. Pas le moment de bâiller.'], ['De la testostérone', 'Hors sujet : ce n’est pas l’hormone de la réaction de fuite.']], 'Adrénaline : cœur plus rapide, glucose disponible.'],
    ['Le cortisol est produit sous le contrôle de :', 'L’axe hypothalamus–hypophyse–corticosurrénale', [['Le pancréas seul', 'Le pancréas produit insuline et glucagon.'], ['La thyroïde', 'La thyroïde produit d’autres hormones.']], 'Axe corticotrope : CRH → ACTH → cortisol.'],
    ['Le brassage interchromosomique a lieu :', 'En anaphase I de la méiose', [['Pendant la mitose', 'La mitose donne des cellules identiques : pas de brassage.'], ['Pendant la fécondation seulement', 'La fécondation brasse aussi, mais ce n’est pas le brassage INTERchromosomique de la méiose.']], 'Répartition aléatoire des chromosomes homologues.'],
    ['Les aérosols soufrés injectés par un volcan dans la stratosphère :', 'Refroidissent temporairement le climat', [['Réchauffent durablement le climat', 'Ils renvoient une partie du rayonnement solaire : refroidissement, et pour peu de temps.'], ['N’ont aucun effet', 'Le Pinatubo, en 1991, a fait baisser la température mondiale pendant environ deux ans.']], 'Les aérosols augmentent l’albédo.'],
    ['L’altération des roches silicatées :', 'Consomme du CO2 atmosphérique', [['Rejette du CO2', 'C’est la précipitation des carbonates qui en libère une partie. L’altération en consomme.'], ['Produit du dioxygène', 'Ça, c’est la photosynthèse.']], 'Piège à carbone sur le long terme.'],
    ['Les anticorps sont produits par :', 'Les plasmocytes (lymphocytes B différenciés)', [['Les lymphocytes T cytotoxiques', 'Les LT cytotoxiques détruisent les cellules infectées : ils ne font pas d’anticorps.'], ['Les globules rouges', 'Les globules rouges transportent le dioxygène.']], 'Réponse adaptative à médiation humorale.'],
    ['Une mutation est :', 'Une modification de la séquence de l’ADN', [['Toujours mortelle', 'La plupart des mutations sont neutres. Pas de panique.'], ['Une modification d’une protéine sans changement de l’ADN', 'La protéine change PARCE QUE l’ADN a changé.']], 'Source de diversité allélique.'],
    ['Le réflexe myotatique fait intervenir combien de synapses entre neurones dans la moelle ?', 'Une seule', [['Aucune', 'Il faut bien passer du neurone sensitif au motoneurone.'], ['Des milliers', 'C’est justement un réflexe MONOsynaptique.']], 'Réflexe monosynaptique.']
  ];
  function svtDatation(r){
    const T = un(r, [5730, 1.25e9, 4.47e9]), nom = T === 5730 ? 'carbone 14' : T === 1.25e9 ? 'potassium 40' : 'uranium 238', k = un(r, [1, 2, 3]), reste = 100 / 2 ** k;
    const age = k * T, aff = x => x >= 1e9 ? nb(x / 1e9, 2) + ' milliards d’années' : x >= 1e6 ? nb(x / 1e6, 0) + ' millions d’années' : nb(x, 0) + ' ans';
    return { titre:'Datation par les isotopes', pts:4, contexte:'Le ' + nom + ' a une demi-vie de ' + aff(T) + '. Dans un échantillon, il reste ' + nb(reste, 1) + ' % de l’isotope père initial.',
      questions:[
        Q('Combien de demi-vies se sont écoulées ?', String(k), [[String(2 * k), 'À chaque demi-vie, on divise par 2 (on ne retire pas 25 %).'], [String(Math.max(1, k - 1) === k ? k + 1 : k - 1), 'Recompte : 100 → 50 → 25 → 12,5…']], 'Après n demi-vies, il reste 100 ÷ 2^n %.'),
        Q('Âge de l’échantillon ?', aff(age), [[aff(T), 'Ça, c’est UNE demi-vie. Il y en a ' + k + '.'], [aff(age * 2), 'Une demi-vie de trop. Le caillou te remercie de le vieillir.']], k + ' × ' + aff(T) + '.'),
        Q('Le carbone 14 permet de dater :', 'Des restes organiques de moins de 50 000 ans environ', [['Les roches de la formation de la Terre', 'Demi-vie trop courte : il faut l’uranium ou le potassium pour ça.'], ['N’importe quel objet, même un caillou', 'Le carbone 14 date des restes d’êtres vivants.']], 'Au-delà d’environ 8 à 10 demi-vies, il n’en reste presque plus.')
      ] };
  }

  // ═══════════════ SES (4 h : dissertation OU épreuve composée 4 + 6 + 10) ═══════════════
  const SES_P1 = [
    ['Selon Schumpeter, la « destruction créatrice » désigne :', 'Le remplacement d’activités anciennes par des activités nouvelles grâce à l’innovation', [['La fermeture définitive de toutes les usines', 'Il y a destruction ET création : de nouvelles activités apparaissent.'], ['Une politique de l’État pour détruire la concurrence', 'C’est un processus économique, pas une décision politique.']], 'Innovation → nouveaux produits et emplois, disparition d’anciens.'],
    ['Le chômage conjoncturel est lié à :', 'Une insuffisance de la demande globale', [['Un manque de qualifications des actifs', 'Ça, c’est une cause de chômage structurel.'], ['Les vacances d’été', 'Ça, c’est du chômage saisonnier. Bien tenté.']], 'Ralentissement de l’activité → les entreprises embauchent moins.'],
    ['Le capital culturel, selon Bourdieu, c’est :', 'Les diplômes, savoirs et pratiques culturelles transmis notamment par la famille', [['L’argent placé en Bourse', 'Ça, c’est du capital économique.'], ['Le nombre d’amis', 'Ça se rapproche du capital social.']], 'Il favorise la réussite scolaire.'],
    ['L’organisation post-taylorienne du travail se caractérise par :', 'Polyvalence, travail en équipe et plus d’autonomie', [['Des tâches très parcellisées et chronométrées', 'Ça, c’est le taylorisme lui-même.'], ['La suppression de tous les chefs', 'L’autonomie augmente, mais la hiérarchie existe toujours.']], 'Enrichissement et élargissement des tâches.'],
    ['Une externalité négative, c’est :', 'Un effet nuisible d’une activité sur des tiers, sans compensation', [['Une taxe sur les importations', 'Ça, c’est un droit de douane.'], ['Une baisse des prix', 'Rien à voir : on parle d’effet sur des tiers.']], 'Exemple : la pollution d’une usine.'],
    ['La BCE agit principalement par :', 'Ses taux directeurs', [['Le vote des impôts', 'Les impôts sont votés par le Parlement.'], ['La fixation des salaires', 'Les salaires ne sont pas fixés par la BCE.']], 'Politique monétaire de la zone euro.'],
    ['La mobilité sociale structurelle est due :', 'À l’évolution de la structure des emplois entre générations', [['Uniquement au mérite individuel', 'Ça relève plutôt de la fluidité sociale.'], ['Aux déménagements', 'Mobilité sociale ≠ mobilité géographique.']], 'Exemple : moins d’agriculteurs, plus de cadres.'],
    ['Le multiplicateur keynésien signifie qu’une hausse de dépense publique :', 'Entraîne une hausse du revenu national plus que proportionnelle', [['Fait toujours baisser le PIB', 'C’est l’inverse dans le raisonnement keynésien.'], ['N’a aucun effet', 'L’effet existe, même s’il est discuté.']], 'Dépense → revenus → consommation → nouvelle demande…']
  ];
  function sesDocument(r){
    const y1 = un(r, [1995, 2005]), y2 = 2022, o1 = ent(r, 200, 350) / 10, e1 = o1 + ent(r, 80, 200) / 10, o2 = o1 + ent(r, 40, 120) / 10;
    return { titre:'Étude d’un document', pts:6, contexte:'Proportion de salariés devant appliquer strictement des consignes (en %) — données d’entraînement inventées.\n' + y1 + ' : ouvriers ' + nb(e1, 1) + ' ; ensemble des salariés ' + nb(o1, 1) + '.\n' + y2 + ' : ouvriers ' + nb(o2 + 10, 1) + ' ; ensemble des salariés ' + nb(o2, 1) + '.',
      questions:[
        Q('En ' + y1 + ', écart entre ouvriers et ensemble des salariés ?', nb(e1 - o1, 1) + ' points de pourcentage', [[nb((e1 - o1) / o1 * 100, 1) + ' %', 'Entre deux pourcentages, l’écart se donne en POINTS de pourcentage.'], [nb(e1 + o1, 1) + ' points', 'On soustrait, on n’additionne pas.']], nb(e1, 1) + ' − ' + nb(o1, 1) + '.'),
        Q('En ' + y1 + ', les ouvriers sont combien de fois plus concernés que l’ensemble ?', nb(e1 / o1, 2) + ' fois', [[nb(o1 / e1, 2) + ' fois', 'Rapport à l’envers : les ouvriers sont PLUS concernés, le résultat doit dépasser 1.'], [nb(e1 - o1, 1) + ' fois', 'Ça, c’est un écart, pas un rapport.']], nb(e1, 1) + ' ÷ ' + nb(o1, 1) + '.'),
        Q('Taux de variation pour l’ensemble des salariés entre ' + y1 + ' et ' + y2 + ' ?', nb((o2 - o1) / o1 * 100, 1) + ' %', [[nb(o2 - o1, 1) + ' %', 'Ça, c’est la variation en points. Le taux de variation se divise par la valeur de départ.'], [nb((o2 - o1) / o2 * 100, 1) + ' %', 'On divise par la valeur de DÉPART (' + y1 + '), pas d’arrivée.']], '(V_arrivée − V_départ) ÷ V_départ × 100.'),
        Q('Que montre l’évolution de l’ensemble des salariés ?', 'Une hausse de la part des salariés soumis à des consignes strictes', [['Une baisse', 'Les chiffres montent. Ami a vérifié deux fois.'], ['Une stabilité parfaite', 'Il y a ' + nb(o2 - o1, 1) + ' points d’écart : ce n’est pas stable.']], 'Lecture : de ' + nb(o1, 1) + ' % à ' + nb(o2, 1) + ' %.')
      ] };
  }
  const SES_P3 = [
    ['Face à un chômage conjoncturel, une politique de relance budgétaire consiste à :', 'Augmenter les dépenses publiques ou baisser les impôts', [['Augmenter fortement les impôts', 'Ça freinerait la demande : c’est l’inverse d’une relance.'], ['Supprimer les allocations chômage', 'Ça réduirait la consommation des ménages.']], 'Soutenir la demande globale.'],
    ['Une baisse des taux directeurs de la BCE vise à :', 'Faciliter le crédit pour stimuler l’investissement et la consommation', [['Faire baisser le PIB', 'C’est l’inverse : on veut relancer.'], ['Interdire les emprunts', 'Au contraire, on les rend moins chers.']], 'Canal du crédit.'],
    ['Une limite des politiques de relance :', 'Elles peuvent creuser le déficit et la dette publics', [['Elles font toujours disparaître le chômage structurel', 'Elles agissent surtout sur le chômage conjoncturel.'], ['Elles sont interdites en Europe', 'Elles sont encadrées, pas interdites.']], 'Contrainte budgétaire, effet d’éviction, fuite par les importations.'],
    ['Dans le raisonnement, la courbe montrant croissance du PIB et chômage permet d’illustrer :', 'Que le chômage augmente souvent quand la croissance ralentit', [['Que le PIB et le chômage n’ont aucun lien', 'Le lien est visible lors des crises.'], ['Que le chômage fait monter le PIB', 'Causalité à l’envers.']], 'Lien entre activité et emploi.']
  ];

  // ═══════════════ HGGSP (4 h : dissertation 10 pts + étude critique 10 pts) ═══════════════
  const HGGSP = [
    ['En quelle année l’ONU est-elle créée ?', '1945', [['1919', '1919, c’est la Société des Nations. L’ONU vient après la Seconde Guerre mondiale.'], ['1989', 'Bien plus tard, la chute du mur. Mauvaise frise.']], 'Charte de San Francisco, 1945.'],
    ['Combien de membres permanents compte le Conseil de sécurité de l’ONU ?', '5', [['15', '15, c’est le total des membres. Seuls 5 sont permanents, avec droit de veto.'], ['27', '27, c’est l’Union européenne. Mauvaise organisation !']], 'États-Unis, Russie, Chine, France, Royaume-Uni.'],
    ['La convention de l’UNESCO sur le patrimoine mondial date de :', '1972', [['1945', 'L’UNESCO naît en 1945, mais la convention du patrimoine arrive plus tard.'], ['2001', 'Trop tard : la liste existait déjà depuis longtemps.']], 'Convention de 1972.'],
    ['La convention de Montego Bay (1982) fixe la zone économique exclusive à :', '200 milles marins', [['12 milles marins', '12 milles, ce sont les eaux territoriales.'], ['1 000 kilomètres', 'Ami adorerait, mais non.']], 'ZEE : 200 milles marins (environ 370 km).'],
    ['L’accord de Paris sur le climat a été adopté lors de :', 'La COP21, en 2015', [['Le protocole de Kyoto', 'Kyoto, c’est 1997. Paris vient après.'], ['Le sommet de la Terre de 1992', 'Rio, 1992 : c’est le point de départ, pas l’accord de Paris.']], 'COP21, Paris, 2015.'],
    ['Le GIEC a été créé en :', '1988', [['2015', '2015, c’est l’accord de Paris.'], ['1945', 'Bien trop tôt pour le climat.']], 'Groupe d’experts intergouvernemental sur l’évolution du climat, 1988.'],
    ['Le procès de Nuremberg juge :', 'Les principaux dirigeants nazis', [['Les responsables du génocide des Tutsi', 'Ce sont des tribunaux créés dans les années 1990, notamment le TPIR.'], ['Les généraux de Napoléon', 'Mauvais siècle !']], 'Tribunal militaire international de Nuremberg, ouvert en 1945.'],
    ['Le génocide des Tutsi au Rwanda a eu lieu en :', '1994', [['1945', '1945, c’est la fin de la Seconde Guerre mondiale.'], ['1915', '1915, c’est le génocide des Arméniens.']], 'Avril à juillet 1994.'],
    ['Quel ouvrage de Clausewitz est central pour penser la guerre ?', 'De la guerre', [['Le Prince', 'Le Prince, c’est Machiavel.'], ['L’Art de la guerre', 'Celui-là est attribué à Sun Tzu.']], 'Clausewitz : la guerre comme continuation de la politique.'],
    ['Le premier satellite artificiel, Spoutnik, est lancé en :', '1957', [['1969', '1969, c’est le premier pas sur la Lune.'], ['1945', 'Trop tôt : la conquête spatiale commence après.']], 'URSS, 1957.'],
    ['Dans une étude critique de document, il faut d’abord :', 'Présenter le document (nature, auteur, date, contexte)', [['Donner son avis personnel', 'L’avis seul ne suffit pas : on analyse et on critique avec méthode.'], ['Recopier tout le document', 'Recopier n’est pas analyser.']], 'Présenter, analyser, critiquer (portée et limites).']
  ];

  // ═══════════════ HLP (4 h : interprétation 10 pts + essai 10 pts) ═══════════════
  const HLP = [
    ['Les deux grands thèmes du programme de HLP en terminale sont :', '« La recherche de soi » et « L’humanité en question »', [['« Les pouvoirs de la parole » et « Les représentations du monde »', 'Ce sont les thèmes de première.'], ['« L’art » et « Le bonheur »', 'Ce sont des notions du programme de philosophie.']], 'Programme de terminale.'],
    ['« Je pense, donc je suis » est de :', 'Descartes', [['Rousseau', 'Rousseau, c’est Les Confessions.'], ['Pascal', 'Pascal, c’est « le cœur a ses raisons ».']], 'Discours de la méthode, 1637.'],
    ['« Je est un autre » est une formule de :', 'Rimbaud', [['Baudelaire', 'Baudelaire, c’est Les Fleurs du mal.'], ['Victor Hugo', 'Ce n’est pas Hugo, même s’il est partout.']], 'Lettre dite « du voyant », 1871.'],
    ['Quelle œuvre raconte la vie de son auteur avec le projet d’une sincérité totale ?', 'Les Confessions de Rousseau', [['Candide de Voltaire', 'C’est un conte philosophique, pas une autobiographie.'], ['Le Cid de Corneille', 'C’est du théâtre.']], 'Autobiographie publiée après la mort de Rousseau.'],
    ['L’épisode de la madeleine illustre :', 'La mémoire involontaire chez Proust', [['La gourmandise chez Rabelais', 'Bien vu pour la nourriture, mais c’est Proust.'], ['Le progrès scientifique', 'C’est un souvenir qui revient, pas une découverte.']], 'À la recherche du temps perdu.'],
    ['Frankenstein de Mary Shelley interroge surtout :', 'Les limites de l’humain et de la science', [['La vie à la cour de Versailles', 'Mauvais roman !'], ['Les règles du football', 'Ami adore, mais non.']], '« L’humain et ses limites ».'],
    ['La « banalité du mal » est une analyse de :', 'Hannah Arendt', [['Sartre', 'Sartre, c’est « l’existence précède l’essence ».'], ['Freud', 'Freud, c’est l’inconscient.']], 'Eichmann à Jérusalem, 1963.'],
    ['Primo Levi témoigne de :', 'Sa déportation à Auschwitz', [['Son voyage sur la Lune', 'Non : c’est un témoignage sur la Shoah.'], ['La Révolution française', 'Mauvais siècle.']], 'Si c’est un homme.'],
    ['Dans l’épreuve, l’essai demande :', 'Une réponse argumentée et personnelle, appuyée sur des références', [['Le résumé du texte', 'Résumer ne suffit pas : il faut réfléchir à la question posée.'], ['Une liste de citations', 'Les citations doivent servir un raisonnement.']], 'Interprétation du texte, puis essai.']
  ];

  // ═══════════════ NSI (3 h 30 : 3 exercices, 6 + 6 + 8) ═══════════════
  function nsiSQL(r){
    const noms = ['Margherita', 'Reine', 'Quatre fromages', 'Calzone', 'Végétarienne'], prix = noms.map(() => ent(r, 8, 15)), seuil = ent(r, 10, 13);
    const sel = noms.filter((n, i) => prix[i] < seuil), moy = prix.reduce((t, x) => t + x, 0) / prix.length;
    return { titre:'Bases de données et SQL', pts:6, contexte:'Table Pizza(id, nom, prix) :\n' + noms.map((n, i) => (i + 1) + ' | ' + n + ' | ' + prix[i] + ' €').join('\n') + '\nTable Commande(num, id_pizza, quantite), où id_pizza référence Pizza(id).',
      questions:[
        Q('Combien de lignes renvoie : SELECT nom FROM Pizza WHERE prix < ' + seuil + ' ;', String(sel.length), [[String(noms.length - sel.length), 'Tu as compté celles qui sont AU-DESSUS du seuil.'], [String(noms.filter((n, i) => prix[i] <= seuil).length === sel.length ? sel.length + 1 : noms.filter((n, i) => prix[i] <= seuil).length), '« < » est strict : une pizza à ' + seuil + ' € n’est pas sélectionnée.']], 'Pizzas à moins de ' + seuil + ' € : ' + (sel.join(', ') || 'aucune') + '.'),
        Q('Que renvoie SELECT AVG(prix) FROM Pizza ;', nb(moy, 1), [[String(prix.reduce((t, x) => t + x, 0)), 'Ça, c’est SUM, pas AVG.'], [String(noms.length), 'Ça, c’est COUNT(*).']], 'Moyenne des prix.'),
        Q('Dans Commande, id_pizza est :', 'Une clé étrangère', [['Une clé primaire', 'La clé primaire de Commande, c’est num.'], ['Un attribut sans contrainte', 'Il référence une autre table : contrainte de référence.']], 'Elle référence la clé primaire de Pizza.'),
        Q('Requête pour passer la Reine à 12 € ?', 'UPDATE Pizza SET prix = 12 WHERE nom = \'Reine\' ;', [['UPDATE Pizza SET prix = 12 ;', 'Sans WHERE, TOUTES les pizzas passent à 12 €. Le patron pleure.'], ['INSERT INTO Pizza VALUES (2, \'Reine\', 12) ;', 'INSERT ajoute une ligne : la Reine existerait deux fois.']], 'UPDATE … SET … WHERE …'),
        Q('Pourquoi supprimer une pizza encore commandée pose problème ?', 'La contrainte de clé étrangère serait violée', [['La table devient trop rapide', 'Ce n’est pas un problème de vitesse.'], ['SQL interdit DELETE', 'DELETE existe, mais la contrainte de référence bloque.']], 'Intégrité référentielle.')
      ] };
  }
  function nsiPython(r){
    const k = ent(r, 4, 9), L = Array.from({ length:5 }, () => ent(r, 1, 9)), n = un(r, [8, 16, 32, 64]);
    return { titre:'Algorithmique et programmation Python', pts:6, contexte:'def f(n):\n    if n == 0:\n        return 0\n    return n + f(n - 1)\n\nliste = ' + JSON.stringify(L),
      questions:[
        Q('Que renvoie f(' + k + ') ?', String(k * (k + 1) / 2), [[String(k), 'f fait la SOMME de n à 0, pas juste n.'], [String(k * k), 'Ce n’est pas un carré : c’est 1 + 2 + … + ' + k + '.']], 'Somme des entiers de 1 à ' + k + ' : ' + (k * (k + 1) / 2) + '.'),
        Q('La fonction f est :', 'Récursive', [['Itérative', 'Elle s’appelle elle-même : c’est récursif.'], ['Infinie pour tout n', 'Le cas de base n == 0 arrête les appels (si n ≥ 0).']], 'Appel de f dans f.'),
        Q('Que vaut sum(liste) ?', String(L.reduce((t, x) => t + x, 0)), [[String(L.length), 'Ça, c’est len(liste).'], [String(Math.max(...L)), 'Ça, c’est max(liste).']], 'Somme des éléments.'),
        Q('Que vaut liste[-1] ?', String(L[4]), [[String(L[0]), 'liste[0] est le premier ; liste[-1] est le dernier.'], ['Une erreur', 'En Python, les indices négatifs comptent depuis la fin.']], 'Dernier élément.'),
        Q('Combien de comparaisons au plus pour une recherche dichotomique dans ' + n + ' éléments triés ?', String(Math.log2(n) + 1), [[String(n), 'Ça, c’est la recherche séquentielle. La dichotomie coupe en deux à chaque fois !'], [String(n / 2), 'On coupe en deux à CHAQUE étape, pas une seule fois.']], 'Environ log2(n) + 1 comparaisons.'),
        Q('Complexité du tri par insertion dans le pire cas ?', 'Quadratique, en O(n²)', [['Linéaire, en O(n)', 'Ça, c’est le meilleur cas (liste déjà triée).'], ['Logarithmique', 'Aucun tri par comparaison n’est aussi rapide.']], 'Double boucle.')
      ] };
  }
  function nsiReseaux(r){
    const d1 = un(r, [10, 100, 1000]), d2 = un(r, [10, 100, 1000]), d3 = un(r, [10, 100, 1000]), c = d => 1e8 / (d * 1e6);
    const cA = c(d1), cB = c(d2) + c(d3);
    return { titre:'Réseaux, sécurité et programmation objet', pts:8, contexte:'Deux chemins relient R1 à R4 :\nChemin A : R1 → R4 directement, liaison à ' + d1 + ' Mbit/s.\nChemin B : R1 → R2 → R4, liaisons à ' + d2 + ' Mbit/s puis ' + d3 + ' Mbit/s.\nAvec OSPF, coût d’une liaison = 10^8 ÷ débit (en bit/s).',
      questions:[
        Q('Avec RIP (nombre de sauts), quel chemin est choisi ?', 'Le chemin A', [['Le chemin B', 'RIP compte les routeurs traversés : A en traverse moins.'], ['Les deux en même temps', 'RIP choisit une route, celle avec le moins de sauts.']], 'RIP minimise le nombre de sauts.'),
        Q('Coût OSPF du chemin B ?', nb(cB, 2), [[nb(c(d2), 2), 'Il faut additionner les coûts des DEUX liaisons.'], [String(d2 + d3), 'Le coût n’est pas le débit : coût = 10^8 ÷ débit.']], nb(c(d2), 2) + ' + ' + nb(c(d3), 2) + '.'),
        Q('Avec OSPF, quel chemin est choisi ?', cA < cB ? 'Le chemin A' : cA > cB ? 'Le chemin B' : 'Les deux ont le même coût', [[cA < cB ? 'Le chemin B' : 'Le chemin A', 'Compare les coûts : OSPF prend le plus petit.'], ['Celui avec le plus de routeurs', 'OSPF regarde le coût, pas le nombre de routeurs.']], 'A : ' + nb(cA, 2) + ' ; B : ' + nb(cB, 2) + '.'),
        Q('Le protocole qui chiffre les échanges web est :', 'HTTPS (avec TLS)', [['HTTP', 'Le S de HTTPS, c’est « sécurisé ». Sans lui, tout passe en clair.'], ['FTP', 'FTP transfère des fichiers, sans chiffrement.']], 'TLS chiffre la communication.'),
        Q('Dans un chiffrement symétrique :', 'La même clé sert à chiffrer et à déchiffrer', [['Une clé publique chiffre et une clé privée déchiffre', 'Ça, c’est le chiffrement asymétrique.'], ['Il n’y a pas de clé', 'Sans clé, ce n’est plus du chiffrement.']], 'Clé partagée.'),
        Q('Pourquoi échanger la clé symétrique avec un chiffrement asymétrique ?', 'Pour transmettre la clé secrète sans qu’elle soit lue en route', [['Parce que c’est plus joli', 'L’esthétique n’a rien à voir.'], ['Pour aller plus vite que le symétrique', 'L’asymétrique est plus LENT : on s’en sert juste pour la clé.']], 'Puis on chiffre les données en symétrique, plus rapide.'),
        Q('Dans une classe Python, une méthode est :', 'Une fonction définie dans la classe', [['Un attribut numérique', 'Un attribut stocke une donnée ; une méthode est une fonction.'], ['Un module externe', 'Elle est définie DANS la classe.']], 'def methode(self, …):')
      ] };
  }

  // ═══════════════ SCIENCES DE L'INGÉNIEUR (3 h 30 : SI 20 pts + sciences physiques 20 pts) ═══════════════
  function siCatamaran(r){
    const F = un(r, [800, 1200, 1500]), v = un(r, [5, 6, 8]), U = un(r, [48, 72]), Qah = un(r, [100, 150, 200]), e1 = un(r, [0.9, 0.95]), e2 = un(r, [0.85, 0.9]), N = un(r, [1500, 3000]);
    const P = F * v, E = U * Qah, eta = e1 * e2, Pel = P / eta, t = E / Pel, w = 2 * Math.PI * N / 60, Cm = Pel * e1 / w;
    return { titre:'Sciences de l’ingénieur — Un catamaran électrique à foils', pts:20, contexte:'Le bateau avance à v = ' + v + ' m/s avec une force de traînée F = ' + F + ' N. Batterie : ' + U + ' V, ' + Qah + ' A·h. Rendements : moteur ' + nb(e1) + ', transmission ' + nb(e2) + '. Moteur à ' + N + ' tr/min.',
      questions:[
        Q('Puissance mécanique nécessaire pour avancer ?', nb(P, 0) + ' W', [[nb(F / v, 0) + ' W', 'P = F × v, pas F ÷ v.'], [nb(F * v * 3.6, 0) + ' W', 'La vitesse est déjà en m/s : pas de 3,6 ici.']], 'P = F × v.'),
        Q('Énergie stockée dans la batterie ?', nb(E / 1000, 1) + ' kWh', [[nb(E, 0) + ' kWh', 'U × Q donne des Wh : divise par 1 000 pour des kWh.'], [nb(Qah / U, 2) + ' kWh', 'E = U × Q, pas Q ÷ U.']], 'E = U × Q = ' + E + ' Wh.'),
        Q('Rendement global de la chaîne de puissance ?', nb(eta, 3), [[nb(e1 + e2, 2), 'Les rendements se MULTIPLIENT. Un rendement supérieur à 1, c’est le mouvement perpétuel.'], [nb((e1 + e2) / 2, 3), 'On ne fait pas la moyenne : on multiplie.']], 'η = η_moteur × η_transmission.'),
        Q('Puissance électrique prise à la batterie ?', nb(Pel, 0) + ' W', [[nb(P * eta, 0) + ' W', 'Il faut DIVISER par le rendement : la batterie fournit plus que ce qui arrive à l’hélice.'], [nb(P, 0) + ' W', 'Tu as oublié les pertes.']], 'P_élec = P_méca ÷ η.'),
        Q('Autonomie à cette vitesse ?', nb(t, 1) + ' h', [[nb(t * 60, 0) + ' h', 'Le résultat est en heures, pas en minutes déguisées.'], [nb(Pel / E, 2) + ' h', 'Autonomie = énergie ÷ puissance, pas l’inverse.']], 't = E ÷ P_élec.'),
        Q('Vitesse angulaire du moteur ?', nb(w, 1) + ' rad/s', [[nb(N / 60, 1) + ' rad/s', 'Tu as converti en tours par seconde : il manque × 2π.'], [String(N) + ' rad/s', 'Les tr/min ne sont pas des rad/s.']], 'ω = 2πN ÷ 60.'),
        Q('Couple fourni par le moteur ?', nb(Cm, 1) + ' N·m', [[nb(Pel * w, 0) + ' N·m', 'C = P ÷ ω, pas P × ω.'], [nb(Pel / N, 2) + ' N·m', 'Il faut ω en rad/s, pas N en tr/min.']], 'C = P_moteur ÷ ω.'),
        Q('Dans un diagramme SysML, les exigences du cahier des charges apparaissent dans :', 'Le diagramme des exigences', [['Le diagramme de séquence', 'Il décrit les échanges dans le temps.'], ['Le diagramme de blocs internes', 'Il décrit la structure interne.']], 'req : diagramme des exigences.'),
        Q('Un système asservi en boucle fermée :', 'Compare la sortie mesurée à la consigne pour corriger', [['N’a aucun capteur', 'Sans capteur, pas de retour : ce serait une boucle ouverte.'], ['Ignore la consigne', 'La consigne est justement la référence.']], 'Retour d’information par un capteur.')
      ] };
  }
  function siPhysique(r){
    const m = un(r, [800, 1000, 1200]), v = un(r, [10, 15, 20]), h = un(r, [2, 5]);
    return { titre:'Sciences physiques', pts:20, contexte:'Une charge de ' + m + ' kg est soulevée de ' + h + ' m, puis un véhicule de même masse roule à ' + v + ' m/s. g = 9,8 N/kg.',
      questions:[
        Q('Énergie cinétique du véhicule ?', nb(0.5 * m * v * v / 1000, 1) + ' kJ', [[nb(m * v / 1000, 1) + ' kJ', 'La vitesse est AU CARRÉ dans Ec = ½mv².'], [nb(m * v * v / 1000, 1) + ' kJ', 'Il manque le ½.']], 'Ec = ½ m v².'),
        Q('Variation d’énergie potentielle de pesanteur de la charge ?', nb(m * 9.8 * h / 1000, 2) + ' kJ', [[nb(m * h / 1000, 2) + ' kJ', 'Il manque g = 9,8 N/kg.'], [nb(m * 9.8 / h / 1000, 2) + ' kJ', 'On multiplie par la hauteur, on ne divise pas.']], 'ΔEp = m g h.'),
        Q('Si la vitesse double, l’énergie cinétique :', 'Est multipliée par 4', [['Double', 'Ec dépend de v² : × 2 sur v donne × 4 sur Ec.'], ['Ne change pas', 'Elle change, et beaucoup.']], 'Proportionnelle au carré de la vitesse.')
      ] };
  }

  // ═══════════════ LLCER ANGLAIS (3 h 30 : synthèse 16 pts + traduction 4 pts) ═══════════════
  const LLCER = [
    ['Meilleure traduction : « She has been living in London for ten years. »', 'Elle vit à Londres depuis dix ans.', [['Elle a vécu à Londres pendant dix ans.', 'Le present perfect + for indique une action qui DURE encore : on traduit par le présent + « depuis ».'], ['Elle vivra à Londres dans dix ans.', 'Aucun futur dans la phrase anglaise.']], 'Present perfect + for → présent + depuis.'],
    ['Meilleure traduction : « He used to play football. »', 'Il jouait au football autrefois.', [['Il est habitué à jouer au football.', '« Be used to », c’est être habitué. « Used to » + verbe, c’est une habitude passée.'], ['Il a utilisé le football.', 'Traduction mot à mot : le correcteur fait une crise de nerfs.']], 'Used to + base verbale : habitude révolue.'],
    ['Meilleure traduction : « I wish I had known. »', 'Si seulement j’avais su.', [['Je souhaite que je savais.', 'Calque de l’anglais : en français, on dit « si seulement… ».'], ['J’aurai su.', 'Futur antérieur : hors sujet.']], 'Wish + past perfect : regret sur le passé.'],
    ['Meilleure traduction : « They had their car repaired. »', 'Ils ont fait réparer leur voiture.', [['Ils ont réparé leur voiture.', '« Have something done » : quelqu’un d’autre fait l’action.'], ['Ils avaient leur voiture réparée.', 'Mot à mot raté.']], 'Have + objet + participe passé : faire faire.'],
    ['« Actually » se traduit par :', 'En fait', [['Actuellement', 'Faux ami ! « Actuellement », c’est « currently ».'], ['Activement', 'Ça, c’est « actively ».']], 'Faux ami classique.'],
    ['« Eventually » se traduit par :', 'Finalement', [['Éventuellement', 'Faux ami ! « Éventuellement », c’est « possibly ».'], ['Évidemment', 'Ça, c’est « obviously ».']], 'Faux ami classique.'],
    ['« Sensible » se traduit par :', 'Raisonnable', [['Sensible', 'Faux ami ! « Sensible » en français, c’est « sensitive ».'], ['Sensuel', 'Rien à voir.']], 'Sensible = raisonnable, plein de bon sens.'],
    ['Pour opposer deux documents dans une synthèse, on peut écrire :', 'Whereas', [['Moreover', '« Moreover » ajoute une idée, il n’oppose pas.'], ['Therefore', '« Therefore » annonce une conséquence.']], 'Whereas, however, on the other hand…'],
    ['Une thématique de LLCER anglais en terminale :', '« Voyages, territoires, frontières »', [['« Les espaces productifs »', 'C’est de la géographie de collège.'], ['« La guerre froide »', 'C’est un chapitre d’histoire.']], 'Aussi : « Arts et débats d’idées », « Expression et construction de soi ».'],
    ['La synthèse demande d’environ :', '500 mots en anglais', [['50 mots', 'Bien trop court : le sujet demande environ 500 mots.'], ['500 mots en français', 'La synthèse se rédige en anglais. La traduction, elle, se fait en français.']], 'Synthèse 16 points, traduction 4 points.']
  ];

  // ═══════════════ PHILOSOPHIE (4 h, coefficient 8) ═══════════════
  const PHILO = [
    ['Laquelle de ces notions est au programme de philosophie de terminale ?', 'La conscience', [['La photosynthèse', 'C’est de la SVT, même si la plante a sûrement des pensées profondes.'], ['La géolocalisation', 'Pas au programme. Ami se perd quand même sans.']], '17 notions : l’art, le bonheur, la conscience, le devoir, l’État, l’inconscient, la justice, le langage, la liberté, la nature, la raison, la religion, la science, la technique, le temps, le travail, la vérité.'],
    ['« L’homme est condamné à être libre » est de :', 'Sartre', [['Kant', 'Kant, c’est l’impératif catégorique.'], ['Platon', 'Platon, c’est l’allégorie de la caverne.']], 'L’existentialisme est un humanisme.'],
    ['L’allégorie de la caverne se trouve dans :', 'La République de Platon', [['Le Discours de la méthode', 'Ça, c’est Descartes.'], ['Le Contrat social', 'Ça, c’est Rousseau.']], 'Livre VII de La République.'],
    ['« L’homme est un animal politique » est une idée de :', 'Aristote', [['Hobbes', 'Hobbes pense plutôt un état de nature violent.'], ['Nietzsche', 'Pas lui.']], 'La Politique.'],
    ['« Le cœur a ses raisons que la raison ne connaît point » est de :', 'Pascal', [['Descartes', 'Descartes, c’est « je pense, donc je suis ».'], ['Montaigne', 'Montaigne, ce sont les Essais.']], 'Pensées.'],
    ['L’hypothèse de l’inconscient psychique est associée à :', 'Freud', [['Darwin', 'Darwin, c’est l’évolution des espèces.'], ['Marx', 'Marx, c’est l’analyse du capitalisme.']], 'Psychanalyse.'],
    ['Dans une dissertation de philosophie, la problématique doit :', 'Faire apparaître une tension dans la question posée', [['Répéter le sujet avec d’autres mots', 'Reformuler ne suffit pas : il faut un problème.'], ['Donner tout de suite la réponse', 'La réponse vient à la fin, après le raisonnement.']], 'Le problème justifie le plan.'],
    ['Une explication de texte consiste à :', 'Dégager la thèse et analyser l’argumentation de l’auteur', [['Raconter la vie de l’auteur', 'La biographie n’explique pas le texte.'], ['Dire si on aime le texte', 'Le goût personnel ne suffit pas.']], 'Thèse, enjeu, mouvement du texte, analyse.']
  ];

  // ═══════════════ Assemblage ═══════════════
  const exoQS = (titre, pts, contexte, l, r, n) => ({ titre, pts, contexte, questions:QS(tirer(r, l, n)) });
  const P = {
    'spe-maths':{ titre:'Spécialité mathématiques', duree:'4 h', officiel:'4 exercices (5 + 5 + 4 + 6 points), calculatrice autorisée',
      faire:r => [speProba(r), speVF(r), speEspace(r), speAnalyse(r)], matiere:'maths' },
    'spe-pc':{ titre:'Spécialité physique-chimie', duree:'3 h 30', officiel:'3 exercices (11 + 5 + 4 points)',
      faire:r => [pcHarpe(r), pcNickel(r), pcAspirine(r)], matiere:'physique', nonNote:'Au vrai sujet, les démarches et les schémas se rédigent : l’appli vérifie les résultats.' },
    'spe-svt':{ titre:'Spécialité SVT', duree:'3 h 30', officiel:'Exercice 1 : question de synthèse (7 pts) · exercice 2 : documents (8 pts)',
      faire:r => [exoQS('Connaissances pour la synthèse', 7, 'Thème : système nerveux, stress, immunité, génétique, climat.', SVT_COURS, r, 6), svtDatation(r)], matiere:'svt',
      nonNote:'Synthèse rédigée à faire sur papier, par exemple : « Montrez comment le système nerveux permet une réaction de fuite efficace face à un danger. »' },
    'spe-ses':{ titre:'Spécialité SES', duree:'4 h', officiel:'Dissertation OU épreuve composée (4 + 6 + 10 points)',
      faire:r => [exoQS('Partie 1 · Mobilisation des connaissances', 4, '', SES_P1, r, 3), sesDocument(r), exoQS('Partie 3 · Raisonnement sur dossier documentaire', 10, 'Sujet : montrez que les politiques de soutien de la demande peuvent lutter contre le chômage conjoncturel.', SES_P3, r, 4)], matiere:'histoire',
      nonNote:'Dissertation possible (sur papier) : « Les ressources et configurations familiales suffisent-elles à expliquer la mobilité sociale ? »' },
    'spe-hggsp':{ titre:'Spécialité HGGSP', duree:'4 h', officiel:'Dissertation (10 pts) + étude critique de document (10 pts)',
      faire:r => [exoQS('Connaissances et méthode', 20, 'Thèmes : guerre et paix, environnement, patrimoine, connaissance, mémoires, océans et espace.', HGGSP, r, 8)], matiere:'histoire',
      nonNote:'Dissertation sur papier, au choix : « Construire les mémoires des génocides » ou « Le rapport des États-Unis à l’environnement ».' },
    'spe-hlp':{ titre:'Spécialité HLP', duree:'4 h', officiel:'Interprétation (10 pts) + essai (10 pts)',
      faire:r => [exoQS('Repères et méthode', 20, 'Thèmes de terminale : « La recherche de soi » et « L’humanité en question ».', HLP, r, 7)], matiere:'francais',
      nonNote:'Essai sur papier, par exemple : « La littérature et les arts peuvent-ils se passer de la sensibilité ? »' },
    'spe-nsi':{ titre:'Spécialité NSI', duree:'3 h 30', officiel:'3 exercices (6 + 6 + 8 points), calculatrice interdite',
      faire:r => [nsiSQL(r), nsiPython(r), nsiReseaux(r)], matiere:'maths' },
    'spe-si':{ titre:'Spécialité sciences de l’ingénieur', duree:'3 h 30 (2 h 30 de SI + 1 h de sciences physiques)', officiel:'SI 20 pts (coef. 8) + sciences physiques 20 pts (coef. 4)',
      faire:r => [siCatamaran(r), siPhysique(r)], matiere:'physique' },
    'spe-llcer':{ titre:'Spécialité LLCER anglais', duree:'3 h 30', officiel:'Synthèse en anglais (16 pts) + traduction (4 pts)',
      faire:r => [exoQS('Traduction et méthode de synthèse', 20, 'La synthèse (environ 500 mots) se rédige en anglais ; la traduction, en français.', LLCER, r, 8)], matiere:'anglais',
      nonNote:'Synthèse sur papier, par exemple : « Taking into account the specificities of the documents, show how art explores the power of lies. »' },
    'philo':{ titre:'Philosophie', duree:'4 h, coefficient 8', officiel:'Dissertation (au choix entre 2 sujets) ou explication de texte',
      faire:r => [exoQS('Notions, auteurs et méthode', 20, '', PHILO, r, 7)], matiere:'francais',
      nonNote:'Sujets tombés en 2026 : « La science doit-elle être utile ? » ; « L’artiste sait-il ce qu’il fait ? » — à traiter sur papier.' }
  };
  Object.assign(E.EPREUVES, P);
  E.SPES = ['spe-maths', 'spe-pc', 'spe-svt', 'spe-ses', 'spe-hggsp', 'spe-hlp', 'spe-nsi', 'spe-si', 'spe-llcer'];
  E.SPES.concat('philo').forEach(id => { E.BLANCS['tle-' + id] = { titre:P[id].titre, ic:'🎒', niveau:'Tle', epreuves:[[id, 1]], tle:true }; });
  // Bac blanc de terminale : 2 spécialités au choix (coef. 16 chacune) + philosophie (coef. 8).
  E.bacTerminale = (s1, s2) => ({ titre:'Bac blanc de terminale', ic:'🎓', niveau:'Tle', epreuves:[[s1, 16], [s2, 16], ['philo', 8]].concat(E.EPREUVES['grand-oral'] ? [['grand-oral', 8]] : []),
    bilan:'Au vrai bac, ces épreuves s’ajoutent au français, au grand oral et au contrôle continu (40 %).' });
  const ANN = [
    ['bac26-maths', 'Bac 2026 · Spécialité maths', '26-MATJ1G11', 'baccalaureat-general-2026-mathematiques-jour-1-517247.pdf', 'spe-maths'],
    ['bac26-pc', 'Bac 2026 · Spécialité physique-chimie', '26-PYCJ1G11', 'baccalaureat-general-2026-physique-chimie-jour-1-517253.pdf', 'spe-pc'],
    ['bac26-svt', 'Bac 2026 · Spécialité SVT', '26-SVTJ1ME1', 'baccalaureat-general-2026-sciences-de-la-vie-et-de-la-terre-517607.pdf', 'spe-svt'],
    ['bac26-ses', 'Bac 2026 · Spécialité SES', '26-SESJ1JA1', 'baccalaureat-general-2026-sciences-economiques-et-sociales-jour-1-517415.pdf', 'spe-ses'],
    ['bac26-hggsp', 'Bac 2026 · Spécialité HGGSP', '26-HGGSPJ1AG1', 'baccalaureat-general-2026-histoire-geographie-geopolitique-et-sciences-politiques-517712.pdf', 'spe-hggsp'],
    ['bac26-hlp', 'Bac 2026 · Spécialité HLP', '26-HLPJ1AG1', 'baccalaureat-general-2026-humanites-litterature-et-philosophie-517715.pdf', 'spe-hlp'],
    ['bac26-nsi', 'Bac 2026 · Spécialité NSI', '26-NSI', 'baccalaureat-general-2026-numerique-et-sciences-informatiques-517721.pdf', 'spe-nsi'],
    ['bac26-si', 'Bac 2026 · Spécialité SI', '26-SCIPCJ1ME1', 'baccalaureat-general-2026-sciences-de-l-ingenieur-517616.pdf', 'spe-si'],
    ['bac26-llcer', 'Bac 2026 · LLCER anglais', '26LLCERANG11', 'baccalaureat-general-2026-langues-litteratures-et-cultures-etrangeres-et-regionales-anglais-517367.pdf', 'spe-llcer'],
    ['bac26-philo', 'Bac 2026 · Philosophie', '26-PHGEAN1', 'baccalaureat-general-2026-philosophie-517046.pdf', 'philo']
  ];
  for(const [id, titre, ref, pdf, ep] of ANN) E.ANNALES.push({ id, titre, ref, url:OFF + pdf, faire:P[ep].faire, matiere:P[ep].matiere, tle:true });
  E._test.spe = { speProba, speVF, speEspace, speAnalyse, pcHarpe, pcNickel, pcAspirine, svtDatation, sesDocument, nsiSQL, nsiPython, nsiReseaux, siCatamaran, siPhysique, C };
})();
