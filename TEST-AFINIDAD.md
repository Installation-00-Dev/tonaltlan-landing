# Test de Afinidad Tonal

Fuente original: `Test-Afinidad-Tonaltlan-10-Mexicano.html`

## Resumen

- Nombre del test: Test de Afinidad Tonal
- Version: Mexicana
- Proposito: descubrir la raza afin del usuario dentro del mundo de Tonaltlan
- Numero de preguntas: 10
- Razas evaluadas:
  - Ton
  - Toh'kari
  - He'kari
  - Quinametzin
  - Lok'naa
  - Hualik
  - Irzak

## Estructura de pantallas

### 1. Pantalla inicial

- Titulo: `Test de Afinidad Tonal`
- Subtitulo: `Version Mexicana - Descubre tu raza en el mundo de Tonaltlan`
- Campo: nombre del usuario
- Accion: `Comenzar Test`

### 2. Pantalla de preguntas

- Barra de progreso
- Numero de pregunta
- Titulo de pregunta
- Escenario
- Opciones de respuesta
- Botones:
  - `Anterior`
  - `Siguiente`
  - `Ver Resultados` en la ultima pregunta

### 3. Pantalla de resultados

- Titulo con el nombre del usuario
- Raza dominante
- Posible influencia secundaria
- Tabla de puntuaciones
- Resultado narrativo por raza
- Boton: `Hacer Test Nuevamente`

## Logica del test

### Estado

- `shuffledQuestions`: preguntas mezcladas
- `shuffledOptionsMap`: orden mezclado de opciones por pregunta
- `currentQuestion`: indice de pregunta actual
- `answers`: respuestas seleccionadas
- `userName`: nombre del usuario
- `scores`: puntuacion acumulada por raza

### Reglas

- Las preguntas se mezclan aleatoriamente.
- Las opciones de cada pregunta tambien se mezclan.
- Cada respuesta suma puntos a una o varias razas.
- La raza dominante es la de mayor puntuacion.
- Hay raza secundaria solo si la segunda mayor puntuacion es al menos el 60% de la dominante.

### Navegacion

- `startTest()`: valida nombre, mezcla preguntas y opciones, reinicia estado y muestra preguntas.
- `displayQuestion()`: renderiza la pregunta actual y sus opciones mezcladas.
- `selectOption()`: guarda respuesta y suma puntos.
- `nextQuestion()`: avanza a la siguiente pregunta o muestra resultados.
- `previousQuestion()`: retrocede y resta los puntos de la pregunta actual antes de regresar.
- `calculateResults()`: ordena puntajes y determina dominante y secundaria.
- `showResults()`: construye la salida narrativa.
- `restartTest()`: vuelve a la pantalla inicial.

## Preguntas

### Pregunta 1. El Secreto del Compa

Escenario:

> Tu mejor compa te confia algo pesado: si lo sueltas, salvas a un chingo de gente, pero lo jodes a el. Te pide que no digas nada. Tu conciencia esta como: "y ahora que pedo?"

Opciones:

1. `No puedo callar. La verdad debe salir, aunque pierda a mi compa.`
   - Ton: 3
   - Quinametzin: 2
   - Lok'naa: 1
2. `Lo encaro directo. Que se haga responsable como debe ser.`
   - Irzak: 3
   - Ton: 2
   - Quinametzin: 1
3. `Busco una salida creativa. Debe haber forma de ayudar a todos sin chingar a nadie.`
   - He'kari: 3
   - Lok'naa: 2
   - Quinametzin: 1
4. `Me lo guardo por ahora, pero preparo todo por si se arma el desmadre.`
   - Hualik: 3
   - He'kari: 2
   - Lok'naa: 1

### Pregunta 2. La Tradicion que Jode

Escenario:

> Tu familia tiene una tradicion bien antigua que todos respetan, pero esta jodiendo a un grupo de personas. Cada vez que la ves, te duele el corazon. Que haces?

Opciones:

1. `La mantengo, pero creo protecciones reales para quienes sufren.`
   - Quinametzin: 3
   - Lok'naa: 2
   - Ton: 1
