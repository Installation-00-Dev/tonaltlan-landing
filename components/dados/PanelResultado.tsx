import Dado, { formaDe, type EstadoDado } from "@/components/dados/Dado";
import { nombreModo, type InfoDado, type TextosDados, type Tirada } from "@/components/dados/comun";
import { DADOS, bandejaEfectiva, carasD100, detalle, totalDados, type Bandeja, type DadoTirado, type TipoDado } from "@/lib/dados-core";
import estilos from "./dados.module.css";

/** Cara que se ve: el d100 son dos dados ("70" y "4"). */
function caras(dado: DadoTirado): string[] {
  return dado.tipo === "d100" ? carasD100(dado) : [String(dado.valor)];
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
 * Resultado de Dados de los Siete: la tirada que rueda o la que salió, con el total,
 * el crítico o la pifia y el desglose. Antes de la primera tirada muestra la bandeja.
 */
export default function PanelResultado({
  ultima,
  girando,
  carasGiro,
  bandeja,
  porTipo,
  textos: d,
}: {
  ultima: Tirada | null;
  girando: boolean;
  /** Caras al azar mientras rueda (solo se ven). */
  carasGiro: string[][] | null;
  bandeja: Bandeja;
  porTipo: Record<TipoDado, InfoDado>;
  textos: TextosDados;
}) {
  const efectiva = bandejaEfectiva(bandeja);
  const cantidad = ultima ? ultima.dados.reduce((suma, dado) => suma + (dado.tipo === "d100" ? 2 : 1), 0) : 1;

  function estadoDe(dado: DadoTirado): EstadoDado {
    if (girando || !ultima) return "normal";
    if (dado.descartado) return "descartado";
    if (ultima.natural && dado.tipo === "d20") return ultima.natural;
    return "normal";
  }

  return (
    <div className="relative flex min-h-[14rem] flex-col items-center justify-center overflow-hidden rounded-3xl bg-selva-800/40 px-4 py-6 ring-1 ring-selva-700/70 sm:min-h-[17rem]">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(closest-side,rgba(74,222,128,0.08),transparent)]" aria-hidden="true" />
      {ultima ? (
        <>
          <div key={ultima.id} className={`relative flex flex-wrap items-end justify-center gap-3 ${girando ? "" : "aparece"}`}>
            {ultima.dados.map((dado, i) => {
              const datos = porTipo[dado.tipo];
              const visibles = girando && carasGiro ? carasGiro[i] : caras(dado);
              const estado = estadoDe(dado);
              const animacion = girando ? estilos.girando : estado === "critico" ? estilos.critico : estado === "pifia" ? estilos.pifia : "";
              return (
                <div
                  key={i}
                  className={`flex items-end gap-1 ${animacion} ${estado === "descartado" ? estilos.descartado : ""}`}
                >
                  {visibles.map((cara, j) => (
                    <Dado key={j} forma={formaDe(dado.tipo)} color={datos.color} texto={cara} estado={estado} className={`${tamano(cantidad)} h-auto`} />
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
                  {ultima.modo === "normal" ? "" : ` · ${nombreModo(d, ultima.modo)}`}
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
              forma={formaDe(tipo)}
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
  );
}
