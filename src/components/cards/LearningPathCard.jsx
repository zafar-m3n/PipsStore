import { Link } from "react-router-dom";
import { Icon } from "@iconify/react";
import { Badge } from "@/components/common/Badge.jsx";
import { IconBadge } from "@/components/common/IconBadge.jsx";

export function LearningPathCard({ path }) {
  return (
    <div className="group flex h-full flex-col card-journal p-6 transition-shadow duration-300 hover:shadow-pips-hover">
      <div className="flex items-center justify-between">
        <IconBadge icon={path.icon} />
        <Badge>{path.level}</Badge>
      </div>
      <h3 className="mt-4 text-lg font-semibold text-pips-ink">{path.title}</h3>
      <p className="mt-1 font-mono text-xs font-medium text-pips-muted">
        {path.lessons} lessons
      </p>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-pips-muted">
        {path.description}
      </p>
      <Link
        to="/academy"
        className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-pips-accent transition-colors hover:text-pips-accent-strong"
      >
        Start Path
        <Icon
          icon="ph:arrow-right-bold"
          className="text-xs transition-transform group-hover:translate-x-0.5"
        />
      </Link>
    </div>
  );
}

export default LearningPathCard;
