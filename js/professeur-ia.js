/* Professeur IA Plumo des Mots — tuteur adaptatif local v1.
 * Les explications et corrigés viennent d'un contenu pédagogique écrit et vérifiable.
 * Le moteur adapte le parcours à partir des réponses ; aucune donnée n'est envoyée.
 */
(function(){
'use strict';
const COURS = {
 primaire: {
  nom:'Primaire · 6 à 10 ans',
  anglais:[
   {id:'en-vocab',titre:'Les premiers mots',notion:'Vocabulaire de base',lecon:'En anglais, « cat » signifie « chat », « dog » signifie « chien » et « house » signifie « maison ». Apprends le mot avec une image mentale et réutilise-le dans une petite phrase.',exemple:'I see a cat. = Je vois un chat.',q:'Que signifie « dog » ?',choix:['Chat','Chien','Maison'],bon:1,exp:'« Dog » signifie « chien ». « Cat » signifie chat.'},
   {id:'en-be',titre:'Dire qui l’on est',notion:'Verbe be au présent',lecon:'Le verbe « be » signifie être. On dit « I am » (je suis), « you are » (tu es) et « he/she is » (il/elle est). En anglais, le verbe est nécessaire.',exemple:'I am happy. = Je suis heureux/heureuse.',q:'Complète : She ___ happy.',choix:['am','are','is'],bon:2,exp:'Avec « she », on utilise « is » : She is happy.'},
   {id:'en-colours',titre:'Décrire avec les couleurs',notion:'Adjectifs de couleur',lecon:'En anglais, l’adjectif de couleur se place généralement avant le nom et reste invariable au pluriel.',exemple:'A red car. / Two red cars.',q:'Quelle expression est correcte ?',choix:['A car red','A red car','A reds car'],bon:1,exp:'L’adjectif « red » se place avant le nom et ne prend pas de -s.'},
   {id:'en-age',titre:'Parler de son âge',notion:'Âge avec be',lecon:'En anglais, on utilise le verbe « be » pour dire son âge. On ne traduit pas mot à mot « avoir 8 ans ».',exemple:'I am eight years old. = J’ai huit ans.',q:'Comment dit-on « J’ai 9 ans » ?',choix:['I have nine years.','I am nine years old.','I has nine.'],bon:1,exp:'On dit « I am nine years old », littéralement « je suis âgé de neuf ans ».'}
  ],
  maths:[
   {id:'ma-div',titre:'Comprendre la division',notion:'Division et partage',lecon:'Diviser, c’est partager en parts égales ou chercher combien de fois un nombre est contenu dans un autre.',exemple:'24 ÷ 6 = 4.',q:'36 billes sont partagées entre 4 enfants. Combien chacun en reçoit-il ?',choix:['8','9','12'],bon:1,exp:'36 ÷ 4 = 9. Chaque enfant reçoit 9 billes.'},
   {id:'ma-add',titre:'Additionner',notion:'Addition',lecon:'Additionner, c’est réunir des quantités. On peut compter en avançant ou décomposer les nombres pour calculer plus facilement.',exemple:'27 + 15 = 27 + 10 + 5 = 42.',q:'Combien font 36 + 8 ?',choix:['42','44','46'],bon:1,exp:'36 + 8 = 36 + 4 + 4 = 40 + 4 = 44.'},
   {id:'ma-mult',titre:'Comprendre la multiplication',notion:'Multiplication',lecon:'Multiplier, c’est additionner plusieurs fois la même quantité. 4 × 3 signifie 4 groupes de 3.',exemple:'4 × 3 = 3 + 3 + 3 + 3 = 12.',q:'Combien font 5 × 4 ?',choix:['9','20','25'],bon:1,exp:'5 groupes de 4 font 4 + 4 + 4 + 4 + 4 = 20.'},
   {id:'ma-pourcentage',titre:'Calculer un pourcentage',notion:'Pourcentage',lecon:'Un pourcentage est une fraction sur 100. Pour calculer p % d’une quantité, on multiplie cette quantité par p/100.',exemple:'20 % de 50 = 0,20 × 50 = 10.',q:'Combien font 25 % de 80 ?',choix:['15','20','25'],bon:1,exp:'25 % = 1/4. Le quart de 80 vaut 20.'},
   {id:'ma-frac',titre:'Découvrir les fractions',notion:'Fractions simples',lecon:'Une fraction partage une unité en parts égales. Le dénominateur indique le nombre total de parts ; le numérateur indique combien de parts on prend.',exemple:'3/4 signifie 3 parts quand l’unité est partagée en 4 parts égales.',q:'Dans 3/4, que représente le 4 ?',choix:['Les parts prises','Les parts égales au total','Le nombre d’unités'],bon:1,exp:'Le dénominateur 4 indique que l’unité est partagée en quatre parts égales.'}
  ]
 },
 college:{
  nom:'Collège · 11 à 14 ans',
  anglais:[
   {id:'en-past',titre:'Raconter au passé',notion:'Prétérit',lecon:'Pour raconter une action terminée dans le passé, on utilise souvent le prétérit. Les verbes réguliers prennent -ed ; les verbes irréguliers ont une forme à apprendre.',exemple:'Yesterday, I played football. / Yesterday, I went home.',q:'Choisis la bonne phrase : « Hier, je suis allé à l’école. »',choix:['Yesterday, I go to school.','Yesterday, I went to school.','Yesterday, I goed to school.'],bon:1,exp:'« Go » est irrégulier : son prétérit est « went ».'},
   {id:'en-comparative',titre:'Comparer deux choses',notion:'Comparatif de supériorité',lecon:'Les adjectifs courts prennent souvent -er + than. Les adjectifs longs utilisent more + adjectif + than.',exemple:'A bike is faster than walking.',q:'Complète : My bag is ___ than yours. (heavy)',choix:['heavyer','heavier','more heavy'],bon:1,exp:'Pour un adjectif terminé par consonne + y, le y devient i : heavier.'},
   {id:'en-do',titre:'Poser une question',notion:'Auxiliaire do',lecon:'Au présent simple, on utilise généralement do/does pour poser une question. Avec he, she, it, on emploie does et le verbe principal reste à la base verbale.',exemple:'Does she like music? — Yes, she does.',q:'Quelle question est correcte ?',choix:['Does he plays tennis?','Do he play tennis?','Does he play tennis?'],bon:2,exp:'« Does » porte la marque de la 3e personne ; le verbe reste « play ».'}
  ],
  maths:[
   {id:'ma-rel',titre:'Nombres relatifs',notion:'Addition de relatifs',lecon:'Pour additionner deux nombres de même signe, on additionne leurs distances à zéro et on garde le signe commun. Avec des signes différents, on soustrait les distances et on garde le signe du nombre qui a la plus grande distance à zéro.',exemple:'−7 + 3 = −4.',q:'Calcule : −8 + 5',choix:['−13','−3','3'],bon:1,exp:'Les signes sont différents : 8 − 5 = 3. Le nombre de plus grande distance à zéro est −8, donc le résultat est −3.'},
   {id:'ma-frac',titre:'Additionner des fractions',notion:'Dénominateur commun',lecon:'Pour additionner des fractions, elles doivent avoir le même dénominateur. On transforme les fractions si nécessaire, puis on additionne les numérateurs.',exemple:'1/4 + 2/4 = 3/4.',q:'Calcule : 1/3 + 1/3',choix:['2/6','2/3','1/6'],bon:1,exp:'Les dénominateurs sont déjà égaux : on additionne les numérateurs, 1 + 1 = 2. Résultat : 2/3.'}
  ]
 },
 lycee:{
  nom:'Lycée · 15 à 18 ans',
  anglais:[
   {id:'en-present-perfect',titre:'Relier passé et présent',notion:'Present perfect',lecon:'Le present perfect se forme avec have/has + participe passé. Il sert notamment à parler d’une expérience ou d’un événement passé qui a un lien avec le présent. Il ne se traduit pas mécaniquement par un temps français unique.',exemple:'I have visited London. = J’ai déjà visité Londres.',q:'Complète : She ___ never seen snow.',choix:['have','has','is'],bon:1,exp:'Avec « she », on utilise « has » : She has never seen snow.'},
   {id:'en-passive',titre:'Construire une phrase passive',notion:'Voix passive',lecon:'La voix passive met en avant ce qui subit l’action. En anglais, on la forme avec be conjugué + participe passé.',exemple:'The book was written in 1920.',q:'Complète : The letters ___ sent yesterday.',choix:['was','were','is'],bon:1,exp:'« Letters » est pluriel et l’action est au passé : on utilise « were sent ».'},
   {id:'en-condition',titre:'Exprimer une hypothèse',notion:'Second conditional',lecon:'Le second conditional décrit une situation imaginaire ou peu probable dans le présent : If + prétérit, would + base verbale.',exemple:'If I had more time, I would travel.',q:'Complète : If I won the lottery, I ___ a house.',choix:['buy','will buy','would buy'],bon:2,exp:'Le second conditional associe « If + prétérit » à « would + base verbale ».'}
  ],
  maths:[
   {id:'ma-fonction',titre:'Lire une fonction affine',notion:'Fonction affine',lecon:'Une fonction affine s’écrit f(x) = ax + b. Le coefficient a donne la variation de f quand x augmente de 1 ; b est l’ordonnée à l’origine, c’est-à-dire f(0).',exemple:'Pour f(x)=2x+3, f(0)=3 et le coefficient directeur vaut 2.',q:'Pour f(x) = 3x − 4, quelle est l’ordonnée à l’origine ?',choix:['3','−4','−1'],bon:1,exp:'Le terme constant b vaut −4. Donc f(0)=−4.'},
   {id:'ma-second-degre',titre:'Calculer un discriminant',notion:'Équation du second degré',lecon:'Pour ax² + bx + c = 0, le discriminant vaut Δ = b² − 4ac.',exemple:'Pour x² − 5x + 6, Δ = 25 − 24 = 1.',q:'Quel est le discriminant de x² − 4x + 3 = 0 ?',choix:['4','−4','16'],bon:0,exp:'Δ = (−4)² − 4×1×3 = 16 − 12 = 4.'},
   {id:'ma-pyth',titre:'Utiliser Pythagore',notion:'Théorème de Pythagore',lecon:'Dans un triangle rectangle, le carré de la longueur de l’hypoténuse est égal à la somme des carrés des deux autres côtés. L’hypoténuse est le côté opposé à l’angle droit.',exemple:'Avec des côtés de 3 et 4, l’hypoténuse mesure √(9+16)=5.',q:'Un triangle rectangle a pour côtés de l’angle droit 6 et 8. Quelle est l’hypoténuse ?',choix:['10','12','14'],bon:0,exp:'c² = 6² + 8² = 36 + 64 = 100. La longueur positive est √100 = 10.'}
  ]
 }
};
const cle=(niveau,matiere,id)=>[niveau,matiere,id].join(':');
function lire(){try{return JSON.parse(localStorage.getItem('ami-professeur-v1')||'{}')}catch(e){return {}}}
function ecrire(d){try{localStorage.setItem('ami-professeur-v1',JSON.stringify(d))}catch(e){}}
function stats(){return lire()}
function choisir(niveau,matiere){
 const liste=(COURS[niveau]&&COURS[niveau][matiere])||[];
 const s=stats();
 return liste.slice().sort((a,b)=>(s[cle(niveau,matiere,a.id)]?.maitrise||0)-(s[cle(niveau,matiere,b.id)]?.maitrise||0))[0]||null;
}
function enregistrer(niveau,matiere,cours,juste){
 const s=stats(), k=cle(niveau,matiere,cours.id), x=s[k]||{essais:0,justes:0,maitrise:0};
 x.essais++; if(juste){x.justes++;x.maitrise=Math.min(5,x.maitrise+1)}else{x.maitrise=Math.max(0,x.maitrise-1)}
 x.derniereReponse=Date.now(); s[k]=x; ecrire(s); return x;
}
function progression(){const s=stats();return Object.values(s).reduce((a,x)=>({essais:a.essais+x.essais,justes:a.justes+x.justes,notions:Object.keys(s).length,maitrisees:a.maitrisees+(x.maitrise>=3?1:0)}),{essais:0,justes:0,notions:0,maitrisees:0})}
window.AMI_PROFESSEUR=Object.freeze({COURS,choisir,enregistrer,progression});
})();