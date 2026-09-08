import { useState } from "react";
import { Icon } from "@iconify/react";

/* Simple one-open-at-a-time accordion for the About page FAQ. */
export function Accordion({ items = [] }) {
  const [open, setOpen] = useState(0);

  return (
    <div className="card-journal divide-y divide-pips-line overflow-hidden">
      {items.map((item, i) => {
        const isOpen = open === i;
        return (
          <div key={item.q}>
            <button
              type="button"
              onClick={() => setOpen(isOpen ? -1 : i)}
              aria-expanded={isOpen}
              className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left transition-colors hover:bg-pips-surface-alt"
            >
              <span className="flex items-center gap-3">
                <Icon
                  icon="ph:question"
                  className="shrink-0 text-lg text-pips-accent"
                />
                <span className="font-semibold text-pips-ink">{item.q}</span>
              </span>
              <Icon
                icon="ph:caret-down-bold"
                className={[
                  "shrink-0 text-sm text-pips-muted transition-transform duration-200",
                  isOpen ? "rotate-180" : "",
                ].join(" ")}
              />
            </button>
            {isOpen && (
              <div className="px-5 pb-5 pl-14 text-sm leading-relaxed text-pips-muted">
                {item.a}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

export default Accordion;
