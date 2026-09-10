"use client";

import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "@/i18n/LanguageProvider";
import { siteConfig } from "@/config";
import { heroImage, heroSideImage } from "@/data/images";
import { PlaceholderImage } from "@/components/PlaceholderImage";
import { LongArrowIcon } from "@/components/icons";

/**
 * Hero — fotka (kvitnúca broskyňa) ako pozadie hornej časti stránky, nad ňou
 * biely text (Times New Roman) v ľavom stĺpci a vpravo fotka na šírku
 * (heroSideImage v src/data/images.ts).
 *
 * Fotka na pozadí sa naspodku plynulo stráca do čiernej.
 *
 * Úvodná animácia pri prvom načítaní:
 *  - názov podniku priletí celý naraz zľava (.hoa-anim-title)
 *  - ostatné bloky sa zjavia zdola (.hoa-anim-rise)
 */
export function Hero() {
  const { t } = useLanguage();

  return (
    <section id="top" className="relative isolate overflow-hidden bg-black">
      {heroImage && (
        <Image
          src={heroImage}
          alt={t("about.imageAlt")}
          fill
          priority
          sizes="100vw"
          className="-z-10 object-cover object-center"
        />
      )}
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-black/80 via-black/45 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 -z-10 h-56 bg-gradient-to-b from-transparent to-black" />

      <div className="mx-auto grid min-h-[calc(100vh-4rem)] max-w-6xl items-center gap-10 px-6 py-10 lg:grid-cols-2 lg:px-10">
        <div className="order-2 flex flex-col gap-7 lg:order-1">
          <h1 className="hoa-anim-title whitespace-nowrap font-fraunces text-[clamp(2.75rem,8vw,5.75rem)] font-bold uppercase leading-[1] tracking-[0.01em] text-white drop-shadow-[0_2px_20px_rgba(0,0,0,0.6)]">
            {siteConfig.name}
          </h1>

          <p
            className="hoa-anim-rise max-w-md whitespace-pre-line text-lg leading-relaxed text-white/80"
            style={{ animationDelay: "0.2s" }}
          >
            {t("hero.subtitle")}
          </p>

          <div
            className="hoa-anim-rise mt-2 flex flex-wrap items-center gap-4"
            style={{ animationDelay: "0.4s" }}
          >
            <Link
              href="/menu"
              className="group inline-flex items-center gap-3 rounded-full border border-gold/70 bg-black px-7 py-3.5 text-xs font-semibold uppercase tracking-[0.18em] text-white transition-colors hover:bg-gold/10"
            >
              {t("hero.ctaMenu")}
              <LongArrowIcon className="h-3.5 w-5 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>

        {/* Vpravo — „pripnutá" fotka na šírku so zlatou sponkou. Kým
            heroSideImage nie je nastavená, vykreslí sa zástupný rámik. */}
        <div
          className="hoa-anim-rise relative order-1 w-full lg:order-2 lg:justify-self-end"
          style={{ animationDelay: "0.3s" }}
        >
          <div className="relative mx-auto w-full max-w-md rotate-2 lg:max-w-lg">
            <div className="absolute left-1/2 top-0 z-10 h-3 w-16 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold shadow-[0_2px_8px_rgba(0,0,0,0.4)]" />
            <div className="hero-photo-shadow overflow-hidden rounded-sm border border-gold/30 bg-neutral-950">
              <div className="relative aspect-[4/3] w-full">
                <PlaceholderImage
                  src={heroSideImage}
                  alt={t("hero.sideImageAlt")}
                  replaceHint="FOTO VEDĽA NÁZVU — nahrajte do /public/images/hero/ a nastavte cestu v src/data/images.ts (heroSideImage)"
                  sizes="(min-width: 1024px) 40vw, 90vw"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </div>

    </section>
  );
}
