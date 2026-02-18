import CompendiumCard, { type CompendiumCardData } from "./CompendiumCard";

interface CompendiumGridProps {
  items: CompendiumCardData[];
  buttonLabel?: string;
  emptyMessage?: string;
}

export default function CompendiumGrid({
  items,
  buttonLabel,
  emptyMessage = "No se encontraron resultados.",
}: CompendiumGridProps) {
  if (items.length === 0) {
    return (
      <div className="glass-card rounded-xl p-10 text-center">
        <p className="text-base text-muted">{emptyMessage}</p>
      </div>
    );
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((item) => (
        <CompendiumCard key={item.slug} item={item} buttonLabel={buttonLabel} />
      ))}
    </div>
  );
}
