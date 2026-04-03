export type EmploymentStatus =
  | "employed"
  | "unemployed"
  | "self_employed"
  | "student"
  | "retired";

export type FamilySituation =
  | "single"
  | "married"
  | "domestic_partner"
  | "single_parent"
  | "widowed"
  | "divorced";

export type HousingSituation =
  | "owner"
  | "renter"
  | "shared"
  | "family_home"
  | "homeless"
  | "other";

export type ImmigrationStatus =
  | "citizen"
  | "eu_national"
  | "permanent_resident"
  | "temporary_resident"
  | "refugee"
  | "undocumented";

export interface WizardData {
  dateOfBirth: string | null;
  employmentStatus: EmploymentStatus | null;
  annualIncome: number | null;
  familySituation: FamilySituation | null;
  numberOfDependents: number;
  residesInCatalonia: boolean | null;
  municipalityId: number | null;
  disabilityPercentage: number;
  immigrationStatus: ImmigrationStatus | null;
  housingSituation: HousingSituation | null;
}
