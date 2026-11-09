/* ============================================================
   TEST DE AFINIDAD EN INGLES — borrador de traduccion de
   lib/affinity-test.ts (mismos ids, puntos y estructura).
   Pendiente de revision por el creador (ver /pendientes).
   Generado a partir del archivo en espanol: si cambian preguntas o
   puntos alla, hay que actualizar aqui tambien.
   ============================================================ */
import type { Question, RaceKey, RaceResult } from "./affinity-test";

export const questionsEn: Question[] = [
  {
    id: 1,
    title: "Your Buddy's Secret",
    scenario:
      "Your best buddy trusts you with something heavy: if you let it out, you save a ton of people, but you screw him over. He asks you to keep quiet. Your conscience is going: \"now what the hell do I do?\"",
    options: [
      {
        id: "q1-o1",
        text: "I can't keep quiet. The truth has to come out, even if I lose my buddy.",
        points: { Ton: 3, Quinametzin: 2, "Lok'naa": 1 },
      },
      {
        id: "q1-o2",
        text: "I confront him head-on. He has to own up, the way it should be.",
        points: { Irzak: 3, Ton: 2, Quinametzin: 1 },
      },
      {
        id: "q1-o3",
        text: "I look for a creative way out. There has to be a way to help everyone without screwing anyone over.",
        points: { "He'kari": 3, "Lok'naa": 2, Quinametzin: 1 },
      },
      {
        id: "q1-o4",
        text: "I keep it to myself for now, but I get everything ready in case all hell breaks loose.",
        points: { Hualik: 3, "He'kari": 2, "Lok'naa": 1 },
      },
    ],
  },
  {
    id: 2,
    title: "The Tradition That Hurts",
    scenario:
      "Your family has a very old tradition that everyone respects, but it's hurting a group of people. Every time you see it, your heart aches. What do you do?",
    options: [
      {
        id: "q2-o1",
        text: "I keep it, but I build real protections for the people who suffer.",
        points: { Quinametzin: 3, "Lok'naa": 2, Ton: 1 },
      },
      {
        id: "q2-o2",
        text: "I break it right now. I don't wait for permission when people are suffering.",
        points: { "Toh'kari": 3, Irzak: 2, "He'kari": 1 },
      },
      {
        id: "q2-o3",
        text: "I adapt it. I keep the good stuff and change what hurts.",
        points: { "He'kari": 3, Quinametzin: 2, "Lok'naa": 1 },
      },
      {
        id: "q2-o4",
        text: "I burn it down and start from scratch. Only the good stays.",
        points: { Irzak: 3, Ton: 2, Quinametzin: 1 },
      },
    ],
  },
  {
    id: 3,
    title: "The Boss Who Chickened Out",
    scenario:
      "Your boss, the one everyone respects, chickened out on something important to save his own skin. You saw it. If you rat him out, there'll be a huge mess. But the lie is eating you up inside.",
    options: [
      {
        id: "q3-o1",
        text: "I expose him with evidence. The truth is the truth, even if all hell breaks loose.",
        points: { Ton: 3, Quinametzin: 2, "He'kari": 1 },
      },
      {
        id: "q3-o2",
        text: "I confront him in private first. He'd better fix the mess before it gets out.",
        points: { Quinametzin: 3, "Lok'naa": 2, Ton: 1 },
      },
      {
        id: "q3-o3",
        text: "I keep quiet and gather more info. I act when the moment is right.",
        points: { Hualik: 3, "He'kari": 2, Quinametzin: 1 },
      },
      {
        id: "q3-o4",
        text: "I confront him and demand he confess. If he chickened out, he should say it to everyone's face.",
        points: { Irzak: 3, Ton: 2, Quinametzin: 1 },
      },
    ],
  },
  {
    id: 4,
    title: "The Last Medicine",
    scenario:
      "There's only one medicine left. You can save a little kid, someone important who will save more people later, or keep it for yourself. Time is running out. What do you do?",
    options: [
      {
        id: "q4-o1",
        text: "I give it to the kid. I can't let someone so defenseless die.",
        points: { "Lok'naa": 3, Ton: 2, Quinametzin: 1 },
      },
      {
        id: "q4-o2",
        text: "I give it to the important one. It's hard, but they'll save more people later.",
        points: { Quinametzin: 3, "He'kari": 2, Ton: 1 },
      },
      {
        id: "q4-o3",
        text: "I try to split it or find a way to save both.",
        points: { "He'kari": 3, "Lok'naa": 2, Ton: 1 },
      },
      {
        id: "q4-o4",
        text: "I keep it. If I go down, no one else will be able to help later.",
        points: { "Toh'kari": 3, Hualik: 2, "He'kari": 1 },
      },
    ],
  },
  {
    id: 5,
    title: "The Traitor in Front of You",
    scenario:
      "Someone in your group betrayed you and caused a real mess. Now they're standing in front of you. Everyone is watching, waiting for your decision.",
    options: [
      {
        id: "q5-o1",
        text: "I judge them by the rules. Clear justice, no revenge.",
        points: { Quinametzin: 3, Ton: 2, Hualik: 1 },
      },
      {
        id: "q5-o2",
        text: "I confront them head-on. Make amends with courage or face the consequences.",
        points: { Irzak: 3, Quinametzin: 2, Ton: 1 },
      },
      {
        id: "q5-o3",
        text: "I try to rehabilitate them. I can help fix this without destroying the person.",
        points: { "Lok'naa": 3, Quinametzin: 2, Ton: 1 },
      },
      {
        id: "q5-o4",
        text: "I turn them into a useful asset. Let them pay by serving in secret.",
        points: { Hualik: 3, "He'kari": 2, "Toh'kari": 1 },
      },
    ],
  },
  {
    id: 6,
    title: "All Hell Breaks Loose",
    scenario:
      "You're in a public place when suddenly all hell breaks loose: screams, people running, panic. You have no idea what's going on, but the danger is real. What do you do?",
    options: [
      {
        id: "q6-o1",
        text: "I become a shield. I protect those who can't run.",
        points: { Quinametzin: 3, Ton: 2, "Lok'naa": 1 },
      },
      {
        id: "q6-o2",
        text: "I calm people down. I lower the tension before someone gets hurt.",
        points: { "Lok'naa": 3, Quinametzin: 2, Ton: 1 },
      },
      {
        id: "q6-o3",
        text: "I move to a strategic spot and coordinate a safe way out.",
        points: { "He'kari": 3, Hualik: 2, Quinametzin: 1 },
      },
      {
        id: "q6-o4",
        text: "I charge straight at the source of the trouble. I cut the danger off at the root.",
        points: { "Toh'kari": 3, Irzak: 2, Hualik: 1 },
      },
    ],
  },
  {
    id: 7,
    title: "They Blame You",
    scenario:
      "You get blamed for something you didn't do and people start to believe it. The looks turn nasty. The lie spreads fast.",
    options: [
      {
        id: "q7-o1",
        text: "I speak plainly. I tell the whole truth, no beating around the bush.",
        points: { Ton: 3, Quinametzin: 2, Irzak: 1 },
      },
      {
        id: "q7-o2",
        text: "I reframe the situation with words. I flip the scene and buy time.",
        points: { "He'kari": 3, Hualik: 2, "Lok'naa": 1 },
      },
      {
        id: "q7-o3",
        text: "I withdraw calmly. I don't fight where they've already judged me without proof.",
        points: { Hualik: 3, Quinametzin: 2, "He'kari": 1 },
      },
      {
        id: "q7-o4",
        text: "I set boundaries face to face. I don't stay quiet and I don't give up my place.",
        points: { Irzak: 3, "Toh'kari": 2, Ton: 1 },
      },
    ],
  },
  {
    id: 8,
    title: "Everything Goes to Hell",
    scenario:
      "You've spent months planning something and at the last second everything goes to hell. The plan fails. Everyone is looking at you, waiting for you to do something.",
    options: [
      {
        id: "q8-o1",
        text: "I organize right away. I assign roles and restore order. Stability first.",
        points: { Quinametzin: 3, Ton: 2, "Lok'naa": 1 },
      },
      {
        id: "q8-o2",
        text: "I change plans on the fly. I improvise something new, fast.",
        points: { "He'kari": 3, "Toh'kari": 2, "Lok'naa": 1 },
      },
      {
        id: "q8-o3",
        text: "First I calm the group down. I lower the tension before deciding.",
        points: { "Lok'naa": 3, Quinametzin: 2, Ton: 1 },
      },
      {
        id: "q8-o4",
        text: "I take command, no excuses. I face it head-on.",
        points: { Irzak: 3, Ton: 2, Quinametzin: 1 },
      },
    ],
  },
  {
    id: 9,
    title: "Your Travel Talisman",
    scenario:
      "Before you set off on a journey, an old man offers you a magical talisman of your choice. Which one do you grab?",
    options: [
      {
        id: "q9-o1",
        text: "A medallion that vibrates when you try to lie to yourself.",
        points: { Ton: 3, Quinametzin: 2, "Lok'naa": 1 },
      },
      {
        id: "q9-o2",
        text: "A coin that never lands the same way twice.",
        points: { "Toh'kari": 3, "He'kari": 2, Hualik: 1 },
      },
      {
        id: "q9-o3",
        text: "A compass that points to what you most need to learn.",
        points: { "He'kari": 3, "Lok'naa": 2, Ton: 1 },
      },
      {
        id: "q9-o4",
        text: "A stone that grows heavy when danger is near.",
        points: { Quinametzin: 3, Hualik: 2, Ton: 1 },
      },
      {
        id: "q9-o5",
        text: "A ring that heats up when you break a promise.",
        points: { Irzak: 3, Ton: 2, Quinametzin: 1 },
      },
    ],
  },
  {
    id: 10,
    title: "Your Way to Reset",
    scenario:
      "After a rough mess, what's the first thing you do to get back to normal?",
    options: [
      {
        id: "q10-o1",
        text: "I speak plainly and close the matter with the truth.",
        points: { Ton: 3, Quinametzin: 2, "Lok'naa": 1 },
      },
      {
        id: "q10-o2",
        text: "I move. I change places, breathe new air. I come back different.",
        points: { "He'kari": 3, "Toh'kari": 2, "Lok'naa": 1 },
      },
      {
        id: "q10-o3",
        text: "I reorganize. I sort out habits, tasks, something tangible that steadies me.",
        points: { Quinametzin: 3, Ton: 2, Hualik: 1 },
      },
      {
        id: "q10-o4",
        text: "I disappear for a while. Silence, distance. I recalculate everything alone.",
        points: { Hualik: 3, "Lok'naa": 2, "He'kari": 1 },
      },
      {
        id: "q10-o5",
        text: "I do something physical and intense. I turn what I lived through into strength.",
        points: { Irzak: 3, "Toh'kari": 2, Quinametzin: 1 },
      },
    ],
  },
];

