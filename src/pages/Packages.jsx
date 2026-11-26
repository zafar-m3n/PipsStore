import { Icon } from "@iconify/react";
import PageHero from "@/components/common/PageHero.jsx";
import Chapter from "@/components/common/Chapter.jsx";
import SectionIntro from "@/components/common/SectionIntro.jsx";
import ButtonLink from "@/components/common/ButtonLink.jsx";
import Callout from "@/components/common/Callout.jsx";
import Accordion from "@/components/common/Accordion.jsx";
import ContactForm from "@/components/common/ContactForm.jsx";
import DisclaimerBanner from "@/components/common/DisclaimerBanner.jsx";
import PackageCard from "@/components/cards/PackageCard.jsx";
import { useScrollReveal } from "@/hooks/useGsap.js";
import {
  PACKAGES,
  TRIAL_DAYS,
  TRIAL_STEPS,
  PACKAGE_INCLUDES,
  PACKAGE_EXCLUDES,
  PACKAGE_FAQ,
} from "@/data/packages.js";
import { RISK_WARNING } from "@/data/site.js";

function PackagesSection() {
  const grid = useScrollReveal(":scope > *");

  return (
    <section aria-labelledby="packages-title" className="container-page pb-section">
      <SectionIntro id="packages-title" title="Three packages" width="52ch">
        Each one pairs a structured study plan with one-on-one consultations. They differ in length and in how much
        time you spend with a mentor.
      </SectionIntro>
      <div ref={grid} className="mt-12 grid gap-4 lg:grid-cols-3">
        {PACKAGES.map((p) => (
          <PackageCard key={p.id} item={p} />
        ))}
      </div>
      <Callout label="High risk warning" icon="ph:warning-circle" tone="warn" className="mt-8">
        {RISK_WARNING}
      </Callout>
    </section>
  );
}

function TrialChapter() {
  return (
    <Chapter
      titleId="trial-title"
      title="How the free trial works"
      intro={`Try any package free for ${TRIAL_DAYS} days before you decide.`}
    >
      <ol className="flex flex-col gap-4">
        {TRIAL_STEPS.map((s, i) => (
          <li key={s.title} className="card flex gap-5 p-6 sm:p-7">
            <span aria-hidden="true" className="font-mono text-figure text-brand">
              {String(i + 1).padStart(2, "0")}
            </span>
            <div>
              <h3 className="text-lead font-semibold text-ink">{s.title}</h3>
              <p className="mt-2 max-w-[56ch] text-body text-ink-soft">{s.description}</p>
            </div>
          </li>
        ))}
      </ol>
    </Chapter>
  );
}

function ScopeList({ title, icon, iconClass, items }) {
  return (
    <article className="card p-6 sm:p-7">
      <h3 className="text-lead font-semibold text-ink">{title}</h3>
      <ul className="mt-5 flex flex-col gap-4">
        {items.map((item) => (
          <li key={item} className="flex gap-3 text-body text-ink-soft">
            <Icon icon={icon} aria-hidden="true" className={["mt-1 shrink-0", iconClass].join(" ")} />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </article>
  );
}

function ScopeChapter() {
  return (
    <Chapter
      titleId="scope-title"
      title="Education, not trading services"
      intro="PipsStore is an education provider. We are not a trading company, a broker or a financial adviser."
    >
      <div className="grid gap-4 md:grid-cols-2">
        <ScopeList title="What packages include" icon="ph:check-bold" iconClass="text-success" items={PACKAGE_INCLUDES} />
        <ScopeList title="What we never provide" icon="ph:x-bold" iconClass="text-error" items={PACKAGE_EXCLUDES} />
      </div>
    </Chapter>
  );
}

function FaqChapter() {
  return (
    <Chapter titleId="packages-faq-title" title="Questions about packages" intro="What people ask before starting a trial.">
      <Accordion items={PACKAGE_FAQ} />
    </Chapter>
  );
}

function TrialFormChapter() {
  return (
    <Chapter
      id="start-trial"
      titleId="start-trial-title"
      title="Start your free trial"
      intro="Send your details and a mentor will contact you to plan your trial. Mention the package you're interested in when we get in touch."
      introWidth="44ch"
    >
      <div className="max-w-2xl">
        <ContactForm
          submitLabel="Start free trial"
          successMessage="Thanks! We've received your details and will get back to you shortly to plan your free trial."
        />
      </div>
    </Chapter>
  );
}

function Packages() {
  return (
    <>
      <PageHero
        title="Mentoring packages"
        subtitle="One-on-one forex education for people who want a mentor alongside the free academy. Packages start at $250, and every one begins with a 30-day free trial."
      >
        <ButtonLink href="#start-trial" icon="ph:arrow-down-bold">
          Start a free trial
        </ButtonLink>
      </PageHero>
      <PackagesSection />
      <TrialChapter />
      <ScopeChapter />
      <FaqChapter />
      <TrialFormChapter />
      <div className="container-page py-16">
        <DisclaimerBanner />
      </div>
    </>
  );
}

export default Packages;
