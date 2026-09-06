import { redirect } from "next/navigation";
import { siteConfig } from "@/config";

/**
 * Stabilná interná URL (/rezervacia), ktorá presmeruje na skutočnú
 * rezervačnú platformu nastavenú v src/config.ts (`reservationUrl`).
 * Klient tak môže mať tento odkaz vytlačený na materiáloch a platformu
 * kedykoľvek zmeniť len v configu.
 */
export default function RezervaciaRedirect() {
  redirect(siteConfig.reservationUrl);
}
