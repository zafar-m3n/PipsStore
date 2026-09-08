import { Icon } from "@iconify/react";

export function GlossaryCard({ item }) {
  return (
    <div className="flex h-full flex-col card-journal p-6 transition-shadow duration-300 hover:shadow-pips-hover">
      <div className="flex items-start justify-between gap-3">
        <h3 className="text-lg font-semibold text-pips-ink">{item.term}</h3>
        <span className="shrink-0 rounded-full bg-pips-surface-alt px-2.5 py-1 text-[0.7rem] font-semibold text-pips-ink-soft">
          {item.category}
        </span>
      </div>

      <p className="mt-2 text-sm leading-relaxed text-pips-ink-soft">
        {item.definition}
      </p>

      <div className="mt-3 rounded-2xl bg-pips-surface-alt/70 px-3 py-2 text-xs leading-relaxed text-pips-muted">
        <span className="font-semibold text-pips-ink-soft">Example: </span>
        {item.example}
      </div>

      <p className="mt-3 text-xs leading-relaxed text-pips-muted">
        <span className="font-semibold text-pips-ink-soft">Why it matters: </span>
        {item.whyItMatters}
      </p>

      {item.related?.length > 0 && (
        <div className="mt-4 flex flex-wrap items-center gap-1.5 border-t border-pips-line pt-3">
          <Icon icon="ph:link-simple" className="text-xs text-pips-muted" />
          {item.related.map((r) => (
            <span
              key={r}
              className="rounded-full border border-pips-line px-2 py-0.5 text-[0.7rem] text-pips-muted"
            >
              {r}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}

export default GlossaryCard;
