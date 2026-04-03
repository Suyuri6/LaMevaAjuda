"use client";

import { useTranslations } from "next-intl";
import { useWizardStore } from "@/stores/wizard-store";
import StepWrapper from "../StepWrapper";
import type { EmploymentStatus } from "@/types/wizard";
import { Briefcase, AlertCircle, Laptop, GraduationCap, Armchair } from "lucide-react";

const options: { value: EmploymentStatus; labelKey: string; icon: React.ReactNode }[] = [
  { value: "employed", labelKey: "employed", icon: <Briefcase className="h-4 w-4" /> },
  { value: "unemployed", labelKey: "unemployed", icon: <AlertCircle className="h-4 w-4" /> },
  { value: "self_employed", labelKey: "selfEmployed", icon: <Laptop className="h-4 w-4" /> },
  { value: "student", labelKey: "student", icon: <GraduationCap className="h-4 w-4" /> },
  { value: "retired", labelKey: "retired", icon: <Armchair className="h-4 w-4" /> },
];

export default function StepEmployment() {
  const t = useTranslations("wizard.steps.employment");
  const { data, setField } = useWizardStore();

  return (
    <StepWrapper title={t("title")}>
      <div className="space-y-2.5 stagger-children">
        {options.map((opt) => {
          const selected = data.employmentStatus === opt.value;
          return (
            <button
              key={opt.value}
              onClick={() => setField("employmentStatus", opt.value)}
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
