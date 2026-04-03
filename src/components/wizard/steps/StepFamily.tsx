"use client";

import { useTranslations } from "next-intl";
import { useWizardStore } from "@/stores/wizard-store";
import StepWrapper from "../StepWrapper";
import type { FamilySituation } from "@/types/wizard";

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
      <div className="space-y-3">
        {options.map((opt) => (
          <button
            key={opt.value}
            onClick={() => setField("familySituation", opt.value)}
            className={`w-full text-left px-4 py-3 rounded-lg border transition-colors ${
              data.familySituation === opt.value
                ? "border-primary bg-primary/10 text-foreground"
                : "border-border bg-card text-foreground hover:border-primary/50"
            }`}
          >
            {t(opt.labelKey)}
          </button>
        ))}
      </div>

      <div className="mt-6">
        <label className="block">
          <span className="text-sm font-medium text-foreground">
            {t("dependents")}
          </span>
          <input
            type="number"
            min={0}
            max={20}
            value={data.numberOfDependents}
            onChange={(e) =>
              setField("numberOfDependents", Number(e.target.value))
            }
            className="mt-2 block w-full rounded-lg border border-border bg-card px-4 py-3 text-foreground focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-colors"
          />
          <span className="mt-1 text-xs text-muted">
            {t("dependentsHelp")}
          </span>
        </label>
      </div>
    </StepWrapper>
  );
}
