"use client";

import Link from "next/link";
import { useLanguage } from "@/i18n/LanguageProvider";
import { SectionHeading } from "@/components/SectionHeading";
import { ArrowIcon, StarIcon } from "@/components/icons";
import { reviews } from "@/data/reviews";

export function Reviews() {
  const { t, lang } = useLanguage();

  return (
    <section id="reviews" className="border-t border-split-ink/10 bg-split-bg">
      <div className="mx-auto max-w-6xl px-6 py-20 lg:px-10 lg:py-28">
        <SectionHeading
          index="04"
          eyebrow={t("reviews.eyebrow")}
          heading={t("reviews.heading")}
          description={t("reviews.description")}
        />

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {reviews.map((review) => {
            const quote = lang === "en" && review.quoteEn ? review.quoteEn : review.quote;

            return (
              <figure
                key={review.id}
                className="flex flex-col gap-4 rounded-2xl border border-split-ink/10 bg-split-bg-alt p-6"
              >
                {review.rating && (
                  <div className="flex items-center gap-1 text-split-accent">
                    {Array.from({ length: review.rating }).map((_, i) => (
                      <StarIcon key={i} className="h-3.5 w-3.5" />
                    ))}
                  </div>
                )}
                <blockquote className="text-sm leading-relaxed text-split-ink/80">
                  &ldquo;{quote}&rdquo;
                </blockquote>
                <figcaption className="text-xs font-medium uppercase tracking-widest text-split-ink/50">
                  {review.author}
                </figcaption>
              </figure>
            );
          })}
        </div>

        <Link
          href="/recenzie"
          className="group mt-10 inline-flex items-center gap-1.5 text-sm font-medium tracking-wide text-split-ink underline-offset-4 hover:underline"
        >
          {t("reviews.ctaAll")}
          <ArrowIcon className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
        </Link>
      </div>
    </section>
  );
}
