import About from "@/components/inicio/About";
import AnuncioEvento from "@/components/inicio/AnuncioEvento";
import ExplorePreview from "@/components/inicio/ExplorePreview";
import Features from "@/components/inicio/Features";
import Hero from "@/components/inicio/Hero";
import Newsletter from "@/components/inicio/Newsletter";
import Greca from "@/components/ui/Greca";
import { getCompendio } from "@/lib/compendio";
import { metaPagina, t, type Lang } from "@/lib/i18n";
import { getTextos } from "@/lib/textos";

export function metadataInicio(lang: Lang) {
  const d = t(lang).meta;
  return { ...metaPagina(lang, "/", d.title, d.description), title: { absolute: d.title } };
}

function Divider() {
  return (
    <div className="mx-auto max-w-7xl px-6 text-oro-400/35 lg:px-8">
      <Greca />
    </div>
  );
}

export default function Inicio({ lang }: { lang: Lang }) {
  // Secciones sin contenido todavia (se marcan "Próximamente" en la landing).
  const proximamente = getCompendio(lang)
    .sectionsMeta.filter((s) => s.count === 0)
    .map((s) => `/${s.slug}/`);
  return (
    <div className="relative overflow-hidden bg-selva-900 text-selva-100 selection:bg-oro-400/30 selection:text-oro-100">

      <div className="relative z-10">
        <AnuncioEvento lang={lang} noticia={getTextos(lang).noticias.find((n) => n.anuncioHasta)} />
        <Hero lang={lang} />
        <About lang={lang} />
        <Divider />
        <ExplorePreview proximamente={proximamente} lang={lang} />
        <Divider />
        <Features lang={lang} />
        <Divider />
        <Newsletter lang={lang} />
      </div>
    </div>
  );
}
