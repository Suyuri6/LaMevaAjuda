import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { computeProfile, matchAids } from "@/lib/matching/engine";
import type { AidWithDetails } from "@/types/aid";

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

    const supabase = await createClient();
    const { data: aids, error } = await supabase
      .from("aids")
      .select("*, aid_translations(*), eligibility_rules(*)")
      .eq("is_active", true);

    if (error) {
      return NextResponse.json(
        { error: "Failed to fetch aids" },
        { status: 500 }
      );
    }

    const matches = matchAids(
      profile,
      (aids as unknown as AidWithDetails[]) ?? [],
      locale
    );

    return NextResponse.json({ matches });
  } catch {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
