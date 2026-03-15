import DeitiesFlipGrid from "@/components/compendio/DeitiesFlipGrid";
import { especies } from "@/lib/data";

export const metadata = {
  title: "Especies - Tonaltlan",
  description: "Explora las especies jugables de Tonaltlan: humanos, ahuizotl, tlalocan-i y mas.",
};

export default function EspeciesPage() {
  return (
    <DeitiesFlipGrid
      items={especies}
      title="Especies"
      subtitle="Toca cada tarjeta para verla al reverso. Al frente veras su imagen; al girar, su descripcion completa."
      columns={2}
      sortWithImageFirst
    />
  );
}
