import type { GalleryImage } from "@/types/gallery";

/**
 * Fotky pre sekciu Galéria. Kým je `src` nastavené na `null`, zobrazí sa
 * elegantný zástupný obrázok (src/components/PlaceholderImage.tsx).
 *
 * Ako pridať vlastnú fotku:
 *  1. Nahraj súbor do /public/images/gallery/ (napr. "10.jpg")
 *  2. Pridaj položku nižšie so `src` "/images/gallery/10.jpg"
 */
export const galleryImages: GalleryImage[] = [
  {
    id: "gallery-1",
    src: "/images/gallery/01.jpg",
    alt: "Vstup do reštaurácie HOA ĐÀO",
    altEn: "Entrance to HOA ĐÀO restaurant",
  },
  {
    id: "gallery-2",
    src: "/images/gallery/02.jpg",
    alt: "Interiér reštaurácie so zelenou obkladovou stenou",
    altEn: "Restaurant interior with a green tiled wall",
  },
  {
    id: "gallery-3",
    src: "/images/gallery/03.jpg",
    alt: "Posedenie pri veľkých oknách a modrej stene",
    altEn: "Seating by the large windows and blue wall",
  },
  {
    id: "gallery-4",
    src: "/images/gallery/04.jpg",
    alt: "Priestranná jedáleň s dreveným stropom",
    altEn: "Spacious dining room with a wooden ceiling",
  },
  {
    id: "gallery-5",
    src: "/images/gallery/05.jpg",
    alt: "Stoly s dekorom kvetov broskyne na stene",
    altEn: "Tables with peach-blossom decor on the wall",
  },
  {
    id: "gallery-6",
    src: "/images/gallery/06.jpg",
    alt: "Rad stolov pozdĺž okien",
    altEn: "A row of tables along the windows",
  },
  {
    id: "gallery-7",
    src: "/images/gallery/07.jpg",
    alt: "Oddychové posedenie s výhľadom von",
    altEn: "Lounge seating with a view outside",
  },
  {
    id: "gallery-8",
    src: "/images/gallery/08.jpg",
    alt: "Džbán domácej limonády s limetkou",
    altEn: "Pitcher of homemade lemonade with lime",
  },
  {
    id: "gallery-9",
    src: "/images/gallery/09.jpg",
    alt: "Džbán ľadového čaju s citrusmi a mätou",
    altEn: "Pitcher of iced tea with citrus and mint",
  },
];
