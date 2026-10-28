import { lazy, Suspense } from "react";
import PageHero from "@/components/common/PageHero.jsx";
import DisclaimerBanner from "@/components/common/DisclaimerBanner.jsx";
import EmbedFrame from "@/components/common/EmbedFrame.jsx";
import EmbedTile from "@/components/common/EmbedTile.jsx";
import InfoTile from "@/components/common/InfoTile.jsx";
import ImagePlaceholder from "@/components/common/ImagePlaceholder.jsx";
import ButtonLink from "@/components/common/ButtonLink.jsx";
import BulletList from "@/components/common/BulletList.jsx";
import SectionIntro from "@/components/common/SectionIntro.jsx";
import SessionClockCard from "@/components/ui/SessionClockCard.jsx";
import CalendarEventCard from "@/components/ui/CalendarEventCard.jsx";
import TermCard from "@/components/ui/TermCard.jsx";
import { useScrollReveal } from "@/hooks/useGsap.js";

const MarketNewsWidget = lazy(() => import("@/components/widgets/MarketNewsWidget.jsx"));
const EconomicCalendarWidget = lazy(() => import("@/components/widgets/EconomicCalendarWidget.jsx"));
const CurrencyMiniChart = lazy(() => import("@/components/widgets/CurrencyMiniChart.jsx"));

const WATCHLIST_SYMBOLS = ["FX:EURUSD", "FX:GBPUSD", "FX:USDJPY", "OANDA:XAUUSD"];

function NewsSection() {
  return (
    <section aria-labelledby="news-title" className="container-page pb-section">
      <SectionIntro id="news-title" title="Market news" size="body">
        The latest headlines from TradingView's news feed, as they come in.
      </SectionIntro>
      <div className="mt-10 grid gap-4 lg:grid-cols-12">
        <EmbedTile label="Live headlines" source="Provided by TradingView" className="lg:col-span-8">
          <EmbedFrame height={760} label="Loading market news…" bare>
            <Suspense fallback={null}>
              <MarketNewsWidget />
            </Suspense>
          </EmbedFrame>
        </EmbedTile>
        <div className="flex min-w-0 flex-col gap-4 lg:col-span-4">
          <InfoTile title="How to read the news">
            <BulletList
              items={[
                "News about interest rates, inflation and jobs tends to move currencies the most.",
                "A headline is one input, not a signal. Check it against the chart before forming a view.",
                "Meet a term you don't know? The glossary in the Academy explains it.",
              ]}
            />
          </InfoTile>
          <ImagePlaceholder
            aspect="aspect-4/5"
            className="hidden lg:block"
            description="Someone reading a newspaper’s business pages over morning coffee, a central-bank headline visible."
          />
        </div>
      </div>
    </section>
  );
}

function WatchlistSection() {
  const charts = useScrollReveal(":scope > *");

  return (
    <section aria-labelledby="watchlist-title" className="section-lit py-section">
      <div className="container-page">
        <div className="grid gap-4 lg:grid-cols-12 lg:items-start">
          <div className="lg:col-span-7">
            <SectionIntro id="watchlist-title" title="Watchlist" width="52ch">
              Twelve months of price for three major currency pairs and gold, so you can see the bigger picture behind the day's headlines.
            </SectionIntro>
          </div>
          <SessionClockCard className="lg:col-span-5" />
        </div>
        <div ref={charts} className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {WATCHLIST_SYMBOLS.map((symbol) => (
            <EmbedFrame
              key={symbol}
              height={244}
              minHeight={244}
              label={`Loading ${symbol} chart…`}
              className="card p-2"
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
  );
}

function CalendarSection() {
  return (
    <section aria-labelledby="calendar-title" className="container-page py-section">
      <SectionIntro id="calendar-title" title="Economic calendar" size="body">
        Upcoming data releases and central-bank events across the major economies, with their expected impact.
      </SectionIntro>
      <div className="mt-10 grid gap-4 lg:grid-cols-12">
        <div className="order-last flex min-w-0 flex-col gap-4 lg:order-none lg:col-span-4">
          <InfoTile title="How to read the calendar">
            <BulletList
              items={[
                "High-impact events can move a pair sharply within seconds. Many beginners choose not to have a trade open around them.",
                "Prices react to the surprise: compare the actual figure with the forecast, not just the number itself.",
              ]}
            />
          </InfoTile>
          <CalendarEventCard />
        </div>
        <EmbedTile label="Live calendar" source="Provided by TradingView" className="lg:col-span-8">
          <EmbedFrame height={760} label="Loading economic calendar…" bare>
            <Suspense fallback={null}>
              <EconomicCalendarWidget />
            </Suspense>
          </EmbedFrame>
        </EmbedTile>
      </div>
    </section>
  );
}

function ClosingSection() {
  return (
    <section aria-labelledby="markets-next-title" className="container-page pb-section">
      <div className="grid gap-4 lg:grid-cols-12">
        <TermCard term="Interest Rate" showExample className="order-last lg:order-none lg:col-span-5" />
        <article className="card flex flex-col justify-between gap-8 p-6 sm:p-8 lg:col-span-7">
          <SectionIntro id="markets-next-title" title="Learn why the news moves prices" width="52ch">
            The News & Market Context path explains interest rates, inflation data and central banks, so headlines stop feeling like noise.
          </SectionIntro>
          <div>
            <ButtonLink to="/academy#news-and-context">See the path outline</ButtonLink>
          </div>
        </article>
      </div>
    </section>
  );
}

function Markets() {
  return (
    <>
      <PageHero
        title="Market Insights"
        subtitle="Live context from TradingView: the latest headlines, twelve-month charts for three major currency pairs and gold, and the economic calendar."
      />
      <NewsSection />
      <WatchlistSection />
      <CalendarSection />
      <ClosingSection />
      <div className="container-page pb-16">
        <DisclaimerBanner />
      </div>
    </>
  );
}

export default Markets;
