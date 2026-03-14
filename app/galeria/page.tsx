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
  "bg-rose-100/32",
  "bg-amber-100/32",
  "bg-emerald-100/30",
  "bg-sky-100/32",
  "bg-violet-100/30",
  "bg-orange-100/32",
];

const collageAspectRatios = [
  "aspect-[3/4]",
  "aspect-[4/5]",
  "aspect-[6/5]",
  "aspect-[3/4]",
  "aspect-[5/4]",
  "aspect-[4/5]",
];

const collageRotations = [
  "rotate-[-2.2deg]",
  "rotate-[1.8deg]",
  "rotate-[-1.5deg]",
  "rotate-[2.1deg]",
  "rotate-[-1.1deg]",
  "rotate-[1.4deg]",
];

const collageOffsets = [
  "sm:mt-0",
  "sm:mt-8",
  "sm:mt-3",
  "sm:mt-10",
  "sm:mt-5",
  "sm:mt-12",
];

const collageShifts = [
  "sm:translate-x-0",
  "sm:translate-x-2",
  "sm:-translate-x-3",
  "sm:translate-x-4",
  "sm:-translate-x-2",
  "sm:translate-x-1",
];

function getLabelFromPath(src: string) {
  const raw = src
    .split("/")
    .pop()
    ?.replace(/\.[^/.]+$/, "")
    .replace(/[_-]/g, " ")
    .trim();

  if (!raw) return "Ilustracion";

  return raw
    .split(/\s+/)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
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
                "group mb-7 break-inside-avoid overflow-hidden rounded-[1.4rem] border border-glass-border/70 bg-background/35 opacity-0 shadow-[0_18px_50px_rgba(0,0,0,0.22)] transition-all duration-300 ease-out hover:-translate-y-3 hover:rotate-0 hover:shadow-[0_24px_60px_rgba(0,0,0,0.3)] hover:ring-1 hover:ring-gold/30 animate-fade-in",
                pastelCardBackgrounds[index % pastelCardBackgrounds.length],
                collageRotations[index % collageRotations.length],
                collageOffsets[index % collageOffsets.length],
                collageShifts[index % collageShifts.length],
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
                  alt={getLabelFromPath(src)}
                  fill
                  priority={index < 3}
                  className="object-contain p-4 transition-transform duration-500 ease-out group-hover:scale-[1.04]"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
                <div className="pointer-events-none absolute inset-0 rounded-[1.4rem] ring-1 ring-white/10 ring-inset" />
                <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/55 via-black/12 to-transparent px-5 pb-5 pt-14 opacity-80 transition-opacity duration-300 group-hover:opacity-100">
                  <p className="font-serif text-lg font-semibold tracking-[0.08em] text-white drop-shadow-[0_2px_10px_rgba(0,0,0,0.45)]">
                    {getLabelFromPath(src)}
                  </p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
