/* ============================================================
   IDIOMAS (es / en / fr): punto de entrada de `@/lib/i18n`
   - Español vive en las rutas de siempre (/clases/).
   - Inglés vive bajo /en (/en/clases/) y francés bajo /fr (/fr/clases/).
   - Los textos de interfaz viven en un archivo por dominio, con los tres
     idiomas juntos (marco, inicio, mundo, compendio, juega, estudio,
     afinidad y uno por juego). El español se copió tal cual de los
     componentes; inglés y francés son traducciones pendientes de
     revisión (ver /pendientes).
   - `t(lang)` arma el diccionario de siempre: la forma no cambia.
   ============================================================ */

import { afinidad } from "./afinidad";
import { compendio } from "./compendio";
import { dados } from "./dados";
import { danza } from "./danza";
import { estudio } from "./estudio";
import type { Lang } from "./idiomas";
import { inicio } from "./inicio";
import { juega } from "./juega";
import { marco } from "./marco";
import { mundo } from "./mundo";

export * from "./idiomas";

/** Diccionario de un idioma, en el orden de siempre. */
function armar(lang: Lang) {
  const { meta, nav, footer, comun } = marco[lang];
  return {
    meta,
    nav,
    footer,
    ...inicio[lang],
    comun,
    paginas: {
      ...compendio[lang],
      mundo: mundo[lang],
      juega: juega[lang],
      // Cada juego trae sus textos en su propio archivo (lib/i18n/<juego>.ts).
      danza: danza[lang],
      dados: dados[lang],
      ...estudio[lang],
      afinidad: afinidad[lang],
    },
  };
}

export type Diccionario = ReturnType<typeof armar>;

const diccionarios: Record<Lang, Diccionario> = { es: armar("es"), en: armar("en"), fr: armar("fr") };

/** Textos de interfaz en el idioma pedido. */
export function t(lang: Lang): Diccionario {
  return diccionarios[lang];
}
