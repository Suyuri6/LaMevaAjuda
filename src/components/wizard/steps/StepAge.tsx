"use client";

import { useTranslations } from "next-intl";
import { useWizardStore } from "@/stores/wizard-store";
import StepWrapper from "../StepWrapper";

export default function StepAge() {
  const t = useTranslations("wizard.steps.age");
  const { data, setField } = useWizardStore();

  return (
    <StepWrapper title={t("title")}>
      <label className="block">
        <span className="text-sm font-medium text-foreground">
          {t("label")}
        </span>
        <input
          type="date"
          value={data.dateOfBirth ?? ""}
          onChange={(e) => setField("dateOfBirth", e.target.value)}
          max={new Date().toISOString().split("T")[0]}
          className="mt-2 block w-full rounded-lg border border-border bg-card px-4 py-3 text-foreground focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-colors"
        />
      </label>
    </StepWrapper>
  );
}
