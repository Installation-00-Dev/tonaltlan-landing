"use client";

import { useState, useMemo } from "react";
import SectionHeader from "./SectionHeader";
import SearchBar from "./SearchBar";
import FilterChips from "./FilterChips";
import CompendiumGrid from "./CompendiumGrid";
import type { CompendiumEntry } from "@/lib/data";

interface CompendiumListPageProps {
  title: string;
  subtitle: string;
  items: CompendiumEntry[];
  basePath: string;
}

export default function CompendiumListPage({
  title,
  subtitle,
  items,
  basePath,
}: CompendiumListPageProps) {
  const [search, setSearch] = useState("");
  const [activeFilter, setActiveFilter] = useState("Todos");

  // Collect unique tags for filter chips
  const allTags = useMemo(() => {
    const tagSet = new Set<string>();
    items.forEach((item) => item.tags.forEach((t) => tagSet.add(t)));
    return ["Todos", ...Array.from(tagSet)];
  }, [items]);

  const filtered = useMemo(() => {
    return items.filter((item) => {
      const matchesSearch = item.name
        .toLowerCase()
        .includes(search.toLowerCase());
      const matchesFilter =
        activeFilter === "Todos" || item.tags.includes(activeFilter);
      return matchesSearch && matchesFilter;
    });
  }, [items, search, activeFilter]);

  const cardItems = filtered.map((item) => ({
    name: item.name,
    slug: item.slug,
    description: item.description,
    tags: item.tags,
    href: `/${basePath}/${item.slug}`,
  }));

  return (
    <div className="pt-24 pb-16 lg:pt-32">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <SectionHeader title={title} subtitle={subtitle} />
        <SearchBar
          value={search}
          onChange={setSearch}
          placeholder={`Buscar en ${title.toLowerCase()}...`}
        />
        <FilterChips
          filters={allTags}
          active={activeFilter}
          onChange={setActiveFilter}
        />
        <CompendiumGrid items={cardItems} />
      </div>
    </div>
  );
}
