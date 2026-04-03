import type { EligibilityRule, AidWithDetails, MatchedAid } from "@/types/aid";
import type { WizardData } from "@/types/wizard";

export interface UserProfile {
  age: number;
  employmentStatus: string;
  annualIncome: number;
  familySituation: string;
  numberOfDependents: number;
  residesInCatalonia: boolean;
  municipalityId: number | null;
  disabilityPercentage: number;
  immigrationStatus: string;
  housingSituation: string;
}

export function computeProfile(data: WizardData): UserProfile {
  const birthDate = new Date(data.dateOfBirth!);
  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();
  if (
    monthDiff < 0 ||
    (monthDiff === 0 && today.getDate() < birthDate.getDate())
  ) {
    age--;
  }

  return {
    age,
    employmentStatus: data.employmentStatus!,
    annualIncome: data.annualIncome ?? 0,
    familySituation: data.familySituation!,
    numberOfDependents: data.numberOfDependents,
    residesInCatalonia: data.residesInCatalonia ?? false,
    municipalityId: data.municipalityId,
    disabilityPercentage: data.disabilityPercentage,
    immigrationStatus: data.immigrationStatus!,
    housingSituation: data.housingSituation!,
  };
}

function evaluateRule(rule: EligibilityRule, profile: UserProfile): boolean {
  const fieldValue = profile[rule.field as keyof UserProfile];
  if (fieldValue === undefined || fieldValue === null) return false;

  const ruleValue = rule.value;

  switch (rule.operator) {
    case "eq":
      return fieldValue === ruleValue;
    case "neq":
      return fieldValue !== ruleValue;
    case "lt":
      return (fieldValue as number) < (ruleValue as number);
    case "lte":
      return (fieldValue as number) <= (ruleValue as number);
    case "gt":
      return (fieldValue as number) > (ruleValue as number);
    case "gte":
      return (fieldValue as number) >= (ruleValue as number);
    case "in":
      return (ruleValue as unknown[]).includes(fieldValue);
    case "between": {
      const [min, max] = ruleValue as [number, number];
      const numVal = fieldValue as number;
      return numVal >= min && numVal <= max;
    }
    default:
      return false;
  }
}

function groupBy<T>(arr: T[], keyFn: (item: T) => number): Record<number, T[]> {
  const result: Record<number, T[]> = {};
  for (const item of arr) {
    const key = keyFn(item);
    if (!result[key]) result[key] = [];
    result[key].push(item);
  }
  return result;
}

export function matchAids(
  profile: UserProfile,
  aids: AidWithDetails[],
  locale: string
): MatchedAid[] {
  const results: MatchedAid[] = [];

  for (const aid of aids) {
    if (!aid.is_active) continue;

    const rules = aid.eligibility_rules;
    if (rules.length === 0) {
      // No rules means the aid is available to everyone
      const translation = aid.aid_translations.find(
        (t) => t.locale === locale
      );
      if (translation) {
        results.push({ aid, translation });
      }
      continue;
    }

    const groups = groupBy(rules, (r) => r.rule_group);
    const matches = Object.values(groups).some((groupRules) =>
      groupRules.every((rule) => evaluateRule(rule, profile))
    );

    if (matches) {
      const translation = aid.aid_translations.find(
        (t) => t.locale === locale
      );
      if (translation) {
        results.push({ aid, translation });
      }
    }
  }

  return results;
}
