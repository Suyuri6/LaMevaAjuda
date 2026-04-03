export type GovernmentLevel = "generalitat" | "estado" | "local" | "eu";

export type ComparisonOp =
  | "eq"
  | "neq"
  | "lt"
  | "lte"
  | "gt"
  | "gte"
  | "in"
  | "between";

export type AidCategory =
  | "income"
  | "housing"
  | "employment"
  | "family"
  | "disability"
  | "education"
  | "dependency";

export interface Aid {
  id: string;
  slug: string;
  government: GovernmentLevel;
  category: AidCategory;
  amount_text: Record<string, string>;
  official_url: Record<string, string>;
  is_active: boolean;
  valid_from: string | null;
  valid_until: string | null;
}

export interface AidTranslation {
  id: string;
  aid_id: string;
  locale: string;
  name: string;
  short_desc: string;
  description: string;
  eligibility_summary: string;
  how_to_apply: string | null;
}

export interface EligibilityRule {
  id: string;
  aid_id: string;
  field: string;
  operator: ComparisonOp;
  value: unknown;
  rule_group: number;
}

export interface AidWithDetails extends Aid {
  aid_translations: AidTranslation[];
  eligibility_rules: EligibilityRule[];
}

export interface MatchedAid {
  aid: Aid;
  translation: AidTranslation;
}
