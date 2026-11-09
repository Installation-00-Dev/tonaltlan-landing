/* ============================================================
   ENGLISH COMPENDIUM — draft translation of lib/data.ts.
   Pending review by the creator (see /pendientes, "traduccion-ingles").
   Keep slugs, images and `deidad` identical to the Spanish file.
   Mesoamerican proper names are NOT translated (Mictlan, Xitl, Ixip...).
   ============================================================ */

import type { CompendiumEntry } from "./data";
import { galleryImages, mountImages } from "./site";

// ── CLASSES ─────────────────────────────────────────────────
export const clases: CompendiumEntry[] = [
  {
    name: "Brujo Catemaco",
    slug: "brujo-catemaco",
    description:
      "The Catemacos are artisan sorcerers from the swamplands of the kingdom of Tl’atl. Their power does not come from books or from pacts with unknown entities, but from the spiritual bond they forge with an Ixip, a tonal doll carved by their own hands and brought to life through an ancestral ritual.",
    tags: ["Summoner", "Multi-tonal", "Ranged"],
    coverImageSrc: "/images/Brujo_Catemaco.webp",
    coverImageAlt: "A Brujo Catemaco beside their Ixip in a cave of the kingdom of Tl'atl.",
    sections: [
      {
        title: "Description",
        content:
          "The Catemacos are artisan sorcerers from the swamplands of the kingdom of Tl’atl. Their power does not come from books or from pacts with unknown entities, but from the spiritual bond they forge with an Ixip, a tonal doll carved by their own hands and brought to life through an ancestral ritual.\n\nThroughout their training, the Catemaco shares part of their essence with this creation until a dormant elemental force awakens within it. The Ixip then becomes a living ally that channels the energy of the elements and acts as an extension of its creator's will.\n\nIn combat and on the road, the Catemaco and their Ixip work as a single being: the sorcerer directs and plans while the creation carries out tonal maneuvers. To many peoples they are mysterious, feared figures, mediators between the spirits of the swamp and the mortal world.",
      },
      {
        title: "Note",
        content:
          "Ideal for players who enjoy thinking every move ahead and controlling the battlefield through a magical ally.",
      },
    ],
  },
  {
    name: "Guerrero Otomi",
    slug: "guerrero-otomi",
    description:
      "Defenders of Zalan. The Otomi Warriors are the elite militia of northern Tonaltlan and bearers of the Earth Tonal Point.",
    tags: ["Tank", "Melee", "Earth Tonal"],
    coverImageSrc: "/images/Otomi.webp",
    coverImageAlt: "An Otomi Warrior in heavy armor holding a war banner on the front line.",
    sections: [
      {
        title: "Description",
        content:
          "Defenders of Zalan.\n\nThe Otomi Warriors are the elite militia of northern Tonaltlan and bearers of the Earth Tonal Point. Their purpose is not personal glory, but holding the battle line and protecting their people without ever stepping back. Where an Otomi plants their banner, the battle holds.\n\nClad in heavy armor, carrying geometric chimallis and war banners, the Otomi are the embodiment of endurance. Their presence on the battlefield turns chaos into a solid formation where allies find shelter and enemies find a wall that cannot be broken.\n\nAn Otomi does not rush into battle. Battle comes to them.",
      },
      {
        title: "Note",
        content:
          "Ideal for players who enjoy protecting their team and leading the battle line, who are drawn to sturdy characters able to absorb damage while the rest of the party fights in safety. This class is perfect for those who prefer a frontal, commanding fighting style, where their presence decides where the fight takes place. If you are drawn to the fantasy of becoming the party's shield, holding the formation and being the pillar the whole team leans on, the Otomi Warrior is your path.",
      },
    ],
  },
  {
    name: "Mitotiani",
    slug: "mitotiani",
    description:
      "Tonal Dancer. Ritualist warriors who channel the energy of the Tonal through sacred dances.",
    tags: ["Mobility", "Support", "Multi-Tonal"],
    coverImageSrc: "/images/Mitotiani.webp",
    coverImageAlt: "A Mitotiani performing a ritual dance over tonal glyphs.",
    sections: [
      {
        title: "Description",
        content:
          "Tonal Dancer.\n\nThe Mitotiani are ritualist warriors who channel the energy of the Tonal through sacred dances. Every step, every turn and every strike of their ayoyotes against the ground leaves marks of power that appear as ritual glyphs, reshaping the battlefield and guiding the energy of the elements.\n\nUnlike other fighters, the Mitotiani do not rely on traditional weapons. Their own body is their instrument of combat. They fight only with their legs and feet, delivering kicks, sweeps and daggers thrown from their ayoyotes. During the dance their hands stay still behind their back, preserving the balance and purity of the ritual. Holding any weapon would break the rhythm of the dance and weaken their connection to the Tonal.\n\nThrough their dances they can strengthen allies, weaken enemies or turn the very ground into a ritual stage where combat becomes a choreography of elemental power.\n\nA Mitotiani does not just fight. They turn battle into a ritual.",
      },
      {
        title: "Note",
        content:
          "Ideal for players who enjoy fast, creative characters that move constantly across the battlefield, using their position and abilities to change the rhythm of combat. This class is perfect for those who prefer a dynamic playstyle, where mobility, terrain control and teamwork matter more than brute strength.",
      },
    ],
  },
  {
    name: "Tlapali",
    slug: "tlapali",
    description:
      "Bearer of Tonal Blood. Practitioners of a forbidden ritual knowledge that bends blood to weaken and control.",
    tags: ["Controller", "Debuffer", "Blood seals"],
    coverImageSrc: "/images/Tlapali.webp",
    coverImageAlt: "A Tlapali marked with symbols of tonal blood during a dark ritual.",
    sections: [
      {
        title: "Description",
        content:
          "Bearer of Tonal Blood.\n\nThe Tlapali is an almost mythical figure. Many across the kingdoms believe this discipline vanished centuries ago deep in the Dark Forests, but the truth is that a few practitioners still guard this forbidden ritual knowledge.\n\nTheir power is born from a unique tonal energy, the union of Darkness and Water, which lets them shape blood as a ritual medium to mark enemies, weaken their life essence and change the outcome of a fight. The Tlapali use blood seals that they trigger on their targets, wearing them down little by little while the enemy stays trapped in a cycle of pain, attrition and control.\n\nBecause of their mastery over blood, the Tlapali are feared and avoided by many. Each one bears a symbol painted in blood on their face, a sign of their bond with this ancestral tradition. Although most remain isolated in the forests, some leave their land to venture into the world and prove that their art is not only destruction, but also power and knowledge.\n\nA Tlapali does not seek to defeat their enemy at once. They mark them and let the blood do its work.",
      },
      {
        title: "Note",
        content:
          "This class is ideal for those who prefer to steer the flow of combat, control enemies and support the party with effects that reduce the opponent's capabilities. It will also appeal to players who enjoy unique mechanics built on preparing and triggering abilities, and to those drawn to dark, ritualistic characters wrapped in an aura of mystery.",
      },
    ],
  },
];

