"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useSyncExternalStore,
  type ReactNode,
} from "react";
import sk from "./sk.json";
import en from "./en.json";

export type Language = "sk" | "en";
export type Dictionary = typeof sk;

const dictionaries: Record<Language, Dictionary> = { sk, en };
const STORAGE_KEY = "gastro-template-lang";
const DEFAULT_LANGUAGE: Language = "sk";

/**
 * Malý externý "store" pre aktuálny jazyk, synchronizovaný s localStorage.
 *
 * Používame useSyncExternalStore namiesto useState+useEffect, aby sa čítanie
 * localStorage vykonalo hydration-safe spôsobom (server vždy vidí
 * DEFAULT_LANGUAGE, klient sa "dorovná" na uloženú hodnotu bez toho, aby to
 * vyzeralo ako manuálne volanie setState v efekte).
 */
let currentLang: Language | null = null;
const listeners = new Set<() => void>();

function readStoredLang(): Language {
  const stored = window.localStorage.getItem(STORAGE_KEY);
  return stored === "sk" || stored === "en" ? stored : DEFAULT_LANGUAGE;
}

function getSnapshot(): Language {
  if (currentLang === null) {
    currentLang = readStoredLang();
  }
  return currentLang;
}

function getServerSnapshot(): Language {
  return DEFAULT_LANGUAGE;
}

function subscribe(listener: () => void): () => void {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

function setStoredLang(next: Language) {
  currentLang = next;
  window.localStorage.setItem(STORAGE_KEY, next);
  listeners.forEach((listener) => listener());
}

interface LanguageContextValue {
  lang: Language;
  setLang: (lang: Language) => void;
  toggleLang: () => void;
  /** Aktuálny slovník prekladov (napr. pre priamy prístup k poliam ako otváracie hodiny). */
  dict: Dictionary;
  /** Vráti preklad podľa bodkovej cesty, napr. t("nav.about"). */
  t: (path: string) => string;
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

function resolvePath(dict: Dictionary, path: string): unknown {
  return path.split(".").reduce<unknown>((acc, key) => {
    if (acc && typeof acc === "object" && key in (acc as Record<string, unknown>)) {
      return (acc as Record<string, unknown>)[key];
    }
    return undefined;
  }, dict);
}

/**
 * Poskytuje preklady celej aplikácii. Jazyk sa ukladá do localStorage, takže
 * si ho prehliadač pri ďalšej návšteve zapamätá. Nový obsah stačí doplniť do
 * src/i18n/sk.json a src/i18n/en.json — obe udržiavajte v rovnakej štruktúre.
 */
export function LanguageProvider({ children }: { children: ReactNode }) {
  const lang = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  useEffect(() => {
    document.documentElement.lang = dictionaries[lang].meta.htmlLang;
  }, [lang]);

  const value = useMemo<LanguageContextValue>(() => {
    const dict = dictionaries[lang];
    return {
      lang,
      setLang: setStoredLang,
      toggleLang: () => setStoredLang(lang === "sk" ? "en" : "sk"),
      dict,
      t: (path: string) => {
        const result = resolvePath(dict, path);
        return typeof result === "string" ? result : path;
      },
    };
  }, [lang]);

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) {
    throw new Error("useLanguage musí byť použitý vnútri <LanguageProvider>");
  }
  return ctx;
}
