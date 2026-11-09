/* ============================================================
   ESTRUCTURA DEL SITIO
   Un solo lugar para la navegacion, el footer y los datos
   compartidos. Para agregar una seccion nueva, agregala aqui.
   ============================================================ */

export interface NavItem {
  label: string;
  href: string;
}

// Navbar principal: las 4 grandes areas del sitio.
export const mainNav: NavItem[] = [
  { label: "El Mundo", href: "/mundo" },
  { label: "Compendio", href: "/explorar" },
  { label: "Juega", href: "/juega" },
  { label: "Galería", href: "/galeria" },
];

// Boton destacado de la navbar (cierre del embudo).
export const navCta: NavItem = { label: "Suscríbete", href: "/#newsletter" };

// Columnas del footer (mapa del sitio).
export const footerColumns: { title: string; links: NavItem[] }[] = [
  {
    title: "El Mundo",
    links: [
      { label: "Cosmovisión", href: "/mundo#cosmovision" },
      { label: "Puntos Tonal", href: "/mundo#puntos-tonal" },
      { label: "Regiones", href: "/mundo#regiones" },
      { label: "Historia", href: "/mundo#historia" },
    ],
  },
  {
    title: "Compendio",
    links: [
      { label: "Clases", href: "/clases" },
      { label: "Especies", href: "/especies" },
      { label: "Deidades", href: "/deidades" },
      { label: "Bestiario", href: "/bestiario" },
      { label: "Monturas", href: "/monturas" },
    ],
  },
  {
    title: "Juega",
    links: [
      { label: "Cómo empezar", href: "/juega#como-empezar" },
      { label: "Test de Afinidad", href: "/afinidad" },
      { label: "Descargas", href: "/juega#descargas" },
      { label: "Guías para narradores", href: "/juega#narradores" },
    ],
  },
  {
    title: "Estudio",
    links: [
      { label: "Nosotros", href: "/nosotros" },
      { label: "Noticias", href: "/noticias" },
      { label: "Galería", href: "/galeria" },
      { label: "Contacto", href: "/#contacto" },
    ],
  },
];

export const contacts = [
  {
    role: "Arquitecto Tonal",
    email: "arquitectotonal@tonaltlan.com",
    description: "Diseno de juego y contenido creativo",
  },
  {
    role: "Guarda Codices",
    email: "guardacodices@tonaltlan.com",
    description: "Comunidad y eventos",
  },
  {
    role: "Tecnomante",
    email: "tecnomante@tonaltlan.com",
    description: "Soporte tecnico y digital",
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

/** Convierte "/images/galeria/guerrera_aguila.webp" en "Guerrera Aguila". */
export function labelFromPath(src: string, fallback = "Ilustracion") {
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
  text: "text-amber-300",
  chip: "bg-amber-400/10 text-amber-200 ring-amber-400/25",
  ring: "ring-slate-700 hover:ring-amber-400/60",
  glow: "from-amber-400/20 via-slate-800/40 to-slate-900",
  bar: "bg-amber-400",
};

export const deityThemes: Record<string, DeityTheme> = {
  heka: {
    text: "text-sky-300",
    chip: "bg-sky-400/10 text-sky-200 ring-sky-400/25",
    ring: "ring-sky-400/20 hover:ring-sky-400/60",
    glow: "from-sky-400/25 via-slate-800/40 to-slate-900",
    bar: "bg-sky-400",
  },
  lok: {
    text: "text-cyan-300",
    chip: "bg-cyan-400/10 text-cyan-200 ring-cyan-400/25",
    ring: "ring-cyan-400/20 hover:ring-cyan-400/60",
    glow: "from-cyan-400/25 via-slate-800/40 to-slate-900",
    bar: "bg-cyan-400",
  },
  tzal: {
    text: "text-lime-300",
    chip: "bg-lime-400/10 text-lime-200 ring-lime-400/25",
    ring: "ring-lime-400/20 hover:ring-lime-400/60",
    glow: "from-lime-400/20 via-slate-800/40 to-slate-900",
    bar: "bg-lime-400",
  },
  zilo: {
    text: "text-orange-300",
    chip: "bg-orange-400/10 text-orange-200 ring-orange-400/25",
    ring: "ring-orange-400/20 hover:ring-orange-400/60",
    glow: "from-orange-500/25 via-slate-800/40 to-slate-900",
    bar: "bg-orange-400",
  },
  calti: {
    text: "text-violet-300",
    chip: "bg-violet-400/10 text-violet-200 ring-violet-400/25",
    ring: "ring-violet-400/20 hover:ring-violet-400/60",
    glow: "from-violet-500/25 via-slate-800/40 to-slate-900",
    bar: "bg-violet-400",
  },
  tonatli: {
    text: "text-yellow-200",
    chip: "bg-yellow-300/10 text-yellow-100 ring-yellow-300/25",
    ring: "ring-yellow-300/20 hover:ring-yellow-300/60",
    glow: "from-yellow-300/25 via-slate-800/40 to-slate-900",
    bar: "bg-yellow-300",
  },
  tohui: {
    text: "text-fuchsia-300",
    chip: "bg-fuchsia-400/10 text-fuchsia-200 ring-fuchsia-400/25",
    ring: "ring-fuchsia-400/20 hover:ring-fuchsia-400/60",
    glow: "from-fuchsia-500/25 via-slate-800/40 to-slate-900",
    bar: "bg-fuchsia-400",
  },
};

export function themeFor(deitySlug?: string): DeityTheme {
  return (deitySlug && deityThemes[deitySlug]) || neutralTheme;
}
