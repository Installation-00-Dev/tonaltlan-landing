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

**No modificar, agregar, eliminar, resumir ni "corregir"** textos existentes: títulos, descripciones,
fichas del compendio, avisos de privacidad, contactos y textos legales. Esto incluye los textos
**sin acentos** (por ejemplo "Que es Tonaltlan?", "Galeria", "montanas"): se corrigen solo si el
dueño del proyecto lo pide explícitamente.

- **Sí se permite:** cambiar `className`, la estructura del JSX, el layout y el orden visual.
- **Reutilizar un texto existente** en otra página es válido, siempre copiado tal cual. Mejor aún:
  moverlo a `lib/` y leerlo desde ahí (como `lib/features.tsx`).
- **Etiquetas nuevas de interfaz** ("Leer su historia", "Próximamente", "Linaje"): solo cuando una
  funcionalidad nueva las necesite, y se mencionan explícitamente en el resumen del PR.
- **Contenido nuevo del mundo** (lore, reglas, descripciones): nunca se inventa. Si falta, va un
  placeholder `<Pendiente>` (ver regla 3).

### 2. Imágenes: siempre `.webp`

- **Formato y ubicación:** todas las imágenes del sitio viven en `public/images/` y son `.webp`.
  Nunca referenciar `.png`, `.jpg` ni `.jpeg` desde el código.
- **Originales:** se respaldan en `_assets_backup/` con la misma ruta relativa
  (`public/images/galeria/x.png` → `_assets_backup/images/galeria/x.png`), fuera del build.
- **Versiones derivadas** (recortes, tamaños menores) llevan sufijo (`tonaltlan_logo_nav.webp`,
  `produccion_footer.webp`). El original no se sobrescribe.
- **Verificación tras el build:** cada `/images/...` del HTML generado debe existir en `out/`.

### 3. Contenido faltante: `<Pendiente id>`

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
| `lib/site.ts` | Navegación (`mainNav`, `navCta`), columnas del footer, contactos, redes, listas de imágenes de Galería y Monturas, **colores por deidad** (`deityThemes`, `themeFor`) |
| `lib/data.ts` | Fichas del compendio: `clases`, `especies`, `deidades`, `bestiario`, `monturas` y `sectionsMeta` (conteos para Explorar). Las especies llevan `deidad: "<slug>"` para agruparse por linaje y heredar su color |
| `lib/features.tsx` | Textos de "Tonaltlan de un Vistazo" (landing, `/mundo` y `/juega`) |
| `lib/pendientes.ts` | Registro de contenido pendiente |
| `lib/affinity-*.ts`, `hooks/useAffinityTest.ts` | Test de Afinidad y su envío por webhook |
| `components/ui/` | Piezas genéricas: `Pendiente`, `AnchorPage` (página con índice lateral) |
| `components/compendio/` | Piezas del compendio: `SectionHeader`, `ClassSelector`, `GalleryGrid`, `MountCarousel`, `DetailLayout`, `SearchBar` |

### Estructura del sitio

- **Navbar:** El Mundo (`/mundo`) · Compendio (`/explorar`) · Juega (`/juega`) · Galería (`/galeria`),
  más el botón Suscríbete (`/#newsletter`).
- **Compendio:** `/clases`, `/especies` (+ `/especies/[slug]`), `/deidades` (+ `/deidades/[slug]`),
  `/bestiario`, `/monturas`.
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
- **Una página o sección:** se crea la ruta en `app/`, se enlaza desde `mainNav` o `footerColumns`
  (`lib/site.ts`) y, si aún no tiene contenido, se le pone un `<Pendiente>`.
- **Imágenes de Galería o Monturas:** se agregan a `galleryImages` o `mountImages` en `lib/site.ts`.
- **Clases de Tailwind escritas en `lib/`:** deben ir completas (nada de `bg-${color}-400`), porque
  Tailwind solo detecta las clases que aparecen literalmente en el código. `lib/` ya está en el
  `content` de `tailwind.config.ts`.

---

## Diseño

> ⚠️ **La paleta de colores y la tipografía actuales son PROVISIONALES.** No convencen todavía y
> la identidad visual va a evolucionar. No las trates como un sistema cerrado: no agregues más
> colores sueltos ni dependas de los tonos exactos. Centraliza en tokens para que el cambio sea
> barato.

Estado actual (provisional):

- **Fondo:** `slate-900`; el footer usa `slate-950`.
- **Texto:** `slate-100` en títulos, `slate-300` en párrafos.
- **Acento principal:** `amber-400`/`amber-300` (botones y títulos). Acento secundario: `emerald`.
- **Colores por deidad** en `lib/site.ts`: Heka cielo, Lok cian, Tzal lima, Zilo naranja, Calti
  violeta, Tonatli amarillo, Tohui fucsia.
- **Tipografía:** **Cinzel** para títulos (provisional: se busca algo con más carácter mesoamericano
  y de fantasía, menos romano) e **Inter** para el cuerpo.
- **Variables CSS** en `app/globals.css`: `--gold`, `--teal`, `--bg` y otras, que usan las páginas
  antiguas como tokens.
- `.github/copilot-instructions.md` describe una paleta anterior (dorado `#c5a059` y teal sobre
  `#07070a`); para diseño, manda este archivo.

### Flujo de la landing

- **Un solo CTA principal:** "Explorar", en el Hero. El logo grande del Hero no es un botón.
- **El Newsletter cierra el embudo.**
- **Tarjetas:** son enlaces completos; no se agregan botones de "Ver más".

---

## Interacción y animación

La skill `.claude/skills/emil-design-eng` (fijada en el repo, ver su `ORIGEN.md`) es la referencia
para animaciones e interacción. Reglas aplicadas en el código:

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
- **Aparición de secciones:** el hook `useFadeIn` usa `animate-fade-in`, o `animate-fade-only` si se
  pidió reducir movimiento.

---

## Git

- Trabajar en una rama, nunca directo en `main`. Un PR por fase o tema.
- En el PR: qué cambió, cómo se verificó y **cualquier texto de interfaz nuevo o reemplazado**.
