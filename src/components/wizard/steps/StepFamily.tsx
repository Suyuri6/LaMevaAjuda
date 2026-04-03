"use client";

import { useTranslations } from "next-intl";
import { useWizardStore } from "@/stores/wizard-store";
import StepWrapper from "../StepWrapper";
import type { FamilySituation } from "@/types/wizard";
import { Users } from "lucide-react";

const options: { value: FamilySituation; labelKey: string }[] = [
  { value: "single", labelKey: "single" },
  { value: "married", labelKey: "married" },
  { value: "single_parent", labelKey: "singleParent" },
  { value: "widowed", labelKey: "widowed" },
  { value: "divorced", labelKey: "divorced" },
];

export default function StepFamily() {
  const t = useTranslations("wizard.steps.family");
  const { data, setField } = useWizardStore();

  return (
    <StepWrapper title={t("title")}>
      <div className="space-y-2.5">
        {options.map((opt) => {
          const selected = data.familySituation === opt.value;
          return (
            <button
              key={opt.value}
              onClick={() => setField("familySituation", opt.value)}
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

      <div className="mt-8">
        <label className="block">
          <span className="text-sm font-medium text-muted">
            {t("dependents")}
          </span>
          <div className="relative mt-2">
            <Users className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted pointer-events-none" />
            <input
              type="number"
              min={0}
              max={20}
              value={data.numberOfDependents}
              onChange={(e) =>
                setField("numberOfDependents", Number(e.target.value))
              }
              className="block w-full rounded-xl border border-border bg-card pl-11 pr-4 py-3.5 text-foreground focus:border-primary focus:ring-2 focus:ring-primary/15 outline-none transition-all duration-200"
            />
          </div>
          <span className="mt-2 block text-xs text-muted">
            {t("dependentsHelp")}
          </span>
        </label>
      </div>
    </StepWrapper>
  );
}
