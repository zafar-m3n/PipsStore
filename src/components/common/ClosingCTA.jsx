import { Link } from "react-router-dom";
import { Icon } from "@iconify/react";

/* Closing call-to-action band used at the foot of every content page. */
export function ClosingCTA({
  title = "Start learning for free",
  subtitle = "No account, no cost, no signals. Just clear lessons and tools built for beginners.",
  buttons = [
    { label: "Go to Academy", to: "/academy" },
    { label: "Explore Tools", to: "/tools", variant: "ghost" },
  ],
}) {
  return (
    <section className="container-pips py-16">
      <div className="relative overflow-hidden rounded-3xl border border-pips-accent-soft bg-pips-accent-tint px-6 py-12 text-center sm:px-12 sm:py-16">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-16 -top-16 h-52 w-52 rounded-full bg-pips-accent/10 blur-2xl"
        />
        <h2 className="relative text-3xl font-bold text-pips-ink sm:text-4xl">
          {title}
        </h2>
        <p className="relative mx-auto mt-3 max-w-xl text-pips-muted">
          {subtitle}
        </p>
        <div className="relative mt-8 flex flex-wrap items-center justify-center gap-3">
          {buttons.map((b) => (
            <Link
              key={b.to + b.label}
              to={b.to}
              className={
                b.variant === "ghost"
                  ? "inline-flex items-center gap-2 rounded-full border border-pips-accent/40 bg-pips-surface px-6 py-3 text-sm font-semibold text-pips-accent transition-colors hover:bg-pips-accent-soft"
                  : "inline-flex items-center gap-2 rounded-full bg-pips-accent px-6 py-3 text-sm font-semibold text-white shadow-pips transition-colors hover:bg-pips-accent-strong"
              }
            >
              {b.label}
              <Icon icon="ph:arrow-right-bold" className="text-sm" />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

export default ClosingCTA;
