/* ============================================================
   MOCK DATA — Spanish placeholder text for all compendium sections.
   Replace with real content when ready.
   ============================================================ */

export interface CompendiumEntry {
  name: string;
  slug: string;
  description: string;
  tags: string[];
  coverImageSrc?: string;
  coverImageAlt?: string;
  sections: { title: string; content: string }[];
}

// ── CLASES ──────────────────────────────────────────────────
export const clases: CompendiumEntry[] = [
  {
    name: "Brujo Catemaco",
    slug: "brujo-catemaco",
    description:
      "Los Catemacos son brujos artesanos originarios de las regiones pantanosas del reino de Tl’atl. Su poder no proviene de libros ni de pactos con entidades desconocidas, sino del vínculo espiritual que crean con un Ixip, un muñeco tonal tallado por sus propias manos y animado mediante un ritual ancestral.",
    tags: ["Invocador", "Multi-tonal", "rango"],
    coverImageSrc: "/preview/images/Brujo_Catemaco.jpg",
    coverImageAlt: "Brujo Catemaco junto a su Ixip en una cueva del reino de Tl'atl.",
    sections: [
      {
        title: "Descripcion",
        content:
          "Los Catemacos son brujos artesanos originarios de las regiones pantanosas del reino de Tl’atl. Su poder no proviene de libros ni de pactos con entidades desconocidas, sino del vínculo espiritual que crean con un Ixip, un muñeco tonal tallado por sus propias manos y animado mediante un ritual ancestral.\n\nA lo largo de su entrenamiento, el Catemaco comparte parte de su esencia con esta creación hasta despertar en ella una fuerza elemental latente. El Ixip se convierte entonces en un aliado vivo que canaliza la energía de los elementos y actúa como extensión de la voluntad de su creador.\n\nEn combate y en aventura, el Catemaco y su Ixip funcionan como una sola entidad: el brujo dirige y planifica mientras su creación ejecuta movimientos tonales. Para muchos pueblos son figuras misteriosas y temidas, mediadores entre los espíritus del pantano y el mundo mortal.",
      },
      {
        title: "Nota",
        content:
          "Ideal para jugadores que disfrutan pensar cada movimiento con anticipacion y controlar el campo de batalla a traves de un aliado magico.",
      },
    ],
  },
  {
    name: "Guerrero Otomi",
    slug: "guerrero-otomi",
    description:
      "Defensores de Zalan. Los Guerreros Otomi son la milicia de elite del norte de Tonaltlan y portadores del Punto Tonal de Tierra.",
    tags: ["Tanque", "cuerpo a cuerpo", "Tonal de Tierra"],
    coverImageSrc: "/preview/images/Otomi.jpg",
    coverImageAlt: "Guerrero Otomi con armadura pesada y estandarte de guerra en primera linea.",
    sections: [
      {
        title: "Descripcion",
        content:
          "Defensores de Zalan.\n\nLos Guerreros Otomi son la milicia de elite del norte de Tonaltlan y portadores del Punto Tonal de Tierra. Su proposito no es la gloria personal, sino mantener la linea de batalla y proteger a su pueblo sin retroceder. Donde un Otomi clava su estandarte, la batalla se sostiene.\n\nCubiertos con armaduras pesadas, portando chimallis geometricos y estandartes de guerra, los Otomi son la encarnacion de la resistencia. Su presencia en el campo de batalla convierte el caos en una formacion solida donde los aliados encuentran proteccion y los enemigos encuentran un muro imposible de romper.\n\nUn Otomi no corre hacia la batalla. La batalla llega a el.",
      },
      {
        title: "Nota",
        content:
          "Ideal para jugadores que disfrutan proteger a su equipo y liderar la linea de batalla, que se sienten atraidos por personajes resistentes capaces de absorber el dano mientras el resto del grupo combate con mayor seguridad. Esta clase resulta perfecta para quienes prefieren un estilo de combate frontal y dominante, donde su presencia define el lugar donde ocurre la pelea. Si te atrae la fantasia de convertirte en el escudo del grupo, sostener la formacion y ser el pilar sobre el que se apoya todo el equipo, el Guerrero Otomi es tu camino.",
      },
    ],
  },
  {
    name: "Mitotiani",
    slug: "mitotiani",
    description:
      "Danzante Tonal. Guerreros ritualistas que canalizan la energia del Tonal a traves de danzas sagradas.",
    tags: ["Movilidad", "Soporte", "Multi-Tonal"],
    coverImageSrc: "/preview/images/Mitotiani.jpg",
    coverImageAlt: "Mitotiani ejecutando una danza ritual sobre glifos tonales.",
    sections: [
      {
        title: "Descripcion",
        content:
          "Danzante Tonal.\n\nLos Mitotiani son guerreros ritualistas que canalizan la energia del Tonal a traves de danzas sagradas. Cada paso, cada giro y cada golpe de sus ayoyotes contra la tierra deja marcas de poder que se manifiestan como glifos rituales, alterando el campo de batalla y guiando la energia de los elementos.\n\nA diferencia de otros combatientes, el Mitotiani no depende de armas tradicionales. Su propio cuerpo es su instrumento de combate. Luchan unicamente con piernas y pies, ejecutando patadas, barridas y lanzamientos de dagas ocultas en sus ayoyotes. Durante la danza, sus manos permanecen inmoviles detras de la espalda, preservando el equilibrio y la pureza del ritual. Cualquier arma empunada romperia el ritmo de la danza y debilitaria su conexion con el Tonal.\n\nMediante sus danzas pueden fortalecer aliados, debilitar enemigos o transformar el terreno mismo en un escenario ritual donde el combate se convierte en una coreografia de poder elemental.\n\nUn Mitotiani no solo pelea. Convierte la batalla en un ritual.",
      },
      {
        title: "Nota",
        content:
          "Ideal para jugadores que disfrutan personajes rapidos y creativos que se mueven constantemente por el campo de batalla, usando su posicion y sus habilidades para alterar el ritmo del combate. Esta clase es perfecta para quienes prefieren un estilo de juego dinamico, donde la movilidad, el control del terreno y la coordinacion con el equipo son mas importantes que la fuerza bruta.",
      },
    ],
  },
  {
    name: "Tlapali",
    slug: "tlapali",
    description:
      "Portador de Sangre Tonal. Practicantes de un conocimiento ritual prohibido que manipula la sangre para debilitar y controlar.",
    tags: ["Controlador", "Debilitador", "Sellos de sangre"],
    coverImageSrc: "/preview/images/Tlapali.jpg",
    coverImageAlt: "Tlapali marcado con simbolos de sangre tonal en un ritual oscuro.",
    sections: [
      {
        title: "Descripcion",
        content:
          "Portador de Sangre Tonal.\n\nEl Tlapali es una figura casi mitica. Muchos en los reinos creen que esta disciplina desaparecio hace siglos en lo profundo de los Bosques Obscuros, pero la verdad es que aun existen unos pocos practicantes que custodian este conocimiento ritual prohibido.\n\nSu poder nace de una energia tonal unica, fruto de la union entre la Obscuridad y el Agua, que les permite manipular la sangre como un medio ritual para marcar enemigos, debilitar su esencia vital y alterar el destino del combate. Los Tlapali utilizan sellos de sangre que activan sobre sus objetivos, debilitandolos poco a poco mientras el enemigo queda atrapado en un ciclo de dolor, desgaste y control.\n\nDebido a su dominio sobre la sangre, los Tlapali son temidos y evitados por muchos. Cada uno porta un simbolo pintado con sangre en el rostro, senal de su vinculo con esta tradicion ancestral. Aunque la mayoria permanece aislada en los bosques, algunos abandonan su tierra para aventurarse en el mundo y demostrar que su arte no es solo destruccion, sino tambien poder y conocimiento.\n\nUn Tlapali no busca derrotar a su enemigo de inmediato. Lo marca y deja que la sangre haga su trabajo.",
      },
      {
        title: "Nota",
        content:
          "Esta clase es ideal para quienes prefieren manipular el flujo del combate, controlar a los enemigos y apoyar al grupo mediante efectos que reducen las capacidades del oponente. Tambien atraera a jugadores que disfrutan mecanicas unicas basadas en preparacion y activacion de habilidades, asi como a quienes se sienten atraidos por personajes oscuros, ritualistas y envueltos en un aura de misterio.",
      },
    ],
  },
];

