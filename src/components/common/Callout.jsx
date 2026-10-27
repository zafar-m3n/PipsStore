import { Icon } from "@iconify/react";

/* Highlighted note: "Beginner note" callouts and the important notices
   on the legal pages. */
const TONES = {
  accent: "text-brand",
  warn: "text-warning",
  info: "text-info",
};

export function Callout({
  label = "Beginner note",
  icon = "ph:lightbulb",
  children,
  tone = "accent",
  className = "",
}) {
  return (
    <div className={["panel-raised px-5 py-4", className].join(" ")}>
      <p className={["flex items-center gap-2 text-small font-bold", TONES[tone] || TONES.accent].join(" ")}>
        <Icon icon={icon} aria-hidden="true" />
        {label}
      </p>
      <p className="mt-1 text-body text-ink-soft">{children}</p>
    </div>
  );
}

export default Callout;
