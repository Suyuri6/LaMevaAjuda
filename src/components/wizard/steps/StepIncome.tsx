"use client";

import { useTranslations } from "next-intl";
import { useWizardStore } from "@/stores/wizard-store";
import StepWrapper from "../StepWrapper";

export default function StepIncome() {
  const t = useTranslations("wizard.steps.income");
  const { data, setField } = useWizardStore();

  return (
    <StepWrapper title={t("title")}>
      <label className="block">
        <span className="text-sm font-medium text-foreground">
          {t("label")}
        </span>
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
          className="mt-2 block w-full rounded-lg border border-border bg-card px-4 py-3 text-foreground focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-colors"
        />
        <span className="mt-1 text-xs text-muted">{t("help")}</span>
      </label>
    </StepWrapper>
  );
}
