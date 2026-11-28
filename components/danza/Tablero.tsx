import Image from "next/image";
import { useRef, type CSSProperties, type RefObject } from "react";
import { GLIFOS, type Glifo } from "@/lib/danza-core";
import type { Fase, GlifoDanza, ResultadoDanza, TextosDanza } from "@/components/danza/comun";
import estilos from "./danza.module.css";

/** Del centro del tablero al centro de cada glifo, en % del ancho. */
const RADIO = 38;

/** Posición de cada glifo en el círculo, en el sentido del reloj desde arriba. */
function posicion(indice: number): CSSProperties {
  const angulo = ((-90 + (360 / GLIFOS.length) * indice) * Math.PI) / 180;
  return {
    left: `${(50 + RADIO * Math.cos(angulo)).toFixed(3)}%`,
    top: `${(50 + RADIO * Math.sin(angulo)).toFixed(3)}%`,
  };
}

/**
 * Tablero de la Danza Tonal: los siete glifos en círculo, como la rueda del pecho de los
 * Puntos Tonal, y al centro el botón de empezar, la figura del Tonal que despierta o el
 * puntaje. Solo dibuja: el ritmo y las reglas viven en DanzaTonalCliente.
 */
export default function Tablero({
  tableroRef,
  fase,
  glifos,
  activos,
  errado,
  encendido,
  recien,
  resultado,
  esRecord,
  figura,
  capa,
  textos: d,
  onPulsar,
  onEmpezar,
}: {
  tableroRef: RefObject<HTMLDivElement | null>;
  fase: Fase;
  glifos: GlifoDanza[];
  activos: Glifo[];
  errado: Glifo | null;
  encendido: Glifo | null;
  recien: Glifo | null;
  resultado: ResultadoDanza | null;
  esRecord: boolean;
  /** Las tres capas de la figura de esta partida. */
  figura: string[];
  /** Capa de la figura que se ve. */
  capa: number;
  textos: TextosDanza;
  onPulsar: (glifo: Glifo) => void;
  onEmpezar: () => void;
}) {
  const ultimoToqueRef = useRef(0);

  return (
    <div
      ref={tableroRef}
      tabIndex={-1}
      role="group"
      aria-label={d.tablero}
      data-fase={fase}
      className={`${estilos.tablero} relative aspect-square w-full rounded-full bg-[radial-gradient(closest-side,rgba(74,222,128,0.10),transparent)] focus:outline-none`}
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
                onPulsar(glifo.id);
              }}
              onClick={() => {
                // Teclado (Enter o espacio) y lectores de pantalla llegan solo con el clic;
                // si un dedo acaba de tocar, ese toque ya contó.
                if (performance.now() - ultimoToqueRef.current > 600) onPulsar(glifo.id);
              }}
              className={`${estilos.glifo} block aspect-square w-full touch-manipulation select-none rounded-full focus-visible:outline-offset-4`}
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
            onClick={onEmpezar}
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
            {figura.map((src, i) => (
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
  );
}
