#!/usr/bin/env node
/**
 * Prueba la logica de Dados de los Siete (lib/dados-core.ts):
 *
 *     node scripts/probar-dados.mjs     (tambien corre con `pnpm verificar`)
 *
 * - Azar sin sesgo de modulo: el tramo descartado (rejection sampling) es exacto para
 *   cada dado y una fuente de prueba confirma que esos valores se vuelven a pedir.
 * - Con crypto.getRandomValues real, cada cara sale pareja (prueba chi cuadrada muy holgada).
 * - d100 de mesa: decenas 00-90 + unidades 0-9, con 00 + 0 = 100; cubre 1-100 una vez cada uno.
 * - Ventaja y desventaja: solo con 1d20; el dado que cuenta, el descartado y el natural.
 * - Bandeja: 1d20 si esta vacia, limites, modificador, formula y desglose.
 * - Los textos del tirador existen en los tres idiomas con los mismos campos.
 * Termina con error si algo falla. Usa el TypeScript instalado en node_modules.
 */
import { cargarTs } from "./lib/cargar-ts.mjs";

const D = cargarTs("lib/dados-core.ts");
const { t, LANGS } = cargarTs("lib/i18n");

let fallas = 0;
function revisar(condicion, mensaje) {
  if (!condicion) {
    fallas++;
    console.log(`FALLA  ${mensaje}`);
  }
}

/** Fuente de prueba: entrega estos valores de 32 bits en orden y cuenta cuantos se pidieron. */
function fuenteFija(valores) {
  const fuente = (destino) => {
    for (let i = 0; i < destino.length; i++) {
      if (fuente.usados >= valores.length) throw new Error("se acabaron los valores de prueba");
      destino[i] = valores[fuente.usados++];
    }
    return destino;
  };
  fuente.usados = 0;
  return fuente;
}

const R32 = 2 ** 32;

// 1) Sin sesgo de modulo: para cada dado, el tramo aceptado es multiplo exacto de las caras
for (const tipo of D.DADOS) {
  const caras = tipo === "d100" ? 10 : D.CARAS[tipo]; // el d100 se tira con dos d10
  const limite = Math.floor(R32 / caras) * caras;
  revisar(limite % caras === 0 && limite <= R32 && R32 - limite < caras, `${tipo}: tramo aceptado exacto (${R32 - limite} valores descartados)`);
}
{
  // d6: 2^32 - 4 en adelante se descarta (4 valores); 7 -> (7 % 6) + 1 = 2
  const f = fuenteFija([R32 - 1, R32 - 4, 7]);
  revisar(D.enteroUniforme(6, f) === 2 && f.usados === 3, "d6: descarta el tramo incompleto y vuelve a pedir");
  const g = fuenteFija([R32 - 5]);
  revisar(D.enteroUniforme(6, g) === ((R32 - 5) % 6) + 1 && g.usados === 1, "d6: acepta el ultimo valor del tramo completo");
  // d4 y d8 dividen 2^32: nunca se descarta nada
  const h = fuenteFija([R32 - 1]);
  revisar(D.enteroUniforme(4, h) === 4 && h.usados === 1, "d4: 2^32 - 1 es valido (sin descarte)");
  let lanza = false;
  try {
    D.enteroUniforme(6, () => {
      throw new Error("x");
    });
  } catch {
    lanza = true;
  }
  revisar(lanza, "una fuente rota no se queda en un ciclo infinito");
}

