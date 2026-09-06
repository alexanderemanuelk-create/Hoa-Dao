"use client";

import { useState, type FormEvent } from "react";
import { useLanguage } from "@/i18n/LanguageProvider";
import { siteConfig } from "@/config";
import { CheckIcon } from "@/components/icons";

type Status = "idle" | "sending" | "success" | "error";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function openMailtoFallback(name: string, email: string, message: string) {
  const subject = encodeURIComponent(`Správa z webu — ${name}`);
  const body = encodeURIComponent(`${message}\n\n— ${name} (${email})`);
  window.location.href = `mailto:${siteConfig.contactForm.recipientEmail}?subject=${subject}&body=${body}`;
}

const inputClass =
  "w-full rounded-lg border border-split-ink/15 bg-split-bg px-4 py-2.5 text-sm text-split-ink outline-none transition-colors focus:border-split-ink";
const labelClass =
  "mb-1.5 block text-xs font-medium uppercase tracking-widest text-split-ink/50";

export function ContactForm() {
  const { t } = useLanguage();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [usedFallback, setUsedFallback] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<{ name?: string; email?: string; message?: string }>({});

  const validate = () => {
    const errors: typeof fieldErrors = {};
    if (!name.trim()) errors.name = t("contact.formNameRequired");
    if (!EMAIL_RE.test(email.trim())) errors.email = t("contact.formEmailInvalid");
    if (!message.trim()) errors.message = t("contact.formMessageRequired");
    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setStatus("sending");
    setUsedFallback(false);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message }),
      });

      if (!res.ok) throw new Error("send_failed");

      setStatus("success");
      setName("");
      setEmail("");
      setMessage("");
    } catch {
      openMailtoFallback(name, email, message);
      setUsedFallback(true);
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <div
        className="mt-6 flex items-center gap-3 rounded-lg bg-split-bg px-4 py-3 text-sm text-split-ink"
        role="status"
      >
        <CheckIcon className="h-4 w-4 shrink-0 text-split-ink/60" />
        {t("contact.formSuccess")}
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="mt-6 flex flex-col gap-4">
      <div>
        <label htmlFor="split-name" className={labelClass}>
          {t("contact.formName")}
        </label>
        <input
          id="split-name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className={inputClass}
        />
        {fieldErrors.name && <p className="mt-1 text-xs text-split-ink/70">{fieldErrors.name}</p>}
      </div>

      <div>
        <label htmlFor="split-email" className={labelClass}>
          {t("contact.formEmail")}
        </label>
        <input
          id="split-email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={inputClass}
        />
        {fieldErrors.email && <p className="mt-1 text-xs text-split-ink/70">{fieldErrors.email}</p>}
      </div>

      <div>
        <label htmlFor="split-message" className={labelClass}>
          {t("contact.formMessage")}
        </label>
        <textarea
          id="split-message"
          rows={4}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className={`resize-none ${inputClass}`}
        />
        {fieldErrors.message && (
          <p className="mt-1 text-xs text-split-ink/70">{fieldErrors.message}</p>
        )}
      </div>

      <button
        type="submit"
        disabled={status === "sending"}
        className="mt-2 inline-flex items-center justify-center rounded-full bg-split-accent px-6 py-3 text-sm font-medium tracking-wide text-white transition-colors hover:bg-split-accent/90 disabled:opacity-60"
      >
        {status === "sending" ? t("contact.formSending") : t("contact.formSubmit")}
      </button>

      {status === "error" && (
        <p className="text-xs text-split-ink/60" role="alert">
          {usedFallback ? t("contact.formErrorFallback") : t("contact.formErrorGeneric")}
        </p>
      )}
    </form>
  );
}
