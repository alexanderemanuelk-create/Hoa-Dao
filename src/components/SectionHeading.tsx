interface SectionHeadingProps {
  /** Poradové číslo sekcie pre orientáciu, napr. "02". */
  index?: string;
  eyebrow?: string;
  heading: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
}

/**
 * Nadpis sekcie — číslo + štítok v jednom riadku, pod ním
 * výrazný nadpis a voliteľný popis. Konzistentné naprieč všetkými sekciami,
 * aby mala stránka jasnú štruktúru.
 */
export function SectionHeading({
  index,
  eyebrow,
  heading,
  description,
  align = "left",
  className = "",
}: SectionHeadingProps) {
  const alignment =
    align === "center" ? "items-center text-center mx-auto" : "items-start text-left";

  return (
    <div className={`flex flex-col gap-4 ${alignment} ${className}`}>
      {(index || eyebrow) && (
        <div className="flex items-center gap-3 text-xs font-medium uppercase tracking-[0.2em] text-split-ink/50">
          {index && <span className="text-split-accent">{index}</span>}
          {index && eyebrow && <span aria-hidden className="h-px w-6 bg-split-ink/25" />}
          {eyebrow && <span>{eyebrow}</span>}
        </div>
      )}
      <h2 className="font-fraunces text-3xl font-medium leading-tight tracking-tight text-split-ink sm:text-[2.75rem]">
        {heading}
      </h2>
      {description && (
        <p className="max-w-xl text-base leading-relaxed text-split-ink/70">{description}</p>
      )}
    </div>
  );
}
