import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { Header } from "@/components/Header";
import { Menu } from "@/components/Menu";
import { Footer } from "@/components/Footer";
import { getMenu } from "@/lib/menu";
import { siteConfig } from "@/config";

export const metadata: Metadata = {
  title: `Menu — ${siteConfig.name}`,
  description: siteConfig.metaDescription,
};

/**
 * Samostatná stránka Menu (/menu).
 *
 * Denné aj stále menu — obsah rieši komponent src/components/Menu.tsx
 * (denné menu: src/data/daily-menu.ts, stále menu: Google Sheets / fallback).
 * Na domovskej stránke sa Menu už nevykresľuje.
 */
export default async function MenuPage() {
  if (!siteConfig.sections.menu) redirect("/");

  const { categories, source } = await getMenu();

  return (
    <>
      <Header />
      <main>
        <Menu categories={categories} source={source} />
      </main>
      <Footer />
    </>
  );
}
