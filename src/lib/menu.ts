import Papa from "papaparse";
import { siteConfig } from "@/config";
import { fallbackMenu } from "@/data/fallback-menu";
import { dailyMenu } from "@/data/daily-menu";
import type {
  DailyMenuDay,
  DailyMenuItem,
  DailyMenuResult,
  MenuCategory,
  MenuItem,
  MenuResult,
} from "@/types/menu";

/**
 * Živé napojenie sekcie Menu na Google Sheets (CSV export) — pozri
 * `siteConfig.alacarteMenuCsvUrl` / `siteConfig.dailyMenuCsvUrl` v
 * src/config.ts pre presný formát hárkov a URL.
 *
 * `getMenu()` (stále menu) a `getDailyMenu()` (denné menu) bežia na serveri
 * a využívajú Next.js `fetch` cache s pravidelnou revalidáciou (ISR) —
 * `siteConfig.menuRevalidateSeconds` — takže zmena v Google Sheets sa na
 * webe prejaví automaticky, bez nového buildu/deployu.
 *
 * Ak fetch/parsovanie zlyhá alebo CSV neobsahuje žiadny aktívny riadok,
 * vráti sa predpripravené predvolené menu (src/data/fallback-menu.ts,
 * src/data/daily-menu.ts), aby stránka nikdy nebola prázdna ani rozbitá.
 */

type CsvRow = Record<string, string>;

/** Anglické názvy dní — Google Sheets má len slovenský stĺpec "Deň". */
const DAY_NAME_EN: Record<string, string> = {
  pondelok: "Monday",
  utorok: "Tuesday",
  streda: "Wednesday",
  štvrtok: "Thursday",
  stvrtok: "Thursday",
  piatok: "Friday",
  sobota: "Saturday",
  nedeľa: "Sunday",
  nedela: "Sunday",
};

function dayNameEn(day: string): string {
  return DAY_NAME_EN[day.trim().toLowerCase()] ?? day;
}

/**
 * "ÁNO" → true. Tolerantné k veľkosti písmen, okolitým medzerám a k zápisu
 * bez diakritiky ("ano"), keby si ho niekto v Sheets napísal takto.
 */
function isActive(raw: string | undefined): boolean {
  const value = (raw ?? "").trim().toUpperCase();
  return value === "ÁNO" || value === "ANO";
}

/** "Poradie" ako číslo pre zoradenie; neplatné/chýbajúce hodnoty idú na koniec. */
function parseOrder(raw: string | undefined): number {
  const n = Number.parseFloat((raw ?? "").replace(",", "."));
  return Number.isFinite(n) ? n : Number.POSITIVE_INFINITY;
}

/** "6,9" / "6.90" / "6,90 €" → "6,90 €". Nečíselný vstup sa vráti tak, ako je. */
function formatPrice(raw: string | undefined): string {
  const value = (raw ?? "").trim();
  if (!value) return "";
  if (value.includes("€")) return value;

  const n = Number.parseFloat(value.replace(/\s/g, "").replace(",", "."));
  if (!Number.isFinite(n)) return value;
  return `${n.toFixed(2).replace(".", ",")} €`;
}

/** Stiahne CSV text; odstráni prípadný BOM na začiatku (bežné pri exporte z Google Sheets). */
async function fetchCsv(url: string, revalidateSeconds: number): Promise<string> {
  const response = await fetch(url, { next: { revalidate: revalidateSeconds } });
  if (!response.ok) {
    throw new Error(`CSV fetch zlyhal so statusom ${response.status} (${url})`);
  }
  const text = await response.text();
  return text.charCodeAt(0) === 0xfeff ? text.slice(1) : text;
}

