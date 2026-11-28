/* ============================================================
   DANZA TONAL — lógica del juego (sin textos ni React).
   Los glifos de los siete dioses se encienden en orden y el jugador
   repite la danza; cada ronda suma un paso. La usan el navegador
   (components/danza/DanzaTonalCliente.tsx) y la prueba
   scripts/probar-danza.mjs (corre con `pnpm verificar`).
   ============================================================ */

/** Los siete glifos en el orden del círculo: en el sentido del reloj, desde arriba. */
export const GLIFOS = ["luz", "rayo", "agua", "tierra", "fuego", "aire", "obscuridad"] as const;
export type Glifo = (typeof GLIFOS)[number];

/** Deidad de cada glifo (asignación confirmada por el diseñador; ver `emblemas` en lib/site.ts). */
export const DEIDAD_DE_GLIFO: Record<Glifo, string> = {
  luz: "tonatli",
  obscuridad: "calti",
  rayo: "tohui",
  tierra: "tzal",
  aire: "heka",
  fuego: "zilo",
  agua: "lok",
};

/** La danza empieza con cuatro glifos de colores bien distintos y repartidos en el círculo. */
export const GLIFOS_INICIALES: readonly Glifo[] = ["luz", "agua", "fuego", "obscuridad"];

/** Al empezar esas rondas se suma un glifo; ese glifo es el paso nuevo de la ronda. */
export const DESBLOQUEOS: readonly { ronda: number; glifo: Glifo }[] = [
  { ronda: 5, glifo: "tierra" },
  { ronda: 8, glifo: "aire" },
  { ronda: 11, glifo: "rayo" },
];

/** Glifos que ya bailan en esa ronda, en el orden del círculo. */
export function glifosActivos(ronda: number): Glifo[] {
  const sumados = DESBLOQUEOS.filter((d) => ronda >= d.ronda).map((d) => d.glifo);
  return GLIFOS.filter((g) => GLIFOS_INICIALES.includes(g) || sumados.includes(g));
}

/** El glifo que se suma al empezar esa ronda, si hay uno. */
export function glifoNuevo(ronda: number): Glifo | null {
  return DESBLOQUEOS.find((d) => d.ronda === ronda)?.glifo ?? null;
}

/**
 * Siguiente paso de la danza: el glifo recién sumado o uno al azar entre los
 * activos. Nunca el mismo tres veces seguidas (sin sonido, tres destellos
 * iguales cuestan demasiado de contar).
 */
export function siguientePaso(secuencia: readonly Glifo[], azar: () => number = Math.random): Glifo {
  const ronda = secuencia.length + 1;
  const nuevo = glifoNuevo(ronda);
  if (nuevo) return nuevo;
  const activos = glifosActivos(ronda);
  const [penultimo, ultimo] = secuencia.slice(-2);
  const opciones = ultimo !== undefined && penultimo === ultimo ? activos.filter((g) => g !== ultimo) : activos;
  return opciones[Math.min(opciones.length - 1, Math.floor(azar() * opciones.length))];
}

/** Destello más corto posible: con su pausa, menos de 3 destellos por segundo (WCAG 2.3.1). */
export const ENCENDIDO_MINIMO = 320;
export const APAGADO_MINIMO = 120;

/** Ritmo de la danza en milisegundos: cuánto brilla cada glifo y la pausa entre uno y otro. Se acelera con las rondas. */
export function ritmo(ronda: number): { encendido: number; apagado: number } {
  return {
    encendido: Math.max(ENCENDIDO_MINIMO, 600 - 24 * (ronda - 1)),
    apagado: Math.max(APAGADO_MINIMO, 220 - 10 * (ronda - 1)),
  };
}

export interface Partida {
  /** La danza completa de esta ronda (su largo es el número de ronda). */
  secuencia: Glifo[];
  /** Pasos que el jugador ya repitió bien en esta ronda. */
  entrada: number;
}

export type Jugada = "sigue" | "ronda" | "error";

export function nuevaPartida(azar: () => number = Math.random): Partida {
  return { secuencia: [siguientePaso([], azar)], entrada: 0 };
}

/** El jugador toca un glifo: sigue la danza, completa la ronda o se equivoca. */
export function jugar(partida: Partida, glifo: Glifo): { jugada: Jugada; partida: Partida } {
  if (glifo !== partida.secuencia[partida.entrada]) return { jugada: "error", partida };
  const entrada = partida.entrada + 1;
  return { jugada: entrada === partida.secuencia.length ? "ronda" : "sigue", partida: { ...partida, entrada } };
}

/** Ronda siguiente: la misma danza con un paso más. */
export function siguienteRonda(partida: Partida, azar: () => number = Math.random): Partida {
  return { secuencia: [...partida.secuencia, siguientePaso(partida.secuencia, azar)], entrada: 0 };
}

/** El paso que tocaba (para mostrarlo cuando el jugador se equivoca). */
export function pasoEsperado(partida: Partida): Glifo {
  return partida.secuencia[partida.entrada];
}

/** Puntaje al equivocarse: la danza más larga que se repitió completa. */
export function pasosLogrados(partida: Partida): number {
  return partida.secuencia.length - 1;
}

/**
 * Capa de la figura de los Puntos Tonal según los glifos que ya bailan:
 * 0 silueta (4 glifos), 1 los siete en el pecho (5 y 6), 2 el Tonal recorriendo el cuerpo (7).
 */
export function capaFigura(ronda: number): 0 | 1 | 2 {
  const activos = glifosActivos(ronda).length;
  return activos >= GLIFOS.length ? 2 : activos > GLIFOS_INICIALES.length ? 1 : 0;
}
