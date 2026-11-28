/* ============================================================
   ESTRUCTURA DEL SITIO
   Un solo lugar para la navegacion, el footer y los datos
   compartidos. Para agregar una seccion nueva, agregala aqui.
   ============================================================ */

export interface NavItem {
  label: string;
  href: string;
}

// La navegacion y el footer (textos y enlaces) viven en lib/i18n.ts, por idioma.

// Botones del Hero (rutas; las etiquetas salen de lib/i18n.ts). Para una
// convencion se puede invertir el orden y dejar el Test de Afinidad como principal.
export const heroCtas: { principal: NavItem; secundario: NavItem } = {
  principal: { label: "Explorar", href: "/explorar" },
  secundario: { label: "Test de Afinidad", href: "/afinidad" },
};

export const contacts = [
  {
    role: "Arquitecto Tonal",
    email: "arquitectotonal@tonaltlan.com",
    description: "Diseño de juego y contenido creativo",
  },
  {
    role: "Guarda Códices",
    email: "guardacodices@tonaltlan.com",
    description: "Comunidad y eventos",
  },
  {
    role: "Tecnomante",
    email: "tecnomante@tonaltlan.com",
    description: "Soporte técnico y digital",
  },
];

export const socialLinks: { label: string; href: string; iconSrc?: string; iconAlt?: string }[] = [
  {
    label: "Instagram",
    href: "https://www.instagram.com/tonaltlan/",
    iconSrc: "/images/social/instagram.webp",
    iconAlt: "Instagram",
  },
];

// ── Imagenes de Galeria y Monturas ──────────────────────────
export const galleryImages = [
  "/images/galeria/Alquemista.webp",
  "/images/galeria/Animista.webp",
  "/images/galeria/Mapa.webp",
  "/images/galeria/Quesadillera.webp",
  "/images/galeria/espiritu.webp",
  "/images/galeria/guerrera_aguila.webp",
  "/images/galeria/guerrero_rapado.webp",
  "/images/galeria/raza_fuego.webp",
  "/images/galeria/sacerdotiza_lok.webp",
  "/images/galeria/Aztlan.webp",
  "/images/galeria/ciudad_agua.webp",
  "/images/galeria/cosmovision.webp",
];

export const mountImages = [
  "/images/monturas/ajolote-cue.webp",
  "/images/monturas/Armadillo.webp",
  "/images/monturas/hormiga-mielera.webp",
  "/images/monturas/scorpion-archip.webp",
  "/images/monturas/escarabajo.webp",
];

// ── Criaturas del Bestiario con arte (fichas pendientes) ────
// El nombre sale del archivo original del creador. Es nombre propio: igual en ambos idiomas.
export const bestiaryImages: { nombre: string; src: string }[] = [
  { nombre: "Atlanchan", src: "/images/bestiario/Atlanchan.webp" },
  { nombre: "Coo ñu un", src: "/images/bestiario/Coo_nu_un.webp" },
  { nombre: "Hombre Jaguar", src: "/images/bestiario/Hombre_Jaguar.webp" },
  { nombre: "Huay", src: "/images/bestiario/Huay.webp" },
  { nombre: "Neke", src: "/images/bestiario/Neke.webp" },
];

/** Convierte "/images/galeria/guerrera_aguila.webp" en "Guerrera Águila". */
// Correcciones de ortografia para nombres que salen del nombre del archivo.
const correccionesNombre: Record<string, string> = {
  Aguila: "Águila",
  Espiritu: "Espíritu",
  Alquemista: "Alquimista",
  Sacerdotiza: "Sacerdotisa",
  Cosmovision: "Cosmovisión",
};

export function labelFromPath(src: string, fallback = "Ilustración") {
  const raw = src
    .split("/")
    .pop()
    ?.replace(/\.[^/.]+$/, "")
    .replace(/[_-]/g, " ")
    .trim();
  if (!raw) return fallback;
  return raw
    .split(/\s+/)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .map((word) => correccionesNombre[word] ?? word)
    .join(" ");
}

/* ============================================================
   COLOR POR DEIDAD
   Cada dios tiene un color; sus especies lo heredan.
   Las clases van completas para que Tailwind las detecte.
   ============================================================ */
export interface DeityTheme {
  text: string; // titulos y acentos
  chip: string; // etiquetas
  ring: string; // borde de tarjetas
  glow: string; // fondo del retrato
  bar: string; // barra de color
  hex: string; // color principal (para dibujar en canvas: imagen para compartir)
  hexTexto: string; // color del texto (el de `text`)
}

