import Hero from "@/components/Hero";
import About from "@/components/About";
import ExplorePreview from "@/components/ExplorePreview";
import Features from "@/components/Features";
import Newsletter from "@/components/Newsletter";
import Greca from "@/components/ui/Greca";
import { sectionsMeta } from "@/lib/data";

// Secciones sin contenido todavia (se marcan "Próximamente" en la landing).
const proximamente = sectionsMeta.filter((s) => s.count === 0).map((s) => s.title);

function Divider() {
  return (
    <div className="mx-auto max-w-7xl px-6 text-oro-400/35 lg:px-8">
      <Greca />
    </div>
  );
}

export default function Home() {
  return (
    <div className="relative overflow-hidden bg-selva-900 text-selva-100 selection:bg-oro-400/30 selection:text-oro-100">

      <div className="relative z-10">
        <Hero />
        <About />
        <Divider />
        <ExplorePreview proximamente={proximamente} />
        <Divider />
        <Features />
        <Divider />
        <Newsletter />
      </div>
    </div>
  );
}
