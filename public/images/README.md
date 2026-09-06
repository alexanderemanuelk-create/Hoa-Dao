# Fotky

Šablóna funguje aj úplne bez fotiek — namiesto nich sa zobrazujú elegantné
zástupné plochy s ikonou fotoaparátu, takže stránka nikdy nevyzerá rozbito.

## Kam nahrať fotky

| Priečinok | Na čo slúži | Kde sa nastavuje cesta |
| --- | --- | --- |
| `images/hero/` | Fotka v Hero sekcii | `src/data/images.ts` → `heroImage` |
| `images/about/` | Fotka interiéru v sekcii "O nás" | `src/data/images.ts` → `aboutImage` |
| `images/gallery/` | Fotky v sekcii Galéria | `src/data/gallery.ts` → `galleryImages[].src` |
| `images/og/` | Náhľadový obrázok pri zdieľaní na sociálnych sieťach (voliteľné) | `src/app/layout.tsx` (metadata) |

## Postup

1. Nahraj fotku do príslušného priečinka (odporúčaný formát `.jpg`/`.webp`,
   optimalizovaná veľkosť do cca 300 KB).
2. V príslušnom dátovom súbore (tabuľka vyššie) zmeň hodnotu `null` na cestu
   k súboru, napr. `/images/hero/hero.jpg`.
3. Ulož — Next.js automaticky vygeneruje optimalizované verzie (`next/image`).
