/* ============================================================
   MOCK DATA — Spanish placeholder text for all compendium sections.
   Replace with real content when ready.
   ============================================================ */

export interface CompendiumEntry {
  name: string;
  slug: string;
  description: string;
  tags: string[];
  coverImageSrc?: string;
  coverImageAlt?: string;
  sections: { title: string; content: string }[];
}

// ── CLASES ──────────────────────────────────────────────────
export const clases: CompendiumEntry[] = [
  {
    name: "Brujo Catemaco",
    slug: "brujo-catemaco",
    description:
      "Brujos artesanos procedentes de Tl'atl que combaten a traves del vinculo espiritual con su Ixip y el despertar de los elementos tonales.",
    tags: ["Invocador", "Estratega", "Inteligencia"],
    coverImageSrc: "/preview/images/Brujo_Catemaco.jpg",
    coverImageAlt: "Brujo Catemaco junto a su Ixip en una cueva del reino de Tl'atl.",
    sections: [
      {
        title: "Descripcion",
        content:
          "Los Catemacos son brujos artesanos procedentes de la region pantanosa del reino de Tl'atl. Desde su infancia, estos misticos tallan un Muneco Tonal conocido como Ixip y le infunden parte de su esencia espiritual. A diferencia de otras clases, el Catemaco no aprende conjuros a partir de grimorios ni obtiene su magia mediante pactos; su poder proviene del vinculo con su Ixip. A traves de rituales especiales, el brujo transmite parte de su propia energia al Ixip hasta que, mediante un ritual ancestral realizado en la Isla de las Munecas, algunos logran despertarlos como companeros magicos capaces de amplificar el Punto Tonal del brujo y manifestar la fuerza de los elementos. Mas no todos sobreviven al intento; quienes lo consiguen se convierten en Brujos Catemacos.\n\nDesde que inicia su camino, cada Catemaco porta en su punto tonal una afinidad elemental latente, un reflejo espiritual de su vinculo con los espiritus del pantano. Al alcanzar el nivel 3, esta afinidad finalmente despierta y se manifiesta en su aliado, definiendo su forma, resistencias y rol dentro del grupo. El Ixip canaliza entonces uno de los siete elementos tonales: Fuego, Agua, Tierra, Aire, Luz, Obscuridad o Rayo.\n\nCada elemento se expresa de manera distinta: un atacante envuelto en llamas, un sanador impulsado por la energia del agua, un guardian de roca, un combatiente de largo alcance guiado por el viento, un controlador de luz, un asesino sombrio o un conjurador de tormentas. Los Catemacos actuan como mediadores entre los espiritus del pantano y el mundo mortal, y su Ixip es tanto un arma como un aliado, creciendo en poder y complejidad al mismo ritmo que su creador.\n\nAunque muchos usuarios de la magia ejercen su poder a traves de su Carisma, el Catemaco fundamenta su poder en el estudio y estrategia. Para ellos, la Inteligencia es el rasgo clave; su estilo de combate depende de la planificacion tactica, del conocimiento de los elementos y de la destreza manual de tallar al Ixip. Ademas de estudiar artesania, un Catemaco aprende principios del arte de la guerra y del posicionamiento estrategico para colocar a su Ixip de manera optima en cada batalla.",
      },
      {
        title: "Rol de Clase",
        content:
          "El Catemaco funciona como un invocador con companero. El brujo y su Ixip actuan como una sola unidad de combate, compartiendo el mismo turno. Durante este turno, el movimiento y la accion pueden ser usados por el invocador o por el Ixip tonal, pero no por ambos. El brujo mantiene el vinculo, canaliza las energias y toma las decisiones tacticas, mientras el Ixip ejecuta ataques, defensas o apoyos segun su elemento. Dependiendo del elemento, el Ixip puede actuar como atacante, defensor, sanador o controlador.",
      },
      {
        title: "Caracteristicas Generales",
        content:
          "- Dado de Golpe: 1d8 por nivel de Catemaco.\n- Competencia con Armaduras: Armaduras ligeras.\n- Competencia con Armas: Armas simples.\n- Herramientas: Herramientas de carpintero.\n- Tiradas de Salvacion: Sabiduria e Inteligencia.\n- Habilidades: Escoge dos entre Arcanos, Investigacion, Naturaleza, Religion, Sigilo y Percepcion.\n- Equipo inicial: una daga o baston, un juego de herramientas de tallado, un paquete de explorador y tu Muneco Tonal Inerte.",
      },
      {
        title: "Tabla de Progresion del Catemaco",
        content:
          "Esta tabla resume los rasgos de clase que obtienes a medida que subes de nivel. El bonificador de competencia sigue el esquema estandar de Dungeons & Dragons 2024.\n\nNivel | Bonif. Competencia | Rasgos\n1  | +2 | Muneco Tonal, Invocar Ixip, Vinculo Espiritual\n2  | +2 | Impulso Tonal\n3  | +2 | Despertar Elemental\n4  | +2 | Mejora de Caracteristica\n5  | +3 | Ataque Extra (Ixip)\n6  | +3 | Rasgo de Elemento (Potencia I)\n7  | +3 | Mejora del Ixip\n8  | +3 | Mejora de Caracteristica\n9  | +4 | Aura Tonal Menor\n10 | +4 | Rasgo de Elemento (Potencia II)\n11 | +4 | Evolucion del Ixip\n12 | +4 | Mejora de Caracteristica\n13 | +5 | Impulso Tonal Mejorado\n14 | +5 | Rasgo de Elemento (Potencia III)\n15 | +5 | Segundo Punto Tonal\n16 | +5 | Mejora de Caracteristica\n17 | +6 | Aura Tonal Mayor\n18 | +6 | Rasgo de Elemento (Potenciacion o Fusion)\n19 | +6 | Mejora de Caracteristica\n20 | +6 | Maestria Catemaca",
      },
      {
        title: "Estadisticas del Ixip Tonal",
        content:
          "A continuacion se muestran valores para el Ixip invocado. Los puntos de golpe y la clase de armadura crecen con el nivel del Catemaco y reflejan la resiliencia de la creacion. El bonificador de ataque del Ixip utiliza el bonificador de competencia del Catemaco mas su modificador de Inteligencia; el dano base se ajusta por el elemento elegido y mejora con rasgos de nivel.\n\nNivel | Bonif. Competencia | CA | PV  | Ataque (bonif.) | Dano base\n1  | +2 | 14 | 10  | BC + Int | 1d8 + BC\n2  | +2 | 14 | 15  | BC + Int | 1d8 + BC\n3  | +2 | 14 | 20  | BC + Int | 1d8 + BC\n4  | +2 | 14 | 25  | BC + Int | 1d8 + BC\n5  | +3 | 15 | 30  | BC + Int | 1d8 + BC\n6  | +3 | 15 | 35  | BC + Int | 1d8 + BC\n7  | +3 | 15 | 40  | BC + Int | 1d8 + BC\n8  | +3 | 15 | 45  | BC + Int | 1d8 + BC\n9  | +4 | 16 | 50  | BC + Int | 1d8 + BC\n10 | +4 | 16 | 55  | BC + Int | 1d8 + BC\n11 | +4 | 16 | 60  | BC + Int | 1d8 + BC\n12 | +4 | 16 | 65  | BC + Int | 1d8 + BC\n13 | +5 | 17 | 70  | BC + Int | 1d8 + BC\n14 | +5 | 17 | 75  | BC + Int | 1d8 + BC\n15 | +5 | 17 | 80  | BC + Int | 1d8 + BC\n16 | +5 | 17 | 85  | BC + Int | 1d8 + BC\n17 | +6 | 18 | 90  | BC + Int | 1d8 + BC\n18 | +6 | 18 | 95  | BC + Int | 1d8 + BC\n19 | +6 | 18 | 100 | BC + Int | 1d8 + BC\n20 | +6 | 18 | 105 | BC + Int | 1d8 + BC\n\nNota: el dano se modifica segun el elemento; por ejemplo, un Ixip de Fuego anade dano de fuego, mientras que uno de Rayo inflige dano de relampago. Esta tabla es la base que se complementa con los rasgos de cada camino elemental.",
      },
      {
        title: "Rasgos de Clase",
        content:
          "Muneco Tonal (Nivel 1)\nEl Ixip es el corazon del Catemaco. Desde antes de iniciar su camino, el Catemaco ha tallado un muneco y lo ha sometido al ritual de despertar, infundiendolo con su esencia tonal. A nivel 1, puedes invocar al Ixip como accion adicional; este se materializa en un espacio libre a 5 pies de ti. El Ixip actua bajo tu control directo, utilizando tu bonificador de competencia y tu modificador de Inteligencia para sus ataques y efectos. Si el Ixip cae a 0 puntos de golpe, su forma se disipa. Puedes reconstituirlo tras completar un descanso corto, realizando un breve ritual que restablece el vinculo.\n\nInvocar Ixip (Nivel 1)\nPuedes invocar o despedir a tu Ixip como accion adicional. Fuera de combate permanece en forma de talisman, pero en combate adopta una forma acorde a su elemento, aumentando de tamano para cumplir su rol. El Ixip persiste hasta que lo despidas, caigas inconsciente o sea destruido.\n\nVinculo Espiritual (Nivel 1)\nEstableces un vinculo telepatico con tu Ixip mientras permanezca a 18 metros de ti. Puedes usar una accion para ordenar al Ixip que realice un Ataque Tonal, un ataque basico cuyo tipo de dano corresponde a tu elemento y cuyos efectos se describen en el camino elemental.\n\nImpulso Tonal (Nivel 2)\nAl gastar una accion adicional puedes potenciar a tu Ixip, otorgandole ventaja en su siguiente tirada de ataque, prueba de habilidad o tirada de salvacion. Puedes usar este rasgo un numero de veces igual a tu modificador de Inteligencia (minimo 1) y recuperas todos los usos al completar un descanso largo.\n\nDespertar Elemental (Nivel 3)\nAl alcanzar el nivel 3, el elemento de tu punto tonal se manifiesta en tu Ixip. Esta manifestacion define su forma, sus resistencias y su rol dentro del grupo. El elemento manifestado puede ser Fuego, Agua, Tierra, Aire, Luz, Obscuridad o Rayo, y refleja la naturaleza interna del vinculo entre tu y el Ixip, mas que una eleccion consciente.\n\nMejora de Caracteristica (Niveles 4, 8, 12, 16, 19)\nEn los niveles indicados puedes aumentar una puntuacion de caracteristica en 2 o dos puntuaciones diferentes en 1 cada una. Tambien puedes elegir un dote si tu grupo utiliza la variante de dotes.\n\nAtaque Extra (Ixip) (Nivel 5)\nCuando el Ixip utilice la accion de ataque podra hacer dos ataques en lugar de uno. Esto representa la creciente ferocidad y practica marcial de tu creacion animada.\n\nRasgo de Elemento: Potencia I (Nivel 6)\nEl Ixip obtiene un rasgo distintivo de su elemento que potencia su funcionalidad basica. Consulta la tabla de tu elemento para mas detalles.\n\nMejora del Ixip (Nivel 7)\nEl Ixip mejora sus atributos fisicos: su clase de armadura aumenta en 1, obtiene un incremento de 3 metros a su velocidad de movimiento y sus ataques infligen 1d4 de dano elemental adicional.\n\nAura Tonal Menor (Nivel 9)\nGeneras un aura de 10 pies centrada en el Ixip cuyo efecto depende de tu elemento primario. Por ejemplo, Fuego inflige un pequeno dano de fuego a los enemigos al inicio de su turno; Agua aumenta las tiradas de curacion de tus aliados; Tierra ofrece +1 CA a los aliados adyacentes al Ixip; Aire permite ignorar el terreno dificil; Luz otorga ventaja contra miedo; Obscuridad permite a los aliados esconderse como accion adicional; Rayo concede +1 en iniciativa al grupo.\n\nRasgo de Elemento: Potencia II (Nivel 10)\nAdquieres un segundo rasgo de tu elemento que mejora o expande sus funciones, como inmunidad a tu tipo de dano, habilidades defensivas mejoradas o desplazamientos extraordinarios.\n\nEvolucion del Ixip (Nivel 11)\nEl Ixip incrementa su presencia fisica: su tamano aumenta y sus ataques cuentan como magicos a efectos de superar resistencias e inmunidades. Ademas, obtiene resistencia al tipo de dano elemental de tu camino.\n\nImpulso Tonal Mejorado (Nivel 13)\nCuando uses Canalizar Tonalidad puedes aplicar sus beneficios a dos ataques o dos tiradas diferentes del Ixip en el mismo turno.\n\nRasgo de Elemento: Potencia III (Nivel 14)\nTu elemento se manifiesta en su forma mas pura con un rasgo nuevo y potente. Este rasgo suele otorgar un efecto de area, una mejora radical a tus habilidades o un poder supremo de control sobre tu dominio elemental.\n\nSegundo Punto Tonal (Nivel 15)\nTu Ixip despierta un segundo nucleo elemental. Puedes optar por una de las dos opciones:\n- Elegir un elemento distinto: el Ixip gana el rasgo de nivel 3 de un segundo elemento. En nivel 18 obtendra tambien el rasgo de nivel 6 de ese elemento secundario.\n- Potenciar el mismo elemento: si vuelves a elegir tu elemento primario, todos sus danos y bonificaciones aumentan. El Ixip obtiene +2 CA adicional y su resistencia al tipo de dano de tu camino se convierte en inmunidad. A partir de nivel 18 obtendra una habilidad de fusion unica dentro de su elemento.\n\nAura Tonal Mayor (Nivel 17)\nEl radio de tu aura aumenta a 30 pies y su efecto se duplica en potencia. Los bonos numericos se incrementan y los danos o curaciones se aplican con mayor intensidad.\n\nRasgo de Elemento: Potenciacion o Fusion (Nivel 18)\nDependiendo de si posees un segundo elemento o reforzaste el primero, obtienes una habilidad decisiva. Si tienes un segundo elemento, adquieres su rasgo de nivel 6. Si potenciaste el mismo, obtienes una capacidad de fusion unica. Consulta la tabla del elemento para ver los efectos exactos.\n\nMaestria Catemaca (Nivel 20)\nTu union con el Ixip es perfecta. Puedes invocar o despedirlo sin usar ninguna accion. Cuando el Ixip ataque puedes usar tu reaccion para permitirte a ti mismo hacer un ataque, y viceversa. Ademas, tu y el Ixip obteneis inmunidad al tipo de dano de tu elemento y no puede ser destruido permanentemente mientras vivas.",
      },
      {
        title: "Subclases Elementales",
        content:
          "Fuego - Ixip Igneo (DPS Mele)\nNivel 3: Garras Igneas. El Ixip se envuelve en llamas; sus ataques cuerpo a cuerpo infligen 1d8 de dano cortante mas 1d4 de fuego. Obtiene resistencia al dano de fuego y cualquier criatura que te golpee con un ataque cuerpo a cuerpo sufre dano de fuego igual a tu bonificador de competencia.\nNivel 6: Llamarada. Una vez por descanso corto, cuando el Ixip reciba dano de una criatura a 5 pies, puede usar su reaccion para desatar llamas que obligan al atacante a hacer una salvacion de Destreza. El objetivo sufre 4d6 de dano de fuego si falla.\nNivel 10: Aura Ignea. El Ixip gana inmunidad al dano de fuego. Ademas, al moverse puede atravesar espacios de enemigos sin provocar ataques de oportunidad; cada criatura atravesada sufre dano de fuego igual a tu modificador de Inteligencia.\nNivel 14: Forma Infernal. Al entrar en combate, el Ixip irradia un calor abrasador; al inicio de cada uno de tus turnos, todas las criaturas enemigas a 5 pies sufren dano de fuego igual a tu modificador de Inteligencia. Su luz ilumina 30 pies de luz brillante y 30 pies adicionales de luz tenue.\nNivel 18: Erupcion Ignea. Una vez por descanso largo, el Ixip puede desatar una explosion en un radio de 20 pies centrado en si misma. Todas las criaturas que elijas deben realizar una salvacion de Destreza; sufren 8d6 de dano de fuego y quedan prendidas en llamas durante 1 minuto. Si el Ixip posee un segundo elemento, los objetivos fallidos tambien sufren los efectos del dano secundario.\n\nAgua - Corriente Benevolente (Soporte / Curacion)\nNivel 3: Oleada Sanadora. El Ixip canaliza el poder curativo del agua. Como accion puede tocar a una criatura restaurando 1d6 + tu modificador de Inteligencia puntos de golpe. Tiene un numero de usos igual a tu bonificador de competencia y los recupera tras un descanso largo. Obtiene resistencia al dano por frio y una velocidad de nado igual a su velocidad de movimiento.\nNivel 6: Bruma Regeneradora. Una vez por descanso largo, como accion, el Ixip convoca una niebla que cura hasta a tres criaturas de tu eleccion en un radio de 30 pies, restaurando 2d6 + tu modificador de Inteligencia puntos de golpe. Alternativamente puede eliminar la condicion Envenenado.\nNivel 10: Velo de Agua. Cuando el Ixip sea objetivo de un ataque puede usar su reaccion para volverse momentaneamente fluida y reducir a la mitad el dano recibido. Puedes usar este rasgo un numero de veces igual a tu modificador de Inteligencia por descanso largo.\nNivel 14: Oleada Purificadora. Una vez por descanso largo puedes emitir una oleada curativa de 30 pies centrada en el Ixip. Tu y todos los aliados que elijas recuperan 4d6 + tu modificador de Inteligencia puntos de golpe y se eliminan las condiciones de Cegado, Sordo, Envenenado y cualquier enfermedad que padezcan.\nNivel 18: Mar Interior. Si potenciaste el mismo elemento, el Ixip obtiene Oleada de Vida: una vez por dia, como accion, puede sanar a todos los aliados a 60 pies por 6d6 + tu modificador de Inteligencia y otorgarles ventaja en sus tiradas de salvacion contra efectos de muerte durante 1 hora. Si tomaste un segundo elemento, en lugar de ello el Ixip aprende el rasgo de nivel 6 de ese elemento secundario.\n\nTierra - Roble Guardian (Tanque)\nNivel 3: Armadura de Corteza y Provocar. El Ixip se reviste de corteza y raices, su CA aumenta en 1 y su velocidad de movimiento disminuye en 5 pies. Cuando impacta a una criatura con un ataque cuerpo a cuerpo puede marcarla: el objetivo tiene desventaja en sus ataques contra criaturas que no sean el Ixip hasta el final de tu siguiente turno. Si un enemigo marcado ataca a otro objetivo que no seas tu o tu muneca, el Ixip puede usar su reaccion para hacer un ataque contra ese enemigo.\nNivel 6: Escudo Viviente. Como reaccion, cuando una criatura a 5 pies del Ixip vaya a recibir dano, puedes interponerla; reduce el dano en 1d10 + tu bonificador de competencia.\nNivel 10: Lazo de Raices. Una vez por descanso corto, el Ixip hace brotar lianas desde el suelo para atraer a un enemigo. El objetivo a hasta 30 pies debe hacer una salvacion de Fuerza; en caso de fallar es arrastrado 15 pies hacia el Ixip y cae derribado si termina su movimiento a 5 pies de ella.\nNivel 14: Guardian Inamovible. El Ixip obtiene tenacidad extrema: una vez por descanso largo, si sus puntos de golpe se reducen a 0, puede quedar a 1 punto de golpe en su lugar. Ademas, no puede ser empujada ni derribada mientras este consciente y es inmune al estado de Asustado.\nNivel 18: Coloso Terrenal. El Ixip crece hasta tamano Grande y obtiene +2 CA y +30 puntos de golpe. Ademas, puede usar una accion para plantar sus raices en el suelo, otorgando a los aliados a 10 pies +2 CA hasta el inicio de tu siguiente turno. Si elegiste un segundo elemento, en vez de esta mejora adquieres el rasgo de nivel 6 de tu elemento secundario.\n\nAire - Viento Errante (DPS a Distancia y Movilidad)\nNivel 3: Flechas de Viento. El Ixip obtiene competencia con arcos y ballestas; su velocidad aumenta 10 pies. Sus ataques a distancia con arcos infligen 1d8 de dano cortante mas PB y puede empujar al objetivo 10 pies al impactar. Obtiene resistencia al dano de trueno y duplica la distancia de sus saltos.\nNivel 6: Paso Ligero. El terreno dificil no ralentiza al Ixip, y no sufre dano por caida. Ademas, cuando el Ixip use la accion de retirada, su velocidad se duplica hasta el final de su turno.\nNivel 10: Evasion. Cuando el Ixip este sujeta a un efecto que permita tirada de salvacion de Destreza para reducir a la mitad el dano, recibira 0 dano con un exito y solo la mitad con un fracaso.\nNivel 14: Vortice Cortante. Una vez por descanso largo, como accion, el Ixip dispara rafagas en un area de 15 pies de radio. Todas las criaturas que elijas en ese area deben hacer una salvacion de Destreza; si fallan sufren 4d6 de dano cortante y son empujadas 10 pies en direccion de tu eleccion.\nNivel 18: Tormenta Cortante. Si tu elemento se potencio a nivel 15, el Ixip puede volar a voluntad con velocidad igual a su velocidad terrestre; los ataques a distancia contra ella tienen desventaja mientras este volando. Si elegiste un segundo elemento, obtienes en su lugar el rasgo de nivel 6 de esa senda.\n\nLuz - Brillo Celestial (Controlador)\nNivel 3: Destello Cegador. El Ixip proyecta luz brillante en un radio de 20 pies y 30 pies de luz tenue adicional. Puede utilizar una accion para lanzar un destello a una criatura a 30 pies. El objetivo debe superar una salvacion de Constitucion o quedar cegado hasta el final de su siguiente turno.\nNivel 6: Escudo de Luz. Como reaccion, cuando una criatura aliada o tu que puedas ver sea objetivo de un ataque a 30 pies, puedes conceder desventaja a esa tirada de ataque mediante un destello protector.\nNivel 10: Aura de Claridad. El Ixip emana un aura de 10 pies que otorga +1 CA a los aliados dentro de ella y ventaja en tiradas de salvacion contra los estados de Cegado o Asustado.\nNivel 14: Barrera Solar. Una vez por descanso largo, como accion, puedes levantar una barrera de luz invisible en un area de 15 pies por 15 pies. La barrera dura 1 minuto, bloquea movimiento y ataques de criaturas hostiles, pero permite el paso de aliados.\nNivel 18: Expiacion. Si reforzaste la misma senda, el Ixip puede estallar en un destello purificador de 30 pies. Todas las criaturas que elijas deben hacer una salvacion de Constitucion o quedar cegadas por 1 minuto; criaturas no muertas sufren 4d6 de dano radiante ademas. Si tienes un segundo elemento, obtienes el rasgo de nivel 6 de ese elemento.\n\nObscuridad - Sombra Acechante (Asesino Sigiloso)\nNivel 3: Golpe Sombrio. El Ixip gana competencia en Sigilo y resistencia al dano necrotico. Una vez por turno, si tiene ventaja en un ataque o si un aliado esta a 5 pies del objetivo, anade 1d6 de dano necrotico adicional. Este dano incrementa a 2d6 en nivel 7, 3d6 en nivel 11, 4d6 en nivel 15 y 5d6 en nivel 19.\nNivel 6: Paso entre Sombras. Cuando el Ixip este en penumbra u oscuridad, puede usar una accion adicional para teletransportarse 30 pies a otro lugar en penumbra u oscuridad que pueda ver. No provoca ataques de oportunidad al desplazarse de esta forma.\nNivel 10: Manto Umbrio. El Ixip puede lanzar Invisibilidad sobre si misma una vez por descanso corto sin necesidad de componentes. Ademas, mientras este en oscuridad, incluso criaturas con vision en la oscuridad tienen desventaja para detectar al Ixip.\nNivel 14: Critico Tenebroso. Una vez por descanso largo, cuando el Ixip golpee a una criatura que no sepa de su presencia, todos los dados de dano furtivo se consideran maximos.\nNivel 18: Asesinato Perfecto. Si mantienes el mismo elemento, puedes usar Critico Tenebroso dos veces por dia y el dado de dano furtivo aumenta en 1d6 adicional. Si posees un segundo elemento, sustituyes esta habilidad por el rasgo de nivel 6 de tu senda secundaria.\n\nRayo - Tormenta Viviente (Mago Ofensivo)\nNivel 3: Descarga Tonal. El Ixip aprende a disparar un rayo electrico a 60 pies. Hace una tirada de ataque; al impactar inflige 1d8 de dano de relampago, que escala a 2d8 en nivel 5, 3d8 en nivel 11 y 4d8 en nivel 17. Obtiene resistencia al dano de relampago.\nNivel 6: Arco Electrico. Cuando el Ixip impacte a un enemigo con su descarga o con un efecto de relampago, una chispa salta a otro enemigo a 10 pies y le inflige dano de relampago igual a tu modificador de Inteligencia.\nNivel 10: Tormenta Breve. Una vez por descanso corto, como accion, el Ixip elige hasta tres criaturas en un radio de 30 pies. Cada criatura debe hacer una salvacion de Destreza o recibir 4d6 de dano de relampago. Puedes cambiar uno de esos rayos por un estallido de trueno que ensordece al objetivo.\nNivel 14: Relampago Viviente. Una vez por descanso largo, como accion, el Ixip se convierte en un rayo y se desplaza en linea recta hasta 60 pies. Todas las criaturas en la linea deben hacer una salvacion de Destreza o reciben 8d6 de dano de relampago. Al final del recorrido el Ixip reaparece y un trueno ensordecedor deja aturdidas a las criaturas a 10 pies si fallan una salvacion de Constitucion.\nNivel 18: Tormenta Suprema. Si reforzaste el elemento de Rayo, el Ixip puede, una vez por dia, desatar una tormenta en cadena: elige hasta cinco criaturas en un radio de 40 pies. Cada una debe hacer una salvacion de Destreza; las que fallan sufren 10d6 de dano de relampago y 10d6 de dano de trueno. Criaturas de tu eleccion quedan aturdidas hasta el final de tu siguiente turno. Si tienes un segundo elemento, obtienes en su lugar el rasgo de nivel 6 de esa senda.",
      },
    ],
  },
];

