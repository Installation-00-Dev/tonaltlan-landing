import Link from "next/link";
import TagChips from "./TagChips";

export interface CompendiumCardData {
  name: string;
  slug: string;
  description: string;
  tags: string[];
  href: string;
}

interface CompendiumCardProps {
  item: CompendiumCardData;
  /** Button label override */
  buttonLabel?: string;
}

export default function CompendiumCard({
  item,
  buttonLabel = "Ver detalles",
}: CompendiumCardProps) {
  return (
    <div className="glass-card-hover flex flex-col rounded-xl p-5 md:p-6">
      <h3 className="mb-2 font-serif text-lg font-semibold text-foreground md:text-xl">
        {item.name}
      </h3>
      <p className="mb-4 flex-1 text-sm leading-relaxed text-muted">
        {item.description}
      </p>
      <div className="mb-4">
        <TagChips tags={item.tags} />
      </div>
      <Link
        href={item.href}
        className="inline-flex min-h-[44px] items-center justify-center rounded-lg border border-teal/40 px-4 py-2 text-sm font-semibold text-teal transition-colors hover:bg-teal/10"
      >
        {buttonLabel}
      </Link>
    </div>
  );
}
