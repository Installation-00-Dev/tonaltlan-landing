import MountCarousel from "@/components/compendio/MountCarousel";
import SectionHeader from "@/components/compendio/SectionHeader";
import Pendiente from "@/components/ui/Pendiente";
import { mountImages } from "@/lib/site";

export const metadata = {
  title: "Monturas - Tonaltlan",
  description: "Monturas voladoras, terrestres y acuaticas del mundo de Tonaltlan.",
};

export default function MonturasPage() {
  return (
    <div className="pb-24 pt-28 lg:pt-36">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <SectionHeader
          eyebrow="Compendio"
          eyebrowHref="/explorar"
          title="Monturas"
          subtitle="Galeria visual de monturas del mundo de Tonaltlan."
        />
        <MountCarousel images={mountImages} />
        <Pendiente id="monturas" className="mt-10" />
      </div>
    </div>
  );
}
