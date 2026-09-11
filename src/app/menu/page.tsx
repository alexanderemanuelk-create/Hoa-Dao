import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { Header } from "@/components/Header";
import { Menu } from "@/components/Menu";
import { Footer } from "@/components/Footer";
import { getDailyMenu, getMenu } from "@/lib/menu";
import { siteConfig } from "@/config";

export const metadata: Metadata = {
  title: `Menu — ${siteConfig.name}`,
  description: siteConfig.metaDescription,
};

/**
 * Samostatná stránka Menu (/menu).
 *
 * Denné aj stále menu sa naživo ťahajú z Google Sheets cez src/lib/menu.ts
 * (ISR revalidácia, viď siteConfig.menuRevalidateSeconds) — komponent
 * src/components/Menu.tsx dostáva už hotové dáta ako props. Na domovskej
 * stránke sa Menu už nezobrazuje.
 */
export default async function MenuPage() {
  if (!siteConfig.sections.menu) redirect("/");

  const [{ categories, source }, { days, source: dailySource }] = await Promise.all([
    getMenu(),
    getDailyMenu(),
  ]);

  return (
    <>
      <Header />
      <main>
        <Menu categories={categories} source={source} dailyMenu={days} dailySource={dailySource} />
      </main>
      <Footer />
    </>
  );
}
