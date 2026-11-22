/* ============================================================
   IDIOMAS (es / en / fr)
   - Español vive en las rutas de siempre (/clases/).
   - Inglés vive bajo /en (/en/clases/) y francés bajo /fr (/fr/clases/).
   - Los textos de interfaz y de la landing estan aqui. El espanol se
     copio tal cual de los componentes; ingles y frances son traducciones
     pendientes de revision (ver /pendientes).
   ============================================================ */

export type Lang = "es" | "en" | "fr";
export const LANGS: Lang[] = ["es", "en", "fr"];

/** Nombre corto y nombre propio de cada idioma (para el selector). */
export const IDIOMAS: Record<Lang, { corto: string; nombre: string; locale: string }> = {
  es: { corto: "ES", nombre: "Español", locale: "es_MX" },
  en: { corto: "EN", nombre: "English", locale: "en_US" },
  fr: { corto: "FR", nombre: "Français", locale: "fr_FR" },
};

/** Ruta en el idioma pedido: ruta("en", "/clases/") -> "/en/clases/". */
export function ruta(lang: Lang, path: string): string {
  if (lang === "es") return path;
  if (path === "/") return `/${lang}/`;
  if (path.startsWith("/#")) return `/${lang}/${path.slice(1)}`;
  return `/${lang}${path}`;
}

/** Idioma de una ruta: "/fr/clases/" -> "fr". */
export function idiomaDeRuta(pathname: string): Lang {
  const prefijo = LANGS.find((l) => l !== "es" && (pathname === `/${l}` || pathname.startsWith(`/${l}/`)));
  return prefijo ?? "es";
}

/** La misma pagina en otro idioma (para el selector ES / EN / FR). */
export function rutaEnIdioma(pathname: string, destino: Lang): string {
  const actual = idiomaDeRuta(pathname);
  const base = actual === "es" ? pathname || "/" : pathname.replace(new RegExp(`^/${actual}`), "") || "/";
  return ruta(destino, base);
}

/**
 * Imagen que se ve al compartir un enlace (Open Graph, 1200x630).
 * Excepcion a la regla de solo .webp: JPG para que WhatsApp siempre la muestre.
 */
export const IMAGEN_COMPARTIR = "/images/piramides_azteca_final_og.jpg";

/**
 * Metadatos de una pagina: titulo, descripcion, `alternates` para que Google
 * relacione las versiones (es / en / fr) y la vista previa al compartir el
 * enlace (Open Graph y X). `path` es la ruta en espanol.
 */
