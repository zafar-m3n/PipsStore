import { useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Icon } from "@iconify/react";
import { IconBadge } from "@/components/common/IconBadge.jsx";
import { fireContactConversion } from "@/lib/gtag.js";
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
    description: "Try the pip, position size, and risk/reward calculators.",
  },
];

export default function ThankYou() {
  const location = useLocation();
  const navigate = useNavigate();
  const legit = location.state?.fromContactForm === true;
  const conversionFired = useRef(false);

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
      <section className="container-pips flex min-h-[60vh] flex-col items-center justify-center py-20 text-center">
        <span className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-pips-surface-alt text-pips-muted">
          <Icon icon="ph:compass" className="text-2xl" />
        </span>
        <h1 className="mt-5 text-2xl font-bold text-pips-ink">
          This page isn't meant to be opened directly
        </h1>
        <p className="mt-2 max-w-md text-sm text-pips-muted">
          It only appears after you send a message through one of our contact
          forms. Taking you back to the homepage now…
        </p>
        <Link
          to="/"
          className="mt-6 inline-flex items-center gap-2 rounded-full bg-pips-accent px-6 py-3 text-sm font-semibold text-white"
        >
          Go now
          <Icon icon="ph:arrow-right-bold" className="text-xs" />
        </Link>
      </section>
    );
  }

  return (
    <section className="container-pips py-20">
      <div className="card-journal mx-auto max-w-2xl p-8 text-center sm:p-12">
        <span className="mx-auto inline-flex h-16 w-16 items-center justify-center rounded-full bg-pips-bull-soft text-pips-bull">
          <Icon icon="ph:check-bold" className="text-3xl" />
        </span>
        <h1 className="mt-6 text-3xl font-bold text-pips-ink">You're all set</h1>
        <p className="mt-3 text-pips-muted">
          Thanks for reaching out. Your message is on its way to us.{" "}
          {CONTACT_INFO.responseTime}
        </p>

        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          {NEXT_STEPS.map((s) => (
            <Link
              key={s.to}
              to={s.to}
              className="group card-journal p-5 text-left transition-shadow hover:shadow-pips-hover"
            >
              <IconBadge icon={s.icon} size="sm" />
              <p className="mt-3 font-semibold text-pips-ink">{s.title}</p>
              <p className="mt-1 text-sm text-pips-muted">{s.description}</p>
            </Link>
          ))}
        </div>

        <Link
          to="/"
          className="mt-8 inline-flex items-center gap-1.5 text-sm font-semibold text-pips-accent hover:text-pips-accent-strong"
        >
          <Icon icon="ph:arrow-left-bold" className="text-xs" />
          Back to homepage
        </Link>
      </div>
    </section>
  );
}
