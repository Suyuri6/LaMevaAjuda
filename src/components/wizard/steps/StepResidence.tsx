"use client";

import { useTranslations } from "next-intl";
import { useWizardStore } from "@/stores/wizard-store";
import StepWrapper from "../StepWrapper";
import { MapPin } from "lucide-react";

export default function StepResidence() {
  const t = useTranslations("wizard.steps.residence");
  const { data, setField } = useWizardStore();

  return (
    <StepWrapper title={t("title")}>
      <div className="space-y-2.5">
        {[
          { value: true, label: t("inCatalonia") },
          { value: false, label: t("outsideCatalonia") },
        ].map((opt) => {
          const selected = data.residesInCatalonia === opt.value;
          return (
            <button
              key={String(opt.value)}
              onClick={() => {
                setField("residesInCatalonia", opt.value);
                if (!opt.value) setField("municipalityId", null);
              }}
              className={`w-full flex items-center gap-3 text-left px-4 py-3.5 rounded-xl border transition-all duration-200 ${
                selected
                  ? "border-primary bg-primary-light text-foreground shadow-sm"
                  : "border-border bg-card text-foreground hover:border-primary/30 hover:bg-surface-warm"
              }`}
            >
              <MapPin className={`h-4 w-4 flex-shrink-0 ${selected ? "text-primary" : "text-muted"}`} />
              <span className="font-medium">{opt.label}</span>
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
