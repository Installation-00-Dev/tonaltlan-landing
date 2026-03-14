# Resumen del proyecto y cambios recientes

Fecha de revision: 2026-03-13

## Estado actual

- No hay cambios locales sin commit en el repositorio.
- La rama actual es `main`.
- El proyecto mezcla dos salidas publicadas en GitHub Pages:
  - La landing legacy en la raiz del sitio usando `index.html`.
  - La app de Next.js exportada estaticamente dentro de `/preview`.

## Como funciona `/preview`

La app de Next.js esta configurada para exportarse de forma estatica con `output: "export"` y servirse bajo `basePath: "/preview"` en `next.config.mjs`.

Eso significa que:

- La home de la app no vive en `/`, sino en `/preview`.
- Las rutas del App Router quedan publicadas como:
  - `/preview/`
  - `/preview/afinidad/`
  - `/preview/clases/`
  - `/preview/bestiario/`
  - `/preview/especies/`
  - `/preview/deidades/`
  - `/preview/monturas/`
  - `/preview/explorar/`
  - `/preview/galeria/`
- Las imagenes del sitio tambien se referencian con prefijo `/preview/images/...` para que funcionen correctamente con ese `basePath`.

En despliegue, el workflow de GitHub Pages arma una carpeta `dist/` con este esquema:

- `dist/index.html` para la landing vieja en raiz.
- `dist/preview/...` para la exportacion de Next.

## Que se muestra en `/preview`

La home de `/preview` usa `app/page.tsx` y renderiza esta secuencia de componentes:

- `Hero`
- `About`
- `ExplorePreview`
- `Features`
- `Newsletter`

O sea: `/preview` es la portada de la nueva app, no una pagina aislada o temporal.

## Ultimos cambios identificados

### 1. 2026-03-10 - `7bcdd1e`
`chore: excluir archivos txt de afinidad`

Se hizo una limpieza del repo:

- Se eliminaron `Sistema_Test_Afinidad.txt`, `notes.txt` y `test_afinidad.txt`.
- Se agrego `.gitignore`.

Impacto:

- No cambia la funcionalidad visible del sitio.
- El repo queda mas limpio y sin archivos de apoyo del test versionados en texto plano.

### 2. 2026-03-10 - `5479a75`
`fix: referencia de pasos en test de afinidad`

Se hizo un ajuste menor en `app/afinidad/page.tsx` relacionado con la referencia de pasos del test.

Impacto:

- Es una correccion puntual del flujo o etiquetado del test de afinidad.
- No parece un cambio estructural, sino un fix pequeno sobre una funcionalidad ya agregada.

### 3. 2026-03-10 - `8591970`
`feat: contenido de afinidad y clases para Tonaltlan`

Este fue el cambio fuerte mas reciente a nivel funcional.

Se agrego o expandio:

- Un test de afinidad completo en `app/afinidad/page.tsx`.
- Nuevas clases jugables y contenido narrativo en `lib/data.ts`.
- Nuevas imagenes para personajes/clases:
  - `Brujo_Catemaco.jpg`
  - `Mitotiani.jpg`
  - `Otomi.jpg`
  - `Tlapali.jpg`
- Nuevas imagenes integradas a la galeria en `app/galeria/page.tsx`.
- Ajustes visuales/copy en `components/About.tsx` y `components/Hero.tsx`.

Detalle funcional del test de afinidad:

- El test corre del lado del cliente (`"use client"`).
- Tiene 20 preguntas.
- Cada respuesta suma puntajes a 7 afinidades raciales/energeticas:
  - `Ton`
  - `Tohkari`
  - `Hekari`
  - `Quinametzin`
  - `Loknaa`
  - `Hualik`
  - `Irzak`
- Al finalizar calcula una afinidad dominante y, si aplica, una secundaria.
- El resultado final muestra titulo, subtitulo y descripcion narrativa para la afinidad detectada.

Detalle funcional del contenido nuevo en clases:

En `lib/data.ts` se agregaron o enriquecieron entradas de clases con descripcion, rasgos y notas, incluyendo:

- `Brujo Catemaco`
- `Guerrero Otomi`
- `Mitotiani`
- `Tlapali`

Impacto:

- El sitio paso de ser solo una landing/preview visual a tener mas contenido de mundo y una experiencia interactiva clara en `/preview/afinidad`.
- Se fortalecio el compendio con material mas cercano a contenido real del universo Tonaltlan.

### 4. 2026-03-10 - `74e7bc7`
`Merge branch 'website-design-inspiration'`

Este merge integro en `main` el trabajo anterior de afinidad, clases, galeria e imagenes.

Impacto:

- Lo importante no es el merge en si, sino que desde ese punto esos cambios quedaron consolidados en la rama principal.

### 5. 2026-02-18 - `156311a`
`fix: update image paths to /preview/images for basePath compatibility`

Se actualizaron rutas de imagen en varios componentes para que apunten a `/preview/images/...`.

Archivos tocados segun el commit:

- `components/Hero.tsx`
- `components/Navbar.tsx`
- `components/Footer.tsx`
- `components/About.tsx`
- `app/galeria/page.tsx`

Impacto:

- Este cambio es el que hace que las imagenes carguen bien cuando la app vive bajo `/preview`.
- Sin este ajuste, una parte del sitio podia verse rota en GitHub Pages aunque funcionara distinto en local.

### 6. 2026-02-18 - `193e789`
`feat: deploy legacy root and /preview Next export`

Aqui se definio la estrategia actual de despliegue.

Se agrego:

- `index.html` para conservar la landing legacy en la raiz.
- `CNAME`.
- El workflow `.github/workflows/pages.yml`.
- Configuracion de export estatico y `basePath` en `next.config.mjs`.
- Assets raiz de la landing vieja.

Impacto:

- El dominio puede seguir mostrando la landing tradicional en `/`.
- La nueva experiencia construida en Next puede convivir en `/preview` sin reemplazar lo anterior.

### 7. 2026-02-18 - `0ed2411`
`Merge pull request #1 from Installation-00-Dev/website-design-inspiration`

Este cambio introdujo la base de la app Next actual:

- Estructura `app/` completa.
- Paginas de compendio y detalle.
- Componentes reutilizables.
- `lib/data.ts` con contenido base.
- Imagenes dentro de `public/images`.
- Tailwind, TypeScript y configuracion inicial de la app.

Impacto:

- A partir de aqui nacio la version moderna del sitio que hoy se publica dentro de `/preview`.

## Resumen ejecutivo

Si quieres recordar rapido que paso, la historia del proyecto hoy se entiende asi:

1. Primero existia la landing vieja en raiz.
2. Luego se monto una app nueva en Next.js y se decidio publicarla dentro de `/preview`.
3. Despues se corrigieron rutas de imagen para que ese `basePath` funcionara bien.
4. Mas recientemente se agrego contenido real de mundo: el test de afinidad, nuevas clases y mas material visual.
5. Al final se limpiaron del repo los `.txt` auxiliares usados durante ese trabajo.

## Archivos clave para recordar

- `next.config.mjs`: define export estatico y `basePath: "/preview"`.
- `.github/workflows/pages.yml`: arma `dist/` con landing raiz + app Next en `/preview`.
- `app/page.tsx`: home que se ve en `/preview`.
- `app/afinidad/page.tsx`: test interactivo de afinidad.
- `lib/data.ts`: compendio y contenido base del mundo.
- `app/galeria/page.tsx`: galeria actualizada con arte nuevo.