export const raceResultsEn: Record<RaceKey, RaceResult> = {
  Ton: {
    name: "TON (Light) - The Illuminator",
    essence:
      "You are the truth that cannot be hidden, the light that reveals without meaning to. You are one of fewer than 100 Ton in all of Tonaltlan - your existence is legendary. You live for centuries, a living library of memory and wisdom. Your very existence is a moral beacon: you cannot lie, you cannot deceive, you cannot stay silent when you see injustice. Your clarity is both your virtue and your vulnerability.",
    virtue:
      "Your absolute moral backbone. You are the one who lights the way for others, who protects without expecting reward, who rights injustices because you cannot ignore them. Your light burns away heavy feelings and grudges, leaving only clarity and purpose.",
    shadow:
      "Your greatest terror is not death, but being corrupted or darkened. You fear becoming a \"sun that burns instead of warms\". Your sincerity makes you vulnerable: you cannot keep strategic secrets, and sometimes the truth you reveal can destroy relationships or start wars.",
    path:
      "Your ritual is to exist with intentional purity. You don't need to pray: every kind act honors Tonatli. Your role is to be the ethical guide, the one who reveals truths even when they hurt, the one who protects the moral order of the world. Accept that your total exposure is both your power and your wound.",
    symbol: "The Dawn - The moment when light returns and the world is revealed.",
    object: "A mirror that reflects the truth without distortion.",
    glyph: "A sun with rays shining in every direction.",
  },
  "Toh'kari": {
    name: "TOH'KARI (Lightning) - The Chaotic",
    essence:
      "You are the storm without control, the impulse that won't stop. You live between the desire to destroy and the need to survive. Your inner lightning is a beast you must tame just enough not to die... and use before it consumes you.",
    virtue:
      "Your unstoppable intensity. When you focus on something, there is no doubt, no fear, no hesitation: only direct action. You can carry out what others wouldn't even dare to think. Your strength is brutal but honest.",
    shadow:
      "Your tendency toward impulse and violence can destroy you as much as those around you. The lightning you unleash also burns you inside. You fear becoming a bolt that strikes by accident, senseless destruction. Your eternal conflict: \"Can I hold back... or will I destroy everything again?\"",
    path:
      "Your ritual is daily survival. There is no everyday life for you: there is erratic movement, impatience and deep solitude. Your role is to be the wild exile who survives in a world that fears you. Learn to decide when NOT to destroy: that is your true moral conflict.",
    symbol:
      "The Lightning That Strikes a Lonely Mountain - Brutal, unpredictable, beautiful and terrifying.",
    object: "A shard of metal that still holds an electric charge.",
    glyph: "A zigzag bolt that never strikes the same place twice.",
  },
  "He'kari": {
    name: "HE'KARI (Air) - The Visionary",
    essence:
      "You are the mind that flies, the idea that travels, the word that transforms. You watch from above, you see patterns where others see chaos, you perceive from far away. You are the practical dreamer: you inspire, connect, interpret and carry knowledge from one place to another.",
    virtue:
      "Your creative freedom and constant inspiration. You see solutions where others see problems, you find paths even in the wind. You are a master of expression, art and the spoken word. Your elevated perspective lets you see the whole picture.",
    shadow:
      "Your scattered focus and disconnection. You can be inconsistent, distracted, hard to \"bring down to earth\". You get lost in endless possibilities and may seem cold or absent when you're \"up there\" in your head. Your conflict: flying free vs. your responsibility as a messenger.",
    path:
      "Your ritual is constant movement, art and communication. Your everyday life is \"air in action\": light, inspired, in motion. Your role is to be the messenger, the keeper of knowledge, the diplomatic ally. Balance your need for freedom with your duty to guide.",
    symbol: "The Suspended Feather - Light but powerful, a symbol of message and flight.",
    object: "A notebook you always carry with you.",
    glyph: "A spiral of wind rising toward the sky.",
  },
  Quinametzin: {
    name: "QUINAMETZIN (Earth) - The Colossal Guardian",
    essence:
      "You are absolute stability: the pillar, the solid rock, the gentle giant who holds up the world. You are colossal (2.30 m), impossible to overlook, yet your presence calms instead of intimidating. You are a born protector, a figure of guidance and emotional support. You are \"home\" made flesh, the foundation others build on.",
    virtue:
      "Your unbreakable honesty and integrity. Your Gem of Spirit always gives you away: you cannot lie emotionally. The gem changes color with your emotion: white for calm, yellow for joy, green for harmony, blue for sadness, red for love or fury, black for despair. Your virtue is a deep, transparent honesty full of kindness. You are the one who builds, repairs, protects and keeps the natural order.",
    shadow:
      "Your burden of duty and self-sacrifice. You may feel obliged to carry the world, even when you can't anymore. Your sense of duty can drown you. If you fail to protect someone, your gem reveals it at once... and that guilt can mark you for centuries.",
    path:
      "Your ritual is constant work, building and community service. You raise walls, repair roads, build temples, train the young. Your role is to hold things up, even if it wears you down. Learn that you also deserve support: pillars need foundations.",
    symbol: "The Ancient Mountain - Tall, firm, patient and eternal. Witness and protector.",
    object: "A work tool that is always with you.",
    glyph: "A mountain with deep roots spreading downward.",
  },
  "Lok'naa": {
    name: "LOK'NAA (Water) - The Healer",
    essence:
      "You are the calm after the storm. Your psychology is deeply empathetic: you feel before you act, you read the room, you move like water itself flowing toward where harmony is needed. You are the one who unites, who heals, who preserves life.",
    virtue:
      "Your empathy and healing ability. You don't just understand other people's pain: you absorb it, transform it and give it back as relief. You can connect emotionally with anyone, even with races others would consider \"enemies\". Your presence calms and restores balance.",
    shadow:
      "Your avoidance and self-sacrifice. Your very empathy can consume you. When you feel too much, you shut down, melt emotionally or flee \"like water seeking cracks\". You fear becoming a sea without shores: absorbing so much pain from others that you stop being yourself.",
    path:
      "Your ritual is hospitality, fluid craftsmanship and purification rites. Sacred baths, songs that keep memory alive, food that soothes. Your role is to de-escalate, mediate, absorb the blow. Learn to set limits: heal without breaking, flow without disappearing.",
    symbol:
      "The Sacred Cenote - Deep, clear, a bearer of life, but also mysterious and dark at its depths.",
    object: "A water vessel you always carry with you.",
    glyph: "A ripple of water flowing in concentric circles.",
  },
  Hualik: {
    name: "HUALIK (Darkness) - The Shadow Watcher",
    essence:
      "You are the one who watches unseen, who listens, who understands, who appears when no one expects it. You can vanish into any shadow, move without a sound, see in total darkness. You are one of dozens, not thousands - your existence is a mystery even to other races. Your identity is to stay out of sight, yet always present. You are the silent observer, the watcher of hidden truths.",
    virtue:
      "Your cunning and deep perception. Nothing escapes your notice. You are intelligent, analytical, and you can read the intentions behind words. Light, noise and appearances don't fool you. Your precision is surgical when you act.",
    shadow:
      "Your isolation and distrust. You reject social contact, even when it could help you. You see betrayal everywhere, even where there is none. Your wound is simple: \"We have no place to belong.\" Solitude, though necessary, is also your sentence.",
    path:
      "Your ritual is silence, precise routines and cautious conduct. Soft movements, meticulous habits, long hours of watching. Your role is to know without exposing yourself, to step in only when it is critical. Your eternal conflict: \"Do I stay in the shadows... or do I act?\"",
    symbol: "The New Moon - Total darkness. Not absence, but invisible presence.",
    object: "A small object that is always in your hands (a stone, a coin, etc.)",
    glyph: "A shadow that spreads with no defined shape.",
  },
  Irzak: {
    name: "IRZAK (Fire) - The Flame of Honor",
    essence:
      "You are the passion that burns without control, the honor that never bends, the intensity that defines every moment. Your spark of Zilo must burn as brightly as possible before returning to the eternal cycle. You are charismatic, temperamental and brutally direct: you don't beat around the bush, you don't soften truths, you never act out of cowardice.",
    virtue:
      "Your courage and unbreakable loyalty. You are the one who fights bravely, loves wholeheartedly and honors with absolute devotion. Your code of honor allows no doubt: you cannot betray, you cannot lie when honor is at stake, you cannot act out of cowardice. You are a living flame that inspires respect and fear.",
    shadow:
      "Your temper and destructive intensity. Your passion can turn into blind fury. Your pride can burn bridges. Your emotional intensity can be so scorching that it destroys relationships or situations that could have been saved with more calm. The fire that defines you can also consume you and those around you.",
    path:
      "Your ritual is intense work, the forge and fire rites. You work at the Eternal Volcano, experiment with Zilo's energy, live every moment with passion. Your constant search for alternatives to the cyclical sacrifice marks you: you want every spark to burn until the end, but duty weighs on you. Your role is to burn with honor until the end, but your eternal conflict is: Should I burn freely or fulfill the duty of sacrifice? Look for alternatives, but accept that the weight of duty marks you.",
    symbol:
      "The Eternal Volcano - Contained force, power that can destroy or create. Your home, your teacher, your direct connection to Zilo.",
    object:
      "A forging tool or an object you always carry with you that represents your spark.",
    glyph: "A flame burning upward, intense and steady.",
  },
};