2. `La rompo ya. No espero permiso cuando hay gente sufriendo.`
   - Toh'kari: 3
   - Irzak: 2
   - He'kari: 1
3. `La adapto. Conservo lo chido, cambio lo que jode.`
   - He'kari: 3
   - Quinametzin: 2
   - Lok'naa: 1
4. `La quemo y empiezo de cero. Solo lo bueno se queda.`
   - Irzak: 3
   - Ton: 2
   - Quinametzin: 1

### Pregunta 3. El Jefe que se Rajo

Escenario:

> Tu jefe, el que todos respetan, se rajo en algo importante para salvarse el culo. Tu lo viste. Si lo delatas, se arma un pedote. Pero la mentira te come por dentro.

Opciones:

1. `Lo delato con pruebas. La verdad es la verdad, aunque se arme el desmadre.`
   - Ton: 3
   - Quinametzin: 2
   - He'kari: 1
2. `Lo encaro en privado primero. Que arregle el pedo antes de que se sepa.`
   - Quinametzin: 3
   - Lok'naa: 2
   - Ton: 1
3. `Me quedo callado y junto mas info. Actuo cuando sea el momento perfecto.`
   - Hualik: 3
   - He'kari: 2
   - Quinametzin: 1
4. `Lo encaro y exijo que confiese. Si se rajo, que lo diga de frente.`
   - Irzak: 3
   - Ton: 2
   - Quinametzin: 1

### Pregunta 4. La Ultima Medicina

Escenario:

> Solo queda una medicina. Puedes salvar a un nino chiquito, a alguien importante que salvara a mas despues, o guardarla para ti. El tiempo se acaba. Que haces?

Opciones:

1. `Se la doy al nino. No puedo dejar que se muera alguien tan indefenso.`
   - Lok'naa: 3
   - Ton: 2
   - Quinametzin: 1
2. `Se la doy al importante. Es duro, pero salvara a mas gente despues.`
   - Quinametzin: 3
   - He'kari: 2
   - Ton: 1
3. `Intento dividirla o encontrar forma de salvar a ambos.`
   - He'kari: 3
   - Lok'naa: 2
   - Ton: 1
4. `Me la guardo. Si yo caigo, nadie mas podra ayudar despues.`
   - Toh'kari: 3
   - Hualik: 2
   - He'kari: 1

### Pregunta 5. El Traidor en tu Cara

Escenario:

> Alguien de tu grupo te traiciono y por su culpa hubo pedo. Ahora esta frente a ti. Todos te ven esperando tu decision.

Opciones:

1. `Lo juzgo segun las reglas. Justicia clara, sin venganza.`
   - Quinametzin: 3
   - Ton: 2
   - Hualik: 1
2. `Lo encaro directo. Que repare con valentia o que asuma las consecuencias.`
   - Irzak: 3
   - Quinametzin: 2
   - Ton: 1
3. `Busco rehabilitarlo. Puedo ayudar a arreglar sin destruir a la persona.`
   - Lok'naa: 3
   - Quinametzin: 2
   - Ton: 1
4. `Lo convierto en recurso util. Que pague sirviendo en secreto.`
   - Hualik: 3
   - He'kari: 2
   - Toh'kari: 1

### Pregunta 6. Se Arma el Desmadre

Escenario:

> Estas en un lugar publico cuando de repente se arma un desmadre: gritos, gente corriendo, panico. No sabes que pedo, pero el peligro es real. Que haces?

Opciones:

1. `Me convierto en escudo. Protejo a quienes no pueden correr.`
   - Quinametzin: 3
   - Ton: 2
   - Lok'naa: 1
2. `Calmo a la gente. Bajo la tension antes de que alguien salga lastimado.`
   - Lok'naa: 3
   - Quinametzin: 2
   - Ton: 1
3. `Me muevo a un punto estrategico y coordino una salida segura.`
   - He'kari: 3
   - Hualik: 2
   - Quinametzin: 1
