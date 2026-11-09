/* ============================================================
   TEXTOS DEL CREADOR
   Copy entregado por el creador del mundo (dueño del producto).
   Se copia TAL CUAL: no editar, resumir ni corregir sin su visto bueno.
   ============================================================ */

export const textosClases = {
  titulo: "Clases Originales",
  intro: [
    "Forja tu propio camino con clases únicas creadas para el universo de Tonaltlan, inspiradas en las culturas y mitologías mesoamericanas.",
    "Cada clase ofrece una identidad, un estilo de combate y habilidades propias. Descubre distintas especializaciones vinculadas a los siete elementos y desarrolla poderes que transformarán tu manera de jugar.",
  ],
  // Va al final, despues de las clases.
  cierre: "Y esto es solo el comienzo… No todos los caminos han sido revelados.",
};

export const textosEspecies = {
  titulo: "Especies Jugables",
  lema: "Ocho especies, ocho formas de vivir Tonaltlan.",
  intro: [
    "Siete especies nacidas bajo la influencia de las deidades elementales, cada una con su propia historia, cultura y conexión con el Tonal. A ellas se suman los Tlacas, humanos sin una afinidad elemental predeterminada.",
  ],
};

/* ── ENGLISH (traduccion pendiente de revision por el creador) ── */
export const textosClasesEn: typeof textosClases = {
  titulo: "Original Classes",
  intro: [
    "Forge your own path with unique classes created for the universe of Tonaltlan, inspired by Mesoamerican cultures and mythologies.",
    "Each class offers its own identity, fighting style and abilities. Discover specializations tied to the seven elements and develop powers that will transform the way you play.",
  ],
  cierre: "And this is only the beginning… Not every path has been revealed.",
};

export const textosEspeciesEn: typeof textosEspecies = {
  titulo: "Playable Species",
  lema: "Eight species, eight ways to live Tonaltlan.",
  intro: [
    "Seven species born under the influence of the elemental deities, each with its own history, culture and connection to the Tonal. They are joined by the Tlacas, humans with no predetermined elemental affinity.",
  ],
};

export function getTextos(lang: "es" | "en") {
  return lang === "en"
    ? { clases: textosClasesEn, especies: textosEspeciesEn }
    : { clases: textosClases, especies: textosEspecies };
}
