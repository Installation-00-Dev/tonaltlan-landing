import DeitiesFlipGrid from "@/components/compendio/DeitiesFlipGrid";
import { clases } from "@/lib/data";

export const metadata = {
  title: "Clases - Tonaltlan",
  description: "Descubre las clases jugables de Tonaltlan: guerreros, sacerdotisas, nahuales y mas.",
};

export default function ClasesPage() {
  return (
    <DeitiesFlipGrid
      items={clases}
      title="Clases"
      subtitle="Toca cada tarjeta para verla al reverso. Al frente veras su imagen; al girar, su descripcion completa."
      columns={2}
      largeImage
    />
  );
}
