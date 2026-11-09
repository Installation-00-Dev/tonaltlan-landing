"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import SectionHeader from "@/components/compendio/SectionHeader";
import SearchBar from "@/components/compendio/SearchBar";
import { clases, deidades, especies, sectionsMeta } from "@/lib/data";

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
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <SectionHeader
          eyebrow="Compendio"
          title="Explorar Tonaltlan"
          subtitle="El compendio viviente del mundo mesoamericano. Busca entre clases, especies, criaturas, monturas y deidades."
        />

        <SearchBar value={search} onChange={setSearch} placeholder="Buscar en el compendio..." />

        {query ? (
          resultados.length === 0 ? (
            <div className="rounded-2xl bg-slate-800/40 p-10 text-center ring-1 ring-slate-700/70">
              <p className="text-base text-slate-400">Sin resultados para “{search}”.</p>
            </div>
          ) : (
            <ul className="grid gap-4 md:grid-cols-2">
              {resultados.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="group flex h-full flex-col rounded-2xl bg-slate-800/40 p-5 ring-1 ring-slate-700/70 transition-all hover:bg-slate-800 hover:ring-amber-400/60"
                  >
                    <span className="mb-1 text-xs font-semibold uppercase tracking-[0.2em] text-amber-400/90">{item.tipo}</span>
                    <span className="mb-1 font-serif text-lg font-semibold text-slate-100 group-hover:text-amber-300">
                      {item.name}
                    </span>
                    <span className="line-clamp-2 text-sm leading-relaxed text-slate-400">{item.description}</span>
                  </Link>
                </li>
              ))}
            </ul>
          )
        ) : (
          <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {sectionsMeta.map((section) => {
              const disponible = section.count > 0;
              const contenido = (
                <>
                  <div className="mb-3 flex items-center justify-between gap-3">
                    <h2
                      className={`font-serif text-xl font-semibold transition-colors ${
                        disponible ? "text-slate-100 group-hover:text-amber-300" : "text-slate-400"
                      }`}
                    >
                      {section.title}
                    </h2>
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-medium ring-1 ${
                        disponible
                          ? "bg-amber-400/10 text-amber-200 ring-amber-400/25"
                          : "border border-dashed border-slate-600 text-slate-500 ring-transparent"
                      }`}
                    >
                      {disponible ? `${section.count} entradas` : "Próximamente"}
                    </span>
                  </div>
                  <p className="text-sm leading-relaxed text-slate-400">{section.description}</p>
                </>
              );

              return (
                <li key={section.slug} className="flex">
                  {disponible ? (
                    <Link
                      href={`/${section.slug}`}
                      className="group flex w-full flex-col rounded-2xl bg-slate-800/40 p-6 ring-1 ring-slate-700/70 transition-all duration-300 hover:-translate-y-1 hover:bg-slate-800 hover:ring-amber-400/60"
                    >
                      {contenido}
                    </Link>
                  ) : (
                    <div className="flex w-full flex-col rounded-2xl border border-dashed border-slate-700 p-6">{contenido}</div>
                  )}
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
}
