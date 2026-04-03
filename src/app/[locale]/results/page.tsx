"use client";

import { useEffect, useState } from "react";
import { useTranslations, useLocale } from "next-intl";
import { Link } from "../../../../i18n/navigation";
import { useWizardStore } from "@/stores/wizard-store";
import AidList from "@/components/results/AidList";
import type { MatchedAid } from "@/types/aid";

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
    <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-8 sm:py-16">
      <h1 className="text-3xl font-bold text-foreground mb-2">
        {t("results.title")}
      </h1>
      <p className="text-muted mb-8">{t("results.subtitle")}</p>

      {loading && (
        <div className="text-center py-12">
          <p className="text-muted">{t("common.loading")}</p>
        </div>
      )}

      {error && (
        <div className="text-center py-12">
          <p className="text-red-500">{t("common.error")}</p>
        </div>
      )}

      {!loading && !error && <AidList matches={matches} />}

      <div className="mt-12 text-center">
        <Link
          href="/wizard"
          onClick={() => reset()}
          className="inline-flex items-center justify-center rounded-full border border-border px-6 py-3 font-medium text-foreground hover:bg-secondary transition-colors"
        >
          {t("results.startOver")}
        </Link>
      </div>
    </div>
  );
}
