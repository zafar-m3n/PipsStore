import { useMemo, useRef, useState } from "react";
import { Icon } from "@iconify/react";
import { PageHero } from "@/components/common/PageHero.jsx";
import { RevealGroup } from "@/components/common/RevealGroup.jsx";
import { DisclaimerBanner } from "@/components/common/DisclaimerBanner.jsx";
import { ContactForm } from "@/components/common/ContactForm.jsx";
import { LevelMeter } from "@/components/common/LevelMeter.jsx";
import { ArchiveImage } from "@/components/common/ArchiveImage.jsx";
import { GlossaryCard } from "@/components/cards/GlossaryCard.jsx";
import { useSettle } from "@/hooks/useGsap.js";
import { LEARNING_PATHS } from "@/data/learningPaths.js";
import { COURSES, COURSE_LEVELS } from "@/data/courses.js";
import { GLOSSARY_TERMS, GLOSSARY_CATEGORIES } from "@/data/glossary.js";

import stereograph from "@/assets/archive/royal-exchange-stereograph.jpg";
import certificateDesign from "@/assets/archive/banknote-certificate-design.jpg";
import stockTicker from "@/assets/archive/edison-stock-ticker.jpg";
import customersRoom from "@/assets/archive/brokerage-customers-room-1902.jpg";

const KNOWN_TERMS = new Set(GLOSSARY_TERMS.map((t) => t.term.toLowerCase()));

const primaryLink =
  "chamfer inline-flex min-h-12 items-center gap-2 bg-brand px-6 text-body font-bold whitespace-nowrap text-on-brand press hover:bg-brand-hover active:bg-brand-press";

