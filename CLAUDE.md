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
```

Antes de cada commit: `pnpm typecheck` y `pnpm build` deben pasar.

- `output: "export"`, `trailingSlash: true`, `images.unoptimized`. No hay rutas API ni server actions.
- Al hacer push a `main`, `.github/workflows/pages.yml` publica el sitio. El `index.html` de la raíz es la
  página legacy que se sirve en `/proximamente`.

---

## Reglas inquebrantables

### 1. El copy es 100 % intocable

**No modificar, agregar, eliminar ni resumir** textos existentes: títulos, descripciones, fichas del
compendio, avisos de privacidad, contactos y textos legales.

- **Ortografía:** el dueño autorizó corregir acentos, ñ y signos de apertura (¿ ¡) del español en
  todo el sitio (hecho en nov. 2026). Los textos nuevos deben llegar o quedar bien escritos.
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
  Nunca referenciar `.png`, `.jpg` ni `.jpeg` desde el código.
- **Originales:** se respaldan en `_assets_backup/` con la misma ruta relativa
  (`public/images/galeria/x.png` → `_assets_backup/images/galeria/x.png`), fuera del build.
- **Versiones derivadas** (recortes, tamaños menores) llevan sufijo (`tonaltlan_logo_nav.webp`,
  `produccion_footer.webp`). El original no se sobrescribe.
- **Verificación tras el build:** cada `/images/...` del HTML generado debe existir en `out/`.
- **Versiones ligeras (obligatorio al agregar imágenes):** el export estático no redimensiona, así
  que hay que correr `python3 scripts/variantes.py` (requiere Pillow). Genera `-480`, `-1200` (y
  `-1800` en galería) y actualiza `lib/variantes.generated.ts`. En el código, nunca uses la ruta
  original directamente para mostrar arte: usa `variante(src, anchoEnPixelesReales)` de
  `lib/imagenes.ts` (pide el doble de lo que se ve, por pantallas retina).

### 3. Dos idiomas: español e inglés

- **Rutas:** español en las de siempre (`/clases/`), inglés bajo `/en/` (`/en/clases/`). Cada idioma
  tiene su layout raíz con su `<html lang>`: `app/(es)/layout.tsx` y `app/(en)/layout.tsx`.
- **Las páginas son componentes** en `components/paginas/` que reciben `lang`. Los archivos de
  `app/(es)/…/page.tsx` y `app/(en)/en/…/page.tsx` solo los envuelven. Una página nueva necesita
  las dos rutas.
- **Todo texto nuevo va en ambos idiomas:**
  - interfaz y landing → `lib/i18n.ts` (`t(lang)`).
  - fichas del compendio → `lib/data.ts` y `lib/data.en.ts` (mismos slugs, imágenes y `deidad`).
  - textos del creador → `lib/textos.ts` (`getTextos(lang)`).
  - "Tonaltlan de un Vistazo" → `lib/features.tsx` (`getFeatures(lang)`).
  - Test de Afinidad → `lib/affinity-test.ts` y `lib/affinity-test.en.ts` (mismos ids y puntos).
- **Enlaces internos:** siempre con `ruta(lang, "/ruta/")`, para no sacar al visitante de su idioma.
- **Metadatos:** `metaPagina(lang, path, título, descripción)` agrega la URL canónica y `hreflang`.
- **Traducción al inglés:** borrador fiel, pendiente de revisión por el creador (entrada
  `traduccion-ingles` en `/pendientes`, con glosario). Los nombres propios mesoamericanos no se
  traducen.
- **Test de Afinidad:** el envío al webhook incluye `lang`, `dominantRace` y `secondaryRace` (clave
  de especie igual en ambos idiomas).

### 4. Contenido faltante: `<Pendiente id>`

- **Registro único:** todo hueco de contenido sale de `lib/pendientes.ts`. Cada entrada tiene un
  título, en qué página aparece (`donde`), qué se necesita (`necesita`) y, opcionalmente, pistas
  sacadas de textos que ya existen en el sitio (`pistas`).
- **En una página:** `<Pendiente id="..." />` o `<Pendiente id="..." variante="compacto" />`.
- **Página `/pendientes`:** junta todas las entradas como checklist para el equipo de contenido (noindex).
- **Cuando llega el contenido:** se reemplaza el `<Pendiente>` por el contenido real y se borra su
  entrada en `lib/pendientes.ts`.
- **Para producción:** `MOSTRAR_NECESIDADES = false` oculta la lista de "Qué se necesita" en público.

---

## Dónde vive cada cosa

| Archivo | Contenido |
|---|---|
| `lib/site.ts` | Botones del Hero (`heroCtas`), contactos, redes, listas de imágenes de Galería y Monturas, **colores por deidad** (`deityThemes`, `themeFor`). La navegación y el footer viven en `lib/i18n.ts` |
| `lib/data.ts` | Fichas del compendio: `clases`, `especies`, `deidades`, `bestiario`, `monturas` y `sectionsMeta` (conteos para Explorar). Las especies llevan `deidad: "<slug>"` para agruparse por linaje y heredar su color |
| `lib/i18n.ts` | Idiomas: `t(lang)` (textos de interfaz y landing), `ruta(lang, path)`, `metaPagina(...)` |
| `lib/compendio.ts` | `getCompendio(lang)`: fichas del compendio en el idioma pedido |
| `lib/textos.ts` | Textos entregados por el creador (intros de Clases y Especies, cierre de Clases), con versión en inglés |
| `lib/features.tsx` | Textos de "Tonaltlan de un Vistazo" (landing, `/mundo` y `/juega`) |
| `lib/pendientes.ts` | Registro de contenido pendiente |
| `lib/affinity-*.ts`, `hooks/useAffinityTest.ts` | Test de Afinidad y su envío por webhook |
| `components/ui/` | Piezas genéricas: `Pendiente`, `AnchorPage` (página con índice lateral) |
| `components/paginas/` | Cada página como componente con `lang` (las rutas de `app/` las envuelven) |
| `components/compendio/` | Piezas del compendio: `SectionHeader`, `ClassSelector`, `GalleryGrid`, `MountCarousel`, `DetailLayout`, `SearchBar` |

### Estructura del sitio

- **Navbar:** El Mundo (`/mundo`) · Compendio (`/explorar`) · Juega (`/juega`) · Galería (`/galeria`),
  más el selector **ES / EN** y el botón dorado **Test de Afinidad**. En celular ese botón queda
  visible en la barra, junto al menú: es la puerta de entrada en convenciones.
- **Suscríbete** vive en el footer (columna Estudio) y en la sección Newsletter de la landing.
- **Compendio:** `/clases`, `/especies` (+ `/especies/[slug]`), `/deidades` (+ `/deidades/[slug]`),
  `/bestiario`, `/monturas`. Especies tiene ocho: siete por linaje divino y los **Tlacas**
  (humanos sin afinidad elemental; ficha pendiente).
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
- **Una página o sección:** se crea el componente en `components/paginas/`, sus dos rutas
  (`app/(es)/…` y `app/(en)/en/…`), sus textos en `lib/i18n.ts` (es y en) y el enlace en la
  navegación o el footer (`lib/i18n.ts`). Si aún no tiene contenido, se le pone un `<Pendiente>`.
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
- **Tipografía:** **Macondo** para títulos (`font-display`, elegida por el creador) e **Inter** para
  el texto. Macondo tiene **un solo peso (400)**: nunca la combines con `font-bold`/`font-semibold`
  (el navegador inventa una negrita fea), ni con `uppercase` o `tracking-*`.
- **Tokens antiguos** (`gold`, `teal`, `muted`, `foreground`, `background`) siguen existiendo para
  páginas previas (Afinidad, detalle) y apuntan a la paleta Quetzal.
- **Contraste verificado (WCAG AA):** `selva-300` sobre `selva-900` 9.8:1, `selva-400` 6.9:1,
  `oro-400` con texto `selva-950` 10.7:1.
- `.github/copilot-instructions.md` describe una paleta anterior; para diseño manda este archivo.

### Lenguaje visual propio

- **Greca escalonada** (`components/ui/Greca.tsx`): separador entre secciones y relleno de lo que aún
  no tiene arte. Es el detalle gráfico mesoamericano del sitio; úsala en lugar de líneas o rombos.
- **El arte manda:** cuando una sección tiene ilustraciones, preséntala con ellas (mosaico del
  compendio en la landing). Evita tarjetas genéricas de solo texto.
- **No repetir el mismo formato:** cada bloque entrega la información de forma distinta.
  - Landing, compendio: mosaico de arte (`ExplorePreview`).
  - Landing, "Tonaltlan de un Vistazo": **quincunce** (cosmograma de los cuatro rumbos y el centro;
    `Features.tsx`). El título vive en el emblema y cada tema ocupa un rumbo cuyo rayo se ilumina.
  - `/explorar`: **índice de códice**, filas grandes con un abanico de 3 miniaturas del arte de cada
    sección que se abre al pasar el cursor.

### Criterios de Impeccable aplicados

- **Sin etiquetas pequeñas sobre los títulos** (kickers/eyebrows). `SectionHeader` solo muestra una
  ruta de navegación ("Compendio /") cuando enlaza a algún lado.
- **Sin números de sección** decorativos (01, 02…).
- **Sin bordes laterales de color** de más de 1 px en tarjetas o notas.
- **Un solo momento animado por página:** en la landing, la entrada del Hero (`.hero-reveal`). Las
  secciones se ven siempre, sin animación de aparición.
- **El oro se reserva para la acción**; los títulos van en jade.

### Flujo de la landing

- **Hero:** botón principal "Explorar" + secundario "Test de Afinidad" (`heroCtas` en `lib/site.ts`;
  para una convención se puede invertir el orden). El logo grande no es un botón.
- **El Newsletter cierra el embudo.**
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
- **Entrada del Hero:** `.hero-reveal` (con `animation-delay` escalonado); con reducir movimiento es
  solo opacidad.
- **Logo del Hero:** `.logo-latido` (pulso doble lento cada 4 s) y `.logo-aura` (resplandor oro/jade
  que respira detrás). Es la única animación continua del sitio; se desactiva con reducir movimiento.

---

## Git

- Trabajar en una rama, nunca directo en `main`. Un PR por fase o tema.
- En el PR: qué cambió, cómo se verificó y **cualquier texto de interfaz nuevo o reemplazado**.
