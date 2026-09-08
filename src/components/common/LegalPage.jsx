import { Icon } from "@iconify/react";
import { PageHero } from "@/components/common/PageHero.jsx";
import { IconTile } from "@/components/common/IconTile.jsx";
import { Callout } from "@/components/common/Callout.jsx";
import { DisclaimerBanner } from "@/components/common/DisclaimerBanner.jsx";

/* Shared shell for Privacy Policy and Terms & Conditions. */
export function LegalPage({
  title,
  lastUpdated,
  intro,
  summary = [],
  sections = [],
  closing,
}) {
  return (
    <>
      <PageHero title={title} lastUpdated={lastUpdated} />

      <section className="container-pips py-14">
        <div className="mx-auto max-w-3xl">
          <p className="text-base leading-relaxed text-pips-ink-soft">{intro}</p>
        </div>

        {summary.length > 0 && (
          <div className="mx-auto mt-10 grid max-w-4xl gap-6 sm:grid-cols-3">
            {summary.map((s) => (
              <IconTile
                key={s.title}
                icon={s.icon}
                title={s.title}
                description={s.description}
              />
            ))}
          </div>
        )}

        <div className="mx-auto mt-14 max-w-3xl space-y-10">
          {sections.map((sec, i) => (
            <div key={sec.heading}>
              <h2 className="flex items-baseline gap-3 text-xl font-bold text-pips-ink">
                <span className="font-mono text-base text-pips-accent">
                  {String(i + 1).padStart(2, "0")}
                </span>
                {sec.heading}
              </h2>
              <div className="mt-3 space-y-3">
                {sec.body.map((p, j) => (
                  <p
                    key={j}
                    className="text-sm leading-relaxed text-pips-muted"
                  >
                    {p}
                  </p>
                ))}
              </div>
              {sec.callout && (
                <Callout
                  tone="warn"
                  label="Important"
                  icon="ph:warning"
                  className="mt-4"
                >
                  {sec.callout}
                </Callout>
              )}
            </div>
          ))}
        </div>

        {closing && (
          <div className="card-journal mx-auto mt-14 max-w-3xl p-8">
            <h2 className="flex items-center gap-2 text-lg font-bold text-pips-ink">
              <Icon icon={closing.icon || "ph:chat-circle-text"} className="text-pips-accent" />
              {closing.heading}
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-pips-muted">
              {closing.body}
            </p>
          </div>
        )}

        <div className="mx-auto mt-14 max-w-3xl">
          <DisclaimerBanner />
        </div>
      </section>
    </>
  );
}

export default LegalPage;
