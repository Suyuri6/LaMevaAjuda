import { setRequestLocale } from "next-intl/server";
import { redirect } from "next/navigation";
import WizardShell from "@/components/wizard/WizardShell";
import { SECTOR_SLUGS, type SectorSlug } from "@/lib/sectors/config";

export function generateStaticParams() {
  return SECTOR_SLUGS.map((sector) => ({ sector }));
}

export default async function SectorWizardPage({
  params,
}: {
  params: Promise<{ locale: string; sector: string }>;
}) {
  const { locale, sector } = await params;
  setRequestLocale(locale);

  if (!SECTOR_SLUGS.includes(sector as SectorSlug)) {
    redirect(`/${locale}/sectors`);
  }

  return (
    <div className="flex-1 flex items-start justify-center py-10 sm:py-20 bg-gradient-to-b from-surface-warm to-background">
      <WizardShell sector={sector as SectorSlug} />
    </div>
  );
}
