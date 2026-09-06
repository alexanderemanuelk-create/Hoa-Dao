# Šablóna č. 2 — web pre gastro prevádzku

Jednostránkový web (Next.js 16 + Tailwind v4) pre reštauráciu / kaviareň /
bistro. Vizuálna identita: **kuchynský objednávkový lístok** — papierové
pozadie, pečiatka, klip, zúbkovaný „odtrhnutý" okraj fotky; pod hero sekciou
prehľadné, číslované sekcie s výraznou typografiou.

Vznikla vytiahnutím „šablóny číslo 2" zo spoločného projektu do samostatného,
nezávisle spustiteľného webu.

## Spustenie

```bash
npm install
npm run dev
```

Otvor <http://localhost:3000>.

Ďalšie príkazy: `npm run build` (produkčný build), `npm start` (spustí build),
`npm run lint`.

## Sekcie

Hero · O nás · Menu · Galéria · Recenzie · Kontakt (v päte) — každá sa dá
vypnúť v `src/config.ts` (`sections`), vtedy zmizne aj z navigácie.

## Kde čo upraviť

| Čo | Kde |
| --- | --- |
| Názov podniku, kontakt, sociálne siete, odkazy (rezervácie, recenzie, mapa) | `src/config.ts` |
| Všetky texty (SK aj EN) | `src/i18n/sk.json` a `src/i18n/en.json` (rovnaká štruktúra) |
| Farby a fonty | `src/app/globals.css` (blok `@theme`) |
| Fotky | `public/images/` + cesty v `src/data/images.ts` a `src/data/gallery.ts` — viď `public/images/README.md` |
| Recenzie | `src/data/reviews.ts` |
| Ukážkové menu (fallback) | `src/data/fallback-menu.ts` |

## Menu z Google Sheets (voliteľné)

Menu sekcia sa vie ťahať z verejne publikovanej Google Sheets tabuľky
(CSV export). Nastav `MENU_SHEET_CSV_URL` v `.env.local` (viď `.env.example`).
Ak nie je nastavená, zobrazí sa ukážkové menu z `src/data/fallback-menu.ts`.

Očakávané stĺpce v hárku (nerozlišujú veľkosť písmen):
`kategoria, nazov, popis, cena, nazov_en, popis_en, kategoria_en`.

## Kontaktný formulár (voliteľné)

Odosielanie správ zabezpečuje `src/app/api/contact/route.ts` cez
[Resend](https://resend.com). Nastav `RESEND_API_KEY` v `.env.local`. Ak nie
je nastavený, formulár sa automaticky prepne na `mailto:` odkaz ako zálohu —
web teda funguje aj bez tejto služby.

## Štruktúra

```
src/
  app/
    layout.tsx           – fonty, LanguageProvider, metadata
    page.tsx             – domovská stránka (poskladá sekcie)
    globals.css          – téma (farby, fonty), pomocné triedy hero/pečiatka
    api/contact/route.ts – odoslanie kontaktného formulára (Resend)
    rezervacia/page.tsx  – presmerovanie na rezervačnú platformu
    recenzie/page.tsx    – presmerovanie na stránku s recenziami
  components/            – Header, Hero, About, Menu, Gallery, Reviews, Footer,
                          SectionHeading, ContactForm, PlaceholderImage, icons
  i18n/                  – LanguageProvider + sk.json / en.json
  lib/                   – načítanie menu (Google Sheets CSV), navigácia, lightbox
  data/                  – recenzie, fotky, fallback menu
  types/                 – typy pre menu a galériu
```
