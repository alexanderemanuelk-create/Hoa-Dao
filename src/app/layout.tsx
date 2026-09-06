import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Fraunces, Inter, JetBrains_Mono } from "next/font/google";
import { siteConfig } from "@/config";
import { LanguageProvider } from "@/i18n/LanguageProvider";
import "./globals.css";

// Nadpisové písmo.
const fraunces = Fraunces({
  variable: "--font-fraunces-loaded",
  subsets: ["latin", "latin-ext"],
  axes: ["opsz", "SOFT"],
});

// Bežný text a UI (navigácia, kapitálky).
const inter = Inter({
  variable: "--font-inter-loaded",
  subsets: ["latin", "latin-ext"],
});

// Strojopisné písmo — len pre pečiatku v Hero sekcii (identita "kuchynský
// objednávkový lístok", viď .dupe-stamp v globals.css a src/components/Hero.tsx).
const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono-loaded",
  subsets: ["latin", "latin-ext"],
  weight: ["500", "600"],
});

// Pri nasadení pre konkrétny podnik uprav `siteConfig.name` a
// `siteConfig.metaDescription` v src/config.ts.
export const metadata: Metadata = {
  title: siteConfig.name,
  description: siteConfig.metaDescription,
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      lang="sk"
      className={`${fraunces.variable} ${inter.variable} ${jetbrainsMono.variable} scroll-smooth`}
    >
      <body className="min-h-screen font-inter antialiased">
        <LanguageProvider>
          <div className="bg-split-bg-alt text-split-ink">{children}</div>
        </LanguageProvider>
      </body>
    </html>
  );
}
