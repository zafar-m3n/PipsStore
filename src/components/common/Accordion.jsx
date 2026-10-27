import { useId, useState } from "react";
import { Icon } from "@iconify/react";
import gsap from "gsap";
import { MOTION, usePresence } from "@/hooks/useGsap.js";

const panelIn = (el, reduce) => {
  if (reduce) return gsap.fromTo(el, { opacity: 0 }, { opacity: 1, duration: 0.15, clearProps: "opacity" });
  const from = el.style.height ? {} : { height: 0, opacity: 0 };
  return gsap.fromTo(el, from, {
    height: "auto",
    opacity: 1,
    duration: 0.22,
    ease: MOTION.easeOut,
    clearProps: "height,opacity",
  });
};
const panelOut = (el) => gsap.to(el, { height: 0, opacity: 0, duration: 0.15, ease: "power2.out" });

function Panel({ id, open, children }) {
  const [mounted, ref] = usePresence(open, { enter: panelIn, exit: panelOut });
  if (!mounted) return null;
  return (
    <div id={id} ref={ref} inert={!open} className="overflow-hidden">
      <div className="max-w-[65ch] px-5 pb-5 text-body text-ink-soft">{children}</div>
    </div>
  );
}

/* One-open-at-a-time accordion for the About page FAQ. */
export function Accordion({ items = [] }) {
  const [open, setOpen] = useState(0);
  const baseId = useId();

  return (
    <div className="flex flex-col gap-2">
      {items.map((item, i) => {
        const isOpen = open === i;
        const panelId = `${baseId}-panel-${i}`;
        return (
          <div
            key={item.q}
            className={["chamfer transition-colors", isOpen ? "bg-surface-2" : "bg-surface-1"].join(" ")}
          >
            <h3>
              <button
                type="button"
                onClick={() => setOpen(isOpen ? -1 : i)}
                aria-expanded={isOpen}
                aria-controls={panelId}
                className="chamfer flex min-h-14 w-full items-center justify-between gap-4 px-5 py-4 text-left press-soft hover:bg-surface-2"
              >
                <span className="text-body font-bold text-ink">{item.q}</span>
                <Icon
                  icon="ph:caret-down-bold"
                  aria-hidden="true"
                  className={[
                    "shrink-0 text-ink-muted transition-transform duration-200 ease-out",
                    isOpen ? "rotate-180" : "",
                  ].join(" ")}
                />
              </button>
            </h3>
            <Panel id={panelId} open={isOpen}>
              {item.a}
            </Panel>
          </div>
        );
      })}
    </div>
  );
}

export default Accordion;
