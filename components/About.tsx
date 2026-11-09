import Image from "next/image";
import { variante } from "@/lib/imagenes";
import { t, type Lang } from "@/lib/i18n";

export default function About({ lang = "es" }: { lang?: Lang }) {
  const d = t(lang).about;
  return (
    <section
      id="about"
      className="relative py-24 lg:py-32"
    >
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-6 lg:grid-cols-12 lg:gap-20 lg:px-8">
        {/* Text column */}
        <div className="flex flex-col justify-center lg:col-span-7">
          <div className="mb-4 flex items-center gap-3" aria-hidden="true">
            <span className="h-2 w-2 rotate-45 bg-oro-400" />
            <span className="h-px w-12 bg-gradient-to-r from-oro-400/70 to-transparent" />
          </div>

          <h2 className="mb-8 font-display text-3xl text-jade-400 md:text-4xl lg:text-5xl">
            {d.titulo}
          </h2>

          <div className="max-w-prose space-y-6 text-base leading-8 text-selva-300 md:text-lg md:leading-8">
            {d.parrafos.map((parrafo, i) => (
              <p key={i} className={i === 0 ? "text-selva-100" : undefined}>
                {parrafo}
              </p>
            ))}
          </div>
        </div>

        {/* Illustration panel */}
        <div className="flex items-center justify-center lg:col-span-5">
          <div className="group relative aspect-[4/3] w-full overflow-hidden rounded-2xl bg-selva-800 shadow-2xl shadow-selva-950/60 ring-1 ring-selva-700">
            <Image
              src={variante("/images/Piramide_onix_color_final_1.webp", 1200)}
              alt={d.imagenAlt}
              fill
              className="object-cover transition-transform duration-500 ease-out motion-safe:group-hover:scale-105"
              sizes="(max-width: 1024px) 100vw, 45vw"
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-selva-900/50 via-transparent to-transparent" />
            <div className="pointer-events-none absolute inset-3 rounded-xl ring-1 ring-oro-300/25" />
          </div>
        </div>
      </div>
    </section>
  );
}
