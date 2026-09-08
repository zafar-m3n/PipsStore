import { IconBadge } from "@/components/common/IconBadge.jsx";

/* Icon-in-rounded-square tile — the site's workhorse for simple
   conceptual / functional content (benefit grids, roadmap steps,
   teaches lists, who-it's-for, FAQ, contact tiles, etc.).
   Styled as a notebook index card. The icon itself is static. */
export function IconTile({ icon, title, description, children, className = "" }) {
  return (
    <div
      className={[
        "card-journal h-full p-6 transition-shadow duration-300 hover:shadow-pips-hover",
        className,
      ].join(" ")}
    >
      <IconBadge icon={icon} />
      {title && (
        <h3 className="mt-4 text-lg font-semibold text-pips-ink">{title}</h3>
      )}
      {description && (
        <p className="mt-2 text-sm leading-relaxed text-pips-muted">
          {description}
        </p>
      )}
      {children}
    </div>
  );
}

export default IconTile;
