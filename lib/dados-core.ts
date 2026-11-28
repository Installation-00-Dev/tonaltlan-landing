/* ============================================================
   DADOS DE LOS SIETE — lógica del tirador (sin textos ni React).
   El set convencional de rol (d4, d6, d8, d10, d12, d20 y d100), cada
   dado con el color y el emblema de una deidad (decisión de diseño, no
   de lore). La usan el navegador (components/dados/DadosCliente.tsx) y
   la prueba scripts/probar-dados.mjs (corre con `pnpm verificar`).
   ============================================================ */

export const DADOS = ["d4", "d6", "d8", "d10", "d12", "d20", "d100"] as const;
export type TipoDado = (typeof DADOS)[number];

export const CARAS: Record<TipoDado, number> = { d4: 4, d6: 6, d8: 8, d10: 10, d12: 12, d20: 20, d100: 100 };

/** Color y emblema de cada dado: correspondencias clásicas de los sólidos con los elementos. */
export const DEIDAD_DE_DADO: Record<TipoDado, string> = {
  d4: "zilo", // fuego
  d6: "tzal", // tierra
  d8: "heka", // aire
  d10: "calti", // obscuridad
  d12: "tonatli", // luz
  d20: "lok", // agua
  d100: "tohui", // rayo
};

/** Límites de la bandeja: suficientes para cualquier conjuro y legibles en el celular. */
export const MAX_POR_DADO = 20;
export const MAX_DADOS = 24;
export const MODIFICADOR_MIN = -30;
export const MODIFICADOR_MAX = 30;

/** Cuántos dados de cada tipo lleva la tirada. Vacía = 1d20 (tirada rápida). */
export type Bandeja = Partial<Record<TipoDado, number>>;
export type Modo = "normal" | "ventaja" | "desventaja";

/** Fuente de azar: llena el arreglo con enteros de 32 bits (en el navegador, crypto.getRandomValues). */
export type FuenteAzar = (destino: Uint32Array) => Uint32Array;

export function azarCripto(): FuenteAzar {
  return (destino) => globalThis.crypto.getRandomValues(destino);
}

const RANGO_32 = 2 ** 32;
const INTENTOS_MAX = 1000;

/**
 * Entero uniforme entre 1 y `caras`, sin sesgo de módulo: se descartan los valores
 * de 32 bits que caen en el último tramo incompleto (rejection sampling) y se
 * vuelve a pedir. Con una fuente real casi nunca hay que repetir.
 */
export function enteroUniforme(caras: number, fuente: FuenteAzar): number {
  const limite = Math.floor(RANGO_32 / caras) * caras;
  const buffer = new Uint32Array(1);
  for (let intento = 0; intento < INTENTOS_MAX; intento++) {
    fuente(buffer);
    if (buffer[0] < limite) return (buffer[0] % caras) + 1;
  }
  throw new Error("La fuente de azar no entrega valores utilizables.");
}

/**
 * d100 como en la mesa: un dado de decenas (00–90) y uno de unidades (0–9).
 * 00 + 0 vale 100; cualquier otra combinación es su suma (1–99).
 */
export function tirarD100(fuente: FuenteAzar): { decenas: number; unidades: number; total: number } {
  const decenas = (enteroUniforme(10, fuente) - 1) * 10;
  const unidades = enteroUniforme(10, fuente) - 1;
  return { decenas, unidades, total: decenas === 0 && unidades === 0 ? 100 : decenas + unidades };
}

/** Lo que se tira de verdad: la bandeja vacía es la tirada rápida de 1d20. */
export function bandejaEfectiva(bandeja: Bandeja): Bandeja {
  return totalDados(bandeja) === 0 ? { d20: 1 } : bandeja;
}

export function totalDados(bandeja: Bandeja): number {
  return DADOS.reduce((suma, tipo) => suma + (bandeja[tipo] ?? 0), 0);
}

/** Ventaja y desventaja solo tienen sentido en una tirada de 1d20 (con o sin modificador). */
export function esD20Solo(bandeja: Bandeja): boolean {
  const efectiva = bandejaEfectiva(bandeja);
  return efectiva.d20 === 1 && totalDados(efectiva) === 1;
}

/** El modo que de verdad aplica: con otros dados en la bandeja siempre es "normal". */
export function modoValido(bandeja: Bandeja, modo: Modo): Modo {
  return esD20Solo(bandeja) ? modo : "normal";
}

export function puedeAgregar(bandeja: Bandeja, tipo: TipoDado): boolean {
  return (bandeja[tipo] ?? 0) < MAX_POR_DADO && totalDados(bandeja) < MAX_DADOS;
}