// 2) Distribucion con crypto real: chi cuadrada con un umbral muy holgado (p = 1e-6)
function umbralChi(gl) {
  const z = 4.753; // cuantil normal para 1e-6
  return gl * (1 - 2 / (9 * gl) + z * Math.sqrt(2 / (9 * gl))) ** 3;
}
const cripto = D.azarCripto();
for (const tipo of D.DADOS) {
  const caras = D.CARAS[tipo];
  const tiradas = tipo === "d100" ? 400_000 : 120_000;
  const cuenta = new Array(caras + 1).fill(0);
  let fuera = 0;
  for (let i = 0; i < tiradas; i++) {
    const v = tipo === "d100" ? D.tirarD100(cripto).total : D.enteroUniforme(caras, cripto);
    if (!Number.isInteger(v) || v < 1 || v > caras) fuera++;
    else cuenta[v]++;
  }
  const esperado = tiradas / caras;
  const chi = cuenta.slice(1).reduce((suma, n) => suma + (n - esperado) ** 2 / esperado, 0);
  revisar(fuera === 0, `${tipo}: todos los valores entre 1 y ${caras}`);
  revisar(cuenta.slice(1).every((n) => n > 0), `${tipo}: salen todas las caras`);
  revisar(chi < umbralChi(caras - 1), `${tipo}: reparto parejo (chi² ${chi.toFixed(1)} < ${umbralChi(caras - 1).toFixed(1)})`);
}

// 3) d100 de mesa
{
  // enteroUniforme(10) devuelve (x % 10) + 1: x = 0 -> cara 1 -> decenas 00 / unidades 0
  const caso = (dec, uni) => D.tirarD100(fuenteFija([dec, uni]));
  const cero = caso(0, 0);
  revisar(cero.decenas === 0 && cero.unidades === 0 && cero.total === 100, "d100: 00 + 0 = 100");
  revisar(caso(9, 9).total === 99, "d100: 90 + 9 = 99");
  revisar(caso(0, 7).total === 7 && caso(5, 0).total === 50, "d100: 00 + 7 = 7 y 50 + 0 = 50");
  const vistos = new Set();
  for (let dec = 0; dec < 10; dec++) for (let uni = 0; uni < 10; uni++) vistos.add(caso(dec, uni).total);
  revisar(vistos.size === 100 && Math.min(...vistos) === 1 && Math.max(...vistos) === 100, "d100: las 100 combinaciones dan 1-100 una vez cada una");
  const r = D.tirar({ d100: 1 }, 0, "normal", fuenteFija([3, 0]));
  revisar(r.dados[0].decenas === 30 && r.dados[0].unidades === 0 && r.total === 30, "d100 en la bandeja: guarda las dos caras");
  revisar(D.carasD100(r.dados[0]).join("|") === "30|0" && D.carasD100({ tipo: "d100", valor: 100, decenas: 0, unidades: 0 }).join("|") === "00|0", "d100: caras '00'-'90' y '0'-'9'");
}

// 4) Ventaja y desventaja
{
  // valores x tales que (x % 20) + 1 da 5 y 17
  const cinco = 4, diecisiete = 16, veinte = 19, uno = 0;
  const v = D.tirar({}, 3, "ventaja", fuenteFija([cinco, diecisiete]));
  revisar(v.modo === "ventaja" && v.dados.length === 2 && v.total === 20, "ventaja: cuenta el mayor (17 + 3)");
  revisar(v.dados[0].descartado === true && !v.dados[1].descartado, "ventaja: el 5 queda descartado");
  const dv = D.tirar({ d20: 1 }, 0, "desventaja", fuenteFija([cinco, diecisiete]));
  revisar(dv.total === 5 && dv.dados[1].descartado === true, "desventaja: cuenta el menor");
  const empate = D.tirar({}, 0, "ventaja", fuenteFija([diecisiete, diecisiete]));
  revisar(empate.dados.filter((x) => x.descartado).length === 1 && empate.total === 17, "empate: un solo dado descartado");
  const critico = D.tirar({}, 0, "desventaja", fuenteFija([veinte, cinco]));
  revisar(critico.natural === null, "desventaja con 20 descartado: no es crítico");
  revisar(D.tirar({}, 0, "ventaja", fuenteFija([veinte, cinco])).natural === "critico", "ventaja con 20: crítico");
  revisar(D.tirar({}, 0, "normal", fuenteFija([uno])).natural === "pifia", "1d20 con 1: pifia");
  revisar(D.tirar({}, 5, "normal", fuenteFija([veinte])).natural === "critico", "el crítico no depende del modificador");
  // Con otros dados no hay ventaja ni naturales
  const mezcla = D.tirar({ d20: 1, d6: 1 }, 0, "ventaja", fuenteFija([veinte, 2]));
  revisar(mezcla.modo === "normal" && mezcla.dados.length === 2 && mezcla.natural === null, "1d20 + 1d6: sin ventaja y sin natural");
  revisar(D.modoValido({ d20: 2 }, "ventaja") === "normal", "2d20: sin ventaja");
  revisar(D.modoValido({}, "desventaja") === "desventaja" && D.esD20Solo({ d20: 1 }), "1d20 rápido: con ventaja o desventaja");
}

