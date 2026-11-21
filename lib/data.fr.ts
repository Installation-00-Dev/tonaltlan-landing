/* ============================================================
   COMPENDIUM EN FRANÇAIS — brouillon de traduction de lib/data.ts.
   En attente de relecture (voir /pendientes, "traduccion-frances").
   Garder les slugs, les images et `deidad` identiques au fichier espagnol.
   Les noms propres mésoaméricains et les noms de personnages ne sont PAS
   traduits (Mictlan, Xitl, Ixip, Brujo Catemaco, Guerrero Otomi...).
   ============================================================ */

import type { CompendiumEntry } from "./data";
import { bestiaryImages, galleryImages, mountImages } from "./site";

// ── CLASSES ─────────────────────────────────────────────────
export const clases: CompendiumEntry[] = [
  {
    name: "Brujo Catemaco",
    slug: "brujo-catemaco",
    description:
      "Les Catemacos sont des sorciers artisans originaires des régions marécageuses du royaume de Tl’atl. Leur pouvoir ne vient ni des livres ni de pactes avec des entités inconnues, mais du lien spirituel qu'ils tissent avec un Ixip, une poupée tonale sculptée de leurs propres mains et animée par un rituel ancestral.",
    tags: ["Invocateur", "Multi-tonal", "Distance"],
    coverImageSrc: "/images/Brujo_Catemaco.webp",
    coverImageAlt: "Un Brujo Catemaco aux côtés de son Ixip dans une grotte du royaume de Tl'atl.",
    sections: [
      {
        title: "Description",
        content:
          "Les Catemacos sont des sorciers artisans originaires des régions marécageuses du royaume de Tl’atl. Leur pouvoir ne vient ni des livres ni de pactes avec des entités inconnues, mais du lien spirituel qu'ils tissent avec un Ixip, une poupée tonale sculptée de leurs propres mains et animée par un rituel ancestral.\n\nAu fil de son apprentissage, le Catemaco partage une part de son essence avec sa création jusqu'à ce qu'une force élémentaire endormie s'éveille en elle. L'Ixip devient alors un allié vivant qui canalise l'énergie des éléments et agit comme le prolongement de la volonté de son créateur.\n\nAu combat comme en voyage, le Catemaco et son Ixip agissent comme un seul être : le sorcier dirige et planifie tandis que la création exécute les manœuvres tonales. Pour beaucoup de peuples, ce sont des figures mystérieuses et redoutées, médiatrices entre les esprits du marais et le monde des mortels.",
      },
      {
        title: "Note",
        content:
          "Idéal pour les joueurs qui aiment anticiper chaque mouvement et contrôler le champ de bataille grâce à un allié magique.",
      },
    ],
  },
  {
    name: "Guerrero Otomi",
    slug: "guerrero-otomi",
    description:
      "Défenseurs de Zalan. Les Guerreros Otomi sont la milice d'élite du nord de Tonaltlan et les porteurs du Point Tonal de la Terre.",
    tags: ["Tank", "Corps à corps", "Tonal de Terre"],
    coverImageSrc: "/images/Otomi.webp",
    coverImageAlt: "Un Guerrero Otomi en armure lourde, étendard de guerre en main, en première ligne.",
    sections: [
      {
        title: "Description",
        content:
          "Défenseurs de Zalan.\n\nLes Guerreros Otomi sont la milice d'élite du nord de Tonaltlan et les porteurs du Point Tonal de la Terre. Leur but n'est pas la gloire personnelle, mais de tenir la ligne de bataille et de protéger leur peuple sans jamais reculer. Là où un Otomi plante son étendard, la bataille tient.\n\nVêtus d'armures lourdes, portant des chimallis géométriques et des étendards de guerre, les Otomi incarnent l'endurance. Leur présence sur le champ de bataille transforme le chaos en une formation solide où les alliés trouvent refuge et où les ennemis se heurtent à un mur impossible à briser.\n\nUn Otomi ne se précipite pas au combat. C'est le combat qui vient à lui.",
      },
      {
        title: "Note",
        content:
          "Idéal pour les joueurs qui aiment protéger leur équipe et mener la ligne de front, attirés par des personnages robustes capables d'encaisser les dégâts pendant que le reste du groupe combat en sécurité. Cette classe est parfaite pour ceux qui préfèrent un style de combat frontal et autoritaire, où leur présence décide de l'endroit où se livre la bataille. Si tu rêves de devenir le bouclier du groupe, de tenir la formation et d'être le pilier sur lequel toute l'équipe s'appuie, le Guerrero Otomi est ta voie.",
      },
    ],
  },
  {
    name: "Mitotiani",
    slug: "mitotiani",
    description:
      "Danseur Tonal. Des guerriers ritualistes qui canalisent l'énergie du Tonal à travers des danses sacrées.",
    tags: ["Mobilité", "Soutien", "Multi-tonal"],
    coverImageSrc: "/images/Mitotiani.webp",
    coverImageAlt: "Un Mitotiani exécutant une danse rituelle sur des glyphes tonals.",
    sections: [
      {
        title: "Description",
        content:
          "Danseur Tonal.\n\nLes Mitotiani sont des guerriers ritualistes qui canalisent l'énergie du Tonal à travers des danses sacrées. Chaque pas, chaque tour et chaque coup de leurs ayoyotes contre le sol laisse des marques de pouvoir qui apparaissent comme des glyphes rituels, modifiant le champ de bataille et guidant l'énergie des éléments.\n\nContrairement aux autres combattants, les Mitotiani ne dépendent pas des armes traditionnelles. Leur propre corps est leur instrument de combat. Ils ne combattent qu'avec les jambes et les pieds, en portant des coups de pied, des balayages et des dagues lancées depuis leurs ayoyotes. Pendant la danse, leurs mains restent immobiles dans leur dos, préservant l'équilibre et la pureté du rituel. Tenir une arme briserait le rythme de la danse et affaiblirait leur lien avec le Tonal.\n\nPar leurs danses, ils peuvent renforcer leurs alliés, affaiblir leurs ennemis ou transformer le sol lui-même en scène rituelle où le combat devient une chorégraphie de pouvoir élémentaire.\n\nUn Mitotiani ne se contente pas de combattre. Il fait de la bataille un rituel.",
      },
      {
        title: "Note",
        content:
          "Idéal pour les joueurs qui aiment les personnages rapides et créatifs, en mouvement constant sur le champ de bataille, qui utilisent leur position et leurs capacités pour changer le rythme du combat. Cette classe est parfaite pour ceux qui préfèrent un style de jeu dynamique, où la mobilité, le contrôle du terrain et le travail d'équipe comptent plus que la force brute.",
      },
    ],
  },
  {
    name: "Tlapali",
    slug: "tlapali",
    description:
      "Porteur du Sang Tonal. Les gardiens d'un savoir rituel interdit qui plie le sang pour affaiblir et contrôler.",
    tags: ["Contrôleur", "Affaiblissement", "Sceaux de sang"],
    coverImageSrc: "/images/Tlapali.webp",
    coverImageAlt: "Un Tlapali marqué de symboles de sang tonal au cours d'un rituel obscur.",
    sections: [
      {
        title: "Description",
        content:
          "Porteur du Sang Tonal.\n\nLe Tlapali est une figure presque mythique. Dans les royaumes, beaucoup croient que cette discipline a disparu il y a des siècles au cœur des Forêts Obscures, mais en vérité, quelques initiés gardent encore ce savoir rituel interdit.\n\nLeur pouvoir naît d'une énergie tonale unique, l'union de l'Obscurité et de l'Eau, qui leur permet de façonner le sang comme médium rituel pour marquer leurs ennemis, affaiblir leur essence vitale et changer l'issue d'un combat. Les Tlapali utilisent des sceaux de sang qu'ils déclenchent sur leurs cibles, les usant peu à peu tandis que l'ennemi reste pris dans un cycle de douleur, d'usure et de contrôle.\n\nÀ cause de leur maîtrise du sang, les Tlapali sont craints et évités par beaucoup. Chacun porte un symbole peint avec du sang sur le visage, signe de son lien avec cette tradition ancestrale. Bien que la plupart restent isolés dans les forêts, certains quittent leur terre pour parcourir le monde et prouver que leur art n'est pas seulement destruction, mais aussi pouvoir et connaissance.\n\nUn Tlapali ne cherche pas à vaincre son ennemi d'un seul coup. Il le marque et laisse le sang faire son œuvre.",
      },
      {
        title: "Note",
        content:
          "Cette classe est idéale pour ceux qui préfèrent orienter le déroulement du combat, contrôler les ennemis et soutenir le groupe par des effets qui réduisent les capacités de l'adversaire. Elle plaira aussi aux joueurs qui aiment les mécaniques uniques fondées sur la préparation et le déclenchement de capacités, et à ceux qu'attirent les personnages sombres et ritualistes, enveloppés d'une aura de mystère.",
      },
    ],
  },
];