// ── ESPECIES ────────────────────────────────────────────────
export const especies: CompendiumEntry[] = [
  {
    name: "He'kari",
    slug: "hekari",
    description: "Hijos de Heka. Descendientes de la diosa del viento, ágiles, expresivos y portadores de palabras que cambian el destino.",
    tags: ["Agilidad", "Social", "Viento"],
    coverImageSrc: "/preview/images/especie_Hekari.png",
    coverImageAlt: "He'kari de cabello ondulante y ojos verde jade en movimiento.",
    sections: [
      {
        title: "Descripcion",
        content:
          "Hijos de Heka.\n\nLos He'kari son descendientes de Heka, diosa del viento. Altos, esbeltos y de movimientos ligeros, parecen moverse con la misma fluidez que una corriente de aire. Su cabello rara vez permanece quieto y sus ojos verde jade reflejan una curiosidad constante por el mundo.\n\nEn Tonaltlan son conocidos como artistas, mensajeros, espías y guardianes del conocimiento, pues su voz y presencia poseen una cualidad casi hipnótica. Los He'kari creen que las palabras viajan como el viento, y que incluso el susurro más pequeño puede cambiar el destino del mundo.\n\nRasgos\n\nAfinidad con el Aire: los He'kari no necesitan respirar y son inmunes a gases o venenos inhalados.\n\nLigereza del Viento: su cuerpo está naturalmente adaptado a la agilidad y el movimiento.",
      },
      {
        title: "Nota",
        content:
          "Los He'kari destacan en estilos de juego enfocados en movilidad, exploración e interacción social, siendo una excelente opción para personajes ágiles, curiosos y expresivos.",
      },
    ],
  },
  {
    name: "Hualik",
    slug: "hualik",
    description: "Hijos de Calti. Descendientes de la diosa de la obscuridad y el silencio, raros y misteriosos habitantes de las sombras.",
    tags: ["Sigilo", "Estrategia", "Obscuridad"],
    sections: [
      {
        title: "Descripcion",
        content:
          "Hijos de Calti.\n\nLos Hualik son descendientes de Calti, diosa de la obscuridad y el silencio. Son una de las especies más raras y misteriosas de Tonaltlan, tan escasas que muchos creen que solo existen en leyendas.\n\nSu piel oscura absorbe la luz y su presencia parece apagar los sonidos del entorno. Completamente lampiños y de rasgos afilados, sus ojos blancos destacan incluso en la penumbra. Los Hualik se mueven con una quietud inquietante, como si fueran parte natural de las sombras mismas.\n\nNo forman reinos ni grandes sociedades. Prefieren vivir aislados en cuevas, ruinas o bosques profundos, observando el mundo desde la distancia. Muchos los conocen como los ojos de la noche, silenciosos testigos de los acontecimientos del continente.\n\nRasgos\n\nFusión con las Sombras: los Hualik pueden moverse y ocultarse en la oscuridad con una facilidad sobrenatural.\n\nVisión Nocturna Superior: pueden ver con gran claridad incluso en la oscuridad más profunda.",
      },
      {
        title: "Nota",
        content:
          "Los Hualik destacan en estilos de juego basados en sigilo, observación y estrategia, siendo una excelente elección para personajes que prefieren moverse desde las sombras y actuar cuando el momento es perfecto.",
      },
    ],
  },
  {
    name: "Irzak",
    slug: "irzak",
    description: "Hijos de Zilo. Originarios de la península volcánica de Xitl, orgullosos, intensos y guiados por un honor inquebrantable.",
    tags: ["Fuego", "Combate frontal", "Honor"],
    coverImageSrc: "/preview/images/especie_fuego.png",
    coverImageAlt: "Irzak de mirada ámbar y presencia ígnea forjado por la tierra volcánica.",
    sections: [
      {
        title: "Descripcion",
        content:
          "Hijos de Zilo.\n\nLos Irzak provienen de la península volcánica de Xitl, una tierra dominada por fuego, piedra ardiente y el constante rugido del Volcán Eterno. Forjados en este ambiente extremo, los Irzak son conocidos por su carácter intenso, su orgullo y su código de honor inquebrantable.\n\nCreen que cada alma es una chispa otorgada por Zilo, señor del fuego, y que su deber es arder con pasión durante toda su vida antes de regresar al gran brasero divino. Por ello viven con intensidad: luchan con valentía, aman con fuerza y honran a sus aliados con una lealtad absoluta.\n\nSus cuerpos reflejan el poder del volcán: piel en tonos terracota o bronce, ojos ámbar o rojos como brasas, y cabellos que parecen moverse como llamas vivas. Entre su pueblo, las barbas rojizas o cobrizas son símbolo de orgullo, fuerza y madurez.\n\nRasgos\n\nForjados en Llamas: los Irzak poseen una fuerte resistencia al fuego.\n\nChispa de Zilo: la energía del fuego vive dentro de ellos, permitiéndoles manifestar pequeñas llamas y canalizar el poder ígneo.",
      },
      {
        title: "Nota",
        content:
          "Los Irzak destacan en estilos de juego agresivos y directos, siendo una excelente elección para personajes que prefieren el combate frontal, la fuerza de voluntad y el poder del fuego. Son especialmente adecuados para clases marciales o personajes que canalizan energía elemental.",
      },
    ],
  },
  {
    name: "Lok'Naa",
    slug: "lok-naa",
    description: "Hijos de Lok. Descendientes del dios del agua, serenos, sabios y ligados a mares, cenotes y ríos.",
    tags: ["Soporte", "Exploración", "Agua"],
    sections: [
      {
        title: "Descripcion",
        content:
          "Hijos de Lok.\n\nLos Lok'Naa son descendientes de Lok, dios del agua, y llevan en su cuerpo la esencia de mares, cenotes y ríos de Tonaltlan. Su presencia transmite una calma profunda, como si el murmullo del agua los acompañara a donde quiera que vayan.\n\nSu piel presenta tonos acuosos que van desde azules suaves hasta verdes jade o turquesas profundas. Su cabello fluye constantemente como si estuviera sumergido, y sus ojos reflejan colores marinos que evocan la serenidad de las aguas tranquilas.\n\nLos Lok'Naa son conocidos por su naturaleza pacífica, su sabiduría emocional y su profunda conexión con el agua. A lo largo de Tonaltlan se les reconoce como sanadores, guardianes de cenotes y exploradores de las profundidades, capaces de moverse bajo el agua con una facilidad extraordinaria.\n\nRasgos\n\nAdaptación Acuática: los Lok'Naa pueden permanecer largos periodos bajo el agua sin necesidad de salir a respirar.\n\nPresencia Serena: su naturaleza calmada y empática les permite influir positivamente en quienes los rodean.",
      },
      {
        title: "Nota",
        content:
          "Los Lok'Naa destacan en estilos de juego enfocados en soporte, exploración y conexión con el agua, siendo una excelente elección para personajes que prefieren la calma, la sabiduría y la resiliencia sobre la confrontación directa.",
      },
    ],
  },
  {
    name: "Quinametzin",
    slug: "quinametzin",
    description: "Hijos de la Tzal. Descendientes de la diosa de la tierra, antiguos, nobles y pilares de su comunidad.",
    tags: ["Resistencia", "Protección", "Tierra"],
    sections: [
      {
        title: "Descripcion",
        content:
          "Hijos de la Tzal.\n\nLos Quinametzin son hijos de Tzal, diosa de la tierra, una de las especies más antiguas y nobles de Tonaltlan. De estatura colosal y complexión poderosa, su presencia impone respeto, pero su naturaleza es sorprendentemente serena y bondadosa. Allí donde un Quinametzin vive, suele convertirse en un pilar de la comunidad.\n\nSu piel tiene la textura de la piedra, con tonos que recuerdan al granito, la obsidiana o el jade. Con el paso de los años, pequeñas grietas aparecen en su superficie, formando un mapa natural que refleja las experiencias de su vida.\n\nCada Quinametzin nace con una gema incrustada en su cuerpo, una manifestación física de su espíritu. Esta gema cambia de color según sus emociones, revelando su estado interior y haciendo casi imposible que oculten sus verdaderos sentimientos.\n\nRasgos\n\nPiel Pétrea: la piel de los Quinametzin posee la dureza de la roca, otorgándoles una resistencia natural excepcional.\n\nGema del Ánimo: cada Quinametzin posee una gema que refleja sus emociones y fortalece su conexión con los demás.",
      },
      {
        title: "Nota",
        content:
          "Los Quinametzin destacan en estilos de juego enfocados en resistencia, protección y trabajo en equipo, siendo una excelente elección para personajes fuertes, protectores y profundamente leales a su comunidad.",
      },
    ],
  },
  {
    name: "Toh'kari",
    slug: "tohkari",
    description: "Hijos de Tohuí. Descendientes del dios de la destrucción y el rayo, impredecibles y cargados de energía.",
    tags: ["Rayo", "Volátil", "Nómada"],
    sections: [
      {
        title: "Descripcion",
        content:
          "Hijos de Tohuí.\n\nLos Toh'kari son descendientes de Tohuí, dios de la destrucción y el rayo. Su presencia es como la calma tensa antes de un relámpago, impredecible, peligrosa y cargada de energía. Son una de las especies más temidas y evitadas de Tonaltlan, conocidos por su naturaleza explosiva y su relación directa con el poder del rayo.\n\nSu piel grisácea parece cargada de electricidad estática, y las marcas en sus manos y antebrazos (como cicatrices de relámpagos) brillan cuando manipulan energía. Sus ojos ámbar intensos y su cabello erizado por la electricidad revelan la tormenta que habita dentro de ellos.\n\nLos Toh'kari no construyen imperios ni ciudades. Viven como nómadas o en pequeños grupos errantes, guiados por su impulso, su búsqueda de poder y la naturaleza indomable de la tormenta que los define.\n\nRasgos\n\nAfinidad con la Tormenta: los Toh'kari poseen una conexión natural con la energía eléctrica y pueden manipular pequeñas descargas.\n\nPercepción Eléctrica: son capaces de sentir corrientes de energía en el entorno, como tormentas cercanas o fuentes de poder mágico.",
      },
      {
        title: "Nota",
        content:
          "Los Toh'kari son una especie intensa y volátil, ideal para jugadores que disfrutan personajes impredecibles, impulsivos y difíciles de encasillar. Su fuerza está en su energía caótica y su naturaleza salvaje, lo que los convierte en personajes que suelen destacar por su presencia y su impacto en la historia.",
      },
    ],
  },
  {
    name: "Ton",
    slug: "ton",
    description: "Hijos de Tonatli. Portadores de la última chispa del sol, de aura luminosa y honestidad absoluta.",
    tags: ["Luz", "Sabiduría", "Honestidad"],
    sections: [
      {
        title: "Descripcion",
        content:
          "Hijos de Tonatli.\n\nLos Ton son descendientes de Tonatli, la diosa de la luz primordial. Son una especie extremadamente rara, mencionada en antiguos cantos y murales dorados como portadores de la última chispa del sol. Su presencia es inconfundible, su piel irradia una luz cálida y su aura ilumina el entorno como si llevaran un pequeño amanecer dentro de sí.\n\nRaza de luz\n\nSus cuerpos emiten un resplandor natural que se intensifica con sus emociones. Cuando sienten alegría, tristeza o ira, su luz puede volverse tan intensa que ilumina grandes distancias. Su cabello, de tonos dorados y anaranjados, es tan fuerte como la propia luz y no puede ser cortado ni destruido.\n\nRaza de luz\n\nLos Ton son conocidos por su honestidad absoluta, pues no pueden mentir. Muchos viven como sabios, protectores o guardianes del conocimiento, dedicando sus largas vidas a ayudar a otros pueblos y preservar la memoria del mundo.\n\nRasgos\n\nLuz Interior: los Ton emiten una luz natural que puede iluminar su entorno.\n\nSinceridad Absoluta: los Ton no pueden mentir, su naturaleza los obliga a ser completamente honestos.",
      },
      {
        title: "Nota",
        content:
          "Los Ton son una especie rara y legendaria, ideal para personajes sabios, protectores o figuras morales dentro de una historia. Su naturaleza luminosa y su sinceridad los convierte en individuos difíciles de ocultar, pero profundamente confiables y respetados.",
      },
    ],
  },
];

