import { notFound } from "next/navigation";
import { especies } from "@/lib/data";
import DetailLayout from "@/components/compendio/DetailLayout";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return especies.map((e) => ({ slug: e.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const item = especies.find((e) => e.slug === slug);
  if (!item) return { title: "No encontrado - Tonaltlan" };
  return {
    title: `${item.name} - Especies - Tonaltlan`,
    description: item.description,
  };
}

export default async function EspecieDetailPage({ params }: Props) {
  const { slug } = await params;
  const item = especies.find((e) => e.slug === slug);
  if (!item) notFound();

  return (
    <DetailLayout
      title={item.name}
      tags={item.tags}
      sections={item.sections}
      backHref="/especies"
      backLabel="Volver a Especies"
    />
  );
}
