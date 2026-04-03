"use client";

import { useTranslations, useLocale } from "next-intl";
import type { MatchedAid } from "@/types/aid";
import { ExternalLink, Coins } from "lucide-react";

const governmentColors: Record<string, string> = {
  generalitat: "bg-red-50 text-red-700 border-red-200 dark:bg-red-950/40 dark:text-red-300 dark:border-red-800/40",
  estado: "bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/40 dark:text-amber-300 dark:border-amber-800/40",
  local: "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-300 dark:border-emerald-800/40",
  eu: "bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950/40 dark:text-blue-300 dark:border-blue-800/40",
};

const governmentAccent: Record<string, string> = {
  generalitat: "bg-red-500",
  estado: "bg-amber-500",
  local: "bg-emerald-500",
  eu: "bg-blue-500",
};

export default function AidCard({ match }: { match: MatchedAid }) {
  const t = useTranslations();
  const locale = useLocale();
  const { aid, translation } = match;

  const amount = aid.amount_text[locale] ?? aid.amount_text["ca"] ?? "";
  const officialUrl =
    aid.official_url[locale] ?? aid.official_url["ca"] ?? "#";
  const govColor = governmentColors[aid.government] ?? governmentColors.estado;
  const govAccent = governmentAccent[aid.government] ?? governmentAccent.estado;

  return (
    <div className="group relative rounded-2xl border border-border/60 bg-card overflow-hidden hover:shadow-lg hover:shadow-foreground/[0.03] hover:-translate-y-0.5 transition-all duration-300">
      {/* Top accent line */}
      <div className={`h-1 ${govAccent}`} />

      <div className="p-6">
        {/* Badges */}
        <div className="flex flex-wrap gap-2 mb-4">
          <span
            className={`inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-semibold border ${govColor}`}
          >
            {t(`common.filter${aid.government.charAt(0).toUpperCase() + aid.government.slice(1)}` as Parameters<typeof t>[0])}
          </span>
          <span className="inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-medium bg-secondary text-muted border border-border/40">
            {t(`results.categories.${aid.category}` as Parameters<typeof t>[0])}
          </span>
        </div>

        {/* Title & description */}
        <h3 className="font-serif text-lg text-foreground mb-2 leading-snug">
          {translation.name}
        </h3>
        <p className="text-sm text-muted leading-relaxed mb-4">{translation.short_desc}</p>

        {/* Amount */}
        {amount && (
          <div className="flex items-center gap-2 mb-4 px-3 py-2.5 rounded-xl bg-surface-warm border border-border/40">
            <Coins className="h-4 w-4 text-accent flex-shrink-0" />
            <span className="text-sm font-semibold text-foreground">{amount}</span>
          </div>
        )}

        {/* Eligibility summary */}
        <p className="text-xs text-muted leading-relaxed mb-5">
          {translation.eligibility_summary}
        </p>

        {/* CTA */}
        <a
          href={officialUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:text-primary-hover transition-colors group/link"
        >
          {t("common.officialSource")}
          <ExternalLink className="h-3.5 w-3.5 transition-transform duration-200 group-hover/link:translate-x-0.5" />
        </a>
      </div>
    </div>
  );
}
