import ClassSelector from "@/components/compendio/ClassSelector";
import SectionHeader from "@/components/compendio/SectionHeader";
import { clases } from "@/lib/data";

export const metadata = {
  title: "Clases - Tonaltlan",
  description: "Descubre las clases jugables de Tonaltlan: guerreros, sacerdotisas, nahuales y mas.",
};

export default function ClasesPage() {
  return (
    <div className="pb-24 pt-28 lg:pt-36">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <SectionHeader
          eyebrow="Compendio"
          eyebrowHref="/explorar"
          title="Clases"
          subtitle="Guerreros, sacerdotes, hechiceros y mas arquetipos del mundo antiguo."
        />
        <ClassSelector items={clases} />
      </div>
    </div>
  );
}
