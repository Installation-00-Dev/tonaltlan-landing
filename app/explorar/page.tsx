"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import SectionHeader from "@/components/compendio/SectionHeader";
import SearchBar from "@/components/compendio/SearchBar";
import TagChips from "@/components/compendio/TagChips";
import { sectionsMeta } from "@/lib/data";

export default function ExplorarPage() {
  const [search, setSearch] = useState("");

  const filtered = useMemo(
    () =>
      sectionsMeta.filter((s) =>
        s.title.toLowerCase().includes(search.toLowerCase())
      ),
    [search]
  );

  return (
    <div className="pt-24 pb-16 lg:pt-32">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <SectionHeader
          title="Explorar Tonaltlan"
          subtitle="El compendio viviente del mundo mesoamericano. Busca entre clases, especies, criaturas, monturas y deidades."
        />
        <SearchBar
          value={search}
          onChange={setSearch}
          placeholder="Buscar secciones..."
        />

        {filtered.length === 0 ? (
          <div className="glass-card rounded-xl p-10 text-center">
            <p className="text-base text-muted">No se encontraron secciones.</p>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((section) => (
              <Link
                key={section.slug}
                href={`/${section.slug}`}
                className="glass-card-hover group flex flex-col rounded-xl p-6"
              >
                <h2 className="mb-2 font-serif text-xl font-semibold text-foreground transition-colors group-hover:text-teal">
                  {section.title}
                </h2>
                <p className="mb-4 flex-1 text-sm leading-relaxed text-muted">
                  {section.description}
                </p>
                <div className="mb-4">
                  <TagChips
                    tags={
                      section.count > 0
                        ? [`${section.count} entradas`]
                        : ["Proximamente"]
                    }
                    variant="gold"
                  />
                </div>
                <span className="inline-flex items-center gap-1 text-sm font-semibold text-teal">
                  Explorar
                  <svg
                    className="h-4 w-4 transition-transform group-hover:translate-x-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </span>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
