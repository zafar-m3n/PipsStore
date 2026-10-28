import { useMemo, useRef, useState } from "react";
import PageHero from "@/components/common/PageHero.jsx";
import Chapter from "@/components/common/Chapter.jsx";
import RevealGroup from "@/components/common/RevealGroup.jsx";
import DisclaimerBanner from "@/components/common/DisclaimerBanner.jsx";
import ContactForm from "@/components/common/ContactForm.jsx";
import LevelMeter from "@/components/common/LevelMeter.jsx";
import ImagePlaceholder from "@/components/common/ImagePlaceholder.jsx";
import ButtonLink from "@/components/common/ButtonLink.jsx";
import SearchField from "@/components/common/SearchField.jsx";
import TermCard from "@/components/ui/TermCard.jsx";
import GlossaryCard from "@/components/cards/GlossaryCard.jsx";
import { useSettle } from "@/hooks/useGsap.js";
import { LEARNING_PATHS } from "@/data/learningPaths.js";
import { COURSES, COURSE_LEVELS } from "@/data/courses.js";
import { GLOSSARY_TERMS, GLOSSARY_CATEGORIES } from "@/data/glossary.js";
import { chipClass, tabClass } from "@/lib/ui.js";
import { filterGlossary } from "@/lib/glossary.js";

const KNOWN_TERMS = new Set(GLOSSARY_TERMS.map((t) => t.term.toLowerCase()));

function PathsChapter() {
  return (
    <Chapter
      titleId="paths-title"
      title="Learning paths"
      intro="Four paths, each an ordered outline of topics. Pick the one that fits and ask for it to be sent to you."
      aside={
        <ButtonLink href="#get-plan" icon="ph:arrow-down-bold">
          Get a path sent to you
        </ButtonLink>
      }
      className="pt-0"
    >
      <ol className="flex flex-col gap-4">
        {LEARNING_PATHS.map((p) => (
          <li key={p.id} id={p.id} aria-labelledby={`${p.id}-title`} className="card p-6 sm:p-8">
            <h3 id={`${p.id}-title`} className="text-lead font-semibold text-ink">
              {p.title}
            </h3>
            <p className="mt-3 max-w-[62ch] text-body text-ink-soft">{p.description}</p>
            <div className="mt-6 flex flex-wrap items-center justify-between gap-4 border-t border-line pt-5">
              <span className="flex flex-wrap items-center gap-x-6 gap-y-2">
                <LevelMeter level={p.level} />
                <span className="font-mono text-small text-ink-muted">{p.lessons} topics in this outline</span>
              </span>
              <a
                href="#get-plan"
                className="inline-flex min-h-11 items-center text-small font-semibold text-brand underline transition-colors hover:text-brand-hover"
              >
                Get this path sent to you
              </a>
            </div>
          </li>
        ))}
      </ol>
    </Chapter>
  );
}

function TopicsChapter() {
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
    <Chapter
      titleId="topics-title"
      title="What each level covers"
      intro="The topic outline behind the paths, grouped by level. These are outlines of what we teach, not on-demand video courses."
      aside={
        <div role="tablist" aria-label="Level" className="flex flex-wrap gap-2">
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
                className={tabClass(selected)}
              >
                {lvl}
              </button>
            );
          })}
        </div>
      }
      lit
    >
      <ul ref={panel} id="level-panel" role="tabpanel" aria-labelledby={`level-tab-${level}`} className="grid gap-4 md:grid-cols-2">
        {courses.map((c) => (
          <li key={c.id} className="card p-6">
            <h3 className="text-lead font-semibold text-ink">{c.title}</h3>
            <p className="mt-2 text-body text-ink-soft">{c.description}</p>
          </li>
        ))}
      </ul>
      <div className="mt-4 grid gap-4 md:grid-cols-2">
        <TermCard term="Pip" />
        <TermCard term="Lot" />
      </div>
    </Chapter>
  );
}

function GlossaryChapter() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");

  const terms = useMemo(() => filterGlossary(GLOSSARY_TERMS, { query, category }), [query, category]);

  const lookUp = (term) => {
    setCategory("All");
    setQuery(term);
    document.getElementById("glossary")?.scrollIntoView({ block: "start" });
  };

  return (
    <Chapter
      id="glossary"
      titleId="glossary-title"
      title="Forex glossary"
      intro={`${GLOSSARY_TERMS.length} terms, each with a plain definition, an example and why it matters. Search, or filter by topic.`}
      aside={
        <div className="flex flex-col gap-6">
          <div>
            <SearchField
              id="glossary-search"
              label="Search the glossary"
              value={query}
              onChange={setQuery}
              placeholder="Search terms and definitions"
              clearable
            />
          </div>
          <div>
            <p id="glossary-filter-label" className="text-small font-semibold text-ink">
              Topic
            </p>
            <div role="group" aria-labelledby="glossary-filter-label" className="mt-2 flex flex-wrap gap-2">
              {["All", ...GLOSSARY_CATEGORIES].map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setCategory(cat)}
                  aria-pressed={category === cat}
                  className={chipClass(category === cat)}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
          <p aria-live="polite" className="text-small text-ink-muted">
            {terms.length === GLOSSARY_TERMS.length
              ? `Showing all ${terms.length} terms`
              : `${terms.length} of ${GLOSSARY_TERMS.length} terms`}
          </p>
        </div>
      }
    >
      {terms.length > 0 ? (
        <RevealGroup settleKey={category} className="grid gap-4 md:grid-cols-2">
          {terms.map((t) => (
            <GlossaryCard key={t.term} item={t} onRelated={lookUp} knownTerms={KNOWN_TERMS} />
          ))}
        </RevealGroup>
      ) : (
        <p className="card-raised p-6 text-body text-ink-soft">No terms match that search. Try a shorter word or another topic.</p>
      )}
    </Chapter>
  );
}

function GetPlanChapter() {
  return (
    <Chapter
      id="get-plan"
      titleId="get-plan-title"
      title="Get a path sent to you"
      intro="Tell us where you're at and we'll point you to the right path. Free, and no account needed."
      introWidth="44ch"
      aside={
        <ImagePlaceholder
          aspect="aspect-4/3"
          className="hidden lg:block"
          description="A person reading an email on their phone, a printed one-page study plan on the desk beside them; relaxed, unhurried."
        />
      }
      lit
    >
      <div className="max-w-2xl">
        <ContactForm />
      </div>
    </Chapter>
  );
}

function Academy() {
  return (
    <>
      <PageHero
        title="The Academy"
        subtitle="A free forex curriculum for beginners: four learning paths, the topics each level covers, and a glossary that explains every term."
      >
        <ButtonLink href="#get-plan" icon="ph:arrow-down-bold">
          Get a path sent to you
        </ButtonLink>
      </PageHero>
      <PathsChapter />
      <TopicsChapter />
      <GlossaryChapter />
      <GetPlanChapter />
      <div className="container-page py-16">
        <DisclaimerBanner />
      </div>
    </>
  );
}

export default Academy;
