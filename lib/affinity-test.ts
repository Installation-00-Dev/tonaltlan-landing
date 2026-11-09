export type RaceKey =
  | "Ton"
  | "Toh'kari"
  | "He'kari"
  | "Quinametzin"
  | "Lok'naa"
  | "Hualik"
  | "Irzak";

export interface User {
  name: string;
  email: string;
}

export interface Scores extends Record<RaceKey, number> {}

export interface Option {
  id: string;
  text: string;
  points: Partial<Scores>;
}

export interface Question {
  id: number;
  title: string;
  scenario: string;
  options: Option[];
}

export interface RaceResult {
  name: string;
  essence: string;
  virtue: string;
  shadow: string;
  path: string;
  symbol: string;
  object: string;
  glyph: string;
}

export interface RankedRace {
  race: RaceKey;
  score: number;
}

export interface CalculatedResults {
  dominant: RankedRace & { narrative: RaceResult };
  secondary: (RankedRace & { narrative: RaceResult }) | null;
  ranking: RankedRace[];
  sections: Array<{ title: string; content: string }>;
  symbols: Array<{ label: string; content: string }>;
}

export const RACE_KEYS: RaceKey[] = [
  "Ton",
  "Toh'kari",
  "He'kari",
  "Quinametzin",
  "Lok'naa",
  "Hualik",
  "Irzak",
];

export const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Balance factors tuned from live expo data to reduce repeated outcomes.
const RACE_BALANCE_WEIGHTS: Record<RaceKey, number> = {
  Ton: 0.88,
  "Toh'kari": 1.28,
  "He'kari": 0.95,
  Quinametzin: 0.82,
  "Lok'naa": 1.03,
  Hualik: 1.18,
  Irzak: 1.12,
};

export function createInitialScores(): Scores {
  return {
    Ton: 0,
    "Toh'kari": 0,
    "He'kari": 0,
    Quinametzin: 0,
    "Lok'naa": 0,
    Hualik: 0,
    Irzak: 0,
  };
}

export function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];

  for (let index = shuffled.length - 1; index > 0; index -= 1) {
    const randomIndex = Math.floor(Math.random() * (index + 1));
    [shuffled[index], shuffled[randomIndex]] = [shuffled[randomIndex], shuffled[index]];
  }

  return shuffled;
}

