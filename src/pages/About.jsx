import { Icon } from "@iconify/react";
import { PageHero } from "@/components/common/PageHero.jsx";
import { DisclaimerBanner } from "@/components/common/DisclaimerBanner.jsx";
import { RevealGroup } from "@/components/common/RevealGroup.jsx";
import { ClosingCTA } from "@/components/common/ClosingCTA.jsx";
import { IconTile } from "@/components/common/IconTile.jsx";
import { Accordion } from "@/components/common/Accordion.jsx";
import { ContactForm } from "@/components/common/ContactForm.jsx";
import { ArchiveImage } from "@/components/common/ArchiveImage.jsx";
import { useScrollReveal } from "@/hooks/useGsap.js";
import { ABOUT_MISSION, CURRICULUM_PILLARS, WHO_ITS_FOR, OUR_APPROACH, ABOUT_FAQ } from "@/data/about.js";
import { SITE_FACTS } from "@/data/facts.js";
import { CONTACT_INFO, SOCIAL_LINKS } from "@/data/site.js";

import dojimaSasaki from "@/assets/archive/dojima-rice-exchange-sasaki.jpg";
import certificateDesign from "@/assets/archive/banknote-certificate-design.jpg";
import customersRoom from "@/assets/archive/brokerage-customers-room-1902.jpg";
import torontoExchange from "@/assets/archive/toronto-stock-exchange-1956.jpg";

function Bullets({ items }) {
  return (
    <ul className="mt-6 flex flex-col gap-4">
      {items.map((item) => (
        <li key={item} className="flex gap-3 text-body text-ink-soft">
          <span aria-hidden="true" className="chamfer mt-2 h-2.5 w-2.5 shrink-0 bg-brand" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

function MissionSection() {
  const facts = useScrollReveal(":scope > div");

  return (
    <section aria-labelledby="mission-title" className="container-page pb-section">
      <div className="grid gap-12 lg:grid-cols-12 lg:items-center">
        <div className="lg:col-span-6">
          <h2 id="mission-title" className="text-title font-bold text-ink">
            Our mission
          </h2>
          <p className="mt-6 max-w-[52ch] text-body text-ink sm:text-lead">{ABOUT_MISSION}</p>
        </div>
        <ArchiveImage
          src={dojimaSasaki}
          width={1400}
          height={606}
          alt="A colour woodblock print of the Dōjima rice exchange on stilts beside the river, with boats in the foreground."
          caption="The Dōjima Rice Exchange, Osaka, around 1880."
          className="lg:col-span-6"
          frameClassName="aspect-[7/3]"
        />
      </div>
      <dl ref={facts} className="mt-16 grid grid-cols-2 gap-x-8 gap-y-8 lg:grid-cols-4">
        {SITE_FACTS.map((f) => (
          <div key={f.label} className="flex flex-col-reverse">
            <dt className="text-body text-ink-soft">{f.label}</dt>
            <dd className="text-title font-bold text-ink tabular-nums">{f.value}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}

function PillarsSection() {
  return (
    <section aria-labelledby="pillars-title" className="band-field py-section">
      <div className="container-page">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <h2 id="pillars-title" className="text-title font-bold text-ink">
              What PipsStore teaches
            </h2>
            <p className="mt-4 max-w-[52ch] text-body text-ink-soft sm:text-lead">
              Six pillars, taught in an order that puts protecting your account first.
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
        <RevealGroup className="mt-14 grid gap-x-12 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
          {CURRICULUM_PILLARS.map((p) => (
            <IconTile key={p.title} icon={p.icon} title={p.title} description={p.description} />
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}

function AudienceSection() {
  return (
    <section aria-label="Who it's for and our approach" className="container-page py-section">
      <div className="grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <h2 className="text-title font-bold text-ink">Who it's for</h2>
          <Bullets items={WHO_ITS_FOR} />
        </div>
        <div className="lg:col-span-4">
          <h2 className="text-title font-bold text-ink">Our approach</h2>
          <Bullets items={OUR_APPROACH} />
        </div>
        <ArchiveImage
          src={customersRoom}
          width={1100}
          height={827}
          alt="Rows of wooden chairs in the customers' room of an early New York brokerage office."
          caption="A brokerage customers' room, New York, 1902."
          className="lg:col-span-4"
          frameClassName="aspect-[4/5]"
        />
      </div>
    </section>
  );
}

function FaqSection() {
  return (
    <section aria-labelledby="faq-title" className="bg-surface-1 py-section">
      <div className="container-page grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <h2 id="faq-title" className="text-title font-bold text-ink">
            Frequently asked questions
          </h2>
          <p className="mt-4 text-body text-ink-soft sm:text-lead">The things beginners ask us most.</p>
          <ArchiveImage
            src={torontoExchange}
            width={1000}
            height={1007}
            alt="Traders in suits crowding the floor of a stock exchange around tall quotation posts, under a large clock."
            caption="The floor of the Toronto Stock Exchange, 1956."
            className="mt-10 hidden lg:block"
            frameClassName="aspect-square"
          />
        </div>
        <div className="lg:col-span-8">
          <Accordion items={ABOUT_FAQ} />
        </div>
      </div>
    </section>
  );
}

function ContactSection() {
  return (
    <section id="contact" aria-labelledby="contact-title" className="container-page py-section">
      <div className="grid items-start gap-12 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <h2 id="contact-title" className="text-title font-bold text-ink">
            Get in touch
          </h2>
          <p className="mt-4 max-w-[44ch] text-body text-ink-soft sm:text-lead">
            Questions about where to start? Send a message — we read every one.
          </p>
          <dl className="mt-10 flex flex-col gap-6">
            <div>
              <dt className="text-body font-bold text-ink">Email</dt>
              <dd className="mt-1">
                <a
                  href={`mailto:${CONTACT_INFO.email}`}
                  className="text-body text-brand underline underline-offset-4 hover:text-brand-hover"
                >
                  {CONTACT_INFO.email}
                </a>
              </dd>
            </div>
            <div>
              <dt className="text-body font-bold text-ink">Response time</dt>
              <dd className="mt-1 text-body text-ink-soft">{CONTACT_INFO.responseTime}</dd>
            </div>
            <div>
              <dt className="text-body font-bold text-ink">Hours</dt>
              <dd className="mt-1 text-body text-ink-soft">{CONTACT_INFO.hours}</dd>
            </div>
          </dl>
          <p className="mt-10 text-body font-bold text-ink">Follow along</p>
          <ul className="mt-3 flex flex-wrap gap-2">
            {SOCIAL_LINKS.map((s) => (
              <li key={s.label}>
                <a
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-surface-2 text-ink-soft press hover:bg-surface-3 hover:text-ink"
                >
                  <Icon icon={s.icon} className="text-lead" aria-hidden="true" />
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div className="lg:col-span-7">
          <ContactForm
            heading="Send us a message"
            blurb="Tell us your experience level and we'll point you to the right starting place."
          />
        </div>
      </div>
    </section>
  );
}

export default function About() {
  return (
    <>
      <PageHero
        title="About PipsStore"
        subtitle="A calm, honest place for complete beginners to learn how the forex market works — starting with risk, not strategy."
      />
      <MissionSection />
      <PillarsSection />
      <AudienceSection />
      <FaqSection />
      <ContactSection />
      <ClosingCTA
        variant="inline"
        title="Start where it makes sense"
        subtitle="New here? Take the beginner roadmap. Know the basics? Pick a learning path in the Academy."
        action={{ label: "Go to the Academy", to: "/academy" }}
      />
      <div className="container-page pb-16">
        <DisclaimerBanner />
      </div>
    </>
  );
}