// ── SPECIES ─────────────────────────────────────────────────
export const especies: CompendiumEntry[] = [
  {
    name: "He'kari",
    slug: "hekari",
    deidad: "heka",
    description: "Children of Heka. Descendants of the goddess of the wind: agile, expressive bearers of words that change fate.",
    tags: ["Agility", "Social", "Wind"],
    coverImageSrc: "/images/especie_Hekari.webp",
    coverImageAlt: "A He'kari with flowing hair and jade-green eyes, in motion.",
    sections: [
      {
        title: "Description",
        content:
          "Children of Heka.\n\nThe He'kari are descendants of Heka, goddess of the wind. Tall, slender and light on their feet, they seem to move with the same ease as a current of air. Their hair is rarely still, and their jade-green eyes reflect a constant curiosity about the world.\n\nIn Tonaltlan they are known as artists, messengers, spies and keepers of knowledge, for their voice and presence have an almost hypnotic quality. The He'kari believe that words travel like the wind, and that even the smallest whisper can change the fate of the world.\n\nTraits\n\nAir Affinity: the He'kari do not need to breathe and are immune to inhaled gases and poisons.\n\nLightness of the Wind: their body is naturally suited to agility and movement.",
      },
      {
        title: "Note",
        content:
          "The He'kari excel in playstyles focused on mobility, exploration and social interaction, making them an excellent choice for agile, curious and expressive characters.",
      },
    ],
  },
  {
    name: "Hualik",
    slug: "hualik",
    deidad: "calti",
    description: "Children of Calti. Descendants of the goddess of darkness and silence: rare, mysterious dwellers of the shadows.",
    tags: ["Stealth", "Strategy", "Darkness"],
    sections: [
      {
        title: "Description",
        content:
          "Children of Calti.\n\nThe Hualik are descendants of Calti, goddess of darkness and silence. They are one of the rarest and most mysterious species of Tonaltlan, so scarce that many believe they exist only in legends.\n\nTheir dark skin absorbs light and their presence seems to mute the sounds around them. Completely hairless and sharp-featured, their white eyes stand out even in the gloom. The Hualik move with an unsettling stillness, as if they were a natural part of the shadows themselves.\n\nThey do not form kingdoms or large societies. They prefer to live isolated in caves, ruins or deep forests, watching the world from a distance. Many know them as the eyes of the night, silent witnesses to the events of the continent.\n\nTraits\n\nShadow Fusion: the Hualik can move and hide in darkness with supernatural ease.\n\nSuperior Night Vision: they can see clearly even in the deepest darkness.",
      },
      {
        title: "Note",
        content:
          "The Hualik excel in playstyles based on stealth, observation and strategy, making them an excellent choice for characters who prefer to move from the shadows and act when the moment is perfect.",
      },
    ],
  },
  {
    name: "Irzak",
    slug: "irzak",
    deidad: "zilo",
    description: "Children of Zilo. Natives of the volcanic peninsula of Xitl: proud, intense and guided by unbreakable honor.",
    tags: ["Fire", "Frontline combat", "Honor"],
    coverImageSrc: "/images/especie_fuego.webp",
    coverImageAlt: "An amber-eyed Irzak with a fiery presence, forged by the volcanic land.",
    sections: [
      {
        title: "Description",
        content:
          "Children of Zilo.\n\nThe Irzak come from the volcanic peninsula of Xitl, a land ruled by fire, burning stone and the constant roar of the Eternal Volcano. Forged in this extreme environment, the Irzak are known for their intense character, their pride and their unbreakable code of honor.\n\nThey believe every soul is a spark granted by Zilo, lord of fire, and that their duty is to burn with passion throughout their life before returning to the great divine brazier. That is why they live intensely: they fight with courage, love fiercely and honor their allies with absolute loyalty.\n\nTheir bodies reflect the power of the volcano: skin in terracotta or bronze tones, amber or red eyes like embers, and hair that seems to move like living flames. Among their people, reddish or copper beards are a symbol of pride, strength and maturity.\n\nTraits\n\nForged in Flames: the Irzak have a strong resistance to fire.\n\nSpark of Zilo: the energy of fire lives within them, letting them conjure small flames and channel fiery power.",
      },
      {
        title: "Note",
        content:
          "The Irzak excel in aggressive, direct playstyles, making them an excellent choice for characters who favor frontline combat, willpower and the power of fire. They are especially well suited to martial classes or characters who channel elemental energy.",
      },
    ],
  },
  {
    name: "Lok'Naa",
    slug: "lok-naa",
    deidad: "lok",
    description: "Children of Lok. Descendants of the god of water: serene, wise and bound to seas, cenotes and rivers.",
    tags: ["Support", "Exploration", "Water"],
    sections: [
      {
        title: "Description",
        content:
          "Children of Lok.\n\nThe Lok'Naa are descendants of Lok, god of water, and carry in their bodies the essence of the seas, cenotes and rivers of Tonaltlan. Their presence conveys a deep calm, as if the murmur of water followed them wherever they go.\n\nTheir skin shows watery tones ranging from soft blues to jade greens and deep turquoise. Their hair flows constantly as if underwater, and their eyes reflect ocean colors that evoke the serenity of still waters.\n\nThe Lok'Naa are known for their peaceful nature, their emotional wisdom and their deep connection to water. Across Tonaltlan they are recognized as healers, guardians of cenotes and explorers of the depths, able to move underwater with extraordinary ease.\n\nTraits\n\nAquatic Adaptation: the Lok'Naa can stay underwater for long periods without needing to surface for air.\n\nSerene Presence: their calm, empathetic nature lets them positively influence those around them.",
      },
      {
        title: "Note",
        content:
          "The Lok'Naa excel in playstyles focused on support, exploration and connection with water, making them an excellent choice for characters who value calm, wisdom and resilience over direct confrontation.",
      },
    ],
  },
  {
    name: "Quinametzin",
    slug: "quinametzin",
    deidad: "tzal",
    description: "Children of Tzal. Descendants of the goddess of the earth: ancient, noble pillars of their community.",
    tags: ["Endurance", "Protection", "Earth"],
    sections: [
      {
        title: "Description",
        content:
          "Children of Tzal.\n\nThe Quinametzin are children of Tzal, goddess of the earth, and one of the oldest and noblest species of Tonaltlan. Colossal in stature and powerfully built, their presence commands respect, yet their nature is surprisingly serene and kind. Wherever a Quinametzin lives, they tend to become a pillar of the community.\n\nTheir skin has the texture of stone, in tones reminiscent of granite, obsidian or jade. Over the years, small cracks appear on its surface, forming a natural map of the experiences of their life.\n\nEvery Quinametzin is born with a gem embedded in their body, a physical manifestation of their spirit. This gem changes color with their emotions, revealing their inner state and making it almost impossible for them to hide their true feelings.\n\nTraits\n\nStone Skin: the skin of the Quinametzin is as hard as rock, granting them exceptional natural resilience.\n\nGem of Spirit: every Quinametzin has a gem that reflects their emotions and strengthens their connection with others.",
      },
      {
        title: "Note",
        content:
          "The Quinametzin excel in playstyles focused on endurance, protection and teamwork, making them an excellent choice for strong, protective characters deeply loyal to their community.",
      },
    ],
  },
  {
    name: "Toh'kari",
    slug: "tohkari",
    deidad: "tohui",
    description: "Children of Tohuí. Descendants of the god of destruction and lightning: unpredictable and charged with energy.",
    tags: ["Lightning", "Volatile", "Nomad"],
    sections: [
      {
        title: "Description",
        content:
          "Children of Tohuí.\n\nThe Toh'kari are descendants of Tohuí, god of destruction and lightning. Their presence is like the tense calm before a lightning strike: unpredictable, dangerous and charged with energy. They are one of the most feared and avoided species of Tonaltlan, known for their explosive nature and their direct bond with the power of lightning.\n\nTheir grayish skin seems charged with static electricity, and the marks on their hands and forearms (like lightning scars) glow when they handle energy. Their intense amber eyes and hair standing on end with electricity reveal the storm that lives inside them.\n\nThe Toh'kari do not build empires or cities. They live as nomads or in small wandering bands, guided by their impulses, their search for power and the untamable nature of the storm that defines them.\n\nTraits\n\nStorm Affinity: the Toh'kari have a natural connection to electrical energy and can manipulate small discharges.\n\nElectric Perception: they can sense currents of energy around them, such as nearby storms or sources of magical power.",
      },
      {
        title: "Note",
        content:
          "The Toh'kari are an intense, volatile species, ideal for players who enjoy unpredictable, impulsive characters that are hard to pin down. Their strength lies in their chaotic energy and wild nature, which makes them characters who tend to stand out for their presence and their impact on the story.",
      },
    ],
  },
  {
    name: "Ton",
    slug: "ton",
    deidad: "tonatli",
    description: "Children of Tonatli. Bearers of the last spark of the sun, with a luminous aura and absolute honesty.",
    tags: ["Light", "Wisdom", "Honesty"],
    sections: [
      {
        title: "Description",
        content:
          "Children of Tonatli.\n\nThe Ton are descendants of Tonatli, goddess of primordial light. They are an extremely rare species, mentioned in ancient songs and golden murals as bearers of the last spark of the sun. Their presence is unmistakable: their skin radiates a warm light and their aura brightens their surroundings as if they carried a small dawn inside them.\n\nA race of light\n\nTheir bodies give off a natural glow that grows stronger with their emotions. When they feel joy, sorrow or anger, their light can become so intense that it shines across great distances. Their hair, in golden and orange tones, is as strong as light itself and cannot be cut or destroyed.\n\nA race of light\n\nThe Ton are known for their absolute honesty, for they cannot lie. Many live as sages, protectors or keepers of knowledge, devoting their long lives to helping other peoples and preserving the memory of the world.\n\nTraits\n\nInner Light: the Ton give off a natural light that can illuminate their surroundings.\n\nAbsolute Sincerity: the Ton cannot lie; their nature compels them to be completely honest.",
      },
      {
        title: "Note",
        content:
          "The Ton are a rare and legendary species, ideal for wise, protective characters or moral figures within a story. Their luminous nature and sincerity make them individuals who are hard to hide, but deeply trustworthy and respected.",
      },
    ],
  },
];

