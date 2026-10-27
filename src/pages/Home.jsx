import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Icon } from "@iconify/react";
import { useHeroReveal, useScrollReveal } from "@/hooks/useGsap.js";
import { RoadmapJourney } from "@/components/common/RoadmapJourney.jsx";
import { DisclaimerBanner } from "@/components/common/DisclaimerBanner.jsx";
import { ContactForm } from "@/components/common/ContactForm.jsx";
import { LevelMeter } from "@/components/common/LevelMeter.jsx";
import { ArchiveImage } from "@/components/common/ArchiveImage.jsx";

import { LEARNING_PATHS } from "@/data/learningPaths.js";
import { ROADMAP_STEPS } from "@/data/roadmap.js";
import { TOOLS_PREVIEW } from "@/data/tools.js";
import { GLOSSARY_TERMS, GLOSSARY_TEASER_CHIPS } from "@/data/glossary.js";
import { SITE_FACTS } from "@/data/facts.js";

import royalExchange from "@/assets/archive/royal-exchange.jpg";
import stockTicker from "@/assets/archive/edison-stock-ticker.jpg";
import banknoteDesign from "@/assets/archive/banknote-design.jpg";
import customersRoom from "@/assets/archive/brokerage-customers-room-1902.jpg";

const primaryLink =
  "chamfer inline-flex min-h-12 items-center gap-2 bg-brand px-6 text-body font-bold whitespace-nowrap text-on-brand press hover:bg-brand-hover active:bg-brand-press";

