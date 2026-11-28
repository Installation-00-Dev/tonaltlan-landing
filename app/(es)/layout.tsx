import "../globals.css";
import LayoutRaiz, { metadataRaiz, viewportRaiz } from "@/components/layout/LayoutRaiz";

export const metadata = metadataRaiz("es");
export const viewport = viewportRaiz;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <LayoutRaiz lang="es">{children}</LayoutRaiz>;
}
