import { useTranslations } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { Link } from "../../../i18n/navigation";
import { Clock, Shield, Search, ArrowRight, Heart, Sparkles } from "lucide-react";

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
      <section className="relative overflow-hidden py-24 sm:py-36">
        {/* Warm gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-hero-gradient-start via-background to-hero-gradient-end" />

        {/* Decorative circles */}
        <div className="absolute top-20 -left-32 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-10 -right-20 w-80 h-80 bg-accent/10 rounded-full blur-3xl" />

        {/* Decorative geometric accents */}
        <div className="absolute top-12 right-[15%] w-3 h-3 rounded-full bg-primary/20 animate-fade-in" style={{ animationDelay: "0.8s" }} />
        <div className="absolute top-32 right-[10%] w-2 h-2 rounded-full bg-accent/30 animate-fade-in" style={{ animationDelay: "1s" }} />
        <div className="absolute bottom-24 left-[12%] w-4 h-4 rounded-full bg-primary/10 animate-fade-in" style={{ animationDelay: "1.2s" }} />

        <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <div className="animate-slide-up" style={{ animationDelay: "0.1s" }}>
            <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-medium tracking-wide uppercase bg-primary-light text-primary border border-primary/10">
              <Sparkles className="h-3 w-3" />
              {t("landing.features.free")}
            </span>
          </div>

          <h1
            className="mt-8 font-serif text-5xl sm:text-6xl lg:text-7xl leading-[1.08] tracking-tight text-foreground animate-slide-up"
            style={{ animationDelay: "0.2s" }}
          >
            {t("landing.heroTitle")}
          </h1>

          <p
            className="mt-6 text-lg sm:text-xl text-muted max-w-2xl mx-auto leading-relaxed animate-slide-up"
            style={{ animationDelay: "0.3s" }}
          >
            {t("landing.heroSubtitle")}
          </p>

          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 animate-slide-up" style={{ animationDelay: "0.4s" }}>
            <Link
              href="/sectors"
              className="group inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-8 py-4 text-lg font-semibold text-white shadow-lg shadow-primary/20 hover:bg-primary-hover hover:shadow-xl hover:shadow-primary/25 transition-all duration-300 hover:-translate-y-0.5"
            >
              {t("common.startNow")}
              <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </div>

          {/* Trust indicators */}
          <div className="mt-12 flex items-center justify-center gap-6 text-sm text-muted animate-fade-in" style={{ animationDelay: "0.7s" }}>
            <span className="flex items-center gap-1.5">
              <Shield className="h-4 w-4 text-success" />
              {t("landing.features.freeDesc")}
            </span>
            <span className="hidden sm:block w-1 h-1 rounded-full bg-border" />
            <span className="hidden sm:flex items-center gap-1.5">
              <Clock className="h-4 w-4 text-accent" />
              {t("landing.features.fastDesc")}
            </span>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 sm:py-28 bg-surface-warm">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-serif text-3xl sm:text-4xl text-foreground">
              Com funciona?
            </h2>
            <div className="mt-3 mx-auto w-12 h-0.5 bg-primary/40 rounded-full" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 lg:gap-10 stagger-children">
            <FeatureCard
              number="1"
              icon={<Clock className="h-6 w-6" />}
              title={t("landing.features.fast")}
              description={t("landing.features.fastDesc")}
            />
            <FeatureCard
              number="2"
              icon={<Search className="h-6 w-6" />}
              title={t("landing.features.complete")}
              description={t("landing.features.completeDesc")}
            />
            <FeatureCard
              number="3"
              icon={<Heart className="h-6 w-6" />}
              title={t("landing.features.free")}
              description={t("landing.features.freeDesc")}
            />
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-20 sm:py-28">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-serif text-3xl sm:text-4xl text-foreground">
            Comencem?
          </h2>
          <p className="mt-4 text-muted text-lg">
            {t("landing.heroSubtitle")}
          </p>
          <div className="mt-8">
            <Link
              href="/sectors"
              className="group inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-8 py-4 text-lg font-semibold text-white shadow-lg shadow-primary/20 hover:bg-primary-hover hover:shadow-xl hover:shadow-primary/25 transition-all duration-300 hover:-translate-y-0.5"
            >
              {t("common.startNow")}
              <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

function FeatureCard({
  number,
  icon,
  title,
  description,
}: {
  number: string;
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="group relative flex flex-col items-center text-center p-8 rounded-2xl bg-card border border-border/60 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300">
      <div className="flex items-center justify-center w-14 h-14 rounded-xl bg-primary-light text-primary mb-5 transition-colors duration-300 group-hover:bg-primary group-hover:text-white">
        {icon}
      </div>
      <span className="absolute top-4 right-5 font-serif text-4xl text-border/60">{number}</span>
      <h3 className="text-lg font-semibold text-foreground">{title}</h3>
      <p className="mt-2 text-sm text-muted leading-relaxed">{description}</p>
    </div>
  );
}
