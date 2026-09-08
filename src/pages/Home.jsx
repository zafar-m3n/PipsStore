import { Link } from "react-router-dom";
import { Icon } from "@iconify/react";
import { useHeroReveal } from "@/hooks/useGsap.js";
import { SectionHeading } from "@/components/common/SectionHeading.jsx";
import { RevealGroup } from "@/components/common/RevealGroup.jsx";
import { RoadmapJourney } from "@/components/common/RoadmapJourney.jsx";
import { DisclaimerBanner } from "@/components/common/DisclaimerBanner.jsx";
import { ClosingCTA } from "@/components/common/ClosingCTA.jsx";
import { ContactForm } from "@/components/common/ContactForm.jsx";
import { LearningPathCard } from "@/components/cards/LearningPathCard.jsx";
import { IconTile } from "@/components/common/IconTile.jsx";
import { ToolPreviewCard } from "@/components/cards/ToolPreviewCard.jsx";
import { GlossaryCard } from "@/components/cards/GlossaryCard.jsx";

import { LEARNING_PATHS } from "@/data/learningPaths.js";
import { ROADMAP_STEPS } from "@/data/roadmap.js";
import { BENEFITS } from "@/data/benefits.js";
import { TOOLS_PREVIEW } from "@/data/tools.js";
import { GLOSSARY_TEASER_CHIPS, GLOSSARY_SAMPLE_TERM } from "@/data/glossary.js";

const HERO_STATS = [
  { value: "50+", label: "Free lessons" },
  { value: "6+", label: "Learning paths" },
  { value: "4", label: "Trading tools" },
  { value: "100%", label: "Free, always" },
];

