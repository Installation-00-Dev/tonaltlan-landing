/**
 * Carga módulos TypeScript del sitio desde los scripts de prueba, sin compilar el sitio:
 * los transpila al vuelo con el TypeScript de node_modules (solo quita los tipos) y
 * entiende el alias `@/` de tsconfig.json y las carpetas con index.ts (lib/i18n/).
 *
 *     import { cargarTs } from "./lib/cargar-ts.mjs";
 *     const { t, LANGS } = cargarTs("lib/i18n");
 *     const D = cargarTs("lib/danza-core.ts");
 *
 * Solo para módulos sin JSX ni dependencias del navegador (lógica pura y textos).
 */
import Module, { createRequire } from "node:module";
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

/** Raíz del repositorio. */
export const raiz = join(dirname(fileURLToPath(import.meta.url)), "..", "..");

const require = createRequire(import.meta.url);
const ts = require(join(raiz, "node_modules", "typescript"));
let preparado = false;

function preparar() {
  if (preparado) return;
  preparado = true;

  // "@/lib/x" -> <raíz>/lib/x, como en tsconfig.json.
  const resolver = Module._resolveFilename;
  Module._resolveFilename = function (pedido, ...resto) {
    return resolver.call(this, pedido.startsWith("@/") ? join(raiz, pedido.slice(2)) : pedido, ...resto);
  };

  // .ts: se quitan los tipos y se ejecuta como CommonJS (también resuelve "./x" -> x.ts).
  Module._extensions[".ts"] = (modulo, archivo) => {
    const { outputText } = ts.transpileModule(readFileSync(archivo, "utf8"), {
      fileName: archivo,
      compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 },
    });
    modulo._compile(outputText, archivo);
  };
}

/** Módulo del sitio por su ruta desde la raíz ("lib/danza-core.ts" o la carpeta "lib/i18n"). */
export function cargarTs(ruta) {
  preparar();
  return require(join(raiz, ruta));
}
