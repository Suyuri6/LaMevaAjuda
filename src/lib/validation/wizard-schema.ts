import { z } from "zod";

export const stepAgeSchema = z.object({
  dateOfBirth: z
    .string()
    .min(1, "Required")
    .refine(
      (val) => {
        const date = new Date(val);
        const now = new Date();
        const age = now.getFullYear() - date.getFullYear();
        return age >= 16 && age <= 120;
      },
      { message: "Age must be between 16 and 120" }
    ),
});

export const stepEmploymentSchema = z.object({
  employmentStatus: z.enum([
    "employed",
    "unemployed",
    "self_employed",
    "student",
    "retired",
  ]),
});

export const stepIncomeSchema = z.object({
  annualIncome: z.number().min(0).max(999999),
});

export const stepFamilySchema = z.object({
  familySituation: z.enum([
    "single",
    "married",
    "domestic_partner",
    "single_parent",
    "widowed",
    "divorced",
  ]),
  numberOfDependents: z.number().int().min(0).max(20),
});

export const stepResidenceSchema = z.object({
  residesInCatalonia: z.boolean(),
  municipalityId: z.number().nullable(),
});

export const stepDisabilitySchema = z.object({
  disabilityPercentage: z.number().int().min(0).max(100),
});

export const stepImmigrationSchema = z.object({
  immigrationStatus: z.enum([
    "citizen",
    "eu_national",
    "permanent_resident",
    "temporary_resident",
    "refugee",
    "undocumented",
  ]),
});

export const stepHousingSchema = z.object({
  housingSituation: z.enum([
    "owner",
    "renter",
    "shared",
    "family_home",
    "homeless",
    "other",
  ]),
});

export const fullWizardSchema = stepAgeSchema
  .merge(stepEmploymentSchema)
  .merge(stepIncomeSchema)
  .merge(stepFamilySchema)
  .merge(stepResidenceSchema)
  .merge(stepDisabilitySchema)
  .merge(stepImmigrationSchema)
  .merge(stepHousingSchema);

export type FullWizardData = z.infer<typeof fullWizardSchema>;
