import { siteConfig } from "@/config";

export interface NavItem {
  /** Kľúč prekladu pod "nav.*" v src/i18n/{sk,en}.json. */
  key: string;
  /** Kotva sekcie na stránke, napr. "#menu". */
  href: string;
}

/**
 * Zoznam možných položiek navigácie s podmienkou, kedy sa majú zobraziť.
 * Kontakt sa zobrazuje vždy (viď komentár pri `siteConfig.sections` v
 * src/config.ts), ostatné podľa príslušného vypínača v configu.
 */
const candidates: { item: NavItem; enabled: boolean }[] = [
  { item: { key: "about", href: "#about" }, enabled: siteConfig.sections.about },
  { item: { key: "menu", href: "#menu" }, enabled: siteConfig.sections.menu },
  { item: { key: "gallery", href: "#gallery" }, enabled: siteConfig.sections.gallery },
  { item: { key: "contact", href: "#contact" }, enabled: true },
  { item: { key: "reviews", href: "#reviews" }, enabled: siteConfig.sections.reviews },
];

/** Vypočíta, ktoré položky navigácie sa majú zobraziť podľa `siteConfig.sections`. */
export function getNavItems(): NavItem[] {
  return candidates.filter((c) => c.enabled).map((c) => c.item);
}
