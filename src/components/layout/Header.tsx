"use client";

import { useTranslations } from "next-intl";
import { Link } from "../../../i18n/navigation";
import LanguageSwitcher from "./LanguageSwitcher";

export default function Header() {
  const t = useTranslations("common");

  return (
    <header className="border-b border-border bg-card">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-8">
            <Link href="/" className="text-xl font-bold text-primary">
              {t("appName")}
            </Link>
            <nav className="hidden sm:flex items-center gap-6">
              <Link
                href="/"
                className="text-sm text-muted hover:text-foreground transition-colors"
              >
                {t("home")}
              </Link>
              <Link
                href="/about"
                className="text-sm text-muted hover:text-foreground transition-colors"
              >
                {t("about")}
              </Link>
            </nav>
          </div>
          <LanguageSwitcher />
        </div>
      </div>
    </header>
  );
}
