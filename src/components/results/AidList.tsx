"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import type { MatchedAid } from "@/types/aid";
import AidCard from "./AidCard";
import { Search } from "lucide-react";

export default function AidList({ matches }: { matches: MatchedAid[] }) {
  const t = useTranslations();
  const [filter, setFilter] = useState<string>("all");

  const filtered =
    filter === "all"
      ? matches
      : matches.filter((m) => m.aid.government === filter);

  const filterOptions = [
    { value: "all", label: t("common.filterAll") },
    { value: "generalitat", label: t("common.filterGeneralitat") },
    { value: "estado", label: t("common.filterEstado") },
  ];

  if (matches.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-secondary mb-4">
          <Search className="h-7 w-7 text-muted" />
        </div>
        <p className="text-muted text-lg max-w-md mx-auto leading-relaxed">{t("results.noResults")}</p>
      </div>
    );
  }

  return (
    <div>
      {/* Filters */}
      <div className="flex gap-2 mb-8 flex-wrap">
        {filterOptions.map((opt) => {
          const count = opt.value === "all"
            ? matches.length
            : matches.filter((m) => m.aid.government === opt.value).length;
          const active = filter === opt.value;
          return (
            <button
              key={opt.value}
              onClick={() => setFilter(opt.value)}
              className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-200 ${
                active
                  ? "bg-primary text-white shadow-md shadow-primary/15"
                  : "bg-card text-muted border border-border hover:border-primary/30 hover:text-foreground"
              }`}
            >
              {opt.label}
              <span className={`ml-1.5 text-xs ${active ? "text-white/70" : "text-muted/60"}`}>
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Grid */}
      <div className="grid gap-5 sm:grid-cols-2 stagger-children">
        {filtered.map((match) => (
          <AidCard key={match.aid.id} match={match} />
        ))}
      </div>
    </div>
  );
}