// ── ESPECIES ────────────────────────────────────────────────
export const especies: CompendiumEntry[] = [
  {
    name: "Macehualtin",
    slug: "macehualtin",
    description: "Los hijos del maiz, la raza humana de Tonaltlan, versatiles y resilientes.",
    tags: ["Humano", "Adaptable", "Comun"],
    sections: [
      { title: "Descripcion", content: "Los Macehualtin son los seres humanos de Tonaltlan, nacidos de la quinta creacion del maiz sagrado. Conforman la mayoria de la poblacion y ocupan todos los estratos sociales, desde campesinos hasta tlatoanis." },
      { title: "Rasgos", content: "Versatilidad: un punto extra de habilidad a eleccion. Determinacion Humana: una vez por sesion, pueden repetir una tirada fallida. Herencia Cultural: eligen una tradicion cultural que otorga un rasgo adicional." },
      { title: "Notas", content: "La especie mas flexible, ideal para cualquier clase. Su fuerza radica en la adaptabilidad y la capacidad de especializarse en cualquier rol." },
    ],
  },
  {
    name: "Ahuizotl",
    slug: "ahuizotl",
    description: "Seres anfibios de los lagos profundos con manos prensiles en la cola.",
    tags: ["Acuatico", "Misterioso", "Raro"],
    sections: [
      { title: "Descripcion", content: "Los Ahuizotl son criaturas semi-acuaticas que habitan los lagos y rios mas profundos de Tonaltlan. Su apariencia combina rasgos caninos con piel brillante y una cola prensil terminada en una mano funcional." },
      { title: "Rasgos", content: "Respiracion Acuatica: pueden respirar bajo el agua indefinidamente. Mano Caudal: su cola funciona como una tercera mano. Vision Abismal: ven en la oscuridad total bajo el agua." },
      { title: "Notas", content: "Especie excelente para campanas acuaticas o costeras. Su mano caudal abre posibilidades creativas en combate y exploracion." },
    ],
  },
  {
    name: "Tlalocan-i",
    slug: "tlalocan-i",
    description: "Espiritus de la lluvia encarnados, guardianes de los bosques nublados.",
    tags: ["Elemental", "Naturaleza", "Raro"],
    sections: [
      { title: "Descripcion", content: "Los Tlalocan-i son espiritus de lluvia y niebla que han tomado forma solida. Provienen del Tlalocan, el paraiso de Tlaloc, y eligen manifestarse en el mundo mortal para cumplir propositos misteriosos. Su piel tiene un tono azulado y sus ojos brillan como gotas de rocio." },
      { title: "Rasgos", content: "Forma de Niebla: pueden volverse intangibles brevemente. Control Pluvial: manipulan la lluvia en un area pequena. Regeneracion Humeda: se curan lentamente bajo la lluvia." },
      { title: "Notas", content: "Especie eterea y misteriosa, ideal para jugadores que buscan una experiencia de rol profunda. Sus habilidades climaticas pueden cambiar el curso de encuentros al aire libre." },
    ],
  },
  {
    name: "Cihuateteo",
    slug: "cihuateteo",
    description: "Espiritus guerreros femeninos que caminan entre el mundo de los vivos.",
    tags: ["No-muerto", "Guerrero", "Raro"],
    sections: [
      { title: "Descripcion", content: "Las Cihuateteo son espiritus de mujeres que murieron en el parto, consideradas guerreras sagradas. En Tonaltlan, algunas eligen regresar al mundo mortal en cuerpos etereos para continuar su lucha. Son temidas y veneradas." },
      { title: "Rasgos", content: "Resistencia Espectral: resistencia al dano fisico no-magico. Grito de Guerra: atemoriza a enemigos cercanos. Caminar entre Mundos: pueden percibir el plano espiritual." },
      { title: "Notas", content: "Una especie con una historia profunda y tematicas fuertes. Requiere un jugador maduro que aprecie la narrativa detras de su existencia." },
    ],
  },
];

