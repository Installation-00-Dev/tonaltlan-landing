import Hero from "@/components/Hero";
import About from "@/components/About";
import ExplorePreview from "@/components/ExplorePreview";
import Features from "@/components/Features";
import Newsletter from "@/components/Newsletter";
import { sectionsMeta } from "@/lib/data";

// Secciones sin contenido todavia (se marcan "Próximamente" en la landing).
const proximamente = sectionsMeta.filter((s) => s.count === 0).map((s) => s.title);

function Divider() {
  return (
    <div className="mx-auto flex max-w-5xl items-center gap-4 px-6" aria-hidden="true">
      <div className="h-px flex-1 bg-gradient-to-r from-transparent to-selva-700" />
      <div className="h-2 w-2 rotate-45 border border-oro-400/70 bg-oro-400/20" />
      <div className="h-px flex-1 bg-gradient-to-l from-transparent to-selva-700" />
    </div>
  );
}

export default function Home() {
  return (
    <div className="relative overflow-hidden bg-selva-900 text-selva-100 selection:bg-oro-400/30 selection:text-oro-100">
      {/* Resplandor solar sutil: inmersivo sin oscurecer la lectura */}
      <div className="pointer-events-none absolute inset-x-0 top-[100vh] z-0 h-[60rem]" aria-hidden="true">
        <div className="absolute left-1/2 top-0 h-[36rem] w-[36rem] -translate-x-1/2 rounded-full bg-oro-500/[0.06] blur-[160px]" />
      </div>

      <div className="relative z-10">
        <Hero />
        <About />
        <Divider />
        <ExplorePreview proximamente={proximamente} />
        <Divider />
        <Features />
        <Newsletter />
      </div>
    </div>
  );
}
