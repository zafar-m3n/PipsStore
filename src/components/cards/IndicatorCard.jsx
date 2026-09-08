import { Icon } from "@iconify/react";
import { DrawnChart } from "@/components/common/DrawnChart.jsx";

export function IndicatorCard({ indicator }) {
  const art = indicator.art || {};
  return (
    <div className="flex h-full flex-col card-journal p-4 transition-shadow duration-300 hover:shadow-pips-hover">
      <div className="overflow-hidden rounded-[0.6rem] border border-pips-line bg-pips-bg paper-grid">
        <div className="aspect-video">
          <DrawnChart
            viewBox={art.viewBox}
            elements={art.elements || []}
            ariaLabel={art.ariaLabel || `${indicator.name} illustration`}
          />
        </div>
      </div>
      <div className="flex flex-1 flex-col p-2">
        <h3 className="mt-3 text-base font-semibold text-pips-ink">
          {indicator.name}
        </h3>
        <p className="mt-2 flex items-start gap-2 text-sm leading-relaxed text-pips-muted">
          <Icon icon="ph:info" className="mt-0.5 shrink-0 text-pips-accent" />
          <span>
            <span className="font-semibold text-pips-ink-soft">
              How to use it:{" "}
            </span>
            {indicator.howToUse}
          </span>
        </p>
      </div>
    </div>
  );
}

export default IndicatorCard;
