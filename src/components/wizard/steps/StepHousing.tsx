"use client";

import { useTranslations } from "next-intl";
import { useWizardStore } from "@/stores/wizard-store";
import StepWrapper from "../StepWrapper";
import type { HousingSituation } from "@/types/wizard";
import { Home, Key, Users, Building, AlertTriangle, MoreHorizontal } from "lucide-react";

const options: { value: HousingSituation; labelKey: string; icon: React.ReactNode }[] = [
  { value: "owner", labelKey: "owner", icon: <Home className="h-4 w-4" /> },
  { value: "renter", labelKey: "renter", icon: <Key className="h-4 w-4" /> },
  { value: "shared", labelKey: "shared", icon: <Users className="h-4 w-4" /> },
  { value: "family_home", labelKey: "familyHome", icon: <Building className="h-4 w-4" /> },
  { value: "homeless", labelKey: "homeless", icon: <AlertTriangle className="h-4 w-4" /> },
  { value: "other", labelKey: "other", icon: <MoreHorizontal className="h-4 w-4" /> },
];

export default function StepHousing() {
  const t = useTranslations("wizard.steps.housing");
  const { data, setField } = useWizardStore();

  return (
    <StepWrapper title={t("title")}>
      <div className="space-y-2.5">
        {options.map((opt) => {
          const selected = data.housingSituation === opt.value;
          return (
            <button
              key={opt.value}
              onClick={() => setField("housingSituation", opt.value)}
              className={`w-full flex items-center gap-3 text-left px-4 py-3.5 rounded-xl border transition-all duration-200 ${
                selected
                  ? "border-primary bg-primary-light text-foreground shadow-sm"
                  : "border-border bg-card text-foreground hover:border-primary/30 hover:bg-surface-warm"
              }`}
            >
              <span className={`flex-shrink-0 ${selected ? "text-primary" : "text-muted"}`}>
                {opt.icon}
              </span>
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
