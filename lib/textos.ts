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

/* ── NOTICIAS ──
   Textos copiados de los carteles del evento (public/images/noticias/).
   Solo se corrigieron acentos y signos de apertura; el año se dedujo de la fecha de entrega. */
export interface Noticia {
  id: string;
  fecha: string;
  titulo: string;
  lugar: string;
  texto: string[];
  imagenes: { src: string; alt: string }[];
}

export const textosNoticias: Noticia[] = [
  {
    id: "despierta-tu-tonal-cdmx",
    fecha: "28 y 29 de noviembre de 2026",
    titulo: "Tonaltlan: despierta tu Tonal",
    lugar: "One Shot en Roll a Game CDMX",
    texto: [
      "Conoce las clases y especies originales de Tonaltlan.",
      "Fantasía inspirada en culturas mesoamericanas.",
      "¿Te convertirás en el héroe de Aztlan?",
    ],
    imagenes: [
      {
        src: "/images/noticias/despierta_tu_tonal_cdmx_1.webp",
        alt: "Cartel de Tonaltlan: despierta tu Tonal. One Shot en Roll a Game CDMX, 28 y 29 de noviembre.",
      },
      {
        src: "/images/noticias/despierta_tu_tonal_cdmx_2.webp",
        alt: "Cartel alterno del One Shot de Tonaltlan en Roll a Game CDMX, 28 y 29 de noviembre.",
      },
    ],
  },
];

export const textosNoticiasEn: Noticia[] = [
  {
    id: "despierta-tu-tonal-cdmx",
    fecha: "November 28 and 29, 2026",
    titulo: "Tonaltlan: awaken your Tonal",
    lugar: "One Shot at Roll a Game CDMX",
    texto: [
      "Discover the original classes and species of Tonaltlan.",
      "Fantasy inspired by Mesoamerican cultures.",
      "Will you become the hero of Aztlan?",
    ],
    imagenes: [
      {
        src: "/images/noticias/despierta_tu_tonal_cdmx_1.webp",
        alt: "Poster for Tonaltlan: awaken your Tonal. One Shot at Roll a Game CDMX, November 28 and 29.",
      },
      {
        src: "/images/noticias/despierta_tu_tonal_cdmx_2.webp",
        alt: "Alternate poster for the Tonaltlan One Shot at Roll a Game CDMX, November 28 and 29.",
      },
    ],
  },
];

export function getTextos(lang: "es" | "en") {
  return lang === "en"
    ? { clases: textosClasesEn, especies: textosEspeciesEn, noticias: textosNoticiasEn }
    : { clases: textosClases, especies: textosEspecies, noticias: textosNoticias };
}