4. `Me lanzo al origen del pedo. Corto el peligro de raiz.`
   - Toh'kari: 3
   - Irzak: 2
   - Hualik: 1

### Pregunta 7. Te Echan la Culpa

Escenario:

> Te echan la culpa de algo que no hiciste y la gente empieza a creerlo. Las miradas se ponen culeras. La mentira se propaga rapido.

Opciones:

1. `Hablo claro. Digo la verdad completa, sin rodeos.`
   - Ton: 3
   - Quinametzin: 2
   - Irzak: 1
2. `Reencuadro la situacion con palabras. Giro la escena y gano tiempo.`
   - He'kari: 3
   - Hualik: 2
   - Lok'naa: 1
3. `Me retiro con calma. No peleo donde ya me juzgaron sin pruebas.`
   - Hualik: 3
   - Quinametzin: 2
   - He'kari: 1
4. `Marco limites de frente. No me quedo callado ni cedo mi lugar.`
   - Irzak: 3
   - Toh'kari: 2
   - Ton: 1

### Pregunta 8. Todo se Va a la Chingada

Escenario:

> Llevas meses planeando algo y en el ultimo segundo todo se va a la chingada. El plan falla. Todos te ven esperando que hagas algo.

Opciones:

1. `Organizo inmediatamente. Asigno roles, pongo orden. Primero estabilidad.`
   - Quinametzin: 3
   - Ton: 2
   - Lok'naa: 1
2. `Cambio de plan sobre la marcha. Improviso algo nuevo rapido.`
   - He'kari: 3
   - Toh'kari: 2
   - Lok'naa: 1
3. `Primero calmo al grupo. Bajo la tension antes de decidir.`
   - Lok'naa: 3
   - Quinametzin: 2
   - Ton: 1
4. `Asumo el mando sin excusas. Lo enfrento de frente.`
   - Irzak: 3
   - Ton: 2
   - Quinametzin: 1

### Pregunta 9. Tu Talisman del Viaje

Escenario:

> Antes de partir a un viaje, un viejito te ofrece elegir un talisman magico. Cual agarras?

Opciones:

1. `Un medallon que vibra cuando intentas mentirte a ti mismo.`
   - Ton: 3
   - Quinametzin: 2
   - Lok'naa: 1
2. `Una moneda que nunca cae igual dos veces.`
   - Toh'kari: 3
   - He'kari: 2
   - Hualik: 1
3. `Una brujula que apunta a lo que mas necesitas aprender.`
   - He'kari: 3
   - Lok'naa: 2
   - Ton: 1
4. `Una piedra que se pone pesada cuando hay peligro cerca.`
   - Quinametzin: 3
   - Hualik: 2
   - Ton: 1
5. `Un anillo que se calienta cuando rompes una promesa.`
   - Irzak: 3
   - Ton: 2
   - Quinametzin: 1

### Pregunta 10. Tu Forma de Resetear

Escenario:

> Despues de un pedo fuerte, que haces primero para volver a la normalidad?

Opciones:

1. `Hablo claro y cierro el tema con verdad.`
   - Ton: 3
   - Quinametzin: 2
   - Lok'naa: 1
2. `Me muevo. Cambio de lugar, respiro aire nuevo. Regreso distinto.`
   - He'kari: 3
   - Toh'kari: 2
   - Lok'naa: 1
3. `Reordeno. Organizo habitos, tareas, algo tangible que me estabilice.`
   - Quinametzin: 3
   - Ton: 2
   - Hualik: 1
4. `Desaparezco un rato. Silencio, distancia. Recalculo todo en soledad.`
   - Hualik: 3
   - Lok'naa: 2
   - He'kari: 1
5. `Hago algo fisico e intenso. Convierto lo vivido en fuerza.`
   - Irzak: 3
   - Toh'kari: 2
   - Quinametzin: 1

## Resultados por raza

### Ton