// ── BESTIARIO ───────────────────────────────────────────────
export const bestiario: CompendiumEntry[] = [
  {
    name: "Cipactli",
    slug: "cipactli",
    description: "El cocodrilo primordial cuyo cuerpo formo la tierra misma.",
    tags: ["Colosal", "Primordial", "Mictlan"],
    sections: [
      { title: "Descripcion", content: "Cipactli es la bestia primordial, un cocodrilo cosmico de proporciones inimaginables. Segun la leyenda, los dioses despedazaron su cuerpo para crear la tierra. Sus fragmentos aun deambulan por Tonaltlan como criaturas menores pero terribles." },
      { title: "Rasgos", content: "Armadura Natural: piel casi impenetrable. Fauces Primordiales: su mordida ignora la mayoria de resistencias. Regeneracion Antigua: se cura lentamente cada turno." },
      { title: "Notas", content: "Encuentro de nivel alto. Los fragmentos de Cipactli pueden servir como jefes de mazmorra o amenazas regionales en la campana." },
    ],
  },
  {
    name: "Tzitzimitl",
    slug: "tzitzimitl",
    description: "Demonios estelares que descienden durante los eclipses para devorar la luz.",
    tags: ["Celestial", "Demoniaco", "Elite"],
    sections: [
      { title: "Descripcion", content: "Los Tzitzimime son demonios estelares con forma de esqueletos adornados con estrellas. Habitan en las tinieblas entre las estrellas y descienden a la tierra durante los eclipses solares, intentando devorar al sol y sumir al mundo en oscuridad eterna." },
      { title: "Rasgos", content: "Aura de Eclipse: oscurece el area circundante. Garras Estelares: dano radiante y necrotico. Vuelo Celestial: vuelan con alas de oscuridad. Debilidad Solar: vulnerables a magia de fuego y luz." },
      { title: "Notas", content: "Enemigos tematicos perfectos para aventuras centradas en eclipses o amenazas cosmicas. Funcionan mejor en grupos." },
    ],
  },
  {
    name: "Nagual Salvaje",
    slug: "nagual-salvaje",
    description: "Cambiaformas corrompidos que han perdido su identidad humana.",
    tags: ["Bestia", "Corrupto", "Selva"],
    sections: [
      { title: "Descripcion", content: "Cuando un Nahual pierde el control de su transformacion, queda atrapado entre formas: ni humano ni animal, sino una abominacion retorcida. Los Naguales Salvajes vagan por las selvas, atacando a viajeros con una furia animal mezclada con astucia humana." },
      { title: "Rasgos", content: "Forma Inestable: cambia de tamano y capacidades aleatoriamente. Aullido Desgarrador: causa miedo. Resistencia Salvaje: dificil de derribar." },
      { title: "Notas", content: "Encuentro de nivel medio. Puede servir como gancho narrativo si un PNJ conocido se transforma en Nagual Salvaje." },
    ],
  },
  {
    name: "Xiuhcoatl",
    slug: "xiuhcoatl",
    description: "Serpiente de fuego que sirve como arma viviente de los dioses.",
    tags: ["Fuego", "Divino", "Legendario"],
    sections: [
      { title: "Descripcion", content: "La Xiuhcoatl es la serpiente de fuego turquesa, arma personal de Huitzilopochtli. Estas serpientes ardientes patrullan los templos mas sagrados y son invocadas por los sacerdotes mas poderosos como arma de ultimo recurso contra amenazas existenciales." },
      { title: "Rasgos", content: "Cuerpo Igneo: todo lo que la toca recibe dano de fuego. Aliento de Turquesa: cono de fuego devastador. Inmunidad al Fuego: completamente inmune. Debilidad Acuatica: vulnerable al agua y hielo." },
      { title: "Notas", content: "Criatura legendaria, encuentro de nivel muy alto o potencial aliado divino. Su presencia indica que los dioses mismos estan involucrados." },
    ],
  },
  {
    name: "Chaneque",
    slug: "chaneque",
    description: "Espiritus traviesos guardianes de bosques y manantiales.",
    tags: ["Hada", "Naturaleza", "Comun"],
    sections: [
      { title: "Descripcion", content: "Los Chaneques son espiritus pequenos y astutos que protegen los bosques, rios y cuevas de Tonaltlan. Disfrutan engañando a los viajeros, robando su 'tonalli' (sombra del alma) y dejandolos desorientados. Sin embargo, tambien pueden ser aliados valiosos si se les trata con respeto." },
      { title: "Rasgos", content: "Invisibilidad Forestal: desaparecen entre la vegetacion. Robo de Tonalli: pueden confundir y desorientar. Conocimiento del Bosque: saben todo lo que ocurre en su territorio." },
      { title: "Notas", content: "Encuentro de nivel bajo, perfecto para introducir a los jugadores al folklore mesoamericano. Pueden ser enemigos, aliados o simples elementos del entorno." },
    ],
  },
];