// ── ESPÈCES ─────────────────────────────────────────────────
export const especies: CompendiumEntry[] = [
  {
    name: "He'kari",
    slug: "hekari",
    deidad: "heka",
    description: "Enfants de Heka. Descendants de la déesse du vent : agiles, expressifs et porteurs de paroles qui changent le destin.",
    tags: ["Agilité", "Social", "Vent"],
    coverImageSrc: "/images/especies/Hekari_retrato.webp",
    coverImageAlt: "Un He'kari aux cheveux ondoyants et aux yeux vert jade, en mouvement.",
    sections: [
      {
        title: "Description",
        content:
          "Enfants de Heka.\n\nLes He'kari sont les descendants de Heka, déesse du vent. Grands, élancés et légers dans leurs mouvements, ils semblent se déplacer avec la même fluidité qu'un courant d'air. Leurs cheveux restent rarement immobiles et leurs yeux vert jade reflètent une curiosité constante pour le monde.\n\nÀ Tonaltlan, on les connaît comme artistes, messagers, espions et gardiens du savoir, car leur voix et leur présence possèdent une qualité presque hypnotique. Les He'kari croient que les mots voyagent comme le vent, et que même le plus petit murmure peut changer le destin du monde.\n\nTraits\n\nAffinité avec l'Air : les He'kari n'ont pas besoin de respirer et sont immunisés contre les gaz et poisons inhalés.\n\nLégèreté du Vent : leur corps est naturellement adapté à l'agilité et au mouvement.",
      },
      {
        title: "Note",
        content:
          "Les He'kari excellent dans les styles de jeu axés sur la mobilité, l'exploration et l'interaction sociale, ce qui en fait un excellent choix pour des personnages agiles, curieux et expressifs.",
      },
    ],
  },
  {
    name: "Hualik",
    slug: "hualik",
    deidad: "calti",
    description: "Enfants de Calti. Descendants de la déesse de l'obscurité et du silence : rares et mystérieux habitants des ombres.",
    tags: ["Discrétion", "Stratégie", "Obscurité"],
    coverImageSrc: "/images/especies/Hualik_retrato.webp",
    coverImageAlt: "Un Hualik à la peau violet sombre entouré de volutes d'ombre.",
    sections: [
      {
        title: "Description",
        content:
          "Enfants de Calti.\n\nLes Hualik sont les descendants de Calti, déesse de l'obscurité et du silence. C'est l'une des espèces les plus rares et les plus mystérieuses de Tonaltlan, si peu nombreuse que beaucoup croient qu'elle n'existe que dans les légendes.\n\nLeur peau sombre absorbe la lumière et leur présence semble éteindre les sons alentour. Totalement glabres et aux traits acérés, leurs yeux blancs ressortent même dans la pénombre. Les Hualik se déplacent avec une immobilité troublante, comme s'ils faisaient naturellement partie des ombres.\n\nIls ne forment ni royaumes ni grandes sociétés. Ils préfèrent vivre isolés dans des grottes, des ruines ou des forêts profondes, observant le monde à distance. Beaucoup les appellent les yeux de la nuit, témoins silencieux des événements du continent.\n\nTraits\n\nFusion avec les Ombres : les Hualik peuvent se déplacer et se cacher dans l'obscurité avec une facilité surnaturelle.\n\nVision nocturne supérieure : ils voient avec une grande clarté même dans l'obscurité la plus profonde.",
      },
      {
        title: "Note",
        content:
          "Les Hualik excellent dans les styles de jeu fondés sur la discrétion, l'observation et la stratégie, ce qui en fait un excellent choix pour des personnages qui préfèrent agir depuis les ombres, au moment parfait.",
      },
    ],
  },
  {
    name: "Irzak",
    slug: "irzak",
    deidad: "zilo",
    description: "Enfants de Zilo. Originaires de la péninsule volcanique de Xitl : fiers, intenses et guidés par un honneur inébranlable.",
    tags: ["Feu", "Combat frontal", "Honneur"],
    coverImageSrc: "/images/especies/Irzak_retrato.webp",
    coverImageAlt: "Un Irzak au regard ambré et à la présence ardente, forgé par la terre volcanique.",
    sections: [
      {
        title: "Description",
        content:
          "Enfants de Zilo.\n\nLes Irzak viennent de la péninsule volcanique de Xitl, une terre dominée par le feu, la pierre brûlante et le grondement constant du Volcan Éternel. Forgés dans ce milieu extrême, les Irzak sont connus pour leur caractère intense, leur fierté et leur code d'honneur inébranlable.\n\nIls croient que chaque âme est une étincelle offerte par Zilo, seigneur du feu, et que leur devoir est de brûler avec passion toute leur vie avant de retourner au grand brasier divin. C'est pourquoi ils vivent intensément : ils combattent avec courage, aiment avec force et honorent leurs alliés d'une loyauté absolue.\n\nLeur corps reflète la puissance du volcan : une peau aux tons de terre cuite ou de bronze, des yeux ambrés ou rouges comme des braises, et des cheveux qui semblent bouger comme des flammes vivantes. Chez eux, les barbes rousses ou cuivrées sont un symbole de fierté, de force et de maturité.\n\nTraits\n\nForgés dans les Flammes : les Irzak possèdent une forte résistance au feu.\n\nÉtincelle de Zilo : l'énergie du feu vit en eux et leur permet de faire naître de petites flammes et de canaliser le pouvoir igné.",
      },
      {
        title: "Note",
        content:
          "Les Irzak excellent dans les styles de jeu agressifs et directs, ce qui en fait un excellent choix pour des personnages qui préfèrent le combat frontal, la force de volonté et le pouvoir du feu. Ils conviennent particulièrement aux classes martiales ou aux personnages qui canalisent l'énergie élémentaire.",
      },
    ],
  },
  {
    name: "Lok'Naa",
    slug: "lok-naa",
    deidad: "lok",
    description: "Enfants de Lok. Descendants du dieu de l'eau : sereins, sages et liés aux mers, aux cénotes et aux rivières.",
    tags: ["Soutien", "Exploration", "Eau"],
    coverImageSrc: "/images/especies/Lok-Naa_retrato.webp",
    coverImageAlt: "Un Lok'Naa à la peau turquoise enveloppé de courants d'eau.",
    sections: [
      {
        title: "Description",
        content:
          "Enfants de Lok.\n\nLes Lok'Naa sont les descendants de Lok, dieu de l'eau, et portent dans leur corps l'essence des mers, des cénotes et des rivières de Tonaltlan. Leur présence dégage un calme profond, comme si le murmure de l'eau les accompagnait partout où ils vont.\n\nLeur peau présente des tons aquatiques, des bleus doux aux verts jade ou aux turquoises profonds. Leurs cheveux flottent sans cesse comme s'ils étaient immergés, et leurs yeux reflètent des couleurs marines qui évoquent la sérénité des eaux calmes.\n\nLes Lok'Naa sont connus pour leur nature paisible, leur sagesse émotionnelle et leur lien profond avec l'eau. Partout à Tonaltlan, on les reconnaît comme guérisseurs, gardiens des cénotes et explorateurs des profondeurs, capables de se mouvoir sous l'eau avec une aisance extraordinaire.\n\nTraits\n\nAdaptation aquatique : les Lok'Naa peuvent rester longtemps sous l'eau sans avoir besoin de remonter respirer.\n\nPrésence sereine : leur nature calme et empathique leur permet d'influencer positivement leur entourage.",
      },
      {
        title: "Note",
        content:
          "Les Lok'Naa excellent dans les styles de jeu axés sur le soutien, l'exploration et le lien avec l'eau, ce qui en fait un excellent choix pour des personnages qui préfèrent le calme, la sagesse et la résilience à l'affrontement direct.",
      },
    ],
  },
  {
    name: "Quinametzin",
    slug: "quinametzin",
    deidad: "tzal",
    description: "Enfants de Tzal. Descendants de la déesse de la terre : anciens, nobles et piliers de leur communauté.",
    tags: ["Résistance", "Protection", "Terre"],
    coverImageSrc: "/images/especies/Quinametzin_retrato.webp",
    coverImageAlt: "Un Quinametzin à la peau de pierre, une gemme rouge incrustée dans le genou.",
    sections: [
      {
        title: "Description",
        content:
          "Enfants de Tzal.\n\nLes Quinametzin sont les enfants de Tzal, déesse de la terre, et l'une des espèces les plus anciennes et les plus nobles de Tonaltlan. De stature colossale et de carrure puissante, leur présence impose le respect, mais leur nature est étonnamment sereine et bienveillante. Là où vit un Quinametzin, il devient souvent un pilier de la communauté.\n\nLeur peau a la texture de la pierre, avec des tons qui rappellent le granit, l'obsidienne ou le jade. Avec les années, de petites fissures apparaissent à sa surface, formant une carte naturelle des expériences de leur vie.\n\nChaque Quinametzin naît avec une gemme incrustée dans le corps, manifestation physique de son esprit. Cette gemme change de couleur selon ses émotions, révélant son état intérieur et lui rendant presque impossible de cacher ses vrais sentiments.\n\nTraits\n\nPeau de pierre : la peau des Quinametzin possède la dureté de la roche, ce qui leur confère une résistance naturelle exceptionnelle.\n\nGemme de l'Âme : chaque Quinametzin possède une gemme qui reflète ses émotions et renforce son lien avec les autres.",
      },
      {
        title: "Note",
        content:
          "Les Quinametzin excellent dans les styles de jeu axés sur la résistance, la protection et le travail d'équipe, ce qui en fait un excellent choix pour des personnages forts, protecteurs et profondément loyaux envers leur communauté.",
      },
    ],
  },
  {
    name: "Toh'kari",
    slug: "tohkari",
    deidad: "tohui",
    description: "Enfants de Tohuí. Descendants du dieu de la destruction et de la foudre : imprévisibles et chargés d'énergie.",
    tags: ["Foudre", "Volatil", "Nomade"],
    coverImageSrc: "/images/especies/Tohkari_retrato.webp",
    coverImageAlt: "Un Toh'kari aux cheveux hérissés entouré d'éclairs.",
    sections: [
      {
        title: "Description",
        content:
          "Enfants de Tohuí.\n\nLes Toh'kari sont les descendants de Tohuí, dieu de la destruction et de la foudre. Leur présence est comme le calme tendu avant un éclair : imprévisible, dangereuse et chargée d'énergie. C'est l'une des espèces les plus craintes et les plus évitées de Tonaltlan, connue pour sa nature explosive et son lien direct avec le pouvoir de la foudre.\n\nLeur peau grisâtre semble chargée d'électricité statique, et les marques sur leurs mains et leurs avant-bras (comme des cicatrices d'éclairs) brillent lorsqu'ils manipulent l'énergie. Leurs yeux d'un ambre intense et leurs cheveux hérissés par l'électricité révèlent la tempête qui les habite.\n\nLes Toh'kari ne bâtissent ni empires ni cités. Ils vivent en nomades ou en petits groupes errants, guidés par leurs impulsions, leur quête de pouvoir et la nature indomptable de la tempête qui les définit.\n\nTraits\n\nAffinité avec la Tempête : les Toh'kari possèdent un lien naturel avec l'énergie électrique et peuvent manipuler de petites décharges.\n\nPerception électrique : ils peuvent sentir les courants d'énergie qui les entourent, comme des orages proches ou des sources de pouvoir magique.",
      },
      {
        title: "Note",
        content:
          "Les Toh'kari sont une espèce intense et volatile, idéale pour les joueurs qui aiment les personnages imprévisibles, impulsifs et difficiles à cerner. Leur force réside dans leur énergie chaotique et leur nature sauvage, ce qui en fait des personnages qui se distinguent souvent par leur présence et leur impact sur l'histoire.",
      },
    ],
  },
  {
    name: "Ton",
    slug: "ton",
    deidad: "tonatli",
    description: "Enfants de Tonatli. Porteurs de la dernière étincelle du soleil, à l'aura lumineuse et à l'honnêteté absolue.",
    tags: ["Lumière", "Sagesse", "Honnêteté"],
    coverImageSrc: "/images/especies/Ton_retrato.webp",
    coverImageAlt: "Un Ton aux cheveux dorés qui irradie de lumière.",
    sections: [
      {
        title: "Description",
        content:
          "Enfants de Tonatli.\n\nLes Ton sont les descendants de Tonatli, déesse de la lumière primordiale. C'est une espèce extrêmement rare, mentionnée dans d'anciens chants et des fresques dorées comme porteuse de la dernière étincelle du soleil. Leur présence est inimitable : leur peau irradie une lumière chaude et leur aura illumine les alentours comme s'ils portaient en eux une petite aube.\n\nRace de lumière\n\nLeur corps émet un éclat naturel qui s'intensifie avec leurs émotions. Lorsqu'ils ressentent de la joie, de la tristesse ou de la colère, leur lumière peut devenir si intense qu'elle éclaire de grandes distances. Leurs cheveux, aux tons dorés et orangés, sont aussi solides que la lumière elle-même et ne peuvent être ni coupés ni détruits.\n\nRace de lumière\n\nLes Ton sont connus pour leur honnêteté absolue, car ils ne peuvent pas mentir. Beaucoup vivent comme sages, protecteurs ou gardiens du savoir, consacrant leur longue vie à aider les autres peuples et à préserver la mémoire du monde.\n\nTraits\n\nLumière intérieure : les Ton émettent une lumière naturelle qui peut éclairer leur entourage.\n\nSincérité absolue : les Ton ne peuvent pas mentir, leur nature les oblige à être complètement honnêtes.",
      },
      {
        title: "Note",
        content:
          "Les Ton sont une espèce rare et légendaire, idéale pour des personnages sages, protecteurs ou des figures morales au sein d'une histoire. Leur nature lumineuse et leur sincérité en font des individus difficiles à cacher, mais profondément dignes de confiance et respectés.",
      },
    ],
  },
  {
    name: "Tlacas",
    slug: "tlaca",
    description: "Les tlacas sont une espèce à la vie brève, mais à la volonté inébranlable.",
    tags: [],
    coverImageSrc: "/images/especies/Tlaca_retrato.webp",
    coverImageAlt: "Un couple de Tlacas, une femme et un homme, en tenue mésoaméricaine.",
    sections: [
      {
        title: "Description",
        content:
          "Les tlacas sont une espèce à la vie brève, mais à la volonté inébranlable. Contrairement aux autres espèces de Tonaltlan, peu d'entre eux parviennent à éveiller leur point tonal ; ils ont donc appris à survivre grâce à l'ingéniosité, à l'adaptation et à la persévérance.\n\nConsidérés comme abandonnés par les dieux, ils ont trouvé leur foyer à Yecan, une cité de la Zone du Silence, où l'énergie tonale ne fonctionne pas et où les avantages des autres espèces disparaissent.\n\nIls ne possèdent pas de grands dons, mais ils ont quelque chose que peu peuvent égaler : la capacité de s'adapter, de résister et de surmonter n'importe quelle adversité.\n\nCar dans un monde gouverné par le tonal, les tlacas prouvent que le véritable pouvoir naît aussi de la volonté.",
      },
    ],
  },
];

