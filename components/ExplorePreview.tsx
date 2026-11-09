"use client";

import Link from "next/link";

const exploreSections = [
  {
    title: "Clases",
    description: "Guerreros, sacerdotes, hechiceros y más arquetipos del mundo antiguo.",
    tags: ["Combate", "Magia", "Sigilo"],
    href: "/clases",
  },
  {
    title: "Especies",
    description: "Seres nacidos del maíz, la obsidiana y el aliento de los dioses.",
    tags: ["Humanos", "Nahual", "Tlalocan"],
    href: "/especies",
  },
  {
    title: "Bestiario",
    description: "Criaturas del Mictlan y bestias de selvas y montañas sagradas.",
    tags: ["Mictlan", "Selva", "Celestial"],
    href: "/bestiario",
  },
  {
    title: "Monturas",
    description: "Compañeros leales que surcan cielos, ríos y caminos ancestrales.",
    tags: ["Voladora", "Acuática", "Terrestre"],
    href: "/monturas",
  },
  {
    title: "Deidades",
    description: "Los dioses que tejen el destino del cosmos y sus elegidos.",
    tags: ["Creación", "Destrucción", "Equilibrio"],
    href: "/deidades",
  },
  {
    title: "Galería",
    description: "Arte conceptual, ilustraciones y vistazos al universo de Tonaltlan.",
    tags: ["Arte", "Conceptos", "Mapas"],
    href: "/galeria",
  },
];

/** `proximamente`: titulos de secciones que aun no tienen contenido. */
export default function ExplorePreview({ proximamente = [] }: { proximamente?: string[] }) {
  return (
    <section
      id="explorar-preview"
      className="relative py-24 lg:py-32"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto mb-16 max-w-2xl text-center">
          <h2 className="mb-4 font-display text-3xl text-jade-400 md:text-4xl">
            Explorar Tonaltlan
          </h2>
          <p className="text-base leading-relaxed text-selva-300 md:text-lg">
            Descubre los secretos del mundo mesoamericano a través de su compendio viviente.
          </p>
        </div>

        {/* La tarjeta completa es el enlace: sin botones "Ver mas" repetidos */}
        <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
          {exploreSections.map((section) => (
            <li key={section.title} className="flex">
              <Link
                href={section.href}
                className="group relative flex w-full flex-col justify-between overflow-hidden rounded-2xl bg-selva-800/60 p-7 ring-1 ring-selva-700/80 transition duration-200 motion-safe:hover:-translate-y-1 motion-safe:active:scale-[0.98] hover:bg-selva-800 hover:shadow-xl hover:shadow-selva-950/50 hover:ring-oro-400/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-oro-300 md:p-8"
              >
                <span
                  className="pointer-events-none absolute inset-x-0 top-0 h-0.5 origin-left scale-x-0 bg-gradient-to-r from-oro-400 via-oro-300 to-turquesa-400 transition-transform duration-500 group-hover:scale-x-100"
                  aria-hidden="true"
                />

                <div>
                  <div className="mb-3 flex items-center justify-between gap-4">
                    <h3 className="font-display text-xl text-selva-100 transition-colors group-hover:text-jade-300">
                      {section.title}
                    </h3>
                    {proximamente.includes(section.title) ? (
                      <span className="shrink-0 rounded-full border border-dashed border-selva-600 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.15em] text-selva-400">
                        Próximamente
                      </span>
                    ) : (
                    <span
                      className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-selva-700/60 text-selva-300 transition duration-200 motion-safe:group-hover:translate-x-1 group-hover:bg-oro-400 group-hover:text-selva-950"
                      aria-hidden="true"
                    >
                      <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </span>
                    )}
                  </div>

                  <p className="mb-6 text-sm leading-relaxed text-selva-300 md:text-base">
                    {section.description}
                  </p>
                </div>

                <div className="flex flex-wrap gap-2 border-t border-selva-700/70 pt-4">
                  {section.tags.map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex rounded-full bg-turquesa-400/10 px-3 py-1 text-xs font-medium text-turquesa-300 ring-1 ring-turquesa-400/20"
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