// ── MONTURAS ────────────────────────────────────────────────
export const monturas: CompendiumEntry[] = [
  {
    name: "Quetzalli",
    slug: "quetzalli",
    description: "Serpientes emplumadas menores que surcan los cielos con gracia divina.",
    tags: ["Voladora", "Divina", "Rara"],
    sections: [
      { title: "Descripcion", content: "Las Quetzalli son serpientes emplumadas de menor tamano que el gran Quetzalcoatl. Sus plumas iridiscentes brillan con los colores del arcoiris y pueden llevar a un jinete por los cielos. Son extremadamente raras y solo responden ante quienes poseen un Tonalli puro." },
      { title: "Rasgos", content: "Vuelo Majestuoso: velocidad de vuelo alta. Plumas Protectoras: otorgan resistencia magica al jinete. Gracia Divina: no provocan ataques de oportunidad al volar." },
      { title: "Notas", content: "La montura mas codiciada de Tonaltlan. Obtener una Quetzalli puede ser una mision epica en si misma." },
    ],
  },
  {
    name: "Tepeyollotl",
    slug: "tepeyollotl",
    description: "Jaguares montaneses gigantes con rugido que estremece la tierra.",
    tags: ["Terrestre", "Bestia", "Poco comun"],
    sections: [
      { title: "Descripcion", content: "Los Tepeyollotl son jaguares enormes que habitan las montanas mas altas de Tonaltlan. Su nombre significa 'Corazon de la Montana' y su rugido puede causar pequenos derrumbes. Son monturas terrestres de enorme poder." },
      { title: "Rasgos", content: "Rugido Sismico: aturde a enemigos cercanos. Trepar Montanas: se mueven por terreno vertical sin penalizacion. Vision Nocturna: perfecta para exploracion subterranea." },
      { title: "Notas", content: "Montura terrestre por excelencia. Excelente para campanas en montanas y cuevas." },
    ],
  },
  {
    name: "Acocil Ancestral",
    slug: "acocil-ancestral",
    description: "Crustaceos gigantes de los lagos antiguos, blindados y veloces en el agua.",
    tags: ["Acuatica", "Blindada", "Comun"],
    sections: [
      { title: "Descripcion", content: "Los Acociles Ancestrales son crustaceos gigantes que habitan los lagos y cenotes de Tonaltlan. Sus caparazones son casi tan duros como la obsidiana y pueden transportar jinetes a gran velocidad bajo el agua. Algunos pescadores los domestican." },
      { title: "Rasgos", content: "Respiracion Acuatica: permite al jinete respirar bajo el agua a traves de burbujas. Caparazon de Obsidiana: alta armadura natural. Pinzas de Combate: pueden atacar mientras transportan." },
      { title: "Notas", content: "La montura acuatica mas accesible. Perfecta para campanas en lagos, rios y cenotes." },
    ],
  },
];

