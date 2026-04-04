import { useTranslations } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { Link } from "../../../../i18n/navigation";
import {
  User,
  Briefcase,
  Home,
  Heart,
  Accessibility,
  GraduationCap,
  Tractor,
  Building2,
  Layers,
  ArrowRight,
} from "lucide-react";

const SECTOR_ICONS: Record<string, React.ReactNode> = {
  personal: <User className="h-6 w-6" />,
  employment: <Briefcase className="h-6 w-6" />,
  housing: <Home className="h-6 w-6" />,
  family: <Heart className="h-6 w-6" />,
  disability: <Accessibility className="h-6 w-6" />,
  education: <GraduationCap className="h-6 w-6" />,
  agriculture: <Tractor className="h-6 w-6" />,
  business: <Building2 className="h-6 w-6" />,
  all: <Layers className="h-6 w-6" />,
};

const SECTORS = [
  "personal",
  "employment",
  "housing",
  "family",
  "disability",
  "education",
  "agriculture",
  "business",
] as const;

export default async function SectorsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <SectorsContent />;
}

function SectorsContent() {
  const t = useTranslations();

  return (
    <div className="flex-1 bg-gradient-to-b from-surface-warm to-background">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-12 sm:py-20">
        {/* Header */}
        <div className="text-center mb-12 animate-slide-up">
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-foreground leading-tight">
            {t("sectors.title")}
          </h1>
          <p className="mt-4 text-lg text-muted max-w-2xl mx-auto">
            {t("sectors.subtitle")}
          </p>
        </div>

        {/* Sector grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 stagger-children">
          {SECTORS.map((sector) => (
            <Link
              key={sector}
              href={`/wizard/${sector}`}
              className="group relative flex items-start gap-4 p-5 rounded-2xl border border-border/60 bg-card hover:shadow-lg hover:shadow-foreground/[0.03] hover:-translate-y-0.5 transition-all duration-300"
            >
              <div className="flex-shrink-0 flex items-center justify-center w-12 h-12 rounded-xl bg-primary-light text-primary transition-colors duration-300 group-hover:bg-primary group-hover:text-white">
                {SECTOR_ICONS[sector]}
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                  {t(`sectors.${sector}.name`)}
                </h3>
                <p className="mt-1 text-sm text-muted leading-relaxed">
                  {t(`sectors.${sector}.desc`)}
                </p>
              </div>
              <ArrowRight className="h-4 w-4 text-muted opacity-0 group-hover:opacity-100 transition-all duration-200 mt-1 flex-shrink-0" />
            </Link>
          ))}
        </div>

        {/* "All aids" option */}
        <div className="mt-8 text-center animate-fade-in" style={{ animationDelay: "0.5s" }}>
          <Link
            href="/wizard/all"
            className="group inline-flex items-center gap-3 px-6 py-4 rounded-2xl border-2 border-dashed border-border hover:border-primary/40 hover:bg-primary-light/50 transition-all duration-300"
          >
            <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-secondary text-muted group-hover:bg-primary group-hover:text-white transition-colors duration-300">
              {SECTOR_ICONS.all}
            </div>
            <div className="text-left">
              <span className="font-semibold text-foreground group-hover:text-primary transition-colors">
                {t("sectors.all.name")}
              </span>
              <p className="text-sm text-muted">{t("sectors.all.desc")}</p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
