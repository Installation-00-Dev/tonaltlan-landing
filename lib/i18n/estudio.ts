import type { Lang } from "./idiomas";

/* Estudio: Nosotros y Noticias. */

const es = {
  nosotros: {
    meta: "Nosotros - Cuevas & Quetzales",
    metaDesc: "Cuevas & Quetzales, el estudio detrás de Tonaltlan.",
    titulo: "Nosotros",
    equipo: "Equipo",
    foto: "Foto",
  },
  noticias: {
    meta: "Noticias - Tonaltlan",
    metaDesc: "Avances del desarrollo de Tonaltlan.",
    titulo: "Noticias",
  },
};

const en: typeof es = {
  nosotros: {
    meta: "About us - Cuevas & Quetzales",
    metaDesc: "Cuevas & Quetzales, the studio behind Tonaltlan.",
    titulo: "About us",
    equipo: "Team",
    foto: "Photo",
  },
  noticias: {
    meta: "News - Tonaltlan",
    metaDesc: "Development updates from Tonaltlan.",
    titulo: "News",
  },
};

const fr: typeof es = {
  nosotros: {
    meta: "À propos - Cuevas & Quetzales",
    metaDesc: "Cuevas & Quetzales, le studio derrière Tonaltlan.",
    titulo: "À propos",
    equipo: "Équipe",
    foto: "Photo",
  },
  noticias: {
    meta: "Actualités - Tonaltlan",
    metaDesc: "Les avancées du développement de Tonaltlan.",
    titulo: "Actualités",
  },
};

export const estudio: Record<Lang, typeof es> = { es, en, fr };
