"use client";

import Image from "next/image";
import { useLanguage } from "@/i18n/LanguageProvider";
import { PlaceholderImage } from "@/components/PlaceholderImage";
import { alacarteCategoryPhotos } from "@/data/menu-photos";
import type { DailyMenuDay, MenuCategory, MenuItem, MenuSource } from "@/types/menu";

interface MenuProps {
  categories: MenuCategory[];
  dailyMenu: DailyMenuDay[];
  /** Ponechané pre prípadné budúce použitie (napr. odznak "naživo"/"predvolené"). */
  source?: MenuSource;
  dailySource?: MenuSource;
}

/**
 * Kategórie, ktoré sa v sekcii Menu vôbec nezobrazujú (ani dlaždica, ani plný
 * zoznam) — bez ohľadu na to, či dáta idú z Google Sheets alebo z predvolených
 * súborov. Názov musí sedieť presne s hodnotou v stĺpci "Kategória".
 */
const HIDDEN_CATEGORIES = new Set([
  "Prílohy",
  "Nápoje – nealkoholické",
  "Nápoje – čaj",
  "Nápoje – káva",
  "Nápoje – alkoholické",
]);

/** ID kotvy pre kategóriu (dlaždica hore → skok na jej plný zoznam nižšie). */
function categorySlug(category: string): string {
  return `menu-${category
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^\p{L}\p{N}-]/gu, "")}`;
}

/** Riadok jednej à la carte položky – voliteľná fotka, číslo, názov,
 *  hmotnosť, alergény, popis a buď jedna cena, alebo zoznam variantov. */