export const questions: Question[] = [
  {
    id: 1,
    title: "El Secreto del Compa",
    scenario:
      'Tu mejor compa te confía algo pesado: si lo sueltas, salvas a un chingo de gente, pero lo jodes a él. Te pide que no digas nada. Tu conciencia está como: "¿y ahora qué pedo?"',
    options: [
      {
        id: "q1-o1",
        text: "No puedo callar. La verdad debe salir, aunque pierda a mi compa.",
        points: { Ton: 3, Quinametzin: 2, "Lok'naa": 1 },
      },
      {
        id: "q1-o2",
        text: "Lo encaro directo. Que se haga responsable como debe ser.",
        points: { Irzak: 3, Ton: 2, Quinametzin: 1 },
      },
      {
        id: "q1-o3",
        text: "Busco una salida creativa. Debe haber forma de ayudar a todos sin chingar a nadie.",
        points: { "He'kari": 3, "Lok'naa": 2, Quinametzin: 1 },
      },
      {
        id: "q1-o4",
        text: "Me lo guardo por ahora, pero preparo todo por si se arma el desmadre.",
        points: { Hualik: 3, "He'kari": 2, "Lok'naa": 1 },
      },
    ],
  },
  {
    id: 2,
    title: "La Tradición que Jode",
    scenario:
      "Tu familia tiene una tradición bien antigua que todos respetan, pero está jodiendo a un grupo de personas. Cada vez que la ves, te duele el corazón. ¿Qué haces?",
    options: [
      {
        id: "q2-o1",
        text: "La mantengo, pero creo protecciones reales para quienes sufren.",
        points: { Quinametzin: 3, "Lok'naa": 2, Ton: 1 },
      },
      {
        id: "q2-o2",
        text: "La rompo ya. No espero permiso cuando hay gente sufriendo.",
        points: { "Toh'kari": 3, Irzak: 2, "He'kari": 1 },
      },
      {
        id: "q2-o3",
        text: "La adapto. Conservo lo chido, cambio lo que jode.",
        points: { "He'kari": 3, Quinametzin: 2, "Lok'naa": 1 },
      },
      {
        id: "q2-o4",
        text: "La quemo y empiezo de cero. Solo lo bueno se queda.",
        points: { Irzak: 3, Ton: 2, Quinametzin: 1 },
      },
    ],
  },
  {
    id: 3,
    title: "El Jefe que se Rajó",
    scenario:
      "Tu jefe, el que todos respetan, se rajó en algo importante para salvarse el culo. Tú lo viste. Si lo delatas, se arma un pedote. Pero la mentira te come por dentro.",
    options: [
      {
        id: "q3-o1",
        text: "Lo delato con pruebas. La verdad es la verdad, aunque se arme el desmadre.",
        points: { Ton: 3, Quinametzin: 2, "He'kari": 1 },
      },
      {
        id: "q3-o2",
        text: "Lo encaro en privado primero. Que arregle el pedo antes de que se sepa.",
        points: { Quinametzin: 3, "Lok'naa": 2, Ton: 1 },
      },
      {
        id: "q3-o3",
        text: "Me quedo callado y junto más info. Actúo cuando sea el momento perfecto.",
        points: { Hualik: 3, "He'kari": 2, Quinametzin: 1 },
      },
      {
        id: "q3-o4",
        text: "Lo encaro y exijo que confiese. Si se rajó, que lo diga de frente.",
        points: { Irzak: 3, Ton: 2, Quinametzin: 1 },
      },
    ],
  },
  {
    id: 4,
    title: "La Última Medicina",
    scenario:
      "Solo queda una medicina. Puedes salvar a un niño chiquito, a alguien importante que salvará a más después, o guardarla para ti. El tiempo se acaba. ¿Qué haces?",
    options: [
      {
        id: "q4-o1",
        text: "Se la doy al niño. No puedo dejar que se muera alguien tan indefenso.",
        points: { "Lok'naa": 3, Ton: 2, Quinametzin: 1 },
      },
      {
        id: "q4-o2",
        text: "Se la doy al importante. Es duro, pero salvará a más gente después.",
        points: { Quinametzin: 3, "He'kari": 2, Ton: 1 },
      },
      {
        id: "q4-o3",
        text: "Intento dividirla o encontrar forma de salvar a ambos.",
        points: { "He'kari": 3, "Lok'naa": 2, Ton: 1 },
      },
      {
        id: "q4-o4",
        text: "Me la guardo. Si yo caigo, nadie más podrá ayudar después.",
        points: { "Toh'kari": 3, Hualik: 2, "He'kari": 1 },
      },
    ],
  },
  {
    id: 5,
    title: "El Traidor en tu Cara",
    scenario:
      "Alguien de tu grupo te traicionó y por su culpa hubo pedo. Ahora está frente a ti. Todos te ven esperando tu decisión.",
    options: [
      {
        id: "q5-o1",
        text: "Lo juzgo según las reglas. Justicia clara, sin venganza.",
        points: { Quinametzin: 3, Ton: 2, Hualik: 1 },
      },
      {
        id: "q5-o2",
        text: "Lo encaro directo. Que repare con valentía o que asuma las consecuencias.",
        points: { Irzak: 3, Quinametzin: 2, Ton: 1 },
      },
      {
        id: "q5-o3",
        text: "Busco rehabilitarlo. Puedo ayudar a arreglar sin destruir a la persona.",
        points: { "Lok'naa": 3, Quinametzin: 2, Ton: 1 },
      },
      {
        id: "q5-o4",
        text: "Lo convierto en recurso útil. Que pague sirviendo en secreto.",
        points: { Hualik: 3, "He'kari": 2, "Toh'kari": 1 },
      },
    ],
  },
  {
    id: 6,
    title: "Se Arma el Desmadre",
    scenario:
      "Estás en un lugar público cuando de repente se arma un desmadre: gritos, gente corriendo, pánico. No sabes qué pedo, pero el peligro es real. ¿Qué haces?",
    options: [
      {
        id: "q6-o1",
        text: "Me convierto en escudo. Protejo a quienes no pueden correr.",
        points: { Quinametzin: 3, Ton: 2, "Lok'naa": 1 },
      },
      {
        id: "q6-o2",
        text: "Calmo a la gente. Bajo la tensión antes de que alguien salga lastimado.",
        points: { "Lok'naa": 3, Quinametzin: 2, Ton: 1 },
      },
      {
        id: "q6-o3",
        text: "Me muevo a un punto estratégico y coordino una salida segura.",
        points: { "He'kari": 3, Hualik: 2, Quinametzin: 1 },
      },
      {
        id: "q6-o4",
        text: "Me lanzo al origen del pedo. Corto el peligro de raíz.",
        points: { "Toh'kari": 3, Irzak: 2, Hualik: 1 },
      },
    ],
  },
  {
    id: 7,
    title: "Te Echan la Culpa",
    scenario:
      "Te echan la culpa de algo que no hiciste y la gente empieza a creerlo. Las miradas se ponen culeras. La mentira se propaga rápido.",
    options: [
      {
        id: "q7-o1",
        text: "Hablo claro. Digo la verdad completa, sin rodeos.",
        points: { Ton: 3, Quinametzin: 2, Irzak: 1 },
      },
      {
        id: "q7-o2",
        text: "Reencuadro la situación con palabras. Giro la escena y gano tiempo.",
        points: { "He'kari": 3, Hualik: 2, "Lok'naa": 1 },
      },
      {
        id: "q7-o3",
        text: "Me retiro con calma. No peleo donde ya me juzgaron sin pruebas.",
        points: { Hualik: 3, Quinametzin: 2, "He'kari": 1 },
      },
      {
        id: "q7-o4",
        text: "Marco límites de frente. No me quedo callado ni cedo mi lugar.",
        points: { Irzak: 3, "Toh'kari": 2, Ton: 1 },
      },
    ],
  },
  {
    id: 8,
    title: "Todo se Va a la Chingada",
    scenario:
      "Llevas meses planeando algo y en el último segundo todo se va a la chingada. El plan falla. Todos te ven esperando que hagas algo.",
    options: [
      {
        id: "q8-o1",
        text: "Organizo inmediatamente. Asigno roles, pongo orden. Primero estabilidad.",
        points: { Quinametzin: 3, Ton: 2, "Lok'naa": 1 },
      },
      {
        id: "q8-o2",
        text: "Cambio de plan sobre la marcha. Improviso algo nuevo rápido.",
        points: { "He'kari": 3, "Toh'kari": 2, "Lok'naa": 1 },
      },
      {
        id: "q8-o3",
        text: "Primero calmo al grupo. Bajo la tensión antes de decidir.",
        points: { "Lok'naa": 3, Quinametzin: 2, Ton: 1 },
      },
      {
        id: "q8-o4",
        text: "Asumo el mando sin excusas. Lo enfrento de frente.",
        points: { Irzak: 3, Ton: 2, Quinametzin: 1 },
      },
    ],
  },
  {
    id: 9,
    title: "Tu Talismán del Viaje",
    scenario:
      "Antes de partir a un viaje, un viejito te ofrece elegir un talismán mágico. ¿Cuál agarras?",
    options: [
      {
        id: "q9-o1",
        text: "Un medallón que vibra cuando intentas mentirte a ti mismo.",
        points: { Ton: 3, Quinametzin: 2, "Lok'naa": 1 },
      },
      {
        id: "q9-o2",
        text: "Una moneda que nunca cae igual dos veces.",
        points: { "Toh'kari": 3, "He'kari": 2, Hualik: 1 },
      },
      {
        id: "q9-o3",
        text: "Una brújula que apunta a lo que más necesitas aprender.",
        points: { "He'kari": 3, "Lok'naa": 2, Ton: 1 },
      },
      {
        id: "q9-o4",
        text: "Una piedra que se pone pesada cuando hay peligro cerca.",
        points: { Quinametzin: 3, Hualik: 2, Ton: 1 },
      },
      {
        id: "q9-o5",
        text: "Un anillo que se calienta cuando rompes una promesa.",
        points: { Irzak: 3, Ton: 2, Quinametzin: 1 },
      },
    ],
  },
  {
    id: 10,
    title: "Tu Forma de Resetear",
    scenario:
      "Después de un pedo fuerte, ¿qué haces primero para volver a la normalidad?",
    options: [
      {
        id: "q10-o1",
        text: "Hablo claro y cierro el tema con verdad.",
        points: { Ton: 3, Quinametzin: 2, "Lok'naa": 1 },
      },
      {
        id: "q10-o2",
        text: "Me muevo. Cambio de lugar, respiro aire nuevo. Regreso distinto.",
        points: { "He'kari": 3, "Toh'kari": 2, "Lok'naa": 1 },
      },
      {
        id: "q10-o3",
        text: "Reordeno. Organizo hábitos, tareas, algo tangible que me estabilice.",
        points: { Quinametzin: 3, Ton: 2, Hualik: 1 },
      },
      {
        id: "q10-o4",
        text: "Desaparezco un rato. Silencio, distancia. Recalculo todo en soledad.",
        points: { Hualik: 3, "Lok'naa": 2, "He'kari": 1 },
      },
      {
        id: "q10-o5",
        text: "Hago algo físico e intenso. Convierto lo vivido en fuerza.",
        points: { Irzak: 3, "Toh'kari": 2, Quinametzin: 1 },
      },
    ],
  },
];

