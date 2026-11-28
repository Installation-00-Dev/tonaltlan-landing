import Image from "next/image";
import Link from "next/link";
import { useMemo, type CSSProperties, type RefObject } from "react";
import CompartirResultado, { type TarjetaAfinidad } from "@/components/afinidad/CompartirResultado";
import { enfoque, type InfoEspecies } from "@/components/afinidad/comun";
import type { AffinityMode, SubmissionStatus } from "@/hooks/useAffinityTest";
import type { CalculatedResults } from "@/lib/affinity-core";
import { ruta, t, type Lang } from "@/lib/i18n";
import { variante } from "@/lib/imagenes";
import { emblemas, themeFor } from "@/lib/site";
import estilos from "./afinidad.module.css";

interface ParsedAffinityTitle {
  race: string;
  element: string | null;
  archetype: string;
}

/** "TON, Luz. El Iluminador": especie, elemento y arquetipo (nombres en lib/affinity-test*.ts). */
function parseAffinityTitle(rawTitle: string, revelada: string): ParsedAffinityTitle {
  const match = rawTitle.match(/^([^,]+),\s*([^.]+)\.\s*(.+)$/);

  if (!match) {
    return {
      race: rawTitle.trim(),
      element: null,
      archetype: revelada,
    };
  }

  return {
    race: match[1].trim(),
    element: match[2]?.trim() ?? null,
    archetype: match[3].trim(),
  };
}

/** Retraso escalonado de la revelacion del resultado (ver .revelacionTexto en afinidad.module.css). */
const retraso = (ms: number) => ({ "--retraso": `${ms}ms` }) as CSSProperties;

/**
 * Resultado del Test de Afinidad: la revelación (retrato y nombre en la primera pantalla),
 * la lectura, el toque de la segunda especie, compartir, el estado del guardado y la
 * lectura completa en un desplegable.
 */
