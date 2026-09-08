import { Children } from "react";
import { useStaggerReveal } from "@/hooks/useGsap.js";

/* Wraps a card grid: attaches the scroll-triggered stagger reveal and
   wraps each direct child so GSAP animates it in one-time on scroll.
   Each child sits in a full-height wrapper so `h-full` cards still work. */
export function RevealGroup({ as: Tag = "div", className = "", children }) {
  const scope = useStaggerReveal();

  return (
    <Tag ref={scope} className={className}>
      {Children.map(children, (child, i) =>
        child == null || child === false ? null : (
          <div key={i} data-reveal-item className="reveal-init h-full">
            {child}
          </div>
        ),
      )}
    </Tag>
  );
}

export default RevealGroup;
