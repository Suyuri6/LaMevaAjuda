"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import type { MatchedAid } from "@/types/aid";
import AidCard from "./AidCard";

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
      <div className="text-center py-12">
        <p className="text-muted text-lg">{t("results.noResults")}</p>
      </div>
    );
  }

  return (
    <div>
      <div className="flex gap-2 mb-6 flex-wrap">
        {filterOptions.map((opt) => (
          <button
            key={opt.value}
            onClick={() => setFilter(opt.value)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              filter === opt.value
                ? "bg-primary text-white"
                : "bg-secondary text-foreground hover:bg-primary/10"
            }`}
          >
            {opt.label}
            {opt.value === "all"
              ? ` (${matches.length})`
              : ` (${matches.filter((m) => m.aid.government === opt.value).length})`}
          </button>
        ))}
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {filtered.map((match) => (
          <AidCard key={match.aid.id} match={match} />
        ))}
      </div>
    </div>
  );
}
