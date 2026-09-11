import type { MenuCategory } from "@/types/menu";

/**
 * PREDVOLENÝ (záložný) JEDÁLNY LÍSTOK HOA ĐÀO
 * ============================================================================
 * Prepísané z oficiálneho PDF jedálneho lístka. Živé stále menu sa normálne
 * ťahá naživo z Google Sheets (src/lib/menu.ts, `getMenu()`) — toto pole sa
 * použije len vtedy, keď sa CSV nepodarí stiahnuť alebo je prázdne, takže
 * stránka /menu nikdy nie je prázdna ani rozbitá.
 *
 * Položky s viacerými cenami (druh mäsa / príchuť) používajú pole `variants`.
 * Alergény: 1 lepok · 2 kôrovce · 3 vajcia · 4 ryby · 5 arašidy · 6 sója ·
 * 7 orechy · 8 mlieko · 9 horčica · 10 sezam · 11 vlčí bôb · 12 mäkkýše.
 */

/** Štandardná zostava druhov mäsa (kuracie/tofu/vajce/hovädzie/krevety/losos). */
const proteins = (kuracie: string, hovadzie: string, losos: string) => [
  { label: "Kuracie", labelEn: "Chicken", price: kuracie },
  { label: "Tofu", labelEn: "Tofu", price: kuracie },
  { label: "Vajce", labelEn: "Egg", price: kuracie },
  { label: "Hovädzie", labelEn: "Beef", price: hovadzie },
  { label: "Krevety", labelEn: "Shrimp", price: hovadzie },
  { label: "Losos", labelEn: "Salmon", price: losos },
];

