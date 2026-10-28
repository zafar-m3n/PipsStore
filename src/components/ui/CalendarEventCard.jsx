import UiCard from "@/components/ui/UiCard.jsx";
import { CALENDAR_EXAMPLE } from "@/data/uiCards.js";

const IMPACT = ["Low", "Medium", "High"];

/* How to read one economic-calendar row: what it is, how much it matters, and
   what to compare. No figures are invented. */
function CalendarEventCard({ className = "", bare = false }) {
  const { event, country, impact, watch } = CALENDAR_EXAMPLE;

  return (
    <UiCard icon="ph:calendar-check" title="Calendar event" tag="Example" className={className} bare={bare}>
      <p className="text-body font-semibold text-ink">{event}</p>
      <div className="mt-2 flex items-center gap-3 text-small">
        <span className="font-mono text-ink-soft">{country}</span>
        <span className="flex items-center gap-1" aria-label={`${IMPACT[impact - 1]} impact`}>
          {[1, 2, 3].map((n) => (
            <span key={n} aria-hidden="true" className={["h-3 w-1.5 rounded-full", n <= impact ? "bg-warning" : "bg-surface-3"].join(" ")} />
          ))}
          <span aria-hidden="true" className="ml-1 text-ink-muted">
            {IMPACT[impact - 1]} impact
          </span>
        </span>
      </div>
      <p className="mt-4 border-t border-line pt-4 text-small text-ink-soft">{watch}</p>
    </UiCard>
  );
}

export default CalendarEventCard;
