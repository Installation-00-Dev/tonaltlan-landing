import { notFound } from "next/navigation";
import { bestiario } from "@/lib/data";
import DetailLayout from "@/components/compendio/DetailLayout";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return bestiario.map((b) => ({ slug: b.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const item = bestiario.find((b) => b.slug === slug);
  if (!item) return { title: "No encontrado - Tonaltlan" };
  return {
    title: `${item.name} - Bestiario - Tonaltlan`,
    description: item.description,
  };
}

export default async function BestiarioDetailPage({ params }: Props) {
  const { slug } = await params;
  const item = bestiario.find((b) => b.slug === slug);
  if (!item) notFound();

  return (
    <DetailLayout
      title={item.name}
      tags={item.tags}
      sections={item.sections}
      backHref="/bestiario"
      backLabel="Volver a Bestiario"
    />
  );
}
