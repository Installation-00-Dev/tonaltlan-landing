# Tonaltlan — guía del proyecto

Sitio de **Tonaltlan**, un mundo de fantasía inspirado en las culturas mexicanas para jugar
D&D 2024. **Cuevas & Quetzales** es el estudio que lo produce. El sitio es el compendio del
mundo y va a crecer: hay más contenido, imágenes y arte por subir.

Next.js 15 (App Router) con exportación estática a GitHub Pages (`tonaltlan.com`) y Tailwind CSS 3.

## Comandos

```bash
pnpm dev        # servidor de desarrollo
pnpm typecheck  # TypeScript
pnpm build      # exportación estática → out/
pnpm verificar  # typecheck + build + imágenes + balance del test + Danza Tonal + Dados de los Siete
```

Antes de cada commit: `pnpm verificar` debe pasar. Para ver el export: `python3 -m http.server 3000 -d out`.

- `output: "export"`, `trailingSlash: true`, `images.unoptimized`. No hay rutas API ni server actions.
- Al hacer push a `main`, `.github/workflows/pages.yml` publica el sitio. La página legacy `/proximamente`
  se retiró en nov. 2026 (esa ruta ahora muestra la 404).

---

## Reglas inquebrantables

### 1. El copy es 100 % intocable

**No modificar, agregar, eliminar ni resumir** textos existentes: títulos, descripciones, fichas del
compendio, avisos de privacidad, contactos y textos legales.

- **Ortografía:** el dueño autorizó corregir acentos, ñ y signos de apertura (¿ ¡) del español en
  todo el sitio (hecho en nov. 2026). Los textos nuevos deben llegar o quedar bien escritos.
- **Puntuación en textos nuevos:** no uses paréntesis `()` ni guiones (`-`, `–`, `—`) como incisos o
  pausas; usa coma o punto. Los guiones de palabras compuestas sí se quedan (`e-mail`, `est-ce`).
  Los textos del Test de Afinidad ya se limpiaron así en los tres idiomas (nov. 2026).
- **Lo que NO se corrige:** nombres propios del mundo y de clases o especies (Mictlan, Tonaltlan,
  Guerrero Otomi, Tlalocan, Catemaco…), ni el tono coloquial del Test de Afinidad ("compa",
  "qué pedo"). El nombre oficial es **Tonaltlan, sin acento** (confirmado por el creador).
- **Comparar títulos sin acentos en el código:** las secciones se buscan por título normalizado
  (`normalize("NFD")`), así "Descripción" y "Descripcion" coinciden.

- **Sí se permite:** cambiar `className`, la estructura del JSX, el layout y el orden visual.
- **Reutilizar un texto existente** en otra página es válido, siempre copiado tal cual. Mejor aún:
  moverlo a `lib/` y leerlo desde ahí (como `lib/features.tsx`).
- **Etiquetas nuevas de interfaz** ("Leer su historia", "Próximamente", "Linaje"): solo cuando una
  funcionalidad nueva las necesite, y se mencionan explícitamente en el resumen del PR.
- **Contenido nuevo del mundo** (lore, reglas, descripciones): nunca se inventa. Si falta, va un
  placeholder `<Pendiente>` (ver regla 3).
- **Textos nuevos del creador** (el dueño del producto define el contenido; el dev lo implementa):
  se guardan en `lib/textos.ts` y las páginas los leen de ahí. Solo se corrige ortografía; si un
  texto parece incompleto, se le avisa al creador.

### 2. Imágenes: siempre `.webp`

- **Formato y ubicación:** todas las imágenes del sitio viven en `public/images/` y son `.webp`.
  Nunca referenciar `.png`, `.jpg` ni `.jpeg` desde el código. **Única excepción (aprobada por el dueño,
  nov. 2026):** las vistas previas al compartir (`*_og.jpg`), en JPG para que WhatsApp siempre las muestre.
- **Originales:** se respaldan en `_assets_backup/` con la misma ruta relativa
  (`public/images/galeria/x.png` → `_assets_backup/images/galeria/x.png`), fuera del build.
