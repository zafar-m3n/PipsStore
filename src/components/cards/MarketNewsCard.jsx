import { Callout } from "@/components/common/Callout.jsx";

function formatDate(iso) {
  try {
    return new Date(iso).toLocaleDateString("en-GB", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  } catch {
    return iso;
  }
}

export function MarketNewsCard({ item, compact = false }) {
  return (
    <article className="flex h-full flex-col card-journal p-6 transition-shadow duration-300 hover:shadow-pips-hover">
      <div className="flex items-center justify-between gap-3 text-xs">
        <span className="rounded-full bg-pips-accent-tint px-2.5 py-1 font-semibold text-pips-accent">
          {item.category}
        </span>
        <time className="font-mono text-pips-muted">{formatDate(item.date)}</time>
      </div>

      <h3 className="mt-3 text-base font-semibold text-pips-ink">
        {item.title}
      </h3>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-pips-muted">
        {item.summary}
      </p>

      {!compact && <Callout className="mt-4">{item.beginnerNote}</Callout>}
    </article>
  );
}

export default MarketNewsCard;