function PathsSection() {
  return (
    <section aria-labelledby="paths-title" className="container-page pb-section">
      <div className="grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <h2 id="paths-title" className="text-title font-bold text-ink">
            Learning paths
          </h2>
          <p className="mt-4 max-w-[40ch] text-body text-ink-soft sm:text-lead">
            Four paths, each an ordered outline of topics. Pick the one that fits and ask for it to be sent to you.
          </p>
          <ArchiveImage
            src={stereograph}
            width={720}
            height={832}
            alt="The columned front of the Royal Exchange in London, with carts and crowds in the street."
            caption="The Royal Exchange, London, from a stereograph card."
            className="mt-10 hidden lg:block"
            frameClassName="aspect-[4/5]"
          />
        </div>
        <ol className="flex flex-col gap-3 lg:col-span-8">
          {LEARNING_PATHS.map((p) => (
            <li key={p.id} id={p.id} aria-labelledby={`${p.id}-title`} className="panel p-6 sm:p-8">
              <h3 id={`${p.id}-title`} className="text-lead font-bold text-ink">
                {p.title}
              </h3>
              <p className="mt-3 max-w-[62ch] text-body text-ink-soft">{p.description}</p>
              <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
                <span className="flex flex-wrap items-center gap-x-6 gap-y-2">
                  <LevelMeter level={p.level} />
                  <span className="text-small text-ink-muted tabular-nums">{p.lessons} topics in this outline</span>
                </span>
                <a
                  href="#get-plan"
                  className="inline-flex min-h-11 items-center text-body font-bold text-brand underline underline-offset-4 transition-colors hover:text-brand-hover"
                >
                  Get this path sent to you
                </a>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

function TopicsSection() {
  const [level, setLevel] = useState(COURSE_LEVELS[0]);
  const tabRefs = useRef([]);
  const courses = useMemo(() => COURSES.filter((c) => c.level === level), [level]);
  const panel = useSettle(level);

  const onKeyDown = (e, i) => {
    let next = null;
    if (e.key === "ArrowRight") next = (i + 1) % COURSE_LEVELS.length;
    if (e.key === "ArrowLeft") next = (i - 1 + COURSE_LEVELS.length) % COURSE_LEVELS.length;
    if (e.key === "Home") next = 0;
    if (e.key === "End") next = COURSE_LEVELS.length - 1;
    if (next === null) return;
    e.preventDefault();
    setLevel(COURSE_LEVELS[next]);
    tabRefs.current[next]?.focus();
  };

  return (
    <section aria-labelledby="topics-title" className="band-field py-section">
      <div className="container-page">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <h2 id="topics-title" className="text-title font-bold text-ink">
              What each level covers
            </h2>
            <p className="mt-4 max-w-[56ch] text-body text-ink-soft sm:text-lead">
              The topic outline behind the paths, grouped by level. These are outlines of what we teach, not
              on-demand video courses.
            </p>
          </div>
          <ArchiveImage
            src={certificateDesign}
            width={1400}
            height={623}
            alt="A pencil design for a bank note, with ornate numeral threes and blank spaces for the bank's name."
            caption="Design for a bank note or certificate, 19th century."
            className="lg:col-span-5"
            frameClassName="aspect-[9/4]"
          />
        </div>

        <div role="tablist" aria-label="Level" className="mt-12 flex flex-wrap gap-2">
          {COURSE_LEVELS.map((lvl, i) => {
            const selected = level === lvl;
            return (
              <button
                key={lvl}
                ref={(el) => (tabRefs.current[i] = el)}
                type="button"
                role="tab"
                id={`level-tab-${lvl}`}
                aria-selected={selected}
                aria-controls="level-panel"
                tabIndex={selected ? 0 : -1}
                onClick={() => setLevel(lvl)}
                onKeyDown={(e) => onKeyDown(e, i)}
                className={[
                  "chamfer min-h-12 px-5 text-body font-bold press",
                  selected ? "bg-brand text-on-brand" : "bg-surface-1 text-ink hover:bg-surface-2",
                ].join(" ")}
              >
                {lvl}
              </button>
            );
          })}
        </div>

        <ul ref={panel} id="level-panel" role="tabpanel" aria-labelledby={`level-tab-${level}`} className="mt-6 grid gap-3 lg:grid-cols-2">
          {courses.map((c) => (
            <li key={c.id} className="panel p-6">
              <h3 className="text-lead font-bold text-ink">{c.title}</h3>
              <p className="mt-2 text-body text-ink-soft">{c.description}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function GlossarySection() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const sectionRef = useRef(null);

  const terms = useMemo(() => {
    const q = query.trim().toLowerCase();
    return GLOSSARY_TERMS.filter((t) => {
      const matchesCat = category === "All" || t.category === category;
      const matchesQuery = !q || t.term.toLowerCase().includes(q) || t.definition.toLowerCase().includes(q);
      return matchesCat && matchesQuery;
    }).sort((a, b) => (b.term.toLowerCase() === q) - (a.term.toLowerCase() === q));
  }, [query, category]);

  const lookUp = (term) => {
    setCategory("All");
    setQuery(term);
    sectionRef.current?.scrollIntoView({ block: "start" });
  };

  return (
    <section id="glossary" ref={sectionRef} aria-labelledby="glossary-title" className="container-page py-section">
      <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
        <div className="lg:col-span-8">
          <h2 id="glossary-title" className="text-title font-bold text-ink">
            Forex glossary
          </h2>
          <p className="mt-4 max-w-[56ch] text-body text-ink-soft sm:text-lead">
            {GLOSSARY_TERMS.length} terms, each with a plain definition, an example and why it matters. Search, or
            filter by topic.
          </p>
        </div>
        <ArchiveImage
          src={stockTicker}
          width={900}
          height={1113}
          alt="A brass stock ticker under a glass dome, with paper tape curling from its wheel."
          caption="Edison's stock ticker."
          className="hidden lg:col-span-3 lg:col-start-10 lg:block"
          frameClassName="aspect-square"
        />
      </div>

      <div className="mt-10 grid gap-6 lg:grid-cols-12 lg:items-end">
        <div className="lg:col-span-5">
          <label htmlFor="glossary-search" className="text-small font-bold text-ink">
            Search the glossary
          </label>
          <div className="mt-2 flex items-center gap-2 rounded-sm border border-field bg-surface-2 pr-1 pl-4 focus-within:border-brand focus-within:ring-1 focus-within:ring-brand">
            <Icon icon="ph:magnifying-glass" aria-hidden="true" className="text-ink-muted" />
            <input
              id="glossary-search"
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search terms and definitions"
              className="min-h-12 w-full bg-transparent text-body text-ink outline-none placeholder:text-ink-muted"
            />
            {query && (
              <button
                type="button"
                onClick={() => setQuery("")}
                aria-label="Clear search"
                className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-ink-muted press hover:bg-surface-3 hover:text-ink"
              >
                <Icon icon="ph:x-bold" aria-hidden="true" />
              </button>
            )}
          </div>
        </div>
        <div className="lg:col-span-7">
          <p id="glossary-filter-label" className="text-small font-bold text-ink">
            Topic
          </p>
          <div role="group" aria-labelledby="glossary-filter-label" className="mt-2 flex flex-wrap gap-2">
            {["All", ...GLOSSARY_CATEGORIES].map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setCategory(cat)}
                aria-pressed={category === cat}
                className={[
                  "chamfer min-h-11 px-4 text-small font-medium press",
                  category === cat ? "bg-brand text-on-brand" : "bg-surface-2 text-ink hover:bg-surface-3",
                ].join(" ")}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      <p aria-live="polite" className="mt-8 text-small text-ink-muted">
        {terms.length === GLOSSARY_TERMS.length
          ? `Showing all ${terms.length} terms`
          : `${terms.length} of ${GLOSSARY_TERMS.length} terms`}
      </p>

      {terms.length > 0 ? (
        <RevealGroup settleKey={category} className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {terms.map((t) => (
            <GlossaryCard key={t.term} item={t} onRelated={lookUp} knownTerms={KNOWN_TERMS} />
          ))}
        </RevealGroup>
      ) : (
        <p className="panel-raised mt-4 p-6 text-body text-ink-soft">
          No terms match that search. Try a shorter word or another topic.
        </p>
      )}
    </section>
  );
}

function GetPlanSection() {
  return (
    <section id="get-plan" aria-labelledby="get-plan-title" className="bg-surface-1 py-section">
      <div className="container-page grid gap-12 lg:grid-cols-12 lg:items-start">
        <div className="lg:col-span-5">
          <h2 id="get-plan-title" className="text-title font-bold text-ink">
            Get a path sent to you
          </h2>
          <p className="mt-4 max-w-[44ch] text-body text-ink-soft sm:text-lead">
            Tell us where you're at and we'll point you to the right path. Free, and no account needed.
          </p>
          <ArchiveImage
            src={customersRoom}
            width={1100}
            height={827}
            alt="Rows of wooden chairs in the customers' room of an early New York brokerage office."
            caption="A brokerage customers' room, New York, 1902."
            className="mt-10"
            frameClassName="aspect-[4/3]"
          />
        </div>
        <div className="lg:col-span-6 lg:col-start-7">
          <ContactForm />
        </div>
      </div>
    </section>
  );
}

export default function Academy() {
  return (
    <>
      <PageHero
        title="The Academy"
        subtitle="A free forex curriculum for beginners: four learning paths, the topics each level covers, and a glossary that explains every term."
      >
        <a href="#get-plan" className={primaryLink}>
          Get a path sent to you
          <Icon icon="ph:arrow-down-bold" aria-hidden="true" />
        </a>
      </PageHero>
      <PathsSection />
      <TopicsSection />
      <GlossarySection />
      <GetPlanSection />
      <div className="container-page py-16">
        <DisclaimerBanner />
      </div>
    </>
  );
}
