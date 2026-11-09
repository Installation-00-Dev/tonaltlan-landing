import Bestiario, { metadataBestiario } from "@/components/paginas/Bestiario";

export const metadata = metadataBestiario("es");

export default function Page() {
  return <Bestiario lang="es" />;
}
