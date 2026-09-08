import { Icon } from "@iconify/react";

/* Beginner roadmap rendered as a single connected journey rather than a
   grid of cards: a winding accent line runs through every step, with the
   steps sitting alternately left / right of it on desktop and stacked to
   the right of a straight rail on mobile. */
export function RoadmapJourney({ steps = [] }) {
  return (
    <div className="relative mt-12">
      {/* Winding line — straight-ish down the left on mobile, centred on desktop.
          Stretched vertically via preserveAspectRatio="none"; the stroke stays
          crisp thanks to vector-effect. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 left-4.75 w-6 -translate-x-1/2 lg:left-1/2 lg:w-12"
      >
        <svg className="h-full w-full" viewBox="0 0 40 100" preserveAspectRatio="none" fill="none">
          <path
            d="M20 0 C 6 8 6 14 20 20 C 34 26 34 32 20 40 C 6 48 6 54 20 60 C 34 66 34 72 20 80 C 8 87 8 93 20 100"
            stroke="var(--color-pips-accent)"
            strokeWidth="2.5"
            strokeLinecap="round"
            vectorEffect="non-scaling-stroke"
            opacity="0.55"
          />
        </svg>
      </div>

      <ol className="relative space-y-8 lg:space-y-0">
        {steps.map((step, i) => {
          const right = i % 2 === 1;
          return (
            <li
              key={step.step}
              className="relative grid grid-cols-[40px_1fr] items-center gap-4 lg:grid-cols-2 lg:gap-0 lg:py-5"
            >
              {/* Node on the rail */}
              <span className="absolute left-4.75 top-1/2 z-10 flex h-8 w-8 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-2 border-pips-accent bg-pips-bg font-mono text-xs font-bold text-pips-accent lg:left-1/2">
                {step.step}
              </span>

              {/* Step content — always right of the rail on mobile;
                  alternates sides on desktop */}
              <div
                className={[
                  "col-start-2 lg:row-start-1",
                  right ? "lg:col-start-2 lg:pl-14" : "lg:col-start-1 lg:pr-14 lg:text-right",
                ].join(" ")}
              >
                <div className="card-journal inline-block w-full p-5">
                  <div className={["flex items-center gap-3", right ? "" : "lg:flex-row-reverse"].join(" ")}>
                    <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-pips-accent-tint text-pips-accent ring-1 ring-pips-accent-soft">
                      <Icon icon={step.icon} className="text-lg" />
                    </span>
                    <h3 className="text-base font-semibold text-pips-ink">{step.title}</h3>
                  </div>
                  <p className="mt-2 text-sm leading-relaxed text-pips-muted">{step.description}</p>
                </div>
              </div>
            </li>
          );
        })}
      </ol>
    </div>
  );
}

export default RoadmapJourney;
