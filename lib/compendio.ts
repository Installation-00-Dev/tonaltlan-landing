import * as es from "./data";
import * as en from "./data.en";
import type { Lang } from "./i18n";

/** Datos del compendio en el idioma pedido (mismos slugs e imagenes en ambos). */
export function getCompendio(lang: Lang) {
  const d = lang === "en" ? en : es;
  return {
    clases: d.clases,
    especies: d.especies,
    deidades: d.deidades,
    bestiario: d.bestiario,
    sectionsMeta: d.sectionsMeta,
  };
}
