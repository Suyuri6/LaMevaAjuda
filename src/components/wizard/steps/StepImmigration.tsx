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
      <div className="space-y-2.5">
        {options.map((opt) => {
          const selected = data.immigrationStatus === opt.value;
          return (
            <button
              key={opt.value}
              onClick={() => setField("immigrationStatus", opt.value)}
              className={`w-full flex items-center gap-3 text-left px-4 py-3.5 rounded-xl border transition-all duration-200 ${
                selected
                  ? "border-primary bg-primary-light text-foreground shadow-sm"
                  : "border-border bg-card text-foreground hover:border-primary/30 hover:bg-surface-warm"
              }`}
            >
              <span className="font-medium">{t(opt.labelKey)}</span>
              {selected && (
                <span className="ml-auto w-2 h-2 rounded-full bg-primary animate-scale-in" />
              )}
            </button>
          );
        })}
      </div>
    </StepWrapper>
  );
}
