/**
 * Texto sin acentos y en minúsculas, para comparar títulos y buscar:
 * normalizar("Descripción") === normalizar("descripcion").
 */
export function normalizar(texto: string): string {
  return texto.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();
}
