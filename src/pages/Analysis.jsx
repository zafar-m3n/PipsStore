import { useRef, useState } from "react";
import { PageHero } from "@/components/common/PageHero.jsx";
import { RevealGroup } from "@/components/common/RevealGroup.jsx";
import { DisclaimerBanner } from "@/components/common/DisclaimerBanner.jsx";
import { ClosingCTA } from "@/components/common/ClosingCTA.jsx";
import { DrawnChart } from "@/components/common/DrawnChart.jsx";
import { ArchiveImage } from "@/components/common/ArchiveImage.jsx";
import { PatternCard } from "@/components/cards/PatternCard.jsx";
import { IndicatorCard } from "@/components/cards/IndicatorCard.jsx";
import { BreakdownCard } from "@/components/cards/BreakdownCard.jsx";
import {
  CHART_FUNDAMENTALS,
  DASHBOARD,
  CANDLESTICK_PATTERNS,
  TECHNICAL_INDICATORS,
  CHART_PATTERNS,
  CHART_BREAKDOWNS,
} from "@/data/analysis.js";

import dojimaSasaki from "@/assets/archive/dojima-rice-exchange-sasaki.jpg";
import dojimaKunikazu from "@/assets/archive/dojima-rice-market-kunikazu.jpg";
import dojima1914 from "@/assets/archive/dojima-rice-exchange-1914.jpg";
import stockTicker from "@/assets/archive/edison-stock-ticker.jpg";

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

function FundamentalsSection() {
  const art = DASHBOARD.art;
  return (
    <section aria-labelledby="fundamentals-title" className="container-page pb-section">
      <div className="grid gap-12 lg:grid-cols-12 lg:items-center">
        <figure className="lg:col-span-7">
          <div className="panel aspect-[480/260] p-4 sm:p-6">
            <DrawnChart viewBox={art.viewBox} elements={art.elements} ariaLabel={art.ariaLabel} />
          </div>
          <figcaption className="mt-3 text-small text-ink-muted">
            A drawn example of a support zone and a resistance level. An illustration, not live prices.
          </figcaption>
        </figure>
        <div className="lg:col-span-5">
          <h2 id="fundamentals-title" className="text-title font-bold text-ink">
            Four things to name on any chart
          </h2>
          <dl className="mt-8 flex flex-col gap-6">
            {CHART_FUNDAMENTALS.map((f) => (
              <div key={f.title}>
                <dt className="text-lead font-bold text-ink">{f.title}</dt>
                <dd className="mt-1 text-body text-ink-soft">{f.description}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}

function OriginsSection() {
  return (
    <section aria-labelledby="origins-title" className="container-page pb-section">
      <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
        <div className="lg:col-span-5">
          <h2 id="origins-title" className="text-title font-bold text-ink">
            Where candlesticks come from
          </h2>
          <p className="mt-4 max-w-[48ch] text-body text-ink-soft sm:text-lead">
            Candlestick charts are usually traced back to rice traders at Osaka's Dōjima exchange in the 1700s. Every
            candle still records the same four prices: the open, the high, the low and the close.
          </p>
        </div>
        <ArchiveImage
          src={dojimaSasaki}
          width={1400}
          height={606}
          alt="A colour woodblock print of the Dōjima rice exchange on stilts beside the river, with boats in the foreground."
          caption="The Dōjima Rice Exchange, Osaka, by Yoshimitsu Sasaki, around 1880."
          className="lg:col-span-7"
          frameClassName="aspect-[7/3]"
        />
      </div>
      <div className="mt-8 grid gap-8 sm:grid-cols-3">
        <ArchiveImage
          src={dojimaKunikazu}
          width={800}
          height={1066}
          alt="A woodblock print of traders crowding a doorway at the Dōjima rice market, seen from the steps below."
          caption="Dōjima Rice Market, by Utagawa Kunikazu."
          frameClassName="aspect-[3/4]"
        />
        <ArchiveImage
          src={dojima1914}
          width={582}
          height={443}
          alt="A crowded trading hall with a gallery above, photographed in 1914."
          caption="The Dōjima Rice Exchange, 1914."
          frameClassName="aspect-[3/4]"
        />
        <ArchiveImage
          src={stockTicker}
          width={900}
          height={1113}
          alt="A brass stock ticker under a glass dome, with paper tape curling from its wheel."
          caption="Edison's stock ticker, which printed prices onto paper tape."
          frameClassName="aspect-[3/4]"
        />
      </div>
    </section>
  );
}

function LibrarySection() {
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
    <section aria-labelledby="library-title" className="bg-surface-1 py-section">
      <div className="container-page">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <h2 id="library-title" className="text-title font-bold text-ink">
              The pattern library
            </h2>
            <p className="mt-4 max-w-[52ch] text-body text-ink-soft sm:text-lead">
              Each drawing sketches itself in, so you can see exactly what makes the shape.
            </p>
          </div>
          <p className="max-w-[44ch] text-body text-ink-soft lg:col-span-5">
            <span className="font-bold text-ink">About the colours: </span>
            on our charts, <span className="font-bold text-bull">blue</span> candles closed higher and{" "}
            <span className="font-bold text-bear">orange</span> candles closed lower. Most platforms, TradingView
            included, use green and red for the same thing.
          </p>
        </div>

        <div role="tablist" aria-label="Pattern library" className="mt-12 flex flex-wrap gap-2">
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
                className={[
                  "chamfer min-h-12 px-5 text-body font-bold press",
                  selected ? "bg-brand text-on-brand" : "bg-surface-2 text-ink hover:bg-surface-3",
                ].join(" ")}
              >
                {t.label}
              </button>
            );
          })}
        </div>

        <div id="library-panel" role="tabpanel" aria-labelledby={`library-tab-${active}`} className="mt-6">
          <p className="max-w-[60ch] text-body text-ink-soft">{current.intro}</p>
          <RevealGroup settleKey={active} className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {current.items.map(current.render)}
          </RevealGroup>
        </div>
      </div>
    </section>
  );
}

function BreakdownsSection() {
  return (
    <section aria-labelledby="breakdowns-title" className="band-field py-section">
      <div className="container-page">
        <h2 id="breakdowns-title" className="text-title font-bold text-ink">
          Three worked examples
        </h2>
        <p className="mt-4 max-w-[56ch] text-body text-ink-soft sm:text-lead">
          Just the thinking: what you'd see on the chart, how you'd read it, and the lesson to keep.
        </p>
        <div className="mt-12 grid gap-4 md:grid-cols-3">
          {CHART_BREAKDOWNS.map((b) => (
            <BreakdownCard key={b.id} item={b} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default function Analysis() {
  return (
    <>
      <PageHero
        title="Chart Analysis"
        subtitle="How to look at a price chart and see its structure: candlesticks, levels, indicators and chart patterns, each drawn out step by step."
      />
      <FundamentalsSection />
      <OriginsSection />
      <LibrarySection />
      <BreakdownsSection />
      <ClosingCTA
        variant="split"
        title="Practise with the calculators"
        subtitle="Once you can read a level, the pip and profit calculators show what a move to it would mean in money."
        action={{ label: "Open the calculators", to: "/tools" }}
      />
      <div className="container-page pb-16">
        <DisclaimerBanner />
      </div>
    </>
  );
}
