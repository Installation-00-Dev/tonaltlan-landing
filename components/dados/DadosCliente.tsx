"use client";

import { useEffect, useRef, useState } from "react";
import Dado, { type EstadoDado, type FormaDado } from "@/components/dados/Dado";
import { prefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import {
  CARAS,
  DADOS,
  agregarDado,
  ajustarModificador,
  azarCripto,
  bandejaEfectiva,
  carasD100,
  detalle,
  esD20Solo,
  formula,
  puedeAgregar,
  quitarDado,
  tirar,
  totalDados,
  type Bandeja,
  type DadoTirado,
  type Modo,
  type Resultado,
  type TipoDado,
} from "@/lib/dados-core";
import type { Diccionario } from "@/lib/i18n";

/** Lo que el servidor manda de cada dado: el color y el emblema de su deidad. */
export interface InfoDado {
  tipo: TipoDado;
  color: string;
  emblema: string;
}

type Textos = Diccionario["paginas"]["dados"];

interface Tirada extends Resultado {
  id: number;
}

const CLAVE_HISTORIAL = "tonaltlan-dados-historial";
const MAX_HISTORIAL = 10;
/** El dado rueda este tiempo antes de mostrar su cara (sin reducir movimiento). */
const DURACION_GIRO = 520;
const PASO_GIRO = 70;
/** Un segundo toque antes de esto no vuelve a tirar (dedo que rebota en la mesa). */
const ESPERA_DOBLE_TOQUE = 350;
const MODOS: Modo[] = ["normal", "ventaja", "desventaja"];

const forma = (tipo: TipoDado): FormaDado => (tipo === "d100" ? "d10" : tipo);

/** Cara que se ve: el d100 son dos dados ("70" y "4"). */
function caras(dado: DadoTirado): string[] {
  return dado.tipo === "d100" ? carasD100(dado) : [String(dado.valor)];
}

/** Caras al azar mientras el dado rueda (solo se ven; el resultado ya salió de crypto). */
function carasEnGiro(tipo: TipoDado): string[] {
  if (tipo === "d100") return [String(Math.floor(Math.random() * 10) * 10).padStart(2, "0"), String(Math.floor(Math.random() * 10))];
  return [String(1 + Math.floor(Math.random() * CARAS[tipo]))];
}

function textoMod(modificador: number) {
  return modificador > 0 ? `+${modificador}` : modificador < 0 ? `−${Math.abs(modificador)}` : "0";
}

function leerHistorial(): Tirada[] {
  try {
    const guardado = JSON.parse(localStorage.getItem(CLAVE_HISTORIAL) ?? "[]");
    return Array.isArray(guardado)
      ? guardado.filter((t) => t && typeof t.total === "number" && Array.isArray(t.dados) && typeof t.formula === "string").slice(0, MAX_HISTORIAL)
      : [];
  } catch {
    return [];
  }
}

function guardarHistorial(historial: Tirada[]) {
  try {
    if (historial.length) localStorage.setItem(CLAVE_HISTORIAL, JSON.stringify(historial));
    else localStorage.removeItem(CLAVE_HISTORIAL);
  } catch {
    // Sin almacenamiento: el historial dura lo que dure la página.
  }
}

/** Tamaño de cada dado en el resultado según cuántos hay (el d100 cuenta como dos). */
function tamano(cantidad: number) {
  if (cantidad <= 1) return "w-28";
  if (cantidad === 2) return "w-24";
  if (cantidad <= 4) return "w-20";
  if (cantidad <= 8) return "w-16";
  return "w-12";
}

/**
 * Dados de los Siete: bandeja combinable (2d6 + 3), ventaja y desventaja para 1d20,
 * historial y pantalla encendida. Abre listo para tirar 1d20 de un toque.
 * La lógica pura está en lib/dados-core.ts; aquí van la pantalla y el giro.
 */
export default function DadosCliente({ dados: info, textos: d }: { dados: InfoDado[]; textos: Textos }) {
  const [bandeja, setBandeja] = useState<Bandeja>({});
  const [modificador, setModificador] = useState(0);
  const [modo, setModo] = useState<Modo>("normal");
  const [ultima, setUltima] = useState<Tirada | null>(null);
  const [girando, setGirando] = useState(false);
  const [carasGiro, setCarasGiro] = useState<string[][] | null>(null);
  const [historial, setHistorial] = useState<Tirada[]>([]);
  const [anuncio, setAnuncio] = useState("");
  const [conWakeLock, setConWakeLock] = useState(false);
  const [pantalla, setPantalla] = useState(false);

  const historialRef = useRef<Tirada[]>([]);
  const girandoRef = useRef(false);
  const ultimoLanceRef = useRef(0);
  const contadorRef = useRef(0);
  const temporizadores = useRef<number[]>([]);
  const pantallaRef = useRef(false);
  const sentinela = useRef<WakeLockSentinel | null>(null);

  const porTipo = Object.fromEntries(info.map((x) => [x.tipo, x])) as Record<TipoDado, InfoDado>;
  const efectiva = bandejaEfectiva(bandeja);
  const soloD20 = esD20Solo(bandeja);
  const modoActual = soloD20 ? modo : "normal";
  const vacia = totalDados(bandeja) === 0;
  const nombreModo = (m: Modo) => (m === "ventaja" ? d.ventaja : m === "desventaja" ? d.desventaja : d.normal);

  function limpiarTemporizadores() {
    temporizadores.current.forEach((id) => {
      window.clearTimeout(id);
      window.clearInterval(id);
    });
    temporizadores.current = [];
  }

  /** Con otros dados en la bandeja, la ventaja vuelve a "normal" (y se queda así). */
  function cambiarBandeja(nueva: Bandeja) {
    setBandeja(nueva);
    if (!esD20Solo(nueva)) setModo("normal");
  }

  function limpiar() {
    cambiarBandeja({});
    setModificador(0);
    setModo("normal");
  }

  function terminar(tirada: Tirada) {
    girandoRef.current = false;
    setGirando(false);
    setCarasGiro(null);
    setUltima(tirada);
    const nuevo = [tirada, ...historialRef.current].slice(0, MAX_HISTORIAL);
    historialRef.current = nuevo;
    setHistorial(nuevo);
    guardarHistorial(nuevo);
    const conModo = tirada.modo === "normal" ? tirada.formula : `${tirada.formula} (${nombreModo(tirada.modo)})`;
    const natural = tirada.natural === "critico" ? `. ${d.critico}` : tirada.natural === "pifia" ? `. ${d.pifia}` : "";
    setAnuncio(`${conModo}: ${tirada.total}${natural}`);
  }

  function lanzar(config?: { bandeja: Bandeja; modificador: number; modo: Modo }) {
    // Evita una segunda tirada por un doble toque (también sin animación).
    const ahora = performance.now();
    if (girandoRef.current || ahora - ultimoLanceRef.current < ESPERA_DOBLE_TOQUE) return;
    ultimoLanceRef.current = ahora;
    const resultado = tirar(config?.bandeja ?? bandeja, config?.modificador ?? modificador, config?.modo ?? modoActual, azarCripto());
    const tirada: Tirada = { ...resultado, id: Date.now() * 100 + (contadorRef.current++ % 100) };
    limpiarTemporizadores();
    setAnuncio("");
    if (prefersReducedMotion()) {
      terminar(tirada);
      return;
    }
    girandoRef.current = true;
    setGirando(true);
    setUltima(tirada);
    const sortear = () => setCarasGiro(tirada.dados.map((dado) => carasEnGiro(dado.tipo)));
    sortear();
    temporizadores.current.push(window.setInterval(sortear, PASO_GIRO));
    temporizadores.current.push(window.setTimeout(() => {
      limpiarTemporizadores();
      terminar(tirada);
    }, DURACION_GIRO));
  }

  function repetir(tirada: Tirada) {
    const config = { bandeja: { ...tirada.bandeja }, modificador: tirada.modificador, modo: tirada.modo };
    setBandeja(config.bandeja.d20 === 1 && totalDados(config.bandeja) === 1 ? {} : config.bandeja);
    setModificador(config.modificador);
    setModo(config.modo);
    lanzar(config);
  }

  function borrarHistorial() {
    historialRef.current = [];
    setHistorial([]);
    guardarHistorial([]);
  }

  async function pedirPantalla() {
    try {
      const nueva = await navigator.wakeLock.request("screen");
      sentinela.current = nueva;
      nueva.addEventListener("release", () => {
        if (sentinela.current === nueva) sentinela.current = null;
      });
    } catch {
      // El sistema no lo permitió (batería baja, permisos): el interruptor se apaga.
      pantallaRef.current = false;
      setPantalla(false);
    }
  }

  async function alternarPantalla() {
    if (pantallaRef.current) {
      pantallaRef.current = false;
      setPantalla(false);
      const actual = sentinela.current;
      sentinela.current = null;
      await actual?.release().catch(() => undefined);
      return;
    }
    pantallaRef.current = true;
    setPantalla(true);
    await pedirPantalla();
  }

  // Historial guardado y soporte de Wake Lock (solo existen en el navegador).
  useEffect(() => {
    const guardado = leerHistorial();
    historialRef.current = guardado;
    setHistorial(guardado);
    setConWakeLock("wakeLock" in navigator);
    return () => limpiarTemporizadores();
  }, []);

  // El sistema suelta la pantalla encendida al cambiar de pestaña: al volver se pide otra vez.
  useEffect(() => {
    const alVolver = () => {
      if (document.visibilityState === "visible" && pantallaRef.current && !sentinela.current) void pedirPantalla();
    };
    document.addEventListener("visibilitychange", alVolver);
    return () => {
      document.removeEventListener("visibilitychange", alVolver);
      void sentinela.current?.release().catch(() => undefined);
    };
  }, []);

  const cantidad = ultima ? ultima.dados.reduce((suma, dado) => suma + (dado.tipo === "d100" ? 2 : 1), 0) : 1;
  const formulaActual = formula(bandeja, modificador);
  const etiquetaModo = modoActual === "normal" ? "" : ` · ${nombreModo(modoActual)}`;

  function estadoDe(dado: DadoTirado): EstadoDado {
    if (girando || !ultima) return "normal";
    if (dado.descartado) return "descartado";
    if (ultima.natural && dado.tipo === "d20") return ultima.natural;
    return "normal";
  }

  return (
    // En celular: resultado, controles e historial, en ese orden. En escritorio: los controles
    // a la izquierda y el resultado con el historial a la derecha (todo a la vista sin bajar).
    <div className="grid gap-5 lg:grid-cols-[minmax(0,26rem)_minmax(0,1fr)] lg:items-start lg:gap-x-16 lg:gap-y-8">
      <div className="lg:col-start-2 lg:row-start-1">
        {/* Resultado */}
        <div className="relative flex min-h-[14rem] flex-col items-center justify-center overflow-hidden rounded-3xl bg-selva-800/40 px-4 py-6 ring-1 ring-selva-700/70 sm:min-h-[17rem]">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(closest-side,rgba(74,222,128,0.08),transparent)]" aria-hidden="true" />
          {ultima ? (
            <>
              <div key={ultima.id} className={`relative flex flex-wrap items-end justify-center gap-3 ${girando ? "" : "aparece"}`}>
                {ultima.dados.map((dado, i) => {
                  const datos = porTipo[dado.tipo];
                  const visibles = girando && carasGiro ? carasGiro[i] : caras(dado);
                  const estado = estadoDe(dado);
                  const animacion = girando ? "dado-girando" : estado === "critico" ? "dado-critico" : estado === "pifia" ? "dado-pifia" : "";
                  return (
                    <div
                      key={i}
                      className={`flex items-end gap-1 ${animacion} ${estado === "descartado" ? "dado-descartado" : ""}`}
                    >
                      {visibles.map((cara, j) => (
                        <Dado key={j} forma={forma(dado.tipo)} color={datos.color} texto={cara} estado={estado} className={`${tamano(cantidad)} h-auto`} />
                      ))}
                      {estado === "descartado" ? <span className="sr-only">{d.descartado}</span> : null}
                    </div>
                  );
                })}
              </div>
              <div className="relative mt-4 flex min-h-[6.5rem] flex-col items-center text-center">
                {girando ? null : (
                  <>
                    <p className="aparece text-6xl font-bold leading-none text-jade-400 tabular-nums">{ultima.total}</p>
                    {ultima.natural ? (
                      <p className={`aparece mt-2 font-display text-2xl ${ultima.natural === "critico" ? "text-oro-300" : "text-red-300"}`}>
                        {ultima.natural === "critico" ? d.critico : d.pifia}
                      </p>
                    ) : null}
                    <p className="mt-2 text-sm text-selva-300">
                      {ultima.formula}
                      {ultima.modo === "normal" ? "" : ` · ${nombreModo(ultima.modo)}`}
                    </p>
                    {ultima.dados.length > 1 || ultima.modificador !== 0 ? (
                      <p className="mt-0.5 text-xs text-selva-400 tabular-nums">{detalle(ultima)}</p>
                    ) : null}
                  </>
                )}
              </div>
            </>
          ) : (
            // Antes de la primera tirada: la bandeja que se va a tirar.
            <div className="relative flex flex-wrap items-end justify-center gap-3 opacity-80">
              {DADOS.filter((tipo) => (efectiva[tipo] ?? 0) > 0).map((tipo) => (
                <Dado
                  key={tipo}
                  forma={forma(tipo)}
                  color={porTipo[tipo].color}
                  texto={`${(efectiva[tipo] ?? 0) > 1 ? `${efectiva[tipo]}` : ""}${tipo}`}
                  estado="vista"
                  doble={tipo === "d100"}
                  className={`${tamano(totalDados(efectiva) > 1 ? 3 : 1)} h-auto`}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="lg:col-start-1 lg:row-span-2 lg:row-start-1">
        {/* Tu tirada: lo que hay en la bandeja */}
        <div className="flex min-h-[2.75rem] items-center justify-between gap-3">
          <ul aria-label={d.tuTirada} className="flex flex-wrap items-center gap-2">
            {vacia ? (
              <li className="rounded-full border border-dashed border-selva-600 px-3 py-1.5 text-sm font-semibold text-selva-400">1d20</li>
            ) : (
              DADOS.filter((tipo) => (bandeja[tipo] ?? 0) > 0).map((tipo) => (
                <li
                  key={tipo}
                  className="flex items-center gap-1 rounded-full bg-selva-800 py-1 pl-3 pr-1 text-sm font-semibold text-selva-100 ring-1"
                  style={{ ["--tw-ring-color" as string]: `${porTipo[tipo].color}66` }}
                >
                  <span className="tabular-nums">
                    {bandeja[tipo]}
                    {tipo}
                  </span>
                  <button
                    type="button"
                    onClick={() => cambiarBandeja(quitarDado(bandeja, tipo))}
                    aria-label={d.quitar.replace("{dado}", tipo)}
                    className="flex h-8 w-8 touch-manipulation items-center justify-center rounded-full text-selva-300 transition-colors hover:bg-selva-700 hover:text-selva-100"
                  >
                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path strokeLinecap="round" strokeWidth={2.5} d="M6 12h12" />
                    </svg>
                  </button>
                </li>
              ))
            )}
          </ul>
          {!vacia || modificador !== 0 || modo !== "normal" ? (
            <button
              type="button"
              onClick={limpiar}
              className="shrink-0 touch-manipulation rounded-full px-3 py-2 text-sm font-medium text-selva-300 transition-colors hover:text-jade-200"
            >
              {d.limpiar}
            </button>
          ) : null}
        </div>

        {/* Los siete dados */}
        <div role="group" aria-label={d.dados} className="mt-3 grid grid-cols-4 gap-2.5">
          {info.map(({ tipo, color, emblema }) => {
            const cuantos = bandeja[tipo] ?? 0;
            const disponible = puedeAgregar(bandeja, tipo);
            return (
              <button
                key={tipo}
                type="button"
                onClick={() => cambiarBandeja(agregarDado(bandeja, tipo))}
                disabled={!disponible}
                aria-label={d.agregar.replace("{dado}", tipo)}
                className="relative flex touch-manipulation flex-col items-center gap-1 rounded-2xl bg-selva-800/60 px-1 pb-2 pt-2.5 ring-1 ring-selva-700 transition duration-150 hover:bg-selva-800 hover:ring-selva-600 disabled:opacity-40 motion-safe:active:scale-[0.97]"
              >
                <Dado forma={forma(tipo)} color={color} emblema={emblema} doble={tipo === "d100"} className="h-12 w-12" />
                <span className="text-sm font-semibold text-selva-100">{tipo}</span>
                {cuantos > 0 ? (
                  <span
                    className="absolute right-1.5 top-1.5 min-w-[1.5rem] rounded-full bg-oro-400 px-1.5 text-center text-xs font-bold leading-6 text-selva-950 tabular-nums"
                    aria-hidden="true"
                  >
                    ×{cuantos}
                  </span>
                ) : null}
              </button>
            );
          })}
        </div>

        {/* Modificador y ventaja */}
        <div className="mt-5 flex flex-col gap-4">
          <div role="group" aria-label={d.modificador} className="flex items-center justify-between gap-3">
            <span className="text-sm font-medium text-selva-300">{d.modificador}</span>
            <div className="flex items-center gap-1 rounded-full bg-selva-800/60 p-1 ring-1 ring-selva-700">
              <button
                type="button"
                onClick={() => setModificador((m) => ajustarModificador(m, -1))}
                aria-label={d.restar}
                className="flex h-10 w-10 touch-manipulation items-center justify-center rounded-full text-selva-100 transition-colors hover:bg-selva-700 motion-safe:active:scale-[0.97]"
              >
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeWidth={2.5} d="M6 12h12" />
                </svg>
              </button>
              <output aria-live="off" className="min-w-[3rem] text-center text-lg font-semibold tabular-nums text-selva-100">
                {textoMod(modificador)}
              </output>
              <button
                type="button"
                onClick={() => setModificador((m) => ajustarModificador(m, 1))}
                aria-label={d.sumar}
                className="flex h-10 w-10 touch-manipulation items-center justify-center rounded-full text-selva-100 transition-colors hover:bg-selva-700 motion-safe:active:scale-[0.97]"
              >
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeWidth={2.5} d="M12 6v12M6 12h12" />
                </svg>
              </button>
            </div>
          </div>

          <div>
            <div
              role="radiogroup"
              aria-label={`${d.ventaja} / ${d.desventaja}`}
              aria-describedby={soloD20 ? undefined : "dados-solo-d20"}
              className={`flex gap-1 rounded-full bg-selva-800/60 p-1 ring-1 ring-selva-700 ${soloD20 ? "" : "opacity-50"}`}
            >
              {MODOS.map((m) => {
                const activo = modoActual === m;
                return (
                  <button
                    key={m}
                    type="button"
                    role="radio"
                    aria-checked={activo}
                    disabled={!soloD20}
                    onClick={() => setModo(m)}
                    className={`min-h-[40px] flex-auto touch-manipulation whitespace-nowrap rounded-full px-2 text-[13px] font-semibold transition-colors min-[360px]:px-2.5 min-[360px]:text-sm ${
                      activo ? "bg-selva-700 text-jade-200" : "text-selva-300 hover:text-selva-100"
                    }`}
                  >
                    {nombreModo(m)}
                  </button>
                );
              })}
            </div>
            {soloD20 ? null : (
              <p id="dados-solo-d20" className="mt-1.5 text-center text-xs text-selva-400">
                {d.soloD20}
              </p>
            )}
          </div>
        </div>

        {/* Tirar: siempre a la mano del pulgar */}
        <div className="sticky bottom-4 z-10 mt-6">
          <button
            type="button"
            onClick={() => lanzar()}
            aria-disabled={girando || undefined}
            className="flex min-h-[56px] w-full touch-manipulation items-center justify-center gap-2 rounded-full bg-oro-400 px-6 py-3 text-lg font-semibold text-selva-950 shadow-[0_8px_24px_rgba(6,18,16,0.6)] transition duration-150 hover:bg-oro-300 motion-safe:active:scale-[0.97]"
          >
            {d.tirar}
            <span className="font-normal tabular-nums">
              {formulaActual}
              {etiquetaModo}
            </span>
          </button>
        </div>

        {conWakeLock ? (
          <button
            type="button"
            role="switch"
            aria-checked={pantalla}
            onClick={() => void alternarPantalla()}
            className="mt-5 flex w-full touch-manipulation items-center justify-between gap-3 rounded-2xl px-1 py-2 text-left text-sm text-selva-300"
          >
            {d.pantalla}
            <span className={`relative h-7 w-12 shrink-0 rounded-full transition-colors ${pantalla ? "bg-jade-500" : "bg-selva-700"}`} aria-hidden="true">
              <span
                className={`absolute top-1 h-5 w-5 rounded-full bg-selva-100 transition-[left] duration-200 ${pantalla ? "left-6" : "left-1"}`}
              />
            </span>
          </button>
        ) : null}

        <p className="sr-only" aria-live="polite">
          {anuncio}
        </p>
      </div>

      {/* Historial */}
      {historial.length ? (
        <section aria-labelledby="dados-historial" className="mt-5 lg:col-start-2 lg:row-start-2 lg:mt-0">
          <div className="mb-3 flex items-center justify-between">
            <h2 id="dados-historial" className="font-display text-2xl text-jade-400">
              {d.historial}
            </h2>
            <button
              type="button"
              onClick={borrarHistorial}
              className="touch-manipulation rounded-full px-3 py-2 text-sm font-medium text-selva-400 transition-colors hover:text-selva-100"
            >
              {d.borrarHistorial}
            </button>
          </div>
          <ol className="divide-y divide-selva-800 rounded-2xl bg-selva-800/30 ring-1 ring-selva-700/70">
            {historial.map((tirada) => (
              <li key={tirada.id} className="flex items-center gap-3 px-4 py-3">
                <div className="flex shrink-0 -space-x-2" aria-hidden="true">
                  {DADOS.filter((tipo) => (tirada.bandeja[tipo] ?? 0) > 0)
                    .slice(0, 3)
                    .map((tipo) => (
                      <Dado key={tipo} forma={forma(tipo)} color={porTipo[tipo].color} className="h-8 w-8" />
                    ))}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-selva-100">
                    {tirada.formula}
                    {tirada.modo === "normal" ? "" : ` · ${nombreModo(tirada.modo)}`}
                  </p>
                  <p className="truncate text-xs text-selva-400 tabular-nums">{detalle(tirada)}</p>
                </div>
                <p
                  className={`w-12 shrink-0 text-right text-2xl font-bold tabular-nums ${
                    tirada.natural === "critico" ? "text-oro-300" : tirada.natural === "pifia" ? "text-red-300" : "text-selva-100"
                  }`}
                >
                  {tirada.total}
                </p>
                <button
                  type="button"
                  onClick={() => repetir(tirada)}
                  aria-label={`${d.repetir}: ${tirada.formula}${tirada.modo === "normal" ? "" : ` (${nombreModo(tirada.modo)})`}`}
                  className="shrink-0 touch-manipulation rounded-full px-3 py-1.5 text-sm font-semibold text-selva-100 ring-1 ring-selva-600 transition duration-150 hover:text-jade-200 hover:ring-jade-400/60 motion-safe:active:scale-[0.97]"
                >
                  {d.repetir}
                </button>
              </li>
            ))}
          </ol>
        </section>
      ) : null}
    </div>
  );
}
