import Image from "next/image";
import SectionHeader from "@/components/compendio/SectionHeader";
import Pendiente from "@/components/ui/Pendiente";
import { contacts } from "@/lib/site";

export const metadata = {
  title: "Nosotros - Cuevas & Quetzales",
  description: "Cuevas & Quetzales, el estudio detrás de Tonaltlan.",
};

export default function NosotrosPage() {
  return (
    <div className="pb-24 pt-28 lg:pt-36">
      <div className="mx-auto max-w-5xl px-6 lg:px-8">
        <SectionHeader eyebrow="Estudio" title="Nosotros" />

        <div className="mb-12 flex flex-col items-center gap-6 rounded-3xl bg-gradient-to-b from-selva-800/60 to-selva-900 px-6 py-14 text-center ring-1 ring-selva-700/70">
          <Image
            src="/images/produccion_footer.webp"
            alt="Cuevas y Quetzales"
            width={900}
            height={416}
            className="h-auto w-full max-w-md"
            sizes="(max-width: 768px) 90vw, 448px"
            priority
          />
          <p className="text-sm text-selva-400">Una produccion de Cuevas & Quetzales</p>
        </div>

        <Pendiente id="nosotros" className="mb-12" />

        <h2 className="mb-6 font-display text-2xl text-selva-100">Equipo</h2>
        <div className="grid gap-4 sm:grid-cols-3">
          {contacts.map((contact) => (
            <div key={contact.email} className="rounded-2xl bg-selva-800/40 p-6 text-center ring-1 ring-selva-700/70">
              <div
                className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full border border-dashed border-selva-600 bg-selva-900 text-xs text-selva-500"
                aria-hidden="true"
              >
                Foto
              </div>
              <h3 className="font-display text-base text-selva-100">{contact.role}</h3>
              <p className="mt-1 text-sm text-selva-400">{contact.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