export default function ResultadoAfinidad({
  lang,
  info,
  results,
  nombre,
  affinityMode,
  submissionStatus,
  tituloRef,
  onReintentar,
  onReiniciar,
}: {
  lang: Lang;
  info: InfoEspecies;
  results: CalculatedResults;
  /** Nombre que escribió el visitante. */
  nombre: string;
  affinityMode: AffinityMode;
  submissionStatus: SubmissionStatus;
  /** El título recibe el foco al llegar al resultado (lo enfoca AfinidadCliente). */
  tituloRef: RefObject<HTMLHeadingElement | null>;
  onReintentar: () => void;
  onReiniciar: () => void;
}) {
  const d = t(lang).paginas.afinidad;
  const hijosDe = t(lang).paginas.especies.hijosDe;
  const parsedDominantTitle = parseAffinityTitle(results.dominant.narrative.name, d.revelada);
  const principal = info[results.dominant.race];
  const segunda = results.secondary ? info[results.secondary.race] : null;
  const tema = themeFor(principal.deidad?.slug);
  const temaSegunda = themeFor(segunda?.deidad?.slug);
  const linaje = principal.deidad
    ? `${hijosDe} ${principal.deidad.nombre}${parsedDominantTitle.element ? ` · ${parsedDominantTitle.element}` : ""}`
    : (parsedDominantTitle.element ?? "");

  // Datos de la imagen para compartir (estables mientras no cambie el resultado).
  const tarjeta = useMemo<TarjetaAfinidad>(
    () => ({
      encabezado: `${nombre.trim()}, ${d.eres}`,
      especie: principal.nombre,
      slug: principal.slug,
      imagen: principal.imagen,
      arquetipo: parsedDominantTitle.archetype ?? principal.nombre,
      linaje,
      frase: results.dominant.narrative.lectura[0] ?? "",
      hex: tema.hex,
      hexTexto: tema.hexTexto,
    }),
    // Solo depende del resultado: nombre, idioma y colores no cambian mientras se muestra.
    [results],
  );

  return (
    <div className="space-y-5">
      {/* ── La revelacion: el arte y el nombre caben juntos en la primera pantalla ── */}
      <section className={`overflow-hidden rounded-3xl bg-selva-900 ring-1 md:grid md:grid-cols-5 ${tema.ring}`}>
        <div
          className={`relative h-[min(46vh,26rem)] min-h-[16rem] bg-gradient-to-b md:col-span-2 md:row-span-2 md:h-auto md:min-h-[28rem] ${tema.glow}`}
        >
          {principal.imagen ? (
            <Image
              src={variante(principal.imagen, 1200)}
              alt={principal.alt ?? principal.nombre}
              fill
              priority
              className={`${estilos.revelacionArte} object-contain object-bottom p-3 pb-16 md:object-center md:p-4`}
              sizes="(max-width: 768px) 100vw, 320px"
            />
          ) : null}
        </div>

        <div className="relative z-10 -mt-24 bg-gradient-to-t from-selva-900 from-60% to-transparent px-6 pt-14 md:col-span-3 md:mt-0 md:bg-none md:px-10 md:pt-10">
          <h2 ref={tituloRef} tabIndex={-1} className="outline-none focus-visible:outline-none">
            <span className={`${estilos.revelacionTexto} block text-base text-selva-200`} style={retraso(200)}>
              {nombre.trim()}, {d.eres}
            </span>{" "}
            <span
              className={`${estilos.revelacionTexto} mt-1 block font-display text-5xl leading-none md:text-6xl ${tema.text}`}
              style={retraso(280)}
            >
              {principal.nombre}
            </span>
          </h2>
          <p className={`${estilos.revelacionTexto} mt-3 font-display text-2xl text-selva-100`} style={retraso(360)}>
            {parsedDominantTitle.archetype ?? results.dominant.narrative.name}
          </p>
          <p className={`${estilos.revelacionTexto} mt-1 flex flex-wrap items-center gap-x-2 text-sm text-selva-400`} style={retraso(420)}>
            {principal.deidad && emblemas[principal.deidad.slug] ? (
              <Image src={emblemas[principal.deidad.slug]} alt="" width={256} height={256} className="h-6 w-6 shrink-0" />
            ) : null}
            {linaje}
            {affinityMode === "random" ? <span className="text-oro-300"> · {d.modoAleatorio}</span> : null}
          </p>
        </div>

        <ul className="space-y-4 px-6 pb-7 pt-5 md:col-span-3 md:px-10 md:pb-10 md:pt-2">
          {results.dominant.narrative.lectura.map((frase, index) => (
            <li
              key={frase}
              className={`${estilos.revelacionTexto} flex gap-3 text-base leading-7 text-selva-100 md:text-lg md:leading-8`}
              style={retraso(520 + index * 90)}
            >
              <span className={`mt-3 h-1.5 w-1.5 shrink-0 rotate-45 ${tema.bar}`} aria-hidden="true" />
              {frase}
            </li>
          ))}
        </ul>
      </section>

      {/* ── Un toque de la segunda especie ── */}
      {segunda && results.secondary ? (
        <section
          className={`${estilos.revelacionTexto} flex items-center gap-4 rounded-2xl bg-selva-800/40 p-4 ring-1 ring-selva-700/70 md:p-5`}
          style={retraso(820)}
        >
          <div className={`relative h-20 w-20 shrink-0 overflow-hidden rounded-full bg-gradient-to-b ${temaSegunda.glow}`}>
            {segunda.imagen ? (
              <Image src={variante(segunda.imagen, 480)} alt="" fill className="object-cover object-top" sizes="80px" />
            ) : null}
          </div>
          <div>
            <p className="text-sm text-selva-400">
              {d.toque} <span className={`font-display text-xl ${temaSegunda.text}`}>{segunda.nombre}</span>
            </p>
            <p className="mt-1 text-sm leading-6 text-selva-200">{results.secondary.narrative.lectura[1]}</p>
          </div>
        </section>
      ) : null}

      {/* ── Acciones: compartir es lo principal; conocer la especie, lo siguiente ── */}
      <div className={`${estilos.revelacionTexto} flex flex-col gap-3 pt-1 sm:flex-row sm:flex-wrap sm:justify-center`} style={retraso(900)}>
        <CompartirResultado
          lang={lang}
          datos={tarjeta}
          className={`inline-flex min-h-[52px] items-center justify-center gap-2 rounded-full bg-oro-400 px-7 py-3 text-base font-semibold text-selva-950 transition duration-150 hover:bg-oro-300 disabled:opacity-70 motion-safe:active:scale-[0.97] ${enfoque}`}
        />
        <Link
          href={ruta(lang, `/especies/${principal.slug}/`)}
          className={`inline-flex min-h-[52px] items-center justify-center rounded-full px-7 py-3 text-base font-semibold text-selva-100 ring-1 ring-selva-600 transition duration-150 hover:text-jade-200 hover:ring-jade-400/60 motion-safe:active:scale-[0.97] ${enfoque}`}
        >
          {d.conoce}
        </Link>
      </div>

      <div className="flex flex-col items-center gap-2 text-center">
        {submissionStatus === "error" ? (
          <div className="flex flex-wrap items-center justify-center gap-3" role="alert">
            <p className="text-sm text-red-300">{d.error}</p>
            <button
              type="button"
              onClick={onReintentar}
              className={`rounded-full px-4 py-1.5 text-sm font-semibold text-selva-100 ring-1 ring-selva-600 transition-colors hover:text-jade-200 hover:ring-jade-400/60 ${enfoque}`}
            >
              {d.reintentar}
            </button>
          </div>
        ) : null}
        {submissionStatus === "saving" ? <p className="text-xs text-selva-400">{d.guardando}</p> : null}
        {submissionStatus === "saved" ? (
          <p className="inline-flex items-center gap-1.5 text-xs text-selva-400">
            <svg className="h-3.5 w-3.5 text-jade-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
            </svg>
            {d.guardado}
          </p>
        ) : null}
        <button
          type="button"
          onClick={onReiniciar}
          className={`rounded-full px-4 py-2 text-sm font-medium text-selva-300 underline decoration-selva-600 underline-offset-4 transition-colors hover:text-jade-200 hover:decoration-jade-400/60 ${enfoque}`}
        >
          {d.reiniciar}
        </button>
      </div>

      {/* ── La lectura completa de siempre, para quien quiera leer mas ── */}
      <details className="group rounded-2xl bg-selva-800/30 ring-1 ring-selva-700/70">
        <summary
          className={`flex cursor-pointer list-none items-center justify-between gap-4 rounded-2xl px-6 py-4 font-display text-xl text-jade-400 transition-colors hover:text-jade-300 [&::-webkit-details-marker]:hidden ${enfoque}`}
        >
          {d.lecturaCompleta}
          <svg
            className="h-5 w-5 shrink-0 text-selva-400 transition-transform duration-200 group-open:rotate-180"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </summary>

        <div className="space-y-6 px-6 pb-7 md:px-8">
          {results.sections.map((section) => (
            <section key={section.title}>
              <h3 className="font-display text-xl text-jade-400">{section.title}</h3>
              <p className="mt-1.5 max-w-prose text-base leading-7 text-selva-300">{section.content}</p>
            </section>
          ))}
          <section>
            <h3 className="font-display text-xl text-jade-400">{d.simbolos}</h3>
            <dl className="mt-3 grid gap-5 sm:grid-cols-3">
              {results.symbols.map((symbol) => (
                <div key={symbol.label}>
                  <dt className="text-sm font-semibold text-turquesa-300">{symbol.label}</dt>
                  <dd className="mt-1 text-sm leading-6 text-selva-200">{symbol.content}</dd>
                </div>
              ))}
            </dl>
          </section>
        </div>
      </details>
    </div>
  );
}
