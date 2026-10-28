import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Icon } from "@iconify/react";
import { useHeroReveal, useScrollReveal, useStepRail } from "@/hooks/useGsap.js";
import DisclaimerBanner from "@/components/common/DisclaimerBanner.jsx";
import ContactForm from "@/components/common/ContactForm.jsx";
import ButtonLink from "@/components/common/ButtonLink.jsx";
import FactList from "@/components/common/FactList.jsx";
import SearchField from "@/components/common/SearchField.jsx";
import SectionIntro from "@/components/common/SectionIntro.jsx";
import RiskCard from "@/components/ui/RiskCard.jsx";
import PipResultCard from "@/components/ui/PipResultCard.jsx";
import CalendarEventCard from "@/components/ui/CalendarEventCard.jsx";
import SessionClockCard from "@/components/ui/SessionClockCard.jsx";
import TermCard from "@/components/ui/TermCard.jsx";
import PathCard from "@/components/ui/PathCard.jsx";
import EffectLayer from "@/components/effects/EffectLayer.jsx";
import { chipClass } from "@/lib/ui.js";
import { filterGlossary } from "@/lib/glossary.js";

import { LEARNING_PATHS } from "@/data/learningPaths.js";
import { ROADMAP_STEPS } from "@/data/roadmap.js";
import { TOOLS_PREVIEW } from "@/data/tools.js";
import { GLOSSARY_TERMS, GLOSSARY_TEASER_CHIPS } from "@/data/glossary.js";

const AURORA_TOKENS = { colorStops: ["brand-deep", "brand", "brand-deep"] };
const AURORA_PROPS = {
  amplitude: 0.5,
  blend: 0.7,
  speed: 0.3,
  height: 0.2,
  opacity: 0.3,
  layers: 2,
  mouseInteraction: false,
};

const tool = (id) => TOOLS_PREVIEW.find((t) => t.id === id);

/* The aurora runs up under the floating nav (-mt-20 pt-20 cancels main's offset)
   and fades into the ground at the bottom edge. */
function HeroSection() {
  const scope = useHeroReveal();

  return (
    <section ref={scope} aria-labelledby="hero-title" className="relative isolate -mt-20 overflow-hidden pt-20">
      <EffectLayer effect="aurora" tokens={AURORA_TOKENS} props={AURORA_PROPS} />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-48 bg-linear-to-b from-ground/0 to-ground"
      />

      <div className="container-page grid gap-x-8 gap-y-10 pt-14 pb-24 sm:pt-24 lg:grid-cols-12 lg:items-center lg:gap-y-12 lg:pt-28 lg:pb-32 xl:pb-48">
        <div className="lg:col-span-6">
          <h1 id="hero-title" className="text-display text-ink">
            <span className="-mb-[0.12em] block overflow-hidden pb-[0.12em]">
              <span data-hero-line className="block">
                Learn forex,
              </span>
            </span>{" "}
            <span className="-mb-[0.12em] block overflow-hidden pb-[0.12em]">
              <span data-hero-line className="block">
                <em className="text-brand">risk first.</em>
              </span>
            </span>
          </h1>
          <p className="mt-6 max-w-[44ch] text-body text-ink-soft sm:text-lead">
            PipsStore is a free education platform for complete beginners. We teach market basics, risk management and
            chart reading in plain language. No signals, no profit promises, ever.
          </p>
        </div>

        <div id="plan" data-hero-rise className="relative isolate lg:col-span-5 lg:col-start-8 lg:row-span-2">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -inset-x-10 -inset-y-12 -z-10 hidden rounded-full bg-brand-deep/50 blur-3xl lg:block"
          />
          <div
            aria-hidden="true"
            inert
            data-parallax="18"
            className="pointer-events-none absolute -top-24 right-6 -z-10 hidden w-60 rotate-3 xl:block"
          >
            <TermCard term="Spread" />
          </div>
          <div
            aria-hidden="true"
            inert
            data-parallax="32"
            className="pointer-events-none absolute -bottom-24 left-6 -z-10 hidden w-64 -rotate-2 xl:block"
          >
            <PipResultCard />
          </div>
          <ContactForm
            surface="glass"
            heading="Start with a free learning plan"
            blurb="Tell us where you're at and we'll point you to the right path."
          />
        </div>

        <FactList
          variant="inline"
          data-hero-rise
          className="border-t border-line pt-6 lg:col-span-6 lg:col-start-1 lg:row-start-2 lg:self-start"
        />
      </div>
    </section>
  );
}

/* A bento tile: one card surface, a heading and sentence, an optional preview
   well (bare UI-card content, so cards never nest), and one way onward. */
