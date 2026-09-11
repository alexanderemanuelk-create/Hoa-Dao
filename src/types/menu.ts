// Typy pre dáta menu. Fallback dáta sú v src/data/fallback-menu.ts
// (prepísané podľa oficiálneho PDF jedálneho lístka HOA ĐÀO). Voliteľné
// napojenie na Google Sheets rieši src/lib/menu.ts.

/**
 * Variant položky – napr. druh mäsa (Kuracie / Tofu / Hovädzie / Krevety /
 * Losos …) alebo príchuť (Terijaki / Kung Pao / Kari / Mango). Každý variant
 * má vlastnú cenu.
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
  /** Názov položky v slovenčine (stĺpec "nazov"). */
  name: string;
  /** Názov položky v angličtine (stĺpec "nazov_en", voliteľné). */
  nameEn?: string;
  /** Popis / zloženie (stĺpec "popis"). */
  description?: string;
  descriptionEn?: string;
  /** Hmotnosť / objem, napr. "150 g", "300 ml". */
  weight?: string;
  /** Čísla alergénov, napr. "1, 3, 6". */
  allergens?: string;
  /** Pikantné jedlo – vedľa názvu sa zobrazí 🌶 */
  spicy?: boolean;
  /** Jedna cena, ak položka nemá varianty. */
  price?: string;
  /** Varianty s vlastnou cenou (ak sú, `price` sa nepoužíva). */
  variants?: MenuVariant[];
}

export interface MenuCategory {
  /** Názov kategórie v slovenčine (stĺpec "kategoria"). */
  category: string;
  /** Názov kategórie v angličtine (stĺpec "kategoria_en", voliteľné). */
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
