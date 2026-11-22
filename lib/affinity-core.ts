/* ============================================================
   TEST DE AFINIDAD — NUCLEO
   Tipos y logica sin textos: lo puede importar el navegador sin
   descargar las preguntas de los tres idiomas. Los textos viven en
   lib/affinity-test.ts (.en.ts y .fr.ts) y el servidor le pasa a la
   pagina solo los del idioma del visitante.
   ============================================================ */

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
  /** Preguntas visuales: especie a la que apunta la opcion (sirve para desempatar). */
  race?: RaceKey;
  /** Pregunta de simbolo: imagen del emblema. */
  imagen?: string;
  /** Pregunta de color: clases de Tailwind del circulo (completas, para que Tailwind las detecte). */
  color?: string;
}

/** Texto (por defecto) u opciones visuales que se eligen de un toque. */
export type QuestionKind = "texto" | "simbolo" | "color" | "deidad";

export interface Question {
  id: number;
  title: string;
  scenario: string;
  options: Option[];
  tipo?: QuestionKind;
}

/** Titulos de las preguntas visuales y nombres de los colores, por idioma. */
export interface TextosVisuales {
  simbolo: { title: string; scenario: string };
  color: { title: string; scenario: string; nombres: Record<RaceKey, string> };
  deidad: { title: string; scenario: string };
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
  /** Lectura tipo horoscopo: 3 frases positivas y generales (lo primero que se lee en el resultado). */
  lectura: string[];
}

export interface RankedRace {
  race: RaceKey;
  score: number;
}

export interface CalculatedResults {
  dominant: RankedRace & { narrative: RaceResult };
  /** La segunda especie con mas puntos ("con un toque de..."). */
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

/** Slug de la ficha de cada especie en el compendio (/especies/<slug>/). */
export const RACE_SLUG: Record<RaceKey, string> = {
  Ton: "ton",
  "Toh'kari": "tohkari",
  "He'kari": "hekari",
  Quinametzin: "quinametzin",
  "Lok'naa": "lok-naa",
  Hualik: "hualik",
  Irzak: "irzak",
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

export type Idioma = "es" | "en" | "fr";

/** Elemento de una especie sacado de su titulo: "TON (Luz) - El Iluminador" -> "Luz". */
export function elementoDe(nombre: string): string | null {
  return nombre.match(/\(([^)]+)\)/)?.[1]?.trim() ?? null;
}

const ETIQUETAS: Record<Idioma, { secciones: [string, string, string, string]; simbolos: [string, string, string] }> = {
  es: { secciones: ["Esencia", "Virtud", "Sombra", "Camino"], simbolos: ["Símbolo Mítico", "Objeto Cotidiano", "Glifo"] },
  en: { secciones: ["Essence", "Virtue", "Shadow", "Path"], simbolos: ["Mythic Symbol", "Everyday Object", "Glyph"] },
  fr: { secciones: ["Essence", "Vertu", "Ombre", "Chemin"], simbolos: ["Symbole mythique", "Objet du quotidien", "Glyphe"] },
};

/** Mantiene el orden de las preguntas y revuelve sus opciones (para que la posicion no influya). */
export function prepareQuestionsForSession(source: Question[]): Question[] {
  return source.map((question) => ({
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

/**
 * Especies elegidas en las preguntas visuales, en orden de desempate:
 * primero el dios, luego el simbolo y al final el color.
 */
export function preferenciasVisuales(preguntas: Question[], respuestas: Array<string | undefined>): RaceKey[] {
  const orden: QuestionKind[] = ["deidad", "simbolo", "color"];
  return orden.flatMap((tipo) => {
    const i = preguntas.findIndex((q) => q.tipo === tipo);
    const race = i < 0 ? undefined : preguntas[i].options.find((o) => o.id === respuestas[i])?.race;
    return race ? [race] : [];
  });
}

/** Modo "Afinidad Aleatoria": cada especie tiene la misma probabilidad (1 de 7). */
export function puntosAleatorios(): Scores {
  const pool = [12, 10, 8, 6, 4, 3, 2];
  const puntos = createInitialScores();
  shuffleArray(RACE_KEYS).forEach((race, index) => {
    puntos[race] = pool[index] ?? 0;
  });
  return puntos;
}

/**
 * Gana la especie con mas puntos. En empate decide lo que la persona eligio en
 * las preguntas visuales (dios > simbolo > color) y, si aun empata, el azar.
 * La segunda especie se muestra siempre como "un toque de...".
 */
export function calcularResultados(
  scores: Scores,
  narrativas: Record<RaceKey, RaceResult>,
  lang: Idioma = "es",
  preferencias: RaceKey[] = [],
): CalculatedResults {
  const etiquetas = ETIQUETAS[lang];
  const prioridad = (race: RaceKey) => {
    const i = preferencias.indexOf(race);
    return i < 0 ? preferencias.length : i;
  };
  const azar = shuffleArray(RACE_KEYS);
  const ranking = [...RACE_KEYS]
    .sort((a, b) => scores[b] - scores[a] || prioridad(a) - prioridad(b) || azar.indexOf(a) - azar.indexOf(b))
    .map((race) => ({ race, score: scores[race] }));

  const dominant = ranking[0];
  const segunda = ranking[1];
  const secondary = segunda && segunda.score > 0 ? { ...segunda, narrative: narrativas[segunda.race] } : null;

  return {
    dominant: { ...dominant, narrative: narrativas[dominant.race] },
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
