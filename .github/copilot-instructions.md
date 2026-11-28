# Tonaltlan — instrucciones para Copilot

La guía completa del proyecto está en [`CLAUDE.md`](../CLAUDE.md), en la raíz del repositorio.
Ese archivo manda: si algo aquí no coincide, sigue `CLAUDE.md`.

## Lo esencial

- **Stack:** Next.js 15 (App Router) con exportación estática (`output: "export"`) a GitHub Pages
  (`tonaltlan.com`) y Tailwind CSS 3. No hay rutas API ni server actions.
- **Antes de subir cambios:** `pnpm verificar` (typecheck, build, imágenes y balance del Test de Afinidad).
- **Textos:** el copy del sitio es intocable; no se inventa contenido del mundo. Lo que falta va como
  `<Pendiente id>` (registro en `lib/pendientes.ts`).
- **Tres idiomas:** todo texto nuevo va en español, inglés y francés (`lib/i18n.ts`, `lib/data*.ts`,
  `lib/textos.ts`…). Las páginas viven en `components/paginas/` y reciben `lang`.
- **Imágenes:** solo `.webp` en `public/images/` (excepción: vistas previas `*_og.jpg`). Al agregar
  arte, corre `python3 scripts/variantes.py` y muéstralo con `variante(src, ancho)`.
- **Diseño:** paleta Quetzal (`selva`, `jade`, `turquesa`, `oro`); no uses `slate`, `amber` ni
  `emerald`. Títulos con Macondo (`font-display`, un solo peso).
- **Animación:** todo lo que se mueve lleva `motion-safe:`; un solo momento animado por página.
