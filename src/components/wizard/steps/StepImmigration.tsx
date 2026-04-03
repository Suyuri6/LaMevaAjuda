"use client";

import { useTranslations } from "next-intl";
import { useWizardStore } from "@/stores/wizard-store";
import StepWrapper from "../StepWrapper";
import type { ImmigrationStatus } from "@/types/wizard";

const options: { value: ImmigrationStatus; labelKey: string }[] = [
  { value: "citizen", labelKey: "citizen" },
  { value: "eu_national", labelKey: "euNational" },
  { value: "permanent_resident", labelKey: "permanentResident" },
  { value: "temporary_resident", labelKey: "temporaryResident" },
  { value: "refugee", labelKey: "refugee" },
  { value: "undocumented", labelKey: "undocumented" },
];

export default function StepImmigration() {
  const t = useTranslations("wizard.steps.immigration");
  const { data, setField } = useWizardStore();

  return (
    <StepWrapper title={t("title")}>
      <div className="space-y-3">
        {options.map((opt) => (
          <button
            key={opt.value}
            onClick={() => setField("immigrationStatus", opt.value)}
            className={`w-full text-left px-4 py-3 rounded-lg border transition-colors ${
              data.immigrationStatus === opt.value
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