- Nombre: `TON (Luz) - El Iluminador`
- Esencia: Eres la verdad que no puede ocultarse, la luz que revela sin querer. Eres uno de menos de 100 Ton en todo Tonaltlan; tu existencia es legendaria. Vives siglos, eres una biblioteca viviente de memoria y sabiduria. Tu existencia misma es un faro moral: no puedes mentir, no puedes enganar, no puedes callar cuando ves injusticia. Tu claridad es tanto tu virtud como tu vulnerabilidad.
- Virtud: Tu columna moral absoluta. Eres el que ilumina el camino de otros, el que protege sin esperar recompensa, el que corrige injusticias porque no puede ignorarlas. Tu luz consume sentimientos densos y rencores, dejando solo claridad y proposito.
- Sombra: Tu mayor terror no es la muerte, sino corromperte u oscurecerte. Temes convertirte en un "sol que quema en vez de calentar". Tu sinceridad te vuelve vulnerable: no puedes guardar secretos estrategicos, y a veces la verdad que revelas puede destruir relaciones o causar guerras.
- Camino: Tu ritual es existir con pureza intencional. No necesitas rezar: cada acto bondadoso honra a Tonatli. Tu rol es ser el guia etico, el que revela verdades aunque duelan, el que protege el orden moral del mundo. Acepta que tu exposicion total es tu poder y tu herida.
- Simbolo: El Amanecer - El momento en que la luz retorna y el mundo se revela.
- Objeto: Un espejo que refleja la verdad sin distorsion.
- Glifo: Sol con rayos que iluminan en todas las direcciones.

### Toh'kari

- Nombre: `TOH'KARI (Rayo) - El Caotico`
- Esencia: Eres la tormenta sin control, el impulso que no se detiene. Vives entre el deseo de destruir y la necesidad de sobrevivir. Tu rayo interior es una bestia que debes dominar lo suficiente para no morir y usarlo antes de que te consuma.
- Virtud: Tu intensidad imparable. Cuando te enfocas en algo, no hay duda, no hay miedo, no hay vacilacion: solo accion directa. Eres capaz de ejecutar lo que otros ni siquiera se atreverian a pensar. Tu fuerza es brutal pero honesta.
- Sombra: Tu tendencia al impulso y la violencia puede destruirte tanto como a los que te rodean. El rayo que liberas tambien te quema por dentro. Temes convertirte en un relampago que cae sin querer, en destruccion sin sentido. Tu conflicto eterno: "Puedo contenerme o voy a destruirlo todo otra vez?"
- Camino: Tu ritual es la supervivencia diaria. No hay vida cotidiana para ti: hay movimiento erratico, impaciencia y soledad profunda. Tu rol es ser el exiliado salvaje que sobrevive en un mundo que te teme. Aprende a decidir cuando no destruir: ese es tu verdadero conflicto moral.
- Simbolo: El Relampago que Cae Sobre Una Montana Solitaria - Brutal, impredecible, hermoso y aterrador.
- Objeto: Un fragmento de metal que conserva carga electrica.
- Glifo: Rayo zigzagueante que nunca toca el mismo lugar dos veces.

### He'kari

- Nombre: `HE'KARI (Aire) - El Visionario`
- Esencia: Eres la mente que vuela, la idea que viaja, la palabra que transforma. Observas desde arriba, ves patrones donde otros ven caos, percibes a larga distancia. Eres el sonador practico: inspiras, conectas, interpretas y llevas conocimiento de un lugar a otro.
- Virtud: Tu libertad creativa y tu inspiracion constante. Ves soluciones donde otros ven problemas, encuentras caminos hasta en el viento. Eres maestro de la expresion, del arte y de la palabra. Tu perspectiva elevada te permite ver el panorama completo.
- Sombra: Tu dispersion y desconexion. Puedes ser inconstante, distraido, dificil de aterrizar. Te pierdes en posibilidades infinitas y puedes parecer frio o ausente cuando estas arriba con tu mente. Tu conflicto: volar libre vs. tu responsabilidad como mensajero.
- Camino: Tu ritual es el movimiento constante, el arte y la comunicacion. Tu vida cotidiana es aire en accion: ligera, inspirada, en movimiento. Tu rol es ser el mensajero, el guardian del conocimiento, el aliado diplomatico. Equilibra tu necesidad de libertad con tu deber de guiar.
- Simbolo: La Pluma Suspendida - Ligera pero poderosa, simbolo de mensaje y vuelo.
- Objeto: Un cuaderno de notas que siempre llevas contigo.
- Glifo: Espiral de viento que se eleva hacia el cielo.

