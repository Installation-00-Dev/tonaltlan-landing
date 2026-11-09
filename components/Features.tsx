import { features } from "@/lib/features";

/**
 * Formato editorial: titulo fijo a la izquierda y una lista con filetes a la
 * derecha. Sin tarjetas ni cuadros de iconos (para no repetir el mosaico).
 */
export default function Features() {
  return (
    <section id="features" className="relative py-24 lg:py-32">
      <div className="mx-auto grid max-w-7xl gap-12 px-6 lg:grid-cols-12 lg:gap-16 lg:px-8">
        <div className="lg:col-span-4">
          <h2 className="font-display text-4xl text-jade-400 [text-wrap:balance] md:text-5xl lg:sticky lg:top-28">
            Tonaltlan de un Vistazo
          </h2>
        </div>

        <dl className="divide-y divide-selva-700/70 border-y border-selva-700/70 lg:col-span-8">
          {features.map((feature) => (
            <div key={feature.title} className="grid gap-3 py-8 md:grid-cols-[minmax(0,15rem)_1fr] md:gap-10">
              <dt className="flex items-start gap-3 font-display text-2xl text-selva-50">
                <span className="mt-1 shrink-0 text-oro-400 [&>svg]:h-6 [&>svg]:w-6" aria-hidden="true">
                  {feature.icon}
                </span>
                {feature.title}
              </dt>
              <dd className="text-base leading-8 text-selva-300">{feature.description}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
