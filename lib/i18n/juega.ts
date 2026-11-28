import type { Lang } from "./idiomas";

/* Juega (/juega): la página que reúne el test y los juegos, con la línea de la tarjeta de cada uno. */

const es = {
  meta: "Juega - Tonaltlan",
  metaDesc:
    "Todo lo necesario para jugar en Tonaltlan: cómo empezar, Test de Afinidad, descargas y recursos para narradores.",
  titulo: "Juega",
  secciones: { empezar: "Cómo empezar", afinidad: "Test de Afinidad", danza: "Danza Tonal", dados: "Dados de los Siete", descargas: "Descargas", narradores: "Narradores" },
  afinidadTitulo: "Test de Afinidad",
  afinidadTexto:
    "Descubre con qué energía racial resuena tu energía tonal. Responde las preguntas y encuentra tu afinidad en el mundo de Tonaltlan.",
  danzaTexto: "Mira cómo brillan los glifos de los siete dioses, repite la danza y supera tu récord.",
  dadosTexto: "Tus dados de rol para la mesa: arma tu tirada, suma modificadores y tira con ventaja o desventaja.",
};

const en: typeof es = {
  meta: "Play - Tonaltlan",
  metaDesc:
    "Everything you need to play in Tonaltlan: getting started, the Affinity Test, downloads and game master resources.",
  titulo: "Play",
  secciones: { empezar: "Getting started", afinidad: "Affinity Test", danza: "Tonal Dance", dados: "Dice of the Seven", descargas: "Downloads", narradores: "Game Masters" },
  afinidadTitulo: "Affinity Test",
  afinidadTexto:
    "Discover which racial energy your tonal energy resonates with. Answer the questions and find your affinity in the world of Tonaltlan.",
  danzaTexto: "Watch the glyphs of the seven gods light up, repeat the dance and beat your best.",
  dadosTexto: "Your RPG dice for the table: build your roll, add modifiers and roll with advantage or disadvantage.",
};

const fr: typeof es = {
  meta: "Jouer - Tonaltlan",
  metaDesc:
    "Tout ce qu'il faut pour jouer à Tonaltlan : pour commencer, le Test d'Affinité, les téléchargements et les ressources pour MJ.",
  titulo: "Jouer",
  secciones: { empezar: "Pour commencer", afinidad: "Test d'Affinité", danza: "Danse Tonale", dados: "Dés des Sept", descargas: "Téléchargements", narradores: "Maîtres du jeu" },
  afinidadTitulo: "Test d'Affinité",
  afinidadTexto:
    "Découvrez avec quelle énergie raciale résonne votre énergie tonale. Répondez aux questions et trouvez votre affinité dans le monde de Tonaltlan.",
  danzaTexto: "Regarde briller les glyphes des sept dieux, répète la danse et bats ton record.",
  dadosTexto: "Tes dés de jeu de rôle pour la table : compose ton lancer, ajoute des modificateurs et lance avec avantage ou désavantage.",
};

export const juega: Record<Lang, typeof es> = { es, en, fr };
