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
  name: "[NÁZOV PODNIKU]",

  /**
   * Krátky popis pre <meta name="description"> (SEO) — nezávislý od jazyka
   * verzie zobrazenej v Hero sekcii (tá je v src/i18n/*.json).
   */
  metaDescription: "[KRÁTKY POPIS PODNIKU PRE VYHĽADÁVAČE]",

  contact: {
    address: "[ADRESA, MESTO]",
    phone: "[TELEFÓN]",
    /** Formát pre tel: odkaz, napr. "+421900123456" (bez medzier). */
    phoneHref: "+421900123456",
    email: "[EMAIL]",
  },

  /**
   * Odkazy na sociálne siete. Ak klient daný kanál nemá, nastav hodnotu na
   * `null` — odkaz sa vo Footeri/Kontakte automaticky nezobrazí.
   */
  social: {
    instagram: "https://instagram.com/[NAZOV_UCTU]" as string | null,
    facebook: "https://facebook.com/[NAZOV_STRANKY]" as string | null,
  },

  /**
   * Google Maps embed — vlož `src` z "Embed a map" (Zdieľať → Vložiť mapu)
   * pre konkrétnu prevádzku. Kým adresa nie je reálna (len "[ADRESA, MESTO]"
   * placeholder), zámerne tu nechaj len tento neutrálny, oddialený pohľad na
   * Slovensko bez pripnutého markera — NIE odkaz na konkrétnu skutočnú
   * firmu/miesto, aby demo verzia nezavádzala.
   */
  mapsEmbedUrl: "https://maps.google.com/maps?q=Slovensko&z=7&output=embed",

  /**
   * URL Google Maps na tlačidlo "Navigovať" (bežný odkaz na mapy.google.com,
   * nie embed). Otvorí sa v novej karte / v mobilnej appke Google Maps.
   */
  mapsDirectionsUrl: "https://maps.google.com/?q=[ADRESA,+MESTO]",

  /**
   * ==========================================================================
   * REZERVÁCIE A RECENZIE — presmerovania
   * ==========================================================================
   * Tlačidlo "Rezervovať stôl" a odkaz na recenzie nevedú priamo na externú
   * službu, ale na interné cesty /rezervacia a /recenzie (viď
   * src/app/rezervacia/page.tsx a src/app/recenzie/page.tsx), ktoré na tieto
   * URL adresy presmerujú. Vďaka tomu môže klient mať tento odkaz vytlačený
   * napr. na vizitkách/menu a platformu neskôr zmeniť len tu, bez nutnosti
   * meniť tlačené materiály.
   */
  reservationUrl: "https://widget.priklad-rezervacneho-systemu.sk/[NAZOV_PODNIKU]",
  reviewsUrl: "https://g.page/r/[GOOGLE_PLACE_ID]/review",

  /**
   * ==========================================================================
   * GOOGLE SHEETS — zdroj dát pre Menu sekciu
   * ==========================================================================
   * Skutočná URL sa nastavuje cez premennú prostredia MENU_SHEET_CSV_URL
   * (viď .env.example), nie tu — aby sa dala meniť bez zásahu do kódu a bez
   * nutnosti commitovať citlivé/klientske hodnoty.
   *
   * Ako získať URL:
   *  1. V Google Sheets: Súbor → Zdieľať → Publikovať na web
   *  2. Vyber konkrétny hárok a formát "Hodnoty oddelené čiarkou (.csv)"
   *  3. Skopíruj vygenerovanú URL do .env ako MENU_SHEET_CSV_URL
   *
   * Očakávané stĺpce v hárku (názvy stĺpcov nerozlišujú veľkosť písmen):
   *   kategoria, nazov, popis, cena, nazov_en, popis_en, kategoria_en
   *   (posledné tri sú voliteľné anglické preklady)
   */
  menuSheetCsvUrl: process.env.MENU_SHEET_CSV_URL ?? "",

  /** Ako často (v sekundách) Next.js znovu načíta menu z Google Sheets (ISR). */
  menuRevalidateSeconds: 3600,

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
    about: true,
    menu: true,
    gallery: true,
    reviews: true,
    contactForm: true,
    map: true,
  },
} as const;

export type SiteConfig = typeof siteConfig;