// ── BESTIARIO ───────────────────────────────────────────────
export const bestiario: CompendiumEntry[] = [
  {
    name: "Cipactli",
    slug: "cipactli",
    description: "El cocodrilo primordial cuyo cuerpo formo la tierra misma.",
    tags: ["Colosal", "Primordial", "Mictlan"],
    sections: [
      { title: "Descripcion", content: "Cipactli es la bestia primordial, un cocodrilo cosmico de proporciones inimaginables. Segun la leyenda, los dioses despedazaron su cuerpo para crear la tierra. Sus fragmentos aun deambulan por Tonaltlan como criaturas menores pero terribles." },
      { title: "Rasgos", content: "Armadura Natural: piel casi impenetrable. Fauces Primordiales: su mordida ignora la mayoria de resistencias. Regeneracion Antigua: se cura lentamente cada turno." },
      { title: "Notas", content: "Encuentro de nivel alto. Los fragmentos de Cipactli pueden servir como jefes de mazmorra o amenazas regionales en la campana." },
    ],
  },
  {
    name: "Tzitzimitl",
    slug: "tzitzimitl",
    description: "Demonios estelares que descienden durante los eclipses para devorar la luz.",
    tags: ["Celestial", "Demoniaco", "Elite"],
    sections: [
      { title: "Descripcion", content: "Los Tzitzimime son demonios estelares con forma de esqueletos adornados con estrellas. Habitan en las tinieblas entre las estrellas y descienden a la tierra durante los eclipses solares, intentando devorar al sol y sumir al mundo en oscuridad eterna." },
      { title: "Rasgos", content: "Aura de Eclipse: oscurece el area circundante. Garras Estelares: dano radiante y necrotico. Vuelo Celestial: vuelan con alas de oscuridad. Debilidad Solar: vulnerables a magia de fuego y luz." },
      { title: "Notas", content: "Enemigos tematicos perfectos para aventuras centradas en eclipses o amenazas cosmicas. Funcionan mejor en grupos." },
    ],
  },
  {
    name: "Nagual Salvaje",
    slug: "nagual-salvaje",
    description: "Cambiaformas corrompidos que han perdido su identidad humana.",
    tags: ["Bestia", "Corrupto", "Selva"],
    sections: [
      { title: "Descripcion", content: "Cuando un Nahual pierde el control de su transformacion, queda atrapado entre formas: ni humano ni animal, sino una abominacion retorcida. Los Naguales Salvajes vagan por las selvas, atacando a viajeros con una furia animal mezclada con astucia humana." },
      { title: "Rasgos", content: "Forma Inestable: cambia de tamano y capacidades aleatoriamente. Aullido Desgarrador: causa miedo. Resistencia Salvaje: dificil de derribar." },
      { title: "Notas", content: "Encuentro de nivel medio. Puede servir como gancho narrativo si un PNJ conocido se transforma en Nagual Salvaje." },
    ],
  },
  {
    name: "Xiuhcoatl",
    slug: "xiuhcoatl",
    description: "Serpiente de fuego que sirve como arma viviente de los dioses.",
    tags: ["Fuego", "Divino", "Legendario"],
    sections: [
      { title: "Descripcion", content: "La Xiuhcoatl es la serpiente de fuego turquesa, arma personal de Huitzilopochtli. Estas serpientes ardientes patrullan los templos mas sagrados y son invocadas por los sacerdotes mas poderosos como arma de ultimo recurso contra amenazas existenciales." },
      { title: "Rasgos", content: "Cuerpo Igneo: todo lo que la toca recibe dano de fuego. Aliento de Turquesa: cono de fuego devastador. Inmunidad al Fuego: completamente inmune. Debilidad Acuatica: vulnerable al agua y hielo." },
      { title: "Notas", content: "Criatura legendaria, encuentro de nivel muy alto o potencial aliado divino. Su presencia indica que los dioses mismos estan involucrados." },
    ],
  },
  {
    name: "Chaneque",
    slug: "chaneque",
    description: "Espiritus traviesos guardianes de bosques y manantiales.",
    tags: ["Hada", "Naturaleza", "Comun"],
    sections: [
      { title: "Descripcion", content: "Los Chaneques son espiritus pequenos y astutos que protegen los bosques, rios y cuevas de Tonaltlan. Disfrutan engañando a los viajeros, robando su 'tonalli' (sombra del alma) y dejandolos desorientados. Sin embargo, tambien pueden ser aliados valiosos si se les trata con respeto." },
      { title: "Rasgos", content: "Invisibilidad Forestal: desaparecen entre la vegetacion. Robo de Tonalli: pueden confundir y desorientar. Conocimiento del Bosque: saben todo lo que ocurre en su territorio." },
      { title: "Notas", content: "Encuentro de nivel bajo, perfecto para introducir a los jugadores al folklore mesoamericano. Pueden ser enemigos, aliados o simples elementos del entorno." },
    ],
  },
];

