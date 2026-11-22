import { existsSync } from "node:fs";
import { join } from "node:path";
import { IMAGEN_COMPARTIR } from "./i18n";

/**
 * Imagen al compartir el enlace de una ficha: su version _og.jpg (1200x630, la genera
 * scripts/vista-previa.py; JPG por WhatsApp). Si todavia no existe, usa la general.
 * Solo para el servidor (lee el disco al construir el sitio).
 */
export function vistaPrevia(src?: string): string {
  if (!src) return IMAGEN_COMPARTIR;
  const og = src.replace(/\.webp$/, "_og.jpg");
  return existsSync(join(process.cwd(), "public", og)) ? og : IMAGEN_COMPARTIR;
}
