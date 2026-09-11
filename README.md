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
| **Denné menu** aj **stále menu** | naživo v Google Sheets (viď nižšie); `src/data/daily-menu.ts` a `src/data/fallback-menu.ts` sú len predvolené záložné dáta |
| Fotky ku kategóriám stáleho menu (striedavo vľavo/vpravo) | `src/data/menu-photos.ts` → súbory v `public/images/menu/` |
| Fotka na pozadí Hero + fotka vedľa názvu | `src/data/images.ts` → `public/images/hero/` |
| Galéria | `src/data/gallery.ts` → `public/images/gallery/` |

## Menu z Google Sheets (naživo)

Denné aj stále menu (`/menu`) sa ťahajú naživo z dvoch verejne publikovaných
Google Sheets hárkov (CSV export) — URL sú predvolené v `src/config.ts`
(dajú sa prepísať cez `ALACARTE_MENU_CSV_URL` / `DAILY_MENU_CSV_URL` v
`.env.local`). Zmena v hárku (napr. cena) sa na webe prejaví automaticky do
5 minút (`menuRevalidateSeconds`), bez nového buildu/deployu — Next.js dáta
znova stiahne cez ISR (`fetch(url, { next: { revalidate } })`).

Očakávané stĺpce (presne v tomto poradí; riadok 1 = hlavička, riadok 2 =
trvalý príkladový záznam, ktorý sa nikdy nenačíta — skutočné dáta teda
začínajú až riadkom 3). Načíta sa len riadok, kde je "Aktívne" = "ÁNO":

- **Jedálny listok**: `Kategória, Názov jedla, Popis, Cena (€), Fotka (názov súboru), Poradie, Aktívne`
- **Denné menu**: `Deň, Kategória, Názov jedla, Popis, Cena (€), Poradie, Aktívne`

Položky sa v rámci kategórie/dňa zoraďujú podľa stĺpca "Poradie". Stĺpec
"Fotka (názov súboru)" je názov súboru v `public/images/menu/` (napr.
`burger.jpg`) — ak sa vyplní, pri položke sa zobrazí malá fotka.

Parsovanie rieši `src/lib/menu.ts` (knižnica `papaparse`). Ak sa CSV
nepodarí stiahnuť alebo je prázdne, použije sa predpripravené predvolené
menu z `src/data/fallback-menu.ts` / `src/data/daily-menu.ts`, takže stránka
nikdy nie je prázdna ani rozbitá.

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
