import { NextResponse } from "next/server";
import { computeProfile, matchAids } from "@/lib/matching/engine";
import { seedAids } from "@/lib/data/seed-aids";
import { db } from "@/lib/db/turso";
import { getSectorConfig } from "@/lib/sectors/config";
import type { AidWithDetails, AidTranslation, EligibilityRule } from "@/types/aid";

const tursoConfigured =
  process.env.TURSO_DATABASE_URL &&
  !process.env.TURSO_DATABASE_URL.includes("your-");

async function getAids(): Promise<AidWithDetails[]> {
  if (!tursoConfigured) {
    return seedAids;
  }

  const aidsResult = await db.execute("SELECT * FROM aids WHERE is_active = 1");
  const translationsResult = await db.execute("SELECT * FROM aid_translations");
  const rulesResult = await db.execute("SELECT * FROM eligibility_rules");

  const translations = translationsResult.rows as unknown as AidTranslation[];
  const rules = rulesResult.rows.map((r) => ({
    ...r,
    value: JSON.parse(r.value as string),
  })) as unknown as EligibilityRule[];

  return aidsResult.rows.map((aid) => ({
    ...aid,
    amount_text: JSON.parse(aid.amount_text as string),
    official_url: JSON.parse(aid.official_url as string),
    is_active: Boolean(aid.is_active),
    aid_translations: translations.filter((t) => t.aid_id === aid.id),
    eligibility_rules: rules.filter((r) => r.aid_id === aid.id),
  })) as unknown as AidWithDetails[];
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { wizardData, locale = "ca", sector } = body;

    if (!wizardData) {
      return NextResponse.json(
        { error: "Missing wizard data" },
        { status: 400 }
      );
    }

    const profile = computeProfile(wizardData);
    const aids = await getAids();
    const allMatches = matchAids(profile, aids, locale);

    // Filter by sector categories if a sector is specified
    const sectorConfig = sector ? getSectorConfig(sector) : null;
    const matches = sectorConfig
      ? allMatches.filter((m) => sectorConfig.categories.includes(m.aid.category))
      : allMatches;

    return NextResponse.json({ matches });
  } catch (e) {
    console.error("Match API error:", e);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