// ── BESTIAIRE ───────────────────────────────────────────────
export const bestiario: CompendiumEntry[] = [];

// ── MONTURES ────────────────────────────────────────────────
export const monturas: CompendiumEntry[] = [];

// ── DIVINITÉS ───────────────────────────────────────────────
export const deidades: CompendiumEntry[] = [
  {
    name: "Heka",
    slug: "heka",
    description: "Dame de l'Air. Déesse du vent, des murmures et des chemins invisibles du ciel.",
    tags: ["Air", "Vent", "Murmures"],
    coverImageSrc: "/images/Heka.webp",
    coverImageAlt: "Heka, divinité de l'air, enveloppée de courants et de brise céleste.",
    sections: [
      {
        title: "Description",
        content:
          "Dame de l'Air.\n\nHeka est la déesse du vent, des murmures et des chemins invisibles du ciel. On dit que sa présence ne se voit jamais directement, mais qu'elle se sent toujours : dans la brise qui guide les voyageurs, dans le chant des feuilles et dans le souffle qui pousse les oiseaux vers l'horizon.\n\nParmi les dieux du Panthéon, Heka est connue pour son esprit libre et son cœur compatissant. Contrairement à ses frères et sœurs, qui gouvernent de loin, elle écoute souvent les prières des mortels qui parlent au vent.\n\nLes érudits de la Tour des Sages croient que ceux qui parviennent à ouvrir le Point Tonal de l'Air entendent d'abord son appel comme un doux murmure à l'oreille.",
      },
    ],
  },
  {
    name: "Lok",
    slug: "lok",
    description: "Dieu de l'Eau. Dernière divinité primordiale créée par Omet, seigneur de la fluidité, de l'empathie et du mouvement de l'eau.",
    tags: ["Eau", "Calme", "Guérison"],
    coverImageSrc: "/images/Lok.webp",
    coverImageAlt: "Lok, dieu de l'eau, entouré de courants sereins et d'eaux sacrées.",
    sections: [
      {
        title: "Description",
        content:
          "Dieu de l'Eau.\n\nLok est la dernière divinité primordiale créée par Omet et le plus jeune des dieux. Contrairement à ses frères et sœurs, il n'est pas né enveloppé d'un pouvoir violent ou de forces écrasantes, mais comme un doux murmure qui apporta au monde la fluidité, l'empathie et le mouvement de l'eau.\n\nLorsqu'il contempla sa création pour la première fois, Lok fut empli d'une joie si profonde que ses larmes inondèrent son propre monde, formant rivières, mers et courants. Omet comprit alors que Lok devait apprendre à contenir ses émotions pour que son pouvoir ne détruise pas ce qu'il voulait protéger.\n\nConciliant de nature, Lok chercha toujours l'harmonie entre ses frères et sœurs. Pourtant, lorsque Tonatli se sacrifia pour devenir la Lumière éternelle, la douleur de Lok fut si grande qu'il choisit de retenir ses larmes pour ne pas provoquer une nouvelle catastrophe. Pour maîtriser ses émotions, il entra dans une méditation profonde, réfugié dans le monde de Tzal.\n\nMême dans son silence, son essence continua de s'infiltrer dans la terre. Partout où une larme lui échappait naissaient des cénotes : des eaux profondes considérées comme des portes de calme et de guérison.",
      },
    ],
  },
  {
    name: "Tzal",
    slug: "tzal",
    description: "Mère de la Terre. Déesse du fondement, de la stabilité et de la permanence sur laquelle fleurit la vie.",
    tags: ["Terre", "Vie", "Stabilité"],
    coverImageSrc: "/images/Tzal.webp",
    coverImageAlt: "Tzal, mère de la terre, entourée de racines, de montagnes et d'argile sacrée.",
    sections: [
      {
        title: "Description",
        content:
          "Mère de la Terre.\n\nTzal est la déesse de la terre et le fondement sur lequel repose toute vie. Bien qu'elle ne fût pas la première à surgir de la création d'Omet, il apparut vite que sa nature était différente de celle de ses frères et sœurs. Tandis que d'autres dieux manifestaient leur pouvoir sous forme de chaos, de feu ou de tempête, Tzal incarnait la stabilité, l'ordre et la permanence.\n\nLorsque les dieux tentèrent de créer leurs propres mondes, tous échouèrent : certains furent inondés, d'autres brûlèrent ou s'effondrèrent. Seul le monde de Tzal prospéra, car elle le façonna avec patience et vision. Elle le plaça près de la lumière éternelle de Tonatli, pour honorer son sacrifice et permettre à la vie de fleurir sous son éclat.\n\nVoyant que le monde de Tzal pouvait soutenir l'existence, les sept dieux unirent pour la première fois leurs pouvoirs afin de le parfaire. Chacun apporta son essence : lumière, nuit, énergie, vent, feu et eau. Mais le corps du monde, son sol, ses montagnes et ses racines, appartenait à Tzal.\n\nDésireuse de créer des êtres conscients qui parcourraient sa terre, Tzal descendit au Mictlan, où les seigneurs de la mort gardaient les os de ses anciennes créations : les Cyclopes de Terre. Après les avoir affrontés et réclamé ces restes, elle revint avec les os sacrés et les mêla à l'argile profonde. Avec l'aide de ses frères et sœurs, elle donna naissance aux Tlacas, les premiers peuples conscients de Tonaltlan.",
      },
    ],
  },
  {
    name: "Zilo",
    slug: "zilo",
    description: "Dieu du Feu. Seigneur de la passion, de la volonté ardente et du cœur volcanique du monde.",
    tags: ["Feu", "Passion", "Volonté"],
    coverImageSrc: "/images/Zilo.webp",
    coverImageAlt: "Zilo, dieu du feu, brûlant d'énergie volcanique et d'une volonté indomptable.",
    sections: [
      {
        title: "Description",
        content:
          "Dieu du Feu.\n\nZilo est le dieu du feu, de la passion et de la volonté ardente. Contrairement à d'autres dieux nés dans le calme ou l'équilibre, Zilo naquit comme une explosion d'énergie au sein du cœur dual d'Omet, prenant la forme d'une flamme vivante de puissance et de caractère indomptable.\n\nIl était admiré par les guerriers, les forgerons et tous ceux qui vivaient intensément. Mais son destin changea lorsque sa sœur Tonatli se sacrifia pour devenir la lumière éternelle du monde. Incapable d'accepter cette perte, Zilo affronta Omet dans une fureur dévastatrice qui fit trembler le ciel. Le créateur, avec un calme absolu, l'envoya dans le monde de Tzal.\n\nLà, la déesse de la terre l'accueillit et apaisa sa rage. Lors de cette rencontre, les deux dieux partagèrent leur essence : Zilo donna à la terre la chaleur intérieure qui donnerait vie au monde, tandis que Tzal lui offrit la stabilité pour que son feu ne détruise pas tout sur son passage. Ainsi naquit le cœur volcanique de la planète.\n\nMalgré cela, Zilo ne pardonna jamais tout à fait à Omet. Il choisit de vivre loin des autres dieux et se retira dans la péninsule de Xitl, où il créa le Volcan de la Lave Éternelle, un sanctuaire où son feu brûle sans détruire le monde.",
      },
    ],
  },
  {
    name: "Calti",
    slug: "calti",
    description: "Déesse de l'Obscurité. Gardienne du mystère, des vérités cachées et de l'équilibre entre lumière et ombre.",
    tags: ["Obscurité", "Mystère", "Équilibre"],
    coverImageSrc: "/images/Calti.webp",
    coverImageAlt: "Calti, déesse de l'obscurité, tient son Miroir Obscur parmi des ombres violettes.",
    sections: [
      {
        title: "Description",
        content:
          "Déesse de l'Obscurité.\n\nCalti est la déesse de l'obscurité, du mystère et des vérités cachées. Depuis son royaume de nuit éternelle, elle observe le monde à travers son Miroir Obscur, un artefact capable de révéler la vraie nature des âmes.\n\nLorsque les Tlacas, les premiers peuples conscients, bâtirent de grands empires, leur orgueil grandit au point qu'ils se proclamèrent héritiers des dieux. Ils honoraient la lumière, mais méprisaient l'ombre, oubliant que ces deux forces étaient nécessaires à l'équilibre.\n\nOffensée par cette arrogance, Calti envoya son serviteur Tzayotl, commandant des ombres, châtier l'humanité. Sous son influence, les enfants des Tlacas commencèrent à perdre l'éclat de leur âme, sombrant dans le désespoir et le vide.\n\nLes peuples implorèrent la miséricorde des dieux. C'est alors que Tohui, frère jumeau de Calti et dieu de la foudre et du chaos, intercéda. Après un long débat entre les dieux, Calti accepta de lever la malédiction… mais non sans laisser une marque permanente.\n\nAvant de rendre le feu aux âmes humaines, elle scella les Points Tonals des Tlacas, empêchant la plupart des mortels de canaliser à nouveau le pouvoir divin. Seuls quelques-uns, ceux à l'esprit humble, conservèrent la capacité de ressentir l'énergie des dieux. On les appellerait les Érudits de la Magie.\n\nDepuis, l'humanité vit sous la lumière des dieux, mais séparée de leur pouvoir. Ainsi Calti rappela au monde que même l'obscurité a un but : préserver l'équilibre et châtier l'arrogance de ceux qui oublient leur place dans la création.",
      },
    ],
  },
  {
    name: "Tonatli",
    slug: "tonatli",
    description: "Déesse de la Lumière. Première manifestation de la pensée d'Omet et flamme éternelle qui soutient la vie.",
    tags: ["Lumière", "Espoir", "Sacrifice"],
    coverImageSrc: "/images/Tonatli.webp",
    coverImageAlt: "Tonatli, déesse de la lumière, enveloppée de rubans d'étoffe claire.",
    sections: [
      {
        title: "Description",
        content:
          "Déesse de la Lumière.\n\nTonatli est la première manifestation née de la pensée d'Omet, le principe dual de l'univers. Elle naquit comme la première lumière qui brisa le silence du vide, un éclat conscient dont la présence donna forme au temps, à l'espace et à la possibilité même de la vie.\n\nContrairement à ses frères et sœurs, dont le pouvoir surgissait sous forme de feu, de terre, de vent ou de tempête, Tonatli incarnait la clarté, l'espoir et l'harmonie. Sa lumière inspirait les autres dieux, et tout ce qu'elle touchait fleurissait. C'est elle qui comprit que la création ne pouvait reposer sur la force d'un seul dieu, mais sur l'union de tous.\n\nAprès de nombreuses tentatives ratées de ses frères et sœurs pour créer des mondes stables, Tonatli offrit sa lumière pour unir leurs pouvoirs. Grâce à cette coopération naquit le monde où les éléments trouvèrent enfin l'équilibre.\n\nCependant, ce monde avait besoin d'une source d'énergie éternelle pour soutenir la vie. Comprenant son destin, Tonatli décida de se sacrifier. Avec l'aide du Grand Caïman Céleste, elle rassembla les anciennes créations ratées et les fit tourner autour du nouveau monde.\n\nTonatli abandonna alors sa forme et se transforma en une sphère radieuse de lumière éternelle : le Septième Soleil, dont l'énergie soutient la vie à Tonaltlan.\n\nDepuis, sa lumière guide les dieux comme les mortels. Bien qu'elle ne marche plus parmi eux, chaque aube rappelle son sacrifice et sa promesse : tant que sa lumière existera, la vie aura de l'espoir.",
      },
    ],
  },
  {
    name: "Tohui",
    slug: "tohui",
    description: "Dieu de la Foudre et de la Destruction. Seigneur de la tempête soudaine, de l'énergie chaotique et du changement violent.",
    tags: ["Foudre", "Tempête", "Destruction"],
    coverImageSrc: "/images/Tohui.webp",
    coverImageAlt: "Tohui, dieu de la foudre, brandit une lance ; des marques électriques brillent sur sa peau.",
    sections: [
      {
        title: "Description",
        content:
          "Dieu de la Foudre et de la Destruction.\n\nTohui est le dieu de la foudre, de la tempête et de la destruction soudaine. Il naquit avec sa sœur jumelle Calti lorsqu'une seule énergie primordiale se divisa en deux forces opposées : l'obscurité silencieuse et la destruction électrique. Depuis, tous deux partagent un lien profond, représentant les deux visages d'un même mystère cosmique.\n\nTandis que Calti observe et châtie avec patience, Tohui agit avec une violence soudaine. Ses domaines sont le tonnerre, les éclairs et l'énergie chaotique qui brise l'ordre pour laisser place à quelque chose de nouveau.\n\nPourtant, le cœur de Tohui fut toujours marqué par une obsession : Heka, la déesse de l'air. Sa nature mystérieuse et silencieuse éveilla en lui une fascination dangereuse. Lorsque Heka était proche, ses tempêtes devenaient plus puissantes, comme si le vent était la muse qui guidait ses éclairs.\n\nTohui accomplit nombre de ses actes de destruction en sachant que Heka l'observait depuis les courants invisibles du ciel. Aussi terribles que fussent ses actes, elle ne révéla jamais ses secrets. Ce silence scella entre eux une étrange loyauté. Tohui savait que si Heka décidait de parler, son destin pourrait s'achever en un instant.\n\nC'est pourquoi, devant les autres dieux, Tohui paraissait toujours maître de lui, mais il adressait souvent un léger sourire à sa sœur de l'air, sachant qu'elle gardait les vérités les plus sombres de ses tempêtes.\n\nParmi ses propres créations, Tohui était un dieu sévère. Il punissait ceux qu'il jugeait faibles ou indignes en les marquant de décharges divines. C'est pourquoi les descendants de sa lignée portent souvent des marques d'électricité sur la peau, surtout sur les mains, là où le dieu préférait déchaîner son pouvoir.\n\nTohui représente la destruction nécessaire pour que le monde change, la tempête qui brise le calme et l'énergie sauvage qui parcourt le ciel. Là où tombe la foudre, sa volonté a parlé.",
      },
    ],
  },
];

// ── Métadonnées des sections pour les pages d'accueil ───────
export const sectionsMeta = [
  { title: "Classes",   slug: "clases",    description: "Archétypes de héros et de méchants du monde mésoaméricain.",        count: clases.length },
  { title: "Espèces",   slug: "especies",  description: "Des êtres nés du maïs, de l'obsidienne et du souffle des dieux.",    count: especies.length },
  { title: "Bestiaire", slug: "bestiario", description: "Créatures du Mictlan et bêtes des jungles et montagnes sacrées.",     count: bestiaryImages.length },
  { title: "Montures",  slug: "monturas",  description: "De fidèles compagnons qui parcourent les cieux, les rivières et les routes ancestrales.", count: mountImages.length },
  { title: "Divinités", slug: "deidades",  description: "Les dieux qui tissent le destin du cosmos et leurs élus.",           count: deidades.length },
  { title: "Galerie",   slug: "galeria",   description: "Art conceptuel, illustrations et aperçus de l'univers.",             count: galleryImages.length },
];
