"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import SectionHeader from "@/components/compendio/SectionHeader";
import SearchBar from "@/components/compendio/SearchBar";
import Image from "next/image";
import Greca from "@/components/ui/Greca";
import { variante } from "@/lib/imagenes";
import { t, type Lang } from "@/lib/i18n";

export interface Resultado {
  name: string;
  description: string;
  tipo: string;
  href: string;
  tags: string[];
}

// Posicion de cada carta del abanico: en reposo encimadas; al pasar el cursor se abren.
const cartas = [
  "-rotate-6 motion-safe:group-hover:-translate-x-6 motion-safe:group-hover:-rotate-12",
  "z-10 -ml-14 motion-safe:group-hover:-translate-y-2",
  "-ml-14 rotate-6 motion-safe:group-hover:translate-x-6 motion-safe:group-hover:rotate-12",
];

function Abanico({ imagenes }: { imagenes: string[] }) {
  if (imagenes.length === 0) {
    return (
      <div className="flex h-36 w-56 flex-col justify-center gap-2 text-jade-400/25" aria-hidden="true">
        <Greca />
        <Greca className="rotate-180" />
        <Greca />
      </div>
    );
  }
  return (
    <div className="flex h-36 w-56 items-center justify-center" aria-hidden="true">
      {imagenes.slice(0, 3).map((src, i) => (
        <div
          key={src}
          className={`relative h-36 w-28 shrink-0 overflow-hidden rounded-2xl bg-selva-800 shadow-lg shadow-selva-950/60 ring-1 ring-selva-600 transition-transform duration-300 ${cartas[i]}`}
        >
          <Image src={variante(src, 480)} alt="" fill className="object-cover object-top" sizes="112px" />
        </div>
      ))}
    </div>
  );
}

function normalizar(texto: string) {
  return texto.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();
}

export interface SeccionIndice {
  title: string;
  slug: string;
  description: string;
  count: number;
  href: string;
}

/** Parte interactiva de /explorar (buscador e indice). Los datos llegan del servidor. */
export default function ExplorarCliente({
  lang,
  indice,
  secciones,
  arteSeccion,
}: {
  lang: Lang;
  indice: Resultado[];
  secciones: SeccionIndice[];
  arteSeccion: Record<string, string[]>;
}) {
  const d = t(lang).paginas.explorar;
  const comun = t(lang).comun;
  const [search, setSearch] = useState("");
  const query = normalizar(search.trim());

  const resultados = useMemo(() => {
    if (!query) return [];
    return indice.filter((item) =>
      normalizar([item.name, item.description, item.tipo, ...item.tags].join(" ")).includes(query),
    );
  }, [query, indice]);

  return (
    <div className="pb-24 pt-28 lg:pt-36">
      <div className="mx-auto max-w-5xl px-6 lg:px-8">
        <SectionHeader
          lang={lang}
          eyebrow={comun.compendio}
          title={d.titulo}
          subtitle={d.subtitulo}
        />

        <SearchBar value={search} onChange={setSearch} placeholder={d.buscar} />

        {query ? (
          resultados.length === 0 ? (
            <p className="border-y border-selva-700/70 py-10 text-center text-base text-selva-400">
              {d.sinResultados} “{search}”.
            </p>
          ) : (
            <ul className="border-t border-selva-700/70">
              {resultados.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="group grid gap-1 border-b border-selva-700/70 px-2 py-5 transition-colors duration-200 hover:bg-selva-800/50 sm:grid-cols-[9rem_1fr] sm:gap-6 sm:px-6"
                  >
                    <span className="text-sm text-turquesa-300 sm:pt-1.5">{item.tipo}</span>
                    <span className="min-w-0">
                      <span className="block font-display text-2xl text-selva-50 group-hover:text-jade-300">{item.name}</span>
                      <span className="mt-1 line-clamp-2 block text-sm leading-relaxed text-selva-400">{item.description}</span>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          )
        ) : (
          <ol className="border-t border-selva-700/70">
            {secciones.map((section) => {
              const disponible = section.count > 0;
              const contenido = (
                <>
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
                      <h2
                        className={`font-display text-4xl transition-colors duration-200 md:text-5xl ${
                          disponible ? "text-selva-50 group-hover:text-jade-300" : "text-selva-400"
                        }`}
                      >
                        {section.title}
                      </h2>
                      {disponible ? (
                        <span className="text-sm text-turquesa-300">{section.count} {d.entradas}</span>
                      ) : (
                        <span className="rounded-full border border-oro-400/60 px-3 py-0.5 text-[11px] font-semibold uppercase tracking-[0.15em] text-oro-300">
                          {comun.proximamente}
                        </span>
                      )}
                    </div>
                    <p className="mt-3 max-w-xl text-base leading-relaxed text-selva-300">{section.description}</p>
                  </div>
                  <Abanico imagenes={arteSeccion[section.slug] ?? []} />
                </>
              );
              const fila =
                "grid items-center gap-6 border-b border-selva-700/70 px-2 py-8 sm:grid-cols-[1fr_auto] sm:px-6";

              return (
                <li key={section.slug}>
                  {disponible ? (
                    <Link
                      href={section.href}
                      className={`group ${fila} transition-colors duration-200 hover:bg-selva-800/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-oro-300 motion-safe:active:scale-[0.99]`}
                    >
                      {contenido}
                    </Link>
                  ) : (
                    <div className={fila}>{contenido}</div>
                  )}
                </li>
              );
            })}
          </ol>
        )}
      </div>
    </div>
  );
}
