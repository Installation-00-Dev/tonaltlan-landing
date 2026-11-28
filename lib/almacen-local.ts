/* Datos guardados en este navegador (localStorage), a prueba de modo privado:
   si no hay almacenamiento, leer da el valor vacío y guardar no hace nada,
   así que el dato solo dura lo que dure la página. Lo usan el Test de Afinidad
   (cola de envíos sin conexión) y los juegos (récord, historial). Cada clave
   empieza con "tonaltlan-" y es de un solo dueño: un juego nunca lee la de otro. */

/** Lista guardada; [] si no existe, está dañada o no hay almacenamiento. */
export function leerLista(clave: string): unknown[] {
  try {
    const guardado: unknown = JSON.parse(localStorage.getItem(clave) ?? "[]");
    return Array.isArray(guardado) ? guardado : [];
  } catch {
    return [];
  }
}

/** Guarda la lista; vacía, borra la clave. */
export function guardarLista(clave: string, lista: readonly unknown[]): void {
  try {
    if (lista.length) localStorage.setItem(clave, JSON.stringify(lista));
    else localStorage.removeItem(clave);
  } catch {
    // Sin almacenamiento (modo privado): no queda guardado.
  }
}

/** Entero guardado (0 o más); 0 si no existe o no hay almacenamiento. */
export function leerEntero(clave: string): number {
  try {
    return Math.max(0, Number.parseInt(localStorage.getItem(clave) ?? "0", 10) || 0);
  } catch {
    return 0;
  }
}

export function guardarEntero(clave: string, valor: number): void {
  try {
    localStorage.setItem(clave, String(valor));
  } catch {
    // Sin almacenamiento (modo privado): no queda guardado.
  }
}
