import UiCard from "@/components/ui/UiCard.jsx";
import { PIP_EXAMPLE } from "@/data/uiCards.js";

const money = (n) => n.toLocaleString("en-US", { style: "currency", currency: "USD" });

/* What one pip is worth: the pip calculator's answer for the plainest case. */
function PipResultCard({ className = "", bare = false }) {
  const { pair, lots, units, pipSize, pipValue } = PIP_EXAMPLE;

  return (
    <UiCard icon="ph:ruler" title="Pip value" tag="Example" className={className} bare={bare}>
      <dl className="grid grid-cols-2 gap-x-4 gap-y-2 text-small">
        <dt className="text-ink-muted">Pair</dt>
        <dd className="text-right font-mono text-ink">{pair}</dd>
        <dt className="text-ink-muted">Trade size</dt>
        <dd className="text-right font-mono text-ink">
          {lots.toFixed(2)} lot <span className="text-ink-muted">({units})</span>
        </dd>
        <dt className="text-ink-muted">1 pip</dt>
        <dd className="text-right font-mono text-ink">{pipSize}</dd>
      </dl>
      <div className="mt-4 flex items-baseline justify-between gap-3 border-t border-line pt-4">
        <span className="text-small text-ink-soft">Each pip is worth</span>
        <span className="text-figure text-ink">{money(pipValue)}</span>
      </div>
    </UiCard>
  );
}

export default PipResultCard;
