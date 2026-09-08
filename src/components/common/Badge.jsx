/* Functional badge — styled like a small inked rubber stamp (slightly
   rotated, rough uneven edge via the `stamp` utility). Category colour
   logic is unchanged: green = bullish/success, red = bearish/danger,
   amber = warning/medium, neutral warm-gray otherwise. */

const TONE_BY_KEYWORD = [
  { match: /(bull|success|positive|up|beginner|holds?|complete)/i, tone: "bull" },
  { match: /(bear|danger|negative|down|reject|high|expert|failed)/i, tone: "bear" },
  { match: /(warn|medium|neutral|caution|intermediate|indecis|continuation|reversal)/i, tone: "warn" },
];

const TONE_CLASSES = {
  bull: "text-pips-bull bg-pips-bull-soft/60",
  bear: "text-pips-bear bg-pips-bear-soft/60",
  warn: "text-pips-warn bg-pips-warn-soft/60",
  neutral: "text-pips-ink-soft bg-pips-surface-alt",
};

export function Badge({ children, tone, className = "" }) {
  let resolved = tone;
  if (!resolved && typeof children === "string") {
    resolved =
      TONE_BY_KEYWORD.find((r) => r.match.test(children))?.tone ?? "neutral";
  }
  const cls = TONE_CLASSES[resolved] || TONE_CLASSES.neutral;
  return (
    <span className={["stamp", cls, className].join(" ")}>{children}</span>
  );
}

export default Badge;
