import { Link } from "react-router-dom";
import { Icon } from "@iconify/react";
import IconBadge from "@/components/common/IconBadge.jsx";

/* A full-width link card: brand icon, title, one-line description, arrow. */
function LinkRow({ to, icon, title, description }) {
  return (
    <Link
      to={to}
      className="group flex min-h-14 items-center gap-4 rounded-lg border border-line bg-surface-1 px-5 py-3 press-soft hover:border-line-strong hover:bg-surface-2"
    >
      <IconBadge icon={icon} size="sm" />
      <span className="flex-1">
        <span className="block text-body font-bold text-ink">{title}</span>
        <span className="block text-small text-ink-soft">{description}</span>
      </span>
      <Icon
        icon="ph:arrow-right-bold"
        aria-hidden="true"
        className="shrink-0 text-ink-muted transition-transform group-hover:translate-x-0.5"
      />
    </Link>
  );
}

export default LinkRow;
