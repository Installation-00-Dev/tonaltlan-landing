/* ============================================================
   TEST D'AFFINITÉ EN FRANÇAIS — brouillon de traduction de
   lib/affinity-test.ts (mêmes ids, points et structure).
   En attente de relecture (voir /pendientes, "traduccion-frances").
   Ton familier adapté de l'original ("compa" -> "pote", tutoiement).
   Si les questions ou les points changent en espagnol, il faut aussi
   les mettre à jour ici.
   ============================================================ */
import type { Question, RaceKey, RaceResult, TextosVisuales } from "./affinity-core";

export const questionsFr: Question[] = [
  {
    id: 1,
    title: "Le secret de ton pote",
    scenario:
      "Ton meilleur pote te confie un truc lourd : si tu le balances, tu sauves plein de gens, mais tu le mets dans la galère. Il te demande de te taire. Ta conscience te dit : « bon, et maintenant je fais quoi, moi ? »",
    options: [
      {
        id: "q1-o1",
        text: "Je ne peux pas me taire. La vérité doit sortir, même si je perds mon pote.",
        points: { Ton: 3, Quinametzin: 2, "Lok'naa": 1 },
      },
      {
        id: "q1-o2",
        text: "Je l'affronte en face. Il doit assumer, comme il se doit.",
        points: { Irzak: 3, Ton: 2, Quinametzin: 1 },
      },
      {
        id: "q1-o3",
        text: "Je cherche une sortie créative. Il doit y avoir un moyen d'aider tout le monde sans enfoncer personne.",
        points: { "He'kari": 3, "Lok'naa": 2, Quinametzin: 1 },
      },
      {
        id: "q1-o4",
        text: "Je garde ça pour moi pour l'instant, mais je prépare tout au cas où ça partirait en vrille.",
        points: { Hualik: 3, "He'kari": 2, "Lok'naa": 1 },
      },
    ],
  },
  {
    id: 2,
    title: "La tradition qui fait mal",
    scenario:
      "Ta famille a une tradition très ancienne que tout le monde respecte, mais elle fait du mal à un groupe de personnes. Chaque fois que tu la vois, ça te serre le cœur. Tu fais quoi ?",
    options: [
      {
        id: "q2-o1",
        text: "Je la garde, mais je mets en place de vraies protections pour ceux qui en souffrent.",
        points: { Quinametzin: 3, "Lok'naa": 2, Ton: 1 },
      },
      {
        id: "q2-o2",
        text: "Je la casse tout de suite. Je n'attends pas la permission quand des gens souffrent.",
        points: { "Toh'kari": 3, Irzak: 2, "He'kari": 1 },
      },
      {
        id: "q2-o3",
        text: "Je l'adapte. Je garde le bon et je change ce qui fait mal.",
        points: { "He'kari": 3, Quinametzin: 2, "Lok'naa": 1 },
      },
      {
        id: "q2-o4",
        text: "Je brûle tout et je repars de zéro. Seul le bon reste.",
        points: { Irzak: 3, Ton: 2, Quinametzin: 1 },
      },
    ],
  },
  {
    id: 3,
    title: "Le chef qui s'est dégonflé",
    scenario:
      "Ton chef, celui que tout le monde respecte, s'est dégonflé sur un truc important pour sauver sa peau. Tu l'as vu. Si tu le balances, ça va faire un scandale énorme. Mais le mensonge te ronge de l'intérieur.",
    options: [
      {
        id: "q3-o1",
        text: "Je le dénonce, preuves à l'appui. La vérité, c'est la vérité, même si tout explose.",
        points: { Ton: 3, Quinametzin: 2, "He'kari": 1 },
      },
      {
        id: "q3-o2",
        text: "Je l'affronte d'abord en privé. Qu'il répare les dégâts avant que ça se sache.",
        points: { Quinametzin: 3, "Lok'naa": 2, Ton: 1 },
      },
      {
        id: "q3-o3",
        text: "Je me tais et je rassemble plus d'infos. J'agis au bon moment.",
        points: { Hualik: 3, "He'kari": 2, Quinametzin: 1 },
      },
      {
        id: "q3-o4",
        text: "Je l'affronte et j'exige qu'il avoue. S'il s'est dégonflé, qu'il le dise devant tout le monde.",
        points: { Irzak: 3, Ton: 2, Quinametzin: 1 },
      },
    ],
  },
  {
    id: 4,
    title: "Le dernier remède",
    scenario:
      "Il ne reste qu'un seul remède. Tu peux sauver un petit enfant, quelqu'un d'important qui en sauvera d'autres plus tard, ou le garder pour toi. Le temps presse. Tu fais quoi ?",
    options: [
      {
        id: "q4-o1",
        text: "Je le donne à l'enfant. Je ne peux pas laisser mourir quelqu'un d'aussi sans défense.",
        points: { "Lok'naa": 3, Ton: 2, Quinametzin: 1 },
      },
      {
        id: "q4-o2",
        text: "Je le donne à la personne importante. C'est dur, mais elle en sauvera d'autres plus tard.",
        points: { Quinametzin: 3, "He'kari": 2, Ton: 1 },
      },
      {
        id: "q4-o3",
        text: "J'essaie de le partager ou de trouver un moyen de sauver les deux.",
        points: { "He'kari": 3, "Lok'naa": 2, Ton: 1 },
      },
      {
        id: "q4-o4",
        text: "Je le garde. Si je tombe, personne ne pourra aider après.",
        points: { "Toh'kari": 3, Hualik: 2, "He'kari": 1 },
      },
    ],
  },
  {
    id: 5,
    title: "Le traître devant toi",
    scenario:
      "Quelqu'un de ton groupe t'a trahi et a provoqué une vraie galère. Maintenant, il est devant toi. Tout le monde regarde et attend ta décision.",
    options: [
      {
        id: "q5-o1",
        text: "Je le juge selon les règles. Une justice claire, sans vengeance.",
        points: { Quinametzin: 3, Ton: 2, Hualik: 1 },
      },
      {
        id: "q5-o2",
        text: "Je l'affronte en face. Qu'il répare avec courage ou qu'il assume les conséquences.",
        points: { Irzak: 3, Quinametzin: 2, Ton: 1 },
      },
      {
        id: "q5-o3",
        text: "J'essaie de le remettre sur le droit chemin. Je peux aider à réparer sans détruire la personne.",
        points: { "Lok'naa": 3, Quinametzin: 2, Ton: 1 },
      },
      {
        id: "q5-o4",
        text: "J'en fais un atout utile. Qu'il paie en servant en secret.",
        points: { Hualik: 3, "He'kari": 2, "Toh'kari": 1 },
      },
    ],
  },
  {
    id: 6,
    title: "Ça part en vrille",
    scenario:
      "Tu es dans un lieu public et d'un coup, tout part en vrille : des cris, des gens qui courent, la panique. Tu ne sais pas ce qui se passe, mais le danger est réel. Tu fais quoi ?",
    options: [
      {
        id: "q6-o1",
        text: "Je deviens un bouclier. Je protège ceux qui ne peuvent pas fuir.",
        points: { Quinametzin: 2, "Lok'naa": 1 },
      },
      {
        id: "q6-o2",
        text: "Je calme les gens. Je fais baisser la tension avant que quelqu'un se blesse.",
        points: { "Lok'naa": 2, "He'kari": 1 },
      },
      {
        id: "q6-o3",
        text: "Je me place à un endroit stratégique et j'organise une sortie sûre.",
        points: { Hualik: 2 },
      },
      {
        id: "q6-o4",
        text: "Je fonce droit vers la source du problème. Je coupe le danger à la racine.",
        points: { "Toh'kari": 2 },
      },
    ],
  },
  {
    id: 7,
    title: "On t'accuse",
    scenario:
      "On t'accuse d'un truc que tu n'as pas fait et les gens commencent à y croire. Les regards deviennent mauvais. Le mensonge se répand vite.",
    options: [
      {
        id: "q7-o1",
        text: "Je parle franchement. Je dis toute la vérité, sans tourner autour du pot.",
        points: { Ton: 3, Quinametzin: 2, Irzak: 1 },
      },
      {
        id: "q7-o2",
        text: "Je recadre la situation avec des mots. Je retourne la scène et je gagne du temps.",
        points: { "He'kari": 3, Hualik: 2, "Lok'naa": 1 },
      },
      {
        id: "q7-o3",
        text: "Je me retire calmement. Je ne me bats pas là où on m'a déjà jugé sans preuves.",
        points: { Hualik: 3, Quinametzin: 2, "He'kari": 1 },
      },
      {
        id: "q7-o4",
        text: "Je pose mes limites en face. Je ne me tais pas et je ne cède pas ma place.",
        points: { Irzak: 3, "Toh'kari": 2, Ton: 1 },
      },
    ],
  },
  {
    id: 8,
    title: "Tout tombe à l'eau",
    scenario:
      "Tu prépares un truc depuis des mois et, à la dernière seconde, tout tombe à l'eau. Le plan échoue. Tout le monde te regarde et attend que tu fasses quelque chose.",
    options: [
      {
        id: "q8-o1",
        text: "Je m'organise tout de suite. Je répartis les rôles et je remets de l'ordre. La stabilité d'abord.",
        points: { Quinametzin: 2, Irzak: 1 },
      },
      {
        id: "q8-o2",
        text: "Je change de plan à la volée. J'improvise vite quelque chose de nouveau.",
        points: { "He'kari": 2, "Toh'kari": 1 },
      },
      {
        id: "q8-o3",
        text: "D'abord je calme le groupe. Je fais baisser la tension avant de décider.",
        points: { "Lok'naa": 2, Ton: 1 },
      },
      {
        id: "q8-o4",
        text: "Je prends le commandement, sans excuses. J'affronte ça en face.",
        points: { Irzak: 2, Ton: 1 },
      },
    ],
  },
  {
    id: 9,
    title: "Ton talisman de voyage",
    scenario:
      "Avant que tu partes en voyage, un vieil homme t'offre le talisman magique de ton choix. Lequel tu prends ?",
    options: [
      {
        id: "q9-o1",
        text: "Un médaillon qui vibre quand tu essaies de te mentir à toi-même.",
        points: { Ton: 2, Hualik: 1 },
      },
      {
        id: "q9-o2",
        text: "Une pièce qui ne tombe jamais deux fois du même côté.",
        points: { "Toh'kari": 2 },
      },
      {
        id: "q9-o3",
        text: "Une boussole qui indique ce que tu as le plus besoin d'apprendre.",
        points: { "He'kari": 2, "Lok'naa": 1 },
      },
      {
        id: "q9-o4",
        text: "Une pierre qui s'alourdit quand le danger approche.",
        points: { Hualik: 2 },
      },
      {
        id: "q9-o5",
        text: "Un anneau qui chauffe quand tu romps une promesse.",
        points: { Irzak: 2, Ton: 1 },
      },
    ],
  },
  {
    id: 10,
    title: "Ta façon de te ressourcer",
    scenario:
      "Après une sale galère, quelle est la première chose que tu fais pour revenir à la normale ?",
    options: [
      {
        id: "q10-o1",
        text: "Je parle franchement et je clos l'affaire avec la vérité.",
        points: { Ton: 2, Quinametzin: 1 },
      },
      {
        id: "q10-o2",
        text: "Je bouge. Je change d'endroit, je respire un air nouveau. Je reviens différent.",
        points: { "He'kari": 2, "Toh'kari": 1 },
      },
      {
        id: "q10-o3",
        text: "Je me réorganise. Je remets de l'ordre dans mes habitudes, mes tâches, quelque chose de concret qui me stabilise.",
        points: { Quinametzin: 2, Ton: 1 },
      },
      {
        id: "q10-o4",
        text: "Je disparais un moment. Silence, distance. Je recalcule tout seul.",
        points: { Hualik: 2, "Lok'naa": 1 },
      },
      {
        id: "q10-o5",
        text: "Je fais quelque chose de physique et d'intense. Je transforme ce que j'ai vécu en force.",
        points: { Irzak: 2, "Toh'kari": 1 },
      },
    ],
  },
];