function Tile({ title, children, preview, link, className = "" }) {
  return (
    <article className={["card flex flex-col p-6 sm:p-7", className].join(" ")}>
      <h3 className="text-lead font-semibold text-ink">{title}</h3>
      <div className="mt-2 text-body text-ink-soft">{children}</div>
      {preview && <div className="mt-6 rounded-lg bg-ground/70 p-4 ring-1 ring-line sm:p-5">{preview}</div>}
      {link && (
        <Link
          to={link.to}
          className="group mt-auto inline-flex min-h-11 items-center gap-2 self-start pt-6 text-small font-semibold text-brand hover:text-brand-hover"
        >
          {link.label}
          <Icon icon="ph:arrow-right-bold" aria-hidden="true" className="transition-transform group-hover:translate-x-0.5" />
        </Link>
      )}
    </article>
  );
}

function RoadmapTile({ className = "" }) {
  const rail = useStepRail();

  return (
    <article id="roadmap" className={["card flex flex-col p-6 sm:p-8", className].join(" ")}>
      <h3 className="text-title text-ink">The beginner roadmap</h3>
      <p className="mt-3 max-w-[48ch] text-body text-ink-soft">
        Five steps, in this order. Risk comes second, before any chart reading or strategy, and stays with you from then on.
      </p>
      <div ref={rail} className="relative mt-8 flex flex-1 flex-col">
        <span aria-hidden="true" className="absolute top-0 bottom-0 left-0 w-px bg-line">
          <span data-rail className="block h-full w-full origin-top bg-brand" />
        </span>
        <ol className="flex flex-1 flex-col justify-between">
        {ROADMAP_STEPS.map((s) => (
          <li
            key={s.step}
            data-step
            className="group grid grid-cols-[3rem_1fr] gap-x-3 border-t border-line py-4 lg:py-5"
          >
            <span className="pt-0.5 pl-4 font-mono text-small text-ink-muted transition-colors duration-300 group-data-[reached]:text-brand">
              0{s.step}
            </span>
            <div>
              <p className="flex flex-wrap items-center gap-2 text-body font-semibold text-ink">
                <Icon icon={s.icon} aria-hidden="true" className="shrink-0 text-brand" />
                {s.title}
                {s.step === 2 && (
                  <span className="rounded-full bg-brand-deep px-2.5 py-0.5 text-micro font-medium text-ink">Before any strategy</span>
                )}
              </p>
              <p className="mt-1 text-small text-ink-soft">{s.description}</p>
            </div>
          </li>
        ))}
        </ol>
      </div>
      <div className="pt-6">
        <ButtonLink to="/academy">See the learning paths</ButtonLink>
      </div>
    </article>
  );
}

function GlossaryTile({ className = "" }) {
  const [query, setQuery] = useState("");

  const { results, total } = useMemo(() => {
    const matches = query.trim()
      ? filterGlossary(GLOSSARY_TERMS, { query })
      : GLOSSARY_TERMS.filter((t) => GLOSSARY_TEASER_CHIPS.includes(t.term));
    return { results: matches.slice(0, 2), total: matches.length };
  }, [query]);

  return (
    <article className={["card flex flex-col p-6 sm:p-7", className].join(" ")}>
      <h3 className="text-lead font-semibold text-ink">Look up any term</h3>
      <p className="mt-2 text-body text-ink-soft">
        Every entry in the glossary has a plain definition, an example and why it matters. Try it here.
      </p>
      <div className="mt-6 grid gap-6 md:grid-cols-2">
        <div>
          <SearchField
            id="home-glossary-search"
            label="Search the glossary"
            value={query}
            onChange={setQuery}
            placeholder="Try pip or leverage"
          />
          <div className="mt-4 flex flex-wrap gap-2">
            {GLOSSARY_TEASER_CHIPS.slice(0, 6).map((c) => (
              <button
                key={c}
                type="button"
                onClick={() => setQuery(query === c ? "" : c)}
                aria-pressed={query === c}
                className={chipClass(query === c)}
              >
                {c}
              </button>
            ))}
          </div>
        </div>
        <div>
          <p aria-live="polite" className="text-small text-ink-muted">
            {query.trim()
              ? `${total} matching ${total === 1 ? "term" : "terms"}${total > 2 ? ", showing the first 2" : ""}`
              : "A few terms beginners ask about first"}
          </p>
          {results.length > 0 ? (
            <ul className="mt-3 flex flex-col gap-2">
              {results.map((t) => (
                <li key={t.term} className="rounded-lg bg-ground/70 p-4 ring-1 ring-line">
                  <div className="flex items-baseline justify-between gap-3">
                    <p className="font-display text-[1.5rem] leading-none text-ink">{t.term}</p>
                    <span className="text-micro text-ink-muted">{t.category}</span>
                  </div>
                  <p className="mt-2 text-small text-ink-soft">{t.definition}</p>
                </li>
              ))}
            </ul>
          ) : (
            <p className="mt-3 rounded-lg bg-ground/70 p-4 text-small text-ink-soft ring-1 ring-line">
              No term matches “{query.trim()}”. Try a shorter word, or open the full glossary.
            </p>
          )}
        </div>
      </div>
      <Link
        to="/academy#glossary"
        className="group mt-auto inline-flex min-h-11 items-center gap-2 self-start pt-6 text-small font-semibold text-brand hover:text-brand-hover"
      >
        Open the full glossary
        <Icon icon="ph:arrow-right-bold" aria-hidden="true" className="transition-transform group-hover:translate-x-0.5" />
      </Link>
    </article>
  );
}

