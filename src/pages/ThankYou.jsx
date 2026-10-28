import { useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Icon } from "@iconify/react";
import LinkRow from "@/components/common/LinkRow.jsx";
import { fireContactConversion } from "@/lib/gtag.js";
import { useHeroReveal } from "@/hooks/useGsap.js";
import { CONTACT_INFO } from "@/data/site.js";
import EffectLayer from "@/components/effects/EffectLayer.jsx";
import ButtonLink from "@/components/common/ButtonLink.jsx";

const ORB_TOKENS = { colors: ["brand", "brand-deep", "surface-3"], backgroundColor: "ground" };
const ORB_PROPS = {
  glow: 0.4,
  opacity: 0.25,
  hoverIntensity: 0,
  rotateOnHover: false,
  followCursor: false,
  clickPulse: false,
};

const NEXT_STEPS = [
  {
    to: "/academy",
    icon: "ph:graduation-cap",
    title: "Visit the Academy",
    description: "Start the beginner path or browse courses by level.",
  },
  {
    to: "/tools",
    icon: "ph:calculator",
    title: "Explore Free Tools",
    description: "Try the pip value and profit calculators.",
  },
];

function ThankYou() {
  const location = useLocation();
  const navigate = useNavigate();
  const legit = location.state?.fromContactForm === true;
  const conversionFired = useRef(false);
  const scope = useHeroReveal();

  useEffect(() => {
    if (legit && !conversionFired.current) {
      conversionFired.current = true;
      fireContactConversion();
    }
  }, [legit]);

  useEffect(() => {
    if (!legit) {
      const t = setTimeout(() => navigate("/", { replace: true }), 4000);
      return () => clearTimeout(t);
    }
  }, [legit, navigate]);

  if (!legit) {
    return (
      <section className="container-page flex min-h-[60vh] flex-col justify-center py-section">
        <h1 className="max-w-[18ch] text-title text-ink">
          This page isn't meant to be opened directly
        </h1>
        <p className="mt-4 max-w-[48ch] text-body text-ink-soft">
          It only appears after you send a message through one of our contact
          forms. Taking you back to the homepage now…
        </p>
        <div className="mt-8">
          <ButtonLink to="/">Go now</ButtonLink>
        </div>
      </section>
    );
  }

  return (
    <section ref={scope} className="container-page py-section">
      <div className="grid gap-12 lg:grid-cols-12 lg:items-end">
        <div className="lg:col-span-6">
          <div className="relative isolate inline-flex">
            <EffectLayer effect="orb" tokens={ORB_TOKENS} props={ORB_PROPS} className="-inset-20" />
            <Icon icon="ph:check-circle-fill" aria-hidden="true" className="size-14 text-success" />
          </div>
          <h1 className="mt-6 text-headline text-ink">You're all set</h1>
          <p data-hero-rise className="mt-6 max-w-[44ch] text-body text-ink sm:text-lead">
            Thanks for reaching out. Your message is on its way to us.{" "}
            {CONTACT_INFO.responseTime}
          </p>
        </div>
        <div data-hero-rise className="lg:col-span-6">
          <h2 className="text-lead font-bold text-ink">While you wait</h2>
          <ul className="mt-4 flex flex-col gap-2">
            {NEXT_STEPS.map((s) => (
              <li key={s.to}>
                <LinkRow to={s.to} icon={s.icon} title={s.title} description={s.description} />
              </li>
            ))}
          </ul>
          <Link
            to="/"
            className="mt-6 inline-flex min-h-11 items-center gap-2 text-body font-bold text-brand hover:text-brand-hover"
          >
            <Icon icon="ph:arrow-left-bold" aria-hidden="true" />
            Back to homepage
          </Link>
        </div>
      </div>
    </section>
  );
}

export default ThankYou;
