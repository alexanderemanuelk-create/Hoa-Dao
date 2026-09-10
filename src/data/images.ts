/**
 * Centrálne miesto pre cesty k fotkám, ktoré sa vkladajú mimo Galérie
 * (Hero fotka, fotka v sekcii "O nás").
 *
 * Ako pridať vlastnú fotku:
 *  1. Nahraj súbor do zodpovedajúceho priečinka v /public/images/
 *     (napr. /public/images/hero/hero.jpg)
 *  2. Nižšie nastav hodnotu z `null` na cestu, napr. "/images/hero/hero.jpg"
 *
 * Kým je hodnota `null`, na danom mieste sa zobrazí elegantný zástupný
 * obrázok (pozri src/components/PlaceholderImage.tsx), takže stránka nikdy
 * nevyzerá rozbito ani pred nahratím reálnych fotiek.
 */
/** Fotka na pozadí hornej (Hero) časti stránky. */
export const heroImage: string | null = "/images/hero/hero.png";

/**
 * Voliteľná fotka vedľa názvu v Hero sekcii (pripnutý „lístok" vpravo).
 * Nechaj `null`, kým fotku nemáš — zobrazí sa jemný zástupný rámik.
 * Po nahratí súboru do /public/images/hero/ nastav napr.:
 *   export const heroSideImage = "/images/hero/vedla-nazvu.jpg";
 */
export const heroSideImage: string | null = "/images/hero/side.jpg";

export const aboutImage: string | null = null;
