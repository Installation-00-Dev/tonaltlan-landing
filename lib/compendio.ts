import * as es from "./data";
import * as en from "./data.en";
import * as fr from "./data.fr";
import type { Lang } from "./i18n";

/** Datos del compendio en el idioma pedido (mismos slugs e imagenes en todos). */
export function getCompendio(lang: Lang) {
  const d = { es, en, fr }[lang];
  return {
    clases: d.clases,
    especies: d.especies,
    deidades: d.deidades,
    bestiario: d.bestiario,
    sectionsMeta: d.sectionsMeta,
  };
}
