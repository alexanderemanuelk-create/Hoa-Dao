import type { DailyMenuDay } from "@/types/menu";

/**
 * PREDVOLENÉ (záložné) DENNÉ MENU — prepísané z oficiálneho PDF jedálneho
 * lístka HOA ĐÀO (strana „Denné Menu").
 * ============================================================================
 * Živé denné menu sa normálne ťahá z Google Sheets (src/lib/menu.ts,
 * `getDailyMenu()`). Toto pole sa použije len vtedy, keď sa CSV nepodarí
 * stiahnuť alebo je prázdne — stránka /menu tak nikdy nie je prázdna ani
 * rozbitá. Pokojne tu obsah udržuj aktuálny ako druhú poistku.
 */
export const dailyMenu: DailyMenuDay[] = [
  {
    day: "Pondelok",
    dayEn: "Monday",
    items: [
      { name: "Sushi 16 ks: 8 ks Tempura maki losos, 4 ks maki krabia tyčinka, 4 ks maki avokádo", price: "10,00 €" },
      { name: "Opekané ryžové rezance s kuracím mäsom", price: "7,50 €" },
      { name: "Kuracie kung pao s ryžou", price: "7,50 €", spicy: true },
      { name: "Teriyaki kura s rezancami", price: "7,50 €" },
      { name: "Bún Nam Bộ s hovädzím mäsom (šalát, rybia omáčka, arašidy, ryžové rezance)", price: "9,00 €" },
      { name: "Chrumkavé kura s ryžou", price: "8,50 €" },
    ],
  },
  {
    day: "Utorok",
    dayEn: "Tuesday",
    items: [
      { name: "Sushi 16 ks: 8 ks Tempura maki krevety, 4 ks maki losos, 4 ks maki avokádo", price: "10,00 €" },
      { name: "Opekané rezance s kuracím mäsom", price: "7,50 €" },
      { name: "Kura so zeleninou a ryžou", price: "7,50 €" },
      { name: "Kuracie mäso v tempure s rezancami", price: "7,50 €" },
      { name: "Bún Nam Bộ s kuracím mäsom", price: "9,00 €" },
      { name: "Teriyaki chrumkavá kačica s ryžou", price: "9,50 €" },
    ],
  },
  {
    day: "Streda",
    dayEn: "Wednesday",
    items: [
      { name: "Sushi 16 ks: 8 ks Tempura maki losos, 4 ks maki krabia tyčinka, 4 ks maki uhorka", price: "10,00 €" },
      { name: "Široké rezance s kuracím mäsom", price: "7,50 €" },
      { name: "Kurací rezeň s hranolkami", price: "7,50 €" },
      { name: "Thajské kari s kuracím mäsom a ryžou", price: "7,50 €", spicy: true },
      { name: "Bún Nam Bộ Nem (šalát, rybia omáčka, arašidy, ryžové rezance, jarné závitky)", price: "9,00 €" },
      { name: "Lợn Xiên Que s rezancami (bravčové špízy)", price: "8,50 €" },
    ],
  },
  {
    day: "Štvrtok",
    dayEn: "Thursday",
    items: [
      { name: "Sushi 16 ks: 8 ks Tempura maki krabia tyčinka, 4 ks maki losos, 4 ks maki avokádo", price: "10,00 €" },
      { name: "Vyprážaná ryža s kuracím mäsom", price: "7,50 €" },
      { name: "Kura s mangovou omáčkou a ryžou", price: "7,50 €" },
      { name: "Hot wok kura s hranolkami", price: "7,50 €", spicy: true },
      { name: "Thịt Kho Trứng (bravčové mäso s vajíčkami)", price: "9,00 €" },
      { name: "Chrumkavé kura s ryžou", price: "8,50 €" },
    ],
  },
  {
    day: "Piatok",
    dayEn: "Friday",
    items: [
      { name: "Sushi 16 ks: 8 ks Tempura maki losos, 4 ks maki krevety, 4 ks maki uhorka", price: "10,00 €" },
      { name: "Opekané rezance s tofu", price: "7,50 €" },
      { name: "Hovädzie mäso so zeleninou a ryžou", price: "7,50 €" },
      { name: "Teriyaki kuracie mäso s rezancami", price: "7,50 €" },
      { name: "Bún Nam Bộ s tofu (šalát, rybia omáčka, arašidy, ryžové rezance)", price: "9,00 €" },
      { name: "Gà Xiên Que s rezancami", price: "8,50 €" },
    ],
  },
];