function HeroSection() {
  const scope = useHeroReveal();

  return (
    <section ref={scope} className="relative overflow-hidden">
      <div className="container-page pt-12 sm:pt-20">
        <h1 className="text-display text-ink">
          Learn forex, risk first.
        </h1>
      </div>

      <div className="container-page grid gap-12 pt-8 pb-section sm:pt-12 lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-5">
          <p className="max-w-[46ch] text-body text-ink sm:text-lead">
            PipsStore is a free education platform for complete beginners. We teach market basics, risk management and
            chart reading in plain language. No signals, no profit promises, ever.
          </p>
          <dl data-hero-rise className="mt-10 grid max-w-md grid-cols-2 gap-x-8 gap-y-6">
            {SITE_FACTS.map((f) => (
              <div key={f.label} className="flex flex-col-reverse">
                <dt className="text-small text-ink-soft">{f.label}</dt>
                <dd className="text-title font-bold text-ink tabular-nums">{f.value}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div data-hero-rise className="relative -mx-gutter px-gutter py-8 lg:col-span-7 lg:mx-0 lg:py-10 lg:pr-0 lg:pl-12">
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-band [border-top-left-radius:48px] [corner-shape:bevel] lg:-right-[50vw] lg:[border-top-left-radius:112px]"
          />
          <div className="relative max-w-xl">
            <ContactForm
              heading="Start with a free learning plan"
              blurb="Tell us where you're at and we'll point you to the right path."
            />
          </div>
        </div>
      </div>
    </section>
  );
}

function RoadmapSection() {
  return (
    <section id="roadmap" aria-labelledby="roadmap-title" className="container-page pb-section">
      <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
        <div className="lg:col-span-6">
          <h2 id="roadmap-title" className="text-title font-bold text-ink">
            The beginner roadmap
          </h2>
          <p className="mt-4 max-w-[52ch] text-body text-ink-soft sm:text-lead">
            Five steps, in this order. Risk comes second, before any chart reading or strategy, and stays with you
            from then on.
          </p>
          <div className="mt-8">
            <Link to="/academy" className={primaryLink}>
              See the learning paths
              <Icon icon="ph:arrow-right-bold" aria-hidden="true" />
            </Link>
          </div>
        </div>
        <ArchiveImage
          src={customersRoom}
          width={1100}
          height={827}
          alt="Rows of wooden chairs in the customers' room of an early New York brokerage office."
          caption="A brokerage customers' room, New York, 1902."
          className="lg:col-span-6"
          frameClassName="aspect-[4/3]"
        />
      </div>
      <RoadmapJourney steps={ROADMAP_STEPS} />
    </section>
  );
}

function PathsSection() {
  const list = useScrollReveal(":scope > li");

  return (
    <section aria-labelledby="paths-title" className="band-field py-section">
      <div className="container-page grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <h2 id="paths-title" className="text-title font-bold text-ink">
            Four learning paths
          </h2>
          <p className="mt-4 max-w-[40ch] text-body text-ink-soft sm:text-lead">
            Each path is an ordered outline of topics, from your first chart to a written trading plan.
          </p>
          <ArchiveImage
            src={banknoteDesign}
            width={1400}
            height={643}
            alt="An ornate engraved banknote design with scrollwork and a numeral five."
            caption="Design for a banknote, 19th century."
            className="mt-10"
            frameClassName="aspect-[2/1]"
          />
        </div>
        <ul ref={list} className="flex flex-col gap-3 lg:col-span-8">
          {LEARNING_PATHS.map((p) => (
            <li key={p.id}>
              <Link
                to={`/academy#${p.id}`}
                className="panel group grid gap-3 p-6 press-soft hover:bg-surface-2 sm:grid-cols-[1fr_auto] sm:gap-x-8 sm:p-8"
              >
                <div>
                  <h3 className="flex items-center gap-3 text-lead font-bold text-ink">
                    <Icon icon={p.icon} aria-hidden="true" className="shrink-0 text-brand" />
                    {p.title}
                  </h3>
                  <p className="mt-2 max-w-[60ch] text-body text-ink-soft">{p.description}</p>
                </div>
                <div className="flex items-center gap-6 sm:flex-col sm:items-end sm:justify-between">
                  <LevelMeter level={p.level} />
                  <span className="inline-flex items-center gap-2 text-small font-bold text-brand">
                    <span className="tabular-nums">{p.lessons} topics</span>
                    <Icon icon="ph:arrow-right-bold" aria-hidden="true" className="transition-transform group-hover:translate-x-0.5" />
                  </span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function ToolsSection() {
  const list = useScrollReveal(":scope > li");

  return (
    <section aria-labelledby="tools-title" className="container-page py-section">
      <div className="grid gap-12 lg:grid-cols-12 lg:items-center">
        <div className="order-last grid grid-cols-5 gap-3 lg:order-none lg:col-span-6">
          <ArchiveImage
            src={royalExchange}
            width={843}
            height={542}
            alt="Horse-drawn traffic crowding the street in front of the columned Royal Exchange in London."
            caption="The Royal Exchange, London, late 1800s."
            className="col-span-3"
            frameClassName="aspect-[3/4]"
          />
          <ArchiveImage
            src={stockTicker}
            width={900}
            height={1113}
            alt="A brass stock ticker under a glass dome, with paper tape curling from its wheel."
            caption="Edison's stock ticker."
            className="col-span-2 self-end"
            frameClassName="aspect-[3/4]"
          />
        </div>
        <div className="lg:col-span-6">
          <h2 id="tools-title" className="text-title font-bold text-ink">
            Practise with real tools
          </h2>
          <p className="mt-4 max-w-[52ch] text-body text-ink-soft sm:text-lead">
            Two calculators for the numbers behind a trade, and a live news feed and calendar for the events that move
            currencies.
          </p>
          <ul ref={list} className="mt-8 flex flex-col gap-2">
            {TOOLS_PREVIEW.map((t) => (
              <li key={t.id}>
                <Link
                  to={t.to || `/tools#${t.id}`}
                  className="chamfer group flex min-h-14 items-center gap-4 bg-surface-1 px-5 py-3 press-soft hover:bg-surface-2"
                >
                  <Icon icon={t.icon} aria-hidden="true" className="shrink-0 text-lead text-brand" />
                  <span className="flex-1">
                    <span className="block text-body font-bold text-ink">{t.title}</span>
                    <span className="block text-small text-ink-soft">{t.description}</span>
                  </span>
                  <Icon icon="ph:arrow-right-bold" aria-hidden="true" className="shrink-0 text-ink-muted transition-transform group-hover:translate-x-0.5" />
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-8">
            <Link to="/tools" className={primaryLink}>
              Open the calculators
              <Icon icon="ph:arrow-right-bold" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

function GlossarySection() {
  const [query, setQuery] = useState("");

  const { results, total } = useMemo(() => {
    const q = query.trim().toLowerCase();
    const matches = q
      ? GLOSSARY_TERMS.filter(
          (t) => t.term.toLowerCase().includes(q) || t.definition.toLowerCase().includes(q),
        )
      : GLOSSARY_TERMS.filter((t) => GLOSSARY_TEASER_CHIPS.includes(t.term));
    return { results: matches.slice(0, 3), total: matches.length };
  }, [query]);

  return (
    <section aria-labelledby="glossary-title" className="bg-surface-1 py-section">
      <div className="container-page">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <h2 id="glossary-title" className="text-title font-bold text-ink">
              Look up any term
            </h2>
            <p className="mt-4 max-w-[52ch] text-body text-ink-soft sm:text-lead">
              Every entry in the glossary has a plain definition, an example and why it matters. Try it here.
            </p>
          </div>
          <div className="lg:col-span-5 lg:justify-self-end">
            <Link to="/academy#glossary" className={primaryLink}>
              Open the full glossary
              <Icon icon="ph:arrow-right-bold" aria-hidden="true" />
            </Link>
          </div>
        </div>

        <div className="mt-12 grid gap-8 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <label htmlFor="home-glossary-search" className="text-small font-bold text-ink">
              Search the glossary
            </label>
            <div className="mt-2 flex items-center gap-2 rounded-sm border border-field bg-surface-2 px-4 focus-within:border-brand focus-within:ring-1 focus-within:ring-brand">
              <Icon icon="ph:magnifying-glass" aria-hidden="true" className="text-ink-muted" />
              <input
                id="home-glossary-search"
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Try pip, leverage or stop loss"
                className="min-h-12 w-full bg-transparent text-body text-ink outline-none placeholder:text-ink-muted"
              />
            </div>
            <p className="mt-6 text-small text-ink-soft">Common terms</p>
            <div className="mt-2 flex flex-wrap gap-2">
              {GLOSSARY_TEASER_CHIPS.map((c) => (
                <button
                  key={c}
                  type="button"
                  onClick={() => setQuery(query === c ? "" : c)}
                  aria-pressed={query === c}
                  className={[
                    "chamfer min-h-11 px-4 text-small font-medium press",
                    query === c ? "bg-brand text-on-brand" : "bg-surface-2 text-ink hover:bg-surface-3",
                  ].join(" ")}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>

          <div className="lg:col-span-7">
            <p aria-live="polite" className="text-small text-ink-muted">
              {query.trim()
                ? `${total} matching ${total === 1 ? "term" : "terms"}${total > 3 ? ", showing the first 3" : ""}`
                : "A few terms beginners ask about first"}
            </p>
            {results.length > 0 ? (
              <ul className="mt-3 flex flex-col gap-2">
                {results.map((t) => (
                  <li key={t.term} className="panel-raised p-5">
                    <div className="flex items-baseline justify-between gap-4">
                      <h3 className="text-lead font-bold text-ink">{t.term}</h3>
                      <span className="text-small text-ink-muted">{t.category}</span>
                    </div>
                    <p className="mt-2 text-body text-ink-soft">{t.definition}</p>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="panel-raised mt-3 p-5 text-body text-ink-soft">
                No term matches “{query.trim()}”. Try a shorter word, or open the full glossary.
              </p>
            )}
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
      <RoadmapSection />
      <PathsSection />
      <ToolsSection />
      <GlossarySection />
      <div className="container-page py-16">
        <DisclaimerBanner />
      </div>
    </>
  );
}
