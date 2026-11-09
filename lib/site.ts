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
  { label: "X / Twitter", href: "#" },
  { label: "Discord", href: "#" },
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
];

export const mountImages = [
  "/images/monturas/ajolote-cue.webp",
  "/images/monturas/Armadillo.webp",
  "/images/monturas/hormiga-mielera.webp",
  "/images/monturas/scorpion-archip.webp",
];

/** Convierte "/images/galeria/guerrera_aguila.webp" en "Guerrera Águila". */
// Correcciones de ortografia para nombres que salen del nombre del archivo.
const correccionesNombre: Record<string, string> = {
  Aguila: "Águila",
  Espiritu: "Espíritu",
  Alquemista: "Alquimista",
  Sacerdotiza: "Sacerdotisa",
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
}

const neutralTheme: DeityTheme = {
  text: "text-jade-400",
  chip: "bg-turquesa-400/10 text-turquesa-200 ring-turquesa-400/25",
  ring: "ring-selva-700 hover:ring-jade-400/60",
  glow: "from-jade-400/20 via-selva-800/40 to-selva-900",
  bar: "bg-jade-400",
};

export const deityThemes: Record<string, DeityTheme> = {
  heka: {
    text: "text-sky-300",
    chip: "bg-sky-400/10 text-sky-200 ring-sky-400/25",
    ring: "ring-sky-400/20 hover:ring-sky-400/60",
    glow: "from-sky-400/25 via-selva-800/40 to-selva-900",
    bar: "bg-sky-400",
  },
  lok: {
    text: "text-cyan-300",
    chip: "bg-cyan-400/10 text-cyan-200 ring-cyan-400/25",
    ring: "ring-cyan-400/20 hover:ring-cyan-400/60",
    glow: "from-cyan-400/25 via-selva-800/40 to-selva-900",
    bar: "bg-cyan-400",
  },
  tzal: {
    text: "text-lime-300",
    chip: "bg-lime-400/10 text-lime-200 ring-lime-400/25",
    ring: "ring-lime-400/20 hover:ring-lime-400/60",
    glow: "from-lime-400/20 via-selva-800/40 to-selva-900",
    bar: "bg-lime-400",
  },
  zilo: {
    text: "text-orange-300",
    chip: "bg-orange-400/10 text-orange-200 ring-orange-400/25",
    ring: "ring-orange-400/20 hover:ring-orange-400/60",
    glow: "from-orange-500/25 via-selva-800/40 to-selva-900",
    bar: "bg-orange-400",
  },
  calti: {
    text: "text-violet-300",
    chip: "bg-violet-400/10 text-violet-200 ring-violet-400/25",
    ring: "ring-violet-400/20 hover:ring-violet-400/60",
    glow: "from-violet-500/25 via-selva-800/40 to-selva-900",
    bar: "bg-violet-400",
  },
  tonatli: {
    text: "text-yellow-200",
    chip: "bg-yellow-300/10 text-yellow-100 ring-yellow-300/25",
    ring: "ring-yellow-300/20 hover:ring-yellow-300/60",
    glow: "from-yellow-300/25 via-selva-800/40 to-selva-900",
    bar: "bg-yellow-300",
  },
  tohui: {
    text: "text-fuchsia-300",
    chip: "bg-fuchsia-400/10 text-fuchsia-200 ring-fuchsia-400/25",
    ring: "ring-fuchsia-400/20 hover:ring-fuchsia-400/60",
    glow: "from-fuchsia-500/25 via-selva-800/40 to-selva-900",
    bar: "bg-fuchsia-400",
  },
};

export function themeFor(deitySlug?: string): DeityTheme {
  return (deitySlug && deityThemes[deitySlug]) || neutralTheme;
}
