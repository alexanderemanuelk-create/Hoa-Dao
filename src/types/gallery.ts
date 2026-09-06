export interface GalleryImage {
  id: string;
  /** Cesta k fotke v /public, napr. "/images/gallery/01.jpg". `null` = zástupný obrázok. */
  src: string | null;
  alt: string;
  altEn?: string;
}
