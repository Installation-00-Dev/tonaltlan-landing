import Dado, { formaDe } from "@/components/dados/Dado";
import { nombreModo, type InfoDado, type TextosDados, type Tirada } from "@/components/dados/comun";
import { DADOS, detalle, type TipoDado } from "@/lib/dados-core";

/** Las últimas tiradas (guardadas en este navegador), cada una con "Repetir". */
export default function Historial({
  historial,
  porTipo,
  textos: d,
  onRepetir,
  onBorrar,
}: {
  historial: Tirada[];
  porTipo: Record<TipoDado, InfoDado>;
  textos: TextosDados;
  onRepetir: (tirada: Tirada) => void;
  onBorrar: () => void;
}) {
  return (
    <section aria-labelledby="dados-historial" className="mt-5 lg:col-start-2 lg:row-start-2 lg:mt-0">
      <div className="mb-3 flex items-center justify-between">
        <h2 id="dados-historial" className="font-display text-2xl text-jade-400">
          {d.historial}
        </h2>
        <button
          type="button"
          onClick={onBorrar}
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
                  <Dado key={tipo} forma={formaDe(tipo)} color={porTipo[tipo].color} className="h-8 w-8" />
                ))}
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium text-selva-100">
                {tirada.formula}
                {tirada.modo === "normal" ? "" : ` · ${nombreModo(d, tirada.modo)}`}
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
              onClick={() => onRepetir(tirada)}
              aria-label={`${d.repetir}: ${tirada.formula}${tirada.modo === "normal" ? "" : ` (${nombreModo(d, tirada.modo)})`}`}
              className="shrink-0 touch-manipulation rounded-full px-3 py-1.5 text-sm font-semibold text-selva-100 ring-1 ring-selva-600 transition duration-150 hover:text-jade-200 hover:ring-jade-400/60 motion-safe:active:scale-[0.97]"
            >
              {d.repetir}
            </button>
          </li>
        ))}
      </ol>
    </section>
  );
}
