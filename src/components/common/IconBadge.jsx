import { Icon } from "@iconify/react";

/* Warm rounded-square icon holder. Static — no hover animation. */
const SIZES = {
  sm: "h-10 w-10 text-lg",
  md: "h-12 w-12 text-xl",
  lg: "h-14 w-14 text-2xl",
};

export function IconBadge({ icon, size = "md", className = "" }) {
  return (
    <span
      className={[
        "inline-flex shrink-0 items-center justify-center rounded-xl bg-pips-accent-tint text-pips-accent ring-1 ring-pips-accent-soft",
        SIZES[size] || SIZES.md,
        className,
      ].join(" ")}
    >
      <Icon icon={icon} />
    </span>
  );
}

export default IconBadge;
