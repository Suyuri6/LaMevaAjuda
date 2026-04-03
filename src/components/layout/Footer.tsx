"use client";

import { useTranslations } from "next-intl";
import { Link } from "../../../i18n/navigation";

export default function Footer() {
  const t = useTranslations("common");

  return (
    <footer className="border-t border-border bg-card py-8">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted">{t("disclaimer")}</p>
          <div className="flex items-center gap-4">
            <Link
              href="/privacy"
              className="text-sm text-muted hover:text-foreground transition-colors"
            >
              {t("privacy")}
            </Link>
            <Link
              href="/about"
              className="text-sm text-muted hover:text-foreground transition-colors"
            >
              {t("about")}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
