import { setRequestLocale } from "next-intl/server";
import WizardShell from "@/components/wizard/WizardShell";

export default async function WizardPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <div className="flex-1 flex items-start justify-center py-8 sm:py-16">
      <WizardShell />
    </div>
  );
}
