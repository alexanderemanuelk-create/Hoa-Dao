import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { Menu } from "@/components/Menu";
import { Gallery } from "@/components/Gallery";
import { Reviews } from "@/components/Reviews";
import { Footer } from "@/components/Footer";
import { getMenu } from "@/lib/menu";
import { siteConfig } from "@/config";

/**
 * Domovská stránka.
 *
 * Jednotlivé sekcie sa vykreslia (alebo úplne vynechajú) podľa
 * `siteConfig.sections` v src/config.ts — vypnutá sekcia sa nevykreslí vôbec,
 * vrátane svojho odkazu v navigácii (src/lib/sections.ts).
 *
 * Server komponent: menu sa načítava na serveri z Google Sheets (ISR, viď
 * src/lib/menu.ts) a posiela sa nižšie ako props.
 */
export default async function HomePage() {
  const { categories, source } = await getMenu();
  const { hero, about, menu, gallery, reviews } = siteConfig.sections;

  return (
    <>
      <Header />
      <main>
        {hero && <Hero />}
        {about && <About />}
        {menu && <Menu categories={categories} source={source} />}
        {gallery && <Gallery />}
        {reviews && <Reviews />}
      </main>
      <Footer />
    </>
  );
}
