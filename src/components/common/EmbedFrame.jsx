import { useEffect, useRef, useState } from "react";

/* Wraps a third-party embed (TradingView / CashbackForex) in a card that
   matches the site, shows a skeleton until the embed paints, and never
   blocks the surrounding page. The wrapped widgets' own scripts stay
   untouched — this only observes the DOM they inject.

   props:
     height     fixed pixel height for widgets that fill their parent
                (TradingView timeline / events). Omit for self-sizing embeds.
     minHeight  fallback min height when `height` is not given.
     label      accessible loading label.
     bare       drop the default panel treatment (caller styles it).
     clip       clip overflow to the frame (default true). Set false for
                embeds that size themselves and may grow past `minHeight`.
*/
export function EmbedFrame({
  children,
  height,
  minHeight = 360,
  label = "Loading widget…",
  bare = false,
  clip = true,
  className = "",
}) {
  const ref = useRef(null);
  const [ready, setReady] = useState(false);
  const [skeletonGone, setSkeletonGone] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // TradingView and CashbackForex both render their widget inside an <iframe>.
    const painted = () => !!el.querySelector("iframe");

    if (painted()) {
      setReady(true);
      return;
    }

    const observer = new MutationObserver(() => {
      if (painted()) {
        setReady(true);
        observer.disconnect();
      }
    });
    observer.observe(el, { childList: true, subtree: true });

    const fallback = setTimeout(() => setReady(true), 8000);

    return () => {
      observer.disconnect();
      clearTimeout(fallback);
    };
  }, []);

  // `minHeight` only reserves space for the skeleton while loading; once the
  // embed has painted, hug its real (already-sized) content instead.
  const style = height ? { height } : ready ? undefined : { minHeight };

  return (
    <div
      className={[
        "relative",
        clip ? "overflow-hidden" : "",
        bare ? "" : "panel p-2 sm:p-3",
        className,
      ].join(" ")}
      style={style}
    >
      {!skeletonGone && (
        <div
          className={[
            "pointer-events-none absolute inset-0 z-10 flex flex-col gap-3 p-4 transition-opacity duration-200 ease-out",
            ready ? "opacity-0" : "opacity-100",
          ].join(" ")}
          onTransitionEnd={() => ready && setSkeletonGone(true)}
          aria-hidden="true"
        >
          <div className="h-6 w-2/5 animate-pulse rounded-sm bg-surface-2 motion-reduce:animate-none" />
          <div className="flex-1 animate-pulse rounded-sm bg-surface-2 motion-reduce:animate-none" />
        </div>
      )}
      <span className="sr-only">{ready ? "" : label}</span>
      <div
        ref={ref}
        className={[
          "h-full w-full transition-opacity duration-300 ease-out",
          ready ? "opacity-100" : "opacity-0",
        ].join(" ")}
      >
        {children}
      </div>
    </div>
  );
}

export default EmbedFrame;
