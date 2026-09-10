interface SectionHeadingProps {
  heading: string;
  description?: string;
  className?: string;
}

/**
 * Nadpis sekcie — vycentrovaný nadpis a voliteľný popis pod ním.
 * Konzistentný naprieč všetkými sekciami, aby mala stránka jasnú štruktúru.
 */
export function SectionHeading({ heading, description, className = "" }: SectionHeadingProps) {
  return (
    <div className={`mx-auto flex flex-col items-center gap-4 text-center ${className}`}>
      <h2 className="font-fraunces text-3xl font-medium leading-tight tracking-tight text-split-ink sm:text-[2.75rem]">
        {heading}
      </h2>
      {description && (
        <p className="max-w-xl text-base leading-relaxed text-split-ink/70">{description}</p>
      )}
    </div>
  );
}
