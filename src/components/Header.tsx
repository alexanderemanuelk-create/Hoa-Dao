"use client";

import { useState } from "react";
import { useLanguage } from "@/i18n/LanguageProvider";
import { siteConfig } from "@/config";
import { getNavItems } from "@/lib/sections";

const navLinkClass = "text-sm font-medium text-ink/70 transition-colors hover:text-ink";

const navItems = getNavItems();

/** SK/EN prepínač priamo v navigácii, ako obyčajný text . */
function LanguageToggle({ className = "" }: { className?: string }) {
  const { lang, setLang } = useLanguage();

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <button
        type="button"
        onClick={() => setLang("sk")}
        className={`text-xs font-medium uppercase tracking-[0.12em] transition-colors ${
          lang === "sk" ? "text-ink" : "text-ink/40 hover:text-ink/70"
        }`}
      >
        SK
      </button>
      <span className="text-ink/25">/</span>
      <button
        type="button"
        onClick={() => setLang("en")}
        className={`text-xs font-medium uppercase tracking-[0.12em] transition-colors ${
          lang === "en" ? "text-ink" : "text-ink/40 hover:text-ink/70"
        }`}
      >
        EN
      </button>
    </div>
  );
}

/**
 * Navigácia — súčasť "dupe pad" identity (viď Hero.tsx): papierové pozadie
 * a bodkovaná spodná hrana namiesto plnej čiary, ako trhacia perforácia na
 * kuchynskom objednávkovom lístku.
 */
export function Header() {
  const { t } = useLanguage();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b-2 border-dotted border-ink/25 bg-paper">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6 lg:px-10">
        <a href="#top" className="font-fraunces text-lg font-medium tracking-tight text-ink">
          {siteConfig.name}
        </a>

        <nav className="hidden items-center gap-8 md:flex">
          {navItems.map((item) => (
            <a key={item.key} href={item.href} className={navLinkClass}>
              {t(`nav.${item.key}`)}
            </a>
          ))}
          <LanguageToggle className="border-l border-dotted border-ink/25 pl-6" />
        </nav>

        <button
          type="button"
          className="flex flex-col gap-1.5 md:hidden"
          aria-label="Menu"
          aria-expanded={mobileOpen}
          onClick={() => setMobileOpen((v) => !v)}
        >
          <span
            className={`h-0.5 w-6 bg-ink transition-transform ${
              mobileOpen ? "translate-y-[4px] rotate-45" : ""
            }`}
          />
          <span
            className={`h-0.5 w-6 bg-ink transition-transform ${
              mobileOpen ? "-translate-y-[4px] -rotate-45" : ""
            }`}
          />
        </button>
      </div>

      {mobileOpen && (
        <nav className="flex flex-col gap-1 border-t border-dotted border-ink/25 bg-paper px-6 pb-4 md:hidden">
          {navItems.map((item) => (
            <a
              key={item.key}
              href={item.href}
              onClick={() => setMobileOpen(false)}
              className={`${navLinkClass} py-3`}
            >
              {t(`nav.${item.key}`)}
            </a>
          ))}
          <LanguageToggle className="py-3" />
        </nav>
      )}
    </header>
  );
}
