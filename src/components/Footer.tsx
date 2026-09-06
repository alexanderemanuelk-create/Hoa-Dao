"use client";

import { useLanguage } from "@/i18n/LanguageProvider";
import { InstagramIcon, FacebookIcon, PinIcon, PhoneIcon, MailIcon, ClockIcon, ArrowIcon } from "@/components/icons";
import { ContactForm } from "@/components/ContactForm";
import { siteConfig } from "@/config";

// Jazykový prepínač je v hornej navigácii (src/components/Header.tsx),
// preto ho footer neopakuje.
//
// Kontakt a poloha (predtým vlastná celostránková sekcia) je zmenšená a
// presunutá priamo sem — id="contact" tu prevzalo miesto po pôvodnej
// <section id="contact">, takže odkaz "Kontakt" v navigácii funguje bez zmeny
// (viď :is(section, footer)[id] v src/app/globals.css).
//
// Tmavé pozadie (--color-split-ink) je zámerné — po sérii svetlých sekcií
// dáva stránke jasný, čitateľný záver.
export function Footer() {
  const { t, dict } = useLanguage();
  const year = new Date().getFullYear();
  const { contactForm: showForm, map: showMap } = siteConfig.sections;

  const socialLinks = [
    { href: siteConfig.social.instagram, Icon: InstagramIcon, label: "Instagram" },
    { href: siteConfig.social.facebook, Icon: FacebookIcon, label: "Facebook" },
  ].filter((s): s is { href: string; Icon: typeof InstagramIcon; label: string } => Boolean(s.href));

  return (
    <footer id="contact" className="border-t border-split-ink/10 bg-split-ink text-split-bg/80">
      <div className="mx-auto max-w-6xl px-6 py-16 lg:px-10 lg:py-20">
        <span className="text-xs font-medium uppercase tracking-[0.2em] text-split-bg/50">
          05 — {t("contact.eyebrow")}
        </span>
        <h2 className="mt-3 font-fraunces text-3xl font-medium text-split-bg sm:text-4xl">
          {t("contact.heading")}
        </h2>

        <div className={`mt-10 grid gap-10 ${showForm ? "lg:grid-cols-2 lg:gap-16" : ""}`}>
          <div className="flex flex-col gap-6">
            <dl className="flex flex-col gap-3 text-sm">
              <div className="flex items-start gap-3">
                <PinIcon className="mt-0.5 h-4 w-4 shrink-0 text-split-bg/50" />
                <dd>{siteConfig.contact.address}</dd>
              </div>
              <div className="flex items-start gap-3">
                <PhoneIcon className="mt-0.5 h-4 w-4 shrink-0 text-split-bg/50" />
                <dd>
                  <a href={`tel:${siteConfig.contact.phoneHref}`} className="hover:text-split-bg">
                    {siteConfig.contact.phone}
                  </a>
                </dd>
              </div>
              <div className="flex items-start gap-3">
                <MailIcon className="mt-0.5 h-4 w-4 shrink-0 text-split-bg/50" />
                <dd>
                  <a href={`mailto:${siteConfig.contact.email}`} className="hover:text-split-bg">
                    {siteConfig.contact.email}
                  </a>
                </dd>
              </div>
              <div className="flex items-start gap-3">
                <ClockIcon className="mt-0.5 h-4 w-4 shrink-0 text-split-bg/50" />
                <dd className="flex flex-col gap-0.5">
                  {dict.contact.hours.map((row) => (
                    <span key={row.day}>
                      {row.day}: {row.time}
                    </span>
                  ))}
                </dd>
              </div>
            </dl>

            <a
              href={siteConfig.mapsDirectionsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex w-fit items-center gap-1.5 text-xs font-medium tracking-wide text-split-bg underline-offset-4 hover:underline"
            >
              {t("contact.directionsCta")}
              <ArrowIcon className="h-3 w-3 transition-transform group-hover:translate-x-1" />
            </a>

            {showMap && (
              <div className="aspect-[21/9] w-full overflow-hidden rounded-xl">
                <iframe
                  src={siteConfig.mapsEmbedUrl}
                  title={`${t("contact.heading")} — ${siteConfig.name}`}
                  className="h-full w-full grayscale-[15%]"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            )}
          </div>

          {showForm && (
            <div className="rounded-2xl bg-split-bg-alt p-6 text-split-ink lg:p-8">
              <h3 className="font-fraunces text-lg font-medium text-split-ink">
                {t("contact.formHeading")}
              </h3>
              <ContactForm />
            </div>
          )}
        </div>
      </div>

      <div className="mx-auto flex max-w-3xl flex-col items-center gap-5 border-t border-split-bg/10 px-6 py-10 text-center lg:px-10">
        <p className="max-w-sm text-sm leading-relaxed text-split-bg/60">{t("footer.tagline")}</p>

        {socialLinks.length > 0 && (
          <div className="flex items-center gap-4">
            {socialLinks.map(({ href, Icon, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="text-split-bg/70 transition-colors hover:text-split-bg"
              >
                <Icon className="h-5 w-5" />
              </a>
            ))}
          </div>
        )}
      </div>

      <div className="flex flex-col items-center gap-2 border-t border-split-bg/10 px-6 py-5 text-center text-xs text-split-bg/40 lg:px-10">
        <span>
          © {year} {siteConfig.name} — {t("footer.rights")}
        </span>
      </div>
    </footer>
  );
}
