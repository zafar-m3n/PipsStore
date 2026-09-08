/* Bold title + subtitle. No eyebrow, pill, or badge — by brand rule. */
export function SectionHeading({
  title,
  subtitle,
  align = "left",
  className = "",
}) {
  const centered = align === "center";
  return (
    <div
      className={[
        centered ? "mx-auto max-w-2xl text-center" : "max-w-2xl",
        className,
      ].join(" ")}
    >
      <h2 className="text-3xl font-bold text-pips-ink sm:text-4xl">{title}</h2>
      {subtitle && (
        <p className="mt-3 text-base leading-relaxed text-pips-muted sm:text-lg">
          {subtitle}
        </p>
      )}
    </div>
  );
}

export default SectionHeading;
