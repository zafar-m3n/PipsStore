import { Link } from "react-router-dom";
import { Icon } from "@iconify/react";
import { FOOTER_COLUMNS, SOCIAL_LINKS, EDUCATIONAL_DISCLAIMER_LONG, CONTACT_INFO } from "@/data/site.js";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-pips-footer text-pips-bg/80">
      <div className="container-pips py-14">
        <div className="grid gap-10 md:grid-cols-5">
          {/* Brand block — spans two columns */}
          <div className="md:col-span-2">
            <div className="flex flex-col leading-none">
              <span className="font-display text-xl font-extrabold text-white">
                Pips<span className="text-pips-accent">Store</span>
              </span>
              <svg viewBox="0 0 120 12" className="mt-1 h-2 w-22" fill="none" aria-hidden="true">
                <path d="M2 8C22 3 45 3 60 6c14 3 38 4 58-2" stroke="#c2542f" strokeWidth="3" strokeLinecap="round" />
              </svg>
            </div>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-pips-bg/70">
              Free forex education for complete beginners. We teach market basics, chart reading, and risk management —
              plainly, and without ever selling a signal.
            </p>
            <a
              href={`mailto:${CONTACT_INFO.email}`}
              className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-pips-bg/80 transition-colors hover:text-pips-accent"
            >
              <Icon icon="ph:envelope-simple" className="text-base" />
              {CONTACT_INFO.email}
            </a>
            <div className="mt-5 flex gap-2">
              {SOCIAL_LINKS.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-pips-footer-alt text-pips-bg/80 transition-colors hover:bg-pips-accent hover:text-white"
                >
                  <Icon icon={s.icon} className="text-base" />
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {FOOTER_COLUMNS.map((col) => (
            <div key={col.title}>
              <h4 className="text-sm font-semibold uppercase tracking-wide text-white">{col.title}</h4>
              <ul className="mt-4 space-y-2.5">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <Link to={l.to} className="text-sm text-pips-bg/70 transition-colors hover:text-pips-accent">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Inset educational disclaimer */}
        <div className="mt-12 rounded-2xl border border-white/10 bg-pips-footer-alt/60 p-5">
          <div className="flex items-start gap-3">
            <Icon icon="ph:graduation-cap" className="mt-0.5 shrink-0 text-lg text-pips-accent" />
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-white/90">Educational Disclaimer</p>
              <p className="mt-1.5 text-xs leading-relaxed text-pips-bg/60">{EDUCATIONAL_DISCLAIMER_LONG}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="container-pips flex flex-col items-center justify-between gap-3 py-5 text-xs text-pips-bg/60 sm:flex-row">
          <p>© {year} PipsStore. All rights reserved.</p>
          <p className="flex items-center gap-2">
            <Link to="/privacy-policy" className="transition-colors hover:text-pips-accent">
              Privacy Policy
            </Link>
            <span aria-hidden="true">/</span>
            <Link to="/terms-and-conditions" className="transition-colors hover:text-pips-accent">
              Terms &amp; Conditions
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
