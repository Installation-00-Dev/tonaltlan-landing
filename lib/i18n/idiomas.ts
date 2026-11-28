/* Idiomas y rutas: el idioma de cada ruta, la misma página en otro idioma
   y los metadatos (canónica, hreflang y vista previa al compartir). */

export type Lang = "es" | "en" | "fr";
export const LANGS: Lang[] = ["es", "en", "fr"];

/** Nombre corto y nombre propio de cada idioma (para el selector). */
export const IDIOMAS: Record<Lang, { corto: string; nombre: string; locale: string }> = {
  es: { corto: "ES", nombre: "Español", locale: "es_MX" },
  en: { corto: "EN", nombre: "English", locale: "en_US" },
  fr: { corto: "FR", nombre: "Français", locale: "fr_FR" },
};

/** Ruta en el idioma pedido: ruta("en", "/clases/") -> "/en/clases/". */
export function ruta(lang: Lang, path: string): string {
  if (lang === "es") return path;
  if (path === "/") return `/${lang}/`;
  if (path.startsWith("/#")) return `/${lang}/${path.slice(1)}`;
  return `/${lang}${path}`;
}

/** Idioma de una ruta: "/fr/clases/" -> "fr". */
export function idiomaDeRuta(pathname: string): Lang {
  const prefijo = LANGS.find((l) => l !== "es" && (pathname === `/${l}` || pathname.startsWith(`/${l}/`)));
  return prefijo ?? "es";
}

/** La misma pagina en otro idioma (para el selector ES / EN / FR). */
export function rutaEnIdioma(pathname: string, destino: Lang): string {
  const actual = idiomaDeRuta(pathname);
  const base = actual === "es" ? pathname || "/" : pathname.replace(new RegExp(`^/${actual}`), "") || "/";
  return ruta(destino, base);
}

/**
 * Imagen que se ve al compartir un enlace (Open Graph, 1200x630).
 * Excepcion a la regla de solo .webp: JPG para que WhatsApp siempre la muestre.
 */
export const IMAGEN_COMPARTIR = "/images/piramides_azteca_final_og.jpg";

/**
 * Metadatos de una pagina: titulo, descripcion, `alternates` para que Google
 * relacione las versiones (es / en / fr) y la vista previa al compartir el
 * enlace (Open Graph y X). `path` es la ruta en espanol.
 */
export function metaPagina(lang: Lang, path: string, title: string, description?: string, imagen = IMAGEN_COMPARTIR) {
  const titulo = typeof title === "string" ? title : undefined;
  return {
    title,
    ...(description ? { description } : {}),
    alternates: {
      canonical: ruta(lang, path),
      languages: { es: path, en: ruta("en", path), fr: ruta("fr", path), "x-default": path },
    },
    openGraph: {
      type: "website" as const,
      siteName: "Tonaltlan",
      locale: IDIOMAS[lang].locale,
      url: ruta(lang, path),
      ...(titulo ? { title: titulo } : {}),
      ...(description ? { description } : {}),
      images: [{ url: imagen, width: 1200, height: 630 }],
    },
    twitter: {
      card: "summary_large_image" as const,
      ...(titulo ? { title: titulo } : {}),
      ...(description ? { description } : {}),
      images: [imagen],
    },
  };
}
