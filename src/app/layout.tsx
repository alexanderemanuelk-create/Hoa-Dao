import type { Metadata } from "next";
import type { ReactNode } from "react";
import { siteConfig } from "@/config";
import { LanguageProvider } from "@/i18n/LanguageProvider";
import "./globals.css";

// Celý web používa Times New Roman (systémové písmo) — viď blok "@theme" a
// pravidlo `body` v src/app/globals.css. Preto sa tu už nenačítava žiadne
// Google Font cez next/font.

// Pri nasadení pre konkrétny podnik uprav `siteConfig.name` a
// `siteConfig.metaDescription` v src/config.ts.
export const metadata: Metadata = {
  title: siteConfig.name,
  description: siteConfig.metaDescription,
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="sk" className="scroll-smooth">
      <body className="min-h-screen antialiased">
        <LanguageProvider>
          <div className="bg-black text-white">{children}</div>
        </LanguageProvider>
      </body>
    </html>
  );
}
