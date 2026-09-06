export interface Review {
  id: string;
  author: string;
  quote: string;
  quoteEn?: string;
  /** Hodnotenie 1–5, voliteľné. */
  rating?: number;
}

/**
 * Ukážkové recenzie pre demo verziu šablóny.
 *
 * Nahraď reálnymi recenziami klienta (napr. skopírovanými z Google
 * profilu). Odkaz "Zobraziť všetky recenzie" pod týmito kartami vedie na
 * /recenzie, ktoré presmerúva na `siteConfig.reviewsUrl` — pozri src/config.ts.
 */
export const reviews: Review[] = [
  {
    id: "review-1",
    author: "Meno Priezvisko",
    quote: "[Ukážková recenzia — krátky citát o skvelom jedle a obsluhe.]",
    quoteEn: "[Sample review — a short quote about great food and service.]",
    rating: 5,
  },
  {
    id: "review-2",
    author: "Meno Priezvisko",
    quote: "[Ukážková recenzia — čo hosťovi najviac utkvelo v pamäti.]",
    quoteEn: "[Sample review — what stuck with the guest the most.]",
    rating: 5,
  },
  {
    id: "review-3",
    author: "Meno Priezvisko",
    quote: "[Ukážková recenzia — odporúčanie pre ďalších návštevníkov.]",
    quoteEn: "[Sample review — a recommendation for future visitors.]",
    rating: 5,
  },
];
