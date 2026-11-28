import type { Modo, Resultado, TipoDado } from "@/lib/dados-core";
import type { TextosDados } from "@/lib/i18n/dados";

/** Lo que el servidor manda de cada dado: el color y el emblema de su deidad. */
export interface InfoDado {
  tipo: TipoDado;
  color: string;
  emblema: string;
}

export type { TextosDados };

/** Una tirada ya hecha; el id la distingue en la pantalla y en el historial. */
export interface Tirada extends Resultado {
  id: number;
}

/** Nombre del modo en el idioma del visitante: Normal, Ventaja o Desventaja. */
export function nombreModo(d: TextosDados, m: Modo): string {
  return m === "ventaja" ? d.ventaja : m === "desventaja" ? d.desventaja : d.normal;
}