export const fallbackMenu: MenuCategory[] = [
  {
    category: "Predjedlá",
    categoryEn: "Starters",
    items: [
      {
        number: "1",
        name: "Čerstvé jarné závitky",
        weight: "150 g",
        allergens: "2, 6",
        description:
          "Ryžový papier, ryžové rezance, uhorky, paprika, mrkva, šalát, rybia omáčka",
        variants: [
          { label: "Tofu", labelEn: "Tofu", price: "5,50 €" },
          { label: "Hovädzie", labelEn: "Beef", price: "5,90 €" },
          { label: "Krevety", labelEn: "Shrimp", price: "5,50 €" },
        ],
      },
      { number: "2", name: "Tempura krevety", weight: "120 g", allergens: "1, 3", price: "5,90 €" },
      {
        number: "3",
        name: "Krevetové knedle",
        weight: "120 g",
        description: "Krevety, zemiaková a ryžová múka",
        price: "5,90 €",
      },
      {
        number: "4",
        name: "Hot kurací wok",
        weight: "120 g",
        allergens: "1, 6",
        description: "Čili, ustricová a sójová omáčka, kuracie mäso",
        price: "5,50 €",
      },
    ],
  },
  {
    category: "Polievky",
    categoryEn: "Soups",
    items: [
      {
        number: "5",
        name: "Ostrokyslá polievka",
        weight: "300 ml",
        allergens: "3, 6",
        description: "Miešaná zelenina, vajce, čili, paradajka, ocot, sójová omáčka",
        price: "2,80 €",
      },
      {
        number: "6",
        name: "Tom Yum",
        weight: "300 ml",
        allergens: "1, 2, 4, 6",
        description: "Citrónová šťava, šampiňóny, paradajky, koriander, čili, rybia omáčka",
        variants: [
          { label: "Kurací", labelEn: "Chicken", price: "2,80 €" },
          { label: "Krevety", labelEn: "Shrimp", price: "2,90 €" },
          { label: "Losos", labelEn: "Salmon", price: "4,50 €" },
        ],
      },
      {
        number: "7",
        name: "Vývar",
        weight: "300 ml",
        allergens: "1, 2, 4, 6",
        variants: [
          { label: "Kurací", labelEn: "Chicken", price: "2,50 €" },
          { label: "Hovädzí", labelEn: "Beef", price: "2,50 €" },
        ],
      },
      {
        number: "8",
        name: "Phở",
        weight: "500 ml",
        allergens: "4",
        description: "Široké rezance, cibuľa, koriander, zázvor, soľ, zelené cibuľky",
        variants: [
          { label: "Tofu", labelEn: "Tofu", price: "7,50 €" },
          { label: "Gà (kuracie)", labelEn: "Gà (chicken)", price: "7,50 €" },
          { label: "Bò (hovädzie)", labelEn: "Bò (beef)", price: "7,90 €" },
        ],
      },
    ],
  },
  {
    category: "Hlavné jedlá",
    categoryEn: "Main Courses",
    items: [
      {
        number: "9",
        name: "Vyprážané ryžové rezance (Bún Xào)",
        weight: "450 g",
        allergens: "2, 3, 6",
        description:
          "Brokolica, mrkva, cibuľa, paprika, kukurica, vajce, cesnak, sójová omáčka, ustricová omáčka",
        variants: proteins("7,90 €", "8,50 €", "13,00 €"),
      },
      {
        number: "10",
        name: "Vyprážané opekané rezance (Mì Xào)",
        weight: "450 g",
        allergens: "2, 3, 6",
        description:
          "Brokolica, mrkva, cibuľa, kapusta, kukurica, vajce, zázvor, sójová omáčka, ustricová omáčka",
        variants: proteins("7,90 €", "8,50 €", "13,00 €"),
      },
      {
        number: "11",
        name: "Vyprážaná ryža (Cơm Rang)",
        weight: "450 g",
        allergens: "2, 3, 6",
        description:
          "Mrkva, hrášok, cibuľa, vajce, kukurica, sójová omáčka, ustricová omáčka",
        variants: proteins("7,90 €", "8,50 €", "13,00 €"),
      },
      {
        number: "12",
        name: "Vyprážané phở rezance (Phở Xào)",
        weight: "450 g",
        allergens: "2, 3, 6",
        description:
          "Brokolica, mrkva, cibuľa, kapusta, kukurica, vajce, sójová omáčka, ustricová omáčka",
        variants: proteins("7,90 €", "8,50 €", "13,00 €"),
      },
      {
        number: "13",
        name: "Vyprážané sklenené rezance (Miến Xào)",
        weight: "450 g",
        allergens: "2, 3, 6",
        description: "Mrkva, cibuľa, huby, kapusta, cesnak, sójová omáčka, ustricová omáčka",
        variants: [
          { label: "Kuracie", labelEn: "Chicken", price: "8,50 €" },
          { label: "Tofu", labelEn: "Tofu", price: "8,50 €" },
          { label: "Vajce", labelEn: "Egg", price: "9,50 €" },
          { label: "Hovädzie", labelEn: "Beef", price: "9,00 €" },
          { label: "Krevety", labelEn: "Shrimp", price: "9,00 €" },
          { label: "Losos", labelEn: "Salmon", price: "14,00 €" },
        ],
      },
      {
        number: "14",
        name: "Vyprážané udon rezance",
        weight: "450 g",
        allergens: "2, 3, 6",
        description:
          "Brokolica, mrkva, cibuľa, paprika, kukurica, vajce, sójová omáčka, ustricová omáčka",
        variants: [
          { label: "Kuracie", labelEn: "Chicken", price: "8,50 €" },
          { label: "Tofu", labelEn: "Tofu", price: "8,50 €" },
          { label: "Vajce", labelEn: "Egg", price: "9,50 €" },
          { label: "Hovädzie", labelEn: "Beef", price: "9,00 €" },
          { label: "Krevety", labelEn: "Shrimp", price: "9,00 €" },
          { label: "Losos", labelEn: "Salmon", price: "14,00 €" },
        ],
      },
      {
        number: "15",
        name: "Udon Teriyaki",
        weight: "450 g",
        allergens: "2, 3, 6",
        variants: [
          { label: "Kuracie", labelEn: "Chicken", price: "8,50 €" },
          { label: "Tofu", labelEn: "Tofu", price: "8,50 €" },
          { label: "Vajce", labelEn: "Egg", price: "9,50 €" },
          { label: "Hovädzie", labelEn: "Beef", price: "9,00 €" },
          { label: "Krevety", labelEn: "Shrimp", price: "9,00 €" },
          { label: "Losos", labelEn: "Salmon", price: "14,00 €" },
        ],
      },
      {
        number: "16",
        name: "Pad Thai",
        weight: "450 g",
        allergens: "2, 3, 6",
        description:
          "Mrkva, vajce, pažítka, arašidy, limetka, tamarindová omáčka, sójová omáčka, ustricová omáčka",
        variants: [
          { label: "Kuracie", labelEn: "Chicken", price: "8,50 €" },
          { label: "Tofu", labelEn: "Tofu", price: "8,50 €" },
          { label: "Vajce", labelEn: "Egg", price: "9,50 €" },
          { label: "Hovädzie", labelEn: "Beef", price: "9,00 €" },
          { label: "Krevety", labelEn: "Shrimp", price: "9,00 €" },
          { label: "Losos", labelEn: "Salmon", price: "14,00 €" },
        ],
      },
    ],
  },
  {
    category: "Phở – Bún",
    categoryEn: "Phở – Bún",
    items: [
      {
        number: "17",
        name: "Phở",
        weight: "700 ml",
        allergens: "4",
        variants: [
          { label: "Kuracie", labelEn: "Chicken", price: "8,50 €" },
          { label: "Tofu", labelEn: "Tofu", price: "8,50 €" },
          { label: "Hovädzie", labelEn: "Beef", price: "8,90 €" },
        ],
      },
      {
        number: "18",
        name: "Bún Thái",
        weight: "700 ml",
        allergens: "4",
        description:
          "Krevety, hovädzie mäso, tofu, šampiňóny, koriander, limetka, rybia omáčka, paradajky, čili, ryžové rezance, zázvor",
        price: "10,90 €",
      },
      {
        number: "19",
        name: "Phở Thái",
        weight: "700 ml",
        allergens: "4",
        description:
          "Krevety, hovädzie mäso, tofu, šampiňóny, koriander, limetka, rybia omáčka, paradajky, čili, široké rezance, zázvor",
        price: "10,90 €",
      },
      {
        number: "20",
        name: "Canh Tôm",
        weight: "700 ml",
        allergens: "2, 4, 7",
        description: "Krevety, zelenina, tofu, jarná cibuľa, koriander, cesnak, rybia omáčka",
        price: "10,90 €",
      },
      {
        number: "21",
        name: "Bún Nam Bộ",
        weight: "500 g",
        allergens: "4, 6",
        description:
          "Ryžové rezance, šalát, uhorky, mrkva, červená paprika, bylinky, arašidy, smažená cibuľa, rybia omáčka",
        variants: [
          { label: "Tofu", labelEn: "Tofu", price: "9,00 €" },
          { label: "Jarné závitky", labelEn: "Spring rolls", price: "9,00 €" },
          { label: "Kuracie plátky", labelEn: "Chicken slices", price: "9,50 €" },
          { label: "Hovädzie", labelEn: "Beef", price: "10,00 €" },
          { label: "Tempura krevety", labelEn: "Tempura shrimp", price: "10,00 €" },
          { label: "Kuracie špízy", labelEn: "Chicken skewers", price: "11,50 €" },
          { label: "Bravčové špízy", labelEn: "Pork skewers", price: "11,50 €" },
          { label: "Losos", labelEn: "Salmon", price: "14,00 €" },
        ],
      },
    ],
  },
  {
    category: "Špeciality",
    categoryEn: "Specialities",
    items: [
      {
        number: "21",
        name: "Phở",
        weight: "700 ml",
        allergens: "4",
        description:
          "Vývar, hovädzie rebrá, vzácne hovädzie mäso, kuracie mäso, cibuľa, zelená cibuľa, koriander",
        price: "15,50 €",
      },
      {
        number: "22",
        name: "Bò Cơm Dưa",
        weight: "500 g",
        allergens: "4, 6, 10",
        spicy: true,
        description: "Hovädzie mäso, paprika, cibuľa, čili omáčka, cesnak, sójová omáčka, korenie, ryža",
        price: "15,50 €",
      },
      {
        number: "23",
        name: "Hot Teriyaki Udon s kuracím mäsom",
        weight: "500 g",
        allergens: "4, 6, 10",
        description: "Udon rezance, vyprážané kura, mrkva, brokolica, cibuľa, sójová omáčka, sezam",
        price: "12,00 €",
      },
      {
        number: "24",
        name: "Hot Teriyaki Udon s kačacím mäsom",
        weight: "500 g",
        allergens: "4, 6, 10",
        description:
          "Udon rezance, chrumkavá kačica, mrkva, brokolica, cibuľa, sójová omáčka, sezam",
        price: "15,00 €",
      },
      {
        number: "25",
        name: "Cơm Vịt",
        weight: "500 g",
        allergens: "4, 6, 10",
        description: "Chrumkavá kačica, ryža, mrkva, paprika, cuketa, cibuľa, brokolica",
        variants: [
          { label: "Terijaki", labelEn: "Teriyaki", price: "15,50 €" },
          { label: "Kung Pao", labelEn: "Kung Pao", price: "15,50 €" },
          { label: "Kari", labelEn: "Curry", price: "15,50 €", spicy: true },
          { label: "Mango", labelEn: "Mango", price: "15,50 €" },
        ],
      },
      {
        number: "26",
        name: "Cơm Gà",
        weight: "500 g",
        allergens: "4, 6, 10",
        description: "Vyprážané kura, ryža, mrkva, paprika, cuketa, cibuľa, brokolica",
        variants: [
          { label: "Terijaki", labelEn: "Teriyaki", price: "12,50 €" },
          { label: "Kung Pao", labelEn: "Kung Pao", price: "12,50 €" },
          { label: "Kari", labelEn: "Curry", price: "12,50 €", spicy: true },
          { label: "Mango", labelEn: "Mango", price: "12,50 €" },
        ],
      },
      {
        number: "27",
        name: "Bún Mẹt",
        weight: "500 g",
        allergens: "2, 4, 6, 10",
        description:
          "Hovädzie mäso, kuracie mäso, tofu, krevety, bravčové mäso, šalát, uhorka, mrkva, arašidy, ryžové rezance, rybia omáčka",
        price: "15,50 €",
      },
    ],
  },
  {
    category: "Vyprážané špeciality",
    categoryEn: "Fried Specialities",
    items: [
      {
        number: "28",
        name: "Chrumkavé kura",
        weight: "250 g",
        allergens: "1, 3, 6, 10",
        description: "Kuracie mäso, kukuričný škrob, vajce, múka, strúhanka, soľ, korenie, cesnak",
        price: "6,90 €",
      },
      {
        number: "29",
        name: "Chrumkavá kačica",
        weight: "250 g",
        allergens: "1, 3, 6, 10",
        description: "Kačacie mäso, kukuričný škrob, soľ, korenie, cesnak, zázvor",
        price: "8,90 €",
      },
      {
        number: "30",
        name: "Lợn Xiên Que",
        weight: "200 g",
        allergens: "1, 3, 6, 10",
        description: "Bravčové špízy, cibuľa, soľ, ustricová omáčka, sójová omáčka",
        price: "6,90 €",
      },
      {
        number: "31",
        name: "Gà Xiên Que",
        weight: "200 g",
        allergens: "1, 3, 6, 10",
        description: "Kuracie špízy, cibuľa, soľ, ustricová omáčka, sójová omáčka",
        price: "6,90 €",
      },
      {
        number: "32",
        name: "Nem Rán",
        weight: "120 g",
        allergens: "1, 2, 4",
        description: "Cibuľa, ryžové rezance, vajce, bravčové mäso, ryžový papier",
        price: "4,50 €",
      },
      {
        number: "33",
        name: "Vyprážané kuracie Teriyaki",
        weight: "150 g",
        allergens: "1, 3, 6",
        description: "Terijaki omáčka, majonéza, soľ, kuracie mäso",
        price: "6,90 €",
      },
      { number: "34", name: "Kuracia tempura", weight: "150 g", allergens: "1, 3, 6", price: "6,90 €" },
      { number: "35", name: "Kurací rezeň", weight: "150 g", allergens: "1, 3", price: "6,50 €" },
      {
        number: "36",
        name: "Vyprážaný syr & hranolky",
        weight: "500 g",
        allergens: "1, 3, 7",
        description: "Syr (Eidam), hranolky, vyprážané do zlatista",
        price: "7,00 €",
      },
    ],
  },
  {
    category: "Soté",
    categoryEn: "Sauté",
    items: [
      {
        number: "37",
        name: "Kung Pao",
        weight: "250 g",
        allergens: "5, 6",
        description: "Ustricová omáčka, arašidy, paprika, cuketa, mrkva",
        variants: [
          { label: "Kuracie", labelEn: "Chicken", price: "6,50 €" },
          { label: "Tofu", labelEn: "Tofu", price: "6,50 €" },
          { label: "Krevety", labelEn: "Shrimp", price: "6,50 €" },
          { label: "Hovädzie", labelEn: "Beef", price: "7,50 €" },
          { label: "Losos", labelEn: "Salmon", price: "12,00 €" },
        ],
      },
      {
        number: "38",
        name: "Thajské kari",
        weight: "250 g",
        allergens: "1, 2, 6, 8, 12",
        spicy: true,
        description:
          "Kokosové mlieko, zelenina (bambus, paprika, cuketa), bazalka, kari pasta, limetkové listy",
        variants: [
          { label: "Kuracie", labelEn: "Chicken", price: "6,50 €" },
          { label: "Tofu", labelEn: "Tofu", price: "6,50 €" },
          { label: "Krevety", labelEn: "Shrimp", price: "6,50 €" },
          { label: "Hovädzie", labelEn: "Beef", price: "7,50 €" },
          { label: "Losos", labelEn: "Salmon", price: "12,00 €" },
        ],
      },
      {
        number: "39",
        name: "Terijaki soté",
        weight: "250 g",
        allergens: "1, 2",
        description: "Teriyaki omáčka, sezam, cesnak, cibuľa, mrkva, paprika",
        variants: [
          { label: "Kuracie", labelEn: "Chicken", price: "6,50 €" },
          { label: "Tofu", labelEn: "Tofu", price: "6,50 €" },
          { label: "Krevety", labelEn: "Shrimp", price: "6,50 €" },
          { label: "Hovädzie", labelEn: "Beef", price: "7,50 €" },
          { label: "Losos", labelEn: "Salmon", price: "12,00 €" },
        ],
      },
      {
        number: "40",
        name: "Mango soté",
        weight: "250 g",
        allergens: "7",
        description:
          "Mango, paprika, cibuľa, kokosové mlieko, cesnak, čili, sójová omáčka, jemné pikantné kuri",
        variants: [
          { label: "Kuracie", labelEn: "Chicken", price: "6,50 €" },
          { label: "Tofu", labelEn: "Tofu", price: "6,50 €" },
          { label: "Krevety", labelEn: "Shrimp", price: "6,50 €" },
          { label: "Hovädzie", labelEn: "Beef", price: "7,50 €" },
          { label: "Losos", labelEn: "Salmon", price: "12,00 €" },
        ],
      },
      {
        number: "41",
        name: "Lúc Lắc",
        weight: "250 g",
        allergens: "6",
        description: "Hovädzie mäso, paprika, cibuľa, čili omáčka, cesnak, sójová omáčka, korenie",
        variants: [
          { label: "Gà (kuracie)", labelEn: "Gà (chicken)", price: "7,50 €" },
          { label: "Bò (hovädzie)", labelEn: "Bò (beef)", price: "7,90 €" },
          { label: "Hot Bò (hovädzie)", labelEn: "Hot Bò (beef)", price: "9,50 €", spicy: true },
        ],
      },
      {
        number: "42",
        name: "Bò Xào Dứa",
        weight: "150 g",
        allergens: "1, 6",
        description:
          "Hovädzie mäso restované s ananásom, ustricová a sójová omáčka, cuketa, mrkva, paprika",
        price: "9,50 €",
      },
    ],
  },
  {
    category: "Prílohy",
    categoryEn: "Sides",
    items: [
      { number: "43", name: "Ryža (jazmínová)", weight: "120 g", price: "2,50 €" },
      { number: "44", name: "Kari ryža", weight: "120 g", price: "3,50 €" },
      { number: "45", name: "Hranolky", weight: "120 g", price: "2,80 €" },
      {
        number: "46",
        name: "Rezance so zeleninou",
        weight: "120 g",
        allergens: "1, 3, 6",
        description: "Pšeničné rezance, mrkva, kapusta, cibuľa, jarná cibuľka, cesnak, sójová omáčka",
        price: "3,50 €",
      },
      {
        number: "47",
        name: "Ryžové rezance so zeleninou",
        weight: "120 g",
        allergens: "3, 6",
        description: "Ryžové rezance, mrkva, kapusta, cibuľa, jarná cibuľka, cesnak, sójová omáčka",
        price: "3,50 €",
      },
      { number: "47", name: "1/2 ryža a hranolky", weight: "120 g", price: "3,50 €" },
      { number: "48", name: "Bún Luộc", weight: "120 g", description: "Ryžové rezance", price: "3,50 €" },
    ],
  },
  {
    category: "Šalát",
    categoryEn: "Salad",
    note: "Omáčky: majonéza, citrónový dresing.",
    items: [
      {
        number: "49",
        name: "Šalát",
        weight: "300 g",
        allergens: "5, 11",
        description: "Uhorky, šalátový mix, cherry paradajky, sezamové semienka, sezamový dresing",
        variants: [
          { label: "Avokádo", labelEn: "Avocado", price: "5,90 €" },
          { label: "Kurací", labelEn: "Chicken", price: "6,50 €" },
          { label: "Tempura krevety", labelEn: "Tempura shrimp", price: "6,90 €" },
          { label: "Losos", labelEn: "Salmon", price: "12,00 €" },
          { label: "Čistý šalát", labelEn: "Plain salad", price: "3,50 €" },
        ],
      },
    ],
  },
  {
    category: "Sushi – Maki",
    categoryEn: "Sushi – Maki",
    items: [
      {
        number: "50",
        name: "Maki (8 ks)",
        description:
          "Na výber: losos, tuniak, úhor, avokádo, uhorka, nakladaná reďkovka, krevety, ikry, surimi",
        price: "5,40 €",
      },
      {
        number: "51",
        name: "Maki Tempura (8 ks)",
        description: "Na výber: losos, tuniak, úhor, krevety, surimi",
        price: "6,40 €",
      },
      {
        number: "52",
        name: "Nigiri (2 ks)",
        description: "Na výber: losos, tuniak, úhor, krevety, surimi, ikry, avokádo",
        price: "4,40 €",
      },
    ],
  },
  {
    category: "Sushi sety",
    categoryEn: "Sushi Sets",
    items: [
      {
        number: "H1",
        name: "Maki set",
        description: "Maki: 4 losos, 4 tuniak, 4 krevety, 4 avokádo",
        price: "9,90 €",
      },
      {
        number: "H2",
        name: "Nigiri set",
        description: "Nigiri: 2 losos, 2 krevety, 2 úhor, 2 krabie tyčinky, 2 avokádo",
        price: "19,00 €",
      },
      {
        number: "H3",
        name: "Maki Tempura set",
        description: "Maki: 4 losos, 4 tuniak, 4 krevety, 4 krabie tyčinky s avokádom",
        price: "11,90 €",
      },
      {
        number: "H4",
        name: "Coking set",
        description:
          "Maki tempura: 8 krevety s avokádom · Roll: 5 úhor · Nigiri: 2 krabia tyčinka",
        price: "16,50 €",
      },
      {
        number: "H5",
        name: "Vegan set",
        description: "Maki: 4 uhorka, 4 žltá reďkovka · Roll: 5 Buha roll · Nigiri: 2 avokádo",
        price: "14,90 €",
      },
      {
        number: "H6",
        name: "Mix set 1",
        description: "Maki tempura: 8 tuniak · Roll: 8 California · Nigiri: 2 úhor, 2 krevety",
        price: "22,90 €",
      },
      {
        number: "H7",
        name: "Mix set 2",
        description:
          "Maki: 8 avokádo · Maki tempura: 8 krabia tyčinka · Roll: 8 losos · Nigiri: 2 losos, 2 krevety",
        price: "26,90 €",
      },
      {
        number: "H8",
        name: "Mix set 3",
        description:
          "Maki: 8 losos, 8 žltá reďkovka · Roll: 8 California, 8 tuniak · Nigiri: 2 losos, 2 kaviár, 2 úhor",
        price: "39,90 €",
      },
      {
        number: "H9",
        name: "Mix set 4",
        description:
          "Maki: 8 avokádo · Maki tempura: 8 tuniak · Roll: 8 úhor, 8 losos tempura · Nigiri: 2 krevety, 2 úhor, 2 krabia tyčinka",
        price: "43,90 €",
      },
      {
        number: "H10",
        name: "Mix set 5",
        description:
          "Maki: 8 tuniak, 8 losos, 8 avokádo · Roll: 8 krevety, 8 losos, 8 California · Nigiri: 2 krevety, 2 kaviár, 2 losos, 2 úhor · Sashimi: 120 g losos, tuniak",
        price: "75,00 €",
      },
    ],
  },
  {
    category: "Sashimi",
    categoryEn: "Sashimi",
    items: [
      { number: "K1", name: "Sake", weight: "120 g", description: "Losos", price: "8,90 €" },
      { number: "K2", name: "Teeka", weight: "120 g", description: "Tuniak", price: "10,90 €" },
      { number: "K3", name: "Mix", weight: "150 g", description: "Losos, tuniak, krevety", price: "14,90 €" },
    ],
  },
  {
    category: "Sushi rolky (8 ks)",
    categoryEn: "Sushi Rolls (8 pcs)",
    items: [
      { number: "M1", name: "Sake Roll", description: "Losos, uhorka, avokádo, krabia tyčinka", price: "13,50 €" },
      {
        number: "M2",
        name: "Tuna Roll",
        description: "Tuniak, avokádo, uhorka, žltá reďkovka, syr, kaviár",
        price: "13,90 €",
      },
      { number: "M3", name: "Ebi Roll", description: "Krevety, krabia tyčinka, avokádo, uhorka, syr", price: "13,50 €" },
      {
        number: "M4",
        name: "Ebi Tempura Roll",
        description: "Krevety tempura, uhorka, syr, kaviár, sezam",
        price: "13,50 €",
      },
      {
        number: "M5",
        name: "Unagi Roll",
        description: "Úhor, krabia tyčinka, uhorka, čili omáčka, kaviár, sezam",
        price: "13,50 €",
      },
      { number: "M6", name: "California Roll", description: "Krabia tyčinka, avokádo, syr, kaviár, sezam", price: "11,50 €" },
      { number: "M7", name: "Buha Roll", description: "Avokádo, uhorka, žltá reďkovka, syr, sezam", price: "10,50 €" },
      { number: "M8", name: "Tofu Roll", description: "Tofu, uhorka, žltá reďkovka, syr, sezam", price: "10,50 €" },
      { number: "M8", name: "Dragon Roll", description: "Avokádo, uhorka, syr, krevety tempura", price: "10,50 €" },
      { number: "M9", name: "Kurací Roll", description: "Avokádo, uhorka, syr, kuracie mäso", price: "10,50 €" },
    ],
  },
  {
    category: "Tempura rolky (8 ks)",
    categoryEn: "Tempura Rolls (8 pcs)",
    items: [
      {
        number: "M10",
        name: "Sake Tempura Roll",
        description: "Losos, avokádo, uhorka, kaviár, syr, sezam",
        price: "15,90 €",
      },
      {
        number: "M11",
        name: "Tuna Tempura Roll",
        description: "Tuniak, avokádo, uhorka, kaviár, syr, sezam",
        price: "16,90 €",
      },
      {
        number: "M12",
        name: "Krevety Tempura Roll",
        description: "Krevety, krabia tyčinka, uhorka, žltá reďkovka, syr, sezam",
        price: "15,90 €",
      },
      {
        number: "M13",
        name: "Unagi Tempura Roll",
        description: "Úhor, krabia tyčinka, uhorka, žltá reďkovka, syr, sezam",
        price: "16,90 €",
      },
      {
        number: "M14",
        name: "Tofu Tempura Roll",
        description: "Tofu, avokádo, uhorka, žltá reďkovka, syr, sezam",
        price: "12,90 €",
      },
    ],
  },
  {
    category: "Poké",
    categoryEn: "Poké",
    note: "Základ: sushi ryža, edamame, zelená fazuľka, avokádo, wakame, červená reďkovka, cherry paradajky, mrkva, uhorka, majonézový jemne pikantný dresing, sójová omáčka, sezam — 350 g.",
    items: [
      { number: "K4", name: "Losos / Salmon", price: "10,90 €" },
      { number: "K5", name: "Tuniak / Tuna", price: "12,90 €" },
      { number: "K6", name: "Krevety / Shrimp", price: "10,90 €" },
      { number: "K7", name: "Mix: losos, tuniak, krevety", price: "17,90 €" },
      { number: "K8", name: "Vegan: nakladané vajce v sójovej omáčke, tofu", price: "9,90 €" },
      { number: "K9", name: "Grill losos / Grilled salmon", price: "12,90 €" },
      { number: "K10", name: "Grill tuniak / Grilled tuna", price: "14,90 €" },
      { number: "K11", name: "Grill krevety / Grilled shrimp", price: "12,90 €" },
      { number: "K12", name: "Hovädzie / Beef", price: "10,90 €" },
      { number: "K13", name: "Grill kuracie / Chicken", price: "10,90 €" },
    ],
  },
  {
    category: "Nápoje – nealkoholické",
    categoryEn: "Soft Drinks",
    items: [
      { name: "Coca Cola 0,33 l", price: "2,20 €" },
      { name: "Coca Cola Zero 0,33 l", price: "2,20 €" },
      { name: "Fanta 0,33 l", price: "2,20 €" },
      { name: "Sprite 0,33 l", price: "2,20 €" },
      { name: "Džús 0,25 l", price: "2,20 €" },
      { name: "Ľadový čaj 0,33 l", price: "2,20 €" },
      { name: "Natura voda 0,3 l", price: "2,00 €" },
      { name: "Soda 0,5 l", price: "1,50 €" },
      { name: "Kofola 0,5 l", price: "2,50 €" },
      { name: "Kofola 0,3 l", price: "1,70 €" },
      { name: "Birrel 0,5 l", price: "2,50 €" },
      { name: "Birell 0,3 l", price: "1,70 €" },
      { name: "Kinley Tonic 0,25 l", price: "2,20 €" },
      { name: "Mojito 500 ml", price: "4,50 €" },
      { name: "Mojito 300 ml", price: "3,50 €" },
      { name: "Džbán citrónovej vody", price: "2,50 €" },
    ],
  },
  {
    category: "Nápoje – čaj",
    categoryEn: "Tea",
    items: [
      { name: "Ovocný čaj", price: "3,50 €" },
      { name: "Čierny čaj", price: "2,50 €" },
      { name: "Ľadový domáci čaj 0,5 l", price: "4,50 €" },
      { name: "Ľadový domáci čaj 0,3 l", price: "3,50 €" },
      { name: "Vietnamský bylinno-ovocný čaj", price: "3,50 €" },
    ],
  },
  {
    category: "Nápoje – káva",
    categoryEn: "Coffee",
    items: [
      { name: "Espresso", price: "2,50 €" },
      { name: "Cappuccino", price: "3,00 €" },
      { name: "Latte", price: "3,50 €" },
    ],
  },
  {
    category: "Nápoje – alkoholické",
    categoryEn: "Alcoholic Drinks",
    items: [
      { name: "Pilsner Urquell 0,5 l", price: "3,00 €" },
      { name: "Pilsner Urquell 0,3 l", price: "2,20 €" },
      { name: "Šariš 0,5 l", price: "2,50 €" },
      { name: "Šariš 0,3 l", price: "1,50 €" },
    ],
  },
];
