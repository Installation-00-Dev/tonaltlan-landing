import type { Glifo } from "@/lib/danza-core";
import type { TextosDanza } from "@/lib/i18n/danza";

/** Lo que el servidor manda de cada glifo, ya en el idioma del visitante. */
export interface GlifoDanza {
  id: Glifo;
  emblema: string;
  /** Color de su deidad (hex de deityThemes) para el destello. */
  color: string;
  deidad: string;
  elemento: string;
}

export type { TextosDanza };

export type Fase = "inicio" | "nuevo" | "observa" | "turno" | "acierto" | "error" | "fin";

export interface ResultadoDanza {
  pasos: number;
  /** Récord antes de esta partida. */
  anterior: number;
}
