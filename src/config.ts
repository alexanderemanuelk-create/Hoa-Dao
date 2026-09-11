/**
 * ============================================================================
 *  CENTRÁLNY KONFIGURAČNÝ SÚBOR
 * ============================================================================
 * Toto je JEDINÉ miesto, ktoré treba upraviť pri nasadení šablóny pre nového
 * klienta — kontaktné údaje, sociálne siete, odkazy na Google Sheets/Mapy.
 *
 * Prekladateľné texty (nadpisy, popisy, texty tlačidiel...) sa upravujú v:
 *   src/i18n/sk.json  a  src/i18n/en.json
 *
 * Farby a fonty webu sa menia v:
 *   src/app/globals.css  (blok "@theme" na začiatku súboru)
 * ============================================================================
 */

export const siteConfig = {
  /**
   * Názov podniku. Zobrazuje sa v hlavičke, footeri a v <title> stránky.
   * Business meno sa zvyčajne neprekladá, preto je spoločné pre SK aj EN.
   */
  name: "HOA ĐÀO",

  /**
   * Krátky popis pre <meta name="description"> (SEO) — nezávislý od jazyka
   * verzie zobrazenej v Hero sekcii (tá je v src/i18n/*.json).
   */
  metaDescription: "HOA ĐÀO — Medza 17, Spišská Nová Ves. Otvorené denne 9:00 – 20:00.",

  contact: {
    address: "Medza 17, 052 01 Spišská Nová Ves",
    phone: "0910 806 608",
    /** Formát pre tel: odkaz, napr. "+421900123456" (bez medzier). */
    phoneHref: "+421910806608",
    email: "[EMAIL]",
  },

  /**
   * Odkazy na sociálne siete. Ak klient daný kanál nemá, nastav hodnotu na
   * `null` — ikona sa vo Footeri automaticky nezobrazí.
   *
   * HOA ĐÀO zatiaľ nemá vlastný Instagram, preto obe ikony (Instagram aj
   * Facebook) zámerne vedú na Facebook stránku. Keď pribudne Instagram,
   * vlož jeho URL sem.
   */
  social: {
    instagram:
      "https://www.facebook.com/people/HOA-%C4%90%C3%80O/61591630571888/" as string | null,
    facebook:
      "https://www.facebook.com/people/HOA-%C4%90%C3%80O/61591630571888/" as string | null,
  },

  /**
   * Google Maps embed — vlož `src` z "Embed a map" (Zdieľať → Vložiť mapu)
   * pre konkrétnu prevádzku. Kým adresa nie je reálna (len "[ADRESA, MESTO]"
   * placeholder), zámerne tu nechaj len tento neutrálny, oddialený pohľad na
   * Slovensko bez pripnutého markera — NIE odkaz na konkrétnu skutočnú
   * firmu/miesto, aby demo verzia nezavádzala.
   */
  mapsEmbedUrl:
    "https://maps.google.com/maps?q=Medza%2017%2C%20052%2001%20Spi%C5%A1sk%C3%A1%20Nov%C3%A1%20Ves&z=16&output=embed",

  /**
   * URL Google Maps na tlačidlo "Navigovať" (bežný odkaz na mapy.google.com,
   * nie embed). Otvorí sa v novej karte / v mobilnej appke Google Maps.
   */
  mapsDirectionsUrl:
    "https://www.google.com/maps/dir/?api=1&destination=Medza%2017%2C%20052%2001%20Spi%C5%A1sk%C3%A1%20Nov%C3%A1%20Ves",

  /**
   * ==========================================================================
   * GOOGLE SHEETS — živý zdroj dát pre sekciu Menu
   * ==========================================================================
   * Denné aj stále menu sa naživo ťahajú z dvoch verejne publikovaných
   * Google Sheets hárkov (CSV export) — viď src/lib/menu.ts. Zmena v hárku sa
   * na webe prejaví automaticky najneskôr do `menuRevalidateSeconds` sekúnd,
   * bez nutnosti nový build/deploy.
   *
   * URL nižšie sú predvolené (fungujú „z krabice"), dajú sa prepísať cez
   * premenné prostredia ALACARTE_MENU_CSV_URL / DAILY_MENU_CSV_URL (viď
   * .env.example), napr. ak sa hárok niekedy presunie do iného zošitu.
   *
   * Ako znova získať URL, ak treba:
   *  1. V Google Sheets: Súbor → Zdieľať → Publikovať na web
   *  2. Vyber konkrétny hárok a formát "Hodnoty oddelené čiarkou (.csv)"
   *
   * Očakávané stĺpce (presne v tomto poradí; riadok 1 = hlavička, riadok 2 =
   * trvalý príkladový záznam, ktorý sa nikdy nenačíta — skutočné dáta teda
   * začínajú až riadkom 3). Načíta sa len riadok so stĺpcom "Aktívne" = "ÁNO".
   *   Jedálny listok: Kategória, Názov jedla, Popis, Cena (€),
   *                   Fotka (názov súboru), Poradie, Aktívne
   *   Denné menu:     Deň, Kategória, Názov jedla, Popis, Cena (€),
   *                   Poradie, Aktívne
   *
   * Ak sa CSV nepodarí stiahnuť alebo je prázdne, použijú sa predvolené dáta
   * z src/data/fallback-menu.ts a src/data/daily-menu.ts — stránka /menu teda
   * nikdy nie je prázdna ani rozbitá.
   */
  alacarteMenuCsvUrl:
    process.env.ALACARTE_MENU_CSV_URL ??
    "https://docs.google.com/spreadsheets/d/e/2PACX-1vSc46ssVcMKCEp2_LkSqVMH36MUyPVIvKUHkaTVuBzP_rAcnxkmFTtkOKSlWuBGaxp3CZAcbEjyZVl1/pub?gid=1089322323&single=true&output=csv",
  dailyMenuCsvUrl:
    process.env.DAILY_MENU_CSV_URL ??
    "https://docs.google.com/spreadsheets/d/e/2PACX-1vSc46ssVcMKCEp2_LkSqVMH36MUyPVIvKUHkaTVuBzP_rAcnxkmFTtkOKSlWuBGaxp3CZAcbEjyZVl1/pub?gid=109833948&single=true&output=csv",

  /** Ako často (v sekundách) Next.js znovu načíta menu z Google Sheets (ISR). */
  menuRevalidateSeconds: 300,

  /**
   * ==========================================================================
   * KONTAKTNÝ FORMULÁR
   * ==========================================================================
   * Odosielanie správ zabezpečuje src/app/api/contact/route.ts cez Resend
   * (resend.com má bezplatný plán, žiadna platba nie je na základné
   * fungovanie potrebná). Ak RESEND_API_KEY nie je nastavený v .env,
   * formulár automaticky prepne na "mailto:" odkaz ako zálohu — stránka teda
   * funguje aj úplne bez tejto služby.
   */
  contactForm: {
    /** E-mail, na ktorý majú chodiť správy z formulára. */
    recipientEmail: "[EMAIL]",
    /**
     * Odosielajúca adresa pre Resend. Kým nemá klient overenú vlastnú
     * doménu v Resende, nechaj predvolenú testovaciu adresu nižšie.
     */
    fromEmail: "Kontaktný formulár <onboarding@resend.dev>",
  },

  /**
   * ==========================================================================
   * VOLITEĽNÉ SEKCIE
   * ==========================================================================
   * Nastavením na `false` sa sekcia úplne nevykreslí (nielen skryje cez CSS)
   * — zmizne aj jej odkaz z navigácie. Číta sa v src/app/page.tsx a
   * src/lib/sections.ts (výpočet položiek navigácie).
   *
   * `contactForm` a `map` ovládajú len formulár, resp. mapu v kontaktnej
   * časti päty (Footer) — samotné údaje (adresa/telefón/hodiny) sa
   * zobrazujú vždy, keďže ich potrebuje mať zverejnené každá prevádzka.
   */
  sections: {
    hero: true,
    about: false,
    menu: true,
    gallery: true,
    contactForm: false,
    map: true,
  },
} as const;

export type SiteConfig = typeof siteConfig;