function AlacarteItem({ item, lang }: { item: MenuItem; lang: "sk" | "en" }) {
  const name = lang === "en" && item.nameEn ? item.nameEn : item.name;
  const description =
    lang === "en" && item.descriptionEn ? item.descriptionEn : item.description;

  return (
    <li className="flex gap-4">
      {item.photo && (
        <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-lg border border-gold/20 sm:h-16 sm:w-16">
          <Image
            src={`/images/menu/${item.photo}`}
            alt={name}
            fill
            sizes="64px"
            className="object-cover"
          />
        </div>
      )}

      <div className="flex-1">
        <div className="flex items-baseline gap-3">
          {item.number && (
            <span className="shrink-0 text-sm text-split-ink/40 tabular-nums">{item.number}.</span>
          )}
          <span className="font-medium text-split-ink">
            {name}
            {item.spicy && <span aria-label="pikantné"> 🌶</span>}
            {item.weight && (
              <span className="ml-2 text-xs font-normal text-split-ink/40">{item.weight}</span>
            )}
            {item.allergens && (
              <span className="ml-1.5 text-xs font-normal text-split-ink/35">({item.allergens})</span>
            )}
          </span>
          {item.price && (
            <>
              <span aria-hidden className="h-px flex-1 bg-split-ink/15" />
              <span className="shrink-0 whitespace-nowrap font-medium text-split-ink">
                {item.price}
              </span>
            </>
          )}
        </div>

        {description && (
          <p className="mt-1 text-sm leading-relaxed text-split-ink/55">{description}</p>
        )}

        {item.variants && item.variants.length > 0 && (
          <ul className="mt-2 flex flex-col gap-1">
            {item.variants.map((v, i) => (
              <li key={i} className="flex items-baseline gap-3 text-sm">
                <span className="text-split-ink/75">
                  {lang === "en" && v.labelEn ? v.labelEn : v.label}
                  {v.spicy && <span aria-label="pikantné"> 🌶</span>}
                </span>
                <span aria-hidden className="h-px flex-1 bg-split-ink/10" />
                <span className="shrink-0 whitespace-nowrap text-split-ink/90">{v.price}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </li>
  );
}

export function Menu({ categories, dailyMenu }: MenuProps) {
  const { t, lang } = useLanguage();
  const visibleCategories = categories.filter((c) => !HIDDEN_CATEGORIES.has(c.category));

  return (
    <section id="menu" className="bg-split-bg">
      <div className="mx-auto max-w-6xl px-6 pt-12 pb-10 lg:px-10 lg:pt-16 lg:pb-10">
        {/* ---------------------------------------------------------------- */}
        {/* DENNÉ MENU — naživo z Google Sheets (src/lib/menu.ts, getDailyMenu) */}
        {/* Kvetinová dekorácia (strom) po stranách: /public/images/menu/tree-decor.png */}
        {/* ---------------------------------------------------------------- */}
        <div className="relative w-screen ml-[calc(50%-50vw)] mr-[calc(50%-50vw)]">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute left-0 top-0 z-0 hidden overflow-hidden opacity-90 md:block md:h-96 md:w-64 lg:h-[28rem] lg:w-80 xl:h-[32rem] xl:w-96"
          >
            <Image
              src="/images/menu/tree-decor.png"
              alt=""
              fill
              quality={90}
              sizes="24rem"
              className="object-cover object-left"
            />
          </div>
          <div
            aria-hidden="true"
            className="pointer-events-none absolute right-0 top-1/2 z-0 hidden -translate-y-1/2 -scale-x-100 overflow-hidden opacity-90 md:block md:h-96 md:w-64 lg:h-[28rem] lg:w-80 xl:h-[32rem] xl:w-96"
          >
            <Image
              src="/images/menu/tree-decor.png"
              alt=""
              fill
              quality={90}
              sizes="24rem"
              className="object-cover object-left"
            />
          </div>

          <div className="relative z-10 mx-auto max-w-2xl px-6 lg:px-10">
            <h3 className="text-center font-fraunces text-2xl font-medium tracking-tight text-split-ink sm:text-3xl">
              {t("menu.dailyHeading")}
            </h3>
            <p className="mx-auto mt-3 max-w-xl text-center text-sm leading-relaxed text-split-ink/60">
              {t("menu.dailyNote")}
            </p>

            <div className="mt-8 flex flex-col gap-6">
              {dailyMenu.map((day) => {
                const dayName = lang === "en" ? day.dayEn : day.day;

                return (
                  <div
                    key={day.day}
                    className="rounded-2xl border border-gold/20 bg-split-bg-alt p-6 lg:p-8"
                  >
                    <h4 className="font-fraunces text-xl font-medium uppercase tracking-[0.08em] text-split-ink">
                      {dayName}
                    </h4>
                    <div className="mt-3 mb-5 h-px w-10 bg-split-accent" />

                    <ol className="flex flex-col gap-3.5">
                      {day.items.map((item, i) => (
                        <li key={i}>
                          <div className="flex items-baseline gap-3">
                            <span className="shrink-0 text-split-ink/40 tabular-nums">{i + 1}.</span>
                            <span className="font-medium text-split-ink">
                              {item.name}
                              {item.spicy && <span aria-label="pikantné"> 🌶</span>}
                            </span>
                            <span aria-hidden className="h-px min-w-6 flex-1 bg-split-ink/15" />
                            <span className="shrink-0 whitespace-nowrap font-medium text-split-ink">
                              {item.price}
                            </span>
                          </div>
                          {item.description && (
                            <p className="mt-1 text-sm leading-relaxed text-split-ink/55">
                              {item.description}
                            </p>
                          )}
                        </li>
                      ))}
                    </ol>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* ---------------------------------------------------------------- */}
        {/* STÁLE MENU — naživo z Google Sheets (src/lib/menu.ts, getMenu).   */}
        {/* Fotky ku kategóriám (striedavo vľavo/vpravo): src/data/menu-photos.ts */}
        {/* ---------------------------------------------------------------- */}
        <h3 className="mt-16 text-center font-fraunces text-2xl font-medium tracking-tight text-split-ink sm:text-3xl">
          {t("menu.alacarteHeading")}
        </h3>

        {/* Dlaždice kategórií — fotka + názov, klik skočí na plný zoznam nižšie.
            Počet dlaždíc sa prispôsobí počtu kategórií v Google Sheets. */}
        <div className="mx-auto mt-8 grid max-w-4xl grid-cols-[repeat(auto-fill,minmax(6.5rem,1fr))] gap-4 sm:gap-5">
          {visibleCategories.map((category) => {
            const categoryName =
              lang === "en" && category.categoryEn ? category.categoryEn : category.category;
            const photo = alacarteCategoryPhotos[category.category] ?? null;

            return (
              <a
                key={category.category}
                href={`#${categorySlug(category.category)}`}
                className="group flex flex-col items-center gap-2.5"
              >
                <div className="relative aspect-square w-full overflow-hidden rounded-2xl border border-gold/20 transition-transform duration-200 group-hover:scale-[1.03]">
                  <PlaceholderImage
                    src={photo}
                    alt={categoryName}
                    replaceHint="FOTO KATEGÓRIE — nastavte cestu v src/data/menu-photos.ts"
                    sizes="(min-width: 1024px) 10vw, 30vw"
                  />
                </div>
                <span className="text-center text-xs font-medium uppercase leading-tight tracking-wide text-split-ink/70 group-hover:text-split-ink">
                  {categoryName}
                </span>
              </a>
            );
          })}
        </div>

        <div className="mt-10 flex flex-col gap-8">
          {visibleCategories.map((category, idx) => {
            const categoryName =
              lang === "en" && category.categoryEn ? category.categoryEn : category.category;
            const photo = alacarteCategoryPhotos[category.category] ?? null;
            const photoRight = idx % 2 === 1;
            const anchorId = categorySlug(category.category);

            const card = (
              <div className="flex-1 rounded-2xl border border-gold/20 bg-split-bg-alt p-6 lg:p-8">
                <h4 className="font-fraunces text-2xl font-medium tracking-tight text-split-ink">
                  {categoryName}
                </h4>
                <div className="mt-3 h-px w-10 bg-split-accent" />
                {category.note && (
                  <p className="mt-3 text-sm leading-relaxed text-split-ink/50">{category.note}</p>
                )}

                <ul className="mt-6 flex flex-col gap-6">
                  {category.items.map((item, i) => (
                    <AlacarteItem key={`${category.category}-${i}`} item={item} lang={lang} />
                  ))}
                </ul>
              </div>
            );

            if (!photo) {
              return (
                <div key={category.category} id={anchorId} className="flex scroll-mt-24">
                  {card}
                </div>
              );
            }

            return (
              <div
                key={category.category}
                id={anchorId}
                className={`flex scroll-mt-24 flex-col gap-4 lg:items-stretch lg:gap-8 ${
                  photoRight ? "lg:flex-row-reverse" : "lg:flex-row"
                }`}
              >
                <div className="w-full lg:w-80 lg:shrink-0">
                  <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl border border-gold/20 lg:aspect-auto lg:h-full lg:min-h-[15rem]">
                    <PlaceholderImage
                      src={photo}
                      alt={categoryName}
                      replaceHint="FOTO KU KATEGÓRII — nastavte cestu v src/data/menu-photos.ts"
                      sizes="(min-width: 1024px) 20rem, 100vw"
                    />
                  </div>
                </div>
                {card}
              </div>
            );
          })}
        </div>

        <p className="mt-8 text-xs tracking-wide text-split-ink/50">{t("menu.priceNotice")}</p>
      </div>
    </section>
  );
}
