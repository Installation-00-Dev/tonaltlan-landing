import SectionHeader from "@/components/compendio/SectionHeader";
import Image from "next/image";

export const metadata = {
  title: "Monturas - Tonaltlan",
  description: "Monturas voladoras, terrestres y acuaticas del mundo de Tonaltlan.",
};

const mountImages = [
  "/images/monturas/ajolote-cue.webp",
  "/images/monturas/Armadillo.webp",
  "/images/monturas/hormiga-mielera.webp",
  "/images/monturas/scorpion-archip.webp",
];

const pastelCardBackgrounds = [
  "bg-rose-100/32",
  "bg-amber-100/32",
  "bg-emerald-100/30",
  "bg-sky-100/32",
];

function isArmadilloImage(src: string) {
  return src.toLowerCase().includes("armadillo");
}

function getLabelFromPath(src: string) {
  const raw = src
    .split("/")
    .pop()
    ?.replace(/\.[^/.]+$/, "")
    .replace(/[_-]/g, " ")
    .trim();

  if (!raw) return "Montura";

  return raw
    .split(/\s+/)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
}

export default function MonturasPage() {
  return (
    <div className="pb-16 pt-24 lg:pt-32">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <SectionHeader
          title="Monturas"
          subtitle="Galeria visual de monturas del mundo de Tonaltlan."
        />

        <div className="columns-1 gap-6 sm:columns-2 lg:columns-3">
          {mountImages.map((src, index) => (
            <article
              key={src}
              className={[
                "group mb-6 break-inside-avoid overflow-hidden rounded-[1.4rem] border border-glass-border/70 bg-background/35 opacity-0 shadow-[0_18px_50px_rgba(0,0,0,0.22)] transition-all duration-300 ease-out hover:-translate-y-2 hover:shadow-[0_24px_60px_rgba(0,0,0,0.3)] hover:ring-1 hover:ring-gold/30 animate-fade-in",
                pastelCardBackgrounds[index % pastelCardBackgrounds.length],
              ].join(" ")}
              style={{ animationDelay: `${index * 90}ms` }}
            >
              <div className="relative aspect-[3/4] w-full overflow-hidden">
                <div
                  className={[
                    "pointer-events-none absolute inset-3 rounded-2xl",
                    isArmadilloImage(src) ? "bg-amber-100/35" : "bg-white/10",
                  ].join(" ")}
                />
                <Image
                  src={src}
                  alt={getLabelFromPath(src)}
                  fill
                  priority={index < 3}
                  className={[
                    "object-contain p-4 transition-transform duration-500 ease-out group-hover:scale-[1.04]",
                    isArmadilloImage(src) ? "scale-[1.08] brightness-110 contrast-125" : "",
                  ].join(" ")}
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
