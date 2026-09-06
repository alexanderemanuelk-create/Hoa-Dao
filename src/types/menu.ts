// Typy pre dáta menu, ktoré sa nacitavaju z Google Sheets (viď src/lib/menu.ts)
// alebo z fallback dát (src/data/fallback-menu.ts), ak sa Sheet nepodarí načítať.

export interface MenuItem {
  /** Názov položky v slovenčine (stĺpec "nazov") */
  name: string;
  /** Názov položky v angličtine (stĺpec "nazov_en", voliteľné — ak chýba, použije sa slovenský názov) */
  nameEn?: string;
  /** Popis položky v slovenčine (stĺpec "popis") */
  description: string;
  /** Popis položky v angličtine (stĺpec "popis_en", voliteľné) */
  descriptionEn?: string;
  /** Cena ako text tak, ako je v tabuľke (stĺpec "cena"), napr. "6,50 €" */
  price: string;
}

export interface MenuCategory {
  /** Názov kategórie v slovenčine (stĺpec "kategoria") */
  category: string;
  /** Názov kategórie v angličtine (stĺpec "kategoria_en", voliteľné rozšírenie) */
  categoryEn?: string;
  items: MenuItem[];
}

export type MenuSource = "sheet" | "fallback";

export interface MenuResult {
  categories: MenuCategory[];
  source: MenuSource;
}
