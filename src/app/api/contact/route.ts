import { NextResponse } from "next/server";
import { Resend } from "resend";
import { siteConfig } from "@/config";

export const runtime = "nodejs";

interface ContactPayload {
  name?: string;
  email?: string;
  message?: string;
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Prijme dáta z kontaktného formulára a odošle ich cez Resend (resend.com).
 *
 * Ak nie je nastavená premenná prostredia RESEND_API_KEY, vrátime 503 —
 * klient (src/components/ContactForm.tsx) na to reaguje otvorením
 * "mailto:" odkazu, takže formulár funguje aj bez tejto služby.
 */
export async function POST(request: Request) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { error: "E-mailová služba nie je nakonfigurovaná (chýba RESEND_API_KEY)." },
      { status: 503 },
    );
  }

  let payload: ContactPayload;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ error: "Neplatné dáta." }, { status: 400 });
  }

  const name = payload.name?.trim() ?? "";
  const email = payload.email?.trim() ?? "";
  const message = payload.message?.trim() ?? "";

  if (!name || !EMAIL_RE.test(email) || !message) {
    return NextResponse.json({ error: "Chýbajú alebo sú neplatné povinné polia." }, { status: 400 });
  }

  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from: siteConfig.contactForm.fromEmail,
      to: siteConfig.contactForm.recipientEmail,
      replyTo: email,
      subject: `Správa z webu — ${name}`,
      text: `${message}\n\n— ${name} (${email})`,
    });

    if (error) {
      console.error("[api/contact] Resend vrátil chybu:", error);
      return NextResponse.json({ error: "Odoslanie zlyhalo." }, { status: 502 });
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("[api/contact] Neočakávaná chyba pri odosielaní:", error);
    return NextResponse.json({ error: "Odoslanie zlyhalo." }, { status: 500 });
  }
}
