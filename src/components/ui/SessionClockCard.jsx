import { useEffect, useState } from "react";
import UiCard from "@/components/ui/UiCard.jsx";
import { SESSIONS } from "@/data/uiCards.js";

const pad = (n) => String(n).padStart(2, "0");
const isOpen = (h, { open, close }) => (open < close ? h >= open && h < close : h >= open || h < close);

/* Spot FX runs from Sunday 22:00 to Friday 22:00 UTC. */
function isWeekend(now) {
  const day = now.getUTCDay();
  const h = now.getUTCHours();
  return day === 6 || (day === 0 && h < 22) || (day === 5 && h >= 22);
}

/* The four main sessions, with which ones are open right now (UTC). */
function SessionClockCard({ className = "", bare = false }) {
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 30_000);
    return () => clearInterval(t);
  }, []);

  const h = now.getUTCHours();
  const weekend = isWeekend(now);

  return (
    <UiCard
      icon="ph:clock"
      title="Trading sessions"
      tag={`${pad(h)}:${pad(now.getUTCMinutes())} UTC`}
      className={className}
      bare={bare}
    >
      <ul className="flex flex-col gap-2">
        {SESSIONS.map((s) => {
          const open = !weekend && isOpen(h, s);
          return (
            <li key={s.city} className="flex items-center justify-between gap-3 text-small">
              <span className="flex items-center gap-2 text-ink">
                <span aria-hidden="true" className={["size-2 rounded-full", open ? "bg-brand" : "bg-surface-3"].join(" ")} />
                {s.city}
              </span>
              <span className="font-mono text-ink-soft">
                {pad(s.open)}:00–{pad(s.close)}:00
                <span className="ml-2 text-ink-muted">{open ? "open" : "closed"}</span>
              </span>
            </li>
          );
        })}
      </ul>
      <p className="mt-4 border-t border-line pt-4 text-small text-ink-muted">
        {weekend ? "The forex market is closed for the weekend." : "Approximate hours; they shift by an hour with daylight saving."}
      </p>
    </UiCard>
  );
}

export default SessionClockCard;
