import { Link } from "react-router-dom";
import { Icon } from "@iconify/react";

/* Page closer with exactly one primary action. Variants keep neighbouring
   pages from ending the same way:
     band    full-bleed teal field, statement left, action right
     split   on the page ground: title left, sentence and action right
     inline  one sentence and a text link */
export function ClosingCTA({
  title = "Start learning for free",
  subtitle = "No account, no cost, no signals. Just clear lessons and tools built for beginners.",
  action,
  buttons,
  variant = "band",
}) {
  const primary = action || buttons?.[0] || { label: "Go to Academy", to: "/academy" };

  const button = (
    <Link
      to={primary.to}
      className="chamfer inline-flex min-h-12 items-center gap-2 bg-brand px-6 text-body font-bold whitespace-nowrap text-on-brand press hover:bg-brand-hover active:bg-brand-press"
    >
      {primary.label}
      <Icon icon="ph:arrow-right-bold" aria-hidden="true" />
    </Link>
  );

  if (variant === "inline") {
    return (
      <section className="container-page py-section">
        <h2 className="text-title font-bold text-ink">{title}</h2>
        <p className="mt-4 max-w-[60ch] text-body text-ink-soft sm:text-lead">
          {subtitle}{" "}
          <Link to={primary.to} className="font-bold text-brand underline hover:text-brand-hover">
            {primary.label}
          </Link>
        </p>
      </section>
    );
  }

  if (variant === "split") {
    return (
      <section className="container-page grid gap-8 py-section lg:grid-cols-12 lg:items-end">
        <h2 className="text-title font-bold text-ink lg:col-span-6">{title}</h2>
        <div className="lg:col-span-6">
          <p className="max-w-[52ch] text-body text-ink-soft sm:text-lead">{subtitle}</p>
          <div className="mt-6">{button}</div>
        </div>
      </section>
    );
  }

  return (
    <section className="band-field">
      <div className="container-page grid gap-8 py-24 lg:grid-cols-12 lg:items-center">
        <div className="lg:col-span-8">
          <h2 className="text-title font-bold text-ink">{title}</h2>
          <p className="mt-4 max-w-[52ch] text-body text-ink-soft sm:text-lead">{subtitle}</p>
        </div>
        <div className="lg:col-span-4 lg:justify-self-end">{button}</div>
      </div>
    </section>
  );
}

export default ClosingCTA;
