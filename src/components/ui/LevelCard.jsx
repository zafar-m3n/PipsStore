import UiCard from "@/components/ui/UiCard.jsx";
import { DASHBOARD } from "@/data/analysis.js";

const resistance = DASHBOARD.keyLevels.find((l) => l.value === "1.0975");
const support = DASHBOARD.keyLevels.find((l) => l.value === "1.0880");
const current = DASHBOARD.keyLevels.find((l) => l.kind === "current");

/* Price ranging sideways between two levels; nothing here trends up. */
const PATH = "M8 92 L30 70 L48 84 L70 38 L92 60 L112 44 L134 86 L156 66 L176 90 L196 52 L214 74 L232 58";

function LevelCard({ className = "", bare = false }) {
  return (
    <UiCard icon="ph:arrows-vertical" title="Support and resistance" tag={DASHBOARD.ticker.pair} className={className} bare={bare}>
      <svg
        viewBox="0 0 300 130"
        className="h-auto w-full"
        role="img"
        aria-label={`Price moving sideways between resistance at ${resistance.value} and support at ${support.value}`}
      >
        <line x1="0" y1="34" x2="240" y2="34" stroke="var(--color-bear)" strokeWidth="1.5" strokeDasharray="5 4" />
        <line x1="0" y1="98" x2="240" y2="98" stroke="var(--color-bull)" strokeWidth="1.5" strokeDasharray="5 4" />
        <path d={PATH} fill="none" stroke="var(--color-ink-soft)" strokeWidth="2" strokeLinejoin="round" />
        <circle cx="232" cy="58" r="3.5" fill="var(--color-ink)" />
        <text x="248" y="38" fill="var(--color-bear)" fontSize="11" fontFamily="var(--font-mono)">{resistance.value}</text>
        <text x="248" y="62" fill="var(--color-ink)" fontSize="11" fontFamily="var(--font-mono)">{current.value}</text>
        <text x="248" y="102" fill="var(--color-bull)" fontSize="11" fontFamily="var(--font-mono)">{support.value}</text>
      </svg>
      <p className="mt-3 text-small text-ink-soft">
        Resistance is where rallies have stalled; support is where falls have stopped. Mid-range, there's no edge yet.
      </p>
    </UiCard>
  );
}

export default LevelCard;
