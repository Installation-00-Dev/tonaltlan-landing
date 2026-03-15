import DeitiesFlipGrid from "@/components/compendio/DeitiesFlipGrid";
import { deidades } from "@/lib/data";

export const metadata = {
  title: "Deidades - Tonaltlan",
  description: "Los dioses del panteon mesoamericano de Tonaltlan y sus dominios.",
};

export default function DeidadesPage() {
  return <DeitiesFlipGrid items={deidades} />;
}
