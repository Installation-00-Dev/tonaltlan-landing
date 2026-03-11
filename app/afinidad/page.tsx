"use client";

import { useState } from "react";
import SectionHeader from "@/components/compendio/SectionHeader";

type AffinityRace = "Ton" | "Tohkari" | "Hekari" | "Quinametzin" | "Loknaa" | "Hualik" | "Irzak";

type ScoreMap = Partial<Record<AffinityRace, number>>;

interface AffinityOption {
  text: string;
  scores: ScoreMap;
}

interface AffinityQuestion {
  id: number;
  question: string;
  options: AffinityOption[];
}

const questions: AffinityQuestion[] = [
  {
    id: 1,
    question: "Tu mejor amigo te confia un secreto que, si revelas, salva a muchos pero destruye su vida. Sus ojos piden silencio, pero tu conciencia grita. ¿Que haces?",
    options: [
      {
        text: "No puedo callar. La verdad debe salir, aunque pierda a quien amo.",
        scores: { Ton: 3, Quinametzin: 2, Loknaa: 1 },
      },
      {
        text: "Lo enfrento directamente. Que asuma las consecuencias con dignidad.",
        scores: { Irzak: 3, Ton: 2, Quinametzin: 1 },
      },
      {
        text: "Busco una tercera opcion. Debe haber una forma de proteger a todos sin traicionar.",
        scores: { Hekari: 3, Loknaa: 2, Quinametzin: 1 },
      },
      {
        text: "Guardo el secreto, pero preparo un plan B por si todo explota.",
        scores: { Hualik: 3, Hekari: 2, Loknaa: 1 },
      },
    ],
  },
  {
    id: 2,
    question: "Un ritual sagrado mantiene unida a tu comunidad, pero esta lastimando a otros. Sus lagrimas te rompen el corazon cada vez que ves el ritual. ¿Que haces?",
    options: [
      {
        text: "Mantengo la tradicion, pero creo protecciones reales para quienes sufren.",
        scores: { Quinametzin: 3, Loknaa: 2, Ton: 1 },
      },
      {
        text: "La rompo ahora mismo. No espero permiso cuando hay personas sufriendo.",
        scores: { Tohkari: 3, Irzak: 2, Hekari: 1 },
      },
      {
        text: "La transformo cuidadosamente. Preservo lo esencial, cambio lo danino.",
        scores: { Hekari: 3, Quinametzin: 2, Loknaa: 1 },
      },
      {
        text: "Quemo todos los registros del ritual y creo algo nuevo. Solo lo puro merece permanecer.",
        scores: { Irzak: 3, Ton: 2, Quinametzin: 1 },
      },
    ],
  },
  {
    id: 3,
    question: "Un lider querido rompio un juramento sagrado para salvarse. Si lo expones, la comunidad podria destruirse, pero la mentira te quema por dentro. ¿Que haces?",
    options: [
      {
        text: "Lo expongo publicamente con pruebas. La verdad sostiene el mundo, aunque duela.",
        scores: { Ton: 3, Quinametzin: 2, Hekari: 1 },
      },
      {
        text: "Lo confronto en privado primero. Que repare el dano antes de que se vuelva publico.",
        scores: { Quinametzin: 3, Loknaa: 2, Ton: 1 },
      },
      {
        text: "Observo y reuno informacion. Actuare cuando sea el momento perfecto.",
        scores: { Hualik: 3, Hekari: 2, Quinametzin: 1 },
      },
      {
        text: "Lo enfrento y exijo que confiese publicamente. Palabra rota se paga con honor.",
        scores: { Irzak: 3, Ton: 2, Quinametzin: 1 },
      },
    ],
  },
  {
    id: 4,
    question: "Solo queda una pocion de curacion que puede salvar a un nino pequeno, a un lider que salvara a muchos despues, o guardarla para ti. El tiempo se agota. ¿Que haces?",
    options: [
      {
        text: "Se la doy al nino. No puedo dejar que muera alguien con toda una vida por delante.",
        scores: { Loknaa: 3, Ton: 2, Quinametzin: 1 },
      },
      {
        text: "Se la doy al lider. Es duro, pero salvara a mas personas.",
        scores: { Quinametzin: 3, Hekari: 2, Ton: 1 },
      },
      {
        text: "Intento dividirla o encontrar una forma de salvar a ambos.",
        scores: { Hekari: 3, Loknaa: 2, Ton: 1 },
      },
      {
        text: "La guardo. Si yo caigo, nadie mas podra ayudar manana.",
        scores: { Tohkari: 3, Hualik: 2, Hekari: 1 },
      },
    ],
  },
  {
    id: 5,
    question: "Alguien del grupo traiciono tu confianza y por su culpa personas resultaron heridas. Ahora esta frente a ti. El grupo observa. ¿Que haces?",
    options: [
      {
        text: "Lo juzgo segun las reglas. Justicia clara, sin venganza.",
        scores: { Quinametzin: 3, Ton: 2, Hualik: 1 },
      },
      {
        text: "Lo enfrento directamente. Que repare con valentia o asuma consecuencias.",
        scores: { Irzak: 3, Quinametzin: 2, Ton: 1 },
      },
      {
        text: "Busco rehabilitarlo. Puedo ayudar a reparar sin destruir a la persona.",
        scores: { Loknaa: 3, Quinametzin: 2, Ton: 1 },
      },
      {
        text: "Lo convierto en recurso util. Que pague sirviendo en secreto.",
        scores: { Hualik: 3, Hekari: 2, Tohkari: 1 },
      },
    ],
  },
  {
    id: 6,
    question: "Te ofrecen detener la guerra a cambio de un favor futuro desconocido y silencio absoluto. Se salvarian cientos de vidas, pero perderias tu libertad. ¿Que haces?",
    options: [
      {
        text: "Rechazo y lo denuncio. Paz con cadenas no es paz verdadera.",
        scores: { Ton: 3, Quinametzin: 2, Hekari: 1 },
      },
      {
        text: "Acepto, pero tengo un plan. Salvo vidas hoy sin regalar mi futuro.",
        scores: { Hekari: 3, Loknaa: 2, Hualik: 1 },
      },
      {
        text: "Acepto. Proteger vidas ahora es lo mas importante.",
        scores: { Loknaa: 3, Quinametzin: 2, Hualik: 1 },
      },
      {
        text: "Solo acepto con juramento cara a cara. Si hay manipulacion, lo rompo.",
        scores: { Irzak: 3, Ton: 2, Quinametzin: 1 },
      },
    ],
  },
  {
    id: 7,
    question: "Solo puedes salvar a uno: la persona que mas amas o un grupo de desconocidos. El tiempo se agota. ¿A quien salvas?",
    options: [
      {
        text: "Salvo al grupo. El bien colectivo esta por encima de mis sentimientos.",
        scores: { Quinametzin: 3, Ton: 2, Loknaa: 1 },
      },
      {
        text: "Salvo a quien amo. La lealtad real no necesita justificarse.",
        scores: { Loknaa: 3, Irzak: 2, Quinametzin: 1 },
      },
      {
        text: "Me posiciono estrategicamente y coordino para maximizar la supervivencia.",
        scores: { Hualik: 3, Hekari: 2, Quinametzin: 1 },
      },
      {
        text: "Decido en un instante y actuo. Elijo el camino mas directo.",
        scores: { Tohkari: 3, Irzak: 2, Ton: 1 },
      },
    ],
  },
  {
    id: 8,
    question: "Encuentras informacion que podria curar enfermedades incurables o crear armas destructivas. El conocimiento pesa como una espada de doble filo. ¿Que haces?",
    options: [
      {
        text: "Lo entrego a una autoridad responsable para decidir con transparencia.",
        scores: { Ton: 3, Quinametzin: 2, Hekari: 1 },
      },
      {
        text: "Lo guardo y estudio en secreto. Solo extrare lo seguro.",
        scores: { Hualik: 3, Hekari: 2, Ton: 1 },
      },
      {
        text: "Lo comparto con un circulo pequeno. Juntos crearemos una solucion segura.",
        scores: { Hekari: 3, Loknaa: 2, Ton: 1 },
      },
      {
        text: "Me quedo con lo aprendido, y si llega a aplicarse sera con limites claros asumiendo las consecuencias.",
        scores: { Irzak: 3, Quinametzin: 2, Ton: 1 },
      },
    ],
  },
  {
    id: 9,
    question: "En publico estalla violencia repentina: gritos, gente corriendo, panico. No sabes que pasa, pero el peligro es real. Debes actuar ahora.",
    options: [
      {
        text: "Protejo a quienes no pueden correr.",
        scores: { Quinametzin: 3, Ton: 2, Loknaa: 1 },
      },
      {
        text: "Calmo a la multitud. Bajo la tension antes de que alguien salga lastimado.",
        scores: { Loknaa: 3, Quinametzin: 2, Ton: 1 },
      },
      {
        text: "Busco un punto estrategico y planeo coordinar una salida segura.",
        scores: { Hekari: 3, Hualik: 2, Quinametzin: 1 },
      },
      {
        text: "Voy directo hacia el origen del caos. Corto el peligro de raiz.",
        scores: { Tohkari: 3, Irzak: 2, Hualik: 1 },
      },
    ],
  },
  {
    id: 10,
    question: "Te acusan publicamente de algo que no hiciste. La multitud murmura, las miradas se vuelven hostiles. La mentira se propaga rapido. ¿Como respondes?",
    options: [
      {
        text: "Hablo con claridad absoluta. Expongo la verdad completa, sin adornos.",
        scores: { Ton: 3, Quinametzin: 2, Irzak: 1 },
      },
      {
        text: "Cuido lo que digo y como lo digo. Cambio el enfoque, bajo la tension y gano tiempo.",
        scores: { Hekari: 3, Hualik: 2, Loknaa: 1 },
      },
      {
        text: "Me retiro con calma. No peleo donde ya me juzgaron sin pruebas.",
        scores: { Hualik: 3, Quinametzin: 2, Hekari: 1 },
      },
      {
        text: "Marco limites de frente. No cedo mi lugar.",
        scores: { Irzak: 3, Tohkari: 2, Ton: 1 },
      },
    ],
  },
  {
    id: 11,
    question: "Tras meses de planear, todo falla en el ultimo segundo. El plan se derrumba. Todos te miran esperando direccion.",
    options: [
      {
        text: "Organizo inmediatamente. Asigno roles y prioridades. Primero estabilidad.",
        scores: { Quinametzin: 3, Ton: 2, Loknaa: 1 },
      },
      {
        text: "Cambio de enfoque. Improviso un plan nuevo sobre la marcha.",
        scores: { Hekari: 3, Tohkari: 2, Loknaa: 1 },
      },
      {
        text: "Primero calmo al grupo. Bajo la tension emocional antes de decidir.",
        scores: { Loknaa: 3, Quinametzin: 2, Ton: 1 },
      },
      {
        text: "Asumo el mando sin excusas. Lo enfrento de frente.",
        scores: { Irzak: 3, Ton: 2, Quinametzin: 1 },
      },
    ],
  },
  {
    id: 12,
    question: "De noche, en una calle oscura, sientes que alguien te sigue. No sabes si es real o paranoia. ¿Que haces?",
    options: [
      {
        text: "Voy a un lugar publico y pido ayuda abiertamente.",
        scores: { Ton: 3, Quinametzin: 2, Loknaa: 1 },
      },
      {
        text: "Me fundo en las sombras y observo. Decido cuando actuar.",
        scores: { Hualik: 3, Hekari: 2, Tohkari: 1 },
      },
      {
        text: "Cambio de ruta creativamente. Uso atajos para perderlo.",
        scores: { Hekari: 3, Hualik: 2, Loknaa: 1 },
      },
      {
        text: "Me doy la vuelta y lo confronto. Prefiero verdad peligrosa que duda.",
        scores: { Irzak: 3, Tohkari: 2, Ton: 1 },
      },
    ],
  },
  {
    id: 13,
    question: "El puente por el que cruzan empieza a colapsar mientras la gente corre. Gritos de panico. Debes actuar ahora.",
    options: [
      {
        text: "Me convierto en ancla. Me planto y estabilizo para que otros pasen primero.",
        scores: { Quinametzin: 3, Ton: 2, Loknaa: 1 },
      },
      {
        text: "Grito instrucciones claras. Redirijo el flujo con calma.",
        scores: { Loknaa: 3, Quinametzin: 2, Hekari: 1 },
      },
      {
        text: "Busco un punto alto y coordino las rutas de rescate.",
        scores: { Hekari: 3, Hualik: 2, Quinametzin: 1 },
      },
      {
        text: "Me muevo a toda velocidad. Saco gente sin pausa, solo actuar.",
        scores: { Tohkari: 3, Irzak: 2, Hekari: 1 },
      },
    ],
  },
  {
    id: 14,
    question: "Alguien de tu equipo roba algo critico y huye cuando mas lo necesitan. La traicion duele. ¿Que haces?",
    options: [
      {
        text: "Aseguro a los mios primero. Despues lo enfrentamos juntos con orden.",
        scores: { Quinametzin: 3, Ton: 2, Loknaa: 1 },
      },
      {
        text: "Lo rastreo en silencio. Cuando lo encuentre, tendre ventaja.",
        scores: { Hualik: 3, Hekari: 2, Quinametzin: 1 },
      },
      {
        text: "Lo persigo ya. No se escapa. No permito que la traicion quede impune.",
        scores: { Tohkari: 3, Irzak: 2, Hekari: 1 },
      },
      {
        text: "Intento hablar con el. Antes de que rompa al grupo, debo entender por que.",
        scores: { Loknaa: 3, Ton: 2, Hekari: 1 },
      },
    ],
  },
  {
    id: 15,
    question: "Alguien que amas te acusa injustamente. Sus palabras duelen y el tono sube. ¿Como respondes?",
    options: [
      {
        text: "Contengo y escucho primero. Calmo las aguas antes de decir la verdad.",
        scores: { Loknaa: 3, Quinametzin: 2, Ton: 1 },
      },
      {
        text: "Respondo con verdad y calma. Claridad sin crueldad.",
        scores: { Ton: 3, Quinametzin: 2, Hekari: 1 },
      },
      {
        text: "Me retiro un momento. Necesito espacio para no destruir esta relacion.",
        scores: { Hualik: 3, Loknaa: 2, Hekari: 1 },
      },
      {
        text: "Pongo limites de frente, con respeto pero sin ceder.",
        scores: { Irzak: 3, Ton: 2, Quinametzin: 1 },
      },
    ],
  },
  {
    id: 16,
    question: "Antes de partir, un anciano te ofrece elegir un talisman magico. ¿Cual sientes que te pertenece?",
    options: [
      {
        text: "Medallon que vibra cuando intentas mentirte a ti mismo.",
        scores: { Ton: 3, Quinametzin: 2, Loknaa: 1 },
      },
      {
        text: "Moneda que nunca cae igual dos veces.",
        scores: { Tohkari: 3, Hekari: 2, Hualik: 1 },
      },
      {
        text: "Brujula que apunta a lo que mas necesitas aprender.",
        scores: { Hekari: 3, Loknaa: 2, Ton: 1 },
      },
      {
        text: "Piedra que se vuelve pesada cuando el peligro se acerca.",
        scores: { Quinametzin: 3, Hualik: 2, Ton: 1 },
      },
      {
        text: "Anillo que arde cuando rompes una promesa.",
        scores: { Irzak: 3, Ton: 2, Quinametzin: 1 },
      },
    ],
  },
  {
    id: 17,
    question: "¿Que sonido te hace sentir mas en casa, como si todo encajara?",
    options: [
      {
        text: "Un canto que aclara el ambiente, como si la luz tuviera voz.",
        scores: { Ton: 3, Quinametzin: 2, Loknaa: 1 },
      },
      {
        text: "Silencio tan profundo que escuchas intencion, no ruido.",
        scores: { Hualik: 3, Quinametzin: 2, Hekari: 1 },
      },
      {
        text: "Ritmo constante del trabajo, como martillos sobre yunque.",
        scores: { Quinametzin: 3, Loknaa: 2, Ton: 1 },
      },
      {
        text: "Melodia suave que baja tension sin palabras, como agua fluyendo.",
        scores: { Loknaa: 3, Quinametzin: 2, Hekari: 1 },
      },
      {
        text: "Percusion rapida que activa tu cuerpo y te hace sentir vivo.",
        scores: { Tohkari: 3, Irzak: 2, Hekari: 1 },
      },
    ],
  },
  {
    id: 18,
    question: "Un animal aparece y decide seguirte. Sientes una conexion profunda. ¿Cual es?",
    options: [
      {
        text: "Luciernaga que brilla suavemente, guiandote sin imponer.",
        scores: { Ton: 3, Hekari: 2, Loknaa: 1 },
      },
      {
        text: "Lechuza que observa, espera el momento perfecto y actua con precision.",
        scores: { Hualik: 3, Quinametzin: 2, Hekari: 1 },
      },
      {
        text: "Ajolote que se regenera, se adapta y siempre vuelve mas fuerte.",
        scores: { Loknaa: 3, Quinametzin: 2, Hekari: 1 },
      },
      {
        text: "Halcon que vuela alto, ve patrones y regresa con informacion.",
        scores: { Hekari: 3, Hualik: 2, Ton: 1 },
      },
      {
        text: "Lobo leal que protege sin dudar y nunca rompe su palabra.",
        scores: { Irzak: 3, Quinametzin: 2, Tohkari: 1 },
      },
    ],
  },
  {
    id: 19,
    question: "Si eliges un lugar para vivir, ¿cual te llama mas?",
    options: [
      {
        text: "Un centro comunitario donde siempre hay alguien a quien sostener.",
        scores: { Quinametzin: 3, Loknaa: 2, Ton: 1 },
      },
      {
        text: "Un punto alto desde donde ves el mapa completo del mundo.",
        scores: { Hekari: 3, Ton: 2, Hualik: 1 },
      },
      {
        text: "Un refugio discreto y seguro, con rutas alternativas.",
        scores: { Hualik: 3, Quinametzin: 2, Tohkari: 1 },
      },
      {
        text: "Una vida en movimiento constante. Cambiar de entorno te mantiene vivo.",
        scores: { Tohkari: 3, Hekari: 2, Irzak: 1 },
      },
      {
        text: "Un lugar de trabajo intenso donde transformas esfuerzo en resultados.",
        scores: { Irzak: 3, Quinametzin: 2, Hekari: 1 },
      },
    ],
  },
  {
    id: 20,
    question: "Despues de algo muy fuerte, ¿que haces primero para volver a ti?",
    options: [
      {
        text: "Hablo claro y cierro el tema con verdad.",
        scores: { Ton: 3, Quinametzin: 2, Loknaa: 1 },
      },
      {
        text: "Me muevo. Cambio de lugar, respiro aire nuevo. Regreso distinto.",
        scores: { Hekari: 3, Tohkari: 2, Loknaa: 1 },
      },
      {
        text: "Reordeno. Organizo habitos, tareas, algo tangible que me estabilice.",
        scores: { Quinametzin: 3, Ton: 2, Hualik: 1 },
      },
      {
        text: "Desaparezco un rato. Silencio, distancia. Recalculo todo en soledad.",
        scores: { Hualik: 3, Loknaa: 2, Hekari: 1 },
      },
      {
        text: "Hago algo fisico e intenso. Convierto lo vivido en fuerza.",
        scores: { Irzak: 3, Tohkari: 2, Quinametzin: 1 },
      },
    ],
  },
];

