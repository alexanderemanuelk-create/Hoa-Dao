"use client";

import { useLanguage } from "@/i18n/LanguageProvider";
import { InstagramIcon, FacebookIcon, PinIcon, PhoneIcon, ClockIcon, LongArrowIcon } from "@/components/icons";
import { ContactForm } from "@/components/ContactForm";
import { siteConfig } from "@/config";

// Jazykový prepínač je v hornej navigácii (src/components/Header.tsx),
// preto ho footer neopakuje.
//
// Kontakt a poloha (predtým vlastná celostránková sekcia) je zmenšená a
// presunutá priamo sem — id="contact" tu prevzalo miesto po pôvodnej
// <section id="contact">, takže odkaz "Kontakt" v navigácii funguje bez zmeny
// (viď :is(section, footer)[id] v src/app/globals.css).
export function Footer() {
  const { t, dict } = useLanguage();
  const year = new Date().getFullYear();
  const { contactForm: showForm, map: showMap } = siteConfig.sections;

  const socialLinks = [
    { href: siteConfig.social.instagram, Icon: InstagramIcon, label: "Instagram" },
    { href: siteConfig.social.facebook, Icon: FacebookIcon, label: "Facebook" },
  ].filter((s): s is { href: string; Icon: typeof InstagramIcon; label: string } => Boolean(s.href));

  return (
    <footer id="contact" className="bg-black text-white/80">
      <div className="mx-auto max-w-6xl px-6 pt-10 pb-12 lg:px-10 lg:pt-12 lg:pb-16">
        <h2 className="text-center font-fraunces text-3xl font-medium text-white sm:text-4xl">
          {t("contact.heading")}
        </h2>
        <p className="mx-auto mt-3 max-w-md text-center text-sm leading-relaxed text-white/60">
          {t("contact.intro")}
        </p>

        <div className="mx-auto mt-10 grid max-w-3xl gap-10 sm:grid-cols-2 sm:gap-16">
          <div className="flex flex-col gap-7">
            <div>
              <div className="flex items-center gap-2.5 text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-white/45">
                <PinIcon className="h-4 w-4" />
                {t("contact.addressLabel")}
              </div>
              <p className="mt-2 text-sm text-white/85">{siteConfig.contact.address}</p>
            </div>
            <div>
              <div className="flex items-center gap-2.5 text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-white/45">
                <PhoneIcon className="h-4 w-4" />
                {t("contact.phoneLabel")}
              </div>
              <p className="mt-2 text-sm text-white/85">
                <a href={`tel:${siteConfig.contact.phoneHref}`} className="hover:text-white">
                  {siteConfig.contact.phone}
                </a>
              </p>
              {/* Na mobile otvorí telefónnu appku s predvoleným číslom. */}
              <a
                href={`tel:${siteConfig.contact.phoneHref}`}
                className="group mt-4 inline-flex items-center gap-3 rounded-full bg-accent px-6 py-3 text-xs font-semibold uppercase tracking-[0.18em] text-black transition-opacity hover:opacity-90"
              >
                <PhoneIcon className="h-3.5 w-3.5" />
                {t("contact.callCta")}
              </a>
            </div>
          </div>

          <div>
            <div className="flex items-center gap-2.5 text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-white/45">
              <ClockIcon className="h-4 w-4" />
              {t("contact.hoursLabel")}
            </div>
            <dl className="mt-3 flex max-w-[16rem] flex-col gap-1.5 text-sm">
              {dict.contact.hours.map((row) => (
                <div key={row.day} className="flex items-baseline justify-between gap-6">
                  <dt className="text-white/85">{row.day}</dt>
                  <dd className="tabular-nums text-white/60">{row.time}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>

        {showMap && (
          <div className="mt-10 flex flex-col gap-4">
            <div className="aspect-[21/9] w-full overflow-hidden rounded-xl border border-gold/20">
              <iframe
                src={siteConfig.mapsEmbedUrl}
                title={`${t("contact.heading")} — ${siteConfig.name}`}
                className="h-full w-full"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
            <a
              href={siteConfig.mapsDirectionsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group mx-auto inline-flex w-full items-center justify-center gap-3 rounded-full bg-accent px-8 py-3.5 text-xs font-semibold uppercase tracking-[0.18em] text-black transition-opacity hover:opacity-90 sm:w-fit"
            >
              {t("contact.directionsCta")}
              <LongArrowIcon className="h-3.5 w-5 transition-transform group-hover:translate-x-1" />
            </a>
          </div>
        )}

        {showForm && (
          <div className="mx-auto mt-10 max-w-2xl rounded-2xl bg-split-bg-alt p-6 text-white lg:p-8">
            <h3 className="font-fraunces text-lg font-medium text-white">
              {t("contact.formHeading")}
            </h3>
            <ContactForm />
          </div>
        )}
      </div>

      <div className="flex flex-col items-center gap-3 border-t border-gold/15 px-6 py-6 text-center text-xs text-white/40 lg:px-10">
        {socialLinks.length > 0 && (
          <div className="flex items-center gap-4">
            {socialLinks.map(({ href, Icon, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="text-white/70 transition-colors hover:text-white"
              >
                <Icon className="h-5 w-5" />
              </a>
            ))}
          </div>
        )}
        <span>
          © {year} {siteConfig.name} — {t("footer.rights")}
        </span>
      </div>
    </footer>
  );
}
