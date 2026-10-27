/* Skill level shown as filled steps plus its name. Deliberately colourless:
   levels are not market signals. */
const STEPS = { Beginner: 1, Intermediate: 2, Advanced: 3 };

export function LevelMeter({ level, className = "" }) {
  const filled = STEPS[level] ?? 1;
  return (
    <span className={["inline-flex items-center gap-2 text-small font-medium text-ink-soft", className].join(" ")}>
      <span aria-hidden="true" className="inline-flex items-end gap-0.5">
        {[1, 2, 3].map((n) => (
          <span
            key={n}
            className={["w-1.5", n <= filled ? "bg-ink-soft" : "bg-surface-3"].join(" ")}
            style={{ height: `${6 + n * 3}px` }}
          />
        ))}
      </span>
      {level}
    </span>
  );
}

export default LevelMeter;
