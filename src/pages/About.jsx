import { Icon } from "@iconify/react";
import { PageHero } from "@/components/common/PageHero.jsx";
import { SectionHeading } from "@/components/common/SectionHeading.jsx";
import { RevealGroup } from "@/components/common/RevealGroup.jsx";
import { DisclaimerBanner } from "@/components/common/DisclaimerBanner.jsx";
import { ClosingCTA } from "@/components/common/ClosingCTA.jsx";
import { IconTile } from "@/components/common/IconTile.jsx";
import { Accordion } from "@/components/common/Accordion.jsx";
import { ContactForm } from "@/components/common/ContactForm.jsx";
import {
  ABOUT_MISSION,
  ABOUT_STATS,
  CURRICULUM_PILLARS,
  WHO_ITS_FOR,
  OUR_APPROACH,
  ABOUT_FAQ,
} from "@/data/about.js";
import { CONTACT_INFO, SOCIAL_LINKS } from "@/data/site.js";

export default function About() {
  return (
    <>
      <PageHero
        title="About PipsStore"
        subtitle="A calm, honest place for complete beginners to learn how the forex market works — starting with risk, not strategy."
      />

      {/* Mission */}
      <section className="container-pips py-16">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
          <div>
            <SectionHeading
              title="Our mission"
              subtitle="Free education, first principles, no sales pitch."
            />
            <p className="mt-4 text-base leading-relaxed text-pips-ink-soft">
              {ABOUT_MISSION}
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {ABOUT_STATS.map((s) => (
              <div key={s.label} className="card-journal p-6 text-center">
                <p className="font-mono text-3xl font-bold text-pips-accent">
                  {s.value}
                </p>
                <p className="mt-1 text-sm text-pips-muted">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What PipsStore Teaches */}
      <section className="bg-pips-surface-alt/60 py-16">
        <div className="container-pips">
          <SectionHeading
            title="What PipsStore teaches"
            subtitle="Six pillars, taught in an order that puts protecting your account first."
          />
          <RevealGroup className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {CURRICULUM_PILLARS.map((p) => (
              <IconTile
                key={p.title}
                icon={p.icon}
                title={p.title}
                description={p.description}
              />
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* Who it's for / Our approach */}
      <section className="container-pips py-16">
        <div className="grid gap-8 lg:grid-cols-2">
          <div className="card-journal p-8">
            <h3 className="text-xl font-bold text-pips-ink">Who it's for</h3>
            <ul className="mt-5 space-y-3">
              {WHO_ITS_FOR.map((w) => (
                <li key={w} className="flex items-start gap-3 text-sm text-pips-ink-soft">
                  <Icon
                    icon="ph:user-circle"
                    className="mt-0.5 shrink-0 text-lg text-pips-accent"
                  />
                  {w}
                </li>
              ))}
            </ul>
          </div>
          <div className="card-journal p-8">
            <h3 className="text-xl font-bold text-pips-ink">Our approach</h3>
            <ul className="mt-5 space-y-3">
              {OUR_APPROACH.map((a) => (
                <li key={a} className="flex items-start gap-3 text-sm text-pips-ink-soft">
                  <Icon
                    icon="ph:check-circle-fill"
                    className="mt-0.5 shrink-0 text-lg text-pips-bull"
                  />
                  {a}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-pips-surface-alt/60 py-16">
        <div className="container-pips max-w-3xl">
          <SectionHeading
            title="Frequently asked questions"
            subtitle="The things beginners ask us most."
          />
          <div className="mt-10">
            <Accordion items={ABOUT_FAQ} />
          </div>
        </div>
      </section>

      {/* Contact */}
      <section className="container-pips py-16">
        <SectionHeading
          title="Get in touch"
          subtitle="Questions about where to start? Send a message — we read every one."
        />
        <div className="mt-10 grid items-start gap-8 lg:grid-cols-12 lg:gap-10">
          {/* Contact details */}
          <div className="card-journal flex h-full flex-col p-6 sm:p-8 lg:col-span-5">
            <div className="space-y-6">
              <div className="flex items-start gap-3">
                <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-pips-accent-tint text-pips-accent ring-1 ring-pips-accent-soft">
                  <Icon icon="ph:envelope-simple" className="text-lg" />
                </span>
                <div>
                  <p className="text-sm font-semibold text-pips-ink">Email us</p>
                  <a
                    href={`mailto:${CONTACT_INFO.email}`}
                    className="text-sm text-pips-accent transition-colors hover:text-pips-accent-strong"
                  >
                    {CONTACT_INFO.email}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-pips-accent-tint text-pips-accent ring-1 ring-pips-accent-soft">
                  <Icon icon="ph:clock" className="text-lg" />
                </span>
                <div>
                  <p className="text-sm font-semibold text-pips-ink">
                    Response time
                  </p>
                  <p className="text-sm text-pips-muted">
                    {CONTACT_INFO.responseTime}
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-auto border-t border-pips-line pt-6">
              <p className="text-sm font-semibold text-pips-ink">Follow along</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {SOCIAL_LINKS.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.label}
                    className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-pips-accent-tint text-pips-accent ring-1 ring-pips-accent-soft transition-colors hover:bg-pips-accent hover:text-white"
                  >
                    <Icon icon={s.icon} className="text-base" />
                  </a>
                ))}
              </div>
              <p className="mt-3 text-xs text-pips-muted">{CONTACT_INFO.hours}</p>
            </div>
          </div>

          {/* Message form */}
          <div className="lg:col-span-7">
            <ContactForm
              heading="Send us a message"
              blurb="Tell us your experience level and we'll point you to the right starting place."
            />
          </div>
        </div>
      </section>

      <section className="container-pips py-12">
        <DisclaimerBanner />
      </section>

      <ClosingCTA
        title="Start where it makes sense"
        subtitle="New here? Take the beginner roadmap. Know the basics? Jump into chart analysis."
        buttons={[
          { label: "Go to Academy", to: "/academy" },
          { label: "Explore Tools", to: "/tools", variant: "ghost" },
        ]}
      />
    </>
  );
}
