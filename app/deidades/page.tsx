import CompendiumListPage from "@/components/compendio/CompendiumListPage";
import { deidades } from "@/lib/data";

export const metadata = {
  title: "Deidades - Tonaltlan",
  description: "Los dioses del panteon mesoamericano de Tonaltlan y sus dominios.",
};

export default function DeidadesPage() {
  return (
    <CompendiumListPage
      title="Deidades"
      subtitle="Los dioses que tejen el destino del cosmos y sus elegidos. Descubre sus dominios, rasgos y la influencia que ejercen sobre los heroes de Tonaltlan."
      items={deidades}
      basePath="deidades"
    />
  );
}
