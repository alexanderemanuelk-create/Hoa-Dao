"use client";

import { useLanguage } from "@/i18n/LanguageProvider";
import { SectionHeading } from "@/components/SectionHeading";
import type { MenuCategory, MenuSource } from "@/types/menu";

interface MenuProps {
  categories: MenuCategory[];
  source: MenuSource;
}

export function Menu({ categories, source }: MenuProps) {
  const { t, lang } = useLanguage();

  return (
    <section id="menu" className="border-t border-split-ink/10 bg-split-bg">
      <div className="mx-auto max-w-6xl px-6 py-20 lg:px-10 lg:py-28">
        <SectionHeading
          index="02"
          eyebrow={t("menu.eyebrow")}
          heading={t("menu.heading")}
          description={t("menu.description")}
        />

        {source === "fallback" && (
          <p className="mt-4 text-xs italic tracking-wide text-split-ink/50">
            {t("menu.fallbackNotice")}
          </p>
        )}

        <div className="mt-12 grid gap-6 lg:grid-cols-2">
          {categories.map((category) => {
            const categoryName =
              lang === "en" && category.categoryEn ? category.categoryEn : category.category;

            return (
              <div
                key={category.category}
                className="rounded-2xl border border-split-ink/10 bg-split-bg-alt p-6 lg:p-8"
              >
                <h3 className="font-fraunces text-2xl font-medium tracking-tight text-split-ink">
                  {categoryName}
                </h3>
                <div className="mt-3 mb-6 h-px w-10 bg-split-accent" />

                <ul className="flex flex-col gap-6">
                  {category.items.map((item) => {
                    const name = lang === "en" && item.nameEn ? item.nameEn : item.name;
                    const description =
                      lang === "en" && item.descriptionEn ? item.descriptionEn : item.description;

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
            );
          })}
        </div>

        <p className="mt-10 text-xs tracking-wide text-split-ink/50">{t("menu.priceNotice")}</p>
      </div>
    </section>
  );
}
