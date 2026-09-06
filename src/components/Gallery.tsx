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
    <section id="gallery" className="border-t border-split-ink/10 bg-split-bg-alt">
      <div className="mx-auto max-w-6xl px-6 py-20 lg:px-10 lg:py-28">
        <SectionHeading
          index="03"
          eyebrow={t("gallery.eyebrow")}
          heading={t("gallery.heading")}
          description={t("gallery.description")}
        />

        <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3">
          {galleryImages.map((image, i) => {
            const alt = lang === "en" && image.altEn ? image.altEn : image.alt;
            return (
              <button
                key={image.id}
                type="button"
                onClick={() => lightbox.open(i)}
                className="group relative aspect-square w-full overflow-hidden rounded-xl border border-split-ink/10"
              >
                <PlaceholderImage
                  src={image.src}
                  alt={alt}
                  replaceHint="FOTO GALÉRIE — nahraďte v /public/images/gallery/ a nastavte cestu v src/data/gallery.ts"
                  className="transition-transform duration-300 group-hover:scale-105"
                  sizes="(min-width: 640px) 30vw, 45vw"
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
          className="fixed inset-0 z-[100] flex items-center justify-center bg-split-ink/95 p-6"
        >
          <button
            type="button"
            onClick={lightbox.close}
            aria-label={t("gallery.lightboxClose")}
            className="absolute right-6 top-6 text-split-bg/80 transition-colors hover:text-split-bg"
          >
            <CloseIcon className="h-6 w-6" />
          </button>

          <button
            type="button"
            onClick={lightbox.prev}
            aria-label={t("gallery.lightboxPrev")}
            className="absolute left-4 text-split-bg/70 transition-colors hover:text-split-bg sm:left-8"
          >
            <ChevronLeftIcon className="h-8 w-8" />
          </button>

          <div className="relative aspect-[4/3] w-full max-w-2xl overflow-hidden rounded-xl">
            <PlaceholderImage
              src={active.src}
              alt={lang === "en" && active.altEn ? active.altEn : active.alt}
              replaceHint="FOTO GALÉRIE"
              sizes="90vw"
            />
          </div>

          <button
            type="button"
            onClick={lightbox.next}
            aria-label={t("gallery.lightboxNext")}
            className="absolute right-4 text-split-bg/70 transition-colors hover:text-split-bg sm:right-8"
          >
            <ChevronRightIcon className="h-8 w-8" />
          </button>
        </div>
      )}
    </section>
  );
}
