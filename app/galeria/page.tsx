import GalleryGrid from "@/components/compendio/GalleryGrid";
import SectionHeader from "@/components/compendio/SectionHeader";
import Pendiente from "@/components/ui/Pendiente";
import { galleryImages } from "@/lib/site";

export const metadata = {
  title: "Galeria - Tonaltlan",
  description: "Ilustraciones y arte visual del universo de Tonaltlan.",
};

export default function GaleriaPage() {
  return (
    <div className="pb-24 pt-28 lg:pt-36">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <SectionHeader
          eyebrow="Tonaltlan"
          title="Galeria"
          subtitle="Todas las ilustraciones disponibles del mundo de Tonaltlan."
        />
        <GalleryGrid images={galleryImages} />
        <Pendiente id="galeria" className="mt-10" />
      </div>
    </div>
  );
}
