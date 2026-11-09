import Image from "next/image";
import SectionHeader from "@/components/compendio/SectionHeader";
import AnchorPage from "@/components/ui/AnchorPage";
import Pendiente from "@/components/ui/Pendiente";
import { features } from "@/lib/features";

export const metadata = {
  title: "El Mundo - Tonaltlan",
  description: "Cosmovisión, Puntos Tonal, regiones e historia del mundo de Tonaltlan.",
};

const sistemaTonal = features.find((feature) => feature.title === "Sistema Tonal");

export default function MundoPage() {
  return (
    <AnchorPage
      header={<SectionHeader eyebrow="Tonaltlan" title="El Mundo" />}
      sections={[
        {
          id: "cosmovision",
          title: "Cosmovisión",
          content: <Pendiente id="mundo-cosmovision" />,
        },
        {
          id: "puntos-tonal",
          title: "Puntos Tonal",
          content: (
            <div className="space-y-6">
              {sistemaTonal ? (
                <div className="flex gap-5 rounded-2xl bg-selva-800/40 p-6 ring-1 ring-selva-700/70 md:p-8">
                  <div className="h-fit shrink-0 rounded-xl bg-oro-400/10 p-3 text-oro-300 ring-1 ring-oro-400/25">
                    {sistemaTonal.icon}
                  </div>
                  <p className="text-base leading-8 text-selva-300">{sistemaTonal.description}</p>
                </div>
              ) : null}
              <Pendiente id="mundo-puntos-tonal" />
            </div>
          ),
        },
        {
          id: "regiones",
          title: "Regiones",
          content: (
            <div className="space-y-6">
              <figure className="overflow-hidden rounded-2xl bg-selva-800 ring-1 ring-selva-700">
                <div className="relative aspect-[16/10] w-full">
                  <Image
                    src="/images/galeria/Mapa.webp"
                    alt="Mapa de Tonaltlan"
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 900px"
                  />
                </div>
              </figure>
              <Pendiente id="mundo-regiones" />
            </div>
          ),
        },
        {
          id: "historia",
          title: "Historia",
          content: <Pendiente id="mundo-historia" />,
        },
      ]}
    />
  );
}
