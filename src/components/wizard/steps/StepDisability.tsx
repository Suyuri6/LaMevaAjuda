"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { useWizardStore } from "@/stores/wizard-store";
import StepWrapper from "../StepWrapper";
import { Percent } from "lucide-react";

export default function StepDisability() {
  const t = useTranslations("wizard.steps.disability");
  const { data, setField } = useWizardStore();
  const [hasDisability, setHasDisability] = useState(
    data.disabilityPercentage > 0
  );

  return (
    <StepWrapper title={t("title")}>
      <div className="space-y-2.5">
        {[
          { value: false, label: t("none") },
          { value: true, label: t("has") },
        ].map((opt) => {
          const selected = hasDisability === opt.value;
          return (
            <button
              key={String(opt.value)}
              onClick={() => {
                setHasDisability(opt.value);
                if (!opt.value) setField("disabilityPercentage", 0);
                else if (data.disabilityPercentage === 0) setField("disabilityPercentage", 33);
              }}
              className={`w-full flex items-center gap-3 text-left px-4 py-3.5 rounded-xl border transition-all duration-200 ${
                selected
                  ? "border-primary bg-primary-light text-foreground shadow-sm"
                  : "border-border bg-card text-foreground hover:border-primary/30 hover:bg-surface-warm"
              }`}
            >
              <span className="font-medium">{opt.label}</span>
              {selected && (
                <span className="ml-auto w-2 h-2 rounded-full bg-primary animate-scale-in" />
              )}
            </button>
          );
        })}
      </div>

      {hasDisability && (
        <div className="mt-6 animate-step-reveal">
          <label className="block">
            <span className="text-sm font-medium text-muted">
              {t("percentage")}
            </span>
            <div className="relative mt-2">
              <Percent className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted pointer-events-none" />
              <input
                type="number"
                min={1}
                max={100}
                value={data.disabilityPercentage}
                onChange={(e) =>
                  setField("disabilityPercentage", Number(e.target.value))
                }
                className="block w-full rounded-xl border border-border bg-card pl-11 pr-4 py-3.5 text-foreground focus:border-primary focus:ring-2 focus:ring-primary/15 outline-none transition-all duration-200"
              />
            </div>
          </label>
        </div>
      )}
    </StepWrapper>
  );
}
