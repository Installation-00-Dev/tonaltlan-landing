interface TagChipsProps {
  tags: string[];
  variant?: "teal" | "gold" | "muted";
}

const variantStyles = {
  teal: "bg-teal/10 text-teal border-teal/20",
  gold: "bg-gold/10 text-gold border-gold/20",
  muted: "bg-foreground/5 text-muted border-foreground/10",
};

export default function TagChips({ tags, variant = "teal" }: TagChipsProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {tags.map((tag) => (
        <span
          key={tag}
          className={`inline-flex rounded-full border px-3 py-1 text-xs font-medium ${variantStyles[variant]}`}
        >
          {tag}
        </span>
      ))}
    </div>
  );
}
