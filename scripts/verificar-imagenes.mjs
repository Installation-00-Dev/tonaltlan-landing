#!/usr/bin/env node
/**
 * Revisa el sitio ya exportado (out/) despues de `pnpm build`:
 * - cada /images/... que aparece en el HTML existe en out/;
 * - no se usan .png, .jpg ni .jpeg, salvo las vistas previas al compartir (*_og.jpg).
 *
 *     node scripts/verificar-imagenes.mjs     (o `pnpm verificar`, que corre todo)
 *
 * Termina con error si encuentra algo, para no publicar un sitio con imagenes rotas.
 */
import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const raiz = join(dirname(fileURLToPath(import.meta.url)), "..");
const out = join(raiz, "out");

if (!existsSync(out)) {
  console.error("No existe out/: corre primero `pnpm build`.");
  process.exit(1);
}

function paginas(dir) {
  return readdirSync(dir).flatMap((nombre) => {
    const ruta = join(dir, nombre);
    if (statSync(ruta).isDirectory()) return nombre === "_next" ? [] : paginas(ruta);
    return nombre.endsWith(".html") ? [ruta] : [];
  });
}

// Rutas /images/... en atributos y en el payload de React (donde las comillas van escapadas).
const RUTA_IMAGEN = /\/images\/[^"'\s),\\]+/g;
const FORMATO_PROHIBIDO = /\.(png|jpe?g)$/i;

const faltan = new Map();
const prohibidas = new Map();
let total = 0;
const vistas = new Set();

for (const pagina of paginas(out)) {
  const html = readFileSync(pagina, "utf8");
  const relativa = pagina.slice(out.length);
  for (const ruta of new Set(html.match(RUTA_IMAGEN) ?? [])) {
    vistas.add(ruta);
    if (!existsSync(join(out, ruta))) faltan.set(ruta, relativa);
    if (FORMATO_PROHIBIDO.test(ruta) && !ruta.endsWith("_og.jpg")) prohibidas.set(ruta, relativa);
  }
  total++;
}

for (const [ruta, pagina] of faltan) console.error(`FALTA      ${ruta}  (en ${pagina})`);
for (const [ruta, pagina] of prohibidas) console.error(`NO .webp   ${ruta}  (en ${pagina})`);

if (faltan.size || prohibidas.size) {
  console.error(`\n${faltan.size} imagen(es) faltante(s) y ${prohibidas.size} en formato no permitido.`);
  process.exit(1);
}
console.log(`Imagenes en orden: ${vistas.size} rutas distintas en ${total} paginas.`);
