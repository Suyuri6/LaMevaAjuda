import { NextResponse } from "next/server";
import { computeProfile, matchAids } from "@/lib/matching/engine";
import { seedAids } from "@/lib/data/seed-aids";
import type { AidWithDetails } from "@/types/aid";

const supabaseConfigured =
  process.env.NEXT_PUBLIC_SUPABASE_URL &&
  process.env.NEXT_PUBLIC_SUPABASE_URL !== "your-supabase-url-here";

async function getAids(): Promise<AidWithDetails[]> {
  if (!supabaseConfigured) {
    return seedAids;
  }

  const { createClient } = await import("@/lib/supabase/server");
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("aids")
    .select("*, aid_translations(*), eligibility_rules(*)")
    .eq("is_active", true);

  if (error) throw error;
  return (data as unknown as AidWithDetails[]) ?? [];
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { wizardData, locale = "ca" } = body;

    if (!wizardData) {
      return NextResponse.json(
        { error: "Missing wizard data" },
        { status: 400 }
      );
    }

    const profile = computeProfile(wizardData);
    const aids = await getAids();
    const matches = matchAids(profile, aids, locale);

    return NextResponse.json({ matches });
  } catch {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
