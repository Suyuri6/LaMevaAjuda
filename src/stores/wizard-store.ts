import { create } from "zustand";
import type { WizardData } from "@/types/wizard";

const TOTAL_STEPS = 8;

const initialData: WizardData = {
  dateOfBirth: null,
  employmentStatus: null,
  annualIncome: null,
  familySituation: null,
  numberOfDependents: 0,
  residesInCatalonia: null,
  municipalityId: null,
  disabilityPercentage: 0,
  immigrationStatus: null,
  housingSituation: null,
};

interface WizardStore {
  currentStep: number;
  totalSteps: number;
  data: WizardData;
  setField: <K extends keyof WizardData>(key: K, value: WizardData[K]) => void;
  setFields: (fields: Partial<WizardData>) => void;
  nextStep: () => void;
  prevStep: () => void;
  goToStep: (step: number) => void;
  reset: () => void;
}

export const useWizardStore = create<WizardStore>((set) => ({
  currentStep: 0,
  totalSteps: TOTAL_STEPS,
  data: { ...initialData },
  setField: (key, value) =>
    set((state) => ({ data: { ...state.data, [key]: value } })),
  setFields: (fields) =>
    set((state) => ({ data: { ...state.data, ...fields } })),
  nextStep: () =>
    set((state) => ({
      currentStep: Math.min(state.currentStep + 1, TOTAL_STEPS - 1),
    })),
  prevStep: () =>
    set((state) => ({
      currentStep: Math.max(state.currentStep - 1, 0),
    })),
  goToStep: (step) =>
    set({ currentStep: Math.max(0, Math.min(step, TOTAL_STEPS - 1)) }),
  reset: () => set({ currentStep: 0, data: { ...initialData } }),
}));
