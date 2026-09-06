import Image from "next/image";
import { CameraIcon } from "@/components/icons";

interface PlaceholderImageProps {
  /**
   * Cesta k reálnej fotke v /public (napr. "/images/hero/hero.jpg").
   * Nechaj `null`/`undefined`, kým klient fotku nedodá — zobrazí sa elegantný
   * zástupný obrázok namiesto rozbitého <img>.
   */
  src?: string | null;
  alt: string;
  /**
   * Kam fotku nahradiť — NIKDY sa nevykresľuje ako viditeľný text na
   * stránke (len ako `title` atribút pre hover tooltip/screen reader).
   * Skutočný návod pre budúcu úpravu patrí do komentára pri volaní tejto
   * komponenty v zdrojovom kóde.
   */
  replaceHint: string;
  className?: string;
  sizes?: string;
  priority?: boolean;
}

/**
 * Obrázok so vstavaným zástupným stavom (placeholder).
 *
 * V demo verzii šablóny nemáme reálne fotky klienta, preto namiesto
 * rozbitých <img> ikon zobrazujeme jemnú zástupnú plochu s ikonou
 * fotoaparátu — žiadny viditeľný text s cestou k súboru (tá je len v
 * komentári v kóde na mieste použitia).
 */
export function PlaceholderImage({
  src,
  alt,
  replaceHint,
  className = "",
  sizes,
  priority,
}: PlaceholderImageProps) {
  if (src) {
    return (
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes ?? "100vw"}
        priority={priority}
        className={`object-cover ${className}`}
      />
    );
  }

  // Neutrálne sivé farby zámerne — placeholder je nenápadný a funguje na
  // svetlom aj tmavom pozadí.
  return (
    <div
      title={replaceHint}
      className={`flex h-full w-full items-center justify-center bg-gradient-to-br from-neutral-200 to-neutral-300/60 ${className}`}
    >
      <CameraIcon className="h-8 w-8 text-neutral-500/70" />
    </div>
  );
}
