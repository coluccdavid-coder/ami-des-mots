// Ami des mots — v6.18: «Objectif NASA» (programa francés) en español. Mismo orden que los bancos franceses.
// Los cálculos (cohetes, órbitas, comunicaciones, unidades, vida a bordo) se fabrican en español en js/nasa.js.
window.MATIERES_LANGUES = window.MATIERES_LANGUES || {};
window.MATIERES_LANGUES.es = window.MATIERES_LANGUES.es || { noms:{}, q:{} };
(function(T){
  T.noms = T.noms || {}; T.q = T.q || {};
  const Q = T.q;
  T.noms.nasa = { nom:'Objetivo NASA', dom:{ 'Parcours':'Itinerarios', 'Exercices':'Ejercicios', 'Culture spatiale':'Cultura espacial', 'Géosciences (GEOPS)':'Geociencias (GEOPS)' },
    ch:{ parcours:'Itinerarios y títulos', metiers:'Profesiones de la NASA y del espacio', fusees:'Cohetes y propulsión', orbites:'Órbitas y gravitación', communications:'Comunicaciones y distancias',
      unites:'Unidades y conversiones', survie:'Vida a bordo', exploration:'Misiones: Apolo, ISS, Artemis, Marte', anglais:'Inglés de misión', code:'Código y software de vuelo',
      geopolitique:'Geopolítica del espacio', geops:'GEOPS: geociencias de la Tierra y los planetas' } };
  Q['nasa/parcours'] = [
    ['Para ser astronauta de la NASA, el primer requisito es…', 'ser ciudadano estadounidense', [['tener 18 años', 'No hay límite de edad oficial.'], ['hablar ruso', 'Útil en la ISS, pero no es el primer requisito.']], 'Las personas con doble nacionalidad pueden presentarse.'],
    ['¿Qué título mínimo hace falta para presentarse como astronauta de la NASA?', 'un máster científico (STEM)', [['el bachillerato', 'Harán falta al menos cinco años más de estudios.'], ['un BTS (técnico superior)', 'No basta para este puesto.']], 'Ingeniería, biología, física, informática, matemáticas; desde 2026 también cuenta un máster en enfermería. Equivalentes: medicina, doctorado en curso, escuela de piloto de pruebas.'],
    ['¿Cuántos años de experiencia profesional después de ese título?', 'al menos 3 años', [['ninguno', 'La NASA quiere gente que ya haya trabajado.'], ['20 años', 'Serían muchos.']], 'O horas de vuelo para los pilotos (750 h como comandante en avión a reacción).'],
    ['Las prácticas OSTEM y Pathways de la NASA están abiertas…', 'a los ciudadanos estadounidenses', [['a todo el mundo', 'No, hace falta la nacionalidad estadounidense.'], ['solo a los astronautas', 'Son prácticas para estudiantes.']], 'Existe un programa «International Intern» para los países con acuerdo con la NASA.'],
    ['Para alguien que vive en Francia, el camino más realista hacia las profesiones del espacio pasa por…', 'la ESA, el CNES y la industria (Airbus, Thales, ArianeGroup…)', [['un concurso de televisión', 'A Plumo le encanta la tele, pero no.'], ['un visado de turista', 'No permite trabajar.']], 'Y colaboraciones con la NASA a través de esos organismos.'],
    ['El programa «Graduate Trainee» de la ESA pide…', 'un máster (en el último año o recién terminado)', [['el brevet (fin de la secundaria obligatoria)', 'Hace falta un máster.'], ['10 años de experiencia', 'Es para recién titulados.']], 'Abierto a los ciudadanos de los Estados miembros de la ESA (entre ellos Francia).'],
    ['¿Cuáles son las lenguas de trabajo de la ESA?', 'el inglés y el francés', [['solo el alemán', 'No.'], ['el latín', 'Plumo lo habría apostado para el Vaticano.']], 'Se exige un buen dominio de una de las dos.'],
    ['Después del bachillerato, ¿qué itinerario lleva más a menudo a las profesiones del espacio?', 'clases preparatorias o un grado científico, y luego una escuela de ingenieros o un máster', [['bachillerato y directamente astronauta', 'Falta una decena de años.'], ['ninguno, te descubren por casualidad', 'No.']], 'Escuelas conocidas: ISAE-SUPAERO, Centrale, Polytechnique, universidades (máster de astrofísica).'],
    ['¿Qué especialidades del instituto conviene elegir para apuntar al espacio?', 'matemáticas y física y química', [['solo SES (economía)', 'No hay bastantes ciencias para la ingeniería.'], ['da igual', 'Las matemáticas cuentan mucho.']], 'Se recomienda la opción de matemáticas expertas; NSI (informática) es un plus para el software.'],
    ['Thomas Pesquet estudió…', 'ingeniería (SUPAERO), y luego fue piloto de línea', [['cocina', 'Cocinaba en la ISS, pero no.'], ['derecho', 'No.']], 'Seleccionado por la ESA en 2009.']
  ];
  Q['nasa/metiers'] = [
    ['¿Cuántas personas trabajan en la NASA, aproximadamente?', 'unas 18 000 personas empleadas', [['20', 'Unas cuantas más.'], ['10 millones', 'Muchas menos.']], 'Además de muchas empresas contratistas.'],
    ['¿Quién vigila una misión en directo desde tierra?', 'los controladores de vuelo (Mission Control)', [['los astronautas solos', 'Nunca están solos.'], ['nadie', 'Siempre hay alguien vigilando.']], 'En Houston (Johnson Space Center).'],
    ['El JPL (Jet Propulsion Laboratory) es conocido sobre todo por…', 'las sondas robóticas y los rovers marcianos', [['los aviones de pasajeros', 'No.'], ['solo los cohetes tripulados', 'Sobre todo robots.']], 'Perseverance, Curiosity, Voyager.'],
    ['Un ingeniero de sistemas…', 'hace que todas las partes de una nave funcionen juntas', [['solo arregla las impresoras de la oficina', 'Mucho más que eso.'], ['diseña logotipos', 'No.']], 'Visión de conjunto, requisitos, pruebas.'],
    ['¿Qué profesión analiza las rocas lunares traídas a la Tierra?', 'geólogo / planetólogo', [['cocinero', 'No.'], ['abogado', 'No.']], 'Las muestras del Apolo se siguen estudiando.'],
    ['Un médico del espacio (flight surgeon) se ocupa…', 'de la salud de los astronautas antes, durante y después del vuelo', [['de los cohetes', 'Los cohetes tienen ingenieros.'], ['de los extraterrestres', 'Todavía no.']], 'Huesos, músculos, radiación, vista.'],
    ['El centro de lanzamiento de la NASA en Florida es…', 'el Kennedy Space Center', [['el Johnson Space Center', 'Ese está en Houston (control de los vuelos tripulados).'], ['Kourou', 'Ese es el puerto espacial europeo.']], 'Plataforma 39B para Artemis.'],
    ['Sin ir al espacio, se puede trabajar para una misión de la NASA…', 'como ingeniero, científico, programador o técnico', [['de ninguna manera', 'La mayoría de la gente trabaja en tierra.'], ['solo como guía turístico', 'No.']], 'Miles de empleos en tierra.']
  ];
  Q['nasa/exploration'] = [
    ['¿Cuándo se posó el Apolo 11 en la Luna?', 'el 20 de julio de 1969', [['1957', 'Eso es el Sputnik.'], ['2001', 'No.']], 'Neil Armstrong y Buzz Aldrin.'],
    ['¿Cuándo despegó Artemis II?', 'el 1 de abril de 2026', [['1969', 'Eso es el Apolo 11.'], ['nunca despegó', 'Sí: cuatro astronautas alrededor de la Luna.']], 'Sobrevuelo lunar el 6 de abril, amerizaje el 10 de abril de 2026.'],
    ['¿Quién formaba parte de la tripulación de Artemis II?', 'Wiseman, Glover, Koch y el canadiense Hansen', [['Armstrong y Aldrin', 'Eso es el Apolo 11.'], ['Thomas Pesquet', 'Esta vez no.']], 'La primera mujer y el primer canadiense en viajar hacia la Luna.'],
    ['¿Desde cuándo está habitada la ISS de forma continua?', 'desde noviembre de 2000', [['1969', 'No.'], ['2020', 'Mucho antes.']], 'Más de 25 años de presencia humana.'],
    ['¿Qué rover de la NASA explora el cráter Jezero en Marte?', 'Perseverance', [['Sojourner', 'El primer rover, en 1997.'], ['Sputnik', 'Un satélite soviético.']], 'Llegó en febrero de 2021, con el helicóptero Ingenuity.'],
    ['¿Dónde está el telescopio James Webb?', 'cerca del punto de Lagrange L2, a 1,5 millones de km', [['en órbita baja, como Hubble', 'Webb está mucho más lejos.'], ['en la Luna', 'No.']], 'Lanzado por un Ariane 5 en diciembre de 2021.'],
    ['¿Qué sonda es la más alejada de la Tierra?', 'la Voyager 1', [['Hubble', 'Gira alrededor de la Tierra.'], ['Perseverance', 'Está en Marte.']], 'Lanzada en 1977, hoy en el espacio interestelar.'],
    ['¿Qué busca el programa Artemis?', 'volver a la Luna para quedarse y luego preparar Marte', [['visitar el Sol', 'Demasiado caliente.'], ['sustituir la ISS por un avión', 'No.']], 'Polo austral de la Luna, estación Gateway.']
  ];
  Q['nasa/anglais'] = [
    ['«Liftoff» quiere decir…', 'despegue', [['aterrizaje', 'Eso es landing.'], ['combustible', 'Eso es fuel o propellant.']], 'La NASA trabaja en inglés: el vocabulario cuenta.'],
    ['«Splashdown» quiere decir…', 'amerizaje', [['explosión', 'No.'], ['despegue', 'No.']], 'Orion amariza en el Pacífico.'],
    ['«Payload» quiere decir…', 'carga útil', [['sueldo', 'Pay… load, pero no.'], ['motor', 'No.']], 'Lo que transporta el cohete.'],
    ['«Thrust» quiere decir…', 'empuje', [['confianza', 'Eso es trust (sin h).'], ['velocidad', 'Eso es speed.']], 'Se mide en newtons (o en libras-fuerza).'],
    ['«Go / No go» sirve para…', 'dar (o no) el visto bueno para continuar', [['saludar', 'No.'], ['jugar al go', 'Plumo juega, pero no.']], 'Cada responsable contesta antes del lanzamiento.'],
    ['«Houston, we’ve had a problem» se dijo durante…', 'el Apolo 13 (1970)', [['el Apolo 11', 'El Apolo 11 salió bien.'], ['Artemis II', 'No.']], 'Falló un depósito de oxígeno; la tripulación volvió sana y salva.'],
    ['«EVA» (extravehicular activity) designa…', 'un paseo espacial', [['un nombre propio', 'Aquí, no.'], ['una comida', 'No.']], 'Salida con escafandra.'],
    ['«Abort» quiere decir…', 'interrumpir la misión', [['a bordo', 'Eso es aboard.'], ['tener éxito', 'No.']], 'El sistema de escape de Orion aleja la cápsula si hay un problema.']
  ];
  Q['nasa/code'] = [
    ['¿Qué lenguaje se usa mucho en la NASA para analizar datos?', 'Python', [['solo HTML', 'HTML hace páginas, no cálculos.'], ['ninguno', 'Se usan muchos.']], 'También C/C++ para el software de vuelo.'],
    ['¿Quién dirigió el código de guiado del Apolo?', 'Margaret Hamilton', [['Ada Lovelace', 'Vivió en el siglo XIX.'], ['Bill Gates', 'No.']], 'En el MIT, en los años sesenta.'],
    ['¿Por qué se prueba un software de vuelo miles de veces?', 'porque un error puede hacer perder la misión', [['para pasar el rato', 'No.'], ['no sirve para nada', 'Es vital.']], 'El vuelo 501 del Ariane 5 (1996) falló por un error de software.'],
    ['En Python, ¿cuánto da 2 ** 10?', '1024', [['20', 'Eso es 2 × 10.'], ['100', 'Eso es 10².']], '** = potencia.'],
    ['Un bucle «for» sirve para…', 'repetir instrucciones', [['parar el programa', 'No.'], ['dibujar un cohete', 'Solo si lo programas.']], 'Las simulaciones avanzan paso a paso en el tiempo.'],
    ['En una simulación de órbita, en cada paso se actualizan…', 'la posición y la velocidad', [['el color del cohete', 'No.'], ['los nombres de los astronautas', 'No.']], 'Método de Euler: x += v·dt; v += a·dt.'],
    ['¿Cuánto es 5 en binario?', '101', [['110', 'Eso es 6.'], ['111', 'Eso es 7.']], '4 + 1.'],
    ['¿Por qué las sondas lejanas son en parte autónomas?', 'por el retraso de las comunicaciones', [['porque la NASA se aburre', 'No.'], ['la radio está prohibida', 'No.']], 'Marte: hasta 22 minutos de retraso.']
  ];
  Q['nasa/geopolitique'] = [
    ['¿Qué tratado de 1967 prohíbe que un país se apropie de la Luna?', 'el Tratado del Espacio Ultraterrestre', [['el Tratado de Versalles', 'Eso es 1919.'], ['el Tratado de Roma', 'Eso es 1957, Europa.']], 'También prohíbe las armas nucleares en órbita.'],
    ['¿Qué satélite lanzó la carrera espacial en 1957?', 'el Sputnik 1 (URSS)', [['el Apolo 11', 'Eso es 1969.'], ['Hubble', 'Eso es 1990.']], 'Guerra Fría: rivalidad Estados Unidos / URSS.'],
    ['¿Primer ser humano en el espacio?', 'Yuri Gagarin (1961)', [['Neil Armstrong', 'El primero en la Luna, en 1969.'], ['Thomas Pesquet', 'Mucho más tarde.']], 'URSS, 12 de abril de 1961.'],
    ['Los Acuerdos Artemis (2020) son…', 'principios para explorar la Luna juntos, propuestos por Estados Unidos', [['un tratado militar', 'No, se refieren a la exploración civil.'], ['un acuerdo de fútbol', 'No.']], 'Francia los firmó en 2022.'],
    ['¿Qué estación espacial ha construido China?', 'Tiangong', [['Mir', 'Mir era soviética y luego rusa.'], ['Skylab', 'Skylab era estadounidense.']], 'Terminada en 2022.'],
    ['¿Qué país posó una sonda cerca del polo austral de la Luna en 2023?', 'la India (Chandrayaan-3)', [['Francia', 'No.'], ['Brasil', 'No.']], 'El polo austral interesa por su hielo de agua.'],
    ['Galileo es…', 'el sistema de navegación europeo, competidor del GPS', [['un telescopio de la NASA', 'Galileo, el sabio, tenía un anteojo, pero aquí no.'], ['un cohete', 'No.']], 'Independencia estratégica de Europa.'],
    ['¿Por qué el espacio es una cuestión de poder?', 'satélites de comunicación, navegación, observación y militares', [['solo por el turismo', 'No solo.'], ['no hay nada en juego', 'Hay mucho en juego.']], 'Los ensayos antisatélite crean residuos peligrosos para todos.'],
    ['El Ariane 6 hizo su primer vuelo en…', '2024', [['1979', 'Eso es el Ariane 1.'], ['2030', 'Ya ha volado.']], 'El acceso autónomo de Europa al espacio.'],
    ['¿Qué socios construyen y utilizan la ISS?', 'Estados Unidos, Rusia, Europa, Japón y Canadá', [['solo Estados Unidos', 'Es una cooperación internacional.'], ['China y la India', 'No forman parte.']], 'Una cooperación nacida tras la Guerra Fría.']
  ];
  Q['nasa/geops'] = [
    ['GEOPS es…', 'el laboratorio Géosciences Paris-Saclay (CNRS y Université Paris-Saclay)', [['una agencia espacial', 'No: es un laboratorio de investigación en ciencias de la Tierra y los planetas.'], ['un satélite europeo', 'No, es un laboratorio, no algo en órbita.']], 'Unidad mixta de investigación UMR 8148, miembro del OSU Paris-Saclay y de la federación IPSL.'],
    ['¿Cuál de estos temas de investigación es de GEOPS?', 'Evolución de la Tierra y de los Planetas', [['Física de partículas', 'Eso es más bien el CERN.'], ['Cirugía cardiaca', 'Laboratorio equivocado, planta equivocada.']], 'Los 4 temas: Cuencas y Recursos, Evolución de la Tierra y de los Planetas, Paleoclimas y Dinámica sedimentaria, Zona crítica.'],
    ['¿Qué máster está vinculado a GEOPS?', 'Ciencias de la Tierra y de los Planetas, Medio Ambiente', [['Derecho mercantil', 'Aquí no hay fallos jurídicos, solo fallas geológicas.'], ['Comercio internacional', 'Aquí hablamos de placas, no de mercados.']], 'Université Paris-Saclay. En grado: Ciencias de la Tierra, o doble titulación Geociencias y Física.'],
    ['Para estudiar los planetas en geociencias después del bachillerato, se empieza por…', 'un grado en ciencias de la Tierra (o doble titulación geociencias y física)', [['un curso de repostería', 'Los estratos de roca no son una tarta de capas.'], ['nada: directo a Marte', 'Primero hay que aprender a leer las rocas.']], 'Luego un máster y después un doctorado (unos 3 años) para ser investigador.'],
    ['Los «Paleoclimas» estudian…', 'los climas del pasado', [['el tiempo que hará mañana', 'Eso es la meteorología.'], ['los climas de los videojuegos', 'No.']], 'Se leen en los testigos de hielo, los sedimentos y los corales.'],
    ['¿Qué hay en un testigo de hielo de la Antártida?', 'antiguas burbujas de aire que conservan la composición de la atmósfera del pasado', [['petróleo', 'En el hielo, no.'], ['fósiles de dinosaurios', 'El hielo más antiguo tiene unos 800 000 años, mucho después de ellos.']], 'En ellas se miden el CO₂ y los isótopos del oxígeno.'],
    ['La «zona crítica» es…', 'la fina capa de la Tierra entre la copa de los árboles y las aguas subterráneas', [['el núcleo de la Tierra', 'Demasiado profundo.'], ['la zona peligrosa alrededor de un volcán', 'No, es un término científico preciso.']], 'Suelo, roca alterada, agua y vida: de ahí salen nuestros recursos.'],
    ['Una cuenca sedimentaria es…', 'una zona donde los sedimentos se acumulan en capas durante millones de años', [['una piscina', 'No.'], ['un volcán apagado', 'No, es una depresión que se va llenando.']], 'Puede contener agua subterránea, sal, carbón, petróleo, gas… y un registro de los climas pasados.'],
    ['¿Qué edad tiene la Tierra?', 'unos 4500 millones de años', [['unos 6000 años', 'Las rocas datadas dicen muchísimo más.'], ['unos 45 millones de años', 'Faltan dos ceros.']], 'Datación radiométrica de meteoritos: 4540 millones de años.'],
    ['La montaña más alta conocida del sistema solar, el Olympus Mons, está en…', 'Marte', [['la Luna', 'No.'], ['la Tierra', 'El Everest no llega a 9 km; el Olympus Mons pasa de 20.']], 'Es un volcán en escudo gigante.'],
    ['¿En qué cráter marciano se posó el rover Perseverance en 2021?', 'Jezero, un antiguo lago', [['Gale', 'Ese es el cráter de Curiosity (2012).'], ['Copérnico', 'Ese es un cráter de la Luna.']], 'Un antiguo delta de río: ideal para buscar señales de vida pasada.'],
    ['¿Cómo sabemos que hubo agua líquida en Marte?', 'por los valles, los deltas y minerales que se forman en el agua', [['alguien la probó', 'No.'], ['porque Marte es rojo', 'El rojo viene del óxido.']], 'Las arcillas y los sulfatos se forman en presencia de agua.'],
    ['La teoría que explica terremotos, volcanes y montañas en la Tierra es…', 'la tectónica de placas', [['la teoría del big bang', 'Esa trata del Universo.'], ['la gravedad de la Luna', 'Provoca las mareas, no las montañas.']], 'Las placas se mueven unos centímetros al año.'],
    ['¿Cómo se cree que se formó la Luna?', 'por un impacto gigante entre la joven Tierra y un cuerpo del tamaño de Marte', [['fue capturada por casualidad', 'Una idea antigua, hoy abandonada.'], ['salió de un volcán terrestre', 'No.']], 'Las rocas lunares del Apolo se parecen mucho al manto de la Tierra.'],
    ['¿Por qué puede ser útil un geólogo en una misión espacial?', 'para elegir dónde posarse y qué muestras recoger', [['para pilotar el cohete', 'Eso es trabajo del piloto.'], ['para cocinar a bordo', 'No.']], 'Harrison Schmitt, geólogo, caminó por la Luna con el Apolo 17 (1972).']
  ];
})(window.MATIERES_LANGUES.es);
