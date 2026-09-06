/**
 * Malý, závislostiam sa vyhýbajúci CSV parser.
 *
 * Google Sheets CSV export môže obsahovať polia v úvodzovkách (napr. ak popis
 * jedla obsahuje čiarku alebo nový riadok), preto tu nestačí jednoduché
 * rozdelenie textu podľa riadkov a čiarok — parser prechádza text znak po
 * znaku a rešpektuje úvodzovky.
 */
export function parseCsv(input: string): string[][] {
  const rows: string[][] = [];
  let row: string[] = [];
  let field = "";
  let inQuotes = false;

  // Normalizácia Windows/Mac koncov riadkov na \n zjednodušuje logiku nižšie.
  const text = input.replace(/\r\n/g, "\n").replace(/\r/g, "\n");

  for (let i = 0; i < text.length; i++) {
    const char = text[i];

    if (inQuotes) {
      if (char === '"') {
        if (text[i + 1] === '"') {
          field += '"';
          i++;
        } else {
          inQuotes = false;
        }
      } else {
        field += char;
      }
      continue;
    }

    if (char === '"') {
      inQuotes = true;
    } else if (char === ",") {
      row.push(field);
      field = "";
    } else if (char === "\n") {
      row.push(field);
      rows.push(row);
      row = [];
      field = "";
    } else {
      field += char;
    }
  }

  // Posledné pole/riadok (súbor zvyčajne nekončí novým riadkom).
  if (field.length > 0 || row.length > 0) {
    row.push(field);
    rows.push(row);
  }

  return rows.filter((r) => r.some((cell) => cell.trim() !== ""));
}

/** Prevedie CSV text na pole objektov podľa hlavičky v prvom riadku. */
export function csvToObjects(input: string): Record<string, string>[] {
  const rows = parseCsv(input);
  if (rows.length === 0) return [];

  const header = rows[0].map((h) => h.trim().toLowerCase());
  return rows.slice(1).map((row) => {
    const obj: Record<string, string> = {};
    header.forEach((key, index) => {
      obj[key] = (row[index] ?? "").trim();
    });
    return obj;
  });
}
