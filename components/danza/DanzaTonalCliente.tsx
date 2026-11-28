"use client";

import Image from "next/image";
import { useEffect, useRef, useState, type CSSProperties } from "react";
import { prefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import {
  GLIFOS,
  capaFigura,
  glifoNuevo,
  glifosActivos,
  jugar,
  nuevaPartida,
  pasoEsperado,
  pasosLogrados,
  ritmo,
  siguienteRonda,
  type Glifo,
  type Partida,
} from "@/lib/danza-core";
import type { Diccionario } from "@/lib/i18n";

/** Lo que el servidor manda de cada glifo, ya en el idioma del visitante. */
export interface GlifoDanza {
  id: Glifo;
  emblema: string;
  /** Color de su deidad (hex de deityThemes) para el destello. */
  color: string;
  deidad: string;
  elemento: string;
}

type Textos = Diccionario["paginas"]["danza"];
type Fase = "inicio" | "nuevo" | "observa" | "turno" | "acierto" | "error" | "fin";

interface Resultado {
  pasos: number;
  /** Récord antes de esta partida. */
  anterior: number;
}

const CLAVE_RECORD = "tonaltlan-danza-record";
/** Pausas en milisegundos. */
const PAUSA_RONDA = 700; // antes de cada danza
const PAUSA_GLIFO_NUEVO = 1500; // deja ver el glifo que se suma
const PAUSA_ACIERTO = 650; // entre una ronda y la siguiente
const PAUSA_ERROR = 1300; // muestra el glifo que tocaba antes del resultado
const DESTELLO_TOQUE = 200; // brillo de cada toque del jugador
/** Del centro del tablero al centro de cada glifo, en % del ancho. */
const RADIO = 38;
const MAX_PUNTOS = 20;

function leerRecord() {
  try {
    return Math.max(0, Number.parseInt(localStorage.getItem(CLAVE_RECORD) ?? "0", 10) || 0);
  } catch {
    return 0;
  }
}

function guardarRecord(pasos: number) {
  try {
    localStorage.setItem(CLAVE_RECORD, String(pasos));
  } catch {
    // Sin almacenamiento (modo privado): el récord dura lo que dure la página.
  }
}

/** Posición de cada glifo en el círculo, en el sentido del reloj desde arriba. */
function posicion(indice: number): CSSProperties {
  const angulo = ((-90 + (360 / GLIFOS.length) * indice) * Math.PI) / 180;
  return {
    left: `${(50 + RADIO * Math.cos(angulo)).toFixed(3)}%`,
    top: `${(50 + RADIO * Math.sin(angulo)).toFixed(3)}%`,
  };
}

/**
 * Danza Tonal: los glifos se encienden en orden y el jugador repite la danza.
 * Solo visual (sin sonido). El récord vive en este navegador (localStorage).
 * La lógica pura está en lib/danza-core.ts; aquí van el ritmo, los toques y la pantalla.
 */
export default function DanzaTonalCliente({
  glifos,
  figuras,
  textos: d,
  enlace,
}: {
  glifos: GlifoDanza[];
  /** Las dos figuras de los Puntos Tonal, cada una en sus tres capas. */
  figuras: string[][];
  textos: Textos;
  /** Dirección de esta página para compartir el reto. */
  enlace: string;
}) {
  const [fase, setFase] = useState<Fase>("inicio");
  const [partida, setPartida] = useState<Partida>({ secuencia: [], entrada: 0 });
  const [encendido, setEncendido] = useState<Glifo | null>(null);
  const [mostrados, setMostrados] = useState(0);
  const [errado, setErrado] = useState<Glifo | null>(null);
  const [recien, setRecien] = useState<Glifo | null>(null);
  const [figura, setFigura] = useState(0);
  const [record, setRecord] = useState(0);
  const [resultado, setResultado] = useState<Resultado | null>(null);
  const [copiado, setCopiado] = useState(false);

  // Los temporizadores y el teclado leen el estado desde aquí (nunca una copia vieja).
  // Por eso los efectos de abajo se registran una sola vez: sus funciones solo usan refs y setters.
  const faseRef = useRef<Fase>("inicio");
  const partidaRef = useRef<Partida>(partida);
  const recordRef = useRef(0);
  const pausadaRef = useRef<Fase | null>(null);
  const temporizadores = useRef<number[]>([]);
  const destelloRef = useRef<number | undefined>(undefined);
  const ultimoToqueRef = useRef(0);
  const zonaRef = useRef<HTMLDivElement>(null);
  const tableroRef = useRef<HTMLDivElement>(null);
  const otraVezRef = useRef<HTMLButtonElement>(null);

  function cambiarFase(nueva: Fase) {
    faseRef.current = nueva;
    setFase(nueva);
  }

  function cambiarPartida(nueva: Partida) {
    partidaRef.current = nueva;
    setPartida(nueva);
  }

  function programar(accion: () => void, ms: number) {
    temporizadores.current.push(window.setTimeout(accion, ms));
  }

  function limpiar() {
    temporizadores.current.forEach((id) => window.clearTimeout(id));
    temporizadores.current = [];
    window.clearTimeout(destelloRef.current);
  }

  /** Muestra la danza paso a paso y luego le da el turno al jugador. */
  function reproducir(actual: Partida, pausa: number) {
    limpiar();
    setEncendido(null);
    setMostrados(0);
    const { encendido: brillo, apagado } = ritmo(actual.secuencia.length);
    let t = pausa;
    actual.secuencia.forEach((glifo, i) => {
      programar(() => {
        if (i === 0) {
          setRecien(null);
          cambiarFase("observa");
        }
        setEncendido(glifo);
        setMostrados(i + 1);
      }, t);
      t += brillo;
      programar(() => setEncendido(null), t);
      t += apagado;
    });
    programar(() => {
      setMostrados(0);
      cambiarFase("turno");
    }, t);
  }

  function empezarRonda(actual: Partida) {
    cambiarPartida(actual);
    setErrado(null);
    const nuevo = glifoNuevo(actual.secuencia.length);
    setRecien(nuevo);
    cambiarFase(nuevo ? "nuevo" : "observa");
    reproducir(actual, nuevo ? PAUSA_GLIFO_NUEVO : PAUSA_RONDA);
  }

  function terminar() {
    limpiar();
    setEncendido(null);
    setErrado(null);
    const pasos = pasosLogrados(partidaRef.current);
    const anterior = recordRef.current;
    if (pasos > anterior) {
      recordRef.current = pasos;
      setRecord(pasos);
      guardarRecord(pasos);
    }
    setResultado({ pasos, anterior });
    cambiarFase("fin");
  }

  function empezar() {
    limpiar();
    setResultado(null);
    setCopiado(false);
    setFigura(Math.random() < 0.5 ? 0 : 1);
    empezarRonda(nuevaPartida());
    // En celular el tablero puede quedar a medias: que se vea completo.
    const zona = zonaRef.current;
    if (zona) {
      const caja = zona.getBoundingClientRect();
      if (caja.top < 72 || caja.bottom > window.innerHeight) {
        zona.scrollIntoView({ block: "center", behavior: prefersReducedMotion() ? "auto" : "smooth" });
      }
    }
    tableroRef.current?.focus({ preventScroll: true });
  }

  function pulsar(glifo: Glifo) {
    if (faseRef.current !== "turno") return;
    const actual = partidaRef.current;
    if (!glifosActivos(actual.secuencia.length).includes(glifo)) return;
    const { jugada, partida: siguiente } = jugar(actual, glifo);
    window.clearTimeout(destelloRef.current);

    if (jugada === "error") {
      // Se marca el que tocó y se enciende el que tocaba.
      setErrado(glifo);
      setEncendido(pasoEsperado(actual));
      cambiarFase("error");
      programar(terminar, PAUSA_ERROR);
      return;
    }

    setEncendido(glifo);
    destelloRef.current = window.setTimeout(() => setEncendido((e) => (e === glifo ? null : e)), DESTELLO_TOQUE);
    cambiarPartida(siguiente);
    if (jugada === "ronda") {
      cambiarFase("acierto");
      programar(() => empezarRonda(siguienteRonda(siguiente)), PAUSA_ACIERTO);
    }
  }

  async function retar() {
    if (!resultado) return;
    const texto = d.retoTexto.replace("{pasos}", conPasos(resultado.pasos));
    if (typeof navigator.share === "function") {
      try {
        await navigator.share({ title: d.titulo, text: texto, url: enlace });
      } catch {
        // El jugador cerró el menú de compartir.
      }
      return;
    }
    try {
      await navigator.clipboard.writeText(`${texto} ${enlace}`);
      setCopiado(true);
    } catch {
      // Sin portapapeles: no hay nada más que hacer.
    }
  }

  function conPasos(n: number) {
    return `${n} ${n === 1 ? d.paso : d.pasos}`;
  }

  // Récord guardado en este navegador; los temporizadores se limpian al salir.
  useEffect(() => {
    const guardado = leerRecord();
    recordRef.current = guardado;
    setRecord(guardado);
    return () => limpiar();
  }, []);

  // Teclas 1 a 7: un glifo cada una, en el orden del círculo. Sin animación extra.
  useEffect(() => {
    const alTeclear = (evento: KeyboardEvent) => {
      if (evento.repeat || evento.altKey || evento.ctrlKey || evento.metaKey) return;
      const indice = Number(evento.key) - 1;
      if (faseRef.current === "turno" && Number.isInteger(indice) && indice >= 0 && indice < GLIFOS.length) {
        evento.preventDefault();
        pulsar(GLIFOS[indice]);
      }
    };
    window.addEventListener("keydown", alTeclear);
    return () => window.removeEventListener("keydown", alTeclear);
  }, []);

  // Si el jugador cambia de pestaña o le llega algo al celular, la danza se pausa
  // y al volver se repite la ronda completa (sin castigo).
  useEffect(() => {
    const alCambiar = () => {
      const actual = faseRef.current;
      if (document.hidden) {
        if (actual !== "inicio" && actual !== "fin") {
          limpiar();
          setEncendido(null);
          pausadaRef.current = actual;
        }
        return;
      }
      const pausada = pausadaRef.current;
      if (!pausada) return;
      pausadaRef.current = null;
      if (pausada === "error") terminar();
      else if (pausada === "acierto") empezarRonda(siguienteRonda(partidaRef.current));
      else empezarRonda({ ...partidaRef.current, entrada: 0 });
    };
    document.addEventListener("visibilitychange", alCambiar);
    return () => document.removeEventListener("visibilitychange", alCambiar);
  }, []);

  // Al terminar, el foco va a "Otra vez" (teclado y lectores de pantalla).
  useEffect(() => {
    if (fase === "fin") otraVezRef.current?.focus({ preventScroll: true });
  }, [fase]);

  const ronda = Math.max(1, partida.secuencia.length);
  const activos = glifosActivos(ronda);
  const enJuego = fase !== "inicio" && fase !== "fin";
  const nuevo = recien ? glifos.find((g) => g.id === recien) : undefined;

  let mensaje = "";
  if (fase === "nuevo" && nuevo) mensaje = d.nuevoGlifo.replace("{elemento}", nuevo.elemento);
  else if (fase === "observa") mensaje = d.observa;
  else if (fase === "turno") mensaje = d.tuTurno;
  else if (fase === "acierto") mensaje = d.bien;
  else if (fase === "error") mensaje = d.error;
  else if (fase === "fin" && resultado) {
    if (resultado.pasos > resultado.anterior) mensaje = d.nuevoRecord;
    else if (resultado.pasos === resultado.anterior) mensaje = resultado.pasos > 0 ? d.igualaste : "";
    else mensaje = d.faltan.replace("{pasos}", conPasos(resultado.anterior - resultado.pasos));
  }

  const total = partida.secuencia.length;
  const llenos =
    fase === "observa" ? mostrados : fase === "turno" || fase === "error" ? partida.entrada : fase === "acierto" ? total : 0;
  const capa = capaFigura(ronda);
  const esRecord = fase === "fin" && resultado !== null && resultado.pasos > resultado.anterior;

  return (
    <div ref={zonaRef} className="mx-auto w-full max-w-[26rem]">
      {/* Ronda y récord */}
      <div className="mb-3 flex h-6 items-center justify-between text-sm">
        <span className="font-medium text-selva-300">{enJuego ? d.ronda.replace("{n}", String(ronda)) : ""}</span>
        {record > 0 ? (
          <span className="text-selva-400">
            {d.record} <span className="font-semibold tabular-nums text-selva-100">{record}</span>
          </span>
        ) : null}
      </div>

      {/* Tablero: los siete glifos en círculo, como la rueda del pecho de los Puntos Tonal */}
      <div
        ref={tableroRef}
        tabIndex={-1}
        role="group"
        aria-label={d.tablero}
        data-fase={fase}
        className="danza-tablero relative aspect-square w-full rounded-full bg-[radial-gradient(closest-side,rgba(74,222,128,0.10),transparent)] focus:outline-none"
      >
        <svg viewBox="0 0 100 100" className="pointer-events-none absolute inset-0 h-full w-full text-selva-700" aria-hidden="true">
          <circle cx="50" cy="50" r={RADIO} fill="none" stroke="currentColor" strokeWidth="0.5" strokeDasharray="1.5 1.5" />
          <circle cx="50" cy="50" r={RADIO + 11.5} fill="none" stroke="currentColor" strokeOpacity="0.5" strokeWidth="0.3" />
        </svg>

        {glifos.map((glifo, indice) => {
          const activo = activos.includes(glifo.id);
          const estado = !activo
            ? "dormido"
            : glifo.id === errado
              ? "error"
              : glifo.id === encendido
                ? "encendido"
                : "listo";
          return (
            <div
              key={glifo.id}
              className="absolute w-[22%] -translate-x-1/2 -translate-y-1/2"
              style={posicion(indice)}
              aria-hidden={activo ? undefined : true}
            >
              <button
                type="button"
                data-glifo={glifo.id}
                data-estado={estado}
                data-recien={glifo.id === recien ? "true" : undefined}
                disabled={!activo}
                tabIndex={activo ? 0 : -1}
                aria-label={`${glifo.elemento}, ${glifo.deidad}`}
                aria-keyshortcuts={String(indice + 1)}
                aria-disabled={activo && fase !== "turno" ? true : undefined}
                onPointerDown={(evento) => {
                  // El toque cuenta al bajar el dedo: la respuesta se siente inmediata.
                  if (evento.button !== 0) return;
                  ultimoToqueRef.current = performance.now();
                  pulsar(glifo.id);
                }}
                onClick={() => {
                  // Teclado (Enter o espacio) y lectores de pantalla llegan solo con el clic;
                  // si un dedo acaba de tocar, ese toque ya contó.
                  if (performance.now() - ultimoToqueRef.current > 600) pulsar(glifo.id);
                }}
                className="danza-glifo block aspect-square w-full touch-manipulation select-none rounded-full focus-visible:outline-offset-4"
                style={{ "--brillo": glifo.color, "--brillo-suave": `${glifo.color}99` } as CSSProperties}
              >
                <Image
                  src={glifo.emblema}
                  alt=""
                  width={256}
                  height={256}
                  loading="eager"
                  draggable={false}
                  className="pointer-events-none h-full w-full rounded-full"
                />
              </button>
            </div>
          );
        })}

        {/* Centro: empezar, la figura del Tonal que despierta o el puntaje */}
        <div className="absolute inset-[27%]">
          {/* Cada centro con su key: no comparten nodo y no heredan transiciones entre sí. */}
          {fase === "inicio" ? (
            <button
              key="empezar"
              type="button"
              onClick={empezar}
              className="flex h-full w-full items-center justify-center rounded-full bg-oro-400 text-lg font-semibold text-selva-950 shadow-[0_0_0_6px_rgba(245,184,46,0.15)] transition duration-150 hover:bg-oro-300 motion-safe:active:scale-[0.97]"
            >
              {d.empezar}
            </button>
          ) : fase === "fin" && resultado ? (
            <div
              key="puntaje"
              className={`aparece flex h-full w-full flex-col items-center justify-center rounded-full bg-selva-800 ring-2 ${
                esRecord ? "ring-jade-400" : "ring-selva-700"
              }`}
            >
              <span className="font-display text-6xl leading-none text-jade-400 tabular-nums">{resultado.pasos}</span>
              <span className="mt-1 text-sm text-selva-300">{resultado.pasos === 1 ? d.paso : d.pasos}</span>
            </div>
          ) : (
            <div
              key="figura"
              className={`relative h-full w-full overflow-hidden rounded-full bg-selva-100 ring-4 transition-colors duration-200 ${
                fase === "turno" ? "ring-jade-400/80" : fase === "error" ? "ring-red-400/80" : "ring-selva-700"
              }`}
            >
              {figuras[figura].map((src, i) => (
                <Image
                  key={src}
                  src={src}
                  alt=""
                  fill
                  loading="eager"
                  sizes="180px"
                  className="object-contain p-[7%] transition-opacity duration-500"
                  style={{ opacity: i === capa ? 1 : 0 }}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Estado y avance de la ronda */}
      <div className="mt-5 flex min-h-[4.5rem] flex-col items-center gap-3 text-center">
        <p role="status" aria-live="polite" className="min-h-[2rem] font-display text-2xl text-selva-100">
          {mensaje}
        </p>
        {enJuego && total > 0 ? (
          total <= MAX_PUNTOS ? (
            <div className="flex flex-wrap justify-center gap-1.5" aria-hidden="true">
              {Array.from({ length: total }, (_, i) => (
                <span
                  key={i}
                  className={`h-2 w-2 rounded-full transition-colors duration-150 ${
                    fase === "error" && i === partida.entrada ? "bg-red-400" : i < llenos ? "bg-jade-400" : "bg-selva-700"
                  }`}
                />
              ))}
            </div>
          ) : (
            <span className="text-sm tabular-nums text-selva-400" aria-hidden="true">
              {llenos}/{total}
            </span>
          )
        ) : null}
      </div>

      {/* Resultado: jugar otra vez o retar a alguien */}
      <div className="flex min-h-[52px] flex-wrap items-center justify-center gap-3">
        {fase === "fin" ? (
          <>
            <button
              ref={otraVezRef}
              type="button"
              onClick={empezar}
              className="inline-flex min-h-[52px] items-center justify-center rounded-full bg-oro-400 px-8 py-3 text-base font-semibold text-selva-950 transition duration-150 hover:bg-oro-300 motion-safe:active:scale-[0.97]"
            >
              {d.otraVez}
            </button>
            <button
              type="button"
              onClick={retar}
              className="inline-flex min-h-[52px] items-center justify-center rounded-full px-7 py-3 text-base font-semibold text-selva-100 ring-1 ring-selva-600 transition duration-150 hover:text-jade-200 hover:ring-jade-400/60 motion-safe:active:scale-[0.97]"
            >
              {d.retar}
            </button>
          </>
        ) : null}
      </div>
      {copiado ? (
        <p role="status" className="mt-3 text-center text-sm text-turquesa-300">
          {d.copiado}
        </p>
      ) : null}
    </div>
  );
}