export const raceResults: Record<RaceKey, RaceResult> = {
  Ton: {
    name: "TON (Luz) - El Iluminador",
    essence:
      "Eres la verdad que no puede ocultarse, la luz que revela sin querer. Eres uno de menos de 100 Ton en todo Tonaltlan - tu existencia es legendaria. Vives siglos, eres una biblioteca viviente de memoria y sabiduría. Tu existencia misma es un faro moral: no puedes mentir, no puedes engañar, no puedes callar cuando ves injusticia. Tu claridad es tanto tu virtud como tu vulnerabilidad.",
    virtue:
      "Tu columna moral absoluta. Eres el que ilumina el camino de otros, el que protege sin esperar recompensa, el que corrige injusticias porque no puede ignorarlas. Tu luz consume sentimientos densos y rencores, dejando solo claridad y propósito.",
    shadow:
      'Tu mayor terror no es la muerte, sino corromperte u oscurecerte. Temes convertirte en un "sol que quema en vez de calentar". Tu sinceridad te vuelve vulnerable: no puedes guardar secretos estratégicos, y a veces la verdad que revelas puede destruir relaciones o causar guerras.',
    path:
      "Tu ritual es existir con pureza intencional. No necesitas rezar: cada acto bondadoso honra a Tonatli. Tu rol es ser el guía ético, el que revela verdades aunque duelan, el que protege el orden moral del mundo. Acepta que tu exposición total es tu poder y tu herida.",
    symbol: "El Amanecer - El momento en que la luz retorna y el mundo se revela.",
    object: "Un espejo que refleja la verdad sin distorsión.",
    glyph: "Sol con rayos que iluminan en todas las direcciones.",
  },
  "Toh'kari": {
    name: "TOH'KARI (Rayo) - El Caótico",
    essence:
      "Eres la tormenta sin control, el impulso que no se detiene. Vives entre el deseo de destruir y la necesidad de sobrevivir. Tu rayo interior es una bestia que debes dominar lo suficiente para no morir... y usarlo antes de que te consuma.",
    virtue:
      "Tu intensidad imparable. Cuando te enfocas en algo, no hay duda, no hay miedo, no hay vacilación: solo acción directa. Eres capaz de ejecutar lo que otros ni siquiera se atreverían a pensar. Tu fuerza es brutal pero honesta.",
    shadow:
      'Tu tendencia al impulso y la violencia puede destruirte tanto como a los que te rodean. El rayo que liberas también te quema por dentro. Temes convertirte en un relámpago que cae sin querer, en destrucción sin sentido. Tu conflicto eterno: "¿Puedo contenerme... o voy a destruirlo todo otra vez?"',
    path:
      "Tu ritual es la supervivencia diaria. No hay vida cotidiana para ti: hay movimiento errático, impaciencia y soledad profunda. Tu rol es ser el exiliado salvaje que sobrevive en un mundo que te teme. Aprende a decidir cuando NO destruir: ese es tu verdadero conflicto moral.",
    symbol:
      "El Relámpago que Cae Sobre Una Montaña Solitaria - Brutal, impredecible, hermoso y aterrador.",
    object: "Un fragmento de metal que conserva carga eléctrica.",
    glyph: "Rayo zigzagueante que nunca toca el mismo lugar dos veces.",
  },
  "He'kari": {
    name: "HE'KARI (Aire) - El Visionario",
    essence:
      "Eres la mente que vuela, la idea que viaja, la palabra que transforma. Observas desde arriba, ves patrones donde otros ven caos, percibes a larga distancia. Eres el soñador práctico: inspiras, conectas, interpretas, y llevas conocimiento de un lugar a otro.",
    virtue:
      "Tu libertad creativa y tu inspiración constante. Ves soluciones donde otros ven problemas, encuentras caminos hasta en el viento. Eres maestro de la expresión, del arte y de la palabra. Tu perspectiva elevada te permite ver el panorama completo.",
    shadow:
      'Tu dispersión y desconexión. Puedes ser inconstante, distraído, difícil de "aterrizar". Te pierdes en posibilidades infinitas y puedes parecer frío o ausente cuando estás "arriba" con tu mente. Tu conflicto: volar libres vs. tu responsabilidad como mensajero.',
    path:
      'Tu ritual es el movimiento constante, el arte y la comunicación. Tu vida cotidiana es "aire en acción": ligera, inspirada, en movimiento. Tu rol es ser el mensajero, el guardián del conocimiento, el aliado diplomático. Equilibra tu necesidad de libertad con tu deber de guiar.',
    symbol: "La Pluma Suspendida - Ligera pero poderosa, símbolo de mensaje y vuelo.",
    object: "Un cuaderno de notas que siempre llevas contigo.",
    glyph: "Espiral de viento que se eleva hacia el cielo.",
  },
  Quinametzin: {
    name: "QUINAMETZIN (Tierra) - El Guardián Colosal",
    essence:
      'Eres la estabilidad absoluta: el pilar, la roca firme, el gigante amable que sostiene al mundo. Eres colosal (2.30m), imposible de pasar por alto, pero tu presencia calma en vez de intimidar. Eres protector nato, figura de guía y soporte emocional. Eres el "hogar" encarnado, la base sobre la que otros construyen.',
    virtue:
      "Tu honestidad e integridad inquebrantable. Tu Gema del Ánimo te delata siempre: no puedes mentir emocionalmente. La gema cambia de color según tu emoción: blanco para calma, amarillo para alegría, verde para armonía, azul para tristeza, rojo para amor o furia, negro para desesperación. Tu virtud es una honestidad profunda, transparente y llena de bondad. Eres el que construye, repara, protege y mantiene el orden natural.",
    shadow:
      "Tu carga del deber y auto-sacrificio. Puedes sentirte obligado a cargar con el mundo, incluso cuando ya no puedes más. Tu sentido del deber puede ahogarte. Si fallas en proteger a alguien, tu gema lo revela de inmediato... y esa culpa puede marcarte por siglos.",
    path:
      "Tu ritual es el trabajo constante, la construcción y el servicio comunitario. Levantas murallas, reparas caminos, construyes templos, entrenas jóvenes. Tu rol es sostener, aunque te desgastes. Aprende que también mereces ser apoyado: los pilares necesitan cimientos.",
    symbol: "La Montaña Antigua - Alta, firme, paciente y eterna. Testigo y protectora.",
    object: "Una herramienta de trabajo que siempre está contigo.",
    glyph: "Montaña con raíces profundas que se extienden hacia abajo.",
  },
  "Lok'naa": {
    name: "LOK'NAA (Agua) - El Sanador",
    essence:
      "Eres la calma después de la tormenta. Tu psicología es profundamente empática: sientes antes de actuar, lees el ambiente, te mueves como el agua misma fluyendo hacia donde hace falta armonía. Eres el que une, el que sana, el que preserva la vida.",
    virtue:
      'Tu empatía y capacidad de sanación. No solo entiendes el dolor ajeno: lo absorbes, lo transformas y lo devuelves como alivio. Puedes conectar emocionalmente con quien sea, incluso con razas que otros considerarían "enemigos". Tu presencia calma y restaura equilibrio.',
    shadow:
      'Tu evasión y auto-sacrificio. Tu misma empatía puede consumirte. Cuando sientes demasiado, te apagas, te derrites emocionalmente o huyes "como el agua buscando grietas". Temes convertirte en un mar sin orillas: absorber tanto dolor ajeno que dejas de ser tú mismo.',
    path:
      "Tu ritual es la hospitalidad, la artesanía fluida y los rituales de purificación. Baños sagrados, cantos que conservan memoria, alimentos que suavizan. Tu rol es desescalar, mediar, absorber el golpe. Aprende a poner límites: sanar sin romperte, fluir sin desaparecer.",
    symbol:
      "El Cenote Sagrado - Profundo, claro, portador de vida, pero también misterioso y oscuro en el fondo.",
    object: "Un recipiente de agua que siempre llevas contigo.",
    glyph: "Onda de agua que fluye en círculos concéntricos.",
  },
  Hualik: {
    name: "HUALIK (Obscuridad) - El Vigilante Sombra",
    essence:
      "Eres el que mira sin ser visto, el que escucha, el que entiende, el que aparece cuando nadie lo espera. Puedes desaparecer en cualquier sombra, moverte sin hacer sonido, ver en oscuridad total. Eres uno de decenas, no miles - tu existencia es un misterio incluso para otras razas. Tu identidad es estar fuera de la vista, pero siempre presente. Eres el observador silencioso, el vigilante de las verdades ocultas.",
    virtue:
      "Tu astucia y percepción profunda. Nada pasa desapercibido para ti. Eres inteligente, analítico, y puedes leer las intenciones detrás de las palabras. No te dejas engañar por luz, ruido o apariencias. Tu precisión es quirúrgica cuando actúas.",
    shadow:
      'Tu aislamiento y desconfianza. Rechazas el contacto social, incluso cuando podría beneficiarte. Ves traición en todas partes, incluso donde no la hay. Tu herida es simple: "No tenemos un lugar donde pertenecer." La soledad, aunque necesaria, es también tu condena.',
    path:
      'Tu ritual es el silencio, las rutinas precisas y la conducta cauta. Movimientos suaves, hábitos meticulosos, largas horas observando. Tu rol es saber sin exponerte, intervenir solo cuando es crítico. Tu conflicto eterno: "¿Me mantengo en la sombra... o actúo?"',
    symbol: "La Luna Nueva - Oscuridad total. No es ausencia, sino presencia invisible.",
    object: "Un objeto pequeño que siempre está en tus manos (piedra, moneda, etc.)",
    glyph: "Sombra que se extiende sin forma definida.",
  },
  Irzak: {
    name: "IRZAK (Fuego) - La Flama de Honor",
    essence:
      "Eres la pasión que arde sin control, el honor que no se doblega, la intensidad que define cada momento. Tu chispa de Zilo debe arder con la mayor fuerza posible antes de regresar al ciclo eterno. Eres carismático, temperamental y brutalmente directo: no das rodeos, no suavizas verdades, no actúas con cobardía.",
    virtue:
      "Tu valentía y lealtad inquebrantable. Eres el que lucha con bravura, ama con entrega total y honra con devoción absoluta. Tu código de honor no admite dudas: no puedes traicionar, no puedes mentir cuando se trata de honor, no puedes actuar con cobardía. Eres una flama viviente que inspira respeto y temor.",
    shadow:
      "Tu temperamento y intensidad destructiva. Tu pasión puede convertirse en furia ciega. Tu orgullo puede quemar puentes. Tu intensidad emocional puede ser tan abrasadora que destruye relaciones o situaciones que podrían haberse salvado con más calma. El fuego que te define también puede consumirte a ti y a quienes te rodean.",
    path:
      "Tu ritual es el trabajo intenso, la forja y los rituales de fuego. Trabajas en el Volcán Eterno, experimentas con la energía de Zilo, vives cada momento con pasión. Tu búsqueda constante de alternativas al sacrificio cíclico te marca: quieres que todas las chispas ardan hasta el final, pero el deber pesa. Tu rol es arder con honor hasta el final, pero tu conflicto eterno es: ¿Debo arder libremente o cumplir con el deber del sacrificio? Busca alternativas, pero acepta que el peso del deber te marca.",
    symbol:
      "El Volcán Eterno - Fuerza contenida, poder que puede destruir o crear. Tu hogar, tu maestro, tu conexión directa con Zilo.",
    object:
      "Una herramienta de forja o un objeto que siempre llevas contigo que representa tu chispa.",
    glyph: "Llama que arde hacia arriba, intensa y constante.",
  },
};

