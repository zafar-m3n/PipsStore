import { useLayoutEffect } from "react";
import { Icon } from "@iconify/react";
import gsap from "gsap";
import { ALLOW, RISE, useScrollReveal } from "@/hooks/useGsap.js";

const STEP = { ...RISE, start: "top 70%" };

/* The beginner roadmap as one connected rail: a straight brand line with a
   chamfered marker per step. Steps alternate sides on desktop and sit to the
   right of the rail on mobile. Order is carried by the <ol> and position.
   On scroll the line draws downward and each step arrives as it reaches it. */
export function RoadmapJourney({ steps = [] }) {
  const scope = useScrollReveal("[data-step]", STEP);

  useLayoutEffect(() => {
    const root = scope.current;
    const line = root?.querySelector("[data-rail]");
    if (!line) return;
    const mm = gsap.matchMedia(root);
    mm.add(ALLOW, () => {
      gsap.fromTo(
        line,
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: "none",
          scrollTrigger: { trigger: root, start: "top 70%", end: "bottom 70%", scrub: 0.6 },
        },
      );
    });
    return () => mm.revert();
  }, [scope]);

  return (
    <div ref={scope} className="relative mt-12">
      <div
        aria-hidden="true"
        data-rail
        className="absolute inset-y-0 left-3 w-[3px] origin-top -translate-x-1/2 bg-brand lg:left-1/2"
      />

      <ol className="relative space-y-6 lg:space-y-0">
        {steps.map((step, i) => {
          const right = i % 2 === 1;
          return (
            <li
              key={step.step}
              data-step
              className="relative grid grid-cols-[24px_1fr] items-center gap-6 lg:grid-cols-2 lg:gap-0 lg:py-4"
            >
              <span
                aria-hidden="true"
                className="chamfer absolute top-1/2 left-3 z-10 h-5 w-5 -translate-x-1/2 -translate-y-1/2 bg-brand lg:left-1/2"
              />
              <div
                className={[
                  "col-start-2 lg:row-start-1",
                  right ? "lg:col-start-2 lg:pl-12" : "lg:col-start-1 lg:pr-12",
                ].join(" ")}
              >
                <div className="panel p-6">
                  <h3 className="flex items-center gap-3 text-lead font-bold text-ink">
                    <Icon icon={step.icon} aria-hidden="true" className="shrink-0 text-brand" />
                    {step.title}
                  </h3>
                  <p className="mt-2 text-body text-ink-soft">{step.description}</p>
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
