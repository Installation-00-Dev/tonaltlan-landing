import type { CSSProperties } from "react";

// Un motivo de greca escalonada (xicalcoliuhqui) de 40x16: escalones que suben
// y una espiral cuadrada que remata. Se repite en horizontal.
const MOTIVO =
  "data:image/svg+xml," +
  encodeURIComponent(
    '<svg xmlns="http://www.w3.org/2000/svg" width="40" height="16" viewBox="0 0 40 16">' +
      '<path d="M0 15 H6 V11 H10 V7 H14 V3 H30 V12 H20 V7 H25 V9 M30 12 V15 H40" ' +
      'fill="none" stroke="black" stroke-width="2" stroke-linecap="square"/></svg>',
  );

const estilo: CSSProperties = {
  WebkitMaskImage: `url("${MOTIVO}")`,
  maskImage: `url("${MOTIVO}")`,
  WebkitMaskRepeat: "repeat-x",
  maskRepeat: "repeat-x",
  WebkitMaskSize: "40px 16px",
  maskSize: "40px 16px",
};

/**
 * Greca escalonada: friso mesoamericano como franja separadora.
 * Toma el color del texto (usa clases text-* para cambiarlo).
 */
export default function Greca({ className = "" }: { className?: string }) {
  return <div className={`h-4 w-full bg-current ${className}`} style={estilo} aria-hidden="true" />;
}
