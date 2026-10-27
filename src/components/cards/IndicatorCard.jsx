import { DrawnChart } from "@/components/common/DrawnChart.jsx";

export function IndicatorCard({ indicator }) {
  const art = indicator.art || {};
  return (
    <div className="panel flex h-full flex-col p-4">
      <div className="chamfer aspect-video overflow-hidden bg-ground">
        <DrawnChart
          viewBox={art.viewBox}
          elements={art.elements || []}
          ariaLabel={art.ariaLabel || `${indicator.name} illustration`}
        />
      </div>
      <div className="flex flex-1 flex-col p-2">
        <h3 className="mt-3 text-lead font-bold text-ink">{indicator.name}</h3>
        <p className="mt-2 text-body text-ink-soft">
          <span className="font-bold text-ink">How to use it: </span>
          {indicator.howToUse}
        </p>
      </div>
    </div>
  );
}

export default IndicatorCard;
