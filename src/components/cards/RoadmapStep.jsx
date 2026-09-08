import { IconBadge } from "@/components/common/IconBadge.jsx";

export function RoadmapStep({ step }) {
  return (
    <div className="group relative flex h-full flex-col card-journal p-6 transition-shadow duration-300 hover:shadow-pips-hover">
      <div className="flex items-center gap-3">
        <IconBadge icon={step.icon} size="sm" />
        <span className="font-mono text-2xl font-bold text-pips-accent-soft">
          {String(step.step).padStart(2, "0")}
        </span>
      </div>
      <h3 className="mt-4 text-base font-semibold text-pips-ink">{step.title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-pips-muted">
        {step.description}
      </p>
    </div>
  );
}

export default RoadmapStep;