/** Naparsuje CSV text na riadky podľa hlavičky v prvom riadku. */
function parseCsvRows(csvText: string): CsvRow[] {
  const { data } = Papa.parse<CsvRow>(csvText, {
    header: true,
    skipEmptyLines: true,
    transformHeader: (header) => header.trim(),
  });
  // Riadok s indexom 0 = trvalý príkladový záznam v hárku (žlto podfarbený),
  // skutočné dáta v Google Sheets začínajú až za ním — nikdy sa nenačíta.
  return data.slice(1);
}

function parseAlacarteRows(rows: CsvRow[]): MenuCategory[] {
  const categoryOrder: string[] = [];
  const itemsByCategory = new Map<string, { order: number; item: MenuItem }[]>();

  for (const row of rows) {
    if (!isActive(row["Aktívne"])) continue;

    const category = (row["Kategória"] ?? "").trim();
    const name = (row["Názov jedla"] ?? "").trim();
    if (!category || !name) continue;

    if (!itemsByCategory.has(category)) {
      itemsByCategory.set(category, []);
      categoryOrder.push(category);
    }

    const description = (row["Popis"] ?? "").trim();
    const photo = (row["Fotka (názov súboru)"] ?? "").trim();

    itemsByCategory.get(category)!.push({
      order: parseOrder(row["Poradie"]),
      item: {
        name,
        description: description || undefined,
        price: formatPrice(row["Cena (€)"]),
        photo: photo || undefined,
      },
    });
  }

  return categoryOrder.map((category) => {
    const entries = itemsByCategory.get(category)!;
    entries.sort((a, b) => a.order - b.order);
    return { category, items: entries.map((entry) => entry.item) };
  });
}

function parseDailyRows(rows: CsvRow[]): DailyMenuDay[] {
  const dayOrder: string[] = [];
  const itemsByDay = new Map<string, { order: number; item: DailyMenuItem }[]>();

  for (const row of rows) {
    if (!isActive(row["Aktívne"])) continue;

    const day = (row["Deň"] ?? "").trim();
    const name = (row["Názov jedla"] ?? "").trim();
    if (!day || !name) continue;

    if (!itemsByDay.has(day)) {
      itemsByDay.set(day, []);
      dayOrder.push(day);
    }

    const description = (row["Popis"] ?? "").trim();

    itemsByDay.get(day)!.push({
      order: parseOrder(row["Poradie"]),
      item: {
        name,
        description: description || undefined,
        price: formatPrice(row["Cena (€)"]),
      },
    });
  }

  return dayOrder.map((day) => {
    const entries = itemsByDay.get(day)!;
    entries.sort((a, b) => a.order - b.order);
    return { day, dayEn: dayNameEn(day), items: entries.map((entry) => entry.item) };
  });
}

/** Stále menu (à la carte) — hárok "Jedálny listok". */
export async function getMenu(): Promise<MenuResult> {
  try {
    const csvText = await fetchCsv(siteConfig.alacarteMenuCsvUrl, siteConfig.menuRevalidateSeconds);
    const categories = parseAlacarteRows(parseCsvRows(csvText));

    if (categories.length === 0) {
      throw new Error("Jedálny listok CSV neobsahuje žiadne aktívne položky");
    }

    return { categories, source: "sheet" };
  } catch (error) {
    console.error("[menu] Nepodarilo sa načítať jedálny listok z Google Sheets, používam predvolené dáta:", error);
    return { categories: fallbackMenu, source: "fallback" };
  }
}

/** Denné menu — hárok "Denné menu". */
export async function getDailyMenu(): Promise<DailyMenuResult> {
  try {
    const csvText = await fetchCsv(siteConfig.dailyMenuCsvUrl, siteConfig.menuRevalidateSeconds);
    const days = parseDailyRows(parseCsvRows(csvText));

    if (days.length === 0) {
      throw new Error("Denné menu CSV neobsahuje žiadne aktívne položky");
    }

    return { days, source: "sheet" };
  } catch (error) {
    console.error("[menu] Nepodarilo sa načítať denné menu z Google Sheets, používam predvolené dáta:", error);
    return { days: dailyMenu, source: "fallback" };
  }
}
