"use client";

import Link from "next/link";
import { useFadeIn } from "@/hooks/useFadeIn";

const exploreSections = [
  {
    title: "Clases",
    description: "Guerreros, sacerdotes, hechiceros y mas arquetipos del mundo antiguo.",
    tags: ["Combate", "Magia", "Sigilo"],
    href: "/clases",
  },
  {
    title: "Especies",
    description: "Seres nacidos del maiz, la obsidiana y el aliento de los dioses.",
    tags: ["Humanos", "Nahual", "Tlalocan"],
    href: "/especies",
  },
  {
    title: "Bestiario",
    description: "Criaturas del Mictlan y bestias de selvas y montanas sagradas.",
    tags: ["Mictlan", "Selva", "Celestial"],
    href: "/bestiario",
  },
  {
    title: "Monturas",
    description: "Companeros leales que surcan cielos, rios y caminos ancestrales.",
    tags: ["Voladora", "Acuatica", "Terrestre"],
    href: "/monturas",
  },
  {
    title: "Deidades",
    description: "Los dioses que tejen el destino del cosmos y sus elegidos.",
    tags: ["Creacion", "Destruccion", "Equilibrio"],
    href: "/deidades",
  },
  {
    title: "Galeria",
    description: "Arte conceptual, ilustraciones y vistazos al universo de Tonaltlan.",
    tags: ["Arte", "Conceptos", "Mapas"],
    href: "/galeria",
  },
];

/** `proximamente`: titulos de secciones que aun no tienen contenido. */
export default function ExplorePreview({ proximamente = [] }: { proximamente?: string[] }) {
  const sectionRef = useFadeIn<HTMLElement>();

  return (
    <section
      id="explorar-preview"
      ref={sectionRef}
      className="relative py-24 opacity-0 lg:py-32"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto mb-16 max-w-2xl text-center">
          <h2 className="mb-4 font-serif text-3xl font-bold tracking-wide text-amber-300 md:text-4xl">
            Explorar Tonaltlan
          </h2>
          <p className="text-base leading-relaxed text-slate-300 md:text-lg">
            Descubre los secretos del mundo mesoamericano a traves de su compendio viviente.
          </p>
        </div>

        {/* La tarjeta completa es el enlace: sin botones "Ver mas" repetidos */}
        <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
          {exploreSections.map((section) => (
            <li key={section.title} className="flex">
              <Link
                href={section.href}
                className="group relative flex w-full flex-col justify-between overflow-hidden rounded-2xl bg-slate-800/60 p-7 ring-1 ring-slate-700/80 transition duration-200 motion-safe:hover:-translate-y-1 motion-safe:active:scale-[0.98] hover:bg-slate-800 hover:shadow-xl hover:shadow-slate-950/50 hover:ring-amber-400/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-300 md:p-8"
              >
                <span
                  className="pointer-events-none absolute inset-x-0 top-0 h-0.5 origin-left scale-x-0 bg-gradient-to-r from-amber-400 via-amber-300 to-emerald-400 transition-transform duration-500 group-hover:scale-x-100"
                  aria-hidden="true"
                />

                <div>
                  <div className="mb-3 flex items-center justify-between gap-4">
                    <h3 className="font-serif text-xl font-semibold text-slate-100 transition-colors group-hover:text-amber-300">
                      {section.title}
                    </h3>
                    {proximamente.includes(section.title) ? (
                      <span className="shrink-0 rounded-full border border-dashed border-slate-600 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.15em] text-slate-400">
                        Próximamente
                      </span>
                    ) : (
                    <span
                      className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-slate-700/60 text-slate-300 transition duration-200 motion-safe:group-hover:translate-x-1 group-hover:bg-amber-400 group-hover:text-slate-950"
                      aria-hidden="true"
                    >
                      <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </span>
                    )}
                  </div>

                  <p className="mb-6 text-sm leading-relaxed text-slate-300 md:text-base">
                    {section.description}
                  </p>
                </div>

                <div className="flex flex-wrap gap-2 border-t border-slate-700/70 pt-4">
                  {section.tags.map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex rounded-full bg-emerald-400/10 px-3 py-1 text-xs font-medium text-emerald-300 ring-1 ring-emerald-400/20"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