import { questionsEn, raceResultsEn } from "./affinity-test.en";

type Idioma = "es" | "en";

/** Preguntas del Test en el idioma pedido (mismos ids y puntos en ambos). */
export function getQuestions(lang: Idioma = "es"): Question[] {
  return lang === "en" ? questionsEn : questions;
}

const ETIQUETAS: Record<Idioma, { secciones: [string, string, string, string]; simbolos: [string, string, string] }> = {
  es: { secciones: ["Esencia", "Virtud", "Sombra", "Camino"], simbolos: ["Símbolo Mítico", "Objeto Cotidiano", "Glifo"] },
  en: { secciones: ["Essence", "Virtue", "Shadow", "Path"], simbolos: ["Mythic Symbol", "Everyday Object", "Glyph"] },
};

export function prepareQuestionsForSession(source: Question[] = questions): Question[] {
  return shuffleArray(source).map((question) => ({
    ...question,
    options: shuffleArray(question.options),
  }));
}

export function applyOptionPoints(scores: Scores, option: Option, direction: 1 | -1): Scores {
  const nextScores: Scores = { ...scores };

  for (const [race, value] of Object.entries(option.points) as [RaceKey, number][]) {
    nextScores[race] += value * direction;
  }

  return nextScores;
}

export function calculateResults(scores: Scores, lang: Idioma = "es"): CalculatedResults {
  const narrativas = lang === "en" ? raceResultsEn : raceResults;
  const etiquetas = ETIQUETAS[lang];
  const weightedRanking = RACE_KEYS.map((race) => ({
    race,
    rawScore: scores[race],
    weightedScore: scores[race] * RACE_BALANCE_WEIGHTS[race],
  })).sort((left, right) => right.weightedScore - left.weightedScore);

  const ranking = weightedRanking.map((entry) => ({
    race: entry.race,
    score: entry.rawScore,
  }));

  const dominant = weightedRanking[0];
  const secondaryCandidate = weightedRanking[1];
  const secondary =
    secondaryCandidate && secondaryCandidate.weightedScore >= dominant.weightedScore * 0.6
      ? {
          race: secondaryCandidate.race,
          score: secondaryCandidate.rawScore,
          narrative: narrativas[secondaryCandidate.race],
        }
      : null;

  return {
    dominant: {
      race: dominant.race,
      score: dominant.rawScore,
      narrative: narrativas[dominant.race],
    },
    secondary,
    ranking,
    sections: [
      { title: etiquetas.secciones[0], content: narrativas[dominant.race].essence },
      { title: etiquetas.secciones[1], content: narrativas[dominant.race].virtue },
      { title: etiquetas.secciones[2], content: narrativas[dominant.race].shadow },
      { title: etiquetas.secciones[3], content: narrativas[dominant.race].path },
    ],
    symbols: [
      { label: etiquetas.simbolos[0], content: narrativas[dominant.race].symbol },
      { label: etiquetas.simbolos[1], content: narrativas[dominant.race].object },
      { label: etiquetas.simbolos[2], content: narrativas[dominant.race].glyph },
    ],
  };
}