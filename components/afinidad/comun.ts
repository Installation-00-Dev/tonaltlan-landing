import type { RaceKey } from "@/lib/affinity-core";

/** Arte y nombres de cada especie y su dios (los prepara Afinidad.tsx desde el compendio). */
export type InfoEspecies = Record<
  RaceKey,
  {
    nombre: string;
    slug: string;
    imagen?: string;
    alt?: string;
    deidad: { nombre: string; slug: string; imagen?: string } | null;
  }
>;

/** Anillo de foco de teclado de los botones del test (oro sobre selva). */
export const enfoque =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-oro-300 focus-visible:ring-offset-2 focus-visible:ring-offset-selva-900";
