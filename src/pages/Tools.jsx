import { lazy, Suspense } from "react";
import { Icon } from "@iconify/react";
import { PageHero } from "@/components/common/PageHero.jsx";
import { SectionHeading } from "@/components/common/SectionHeading.jsx";
import { DisclaimerBanner } from "@/components/common/DisclaimerBanner.jsx";
import { ClosingCTA } from "@/components/common/ClosingCTA.jsx";
import { EmbedFrame } from "@/components/common/EmbedFrame.jsx";
import { ScaledFixedWidth } from "@/components/common/ScaledFixedWidth.jsx";

const PipCalculatorWidget = lazy(
  () => import("@/components/widgets/PipCalculatorWidget.jsx"),
);
const ProfitCalculatorWidget = lazy(
  () => import("@/components/widgets/ProfitCalculatorWidget.jsx"),
);

function ToolBlock({ id, icon, title, description, label, children }) {
  return (
    <div id={id} className="scroll-mt-24">
      <div className="flex items-center gap-3">
        <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-pips-accent-tint text-pips-accent ring-1 ring-pips-accent-soft">
          <Icon icon={icon} className="text-xl" />
        </span>
        <div>
          <h3 className="text-lg font-semibold text-pips-ink">{title}</h3>
          <p className="text-sm text-pips-muted">{description}</p>
        </div>
      </div>
      <div className="mt-5">
        <EmbedFrame minHeight={400} label={label} clip={false} bare>
          <Suspense fallback={null}>
            <ScaledFixedWidth width={665}>{children}</ScaledFixedWidth>
          </Suspense>
        </EmbedFrame>
      </div>
    </div>
  );
}

export default function Tools() {
  return (
    <>
      <PageHero
        title="Free Trading Tools"
        subtitle="Two everyday calculators — pip value and trade profit — embedded free for you to use. Nothing you type is stored by PipsStore."
      />

      <section className="container-pips space-y-12 py-16">
        <SectionHeading
          title="Calculators"
          subtitle="Plug in your numbers and read the result. Use them to build the habit of checking risk before every trade."
        />

        <ToolBlock
          id="pip-calculator"
          icon="ph:ruler"
          title="Pip Calculator"
          description="Work out what a pip is worth for your pair, account currency, and position size."
          label="Loading pip calculator…"
        >
          <PipCalculatorWidget />
        </ToolBlock>

        <ToolBlock
          id="profit-calculator"
          icon="ph:chart-line-up"
          title="Profit Calculator"
          description="Estimate the profit or loss on a trade from its entry, exit, direction, and size."
          label="Loading profit calculator…"
        >
          <ProfitCalculatorWidget />
        </ToolBlock>
      </section>

      <section className="container-pips py-12">
        <DisclaimerBanner />
      </section>

      <ClosingCTA
        title="Learn the 'why' behind the numbers"
        subtitle="The Risk-First Trading path explains position sizing and stops from the ground up."
        buttons={[
          { label: "Go to Academy", to: "/academy" },
          { label: "Chart Analysis", to: "/analysis", variant: "ghost" },
        ]}
      />
    </>
  );
}
