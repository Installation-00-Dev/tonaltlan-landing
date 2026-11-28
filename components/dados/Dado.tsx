import type { TipoDado } from "@/lib/dados-core";

/** Forma que se dibuja: el d100 se arma con dos d10 (decenas y unidades). */
export type FormaDado = Exclude<TipoDado, "d100">;

export const formaDe = (tipo: TipoDado): FormaDado => (tipo === "d100" ? "d10" : tipo);
export type EstadoDado = "normal" | "vista" | "critico" | "pifia" | "descartado";

interface Geometria {
  /** Contorno del dado (puntos de un polígono) o, en el d6, un cuadrado redondeado. */
  contorno: string | null;
  /** Borde interior punteado: el trazo escalonado que lo hace sentir mesoamericano. */
  interior?: string | null;
  /** Aristas visibles (d10 y d20), para reconocerlos de un vistazo. */
  aristas?: string[];
  /** Centro de la cara y tamaño de letra para una o dos cifras. */
  texto: { x: number; y: number; tam: number };
}

// Siluetas planas de cada sólido en un cuadro de 0 a 100 (el viewBox deja margen para los rayos del crítico).
const GEOMETRIA: Record<FormaDado, Geometria> = {
  d4: { contorno: "50,6 95,88 5,88", interior: "50,21 82,80 18,80", texto: { x: 50, y: 63, tam: 28 } },
  d6: { contorno: null, texto: { x: 50, y: 51, tam: 40 } },
  d8: { contorno: "50,4 96,50 50,96 4,50", interior: "50,18 82,50 50,82 18,50", texto: { x: 50, y: 51, tam: 30 } },
  d10: { contorno: "50,4 95,42 50,96 5,42", aristas: ["M5 42 L50 70 L95 42"], texto: { x: 50, y: 41, tam: 28 } },
  d12: {
    contorno: "50,6 94.7,38.5 77.6,91 22.4,91 5.3,38.5",
    interior: "50,20 81.4,42.8 69.4,79.7 30.6,79.7 18.6,42.8",
    texto: { x: 50, y: 56, tam: 32 },
  },
  d20: {
    contorno: "50,2 91.6,26 91.6,74 50,98 8.4,74 8.4,26",
    interior: "50,22 78,70 22,70",
    aristas: [
      "M50 22 L50 2 M50 22 L91.6 26 M50 22 L8.4 26",
      "M78 70 L91.6 26 M78 70 L91.6 74 M78 70 L50 98",
      "M22 70 L8.4 26 M22 70 L8.4 74 M22 70 L50 98",
    ],
    texto: { x: 50, y: 55, tam: 24 },
  },
};

/** Tamaño del emblema en la cara de cada forma (cabe sin tocar las aristas). */
const TAM_EMBLEMA: Record<FormaDado, number> = { d4: 34, d6: 50, d8: 40, d10: 36, d12: 44, d20: 32 };

const ORO = "#f5b82e";
const ORO_CLARO = "#f8cf63";
const ROJO = "#f87171";
const SELVA_800 = "#123029";
const SELVA_900 = "#0b1d19";
const SELVA_100 = "#ecf5ef";
const SELVA_400 = "#86ab9b";

/**
 * Un dado en SVG puro: silueta del sólido con el color de su deidad, borde interior
 * punteado y la cara (o la etiqueta "d6" en la bandeja). Crítico: contorno de oro
 * con rayos como los del emblema de Tonatli. Pifia: rojo y apagado.
 * Sin estado ni efectos: sirve en el servidor (tarjeta de /juega) y en el navegador.
 */
