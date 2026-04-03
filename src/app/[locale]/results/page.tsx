"use client";

import { useEffect, useState } from "react";
import { useTranslations, useLocale } from "next-intl";
import { Link } from "../../../../i18n/navigation";
import { useWizardStore } from "@/stores/wizard-store";
import AidList from "@/components/results/AidList";
import type { MatchedAid } from "@/types/aid";
import { RotateCcw, Loader2, AlertCircle, PartyPopper } from "lucide-react";

export default function ResultsPage() {
  const t = useTranslations();
  const locale = useLocale();
  const { data, reset } = useWizardStore();
  const [matches, setMatches] = useState<MatchedAid[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function fetchMatches() {
      try {
        const res = await fetch("/api/match", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ wizardData: data, locale }),
        });
        if (!res.ok) throw new Error("Failed");
        const json = await res.json();
        setMatches(json.matches ?? []);
      } catch {
        setError(true);
      } finally {
        setLoading(false);
      }
    }
    fetchMatches();
  }, [data, locale]);

  return (
    <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
      {/* Header */}
      <div className="mb-10 animate-slide-up">
        <div className="flex items-start gap-3 mb-2">
          {!loading && !error && matches.length > 0 && (
            <PartyPopper className="h-8 w-8 text-accent flex-shrink-0 mt-0.5" />
          )}
          <div>
            <h1 className="font-serif text-3xl sm:text-4xl text-foreground leading-snug">
              {t("results.title")}
            </h1>
            <p className="mt-2 text-muted text-lg leading-relaxed">{t("results.subtitle")}</p>
          </div>
        </div>
      </div>

      {/* Loading state */}
      {loading && (
        <div className="text-center py-20 animate-fade-in">
          <Loader2 className="h-8 w-8 text-primary mx-auto animate-spin" />
          <p className="mt-4 text-muted">{t("common.loading")}</p>
        </div>
      )}

      {/* Error state */}
      {error && (
        <div className="text-center py-16 animate-fade-in">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-red-50 dark:bg-red-950/30 mb-4">
            <AlertCircle className="h-7 w-7 text-red-500" />
          </div>
          <p className="text-red-600 dark:text-red-400 font-medium">{t("common.error")}</p>
        </div>
      )}

      {/* Results */}
      {!loading && !error && (
        <div className="animate-slide-up" style={{ animationDelay: "0.15s" }}>
          <AidList matches={matches} />
        </div>
      )}

      {/* Start over button */}
      <div className="mt-14 text-center">
        <Link
          href="/wizard"
          onClick={() => reset()}
          className="group inline-flex items-center justify-center gap-2 rounded-xl border border-border px-6 py-3 font-medium text-muted hover:text-foreground hover:bg-secondary hover:border-foreground/10 transition-all duration-200"
        >
          <RotateCcw className="h-4 w-4 transition-transform duration-300 group-hover:-rotate-180" />
          {t("results.startOver")}
        </Link>
      </div>
    </div>
  );
}