// ── DEIDADES ────────────────────────────────────────────────
export const deidades: CompendiumEntry[] = [
  {
    name: "Quetzalcoatl",
    slug: "quetzalcoatl",
    description: "La Serpiente Emplumada, dios del viento, la sabiduria y la creacion.",
    tags: ["Creacion", "Sabiduria", "Viento"],
    sections: [
      { title: "Descripcion", content: "Quetzalcoatl, la Serpiente Emplumada, es uno de los dioses mas venerados de Tonaltlan. Senor del viento, la sabiduria y la estrella de la manana, se le atribuye la creacion de la humanidad a partir del maiz y los huesos de los ancestros. Sus templos son lugares de conocimiento y paz." },
      { title: "Rasgos", content: "Dominio del Viento: sus seguidores dominan magias de aire. Sabiduria Ancestral: otorga ventaja en pruebas de conocimiento. Estrella de la Manana: sus fieles ganan poder al amanecer." },
      { title: "Notas", content: "Deidad popular entre Nahuales, Tlamacazqui y personajes orientados al conocimiento. Su rivalidad con Tezcatlipoca es un eje narrativo central." },
    ],
  },
  {
    name: "Tezcatlipoca",
    slug: "tezcatlipoca",
    description: "El Espejo Humeante, dios de la noche, el destino y el conflicto.",
    tags: ["Destruccion", "Noche", "Destino"],
    sections: [
      { title: "Descripcion", content: "Tezcatlipoca, el Espejo Humeante, es el dios de la noche, la magia oscura y el cambio a traves del conflicto. Su espejo de obsidiana muestra verdades terribles y futuros posibles. Es tanto enemigo como aliado, pues cree que solo a traves de la lucha se fortalece el mundo." },
      { title: "Rasgos", content: "Espejo de Obsidiana: sus seguidores pueden ver visiones del futuro. Manto de Sombras: invisibilidad en la oscuridad. Pruebas del Destino: impone desafios a sus propios fieles para fortalecerlos." },
      { title: "Notas", content: "Deidad compleja, ni buena ni malvada. Ideal para personajes moralmente ambiguos. Los Guerreros Jaguar le son especialmente devotos." },
    ],
  },
  {
    name: "Mictlantecuhtli",
    slug: "mictlantecuhtli",
    description: "Senor del Mictlan, gobernante del inframundo y guardian de los muertos.",
    tags: ["Muerte", "Inframundo", "Equilibrio"],
    sections: [
      { title: "Descripcion", content: "Mictlantecuhtli reina sobre el Mictlan, el inframundo de Tonaltlan. No es un dios malvado sino un guardian necesario: recibe a las almas de los muertos y les concede descanso. Sus sacerdotes realizan ritos funerarios y pueden comunicarse con los espiritus." },
      { title: "Rasgos", content: "Dominio de la Muerte: control sobre espiritus y no-muertos. Juicio Final: puede evaluar la verdad en las palabras de cualquier ser. Paso Seguro: sus fieles pueden transitar por el Mictlan sin peligro." },
      { title: "Notas", content: "Deidad esencial para campanas que involucren el Mictlan. Las Cihuateteo suelen tener una conexion especial con el." },
    ],
  },
  {
    name: "Tlaloc",
    slug: "tlaloc",
    description: "Dios de la lluvia, los relampagos y la fertilidad de la tierra.",
    tags: ["Naturaleza", "Agua", "Creacion"],
    sections: [
      { title: "Descripcion", content: "Tlaloc es el senor de las lluvias y las tormentas. Su dominio sobre el agua lo convierte en una de las deidades mas importantes para la agricultura y la vida. Su paraiso, el Tlalocan, es un lugar de eterna primavera donde van quienes mueren por causas relacionadas con el agua." },
      { title: "Rasgos", content: "Control del Clima: sus seguidores manipulan el tiempo atmosferico. Relampago Divino: ataques electricos devastadores. Bendicion de Cosecha: curan y nutren la tierra." },
      { title: "Notas", content: "Deidad fundamental para los Tlalocan-i. Las campanas agricolas y los conflictos por recursos hidricos son su terreno narrativo natural." },
    ],
  },
  {
    name: "Xochiquetzal",
    slug: "xochiquetzal",
    description: "Diosa de las flores, el amor, las artes y la belleza.",
    tags: ["Arte", "Amor", "Creacion"],
    sections: [
      { title: "Descripcion", content: "Xochiquetzal es la diosa de la belleza, las flores, el amor y las artes. Patrona de los artesanos, poetas y amantes, su influencia se siente en cada festival y celebracion de Tonaltlan. Sus templos estan adornados con flores eternas y obras de arte vivientes." },
      { title: "Rasgos", content: "Encantamiento: sus seguidores pueden fascinar a otros. Arte Viviente: crean ilusiones hermosas con efectos reales. Sanacion Floral: curan a traves de esencias y flores magicas." },
      { title: "Notas", content: "Deidad perfecta para Pochtecas y personajes sociales. Su influencia suaviza conflictos y abre puertas diplomaticas." },
    ],
  },
  {
    name: "Huitzilopochtli",
    slug: "huitzilopochtli",
    description: "Dios de la guerra y el sol, protector feroz de Tonaltlan.",
    tags: ["Guerra", "Sol", "Destruccion"],
    sections: [
      { title: "Descripcion", content: "Huitzilopochtli es el dios del sol y la guerra, el protector supremo de Tonaltlan. Nacio listo para el combate y derroto a cuatrocientos enemigos en su primer aliento. Sus seguidores son los guerreros mas devotos, que luchan para mantener al sol en movimiento y evitar el fin del mundo." },
      { title: "Rasgos", content: "Furia Solar: ataques de fuego potenciados durante el dia. Voluntad Indomable: inmunidad al miedo. Sacrificio Guerrero: pueden sacrificar puntos de vida para potenciar ataques aliados." },
      { title: "Notas", content: "La deidad guerrera por excelencia. Los Guerreros Jaguar y Aguila le rinden culto. Perfecto para campanas centradas en grandes batallas." },
    ],
  },
];

// ── Section metadata for hub pages ──────────────────────────
export const sectionsMeta = [
  { title: "Clases",    slug: "clases",    description: "Arquetipos de heroes y villanos del mundo mesoamericano.",    count: clases.length },
  { title: "Especies",  slug: "especies",  description: "Seres nacidos del maiz, la obsidiana y el aliento de los dioses.",  count: especies.length },
  { title: "Bestiario", slug: "bestiario", description: "Criaturas del Mictlan y bestias de selvas y montanas sagradas.",   count: bestiario.length },
  { title: "Monturas",  slug: "monturas",  description: "Companeros leales que surcan cielos, rios y caminos ancestrales.",  count: monturas.length },
  { title: "Deidades",  slug: "deidades",  description: "Los dioses que tejen el destino del cosmos y sus elegidos.",        count: deidades.length },
  { title: "Galeria",   slug: "galeria",   description: "Arte conceptual, ilustraciones y vistazos al universo.",            count: 0 },
];
