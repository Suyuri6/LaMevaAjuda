import { create } from "zustand";
import type { WizardData } from "@/types/wizard";
import { getSectorConfig, type SectorSlug } from "@/lib/sectors/config";

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
  sector: SectorSlug | null;
  data: WizardData;
  setSector: (slug: SectorSlug) => void;
  setField: <K extends keyof WizardData>(key: K, value: WizardData[K]) => void;
  setFields: (fields: Partial<WizardData>) => void;
  nextStep: () => void;
  prevStep: () => void;
  goToStep: (step: number) => void;
  reset: () => void;
}

export const useWizardStore = create<WizardStore>((set, get) => ({
  currentStep: 0,
  totalSteps: 8,
  sector: null,
  data: { ...initialData },
  setSector: (slug) => {
    const config = getSectorConfig(slug);
    const total = config ? config.steps.length : 8;
    set({ sector: slug, totalSteps: total, currentStep: 0, data: { ...initialData } });
  },
  setField: (key, value) =>
    set((state) => ({ data: { ...state.data, [key]: value } })),
  setFields: (fields) =>
    set((state) => ({ data: { ...state.data, ...fields } })),
  nextStep: () =>
    set((state) => ({
      currentStep: Math.min(state.currentStep + 1, state.totalSteps - 1),
    })),
  prevStep: () =>
    set((state) => ({
      currentStep: Math.max(state.currentStep - 1, 0),
    })),
  goToStep: (step) =>
    set((state) => ({
      currentStep: Math.max(0, Math.min(step, state.totalSteps - 1)),
    })),
  reset: () => set({ currentStep: 0, sector: null, data: { ...initialData } }),
}));
