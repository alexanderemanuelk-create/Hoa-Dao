import { siteConfig } from "@/config";
import { fallbackMenu } from "@/data/fallback-menu";
import { csvToObjects } from "@/lib/csv";
import type { MenuCategory, MenuResult } from "@/types/menu";

/** Zoradí riadky z CSV (ploché objekty) do kategórií tak, ako idú za sebou v hárku. */
function groupIntoCategories(rows: Record<string, string>[]): MenuCategory[] {
  const categories: MenuCategory[] = [];
  const indexByName = new Map<string, number>();

  for (const row of rows) {
    const categoryName = row["kategoria"];
    const itemName = row["nazov"];
    // Riadky bez kategórie alebo názvu položky preskočíme (napr. prázdny/nedokončený riadok).
    if (!categoryName || !itemName) continue;

    if (!indexByName.has(categoryName)) {
      indexByName.set(categoryName, categories.length);
      categories.push({
        category: categoryName,
        categoryEn: row["kategoria_en"] || undefined,
        items: [],
      });
    }

    const category = categories[indexByName.get(categoryName)!];
    category.items.push({
      name: itemName,
      nameEn: row["nazov_en"] || undefined,
      description: row["popis"] ?? "",
      descriptionEn: row["popis_en"] || undefined,
      price: row["cena"] ?? "",
    });
  }

  return categories;
}

/**
 * Načíta menu z verejne publikovanej Google Sheets tabuľky (CSV export).
 *
 * Beží na serveri (Server Component) a využíva Next.js `fetch` cache s
 * pravidelnou revalidáciou (ISR) — dáta sa teda obnovujú automaticky podľa
 * `siteConfig.menuRevalidateSeconds` bez nutnosti nový build/deploy.
 *
 * Ak URL nie je nastavená, alebo sa fetch/parsovanie nepodarí, vráti sa
 * predpripravené fallback menu, aby sekcia nikdy nebola prázdna alebo rozbitá.
 */
export async function getMenu(): Promise<MenuResult> {
  const csvUrl = siteConfig.menuSheetCsvUrl;

  if (!csvUrl) {
    return { categories: fallbackMenu, source: "fallback" };
  }

  try {
    const response = await fetch(csvUrl, {
      next: { revalidate: siteConfig.menuRevalidateSeconds },
    });

    if (!response.ok) {
      throw new Error(`Google Sheets CSV fetch zlyhal so statusom ${response.status}`);
    }

    const csvText = await response.text();
    const rows = csvToObjects(csvText);
    const categories = groupIntoCategories(rows);

    if (categories.length === 0) {
      throw new Error("Google Sheets CSV neobsahuje žiadne platné riadky menu");
    }

    return { categories, source: "sheet" };
  } catch (error) {
    console.error("[menu] Nepodarilo sa načítať menu z Google Sheets, používam fallback dáta:", error);
    return { categories: fallbackMenu, source: "fallback" };
  }
}
