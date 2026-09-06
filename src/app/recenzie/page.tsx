import { redirect } from "next/navigation";
import { siteConfig } from "@/config";

/**
 * Stabilná interná URL (/recenzie), ktorá presmeruje na externú stránku s
 * recenziami (napr. Google Business profil) nastavenú v src/config.ts
 * (`reviewsUrl`).
 */
export default function RecenzieRedirect() {
  redirect(siteConfig.reviewsUrl);
}
