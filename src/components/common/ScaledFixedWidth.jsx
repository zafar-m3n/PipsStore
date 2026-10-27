import { useCallback, useLayoutEffect, useRef, useState } from "react";

/* Wrapper for third-party embeds that render at a fixed internal pixel width
   (CashbackForex calculators use ContainerWidth 665) regardless of their
   parent's width.

   - Always centres the embed horizontally (flex + justify-center).
   - On viewports at least `width` wide: renders at natural size, scale 1.
   - On narrower viewports: scales the embed down proportionally via
     transform: scale(min(1, available / width)) with transform-origin
     "top center", and sets the wrapper's height to the scaled size so no
     empty gap is left below it.

   A CSS transform doesn't shrink the element's *layout* box, so the outer
   wrapper is overflow-hidden: at scale s = available/width the scaled embed
   is exactly `available` wide and `naturalHeight * s` tall, so nothing
   visible is clipped — it only hides the invisible overflowing layout box,
   which is what would otherwise cause horizontal page scroll.

   Nothing here touches the embed's own script/config — the fix lives
   entirely in this wrapper. */
export function ScaledFixedWidth({ width = 665, children, className = "" }) {
  const outerRef = useRef(null);
  const innerRef = useRef(null);
  const [scale, setScale] = useState(1);
  const [height, setHeight] = useState(undefined);

  const measure = useCallback(() => {
    const outer = outerRef.current;
    const inner = innerRef.current;
    if (!outer || !inner) return;

    const available = outer.clientWidth;
    const nextScale = available > 0 ? Math.min(1, available / width) : 1;
    // offsetHeight is the layout height *before* any CSS transform is applied
    const naturalHeight = inner.offsetHeight;

    setScale(nextScale);
    setHeight(
      naturalHeight > 0 ? Math.ceil(naturalHeight * nextScale) : undefined,
    );
  }, [width]);

  useLayoutEffect(() => {
    measure();

    let ro;
    if (typeof ResizeObserver !== "undefined") {
      ro = new ResizeObserver(() => measure());
      if (outerRef.current) ro.observe(outerRef.current);
      if (innerRef.current) ro.observe(innerRef.current);
    }
    window.addEventListener("resize", measure);

    // the embed's iframe settles its own height asynchronously after load
    const timers = [300, 900, 2000, 4000].map((t) => setTimeout(measure, t));

    return () => {
      if (ro) ro.disconnect();
      window.removeEventListener("resize", measure);
      timers.forEach(clearTimeout);
    };
  }, [measure]);

  return (
    <div
      ref={outerRef}
      className={[
        "flex w-full items-start justify-center overflow-hidden",
        className,
      ].join(" ")}
      style={{ height }}
    >
      <div
        ref={innerRef}
        style={{
          width: `${width}px`,
          flex: "0 0 auto",
          transform: scale === 1 ? undefined : `scale(${scale})`,
          transformOrigin: "top center",
        }}
      >
        {children}
      </div>
    </div>
  );
}

export default ScaledFixedWidth;
