import { Icon } from "@iconify/react";
import UiCard from "@/components/ui/UiCard.jsx";
import LevelMeter from "@/components/common/LevelMeter.jsx";
import { LEARNING_PATHS } from "@/data/learningPaths.js";

/* A learning path at a glance: what it covers, its level and topic count.
   `label` replaces the title bar text; `linked` styles the count as the
   card's link cue when the whole card is wrapped in a link. */
function PathCard({ id, label = "Learning path", linked = false, className = "", bare = false }) {
  const p = LEARNING_PATHS.find((x) => x.id === id);
  if (!p) return null;

  return (
    <UiCard icon="ph:path" title={label} className={className} bare={bare}>
      <p className="flex items-center gap-2 text-lead font-semibold text-ink">
        <Icon icon={p.icon} aria-hidden="true" className="shrink-0 text-brand" />
        {p.title}
      </p>
      <p className="mt-2 text-small text-ink-soft">{p.description}</p>
      <div className="mt-4 flex items-center justify-between gap-3 border-t border-line pt-4">
        <LevelMeter level={p.level} />
        {linked ? (
          <span className="inline-flex items-center gap-1.5 text-small font-semibold text-brand group-hover:text-brand-hover">
            {p.lessons} topics
            <Icon
              icon="ph:arrow-right"
              aria-hidden="true"
              className="transition-transform duration-200 ease-out group-hover:translate-x-0.5"
            />
          </span>
        ) : (
          <span className="font-mono text-small text-ink">{p.lessons} topics</span>
        )}
      </div>
    </UiCard>
  );
}

export default PathCard;