### Quinametzin

- Nombre: `QUINAMETZIN (Tierra) - El Guardian Colosal`
- Esencia: Eres la estabilidad absoluta: el pilar, la roca firme, el gigante amable que sostiene al mundo. Eres colosal (2.30m), imposible de pasar por alto, pero tu presencia calma en vez de intimidar. Eres protector nato, figura de guia y soporte emocional. Eres el hogar encarnado, la base sobre la que otros construyen.
- Virtud: Tu honestidad e integridad inquebrantable. Tu Gema del Animo te delata siempre: no puedes mentir emocionalmente. La gema cambia de color segun tu emocion: blanco para calma, amarillo para alegria, verde para armonia, azul para tristeza, rojo para amor o furia, negro para desesperacion. Tu virtud es una honestidad profunda, transparente y llena de bondad. Eres el que construye, repara, protege y mantiene el orden natural.
- Sombra: Tu carga del deber y auto sacrificio. Puedes sentirte obligado a cargar con el mundo, incluso cuando ya no puedes mas. Tu sentido del deber puede ahogarte. Si fallas en proteger a alguien, tu gema lo revela de inmediato y esa culpa puede marcarte por siglos.
- Camino: Tu ritual es el trabajo constante, la construccion y el servicio comunitario. Levantas murallas, reparas caminos, construyes templos, entrenas jovenes. Tu rol es sostener, aunque te desgastes. Aprende que tambien mereces ser apoyado: los pilares necesitan cimientos.
- Simbolo: La Montana Antigua - Alta, firme, paciente y eterna. Testigo y protectora.
- Objeto: Una herramienta de trabajo que siempre esta contigo.
- Glifo: Montana con raices profundas que se extienden hacia abajo.

### Lok'naa

- Nombre: `LOK'NAA (Agua) - El Sanador`
- Esencia: Eres la calma despues de la tormenta. Tu psicologia es profundamente empatica: sientes antes de actuar, lees el ambiente, te mueves como el agua misma fluyendo hacia donde hace falta armonia. Eres el que une, el que sana, el que preserva la vida.
- Virtud: Tu empatia y capacidad de sanacion. No solo entiendes el dolor ajeno: lo absorbes, lo transformas y lo devuelves como alivio. Puedes conectar emocionalmente con quien sea, incluso con razas que otros considerarian enemigos. Tu presencia calma y restaura equilibrio.
- Sombra: Tu evasion y auto sacrificio. Tu misma empatia puede consumirte. Cuando sientes demasiado, te apagas, te derrites emocionalmente o huyes como el agua buscando grietas. Temes convertirte en un mar sin orillas: absorber tanto dolor ajeno que dejas de ser tu mismo.
- Camino: Tu ritual es la hospitalidad, la artesania fluida y los rituales de purificacion. Banos sagrados, cantos que conservan memoria, alimentos que suavizan. Tu rol es desescalar, mediar, absorber el golpe. Aprende a poner limites: sanar sin romperte, fluir sin desaparecer.
- Simbolo: El Cenote Sagrado - Profundo, claro, portador de vida, pero tambien misterioso y oscuro en el fondo.
- Objeto: Un recipiente de agua que siempre llevas contigo.
- Glifo: Onda de agua que fluye en circulos concentricos.

### Hualik

