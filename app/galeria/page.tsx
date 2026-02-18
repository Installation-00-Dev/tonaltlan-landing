import Image from "next/image";
import SectionHeader from "@/components/compendio/SectionHeader";

export const metadata = {
  title: "Galeria - Tonaltlan",
  description: "Arte conceptual, ilustraciones y vistazos al universo de Tonaltlan.",
};

// Use existing generated images as gallery placeholders
const galleryImages = [
  { src: "/preview/images/piramides_azteca_final.png", alt: "Piramides ancestrales de Tonaltlan bajo un cielo mistico", tall: true },
  { src: "/preview/images/about-illustration.jpg",     alt: "El mundo de Tonaltlan: selvas, piramides y energia cosmica", tall: false },
  { src: "/preview/images/update-1.jpg",               alt: "Codice antiguo con simbolos dorados flotantes", tall: false },
  { src: "/preview/images/update-2.jpg",               alt: "El inframundo del Mictlan y su senor esqueletico", tall: true },
  { src: "/preview/images/update-3.jpg",               alt: "Guerreros reunidos alrededor de un fuego ceremonial", tall: false },
  { src: "/preview/images/update-4.jpg",               alt: "Artista pintando glifos mesoamericanos en un codice", tall: false },
  { src: "/preview/images/book-cover.jpg",             alt: "Portada del manual basico con piedra del sol y obsidiana", tall: true },
];

export default function GaleriaPage() {
  return (
    <div className="pt-24 pb-16 lg:pt-32">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <SectionHeader
          title="Galeria"
          subtitle="Arte conceptual, ilustraciones y vistazos al universo de Tonaltlan. Proximamente se agregara mas contenido visual."
        />

        {/* Masonry-like grid using CSS columns */}
        <div className="columns-1 gap-6 sm:columns-2 lg:columns-3">
          {galleryImages.map((img) => (
            <div
              key={img.src}
              className="glass-card-hover mb-6 break-inside-avoid overflow-hidden rounded-xl"
            >
              <div className={`relative ${img.tall ? "aspect-[3/4]" : "aspect-[4/3]"}`}>
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
              </div>
              <div className="p-3">
                <p className="text-xs text-muted">{img.alt}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
