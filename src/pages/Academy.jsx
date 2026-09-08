import { useMemo, useState } from "react";
import { Icon } from "@iconify/react";
import { PageHero } from "@/components/common/PageHero.jsx";
import { SectionHeading } from "@/components/common/SectionHeading.jsx";
import { RevealGroup } from "@/components/common/RevealGroup.jsx";
import { DisclaimerBanner } from "@/components/common/DisclaimerBanner.jsx";
import { ClosingCTA } from "@/components/common/ClosingCTA.jsx";
import { CourseCard } from "@/components/cards/CourseCard.jsx";
import { GlossaryCard } from "@/components/cards/GlossaryCard.jsx";
import { COURSES, COURSE_LEVELS } from "@/data/courses.js";
import { GLOSSARY_TERMS, GLOSSARY_CATEGORIES } from "@/data/glossary.js";

function LevelTabs({ value, onChange }) {
  return (
    <div className="inline-flex flex-wrap gap-1 rounded-full border border-pips-line bg-pips-surface p-1">
      {COURSE_LEVELS.map((lvl) => (
        <button
          key={lvl}
          type="button"
          onClick={() => onChange(lvl)}
          className={[
            "rounded-full px-4 py-2 text-sm font-semibold transition-colors",
            value === lvl
              ? "bg-pips-accent text-white"
              : "text-pips-ink-soft hover:text-pips-accent",
          ].join(" ")}
        >
          {lvl}
        </button>
      ))}
    </div>
  );
}

export default function Academy() {
  const [level, setLevel] = useState("Beginner");
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");

  const courses = useMemo(
    () => COURSES.filter((c) => c.level === level),
    [level],
  );

  const terms = useMemo(() => {
    const q = query.trim().toLowerCase();
    return GLOSSARY_TERMS.filter((t) => {
      const matchesCat = category === "All" || t.category === category;
      const matchesQuery =
        !q ||
        t.term.toLowerCase().includes(q) ||
        t.definition.toLowerCase().includes(q);
      return matchesCat && matchesQuery;
    });
  }, [query, category]);

  return (
    <>
      <PageHero
        title="The Academy"
        subtitle="Structured courses grouped by level, plus a glossary that explains every term with an example and why it matters."
      />

      {/* Courses */}
      <section className="container-pips py-16">
        <SectionHeading
          title="Courses by level"
          subtitle="Start at Beginner and work through in order. Each course lists its length and lesson count."
        />
        <div className="mt-6">
          <LevelTabs value={level} onChange={setLevel} />
        </div>
        <RevealGroup
          key={level}
          className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {courses.map((c) => (
            <CourseCard key={c.id} course={c} />
          ))}
        </RevealGroup>
      </section>

      {/* Glossary */}
      <section className="bg-pips-surface-alt/60 py-16 paper-ruled">
        <div className="container-pips">
          <SectionHeading
            title="Forex glossary"
            subtitle="Search by keyword or filter by category. Every entry links to related terms."
          />

          <div className="mt-6 space-y-4">
            <div className="flex items-center gap-2 rounded-xl border border-pips-line bg-pips-surface px-4 py-2.5 shadow-pips">
              <Icon
                icon="ph:magnifying-glass"
                className="text-base text-pips-muted"
              />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search terms and definitions…"
                className="w-full bg-transparent text-sm text-pips-ink outline-none placeholder:text-pips-muted/70"
              />
              {query && (
                <button
                  type="button"
                  onClick={() => setQuery("")}
                  aria-label="Clear search"
                  className="text-pips-muted hover:text-pips-ink"
                >
                  <Icon icon="ph:x-bold" className="text-sm" />
                </button>
              )}
            </div>

            <div className="flex flex-wrap gap-2">
              {["All", ...GLOSSARY_CATEGORIES].map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setCategory(cat)}
                  className={[
                    "rounded-full border px-3 py-1.5 text-xs font-semibold transition-colors",
                    category === cat
                      ? "border-pips-accent bg-pips-accent text-white"
                      : "border-pips-line bg-pips-surface text-pips-ink-soft hover:border-pips-accent hover:text-pips-accent",
                  ].join(" ")}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {terms.length > 0 ? (
            <RevealGroup
              key={`${category}-${query}`}
              className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
            >
              {terms.map((t) => (
                <GlossaryCard key={t.term} item={t} />
              ))}
            </RevealGroup>
          ) : (
            <p className="card-journal mt-10 px-5 py-8 text-center text-sm text-pips-muted">
              No terms match that search. Try a different keyword or category.
            </p>
          )}
        </div>
      </section>

      <section className="container-pips py-12">
        <DisclaimerBanner />
      </section>

      <ClosingCTA
        title="Keep going"
        subtitle="Pair the courses with the free tools and this week's market insights."
        buttons={[
          { label: "Explore Tools", to: "/tools" },
          { label: "Market Insights", to: "/markets", variant: "ghost" },
        ]}
      />
    </>
  );
}