function PlanTile({ className = "" }) {
  return (
    <article className={["card flex flex-col justify-between gap-8 p-6 sm:p-8", className].join(" ")}>
      <div>
        <h3 className="text-title text-ink">
          Not sure where to start? <em className="text-brand">Ask us.</em>
        </h3>
        <p className="mt-3 max-w-[48ch] text-body text-ink-soft">
          Tell us where you're at and we'll point you to the right path. Free, and no account needed.
        </p>
      </div>
      <div className="flex flex-col gap-6">
        <ul className="flex flex-wrap gap-2" aria-label="The four learning paths">
          {LEARNING_PATHS.map((p) => (
            <li key={p.id} className="inline-flex items-center gap-2 rounded-full border border-line px-3 py-1.5 text-small text-ink-soft">
              <Icon icon={p.icon} aria-hidden="true" className="text-brand" />
              {p.title}
            </li>
          ))}
        </ul>
        <div>
          <ButtonLink href="#plan">Get a free learning plan</ButtonLink>
        </div>
      </div>
    </article>
  );
}

function BentoSection() {
  const grid = useScrollReveal(":scope > *");
  const pip = tool("pip-calculator");
  const news = tool("market-news");
  const calendar = tool("economic-calendar");

  return (
    <section aria-labelledby="bento-title" className="container-page pb-section">
      <SectionIntro
        id="bento-title"
        title={
          <>
            Everything a beginner needs, <em>in the right order.</em>
          </>
        }
        width="52ch"
      >
        Lessons, two calculators and live market context, arranged so risk comes before any strategy.
      </SectionIntro>

      <div ref={grid} className="mt-12 grid gap-4 lg:grid-cols-12">
        <RoadmapTile className="lg:col-span-7 lg:row-span-2" />
        <Tile
          title={pip.title}
          preview={<PipResultCard bare />}
          link={{ to: `/tools#${pip.id}`, label: "Open the pip calculator" }}
          className="lg:col-span-5"
        >
          {pip.description}
        </Tile>
        <Tile
          title="Size every trade by risk"
          preview={<RiskCard bare />}
          link={{ to: "/tools", label: "Open the calculators" }}
          className="lg:col-span-5"
        >
          Decide what you can afford to lose first. The stop distance then tells you the position size.
        </Tile>
        <GlossaryTile className="lg:col-span-7" />
        <Tile
          title={calendar.title}
          preview={<CalendarEventCard bare />}
          link={{ to: calendar.to, label: "See the calendar" }}
          className="lg:col-span-5"
        >
          {calendar.description}
        </Tile>
        <PlanTile className="lg:col-span-7" />
        <Tile
          title="Know when markets are open"
          preview={<SessionClockCard bare />}
          link={{ to: news.to, label: "See the market context" }}
          className="lg:col-span-5"
        >
          The four main forex sessions, shown live in UTC, so you know which markets are trading right now.
        </Tile>
      </div>
    </section>
  );
}

function PathsSection() {
  const list = useScrollReveal(":scope > li");

  return (
    <section aria-labelledby="paths-title" className="section-lit py-section">
      <div className="container-page">
        <div className="grid gap-6 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <SectionIntro id="paths-title" title="Four learning paths" width="48ch">
              Taken in order: the basics first, then risk, then charts, then the news that moves them.
            </SectionIntro>
          </div>
          <div className="lg:col-span-5 lg:justify-self-end">
            <ButtonLink to="/academy">See every path</ButtonLink>
          </div>
        </div>
        <ul ref={list} className="mt-12 grid gap-4 md:grid-cols-2">
          {LEARNING_PATHS.map((p, i) => (
            <li key={p.id}>
              <Link
                to={`/academy#${p.id}`}
                aria-label={`${p.title}: see the path outline`}
                className="group block h-full rounded-lg press-soft"
              >
                <PathCard id={p.id} label={`Path ${i + 1} of ${LEARNING_PATHS.length}`} linked className="h-full p-6 sm:p-7" />
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function Home() {
  return (
    <>
      <HeroSection />
      <BentoSection />
      <PathsSection />
      <div className="container-page py-16">
        <DisclaimerBanner />
      </div>
    </>
  );
}

export default Home;
