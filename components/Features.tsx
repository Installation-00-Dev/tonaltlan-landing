"use client";

import { useFadeIn } from "@/hooks/useFadeIn";
import { features } from "@/lib/features";

export default function Features() {
  const sectionRef = useFadeIn<HTMLElement>();

  return (
    <section
      id="features"
      ref={sectionRef}
      className="relative py-24 opacity-0 lg:py-32"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <h2 className="mb-16 text-center font-serif text-3xl font-bold tracking-wide text-amber-300 md:text-4xl">
          Tonaltlan de un Vistazo
        </h2>

        <div className="grid gap-6 sm:grid-cols-2 lg:gap-8">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="group relative overflow-hidden rounded-2xl bg-slate-800/40 p-8 ring-1 ring-slate-700/70 transition-colors duration-300 hover:bg-slate-800/70 hover:ring-slate-600 md:p-10"
            >
              <div className="mb-6 inline-flex rounded-xl bg-amber-400/10 p-3.5 text-amber-300 ring-1 ring-amber-400/25">
                {feature.icon}
              </div>
              <h3 className="mb-3 font-serif text-xl font-semibold text-slate-100 md:text-2xl">
                {feature.title}
              </h3>
              <p className="text-sm leading-7 text-slate-300 md:text-base md:leading-7">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

