import DetailLayout from "@/components/compendio/DetailLayout";
import { getCompendio } from "@/lib/compendio";
import { metaPagina, ruta, t, type Lang } from "@/lib/i18n";

/** Slugs para generateStaticParams (iguales en ambos idiomas). */
export function slugsEspecies() {
  return getCompendio("es").especies.map((e) => ({ slug: e.slug }));
}

export function slugsDeidades() {
  return getCompendio("es").deidades.map((d) => ({ slug: d.slug }));
}

export function metadataEspecie(lang: Lang, slug: string) {
  const item = getCompendio(lang).especies.find((e) => e.slug === slug);
  const d = t(lang);
  if (!item) return { title: d.comun.noEncontrado };
  return metaPagina(lang, `/especies/${slug}/`, `${item.name} - ${d.paginas.especies.sufijo} - Tonaltlan`, item.description);
}

export function metadataDeidad(lang: Lang, slug: string) {
  const item = getCompendio(lang).deidades.find((e) => e.slug === slug);
  const d = t(lang);
  if (!item) return { title: d.comun.noEncontrado };
  return metaPagina(lang, `/deidades/${slug}/`, `${item.name} - ${d.paginas.deidades.sufijo} - Tonaltlan`, item.description);
}

export function DetalleEspecie({ lang, slug }: { lang: Lang; slug: string }) {
  const { especies, deidades } = getCompendio(lang);
  const item = especies.find((e) => e.slug === slug);
  if (!item) return null;
  const d = t(lang).paginas.especies;
  const deidad = deidades.find((x) => x.slug === item.deidad);
  return (
    <DetailLayout
      lang={lang}
      title={item.name}
      tags={item.tags}
      sections={item.sections}
      coverImageSrc={item.coverImageSrc}
      coverImageAlt={item.coverImageAlt}
      accent={item.deidad}
      related={
        deidad
          ? { label: d.linaje, items: [{ name: deidad.name, href: ruta(lang, `/deidades/${deidad.slug}/`) }] }
          : undefined
      }
      backHref={ruta(lang, "/especies/")}
      backLabel={d.volver}
    />
  );
}

export function DetalleDeidad({ lang, slug }: { lang: Lang; slug: string }) {
  const { especies, deidades } = getCompendio(lang);
  const item = deidades.find((x) => x.slug === slug);
  if (!item) return null;
  const d = t(lang).paginas.deidades;
  return (
    <DetailLayout
      lang={lang}
      title={item.name}
      tags={item.tags}
      sections={item.sections}
      coverImageSrc={item.coverImageSrc}
      coverImageAlt={item.coverImageAlt}
      accent={item.slug}
      related={{
        label: d.suLinaje,
        items: especies
          .filter((e) => e.deidad === item.slug)
          .map((e) => ({ name: e.name, href: ruta(lang, `/especies/${e.slug}/`) })),
      }}
      backHref={ruta(lang, "/deidades/")}
      backLabel={d.volver}
    />
  );
}
