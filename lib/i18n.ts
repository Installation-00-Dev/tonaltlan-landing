/* ============================================================
   IDIOMAS (es / en)
   - Español vive en las rutas de siempre (/clases/).
   - Inglés vive bajo /en (/en/clases/).
   - Los textos de interfaz y de la landing estan aqui. El espanol se
     copio tal cual de los componentes; el ingles es traduccion pendiente
     de revision por el creador (ver /pendientes).
   ============================================================ */

export type Lang = "es" | "en";
export const LANGS: Lang[] = ["es", "en"];

/** Ruta en el idioma pedido: ruta("en", "/clases/") -> "/en/clases/". */
export function ruta(lang: Lang, path: string): string {
  if (lang === "es") return path;
  if (path === "/") return "/en/";
  if (path.startsWith("/#")) return `/en/${path.slice(1)}`;
  return `/en${path}`;
}

/** Idioma de una ruta y la misma ruta en el otro idioma (para el selector ES/EN). */
export function idiomaDeRuta(pathname: string): Lang {
  return pathname === "/en" || pathname.startsWith("/en/") ? "en" : "es";
}

export function rutaEnOtroIdioma(pathname: string): string {
  if (idiomaDeRuta(pathname) === "en") {
    const sin = pathname.replace(/^\/en/, "");
    return sin === "" ? "/" : sin;
  }
  return ruta("en", pathname || "/");
}

/**
 * Metadatos de una pagina: titulo, descripcion y `alternates` para que Google
 * relacione ambas versiones (es / en). `path` es la ruta en espanol.
 */