const neutralTheme: DeityTheme = {
  text: "text-jade-400",
  chip: "bg-turquesa-400/10 text-turquesa-200 ring-turquesa-400/25",
  ring: "ring-selva-700 hover:ring-jade-400/60",
  glow: "from-jade-400/20 via-selva-800/40 to-selva-900",
  bar: "bg-jade-400",
  hex: "#4ade80",
  hexTexto: "#86efac",
};

export const deityThemes: Record<string, DeityTheme> = {
  heka: {
    text: "text-sky-300",
    chip: "bg-sky-400/10 text-sky-200 ring-sky-400/25",
    ring: "ring-sky-400/20 hover:ring-sky-400/60",
    glow: "from-sky-400/25 via-selva-800/40 to-selva-900",
    bar: "bg-sky-400",
    hex: "#38bdf8",
    hexTexto: "#7dd3fc",
  },
  lok: {
    text: "text-cyan-300",
    chip: "bg-cyan-400/10 text-cyan-200 ring-cyan-400/25",
    ring: "ring-cyan-400/20 hover:ring-cyan-400/60",
    glow: "from-cyan-400/25 via-selva-800/40 to-selva-900",
    bar: "bg-cyan-400",
    hex: "#22d3ee",
    hexTexto: "#67e8f9",
  },
  tzal: {
    text: "text-lime-300",
    chip: "bg-lime-400/10 text-lime-200 ring-lime-400/25",
    ring: "ring-lime-400/20 hover:ring-lime-400/60",
    glow: "from-lime-400/20 via-selva-800/40 to-selva-900",
    bar: "bg-lime-400",
    hex: "#a3e635",
    hexTexto: "#bef264",
  },
  zilo: {
    text: "text-orange-300",
    chip: "bg-orange-400/10 text-orange-200 ring-orange-400/25",
    ring: "ring-orange-400/20 hover:ring-orange-400/60",
    glow: "from-orange-500/25 via-selva-800/40 to-selva-900",
    bar: "bg-orange-400",
    hex: "#fb923c",
    hexTexto: "#fdba74",
  },
  calti: {
    text: "text-violet-300",
    chip: "bg-violet-400/10 text-violet-200 ring-violet-400/25",
    ring: "ring-violet-400/20 hover:ring-violet-400/60",
    glow: "from-violet-500/25 via-selva-800/40 to-selva-900",
    bar: "bg-violet-400",
    hex: "#a78bfa",
    hexTexto: "#c4b5fd",
  },
  tonatli: {
    text: "text-yellow-200",
    chip: "bg-yellow-300/10 text-yellow-100 ring-yellow-300/25",
    ring: "ring-yellow-300/20 hover:ring-yellow-300/60",
    glow: "from-yellow-300/25 via-selva-800/40 to-selva-900",
    bar: "bg-yellow-300",
    hex: "#fde047",
    hexTexto: "#fef08a",
  },
  tohui: {
    text: "text-fuchsia-300",
    chip: "bg-fuchsia-400/10 text-fuchsia-200 ring-fuchsia-400/25",
    ring: "ring-fuchsia-400/20 hover:ring-fuchsia-400/60",
    glow: "from-fuchsia-500/25 via-selva-800/40 to-selva-900",
    bar: "bg-fuchsia-400",
    hex: "#e879f9",
    hexTexto: "#f0abfc",
  },
};

/**
 * Emblema de cada deidad (public/images/mundo/): el elemento individual del diseñador sobre
 * el disco de su color, generado con scripts/emblemas.py. Asignacion confirmada por el
 * diseñador (nov. 2026): luz, obscuridad, rayo, tierra, aire, fuego y agua. Va junto al
 * nombre del dios y de su linaje (decorativo: alt="").
 */
export const emblemas: Record<string, string> = {
  tonatli: "/images/mundo/emblema_luz.webp",
  calti: "/images/mundo/emblema_obscuridad.webp",
  tohui: "/images/mundo/emblema_rayo.webp",
  tzal: "/images/mundo/emblema_tierra.webp",
  heka: "/images/mundo/emblema_aire.webp",
  zilo: "/images/mundo/emblema_fuego.webp",
  lok: "/images/mundo/emblema_agua.webp",
};

export function themeFor(deitySlug?: string): DeityTheme {
  return (deitySlug && deityThemes[deitySlug]) || neutralTheme;
}
