/**
 * DENNÉ MENU (pondelok – piatok)
 * ============================================================================
 * Obsah prepísaný z tlačeného „DNES MENU" plagátu. Upravuje sa priamo tu —
 * názvy jedál sú spoločné pre SK aj EN (`day` / `dayEn` je len názov dňa).
 * Zobrazuje sa v sekcii Menu (src/components/Menu.tsx).
 */

export interface DailyMenuItem {
  name: string;
  price: string;
  /** Pikantné jedlo — vedľa názvu sa zobrazí 🌶 */
  spicy?: boolean;
}

export interface DailyMenuDay {
  day: string;
  dayEn: string;
  /** Text za „Polievka:" */
  soup: string;
  items: DailyMenuItem[];
}

export const dailyMenu: DailyMenuDay[] = [
  {
    day: "Pondelok",
    dayEn: "Monday",
    soup: "Ostrokyslá / Tomyum kuracia",
    items: [
      { name: "Sushi 16 ks: 8 ks Tempura maki losos, 4 ks maki krabia tyčinka, 4 ks maki avokádo", price: "10,00 €" },
      { name: "Opekané ryžové rezance s kuracím mäsom (500 g)", price: "7,50 €" },
      { name: "Opekané ryžové rezance s hovädzím mäsom (500 g)", price: "7,50 €" },
      { name: "Kuracie kung pao s ryžou (500 g)", price: "7,50 €", spicy: true },
      { name: "Chrumkavé kura s ryžou, teriyaki omáčka (500 g)", price: "7,50 €" },
      { name: "Teriyaki kura, čerstvá zelenina, teriyaki omáčka, vaječné rezance (450 g)", price: "7,50 €" },
    ],
  },
  {
    day: "Utorok",
    dayEn: "Tuesday",
    soup: "Ostrokyslá / Hanojský vývar kurací",
    items: [
      { name: "Sushi 16 ks: 8 ks Tempura maki krevety, 4 ks maki losos, 4 ks maki avokádo", price: "10,00 €" },
      { name: "Opekané vaječné rezance s kuracím mäsom (500 g)", price: "7,50 €" },
      { name: "Opekané vaječné rezance s tofu (500 g)", price: "7,50 €" },
      { name: "Kuracie so zeleninou, teriyaki omáčka, ryža (500 g)", price: "7,50 €" },
      { name: "Udon rezance s kuracím mäsom (450 g)", price: "7,50 €" },
      { name: "Chrumkavá kačica s ryžou, teriyaki omáčka (500 g)", price: "9,50 €" },
    ],
  },
  {
    day: "Streda",
    dayEn: "Wednesday",
    soup: "Ostrokyslá / hovädzia",
    items: [
      { name: "Sushi 16 ks: 8 ks Tempura maki losos, 4 ks maki krabia tyčinka, 4 ks maki uhorka", price: "10,00 €" },
      { name: "Opekané široké rezance s kuracím mäsom (500 g)", price: "7,50 €" },
      { name: "Rizoto s kuracím mäsom (500 g)", price: "7,50 €" },
      { name: "Kuracie v tempure, hranolky, majonézová omáčka, sezam (400 g)", price: "7,50 €" },
      { name: "Hovädzie lúc lac: hov. mäso jemne pikantné, zelenina, ryža (450 g)", price: "7,50 €", spicy: true },
      { name: "Vyprážané závitky 3 ks, ryža, sladká chilli omáčka (400 g)", price: "7,50 €" },
    ],
  },
  {
    day: "Štvrtok",
    dayEn: "Thursday",
    soup: "Ostrokyslá / Tomyum kuracia",
    items: [
      { name: "Sushi 16 ks: 8 ks Tempura maki krabia tyčinka, 4 ks maki losos, 4 ks maki avokádo", price: "10,00 €" },
      { name: "Opekané ryžové rezance s kuracím mäsom (500 g)", price: "7,50 €" },
      { name: "Opekané ryžové rezance s hovädzím mäsom (500 g)", price: "7,50 €" },
      { name: "Kuracie thajské kari, ryža (500 g)", price: "7,50 €", spicy: true },
      { name: "Teriyaki kura, čerstvá zelenina, teriyaki omáčka, ryža (500 g)", price: "7,50 €" },
      { name: "Kurací obaľovaný rezeň, hranolky (300 g)", price: "7,50 €" },
    ],
  },
  {
    day: "Piatok",
    dayEn: "Friday",
    soup: "Ostrokyslá / Hanojský vývar kurací",
    items: [
      { name: "Sushi 16 ks: 8 ks Tempura maki losos, 4 ks maki krevety, 4 ks maki uhorka", price: "10,00 €" },
      { name: "Opekané vaječné rezance s kuracím mäsom (500 g)", price: "7,50 €" },
      { name: "Opekané vaječné rezance s tofu (500 g)", price: "7,50 €" },
      { name: "Kuracie kung pao, ryža (500 g)", price: "7,50 €", spicy: true },
      { name: "Vyprážaný syr, hranolky, majonéza (300 g)", price: "7,00 €" },
      { name: "Chrumkavé kura, vaječné rezance, teriyaki omáčka (500 g)", price: "7,50 €" },
    ],
  },
];
