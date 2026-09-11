/**
 * FOTKY KU KATEGÓRIÁM STÁLEHO MENU (à la carte) na stránke /menu.
 * ============================================================================
 * Kľúč = presný názov kategórie zo src/data/fallback-menu.ts (`category`).
 * Hodnota = cesta k fotke v /public/images/menu/ (napr. "/images/menu/predjedla.jpg",
 * ideálne na šírku ~1200 px).
 *
 * Kategórie bez záznamu tu sa zobrazia bez fotky (na celú šírku). Kategórie
 * so záznamom majú fotku striedavo vľavo/vpravo.
 */
export const alacarteCategoryPhotos: Record<string, string> = {
  // "Predjedlá": "/images/menu/predjedla.jpg",
  // "Hlavné jedlá": "/images/menu/hlavne-jedla.jpg",
  // "Sushi rolky (8 ks)": "/images/menu/sushi.jpg",
};
