import Image from "next/image";
import Link from "next/link";
import SectionHeader from "@/components/compendio/SectionHeader";
import Pendiente from "@/components/ui/Pendiente";
import { deidades, especies } from "@/lib/data";
import { themeFor } from "@/lib/site";
import { variante } from "@/lib/imagenes";

export const metadata = {
  title: "Deidades - Tonaltlan",
  description: "Los dioses del panteón mesoamericano de Tonaltlan y sus dominios.",
};

export default function DeidadesPage() {
  return (
    <div className="pb-24 pt-28 lg:pt-36">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <SectionHeader
          eyebrow="Compendio"
          eyebrowHref="/explorar"
          title="Deidades"
          subtitle="Los dioses que tejen el destino del cosmos y sus elegidos."
        />

        {/* Panteon: acceso rapido con el color de cada dios */}
        <nav aria-label="Panteón" className="mb-16 grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-7">
          {deidades.map((deidad) => {
            const theme = themeFor(deidad.slug);
            return (
              <a
                key={deidad.slug}
                href={`#${deidad.slug}`}
                className={`group flex flex-col items-center gap-2 rounded-2xl bg-selva-800/40 p-3 text-center ring-1 transition hover:bg-selva-800 ${theme.ring}`}
              >
                <span className={`relative h-16 w-16 overflow-hidden rounded-full bg-gradient-to-b ${theme.glow}`}>
                  {deidad.coverImageSrc ? (
                    <Image src={variante(deidad.coverImageSrc, 1200)} alt="" fill className="object-cover object-top" sizes="64px" />
                  ) : null}
                </span>
                <span className={`font-display text-sm ${theme.text}`}>{deidad.name}</span>
              </a>
            );
          })}
        </nav>

        <div className="mb-20">
          <Pendiente id="omet" />
        </div>

        <div className="space-y-24">
          {deidades.map((deidad, index) => {
            const theme = themeFor(deidad.slug);
            const linaje = especies.filter((especie) => especie.deidad === deidad.slug);
            const reverse = index % 2 === 1;

            return (
              <section key={deidad.slug} id={deidad.slug} className="grid scroll-mt-28 items-center gap-10 lg:grid-cols-2 lg:gap-16">
                <div
                  className={`relative aspect-[4/5] overflow-hidden rounded-3xl bg-gradient-to-b ring-1 ring-selva-700/70 ${theme.glow} ${
                    reverse ? "lg:order-2" : ""
                  }`}
                >
                  {deidad.coverImageSrc ? (
                    <Image
                      src={variante(deidad.coverImageSrc, 1200)}
                      alt={deidad.coverImageAlt || deidad.name}
                      fill
                      className="object-contain p-6"
                      sizes="(max-width: 1024px) 100vw, 600px"
                    />
                  ) : (
                    <Pendiente id="deidades-arte" variante="compacto" className="absolute inset-8" />
                  )}
                </div>

                <div>
                  <span className={`mb-4 block h-1 w-16 rounded-full ${theme.bar}`} aria-hidden="true" />
                  <h2 className={`mb-4 font-display text-4xl md:text-5xl ${theme.text}`}>{deidad.name}</h2>
                  <p className="mb-6 text-lg leading-8 text-selva-300">{deidad.description}</p>
                  <div className="mb-8 flex flex-wrap gap-2">
                    {deidad.tags.map((tag) => (
                      <span key={tag} className={`rounded-full px-3 py-1 text-xs font-medium ring-1 ${theme.chip}`}>
                        {tag}
                      </span>
                    ))}
                  </div>

                  {linaje.length > 0 ? (
                    <div className="mb-8">
                      <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-selva-500">Su linaje</p>
                      <div className="flex flex-wrap gap-2">
                        {linaje.map((especie) => (
                          <Link
                            key={especie.slug}
                            href={`/especies/${especie.slug}`}
                            className="rounded-full bg-selva-800 px-4 py-2 text-sm font-medium text-selva-100 ring-1 ring-selva-700 transition-colors hover:ring-selva-500"
                          >
                            {especie.name}
                          </Link>
                        ))}
                      </div>
                    </div>
                  ) : null}

                  <Link
                    href={`/deidades/${deidad.slug}`}
                    className={`inline-flex items-center gap-2 font-semibold ${theme.text} hover:underline`}
                  >
                    Leer su historia
                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5-5 5M6 12h12" />
                    </svg>
                  </Link>
                </div>
              </section>
            );
          })}
        </div>
      </div>
    </div>
  );
}