export default function Dado({
  forma,
  color,
  texto,
  estado = "normal",
  doble = false,
  emblema,
  className = "",
}: {
  forma: FormaDado;
  color: string;
  texto?: string;
  estado?: EstadoDado;
  /** Dibuja un segundo dado detrás (el par del d100 en la bandeja). */
  doble?: boolean;
  /** Emblema de la deidad en la cara, en lugar del número (botones de la bandeja). */
  emblema?: string;
  className?: string;
}) {
  const g = GEOMETRIA[forma];
  const critico = estado === "critico";
  const pifia = estado === "pifia";
  const trazo = critico ? ORO : pifia ? ROJO : color;
  const tinte = critico ? ORO : pifia ? null : color;
  const colorTexto = critico ? "#fdf3d6" : pifia ? SELVA_400 : estado === "vista" ? color : SELVA_100;
  const largo = texto?.length ?? 0;
  const tam = g.texto.tam * (largo >= 4 ? 0.62 : largo === 3 ? 0.78 : 1) * (estado === "vista" ? 0.8 : 1);

  const silueta = (props: { fill: string; fillOpacity?: number; stroke?: string; strokeWidth?: number }) =>
    g.contorno ? (
      <polygon points={g.contorno} strokeLinejoin="round" {...props} />
    ) : (
      <rect x="7" y="7" width="86" height="86" rx="14" {...props} />
    );

  return (
    <svg viewBox="-10 -10 120 120" className={className} aria-hidden="true">
      {doble ? (
        <g transform="translate(14 8)" opacity="0.45">
          {silueta({ fill: SELVA_800, stroke: trazo, strokeWidth: 3 })}
        </g>
      ) : null}

      {critico ? (
        <g stroke={ORO_CLARO} strokeWidth="3" strokeLinecap="round">
          {Array.from({ length: 12 }, (_, i) => {
            const a = (i * Math.PI) / 6;
            return (
              <line
                key={i}
                x1={(50 + 52 * Math.cos(a)).toFixed(1)}
                y1={(50 + 52 * Math.sin(a)).toFixed(1)}
                x2={(50 + 59 * Math.cos(a)).toFixed(1)}
                y2={(50 + 59 * Math.sin(a)).toFixed(1)}
              />
            );
          })}
        </g>
      ) : null}

      {silueta({ fill: pifia ? SELVA_900 : SELVA_800 })}
      {tinte ? silueta({ fill: tinte, fillOpacity: critico ? 0.24 : 0.14 }) : null}

      {forma === "d6" ? (
        <rect
          x="17"
          y="17"
          width="66"
          height="66"
          rx="8"
          fill="none"
          stroke={critico ? ORO_CLARO : trazo}
          strokeOpacity={critico ? 0.75 : 0.45}
          strokeWidth="1.6"
          strokeDasharray="5 4"
        />
      ) : g.interior ? (
        <polygon
          points={g.interior}
          fill="none"
          stroke={critico ? ORO_CLARO : trazo}
          strokeOpacity={forma === "d20" ? 0.6 : critico ? 0.75 : 0.45}
          strokeWidth={forma === "d20" ? 2 : 1.6}
          strokeDasharray={forma === "d20" ? undefined : "5 4"}
          strokeLinejoin="round"
        />
      ) : null}

      {g.aristas?.map((d) => (
        <path key={d} d={d} fill="none" stroke={trazo} strokeOpacity="0.35" strokeWidth="1.4" strokeLinecap="round" />
      ))}

      {silueta({ fill: "none", stroke: trazo, strokeWidth: 4 })}

      {emblema ? (
        <image
          href={emblema}
          x={g.texto.x - TAM_EMBLEMA[forma] / 2}
          y={g.texto.y - TAM_EMBLEMA[forma] / 2}
          width={TAM_EMBLEMA[forma]}
          height={TAM_EMBLEMA[forma]}
        />
      ) : null}

      {texto ? (
        <text
          x={g.texto.x}
          y={g.texto.y}
          textAnchor="middle"
          dominantBaseline="central"
          fill={colorTexto}
          fontSize={tam}
          fontWeight={estado === "vista" ? 600 : 700}
          style={{ fontVariantNumeric: "tabular-nums" }}
        >
          {texto}
        </text>
      ) : null}
    </svg>
  );
}
