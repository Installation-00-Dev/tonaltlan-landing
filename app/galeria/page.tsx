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

const pastelOverlayTints = [
  "bg-rose-200/20",
  "bg-amber-200/20",
  "bg-emerald-200/20",
  "bg-sky-200/20",
  "bg-violet-200/20",
  "bg-orange-200/20",
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
                "group mb-6 break-inside-avoid overflow-hidden rounded-[1.4rem] border border-glass-border/70 bg-background/35 opacity-0 shadow-[0_18px_50px_rgba(0,0,0,0.22)] transition-all duration-300 ease-out hover:-translate-y-2 hover:shadow-[0_24px_60px_rgba(0,0,0,0.3)] hover:ring-1 hover:ring-gold/30 animate-fade-in",
                pastelCardBackgrounds[index % pastelCardBackgrounds.length],
              ].join(" ")}
              style={{ animationDelay: `${index * 90}ms` }}
            >
              <div className="relative aspect-[3/4] w-full overflow-hidden">
                <Image
                  src={src}
                  alt={getLabelFromPath(src)}
                  fill
                  priority={index < 3}
                  className="object-contain p-4 transition-transform duration-500 ease-out group-hover:scale-[1.04]"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
                <div
                  className={`pointer-events-none absolute inset-0 ${pastelOverlayTints[index % pastelOverlayTints.length]} mix-blend-soft-light`}
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
