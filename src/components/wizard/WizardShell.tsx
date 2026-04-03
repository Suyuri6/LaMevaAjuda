"use client";

import { useTranslations } from "next-intl";
import { useRouter } from "../../../i18n/navigation";
import { useWizardStore } from "@/stores/wizard-store";
import ProgressBar from "@/components/ui/ProgressBar";
import StepAge from "./steps/StepAge";
import StepEmployment from "./steps/StepEmployment";
import StepIncome from "./steps/StepIncome";
import StepFamily from "./steps/StepFamily";
import StepResidence from "./steps/StepResidence";
import StepDisability from "./steps/StepDisability";
import StepImmigration from "./steps/StepImmigration";
import StepHousing from "./steps/StepHousing";

const STEPS = [
  StepAge,
  StepEmployment,
  StepIncome,
  StepFamily,
  StepResidence,
  StepDisability,
  StepImmigration,
  StepHousing,
];

export default function WizardShell() {
  const t = useTranslations();
  const router = useRouter();
  const { currentStep, totalSteps, nextStep, prevStep } = useWizardStore();

  const StepComponent = STEPS[currentStep];
  const isLastStep = currentStep === totalSteps - 1;
  const isFirstStep = currentStep === 0;

  function handleNext() {
    if (isLastStep) {
      router.push("/results");
    } else {
      nextStep();
    }
  }

  return (
    <div className="w-full max-w-2xl mx-auto px-4 py-8">
      <ProgressBar
        current={currentStep}
        total={totalSteps}
        label={t("wizard.progress", {
          current: currentStep + 1,
          total: totalSteps,
        })}
      />

      <div className="mt-8 mb-8">
        <StepComponent />
      </div>

      <div className="flex justify-between gap-4">
        <button
          onClick={prevStep}
          disabled={isFirstStep}
          className={`px-6 py-3 rounded-lg font-medium transition-colors ${
            isFirstStep
              ? "invisible"
              : "border border-border text-foreground hover:bg-secondary"
          }`}
        >
          {t("common.back")}
        </button>
        <button
          onClick={handleNext}
          className="px-6 py-3 rounded-lg font-medium bg-primary text-white hover:bg-primary-hover transition-colors"
        >
          {isLastStep ? t("common.seeResults") : t("common.next")}
        </button>
      </div>
    </div>
  );
}
