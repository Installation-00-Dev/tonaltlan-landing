import Bestiario, { metadataBestiario } from "@/components/paginas/Bestiario";

export const metadata = metadataBestiario("en");

export default function Page() {
  return <Bestiario lang="en" />;
}