// ── BESTIARY ────────────────────────────────────────────────
export const bestiario: CompendiumEntry[] = [];

// ── MOUNTS ──────────────────────────────────────────────────
export const monturas: CompendiumEntry[] = [];

// ── DEITIES ─────────────────────────────────────────────────
export const deidades: CompendiumEntry[] = [
  {
    name: "Heka",
    slug: "heka",
    description: "Lady of the Air. Goddess of the wind, of whispers and of the invisible paths of the sky.",
    tags: ["Air", "Wind", "Whispers"],
    coverImageSrc: "/images/Heka.webp",
    coverImageAlt: "Heka, deity of the air, wrapped in currents and celestial breeze.",
    sections: [
      {
        title: "Description",
        content:
          "Lady of the Air.\n\nHeka is the goddess of the wind, of whispers and of the invisible paths of the sky. It is said that her presence is never seen directly, but always felt: in the breeze that guides travelers, in the song of the leaves and in the breath that pushes the birds toward the horizon.\n\nAmong the gods of the Pantheon, Heka is known for her free spirit and compassionate heart. Unlike her siblings, who rule from afar, she often listens to the prayers of mortals who speak to the wind.\n\nThe scholars of the Tower of the Sages believe that those who manage to open the Air Tonal Point first hear her call as a soft murmur in their ear.",
      },
    ],
  },
  {
    name: "Lok",
    slug: "lok",
    description: "God of Water. The last primordial deity created by Omet, lord of flow, empathy and the movement of water.",
    tags: ["Water", "Calm", "Healing"],
    coverImageSrc: "/images/Lok.webp",
    coverImageAlt: "Lok, god of water, surrounded by serene currents and sacred waters.",
    sections: [
      {
        title: "Description",
        content:
          "God of Water.\n\nLok is the last primordial deity created by Omet and the youngest of the gods. Unlike his siblings, he was not born wrapped in violent power or overwhelming forces, but as a soft murmur that brought flow, empathy and the movement of water into the world.\n\nWhen he first beheld his creation, Lok was filled with such deep joy that his tears flooded his own world, forming rivers, seas and currents. Omet then understood that Lok had to learn to contain his emotions so that his power would not destroy what he wished to protect.\n\nConciliatory by nature, Lok always sought harmony among his siblings. However, when Tonatli sacrificed herself to become the eternal Light, Lok's grief was so great that he chose to hold back his tears so as not to cause another catastrophe. To master his emotions he entered a deep meditation, taking refuge in the world of Tzal.\n\nEven in his silence, his essence kept seeping into the earth. Wherever a tear escaped, cenotes were born: deep waters regarded as gateways of calm and healing.",
      },
    ],
  },
  {
    name: "Tzal",
    slug: "tzal",
    description: "Mother of the Earth. Goddess of the foundation, of stability and of the permanence on which life flourishes.",
    tags: ["Earth", "Life", "Stability"],
    coverImageSrc: "/images/Tzal.webp",
    coverImageAlt: "Tzal, mother of the earth, surrounded by roots, mountains and sacred clay.",
    sections: [
      {
        title: "Description",
        content:
          "Mother of the Earth.\n\nTzal is the goddess of the earth and the foundation on which all life rests. Although she was not the first to emerge from Omet's creation, it soon became clear that her nature was different from that of her siblings. While other gods showed their power as chaos, fire or storm, Tzal embodied stability, order and permanence.\n\nWhen the gods tried to create their own worlds, they all failed: some flooded, others burned or crumbled. Only Tzal's world thrived, for she shaped it with patience and vision. She placed it near the eternal light of Tonatli, to honor her sacrifice and let life flourish under her glow.\n\nSeeing that Tzal's world could sustain existence, the seven gods joined their powers for the first time to perfect it. Each contributed their essence: light, night, energy, wind, fire and water. But the body of the world, its soil, mountains and roots, belonged to Tzal.\n\nLonging to create conscious beings who would walk her land, Tzal descended into Mictlan, where the lords of death kept the bones of her ancient creations: the Earth Cyclopes. After confronting them and reclaiming those remains, she returned with the sacred bones and mixed them with deep clay. With the help of her siblings, she gave life to the Tlacas, the first conscious peoples of Tonaltlan.",
      },
    ],
  },
  {
    name: "Zilo",
    slug: "zilo",
    description: "God of Fire. Lord of passion, burning will and the volcanic heart of the world.",
    tags: ["Fire", "Passion", "Will"],
    coverImageSrc: "/images/Zilo.webp",
    coverImageAlt: "Zilo, god of fire, blazing with volcanic energy and untamable will.",
    sections: [
      {
        title: "Description",
        content:
          "God of Fire.\n\nZilo is the god of fire, passion and burning will. Unlike other gods who emerged in calm or balance, Zilo was born as an explosion of energy within Omet's dual heart, taking shape as a living flame of power and untamable temper.\n\nHe was admired by warriors, smiths and all who lived with intensity. However, his fate changed when his sister Tonatli sacrificed herself to become the eternal light of the world. Unable to accept that loss, Zilo confronted Omet in a devastating fury that made the sky tremble. The creator, with absolute calm, sent him to the world of Tzal.\n\nThere, the goddess of the earth held him and calmed his rage. In that meeting both gods shared their essence: Zilo gave the earth the inner heat that would bring the world to life, while Tzal gave him stability so that his fire would not destroy everything in its path. Thus the volcanic heart of the planet was born.\n\nEven so, Zilo never fully forgave Omet. He chose to live far from the other gods, withdrawing to the peninsula of Xitl, where he created the Volcano of Eternal Lava, a sanctuary where his fire burns without destroying the world.",
      },
    ],
  },
  {
    name: "Calti",
    slug: "calti",
    description: "Goddess of Darkness. Keeper of mystery, of hidden truths and of the balance between light and shadow.",
    tags: ["Darkness", "Mystery", "Balance"],
    sections: [
      {
        title: "Description",
        content:
          "Goddess of Darkness.\n\nCalti is the goddess of darkness, mystery and hidden truths. From her realm of eternal night she watches the world through her Dark Mirror, an artifact able to reveal the true nature of souls.\n\nWhen the Tlacas, the first conscious peoples, raised great empires, their pride grew until they proclaimed themselves heirs of the gods. They honored the light but scorned the shadow, forgetting that both forces were needed for balance.\n\nOffended by this arrogance, Calti sent her servant Tzayotl, commander of the shadows, to punish humanity. Under his influence, the children of the Tlacas began to lose the glow of their souls, falling into despair and emptiness.\n\nThe peoples begged the gods for mercy. It was then that Tohui, Calti's twin brother and god of lightning and chaos, intervened. After a long debate among the gods, Calti agreed to lift the curse… but not without leaving a permanent mark.\n\nBefore returning the fire to human souls, she sealed the Tonal Points of the Tlacas, preventing most mortals from ever channeling divine power again. Only a few, those of humble spirit, kept the ability to feel the energy of the gods. They would come to be known as the Scholars of Magic.\n\nSince then, humanity lives under the light of the gods, but cut off from their power. In this way Calti reminded the world that even darkness has a purpose: to preserve balance and to punish the arrogance of those who forget their place in creation.",
      },
    ],
  },
  {
    name: "Tonatli",
    slug: "tonatli",
    description: "Goddess of Light. First manifestation of Omet's thought and eternal flame that sustains life.",
    tags: ["Light", "Hope", "Sacrifice"],
    sections: [
      {
        title: "Description",
        content:
          "Goddess of Light.\n\nTonatli is the first manifestation to arise from the thought of Omet, the dual principle of the universe. She was born as the first light that broke the silence of the void, a conscious flash whose presence gave shape to time, to space and to the very possibility of life.\n\nUnlike her siblings, whose power arose as fire, earth, wind or storm, Tonatli embodied clarity, hope and harmony. Her light inspired the other gods, and everything she touched flourished. It was she who understood that creation could not be sustained by the strength of a single god, but by the union of all.\n\nAfter her siblings' many failed attempts to create stable worlds, Tonatli offered her light to unite their powers. Thanks to that cooperation, the world was born where the elements finally found balance.\n\nHowever, that world needed an eternal source of energy to sustain life. Understanding her destiny, Tonatli chose to sacrifice herself. With the help of the Great Celestial Caiman, she gathered the old failed creations and set them spinning around the new world.\n\nThen Tonatli gave up her form and became a radiant sphere of eternal light: the Seventh Sun, whose energy sustains life in Tonaltlan.\n\nSince then, her light guides gods and mortals alike. Although she no longer walks among them, every dawn recalls her sacrifice and her promise: that as long as her light exists, life will have hope.",
      },
    ],
  },
  {
    name: "Tohui",
    slug: "tohui",
    description: "God of Lightning and Destruction. Lord of the sudden storm, chaotic energy and violent change.",
    tags: ["Lightning", "Storm", "Destruction"],
    sections: [
      {
        title: "Description",
        content:
          "God of Lightning and Destruction.\n\nTohui is the god of lightning, storm and sudden destruction. He was born alongside his twin sister Calti when a single primordial energy split into two opposing forces: silent darkness and electric destruction. Since then, both share a deep bond, representing two faces of the same cosmic mystery.\n\nWhile Calti watches and punishes with patience, Tohui acts with sudden violence. His domains are thunder, lightning bolts and the chaotic energy that breaks order to make way for something new.\n\nYet Tohui's heart was always marked by an obsession: Heka, the goddess of the air. Her mysterious, silent nature awoke in him a dangerous fascination. When Heka was near, his storms grew stronger, as if the wind were the muse that guided his lightning.\n\nTohui carried out many of his acts of destruction knowing that Heka watched him from the invisible currents of the sky. Terrible as his actions could be, she never revealed his secrets. That silence sealed a strange loyalty between them. Tohui understood that if Heka chose to speak, his fate could end in an instant.\n\nThat is why, before the other gods, Tohui always appeared in control, but he often cast a faint smile toward his sister of the air, knowing she kept the darkest truths of his storms.\n\nAmong his own creations, Tohui was a stern god. He punished those he deemed weak or unworthy, marking them with divine discharges. For this reason, the descendants of his lineage often bear marks of electricity on their skin, especially on their hands, where the god preferred to unleash his power.\n\nTohui represents the destruction needed for the world to change, the storm that breaks the calm and the wild energy that crosses the sky. Where lightning strikes, his will has spoken.",
      },
    ],
  },
];

// ── Section metadata for hub pages ──────────────────────────
export const sectionsMeta = [
  { title: "Classes",  slug: "clases",    description: "Archetypes of heroes and villains from the Mesoamerican world.", count: clases.length },
  { title: "Species",  slug: "especies",  description: "Beings born of maize, obsidian and the breath of the gods.",       count: especies.length },
  { title: "Bestiary", slug: "bestiario", description: "Creatures of Mictlan and beasts of the sacred jungles and mountains.", count: bestiario.length },
  { title: "Mounts",   slug: "monturas",  description: "Loyal companions that ride the skies, rivers and ancestral roads.", count: mountImages.length },
  { title: "Deities",  slug: "deidades",  description: "The gods who weave the fate of the cosmos and their chosen ones.",  count: deidades.length },
  { title: "Gallery",  slug: "galeria",   description: "Concept art, illustrations and glimpses into the universe.",         count: galleryImages.length },
];