export function metaPagina(lang: Lang, path: string, title: string, description?: string) {
  return {
    title,
    ...(description ? { description } : {}),
    alternates: {
      canonical: ruta(lang, path),
      languages: { es: path, en: ruta("en", path), "x-default": path },
    },
  };
}

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
    otroIdioma: "EN",
    otroIdiomaAria: "Ver el sitio en inglés",
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
          { label: "Historia", href: "/mundo/#historia" },
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
  hero: {
    titulo: "Tu Aventura Comienza",
    logoAlt: "Logo de Tonaltlan",
  },
  about: {
    titulo: "¿Qué es Tonaltlan?",
    parrafos: [
      "Tonaltlan es un juego de rol de mesa ambientado en un mundo inspirado en las grandes civilizaciones mesoamericanas. Utiliza un sistema de reglas basado en Dungeons & Dragons 2024, adaptado para reflejar la cosmovisión y las fuerzas divinas de este universo.",
      "Aquí, los jugadores encarnan héroes elegidos por los dioses, capaces de despertar los Puntos Tonal, centros de energía espiritual que conectan a los mortales con las deidades elementales y el equilibrio del cosmos.",
      "Navega por selvas sagradas, explora templos olvidados y enfrenta a criaturas provenientes del Mictlan mismo. Cada sesión es una oportunidad para tejer leyendas que perdurarán en los códices de tu mesa, mientras descubres nuevas clases, criaturas, regiones y tradiciones inspiradas en la cosmovisión mesoamericana.",
    ],
    imagenAlt: "Pirámide de ónix en Tonaltlan rodeada de energía mística",
  },
  explore: {
    titulo: "Explorar Tonaltlan",
    subtitulo: "Descubre los secretos del mundo mesoamericano a través de su compendio viviente.",
    secciones: [
      { title: "Clases", description: "Guerreros, sacerdotes, hechiceros y más arquetipos del mundo antiguo.", tags: ["Combate", "Magia", "Sigilo"] },
      { title: "Especies", description: "Seres nacidos del maíz, la obsidiana y el aliento de los dioses.", tags: ["Humanos", "Nahual", "Tlalocan"] },
      { title: "Bestiario", description: "Criaturas del Mictlan y bestias de selvas y montañas sagradas.", tags: ["Mictlan", "Selva", "Celestial"] },
      { title: "Monturas", description: "Compañeros leales que surcan cielos, ríos y caminos ancestrales.", tags: ["Voladora", "Acuática", "Terrestre"] },
      { title: "Deidades", description: "Los dioses que tejen el destino del cosmos y sus elegidos.", tags: ["Creación", "Destrucción", "Equilibrio"] },
      { title: "Galería", description: "Arte conceptual, ilustraciones y vistazos al universo de Tonaltlan.", tags: ["Arte", "Conceptos", "Mapas"] },
    ],
  },
  vistazo: { titulo: "Tonaltlan de un Vistazo" },
  newsletter: {
    titulo: "Mantente Informado",
    texto: "Recibe noticias sobre lanzamientos, nuevos suplementos y eventos exclusivos directamente en tu correo.",
    gracias: "Próximamente - Gracias por tu interés",
    label: "Correo electrónico",
    placeholder: "tu@correo.com",
    boton: "Suscribirse",
    privacidad:
      "Respetamos tu privacidad. Puedes darte de baja en cualquier momento. Consulta nuestra política de privacidad para más información.",
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
    ilustracion: "Ilustración",
  },
  paginas: {
    clases: {
      meta: "Clases - Tonaltlan",
      metaDesc: "Descubre las clases jugables de Tonaltlan: guerreros, sacerdotisas, nahuales y más.",
    },
    especies: {
      meta: "Especies - Tonaltlan",
      metaDesc: "Explora las especies jugables de Tonaltlan: humanos, ahuizotl, tlalocan-i y más.",
      hijosDe: "Hijos de",
      linajesAria: "Linajes",
      volver: "Volver a Especies",
      linaje: "Linaje",
      sufijo: "Especies",
    },
    deidades: {
      meta: "Deidades - Tonaltlan",
      metaDesc: "Los dioses del panteón mesoamericano de Tonaltlan y sus dominios.",
      titulo: "Deidades",
      subtitulo: "Los dioses que tejen el destino del cosmos y sus elegidos.",
      panteonAria: "Panteón",
      suLinaje: "Su linaje",
      leer: "Leer su historia",
      volver: "Volver a Deidades",
      sufijo: "Deidades",
    },
    detalle: {
      fichaRapida: "Ficha Rápida",
      rol: "Rol",
      atributo: "Atributo clave",
      porDefinir: "Por definir",
      dado: "Dado de golpe",
      salvaciones: "Salvaciones",
      armaduras: "Armaduras",
      armas: "Armas",
      rolDefecto: "Clase de fantasía para Tonaltlan.",
    },
    bestiario: {
      meta: "Bestiario - Tonaltlan",
      titulo: "Bestiario",
      subtitulo: "Criaturas del Mictlan y bestias de selvas y montañas sagradas.",
      region: "Región",
      regiones: ["Mictlan", "Selva", "Celestial"],
      ejemploAria: "Ejemplo de ficha de criatura",
      ilustracion: "Ilustración",
      stats: ["CA", "PG", "Velocidad"],
      atributos: ["FUE", "DES", "CON", "INT", "SAB", "CAR"],
      acciones: "Acciones",
    },
    monturas: {
      meta: "Monturas - Tonaltlan",
      metaDesc: "Monturas voladoras, terrestres y acuáticas del mundo de Tonaltlan.",
      titulo: "Monturas",
      subtitulo: "Galería visual de monturas del mundo de Tonaltlan.",
    },
    galeria: {
      meta: "Galería - Tonaltlan",
      metaDesc: "Ilustraciones y arte visual del universo de Tonaltlan.",
      titulo: "Galería",
      subtitulo: "Todas las ilustraciones disponibles del mundo de Tonaltlan.",
    },
    explorar: {
      titulo: "Explorar Tonaltlan",
      subtitulo:
        "El compendio viviente del mundo mesoamericano. Busca entre clases, especies, criaturas, monturas y deidades.",
      buscar: "Buscar en el compendio...",
      entradas: "entradas",
      sinResultados: "Sin resultados para",
      tipos: { clase: "Clase", especie: "Especie", deidad: "Deidad" },
    },
    mundo: {
      meta: "El Mundo - Tonaltlan",
      metaDesc: "Cosmovisión, Puntos Tonal, regiones e historia del mundo de Tonaltlan.",
      titulo: "El Mundo",
      secciones: { cosmovision: "Cosmovisión", puntos: "Puntos Tonal", regiones: "Regiones", historia: "Historia" },
      mapaAlt: "Mapa de Tonaltlan",
    },
    juega: {
      meta: "Juega - Tonaltlan",
      metaDesc:
        "Todo lo necesario para jugar en Tonaltlan: cómo empezar, Test de Afinidad, descargas y recursos para narradores.",
      titulo: "Juega",
      secciones: { empezar: "Cómo empezar", afinidad: "Test de Afinidad", descargas: "Descargas", narradores: "Narradores" },
      afinidadTitulo: "Test de Afinidad",
      afinidadTexto:
        "Descubre con qué energía racial resuena tu energía tonal. Responde las preguntas y encuentra tu afinidad en el mundo de Tonaltlan.",
    },
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
    afinidad: {
      meta: "Test de Afinidad - Tonaltlan",
      titulo: "Test de Afinidad",
      subtitulo:
        "Descubre con qué energía racial resuena tu energía tonal. Responde las preguntas y encuentra tu afinidad en el mundo de Tonaltlan.",
      paso: "Paso",
      de: "de",
      nombre: "Nombre",
      nombrePlaceholder: "Tu nombre",
      email: "Email",
      emailPlaceholder: "tu@email.com",
      comenzar: "Comenzar Test",
      aleatoria: "Afinidad Aleatoria",
      aleatoriaNota: "Modo galleta de la suerte: te damos una afinidad al azar sin responder preguntas.",
      pregunta: "Pregunta",
      ayuda: "Toca una opción para avanzar automáticamente. Usa Anterior para corregir.",
      anterior: "Anterior",
      modoAleatorio: "Modo Fortuna Aleatoria",
      tuAfinidad: "tu afinidad",
      revelada: "Afinidad revelada",
      simbolos: "Símbolos Sagrados",
      guardando: "Guardando tu resultado...",
      guardado: "Resultado guardado correctamente.",
      error: "No se pudo guardar tu resultado. Intenta de nuevo en unos segundos.",
      reiniciar: "Hacer Test Nuevamente",
    },
  },
};

