#!/usr/bin/env node
/**
 * Prueba la logica de la Danza Tonal (lib/danza-core.ts) con miles de partidas al azar:
 *
 *     node scripts/probar-danza.mjs     (tambien corre con `pnpm verificar`)
 *
 * - La danza empieza con un paso y cada ronda suma exactamente uno.
 * - Los glifos nuevos llegan en su ronda y son el paso nuevo; nunca sale un glifo dormido.
 * - Nunca el mismo glifo tres veces seguidas.
 * - El ritmo nunca pasa de 2.5 destellos por segundo (WCAG 2.3.1 pide menos de 3).
 * - Jugar bien completa rondas; un error termina con el puntaje correcto.
 * - Los textos del juego existen en los tres idiomas con los mismos campos.
 * Termina con error si algo falla. Usa el TypeScript instalado en node_modules.
 */
import { createRequire } from "node:module";
import { mkdtempSync, readFileSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const raiz = join(dirname(fileURLToPath(import.meta.url)), "..");
const require = createRequire(import.meta.url);
const ts = require(join(raiz, "node_modules", "typescript"));

const tmp = mkdtempSync(join(tmpdir(), "danza-"));
for (const archivo of ["danza-core.ts", "i18n.ts"]) {
  const fuente = readFileSync(join(raiz, "lib", archivo), "utf8");
  const { outputText } = ts.transpileModule(fuente, {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 },
  });
  writeFileSync(join(tmp, archivo.replace(/\.ts$/, ".js")), outputText);
}
const D = require(join(tmp, "danza-core.js"));
const { t, LANGS } = require(join(tmp, "i18n.js"));

let fallas = 0;
function revisar(condicion, mensaje) {
  if (!condicion) {
    fallas++;
    console.log(`FALLA  ${mensaje}`);
  }
}

// Azar repetible para que la prueba de siempre lo mismo.
function azarConSemilla(semilla) {
  let s = semilla >>> 0;
  return () => {
    s = (s + 0x6d2b79f5) >>> 0;
    let x = Math.imul(s ^ (s >>> 15), 1 | s);
    x = (x + Math.imul(x ^ (x >>> 7), 61 | x)) ^ x;
    return ((x ^ (x >>> 14)) >>> 0) / 4294967296;
  };
}

// 1) Glifos y desbloqueos
revisar(D.GLIFOS.length === 7 && new Set(D.GLIFOS).size === 7, "hay siete glifos distintos");
revisar(D.GLIFOS.every((g) => typeof D.DEIDAD_DE_GLIFO[g] === "string"), "cada glifo tiene su deidad");
revisar(D.glifosActivos(1).length === 4, "la danza empieza con 4 glifos");
revisar(D.glifosActivos(5).length === 5 && D.glifosActivos(8).length === 6 && D.glifosActivos(11).length === 7, "se suman glifos en las rondas 5, 8 y 11");
revisar(D.glifosActivos(40).length === 7, "nunca hay mas de 7 glifos");
revisar(D.capaFigura(1) === 0 && D.capaFigura(5) === 1 && D.capaFigura(11) === 2, "la figura del Tonal despierta por capas");

// 2) Ritmo: por debajo de 3 destellos por segundo en cualquier ronda
for (let ronda = 1; ronda <= 60; ronda++) {
  const { encendido, apagado } = D.ritmo(ronda);
  const porSegundo = 1000 / (encendido + apagado);
  revisar(porSegundo <= 2.5, `ronda ${ronda}: ${porSegundo.toFixed(2)} destellos por segundo`);
  if (ronda > 1) revisar(encendido <= D.ritmo(ronda - 1).encendido, `ronda ${ronda}: el ritmo no se vuelve mas lento`);
}

