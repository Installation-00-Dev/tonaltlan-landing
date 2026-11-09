import ExplorarCliente, { type Resultado } from "@/components/paginas/ExplorarCliente";
import { getCompendio } from "@/lib/compendio";
import { ruta, t, type Lang } from "@/lib/i18n";
import { galleryImages, mountImages } from "@/lib/site";

export function metadataExplorar(lang: Lang) {
  const d = t(lang).paginas.explorar;
  return {
    title: `${d.titulo} - Tonaltlan`,
    description: d.subtitulo,
    alternates: {
      canonical: ruta(lang, "/explorar/"),
      languages: { es: "/explorar/", en: ruta("en", "/explorar/"), "x-default": "/explorar/" },
    },
  };
}

const conArte = (lista: { coverImageSrc?: string }[]) =>
  lista.map((item) => item.coverImageSrc).filter((src): src is string => Boolean(src));

/** /explorar: prepara en el servidor los datos del idioma y los pasa al buscador. */
export default function Explorar({ lang }: { lang: Lang }) {
  const { clases, especies, deidades, sectionsMeta } = getCompendio(lang);
  const tipos = t(lang).paginas.explorar.tipos;

  // Indice de busqueda: cada ficha del compendio.
  const indice: Resultado[] = [
    ...clases.map((c) => ({ name: c.name, description: c.description, tipo: tipos.clase, href: ruta(lang, `/clases/#${c.slug}`), tags: c.tags })),
    ...especies.map((e) => ({ name: e.name, description: e.description, tipo: tipos.especie, href: ruta(lang, `/especies/${e.slug}/`), tags: e.tags })),
    ...deidades.map((x) => ({ name: x.name, description: x.description, tipo: tipos.deidad, href: ruta(lang, `/deidades/${x.slug}/`), tags: x.tags })),
  ];

  // Arte de cada seccion para el abanico de miniaturas (hasta 3).
  const arteSeccion: Record<string, string[]> = {
    clases: conArte(clases).slice(0, 3),
    especies: conArte(especies).slice(0, 3),
    deidades: conArte(deidades).slice(0, 3),
    monturas: mountImages.slice(0, 3),
    galeria: galleryImages.filter((src) => !src.includes("Mapa")).slice(0, 3),
    bestiario: [],
  };

  const secciones = sectionsMeta.map((s) => ({ ...s, href: ruta(lang, `/${s.slug}/`) }));

  return <ExplorarCliente lang={lang} indice={indice} secciones={secciones} arteSeccion={arteSeccion} />;
}