// ── MONTURAS ────────────────────────────────────────────────
export const monturas: CompendiumEntry[] = [
  {
    name: "Quetzalli",
    slug: "quetzalli",
    description: "Serpientes emplumadas menores que surcan los cielos con gracia divina.",
    tags: ["Voladora", "Divina", "Rara"],
    sections: [
      { title: "Descripcion", content: "Las Quetzalli son serpientes emplumadas de menor tamano que el gran Quetzalcoatl. Sus plumas iridiscentes brillan con los colores del arcoiris y pueden llevar a un jinete por los cielos. Son extremadamente raras y solo responden ante quienes poseen un Tonalli puro." },
      { title: "Rasgos", content: "Vuelo Majestuoso: velocidad de vuelo alta. Plumas Protectoras: otorgan resistencia magica al jinete. Gracia Divina: no provocan ataques de oportunidad al volar." },
      { title: "Notas", content: "La montura mas codiciada de Tonaltlan. Obtener una Quetzalli puede ser una mision epica en si misma." },
    ],
  },
  {
    name: "Tepeyollotl",
    slug: "tepeyollotl",
    description: "Jaguares montaneses gigantes con rugido que estremece la tierra.",
    tags: ["Terrestre", "Bestia", "Poco comun"],
    sections: [
      { title: "Descripcion", content: "Los Tepeyollotl son jaguares enormes que habitan las montanas mas altas de Tonaltlan. Su nombre significa 'Corazon de la Montana' y su rugido puede causar pequenos derrumbes. Son monturas terrestres de enorme poder." },
      { title: "Rasgos", content: "Rugido Sismico: aturde a enemigos cercanos. Trepar Montanas: se mueven por terreno vertical sin penalizacion. Vision Nocturna: perfecta para exploracion subterranea." },
      { title: "Notas", content: "Montura terrestre por excelencia. Excelente para campanas en montanas y cuevas." },
    ],
  },
  {
    name: "Acocil Ancestral",
    slug: "acocil-ancestral",
    description: "Crustaceos gigantes de los lagos antiguos, blindados y veloces en el agua.",
    tags: ["Acuatica", "Blindada", "Comun"],
    sections: [
      { title: "Descripcion", content: "Los Acociles Ancestrales son crustaceos gigantes que habitan los lagos y cenotes de Tonaltlan. Sus caparazones son casi tan duros como la obsidiana y pueden transportar jinetes a gran velocidad bajo el agua. Algunos pescadores los domestican." },
      { title: "Rasgos", content: "Respiracion Acuatica: permite al jinete respirar bajo el agua a traves de burbujas. Caparazon de Obsidiana: alta armadura natural. Pinzas de Combate: pueden atacar mientras transportan." },
      { title: "Notas", content: "La montura acuatica mas accesible. Perfecta para campanas en lagos, rios y cenotes." },
    ],
  },
];

