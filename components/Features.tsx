"use client";

import { features } from "@/lib/features";

export default function Features() {
  return (
    <section
      id="features"
      className="relative py-24 lg:py-32"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <h2 className="mb-16 text-center font-display text-3xl text-jade-400 md:text-4xl">
          Tonaltlan de un Vistazo
        </h2>

        <div className="grid gap-6 sm:grid-cols-2 lg:gap-8">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="group relative overflow-hidden rounded-2xl bg-selva-800/40 p-8 ring-1 ring-selva-700/70 transition-colors duration-200 hover:bg-selva-800/70 hover:ring-selva-600 md:p-10"
            >
              <div className="mb-6 inline-flex rounded-xl bg-oro-400/10 p-3.5 text-oro-300 ring-1 ring-oro-400/25">
                {feature.icon}
              </div>
              <h3 className="mb-3 font-display text-xl text-selva-100 md:text-2xl">
                {feature.title}
              </h3>
              <p className="text-sm leading-7 text-selva-300 md:text-base md:leading-7">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

