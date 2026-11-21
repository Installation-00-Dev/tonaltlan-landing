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

/* ── EL MUNDO: Cosmovisión ── (texto del creador) */
export const textosMundo = {
  cosmovision: {
    titulo: "El origen de todo, el equilibrio de los siete dioses.",
    parrafos: [
      "Antes de que existiera el tiempo, solo estaba Omet, la esencia primordial del equilibrio y la dualidad. De su voluntad nacieron siete dioses, cada uno portador de una fuerza fundamental: Tonatli, la Luz; Calti, la Obscuridad; Tohui, el Rayo; Tzal, la Tierra; Heka, el Aire; Zilo, el Fuego; y Lok, el Agua.",
      "Cada deidad intentó crear su propio mundo, pero sus creaciones terminaron consumidas por el desequilibrio de sus propios elementos. Comprendieron entonces que ninguna fuerza podía sostener la vida por sí sola.",
      "Para unir sus creaciones, Tonatli entregó su existencia y se transformó en el Sol, convirtiéndose en la luz eterna que permitiría florecer a los mundos. Bajo la guía de Tzalcóatl, el Caimán Celeste, los astros encontraron su movimiento y su lugar en el firmamento.",
      "Así nació el equilibrio que sostiene a Tonaltlan, un mundo donde los dioses, sus elementos y el destino de los mortales permanecen entrelazados.",
    ],
    cierre: "Siete dioses. Siete elementos. Un mundo nacido del sacrificio.",
  },
};

export const textosMundoEn: typeof textosMundo = {
  cosmovision: {
    titulo: "The origin of everything, the balance of the seven gods.",
    parrafos: [
      "Before time existed, there was only Omet, the primordial essence of balance and duality. From Omet's will seven gods were born, each the bearer of a fundamental force: Tonatli, Light; Calti, Darkness; Tohui, Lightning; Tzal, Earth; Heka, Air; Zilo, Fire; and Lok, Water.",
      "Each deity tried to create their own world, but their creations ended up consumed by the imbalance of their own elements. They understood then that no force could sustain life on its own.",
      "To unite their creations, Tonatli gave up her existence and became the Sun, the eternal light that would allow the worlds to flourish. Under the guidance of Tzalcóatl, the Celestial Caiman, the stars found their motion and their place in the firmament.",
      "Thus was born the balance that sustains Tonaltlan, a world where the gods, their elements and the fate of mortals remain intertwined.",
    ],
    cierre: "Seven gods. Seven elements. A world born of sacrifice.",
  },
};

/* ── NOTICIAS ──
   Textos copiados de los carteles del evento (public/images/noticias/).
   Solo se corrigieron acentos y signos de apertura. Año confirmado por el creador. */
export interface Noticia {
  id: string;
  fecha: string;
  titulo: string;
  lugar: string;
  texto: string[];
  imagenes: { src: string; alt: string }[];
  /** Si existe, los carteles se abren en grande al entrar a la landing hasta esta fecha (ISO, UTC). */
  anuncioHasta?: string;
}

export const textosNoticias: Noticia[] = [
  {
    id: "despierta-tu-tonal-cdmx",
    fecha: "28 y 29 de noviembre de 2026",
    titulo: "Tonaltlan: despierta tu Tonal",
    lugar: "One Shot en Roll a Game CDMX",
    // Fin del 29 de noviembre en la Ciudad de México (UTC-6).
    anuncioHasta: "2026-11-30T06:00:00Z",
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
    anuncioHasta: "2026-11-30T06:00:00Z",
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
    ? { clases: textosClasesEn, especies: textosEspeciesEn, noticias: textosNoticiasEn, mundo: textosMundoEn }
    : { clases: textosClases, especies: textosEspecies, noticias: textosNoticias, mundo: textosMundo };
}
