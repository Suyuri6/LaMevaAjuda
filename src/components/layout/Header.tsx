"use client";

import { useTranslations } from "next-intl";
import { Link } from "../../../i18n/navigation";
import LanguageSwitcher from "./LanguageSwitcher";

export default function Header() {
  const t = useTranslations("common");

  return (
    <header className="sticky top-0 z-50 border-b border-border/50 bg-surface-glass backdrop-blur-xl">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-8">
            <Link href="/" className="flex items-center gap-2 group">
              <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary text-white font-serif text-sm font-bold shadow-sm">
                L
              </span>
              <span className="text-lg font-bold text-foreground tracking-tight group-hover:text-primary transition-colors">
                {t("appName")}
              </span>
            </Link>
            <nav className="hidden sm:flex items-center gap-6">
              <Link
                href="/"
                className="text-sm font-medium text-muted hover:text-foreground transition-colors"
              >
                {t("home")}
              </Link>
              <Link
                href="/about"
                className="text-sm font-medium text-muted hover:text-foreground transition-colors"
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
