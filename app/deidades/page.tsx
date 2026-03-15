import DeitiesFlipGrid from "@/components/compendio/DeitiesFlipGrid";
import { deidades } from "@/lib/data";

export const metadata = {
  title: "Deidades - Tonaltlan",
  description: "Los dioses del panteon mesoamericano de Tonaltlan y sus dominios.",
};

export default function DeidadesPage() {
  return (
    <DeitiesFlipGrid
      items={deidades}
      title="Deidades"
      subtitle="Toca cada tarjeta para verla al reverso. Al frente veras su imagen; al girar, su descripcion completa."
    />
  );
}
