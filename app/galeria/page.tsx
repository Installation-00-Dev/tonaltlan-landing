import SectionHeader from "@/components/compendio/SectionHeader";
import Image from "next/image";

export const metadata = {
  title: "Galeria - Tonaltlan",
  description: "Ilustraciones y arte visual del universo de Tonaltlan.",
};

const galleryImages = [
  "/preview/images/galeria/Alquemista.png",
  "/preview/images/galeria/Animista.png",
  "/preview/images/galeria/Mapa.webp",
  "/preview/images/galeria/Quesadillera.webp",
  "/preview/images/galeria/espiritu.png",
  "/preview/images/galeria/guerrera_aguila.png",
  "/preview/images/galeria/guerrero_rapado.png",
  "/preview/images/galeria/raza_fuego.png",
  "/preview/images/galeria/sacerdotiza_lok.png",
];

const pastelCardBackgrounds = [
  "bg-rose-100/20",
  "bg-amber-100/20",
  "bg-emerald-100/20",
  "bg-sky-100/20",
  "bg-violet-100/20",
  "bg-orange-100/20",
];

const collageAspectRatios = [
  "aspect-[3/4]",
  "aspect-[4/5]",
  "aspect-[5/4]",
  "aspect-[3/4]",
  "aspect-[4/3]",
  "aspect-[4/5]",
];

const collageRotations = [
  "rotate-[-1.2deg]",
  "rotate-[0.9deg]",
  "rotate-[-0.8deg]",
  "rotate-[1.1deg]",
  "rotate-[-0.6deg]",
  "rotate-[0.7deg]",
];

const collageOffsets = [
  "sm:mt-0",
  "sm:mt-6",
  "sm:mt-2",
  "sm:mt-8",
  "sm:mt-3",
  "sm:mt-10",
];

function getAltFromPath(src: string) {
  return src
    .split("/")
    .pop()
    ?.replace(/\.[^/.]+$/, "")
    .replace(/[_-]/g, " ")
    .trim() ?? "Ilustracion";
}

export default function GaleriaPage() {
  return (
    <div className="pb-16 pt-24 lg:pt-32">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <SectionHeader
          title="Galeria"
          subtitle="Todas las ilustraciones disponibles del mundo de Tonaltlan."
        />

        <div className="columns-1 gap-6 sm:columns-2 lg:columns-3">
          {galleryImages.map((src, index) => (
            <article
              key={src}
              className={[
                "group mb-6 break-inside-avoid overflow-hidden rounded-2xl border border-glass-border/70 bg-background/30 opacity-0 shadow-[0_18px_50px_rgba(0,0,0,0.22)] transition-all duration-300 ease-out hover:-translate-y-2 hover:rotate-0 hover:shadow-[0_24px_60px_rgba(0,0,0,0.3)] hover:ring-1 hover:ring-gold/30 animate-fade-in",
                pastelCardBackgrounds[index % pastelCardBackgrounds.length],
                collageRotations[index % collageRotations.length],
                collageOffsets[index % collageOffsets.length],
              ].join(" ")}
              style={{ animationDelay: `${index * 90}ms` }}
            >
              <div
                className={[
                  "relative w-full overflow-hidden",
                  collageAspectRatios[index % collageAspectRatios.length],
                ].join(" ")}
              >
                <Image
                  src={src}
                  alt={getAltFromPath(src)}
                  fill
                  priority={index < 3}
                  className="object-contain p-3 transition-transform duration-500 ease-out group-hover:scale-[1.03]"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
                <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/35 via-black/5 to-transparent px-4 pb-4 pt-10 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  <p className="text-sm font-medium tracking-wide text-white/90">{getAltFromPath(src)}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
