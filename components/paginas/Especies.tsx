import Image from "next/image";
import Link from "next/link";
import SectionHeader from "@/components/compendio/SectionHeader";
import Pendiente from "@/components/ui/Pendiente";
import { getCompendio } from "@/lib/compendio";
import type { CompendiumEntry } from "@/lib/data";
import { metaPagina, ruta, t, type Lang } from "@/lib/i18n";
import { themeFor } from "@/lib/site";
import { getTextos } from "@/lib/textos";
import { variante } from "@/lib/imagenes";

export function metadataEspecies(lang: Lang) {
  const d = t(lang).paginas.especies;
  return metaPagina(lang, "/especies/", d.meta, d.metaDesc);
}

export default function Especies({ lang }: { lang: Lang }) {
  const { deidades, especies } = getCompendio(lang);
  const textosEspecies = getTextos(lang).especies;
  const d = t(lang).paginas.especies;
  // Agrupa las especies por la deidad de la que descienden, en el orden del panteon.
  const linajes = deidades
    .map((deidad) => ({ deidad, especies: especies.filter((especie) => especie.deidad === deidad.slug) }))
    .filter((linaje) => linaje.especies.length > 0);
  const sinLinaje = especies.filter((especie) => !deidades.some((deidad) => deidad.slug === especie.deidad));

  return (
    <div className="pb-24 pt-28 lg:pt-36">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <SectionHeader
          lang={lang}
          eyebrow={t(lang).comun.compendio}
          eyebrowHref={ruta(lang, "/explorar/")}
          title={textosEspecies.titulo}
          lema={textosEspecies.lema}
          subtitle={textosEspecies.intro}
        />

        {/* Indice de linajes */}
        <nav aria-label={d.linajesAria} className="mb-14 flex flex-wrap gap-2">
          {linajes.map(({ deidad }) => {
            const theme = themeFor(deidad.slug);
            return (
              <a
                key={deidad.slug}
                href={`#linaje-${deidad.slug}`}
                className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium ring-1 transition-colors ${theme.chip} hover:bg-selva-800`}
              >
                <span className={`h-2 w-2 rounded-full ${theme.bar}`} aria-hidden="true" />
                {deidad.name}
              </a>
            );
          })}
        </nav>

        <div className="space-y-14">
          {linajes.map(({ deidad, especies: grupo }) => {
            const theme = themeFor(deidad.slug);
            return (
              <section
                key={deidad.slug}
                id={`linaje-${deidad.slug}`}
                className="grid scroll-mt-28 gap-6 border-t border-selva-800 pt-10 lg:grid-cols-12 lg:gap-10"
              >
                <div className="lg:col-span-4">
                  <span className={`mb-4 block h-1 w-12 rounded-full ${theme.bar}`} aria-hidden="true" />
                  <h2 className={`mb-2 font-display text-3xl ${theme.text}`}>{d.hijosDe} {deidad.name}</h2>
                  <p className="mb-4 text-sm leading-relaxed text-selva-400">{deidad.description}</p>
                  <Link href={ruta(lang, `/deidades/${deidad.slug}/`)} className={`text-sm font-medium ${theme.text} hover:underline`}>
                    {deidad.name} →
                  </Link>
                </div>

                <div className="grid gap-6 lg:col-span-8">
                  {grupo.map((especie) => (
                    <EspecieCard key={especie.slug} especie={especie} lang={lang} />
                  ))}
                </div>
              </section>
            );
          })}

          {/* Tlacas: octava especie, sin afinidad elemental (ficha pendiente) */}
          <section id="tlacas" className="scroll-mt-28 border-t border-selva-800 pt-10">
            <Pendiente id="especie-tlacas" lang={lang} />
          </section>

          {sinLinaje.length > 0 ? (
            <section className="grid gap-6 md:grid-cols-2">
              {sinLinaje.map((especie) => (
                <EspecieCard key={especie.slug} especie={especie} lang={lang} />
              ))}
            </section>
          ) : null}
        </div>
      </div>
    </div>
  );
}

function EspecieCard({ especie, lang }: { especie: CompendiumEntry; lang: Lang }) {
  const theme = themeFor(especie.deidad);
  return (
    <Link
      href={ruta(lang, `/especies/${especie.slug}/`)}
      className={`group grid overflow-hidden rounded-2xl bg-selva-800/40 ring-1 transition duration-200 motion-safe:hover:-translate-y-1 motion-safe:active:scale-[0.98] hover:bg-selva-800/70 sm:grid-cols-5 ${theme.ring}`}
    >
      <div className={`relative min-h-[260px] bg-gradient-to-b sm:col-span-2 ${theme.glow}`}>
        {especie.coverImageSrc ? (
          <Image
            src={variante(especie.coverImageSrc, 480)}
            alt={especie.coverImageAlt || especie.name}
            fill
            className="object-contain p-3 transition-transform duration-500 motion-safe:group-hover:scale-105"
            sizes="(max-width: 640px) 100vw, 240px"
          />
        ) : (
          <Pendiente id="especies-arte" variante="compacto" className="absolute inset-4" lang={lang} />
        )}
      </div>
      <div className="flex flex-col p-6 sm:col-span-3">
        <h3 className={`mb-2 font-display text-2xl ${theme.text}`}>{especie.name}</h3>
        <p className="mb-5 flex-1 text-sm leading-7 text-selva-300">{especie.description}</p>
        <div className="flex flex-wrap gap-2">
          {especie.tags.map((tag) => (
            <span key={tag} className={`rounded-full px-3 py-1 text-xs font-medium ring-1 ${theme.chip}`}>
              {tag}
            </span>
          ))}
        </div>
      </div>
    </Link>
  );
}
