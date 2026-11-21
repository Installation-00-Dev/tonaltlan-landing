#!/usr/bin/env node
/**
 * Simula el Test de Afinidad con el codigo real (lib/affinity-test*.ts) y muestra
 * que tan parejo sale cada especie. Correr despues de cambiar preguntas, opciones
 * o puntos:
 *
 *     node scripts/simular-afinidad.mjs
 *
 * - Ideal: 14.3 % por especie. Falla (codigo de salida 1) si alguna se aleja mas
 *   de 2 puntos en el modo normal o en el modo "Afinidad Aleatoria".
 * - Tambien revisa que los tres idiomas tengan las mismas preguntas y opciones, y
 *   que cada especie tenga sus 3 frases de lectura.
 * Usa el TypeScript instalado en node_modules (no necesita nada mas).
 */
import { createRequire } from "node:module";
import { mkdtempSync, readFileSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const raiz = join(dirname(fileURLToPath(import.meta.url)), "..");
const require = createRequire(import.meta.url);
const ts = require(join(raiz, "node_modules", "typescript"));

// Transpila los tres archivos del test a CommonJS en una carpeta temporal.
const tmp = mkdtempSync(join(tmpdir(), "afinidad-"));
for (const archivo of ["affinity-test.ts", "affinity-test.en.ts", "affinity-test.fr.ts"]) {
  const fuente = readFileSync(join(raiz, "lib", archivo), "utf8");
  const { outputText } = ts.transpileModule(fuente, {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 },
  });
  writeFileSync(join(tmp, archivo.replace(/\.ts$/, ".js")), outputText);
}
const T = require(join(tmp, "affinity-test.js"));

const N = 100_000;
const IDEAL = 100 / T.RACE_KEYS.length;
const TOLERANCIA = 2;
let errores = 0;

function tabla(titulo, cuenta, total) {
  console.log(`\n${titulo}`);
  for (const race of T.RACE_KEYS) {
    const pct = (100 * cuenta[race]) / total;
    const marca = Math.abs(pct - IDEAL) > TOLERANCIA ? "  <-- desbalanceada" : "";
    if (marca) errores++;
    console.log(`  ${race.padEnd(12)} ${pct.toFixed(1).padStart(5)} %  ${"█".repeat(Math.round(pct))}${marca}`);
  }
}

// 1) Respuestas al azar con el flujo real: preguntas de la sesion, puntos y desempate.
const preguntas = T.getQuestions("es");
const cuenta = Object.fromEntries(T.RACE_KEYS.map((r) => [r, 0]));
for (let i = 0; i < N; i++) {
  const sesion = T.prepareQuestionsForSession(preguntas);
  let puntos = T.createInitialScores();
  const respuestas = sesion.map((q) => {
    const opcion = q.options[Math.floor(Math.random() * q.options.length)];
    puntos = T.applyOptionPoints(puntos, opcion, 1);
    return opcion.id;
  });
  const resultado = T.calculateResults(puntos, "es", T.preferenciasVisuales(sesion, respuestas));
  cuenta[resultado.dominant.race]++;
}
tabla(`Respuestas al azar (${N.toLocaleString("es-MX")} pruebas, ${preguntas.length} preguntas):`, cuenta, N);

// 2) Modo "Afinidad Aleatoria".
const aleatoria = Object.fromEntries(T.RACE_KEYS.map((r) => [r, 0]));
for (let i = 0; i < N; i++) aleatoria[T.calculateResults(T.puntosAleatorios(), "es").dominant.race]++;
tabla("Modo Afinidad Aleatoria:", aleatoria, N);

// 3) Los tres idiomas deben tener la misma estructura.
const firma = (lang) =>
  T.getQuestions(lang)
    .map((q) => `${q.id}:${q.tipo}:${q.options.map((o) => `${o.id}=${JSON.stringify(o.points)}`).join(",")}`)
    .join("|");
for (const lang of ["en", "fr"]) {
  if (firma(lang) !== firma("es")) {
    console.log(`\nERROR: las preguntas en "${lang}" no coinciden con el español (ids, opciones o puntos).`);
    errores++;
  }
}
for (const lang of ["es", "en", "fr"]) {
  for (const race of T.RACE_KEYS) {
    const lectura = T.calculateResults({ ...T.createInitialScores(), [race]: 1 }, lang).dominant.narrative.lectura;
    if (!Array.isArray(lectura) || lectura.length !== 3) {
      console.log(`\nERROR: a ${race} (${lang}) le faltan frases de lectura.`);
      errores++;
    }
  }
}

// Palabras que hay que leer en una sesion.
const palabras = preguntas
  .map((q) => `${q.title} ${q.scenario} ${q.tipo === "texto" ? q.options.map((o) => o.text).join(" ") : ""}`)
  .join(" ")
  .split(/\s+/)
  .filter(Boolean).length;
console.log(`\nLectura por sesión: ~${palabras} palabras (${preguntas.filter((q) => q.tipo !== "texto").length} preguntas visuales).`);

if (errores) {
  console.log(`\n${errores} problema(s). Ajusta los puntos en lib/affinity-test.ts.`);
  process.exit(1);
}
console.log("\nTodo en orden.");
