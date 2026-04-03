"use client";

import { useTranslations } from "next-intl";
import { Link } from "../../../i18n/navigation";

export default function Footer() {
  const t = useTranslations("common");

  return (
    <footer className="border-t border-border/50 bg-surface-warm py-10">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex flex-col items-center sm:items-start gap-2">
            <span className="text-sm font-semibold text-foreground tracking-tight">LaMevaAjuda</span>
            <p className="text-xs text-muted max-w-sm text-center sm:text-left leading-relaxed">{t("disclaimer")}</p>
          </div>
          <div className="flex items-center gap-6">
            <Link
              href="/privacy"
              className="text-sm text-muted hover:text-primary transition-colors"
            >
              {t("privacy")}
            </Link>
            <Link
              href="/about"
              className="text-sm text-muted hover:text-primary transition-colors"
            >
              {t("about")}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
