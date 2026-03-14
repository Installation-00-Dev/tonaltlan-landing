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
            <article key={src} className="mb-6 break-inside-avoid overflow-hidden rounded-xl border border-glass-border/70 bg-background/30">
              <div className="relative aspect-[3/4] w-full">
                <Image
                  src={src}
                  alt={getAltFromPath(src)}
                  fill
                  priority={index < 3}
                  className="object-contain p-2"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
