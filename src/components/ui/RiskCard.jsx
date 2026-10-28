import UiCard from "@/components/ui/UiCard.jsx";
import { RISK_EXAMPLE, riskMath } from "@/data/uiCards.js";

const money = (n) => n.toLocaleString("en-US", { style: "currency", currency: "USD" });

/* The 1% rule worked through, ending on the honest part: what you lose if the
   stop is hit. */
function RiskCard({ className = "", bare = false }) {
  const { account, riskPct, stopPips } = RISK_EXAMPLE;
  const { risk, lots, kept } = riskMath(RISK_EXAMPLE);

  return (
    <UiCard icon="ph:shield-check" title="Risk per trade" tag="Example" className={className} bare={bare}>
      <dl className="grid grid-cols-2 gap-x-4 gap-y-2 text-small">
        <dt className="text-ink-muted">Account</dt>
        <dd className="text-right font-mono text-ink">{money(account)}</dd>
        <dt className="text-ink-muted">Risk</dt>
        <dd className="text-right font-mono text-ink">
          {riskPct}% <span className="text-ink-muted">= {money(risk)}</span>
        </dd>
        <dt className="text-ink-muted">Stop-loss</dt>
        <dd className="text-right font-mono text-ink">{stopPips} pips</dd>
      </dl>
      <div className="mt-4 flex items-baseline justify-between gap-3 border-t border-line pt-4">
        <span className="text-small text-ink-soft">Position size</span>
        <span className="text-figure text-ink">{lots.toFixed(2)} lots</span>
      </div>
      <p className="mt-3 text-small text-ink-soft">
        If the stop is hit you lose <span className="font-mono text-bear">{money(risk)}</span> and keep {kept}% of the
        account.
      </p>
    </UiCard>
  );
}

export default RiskCard;