export function metaPagina(lang: Lang, path: string, title: string, description?: string, imagen = IMAGEN_COMPARTIR) {
  const titulo = typeof title === "string" ? title : undefined;
  return {
    title,
    ...(description ? { description } : {}),
    alternates: {
      canonical: ruta(lang, path),
      languages: { es: path, en: ruta("en", path), fr: ruta("fr", path), "x-default": path },
    },
    openGraph: {
      type: "website" as const,
      siteName: "Tonaltlan",
      locale: IDIOMAS[lang].locale,
      url: ruta(lang, path),
      ...(titulo ? { title: titulo } : {}),
      ...(description ? { description } : {}),
      images: [{ url: imagen, width: 1200, height: 630 }],
    },
    twitter: {
      card: "summary_large_image" as const,
      ...(titulo ? { title: titulo } : {}),
      ...(description ? { description } : {}),
      images: [imagen],
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
    enviando: "Enviando…",
    suscrito: "¡Listo! Te escribiremos con las novedades de Tonaltlan.",
    error: "No pudimos guardar tu correo. Revisa tu conexión e intenta de nuevo.",
    reintentar: "Reintentar",
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
      metaDesc: "Descubre las clases jugables de Tonaltlan: Brujo Catemaco, Guerrero Otomi, Mitotiani y Tlapali.",
    },
    especies: {
      meta: "Especies - Tonaltlan",
      metaDesc: "Explora las especies jugables de Tonaltlan: He'kari, Hualik, Irzak, Lok'Naa, Quinametzin, Toh'kari, Ton y Tlacas.",
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
      cosmovisionAlt:
        "Ilustración de la creación: en lo alto, una figura dual de luz y obscuridad; al centro, una figura que se funde con el Sol, rodeada por fuerzas de la obscuridad, el aire, el agua, el rayo y el fuego, y por un caimán celeste entre esferas; abajo, la tierra sostiene el mundo.",
      puntosAlt:
        "Diagrama de los Puntos Tonal: dos figuras humanas con corrientes de energía de colores que recorren el cuerpo hasta un círculo en el pecho, y arriba los siete emblemas de los dioses.",
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
      toque: "Con un toque de",
      conoce: "Conoce a tu especie",
      lecturaCompleta: "Lee tu lectura completa",
      eres: "eres",
      preguntas: "preguntas",
      duracion: "cerca de un minuto",
      reintentar: "Reintentar",
      compartir: "Compartir mi resultado",
      preparando: "Preparando tu imagen…",
      descargada: "Imagen descargada",
      compartirTexto: "Soy {especie}, {arquetipo}. ¿Y tú? Descubre tu afinidad en Tonaltlan.",
      tarjetaPie: "¿Y tú? Haz el test en",
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
    enviando: "Sending…",
    suscrito: "Done! We'll write to you with news from Tonaltlan.",
    error: "We couldn't save your email. Check your connection and try again.",
    reintentar: "Try again",
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
      metaDesc: "Discover the playable classes of Tonaltlan: Brujo Catemaco, Guerrero Otomi, Mitotiani and Tlapali.",
    },
    especies: {
      meta: "Species - Tonaltlan",
      metaDesc: "Explore the playable species of Tonaltlan: He'kari, Hualik, Irzak, Lok'Naa, Quinametzin, Toh'kari, Ton and Tlacas.",
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
      cosmovisionAlt:
        "Illustration of the creation: above, a dual figure of light and darkness; at the center, a figure merging with the Sun, surrounded by forces of darkness, air, water, lightning and fire, and by a celestial caiman among spheres; below, the earth holds up the world.",
      puntosAlt:
        "Diagram of the Tonal Points: two human figures with colored currents of energy running through the body to a circle on the chest, with the seven emblems of the gods above.",
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
      toque: "With a touch of",
      conoce: "Meet your species",
      lecturaCompleta: "Read your full reading",
      eres: "you are",
      preguntas: "questions",
      duracion: "about a minute",
      reintentar: "Try again",
      compartir: "Share my result",
      preparando: "Preparing your image…",
      descargada: "Image downloaded",
      compartirTexto: "I'm {especie}, {arquetipo}. What about you? Find your affinity in Tonaltlan.",
      tarjetaPie: "What about you? Take the test at",
    },
  },
};

