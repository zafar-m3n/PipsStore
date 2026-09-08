import { Link } from "react-router-dom";
import { Icon } from "@iconify/react";
import { IconBadge } from "@/components/common/IconBadge.jsx";

export function ToolPreviewCard({ tool }) {
  return (
    <Link
      to={tool.to || `/tools#${tool.id}`}
      className="group flex h-full flex-col card-journal p-6 transition-shadow duration-300 hover:shadow-pips-hover"
    >
      <IconBadge icon={tool.icon} />
      <h3 className="mt-4 text-base font-semibold text-pips-ink">{tool.title}</h3>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-pips-muted">
        {tool.description}
      </p>
      <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-pips-accent">
        Open tool
        <Icon
          icon="ph:arrow-right-bold"
          className="text-xs transition-transform group-hover:translate-x-0.5"
        />
      </span>
    </Link>
  );
}

export default ToolPreviewCard;
