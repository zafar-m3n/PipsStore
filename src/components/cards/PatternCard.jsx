import { DrawnChart } from "@/components/common/DrawnChart.jsx";
import { Badge } from "@/components/common/Badge.jsx";

const TONE_BY_KIND = {
  bullish: "bull",
  bearish: "bear",
};

/* Shared by Candlestick Patterns and Chart Patterns on the Analysis page. */
export function PatternCard({ pattern }) {
  const art = pattern.art || {};
  return (
    <div className="panel flex h-full flex-col p-4">
      <div className="chamfer aspect-video overflow-hidden bg-ground">
        <DrawnChart
          viewBox={art.viewBox}
          elements={art.elements || []}
          ariaLabel={art.ariaLabel || `${pattern.name} pattern`}
        />
      </div>
      <div className="flex flex-1 flex-col p-2">
        <div className="mt-3 flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
          <h3 className="text-lead font-bold text-ink">{pattern.name}</h3>
          <Badge tone={TONE_BY_KIND[pattern.signalKind] || "neutral"}>{pattern.signal}</Badge>
        </div>
        <p className="mt-2 flex-1 text-body text-ink-soft">{pattern.description}</p>
      </div>
    </div>
  );
}

export default PatternCard;
