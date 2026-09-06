"use client";

import { useCallback, useEffect, useState } from "react";

/**
 * Stavová logika pre lightbox nad galériou (zdieľaná oboma dizajnovými
 * variantmi — každý si nad ňou stavia vlastný vizuál vo svojom Gallery
 * komponente pod src/components/).
 * Podporuje klávesové ovládanie: Escape zavrie, šípky prepínajú fotky.
 */
export function useLightbox(count: number) {
  const [index, setIndex] = useState<number | null>(null);

  const open = useCallback((i: number) => setIndex(i), []);
  const close = useCallback(() => setIndex(null), []);
  const next = useCallback(() => setIndex((i) => (i === null ? null : (i + 1) % count)), [count]);
  const prev = useCallback(
    () => setIndex((i) => (i === null ? null : (i - 1 + count) % count)),
    [count],
  );

  useEffect(() => {
    if (index === null) return;

    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") close();
      else if (e.key === "ArrowRight") next();
      else if (e.key === "ArrowLeft") prev();
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [index, close, next, prev]);

  return { index, isOpen: index !== null, open, close, next, prev };
}
