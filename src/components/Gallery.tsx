"use client";

import { useLanguage } from "@/i18n/LanguageProvider";
import { SectionHeading } from "@/components/SectionHeading";
import { PlaceholderImage } from "@/components/PlaceholderImage";
import { CloseIcon, ChevronLeftIcon, ChevronRightIcon } from "@/components/icons";
import { galleryImages } from "@/data/gallery";
import { useLightbox } from "@/lib/useLightbox";

export function Gallery() {
  const { t, lang } = useLanguage();
  const lightbox = useLightbox(galleryImages.length);
  const active = lightbox.index !== null ? galleryImages[lightbox.index] : null;

  return (
    <section id="gallery" className="bg-split-bg-alt">
      <div className="mx-auto max-w-6xl px-6 py-10 lg:px-10 lg:py-14">
        <SectionHeading heading={t("gallery.heading")} description={t("gallery.description")} />

        <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {galleryImages.map((image, i) => {
            const alt = lang === "en" && image.altEn ? image.altEn : image.alt;
            return (
              <button
                key={image.id}
                type="button"
                onClick={() => lightbox.open(i)}
                className="group relative aspect-square w-full overflow-hidden rounded-xl border border-gold/20"
              >
                <PlaceholderImage
                  src={image.src}
                  alt={alt}
                  replaceHint="FOTO GALÉRIE — nahraďte v /public/images/gallery/ a nastavte cestu v src/data/gallery.ts"
                  className="transition-transform duration-300 group-hover:scale-105"
                  sizes="(min-width: 1024px) 24vw, (min-width: 640px) 32vw, 48vw"
                />
              </button>
            );
          })}
        </div>
      </div>

      {active && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 p-6"
        >
          <button
            type="button"
            onClick={lightbox.close}
            aria-label={t("gallery.lightboxClose")}
            className="absolute right-6 top-6 text-white/80 transition-colors hover:text-white"
          >
            <CloseIcon className="h-6 w-6" />
          </button>

          <button
            type="button"
            onClick={lightbox.prev}
            aria-label={t("gallery.lightboxPrev")}
            className="absolute left-4 text-white/70 transition-colors hover:text-white sm:left-8"
          >
            <ChevronLeftIcon className="h-8 w-8" />
          </button>

          <div className="relative aspect-square w-full max-w-md overflow-hidden rounded-xl">
            <PlaceholderImage
              src={active.src}
              alt={lang === "en" && active.altEn ? active.altEn : active.alt}
              replaceHint="FOTO GALÉRIE"
              sizes="(min-width: 480px) 28rem, 90vw"
            />
          </div>

          <button
            type="button"
            onClick={lightbox.next}
            aria-label={t("gallery.lightboxNext")}
            className="absolute right-4 text-white/70 transition-colors hover:text-white sm:right-8"
          >
            <ChevronRightIcon className="h-8 w-8" />
          </button>
        </div>
      )}
    </section>
  );
}
