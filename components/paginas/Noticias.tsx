import Image from "next/image";
import SectionHeader from "@/components/compendio/SectionHeader";
import Pendiente from "@/components/ui/Pendiente";
import { metaPagina, t, type Lang } from "@/lib/i18n";
import { variante } from "@/lib/imagenes";
import { getTextos } from "@/lib/textos";

export function metadataNoticias(lang: Lang) {
  const d = t(lang).paginas.noticias;
  return metaPagina(lang, "/noticias/", d.meta, d.metaDesc);
}

export default function Noticias({ lang }: { lang: Lang }) {
  const d = t(lang).paginas.noticias;
  const noticias = getTextos(lang).noticias;
  return (
    <div className="pb-24 pt-28 lg:pt-36">
      <div className="mx-auto max-w-4xl px-6 lg:px-8">
        <SectionHeader lang={lang} eyebrow="Estudio" title={d.titulo} />

        <div className="mb-12 space-y-12">
          {noticias.map((noticia) => (
            <article key={noticia.id} id={noticia.id} className="grid scroll-mt-28 gap-8 md:grid-cols-5 md:items-center">
              <div className="grid grid-cols-2 gap-3 md:col-span-3">
                {noticia.imagenes.map((imagen, index) => (
                  <a
                    key={imagen.src}
                    href={imagen.src}
                    target="_blank"
                    rel="noopener"
                    className="relative block aspect-[1131/1600] overflow-hidden rounded-2xl bg-selva-800 ring-1 ring-selva-700/70 transition duration-200 hover:ring-jade-400/70 motion-safe:active:scale-[0.98]"
                  >
                    <Image
                      src={variante(imagen.src, 480)}
                      alt={imagen.alt}
                      fill
                      priority={index === 0}
                      className="object-cover"
                      sizes="(max-width: 768px) 50vw, 260px"
                    />
                  </a>
                ))}
              </div>
              <div className="md:col-span-2">
                <p className="text-sm font-medium text-turquesa-300">{noticia.fecha}</p>
                <h2 className="mt-2 font-display text-3xl leading-tight text-jade-400 md:text-4xl">{noticia.titulo}</h2>
                <p className="mt-2 text-base font-medium text-selva-100">{noticia.lugar}</p>
                <div className="mt-5 space-y-2 text-base leading-7 text-selva-300">
                  {noticia.texto.map((linea) => (
                    <p key={linea}>{linea}</p>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>

        <Pendiente id="noticias" lang={lang} />
      </div>
    </div>
  );
}
