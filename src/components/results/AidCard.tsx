"use client";

import { useTranslations, useLocale } from "next-intl";
import type { MatchedAid } from "@/types/aid";
import { ExternalLink } from "lucide-react";

const governmentColors: Record<string, string> = {
  generalitat: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300",
  estado: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300",
  local: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300",
  eu: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300",
};

export default function AidCard({ match }: { match: MatchedAid }) {
  const t = useTranslations();
  const locale = useLocale();
  const { aid, translation } = match;

  const amount = aid.amount_text[locale] ?? aid.amount_text["ca"] ?? "";
  const officialUrl =
    aid.official_url[locale] ?? aid.official_url["ca"] ?? "#";
  const govColor = governmentColors[aid.government] ?? governmentColors.estado;

  return (
    <div className="rounded-xl border border-border bg-card p-6 hover:shadow-md transition-shadow">
      <div className="flex flex-wrap gap-2 mb-3">
        <span
          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${govColor}`}
        >
          {t(`common.filter${aid.government.charAt(0).toUpperCase() + aid.government.slice(1)}` as Parameters<typeof t>[0])}
        </span>
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-secondary text-foreground">
          {t(`results.categories.${aid.category}` as Parameters<typeof t>[0])}
        </span>
      </div>

      <h3 className="text-lg font-semibold text-foreground mb-2">
        {translation.name}
      </h3>
      <p className="text-sm text-muted mb-4">{translation.short_desc}</p>

      {amount && (
        <div className="mb-4">
          <span className="text-sm font-medium text-foreground">
            {t("common.amount")}:{" "}
          </span>
          <span className="text-sm text-primary font-semibold">{amount}</span>
        </div>
      )}

      <p className="text-xs text-muted mb-4">
        {translation.eligibility_summary}
      </p>

      <a
        href={officialUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:text-primary-hover transition-colors"
      >
        {t("common.officialSource")}
        <ExternalLink className="h-3.5 w-3.5" />
      </a>
    </div>
  );
}
