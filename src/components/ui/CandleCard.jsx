import UiCard from "@/components/ui/UiCard.jsx";
import { GLOSSARY_TERMS } from "@/data/glossary.js";

const CANDLE = GLOSSARY_TERMS.find((t) => t.term === "Candlestick");

/* The four prices of one candle, drawn and labelled. A hollow (bull) body:
   price closed above where it opened. */
function CandleCard({ className = "", bare = false }) {
  const labels = [
    { y: 16, text: "High" },
    { y: 52, text: "Close" },
    { y: 128, text: "Open" },
    { y: 164, text: "Low" },
  ];

  return (
    <UiCard icon="ph:chart-bar" title="Anatomy of a candle" className={className} bare={bare}>
      <svg viewBox="0 0 200 180" className="h-auto w-full" role="img" aria-label="A candle with its high, close, open and low labelled">
        <line x1="60" y1="16" x2="60" y2="164" stroke="var(--color-bull)" strokeWidth="2" />
        <rect x="44" y="52" width="32" height="76" rx="3" fill="var(--color-ground)" stroke="var(--color-bull)" strokeWidth="2" />
        {labels.map((l) => (
          <g key={l.text}>
            <line x1="80" y1={l.y} x2="128" y2={l.y} stroke="var(--color-field)" strokeWidth="1" strokeDasharray="3 3" />
            <text x="136" y={l.y + 4} fill="var(--color-ink-soft)" fontSize="12" fontFamily="var(--font-mono)">
              {l.text}
            </text>
          </g>
        ))}
      </svg>
      {CANDLE && <p className="mt-3 text-small text-ink-soft">{CANDLE.definition}</p>}
    </UiCard>
  );
}

export default CandleCard;
