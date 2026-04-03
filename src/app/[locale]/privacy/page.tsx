import { setRequestLocale } from "next-intl/server";
import { useTranslations } from "next-intl";

export default async function PrivacyPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <PrivacyContent />;
}

function PrivacyContent() {
  const t = useTranslations("common");

  return (
    <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-16">
      <h1 className="text-3xl font-bold text-foreground mb-6">
        {t("privacy")}
      </h1>
      <div className="prose prose-zinc dark:prose-invert max-w-none">
        <p>
          This website does not collect, store, or transmit any personal data.
          All information you enter in the questionnaire is processed entirely in
          your browser and on our server during the session. No data is saved
          after you close the page.
        </p>
        <p>
          We do not use cookies for tracking. We do not use analytics services.
          We do not share any information with third parties.
        </p>
        <p>{t("disclaimer")}</p>
      </div>
    </div>
  );
}
