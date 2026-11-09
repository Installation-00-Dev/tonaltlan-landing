import Hero from "@/components/Hero";
import About from "@/components/About";
import ExplorePreview from "@/components/ExplorePreview";
import Features from "@/components/Features";
import Newsletter from "@/components/Newsletter";

export default function Home() {
  return (
    <div className="relative overflow-hidden bg-[#07070a] text-foreground selection:bg-gold/30 selection:text-gold-light">
      {/* Resplandores rituales mesoamericanos: Obsidiana, Oro Solar y Energia Tonal */}
      <div
        className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
        aria-hidden="true"
      >
        <div className="absolute -top-40 left-1/4 h-[32rem] w-[32rem] rounded-full bg-gold/5 blur-[140px]" />
        <div className="absolute top-1/3 -right-32 h-[28rem] w-[28rem] rounded-full bg-teal/5 blur-[140px]" />
        <div className="absolute bottom-10 left-1/3 h-[24rem] w-[24rem] rounded-full bg-jade/5 blur-[150px]" />
      </div>

      <div className="relative z-10">
        <Hero />

        {/* Divisor de codice solar */}
        <div className="mx-auto flex max-w-5xl items-center gap-4 px-6" aria-hidden="true">
          <div className="h-px flex-1 bg-gradient-to-r from-transparent via-gold/35 to-gold/10" />
          <div className="h-2.5 w-2.5 rotate-45 border border-gold/60 bg-gold/20" />
          <div className="h-px flex-1 bg-gradient-to-l from-transparent via-gold/35 to-gold/10" />
        </div>

        <About />

        {/* Divisor de energia Tonal */}
        <div className="mx-auto flex max-w-5xl items-center gap-4 px-6" aria-hidden="true">
          <div className="h-px flex-1 bg-gradient-to-r from-transparent via-teal/30 to-teal/10" />
          <div className="h-2 w-2 rotate-45 bg-teal/50 shadow-[0_0_10px_rgba(45,212,191,0.6)]" />
          <div className="h-px flex-1 bg-gradient-to-l from-transparent via-teal/30 to-teal/10" />
        </div>

        <ExplorePreview />

        {/* Divisor de codice solar */}
        <div className="mx-auto flex max-w-5xl items-center gap-4 px-6" aria-hidden="true">
          <div className="h-px flex-1 bg-gradient-to-r from-transparent via-gold/35 to-gold/10" />
          <div className="h-2.5 w-2.5 rotate-45 border border-gold/60 bg-gold/20" />
          <div className="h-px flex-1 bg-gradient-to-l from-transparent via-gold/35 to-gold/10" />
        </div>

        <Features />

        <Newsletter />
      </div>
    </div>
  );
}

