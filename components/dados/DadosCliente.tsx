"use client";

import { useEffect, useRef, useState } from "react";
import Dado, { formaDe } from "@/components/dados/Dado";
import Historial from "@/components/dados/Historial";
import PanelResultado from "@/components/dados/PanelResultado";
import { nombreModo as nombreDelModo, type InfoDado, type TextosDados, type Tirada } from "@/components/dados/comun";
import { usePantallaEncendida } from "@/hooks/usePantallaEncendida";
import { prefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { guardarLista, leerLista } from "@/lib/almacen-local";
import {
  CARAS,
  DADOS,
  agregarDado,
  ajustarModificador,
  azarCripto,
  esD20Solo,
  formula,
  puedeAgregar,
  quitarDado,
  tirar,
  totalDados,
  type Bandeja,
  type Modo,
  type TipoDado,
} from "@/lib/dados-core";

const CLAVE_HISTORIAL = "tonaltlan-dados-historial";
const MAX_HISTORIAL = 10;
/** El dado rueda este tiempo antes de mostrar su cara (sin reducir movimiento). */
const DURACION_GIRO = 520;
const PASO_GIRO = 70;
/** Un segundo toque antes de esto no vuelve a tirar (dedo que rebota en la mesa). */
const ESPERA_DOBLE_TOQUE = 350;
const MODOS: Modo[] = ["normal", "ventaja", "desventaja"];

/** Caras al azar mientras el dado rueda (solo se ven; el resultado ya salió de crypto). */
function carasEnGiro(tipo: TipoDado): string[] {
  if (tipo === "d100") return [String(Math.floor(Math.random() * 10) * 10).padStart(2, "0"), String(Math.floor(Math.random() * 10))];
  return [String(1 + Math.floor(Math.random() * CARAS[tipo]))];
}

function textoMod(modificador: number) {
  return modificador > 0 ? `+${modificador}` : modificador < 0 ? `−${Math.abs(modificador)}` : "0";
}

/** Historial guardado en este navegador (sin almacenamiento: dura lo que dure la página). */
function leerHistorial(): Tirada[] {
  return (leerLista(CLAVE_HISTORIAL) as Tirada[])
    .filter((t) => t && typeof t.total === "number" && Array.isArray(t.dados) && typeof t.formula === "string")
    .slice(0, MAX_HISTORIAL);
}

/**
 * Dados de los Siete: bandeja combinable (2d6 + 3), ventaja y desventaja para 1d20,
 * historial y pantalla encendida. Abre listo para tirar 1d20 de un toque.
 * La lógica pura está en lib/dados-core.ts; aquí van el estado, los controles y el giro.
 * El resultado y el historial se dibujan en PanelResultado e Historial; los estilos,
 * en dados.module.css.
 */
export default function DadosCliente({ dados: info, textos: d }: { dados: InfoDado[]; textos: TextosDados }) {
  const [bandeja, setBandeja] = useState<Bandeja>({});
  const [modificador, setModificador] = useState(0);
  const [modo, setModo] = useState<Modo>("normal");
  const [ultima, setUltima] = useState<Tirada | null>(null);
  const [girando, setGirando] = useState(false);
  const [carasGiro, setCarasGiro] = useState<string[][] | null>(null);
  const [historial, setHistorial] = useState<Tirada[]>([]);
  const [anuncio, setAnuncio] = useState("");
  const { disponible: conWakeLock, activa: pantalla, alternar: alternarPantalla } = usePantallaEncendida();

  const historialRef = useRef<Tirada[]>([]);
  const girandoRef = useRef(false);
  const ultimoLanceRef = useRef(0);
  const contadorRef = useRef(0);
  const temporizadores = useRef<number[]>([]);

  const porTipo = Object.fromEntries(info.map((x) => [x.tipo, x])) as Record<TipoDado, InfoDado>;
  const soloD20 = esD20Solo(bandeja);
  const modoActual = soloD20 ? modo : "normal";
  const vacia = totalDados(bandeja) === 0;
  const nombreModo = (m: Modo) => nombreDelModo(d, m);

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
    guardarLista(CLAVE_HISTORIAL, nuevo);
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
    guardarLista(CLAVE_HISTORIAL, []);
  }

  // Historial guardado (solo existe en el navegador); los temporizadores se limpian al salir.
  useEffect(() => {
    const guardado = leerHistorial();
    historialRef.current = guardado;
    setHistorial(guardado);
    return () => limpiarTemporizadores();
  }, []);

  const formulaActual = formula(bandeja, modificador);
  const etiquetaModo = modoActual === "normal" ? "" : ` · ${nombreModo(modoActual)}`;

  return (
    // En celular: resultado, controles e historial, en ese orden. En escritorio: los controles
    // a la izquierda y el resultado con el historial a la derecha (todo a la vista sin bajar).
    <div className="grid gap-5 lg:grid-cols-[minmax(0,26rem)_minmax(0,1fr)] lg:items-start lg:gap-x-16 lg:gap-y-8">
      <div className="lg:col-start-2 lg:row-start-1">
        {/* Resultado */}
        <PanelResultado ultima={ultima} girando={girando} carasGiro={carasGiro} bandeja={bandeja} porTipo={porTipo} textos={d} />
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
                <Dado forma={formaDe(tipo)} color={color} emblema={emblema} doble={tipo === "d100"} className="h-12 w-12" />
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
      {historial.length ? <Historial historial={historial} porTipo={porTipo} textos={d} onRepetir={repetir} onBorrar={borrarHistorial} /> : null}
    </div>
  );
}
