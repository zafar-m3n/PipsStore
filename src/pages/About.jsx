import { Icon } from "@iconify/react";
import PageHero from "@/components/common/PageHero.jsx";
import Chapter from "@/components/common/Chapter.jsx";
import DisclaimerBanner from "@/components/common/DisclaimerBanner.jsx";
import Accordion from "@/components/common/Accordion.jsx";
import ContactForm from "@/components/common/ContactForm.jsx";
import ImagePlaceholder from "@/components/common/ImagePlaceholder.jsx";
import FactList from "@/components/common/FactList.jsx";
import BulletList from "@/components/common/BulletList.jsx";
import SectionIntro from "@/components/common/SectionIntro.jsx";
import PathCard from "@/components/ui/PathCard.jsx";
import SupportCard from "@/components/ui/SupportCard.jsx";
import { useScrollReveal } from "@/hooks/useGsap.js";
import { ABOUT_MISSION, CURRICULUM_PILLARS, WHO_ITS_FOR, OUR_APPROACH, ABOUT_FAQ } from "@/data/about.js";
import { CONTACT_INFO, SOCIAL_LINKS } from "@/data/site.js";

/* Risk is taught first, so it leads the pillars and takes the large tile. */
const PILLARS = [
  ...CURRICULUM_PILLARS.filter((p) => p.title === "Risk Management"),
  ...CURRICULUM_PILLARS.filter((p) => p.title !== "Risk Management"),
];

/* Risk large on the left with two pillars stacked beside it, then a row of three. */
const PILLAR_SPANS = [
  "md:col-span-2 lg:col-span-7 lg:row-span-2",
  "lg:col-span-5",
  "lg:col-span-5",
  "lg:col-span-4",
  "lg:col-span-4",
  "md:col-span-2 lg:col-span-4",
];

function MissionChapter() {
  const facts = useScrollReveal(":scope > div");

  return (
    <Chapter titleId="mission-title" title="Our mission" className="pt-0">
      <p className="font-display text-[clamp(1.625rem,1.1rem+1.6vw,2.375rem)] leading-[1.2] text-ink">{ABOUT_MISSION}</p>
      <ImagePlaceholder
        aspect="aspect-7/3"
        className="mt-10"
        description="A small mixed-age study group around a table with notebooks, one person explaining a simple chart on a whiteboard."
      />
      <FactList
        ref={facts}
        labelSize="body"
        className="mt-10 grid grid-cols-2 gap-x-8 gap-y-8 border-t border-line pt-8 md:grid-cols-4"
      />
    </Chapter>
  );
}

function PillarsSection() {
  const grid = useScrollReveal(":scope > *");

  return (
    <section aria-labelledby="pillars-title" className="section-lit py-section">
      <div className="container-page">
        <div className="grid gap-6 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <SectionIntro id="pillars-title" title="What PipsStore teaches" width="52ch">
              Six pillars, taught in an order that puts protecting your account first.
            </SectionIntro>
          </div>
        </div>
        <div ref={grid} className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-12">
          {PILLARS.map((p, i) => (
            <article
              key={p.title}
              className={["card flex flex-col p-6 sm:p-7", PILLAR_SPANS[i]].join(" ")}
            >
              <h3 className="flex items-center gap-3 text-lead font-semibold text-ink">
                <Icon icon={p.icon} aria-hidden="true" className="shrink-0 text-brand" />
                {p.title}
              </h3>
              <p className="mt-2 max-w-[56ch] text-body text-ink-soft">{p.description}</p>
              {i === 0 && (
                <div className="mt-auto pt-6">
                  <PathCard id="risk-first" bare className="rounded-lg bg-ground/70 p-5 ring-1 ring-line" />
                </div>
              )}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function AudienceSection() {
  return (
    <section aria-label="Who it's for and our approach" className="container-page py-section">
      <div className="grid gap-4 lg:grid-cols-12">
        <article className="card p-6 sm:p-8 lg:col-span-4">
          <h2 className="text-title text-ink">Who it's for</h2>
          <BulletList items={WHO_ITS_FOR} className="mt-6" />
        </article>
        <article className="card p-6 sm:p-8 lg:col-span-4">
          <h2 className="text-title text-ink">Our approach</h2>
          <BulletList items={OUR_APPROACH} className="mt-6" />
        </article>
        <ImagePlaceholder
          aspect="aspect-4/5"
          className="lg:col-span-4"
          description="A beginner (student or career-changer) looking thoughtfully at a laptop in natural light, notebook open."
        />
      </div>
    </section>
  );
}

function FaqChapter() {
  return (
    <Chapter
      titleId="faq-title"
      title="Frequently asked questions"
      intro="The things beginners ask us most."
      aside={<SupportCard className="hidden lg:block" />}
      lit
    >
      <Accordion items={ABOUT_FAQ} />
    </Chapter>
  );
}

function ContactChapter() {
  return (
    <Chapter
      id="contact"
      titleId="contact-title"
      title="Get in touch"
      intro="Questions about where to start? Send a message — we read every one."
      introWidth="44ch"
      aside={
        <div className="flex flex-col gap-8">
          <dl className="flex flex-col gap-5 border-t border-line pt-6">
            <div>
              <dt className="text-small font-semibold text-ink">Email</dt>
              <dd className="mt-1">
                <a href={`mailto:${CONTACT_INFO.email}`} className="text-body text-brand underline hover:text-brand-hover">
                  {CONTACT_INFO.email}
                </a>
              </dd>
            </div>
            <div>
              <dt className="text-small font-semibold text-ink">Response time</dt>
              <dd className="mt-1 text-body text-ink-soft">{CONTACT_INFO.responseTime}</dd>
            </div>
            <div>
              <dt className="text-small font-semibold text-ink">Hours</dt>
              <dd className="mt-1 text-body text-ink-soft">{CONTACT_INFO.hours}</dd>
            </div>
          </dl>
          <div>
            <p className="text-small font-semibold text-ink">Follow along</p>
            <ul className="mt-3 flex flex-wrap gap-2">
              {SOCIAL_LINKS.map((s) => (
                <li key={s.label}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.label}
                    className="inline-flex size-11 items-center justify-center rounded-full border border-line text-ink-soft press hover:border-line-strong hover:bg-line hover:text-ink"
                  >
                    <Icon icon={s.icon} className="text-lead" aria-hidden="true" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      }
    >
      <div className="max-w-2xl">
        <ContactForm
          heading="Send us a message"
          blurb="Tell us your experience level and we'll point you to the right starting place."
        />
      </div>
    </Chapter>
  );
}

function About() {
  return (
    <>
      <PageHero
        title="About PipsStore"
        subtitle="A calm, honest place for complete beginners to learn how the forex market works — starting with risk, not strategy."
      />
      <MissionChapter />
      <PillarsSection />
      <AudienceSection />
      <FaqChapter />
      <ContactChapter />
      <div className="container-page pb-16">
        <DisclaimerBanner />
      </div>
    </>
  );
}

export default About;
