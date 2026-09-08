import { Link } from "react-router-dom";
import { Icon } from "@iconify/react";
import { Badge } from "@/components/common/Badge.jsx";
import { IconBadge } from "@/components/common/IconBadge.jsx";

export function CourseCard({ course }) {
  return (
    <div className="group flex h-full flex-col card-journal p-6 transition-shadow duration-300 hover:shadow-pips-hover">
      <div className="flex items-center justify-between">
        <IconBadge icon={course.icon} size="sm" />
        <Badge>{course.level}</Badge>
      </div>

      <h3 className="mt-4 text-base font-semibold text-pips-ink">
        {course.title}
      </h3>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-pips-muted">
        {course.description}
      </p>

      <div className="mt-4 flex items-center gap-4 font-mono text-xs font-medium text-pips-muted">
        <span className="inline-flex items-center gap-1">
          <Icon icon="ph:clock" className="text-sm" />
          {course.time}
        </span>
        <span className="inline-flex items-center gap-1">
          <Icon icon="ph:list-checks" className="text-sm" />
          {course.lessons} lessons
        </span>
      </div>

      {/* Progress bar placeholder */}
      <div className="mt-3">
        <div className="h-1.5 w-full overflow-hidden rounded-full bg-pips-surface-alt">
          <div className="h-full w-0 rounded-full bg-pips-accent" />
        </div>
        <p className="mt-1 text-[0.7rem] text-pips-muted">Not started</p>
      </div>

      <Link
        to="/academy"
        className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-pips-accent transition-colors hover:text-pips-accent-strong"
      >
        View Course
        <Icon
          icon="ph:arrow-right-bold"
          className="text-xs transition-transform group-hover:translate-x-0.5"
        />
      </Link>
    </div>
  );
}

export default CourseCard;