- **Versiones derivadas** (recortes, tamaños menores) llevan sufijo (`tonaltlan_logo_nav.webp`,
  `produccion_footer.webp`). Si el sufijo es el ancho (`tonaltlan_logo_nav_360.webp`,
  `produccion_footer_675.webp`, `instagram_64.webp`), ya es su tamaño final. El original no se sobrescribe.
- **Solo lo que se usa vive en `public/`:** el arte que ninguna página muestra se queda en `_assets_backup/`
  (excepción: las fuentes de `vista-previa.py`, `piramides_azteca_final.webp`, `tonaltlan_logo.webp` y `tonaltlan_logo_t.webp`).
- **Verificación tras el build:** cada `/images/...` del HTML generado debe existir en `out/`
  (lo revisa `scripts/verificar-imagenes.mjs`, incluido en `pnpm verificar`).
- **Versiones ligeras (obligatorio al agregar imágenes):** el export estático no redimensiona, así
  que hay que correr `python3 scripts/variantes.py` (requiere Pillow). Genera `-480`, `-1200` (y
  `-1800` en galería) y actualiza `lib/variantes.generated.ts`. Si un original es más angosto que el
  ancho mayor pero pesa más de 150 KB, esa variante conserva su medida y solo se comprime. En el código, nunca uses la ruta
  original directamente para mostrar arte: usa `variante(src, anchoEnPixelesReales)` de
  `lib/imagenes.ts` (pide el doble de lo que se ve, por pantallas retina).
- **Vista previa al compartir e íconos:** `python3 scripts/vista-previa.py` genera la imagen general
  (`piramides_azteca_final_og.jpg`), una `_og.jpg` (1200×630, menos de 300 KB) por retrato de especie y
  deidad y por página con ilustración propia (`PAGINAS`), y los íconos `tonaltlan_logo_icono_N.webp` (la T simplificada del logo, `tonaltlan_logo_t.webp`, sobre selva).
  Córrelo al agregar arte de una especie o deidad (y su color en el script). Si una ficha no tiene su
  `_og.jpg`, usa la general (`lib/vista-previa.ts`).

### 3. Tres idiomas: español, inglés y francés

- **Rutas:** español en las de siempre (`/clases/`), inglés bajo `/en/` y francés bajo `/fr/`
  (`/en/clases/`, `/fr/clases/`). Cada idioma tiene su layout raíz con su `<html lang>`:
  `app/(es)/layout.tsx`, `app/(en)/layout.tsx` y `app/(fr)/layout.tsx`. Los tres solo eligen el idioma:
  metadatos, ícono, barra y pie viven en `components/layout/LayoutRaiz.tsx`.
- **Las páginas son componentes** en `components/paginas/` que reciben `lang`. Los archivos de
  `app/(es)/…/page.tsx`, `app/(en)/en/…/page.tsx` y `app/(fr)/fr/…/page.tsx` solo los envuelven.
  Una página nueva necesita las tres rutas.
- **Todo texto nuevo va en los tres idiomas:**
  - interfaz y landing → `lib/i18n.ts` (`t(lang)`).
  - fichas del compendio → `lib/data.ts`, `lib/data.en.ts` y `lib/data.fr.ts` (mismos slugs, imágenes y `deidad`).
  - textos del creador → `lib/textos.ts` (`getTextos(lang)`).
  - "Tonaltlan de un Vistazo" → `lib/features.tsx` (`getFeatures(lang)`).
  - Test de Afinidad → `lib/affinity-test.ts`, `.en.ts` y `.fr.ts` (mismos ids y puntos).
  - títulos de `<Pendiente>` → `titulosEn` y `titulosFr` en `lib/pendientes.ts`.
- **Selector de idioma:** ES · EN · FR en la barra (en celular, dentro del menú). Usa `rutaEnIdioma()`
  para abrir la misma página en el otro idioma. Los nombres y códigos viven en `IDIOMAS` (`lib/i18n.ts`).
- **Enlaces internos:** siempre con `ruta(lang, "/ruta/")`, para no sacar al visitante de su idioma.
- **Metadatos:** `metaPagina(lang, path, título, descripción, imagen?)` agrega la URL canónica, `hreflang` y
  la vista previa al compartir (Open Graph y X). `LayoutRaiz` define el ícono y la vista previa por defecto.
