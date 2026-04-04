import type { AidCategory } from "@/types/aid";

export type StepId =
  | "age"
  | "employment"
  | "income"
  | "family"
  | "residence"
  | "disability"
  | "immigration"
  | "housing";

export type SectorSlug =
  | "personal"
  | "employment"
  | "housing"
  | "family"
  | "disability"
  | "education"
  | "agriculture"
  | "business"
  | "all";

export interface SectorConfig {
  slug: SectorSlug;
  categories: AidCategory[];
  steps: StepId[];
}

export const SECTOR_CONFIGS: SectorConfig[] = [
  {
    slug: "personal",
    categories: ["income", "social_inclusion", "immigration"],
    steps: ["age", "employment", "income", "family", "residence", "immigration"],
  },
  {
    slug: "employment",
    categories: ["employment", "entrepreneurship"],
    steps: ["age", "employment", "income", "residence", "immigration"],
  },
  {
    slug: "housing",
    categories: ["housing", "energy"],
    steps: ["age", "income", "residence", "immigration", "housing"],
  },
  {
    slug: "family",
    categories: ["family", "dependency", "pension"],
    steps: ["age", "employment", "income", "family", "residence", "immigration"],
  },
  {
    slug: "disability",
    categories: ["disability", "health"],
    steps: ["age", "income", "residence", "disability", "immigration"],
  },
  {
    slug: "education",
    categories: ["education", "youth"],
    steps: ["age", "employment", "income", "residence"],
  },
  {
    slug: "agriculture",
    categories: ["agriculture", "fishing"],
    steps: ["age", "employment", "income", "residence"],
  },
  {
    slug: "business",
    categories: ["tax", "commerce", "tourism", "culture", "sports", "digital", "seniors", "transport"],
    steps: ["age", "employment", "income", "residence", "disability", "family"],
  },
  {
    slug: "all",
    categories: [
      "income", "housing", "employment", "family", "disability", "education",
      "dependency", "pension", "social_inclusion", "tax", "immigration",
      "entrepreneurship", "agriculture", "fishing", "culture", "sports",
      "digital", "tourism", "commerce", "energy", "health", "youth",
      "seniors", "transport",
    ],
    steps: ["age", "employment", "income", "family", "residence", "disability", "immigration", "housing"],
  },
];

export function getSectorConfig(slug: string): SectorConfig | undefined {
  return SECTOR_CONFIGS.find((s) => s.slug === slug);
}

export const SECTOR_SLUGS = SECTOR_CONFIGS.map((s) => s.slug);
