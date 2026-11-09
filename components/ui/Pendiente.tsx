import { MOSTRAR_NECESIDADES, pendientes, titulosEn, type PendienteId } from "@/lib/pendientes";
import { t, type Lang } from "@/lib/i18n";

interface PendienteProps {
  id: PendienteId;
  /** "bloque" ocupa una seccion completa; "compacto" cabe dentro de una tarjeta. */
  variante?: "bloque" | "compacto";
  className?: string;
  lang?: Lang;
}

/**
 * Placeholder visible de contenido pendiente.
 * El texto de lo que se necesita vive en lib/pendientes.ts.
 */
export default function Pendiente({ id, variante = "bloque", className = "", lang = "es" }: PendienteProps) {
  const info = pendientes[id];
  const d = t(lang).comun;
  const titulo = lang === "en" ? (titulosEn[id] ?? info.titulo) : info.titulo;
  const mostrarNecesidades = MOSTRAR_NECESIDADES && lang === "es";
  const necesita = info.necesita;
  const pistas = "pistas" in info ? info.pistas : undefined;

  if (variante === "compacto") {
    return (
      <div
        className={`flex flex-col items-center justify-center gap-2 rounded-xl border border-dashed border-selva-600 bg-selva-900/50 p-4 text-center ${className}`}
      >
        <span className="rounded-full bg-oro-400/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-oro-300 ring-1 ring-oro-400/25">
          {d.proximamente}
        </span>
      </div>
    );
  }

  return (
    <div
      className={`rounded-2xl border border-dashed border-oro-400/40 bg-selva-800/40 p-6 md:p-8 ${className}`}
      data-pendiente={id}
    >
      <div className="mb-3 flex flex-wrap items-center gap-3">
        <span className="rounded-full bg-oro-400/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-oro-300 ring-1 ring-oro-400/25">
          {d.proximamente}
        </span>
        <span className="font-display text-lg text-selva-100">{titulo}</span>
      </div>

      {mostrarNecesidades && necesita.length > 0 ? (
        <div className="mt-4 grid gap-6 md:grid-cols-2">
          <div>
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-selva-400">
              {d.queSeNecesita}
            </p>
            <ul className="space-y-2 text-sm leading-relaxed text-selva-300">
              {necesita.map((item) => (
                <li key={item} className="flex gap-2">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rotate-45 bg-oro-400/70" aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          {pistas && pistas.length > 0 ? (
            <div>
              <p className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-selva-400">
                {d.yaMencionado}
              </p>
              <ul className="space-y-2 text-sm leading-relaxed text-selva-400">
                {pistas.map((item) => (
                  <li key={item} className="flex gap-2">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-turquesa-400/60" aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}
