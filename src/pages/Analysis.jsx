import { PageHero } from "@/components/common/PageHero.jsx";
import { SectionHeading } from "@/components/common/SectionHeading.jsx";
import { RevealGroup } from "@/components/common/RevealGroup.jsx";
import { DisclaimerBanner } from "@/components/common/DisclaimerBanner.jsx";
import { ClosingCTA } from "@/components/common/ClosingCTA.jsx";
import { IconTile } from "@/components/common/IconTile.jsx";
import { PatternCard } from "@/components/cards/PatternCard.jsx";
import { IndicatorCard } from "@/components/cards/IndicatorCard.jsx";
import { BreakdownCard } from "@/components/cards/BreakdownCard.jsx";
import {
  CHART_FUNDAMENTALS,
  CANDLESTICK_PATTERNS,
  TECHNICAL_INDICATORS,
  CHART_PATTERNS,
  CHART_BREAKDOWNS,
} from "@/data/analysis.js";

export default function Analysis() {
  return (
    <>
      <PageHero
        title="Chart Analysis"
        subtitle="How to look at price and see structure — candlesticks, levels, indicators, and patterns, each sketched out like a page from a trading journal."
      />

      <section className="container-pips py-16">
        <SectionHeading
          title="Chart reading fundamentals"
          subtitle="The four things every beginner should be able to name on a chart."
        />
        <RevealGroup className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {CHART_FUNDAMENTALS.map((f) => (
            <IconTile
              key={f.title}
              icon={f.icon}
              title={f.title}
              description={f.description}
            />
          ))}
        </RevealGroup>
      </section>

      <section className="bg-pips-surface-alt/60 py-16 paper-ruled">
        <div className="container-pips">
          <SectionHeading
            title="Candlestick patterns"
            subtitle="Four common shapes, each sketching itself in so you can see exactly what makes it."
          />
          <RevealGroup className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {CANDLESTICK_PATTERNS.map((p) => (
              <PatternCard key={p.id} pattern={p} />
            ))}
          </RevealGroup>
        </div>
      </section>

      <section className="container-pips py-16">
        <SectionHeading
          title="Technical indicators"
          subtitle="What each one shows on a chart, and a short note on how to use it without over-trusting it."
        />
        <RevealGroup className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {TECHNICAL_INDICATORS.map((ind) => (
            <IndicatorCard key={ind.id} indicator={ind} />
          ))}
        </RevealGroup>
      </section>

      <section className="bg-pips-surface-alt/60 py-16">
        <div className="container-pips">
          <SectionHeading
            title="Chart patterns"
            subtitle="Bigger shapes that form over many candles, with what traders typically read from them."
          />
          <RevealGroup className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {CHART_PATTERNS.map((p) => (
              <PatternCard key={p.id} pattern={p} />
            ))}
          </RevealGroup>
        </div>
      </section>

      <section className="container-pips py-16">
        <SectionHeading
          title="Chart breakdown examples"
          subtitle="Three worked scenarios — just the thinking: what you'd see, how you'd read it, and the lesson."
        />
        <RevealGroup className="mt-10 grid gap-6 md:grid-cols-3">
          {CHART_BREAKDOWNS.map((b) => (
            <BreakdownCard key={b.id} item={b} />
          ))}
        </RevealGroup>
      </section>

      <section className="container-pips py-12">
        <DisclaimerBanner />
      </section>

      <ClosingCTA
        title="Practise with the tools"
        subtitle="Once you can read a level, the calculators help you size a position around it safely."
        buttons={[
          { label: "Explore Tools", to: "/tools" },
          { label: "Go to Academy", to: "/academy", variant: "ghost" },
        ]}
      />
    </>
  );
}
