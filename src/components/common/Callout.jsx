import { Icon } from "@iconify/react";

/* Small highlighted note box. Used for "Beginner Note" callouts and
   the highlighted liability/privacy callouts on the legal pages. */
export function Callout({
  label = "Beginner Note",
  icon = "ph:lightbulb",
  children,
  tone = "accent",
  className = "",
}) {
  const tones = {
    accent: "border-pips-accent-soft bg-pips-accent-tint text-pips-ink-soft",
    warn: "border-pips-warn/30 bg-pips-warn-soft/70 text-pips-ink-soft",
    dark: "border-white/15 bg-white/5 text-pips-bg/80",
  };
  return (
    <div
      className={[
        "rounded-2xl border px-4 py-3",
        tones[tone] || tones.accent,
        className,
      ].join(" ")}
    >
      <p className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide">
        <Icon icon={icon} className="text-sm" />
        {label}
      </p>
      <p className="mt-1 text-sm leading-relaxed">{children}</p>
    </div>
  );
}

export default Callout;
