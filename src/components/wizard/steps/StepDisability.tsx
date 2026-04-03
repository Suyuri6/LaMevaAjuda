"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { useWizardStore } from "@/stores/wizard-store";
import StepWrapper from "../StepWrapper";

export default function StepDisability() {
  const t = useTranslations("wizard.steps.disability");
  const { data, setField } = useWizardStore();
  const [hasDisability, setHasDisability] = useState(
    data.disabilityPercentage > 0
  );

  return (
    <StepWrapper title={t("title")}>
      <div className="space-y-3">
        <button
          onClick={() => {
            setHasDisability(false);
            setField("disabilityPercentage", 0);
          }}
          className={`w-full text-left px-4 py-3 rounded-lg border transition-colors ${
            !hasDisability
              ? "border-primary bg-primary/10 text-foreground"
              : "border-border bg-card text-foreground hover:border-primary/50"
          }`}
        >
          {t("none")}
        </button>
        <button
          onClick={() => {
            setHasDisability(true);
            if (data.disabilityPercentage === 0)
              setField("disabilityPercentage", 33);
          }}
          className={`w-full text-left px-4 py-3 rounded-lg border transition-colors ${
            hasDisability
              ? "border-primary bg-primary/10 text-foreground"
              : "border-border bg-card text-foreground hover:border-primary/50"
          }`}
        >
          {t("has")}
        </button>
      </div>

      {hasDisability && (
        <div className="mt-6">
          <label className="block">
            <span className="text-sm font-medium text-foreground">
              {t("percentage")}
            </span>
            <input
              type="number"
              min={1}
              max={100}
              value={data.disabilityPercentage}
              onChange={(e) =>
                setField("disabilityPercentage", Number(e.target.value))
              }
              className="mt-2 block w-full rounded-lg border border-border bg-card px-4 py-3 text-foreground focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-colors"
            />
          </label>
        </div>
      )}
    </StepWrapper>
  );
}
