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
  {
    id: "gallery-1",
    src: null,
    alt: "Vstup do reštaurácie HOA ĐÀO",
    altEn: "Entrance to HOA ĐÀO restaurant",
  },
  {
    id: "gallery-2",
    src: "/images/gallery/10.png",
    alt: "Interiér reštaurácie so zelenou obkladovou stenou",
    altEn: "Restaurant interior with a green tiled wall",
  },
  {
    id: "gallery-3",
    src: null,
    alt: "Posedenie pri veľkých oknách a modrej stene",
    altEn: "Seating by the large windows and blue wall",
  },
  {
    id: "gallery-4",
    src: null,
    alt: "Priestranná jedáleň s dreveným stropom",
    altEn: "Spacious dining room with a wooden ceiling",
  },
  {
    id: "gallery-5",
    src: null,
    alt: "Stoly s dekorom kvetov broskyne na stene",
    altEn: "Tables with peach-blossom decor on the wall",
  },
  {
    id: "gallery-6",
    src: null,
    alt: "Rad stolov pozdĺž okien",
    altEn: "A row of tables along the windows",
  },
  {
    id: "gallery-7",
    src: null,
    alt: "Oddychové posedenie s výhľadom von",
    altEn: "Lounge seating with a view outside",
  },
  {
    id: "gallery-8",
    src: null,
    alt: "Džbán domácej limonády s limetkou",
    altEn: "Pitcher of homemade lemonade with lime",
  },
  {
    id: "gallery-9",
    src: null,
    alt: "Džbán ľadového čaju s citrusmi a mätou",
    altEn: "Pitcher of iced tea with citrus and mint",
  },
  {
    id: "gallery-10",
    src: "/images/gallery/11.png",
    alt: "Vchod do reštaurácie HOA ĐÀO s vývesným štítom",
    altEn: "Entrance to HOA ĐÀO restaurant with the storefront sign",
  },
  {
    id: "gallery-11",
    src: "/images/gallery/12.png",
    alt: "Interiér s výhľadom na vchod a parkovisko",
    altEn: "Interior with a view of the entrance and parking lot",
  },
];
