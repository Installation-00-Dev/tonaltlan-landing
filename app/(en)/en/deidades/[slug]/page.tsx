import { notFound } from "next/navigation";
import { DetalleDeidad, metadataDeidad, slugsDeidades } from "@/components/paginas/Detalles";
import { getCompendio } from "@/lib/compendio";

interface Props {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return slugsDeidades();
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  return metadataDeidad("en", slug);
}

export default async function Page({ params }: Props) {
  const { slug } = await params;
  if (!getCompendio("en").deidades.some((item) => item.slug === slug)) notFound();
  return <DetalleDeidad lang="en" slug={slug} />;
}
