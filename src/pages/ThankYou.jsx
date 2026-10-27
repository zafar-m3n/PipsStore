import { useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Icon } from "@iconify/react";
import { IconBadge } from "@/components/common/IconBadge.jsx";
import { fireContactConversion } from "@/lib/gtag.js";
import { useHeroReveal } from "@/hooks/useGsap.js";
import { CONTACT_INFO } from "@/data/site.js";

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

export default function ThankYou() {
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
        <h1 className="max-w-[18ch] text-title font-bold text-ink">
          This page isn't meant to be opened directly
        </h1>
        <p className="mt-4 max-w-[48ch] text-body text-ink-soft sm:text-lead">
          It only appears after you send a message through one of our contact
          forms. Taking you back to the homepage now…
        </p>
        <div className="mt-8">
          <Link
            to="/"
            className="chamfer inline-flex min-h-12 items-center gap-2 bg-brand px-6 text-body font-bold text-on-brand press hover:bg-brand-hover active:bg-brand-press"
          >
            Go now
            <Icon icon="ph:arrow-right-bold" aria-hidden="true" />
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section ref={scope} className="container-page py-section">
      <div className="grid gap-12 lg:grid-cols-12 lg:items-end">
        <div className="lg:col-span-6">
          <Icon icon="ph:check-circle-fill" aria-hidden="true" className="text-display text-success" />
          <h1 className="mt-6 text-display text-ink">You're all set</h1>
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
                <Link
                  to={s.to}
                  className="chamfer group flex min-h-16 items-center gap-4 bg-surface-1 px-5 py-4 press-soft hover:bg-surface-2"
                >
                  <IconBadge icon={s.icon} size="sm" />
                  <span className="flex-1">
                    <span className="block text-body font-bold text-ink">{s.title}</span>
                    <span className="block text-small text-ink-soft">{s.description}</span>
                  </span>
                  <Icon icon="ph:arrow-right-bold" aria-hidden="true" className="shrink-0 text-ink-muted transition-transform group-hover:translate-x-0.5" />
                </Link>
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