- **Buscadores:** `app/sitemap.ts` (agrega ahí cada página pública nueva) y `app/robots.ts` (`/pendientes`
  fuera). **404:** `app/global-not-found.tsx` (en los tres idiomas; `experimental.globalNotFound`).
- **Traducciones:** borradores fieles, pendientes de revisión (entradas `traduccion-ingles` y
  `traduccion-frances` en `/pendientes`). Glosario inglés aprobado por el creador (nov. 2026).
  Los nombres propios mesoamericanos y de personajes no se traducen (Hombre Jaguar, Brujo Catemaco…).
- **Test de Afinidad:** el envío al webhook incluye `lang` (`es`, `en` o `fr`), `dominantRace` y
  `secondaryRace` (clave de especie igual en todos los idiomas).
- **Mantente Informado** usa el mismo webhook y la misma hoja: `payloadSuscripcion()` manda el correo con
  `subscribed: true` y `mode: "newsletter"` (columnas del test vacías). Reintentos y cola sin conexión
  son compartidos (`guardarEnvio` y `vaciarCola` en `lib/affinity-submission.ts`).

### Test de Afinidad (v2, nov. 2026)

- **7 preguntas en orden fijo** (`ORDEN_SESION` en `lib/affinity-test.ts`): 4 de texto (6, 8, 9 y 10,
  las que tienen todas sus opciones positivas) y 3 visuales de un toque: símbolo (los emblemas
  de los dioses), color (el de cada deidad) y dios (retratos del compendio).
  Las preguntas 1–5 y 7 siguen en el archivo, fuera de la sesión.
- **Balance por diseño, sin pesos de corrección:** cada opción de texto da 2 puntos a su especie y a
  veces 1 a otra; cada opción visual da 3. Los empates los decide lo elegido en las visuales
  (dios > símbolo > color). Los puntos viven solo en el archivo en español.
- **Antes de subir cambios al test:** `node scripts/simular-afinidad.mjs` (falla si alguna especie se
  aleja más de 2 puntos del 14.3 % o si los idiomas no coinciden).
