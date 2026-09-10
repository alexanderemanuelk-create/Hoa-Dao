"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLanguage } from "@/i18n/LanguageProvider";
import { siteConfig } from "@/config";
import { getNavItems } from "@/lib/sections";

const navItems = getNavItems();

/** Vráti časť za "#" alebo null, ak odkaz nie je kotva. */
function hashOf(href: string): string | null {
  const i = href.indexOf("#");
  return i === -1 ? null : href.slice(i + 1);
}

/** SK/EN prepínač priamo v navigácii, ako obyčajný text. */
function LanguageToggle({ className = "" }: { className?: string }) {
  const { lang, setLang } = useLanguage();

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <button
        type="button"
        onClick={() => setLang("sk")}
        className={`text-xs uppercase tracking-[0.18em] transition-colors ${
          lang === "sk" ? "text-white" : "text-white/40 hover:text-white/70"
        }`}
      >
        SK
      </button>
      <span className="text-white/25">/</span>
      <button
        type="button"
        onClick={() => setLang("en")}
        className={`text-xs uppercase tracking-[0.18em] transition-colors ${
          lang === "en" ? "text-white" : "text-white/40 hover:text-white/70"
        }`}
      >
        EN
      </button>
    </div>
  );
}

/**
 * Navigácia — priesvitný sklový pruh v kombinácii čiernej a tmavej vínovej
 * (nádych kvetov broskyne z Hero), so zlatou vlasovou linkou dole. Svetlé
 * verzálky, rozpalcované; pod aktívnou položkou tenká zlatá podčiarka.
 *
 * Menu má vlastnú stránku (/menu) — je aktívne podľa URL. Ostatné položky sú
 * kotvy na domovskej stránke a aktívna je tá, ktorej sekcia je práve na
 * obrazovke (IntersectionObserver, len na "/").
 */
export function Header() {
  const { t } = useLanguage();
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeHash, setActiveHash] = useState<string>("");

  useEffect(() => {
    // Scrollspy má zmysel len na domovskej stránke; inde je aktívna položka
    // odvodená z URL (viď isActive) a `activeHash` sa nepoužíva.
    if (pathname !== "/") return;
    const sections = navItems
      .map((item) => hashOf(item.href))
      .filter((h): h is string => h !== null)
      .map((h) => document.getElementById(h))
      .filter((el): el is HTMLElement => el !== null);
    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]) setActiveHash(visible[0].target.id);
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: [0, 0.25, 0.5, 1] },
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, [pathname]);

  const isActive = (href: string) => {
    if (href === "/menu") return pathname === "/menu";
    const hash = hashOf(href);
    return pathname === "/" && hash !== null && hash === activeHash;
  };

  return (
    <header className="sticky top-0 z-50 border-b border-gold/40 bg-gradient-to-r from-black/92 via-[#160b11]/85 to-[#2c1620]/82 shadow-[0_2px_18px_rgba(0,0,0,0.45)] backdrop-blur-lg">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6 lg:px-10">
        <Link
          href="/"
          className="font-fraunces text-lg font-medium uppercase tracking-[0.22em] text-white"
        >
          {siteConfig.name}
        </Link>

        <nav className="hidden items-center gap-9 md:flex">
          {navItems.map((item) => {
            const active = isActive(item.href);
            return (
              <Link
                key={item.key}
                href={item.href}
                className={`group relative text-[0.78rem] font-medium uppercase tracking-[0.18em] transition-colors ${
                  active ? "text-white" : "text-white/65 hover:text-white"
                }`}
              >
                {t(`nav.${item.key}`)}
                <span
                  className={`absolute -bottom-2 left-0 h-px bg-gold transition-all duration-300 ${
                    active ? "w-full" : "w-0 group-hover:w-full"
                  }`}
                />
              </Link>
            );
          })}
          <LanguageToggle className="border-l border-white/20 pl-6" />
        </nav>

        <button
          type="button"
          className="flex flex-col gap-1.5 md:hidden"
          aria-label="Menu"
          aria-expanded={mobileOpen}
          onClick={() => setMobileOpen((v) => !v)}
        >
          <span
            className={`h-0.5 w-6 bg-white transition-transform ${
              mobileOpen ? "translate-y-[4px] rotate-45" : ""
            }`}
          />
          <span
            className={`h-0.5 w-6 bg-white transition-transform ${
              mobileOpen ? "-translate-y-[4px] -rotate-45" : ""
            }`}
          />
        </button>
      </div>

      {mobileOpen && (
        <nav className="flex flex-col gap-1 border-t border-gold/25 bg-gradient-to-r from-black/95 to-[#2c1620]/92 px-6 pb-4 backdrop-blur-lg md:hidden">
          {navItems.map((item) => (
            <Link
              key={item.key}
              href={item.href}
              onClick={() => setMobileOpen(false)}
              className="py-3 text-[0.78rem] font-medium uppercase tracking-[0.18em] text-white/65 transition-colors hover:text-white"
            >
              {t(`nav.${item.key}`)}
            </Link>
          ))}
          <LanguageToggle className="py-3" />
        </nav>
      )}
    </header>
  );
}
