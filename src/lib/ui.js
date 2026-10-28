/* Shared Tailwind class strings for controls that appear on several pages. */

export const BUTTON_PRIMARY =
  "inline-flex min-h-12 items-center gap-2 rounded-full bg-brand px-6 text-body font-semibold whitespace-nowrap text-on-brand press hover:bg-brand-hover active:bg-brand-press";

export const FIELD = "rounded-md border border-field bg-surface-2";
export const FIELD_FOCUS = "focus:border-brand focus:ring-1 focus:ring-brand";
export const FIELD_FOCUS_WITHIN = "focus-within:border-brand focus-within:ring-1 focus-within:ring-brand";

const ACTIVE = "border-brand bg-brand text-on-brand";
const IDLE = "border-line bg-surface-2 text-ink hover:border-line-strong hover:bg-surface-3";

/* Toggle chips (aria-pressed). */
export function chipClass(active) {
  return ["min-h-11 rounded-full border px-4 text-small font-medium press", active ? ACTIVE : IDLE].join(" ");
}

/* Tablist tabs (role="tab"). */
export function tabClass(active) {
  return ["min-h-12 rounded-full border px-5 text-body font-semibold press", active ? ACTIVE : IDLE].join(" ");
}
