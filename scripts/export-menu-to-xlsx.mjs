/**
 * Export jedálneho lístka z projektu do XLSX.
 * ============================================================================
 * Zapisuje do photos/jedlo/jedalny_listok.xlsx (od riadku 3 – žltý príkladový
 * riadok 2 ostáva nedotknutý):
 *
 *   • hárok "Jedálny listok" – stále menu (à la carte). Položky s viacerými
 *     cenami (druh mäsa / príchuť) sa rozpíšu na samostatné riadky
 *     "Názov – variant".
 *   • hárok "Denné menu"     – denné menu (pondelok–piatok), Kategória = "Hlavné jedlo".
 *
 * Zdroj: src/data/fallback-menu.ts a src/data/daily-menu.ts (obe prepísané
 * z oficiálneho PDF jedálneho lístka HOA ĐÀO).
 *
 * Formátovanie (fonty, orámovanie, rozbaľovacie zoznamy) sa nemení. Ak je
 * položiek viac než má hárok predpripravených riadkov, štýl a validácie sa
 * skopírujú z riadku 3.
 *
 * Spustenie:  node scripts/export-menu-to-xlsx.mjs
 */

import path from "node:path";
import { fileURLToPath } from "node:url";
import ExcelJS from "exceljs";

import { fallbackMenu } from "../src/data/fallback-menu.ts";
import { dailyMenu } from "../src/data/daily-menu.ts";

const ROOT = path.resolve(fileURLToPath(new URL("..", import.meta.url)));
const XLSX_PATH = path.join(ROOT, "photos", "jedlo", "jedalny_listok.xlsx");
const FIRST_DATA_ROW = 3;

/** "6,90 €" -> 6.9 ; null ak sa nedá prečítať. */
function parsePrice(raw) {
  const s = String(raw ?? "").replace(/[^\d.,-]/g, "").replace(/\s/g, "").replace(",", ".");
  const n = Number.parseFloat(s);
  return Number.isFinite(n) ? n : null;
}

/** Skopíruje štýl + dátové validácie z riadku 3 do riadku `r` (pre riadky > šablóny). */
function extendRow(ws, r, cols, validationCols) {
  for (let c = 1; c <= cols; c += 1) {
    ws.getRow(r).getCell(c).style = { ...ws.getRow(FIRST_DATA_ROW).getCell(c).style };
  }
  for (const col of validationCols) {
    const src = ws.dataValidations.find(`${col}${FIRST_DATA_ROW}`);
    if (src) ws.dataValidations.add(`${col}${r}`, src);
  }
}

/** Zapíše `rows` (pole polí hodnôt) do hárku od riadku 3. */
function writeRows(ws, rows, templateLastRow, cols, validationCols) {
  // Vyčisti staršie hodnoty (štýly nechaj).
  const clearTo = Math.max(templateLastRow, FIRST_DATA_ROW + rows.length + 5);
  for (let r = FIRST_DATA_ROW; r <= clearTo; r += 1) {
    for (let c = 1; c <= cols; c += 1) ws.getRow(r).getCell(c).value = null;
  }
  rows.forEach((values, i) => {
    const r = FIRST_DATA_ROW + i;
    if (r > templateLastRow) extendRow(ws, r, cols, validationCols);
    const row = ws.getRow(r);
    values.forEach((v, c) => {
      row.getCell(c + 1).value = v === "" || v === undefined ? null : v;
    });
  });
}

// --- Stále menu (à la carte) -> "Jedálny listok" -------------------------
// Stĺpce: Kategória | Názov jedla | Popis | Cena (€) | Fotka | Poradie | Aktívne
const alacarteRows = [];
const alacarteStats = new Map();
for (const category of fallbackMenu) {
  let order = 0;
  for (const item of category.items) {
    const popis = [item.weight, item.description].filter(Boolean).join(" · ");
    const targets =
      item.variants && item.variants.length > 0
        ? item.variants.map((v) => ({ name: `${item.name} – ${v.label}`, price: v.price }))
        : [{ name: item.name, price: item.price }];
    for (const target of targets) {
      order += 1;
      alacarteRows.push([
        category.category, // Kategória
        target.name, // Názov jedla
        popis, // Popis (hmotnosť · zloženie)
        parsePrice(target.price), // Cena (€) – číslo bez €
        "", // Fotka
        order, // Poradie v rámci kategórie
        "ÁNO", // Aktívne
      ]);
    }
  }
  alacarteStats.set(category.category, order);
}

// --- Denné menu -> "Denné menu" -----------------------------------------
// Stĺpce: Deň | Kategória | Názov jedla | Popis | Cena (€) | Poradie | Aktívne
const dailyRows = [];
for (const day of dailyMenu) {
  day.items.forEach((item, i) => {
    dailyRows.push([
      day.day, // Deň
      "Hlavné jedlo", // Kategória
      item.name, // Názov jedla
      "", // Popis
      parsePrice(item.price), // Cena (€)
      i + 1, // Poradie v rámci dňa
      "ÁNO", // Aktívne
    ]);
  });
}

// --- Zápis --------------------------------------------------------------
const wb = new ExcelJS.Workbook();
await wb.xlsx.readFile(XLSX_PATH);

const wsAlacarte = wb.getWorksheet("Jedálny listok");
const wsDaily = wb.getWorksheet("Denné menu");
if (!wsAlacarte) throw new Error('Hárok "Jedálny listok" sa nenašiel.');
if (!wsDaily) throw new Error('Hárok "Denné menu" sa nenašiel.');

writeRows(wsAlacarte, alacarteRows, 60, 7, ["A", "G"]);
writeRows(wsDaily, dailyRows, 120, 7, ["A", "B", "G"]);

await wb.xlsx.writeFile(XLSX_PATH);

// --- Súhrn -----------------------------------------------------------
console.log(`\n✔ Zapísané do: ${path.relative(ROOT, XLSX_PATH)}`);
console.log(`\n„Jedálny listok" (à la carte): ${alacarteRows.length} riadkov (${fallbackMenu.length} kategórií)`);
for (const [cat, n] of alacarteStats) console.log(`   • ${cat}: ${n}`);
console.log(`\n„Denné menu": ${dailyRows.length} riadkov (${dailyMenu.length} dní × 6 jedál, Kategória = "Hlavné jedlo")`);
