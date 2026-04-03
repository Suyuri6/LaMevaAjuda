import { useTranslations } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { Link } from "../../../i18n/navigation";
import { Clock, Shield, Search } from "lucide-react";

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <LandingContent />;
}

function LandingContent() {
  const t = useTranslations();

  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="relative py-20 sm:py-32 bg-gradient-to-b from-primary/5 to-background">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-foreground">
            {t("landing.heroTitle")}
          </h1>
          <p className="mt-6 text-lg sm:text-xl text-muted max-w-2xl mx-auto">
            {t("landing.heroSubtitle")}
          </p>
          <div className="mt-10">
            <Link
              href="/wizard"
              className="inline-flex items-center justify-center rounded-full bg-primary px-8 py-4 text-lg font-semibold text-white shadow-lg hover:bg-primary-hover transition-colors"
            >
              {t("common.startNow")}
            </Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            <FeatureCard
              icon={<Clock className="h-8 w-8 text-primary" />}
              title={t("landing.features.fast")}
              description={t("landing.features.fastDesc")}
            />
            <FeatureCard
              icon={<Search className="h-8 w-8 text-primary" />}
              title={t("landing.features.complete")}
              description={t("landing.features.completeDesc")}
            />
            <FeatureCard
              icon={<Shield className="h-8 w-8 text-primary" />}
              title={t("landing.features.free")}
              description={t("landing.features.freeDesc")}
            />
          </div>
        </div>
      </section>
    </div>
  );
}

function FeatureCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="flex flex-col items-center text-center p-6 rounded-2xl bg-card border border-border">
      <div className="mb-4">{icon}</div>
      <h3 className="text-lg font-semibold text-foreground">{title}</h3>
      <p className="mt-2 text-sm text-muted">{description}</p>
    </div>
  );
}
