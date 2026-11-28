import type { Lang } from "./idiomas";

/* Landing: Hero, ¿Qué es Tonaltlan?, mosaico del compendio, de un Vistazo y Mantente Informado. */

const es = {
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
      { title: "Clases", description: "Brujo Catemaco, Guerrero Otomi, Mitotiani y Tlapali.", tags: ["Combate", "Magia", "Sigilo"] },
      { title: "Especies", description: "Seres nacidos del maíz, la obsidiana y el aliento de los dioses.", tags: ["He'kari", "Hualik", "Irzak"] },
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
};

const en: typeof es = {
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
      { title: "Classes", description: "Brujo Catemaco, Guerrero Otomi, Mitotiani and Tlapali.", tags: ["Combat", "Magic", "Stealth"] },
      { title: "Species", description: "Beings born of maize, obsidian and the breath of the gods.", tags: ["He'kari", "Hualik", "Irzak"] },
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
};

const fr: typeof es = {
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
      { title: "Classes", description: "Brujo Catemaco, Guerrero Otomi, Mitotiani et Tlapali.", tags: ["Combat", "Magie", "Discrétion"] },
      { title: "Espèces", description: "Des êtres nés du maïs, de l'obsidienne et du souffle des dieux.", tags: ["He'kari", "Hualik", "Irzak"] },
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
};

export const inicio: Record<Lang, typeof es> = { es, en, fr };
