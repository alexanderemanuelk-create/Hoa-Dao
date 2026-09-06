"use client";

import { useLanguage } from "@/i18n/LanguageProvider";
import { PlaceholderImage } from "@/components/PlaceholderImage";
import { SectionHeading } from "@/components/SectionHeading";
import { aboutImage } from "@/data/images";

export function About() {
  const { t } = useLanguage();

  return (
    <section id="about" className="border-t border-split-ink/10 bg-split-bg-alt">
      <div className="mx-auto grid max-w-6xl gap-10 px-6 py-20 lg:grid-cols-2 lg:items-center lg:gap-16 lg:px-10 lg:py-28">
        <div className="relative order-2 aspect-[5/4] w-full overflow-hidden rounded-2xl border border-split-ink/10 lg:order-1">
          <PlaceholderImage
            src={aboutImage}
            alt={t("about.imageAlt")}
            replaceHint="FOTO INTERIÉRU — nahraďte v /public/images/about/interior.jpg a nastavte cestu v src/data/images.ts"
            sizes="(min-width: 1024px) 45vw, 90vw"
          />
        </div>

        <div className="order-1 flex flex-col gap-6 lg:order-2">
          <SectionHeading index="01" eyebrow={t("about.eyebrow")} heading={t("about.heading")} />
          <div className="flex flex-col gap-4">
            <p className="text-base leading-relaxed text-split-ink/70">{t("about.paragraph1")}</p>
            <p className="text-base leading-relaxed text-split-ink/70">{t("about.paragraph2")}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
