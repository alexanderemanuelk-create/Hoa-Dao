import type { GalleryImage } from "@/types/gallery";

/**
 * Fotky pre sekciu Galéria. Kým je `src` nastavené na `null`, zobrazí sa
 * elegantný zástupný obrázok (src/components/PlaceholderImage.tsx).
 *
 * Ako pridať vlastnú fotku:
 *  1. Nahraj súbor do /public/images/gallery/ (napr. "01.jpg")
 *  2. Nastav `src` na "/images/gallery/01.jpg"
 */
export const galleryImages: GalleryImage[] = [
  { id: "gallery-1", src: null, alt: "Fotka podniku 1", altEn: "Venue photo 1" },
  { id: "gallery-2", src: null, alt: "Fotka podniku 2", altEn: "Venue photo 2" },
  { id: "gallery-3", src: null, alt: "Fotka podniku 3", altEn: "Venue photo 3" },
  { id: "gallery-4", src: null, alt: "Fotka podniku 4", altEn: "Venue photo 4" },
  { id: "gallery-5", src: null, alt: "Fotka podniku 5", altEn: "Venue photo 5" },
  { id: "gallery-6", src: null, alt: "Fotka podniku 6", altEn: "Venue photo 6" },
];
