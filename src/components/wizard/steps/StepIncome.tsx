"use client";

import { useTranslations } from "next-intl";
import { useWizardStore } from "@/stores/wizard-store";
import StepWrapper from "../StepWrapper";
import { Euro } from "lucide-react";

export default function StepIncome() {
  const t = useTranslations("wizard.steps.income");
  const { data, setField } = useWizardStore();

  return (
    <StepWrapper title={t("title")}>
      <label className="block">
        <span className="text-sm font-medium text-muted">
          {t("label")}
        </span>
        <div className="relative mt-2">
          <Euro className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted pointer-events-none" />
          <input
            type="number"
            min={0}
            max={999999}
            step={100}
            value={data.annualIncome ?? ""}
            onChange={(e) =>
              setField(
                "annualIncome",
                e.target.value === "" ? null : Number(e.target.value)
              )
            }
            placeholder="0"
            className="block w-full rounded-xl border border-border bg-card pl-11 pr-4 py-3.5 text-foreground focus:border-primary focus:ring-2 focus:ring-primary/15 outline-none transition-all duration-200"
          />
        </div>
        <span className="mt-2 block text-xs text-muted">{t("help")}</span>
      </label>
    </StepWrapper>
  );
}
