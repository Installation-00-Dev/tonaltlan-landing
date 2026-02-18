import CompendiumListPage from "@/components/compendio/CompendiumListPage";
import { monturas } from "@/lib/data";

export const metadata = {
  title: "Monturas - Tonaltlan",
  description: "Monturas voladoras, terrestres y acuaticas del mundo de Tonaltlan.",
};

export default function MonturasPage() {
  return (
    <CompendiumListPage
      title="Monturas"
      subtitle="Companeros leales que surcan cielos, rios y caminos ancestrales. Encuentra tu montura ideal para las aventuras de Tonaltlan."
      items={monturas}
      basePath="monturas"
    />
  );
}