export const raceResultsFr: Record<RaceKey, RaceResult> = {
  Ton: {
    name: "TON, Lumière. L'Illuminateur",
    essence:
      "Tu es la vérité qui ne peut se cacher, la lumière qui révèle sans le vouloir. Tu fais partie des moins de 100 Ton de tout Tonaltlan. Ton existence est légendaire. Tu vis des siècles, bibliothèque vivante de mémoire et de sagesse. Ton existence même est un phare moral : tu ne peux pas mentir, tu ne peux pas tromper, tu ne peux pas te taire face à une injustice. Ta clarté est à la fois ta vertu et ta vulnérabilité.",
    virtue:
      "Ta droiture morale absolue. Tu es celui qui éclaire le chemin des autres, qui protège sans attendre de récompense, qui répare les injustices parce que tu ne peux pas les ignorer. Ta lumière consume les sentiments lourds et les rancunes, et ne laisse que clarté et but.",
    shadow:
      "Ta plus grande terreur n'est pas la mort, mais d'être corrompu ou assombri. Tu crains de devenir un « soleil qui brûle au lieu de réchauffer ». Ta sincérité te rend vulnérable : tu ne peux pas garder de secrets stratégiques, et parfois la vérité que tu révèles peut briser des relations ou déclencher des guerres.",
    path:
      "Ton rituel est d'exister avec une pureté volontaire. Tu n'as pas besoin de prier : chaque acte de bonté honore Tonatli. Ton rôle est d'être le guide éthique, celui qui révèle les vérités même quand elles font mal, celui qui protège l'ordre moral du monde. Accepte que ton exposition totale soit à la fois ton pouvoir et ta blessure.",
    symbol: "L'Aube. Le moment où la lumière revient et où le monde se révèle.",
    object: "Un miroir qui reflète la vérité sans la déformer.",
    glyph: "Un soleil dont les rayons brillent dans toutes les directions.",
    lectura: [
      "Tu as une boussole intérieure qui ne se trompe presque jamais : tu sais ce qui est juste, même quand personne ne te le dit.",
      "Les gens te font confiance plus vite que tu ne l'imagines ; ta seule présence rend tout plus clair.",
      "Parfois tu portes plus que ta part, mais ta lumière trouve toujours le moyen de se rallumer.",
    ],
  },
  "Toh'kari": {
    name: "TOH'KARI, Foudre. Le Chaotique",
    essence:
      "Tu es la tempête sans contrôle, l'impulsion qui ne s'arrête pas. Tu vis entre l'envie de détruire et le besoin de survivre. Ta foudre intérieure est une bête que tu dois dompter juste assez pour ne pas mourir... et utiliser avant qu'elle ne te consume.",
    virtue:
      "Ton intensité imparable. Quand tu te concentres sur quelque chose, il n'y a ni doute, ni peur, ni hésitation : seulement l'action directe. Tu peux accomplir ce que d'autres n'oseraient même pas imaginer. Ta force est brutale mais honnête.",
    shadow:
      "Ta tendance à l'impulsivité et à la violence peut te détruire autant que ton entourage. La foudre que tu déchaînes te brûle aussi de l'intérieur. Tu crains de devenir un éclair qui frappe par accident, une destruction sans but. Ton conflit éternel : « Est-ce que je peux me retenir... ou est-ce que je vais encore tout détruire ? »",
    path:
      "Ton rituel est la survie au jour le jour. Il n'y a pas de quotidien pour toi : il y a le mouvement erratique, l'impatience et une profonde solitude. Ton rôle est d'être l'exilé sauvage qui survit dans un monde qui te craint. Apprends à décider quand NE PAS détruire : c'est ton vrai conflit moral.",
    symbol:
      "La Foudre qui frappe une montagne solitaire. Brutale, imprévisible, belle et terrifiante.",
    object: "Un éclat de métal qui garde encore une charge électrique.",
    glyph: "Un éclair en zigzag qui ne frappe jamais deux fois au même endroit.",
    lectura: [
      "Quand quelque chose compte pour toi, tu t'y donnes à fond ; tu ne fais jamais les choses à moitié.",
      "Ton énergie est contagieuse : partout où tu arrives, les choses se mettent à bouger.",
      "Même si l'impulsion l'emporte parfois, ton instinct te mène souvent exactement là où tu devais être.",
    ],
  },
  "He'kari": {
    name: "HE'KARI, Air. Le Visionnaire",
    essence:
      "Tu es l'esprit qui vole, l'idée qui voyage, la parole qui transforme. Tu observes d'en haut, tu vois des motifs là où d'autres voient le chaos, tu perçois de loin. Tu es le rêveur pragmatique : tu inspires, tu relies, tu interprètes et tu portes le savoir d'un endroit à l'autre.",
    virtue:
      "Ta liberté créative et ton inspiration constante. Tu vois des solutions là où d'autres voient des problèmes, tu trouves des chemins même dans le vent. Tu maîtrises l'expression, l'art et la parole. Ta perspective élevée te permet de voir le tableau complet.",
    shadow:
      "Ta dispersion et ta déconnexion. Tu peux être inconstant, distrait, difficile à « ramener sur terre ». Tu te perds dans des possibilités infinies et tu peux sembler froid ou absent quand tu es « là-haut » dans ta tête. Ton conflit : voler libre ou assumer ta responsabilité de messager.",
    path:
      "Ton rituel est le mouvement constant, l'art et la communication. Ton quotidien, c'est « l'air en action » : léger, inspiré, en mouvement. Ton rôle est d'être le messager, le gardien du savoir, l'allié diplomate. Équilibre ton besoin de liberté avec ton devoir de guider.",
    symbol: "La Plume suspendue. Légère mais puissante, symbole du message et du vol.",
    object: "Un carnet que tu portes toujours sur toi.",
    glyph: "Une spirale de vent qui s'élève vers le ciel.",
    lectura: [
      "Ton esprit ne reste jamais immobile : tu vois des idées et des chemins là où d'autres ne voient que des problèmes.",
      "Tu as le don des mots ; tu sais dire exactement ce qui fait que les autres se sentent compris.",
      "Tu as besoin de liberté pour être toi-même, et pourtant tu reviens toujours vers ceux que tu aimes.",
    ],
  },
  Quinametzin: {
    name: "QUINAMETZIN, Terre. Le Gardien Colossal",
    essence:
      "Tu es la stabilité absolue : le pilier, le roc solide, le géant bienveillant qui soutient le monde. Tu es colossal, 2,30 m, impossible à ignorer, et pourtant ta présence apaise au lieu d'intimider. Tu es un protecteur né, une figure de repère et de soutien émotionnel. Tu es le « foyer » fait chair, la base sur laquelle les autres construisent.",
    virtue:
      "Ton honnêteté et ton intégrité inébranlables. Ta Gemme de l'Âme te trahit toujours : tu ne peux pas mentir sur tes émotions. La gemme change de couleur selon ton émotion : blanc pour le calme, jaune pour la joie, vert pour l'harmonie, bleu pour la tristesse, rouge pour l'amour ou la fureur, noir pour le désespoir. Ta vertu est une honnêteté profonde, transparente et pleine de bonté. Tu es celui qui construit, répare, protège et maintient l'ordre naturel.",
    shadow:
      "Le poids du devoir et le sacrifice de soi. Tu peux te sentir obligé de porter le monde, même quand tu n'en peux plus. Ton sens du devoir peut t'écraser. Si tu échoues à protéger quelqu'un, ta gemme le révèle aussitôt... et cette culpabilité peut te marquer pendant des siècles.",
    path:
      "Ton rituel est le travail constant, la construction et le service à la communauté. Tu élèves des murs, répares des routes, bâtis des temples, formes les jeunes. Ton rôle est de tout soutenir, même si cela t'use. Apprends que toi aussi tu mérites du soutien : les piliers ont besoin de fondations.",
    symbol: "La Montagne ancienne. Haute, ferme, patiente et éternelle. Témoin et protectrice.",
    object: "Un outil de travail qui t'accompagne toujours.",
    glyph: "Une montagne aux racines profondes qui s'étendent vers le bas.",
    lectura: [
      "Tu es le pilier des tiens : quand tout tremble, c'est toi qu'on cherche.",
      "Tu n'as pas besoin de faire du bruit pour te faire remarquer ; ta constance parle pour toi.",
      "Tu prends tellement soin des autres que tu oublies parfois que toi aussi, tu mérites du repos.",
    ],
  },
  "Lok'naa": {
    name: "LOK'NAA, Eau. Le Guérisseur",
    essence:
      "Tu es le calme après la tempête. Ta psychologie est profondément empathique : tu ressens avant d'agir, tu lis l'ambiance, tu te déplaces comme l'eau elle-même, en coulant vers là où l'harmonie est nécessaire. Tu es celui qui unit, qui soigne, qui préserve la vie.",
    virtue:
      "Ton empathie et ta capacité de guérison. Tu ne fais pas que comprendre la douleur des autres : tu l'absorbes, tu la transformes et tu la rends sous forme de soulagement. Tu peux te lier émotionnellement à n'importe qui, même à des races que d'autres considéreraient comme « ennemies ». Ta présence apaise et rétablit l'équilibre.",
    shadow:
      "L'évitement et le sacrifice de soi. Ton empathie même peut te consumer. Quand tu ressens trop, tu te fermes, tu fonds émotionnellement ou tu fuis « comme l'eau qui cherche les fissures ». Tu crains de devenir une mer sans rivage : absorber tant de douleur des autres que tu cesses d'être toi-même.",
    path:
      "Ton rituel est l'hospitalité, l'artisanat fluide et les rites de purification. Bains sacrés, chants qui gardent la mémoire vivante, nourriture qui apaise. Ton rôle est de désamorcer, de servir de médiateur, d'amortir le choc. Apprends à poser des limites : soigner sans te briser, couler sans disparaître.",
    symbol:
      "Le Cénote sacré. Profond, limpide, porteur de vie, mais aussi mystérieux et sombre dans ses profondeurs.",
    object: "Un récipient d'eau que tu portes toujours sur toi.",
    glyph: "Une onde d'eau qui se propage en cercles concentriques.",
    lectura: [
      "Tu ressens ce que les autres ne disent pas ; ton empathie est un don que peu possèdent.",
      "Tu as ce talent rare d'apaiser n'importe quelle tempête rien qu'en écoutant.",
      "Tu t'adaptes à tout comme l'eau, mais au fond, tu sais très bien qui tu es.",
    ],
  },
  Hualik: {
    name: "HUALIK, Obscurité. Le Veilleur des Ombres",
    essence:
      "Tu es celui qui observe sans être vu, qui écoute, qui comprend, qui apparaît quand personne ne s'y attend. Tu peux disparaître dans n'importe quelle ombre, te déplacer sans un bruit, voir dans l'obscurité totale. Tu fais partie de quelques dizaines, pas de milliers. Ton existence est un mystère même pour les autres races. Ton identité est de rester hors de vue, mais toujours présent. Tu es l'observateur silencieux, le veilleur des vérités cachées.",
    virtue:
      "Ta ruse et ta perception profonde. Rien ne t'échappe. Tu es intelligent, analytique, et tu sais lire les intentions derrière les mots. La lumière, le bruit et les apparences ne te trompent pas. Ta précision est chirurgicale quand tu agis.",
    shadow:
      "L'isolement et la méfiance. Tu rejettes le contact social, même quand il pourrait t'aider. Tu vois la trahison partout, même là où il n'y en a pas. Ta blessure est simple : « Nous n'avons nulle part où appartenir. » La solitude, bien que nécessaire, est aussi ta condamnation.",
    path:
      "Ton rituel est le silence, les routines précises et la prudence. Mouvements doux, habitudes méticuleuses, longues heures d'observation. Ton rôle est de savoir sans t'exposer, d'intervenir seulement quand c'est crucial. Ton conflit éternel : « Est-ce que je reste dans l'ombre... ou est-ce que j'agis ? »",
    symbol: "La Nouvelle Lune. L'obscurité totale. Non pas l'absence, mais une présence invisible.",
    object: "Un petit objet toujours entre tes mains, une pierre, une pièce, etc.",
    glyph: "Une ombre qui s'étend sans forme définie.",
    lectura: [
      "Tu observes plus que tu ne parles, et c'est pour ça que tu comprends ce qui échappe aux autres.",
      "Ton calme est ta force : tu sais attendre le moment exact pour agir.",
      "Peu de gens te connaissent vraiment, mais ceux qui y parviennent trouvent quelqu'un de profondément loyal.",
    ],
  },
  Irzak: {
    name: "IRZAK, Feu. La Flamme de l'Honneur",
    essence:
      "Tu es la passion qui brûle sans contrôle, l'honneur qui ne plie jamais, l'intensité qui définit chaque instant. Ton étincelle de Zilo doit brûler le plus fort possible avant de retourner au cycle éternel. Tu es charismatique, colérique et brutalement direct : tu ne tournes pas autour du pot, tu n'adoucis pas les vérités, tu n'agis jamais par lâcheté.",
    virtue:
      "Ton courage et ta loyauté inébranlable. Tu es celui qui combat avec bravoure, qui aime de tout son cœur et qui honore avec une dévotion absolue. Ton code d'honneur ne laisse place à aucun doute : tu ne peux pas trahir, tu ne peux pas mentir quand l'honneur est en jeu, tu ne peux pas agir par lâcheté. Tu es une flamme vivante qui inspire respect et crainte.",
    shadow:
      "Ton tempérament et ton intensité destructrice. Ta passion peut se changer en fureur aveugle. Ton orgueil peut brûler des ponts. Ton intensité émotionnelle peut être si ardente qu'elle détruit des relations ou des situations qui auraient pu être sauvées avec plus de calme. Le feu qui te définit peut aussi te consumer, toi et ton entourage.",
    path:
      "Ton rituel est le travail intense, la forge et les rites du feu. Tu travailles au Volcan Éternel, tu expérimentes avec l'énergie de Zilo, tu vis chaque instant avec passion. Ta quête constante d'alternatives au sacrifice cyclique te marque : tu veux que chaque étincelle brûle jusqu'au bout, mais le devoir pèse sur toi. Ton rôle est de brûler avec honneur jusqu'à la fin, mais ton conflit éternel est : Dois-je brûler librement ou accomplir le devoir du sacrifice ? Cherche des alternatives, mais accepte que le poids du devoir te marque.",
    symbol:
      "Le Volcan Éternel. Force contenue, pouvoir qui peut détruire ou créer. Ton foyer, ton maître, ton lien direct avec Zilo.",
    object:
      "Un outil de forge ou un objet que tu portes toujours sur toi et qui représente ton étincelle.",
    glyph: "Une flamme qui brûle vers le haut, intense et constante.",
    lectura: [
      "Ta passion enflamme ceux qui t'entourent ; quand tu crois en quelque chose, tu le défends de toutes tes forces.",
      "Ta parole vaut de l'or : si tu promets quelque chose, tu le tiens.",
      "Tu as un caractère fort, mais aussi un cœur immense pour les tiens.",
    ],
  },
};

/** Preguntas visuales (opciones con imagen o color): titulo, instruccion y nombres de color. */
export const textosVisualesFr: TextosVisuales = {
  simbolo: { title: "Choisis un symbole", scenario: "Ne réfléchis pas trop : lequel t'appelle en premier ?" },
  color: {
    title: "Choisis une couleur",
    scenario: "Fais confiance à ton instinct.",
    nombres: {
      Ton: "Jaune soleil",
      "Toh'kari": "Fuchsia",
      "He'kari": "Bleu ciel",
      Quinametzin: "Vert citron",
      "Lok'naa": "Turquoise",
      Hualik: "Violet",
      Irzak: "Orange",
    },
  },
  deidad: { title: "Quel dieu t'appelle ?", scenario: "Sept dieux t'observent. Choisis celui dont tu te sens le plus proche." },
};
