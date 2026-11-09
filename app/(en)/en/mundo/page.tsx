import Mundo, { metadataMundo } from "@/components/paginas/Mundo";

export const metadata = metadataMundo("en");

export default function Page() {
  return <Mundo lang="en" />;
}
