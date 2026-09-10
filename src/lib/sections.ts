import { siteConfig } from "@/config";

export interface NavItem {
  /** Kľúč prekladu pod "nav.*" v src/i18n/{sk,en}.json. */
  key: string;
  /**
   * Cieľ odkazu. Buď kotva na domovskej stránke ("/#gallery"), kotva na
   * aktuálnej stránke ("#contact" — pätu má každá stránka), alebo samostatná
   * cesta ("/menu").
   */
  href: string;
}

/**
 * Zoznam možných položiek navigácie s podmienkou, kedy sa majú zobraziť.
 * Kontakt sa zobrazuje vždy (viď komentár pri `siteConfig.sections` v
 * src/config.ts), ostatné podľa príslušného vypínača v configu.
 *
 * Menu má vlastnú stránku (/menu, viď src/app/menu/page.tsx), ostatné sekcie
 * sú kotvy na domovskej stránke.
 */
const candidates: { item: NavItem; enabled: boolean }[] = [
  { item: { key: "about", href: "/#about" }, enabled: siteConfig.sections.about },
  { item: { key: "menu", href: "/menu" }, enabled: siteConfig.sections.menu },
  { item: { key: "gallery", href: "/#gallery" }, enabled: siteConfig.sections.gallery },
  { item: { key: "contact", href: "#contact" }, enabled: true },
];

/** Vypočíta, ktoré položky navigácie sa majú zobraziť podľa `siteConfig.sections`. */
export function getNavItems(): NavItem[] {
  return candidates.filter((c) => c.enabled).map((c) => c.item);
}
