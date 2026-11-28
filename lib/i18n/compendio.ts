import type { Lang } from "./idiomas";

/* Compendio: Clases, Especies, Deidades, fichas de detalle, Bestiario, Monturas, Galería y Explorar. */

const es = {
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
    stats: ["CA", "PG", "Velocidad"],
    atributos: ["FUE", "DES", "CON", "INT", "SAB", "CAR"],
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
};

const en: typeof es = {
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
    stats: ["AC", "HP", "Speed"],
    atributos: ["STR", "DEX", "CON", "INT", "WIS", "CHA"],
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
};

const fr: typeof es = {
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
    stats: ["CA", "PV", "Vitesse"],
    atributos: ["FOR", "DEX", "CON", "INT", "SAG", "CHA"],
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
};

export const compendio: Record<Lang, typeof es> = { es, en, fr };