// ── DEIDADES ────────────────────────────────────────────────
export const deidades: CompendiumEntry[] = [
  {
    name: "Quetzalcoatl",
    slug: "quetzalcoatl",
    description: "La Serpiente Emplumada, dios del viento, la sabiduria y la creacion.",
    tags: ["Creacion", "Sabiduria", "Viento"],
    sections: [
      { title: "Descripcion", content: "Quetzalcoatl, la Serpiente Emplumada, es uno de los dioses mas venerados de Tonaltlan. Senor del viento, la sabiduria y la estrella de la manana, se le atribuye la creacion de la humanidad a partir del maiz y los huesos de los ancestros. Sus templos son lugares de conocimiento y paz." },
      { title: "Rasgos", content: "Dominio del Viento: sus seguidores dominan magias de aire. Sabiduria Ancestral: otorga ventaja en pruebas de conocimiento. Estrella de la Manana: sus fieles ganan poder al amanecer." },
      { title: "Notas", content: "Deidad popular entre Nahuales, Tlamacazqui y personajes orientados al conocimiento. Su rivalidad con Tezcatlipoca es un eje narrativo central." },
    ],
  },
  {
    name: "Tezcatlipoca",
    slug: "tezcatlipoca",
    description: "El Espejo Humeante, dios de la noche, el destino y el conflicto.",
    tags: ["Destruccion", "Noche", "Destino"],
    sections: [
      { title: "Descripcion", content: "Tezcatlipoca, el Espejo Humeante, es el dios de la noche, la magia oscura y el cambio a traves del conflicto. Su espejo de obsidiana muestra verdades terribles y futuros posibles. Es tanto enemigo como aliado, pues cree que solo a traves de la lucha se fortalece el mundo." },
      { title: "Rasgos", content: "Espejo de Obsidiana: sus seguidores pueden ver visiones del futuro. Manto de Sombras: invisibilidad en la oscuridad. Pruebas del Destino: impone desafios a sus propios fieles para fortalecerlos." },
      { title: "Notas", content: "Deidad compleja, ni buena ni malvada. Ideal para personajes moralmente ambiguos. Los Guerreros Jaguar le son especialmente devotos." },
    ],
  },
  {
    name: "Mictlantecuhtli",
    slug: "mictlantecuhtli",
    description: "Senor del Mictlan, gobernante del inframundo y guardian de los muertos.",
    tags: ["Muerte", "Inframundo", "Equilibrio"],
    sections: [
      { title: "Descripcion", content: "Mictlantecuhtli reina sobre el Mictlan, el inframundo de Tonaltlan. No es un dios malvado sino un guardian necesario: recibe a las almas de los muertos y les concede descanso. Sus sacerdotes realizan ritos funerarios y pueden comunicarse con los espiritus." },
      { title: "Rasgos", content: "Dominio de la Muerte: control sobre espiritus y no-muertos. Juicio Final: puede evaluar la verdad en las palabras de cualquier ser. Paso Seguro: sus fieles pueden transitar por el Mictlan sin peligro." },
      { title: "Notas", content: "Deidad esencial para campanas que involucren el Mictlan. Las Cihuateteo suelen tener una conexion especial con el." },
    ],
  },
  {
    name: "Tlaloc",
    slug: "tlaloc",
    description: "Dios de la lluvia, los relampagos y la fertilidad de la tierra.",
    tags: ["Naturaleza", "Agua", "Creacion"],
    sections: [
      { title: "Descripcion", content: "Tlaloc es el senor de las lluvias y las tormentas. Su dominio sobre el agua lo convierte en una de las deidades mas importantes para la agricultura y la vida. Su paraiso, el Tlalocan, es un lugar de eterna primavera donde van quienes mueren por causas relacionadas con el agua." },
      { title: "Rasgos", content: "Control del Clima: sus seguidores manipulan el tiempo atmosferico. Relampago Divino: ataques electricos devastadores. Bendicion de Cosecha: curan y nutren la tierra." },
      { title: "Notas", content: "Deidad fundamental para los Tlalocan-i. Las campanas agricolas y los conflictos por recursos hidricos son su terreno narrativo natural." },
    ],
  },
  {
    name: "Xochiquetzal",
    slug: "xochiquetzal",
    description: "Diosa de las flores, el amor, las artes y la belleza.",
    tags: ["Arte", "Amor", "Creacion"],
    sections: [
      { title: "Descripcion", content: "Xochiquetzal es la diosa de la belleza, las flores, el amor y las artes. Patrona de los artesanos, poetas y amantes, su influencia se siente en cada festival y celebracion de Tonaltlan. Sus templos estan adornados con flores eternas y obras de arte vivientes." },
      { title: "Rasgos", content: "Encantamiento: sus seguidores pueden fascinar a otros. Arte Viviente: crean ilusiones hermosas con efectos reales. Sanacion Floral: curan a traves de esencias y flores magicas." },
      { title: "Notas", content: "Deidad perfecta para Pochtecas y personajes sociales. Su influencia suaviza conflictos y abre puertas diplomaticas." },
    ],
  },
  {
    name: "Huitzilopochtli",
    slug: "huitzilopochtli",
    description: "Dios de la guerra y el sol, protector feroz de Tonaltlan.",
    tags: ["Guerra", "Sol", "Destruccion"],
    sections: [
      { title: "Descripcion", content: "Huitzilopochtli es el dios del sol y la guerra, el protector supremo de Tonaltlan. Nacio listo para el combate y derroto a cuatrocientos enemigos en su primer aliento. Sus seguidores son los guerreros mas devotos, que luchan para mantener al sol en movimiento y evitar el fin del mundo." },
      { title: "Rasgos", content: "Furia Solar: ataques de fuego potenciados durante el dia. Voluntad Indomable: inmunidad al miedo. Sacrificio Guerrero: pueden sacrificar puntos de vida para potenciar ataques aliados." },
      { title: "Notas", content: "La deidad guerrera por excelencia. Los Guerreros Jaguar y Aguila le rinden culto. Perfecto para campanas centradas en grandes batallas." },
    ],
  },
];

// ── Section metadata for hub pages ──────────────────────────
export const sectionsMeta = [
  { title: "Clases",    slug: "clases",    description: "Arquetipos de heroes y villanos del mundo mesoamericano.",    count: clases.length },
  { title: "Especies",  slug: "especies",  description: "Seres nacidos del maiz, la obsidiana y el aliento de los dioses.",  count: especies.length },
  { title: "Bestiario", slug: "bestiario", description: "Criaturas del Mictlan y bestias de selvas y montanas sagradas.",   count: bestiario.length },
  { title: "Monturas",  slug: "monturas",  description: "Compañeros leales que surcan cielos, rios y caminos ancestrales.",  count: monturas.length },
  { title: "Deidades",  slug: "deidades",  description: "Los dioses que tejen el destino del cosmos y sus elegidos.",        count: deidades.length },
  { title: "Galeria",   slug: "galeria",   description: "Arte conceptual, ilustraciones y vistazos al universo.",            count: 0 },
];
