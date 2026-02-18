import CompendiumListPage from "@/components/compendio/CompendiumListPage";
import { clases } from "@/lib/data";

export const metadata = {
  title: "Clases - Tonaltlan",
  description: "Descubre las clases jugables de Tonaltlan: guerreros, sacerdotisas, nahuales y mas.",
};

export default function ClasesPage() {
  return (
    <CompendiumListPage
      title="Clases"
      subtitle="Arquetipos de heroes que puedes encarnar en el mundo de Tonaltlan. Cada clase ofrece un estilo de juego unico inspirado en la cultura mesoamericana."
      items={clases}
      basePath="clases"
    />
  );
}
