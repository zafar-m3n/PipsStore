import { Icon } from "@iconify/react";

/* Text-led item: title with an inline icon, then its description. */
export function IconTile({ icon, title, description, children, className = "" }) {
  return (
    <div className={["h-full", className].join(" ")}>
      {title && (
        <h3 className="flex items-center gap-3 text-lead font-bold text-ink">
          {icon && <Icon icon={icon} aria-hidden="true" className="shrink-0 text-brand" />}
          {title}
        </h3>
      )}
      {description && <p className="mt-2 max-w-[60ch] text-body text-ink-soft">{description}</p>}
      {children}
    </div>
  );
}

export default IconTile;
