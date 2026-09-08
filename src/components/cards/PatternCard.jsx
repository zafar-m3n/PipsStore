import { DrawnChart } from "@/components/common/DrawnChart.jsx";
import { Badge } from "@/components/common/Badge.jsx";

const TONE_BY_KIND = {
  bullish: "bull",
  bearish: "bear",
  reversal: "warn",
  neutral: "warn",
  continuation: "warn",
};

/* Shared by Candlestick Patterns and Chart Patterns on the Analysis page.
   The illustration is an animated SVG line drawing (no photography). */
export function PatternCard({ pattern }) {
  const art = pattern.art || {};
  return (
    <div className="flex h-full flex-col card-journal p-4 transition-shadow duration-300 hover:shadow-pips-hover">
      <div className="overflow-hidden rounded-[0.6rem] border border-pips-line bg-pips-bg paper-grid">
        <div className="aspect-video">
          <DrawnChart
            viewBox={art.viewBox}
            elements={art.elements || []}
            ariaLabel={art.ariaLabel || `${pattern.name} pattern`}
          />
        </div>
      </div>
      <div className="flex flex-1 flex-col p-2">
        <div className="mt-3 flex items-center justify-between gap-3">
          <h3 className="text-base font-semibold text-pips-ink">
            {pattern.name}
          </h3>
          <Badge tone={TONE_BY_KIND[pattern.signalKind] || "neutral"}>
            {pattern.signal}
          </Badge>
        </div>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-pips-muted">
          {pattern.description}
        </p>
      </div>
    </div>
  );
}

export default PatternCard;
