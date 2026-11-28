import type { MetadataRoute } from "next";
import { getCompendio } from "@/lib/compendio";
import { LANGS, ruta } from "@/lib/i18n";

export const dynamic = "force-static";

const BASE = "https://tonaltlan.com";

/** Paginas publicas (rutas en espanol). /pendientes es interna y queda fuera. */
const PAGINAS = [
  "/",
  "/mundo/",
  "/explorar/",
  "/clases/",
  "/especies/",
  "/deidades/",
  "/bestiario/",
  "/monturas/",
  "/galeria/",
  "/juega/",
  "/juega/danza-tonal/",
  "/juega/dados/",
  "/afinidad/",
  "/noticias/",
  "/nosotros/",
];

/** sitemap.xml con las tres versiones de cada pagina enlazadas entre si (hreflang). */
export default function sitemap(): MetadataRoute.Sitemap {
  const { especies, deidades } = getCompendio("es");
  const rutas = [
    ...PAGINAS,
    ...especies.map((e) => `/especies/${e.slug}/`),
    ...deidades.map((d) => `/deidades/${d.slug}/`),
  ];
  return rutas.flatMap((path) => {
    const languages = Object.fromEntries(LANGS.map((lang) => [lang, `${BASE}${ruta(lang, path)}`]));
    return LANGS.map((lang) => ({
      url: `${BASE}${ruta(lang, path)}`,
      alternates: { languages },
    }));
  });
}
