import { lazy, Suspense } from "react";
import PageHero from "@/components/common/PageHero.jsx";
import DisclaimerBanner from "@/components/common/DisclaimerBanner.jsx";
import EmbedFrame from "@/components/common/EmbedFrame.jsx";
import EmbedTile from "@/components/common/EmbedTile.jsx";
import InfoTile from "@/components/common/InfoTile.jsx";
import ScaledFixedWidth from "@/components/common/ScaledFixedWidth.jsx";
import ButtonLink from "@/components/common/ButtonLink.jsx";
import SectionIntro from "@/components/common/SectionIntro.jsx";
import PipResultCard from "@/components/ui/PipResultCard.jsx";
import RiskCard from "@/components/ui/RiskCard.jsx";
import LevelCard from "@/components/ui/LevelCard.jsx";

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
    <dl className="flex flex-col gap-4">
      {items.map(([term, text]) => (
        <div key={term}>
          <dt className="text-small font-semibold text-ink">{term}</dt>
          <dd className="mt-1 text-small text-ink-soft">{text}</dd>
        </div>
      ))}
    </dl>
  );
}

/* One calculator as a bento row: the live embed wide, the reading guide and
   a worked example beside it. */
function ToolSection({ id, titleId, title, intro, inputs, example, label, lit = false, children }) {
  return (
    <section id={id} aria-labelledby={titleId} className={lit ? "section-lit py-section" : "pb-section"}>
      <div className="container-page">
        <SectionIntro id={titleId} title={title} width="52ch">
          {intro}
        </SectionIntro>
        <div className="mt-10 grid gap-4 lg:grid-cols-12">
          <EmbedTile label="Live calculator" source="Provided by CashbackForex" className="lg:col-span-8">
            <EmbedFrame minHeight={420} label={label} clip={false} bare>
              <Suspense fallback={null}>
                <ScaledFixedWidth width={665}>{children}</ScaledFixedWidth>
              </Suspense>
            </EmbedFrame>
          </EmbedTile>
          <div className="flex min-w-0 flex-col gap-4 lg:col-span-4">
            <InfoTile title="How to fill it in">
              <Inputs items={inputs} />
            </InfoTile>
            {example}
          </div>
        </div>
      </div>
    </section>
  );
}

function ClosingSection() {
  return (
    <section aria-labelledby="tools-next-title" className="container-page py-section">
      <div className="grid gap-4 lg:grid-cols-12">
        <article className="card flex flex-col justify-between gap-8 p-6 sm:p-8 lg:col-span-7">
          <SectionIntro id="tools-next-title" title="Know where the levels are" width="52ch">
            The calculators tell you what a move is worth. Chart Analysis shows how to find the levels that moves tend to start and stop at.
          </SectionIntro>
          <div>
            <ButtonLink to="/analysis">Go to Chart Analysis</ButtonLink>
          </div>
        </article>
        <LevelCard className="lg:col-span-5" />
      </div>
    </section>
  );
}

function Tools() {
  return (
    <>
      <PageHero
        title="Free Trading Tools"
        subtitle="Two everyday calculators, pip value and trade profit, free to use. They're provided by CashbackForex and embedded here; PipsStore doesn't store anything you type into them."
      />
      <ToolSection
        id="pip-calculator"
        titleId="pip-title"
        title="Pip calculator"
        intro="What a single pip is worth for your pair, trade size and account currency."
        inputs={PIP_INPUTS}
        example={<PipResultCard />}
        label="Loading pip calculator…"
      >
        <PipCalculatorWidget />
      </ToolSection>
      <ToolSection
        id="profit-calculator"
        titleId="profit-title"
        title="Profit calculator"
        intro="The profit or loss on a trade, from its direction, size, and where it opened and closed."
        inputs={PROFIT_INPUTS}
        example={<RiskCard />}
        label="Loading profit calculator…"
        lit
      >
        <ProfitCalculatorWidget />
      </ToolSection>
      <ClosingSection />
      <div className="container-page pb-16">
        <DisclaimerBanner />
      </div>
    </>
  );
}

export default Tools;
