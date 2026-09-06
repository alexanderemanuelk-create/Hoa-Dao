"use client";

import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "@/i18n/LanguageProvider";
import { siteConfig } from "@/config";
import { heroImage } from "@/data/images";
import { ArrowIcon, CameraIcon } from "@/components/icons";

/**
 * Hero Variantu B — vizuálna identita "kuchynský objednávkový lístok" (dupe
 * pad): papierové pozadie, pečiatkový eyebrow, fotka ako pripnutý odtrhnutý
 * lístok s zúbkovaným okrajom. Dva stĺpce: text vľavo, fotka vpravo (na
 * mobile fotka nad textom).
 */
export function Hero() {
  const { t } = useLanguage();

  return (
    <section id="top" className="bg-paper">
      <div className="mx-auto grid max-w-6xl gap-14 px-6 py-16 lg:grid-cols-2 lg:items-center lg:gap-16 lg:px-10 lg:py-24">
        <div className="order-2 flex flex-col gap-6 lg:order-1">
          {/* Pečiatka namiesto obyčajného eyebrow textu — .dupe-stamp v
              globals.css (oválny dvojitý rámik, pootočený, strojopisné
              písmo). */}
          <span className="dupe-stamp w-fit">{t("hero.eyebrow")}</span>

          <h1 className="font-fraunces text-[clamp(2.5rem,6vw,4.5rem)] font-bold leading-[1] tracking-tight text-ink">
            {siteConfig.name}
          </h1>

          <p className="max-w-md text-lg leading-relaxed text-ink/70">{t("hero.subtitle")}</p>

          <div className="mt-2 flex flex-wrap items-center gap-4">
            <a
              href="#menu"
              className="inline-flex items-center gap-2 rounded-lg bg-ink px-6 py-3 text-sm font-medium tracking-wide text-paper transition-opacity hover:opacity-90"
            >
              {t("hero.ctaMenu")}
            </a>
            <Link
              href="/rezervacia"
              className="group inline-flex items-center gap-1.5 rounded-lg border border-brass bg-transparent px-6 py-3 text-sm font-medium tracking-wide text-ink transition-colors hover:bg-brass/10"
            >
              {t("hero.ctaReserve")}
              <ArrowIcon className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>

        {/* Fotka ako pripnutý, mierne pootočený lístok — rotácia je na tomto
            vonkajšom, needorezanom wrapperi (aby klip navrchu nebol tiež
            odrezaný), samotné orezanie zúbkovaného okraja + tieň sú na
            vnútornom .hero-photo-frame. */}
        <div className="relative order-1 mx-auto w-full max-w-sm rotate-3 lg:order-2 lg:max-w-none">
          {/* Klip/štipec hore — dojem, že je fotka pripnutá na nástenku. */}
          <div className="absolute left-1/2 top-0 z-10 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center">
            <div className="h-3.5 w-14 rounded-full border border-ink/15 bg-brass shadow-sm" />
            <div className="-mt-1 h-2 w-2 rounded-full bg-brass shadow-inner" />
          </div>

          <div className="hero-photo-shadow">
            <div className="hero-photo-frame relative aspect-[4/5] w-full overflow-hidden bg-split-bg-alt">
              {heroImage ? (
                <Image
                  src={heroImage}
                  alt={t("about.imageAlt")}
                  fill
                  sizes="(min-width: 1024px) 45vw, 90vw"
                  priority
                  className="object-cover"
                />
              ) : (
                // HERO FOTO — nahraďte v /public/images/hero/ a nastavte
                // cestu v src/data/images.ts (heroImage). Kým fotka nie je
                // nahratá, zobrazuje sa len tlmená ikona fotoaparátu — žiadny
                // viditeľný text s cestou k súboru.
                <div
                  className="flex h-full w-full items-center justify-center"
                  title="HERO FOTO — nahraďte v /public/images/hero/ a nastavte cestu v src/data/images.ts (heroImage)"
                >
                  <CameraIcon className="h-7 w-7 text-ink opacity-25" />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
