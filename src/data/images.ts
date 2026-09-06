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
export const heroImage: string | null = null;
export const aboutImage: string | null = null;