- Nombre: `HUALIK (Obscuridad) - El Vigilante Sombra`
- Esencia: Eres el que mira sin ser visto, el que escucha, el que entiende, el que aparece cuando nadie lo espera. Puedes desaparecer en cualquier sombra, moverte sin hacer sonido, ver en oscuridad total. Eres uno de decenas, no miles; tu existencia es un misterio incluso para otras razas. Tu identidad es estar fuera de la vista, pero siempre presente. Eres el observador silencioso, el vigilante de las verdades ocultas.
- Virtud: Tu astucia y percepcion profunda. Nada pasa desapercibido para ti. Eres inteligente, analitico, y puedes leer las intenciones detras de las palabras. No te dejas enganar por luz, ruido o apariencias. Tu precision es quirurgica cuando actuas.
- Sombra: Tu aislamiento y desconfianza. Rechazas el contacto social, incluso cuando podria beneficiarte. Ves traicion en todas partes, incluso donde no la hay. Tu herida es simple: "No tenemos un lugar donde pertenecer". La soledad, aunque necesaria, es tambien tu condena.
- Camino: Tu ritual es el silencio, las rutinas precisas y la conducta cauta. Movimientos suaves, habitos meticulosos, largas horas observando. Tu rol es saber sin exponerte, intervenir solo cuando es critico. Tu conflicto eterno: "Me mantengo en la sombra o actuo?"
- Simbolo: La Luna Nueva - Oscuridad total. No es ausencia, sino presencia invisible.
- Objeto: Un objeto pequeno que siempre esta en tus manos (piedra, moneda, etc.)
- Glifo: Sombra que se extiende sin forma definida.

### Irzak

- Nombre: `IRZAK (Fuego) - La Flama de Honor`
- Esencia: Eres la pasion que arde sin control, el honor que no se doblega, la intensidad que define cada momento. Tu chispa de Zilo debe arder con la mayor fuerza posible antes de regresar al ciclo eterno. Eres carismatico, temperamental y brutalmente directo: no das rodeos, no suavizas verdades, no actuas con cobardia.
- Virtud: Tu valentia y lealtad inquebrantable. Eres el que lucha con bravura, ama con entrega total y honra con devocion absoluta. Tu codigo de honor no admite dudas: no puedes traicionar, no puedes mentir cuando se trata de honor, no puedes actuar con cobardia. Eres una flama viviente que inspira respeto y temor.
- Sombra: Tu temperamento y intensidad destructiva. Tu pasion puede convertirse en furia ciega. Tu orgullo puede quemar puentes. Tu intensidad emocional puede ser tan abrasadora que destruye relaciones o situaciones que podrian haberse salvado con mas calma. El fuego que te define tambien puede consumirte a ti y a quienes te rodean.
- Camino: Tu ritual es el trabajo intenso, la forja y los rituales de fuego. Trabajas en el Volcan Eterno, experimentas con la energia de Zilo, vives cada momento con pasion. Tu busqueda constante de alternativas al sacrificio ciclico te marca: quieres que todas las chispas ardan hasta el final, pero el deber pesa. Tu rol es arder con honor hasta el final, pero tu conflicto eterno es si debes arder libremente o cumplir con el deber del sacrificio. Busca alternativas, pero acepta que el peso del deber te marca.
- Simbolo: El Volcan Eterno - Fuerza contenida, poder que puede destruir o crear. Tu hogar, tu maestro, tu conexion directa con Zilo.
- Objeto: Una herramienta de forja o un objeto que siempre llevas contigo que representa tu chispa.
- Glifo: Llama que arde hacia arriba, intensa y constante.

## Regla de influencia secundaria

- Se ordenan todas las razas por puntuacion.
- La primera es la raza dominante.
- La segunda solo aparece como influencia secundaria si cumple:

```text
puntaje_secundario >= puntaje_dominante * 0.6
```

## Salida del resultado final

El resultado renderiza estas secciones:

1. Esencia
2. Virtud
3. Sombra
4. Camino
5. Simbolos
6. Influencia secundaria, si aplica

## Observaciones tecnicas

- El test permite iniciar con la tecla Enter.
- Las respuestas se guardan por indice original de opcion, aunque el orden visual cambie.
- Al retroceder, se restan los puntos de la respuesta de la pregunta actual antes de volver.
- El contenido narrativo esta completamente definido en el objeto `raceResults`.