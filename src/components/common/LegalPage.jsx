import { Icon } from "@iconify/react";
import { PageHero } from "@/components/common/PageHero.jsx";
import { IconTile } from "@/components/common/IconTile.jsx";
import { Callout } from "@/components/common/Callout.jsx";
import { DisclaimerBanner } from "@/components/common/DisclaimerBanner.jsx";

const slug = (text) =>
  text
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

/* Shared shell for Privacy Policy and Terms & Conditions: a reading column on
   the page's left margin, with a contents list beside it. */
export function LegalPage({ title, subtitle, lastUpdated, intro, summary = [], sections = [], closing }) {
  return (
    <>
      <PageHero title={title} subtitle={subtitle} lastUpdated={lastUpdated} />

      <div className="container-page pb-16">
        <p className="max-w-[68ch] text-body text-ink">{intro}</p>
      </div>

      {summary.length > 0 && (
        <section aria-label="In brief" className="bg-surface-1 py-16">
          <div className="container-page grid gap-x-12 gap-y-10 sm:grid-cols-3">
            {summary.map((s) => (
              <IconTile key={s.title} icon={s.icon} title={s.title} description={s.description} />
            ))}
          </div>
        </section>
      )}

      <div className="container-page grid gap-12 py-section lg:grid-cols-12">
        <nav aria-labelledby="legal-contents" className="lg:order-last lg:col-span-4 lg:col-start-9">
          <div className="panel p-6 lg:sticky lg:top-24">
            <h2 id="legal-contents" className="text-body font-bold text-ink">
              On this page
            </h2>
            <ol className="mt-3 flex list-decimal flex-col pl-6 marker:text-ink-muted">
              {sections.map((sec) => (
                <li key={sec.heading} className="pl-1 text-small">
                  <a
                    href={`#${slug(sec.heading)}`}
                    className="inline-flex min-h-9 items-center text-ink-soft transition-colors hover:text-brand"
                  >
                    {sec.heading}
                  </a>
                </li>
              ))}
            </ol>
          </div>
        </nav>

        <div className="min-w-0 lg:col-span-7">
          <ol className="max-w-[68ch] list-decimal space-y-12 pl-8 marker:font-bold marker:text-ink-muted">
            {sections.map((sec) => (
              <li key={sec.heading} id={slug(sec.heading)} className="pl-2 text-lead">
                <h2 className="text-lead font-bold text-ink">{sec.heading}</h2>
                <div className="mt-3 space-y-4">
                  {sec.body.map((p, j) => (
                    <p key={j} className="text-body text-ink-soft">
                      {p}
                    </p>
                  ))}
                </div>
                {sec.callout && (
                  <Callout tone="warn" label="Important" icon="ph:warning" className="mt-5">
                    {sec.callout}
                  </Callout>
                )}
              </li>
            ))}
          </ol>

          {closing && (
            <section aria-labelledby="legal-closing" className="panel mt-16 max-w-[68ch] p-6 sm:p-8">
              <h2 id="legal-closing" className="flex items-center gap-3 text-lead font-bold text-ink">
                <Icon icon={closing.icon || "ph:chat-circle-text"} aria-hidden="true" className="text-brand" />
                {closing.heading}
              </h2>
              <p className="mt-3 text-body text-ink-soft">{closing.body}</p>
            </section>
          )}

          <div className="mt-12 max-w-[68ch]">
            <DisclaimerBanner />
          </div>
        </div>
      </div>
    </>
  );
}

export default LegalPage;
