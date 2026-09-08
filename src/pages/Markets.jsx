import { lazy, Suspense } from "react";
import { PageHero } from "@/components/common/PageHero.jsx";
import { SectionHeading } from "@/components/common/SectionHeading.jsx";
import { DisclaimerBanner } from "@/components/common/DisclaimerBanner.jsx";
import { ClosingCTA } from "@/components/common/ClosingCTA.jsx";
import { EmbedFrame } from "@/components/common/EmbedFrame.jsx";

const MarketNewsWidget = lazy(
  () => import("@/components/widgets/MarketNewsWidget.jsx"),
);
const EconomicCalendarWidget = lazy(
  () => import("@/components/widgets/EconomicCalendarWidget.jsx"),
);
const CurrencyMiniChart = lazy(
  () => import("@/components/widgets/CurrencyMiniChart.jsx"),
);

const WATCHLIST_SYMBOLS = [
  "FX:EURUSD",
  "FX:GBPUSD",
  "FX:USDJPY",
  "OANDA:XAUUSD",
];

export default function Markets() {
  return (
    <>
      <PageHero
        title="Market Insights"
        subtitle="A live view of what's moving currencies — news, the major pairs, and the economic calendar — kept beginner-friendly."
      />

      {/* Market news — TradingView Timeline */}
      <section className="container-pips py-16">
        <SectionHeading
          title="Market news"
          subtitle="A rolling timeline of the headlines traders are watching right now."
        />
        <div className="mt-10">
          <EmbedFrame height={560} label="Loading market news…">
            <Suspense fallback={null}>
              <MarketNewsWidget />
            </Suspense>
          </EmbedFrame>
        </div>
      </section>

      {/* Currency watchlist — TradingView Mini Symbol Overview, one per pair */}
      <section className="bg-pips-surface-alt/60 py-16">
        <div className="container-pips">
          <SectionHeading
            title="Currency watchlist"
            subtitle="Twelve-month mini charts for the majors we point beginners to first."
          />
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {WATCHLIST_SYMBOLS.map((symbol) => (
              <EmbedFrame
                key={symbol}
                height={244}
                minHeight={244}
                label={`Loading ${symbol} chart…`}
                className="card-journal p-2"
                bare
              >
                <Suspense fallback={null}>
                  <CurrencyMiniChart symbol={symbol} />
                </Suspense>
              </EmbedFrame>
            ))}
          </div>
        </div>
      </section>

      {/* Economic calendar — TradingView Events */}
      <section className="container-pips py-16">
        <SectionHeading
          title="Economic calendar"
          subtitle="Upcoming releases and central-bank events, with impact levels, across the major economies."
        />
        <div className="mt-10">
          <EmbedFrame height={640} label="Loading economic calendar…">
            <Suspense fallback={null}>
              <EconomicCalendarWidget />
            </Suspense>
          </EmbedFrame>
        </div>
      </section>

      <section className="container-pips py-12">
        <DisclaimerBanner />
      </section>

      <ClosingCTA
        title="Learn to read the news"
        subtitle="The Academy's 'News & Market Context' path explains why rates and inflation move currencies."
        buttons={[
          { label: "Go to Academy", to: "/academy" },
          { label: "Chart Analysis", to: "/analysis", variant: "ghost" },
        ]}
      />
    </>
  );
}
