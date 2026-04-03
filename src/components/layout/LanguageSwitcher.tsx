"use client";

import { useLocale } from "next-intl";
import { usePathname, useRouter } from "../../../i18n/navigation";
import { routing } from "../../../i18n/routing";

const localeLabels: Record<string, string> = {
  ca: "CA",
  es: "ES",
  en: "EN",
};

export default function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  function handleChange(newLocale: string) {
    router.replace(pathname, { locale: newLocale });
  }

  return (
    <div className="flex items-center gap-1">
      {routing.locales.map((loc) => (
        <button
          key={loc}
          onClick={() => handleChange(loc)}
          className={`px-2 py-1 text-xs font-medium rounded transition-colors ${
            locale === loc
              ? "bg-primary text-white"
              : "text-muted hover:text-foreground hover:bg-secondary"
          }`}
        >
          {localeLabels[loc]}
        </button>
      ))}
    </div>
  );
}