export type Diccionario = typeof es;

const en: Diccionario = {
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
    otroIdioma: "ES",
    otroIdiomaAria: "Ver el sitio en español",
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
          { label: "History", href: "/mundo/#historia" },
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
  hero: {
    titulo: "Your Adventure Begins",
    logoAlt: "Tonaltlan logo",
  },
  about: {
    titulo: "What is Tonaltlan?",
    parrafos: [
      "Tonaltlan is a tabletop roleplaying game set in a world inspired by the great Mesoamerican civilizations. It uses a rules system based on Dungeons & Dragons 2024, adapted to reflect the worldview and divine forces of this universe.",
      "Here, players take on the role of heroes chosen by the gods, able to awaken the Tonal Points, centers of spiritual energy that connect mortals with the elemental deities and the balance of the cosmos.",
      "Journey through sacred jungles, explore forgotten temples and face creatures from Mictlan itself. Every session is a chance to weave legends that will live on in the codices of your table, as you discover new classes, creatures, regions and traditions inspired by the Mesoamerican worldview.",
    ],
    imagenAlt: "An onyx pyramid in Tonaltlan surrounded by mystical energy",
  },
  explore: {
    titulo: "Explore Tonaltlan",
    subtitulo: "Uncover the secrets of the Mesoamerican world through its living compendium.",
    secciones: [
      { title: "Classes", description: "Warriors, priests, sorcerers and more archetypes of the ancient world.", tags: ["Combat", "Magic", "Stealth"] },
      { title: "Species", description: "Beings born of maize, obsidian and the breath of the gods.", tags: ["Humans", "Nahual", "Tlalocan"] },
      { title: "Bestiary", description: "Creatures of Mictlan and beasts of the sacred jungles and mountains.", tags: ["Mictlan", "Jungle", "Celestial"] },
      { title: "Mounts", description: "Loyal companions that ride the skies, rivers and ancestral roads.", tags: ["Flying", "Aquatic", "Land"] },
      { title: "Deities", description: "The gods who weave the fate of the cosmos and their chosen ones.", tags: ["Creation", "Destruction", "Balance"] },
      { title: "Gallery", description: "Concept art, illustrations and glimpses into the universe of Tonaltlan.", tags: ["Art", "Concepts", "Maps"] },
    ],
  },
  vistazo: { titulo: "Tonaltlan at a Glance" },
  newsletter: {
    titulo: "Stay Informed",
    texto: "Get news about releases, new supplements and exclusive events straight to your inbox.",
    gracias: "Coming soon - Thanks for your interest",
    label: "Email address",
    placeholder: "you@email.com",
    boton: "Subscribe",
    privacidad:
      "We respect your privacy. You can unsubscribe at any time. See our privacy policy for more information.",
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
    ilustracion: "Illustration",
  },
  paginas: {
    clases: {
      meta: "Classes - Tonaltlan",
      metaDesc: "Discover the playable classes of Tonaltlan: warriors, priestesses, nahuales and more.",
    },
    especies: {
      meta: "Species - Tonaltlan",
      metaDesc: "Explore the playable species of Tonaltlan: humans, ahuizotl, tlalocan-i and more.",
      hijosDe: "Children of",
      linajesAria: "Lineages",
      volver: "Back to Species",
      linaje: "Lineage",
      sufijo: "Species",
    },
    deidades: {
      meta: "Deities - Tonaltlan",
      metaDesc: "The gods of the Mesoamerican pantheon of Tonaltlan and their domains.",
      titulo: "Deities",
      subtitulo: "The gods who weave the fate of the cosmos and their chosen ones.",
      panteonAria: "Pantheon",
      suLinaje: "Their lineage",
      leer: "Read their story",
      volver: "Back to Deities",
      sufijo: "Deities",
    },
    detalle: {
      fichaRapida: "Quick Facts",
      rol: "Role",
      atributo: "Key attribute",
      porDefinir: "To be defined",
      dado: "Hit die",
      salvaciones: "Saving throws",
      armaduras: "Armor",
      armas: "Weapons",
      rolDefecto: "Fantasy class for Tonaltlan.",
    },
    bestiario: {
      meta: "Bestiary - Tonaltlan",
      titulo: "Bestiary",
      subtitulo: "Creatures of Mictlan and beasts of the sacred jungles and mountains.",
      region: "Region",
      regiones: ["Mictlan", "Jungle", "Celestial"],
      ejemploAria: "Example creature stat block",
      ilustracion: "Illustration",
      stats: ["AC", "HP", "Speed"],
      atributos: ["STR", "DEX", "CON", "INT", "WIS", "CHA"],
      acciones: "Actions",
    },
    monturas: {
      meta: "Mounts - Tonaltlan",
      metaDesc: "Flying, land and aquatic mounts from the world of Tonaltlan.",
      titulo: "Mounts",
      subtitulo: "A visual gallery of the mounts of the world of Tonaltlan.",
    },
    galeria: {
      meta: "Gallery - Tonaltlan",
      metaDesc: "Illustrations and visual art from the universe of Tonaltlan.",
      titulo: "Gallery",
      subtitulo: "Every illustration available from the world of Tonaltlan.",
    },
    explorar: {
      titulo: "Explore Tonaltlan",
      subtitulo:
        "The living compendium of the Mesoamerican world. Search among classes, species, creatures, mounts and deities.",
      buscar: "Search the compendium...",
      entradas: "entries",
      sinResultados: "No results for",
      tipos: { clase: "Class", especie: "Species", deidad: "Deity" },
    },
    mundo: {
      meta: "The World - Tonaltlan",
      metaDesc: "Worldview, Tonal Points, regions and history of the world of Tonaltlan.",
      titulo: "The World",
      secciones: { cosmovision: "Worldview", puntos: "Tonal Points", regiones: "Regions", historia: "History" },
      mapaAlt: "Map of Tonaltlan",
    },
    juega: {
      meta: "Play - Tonaltlan",
      metaDesc:
        "Everything you need to play in Tonaltlan: getting started, the Affinity Test, downloads and game master resources.",
      titulo: "Play",
      secciones: { empezar: "Getting started", afinidad: "Affinity Test", descargas: "Downloads", narradores: "Game Masters" },
      afinidadTitulo: "Affinity Test",
      afinidadTexto:
        "Discover which racial energy your tonal energy resonates with. Answer the questions and find your affinity in the world of Tonaltlan.",
    },
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
    afinidad: {
      meta: "Affinity Test - Tonaltlan",
      titulo: "Affinity Test",
      subtitulo:
        "Discover which racial energy your tonal energy resonates with. Answer the questions and find your affinity in the world of Tonaltlan.",
      paso: "Step",
      de: "of",
      nombre: "Name",
      nombrePlaceholder: "Your name",
      email: "Email",
      emailPlaceholder: "you@email.com",
      comenzar: "Start Test",
      aleatoria: "Random Affinity",
      aleatoriaNota: "Fortune cookie mode: we give you a random affinity without answering any questions.",
      pregunta: "Question",
      ayuda: "Tap an option to move on automatically. Use Previous to change your answer.",
      anterior: "Previous",
      modoAleatorio: "Random Fortune Mode",
      tuAfinidad: "your affinity",
      revelada: "Affinity revealed",
      simbolos: "Sacred Symbols",
      guardando: "Saving your result...",
      guardado: "Result saved.",
      error: "We couldn't save your result. Please try again in a few seconds.",
      reiniciar: "Take the Test Again",
    },
  },
};

const diccionarios: Record<Lang, Diccionario> = { es, en };

/** Textos de interfaz en el idioma pedido. */
export function t(lang: Lang): Diccionario {
  return diccionarios[lang];
}
