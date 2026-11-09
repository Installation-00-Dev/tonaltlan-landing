"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import SectionHeader from "@/components/compendio/SectionHeader";
import SearchBar from "@/components/compendio/SearchBar";
import Image from "next/image";
import Greca from "@/components/ui/Greca";
import { clases, deidades, especies, sectionsMeta } from "@/lib/data";
import { variante } from "@/lib/imagenes";
import { galleryImages, mountImages } from "@/lib/site";

interface Resultado {
  name: string;
  description: string;
  tipo: string;
  href: string;
  tags: string[];
}

// Indice de busqueda: secciones + cada ficha del compendio.
const indice: Resultado[] = [
  ...clases.map((c) => ({ name: c.name, description: c.description, tipo: "Clase", href: `/clases#${c.slug}`, tags: c.tags })),
  ...especies.map((e) => ({ name: e.name, description: e.description, tipo: "Especie", href: `/especies/${e.slug}`, tags: e.tags })),
  ...deidades.map((d) => ({ name: d.name, description: d.description, tipo: "Deidad", href: `/deidades/${d.slug}`, tags: d.tags })),
];

// Arte de cada seccion para el abanico de miniaturas (hasta 3).
const conArte = (lista: { coverImageSrc?: string }[]) =>
  lista.map((item) => item.coverImageSrc).filter((src): src is string => Boolean(src));
const arteSeccion: Record<string, string[]> = {
  clases: conArte(clases),
  especies: conArte(especies),
  deidades: conArte(deidades),
  monturas: mountImages,
  galeria: galleryImages.filter((src) => !src.includes("Mapa")),
  bestiario: [],
};

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

export default function ExplorarPage() {
  const [search, setSearch] = useState("");
  const query = normalizar(search.trim());

  const resultados = useMemo(() => {
    if (!query) return [];
    return indice.filter((item) =>
      normalizar([item.name, item.description, item.tipo, ...item.tags].join(" ")).includes(query),
    );
  }, [query]);

  return (
    <div className="pb-24 pt-28 lg:pt-36">
      <div className="mx-auto max-w-5xl px-6 lg:px-8">
        <SectionHeader
          eyebrow="Compendio"
          title="Explorar Tonaltlan"
          subtitle="El compendio viviente del mundo mesoamericano. Busca entre clases, especies, criaturas, monturas y deidades."
        />

        <SearchBar value={search} onChange={setSearch} placeholder="Buscar en el compendio..." />

        {query ? (
          resultados.length === 0 ? (
            <p className="border-y border-selva-700/70 py-10 text-center text-base text-selva-400">
              Sin resultados para “{search}”.
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
            {sectionsMeta.map((section) => {
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
                        <span className="text-sm text-turquesa-300">{section.count} entradas</span>
                      ) : (
                        <span className="rounded-full border border-oro-400/60 px-3 py-0.5 text-[11px] font-semibold uppercase tracking-[0.15em] text-oro-300">
                          Próximamente
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
                      href={`/${section.slug}`}
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