// 5) Bandeja, límites, fórmula y desglose
{
  revisar(D.bandejaEfectiva({}).d20 === 1 && D.formula({}, 0) === "1d20", "bandeja vacía = 1d20");
  revisar(D.formula({ d6: 2 }, 3) === "2d6 + 3", "fórmula 2d6 + 3");
  revisar(D.formula({}, -2) === "1d20 − 2", "fórmula 1d20 − 2 (signo menos)");
  revisar(D.formula({ d100: 1, d4: 1, d8: 2 }, 0) === "1d4 + 2d8 + 1d100", "fórmula en el orden de los dados");
  let b = {};
  for (let i = 0; i < 30; i++) b = D.agregarDado(b, "d6");
  revisar(b.d6 === D.MAX_POR_DADO, `máximo ${D.MAX_POR_DADO} dados de un tipo`);
  for (let i = 0; i < 30; i++) b = D.agregarDado(b, "d8");
  revisar(D.totalDados(b) === D.MAX_DADOS && !D.puedeAgregar(b, "d4"), `máximo ${D.MAX_DADOS} dados en total`);
  revisar(D.quitarDado({ d6: 1 }, "d6").d6 === undefined && D.quitarDado({}, "d6").d6 === undefined, "quitar el último dado lo saca de la bandeja");
  revisar(D.ajustarModificador(29, 5) === D.MODIFICADOR_MAX && D.ajustarModificador(-29, -5) === D.MODIFICADOR_MIN, "modificador con límites");
  const r = D.tirar({ d6: 2 }, 3, "normal", fuenteFija([3, 3]));
  revisar(r.total === 11 && D.detalle(r) === "4 + 4 + 3" && r.formula === "2d6 + 3", "2d6 + 3: total 11 y desglose 4 + 4 + 3");
  const varios = D.tirar({ d4: 1, d6: 1, d8: 1, d10: 1, d12: 1, d20: 1, d100: 1 }, 0, "normal", D.azarCripto());
  revisar(varios.dados.length === 7 && varios.dados.map((x) => x.tipo).join(",") === D.DADOS.join(","), "los siete dados en su orden");
}

// 6) Textos en los tres idiomas
const campos = (o) => Object.keys(o).sort().join(",");
const base = t("es").paginas.dados;
for (const lang of LANGS) {
  const d = t(lang).paginas.dados;
  revisar(campos(d) === campos(base), `los textos de los dados en "${lang}" tienen los mismos campos que en español`);
  revisar(Object.values(d).every((v) => typeof v === "string" && v.trim().length > 0), `ningún texto vacío en "${lang}"`);
  revisar(d.agregar.includes("{dado}") && d.quitar.includes("{dado}"), `marcador {dado} en "${lang}"`);
  revisar(typeof t(lang).paginas.juega.secciones.dados === "string" && t(lang).paginas.juega.dadosTexto.length > 0, `tarjeta de /juega en "${lang}"`);
}

if (fallas) {
  console.log(`\n${fallas} problema(s) en Dados de los Siete.`);
  process.exit(1);
}
console.log("Dados de los Siete en orden: azar sin sesgo, d100 de mesa, ventaja y desventaja, bandeja y textos.");
