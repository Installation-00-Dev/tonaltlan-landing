"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import type { CompendiumEntry } from "@/lib/data";
import Pendiente from "@/components/ui/Pendiente";
import { variante } from "@/lib/imagenes";

const normalizar = (value: string) => value.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();

// Busca la seccion por titulo sin importar acentos ("Descripción" / "Descripcion").
function sectionText(item: CompendiumEntry, title: string) {
  return item.sections.find((section) => normalizar(section.title) === normalizar(title))?.content.trim() ?? null;
}

/**
 * Pantalla tipo "elige tu personaje": lista de clases a un lado,
 * arte grande y descripcion completa al otro. Sincroniza #slug en la URL.
 */
export default function ClassSelector({ items }: { items: CompendiumEntry[] }) {
  const [activeSlug, setActiveSlug] = useState(items[0]?.slug);

  useEffect(() => {
    const fromHash = window.location.hash.slice(1);
    if (items.some((item) => item.slug === fromHash)) setActiveSlug(fromHash);
  }, [items]);

  function select(slug: string) {
    setActiveSlug(slug);
    window.history.replaceState(null, "", `#${slug}`);
  }

  const active = items.find((item) => item.slug === activeSlug) ?? items[0];
  if (!active) return null;

  const descripcion = sectionText(active, "Descripción") ?? active.description;
  const nota = sectionText(active, "Nota");

  return (
    <div className="grid gap-8 lg:grid-cols-12 lg:gap-10">
      {/* Lista de clases */}
      <div
        role="tablist"
        aria-label="Clases"
        aria-orientation="vertical"
        className="-mx-6 flex snap-x gap-3 overflow-x-auto px-6 pb-2 lg:col-span-4 lg:mx-0 lg:flex-col lg:overflow-visible lg:px-0"
      >
        {items.map((item) => {
          const selected = item.slug === active.slug;
          return (
            <button
              key={item.slug}
              type="button"
              role="tab"
              id={`tab-${item.slug}`}
              aria-selected={selected}
              aria-controls="panel-clase"
              onClick={() => select(item.slug)}
              className={`group flex min-w-[220px] snap-start items-center gap-4 rounded-2xl p-3 text-left ring-1 transition duration-200 motion-safe:active:scale-[0.98] lg:min-w-0 ${
                selected
                  ? "bg-selva-800 ring-oro-400/70"
                  : "bg-selva-800/30 ring-selva-700/70 hover:bg-selva-800/70 hover:ring-selva-600"
              }`}
            >
              <span
                className={`relative h-16 w-16 shrink-0 overflow-hidden rounded-xl bg-gradient-to-b ${
                  selected ? "from-jade-400/30 to-selva-900" : "from-selva-700/60 to-selva-900"
                }`}
              >
                {item.coverImageSrc ? (
                  <Image src={variante(item.coverImageSrc, 160)} alt="" fill className="object-cover object-top" sizes="64px" />
                ) : null}
              </span>
              <span className="min-w-0">
                <span
                  className={`block font-display text-lg transition-colors ${
 selected ? "text-jade-400": "text-selva-100 group-hover:text-jade-300"
 }`}
                >
                  {item.name}
                </span>
                <span className="block truncate text-xs uppercase tracking-wider text-selva-400">
                  {item.tags.slice(0, 2).join(" · ")}
                </span>
              </span>
            </button>
          );
        })}
      </div>

      {/* Panel de la clase activa */}
      <article
        id="panel-clase"
        role="tabpanel"
        aria-labelledby={`tab-${active.slug}`}
        className="overflow-hidden rounded-3xl bg-selva-800/40 ring-1 ring-selva-700/70 lg:col-span-8"
      >
        <div className="grid md:grid-cols-5">
          <div className="relative min-h-[380px] bg-gradient-to-b from-jade-400/20 via-selva-800/40 to-selva-900 md:col-span-2 md:min-h-[560px]">
            {active.coverImageSrc ? (
              <Image
                key={active.slug}
                src={variante(active.coverImageSrc, 1200)}
                alt={active.coverImageAlt || active.name}
                fill
                className="animate-fade-in object-contain p-4"
                sizes="(max-width: 768px) 100vw, 360px"
                priority
              />
            ) : (
              <Pendiente id="clases-arte" variante="compacto" className="absolute inset-6" />
            )}
          </div>

          <div className="p-6 md:col-span-3 md:p-8">
            <h2 className="mb-3 font-display text-3xl text-jade-400 md:text-4xl">{active.name}</h2>
            <div className="mb-6 flex flex-wrap gap-2">
              {active.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full bg-turquesa-400/10 px-3 py-1 text-xs font-medium text-turquesa-200 ring-1 ring-turquesa-400/25"
                >
                  {tag}
                </span>
              ))}
            </div>

            <div className="max-h-[420px] space-y-6 overflow-y-auto pr-2">
              <p className="whitespace-pre-line text-base leading-8 text-selva-300">{descripcion}</p>
              {nota ? (
                <div className="rounded-xl bg-selva-900/70 p-5 ring-1 ring-selva-700/70">
                  <p className="mb-1 text-xs font-semibold uppercase tracking-[0.2em] text-oro-400/90">Nota</p>
                  <p className="whitespace-pre-line text-sm leading-7 text-selva-300">{nota}</p>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </article>
    </div>
  );
}
