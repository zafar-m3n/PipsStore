/* Plain text label with a small round marker. Market tones (bull / bear)
   are for chart signals only; everything else is neutral. */
const TONE_CLASSES = {
  bull: "text-bull",
  bear: "text-bear",
  neutral: "text-ink-soft",
};

function Badge({ children, tone = "neutral", className = "" }) {
  return (
    <span
      className={[
        "inline-flex items-center gap-2 text-small font-medium",
        TONE_CLASSES[tone] || TONE_CLASSES.neutral,
        className,
      ].join(" ")}
    >
      <span aria-hidden="true" className="size-2 rounded-full bg-current" />
      {children}
    </span>
  );
}

export default Badge;
