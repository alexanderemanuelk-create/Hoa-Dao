// Typy pre dáta menu. Živé dáta sa ťahajú z Google Sheets (src/lib/menu.ts),
// predvolené/záložné dáta sú v src/data/fallback-menu.ts a
// src/data/daily-menu.ts.

/**
 * Variant položky – napr. druh mäsa (Kuracie / Tofu / Hovädzie / Krevety /
 * Losos …) alebo príchuť (Terijaki / Kung Pao / Kari / Mango). Každý variant
 * má vlastnú cenu. Google Sheets tento koncept nepozná — tam je každý variant
 * samostatný riadok ("Názov – Kuracie", "Názov – Tofu" …); `variants` sa
 * používa len v lokálnych predvolených dátach.
 */
export interface MenuVariant {
  /** Označenie variantu, napr. "Kuracie". */
  label: string;
  labelEn?: string;
  /** Cena variantu ako text, napr. "7,90 €". */
  price: string;
  /** Pikantný variant – vedľa názvu sa zobrazí 🌶 */
  spicy?: boolean;
}

export interface MenuItem {
  /** Poradové číslo z jedálneho lístka, napr. "1", "H1", "M10". */
  number?: string;
  /** Názov položky v slovenčine (stĺpec "Názov jedla"). */
  name: string;
  /** Názov položky v angličtine, voliteľné (v Google Sheets stĺpci nie je). */
  nameEn?: string;
  /** Popis / zloženie (stĺpec "Popis"). */
  description?: string;
  descriptionEn?: string;
  /** Hmotnosť / objem, napr. "150 g", "300 ml". */
  weight?: string;
  /** Čísla alergénov, napr. "1, 3, 6". */
  allergens?: string;
  /** Pikantné jedlo – vedľa názvu sa zobrazí 🌶 */
  spicy?: boolean;
  /** Jedna cena, ak položka nemá varianty (stĺpec "Cena (€)"). */
  price?: string;
  /** Varianty s vlastnou cenou (ak sú, `price` sa nepoužíva). */
  variants?: MenuVariant[];
  /**
   * Názov súboru fotky (stĺpec "Fotka (názov súboru)"), napr. "burger.jpg".
   * Súbor musí byť nahraný v /public/images/menu/. Voliteľné — bez neho sa
   * pri položke fotka nezobrazí.
   */
  photo?: string;
}

export interface MenuCategory {
  /** Názov kategórie v slovenčine (stĺpec "Kategória"). */
  category: string;
  /** Názov kategórie v angličtine, voliteľné (v Google Sheets stĺpci nie je). */
  categoryEn?: string;
  /** Voliteľný text pod nadpisom kategórie (spoločné zloženie a pod.). */
  note?: string;
  items: MenuItem[];
}

export type MenuSource = "sheet" | "fallback";

export interface MenuResult {
  categories: MenuCategory[];
  source: MenuSource;
}

/** Jedna položka denného menu (stĺpce "Názov jedla", "Popis", "Cena (€)"). */
export interface DailyMenuItem {
  name: string;
  description?: string;
  price: string;
  /** Pikantné jedlo — vedľa názvu sa zobrazí 🌶 (len lokálne predvolené dáta). */
  spicy?: boolean;
}

/** Denné menu pre jeden deň (stĺpec "Deň"). */
export interface DailyMenuDay {
  /** Názov dňa v slovenčine, presne tak, ako je v Google Sheets. */
  day: string;
  /** Anglický názov dňa — odvodený automaticky, v Sheets stĺpec nie je. */
  dayEn: string;
  items: DailyMenuItem[];
}

export interface DailyMenuResult {
  days: DailyMenuDay[];
  source: MenuSource;
}
