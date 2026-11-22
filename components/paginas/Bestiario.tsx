import Image from "next/image";
import SectionHeader from "@/components/compendio/SectionHeader";
import { metaPagina, ruta, t, type Lang } from "@/lib/i18n";
import { variante } from "@/lib/imagenes";
import { bestiaryImages } from "@/lib/site";

export function metadataBestiario(lang: Lang) {
  const d = t(lang).paginas.bestiario;
  return metaPagina(lang, "/bestiario/", d.meta, d.subtitulo);
}

function Campo({ className = "" }: { className?: string }) {
  return <span className={`block h-3 rounded bg-selva-700/70 ${className}`} />;
}

export default function Bestiario({ lang }: { lang: Lang }) {
  const d = t(lang).paginas.bestiario;
  return (
    <div className="pb-24 pt-28 lg:pt-36">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <SectionHeader
          lang={lang}
          eyebrow={t(lang).comun.compendio}
          eyebrowHref={ruta(lang, "/explorar/")}
          title={d.titulo}
          subtitle={d.subtitulo}
        />

        <div className="mb-10 flex flex-wrap items-center gap-2">
          <span className="mr-2 text-xs font-semibold uppercase tracking-[0.2em] text-selva-400">{d.region}</span>
          {d.regiones.map((region) => (
            <span
              key={region}
              className="rounded-full bg-selva-800/60 px-4 py-2 text-sm font-medium text-selva-300 ring-1 ring-selva-700"
            >
              {region}
            </span>
          ))}
        </div>

        {/* Cada criatura con su arte; las estadisticas quedan como esqueleto hasta tener la ficha */}
        <ul className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {bestiaryImages.map((criatura, index) => {
            const nombre = criatura.nombre;
            return (
              <li key={criatura.src}>
                <article className="h-full overflow-hidden rounded-3xl bg-selva-800/40 ring-1 ring-selva-700/70">
                  <div className="relative aspect-[4/5] bg-gradient-to-b from-violet-500/15 via-selva-800/40 to-selva-900">
                    <Image
                      src={variante(criatura.src, 1200)}
                      alt={nombre}
                      fill
                      priority={index < 3}
                      className="object-contain p-6"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 400px"
                    />
                  </div>
                  <div className="space-y-5 p-6">
                    <h2 className="font-display text-3xl text-jade-400">{nombre}</h2>
                    <div className="h-px bg-gradient-to-r from-oro-400/60 to-transparent" />
                    <div className="grid grid-cols-3 gap-3 text-xs" aria-hidden="true">
                      {d.stats.map((label) => (
                        <div key={label} className="rounded-lg bg-selva-900/60 p-3">
                          <p className="mb-2 font-semibold uppercase tracking-wider text-oro-400/90">{label}</p>
                          <Campo className="w-2/3" />
                        </div>
                      ))}
                    </div>
                    <div className="grid grid-cols-6 gap-1.5 text-center text-[11px]" aria-hidden="true">
                      {d.atributos.map((attr) => (
                        <div key={attr} className="rounded-lg bg-selva-900/60 px-1 py-2">
                          <p className="mb-2 font-semibold text-selva-400">{attr}</p>
                          <Campo className="mx-auto w-5" />
                        </div>
                      ))}
                    </div>
                  </div>
                </article>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
