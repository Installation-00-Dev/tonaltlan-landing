import ClassSelector from "@/components/compendio/ClassSelector";
import SectionHeader from "@/components/compendio/SectionHeader";
import { clases } from "@/lib/data";
import { textosClases } from "@/lib/textos";

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
          title={textosClases.titulo}
          subtitle={textosClases.intro}
        />
        <ClassSelector items={clases} />
        <p className="mx-auto mt-20 max-w-2xl text-center font-display text-2xl text-jade-300 [text-wrap:balance] md:text-3xl">
          {textosClases.cierre}
        </p>
      </div>
    </div>
  );
}
