"use client";

import { useTranslations } from "next-intl";
import { useWizardStore } from "@/stores/wizard-store";
import StepWrapper from "../StepWrapper";

export default function StepResidence() {
  const t = useTranslations("wizard.steps.residence");
  const { data, setField } = useWizardStore();

  return (
    <StepWrapper title={t("title")}>
      <div className="space-y-3">
        <button
          onClick={() => {
            setField("residesInCatalonia", true);
          }}
          className={`w-full text-left px-4 py-3 rounded-lg border transition-colors ${
            data.residesInCatalonia === true
              ? "border-primary bg-primary/10 text-foreground"
              : "border-border bg-card text-foreground hover:border-primary/50"
          }`}
        >
          {t("inCatalonia")}
        </button>
        <button
          onClick={() => {
            setField("residesInCatalonia", false);
            setField("municipalityId", null);
          }}
          className={`w-full text-left px-4 py-3 rounded-lg border transition-colors ${
            data.residesInCatalonia === false
              ? "border-primary bg-primary/10 text-foreground"
              : "border-border bg-card text-foreground hover:border-primary/50"
          }`}
        >
          {t("outsideCatalonia")}
        </button>
      </div>
    </StepWrapper>
  );
}
