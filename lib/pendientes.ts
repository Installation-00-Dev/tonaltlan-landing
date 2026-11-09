/* ============================================================
   CONTENIDO PENDIENTE
   Cada placeholder del sitio sale de esta lista. La pagina
   /pendientes la muestra completa como checklist.

   Cuando llegue el contenido real: reemplaza el <Pendiente id="..."/>
   en la pagina correspondiente y borra su entrada aqui.

   MOSTRAR_NECESIDADES = false oculta la lista de "Que se necesita"
   en las paginas publicas (queda solo el aviso "Proximamente").
   ============================================================ */
import { clases, deidades, especies } from "./data";

export const MOSTRAR_NECESIDADES = true;

export interface PendienteInfo {
  titulo: string;
  /** Pagina donde aparece el placeholder. */
  donde: string;
  necesita: string[];
  /** Pistas sacadas de textos que ya existen en el sitio. */
  pistas?: string[];
}

function sinArte(lista: { name: string; coverImageSrc?: string }[]) {
  return lista.filter((item) => !item.coverImageSrc).map((item) => item.name);
}

export const pendientes = {
  "mundo-cosmovision": {
    titulo: "Cosmovisión",
    donde: "/mundo#cosmovision",
    necesita: [
      "Texto introductorio: cómo se creó el mundo y quiénes lo sostienen (2 a 4 párrafos).",
      "Una ilustración horizontal para encabezar la sección.",
    ],
    pistas: [
      "Las fichas de deidades ya mencionan a Omet, el principio dual, y a los siete dioses.",
      "Tonatli se convierte en el Séptimo Sol.",
    ],
  },
  "mundo-puntos-tonal": {
    titulo: "Puntos Tonal",
    donde: "/mundo#puntos-tonal",
    necesita: [
      "Qué es un Punto Tonal y cuántos hay.",
      "Qué elemento o deidad corresponde a cada uno.",
      "Cómo se abren o despiertan durante el juego.",
      "Un diagrama o ilustración de los Puntos Tonal en el cuerpo.",
    ],
    pistas: [
      "Calti selló los Puntos Tonales de los Tlacas; solo los Eruditos de la Magia conservan el acceso.",
      "El Punto Tonal del Aire se siente primero como un murmullo (ficha de Heka).",
    ],
  },
  "mundo-regiones": {
    titulo: "Regiones y mapa",
    donde: "/mundo#regiones",
    necesita: [
      "Confirmar si el mapa de la Galería es el mapa oficial.",
      "Lista de regiones: nombre, descripción corta, clima, pueblos o especies que la habitan.",
      "Una imagen por región (opcional).",
    ],
    pistas: [
      "Ya se mencionan: la península de Xitl, el Volcán de la Lava Eterna, el Mictlan, la Torre de los Sabios y los cenotes.",
    ],
  },
  "mundo-historia": {
    titulo: "Historia y cronología",
    donde: "/mundo#historia",
    necesita: [
      "Las grandes eras o eventos en orden, con un título y 1 o 2 frases cada uno.",
    ],
    pistas: [
      "Eventos ya escritos: la creación de Omet, el sacrificio de Tonatli, el origen de los Tlacas y la maldición de Calti.",
    ],
  },
  omet: {
    titulo: "Omet",
    donde: "/deidades",
    necesita: [
      "Ficha de Omet: descripción, dominios y relación con los siete dioses.",
      "Ilustración (opcional: puede ser un símbolo en lugar de un retrato).",
    ],
  },
  "juega-como-empezar": {
    titulo: "Cómo empezar",
    donde: "/juega#como-empezar",
    necesita: [
      "Pasos para un grupo nuevo (3 a 5 pasos cortos).",
      "Qué materiales se necesitan para jugar (manuales de D&D 2024, dados, hojas…).",
      "Nivel recomendado para comenzar.",
    ],
  },
  "juega-descargas": {
    titulo: "Descargas",
    donde: "/juega#descargas",
    necesita: [
      "Los archivos para descargar (PDF): hojas de personaje, códices, mapas.",
      "Nombre, versión y una imagen de vista previa de cada archivo.",
    ],
  },
  "juega-narradores": {
    titulo: "Recursos para narradores",
    donde: "/juega#narradores",
    necesita: [
      "Tablas aleatorias, ganchos de aventura o encuentros de ejemplo.",
      "Consejos para dirigir partidas en Tonaltlan.",
    ],
  },
  bestiario: {
    titulo: "Criaturas del Bestiario",
    donde: "/bestiario",
    necesita: [
      "Por cada criatura: nombre, tipo, región, nivel de desafío y descripción.",
      "Estadísticas: CA, puntos de golpe, velocidad, FUE, DES, CON, INT, SAB, CAR.",
      "Rasgos y acciones.",
      "Ilustración (fondo transparente ideal).",
    ],
  },
  monturas: {
    titulo: "Fichas de Monturas",
    donde: "/monturas",
    necesita: [
      "Nombre oficial de cada montura (hoy se usa el nombre del archivo).",
      "Tipo: voladora, acuática o terrestre.",
      "Descripción corta y rasgos de juego (velocidad, carga, habilidades).",
    ],
  },
  galeria: {
    titulo: "Datos de la Galería",
    donde: "/galeria",
    necesita: [
      "Título oficial de cada ilustración (hoy se usa el nombre del archivo).",
      "Nombre del artista y una línea de descripción por obra.",
    ],
  },
  noticias: {
    titulo: "Noticias",
    donde: "/noticias",
    necesita: [
      "Primeras entradas: fecha, título, resumen de 2 a 3 frases e imagen.",
      "Temas sugeridos: avances del desarrollo, arte nuevo, playtests, eventos.",
    ],
  },
  nosotros: {
    titulo: "Nosotros",
    donde: "/nosotros",
    necesita: [
      "Historia de Cuevas & Quetzales: quiénes son y por qué crearon Tonaltlan.",
      "Equipo: nombre, rol y foto o avatar de cada persona.",
    ],
  },
  "especie-tlacas": {
    titulo: "Tlacas",
    donde: "/especies#tlacas",
    necesita: [
      "Ficha de los Tlacas: descripción, rasgos y nota de juego (como las demás especies).",
      "Etiquetas (3) e ilustración.",
    ],
    pistas: [
      "Intro de Especies: humanos sin una afinidad elemental predeterminada.",
      "Ficha de Tzal: los Tlacas fueron los primeros pueblos conscientes de Tonaltlan.",
      "Ficha de Calti: selló los Puntos Tonales de los Tlacas.",
    ],
  },
  "especies-arte": {
    titulo: "Arte de especies",
    donde: "/especies",
    necesita: sinArte(especies).map((nombre) => `Ilustración de ${nombre}.`),
  },
  "deidades-arte": {
    titulo: "Arte de deidades",
    donde: "/deidades",
    necesita: sinArte(deidades).map((nombre) => `Ilustración de ${nombre}.`),
  },
  "traduccion-ingles": {
    titulo: "Revisión de la traducción al inglés",
    donde: "/en/",
    necesita: [
      "Revisar el borrador en inglés de las fichas: lib/data.en.ts (clases, especies, deidades).",
      "Revisar el Test de Afinidad en inglés: lib/affinity-test.en.ts (tono coloquial adaptado).",
      "Revisar textos de la landing e interfaz (lib/i18n.ts) y del creador (lib/textos.ts, parte en inglés).",
      "Aprobar el glosario: Punto Tonal = Tonal Point, Torre de los Sabios = Tower of the Sages, Volcán Eterno = Eternal Volcano, Volcán de la Lava Eterna = Volcano of Eternal Lava, Bosques Obscuros = Dark Forests, Espejo Obscuro = Dark Mirror, Gran Caimán Celestial = Great Celestial Caiman, Séptimo Sol = Seventh Sun, Eruditos de la Magia = Scholars of Magic, Cíclopes de Tierra = Earth Cyclopes, Gema del Ánimo = Gem of Spirit, Danzante Tonal = Tonal Dancer.",
      "Confirmar los nombres que se dejaron en español: clases (Brujo Catemaco, Guerrero Otomi), lugares (Mictlan, Xitl, Zalan, Tl'atl) y objetos (Ixip, chimallis, ayoyotes).",
    ],
  },
  "clases-arte": {
    titulo: "Arte de clases",
    donde: "/clases",
    necesita: sinArte(clases).map((nombre) => `Ilustración de ${nombre}.`),
  },
} satisfies Record<string, PendienteInfo>;

export type PendienteId = keyof typeof pendientes;

/** Titulos en ingles de cada placeholder (en /en solo se muestra "Coming soon" + titulo). */
export const titulosEn: Partial<Record<PendienteId, string>> = {
  "mundo-cosmovision": "Worldview",
  "mundo-puntos-tonal": "Tonal Points",
  "mundo-regiones": "Regions and map",
  "mundo-historia": "History and timeline",
  omet: "Omet",
  "juega-como-empezar": "Getting started",
  "juega-descargas": "Downloads",
  "juega-narradores": "Game master resources",
  bestiario: "Bestiary creatures",
  monturas: "Mount profiles",
  galeria: "Gallery details",
  noticias: "News",
  nosotros: "About us",
  "especie-tlacas": "Tlacas",
  "especies-arte": "Species art",
  "deidades-arte": "Deity art",
  "clases-arte": "Class art",
  "traduccion-ingles": "English translation review",
};
