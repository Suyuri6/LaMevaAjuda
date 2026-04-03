"use client";

import { useTranslations } from "next-intl";
import { useWizardStore } from "@/stores/wizard-store";
import StepWrapper from "../StepWrapper";
import type { HousingSituation } from "@/types/wizard";

const options: { value: HousingSituation; labelKey: string }[] = [
  { value: "owner", labelKey: "owner" },
  { value: "renter", labelKey: "renter" },
  { value: "shared", labelKey: "shared" },
  { value: "family_home", labelKey: "familyHome" },
  { value: "homeless", labelKey: "homeless" },
  { value: "other", labelKey: "other" },
];

export default function StepHousing() {
  const t = useTranslations("wizard.steps.housing");
  const { data, setField } = useWizardStore();

  return (
    <StepWrapper title={t("title")}>
      <div className="space-y-3">
        {options.map((opt) => (
          <button
            key={opt.value}
            onClick={() => setField("housingSituation", opt.value)}
            className={`w-full text-left px-4 py-3 rounded-lg border transition-colors ${
              data.housingSituation === opt.value
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