export function agregarDado(bandeja: Bandeja, tipo: TipoDado): Bandeja {
  return puedeAgregar(bandeja, tipo) ? { ...bandeja, [tipo]: (bandeja[tipo] ?? 0) + 1 } : bandeja;
}

export function quitarDado(bandeja: Bandeja, tipo: TipoDado): Bandeja {
  const cantidad = bandeja[tipo] ?? 0;
  if (cantidad <= 0) return bandeja;
  const nueva = { ...bandeja };
  if (cantidad === 1) delete nueva[tipo];
  else nueva[tipo] = cantidad - 1;
  return nueva;
}

export function ajustarModificador(modificador: number, cambio: number): number {
  return Math.min(MODIFICADOR_MAX, Math.max(MODIFICADOR_MIN, modificador + cambio));
}

/** "+ 3", "− 2" (signo menos tipográfico) o "" si es cero. */
export function textoModificador(modificador: number): string {
  if (modificador === 0) return "";
  return modificador > 0 ? `+ ${modificador}` : `− ${Math.abs(modificador)}`;
}

/** Notación de la tirada: "2d6 + 1d8 + 3", "1d20 − 1". Igual en todos los idiomas. */
export function formula(bandeja: Bandeja, modificador: number): string {
  const efectiva = bandejaEfectiva(bandeja);
  const terminos = DADOS.filter((tipo) => (efectiva[tipo] ?? 0) > 0).map((tipo) => `${efectiva[tipo]}${tipo}`);
  return [terminos.join(" + "), textoModificador(modificador)].filter(Boolean).join(" ");
}

export interface DadoTirado {
  tipo: TipoDado;
  valor: number;
  /** Solo d100: las caras de los dos dados (decenas 0–90 y unidades 0–9). */
  decenas?: number;
  unidades?: number;
  /** Ventaja o desventaja: el d20 que no cuenta. */
  descartado?: boolean;
}

export interface Resultado {
  bandeja: Bandeja;
  modificador: number;
  modo: Modo;
  formula: string;
  dados: DadoTirado[];
  total: number;
  /** 20 o 1 natural: solo en tiradas de 1d20 (con ventaja o desventaja, el dado que cuenta). */
  natural: "critico" | "pifia" | null;
}

/** Tira la bandeja (o el 1d20 rápido si está vacía) con su modificador y su modo. */
export function tirar(bandeja: Bandeja, modificador: number, modo: Modo, fuente: FuenteAzar): Resultado {
  const efectiva = bandejaEfectiva(bandeja);
  const modoReal = modoValido(bandeja, modo);
  const dados: DadoTirado[] = [];

  if (modoReal !== "normal") {
    const a = enteroUniforme(20, fuente);
    const b = enteroUniforme(20, fuente);
    const cuentaA = modoReal === "ventaja" ? a >= b : a <= b;
    dados.push({ tipo: "d20", valor: a, descartado: !cuentaA }, { tipo: "d20", valor: b, descartado: cuentaA });
  } else {
    for (const tipo of DADOS) {
      for (let i = 0; i < (efectiva[tipo] ?? 0); i++) {
        if (tipo === "d100") {
          const { decenas, unidades, total } = tirarD100(fuente);
          dados.push({ tipo, valor: total, decenas, unidades });
        } else {
          dados.push({ tipo, valor: enteroUniforme(CARAS[tipo], fuente) });
        }
      }
    }
  }

  const cuentan = dados.filter((dado) => !dado.descartado);
  const natural =
    esD20Solo(bandeja) && cuentan.length === 1 ? (cuentan[0].valor === 20 ? "critico" : cuentan[0].valor === 1 ? "pifia" : null) : null;
  return {
    bandeja: { ...efectiva },
    modificador,
    modo: modoReal,
    formula: formula(bandeja, modificador),
    dados,
    total: cuentan.reduce((suma, dado) => suma + dado.valor, 0) + modificador,
    natural,
  };
}

/** Desglose para mostrar bajo el total: "4 + 4 + 3" (solo los dados que cuentan). */
export function detalle(resultado: Resultado): string {
  const valores = resultado.dados.filter((dado) => !dado.descartado).map((dado) => String(dado.valor));
  return [valores.join(" + "), textoModificador(resultado.modificador)].filter(Boolean).join(" ");
}

/** Lo que muestra cada cara del d100: "00"–"90" y "0"–"9". */
export function carasD100(dado: DadoTirado): [string, string] {
  return [String(dado.decenas ?? 0).padStart(2, "0"), String(dado.unidades ?? 0)];
}
