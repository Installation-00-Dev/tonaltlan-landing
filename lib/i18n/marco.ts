import type { Lang } from "./idiomas";

/* Marco de todas las páginas: metadatos generales, barra, pie y textos comunes. */

const es = {
  meta: {
    title: "Tonaltlan - Juego de Rol de Mesa Mesoamericano",
    description:
      "Adéntrate en Tonaltlan, un juego de rol de mesa inspirado en la mitología y cultura mesoamericana. Forja tu destino entre pirámides, códices y dioses ancestrales.",
    ogDescription: "Forja tu destino en un mundo inspirado en la mitología mesoamericana.",
    keywords: ["Tonaltlan", "TTRPG", "juego de rol", "mesoamericano", "azteca", "juego de mesa"],
  },
  nav: {
    mundo: "El Mundo",
    compendio: "Compendio",
    juega: "Juega",
    galeria: "Galería",
    cta: "Test de Afinidad",
    explorar: "Explorar",
    aria: "Navegación principal",
    inicioAria: "Tonaltlan - Inicio",
    abrir: "Abrir menú",
    cerrar: "Cerrar menú",
    idiomaAria: "Idioma",
  },
  footer: {
    produccion: "Una producción de Cuevas & Quetzales",
    mapa: "Mapa del sitio",
    contacto: "Contacto",
    copyright: "© 2025 Tonaltlan. Todos los derechos reservados.",
    columnas: [
      {
        titulo: "El Mundo",
        links: [
          { label: "Cosmovisión", href: "/mundo/#cosmovision" },
          { label: "Puntos Tonal", href: "/mundo/#puntos-tonal" },
          { label: "Regiones", href: "/mundo/#regiones" },
        ],
      },
      {
        titulo: "Compendio",
        links: [
          { label: "Clases", href: "/clases/" },
          { label: "Especies", href: "/especies/" },
          { label: "Deidades", href: "/deidades/" },
          { label: "Bestiario", href: "/bestiario/" },
          { label: "Monturas", href: "/monturas/" },
        ],
      },
      {
        titulo: "Juega",
        links: [
          { label: "Cómo empezar", href: "/juega/#como-empezar" },
          { label: "Test de Afinidad", href: "/afinidad/" },
          { label: "Descargas", href: "/juega/#descargas" },
          { label: "Guías para narradores", href: "/juega/#narradores" },
        ],
      },
      {
        titulo: "Estudio",
        links: [
          { label: "Nosotros", href: "/nosotros/" },
          { label: "Noticias", href: "/noticias/" },
          { label: "Suscríbete", href: "/#newsletter" },
          { label: "Galería", href: "/galeria/" },
          { label: "Contacto", href: "/#contacto" },
        ],
      },
    ],
    contactos: {
      "arquitectotonal@tonaltlan.com": "Diseño de juego y contenido creativo",
      "guardacodices@tonaltlan.com": "Comunidad y eventos",
      "tecnomante@tonaltlan.com": "Soporte técnico y digital",
    } as Record<string, string>,
  },
  comun: {
    proximamente: "Próximamente",
    compendio: "Compendio",
    ruta: "Ruta",
    secciones: "Secciones",
    anterior: "Anterior",
    siguiente: "Siguiente",
    cerrar: "Cerrar",
    ampliar: "Ampliar",
    tipo: "Tipo",
    nota: "Nota",
    descripcion: "Descripción",
    clasesAria: "Clases",
    noEncontrado: "No encontrado - Tonaltlan",
    queSeNecesita: "Qué se necesita",
    yaMencionado: "Ya mencionado en el sitio",
    montura: "Montura",
  },
};

