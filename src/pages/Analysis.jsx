import { useRef, useState } from "react";
import PageHero from "@/components/common/PageHero.jsx";
import Chapter from "@/components/common/Chapter.jsx";
import RevealGroup from "@/components/common/RevealGroup.jsx";
import DisclaimerBanner from "@/components/common/DisclaimerBanner.jsx";
import ButtonLink from "@/components/common/ButtonLink.jsx";
import DrawnChart from "@/components/common/DrawnChart.jsx";
import ImagePlaceholder from "@/components/common/ImagePlaceholder.jsx";
import CandleCard from "@/components/ui/CandleCard.jsx";
import LevelCard from "@/components/ui/LevelCard.jsx";
import TermCard from "@/components/ui/TermCard.jsx";
import PatternCard from "@/components/cards/PatternCard.jsx";
import IndicatorCard from "@/components/cards/IndicatorCard.jsx";
import BreakdownCard from "@/components/cards/BreakdownCard.jsx";
import { tabClass } from "@/lib/ui.js";
import {
  CHART_FUNDAMENTALS,
  DASHBOARD,
  CANDLESTICK_PATTERNS,
  TECHNICAL_INDICATORS,
  CHART_PATTERNS,
  CHART_BREAKDOWNS,
} from "@/data/analysis.js";

const LIBRARY = [
  {
    id: "candlesticks",
    label: "Candlestick patterns",
    intro: "Four common single- and two-candle shapes, and what each one says about the session.",
    items: CANDLESTICK_PATTERNS,
    render: (p) => <PatternCard key={p.id} pattern={p} />,
  },
  {
    id: "indicators",
    label: "Indicators",
    intro: "What each indicator shows, and how to use it without over-trusting it.",
    items: TECHNICAL_INDICATORS,
    render: (ind) => <IndicatorCard key={ind.id} indicator={ind} />,
  },
  {
    id: "chart-patterns",
    label: "Chart patterns",
    intro: "Bigger shapes that form over many candles, and what traders typically read from them.",
    items: CHART_PATTERNS,
    render: (p) => <PatternCard key={p.id} pattern={p} />,
  },
];

function FundamentalsChapter() {
  const art = DASHBOARD.art;
  return (
    <Chapter
      titleId="fundamentals-title"
      title="Four things to name on any chart"
      intro="Before reading any pattern, name these four. Most of chart reading is just doing this calmly, every time."
      className="pt-0"
    >
      <figure>
        <div className="card aspect-24/13 p-4 sm:p-6">
          <DrawnChart viewBox={art.viewBox} elements={art.elements} ariaLabel={art.ariaLabel} />
        </div>
        <figcaption className="mt-3 text-small text-ink-muted">
          A drawn example of a support zone and a resistance level. An illustration, not live prices.
        </figcaption>
      </figure>
      <dl className="mt-10 grid gap-x-10 gap-y-8 md:grid-cols-2">
        {CHART_FUNDAMENTALS.map((f) => (
          <div key={f.title} className="border-t border-line pt-5">
            <dt className="text-lead font-semibold text-ink">{f.title}</dt>
            <dd className="mt-2 text-body text-ink-soft">{f.description}</dd>
          </div>
        ))}
      </dl>
    </Chapter>
  );
}

function OriginsChapter() {
  return (
    <Chapter
      titleId="origins-title"
      title="Where candlesticks come from"
      intro="Candlestick charts are usually traced back to rice traders at Osaka's Dōjima exchange in the 1700s. Every candle still records the same four prices: the open, the high, the low and the close."
      introWidth="44ch"
    >
      <ImagePlaceholder
        aspect="aspect-7/3"
        description="Stacked rice bales in a traditional Japanese warehouse, softly lit: a nod to the Dōjima rice market where candlesticks began."
      />
      <div className="mt-4 grid gap-4 md:grid-cols-2">
        <CandleCard />
        <LevelCard />
        <TermCard term="Trend" showExample className="md:col-span-2" />
      </div>
    </Chapter>
  );
}

function LibraryChapter() {
  const [active, setActive] = useState(LIBRARY[0].id);
  const tabRefs = useRef([]);
  const current = LIBRARY.find((t) => t.id === active);

  const onKeyDown = (e, i) => {
    let next = null;
    if (e.key === "ArrowRight") next = (i + 1) % LIBRARY.length;
    if (e.key === "ArrowLeft") next = (i - 1 + LIBRARY.length) % LIBRARY.length;
    if (e.key === "Home") next = 0;
    if (e.key === "End") next = LIBRARY.length - 1;
    if (next === null) return;
    e.preventDefault();
    setActive(LIBRARY[next].id);
    tabRefs.current[next]?.focus();
  };

  return (
    <Chapter
      titleId="library-title"
      title="The pattern library"
      intro="Each drawing sketches itself in, so you can see exactly what makes the shape."
      aside={
        <div className="flex flex-col gap-6">
          <div role="tablist" aria-label="Pattern library" className="flex flex-wrap gap-2">
            {LIBRARY.map((t, i) => {
              const selected = t.id === active;
              return (
                <button
                  key={t.id}
                  ref={(el) => (tabRefs.current[i] = el)}
                  type="button"
                  role="tab"
                  id={`library-tab-${t.id}`}
                  aria-selected={selected}
                  aria-controls="library-panel"
                  tabIndex={selected ? 0 : -1}
                  onClick={() => setActive(t.id)}
                  onKeyDown={(e) => onKeyDown(e, i)}
                  className={tabClass(selected)}
                >
                  {t.label}
                </button>
              );
            })}
          </div>
          <p className="max-w-[44ch] text-small text-ink-soft">
            <span className="font-semibold text-ink">About the colours: </span>
            on our charts, <span className="font-semibold text-bull">blue</span> candles closed higher and{" "}
            <span className="font-semibold text-bear">orange</span> candles closed lower. Most platforms, TradingView
            included, use green and red for the same thing.
          </p>
        </div>
      }
      lit
    >
      <div id="library-panel" role="tabpanel" aria-labelledby={`library-tab-${active}`}>
        <p className="max-w-[60ch] text-body text-ink-soft">{current.intro}</p>
        <RevealGroup settleKey={active} className="mt-6 grid gap-4 sm:grid-cols-2">
          {current.items.map(current.render)}
        </RevealGroup>
      </div>
    </Chapter>
  );
}

function BreakdownsChapter() {
  return (
    <Chapter
      titleId="breakdowns-title"
      title="Three worked examples"
      intro="Just the thinking: what you'd see on the chart, how you'd read it, and the lesson to keep."
      aside={
        <div className="border-t border-line pt-6">
          <p className="max-w-[40ch] text-small text-ink-soft">
            Once you can read a level, the pip and profit calculators show what a move to it would mean in money.
          </p>
          <div className="mt-4">
            <ButtonLink to="/tools">Open the calculators</ButtonLink>
          </div>
        </div>
      }
    >
      <div className="flex flex-col gap-4">
        {CHART_BREAKDOWNS.map((b) => (
          <BreakdownCard key={b.id} item={b} />
        ))}
      </div>
    </Chapter>
  );
}

function Analysis() {
  return (
    <>
      <PageHero
        title="Chart Analysis"
        subtitle="How to look at a price chart and see its structure: candlesticks, levels, indicators and chart patterns, each drawn out step by step."
      />
      <FundamentalsChapter />
      <OriginsChapter />
      <LibraryChapter />
      <BreakdownsChapter />
      <div className="container-page pb-16">
        <DisclaimerBanner />
      </div>
    </>
  );
}

export default Analysis;