const raceResultText: Record<
  AffinityRace,
  { title: string; subtitle: string; body: string }
> = {
  Ton: {
    title: "TON (Luz) - El Iluminador",
    subtitle: "Verdad, claridad y columna moral absoluta.",
    body:
      "Eres la verdad que no puede ocultarse, la luz que revela aunque duela. Tu existencia es un faro moral: no puedes ignorar la injusticia ni traicionarte a ti mismo. Tu virtud es iluminar caminos, proteger sin esperar recompensa y consumir rencores con tu luz. Tu riesgo es arder demasiado fuerte: la sinceridad brutal puede romper lazos y encender guerras. Tu camino en Tonaltlan es ser guia etico y guardia de la justicia, aprendiendo a decir la verdad con compasion.",
  },
  Tohkari: {
    title: "TOH'KARI (Rayo) - La Tormenta Desatada",
    subtitle: "Impulso, intensidad y decision inmediata.",
    body:
      "Eres la tormenta que no se detiene, el impulso que atraviesa la duda. Cuando actuas no hay medias tintas: o destruyes el peligro o te consumes intentandolo. Tu virtud es la valentia brutal, la capacidad de hacer lo que otros ni se atreven a imaginar. Tu riesgo es convertirte en rayo sin rumbo, dano sin sentido. Tu camino en Tonaltlan es aprender cuando no descargar todo tu poder, encontrando momentos donde contenerte salva mas que destruir.",
  },
  Hekari: {
    title: "HE'KARI (Aire) - El Visionario",
    subtitle: "Perspectiva amplia, ingenio y movimiento constante.",
    body:
      "Eres la mente que vuela alto y ve patrones donde otros solo ven caos. Piensas en mapas, posibilidades y caminos alternos. Tu virtud es la creatividad estrategica: diplomacia, arte, palabra y plan se mezclan en ti. Tu riesgo es dispersarte, vivir siempre en el aire sin aterrizar decisiones. Tu camino en Tonaltlan es ser mensajero, tejedor de alianzas y guardia del conocimiento, equilibrando tu necesidad de libertad con la responsabilidad de guiar a otros.",
  },
  Quinametzin: {
    title: "QUINAMETZIN (Tierra) - El Guardian Colosal",
    subtitle: "Estabilidad, comunidad y deber inquebrantable.",
    body:
      "Eres el pilar que sostiene al resto, la montaña que no se mueve cuando todo tiembla. Tu virtud es la honestidad absoluta y la proteccion paciente: trabajas, reparas, mantienes el orden natural y emocional del grupo. Tu riesgo es cargar demasiado, creer que debes sostenerlo todo incluso cuando te quiebras por dentro. Tu camino en Tonaltlan es ser hogar y muralla, aprendiendo tambien a pedir apoyo y reconocer que incluso las montanas necesitan cimientos.",
  },
  Loknaa: {
    title: "LOK'NAA (Agua) - El Sanador",
    subtitle: "Empatia profunda, armonia y cuidado del vinculo.",
    body:
      "Eres la calma despues de la tormenta, el agua que limpia y conecta. Sientes primero y piensas despues: lees la emocion ajena como si fuera tuya. Tu virtud es sanar y preservar la vida, desescalar conflictos y mantener unida a la comunidad. Tu riesgo es disolverte en el dolor de otros, dar tanto que te olvides de ti. Tu camino en Tonaltlan es aprender a poner limites sagrados: fluir, sanar y sostener sin dejar que tu propio mar se desborde.",
  },
  Hualik: {
    title: "HUALIK (Obscuridad) - El Vigilante Sombra",
    subtitle: "Observacion, precision y control silencioso.",
    body:
      "Eres el que ve sin ser visto, el que escucha lo que nadie nota. Tu virtud es la lucidez fria: analizas, calculas, eliges el momento exacto para actuar con un solo movimiento preciso. Tu riesgo es quedarte siempre en la sombra, encerrarte en la soledad y la desconfianza. Tu camino en Tonaltlan es ser guardian de secretos y equilibrios ocultos, encontrando cuando salir a la luz para intervenir sin perder tu naturaleza discreta.",
  },
  Irzak: {
    title: "IRZAK (Fuego) - La Flama de Honor",
    subtitle: "Pasion, coraje y codigo inquebrantable.",
    body:
      "Eres la chispa que arde con intensidad, el juramento que no se rompe. Tu virtud es la lealtad feroz: luchas con valentia, hablas con sinceridad brutal y vives con un sentido de honor que no negocia. Tu riesgo es que tu fuego se vuelva furia ciega, quemando puentes y personas que amas. Tu camino en Tonaltlan es forjar tu pasion como una llama dirigida: transformar rabia en proteccion, orgullo en ejemplo y sacrificio en inspiracion para otros.",
  },
};

