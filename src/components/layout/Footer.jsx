import { Link } from "react-router-dom";
import { Icon } from "@iconify/react";
import logoUrl from "@/assets/brand/pips-logo.png";
import { FOOTER_COLUMNS, SOCIAL_LINKS, EDUCATIONAL_DISCLAIMER_LONG, CONTACT_INFO } from "@/data/site.js";
import { IMAGE_CREDITS } from "@/data/credits.js";

const linkClass = "text-ink-soft transition-colors hover:text-brand";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-surface-1 text-ink-soft">
      <div className="container-page pt-24 pb-10">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
          <Link to="/" aria-label="PipsStore — home" className="chamfer inline-block w-full max-w-[22rem] lg:col-span-5">
            <img src={logoUrl} alt="" width={560} height={289} loading="lazy" decoding="async" className="h-auto w-full" />
          </Link>
          <p className="max-w-[36ch] text-body text-ink sm:text-lead lg:col-span-7">
            Free forex education for complete beginners. We teach market basics, chart reading, and risk management —
            plainly, and without ever selling a signal.
          </p>
        </div>

        <div className="mt-20 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {FOOTER_COLUMNS.map((col) => (
            <div key={col.title}>
              <h2 className="text-small font-bold text-ink">{col.title}</h2>
              <ul className="mt-3">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <Link to={l.to} className={["inline-flex min-h-11 items-center", linkClass].join(" ")}>
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div>
            <h2 className="text-small font-bold text-ink">Contact</h2>
            <a
              href={`mailto:${CONTACT_INFO.email}`}
              className={["mt-3 inline-flex min-h-11 items-center gap-2", linkClass].join(" ")}
            >
              <Icon icon="ph:envelope-simple" aria-hidden="true" />
              {CONTACT_INFO.email}
            </a>
            <p className="text-small text-ink-muted">{CONTACT_INFO.responseTime}</p>
            <ul className="mt-5 flex gap-2">
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
        </div>

        <section aria-labelledby="footer-disclaimer" className="panel-raised mt-16 p-6 sm:p-8">
          <h2 id="footer-disclaimer" className="flex items-center gap-2 text-body font-bold text-ink">
            <Icon icon="ph:warning-circle" className="text-warning" aria-hidden="true" />
            Educational disclaimer
          </h2>
          <p className="mt-3 max-w-[75ch] text-body text-ink-soft">{EDUCATIONAL_DISCLAIMER_LONG}</p>
        </section>

        <div className="mt-10 flex flex-col gap-3 text-small text-ink-muted sm:flex-row sm:items-center sm:justify-between">
          <p>© {year} PipsStore. All rights reserved.</p>
          <p className="flex items-center gap-4">
            <Link to="/privacy-policy" className="transition-colors hover:text-brand">
              Privacy Policy
            </Link>
            <Link to="/terms-and-conditions" className="transition-colors hover:text-brand">
              Terms &amp; Conditions
            </Link>
          </p>
        </div>

        {IMAGE_CREDITS.length > 0 && (
          <details className="mt-6 text-small text-ink-muted">
            <summary className="inline-flex min-h-11 cursor-pointer items-center font-bold text-ink-soft hover:text-ink">
              Image credits ({IMAGE_CREDITS.length})
            </summary>
            <p className="mt-2 max-w-[110ch]">
            {IMAGE_CREDITS.map((c, i) => (
              <span key={c.source}>
                {i > 0 && "; "}
                <a href={c.source} target="_blank" rel="noopener noreferrer" className="underline hover:text-brand">
                  {c.title}
                </a>
                {c.creator ? ` by ${c.creator}` : ""},{" "}
                {c.licenceUrl ? (
                  <a href={c.licenceUrl} target="_blank" rel="noopener noreferrer" className="underline hover:text-brand">
                    {c.licence}
                  </a>
                ) : (
                  c.licence
                )}
              </span>
            ))}
            .
            </p>
          </details>
        )}
      </div>
    </footer>
  );
}

export default Footer;
