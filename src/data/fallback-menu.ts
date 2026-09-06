import type { MenuCategory } from "@/types/menu";

/**
 * Záložné (fallback) dáta pre Menu sekciu.
 *
 * Použijú sa vtedy, keď sa nepodarí načítať alebo naparsovať Google Sheets
 * tabuľku (napr. nesprávna URL v .env, výpadok siete, alebo tabuľka ešte nie
 * je nastavená). Vďaka tomu Menu sekcia nikdy nie je prázdna alebo rozbitá.
 *
 * Toto sú len ukážkové položky demonštrujúce štruktúru — reálny obsah bude
 * ťahaný z Google Sheets, viď src/lib/menu.ts a README.md ("Napojenie na
 * Google Sheets").
 */
export const fallbackMenu: MenuCategory[] = [
  {
    category: "Predjedlá",
    categoryEn: "Starters",
    items: [
      {
        name: "Domáca polievka dňa",
        nameEn: "Homemade soup of the day",
        description: "Pripravovaná z čerstvej sezónnej zeleniny",
        descriptionEn: "Made from fresh seasonal vegetables",
        price: "3,50 €",
      },
      {
        name: "Caprese so byvolím mozzarella",
        nameEn: "Caprese with buffalo mozzarella",
        description: "Paradajky, bazalka, olivový olej",
        descriptionEn: "Tomatoes, basil, olive oil",
        price: "6,90 €",
      },
    ],
  },
  {
    category: "Hlavné jedlá",
    categoryEn: "Main Courses",
    items: [
      {
        name: "Grilovaný losos",
        nameEn: "Grilled salmon",
        description: "Pečená zelenina, citrónové maslo",
        descriptionEn: "Roasted vegetables, lemon butter",
        price: "15,90 €",
      },
      {
        name: "Domáce tagliatelle",
        nameEn: "Homemade tagliatelle",
        description: "Hríbová omáčka, parmezán, bylinky",
        descriptionEn: "Wild mushroom sauce, parmesan, herbs",
        price: "11,50 €",
      },
      {
        name: "Hovädzie líčka",
        nameEn: "Braised beef cheeks",
        description: "Zemiakové pyré, glazovaná mrkva",
        descriptionEn: "Potato purée, glazed carrots",
        price: "16,50 €",
      },
    ],
  },
  {
    category: "Dezerty",
    categoryEn: "Desserts",
    items: [
      {
        name: "Domáci tiramisu",
        nameEn: "Homemade tiramisu",
        description: "Mascarpone, espresso, kakao",
        descriptionEn: "Mascarpone, espresso, cocoa",
        price: "4,90 €",
      },
      {
        name: "Jablkový koláč",
        nameEn: "Apple pie",
        description: "Podávaný s vanilkovou zmrzlinou",
        descriptionEn: "Served with vanilla ice cream",
        price: "4,50 €",
      },
    ],
  },
  {
    category: "Nápoje",
    categoryEn: "Drinks",
    items: [
      {
        name: "Espresso",
        nameEn: "Espresso",
        description: "100% arabica",
        descriptionEn: "100% arabica",
        price: "2,20 €",
      },
      {
        name: "Domáca limonáda",
        nameEn: "Homemade lemonade",
        description: "Sezónne ovocie a bylinky",
        descriptionEn: "Seasonal fruit and herbs",
        price: "3,20 €",
      },
    ],
  },
];
