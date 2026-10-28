import { Suspense, lazy, useEffect, useMemo, useRef, useState } from "react";
import { resolveTokens } from "@/lib/tokens.js";
import { REDUCE } from "@/hooks/useGsap.js";

const EFFECTS = {
  aurora: lazy(() => import("@/components/effects/Aurora.jsx")),
  rays: lazy(() => import("@/components/effects/LightRays.jsx")),
  orb: lazy(() => import("@/components/effects/Orb.jsx")),
};

/* Phones and touch devices get one still frame instead of an animation loop. */
const STILL = {
  aurora: { paused: true, intro: false, dpr: 1 },
  rays: { raysSpeed: 0, intro: false, maxDevicePixelRatio: 1 },
  orb: { paused: true, intro: false, dpr: 1 },
};

const FALLBACK = {
  aurora: "fx-aurora",
  rays: "fx-rays",
  orb: "fx-orb",
};

const LITE = "(max-width: 767px), (pointer: coarse)";

let webgl2;
function hasWebGL2() {
  if (webgl2 === undefined) {
    try {
      webgl2 = !!document.createElement("canvas").getContext("webgl2");
    } catch {
      webgl2 = false;
    }
  }
  return webgl2;
}

function useMedia(query) {
  const [matches, setMatches] = useState(() => typeof window !== "undefined" && window.matchMedia(query).matches);
  useEffect(() => {
    const mq = window.matchMedia(query);
    const onChange = () => setMatches(mq.matches);
    onChange();
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, [query]);
  return matches;
}

/* Decorative WebGL background: static token-gradient fallback always, the live
   effect only when motion is allowed, WebGL2 exists and the layer is near view. */
function EffectLayer({ effect, tokens, props, className = "" }) {
  const ref = useRef(null);
  const [near, setNear] = useState(false);
  const reduce = useMedia(REDUCE);
  const lite = useMedia(LITE);
  const Effect = EFFECTS[effect];

  useEffect(() => {
    const el = ref.current;
    if (!el || near) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setNear(true);
          io.disconnect();
        }
      },
      { rootMargin: "200px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [near]);

  const live = near && !reduce && hasWebGL2();
  const colors = useMemo(() => (live ? resolveTokens(tokens) : {}), [live, tokens]);

  return (
    <div ref={ref} aria-hidden="true" className={["pointer-events-none absolute -z-10", className || "inset-0"].join(" ")}>
      <div
        className={[
          "absolute inset-0 transition-opacity duration-1000",
          FALLBACK[effect],
          live ? "opacity-0" : "opacity-100",
        ].join(" ")}
      />
      {live && (
        <Suspense fallback={null}>
          <Effect {...props} {...colors} {...(lite ? STILL[effect] : null)} />
        </Suspense>
      )}
    </div>
  );
}

export default EffectLayer;
