import { Link } from "react-router-dom";
import { Icon } from "@iconify/react";
import logoUrl from "@/assets/brand/pips-logo.png";
import ButtonLink from "@/components/common/ButtonLink.jsx";
import EffectLayer from "@/components/effects/EffectLayer.jsx";
import { FOOTER_COLUMNS, SOCIAL_LINKS, EDUCATIONAL_DISCLAIMER_LONG, CONTACT_INFO } from "@/data/site.js";

const linkClass = "text-ink-soft transition-colors hover:text-ink";

const RAYS_TOKENS = { raysColor: "brand" };
const RAYS_PROPS = {
  raysOrigin: "top-center",
  intensity: 0.4,
  opacity: 0.45,
  raySharpness: 0.5,
  followMouse: false,
  cursorShadow: false,
  clickPulse: false,
  pulsating: false,
};

/* Every page closes here: the closing statement and CTA sit under a soft
   spotlight (Light Rays), then the site map, disclaimer and legal line. */
function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="section-lit relative isolate overflow-hidden text-ink-soft">
      <EffectLayer effect="rays" tokens={RAYS_TOKENS} props={RAYS_PROPS} className="inset-x-0 top-0 h-[36rem]" />
      <div className="container-page pt-24 pb-10 sm:pt-32">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-8">
            <p className="max-w-[22ch] text-title text-ink">
              Free forex education for <em className="text-brand">complete beginners.</em>
            </p>
            <p className="mt-5 max-w-[52ch] text-body text-ink-soft">
              We teach market basics, chart reading and risk management, plainly, and without ever selling a signal.
            </p>
          </div>
          <div className="lg:col-span-4 lg:justify-self-end">
            <ButtonLink to="/academy">Start free</ButtonLink>
          </div>
        </div>

        <div className="mt-20 grid gap-10 border-t border-line pt-12 sm:grid-cols-2 lg:grid-cols-12">
          <Link to="/" aria-label="PipsStore — home" className="inline-block w-full max-w-56 self-start rounded-md lg:col-span-3">
            <img src={logoUrl} alt="" width={560} height={289} loading="lazy" decoding="async" className="h-auto w-full" />
          </Link>

          {FOOTER_COLUMNS.map((col) => (
            <div key={col.title} className="lg:col-span-2">
              <h2 className="text-small font-medium text-ink-muted">{col.title}</h2>
              <ul className="mt-3">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <Link to={l.to} className={["inline-flex min-h-10 items-center text-small", linkClass].join(" ")}>
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div className="lg:col-span-3">
            <h2 className="text-small font-medium text-ink-muted">Contact</h2>
            <a
              href={`mailto:${CONTACT_INFO.email}`}
              className={["mt-3 inline-flex min-h-10 items-center gap-2 text-small", linkClass].join(" ")}
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
                    className="inline-flex size-11 items-center justify-center rounded-full border border-line text-ink-soft press hover:border-line-strong hover:bg-line hover:text-ink"
                  >
                    <Icon icon={s.icon} className="text-lead" aria-hidden="true" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <section aria-labelledby="footer-disclaimer" className="card mt-16 p-6 sm:p-8">
          <h2 id="footer-disclaimer" className="flex items-center gap-2 text-body font-semibold text-ink">
            <Icon icon="ph:warning-circle" className="text-warning" aria-hidden="true" />
            Educational disclaimer
          </h2>
          <p className="mt-3 max-w-[75ch] text-small text-ink-soft">{EDUCATIONAL_DISCLAIMER_LONG}</p>
        </section>

        <div className="mt-10 flex flex-col gap-3 border-t border-line pt-6 text-small text-ink-muted sm:flex-row sm:items-center sm:justify-between">
          <p>© {year} PipsStore. All rights reserved.</p>
          <p className="flex items-center gap-5">
            <Link to="/privacy-policy" className="transition-colors hover:text-ink">
              Privacy Policy
            </Link>
            <Link to="/terms-and-conditions" className="transition-colors hover:text-ink">
              Terms &amp; Conditions
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