// 3) Miles de partidas jugadas a la perfeccion hasta la ronda 30
const PARTIDAS = 4000;
let maximoSeguidos = 0;
for (let i = 0; i < PARTIDAS; i++) {
  const azar = azarConSemilla(i + 1);
  let partida = D.nuevaPartida(azar);
  revisar(partida.secuencia.length === 1 && partida.entrada === 0, "la primera ronda tiene un paso");
  for (let ronda = 1; ronda <= 30; ronda++) {
    revisar(partida.secuencia.length === ronda, `partida ${i}: la ronda ${ronda} tiene ${ronda} pasos`);
    const activos = D.glifosActivos(ronda);
    revisar(partida.secuencia.every((g) => activos.includes(g)), `partida ${i}: solo bailan glifos despiertos`);
    const nuevo = D.glifoNuevo(ronda);
    if (nuevo) revisar(partida.secuencia[ronda - 1] === nuevo, `partida ${i}: el glifo nuevo es el paso nuevo de la ronda ${ronda}`);
    // Repite la danza sin errores.
    for (let paso = 0; paso < partida.secuencia.length; paso++) {
      const { jugada, partida: siguiente } = D.jugar(partida, partida.secuencia[paso]);
      const esperada = paso === partida.secuencia.length - 1 ? "ronda" : "sigue";
      revisar(jugada === esperada, `partida ${i}, ronda ${ronda}, paso ${paso + 1}: ${jugada} en vez de ${esperada}`);
      partida = siguiente;
    }
    partida = D.siguienteRonda(partida, azar);
  }
  // Nunca tres iguales seguidos
  let seguidos = 1;
  for (let k = 1; k < partida.secuencia.length; k++) {
    seguidos = partida.secuencia[k] === partida.secuencia[k - 1] ? seguidos + 1 : 1;
    maximoSeguidos = Math.max(maximoSeguidos, seguidos);
  }
}
revisar(maximoSeguidos <= 2, `como mucho dos glifos iguales seguidos (hubo ${maximoSeguidos})`);

// 4) Errores y puntaje
{
  const azar = azarConSemilla(99);
  let partida = D.nuevaPartida(azar);
  const malo = D.GLIFOS.find((g) => g !== partida.secuencia[0]);
  const fallo = D.jugar(partida, malo);
  revisar(fallo.jugada === "error" && D.pasosLogrados(fallo.partida) === 0, "equivocarse en la primera ronda da 0 pasos");
  revisar(D.pasoEsperado(fallo.partida) === partida.secuencia[0], "se sabe que glifo tocaba");
  // Completa 6 rondas y se equivoca en la septima, en el tercer paso.
  for (let ronda = 1; ronda <= 6; ronda++) {
    for (const g of partida.secuencia) partida = D.jugar(partida, g).partida;
    partida = D.siguienteRonda(partida, azar);
  }
  partida = D.jugar(partida, partida.secuencia[0]).partida;
  partida = D.jugar(partida, partida.secuencia[1]).partida;
  const otro = D.GLIFOS.find((g) => g !== partida.secuencia[2]);
  const final = D.jugar(partida, otro);
  revisar(final.jugada === "error" && D.pasosLogrados(final.partida) === 6, "equivocarse en la ronda 7 da 6 pasos");
}

// 5) Textos del juego en los tres idiomas
const campos = (o) => Object.keys(o).sort().join(",");
const base = t("es").paginas.danza;
for (const lang of LANGS) {
  const d = t(lang).paginas.danza;
  revisar(campos(d) === campos(base), `los textos de la Danza en "${lang}" tienen los mismos campos que en español`);
  revisar(Object.values(d).every((v) => typeof v === "string" && v.trim().length > 0), `ningun texto vacio en "${lang}"`);
  revisar(d.nuevoGlifo.includes("{elemento}") && d.ronda.includes("{n}"), `marcadores {elemento} y {n} en "${lang}"`);
  revisar(d.faltan.includes("{pasos}") && d.retoTexto.includes("{pasos}"), `marcador {pasos} en "${lang}"`);
  revisar(typeof t(lang).paginas.juega.secciones.danza === "string" && t(lang).paginas.juega.danzaTexto.length > 0, `tarjeta de /juega en "${lang}"`);
}

if (fallas) {
  console.log(`\n${fallas} problema(s) en la Danza Tonal.`);
  process.exit(1);
}
console.log(`Danza Tonal en orden: ${PARTIDAS} partidas perfectas hasta la ronda 30, desbloqueos, ritmo y textos.`);
