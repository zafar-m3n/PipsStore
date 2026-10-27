import { Children } from "react";
import { useStaggerReveal } from "@/hooks/useGsap.js";

/* Wraps a card grid and reveals it row by row on scroll. Items are visible
   without JavaScript; GSAP hides them only while it is about to animate them.
   Pass `settleKey` (a tab or filter value) to fade the group on a switch;
   search-driven changes just swap the cards. Children need stable keys. */
export function RevealGroup({ as: Tag = "div", className = "", settleKey, children }) {
  const items = Children.toArray(children).filter(Boolean);
  const contentKey = items.map((c) => c.key).join("|");
  const scope = useStaggerReveal({ contentKey, settleKey });

  return (
    <Tag ref={scope} className={className}>
      {items.map((child) => (
        <div key={child.key} data-reveal-item className="h-full">
          {child}
        </div>
      ))}
    </Tag>
  );
}

export default RevealGroup;