/* ── FRANÇAIS (traduction en attente de relecture) ── */
const fr: Diccionario = {
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
  hero: {
    titulo: "Votre aventure commence",
    logoAlt: "Logo de Tonaltlan",
  },
  about: {
    titulo: "Qu'est-ce que Tonaltlan ?",
    parrafos: [
      "Tonaltlan est un jeu de rôle sur table qui se déroule dans un monde inspiré des grandes civilisations mésoaméricaines. Il utilise un système de règles basé sur Dungeons & Dragons 2024, adapté pour refléter la cosmovision et les forces divines de cet univers.",
      "Les joueurs y incarnent des héros choisis par les dieux, capables d'éveiller les Points Tonal, des centres d'énergie spirituelle qui relient les mortels aux divinités élémentaires et à l'équilibre du cosmos.",
      "Parcourez des jungles sacrées, explorez des temples oubliés et affrontez des créatures venues du Mictlan lui-même. Chaque session est l'occasion de tisser des légendes qui vivront dans les codex de votre table, tout en découvrant de nouvelles classes, créatures, régions et traditions inspirées de la cosmovision mésoaméricaine.",
    ],
    imagenAlt: "Une pyramide d'onyx à Tonaltlan entourée d'énergie mystique",
  },
  explore: {
    titulo: "Explorer Tonaltlan",
    subtitulo: "Découvrez les secrets du monde mésoaméricain à travers son compendium vivant.",
    secciones: [
      { title: "Classes", description: "Guerriers, prêtres, sorciers et autres archétypes du monde ancien.", tags: ["Combat", "Magie", "Discrétion"] },
      { title: "Espèces", description: "Des êtres nés du maïs, de l'obsidienne et du souffle des dieux.", tags: ["Humains", "Nahual", "Tlalocan"] },
      { title: "Bestiaire", description: "Créatures du Mictlan et bêtes des jungles et montagnes sacrées.", tags: ["Mictlan", "Jungle", "Céleste"] },
      { title: "Montures", description: "De fidèles compagnons qui parcourent les cieux, les rivières et les routes ancestrales.", tags: ["Volantes", "Aquatiques", "Terrestres"] },
      { title: "Divinités", description: "Les dieux qui tissent le destin du cosmos et leurs élus.", tags: ["Création", "Destruction", "Équilibre"] },
      { title: "Galerie", description: "Art conceptuel, illustrations et aperçus de l'univers de Tonaltlan.", tags: ["Art", "Concepts", "Cartes"] },
    ],
  },
  vistazo: { titulo: "Tonaltlan en un coup d'œil" },
  newsletter: {
    titulo: "Restez informé",
    texto: "Recevez les nouvelles sur les sorties, les nouveaux suppléments et les événements exclusifs directement dans votre boîte mail.",
    enviando: "Envoi…",
    suscrito: "C'est fait ! Nous vous écrirons avec les nouvelles de Tonaltlan.",
    error: "Nous n'avons pas pu enregistrer votre e-mail. Vérifiez votre connexion et réessayez.",
    reintentar: "Réessayer",
    label: "Adresse e-mail",
    placeholder: "vous@email.com",
    boton: "S'abonner",
    privacidad:
      "Nous respectons votre vie privée. Vous pouvez vous désabonner à tout moment. Consultez notre politique de confidentialité pour plus d'informations.",
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
    ilustracion: "Illustration",
  },
  paginas: {
    clases: {
      meta: "Classes - Tonaltlan",
      metaDesc: "Découvrez les classes jouables de Tonaltlan : Brujo Catemaco, Guerrero Otomi, Mitotiani et Tlapali.",
    },
    especies: {
      meta: "Espèces - Tonaltlan",
      metaDesc: "Explorez les espèces jouables de Tonaltlan : He'kari, Hualik, Irzak, Lok'Naa, Quinametzin, Toh'kari, Ton et Tlacas.",
      hijosDe: "Enfants de",
      linajesAria: "Lignées",
      volver: "Retour aux Espèces",
      linaje: "Lignée",
      sufijo: "Espèces",
    },
    deidades: {
      meta: "Divinités - Tonaltlan",
      metaDesc: "Les dieux du panthéon mésoaméricain de Tonaltlan et leurs domaines.",
      titulo: "Divinités",
      subtitulo: "Les dieux qui tissent le destin du cosmos et leurs élus.",
      panteonAria: "Panthéon",
      suLinaje: "Sa lignée",
      leer: "Lire son histoire",
      volver: "Retour aux Divinités",
      sufijo: "Divinités",
    },
    detalle: {
      fichaRapida: "Fiche rapide",
      rol: "Rôle",
      atributo: "Caractéristique clé",
      porDefinir: "À définir",
      dado: "Dé de vie",
      salvaciones: "Jets de sauvegarde",
      armaduras: "Armures",
      armas: "Armes",
      rolDefecto: "Classe de fantasy pour Tonaltlan.",
    },
    bestiario: {
      meta: "Bestiaire - Tonaltlan",
      titulo: "Bestiaire",
      subtitulo: "Créatures du Mictlan et bêtes des jungles et montagnes sacrées.",
      region: "Région",
      regiones: ["Mictlan", "Jungle", "Céleste"],
      ejemploAria: "Exemple de fiche de créature",
      ilustracion: "Illustration",
      stats: ["CA", "PV", "Vitesse"],
      atributos: ["FOR", "DEX", "CON", "INT", "SAG", "CHA"],
      acciones: "Actions",
    },
    monturas: {
      meta: "Montures - Tonaltlan",
      metaDesc: "Montures volantes, terrestres et aquatiques du monde de Tonaltlan.",
      titulo: "Montures",
      subtitulo: "Une galerie visuelle des montures du monde de Tonaltlan.",
    },
    galeria: {
      meta: "Galerie - Tonaltlan",
      metaDesc: "Illustrations et art visuel de l'univers de Tonaltlan.",
      titulo: "Galerie",
      subtitulo: "Toutes les illustrations disponibles du monde de Tonaltlan.",
    },
    explorar: {
      titulo: "Explorer Tonaltlan",
      subtitulo:
        "Le compendium vivant du monde mésoaméricain. Cherchez parmi les classes, espèces, créatures, montures et divinités.",
      buscar: "Rechercher dans le compendium...",
      entradas: "entrées",
      sinResultados: "Aucun résultat pour",
      tipos: { clase: "Classe", especie: "Espèce", deidad: "Divinité" },
    },
    mundo: {
      meta: "Le Monde - Tonaltlan",
      metaDesc: "Cosmovision, Points Tonal, régions et histoire du monde de Tonaltlan.",
      titulo: "Le Monde",
      secciones: { cosmovision: "Cosmovision", puntos: "Points Tonal", regiones: "Régions", historia: "Histoire" },
      mapaAlt: "Carte de Tonaltlan",
      cosmovisionAlt:
        "Illustration de la création : en haut, une figure double de lumière et d'obscurité ; au centre, une figure qui se fond avec le Soleil, entourée des forces de l'obscurité, de l'air, de l'eau, de la foudre et du feu, et d'un caïman céleste parmi des sphères ; en bas, la terre porte le monde.",
      puntosAlt:
        "Diagramme des Points Tonal : deux silhouettes humaines parcourues de courants d'énergie colorés jusqu'à un cercle sur la poitrine, avec au-dessus les sept emblèmes des dieux.",
    },
    juega: {
      meta: "Jouer - Tonaltlan",
      metaDesc:
        "Tout ce qu'il faut pour jouer à Tonaltlan : pour commencer, le Test d'Affinité, les téléchargements et les ressources pour MJ.",
      titulo: "Jouer",
      secciones: { empezar: "Pour commencer", afinidad: "Test d'Affinité", descargas: "Téléchargements", narradores: "Maîtres du jeu" },
      afinidadTitulo: "Test d'Affinité",
      afinidadTexto:
        "Découvrez avec quelle énergie raciale résonne votre énergie tonale. Répondez aux questions et trouvez votre affinité dans le monde de Tonaltlan.",
    },
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
    afinidad: {
      meta: "Test d'Affinité - Tonaltlan",
      titulo: "Test d'Affinité",
      subtitulo:
        "Découvre avec quelle énergie raciale résonne ton énergie tonale. Réponds aux questions et trouve ton affinité dans le monde de Tonaltlan.",
      paso: "Étape",
      de: "sur",
      nombre: "Nom",
      nombrePlaceholder: "Ton nom",
      email: "E-mail",
      emailPlaceholder: "toi@email.com",
      comenzar: "Commencer le test",
      aleatoria: "Affinité aléatoire",
      aleatoriaNota: "Mode fortune cookie : on te donne une affinité au hasard, sans répondre aux questions.",
      pregunta: "Question",
      ayuda: "Touche une option pour avancer automatiquement. Utilise Précédent pour corriger.",
      anterior: "Précédent",
      modoAleatorio: "Mode Fortune Aléatoire",
      tuAfinidad: "ton affinité",
      revelada: "Affinité révélée",
      simbolos: "Symboles sacrés",
      guardando: "Enregistrement de ton résultat...",
      guardado: "Résultat enregistré.",
      error: "Impossible d'enregistrer ton résultat. Réessaie dans quelques secondes.",
      reiniciar: "Refaire le test",
      toque: "Avec une touche de",
      conoce: "Découvre ton espèce",
      lecturaCompleta: "Lis ton portrait complet",
      eres: "tu es",
      preguntas: "questions",
      duracion: "environ une minute",
      reintentar: "Réessayer",
      compartir: "Partager mon résultat",
      preparando: "Préparation de ton image…",
      descargada: "Image téléchargée",
      compartirTexto: "Je suis {especie}, {arquetipo}. Et toi ? Découvre ton affinité dans Tonaltlan.",
      tarjetaPie: "Et toi ? Fais le test sur",
    },
  },
};

const diccionarios: Record<Lang, Diccionario> = { es, en, fr };

/** Textos de interfaz en el idioma pedido. */
export function t(lang: Lang): Diccionario {
  return diccionarios[lang];
}
