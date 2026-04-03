"use client";

import { useTranslations } from "next-intl";
import { useWizardStore } from "@/stores/wizard-store";
import StepWrapper from "../StepWrapper";
import type { EmploymentStatus } from "@/types/wizard";

const options: { value: EmploymentStatus; labelKey: string }[] = [
  { value: "employed", labelKey: "employed" },
  { value: "unemployed", labelKey: "unemployed" },
  { value: "self_employed", labelKey: "selfEmployed" },
  { value: "student", labelKey: "student" },
  { value: "retired", labelKey: "retired" },
];

export default function StepEmployment() {
  const t = useTranslations("wizard.steps.employment");
  const { data, setField } = useWizardStore();

  return (
    <StepWrapper title={t("title")}>
      <div className="space-y-3">
        {options.map((opt) => (
          <button
            key={opt.value}
            onClick={() => setField("employmentStatus", opt.value)}
            className={`w-full text-left px-4 py-3 rounded-lg border transition-colors ${
              data.employmentStatus === opt.value
                ? "border-primary bg-primary/10 text-foreground"
                : "border-border bg-card text-foreground hover:border-primary/50"
            }`}
          >
            {t(opt.labelKey)}
          </button>
        ))}
      </div>
    </StepWrapper>
  );
}
