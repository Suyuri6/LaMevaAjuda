import { setRequestLocale } from "next-intl/server";
import { useTranslations } from "next-intl";

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <AboutContent />;
}

function AboutContent() {
  const t = useTranslations("common");

  return (
    <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-16">
      <h1 className="text-3xl font-bold text-foreground mb-6">
        {t("about")}
      </h1>
      <div className="prose prose-zinc dark:prose-invert max-w-none">
        <p>
          {t("appName")} is a free, open informational tool designed to help
          residents of Catalonia and Spain discover government aid, subsidies,
          and benefits they may be eligible for.
        </p>
        <p>{t("disclaimer")}</p>
      </div>
    </div>
  );
}
