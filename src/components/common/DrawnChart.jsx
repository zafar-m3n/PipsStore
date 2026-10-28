import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { prefersReducedMotion } from "@/hooks/useGsap.js";

/* Elements inherit the ink colour from the SVG's CSS `color` via
   `currentColor`. Market colours go through `style`, because presentation
   attributes don't reliably accept CSS var() across browsers.
   Bull candles are hollow blue, bear candles filled orange; the brand green
   never appears inside a chart. */
const INK = "currentColor";
const BULL = "var(--color-bull)";
const BEAR = "var(--color-bear)";
const BAND_FILL = "rgb(166 166 174 / 0.1)";

function totalLength(el) {
  if (el && typeof el.getTotalLength === "function") {
    try {
      const len = el.getTotalLength();
      if (len && Number.isFinite(len)) return len;
    } catch {
      /* getTotalLength unsupported for this shape — fall through */
    }
  }
  return 320;
}

/* ------------------------------------------------------------------
   Render one element descriptor to SVG.
   `after: true`  -> the mark fades / rises in AFTER the strokes finish
                     (necklines, level lines, arrows, notes)
   otherwise      -> the stroke draws itself in via strokeDashoffset
------------------------------------------------------------------ */
function renderElement(el, i) {
  const stroke = el.stroke || INK;
  const width = el.width ?? 2.4;
  const strokeProps = {
    stroke,
    strokeWidth: width,
    strokeLinecap: "round",
    strokeLinejoin: "round",
    fill: el.fill || "none",
    vectorEffect: "non-scaling-stroke",
  };
  const flag = el.after ? { "data-after": "" } : { "data-draw": "" };

  switch (el.type) {
    case "polyline":
      return <polyline key={i} points={el.points} {...strokeProps} {...flag} />;

    case "path":
      return <path key={i} d={el.d} {...strokeProps} {...flag} />;

    case "line":
      return (
        <line
          key={i}
          x1={el.x1}
          y1={el.y1}
          x2={el.x2}
          y2={el.y2}
          {...strokeProps}
          {...flag}
        />
      );

    /* dashed horizontal reference line (support / resistance / RSI level) */
    case "hline":
      return (
        <line
          key={i}
          x1={el.x1}
          y1={el.y}
          x2={el.x2}
          y2={el.y}
          {...strokeProps}
          strokeWidth={el.width ?? 1.6}
          strokeDasharray={el.dashArray || "5 6"}
          data-after=""
        />
      );

    /* highlighted price band (support / resistance zone) — fades in */
    case "band":
      return (
        <rect
          key={i}
          x={el.x}
          y={el.y}
          width={el.w}
          height={el.h}
          rx="2"
          fill={el.fill || BAND_FILL}
          stroke="none"
          data-after=""
        />
      );

    case "rect":
      return (
        <rect
          key={i}
          x={el.x}
          y={el.y}
          width={el.w}
          height={el.h}
          rx={el.rx ?? 1}
          {...strokeProps}
          {...flag}
        />
      );

    /* a single candlestick: wick line + body outline, both drawn */
    case "candle": {
      const half = (el.w ?? 11) / 2;
      const bodyH = Math.max(1.5, el.bodyBot - el.bodyTop);
      const tone = el.bear ? BEAR : BULL;
      return (
        <g key={i}>
          <line
            x1={el.x}
            y1={el.wickTop}
            x2={el.x}
            y2={el.wickBot}
            {...strokeProps}
            style={{ stroke: tone }}
            data-draw=""
          />
          <path
            d={`M ${el.x - half} ${el.bodyTop} h ${half * 2} v ${bodyH} h ${-half * 2} Z`}
            strokeWidth={width}
            strokeLinejoin="round"
            style={{ stroke: tone, fill: el.bear ? BEAR : "none" }}
            vectorEffect="non-scaling-stroke"
            data-draw=""
          />
        </g>
      );
    }

    /* arrow annotation — fades in after the strokes complete */
    case "arrow": {
      const ang = Math.atan2(el.y2 - el.y1, el.x2 - el.x1);
      const h = el.head ?? 7;
      const ax = el.x2 - h * Math.cos(ang - Math.PI / 6);
      const ay = el.y2 - h * Math.sin(ang - Math.PI / 6);
      const bx = el.x2 - h * Math.cos(ang + Math.PI / 6);
      const by = el.y2 - h * Math.sin(ang + Math.PI / 6);
      return (
        <g key={i} data-after="">
          <line x1={el.x1} y1={el.y1} x2={el.x2} y2={el.y2} {...strokeProps} />
          <path
            d={`M ${ax} ${ay} L ${el.x2} ${el.y2} L ${bx} ${by}`}
            {...strokeProps}
          />
        </g>
      );
    }

    case "circle":
      return (
        <circle key={i} cx={el.cx} cy={el.cy} r={el.r} {...strokeProps} {...flag} />
      );

    /* short annotation — used sparingly */
    case "note":
      return (
        <text
          key={i}
          x={el.x}
          y={el.y}
          data-after=""
          fontFamily='"Hanken Grotesk", ui-sans-serif, sans-serif'
          fontSize={el.size ?? 12}
          fontWeight="500"
          fill={el.stroke || INK}
          textAnchor={el.anchor || "start"}
        >
          {el.text}
        </text>
      );

    default:
      return null;
  }
}

