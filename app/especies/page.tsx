import CompendiumListPage from "@/components/compendio/CompendiumListPage";
import { especies } from "@/lib/data";

export const metadata = {
  title: "Especies - Tonaltlan",
  description: "Explora las especies jugables de Tonaltlan: humanos, ahuizotl, tlalocan-i y mas.",
};

export default function EspeciesPage() {
  return (
    <CompendiumListPage
      title="Especies"
      subtitle="Seres nacidos del maiz, la obsidiana y el aliento de los dioses. Elige tu linaje y descubre tus rasgos ancestrales."
      items={especies}
      basePath="especies"
    />
  );
}