- **Resultado:** cabe en la primera pantalla del celular: retrato con el nombre encima ("Ana, eres
  Lok'Naa"), lectura tipo horóscopo (`lectura`: 3 frases positivas y generales), "Con un toque de" la
  segunda especie y la lectura completa original en un desplegable. La revelación (`.revelacion-arte`,
  `.revelacion-texto`) es el único momento animado de la página.
- **Compartir** (`components/afinidad/CompartirResultado.tsx`): botón principal del resultado. Dibuja en
  canvas una imagen de historia (1080×1920, lo importante entre y=250 y y=1670) y abre el menú de
  compartir del celular; en computadora la descarga. Los colores salen de `hex`/`hexTexto` en `deityThemes`.
- **Código:** la lógica vive en `lib/affinity-core.ts` (sin textos) y es lo único que importa el navegador.
  `components/paginas/Afinidad.tsx` (servidor) le pasa a `AfinidadCliente.tsx` las preguntas, las lecturas
  y el arte solo del idioma del visitante. `lib/affinity-test.ts` importa los tres idiomas: nunca lo
  importes desde un componente `"use client"`. Lo mismo vale para `lib/data*.ts`, `lib/compendio.ts`,
  `lib/textos.ts` y `lib/pendientes.ts`: el componente de servidor los lee y pasa solo lo necesario
  como props (así lo hacen `Inicio` → `AnuncioEvento` y `Clases` → `ClassSelector`).
- **Nombres de resultado:** siguen el formato `ESPECIE, Elemento. Arquetipo` ("TON, Luz. El Iluminador");
  `parseAffinityTitle` en `AfinidadCliente.tsx` saca de ahí el elemento y el arquetipo del resultado.
- **Guardado a prueba de Wi-Fi:** si el envío al webhook no sale, se reintenta 2 veces y luego se guarda en
  `localStorage` (`tonaltlan-afinidad-pendientes`) para reenviarse al volver la conexión o al abrir de
  nuevo el test. El resultado muestra "Reintentar".
- **Durante el test** el encabezado se encoge a una barra con el progreso (3/7); la ayuda solo sale en
  la primera pregunta.

### Danza Tonal (minijuego, nov. 2026)

- **Qué es:** juego de memoria en `/juega/danza-tonal/` (tarjeta en `/juega`). Los glifos de los siete
  dioses (sus emblemas) se encienden en orden y el jugador repite la danza; cada ronda suma un paso.
  Puntaje: la danza más larga que repitió completa. Nace del Mitotiani ("Danzante Tonal", cuyos pasos
  dejan glifos), que acompaña la página en escritorio con enlace a su clase.
- **Reglas del dueño:** solo visual (**sin sonido**), cada jugador en su propio navegador (**sin modo
  stand**, sin demo automática ni tablas compartidas) y **solo arte existente** (emblemas, figuras de
  los Puntos Tonal, Mitotiani). El récord personal vive en `localStorage` (`tonaltlan-danza-record`).
- **Mecánica** (`lib/danza-core.ts`, sin textos ni React): empieza con 4 glifos (luz, agua, fuego,
  obscuridad); tierra, aire y rayo se suman en las rondas 5, 8 y 11 y son el paso nuevo de esa ronda.
  Nunca el mismo glifo tres veces seguidas. El ritmo se acelera, pero nunca pasa de 2.5 destellos por
  segundo (WCAG 2.3.1). La figura del centro despierta por capas: silueta, los siete en el pecho y el
  Tonal recorriendo el cuerpo.
- **Antes de subir cambios al juego:** `node scripts/probar-danza.mjs` (incluido en `pnpm verificar`):
  juega miles de partidas y revisa desbloqueos, ritmo, puntaje y que los textos existan en los tres idiomas.
- **Código:** `components/paginas/DanzaTonal.tsx` (servidor) arma cada glifo con su emblema, el color
  de su deidad (`deityThemes`) y los nombres del compendio en el idioma del visitante; la parte
  interactiva es `components/danza/DanzaTonalCliente.tsx`. Textos en `lib/i18n.ts` (`paginas.danza`,
  y `juega.danzaTexto` para la tarjeta).
- **Jugar:** toque (cuenta al bajar el dedo), clic, Enter o espacio sobre un glifo, o las teclas 1 a 7
  (en el orden del círculo). Si el jugador cambia de pestaña, la danza se pausa y al volver se repite la
  ronda sin castigo. "Retar a alguien" abre el menú de compartir o copia el enlace.

### Dados de los Siete (tirador de dados, nov. 2026)

- **Qué es:** tirador de dados de rol en `/juega/dados/` (tarjeta en `/juega`), para usar en la mesa.
  Set convencional: d4, d6, d8, d10, d12, d20 y d100. Cada dado lleva el color (`deityThemes`) y el
  emblema de una deidad, por las correspondencias clásicas de los sólidos con los elementos: d4 Zilo
  (fuego), d6 Tzal (tierra), d8 Heka (aire), d10 Calti (obscuridad), d12 Tonatli (luz), d20 Lok (agua)
  y d100 Tohui (rayo). Es decisión de diseño: **ningún texto dice que el dado "pertenece" al dios**.
- **Reglas del dueño:** sin imágenes nuevas (dados en **SVG puro**, `components/dados/Dado.tsx`, con
  los emblemas existentes), sin librerías 3D, **sin sonido** y cómodo en celular.
- **Uso en mesa:** abre listo para tirar **1d20 de un toque** (la bandeja vacía es 1d20). Tocar un dado
  lo suma (`2d6 + 1d8`), − / + ajusta el modificador y cada término se quita con su "−". Ventaja y
  desventaja **solo con 1d20**: con otros dados el control se desactiva, vuelve a "Normal" y lo dice.
  El 20 y el 1 natural (crítico y pifia) solo cuentan en tiradas de 1d20; con ventaja o desventaja,
  el dado que cuenta. Historial de las últimas 10 tiradas con "Repetir" (`localStorage`,
  `tonaltlan-dados-historial`). Un doble toque no tira dos veces. "Mantener la pantalla encendida"
  solo aparece si existe `navigator.wakeLock` y se vuelve a pedir al regresar a la pestaña.
  Todos los controles llevan `touch-action: manipulation`.
- **Lógica** (`lib/dados-core.ts`, sin textos ni React): azar con `crypto.getRandomValues` y
  rejection sampling (sin sesgo de módulo); d100 de mesa: decenas 00–90 + unidades 0–9, con
  **00 + 0 = 100**. **Antes de subir cambios:** `node scripts/probar-dados.mjs` (incluido en
  `pnpm verificar`): revisa el tramo descartado de cada dado, el reparto con crypto real, el d100,
  ventaja y desventaja, la bandeja y que los textos existan en los tres idiomas.
- **Código:** `components/paginas/Dados.tsx` (servidor) manda el color y el emblema de cada dado y los
  textos; la parte interactiva es `components/dados/DadosCliente.tsx`. Textos en `lib/i18n.ts`
  (`paginas.dados`, y `juega.dadosTexto` para la tarjeta). Las cifras van en Inter (el cero de
  Macondo lleva una diagonal y se confunde en una tirada).

### 4. Contenido faltante: `<Pendiente id>`

- **Registro único:** todo hueco de contenido sale de `lib/pendientes.ts`. Cada entrada tiene un
  título, en qué página aparece (`donde`), qué se necesita (`necesita`) y, opcionalmente, pistas
  sacadas de textos que ya existen en el sitio (`pistas`).
- **En una página:** `<Pendiente id="..." />` o `<Pendiente id="..." variante="compacto" />`.
- **Página `/pendientes`:** junta todas las entradas como checklist para el equipo de contenido (noindex).
- **Cuando llega el contenido:** se reemplaza el `<Pendiente>` por el contenido real y se borra su
  entrada en `lib/pendientes.ts`.
- **En producción:** `MOSTRAR_NECESIDADES = false` (activo desde nov. 2026): en público solo se ve
  "Próximamente" y el título; la lista de "Qué se necesita" vive completa en `/pendientes`.

---

## Dónde vive cada cosa

| Archivo | Contenido |
|---|---|
| `lib/site.ts` | Botones del Hero (`heroCtas`), contactos, redes, listas de imágenes de Galería, Monturas y Bestiario, **colores y emblemas por deidad** (`deityThemes`, `themeFor`, `emblemas`). La navegación y el footer viven en `lib/i18n.ts` |
| `lib/data.ts` | Fichas del compendio: `clases`, `especies`, `deidades`, `bestiario`, `monturas` y `sectionsMeta` (conteos para Explorar). Las especies llevan `deidad: "<slug>"` para agruparse por linaje y heredar su color |
| `lib/i18n.ts` | Idiomas: `t(lang)` (textos de interfaz y landing), `ruta(lang, path)`, `metaPagina(...)` |
| `lib/compendio.ts` | `getCompendio(lang)`: fichas del compendio en el idioma pedido |
| `lib/textos.ts` | Textos entregados por el creador (intros de Clases y Especies, cierre de Clases, Cosmovisión, noticias), en los tres idiomas |
| `lib/features.tsx` | Textos de "Tonaltlan de un Vistazo" (landing, `/mundo` y `/juega`) |
| `lib/pendientes.ts` | Registro de contenido pendiente |
| `lib/affinity-*.ts`, `hooks/useAffinityTest.ts` | Test de Afinidad y su envío por webhook |
| `lib/danza-core.ts`, `components/danza/` | Danza Tonal: lógica del juego, juego (`DanzaTonalCliente`) y su tarjeta para `/juega` (`TarjetaDanza`) |
| `lib/dados-core.ts`, `components/dados/` | Dados de los Siete: lógica del tirador, dados en SVG (`Dado`), tirador (`DadosCliente`) y su tarjeta para `/juega` (`TarjetaDados`) |
| `components/ui/` | Piezas genéricas: `Greca`, `Pendiente`, `AnchorPage` (página con índice lateral) |
| `components/paginas/` | Cada página como componente con `lang` (las rutas de `app/` las envuelven) |
| `components/inicio/` | Secciones de la landing: `Hero`, `About`, `ExplorePreview`, `Features`, `Newsletter`, `AnuncioEvento` |
| `components/layout/` | Marco de todas las páginas: `LayoutRaiz` (metadatos e ícono), `Navbar`, `Footer` |
| `components/afinidad/` | Piezas del Test de Afinidad: `CompartirResultado`, `TarjetaTest` |
| `scripts/` | `variantes.py`, `vista-previa.py`, `emblemas.py`, `verificar-imagenes.mjs`, `simular-afinidad.mjs`, `probar-danza.mjs`, `probar-dados.mjs` |
| `_assets_backup/` | Originales de imágenes y textos del creador (incluye el test original v1), fuera del build |
| `components/compendio/` | Piezas del compendio: `SectionHeader`, `ClassSelector`, `GalleryGrid`, `MountCarousel`, `DetailLayout`, `SearchBar` |

### Estructura del sitio

- **Navbar:** El Mundo (`/mundo`) · Compendio (`/explorar`) · Juega (`/juega`) · Galería (`/galeria`),
  más el selector **ES / EN / FR** y el botón dorado **Test de Afinidad**. En celular ese botón queda
  visible en la barra, junto al menú: es la puerta de entrada en convenciones.
- **Suscríbete** vive en el footer (columna Estudio) y en la sección Newsletter de la landing, que guarda
  el correo en la hoja de Google. Mientras no haya política de privacidad, muestra el contacto de Guarda Códices.
- **Redes:** por ahora solo Instagram (`socialLinks` en `lib/site.ts`); X y Discord se agregan cuando existan.
- **Compendio:** `/clases`, `/especies` (+ `/especies/[slug]`), `/deidades` (+ `/deidades/[slug]`),
  `/bestiario`, `/monturas`. Especies tiene ocho: siete por linaje divino y los **Tlacas**
  (humanos sin afinidad elemental; ficha pendiente).
- **Juega:** `/juega` con el Test de Afinidad (`/afinidad`), la Danza Tonal (`/juega/danza-tonal`) y
  Dados de los Siete (`/juega/dados`).
- **Estudio** (en el footer): `/nosotros`, `/noticias`, contacto.
- **Cada tipo de contenido tiene su propia presentación**; no se repite un solo patrón de tarjeta:
  - Clases: selector "elige tu personaje".
  - Especies: agrupadas por linaje.
  - Deidades: panteón.
  - Bestiario: ficha estilo manual de monstruos.
  - Monturas: carrusel.
  - Galería: mosaico con vista ampliada.

### Cómo agregar…

- **Una entrada al compendio:** se agrega en `lib/data.ts`. A una especie nueva se le asigna su `deidad`.
- **Una deidad nueva:** se agrega en `lib/data.ts` y se le define un color en `deityThemes` (`lib/site.ts`).
- **Una página o sección:** se crea el componente en `components/paginas/`, sus tres rutas
  (`app/(es)/…`, `app/(en)/en/…` y `app/(fr)/fr/…`), sus textos en `lib/i18n.ts` (es, en y fr), su
  entrada en `app/sitemap.ts` y el enlace en la navegación o el footer (`lib/i18n.ts`). Si aún no
  tiene contenido, se le pone un `<Pendiente>`.
- **Imágenes de Galería o Monturas:** se agregan a `galleryImages` o `mountImages` en `lib/site.ts`.
- **Clases de Tailwind escritas en `lib/`:** deben ir completas (nada de `bg-${color}-400`), porque
  Tailwind solo detecta las clases que aparecen literalmente en el código. `lib/` ya está en el
  `content` de `tailwind.config.ts`.

---

## Diseño

**Identidad definida: dirección "Quetzal"** (elegida por el creador). Sale del logo: jade, turquesa y
oro sobre verde selva profundo. Los colores viven como escalas propias en `tailwind.config.ts`;
**no uses `slate`, `amber` ni `emerald`**, y no agregues colores sueltos: extiende las escalas.

| Escala | Rol | Clave |
|---|---|---|
| `selva` | Fondos y texto | fondo `selva-900` (`#0b1d19`), footer `selva-950`, tarjetas `selva-800`, texto `selva-100` / párrafos `selva-300` / metadatos `selva-400` |
| `jade` | Títulos | `jade-400` (`#4ade80`) |
| `turquesa` | Etiquetas y detalles | `turquesa-400` (`#38bdf8`) |
| `oro` | **Solo acción principal** y estado activo | `oro-400` (`#f5b82e`) con texto `selva-950` |

- **Colores por deidad** en `lib/site.ts` (Heka cielo, Lok cian, Tzal lima, Zilo naranja, Calti violeta,
  Tonatli amarillo, Tohui fucsia); sus especies los heredan.
- **Emblemas de los dioses** (`emblemas` en `lib/site.ts`): cada elemento individual del diseñador sobre el
  disco de su color (`python3 scripts/emblemas.py`; originales en `_assets_backup/images/mundo/elementos/`), con la
  asignación confirmada por el diseñador (luz Tonatli, obscuridad Calti, rayo Tohui, tierra Tzal, aire Heka,
  fuego Zilo, agua Lok). Van junto al nombre del dios (`/deidades` y su ficha), en "Hijos de…" de
  `/especies`, en el resultado del test y en la pregunta "Elige un símbolo". Son decorativos (`alt=""`).
- **Tipografía:** **Macondo** para títulos (`font-display`, elegida por el creador) e **Inter** para
  el texto. Macondo tiene **un solo peso (400)**: nunca la combines con `font-bold`/`font-semibold`
  (el navegador inventa una negrita fea), ni con `uppercase` o `tracking-*`.
- **Sin tokens antiguos:** `gold`, `teal`, `muted`, `foreground`, `background` y `glass-card` se
  retiraron en nov. 2026 (la ficha de detalle ya usa la paleta Quetzal con los mismos colores).
- **Contraste verificado (WCAG AA):** `selva-300` sobre `selva-900` 9.8:1, `selva-400` 6.9:1,
  `oro-400` con texto `selva-950` 10.7:1.
- `.github/copilot-instructions.md` es un resumen que remite a este archivo; si difieren, manda este.

### Lenguaje visual propio

- **Greca escalonada** (`components/ui/Greca.tsx`): separador entre secciones y relleno de lo que aún
  no tiene arte. Es el detalle gráfico mesoamericano del sitio; úsala en lugar de líneas o rombos.
- **El arte manda:** cuando una sección tiene ilustraciones, preséntala con ellas (mosaico del
  compendio en la landing). Evita tarjetas genéricas de solo texto.
- **No repetir el mismo formato:** cada bloque entrega la información de forma distinta.
  - Landing, compendio: mosaico de arte (`ExplorePreview`).
  - Landing, "Tonaltlan de un Vistazo": **quincunce** (cosmograma de los cuatro rumbos y el centro;
    `components/inicio/Features.tsx`). El título vive en el emblema y cada tema ocupa un rumbo cuyo rayo se ilumina.
  - `/explorar`: **índice de códice**, filas grandes con un abanico de 3 miniaturas del arte de cada
    sección que se abre al pasar el cursor.

### Criterios de Impeccable aplicados

- **Sin etiquetas pequeñas sobre los títulos** (kickers/eyebrows). `SectionHeader` solo muestra una
  ruta de navegación ("Compendio /") cuando enlaza a algún lado.
- **Sin números de sección** decorativos (01, 02…).
- **Sin bordes laterales de color** de más de 1 px en tarjetas o notas.
- **Un solo momento animado por página:** en la landing, la entrada del Hero (`.hero-reveal`). Las
  secciones se ven siempre, sin animación de aparición. **Excepciones: la Danza Tonal**, donde los
  destellos de los glifos son la mecánica del juego, **y Dados de los Siete**, donde cada tirada rueda
  (ver "Interacción y animación").
- **El oro se reserva para la acción**; los títulos van en jade.

### Flujo de la landing

- **Hero:** botón principal "Explorar" + secundario "Test de Afinidad" (`heroCtas` en `lib/site.ts`;
  para una convención se puede invertir el orden). El logo grande no es un botón.
- **El Newsletter cierra el embudo:** sobre el arte de Aztlan (Galería), texto del lado oscuro del degradado.
- **Tarjetas:** son enlaces completos; no se agregan botones de "Ver más".

---

## Interacción y animación

Skills fijadas en el repo (ver el `ORIGEN.md` de cada una):

- **`.claude/skills/emil-design-eng`:** referencia para animaciones e interacción.
- **`.claude/skills/impeccable`:** auditoría y crítica de diseño (`/impeccable audit`, `critique`,
  `typeset`, `polish`…). Su detector automático necesita descargar y ejecutar un binario la primera
  vez; sin él, la skill sigue sirviendo como guía.

Reglas aplicadas en el código:

- **Reducir movimiento:** todo lo que se desplaza o escala lleva `motion-safe:` (por ejemplo,
  `motion-safe:hover:-translate-y-1`). Con `prefers-reduced-motion` se conservan opacidad y color.
  En JS, usa `usePrefersReducedMotion()` o `prefersReducedMotion()` de `hooks/usePrefersReducedMotion.ts`.
- **Curvas:** la predeterminada de `transition` es un ease-out fuerte (`cubic-bezier(0.23, 1, 0.32, 1)`)
  y dura 200 ms. Nunca `ease-in` en UI. En CSS: `var(--ease-out)` y `var(--ease-in-out)`.
- **Duraciones:** 150 a 250 ms para la UI. Solo los efectos decorativos (zoom de imágenes, aparición
  de secciones) pueden durar más.
- **Usar `transition`, no `transition-all`.**
- **Al presionar:** `motion-safe:active:scale-[0.97]` en botones y `0.98` en tarjetas grandes.
- **Hover solo con puntero fino:** está activado `future.hoverOnlyWhenSupported`, para que en
  touch no se queden "pegados" los efectos.
- **Teclado sin animación:** Esc, flechas y atajos responden de inmediato.
- **Modales:** entran desde `scale(0.96)` con opacidad, nunca desde `scale(0)`, y cierran más rápido
  de lo que abren. Al cerrar, el foco vuelve al elemento que los abrió.
- **Anuncio de evento** (`components/inicio/AnuncioEvento.tsx`, solo en la landing): abre en grande uno de los
  carteles (al azar) de la noticia que tenga `anuncioHasta` en `lib/textos.ts` (`Inicio` se la pasa ya
  elegida). Desaparece solo después
  de esa fecha y, una vez cerrado, no vuelve a salir en la misma sesión. Se monta con un portal en `<body>`
  para quedar encima de la barra.
- **Entrada del Hero:** `.hero-reveal` (con `animation-delay` escalonado); con reducir movimiento es
  solo opacidad.
- **Logo del Hero:** `.logo-latido` (pulso doble lento cada 4 s) y `.logo-aura` (resplandor oro/jade
  que respira detrás). Es la única animación continua del sitio; se desactiva con reducir movimiento.
- **Danza Tonal (excepción aprobada):** es la única página con animación repetida, porque los destellos
  son el juego. Clases `.danza-*` en `app/globals.css`: el glifo se enciende de golpe (sin transición)
  y se apaga en 220 ms; el glifo que se suma pasa de gris a color; un error sacude el tablero una vez.
  Con reducir movimiento no hay escalas ni sacudidas, solo brillo, color y opacidad, y el desplazamiento
  al empezar es instantáneo (`prefersReducedMotion()`). Las teclas 1 a 7 no agregan animación.
- **Dados de los Siete (excepción aprobada):** la tirada es el único momento animado de la página y se
  repite en cada tiro. Clases `.dado-*` en `app/globals.css`: el dado rueda unos 520 ms mientras sus
  caras cambian (solo visual: el resultado ya salió de `crypto`) y se detiene con ease-out fuerte; el
  20 natural da un pulso con contorno de oro y rayos, y el 1 natural una sacudida en rojo. Con reducir
  movimiento (`prefersReducedMotion()`) no hay giro, pulso ni sacudida: el resultado llega con un
  fundido corto y el crítico o la pifia se notan por el color.

---

## Git

- Trabajar en una rama, nunca directo en `main`. Un PR por fase o tema.
- En el PR: qué cambió, cómo se verificó y **cualquier texto de interfaz nuevo o reemplazado**.
