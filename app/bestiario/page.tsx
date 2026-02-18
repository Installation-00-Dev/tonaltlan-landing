import CompendiumListPage from "@/components/compendio/CompendiumListPage";
import { bestiario } from "@/lib/data";

export const metadata = {
  title: "Bestiario - Tonaltlan",
  description: "Criaturas del Mictlan y bestias de selvas y montanas sagradas de Tonaltlan.",
};

export default function BestiarioPage() {
  return (
    <CompendiumListPage
      title="Bestiario"
      subtitle="Criaturas del Mictlan, bestias de selvas sagradas y seres primordiales. Conoce a las amenazas y aliados que habitan el mundo de Tonaltlan."
      items={bestiario}
      basePath="bestiario"
    />
  );
}
