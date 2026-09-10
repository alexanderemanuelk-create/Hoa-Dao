# HOA ĐÀO — web reštaurácie

Web pre vietnamskú reštauráciu **HOA ĐÀO** (Medza 17, Spišská Nová Ves).
Next.js 16 + Tailwind v4. Tmavá téma: čierne pozadie, písmo Times New Roman,
biely text, ružovo‑zlaté akcenty; navigácia je priesvitný „sklový" pruh
v kombinácii čiernej a vínovej.

## Spustenie

```bash
npm install
npm run dev
```

Otvor <http://localhost:3000>.

Ďalšie príkazy: `npm run build` (produkčný build), `npm start`, `npm run lint`.

## Stránky a sekcie

| Stránka | Obsah |
| --- | --- |
| `/` | Hero (názov + fotka na pozadí), Galéria, Kontakt a poloha (v päte) |
| `/menu` | Denné menu (pondelok–piatok) + stále menu (à la carte) |

Sekcie na domovskej stránke sa dajú vypnúť v `src/config.ts` (`sections`).

## Kde čo upraviť

| Čo | Kde |
| --- | --- |
| Názov, adresa, telefón, mapa, sociálne siete | `src/config.ts` |
| Všetky texty (SK aj EN) | `src/i18n/sk.json` a `src/i18n/en.json` (rovnaká štruktúra) |
| Farby a fonty | `src/app/globals.css` (blok `@theme`) |
| **Denné menu** (pondelok–piatok) | `src/data/daily-menu.ts` |
| **Stále menu** – fallback dáta | `src/data/fallback-menu.ts` (alebo Google Sheets, nižšie) |
| Fotky ku kategóriám stáleho menu (striedavo vľavo/vpravo) | `src/data/menu-photos.ts` → súbory v `public/images/menu/` |
| Fotka na pozadí Hero + fotka vedľa názvu | `src/data/images.ts` → `public/images/hero/` |
| Galéria | `src/data/gallery.ts` → `public/images/gallery/` |

## Menu z Google Sheets (voliteľné)

Stále menu sa vie ťahať z verejne publikovanej Google Sheets tabuľky
(CSV export). Nastav `MENU_SHEET_CSV_URL` v `.env.local` (viď `.env.example`).
Ak nie je nastavená, zobrazí sa ukážkové menu z `src/data/fallback-menu.ts`.

Očakávané stĺpce v hárku (nerozlišujú veľkosť písmen):
`kategoria, nazov, popis, cena, nazov_en, popis_en, kategoria_en`.

## Kontaktný formulár (voliteľné)

Vypnutý (`sections.contactForm: false`). Ak sa zapne, odosielanie správ
zabezpečuje `src/app/api/contact/route.ts` cez [Resend](https://resend.com)
(`RESEND_API_KEY` v `.env.local`); bez kľúča sa použije `mailto:` záloha.

## Nasadenie

Nasadené na **Vercel**, napojené na tento GitHub repozitár — každý push do
vetvy `main` spustí nový produkčný build.

## Štruktúra

```
src/
  app/
    layout.tsx            – LanguageProvider, metadata
    page.tsx              – domovská stránka (Hero, Galéria, päta)
    menu/page.tsx         – samostatná stránka Menu
    globals.css           – téma (farby, fonty), animácie
    api/contact/route.ts  – odoslanie kontaktného formulára (Resend)
  components/             – Header, Hero, Menu, Gallery, Footer,
                           SectionHeading, ContactForm, PlaceholderImage, icons
  i18n/                   – LanguageProvider + sk.json / en.json
  lib/                    – načítanie menu (Google Sheets CSV), navigácia, lightbox
  data/                   – daily-menu, menu-photos, gallery, images, fallback-menu
  types/                  – typy pre menu a galériu
```
