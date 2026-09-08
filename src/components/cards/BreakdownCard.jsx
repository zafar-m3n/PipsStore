import { Icon } from "@iconify/react";

/* Text-only worked-example card: scenario / analysis / key-lesson. */
export function BreakdownCard({ item }) {
  const rows = [
    { label: "Scenario", icon: "ph:eye", text: item.scenario },
    { label: "Analysis", icon: "ph:magnifying-glass", text: item.analysis },
    { label: "Key lesson", icon: "ph:key", text: item.keyLesson },
  ];
  return (
    <div className="flex h-full flex-col card-journal p-6 transition-shadow duration-300 hover:shadow-pips-hover">
      <h3 className="text-base font-semibold text-pips-ink">{item.title}</h3>
      <div className="mt-4 space-y-4">
        {rows.map((r) => (
          <div key={r.label}>
            <p className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-pips-accent">
              <Icon icon={r.icon} className="text-sm" />
              {r.label}
            </p>
            <p className="mt-1 text-sm leading-relaxed text-pips-muted">
              {r.text}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default BreakdownCard;
