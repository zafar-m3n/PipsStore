import { lazy, Suspense } from "react";
import { Link } from "react-router-dom";
import { Icon } from "@iconify/react";
import { PageHero } from "@/components/common/PageHero.jsx";
import { DisclaimerBanner } from "@/components/common/DisclaimerBanner.jsx";
import { EmbedFrame } from "@/components/common/EmbedFrame.jsx";
import { ArchiveImage } from "@/components/common/ArchiveImage.jsx";
import { useScrollReveal } from "@/hooks/useGsap.js";

import newsboy from "@/assets/archive/newsboy-1910.jpg";
import torontoExchange from "@/assets/archive/toronto-stock-exchange-1956.jpg";
import morseRegister from "@/assets/archive/morse-telegraph-register.jpg";
import royalExchange from "@/assets/archive/royal-exchange.jpg";

const MarketNewsWidget = lazy(() => import("@/components/widgets/MarketNewsWidget.jsx"));
const EconomicCalendarWidget = lazy(() => import("@/components/widgets/EconomicCalendarWidget.jsx"));
const CurrencyMiniChart = lazy(() => import("@/components/widgets/CurrencyMiniChart.jsx"));

const WATCHLIST_SYMBOLS = ["FX:EURUSD", "FX:GBPUSD", "FX:USDJPY", "OANDA:XAUUSD"];

function Tips({ items }) {
  return (
    <ul className="mt-8 flex flex-col gap-4">
      {items.map((tip) => (
        <li key={tip} className="flex gap-3 text-body text-ink-soft">
          <span aria-hidden="true" className="chamfer mt-2 h-2.5 w-2.5 shrink-0 bg-brand" />
          <span>{tip}</span>
        </li>
      ))}
    </ul>
  );
}

function NewsSection() {
  return (
    <section aria-labelledby="news-title" className="container-page pb-section">
      <div className="grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <h2 id="news-title" className="text-title font-bold text-ink">
            Market news
          </h2>
          <p className="mt-4 text-body text-ink-soft sm:text-lead">
            The latest headlines from TradingView's news feed, as they come in.
          </p>
          <Tips
            items={[
              "News about interest rates, inflation and jobs tends to move currencies the most.",
              "A headline is one input, not a signal. Check it against the chart before forming a view.",
              "Meet a term you don't know? The glossary in the Academy explains it.",
            ]}
          />
          <ArchiveImage
            src={newsboy}
            width={760}
            height={1021}
            alt="A young newspaper seller in a cap standing beside a tall stack of papers on a street corner."
            caption="Selling the day's papers, Massachusetts, around 1910."
            className="mt-10 hidden lg:block"
            frameClassName="aspect-[4/5]"
          />
        </div>
        <div className="lg:col-span-8">
          <EmbedFrame height={760} label="Loading market news…">
            <Suspense fallback={null}>
              <MarketNewsWidget />
            </Suspense>
          </EmbedFrame>
        </div>
      </div>
    </section>
  );
}

function WatchlistSection() {
  const charts = useScrollReveal(":scope > *");

  return (
    <section aria-labelledby="watchlist-title" className="bg-surface-1 py-section">
      <div className="container-page">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-6">
            <h2 id="watchlist-title" className="text-title font-bold text-ink">
              Watchlist
            </h2>
            <p className="mt-4 max-w-[52ch] text-body text-ink-soft sm:text-lead">
              Twelve months of price for three major currency pairs and gold, so you can see the bigger picture behind
              the day's headlines.
            </p>
          </div>
          <ArchiveImage
            src={torontoExchange}
            width={1000}
            height={1007}
            alt="Traders in suits crowding the floor of a stock exchange around tall quotation posts, under a large clock."
            caption="The floor of the Toronto Stock Exchange, 1956."
            className="lg:col-span-5 lg:col-start-8"
            frameClassName="aspect-[16/9]"
          />
        </div>
        <div ref={charts} className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {WATCHLIST_SYMBOLS.map((symbol) => (
            <EmbedFrame
              key={symbol}
              height={244}
              minHeight={244}
              label={`Loading ${symbol} chart…`}
              className="panel-raised p-2"
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
    <section aria-labelledby="calendar-title" className="band-field py-section">
      <div className="container-page grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <h2 id="calendar-title" className="text-title font-bold text-ink">
            Economic calendar
          </h2>
          <p className="mt-4 text-body text-ink-soft sm:text-lead">
            Upcoming data releases and central-bank events across the major economies, with their expected impact.
          </p>
          <Tips
            items={[
              "High-impact events can move a pair sharply within seconds. Many beginners choose not to have a trade open around them.",
              "Prices react to the surprise: compare the actual figure with the forecast, not just the number itself.",
            ]}
          />
          <ArchiveImage
            src={morseRegister}
            width={1200}
            height={777}
            alt="An engraved diagram of a telegraph key, relay and paper-tape register, with labelled parts."
            caption="A telegraph key and register, 1876. News once reached markets by wire."
            className="mt-10"
            frameClassName="aspect-[3/2]"
          />
        </div>
        <div className="lg:col-span-8">
          <EmbedFrame height={760} label="Loading economic calendar…">
            <Suspense fallback={null}>
              <EconomicCalendarWidget />
            </Suspense>
          </EmbedFrame>
        </div>
      </div>
    </section>
  );
}

function ClosingSection() {
  return (
    <section aria-labelledby="markets-next-title" className="container-page py-section">
      <div className="grid gap-10 lg:grid-cols-12 lg:items-center">
        <ArchiveImage
          src={royalExchange}
          width={843}
          height={542}
          alt="Horse-drawn traffic crowding the street in front of the columned Royal Exchange in London."
          caption="The Royal Exchange, London, late 1800s."
          className="order-last lg:order-none lg:col-span-5"
          frameClassName="aspect-[3/2]"
        />
        <div className="lg:col-span-6 lg:col-start-7">
          <h2 id="markets-next-title" className="text-title font-bold text-ink">
            Learn why the news moves prices
          </h2>
          <p className="mt-4 max-w-[52ch] text-body text-ink-soft sm:text-lead">
            The News & Market Context path explains interest rates, inflation data and central banks, so headlines stop
            feeling like noise.
          </p>
          <div className="mt-8">
            <Link
              to="/academy#news-and-context"
              className="chamfer inline-flex min-h-12 items-center gap-2 bg-brand px-6 text-body font-bold whitespace-nowrap text-on-brand press hover:bg-brand-hover active:bg-brand-press"
            >
              See the path outline
              <Icon icon="ph:arrow-right-bold" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function Markets() {
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
