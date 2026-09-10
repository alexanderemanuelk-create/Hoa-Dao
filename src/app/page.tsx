import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Gallery } from "@/components/Gallery";
import { Footer } from "@/components/Footer";
import { siteConfig } from "@/config";

/**
 * Domovská stránka.
 *
 * Jednotlivé sekcie sa vykreslia (alebo úplne vynechajú) podľa
 * `siteConfig.sections` v src/config.ts. Menu má vlastnú stránku (/menu, viď
 * src/app/menu/page.tsx) a na domovskej stránke sa nezobrazuje.
 */
export default function HomePage() {
  const { hero, gallery } = siteConfig.sections;

  return (
    <>
      <Header />
      <main>
        {hero && <Hero />}
        {gallery && <Gallery />}
      </main>
      <Footer />
    </>
  );
}
