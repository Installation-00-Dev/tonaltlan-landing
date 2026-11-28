import type { Lang } from "./idiomas";

/* El Mundo (/mundo): Cosmovisión, Puntos Tonal y Regiones. */

const es = {
  meta: "El Mundo - Tonaltlan",
  metaDesc: "Cosmovisión, Puntos Tonal, regiones e historia del mundo de Tonaltlan.",
  titulo: "El Mundo",
  secciones: { cosmovision: "Cosmovisión", puntos: "Puntos Tonal", regiones: "Regiones" },
  mapaAlt: "Mapa de Tonaltlan",
  cosmovisionAlt:
    "Ilustración de la creación: en lo alto, una figura dual de luz y obscuridad; al centro, una figura que se funde con el Sol, rodeada por fuerzas de la obscuridad, el aire, el agua, el rayo y el fuego, y por un caimán celeste entre esferas; abajo, la tierra sostiene el mundo.",
  puntosAlt:
    "Diagrama de los Puntos Tonal: dos figuras humanas con corrientes de energía de colores que recorren el cuerpo hasta un círculo en el pecho, y arriba los siete emblemas de los dioses.",
  /** Las tres capas de la figura de los Puntos Tonal, en orden. */
  figurasAlt: [
    "Silueta de una figura de cuatro brazos y cuatro piernas dentro de un círculo y un cuadrado.",
    "La misma figura con un círculo en el pecho que reúne los siete emblemas de los dioses.",
    "La figura con corrientes de energía de colores que salen del círculo del pecho y recorren todo el cuerpo.",
  ],
};

const en: typeof es = {
  meta: "The World - Tonaltlan",
  metaDesc: "Worldview, Tonal Points, regions and history of the world of Tonaltlan.",
  titulo: "The World",
  secciones: { cosmovision: "Worldview", puntos: "Tonal Points", regiones: "Regions" },
  mapaAlt: "Map of Tonaltlan",
  cosmovisionAlt:
    "Illustration of the creation: above, a dual figure of light and darkness; at the center, a figure merging with the Sun, surrounded by forces of darkness, air, water, lightning and fire, and by a celestial caiman among spheres; below, the earth holds up the world.",
  puntosAlt:
    "Diagram of the Tonal Points: two human figures with colored currents of energy running through the body to a circle on the chest, with the seven emblems of the gods above.",
  /** Las tres capas de la figura de los Puntos Tonal, en orden. */
  figurasAlt: [
    "Silhouette of a figure with four arms and four legs inside a circle and a square.",
    "The same figure with a circle on the chest that gathers the seven emblems of the gods.",
    "The figure with colored currents of energy flowing from the circle on the chest through the whole body.",
  ],
};

const fr: typeof es = {
  meta: "Le Monde - Tonaltlan",
  metaDesc: "Cosmovision, Points Tonal, régions et histoire du monde de Tonaltlan.",
  titulo: "Le Monde",
  secciones: { cosmovision: "Cosmovision", puntos: "Points Tonal", regiones: "Régions" },
  mapaAlt: "Carte de Tonaltlan",
  cosmovisionAlt:
    "Illustration de la création : en haut, une figure double de lumière et d'obscurité ; au centre, une figure qui se fond avec le Soleil, entourée des forces de l'obscurité, de l'air, de l'eau, de la foudre et du feu, et d'un caïman céleste parmi des sphères ; en bas, la terre porte le monde.",
  puntosAlt:
    "Diagramme des Points Tonal : deux silhouettes humaines parcourues de courants d'énergie colorés jusqu'à un cercle sur la poitrine, avec au-dessus les sept emblèmes des dieux.",
  /** Las tres capas de la figura de los Puntos Tonal, en orden. */
  figurasAlt: [
    "Silhouette d'une figure à quatre bras et quatre jambes dans un cercle et un carré.",
    "La même figure avec, sur la poitrine, un cercle qui réunit les sept emblèmes des dieux.",
    "La figure parcourue de courants d'énergie colorés qui partent du cercle de la poitrine et traversent tout le corps.",
  ],
};

export const mundo: Record<Lang, typeof es> = { es, en, fr };
