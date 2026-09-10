"use client";

import { useLanguage } from "@/i18n/LanguageProvider";
import { PlaceholderImage } from "@/components/PlaceholderImage";
import { dailyMenu } from "@/data/daily-menu";
import { alacarteCategoryPhotos } from "@/data/menu-photos";
import type { MenuCategory, MenuSource } from "@/types/menu";

interface MenuProps {
  categories: MenuCategory[];
  source: MenuSource;
}

export function Menu({ categories, source }: MenuProps) {
  const { t, lang } = useLanguage();

  return (
    <section id="menu" className="bg-split-bg">
      <div className="mx-auto max-w-6xl px-6 pt-12 pb-10 lg:px-10 lg:pt-16 lg:pb-10">
        {/* ---------------------------------------------------------------- */}
        {/* DENNÉ MENU — obsah v src/data/daily-menu.ts                       */}
        {/* ---------------------------------------------------------------- */}
        <div>
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
                  <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
                    <h4 className="font-fraunces text-xl font-medium uppercase tracking-[0.08em] text-split-ink">
                      {dayName}
                    </h4>
                    <span className="text-sm text-split-ink/60">
                      {t("menu.soupLabel")}: {day.soup}
                    </span>
                  </div>
                  <div className="mt-3 mb-5 h-px w-10 bg-split-accent" />

                  <ol className="flex flex-col gap-3.5">
                    {day.items.map((item, i) => (
                      <li key={i} className="flex items-baseline gap-3">
                        <span className="shrink-0 text-split-ink/40 tabular-nums">{i + 1}.</span>
                        <span className="font-medium text-split-ink">
                          {item.name}
                          {item.spicy && <span aria-label="pikantné"> 🌶</span>}
                        </span>
                        <span aria-hidden className="h-px min-w-6 flex-1 bg-split-ink/15" />
                        <span className="shrink-0 whitespace-nowrap font-medium text-split-ink">
                          {item.price}
                        </span>
                      </li>
                    ))}
                  </ol>
                </div>
              );
            })}
          </div>
        </div>

        {/* ---------------------------------------------------------------- */}
        {/* STÁLE MENU (à la carte) — z Google Sheets / ukážkových dát.       */}
        {/* Fotky ku kategóriám (striedavo vľavo/vpravo): src/data/menu-photos.ts */}
        {/* ---------------------------------------------------------------- */}
        <h3 className="mt-16 text-center font-fraunces text-2xl font-medium tracking-tight text-split-ink sm:text-3xl">
          {t("menu.alacarteHeading")}
        </h3>

        {source === "fallback" && (
          <p className="mt-3 text-center text-xs italic tracking-wide text-split-ink/50">
            {t("menu.fallbackNotice")}
          </p>
        )}

        <div className="mt-8 flex flex-col gap-8">
          {categories.map((category, idx) => {
            const categoryName =
              lang === "en" && category.categoryEn ? category.categoryEn : category.category;
            // Fotky sa striedajú: párna kategória fotka vľavo, nepárna vpravo.
            const photoRight = idx % 2 === 1;
            const photo = alacarteCategoryPhotos[idx] ?? null;

            return (
              <div
                key={category.category}
                className={`flex flex-col gap-4 lg:items-stretch lg:gap-8 ${
                  photoRight ? "lg:flex-row-reverse" : "lg:flex-row"
                }`}
              >
                <div className="w-full lg:w-80 lg:shrink-0">
                  <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl border border-gold/20 lg:aspect-auto lg:h-full lg:min-h-[15rem]">
                    <PlaceholderImage
                      src={photo}
                      alt={categoryName}
                      replaceHint="FOTO KU KATEGÓRII — nahrajte do /public/images/menu/ a nastavte cestu v src/data/menu-photos.ts"
                      sizes="(min-width: 1024px) 20rem, 100vw"
                    />
                  </div>
                </div>

                <div className="flex-1 rounded-2xl border border-gold/20 bg-split-bg-alt p-6 lg:p-8">
                  <h4 className="font-fraunces text-2xl font-medium tracking-tight text-split-ink">
                    {categoryName}
                  </h4>
                  <div className="mt-3 mb-6 h-px w-10 bg-split-accent" />

                  <ul className="flex flex-col gap-6">
                    {category.items.map((item) => {
                      const name = lang === "en" && item.nameEn ? item.nameEn : item.name;
                      const description =
                        lang === "en" && item.descriptionEn
                          ? item.descriptionEn
                          : item.description;

                      return (
                        <li key={`${category.category}-${item.name}`}>
                          <div className="flex items-baseline gap-3">
                            <span className="font-medium text-split-ink">{name}</span>
                            <span aria-hidden className="h-px flex-1 bg-split-ink/15" />
                            <span className="whitespace-nowrap font-medium text-split-ink">
                              {item.price}
                            </span>
                          </div>
                          {description && (
                            <p className="mt-1 text-sm leading-relaxed text-split-ink/60">
                              {description}
                            </p>
                          )}
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>

        <p className="mt-8 text-xs tracking-wide text-split-ink/50">{t("menu.priceNotice")}</p>
      </div>
    </section>
  );
}
