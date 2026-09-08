import { Icon } from "@iconify/react";
import { Badge } from "@/components/common/Badge.jsx";

const ICON_BY_BIAS = {
  Bullish: "ph:trend-up",
  Bearish: "ph:trend-down",
  Neutral: "ph:arrows-left-right",
};

export function CurrencyCard({ item }) {
  return (
    <div className="flex h-full flex-col card-journal p-6 transition-shadow duration-300 hover:shadow-pips-hover">
      <div className="flex items-center justify-between gap-2">
        <span className="font-mono text-lg font-bold text-pips-ink">
          {item.pair}
        </span>
        <Badge>
          <Icon icon={ICON_BY_BIAS[item.bias] || "ph:minus"} className="text-xs" />
          {item.bias}
        </Badge>
      </div>
      <p className="mt-3 text-xs font-semibold uppercase tracking-wide text-pips-muted">
        Key level
      </p>
      <p className="font-mono text-sm font-medium text-pips-ink-soft">
        {item.keyLevel}
      </p>
      <p className="mt-3 flex-1 text-sm leading-relaxed text-pips-muted">
        {item.note}
      </p>
    </div>
  );
}

export default CurrencyCard;