const en: typeof es = {
  meta: {
    title: "Tonaltlan - Mesoamerican Tabletop Roleplaying Game",
    description:
      "Step into Tonaltlan, a tabletop roleplaying game inspired by Mesoamerican mythology and culture. Forge your destiny among pyramids, codices and ancestral gods.",
    ogDescription: "Forge your destiny in a world inspired by Mesoamerican mythology.",
    keywords: ["Tonaltlan", "TTRPG", "roleplaying game", "Mesoamerican", "Aztec", "tabletop game"],
  },
  nav: {
    mundo: "The World",
    compendio: "Compendium",
    juega: "Play",
    galeria: "Gallery",
    cta: "Affinity Test",
    explorar: "Explore",
    aria: "Main navigation",
    inicioAria: "Tonaltlan - Home",
    abrir: "Open menu",
    cerrar: "Close menu",
    idiomaAria: "Language",
  },
  footer: {
    produccion: "A Cuevas & Quetzales production",
    mapa: "Site map",
    contacto: "Contact",
    copyright: "© 2025 Tonaltlan. All rights reserved.",
    columnas: [
      {
        titulo: "The World",
        links: [
          { label: "Worldview", href: "/mundo/#cosmovision" },
          { label: "Tonal Points", href: "/mundo/#puntos-tonal" },
          { label: "Regions", href: "/mundo/#regiones" },
        ],
      },
      {
        titulo: "Compendium",
        links: [
          { label: "Classes", href: "/clases/" },
          { label: "Species", href: "/especies/" },
          { label: "Deities", href: "/deidades/" },
          { label: "Bestiary", href: "/bestiario/" },
          { label: "Mounts", href: "/monturas/" },
        ],
      },
      {
        titulo: "Play",
        links: [
          { label: "Getting started", href: "/juega/#como-empezar" },
          { label: "Affinity Test", href: "/afinidad/" },
          { label: "Downloads", href: "/juega/#descargas" },
          { label: "Game master guides", href: "/juega/#narradores" },
        ],
      },
      {
        titulo: "Studio",
        links: [
          { label: "About us", href: "/nosotros/" },
          { label: "News", href: "/noticias/" },
          { label: "Subscribe", href: "/#newsletter" },
          { label: "Gallery", href: "/galeria/" },
          { label: "Contact", href: "/#contacto" },
        ],
      },
    ],
    contactos: {
      "arquitectotonal@tonaltlan.com": "Game design and creative content",
      "guardacodices@tonaltlan.com": "Community and events",
      "tecnomante@tonaltlan.com": "Technical and digital support",
    },
  },
  comun: {
    proximamente: "Coming soon",
    compendio: "Compendium",
    ruta: "Breadcrumb",
    secciones: "Sections",
    anterior: "Previous",
    siguiente: "Next",
    cerrar: "Close",
    ampliar: "Enlarge",
    tipo: "Type",
    nota: "Note",
    descripcion: "Description",
    clasesAria: "Classes",
    noEncontrado: "Not found - Tonaltlan",
    queSeNecesita: "What is needed",
    yaMencionado: "Already mentioned on the site",
    montura: "Mount",
  },
};

const fr: typeof es = {
  meta: {
    title: "Tonaltlan - Jeu de rôle sur table mésoaméricain",
    description:
      "Plongez dans Tonaltlan, un jeu de rôle sur table inspiré de la mythologie et de la culture mésoaméricaines. Forgez votre destin parmi les pyramides, les codex et les dieux ancestraux.",
    ogDescription: "Forgez votre destin dans un monde inspiré de la mythologie mésoaméricaine.",
    keywords: ["Tonaltlan", "JDR", "jeu de rôle", "mésoaméricain", "aztèque", "jeu de société"],
  },
  nav: {
    mundo: "Le Monde",
    compendio: "Compendium",
    juega: "Jouer",
    galeria: "Galerie",
    cta: "Test d'Affinité",
    explorar: "Explorer",
    aria: "Navigation principale",
    inicioAria: "Tonaltlan - Accueil",
    abrir: "Ouvrir le menu",
    cerrar: "Fermer le menu",
    idiomaAria: "Langue",
  },
  footer: {
    produccion: "Une production Cuevas & Quetzales",
    mapa: "Plan du site",
    contacto: "Contact",
    copyright: "© 2025 Tonaltlan. Tous droits réservés.",
    columnas: [
      {
        titulo: "Le Monde",
        links: [
          { label: "Cosmovision", href: "/mundo/#cosmovision" },
          { label: "Points Tonal", href: "/mundo/#puntos-tonal" },
          { label: "Régions", href: "/mundo/#regiones" },
        ],
      },
      {
        titulo: "Compendium",
        links: [
          { label: "Classes", href: "/clases/" },
          { label: "Espèces", href: "/especies/" },
          { label: "Divinités", href: "/deidades/" },
          { label: "Bestiaire", href: "/bestiario/" },
          { label: "Montures", href: "/monturas/" },
        ],
      },
      {
        titulo: "Jouer",
        links: [
          { label: "Pour commencer", href: "/juega/#como-empezar" },
          { label: "Test d'Affinité", href: "/afinidad/" },
          { label: "Téléchargements", href: "/juega/#descargas" },
          { label: "Guides pour MJ", href: "/juega/#narradores" },
        ],
      },
      {
        titulo: "Studio",
        links: [
          { label: "À propos", href: "/nosotros/" },
          { label: "Actualités", href: "/noticias/" },
          { label: "S'abonner", href: "/#newsletter" },
          { label: "Galerie", href: "/galeria/" },
          { label: "Contact", href: "/#contacto" },
        ],
      },
    ],
    contactos: {
      "arquitectotonal@tonaltlan.com": "Conception du jeu et contenu créatif",
      "guardacodices@tonaltlan.com": "Communauté et événements",
      "tecnomante@tonaltlan.com": "Assistance technique et numérique",
    },
  },
  comun: {
    proximamente: "Bientôt",
    compendio: "Compendium",
    ruta: "Fil d'Ariane",
    secciones: "Sections",
    anterior: "Précédent",
    siguiente: "Suivant",
    cerrar: "Fermer",
    ampliar: "Agrandir",
    tipo: "Type",
    nota: "Note",
    descripcion: "Description",
    clasesAria: "Classes",
    noEncontrado: "Introuvable - Tonaltlan",
    queSeNecesita: "Ce qu'il faut",
    yaMencionado: "Déjà mentionné sur le site",
    montura: "Monture",
  },
};

export const marco: Record<Lang, typeof es> = { es, en, fr };