/* ==================================================================
   DrawnChart
   A reusable hand-drawn-style SVG line graphic whose strokes sketch
   themselves in on scroll (GSAP + ScrollTrigger via strokeDashoffset),
   with annotation marks appearing once the strokes finish.
   One-time only (once: true) — no looping.

   props:
     viewBox       SVG viewBox (default "0 0 320 200")
     elements      array of element descriptors (see renderElement)
     drawDuration  seconds per stroke (default 0.9)
     ariaLabel     accessible description
     inkColor      stroke colour for non-market marks (default soft ink)
   ================================================================== */
function DrawnChart({
  viewBox = "0 0 320 200",
  elements = [],
  drawDuration = 0.9,
  ariaLabel = "Chart illustration",
  inkColor = "var(--color-ink-soft)",
  className = "",
}) {
  const ref = useRef(null);

  useLayoutEffect(() => {
    const root = ref.current;
    if (!root) return;

    const drawEls = Array.from(root.querySelectorAll("[data-draw]"));
    const afterEls = Array.from(root.querySelectorAll("[data-after]"));

    drawEls.forEach((el) => {
      const len = totalLength(el);
      el.style.strokeDasharray = String(len);
      el.style.strokeDashoffset = String(len);
    });

    if (prefersReducedMotion()) {
      drawEls.forEach((el) => {
        el.style.strokeDashoffset = "0";
      });
      gsap.set(afterEls, { opacity: 1, y: 0 });
      return;
    }

    gsap.set(afterEls, { opacity: 0, y: 6 });

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: { trigger: root, start: "top 82%", once: true },
      });

      tl.to(drawEls, {
        strokeDashoffset: 0,
        duration: drawDuration,
        ease: "power1.inOut",
        stagger: 0.16,
      });

      if (afterEls.length) {
        tl.to(
          afterEls,
          {
            opacity: 1,
            y: 0,
            duration: 0.4,
            ease: "power2.out",
            stagger: 0.1,
          },
          "-=0.15",
        );
      }
    }, root);

    return () => ctx.revert();
  }, [drawDuration, elements]);

  return (
    <svg
      ref={ref}
      viewBox={viewBox}
      role="img"
      aria-label={ariaLabel}
      fill="none"
      preserveAspectRatio="xMidYMid meet"
      style={{ color: inkColor }}
      className={["block h-full w-full", className].join(" ")}
    >
      {elements.map((el, i) => renderElement(el, i))}
    </svg>
  );
}

export default DrawnChart;
