import Mundo, { metadataMundo } from "@/components/paginas/Mundo";

export const metadata = metadataMundo("es");

export default function Page() {
  return <Mundo lang="es" />;
}
