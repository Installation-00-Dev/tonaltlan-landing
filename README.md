# Tonaltlan

Sitio oficial de **Tonaltlan**, un mundo de fantasía inspirado en las culturas mesoamericanas
para jugar D&D 2024. Lo produce el estudio **Cuevas & Quetzales**. En línea en
[tonaltlan.com](https://tonaltlan.com), en español, inglés (`/en/`) y francés (`/fr/`).

> Las reglas del proyecto (textos, imágenes, idiomas, diseño y animación) están en
> [`CLAUDE.md`](CLAUDE.md). Léelo antes de cambiar algo.

## Tecnología

- Next.js 15 (App Router) con exportación estática (`output: "export"`) a GitHub Pages.
- Tailwind CSS 3 con la paleta propia "Quetzal" (`tailwind.config.ts`).
- Sin servidor: el Test de Afinidad y "Mantente Informado" guardan en una hoja de Google
  mediante un webhook de Apps Script (`lib/affinity-submission.ts`).

## Comandos

```bash
pnpm install     # dependencias
pnpm dev         # servidor de desarrollo
pnpm typecheck   # TypeScript
pnpm build       # exportación estática → out/
pnpm verificar   # typecheck + build + revisión de imágenes + balance del test (antes de subir cambios)
```

Para ver el sitio ya exportado: `python3 -m http.server 3000 -d out`.

## Estructura

```
app/                 Rutas: (es) en la raíz, (en)/en y (fr)/fr; cada idioma con su layout
components/
  paginas/           Cada página como componente que recibe `lang` (las rutas solo lo envuelven)
  inicio/            Secciones de la página principal (Hero, Newsletter, anuncio del evento…)
  layout/            Marco de todas las páginas: LayoutRaiz, Navbar y Footer
  compendio/         Piezas del compendio (selector de clases, galería, ficha de detalle…)
  afinidad/          Piezas del Test de Afinidad (imagen para compartir, tarjeta de invitación)
  ui/                Piezas genéricas (Greca, Pendiente, AnchorPage)
hooks/               Estado del Test de Afinidad y preferencia de movimiento reducido
lib/                 Contenido y utilidades: compendio (data*.ts), textos del creador,
                     idiomas (i18n.ts), test (affinity-*.ts), pendientes, colores y emblemas
public/images/       Imágenes del sitio, siempre .webp (y sus versiones -480/-1200/-1800)
scripts/             Herramientas: versiones ligeras, vistas previas, emblemas y verificaciones
_assets_backup/      Originales (imágenes y textos del creador), fuera del build
```

## Imágenes

Requieren Python 3 con Pillow (`pip install pillow`).

```bash
python3 scripts/variantes.py     # versiones ligeras de cada imagen (obligatorio al agregar arte)
python3 scripts/vista-previa.py  # vistas previas al compartir (_og.jpg) e íconos del sitio
python3 scripts/emblemas.py      # emblemas de los dioses a partir de los elementos del diseñador
```

## Publicación

Al hacer push a `main`, `.github/workflows/pages.yml` compila y publica el sitio en GitHub Pages.
Se trabaja siempre en una rama y se integra con un pull request.

---

Tonaltlan es una producción de **Cuevas & Quetzales**.
