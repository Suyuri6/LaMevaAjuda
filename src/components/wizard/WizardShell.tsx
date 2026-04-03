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
import { ArrowLeft, ArrowRight, CheckCircle } from "lucide-react";

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
    <div className="w-full max-w-xl mx-auto px-4 py-8">
      <ProgressBar
        current={currentStep}
        total={totalSteps}
        label={t("wizard.progress", {
          current: currentStep + 1,
          total: totalSteps,
        })}
      />

      <div className="mt-10 mb-10 animate-step-reveal" key={currentStep}>
        <StepComponent />
      </div>

      <div className="flex justify-between gap-4">
        <button
          onClick={prevStep}
          disabled={isFirstStep}
          className={`group inline-flex items-center gap-2 px-5 py-3 rounded-xl font-medium transition-all duration-200 ${
            isFirstStep
              ? "invisible"
              : "border border-border text-muted hover:text-foreground hover:border-foreground/20 hover:bg-secondary"
          }`}
        >
          <ArrowLeft className="h-4 w-4 transition-transform duration-200 group-hover:-translate-x-0.5" />
          {t("common.back")}
        </button>
        <button
          onClick={handleNext}
          className="group inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold bg-primary text-white shadow-md shadow-primary/15 hover:bg-primary-hover hover:shadow-lg hover:shadow-primary/20 transition-all duration-200 hover:-translate-y-0.5"
        >
          {isLastStep ? (
            <>
              {t("common.seeResults")}
              <CheckCircle className="h-4 w-4" />
            </>
          ) : (
            <>
              {t("common.next")}
              <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
            </>
          )}
        </button>
      </div>
    </div>
  );
}
