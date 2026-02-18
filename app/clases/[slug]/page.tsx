import { notFound } from "next/navigation";
import { clases } from "@/lib/data";
import DetailLayout from "@/components/compendio/DetailLayout";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return clases.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const item = clases.find((c) => c.slug === slug);
  if (!item) return { title: "No encontrado - Tonaltlan" };
  return {
    title: `${item.name} - Clases - Tonaltlan`,
    description: item.description,
  };
}

export default async function ClaseDetailPage({ params }: Props) {
  const { slug } = await params;
  const item = clases.find((c) => c.slug === slug);
  if (!item) notFound();

  return (
    <DetailLayout
      title={item.name}
      tags={item.tags}
      sections={item.sections}
      backHref="/clases"
      backLabel="Volver a Clases"
    />
  );
}
