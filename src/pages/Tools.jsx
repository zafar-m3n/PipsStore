import { lazy, Suspense } from "react";
import { Link } from "react-router-dom";
import { Icon } from "@iconify/react";
import { PageHero } from "@/components/common/PageHero.jsx";
import { DisclaimerBanner } from "@/components/common/DisclaimerBanner.jsx";
import { EmbedFrame } from "@/components/common/EmbedFrame.jsx";
import { ScaledFixedWidth } from "@/components/common/ScaledFixedWidth.jsx";
import { ArchiveImage } from "@/components/common/ArchiveImage.jsx";

import arithmometer from "@/assets/archive/tates-arithmometer.jpg";
import contest1921 from "@/assets/archive/calculating-machine-contest-1921.jpg";
import banknoteDesign from "@/assets/archive/banknote-design.jpg";

const PipCalculatorWidget = lazy(() => import("@/components/widgets/PipCalculatorWidget.jsx"));
const ProfitCalculatorWidget = lazy(() => import("@/components/widgets/ProfitCalculatorWidget.jsx"));

const PIP_INPUTS = [
  ["Instrument", "The currency pair you're pricing, such as EUR/USD."],
  ["Pips", "How many pips the move is. One pip is the pair's smallest standard price step."],
  ["Lots (trade size)", "One standard lot is 100,000 units of the first currency; 0.1 is a mini lot, 0.01 a micro lot."],
  ["Deposit currency", "The currency your account is held in. The answer is shown in it."],
  ["Pip size", "Filled in for you: 0.0001 for most pairs, 0.01 for pairs that include the Japanese yen."],
];

const PROFIT_INPUTS = [
  ["Instrument and deposit currency", "The pair you traded, and the currency your account is held in."],
  ["Buy or sell", "Buy if the trade gains when the price rises; sell if it gains when the price falls."],
  ["Lots (trade size)", "The size of the trade, in the same lots as the pip calculator."],
  ["Open and close price", "Where the trade started and where it ended. The result is the profit or loss between them."],
];

function Inputs({ items }) {
  return (
    <dl className="mt-8 flex flex-col gap-5">
      {items.map(([term, text]) => (
        <div key={term}>
          <dt className="text-body font-bold text-ink">{term}</dt>
          <dd className="mt-1 text-body text-ink-soft">{text}</dd>
        </div>
      ))}
    </dl>
  );
}

function Calculator({ label, children }) {
  return (
    <EmbedFrame minHeight={420} label={label} clip={false} bare>
      <Suspense fallback={null}>
        <ScaledFixedWidth width={665}>{children}</ScaledFixedWidth>
      </Suspense>
    </EmbedFrame>
  );
}

function PipSection() {
  return (
    <section id="pip-calculator" aria-labelledby="pip-title" className="container-page pb-section">
      <div className="grid gap-12 lg:grid-cols-12">
        <div className="min-w-0 lg:col-span-5">
          <h2 id="pip-title" className="text-title font-bold text-ink">
            Pip calculator
          </h2>
          <p className="mt-4 max-w-[48ch] text-body text-ink-soft sm:text-lead">
            What a single pip is worth for your pair, trade size and account currency.
          </p>
          <Inputs items={PIP_INPUTS} />
          <ArchiveImage
            src={arithmometer}
            width={1200}
            height={769}
            alt="A brass arithmometer with rows of sliding number settings, in an open wooden case."
            caption="Tate's Patent Arithmometer, a 19th-century calculating machine."
            className="mt-10 hidden lg:block"
            frameClassName="aspect-[3/2]"
          />
        </div>
        <div className="min-w-0 lg:col-span-7">
          <Calculator label="Loading pip calculator…">
            <PipCalculatorWidget />
          </Calculator>
        </div>
      </div>
    </section>
  );
}

function ProfitSection() {
  return (
    <section id="profit-calculator" aria-labelledby="profit-title" className="band-field py-section">
      <div className="container-page grid gap-12 lg:grid-cols-12">
        <div className="min-w-0 lg:order-last lg:col-span-5">
          <h2 id="profit-title" className="text-title font-bold text-ink">
            Profit calculator
          </h2>
          <p className="mt-4 max-w-[48ch] text-body text-ink-soft sm:text-lead">
            The profit or loss on a trade, from its direction, size, and where it opened and closed.
          </p>
          <Inputs items={PROFIT_INPUTS} />
          <ArchiveImage
            src={contest1921}
            width={1200}
            height={842}
            alt="A woman in a cloche hat working a large calculating machine at a table, with onlookers behind her."
            caption="A calculating-machine competition in Paris, 1921."
            className="mt-10 hidden lg:block"
            frameClassName="aspect-[3/2]"
          />
        </div>
        <div className="min-w-0 lg:col-span-7">
          <Calculator label="Loading profit calculator…">
            <ProfitCalculatorWidget />
          </Calculator>
        </div>
      </div>
    </section>
  );
}

function ClosingSection() {
  return (
    <section aria-labelledby="tools-next-title" className="container-page py-section">
      <div className="grid gap-10 lg:grid-cols-12 lg:items-center">
        <div className="lg:col-span-6">
          <h2 id="tools-next-title" className="text-title font-bold text-ink">
            Know where the levels are
          </h2>
          <p className="mt-4 max-w-[52ch] text-body text-ink-soft sm:text-lead">
            The calculators tell you what a move is worth. Chart Analysis shows how to find the levels that moves tend
            to start and stop at.
          </p>
          <div className="mt-8">
            <Link
              to="/analysis"
              className="chamfer inline-flex min-h-12 items-center gap-2 bg-brand px-6 text-body font-bold whitespace-nowrap text-on-brand press hover:bg-brand-hover active:bg-brand-press"
            >
              Go to Chart Analysis
              <Icon icon="ph:arrow-right-bold" aria-hidden="true" />
            </Link>
          </div>
        </div>
        <ArchiveImage
          src={banknoteDesign}
          width={1400}
          height={643}
          alt="An ornate engraved banknote design with scrollwork and a numeral five."
          caption="Design for a banknote, 19th century."
          className="lg:col-span-5 lg:col-start-8"
          frameClassName="aspect-[2/1]"
        />
      </div>
    </section>
  );
}

export default function Tools() {
  return (
    <>
      <PageHero
        title="Free Trading Tools"
        subtitle="Two everyday calculators, pip value and trade profit, free to use. They're provided by CashbackForex and embedded here; PipsStore doesn't store anything you type into them."
      />
      <PipSection />
      <ProfitSection />
      <ClosingSection />
      <div className="container-page pb-16">
        <DisclaimerBanner />
      </div>
    </>
  );
}