function HeroSection() {
  const scope = useHeroReveal();

  return (
    <section ref={scope} className="border-b border-pips-line">
      <div className="container-pips grid items-start gap-12 py-14 sm:py-20 lg:grid-cols-[1.05fr_0.95fr]">
        {/* Left — headline, subtext, stats */}
        <div>
          <h1 data-hero="heading" className="text-4xl font-bold leading-[1.1] text-pips-ink sm:text-5xl lg:text-6xl">
            Learn to read the
            <br />
            forex market,
            <br />
            <span className="text-pips-accent">explained simply.</span>
          </h1>
          <p data-hero="subtext" className="mt-5 max-w-xl text-lg leading-relaxed text-pips-muted">
            PipsStore is a 100% free education platform for complete beginners. We teach market basics, risk management,
            and chart reading — with hand-drawn chart walk-throughs, plain language, and a glossary that actually
            explains. No signals, no profit promises, ever.
          </p>

          <dl data-hero="cta" className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-4">
            {HERO_STATS.map((s, i) => (
              <div key={s.label} className="flex items-center gap-6">
                {i > 0 && <span aria-hidden="true" className="hidden h-10 w-px bg-pips-line sm:block" />}
                <div>
                  <dt className="font-mono text-2xl font-bold text-pips-ink">{s.value}</dt>
                  <dd className="text-xs font-medium text-pips-muted">{s.label}</dd>
                </div>
              </div>
            ))}
          </dl>
        </div>

        {/* Right — the embedded contact form is the hero visual */}
        <div data-hero="visual" className="relative">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 -z-10 translate-x-6 translate-y-6 rounded-4xl bg-pips-accent/20 blur-3xl"
          />
          <ContactForm
            heading="Start with a free learning plan"
            blurb="Tell us where you're at and we'll point you to the right path."
          />
          <div className="stamp absolute -bottom-4 left-4 border-pips-bull bg-pips-bull-soft/70 text-pips-bull">
            <Icon icon="ph:check-bold" className="text-xs" />
            100% Free Education
          </div>
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <>
      <HeroSection />

      {/* Featured Learning Paths */}
      <section className="container-pips py-16">
        <SectionHeading
          title="Featured learning paths"
          subtitle="Guided, in-order lessons that take you from your first chart to a written trading plan."
        />
        <RevealGroup className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {LEARNING_PATHS.map((p) => (
            <LearningPathCard key={p.id} path={p} />
          ))}
        </RevealGroup>
      </section>

      {/* Beginner Roadmap — a connected journey */}
      <section className="bg-pips-surface-alt/60 py-16 paper-ruled">
        <div className="container-pips">
          <SectionHeading
            title="The beginner roadmap"
            subtitle="Five steps, in this order. Risk comes before strategy — always."
          />
          <RoadmapJourney steps={ROADMAP_STEPS} />
        </div>
      </section>

      {/* Why PipsStore */}
      <section className="container-pips py-16">
        <SectionHeading
          title="Why PipsStore"
          subtitle="Built for people who've never placed a trade — and want to understand before they do."
        />
        <RevealGroup className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {BENEFITS.map((b) => (
            <IconTile key={b.title} icon={b.icon} title={b.title} description={b.description} />
          ))}
        </RevealGroup>
      </section>

      {/* Market Insights teaser — points to the live widgets on /markets */}
      <section className="bg-pips-surface-alt/60 py-16">
        <div className="container-pips">
          <div className="card-journal p-8 sm:p-10">
            <div className="max-w-2xl">
              <h2 className="text-3xl font-bold text-pips-ink sm:text-4xl">Market insights, explained</h2>
              <p className="mt-3 text-base leading-relaxed text-pips-muted sm:text-lg">
                Get comfortable following the market — what's moving, why it matters, and how to keep up without
                drowning in jargon.
              </p>
              <Link
                to="/markets"
                className="mt-6 inline-flex items-center gap-2 rounded-full bg-pips-accent px-6 py-3 text-sm font-semibold text-white shadow-pips transition-colors hover:bg-pips-accent-strong"
              >
                View all market insights
                <Icon icon="ph:arrow-right-bold" className="text-xs" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Tools preview */}
      <section className="container-pips py-16">
        <SectionHeading
          title="Free trading tools"
          subtitle="The math done for you — pip value, trade profit, and the events calendar."
        />
        <RevealGroup className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {TOOLS_PREVIEW.map((t) => (
            <ToolPreviewCard key={t.id} tool={t} />
          ))}
        </RevealGroup>
      </section>

      {/* Glossary teaser */}
      <section className="bg-pips-surface-alt/60 py-16 paper-ruled">
        <div className="container-pips grid items-center gap-10 lg:grid-cols-2">
          <div>
            <SectionHeading
              title="A glossary that actually explains"
              subtitle="Every forex term with a definition, an example, and why it matters — searchable and cross-linked."
            />
            <Link
              to="/academy"
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-pips-accent px-6 py-3 text-sm font-semibold text-white shadow-pips transition-colors hover:bg-pips-accent-strong"
            >
              Explore full glossary
              <Icon icon="ph:arrow-right-bold" className="text-xs" />
            </Link>
          </div>

          <div className="card-journal p-6">
            <div className="flex items-center gap-2 rounded-xl border border-pips-line bg-pips-bg px-4 py-2.5 text-sm text-pips-muted">
              <Icon icon="ph:magnifying-glass" className="text-base" />
              Search terms…
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              {GLOSSARY_TEASER_CHIPS.map((c) => (
                <span
                  key={c}
                  className="cursor-pointer rounded-full border border-pips-line bg-pips-bg px-3 py-1 text-xs font-medium text-pips-ink-soft transition-colors hover:border-pips-accent hover:text-pips-accent"
                >
                  {c}
                </span>
              ))}
            </div>
            <div className="mt-5">
              <GlossaryCard item={GLOSSARY_SAMPLE_TERM} />
            </div>
          </div>
        </div>
      </section>

      {/* Disclaimer */}
      <section className="container-pips py-12">
        <DisclaimerBanner />
      </section>

      <ClosingCTA
        title="Ready to start learning?"
        subtitle="Free lessons, free tools, and a roadmap built for beginners. No account needed to begin."
        buttons={[
          { label: "Go to Academy", to: "/academy" },
          { label: "Explore Tools", to: "/tools", variant: "ghost" },
        ]}
      />
    </>
  );
}
