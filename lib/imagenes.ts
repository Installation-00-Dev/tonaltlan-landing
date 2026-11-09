import { variantesDisponibles } from "./variantes.generated";

/**
 * Devuelve la version mas ligera de una imagen que cubra el ancho pedido
 * (en pixeles reales: para pantallas retina, pide el doble de lo que se ve).
 * Si no hay variante suficiente, devuelve el original.
 * Las variantes se generan con: python3 scripts/variantes.py
 */
export function variante(src: string, ancho: number): string {
  const anchos = variantesDisponibles[src];
  if (!anchos) return src;
  const elegido = anchos.find((a) => a >= ancho);
  return elegido ? src.replace(/\.webp$/, `-${elegido}.webp`) : src;
}