const raceOrder: AffinityRace[] = [
  "Ton",
  "Tohkari",
  "Hekari",
  "Quinametzin",
  "Loknaa",
  "Hualik",
  "Irzak",
];

export default function AfinidadPage() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);

  const isComplete = answers.length === questions.length;

  const scores = answers.reduce<Record<AffinityRace, number>>((acc, answerIndex, i) => {
    const q = questions[i];
    const option = q.options[answerIndex];
    if (!option) return acc;
    for (const [race, value] of Object.entries(option.scores) as [AffinityRace, number][]) {
      acc[race] = (acc[race] ?? 0) + value;
    }
    return acc;
  }, {
    Ton: 0,
    Tohkari: 0,
    Hekari: 0,
    Quinametzin: 0,
    Loknaa: 0,
    Hualik: 0,
    Irzak: 0,
  });

  const sortedRaces = raceOrder
    .filter((race) => race in scores)
    .sort((a, b) => scores[b] - scores[a]);

  const primary = sortedRaces[0];
  const secondary = sortedRaces[1];
  const hasSecondary =
    primary && secondary && scores[secondary] >= scores[primary] * 0.6 && scores[secondary] > 0;

  function handleAnswer(answerIndex: number) {
    const newAnswers = [...answers, answerIndex];
    setAnswers(newAnswers);
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  }

  function reset() {
    setCurrentIndex(0);
    setAnswers([]);
  }

  return (
    <div className="pt-24 pb-16 lg:pt-32">
      <div className="mx-auto max-w-2xl px-4 lg:px-8">
        <SectionHeader
          title="Test de Afinidad"
          subtitle="Descubre con que energia racial resuena tu Tonalli. Responde las preguntas y encuentra tu afinidad en el mundo de Tonaltlan."
        />

        {/* Progress dots */}
        <div className="mb-8 flex items-center justify-center gap-3">
          {questions.map((_, i) => (
            <div
              key={i}
              className={`h-3 w-3 rounded-full transition-colors ${
                i < answers.length
                  ? "bg-teal"
                  : i === currentIndex
                    ? "bg-gold"
                    : "bg-glass-border"
              }`}
              aria-label={`Paso ${i + 1} de ${steps.length}`}
            />
          ))}
        </div>

        {isComplete ? (
          <div className="glass-card rounded-2xl p-8 text-center md:p-12">
            <h2 className="mb-4 font-serif text-2xl font-bold text-gold md:text-3xl">
              Tu Afinidad Tonal
            </h2>
            {primary ? (
              <div className="space-y-6 text-left">
                <div className="glass-card rounded-xl border border-gold/40 bg-background/40 p-6">
                  <h3 className="mb-2 font-serif text-xl font-semibold text-gold">
                    Afinidad dominante: {raceResultText[primary].title}
                  </h3>
                  <p className="mb-2 text-sm font-semibold text-muted">
                    {raceResultText[primary].subtitle}
                  </p>
                  <p className="text-base leading-relaxed text-muted">
                    {raceResultText[primary].body}
                  </p>
                </div>

                {hasSecondary && secondary && (
                  <div className="glass-card rounded-xl bg-background/30 p-6">
                    <h3 className="mb-2 font-serif text-lg font-semibold text-foreground">
                      Afinidad secundaria: {raceResultText[secondary].title}
                    </h3>
                    <p className="text-sm leading-relaxed text-muted">
                      Esta energia acompana a tu esencia principal y matiza tu forma de actuar.
                      Veras ecos de {secondary} en tus decisiones, motivaciones y estilo de juego.
                    </p>
                  </div>
                )}

                <p className="text-sm leading-relaxed text-muted">
                  Este test no es una sentencia, sino un mapa. Usa tu afinidad para elegir clases,
                  razas y estilos de juego dentro de Tonaltlan que resuenen con lo que te mueve por
                  dentro.
                </p>
              </div>
            ) : (
              <p className="mb-6 text-base leading-relaxed text-muted">
                No pudimos calcular tu afinidad. Intenta responder de nuevo el test.
              </p>
            )}
            <button
              type="button"
              onClick={reset}
              className="inline-flex min-h-[48px] items-center justify-center rounded-lg bg-teal px-8 py-3 text-base font-semibold text-background transition-opacity hover:opacity-90"
            >
              Intentar de nuevo
            </button>
          </div>
        ) : (
          <div className="glass-card rounded-2xl p-6 md:p-10">
            <p className="mb-2 text-sm font-medium text-teal">
              Pregunta {currentIndex + 1} de {questions.length}
            </p>
            <h2 className="mb-8 font-serif text-xl font-semibold text-foreground md:text-2xl">
              {questions[currentIndex].question}
            </h2>
            <div className="flex flex-col gap-3">
              {questions[currentIndex].options.map((option, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => handleAnswer(i)}
                  className="glass-card-hover min-h-[48px] rounded-xl px-5 py-4 text-left text-base font-medium text-foreground"
                >
                  {option.text}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
